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
