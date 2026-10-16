"""Build economics/business_forecast.xlsx

(a) Unit_Economics - programme ladder L1-L5 per seat / per cohort, breakeven fill, batch-cap test
(b) Outlook_* - 12-month monthly operating outlook (Nov-2026 .. Oct-2027) per scenario, plus Plan x Rates cross runs
(c) 3yr_Scenarios - directional Y1-Y3 by scenario with layers (flagship, regional destination, hybrid, CPD, online, adjacents, gated satellite)
(d) BM_Unit_Economics - business models A-F side by side + Ludhiana four-route comparison (BM spec M4)
(e) Sensitivity - tornado on Base Year-1 EBITDA and peak cash, from Flex_* copies of the Base outlook
Every number in calculation sheets is a formula on the Assumptions sheet. Each assumption is typed 'rate' (unit prices,
conversion, wages - adverse in Conservative) or 'plan' (what the ₹10/30/50L plan buys); an outlook sheet carries a rate
index and a plan index, which lets the model run e.g. the ₹50L plan at Base rates.
"""
import json
import os
import sys

import openpyxl
from openpyxl.styles import Font
from openpyxl.utils import get_column_letter as CL

sys.path.insert(0, os.path.dirname(__file__))
from xlhelpers import *  # noqa
import assumption_values as AV

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
OUT = os.path.join(ROOT, "economics", "business_forecast.xlsx")
FUN_JSON = os.path.join(os.path.dirname(__file__), "_funnel_outputs.json")
CASES = ("Conservative", "Base", "Aggressive")
FM = {"pct": FMT_PCT, "rs": FMT_RS, "int": FMT_INT, "1dp": FMT_1DP, "2dp": FMT_2DP, "gen": FMT_GEN}
MONTHS = ["Nov-26", "Dec-26", "Jan-27", "Feb-27", "Mar-27", "Apr-27", "May-27", "Jun-27", "Jul-27", "Aug-27", "Sep-27", "Oct-27"]

PLAN_IDS = {"CA-03", "A-GRO-01", "A-ECO-105", "A-ECO-33", "A-GRO-42", "A-GRO-45", "A-GRO-46", "A-GRO-47", "A-GRO-48", "A-GRO-49", "A-GRO-50"}

# ------------------------------------------------------------------------------------------------ forecast-only inputs
F = []  # (id, desc, c, b, g, unit, src, tag, fmt, type)


def f(aid, desc, c, b, g, unit, src, tag, fmt="gen", typ="plan"):
    F.append((aid, desc, c, b, g, unit, src, tag, fmt, typ))


fun = json.load(open(FUN_JSON)) if os.path.exists(FUN_JSON) else {"prcac": [16680, 4826, 1422], "media": [64548, 37633, 9387]}
f("A-ECO-FUN-01", "Paid-route media CAC (CTWA + Search + Taster net), from funnel_economics.xlsx Summary", *fun["prcac"], "₹/enrol",
  "Pasted by run_all.py from funnel_economics.xlsx (Funnel_* row 'Paid-route media CAC')", "[EST] model output", "rs", "rate")
f("A-ECO-FUN-02", "Funnel-required career media per month at target, from funnel_economics.xlsx", *fun["media"], "₹/mo",
  "Pasted by run_all.py (comparison only)", "[EST] model output", "rs", "rate")
f("A-ECO-FUN-03", "Masterclass media per seat (inside the Growth paid budget), from funnel_economics.xlsx", *fun.get("mc", [1400, 300, 43]), "₹/seat",
  "Pasted by run_all.py", "[EST] model output", "rs", "rate")
f("A-ECO-FUN-04", "Self-makeup media per seat (inside the Growth paid budget), from funnel_economics.xlsx", *fun.get("sm", [3200, 706, 160]), "₹/seat",
  "Pasted by run_all.py", "[EST] model output", "rs", "rate")
f("A-ECO-50", "Share of the paid-media budget that buys career (L2/L3) leads", 0.7, 0.7, 0.7, "%",
  "marketing_channel_plan.md rows 8-15: career CTWA, regional, Search, brand, taster half of M3, retargeting ≈70% of base ₹1.0L", "[EST]", "pct", "rate")
f("A-ECO-51", "Awareness/retargeting overhead factor on funnel CAC (calibrated so the Base plan budget buys the Base target at steady state)",
  "=CAL", "=CAL", "=CAL", "x", "Calibrated: A-ECO-50 x Base Oct-27 budget / (A-GRO-01 base x paid mix x A-ECO-FUN-01 base)", "[EST] calibration", "2dp", "rate")
ramp = {"C": [10, 15, 30, 35, 40, 40, 40, 40, 40, 40, 40, 40], "B": [15, 15, 40, 50, 60, 60, 80, 100, 100, 100, 100, 100],
        "A": [15, 15, 50, 60, 60, 120, 170, 200, 200, 200, 200, 200]}  # marketing_channel_plan.md §3.2 (re-aligned to Gate D caps)
for i, mth in enumerate(MONTHS):
    f(f"A-GRO-BUD-{i + 1:02d}", f"Paid media budget, month {i + 1} ({mth})", ramp["C"][i] * 1000, ramp["B"][i] * 1000, ramp["A"][i] * 1000, "₹",
      "marketing_channel_plan.md §3.2 (Gate E): ≤₹15k until G0, ≤₹60k until G1; ramp from G1+1 (Staged runs shift it: planning case G1 M9 -> ₹80k M10, ₹1.0L M11-12)", "[EST]", "rs", "plan")
sea = [0.70, 0.80, 0.90, 1.00, 1.30, 1.35, 1.25, 1.10, 1.05, 1.00, 0.80, 0.75]
s5 = [1.2, 1.3, 0.9, 0.8, 0.7, 0.6, 0.6, 0.8, 1.1, 1.4, 1.4, 1.2]
for i in range(12):
    f(f"A-GRO-40-{i + 1:02d}", f"Career-enquiry seasonality, calendar month {i + 1}", sea[i], sea[i], sea[i], "index", "A-GRO-40 (Jan..Dec, sums to 12)", "[HYP]", "2dp", "rate")
for i in range(12):
    f(f"A-ECO-60-{i + 1:02d}", f"Self-makeup (S5) seasonality, calendar month {i + 1}", s5[i], s5[i], s5[i], "index", "Peaks Oct-Feb before weddings/festivals (A-CUS-29); sums to 12", "[HYP]", "2dp", "rate")
f("A-BM-10a", "Founder share of student contact hours at M6", 0.60, 0.50, 0.45, "%", "A-BM-10 path (≤50% M6)", "[HYP]", "pct", "plan")
f("A-BM-10b", "Founder share of contact hours at M12", 0.40, 0.30, 0.25, "%", "A-BM-10 (≤30% M12)", "[HYP]", "pct", "plan")
f("A-BM-10c", "Founder share of contact hours, Year 2 average", 0.20, 0.15, 0.12, "%", "A-BM-10 (≤15% M24)", "[HYP]", "pct", "plan")
f("A-BM-10d", "Founder share of contact hours, Year 3 average", 0.12, 0.10, 0.08, "%", "A-BM-10 (≤10% M36)", "[HYP]", "pct", "plan")
f("A-ECO-52", "Lead trainer hire month", 3, 2, 1, "month #", "BM §6.1: lead trainer M0-3 (shadowing)", "[HYP]", "int", "plan")
f("A-ECO-106", "Proof gate 2 month: L3 list steps ₹75k -> ₹90k (two-step path; inside G2)", 99, 16, 13, "month #", "recommended_strategy.md §7.2: step 2 at G2 (M15-M18)", "[HYP]", "int", "rate")
f("A-ECO-160", "Price step 1 list fee (two-step path)", 75000, 75000, 75000, "₹", "recommended_strategy.md §7.2 (= A-GRO-06 low)", "[HYP]", "rs", "rate")
f("A-BM-10b-G", "Founder share of contact hours at M12 - Gate D path (≤40% M12, ≤30% M18)", 0.40, 0.40, 0.40, "%", "recommended_strategy.md §10 #2", "[REC]", "pct", "plan")
f("A-BM-10c-G", "Founder share, Year 2 average - Gate D path (40% M12 -> 30% M18 -> 15% M24)", 0.29, 0.29, 0.29, "%", "Linear path average (35% M13-18, 22.5% M19-24)", "[EST]", "pct", "plan")
f("A-BM-10d-G", "Founder share, Year 3 average - Gate D path (15% M24 -> 10% M36)", 0.125, 0.125, 0.125, "%", "Linear path average", "[EST]", "pct", "plan")
f("A-ECO-151", "Staged Plan: paid-media cap per month before G1 (T1 test level)", 60000, 60000, 60000, "₹/mo", "recommended_strategy.md §5 T1 (≤₹60k/month)", "[REC]", "rs", "plan")
f("A-ECO-152", "Staged Plan: basic recording of theory modules in T1 (month 3)", 100000, 100000, 100000, "₹", "recommended_strategy.md §5 T1 (₹1L)", "[REC]", "rs", "plan")
f("A-ECO-154", "Staged Plan: running cost of the studio weekend/evening batch slot (utilities, housekeeping, weekend premium)", 10000, 8000, 6000, "₹/mo", "recommended_strategy.md §5/§10 #16; judgement", "[HYP]", "rs", "rate")
f("A-ECO-155", "Staged Plan: studio batch slots per day once the weekend/evening slot is added (before the move)", 2.5, 2.5, 2.5, "slots", "recommended_strategy.md §11.3 #2 (2.5 slots a day)", "[HYP]", "1dp", "plan")
f("A-ECO-156", "Staged Plan: month the studio weekend/evening slot starts", 5, 5, 5, "month #", "recommended_strategy.md §5 T1 (from M5)", "[HYP]", "int", "plan")
f("A-ECO-153", "Tranche T1 cash cap (cumulative cash need before G1)", 1500000, 1500000, 1500000, "₹", "recommended_strategy.md §5 T1 (up to ₹15L)", "[REC]", "rs", "plan")
# Gate E (independent_review.md C1-C5) additions
f("A-ECO-157", "Staged Plan: Admissions & Operations Lead premium over the counsellor salary (replaces counsellor #1 from M1; owns the 90-day plan)", 15000, 15000, 15000, "₹/mo",
  "independent_review.md C3/RT-03; rationale: senior admissions/ops hire in tricity", "[HYP]", "rs", "rate")
f("A-ECO-163", "Staged Plan: second trainer (first additional trainer FTE) in post from month (not before G1+1)", 10, 10, 10, "month #",
  "independent_review.md C4/RT-04/RT-11: second trainer from Aug 2027 (M10) in the planning case", "[HYP]", "int", "plan")
f("A-ECO-161", "Destination pilot cohort: out-of-town L3 students over the two pilot intakes from the Destination start (planning case Aug-Sep 2027, M10-M11)", 4, 6, 8, "students",
  "twelve_month_roadmap.md pilot ≥6; growth_marketing_strategy.md §1.1 Phase 3 (Aug-Sep 2027); RT-15", "[HYP]", "1dp", "plan")
f("A-ECO-162", "False-positive stress: demand after a G1 false positive, share of planned demand (all products)", 0.6, 0.6, 0.6, "%",
  "independent_review.md RT-01/C1: contribution 40% below plan from G1+1", "[HYP]", "pct", "rate")
f("A-ECO-158", "Stop-loss lease exit: months of new-space rent paid as notice after an exit decision (booked in the exit month)", 3, 3, 3, "months",
  "independent_review.md C1 (3-month rent notice); typical commercial lease notice", "[HYP]", "1dp", "rate")
f("A-ECO-159", "Stop-loss severance: months of salary for staff released at a cut / exit", 1, 1, 1, "months",
  "independent_review.md C1 (1 month of salaries)", "[HYP]", "1dp", "rate")
f("A-BM-01", "Batch cap: students per L3 cohort", 12, 12, 12, "students", "BM A-BM-01 (cap 12)", "[HYP]", "int", "rate")
f("A-ECO-166", "G1 cohort test: fill threshold for two consecutive L3 cohorts", 0.75, 0.75, 0.75, "%", "recommended_strategy.md §7.1 G1 (2 consecutive cohorts ≥75% full)", "[REC]", "pct", "rate")
f("A-ECO-167", "Founder contingency reserve above the ₹30L envelope (KT-11)", 500000, 500000, 500000, "₹", "recommended_strategy.md §5 / KT-11 (₹30L + ₹5L contingency)", "[REC]", "rs", "plan")
COHORTS = [(2.10, "Mon 4 Jan 2027", 3), (4.00, "Mon 1 Mar 2027", 5), (5.37, "~Mon 12 Apr 2027", 6), (6.74, "~Mon 24 May 2027", 7),
           (8.13, "~Mon 5 Jul 2027", 9), (9.48, "~Mon 16 Aug 2027", 10), (10.87, "~Mon 27 Sep 2027", 11)]   # (model time, date, model month)
for k, (t, dt, mm) in enumerate(COHORTS, 1):
    f(f"A-ECO-164-{k}", f"L3 local cohort {k} start, in model months from 1 Nov 2026 (= {dt}, month M{mm})", t, t, t, "model months",
      "twelve_month_roadmap.md intake rhythm: cohort 1 Mon 4 Jan, cohort 2 Mon 1 Mar, then about every 6 weeks (one local L3 cohort per intake)", "[HYP]", "2dp", "rate")
COHORTS8 = [(2.10, "Mon 4 Jan 2027", 3), (4.00, "Mon 1 Mar 2027", 5), (5.83, "~Mon 26 Apr 2027", 6), (7.67, "~Mon 21 Jun 2027", 8),
            (9.48, "~Mon 16 Aug 2027", 10), (11.33, "~Mon 11 Oct 2027", 12)]
for k, (t, dt, mm) in enumerate(COHORTS8, 1):
    f(f"A-ECO-165-{k}", f"Alternative 8-weekly intake: L3 cohort {k} start, model months from 1 Nov 2026 (= {dt}, M{mm})", t, t, t, "model months",
      "Gate E test of the G1 cohort criterion: intakes every 8 weeks instead of 6", "[HYP]", "2dp", "rate")
f("A-ECO-228a", "Price-response stress at price step 2 (₹90k list): change in career conversion (3yr sensitivity group 7)", -0.10, -0.10, -0.10, "%",
  "independent_review.md RT-05/C5 (-10%)", "[HYP]", "pct", "rate")
f("A-ECO-228b", "Price-response stress at price step 2 (₹90k list): change in career conversion (3yr sensitivity group 8)", -0.20, -0.20, -0.20, "%",
  "independent_review.md RT-05/C5 (-20%)", "[HYP]", "pct", "rate")
f("A-ECO-170", "Optional pro kit price to the student (itemised, near cost)", 25000, 20000, 18000, "₹", "positioning_and_segments.md §6: ₹18-25k", "[HYP]", "rs", "rate")
f("A-BM-12a", "Living + travel for an out-of-town student on the 12-week Weekday format", 54000, 43500, 33000, "₹", "A-BM-12: ₹33-54k (PG ₹10-16k x 3 + travel)", "[EST]", "rs", "rate")
f("A-BM-12b", "Living + travel for the Destination format (5-6 weeks in Chandigarh)", 28000, 22500, 17000, "₹", "A-BM-12: ₹17-28k", "[EST]", "rs", "rate")
f("A-ECO-171", "Local commute per class day (tricity resident)", 150, 120, 100, "₹/day", "Judgement (auto/bus within tricity)", "[HYP]", "rs", "rate")
f("A-ECO-172a", "Class days: Weekday format (12 weeks x 5 days)", 60, 60, 60, "days", "§6.1 Weekday 12 weeks", "[EST]", "int", "rate")
f("A-ECO-172b", "Class days: Flex format (~20 weeks x 3 days)", 60, 60, 60, "days", "§6.1 Flex ~20 weeks part-time", "[EST]", "int", "rate")
f("A-ECO-52b", "Lead trainer FTE (0.5 = part-time senior trainer in the ₹10L plan)", 0.5, 1, 1, "FTE", "BM §6.5: ₹10L plan = part-time trainer", "[HYP]", "1dp", "plan")
f("A-ECO-138", "Memo: market salary for the founder's ongoing role (brand face, curriculum, masterclasses, assessment)", 75000, 75000, 75000, "₹/mo", "BM quotes EBITDA after a founder-role salary; judgement", "[HYP]", "rs", "rate")
f("A-ECO-53", "Counsellor #1 start month", 3, 1, 1, "month #", "Growth §10: C 1 FTE x10 mo; B/A from M1", "[EST]", "int", "plan")
f("A-ECO-54", "Counsellor #2 FTE", 0, 0.5, 1, "FTE", "Growth §10: B 0.5 FTE x7; A 1 FTE x9", "[EST]", "1dp", "plan")
f("A-ECO-55", "Counsellor #2 start month", 99, 7, 4, "month #", "Growth §10 (re-aligned): B 0.5 FTE x6 after G1; A 1 FTE x9", "[EST]", "int", "plan")
f("A-ECO-57a", "Marketing/content team start month", 2, 2, 2, "month #", "Growth §10 (x11 months)", "[EST]", "int", "plan")
f("A-ECO-57b", "Performance freelancer start month", 2, 2, 2, "month #", "Growth §10 (x11)", "[EST]", "int", "plan")
f("A-ECO-57c", "SEO freelancer start month", 3, 3, 3, "month #", "Growth §10 (x10)", "[EST]", "int", "plan")
f("A-ECO-57d", "Shooter/editor start month", 1, 2, 1, "month #", "Growth §10 (re-aligned): C x12, B x11 from M2, A x12", "[EST]", "int", "plan")
f("A-ECO-58", "Partnerships, PR / outcomes report, contingency (Growth §10 lines, monthly average)", 3333, 15833, 19167, "₹/mo",
  "Growth §10: partnerships/events ex-rewards & pop-ups + outcomes/PR + contingency", "[EST]", "rs", "plan")
f("A-ECO-110", "Stations in today's Sector 8 studio-academy", 8, 8, 8, "stations", "Founder to confirm (BM: 8-12 needed)", "[HYP]", "int", "rate")
f("A-ECO-111", "Batch slots per day in today's space (morning, afternoon)", 2, 2, 2, "slots", "Weekends kept for masterclasses / studio bridal work", "[HYP]", "1dp", "plan")
f("A-ECO-112", "Move to dedicated academy space in month (99 = no move in Year 1)", 99, 7, 4, "month #", "BM §6.5: space only if studio cannot host 8-12 stations; capacity binds", "[HYP]", "int", "plan")
f("A-ECO-113", "New academy space size", 0, 1300, 1600, "sq ft", "BM: 1,200-1,500 sq ft", "[HYP]", "int", "plan")
f("A-ECO-114", "Rent for new space", 113, 80, 80, "₹/sq ft/mo", "S-CHD-22 asking rents: Sector 34 ₹113-130; Sector 21/Manimajra ₹80; city median ₹47", "[FACT] bands / [HYP] pick", "rs", "rate")
f("A-ECO-115", "Stations in new space", 8, 12, 16, "stations", "Batch cap 12 (A-BM-01)", "[HYP]", "int", "plan")
f("A-ECO-116", "Batch slots per day in new space (incl. weekend / flex batch)", 2, 2.5, 2.5, "slots", "BM: morning, afternoon, weekend slots", "[HYP]", "1dp", "plan")
f("A-ECO-117", "Maximum usable share of seat capacity", 0.9, 0.9, 0.9, "%", "Scheduling friction", "[HYP]", "pct", "rate")
f("A-ECO-118", "Academy share of today's Sector 8 occupancy cost (rent + maintenance)", 45000, 35000, 35000, "₹/mo", "Unknown - founder Q3; ~700 sq ft at ₹50-65", "[HYP]", "rs", "rate")
f("A-ECO-119", "Utilities, housekeeping in today's space", 12000, 10000, 10000, "₹/mo", "Judgement", "[HYP]", "rs", "rate")
f("A-ECO-120", "Utilities, housekeeping, maintenance in new space", 14, 12, 12, "₹/sq ft/mo", "Judgement (AC-heavy lighting)", "[HYP]", "rs", "rate")
f("A-ECO-121", "Fit-out cost (interiors, electrical, AC, lighting, signage)", 900, 800, 800, "₹/sq ft", "A-BM-07: ₹8-15L for 1,200-1,500 sq ft (S-BM-08/09)", "[EST]", "rs", "rate")
f("A-ECO-122", "Cost per additional makeup station (mirror, lights, chair, trolley)", 35000, 30000, 30000, "₹/station", "Judgement", "[HYP]", "rs", "rate")
f("A-ECO-123", "Security deposit", 3, 3, 3, "months of rent", "Typical commercial lease", "[HYP]", "1dp", "rate")
f("A-ECO-124", "Front-desk / operations coordinator (from move month)", 0, 18000, 18000, "₹/mo", "Judgement", "[HYP]", "rs", "plan")
f("A-ECO-125", "Academy manager / admissions head salary", 65000, 65000, 65000, "₹/mo", "BM §6.1: academy manager M12-18", "[HYP]", "rs", "rate")
f("A-ECO-126", "Academy manager start month", 99, 13, 10, "month #", "BM §6.1", "[HYP]", "int", "plan")
f("A-ECO-127", "LMS / hybrid platform", 5000, 5000, 8000, "₹/mo", "From hybrid launch", "[HYP]", "rs", "plan")
f("A-ECO-128", "Destination format start month: pilot cohort (A-ECO-161) over the first two intakes, then out-of-town L3 students take the format (Staged: not before G1+1)", 99, 10, 8, "month #",
  "BM: pilot before G2; Gate E: pilot Aug-Sep 2027 (M10-M11) after G1 at M9", "[HYP]", "int", "plan")
