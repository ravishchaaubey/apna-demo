# Independent Presentation QA: PNA Growth Strategy deck

**Deck:** `final/Priyanka_Nanda_Academy_Growth_Strategy.pptx` (35 pages: 24 core and 11 appendix pages covering A1–A9) · **Reviewer:** Presentation QA Agent (independent of the build team) · **Date:** 2026-10-16
**Benchmark:** the deck was checked against the upstream sources, not `slide_storyboard.md`. Those sources are `economics/assumptions_and_methodology.md` §1–§5, the three recalculated workbooks (opened with openpyxl `data_only=True`), `strategy/recommended_strategy.md`, `strategy/admissions_funnel.md`, `execution/*.md`, `research/*.md` and `research/sources.md`.

---

## 1. Verdict

**Not ready for an investor yet. It will be ready after 7 Must-fix edits, and none of them needs a model re-run.**

- The numbers trace well. Of about 56 material figures checked against the workbooks and research files, 49 match exactly, 5 match the upstream text but rest on a different basis than the slide implies, and 2 are wrong.
- The two wrong figures are the hard-coded ₹0 "after CAC" bar on slide 18 and the "1.9x" media ratio on slide 17.
- The evidence labelling is unusually disciplined. The beauty-sector figure (₹76,141 cr) is always shown as context, never as the education market.
- What a client or investor would trip on is a handful of **headline and title claims that the deck's own tables contradict**:
  - the worst-case loss on slide 2;
  - the boutique-vs-institution comparison, which uses different salary bases;
  - "scores highest under every weighting" on slide 10;
  - "any single driver breaches ₹30L" on slide 31;
  - the decision count on slide 24.
- These are text and chart-data edits in `final/presentation_source/deck_content.js`. Line numbers are given in the fixes below.

| Severity | Count |
|---|---|
| **Must-fix** | **7** |
| Should-fix | 20 |
| Nice | 13 |

**Readability:** no text is below 9 pt. The minimum on every slide is 9.0 pt, chart fonts are at least 10 pt, and no autofit shrink is applied. No clipping was found on slides 2, 3, 14, 19, 21, 22, 23 and 24, which were inspected at full resolution, or on the other 27 pages. The visual problems are the funnel bar scale on slide 14, the missing bar on slide 18 and minor marker-line overlaps on slide 22.

**Narrative:** all six storyline questions are answered in order (map in §6), and the deck ends on founder decisions. However, the executive summary (slides 2–3) does not say what we found, and four titles are noun phrases rather than assertions.

---

## 2. Issues table

Line references are to `final/presentation_source/deck_content.js`. "WB" means a workbook cell.

