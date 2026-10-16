# Economics and Market Sizing: Assumptions and Methodology

**Client:** Priyanka Nanda Makeup Academy (PNA), Chandigarh · **Workstream:** Economics & Market Sizing (Gate C) · **Prepared:** 2026-10-16 · **Agent:** Economics and Market Sizing Agent (Opus)

**Workbooks:** `economics/market_sizing_model.xlsx` · `economics/business_forecast.xlsx` · `economics/funnel_economics.xlsx`
**Build:** `economics/build_scripts/run_all.py` builds the three workbooks in order with openpyxl and recalculates each with LibreOffice headless. At the last build there were **0 formula errors**, and every sheet named `Checks` returned TRUE. Formula counts: sizing 508, funnel 1,002, forecast ≈27,000 (most of these sit in the 15 sensitivity re-runs).

**Tags:** [FACT] sourced · [CLAIM] first-party or unverified · [EST] our estimate (arithmetic shown) · [HYP] hypothesis to validate · [FOUNDER] founder-stated · [REC] recommendation.

> **Status of every PNA number.** PNA's actual revenue, fees, costs, margins and enrolment mix are **not known**. The baseline is the founder's statement of fewer than 60 students a year (CA-01, base 50) priced at assumed fees (CA-02). It is labelled "illustrative" wherever it appears. This includes the Business Model agent's "about ₹0.3 crore today": that figure is CA-01 × CA-02 (50 × ₹60k incl. GST), an estimate and **not reported revenue**. On our mix (60% career courses at CA-02, 40% short courses at ₹8k) the illustrative figure is ₹19.6 lakh quoted, or ₹16.6 lakh ex-GST.

---

## 1. Headline numbers (for other agents and slides)

All rupee figures are nominal. "L" = ₹ lakh and "cr" = ₹ crore. **Market sizes** use quoted fees (GST-inclusive where the market quotes them that way). **PNA forecasts** are ex-GST unless stated.

### 1A. STAGED PLAN (recommended): primary financial view for the deck

*Revised 2026-10-16 after recommended_strategy.md §10 rows 15–16. The recorded hybrid library moves to T3, and a studio weekend/evening slot runs from M5. Earlier figures are kept in the superseded note below.*

**Definition** (recommended_strategy.md §5–§7; sheets `Staged_G1M6` and `Staged_G1M9`). The run uses Base rates and the Base (₹30L) plan, released in tranches:
- **Before G1 (T1 Prove):** Base team from M1; ₹10L-plan capex; studio stations only, **plus a weekend/evening batch slot from M5** (2.5 slots a day; ₹8k/month running cost; A-ECO-154..156 [HYP]).
- **T1 media:** paid media follows the channel-plan ramp, capped at ≤₹15k/month until G0 and ≤₹60k/month until G1.
- **T1 recording:** ₹1L basic recording of theory modules in M3.
- **From G1 + 1 month (T2 Build):** space move (~1,300 sq ft); media ramp to ₹1.0L/month; second counsellor (0.5 FTE); pop-up pilots. The Destination pilot runs on live-online pre-work.
- **Deferred to Year 2 (T3, after G2):** the **recorded hybrid library (₹3.5L)**, shown in Year-2 capex.
- **Price:** two-step path. Today's fee CA-02 runs until price step 1 at G1 + 1: ₹75k list, ₹66.7k realised. Price step 2 at M16: ₹90k list, ₹80k realised.
- **Founder share of contact hours:** ≤40% at M12.
- **Timing:** M1 = Nov 2026; all values ex-GST.

| Metric | **Staged Plan: G1 at M6, move M7 (default)** | Staged Plan: G1 at M9, move M10 (latest G1) |
|---|---|---|
| Year-1 revenue | **₹66.5L** | ₹59.9L |
| Year-1 EBITDA (before founder salary) | **+₹2.2L** (3%) | −₹0.4L |
| Year-1 EBITDA after a ₹75k/month founder-role salary | **−₹6.9L** | −₹9.4L |
| Cash need at the end of T1 (peak to the month before G1; T1 cap ₹15L) | **₹11.0L** (M5): inside the cap | ₹11.0L (M8): inside the cap |
| Peak cumulative cash need, Year 1 | **₹25.6L** (reached M6) | ₹23.8L (reached M9) |
| Headroom vs ₹30L planned / vs ₹35L authorised (incl. ₹5L timing contingency) | **₹4.4L / ₹9.4L** (KT-11 warning line ₹28L not reached) | ₹6.2L / ₹11.2L |
| Capex + deposits, Year 1 | ₹17.2L | ₹17.2L |
| Growth & marketing spend, Year 1 (Growth §10 scope); of which paid media | ₹28.5L; ₹8.2L | ₹26.8L; ₹7.2L (held at ₹60k until G1) |
| Month seat capacity first binds | **M8** (the M5 studio slot removes the M6 bind); in the new space at peak season 73–95% of demand fits in M8–M10 | **M7**; 67–78% of demand fits in M7–M9 before the move |
| Career enrolments, Year 1 (L2 + L3 new students) | **91** | 80 (about 11 lost to the later move) |
| First month EBITDA ≥ 0 | M6 | M6 |
| Break-even career enrolments at the M12 cost base (step-1 fee) | 6.5/month (78/yr) | 6.5/month |
| Gate metrics, months 7–12: effective media CAC; fully loaded acquisition / career revenue | ₹10.6k (SG4 amber); 49% (inside the new 40–50% amber band) | ₹10.5k; 55% (red) |
| 3-year revenue Y1 / Y2 / Y3 | **₹66.5L / ₹115.8L / ₹165.3L** | ₹59.9L / ₹112.7L / ₹161.7L* |
| 3-year EBITDA, before founder salary | **₹2.2L / ₹13.7L / ₹43.5L** | −₹0.4L / ₹17.4L* / ₹40.3L |
| 3-year EBITDA, after founder-role salary (₹9L/yr, +8%/yr) | **−₹6.9L / ₹4.0L / ₹33.0L** | −₹9.4L / ₹7.6L / ₹29.8L |
| Year-2 capex (includes the deferred ₹3.5L recorded library) | ₹6.5L | ₹6.5L |
| Year-3 founder share of contact hours | ~12.5% | ~12.5% |

\*In the M10 variant, Year 2 is driven by pre-capacity demand for the months before the move (`y2d` row). Treat Years 2–3 of the two variants as converging, at about ₹113–116L in Year 2 and ₹162–165L in Year 3.

**Reading.**
1. The Staged Plan caps money at risk before proof at about ₹11L, inside the ₹15L T1 authorisation.
2. **Deferring the recorded library and adding the M5 studio slot together cut Year-1 peak cash by ₹3.2L**, from ₹28.8L to ₹25.6L. That leaves ₹4.4L of headroom on the ₹30L plan before the ₹5L contingency.
   - The peak is about ₹1.0L above the unstaged Base bundle (₹24.6L), because the two-step price path realises ₹66.7k instead of ₹80k from M7. That costs about ₹4.9L of Year-1 EBITDA (see 1C).
   - Cash excludes income tax, GST timing, working capital and any founder draw. KT-11 should therefore be read against actual monthly cash, not this model.
3. **The studio slot is worth having in both variants.** In the default case it adds about 1.3 enrolments and +₹0.3L of Year-1 EBITDA, net of its cost. In the latest-G1 case it recovers about 5 enrolments and ₹1.4L of EBITDA. A later G1 now costs about 11 enrolments and ₹2.6L of Year-1 EBITDA (it was about 15 and ₹3.7L), so the case for the M6 default rests on Year-1 profit and proof timing rather than on capacity.
4. **Marketing totals match the re-aligned channel plan.**
   - Paid media is ₹4.1L / ₹8.2L / ₹14.9L, the plan ramp exactly.
   - Growth-scope spend is ₹9.7L / ₹28.5L / ₹49.8L, against the Growth agent's ≈₹9.6L / ₹28.6L / ₹48.1L.
   - The Aggressive gap comes from pop-ups and rewards being modelled as variables.

> **Superseded figures (kept for the audit trail).**
>
> **Version 2** (media re-aligned; recorded library in T2 at G1 + 1; no studio slot). Each pair is G1 M6 / G1 M9:
> - Year-1 revenue ₹65.9L / ₹57.3L; EBITDA +₹1.9L / −₹1.8L; after founder salary −₹7.1L / −₹10.8L.
> - T1 cash ₹10.9L / ₹10.9L; peak cash ₹28.8L / ₹28.2L (headroom ₹1.2L / ₹1.8L vs ₹30L); capex ₹20.7L / ₹20.7L.
> - Seats bound at M6 in both; career enrolments 89 / 75; first EBITDA ≥ 0 at M7 / M8.
> - 3-year revenue ₹65.9L / ₹116.0L / ₹165.5L (M6) and ₹57.3L / ₹112.6L / ₹161.7L (M9).
> - EBITDA ₹1.9L / ₹13.8L / ₹43.6L (M6) and −₹1.8L / ₹17.3L / ₹40.3L (M9).
> - After founder salary −₹7.1L / ₹4.1L / ₹33.1L (M6) and −₹10.8L / ₹7.6L / ₹29.8L (M9).
>
> **Version 1** (before the media re-alignment), G1 M6 / G1 M9:
> - Revenue ₹66.6L / ₹57.4L; EBITDA +₹1.6L / −₹2.4L.
> - Peak cash ₹29.3L / ₹28.8L; T1 cash ₹11.4L.

### 1B. Scenario bundles (original; unchanged by the Gate D additions)

| # | Metric | Period / unit | Conservative / Low | **Base** | Aggressive / High | Source cell |
|---|---|---|---|---|---|---|
| 1 | TAM: India paid makeup-led training tuition | ₹ cr/yr, run-rate | 80 | **388** (≈₹390 cr; CA-06) | 1,373 | sizing `TAM_India` |
| 2 | India online/short-course layer (not in TAM) | ₹ cr/yr | 3 | **22.5** | 120 | sizing `TAM_India` |
| 3 | India makeup-led paid learners | learners/yr | 20,100 | **56,800** | 126,000 | sizing `TAM_India` |
| 4 | **Tricity makeup-led market, reconciled** (replaces CA-05 for planning) | ₹ cr/yr; learners | 1.45; 484 | **3.27; ≈730** | 5.28; 879 | sizing `Tricity_Recon` §5 |
| 5 | Tricity as share of India base TAM | % | 0.37% | **0.84%** | 1.36% | sizing `Tricity_Recon` |
| 6 | **SAM core** (tricity + regional destination + hybrid + working-artist CPD) | ₹ cr/yr | 2.3 | **7.8** | 24.2 | sizing `SAM_North` |
| 7 | SAM online layer (North-reachable) | ₹ cr/yr | 0.75 | **7.9** | 54 | sizing `SAM_North` |
| 8 | **SOM: PNA Year-3 training revenue** (quoted incl. GST) | ₹ cr, FY ending Oct-2029 | 0.41 | **1.88** | 3.83 | sizing `SOM_PNA` |
| 9 | SOM as % of SAM core; PNA share of tricity makeup-led learners (Y3) | % | 17%; 7% | **22%; 13%** | 14%; 11% | sizing `SOM_PNA` |
| 10 | L3 Pro programme, after price step: realised fee / contribution per seat before CAC / after CAC | ₹ per student, Base rates | — | **₹80k list-realised (₹67.8k ex-GST) / ₹50.4k (74%) / ₹42.8k** | — | forecast `Unit_Economics` |
| 11 | L3 at today's assumed fee (CA-02 ₹60k incl. kit): contribution before CAC | ₹ per student | — | **₹22.2k (44%)** | — | forecast `Unit_Economics` |
| 12 | Breakeven fill per 12-seat L3 cohort (trainer + occupancy + CAC) | % of cap | — | **30% (3.6 students) after the step; 67% (8 students) at today's fee** | — | forecast `Unit_Economics` |
| 13 | Career student (L2/L3 mix), funnel view: first-course contribution / 24-month LTV / blended CAC / LTV:CAC | ₹, steady state | ₹7.9k / ₹10.9k / ₹13.1k / 0.8x | **₹41.8k / ₹50.5k / ₹6.3k / 8.0x** | ₹59.9k / ₹78.1k / ₹2.8k / 27.6x | funnel `Summary` |
| 14 | **Break-even career enrolments** at the month-12 cost base | per month (per year) | 4.4 (52) | **5.5 (66)** | 4.9 (58) | forecast `Outlook_*` KPIs |
| 15 | **12-month revenue** (Nov-26 to Oct-27) | ₹ L ex-GST | 17.6 | **71.0** | 134.8 | forecast `Dashboard` |
| 16 | **12-month EBITDA** (before any founder salary) | ₹ L | −13.0 | **+6.8 (10%)** | +37.2 (28%) | forecast `Dashboard` |
| 17 | Memo: 12-month EBITDA after a ₹75k/month founder-role salary | ₹ L | −22.0 | **−2.2** | +28.2 | forecast `Dashboard` |
| 18 | **Peak cumulative cash need, Year 1** (vs envelope CA-03) | ₹ L | 14.9 (vs 10; **over by 4.9**) | **24.6 (vs 30; headroom 5.4)** | 28.1 (vs 50) | forecast `Dashboard` |
| 19 | Capex + deposits, Year 1 | ₹ L | 0.5 | **19.7** | 27.0 | forecast `Dashboard` |
| 20 | Career enrolments, Year 1 (new L2 + L3 students) | students | 33 | **89** | 124 | forecast `Dashboard` |
| 21 | Envelope test at Base rates: ₹10L plan / ₹50L plan | 12-month revenue; EBITDA; peak cash (₹ L) | ₹10L plan: 39.8; +10.8; 3.1 | — | ₹50L plan: 99.3; −3.0; 44.2 | forecast `Plan10L_BaseRates`, `Plan50L_BaseRates` |
| 22 | **3-year revenue** (Y1 / Y2 / Y3) | ₹ L ex-GST | 17.6 / 26.6 / 36.7 | **71.0 / 118.8 / 165.5** | 134.8 / 235.7 / 334.6 | forecast `3yr_Scenarios` |
| 23 | 3-year EBITDA (Y1 / Y2 / Y3) | ₹ L | −13.0 / −7.2 / −9.6 | **6.8 / 16.5 / 43.6** | 37.2 / 96.4 / 162.7 | forecast `3yr_Scenarios` |
| 24 | Top sensitivities: swing in Base Year-1 EBITDA | ₹ L | — | **Fees −20%/+15%: 23.0 · Conversion ±20%: 15.1 · GST charged on top vs absorbed: 12.7** · rent ₹130/₹47 per sq ft: 8.7 | — | forecast `Sensitivity` |
| 25 | Speed-to-lead: cost of missing the <5-min SLA (Base) | per month | — | **+₹32k media for the same enrolments, or −2.3 enrolments (≈₹0.97L contribution) at the same budget** | — | funnel `Speed_to_Lead` |

### 1C. Gate D model additions (recommended_strategy.md §11.3)

