// components.js: slide-component library for the PNA growth-strategy deck.
//
// Every component takes a slide plus a data object, sizes its own text (see fit.js), names its
// shapes with objectName, writes text as text boxes (isTextBox) and reads colour/type/grid from
// theme.js. Positions are inches on the 13.333 x 7.5 canvas; most components default to the
// content area (GRID.top..GRID.bottom, full content width) when x/y/w/h are omitted.
//
//   const { createDeck, C } = require("./components");
//   const deck = createDeck({ title: "..." });
//   deck.section("Where PNA is today");
//   const s = deck.contentSlide({ kicker, title, subtitle, source, note });
//   C.addKpiRow(s, { items: [...] });
//   await deck.write("out.pptx");          // writes, applies the theme, prints fit warnings
//
// See README.md for every component's parameters.

"use strict";

const path = require("path");
const pptxgen = require("pptxgenjs");
const { THEME, HEX, hex, col, CHART, SEQ, TYPE, GRID, LAYOUT, BRAND, defineLayouts } = require("./theme.js");
const { textWidth, lineHeight, fitText, fitParagraphs, warn, LOG } = require("./fit.js");

const HEAD = "+mj-lt"; // theme heading font (Cambria)
const BODY = "+mn-lt"; // theme body font (Calibri)

// =============================================================================================
// Utilities
// =============================================================================================

function nm(slide, base) {
  slide._pnaNames = slide._pnaNames || {};
  const n = (slide._pnaNames[base] || 0) + 1;
  slide._pnaNames[base] = n;
  return n === 1 ? base : `${base} ${n}`;
}

function trunc(s, n = 48) {
  s = String(s);
  return s.length > n ? `${s.slice(0, n - 1)}…` : s;
}