| ID | Severity | Slide | Issue | Evidence (source and value) | Exact fix |
|---|---|---|---|---|---|
| **M1** | **Must-fix** | 2 (also exec summary framing) | "be ready to lose ₹33L" understates the worst case. The deck's own slide 19 shows **₹36.2L** if nobody acts, which is above the ₹35L authorisation, and slide 19's title says "₹33–36L". | economics §1A.2: `Staged_Cons` peak ₹36.2L, "Worst plausible cash loss ≈₹36L". WB `Staged_Cons` B157 = 3,618,615. recommended_strategy §1(4) lists ₹36L in the same paragraph as "up to ₹33L", so the source contradicts itself. | Line 50: "**Expect to need ₹25L, authorise ₹35L; worst case ≈₹36L if nobody acts, ≈₹25L with the March cut, ≈₹33L after a false-positive G1.**" |
| **M2** | **Must-fix** | 3, 24 (D2) | The founder's core choice is compared on different bases. Boutique "+₹10.8L EBITDA" is **before** founder salary; Institution "−₹12L" is **after** salary. Payback is also mixed: "cash back Year 3" is before salary, while after salary it is M40 (Year 4). This overstates the gap by ₹9L a year. | WB `Plan10L_BaseRates` B153 = +₹10.77L (before salary), B155 = +₹1.77L (after). WB `Staged_G1M9` B153 = −₹2.82L, B155 = −₹11.82L. `Payback_IRR` row 8: M29 / M40. | Line 79: "₹39.8L revenue, Year-1 EBITDA +₹10.8L before her salary (+₹1.8L after), peak cash ₹3.1L, ~52 career students, founder keeps teaching". Line 80: "Year-1 EBITDA −₹2.8L before her salary (−₹11.8L after); cash back M29 before salary, M40 after; a bet on ₹90k pricing and out-of-town demand". Line 811 (D2): give both options before/after salary in the same way. |
| **M3** | **Must-fix** | 10 | The title "The integrated flagship scores highest under every weighting" is contradicted by the slide's own table. F1 Masterclasses scores 4.10 / 3.80 / 4.15 against 3.85 / 3.90 / 3.85, so it beats the flagship under the Base and Founder weightings. | business_model_evaluation §4 (slide table). recommended_strategy §4.1: "scores highest **among full-scale models** under all three weightings". | Line 284: "Among models that can carry the business, the integrated flagship scores highest under every weighting; five options are rejected" |
| **M4** | **Must-fix** | 17 (and 34 Q10) | Arithmetic error: "The planned ₹1.0L/month is ≈1.9x what the route maths needs (₹37.6k)". In fact ₹1.0L ÷ ₹37.6k = **2.7x**. The 1.9x applies only to the ~70% career-attributable share (₹70k). | economics §3 #7: "Base ₹1.0L/month… ~70% career-attributable… about 1.9x the funnel-required career media (₹37.6k)". §1A.7: ₹70,000 ÷ ₹37.6k. WB funnel `Summary` C9 = ₹37,633. The same slip is upstream in recommended_strategy §3 Q6. | Line 551: "The ₹70k career share of the planned ₹1.0L/month is **≈1.9x** what the route maths needs (**₹37.6k**); the whole ₹1.0L is ≈2.7x…". Also correct recommended_strategy §3 Q6. |
| **M5** | **Must-fix** | 31 | The subtitle says "any single adverse driver at the tested magnitude breaches the ₹30L planned line", which is false on the slide's own labels. Only fees ×0.8 breaches (₹33.3L). Conversion (₹29.7L), rent (₹29.6L) and every other driver stay under ₹30L. The claim is the reviewer's RT-16 finding on the *unstaged Base*, which is superseded. | WB `Sensitivity` H6–H13: 29.66 / 33.30 / 25.72 / 25.95 / 27.15 / 29.63 / 26.15 / 25.18 (₹L). economics §1A.5. | Line 964: "The tornado is run on the recommended plan, not the unstaged Base; only fees at ×0.8 breach the ₹30L planned line (₹33.3L), and every single driver stays inside ₹35L." |
| **M6** | **Must-fix** | 24 | The title "Twelve decisions, three of them this week" matches neither the table nor the source. The table has **11 rows** covering **13 codes** (D1–D10, D5a, D6a, D6b). **Six rows (8 codes) are due by day 7**: D2, D3, D5, D5a, D6/6a/6b and D9 (day 0). | recommended_strategy §6.4 and §9.1 (13 codes). executive_summary "Decisions needed" (11 items). Slide 24 "By" column. | Line 807: "Six decisions this week, five more this month, decide which academy PNA becomes" (or "Eleven decisions (13 codes), six of them this week, …") |
| **M7** | **Must-fix** | 18 | Chart data error. The "After CAC" series is hard-coded as **0** at today's fee, so the bar is missing and reads as zero contribution after CAC. The workbook value is **₹14.6k**. The table's Step-1 contribution margin is also shown as "—" when the workbook has 70%. | WB `Unit_Economics` E19 = 14,597 (22.2 − 7.6 CAC). J17 = 0.7009. Line 575: `values: [0, 32.0, 42.8]`. | Line 575: `values: [14.6, 32.0, 42.8]`. Seat table Step-1 margin: "70%". |
| S1 | Should-fix | 17 | The route CAC basis does not match the model. The slide shows Base ₹5.9k (₹5,878, from admissions_funnel.md at a CTWA CPL of ₹300 with the taster cost gross) beside "₹11.7k (× 2.42)". But 2.42 is applied to the funnel workbook's **₹4,826**, and 5.9 × 2.42 = 14.3. The slide also carries two different "route maths" figures (₹35k and ₹37.6k). "₹35k/month buys ten enrolments" is also wrong: it buys 6 paid enrolments, and the other 4 come from organic (₹35k fixed content cost) and referral (₹6k rewards). | WB funnel `Summary` C29 = ₹4,826 (paid-route media CAC), C9 = ₹37,633. `Funnel_Base` B23 CTWA CPL = ₹287.5, B42 CTWA CAC = ₹5,445, D24 organic = ₹35,000. admissions_funnel §10.1: ₹5,878, ₹35,265. economics §1A.7. | Either restate the table and bar from `Funnel_Base` (Base paid-route CAC ₹4.8k; 4.8 × 2.42 = 11.7), or footnote: "₹5.9k is the Growth file's route view; the model's paid-route CAC is ₹4.8k, which × 2.42 = ₹11.7k". Line 534: "₹35k of media buys the six paid enrolments; organic and referral supply the other four…" |
| S2 | Should-fix | 14 | The funnel volumes follow admissions_funnel.md (QL 65.9, applied 12.2), but the footer cites `Funnel_Base`, which gives **64.2** and **12.0**. | WB `Funnel_Base` H18 = 64.16, H20 = 12.05. admissions_funnel §10.1 = 65.9 / 12.2. | Cite "admissions_funnel.md §10.1" as the source of the stage counts, or use the workbook values (64 QL, 12.0 applied). |
| S3 | Should-fix | 14 | "≈₹32k/month of extra **media**" is mislabelled. ₹17.2k of the ₹32.4k is organic content (a fixed team cost). The paid-media share is ≈₹15.2k. | WB `Speed_to_Lead` B12 + C12 = 15,172; D12 (organic) = 17,239; E12 = 32,410. Mislabel is upstream in economics §1B row 25. | Line 453: "…costs ≈₹32k/month of extra acquisition spend (≈₹15k of it paid media) for the same enrolments, or −2.3 enrolments…". Correct §1B row 25. |
| S4 | Should-fix | 5, 6, 26 | The SOM figures (₹1.88 cr, 22% of SAM core, 13% of tricity learners, ≈1.8x the average fee) come from the **unstaged Base bundle** (Y3 ₹165.5L), not the planning case the rest of the deck uses (Y3 ₹162.9L, which is ≈₹1.85 cr incl. GST on a training-only basis). Slide 6 says "the plan reaches 13%". | WB `SOM_PNA` A2: "Year-3 revenue from 3yr_Scenarios (Low=Conservative, Base, High=Aggressive)". D21 = 1.8758. economics §3 #9: "Our Base Y3 is ₹1.66 cr ex-GST (₹1.88 cr quoted)". | Footer, slides 5 and 6: "SOM and share tests use the Base reference bundle (Y3 ₹165.5L ex-GST); the planning case is ≈₹1.85 cr". Slide 6: "the Base bundle reaches 13%…". |
| S5 | Should-fix | 2, 19, 24, 34 | "Plan" means two different numbers. "Plan ₹25L" (peak cash) on slides 2 and 19 sits beside "₹30L planned" (chart line on 19), "₹30L + ₹5L envelope" (D3) and "return on ₹30–35L" (34). | economics §1A: peak ₹25.2L, envelope ₹30L, contingency ₹5L. | Use "expect to need ₹25L" for the peak and keep "₹30L plan" for the envelope throughout (lines 50 and 600). |
| S6 | Should-fix | 4 | The Digital footprint row carries a **VERIFIED** badge, but the same slide's subtitle says "not verifiable from our tools", the title says "every number is unverified", and D9's default is "Deck says 'not verifiable'". | recommended_strategy §2: "[FACT of absence in our searches; tool-limited]". RT-09 restated CA-07 as tool-limited. | Replace the badge with CLAIM plus the note "tool-limited absence". Keep the footer explanation. |
| S7 | Should-fix | 7 | "35% of students name parents as their main advisor" is badged VERIFIED. The source is a snippet-only, undated news report of a study-abroad survey with Low-Medium reliability. | sources.md S-CUS-45: "News report of survey · Low-Medium · Snippet · n.d.". customer_segments §1 item 3 tags it [FACT]. | Badge: CLAIM. Label: "35% of Indian students (survey reported in the press) name parents as main advisor". |
| S8 | Should-fix | 26 | The H5 verdict "Strongly supported" is tagged **VERIFIED**, but a verdict is a judgement, and the slide footer says verdicts are ESTIMATE/HYPOTHESIS. The title count is also muddled. It says "two hold … one strongly supported", while the table marks H5 "Strongly supported", H3 "Constraint strongly supported" and H4 "Supported on price". | recommended_strategy §4.5. | H5 tag: ESTIMATE (keep "UC ~10 years; Blow liquidated (VERIFIED)" in the evidence column). Title: "H1 and H5 hold, H3 holds as a constraint, four (H2, H4, H6, H7) await the tests in the plan". |
| S9 | Should-fix | 33, 22, 28 | On the adopted 8-weekly calendar the studio cohorts are **8.7** (26 Apr) and **9.4** (21 Jun) students, which is more than the **8 stations** in the studio. Yet G1 is a "≥6 of 8 stations" test. The calendar re-allocation is not capacity-checked, and the G1 pass relies on these two cohorts. | WB `Staged_G1M9` row 25: 8 stations through M9. Rows 145–146: 8.73, 9.38. economics §1A.6: "The calendar only allocates enrolments to cohorts." | Disclose on 33 and 28: "Cohorts above 8 run across two daily slots (2.5 slots/day from March); not capacity-checked until the deferred run". Alternatively, cap the displayed cohorts at 8 and restate. |
| S10 | Should-fix | 35 | The subtitle says "four outstanding model runs", but five are listed. The box heading "no deck number depends on them" is false: the ≈20% professional-tier share on slides 5, 6 and 26 explicitly awaits the SOM_PNA run. | economics §1A.8 lists 5 deferred runs. Item 3 is the tier-matched share line. | Line 1088: "five outstanding model runs". Box heading: "Outstanding model items (only the ≈20% tier share depends on them)". |
| S11 | Should-fix | 8 | The title "nobody publishes fees or outcomes" is contradicted on the slide itself: Zuri publishes locally, 4 of 10 national players publish, and the Premium row says "Published prices". The subtitle says "Five tiers" but there are six rows. | chandigarh_competitors §1 item 6. national_competitors WS1: "4 of 10 players publish". | Line 216: "Chains sell breadth and certificates; few publish fees and nobody publishes outcomes". Line 217: "Six tiers…" or merge two rows. |
| S12 | Should-fix | 29 vs 32 | The team notice for the KT-1a deep cut is ≈₹1.2L on slide 29 but ₹1.3L on slide 32. | WB `Staged_Cons_CutM5_Deep` lease-exit+severance = ₹1.325L. economics §1A.2: ₹1.3L. (Strategy §7.3 still says ₹1.2L, which is the shallow cut.) | Line 941 (KT-1a row): "team notice ≈₹1.3L". |
| S13 | Should-fix | 29, 30 | The title says "Thirteen triggers", but the two tables list **15** (KT-1a and KT-10b are additional). | recommended_strategy §7.3. | Line 932: "Fifteen triggers (KT-1 to KT-13, plus KT-1a and KT-10b) say in advance what stops…" |
| S14 | Should-fix | 18 | LTV:CAC 8.0x uses the funnel's blended CAC of ₹6.3k. The planning case pays ₹11.7k effective media CAC and 53% fully loaded (slide 17), so 8.0x flatters the investor view. | WB funnel `Summary` C17 = ₹6,283, C25 = 8.04. `Staged_G1M9` B172 = ₹11,679, B174 = 53%. | Add: "at the planning case's ₹11.7k paid CAC the paid-route ratio is ≈4x; fully loaded acquisition is 53% of career revenue in M7–M12". |
| S15 | Should-fix | 3 | The title "Year 1 breaks roughly even before her salary" reads as spin next to −₹11.8L after salary and −₹22.5L of year-end cash. | WB `Staged_G1M9` B153 −2.82, B155 −11.82, B178 −22.54. | Line 66: "Year 1 loses ₹2.8L before her salary and needs ₹25L of cash; Year 3 pays only if gates pass" |
| S16 | Should-fix | 23 | The subtitle says the tests replace the weakest assumptions "by mid-2027", but the Destination pilot runs Aug–Sep 2027 (group B intensive from 18 Oct). | twelve_month_roadmap §3.1 and Gantt: Pilot A 16 Aug, Pilot B 20 Sep. | Line 766: "…by the end of 2027 (paid tests and WTP by March; Destination pilot by October)". |
| S17 | Should-fix | 2 | The executive summary answers what to do, what it takes and what happens next, but not **what we found**. There is no market size, white space or invisibility finding on slides 2–3. | Brief storyline Q1–Q2. Slides 5–9 hold the findings. | Add a one-line strip under the subtitle on slide 2: "Found: India makeup tuition ≈₹388 cr; tricity ₹3.27 cr is enough to start, not finish; nobody publishes outcomes; PNA is invisible online (tool-limited)." |
| S18 | Should-fix | 24 | D5a "(counsellor pay + ₹15k/month, ₹1.8L/yr)" reads as if the role costs ₹1.8L a year. The role costs ₹40k/month (₹4.8L/yr); ₹1.8L is only the premium. D2 (choose boutique or institution, day 7) is also due before D1 (supply the numbers, day 10), although "every number changes" when D1 lands. | first_90_days §1 D5a: "₹40k/month, ₹1.8L/yr premium". Slide 24 D1 = day 10, D2 = day 7. | "(₹40k/month: counsellor pay + ₹15k premium)". Mark D2 as "provisional day 7, confirmed after D1", or move D2 to day 14. |
| S19 | Should-fix | 14 | The funnel bars are not to scale. The Qualified-lead bar (65.9) is drawn **longer** than the 143-lead bar, so the funnel appears to widen. | Rendered page 14: lead bar ≈495 px, QL bar ≈518 px. | Scale the bar widths to the values, or narrow them monotonically from the 143 bar and label the graphic "schematic". |
| S20 | Should-fix | 11 | The subtitle says "≤12-seat bridal academy in the founder's studio", but the plan moves to a new ~1,300 sq ft, 12-station space at M10 (slides 19 and 22). | recommended_strategy §5 T2. economics §1A (move M10). | Line 322: "…bridal academy that starts in the founder's studio and moves to its own 12-station space after G1, …" |
| N1 | Nice | 5 | ₹76,141 cr is a 2025 projection (2025P) but is badged VERIFIED without qualification. It is correctly shown as context only. | WB `Context_NotTAM` B6, "2025P", S-IND-01 Table 1. | Badge note: "published projection". |
| N2 | Nice | 8 | Government diploma fees ₹3,730–35,000 are badged VERIFIED but are aggregator-reported (Careers360, Low reliability), and HMV is in Jalandhar, not the tricity. The price ladder has no evidence tag, although its tiers mix FACT, CLAIM and EST. | chandigarh_competitors rows 17 and 179. national_competitors §5.1 tier tags. | "VERIFIED (aggregator)"; "MCM DAV (Chandigarh), HMV (Jalandhar)"; add a "mixed: VERIFIED/CLAIM/ESTIMATE" note to the ladder. |
| N3 | Nice | 7 | ₹14–45k per function is badged VERIFIED, but the listings are vendor-stated prices. | customer_segments §2 table: "[FACT – listing; prices are vendor claims]". | "VERIFIED (listings)". |
| N4 | Nice | 12 | "Delhi NCR 7.4x the pool" is Delhi NCT only. The speaker notes say a site lift of "about 3x" justifies an owned centre, which conflicts with the model: an owned centre wins only above ≈69 local students (≈6.9x N_dest) and is still negative at a 4.6x lift. | chandigarh_market_analysis §8.3 (3,464k NCT vs 471k). WB `BM_Unit_Economics` D62 = 69.3, row 69. economics §3 #9. | "Delhi NCT 7.4x…". Notes: "…about 2.4x for a partner site; an owned centre needs ≈69 local students". |
| N5 | Nice | 25 | The title says "Two methods, one tricity number", but the tricity figure uses **three** methods. The two methods are for the India TAM. | economics §2: Methods A/B/C (2.18 / 3.96 / 3.67). | Line 850: "Three methods, one tricity number: ₹3.27 cr, not ₹5.7 cr". |
| N6 | Nice | 32 | The subtitle says "Five modelled failure paths", but the table has six runs. | Slide 32 table. | Line 987: "Six modelled runs…". |
| N7 | Nice | 9 | "~280–300 practice hours" overstates the hands-on time. The source gives ~280–300 programme hours, of which ≥150 h are hands-on. | positioning_and_segments §6 row L3 (line 172). | "~280–300 programme hours (≥150 h on live models)". |
| N8 | Nice | 10, 24 | Some figures are missing a unit or period: "≈₹29L fixed cost" and "−₹7.4L" (both per year), "₹44.2L cash" (peak cash need, Year 1), "conversion ±20% is worth ₹12.6L" (planning-case Year-1 EBITDA), and "+₹10.8L/yr" (Year 1 at Base rates). | BM_Unit_Economics; Plan50L_BaseRates; Sensitivity row 6. | Add "/yr", "peak cash need", "of Year-1 EBITDA" and "Year 1" as indicated. |
| N9 | Nice | 22, 19, 33, 4 | Minor overlaps: on 22, gate marker lines run through "5.6", "−9.97" and "10.1", and "≥30 reviews by 26 Feb" is plotted in March. On 19, the ₹28L and ₹30L reference lines nearly coincide. On 33, the "6.8" label sits on the G1 line. On 4, the Fee-row badges touch the body text. | Rendered pages at 110 dpi. | Nudge the labels; move the 26-Feb diamond into Feb; drop the ₹28L line from the chart (it is in the KT-11 text). |
| N10 | Nice | 9, 11, 13, 16 | These titles are noun phrases, not assertions. | Titles at lines ~250, 321, ~350, ~470. | For example, 9: "PNA's white space is published fees, outcomes and small batches; only the outcomes record is hard to copy". 16: "A ₹20k/month stack makes the funnel visible and the five-minute rule enforceable". |
| N11 | Nice | 18 (notes) | The notes say the step-back is affordable at "roughly six or more" enrolments a month; the source says 5.5 (6.5 at the step-1 fee). | economics §5 #6. | "roughly 5.5 or more (6.5 at the step-1 fee)". |
| N12 | Nice | 2 | "Each is rejected on numbers… see slide 10", but "National online course now" has no number on slide 10. | Slide 10 "Why not" panel. | Add "Pure digital: no verified audience; theory free on YouTube; 88% prefer blended/classroom" to slide 10, or drop it from the claim. |
| N13 | Nice | 35 | The F/S column reads "See register" on every row, so it carries no information. | Slide 35 table. | Show the fetched/snippet counts per prefix, or delete the column. |

