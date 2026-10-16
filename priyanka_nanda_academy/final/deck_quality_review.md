# Deck Quality Review: PNA Growth Strategy and Investment Case

**Deliverable:** `final/Priyanka_Nanda_Academy_Growth_Strategy.pptx` · **Date:** 2026-10-16 · **Built by:** Presentation Production Agent (phase 2)

**Slide count: 35 pages.** The deck has the storyboard's 24 core slides (pages 1–24, with numbering kept so that the A8 cross-references stay valid) and its 9 appendix slides. A3 (gate definitions) and A4 (kill triggers) are long tables, so each continues onto a second page marked "continued (2 of 2)". The appendix therefore fills pages 25–35.

## 1. How the deck is built

| File | Role |
|---|---|
| `presentation_source/deck_content.js` | Every word and number on every slide, as data (titles, takeaways, table rows, chart series, footers, speaker notes) |
| `presentation_source/build_deck.js` | One layout function per slide type, built on the phase-1 components (`components.js`) plus local helpers: time grid, numbered list, evidence key, rich-text table |
| `presentation_source/tools/number_check.py` | Number-consistency check against the storyboard table (section 4) |
| `presentation_source/qa.sh` | Runs `validate.py`, then renders through the soffice wrapper to PDF and then PNG |

Rebuild with `node build_deck.js`, then run QA with `./qa.sh ../Priyanka_Nanda_Academy_Growth_Strategy.pptx _render/deck 90`.

**Structure:**
- **Sections:** Executive summary (3), Opportunity (4), Findings (2), Recommendation (7), Economics (4), Execution (2), Next steps (2), Appendix (11 pages).
  - "Executive summary" is one section more than the seven requested. The storyboard's storyline maps slides 4–24 to the seven requested sections and leaves the cover and the two executive-recommendation slides outside them, so they get their own section.
- **Native and editable content:** 13 native charts, 15 native tables, all text as text boxes or placeholders, and no pictures.
  - Titles sit in the layout's title placeholder.
  - Each slide has speaker notes (`addNotes`) carrying the storyboard notes. Where body detail did not fit on the slide, the notes add it.
- **Footers:** every page has a source footer ("Source: … Note: …") taken from the storyboard footer.
- **Evidence badges:** badges appear on every element the storyboard tags. The labels follow the storyboard vocabulary: VERIFIED, CLAIM, FOUNDER, ESTIMATE, HYPOTHESIS and RECOMMENDATION. The design system's "UNVERIFIED CLAIM" and "FOUNDER-STATED" are relabelled at build time.
- **Cover and close:** the cover shows the title, the client, October 2026, "Prepared for the founder", a "Draft for discussion" label, the Gate D/E status line and the six-label evidence legend. The last core slide is "Founder decisions and next actions".

## 2. Checks performed

| Check | Result |
|---|---|
| `validate.py` (pptx skill: schema, relationships, content types, charts, slide defects) | **All validations PASSED** (final build) |
| Text-fit engine (`fit.js` metrics; any text below its floor or overflowing is logged) | **0 warnings** on the final build (61 on the first build) |
| Render | `scripts/office/soffice.py --headless --convert-to pdf`, then `pdftoppm -png -r 90` (1200×675 px per page) |
| Visual inspection | Every page read as 2×2 contact sheets (4 pages, 1000 px each), plus close-up crops where needed. Six render rounds |
| Font floors | Body ≥11 pt on core slides; dense tables and grid cells ≥10 pt; chart labels 10–11 pt; footers, badges and chips 9 pt |
| Content scan | No placeholder text. Superseded figures appear only where they are labelled as such (section 4) |

### Per-slide visual inspection log (issues found → fix)