f("A-ECO-129", "Hybrid pre-work content production + LMS set-up (capex, 2 months before launch)", 100000, 350000, 550000, "₹", "BM §6.5: ₹1L / 3-4L / 5-6L", "[EST]", "rs", "plan")
f("A-ECO-130", "Regional pop-up pilot start month", 99, 9, 6, "month #", "BM: pilots ≤₹2L from ~M9 before G2", "[HYP]", "int", "plan")
f("A-ECO-131", "Masterclass (L4) seats offered per month at steady state", 12, 24, 30, "seats/mo", "A-GRO §10.3 (2 x 12 base); BM A-BM-05", "[HYP]", "int", "plan")
f("A-ECO-132", "Masterclass fill (sell-through)", 0.75, 0.85, 0.90, "%", "Growth KPI ≥80% sell-through", "[HYP]", "pct", "rate")
f("A-ECO-133", "Self-makeup (L1-S5) seats per month, season-average", 10, 15, 22, "seats/mo", "A-GRO §10.3 (15 base)", "[HYP]", "int", "plan")
f("A-ECO-134", "Admin, accounting, professional fees, insurance, misc.", 12000, 15000, 20000, "₹/mo", "Judgement", "[HYP]", "rs", "plan")
f("A-ECO-135", "One-off: B&WSSC alignment, legal (fee/refund/claims), accounting set-up (month 3)", 50000, 150000, 200000, "₹", "BM §6.5: ₹0.5L / 1-2L", "[EST]", "rs", "plan")
f("A-ECO-136", "Capex month 1: CRM/WhatsApp BSP set-up, GBP, photo/video proof kit", 50000, 150000, 250000, "₹", "BM §6.5 CRM/website/proof ₹1.5L / 2-3L / 3-4L less website", "[EST]", "rs", "plan")
f("A-ECO-137", "Referral-route share of career enrolments (for rewards)", 0.2, 0.2, 0.2, "%", "A-GRO-03d", "[HYP]", "pct", "rate")
# 3-year drivers
f("A-ECO-201", "Career enrolment growth: Y2 vs annualised Y1 H2 run-rate", 0.05, 0.10, 0.15, "%", "Directional", "[HYP]", "pct", "plan")
f("A-ECO-202", "Career enrolment growth: Y3 vs Y2", 0.05, 0.10, 0.12, "%", "Directional", "[HYP]", "pct", "plan")
f("A-ECO-203a", "Out-of-town share of career enrolments, Y2", 0.15, 0.25, 0.35, "%", "A-GRO-37; BM A-BM-21", "[HYP]", "pct", "plan")
f("A-ECO-203b", "Out-of-town share of career enrolments, Y3", 0.18, 0.30, 0.40, "%", "BM: 25-35% by M30 (base)", "[HYP]", "pct", "plan")
f("A-ECO-204a", "Incremental destination/hybrid regional students (G2 engine), Y2", 0, 15, 30, "students", "BM A-BM-17: P1 out-of-town 10/35/60 by Y3", "[HYP]", "int", "plan")
f("A-ECO-204b", "Incremental destination/hybrid regional students, Y3", 8, 35, 60, "students", "BM A-BM-17", "[HYP]", "int", "plan")
f("A-ECO-205a", "Masterclass seats sold, Y2", 110, 220, 330, "seats", "A-BM-05: base 280 by Y3", "[HYP]", "int", "plan")
f("A-ECO-205b", "Masterclass seats sold, Y3", 130, 280, 420, "seats", "A-BM-05; A-BM-17 120/280/400", "[HYP]", "int", "plan")
f("A-ECO-206a", "Self-makeup seats, Y2", 110, 170, 250, "seats", "Directional", "[HYP]", "int", "plan")
f("A-ECO-206b", "Self-makeup seats, Y3", 120, 190, 280, "seats", "Directional", "[HYP]", "int", "plan")
f("A-ECO-207a", "Regional pop-up events, Y2", 0, 6, 12, "events", "geographic_expansion §5.2 (~14-event circuit after G2)", "[HYP]", "int", "plan")
f("A-ECO-207b", "Regional pop-up events, Y3", 2, 12, 16, "events", "Directional", "[HYP]", "int", "plan")
f("A-ECO-208a", "Online short-course / online masterclass buyers, Y2", 0, 300, 800, "buyers", "Deferred to gate: ≥50k engaged followers (BM §6.3)", "[HYP]", "int", "plan")
f("A-ECO-208b", "Online buyers, Y3", 150, 900, 2000, "buyers", "Directional", "[HYP]", "int", "plan")
f("A-ECO-209", "Online course / masterclass price", 999, 1499, 1999, "₹", "Orane ₹499; Mickey Contractor ₹2,999 (S-NC-17/43)", "[HYP]", "rs", "rate")
f("A-ECO-210", "Online: CAC per paid buyer x paid share 50%", 600, 400, 250, "₹/buyer", "Judgement", "[HYP]", "rs", "rate")
f("A-ECO-211", "Online content production per year (opex)", 100000, 200000, 300000, "₹/yr", "Judgement", "[HYP]", "rs", "plan")
f("A-ECO-212", "Online platform / payment fee", 0.10, 0.08, 0.06, "%", "Judgement", "[HYP]", "pct", "rate")
f("A-BM-09a", "Alumni booking-desk referred bookings, Y2", 10, 40, 60, "bookings", "A-BM-09: 30/120/150 by Y3", "[HYP]", "int", "plan")
f("A-BM-09b", "Alumni booking-desk referred bookings, Y3", 30, 120, 150, "bookings", "A-BM-09", "[HYP]", "int", "plan")
f("A-BM-09c", "Desk fee per referred booking (10-15% or flat ₹1-2.5k)", 1500, 1750, 2000, "₹", "A-BM-09", "[HYP]", "rs", "rate")
f("A-ECO-213a", "Brand partnership / sponsorship net income, Y2", 100000, 200000, 300000, "₹", "A-BM-17 kits/brand ₹3/6/10L by Y3", "[HYP]", "rs", "plan")
f("A-ECO-213b", "Brand partnership / sponsorship net income, Y3", 150000, 400000, 600000, "₹", "A-BM-17", "[HYP]", "rs", "plan")
f("A-ECO-214", "Partner-hosted satellite students in Y3 (only if G3a met; Aggressive only)", 0, 0, 30, "students", "BM §6.3 G3a ≥M24; geographic_expansion §4.1(b)", "[HYP]", "int", "plan")
f("A-BM-19", "Satellite host revenue share", 0.30, 0.25, 0.20, "%", "A-BM-19: 20-30%", "[HYP]", "pct", "rate")
f("A-ECO-215", "Satellite trainer allocation per student + set-up capex", 10000, 10000, 10000, "₹/student", "geographic_expansion §4.1(b) ₹10k; capex ₹2-5L", "[EST]", "rs", "rate")
f("A-ECO-216", "Satellite set-up capex (stations, branding, kit)", 500000, 350000, 350000, "₹", "geographic_expansion §4.1(b)", "[EST]", "rs", "rate")
f("A-ECO-217", "Annual L3 / L2 fee escalation from Y3", 0.05, 0.06, 0.08, "%", "Directional, proof-led price steps", "[HYP]", "pct", "rate")
f("A-ECO-218", "Wage escalation per year", 0.10, 0.08, 0.08, "%", "Judgement", "[HYP]", "pct", "rate")
f("A-ECO-219", "Rent escalation per year", 0.05, 0.05, 0.05, "%", "Typical lease", "[HYP]", "pct", "rate")
f("A-ECO-220a", "Batch slots per day, Y2", 2.5, 3, 3, "slots", "Weekend / evening batches", "[HYP]", "1dp", "plan")
f("A-ECO-220b", "Batch slots per day, Y3", 3, 3, 3, "slots", "", "[HYP]", "1dp", "plan")
f("A-ECO-221a", "Stations, Y2", 8, 12, 16, "stations", "", "[HYP]", "int", "plan")
f("A-ECO-221b", "Stations, Y3", 10, 14, 18, "stations", "", "[HYP]", "int", "plan")
f("A-ECO-222a", "Counsellor FTE, Y2", 1, 1.5, 2, "FTE", "Counsellor load A-GRO-38", "[HYP]", "1dp", "plan")
f("A-ECO-222b", "Counsellor FTE, Y3", 1, 2, 2.5, "FTE", "", "[HYP]", "1dp", "plan")
f("A-ECO-223a", "Academy manager in post, Y2 (FTE)", 0, 1, 1, "FTE", "BM: M12-18", "[HYP]", "1dp", "plan")
f("A-ECO-223b", "Academy manager in post, Y3 (FTE; Conservative part-time ops lead)", 0.5, 1, 1, "FTE", "", "[HYP]", "1dp", "plan")
f("A-ECO-224a", "Paid media, Y2", 300000, 1200000, 2400000, "₹/yr", "Growth steady-state x 12; Conservative = test level after failed spend gates (stop-loss)", "[EST]", "rs", "plan")
f("A-ECO-224b", "Paid media, Y3", 300000, 1300000, 2600000, "₹/yr", "Conservative held at test level", "[EST]", "rs", "plan")
f("A-BM-15", "Regional acquisition cost per incremental destination student", 15000, 12500, 10000, "₹/student", "A-BM-15 out-of-town CAC ₹10-15k", "[HYP]", "rs", "rate")
f("A-ECO-225", "Accommodation-partner coordination cost per destination student", 2500, 2000, 1500, "₹/student", "geographic_expansion §4.1(a) ₹2k", "[EST]", "rs", "rate")
f("A-ECO-226a", "Capex Y2 (hybrid content refresh / build, stations, photo studio)", 300000, 300000, 500000, "₹", "Directional", "[EST]", "rs", "plan")
f("A-ECO-226b", "Capex Y3 (content refresh, stations)", 200000, 300000, 400000, "₹", "Directional", "[EST]", "rs", "plan")
f("A-ECO-227", "Kit / product margin on retail sales to students & alumni, per career student per year (post price-step)", 600, 960, 1400, "₹/student", "Same basis as A-ECO-37 (optional kit at near cost)", "[HYP]", "rs", "rate")


SELOPTS = {"staged": "=Assumptions!$D$5", "g1": "=Assumptions!$F$5", "pp": "=Assumptions!$H$5", "fp": "=Assumptions!$J$5",
           "fpos": "=Assumptions!$L$5", "xm": "=Assumptions!$N$5", "deep": "=Assumptions!$P$5"}
PLAN_OPTS = {"staged": 1, "g1": 9, "pp": 2, "fp": 2}     # planning case (Gate E): Staged, G1 at M9, two-step price, founder ≤40% M12
STAGED_RUNS = [
    ("Staged_G1M9", 2, 2, "PLANNING CASE - STAGED PLAN, G1 at M9 (Jul 2027): Base team from M1 with an Admissions & Operations Lead; ₹10L-plan capex, studio stations (+ weekend/evening slot from M5) and media ≤₹60k/month until G1; T2 (space move, 0.5 counsellor, pop-ups) from M10; second trainer from M10; Destination pilot M10-M11; two-step price (step 1 M10, step 2 M16); founder ≤40% at M12; media ₹80k M10, ₹1.0L M11-12",
     dict(PLAN_OPTS)),
    ("Staged_G1M6", 2, 2, "UPSIDE - STAGED PLAN, G1 at M6 (Apr 2027): as the planning case but T2, space move, price step 1 and the media ramp from M7",
     {"staged": 1, "g1": 6, "pp": 2, "fp": 2}),
    ("Staged_Cons", 1, 2, "DOWNSIDE (a) - Staged T1 team (Base plan) at Conservative rates; G1 not passed (no T2, no move, no price step); no cut",
     {"staged": 1, "g1": 99, "pp": 2, "fp": 2}),
    ("Staged_Cons_CutM5", 1, 2, "DOWNSIDE (a) - as Staged_Cons, cut to the ₹10L-plan cost base at a T1 review in M5 (1 month severance)",
     {"staged": 1, "g1": 99, "pp": 2, "fp": 2, "xm": 5}),
    ("Staged_Cons_CutM5_Deep", 1, 2, "DOWNSIDE (a) - as Staged_Cons, KT-1a mandatory cut at the March 2027 review (M5) to the stop-loss state as strategy §7 defines it: ₹10L-plan team and media lines, paid media paused, content executive and freelancers released, Lead Trainer 0.5 FTE, founder-led delivery (no additional trainers), Operations Lead kept",
     {"staged": 1, "g1": 99, "pp": 2, "fp": 2, "xm": 5, "deep": 1}),
    ("Staged_Cons_CutM10", 1, 2, "DOWNSIDE (a) - as Staged_Cons, strategy rule as written: G1 fails at the M9 review, ₹10L-plan cost base from M10 (1 month severance)",
     {"staged": 1, "g1": 99, "pp": 2, "fp": 2, "xm": 10}),
    ("Staged_FalsePos", 2, 2, "DOWNSIDE (b) - planning-case timing: G1 passed at M9 on a false positive; T2 released (fit-out + deposit M9, move M10); demand x0.6 from M10; KT-5 price reversion for the M11 intake; miss visible in M11; stop-loss exit M12 (3 months' rent notice + 1 month salaries; ₹10L-plan cost base back in the studio)",
     {"staged": 1, "g1": 9, "pp": 2, "fp": 2, "fpos": 1, "xm": 12}),
    ("Staged_FalsePos_M6", 2, 2, "DOWNSIDE (b), upside timing - G1 passed at M6 on a false positive; T2 released (fit-out M6, move M7); demand x0.6 from M7 (May-Jul peak); KT-5 reversion M8; miss visible in M8; stop-loss exit M9",
     {"staged": 1, "g1": 6, "pp": 2, "fp": 2, "fpos": 1, "xm": 9}),
    ("Base_TwoStep", 2, 2, "Base bundle with the two-step price path (₹75k list at M7, ₹90k list at M16; ~89% realisation)", {"pp": 2}),
    ("Conservative_TwoStep", 1, 1, "Conservative bundle with the two-step price path (step 1 at M10; Conservative list stays ₹75k)", {"pp": 2}),
    ("Base_Founder40", 2, 2, "Base bundle with founder share ≤40% at M12 (Gate D path) instead of ≤30%", {"fp": 2}),
]


def typ_of(aid):
    for x in F:
        if x[0] == aid:
            return x[9]
    return "plan" if aid in PLAN_IDS else "rate"


# ------------------------------------------------------------------------------------------------ builder helpers
class Sheet:
    """Monthly sheet helper: months in C..N, Year-1 total in O."""

    def __init__(self, ws, A, rate_ref="$B$3", plan_ref="$D$3"):
        self.ws, self.A, self.rate_ref, self.plan_ref = ws, A, rate_ref, plan_ref
        self.R = {}
        self.r = 0
        self.cc = None   # column being written by row(); plan picks then follow that month's plan index (row 'pix')

    def p(self, aid):
        """Pick an assumption. Inside a monthly row, 'plan' items follow the month's plan index (₹10L plan after a stop-loss cut)."""
        if typ_of(aid) == "plan":
            if self.cc and "pix" in self.R:
                return self.A.pick(aid, f"{self.cc}${self.R['pix']}")
            return self.A.pick(aid, self.plan_ref)
        return self.A.pick(aid, self.rate_ref)

    def ps(self, aid):
        """Static pick (sheet-level plan index), e.g. for lease terms of the space actually signed."""
        return self.A.pick(aid, self.plan_ref if typ_of(aid) == "plan" else self.rate_ref)

    @staticmethod
    def col(m):
        return CL(2 + m)

    def prev(self, key, m, k=1):
        return f"{self.col(m - k)}{self.R[key]}" if m - k >= 1 else "0"

    def cur(self, key, m):
        return f"{self.col(m)}{self.R[key]}"

    def sec(self, text):
        self.r += 1
        section(self.ws, self.r, text, 16)
        self.r += 0

    def row(self, key, label, fn, fmt=FMT_INT, total="sum", bold=False, notetxt=""):
        self.r += 1
        r = self.r
        ws = self.ws
        ws.cell(row=r, column=1, value=label).font = BOLD if bold else Font()
        ws.cell(row=r, column=16, value=notetxt).font = NOTE_FONT
        self.R[key] = r
        for m in range(1, 13):
            self.cc = self.col(m)
            c = ws.cell(row=r, column=2 + m, value="=" + fn(m, self.col(m)))
            self.cc = None
            c.number_format = fmt
            if bold:
                c.font = BOLD
        if total:
            if total == "sum":
                tf = f"=SUM(C{r}:N{r})"
            elif total == "last":
                tf = f"=N{r}"
            elif total == "avg":
                tf = f"=AVERAGE(C{r}:N{r})"
            elif total == "max":
                tf = f"=MAX(C{r}:N{r})"
            else:
                tf = total
            c = ws.cell(row=r, column=15, value=tf)
            c.number_format = fmt
            c.font = BOLD
            if bold:
                c.fill = KEY_FILL
        return r