---

## 3. Numbers checked against upstream sources (56 figures)

✓ = matches the source exactly (after display rounding). ~ = matches the upstream text but on a different basis than the slide states (see the issue). ✗ = wrong.

| # | Figure (slide) | Deck | Upstream source and value | Result |
|---|---|---|---|---|
| 1 | TAM India (5) | ₹388 cr (80–1,373) | WB sizing `TAM_India` D30 387.7, C30 79.9, E30 1,373.4 | ✓ |
| 2 | India learners (5) | ≈56,800 (20,100–126,000) | `TAM_India` row 31 | ✓ |
| 3 | Online layer (5) | ₹22.5 cr (3–120) | `TAM_India` row 33 | ✓ |
| 4 | Tricity market (5, 6, 25) | ₹3.27 cr (1.45–5.28), ≈730 learners (484–879) | `SAM_North` rows 12–13; economics §2 | ✓ |
| 5 | Tricity share of India (5) | 0.84% | economics §1B row 5 | ✓ |
| 6 | SAM core and SAM-1..4 (5) | ₹7.8 cr (2.3–24.2); 3.3 / 1.9 / 1.4 / 1.2 | `SAM_North` D38, D13, D21, D27, D32 | ✓ |
| 7 | SAM-5 (5) | ₹7.9 cr (0.75–54) | `SAM_North` row 35 | ✓ |
| 8 | SOM (5) | ₹1.88 cr (0.41–3.83), 22%, 13% | `SOM_PNA` D21, D22, D17 (Base bundle) | ~ S4 |
| 9 | Today illustrative (4, 5, 25) | ₹19.6L / ₹16.6L; ≈₹0.20 cr; ≈7% (3–12%) | `Unit_Economics` B35–B36; `SOM_PNA` D28, row 31 | ✓ |
| 10 | Beauty & Salon (5, 25) | ₹76,141 cr 2025P; ~200x; ~0.5% | `Context_NotTAM` B6; 76,141 ÷ 387.7 = 196x | ✓ |
| 11 | One-centre take (6) | ₹0.5–0.8 cr at 15–25% | economics §2 item 5 | ✓ |
| 12 | Y1 revenue (3, 19, 20) | ₹60.6L | `Staged_G1M9` B152 = 6,055,341 | ✓ |
| 13 | Y1 EBITDA (3) | −₹2.8L / −₹11.8L | `Staged_G1M9` B153, B155 | ✓ |
| 14 | Y1 career enrolments (3) | 81 | `Staged_G1M9` B160 = 81.0 | ✓ |
| 15 | Peak cash (3, 19) | ₹25.2L, M9 | `Staged_G1M9` B157, B188 | ✓ |
| 16 | T1 use (19, 21) | ₹11.8L | `Staged_G1M9` B181 (peak to date, reached Apr) | ✓ |
| 17 | Monthly cumulative cash (19, 22) | −3.93 … −25.18 … −22.54 | `Staged_G1M9` row 115 | ✓ |
| 18 | Capex and T2 commitment (19) | ₹17.2L; ₹14.7L = 10.4 + 3.1 + 1.2; ₹11.6L sunk | `Staged_G1M9` rows 107–109, 112 | ✓ |
| 19 | G&M and paid media (15) | ₹26.7L; ₹7.0L; 15/15/40/50/60×5/80/100/100 | `Staged_G1M9` B186, B187, row 18 | ✓ |
| 20 | Seat fit (6, 23) | 78 / 67 / 77 / 94% | `Staged_G1M9` row 33 | ✓ |
| 21 | Break-even enrolments (18) | 7.8/month (94/yr); ref. 5.5 (66), 4.4 (52) | `Staged_G1M9` B170–171; `Outlook_Base` 5.48; `Outlook_Conservative` 4.36 | ✓ |
| 22 | Gate CAC (17, 27) | ₹11.7k; 53% | `Staged_G1M9` B172 = 11,679; B174 = 0.53 | ✓ |
| 23 | Upside (19) | ₹66.7L / −₹0.8L / 91 / ₹26.5L | `Staged_G1M6` KPIs | ✓ |
| 24 | Base and Conservative ref. (19) | 71.0 / +6.8 / 89 / 24.6; 17.6 / −13.0 / 33 / 14.9 | `Outlook_Base`, `Outlook_Conservative` | ✓ |
| 25 | Downside runs (19, 29, 32) | −32.1 / 36.2; −22.2 / 25.4; −25.2 / 28.7; −30.4 / 33.9; −14.7 / 32.7; −14.5 / 32.4 | `Staged_Cons*`, `Staged_FalsePos*` B153 / B157 | ✓ |
| 26 | Exit / severance (19, 32) | ₹4.9L (3.1 + 1.8); ₹4.6L; ₹1.3L / ₹1.2L | `Staged_FalsePos` 493,500; `_M6` 455,500; `_Deep` 132,500; `_CutM5` 120,500 | ✓ (slide 29 ✗, S12) |
| 27 | Worst loss headline (2) | "₹33L" | economics §1A.2: ≈₹36L worst (₹36.2L) | ✗ M1 |
| 28 | 3-year view (3, 20) | 60.6 / 113.7 / 162.9; −2.8 / 16.3 / 39.3; −11.8 / 6.6 / 28.8 | economics §1A; `Sensitivity` row 28; `3yr_Scenarios` rows 51 and 53 | ✓ |
| 29 | Y3 decomposition (20) | 108.8 + 15.2 + 21.0 + 11.4 + 6.5 = 162.9; 33%; −₹0.4L / −₹10.9L | economics §1A.3 | ✓ |
| 30 | Step-2 response (20, 31) | +14.5 / +7.5 / +0.4; ≈21% | `Sensitivity` H28–H31, G32 = 0.206 | ✓ |
| 31 | Payback / IRR (3, 20) | M29 / M40; 46% / −10%; 87% / 33%; −₹6.3L at M36; ₹32.6L after-salary peak | `Payback_IRR` rows 6–12 | ✓ |
| 32 | Cumulative cash by year (20) | −22.5 / −12.8 / +22.9 | `3yr_Scenarios` row 57 (planning) | ✓ |
| 33 | Tornado swings (23, 31) | 19.7 / 12.6 / 10.9 / 6.5 / 5.1 / 2.5 / 1.1 / 0.7 | `Sensitivity` F6–F13 | ✓ |
| 34 | Adverse peak cash (31) | 33.3 / 29.7 / 29.6 / 27.2 / 26.0 / 24.8–26.2 / 25.7 | `Sensitivity` H column | ✓ (subtitle ✗, M5) |
| 35 | Named stresses (31) | −5.9 (+4.2) / −2.5 (−6.9) / −1.7 / −0.8, −2.0 | `Sensitivity` rows 20–24 | ✓ |
| 36 | Seat contribution (18) | 22.2 / 39.6 & 32.0 / 50.4 & 42.8; 44% / 74% | `Unit_Economics` rows 16–17, 19 | ✓ |
| 37 | Today after-CAC bar (18) | 0 | `Unit_Economics` E19 = 14.6 | ✗ M7 |
| 38 | Cohort break-even (18) | 67% (8 of 12) / 38% / 30% (3.6) | `Unit_Economics` E23–E24, J24, F23–F24 | ✓ |
| 39 | LTV:CAC (18) | 8.0x; ₹41.8k / ₹50.5k / ₹6.3k | funnel `Summary` C22, C24, C17, C25 | ✓ (basis note S14) |
| 40 | Funnel volumes (14) | 143 / 65.9 / 37.8 / 12.2 / 10.0 / 9.0 | admissions_funnel §10.1 ✓; `Funnel_Base` 189 incl. webinar, 64.2, 37.8, 12.0 | ~ S2 |
| 41 | Route CAC (17) | ₹5,682 / ₹7,234 / ₹5,878 | admissions_funnel §10.1 ✓; `Funnel_Base` ₹5,445 / ₹7,234; paid-route ₹4,826 | ~ S1 |
| 42 | Calibration (17) | 2.42; ₹37.6k; "1.9x" | economics §1A.7; `Summary` C9 ₹37,633; ratio is 1.9x only on ₹70k | ✗ M4 |
| 43 | Speed-to-lead (14) | ₹32k; −2.3 enrolments | `Speed_to_Lead` E12 = 32,410; E14 = 2.31 | ~ S3 |
| 44 | Fee ladder (13) | ₹999 / ₹4,999 / ₹39,900 / ₹60k → ₹75k → ₹90k (₹66.7k, ₹80k realised) / ₹4,999–19,999 (avg ₹10k) / ₹9,999 | recommended_strategy §6.1; `Unit_Economics` row 9 | ✓ |
| 45 | All-in cost (13) | 0.67 / 0.82 / 0.97 / 1.17 / 1.13 / 1.33 | `Unit_Economics` rows 50–54 | ✓ |
| 46 | GST swing (18, 23) | ₹10.9L (₹12.7L Base) | `Sensitivity` F13; economics §5 #2 | ✓ |
| 47 | ₹10L / ₹50L plans (3, 10) | 39.8 / +10.8 / 3.1 / 52; 99.3 / −3.0 / 44.2 | `Plan10L_BaseRates`, `Plan50L_BaseRates` KPIs | ✓ (basis ✗, M2) |
| 48 | BM unit economics (10, 12) | −₹932, 0.35; ₹29L, −₹7.4L, 62; 69; 2.4x; franchise ≈₹2L | `BM_Unit_Economics` H34, H43, C37–C38, C44, D62, C63, E57 | ✓ |
| 49 | Competitor fees (8) | Local ₹35–75k [EST]; ₹3,730–35,000; Lakmé ₹1.3–1.5L; DBA ₹2.25–5.95L ex GST; Pearl ₹4.45L; franchise ₹30–60L; ₹499 → ₹80k; 140+ / 110+ / 106+; Tanvi KG 4.9/125 | chandigarh_competitors §1, rows 17, 100, 179; national_competitors §5.1 (Pearl ₹4,44,778); recommended_strategy §3 Q3 | ✓ |
| 50 | Fee transparency (8, 9) | Only Zuri locally; 4 of 10 nationally; Orane CIDESCO IN543; 0% EMI Bajaj/LoanTap/SaveIN | chandigarh_competitors §1.6; national_competitors WS1, §1.5–1.6 | ✓ |
| 51 | Demographics (6) | GER 75.4 vs 28.5; NSDP 2.28x; Punjab 1.03x; pool 26x; PG ₹8–17.5k, 1 of 11 | chandigarh_market_analysis §1, table row 42, §8.3 (12,376 ÷ 471 = 26.3); S-CHD-11/06/20 | ✓ |
| 52 | NCR (10, 12) | rent ₹167 vs ₹47 (3.5x); 7.4x pool; ₹25k median | chandigarh_market_analysis rows 220, 257 (NCT only) | ✓ (N4 wording) |
| 53 | Customer facts (7) | 35%; ₹14–45k (median ₹25k); ₹1.2–6.2 LPA | customer_segments §1, §2 table; S-CUS-45, -01, -04 | ✓ (tag S7) |
| 54 | Urban Company / Blow / Mao Geping (10, 12, 26) | ~10 yrs to adj. EBITDA+; 22.75%; Blow liquidated; 9 campuses in 24 years | international_benchmarks §1 items 1–2, rows 16 and 199; S-INT-01/11/12/25 | ✓ |
| 55 | KPMG facts (25) | 5.44M, 0.68M/yr; 26.3M; ~60% unorganised; 6.16%; 47% / 41% / 90%; 1.3–2.1 lakh [CLAIM] | india_market_analysis §1 items 2–3, 13, 17–18, row 242 | ✓ |
| 56 | Execution figures (21, 22, 16) | ₹11.5L + ₹3.2L, ₹5.5L, −₹9.97L; hours 81…114 (Aug), 128 (May upside); cohorts 3.2 / 5.6 / 8.7 / 9.4 / 9.1 / 10.1; run-rates ≈8,000 / 19,800 / 35,900 | first_90_days §0 item 3; twelve_month_roadmap §7 rows 483–484; `Staged_G1M9` rows 143–148; technology_and_crm §4 table | ✓ (capacity note S9) |