| Page | Issue found | Fix |
|---|---|---|
| 2 | List text smaller than the space allowed; badge note overflowed | Narrower badge column; badge note shortened to "model output" |
| 3 | "M29 / M40" overflowed its KPI tile and collided with the label | Value set as "M29" with " / M40" as the unit run |
| 4 | Title wrapped with a one-word second line; dense cells were at their size limit | Title made one line (see the `fit.js` fix below); narrower topic column; cell floor 10.5 pt |
| 6 | "Against" items overlapped (fixed slot heights) | Items sized by their content |
| 8 | Callout text clipped below its badge | Badges moved inline; shorter price-ladder card |
| 9 | Findings component left too little room under the badges (overflow warnings) | Custom rows with the badge inline beside the text |
| 10 | "borderline KO-1" wrapped; the first row's description touched the next row | Wider knock-out column; taller first row |
| 11 | Sub-brand pills ran off the card; the gauge title ran to 3 lines | Brand strip rebuilt as a masterbrand pill plus a text line; badge moved below the gauge |
| 12 | Inset rows collided with the evidence key; gate cards had dead space | Badges moved to the inset title line and the disclosure card; gate and inset heights rebalanced |
| 13 | LibreOffice dropped alternate chart category labels; the gating text hit the tagline | Taller chart with shorter labels; tagline moved under the table |
| 14 | Route legend ran off the slide; "143" overlapped a route segment | Legend wraps onto 2 rows; value placed beside the lead bar |
| 15 | Title fit 1 line in LibreOffice while the subtitle was placed for 2 lines; flywheel nodes hid the centre label; ramp note collided with the bar labels | Symmetric title check in `fit.js`; flywheel ring and node sizes changed; chart headroom raised |
| 16 | Recommendation badge collided with the subtitle | Moved into the Outputs and one-pager cards |
| 17 | Planning-case line label sat across the tall bar | Moved left, above the low bars |
| 18 | Seat table overflowed into the chip | Table height increased |
| 19 | Loss rows collapsed (no vertical room); scenario chart cramped, with labels over the legend | Tranche boxes cut to 2 lines; legend moved to the bottom; one-line reference note (full table on A6) |
| 20 | Cash chart squashed, with wrapped negative labels; badge over the IRR value | Middle column widened, table shortened; badges placed above the values |
| 21 | Point labels wrapped at weekly column width; "Co-teach 4 Jan" spilled out of its bar; key collided with the footer | Grid widened; labels placed left or right as space allows; key removed (the footer carries the evidence note) |
| 22 | C5/C6 cohort labels collided; team label ran to 3 lines; marker lines crossed numbers | Cohorts shown as a two-line value row; taller team row; values and labels sit on background-coloured boxes |
| 23 | Kill-trigger chips overflowed; two risk rows wrapped; mini-tornado labels were 9 pt | Triggers set as a paragraph; column widths and wording tightened; tornado labels 10 pt |
| 24 | "opinion day 21" chip wrapped | Wider decide-by column |
| A1 | Method and facts text overflowed the right column | Right column widened |
| A7 | Reference-line labels collided with bar labels; key items overprinted each other; legend clipped by the G1 chip | Overlay key placed under the chart on 2 rows; legend at the bottom; data labels inside the bar ends |
| A8 | Text smaller than the space allowed | Larger list and table |
| 1, 5, 7, A2–A6, A9 | No defects after the first round | — |

**Design-system fix (`fit.js`).** The "stable title" check compared only a tighter wrap (0.93) against the nominal width. A title measured 0.3% too long (page 15) therefore stayed at 28 pt on 2 lines in the model, but rendered on 1 line in LibreOffice. The check now compares 1.03 and 0.93, so borderline titles shrink until the line count is the same in either renderer. This changed three titles to a single line (pages 4, 15 and 22, at 25.5–27.5 pt). All other titles are unchanged.

## 3. Copy discipline

- **Titles:** all 33 assertion titles are verbatim from the storyboard.
- **Trimmed takeaways:** 10 takeaways that did not fit under a two-line title were trimmed. The numbers are kept, and the full sentence is either in the notes or shown in the slide body (slides 10, 11, 12, 15, 17, 20, 21, 23, A2, A7). The cover uses the storyboard's subtitle line, with its takeaway in the meta line.
- **Body detail:** dense body text was converted into the visual the storyboard specifies. Detail that did not fit went to the notes or the appendix, not off the record. For example, slide 19's shallow-cut and old-rule paths point to A6, and the quarterly figures behind slide 22 are in its notes.
- **Shortened Gantt labels:** on slides 21–22 some labels are shorter versions of the storyboard text, such as "Partners Mar–Apr" for "partner search Mar; 2–3 partners Apr". The full wording is in the speaker notes.

## 4. Number-consistency check

`tools/number_check.py` reads all slide text, table cells and native chart data (categories and series values), excluding the speaker notes. It then looks up every numeric token in the "Value" column of the storyboard's 60-row number-consistency table, first on the slides each row cites and then anywhere in the deck.