def outlook(wb, name, A, rate_idx, plan_idx, label, flex=None):
    flex = flex or {}
    ws = wb.create_sheet(name)
    title(ws, f"12-month operating outlook - {label} (₹, ex-GST, Nov-2026 to Oct-2027)",
          "Cash/booking basis. Enrolments follow the Growth plan target (A-GRO-01) limited by what the paid budget can buy and by seat capacity. Blue cells in rows 3-4 are flex switches used by Sensitivity; red cells are run options.")
    ws["A3"] = "Rate index (1 Cons / 2 Base / 3 Aggr)"
    ws["B3"] = rate_idx
    ws["C3"] = "Plan index"
    ws["D3"] = plan_idx
    for c in ("B3", "D3"):
        ws[c].font = Font(bold=True, color="C00000")
    flexdefs = [("E3", "conv x", "F3", flex.get("conv", 1)), ("G3", "fee x", "H3", flex.get("fee", 1)), ("I3", "fill x", "J3", flex.get("fill", 1)),
                ("K3", "CPL x", "L3", flex.get("cpl", 1)), ("M3", "var cost x", "N3", flex.get("var", 1)),
                ("E4", "rent x", "F4", flex.get("rent", 1)), ("I4", "budget x", "J4", flex.get("budget", 1)),
                ("K4", "price response at step 1 (conv. change)", "L4", flex.get("pr1", 0)), ("M4", "non-paid uplift x", "N4", flex.get("npe", 1)),
                ("V3", "masterclass volume x", "W3", flex.get("mcv", 1)), ("V4", "lead trainer pay x", "W4", flex.get("tpay", 1))]
    for lc, lab, vc, val in flexdefs:
        ws[lc] = lab
        ws[lc].font = NOTE_FONT
        ws[vc] = val
        ws[vc].font = INPUT_FONT
    opts = flex.get("opts", {})
    for lc, lab, vc, key, dflt in [("P3", "Staged Plan? (1 = yes)", "Q3", "staged", 0), ("P4", "G1 month (Staged: move, step 1 and T2 follow at G1+1; 99 = G1 not passed)", "Q4", "g1", 9),
                                   ("R3", "Price path (1 single step / 2 two-step)", "S3", "pp", 1), ("R4", "Founder path (1 A-BM-10 / 2 Gate D ≤40% M12)", "S4", "fp", 1),
                                   ("T3", "False-positive stress (1 = demand x A-ECO-162 from G1+1, KT-5 price reversion at G1+2)", "U3", "fpos", 0),
                                   ("T4", "Stop-loss cut / exit month (99 = none): ₹10L-plan cost base, lease exit + severance", "U4", "xm", 99),
                                   ("X3", "Stop-loss depth from the cut month (0 = ₹10L-plan base; 1 = deep: paid media paused, content team and freelancers released, no additional trainers)", "Y3", "deep", 0)]:
        ws[lc] = lab
        ws[lc].font = NOTE_FONT
        ws[vc] = opts.get(key, dflt)
        ws[vc].font = Font(bold=True, color="C00000")
    ws["G4"] = "GST incl.?"
    ws["G4"].font = NOTE_FONT
    S = Sheet(ws, A)
    ws["H4"] = flex["gst"] if "gst" in flex else "=" + S.p("A-ECO-24")
    ws["H4"].font = INPUT_FONT
    header(ws, 5, ["Line", "Note"] + MONTHS + ["Year 1", "Basis / IDs"], widths=[50, 4] + [11] * 12 + [13, 60])
    ws.column_dimensions["B"].width = 4
    ws.freeze_panes = "C6"
    S.r = 5
    p, ps, cur, prev = S.p, S.ps, S.cur, S.prev
    conv, fee, fill, cpl, var, rentx, budx, gstsw = "$F$3", "$H$3", "$J$3", "$L$3", "$N$3", "$F$4", "$J$4", "$H$4"
    pr1, npe, mcv, tpay = "$L$4", "$N$4", "$W$3", "$W$4"
    st, g1, pp, fp, fpos, xm, deep = "$Q$3", "$Q$4", "$S$3", "$S$4", "$U$3", "$U$4", "$Y$3"
    dcut = lambda m: f"AND({deep}=1,{m}>={xm})"            # deep stop-loss state in force
    mv = f"IF({st}=1,{g1}+1,{ps('A-ECO-112')})"          # move month (Staged: G1 + 1)
    s1m = f"IF({st}=1,{g1}+1,{ps('A-ECO-104')})"         # price step 1 / single step
    s2m = f"IF({pp}=2,{ps('A-ECO-106')},999)"             # price step 2 (two-step path only)
    real = f"({ps('A-BM-02')}/{ps('A-GRO-06')})"           # realisation (~89% Base)
    fm12 = f"IF({fp}=2,{ps('A-BM-10b-G')},{ps('A-BM-10b')})"
    gdiv = f"(1+{ps('A-ECO-23')}*{gstsw})"
    insp = lambda m: f"AND({m}>={mv},{m}<{xm})"          # in the new space (moved, not yet exited)
    kt5 = lambda m: f"AND({fpos}=1,{m}={g1}+2)"           # KT-5: price reverted for one intake after a step that misses
    dmS = lambda: f"IF({st}=1,MAX({p('A-ECO-128')},{g1}+1),{p('A-ECO-128')})"   # Destination start (pilot first)

    S.sec("A. Timeline")
    S.row("m", "Month #", lambda m, c: str(m), FMT_INT, total=None)
    S.row("cal", "Calendar month number", lambda m, c: f"MOD({c}{S.R['m']}+9,12)+1", FMT_INT, total=None)
    S.row("pix", "Plan index in force (switches to 1 = ₹10L-plan cost base from a stop-loss cut / exit month)", lambda m, c: f"IF({m}>={xm},1,$D$3)", FMT_INT, total=None)
    s1 = A.rows["A-GRO-40-01"]
    s51 = A.rows["A-ECO-60-01"]
    S.row("sea", "Career-enquiry seasonality (A-GRO-40)", lambda m, c: f"INDEX(Assumptions!$D${s1}:$D${s1 + 11},{c}{S.R['cal']})", FMT_2DP, total="avg")
    S.row("sea5", "Self-makeup seasonality (A-ECO-60)", lambda m, c: f"INDEX(Assumptions!$D${s51}:$D${s51 + 11},{c}{S.R['cal']})", FMT_2DP, total="avg")
    S.row("fsh", "Founder share of contact hours (A-BM-10 path)",
          lambda m, c: f"IF({m}<=6,1-(1-{p('A-BM-10a')})*{m}/6,{p('A-BM-10a')}-({p('A-BM-10a')}-{fm12})*({m}-6)/6)", FMT_PCT, total="last")

    S.sec("B. Career enrolments (L2 + L3) - demand, budget and capacity")
    S.row("base", "Today's career enrolments per month (CA-01 x A-ECO-101 / 12) - illustrative", lambda m, c: f"{p('CA-01')}*{p('A-ECO-101')}/12", FMT_2DP, total="sum")
    paidmix = lambda: f"({p('A-GRO-03a')}+{p('A-GRO-03b')}+{p('A-GRO-03e')})"
    S.row("npt", "Non-paid enrolment path (organic + referral): today's engine ramping to A-GRO-01 x non-paid mix by M7 (x non-paid uplift flex)",
          lambda m, c: f"{c}{S.R['base']}+({p('A-GRO-01')}*(1-{paidmix()})-{c}{S.R['base']})*MIN(1,({m}-1)/6)*{npe}", FMT_2DP)
    S.row("pt", "Paid-route enrolment target path (CTWA + Search + Taster; 0 today -> A-GRO-01 x paid mix by M7)",
          lambda m, c: f"{p('A-GRO-01')}*{paidmix()}*MIN(1,({m}-1)/6)", FMT_2DP)
    S.row("tgt", "Plan target path (sum; reaches A-GRO-01 by month 7)", lambda m, c: f"{c}{S.R['npt']}+{c}{S.R['pt']}", FMT_2DP)
    bud1 = A.rows["A-GRO-BUD-01"]
    brng = f"Assumptions!$C${bud1}:$E${bud1 + 11}"
    S.row("bud", "Paid media budget (Growth ramp; Staged: ≤A-ECO-151 until G1, then the post-G1 ramp from G1+1)",
          lambda m, c: f"IF(AND({st}=1,{m}<={g1}),MIN(INDEX({brng},{m},{c}${S.R['pix']}),{p('A-ECO-151')}),INDEX({brng},IF({st}=1,MIN(12,{m}-{g1}+6),{m}),{c}${S.R['pix']}))*{budx}*IF({dcut(m)},0,1)",
          FMT_INT, notetxt="A-GRO-BUD-01..12 (ramp written for G1 at M6); Staged: month m after G1 uses ramp month m-G1+6 (planning case: ₹80k M10, ₹1.0L M11-12 = ₹7.0L)")
    S.row("ecac", "Effective paid CAC = funnel paid CAC x calibration factor A-ECO-51 x CPL flex / conversion flex", lambda m, c: f"{p('A-ECO-FUN-01')}*{p('A-ECO-51')}*{cpl}/{conv}", FMT_INT, total="avg")
    S.row("sla", "Speed-to-lead factor on new (incremental) leads: A-GRO-24 before the SLA month",
          lambda m, c: f"IF({m}>={p('A-ECO-105')},1,{p('A-GRO-24')})", FMT_2DP, total="avg")
    S.row("ach", "Paid career enrolments the budget can buy", lambda m, c: f"{c}{S.R['bud']}*{p('A-ECO-50')}/{c}{S.R['ecac']}", FMT_2DP)
    S.row("dmult", "Demand multiplier: false-positive stress (A-ECO-162 from G1+1 when U3 = 1)", lambda m, c: f"IF(AND({fpos}=1,{m}>={g1}+1),{p('A-ECO-162')},1)", FMT_2DP, total="avg")
    S.row("prf", "Price response on career conversion from price step 1 (sensitivity flex L4)", lambda m, c: f"IF({m}>={s1m},1+{pr1},1)", FMT_2DP, total="avg")
    S.row("dem", "Career demand = seasonality x [today's engine x conv + new non-paid x conv x SLA + MIN(paid target, budget-bought x SLA)] x stress multipliers",
          lambda m, c: f"{c}{S.R['sea']}*({c}{S.R['base']}*{conv}+({c}{S.R['npt']}-{c}{S.R['base']})*{conv}*{c}{S.R['sla']}+MIN({c}{S.R['pt']},{c}{S.R['ach']}*{c}{S.R['sla']}))*{c}{S.R['dmult']}*{c}{S.R['prf']}", FMT_2DP, bold=True)
    S.row("stn", "Stations available", lambda m, c: f"IF({insp(m)},{p('A-ECO-115')},{p('A-ECO-110')})", FMT_INT, total="last")
    S.row("slt", "Batch slots per day (Staged: studio weekend/evening slot from A-ECO-156)", lambda m, c: f"IF({insp(m)},{p('A-ECO-116')},IF(AND({st}=1,{m}>={p('A-ECO-156')}),{p('A-ECO-155')},{p('A-ECO-111')}))", FMT_1DP, total="last")
    S.row("cap", "Usable seat capacity (stations x slots x max use)", lambda m, c: f"{c}{S.R['stn']}*{c}{S.R['slt']}*{p('A-ECO-117')}", FMT_1DP, total="last")
    S.row("dshare", "Destination format share of new L3 (out-of-town students from the Destination start)", lambda m, c: f"IF({m}>={dmS()},{p('A-GRO-37')},0)", FMT_PCT, total="last")
    S.row("dpil", "Destination pilot cohort intake (Staged runs: A-ECO-161 over the first two months from the Destination start) [HYP]",
          lambda m, c: f"IF(AND({st}=1,{m}>={dmS()},{m}<{dmS()}+2),{p('A-ECO-161')}/2,0)*{c}{S.R['dmult']}", FMT_2DP,
          notetxt="Unstaged reference bundles keep the earlier Destination logic (no pilot top-up)")
    S.row("d3", "Destination-format demand: MAX(out-of-town L3 demand, pilot cohort intake; pilot top-up recruited by regional pilot media inside the budget)",
          lambda m, c: f"MAX({c}{S.R['dem']}*{p('A-GRO-02')}*{c}{S.R['dshare']},{c}{S.R['dpil']})", FMT_2DP)
    # continuing occupancy from earlier months
    S.r += 1
    rc = S.r
    S.R["cont"] = rc
    S.r += 1
    S.R["need"] = S.r
    S.r += 1
    S.R["fillf"] = S.r
    S.row("l3", "L3 Professional Bridal Programme - local formats (Weekday/Flex) enrolments",
          lambda m, c: f"{c}{S.R['dem']}*{p('A-GRO-02')}*(1-{c}{S.R['dshare']})*{c}{S.R['fillf']}", FMT_2DP, bold=True)
    S.row("l3d", "L3 Destination format enrolments (out-of-town; incl. pilot cohort)", lambda m, c: f"{c}{S.R['d3']}*{c}{S.R['fillf']}", FMT_2DP)
    S.row("l2", "L2 Foundation enrolments", lambda m, c: f"{c}{S.R['dem']}*(1-{p('A-GRO-02')})*{c}{S.R['fillf']}", FMT_2DP)
    S.row("upg", "L2 -> L3 upgrades (fee credited; A-ECO-36)", lambda m, c: f"{prev('l2', m)}*{p('A-ECO-36')}*{c}{S.R['fillf']}", FMT_2DP)
    for m in range(1, 13):
        c = S.col(m)
        ws.cell(row=rc, column=2 + m, value=f"={prev('l3', m)}+{prev('l3', m, 2)}+{prev('upg', m)}+{prev('upg', m, 2)}+1.25*{prev('l3d', m)}").number_format = FMT_1DP
        ws.cell(row=S.R["need"], column=2 + m,
                value=f"={c}{S.R['dem']}*({ps('A-GRO-02')}*(1-{c}{S.R['dshare']})+(1-{ps('A-GRO-02')}))+1.25*{c}{S.R['d3']}+{prev('l2', m)}*{ps('A-ECO-36')}").number_format = FMT_1DP
        ws.cell(row=S.R["fillf"], column=2 + m,
                value=f"=IF({c}{S.R['need']}<=0,1,MAX(0,MIN(1,({c}{S.R['cap']}-{c}{rc})/{c}{S.R['need']})))").number_format = FMT_PCT
    ws.cell(row=rc, column=1, value="Seats held by continuing students (L3 from m-1, m-2; destination from m-1 x1.25)")
    ws.cell(row=S.R["need"], column=1, value="Seats needed for this month's new starts")
    ws.cell(row=S.R["fillf"], column=1, value="Share of demand that fits (capacity constraint)")
    ws.cell(row=S.R["fillf"], column=15, value=f"=MIN(C{S.R['fillf']}:N{S.R['fillf']})").number_format = FMT_PCT
    S.row("car", "Career enrolments (new students, L2 + L3)", lambda m, c: f"{c}{S.R['l3']}+{c}{S.R['l3d']}+{c}{S.R['l2']}", FMT_2DP, bold=True)
    S.row("y2d", "Year-2 run-rate driver: pre-capacity demand in months before the space move, delivered enrolments after it", lambda m, c: f"IF({m}<{mv},{c}{S.R['dem']},{c}{S.R['car']})", FMT_2DP)
    S.row("oot", "  of which out-of-town (A-GRO-37)", lambda m, c: f"{c}{S.R['car']}*{p('A-GRO-37')}", FMT_2DP)
    S.row("paid", "  of which paid-route enrolments delivered (budget-bought: seasonality x MIN(paid target, budget-bought x SLA) x stress x fit)",
          lambda m, c: f"{c}{S.R['sea']}*MIN({c}{S.R['pt']},{c}{S.R['ach']}*{c}{S.R['sla']})*{c}{S.R['dmult']}*{c}{S.R['prf']}*{c}{S.R['fillf']}", FMT_2DP)
    S.row("occ", "Seats occupied", lambda m, c: f"{c}{S.R['cont']}+{c}{S.R['l3']}+{c}{S.R['upg']}+{c}{S.R['l2']}+1.25*{c}{S.R['l3d']}", FMT_1DP, total="avg")
    S.row("util", "Seat utilisation (occupied / stations x slots)", lambda m, c: f"{c}{S.R['occ']}/({c}{S.R['stn']}*{c}{S.R['slt']})", FMT_PCT, total="last", bold=True)
    S.row("bindf", "Capacity binds flag (1 = demand does not fully fit)", lambda m, c: f"IF({c}{S.R['fillf']}<0.999,1,0)", FMT_INT, total="sum")
    S.sec("C. Other products")
    S.row("mc", "L4 masterclass seats sold (from M3, 6-month ramp)", lambda m, c: f"IF({m}>=3,{p('A-ECO-131')}*{p('A-ECO-132')}*MIN(1,({m}-2)/6),0)*{conv}*{c}{S.R['dmult']}*{mcv}", FMT_1DP)
    S.row("sm", "L1-S5 self-makeup seats", lambda m, c: f"{p('A-ECO-133')}*{c}{S.R['sea5']}*MIN(1,{m}/3)*{conv}*{c}{S.R['dmult']}", FMT_1DP)
    S.row("tk", "L1 Career Taster tickets (taster-route enrolments / per-ticket conversion)",
          lambda m, c: f"{c}{S.R['dem']}*{p('A-GRO-03e')}/({p('A-GRO-22a')}*{p('A-GRO-22b')}*{p('A-GRO-22c')})", FMT_1DP)
    S.row("pu", "Regional pop-up events", lambda m, c: f"IF({m}>=IF({st}=1,MAX({p('A-ECO-130')},{g1}+1),{p('A-ECO-130')}),MAX({p('A-ECO-33')},0.5),0)", FMT_2DP)
    S.row("pua", "Pop-up paid attendees", lambda m, c: f"{c}{S.R['pu']}*{p('A-BM-06a')}*{conv}*{c}{S.R['dmult']}", FMT_1DP)
    S.row("pc", "L5 Pro Circle new paid members (S3 buyers; graduates free in year 1)", lambda m, c: f"{c}{S.R['mc']}*0.7*{p('A-GRO-36b')}", FMT_2DP)

    S.sec("D. Prices (incl. GST as quoted)")
    S.row("fl3", "L3 realised fee: CA-02 until step 1; single path -> A-BM-02; two-step path -> ₹75k list x realisation, then A-GRO-06 x realisation from step 2; KT-5 reversion intake at CA-02",
          lambda m, c: f"IF({kt5(m)},{p('CA-02')},IF({pp}=1,IF({m}>={s1m},{p('A-BM-02')},{p('CA-02')}),IF({m}>={s2m},{p('A-GRO-06')}*{real},IF({m}>={s1m},MIN({p('A-ECO-160')},{p('A-GRO-06')})*{real},{p('CA-02')}))))*{fee}", FMT_INT, total="avg")
    S.row("kit", "Kit included in fee? (1 before step 1 and in a KT-5 reversion intake)", lambda m, c: f"IF(AND({m}>={s1m},NOT({kt5(m)})),0,1)", FMT_INT, total="last")

    S.sec("E. Revenue (ex-GST)")
    S.row("rl3", "L3 local formats", lambda m, c: f"{c}{S.R['l3']}*{c}{S.R['fl3']}/{gdiv}", FMT_INT)
    S.row("rl3d", "L3 Destination format (price parity)", lambda m, c: f"{c}{S.R['l3d']}*{c}{S.R['fl3']}/{gdiv}", FMT_INT)
    S.row("rupg", "L2 -> L3 upgrades (L3 fee less credited L2 fee)", lambda m, c: f"{c}{S.R['upg']}*MAX(0,{c}{S.R['fl3']}-{p('A-GRO-05')}*{fee})/{gdiv}", FMT_INT)
    S.row("rl2", "L2 Foundation", lambda m, c: f"{c}{S.R['l2']}*{p('A-GRO-05')}*{fee}/{gdiv}", FMT_INT)
    S.row("rtk", "L1 Taster tickets (net of credits to enrollers)",
          lambda m, c: f"{c}{S.R['tk']}*(1-{p('A-GRO-22a')}*{p('A-GRO-22b')}*{p('A-GRO-22c')})*{p('A-GRO-04')}/{gdiv}", FMT_INT)
    S.row("rmc", "L4 masterclasses", lambda m, c: f"{c}{S.R['mc']}*{p('A-GRO-07')}*{fee}/{gdiv}", FMT_INT)
    S.row("rsm", "L1-S5 self-makeup", lambda m, c: f"{c}{S.R['sm']}*{p('A-GRO-08')}*{fee}/{gdiv}", FMT_INT)
    S.row("rpu", "Pop-up tickets", lambda m, c: f"{c}{S.R['pua']}*{p('A-BM-06b')}/{gdiv}", FMT_INT)
    S.row("rpc", "L5 Pro Circle", lambda m, c: f"{c}{S.R['pc']}*{p('A-GRO-09')}/{gdiv}", FMT_INT)
    S.row("rkit", "Optional kit margin (post-step, near-cost kit)", lambda m, c: f"({c}{S.R['l3']}+{c}{S.R['l3d']})*(1-{c}{S.R['kit']})*{p('A-ECO-37')}", FMT_INT)
    S.row("rev", "Total revenue", lambda m, c: f"SUM({c}{S.R['rl3']}:{c}{S.R['rkit']})", FMT_INT, bold=True)
    S.row("rcar", "  of which career programmes (L2 + L3)", lambda m, c: f"{c}{S.R['rl3']}+{c}{S.R['rl3d']}+{c}{S.R['rupg']}+{c}{S.R['rl2']}", FMT_INT)

    S.sec("F. Variable costs")
    S.row("vl3", "L3 consumables / models (local + upgrades: A-BM-16; Destination: A-ECO-41, + accommodation-partner coordination A-ECO-225 in Staged runs)",
          lambda m, c: f"(({c}{S.R['l3']}+{c}{S.R['upg']})*{p('A-BM-16')}+{c}{S.R['l3d']}*({p('A-ECO-41')}+IF({st}=1,{p('A-ECO-225')},0)))*{var}", FMT_INT)
    S.row("vkit", "Kit cost while fee includes kit (A-ECO-103)", lambda m, c: f"({c}{S.R['l3']}+{c}{S.R['l3d']})*{c}{S.R['kit']}*{p('A-ECO-103')}*{var}", FMT_INT)
    S.row("vl2", "L2 consumables", lambda m, c: f"{c}{S.R['l2']}*{p('A-ECO-40')}*{var}", FMT_INT)
    S.row("vsh", "Masterclass, self-makeup and taster delivery costs",
          lambda m, c: f"({c}{S.R['mc']}*{p('A-ECO-42')}+{c}{S.R['sm']}*{p('A-ECO-43')}+{c}{S.R['tk']}*{p('A-ECO-44')})*{var}", FMT_INT)
    S.row("vpu", "Pop-up event costs (A-BM-06c)", lambda m, c: f"{c}{S.R['pu']}*{p('A-BM-06c')}", FMT_INT)
    S.row("vpc", "Pro Circle cost to serve", lambda m, c: f"{c}{S.R['pc']}*{p('A-ECO-45')}", FMT_INT)
    S.row("vpay", "Payment gateway (A-GRO-41) + no-cost EMI subvention on L3 (A-GRO-35 x 35b)",
          lambda m, c: f"{c}{S.R['rev']}*{gdiv}*{p('A-GRO-41')}+({c}{S.R['rl3']}+{c}{S.R['rl3d']}+{c}{S.R['rupg']})*{gdiv}*{p('A-GRO-35')}*{p('A-GRO-35b')}", FMT_INT)
    S.row("vref", "Referral rewards (A-GRO-34 x referral-route enrolments)", lambda m, c: f"{c}{S.R['car']}*{p('A-ECO-137')}*{p('A-GRO-34')}", FMT_INT)
    S.row("var", "Total variable costs", lambda m, c: f"SUM({c}{S.R['vl3']}:{c}{S.R['vref']})", FMT_INT, bold=True)
    S.row("cm", "Contribution (revenue - variable)", lambda m, c: f"{c}{S.R['rev']}-{c}{S.R['var']}", FMT_INT, bold=True)
    S.row("cmp", "Contribution margin %", lambda m, c: f"IFERROR({c}{S.R['cm']}/{c}{S.R['rev']},0)", FMT_PCT, total=None)
    ws.cell(row=S.R["cmp"], column=15, value=f"=IFERROR(O{S.R['cm']}/O{S.R['rev']},0)")

    S.sec("G. People (trainers follow batches and the founder step-back path)")
    S.row("slots", "Active batch-slots (seats occupied / cohort fill)", lambda m, c: f"ROUNDUP({c}{S.R['occ']}/({p('A-ECO-47')}*{fill}),0)", FMT_INT, total="max")
    S.row("tslots", "Batch-slots taught by trainers (x (1 - founder share))", lambda m, c: f"{c}{S.R['slots']}*(1-{c}{S.R['fsh']})", FMT_1DP, total="max")
    S.row("lead", "Lead trainer (FTE)", lambda m, c: f"IF({m}>={p('A-ECO-52')},{p('A-ECO-52b')},0)", FMT_1DP, total="last")
    S.row("trn", "Additional trainers (FTE; 0.1 FTE overflow absorbed by founder/assistant; Staged: second trainer from A-ECO-163, not before G1+1)",
          lambda m, c: f"IF(OR({c}{S.R['lead']}=0,{dcut(m)}),0,MAX(IF(AND({st}=1,{m}>=MAX({p('A-ECO-163')},{g1}+1),{m}<{xm}),1,0),ROUNDUP(({c}{S.R['tslots']}-{c}{S.R['lead']}*{p('A-ECO-46')})/{p('A-ECO-46')}-0.1,0)))", FMT_INT, total="max")
    S.row("ast", "Assistants (FTE; 1 per 2 active batch-slots, practical ratio ≤1:6)", lambda m, c: f"ROUNDUP({c}{S.R['slots']}/2,0)", FMT_INT, total="max")
    S.row("ctr", "Trainer + assistant cost", lambda m, c: f"{c}{S.R['lead']}*{p('A-BM-04a')}*{tpay}+{c}{S.R['trn']}*{p('A-BM-04b')}+{c}{S.R['ast']}*{p('A-BM-04c')}", FMT_INT)
    S.row("csl", "Admissions counsellors (A-GRO-45 x FTE; Staged: counsellor #1 is the Admissions & Operations Lead)",
          lambda m, c: f"(IF({m}>={p('A-ECO-53')},1,0)+IF({m}>=IF({st}=1,MAX({p('A-ECO-55')},{g1}+1),{p('A-ECO-55')}),{p('A-ECO-54')},0))*{p('A-GRO-45')}", FMT_INT)
    S.row("cmk", "Marketing/content team, shooter/editor, performance and SEO freelancers (Growth §10)",
          lambda m, c: f"IF({dcut(m)},0,IF({m}>={p('A-ECO-57a')},{p('A-GRO-46')},0)+IF({m}>={p('A-ECO-57d')},{p('A-GRO-47')},0)+IF({m}>={p('A-ECO-57b')},{p('A-GRO-48')},0)+IF({m}>={p('A-ECO-57c')},{p('A-GRO-50')},0))", FMT_INT)
    S.row("cfd", "Front-desk / operations coordinator (while in the new space)", lambda m, c: f"IF({insp(m)},{p('A-ECO-124')},0)", FMT_INT)
    S.row("cam", "Academy manager / admissions head", lambda m, c: f"IF({m}>={p('A-ECO-126')},{p('A-ECO-125')},0)", FMT_INT)
    S.row("cops", "Admissions & Operations Lead premium over counsellor pay (Staged, A-ECO-157; execution owner of the 90-day plan)",
          lambda m, c: f"IF(AND({st}=1,{m}>={p('A-ECO-53')}),{p('A-ECO-157')},0)", FMT_INT)
    S.row("ppl", "Total people cost (founder not charged - owner's return)", lambda m, c: f"SUM({c}{S.R['ctr']}:{c}{S.R['cops']})", FMT_INT, bold=True)

    S.sec("H. Occupancy, marketing and overheads")
    S.row("rent", "Rent: today's academy share, or new space while in it",
          lambda m, c: f"IF({insp(m)},{p('A-ECO-113')}*{p('A-ECO-114')},{p('A-ECO-118')})*{rentx}", FMT_INT)
    S.row("util2", "Utilities, housekeeping, maintenance (+ studio weekend/evening slot cost in the Staged Plan)", lambda m, c: f"IF({insp(m)},{p('A-ECO-113')}*{p('A-ECO-120')},{p('A-ECO-119')}+IF(AND({st}=1,{m}>={p('A-ECO-156')}),{p('A-ECO-154')},0))", FMT_INT)
    S.row("tech", "Martech stack (A-GRO-42) + LMS from the month before the Destination start", lambda m, c: f"{p('A-GRO-42')}+IF({m}>={dmS()}-1,{p('A-ECO-127')},0)", FMT_INT)
    S.row("med", "Paid media (Growth budget)", lambda m, c: f"{c}{S.R['bud']}", FMT_INT)
    S.row("part", "Partnerships, PR / outcomes report, contingency (A-ECO-58)", lambda m, c: f"{p('A-ECO-58')}", FMT_INT)
    S.row("adm", "Admin, accounting, insurance, misc. (A-ECO-134)", lambda m, c: f"{p('A-ECO-134')}", FMT_INT)
    S.row("one", "One-offs: website rebuild (M1, A-GRO-49); B&WSSC/legal/accounting (M3, A-ECO-135)",
          lambda m, c: f"IF({m}=1,{p('A-GRO-49')},0)+IF({m}=3,{p('A-ECO-135')},0)", FMT_INT)
    S.row("exit", "Stop-loss cut / lease exit: A-ECO-158 months' new-space rent notice (if moved) + A-ECO-159 months' salary of staff released (booked in the cut month)",
          lambda m, c: f"IF({m}={xm},IF({mv}<{xm},{ps('A-ECO-158')}*{ps('A-ECO-113')}*{ps('A-ECO-114')}*{rentx},0)+{ps('A-ECO-159')}*MAX(0,{prev('ppl', m)}-{c}{S.R['ppl']}),0)", FMT_INT)
    S.row("fix", "Total fixed and overhead opex (incl. people)", lambda m, c: f"{c}{S.R['ppl']}+SUM({c}{S.R['rent']}:{c}{S.R['exit']})", FMT_INT, bold=True)
    S.row("ebitda", "EBITDA", lambda m, c: f"{c}{S.R['cm']}-{c}{S.R['fix']}", FMT_INT, bold=True)
    S.row("ebm", "EBITDA margin", lambda m, c: f"IFERROR({c}{S.R['ebitda']}/{c}{S.R['rev']},0)", FMT_PCT, total=None)
    S.row("ebf", "Memo: EBITDA after a founder-role market salary (A-ECO-138)", lambda m, c: f"{c}{S.R['ebitda']}-{p('A-ECO-138')}", FMT_INT)
    ws.cell(row=S.R["ebm"], column=15, value=f"=IFERROR(O{S.R['ebitda']}/O{S.R['rev']},0)").number_format = FMT_PCT

    S.sec("I. Capex, deposits and cash")
    mvok = lambda m: f"AND({m}={mv}-1,{mv}<{xm})"
    S.row("cfit", "Fit-out of new space (month before move)", lambda m, c: f"IF({mvok(m)},{p('A-ECO-113')}*{p('A-ECO-121')},0)", FMT_INT)
    S.row("cstn", "Additional stations", lambda m, c: f"IF({mvok(m)},MAX(0,{p('A-ECO-115')}-{p('A-ECO-110')})*{p('A-ECO-122')},0)", FMT_INT)
    S.row("cdep", "Security deposit (refundable; cash out)", lambda m, c: f"IF({mvok(m)},{p('A-ECO-123')}*{p('A-ECO-113')}*{p('A-ECO-114')}*{rentx},0)", FMT_INT)
    S.row("ccrm", "CRM / WhatsApp BSP / GBP / photo-video proof kit (M1)", lambda m, c: f"IF({m}=1,{p('A-ECO-136')},0)", FMT_INT)
    S.row("chyb", "Hybrid pre-work content + LMS (2 months before launch; Staged: basic recording M3 in T1 only - recorded library deferred to T3 after G2, Year 2)",
          lambda m, c: f"IF({st}=1,IF({m}=3,{p('A-ECO-152')},0),IF({m}={p('A-ECO-128')}-2,{p('A-ECO-129')},0))", FMT_INT)
    S.row("capex", "Total capex and deposits", lambda m, c: f"SUM({c}{S.R['cfit']}:{c}{S.R['chyb']})", FMT_INT, bold=True)
    pm = ps("A-ECO-34")
    S.row("tim", "Instalment timing: career cash received later than booked (A-ECO-34 payment months)",
          lambda m, c: f"(({c}{S.R['rcar']}+IF({pm}>=2,{prev('rcar', m)},0)+IF({pm}>=3,{prev('rcar', m, 2)},0))/{pm})-{c}{S.R['rcar']}", FMT_INT)
    S.row("ncf", "Net cash flow (EBITDA + timing - capex; before tax, GST timing, founder draw)", lambda m, c: f"{c}{S.R['ebitda']}+{c}{S.R['tim']}-{c}{S.R['capex']}", FMT_INT, bold=True)
    S.row("cum", "Cumulative cash position", lambda m, c: f"{prev('cum', m)}+{c}{S.R['ncf']}", FMT_INT, total="last", bold=True)
    S.row("peak", "Peak cash need to date", lambda m, c: f"-MIN(0,MIN($C${S.R['cum']}:{c}{S.R['cum']}))", FMT_INT, total="max", bold=True)
    S.row("pos", "EBITDA >= 0 flag", lambda m, c: f"IF({c}{S.R['ebitda']}>=0,1,0)", FMT_INT, total=None)
    S.row("cap15", "Cash need >= T1 cap flag (A-ECO-153, ₹15L)", lambda m, c: f"IF({c}{S.R['peak']}>={p('A-ECO-153')},1,0)", FMT_INT, total=None)
    S.row("cap10", "Cash need >= ₹10L flag", lambda m, c: f"IF({c}{S.R['peak']}>=1000000,1,0)", FMT_INT, total=None)

    # ---------------------------------------------------------------- K. cohort-level fill (G1 / DEL-01 / KT-2 testable; review RT-02)
    S.sec("K. L3 cohort fill on the intake calendar (A-ECO-164: one local L3 cohort per intake; L3 local starts + upgrades allocated to cohorts by date)")
    thr, cap12 = ps("A-ECO-166"), ps("A-BM-01")
    for tag, cal, apfx, ttl in (("", COHORTS, "A-ECO-164", "6-weekly intake calendar (planning assumption)"),
                                ("8", COHORTS8, "A-ECO-165", "Alternative: 8-weekly intake calendar (A-ECO-165)")):
        ovr = []
        for k, (t, dt, mm) in enumerate(cal, 1):
            ck = ps(f"{apfx}-{k}")
            ck1 = ps(f"{apfx}-{k - 1}") if k > 1 else "0"
            rnext = S.r + 1
            S.row(f"ov{tag}{k}", f"{'[8-weekly] ' if tag else ''}Cohort {k} ({dt}): share of each month's L3 starts in its enrolment window (Year-1 column = students)",
                  lambda m, c, ck=ck, ck1=ck1: f"MAX(0,MIN({m},{ck})-MAX({m}-1,{ck1}))", FMT_2DP,
                  total=f"=SUMPRODUCT(C{rnext}:N{rnext},C{S.R['l3']}:N{S.R['l3']}+C{S.R['upg']}:N{S.R['upg']})")
            ovr.append(rnext)
        S.r += 1
        for j, h in enumerate([f"L3 cohort - {ttl}", "", "Students", "Fill (% of A-BM-01 = 12)", "Two consecutive ≥ A-ECO-166 of 12 (old G1 test, retired)", "Start month #",
                               "RESTATED G1 TEST: this and the previous cohort ≥ A-ECO-166 of the stations in the room in use at their start (6 of 8 studio; 9 of 12 after the move)",
                               "This cohort ≥ A-ECO-166 of stations in use"]):
            ws.cell(row=S.r, column=1 + j, value=h).font = BOLD
        cohr = []
        for k, (t, dt, mm) in enumerate(cal, 1):
            S.r += 1
            r_ = S.r
            cohr.append(r_)
            ws.cell(row=r_, column=1, value=f"Cohort {k} - {dt}")
            ws.cell(row=r_, column=3, value=f"=O{ovr[k - 1]}").number_format = FMT_1DP
            ws.cell(row=r_, column=4, value=f"=C{r_}/{cap12}").number_format = FMT_PCT
            ws.cell(row=r_, column=5, value=(f"=IF(AND(D{r_}>={thr},D{r_ - 1}>={thr}),1,0)" if k > 1 else "=0")).number_format = FMT_INT
            ws.cell(row=r_, column=6, value=mm).number_format = FMT_INT
            stnr = f"$C${S.R['stn']}:$N${S.R['stn']}"
            ws.cell(row=r_, column=8, value=f"=IF(C{r_}>={thr}*INDEX({stnr},MIN(12,F{r_})),1,0)").number_format = FMT_INT
            ws.cell(row=r_, column=7, value=(f"=IF(AND(H{r_}=1,H{r_ - 1}=1),1,0)" if k > 1 else "=0")).number_format = FMT_INT
        S.R[f"coh{tag}1"], S.R[f"coh{tag}N"] = cohr[0], cohr[-1]
    note(ws, S.r + 1, "Cohort fill tests G1 ('2 consecutive L3 cohorts ≥75% full'), KT-2 and DEL-01 against the model's own enrolment path. A parallel Flex cohort at an intake would split the fill further. "
                      "In the 8-station studio a cohort above 8 needs paired practice or the 2.5-slot timetable. Column G is the G1 fill test as restated at Gate E (recommended_strategy.md §7.1): stations in the room in use at each cohort's start (row 'Stations available').")
    S.r += 1

    # ---------------------------------------------------------------- KPIs block
    S.r += 2
    section(ws, S.r, "J. Year-1 KPIs, break-even and gate metrics", 16)
    k0 = S.r + 1
    R_ = S.R
    dep = f"{ps('A-ECO-123')}*{ps('A-ECO-113')}*{ps('A-ECO-114')}*{rentx}"
    # (label, formula, fmt, dashboard scale: 1e5 = ₹ lakh, 'rs' = ₹, None = as is)
    kp = [
        ("Revenue, Year 1 (ex-GST)", f"=O{R_['rev']}", FMT_INT, 1e5),
        ("EBITDA, Year 1", f"=O{R_['ebitda']}", FMT_INT, 1e5),
        ("EBITDA margin, Year 1", f"=O{R_['ebm']}", FMT_PCT, None),
        ("Memo: Year-1 EBITDA after founder-role salary", f"=O{R_['ebf']}", FMT_INT, 1e5),
        ("Capex and deposits, Year 1", f"=O{R_['capex']}", FMT_INT, 1e5),
        ("Peak cumulative cash need, Year 1", f"=O{R_['peak']}", FMT_INT, 1e5),
        ("Investment envelope for this plan (CA-03)", f"={ps('CA-03')}", FMT_INT, 1e5),
        ("Headroom: envelope - peak cash need", "=B{k5}-B{k4}", FMT_INT, 1e5),
        ("Career enrolments, Year 1 (new students)", f"=O{R_['car']}", FMT_1DP, None),
        ("Career enrolments per month, months 7-12 average", f"=AVERAGE(I{R_['car']}:N{R_['car']})", FMT_1DP, None),
        ("Masterclass seats, Year 1", f"=O{R_['mc']}", FMT_INT, None),
        ("Seat utilisation, month 12", f"=N{R_['util']}", FMT_PCT, None),
        ("First month seats bind (share of demand that fits < 100%)", f"=IFERROR(MATCH(1,C{R_['bindf']}:N{R_['bindf']},0),\"not in Y1\")", FMT_GEN, None),
        ("Founder share of contact hours, month 12", f"=N{R_['fsh']}", FMT_PCT, None),
        ("Trainers + assistants on payroll, month 12", f"=N{R_['lead']}+N{R_['trn']}+N{R_['ast']}", FMT_INT, None),
        ("Contribution per career enrolment, month 12 (career contribution share)", f"=IFERROR((N{R_['rcar']}-N{R_['vl3']}-N{R_['vkit']}-N{R_['vl2']}-N{R_['vref']}-(N{R_['rl3']}+N{R_['rl3d']}+N{R_['rupg']})*{gdiv}*{ps('A-GRO-35')}*{ps('A-GRO-35b')}-N{R_['rcar']}*{gdiv}*{ps('A-GRO-41')})/N{R_['car']},0)", FMT_INT, "rs"),
        ("Fixed + overhead opex, month 12", f"=N{R_['fix']}", FMT_INT, 1e5),
        ("Non-career contribution, month 12", f"=N{R_['cm']}-B{{k14}}*N{R_['car']}", FMT_INT, 1e5),
        ("Break-even career enrolments per month at month-12 cost base", "=IFERROR((B{k15}-B{k16})/B{k14},0)", FMT_1DP, None),
        ("Break-even career enrolments per year (x12)", "=B{k17}*12", FMT_INT, None),
        ("Effective media CAC per paid career enrolment, months 7-12 (career media / paid-route enrolments delivered)",
         f"=IFERROR(SUM(I{R_['bud']}:N{R_['bud']})*{ps('A-ECO-50')}/SUM(I{R_['paid']}:N{R_['paid']}),0)", FMT_INT, "rs"),
        ("Effective media CAC as % of realised L3 fee (ex-GST)", f"=B{{k19}}/(N{R_['fl3']}/{gdiv})", FMT_PCT, None),
        ("Fully loaded acquisition cost / career revenue, months 7-12 (media + growth team + tools + rewards + EMI)",
         f"=IFERROR((SUM(I{R_['med']}:N{R_['med']})+SUM(I{R_['csl']}:N{R_['cmk']})+SUM(I{R_['tech']}:N{R_['tech']})+SUM(I{R_['vref']}:N{R_['vref']})+SUMPRODUCT(I{R_['rl3']}:N{R_['rl3']}+I{R_['rl3d']}:N{R_['rl3d']})*{gdiv}*{ps('A-GRO-35')}*{ps('A-GRO-35b')})/SUM(I{R_['rcar']}:N{R_['rcar']}),0)", FMT_PCT, None),
        ("Career enrolments per month at which fully loaded acquisition = 25% of career revenue (month-12 cost and price)",
         f"=IFERROR((N{R_['med']}+N{R_['csl']}+N{R_['cmk']}+N{R_['tech']}+N{R_['vref']})/(0.25*N{R_['rcar']}/N{R_['car']}),0)", FMT_1DP, None),
        ("EBITDA, last quarter (Aug-Oct 2027)", f"=SUM(L{R_['ebitda']}:N{R_['ebitda']})", FMT_INT, 1e5),
        ("First month with EBITDA >= 0", f"=IFERROR(MATCH(1,C{R_['pos']}:N{R_['pos']},0),\"not in Y1\")", FMT_GEN, None),
        ("Cash position, end of Year 1", f"=N{R_['cum']}", FMT_INT, 1e5),
        ("First month cumulative cash need reaches the T1 cap (₹15L)", f"=IFERROR(MATCH(1,C{R_['cap15']}:N{R_['cap15']},0),\"not in Y1\")", FMT_GEN, None),
        ("First month cumulative cash need reaches ₹10L", f"=IFERROR(MATCH(1,C{R_['cap10']}:N{R_['cap10']},0),\"not in Y1\")", FMT_GEN, None),
        ("Peak cash need at the end of T1 (month before the G1 month in Q4; T2 capex follows G1)", f"=INDEX(C{R_['peak']}:N{R_['peak']},MAX(1,MIN(12,$Q$4-1)))", FMT_INT, 1e5),
        ("Trainer + assistant cost, Year 1", f"=O{R_['ctr']}", FMT_INT, 1e5),
        ("L3 realised fee, month 12 (incl. GST)", f"=N{R_['fl3']}", FMT_INT, "rs"),
        ("Space move month (99 = none in Year 1)", f"=IF({mv}<{xm},{mv},99)", FMT_GEN, None),
        ("Price step 1 month", f"={s1m}", FMT_GEN, None),
        ("Growth & marketing spend, Year 1 (paid media + growth team + martech + website + partnerships/PR/contingency + rewards + pop-ups; Growth §10 scope)",
         f"=O{R_['med']}+O{R_['csl']}+O{R_['cmk']}+12*{ps('A-GRO-42')}+{ps('A-GRO-49')}+O{R_['part']}+O{R_['vref']}+O{R_['vpu']}", FMT_INT, 1e5),
        ("  of which paid media, Year 1", f"=O{R_['med']}", FMT_INT, 1e5),
        # ---- Gate E additions (appended so the placeholder offsets above are unchanged)
        ("Month of peak cash need (cumulative cash low point)", f"=IFERROR(MATCH(O{R_['peak']},C{R_['peak']}:N{R_['peak']},0),\"-\")", FMT_GEN, None),
        ("Stop-loss cut / exit month (99 = none)", f"={xm}", FMT_GEN, None),
        ("Lease exit + severance cost booked, Year 1", f"=O{R_['exit']}", FMT_INT, 1e5),
        ("Memo: security deposit recoverable after a lease exit (not credited in cash)", f"=IF(AND({mv}<{xm},{xm}<=12),{dep},0)", FMT_INT, 1e5),
        ("Memo: fit-out + stations sunk on a lease exit", f"=IF(AND({mv}<{xm},{xm}<=12),O{R_['cfit']}+O{R_['cstn']},0)", FMT_INT, 1e5),
        ("Average monthly EBITDA in the new space before any exit (holding cost under stress)",
         f"=IFERROR(AVERAGEIFS(C{R_['ebitda']}:N{R_['ebitda']},C{R_['m']}:N{R_['m']},\">=\"&{mv},C{R_['m']}:N{R_['m']},\"<\"&MIN(13,{xm})),0)", FMT_INT, 1e5),
        ("L3 cohort fill: cohort 1 (4 Jan 2027 start; % of batch cap)", f"=D{R_['coh1']}", FMT_PCT, None),
        ("L3 cohort fill: cohort 2 (1 Mar 2027 start)", f"=D{R_['coh1'] + 1}", FMT_PCT, None),
        ("L3 cohort fill: average of the 7 Year-1 cohorts", f"=AVERAGE(D{R_['coh1']}:D{R_['cohN']})", FMT_PCT, None),
        ("First month a second consecutive L3 cohort ≥75% full starts (G1 cohort test)", f"=IFERROR(INDEX(F{R_['coh1']}:F{R_['cohN']},MATCH(1,E{R_['coh1']}:E{R_['cohN']},0)),\"not in Y1\")", FMT_GEN, None),
        ("L3 students in the latest Year-1 cohort (27 Sep 2027 start)", f"=C{R_['cohN']}", FMT_1DP, None),
        ("RESTATED G1 fill test (two consecutive cohorts ≥75% of stations in use), 6-weekly calendar: first cohort-start month met", f"=IFERROR(INDEX(F{R_['coh1']}:F{R_['cohN']},MATCH(1,G{R_['coh1']}:G{R_['cohN']},0)),\"not in Y1\")", FMT_GEN, None),
        ("RESTATED G1 fill test, 8-weekly calendar (A-ECO-165): first cohort-start month met", f"=IFERROR(INDEX(F{R_['coh81']}:F{R_['coh8N']},MATCH(1,G{R_['coh81']}:G{R_['coh8N']},0)),\"not in Y1\")", FMT_GEN, None),
        ("Restated test, 6-weekly: Year-1 cohorts at ≥75% of stations in use (of 7)", f"=SUM(H{R_['coh1']}:H{R_['cohN']})", FMT_INT, None),
        ("Restated test, 8-weekly: Year-1 cohorts at ≥75% of stations in use (of 6)", f"=SUM(H{R_['coh81']}:H{R_['coh8N']})", FMT_INT, None),
        ("G1 cohort test (≥75% of 12) on an 8-weekly intake calendar (A-ECO-165): first month met", f"=IFERROR(INDEX(F{R_['coh81']}:F{R_['coh8N']},MATCH(1,E{R_['coh81']}:E{R_['coh8N']},0)),\"not in Y1\")", FMT_GEN, None),
        ("L3 cohort fill on the 8-weekly calendar: cohorts 3-5 average (Apr-Aug 2027 starts)", f"=AVERAGE(D{R_['coh81'] + 2}:D{R_['coh81'] + 4})", FMT_PCT, None),
        ("Paid-route career enrolments delivered, months 7-12", f"=SUM(I{R_['paid']}:N{R_['paid']})", FMT_1DP, None),
        ("Input: effective paid CAC (funnel paid-route CAC x A-ECO-51), months 7-12 average", f"=AVERAGE(I{R_['ecac']}:N{R_['ecac']})", FMT_INT, "rs"),
        ("Calibration factor A-ECO-51 on funnel CAC (awareness / retargeting overhead)", f"={ps('A-ECO-51')}", FMT_2DP, None),
        ("Destination-format enrolments, Year 1 (incl. pilot cohort)", f"=O{R_['l3d']}", FMT_1DP, None),
        ("Additional trainers (FTE) in post, month 12", f"=N{R_['trn']}", FMT_INT, None),
        ("Contribution, months 10-12 (₹)", f"=SUM(L{R_['cm']}:N{R_['cm']})", FMT_INT, 1e5),
    ]
    for i, (lab, form, fmt, _sc) in enumerate(kp):
        rr = k0 + i
        ws.cell(row=rr, column=1, value=lab).font = BOLD
        form = form.replace("{k5}", str(k0 + 6)).replace("{k4}", str(k0 + 5)).replace("{k14}", str(k0 + 15)).replace("{k15}", str(k0 + 16)) \
            .replace("{k16}", str(k0 + 17)).replace("{k17}", str(k0 + 18)).replace("{k19}", str(k0 + 20))
        c = ws.cell(row=rr, column=2, value=form)
        c.number_format = fmt
        c.fill = KEY_FILL
        c.font = BOLD
    ws.column_dimensions["B"].width = 14
    S.R["kpi0"] = k0
    S.R["kpis"] = {lab: k0 + i for i, (lab, _, _, _) in enumerate(kp)}
    S.R["kplist"] = [(lab, fmt, sc) for (lab, _, fmt, sc) in kp]
    return ws, S.R


