// theme.js: design system for the Priyanka Nanda Makeup Academy (PNA) growth-strategy deck.
//
// One place for colour, type, grid and slide layouts. components.js reads everything from here,
// so a palette or type change is made once. See README.md for the spec and usage.
//
// Structure follows the pptx skill's "structured deck" pattern:
//   THEME (12 scheme colours + two fonts) -> layouts with named placeholders -> sections -> applyTheme().

"use strict";

// ---------------------------------------------------------------------------------------------
// 1. Theme: written into ppt/theme/theme1.xml by applyTheme() after writeFile().
//    Fonts: Cambria (headings) + Calibri (body). Both ship with Office and have metric-compatible
//    twins in LibreOffice (Caladea, Carlito), so QA renders show true line breaks and overflow.
// ---------------------------------------------------------------------------------------------
const THEME = {
  name: "PNA Aubergine",
  headFontFace: "Cambria",
  bodyFontFace: "Calibri",
  colors: {
    dk1: "2B2129", //  Ink: body text
    lt1: "FFFFFF", //  Paper: cards, chart panels
    dk2: "3D1A33", //  Aubergine: dominant brand colour (titles, dark slides)
    lt2: "F8F4F1", //  Porcelain: warm-neutral slide background
    accent1: "5E2B52", // Plum: primary data colour
    accent2: "C2705C", // Rose gold: the one sharp accent (highlights, gate markers, numbers)
    accent3: "9C8794", // Mauve: muted secondary (comparators, conservative case)
    accent4: "2D6A5B", // Evidence green (VERIFIED)
    accent5: "98600F", // Evidence amber (ESTIMATE)
    accent6: "3F5873", // Evidence slate (HYPOTHESIS)
    hlink: "A4513F",
    folHlink: "6B5F67",
  },
};

// ---------------------------------------------------------------------------------------------
// 2. Colour tokens. HEX is the source of truth. SCHEME maps tokens that have a theme slot to the
//    scheme-colour name, so shapes and text follow a later theme change in PowerPoint.
//    Use col(token) for shapes/text; use hex(token) where pptxgenjs only accepts hex
//    (all chart colours, gridlines, shadows).
// ---------------------------------------------------------------------------------------------
const HEX = {
  // Core
  ink: "2B2129",
  muted: "6B5F67", //       secondary text; 5.5:1 on porcelain
  paper: "FFFFFF",
  porcelain: "F8F4F1",
  sand: "F1EAE5", //        zebra rows, quiet panels on white
  line: "E4DAD5", //        hairlines, card borders
  lineStrong: "C9BCB5", //  axis lines, timeline spine
  aubergine: "3D1A33",
  plum: "5E2B52",
  plumTint: "F2EAF0", //    "so what" panels, recommended rows
  rose: "C2705C", //        accent for shapes (3.6:1 on white: graphics only, never small text)
  roseDark: "A4513F", //    accent for text (5.5:1 on white)
  roseLight: "E7A995", //   accent text on aubergine (7.5:1)
  roseTint: "F7E7E1",
  mauve: "9C8794",
  mauveTint: "EEE7EB",
  // Evidence
  green: "2D6A5B",
  greenTint: "E2EFEA",
  amber: "98600F",
  amberDark: "7A4B0C",
  amberTint: "F8EBD4",
  slate: "3F5873",
  slateTint: "E7ECF2",
  // On dark backgrounds
  onDark: "FFFFFF",
  onDarkMuted: "D9C9D3", // 9.6:1 on aubergine
};

const SCHEME = {
  ink: "tx1",
  paper: "bg1",
  aubergine: "tx2",
  porcelain: "bg2",
  plum: "accent1",
  rose: "accent2",
  mauve: "accent3",
  green: "accent4",
  amber: "accent5",
  slate: "accent6",
};

function hex(token) {
  if (HEX[token]) return HEX[token];
  if (/^[0-9A-Fa-f]{6}$/.test(token)) return token.toUpperCase();
  throw new Error(`Unknown colour token "${token}"`);
}
function col(token) {
  if (SCHEME[token]) return SCHEME[token];
  return hex(token);
}

