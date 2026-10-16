// build_deck.js: builds final/Priyanka_Nanda_Academy_Growth_Strategy.pptx from deck_content.js.
//
//   node build_deck.js            # writes the deck, applies the theme, prints text-fit warnings
//   ./qa.sh ../Priyanka_Nanda_Academy_Growth_Strategy.pptx _render/deck 90
//
// Layout only: every word and number lives in deck_content.js. Each slide names a layout below;
// layouts use the design-system components (components.js) where one fits and local helpers
// (time grids, numbered lists, evidence keys, rich-text tables) where the storyboard needs more.
// All text is native and editable; all charts are native pptxgenjs charts with hex colours.

"use strict";

const path = require("path");
const { createDeck, C, BADGES, headRuns, textOn } = require("./components.js");
const { HEX, GRID, CHART, col, hex } = require("./theme.js");
const { fitText, fitParagraphs, textWidth, lineHeight, warn } = require("./fit.js");
const { meta, slides, MONTHS, MONTH_GROUPS } = require("./deck_content.js");

// The storyboard's evidence vocabulary: VERIFIED · CLAIM · FOUNDER · ESTIMATE · HYPOTHESIS · RECOMMENDATION.
BADGES.founder.label = "FOUNDER";
BADGES.claim.label = "CLAIM";

const X0 = GRID.ML;
const CW = GRID.CW;
const X1 = GRID.ML + GRID.CW;
const TOP = GRID.top;
const BOT = GRID.bottom;
const GAP = GRID.gap;
const BODY = "+mn-lt";

// Number formats with a true minus sign (U+2212), as in the storyboard.
const NF0 = '#,##0;"−"#,##0';
const NF1 = '#,##0.0;"−"#,##0.0';
const NF1Z = '#,##0.0;"−"#,##0.0;""'; // zero hidden (used for "no value" points)
const NF2 = '0.00';

// =============================================================================================
// Small helpers
// =============================================================================================

const NAMES = new WeakMap();
function oname(slide, base) {
  const m = NAMES.get(slide) || {};
  m[base] = (m[base] || 0) + 1;
  NAMES.set(slide, m);
  return m[base] === 1 ? base : `${base} ${m[base]}`;
}

function segs(s) {
  const out = [];
  String(s).split(/(\*\*[^*]+\*\*)/).forEach((p) => {
    if (!p) return;
    const b = /^\*\*[^*]+\*\*$/.test(p);
    out.push({ text: b ? p.slice(2, -2) : p, bold: b });
  });
  return out;
}
const plain = (s) => String(s).replace(/\*\*/g, "");
function boldShare(s) {
  const ss = segs(s);
  const tot = ss.reduce((a, x) => a + x.text.length, 0) || 1;
  return ss.filter((x) => x.bold).reduce((a, x) => a + x.text.length, 0) / tot;
}
const short = (s, n = 44) => (plain(s).length > n ? `${plain(s).slice(0, n - 1)}…` : plain(s));

/** Rounded (default) or square card. */
function card(slide, o) {
  const round = o.radius !== 0;
  slide.addShape(round ? "roundRect" : "rect", {
    x: o.x, y: o.y, w: o.w, h: o.h,
    ...(round ? { rectRadius: Math.min(o.radius === undefined ? GRID.radius : o.radius, Math.min(o.w, o.h) / 2) } : {}),
    fill: o.fill === null ? { type: "none" } : { color: col(o.fill || "paper") },
    line: o.line === null ? { type: "none" } : { color: col(o.line || "line"), width: o.lineW || 0.75, dashType: o.dash || "solid" },
    objectName: oname(slide, o.name || "Card"),
  });
}

function rule(slide, o) {
  slide.addShape("line", {
    x: o.x, y: o.y, w: o.w || 0, h: o.h || 0,
    line: { color: col(o.color || "line"), width: o.width || 0.75, dashType: o.dash || "solid", ...(o.arrow ? { endArrowType: o.arrow } : {}) },
    objectName: oname(slide, o.name || "Rule"),
  });
}

/**
 * Rich text box with auto-fit. paras: string | [string | {text, bullet, bold, color, sizeDelta, italic, gapAfter}].
 * "**x**" marks bold runs. o: {x,y,w,h,size,min,color,align,valign,paraGap,name,font:"head",italic,quiet}
 */
function tb(slide, paras, o) {
  const list = [].concat(paras).filter((p) => p !== undefined && p !== null && p !== "").map((p) => (typeof p === "string" ? { text: p } : p));
  const max = o.size || 12;
  const min = o.min || Math.min(max, 11);
  const gapPt = o.paraGap === undefined ? 4 : o.paraGap;
  const font = o.font === "head" ? "Cambria" : "Calibri";
  const fp = list.map((p) => ({ text: plain(p.text), bold: !!p.bold || boldShare(p.text) > 0.3 || !!o.bold, indent: p.bullet ? 0.17 : 0, sizeDelta: p.sizeDelta || 0, gapAfter: p.gapAfter, font }));
  const f = fitParagraphs(fp, { w: o.w, h: o.h, max, min, paraGap: gapPt });
  if (!f.fits && !o.quiet) warn(`Text "${short(list[0] ? list[0].text : "")}"`, `overflows ${o.w.toFixed(2)}x${o.h.toFixed(2)} at ${min} pt`);
  const runs = [];
  list.forEach((p, i) => {
    const pSize = f.size + (p.sizeDelta || 0);
    const ss = segs(p.text);
    ss.forEach((sg, k) => {
      const opt = {
        fontSize: pSize,
        bold: !!(p.bold || sg.bold || o.bold),
        color: p.color ? col(p.color) : o.color ? col(o.color) : col("ink"),
      };
      if (o.font === "head") opt.fontFace = sg.text === "₹" ? BODY : "+mj-lt";
      if (p.italic || o.italic) opt.italic = true;
      if (k === 0) {
        if (p.bullet) opt.bullet = p.bullet === true ? { indent: 12 } : p.bullet;
        if (i < list.length - 1) opt.paraSpaceAfter = p.gapAfter === undefined ? gapPt : p.gapAfter;
      }
      if (k === ss.length - 1 && i < list.length - 1) opt.breakLine = true;
      runs.push({ text: sg.text, options: opt });
    });
  });
  const textRuns = o.font === "head" ? runs.flatMap((r) => (r.text.includes("₹") ? headRuns(r.text, r.options) : [r])) : runs;
  slide.addText(textRuns, {
    isTextBox: true, x: o.x, y: o.y, w: o.w, h: o.h, margin: 0,
    valign: o.valign || "top", align: o.align || "left",
    fontSize: f.size, color: o.color ? col(o.color) : col("ink"),
    objectName: oname(slide, o.name || "Text"),
  });
  return f;
}

/** Height a paragraph list needs at a given size (for stacking). */
function needH(paras, w, size, paraGap = 4) {
  const list = [].concat(paras).filter(Boolean).map((p) => (typeof p === "string" ? { text: p } : p));
  return fitParagraphs(list.map((p) => ({ text: plain(p.text), bold: !!p.bold || boldShare(p.text) > 0.3, indent: p.bullet ? 0.17 : 0, sizeDelta: p.sizeDelta || 0 })), { w, h: 99, max: size, min: size, paraGap }).height;
}

/** Small-caps section label. */
function label(slide, text, o) {
  tb(slide, String(text).toUpperCase(), { x: o.x, y: o.y, w: o.w, h: o.h || 0.24, size: o.size || 10.5, min: o.size || 10.5, bold: true, color: o.color || "roseDark", valign: "middle", name: o.name || "Label", align: o.align });
}

/** Pill with text. o: {x,y,h,size,fill,color,line,dash,align:"left"|"center"|"right",w,padX} */
function pill(slide, text, o) {
  const size = o.size || 10;
  const bold = o.bold !== false;
  const h = o.h || 0.28;
  const w = o.w || textWidth(plain(text), { bold, size, charSpacing: o.charSpacing || 0 }) + (o.padX === undefined ? 0.26 : o.padX);
  let x = o.x;
  if (o.align === "right") x = o.x - w;
  else if (o.align === "center") x = o.x - w / 2;
  const runs = segs(text).map((sg) => ({ text: sg.text, options: { bold: bold || sg.bold, fontSize: size, color: col(o.color || "roseDark") } }));
  slide.addText(runs, {
    isTextBox: true, shape: "roundRect", rectRadius: h / 2, x, y: o.y, w, h,
    fill: { color: col(o.fill || "roseTint") },
    line: o.line ? { color: col(o.line), width: 0.75, dashType: o.dash || "solid" } : { type: "none" },
    fontSize: size, bold, color: col(o.color || "roseDark"), charSpacing: o.charSpacing,
    align: "center", valign: "middle", margin: 0, objectName: oname(slide, o.name || "Pill"),
  });
  return { x, w, h };
}

const badgeW = (t) => C.badgeSize(t).w;
function badgesWidth(types, gap = 0.08) {
  return types.reduce((a, t) => a + badgeW(t), 0) + gap * Math.max(0, types.length - 1);
}
/** Row of evidence badges; align "left" (x = left edge) or "right" (x = right edge). Returns {x, w}. */
function badges(slide, types, x, y, align = "left", onDark = false) {
  if (!types || !types.length) return { x, w: 0 };
  const w = badgesWidth(types);
  let cx = align === "right" ? x - w : x;
  const left = cx;
  types.forEach((t) => {
    cx += C.addBadge(slide, { type: t, x: cx, y, onDark }).w + 0.08;
  });
  return { x: left, w };
}

/** Evidence key: "Evidence:" then badge + caption pairs. */
function evidenceKey(slide, items, x, y, o = {}) {
  let cx = x;
  const cap = o.caption === undefined ? "Evidence:" : o.caption;
  if (cap) {
    const w = textWidth(cap, { size: 10, bold: true }) + 0.08;
    tb(slide, cap, { x: cx, y, w: w + 0.04, h: 0.24, size: 10, min: 10, bold: true, color: "muted", valign: "middle", name: "Evidence key" });
    cx += w + 0.08;
  }
  items.forEach(([type, text]) => {
    cx += C.addBadge(slide, { type, x: cx, y }).w + 0.06;
    if (text) {
      const w = textWidth(text, { size: 10 }) * 1.05 + 0.08;
      tb(slide, text, { x: cx, y, w, h: 0.24, size: 10, min: 10, color: "muted", valign: "middle", name: "Evidence key text" });
      cx += w + 0.2;
    }
  });
  return cx - x;
}

// =============================================================================================
// Charts
// =============================================================================================

function niceRange(values, pad = 0.16) {
  const maxV = Math.max(0, ...values);
  const minV = Math.min(0, ...values);
  const span = maxV - minV || 1;
  const raw = span / 5;
  const mag = 10 ** Math.floor(Math.log10(raw));
  const step = [1, 2, 2.5, 5, 10].map((k) => k * mag).find((s) => s >= raw) || 10 * mag;
  const hi = maxV > 0 ? maxV + span * pad : 0;
  const lo = minV < 0 ? minV - span * pad : 0;
  return { max: Math.ceil(hi / step - 1e-9) * step, min: Math.floor(lo / step + 1e-9) * step, step };
}

/** Card with title (+ badges on the title line) and unit; returns the plot area. */
function chartCard(slide, o) {
  const pad = o.pad === undefined ? 0.18 : o.pad;
  if (o.card !== false) card(slide, { x: o.x, y: o.y, w: o.w, h: o.h, name: "Chart card" });
  let top = o.y + pad;
  let bw = 0;
  if (o.badges && o.badges.length) {
    bw = badgesWidth(o.badges);
    badges(slide, o.badges, o.x + o.w - pad, top, "right");
  }
  if (o.title) {
    const tw = o.w - 2 * pad - (bw ? bw + 0.12 : 0);
    const f = fitText(o.title, { w: tw, h: 0.5, max: 12.5, min: 11, bold: true, maxLines: 2 });
    if (!f.fits) warn(`Chart title "${short(o.title)}"`, "longer than 2 lines");
    tb(slide, o.title, { x: o.x + pad, y: top, w: tw, h: f.height + 0.02, size: f.size, min: f.size, bold: true, name: "Chart title" });
    top += Math.max(f.height, bw ? 0.24 : 0) + 0.03;
  }
  if (o.unit) {
    const f = fitText(o.unit, { w: o.w - 2 * pad, h: 0.4, max: 10.5, min: 10, maxLines: 2 });
    tb(slide, o.unit, { x: o.x + pad, y: top, w: o.w - 2 * pad, h: f.height + 0.02, size: f.size, min: f.size, color: "muted", name: "Chart unit" });
    top += f.height + 0.02;
  }
  const foot = o.footH || 0;
  const y = top + 0.04;
  return { x: o.x + pad * 0.5, y, w: o.w - pad, h: o.y + o.h - pad * 0.5 - foot - y, innerX: o.x + pad, innerW: o.w - 2 * pad, bottom: o.y + o.h - pad };
}

function chartOpts(area, o) {
  return {
    x: area.x, y: area.y, w: area.w, h: area.h,
    chartArea: { fill: { color: HEX.paper } },
    plotArea: { fill: { color: HEX.paper } },
    catAxisLabelColor: CHART.label, catAxisLabelFontFace: CHART.font, catAxisLabelFontSize: o.catSize || 11,
    catAxisLineShow: true, catAxisLineColor: CHART.axisLine, catAxisMajorTickMark: "none", catAxisLabelPos: "low",
    catAxisHidden: !!o.catHidden,
    valAxisHidden: !o.showVal, valAxisLineShow: false, valAxisLabelColor: CHART.label, valAxisLabelFontFace: CHART.font,
    valAxisLabelFontSize: 10, valAxisLabelFormatCode: o.valFmt || o.fmt || NF0,
    valGridLine: o.grid ? { color: CHART.grid, size: 0.5 } : { style: "none" }, catGridLine: { style: "none" },
    showValue: o.labels !== false, dataLabelColor: CHART.value, dataLabelFontFace: CHART.font, dataLabelFontSize: o.labelSize || 11,
    dataLabelFormatCode: o.fmt || NF1,
    showLegend: !!o.legend, legendPos: o.legendPos || "t", legendFontFace: CHART.font, legendFontSize: 10.5, legendColor: CHART.label,
    showTitle: false,
    ...(o.layout ? { layout: o.layout } : {}),
  };
}

/** Native bar/column chart. o: {categories, series:[{name, values}], colors, dir, stacked, fmt, min, max, step, legend, gap, layout} */
function barChart(slide, area, o) {
  const all = o.series.flatMap((s) => s.values);
  const r = niceRange(all, o.dir === "bar" ? 0.22 : 0.16);
  let colors = o.colors;
  if (!colors) colors = o.series.length === 1 ? [CHART.single] : CHART.series.slice(0, o.series.length);
  const opts = {
    ...chartOpts(area, o),
    barDir: o.dir === "bar" ? "bar" : "col",
    barGrouping: o.stacked ? "stacked" : "clustered",
    barGapWidthPct: o.gap === undefined ? 60 : o.gap,
    ...(o.overlap !== undefined ? { barOverlapPct: o.overlap } : {}),
    chartColors: colors,
    dataLabelPosition: o.labelPos || (o.stacked ? "ctr" : "outEnd"),
    ...(o.labelColor ? { dataLabelColor: o.labelColor } : {}),
    catAxisOrientation: o.dir === "bar" ? "maxMin" : "minMax",
    valAxisMaxVal: o.max === undefined ? r.max : o.max,
    valAxisMinVal: o.min === undefined ? r.min : o.min,
    ...(o.step ? { valAxisMajorUnit: o.step } : {}),
    objectName: oname(slide, o.name || "Bar chart"),
    altText: o.alt || o.name || "Bar chart",
  };
  slide.addChart("bar", o.series.map((s) => ({ name: s.name, labels: o.categories, values: s.values })), opts);
  return { min: opts.valAxisMinVal, max: opts.valAxisMaxVal };
}

// =============================================================================================
// Rich table (bold runs, evidence tags, fills) with auto font size
// =============================================================================================

