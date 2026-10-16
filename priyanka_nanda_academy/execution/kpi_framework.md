# KPI Framework: North Star, Supporting KPIs, Dashboard and Review Rhythm

**Client:** Priyanka Nanda Makeup Academy (PNA), Chandigarh · **Workstream:** Operations / Roadmap · **Prepared:** 2026-10-16 · **Agent:** Operations / Roadmap Agent (Opus)
**Companion files:** `execution/first_90_days.md` · `execution/twelve_month_roadmap.md`.
**Governing strategy:** `strategy/recommended_strategy.md` (Gate D): gates G0–G3b, spend gates SG1–SG5 and kill/pivot triggers KT-1…KT-10 (§7) are the decision rules this framework feeds.
**Targets come from:** `economics/business_forecast.xlsx` sheet **`Staged_G1M6`** (Staged Plan, planning case: G1 at M6, move M7; `economics/assumptions_and_methodology.md` §1A), with `Staged_G1M9` (late case), `Outlook_*` and `economics/funnel_economics.xlsx` (`Funnel_Base`, `Summary`) for rates. Funnel rates and gate thresholds come from `strategy/admissions_funnel.md` §4 and §9, `strategy/growth_marketing_strategy.md` §9 and `execution/technology_and_crm_requirements.md` §5 and §9.

**Tags:** [FACT] sourced · [CLAIM] first-party or unverified · [EST] our estimate (model cell or arithmetic shown) · [HYP] to validate · [REC] recommendation.

**How to read this framework**
- **Quarters follow the model year:** Q1 Nov–Jan (M1–M3), Q2 Feb–Apr (M4–M6), Q3 May–Jul (M7–M9), Q4 Aug–Oct (M10–M12).
- **"Plan" means the planning case `Staged_G1M6`.** If G1 is decided at M9, switch the Q3 targets to the late case (§3).
- **Every rate target is a prior [HYP]** from general education or vendor benchmarks, not PNA data. After 6–8 weeks of CRM data (from about mid-January) the Growth Lead re-bases the funnel targets on actuals, and the founder approves the change at the monthly review (`admissions_funnel.md` data caveat).
- **RAG thresholds** come from a gate or kill trigger wherever one exists; otherwise they are marked [REC].
- All ₹ figures are ex-GST.

---

## 0. Summary

1. **North star (Year 1): career enrolments a month (new L2 + L3 students).** It is the economic hinge (break-even is 6.5 a month at the M12 cost base on the step-1 fee) and the volume every gate, hire and space decision depends on. Plan: 8.0 / 17.3 / 33.8 / 30.3 a quarter, **89 in Year 1** [EST, `Staged_G1M6`].
2. **Four guardrails** stop growth that is not worth having: **quality** (completion ≥85%, NPS ≥50), **acquisition efficiency** (media CAC per paid career enrolment ≤₹9k), **founder independence** (share of contact hours on the ≤50% M6 / ≤40% M12 path, with trainer parity) and **outcomes** (% of graduates with a paid booking within 90 days). The outcomes measure becomes the **Year-2 north star** once the January baseline exists.
3. **Five KPI families, 63 measures** (§2): funnel (FUN), delivery (DEL), outcomes (OUT), finance (FIN) and founder dependency (FDR). Each has a definition, formula, data source, owner, cadence, quarterly target and RAG thresholds.
4. **One weekly one-page dashboard** (§5) refreshed every Monday at 09:00 from the CRM, WhatsApp BSP, ad platforms, GA4, GBP, the timetable and accounts. **One 90-minute monthly business review** (§6). **Gate packs** for G0, the SG review, G1 and the Year-1 review (§7).
5. **Where the plan already sits in amber [EST, `Dashboard`]:** media CAC per paid career enrolment ₹10.6k in M7–M12 (green ≤₹9k) and fully loaded acquisition at 49% of career revenue (Year-1 threshold ≤40%). These are the first numbers to improve with real data.

---

## 1. North star and guardrails

| Element | Measure | Plan (Q1 / Q2 / Q3 / Q4) | Why it matters | Gate link |
|---|---|---|---|---|
| **North star** | **Career enrolments a month** (new L2 + L3 students; upgrades excluded) | 2.7 / 5.8 / 11.3 / 10.1 a month (8.0 / 17.3 / 33.8 / 30.3 a quarter) [EST, row 33] | Drives revenue, trainer load, seats and the break-even (6.5 a month at the M12 cost base, `Dashboard`) | G1 ("2 cohorts ≥75% full"); FIN-02 |
| Guardrail: quality | Completion ≥85% and NPS ≥50 per cohort | From the first completed cohort (Mar 2027) | Growth bought with weak delivery destroys the proof flywheel | SG5; G1 |
| Guardrail: efficiency | Media CAC per paid career enrolment ≤₹9k | Test level to G1; plan ₹10.6k in M7–M12 (amber) | Above ₹12k, LTV/CAC falls to about 3 at today's fee (methodology §3 #4) | SG4 |
| Guardrail: independence | Founder share of contact hours on the Gate D path, with trainer-led satisfaction within 0.3/5 and team-led conversion ≥75% of founder-led | 75% / 50% / 45% / 40% at quarter-end (row 11) | The founder's goal (CA-04) and the price step both depend on trainers matching her | G1; KT-3 |
| Guardrail: outcomes | % of graduates with a paid booking ≤90 days after completion | Baseline in the 31 Jan Outcomes Report; update in Sep | "PNA" must come to mean "graduates who get booked" (positioning §4.3) | G1 (baseline); G2 (proof gate 2) |