def build():
    wb = openpyxl.Workbook()
    readme = wb.active
    readme.title = "README"
    dash = wb.create_sheet("Dashboard")
    A = Assumptions(wb.create_sheet(), case_labels=CASES, selector_default="Base",
                    intro="Blue = input. Scenario columns: Conservative = adverse rates + ₹10L plan; Base = base rates + ₹30L plan; Aggressive = favourable rates + ₹50L plan. Column J 'Type': rate (prices, conversion, wages) or plan (what the plan buys).")
    ws = A.ws
    ws.cell(row=6, column=10, value="Type").fill = HDR_FILL
    ws.cell(row=6, column=10).font = HDR_FONT
    shared_order = list(AV.V.keys())
    A.sec("1. Shared with funnel_economics.xlsx (assumption_values.py): canonical, prices, funnel, delivery costs, Growth budget lines")
    for k in shared_order:
        d, c, b, g, unit, src, tag, fm = AV.V[k]
        r = A.add(k, d, c, b, g, unit, src, tag, FM[fm])
        ws.cell(row=r, column=10, value=typ_of(k))
    A.sec("2. Forecast-specific (A-ECO, A-BM, Growth budget ramp, seasonality, 3-year drivers)")
    for (aid, d, c, b, g, unit, src, tag, fm, typ) in F:
        r = A.add(aid, d, c, b, g, unit, src, tag, FM[fm])
        ws.cell(row=r, column=10, value=typ)
    # calibration formula for A-ECO-51 (same value in all columns)
    rr = A.rows["A-ECO-51"]
    cal = (f"={A.r('A-ECO-50', 'base')}*{A.r('A-GRO-BUD-12', 'base')}/({A.r('A-GRO-01', 'base')}*"
           f"({A.r('A-GRO-03a', 'base')}+{A.r('A-GRO-03b', 'base')}+{A.r('A-GRO-03e', 'base')})*{A.r('A-ECO-FUN-01', 'base')})")
    for col in "CDE":
        ws[f"{col}{rr}"] = cal
        ws[f"{col}{rr}"].number_format = FMT_2DP
    ws.column_dimensions["J"].width = 8
    for col, lab, val in [("A", "Run options for Outlook_Selected:", None), ("C", "Staged (0/1)", 0), ("E", "G1 month", 9), ("G", "Price path (1/2)", 1), ("I", "Founder path (1/2)", 1),
                          ("K", "False-positive (0/1)", 0), ("M", "Cut/exit month (99 none)", 99), ("O", "Deep stop-loss (0/1)", 0)]:
        ws[f"{col}5"] = lab
        ws[f"{col}5"].font = NOTE_FONT if col != "A" else BOLD
        if val is not None:
            nxt = chr(ord(col) + 1)
            ws[f"{nxt}5"] = val
            ws[f"{nxt}5"].font = Font(bold=True, color="C00000")
            ws[f"{nxt}5"].fill = KEY_FILL

    # ---------------------------------------------------------------- outlooks
    outs = {}
    for nm, ri, pi, lab in [("Outlook_Conservative", 1, 1, "Conservative (adverse rates, ₹10L plan)"), ("Outlook_Base", 2, 2, "Base (base rates, ₹30L plan)"),
                            ("Outlook_Aggressive", 3, 3, "Aggressive (favourable rates, ₹50L plan)"),
                            ("Outlook_Selected", "=Assumptions!$C$4", "=Assumptions!$C$4", "scenario chosen on Assumptions!C3"),
                            ("Plan10L_BaseRates", 2, 1, "₹10L plan at Base rates (envelope test)"), ("Plan50L_BaseRates", 2, 3, "₹50L plan at Base rates (envelope test)")]:
        w, R = outlook(wb, nm, A, ri, pi, lab, flex=({"opts": SELOPTS} if nm == "Outlook_Selected" else None))
        outs[nm] = R
    for nm, ri, pi, lab, opts in STAGED_RUNS:
        w, R = outlook(wb, nm, A, ri, pi, lab, flex={"opts": opts})
        outs[nm] = R
    R = outs["Outlook_Base"]
    K = R["kpis"]

    PL = "Staged_G1M9"   # planning case (Gate E)
    KP = outs[PL]["kpis"]

    # ---------------------------------------------------------------- flex sheets for sensitivity (Gate E: run on the planning case, RT-16)
    flexes = [("conv", "Conversion (all routes; low = founder step-back ÷1.25)", 0.8, 1.2), ("fee", "Fees (all products)", 0.8, 1.15),
              ("fill", "Cohort fill (students per batch 8 vs 12)", 0.8, 1.2), ("cpl", "CPL / CAC (paid routes)", 1.3, 0.7),
              ("var", "Variable delivery cost (kit, consumables)", 1.25, 0.75), ("rent", "Rent (₹130 vs ₹47 per sq ft vs ₹80)", 1.625, 0.5875),
              ("budget", "Paid-media budget ±30% (target held: extra budget cannot exceed target/capacity)", 0.7, 1.3)]
    for key, lab, lo, hi in flexes:
        for tag, val in (("lo", lo), ("hi", hi)):
            outlook(wb, f"Flex_{key}_{tag}", A, 2, 2, f"Planning case (Staged, G1 M9) with {lab} x{val}", flex={key: val, "opts": dict(PLAN_OPTS)})
    outlook(wb, "Flex_gst_ontop", A, 2, 2, "Planning case with GST charged on top of list fees", flex={"gst": 0, "opts": dict(PLAN_OPTS)})
    STRESSES = [("Flex_pr1_10", "Price response at step 1 (₹75k list, from M10): career conversion -10%", {"pr1": -0.10}),
                ("Flex_pr1_20", "Price response at step 1 (₹75k list, from M10): career conversion -20%", {"pr1": -0.20}),
                ("Flex_npe_flat", "Non-paid engine flat at today's rate (no organic/referral uplift; RT-08)", {"npe": 0}),
                ("Flex_mc_half", "Masterclass (L4) volume at half (RT-21)", {"mcv": 0.5}),
                ("Flex_lead75k", "Lead trainer paid ₹75k/month instead of ₹60k (RT-11)", {"tpay": 1.25})]
    for nm, lab, fx in STRESSES:
        fx = dict(fx)
        fx["opts"] = dict(PLAN_OPTS)
        outlook(wb, nm, A, 2, 2, f"Planning case: {lab}", flex=fx)

    # ---------------------------------------------------------------- Sensitivity sheet
    wsn = wb.create_sheet("Sensitivity", 3)
    title(wsn, "Sensitivity - tornado on the PLANNING CASE (Staged_G1M9: G1 at M9, two-step price, founder ≤40% M12) Year-1 EBITDA and peak cash need",
          "Each row = full monthly model re-run (Flex_* sheets, run options = planning case). Low/high are adverse/favourable settings of one driver. Superseded: the unstaged-Base tornado (methodology §1A note).")
    header(wsn, 4, ["Driver", "Adverse setting", "Favourable setting", "EBITDA adverse", "EBITDA favourable", "EBITDA swing", "Rank",
                    "Peak cash adverse", "Peak cash favourable", "Career enrol. adverse", "Career enrol. favourable", "Tornado (EBITDA swing)"],
           widths=[46, 11, 11, 15, 15, 14, 7, 15, 15, 12, 12, 40])
    eb = f"B{K['EBITDA, Year 1']}"
    pk = f"B{K['Peak cumulative cash need, Year 1']}"
    ce = f"B{K['Career enrolments, Year 1 (new students)']}"
    wsn["A5"] = "Planning case (Staged_G1M9)"
    wsn["A5"].font = BOLD
    wsn["D5"] = f"={PL}!{eb}"
    wsn["E5"] = f"={PL}!{eb}"
    wsn["H5"] = f"={PL}!{pk}"
    wsn["J5"] = f"={PL}!{ce}"
    rr = 6
    nflex = len(flexes) + 1
    for key, lab, lo, hi in flexes:
        wsn.cell(row=rr, column=1, value=lab)
        wsn.cell(row=rr, column=2, value=f"x{lo}")
        wsn.cell(row=rr, column=3, value=f"x{hi}")
        wsn.cell(row=rr, column=4, value=f"=Flex_{key}_lo!{eb}")
        wsn.cell(row=rr, column=5, value=f"=Flex_{key}_hi!{eb}")
        wsn.cell(row=rr, column=8, value=f"=Flex_{key}_lo!{pk}")
        wsn.cell(row=rr, column=9, value=f"=Flex_{key}_hi!{pk}")
        wsn.cell(row=rr, column=10, value=f"=Flex_{key}_lo!{ce}")
        wsn.cell(row=rr, column=11, value=f"=Flex_{key}_hi!{ce}")
        rr += 1
    wsn.cell(row=rr, column=1, value="GST charged on top of list fees (vs absorbed in quoted fee)")
    wsn.cell(row=rr, column=2, value="incl. (base)")
    wsn.cell(row=rr, column=3, value="on top")
    wsn.cell(row=rr, column=4, value=f"={PL}!{eb}")
    wsn.cell(row=rr, column=5, value=f"=Flex_gst_ontop!{eb}")
    wsn.cell(row=rr, column=8, value=f"={PL}!{pk}")
    wsn.cell(row=rr, column=9, value=f"=Flex_gst_ontop!{pk}")
    wsn.cell(row=rr, column=10, value=f"={PL}!{ce}")
    wsn.cell(row=rr, column=11, value=f"=Flex_gst_ontop!{ce}")
    last = rr
    for r_ in range(6, last + 1):
        wsn.cell(row=r_, column=6, value=f"=ABS(E{r_}-D{r_})")
        wsn.cell(row=r_, column=7, value=f"=RANK(F{r_},$F$6:$F${last})")
        wsn.cell(row=r_, column=12, value=f'=REPT("█",ROUND(F{r_}/MAX($F$6:$F${last})*30,0))')
        for c_ in (4, 5, 6, 8, 9):
            wsn.cell(row=r_, column=c_).number_format = FMT_INT
        for c_ in (10, 11):
            wsn.cell(row=r_, column=c_).number_format = FMT_1DP
    for c_ in (4, 5, 8):
        wsn.cell(row=5, column=c_).number_format = FMT_INT
    wsn.cell(row=5, column=10).number_format = FMT_1DP
    note(wsn, last + 2, "Conversion low (x0.8) doubles as the BM founder step-back stress (team-led conversion = founder-led ÷1.25, A-GRO-25); it is not a price response (see named stresses). Fee low (x0.8) ≈ BM price stress.")
    note(wsn, last + 3, "Budget rows hold the enrolment target: a smaller budget buys fewer paid enrolments; a larger one cannot exceed the plan target (A-GRO-01) or seat capacity.")
    # named one-sided stresses (price response, RT-08, RT-21, RT-11)
    ns0 = last + 5
    section(wsn, ns0, "Named stresses on the planning case (one-sided; each a full re-run) - price response at step 1, non-paid engine flat, masterclass half, lead-trainer pay", 12)
    header(wsn, ns0 + 1, ["Stress", "Sheet", "", "EBITDA Y1", "Change vs planning case", "", "", "Peak cash", "Change vs planning case", "Career enrolments", "Change"], widths=None)
    for i, (nm, lab, fx) in enumerate(STRESSES):
        r_ = ns0 + 2 + i
        wsn.cell(row=r_, column=1, value=lab)
        wsn.cell(row=r_, column=2, value=nm)
        wsn.cell(row=r_, column=4, value=f"={nm}!{eb}").number_format = FMT_INT
        wsn.cell(row=r_, column=5, value=f"=D{r_}-$D$5").number_format = FMT_INT
        wsn.cell(row=r_, column=8, value=f"={nm}!{pk}").number_format = FMT_INT
        wsn.cell(row=r_, column=9, value=f"=H{r_}-$H$5").number_format = FMT_INT
        wsn.cell(row=r_, column=10, value=f"={nm}!{ce}").number_format = FMT_1DP
        wsn.cell(row=r_, column=11, value=f"=J{r_}-$J$5").number_format = FMT_1DP
    NS = {nm: ns0 + 2 + i for i, (nm, _, _) in enumerate(STRESSES)}
    s2row = ns0 + 2 + len(STRESSES) + 1     # price response at step 2 block, filled after 3yr_Scenarios is built
    last_ns = s2row + 6
    # steady-state unit tornado on contribution per L3 student
    u0 = last_ns + 2
    section(wsn, u0, "Unit tornado: contribution after CAC per paid L3 student (post price-step, Base) - one driver at a time", 12)
    header(wsn, u0 + 1, ["Driver", "Adverse", "Favourable", "Contribution adverse", "Contribution favourable", "Swing"], widths=None)
    pB = lambda aid: A.r(aid, "base")
    g_ = f"(1+{pB('A-ECO-23')}*{pB('A-ECO-24')})"
    tstd = f"({pB('A-BM-04b')}+{pB('A-BM-04c')})/{pB('A-ECO-46')}"
    base_terms = {"fee": pB("A-BM-02"), "fill": pB("A-ECO-47"), "cac": f"{pB('A-ECO-FUN-01')}*{pB('A-ECO-51')}", "var": pB("A-BM-16"),
                  "emi": pB("A-GRO-35b")}

    def unit_contrib(feev, fillv, cacv, varv, emiv):
        return (f"={feev}/{g_}-{varv}-{pB('A-ECO-48')}*{tstd}/{fillv}-{feev}*{pB('A-GRO-35')}*{emiv}-{feev}*{pB('A-GRO-41')}-{cacv}")
    urows = [("Realised L3 fee ₹64k / ₹92k (x0.8 / x1.15)", ("fee", 0.8, 1.15)), ("Cohort fill 8 / 12 students", ("fill", 0.8, 1.2)),
             ("Effective paid CAC per paid student x1.3 / x0.7", ("cac", 1.3, 0.7)), ("Consumables x1.25 / x0.75", ("var", 1.25, 0.75)),
             ("EMI subvention 7% / 3%", ("emi", 1.4, 0.6))]
    for i, (lab, (k, lo, hi)) in enumerate(urows):
        r_ = u0 + 2 + i
        wsn.cell(row=r_, column=1, value=lab)
        wsn.cell(row=r_, column=2, value=f"x{lo}")
        wsn.cell(row=r_, column=3, value=f"x{hi}")
        for j, mult in ((4, lo), (5, hi)):
            args = dict(base_terms)
            args[k] = f"({base_terms[k]}*{mult})"
            wsn.cell(row=r_, column=j, value=unit_contrib(args["fee"], args["fill"], args["cac"], args["var"], args["emi"])).number_format = FMT_INT
        wsn.cell(row=r_, column=6, value=f"=ABS(E{r_}-D{r_})").number_format = FMT_INT
    r_ = u0 + 2 + len(urows)
    wsn.cell(row=r_, column=1, value="Base contribution after CAC per L3 student").font = BOLD
    wsn.cell(row=r_, column=4, value=unit_contrib(*[base_terms[x] for x in ("fee", "fill", "cac", "var", "emi")])).number_format = FMT_INT

    # ---------------------------------------------------------------- Unit_Economics (programme ladder; Selected scenario)
    wu = wb.create_sheet("Unit_Economics", 3)
    title(wu, "Programme unit economics - per seat and per cohort (scenario = Assumptions!C3 selector)",
          "Ladder from positioning_and_segments.md §6 (Growth) with BM realised fees. Fees incl. GST as quoted; revenue ex-GST. Trainer cost is a standard cost (salary / slots / fill).")
    cols = ["Metric", "L1 Career Taster", "L1-S5 Self-makeup", "L2 Foundation", "L3 Pro - today's fee (CA-02, incl. kit)", "L3 Pro - after price step (A-BM-02)",
            "L3 Destination (price parity, step-2 fee)", "L4 Masterclass", "L5 Pro Circle (per yr)", "L3 Pro - price step 1 (₹75k list x realisation)", "Notes"]
    header(wu, 4, cols, widths=[50, 13, 13, 13, 16, 16, 16, 13, 13, 16, 50])
    s = lambda aid: A.r(aid, "sel")
    gS = f"(1+{s('A-ECO-23')}*{s('A-ECO-24')})"
    tS = f"({s('A-BM-04b')}+{s('A-BM-04c')})/{s('A-ECO-46')}"  # trainer+assistant per slot-month
    occ = f"({s('A-ECO-118')}+{s('A-ECO-119')})/({s('A-ECO-110')}*{s('A-ECO-111')})"  # today's occupancy per seat-month
    U = {}
    rows = [
        ("dur", "Duration (on-campus months; seat-months per student)", ["0.1", "0.1", "1", s("A-ECO-48"), s("A-ECO-48"), s("A-ECO-49"), "0.07", "0"], FMT_2DP),
        ("hrs", "Contact hours (indicative)", ["3", "6", "80", "290", "290", "250", "12", "24"], FMT_INT),
        ("cap", "Batch cap (A-BM-01) / seats per session", ["12", "12", "12", "12", "12", "12", "14", "0"], FMT_INT),
        ("fill", "Cohort fill used (A-ECO-47; masterclass x A-ECO-132)", [s("A-ECO-47")] * 6 + [f"14*{s('A-ECO-132')}", "0"], FMT_1DP),
        ("fee", "Fee incl. GST (as quoted)", [s("A-GRO-04"), s("A-GRO-08"), s("A-GRO-05"), s("CA-02"), s("A-BM-02"), s("A-BM-02"), s("A-GRO-07"), s("A-GRO-09")], FMT_RS),
        ("net", "Revenue per seat ex-GST", [f"{{c}}{{fee}}/{gS}"] * 8, FMT_RS),
        ("kit", "Kit cost borne by PNA", ["0", "0", "0", s("A-ECO-103"), "0", "0", "0", "0"], FMT_RS),
        ("cons", "Consumables / models / delivery", [s("A-ECO-44"), s("A-ECO-43"), s("A-ECO-40"), s("A-BM-16"), s("A-BM-16"), s("A-ECO-41"), s("A-ECO-42"), s("A-ECO-45")], FMT_RS),
        ("trb", "Trainer + assistant cost per batch (standard: salary x months / slots)", ["0", "0", f"{tS}*{{c}}{{dur}}", f"{tS}*{{c}}{{dur}}", f"{tS}*{{c}}{{dur}}", f"{tS}*{{c}}{{dur}}", "0", "0"], FMT_RS),
        ("trs", "Trainer cost per student (batch cost / fill)", [f"IFERROR({{c}}{{trb}}/{{c}}{{fill}},0)"] * 8, FMT_RS),
        ("pay", "Payment gateway + EMI subvention", [f"{{c}}{{fee}}*{s('A-GRO-41')}"] * 3 + [f"{{c}}{{fee}}*({s('A-GRO-41')}+{s('A-GRO-35')}*{s('A-GRO-35b')})"] * 3 + [f"{{c}}{{fee}}*{s('A-GRO-41')}"] * 2, FMT_RS),
        ("cps", "Contribution per seat before CAC", [f"{{c}}{{net}}-{{c}}{{kit}}-{{c}}{{cons}}-{{c}}{{trs}}-{{c}}{{pay}}"] * 8, FMT_RS),
        ("cmp", "Contribution margin %", [f"IFERROR({{c}}{{cps}}/{{c}}{{net}},0)"] * 8, FMT_PCT),
        ("cac", "Acquisition cost per seat (career: effective paid CAC x paid share + referral reward share; L4/L1-S5: funnel media per seat)",
         [s("A-GRO-15"), s("A-ECO-FUN-04")] + [f"{s('A-ECO-FUN-01')}*{s('A-ECO-51')}*({s('A-GRO-03a')}+{s('A-GRO-03b')}+{s('A-GRO-03e')})+{s('A-ECO-137')}*{s('A-GRO-34')}"] * 4 + [s("A-ECO-FUN-03"), "0"], FMT_RS),
        ("cac2", "Contribution per seat after CAC", [f"{{c}}{{cps}}-{{c}}{{cac}}"] * 8, FMT_RS),
        ("occ", "Occupancy cost per seat (today's space: rent + utilities / seat-months)", [f"{occ}*{{c}}{{dur}}"] * 8, FMT_RS),
        ("cohf", "Cohort fixed cost (trainer batch cost + occupancy x batch cap)", [f"{{c}}{{trb}}+{{c}}{{occ}}*{{c}}{{cap}}"] * 8, FMT_RS),
        ("var1", "Variable cost per seat (kit + consumables + payment + CAC)", [f"{{c}}{{kit}}+{{c}}{{cons}}+{{c}}{{pay}}+{{c}}{{cac}}"] * 8, FMT_RS),
        ("be", "Breakeven students per cohort", [f"IFERROR({{c}}{{cohf}}/({{c}}{{net}}-{{c}}{{var1}}),0)"] * 8, FMT_1DP),
        ("bef", "Breakeven fill % of batch cap (BM M1)", [f"IFERROR({{c}}{{be}}/{{c}}{{cap}},0)"] * 8, FMT_PCT),
        ("cc10", "Cohort contribution at 10 students (after CAC, trainer, occupancy)", [f"10*({{c}}{{net}}-{{c}}{{var1}})-{{c}}{{cohf}}"] * 8, FMT_INT),
        ("cc12", "Cohort contribution at 12 students", [f"12*({{c}}{{net}}-{{c}}{{var1}})-{{c}}{{cohf}}"] * 8, FMT_INT),
        ("cc14", "Cohort contribution at 14 students (cap raised; quality risk)", [f"14*({{c}}{{net}}-{{c}}{{var1}})-{{c}}{{cohf}}"] * 8, FMT_INT),
        ("bpy", "Batches per year per slot (12 / duration)", [f"IFERROR(12/{{c}}{{dur}},0)"] * 8, FMT_1DP),
    ]
    s1fee = f"MIN({s('A-ECO-160')},{s('A-GRO-06')})*{s('A-BM-02')}/{s('A-GRO-06')}"
    rows = [(key, lab, forms + [s1fee if key == "fee" else forms[4]], fmt) for (key, lab, forms, fmt) in rows]
    for i, (key, lab, forms, fmt) in enumerate(rows):
        U[key] = 5 + i
    for i, (key, lab, forms, fmt) in enumerate(rows):
        r_ = 5 + i
        wu.cell(row=r_, column=1, value=lab).font = BOLD if key in ("cps", "cac2", "bef") else Font()
        for j, fm in enumerate(forms):
            c = "BCDEFGHIJ"[j]
            fm2 = fm.replace("{c}", c)
            for kk, vv in U.items():
                fm2 = fm2.replace("{" + kk + "}", str(vv))
            cell = wu.cell(row=r_, column=2 + j, value="=" + fm2)
            cell.number_format = fmt
            if key in ("cps", "cac2", "bef"):
                cell.fill = KEY_FILL
                cell.font = BOLD
    r_ = 5 + len(rows) + 1
    section(wu, r_, "Today's illustrative baseline (CA-01 x CA-02 mix) - NOT actual revenue; founder data pull (V1) to replace", 10)
    base_rows = [("Students per year (CA-01)", f"={s('CA-01')}", FMT_INT),
                 ("Career share (A-ECO-101)", f"={s('A-ECO-101')}", FMT_PCT),
                 ("Career students", f"=B{r_ + 1}*B{r_ + 2}", FMT_INT),
                 ("Short-course students", f"=B{r_ + 1}-B{r_ + 3}", FMT_INT),
                 ("Illustrative revenue incl. GST (career x CA-02 + short x A-ECO-102)", f"=B{r_ + 3}*{s('CA-02')}+B{r_ + 4}*{s('A-ECO-102')}", FMT_INT),
                 ("Illustrative revenue ex-GST", f"=B{r_ + 5}/{gS}", FMT_INT),
                 ("Illustrative contribution (kit + consumables + payment)", f"=B{r_ + 6}-B{r_ + 3}*({s('A-ECO-103')}+{s('A-BM-16')})-B{r_ + 4}*{s('A-ECO-42')}-B{r_ + 5}*{s('A-GRO-41')}", FMT_INT),
                 ("Less academy occupancy share x 12", f"=-12*({s('A-ECO-118')}+{s('A-ECO-119')})", FMT_INT),
                 ("Illustrative academy surplus before founder's time (NOT actual profit)", f"=B{r_ + 7}+B{r_ + 8}", FMT_INT)]
    for i, (lab, form, fmt) in enumerate(base_rows):
        wu.cell(row=r_ + 1 + i, column=1, value=lab)
        c = wu.cell(row=r_ + 1 + i, column=2, value=form)
        c.number_format = fmt
    U["baseline_rev"] = r_ + 6
    note(wu, r_ + 11, "BM's '~₹0.3 crore today' is this same CA-01 x CA-02 arithmetic (50 x ₹60k), an estimate, not PNA's reported revenue.")
    # ---- student all-in cost by format (Gate D §11.3 item 6)
    ra = r_ + 13
    section(wu, ra, "Student all-in cost by L3 format (₹, incl. GST as quoted): tuition + optional kit + living / travel - what parents compare", 10)
    header(wu, ra + 1, ["Line", "Weekday - tricity resident", "Weekday - out-of-town (12-week stay)", "Flex - tricity resident", "Destination - out-of-town (5-6-week stay)"], widths=None)
    liv = [f"{s('A-ECO-171')}*{s('A-ECO-172a')}", s("A-BM-12a"), f"{s('A-ECO-171')}*{s('A-ECO-172b')}", s("A-BM-12b")]
    arow = [("Today's fee (CA-02; basic kit included)", [s("CA-02")] * 4),
            ("L3 list fee at price step 1", [f"MIN({s('A-ECO-160')},{s('A-GRO-06')})"] * 4),
            ("L3 list fee at price step 2", [s("A-GRO-06")] * 4),
            ("Optional pro kit (itemised; never compulsory)", [s("A-ECO-170")] * 4),
            ("Living + travel (A-BM-12a/b; local commute A-ECO-171 x class days)", liv),
            ("All-in at today's fee (kit included)", ["{c}%d+{c}%d" % (ra + 2, ra + 6)] * 4),
            ("All-in at step 1, without optional kit", ["{c}%d+{c}%d" % (ra + 3, ra + 6)] * 4),
            ("All-in at step 1, with optional kit", ["{c}%d+{c}%d+{c}%d" % (ra + 3, ra + 5, ra + 6)] * 4),
            ("All-in at step 2, without optional kit", ["{c}%d+{c}%d" % (ra + 4, ra + 6)] * 4),
            ("All-in at step 2, with optional kit", ["{c}%d+{c}%d+{c}%d" % (ra + 4, ra + 5, ra + 6)] * 4),
            ("Premium vs Weekday tricity resident (step 2, with kit)", ["{c}%d/$B$%d-1" % (ra + 11, ra + 11)] * 4)]
    for i, (lab, forms) in enumerate(arow):
        r2 = ra + 2 + i
        wu.cell(row=r2, column=1, value=lab).font = BOLD if lab.startswith("All-in") else Font()
        for j, fm in enumerate(forms):
            c = "BCDE"[j]
            cell = wu.cell(row=r2, column=2 + j, value="=" + fm.replace("{c}", c))
            cell.number_format = FMT_PCT if lab.startswith("Premium") else FMT_RS
            if lab.startswith("All-in"):
                cell.fill = KEY_FILL
    U["allin0"] = ra + 2
    note(wu, ra + 14, "Living cost excludes refundable PG deposits. Destination = 4 weeks online pre-work at home + 5-6 weeks in Chandigarh (A-BM-12b); Weekday out-of-town = 12-week stay (A-BM-12a). Fees are the GST-inclusive numbers families see.")

    # ---------------------------------------------------------------- Capacity sheet
    wc = wb.create_sheet("Capacity", 4)
    title(wc, "Capacity: stations, batch slots, trainers and founder hours (Selected scenario)")
    header(wc, 4, ["Metric", "Today's Sector 8 space", "New academy space (plan)", "Notes"], widths=[56, 20, 22, 60])
    cap_rows = [
        ("Stations", f"={s('A-ECO-110')}", f"=MAX({s('A-ECO-115')},{s('A-ECO-110')})", "A-ECO-110 / 115 (founder to confirm today's count)"),
        ("Batch slots per day", f"={s('A-ECO-111')}", f"={s('A-ECO-116')}", "morning / afternoon (+ weekend/flex)"),
        ("Seat capacity (concurrent students)", "=B5*B6", "=C5*C6", ""),
        ("Usable seat-months per month (x A-ECO-117)", f"=B7*{s('A-ECO-117')}", f"=C7*{s('A-ECO-117')}", ""),
        ("Max new L3 students per year if seats held 3 months", f"=B8*12/{s('A-ECO-48')}", f"=C8*12/{s('A-ECO-48')}", "upper bound with no L2/destination/hybrid"),
        ("Seat-months needed per year at A-GRO-01 (L3 x3 + L2 x1)", f"={s('A-GRO-01')}*12*({s('A-GRO-02')}*{s('A-ECO-48')}+(1-{s('A-GRO-02')}))", "=B10", ""),
        ("Utilisation at A-GRO-01 steady state", "=B10/(B8*12)", "=C10/(C8*12)", ">100% = target does not fit"),
        ("Batch-slots active at A-GRO-01 (seat-months/12 / cohort fill)", f"=B10/12/{s('A-ECO-47')}", "=B12", ""),
        ("Trainer FTE needed at month-12 founder share (A-BM-10b)", f"=B12*(1-{s('A-BM-10b')})/{s('A-ECO-46')}", "=B13", "slots one FTE leads: A-ECO-46"),
        ("Founder contact hours per month at month 12 (slots x 4 h x 22 days x share)", f"=B12*4*22*{s('A-BM-10b')}", "=B14", "plus masterclasses ~19-25 days/yr (A-BM-05)"),
        ("Rent per month", f"={s('A-ECO-118')}", f"={s('A-ECO-113')}*{s('A-ECO-114')}", "S-CHD-22 bands; today's share unknown"),
        ("Rent per usable seat-month", "=B15/B8", "=IFERROR(C15/C8,0)", ""),
        ("First month seat capacity binds (Base outlook)", f"=Outlook_Base!B{K['First month seats bind (share of demand that fits < 100%)']}", "", "drives the move decision (A-ECO-112)"),
    ]
    for i, (lab, b, c, n) in enumerate(cap_rows):
        rr_ = 5 + i
        wc.cell(row=rr_, column=1, value=lab)
        wc.cell(row=rr_, column=2, value=b).number_format = FMT_1DP if i not in (6, 15) else (FMT_PCT if i == 6 else FMT_INT)
        wc.cell(row=rr_, column=3, value=c).number_format = FMT_1DP if i not in (6, 15) else (FMT_PCT if i == 6 else FMT_INT)
        wc.cell(row=rr_, column=4, value=n).font = NOTE_FONT
    for rr_ in (15, 16):
        wc.cell(row=rr_, column=2).number_format = FMT_INT
        wc.cell(row=rr_, column=3).number_format = FMT_INT

    # ---------------------------------------------------------------- 3-year scenarios
    w3 = wb.create_sheet("3yr_Scenarios", 4)
    title(w3, "Directional 3-year scenarios (₹ lakh, ex-GST) - Year 1 = 12-month outlook; Years 2-3 driver-based",
          "Layers: flagship (tricity + regional offline), destination/hybrid, CPD (masterclasses + Pro Circle), online, adjacents, and a partner-hosted satellite only if gate G3a is met (Aggressive Y3).")
    # groups 1-5 keep their columns (downstream readers); 6-9 are Gate E variants of the planning case (group 5)
    GL = list(CASES) + ["Upside G1 M6", "PLANNING G1 M9", "Plan: no step 2", "Plan: step 2, conv -10%", "Plan: step 2, conv -20%", "Plan: base business only"]
    NG = len(GL)
    hdr = ["Line (₹ lakh unless stated)"]
    for sc in GL:
        hdr += [f"{sc} Y1", f"{sc} Y2", f"{sc} Y3"]
    hdr += ["Basis"]
    header(w3, 4, hdr, widths=[58] + [11] * (3 * NG) + [52])
    T = {}
    onames = {1: "Outlook_Conservative", 2: "Outlook_Base", 3: "Outlook_Aggressive", 4: "Staged_G1M6", 5: "Staged_G1M9",
              6: "Staged_G1M9", 7: "Staged_G1M9", 8: "Staged_G1M9", 9: "Staged_G1M9"}
    SI = {1: 1, 2: 2, 3: 3, 4: 2, 5: 2, 6: 2, 7: 2, 8: 2, 9: 2}      # rate/plan index per group (Staged = Base rates and plan)
    FPG = {1: 1, 2: 1, 3: 1, 4: 2, 5: 2, 6: 2, 7: 2, 8: 2, 9: 2}     # founder path per group
    PPG = {1: 1, 2: 1, 3: 1, 4: 2, 5: 2, 6: 2, 7: 2, 8: 2, 9: 2}     # price path per group
    S2OFF = {6, 9}                       # price step 2 not taken (stays at step-1 realised fee)
    RESP = {7: "A-ECO-228a", 8: "A-ECO-228b"}   # conversion response at step 2
    GATEOFF = {9}                        # G2/audience-gated layers not passed: no incremental Destination, online, adjacents, recorded library
    BC = 1 + 3 * NG + 1                  # basis column
    rr = 5

    def ycol(si, y):  # si 1..3, y 1..3
        return CL(1 + (si - 1) * 3 + y)

    def tr(key, label, fn, fmt=FMT_1DP, bold=False, basis=""):
        nonlocal rr
        T[key] = rr
        w3.cell(row=rr, column=1, value=label).font = BOLD if bold else Font()
        for si in range(1, NG + 1):
            for y in (1, 2, 3):
                v = fn(si, y)
                c = w3.cell(row=rr, column=1 + (si - 1) * 3 + y, value=("=" + v) if v is not None else None)
                c.number_format = fmt
                if bold:
                    c.font = BOLD
                    c.fill = KEY_FILL
        w3.cell(row=rr, column=BC, value=basis).font = NOTE_FONT
        rr += 1

    def sec3(text):
        nonlocal rr
        section(w3, rr, text, BC)
        rr += 1

    P = lambda aid, si: A.pick(aid, str(SI[si]))  # both rate & plan follow scenario (Staged groups = Base)
    O = lambda si, key: f"{onames[si]}!O{outs[onames[si]][key]}"
    OH2 = lambda si, key: f"SUM({onames[si]}!I{outs[onames[si]][key]}:{onames[si]}!N{outs[onames[si]][key]})"
    T_ = lambda key, si, y: f"{ycol(si, y)}{T[key]}"
    g3 = lambda si: f"(1+{P('A-ECO-23', si)}*{P('A-ECO-24', si)})"
    L = 100000.0

    sec3("Volumes")
    tr("car0", "Career demand before any price response (flagship L2 + L3 new students)",
       lambda si, y: O(si, "car") if y == 1 else (f"2*{OH2(si, 'y2d')}/({OH2(si, 'sea')}/6)*(1+{P('A-ECO-201', si)})" if y == 2 else f"{T_('car0', si, 2)}*(1+{P('A-ECO-202', si)})"), FMT_INT,
       basis="Y2 = 2 x Y1 H2 run-rate (pre-move months use demand, not capacity-limited enrolments), de-seasonalised (May-Oct index), x (1+A-ECO-201); Y3 x (1+A-ECO-202); capacity-capped below")
    s2pre = lambda si: f"MAX(0,MIN(12,{P('A-ECO-106', si)}-13))"      # Y2 months before price step 2
    tr("prsp", "Price-response factor on career enrolments after price step 2 (groups 7-8: A-ECO-228a/b)",
       lambda si, y: "1" if (y == 1 or si not in RESP) else (f"1+{P(RESP[si], si)}*(12-{s2pre(si)})/12" if y == 2 else f"1+{P(RESP[si], si)}"), FMT_2DP,
       basis="Y2: response applies to the months after step 2 (A-ECO-106); Y3: full year")
    tr("car", "Career enrolments, flagship (L2 + L3 new students)", lambda si, y: f"{T_('car0', si, y)}*{T_('prsp', si, y)}", FMT_INT)
    tr("l3sh", "L3 share of career enrolments", lambda si, y: P("A-GRO-02", si), FMT_PCT)
    tr("oots", "Out-of-town share of career enrolments", lambda si, y: P("A-GRO-37", si) if y == 1 else P("A-ECO-203a" if y == 2 else "A-ECO-203b", si), FMT_PCT)
    tr("dest", "Incremental destination/hybrid regional students (G2 engine)",
       lambda si, y: O(si, "l3d") + "*0" if (y == 1 or si in GATEOFF) else P("A-ECO-204a" if y == 2 else "A-ECO-204b", si), FMT_INT,
       basis="Y1 destination-format students are inside career enrolments; group 9: G2 not passed")
    tr("upg", "L2 -> L3 upgrades", lambda si, y: O(si, "upg") if y == 1 else f"{T_('car', si, y)}*(1-{P('A-GRO-02', si)})*{P('A-ECO-36', si)}", FMT_INT)
    tr("stn", "Stations", lambda si, y: f"{onames[si]}!N{outs[onames[si]]['stn']}" if y == 1 else P("A-ECO-221a" if y == 2 else "A-ECO-221b", si), FMT_INT)
    tr("slt", "Batch slots per day", lambda si, y: f"{onames[si]}!N{outs[onames[si]]['slt']}" if y == 1 else P("A-ECO-220a" if y == 2 else "A-ECO-220b", si), FMT_1DP)
    tr("seatcap", "Usable seat-months per year", lambda si, y: f"{T_('stn', si, y)}*{T_('slt', si, y)}*12*{P('A-ECO-117', si)}", FMT_INT)
    tr("seatneed", "Seat-months needed (L3 x3, L2 x1, upgrades x3, destination x2.5)",
       lambda si, y: (f"{onames[si]}!O{outs[onames[si]]['occ']}*12" if y == 1 else
                      f"{T_('car', si, y)}*({T_('l3sh', si, y)}*{P('A-ECO-48', si)}+(1-{T_('l3sh', si, y)}))+{T_('upg', si, y)}*{P('A-ECO-48', si)}+{T_('dest', si, y)}*{P('A-ECO-49', si)}"), FMT_INT)
    tr("capf", "Capacity factor (share of planned volume that fits)", lambda si, y: "1" if y == 1 else f"MIN(1,{T_('seatcap', si, y)}/{T_('seatneed', si, y)})", FMT_PCT)
    tr("util", "Seat utilisation", lambda si, y: f"{onames[si]}!N{outs[onames[si]]['util']}" if y == 1 else f"MIN(1,{T_('seatneed', si, y)}/({T_('stn', si, y)}*{T_('slt', si, y)}*12))", FMT_PCT)
    tr("carx", "Career enrolments delivered (after capacity)", lambda si, y: f"{T_('car', si, y)}*{T_('capf', si, y)}", FMT_INT, True)
    tr("destx", "Destination/hybrid incremental students delivered", lambda si, y: f"{T_('dest', si, y)}*{T_('capf', si, y)}", FMT_INT)
    tr("mc", "Masterclass seats", lambda si, y: O(si, "mc") if y == 1 else P("A-ECO-205a" if y == 2 else "A-ECO-205b", si), FMT_INT)
    tr("sm", "Self-makeup seats", lambda si, y: O(si, "sm") if y == 1 else P("A-ECO-206a" if y == 2 else "A-ECO-206b", si), FMT_INT)
    tr("pu", "Pop-up events", lambda si, y: O(si, "pu") if y == 1 else P("A-ECO-207a" if y == 2 else "A-ECO-207b", si), FMT_1DP)
    tr("onl", "Online short-course buyers", lambda si, y: "0" if (y == 1 or si in GATEOFF) else P("A-ECO-208a" if y == 2 else "A-ECO-208b", si), FMT_INT,
       basis="Gated on ≥50k engaged followers; group 9: gate not passed")
    tr("pcm", "Pro Circle paid members (graduates after free year + S3 buyers)",
       lambda si, y: O(si, "pc") if y == 1 else f"{T_('carx', si, y - 1)}*{T_('l3sh', si, y - 1)}*{P('A-GRO-31', si)}*{P('A-GRO-36', si)}+{T_('mc', si, y)}*0.7*{P('A-GRO-36b', si)}", FMT_INT)
    tr("sat", "Partner-hosted satellite students (only if G3a met)", lambda si, y: "0" if y < 3 else P("A-ECO-214", si), FMT_INT)
    tr("fsh", "Founder share of contact hours (Staged: Gate D path)", lambda si, y: f"{onames[si]}!N{outs[onames[si]]['fsh']}" if y == 1 else P(("A-BM-10c" if y == 2 else "A-BM-10d") + ("-G" if FPG[si] == 2 else ""), si), FMT_PCT)

    sec3("Prices (incl. GST)")
    def fl3fn(si, y):
        if y == 1:
            return f"{onames[si]}!N{outs[onames[si]]['fl3']}"
        if PPG[si] == 1:
            return P("A-BM-02", si) if y == 2 else f"{T_('fl3', si, 2)}*(1+{P('A-ECO-217', si)})"
        s1r = f"MIN({P('A-ECO-160', si)},{P('A-GRO-06', si)})*{P('A-BM-02', si)}/{P('A-GRO-06', si)}"
        start = 13 if y == 2 else 25
        pre = "12" if si in S2OFF else f"MAX(0,MIN(12,{P('A-ECO-106', si)}-{start}))"
        blend = f"({pre}*{s1r}+(12-{pre})*{P('A-BM-02', si)})/12"
        return blend if y == 2 else f"{blend}*(1+{P('A-ECO-217', si)})"
    tr("fl3", "L3 / destination realised fee (two-step path: months before step 2 at step-1 realised)", fl3fn, FMT_INT)
    tr("fl2", "L2 Foundation fee", lambda si, y: P("A-GRO-05", si) if y < 3 else f"{P('A-GRO-05', si)}*(1+{P('A-ECO-217', si)})", FMT_INT)

    sec3("Revenue (₹ lakh, ex-GST)")
    tr("rtri", "Flagship career revenue - tricity-origin",
       lambda si, y: (f"({O(si, 'rcar')})*(1-{P('A-GRO-37', si)})/{L}" if y == 1 else
                      f"({T_('carx', si, y)}*({T_('l3sh', si, y)}*{T_('fl3', si, y)}+(1-{T_('l3sh', si, y)})*{T_('fl2', si, y)})+{T_('upg', si, y)}*{T_('capf', si, y)}*({T_('fl3', si, y)}-{T_('fl2', si, y)}))/{g3(si)}*(1-{T_('oots', si, y)})/{L}"),
       basis="career revenue x (1 - out-of-town share)")
    tr("rreg", "Flagship career revenue - out-of-town (regional destination, offline)",
       lambda si, y: (f"({O(si, 'rcar')})*{P('A-GRO-37', si)}/{L}" if y == 1 else
                      f"({T_('carx', si, y)}*({T_('l3sh', si, y)}*{T_('fl3', si, y)}+(1-{T_('l3sh', si, y)})*{T_('fl2', si, y)})+{T_('upg', si, y)}*{T_('capf', si, y)}*({T_('fl3', si, y)}-{T_('fl2', si, y)}))/{g3(si)}*{T_('oots', si, y)}/{L}"))
    tr("rhyb", "Destination/hybrid incremental regional students", lambda si, y: "0" if y == 1 else f"{T_('destx', si, y)}*{T_('fl3', si, y)}/{g3(si)}/{L}")
    tr("rsho", "Entry products: taster, self-makeup, pop-up tickets",
       lambda si, y: (f"({O(si, 'rtk')}+{O(si, 'rsm')}+{O(si, 'rpu')})/{L}" if y == 1 else
                      f"({T_('sm', si, y)}*{P('A-GRO-08', si)}+{T_('pu', si, y)}*{P('A-BM-06a', si)}*{P('A-BM-06b', si)}+{T_('carx', si, y)}*{P('A-GRO-03e', si)}/({P('A-GRO-22a', si)}*{P('A-GRO-22b', si)}*{P('A-GRO-22c', si)})*(1-{P('A-GRO-22a', si)}*{P('A-GRO-22b', si)}*{P('A-GRO-22c', si)})*{P('A-GRO-04', si)})/{g3(si)}/{L}"))
    tr("rcpd", "Working-artist CPD: L4 masterclasses + L5 Pro Circle",
       lambda si, y: (f"({O(si, 'rmc')}+{O(si, 'rpc')})/{L}" if y == 1 else f"({T_('mc', si, y)}*{P('A-GRO-07', si)}+{T_('pcm', si, y)}*{P('A-GRO-09', si)})/{g3(si)}/{L}"))
    tr("ronl", "Online short courses", lambda si, y: "0" if y == 1 else f"{T_('onl', si, y)}*{P('A-ECO-209', si)}/{g3(si)}/{L}")
    tr("radj", "Adjacents: kit margin, alumni booking desk, brand partnerships",
       lambda si, y: (f"{O(si, 'rkit')}/{L}" if y == 1 else ("0" if si in GATEOFF else
                      f"({T_('carx', si, y)}*{T_('l3sh', si, y)}*{P('A-ECO-227', si)}+{P('A-BM-09a' if y == 2 else 'A-BM-09b', si)}*{P('A-BM-09c', si)}/{g3(si)}+{P('A-ECO-213a' if y == 2 else 'A-ECO-213b', si)})/{L}")),
       basis="group 9: adjacents not counted in the base business (review RT-10)")
    tr("rsat", "Partner-hosted satellite (PNA share after host revenue share)", lambda si, y: "0" if y < 3 else f"{T_('sat', si, y)}*{T_('fl3', si, y)}/{g3(si)}*(1-{P('A-BM-19', si)})/{L}")
    tr("rev", "Total revenue", lambda si, y: f"SUM({ycol(si, y)}{T['rtri']}:{ycol(si, y)}{T['rsat']})", bold=True)
    tr("revg", "Revenue growth", lambda si, y: "0" if y == 1 else f"{T_('rev', si, y)}/{T_('rev', si, y - 1)}-1", FMT_PCT)

    sec3("Costs (₹ lakh)")
    tr("cvar", "Variable delivery: consumables, kits, payment/EMI, rewards, pop-ups, Pro Circle service, satellite trainer",
       lambda si, y: (f"{O(si, 'var')}/{L}" if y == 1 else
                      f"(({T_('carx', si, y)}*{T_('l3sh', si, y)}+{T_('upg', si, y)}*{T_('capf', si, y)})*{P('A-BM-16', si)}+{T_('destx', si, y)}*({P('A-ECO-41', si)}+{P('A-ECO-225', si)})+{T_('carx', si, y)}*(1-{T_('l3sh', si, y)})*{P('A-ECO-40', si)}"
                      f"+{T_('mc', si, y)}*{P('A-ECO-42', si)}+{T_('sm', si, y)}*{P('A-ECO-43', si)}+{T_('pu', si, y)}*{P('A-BM-06c', si)}+{T_('pcm', si, y)}*{P('A-ECO-45', si)}"
                      f"+{T_('carx', si, y)}*{P('A-ECO-137', si)}*{P('A-GRO-34', si)}+{T_('sat', si, y)}*{P('A-ECO-215', si)}"
                      f"+({T_('rtri', si, y)}+{T_('rreg', si, y)}+{T_('rhyb', si, y)})*{L}*{g3(si)}*{P('A-GRO-35', si)}*{P('A-GRO-35b', si)}+{T_('rev', si, y)}*{L}*{g3(si)}*{P('A-GRO-41', si)}"
                      f"+{T_('ronl', si, y)}*{L}*{P('A-ECO-212', si)})/{L}"))
    tr("ctr", "Trainers + assistants (batch-slots x (1 - founder share) / slots per FTE; wage escalation)",
       lambda si, y: (f"SUM({onames[si]}!C{outs[onames[si]]['ctr']}:{onames[si]}!N{outs[onames[si]]['ctr']})/{L}" if y == 1 else
                      f"(MAX(1,ROUNDUP({T_('seatneed', si, y)}*{T_('capf', si, y)}/12/{P('A-ECO-47', si)}*(1-{T_('fsh', si, y)})/{P('A-ECO-46', si)},0))*({P('A-BM-04a', si)}+{P('A-BM-04b', si)})/2"
                      f"+ROUNDUP({T_('seatneed', si, y)}*{T_('capf', si, y)}/12/{P('A-ECO-47', si)}/2,0)*{P('A-BM-04c', si)})*12*(1+{P('A-ECO-218', si)})^{y - 1}/{L}"))
    tr("cgr", "Growth team: counsellors, marketing/content, freelancers (Y2+: counsellor FTE input + Y1 M12 team run-rate)",
       lambda si, y: (f"SUM({onames[si]}!C{outs[onames[si]]['csl']}:{onames[si]}!N{outs[onames[si]]['cmk']})/{L}" if y == 1 else
                      f"({P('A-ECO-222a' if y == 2 else 'A-ECO-222b', si)}*{P('A-GRO-45', si)}+{onames[si]}!N{outs[onames[si]]['cmk']})*12*(1+{P('A-ECO-218', si)})^{y - 1}/{L}"))
    tr("cmgr", "Academy manager + front desk + Admissions & Operations Lead premium", lambda si, y: (f"SUM({onames[si]}!C{outs[onames[si]]['cfd']}:{onames[si]}!N{outs[onames[si]]['cops']})/{L}" if y == 1 else
                                                         f"({P('A-ECO-223a' if y == 2 else 'A-ECO-223b', si)}*{P('A-ECO-125', si)}+{onames[si]}!N{outs[onames[si]]['cfd']}+{onames[si]}!N{outs[onames[si]]['cops']})*12*(1+{P('A-ECO-218', si)})^{y - 1}/{L}"),
       basis="incl. the Admissions & Operations Lead premium (A-ECO-157) in Staged groups")
    tr("cocc", "Rent + utilities", lambda si, y: (f"({O(si, 'rent')}+{O(si, 'util2')})/{L}" if y == 1 else
                                              f"({onames[si]}!N{outs[onames[si]]['rent']}+{onames[si]}!N{outs[onames[si]]['util2']})*12*(1+{P('A-ECO-219', si)})^{y - 1}/{L}"))
    tr("cmed", "Paid media + regional acquisition + online CAC", lambda si, y: (f"{O(si, 'med')}/{L}" if y == 1 else
                                                                         f"({P('A-ECO-224a' if y == 2 else 'A-ECO-224b', si)}+{T_('destx', si, y)}*{P('A-BM-15', si)}+{T_('onl', si, y)}*{P('A-ECO-210', si)}*0.5)/{L}"))
    tr("coth", "Tech, partnerships/PR, admin, online content, one-offs",
       lambda si, y: (f"({O(si, 'tech')}+{O(si, 'part')}+{O(si, 'adm')}+{O(si, 'one')}+{O(si, 'exit')})/{L}" if y == 1 else
                      f"(({onames[si]}!N{outs[onames[si]]['tech']}+{P('A-ECO-58', si)}+{P('A-ECO-134', si)})*12+IF({T_('onl', si, y)}>0,{P('A-ECO-211', si)},0))/{L}"))
    tr("cost", "Total costs", lambda si, y: f"SUM({ycol(si, y)}{T['cvar']}:{ycol(si, y)}{T['coth']})", bold=True)
    tr("ebitda", "EBITDA", lambda si, y: f"{T_('rev', si, y)}-{T_('cost', si, y)}", bold=True)
    tr("ebm", "EBITDA margin", lambda si, y: f"IFERROR({T_('ebitda', si, y)}/{T_('rev', si, y)},0)", FMT_PCT, True)
    tr("ebf", "Memo: EBITDA after a founder-role salary (A-ECO-138 x 12, wage escalation)",
       lambda si, y: f"{O(si, 'ebf')}/{L}" if y == 1 else f"{T_('ebitda', si, y)}-{P('A-ECO-138', si)}*12*(1+{P('A-ECO-218', si)})^{y - 1}/{L}", FMT_1DP, True)
    tr("ebfm", "Memo: EBITDA margin after founder-role salary", lambda si, y: f"IFERROR({T_('ebf', si, y)}/{T_('rev', si, y)},0)", FMT_PCT)
    tr("capex", "Capex and deposits (Staged: recorded hybrid library A-ECO-129 deferred to Year 2 / T3)", lambda si, y: (f"{O(si, 'capex')}/{L}" if y == 1 else
                                                f"({P('A-ECO-226a' if y == 2 else 'A-ECO-226b', si)}+MAX(0,{T_('stn', si, y)}-{T_('stn', si, y - 1)})*{P('A-ECO-122', si)}+IF({T_('sat', si, y)}>0,{P('A-ECO-216', si)},0)"
                                                + (f"+{P('A-ECO-129', si)}" if (si in (4, 5, 6, 7, 8) and y == 2) else "") + f")/{L}"))
    tr("ncf", "Net cash flow (Y1 incl. instalment timing)", lambda si, y: (f"{onames[si]}!N{outs[onames[si]]['cum']}/{L}" if y == 1 else f"{T_('ebitda', si, y)}-{T_('capex', si, y)}"), bold=True)
    tr("cum", "Cumulative cash position", lambda si, y: f"{T_('ncf', si, 1)}" if y == 1 else f"{T_('cum', si, y - 1)}+{T_('ncf', si, y)}", bold=True)
    tr("peak", "Peak cash need to date (Y1 monthly peak; Y2-3 year-end)", lambda si, y: (f"{onames[si]}!O{outs[onames[si]]['peak']}/{L}" if y == 1 else
                                                                                    f"MAX({T_('peak', si, y - 1)},-MIN(0,{T_('cum', si, y)}))"), bold=True)

    sec3("SOM layers for market_sizing_model.xlsx (Year 3, ₹ lakh ex-GST)")
    tr("som_tri", "Tricity flagship (career tricity-origin + entry products)", lambda si, y: f"{T_('rtri', si, y)}+{T_('rsho', si, y)}")
    tr("som_reg", "Regional destination offline (+ satellite)", lambda si, y: f"{T_('rreg', si, y)}+{T_('rsat', si, y)}")
    tr("som_hyb", "Hybrid incremental", lambda si, y: f"{T_('rhyb', si, y)}")
    tr("som_cpd", "CPD (L4 + L5)", lambda si, y: f"{T_('rcpd', si, y)}")
    tr("som_onl", "Online", lambda si, y: f"{T_('ronl', si, y)}")
    tr("som_adj", "Adjacent (outside training market)", lambda si, y: f"{T_('radj', si, y)}")
    tr("lrn_tri", "SOM learners: tricity-origin career students (L2 + L3 new)", lambda si, y: f"{T_('carx', si, y)}*(1-{T_('oots', si, y)})", FMT_INT)
    tr("lrn_reg", "SOM learners: out-of-town career students (+ satellite)", lambda si, y: f"{T_('carx', si, y)}*{T_('oots', si, y)}+{T_('sat', si, y)}", FMT_INT)
    tr("lrn_hyb", "SOM learners: incremental destination/hybrid students", lambda si, y: f"{T_('destx', si, y)}", FMT_INT)
    sec3("Checks")
    tr("chk", "Layers reconcile to total revenue (should be 0)", lambda si, y: f"ROUND({T_('rev', si, y)}-SUM({ycol(si, y)}{T['som_tri']}:{ycol(si, y)}{T['som_adj']}),6)", FMT_2DP)

    # ---------------------------------------------------------------- BM unit economics (models A-F) + Ludhiana M4
    build_bm_sheet(wb, A, T, outs)

    # ---------------------------------------------------------------- Sensitivity: price response at step 2 (needs 3yr groups 5-8)
    section(wsn, s2row, "Price response at price step 2 (₹90k list at M16) - Years 2-3 of the planning case (3yr_Scenarios groups 5-8; ₹ lakh)", 12)
    header(wsn, s2row + 1, ["Case (3yr group)", "", "", "Y2 revenue", "Y3 revenue", "Y2 EBITDA", "Y3 EBITDA", "Y3 EBITDA vs no step 2", "Y3 career enrolments"], widths=None)
    s2cases = [(5, "Planning case: step 2 at M16, no conversion loss"), (6, "No price step 2 (stays at ₹75k list)"), (7, "Step 2 with career conversion -10% (A-ECO-228a)"),
               (8, "Step 2 with career conversion -20% (A-ECO-228b)")]
    for i, (si, lab) in enumerate(s2cases):
        r_ = s2row + 2 + i
        wsn.cell(row=r_, column=1, value=lab)
        for j, (key, y) in enumerate([("rev", 2), ("rev", 3), ("ebitda", 2), ("ebitda", 3)]):
            wsn.cell(row=r_, column=4 + j, value=f"='3yr_Scenarios'!{ycol(si, y)}{T[key]}").number_format = FMT_1DP
        wsn.cell(row=r_, column=8, value=f"=G{r_}-$G${s2row + 3}").number_format = FMT_1DP
        wsn.cell(row=r_, column=9, value=f"='3yr_Scenarios'!{ycol(si, 3)}{T['carx']}").number_format = FMT_INT
    r_ = s2row + 2 + len(s2cases)
    wsn.cell(row=r_, column=1, value="Conversion loss at step 2 at which the step adds no Year-3 EBITDA (linear between 0% and -20%)").font = BOLD
    wsn.cell(row=r_, column=7, value=f"=IFERROR(0.2*(G{s2row + 2}-G{s2row + 3})/(G{s2row + 2}-G{s2row + 5}),0)").number_format = FMT_PCT
    S2 = {"row0": s2row + 2, "be": r_}

    # ---------------------------------------------------------------- Payback / IRR on the founder's cash (Gate E, RT-10)
    wp = wb.create_sheet("Payback_IRR", 6)
    title(wp, "Payback and IRR on the founder's cash (₹) - Year 1 monthly from the outlook; Years 2-3 = 3yr_Scenarios net cash flow / 12; Years 4-5 held flat at Year 3 (no growth, no terminal value)",
          "Net cash = EBITDA + instalment timing - capex (before tax, GST timing and founder draw). 'After salary' deducts the founder-role market salary A-ECO-138 with wage escalation A-ECO-218. IRR is on the cash actually drawn, annualised from monthly flows.")
    PG = [(5, "Planning case (G1 M9)"), (4, "Upside (G1 M6)"), (9, "Base business only (no step 2, G2 layers not passed)")]
    sal = A.r("A-ECO-138", "base")
    wesc = A.r("A-ECO-218", "base")
    s0 = 22   # first data row of the monthly series
    hdr = ["Month #", "Year"]
    for si, lab in PG:
        hdr += [f"{lab}: net cash", "cumulative", "after salary: net cash", "cumulative (after salary)"]
    hdr += ["Helper: last month cumulative < 0 (pre / post salary, per case)"] + [""] * 5
    header(wp, s0 - 1, hdr, widths=[9, 6] + [15] * 12 + [10] * 6)
    PC = {}
    for gi, (si, lab) in enumerate(PG):
        c_net, c_cum, c_net2, c_cum2 = (CL(3 + gi * 4 + k) for k in range(4))
        h1, h2 = CL(15 + gi * 2), CL(16 + gi * 2)
        PC[si] = (c_net, c_cum, c_net2, c_cum2, h1, h2)
        for m in range(1, 61):
            r_ = s0 + m - 1
            y = (m - 1) // 12 + 1
            wp.cell(row=r_, column=1, value=m)
            wp.cell(row=r_, column=2, value=y)
            if y == 1:
                net = f"=INDEX({onames[si]}!$C${outs[onames[si]]['ncf']}:$N${outs[onames[si]]['ncf']},{m})"
            else:
                net = f"='3yr_Scenarios'!{ycol(si, min(y, 3))}{T['ncf']}*1E5/12"
            wp[f"{c_net}{r_}"] = net
            wp[f"{c_cum}{r_}"] = f"={c_net}{r_}" + (f"+{c_cum}{r_ - 1}" if m > 1 else "")
            wp[f"{c_net2}{r_}"] = f"={c_net}{r_}-{sal}*(1+{wesc})^({y}-1)"
            wp[f"{c_cum2}{r_}"] = f"={c_net2}{r_}" + (f"+{c_cum2}{r_ - 1}" if m > 1 else "")
            wp[f"{h1}{r_}"] = f"=IF({c_cum}{r_}<0,A{r_},0)"
            wp[f"{h2}{r_}"] = f"=IF({c_cum2}{r_}<0,A{r_},0)"
            for cc in (c_net, c_cum, c_net2, c_cum2):
                wp[f"{cc}{r_}"].number_format = FMT_INT
    e36, e60 = s0 + 35, s0 + 59
    header(wp, 5, ["Metric"] + [f"{lab}" + suff for _, lab in PG for suff in (" - before founder salary", " - after founder salary")], widths=None)
    wp.column_dimensions["A"].width = 58
    env = A.r("CA-03", "base")
    cont = A.r("A-ECO-167", "base")
    prow = [("Peak cash drawn (₹)", lambda cn, cu, hh: f"=-MIN(0,MIN({cu}{s0}:{cu}{e60}))", FMT_INT),
            ("Month of the cash low point", lambda cn, cu, hh: f"=MATCH(MIN({cu}{s0}:{cu}{e60}),{cu}{s0}:{cu}{e60},0)", FMT_GEN),
            ("Payback month (cumulative cash back to ≥ 0 and stays there)", lambda cn, cu, hh: f"=IF({cu}{e60}<0,\"beyond M60\",MAX({hh}{s0}:{hh}{e60})+1)", FMT_GEN),
            ("Cumulative cash at M36 (₹)", lambda cn, cu, hh: f"={cu}{e36}", FMT_INT),
            ("Cumulative cash at M60 (₹; Y4-Y5 flat at Y3)", lambda cn, cu, hh: f"={cu}{e60}", FMT_INT),
            ("IRR to M36, annualised (no terminal value)", lambda cn, cu, hh: f"=IFERROR((1+IRR({cn}{s0}:{cn}{e36},0.01))^12-1,\"n/m\")", FMT_PCT),
            ("IRR to M60, annualised (Y4-Y5 flat at Y3; no terminal value)", lambda cn, cu, hh: f"=IFERROR((1+IRR({cn}{s0}:{cn}{e60},0.01))^12-1,\"n/m\")", FMT_PCT),
            ("Headroom to the ₹30L envelope (CA-03) (₹)", lambda cn, cu, hh: f"={env}+MIN(0,MIN({cu}{s0}:{cu}{e60}))", FMT_INT),
            ("Headroom to ₹30L + ₹5L contingency (A-ECO-167) (₹)", lambda cn, cu, hh: f"={env}+{cont}+MIN(0,MIN({cu}{s0}:{cu}{e60}))", FMT_INT)]
    PB = {}
    for i, (lab, fn, fmt) in enumerate(prow):
        r_ = 6 + i
        wp.cell(row=r_, column=1, value=lab).font = BOLD
        PB[lab] = r_
        for gi, (si, _) in enumerate(PG):
            c_net, c_cum, c_net2, c_cum2, h1, h2 = PC[si]
            for k, (cn, cu, hh) in enumerate(((c_net, c_cum, h1), (c_net2, c_cum2, h2))):
                cell = wp.cell(row=r_, column=2 + gi * 2 + k, value=fn(cn, cu, hh))
                cell.number_format = fmt
                cell.fill = KEY_FILL
    note(wp, 6 + len(prow) + 1, "Read: the founder's cash at risk is the peak drawn, not the ₹30-35L envelope; IRR uses only the cash flows the plan produces (no sale value or terminal value), so it understates a business still growing at M36.")
    note(wp, 6 + len(prow) + 2, "Base business only = the planning case with price step 2 not taken and no G2/audience-gated layers (incremental Destination students, online short courses, adjacents, recorded library capex).")

    # ---------------------------------------------------------------- Dashboard
    title(dash, "PNA business forecast - dashboard (₹ lakh unless stated; ex-GST; illustrative, assumption-driven)",
          "PRIMARY VIEW = PLANNING CASE (Staged_G1M9: G1 at M9, move M10). Upside = G1 at M6. Downside (a) = T1 team at Conservative rates; (b) = Tranche 2 released on a false-positive G1. Bundles: Conservative = adverse rates + ₹10L plan; Base = base rates + ₹30L plan; Aggressive = favourable rates + ₹50L plan.")
    COLN = {"Outlook_Conservative": "Conservative", "Outlook_Base": "Base", "Outlook_Aggressive": "Aggressive", "Plan10L_BaseRates": "₹10L plan @ Base rates",
            "Plan50L_BaseRates": "₹50L plan @ Base rates", "Staged_G1M9": "PLANNING CASE: Staged, G1 M9 / move M10", "Staged_G1M6": "Upside: Staged, G1 M6 / move M7",
            "Staged_Cons": "Downside (a): T1 team at Cons. rates, no cut", "Staged_Cons_CutM5": "Downside (a): cut to ₹10L-plan base at M5",
            "Staged_Cons_CutM5_Deep": "Downside (a): KT-1a cut at M5 to the deep stop-loss state",
            "Staged_Cons_CutM10": "Downside (a): cut at M10 (G1 fails at M9 review)", "Staged_FalsePos": "Downside (b): false-positive G1 M9, exit M12",
            "Staged_FalsePos_M6": "Downside (b): false-positive G1 M6, exit M9", "Base_TwoStep": "Base + two-step price", "Conservative_TwoStep": "Conservative + two-step price",
            "Base_Founder40": "Base + founder ≤40% M12"}
    sheets = ["Outlook_Conservative", "Outlook_Base", "Outlook_Aggressive", "Plan10L_BaseRates", "Plan50L_BaseRates"] + [x[0] for x in STAGED_RUNS]
    header(dash, 4, ["Year-1 (Nov-26 to Oct-27)"] + [COLN[s] for s in sheets], widths=[62] + [15] * len(sheets))
    D = {}
    for i, (lab, fmt, sc) in enumerate(outs[PL]["kplist"]):
        r_ = 5 + i
        dash.cell(row=r_, column=1, value=lab)
        for j, sh in enumerate(sheets):
            ref = f"{sh}!B{outs[sh]['kpis'][lab]}"
            v = f"={ref}/1E5" if sc == 1e5 else f"={ref}"
            c = dash.cell(row=r_, column=2 + j, value=v)
            c.number_format = FMT_1DP if sc == 1e5 else (FMT_RS if sc == "rs" else fmt)
            if sh == PL:
                c.fill = KEY_FILL
                c.font = BOLD
        D[lab] = r_
    r_ = 5 + len(outs[PL]["kplist"]) + 1
    section(dash, r_, "Directional 3-year view (₹ lakh) - groups 6-9 are variants of the planning case", 7)
    r_ += 2
    three = [("Total revenue", "rev"), ("EBITDA", "ebitda"), ("EBITDA margin", "ebm"), ("Memo: EBITDA after founder-role salary", "ebf"), ("Career enrolments delivered", "carx"),
             ("Peak cash need to date", "peak"), ("Cumulative cash position", "cum")]
    hdr3 = ["Metric"]
    for si, sc in enumerate(GL, 1):
        for y in (1, 2, 3):
            hdr3.append(f"{sc} Y{y}")
    for j, h in enumerate(hdr3):
        c = dash.cell(row=r_ - 1, column=1 + j, value=h)
        c.fill = HDR_FILL
        c.font = HDR_FONT
        c.alignment = WRAP
    for i, (lab, key) in enumerate(three):
        dash.cell(row=r_ + i, column=1, value=lab)
        for si in range(1, NG + 1):
            for y in (1, 2, 3):
                c = dash.cell(row=r_ + i, column=2 + (si - 1) * 3 + (y - 1), value=f"='3yr_Scenarios'!{ycol(si, y)}{T[key]}")
                c.number_format = FMT_PCT if key == "ebm" else (FMT_INT if key == "carx" else FMT_1DP)
    D3 = r_
    for j in range(3 * NG):
        dash.column_dimensions[CL(2 + j)].width = max(dash.column_dimensions[CL(2 + j)].width or 0, 13)
    r_ += len(three) + 1
    # Year-3 bridge: planning case -> base business
    section(dash, r_, "Year 3 of the planning case: base business vs gated layers (₹ lakh; review RT-10)", 7)
    y5, y6, y9 = ycol(5, 3), ycol(6, 3), ycol(9, 3)
    bridge = [("Planning case Year-3 revenue (all gates passed, price step 2 at M16)", f"='3yr_Scenarios'!{y5}{T['rev']}", f"='3yr_Scenarios'!{y5}{T['ebitda']}"),
              ("less: price step 2 (₹75k -> ₹90k list) - planning case minus 'no step 2'", f"=-('3yr_Scenarios'!{y5}{T['rev']}-'3yr_Scenarios'!{y6}{T['rev']})", f"=-('3yr_Scenarios'!{y5}{T['ebitda']}-'3yr_Scenarios'!{y6}{T['ebitda']})"),
              ("less: incremental Destination students (G2)", f"=-'3yr_Scenarios'!{y6}{T['rhyb']}", None),
              ("less: online short courses (audience gate)", f"=-'3yr_Scenarios'!{y6}{T['ronl']}", None),
              ("less: adjacents (kit margin, booking desk, brand partnerships)", f"=-'3yr_Scenarios'!{y6}{T['radj']}", None),
              ("less: capacity / other interaction", f"='3yr_Scenarios'!{y9}{T['rev']}-'3yr_Scenarios'!{y6}{T['rev']}+'3yr_Scenarios'!{y6}{T['rhyb']}+'3yr_Scenarios'!{y6}{T['ronl']}+'3yr_Scenarios'!{y6}{T['radj']}", None),
              ("Base business Year 3 (no step 2, G2 layers not passed)", f"='3yr_Scenarios'!{y9}{T['rev']}", f"='3yr_Scenarios'!{y9}{T['ebitda']}"),
              ("Gated share of planning-case Year-3 revenue", f"=1-'3yr_Scenarios'!{y9}{T['rev']}/'3yr_Scenarios'!{y5}{T['rev']}", None)]
    header(dash, r_ + 1, ["Line", "Revenue Y3", "EBITDA Y3"], widths=None)
    BR = {}
    for i, (lab, fr, fe) in enumerate(bridge):
        rr_ = r_ + 2 + i
        dash.cell(row=rr_, column=1, value=lab).font = BOLD if i in (0, 6) else Font()
        c = dash.cell(row=rr_, column=2, value=fr)
        c.number_format = FMT_PCT if lab.startswith("Gated share") else FMT_1DP
        if fe:
            dash.cell(row=rr_, column=3, value=fe).number_format = FMT_1DP
        BR[lab] = rr_
    dash.cell(row=r_ + 2 + 6, column=4, value="EBITDA after founder salary:")
    dash.cell(row=r_ + 2 + 6, column=5, value=f"='3yr_Scenarios'!{y9}{T['ebf']}").number_format = FMT_1DP
    r_ += 2 + len(bridge) + 1
    # payback / IRR
    section(dash, r_, "Payback and IRR on the founder's cash (see Payback_IRR)", 7)
    header(dash, r_ + 1, ["Metric", "Planning: before salary", "Planning: after salary", "Upside: before", "Upside: after", "Base business: before", "Base business: after"], widths=None)
    PBD = {}
    for i, (lab, _, fmt) in enumerate(prow):
        rr_ = r_ + 2 + i
        dash.cell(row=rr_, column=1, value=lab)
        for k in range(6):
            c = dash.cell(row=rr_, column=2 + k, value=f"=Payback_IRR!{CL(2 + k)}{PB[lab]}")
            c.number_format = FMT_1DP if fmt == FMT_INT else fmt
            if fmt == FMT_INT:
                c.value = f"=Payback_IRR!{CL(2 + k)}{PB[lab]}/1E5"
        PBD[lab] = rr_
    r_ += 2 + len(prow) + 1
    section(dash, r_, "Sensitivity on the planning case (Year-1 EBITDA swing, ₹ lakh) - see Sensitivity sheet", 7)
    for i in range(nflex):
        dash.cell(row=r_ + 1 + i, column=1, value=f"=Sensitivity!A{6 + i}")
        dash.cell(row=r_ + 1 + i, column=2, value=f"=Sensitivity!F{6 + i}/1E5").number_format = FMT_1DP
        dash.cell(row=r_ + 1 + i, column=3, value=f"=Sensitivity!G{6 + i}")
        dash.cell(row=r_ + 1 + i, column=4, value=f"=Sensitivity!L{6 + i}")
    r_ += nflex + 2
    dash.cell(row=r_, column=1, value="Named stresses (Year-1 EBITDA change vs planning case, ₹ lakh)").font = BOLD
    for i, (nm, lab, _) in enumerate(STRESSES):
        dash.cell(row=r_ + 1 + i, column=1, value=lab)
        dash.cell(row=r_ + 1 + i, column=2, value=f"=Sensitivity!E{NS[nm]}/1E5").number_format = FMT_1DP

    # ---------------------------------------------------------------- Checks
    wk = wb.create_sheet("Checks")
    title(wk, "Integrity checks (TRUE = pass)")
    header(wk, 4, ["Check", "Result"], widths=[90, 12])
    ck = []
    for sh in sheets + ["Outlook_Selected"]:
        Rk = outs[sh]
        ck.append((f"{sh}: seat utilisation never above 100%", f"=MAX({sh}!C{Rk['util']}:{sh}!N{Rk['util']})<=1.0001"))
        ck.append((f"{sh}: revenue lines sum to total", f"=ABS(SUM({sh}!O{Rk['rl3']}:{sh}!O{Rk['rkit']})-{sh}!O{Rk['rev']})<1"))
        ck.append((f"{sh}: EBITDA = contribution - fixed", f"=ABS({sh}!O{Rk['ebitda']}-({sh}!O{Rk['cm']}-{sh}!O{Rk['fix']}))<1"))
    for si in range(1, NG + 1):
        for y in (1, 2, 3):
            ck.append((f"3yr {GL[si - 1]} Y{y}: SOM layers reconcile", f"=ABS('3yr_Scenarios'!{ycol(si, y)}{T['chk']})<0.001"))
    ck.append(("Selected outlook equals Base when selector = Base (and run options at defaults)", f"=IF(AND(Assumptions!$C$3=\"Base\",Assumptions!$D$5=0,Assumptions!$H$5=1,Assumptions!$J$5=1,Assumptions!$L$5=0,Assumptions!$N$5=99,Assumptions!$P$5=0),ABS(Outlook_Selected!O{outs['Outlook_Selected']['ebitda']}-Outlook_Base!O{outs['Outlook_Base']['ebitda']})<1,TRUE)"))
    ck.append(("Calibration: Base month-12 paid demand is budget-limited exactly at target (A-ECO-51)",
               f"=ABS(Outlook_Base!N{outs['Outlook_Base']['ach']}-{A.r('A-GRO-01', 'base')}*({A.r('A-GRO-03a', 'base')}+{A.r('A-GRO-03b', 'base')}+{A.r('A-GRO-03e', 'base')}))<0.01"))
    for si in range(1, NG + 1):
        ck.append((f"3yr {GL[si - 1]} Y1 EBITDA = {onames[si]} Year-1 EBITDA", f"=ABS('3yr_Scenarios'!{ycol(si, 1)}{T['ebitda']}*1E5-{onames[si]}!O{outs[onames[si]]['ebitda']})<1"))
    ck.append(("Planning-case paid media = marketing_channel_plan.md §3.2 B row (₹7.0L)", f"=ABS(Staged_G1M9!O{outs['Staged_G1M9']['med']}-700000)<1"))
    ck.append(("Upside (G1 M6) paid media = §3.2 'B upside' row (₹8.2L)", f"=ABS(Staged_G1M6!O{outs['Staged_G1M6']['med']}-820000)<1"))
    ck.append(("Planning case = Flex_* run options (tornado runs on the planning case)", f"=AND(Flex_fee_lo!Q3=Staged_G1M9!Q3,Flex_fee_lo!Q4=Staged_G1M9!Q4,Flex_fee_lo!S3=Staged_G1M9!S3,Flex_fee_lo!S4=Staged_G1M9!S4)"))
    ck.append(("Payback series Year 1 equals the planning-case outlook cash at M12", f"=ABS(Payback_IRR!{PC[5][1]}{s0 + 11}-Staged_G1M9!N{outs['Staged_G1M9']['cum']})<1"))
    ck.append(("Year-3 bridge closes (planning case - layers = base business)", f"=ABS(SUM(Dashboard!B{BR[bridge[0][0]]}:Dashboard!B{BR[bridge[5][0]]})-Dashboard!B{BR[bridge[6][0]]})<0.001"))
    for i, (lab, fml) in enumerate(ck):
        wk.cell(row=5 + i, column=1, value=lab)
        wk.cell(row=5 + i, column=2, value=fml).font = BOLD
    wk.cell(row=6 + len(ck), column=1, value="All checks pass").font = BOLD
    wk.cell(row=6 + len(ck), column=2, value=f"=AND(B5:B{4 + len(ck)})").font = BOLD

    # ---------------------------------------------------------------- README
    title(readme, "PNA business forecast - unit economics, 12-month outlook, 3-year scenarios, business-model economics, sensitivity, downside and payback",
          "Economics & Market Sizing agent, 2026-10-16 (Gate E revision). Build script: economics/build_scripts/build_business_forecast.py (run via run_all.py).")
    lines = [
        ("Status", "Illustrative, assumption-driven planning model. PNA's actual revenue, fees, costs and enrolments are NOT known; the baseline is CA-01 (<60 students, base 50) x assumed fees (CA-02)."),
        ("Primary view", "PLANNING CASE = Staged_G1M9 (Staged Plan, G1 at M9 = Jul 2027, move/T2/price step 1 at M10, two-step price, founder ≤40% at M12, Admissions & Operations Lead from M1, second trainer from M10, Destination pilot M10-M11, media per marketing_channel_plan.md §3.2 = ₹7.0L). Staged_G1M6 is the upside. The tornado (Sensitivity, Flex_*) runs on the planning case."),
        ("Downside", "Staged_Cons (T1 team at Conservative rates, G1 not passed; no cut / cut at M5 / cut at M10) and Staged_FalsePos (T2 released on a false-positive G1; demand x0.6 from G1+1; KT-5 price reversion; stop-loss exit with 3 months' rent notice + 1 month salaries; G1 M9 and G1 M6 timings)."),
        ("Scenarios", "Conservative = adverse rates + ₹10L plan; Base = base rates + ₹30L plan; Aggressive = favourable rates + ₹50L plan. Rates vs plan are typed in Assumptions column J; Plan10L_BaseRates and Plan50L_BaseRates isolate the envelope choice (BM stress test 7). A stop-loss cut switches the plan index to 1 (₹10L-plan cost base) month by month (row 'Plan index in force')."),
        ("Alignment", "Growth agent: ladder L1-L5, A-GRO-01..50, paid-media ramp and team lines (growth_marketing_strategy.md §10). BM agent: realised L3 fee A-BM-02 (₹65k/80k/1.0L), batch cap 12, trainer pay A-BM-04, founder path A-BM-10, pop-ups A-BM-06, gates G0-G3b."),
        ("Price", "Two-step path in Staged runs: today's fee CA-02 (kit included) until G1+1, then ₹75k list (A-ECO-160) x realisation, then ₹90k list (A-GRO-06) at A-ECO-106 (M16). Unstaged bundles use the single step at A-ECO-104."),
        ("Enrolment engine", "Career demand = seasonality x [today's organic/referral engine (CA-01) + new non-paid enrolments x SLA factor + MIN(paid-route target, budget x career share / effective paid CAC x SLA factor)], then limited by seat capacity. Effective CAC = funnel paid-route CAC x A-ECO-51 (2.42 at Base), a calibration so the Base ₹1.0L budget buys the Base paid target (6/month): the two workbooks agree by construction, not evidence."),
        ("GST", "18% GST on private non-recognised training (A-ECO-23, GST Council flyer). Base assumes quoted fees include GST (revenue = fee/1.18); Flex_gst_ontop shows charging it on top."),
        ("Cash", "Net cash flow = EBITDA + instalment timing (A-ECO-34) - capex/deposits. Excludes income tax, GST input/output timing and any founder draw. Peak cash need is compared with the plan envelope (CA-03). Payback_IRR extends the planning case to 60 months (Y4-Y5 flat at Y3)."),
        ("Sheets", "Dashboard ; Assumptions ; Unit_Economics ; Capacity ; 3yr_Scenarios (9 groups) ; Sensitivity ; Payback_IRR ; BM_Unit_Economics ; Outlook_* (x3 scenarios + Selected + 2 cross runs) ; Staged_* (planning case, upside, 5 downside runs) ; Base_TwoStep ; Conservative_TwoStep ; Base_Founder40 ; Flex_* (sensitivity re-runs on the planning case) ; Checks"),
        ("Run options", "Each outlook has run options in P3:U4 (Staged 0/1, G1 month (99 = not passed), price path, founder path, false-positive stress 0/1, stop-loss cut/exit month). Outlook_Selected reads them from Assumptions!D5:N5. Defaults reproduce the original bundles."),
    ]
    for i, (k, v) in enumerate(lines):
        readme.cell(row=4 + i, column=1, value=k).font = BOLD
        c = readme.cell(row=4 + i, column=2, value=v)
        c.alignment = WRAP
        readme.row_dimensions[4 + i].height = 48
    setw(readme, {"A": 16, "B": 130})

    wb.save(OUT)
    refs = dict(outs={k: {kk: vv for kk, vv in v.items() if kk not in ("kpis", "kplist")} for k, v in outs.items()},
                kpis={k: v["kpis"] for k, v in outs.items()}, T=T, U=U, D=D, D3=D3, PB=PB, PBD=PBD, BR=BR, S2=S2, NS=NS, GL=GL)
    return OUT, refs


