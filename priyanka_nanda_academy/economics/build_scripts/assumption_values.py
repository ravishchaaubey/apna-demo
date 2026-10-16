"""Single source of assumption values shared by funnel_economics.xlsx and business_forecast.xlsx.

Each entry: ID -> (description, Conservative, Base, Aggressive, unit, source/rationale, tag, fmt-key)
Convention: Conservative = adverse unit prices/rates (high CPL, low conversion, high wages) AND the smaller
investment plan (₹10L); Aggressive = favourable rates AND the larger plan (₹50L). A-GRO values are mapped
from the Growth agent's Low/Base/High per its stated convention (for cost lines its 'High' = conservative).
"""
P, R, I, D1, D2, G = "pct", "rs", "int", "1dp", "2dp", "gen"

V = {}


def a(aid, desc, c, b, g, unit, src, tag, fmt=G):
    V[aid] = (desc, c, b, g, unit, src, tag, fmt)


# ---------------------------------------------------------------- canonical / baseline
a("CA-01", "PNA paying students per year today (all courses)", 30, 50, 60, "students/yr", "Founder: 'under 60' (2026-10-16)", "[FOUNDER]", I)
a("CA-02", "Current flagship professional course fee (incl. kit)", 40000, 60000, 75000, "₹", "Not supplied; local diploma band ₹35-75k (S-LC §6)", "[HYP]", R)
a("CA-03", "Growth investment envelope, 12 months", 1000000, 3000000, 5000000, "₹", "Founder: moderate ₹10-50L", "[FOUNDER]", R)
a("A-ECO-101", "Career (L2/L3-type) share of today's students", 0.6, 0.6, 0.6, "%", "Assumed mix; founder data pull (V1) to replace", "[HYP]", P)
a("A-ECO-102", "Average fee of today's short courses / masterclasses", 6000, 8000, 10000, "₹", "Local short-course band ₹6.5-25k (S-LC §6)", "[HYP]", R)
a("A-ECO-103", "Pro kit cost borne by PNA while fee includes kit (pre price-step)", 15000, 12000, 10000, "₹/student", "Growth agent: optional kit ₹18-25k at near cost; basic included kit assumed cheaper", "[HYP]", R)
a("A-ECO-23", "GST rate on PNA training (private, non-recognised; SAC 9992)", 0.18, 0.18, 0.18, "%",
  "GST Council education flyer: private/unrecognised coaching not exempt (https://www.gstcouncil.gov.in/sites/default/files/e-version-gst-flyers/GST_Education_Services.pdf, accessed 2026-10-16); AAR Kerala 2022 -> 18% under 9992", "[FACT] rule / [HYP] PNA", P)
a("A-ECO-24", "Fees quoted GST-inclusive? (1 = PNA absorbs GST from list fee; 0 = GST charged on top)", 1, 1, 1, "switch",
  "Consumer academies mostly quote one number; DBA quotes ex-GST, Pearl incl. GST (S-NC-26, S-IND-23). Sensitivity flips it", "[HYP]", G)

# ---------------------------------------------------------------- prices (Growth agent ladder)
a("A-GRO-04", "L1 Career Taster ticket", 999, 999, 999, "₹", "A-GRO-04 base (range ₹499-1,999); credited on enrolment", "[HYP]", R)
a("A-GRO-05", "L2 Foundation fee (4 weeks, ~80 h)", 30000, 39900, 45000, "₹", "A-GRO-05 (Aggressive = midpoint of Growth base/high to avoid stacking upsides)", "[HYP]", R)
a("A-GRO-06", "L3 Professional Bridal Programme list tuition (after proof gate; kit optional)", 75000, 90000, 120000, "₹", "A-GRO-06", "[HYP]", R)
a("A-BM-02", "L3 realised fee after discounts/credits (after proof gate)", 65000, 80000, 100000, "₹", "A-BM-02 (list ₹90k-1.25L)", "[HYP]", R)
a("A-GRO-07", "L4 masterclass average ticket", 5000, 10000, 14000, "₹", "A-GRO-07 (Aggressive = midpoint of base ₹10k / high ₹18k)", "[HYP]", R)
a("A-GRO-08", "L1-S5 self-makeup workshop price", 3000, 4999, 6500, "₹", "A-GRO-08 (Aggressive = midpoint)", "[HYP]", R)
a("A-GRO-09", "L5 Pro Circle membership", 4999, 9999, 12499, "₹/yr", "A-GRO-09 (Aggressive = midpoint); free year 1 for L3 graduates", "[HYP]", R)
a("A-ECO-17", "Hybrid Pro (online pre-work + 5-6 wk intensive) realised fee, at L3 parity", 65000, 80000, 100000, "₹", "Growth/BM: hybrid at L3 price parity; = A-BM-02", "[HYP]", R)