**Numbers with no traceable source:** none found. Every material number traces to a workbook cell, a methodology section or a research S-ID. Three numbers trace only to the Growth file and disagree with the workbook (S1, S2), and one is a reviewer estimate disclosed as such (≈20% of the professional tier).

---

## 4. Internal consistency

| Metric | Where shown | Finding |
|---|---|---|
| Worst-case loss | 2 ("₹33L"), 19 (title "₹33–36L"; table ₹36.2 / ₹25.4 / ₹32.7L), 23 (≈₹33L, ≈₹36L), 29, 30 (floor ₹32–33L), 32 | **Inconsistent:** slide 2 understates (M1). The others agree. |
| ₹25L vs ₹25.2L | 2, 19 ("₹25L"); 3, 19 caption, 20 ("₹25.2L") | Consistent rounding, but "plan ₹25L" collides with "₹30L planned" (S5). |
| ₹1.88 cr vs ₹1.9 cr | 5 (SOM ₹1.88 cr; SAM-2 ₹1.9 cr) | No conflict: these are different metrics. The SOM basis differs from the planning case (S4). |
| Founder hours | 22 (81…114 Aug, 106 Oct), 23 (114 Aug; 128 May upside), 26 (114 / 128) | Consistent with roadmap §7. |
| Founder share | 11 (50 / 40 / 30 / 15 / 10% at M6–M36), 22 (50% Apr, 40% Oct), 28 (G1 ≤50%, G2 ≤30%) | Consistent. |
| Gate dates | G0 15 Jan (15, 21, 22, 27); KT-1a 26 Feb / 5 Mar (15, 22, 29); G1 26 Jul / end-Jul (12, 15, 22, 28, 33); G2 Jan–Apr 2028 (12, 27, 28); G3a ≥Oct 2028 (12); G3b ≥M30–36 (12) | Consistent. Calendar days check out (15 Jan and 5 Mar 2027 are Fridays; 26 Jul is a Monday). |
| D-list count | 24 title "Twelve… three this week" vs 11 rows / 13 codes / 6 due ≤ day 7 | **Inconsistent** (M6). |
| Trigger count | 29–30 "Thirteen" vs 15 rows | **Inconsistent** (S13). |
| Other counts | 8 "Five tiers" (6 rows); 32 "Five failure paths" (6 rows); 35 "four runs" (5 listed) | **Inconsistent** (S11, N6, S10). Correct counts: 2 "Six recommendations", 21/28 "all eight", 23 "Ten risks", 34 "fourteen questions". |
| KT-1a notice | 29 (≈₹1.2L) vs 32 (₹1.3L) | **Inconsistent** (S12). |
| Route-maths media | 17: ₹35k and ₹37.6k on the same slide; CAC ₹5.9k beside ₹11.7k "× 2.42" | **Inconsistent basis** (S1). |
| Tornado | 23 mini-chart = 31 full chart = economics §1A.5 | Consistent. |
| Seat fit 78 / 67 / 77% | 6, 23 | Consistent. |
| Cohort sizes | 22 = 28 = 33 | Consistent with each other; above station capacity (S9). |
| Price path | 2, 13, 22 (₹75k from M10 / 1 Aug; ₹90k at M16; ₹80k realised) | Consistent. |
| Destination pilot | 2, 11 (Aug–Sep 2027); 22 (16 Aug, 20 Sep) | Consistent with the roadmap. The 20 Sep date is a pre-work start that differs from the L3 intake calendar, which is acceptable. |

