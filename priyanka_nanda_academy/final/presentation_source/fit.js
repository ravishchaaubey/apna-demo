// fit.js: text measurement and fitting for the component library.
//
// Widths come from font_metrics.js (Carlito = Calibri metrics, Caladea = Cambria metrics), so the
// estimates match both PowerPoint and the LibreOffice QA render. Every component sizes text with
// fitText()/fitParagraphs(); anything that cannot fit at its floor size is logged with warn() and
// printed by the build (it never silently overflows).

"use strict";

const M = require("./font_metrics.js");

const WIDTH_SLACK = 0.97; // wrap a little early: guards against kerning/rounding differences
const DEFAULT_W = 560; //    per-1000 width for characters missing from the table

const LOG = [];
function warn(where, msg) {
  LOG.push(`${where}: ${msg}`);
}

function fontKey(face) {
  return /cambria|\+mj/i.test(String(face || "")) ? "Cambria" : "Calibri";
}

function charWidth(ch, font, bold) {
  const style = bold ? "bold" : "regular";
  // "₹" is rendered in the body font even inside headings (see components.richRuns).
  if (ch === "₹") return M.Calibri[style].widths["₹"];
  const w = M[font][style].widths[ch];
  return w === undefined ? DEFAULT_W : w;
}

// Width in inches of a single line of text.
function textWidth(text, { font = "Calibri", bold = false, size = 12, charSpacing = 0 } = {}) {
  const f = fontKey(font);
  let units = 0;
  let n = 0;
  for (const ch of String(text)) {
    units += charWidth(ch, f, bold);
    n += 1;
  }
  return ((units / 1000) * size + charSpacing * n) / 72;
}

function lineHeight(size, font = "Calibri", bold = false, spacing = 1) {
  const f = fontKey(font);
  return (size * M[f][bold ? "bold" : "regular"].lineHeight * spacing) / 72;
}

// Greedy word wrap, the way PowerPoint wraps. Returns the lines.
function wrap(text, opts) {
  const width = opts.width * (opts.slack || WIDTH_SLACK);
  const lines = [];
  for (const para of String(text).split("\n")) {
    const words = para.split(/ +/).filter((w, i, a) => w.length || a.length === 1);
    let line = "";
    for (const word of words) {
      const cand = line ? `${line} ${word}` : word;
      if (textWidth(cand, opts) <= width) {
        line = cand;
        continue;
      }
      if (line) lines.push(line);
      if (textWidth(word, opts) <= width) {
        line = word;
      } else {
        // A single word wider than the box: PowerPoint breaks it mid-word. Count those lines.
        let chunk = "";
        for (const ch of word) {
          if (textWidth(chunk + ch, opts) > width && chunk) {
            lines.push(chunk);
            chunk = ch;
          } else chunk += ch;
        }
        line = chunk;
      }
    }
    lines.push(line);
  }
  return lines;
}

// True when some word (or number+unit) would have to break mid-word.
function hasBrokenWord(text, opts) {
  const width = opts.width * WIDTH_SLACK;
  return String(text)
    .split(/\s+/)
    .some((w) => w && textWidth(w, opts) > width);
}

/**
 * Largest size in [min, max] at which `text` fits a box.
 * @param {string} text
 * @param {object} o  { font, bold, w, h, max, min, step, spacing, charSpacing, maxLines, padX, padY, stable }
 *                     w/h are the box size in inches; padX/padY are the internal margins (each side).
 *                     stable: skip sizes where the line count is borderline (differs between a tight and a
 *                     loose wrap), so layouts that stack things under the text (titles) get a reliable count.
 * @returns {{size:number, lines:string[], height:number, fits:boolean}}
 */
function fitText(text, o) {
  const step = o.step || 0.5;
  const padX = o.padX || 0;
  const padY = o.padY || 0;
  const innerW = o.w - 2 * padX;
  const innerH = o.h - 2 * padY;
  let last = null;
  let firstFit = null;
  for (let s = o.max; s >= o.min - 1e-9; s -= step) {
    const size = Math.round(s * 2) / 2;
    const m = { font: o.font, bold: o.bold, size, charSpacing: o.charSpacing || 0, width: innerW };
    const lines = wrap(text, m);
    const height = lines.length * lineHeight(size, o.font, o.bold, o.spacing || 1);
    last = { size, lines, height, fits: false };
    if (o.maxLines && lines.length > o.maxLines) continue;
    if (height > innerH + 1e-6) continue;
    if (hasBrokenWord(text, m)) continue;
    last.fits = true;
    // Borderline in either direction (a line that is ~3% too long may still fit in one renderer and
    // not in another), so compare a loose and a tight wrap around the nominal width.
    if (o.stable && wrap(text, { ...m, slack: 1.03 }).length !== wrap(text, { ...m, slack: 0.93 }).length) {
      firstFit = firstFit || last;
      continue;
    }
    return last;
  }
  return firstFit || last;
}

/**
 * Fit several paragraphs (bullets, or heading + body) at one shared size.
 * @param {Array<{text:string,bold?:boolean,font?:string,indent?:number,sizeDelta?:number}>} paras
 *        indent in inches (bullet hanging indent); sizeDelta adds points to this paragraph (e.g. +2 for a heading).
 * @param {object} o { w, h, max, min, step, spacing, paraGap (pt), padX, padY, font }
 */
function fitParagraphs(paras, o) {
  const step = o.step || 0.5;
  const padX = o.padX || 0;
  const padY = o.padY || 0;
  const innerW = o.w - 2 * padX;
  const innerH = o.h - 2 * padY;
  const gapPt = o.paraGap === undefined ? 6 : o.paraGap;
  let last = null;
  for (let s = o.max; s >= o.min - 1e-9; s -= step) {
    const size = Math.round(s * 2) / 2;
    let height = 0;
    let broken = false;
    let lineCount = 0;
    paras.forEach((p, i) => {
      const pSize = size + (p.sizeDelta || 0);
      const font = p.font || o.font || "Calibri";
      const m = { font, bold: !!p.bold, size: pSize, width: innerW - (p.indent || 0) };
      const lines = wrap(p.text, m);
      lineCount += lines.length;
      if (hasBrokenWord(p.text, m)) broken = true;
      height += lines.length * lineHeight(pSize, font, p.bold, o.spacing || 1);
      if (i < paras.length - 1) height += (p.gapAfter === undefined ? gapPt : p.gapAfter) / 72;
    });
    last = { size, height, lines: lineCount, fits: false };
    if (broken || height > innerH + 1e-6) continue;
    last.fits = true;
    return last;
  }
  return last;
}

module.exports = { textWidth, lineHeight, wrap, fitText, fitParagraphs, warn, LOG, fontKey };