# ---------------------------------------------------------------- funnel (A-GRO)
a("A-GRO-01", "Career enrolments (L2+L3) per month, steady state (months 7-12)", 6, 10, 15, "enrol/mo", "A-GRO-01", "[HYP]", D1)
a("A-GRO-02", "Pro (L3) share of career enrolments", 0.5, 0.6, 0.7, "%", "A-GRO-02", "[HYP]", P)
a("A-GRO-03a", "Route mix: Meta CTWA", 0.30, 0.30, 0.30, "%", "A-GRO-03", "[HYP]", P)
a("A-GRO-03b", "Route mix: Paid Search", 0.20, 0.20, 0.20, "%", "A-GRO-03", "[HYP]", P)
a("A-GRO-03c", "Route mix: Organic (IG/site/GBP/SEO)", 0.20, 0.20, 0.20, "%", "A-GRO-03", "[HYP]", P)
a("A-GRO-03d", "Route mix: Referral / alumni / walk-in", 0.20, 0.20, 0.20, "%", "A-GRO-03", "[HYP]", P)
a("A-GRO-03e", "Route mix: Paid Career Taster", 0.10, 0.10, 0.10, "%", "A-GRO-03", "[HYP]", P)
a("A-GRO-10", "Meta CTWA cost per lead, tricity", 600, 300, 150, "₹/lead", "A-GRO-10 (High=conservative)", "[HYP]", R)
a("A-GRO-11", "Meta CTWA cost per lead, regional tier-2", 500, 250, 120, "₹/lead", "A-GRO-11", "[HYP]", R)
a("A-GRO-12", "Google Search cost per lead", 800, 500, 300, "₹/lead", "A-GRO-12", "[HYP]", R)
a("A-GRO-15", "Cost per Taster ticket sold", 700, 400, 200, "₹/ticket", "A-GRO-15", "[HYP]", R)
a("A-GRO-16", "Cost per masterclass lead (paid)", 300, 150, 50, "₹/lead", "A-GRO-16", "[HYP]", R)
a("A-GRO-17", "Cost per self-makeup lead (paid)", 400, 200, 100, "₹/lead", "A-GRO-17", "[HYP]", R)
a("A-GRO-18b-MC", "Paid share of masterclass leads", 0.7, 0.5, 0.3, "%", "A-GRO-18b (more organic = cheaper)", "[HYP]", P)
a("A-GRO-18b-SM", "Paid share of self-makeup leads", 0.8, 0.6, 0.4, "%", "A-GRO-18b", "[HYP]", P)
for rid, name, rates in [("A-GRO-18", "Meta CTWA", [(0.35, 0.40, 0.45), (0.45, 0.55, 0.65), (0.25, 0.30, 0.35), (0.75, 0.80, 0.85)]),
                         ("A-GRO-19", "Paid Search", [(0.40, 0.45, 0.50), (0.50, 0.60, 0.65), (0.28, 0.32, 0.35), (0.75, 0.80, 0.85)]),
                         ("A-GRO-20", "Organic", [(0.30, 0.38, 0.45), (0.45, 0.55, 0.65), (0.25, 0.30, 0.35), (0.75, 0.80, 0.85)]),
                         ("A-GRO-21", "Referral/walk-in", [(0.60, 0.70, 0.80), (0.70, 0.75, 0.80), (0.50, 0.55, 0.60), (0.80, 0.87, 0.92)])]:
    for k, stage in enumerate(["Lead->QL", "QL->Counselled", "Counselled->Applied", "Applied->Enrolled"]):
        c, b, g = rates[k]
        a(f"{rid}{'abcd'[k]}", f"{name}: {stage}", c, b, g, "%", rid + " scenario set", "[HYP]", P)