function rgb(h) {
  return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16));
}
function toHex(a) {
  return a.map((v) => Math.round(Math.max(0, Math.min(255, v))).toString(16).padStart(2, "0")).join("").toUpperCase();
}
function mix(a, b, t) {
  const A = rgb(hex(a));
  const B = rgb(hex(b));
  return toHex(A.map((v, i) => v + (B[i] - v) * t));
}
function luminance(h) {
  const f = (c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
  const [r, g, b] = rgb(hex(h)).map((v) => f(v / 255));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
function contrast(a, b) {
  const [x, y] = [luminance(a), luminance(b)].sort((p, q) => q - p);
  return (x + 0.05) / (y + 0.05);
}
// White text when it reaches 4.5:1 on the fill, otherwise ink.
function textOn(fillHex) {
  return contrast(fillHex, HEX.paper) >= 4.5 ? HEX.paper : HEX.ink;
}

// Runs for heading-font text: "₹" is set in the body font, because Cambria's twin in LibreOffice
// has no rupee glyph (Calibri and Carlito do). Keeps the sign identical in PowerPoint and in QA.
function headRuns(text, base = {}) {
  return String(text)
    .split(/(₹)/)
    .filter((t) => t.length)
    .map((t) => ({ text: t, options: { ...base, fontFace: t === "₹" ? BODY : base.fontFace || HEAD } }));
}

function addTB(slide, text, o) {
  slide.addText(text, {
    isTextBox: true,
    margin: 0,
    valign: "top",
    align: "left",
    fontSize: 12,
    color: col("ink"),
    ...o,
  });
}

function addCard(slide, { x, y, w, h, fill = "paper", line = "line", radius = GRID.radius, name = "Card" }) {
  slide.addShape("roundRect", {
    x, y, w, h,
    rectRadius: Math.min(radius, Math.min(w, h) / 2),
    fill: { color: col(fill) },
    line: line ? { color: col(line), width: 0.75 } : { type: "none" },
    objectName: nm(slide, name),
  });
}

function addLine(slide, { x, y, w = 0, h = 0, color = "line", width = 0.75, dash, arrow, name = "Rule" }) {
  slide.addShape("line", {
    x, y, w, h,
    line: { color: col(color), width, dashType: dash || "solid", ...(arrow ? { endArrowType: arrow } : {}) },
    objectName: nm(slide, name),
  });
}

function box(o) {
  return {
    x: o.x === undefined ? GRID.ML : o.x,
    y: o.y === undefined ? GRID.top : o.y,
    w: o.w === undefined ? GRID.CW : o.w,
    h: o.h === undefined ? GRID.contentH : o.h,
  };
}

// =============================================================================================
// Title, kicker, subtitle; footer
// =============================================================================================

/**
 * Assertion title (2 lines max, 28 -> 22 pt), optional kicker above and subtitle below.
 * On content slides the title fills the layout's title placeholder (screen readers and the
 * outline see a real slide title); elsewhere it is a text box.
 */
function addTitle(slide, { title, kicker, subtitle } = {}) {
  if (kicker) {
    addTB(slide, String(kicker).toUpperCase(), {
      x: GRID.ML, y: GRID.kickerY, w: 7.4, h: GRID.kickerH,
      fontSize: TYPE.kicker, bold: true, charSpacing: 1.5, color: hex("roseDark"), valign: "middle",
      objectName: nm(slide, "Kicker"),
    });
  }
  let bottom = GRID.titleY;
  if (title) {
    const f = fitText(title, { font: "Cambria", w: GRID.CW, h: GRID.titleH + 0.05, max: TYPE.title.size, min: TYPE.title.min, maxLines: 2, stable: true });
    if (!f.fits) warn(`Title "${trunc(title)}"`, `does not fit 2 lines at ${TYPE.title.min} pt; shorten it`);
    const runs = headRuns(title, { fontSize: f.size, color: col("aubergine") });
    if (slide._pnaKind === "content") {
      slide.addText(runs, { placeholder: "title", objectName: "Title" });
    } else {
      addTB(slide, runs, { x: GRID.ML, y: GRID.titleY, w: GRID.CW, h: GRID.titleH, objectName: "Title" });
    }
    bottom = GRID.titleY + f.lines.length * lineHeight(f.size, "Cambria");
  }
  if (subtitle) {
    const y = bottom + 0.1;
    const avail = GRID.top - 0.12 - y;
    const f = fitText(subtitle, { w: GRID.CW, h: Math.max(avail, 0.26), max: TYPE.subtitle.size, min: TYPE.subtitle.min, maxLines: avail > 0.5 ? 2 : 1 });
    if (!f.fits) warn(`Subtitle "${trunc(subtitle)}"`, "too long for the space under the title");
    addTB(slide, subtitle, { x: GRID.ML, y, w: GRID.CW, h: f.height + 0.04, fontSize: f.size, color: col("muted"), objectName: nm(slide, "Subtitle") });
  }
  return { top: GRID.top };
}

/** Source / note footer: 9 pt, left-aligned, bottom-anchored beside the slide number (max 2 lines). */
function addFooter(slide, { source, note, dark = false } = {}) {
  const parts = [];
  if (source) parts.push(["Source: ", source]);
  if (note) parts.push(["Note: ", note]);
  if (!parts.length) return;
  const runs = [];
  let plain = "";
  parts.forEach(([label, text], i) => {
    const sep = i ? "   " : "";
    runs.push({ text: sep + label, options: { bold: true } });
    runs.push({ text: String(text), options: {} });
    plain += sep + label + text;
  });
  const w = GRID.CW - 0.9;
  const f = fitText(plain, { w, h: GRID.footerH, max: TYPE.footer, min: TYPE.footer, maxLines: 2 });
  if (!f.fits) warn(`Footer "${trunc(plain)}"`, "longer than 2 lines at 9 pt; move detail to the notes or appendix");
  addTB(slide, runs, {
    x: GRID.ML, y: GRID.footerY, w, h: GRID.footerH, valign: "bottom",
    fontSize: TYPE.footer, color: dark ? hex("onDarkMuted") : col("muted"), objectName: "Source footer",
  });
}

// =============================================================================================
// Evidence badges
// =============================================================================================

const BADGES = {
  verified: { label: "VERIFIED", fill: "green", text: "paper", line: "green" },
  estimate: { label: "ESTIMATE", fill: "amberTint", text: "amberDark", line: "amber" },
  hypothesis: { label: "HYPOTHESIS", fill: "paper", text: "slate", line: "slate", dash: "dash" },
  recommendation: { label: "RECOMMENDATION", fill: "aubergine", text: "paper", line: "aubergine" },
  founder: { label: "FOUNDER-STATED", fill: "mauveTint", text: "aubergine", line: "mauve" },
  claim: { label: "UNVERIFIED CLAIM", fill: "paper", text: "muted", line: "lineStrong", dash: "sysDot" },
};
const BADGE_ALIASES = { fact: "verified", est: "estimate", hyp: "hypothesis", rec: "recommendation" };

function badgeKey(type) {
  const k = String(type || "").toLowerCase().replace(/[^a-z]/g, "");
  const key = BADGE_ALIASES[k] || k;
  if (!BADGES[key]) throw new Error(`Unknown badge type "${type}". Use: ${Object.keys(BADGES).join(", ")}`);
  return key;
}

function badgeSize(type, { fontSize = TYPE.badge, h = 0.24, label } = {}) {
  const b = BADGES[badgeKey(type)];
  const text = label || b.label;
  return { w: textWidth(text, { bold: true, size: fontSize, charSpacing: 0.8 }) + 0.24, h };
}

/** Evidence pill. Returns {w, h} so callers can place things beside it. */
function addBadge(slide, { type, x, y, h = 0.24, w, fontSize = TYPE.badge, label, onDark = false }) {
  const key = badgeKey(type);
  const b = BADGES[key];
  const text = label || b.label;
  const bw = w || badgeSize(key, { fontSize, label }).w;
  slide.addText(text, {
    isTextBox: true,
    shape: "roundRect",
    rectRadius: h / 2,
    x, y, w: bw, h,
    fill: { color: col(b.fill) },
    line: { color: onDark && b.fill === "aubergine" ? hex("roseLight") : col(b.line), width: 0.75, dashType: b.dash || "solid" },
    fontSize, bold: true, charSpacing: 0.8, color: col(b.text),
    align: "center", valign: "middle", margin: 0,
    objectName: nm(slide, `Badge ${b.label}`),
  });
  return { w: bw, h };
}

/** Row of badges with an optional caption, e.g. an evidence key under a chart. Returns width. */
function addBadgeLegend(slide, { x = GRID.ML, y, types = ["verified", "estimate", "hypothesis", "recommendation"], caption = "Evidence:", gap = 0.12 }) {
  let cx = x;
  if (caption) {
    const cw = textWidth(caption, { size: 10, bold: true }) + 0.05;
    addTB(slide, caption, { x: cx, y, w: cw + 0.05, h: 0.24, fontSize: 10, bold: true, color: col("muted"), valign: "middle", objectName: nm(slide, "Legend caption") });
    cx += cw + 0.1;
  }
  types.forEach((t) => {
    cx += addBadge(slide, { type: t, x: cx, y }).w + gap;
  });
  return cx - gap - x;
}

/** Small status pill used in scorecards and tables: recommended / second / deferred / rejected. */
const STATUS = {
  recommended: { fill: "aubergine", text: "paper", line: "aubergine" },
  second: { fill: "plumTint", text: "aubergine", line: "plum" },
  deferred: { fill: "amberTint", text: "amberDark", line: "amber" },
  rejected: { fill: "paper", text: "muted", line: "lineStrong" },
};
function addStatusChip(slide, { status = "recommended", label, x, y, w, h = 0.26, fontSize = 9 }) {
  const s = STATUS[status] || STATUS.rejected;
  const text = String(label || status).toUpperCase();
  const cw = w || textWidth(text, { bold: true, size: fontSize, charSpacing: 0.6 }) + 0.24;
  slide.addText(text, {
    isTextBox: true, shape: "roundRect", rectRadius: h / 2, x, y, w: cw, h,
    fill: { color: col(s.fill) }, line: { color: col(s.line), width: 0.75 },
    fontSize, bold: true, charSpacing: 0.6, color: col(s.text), align: "center", valign: "middle", margin: 0,
    objectName: nm(slide, "Status chip"),
  });
  return { w: cw, h };
}

// =============================================================================================
// Text block (heading + bullets or paragraphs), for commentary beside charts
// =============================================================================================

/**
 * @param {object} o { x,y,w,h, heading, bullets:[string], paragraphs:[string], max, min, card, numbered }
 */
function addTextBlock(slide, o) {
  const { x, y, w, h } = box(o);
  const { heading, bullets, paragraphs, max = TYPE.body.size, min = TYPE.body.min, card = false, numbered = false } = o;
  const pad = card ? 0.22 : 0;
  if (card) addCard(slide, { x, y, w, h, name: "Text card" });
  const items = bullets || paragraphs || [];
  const indent = bullets ? 0.22 : 0;
  const paras = [];
  if (heading) paras.push({ text: heading, bold: true, sizeDelta: 1, gapAfter: 8 });
  items.forEach((t) => paras.push({ text: t, indent }));
  const f = fitParagraphs(paras, { w, h, max, min, padX: pad, padY: pad, paraGap: 7 });
  if (!f.fits) warn(`Text block "${trunc(heading || items[0] || "")}"`, `overflows at ${min} pt; cut words or enlarge`);
  const runs = [];
  if (heading) runs.push({ text: heading, options: { bold: true, fontSize: f.size + 1, color: col("aubergine"), breakLine: items.length > 0, paraSpaceAfter: 8 } });
  items.forEach((t, i) => {
    const opts = { fontSize: f.size, color: col("ink"), paraSpaceAfter: 7, breakLine: i < items.length - 1 };
    if (bullets) opts.bullet = numbered ? { type: "number", indent: 16 } : { indent: 16 };
    runs.push({ text: t, options: opts });
  });
  addTB(slide, runs, { x: x + pad, y: y + pad, w: w - 2 * pad, h: h - 2 * pad, objectName: nm(slide, "Text block") });
  return f;
}

// =============================================================================================
// KPI stat tiles
// =============================================================================================

function unitParts(unit) {
  if (!unit) return { sep: "", unit: "" };
  return { sep: unit.length > 1 && /^[A-Za-z]/.test(unit) ? " " : "", unit };
}
const unitSize = (s) => Math.max(14, Math.round(s * 0.5));

function kpiPlan(it, w, h) {
  const pad = 0.22;
  const innerW = w - 2 * pad;
  const bw = it.badge ? badgeSize(it.badge).w : 0;
  const labelW = innerW - (bw ? bw + 0.12 : 0);
  const label = fitText(it.label || "", { w: labelW, h: 0.46, max: 13, min: 11, bold: true, maxLines: 2 });
  const period = it.period ? fitText(it.period, { w: innerW, h: 0.4, max: 11, min: 10, maxLines: 2 }) : null;
  const note = it.note ? fitText(it.note, { w: innerW, h: 0.4, max: 11, min: 10, maxLines: 2 }) : null;
  const vBottom = h - pad - (period ? period.height : 0) - (note ? note.height + 0.05 : 0) - 0.04;
  const zoneH = vBottom - (pad + 0.5);
  const { sep, unit } = unitParts(it.unit);
  let size = null;
  for (let s = TYPE.kpi.size; s >= TYPE.kpi.min; s -= 1) {
    const vw = textWidth(it.prefix || "", { size: s }) + textWidth(String(it.value), { font: "Cambria", size: s }) + (unit ? textWidth(sep + unit, { size: unitSize(s) }) : 0);
    if (vw <= innerW * 0.95 && lineHeight(s, "Cambria") <= zoneH) {
      size = s;
      break;
    }
  }
  return { pad, innerW, bw, labelW, label, period, note, vBottom, size };
}

/**
 * KPI tile: label + badge on top, big number (prefix + value + unit) and period at the bottom.
 * @param {object} o { x,y,w,h, value:"66.5", prefix:"₹", unit:"L", period, label, badge, note, emphasis, valueSize }
 */
function addKpiTile(slide, o) {
  const { x, y, w, h, emphasis = false } = o;
  const p = kpiPlan(o, w, h);
  const where = `KPI "${trunc(o.label || o.value)}"`;
  if (!p.label.fits) warn(where, "label longer than 2 lines");
  if (p.period && !p.period.fits) warn(where, "period longer than 2 lines");
  if (p.note && !p.note.fits) warn(where, "note longer than 2 lines");
  const size = o.valueSize || p.size || TYPE.kpi.min;
  if (!p.size) warn(where, "value does not fit at the minimum size; widen the tile or shorten the number");
  const ink = emphasis ? hex("onDark") : col("ink");
  const muted = emphasis ? hex("onDarkMuted") : col("muted");
  const valueCol = emphasis ? hex("onDark") : col("aubergine");
  addCard(slide, { x, y, w, h, fill: emphasis ? "aubergine" : "paper", line: emphasis ? null : "line", name: "KPI card" });
  addTB(slide, o.label || "", { x: x + p.pad, y: y + p.pad, w: p.labelW, h: 0.46, fontSize: p.label.size, bold: true, color: ink, objectName: nm(slide, "KPI label") });
  if (o.badge) addBadge(slide, { type: o.badge, x: x + w - p.pad - p.bw, y: y + p.pad, onDark: emphasis });
  const lh = lineHeight(size, "Cambria");
  const { sep, unit } = unitParts(o.unit);
  const runs = [];
  if (o.prefix) runs.push({ text: o.prefix, options: { fontFace: BODY, fontSize: size, color: valueCol } });
  runs.push({ text: String(o.value), options: { fontFace: HEAD, fontSize: size, color: valueCol } });
  if (unit) runs.push({ text: sep + unit, options: { fontFace: BODY, fontSize: unitSize(size), color: emphasis ? hex("roseLight") : col("muted") } });
  addTB(slide, runs, { x: x + p.pad, y: y + p.vBottom - lh - 0.02, w: p.innerW, h: lh + 0.06, valign: "bottom", objectName: nm(slide, "KPI value") });
  let cy = y + p.vBottom + 0.04;
  if (p.period) {
    addTB(slide, o.period, { x: x + p.pad, y: cy, w: p.innerW, h: p.period.height + 0.02, fontSize: p.period.size, color: muted, objectName: nm(slide, "KPI period") });
    cy += p.period.height + 0.05;
  }
  if (p.note) {
    addTB(slide, o.note, { x: x + p.pad, y: cy, w: p.innerW, h: p.note.height + 0.02, fontSize: p.note.size, color: ink, objectName: nm(slide, "KPI note") });
  }
}

/** Row of equal KPI tiles sharing one value size. o: { items, x, y, w, h, gap } */
function addKpiRow(slide, o) {
  const { x, y, w } = box(o);
  const h = o.h || 2.2;
  const gap = o.gap === undefined ? GRID.gap : o.gap;
  const n = o.items.length;
  const tw = (w - gap * (n - 1)) / n;
  const sizes = o.items.map((it) => kpiPlan(it, tw, h).size).filter(Boolean);
  const shared = sizes.length ? Math.min(...sizes) : TYPE.kpi.min;
  o.items.forEach((it, i) => addKpiTile(slide, { ...it, x: x + i * (tw + gap), y, w: tw, h, valueSize: it.valueSize || shared }));
  return { tileW: tw, valueSize: shared };
}

// =============================================================================================
// Native charts
// =============================================================================================

function chartFrame(slide, o) {
  const { x, y, w, h } = box(o);
  const card = o.card !== false;
  const pad = card ? 0.2 : 0;
  if (card) addCard(slide, { x, y, w, h, name: "Chart card" });
  let top = y + pad;
  if (o.title) {
    const f = fitText(o.title, { w: w - 2 * pad, h: 0.5, max: 13, min: 11, bold: true, maxLines: 2 });
    if (!f.fits) warn(`Chart title "${trunc(o.title)}"`, "longer than 2 lines");
    addTB(slide, o.title, { x: x + pad, y: top, w: w - 2 * pad, h: f.height + 0.02, fontSize: f.size, bold: true, color: col("ink"), objectName: nm(slide, "Chart title") });
    top += f.height + 0.03;
  }
  if (o.unit) {
    addTB(slide, o.unit, { x: x + pad, y: top, w: w - 2 * pad, h: 0.22, fontSize: TYPE.label, color: col("muted"), objectName: nm(slide, "Chart unit") });
    top += 0.25;
  }
  if (o.badge) {
    const b = badgeSize(o.badge);
    addBadge(slide, { type: o.badge, x: x + w - pad - b.w, y: y + pad });
  }
  const cy = top + 0.05;
  return { x: x + pad * 0.5, y: cy, w: w - pad, h: y + h - pad * 0.5 - cy };
}

function baseChartOpts(area, numberFormat, showLegend) {
  return {
    x: area.x, y: area.y, w: area.w, h: area.h,
    chartArea: { fill: { color: HEX.paper } },
    plotArea: { fill: { color: HEX.paper } },
    catAxisLabelColor: CHART.label,
    catAxisLabelFontFace: CHART.font,
    catAxisLabelFontSize: CHART.labelSize,
    catAxisLineShow: true,
    catAxisLineColor: CHART.axisLine,
    catAxisMajorTickMark: "none",
    valAxisHidden: true,
    valAxisLineShow: false,
    valAxisLabelColor: CHART.label,
    valAxisLabelFontFace: CHART.font,
    valAxisLabelFontSize: CHART.labelSize - 1,
    valAxisLabelFormatCode: numberFormat,
    valGridLine: { style: "none" },
    catGridLine: { style: "none" },
    showValue: true,
    dataLabelColor: CHART.value,
    dataLabelFontFace: CHART.font,
    dataLabelFontSize: CHART.labelSize,
    dataLabelFormatCode: numberFormat,
    showLegend: !!showLegend,
    legendPos: "t",
    legendFontFace: CHART.font,
    legendFontSize: CHART.labelSize,
    legendColor: CHART.label,
    showTitle: false,
  };
}

function axisRange(values, { stacked = false, series = [] } = {}) {
  let maxV = Math.max(0, ...values);
  let minV = Math.min(0, ...values);
  if (stacked && series.length > 1) {
    const n = series[0].values.length;
    const pos = [];
    const neg = [];
    for (let i = 0; i < n; i++) {
      pos.push(series.reduce((a, s) => a + Math.max(0, s.values[i]), 0));
      neg.push(series.reduce((a, s) => a + Math.min(0, s.values[i]), 0));
    }
    maxV = Math.max(0, ...pos);
    minV = Math.min(0, ...neg);
  }
  // Headroom for outside-end data labels, then round to a "nice" step so visible axes read cleanly.
  const span = maxV - minV || 1;
  const raw = span / 5;
  const mag = 10 ** Math.floor(Math.log10(raw));
  const step = [1, 2, 2.5, 5, 10].map((k) => k * mag).find((s) => s >= raw) || 10 * mag;
  const hiPad = maxV > 0 ? maxV + span * 0.14 : 0;
  const loPad = minV < 0 ? minV - span * 0.14 : 0;
  return { max: Math.ceil(hiPad / step - 1e-9) * step, min: Math.floor(loPad / step + 1e-9) * step, step };
}

/**
 * Native bar/column chart on a card.
 * @param {object} o { x,y,w,h, title, unit, badge, categories, series:[{name,values}] | values[],
 *                     direction:"col"|"bar", stacked, numberFormat, highlight:index|[index], colors, showLegend, card }
 */
function addBarChart(slide, o) {
  let series = o.series;
  if (Array.isArray(series) && typeof series[0] === "number") series = [{ name: o.seriesName || o.title || "Value", values: series }];
  const area = chartFrame(slide, o);
  const stacked = !!o.stacked;
  const numberFormat = o.numberFormat || "#,##0";
  let chartColors;
  if (series.length === 1) {
    const hl = o.highlight === undefined ? [] : [].concat(o.highlight);
    const base = o.baseColor ? hex(o.baseColor) : CHART.single;
    chartColors = hl.length ? o.categories.map((_, i) => (hl.includes(i) ? CHART.highlight : base)) : [base];
  } else {
    chartColors = (o.colors || CHART.series).slice(0, series.length).map(hex);
  }
  const range = axisRange(series.flatMap((s) => s.values), { stacked, series });
  const opts = {
    ...baseChartOpts(area, numberFormat, o.showLegend === undefined ? series.length > 1 : o.showLegend),
    barDir: o.direction === "bar" ? "bar" : "col",
    barGrouping: stacked ? "stacked" : "clustered",
    barGapWidthPct: o.gapWidth || (series.length > 1 ? 60 : 55),
    chartColors,
    dataLabelPosition: stacked ? "ctr" : "outEnd",
    dataLabelColor: stacked ? HEX.paper : CHART.value,
    valAxisMaxVal: o.valMax === undefined ? range.max : o.valMax,
    valAxisMinVal: o.valMin === undefined ? range.min : o.valMin,
    catAxisOrientation: o.direction === "bar" ? "maxMin" : "minMax",
    catAxisLabelPos: "low",
    objectName: nm(slide, "Bar chart"),
    altText: o.title || "Bar chart",
  };
  if (o.direction === "bar") opts.catAxisLabelFontSize = CHART.labelSize + 1;
  slide.addChart("bar", series.map((s) => ({ name: s.name, labels: o.categories, values: s.values })), opts);
}

const SCENARIO_FALLBACK = [HEX.mauve, HEX.plum, HEX.rose, HEX.aubergine];

/**
 * Scenario chart: grouped columns (default) or lines, one series per scenario.
 * Colours follow the scenario role: conservative = mauve, planning/base = plum, upside/aggressive = rose.
 * @param {object} o { x,y,w,h, title, unit, badge, categories, scenarios:[{name, values, role?, color?}], type:"column"|"line", numberFormat }
 */
function addScenarioChart(slide, o) {
  const area = chartFrame(slide, o);
  const numberFormat = o.numberFormat || "#,##0.0";
  const colors = o.scenarios.map((s, i) => {
    if (s.color) return hex(s.color);
    const role = String(s.role || s.name).toLowerCase().split(/\s+/)[0];
    return CHART.scenario[role] || SCENARIO_FALLBACK[i % SCENARIO_FALLBACK.length];
  });
  const data = o.scenarios.map((s) => ({ name: s.name, labels: o.categories, values: s.values }));
  const range = axisRange(o.scenarios.flatMap((s) => s.values));
  const base = baseChartOpts(area, numberFormat, true);
  if (o.type === "line") {
    // Lines read from a quiet value axis; per-point labels collide when scenarios run close together,
    // so they are off unless asked for (showValue: true).
    slide.addChart("line", data, {
      ...base,
      chartColors: colors,
      lineSize: 2.25,
      lineDataSymbol: "circle",
      lineDataSymbolSize: 7,
      showValue: !!o.showValue,
      dataLabelPosition: "t",
      valAxisHidden: false,
      valGridLine: { color: CHART.grid, size: 0.5 },
      valAxisMaxVal: o.valMax === undefined ? range.max : o.valMax,
      valAxisMinVal: o.valMin === undefined ? range.min : o.valMin,
      valAxisMajorUnit: o.valStep || range.step,
      catAxisLabelPos: "low",
      objectName: nm(slide, "Scenario line chart"),
      altText: o.title || "Scenario chart",
    });
  } else {
    slide.addChart("bar", data, {
      ...base,
      barDir: "col",
      barGrouping: "clustered",
      barGapWidthPct: 70,
      chartColors: colors,
      dataLabelPosition: "outEnd",
      valAxisMaxVal: o.valMax === undefined ? range.max : o.valMax,
      valAxisMinVal: o.valMin === undefined ? range.min : o.valMin,
      catAxisLabelPos: "low",
      objectName: nm(slide, "Scenario chart"),
      altText: o.title || "Scenario chart",
    });
  }
}

// =============================================================================================
// Market-sizing tree: TAM -> SAM -> SOM
// =============================================================================================

/**
 * Narrowing boxes left to right, joined by labelled arrows. The last level is the dark "target" box.
 * @param {object} o { x,y,w,h, levels:[{code, title, value, range, parts:[{label,value}], note, badge}],
 *                     links:[string|{label, sub}], gapW, step }
 */
function addMarketTree(slide, o) {
  const { x, y, w, h } = box(o);
  const levels = o.levels;
  const n = levels.length;
  const gapW = o.gapW || 1.3;
  const bw = (w - gapW * (n - 1)) / n;
  const step = o.step === undefined ? 0.09 : o.step;
  const pad = 0.22;
  const innerW = bw - 2 * pad;

  // One value size for every level (largest that fits the widest value).
  let vSize = 32;
  while (vSize > 20 && levels.some((lv) => textWidth(String(lv.value), { font: "Cambria", size: vSize }) > innerW * 0.95)) vSize -= 1;

  // Plan each box's text at the largest body size (11 -> 10 pt) that fits the space the box could get.
  const planFor = (lv, body) => {
    const title = fitText(lv.title || "", { w: innerW, h: 0.5, max: 13, min: 12, bold: true, maxLines: 2 });
    const parts = (lv.parts || []).map((p) => fitText(`${p.label}: ${p.value}`, { w: innerW - 0.12, h: 1, max: body, min: body, maxLines: 2 }));
    const range = lv.range ? fitText(lv.range, { w: innerW, h: 0.5, max: body, min: body, maxLines: 2 }) : null;
    const note = lv.note ? fitText(lv.note, { w: innerW, h: 2, max: body, min: body }) : null;
    const text = 0.28 + title.height + 0.06 + lineHeight(vSize, "Cambria") + (range ? range.height + 0.04 : 0) +
      parts.reduce((a, p) => a + p.height + 0.02, parts.length ? 0.08 : 0) + (note ? note.height + 0.08 : 0);
    return { title, parts, range, note, body, need: text + 2 * pad + (lv.badge ? 0.24 + 0.16 : 0) };
  };
  const plans = levels.map((lv, i) => {
    const maxH = h * (1 - i * step);
    let p = planFor(lv, 11);
    if (p.need > maxH) p = planFor(lv, 10.5);
    if (p.need > maxH) p = planFor(lv, 10);
    if (p.need > maxH) warn(`Market box "${lv.code}"`, "text overflows the box; shorten the note or parts");
    return p;
  });
  // Use only the height the content needs (plus air), top-aligned in the area.
  const hUse = Math.min(h, Math.max(h * 0.75, Math.max(...plans.map((p, i) => p.need / (1 - i * step))) + 0.35));
  const midY = y + hUse / 2;

  levels.forEach((lv, i) => {
    const bh = hUse * (1 - i * step);
    const bx = x + i * (bw + gapW);
    const by = midY - bh / 2;
    const last = i === n - 1;
    const fill = last ? "aubergine" : i % 2 ? "plumTint" : "paper";
    const ink = last ? hex("onDark") : col("ink");
    const muted = last ? hex("onDarkMuted") : col("muted");
    addCard(slide, { x: bx, y: by, w: bw, h: bh, fill, line: last ? null : "line", name: "Market box" });
    const plan = plans[i];
    const body = plan.body;

    let cy = by + pad;
    addTB(slide, String(lv.code || "").toUpperCase(), { x: bx + pad, y: cy, w: innerW, h: 0.22, fontSize: 11, bold: true, charSpacing: 1.5, color: last ? hex("roseLight") : hex("roseDark"), valign: "middle", objectName: nm(slide, "Market code") });
    cy += 0.28;
    addTB(slide, lv.title || "", { x: bx + pad, y: cy, w: innerW, h: plan.title.height + 0.02, fontSize: plan.title.size, bold: true, color: ink, objectName: nm(slide, "Market title") });
    cy += plan.title.height + 0.06;
    const vh = lineHeight(vSize, "Cambria");
    addTB(slide, headRuns(String(lv.value), { fontSize: vSize, color: last ? hex("onDark") : col("aubergine") }), { x: bx + pad, y: cy, w: innerW, h: vh + 0.02, objectName: nm(slide, "Market value") });
    cy += vh;
    if (plan.range) {
      addTB(slide, lv.range, { x: bx + pad, y: cy, w: innerW, h: plan.range.height + 0.02, fontSize: plan.range.size, color: muted, objectName: nm(slide, "Market range") });
      cy += plan.range.height + 0.04;
    }
    if (plan.parts.length) {
      cy += 0.08;
      const runs = [];
      lv.parts.forEach((p, k) => {
        runs.push({ text: `${p.label}: `, options: { color: muted, fontSize: body } });
        runs.push({ text: String(p.value), options: { bold: true, color: ink, fontSize: body, breakLine: k < lv.parts.length - 1 } });
      });
      const ph = plan.parts.reduce((a, p) => a + p.height + 0.02, 0);
      addTB(slide, runs, { x: bx + pad, y: cy, w: innerW, h: ph, fontSize: body, objectName: nm(slide, "Market parts") });
      cy += ph;
    }
    if (plan.note) {
      cy += 0.08;
      addTB(slide, lv.note, { x: bx + pad, y: cy, w: innerW, h: plan.note.height + 0.02, fontSize: plan.note.size, color: ink, objectName: nm(slide, "Market note") });
    }
    if (lv.badge) addBadge(slide, { type: lv.badge, x: bx + pad, y: by + bh - pad - 0.24, onDark: last });

    // Connector to the next level
    if (i < n - 1) {
      const lx = bx + bw + 0.1;
      const lw = gapW - 0.2;
      addLine(slide, { x: lx, y: midY, w: lw, color: "rose", width: 1.5, arrow: "triangle", name: "Market connector" });
      const link = o.links && o.links[i];
      if (link) {
        const label = typeof link === "string" ? link : link.label;
        const f = fitText(label, { w: lw, h: 0.7, max: 11, min: 10, bold: true, maxLines: 3 });
        if (!f.fits) warn(`Market link "${trunc(label)}"`, "too long for the connector gap");
        addTB(slide, label, { x: lx, y: midY - 0.08 - f.height, w: lw, h: f.height, fontSize: f.size, bold: true, color: hex("roseDark"), align: "center", valign: "bottom", objectName: nm(slide, "Market link") });
        if (link.sub) {
          const fs = fitText(link.sub, { w: lw, h: 0.7, max: 10, min: 10, maxLines: 3 });
          addTB(slide, link.sub, { x: lx, y: midY + 0.08, w: lw, h: fs.height + 0.02, fontSize: 10, color: col("muted"), align: "center", objectName: nm(slide, "Market link note") });
        }
      }
    }
  });
}

// =============================================================================================
// Funnel
// =============================================================================================

function fmtPct(r) {
  const p = r * 100;
  return `${p >= 10 ? Math.round(p) : p.toFixed(1)}%`;
}

/**
 * Centred funnel bars, stage labels on the left, stage-to-stage conversion pills on the right and an
 * optional overall conversion. scale "stepped" (default) narrows bars evenly; "linear" sizes them by volume.
 * @param {object} o { x,y,w,h, stages:[{label, sub, value, display}], conversions:[string], conversionNotes:[string],
 *                     overall:string|true, format:fn, scale, labelW, convW, minPct, highlightLast,
 *                     headers:{stage, volume, conversion} }
 */
function addFunnel(slide, o) {
  const { x, w } = box(o);
  let { y, h } = box(o);
  const stages = o.stages;
  const n = stages.length;
  const labelW = o.labelW || 2.8;
  const convW = o.convW || 2.0;
  const gap = 0.25;
  const fmt = o.format || ((v) => Number(v).toLocaleString("en-IN"));
  if (o.headers) {
    const hy = y;
    const hdr = (t, hx, hw, align) => addTB(slide, String(t).toUpperCase(), { x: hx, y: hy, w: hw, h: 0.24, fontSize: 10, bold: true, charSpacing: 1, color: col("muted"), align, valign: "middle", objectName: nm(slide, "Funnel header") });
    if (o.headers.stage) hdr(o.headers.stage, x, labelW, "left");
    if (o.headers.volume) hdr(o.headers.volume, x + labelW + gap, w - labelW - convW - 2 * gap, "center");
    if (o.headers.conversion) hdr(o.headers.conversion, x + w - convW, convW, "left");
    y += 0.34;
    h -= 0.34;
  }
  const barX = x + labelW + gap;
  const barW = w - labelW - convW - 2 * gap;
  const cx = barX + barW / 2;
  const rowH = h / n;
  const barH = Math.min(0.8, rowH * 0.66);
  const maxV = Math.max(...stages.map((s) => s.value));
  // "stepped" (default): widths fall evenly and the labels carry the numbers, which keeps the funnel
  // readable when volumes span orders of magnitude. "linear": width proportional to volume.
  const scale = o.scale || "stepped";
  const minPct = o.minPct === undefined ? (scale === "linear" ? 0.16 : 0.3) : o.minPct;
  const widthPct = (st, i) => (scale === "linear" ? Math.max(minPct, st.value / maxV) : 1 - (i * (1 - minPct)) / Math.max(1, n - 1));
  const highlightLast = o.highlightLast !== false;

  // Shared label size
  let lSize = 13;
  for (; lSize >= 11; lSize -= 0.5) {
    const ok = stages.every((st) => fitParagraphs([{ text: st.label, bold: true }, ...(st.sub ? [{ text: st.sub, sizeDelta: -2 }] : [])], { w: labelW, h: rowH, max: lSize, min: lSize, paraGap: 1 }).fits);
    if (ok) break;
  }
  lSize = Math.max(lSize, 11);

  stages.forEach((st, i) => {
    const ry = y + i * rowH;
    const by = ry + (rowH - barH) / 2;
    const bwid = widthPct(st, i) * barW;
    const t = n > 2 ? i / (n - (highlightLast ? 2 : 1)) : i;
    const fillHex = highlightLast && i === n - 1 ? HEX.rose : mix(HEX.aubergine, SEQ[2], Math.min(1, t));
    slide.addShape("roundRect", { x: cx - bwid / 2, y: by, w: bwid, h: barH, rectRadius: 0.06, fill: { color: fillHex }, line: { type: "none" }, objectName: nm(slide, "Funnel bar") });
    const label = st.display || fmt(st.value);
    const vSize = Math.max(11, Math.min(16, barH * 72 * 0.42));
    const tw = textWidth(label, { bold: true, size: vSize });
    if (tw + 0.24 <= bwid) {
      addTB(slide, label, { x: cx - bwid / 2, y: by, w: bwid, h: barH, fontSize: vSize, bold: true, color: textOn(fillHex), align: "center", valign: "middle", objectName: nm(slide, "Funnel value") });
    } else {
      addTB(slide, label, { x: cx + bwid / 2 + 0.08, y: by, w: tw + 0.1, h: barH, fontSize: vSize, bold: true, color: col("ink"), valign: "middle", objectName: nm(slide, "Funnel value") });
    }
    const runs = [{ text: st.label, options: { bold: true, fontSize: lSize, color: col("ink"), breakLine: !!st.sub } }];
    if (st.sub) runs.push({ text: st.sub, options: { fontSize: lSize - 2, color: col("muted") } });
    addTB(slide, runs, { x, y: ry, w: labelW, h: rowH, valign: "middle", objectName: nm(slide, "Funnel stage") });
  });

  // Conversion pills sit on the boundary between stages.
  const pillH = Math.min(0.3, rowH * 0.4);
  for (let i = 0; i < n - 1; i++) {
    const conv = (o.conversions && o.conversions[i]) || fmtPct(stages[i + 1].value / stages[i].value);
    const text = `↓ ${conv}`;
    const pw = textWidth(text, { bold: true, size: 12 }) + 0.26;
    const py = y + (i + 1) * rowH - pillH / 2;
    const px = x + w - convW;
    slide.addText(text, { isTextBox: true, shape: "roundRect", rectRadius: pillH / 2, x: px, y: py, w: pw, h: pillH, fill: { color: col("roseTint") }, line: { type: "none" }, fontSize: 12, bold: true, color: hex("roseDark"), align: "center", valign: "middle", margin: 0, objectName: nm(slide, "Funnel conversion") });
    const note = o.conversionNotes && o.conversionNotes[i];
    if (note) {
      const nw = convW - pw - 0.08;
      const f = fitText(note, { w: nw, h: pillH + 0.2, max: 10, min: 10, maxLines: 2 });
      if (!f.fits) warn(`Funnel note "${trunc(note)}"`, "too long beside the conversion pill");
      addTB(slide, note, { x: px + pw + 0.08, y: py + pillH / 2 - f.height / 2, w: nw, h: f.height + 0.02, fontSize: 10, color: col("muted"), objectName: nm(slide, "Funnel conversion note") });
    }
  }
  if (o.overall) {
    const val = o.overall === true ? fmtPct(stages[n - 1].value / stages[0].value) : o.overall;
    const text = `Overall ${val}`;
    const pw = textWidth(text, { bold: true, size: 12 }) + 0.3;
    slide.addText(text, { isTextBox: true, shape: "roundRect", rectRadius: pillH / 2, x: x + w - convW, y: y + (n - 0.5) * rowH - pillH / 2, w: pw, h: pillH, fill: { color: col("aubergine") }, line: { type: "none" }, fontSize: 12, bold: true, color: col("paper"), align: "center", valign: "middle", margin: 0, objectName: nm(slide, "Funnel overall") });
  }
}

// =============================================================================================
// Scorecard / comparison matrix
// =============================================================================================

function addHarvey(slide, { cx, cy, d, frac }) {
  const x = cx - d / 2;
  const y = cy - d / 2;
  slide.addShape("ellipse", { x, y, w: d, h: d, fill: { color: col("paper") }, line: { color: col("plum"), width: 1 }, objectName: nm(slide, "Harvey ball") });
  if (frac >= 0.999) {
    slide.addShape("ellipse", { x, y, w: d, h: d, fill: { color: col("plum") }, line: { color: col("plum"), width: 1 }, objectName: nm(slide, "Harvey fill") });
  } else if (frac > 0.001) {
    slide.addShape("pie", { x, y, w: d, h: d, angleRange: [270, (270 + 360 * frac) % 360], fill: { color: col("plum") }, line: { type: "none" }, objectName: nm(slide, "Harvey fill") });
  }
}

function addScoreChip(slide, { cx, cy, score, min, max, w = 0.46, h = 0.3 }) {
  const idx = Math.round(((score - min) / (max - min || 1)) * (SEQ.length - 1));
  const fill = SEQ[Math.max(0, Math.min(SEQ.length - 1, idx))];
  slide.addText(String(score), { isTextBox: true, shape: "roundRect", rectRadius: 0.06, x: cx - w / 2, y: cy - h / 2, w, h, fill: { color: fill }, line: { type: "none" }, fontSize: 12, bold: true, color: textOn(fill), align: "center", valign: "middle", margin: 0, objectName: nm(slide, "Score chip") });
}

/**
 * Options x criteria matrix with Harvey balls or 1-5 coloured chips, weighted total, status and "why not".
 * @param {object} o { x,y,w,h, criteria:[{name, weight}], options:[{name, desc, scores, total, status, statusLabel, whyNot, highlight}],
 *                     mode:"harvey"|"chip", min:1, max:5, showTotal, whyNotHeader, nameW, critW, legend }
 */
function addScorecard(slide, o) {
  const { x, y, w, h } = box(o);
  const crit = o.criteria;
  const opts = o.options;
  const mode = o.mode || "harvey";
  const min = o.min === undefined ? 1 : o.min;
  const max = o.max === undefined ? 5 : o.max;
  const nameW = o.nameW || 2.5;
  const critW = o.critW || 1.05;
  const showTotal = o.showTotal !== false;
  const totalW = showTotal ? 0.85 : 0;
  const hasStatus = opts.some((op) => op.status);
  const statusW = hasStatus ? 1.45 : 0;
  const hasWhy = opts.some((op) => op.whyNot);
  const whyW = hasWhy ? w - nameW - crit.length * critW - totalW - statusW : 0;
  if (hasWhy && whyW < 2.0) warn("Scorecard", `"why not" column only ${whyW.toFixed(2)}" wide; reduce criteria or critW`);
  const legendH = o.legend === false ? 0 : 0.36;
  const weights = crit.map((c) => (c.weight === undefined ? 1 : c.weight));
  const wSum = weights.reduce((a, b) => a + b, 0);

  // Header height from the longest criterion name
  let hSize = 11;
  const headLines = Math.max(...crit.map((c) => fitText(c.name, { w: critW - 0.08, h: 1, max: 11, min: 10, bold: true, maxLines: 3 }).lines.length));
  const hasWeights = crit.some((c) => c.weight !== undefined);
  const headerH = headLines * lineHeight(hSize, "Calibri", true) + (hasWeights ? 0.2 : 0) + 0.16;
  const rowH = Math.min(0.95, (h - headerH - legendH) / opts.length);

  // Shared sizes for names and "why not"
  let nSize = 13;
  for (; nSize > 11; nSize -= 0.5) {
    if (opts.every((op) => fitParagraphs([{ text: op.name, bold: true }, ...(op.desc ? [{ text: op.desc, sizeDelta: -2 }] : [])], { w: nameW - 0.24, h: rowH - 0.08, max: nSize, min: nSize, paraGap: 1 }).fits)) break;
  }
  let wSize = 12;
  if (hasWhy) {
    for (; wSize > 10; wSize -= 0.5) {
      if (opts.every((op) => !op.whyNot || fitText(op.whyNot, { w: whyW - 0.24, h: rowH - 0.08, max: wSize, min: wSize }).fits)) break;
    }
    opts.forEach((op) => {
      if (op.whyNot && !fitText(op.whyNot, { w: whyW - 0.24, h: rowH - 0.08, max: wSize, min: wSize }).fits) warn(`Scorecard "${trunc(op.name)}"`, "why-not text overflows its row at 10 pt");
    });
  }

  const tableH = headerH + rowH * opts.length;
  addCard(slide, { x, y, w, h: tableH, name: "Scorecard card" });

  // Column x positions
  const colX = [];
  let cx = x + nameW;
  crit.forEach(() => {
    colX.push(cx);
    cx += critW;
  });
  const totalX = cx;
  const statusX = totalX + totalW;
  const whyX = statusX + statusW;

  // Header
  const hdr = (text, hx, hw, align = "center", extra = {}) =>
    addTB(slide, text, { x: hx, y: y + 0.08, w: hw, h: headerH - 0.12, fontSize: hSize, bold: true, color: col("ink"), align, valign: "bottom", objectName: nm(slide, "Scorecard header"), ...extra });
  hdr("Option", x + 0.12, nameW - 0.24, "left");
  crit.forEach((c, i) => {
    const runs = [{ text: c.name, options: { bold: true, color: col("ink"), breakLine: c.weight !== undefined } }];
    if (c.weight !== undefined) runs.push({ text: `${Math.round((c.weight / wSum) * 100)}%`, options: { bold: false, color: col("muted"), fontSize: 10 } });
    hdr(runs, colX[i] + 0.04, critW - 0.08);
  });
  if (showTotal) hdr("Score", totalX, totalW);
  if (hasStatus) hdr("Verdict", statusX, statusW);
  if (hasWhy) hdr(o.whyNotHeader || "Why not / condition", whyX + 0.12, whyW - 0.24, "left");
  addLine(slide, { x: x + 0.12, y: y + headerH, w: w - 0.24, color: "lineStrong", width: 1, name: "Scorecard header rule" });

  opts.forEach((op, r) => {
    const ry = y + headerH + r * rowH;
    const mid = ry + rowH / 2;
    if (op.highlight || op.status === "recommended") {
      slide.addShape("rect", { x: x + 0.04, y: ry + 0.03, w: w - 0.08, h: rowH - 0.06, fill: { color: col("plumTint") }, line: { type: "none" }, objectName: nm(slide, "Scorecard highlight") });
    }
    if (r > 0) addLine(slide, { x: x + 0.12, y: ry, w: w - 0.24, color: "line", width: 0.75, name: "Scorecard row rule" });
    const runs = [{ text: op.name, options: { bold: true, fontSize: nSize, color: col("ink"), breakLine: !!op.desc } }];
    if (op.desc) runs.push({ text: op.desc, options: { fontSize: nSize - 2, color: col("muted") } });
    addTB(slide, runs, { x: x + 0.12, y: ry + 0.04, w: nameW - 0.24, h: rowH - 0.08, valign: "middle", objectName: nm(slide, "Scorecard option") });
    op.scores.forEach((s, i) => {
      const ccx = colX[i] + critW / 2;
      if (s === null || s === undefined) {
        addTB(slide, "n/a", { x: colX[i], y: mid - 0.12, w: critW, h: 0.24, fontSize: 10, color: col("muted"), align: "center", valign: "middle", objectName: nm(slide, "Scorecard n/a") });
      } else if (mode === "chip") addScoreChip(slide, { cx: ccx, cy: mid, score: s, min, max });
      else addHarvey(slide, { cx: ccx, cy: mid, d: Math.min(0.3, rowH * 0.5), frac: (s - min) / (max - min) });
    });
    if (showTotal) {
      const tot = op.total !== undefined ? op.total : op.scores.reduce((a, s, i) => a + (s || 0) * weights[i], 0) / wSum;
      const txt = typeof tot === "number" ? tot.toFixed(1) : String(tot);
      addTB(slide, txt, { x: totalX, y: ry, w: totalW, h: rowH, fontSize: 14, bold: true, color: col("aubergine"), align: "center", valign: "middle", objectName: nm(slide, "Scorecard total") });
    }
    if (op.status) {
      const chip = textWidth(String(op.statusLabel || op.status).toUpperCase(), { bold: true, size: 9, charSpacing: 0.6 }) + 0.24;
      addStatusChip(slide, { status: op.status, label: op.statusLabel, x: statusX + (statusW - chip) / 2, y: mid - 0.13, w: chip });
    }
    if (op.whyNot) {
      addTB(slide, op.whyNot, { x: whyX + 0.12, y: ry + 0.04, w: whyW - 0.24, h: rowH - 0.08, fontSize: wSize, color: col("ink"), valign: "middle", objectName: nm(slide, "Scorecard why not") });
    }
  });

  // Legend
  if (legendH) {
    const ly = y + tableH + 0.1;
    let lx = x;
    addTB(slide, mode === "chip" ? "Score:" : "Fit:", { x: lx, y: ly, w: 0.5, h: 0.26, fontSize: 10, bold: true, color: col("muted"), valign: "middle", objectName: nm(slide, "Scorecard legend") });
    lx += 0.5;
    const stepsN = 5;
    for (let k = 0; k < stepsN; k++) {
      const val = min + ((max - min) * k) / (stepsN - 1);
      if (mode === "chip") addScoreChip(slide, { cx: lx + 0.2, cy: ly + 0.13, score: Math.round(val), min, max, w: 0.36, h: 0.24 });
      else addHarvey(slide, { cx: lx + 0.12, cy: ly + 0.13, d: 0.2, frac: k / (stepsN - 1) });
      lx += mode === "chip" ? 0.46 : 0.32;
    }
    const lbl = o.legendLabel || (mode === "chip" ? `${min} = weak, ${max} = strong` : "empty = weak fit, full = strong fit");
    addTB(slide, lbl, { x: lx + 0.05, y: ly, w: 4.5, h: 0.26, fontSize: 10, color: col("muted"), valign: "middle", objectName: nm(slide, "Scorecard legend text") });
  }
}

// =============================================================================================
// Gate / stage timeline
// =============================================================================================

/**
 * Gate nodes on a spine with name, timing, criteria card and an "unlocks" panel per gate.
 * @param {object} o { x,y,w,h, gates:[{code, name, when, criteria:[string], unlocks, current}], unlocksLabel }
 */
function addGateTimeline(slide, o) {
  const { x, y, w, h } = box(o);
  const gates = o.gates;
  const n = gates.length;
  const gap = 0.2;
  const colW = (w - gap * (n - 1)) / n;
  const d = 0.62;
  const spineY = y + d / 2;
  const pad = 0.16;
  const innerW = colW - 2 * pad;

  addLine(slide, { x: x + colW / 2, y: spineY, w: (n - 1) * (colW + gap), color: "lineStrong", width: 2, name: "Gate spine" });

  // Name/when block height shared by all columns
  const nameFits = gates.map((g) => fitText(g.name || "", { w: colW, h: 0.6, max: 13, min: 12, bold: true, maxLines: 2 }));
  const nameH = Math.max(...nameFits.map((f) => f.height));
  const whenH = gates.some((g) => g.when) ? 0.24 : 0;
  const cardY = y + d + 0.12 + nameH + whenH + 0.12;
  const cardH = y + h - cardY;
  const unlocksLabel = o.unlocksLabel || "Unlocks";

  // One body size across columns
  let size = 12;
  const plan = (g, s) => {
    const crit = fitParagraphs((g.criteria || []).map((t) => ({ text: t, indent: 0.17 })), { w: innerW, h: 99, max: s, min: s, paraGap: 4 });
    const unl = g.unlocks ? fitParagraphs([{ text: unlocksLabel.toUpperCase(), bold: true, sizeDelta: -2 }, { text: g.unlocks }], { w: innerW - 0.2, h: 99, max: s, min: s, paraGap: 2 }) : null;
    const unlH = unl ? unl.height + 0.2 : 0;
    return { crit, unl, unlH, need: crit.height + 2 * pad + (unl ? unlH + 0.1 : 0) };
  };
  for (; size > 10; size -= 0.5) if (gates.every((g) => plan(g, size).need <= cardH)) break;

  gates.forEach((g, i) => {
    const gx = x + i * (colW + gap);
    const ccx = gx + colW / 2;
    const fill = g.current ? "rose" : "aubergine";
    const codeW = Math.max(d, textWidth(g.code, { font: "Cambria", bold: true, size: 15 }) + 0.3);
    slide.addText(headRuns(g.code, { fontSize: 15, bold: true, color: col("paper") }), {
      isTextBox: true, shape: codeW > d + 0.01 ? "roundRect" : "ellipse", rectRadius: d / 2,
      x: ccx - codeW / 2, y, w: codeW, h: d, fill: { color: col(fill) }, line: { color: col("paper"), width: 2 },
      align: "center", valign: "middle", margin: 0, objectName: nm(slide, "Gate node"),
    });
    addTB(slide, g.name || "", { x: gx, y: y + d + 0.12, w: colW, h: nameH, fontSize: nameFits[i].size, bold: true, color: col("ink"), align: "center", valign: "top", objectName: nm(slide, "Gate name") });
    if (g.when) addTB(slide, g.when, { x: gx, y: y + d + 0.12 + nameH, w: colW, h: whenH, fontSize: 11, bold: true, color: hex("roseDark"), align: "center", valign: "middle", objectName: nm(slide, "Gate timing") });

    const p = plan(g, size);
    if (p.need > cardH + 1e-6) warn(`Gate "${g.code}"`, `criteria overflow the card at ${size} pt; cut criteria`);
    addCard(slide, { x: gx, y: cardY, w: colW, h: cardH, name: "Gate card" });
    const runs = (g.criteria || []).map((t, k, a) => ({ text: t, options: { bullet: { indent: 12 }, fontSize: size, color: col("ink"), paraSpaceAfter: 4, breakLine: k < a.length - 1 } }));
    if (runs.length) addTB(slide, runs, { x: gx + pad, y: cardY + pad, w: innerW, h: cardH - 2 * pad - (p.unl ? p.unlH + 0.1 : 0), objectName: nm(slide, "Gate criteria") });
    if (p.unl) {
      const uy = cardY + cardH - pad - p.unlH;
      slide.addShape("roundRect", { x: gx + pad - 0.04, y: uy, w: innerW + 0.08, h: p.unlH, rectRadius: 0.06, fill: { color: col("plumTint") }, line: { type: "none" }, objectName: nm(slide, "Gate unlocks panel") });
      addTB(slide, [
        { text: unlocksLabel.toUpperCase(), options: { bold: true, fontSize: size - 2, charSpacing: 1, color: hex("roseDark"), breakLine: true, paraSpaceAfter: 2 } },
        { text: g.unlocks, options: { fontSize: size, color: col("aubergine") } },
      ], { x: gx + pad + 0.06, y: uy + 0.1, w: innerW - 0.12, h: p.unlH - 0.2, objectName: nm(slide, "Gate unlocks") });
    }
  });
}

// =============================================================================================
// Gantt roadmap
// =============================================================================================

const TONES = { primary: "plum", accent: "rose", muted: "mauve", dark: "aubergine" };

/**
 * Rows = workstreams, columns = periods. Bars/milestones are in period units (0 = start of first period;
 * end is exclusive, so {start:0,end:3} covers the first three periods).
 * @param {object} o { x,y,w,h, periods:[string], groups:[{label, span}], rows:[{label, heading, bars:[{start,end,label,tone}],
 *                     milestones:[{at,label}]}], markers:[{at,label}], labelW }
 */
function addGantt(slide, o) {
  const { x, y, w, h } = box(o);
  const periods = o.periods;
  const np = periods.length;
  const labelW = o.labelW || 2.6;
  const gridX = x + labelW + 0.15;
  const gridW = w - labelW - 0.15;
  const colW = gridW / np;
  const groupH = o.groups ? 0.28 : 0;
  const periodH = 0.28;
  const markerH = o.markers && o.markers.length ? 0.34 : 0;
  const rowsTop = y + groupH + periodH + markerH + 0.04;
  const rows = o.rows;
  const rowH = Math.min(0.52, (y + h - rowsTop) / rows.length);
  const gridBottom = rowsTop + rowH * rows.length;
  const X = (t) => gridX + t * colW;

  // Period groups (e.g. years or phases)
  if (o.groups) {
    let start = 0;
    o.groups.forEach((g) => {
      addTB(slide, g.label, { x: X(start) + 0.05, y, w: g.span * colW - 0.1, h: groupH, fontSize: 11, bold: true, color: col("aubergine"), valign: "middle", objectName: nm(slide, "Gantt group") });
      if (start > 0) addLine(slide, { x: X(start), y, h: gridBottom - y, color: "lineStrong", width: 0.75, name: "Gantt group rule" });
      start += g.span;
    });
  }
  // Period labels + column gridlines
  const pSize = Math.min(11, Math.max(9, (colW * 72) / 3.2));
  periods.forEach((p, i) => {
    addTB(slide, p, { x: X(i), y: y + groupH, w: colW, h: periodH, fontSize: pSize, color: col("muted"), align: "center", valign: "middle", objectName: nm(slide, "Gantt period") });
    if (i > 0) addLine(slide, { x: X(i), y: rowsTop, h: gridBottom - rowsTop, color: "line", width: 0.5, name: "Gantt column rule" });
  });
  addLine(slide, { x, y: rowsTop, w, color: "lineStrong", width: 1, name: "Gantt header rule" });

  // Vertical markers (gates, decision points), drawn before the bars so bars sit on top of them
  (o.markers || []).forEach((m) => {
    const mx = X(m.at);
    const my = y + groupH + periodH + 0.04;
    addLine(slide, { x: mx, y: my + 0.26, h: gridBottom - my - 0.26, color: "rose", width: 1.25, dash: "dash", name: "Gantt marker" });
    const tw = textWidth(m.label, { bold: true, size: 9, charSpacing: 0.5 }) + 0.2;
    slide.addText(m.label, { isTextBox: true, shape: "roundRect", rectRadius: 0.12, x: mx - tw / 2, y: my, w: tw, h: 0.24, fill: { color: hex("roseDark") }, line: { type: "none" }, fontSize: 9, bold: true, charSpacing: 0.5, color: col("paper"), align: "center", valign: "middle", margin: 0, objectName: nm(slide, "Gantt marker label") });
  });

  // Rows
  const lSize = rows.every((r) => fitText(r.label, { w: labelW, h: rowH, max: 12, min: 12, bold: !!r.heading, maxLines: 2 }).fits) ? 12 : 11;
  rows.forEach((r, i) => {
    const ry = rowsTop + i * rowH;
    if (i > 0) addLine(slide, { x, y: ry, w, color: "line", width: 0.5, name: "Gantt row rule" });
    if (r.heading) {
      addTB(slide, String(r.label).toUpperCase(), { x, y: ry, w: labelW, h: rowH, fontSize: 10, bold: true, charSpacing: 1, color: hex("roseDark"), valign: "middle", objectName: nm(slide, "Gantt heading") });
    } else {
      if (!fitText(r.label, { w: labelW, h: rowH, max: lSize, min: lSize, maxLines: 2 }).fits) warn(`Gantt row "${trunc(r.label)}"`, "label longer than 2 lines");
      addTB(slide, r.label, { x, y: ry, w: labelW, h: rowH, fontSize: lSize, color: col("ink"), valign: "middle", objectName: nm(slide, "Gantt row label") });
    }
    const bh = rowH * 0.58;
    const by = ry + (rowH - bh) / 2;
    (r.bars || []).forEach((b) => {
      const bx = X(b.start) + 0.03;
      const bw = (b.end - b.start) * colW - 0.06;
      const tone = col(TONES[b.tone || "primary"] || b.tone);
      const fillHex = hex(TONES[b.tone || "primary"] || b.tone);
      slide.addShape("roundRect", { x: bx, y: by, w: bw, h: bh, rectRadius: bh / 2, fill: { color: tone }, line: { type: "none" }, objectName: nm(slide, "Gantt bar") });
      if (b.label) {
        const size = 10;
        const tw = textWidth(b.label, { bold: true, size });
        if (tw + 0.2 <= bw) {
          addTB(slide, b.label, { x: bx, y: by, w: bw, h: bh, fontSize: size, bold: true, color: textOn(fillHex), align: "center", valign: "middle", objectName: nm(slide, "Gantt bar label") });
        } else if (X(b.end) + 0.08 + tw <= x + w) {
          addTB(slide, b.label, { x: X(b.end) + 0.06, y: by, w: tw + 0.08, h: bh, fontSize: size, color: col("ink"), valign: "middle", objectName: nm(slide, "Gantt bar label") });
        } else warn(`Gantt bar "${trunc(b.label)}"`, "label fits neither inside nor after the bar");
      }
    });
    (r.milestones || []).forEach((m) => {
      const md = Math.min(0.24, rowH * 0.5);
      const mx = X(m.at);
      slide.addShape("diamond", { x: mx - md / 2, y: ry + (rowH - md) / 2, w: md, h: md, fill: { color: col("rose") }, line: { color: col("paper"), width: 1 }, objectName: nm(slide, "Gantt milestone") });
      if (m.label) {
        const tw = textWidth(m.label, { size: 10 });
        addTB(slide, m.label, { x: mx + md / 2 + 0.05, y: ry, w: tw + 0.1, h: rowH, fontSize: 10, color: col("ink"), valign: "middle", objectName: nm(slide, "Gantt milestone label") });
      }
    });
  });
  addLine(slide, { x, y: gridBottom, w, color: "lineStrong", width: 1, name: "Gantt bottom rule" });
}

// =============================================================================================
// What we found / so what
// =============================================================================================

/**
 * Paired rows: finding (left, with evidence badge) -> implication (right, tinted).
 * @param {object} o { x,y,w,h, leftHeader, rightHeader, rows:[{finding, badge, soWhat, soWhatBadge}] }
 */
function addFindingsSoWhat(slide, o) {
  const { x, y, w, h } = box(o);
  const rows = o.rows;
  const n = rows.length;
  const arrowW = 0.6;
  const colW = (w - arrowW) / 2;
  const headerH = 0.32;
  const gap = 0.12;
  const rowH = (h - headerH - gap * (n - 1)) / n;
  const pad = 0.14;
  const padX = 0.18;
  const badgeH = 0.24;
  const badgeGap = 0.07;
  const textW = colW - 2 * padX;

  const hdr = (t, hx) => addTB(slide, String(t).toUpperCase(), { x: hx, y, w: colW, h: 0.26, fontSize: 11, bold: true, charSpacing: 1.5, color: hex("roseDark"), valign: "middle", objectName: nm(slide, "Findings header") });
  hdr(o.leftHeader || "What we found", x);
  hdr(o.rightHeader || "So what", x + colW + arrowW);

  // One text size for every cell: the largest at which all findings and implications fit.
  const avail = (b) => rowH - 2 * pad - (b ? badgeH + badgeGap : 0);
  const fits = (r, s) => fitText(r.finding, { w: textW, h: avail(r.badge), max: s, min: s }).fits &&
    fitText(r.soWhat, { w: textW, h: avail(r.soWhatBadge), max: s, min: s }).fits;
  let size = TYPE.body.size;
  while (size > TYPE.body.min && !rows.every((r) => fits(r, size))) size -= 0.5;
  rows.forEach((r) => {
    if (!fitText(r.finding, { w: textW, h: avail(r.badge), max: size, min: size }).fits) warn(`Finding "${trunc(r.finding)}"`, "overflows its cell; shorten it or use fewer rows");
    if (!fitText(r.soWhat, { w: textW, h: avail(r.soWhatBadge), max: size, min: size }).fits) warn(`So-what "${trunc(r.soWhat)}"`, "overflows its cell; shorten it or use fewer rows");
  });

  // Badge + text as one group, centred vertically in its cell.
  const cell = (cx, ry, text, badge, color, name) => {
    const th = fitText(text, { w: textW, h: 99, max: size, min: size }).height;
    const group = th + (badge ? badgeH + badgeGap : 0);
    let ty = ry + Math.max(pad, (rowH - group) / 2);
    if (badge) {
      addBadge(slide, { type: badge, x: cx + padX, y: ty });
      ty += badgeH + badgeGap;
    }
    addTB(slide, text, { x: cx + padX, y: ty, w: textW, h: th + 0.04, fontSize: size, color, objectName: nm(slide, name) });
  };

  rows.forEach((r, i) => {
    const ry = y + headerH + i * (rowH + gap);
    addCard(slide, { x, y: ry, w: colW, h: rowH, name: "Finding card" });
    cell(x, ry, r.finding, r.badge, col("ink"), "Finding text");
    slide.addShape("chevron", { x: x + colW + arrowW / 2 - 0.1, y: ry + rowH / 2 - 0.15, w: 0.2, h: 0.3, fill: { color: col("rose") }, line: { type: "none" }, objectName: nm(slide, "Findings arrow") });
    const rx = x + colW + arrowW;
    addCard(slide, { x: rx, y: ry, w: colW, h: rowH, fill: "plumTint", line: null, name: "So-what card" });
    cell(rx, ry, r.soWhat, r.soWhatBadge, col("aubergine"), "So-what text");
  });
}

// =============================================================================================
// Founder decisions (numbered list)
// =============================================================================================

/**
 * Numbered decisions in one or two white cards: rose disc, decision, detail, and "decide by" / owner.
 * @param {object} o { x,y,w,h, decisions:[{title, detail, by, owner}], columns, byLabel }
 */
function addDecisionList(slide, o) {
  const { x, y, w, h } = box(o);
  const items = o.decisions;
  const cols = o.columns || (items.length > 5 ? 2 : 1);
  const colGap = GRID.gap;
  const colW = (w - colGap * (cols - 1)) / cols;
  const perCol = Math.ceil(items.length / cols);
  const pad = 0.2;
  const rowH = (h - 2 * pad) / perCol;
  const disc = Math.min(0.5, rowH * 0.62);
  const hasMeta = items.some((d) => d.by || d.owner);
  const metaW = hasMeta ? 1.55 : 0;
  const textX = pad + disc + 0.2;
  const textW = colW - textX - pad - (hasMeta ? metaW + 0.15 : 0);

  let size = 13;
  const paras = (d) => [{ text: d.title, bold: true, sizeDelta: 1 }, ...(d.detail ? [{ text: d.detail, sizeDelta: -1 }] : [])];
  for (; size > 11; size -= 0.5) if (items.every((d) => fitParagraphs(paras(d), { w: textW, h: rowH - 0.16, max: size, min: size, paraGap: 2 }).fits)) break;
  items.forEach((d) => {
    if (!fitParagraphs(paras(d), { w: textW, h: rowH - 0.16, max: size, min: size, paraGap: 2 }).fits) warn(`Decision "${trunc(d.title)}"`, "overflows its row; shorten the detail");
  });

  for (let c = 0; c < cols; c++) {
    const cx = x + c * (colW + colGap);
    const colItems = items.slice(c * perCol, (c + 1) * perCol);
    if (!colItems.length) continue;
    addCard(slide, { x: cx, y, w: colW, h, name: "Decision card" });
    colItems.forEach((d, k) => {
      const idx = c * perCol + k + 1;
      const ry = y + pad + k * rowH;
      if (k > 0) addLine(slide, { x: cx + pad, y: ry, w: colW - 2 * pad, color: "line", width: 0.75, name: "Decision rule" });
      slide.addText(headRuns(String(idx), { fontSize: 18, bold: true, color: col("paper") }), {
        isTextBox: true, shape: "ellipse", x: cx + pad, y: ry + (rowH - disc) / 2, w: disc, h: disc,
        fill: { color: col("rose") }, line: { type: "none" }, align: "center", valign: "middle", margin: 0, objectName: nm(slide, "Decision number"),
      });
      const runs = [{ text: d.title, options: { bold: true, fontSize: size + 1, color: col("ink"), breakLine: !!d.detail, paraSpaceAfter: 2 } }];
      if (d.detail) runs.push({ text: d.detail, options: { fontSize: size - 1, color: col("muted") } });
      addTB(slide, runs, { x: cx + textX, y: ry + 0.08, w: textW, h: rowH - 0.16, valign: "middle", objectName: nm(slide, "Decision text") });
      if (hasMeta) {
        const meta = [];
        if (d.by) {
          meta.push({ text: (o.byLabel || "Decide by").toUpperCase(), options: { fontSize: 9, bold: true, charSpacing: 1, color: col("muted"), breakLine: true } });
          meta.push({ text: d.by, options: { fontSize: 12, bold: true, color: col("aubergine"), breakLine: !!d.owner } });
        }
        if (d.owner) meta.push({ text: d.owner, options: { fontSize: 10, color: col("muted") } });
        addTB(slide, meta, { x: cx + colW - pad - metaW, y: ry + 0.08, w: metaW, h: rowH - 0.16, valign: "middle", objectName: nm(slide, "Decision meta") });
      }
    });
  }
}

// =============================================================================================
// Tables (appendix) with automatic font sizing and pagination
// =============================================================================================

const CELL_MARGIN = [0.05, 0.1, 0.05, 0.1]; // inches: top, right, bottom, left

function cellText(c) {
  return c && typeof c === "object" ? String(c.text === undefined ? "" : c.text) : String(c === undefined || c === null ? "" : c);
}

function tableGeometry(columns, rows, w, size) {
  const weights = columns.map((c) => c.w || 1);
  const sum = weights.reduce((a, b) => a + b, 0);
  const colW = weights.map((k) => (k / sum) * w);
  const lh = lineHeight(size, "Calibri");
  const cellH = (text, i, bold) => {
    const lines = fitText(text, { w: colW[i] - CELL_MARGIN[1] - CELL_MARGIN[3], h: 99, max: size, min: size, bold }).lines.length;
    return lines * lh + CELL_MARGIN[0] + CELL_MARGIN[2] + 0.04;
  };
  const headerH = Math.max(...columns.map((c, i) => cellH(c.header, i, true)));
  const rowHs = rows.map((r) => Math.max(...columns.map((c, i) => cellH(cellText(r[i]), i, !!(c.bold || (r[i] && r[i].bold))))));
  return { colW, headerH, rowHs };
}

/**
 * Table at a fixed box, largest font in [min, max] that fits. Returns {fits, size, height}.
 * columns: [{header, w (relative), align:"left"|"right"|"center", bold}]; rows: [[cell]] where a cell is a
 * string or {text, bold, color, fill, tag:"estimate"|...}. Option zebra (default true), headerFill.
 */
function addTable(slide, o) {
  const { x, y, w, h } = box(o);
  const max = o.max || 12;
  const min = o.min || 10;
  let size = max;
  let g;
  for (; size >= min; size -= 0.5) {
    g = tableGeometry(o.columns, o.rows, w, size);
    if (g.headerH + g.rowHs.reduce((a, b) => a + b, 0) <= h) break;
  }
  if (size < min) {
    size = min;
    g = tableGeometry(o.columns, o.rows, w, size);
  }
  const height = g.headerH + g.rowHs.reduce((a, b) => a + b, 0);
  const fits = height <= h + 1e-6;
  if (!fits && !o.quiet) warn(`Table "${trunc(o.columns.map((c) => c.header).join(" | "))}"`, `needs ${height.toFixed(2)}" at ${min} pt but has ${h.toFixed(2)}"; split it`);

  const border = (bottomColor) => [{ type: "none" }, { type: "none" }, { type: "solid", pt: 0.5, color: bottomColor }, { type: "none" }];
  const header = o.columns.map((c) => ({
    text: c.header,
    options: { bold: true, color: HEX.paper, fill: { color: o.headerFill ? hex(o.headerFill) : HEX.aubergine }, align: c.align || "left", valign: "bottom", border: border(HEX.aubergine) },
  }));
  const body = o.rows.map((r, ri) =>
    o.columns.map((c, ci) => {
      const cell = r[ci];
      const obj = cell && typeof cell === "object" ? cell : {};
      const zebra = o.zebra !== false && ri % 2 === 1;
      const fill = obj.fill ? hex(obj.fill) : zebra ? HEX.sand : HEX.paper;
      let text = cellText(cell);
      if (obj.tag) {
        const b = BADGES[badgeKey(obj.tag)];
        text = [
          { text: `${text} `, options: {} },
          { text: b.label, options: { bold: true, fontSize: Math.max(TYPE.footer, size - 2), color: hex(b.fill === "paper" || /Tint$/.test(b.fill) ? b.text : b.fill) } },
        ];
      }
      return {
        text,
        options: { bold: !!(c.bold || obj.bold), color: obj.color ? hex(obj.color) : HEX.ink, fill: { color: fill }, align: obj.align || c.align || "left", valign: "top", border: border(HEX.line) },
      };
    }),
  );
  slide.addTable([header, ...body], {
    x, y, w, colW: g.colW, rowH: [g.headerH, ...g.rowHs], fontSize: size, margin: CELL_MARGIN, autoPage: false,
    objectName: nm(slide, o.name || "Table"),
  });
  return { fits, size, height };
}

// =============================================================================================
// Deck builder: layouts, sections, cover, dividers, content slides, write + theme
// =============================================================================================

function loadApplyTheme() {
  // apply_theme.js finds pptxgenjs/jszip via NODE_PATH; point it at this folder's node_modules.
  const nmDir = path.join(__dirname, "node_modules");
  const parts = (process.env.NODE_PATH || "").split(path.delimiter).filter(Boolean);
  if (!parts.includes(nmDir)) {
    process.env.NODE_PATH = [nmDir, ...parts].join(path.delimiter);
    require("module").Module._initPaths();
  }
  const skillDir = process.env.PPTX_SKILL_DIR || "/mnt/skills/public/pptx";
  return require(path.join(skillDir, "scripts", "apply_theme.js")).applyTheme;
}

// pptxgenjs gives the title placeholder idx="101". PowerPoint matches titles by type, but other
// readers (python-pptx, markitdown, some screen-reader exports) look for the conventional
// idx-less <p:ph type="title"/>. Rewrite it that way in layouts and slides.
async function normaliseTitlePlaceholders(file) {
  const fs = require("fs");
  const JSZip = require(require.resolve("jszip", { paths: [require.resolve("pptxgenjs")] }));
  const zip = await JSZip.loadAsync(fs.readFileSync(file));
  const parts = Object.keys(zip.files).filter((n) => /^ppt\/(slides|slideLayouts)\/[^/]+\.xml$/.test(n));
  for (const n of parts) {
    const xml = await zip.file(n).async("string");
    const out = xml.replace(/<p:ph\s+idx="\d+"\s+type="title"/g, '<p:ph type="title"');
    if (out !== xml) zip.file(n, out);
  }
  fs.writeFileSync(file, await zip.generateAsync({ type: "nodebuffer", compression: "DEFLATE" }));
}

function xmlAmp(s) {
  return String(s || "").replace(/&(?!amp;|lt;|gt;|quot;|apos;)/g, "&amp;");
}

/**
 * createDeck({ title, subject, author, company }) -> deck
 *   deck.section(title)                      start a section (required before the first slide)
 *   deck.cover({ title, subtitle, meta })    dark cover slide
 *   deck.sectionDivider({ number, title, subtitle, section })  starts a section and adds a divider
 *   deck.contentSlide({ kicker, title, subtitle, source, note, notes }) -> slide with title + footer
 *   deck.slide(kind)                         bare slide on a layout ("content" | "section" | "cover")
 *   deck.appendixTable({ kicker, title, subtitle, columns, rows, source, note, max, min }) -> slides[]
 *   await deck.write(file)                   write, apply theme colours, print fit warnings
 */
function createDeck(meta = {}) {
  const pres = new pptxgen();
  pres.layout = "LAYOUT_WIDE";
  pres.theme = { headFontFace: THEME.headFontFace, bodyFontFace: THEME.bodyFontFace };
  pres.title = meta.title || BRAND.name;
  pres.subject = meta.subject || "";
  pres.author = meta.author || BRAND.name;
  pres.company = xmlAmp(meta.company || BRAND.name);
  defineLayouts(pres);
  let current = null;

  const deck = {
    pres,
    section(title) {
      pres.addSection({ title });
      current = title;
      return deck;
    },
    slide(kind = "content") {
      if (!current) throw new Error("Call deck.section(title) before adding the first slide");
      const s = pres.addSlide({ masterName: LAYOUT[kind], sectionTitle: current });
      s._pnaKind = kind;
      return s;
    },
    cover({ title, subtitle, meta: m, notes } = {}) {
      const s = deck.slide("cover");
      const f = fitText(title, { font: "Cambria", w: 8.4, h: 2.2, max: TYPE.cover.size, min: TYPE.cover.min, maxLines: 3 });
      if (!f.fits) warn(`Cover title "${trunc(title)}"`, "too long");
      s.addText(headRuns(title, { fontSize: f.size, color: col("paper") }), { placeholder: "title", objectName: "Title" });
      if (subtitle) s.addText([{ text: subtitle, options: { color: hex("roseLight"), fontSize: 18 } }], { placeholder: "subtitle", objectName: "Subtitle" });
      if (m) s.addText([{ text: m, options: { color: hex("onDarkMuted"), fontSize: 12 } }], { placeholder: "meta", objectName: "Cover meta" });
      if (notes) s.addNotes(notes);
      return s;
    },
    sectionDivider({ number, title, subtitle, section, notes } = {}) {
      deck.section(section || title);
      const s = deck.slide("section");
      if (number !== undefined) s.addText(headRuns(String(number).padStart(2, "0"), { fontSize: 54, color: hex("roseLight") }), { placeholder: "sectionNum", objectName: "Section number" });
      const f = fitText(title, { font: "Cambria", w: 8.2, h: 1.5, max: TYPE.divider.size, min: TYPE.divider.min, maxLines: 2, stable: true });
      if (!f.fits) warn(`Divider title "${trunc(title)}"`, "too long");
      s.addText(headRuns(title, { fontSize: f.size, color: col("paper") }), { placeholder: "title", objectName: "Title" });
      if (subtitle) {
        const fs = fitText(subtitle, { w: 7.6, h: 1.0, max: 16, min: 13, maxLines: 3 });
        if (!fs.fits) warn(`Divider subtitle "${trunc(subtitle)}"`, "too long");
        const sy = 3.2 + f.lines.length * lineHeight(f.size, "Cambria") + 0.25;
        addTB(s, subtitle, { x: GRID.ML, y: sy, w: 7.6, h: fs.height + 0.05, fontSize: fs.size, color: hex("onDarkMuted"), objectName: "Subtitle" });
      }
      if (notes) s.addNotes(notes);
      return s;
    },
    contentSlide({ kicker, title, subtitle, source, note, notes } = {}) {
      const s = deck.slide("content");
      addTitle(s, { kicker, title, subtitle });
      addFooter(s, { source, note });
      if (notes) s.addNotes(notes);
      return s;
    },
    appendixTable(o) {
      const area = { x: GRID.ML, y: GRID.top, w: GRID.CW, h: GRID.contentH };
      const min = o.min || 10;
      const max = o.max || 12;
      // Split rows into pages whose heights fit the area at font size s (greedy, then balanced).
      const paginate = (s) => {
        const g = tableGeometry(o.columns, o.rows, area.w, s);
        const room = area.h - g.headerH;
        let count = 1;
        let used = 0;
        g.rowHs.forEach((rh) => {
          if (used && used + rh > room) {
            count += 1;
            used = 0;
          }
          used += rh;
        });
        // Balance: aim for equal page heights so the last page is not a stub.
        const total = g.rowHs.reduce((a, b) => a + b, 0);
        const target = total / count;
        const pages = [];
        let cur = [];
        used = 0;
        g.rowHs.forEach((rh, i) => {
          const pagesLeft = count - pages.length;
          if (cur.length && pagesLeft > 1 && (used + rh > room || used + rh / 2 > target)) {
            pages.push(cur);
            cur = [];
            used = 0;
          }
          cur.push(o.rows[i]);
          used += rh;
        });
        pages.push(cur);
        const ok = pages.every((rows) => {
          const gg = tableGeometry(o.columns, rows, area.w, s);
          return gg.headerH + gg.rowHs.reduce((a, b) => a + b, 0) <= area.h + 1e-6;
        });
        return { pages, ok };
      };
      // Fewest pages possible at the floor size, then the largest size that keeps that page count.
      const floor = paginate(min);
      let chosen = { size: min, pages: floor.pages };
      for (let s = max; s > min; s -= 0.5) {
        const p = paginate(s);
        if (p.ok && p.pages.length <= floor.pages.length) {
          chosen = { size: s, pages: p.pages };
          break;
        }
      }
      const total = chosen.pages.length;
      return chosen.pages.map((rows, p) => {
        const title = total > 1 && p > 0 ? `${o.title}, continued (${p + 1} of ${total})` : o.title;
        const s = deck.contentSlide({ kicker: o.kicker, title, subtitle: p === 0 ? o.subtitle : undefined, source: o.source, note: o.note });
        addTable(s, { ...area, columns: o.columns, rows, max: chosen.size, min: chosen.size, zebra: o.zebra, name: "Appendix table" });
        return s;
      });
    },
    async write(file) {
      await pres.writeFile({ fileName: file });
      const applyTheme = loadApplyTheme();
      await applyTheme(file, THEME);
      await normaliseTitlePlaceholders(file);
      if (LOG.length) {
        console.warn(`\nText-fit warnings (${LOG.length}):`);
        LOG.forEach((l) => console.warn(`  - ${l}`));
      } else console.log("Text fit: all components fit at or above their floor sizes.");
      return file;
    },
  };
  return deck;
}

const C = {
  addTitle,
  addFooter,
  addBadge,
  badgeSize,
  addBadgeLegend,
  addStatusChip,
  addCard,
  addTextBlock,
  addKpiTile,
  addKpiRow,
  addBarChart,
  addScenarioChart,
  addMarketTree,
  addFunnel,
  addScorecard,
  addGateTimeline,
  addGantt,
  addFindingsSoWhat,
  addDecisionList,
  addTable,
};

module.exports = { createDeck, C, ...C, BADGES, STATUS, headRuns, mix, textOn, contrast, LOG };