def build_bm_sheet(wb, A, T, outs):
    """Business models A-F side by side (directional) + Ludhiana four-route comparison (BM M4)."""
    w = wb.create_sheet("BM_Unit_Economics", 5)
    title(w, "Unit economics by business model (directional, Base rates, at maturity) - ₹ unless stated",
          "Side-by-side with the same metric rows. Inputs are in this sheet's input block (blue) with IDs; models link to 3yr_Scenarios where they are part of the recommended plan.")
    b = lambda aid: A.r(aid, "base")
    g_ = f"(1+{b('A-ECO-23')}*{b('A-ECO-24')})"
    # local input block (IDs A-ECO-3xx) - placed on this sheet to keep model logic readable; registered in methodology doc
    inp = [
        ("A-ECO-301", "B1 owned regional centre: annual fixed cost (rent, lead trainer, trainer, counsellor, utilities, local brand, management)", 2910000, "₹/yr", "A-BM-13"),
        ("A-ECO-302", "B1 owned centre: capex + launch", 1650000, "₹", "A-BM-13 ₹13-20L"),
        ("A-ECO-303", "B1 owned centre: P1 students per year at maturity (Base)", 46, "students", "BM breakeven ~46"),
        ("A-ECO-304", "B2 partner-hosted satellite: students per year", 25, "students", "geographic_expansion §4.1"),
        ("A-ECO-305", "B3 franchise: royalty rate", 0.15, "%", "A-BM-08 15-20%"),
        ("A-ECO-306", "B3 franchise: franchisee revenue per unit per year", 4000000, "₹/yr", "Assumed: 46 P1 x ₹80k + short courses"),
        ("A-ECO-307", "B3 franchise: PNA support cost per unit per year", 400000, "₹/yr", "geographic_expansion §4.1(d) ₹3-5L"),
        ("A-ECO-308", "B3 franchise: brand/franchise fee per unit (one-off) and system build cost", 450000, "₹", "A-BM-08 ₹4.3-5.0L; system ₹5-10L"),
        ("A-ECO-309", "B3 franchise system build (manuals, audits, legal)", 750000, "₹", "geographic_expansion §4.1(d)"),
        ("A-ECO-310", "C digital stand-alone: buyers per year at maturity", 2000, "buyers", "Gate: ≥200/month organic (BM §6.3)"),
        ("A-ECO-311", "C digital: content + platform fixed cost per year", 600000, "₹/yr", "Production + LMS + live sessions"),
        ("A-ECO-312", "E marketplace: average order value (bridal + party mix)", 6000, "₹", "Bridal ₹15-25k; party ₹1.5-3k (S-CHD-12; A-CUS-02)"),
        ("A-ECO-313", "E marketplace: take rate", 0.20, "%", "UC 25-28%; Treatwell new-client only (S-INT-17/29)"),
        ("A-ECO-314", "E marketplace: fulfilment / QA / support / re-do cost per booking", 400, "₹", "Judgement; UC onboarding 22.8% of revenue (S-INT-11)"),
        ("A-ECO-315", "E marketplace: CAC per new customer", 2000, "₹", "Bridal CPL ₹300-800, low conversion"),
        ("A-ECO-316", "E marketplace: bookings per customer over 24 months (bridal ≈ once; leakage after first)", 1.4, "bookings", "BM: bridal once-in-a-lifetime; Treatwell repeat commission-free"),
        ("A-ECO-317", "E marketplace: platform tech + ops team + artist onboarding per year", 2400000, "₹/yr", "Tech ₹8L + 2 ops ₹7.2L + onboarding/QA ₹4L + marketing ops ₹4.8L"),
        ("A-ECO-318", "E marketplace: bookings per year (≈5% of tricity pro-MUA bridal bookings x2 for party)", 800, "bookings", "A-BM-11: 8.2k tricity bridal bookings"),
        ("A-ECO-319", "Discount rate for 5-year NPV", 0.15, "%", "Judgement for an owner-managed SME"),
        ("A-ECO-320", "Ludhiana: destination students that would travel to Chandigarh per year (N_dest)", 10, "students", "geographic_expansion §4.1 indifference rule"),
    ]
    header(w, 4, ["Input ID", "Description", "Value", "Unit", "Source"], widths=[12, 70, 14, 12, 50])
    I = {}
    for i, (aid, d, v, u, src) in enumerate(inp):
        r = 5 + i
        w.cell(row=r, column=1, value=aid).font = BOLD
        w.cell(row=r, column=2, value=d)
        c = w.cell(row=r, column=3, value=v)
        c.font = INPUT_FONT
        c.number_format = FMT_PCT if u == "%" else FMT_INT
        w.cell(row=r, column=4, value=u)
        w.cell(row=r, column=5, value=src + " [HYP]").font = NOTE_FONT
        I[aid] = f"$C${r}"
    r0 = 5 + len(inp) + 2
    cols = ["Metric", "A Flagship (Y3 Base, whole academy)", "B1 Owned regional centre (Ludhiana)", "B2 Partner-hosted satellite",
            "B3 Franchise / licence (per unit, PNA view)", "C Digital stand-alone", "D Destination / hybrid (incremental student)",
            "E Services marketplace (full)", "E-lite Alumni booking desk", "F1 Masterclasses (CPD)", "F2 Kits + brand partnership", "F3 Pro Circle"]
    header(w, r0, cols, widths=None)
    for j in range(len(cols)):
        w.column_dimensions[CL(1 + j)].width = 16 if j else 46
    w.column_dimensions["B"].width = 18
    base_y3 = lambda key: f"'3yr_Scenarios'!G{T[key]}"  # Base Y3 = column G (B-D Cons, E-G Base, H-J Aggr)
    metrics = ["Unit of sale", "Price / AOV incl. GST (₹)", "Net revenue per unit ex-GST (₹)", "Units per year at maturity", "Revenue per year (₹ lakh)",
               "Variable cost per unit (₹)", "Contribution per unit (₹)", "Contribution margin %", "Contribution per year (₹ lakh)",
               "Fixed cost per year attributable (₹ lakh)", "EBITDA per year (₹ lakh)", "Upfront investment (₹ lakh)", "Payback (years)",
               "CAC per customer (₹)", "LTV per customer, contribution (₹)", "LTV / CAC", "Break-even units per year", "Founder dependence", "Capital intensity", "Verdict (directional)"]
    M = {m: r0 + 1 + i for i, m in enumerate(metrics)}
    for m, r in M.items():
        w.cell(row=r, column=1, value=m).font = BOLD if m in ("EBITDA per year (₹ lakh)", "LTV / CAC", "Contribution per unit (₹)") else Font()
    l3net = f"{b('A-BM-02')}/{g_}"
    l3var = f"({b('A-BM-16')}+{b('A-ECO-48')}*({b('A-BM-04b')}+{b('A-BM-04c')})/{b('A-ECO-46')}/{b('A-ECO-47')}+{b('A-BM-02')}*({b('A-GRO-41')}+{b('A-GRO-35')}*{b('A-GRO-35b')}))"
    ecac = f"{b('A-ECO-FUN-01')}*{b('A-ECO-51')}"
    colv = {
        "B": ["Academy (all lines)", f"{base_y3('fl3')}", f"B{M['Price / AOV incl. GST (₹)']}/{g_}", f"{base_y3('carx')}", f"{base_y3('rev')}",
              f"IFERROR({base_y3('cvar')}*1E5/B{M['Units per year at maturity']},0)", f"IFERROR((B{M['Revenue per year (₹ lakh)']}-{base_y3('cvar')})*1E5/B{M['Units per year at maturity']},0)",
              f"IFERROR(({base_y3('rev')}-{base_y3('cvar')})/{base_y3('rev')},0)", f"{base_y3('rev')}-{base_y3('cvar')}",
              f"{base_y3('cost')}-{base_y3('cvar')}", f"{base_y3('ebitda')}", f"'3yr_Scenarios'!G{T['peak']}", f"IFERROR(B{M['Upfront investment (₹ lakh)']}/B{M['EBITDA per year (₹ lakh)']},\"n/m\")",
              f"{ecac}*({b('A-GRO-03a')}+{b('A-GRO-03b')}+{b('A-GRO-03e')})", "=FUNNEL_LTV", f"IFERROR(B{M['LTV per customer, contribution (₹)']}/B{M['CAC per customer (₹)']},0)",
              f"IFERROR(B{M['Fixed cost per year attributable (₹ lakh)']}*1E5/B{M['Contribution per unit (₹)']},0)", "High -> falling (A-BM-10)", "Low-medium", "Core: necessary"],
        "C": ["P1 student", b("A-BM-02"), f"{l3net}", I["A-ECO-303"], f"C{M['Units per year at maturity']}*C{M['Net revenue per unit ex-GST (₹)']}/1E5",
              f"{b('A-BM-16')}+{b('A-BM-02')}*({b('A-GRO-41')}+{b('A-GRO-35')}*{b('A-GRO-35b')})+{ecac}", f"C{M['Net revenue per unit ex-GST (₹)']}-C{M['Variable cost per unit (₹)']}",
              f"C{M['Contribution per unit (₹)']}/C{M['Net revenue per unit ex-GST (₹)']}", f"C{M['Contribution per unit (₹)']}*C{M['Units per year at maturity']}/1E5",
              f"{I['A-ECO-301']}/1E5", f"C{M['Contribution per year (₹ lakh)']}-C{M['Fixed cost per year attributable (₹ lakh)']}", f"{I['A-ECO-302']}/1E5",
              f"IF(C{M['EBITDA per year (₹ lakh)']}<=0,\"never at this volume\",C{M['Upfront investment (₹ lakh)']}/C{M['EBITDA per year (₹ lakh)']})",
              f"{ecac}", f"C{M['Contribution per unit (₹)']}+{ecac}", f"C{M['LTV per customer, contribution (₹)']}/C{M['CAC per customer (₹)']}",
              f"{I['A-ECO-301']}/C{M['Contribution per unit (₹)']}", "Medium (needs site lead)", "High", "Defer to G3a"],
        "D": ["P1 student", b("A-BM-02"), f"{l3net}*(1-{b('A-BM-19')})", I["A-ECO-304"], f"D{M['Units per year at maturity']}*D{M['Net revenue per unit ex-GST (₹)']}/1E5",
              f"{b('A-BM-16')}+{b('A-ECO-215')}+{b('A-BM-02')}*({b('A-GRO-41')}+{b('A-GRO-35')}*{b('A-GRO-35b')})+{b('A-BM-15')}", f"D{M['Net revenue per unit ex-GST (₹)']}-D{M['Variable cost per unit (₹)']}",
              f"D{M['Contribution per unit (₹)']}/D{M['Net revenue per unit ex-GST (₹)']}", f"D{M['Contribution per unit (₹)']}*D{M['Units per year at maturity']}/1E5",
              "1", f"D{M['Contribution per year (₹ lakh)']}-D{M['Fixed cost per year attributable (₹ lakh)']}", f"{b('A-ECO-216')}/1E5",
              f"IF(D{M['EBITDA per year (₹ lakh)']}<=0,\"never\",D{M['Upfront investment (₹ lakh)']}/D{M['EBITDA per year (₹ lakh)']})", b("A-BM-15"),
              f"D{M['Contribution per unit (₹)']}+{b('A-BM-15')}", f"D{M['LTV per customer, contribution (₹)']}/D{M['CAC per customer (₹)']}",
              f"D{M['Fixed cost per year attributable (₹ lakh)']}*1E5/D{M['Contribution per unit (₹)']}", "Medium", "Low", "Pilot after G3a"],
        "E": ["Franchise unit", f"{I['A-ECO-306']}", f"{I['A-ECO-306']}*{I['A-ECO-305']}", "3", f"E{M['Units per year at maturity']}*E{M['Net revenue per unit ex-GST (₹)']}/1E5",
              f"{I['A-ECO-307']}", f"E{M['Net revenue per unit ex-GST (₹)']}-E{M['Variable cost per unit (₹)']}", f"E{M['Contribution per unit (₹)']}/E{M['Net revenue per unit ex-GST (₹)']}",
              f"E{M['Contribution per unit (₹)']}*E{M['Units per year at maturity']}/1E5", "5", f"E{M['Contribution per year (₹ lakh)']}-E{M['Fixed cost per year attributable (₹ lakh)']}",
              f"({I['A-ECO-309']}-E{M['Units per year at maturity']}*{I['A-ECO-308']}*0.5)/1E5",
              f"IF(E{M['EBITDA per year (₹ lakh)']}<=0,\"never at 3 units\",E{M['Upfront investment (₹ lakh)']}/E{M['EBITDA per year (₹ lakh)']})", "0", "n/a", "n/a",
              f"IFERROR(E{M['Fixed cost per year attributable (₹ lakh)']}*1E5/E{M['Contribution per unit (₹)']},0)", "Low for PNA; brand dilution risk high", "Low (franchisee-funded)", "G3b only"],
        "F": ["Online buyer", b("A-ECO-209"), f"F{M['Price / AOV incl. GST (₹)']}/{g_}", I["A-ECO-310"], f"F{M['Units per year at maturity']}*F{M['Net revenue per unit ex-GST (₹)']}/1E5",
              f"F{M['Net revenue per unit ex-GST (₹)']}*{b('A-ECO-212')}+{b('A-ECO-210')}*0.5", f"F{M['Net revenue per unit ex-GST (₹)']}-F{M['Variable cost per unit (₹)']}",
              f"F{M['Contribution per unit (₹)']}/F{M['Net revenue per unit ex-GST (₹)']}", f"F{M['Contribution per unit (₹)']}*F{M['Units per year at maturity']}/1E5",
              f"{I['A-ECO-311']}/1E5", f"F{M['Contribution per year (₹ lakh)']}-F{M['Fixed cost per year attributable (₹ lakh)']}", "3",
              f"IF(F{M['EBITDA per year (₹ lakh)']}<=0,\"never\",F{M['Upfront investment (₹ lakh)']}/F{M['EBITDA per year (₹ lakh)']})", b("A-ECO-210"),
              f"F{M['Contribution per unit (₹)']}*1.3+{b('A-ECO-210')}*0.5", f"F{M['LTV per customer, contribution (₹)']}/F{M['CAC per customer (₹)']}",
              f"F{M['Fixed cost per year attributable (₹ lakh)']}*1E5/F{M['Contribution per unit (₹)']}", "Medium (founder content)", "Low", "Defer: audience gate"],
        "G": ["Destination student", b("A-BM-02"), f"{l3net}", f"{base_y3('destx')}", f"G{M['Units per year at maturity']}*G{M['Net revenue per unit ex-GST (₹)']}/1E5",
              f"{b('A-ECO-41')}+{b('A-ECO-225')}+{b('A-BM-02')}*({b('A-GRO-41')}+{b('A-GRO-35')}*{b('A-GRO-35b')})+{b('A-ECO-49')}*({b('A-BM-04b')}+{b('A-BM-04c')})/{b('A-ECO-46')}/{b('A-ECO-47')}+{b('A-BM-15')}",
              f"G{M['Net revenue per unit ex-GST (₹)']}-G{M['Variable cost per unit (₹)']}", f"G{M['Contribution per unit (₹)']}/G{M['Net revenue per unit ex-GST (₹)']}",
              f"G{M['Contribution per unit (₹)']}*G{M['Units per year at maturity']}/1E5", f"{b('A-ECO-127')}*12/1E5",
              f"G{M['Contribution per year (₹ lakh)']}-G{M['Fixed cost per year attributable (₹ lakh)']}", f"{b('A-ECO-129')}/1E5",
              f"IF(G{M['EBITDA per year (₹ lakh)']}<=0,\"never\",G{M['Upfront investment (₹ lakh)']}/G{M['EBITDA per year (₹ lakh)']})", b("A-BM-15"),
              f"G{M['Contribution per unit (₹)']}+{b('A-BM-15')}", f"G{M['LTV per customer, contribution (₹)']}/G{M['CAC per customer (₹)']}",
              f"G{M['Fixed cost per year attributable (₹ lakh)']}*1E5/G{M['Contribution per unit (₹)']}", "Medium", "Low (uses flagship seats)", "Adopt after G2"],
        "H": ["Booking", I["A-ECO-312"], f"H{M['Price / AOV incl. GST (₹)']}/{g_}*{I['A-ECO-313']}", I["A-ECO-318"], f"H{M['Units per year at maturity']}*H{M['Net revenue per unit ex-GST (₹)']}/1E5",
              f"{I['A-ECO-314']}+H{M['Price / AOV incl. GST (₹)']}*{b('A-GRO-41')}+{I['A-ECO-315']}/{I['A-ECO-316']}", f"H{M['Net revenue per unit ex-GST (₹)']}-H{M['Variable cost per unit (₹)']}",
              f"H{M['Contribution per unit (₹)']}/H{M['Net revenue per unit ex-GST (₹)']}", f"H{M['Contribution per unit (₹)']}*H{M['Units per year at maturity']}/1E5",
              f"{I['A-ECO-317']}/1E5", f"H{M['Contribution per year (₹ lakh)']}-H{M['Fixed cost per year attributable (₹ lakh)']}", "15",
              f"IF(H{M['EBITDA per year (₹ lakh)']}<=0,\"never\",H{M['Upfront investment (₹ lakh)']}/H{M['EBITDA per year (₹ lakh)']})", I["A-ECO-315"],
              f"{I['A-ECO-316']}*(H{M['Net revenue per unit ex-GST (₹)']}-{I['A-ECO-314']}-H{M['Price / AOV incl. GST (₹)']}*{b('A-GRO-41')})",
              f"H{M['LTV per customer, contribution (₹)']}/H{M['CAC per customer (₹)']}", f"IF(H{M['Contribution per unit (₹)']}<=0,\"no break-even\",H{M['Fixed cost per year attributable (₹ lakh)']}*1E5/H{M['Contribution per unit (₹)']})",
              "Low", "Very high (two-sided, density)", "Reject (H5)"],
        "I": ["Referred booking", b("A-BM-09c"), f"I{M['Price / AOV incl. GST (₹)']}/{g_}", f"{b('A-BM-09b')}", f"I{M['Units per year at maturity']}*I{M['Net revenue per unit ex-GST (₹)']}/1E5",
              "250", f"I{M['Net revenue per unit ex-GST (₹)']}-I{M['Variable cost per unit (₹)']}", f"I{M['Contribution per unit (₹)']}/I{M['Net revenue per unit ex-GST (₹)']}",
              f"I{M['Contribution per unit (₹)']}*I{M['Units per year at maturity']}/1E5", "0.5", f"I{M['Contribution per year (₹ lakh)']}-I{M['Fixed cost per year attributable (₹ lakh)']}", "0.2",
              f"IF(I{M['EBITDA per year (₹ lakh)']}<=0,\"never\",I{M['Upfront investment (₹ lakh)']}/I{M['EBITDA per year (₹ lakh)']})", "0", "n/a (studio enquiries)", "n/a",
              f"I{M['Fixed cost per year attributable (₹ lakh)']}*1E5/I{M['Contribution per unit (₹)']}", "Low", "Very low", "Adopt inside flagship"],
        "J": ["Masterclass seat", b("A-GRO-07"), f"J{M['Price / AOV incl. GST (₹)']}/{g_}", f"{base_y3('mc')}", f"J{M['Units per year at maturity']}*J{M['Net revenue per unit ex-GST (₹)']}/1E5",
              f"{b('A-ECO-42')}+J{M['Price / AOV incl. GST (₹)']}*{b('A-GRO-41')}+300", f"J{M['Net revenue per unit ex-GST (₹)']}-J{M['Variable cost per unit (₹)']}",
              f"J{M['Contribution per unit (₹)']}/J{M['Net revenue per unit ex-GST (₹)']}", f"J{M['Contribution per unit (₹)']}*J{M['Units per year at maturity']}/1E5", "0",
              f"J{M['Contribution per year (₹ lakh)']}-J{M['Fixed cost per year attributable (₹ lakh)']}", "0", "immediate", "300",
              f"J{M['Contribution per unit (₹)']}*(1+{b('A-GRO-29')})", f"J{M['LTV per customer, contribution (₹)']}/J{M['CAC per customer (₹)']}", "0",
              "High (founder-led ~19-25 days/yr)", "Very low", "Adopt (founder's future role)"],
        "K": ["Career student (kit) + sponsor", "20000", f"{b('A-ECO-227')}", f"{base_y3('carx')}*{base_y3('l3sh')}", f"K{M['Units per year at maturity']}*K{M['Net revenue per unit ex-GST (₹)']}/1E5+{b('A-ECO-213b')}/1E5",
              "0", f"K{M['Net revenue per unit ex-GST (₹)']}", "1", f"K{M['Revenue per year (₹ lakh)']}", "0", f"K{M['Contribution per year (₹ lakh)']}", "0", "immediate", "0", "n/a", "n/a", "0",
              "Low", "Very low", "Adopt; kits optional (trust)"],
        "L": ["Paid member-year", b("A-GRO-09"), f"L{M['Price / AOV incl. GST (₹)']}/{g_}", f"{base_y3('pcm')}", f"L{M['Units per year at maturity']}*L{M['Net revenue per unit ex-GST (₹)']}/1E5",
              f"{b('A-ECO-45')}+L{M['Price / AOV incl. GST (₹)']}*{b('A-GRO-41')}", f"L{M['Net revenue per unit ex-GST (₹)']}-L{M['Variable cost per unit (₹)']}",
              f"L{M['Contribution per unit (₹)']}/L{M['Net revenue per unit ex-GST (₹)']}", f"L{M['Contribution per unit (₹)']}*L{M['Units per year at maturity']}/1E5", "0.6",
              f"L{M['Contribution per year (₹ lakh)']}-L{M['Fixed cost per year attributable (₹ lakh)']}", "0", "immediate", "0", f"L{M['Contribution per unit (₹)']}*2", "n/a", f"L{M['Fixed cost per year attributable (₹ lakh)']}*1E5/L{M['Contribution per unit (₹)']}",
              "Medium", "Very low", "Pilot; gate ≥150 alumni"],
    }
    textual = {"Unit of sale", "Founder dependence", "Capital intensity", "Verdict (directional)"}
    textvals = {"immediate", "n/a", "n/a (studio enquiries)"}
    for colL, vals in colv.items():
        for m, v in zip(metrics, vals):
            r = M[m]
            if m in textual or v in textvals:
                w[f"{colL}{r}"] = v
                continue
            if v == "=FUNNEL_LTV":
                v = f"B{M['Contribution per unit (₹)']}"
            c = w[f"{colL}{r}"]
            c.value = "=" + v
            if m in ("Contribution margin %",):
                c.number_format = FMT_PCT
            elif m in ("LTV / CAC", "Payback (years)"):
                c.number_format = FMT_2DP
            elif "lakh" in m:
                c.number_format = FMT_1DP
            else:
                c.number_format = FMT_INT
    rN = r0 + len(metrics) + 2
    note(w, rN, "A uses Base Y3 from 3yr_Scenarios (whole academy; 'unit' = career student). Contribution per unit for A is (revenue - variable) / career students, so it includes CPD/online/adjacent lines.")
    note(w, rN + 1, "E marketplace: 20% take on a ₹6k AOV leaves ~₹1k per booking before CAC; with ~1.4 bookings per customer LTV/CAC is <1 - confirms H5 (reject).")

    # Ludhiana four-route comparison (BM M4)
    rL = rN + 3
    section(w, rL, "Ludhiana: four routes compared (BM spec M4; P1 at ₹80k realised) - contribution to PNA per year and 5-year NPV", 12)
    header(w, rL + 1, ["Metric", "(a) Destination to Chandigarh", "(b) Partner-hosted satellite", "(c) Owned centre", "(d) Franchise (1 unit)", "Note"], widths=None)
    nd = I["A-ECO-320"]
    dest_c = f"G{M['Contribution per unit (₹)']}"
    lu = [
        ("Students per year enrolled through this route", f"={nd}", f"=D{M['Units per year at maturity']}", f"=C{M['Units per year at maturity']}", f"=C{M['Units per year at maturity']}", "destination N_dest vs local-site volume"),
        ("Contribution per student to PNA (₹)", f"={dest_c}", f"=D{M['Contribution per unit (₹)']}", f"=C{M['Contribution per unit (₹)']}", f"=E{M['Net revenue per unit ex-GST (₹)']}/C{M['Units per year at maturity']}", "franchise = royalty per student"),
        ("Annual fixed cost to PNA (₹)", "=0", "=1E5", f"={I['A-ECO-301']}", f"={I['A-ECO-307']}", ""),
        ("Annual contribution after fixed (₹)", "=B{r1}*B{r2}-B{r3}", "=C{r1}*C{r2}-C{r3}", "=D{r1}*D{r2}-D{r3}", "=E{r1}*E{r2}-E{r3}", ""),
        ("Upfront capex to PNA (₹)", f"=0.5*{b('A-ECO-129')}", f"={b('A-ECO-216')}", f"={I['A-ECO-302']}", f"={I['A-ECO-309']}-{I['A-ECO-308']}", "destination shares hybrid content with flagship"),
        ("5-year NPV at A-ECO-319 (₹)", "=-B{r5}+B{r4}*(1-(1+{dr})^-5)/{dr}", "=-C{r5}+C{r4}*(1-(1+{dr})^-5)/{dr}", "=-D{r5}+D{r4}*(1-(1+{dr})^-5)/{dr}", "=-E{r5}+E{r4}*(1-(1+{dr})^-5)/{dr}", ""),
        ("Payback (years)", "=IFERROR(IF(B{r4}<=0,\"never\",B{r5}/B{r4}),0)", "=IFERROR(IF(C{r4}<=0,\"never\",C{r5}/C{r4}),0)", "=IFERROR(IF(D{r4}<=0,\"never\",D{r5}/D{r4}),0)", "=IFERROR(IF(E{r4}<=0,\"never\",E{r5}/E{r4}),0)", ""),
        ("Break-even students per year", "=0", "=C{r3}/C{r2}", "=D{r3}/D{r2}", "=E{r3}/E{r2}", "BM: owned ≈46"),
        ("Owned centre beats destination only if local enrolments exceed (fixed + N_dest x dest contribution) / owned contribution", "", "", "=(D{r3}+B{r1}*B{r2})/D{r2}", "", "BM indifference rule ≈46 + 0.9 x N_dest"),
        ("Partner satellite beats destination if it enrols more than (x N_dest)", "", "=(C{r3}+B{r1}*B{r2})/C{r2}/B{r1}", "", "", "BM: ≈1.7x"),
        ("Student all-in cost: fee + living/travel (₹, A-BM-12 mid)", f"={b('A-BM-02')}+22500", f"={b('A-BM-02')}+2500", f"={b('A-BM-02')}+2500", f"={b('A-BM-02')}+2500", "hybrid stay ₹17-28k; local commute ₹0-5k"),
    ]
    base_r = rL + 2
    for i, row in enumerate(lu):
        r = base_r + i
        w.cell(row=r, column=1, value=row[0])
        for j in range(4):
            v = row[1 + j]
            if v:
                v = v.replace("{r1}", str(base_r)).replace("{r2}", str(base_r + 1)).replace("{r3}", str(base_r + 2)).replace("{r4}", str(base_r + 3)) \
                    .replace("{r5}", str(base_r + 4)).replace("{dr}", I["A-ECO-319"])
                c = w.cell(row=r, column=2 + j, value=v)
                c.number_format = FMT_2DP if "beats" in row[0] or "Payback" in row[0] else FMT_INT
        w.cell(row=r, column=6, value=row[5]).font = NOTE_FONT
    # local-site lift sensitivity
    rs = base_r + len(lu) + 1
    w.cell(row=rs, column=1, value="Local-site enrolment lift vs destination (x N_dest) -> annual contribution after fixed (₹)").font = BOLD
    for j, lift in enumerate([1.0, 1.5, 2.0, 3.0, 4.6]):
        w.cell(row=rs + 1, column=2 + j, value=lift).number_format = '0.0"x"'
        w.cell(row=rs + 2, column=1, value="Partner-hosted satellite")
        w.cell(row=rs + 3, column=1, value="Owned centre")
        w.cell(row=rs + 4, column=1, value="Destination (reference)")
        col = CL(2 + j)
        w.cell(row=rs + 2, column=2 + j, value=f"={col}{rs + 1}*$B${base_r}*$C${base_r + 1}-$C${base_r + 2}").number_format = FMT_INT
        w.cell(row=rs + 3, column=2 + j, value=f"={col}{rs + 1}*$B${base_r}*$D${base_r + 1}-$D${base_r + 2}").number_format = FMT_INT
        w.cell(row=rs + 4, column=2 + j, value=f"=$B${base_r + 3}").number_format = FMT_INT
    return w


if __name__ == "__main__":
    out, refs = build()
    json.dump(refs, open(os.path.join(os.path.dirname(__file__), "_forecast_refs.json"), "w"), indent=1, default=str)
    print(out)