const CELL_M = [0.05, 0.08, 0.05, 0.08];
function cellObj(c) {
  return c && typeof c === "object" ? c : { text: c === undefined || c === null ? "" : String(c) };
}
function tableGeom(columns, rows, w, size) {
  const sum = columns.reduce((a, c) => a + (c.w || 1), 0);
  const colW = columns.map((c) => ((c.w || 1) / sum) * w);
  const lh = lineHeight(size, "Calibri");
  const cellH = (c, i, boldCol) => {
    const o = cellObj(c);
    let text = plain(o.text);
    if (o.tag) text += ` ${BADGES[o.tag].label}`;
    const bold = !!(boldCol || o.bold || boldShare(o.text) > 0.3);
    const lines = fitText(text, { w: colW[i] - CELL_M[1] - CELL_M[3], h: 99, max: size, min: size, bold }).lines.length;
    return lines * lh + CELL_M[0] + CELL_M[2] + 0.03;
  };
  const headerH = Math.max(...columns.map((c, i) => cellH(c.header, i, true)));
  const rowHs = rows.map((r) => Math.max(...columns.map((c, i) => cellH(r[i], i, c.bold))));
  return { colW, headerH, rowHs, height: headerH + rowHs.reduce((a, b) => a + b, 0) };
}

function table(slide, o) {
  const max = o.max || 12;
  const min = o.min || 10;
  let size = max;
  let g = tableGeom(o.columns, o.rows, o.w, size);
  while (g.height > o.h && size > min) {
    size -= 0.5;
    g = tableGeom(o.columns, o.rows, o.w, size);
  }
  if (g.height > o.h + 1e-6) warn(`Table "${short(o.columns.map((c) => c.header).join(" | "), 40)}"`, `needs ${g.height.toFixed(2)}" at ${size} pt, has ${o.h.toFixed(2)}"`);
  const border = (c) => [{ type: "none" }, { type: "none" }, { type: "solid", pt: 0.5, color: c }, { type: "none" }];
  const header = o.columns.map((c) => ({
    text: c.header,
    options: { bold: true, color: HEX.paper, fill: { color: hex(o.headerFill || "aubergine") }, align: c.align || "left", valign: "bottom", border: border(HEX.aubergine) },
  }));
  const body = o.rows.map((r, ri) => o.columns.map((c, ci) => {
    const cell = cellObj(r[ci]);
    const zebra = o.zebra !== false && ri % 2 === 1;
    const fill = cell.fill ? hex(cell.fill) : zebra ? HEX.sand : HEX.paper;
    const color = cell.color ? hex(cell.color) : HEX.ink;
    let runs = segs(cell.text).map((sg) => ({ text: sg.text, options: { bold: !!(sg.bold || cell.bold || c.bold), color } }));
    if (cell.tag) {
      const b = BADGES[cell.tag];
      const tagColor = b.fill === "paper" || /Tint$/.test(b.fill) ? hex(b.text) : hex(b.fill);
      runs = [...runs, { text: ` ${b.label}`, options: { bold: true, fontSize: Math.max(9, size - 2), color: tagColor } }];
    }
    return { text: runs, options: { fill: { color: fill }, align: cell.align || c.align || "left", valign: o.valign || "top", border: border(HEX.line), bold: !!(c.bold || cell.bold) } };
  }));
  slide.addTable([header, ...body], {
    x: o.x, y: o.y, w: o.w, colW: g.colW, rowH: [g.headerH, ...g.rowHs], fontSize: size, margin: CELL_M, autoPage: false,
    objectName: oname(slide, o.name || "Table"),
  });
  return { size, height: g.height };
}

/** Grid label on a background-coloured box sized to the wrapped text (marker lines pass behind it). */
function gridLabel(slide, text, o) {
  const f = fitText(text, { w: o.w, h: o.h, max: 10, min: 10 });
  const tw = Math.min(o.w, Math.max(...f.lines.map((ln) => textWidth(ln, { size: 10, bold: !!o.bold }))) / 0.97 + 0.06);
  const th = Math.min(o.h, f.lines.length * lineHeight(10) + 0.03);
  const x = o.align === "right" ? o.x + o.w - tw : o.x;
  slide.addText(text, {
    isTextBox: true, x, y: o.y + (o.h - th) / 2, w: tw, h: th, margin: 0, fill: { color: col("porcelain") },
    fontSize: 10, bold: !!o.bold, color: o.color ? col(o.color) : col("ink"), align: o.align || "left", valign: "middle",
    objectName: oname(slide, o.name || "Grid label"),
  });
  return f;
}

// =============================================================================================
// Time grid (months or weeks) for the growth engine, the 90-day plan and the roadmap
// =============================================================================================

function gridGeom(o) {
  const gx = o.x + o.labelW + 0.1;
  const gw = o.w - o.labelW - 0.1;
  const cw = gw / o.periods.length;
  return { gx, gw, cw, X: (t) => gx + t * cw };
}

/**
 * o: {x, y, w, labelW, periods, groups, markers:[{at,label,align}], rows:[{label, kind, h, items, values, emphasis, points, text}],
 *     rowH, headerless, labelSize}
 * kinds: bars [{start,end,label,tone}] · points/dots [{at,label,left}] · values [string per period]
 */
function timeGrid(slide, o) {
  const { gx, gw, cw, X } = gridGeom(o);
  const TONE = { primary: "plum", accent: "rose", muted: "mauve", dark: "aubergine", light: "mauveTint" };
  let y = o.y;
  if (o.groups) {
    let start = 0;
    o.groups.forEach((g) => {
      tb(slide, g.label, { x: X(start) + 0.04, y, w: g.span * cw - 0.08, h: 0.24, size: 10.5, min: 10, bold: true, color: "aubergine", valign: "middle", name: "Grid group" });
      start += g.span;
    });
    y += 0.24;
  }
  if (!o.headerless) {
    o.periods.forEach((p, i) => tb(slide, p, { x: X(i), y, w: cw, h: 0.24, size: 10, min: 10, color: "muted", align: "center", valign: "middle", name: "Grid period" }));
    y += 0.25;
  }
  const markerY = y;
  const markerH = o.markers && o.markers.length ? 0.3 : 0;
  y += markerH;
  const rowsTop = y + 0.03;
  const heights = o.rows.map((r) => r.h || o.rowH || 0.4);
  const gridBottom = rowsTop + heights.reduce((a, b) => a + b, 0);

  // Group separators and column rules
  if (o.groups) {
    let start = 0;
    o.groups.forEach((g, i) => {
      if (i > 0) rule(slide, { x: X(start), y: o.y, h: gridBottom - o.y, color: "lineStrong", width: 0.75, name: "Grid group rule" });
      start += g.span;
    });
  }
  for (let i = 1; i < o.periods.length; i++) rule(slide, { x: X(i), y: rowsTop, h: gridBottom - rowsTop, color: "line", width: 0.5, name: "Grid column rule" });
  rule(slide, { x: o.x, y: rowsTop, w: o.w, color: "lineStrong", width: 1, name: "Grid header rule" });

  // Markers (drawn first so bars sit on top)
  (o.markers || []).forEach((m) => {
    const mx = X(m.at);
    rule(slide, { x: mx, y: markerY + 0.26, h: gridBottom - markerY - 0.26, color: "rose", width: 1.25, dash: "dash", name: "Grid marker" });
    const align = m.align === "right" ? "right" : m.align === "left" ? "left" : "center";
    const px = align === "right" ? Math.min(mx + 0.25, gx + gw) : align === "left" ? Math.max(mx - 0.25, gx) : mx;
    pill(slide, m.label, { x: px, y: markerY + 0.01, h: 0.24, size: 9, fill: "roseDark", color: "paper", align, name: "Grid marker label" });
  });

  const lSize = o.labelSize || 10.5;
  let ry = rowsTop;
  o.rows.forEach((r, i) => {
    const rh = heights[i];
    if (i > 0) rule(slide, { x: o.x, y: ry, w: o.w, color: "line", width: 0.5, name: "Grid row rule" });
    tb(slide, r.label, { x: o.x, y: ry + 0.02, w: o.labelW, h: rh - 0.04, size: lSize, min: 10, color: r.labelColor || "ink", bold: !!r.labelBold, valign: "middle", name: "Grid row label" });
    const mid = ry + rh / 2;
    const bh = Math.min(0.26, rh * 0.62);

    const freeRight = (fromX, list, selfAt) => {
      // nearest item start to the right of fromX
      let lim = gx + gw;
      list.forEach((it) => {
        const sx = it.start !== undefined ? X(it.start) : X(it.at) - 0.08;
        if (sx > fromX + 0.01 && sx < lim && it !== selfAt) lim = sx;
      });
      return lim;
    };
    const allItems = [...(r.items || []), ...(r.points || []), ...(r.text || [])];

    if (r.kind === "bars") {
      (r.items || []).forEach((b) => {
        const bx = X(b.start) + 0.02;
        const bw = (b.end - b.start) * cw - 0.04;
        const tone = TONE[b.tone || "primary"];
        slide.addShape("roundRect", { x: bx, y: mid - bh / 2, w: bw, h: bh, rectRadius: bh / 2, fill: { color: col(tone) }, line: { type: "none" }, objectName: oname(slide, "Grid bar") });
        if (b.label) {
          const tw = textWidth(b.label, { bold: true, size: 10 });
          if (tw + 0.16 <= bw) {
            tb(slide, b.label, { x: bx, y: mid - bh / 2, w: bw, h: bh, size: 10, min: 10, bold: true, color: textOn(hex(tone)) === HEX.paper ? "paper" : "ink", align: "center", valign: "middle", name: "Grid bar label" });
          } else {
            const lim = freeRight(bx + bw, allItems, b);
            const avail = lim - (bx + bw) - 0.1;
            const f = fitText(b.label, { w: avail, h: rh - 0.04, max: 10, min: 10, maxLines: 2 });
            if (!f.fits) warn(`Grid bar "${short(b.label)}"`, "label fits neither inside nor after the bar");
            gridLabel(slide, b.label, { x: bx + bw + 0.06, y: ry + 0.02, w: Math.max(avail, 0.3), h: rh - 0.04, name: "Grid bar label" });
          }
        }
      });
    }
    const pts = r.kind === "points" || r.kind === "dots" ? r.items || [] : r.points || [];
    pts.forEach((p) => {
      const px = X(p.at);
      const d = 0.17;
      if (r.kind === "dots") slide.addShape("ellipse", { x: px - d / 2, y: mid - d / 2, w: d, h: d, fill: { color: col("plum") }, line: { color: col("paper"), width: 1 }, objectName: oname(slide, "Grid dot") });
      else slide.addShape("diamond", { x: px - d / 2 - 0.01, y: mid - d / 2 - 0.01, w: d + 0.02, h: d + 0.02, fill: { color: col("rose") }, line: { color: col("paper"), width: 1 }, objectName: oname(slide, "Grid milestone") });
      if (!p.label) return;
      if (p.left) {
        // label to the left, right-aligned against the marker
        let lim = gx;
        allItems.forEach((it) => {
          const ex = it.end !== undefined ? X(it.end) : X(it.at) + 0.1;
          if (ex < px - 0.01 && ex > lim && it !== p) lim = ex;
        });
        const avail = px - d / 2 - 0.06 - lim - 0.06;
        const f = fitText(p.label, { w: avail, h: rh - 0.04, max: 10, min: 10, maxLines: 2 });
        if (!f.fits) warn(`Grid point "${short(p.label)}"`, `label does not fit (${avail.toFixed(2)}")`);
        gridLabel(slide, p.label, { x: px - d / 2 - 0.06 - avail, y: ry + 0.02, w: avail, h: rh - 0.04, align: "right", name: "Grid point label" });
      } else {
        const lim = freeRight(px + 0.02, allItems, p);
        const avail = lim - px - d / 2 - 0.06 - 0.04;
        const f = fitText(p.label, { w: avail, h: rh - 0.04, max: 10, min: 10 });
        if (!f.fits) warn(`Grid point "${short(p.label)}"`, `label does not fit (${avail.toFixed(2)}")`);
        gridLabel(slide, p.label, { x: px + d / 2 + 0.06, y: ry + 0.02, w: Math.max(avail, 0.3), h: rh - 0.04, name: "Grid point label" });
      }
    });
    (r.text || []).forEach((t) => {
      const tx = X(t.at);
      const avail = gx + gw - tx - 0.04;
      const f = fitText(t.label, { w: avail, h: rh - 0.04, max: 10, min: 10, maxLines: 2 });
      if (!f.fits) warn(`Grid text "${short(t.label)}"`, "does not fit");
      gridLabel(slide, t.label, { x: tx, y: ry + 0.02, w: avail, h: rh - 0.04, bold: true, color: "roseDark", name: "Grid text" });
    });
    if (r.kind === "values") {
      r.values.forEach((v, k) => {
        if (!v) return;
        const emph = (r.emphasis || []).includes(k);
        const vs = r.size || 10.5;
        // Value cells sit on a background-coloured box sized to the text, so marker lines pass behind them.
        const tw = Math.min(cw - 0.04, Math.max(...String(v).split("\n").map((ln) => textWidth(ln, { size: vs, bold: emph }))) + 0.1);
        const th = String(v).split("\n").length * lineHeight(vs) + 0.04;
        slide.addText(String(v).split("\n").map((ln, j, a) => ({ text: ln, options: { breakLine: j < a.length - 1 } })), {
          isTextBox: true, x: X(k) + (cw - tw) / 2, y: ry + (rh - th) / 2, w: tw, h: th, margin: 0,
          fill: { color: col("porcelain") }, fontSize: vs, bold: emph, color: emph ? hex("roseDark") : col("ink"),
          align: "center", valign: "middle", objectName: oname(slide, "Grid value"),
        });
      });
    }
    ry += rh;
  });
  rule(slide, { x: o.x, y: gridBottom, w: o.w, color: "lineStrong", width: 1, name: "Grid bottom rule" });
  return { gx, gw, cw, X, rowsTop, bottom: gridBottom };
}

// =============================================================================================
// Numbered list with discs (exec summary)
// =============================================================================================

function numberedList(slide, items, o) {
  const n = items.length;
  const rowH = o.h / n;
  const disc = Math.min(0.42, rowH * 0.62);
  const colW = o.badgeColW || 0;
  const textX = o.x + disc + 0.2;
  const textW = o.w - disc - 0.2 - (colW ? colW + 0.15 : 0);
  let size = o.size || 14;
  const minSize = o.min || 11;
  for (; size > minSize; size -= 0.5) if (items.every((it) => needH(it.text, textW, size) <= rowH - 0.1)) break;
  items.forEach((it, i) => {
    const ry = o.y + i * rowH;
    if (i > 0) rule(slide, { x: o.x, y: ry, w: o.w, color: "line", name: "List rule" });
    slide.addText(headRuns(String(i + 1), { fontSize: 16, bold: true, color: col("paper") }), {
      isTextBox: true, shape: "ellipse", x: o.x, y: ry + (rowH - disc) / 2, w: disc, h: disc,
      fill: { color: col("rose") }, line: { type: "none" }, align: "center", valign: "middle", margin: 0, objectName: oname(slide, "List number"),
    });
    tb(slide, it.text, { x: textX, y: ry + 0.05, w: textW, h: rowH - 0.1, size, min: size, valign: "middle", name: "List text" });
    if (it.badges && colW) {
      const bx = o.x + o.w - colW;
      const hasNote = !!it.badgeNote;
      const groupH = 0.24 + (hasNote ? 0.2 : 0);
      const by = ry + (rowH - groupH) / 2;
      badges(slide, it.badges, bx, by, "left");
      if (hasNote) tb(slide, it.badgeNote, { x: bx, y: by + 0.26, w: colW, h: 0.2, size: 9, min: 9, color: "muted", name: "Badge note" });
    }
  });
}

// =============================================================================================
// Layouts
// =============================================================================================

function contentSlide(deck, d) {
  return deck.contentSlide({ kicker: d.kicker, title: d.title, subtitle: d.subtitle, source: d.source, note: d.note, notes: d.notes });
}

const L = {};