// Chart palettes (hex only: pptxgenjs writes chart colours as sRGB).
const CHART = {
  series: [HEX.plum, HEX.rose, HEX.mauve, HEX.aubergine, HEX.roseLight, HEX.lineStrong],
  single: HEX.plum,
  highlight: HEX.rose,
  dim: HEX.mauve,
  // Scenario roles: conservative = muted, planning/base = primary, upside = accent
  scenario: { conservative: HEX.mauve, planning: HEX.plum, base: HEX.plum, upside: HEX.rose, aggressive: HEX.rose },
  axisLine: HEX.lineStrong,
  grid: HEX.line,
  label: HEX.muted,
  value: HEX.ink,
  font: "+mn-lt", // theme body font (chart text is otherwise hard-coded Arial)
  labelSize: 11,
};

// Sequential scale (light -> dark) for scores, funnel stages and heat cells.
const SEQ = ["F2E8EC", "DCC3CF", "B48DA3", "7E4B6F", "3D1A33"];

// ---------------------------------------------------------------------------------------------
// 3. Type scale (points). Floors: body 10-11 pt, footers 9 pt.
// ---------------------------------------------------------------------------------------------
const TYPE = {
  head: THEME.headFontFace,
  body: THEME.bodyFontFace,
  cover: { size: 44, min: 34 },
  divider: { size: 40, min: 30 },
  title: { size: 28, min: 22 }, //  assertion title, max 2 lines
  subtitle: { size: 15, min: 12 },
  kicker: 11,
  h3: 14, //                        card and column headings
  body: { size: 14, min: 11 },
  small: { size: 12, min: 10 },
  label: 11, //                     chart labels, captions
  footer: 9,
  badge: 9,
  kpi: { size: 44, min: 26 },
  floor: { body: 10, footer: 9 },
};

// ---------------------------------------------------------------------------------------------
// 4. Grid (inches) for LAYOUT_WIDE 13.333 x 7.5.
// ---------------------------------------------------------------------------------------------
const GRID = {
  W: 13.333,
  H: 7.5,
  ML: 0.6,
  MR: 0.6,
  CW: 13.333 - 1.2, //  content width 12.133
  kickerY: 0.36,
  kickerH: 0.28,
  titleY: 0.68,
  titleH: 0.95, //       two lines at 28 pt
  top: 2.1, //           content top (same on every content slide)
  bottom: 6.72, //       content bottom
  footerY: 6.86,
  footerH: 0.42,
  gap: 0.3, //           standard gap between blocks
  gapSmall: 0.15,
  radius: 0.08, //       card corner radius
};
GRID.contentH = GRID.bottom - GRID.top;

// ---------------------------------------------------------------------------------------------
// 5. Brand strings used on layouts. "&" must be written "&amp;" in layout titles/company only.
// ---------------------------------------------------------------------------------------------
const BRAND = {
  name: "Priyanka Nanda Makeup Academy",
  short: "PNA",
  deckLabel: "PRIYANKA NANDA MAKEUP ACADEMY",
};

// ---------------------------------------------------------------------------------------------
// 6. Layouts. defineSlideMaster() creates slide *layouts* under one master.
// ---------------------------------------------------------------------------------------------
const LAYOUT = {
  cover: "PNA_COVER",
  section: "PNA_SECTION",
  content: "PNA_CONTENT",
};

// Compact-mirror motif: a large rose-gold ring and a soft disc bleeding off the right edge of
// dark slides. Echoed on light slides by circular gate nodes, numbered decision discs and pill badges.
function motifObjects(scale) {
  const s = scale || 1;
  return [
    { text: { text: "", options: { shape: "ellipse", x: 8.9 - (s - 1) * 1.6, y: 0.9 - (s - 1) * 1.2, w: 6.4 * s, h: 6.4 * s,
      fill: { color: hex("rose"), transparency: 88 }, line: { type: "none" }, objectName: "Motif disc" } } },
    { text: { text: "", options: { shape: "ellipse", x: 9.55 - (s - 1) * 1.6, y: 1.55 - (s - 1) * 1.2, w: 5.1 * s, h: 5.1 * s,
      fill: { type: "none" }, line: { color: hex("rose"), width: 1.25 }, objectName: "Motif ring" } } },
  ];
}