**Year-2 north star [REC]:** booked graduates a quarter (completers × % with a paid booking ≤90 days), once two reports exist.

---

## 2. KPI dictionary

Columns: **Target** is the plan by quarter (Q1 / Q2 / Q3 / Q4) unless one value applies to all. **G / A / R** = green / amber / red. Owners: **GL** Growth Lead (Academy Manager from Nov 2027) · **C** Admissions Counsellor · **PM** performance freelancer · **LT** Lead Trainer · **CE** Content Executive · **F** founder · **AC** accounts / chartered accountant.

### 2.1 Funnel (FUN)

Stage definitions follow `admissions_funnel.md` §4: Lead (identifiable contact with consent and a source tag) → Qualified lead (QL: named course, age ≥17, start ≤90 days, feasible location/format, fee shared and not rejected) → Counselled (≥10-minute call/video, campus visit, or taster/info session + 1:1) → Applied (form + ₹5,000 token) → Enrolled (first instalment/full fee/EMI approved; batch assigned). Conversion is measured on **lead-created-week cohorts**, lagged 60–90 days for enrolment.

| ID | KPI | Definition / formula | Data source | Owner | Cadence | Target | G / A / R | Gate / trigger | Trace |
|---|---|---|---|---|---|---|---|---|---|
| FUN-01 | Career leads | Leads with interest in L2/L3 created in the period (first touch) | CRM | GL | Weekly | ≈54 / 107 / 143 / 143 a month [EST] | G ≥90% of target · A 70–90% · R <70% [REC] | — | Plan target path (row 16) ÷ 7.0% career-route lead→enrolment (`Funnel_Base`: 10 ÷ 142.97) |
| FUN-02 | Source and city tagging | Leads with source, medium, campaign and city ÷ all leads | CRM | PM | Weekly | ≥95% | G ≥95% · A 90–95% · R <90% | SG1; G0 | tech FR-01/02 |
| FUN-03 | Median first human reply | Median of (first human response − lead created), working hours (Mon–Sat 10:00–19:30, Sun 11:00–17:00) | CRM / BSP timestamps | C | Daily, weekly | ≤5 min from Jan (G0 pass ≤15 min) | G ≤5 min · A 5–15 min · R >15 min | SG2; G0 | `admissions_funnel.md` §5.1; A-ECO-105 |
| FUN-04 | P90 first human reply | 90th percentile of the same | CRM | C | Weekly | ≤30 min | G ≤30 · A 30–60 · R >60 min [REC for A/R] | SG2 | §5.1 |
| FUN-05 | Contacted within 1 hour | Leads with a human contact ≤1 working hour ÷ leads | CRM | C | Weekly | ≥90% | G ≥90% · A 75–90% · R <75% [REC for A/R] | SG2 | Growth §9 |
| FUN-06 | Follow-up discipline | Open QLs with ≥5 touches in 14 days ÷ open QLs; closed leads with a lost reason ÷ closed leads | CRM | C | Weekly | ≥90%; ≥90% | G ≥90% · A 75–90% · R <75% [REC for A/R] | SG2 | Growth §9 |
| FUN-07 | Lead → QL, by route | QLs ÷ leads in the cohort | CRM | GL | Weekly (4-week rolling) | MC1 CTWA 40% · GC2 Search 45% · Organic 38% · Referral 70% · Taster ticket→attend 82% | G ≥ target · A between the route's Low rate and target · R < Low (35% · 40% · 30% · 60% · 75%) | Growth §6.6: a route below Low is cut to test level | A-GRO-18a..22a |
| FUN-08 | QL → Counselled, by route | Counselled ÷ QLs | CRM | C | Weekly | 55% · 60% · 55% · 75% · Taster attend→counselled 65% | G ≥ target · A ≥ Low · R < Low (45% · 50% · 45% · 70% · 50%) | Same | A-GRO-18b..22b |
| FUN-09 | Counselling show rate | Counselling calls/visits held ÷ booked | CRM activities | C | Weekly | ≥82% [HYP, taster attend rate used as proxy] | G ≥82% · A 75–82% · R <75% | — | A-GRO-22a (proxy) |
| FUN-10 | Counselled → Applied, by route | Applications with token ÷ counselled | CRM + payment gateway | C | Monthly (lagged) | 30% · 32% · 30% · 55% · Taster counselled→enrolled 20% | G ≥ target · A ≥ Low · R < Low (25% · 28% · 25% · 50% · 16%) | — | A-GRO-18c..22c |
| FUN-11 | Applied → Enrolled | Enrolled ÷ applied | CRM + accounts | C | Monthly | 80% (referral 87%) | G ≥ target · A ≥75% · R <75% | — | A-GRO-18d..21d |
| FUN-12 | Paid-social lead → enrolment | MC1 CTWA enrolments ÷ MC1 leads (60-day lag) | CRM | PM | Monthly | ≥5.3% plan; ≥4% at G1 | G ≥5.3% · A 4–5.3% · R <4% | G1 | `Funnel_Base` (0.4 × 0.55 × 0.3 × 0.8); A-CUS-15 |
| FUN-13 | Cost per QL, by paid cell | Spend ÷ QLs, per campaign cell | Ads platforms + CRM | PM | Weekly | MC1 ≤₹750 · GC2 ≤₹1,111 | G ≤ target · A ≤2× target · R >2× after minimum spend (≥3× target and ≥7 days), or 0 QLs after ₹5,000 | **KT-4** (kill the cell) | channel plan rows 8, 14 |
| FUN-14 | **Media CAC per paid career enrolment** | Career-attributable paid media (70% of the budget, A-ECO-50) ÷ paid-route career enrolments (MC1 + GC2 + taster), trailing 8 weeks with ≥12 paid enrolments | Ads + CRM | GL | Weekly from Feb | Test level in Q1–Q2; plan ₹10.6k in M7–M12 | **G ≤₹9k · A ₹9–12k · R >₹12k** | **SG4**; G1 (green or amber) | methodology §3 #4; `Dashboard` |
| FUN-15 | Route-level CAC | Media, reward or content cost ÷ enrolments, per route | Ads + CRM + accounts | GL | Monthly | CTWA ₹5.4k · Search ₹7.2k · Referral ₹3.0k (reward) · Taster ≤₹0 net · Organic ₹17.5k (content cost) | G ≤ target · A ≤2× · R >2× [REC] | BM G1: route CAC ≤12% of realised fee | funnel `Summary` (Base) |
| FUN-16 | Fully loaded acquisition ÷ career revenue | (Media + growth team + tools + referral rewards + EMI subvention) ÷ career revenue booked | Accounts + CRM | GL | Monthly | Year 1 ≤40% (plan 49% in M7–M12); Year 2 ≤30% | G ≤40% · A 40–55% · R >55% [REC for A/R] | SG4 | methodology §3 #4; `Dashboard` |
| FUN-17 | CAC payback | Route CAC ÷ (first-course contribution ÷ payment months) | Model method on actuals | GL | Quarterly | ≤3 months (plan 0.3 route-level) | G ≤3 · A 3–6 · R >6 months for 2 quarters | G1; **KT-4** (cut the channel) | funnel `Summary`; A-ECO-34 |
| FUN-18 | Taster conversion | Ticket → attend; attendee → enrolled ≤60 days | CRM + attendance | LT, C | Monthly | ≥82%; ≥13% | G ≥ target · A ≥75% / ≥10% · R below | — | A-GRO-22a–c (0.65 × 0.20) |
| FUN-19 | Parent present at S1 counselling | S1 counselled with parent present ÷ S1 counselled | CRM | C | Monthly | ≥60% | G ≥60% · A 45–60% · R <45% [REC for A/R] | — | `admissions_funnel.md` §4 |
| FUN-20 | Counsellor load | Conversations a day per counsellor | CRM | C | Weekly | ≤30 | G ≤30 · A 30–35 · R >35 [REC for A/R] | SG3 (hold spend above 30) | A-GRO-38 |
| FUN-21 | Out-of-town share | Out-of-town QLs ÷ QLs; out-of-town enrolments ÷ career enrolments | CRM city field | GL | Monthly | Enrolments 25% (2.0 / 4.3 / 8.4 / 7.6 a quarter) | G ≥25% · A 15–25% · R <15% | G2: ≥20% of QLs and ≥15% of enrolments | A-GRO-37; row 35 |
| FUN-22 | Referral share | Referral-route career enrolments ÷ career enrolments | CRM entry codes | C | Monthly | ≥20% | G ≥20% · A 10–20% · R <10% [REC for A/R] | — | A-GRO-03d |
| FUN-23 | Masterclass sell-through and seats | Seats sold ÷ seats offered; seats a quarter | Payment gateway | CE | Per launch | ≥80%; 3.4 / 30.6 / 57.8 / 61.2 seats | G ≥80% · A 65–80% · R <65% [REC for A/R] | Raise launch frequency only after two ≥80% launches | channel plan row 11; row 40 |
| FUN-24 | Self-makeup seats | Seats sold a quarter | Payment gateway | C | Monthly | 37 / 45 / 28.5 / 49.5 | G ≥90% · A 70–90% · R <70% of target [REC] | — | row 41 |