a("A-GRO-22a", "Taster: ticket -> attend", 0.75, 0.82, 0.90, "%", "A-GRO-22", "[HYP]", P)
a("A-GRO-22b", "Taster: attendee -> counselled", 0.50, 0.65, 0.80, "%", "A-GRO-22", "[HYP]", P)
a("A-GRO-22c", "Taster: counselled -> enrolled (<=60 days)", 0.16, 0.20, 0.25, "%", "A-GRO-22", "[HYP]", P)
a("A-GRO-24", "Lead->QL multiplier if speed-to-lead SLA NOT met (median >1 h)", 0.50, 0.67, 0.77, "x", "A-GRO-24 (inverse of A-CUS-16)", "[HYP]", D2)
a("A-GRO-25", "Founder-touch multiplier on counselled->applied (premium lost when team-led)", 1.5, 1.25, 1.0, "x", "A-GRO-25 / A-CUS-30 (larger premium = more conversion lost as founder steps back)", "[HYP]", D2)
a("A-GRO-26a", "Online parents' session: registrant -> attendee", 0.25, 0.35, 0.45, "%", "A-GRO-26", "[HYP]", P)
a("A-GRO-26b", "Online parents' session: attendee -> counselling booked", 0.20, 0.30, 0.40, "%", "A-GRO-26", "[HYP]", P)
a("A-GRO-27", "Masterclass lead -> purchase", 0.15, 0.25, 0.35, "%", "A-GRO-27", "[HYP]", P)
a("A-GRO-28", "Self-makeup lead -> booking", 0.10, 0.17, 0.25, "%", "A-GRO-28", "[HYP]", P)
a("A-GRO-29", "Masterclass repeat purchase per year (S3/alumni)", 0.25, 0.30, 0.40, "%", "A-GRO-29", "[HYP]", P)
a("A-GRO-30", "Self-makeup -> career upgrade", 0.01, 0.03, 0.05, "%", "A-GRO-30", "[HYP]", P)
a("A-GRO-31", "Career completion", 0.85, 0.90, 0.95, "%", "A-GRO-31", "[HYP]", P)
a("A-GRO-33", "Referral leads per alumnus per year", 0.2, 0.4, 0.6, "leads", "A-GRO-33", "[HYP]", D1)
a("A-GRO-34", "Referral reward per enrolled referee", 5000, 3000, 2000, "₹", "A-GRO-34 (High=conservative)", "[HYP]", R)
a("A-GRO-35", "EMI uptake (L3)", 0.50, 0.35, 0.20, "%", "A-GRO-35 (more EMI = more subvention)", "[HYP]", P)
a("A-GRO-35b", "No-cost EMI subvention borne by PNA", 0.07, 0.05, 0.03, "%", "A-GRO-35b", "[HYP]", P)
a("A-GRO-36", "Pro Circle paid uptake: graduates after free year", 0.20, 0.30, 0.45, "%", "A-GRO-36", "[HYP]", P)
a("A-GRO-36b", "Pro Circle paid uptake: S3 masterclass buyers", 0.05, 0.10, 0.20, "%", "A-GRO-36", "[HYP]", P)
a("A-GRO-37", "Out-of-town share of career enrolments", 0.15, 0.25, 0.35, "%", "A-GRO-37 / A-CHD-04", "[HYP]", P)
a("A-GRO-38", "Counsellor capacity (conversations/day; 24 working days)", 25, 30, 40, "conv/day", "A-GRO-38", "[HYP]", I)
a("A-GRO-41", "Payment gateway fee", 0.024, 0.020, 0.018, "%", "A-GRO-41 (Razorpay 2% + GST, claim)", "[CLAIM]", P)
a("A-GRO-43", "Organic career leads per month, months 7-12 (Growth agent check value)", 25, 40, 60, "leads/mo", "A-GRO-43 (model derives its own)", "[HYP]", I)
a("A-GRO-44", "Referral + walk-in career leads per month, months 7-12 (check value)", 5, 8, 12, "leads/mo", "A-GRO-44", "[HYP]", I)
a("A-ECO-30", "Webinar / pop-up promotion cost per registrant", 150, 100, 60, "₹/registrant", "Regional CTWA CPL ₹120-500 (A-GRO-11) x ~40% registration", "[HYP]", R)
a("A-ECO-31", "Online parents' info sessions per month (registrants per session 30)", 1, 1, 1, "sessions/mo", "Growth agent §8.1: monthly session, 30 registrants (A-GRO §10.3)", "[HYP]", D1)
a("A-ECO-32", "Registrants per online session", 30, 30, 40, "registrants", "A-GRO §10.3", "[HYP]", I)
a("A-BM-06a", "Pop-up discovery workshop: paid attendees per event", 25, 32, 40, "attendees", "A-BM-06 (25-40)", "[HYP]", I)
a("A-BM-06b", "Pop-up ticket price", 999, 1499, 1499, "₹", "A-BM-06 (₹999-1,999; breakeven ~36 at ₹1,499)", "[HYP]", R)
a("A-BM-06c", "Pop-up cost per event-day (venue, travel, models, ads, staff)", 60000, 52000, 45000, "₹/event", "A-BM-06 ₹45-60k", "[HYP]", R)
a("A-BM-06d", "Pop-up attendee -> L3/L2 enrolment within 60 days", 0.08, 0.11, 0.15, "%", "A-BM-06 8-15%; A-CUS-19", "[HYP]", P)
a("A-ECO-33", "Pop-up events per month at steady state (regional engine; G2)", 0.0, 0.5, 1.0, "events/mo", "BM §6.2: pilots ≤₹2L before G2; circuit after G2", "[HYP]", D2)
a("A-ECO-34", "Payment months for career fees (token + instalments / NBFC)", 3, 2, 1, "months", "Token + 2 instalments; NBFC pays upfront when EMI used", "[HYP]", I)
a("A-ECO-35", "Masterclasses bought per career graduate within 24 months", 0.3, 0.5, 0.8, "purchases", "A-GRO-29 30%/yr repeat applied to alumni", "[HYP]", D1)
a("A-ECO-36", "L2 Foundation -> L3 upgrade share (fee credited)", 0.25, 0.30, 0.40, "%", "Growth ladder: L2 fee credited to L3 within 6 months", "[HYP]", P)
a("A-ECO-37", "Optional kit uptake x margin (post price-step, near-cost kit ₹20k)", 0.6 * 20000 * 0.05, 0.6 * 20000 * 0.08, 0.7 * 20000 * 0.10, "₹/L3 student", "Growth: kit optional at near cost, itemised MRP", "[HYP]", R)