function defineLayouts(pres) {
  // Content: porcelain background, title placeholder, brand label, slide number.
  pres.defineSlideMaster({
    title: LAYOUT.content,
    background: { color: col("porcelain") },
    margin: [GRID.top, GRID.MR, GRID.H - GRID.bottom, GRID.ML], // used by auto-paged tables
    objects: [
      { text: { text: BRAND.deckLabel, options: {
        x: GRID.W - GRID.MR - 4.6, y: GRID.kickerY, w: 4.6, h: GRID.kickerH, margin: 0,
        fontSize: 9, bold: true, charSpacing: 1.5, color: col("muted"), align: "right", valign: "middle",
        objectName: "Brand label" } } },
      { placeholder: { options: {
        name: "title", type: "title", objectName: "Title", x: GRID.ML, y: GRID.titleY, w: GRID.CW, h: GRID.titleH,
        fontSize: TYPE.title.size, color: col("aubergine"), valign: "top", align: "left", margin: 0 },
        text: "" } },
    ],
    slideNumber: { x: GRID.W - GRID.MR - 0.6, y: GRID.footerY + GRID.footerH - 0.26, w: 0.6, h: 0.26,
      fontSize: TYPE.footer, color: col("muted"), align: "right", valign: "bottom", margin: 0 },
  });

  // Section divider: aubergine, big numeral, title (subtitle is added under it by the deck builder).
  pres.defineSlideMaster({
    title: LAYOUT.section,
    background: { color: col("aubergine") },
    objects: [
      ...motifObjects(1),
      { text: { text: BRAND.deckLabel, options: {
        x: GRID.ML, y: 0.5, w: 6, h: 0.3, margin: 0, fontSize: 10, bold: true, charSpacing: 2,
        color: hex("roseLight"), valign: "middle", objectName: "Brand label" } } },
      { placeholder: { options: {
        name: "sectionNum", type: "body", objectName: "Section number", x: GRID.ML, y: 2.05, w: 3, h: 1.0, margin: 0,
        fontFace: TYPE.head, fontSize: 54, color: hex("roseLight"), valign: "bottom", align: "left" },
        text: "" } },
      { placeholder: { options: {
        name: "title", type: "title", objectName: "Title", x: GRID.ML, y: 3.2, w: 8.2, h: 1.5, margin: 0,
        fontSize: TYPE.divider.size, color: col("paper"), valign: "top", align: "left" },
        text: "" } },
      // The divider subtitle is a text box placed under the title's last line (components.sectionDivider).
    ],
    slideNumber: { x: GRID.W - GRID.MR - 0.6, y: GRID.footerY + GRID.footerH - 0.26, w: 0.6, h: 0.26,
      fontSize: TYPE.footer, color: hex("onDarkMuted"), align: "right", valign: "bottom", margin: 0 },
  });

  // Cover: aubergine, larger motif, title, subtitle, meta line. No slide number.
  pres.defineSlideMaster({
    title: LAYOUT.cover,
    background: { color: col("aubergine") },
    objects: [
      ...motifObjects(1.12),
      { text: { text: BRAND.deckLabel, options: {
        x: GRID.ML, y: 0.6, w: 7, h: 0.32, margin: 0, fontSize: 11, bold: true, charSpacing: 2.5,
        color: hex("roseLight"), valign: "middle", objectName: "Brand label" } } },
      { placeholder: { options: {
        name: "title", type: "title", objectName: "Title", x: GRID.ML, y: 2.0, w: 8.4, h: 2.2, margin: 0,
        fontSize: TYPE.cover.size, color: col("paper"), valign: "bottom", align: "left" },
        text: "" } },
      { placeholder: { options: {
        name: "subtitle", type: "body", objectName: "Subtitle", x: GRID.ML, y: 4.4, w: 7.8, h: 0.9, margin: 0,
        fontSize: 18, color: hex("roseLight"), valign: "top", align: "left" },
        text: "" } },
      { placeholder: { options: {
        name: "meta", type: "body", objectName: "Cover meta", x: GRID.ML, y: 6.2, w: 7.8, h: 0.6, margin: 0,
        fontSize: 12, color: hex("onDarkMuted"), valign: "bottom", align: "left" },
        text: "" } },
    ],
  });
}

module.exports = { THEME, HEX, SCHEME, hex, col, CHART, SEQ, TYPE, GRID, BRAND, LAYOUT, defineLayouts };