| # | Item | Result | Where |
|---|---|---|---|
| 2 | **Two-step price path.** Step 1: ₹75k list (₹66.7k realised) at proof gate 1. Step 2: ₹90k list (₹80k realised) at proof gate 2 (M16). | **Base timing** (step 1 M7): Year-1 revenue ₹65.9L, EBITDA +₹1.9L, peak cash ₹25.8L. That is −₹5.1L revenue and −₹4.9L EBITDA vs the single step to ₹80k realised at M7. Year-2 realised fee averages ₹76.7k (3 months at step 1, 9 at step 2). **Conservative timing** (step 1 M10): identical to the Conservative bundle, because its list is ₹75k in both steps (realised ₹65k). Unit view: an L3 seat at step 1 contributes ₹39.6k before CAC (₹32.0k after); cohort breakeven fill is 38%. | `Base_TwoStep`, `Conservative_TwoStep`; `Unit_Economics` column J |
| 3 | **Founder share ≤40% at M12** (vs ≤30%) in Base | **No trainer-cost or EBITDA effect in Year 1.** Trainer cost stays ₹9.8L and EBITDA +₹6.8L, because headcount is lumpy: 1 lead trainer + 2 assistants either way at M12. The founder carries about 26 more contact hours a month at M12 (0.10 × 3 batch-slots × 4 h × 22 days). Year 2 on the Gate D path averages 29% vs 15%, and the M7 Staged run still needs the same trainer headcount as Base (₹17.4L). The benefit is conversion and price protection while proof is built (A-GRO-25), which the model does not credit. | `Base_Founder40`; `3yr_Scenarios` |
| 4 | **EBITDA after founder salary, Years 2–3** (₹75k/month, +8%/yr) | Base: −₹2.2L / +₹6.8L / +₹33.1L. Conservative: −₹22.0L / −₹17.1L / −₹20.5L. Aggressive: +₹28.2L / +₹86.7L / +₹152.3L. Staged Plan (G1 M6): −₹6.9L / +₹4.0L / +₹33.0L. | `3yr_Scenarios` row "Memo: EBITDA after a founder-role salary" |
| 5 | **Today's PNA share of tricity makeup-led learners.** **ILLUSTRATIVE**: CA-01 ÷ reconciled learners; to confirm with the founder data pull (V1) | **≈7% base** (50 ÷ 726). Range 3–12% (30 ÷ 879 to 60 ÷ 484). Counts all PNA students against all makeup-led learners, both including short courses. | `market_sizing_model.xlsx` → `SOM_PNA` |
| 6 | **Student all-in cost** (tuition + optional kit + living/travel; GST-inclusive as families see it) | At step 2 (₹90k list), with / without the ₹20k optional kit: **Weekday, tricity resident ₹1.17L / ₹0.97L**; Weekday, out-of-town 12-week stay ₹1.54L / ₹1.34L; Flex, tricity resident ₹1.17L / ₹0.97L; **Destination ₹1.33L / ₹1.13L**. Destination saves an out-of-town family about ₹21k vs a 12-week stay; it is 13% above a resident's all-in, vs 31% for the 12-week stay. At step 1 (₹75k), the without-kit figures are ₹0.82L resident and ₹0.98L Destination. At today's assumed fee (₹60k, kit included) they are ₹0.67L resident and ₹0.83L Destination. | `Unit_Economics` all-in block |
| 7 | **Cash-cap test (Conservative)** | Cumulative cash need reaches **₹10L in M7 (May 2027)**, ₹13.4L in M9, ₹14.5L in M11 and **₹14.9L in M12 (Oct 2027)**: the ₹15L cap is effectively reached at the end of Year 1. It keeps rising in Year 2 (₹25.1L at end-Year 2). **Time the T1 review no later than M9 (Jul 2027)**; by then a Conservative trajectory has used about ₹13.4L of the ₹15L T1 authorisation. | `Outlook_Conservative` KPI rows; `Dashboard` |

**Model mechanics added.** Every outlook sheet has four run options in P3:S4: Staged (0/1), G1 month, price path (1/2) and founder path (1/2). The defaults reproduce the original bundles exactly. `Outlook_Selected` reads them from `Assumptions!D5:J5`, alongside the scenario selector, so any combination can be run without copying sheets. New inputs:
- A-ECO-106: proof-gate-2 month.
- A-ECO-160: ₹75k step-1 list fee.
- A-BM-10b-G / -10c-G / -10d-G: Gate D founder path.
- A-ECO-151 / -152 / -153: T1 media cap, T1 recording, T1 cash cap.
- A-ECO-154 / -155 / -156: studio weekend/evening slot (cost, slots per day, start month).
- A-ECO-170: optional kit.
- A-BM-12a/b: living cost by format.
- A-ECO-171/172: commute and class days.

**How to read the scenarios.** Each scenario bundles **rates** and a **plan**:
- **Rates** are unit prices, conversion and wages. Conservative uses adverse values; Aggressive uses favourable ones.
- **Plan** is what the ₹10L / ₹30L / ₹50L envelope buys: team, space, media and launches.

Two cross runs separate the two effects. Each runs one plan at **Base rates**:
- ₹10L plan: it is profitable in Year 1 but grows career volume only to about 52 students a year.
- ₹50L plan: it adds capacity, team and media ahead of demand, so Year-1 EBITDA is about −₹3L and the cash need is about ₹44L.

The Conservative bundle is a **no-intervention stress case**. In practice, failing gate G1 at M9–12 would hold spend at test level (Growth §9). Conservative Years 2–3 already include that stop-loss on media and a part-time operations lead.

---

## 2. Reconciliation: tricity (CA-05) vs India (CA-06): **RESOLVED**

**The problem.** CA-05 (tricity ₹5.7 cr) is 1.46% of CA-06 (India ₹390 cr). The tricity holds only 0.21% of India's women aged 17–35. A population-and-affluence share gives about 0.5%. Measured in learners, the gap is 10.5x: 2.67 per 1,000 women in CA-05 against 0.25 per 1,000 in CA-06.

**Scope differences found (`Tricity_Recon` §6, base case).**