// ---- 1 Cover --------------------------------------------------------------------------------
L.cover = (deck, d) => {
  const s = deck.cover({ title: d.title, subtitle: d.subtitle, meta: d.meta, notes: d.notes });
  pill(s, d.draft.toUpperCase(), { x: X0, y: 1.08, h: 0.3, size: 10, fill: "aubergine", line: "roseLight", color: "roseLight", charSpacing: 1.5, name: "Draft label" });
  tb(s, d.status, { x: X0, y: 5.28, w: 7.8, h: 0.42, size: 12, min: 11, color: "onDarkMuted", name: "Status line" });
  tb(s, d.legendCaption, { x: X0, y: 5.78, w: 6, h: 0.22, size: 10, min: 10, color: "onDarkMuted", name: "Legend caption" });
  badges(s, d.legend, X0, 6.04, "left", true);
  C.addFooter(s, { note: d.note, dark: true });
  return s;
};

// ---- 2 Executive recommendation -------------------------------------------------------------
L.execRec = (deck, d) => {
  const s = contentSlide(deck, d);
  const lw = 7.9;
  card(s, { x: X0, y: TOP, w: lw, h: BOT - TOP, name: "Recommendations card" });
  label(s, d.listHeading, { x: X0 + 0.22, y: TOP + 0.16, w: 4 });
  badges(s, ["recommendation"], X0 + lw - 0.22, TOP + 0.16, "right");
  numberedList(s, d.items, { x: X0 + 0.22, y: TOP + 0.48, w: lw - 0.44, h: BOT - TOP - 0.56, badgeColW: 1.3, size: 13, min: 11 });
  const rx = X0 + lw + GAP;
  const rw = X1 - rx;
  card(s, { x: rx, y: TOP, w: rw, h: BOT - TOP, fill: "sand", line: null, name: "Not doing card" });
  label(s, d.notDoing.heading, { x: rx + 0.25, y: TOP + 0.16, w: rw - 0.5 });
  const n = d.notDoing.items.length;
  const top = TOP + 0.62;
  const rowH = 0.62;
  d.notDoing.items.forEach((t, i) => {
    const y = top + i * rowH;
    s.addText("×", { isTextBox: true, shape: "ellipse", x: rx + 0.25, y: y + 0.1, w: 0.34, h: 0.34, fill: { color: col("paper") }, line: { color: col("mauve"), width: 1 }, fontSize: 14, bold: true, color: col("mauve"), align: "center", valign: "middle", margin: 0, objectName: oname(s, "Not icon") });
    tb(s, t, { x: rx + 0.75, y, w: rw - 1.0, h: 0.54, size: 14, min: 12, valign: "middle", name: "Not item" });
  });
  tb(s, d.notDoing.foot, { x: rx + 0.25, y: top + n * rowH + 0.15, w: rw - 0.5, h: 0.5, size: 11, min: 10, color: "muted", italic: true, name: "Not foot" });
  return s;
};

// ---- 3 Executive numbers --------------------------------------------------------------------
L.execNumbers = (deck, d) => {
  const s = contentSlide(deck, d);
  evidenceKey(s, [["estimate", d.keyCaption]], X0, TOP);
  C.addKpiRow(s, { items: d.kpis, x: X0, y: TOP + 0.38, w: CW, h: 1.95, gap: 0.2 });
  const cy = TOP + 0.38 + 1.95 + 0.28;
  label(s, d.choiceHeading, { x: X0, y: cy, w: 6 });
  badges(s, ["recommendation"], X1, cy, "right");
  const oy = cy + 0.34;
  const oh = BOT - oy;
  const vsW = 0.7;
  const ow = (CW - vsW) / 2;
  d.options.forEach((op, i) => {
    const ox = X0 + i * (ow + vsW);
    card(s, { x: ox, y: oy, w: ow, h: oh, fill: i ? "paper" : "plumTint", line: i ? "line" : null, name: "Option card" });
    tb(s, [{ text: op.name, sizeDelta: 0 }], { x: ox + 0.25, y: oy + 0.16, w: ow - 1.6, h: 0.42, size: 20, min: 18, font: "head", color: "aubergine", name: "Option name" });
    tb(s, op.sub, { x: ox + 0.25, y: oy + 0.58, w: ow - 0.5, h: 0.26, size: 12, min: 11, color: "muted", name: "Option sub" });
    badges(s, ["estimate"], ox + ow - 0.22, oy + 0.2, "right");
    tb(s, op.text, { x: ox + 0.25, y: oy + 0.9, w: ow - 0.5, h: oh - 1.02, size: 14, min: 12, name: "Option text" });
  });
  s.addText("vs", { isTextBox: true, shape: "ellipse", x: X0 + ow + (vsW - 0.5) / 2, y: oy + oh / 2 - 0.25, w: 0.5, h: 0.5, fill: { color: col("rose") }, line: { type: "none" }, fontSize: 13, bold: true, color: col("paper"), align: "center", valign: "middle", margin: 0, objectName: "Versus disc" });
  return s;
};

// ---- 4 Where PNA starts ---------------------------------------------------------------------
L.startPoint = (deck, d) => {
  const s = contentSlide(deck, d);
  const topicW = 2.0;
  const foundX = X0 + topicW + 0.1;
  const soX = 8.62;
  const foundW = soX - 0.42 - foundX;
  const soW = X1 - soX;
  label(s, "What we found", { x: X0 + 0.15, y: TOP, w: 3 });
  label(s, "So what", { x: soX + 0.18, y: TOP, w: 1.5 });
  pill(s, d.callout, { x: X1, y: TOP - 0.02, h: 0.3, size: 10.5, align: "right", fill: "aubergine", color: "paper", name: "Callout chip" });
  const y0 = TOP + 0.36;
  const gap = 0.08;
  const rh = (BOT - y0 - gap * (d.rows.length - 1)) / d.rows.length;
  // Shared size for found and so-what cells
  let size = 12;
  for (; size > 10.5; size -= 0.5) if (d.rows.every((r) => needH(r.found, foundW - 0.1, size) <= rh - 0.08 && needH(r.soWhat, soW - 0.36, size) <= rh - 0.08)) break;
  d.rows.forEach((r, i) => {
    const y = y0 + i * (rh + gap);
    card(s, { x: X0, y, w: soX - 0.42 - X0 + 0.02, h: rh, name: "Found card" });
    tb(s, r.topic, { x: X0 + 0.15, y: y + 0.07, w: topicW - 0.15, h: 0.24, size: 12, min: 11, bold: true, color: "aubergine", name: "Topic" });
    badges(s, r.badges, X0 + 0.15, y + rh - 0.32, "left");
    tb(s, r.found, { x: foundX, y: y + 0.04, w: foundW - 0.1, h: rh - 0.08, size, min: size, valign: "middle", name: "Found text" });
    s.addShape("chevron", { x: soX - 0.3, y: y + rh / 2 - 0.13, w: 0.17, h: 0.26, fill: { color: col("rose") }, line: { type: "none" }, objectName: oname(s, "Arrow") });
    card(s, { x: soX, y, w: soW, h: rh, fill: "plumTint", line: null, name: "So-what card" });
    tb(s, r.soWhat, { x: soX + 0.18, y: y + 0.04, w: soW - 0.36, h: rh - 0.08, size, min: size, color: "aubergine", valign: "middle", name: "So-what text" });
  });
  return s;
};

// ---- 5 Market tree --------------------------------------------------------------------------
L.marketTree = (deck, d) => {
  const s = contentSlide(deck, d);
  const cols = [
    { x: X0, w: 3.35, lv: d.tam, fill: "paper" },
    { x: X0 + 3.35 + 0.75, w: 4.15, lv: d.sam, fill: "plumTint" },
    { x: X0 + 3.35 + 0.75 + 4.15 + 0.75, w: 3.133, lv: d.som, fill: "aubergine" },
  ];
  const by = TOP;
  const bh = 3.08;
  cols.forEach((c, i) => {
    const dark = c.fill === "aubergine";
    const pad = 0.2;
    const iw = c.w - 2 * pad;
    card(s, { x: c.x, y: by, w: c.w, h: bh, fill: c.fill, line: c.fill === "paper" ? "line" : null, name: "Market box" });
    let cy = by + 0.16;
    tb(s, c.lv.code.toUpperCase(), { x: c.x + pad, y: cy, w: iw, h: 0.22, size: 10.5, min: 10, bold: true, color: dark ? "roseLight" : "roseDark", name: "Market code" });
    cy += 0.26;
    tb(s, c.lv.title, { x: c.x + pad, y: cy, w: iw, h: 0.24, size: 12.5, min: 11, bold: true, color: dark ? "paper" : "ink", name: "Market title" });
    cy += 0.27;
    tb(s, c.lv.value, { x: c.x + pad, y: cy, w: iw, h: 0.52, size: 30, min: 26, font: "head", color: dark ? "paper" : "aubergine", name: "Market value" });
    cy += 0.54;
    const rH = needH(c.lv.range, iw, 10.5);
    tb(s, c.lv.range, { x: c.x + pad, y: cy, w: iw, h: rH + 0.02, size: 10.5, min: 10.5, color: dark ? "onDarkMuted" : "muted", name: "Market range" });
    cy += rH + 0.1;
    const bottomLimit = by + bh - pad - 0.24 - 0.1;
    if (c.lv.parts) {
      const paras = c.lv.parts.map(([l, v]) => ({ text: `${l}: **${v}**` }));
      tb(s, paras, { x: c.x + pad, y: cy, w: iw, h: bottomLimit - cy, size: 11.5, min: 10.5, paraGap: 3, name: "Market parts" });
    }
    if (c.lv.note) tb(s, c.lv.note, { x: c.x + pad, y: cy, w: iw, h: bottomLimit - cy, size: 11.5, min: 10.5, color: dark ? "paper" : "ink", name: "Market note" });
    badges(s, c.lv.badges, c.x + pad, by + bh - pad - 0.24, "left", dark);
    if (i < cols.length - 1) {
      const ax = c.x + c.w + 0.1;
      rule(s, { x: ax, y: by + bh / 2, w: 0.55, color: "rose", width: 1.75, arrow: "triangle", name: "Market connector" });
    }
  });
  const sy = by + bh + 0.16;
  const sh = 0.58;
  d.side.forEach((t, i) => {
    const c = cols[i];
    card(s, { x: c.x, y: sy, w: c.w, h: sh, fill: "porcelain", line: t.tone === "rose" ? "rose" : "mauve", dash: "dash", name: "Side box" });
    tb(s, t.text, { x: c.x + 0.16, y: sy + 0.04, w: c.w - 0.32, h: sh - 0.08, size: 11, min: 10, color: t.tone === "rose" ? "roseDark" : "muted", valign: "middle", name: "Side text" });
  });
  const ky = sy + sh + 0.16;
  const kh = BOT - ky;
  card(s, { x: X0, y: ky, w: CW, h: kh, fill: "sand", line: null, name: "Context strip" });
  const bw = badgesWidth(["verified"]);
  tb(s, d.context, { x: X0 + 0.2, y: ky + 0.03, w: CW - bw - 0.6, h: kh - 0.06, size: 11.5, min: 10.5, valign: "middle", name: "Context text" });
  badges(s, ["verified"], X1 - 0.2, ky + (kh - 0.24) / 2, "right");
  return s;
};

// ---- 6 Tricity ------------------------------------------------------------------------------
L.tricity = (deck, d) => {
  const s = contentSlide(deck, d);
  const lw = 4.55;
  const area = chartCard(s, { x: X0, y: TOP, w: lw, h: 2.3, title: d.chart.title, unit: d.chart.unit, badges: ["estimate"] });
  barChart(s, area, { categories: d.chart.categories, series: [{ name: "Tricity market", values: d.chart.values }], colors: [HEX.mauve, HEX.plum, HEX.mauve], fmt: NF2, name: "Tricity market chart" });
  const ty = TOP + 2.3 + 0.15;
  const th = 5.78 - ty;
  card(s, { x: X0, y: ty, w: lw, h: th, fill: "plumTint", line: null, name: "Take card" });
  tb(s, [{ text: d.take.head, bold: true, color: "aubergine", gapAfter: 4 }, { text: d.take.text }], { x: X0 + 0.2, y: ty + 0.12, w: lw - 0.4, h: th - 0.24, size: 11.5, min: 10.5, name: "Take text" });
  // For / against
  const rx = X0 + lw + GAP;
  const rw = X1 - rx;
  tb(s, d.hubHeading, { x: rx, y: TOP, w: rw, h: 0.28, size: 13, min: 12, bold: true, color: "aubergine", name: "Hub heading" });
  const cy = TOP + 0.38;
  const ch = 5.78 - cy;
  const cw2 = (rw - 0.25) / 2;
  [[`For`, d.forItems], [`Against`, d.againstItems]].forEach(([head, items], k) => {
    const cx = rx + k * (cw2 + 0.25);
    card(s, { x: cx, y: cy, w: cw2, h: ch, name: `${head} card` });
    label(s, head, { x: cx + 0.2, y: cy + 0.14, w: cw2 - 0.4, color: k ? "mauve" : "roseDark" });
    let iy = cy + 0.5;
    const room = cy + ch - 0.12 - iy;
    let size = 12;
    const need = (sz) => items.reduce((a, it) => a + 0.29 + needH(it.text, cw2 - 0.4, sz), 0);
    while (size > 11 && need(size) > room) size -= 0.5;
    const spare = Math.max(0, (room - need(size)) / items.length);
    items.forEach((it) => {
      C.addBadge(s, { type: it.badge, x: cx + 0.2, y: iy });
      const th = needH(it.text, cw2 - 0.4, size);
      tb(s, it.text, { x: cx + 0.2, y: iy + 0.29, w: cw2 - 0.4, h: th + 0.02, size, min: size, name: "Hub item" });
      iy += 0.29 + th + spare;
    });
  });
  // Seats strip
  const sy = 5.93;
  const sh = BOT - sy;
  card(s, { x: X0, y: sy, w: CW, h: sh, fill: "sand", line: null, name: "Seats strip" });
  tb(s, d.seats.label, { x: X0 + 0.2, y: sy + 0.06, w: 2.9, h: sh - 0.12, size: 11, min: 10.5, bold: true, color: "aubergine", valign: "middle", name: "Seats label" });
  let px = X0 + 3.25;
  d.seats.items.forEach(([m, v]) => {
    const pw = 1.12;
    card(s, { x: px, y: sy + 0.12, w: pw, h: sh - 0.24, fill: "paper", line: null, radius: 0.06, name: "Seat tile" });
    tb(s, [{ text: `${m} **${v}**` }], { x: px, y: sy + 0.12, w: pw, h: sh - 0.24, size: 14, min: 12, color: "aubergine", align: "center", valign: "middle", name: "Seat value" });
    px += pw + 0.12;
  });
  const bw = badgesWidth(["estimate"]);
  tb(s, d.seats.text, { x: px + 0.15, y: sy + 0.06, w: X1 - 0.2 - bw - 0.15 - (px + 0.15), h: sh - 0.12, size: 11, min: 10.5, valign: "middle", name: "Seats text" });
  badges(s, ["estimate"], X1 - 0.2, sy + (sh - 0.24) / 2, "right");
  return s;
};