### 2.2 Delivery (DEL)

| ID | KPI | Definition / formula | Data source | Owner | Cadence | Target | G / A / R | Gate / trigger | Trace |
|---|---|---|---|---|---|---|---|---|---|
| DEL-01 | **Cohort fill** | Students enrolled at start ÷ 12 (batch cap) | CRM + timetable | LT | Per cohort | ≥75%; model assumes 10 of 12 (83%) | G ≥75% · A 50–75% · R <50% | **G1: 2 consecutive L3 cohorts ≥75%**; **KT-2:** <50% for 2 consecutive cohorts → freeze new fixed costs | A-BM-01; A-ECO-47 |
| DEL-02 | Seat utilisation | Seats occupied ÷ (stations × slots), monthly average | Timetable | LT | Monthly | 42% / 90% / 90% / 83% (end of quarter) | G ≥ plan −5 pts · A −5 to −15 pts · R >15 pts below [REC]; **capacity flag** if waitlist ≥15% of seats | G2 ≥75% for 2 quarters; G3a ≥85% for 6 months | row 37; `geographic_expansion.md` §6 |
| DEL-03 | Delivery-standard compliance | Batches ≤12; live-model sessions with students ≤ stations; practical ratio ≤1:6 | Timetable + audit | LT | Weekly | 100% | G 100% · R any breach | SG3 | `twelve_month_roadmap.md` §11.1 |
| DEL-04 | **Completion** | Students with ≥80% attendance + assessment passed + ≥8-look portfolio ÷ students started | Attendance + assessment records | LT | Per cohort | ≥85% (model assumes 90%) | G ≥90% · A 85–90% · R <85% | G1; SG5; G2 (Destination ≥85%) | A-GRO-31 |
| DEL-05 | **NPS** | End-of-course survey: % promoters − % detractors | Survey | LT | Per cohort | ≥50 | G ≥50 · A 35–50 · R <35 [REC for A/R] | G1; SG5 | `geographic_expansion.md` §6 |
| DEL-06 | **Trainer parity** | Trainer-led cohort satisfaction minus founder-led (out of 5); NPS gap | Survey | F | Per cohort | Gap ≤0.3/5; NPS gap ≤15 points | G ≤0.3 · A 0.3–0.5 · R >0.5 or NPS gap >15 points | **G1**; **KT-3** after 3 trainer-led cohorts | `recommended_strategy.md` §7.1, §7.3 |
| DEL-07 | Practical pass rate | First-attempt practical assessment passes ÷ students assessed | Assessment records | LT | Per cohort | Baseline from cohort 1 (Mar 2027) | G within 5 pts of the Weekday/founder-led baseline · A 5–10 below · R >10 below | G2 (Destination within 5 pts); **KT-7** (>10 pts below) | §7.3 |
| DEL-08 | Attendance | Sessions attended ÷ sessions scheduled, per student | Attendance | LT | Weekly | ≥80% per student | G ≥90% · A 80–90% · R <80% (student at completion risk) [REC] | Completion definition | `admissions_funnel.md` §4 |
| DEL-09 | Practice hours delivered | Hours delivered ÷ hours published, per cohort; live-model hours per L3 student | Timetable | LT | Per cohort | ≥100%; ≥150 h live-model [HYP] | G ≥100% · A 90–100% · R <90% [REC] | Trust stack (D7) | positioning §6 |
| DEL-10 | Refunds and drop-outs | Refunds + drop-outs ÷ students started | Accounts + CRM | AC | Monthly | <10% | G <10% · A 10–15% · R >15% [REC for A/R] | SG5 | Growth §9 |
| DEL-11 | Destination pre-work completion | Pre-work modules completed ÷ assigned, per Destination student | LMS / attendance | LT | Per cohort | ≥70% | G ≥85% · A 70–85% · R <70% | **KT-7** (<70% → revert to Weekday) | §7.3 |
| DEL-12 | Out-of-town safety and parent satisfaction | Serious incidents; parent satisfaction (out of 5) | Incident log; survey | GL | Monthly | 0; ≥4.5 | G 0 incidents and ≥4.5 · A 4.0–4.5 · R any serious incident | G2; **KT-8** (suspend partner) | `geographic_expansion.md` §5.1 |
| DEL-13 | Internal audit score | Quarterly audit against delivery standards (§11.1) | Audit checklist | F | Quarterly | ≥85% | G ≥85% · A 75–85% · R <75% [REC for A/R] | G3b benchmark | §7.1 |