---

## 5. Evidence tags

- **Beauty market vs education market: clean.** ₹76,141 cr is always labelled "context only, ~200x the education TAM" (slides 5 and 25), and slide 25 lists it under "Do not use". No slide presents the beauty, salon, products or wedding market as the education market.
- **VERIFIED badges that are really CLAIM, ESTIMATE or judgement:**
  - slide 4: digital footprint, which is a tool-limited absence (S6);
  - slide 7: 35% parents, from a snippet-only news report (S7);
  - slide 26: H5 verdict, which is a judgement (S8);
  - slide 8: government diploma fees, which are aggregator-reported (N2);
  - slide 7: ₹14–45k, which are vendor-stated listings (N3);
  - slide 5: ₹76,141 cr, which is a projection (N1).
- **Correctly tagged:**
  - CLAIM: centre counts, franchise fees, Tanvi KG rating, MUA salaries, Airblack completion, the 2007 speed-to-lead study, Meta preference survey, certification throughput.
  - ESTIMATE: all model outputs, the local ₹35–75k band, the 26x pool.
  - HYPOTHESIS: prices, scores, the +60% non-paid uplift.
- **Untagged mixed-evidence visual:** the slide 8 price ladder (N2).

---

## 6. Readability (render: LibreOffice → PDF → pdftoppm 110 dpi)