// ---- 7 Segments -----------------------------------------------------------------------------
L.segments = (deck, d) => {
  const s = contentSlide(deck, d);
  evidenceKey(s, [["recommendation", "segment priorities and routes"]], X0, TOP);
  const t = table(s, { x: X0, y: TOP + 0.36, w: CW, h: 3.12, columns: d.columns, rows: d.rows, max: 11, min: 10, name: "Segments table" });
  const sy = TOP + 0.36 + t.height + 0.18;
  const sh = BOT - sy;
  card(s, { x: X0, y: sy, w: CW, h: sh, fill: "sand", line: null, name: "Decision unit strip" });
  const lw = 1.75;
  label(s, d.unit.heading, { x: X0 + 0.2, y: sy + 0.14, w: lw - 0.2 });
  tb(s, d.unit.sub, { x: X0 + 0.2, y: sy + 0.4, w: lw - 0.25, h: sh - 0.5, size: 14, min: 12, bold: true, color: "aubergine", name: "Unit sub" });
  const n = d.unit.stats.length;
  const bx0 = X0 + lw + 0.1;
  const bw = (X1 - 0.15 - bx0) / n;
  d.unit.stats.forEach((st, i) => {
    const x = bx0 + i * bw;
    rule(s, { x, y: sy + 0.14, h: sh - 0.28, color: "lineStrong", name: "Stat rule" });
    const bwid = badgeW(st.badge);
    C.addBadge(s, { type: st.badge, x: x + bw - 0.12 - bwid, y: sy + 0.14 });
    if (st.value) {
      tb(s, st.value, { x: x + 0.15, y: sy + 0.08, w: bw - 0.3 - bwid, h: 0.36, size: 19, min: 15, font: "head", color: "aubergine", name: "Stat value" });
      tb(s, st.label, { x: x + 0.15, y: sy + 0.46, w: bw - 0.27, h: sh - 0.5, size: 11, min: 10, name: "Stat label" });
    } else {
      tb(s, st.label, { x: x + 0.15, y: sy + 0.44, w: bw - 0.27, h: sh - 0.52, size: 12, min: 10.5, bold: true, color: "aubergine", name: "Stat label" });
    }
  });
  return s;
};

// ---- 8 Competitors --------------------------------------------------------------------------
L.competitors = (deck, d) => {
  const s = contentSlide(deck, d);
  const tw = 7.55;
  table(s, { x: X0, y: TOP, w: tw, h: BOT - TOP, columns: d.columns, rows: d.rows, max: 11.5, min: 10, name: "Competitor table" });
  const rx = X0 + tw + GAP;
  const rw = X1 - rx;
  // Price ladder (shapes on a log scale; values are labelled, so no reading off an axis is needed)
  const lh = 2.2;
  card(s, { x: rx, y: TOP, w: rw, h: lh, name: "Ladder card" });
  tb(s, d.ladder.title, { x: rx + 0.18, y: TOP + 0.14, w: rw - 0.36, h: 0.24, size: 12, min: 11, bold: true, name: "Ladder title" });
  const labW = 1.55;
  const ax0 = rx + 0.18 + labW + 0.05;
  const ax1 = rx + rw - 0.2;
  const lg = (v) => Math.log10(v);
  const PX = (v) => ax0 + ((lg(v) - lg(d.ladder.min)) / (lg(d.ladder.max) - lg(d.ladder.min))) * (ax1 - ax0);
  const ry0 = TOP + 0.46;
  const rowH = 0.28;
  const axisY = ry0 + rowH * d.ladder.rows.length + 0.04;
  d.ladder.ticks.forEach(([v, t]) => {
    rule(s, { x: PX(v), y: ry0 - 0.02, h: axisY - ry0 + 0.02, color: "line", width: 0.5, name: "Ladder grid" });
    tb(s, t, { x: PX(v) - 0.3, y: axisY + 0.02, w: 0.6, h: 0.2, size: 10, min: 10, color: "muted", align: "center", name: "Ladder tick" });
  });
  rule(s, { x: ax0, y: axisY, w: ax1 - ax0, color: "lineStrong", width: 0.75, name: "Ladder axis" });
  d.ladder.rows.forEach((r, i) => {
    const y = ry0 + i * rowH;
    tb(s, r.label, { x: rx + 0.18, y, w: labW, h: rowH, size: 10, min: 10, valign: "middle", name: "Ladder label" });
    const x0 = PX(r.lo);
    const x1 = Math.max(PX(r.hi), x0 + 0.06);
    const bh = 0.14;
    s.addShape("roundRect", { x: x0, y: y + (rowH - bh) / 2, w: x1 - x0, h: bh, rectRadius: bh / 2, fill: { color: col(i === 2 ? "rose" : "plum") }, line: { type: "none" }, objectName: oname(s, "Ladder bar") });
    const tw2 = textWidth(r.text, { size: 10, bold: true }) + 0.06;
    const right = x1 + 0.06 + tw2 <= ax1 + 0.15;
    tb(s, r.text, { x: right ? x1 + 0.06 : x0 - 0.06 - tw2, y, w: tw2, h: rowH, size: 10, min: 10, bold: true, color: "aubergine", align: right ? "left" : "right", valign: "middle", name: "Ladder value" });
  });
  // Callouts
  let cy = TOP + lh + 0.18;
  const ch = (BOT - cy - 0.12 * (d.callouts.length - 1)) / d.callouts.length;
  d.callouts.forEach((c) => {
    card(s, { x: rx, y: cy, w: rw, h: ch, fill: "plumTint", line: null, name: "Callout card" });
    const bw = badgeW(c.badge);
    C.addBadge(s, { type: c.badge, x: rx + 0.16, y: cy + (ch - 0.24) / 2 });
    tb(s, c.text, { x: rx + 0.16 + bw + 0.14, y: cy + 0.05, w: rw - 0.46 - bw, h: ch - 0.1, size: 11.5, min: 10.5, color: "aubergine", valign: "middle", name: "Callout text" });
    cy += ch + 0.12;
  });
  return s;
};

// ---- 9 White space --------------------------------------------------------------------------
L.whiteSpace = (deck, d) => {
  const s = contentSlide(deck, d);
  const ph = 0.5;
  card(s, { x: X0, y: TOP, w: CW, h: ph, fill: "aubergine", line: null, name: "Position strip" });
  label(s, "Position", { x: X0 + 0.2, y: TOP + 0.13, w: 1.1, color: "roseLight" });
  tb(s, d.position, { x: X0 + 1.3, y: TOP + 0.04, w: CW - 1.5, h: ph - 0.08, size: 12.5, min: 11, color: "paper", valign: "middle", name: "Position text" });
  const fy = TOP + ph + 0.2;
  const chipY = BOT - 0.36;
  // Paired rows: badge inline at the left of each cell, text beside it.
  const arrowW = 0.55;
  const colW = (CW - arrowW) / 2;
  label(s, d.leftHeader, { x: X0, y: fy, w: colW });
  label(s, d.rightHeader, { x: X0 + colW + arrowW, y: fy, w: colW });
  const ry0 = fy + 0.32;
  const gap = 0.12;
  const rh = (chipY - 0.2 - ry0 - gap * (d.rows.length - 1)) / d.rows.length;
  const bcol = 1.58;
  const tw = colW - 0.36 - bcol;
  let size = 13;
  while (size > 11 && !d.rows.every((r) => needH(r.finding, tw, size) <= rh - 0.12 && needH(r.soWhat, tw, size) <= rh - 0.12)) size -= 0.5;
  d.rows.forEach((r, i) => {
    const y = ry0 + i * (rh + gap);
    [[X0, r.finding, r.badge, "paper", "ink"], [X0 + colW + arrowW, r.soWhat, r.soWhatBadge, "plumTint", "aubergine"]].forEach(([x, text, b, fill, color]) => {
      card(s, { x, y, w: colW, h: rh, fill, line: fill === "paper" ? "line" : null, name: fill === "paper" ? "Finding card" : "So-what card" });
      if (b) C.addBadge(s, { type: b, x: x + 0.18, y: y + (rh - 0.24) / 2 });
      tb(s, text, { x: x + 0.18 + bcol, y: y + 0.05, w: tw, h: rh - 0.1, size, min: size, color, valign: "middle", name: "Finding text" });
    });
    s.addShape("chevron", { x: X0 + colW + arrowW / 2 - 0.09, y: y + rh / 2 - 0.14, w: 0.18, h: 0.28, fill: { color: col("rose") }, line: { type: "none" }, objectName: oname(s, "Findings arrow") });
  });
  const half = (CW - 0.3) / 2;
  d.chips.forEach((c, i) => {
    const x = X0 + i * (half + 0.3);
    pill(s, `**${c.label.toUpperCase()}**   ${c.text}`, { x, y: chipY, w: half, h: 0.36, size: 11, bold: false, fill: i ? "aubergine" : "mauveTint", color: i ? "paper" : "aubergine", name: "Moat chip" });
  });
  return s;
};

// ---- 10 Scorecard ---------------------------------------------------------------------------
L.scorecard = (deck, d) => {
  const s = contentSlide(deck, d);
  const tw = 6.75;
  const cols = [3.2, 0.8, 0.8, 0.8, tw - 3.2 - 0.8 * 3];
  const xs = cols.reduce((a, w, i) => [...a, i ? a[i - 1] + cols[i - 1] : X0], []);
  const headH = 0.44;
  const intH = 0.56;
  const rowH = 0.244;
  card(s, { x: X0, y: TOP, w: tw, h: headH + intH + rowH * (d.options.length - 1), radius: 0.04, name: "Score table" });
  d.headers.forEach((h, i) => {
    const w = cols[i];
    if (i === 0) {
      tb(s, h, { x: xs[0] + 0.12, y: TOP + 0.04, w: 0.8, h: headH - 0.08, size: 10.5, min: 10, bold: true, valign: "bottom", name: "Score header" });
      C.addBadge(s, { type: "hypothesis", x: xs[0] + 0.85, y: TOP + headH - 0.3 });
    } else {
      tb(s, h.replace("-", "-\n"), { x: xs[i], y: TOP + 0.04, w, h: headH - 0.08, size: 10, min: 10, bold: true, align: "center", valign: "bottom", name: "Score header" });
    }
  });
  rule(s, { x: X0 + 0.08, y: TOP + headH, w: tw - 0.16, color: "lineStrong", width: 1, name: "Score header rule" });
  let y = TOP + headH;
  d.options.forEach((op, r) => {
    const h = op.desc ? intH : rowH;
    if (op.tint) s.addShape("rect", { x: X0 + 0.03, y: y + 0.015, w: tw - 0.06, h: h - 0.03, fill: { color: col("plumTint") }, line: { type: "none" }, objectName: oname(s, "Score highlight") });
    if (r > 0) rule(s, { x: X0 + 0.08, y, w: tw - 0.16, color: "line", width: 0.5, name: "Score rule" });
    const paras = [{ text: op.name, bold: !!op.bold }];
    if (op.desc) paras.push({ text: op.desc, color: "muted", sizeDelta: -0.5 });
    tb(s, paras, { x: xs[0] + 0.12, y: y + 0.01, w: cols[0] - 0.16, h: h - 0.02, size: 10.5, min: 10, paraGap: 0, valign: "middle", name: "Score option" });
    op.s.forEach((v, k) => tb(s, v, { x: xs[k + 1], y, w: cols[k + 1], h, size: 10.5, min: 10.5, bold: !!op.bold, color: op.bold ? "aubergine" : "ink", align: "center", valign: "middle", name: "Score value" }));
    if (op.ko) tb(s, op.ko, { x: xs[4] + 0.04, y, w: cols[4] - 0.08, h, size: 10, min: 10, bold: true, color: "roseDark", align: "center", valign: "middle", name: "Score KO" });
    y += h;
  });
  tb(s, d.caption, { x: X0, y: y + 0.08, w: tw, h: BOT - y - 0.08, size: 10, min: 10, color: "muted", name: "Score caption" });
  // Why-not panel
  const rx = X0 + tw + GAP;
  const rw = X1 - rx;
  card(s, { x: rx, y: TOP, w: rw, h: BOT - TOP, name: "Why-not card" });
  tb(s, "Why not", { x: rx + 0.22, y: TOP + 0.14, w: 2, h: 0.3, size: 14, min: 14, bold: true, color: "aubergine", name: "Why-not heading" });
  const iw = rw - 0.44;
  let size = 11.5;
  const total = (sz) => d.whyNot.reduce((a, it) => a + 0.27 + needH(it.text, iw, sz) + 0.12, 0);
  while (size > 10.5 && total(size) > BOT - TOP - 0.62) size -= 0.5;
  let iy = TOP + 0.55;
  d.whyNot.forEach((it) => {
    tb(s, it.lead, { x: rx + 0.22, y: iy, w: iw - badgesWidth(it.badges) - 0.1, h: 0.25, size: size + 0.5, min: size, bold: true, color: "aubergine", valign: "middle", name: "Why-not lead" });
    badges(s, it.badges, rx + rw - 0.22, iy + 0.005, "right");
    const th = needH(it.text, iw, size);
    tb(s, it.text, { x: rx + 0.22, y: iy + 0.27, w: iw, h: th + 0.02, size, min: size, name: "Why-not text" });
    iy += 0.27 + th + 0.12;
  });
  return s;
};

// ---- 11 Recommended model -------------------------------------------------------------------
L.model = (deck, d) => {
  const s = contentSlide(deck, d);
  const lw = 9.05;
  // Engine 1
  const e1h = 2.5;
  card(s, { x: X0, y: TOP, w: lw, h: e1h, fill: "plumTint", line: null, name: "Engine 1 card" });
  label(s, d.engine1.heading, { x: X0 + 0.22, y: TOP + 0.14, w: 5 });
  badges(s, ["recommendation"], X0 + lw - 0.22, TOP + 0.14, "right");
  const [ladder, ...parts] = d.engine1.parts;
  const ly = TOP + 0.5;
  card(s, { x: X0 + 0.22, y: ly, w: lw - 0.44, h: 0.56, fill: "paper", line: null, radius: 0.06, name: "Ladder tile" });
  tb(s, [{ text: `**${ladder.head}:** ${ladder.text}` }], { x: X0 + 0.38, y: ly, w: lw - 0.76, h: 0.56, size: 12, min: 10.5, valign: "middle", name: "Ladder tile text" });
  const ty = ly + 0.56 + 0.13;
  const th = TOP + e1h - 0.2 - ty;
  const tw = (lw - 0.44 - 0.15 * (parts.length - 1)) / parts.length;
  parts.forEach((p, i) => {
    const x = X0 + 0.22 + i * (tw + 0.15);
    card(s, { x, y: ty, w: tw, h: th, fill: "paper", line: null, radius: 0.06, name: "Part tile" });
    tb(s, [{ text: p.head, bold: true, color: "aubergine", gapAfter: 3 }, { text: p.text }], { x: x + 0.12, y: ty + 0.1, w: tw - 0.24, h: th - 0.16, size: 11, min: 10, name: "Part text" });
  });
  // Engine 2
  const e2y = TOP + e1h + 0.15;
  const e2h = 1.0;
  card(s, { x: X0, y: e2y, w: lw, h: e2h, name: "Engine 2 card" });
  label(s, d.engine2.heading, { x: X0 + 0.22, y: e2y + 0.12, w: 5 });
  badges(s, ["recommendation", ...d.engine2.badges], X0 + lw - 0.22, e2y + 0.12, "right");
  tb(s, d.engine2.text, { x: X0 + 0.22, y: e2y + 0.42, w: lw - 0.44, h: e2h - 0.5, size: 12, min: 10.5, name: "Engine 2 text" });
  // Brand architecture
  const by = e2y + e2h + 0.15;
  const bh = BOT - by;
  card(s, { x: X0, y: by, w: lw, h: bh, fill: "sand", line: null, name: "Brand strip" });
  label(s, d.brand.heading, { x: X0 + 0.22, y: by + 0.1, w: 4 });
  const py = by + 0.38;
  const mp = pill(s, d.brand.master, { x: X0 + 0.22, y: py + 0.04, h: 0.34, size: 11, fill: "aubergine", color: "paper", name: "Masterbrand" });
  const ax = mp.x + mp.w + 0.08;
  s.addText("→", { isTextBox: true, x: ax, y: py + 0.04, w: 0.3, h: 0.34, fontSize: 14, bold: true, color: col("rose"), align: "center", valign: "middle", margin: 0, objectName: oname(s, "Brand arrow") });
  const bx = ax + 0.38;
  tb(s, [{ text: d.brand.subs.join("  ·  "), bold: true, color: "aubergine" }, { text: d.brand.sister, color: "muted", italic: true }], { x: bx, y: py - 0.04, w: X0 + lw - 0.2 - bx, h: BOT - py - 0.04, size: 11.5, min: 10, paraGap: 2, valign: "middle", name: "Sub-brands" });
  // Founder-share gauge
  const gx = X0 + lw + GAP;
  const gw = X1 - gx;
  const area = chartCard(s, { x: gx, y: TOP, w: gw, h: BOT - TOP, title: d.gauge.title, unit: d.gauge.unit, footH: 0.72 });
  badges(s, ["recommendation"], gx + 0.18, BOT - 0.76, "left");
  barChart(s, area, { categories: d.gauge.categories, series: [{ name: "Founder share", values: d.gauge.values }], colors: [HEX.plum, HEX.plum, HEX.plum, HEX.rose, HEX.rose], fmt: '0"%"', max: 60, min: 0, name: "Founder share chart" });
  tb(s, d.gauge.caption, { x: gx + 0.18, y: BOT - 0.48, w: gw - 0.36, h: 0.38, size: 11, min: 10, color: "muted", italic: true, name: "Gauge caption" });
  return s;
};