**Result: 60 of 60 rows match; 0 mismatches.**

| Outcome | Rows |
|---|---|
| Every token on the cited slides | 56 |
| Same value in another format, or the storyboard's own rounding | 3. Row 41: "≈7 fewer enrolments" for −7.1. Row 45: "≈19,800 / ≈35,900" for ₹19.8k / ₹35.9k. Row 58: slide 21 uses the storyboard's rounded ₹11.5L / ₹3.2L / ₹5.5L / ₹11.8L for ₹11.51L / ₹3.19L / ₹5.53L / ₹11.80L |
| Token on a different slide | 1. Row 56: rent ₹47 vs ₹167 is on pages 10 and 12, which is where the slide specs place it; the slide 6 spec does not include rent |

**Fixes made during the check:**
- Slide 19's founder-draw caption now gives the basis ("₹75k/month") for the ₹32.6L (M10) peak (row 14).
- Numbers the storyboard table cites but the slide specs omitted were added to the cited slides:
  - India learner range 20,100–126,000 and tricity learner range 484–879 (slides 5 and 6).
  - Headroom ₹4.8L / ₹9.8L and capex ₹17.2L (slide 19).
  - Growth and marketing spend ₹26.7L (slide 15).
  - Base-business EBITDA after salary −₹10.9L (slide 20).
  - Break-even 66 and 52 per year, and the GST swing of ₹12.7L at Base (slide 18).
  - −2.3 enrolments (slide 14).
  - The Operations Lead premium of ₹15k/month and ₹1.8L/yr (slide 24).
  - 94% of September demand fits (slide 6).
  - Mao Geping's 9 campuses in 24 years (A2).
- **SAM-5 low end:** slide 5's visual spec says "0.8", while the storyboard's consistency table and economics §1B row 7 say 0.75. The deck uses 0.75 and says so in the slide 5 footer.

**Superseded-figure scan:**

| Figure | Where it appears |
|---|---|
| ₹5.7 cr, 1,256, ₹0.3 cr, 4% share, ₹800–1,500 cr | Only A1's "Do not use" column (and slide 5's notes) |
| 6-weekly intake dates | Only A7, as the alternative |
| ₹28.7L | Only as the shallow-cut reference (pages 19, 29, 32) |
| 128 h | Only as the G1-at-M6 upside (page 23) |
| ₹12.7L | Only as the Base / superseded value (pages 18, 31) |
| 49% SG4 reading and the stale 46 / 55 / 1.7x Ludhiana figures | Nowhere |

## 5. Residual limitations

- **Font substitution in the QA render.** LibreOffice renders Calibri and Cambria with the metric-compatible Carlito and Caladea. Widths match, but kerning differs slightly, so line breaks in PowerPoint can differ by a word from the PNGs. The fitter wraps with 3% slack, and borderline titles are now shrunk until the line count is the same in either renderer.
- **₹ glyph.** Caladea has no rupee sign, so every ₹ inside Cambria text (titles, big numbers) is set as a separate run in the body font (Calibri/Carlito). It renders the same in PowerPoint and LibreOffice. If a ₹ is typed by hand into a heading in PowerPoint, it falls back to Cambria's own glyph.
- **Chart colours are fixed hex values.** pptxgenjs writes chart colours as sRGB, so charts do not follow a later palette change in PowerPoint's Design tab, although shapes and text do.
- **Overlays on native charts.** Three slides draw reference elements as shapes positioned with a manual plot-area layout:
  - slide 19: the T1, KT-11, ₹30L and ₹35L line labels
  - A7: the two test lines and the G1 marker
  - slide 15: the month grid aligned under the media chart

  If someone edits those charts' data or resizes them in PowerPoint, the overlays will not move with them. Slide 17's planning-case line is a native combo series and does move.
- **Repeated paragraph properties.** pptxgenjs writes repeated `<a:pPr>` elements in multi-run paragraphs. `validate.py` treats this as non-fatal (PowerPoint opens such files), and the phase-1 demo deck has the same property.
- **Data without its own badge.** Category-level evidence for chart data is shown once per chart with a badge, not per bar. The Gantt rows on slides 21–22 rely on the footer note ("Cohorts, hours, cash: ESTIMATE"; "Plan, dates, G0 criteria: RECOMMENDATION") rather than badges on each row.
- **Limits of the number check.** It matches numeric tokens, not their sentence context. It confirms that every table value is present on the cited slides, but not that, say, "81" sits next to "enrolments". I spot-checked those pairings by eye on every page during the visual pass.