- **Font floor:** an XML scan of all 35 slides and 13 charts found a minimum of 9.0 pt on slides (badges, footers, grid markers) and at least 10 pt in charts. There is no `normAutofit` font scaling. **Nothing is below the ~9 pt threshold.**
- **Densest slides at full resolution:**
  - Slide 19: legible. The ₹28L and ₹30L dashed lines nearly coincide (N9).
  - Slide 21: legible, no overlaps.
  - Slide 22: legible. Gate marker lines cross the "5.6", "−9.97" and "10.1" values, and the 26-Feb review diamond sits in March (N9).
  - Slide 23: legible. The 10-row table and mini-tornado fit.
  - Slide 24: legible. The 11 decision rows fit.
  - Slide 2: clean.
  - Slide 3: clean.
  - Slide 14: funnel bars not to scale; the QL bar is longer than the lead bar (S19).
- **Other pages:** no clipping or overflow. Slide 18 is missing a bar because of the data error (M7). On slide 33 a value label touches the G1 line (N9).

---

## 7. Narrative (brief's six questions)

| Question | Answered on | Assessment |
|---|---|---|
| What is the opportunity? | 4–7 (Opportunity) | Yes. The TAM, SAM and SOM tree is scoped to education. It is not in the exec summary (S17). |
| What did we find? | 8–9 (Findings), plus 4 and 6 | Yes. "Nobody publishes fees" overreaches (S11). |
| What should we do? | 2, 10–16 (Recommendation) | Yes. Six recommendations with explicit "not doing" items. |
| Why? | 9, 10, 17–20 | Yes. Options scored, economics shown. The slide 10 title overclaims (M3). |
| What will it take? | 3, 17–22 | Yes. Tranches, the cash line, the downside table and the team. |
| What happens next? | 21–24 | Yes. The deck **ends on founder decisions** (slide 24), not a thank-you. The title count is wrong (M6). |

**Titles:**
- 20 of the 24 core titles are assertions.
- Slides 9, 11, 13 and 16 are noun phrases (N10).
- Three titles are assertions their own slide contradicts (slides 8, 10 and 24).
- The appendix titles (A1–A9) are assertion-style. A3 and A4 repeat their titles with "continued (2 of 2)", which is acceptable.

---

## 8. Upstream corrections to make at the same time

These errors are in the sources, so they will reappear in any document regenerated from them:
- recommended_strategy.md §1(4) and §5: "up to ₹33L" sits beside ₹36L.
- recommended_strategy.md §3 Q6: "₹1.0L… about 1.9x". It is 2.7x; the 1.9x applies to ₹70k.
- recommended_strategy.md §1(10) and §9.1 D2: before-salary and after-salary figures are compared.
- recommended_strategy.md §7.3 KT-1a: "team notice ≈₹1.2L" (deep cut is ₹1.3L).
- economics §1B row 25: "+₹32k media" (₹15k is media).