### 2.3 Outcomes (OUT)

| ID | KPI | Definition / formula | Data source | Owner | Cadence | Target | G / A / R | Gate / trigger | Trace |
|---|---|---|---|---|---|---|---|---|---|
| OUT-01 | **Graduates booked within 90 days** | Graduates reporting ≥1 paid booking within 90 days of completion ÷ graduates surveyed at day 90 | Alumni survey (30/90/180/365 days) | GL | Quarterly | Baseline in the 31 Jan report (n ≥30); update Sep 2027 | G ≥ baseline · A up to 10 pts below · R >10 pts below [REC] | G1 (baseline); **proof gate 2** (inside G2) | `admissions_funnel.md` §4 stage 8 |
| OUT-02 | Year-1 bookings and price | Median paid bookings in the first 12 months; median price per bridal booking | Alumni survey | GL | Semi-annual | Baseline | Trend vs baseline [REC] | Outcomes Report | positioning D4 |
| OUT-03 | **Google reviews** | Cumulative reviews and average rating; completers who post a review ÷ completers | GBP | C | Weekly | ≥15 by day 90; **≥30 at ≥4.5 by 26 Feb**; then ≥40% of completers | G target met and ≥4.5 · A count below target or 4.3–4.5 · R <4.3 or <50% of target count [REC for A/R] | SG5; proof gate 1; G1 (≥40%) | channel plan row 1; §7.2 |
| OUT-04 | Alumni survey response | Responses ÷ alumni invited | Survey tool | CE | Per wave | ≥30% and n ≥30 | G met · R n <30 (report shows the gap honestly) | Outcomes Report | customer_segments §10 V4 |
| OUT-05 | Referral leads per alumnus | Referral leads ÷ active alumni, annualised | CRM entry codes | C | Quarterly | 0.4 a year | G ≥0.4 · A 0.2–0.4 · R <0.2 | — | A-GRO-33 |
| OUT-06 | Studio assists per L3 student | Supervised assists on consented bridal bookings per student in season | Studio log | F | Per cohort | Baseline (D4) | Trend [REC] | Differentiator D1 claim | positioning §5 |
| OUT-07 | Earned mentions | Press or directory mentions citing the Outcomes Report or fee transparency | Media log | CE | Quarterly | ≥2 by M6 | G met · A 1 · R 0 | — | channel plan row 25 |