// ---- 12 Geography and gates -----------------------------------------------------------------
L.geography = (deck, d) => {
  const s = contentSlide(deck, d);
  const gH = 2.88;
  C.addGateTimeline(s, { x: X0, y: TOP, w: CW, h: gH, gates: d.gates });
  const by = TOP + gH + 0.2;
  const lw = 7.65;
  label(s, d.insetTitle, { x: X0, y: by, w: 4.6 });
  badges(s, ["estimate", "verified"], X0 + lw, by, "right");
  const keyY = BOT + 0.08;
  const iy = by + 0.3;
  const labW = 1.7;
  const room = keyY - 0.08 - iy;
  let size = 11;
  const total = (sz) => d.inset.reduce((a, [, b]) => a + needH(b, lw - labW - 0.1, sz) + 0.06, 0);
  while (size > 10 && total(size) > room) size -= 0.5;
  const spare = Math.max(0, (room - total(size)) / d.inset.length);
  let y = iy;
  d.inset.forEach(([a, b], i) => {
    const h = needH(b, lw - labW - 0.1, size) + 0.02;
    if (i > 0) rule(s, { x: X0, y: y - 0.03, w: lw, color: "line", width: 0.5, name: "Inset rule" });
    tb(s, a, { x: X0, y, w: labW, h, size, min: size, bold: true, color: "aubergine", name: "Inset label" });
    tb(s, b, { x: X0 + labW + 0.1, y, w: lw - labW - 0.1, h, size, min: size, name: "Inset text" });
    y += h + 0.04 + spare;
  });
  const dx = X0 + lw + GAP;
  const dw = X1 - dx;
  card(s, { x: dx, y: by, w: dw, h: BOT - by, fill: "amberTint", line: "amber", name: "Disclosure card" });
  badges(s, ["recommendation"], dx + 0.2, by + 0.12, "left");
  tb(s, "Stages and gate thresholds", { x: dx + 0.2 + badgeW("recommendation") + 0.08, y: by + 0.12, w: 2.4, h: 0.24, size: 10, min: 10, color: "amberDark", valign: "middle", name: "Disclosure key" });
  tb(s, d.disclosure, { x: dx + 0.2, y: by + 0.44, w: dw - 0.4, h: BOT - by - 0.54, size: 11.5, min: 10.5, color: "amberDark", valign: "middle", name: "Disclosure text" });
  return s;
};

// ---- 13 Programme ladder --------------------------------------------------------------------
L.ladder = (deck, d) => {
  const s = contentSlide(deck, d);
  evidenceKey(s, d.keyItems, X0, TOP);
  const ty = TOP + 0.36;
  const tw = 8.05;
  const t = table(s, { x: X0, y: ty, w: tw, h: BOT - 0.4 - ty, columns: d.columns, rows: d.rows, max: 11.5, min: 10, name: "Ladder table" });
  tb(s, d.tagline, { x: X0, y: Math.max(ty + t.height + 0.12, BOT - 0.34), w: tw, h: 0.32, size: 14, min: 12, italic: true, color: "roseDark", font: "head", name: "Tagline" });
  const rx = X0 + tw + GAP;
  const rw = X1 - rx;
  const gatingH = needH(d.gating.map((x) => ({ text: x })), rw - 0.4, 11, 5) + 0.56;
  const ch = BOT - ty - gatingH - 0.15;
  const area = chartCard(s, { x: rx, y: ty, w: rw, h: ch, title: d.chart.title, unit: d.chart.unit, badges: ["estimate"] });
  barChart(s, area, { dir: "bar", categories: d.chart.categories, series: [{ name: "All-in cost", values: d.chart.values }], colors: [HEX.mauve, HEX.plum, HEX.plum, HEX.plum, HEX.rose, HEX.rose], fmt: NF2, catSize: 10, labelSize: 10.5, gap: 40, max: 1.6, min: 0, name: "All-in cost chart" });
  const gy = ty + ch + 0.15;
  const gh = BOT - gy;
  card(s, { x: rx, y: gy, w: rw, h: gh, fill: "plumTint", line: null, name: "Gating card" });
  label(s, "Price steps are gated", { x: rx + 0.2, y: gy + 0.12, w: rw - 0.4 });
  tb(s, d.gating.map((x) => ({ text: x })), { x: rx + 0.2, y: gy + 0.42, w: rw - 0.4, h: gh - 0.5, size: 11, min: 10, color: "aubergine", paraGap: 5, name: "Gating text" });
  return s;
};

// ---- 14 Admissions funnel -------------------------------------------------------------------
L.funnel = (deck, d) => {
  const s = contentSlide(deck, d);
  const fw = 7.85;
  const labW = 2.45;
  const barX = X0 + labW + 0.15;
  const barMax = X0 + fw - barX;
  label(s, "Stage", { x: X0, y: TOP, w: 1.5 });
  label(s, d.funnelHeader, { x: barX, y: TOP, w: 4 });
  badges(s, ["estimate"], X0 + fw, TOP, "right");
  const y0 = TOP + 0.36;
  const leadH = 1.02;
  const chipY = BOT - 0.42;
  const rowH = (chipY - 0.16 - y0 - leadH) / (d.stages.length - 1);
  const n = d.stages.length;
  const ROUTE_COLORS = [HEX.plum, HEX.aubergine, HEX.mauve, HEX.roseLight, HEX.rose];
  d.stages.forEach((st, i) => {
    const ry = i === 0 ? y0 : y0 + leadH + (i - 1) * rowH;
    const rh = i === 0 ? leadH : rowH;
    const bh = Math.min(0.36, rowH * 0.72);
    const by = i === 0 ? ry + 0.04 : ry + (rh - bh) / 2;
    tb(s, [{ text: st.label, bold: true }, ...(st.sub ? [{ text: st.sub, color: "muted", sizeDelta: -1.5 }] : [])], { x: X0, y: i === 0 ? ry : ry, w: labW, h: i === 0 ? 0.46 : rh, size: 12, min: 11, paraGap: 0, valign: "middle", name: "Funnel stage" });
    const frac = 1 - (i * 0.62) / (n - 1);
    const bw = barMax * frac;
    if (i === 0) {
      let x = barX;
      const total = d.routes.reduce((a, r) => a + r.value, 0);
      const lw2 = bw - 0.75;
      d.routes.forEach((r, k) => {
        const w = (r.value / total) * lw2;
        s.addShape("rect", { x, y: by, w: Math.max(w - 0.02, 0.02), h: bh, fill: { color: ROUTE_COLORS[k] }, line: { type: "none" }, objectName: oname(s, "Route segment") });
        x += w;
      });
      tb(s, d.stages[0].value, { x: barX + lw2 + 0.08, y: by, w: 0.67, h: bh, size: 15, min: 13, bold: true, color: "aubergine", valign: "middle", name: "Funnel value" });
      // Route legend under the lead bar, wrapping onto a second row
      let lx = barX;
      let ly = by + bh + 0.06;
      d.routes.forEach((r, k) => {
        const t = `${r.label} ${r.text}`;
        const w = textWidth(t, { size: 10 }) + 0.08;
        if (lx + 0.17 + w > X0 + fw) {
          lx = barX;
          ly += 0.22;
        }
        s.addShape("rect", { x: lx, y: ly + 0.055, w: 0.12, h: 0.12, fill: { color: ROUTE_COLORS[k] }, line: { type: "none" }, objectName: oname(s, "Route key") });
        tb(s, t, { x: lx + 0.16, y: ly, w, h: 0.22, size: 10, min: 10, valign: "middle", name: "Route key text" });
        lx += 0.16 + w + 0.16;
      });
      badges(s, ["hypothesis"], X0 + fw, ly, "right");
    } else {
      const last = i === n - 1;
      const fill = last ? HEX.rose : mixHex(HEX.aubergine, "B48DA3", (i - 1) / (n - 2));
      s.addShape("roundRect", { x: barX, y: by, w: bw, h: bh, rectRadius: 0.05, fill: { color: fill }, line: { type: "none" }, objectName: oname(s, "Funnel bar") });
      const v = st.value;
      const vw = textWidth(v, { size: 14, bold: true }) + 0.2;
      if (vw <= bw) tb(s, v, { x: barX + 0.1, y: by, w: bw - 0.2, h: bh, size: 14, min: 12, bold: true, color: textOn(fill) === HEX.paper ? "paper" : "ink", valign: "middle", name: "Funnel value" });
      else tb(s, v, { x: barX + bw + 0.1, y: by, w: 2.2, h: bh, size: 14, min: 12, bold: true, color: "aubergine", valign: "middle", name: "Funnel value" });
    }
  });
  // Service standard
  const rx = X0 + fw + GAP;
  const rw = X1 - rx;
  const ch = chipY - 0.16 - TOP;
  card(s, { x: rx, y: TOP, w: rw, h: ch, fill: "plumTint", line: null, name: "Standard card" });
  label(s, d.standardHeading, { x: rx + 0.2, y: TOP + 0.14, w: 2.2 });
  badges(s, ["recommendation"], rx + rw - 0.2, TOP + 0.14, "right");
  const footH = needH(d.standardFoot, rw - 0.4, 10.5);
  tb(s, d.standards.map((t) => ({ text: t, bullet: true })), { x: rx + 0.2, y: TOP + 0.55, w: rw - 0.4, h: ch - 0.67 - footH - 0.1, size: 13.5, min: 11, paraGap: 9, color: "aubergine", name: "Standards" });
  tb(s, d.standardFoot, { x: rx + 0.2, y: TOP + ch - 0.12 - footH, w: rw - 0.4, h: footH, size: 10.5, min: 10.5, color: "muted", name: "Standards foot" });
  // Chip
  card(s, { x: X0, y: chipY, w: CW, h: BOT - chipY, fill: "amberTint", line: null, name: "Speed chip" });
  const bw2 = badgesWidth(["estimate", "claim"]);
  tb(s, d.chip, { x: X0 + 0.2, y: chipY + 0.02, w: CW - bw2 - 0.6, h: BOT - chipY - 0.04, size: 11.5, min: 10.5, color: "amberDark", valign: "middle", name: "Speed chip text" });
  badges(s, ["estimate", "claim"], X1 - 0.2, chipY + (BOT - chipY - 0.24) / 2, "right");
  return s;
};

function mixHex(a, b, t) {
  const A = [0, 2, 4].map((i) => parseInt(a.slice(i, i + 2), 16));
  const B = [0, 2, 4].map((i) => parseInt(b.slice(i, i + 2), 16));
  return A.map((v, i) => Math.round(v + (B[i] - v) * t).toString(16).padStart(2, "0")).join("").toUpperCase();
}

// ---- 15 Growth engine -----------------------------------------------------------------------
L.growth = (deck, d) => {
  const s = contentSlide(deck, d);
  // Flywheel (left)
  const fw = 3.95;
  const fh = 2.3;
  card(s, { x: X0, y: TOP, w: fw, h: fh, name: "Flywheel card" });
  const cx = X0 + fw / 2;
  const cy = TOP + fh / 2 + 0.02;
  const rx = 1.32;
  const ry = 0.74;
  s.addShape("ellipse", { x: cx - rx, y: cy - ry, w: 2 * rx, h: 2 * ry, fill: { type: "none" }, line: { color: col("rose"), width: 1.5 }, objectName: "Flywheel ring" });
  tb(s, d.flywheelCentre, { x: cx - 0.55, y: cy - 0.22, w: 1.1, h: 0.44, size: 12, min: 11, bold: true, italic: true, color: "roseDark", align: "center", valign: "middle", font: "head", name: "Flywheel centre" });
  const pos = [[cx, cy - ry, 1.95], [cx + rx, cy, 1.18], [cx, cy + ry, 1.95], [cx - rx, cy, 1.18]];
  const nodeH = 0.5;
  pos.forEach(([px, py, nodeW], i) => {
    const x = Math.min(Math.max(px - nodeW / 2, X0 + 0.08), X0 + fw - 0.08 - nodeW);
    card(s, { x, y: py - nodeH / 2, w: nodeW, h: nodeH, fill: i === 0 ? "aubergine" : "paper", line: i === 0 ? null : "plum", radius: 0.1, name: "Flywheel node" });
    tb(s, d.flywheel[i], { x: x + 0.06, y: py - nodeH / 2, w: nodeW - 0.12, h: nodeH, size: 10.5, min: 10, bold: true, color: i === 0 ? "paper" : "aubergine", align: "center", valign: "middle", name: "Flywheel text" });
  });
  // Arrowheads on the ring (clockwise), between nodes
  [45, 135, 225, 315].forEach((deg) => {
    const a = (deg * Math.PI) / 180;
    const ax = cx + rx * Math.cos(a - Math.PI / 2);
    const ay = cy + ry * Math.sin(a - Math.PI / 2);
    s.addShape("triangle", { x: ax - 0.08, y: ay - 0.08, w: 0.16, h: 0.16, rotate: deg + 90, fill: { color: col("rose") }, line: { type: "none" }, objectName: oname(s, "Flywheel arrow") });
  });
  // Spend gates card
  const gy = TOP + fh + 0.15;
  const gh = BOT - gy;
  card(s, { x: X0, y: gy, w: fw, h: gh, fill: "plumTint", line: null, name: "Spend gates card" });
  tb(s, [
    { text: d.gatesCard.heading, bold: true, color: "aubergine", gapAfter: 3 },
    { text: d.gatesCard.gates, gapAfter: 6 },
    { text: d.gatesCard.mix, gapAfter: 6 },
    { text: d.gatesCard.spend },
  ], { x: X0 + 0.18, y: gy + 0.12, w: fw - 0.36, h: gh - 0.48, size: 11, min: 10, name: "Spend gates text" });
  badges(s, ["recommendation", "hypothesis", "estimate"], X0 + 0.18, gy + gh - 0.34, "left");
  // Timeline (right)
  const tx = X0 + fw + GAP;
  const tw = X1 - tx;
  const labelW = 1.45;
  const geom = gridGeom({ x: tx, w: tw, labelW, periods: MONTHS });
  tb(s, d.chartTitle, { x: tx, y: TOP, w: tw - badgesWidth(["estimate"]) - 0.1, h: 0.26, size: 12, min: 11, bold: true, name: "Media title" });
  badges(s, ["estimate"], X1, TOP, "right");
  const chY = TOP + 0.32;
  const chH = 1.6;
  tb(s, "Paid-media cap, ₹k/month", { x: tx, y: chY, w: labelW, h: chH, size: 10.5, min: 10, valign: "middle", name: "Media row label" });
  const colors = d.media.map((_, i) => (i >= d.rampFrom ? HEX.rose : HEX.plum));
  barChart(s, { x: geom.gx, y: chY, w: geom.gw, h: chH }, {
    categories: MONTHS, series: [{ name: "Paid-media cap", values: d.media }], colors, fmt: NF0, catHidden: true, gap: 45,
    max: 175, min: 0, layout: { x: 0, y: 0.02, w: 1, h: 0.96 }, labelSize: 10.5, name: "Media cap chart",
  });
  const g = timeGrid(s, {
    x: tx, y: chY + chH + 0.02, w: tw, labelW, periods: MONTHS, groups: null,
    markers: d.gateMarks,
    rows: [
      { label: "Phase", kind: "bars", items: d.phases, h: 0.38 },
      { label: "Career-enquiry index", kind: "values", values: d.seasonality, emphasis: [6, 7, 8], h: 0.34 },
      { label: "Founder availability", kind: "bars", items: d.availability, h: 0.38 },
    ],
  });
  tb(s, `**${d.rampNote}**`, { x: geom.X(9), y: chY + 0.02, w: geom.gw * 0.25, h: 0.36, size: 10, min: 10, color: "roseDark", align: "center", name: "Ramp note" });
  const cy2 = g.bottom + 0.14;
  card(s, { x: tx, y: cy2, w: tw, h: BOT - cy2, fill: "sand", line: null, name: "Gate rule chip" });
  tb(s, d.chip, { x: tx + 0.18, y: cy2 + 0.04, w: tw - 0.36, h: BOT - cy2 - 0.08, size: 11, min: 10, valign: "middle", name: "Gate rule text" });
  return s;
};