# ---------------------------------------------------------------- delivery costs
a("A-BM-16", "L3 consumables / models per student (excl. kit)", 7000, 6000, 5000, "₹/student", "A-BM-16 ₹5-7k", "[HYP]", R)
a("A-ECO-40", "L2 consumables per student", 2500, 2000, 1500, "₹/student", "1/3 of L3 duration", "[HYP]", R)
a("A-ECO-41", "Hybrid: online delivery (LMS, live Q&A) + campus consumables per student", 9000, 7500, 6000, "₹/student", "BM D-destination: shorter campus stay", "[HYP]", R)
a("A-ECO-42", "L4 masterclass consumables / models per seat", 1200, 1000, 800, "₹/seat", "Judgement", "[HYP]", R)
a("A-ECO-43", "L1-S5 self-makeup cost per seat (own products used)", 500, 400, 300, "₹/seat", "Judgement", "[HYP]", R)
a("A-ECO-44", "Taster delivery cost per ticket (trainer time share + products)", 300, 250, 200, "₹/ticket", "Judgement", "[HYP]", R)
a("A-ECO-45", "Pro Circle cost to serve per paid member-year", 2500, 2000, 1500, "₹/member", "Monthly online session + quarterly practice day", "[HYP]", R)
a("A-BM-04a", "Lead trainer salary", 75000, 60000, 55000, "₹/mo", "A-BM-04 ₹50-80k", "[HYP]", R)
a("A-BM-04b", "Trainer salary", 45000, 38000, 32000, "₹/mo", "A-BM-04 ₹30-45k", "[HYP]", R)
a("A-BM-04c", "Assistant salary", 20000, 18000, 16000, "₹/mo", "A-BM-04 ₹15-20k", "[HYP]", R)
a("A-ECO-46", "Batch slots one trainer FTE can lead (morning + afternoon)", 2, 2, 2, "slots", "Judgement", "[HYP]", I)
a("A-ECO-47", "Average cohort fill (students per L3/L2 batch; cap 12, A-BM-01)", 8, 10, 11, "students", "A-BM-01 cap 12", "[HYP]", D1)
a("A-ECO-48", "L3 seat-months per student (12-week programme)", 3, 3, 3, "seat-months", "A-BM-03", "[EST]", D1)
a("A-ECO-49", "Destination/hybrid seat-months per student (4-wk online pre-work + 5-6-wk full-day intensive = Growth Fast-track)", 2.5, 2.5, 2.5, "seat-months", "A-BM-03; ~1.2 months x 2 slots", "[EST]", D1)