### 2.4 Finance (FIN)

| ID | KPI | Definition / formula | Data source | Owner | Cadence | Target | G / A / R | Gate / trigger | Trace |
|---|---|---|---|---|---|---|---|---|---|
| FIN-01 | **Revenue (ex-GST)** | Fees booked ÷ 1.18 (GST-inclusive quotes), all products | Accounts | AC | Monthly | ₹5.53L / ₹12.72L / ₹23.85L / ₹23.79L (Year 1 ₹65.88L) | G ≥95% of plan · A 85–95% · R <85% [REC] | — | row 60 |
| FIN-02 | Career enrolments vs break-even | Career enrolments a month vs break-even at the current cost base | CRM + model | GL | Monthly | ≥6.5 a month from May (M7) | G ≥ plan · A between break-even and plan · R < break-even for 2 months | G1 (added check, `twelve_month_roadmap.md` §3) | `Dashboard` (step-1 fee) |
| FIN-03 | L3 price realisation | Average realised L3 fee ÷ list fee | Accounts | AC | Monthly | Today's fee until step 1; then ₹66.7k realised on ₹75k list (≈89%) | G ≥89% · A 80–89% · R <80% [REC for A/R] | **KT-5** if conversion falls >20% after a step | A-ECO-160; row 47 |
| FIN-04 | Contribution per career enrolment | (Career revenue − career variable cost) ÷ career enrolments | Accounts + CRM | AC | Monthly | ₹42.4k at M12 (step-1 fee); ₹50.2k after step 2 (Base) | G ≥₹42k · A ₹35–42k · R <₹35k (Conservative M12 ₹34.9k) | — | `Dashboard` |
| FIN-05 | **EBITDA** | Revenue − variable cost − fixed opex (founder not charged; memo after ₹75k founder-role salary) | Accounts | AC | Monthly | −₹6.22L / −₹0.79L / +₹4.89L / +₹4.01L (Year 1 +₹1.89L; −₹7.11L after founder salary); first positive month May | G ≥ plan · A up to ₹1L below plan · R >₹1L below, or negative for 2 consecutive months from July [REC] | G2: flagship EBITDA-positive 2 quarters | row 95; A-ECO-138 |
| FIN-06 | **Cumulative cash need vs tranche** | −(minimum cumulative cash position to date) vs the released tranche | Accounts | F, AC | Monthly | Tranche T1 ≤₹15L (plan ₹10.9L to M5); cumulative ≤₹30L (plan peak ₹28.8L; ≈₹25.6L with the July hybrid build) | G ≤ plan · A between plan and cap · R above the cap → stop spend | G1 ("cash within T1 cap"); T1 cash-cap review by M9 | rows 107–108; A-ECO-153 |
| FIN-07 | Variable cost per L3 student | Consumables/models + kit (before step 1) + gateway/EMI | Accounts | AC | Quarterly | ₹6k consumables; ₹12k kit before step 1 | G ≤ plan · A +10–25% · R >25% over [REC] (Sensitivity: variable cost ×1.25 tested) | — | A-BM-16; A-ECO-103 |
| FIN-08 | CRM–accounts reconciliation | (CRM enrolments − accounts enrolments) ÷ accounts | CRM + accounts | AC | Monthly | Within ±5% | G ≤5% · A 5–10% · R >10% [REC for A/R] | SG1 | Growth §9 |
| FIN-09 | EMI uptake and subvention | L3 enrolments on no-cost EMI ÷ L3 enrolments; subvention paid ÷ L3 revenue | Lender + accounts | AC | Monthly | 35%; 5% subvention | Track vs plan [REC] | — | A-GRO-35, -35b |
| FIN-10 | Overdue instalments | Instalments >15 days overdue ÷ instalments due | Accounts | AC | Monthly | Baseline in Q1, then falling | Trend [REC] | Cash timing (A-ECO-34) | — |
| FIN-11 | GST position | CA opinion obtained; fees quoted GST-inclusive | CA | F | Once (by day 21), then yearly | Done | G done · R not done when fees go live | G0 | D8; ₹12.7L Base swing (methodology §1B #24) |

### 2.5 Founder dependency (FDR)

| ID | KPI | Definition / formula | Data source | Owner | Cadence | Target | G / A / R | Gate / trigger | Trace |
|---|---|---|---|---|---|---|---|---|---|
| FDR-01 | **Founder share of student contact hours** | Founder-delivered contact hours ÷ all student contact hours (L1–L3; masterclasses reported separately) | Timetable | LT | Monthly | Path: 92 / 83 / 75 / 67 / 58 / **50** (Apr) / 48 / 47 / 45 / 43 / 42 / **40%** (Oct); ≤30% at M18 | G ≤ path · A up to 10 pts above · R >10 pts above | **G1 ≤50%**; G2 ≤30%; KT-3 may hold it at ≤50% | row 11; A-BM-10b-G |
| FDR-02 | Founder teaching hours | Founder contact hours a month | Timetable | LT | Monthly | Plan [EST]: 81 / 73 / 66 / 59 / 103 / 88 / 128 / 123 / 119 / 114 / 110 / 106 | G ≤ plan · A up to 10% above · R >10% above for 2 months [REC] | D6 time budget | rows 75–76 × 4 h × 22 days (`Capacity` method) |
| FDR-03 | Founder escalation calls | Counselling calls the founder takes a week | CRM founder-touch flag | C | Weekly | ≤5 a week | G ≤5 · A 6–8 · R >8 [REC for A/R] | — | positioning §4.3 |
| FDR-04 | **Team-led vs founder-led conversion** | Counselled→applied for team-only leads ÷ counselled→applied for founder-touched leads | CRM founder-touch flag (FR-15) | GL | Monthly (rolling quarter) | ≥75% | G ≥75% · A 60–75% · R <60% | **G1**; **KT-3** | §7.1, §7.3; A-GRO-25 |
| FDR-05 | Founder-touch share of enrolments | Enrolments where the founder counselled or closed ÷ enrolments | CRM | GL | Monthly | Baseline in Q1, falling each quarter; ≥70% with no founder touch by M18–M36 | Trend [REC] | Trust-transfer phase 3 | positioning §4.3 |
| FDR-06 | Founder inbox time | Hours a week the founder spends answering enquiries | Founder log | F | Weekly | 0 | G 0 · R any routine inbox duty | D5 ("not the inbox") | CA-04 |
| FDR-07 | Certified educator bench | Educators at PNA Certified Educator (T2) or above, excluding the founder | Certification register | F | Quarterly | 0 / 1 (Lead Trainer, 26 Feb) / 1 / 1–2; ≥3 by the G2 window | G on path · R behind path | **G2 ≥3**; G3a ≥4 incl. a site lead | `twelve_month_roadmap.md` §11.3 |
| FDR-08 | Trainer and student visibility in content | Academy Reels featuring trainers or students ÷ academy Reels | Content log | CE | Monthly | ≥40% from Q3 | G ≥40% · A 25–40% · R <25% [REC for A/R] | Trust-transfer phase 2 | positioning §4.3 |

---

## 3. Quarterly targets on one page

| KPI | Q1 Nov–Jan | Q2 Feb–Apr | Q3 May–Jul | Q4 Aug–Oct | Year 1 | Late case (G1 at M9) | Source |
|---|---|---|---|---|---|---|---|
| **Career enrolments** (north star) | 8.0 | 17.3 | 33.8 | 30.3 | **89.3** | Q3 17.8; Q4 31.5; Year 74.5 | row 33 |
| Career leads a month [EST] | 54 | 107 | 143 | 143 | — | same | FUN-01 |
| Median first reply | ≤15 min at G0; ≤5 from Jan | ≤5 min | ≤5 min | ≤5 min | — | same | SG2 |
| Paid media a month | ₹15k / ₹15k / ₹40k | ₹50k / ₹60k / ₹60k | ₹80k / ₹1.0L / ₹1.0L | ₹1.0L | ₹8.2L | ₹60k to Jul; ₹1.0L from Aug (₹7.2L) | A-GRO-BUD; A-ECO-151 |
| Media CAC per paid career enrolment | test | test | ≤₹9k (plan ₹10.6k) | ≤₹9k | — | plan ₹11.4k | `Dashboard` |
| Fully loaded acquisition ÷ career revenue (M7–M12) | — | — | ≤40% (plan 49%) | ≤40% | — | plan 59% | `Dashboard` |
| Masterclass seats | 3.4 | 30.6 | 57.8 | 61.2 | 153 | same | row 40 |
| Self-makeup seats | 37 | 45 | 28.5 | 49.5 | 160 | same | row 41 |
| Cohort fill | ≥75% | ≥75% | ≥75% | ≥75% | — | same | DEL-01 |
| Seat utilisation (end of quarter) | 42% | 90% | 90% | 83% | — | Q3 90% in the studio (55–65% of demand fits) | row 37 |
| Completion / NPS | baseline | ≥85% / ≥50 | ≥85% / ≥50 | ≥85% / ≥50 | — | same | DEL-04/05 |
| Google reviews | ≥15 | ≥30 at ≥4.5 | ≥40% of completers | ≥40% of completers | — | same | OUT-03 |
| Founder share (end of quarter) | 75% | 50% | 45% | 40% | — | same | row 11 |
| Certified educators (excl. founder) | 0 | 1 | 1 | 1–2 | — | same | FDR-07 |
| L3 list / realised fee | today's fee (₹60k modelled) | today's fee | ₹75k / ₹66.7k | ₹75k / ₹66.7k | — | step 1 from Aug | row 47 |
| Revenue (₹L) | 5.53 | 12.72 | 23.85 | 23.79 | **65.88** | Q3 14.70; Q4 24.35; Year 57.30 | row 60 |
| EBITDA (₹L) | −6.22 | −0.79 | +4.89 | +4.01 | **+1.89** | Q3 +0.70; Q4 +4.50; Year −1.81 | row 95 |
| Cumulative cash (₹L, end of quarter) | −9.52 | −25.58 | −25.06 | −21.34 | peak −28.84 (May) | −9.52 / −10.86 / −24.93 / −25.04; peak −28.24 (Aug) | row 107 |

**Stop-loss reference (KT-10 / G1 red):** the ₹10L-plan cost base at Base rates delivers about 52 career enrolments, ₹39.8L revenue and +₹10.8L EBITDA a year (`Plan10L_BaseRates`). A Conservative trajectory (≈33 career enrolments, −₹13.0L EBITDA, ₹14.9L cash need) is the warning pattern to catch by M9 (methodology §1C #7).

---

## 4. How RAG status is used

1. **Weekly:** any red on FUN-02 to FUN-06 (tracking and follow-up) **freezes media increases** that week (SG1/SG2). Any red on FUN-13 kills the paid cell (KT-4).
2. **Spend gates:** SG1–SG5 are green only when all their KPIs are green for **4 consecutive weekly reviews**. Amber freezes media increases; red rolls media back to the last green level (`recommended_strategy.md` §7.1).
3. **Stage gates:** the gate packs (§7) use the thresholds in the "Gate / trigger" column. A gate passes only if every listed criterion is green, except SG4, which may be amber at G1.
4. **Kill/pivot triggers:** KT-1 (G0 by M4), KT-2 (DEL-01), KT-3 (DEL-06, FDR-04), KT-4 (FUN-13, FUN-17), KT-5 (FIN-03 with FUN-07/FUN-10), KT-6 (pop-ups), KT-7 (DEL-07, DEL-11), KT-8 (DEL-12), KT-10 (G1 red at M12) are checked at the monthly review and written into the decisions log.
5. **Re-basing:** in February the Growth Lead replaces the funnel priors (FUN-07 to FUN-11) with eight weeks of PNA data; the founder approves the new targets. Gate thresholds do not change without a decision recorded at a gate review.

---

## 5. Weekly dashboard specification

**Format:** one page (Looker Studio or Google Sheet), refreshed automatically every **Monday 09:00** for the 30-minute funnel review. **Owner:** Growth Lead (Academy Manager from Nov 2027). **Week:** Monday to Sunday. **Sources:** CRM (TeleCRM or Zoho, tech §3.3), WhatsApp BSP, Meta Ads, Google Ads, GA4, GBP, timetable and attendance sheet, accounts.

| Block | Widgets | KPIs | Source | Refresh |
|---|---|---|---|---|
| 1. Header tiles | Career enrolments this week and month-to-date vs plan; career leads vs target; median first reply; **SG1–SG5 status lights**; cash vs released tranche; days to next gate | North star, FUN-01, FUN-03, FIN-06 | CRM, accounts | Auto (cash monthly) |
| 2. Funnel by route | Table: leads → QL → counselled → applied → enrolled for MC1, GC2, organic, referral, taster, parents' session; conversion vs target and Low; 4-week trend | FUN-07 to FUN-12, FUN-21, FUN-22 | CRM | Auto |
| 3. Speed and discipline | Median and P90 first reply; % contacted ≤1 h; % open QLs with ≥5 touches; lost-reason Pareto (4 weeks); counsellor conversations a day | FUN-03 to FUN-06, FUN-20 | CRM / BSP | Auto |
| 4. Paid media | Spend vs month cap (≤₹15k to G0, ≤₹60k to G1); cost per QL by cell with kill/scale flags; test status (T1–T8: arm, spend, sample, read-out date) | FUN-13, FUN-14 | Ads + CRM | Auto |
| 5. Capacity and delivery | Next two intakes: seats booked vs 12; utilisation; waitlist as % of seats; attendance alerts; live models booked for next week | DEL-01 to DEL-03, DEL-08 | Timetable, CRM | Manual (LT, Monday 08:30) |
| 6. Proof and outcomes | Reviews this week and cumulative, average rating; survey responses; Reels published (academy, founder, trainer/student share) | OUT-03, OUT-04, FDR-08 | GBP, survey, content log | Auto / manual |
| 7. Founder | Founder contact hours this week vs plan; escalation calls; founder-touch enrolments | FDR-02, FDR-03, FDR-05 | Timetable, CRM | Manual (LT) |
| 8. Alerts | Any red KPI; any kill/pivot trigger armed; any SLA breach >30 min | — | All | Auto |

**Data rules for the dashboard:** platform-reported conversions are never the source of truth; the CRM is, reconciled with accounts monthly (FIN-08). Conversion rates are shown on lead-created-week cohorts. Media CAC uses a trailing 8-week window and is shown only once ≥12 paid career enrolments exist in the window.

---

## 6. Monthly business review (90 minutes, last Friday of the month)

**Chair:** founder. **Attendees:** Growth Lead, Lead Trainer, Admissions Counsellor, chartered accountant (finance item only). **Pre-read:** the month's dashboard plus a one-page variance note against `Staged_G1M6`, sent 24 hours ahead.

| # | Item | Time | Inputs | Decision |
|---|---|---|---|---|
| 1 | Scorecard: north star and guardrails; reds and ambers | 10 min | §1, §3 | Which reds get an owner and a date |
| 2 | Funnel and acquisition: route conversion vs priors; cost per QL; media CAC; fully loaded acquisition; test read-outs | 20 min | FUN-01 to FUN-24 | Next month's media level within the cap and spend gates; tests to start, stop or scale |
| 3 | Delivery and quality: cohort fill, utilisation, completion, NPS, trainer parity, pass rate, refunds; educator observations | 15 min | DEL-01 to DEL-13 | Batch calendar; remedial actions; certification steps |
| 4 | Outcomes and proof: reviews, survey, alumni bookings, content | 10 min | OUT-01 to OUT-07 | Proof-gate readiness (price steps) |
| 5 | Founder dependency: share and hours vs path; escalation calls; founder-touch conversion gap | 10 min | FDR-01 to FDR-08 | Next month's founder calendar; step-back pace (KT-3) |
| 6 | Finance: revenue, contribution, EBITDA, cash vs tranche, GST, collections | 15 min | FIN-01 to FIN-11 | Tranche status; T1 cash-cap review (formal by M9) |
| 7 | Gates, triggers and risks: next gate date and readiness; KT checks; top risks (`twelve_month_roadmap.md` §10) | 7 min | Gate tracker | Record decisions in the log |
| 8 | Actions and owners | 3 min | — | — |

---

## 7. Gate packs

| Pack | Date | Contents |
|---|---|---|
| **G0 Instrumented baseline** | Fri 15 Jan 2027 | Baseline sheet (12–24 months); FUN-02/03 evidence; CRM–accounts reconciliation; URLs (fees, course pages, refund/EMI policy, GBP, academy Instagram); Lead Trainer timetable; B&WSSC enquiry; CA opinion; consent library; survey log; cash vs Tranche T1 |
| **SG1–SG5 formal review** | Fri 5 Mar 2027 | Four weeks of SG status; test T1/T3/T5 read-outs; route conversion re-based on PNA data; cohort 1 progress; reviews count; Outcomes Report; capacity forecast for April–July; space heads of terms (subject to G1) |
| **G1 Flagship proven** | Fri 9 Apr 2027 (review 1); monthly re-reviews; latest Fri 30 Jul | Cohort fill for 2 consecutive cohorts; FUN-12, FUN-14, FUN-17; DEL-04/05/06; OUT-03 (≥40% of completers); FDR-01, FDR-04; Outcomes Report with the 90-day booking baseline; FIN-06 vs the T1 cap; proof-gate-1 checklist (Outcomes Report, ≥30 reviews at ≥4.5, portfolio gallery, published practice hours) |
| **Year-1 review** | Fri 29 Oct 2027 | Full-year scorecard vs `Staged_G1M6`; Year-2 budget; KT-10 status; G2 readiness tracker (FUN-21, DEL-02, DEL-07, DEL-11, DEL-12, FDR-07, pop-up results) |
| **G2 Regional engine** | Window Fri 28 Jan – Fri 28 Apr 2028 | G2 criteria (`recommended_strategy.md` §7.1); proof-gate-2 checklist (second Outcomes Report with "% paid booking ≤90 days", 2 trainer-led cohorts ≥75% full, step-1 conversion held within −20%) |

---

## 8. Data rules and definitions

- **Working hours** for response-time KPIs: Mon–Sat 10:00–19:30, Sun 11:00–17:00; after-hours leads are timed from 10:00 the next working day (`admissions_funnel.md` §5.1).
- **Career enrolment:** a new student's first L2 or L3 enrolment, counted in the month the first instalment, full fee or EMI approval is received. L2→L3 upgrades are reported separately.
- **Out-of-town:** home address outside Chandigarh UT, SAS Nagar (Mohali) and Panchkula districts (the tricity catchment, A-CHD-02).
- **Founder share:** contact hours from the timetable, logged per session by the Lead Trainer; masterclasses and portfolio-day assessment reported separately, not in the share.
- **Founder-touch flag:** set in the CRM whenever the founder speaks to, messages or meets the lead before enrolment (tech FR-15).
- **Utilisation:** seats occupied ÷ (stations × slots), monthly average; destination students count as 1.25 seats for 2 months (model convention, `Staged_*` row 26).
- **Revenue:** ex-GST, booking basis (fee ÷ 1.18 when quoted GST-inclusive, A-ECO-24); cash timing is tracked separately (FIN-06, FIN-10).
- **Consent and privacy:** dashboards show no personal data beyond first names; under-18 records need verifiable parental consent before any marketing (DPDP Act, tech §10).
- **Versioning:** targets are versioned with the model run they come from (here `Staged_G1M6`, workbook built 16 Oct 2026). If the Economics workbook is rebuilt, the Growth Lead refreshes §3 before the next monthly review.

---

## Sources and assumption IDs

- **Strategy:** `strategy/recommended_strategy.md` §5–§7, §9.
- **Model:** `economics/business_forecast.xlsx` → `Staged_G1M6`, `Staged_G1M9` (rows 11, 16, 26, 30–41, 47, 60, 75–76, 95, 107–108), `Plan10L_BaseRates`, `Dashboard`, `Capacity`; `economics/funnel_economics.xlsx` → `Funnel_Base`, `Summary`; `economics/assumptions_and_methodology.md` §1A–§1C, §3.
- **Assumption IDs:** CA-04; A-BM-01, -05, -10b-G, -16; A-CHD-02; A-CUS-15; A-ECO-24, -34, -47, -50, -103, -105, -138, -151, -153, -160; A-GRO-03d, -18a..-22c, -25, -31, -33, -35, -35b, -37, -38, -BUD-01..12.
- **Process sources:** `strategy/admissions_funnel.md` §4–§5; `strategy/growth_marketing_strategy.md` §6.6, §9, §11; `strategy/positioning_and_segments.md` §4.3, §5; `strategy/geographic_expansion.md` §5–§6; `execution/technology_and_crm_requirements.md` §5, §9, §10; `execution/marketing_channel_plan.md` §2.
- No web research was done for this file.
