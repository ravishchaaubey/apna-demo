// demo_build.js: one slide per component, filled with obviously-placeholder data.
// Output: _component_demo.pptx (next to this file). Used for visual QA of the design system only;
// none of these numbers are PNA figures.
//
//   node demo_build.js

"use strict";

const path = require("path");
const { createDeck, C } = require("./components.js");
const { HEX, GRID, TYPE } = require("./theme.js");

const OUT = path.join(__dirname, "_component_demo.pptx");
const SRC = "Lorem source register (placeholder), table 9; dummy data for layout testing only";

async function main() {
  const deck = createDeck({ title: "Component demo (placeholder data)", subject: "PNA design system QA" });

  // ---- Cover ---------------------------------------------------------------------------------
  deck.section("Cover");
  deck.cover({
    title: "Lorem ipsum growth strategy for a placeholder academy",
    subtitle: "Component library demo with dummy data only",
    meta: "Placeholder meta line · Prepared for layout QA · Lorem 2026",
  });

  // ---- Design system ---------------------------------------------------------------------------
  deck.sectionDivider({ number: 1, title: "Design system and evidence badges", subtitle: "Section divider: numeral, title and a short lorem subtitle that can wrap onto a second line" });

  {
    const s = deck.contentSlide({
      kicker: "Design system",
      title: "Lorem assertion title states the slide's single message in one or two lines",
      subtitle: "Subtitle: optional supporting sentence in 15 pt muted body text",
      source: SRC,
      note: "Footer is 9 pt, left-aligned and bottom-anchored beside the slide number.",
    });
    // Palette swatches (demo-only helper)
    const sw = [
      ["Aubergine", "aubergine", "Dominant: titles, dark slides"],
      ["Plum", "plum", "Primary data colour"],
      ["Rose gold", "rose", "Sharp accent"],
      ["Mauve", "mauve", "Muted secondary"],
      ["Porcelain", "porcelain", "Slide background"],
      ["Ink", "ink", "Body text"],
    ];
    const x0 = GRID.ML;
    const y0 = GRID.top;
    const cw = 1.9;
    sw.forEach(([name, tok, role], i) => {
      const x = x0 + i * (cw + 0.146);
      s.addShape("roundRect", { x, y: y0, w: cw, h: 0.9, rectRadius: 0.08, fill: { color: HEX[tok] }, line: { color: HEX.line, width: 0.75 }, objectName: `Swatch ${name}` });
      s.addText([
        { text: name, options: { bold: true, fontSize: 12, color: HEX.ink, breakLine: true } },
        { text: `#${HEX[tok]}`, options: { fontSize: 11, color: HEX.muted, breakLine: true } },
        { text: role, options: { fontSize: 11, color: HEX.muted } },
      ], { isTextBox: true, x, y: y0 + 1.0, w: cw, h: 0.75, margin: 0, valign: "top", objectName: `Swatch label ${name}` });
    });
    // Type scale
    C.addTextBlock(s, {
      x: GRID.ML, y: 4.05, w: 6.2, h: 2.55, card: true,
      heading: "Typography: Cambria headings, Calibri body",
      bullets: [
        `Assertion title ${TYPE.title.size} pt (floor ${TYPE.title.min}), two lines maximum`,
        `Body ${TYPE.body.size} pt (floor ${TYPE.body.min}); tables and dense cells floor 10 pt`,
        "Chart labels 11 pt in the theme body font; footers and badges 9 pt",
        "Rupee sign set in the body font so it renders identically everywhere: ₹66.5L",
      ],
    });
    // Evidence badges
    s.addShape("roundRect", { x: 7.1, y: 4.05, w: 5.633, h: 2.55, rectRadius: 0.08, fill: { color: HEX.paper }, line: { color: HEX.line, width: 0.75 }, objectName: "Badge card" });
    s.addText("Evidence badges", { isTextBox: true, x: 7.32, y: 4.27, w: 5, h: 0.3, margin: 0, fontSize: 15, bold: true, color: HEX.aubergine, objectName: "Badge heading" });
    const rows = [
      ["verified", "Sourced fact, checked"],
      ["estimate", "Our modelled number"],
      ["hypothesis", "To be tested (dashed = uncertain)"],
      ["recommendation", "Our advice"],
      ["founder", "Stated by the founder, unverified"],
    ];
    rows.forEach(([t, d], i) => {
      const y = 4.72 + i * 0.36;
      C.addBadge(s, { type: t, x: 7.32, y, w: 1.75 });
      s.addText(d, { isTextBox: true, x: 9.22, y, w: 3.4, h: 0.24, margin: 0, fontSize: 11, color: HEX.ink, valign: "middle", objectName: `Badge meaning ${i + 1}` });
    });
  }

  // ---- Components ------------------------------------------------------------------------------
  deck.sectionDivider({ number: 2, title: "Data components", subtitle: "KPI tiles, native charts, sizing tree and funnel" });

  {
    const s = deck.contentSlide({ kicker: "KPI tiles", title: "Lorem headline metrics sit in a row of equal tiles that share one number size", source: SRC });
    C.addKpiRow(s, {
      y: GRID.top, h: 2.25,
      items: [
        { label: "Lorem metric 12", prefix: "₹", value: "66.5", unit: "L", period: "Year 1 · Lorem 2026–2027", badge: "estimate", emphasis: true },
        { label: "Ipsum enrolments", value: "91", unit: "students", period: "Year 1 · placeholder", badge: "estimate", note: "Dolor case: 33" },
        { label: "Dolor share of market", value: "7", unit: "%", period: "Lorem base year", badge: "hypothesis" },
        { label: "Sit amet market size", prefix: "₹", value: "3.27", unit: "cr", period: "Annual, placeholder region", badge: "verified" },
      ],
    });
    C.addKpiRow(s, {
      y: GRID.top + 2.25 + GRID.gap, h: 2.05,
      items: [
        { label: "Consectetur peak cash need", prefix: "₹", value: "25.6", unit: "L", period: "Months 1–12 · lorem", badge: "estimate" },
        { label: "Adipiscing response time", value: "≤5", unit: "min", period: "Median first reply target", badge: "recommendation" },
        { label: "Elit price step", prefix: "₹", value: "75,000", period: "List fee after lorem gate", badge: "recommendation" },
      ],
    });
  }

  {
    const s = deck.contentSlide({ kicker: "Bar and column charts", title: "Lorem native charts carry data labels, quiet axes and one highlighted bar", source: SRC });
    C.addBarChart(s, {
      x: GRID.ML, w: 6.0, title: "Lorem revenue by year", unit: "₹ lakh, ex-GST (placeholder)", badge: "estimate",
      categories: ["Lorem Y1", "Ipsum Y2", "Dolor Y3", "Sit Y4"], series: [66.5, 115.8, 165.3, 182.0], highlight: 2, numberFormat: "#,##0.0",
    });
    C.addBarChart(s, {
      x: GRID.ML + 6.0 + GRID.gap, w: GRID.CW - 6.0 - GRID.gap, title: "Ipsum enquiries by channel", unit: "Share of leads, % (placeholder)",
      direction: "bar", categories: ["Lorem search", "Ipsum social", "Dolor referral", "Sit walk-in", "Amet other"], series: [34, 27, 18, 12, 9], highlight: 0, numberFormat: "0\"%\"",
    });
  }

  {
    const s = deck.contentSlide({ kicker: "Scenario chart", title: "Lorem scenarios use fixed colours: muted conservative, plum planning, rose upside", source: SRC, note: "Negative values plot below the axis; category labels stay at the bottom." });
    const cats = ["Lorem Y1", "Ipsum Y2", "Dolor Y3"];
    C.addScenarioChart(s, {
      x: GRID.ML, w: 7.0, title: "Lorem EBITDA by scenario", unit: "₹ lakh (placeholder)", badge: "estimate",
      categories: cats,
      scenarios: [
        { name: "Conservative", values: [-13.0, -7.2, -9.6] },
        { name: "Planning", values: [2.2, 13.7, 43.5] },
        { name: "Upside", values: [6.8, 21.0, 58.1] },
      ],
    });
    C.addScenarioChart(s, {
      x: GRID.ML + 7.0 + GRID.gap, w: GRID.CW - 7.0 - GRID.gap, type: "line", title: "Ipsum cumulative cash", unit: "₹ lakh (placeholder)",
      categories: ["M0", "M3", "M6", "M9", "M12"],
      scenarios: [
        { name: "Conservative", values: [0, -5.1, -9.8, -12.9, -14.9] },
        { name: "Planning", values: [0, -6.0, -11.0, -16.2, -8.4] },
        { name: "Upside", values: [0, -6.5, -9.0, -3.1, 6.2] },
      ],
    });
  }

  {
    const s = deck.contentSlide({ kicker: "Market sizing", title: "Lorem market narrows from a national pool to a reachable placeholder share", source: SRC });
    C.addMarketTree(s, {
      levels: [
        { code: "TAM", title: "Lorem national training market", value: "₹388 cr", range: "Range ₹80–1,373 cr", note: "Bottom-up build, no published figure (placeholder).", badge: "estimate" },
        { code: "SAM", title: "Ipsum serviceable market", value: "₹7.8 cr", range: "Range ₹2.3–24.2 cr", parts: [{ label: "Lorem city", value: "₹3.3 cr" }, { label: "Ipsum travellers", value: "₹2.1 cr" }, { label: "Dolor hybrid", value: "₹1.4 cr" }], badge: "estimate" },
        { code: "SOM", title: "Dolor obtainable revenue, Year 3", value: "₹1.88 cr", range: "Range ₹0.41–3.83 cr", note: "A gated plan, not a forecast.", badge: "recommendation" },
      ],
      links: [{ label: "2.0% of TAM", sub: "lorem filter" }, { label: "24% of SAM", sub: "ipsum share" }],
    });
  }

  {
    const s = deck.contentSlide({ kicker: "Funnel", title: "Lorem admissions funnel shows volume at each stage and conversion between them", source: SRC });
    C.addFunnel(s, {
      headers: { stage: "Stage", volume: "Volume, Year 1 (placeholder)", conversion: "Conversion" },
      stages: [
        { label: "Lorem impressions", sub: "Ipsum paid and organic", value: 120000 },
        { label: "Ipsum leads", sub: "Dolor form and WhatsApp", value: 4800 },
        { label: "Qualified leads", sub: "Sit amet criteria met", value: 1900 },
        { label: "Counselled", sub: "Consectetur call or visit", value: 620 },
        { label: "Enrolled", sub: "Adipiscing fee paid", value: 91 },
      ],
      conversionNotes: ["lorem click", "ipsum qualify", "dolor counsel", "sit close"],
      overall: true,
    });
  }

  deck.sectionDivider({ number: 3, title: "Decision components", subtitle: "Scorecards, gates, roadmap, findings and decisions" });

  {
    const s = deck.contentSlide({ kicker: "Scorecard: Harvey balls", title: "Lorem option scores against weighted criteria, with a verdict and a why-not", source: SRC });
    C.addScorecard(s, {
      criteria: [{ name: "Lorem demand", weight: 30 }, { name: "Ipsum margin", weight: 25 }, { name: "Dolor capital fit", weight: 20 }, { name: "Sit founder fit", weight: 15 }, { name: "Amet risk", weight: 10 }],
      options: [
        { name: "Lorem flagship", desc: "Single-site placeholder", scores: [5, 4, 5, 4, 4], status: "recommended", whyNot: "Chosen: lorem ipsum dolor sit amet, consectetur adipiscing elit." },
        { name: "Ipsum regional", desc: "Second engine", scores: [4, 4, 3, 4, 3], status: "second", statusLabel: "At gate", whyNot: "Only after lorem gate: demand from travellers must be proven first." },
        { name: "Dolor online", desc: "National course", scores: [3, 2, 4, 3, 2], status: "deferred", whyNot: "Deferred: crowded placeholder market and weak differentiation today." },
        { name: "Sit marketplace", desc: "Services platform", scores: [2, 1, 2, 2, 1], status: "rejected", whyNot: "Rejected: negative unit economics of lorem per booking." },
        { name: "Amet franchise", desc: "Partner centres", scores: [2, 3, 3, 1, 2], status: "rejected", whyNot: "Rejected for now: brand dilution before the method is codified." },
      ],
    });
  }

  {
    const s = deck.contentSlide({ kicker: "Scorecard: 1–5 chips", title: "Lorem coloured score chips suit numeric ratings where exact values matter", source: SRC });
    C.addScorecard(s, {
      mode: "chip",
      criteria: [{ name: "Lorem reach" }, { name: "Ipsum cost per lead" }, { name: "Dolor speed to test" }, { name: "Sit brand fit" }],
      options: [
        { name: "Lorem search ads", scores: [4, 4, 5, 3], whyNot: "Lead with this: high intent, quick to measure." },
        { name: "Ipsum social reels", scores: [5, 3, 4, 5], whyNot: "Pair with proof content; watch lead quality." },
        { name: "Dolor pop-up events", scores: [2, 2, 2, 4], whyNot: "Only after the lorem gate; slow and costly to run." },
        { name: "Sit referral scheme", scores: [2, 5, 3, 5], whyNot: "Cheap but small until the alumni base grows." },
      ],
    });
  }

  {
    const s = deck.contentSlide({ kicker: "Gate timeline", title: "Lorem stage gates release money only when proof criteria are met", source: SRC });
    C.addGateTimeline(s, {
      gates: [
        { code: "G0", name: "Lorem baseline", when: "M3 · Jan 2027", criteria: ["Ipsum data pull complete", "Dolor CRM live, ≥95% tagged", "Sit reply ≤15 min median"], unlocks: "Lorem paid tests" },
        { code: "G1", name: "Ipsum flagship proven", when: "M6 · Apr 2027", criteria: ["Two cohorts ≥75% full", "Lead to enrolment ≥4%", "Completion ≥85%, NPS ≥50"], unlocks: "Tranche 2 and price step 1", current: true },
        { code: "G2", name: "Dolor regional engine", when: "M15–M18", criteria: ["Out-of-town ≥15% of enrolments", "Two pilot pop-ups convert", "Trainer bench ≥3"], unlocks: "Tranche 3, price step 2" },
        { code: "G3a", name: "Sit second site", when: "≥M24", criteria: ["Flagship EBITDA-positive", "Partner host identified"], unlocks: "Partner-hosted satellite" },
        { code: "G3b", name: "Amet licensing", when: "≥M30–36", criteria: ["Method codified", "Educator certification live"], unlocks: "Licensing or franchise" },
      ],
    });
  }

  {
    const s = deck.contentSlide({ kicker: "Roadmap", title: "Lorem roadmap shows workstreams by month, with gates as dashed markers", source: SRC });
    C.addGantt(s, {
      periods: ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"],
      groups: [{ label: "2026", span: 3 }, { label: "2027", span: 10 }],
      markers: [{ at: 4, label: "G0" }, { at: 7, label: "G1" }],
      rows: [
        { label: "Lorem foundations", heading: true },
        { label: "Ipsum proof assets", bars: [{ start: 0, end: 4, label: "Profiles and reviews" }], milestones: [{ at: 4.5, label: "Report" }] },
        { label: "Dolor CRM and reply speed", bars: [{ start: 1, end: 3, label: "Set up", tone: "dark" }, { start: 3, end: 13, label: "Weekly spend-gate reviews", tone: "muted" }] },
        { label: "Sit growth", heading: true },
        { label: "Amet paid tests", bars: [{ start: 2, end: 7, label: "Tests ≤₹15k/month" }, { start: 7, end: 13, label: "Scale behind gates", tone: "accent" }] },
        { label: "Consectetur trainer hire and shadowing", bars: [{ start: 2, end: 6, label: "Hire, shadow" }, { start: 6, end: 13, label: "Trainer-led cohorts", tone: "accent" }] },
        { label: "Adipiscing price step", milestones: [{ at: 8, label: "Step 1 if G1 met" }] },
      ],
    });
  }

  {
    const s = deck.contentSlide({ kicker: "Findings", title: "Lorem findings pair each piece of evidence with what it means for the plan", source: SRC });
    C.addFindingsSoWhat(s, {
      rows: [
        { finding: "Lorem ipsum dolor sit amet: the academy teaches fewer than 60 placeholder students a year.", badge: "founder", soWhat: "Consectetur: growth must come from conversion and proof, not only more leads." },
        { finding: "Ipsum: no rating, reviews or published fees were found for the placeholder brand.", badge: "verified", soWhat: "Adipiscing: spend the first rupee on proof assets and reply speed, not ads." },
        { finding: "Dolor: the local market alone supports a small single-centre academy.", badge: "estimate", soWhat: "Elit: plan a regional engine for students who travel, released behind a gate." },
        { finding: "Sit: a two-step price rise may protect conversion while proof is thin.", badge: "hypothesis", soWhat: "Sed do: test the first step after the gate and roll back if conversion falls.", soWhatBadge: "recommendation" },
      ],
    });
  }

  {
    const s = deck.contentSlide({ kicker: "Founder decisions", title: "Lorem decisions the founder needs to take before the plan can start", source: SRC });
    C.addDecisionList(s, {
      decisions: [
        { title: "Lorem: approve the flagship model", detail: "Ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.", by: "M0 · 31 Oct", owner: "Founder" },
        { title: "Ipsum: release Tranche 1 budget", detail: "Up to a placeholder cap, with stop-loss at the lorem gate.", by: "M0 · 31 Oct", owner: "Founder" },
        { title: "Dolor: share 12–24 months of records", detail: "Enrolments, fees and enquiries, to replace assumptions with data.", by: "M1 · 15 Nov", owner: "Founder + analyst" },
        { title: "Sit: hire a lead trainer", detail: "Shadow-teaching from the first placeholder cohort.", by: "M2 · Dec", owner: "Founder" },
        { title: "Amet: agree the step-back schedule", detail: "Teaching share falls only when trainer-led cohorts match.", by: "M1 · Nov", owner: "Founder" },
      ],
    });
  }

  {
    const s = deck.contentSlide({ kicker: "Chart with commentary", title: "Lorem chart and commentary share the slide when the message needs explanation", source: SRC });
    C.addBarChart(s, {
      x: GRID.ML, w: 7.4, title: "Lorem fee comparison", unit: "₹ thousand, all-in (placeholder)",
      categories: ["Lorem A", "Ipsum B", "Dolor C", "Sit D", "Amet E", "PNA"], series: [35, 48, 55, 62, 75, 67], highlight: 5,
    });
    C.addTextBlock(s, {
      x: GRID.ML + 7.4 + GRID.gap, w: GRID.CW - 7.4 - GRID.gap, card: true,
      heading: "What the chart says",
      bullets: [
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco.",
      ],
    });
    C.addBadgeLegend(s, { x: GRID.ML + 7.4 + GRID.gap + 0.22, y: GRID.bottom - 0.5, types: ["estimate", "hypothesis"] });
  }

  // ---- Appendix --------------------------------------------------------------------------------
  deck.sectionDivider({ number: 4, title: "Appendix", subtitle: "Tables size their font automatically and continue onto extra slides when needed" });
  {
    const rows = [];
    for (let i = 1; i <= 26; i++) {
      rows.push([
        `A-${String(i).padStart(2, "0")}`,
        i % 4 === 0 ? `Lorem ipsum assumption ${i} with a longer description that wraps onto a second line in the table` : `Lorem assumption ${i}`,
        { text: `₹${(i * 1.7).toFixed(1)}L`, tag: ["verified", "estimate", "hypothesis"][i % 3] },
        i % 3 === 0 ? "Placeholder register, row " + i : "Dummy source " + i,
      ]);
    }
    deck.appendixTable({
      kicker: "Appendix table",
      title: "Lorem assumptions register (placeholder)",
      columns: [{ header: "ID", w: 0.8, bold: true }, { header: "Assumption", w: 5 }, { header: "Value", w: 1.8, align: "right" }, { header: "Source", w: 3 }],
      rows,
      source: SRC,
    });
  }

  await deck.write(OUT);
  console.log(`Wrote ${OUT}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