// ---- 16 Blueprint ---------------------------------------------------------------------------
L.blueprint = (deck, d) => {
  const s = contentSlide(deck, d);
  const widths = [2.85, 2.75, 3.25, 2.53];
  const arrowW = 0.25;
  const fh = 2.45;
  let x = X0;
  const sizeFor = (w, items) => {
    for (let sz = 11.5; sz >= 10; sz -= 0.5) if (needH(items.map((t) => ({ text: t, bullet: true })), w - 0.36, sz, 3) <= fh - 0.62) return sz;
    return 10;
  };
  const size = Math.min(...d.flow.map((f, i) => sizeFor(widths[i], f.items)));
  d.flow.forEach((f, i) => {
    const w = widths[i];
    card(s, { x, y: TOP, w, h: fh, fill: i === 2 ? "plumTint" : "paper", line: i === 2 ? null : "line", name: "Flow box" });
    pill(s, f.head, { x: x + 0.15, y: TOP + 0.13, h: 0.3, size: 11, fill: "aubergine", color: "paper", name: "Flow head" });
    tb(s, f.items.map((t) => ({ text: t, bullet: true })), { x: x + 0.18, y: TOP + 0.52, w: w - 0.36, h: fh - 0.62, size, min: 10, paraGap: 3, name: "Flow items" });
    if (i < d.flow.length - 1) s.addShape("chevron", { x: x + w + 0.04, y: TOP + fh / 2 - 0.14, w: arrowW - 0.08, h: 0.28, fill: { color: col("rose") }, line: { type: "none" }, objectName: oname(s, "Flow arrow") });
    x += w + arrowW;
  });
  badges(s, ["recommendation"], X1 - 0.15, TOP + 0.16, "right");
  // Bottom cards
  const by = TOP + fh + 0.2;
  const bh = BOT - by;
  const w1 = 3.3;
  const w3 = 3.25;
  const w2 = CW - w1 - w3 - 2 * GAP;
  // Run-rate
  card(s, { x: X0, y: by, w: w1, h: bh, name: "Run-rate card" });
  label(s, d.runRate.heading, { x: X0 + 0.2, y: by + 0.14, w: 2 });
  badges(s, ["estimate"], X0 + w1 - 0.2, by + 0.14, "right");
  d.runRate.rows.forEach(([a, b], i) => {
    const ry = by + 0.55 + i * 0.42;
    if (i > 0) rule(s, { x: X0 + 0.2, y: ry - 0.04, w: w1 - 0.4, color: "line", name: "Run-rate rule" });
    tb(s, a, { x: X0 + 0.2, y: ry, w: 1.4, h: 0.34, size: 12, min: 11, valign: "middle", name: "Run-rate plan" });
    tb(s, b, { x: X0 + 1.6, y: ry, w: w1 - 1.8, h: 0.34, size: 16, min: 14, bold: i === 1, color: i === 1 ? "roseDark" : "aubergine", align: "right", valign: "middle", font: "head", name: "Run-rate value" });
  });
  // One-pager
  const x2 = X0 + w1 + GAP;
  card(s, { x: x2, y: by, w: w2, h: bh, fill: "sand", line: null, name: "One-pager card" });
  label(s, d.onePager.heading, { x: x2 + 0.2, y: by + 0.14, w: 3 });
  badges(s, ["recommendation"], x2 + w2 - 0.2, by + 0.14, "right");
  const half = Math.ceil(d.onePager.items.length / 2);
  const cw2 = (w2 - 0.5) / 2;
  [d.onePager.items.slice(0, half), d.onePager.items.slice(half)].forEach((list, k) => {
    tb(s, list.map((t) => ({ text: t, bullet: true })), { x: x2 + 0.2 + k * (cw2 + 0.1), y: by + 0.46, w: cw2, h: bh - 0.56, size: 11.5, min: 10, paraGap: 2, name: "One-pager items" });
  });
  // Attribution
  const x3 = x2 + w2 + GAP;
  card(s, { x: x3, y: by, w: w3, h: bh, fill: "plumTint", line: null, name: "Attribution card" });
  label(s, d.attribution.heading, { x: x3 + 0.2, y: by + 0.14, w: w3 - 0.4 });
  tb(s, d.attribution.text, { x: x3 + 0.2, y: by + 0.46, w: w3 - 0.4, h: bh - 0.56, size: 11.5, min: 10, color: "aubergine", name: "Attribution text" });
  return s;
};

// ---- 17 Channel economics -------------------------------------------------------------------
L.channel = (deck, d) => {
  const s = contentSlide(deck, d);
  const lw = 6.55;
  label(s, d.tableTitle, { x: X0, y: TOP, w: 3 });
  badges(s, ["estimate", "hypothesis"], X0 + lw, TOP, "right");
  const t = table(s, { x: X0, y: TOP + 0.32, w: lw, h: 2.3, columns: d.columns, rows: d.rows, max: 11, min: 10.5, name: "Route table" });
  const ry = TOP + 0.32 + t.height + 0.16;
  const splitY = BOT - 0.48;
  const rh = splitY - 0.14 - ry;
  card(s, { x: X0, y: ry, w: lw, h: rh, fill: "amberTint", line: null, name: "Reconciliation card" });
  tb(s, d.recon.map((t2) => ({ text: t2, bullet: true })), { x: X0 + 0.16, y: ry + 0.08, w: lw - 0.32, h: rh - 0.14, size: 11.5, min: 10, paraGap: 3, color: "amberDark", name: "Reconciliation text" });
  // Chart (combo: columns + planning-case line)
  const cx = X0 + lw + GAP;
  const cw = X1 - cx;
  const detailH = 0.62;
  const area = chartCard(s, { x: cx, y: TOP, w: cw, h: splitY - 0.14 - TOP, title: d.chart.title, badges: ["estimate"], footH: detailH + 0.28 });
  const pres = deck.pres;
  const base = chartOpts(area, { fmt: NF1, labels: true });
  s.addChart([
    { type: pres.charts.BAR, data: [{ name: "Media CAC", labels: d.chart.categories, values: d.chart.values }], options: { barDir: "col", barGrouping: "clustered", barGapWidthPct: 70, chartColors: [HEX.rose, HEX.plum, HEX.mauve], showValue: true, dataLabelPosition: "outEnd", dataLabelFormatCode: NF1, dataLabelFontFace: CHART.font, dataLabelFontSize: 11, dataLabelColor: CHART.value } },
    { type: pres.charts.LINE, data: [{ name: "Planning case effective CAC", labels: d.chart.categories, values: d.chart.categories.map(() => d.chart.line) }], options: { chartColors: [HEX.amber], lineSize: 2, lineDash: "dash", lineDataSymbol: "none", showValue: false } },
  ], { ...base, valAxisMinVal: 0, valAxisMaxVal: 22, valAxisHidden: true, showLegend: false, objectName: "CAC chart", altText: d.chart.title });
  // Line label (top right of plot, above the dashed line)
  const yLine = area.y + area.h * (1 - d.chart.line / 22);
  tb(s, d.chart.lineLabel, { x: area.x + 0.1, y: yLine - 0.42, w: area.w * 0.58, h: 0.38, size: 10, min: 10, bold: true, color: "amberDark", valign: "bottom", name: "CAC line label" });
  const fy = area.y + area.h + 0.04;
  tb(s, `**${d.chart.bands}**`, { x: area.innerX, y: fy, w: area.innerW, h: 0.22, size: 10, min: 10, color: "muted", name: "SG4 bands" });
  tb(s, d.chart.detail, { x: area.innerX, y: fy + 0.25, w: area.innerW, h: detailH, size: 10, min: 10, color: "muted", name: "Rate-set detail" });
  // Split chip
  card(s, { x: X0, y: splitY, w: CW, h: BOT - splitY, fill: "sand", line: null, name: "Split strip" });
  tb(s, [{ text: `**${d.split.label}:** ${d.split.items.join("  ·  ")}` }], { x: X0 + 0.2, y: splitY, w: CW - 0.4, h: BOT - splitY, size: 11.5, min: 10.5, valign: "middle", name: "Split text" });
  return s;
};

// ---- 18 Unit economics ----------------------------------------------------------------------
L.unitEcon = (deck, d) => {
  const s = contentSlide(deck, d);
  const lw = 6.7;
  const chipY = BOT - 0.45;
  const tH = 1.42;
  const chH = chipY - 0.15 - TOP - tH - 0.12;
  const area = chartCard(s, { x: X0, y: TOP, w: lw, h: chH, title: d.chart.title, badges: ["estimate"] });
  barChart(s, area, { categories: d.chart.categories, series: d.chart.series, colors: [HEX.plum, HEX.rose], fmt: NF1Z, legend: true, gap: 70, max: 60, min: 0, name: "Seat economics chart" });
  table(s, { x: X0, y: TOP + chH + 0.12, w: lw, h: tH, columns: d.table.columns, rows: d.table.rows, max: 11, min: 10, name: "Seat table" });
  // Stats
  const rx = X0 + lw + GAP;
  const rw = X1 - rx;
  const n = d.stats.length;
  const sh = (chipY - 0.15 - TOP - 0.12 * (n - 1)) / n;
  d.stats.forEach((st, i) => {
    const y = TOP + i * (sh + 0.12);
    card(s, { x: rx, y, w: rw, h: sh, fill: i === 0 ? "aubergine" : "paper", line: i === 0 ? null : "line", name: "Stat card" });
    const dark = i === 0;
    const vw = 1.45;
    const runs = [];
    if (st.prefix) runs.push({ text: st.prefix, options: { fontFace: BODY, fontSize: 28, color: dark ? HEX.paper : col("aubergine") } });
    runs.push({ text: st.value, options: { fontFace: "+mj-lt", fontSize: 28, color: dark ? HEX.paper : col("aubergine") } });
    if (st.unit) runs.push({ text: st.unit, options: { fontFace: BODY, fontSize: 13, color: dark ? HEX.roseLight : col("muted") } });
    s.addText(runs, { isTextBox: true, x: rx + 0.2, y: y + 0.1, w: vw, h: sh - 0.2, margin: 0, valign: "middle", objectName: oname(s, "Stat value") });
    const tx = rx + 0.2 + vw + 0.1;
    const tw = rx + rw - 0.2 - tx;
    tb(s, st.label, { x: tx, y: y + 0.12, w: tw - badgeW(st.badge) - 0.1, h: 0.26, size: 12, min: 11, bold: true, color: dark ? "paper" : "aubergine", name: "Stat label" });
    C.addBadge(s, { type: st.badge, x: rx + rw - 0.2 - badgeW(st.badge), y: y + 0.12, onDark: dark });
    tb(s, st.text, { x: tx, y: y + 0.42, w: tw, h: sh - 0.5, size: 11, min: 10, color: dark ? "onDarkMuted" : "ink", name: "Stat text" });
  });
  card(s, { x: X0, y: chipY, w: CW, h: BOT - chipY, fill: "sand", line: null, name: "Founder cost chip" });
  tb(s, d.chip, { x: X0 + 0.2, y: chipY, w: CW - 0.4 - badgeW("estimate") - 0.2, h: BOT - chipY, size: 11.5, min: 10.5, valign: "middle", name: "Founder cost text" });
  badges(s, ["estimate"], X1 - 0.2, chipY + (BOT - chipY - 0.24) / 2, "right");
  return s;
};

// ---- 19 Scenarios, cash and staging ---------------------------------------------------------
L.scenarios = (deck, d) => {
  const s = contentSlide(deck, d);
  const top = d.top || TOP;
  const r1h = 2.42;
  const lw = 6.35;
  // Scenario chart
  const capH = needH(d.scen.caption, lw - 0.36, 10);
  const a1 = chartCard(s, { x: X0, y: top, w: lw, h: r1h, title: d.scen.title, badges: ["estimate"], footH: capH + 0.04, pad: 0.16 });
  barChart(s, a1, { categories: d.scen.categories, series: d.scen.series, colors: [HEX.plum, HEX.rose, HEX.mauve], fmt: NF1, legend: true, legendPos: "b", gap: 50, labelSize: 10, catSize: 10, min: -20, max: 80, name: "Scenario chart" });
  tb(s, d.scen.caption, { x: a1.innerX, y: a1.y + a1.h + 0.01, w: a1.innerW, h: capH + 0.02, size: 10, min: 10, color: "muted", name: "Scenario caption" });
  // Cash line with reference lines
  const cx = X0 + lw + 0.25;
  const cw = X1 - cx;
  const cap2H = needH(d.cash.caption, cw - 0.32, 10);
  const a2 = chartCard(s, { x: cx, y: top, w: cw, h: r1h, title: d.cash.title, badges: ["estimate"], footH: cap2H + 0.04, pad: 0.16 });
  const refW = 1.28;
  const plot = { x: a2.x, y: a2.y, w: a2.w, h: a2.h };
  const vmin = -40;
  const vmax = 0;
  const lay = { x: 0.09, y: 0.05, w: 0.9 - refW / plot.w, h: 0.78 };
  const pres = deck.pres;
  const base = chartOpts(plot, { fmt: NF1, valFmt: NF0, labels: false, showVal: true, grid: true, catSize: 10, layout: lay });
  s.addChart([
    { type: pres.charts.LINE, data: [{ name: "Cumulative cash", labels: MONTHS, values: d.cash.values }], options: { chartColors: [HEX.plum], lineSize: 2.25, lineDataSymbol: "circle", lineDataSymbolSize: 5, showValue: false } },
    { type: pres.charts.LINE, data: d.cash.refs.map((r) => ({ name: r.label, labels: MONTHS, values: MONTHS.map(() => r.value) })), options: { chartColors: [HEX.amber, HEX.rose, HEX.mauve, HEX.aubergine], lineSize: 1, lineDash: "dash", lineDataSymbol: "none", showValue: false } },
  ], { ...base, valAxisMinVal: vmin, valAxisMaxVal: vmax, valAxisMajorUnit: 10, showLegend: false, objectName: "Cash line chart", altText: d.cash.title });
  // Reference labels at the right end of the plot (manual layout makes the y positions exact)
  const py = (v) => plot.y + lay.y * plot.h + ((vmax - v) / (vmax - vmin)) * lay.h * plot.h;
  const lx = plot.x + (lay.x + lay.w) * plot.w + 0.05;
  const refColors = ["amberDark", "roseDark", "muted", "aubergine"];
  let lastY = -9;
  d.cash.refs.forEach((r, i) => {
    let yy = py(r.value) - 0.1;
    if (yy < lastY + 0.18) yy = lastY + 0.18;
    lastY = yy;
    tb(s, r.label, { x: lx, y: yy, w: refW, h: 0.2, size: 10, min: 10, bold: true, color: refColors[i], valign: "middle", name: "Cash reference label" });
  });
  tb(s, d.cash.caption, { x: a2.innerX, y: a2.y + a2.h + 0.01, w: a2.innerW, h: cap2H + 0.02, size: 10, min: 10, color: "muted", name: "Cash caption" });
  // Tranches
  const ty = top + r1h + 0.12;
  const th = 0.52;
  const ws = [2.3, 4.55, 2.05, 1.27, CW - 2.3 - 4.55 - 2.05 - 1.27 - 4 * 0.09];
  let x = X0;
  d.tranches.forEach((t, i) => {
    const w = ws[i];
    const fill = i === 0 ? "aubergine" : i === 1 ? "plum" : i === 2 ? "amberTint" : "sand";
    const dark = i < 2;
    card(s, { x, y: ty, w, h: th, fill, line: null, radius: 0.06, name: "Tranche" });
    tb(s, `**${t.code}**${t.when ? ` (${t.when})` : ""}: ${t.text}`, { x: x + 0.12, y: ty + 0.04, w: w - 0.24, h: th - 0.08, size: 10.5, min: 10, color: dark ? "paper" : "ink", valign: "middle", name: "Tranche text" });
    x += w + 0.09;
  });
  // Losses and rules
  const ly = ty + th + 0.13;
  const lw2 = 8.6;
  label(s, d.lossTitle, { x: X0, y: ly, w: 5 });
  badges(s, ["estimate"], X0 + lw2, ly, "right");
  const refH = needH(d.lossRef, lw2, 10);
  let yy = ly + 0.28;
  const rowsAvail = BOT - refH - 0.04 - yy;
  const valW = 0.82;
  const nameW = 3.25;
  const per = rowsAvail / d.losses.length;
  d.losses.forEach(([a, v, c], i) => {
    if (i === 1) s.addShape("rect", { x: X0, y: yy, w: lw2, h: per, fill: { color: col("roseTint") }, line: { type: "none" }, objectName: "Adopted rule highlight" });
    if (i > 0) rule(s, { x: X0, y: yy, w: lw2, color: "line", width: 0.5, name: "Loss rule" });
    tb(s, a, { x: X0 + 0.06, y: yy + 0.01, w: nameW - 0.06, h: per - 0.02, size: 10.5, min: 10, bold: i === 1, color: i === 1 ? "aubergine" : "ink", valign: "middle", name: "Loss path" });
    tb(s, v, { x: X0 + nameW + 0.05, y: yy + 0.01, w: valW, h: per - 0.02, size: 15, min: 13, bold: true, font: "head", color: i === 1 ? "roseDark" : "aubergine", valign: "middle", name: "Loss value" });
    tb(s, c, { x: X0 + nameW + valW + 0.12, y: yy + 0.01, w: lw2 - nameW - valW - 0.15, h: per - 0.02, size: 10.5, min: 10, color: "muted", valign: "middle", name: "Loss consequence" });
    yy += per;
  });
  tb(s, d.lossRef, { x: X0, y: BOT - refH, w: lw2, h: refH, size: 10, min: 10, color: "muted", italic: true, name: "Loss reference" });
  const rx = X0 + lw2 + 0.25;
  const rw = X1 - rx;
  label(s, d.rulesTitle, { x: rx, y: ly, w: rw - 1.45 });
  badges(s, ["recommendation"], X1, ly, "right");
  const rh = (BOT - (ly + 0.3) - 0.07 * (d.rules.length - 1)) / d.rules.length;
  d.rules.forEach((r, i) => {
    const y = ly + 0.3 + i * (rh + 0.07);
    card(s, { x: rx, y, w: rw, h: rh, fill: "aubergine", line: null, radius: 0.06, name: "Rule chip" });
    tb(s, r, { x: rx + 0.14, y, w: rw - 0.28, h: rh, size: 11, min: 10, bold: true, color: "paper", valign: "middle", name: "Rule text" });
  });
  return s;
};