| Factor | Multiplier | Basis |
|---|---|---|
| Course scope: CA-05 counts makeup **and beauty-artistry** learners at a diploma fee; CA-06 counts makeup-led only (25% of paid beauty learners) | 1.43x (= 1/0.70, A-ECO-06) | [HYP] |
| Outstation inflow: counted in the tricity, but in home states nationally | 1.33x (= 1/(1 − 25%), A-CHD-04) | [HYP] |
| Beauty-workforce intensity: KPMG share of state workforce, women-weighted (Chandigarh 6.16%, Punjab 3.64%, Haryana 3.44% vs India 2.41%) | 1.90x (matches the income weight A-CHD-06 of 1.85 within 3%) | [FACT] inputs, [EST] index |
| Urban concentration: makeup academies are urban; tricity ~72% urban vs India ~36%; k = 5x urban/rural participation | 1.59x | [EST]/[HYP] |
| **Explained** | **5.76x** | |
| **Unexplained residual** | **1.82x** | Local evidence (CA-05's bridal-MUA pipeline; a supply count of ~20 named tricity providers) sits above the national top-down |

**Three harmonised methods (makeup-led scope, tricity fee ₹30k / 45k / 60k).**

| Method | Base learners | Base ₹ cr |
|---|---|---|
| A: top-down. India learners × population share × intensity × urban factor ÷ (1 − inflow) | 484 | 2.18 |
| B: CA-05 restated to makeup-led scope (× 70%) | 879 | 3.96 |
| C: supply-side count. 7 chain centres × 45 + 5 institutes × 40 + 8 founder-led × 25 + 111 tutor listings × 0.9 | 815 | 3.67 |
| **Adopted: Low = min, Base = mean, High = max of the three base cases** | **484 / 726 / 879** | **1.45 / 3.27 / 5.28** |

**Resolution adopted across all workbooks.**
1. One scope everywhere: learner-paid, private, makeup-led training tuition at quoted fees. It excludes non-makeup beauty courses, government-funded places, kits, products and salon or bridal services.
2. **CA-06 is retained unchanged** as the India TAM (₹80 / 390 / 1,370 cr). The online layer is reported separately.
3. **CA-05 is not a makeup-led number.** For planning, the tricity market is the reconciled **₹3.3 cr base (≈730 learners; band ₹1.4–5.3 cr)**. That is **≈0.84% of the India base TAM**. CA-05's ₹5.7 cr stays as the "makeup + beauty-artistry" upper reference.
4. The remaining ~1.5x residual kept in the base is the local evidence. It implies either that CA-06's base is conservative for urban North India (Method 1 alone, ₹522 cr, would close most of it) or that the tricity is a makeup-academy hot-spot. Neither changes the planning conclusion.
5. **Consequence.** At a 15–25% share, tricity tuition alone supports roughly ₹0.5–0.8 cr for one centre. Growth beyond that has to come from regional destination students, hybrid, working-artist CPD and online layers. The Base plan reaches **13% of tricity makeup-led learners by Year 3**, inside the Chandigarh agent's 10–30% single-centre band. Its revenue share (26%) runs ahead of its learner share because PNA's realised fee is about 1.8x the tricity average.

**Market-sizing tree (Base; Low–High in brackets; ₹ cr/yr).**

```
TAM  India paid makeup-led tuition ............. 388  (80–1,373)   + online/short layer 22.5 (3–120)
 └─ [context] 5-state North slice @ 7.65% ......  30  (6–105)      (KPMG workforce proxy; not used directly)
     └─ SAM  serviceable by a Chandigarh-led academy ... 15.7 (3.0–78)
          ├─ SAM core ............................... 7.8  (2.3–24)
          │   ├─ SAM-1 Tricity (reconciled) ........ 3.3  (1.5–5.3)   ~730 learners
          │   ├─ SAM-2 Regional destination, net .... 1.9  (0.2–10.6)  15% of PB/HR/HP/J&K learners reachable, less inflow already counted
          │   ├─ SAM-3 Hybrid beyond reach .......... 1.4  (0.2–5.8)   8% hybrid-willing
          │   └─ SAM-4 Working-artist CPD ........... 1.2  (0.4–2.5)   4,000 artists x 30% x ₹10k (scope extension: repeat buyers)
          └─ SAM-5 Online layer (North-reachable) ..... 7.9  (0.8–54)
               └─ SOM  PNA Year-3 training revenue ... 1.88 (0.41–3.83)  = 22% of SAM core; 13% of tricity learners
                    Today (illustrative, NOT actual) .. 0.20
```

Context only, and **never TAM**: India Beauty & Salon services ₹76,141 cr (2025P), makeup products about USD 1.5 bn, bridal makeup service spend about ₹2,880 cr. The core TAM is 0.5% of the Beauty & Salon sector (`Context_NotTAM`).

---

## 3. Conflicts with the Growth and Business Model agents, and the consistent set adopted

| # | Conflict | Resolution used in all three workbooks |
|---|---|---|
| 1 | **Flagship price.** BM ₹80k (A-BM-02) vs Growth ₹90k (A-GRO-06) | Both kept, with different meanings. **₹90k is the list tuition** (A-GRO-06: ₹75k / 90k / 1.2L). **₹80k is the realised fee** after taster/L2 credits, early-bird and referee discounts (A-BM-02: ₹65k / 80k / 1.0L), a realisation of about 89%. **Revenue always uses the realised fee.** Until the proof gate (first outcomes report + ≥30 reviews), PNA charges today's fee CA-02 (₹40k / 60k / 75k, incl. kit). The step happens in **M10 / M7 / M5** (A-ECO-104). Fees are assumed GST-inclusive (revenue = fee ÷ 1.18). |
| 2 | **Programme naming and duration.** Growth's 7-week Fast-track vs BM's hybrid intensive | One product, **L3 Professional Bridal Makeup Artist Programme**, in three formats: **Weekday** (12 weeks, ~3 seat-months); **Flex** (~20 weeks part-time, ~3 seat-months equivalent); and **Destination** (4 weeks of online pre-work + a 5–6-week full-day Chandigarh intensive, ≈2.5 seat-months, price parity). Destination replaces both "Fast-track" and "hybrid intensive". In Year 1, out-of-town L3 students switch to Destination from the launch month (A-ECO-128: none / M10 / M8). The incremental regional engine (BM Option G) starts in Year 2 after gate G2. |
| 3 | **Gate naming.** BM stage gates G0/G1/G2/G3a/G3b vs Growth's five scale-up gates G1–G5 | Growth's gates are read as **spend gates SG1–SG5**. Mapping: **SG1 Tracking + SG2 Follow-up discipline** fall inside **BM G0** (M3: baseline instrumented). **SG3 Capacity + SG4 Unit economics + SG5 Product proof** fall inside **BM G1** (M9–12: flagship proven). BM G2 (M15–18) releases the regional engine. G3a and G3b release satellite and franchise. Spend gates govern the media ramp month to month; stage gates govern investment stages. |
| 4 | **Unit-economics gate threshold.** Growth proposed media CAC ≤ ₹9k per paid enrolment and fully loaded CAC ≤ 25% of revenue; BM G1 proposed CAC ≤ 12% of realised fee and payback ≤ 3 months | **Re-derived from the model** (see §5.4): **media CAC per paid career enrolment, counting all career-attributable paid media: green ≤ ₹9k, amber ₹9–12k, red > ₹12k.** ₹12k is roughly where LTV/CAC falls to about 3 at today's ₹60k fee. **Fully loaded acquisition ≤ 40% of career revenue in Year 1, ≤ 30% from Year 2.** The Base plan runs at ₹10.6k (amber) and 42% in months 7–12. The Staged Plan runs at ₹10.6k and 49%, because of the lower step-1 fee. The 25% target would need about 17.5 career enrolments a month with the Base growth team, so as written it would keep spend at test level all year. Route-only CAC from CPLs (₹4.8k Base) understates the true cost by about 2.4x, because the Growth budget includes awareness and retargeting (A-ECO-51). BM G1's "CAC ≤ 12% of realised fee" should be read on the route-level CAC (Base 7%). Payback ≤ 3 months passes in every case except Conservative (5.0 months). |
| 5 | **"~₹0.3 crore today"** (BM) | Labelled as CA-01 × CA-02, an estimate and not actual revenue (`Unit_Economics` baseline block; `SOM_PNA`). |
| 6 | Growth A-GRO-01 base (10 career enrolments/month from M7) was set as "≈10% of CA-05" | Kept as the plan target. Against the reconciled market it implies **13% of tricity makeup-led learners by Year 3** (7% of CA-05 learners). That is ambitious but inside the plausible band. It also implies about 3x today's career volume in Year 1, so it is a **gated plan, not a forecast of what happens without execution**. |
| 7 | Growth budget vs funnel-required media | The Growth paid budget (Base ₹1.0L/month steady state, ~70% career-attributable) is about 1.9x the funnel-required career media at Base CPLs (₹37.6k/month). We keep the Growth budget as the plan. An overhead factor (A-ECO-51 = 2.42) is calibrated so the Base budget exactly buys the Base paid target. Conservative and Aggressive inherit the same factor. |
| 8 | Growth cost-line conventions | For CPL, conversion and wage rates we map Growth's Low/Base/High per its stated rule (for cost lines, "High" = Conservative). For **plan lines** (team, martech, website) we use the values Growth actually budgeted in §10 (e.g. counsellor ₹20k in the ₹10L plan), because §10 is what the founder would fund. In Aggressive, secondary product prices (L2, L4, L1-S5, L5) use the **midpoint of Growth base and high**, to avoid stacking every upside. |
| 9 | BM directional Y3 (₹0.55 / 1.32 / 2.36 cr) and Ludhiana numbers | Our Base Y3 is ₹1.66 cr ex-GST (₹1.88 cr quoted training-only). It is higher because A-GRO-01 drives more career volume (132 vs BM's 105 P1). Our Conservative is lower (adverse rates and the proof gate at M10). For Ludhiana, BM's contribution figures (₹56k destination, ₹62.8k owned) are pre-GST and exclude trainer standard cost. Ours are ₹35.8k and ₹47.1k. That makes BM's indifference rules more demanding: an owned centre beats destination only above about 69 local students (BM: 55) when 10 would travel, and a partner satellite needs more than 2.4x N_dest (BM: 1.7x). The direction of BM's conclusion is unchanged. |
| 10 | BM asked for a 36-month monthly model | The brief specified 12 months monthly plus directional Years 2–3. We provide that, with Year 2 built from the de-seasonalised H2 run-rate. |

---

## 4. Methodology by workbook

### 4.1 `market_sizing_model.xlsx`

**Sheets:** README · Assumptions (Low/Base/High; selector in C3 drives the "Selected" column and the Sizing_Tree) · TAM_India · Tricity_Recon · SAM_North · SOM_PNA · Sizing_Tree · Context_NotTAM · Checks.

**TAM_India** re-computes `india_market_analysis.md` §8 live:
- **Method 1 (pipeline):** certified × (1 ÷ organised share) × paid share × makeup-led share × blended fee. The blended fee is Σ tier share × tier fee, A-IND-05a..h.
- **Method 2 (supply):** chain centres × learners per centre × (1 + independent multiple) × makeup-led share × blended fee.
- **TAM** = mean of the two methods. The checks reproduce the research figures: M1 ₹522.1 cr; mean ₹387.7 cr.

**Tricity_Recon** is the reconciliation in §2. The intensity indices are computed from KPMG state shares, so A-ECO-01 (base) and A-ECO-05 (base) are formulas, not typed values.

**SAM_North** builds five components on one participation chain:
- **SAM-1** = reconciled tricity.
- **SAM-2** = rest-of-region learners × reachable share, less the outstation learners already counted in SAM-1. Rest-of-region learners = India learners × population share × intensity 1.30; region is PB/HR/HP/J&K excluding the tricity.
- **SAM-3** = non-reachable regional learners × hybrid-willing share × hybrid fee.
- **SAM-4** = working artists in reach × CPD participation × annual spend. This is a scope extension: repeat buyers are not in the TAM's entrant-based count.
- **SAM-5** = India online layer × North-reachable share.
- **Cross-check:** the bottom-up 5-state market (₹21.6 cr at tricity fees) and TAM × 7.65% restated at the tricity/India fee ratio (₹19.6 cr) agree within about 10%.

**SOM_PNA** takes Year-3 revenue by layer from `business_forecast.xlsx` (pasted by `run_all.py`) and grosses it up by 18% GST. It reports revenue shares and learner shares, where learner share is the primary test.

### 4.2 `funnel_economics.xlsx`

**Sheets:** README · Summary (Cons/Base/Aggr side by side + FEED rows) · Assumptions · Funnel_Selected · Funnel_Conservative / _Base / _Aggressive · Speed_to_Lead · Popup_Events.

- **Target-driven, per steady-state month** (Growth §10 method): A-GRO-01 × route mix (A-GRO-03) gives enrolments by route. Enrolments ÷ (product of the four stage rates, A-GRO-18..22) gives leads. Leads × CPL gives spend.
- **Routes:**
  - Meta→WhatsApp CTWA: CPL blends tricity and regional by the out-of-town share.
  - Google Search.
  - Organic IG/content/GBP: cost = shooter/editor + SEO freelancer.
  - Referral: cost = reward × enrolments.
  - Paid Career Taster: ticket ad cost + delivery − ticket revenue ex-GST. Credits reduce the enroller's fee.
  - Webinar + regional pop-up: additive S7 route. Pop-up P&L uses A-BM-06.
- **Unit economics per career student:**
  - First-course revenue (ex-GST) = L3 share × realised L3 fee + L2 share × L2 fee.
  - Variable cost = consumables + kit (pre-step only) + trainer standard cost (salary ÷ slots ÷ fill × seat-months) + gateway + EMI subvention (uptake × rate).
  - Contribution = revenue − variable cost.
  - LTV (24 months) = contribution + follow-on. Follow-on covers the L2→L3 upgrade, masterclass repeats, Pro Circle renewal after the free year, and kit margin.
  - CAC payback (months) = CAC ÷ (contribution ÷ payment months), the BM M3 definition.
- **Speed_to_Lead:** same target with Lead→QL × 0.67 (A-GRO-24) when the SLA is missed, giving extra spend, or enrolments lost at the same spend. The founder-touch stress applies A-GRO-25.
- **FEED rows** (paid-route media CAC; media per masterclass and self-makeup seat) are pasted into the forecast by `run_all.py`.

### 4.3 `business_forecast.xlsx`

**Sheets:** README · Dashboard · Assumptions (Cons/Base/Aggr + selector; column J types each input as rate or plan) · Unit_Economics · Capacity · 3yr_Scenarios · Sensitivity · BM_Unit_Economics · Outlook_Conservative / _Base / _Aggressive / _Selected · Plan10L_BaseRates · Plan50L_BaseRates · Flex_* (15 sensitivity re-runs) · Checks.

**(a) Unit_Economics.** Covers the ladder L1 Taster ₹999 · L1-S5 Self-makeup ₹4,999 · L2 Foundation ₹39,900 · L3 at today's fee · L3 after the step · L3 Destination · L4 Masterclass ₹10k avg · L5 Pro Circle ₹9,999.
- Per seat: fee incl. and ex-GST, kit, consumables, trainer cost per batch and per student, payment/EMI, contribution and margin, acquisition cost, contribution after CAC.
- Per cohort: fixed cost (trainer batch cost + occupancy × cap), breakeven students and fill %, cohort contribution at 10 / 12 / 14 students (BM M1), batches per year.
- Follows the selector.
- Also carries the illustrative baseline block, labelled NOT actual.

**(b) Outlook sheets** run monthly, Nov-26 to Oct-27, with a rate index (B3) and a plan index (D3), so plans can be run at other rates.

*Enrolments*
- Career demand = seasonality (A-GRO-40) × [today's organic/referral engine (CA-01 × 60% ÷ 12) + new non-paid enrolments × SLA factor + MIN(paid-route target, budget × 70% ÷ effective CAC × SLA factor)].
- Targets ramp linearly to A-GRO-01 × route mix by month 7.
- Effective CAC = funnel paid-route CAC × A-ECO-51.
- Seat capacity = stations × slots × 90%. Continuing L3 students hold seats for 3 months; Destination students hold 1.25 seats for 2 months. Demand that does not fit is lost; utilisation is capped at 100% by construction.
- Other products: L4 seats (from M3, 6-month ramp), L1-S5 seats (S5 seasonality), taster tickets (derived from the taster route), pop-ups (from A-ECO-130), Pro Circle members (S3 uptake; graduates are free in year 1).

*Prices and revenue*
- Prices: CA-02 incl. kit until the step month, then A-BM-02 realised.
- Revenue is ex-GST on a booking basis.
- Instalment timing (A-ECO-34) delays cash, not revenue.

*Costs*
- Variable: consumables, kit (pre-step), L2, short-course delivery, pop-up events, Pro Circle service, gateway + EMI, referral rewards.
- Trainers: active batch-slots = seats ÷ fill. Trainer-taught slots = slots × (1 − founder share). The founder share follows A-BM-10: ≤50% at M6, ≤30% at M12 in Base. One lead trainer from the hire month (0.5 FTE in the ₹10L plan); extra trainers at 2 slots per FTE; assistants at 1 per 2 slots.
- Growth team (counsellors, content, freelancers), martech, paid media, partnerships/PR and contingency are mirrored line by line from Growth §10 and §6.4.
- Rent: today's academy share (₹35k Base [HYP]) until the move month (Base M7, Aggressive M4, Conservative none), then sq ft × ₹/sq ft. S-CHD-22 bands: ₹113 / 80 / 80.
- Other: utilities, admin, one-offs (website M1; B&WSSC/legal M3).

*Capex and cash*
- Capex: fit-out (₹800/sq ft), extra stations (₹30k each), 3-month deposit, CRM/proof kit, hybrid content.
- Cash = EBITDA + instalment timing − capex. It excludes income tax, GST input/output timing and any founder draw.
- Peak cash need = −min(cumulative cash).

*KPIs*
- Break-even career enrolments = (fixed opex at M12 − non-career contribution at M12) ÷ contribution per career enrolment at M12.
- Also reported: the gate metrics (effective media CAC, fully loaded acquisition %, utilisation, founder share, first month that capacity binds, first month EBITDA ≥ 0).

**(c) 3yr_Scenarios.**
- Year 1 links to the outlooks.
- Year 2 career enrolments = 2 × the Year-1 H2 run-rate, de-seasonalised, × (1 + A-ECO-201). Year 3 = Year 2 × (1 + A-ECO-202).
- Both are capacity-capped from stations, slots and seat-months.
- Layers:
  - Flagship career, split tricity / out-of-town by A-ECO-203.
  - Incremental Destination students after G2 (A-ECO-204).
  - Entry products.
  - CPD (L4 + L5).
  - Online (A-ECO-208, gated).
  - Adjacents: kit margin, alumni booking desk (A-BM-09), brand partnerships.
  - A partner-hosted satellite, **only in Aggressive Year 3** (gate G3a; host takes 20–30%).
- Costs: unit costs, trainer FTE from seat-months and the founder path, growth team from the M12 run-rate, academy manager (BM M12–18), rent with escalation, media inputs.
- The sheet exports SOM layers and learners for the sizing model.

**(d) BM_Unit_Economics.** Business models A–F side by side at maturity, at Base rates:
- A: Flagship (Base Y3)
- B1: owned Ludhiana centre
- B2: partner-hosted satellite
- B3: franchise per unit
- C: digital stand-alone
- D: Destination/hybrid
- E: full marketplace (take rate, AOV, fulfilment/QA cost, CAC, repeat, fixed platform cost)
- E-lite: alumni booking desk
- F1: masterclasses
- F2: kits + partnerships
- F3: Pro Circle

Each column shows price, net revenue per unit, units, contribution, fixed cost, EBITDA, investment, payback, CAC, LTV and LTV/CAC. The sheet also carries the Ludhiana four-route comparison (BM M4): 5-year NPV at 15%, payback, break-even, indifference rules, student all-in cost, and a table of local-site lift from 1.0x to 4.6x.

Directional readings:
- Marketplace: LTV/CAC 0.35 and negative contribution per booking. Confirms H5.
- Owned Ludhiana centre: −₹7.4L a year at 46 students; break-even 62.
- Partner satellite and destination: positive at small scale.
- Franchise: about ₹2L a year per unit after support; about ₹1L in total at 3 units after HQ franchise costs.

**(e) Sensitivity.** Each tornado row is a **full re-run of the Base monthly model** (Flex_* sheets) with one driver flexed:
- conversion ×0.8 / ×1.2 (×0.8 = founder step-back ÷1.25)
- fees ×0.8 / ×1.15
- cohort fill ×0.8 / ×1.2
- CPL ×1.3 / ×0.7
- variable cost ×1.25 / ×0.75
- rent ₹130 / ₹47 per sq ft
- media budget ±30%
- GST on top

A unit-level tornado on contribution per paid L3 student is included.

---

## 5. Key findings from the models (for the strategy agents)

1. **Price realisation is the biggest lever.**
   - At today's assumed ₹60k fee including a kit, an L3 seat contributes ₹22k and a cohort needs 8 of 12 seats to break even.
   - At ₹80k realised with an optional kit, the seat contributes ₹50k and break-even is 3.6 seats.
   - Fees are the top Year-1 sensitivity (₹23L swing). The proof gate (outcomes report + reviews) is the economic hinge, not only a marketing milestone.
2. **GST treatment is worth about ₹13L a year at Base volume.** Absorbing 18% into quoted fees vs charging it on top makes that difference. It needs a tax adviser's view on PNA's status (no exemption for private non-recognised training: GST Council flyer, accessed 2026-10-16). At about 50 students and ₹30L of fees, PNA is already above the ₹20L services registration threshold [FACT, statute; not re-verified].
3. **Capacity binds before demand in the Base plan.**
   - Today's space (8 stations × 2 slots [HYP]) holds about 58 L3 starts a year.
   - The A-GRO-01 target needs about 153% of it.
   - In Base, seats bind from month 6, which is why the move is in M7. Years 2–3 need a third (evening/weekend) slot and 14 stations to hold utilisation at 81–85%, close to the ≥85% G3a trigger.
4. **The ₹30L Base plan clears its envelope with little room.** Peak cash need is ₹24.6L (₹25.6L in the Staged Plan). That is driven by ₹19.7L of capex and deposits (fit-out ₹10.4L, stations ₹1.2L, deposit ₹3.1L, CRM/proof kit ₹1.5L, hybrid content ₹3.5L), plus team ramp before revenue. Year-1 EBITDA is +₹6.8L before any founder salary and about −₹2.2L after a ₹75k/month founder-role salary (Staged Plan: +₹2.2L / −₹6.9L).
5. **More money does not mean more Year-1 profit.**
   - At Base rates, the ₹50L plan raises revenue to ₹0.99 cr, but EBITDA is about −₹3L and the cash need is about ₹44L.
   - The ₹10L plan earns about +₹11L with only ₹3L of cash, but leaves career volume at about 52 a year.
   - The envelope should be released in tranches against gates G0 and G1.
6. **The founder's unpaid teaching is today's margin.** Replacing it costs about ₹10L (Year 1) rising to ₹17–19L a year (Years 2–3) in trainers and assistants, plus about ₹8L a year for an academy manager from Year 2. Under Conservative rates (₹40k fee, adverse CPL, proof gate at M10) the academy loses money in all three years. **The step-back is affordable only at roughly 5.5 or more career enrolments a month after the full price step (6.5 at the step-1 fee).**
7. **Speed-to-lead discipline beats budget (H7).** At Base, missing the SLA costs 1.5x the media for the same enrolments. That is more than the gap between base and optimistic CPL.
8. **Marketplace is value-destroying at PNA's scale (H5).**
   - The marketplace loses ₹932 per booking before fixed costs, LTV/CAC is 0.35, and break-even is unreachable.
   - The alumni booking desk inside the studio is the right small version.

---

## 6. Assumption provenance (every ID used in the models)

**Conventions:**
- Scenario columns: Low = Conservative and High = Aggressive for the forecast and funnel; pure magnitude for market sizing.
- "Workbook": MS = market sizing, FE = funnel economics, BF = business forecast.
- Values are those in the recalculated workbooks.
- A-ECO-3xx inputs sit on `BM_Unit_Economics` and are Base-only.
- SOM-* rows are model outputs pasted from the forecast.
- External source IDs (S-xxx) resolve in `research/sources.md`; A-GRO in `strategy/admissions_funnel.md` §9; A-BM in `strategy/business_model_evaluation.md` §9.
- New source used by this agent: **GST Council, "GST on Education Services" flyer**, https://www.gstcouncil.gov.in/sites/default/files/e-version-gst-flyers/GST_Education_Services.pdf, accessed 2026-10-16. Supporting rulings were seen in the same search: AAR Kerala, Tutor Comp 2022 (SAC 9992, 18%); AAAR Kerala, Logic Management 2021.

| ID | Assumption | Low / Cons. | Base | High / Aggr. | Unit | Source / rationale | Tag | Workbook(s) |
|---|---|---|---|---|---|---|---|---|
| CA-01 | PNA paying students per year today (all courses) - founder 'under 60' | 30 | 50 | 60 | students/yr | Founder 2026-10-16 (canonical CA-01) | [FOUNDER] | MS, FE, BF |
| CA-02 | Current flagship professional course fee (incl. kit) | ₹40,000 | ₹60,000 | ₹75,000 | ₹ | Not supplied; local diploma band ₹35-75k (S-LC §6) | [HYP] | FE, BF |
| CA-03 | Growth investment envelope, 12 months | ₹1,000,000 | ₹3,000,000 | ₹5,000,000 | ₹ | Founder: moderate ₹10-50L | [FOUNDER] | FE, BF |
| A-BM-02 | L3 realised fee after discounts/credits (after proof gate) | ₹65,000 | ₹80,000 | ₹100,000 | ₹ | A-BM-02 (list ₹90k-1.25L) | [HYP] | FE, BF |
| A-BM-04a | Lead trainer salary | ₹75,000 | ₹60,000 | ₹55,000 | ₹/mo | A-BM-04 ₹50-80k | [HYP] | FE, BF |
| A-BM-04b | Trainer salary | ₹45,000 | ₹38,000 | ₹32,000 | ₹/mo | A-BM-04 ₹30-45k | [HYP] | FE, BF |
| A-BM-04c | Assistant salary | ₹20,000 | ₹18,000 | ₹16,000 | ₹/mo | A-BM-04 ₹15-20k | [HYP] | FE, BF |
| A-BM-06a | Pop-up discovery workshop: paid attendees per event | 25 | 32 | 40 | attendees | A-BM-06 (25-40) | [HYP] | FE, BF |
| A-BM-06b | Pop-up ticket price | ₹999 | ₹1,499 | ₹1,499 | ₹ | A-BM-06 (₹999-1,999; breakeven ~36 at ₹1,499) | [HYP] | FE, BF |
| A-BM-06c | Pop-up cost per event-day (venue, travel, models, ads, staff) | ₹60,000 | ₹52,000 | ₹45,000 | ₹/event | A-BM-06 ₹45-60k | [HYP] | FE, BF |
| A-BM-06d | Pop-up attendee -> L3/L2 enrolment within 60 days | 8% | 11% | 15% | % | A-BM-06 8-15%; A-CUS-19 | [HYP] | FE, BF |
| A-BM-09a | Alumni booking-desk referred bookings, Y2 | 10 | 40 | 60 | bookings | A-BM-09: 30/120/150 by Y3 | [HYP] | BF |
| A-BM-09b | Alumni booking-desk referred bookings, Y3 | 30 | 120 | 150 | bookings | A-BM-09 | [HYP] | BF |
| A-BM-09c | Desk fee per referred booking (10-15% or flat ₹1-2.5k) | ₹1,500 | ₹1,750 | ₹2,000 | ₹ | A-BM-09 | [HYP] | BF |
| A-BM-10a | Founder share of student contact hours at M6 | 60% | 50% | 45% | % | A-BM-10 path (≤50% M6) | [HYP] | BF |
| A-BM-10b | Founder share of contact hours at M12 | 40% | 30% | 25% | % | A-BM-10 (≤30% M12) | [HYP] | BF |
| A-BM-10b-G | Founder share of contact hours at M12 - Gate D path (≤40% M12, ≤30% M18) | 40% | 40% | 40% | % | recommended_strategy.md §10 #2 | [REC] | BF |
| A-BM-10c | Founder share of contact hours, Year 2 average | 20% | 15% | 12% | % | A-BM-10 (≤15% M24) | [HYP] | BF |
| A-BM-10c-G | Founder share, Year 2 average - Gate D path (40% M12 -> 30% M18 -> 15% M24) | 29% | 29% | 29% | % | Linear path average (35% M13-18, 22.5% M19-24) | [EST] | BF |
| A-BM-10d | Founder share of contact hours, Year 3 average | 12% | 10% | 8% | % | A-BM-10 (≤10% M36) | [HYP] | BF |
| A-BM-10d-G | Founder share, Year 3 average - Gate D path (15% M24 -> 10% M36) | 12.5% | 12.5% | 12.5% | % | Linear path average | [EST] | BF |
| A-BM-12a | Living + travel for an out-of-town student on the 12-week Weekday format | ₹54,000 | ₹43,500 | ₹33,000 | ₹ | A-BM-12: ₹33-54k (PG ₹10-16k x 3 + travel) | [EST] | BF |
| A-BM-12b | Living + travel for the Destination format (5-6 weeks in Chandigarh) | ₹28,000 | ₹22,500 | ₹17,000 | ₹ | A-BM-12: ₹17-28k | [EST] | BF |
| A-BM-15 | Regional acquisition cost per incremental destination student | ₹15,000 | ₹12,500 | ₹10,000 | ₹/student | A-BM-15 out-of-town CAC ₹10-15k | [HYP] | BF |
| A-BM-16 | L3 consumables / models per student (excl. kit) | ₹7,000 | ₹6,000 | ₹5,000 | ₹/student | A-BM-16 ₹5-7k | [HYP] | FE, BF |
| A-BM-19 | Satellite host revenue share | 30% | 25% | 20% | % | A-BM-19: 20-30% | [HYP] | BF |
| A-CHD-02 | Women aged 17-35, tricity district catchment (Chandigarh UT + SAS Nagar + Panchkula), 2026 | 420 | 471 | 520 | 000 | Cohort rebuild from Technical Group projections (S-CHD-01, -03, -04); A-CHD-01/02 | [EST] | MS |
| A-CHD-03 | Annual participation of tricity resident women 17-35 in paid makeup/beauty-artistry course | 0.12% | 0.2% | 0.3% | % | Calibrated to bridal-MUA listing pipeline (A-CHD-07); unverified | [HYP] | MS |
| A-CHD-04 | Outstation (non-tricity) share of tricity students | 15% | 25% | 30% | % | No student-origin data; A-CUS-28 15-35% of enquiries | [HYP] | MS |
| A-CHD-05 | Average realised fee per tricity learner (blended across course lengths) | ₹30,000 | ₹45,000 | ₹60,000 | ₹ | UrbanPro tutor ₹15-36k per 2-3 months; local diploma ₹35-75k (S-CHD-15, S-LC §6) | [EST] | MS |
| A-CHD-06 | Tricity affluence weight (income-based; cross-check for intensity) | 1.68 | 1.85 | 2 | x India | RBI PCNSDP: Chandigarh 2.28x, Haryana 1.69x, Mohali 1.5x assumed (S-CHD-06) | [EST] | MS |
| A-ECO-01 | Tricity demand-intensity index used in top-down share (Low = income weight low; Base = KPMG B&W workforce index; High = Chandigarh income multiple) | 1.68 | 1.90 | 2.28 | x India | Base computed on Tricity_Recon from KPMG state B&W shares weighted by women 17-35 | [EST] | MS |
| A-ECO-02 | Urban/rural ratio of paid makeup-academy participation (k) | 3 | 5 | 8 | x | Makeup academies are urban (S-LC §3 all in cities); rural trainees mostly scheme-funded (S-IND-01 p.52, §7.1) | [HYP] | MS |
| A-ECO-03 | Urban share of tricity catchment population | 68% | 72% | 76% | % | Chandigarh ~97% urban (Census 2011, S-CHD-02); Panchkula 55.8% (S-CHD-04); Mohali ~55% assumed; women-weighted | [EST] | MS |
| A-ECO-04 | Urban share of India population 2026 | 37% | 36% | 35% | % | Census 2011 31.1% + trend (general knowledge, not re-sourced) | [EST] | MS |
| A-ECO-05 | Rest-of-region demand-intensity index (PB/HR/HP/J&K) | 1.10 | 1.29 | 1.45 | x India | Base computed from KPMG B&W shares weighted by women; urbanisation ≈ India so no urban factor | [EST] | MS |
| A-ECO-06 | Makeup-led share of CA-05 'makeup/beauty-artistry' learners | 60% | 70% | 80% | % | CA-05 scope includes hair/skin/nail artistry; tricity providers are makeup-heavy (S-LC §3) | [HYP] | MS |
| A-ECO-07 | Chain/brand centres in tricity offering makeup courses | 7 | 7 | 7 | centres | Orane 34A, Lakmé 17E + 34A, VLCC 34A, Knuckout Chd + Zirakpur, Headmasters Mohali (S-LC-08..24, -38) | [FACT] count of named centres | MS |
| A-ECO-08 | Makeup-led learners per chain centre per year | 30 | 45 | 60 | learners | A-IND-08 (80-125 all courses) x ~40-50% makeup share | [HYP] | MS |
| A-ECO-09 | Independent makeup institutes in tricity | 5 | 5 | 5 | institutes | Zuri, Cassia, Fashion Make Fashion, Cleopatra, SS Makeup (S-LC §3) | [FACT] count | MS |
| A-ECO-10 | Makeup-led learners per independent institute per year | 25 | 40 | 60 | learners | Zuri claims 5,000+ students since 2015 (~450/yr all courses, [CLAIM] S-LC-13) - discounted heavily | [HYP] | MS |
| A-ECO-11 | Founder-led MUA academies in tricity (incl. PNA) | 8 | 8 | 8 | academies | PNA, Nav Brar, Tanvi KG, Abhishek, Niti Luthra, Parthi Chopra, Meraki, SK Studio (S-LC §3) | [EST] count | MS |
| A-ECO-12 | Learners per founder-led academy per year | 15 | 25 | 40 | learners | PNA founder-stated <60 incl. short courses (CA-01) | [HYP] | MS |
| A-ECO-13 | UrbanPro makeup-class listings, Chandigarh | 111 | 111 | 111 | listings | S-CHD-15 (9 Oct 2026) | [FACT] | MS |
| A-ECO-14 | Active share of tutor listings x learners per active tutor per year | 0.60 | 0.90 | 1.20 | learners/listing | 30% active x 2/3/4 learners | [HYP] | MS |
| A-ECO-15 | Share of rest-of-region makeup-led learners reachable by an offline Chandigarh hub | 10% | 15% | 20% | % | Travel matrix: Ambala/Patiala/Solan/Ludhiana/Karnal ≤2.5 h; beyond needs PG (S-CHD §4); Punjab cities chain-served (S-LC §7) | [HYP] | MS |
| A-ECO-16 | Hybrid-willing share of non-reachable regional makeup-led learners | 5% | 8% | 12% | % | KPMG survey: 47% prefer blended, little appetite for fully online (S-IND-01 p.56) | [HYP] | MS |
| A-ECO-17 | Hybrid programme realised fee (quoted, incl. GST) | ₹40,000 | ₹50,000 | ₹60,000 | ₹ | Orane online diploma ₹45-80k (S-IND-28/29); A-GRO parity with L3 later | [HYP] | MS, FE, BF |
| A-ECO-18 | Working makeup artists, tricity (listed + unlisted + salon staff) | 800 | 1,000 | 1,300 | artists | WedMeGood 600+ (text) to ~940 (pages x 20) bridal MUAs (S-CHD-12) | [EST] | MS |
| A-ECO-19 | Working makeup artists within reach (rest of region) | 2,000 | 3,000 | 4,000 | artists | WedMeGood pages: Ludhiana ≤440, Amritsar ≤340, Dehradun ≤440; plus Jalandhar, Patiala, Ambala, Shimla, salon staff (S-CHD §5) | [EST] | MS |
| A-ECO-20 | Share of working artists buying paid CPD/masterclass per year | 20% | 30% | 40% | % | A-CUS-31 repeat 25-40%/yr (Airblack claim) | [HYP] | MS |
| A-ECO-21 | CPD/masterclass spend per participating artist per year (incl. GST) | ₹8,000 | ₹10,000 | ₹12,000 | ₹ | Masterclass anchors ₹4,999-19,999, avg ₹10k (A-GRO-07; S-CUS-34/54) | [HYP] | MS |
| A-ECO-22 | North-India-reachable share of India online/short-course layer (Hindi/Punjabi content) | 25% | 35% | 45% | % | Hindi-belt + Punjab share of online buyers; no data | [HYP] | MS |
| A-ECO-23 | GST rate on PNA training (private, non-recognised course; SAC 9992 commercial training) | 18% | 18% | 18% | % | GST Council education flyer: private coaching / unrecognised institutions not exempt (gstcouncil.gov.in/sites/default/files/e-version-gst-flyers/GST_Education_Services.pdf, accessed 2026-10-16); PNA-specific status to confirm with CA | [FACT] rule; [HYP] for PNA | MS, FE, BF |
| A-ECO-24 | Fees quoted GST-inclusive? (1 = PNA absorbs GST from list fee; 0 = GST charged on top) | 1 | 1 | 1 | switch | Consumer academies mostly quote one number; DBA quotes ex-GST, Pearl incl. GST (S-NC-26, S-IND-23). Sensitivity flips it | [HYP] | FE, BF |
| A-ECO-30 | Webinar / pop-up promotion cost per registrant | ₹150 | ₹100 | ₹60 | ₹/registrant | Regional CTWA CPL ₹120-500 (A-GRO-11) x ~40% registration | [HYP] | FE, BF |
| A-ECO-31 | Online parents' info sessions per month (registrants per session 30) | 1 | 1 | 1 | sessions/mo | Growth agent §8.1: monthly session, 30 registrants (A-GRO §10.3) | [HYP] | FE, BF |
| A-ECO-32 | Registrants per online session | 30 | 30 | 40 | registrants | A-GRO §10.3 | [HYP] | FE, BF |
| A-ECO-33 | Pop-up events per month at steady state (regional engine; G2) | 0 | 0.50 | 1 | events/mo | BM §6.2: pilots ≤₹2L before G2; circuit after G2 | [HYP] | FE, BF |
| A-ECO-34 | Payment months for career fees (token + instalments / NBFC) | 3 | 2 | 1 | months | Token + 2 instalments; NBFC pays upfront when EMI used | [HYP] | FE, BF |
| A-ECO-35 | Masterclasses bought per career graduate within 24 months | 0.30 | 0.50 | 0.80 | purchases | A-GRO-29 30%/yr repeat applied to alumni | [HYP] | FE, BF |
| A-ECO-36 | L2 Foundation -> L3 upgrade share (fee credited) | 25% | 30% | 40% | % | Growth ladder: L2 fee credited to L3 within 6 months | [HYP] | FE, BF |
| A-ECO-37 | Optional kit uptake x margin (post price-step, near-cost kit ₹20k) | ₹600 | ₹960 | ₹1,400 | ₹/L3 student | Growth: kit optional at near cost, itemised MRP | [HYP] | FE, BF |
| A-ECO-40 | L2 consumables per student | ₹2,500 | ₹2,000 | ₹1,500 | ₹/student | 1/3 of L3 duration | [HYP] | FE, BF |
| A-ECO-41 | Hybrid: online delivery (LMS, live Q&A) + campus consumables per student | ₹9,000 | ₹7,500 | ₹6,000 | ₹/student | BM D-destination: shorter campus stay | [HYP] | FE, BF |
| A-ECO-42 | L4 masterclass consumables / models per seat | ₹1,200 | ₹1,000 | ₹800 | ₹/seat | Judgement | [HYP] | FE, BF |
| A-ECO-43 | L1-S5 self-makeup cost per seat (own products used) | ₹500 | ₹400 | ₹300 | ₹/seat | Judgement | [HYP] | FE, BF |
| A-ECO-44 | Taster delivery cost per ticket (trainer time share + products) | ₹300 | ₹250 | ₹200 | ₹/ticket | Judgement | [HYP] | FE, BF |
| A-ECO-45 | Pro Circle cost to serve per paid member-year | ₹2,500 | ₹2,000 | ₹1,500 | ₹/member | Monthly online session + quarterly practice day | [HYP] | FE, BF |
| A-ECO-46 | Batch slots one trainer FTE can lead (morning + afternoon) | 2 | 2 | 2 | slots | Judgement | [HYP] | FE, BF |
| A-ECO-47 | Average cohort fill (students per L3/L2 batch; cap 12, A-BM-01) | 8 | 10 | 11 | students | A-BM-01 cap 12 | [HYP] | FE, BF |
| A-ECO-48 | L3 seat-months per student (12-week programme) | 3 | 3 | 3 | seat-months | A-BM-03 | [EST] | FE, BF |
| A-ECO-49 | Destination/hybrid seat-months per student (4-wk online pre-work + 5-6-wk full-day intensive = Growth Fast-track) | 2.50 | 2.50 | 2.50 | seat-months | A-BM-03; ~1.2 months x 2 slots | [EST] | FE, BF |
| A-ECO-50 | Share of the paid-media budget that buys career (L2/L3) leads | 70% | 70% | 70% | % | marketing_channel_plan.md rows 8-15: career CTWA, regional, Search, brand, taster half of M3, retargeting ≈70% of base ₹1.0L | [EST] | BF |
| A-ECO-51 | Awareness/retargeting overhead factor on funnel CAC (calibrated so the Base plan budget buys the Base target at steady state) | 2.42 | 2.42 | 2.42 | x | Calibrated: A-ECO-50 x Base Oct-27 budget / (A-GRO-01 base x paid mix x A-ECO-FUN-01 base) | [EST] calibration | BF |
| A-ECO-52 | Lead trainer hire month | 3 | 2 | 1 | month # | BM §6.1: lead trainer M0-3 (shadowing) | [HYP] | BF |
| A-ECO-52b | Lead trainer FTE (0.5 = part-time senior trainer in the ₹10L plan) | 0.50 | 1 | 1 | FTE | BM §6.5: ₹10L plan = part-time trainer | [HYP] | BF |
| A-ECO-53 | Counsellor #1 start month | 3 | 1 | 1 | month # | Growth §10: C 1 FTE x10 mo; B/A from M1 | [EST] | BF |
| A-ECO-54 | Counsellor #2 FTE | 0 | 0.50 | 1 | FTE | Growth §10: B 0.5 FTE x7; A 1 FTE x9 | [EST] | BF |
| A-ECO-55 | Counsellor #2 start month | 99 | 7 | 4 | month # | Growth §10 (re-aligned): B 0.5 FTE x6 after G1; A 1 FTE x9 | [EST] | BF |
| A-ECO-57a | Marketing/content team start month | 2 | 2 | 2 | month # | Growth §10 (x11 months) | [EST] | BF |
| A-ECO-57b | Performance freelancer start month | 2 | 2 | 2 | month # | Growth §10 (x11) | [EST] | BF |
| A-ECO-57c | SEO freelancer start month | 3 | 3 | 3 | month # | Growth §10 (x10) | [EST] | BF |
| A-ECO-57d | Shooter/editor start month | 1 | 2 | 1 | month # | Growth §10 (re-aligned): C x12, B x11 from M2, A x12 | [EST] | BF |
| A-ECO-58 | Partnerships, PR / outcomes report, contingency (Growth §10 lines, monthly average) | ₹3,333 | ₹15,833 | ₹19,167 | ₹/mo | Growth §10: partnerships/events ex-rewards & pop-ups + outcomes/PR + contingency | [EST] | BF |
| A-ECO-60-01 | Self-makeup (S5) seasonality, calendar month 1 | 1.20 | 1.20 | 1.20 | index | Peaks Oct-Feb before weddings/festivals (A-CUS-29); sums to 12 | [HYP] | BF |
| A-ECO-60-02 | Self-makeup (S5) seasonality, calendar month 2 | 1.30 | 1.30 | 1.30 | index | Peaks Oct-Feb before weddings/festivals (A-CUS-29); sums to 12 | [HYP] | BF |
| A-ECO-60-03 | Self-makeup (S5) seasonality, calendar month 3 | 0.90 | 0.90 | 0.90 | index | Peaks Oct-Feb before weddings/festivals (A-CUS-29); sums to 12 | [HYP] | BF |
| A-ECO-60-04 | Self-makeup (S5) seasonality, calendar month 4 | 0.80 | 0.80 | 0.80 | index | Peaks Oct-Feb before weddings/festivals (A-CUS-29); sums to 12 | [HYP] | BF |
| A-ECO-60-05 | Self-makeup (S5) seasonality, calendar month 5 | 0.70 | 0.70 | 0.70 | index | Peaks Oct-Feb before weddings/festivals (A-CUS-29); sums to 12 | [HYP] | BF |
| A-ECO-60-06 | Self-makeup (S5) seasonality, calendar month 6 | 0.60 | 0.60 | 0.60 | index | Peaks Oct-Feb before weddings/festivals (A-CUS-29); sums to 12 | [HYP] | BF |
| A-ECO-60-07 | Self-makeup (S5) seasonality, calendar month 7 | 0.60 | 0.60 | 0.60 | index | Peaks Oct-Feb before weddings/festivals (A-CUS-29); sums to 12 | [HYP] | BF |
| A-ECO-60-08 | Self-makeup (S5) seasonality, calendar month 8 | 0.80 | 0.80 | 0.80 | index | Peaks Oct-Feb before weddings/festivals (A-CUS-29); sums to 12 | [HYP] | BF |
| A-ECO-60-09 | Self-makeup (S5) seasonality, calendar month 9 | 1.10 | 1.10 | 1.10 | index | Peaks Oct-Feb before weddings/festivals (A-CUS-29); sums to 12 | [HYP] | BF |
| A-ECO-60-10 | Self-makeup (S5) seasonality, calendar month 10 | 1.40 | 1.40 | 1.40 | index | Peaks Oct-Feb before weddings/festivals (A-CUS-29); sums to 12 | [HYP] | BF |
| A-ECO-60-11 | Self-makeup (S5) seasonality, calendar month 11 | 1.40 | 1.40 | 1.40 | index | Peaks Oct-Feb before weddings/festivals (A-CUS-29); sums to 12 | [HYP] | BF |
| A-ECO-60-12 | Self-makeup (S5) seasonality, calendar month 12 | 1.20 | 1.20 | 1.20 | index | Peaks Oct-Feb before weddings/festivals (A-CUS-29); sums to 12 | [HYP] | BF |
| A-ECO-101 | Career (L2/L3-type) share of today's students | 60% | 60% | 60% | % | Assumed mix; founder data pull (V1) to replace | [HYP] | FE, BF |
| A-ECO-102 | Average fee of today's short courses / masterclasses | ₹6,000 | ₹8,000 | ₹10,000 | ₹ | Local short-course band ₹6.5-25k (S-LC §6) | [HYP] | FE, BF |
| A-ECO-103 | Pro kit cost borne by PNA while fee includes kit (pre price-step) | ₹15,000 | ₹12,000 | ₹10,000 | ₹/student | Growth agent: optional kit ₹18-25k at near cost; basic included kit assumed cheaper | [HYP] | FE, BF |
| A-ECO-104 | Month the L3 price steps from CA-02 to A-GRO-06/A-BM-02 (proof gate: outcomes report + >=30 reviews) | 10 | 7 | 5 | month # | Growth agent §6: hold current fee for next two batches (~6 months); Conservative clears the gate late (M10) | [HYP] | FE, BF |
| A-ECO-105 | Month from which the <5-min speed-to-lead SLA is met (counsellor + CRM live) | 4 | 3 | 2 | month # | BM gate G0 by M3 | [HYP] | FE, BF |
| A-ECO-106 | Proof gate 2 month: L3 list steps ₹75k -> ₹90k (two-step path; inside G2) | 99 | 16 | 13 | month # | recommended_strategy.md §7.2: step 2 at G2 (M15-M18) | [HYP] | BF |
| A-ECO-110 | Stations in today's Sector 8 studio-academy | 8 | 8 | 8 | stations | Founder to confirm (BM: 8-12 needed) | [HYP] | BF |
| A-ECO-111 | Batch slots per day in today's space (morning, afternoon) | 2 | 2 | 2 | slots | Weekends kept for masterclasses / studio bridal work | [HYP] | BF |
| A-ECO-112 | Move to dedicated academy space in month (99 = no move in Year 1) | 99 | 7 | 4 | month # | BM §6.5: space only if studio cannot host 8-12 stations; capacity binds | [HYP] | BF |
| A-ECO-113 | New academy space size | 0 | 1,300 | 1,600 | sq ft | BM: 1,200-1,500 sq ft | [HYP] | BF |
| A-ECO-114 | Rent for new space | ₹113 | ₹80 | ₹80 | ₹/sq ft/mo | S-CHD-22 asking rents: Sector 34 ₹113-130; Sector 21/Manimajra ₹80; city median ₹47 | [FACT] bands / [HYP] pick | BF |
| A-ECO-115 | Stations in new space | 8 | 12 | 16 | stations | Batch cap 12 (A-BM-01) | [HYP] | BF |
| A-ECO-116 | Batch slots per day in new space (incl. weekend / flex batch) | 2 | 2.50 | 2.50 | slots | BM: morning, afternoon, weekend slots | [HYP] | BF |
| A-ECO-117 | Maximum usable share of seat capacity | 90% | 90% | 90% | % | Scheduling friction | [HYP] | BF |
| A-ECO-118 | Academy share of today's Sector 8 occupancy cost (rent + maintenance) | ₹45,000 | ₹35,000 | ₹35,000 | ₹/mo | Unknown - founder Q3; ~700 sq ft at ₹50-65 | [HYP] | BF |
| A-ECO-119 | Utilities, housekeeping in today's space | ₹12,000 | ₹10,000 | ₹10,000 | ₹/mo | Judgement | [HYP] | BF |
| A-ECO-120 | Utilities, housekeeping, maintenance in new space | ₹14 | ₹12 | ₹12 | ₹/sq ft/mo | Judgement (AC-heavy lighting) | [HYP] | BF |
| A-ECO-121 | Fit-out cost (interiors, electrical, AC, lighting, signage) | ₹900 | ₹800 | ₹800 | ₹/sq ft | A-BM-07: ₹8-15L for 1,200-1,500 sq ft (S-BM-08/09) | [EST] | BF |
| A-ECO-122 | Cost per additional makeup station (mirror, lights, chair, trolley) | ₹35,000 | ₹30,000 | ₹30,000 | ₹/station | Judgement | [HYP] | BF |
| A-ECO-123 | Security deposit | 3 | 3 | 3 | months of rent | Typical commercial lease | [HYP] | BF |
| A-ECO-124 | Front-desk / operations coordinator (from move month) | ₹0 | ₹18,000 | ₹18,000 | ₹/mo | Judgement | [HYP] | BF |
| A-ECO-125 | Academy manager / admissions head salary | ₹65,000 | ₹65,000 | ₹65,000 | ₹/mo | BM §6.1: academy manager M12-18 | [HYP] | BF |
| A-ECO-126 | Academy manager start month | 99 | 13 | 10 | month # | BM §6.1 | [HYP] | BF |
| A-ECO-127 | LMS / hybrid platform | ₹5,000 | ₹5,000 | ₹8,000 | ₹/mo | From hybrid launch | [HYP] | BF |
| A-ECO-128 | Destination/hybrid format launch month (out-of-town L3 students switch format) | 99 | 10 | 8 | month # | BM: hybrid pilot before G2; Growth Fast-track | [HYP] | BF |
| A-ECO-129 | Hybrid pre-work content production + LMS set-up (capex, 2 months before launch) | ₹100,000 | ₹350,000 | ₹550,000 | ₹ | BM §6.5: ₹1L / 3-4L / 5-6L | [EST] | BF |
| A-ECO-130 | Regional pop-up pilot start month | 99 | 9 | 6 | month # | BM: pilots ≤₹2L from ~M9 before G2 | [HYP] | BF |
| A-ECO-131 | Masterclass (L4) seats offered per month at steady state | 12 | 24 | 30 | seats/mo | A-GRO §10.3 (2 x 12 base); BM A-BM-05 | [HYP] | BF |
| A-ECO-132 | Masterclass fill (sell-through) | 75% | 85% | 90% | % | Growth KPI ≥80% sell-through | [HYP] | BF |
| A-ECO-133 | Self-makeup (L1-S5) seats per month, season-average | 10 | 15 | 22 | seats/mo | A-GRO §10.3 (15 base) | [HYP] | BF |
| A-ECO-134 | Admin, accounting, professional fees, insurance, misc. | ₹12,000 | ₹15,000 | ₹20,000 | ₹/mo | Judgement | [HYP] | BF |
| A-ECO-135 | One-off: B&WSSC alignment, legal (fee/refund/claims), accounting set-up (month 3) | ₹50,000 | ₹150,000 | ₹200,000 | ₹ | BM §6.5: ₹0.5L / 1-2L | [EST] | BF |
| A-ECO-136 | Capex month 1: CRM/WhatsApp BSP set-up, GBP, photo/video proof kit | ₹50,000 | ₹150,000 | ₹250,000 | ₹ | BM §6.5 CRM/website/proof ₹1.5L / 2-3L / 3-4L less website | [EST] | BF |
| A-ECO-137 | Referral-route share of career enrolments (for rewards) | 20% | 20% | 20% | % | A-GRO-03d | [HYP] | BF |
| A-ECO-138 | Memo: market salary for the founder's ongoing role (brand face, curriculum, masterclasses, assessment) | ₹75,000 | ₹75,000 | ₹75,000 | ₹/mo | BM quotes EBITDA after a founder-role salary; judgement | [HYP] | BF |
| A-ECO-151 | Staged Plan: paid-media cap per month before G1 (T1 test level) | ₹60,000 | ₹60,000 | ₹60,000 | ₹/mo | recommended_strategy.md §5 T1 (≤₹60k/month) | [REC] | BF |
| A-ECO-152 | Staged Plan: basic recording of theory modules in T1 (month 3) | ₹100,000 | ₹100,000 | ₹100,000 | ₹ | recommended_strategy.md §5 T1 (₹1L) | [REC] | BF |
| A-ECO-153 | Tranche T1 cash cap (cumulative cash need before G1) | ₹1,500,000 | ₹1,500,000 | ₹1,500,000 | ₹ | recommended_strategy.md §5 T1 (up to ₹15L) | [REC] | BF |
| A-ECO-154 | Staged Plan: running cost of the studio weekend/evening batch slot (utilities, housekeeping, weekend premium) | ₹10,000 | ₹8,000 | ₹6,000 | ₹/mo | recommended_strategy.md §5/§10 #16; judgement | [HYP] | BF |
| A-ECO-155 | Staged Plan: studio batch slots per day once the weekend/evening slot is added (before the move) | 2.50 | 2.50 | 2.50 | slots | recommended_strategy.md §11.3 #2 (2.5 slots a day) | [HYP] | BF |
| A-ECO-156 | Staged Plan: month the studio weekend/evening slot starts | 5 | 5 | 5 | month # | recommended_strategy.md §5 T1 (from M5) | [HYP] | BF |
| A-ECO-160 | Price step 1 list fee (two-step path) | ₹75,000 | ₹75,000 | ₹75,000 | ₹ | recommended_strategy.md §7.2 (= A-GRO-06 low) | [HYP] | BF |
| A-ECO-170 | Optional pro kit price to the student (itemised, near cost) | ₹25,000 | ₹20,000 | ₹18,000 | ₹ | positioning_and_segments.md §6: ₹18-25k | [HYP] | BF |
| A-ECO-171 | Local commute per class day (tricity resident) | ₹150 | ₹120 | ₹100 | ₹/day | Judgement (auto/bus within tricity) | [HYP] | BF |
| A-ECO-172a | Class days: Weekday format (12 weeks x 5 days) | 60 | 60 | 60 | days | §6.1 Weekday 12 weeks | [EST] | BF |
| A-ECO-172b | Class days: Flex format (~20 weeks x 3 days) | 60 | 60 | 60 | days | §6.1 Flex ~20 weeks part-time | [EST] | BF |
| A-ECO-201 | Career enrolment growth: Y2 vs annualised Y1 H2 run-rate | 5% | 10% | 15% | % | Directional | [HYP] | BF |
| A-ECO-202 | Career enrolment growth: Y3 vs Y2 | 5% | 10% | 12% | % | Directional | [HYP] | BF |
| A-ECO-203a | Out-of-town share of career enrolments, Y2 | 15% | 25% | 35% | % | A-GRO-37; BM A-BM-21 | [HYP] | BF |
| A-ECO-203b | Out-of-town share of career enrolments, Y3 | 18% | 30% | 40% | % | BM: 25-35% by M30 (base) | [HYP] | BF |
| A-ECO-204a | Incremental destination/hybrid regional students (G2 engine), Y2 | 0 | 15 | 30 | students | BM A-BM-17: P1 out-of-town 10/35/60 by Y3 | [HYP] | BF |
| A-ECO-204b | Incremental destination/hybrid regional students, Y3 | 8 | 35 | 60 | students | BM A-BM-17 | [HYP] | BF |
| A-ECO-205a | Masterclass seats sold, Y2 | 110 | 220 | 330 | seats | A-BM-05: base 280 by Y3 | [HYP] | BF |
| A-ECO-205b | Masterclass seats sold, Y3 | 130 | 280 | 420 | seats | A-BM-05; A-BM-17 120/280/400 | [HYP] | BF |
| A-ECO-206a | Self-makeup seats, Y2 | 110 | 170 | 250 | seats | Directional | [HYP] | BF |
| A-ECO-206b | Self-makeup seats, Y3 | 120 | 190 | 280 | seats | Directional | [HYP] | BF |
| A-ECO-207a | Regional pop-up events, Y2 | 0 | 6 | 12 | events | geographic_expansion §5.2 (~14-event circuit after G2) | [HYP] | BF |
| A-ECO-207b | Regional pop-up events, Y3 | 2 | 12 | 16 | events | Directional | [HYP] | BF |
| A-ECO-208a | Online short-course / online masterclass buyers, Y2 | 0 | 300 | 800 | buyers | Deferred to gate: ≥50k engaged followers (BM §6.3) | [HYP] | BF |
| A-ECO-208b | Online buyers, Y3 | 150 | 900 | 2,000 | buyers | Directional | [HYP] | BF |
| A-ECO-209 | Online course / masterclass price | ₹999 | ₹1,499 | ₹1,999 | ₹ | Orane ₹499; Mickey Contractor ₹2,999 (S-NC-17/43) | [HYP] | BF |
| A-ECO-210 | Online: CAC per paid buyer x paid share 50% | ₹600 | ₹400 | ₹250 | ₹/buyer | Judgement | [HYP] | BF |
| A-ECO-211 | Online content production per year (opex) | ₹100,000 | ₹200,000 | ₹300,000 | ₹/yr | Judgement | [HYP] | BF |
| A-ECO-212 | Online platform / payment fee | 10% | 8% | 6% | % | Judgement | [HYP] | BF |
| A-ECO-213a | Brand partnership / sponsorship net income, Y2 | ₹100,000 | ₹200,000 | ₹300,000 | ₹ | A-BM-17 kits/brand ₹3/6/10L by Y3 | [HYP] | BF |
| A-ECO-213b | Brand partnership / sponsorship net income, Y3 | ₹150,000 | ₹400,000 | ₹600,000 | ₹ | A-BM-17 | [HYP] | BF |
| A-ECO-214 | Partner-hosted satellite students in Y3 (only if G3a met; Aggressive only) | 0 | 0 | 30 | students | BM §6.3 G3a ≥M24; geographic_expansion §4.1(b) | [HYP] | BF |
| A-ECO-215 | Satellite trainer allocation per student + set-up capex | ₹10,000 | ₹10,000 | ₹10,000 | ₹/student | geographic_expansion §4.1(b) ₹10k; capex ₹2-5L | [EST] | BF |
| A-ECO-216 | Satellite set-up capex (stations, branding, kit) | ₹500,000 | ₹350,000 | ₹350,000 | ₹ | geographic_expansion §4.1(b) | [EST] | BF |
| A-ECO-217 | Annual L3 / L2 fee escalation from Y3 | 5% | 6% | 8% | % | Directional, proof-led price steps | [HYP] | BF |
| A-ECO-218 | Wage escalation per year | 10% | 8% | 8% | % | Judgement | [HYP] | BF |
| A-ECO-219 | Rent escalation per year | 5% | 5% | 5% | % | Typical lease | [HYP] | BF |
| A-ECO-220a | Batch slots per day, Y2 | 2.50 | 3 | 3 | slots | Weekend / evening batches | [HYP] | BF |
| A-ECO-220b | Batch slots per day, Y3 | 3 | 3 | 3 | slots |  | [HYP] | BF |
| A-ECO-221a | Stations, Y2 | 8 | 12 | 16 | stations |  | [HYP] | BF |
| A-ECO-221b | Stations, Y3 | 10 | 14 | 18 | stations |  | [HYP] | BF |
| A-ECO-222a | Counsellor FTE, Y2 | 1 | 1.50 | 2 | FTE | Counsellor load A-GRO-38 | [HYP] | BF |
| A-ECO-222b | Counsellor FTE, Y3 | 1 | 2 | 2.50 | FTE |  | [HYP] | BF |
| A-ECO-223a | Academy manager in post, Y2 (FTE) | 0 | 1 | 1 | FTE | BM: M12-18 | [HYP] | BF |
| A-ECO-223b | Academy manager in post, Y3 (FTE; Conservative part-time ops lead) | 0.50 | 1 | 1 | FTE |  | [HYP] | BF |
| A-ECO-224a | Paid media, Y2 | ₹300,000 | ₹1,200,000 | ₹2,400,000 | ₹/yr | Growth steady-state x 12; Conservative = test level after failed spend gates (stop-loss) | [EST] | BF |
| A-ECO-224b | Paid media, Y3 | ₹300,000 | ₹1,300,000 | ₹2,600,000 | ₹/yr | Conservative held at test level | [EST] | BF |
| A-ECO-225 | Accommodation-partner coordination cost per destination student | ₹2,500 | ₹2,000 | ₹1,500 | ₹/student | geographic_expansion §4.1(a) ₹2k | [EST] | BF |
| A-ECO-226a | Capex Y2 (hybrid content refresh / build, stations, photo studio) | ₹300,000 | ₹300,000 | ₹500,000 | ₹ | Directional | [EST] | BF |
| A-ECO-226b | Capex Y3 (content refresh, stations) | ₹200,000 | ₹300,000 | ₹400,000 | ₹ | Directional | [EST] | BF |
| A-ECO-227 | Kit / product margin on retail sales to students & alumni, per career student per year (post price-step) | ₹600 | ₹960 | ₹1,400 | ₹/student | Same basis as A-ECO-37 (optional kit at near cost) | [HYP] | BF |
| A-ECO-301 | B1 owned regional centre: annual fixed cost (rent, lead trainer, trainer, counsellor, utilities, local brand, management) |  | 2,910,000 |  | ₹/yr | A-BM-13 [HYP] | [HYP] | BF (BM_Unit_Economics, Base only) |
| A-ECO-302 | B1 owned centre: capex + launch |  | 1,650,000 |  | ₹ | A-BM-13 ₹13-20L [HYP] | [HYP] | BF (BM_Unit_Economics, Base only) |
| A-ECO-303 | B1 owned centre: P1 students per year at maturity (Base) |  | 46 |  | students | BM breakeven ~46 [HYP] | [HYP] | BF (BM_Unit_Economics, Base only) |
| A-ECO-304 | B2 partner-hosted satellite: students per year |  | 25 |  | students | geographic_expansion §4.1 [HYP] | [HYP] | BF (BM_Unit_Economics, Base only) |
| A-ECO-305 | B3 franchise: royalty rate |  | 15% |  | % | A-BM-08 15-20% [HYP] | [HYP] | BF (BM_Unit_Economics, Base only) |
| A-ECO-306 | B3 franchise: franchisee revenue per unit per year |  | 4,000,000 |  | ₹/yr | Assumed: 46 P1 x ₹80k + short courses [HYP] | [HYP] | BF (BM_Unit_Economics, Base only) |
| A-ECO-307 | B3 franchise: PNA support cost per unit per year |  | 400,000 |  | ₹/yr | geographic_expansion §4.1(d) ₹3-5L [HYP] | [HYP] | BF (BM_Unit_Economics, Base only) |
| A-ECO-308 | B3 franchise: brand/franchise fee per unit (one-off) and system build cost |  | 450,000 |  | ₹ | A-BM-08 ₹4.3-5.0L; system ₹5-10L [HYP] | [HYP] | BF (BM_Unit_Economics, Base only) |
| A-ECO-309 | B3 franchise system build (manuals, audits, legal) |  | 750,000 |  | ₹ | geographic_expansion §4.1(d) [HYP] | [HYP] | BF (BM_Unit_Economics, Base only) |
| A-ECO-310 | C digital stand-alone: buyers per year at maturity |  | 2,000 |  | buyers | Gate: ≥200/month organic (BM §6.3) [HYP] | [HYP] | BF (BM_Unit_Economics, Base only) |
| A-ECO-311 | C digital: content + platform fixed cost per year |  | 600,000 |  | ₹/yr | Production + LMS + live sessions [HYP] | [HYP] | BF (BM_Unit_Economics, Base only) |
| A-ECO-312 | E marketplace: average order value (bridal + party mix) |  | 6,000 |  | ₹ | Bridal ₹15-25k; party ₹1.5-3k (S-CHD-12; A-CUS-02) [HYP] | [HYP] | BF (BM_Unit_Economics, Base only) |
| A-ECO-313 | E marketplace: take rate |  | 20% |  | % | UC 25-28%; Treatwell new-client only (S-INT-17/29) [HYP] | [HYP] | BF (BM_Unit_Economics, Base only) |
| A-ECO-314 | E marketplace: fulfilment / QA / support / re-do cost per booking |  | 400 |  | ₹ | Judgement; UC onboarding 22.8% of revenue (S-INT-11) [HYP] | [HYP] | BF (BM_Unit_Economics, Base only) |
| A-ECO-315 | E marketplace: CAC per new customer |  | 2,000 |  | ₹ | Bridal CPL ₹300-800, low conversion [HYP] | [HYP] | BF (BM_Unit_Economics, Base only) |
| A-ECO-316 | E marketplace: bookings per customer over 24 months (bridal ≈ once; leakage after first) |  | 1.40 |  | bookings | BM: bridal once-in-a-lifetime; Treatwell repeat commission-free [HYP] | [HYP] | BF (BM_Unit_Economics, Base only) |
| A-ECO-317 | E marketplace: platform tech + ops team + artist onboarding per year |  | 2,400,000 |  | ₹/yr | Tech ₹8L + 2 ops ₹7.2L + onboarding/QA ₹4L + marketing ops ₹4.8L [HYP] | [HYP] | BF (BM_Unit_Economics, Base only) |
| A-ECO-318 | E marketplace: bookings per year (≈5% of tricity pro-MUA bridal bookings x2 for party) |  | 800 |  | bookings | A-BM-11: 8.2k tricity bridal bookings [HYP] | [HYP] | BF (BM_Unit_Economics, Base only) |
| A-ECO-319 | Discount rate for 5-year NPV |  | 15% |  | % | Judgement for an owner-managed SME [HYP] | [HYP] | BF (BM_Unit_Economics, Base only) |
| A-ECO-320 | Ludhiana: destination students that would travel to Chandigarh per year (N_dest) |  | 10 |  | students | geographic_expansion §4.1 indifference rule [HYP] | [HYP] | BF (BM_Unit_Economics, Base only) |
| A-ECO-FUN-01 | Paid-route media CAC (CTWA + Search + Taster net), from funnel_economics.xlsx Summary | ₹16,680 | ₹4,826 | ₹1,422 | ₹/enrol | Pasted by run_all.py from funnel_economics.xlsx (Funnel_* row 'Paid-route media CAC') | [EST] model output | BF |
| A-ECO-FUN-02 | Funnel-required career media per month at target, from funnel_economics.xlsx | ₹64,548 | ₹37,633 | ₹9,387 | ₹/mo | Pasted by run_all.py (comparison only) | [EST] model output | BF |
| A-ECO-FUN-03 | Masterclass media per seat (inside the Growth paid budget), from funnel_economics.xlsx | ₹1,400 | ₹300 | ₹43 | ₹/seat | Pasted by run_all.py | [EST] model output | BF |
| A-ECO-FUN-04 | Self-makeup media per seat (inside the Growth paid budget), from funnel_economics.xlsx | ₹3,200 | ₹706 | ₹160 | ₹/seat | Pasted by run_all.py | [EST] model output | BF |
| A-GRO-01 | Career enrolments (L2+L3) per month, steady state (months 7-12) | 6 | 10 | 15 | enrol/mo | A-GRO-01 | [HYP] | FE, BF |
| A-GRO-02 | Pro (L3) share of career enrolments | 50% | 60% | 70% | % | A-GRO-02 | [HYP] | FE, BF |
| A-GRO-03a | Route mix: Meta CTWA | 30% | 30% | 30% | % | A-GRO-03 | [HYP] | FE, BF |
| A-GRO-03b | Route mix: Paid Search | 20% | 20% | 20% | % | A-GRO-03 | [HYP] | FE, BF |
| A-GRO-03c | Route mix: Organic (IG/site/GBP/SEO) | 20% | 20% | 20% | % | A-GRO-03 | [HYP] | FE, BF |
| A-GRO-03d | Route mix: Referral / alumni / walk-in | 20% | 20% | 20% | % | A-GRO-03 | [HYP] | FE, BF |
| A-GRO-03e | Route mix: Paid Career Taster | 10% | 10% | 10% | % | A-GRO-03 | [HYP] | FE, BF |
| A-GRO-04 | L1 Career Taster ticket | ₹999 | ₹999 | ₹999 | ₹ | A-GRO-04 base (range ₹499-1,999); credited on enrolment | [HYP] | FE, BF |
| A-GRO-05 | L2 Foundation fee (4 weeks, ~80 h) | ₹30,000 | ₹39,900 | ₹45,000 | ₹ | A-GRO-05 (Aggressive = midpoint of Growth base/high to avoid stacking upsides) | [HYP] | FE, BF |
| A-GRO-06 | L3 Professional Bridal Programme list tuition (after proof gate; kit optional) | ₹75,000 | ₹90,000 | ₹120,000 | ₹ | A-GRO-06 | [HYP] | FE, BF |
| A-GRO-07 | L4 masterclass average ticket | ₹5,000 | ₹10,000 | ₹14,000 | ₹ | A-GRO-07 (Aggressive = midpoint of base ₹10k / high ₹18k) | [HYP] | FE, BF |
| A-GRO-08 | L1-S5 self-makeup workshop price | ₹3,000 | ₹4,999 | ₹6,500 | ₹ | A-GRO-08 (Aggressive = midpoint) | [HYP] | FE, BF |
| A-GRO-09 | L5 Pro Circle membership | ₹4,999 | ₹9,999 | ₹12,499 | ₹/yr | A-GRO-09 (Aggressive = midpoint); free year 1 for L3 graduates | [HYP] | FE, BF |
| A-GRO-10 | Meta CTWA cost per lead, tricity | ₹600 | ₹300 | ₹150 | ₹/lead | A-GRO-10 (High=conservative) | [HYP] | FE, BF |
| A-GRO-11 | Meta CTWA cost per lead, regional tier-2 | ₹500 | ₹250 | ₹120 | ₹/lead | A-GRO-11 | [HYP] | FE, BF |
| A-GRO-12 | Google Search cost per lead | ₹800 | ₹500 | ₹300 | ₹/lead | A-GRO-12 | [HYP] | FE, BF |
| A-GRO-15 | Cost per Taster ticket sold | ₹700 | ₹400 | ₹200 | ₹/ticket | A-GRO-15 | [HYP] | FE, BF |
| A-GRO-16 | Cost per masterclass lead (paid) | ₹300 | ₹150 | ₹50 | ₹/lead | A-GRO-16 | [HYP] | FE, BF |
| A-GRO-17 | Cost per self-makeup lead (paid) | ₹400 | ₹200 | ₹100 | ₹/lead | A-GRO-17 | [HYP] | FE, BF |
| A-GRO-18a | Meta CTWA: Lead->QL | 35% | 40% | 45% | % | A-GRO-18 scenario set | [HYP] | FE, BF |
| A-GRO-18b | Meta CTWA: QL->Counselled | 45% | 55% | 65% | % | A-GRO-18 scenario set | [HYP] | FE, BF |
| A-GRO-18b-MC | Paid share of masterclass leads | 70% | 50% | 30% | % | A-GRO-18b (more organic = cheaper) | [HYP] | FE, BF |
| A-GRO-18b-SM | Paid share of self-makeup leads | 80% | 60% | 40% | % | A-GRO-18b | [HYP] | FE, BF |
| A-GRO-18c | Meta CTWA: Counselled->Applied | 25% | 30% | 35% | % | A-GRO-18 scenario set | [HYP] | FE, BF |
| A-GRO-18d | Meta CTWA: Applied->Enrolled | 75% | 80% | 85% | % | A-GRO-18 scenario set | [HYP] | FE, BF |
| A-GRO-19a | Paid Search: Lead->QL | 40% | 45% | 50% | % | A-GRO-19 scenario set | [HYP] | FE, BF |
| A-GRO-19b | Paid Search: QL->Counselled | 50% | 60% | 65% | % | A-GRO-19 scenario set | [HYP] | FE, BF |
| A-GRO-19c | Paid Search: Counselled->Applied | 28% | 32% | 35% | % | A-GRO-19 scenario set | [HYP] | FE, BF |
| A-GRO-19d | Paid Search: Applied->Enrolled | 75% | 80% | 85% | % | A-GRO-19 scenario set | [HYP] | FE, BF |
| A-GRO-20a | Organic: Lead->QL | 30% | 38% | 45% | % | A-GRO-20 scenario set | [HYP] | FE, BF |
| A-GRO-20b | Organic: QL->Counselled | 45% | 55% | 65% | % | A-GRO-20 scenario set | [HYP] | FE, BF |
| A-GRO-20c | Organic: Counselled->Applied | 25% | 30% | 35% | % | A-GRO-20 scenario set | [HYP] | FE, BF |
| A-GRO-20d | Organic: Applied->Enrolled | 75% | 80% | 85% | % | A-GRO-20 scenario set | [HYP] | FE, BF |
| A-GRO-21a | Referral/walk-in: Lead->QL | 60% | 70% | 80% | % | A-GRO-21 scenario set | [HYP] | FE, BF |
| A-GRO-21b | Referral/walk-in: QL->Counselled | 70% | 75% | 80% | % | A-GRO-21 scenario set | [HYP] | FE, BF |
| A-GRO-21c | Referral/walk-in: Counselled->Applied | 50% | 55% | 60% | % | A-GRO-21 scenario set | [HYP] | FE, BF |
| A-GRO-21d | Referral/walk-in: Applied->Enrolled | 80% | 87% | 92% | % | A-GRO-21 scenario set | [HYP] | FE, BF |
| A-GRO-22a | Taster: ticket -> attend | 75% | 82% | 90% | % | A-GRO-22 | [HYP] | FE, BF |
| A-GRO-22b | Taster: attendee -> counselled | 50% | 65% | 80% | % | A-GRO-22 | [HYP] | FE, BF |
| A-GRO-22c | Taster: counselled -> enrolled (<=60 days) | 16% | 20% | 25% | % | A-GRO-22 | [HYP] | FE, BF |
| A-GRO-24 | Lead->QL multiplier if speed-to-lead SLA NOT met (median >1 h) | 0.50 | 0.67 | 0.77 | x | A-GRO-24 (inverse of A-CUS-16) | [HYP] | FE, BF |
| A-GRO-25 | Founder-touch multiplier on counselled->applied (premium lost when team-led) | 1.50 | 1.25 | 1 | x | A-GRO-25 / A-CUS-30 (larger premium = more conversion lost as founder steps back) | [HYP] | FE, BF |
| A-GRO-26a | Online parents' session: registrant -> attendee | 25% | 35% | 45% | % | A-GRO-26 | [HYP] | FE, BF |
| A-GRO-26b | Online parents' session: attendee -> counselling booked | 20% | 30% | 40% | % | A-GRO-26 | [HYP] | FE, BF |
| A-GRO-27 | Masterclass lead -> purchase | 15% | 25% | 35% | % | A-GRO-27 | [HYP] | FE, BF |
| A-GRO-28 | Self-makeup lead -> booking | 10% | 17% | 25% | % | A-GRO-28 | [HYP] | FE, BF |
| A-GRO-29 | Masterclass repeat purchase per year (S3/alumni) | 25% | 30% | 40% | % | A-GRO-29 | [HYP] | FE, BF |
| A-GRO-30 | Self-makeup -> career upgrade | 1% | 3% | 5% | % | A-GRO-30 | [HYP] | FE, BF |
| A-GRO-31 | Career completion | 85% | 90% | 95% | % | A-GRO-31 | [HYP] | FE, BF |
| A-GRO-33 | Referral leads per alumnus per year | 0.20 | 0.40 | 0.60 | leads | A-GRO-33 | [HYP] | FE, BF |
| A-GRO-34 | Referral reward per enrolled referee | ₹5,000 | ₹3,000 | ₹2,000 | ₹ | A-GRO-34 (High=conservative) | [HYP] | FE, BF |
| A-GRO-35 | EMI uptake (L3) | 50% | 35% | 20% | % | A-GRO-35 (more EMI = more subvention) | [HYP] | FE, BF |
| A-GRO-35b | No-cost EMI subvention borne by PNA | 7% | 5% | 3% | % | A-GRO-35b | [HYP] | FE, BF |
| A-GRO-36 | Pro Circle paid uptake: graduates after free year | 20% | 30% | 45% | % | A-GRO-36 | [HYP] | FE, BF |
| A-GRO-36b | Pro Circle paid uptake: S3 masterclass buyers | 5% | 10% | 20% | % | A-GRO-36 | [HYP] | FE, BF |
| A-GRO-37 | Out-of-town share of career enrolments | 15% | 25% | 35% | % | A-GRO-37 / A-CHD-04 | [HYP] | FE, BF |
| A-GRO-38 | Counsellor capacity (conversations/day; 24 working days) | 25 | 30 | 40 | conv/day | A-GRO-38 | [HYP] | FE, BF |
| A-GRO-40-01 | Career-enquiry seasonality, calendar month 1 | 0.70 | 0.70 | 0.70 | index | A-GRO-40 (Jan..Dec, sums to 12) | [HYP] | BF |
| A-GRO-40-02 | Career-enquiry seasonality, calendar month 2 | 0.80 | 0.80 | 0.80 | index | A-GRO-40 (Jan..Dec, sums to 12) | [HYP] | BF |
| A-GRO-40-03 | Career-enquiry seasonality, calendar month 3 | 0.90 | 0.90 | 0.90 | index | A-GRO-40 (Jan..Dec, sums to 12) | [HYP] | BF |
| A-GRO-40-04 | Career-enquiry seasonality, calendar month 4 | 1 | 1 | 1 | index | A-GRO-40 (Jan..Dec, sums to 12) | [HYP] | BF |
| A-GRO-40-05 | Career-enquiry seasonality, calendar month 5 | 1.30 | 1.30 | 1.30 | index | A-GRO-40 (Jan..Dec, sums to 12) | [HYP] | BF |
| A-GRO-40-06 | Career-enquiry seasonality, calendar month 6 | 1.35 | 1.35 | 1.35 | index | A-GRO-40 (Jan..Dec, sums to 12) | [HYP] | BF |
| A-GRO-40-07 | Career-enquiry seasonality, calendar month 7 | 1.25 | 1.25 | 1.25 | index | A-GRO-40 (Jan..Dec, sums to 12) | [HYP] | BF |
| A-GRO-40-08 | Career-enquiry seasonality, calendar month 8 | 1.10 | 1.10 | 1.10 | index | A-GRO-40 (Jan..Dec, sums to 12) | [HYP] | BF |
| A-GRO-40-09 | Career-enquiry seasonality, calendar month 9 | 1.05 | 1.05 | 1.05 | index | A-GRO-40 (Jan..Dec, sums to 12) | [HYP] | BF |
| A-GRO-40-10 | Career-enquiry seasonality, calendar month 10 | 1 | 1 | 1 | index | A-GRO-40 (Jan..Dec, sums to 12) | [HYP] | BF |
| A-GRO-40-11 | Career-enquiry seasonality, calendar month 11 | 0.80 | 0.80 | 0.80 | index | A-GRO-40 (Jan..Dec, sums to 12) | [HYP] | BF |
| A-GRO-40-12 | Career-enquiry seasonality, calendar month 12 | 0.75 | 0.75 | 0.75 | index | A-GRO-40 (Jan..Dec, sums to 12) | [HYP] | BF |
| A-GRO-41 | Payment gateway fee | 2.4% | 2% | 1.8% | % | A-GRO-41 (Razorpay 2% + GST, claim) | [CLAIM] | FE, BF |
| A-GRO-42 | Martech stack run-rate (BSP + CRM + telephony + tools) | ₹8,000 | ₹18,000 | ₹30,000 | ₹/mo | A-GRO-42 as used in Growth §10 budget | [EST] | FE, BF |
| A-GRO-43 | Organic career leads per month, months 7-12 (Growth agent check value) | 25 | 40 | 60 | leads/mo | A-GRO-43 (model derives its own) | [HYP] | FE, BF |
| A-GRO-44 | Referral + walk-in career leads per month, months 7-12 (check value) | 5 | 8 | 12 | leads/mo | A-GRO-44 | [HYP] | FE, BF |
| A-GRO-45 | Admissions counsellor (FTE, incl. incentive) | ₹20,000 | ₹25,000 | ₹25,000 | ₹/mo | Growth §10 budget usage (A-GRO-45 range ₹20-32k) | [EST] | FE, BF |
| A-GRO-46 | Marketing/content team (B: exec ₹35k; A: manager ₹45k + creator ₹30k) | ₹0 | ₹35,000 | ₹75,000 | ₹/mo | Growth §10 | [EST] | FE, BF |
| A-GRO-47 | Freelance shooter/editor retainer | ₹12,000 | ₹20,000 | ₹25,000 | ₹/mo | Growth §10 | [EST] | FE, BF |
| A-GRO-48 | Performance-marketing freelancer/agency | ₹0 | ₹20,000 | ₹35,000 | ₹/mo | Growth §10 | [EST] | FE, BF |
| A-GRO-49 | Website rebuild (one-off) | ₹50,000 | ₹120,000 | ₹250,000 | ₹ | Growth §10 | [EST] | FE, BF |
| A-GRO-50 | SEO content freelancer | ₹0 | ₹15,000 | ₹25,000 | ₹/mo | Growth §10 | [EST] | FE, BF |
| A-GRO-BUD-01 | Paid media budget, month 1 (Nov-26) | ₹10,000 | ₹15,000 | ₹15,000 | ₹ | marketing_channel_plan.md §3.2 / growth_marketing_strategy.md §10 (re-aligned): ≤₹15k until G0, ≤₹60k until G1; B assumes G1 green at M7 | [EST] | BF |
| A-GRO-BUD-02 | Paid media budget, month 2 (Dec-26) | ₹15,000 | ₹15,000 | ₹15,000 | ₹ | marketing_channel_plan.md §3.2 / growth_marketing_strategy.md §10 (re-aligned): ≤₹15k until G0, ≤₹60k until G1; B assumes G1 green at M7 | [EST] | BF |
| A-GRO-BUD-03 | Paid media budget, month 3 (Jan-27) | ₹30,000 | ₹40,000 | ₹50,000 | ₹ | marketing_channel_plan.md §3.2 / growth_marketing_strategy.md §10 (re-aligned): ≤₹15k until G0, ≤₹60k until G1; B assumes G1 green at M7 | [EST] | BF |
| A-GRO-BUD-04 | Paid media budget, month 4 (Feb-27) | ₹35,000 | ₹50,000 | ₹60,000 | ₹ | marketing_channel_plan.md §3.2 / growth_marketing_strategy.md §10 (re-aligned): ≤₹15k until G0, ≤₹60k until G1; B assumes G1 green at M7 | [EST] | BF |
| A-GRO-BUD-05 | Paid media budget, month 5 (Mar-27) | ₹40,000 | ₹60,000 | ₹60,000 | ₹ | marketing_channel_plan.md §3.2 / growth_marketing_strategy.md §10 (re-aligned): ≤₹15k until G0, ≤₹60k until G1; B assumes G1 green at M7 | [EST] | BF |
| A-GRO-BUD-06 | Paid media budget, month 6 (Apr-27) | ₹40,000 | ₹60,000 | ₹120,000 | ₹ | marketing_channel_plan.md §3.2 / growth_marketing_strategy.md §10 (re-aligned): ≤₹15k until G0, ≤₹60k until G1; B assumes G1 green at M7 | [EST] | BF |
| A-GRO-BUD-07 | Paid media budget, month 7 (May-27) | ₹40,000 | ₹80,000 | ₹170,000 | ₹ | marketing_channel_plan.md §3.2 / growth_marketing_strategy.md §10 (re-aligned): ≤₹15k until G0, ≤₹60k until G1; B assumes G1 green at M7 | [EST] | BF |
| A-GRO-BUD-08 | Paid media budget, month 8 (Jun-27) | ₹40,000 | ₹100,000 | ₹200,000 | ₹ | marketing_channel_plan.md §3.2 / growth_marketing_strategy.md §10 (re-aligned): ≤₹15k until G0, ≤₹60k until G1; B assumes G1 green at M7 | [EST] | BF |
| A-GRO-BUD-09 | Paid media budget, month 9 (Jul-27) | ₹40,000 | ₹100,000 | ₹200,000 | ₹ | marketing_channel_plan.md §3.2 / growth_marketing_strategy.md §10 (re-aligned): ≤₹15k until G0, ≤₹60k until G1; B assumes G1 green at M7 | [EST] | BF |
| A-GRO-BUD-10 | Paid media budget, month 10 (Aug-27) | ₹40,000 | ₹100,000 | ₹200,000 | ₹ | marketing_channel_plan.md §3.2 / growth_marketing_strategy.md §10 (re-aligned): ≤₹15k until G0, ≤₹60k until G1; B assumes G1 green at M7 | [EST] | BF |
| A-GRO-BUD-11 | Paid media budget, month 11 (Sep-27) | ₹40,000 | ₹100,000 | ₹200,000 | ₹ | marketing_channel_plan.md §3.2 / growth_marketing_strategy.md §10 (re-aligned): ≤₹15k until G0, ≤₹60k until G1; B assumes G1 green at M7 | [EST] | BF |
| A-GRO-BUD-12 | Paid media budget, month 12 (Oct-27) | ₹40,000 | ₹100,000 | ₹200,000 | ₹ | marketing_channel_plan.md §3.2 / growth_marketing_strategy.md §10 (re-aligned): ≤₹15k until G0, ≤₹60k until G1; B assumes G1 green at M7 | [EST] | BF |
| A-IND-01 | B&WSSC-certified candidates per year (all beauty & wellness) | 130,000 | 170,000 | 210,000 | learners/yr | 10.25 lakh/8 yrs=1.28; 13 lakh/9=1.44; 20.7 lakh/10-11=1.88-2.07 (S-IND-02,-04,-05) | [EST] | MS |
| A-IND-02 | Organised share of vocational training (total = certified / share) | 40% | 40% | 40% | % | KPMG: unorganised ≈60% of vocational education (S-IND-01 p.67) | [EST] | MS |
| A-IND-03 | Paid (self-funded) share of trainees | 64% | 72% | 80% | % | 60% unorganised (self-paid) + 40% organised x 10/30/50% fee-paying (S-IND-01, S-IND-04) | [EST] | MS |
| A-IND-04 | Makeup-led share of paid learners | 15% | 25% | 35% | % | Most uncertain input; 2 of top-5 aspired roles are makeup (S-IND-01 p.53); Meribindiya catalogue ~half makeup (S-IND-37) | [HYP] | MS |
| A-IND-05a | Tier T1 entry/short share of makeup-led learners | 55% | 40% | 25% | % | india_market_analysis §8.1a | [HYP] | MS |
| A-IND-05b | Tier T1 representative fee | ₹15,000 | ₹20,000 | ₹25,000 | ₹ | Online micro 150-6,000; offline basics 10-35k (S-IND-27,-35,-54) | [EST] | MS |
| A-IND-05c | Tier T2 core professional share | 30% | 35% | 35% | % | §8.1a | [HYP] | MS |
| A-IND-05d | Tier T2 representative fee | ₹45,000 | ₹55,000 | ₹65,000 | ₹ | YMCA 54,355; Orane online 45,000; VLCC 78,000 (S-IND-25,-28,-33) | [EST] | MS |
| A-IND-05e | Tier T3 advanced/bridal share | 13% | 20% | 30% | % | §8.1a | [HYP] | MS |
| A-IND-05f | Tier T3 representative fee | ₹100,000 | ₹130,000 | ₹150,000 | ₹ | VLCC 1.66 lakh; Lakmé 1.2-1.8 lakh (S-IND-32,-34) | [EST] | MS |
| A-IND-05g | Tier T4 premium share | 2% | 5% | 10% | % | §8.1a | [HYP] | MS |
| A-IND-05h | Tier T4 representative fee | ₹250,000 | ₹300,000 | ₹350,000 | ₹ | Pearl 4.45 lakh incl GST; DBA 2.25-5.95 lakh (S-IND-23, S-NC-26) | [EST] | MS |
| A-IND-06 | Fee for non-makeup beauty courses | ₹10,000 | ₹13,000 | ₹18,000 | ₹ | Entry beautician/hair/nail courses (S-IND-31,-38) | [HYP] | MS |
| A-IND-07 | Branded chain/franchise centres offering paid beauty training | 300 | 450 | 600 | centres | Orane 115+, Lakmé 140+, VLCC 100-200 (claims; S-IND-30,-58,-59; S-NC-01) | [HYP] | MS |
| A-IND-08 | Paid learners per chain centre per year (all courses) | 80 | 110 | 125 | learners | Lakmé-Aptech plan 50,000/5 yrs/80 = 125 (S-IND-59) | [HYP] | MS |
| A-IND-09 | Independent paid learners as multiple of chain learners | 1.50 | 2 | 3 | x | KPMG 60:40 unorganised:organised (S-IND-01) | [HYP] | MS |
| A-IND-10a | Online / short-course layer: learners | 50,000 | 150,000 | 400,000 | learners/yr | Airblack ~35k students in 3+ yrs; Orane micro-courses (S-IND-27,-39,-40) | [HYP] | MS |
| A-IND-10b | Online / short-course layer: average fee | ₹600 | ₹1,500 | ₹3,000 | ₹ | Orane ₹590-5,990; Airblack from ₹150 | [HYP] | MS |
| A-IND-16 | FX for USD display only | 88 | 88 | 88 | ₹/USD | Illustrative | [HYP] | MS |
| A-IND-17 | Regional proxy: Chd+PB+HR+HP+J&K share of India incremental B&W workforce need | 7.65% | 7.65% | 7.65% | % | KPMG Table 5 (S-IND-01 pp.46-47) | [FACT] | MS |
| SOM-ADJ | Y3 adjacent revenue outside the training market (kit margin, services desk, partnerships) | 2 | 6.54 | 10.13 | ₹ lakh ex-GST | business_forecast.xlsx 3yr_Scenarios (linked by run_all.py) | [EST] model output | MS |
| SOM-BASELINE | Illustrative PNA baseline revenue today (CA-01 x assumed fees; NOT actual revenue) | 6.71 | 16.61 | 24.92 | ₹ lakh ex-GST | business_forecast.xlsx Unit_Economics baseline (CA-01, CA-02) | [HYP] | MS |
| SOM-CPD | Y3 working-artist CPD revenue (L4 masterclasses + L5 Pro Circle) | 5.84 | 27.04 | 61.15 | ₹ lakh ex-GST | business_forecast.xlsx 3yr_Scenarios (linked by run_all.py) | [EST] model output | MS |
| SOM-HYB | Y3 hybrid programme revenue | 4.63 | 25.15 | 49.35 | ₹ lakh ex-GST | business_forecast.xlsx 3yr_Scenarios (linked by run_all.py) | [EST] model output | MS |
| SOM-LRN-HYB | Y3 incremental destination/hybrid learners | 8 | 35 | 53.90 | learners | business_forecast.xlsx 3yr_Scenarios (linked by run_all.py) | [EST] model output | MS |
| SOM-LRN-REG | Y3 out-of-town career learners (offline + satellite) | 7.40 | 39.60 | 95 | learners | business_forecast.xlsx 3yr_Scenarios (linked by run_all.py) | [EST] model output | MS |
| SOM-LRN-TRI | Y3 tricity-origin career learners (L2+L3 new students) | 33.60 | 92.30 | 97.50 | learners | business_forecast.xlsx 3yr_Scenarios (linked by run_all.py) | [EST] model output | MS |
| SOM-ONL | Y3 online short-course revenue | 1.27 | 11.43 | 33.88 | ₹ lakh ex-GST | business_forecast.xlsx 3yr_Scenarios (linked by run_all.py) | [EST] model output | MS |
| SOM-REG | Y3 regional destination revenue (L3 outstation share + satellite if gated in) | 3.40 | 24.45 | 75.56 | ₹ lakh ex-GST | business_forecast.xlsx 3yr_Scenarios (linked by run_all.py) | [EST] model output | MS |
| SOM-TRI | Y3 tricity-origin flagship revenue (L1 taster, L1-S5 self-makeup, L2, L3 tricity share) | 19.51 | 70.90 | 104.57 | ₹ lakh ex-GST | business_forecast.xlsx 3yr_Scenarios (linked by run_all.py) | [EST] model output | MS |
| X-BS-SECTOR | Context only: Beauty & Salon sector size 2025P (NOT the education market) | 76,141 | 76,141 | 76,141 | ₹ crore | S-IND-01 Table 1 p.15 | [FACT] | MS |
| X-BW-CHD | B&W share of state workforce: Chandigarh | 6.16% | 6.16% | 6.16% | % | S-IND-01 (highest in India) | [FACT] | MS |
| X-BW-HP | B&W share of state workforce: HP | 2.02% | 2.02% | 2.02% | % | S-IND-01 | [FACT] | MS |
| X-BW-HR | B&W share of state workforce: Haryana | 3.44% | 3.44% | 3.44% | % | S-IND-01 | [FACT] | MS |
| X-BW-IND | B&W share of state workforce: India | 2.41% | 2.41% | 2.41% | % | S-IND-01 pp.34-35 | [FACT] | MS |
| X-BW-JK | B&W share of state workforce: J&K | 2.07% | 2.07% | 2.07% | % | S-IND-01 | [FACT] | MS |
| X-BW-PB | B&W share of state workforce: Punjab | 3.64% | 3.64% | 3.64% | % | S-IND-01 | [FACT] | MS |
| X-KPMG-NEED | KPMG incremental vocational training need per year (5.44M / 8) | 679,624 | 679,624 | 679,624 | learners/yr | S-IND-01 Table 4 p.46 | [FACT] | MS |
| X-W-CHD | Women 17-35: Chandigarh UT | 185 | 185 | 185 | 000 | §2 table | [EST] | MS |
| X-W-HP | Women 17-35: Himachal Pradesh | 1,097 | 1,097 | 1,097 | 000 | §2 table | [EST] | MS |
| X-W-HR | Women 17-35: Haryana excl. Panchkula | 4,627 | 4,627 | 4,627 | 000 | 4,730 - 103 | [EST] | MS |
| X-W-IND | Women aged 17-35, India, 2026 | 222,944 | 222,944 | 222,944 | 000 | S-CHD-01 Table 20 cohort rebuild (A-CHD-08) | [EST] | MS |
| X-W-JK | Women 17-35: J&K | 2,377 | 2,377 | 2,377 | 000 | §2 table | [EST] | MS |
| X-W-MOH | Women 17-35: SAS Nagar (Mohali) district | 183 | 183 | 183 | 000 | §2 table | [EST] | MS |
| X-W-PB | Women 17-35: Punjab excl. Mohali | 4,275 | 4,275 | 4,275 | 000 | 4,458 - 183 | [EST] | MS |
| X-W-PKL | Women 17-35: Panchkula district | 103 | 103 | 103 | 000 | §2 table | [EST] | MS |
| X-W-ROR | Women 17-35, rest of Punjab+Haryana+HP+J&K (excl. tricity) | 12,376 | 12,376 | 12,376 | 000 | chandigarh_market_analysis §8.3 (12,662 - 286 in tricity) | [EST] | MS |

---

## 7. Limitations

1. **No PNA first-party data.**
   - Enrolments, fees, discounts, space, stations, rent share, team and conversion are all assumptions (CA-01/02, A-ECO-110/118).
   - The illustrative baseline is not PNA's revenue or profit.
   - The founder data pull (V1) should replace CA-01, CA-02, A-ECO-101, A-ECO-110 and A-ECO-118 first.
2. **Market sizing rests on unobserved mix parameters.**
   - These are the makeup-led share (A-IND-04), tier fee mix (A-IND-05), tricity participation (A-CHD-03), the CA-05 scope share (A-ECO-06), provider intake (A-ECO-08..14) and reach shares (A-ECO-15/16/22).
   - The reconciled tricity band (₹1.4–5.3 cr) reflects method disagreement. Each method's own compounded extremes run from about 100 to 1,780 learners.
   - Mystery shopping and competitor intake checks would narrow it fastest.
3. **Funnel rates and CPLs are vendor or US benchmarks** (A-CUS/A-GRO), not makeup-specific. The awareness overhead (A-ECO-51) is a calibration, not evidence. Replace both with 6–8 weeks of CRM data.
4. **Targets drive enrolments.** The forecast follows the Growth plan's A-GRO-01 path and is limited only by budget and capacity. It does not model market saturation or competitor response. Price elasticity is captured only through the fee and conversion sensitivities.
5. **Cash excludes** income tax, GST input-credit timing, NBFC settlement lags beyond the instalment assumption, working-capital buffers and any founder draw. The refundable deposit is treated as a cash outflow.
6. **Years 2–3 are directional and annual.** Capacity, trainer lumpiness and seasonality are approximated. The Aggressive scenario stacks favourable rates and should be read as an upside bound. The "₹50L plan at Base rates" run is the realistic counterpart.
7. **Business-model columns (A–F) and Ludhiana routes are Base-only and directional.** Franchise, satellite and marketplace inputs are benchmarks or claims (A-BM-08/13/19; S-INT).
8. **GST:** the 18% rule for private non-recognised courses is sourced. PNA's own status (registration, any B&WSSC/NSQF-aligned exemption route) needs a chartered accountant.
9. **Web research:** 1 search was used (GST). All other inputs come from the project's research and strategy files.