# ---------------------------------------------------------------- timing switches used by funnel + forecast
a("A-ECO-104", "Month the L3 price steps from CA-02 to A-GRO-06/A-BM-02 (proof gate: outcomes report + >=30 reviews)", 10, 7, 5, "month #",
  "Growth agent §6: hold current fee for next two batches (~6 months); Conservative clears the gate late (M10)", "[HYP]", I)
a("A-ECO-105", "Month from which the <5-min speed-to-lead SLA is met (counsellor + CRM live)", 4, 3, 2, "month #", "BM gate G0 by M3", "[HYP]", I)

# ---------------------------------------------------------------- Growth agent 12-month budget lines (growth_marketing_strategy.md §10)
a("A-GRO-42", "Martech stack run-rate (BSP + CRM + telephony + tools)", 8000, 18000, 30000, "₹/mo", "A-GRO-42 as used in Growth §10 budget", "[EST]", R)
a("A-GRO-45", "Admissions counsellor (FTE, incl. incentive)", 20000, 25000, 25000, "₹/mo", "Growth §10 budget usage (A-GRO-45 range ₹20-32k)", "[EST]", R)
a("A-GRO-46", "Marketing/content team (B: exec ₹35k; A: manager ₹45k + creator ₹30k)", 0, 35000, 75000, "₹/mo", "Growth §10", "[EST]", R)
a("A-GRO-47", "Freelance shooter/editor retainer", 12000, 20000, 25000, "₹/mo", "Growth §10", "[EST]", R)
a("A-GRO-48", "Performance-marketing freelancer/agency", 0, 20000, 35000, "₹/mo", "Growth §10", "[EST]", R)
a("A-GRO-49", "Website rebuild (one-off)", 50000, 120000, 250000, "₹", "Growth §10", "[EST]", R)
a("A-GRO-50", "SEO content freelancer", 0, 15000, 25000, "₹/mo", "Growth §10", "[EST]", R)