// ---- 20 Three-year view ---------------------------------------------------------------------
L.threeYear = (deck, d) => {
  const s = contentSlide(deck, d);
  const bottomH = 0.56;
  const by = BOT - bottomH;
  const lw = 4.3;
  // Year-3 revenue decomposition
  const cmpH = 0.72;
  const a1 = chartCard(s, { x: X0, y: TOP, w: lw, h: by - 0.14 - TOP, title: d.rev.title, unit: d.rev.unit, badges: ["estimate"], footH: cmpH + 0.05 });
  barChart(s, a1, { dir: "bar", categories: d.rev.categories, series: [{ name: "Year-3 revenue", values: d.rev.values }], colors: [HEX.plum, HEX.rose, HEX.rose, HEX.rose, HEX.rose], fmt: NF1, gap: 45, catSize: 10.5, labelSize: 11, max: 135, min: 0, name: "Year-3 revenue chart" });
  const cy = a1.y + a1.h + 0.05;
  const cw = (a1.innerW - 0.12) / 2;
  d.ebitdaCompare.forEach((e, i) => {
    const x = a1.innerX + i * (cw + 0.12);
    card(s, { x, y: cy, w: cw, h: cmpH - 0.05, fill: i ? "aubergine" : "sand", line: null, radius: 0.06, name: "EBITDA tile" });
    tb(s, [{ text: e.label, sizeDelta: -1, color: i ? "onDarkMuted" : "muted" }, { text: `**${e.value}**  ${e.sub}`, color: i ? "paper" : "aubergine" }], { x: x + 0.1, y: cy + 0.04, w: cw - 0.2, h: cmpH - 0.13, size: 11, min: 10, paraGap: 1, valign: "middle", name: "EBITDA tile text" });
  });
  // Middle: cash chart, then the three-year table
  const mx = X0 + lw + 0.25;
  const mw = 4.95;
  const tblH = 1.52;
  const markH = 0.4;
  const a2 = chartCard(s, { x: mx, y: TOP, w: mw, h: by - 0.14 - TOP - tblH - 0.14, title: d.cash.title, badges: ["estimate"], footH: markH });
  barChart(s, a2, { categories: d.cash.categories, series: [{ name: "Cumulative cash", values: d.cash.values }], colors: [HEX.mauve, HEX.mauve, HEX.plum], fmt: NF1, gap: 70, min: -35, max: 35, name: "Cumulative cash chart" });
  tb(s, d.cash.marks.map((m, i) => ({ text: m, bold: i === 0, color: i === 0 ? "roseDark" : "muted" })), { x: a2.innerX, y: a2.y + a2.h + 0.01, w: a2.innerW, h: markH - 0.03, size: 10, min: 10, paraGap: 1, name: "Payback marks" });
  table(s, { x: mx, y: by - 0.14 - tblH, w: mw, h: tblH, columns: d.table.columns, rows: d.table.rows, max: 11, min: 10, name: "Three-year table" });
  // Right: IRR tiles
  const rx = mx + mw + 0.25;
  const rw = X1 - rx;
  const n = d.kpis.length;
  const kh = (by - 0.14 - TOP - 0.12 * (n - 1)) / n;
  d.kpis.forEach((k, i) => {
    const y = TOP + i * (kh + 0.12);
    const dark = i === 0;
    card(s, { x: rx, y, w: rw, h: kh, fill: dark ? "aubergine" : i === 2 ? "amberTint" : "paper", line: dark || i === 2 ? null : "line", name: "IRR tile" });
    C.addBadge(s, { type: "estimate", x: rx + rw - 0.16 - badgeW("estimate"), y: y + 0.12, onDark: dark });
    tb(s, k.value, { x: rx + 0.16, y: y + 0.36, w: rw - 0.32, h: 0.4, size: 21, min: 18, font: "head", color: dark ? "paper" : i === 2 ? "amberDark" : "aubergine", name: "IRR value" });
    tb(s, k.label, { x: rx + 0.16, y: y + 0.76, w: rw - 0.32, h: kh - 0.8, size: 11, min: 10, color: dark ? "onDarkMuted" : "ink", name: "IRR label" });
  });
  // Bottom strip
  card(s, { x: X0, y: by, w: CW, h: bottomH, fill: "sand", line: null, name: "Step-2 strip" });
  tb(s, [{ text: d.step2 }, { text: d.caption, color: "muted", italic: true }], { x: X0 + 0.2, y: by + 0.03, w: CW - 0.4, h: bottomH - 0.06, size: 11, min: 10, paraGap: 1, valign: "middle", name: "Step-2 text" });
  return s;
};

// ---- 21 First 90 days -----------------------------------------------------------------------
L.ninety = (deck, d) => {
  const s = contentSlide(deck, d);
  const gw = 8.55;
  timeGrid(s, { x: X0, y: TOP, w: gw, labelW: 1.85, periods: d.weeks, groups: d.weekGroups, markers: d.markers, rows: d.rows, rowH: 0.465 });
  const rx = X0 + gw + GAP;
  const rw = X1 - rx;
  const costH = 1.45;
  const gh = BOT - costH - 0.15 - TOP;
  card(s, { x: rx, y: TOP, w: rw, h: gh, fill: "plumTint", line: null, name: "G0 card" });
  label(s, d.g0Heading, { x: rx + 0.2, y: TOP + 0.14, w: rw - 0.4 });
  badges(s, ["recommendation"], rx + 0.2, TOP + gh - 0.36, "left");
  tb(s, d.g0.map((t) => ({ text: t, bullet: { type: "number", indent: 14 } })), { x: rx + 0.2, y: TOP + 0.46, w: rw - 0.4, h: gh - 0.88, size: 11.5, min: 10.5, paraGap: 3, color: "aubergine", name: "G0 criteria" });
  const cy = TOP + gh + 0.15;
  card(s, { x: rx, y: cy, w: rw, h: costH, fill: "sand", line: null, name: "Cost card" });
  badges(s, ["estimate"], rx + 0.2, cy + 0.12, "left");
  tb(s, d.cost, { x: rx + 0.2, y: cy + 0.42, w: rw - 0.4, h: costH - 0.5, size: 11, min: 10, name: "Cost text" });
  return s;
};

// ---- 22 Twelve-month roadmap ----------------------------------------------------------------
L.roadmap = (deck, d) => {
  const s = contentSlide(deck, d);
  const top = d.top || TOP;
  const discH = 0.34;
  const g = timeGrid(s, { x: X0, y: top, w: CW, labelW: 1.7, periods: MONTHS, groups: MONTH_GROUPS, markers: d.markers, rows: d.rows, rowH: 0.32 });
  const dy = Math.max(g.bottom + 0.1, BOT - discH);
  card(s, { x: X0, y: dy, w: CW, h: BOT - dy, fill: "amberTint", line: null, name: "Disclosure chip" });
  tb(s, d.disclosure, { x: X0 + 0.2, y: dy, w: CW - 0.4, h: BOT - dy, size: 10.5, min: 10, color: "amberDark", valign: "middle", name: "Disclosure text" });
  return s;
};

// ---- 23 Risks -------------------------------------------------------------------------------
L.risks = (deck, d) => {
  const s = contentSlide(deck, d);
  const widths = [0.3, 2.5, 4.5, 3.45, CW - 0.3 - 2.5 - 4.5 - 3.45];
  const xs = widths.reduce((a, w, i) => [...a, i ? a[i - 1] + widths[i - 1] : X0], []);
  const headH = 0.28;
  const rowH = 0.25;
  card(s, { x: X0, y: TOP, w: CW, h: headH, fill: "aubergine", line: null, radius: 0, name: "Risk header" });
  d.riskCols.forEach((h, i) => tb(s, h, { x: xs[i] + 0.06, y: TOP, w: widths[i] - 0.1, h: headH, size: 10.5, min: 10, bold: true, color: "paper", valign: "middle", name: "Risk header text" }));
  d.risks.forEach((r, k) => {
    const y = TOP + headH + k * rowH;
    if (k % 2 === 1) s.addShape("rect", { x: X0, y, w: CW, h: rowH, fill: { color: col("sand") }, line: { type: "none" }, objectName: oname(s, "Risk zebra") });
    r.forEach((c, i) => tb(s, c, { x: xs[i] + 0.06, y, w: widths[i] - 0.1, h: rowH, size: 10.5, min: 10, bold: i === 1, color: i === 1 ? "aubergine" : i === 4 ? "muted" : "ink", valign: "middle", name: "Risk cell" }));
  });
  const tEnd = TOP + headH + d.risks.length * rowH;
  rule(s, { x: X0, y: tEnd, w: CW, color: "lineStrong", width: 0.75, name: "Risk table rule" });
  // Bottom band: tests | triggers | mini tornado
  const by = tEnd + 0.16;
  const bh = BOT - by;
  const w1 = 5.3;
  const w2 = 2.85;
  const w3 = CW - w1 - w2 - 2 * 0.17;
  card(s, { x: X0, y: by, w: w1, h: bh, fill: "plumTint", line: null, name: "Tests card" });
  label(s, d.testsHeading, { x: X0 + 0.16, y: by + 0.08, w: 2.5 });
  const half = Math.ceil(d.tests.length / 2);
  const tcw = (w1 - 0.42) / 2;
  [d.tests.slice(0, half), d.tests.slice(half)].forEach((list, k) => {
    tb(s, list, { x: X0 + 0.16 + k * (tcw + 0.1), y: by + 0.34, w: tcw, h: bh - 0.4, size: 10.5, min: 10, paraGap: 2, color: "aubergine", name: "Tests" });
  });
  const x2 = X0 + w1 + 0.17;
  card(s, { x: x2, y: by, w: w2, h: bh, fill: "sand", line: null, name: "Triggers card" });
  label(s, d.triggersHeading, { x: x2 + 0.16, y: by + 0.08, w: 2 });
  const trig = d.triggers.map((t) => t.replace(/^(KT-\S+)/, "**$1**")).join("  ·  ");
  tb(s, trig, { x: x2 + 0.16, y: by + 0.34, w: w2 - 0.32, h: bh - 0.4, size: 10.5, min: 10, color: "aubergine", name: "Triggers" });
  const x3 = x2 + w2 + 0.17;
  const area = chartCard(s, { x: x3, y: by, w: w3, h: bh, title: d.tornado.title, badges: ["estimate"], pad: 0.12 });
  barChart(s, area, { categories: d.tornado.categories, series: [{ name: "EBITDA swing", values: d.tornado.values }], colors: [HEX.rose, HEX.plum, HEX.plum, HEX.plum, HEX.plum, HEX.plum, HEX.plum, HEX.plum], fmt: NF1, gap: 35, catSize: 10, labelSize: 10, max: 25, min: 0, name: "Mini tornado" });
  return s;
};

// ---- 24 Decisions ---------------------------------------------------------------------------
L.decisions = (deck, d) => {
  const s = contentSlide(deck, d);
  const lw = 8.15;
  const cols = [0.95, 4.3, 1.12, lw - 0.95 - 4.3 - 1.12];
  const xs = cols.reduce((a, w, i) => [...a, i ? a[i - 1] + cols[i - 1] : X0], []);
  const headH = 0.26;
  ["Decision", "", "By", "Default if undecided"].forEach((h, i) => h && label(s, h, { x: xs[i] + (i === 0 ? 0 : 0.06), y: TOP, w: cols[i] + (i === 0 ? cols[1] : 0), size: 10 }));
  const y0 = TOP + headH + 0.04;
  const n = d.decisions.length;
  const rh = (BOT - y0) / n;
  let size = 11;
  for (; size > 10; size -= 0.5) if (d.decisions.every((x) => needH(x.text, cols[1] - 0.12, size) <= rh - 0.04)) break;
  d.decisions.forEach((x, i) => {
    const y = y0 + i * rh;
    if (x.blocking) s.addShape("rect", { x: X0, y: y + 0.01, w: lw, h: rh - 0.02, fill: { color: col("roseTint") }, line: { type: "none" }, objectName: oname(s, "Blocking highlight") });
    if (i > 0) rule(s, { x: X0, y, w: lw, color: "line", width: 0.5, name: "Decision rule" });
    pill(s, x.code, { x: xs[0], y: y + (rh - 0.26) / 2, h: 0.26, w: cols[0] - 0.1, size: 9.5, fill: x.blocking ? "rose" : "aubergine", color: "paper", name: "Decision code" });
    tb(s, x.text, { x: xs[1] + 0.04, y: y + 0.02, w: cols[1] - 0.12, h: rh - 0.04, size, min: size, valign: "middle", name: "Decision text" });
    pill(s, x.by, { x: xs[2] + 0.04, y: y + (rh - 0.26) / 2, h: 0.26, w: cols[2] - 0.1, size: 9.5, fill: "roseTint", color: "roseDark", name: "Decide-by chip" });
    tb(s, x.def, { x: xs[3] + 0.06, y: y + 0.02, w: cols[3] - 0.06, h: rh - 0.04, size: 10, min: 10, color: x.blocking ? "roseDark" : "muted", bold: !!x.blocking, valign: "middle", name: "Decision default" });
  });
  // Next actions + band
  const rx = X0 + lw + GAP;
  const rw = X1 - rx;
  const bandH = 1.12;
  const ah = BOT - bandH - 0.15 - TOP;
  card(s, { x: rx, y: TOP, w: rw, h: ah, name: "Actions card" });
  label(s, d.actionsHeading, { x: rx + 0.2, y: TOP + 0.12, w: rw - 0.4 });
  tb(s, d.actions.map((t) => ({ text: t, bullet: true })), { x: rx + 0.2, y: TOP + 0.42, w: rw - 0.4, h: ah - 0.5, size: 11, min: 10, paraGap: 1.5, name: "Actions" });
  const by = BOT - bandH;
  card(s, { x: rx, y: by, w: rw, h: bandH, fill: "aubergine", line: null, name: "Buys band" });
  tb(s, d.band, { x: rx + 0.2, y: by + 0.08, w: rw - 0.4, h: bandH - 0.16, size: 12, min: 10.5, color: "paper", valign: "middle", name: "Buys text" });
  return s;
};