## 6. Round 2: independent QA fixes

Source: `final/presentation_qa_independent.md` (7 Must-fix, 20 Should-fix, 13 Nice). All Must-fix and Should-fix items are applied, and so are 12 of the 13 Nice items, with N9 partly applied. The same corrections are made in `final/slide_storyboard.md` (titles, takeaways, bodies, evidence status, the number-consistency table, and inconsistency note (j)) and in `final/deck_sources.md`. `strategy/recommended_strategy.md` and `final/executive_summary.md` are left to the orchestrator, as agreed.

| ID | Slide | Fix applied |
|---|---|---|
| M1 | 2 | Item 4 now reads: "**Expect to need ₹25L, authorise ₹35L.** Worst case ≈₹36L if nobody acts (above the ceiling), ≈₹25L with the March cut, ≈₹33L if the post-move season fails." |
| M2 | 3, 24 | Both options are now on the same salary basis. Boutique: Year-1 EBITDA +₹10.8L before her salary (+₹1.8L after). Institution: −₹2.8L before (−₹11.8L after), cash back M29 before salary and M40 after. D2 on slide 24 uses the same basis |
| M3 | 10 | Title: "The integrated flagship is the top full-scale model under every weighting; five options are rejected". The subtitle says "ranks first among full-scale models" |
| M4 | 17 | "The ₹70k career share of the planned ₹1.0L/month is ≈1.9x the route maths (₹37.6k); the whole ₹1.0L is ≈2.7x" |
| M5 | 31 (A5) | Subtitle: "only fees at ×0.8 breach the ₹30L planned line (₹33.3L), and every single driver stays inside ₹35L" |
| M6 | 24 | Title: "Eleven decisions, six of them within a week, decide which academy PNA becomes". There are 11 rows; D2, D3, D5, D5a, D6/6a/6b and D9 are due by day 7 |
| M7 | 18 | The "After CAC" bar at today's fee is ₹14.6k (workbook `Unit_Economics` E19), no longer 0. The step-1 contribution margin is 70% |
| S1 | 17 | The subtitle now says ₹35k of media buys the six paid enrolments, and organic and referral add the other four. The chart note says the bars are the Growth file's route view and that the model's paid-route CAC is ₹4.8k (× 2.42 = ₹11.7k). The line label was shortened so it no longer collides with the line |
| S2 | 14 | The footer cites `admissions_funnel.md` §10.1 for the stage counts and notes that the workbook gives 64.2 QL and 12.0 applied |
| S3 | 14 | The chip reads "≈₹32k/month of extra acquisition spend (≈₹15k of it paid media)" |
| S4 | 5, 6, 26 | The SOM box and the footers state the basis: the Base reference bundle (Y3 ₹165.5L), with the planning case at ≈₹1.85 cr. Slide 6 says "the Base bundle reaches 13%" |
| S5 | 2, 19 | "Expect to need ₹25L" is used for the peak. "₹30L plan" stays for the envelope |
| S6 | 4 | The Digital footprint badge is now CLAIM; the text starts "Tool-limited absence", and the footer explains it |
| S7 | 7 | The 35% figure is badged CLAIM: "of Indian students cite parents as main advisor" |
| S8 | 26 (A2) | The H5 verdict is tagged ESTIMATE. Title: "H1 and H5 hold, H3 holds as a constraint, and four (H2, H4, H6, H7) await the tests in the plan" |
| S9 | 22, 28, 33 | The disclosure on all three slides now says studio cohorts above 8 (8.7, 9.4) run across two daily slots (2.5 slots/day from March) and are not capacity-checked until the deferred run |
| S10 | 35 (A9) | "Five outstanding model runs". Box heading: "only the ≈20% tier share depends on them" |
| S11 | 8 | Title: "…few publish fees and nobody publishes outcomes". Subtitle: "Six tiers" |
| S12 | 29 (A4) | KT-1a team notice is ≈₹1.3L, matching A6 |
| S13 | 29–30 (A4) | Title: "Fifteen triggers…". The subtitle names KT-1 to KT-13 plus KT-1a and KT-10b |
| S14 | 18 | The LTV:CAC tile adds: "At the planning case's ₹11.7k paid CAC the ratio is ≈4x; fully loaded acquisition is 53% of career revenue (M7–M12)" |
| S15 | 3 | Title: "Year 1 loses ₹2.8L before her salary and needs ₹25L of cash; Year 3 pays only if gates pass" |
| S16 | 23 | Subtitle: "…paid tests and the WTP block (by March) and the Destination pilot (by October) replace the weakest assumptions in 2027" |
| S17 | 2 | A "What we found" strip under the subtitle: ≈₹388 cr; ₹3.27 cr is enough to start, not finish; nobody publishes outcomes; PNA is invisible online (tool-limited) |
| S18 | 24 | D5a reads "(₹40k/month: counsellor pay + ₹15k premium, ₹1.8L/yr)". D2's default reads "Staged plan; confirm after D1 (day 10)" |
| S19 | 14 | Funnel bars now narrow at every stage (each narrower than the one above), and the header is labelled "bar lengths schematic" |
| S20 | 11 | Subtitle: "…starts in the founder's studio and moves to a 12-station space after G1" |
| N1 | 5 | "(2025P, a published projection)" |
| N2 | 8 | "MCM DAV (Chandigarh), HMV (Jalandhar)"; "₹3,730–35,000 (aggregator-reported)"; the ladder title reads "(mixed evidence)" |
| N3 | 7 | "tricity bridal MUA listings" |
| N4 | 12 | "Delhi NCT 7.4x the pool". The notes now say an owned centre needs ≈69 local students, not "about 3x" |
| N5 | 25 (A1) | "Three methods, one tricity number…" |
| N6 | 32 (A6) | "Six modelled runs (five failure paths and the upside-timing variant)" |
| N7 | 9 | "~280–300 programme hours (≥150 h on live models)" |
| N8 | 10, 24 | Units added: "/yr", "peak cash need (Year 1)", "of Year-1 EBITDA". Slide 24's D2 uses the M2 wording |
| N9 | 33, 22, 19 | **Partly applied.** On A7 the G1 marker moved into the gap between the 5 Jul and 16 Aug cohorts, so it no longer touches "6.8". On 22 the gate marker lines already pass behind value and label boxes (masked since round 1). **Not applied:** the 26-Feb diamond is correctly placed in late February (position 3.89 on the month grid; only its label runs into March). The ₹28L KT-11 line stays on slide 19 because the storyboard specifies it, and its label is separated from the ₹30L label |
| N10 | 9, 11, 13, 16 | Assertion titles: 9 "PNA's white space is published fees, outcomes and small batches; only the outcomes record is hard to copy"; 11 "Build one flagship as an institution: …"; 13 "Publish a five-step ladder and raise the flagship price only after proof"; 16 "A ₹20k/month stack makes the funnel visible and the five-minute rule enforceable" |
| N11 | 18 (notes) | "roughly 5.5 or more … (6.5 at the step-1 fee)" |
| N12 | 2 | Foot: "Each scores in the bottom half or fails on the numbers: see slide 10". Pure digital (C) is in slide 10's scorecard at 2.55 |
| N13 | 35 (A9) | The F/S column is replaced by distinct source-ID counts per prefix: S-IND 63, S-CHD 29, S-NC 54, S-LC 57, S-INT 50, S-CUS 54, S-BM 15, S-GRO 18. The register's fragments do not carry fetched/snippet markers consistently enough to count those |

**Not in the deck's files:** QA §8's upstream corrections are for the orchestrator. These are `recommended_strategy.md` §1(4), §5, §3 Q6, §1(10), §9.1 D2 and §7.3 KT-1a, and the "media" label in economics §1B row 25.

**Round 2 checks:**
- `node build_deck.js`: 0 text-fit warnings.
- `validate.py`: **All validations PASSED**.
- Re-render: 90 dpi. All 28 changed pages were inspected on 2×2 contact sheets; slide 17 was re-checked at crop after the line-label fix.
- Number check against the updated storyboard table: **60 of 60 rows match**. 56 are exact on the cited slides and 3 differ only in format or rounding (rows 41, 45, 58, as in section 4). In row 56, rent ₹47 vs ₹167 appears on slides 10 and 12.
- The deck is still 35 pages: 24 core and 9 appendix slides, with A3 and A4 running to two pages each.