// ---- A1 Market sizing method ----------------------------------------------------------------
L.a1 = (deck, d) => {
  const s = contentSlide(deck, d);
  const lw = 7.2;
  const cw = (lw - 0.45) / 2;
  label(s, "Do not use", { x: X0 + 0.15, y: TOP, w: 2, color: "mauve" });
  label(s, "Use instead", { x: X0 + cw + 0.45 + 0.15, y: TOP, w: 2 });
  const y0 = TOP + 0.32;
  const n = d.pairs.length;
  const gap = 0.08;
  const rh = (BOT - y0 - gap * (n - 1)) / n;
  d.pairs.forEach(([a, b], i) => {
    const y = y0 + i * (rh + gap);
    card(s, { x: X0, y, w: cw, h: rh, fill: "porcelain", line: "mauve", dash: "dash", name: "Do-not card" });
    tb(s, a, { x: X0 + 0.15, y: y + 0.04, w: cw - 0.3, h: rh - 0.08, size: 11, min: 10, color: "muted", valign: "middle", name: "Do-not text" });
    s.addShape("chevron", { x: X0 + cw + 0.14, y: y + rh / 2 - 0.12, w: 0.16, h: 0.24, fill: { color: col("rose") }, line: { type: "none" }, objectName: oname(s, "Arrow") });
    card(s, { x: X0 + cw + 0.45, y, w: cw, h: rh, fill: "plumTint", line: null, name: "Use card" });
    tb(s, b, { x: X0 + cw + 0.6, y: y + 0.04, w: cw - 0.3, h: rh - 0.08, size: 11, min: 10, bold: true, color: "aubergine", valign: "middle", name: "Use text" });
  });
  const rx = X0 + lw + GAP;
  const rw = X1 - rx;
  const mh = 2.72;
  card(s, { x: rx, y: TOP, w: rw, h: mh, name: "Method card" });
  label(s, "Method", { x: rx + 0.18, y: TOP + 0.1, w: 2 });
  badges(s, ["estimate"], rx + rw - 0.18, TOP + 0.1, "right");
  tb(s, d.method, { x: rx + 0.18, y: TOP + 0.4, w: rw - 0.36, h: mh - 0.48, size: 10.5, min: 10, paraGap: 3, name: "Method text" });
  const fy = TOP + mh + 0.15;
  const fh = BOT - fy;
  card(s, { x: rx, y: fy, w: rw, h: fh, fill: "sand", line: null, name: "Facts card" });
  label(s, "Key facts the sizing rests on", { x: rx + 0.18, y: fy + 0.1, w: rw - 0.36 });
  const per = (fh - 0.42) / d.facts.length;
  d.facts.forEach((f, i) => {
    const y = fy + 0.4 + i * per;
    const bw = badgeW(f.badge);
    tb(s, f.text, { x: rx + 0.18, y, w: rw - 0.46 - bw, h: per - 0.02, size: 10.5, min: 10, valign: "middle", name: "Fact" });
    C.addBadge(s, { type: f.badge, x: rx + rw - 0.18 - bw, y: y + (per - 0.26) / 2 });
  });
  return s;
};

// ---- A2–A4 Appendix tables (paginated) ------------------------------------------------------
L.appTable = (deck, d) => {
  const pages = deck.appendixTable({ kicker: d.kicker, title: d.title, subtitle: d.subtitle, columns: d.columns, rows: d.rows, source: d.source, note: d.note, max: 11.5, min: 10 });
  pages.forEach((p, i) => p.addNotes(i === 0 ? d.notes : `Continuation of ${d.kicker}. ${d.notes}`));
  return pages[0];
};

// ---- A5 Sensitivities -----------------------------------------------------------------------
L.a5 = (deck, d) => {
  const s = contentSlide(deck, d);
  const lw = 7.6;
  const area = chartCard(s, { x: X0, y: TOP, w: lw, h: BOT - TOP, title: d.tornado.title, badges: ["estimate"] });
  barChart(s, area, { dir: "bar", categories: d.tornado.categories, series: [{ name: "EBITDA swing", values: d.tornado.values }], colors: [HEX.rose, HEX.rose, HEX.rose, HEX.plum, HEX.plum, HEX.plum, HEX.plum, HEX.plum], fmt: NF1, gap: 40, catSize: 10.5, labelSize: 11, max: 24, min: 0, name: "Tornado chart" });
  const rx = X0 + lw + GAP;
  const rw = X1 - rx;
  const supH = 0.8;
  const sh = BOT - TOP - supH - 0.15;
  card(s, { x: rx, y: TOP, w: rw, h: sh, fill: "plumTint", line: null, name: "Stress card" });
  label(s, d.stressTitle, { x: rx + 0.2, y: TOP + 0.12, w: rw - 0.4 });
  let y = TOP + 0.45;
  const per = (sh - 0.55) / d.stresses.length;
  d.stresses.forEach(([a, b], i) => {
    if (i > 0) rule(s, { x: rx + 0.2, y: y - 0.04, w: rw - 0.4, color: "line", name: "Stress rule" });
    tb(s, [{ text: a, bold: true, color: "aubergine", gapAfter: 1 }, { text: b }], { x: rx + 0.2, y, w: rw - 0.4, h: per - 0.08, size: 11.5, min: 10.5, paraGap: 1, name: "Stress text" });
    y += per;
  });
  card(s, { x: rx, y: BOT - supH, w: rw, h: supH, fill: "sand", line: null, name: "Superseded card" });
  tb(s, d.superseded, { x: rx + 0.2, y: BOT - supH + 0.06, w: rw - 0.4, h: supH - 0.12, size: 10.5, min: 10, color: "muted", italic: true, valign: "middle", name: "Superseded text" });
  return s;
};

// ---- A6 Downside runs -----------------------------------------------------------------------
L.a6 = (deck, d) => {
  const s = contentSlide(deck, d);
  const bandH = 0.82;
  const t = table(s, { x: X0, y: TOP, w: CW, h: BOT - bandH - 0.18 - TOP, columns: d.columns, rows: d.rows, max: 11.5, min: 10, name: "Downside table" });
  const by = BOT - bandH;
  card(s, { x: X0, y: by, w: CW, h: bandH, fill: "amberTint", line: null, name: "Downside band" });
  tb(s, d.band, { x: X0 + 0.2, y: by + 0.06, w: CW - 0.4, h: bandH - 0.12, size: 12, min: 10.5, color: "amberDark", valign: "middle", name: "Downside band text" });
  return s;
};

// ---- A7 Cohort fill -------------------------------------------------------------------------
L.a7 = (deck, d) => {
  const s = contentSlide(deck, d);
  const lw = 7.75;
  const c = d.chart;
  const keyH = 0.5;
  const area = chartCard(s, { x: X0, y: TOP, w: lw, h: BOT - TOP, title: c.title, badges: ["estimate"], footH: keyH });
  const vmax = 12;
  const lay = { x: 0.05, y: 0.1, w: 0.93, h: 0.72 };
  barChart(s, area, { categories: c.categories, series: c.series, colors: [HEX.plum, HEX.mauve], fmt: NF1Z, legend: true, legendPos: "b", gap: 30, overlap: 0, max: vmax, min: 0, catSize: 10, labelSize: 10, labelPos: "inEnd", labelColor: HEX.paper, layout: lay, name: "Cohort chart" });
  // Reference lines over the plot (exact positions from the manual plot layout)
  const ncat = c.categories.length;
  const px = (t) => area.x + (lay.x + (t / ncat) * lay.w) * area.w;
  const py = (v) => area.y + (lay.y + (1 - v / vmax) * lay.h) * area.h;
  const tones = [["amber", "amberDark"], ["rose", "roseDark"]];
  [c.studioTest, c.moveTest].forEach((r, i) => {
    rule(s, { x: px(r.from), y: py(r.value), w: px(r.to) - px(r.from), color: tones[i][0], width: 1.75, dash: "dash", name: "Test line" });
  });
  const gxL = px(c.g1.at);
  rule(s, { x: gxL, y: py(vmax), h: py(0) - py(vmax), color: "aubergine", width: 1.25, dash: "sysDot", name: "G1 marker" });
  pill(s, "G1 26 Jul", { x: gxL, y: py(vmax) - 0.27, h: 0.24, size: 9, fill: "aubergine", color: "paper", align: "center", name: "G1 chip" });
  // Key for the overlays, under the chart
  let ky = area.y + area.h + 0.04;
  let kx = area.innerX;
  [[c.studioTest.label, tones[0]], [c.moveTest.label, tones[1]], [c.g1.label, ["aubergine", "aubergine"]]].forEach(([t, tone], i) => {
    if (i === 2) {
      kx = area.innerX;
      ky += 0.23;
    }
    rule(s, { x: kx, y: ky + 0.11, w: 0.3, color: tone[0], width: 1.75, dash: i === 2 ? "sysDot" : "dash", name: "Key line" });
    const w = textWidth(t, { size: 10 }) * 1.04 + 0.1;
    tb(s, t, { x: kx + 0.36, y: ky, w, h: 0.22, size: 10, min: 10, color: tone[1], valign: "middle", name: "Key text" });
    kx += 0.36 + w + 0.25;
  });
  // Side: table, tally, decision, caveat, evenly spaced
  const rx = X0 + lw + GAP;
  const rw = X1 - rx;
  const tg = tableGeom(d.sideColumns, d.sideRows, rw, 11);
  const tallyH = needH(d.tally, rw - 0.36, 11.5) + 0.24;
  const decH = 0.66;
  const cavH = needH(d.caveat, rw - 0.36, 11.5) + 0.24;
  const gapS = (BOT - TOP - tg.height - tallyH - decH - cavH) / 3;
  table(s, { x: rx, y: TOP, w: rw, h: tg.height + 0.01, columns: d.sideColumns, rows: d.sideRows, max: 11, min: 11, name: "Calendar table" });
  let y = TOP + tg.height + gapS;
  card(s, { x: rx, y, w: rw, h: tallyH, fill: "sand", line: null, name: "Tally card" });
  tb(s, d.tally, { x: rx + 0.18, y: y + 0.12, w: rw - 0.36, h: tallyH - 0.2, size: 11.5, min: 10.5, name: "Tally text" });
  y += tallyH + gapS;
  card(s, { x: rx, y, w: rw, h: decH, fill: "aubergine", line: null, name: "Decision chip" });
  badges(s, ["recommendation"], rx + 0.18, y + 0.09, "left", true);
  tb(s, d.decision, { x: rx + 0.18, y: y + 0.37, w: rw - 0.36, h: 0.24, size: 11.5, min: 10.5, bold: true, color: "paper", name: "Decision text" });
  y += decH + gapS;
  card(s, { x: rx, y, w: rw, h: cavH, fill: "amberTint", line: "amber", name: "Caveat chip" });
  tb(s, d.caveat, { x: rx + 0.18, y: y + 0.12, w: rw - 0.36, h: cavH - 0.2, size: 11.5, min: 10.5, color: "amberDark", valign: "middle", name: "Caveat text" });
  return s;
};

// ---- A8 Review and investor questions -------------------------------------------------------
L.a8 = (deck, d) => {
  const s = contentSlide(deck, d);
  const lw = 5.6;
  card(s, { x: X0, y: TOP, w: lw, h: BOT - TOP, fill: "plumTint", line: null, name: "Changes card" });
  label(s, d.changesHeading, { x: X0 + 0.2, y: TOP + 0.12, w: 3 });
  tb(s, d.changes.map((t) => ({ text: t, bullet: true })), { x: X0 + 0.2, y: TOP + 0.46, w: lw - 0.4, h: BOT - TOP - 0.58, size: 13, min: 10, paraGap: 4, color: "aubergine", name: "Changes" });
  const rx = X0 + lw + GAP;
  const rw = X1 - rx;
  table(s, { x: rx, y: TOP, w: rw, h: BOT - TOP, columns: [{ header: "Investor question", w: 4.3 }, { header: "Answered on slide", w: 1.9, bold: true }], rows: d.qa, max: 13, min: 10, name: "Investor questions" });
  return s;
};

// ---- A9 Evidence and sources ----------------------------------------------------------------
L.a9 = (deck, d) => {
  const s = contentSlide(deck, d);
  const w1 = 4.2;
  card(s, { x: X0, y: TOP, w: w1, h: BOT - TOP, name: "Legend card" });
  label(s, "Evidence labels", { x: X0 + 0.2, y: TOP + 0.12, w: 3 });
  const per = (BOT - TOP - 0.5) / d.legend.length;
  d.legend.forEach(([t, txt], i) => {
    const y = TOP + 0.48 + i * per;
    C.addBadge(s, { type: t, x: X0 + 0.2, y, w: 1.45 });
    tb(s, txt, { x: X0 + 1.78, y: y - 0.05, w: w1 - 1.98, h: per - 0.1, size: 11, min: 10, name: "Legend text" });
  });
  const x2 = X0 + w1 + GAP;
  const w2 = 4.35;
  label(s, "Source register", { x: x2, y: TOP, w: 3 });
  const t = table(s, { x: x2, y: TOP + 0.3, w: w2, h: 3.1, columns: d.registerColumns, rows: d.register, max: 11, min: 10, name: "Register table" });
  const ny = TOP + 0.3 + t.height + 0.12;
  tb(s, [{ text: d.registerNote, color: "muted" }, { text: d.workbooks }], { x: x2, y: ny, w: w2, h: BOT - ny, size: 10.5, min: 10, paraGap: 5, name: "Register note" });
  const x3 = x2 + w2 + GAP;
  const w3 = X1 - x3;
  card(s, { x: x3, y: TOP, w: w3, h: BOT - TOP, fill: "amberTint", line: null, name: "Open items card" });
  tb(s, d.openHeading, { x: x3 + 0.2, y: TOP + 0.12, w: w3 - 0.4, h: 0.5, size: 12, min: 11, bold: true, color: "amberDark", name: "Open heading" });
  tb(s, d.open.map((t2) => ({ text: t2, bullet: true })), { x: x3 + 0.2, y: TOP + 0.68, w: w3 - 0.4, h: BOT - TOP - 0.8, size: 11, min: 10, paraGap: 5, color: "ink", name: "Open items" });
  return s;
};

// =============================================================================================
// Build
// =============================================================================================

async function main() {
  const deck = createDeck({ title: meta.title, subject: meta.subject, author: meta.author, company: meta.company });
  let section = null;
  for (const d of slides) {
    if (d.section !== section) {
      deck.section(d.section);
      section = d.section;
    }
    const fn = L[d.layout];
    if (!fn) throw new Error(`No layout "${d.layout}" for slide ${d.id}`);
    fn(deck, d);
  }
  const out = path.join(__dirname, meta.file);
  await deck.write(out);
  console.log(`Wrote ${out}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
