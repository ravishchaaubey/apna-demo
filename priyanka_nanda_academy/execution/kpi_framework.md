# KPI Framework: North Star, Supporting KPIs, Dashboard and Review Rhythm

**Client:** Priyanka Nanda Makeup Academy (PNA), Chandigarh · **Workstream:** Operations / Roadmap · **Prepared:** 2026-10-16 · **Agent:** Operations / Roadmap Agent (Opus)
**Companion files:** `execution/first_90_days.md` · `execution/twelve_month_roadmap.md`.
**Governing strategy:** `strategy/recommended_strategy.md` (Gate D, re-decided after Gate E). This framework feeds its decision rules (§7): gates G0–G3b, spend gates SG1–SG5 and kill/pivot triggers KT-1…KT-13.
**Targets come from:** `economics/business_forecast.xlsx` sheet **`Staged_G1M9`**, the **planning case** (G1 decided at the end of M9, move at M10; `economics/assumptions_and_methodology.md` §1A). Upside: `Staged_G1M6`. Downside runs: `Staged_Cons*`, `Staged_FalsePos*`. Cohort-fill section K and `Dashboard` rows 20–63 are used throughout. Rates come from `economics/funnel_economics.xlsx` (`Funnel_Base`, `Summary`). Funnel definitions and gate thresholds come from `strategy/admissions_funnel.md` §4 and §9, `strategy/growth_marketing_strategy.md` §9 and `execution/technology_and_crm_requirements.md` §5 and §9.

> **Gate E changes (16 Oct 2026)**
> - **Targets re-based from `Staged_G1M6` to the planning case `Staged_G1M9`.** North star: 81 career enrolments in Year 1 (8.0 / 18.7 / 21.9 / 32.4). Revenue ₹60.6L; EBITDA −₹2.8L; peak cash ₹25.2L (July); break-even 7.8 a month at the M12 cost base.
> - **G1 test as restated** (§7). DEL-01 now measures fill against the **stations in the room in use**: ≥6 of 8 in the studio, ≥9 of 12 after the move. Cohorts 1–2 are exempt. The calendar is 8-weekly after the move. G1 is decided Mon 26 Jul 2027 on May–July actuals.
> - **FUN-14 uses the corrected CAC KPI**: career media ÷ paid-route enrolments delivered (`Dashboard` row 25; planning ₹11.7k, amber). It is read cumulatively from January until ≥12 paid enrolments exist. FUN-25 (the denominator) is new.
> - **FUN-16 / SG4:** green ≤40%; **amber 40–50% means a founder review, not a pass**; red >50%. The planning case reads **53% (red)**, stated as the accepted Year-1 inefficiency. A Year-1 spend rule is added for the founder to confirm at G1.
> - **KT-1a** (T1 hard cap; mandatory cut review on Fri 5 Mar 2027; deep stop-loss ≈₹25.4L), **KT-2 ramp-aware**, **KT-3 re-timed**, **KT-10 post-move**, **KT-12** and **KT-13** are wired into §4. FDR-09 (continuity-cover readiness) and FIN-12 (founder draw, D6b) are new.
> - **Defects closed:**
>   - FUN-01 is computed from demand: 38 / 89 / 141 / 155 a month.
>   - FDR-02 is on the planning-case hours: peak 114 h in Aug; upside ≈128 h in May.
>   - FDR-07 Lead Trainer certification moves to **Fri 9 Apr 2027**, after cohort 1 completes on 26 Mar.
>   - Owner of the weekly review: the **Admissions & Operations Lead**.

**Tags:** [FACT] sourced · [CLAIM] first-party or unverified · [EST] our estimate (model cell or arithmetic shown) · [HYP] to validate · [REC] recommendation.

**How to read this framework**
- **Quarters follow the model year:** Q1 Nov–Jan (M1–M3), Q2 Feb–Apr (M4–M6), Q3 May–Jul (M7–M9), Q4 Aug–Oct (M10–M12).
- **"Plan" means the planning case `Staged_G1M9`.** The upside (`Staged_G1M6`) is shown beside it in §3, never alone.
- **Every rate target is a prior [HYP]** from general education or vendor benchmarks, not PNA data. After 6–8 weeks of CRM data (from about mid-February, after the 18 Jan test start), the Ops Lead re-bases the funnel targets on actuals. The founder approves the change at the monthly review (`admissions_funnel.md` data caveat).
- **RAG thresholds** come from a gate or kill trigger wherever one exists; otherwise they are marked [REC].
- All ₹ figures are ex-GST.

---

## 0. Summary

1. **North star (Year 1): career enrolments a month (new L2 + L3 students).**
   - It is the economic hinge: break-even is **7.8 a month at the M12 cost base** on the step-1 fee, and that base now carries the second trainer and the Ops Lead. Every gate, hire and space decision depends on this volume.
   - Plan: **8.0 / 18.7 / 21.9 / 32.4 a quarter, 81 in Year 1** [EST, `Staged_G1M9` row 38]. Q3 is capped by the studio: 78% / 67% / 77% of May–July demand fits.
2. **Four guardrails stop growth that is not worth having:**
   - **Quality:** completion ≥85%, NPS ≥50.
   - **Acquisition efficiency:** media CAC per paid career enrolment ≤₹9k green, ≤₹12k for G1.
   - **Founder independence:** share of contact hours on the ≤50% M6 / ≤40% M12 path, with trainer parity, **and hours disclosed**.
   - **Outcomes:** % of graduates with a paid booking within 90 days. This becomes the **Year-2 north star** once the January baseline exists.
3. **Five KPI families, 66 measures** (§2): funnel (FUN), delivery (DEL), outcomes (OUT), finance (FIN) and founder dependency (FDR). Each has a definition, formula, data source, owner, cadence, quarterly target and RAG thresholds.
4. **Rhythm:**
   - **One weekly one-page dashboard** (§5), refreshed every Monday at 09:00 and owned by the Admissions & Operations Lead.
   - **One 90-minute monthly business review** (§6), with the KT-1a cash check from February.
   - **Gate packs** for G0, the 5 March SG/KT-1a review, G1, KT-10 and the Year-1 review (§7).
5. **Where the plan already sits off-green [EST, `Dashboard` rows 25, 27]:**
   - Media CAC per paid career enrolment is **₹11.7k in M7–M12 (amber; green ≤₹9k)**.
   - Fully loaded acquisition is **53% of career revenue (red; green ≤40%, amber 40–50%)**.

   Year 1 is acquisition-inefficient by design, because the team is hired ahead of volume to build proof. SG4 green is a Year-2 expectation (`recommended_strategy.md` §7.1, §10 #28). The upside reads ₹11.1k and 49%.

---

## 1. North star and guardrails

| Element | Measure | Plan (Q1 / Q2 / Q3 / Q4) | Why it matters | Gate link |
|---|---|---|---|---|
| **North star** | **Career enrolments a month** (new L2 + L3 students; upgrades excluded) | 2.7 / 6.2 / 7.3 / 10.8 a month (8.0 / 18.7 / 21.9 / 32.4 a quarter) [EST, row 38] | Drives revenue, trainer load, seats and break-even (7.8 a month at the M12 cost base, `Dashboard` row 23) | G1 fill (DEL-01); FIN-02 |
| Guardrail: quality | Completion ≥85% and NPS ≥50 per cohort | From the first completed cohort (26 Mar 2027) | Growth bought with weak delivery destroys the proof flywheel | SG5; G1 test (2) |
| Guardrail: efficiency | Media CAC per paid career enrolment ≤₹9k (G1: ≤₹12k with ≥12 paid enrolments) | Test level to G1; plan ₹11.7k in M7–M12 (amber) | Above ₹12k the paid route stops paying for itself at today's fee (methodology §3 #4) | SG4; G1 test (4); KT-1a |
| Guardrail: independence | Founder share of contact hours on the path, **founder teaching hours disclosed**, trainer-led satisfaction within 0.3/5, team-led conversion ≥75% of founder-led | Share 75% / 50% / 45% / 40% at quarter-end (row 12); hours 73 / 83 / 82 / 110 a month (quarter averages) | The founder's goal (CA-04) and the price step both depend on trainers matching her; her hours are the binding constraint | G1 tests (3), (6); KT-3; D6a |
| Guardrail: outcomes | % of graduates with a paid booking ≤90 days after completion | Baseline in the 31 Jan Outcomes Report; update in Sep | "PNA" must come to mean "graduates who get booked" (positioning §4.3) | G1 test (5) (baseline); G2 (proof gate 2) |

**Year-2 north star [REC]:** booked graduates a quarter (completers × % with a paid booking ≤90 days), once two reports exist.

---

## 2. KPI dictionary

**Columns:** **Target** is the plan by quarter (Q1 / Q2 / Q3 / Q4) unless one value applies to all. **G / A / R** = green / amber / red.

**Owners:**
- **OL** Admissions & Operations Lead (Academy Manager from Nov 2027)
- **LT** Lead Trainer
- **PM** performance freelancer
- **CE** Content Executive
- **F** founder
- **AC** accounts / chartered accountant

### 2.1 Funnel (FUN)

Stage definitions follow `admissions_funnel.md` §4:
1. **Lead:** an identifiable contact with consent and a source tag.
2. **Qualified lead (QL):** named course, age ≥17, start ≤90 days, feasible location/format, fee shared and not rejected.
3. **Counselled:** a ≥10-minute call or video, a campus visit, or a taster/info session plus a 1:1.
4. **Applied:** form + ₹5,000 token.
5. **Enrolled:** first instalment, full fee or EMI approved; batch assigned.

Conversion is measured on **lead-created-week cohorts**, lagged 60–90 days for enrolment.

| ID | KPI | Definition / formula | Data source | Owner | Cadence | Target | G / A / R | Gate / trigger | Trace |
|---|---|---|---|---|---|---|---|---|---|
| FUN-01 | Career leads | Leads with interest in L2/L3 created in the period (first touch) | CRM | OL | Weekly | **≈38 / 89 / 141 / 155 a month** [EST] | G ≥90% of target · A 70–90% · R <70% [REC] | — | Pre-capacity career demand incl. the Destination pilot (`Staged_G1M9` row 39) ÷ 7.0% career-route lead→enrolment (`Funnel_Base`: 10 ÷ 142.97). Replaces the target-path basis (review defect 15; the reviewer's ≈163 was read on the superseded M6 run, ≈159 on the current upside) |
| FUN-02 | Source and city tagging | Leads with source, medium, campaign and city ÷ all leads | CRM | PM | Weekly | ≥95% | G ≥95% · A 90–95% · R <90% | SG1; G0 | tech FR-01/02 |
| FUN-03 | Median first human reply | Median of (first human response − lead created), working hours (Mon–Sat 10:00–19:30, Sun 11:00–17:00) | CRM / BSP timestamps | OL | Daily, weekly | ≤5 min from Jan (G0 pass ≤15 min) | G ≤5 min · A 5–15 min · R >15 min | SG2; G0 | `admissions_funnel.md` §5.1; A-ECO-105 |
| FUN-04 | P90 first human reply | 90th percentile of the same | CRM | OL | Weekly | ≤30 min | G ≤30 · A 30–60 · R >60 min [REC for A/R] | SG2 | §5.1 |
| FUN-05 | Contacted within 1 hour | Leads with a human contact ≤1 working hour ÷ leads | CRM | OL | Weekly | ≥90% | G ≥90% · A 75–90% · R <75% [REC for A/R] | SG2 | Growth §9 |
| FUN-06 | Follow-up discipline | Open QLs with ≥5 touches in 14 days ÷ open QLs; closed leads with a lost reason ÷ closed leads | CRM | OL | Weekly | ≥90%; ≥90% | G ≥90% · A 75–90% · R <75% [REC for A/R] | SG2 | Growth §9 |
| FUN-07 | Lead → QL, by route | QLs ÷ leads in the cohort | CRM | OL | Weekly (4-week rolling) | MC1 CTWA 40% · GC2 Search 45% · Organic 38% · Referral 70% · Taster ticket→attend 82% | G ≥ target · A between the route's Low rate and target · R < Low (35% · 40% · 30% · 60% · 75%) | Growth §6.6: a route below Low is cut to test level | A-GRO-18a..22a |
| FUN-08 | QL → Counselled, by route | Counselled ÷ QLs | CRM | OL | Weekly | 55% · 60% · 55% · 75% · Taster attend→counselled 65% | G ≥ target · A ≥ Low · R < Low (45% · 50% · 45% · 70% · 50%) | Same | A-GRO-18b..22b |
| FUN-09 | Counselling show rate | Counselling calls/visits held ÷ booked | CRM activities | OL | Weekly | ≥82% [HYP; taster attend rate used as proxy] | G ≥82% · A 75–82% · R <75% | — | A-GRO-22a (proxy) |
| FUN-10 | Counselled → Applied, by route | Applications with token ÷ counselled | CRM + payment gateway | OL | Monthly (lagged) | 30% · 32% · 30% · 55% · Taster counselled→enrolled 20% | G ≥ target · A ≥ Low · R < Low (25% · 28% · 25% · 50% · 16%) | KT-5 input after a price step | A-GRO-18c..22c |
| FUN-11 | Applied → Enrolled | Enrolled ÷ applied | CRM + accounts | OL | Monthly | 80% (referral 87%) | G ≥ target · A ≥75% · R <75% | — | A-GRO-18d..21d |
| FUN-12 | Paid-social lead → enrolment | MC1 CTWA enrolments ÷ MC1 leads, **on lead cohorts ≥90 days old** | CRM | PM | Monthly | ≥5.3% plan; **≥4% at G1** | G ≥5.3% · A 4–5.3% · R <4% | **G1 test (4)** | `Funnel_Base` (0.4 × 0.55 × 0.3 × 0.8); A-CUS-15 |
| FUN-13 | Cost per QL, by paid cell | Spend ÷ QLs, per campaign cell | Ads platforms + CRM | PM | Weekly | MC1 ≤₹750 · GC2 ≤₹1,111 | G ≤ target · A ≤2× target · R >2× after minimum spend (≥3× target and ≥7 days), or 0 QLs after ₹5,000 | **KT-4** (kill the cell) | channel plan rows 8, 14 |
| FUN-14 | **Media CAC per paid career enrolment (corrected KPI)** | **Career-attributable paid media (70% of the budget, A-ECO-50) ÷ paid-route career enrolments delivered** (FUN-25; not 60% of all enrolments). **Window:** cumulative since the tests began (18 Jan 2027) until G1, shown only once ≥12 paid enrolments exist (plan: May); from August, trailing 13 weeks | Ads + CRM entry codes | OL | Weekly from Feb | Test level in Q1–Q2; **≤₹12k over Jan–Jul for G1**; plan **₹11.7k in M7–M12 (amber)** | **G ≤₹9k · A ₹9–12k · R >₹12k** | **SG4; G1 test (4); KT-1a** (>₹12k on the Jan–Mar tests after minimum learning spend) | `Dashboard` row 25; methodology §1A.7 (Conservative reads ₹34.3k on the corrected KPI) |
| FUN-15 | Route-level CAC | Media, reward or content cost ÷ enrolments, per route | Ads + CRM + accounts | OL | Monthly | CTWA ₹5.4k · Search ₹7.2k · Referral ₹3.0k (reward) · Taster ≤₹0 net · Organic ₹17.5k (content cost) | G ≤ target · A ≤2× · R >2× [REC] | Diagnostic for SG4 by route | funnel `Summary` (Base) |
| FUN-16 | **Fully loaded acquisition ÷ career revenue** | (Media + growth team + tools + referral rewards + EMI subvention) ÷ career revenue booked, M7–M12 | Accounts + CRM | OL | Monthly | Year 1 ≤40%; **plan 53% in M7–M12** (upside 49%); Year 2 ≤40% green expected | **G ≤40% · A 40–50% = founder review, not a pass · R >50%** | SG4 (`recommended_strategy.md` §7.1); not a G1 criterion | `Dashboard` row 27; methodology §1A reading 4 |
| FUN-17 | CAC payback | Route CAC ÷ (first-course contribution ÷ payment months) | Model method on actuals | OL | Quarterly | ≤3 months (plan 0.3 route-level) | G ≤3 · A 3–6 · R >6 months for 2 quarters | **KT-4** (cut the channel) | funnel `Summary`; A-ECO-34 |
| FUN-18 | Taster conversion | Ticket → attend; attendee → enrolled ≤60 days | CRM + attendance | LT, OL | Monthly | ≥82%; ≥13% | G ≥ target · A ≥75% / ≥10% · R below | Test T3 (from Feb) | A-GRO-22a–c (0.65 × 0.20) |
| FUN-19 | Parent present at S1 counselling | S1 counselled with a parent present ÷ S1 counselled | CRM | OL | Monthly | ≥60% | G ≥60% · A 45–60% · R <45% [REC for A/R] | — | `admissions_funnel.md` §4 |
| FUN-20 | Counsellor load | Conversations a day per counsellor (the Ops Lead until Aug; plus Counsellor #2 at 0.5 FTE) | CRM | OL | Weekly | ≤30 | G ≤30 · A 30–35 · R >35 [REC for A/R] | SG3 (hold spend above 30) | A-GRO-38 |
| FUN-21 | Out-of-town share | Out-of-town QLs ÷ QLs; out-of-town enrolments ÷ career enrolments | CRM city field | OL | Monthly | Enrolments 25% (2.0 / 4.7 / 5.5 / 8.1 a quarter) | G ≥25% · A 15–25% · R <15% | G2: ≥20% of QLs and ≥15% of enrolments | A-GRO-37; row 40 |
| FUN-22 | Referral share | Referral-route career enrolments ÷ career enrolments | CRM entry codes | OL | Monthly | ≥20% | G ≥20% · A 10–20% · R <10% [REC for A/R] | — | A-GRO-03d |
| FUN-23 | Masterclass sell-through and seats | Seats sold ÷ seats offered; seats a quarter | Payment gateway | CE | Per launch | ≥80%; **0 / 34.0 / 57.8 / 61.2 seats** (Masterclass #1 moved from January to February; model 3.4 / 30.6) | G ≥80% · A 65–80% · R <65% [REC for A/R] | Raise launch frequency only after two ≥80% launches; half volume costs ₹5.9L of EBITDA (RT-21) | channel plan row 11; row 46 |
| FUN-24 | Self-makeup seats | Seats sold a quarter | Payment gateway | OL | Monthly | 37 / 45 / 28.5 / 49.5 | G ≥90% · A 70–90% · R <70% of target [REC] | — | row 47 |
| FUN-25 | **Paid-route career enrolments delivered** | Career enrolments whose first touch is MC1, GC2 or a paid taster (CRM entry codes), counted at enrolment | CRM | OL | Weekly | 1.9 / 9.2 / 10.4 / 17.2 a quarter (38.7 in Year 1); **≥12 cumulative since 18 Jan by G1** (plan ≈21 by July; ≈10.6 by April) | G ≥ plan · A 75–100% of plan · R <75% [REC] | Denominator of FUN-14; **G1 test (4)** | row 41 |

### 2.2 Delivery (DEL)

| ID | KPI | Definition / formula | Data source | Owner | Cadence | Target | G / A / R | Gate / trigger | Trace |
|---|---|---|---|---|---|---|---|---|---|
| DEL-01 | **Cohort fill vs stations (restated)** | Students enrolled at an L3 cohort's start ÷ **stations in the room in use** (8 in the studio to July; 12 in the new academy from August) | CRM + timetable | LT | Per cohort | **Plan (8-weekly calendar, A-ECO-165):** 4 Jan 3.2 · 1 Mar 5.6 (cohorts 1–2 exempt) · 26 Apr 8.7 · 21 Jun 9.4 · 16 Aug 9.1 of 12 · 11 Oct 10.1 of 12. **6-weekly alternative:** 12 Apr 6.3 · 24 May 7.2 · 5 Jul 6.8 · 16 Aug 6.9 · 27 Sep 7.5 | **G ≥75% of stations (≥6 of 8; ≥9 of 12)** · A 60–75% · R <60% | **G1 test (1):** two consecutive cohorts green (first passable 21 Jun on the 8-weekly calendar, 24 May on 6-weekly). **KT-1a:** cohort 2 <4 students. **KT-2 (ramp-aware):** from cohort 3, two consecutive cohorts <5 students → freeze new fixed costs. **KT-10:** first two post-move intakes both <60% of planned fill (<≈5.5 and <≈6.1). The old "≥75% of 12" test is retired for Year 1 | Section K (`Staged_G1M9`); `recommended_strategy.md` §7.1, §7.3 |
| DEL-02 | Seat utilisation | Seats occupied ÷ (stations × slots), monthly average | Timetable | LT | Monthly | 42% / 80% / 90% / 86% (end of quarter) | G ≥ plan −5 pts · A −5 to −15 pts · R >15 pts below [REC]. **Capacity flag** if the waitlist is ≥15% of seats (plan: May–Jul bind, 22–33% of demand waitlisted) | G2 ≥75% for 2 quarters; G3a ≥85% for 6 months | row 43; row 33; `geographic_expansion.md` §6 |
| DEL-03 | Delivery-standard compliance | Batches ≤12; live-model sessions with students ≤ stations (studio cohorts above 8 split into two groups); practical ratio ≤1:6 | Timetable + audit | LT | Weekly | 100% | G 100% · R any breach | SG3 | `twelve_month_roadmap.md` §11.1 |
| DEL-04 | **Completion** | Students with ≥80% attendance + assessment passed + ≥8-look portfolio ÷ students started | Attendance + assessment records | LT | Per cohort | ≥85% (model assumes 90%) | G ≥90% · A 85–90% · R <85% | **G1 test (2)** on cohorts 1–2 (26 Mar, 21 May) and cohort 3 at completion (16 Jul); SG5; G2 (Destination ≥85%) | A-GRO-31 |
| DEL-05 | **NPS** | End-of-course survey: % promoters − % detractors | Survey | LT | Per cohort | ≥50 | G ≥50 · A 35–50 · R <35 [REC for A/R] | **G1 test (2)**; SG5 | `geographic_expansion.md` §6 |
| DEL-06 | **Trainer parity** | **Pooled** trainer-led cohorts (2–3) satisfaction minus founder-led cohort 1 (out of 5); NPS gap. Small n disclosed | Survey | F | Per cohort; pooled reading by mid-July | Gap ≤0.3/5; NPS gap ≤15 points | G ≤0.3 · A 0.3–0.5 · R >0.5 or NPS gap >15 points | **G1 test (3)**; **KT-3 (re-timed):** after the first two trainer-led cohorts (2 and 3), NPS >15 points below → founder share held ≤50%, move waits one intake | `recommended_strategy.md` §7.1, §7.3 |
| DEL-07 | Practical pass rate | First-attempt practical assessment passes ÷ students assessed | Assessment records | LT | Per cohort | Baseline from cohort 1 (Mar 2027) | G within 5 pts of the founder-led baseline · A 5–10 below · R >10 below | G2 (Destination within 5 pts of Weekday); **KT-7** (>10 pts below) | §7.3 |
| DEL-08 | Attendance | Sessions attended ÷ sessions scheduled, per student | Attendance | LT | Weekly | ≥80% per student | G ≥90% · A 80–90% · R <80% (student at completion risk) [REC] | Completion definition | `admissions_funnel.md` §4 |
| DEL-09 | Practice hours delivered | Hours delivered ÷ hours published, per cohort; live-model hours per L3 student | Timetable | LT | Per cohort | ≥100%; ≥150 h live-model [HYP] | G ≥100% · A 90–100% · R <90% [REC] | Trust stack (D7) | positioning §6 |
| DEL-10 | Refunds and drop-outs | Refunds + drop-outs ÷ students started | Accounts + CRM | AC | Monthly | <10% | G <10% · A 10–15% · R >15% [REC for A/R] | SG5 | Growth §9 |
| DEL-11 | Destination pre-work completion | Pre-work modules completed ÷ assigned, per Destination student | Online-delivery tool / attendance | LT | Per pilot group (16 Aug, 20 Sep 2027) | ≥70% | G ≥85% · A 70–85% · R <70% | **KT-7** (<70% → revert to Weekday); G2 | §7.3 |
| DEL-12 | Out-of-town safety and parent satisfaction | Serious incidents; parent satisfaction (out of 5) | Incident log; survey | OL | Monthly | 0; ≥4.5 | G 0 incidents and ≥4.5 · A 4.0–4.5 · R any serious incident | G2; **KT-8** (suspend partner) | `geographic_expansion.md` §5.1 |
| DEL-13 | Internal audit score | Quarterly audit against delivery standards (roadmap §11.1) | Audit checklist | F | Quarterly | ≥85% | G ≥85% · A 75–85% · R <75% [REC for A/R] | G3b benchmark | §7.1 |

### 2.3 Outcomes (OUT)

| ID | KPI | Definition / formula | Data source | Owner | Cadence | Target | G / A / R | Gate / trigger | Trace |
|---|---|---|---|---|---|---|---|---|---|
| OUT-01 | **Graduates booked within 90 days** | Graduates reporting ≥1 paid booking within 90 days of completion ÷ graduates surveyed at day 90 | Alumni survey (30/90/180/365 days) | OL | Quarterly | Baseline in the 31 Jan report (n ≥30); update Sep 2027 | G ≥ baseline · A up to 10 pts below · R >10 pts below [REC] | **G1 test (5)** (baseline); **proof gate 2** (inside G2) | `admissions_funnel.md` §4 stage 8 |
| OUT-02 | Year-1 bookings and price | Median paid bookings in the first 12 months; median price per bridal booking | Alumni survey | OL | Semi-annual | Baseline | Trend vs baseline [REC] | Outcomes Report | positioning D4 |
| OUT-03 | **Google reviews** | Cumulative reviews and average rating; completers who post a review ÷ completers | GBP | OL | Weekly | ≥15 by day 90; **≥30 at ≥4.5 by Fri 26 Feb**; then ≥40% of completers | G target met and ≥4.5 · A count below target or 4.3–4.5 · R <4.3 or <50% of target count [REC for A/R] | SG5; proof gate 1; **G1 tests (2) and (5)** | channel plan row 1; §7.2 |
| OUT-04 | Alumni survey response | Responses ÷ alumni invited | Survey tool | CE | Per wave | ≥30% and n ≥30 | G met · R n <30 (the report shows the gap honestly) | G0 (survey sent); Outcomes Report | customer_segments §10 V4 |
| OUT-05 | Referral leads per alumnus | Referral leads ÷ active alumni, annualised | CRM entry codes | OL | Quarterly | 0.4 a year | G ≥0.4 · A 0.2–0.4 · R <0.2 | — | A-GRO-33 |
| OUT-06 | Studio assists per L3 student | Supervised assists on consented bridal bookings per student in season | Studio log | F | Per cohort | Baseline (D4) | Trend [REC] | Differentiator D1 claim | positioning §5 |
| OUT-07 | Earned mentions | Press or directory mentions citing the Outcomes Report or fee transparency | Media log | CE | Quarterly | ≥2 by M6 | G met · A 1 · R 0 | — | channel plan row 25 |

### 2.4 Finance (FIN)

| ID | KPI | Definition / formula | Data source | Owner | Cadence | Target | G / A / R | Gate / trigger | Trace |
|---|---|---|---|---|---|---|---|---|---|
| FIN-01 | **Revenue (ex-GST)** | Fees booked ÷ 1.18 (GST-inclusive quotes), all products | Accounts | AC | Monthly | ₹5.53L / ₹13.37L / ₹16.63L / ₹25.03L (Year 1 ₹60.55L) | G ≥95% of plan · A 85–95% · R <85% [REC] | KT-10 (contribution vs plan after the move) | row 66 |
| FIN-02 | Career enrolments vs break-even | Career enrolments a month vs break-even at the current cost base | CRM + model | OL | Monthly | ≥7.8 a month from Aug (M10), at the M12 cost base; plan 10.8 a month in Q4 | G ≥ plan · A between break-even and plan · R < break-even for 2 months | Year-1 review; G2 (EBITDA-positive) | `Dashboard` row 23 (step-1 fee) |
| FIN-03 | L3 price realisation | Average realised L3 fee ÷ list fee | Accounts | AC | Monthly | Today's fee until the 16 Aug intake; then ₹66.7k realised on ₹75k list (≈89%) | G ≥89% · A 80–89% · R <80% [REC for A/R] | **KT-5** if QL rate or counselled→applied falls >20% after the step | A-ECO-160; row 53 |
| FIN-04 | Contribution per career enrolment | (Career revenue − career variable cost) ÷ career enrolments | Accounts + CRM | AC | Monthly | ₹41.9k at M12 (planning case, step-1 fee) | G ≥₹42k · A ₹35–42k · R <₹35k (Conservative M12 ₹34.9k) | — | `Dashboard` row 20 |
| FIN-05 | **EBITDA** | Revenue − variable cost − fixed opex (founder not charged; memo after a ₹75k founder-role salary) | Accounts | AC | Monthly | −₹6.67L / −₹0.95L / +₹1.32L / +₹3.48L (Year 1 −₹2.82L; −₹11.82L after founder salary); first positive month April | G ≥ plan · A up to ₹1L below plan · R >₹1L below, or negative for 2 consecutive months from May [REC] | **KT-10:** contribution <60% of plan for 2 consecutive months after the move; G2: flagship EBITDA-positive for 2 quarters | row 103; A-ECO-138 |
| FIN-06 | **Cumulative cash need vs tranche** | −(minimum cumulative cash position to date) vs the released tranche, **before any founder draw** (FIN-12) | Accounts | F, AC | Monthly | **T1 ≤₹15L** (plan ₹11.0L at end-Feb; ₹11.8L high in April, held to M8). **Cumulative ≤₹30L planned** (plan peak ₹25.2L in July, the fit-out month). ₹5L contingency on top (₹35L authorised) | **KT-1a (monthly from M4; mandatory cut review Fri 5 Mar):** R if ≥₹15L (the `Staged_Cons` track reads ₹16.1L in February). After G1: G ≤ plan · A between plan and ₹28L · **R ≥₹28L → KT-11** (freeze discretionary spend; founder decides on the contingency). Read against actual cash (the model excludes tax, GST timing and working capital) | **G1 test (7)**; **KT-1a**; **KT-11** | rows 115–116; A-ECO-153 |
| FIN-07 | Variable cost per L3 student | Consumables/models + kit (before step 1) + gateway/EMI | Accounts | AC | Quarterly | ₹6k consumables; ₹12k kit before step 1 | G ≤ plan · A +10–25% · R >25% over [REC] (Sensitivity: variable cost ×1.25 swings ₹5.1L) | — | A-BM-16; A-ECO-103 |
| FIN-08 | CRM–accounts reconciliation | (CRM enrolments − accounts enrolments) ÷ accounts | CRM + accounts | AC | Monthly | Within ±5% | G ≤5% · A 5–10% · R >10% [REC for A/R] | SG1 | Growth §9 |
| FIN-09 | EMI uptake and subvention | L3 enrolments on no-cost EMI ÷ L3 enrolments; subvention paid ÷ L3 revenue | Lender + accounts | AC | Monthly | 35%; 5% subvention | Track vs plan [REC] | — | A-GRO-35, -35b |
| FIN-10 | Overdue instalments | Instalments >15 days overdue ÷ instalments due | Accounts | AC | Monthly | Baseline in Q1, then falling | Trend [REC] | Cash timing (A-ECO-34) | — |
| FIN-11 | GST position | CA opinion obtained; fees quoted GST-inclusive | CA | F | Once (by 9 Nov), then yearly | Done | G done · R not done when fees go live | G0 | D8; ₹12.7L Base / ₹10.9L planning-case swing (methodology §1A.5) |
| FIN-12 | **Founder draw (D6b)** | Founder salary drawn from the academy, cumulative, and cumulative cash including the draw | Accounts | F, AC | Monthly | ₹0 if the studio funds her (default). If drawn: ₹75k a month; after-draw plan peak ₹32.6L (M10) | G studio-funded, or after-draw cash ≤ the after-draw plan path · A above that path but <₹35L · R ≥₹35L (the authorisation) | Contingency sign-off; reported beside FIN-06 so the draw does not trip KT-1a (≈₹15.5L by March incl. draw) | `Payback_IRR`; `Dashboard` row 88; methodology §1A reading 5 |

### 2.5 Founder dependency (FDR)

| ID | KPI | Definition / formula | Data source | Owner | Cadence | Target | G / A / R | Gate / trigger | Trace |
|---|---|---|---|---|---|---|---|---|---|
| FDR-01 | **Founder share of student contact hours** | Founder-delivered contact hours ÷ all student contact hours (L1–L3; masterclasses reported separately) | Timetable | LT | Monthly | Path: 92 / 83 / 75 / 67 / 58 / **50** (Apr) / 48 / 47 / 45 / 43 / 42 / **40%** (Oct); ≤30% at M18 | G ≤ path · A up to 10 pts above · R >10 pts above | **G1 test (6) ≤50%**; G2 ≤30%; KT-3 may hold it at ≤50%; KT-12 allows ≤60% for one cohort | row 12; A-BM-10b-G |
| FDR-02 | **Founder teaching hours (disclosed)** | Founder contact hours a month (masterclasses, assessment, recording and studio hours logged separately) | Timetable | LT | Monthly | **Planning [EST]:** 81 / 73 / 66 / 59 / 103 / 88 / 85 / 82 / 79 / **114** / 110 / 106. Upside (G1 at M6): May–Jul **128** / 123 / 119 | G ≤ plan · A up to 10% above plan · **R >110 h for 2 consecutive months** (D6a: pull the second trainer forward, or give trainers more slots once in post) | SG3; D6a; G1 test (6) (disclosed monthly) | row 81 × row 12 × 4 h × 22 days (`Capacity` method); `twelve_month_roadmap.md` §7 |
| FDR-03 | Founder escalation calls | Counselling calls the founder takes a week | CRM founder-touch flag | OL | Weekly | ≤5 a week | G ≤5 · A 6–8 · R >8 [REC for A/R] | — | positioning §4.3 |
| FDR-04 | **Team-led vs founder-led conversion** | Counselled→applied for team-only leads ÷ counselled→applied for founder-touched leads | CRM founder-touch flag (FR-15) | OL | Monthly (rolling Feb–Jul for G1) | ≥75% | G ≥75% · A 60–75% · R <60% | **G1 test (3)**; **KT-3** (<60%) | §7.1, §7.3; A-GRO-25 |
| FDR-05 | Founder-touch share of enrolments | Enrolments where the founder counselled or closed ÷ enrolments | CRM | OL | Monthly | Baseline in Q1, falling each quarter; ≥70% with no founder touch by M18–M36 | Trend [REC] | Trust-transfer phase 3 | positioning §4.3 |
| FDR-06 | Founder inbox time | Hours a week the founder spends answering enquiries | Founder log | F | Weekly | 0 | G 0 · R any routine inbox duty | D5 ("not the inbox"); D5a | CA-04 |
| FDR-07 | Certified educator bench | Educators at PNA Certified Educator (T2) or above, excluding the founder | Certification register | F | Quarterly | 0 / **1 (Lead Trainer, Fri 9 Apr)** / 1 (Assistant #1 reaches T1) / 1 (second trainer T2 by 19 Nov 2027); **≥3 by the G2 window** | G on path · R behind path | **G2 ≥3**; G3a ≥4 incl. a site lead | `twelve_month_roadmap.md` §11.3 |
| FDR-08 | Trainer and student visibility in content | Academy Reels featuring trainers or students ÷ academy Reels | Content log | CE | Monthly | ≥40% from Q3 | G ≥40% · A 25–40% · R <25% [REC for A/R] | Trust-transfer phase 2 | positioning §4.3 |
| FDR-09 | **Continuity-cover readiness** | Cover prerequisites done by their dates: second Lead-Trainer finalist kept warm (Nov 2026); key-person insurance quote and IP clauses (Jan 2027); theory recordings (Jan); retainer senior trainer contracted (Feb) and inducted (Apr); PNA Method v1 (26 Feb); named deputy for decisions | Checklist | OL | Monthly | All due items done | G all done · A one item ≤2 weeks late · R any item >2 weeks late | **KT-12** (Lead-Trainer attrition); **KT-13** (founder incapacity) | `twelve_month_roadmap.md` §11.6; `first_90_days.md` §8 |

---

## 3. Quarterly targets on one page

| KPI | Q1 Nov–Jan | Q2 Feb–Apr | Q3 May–Jul | Q4 Aug–Oct | Year 1 | Upside (G1 at M6) | Source |
|---|---|---|---|---|---|---|---|
| **Career enrolments** (north star) | 8.0 | 18.7 | 21.9 | 32.4 | **81.0** | Q3 33.4; Q4 30.8; Year 90.9 | row 38 |
| Career leads a month [EST] | 38 | 89 | 141 | 155 | — | Q3 159; Q4 147 | FUN-01 |
| Paid-route enrolments delivered | 1.9 | 9.2 | 10.4 | 17.2 | 38.7 | Year 47.5 | FUN-25; row 41 |
| Median first reply | ≤15 min at G0; ≤5 from Jan | ≤5 min | ≤5 min | ≤5 min | — | same | SG2 |
| Paid media a month | ₹15k / ₹15k / ₹40k | ₹50k / ₹60k / ₹60k | ₹60k / ₹60k / ₹60k | ₹80k / ₹1.0L / ₹1.0L | ₹7.0L | ₹80k from May; ₹1.0L from Jun (₹8.2L) | A-GRO-BUD; A-ECO-151 |
| Media CAC per paid career enrolment (corrected) | test | test | ≤₹12k for G1 | ≤₹9k green (plan ₹11.7k, amber) | — | ₹11.1k | `Dashboard` row 25 |
| Fully loaded acquisition ÷ career revenue (M7–M12) | — | — | ≤40% green | plan 53% (red; founder review) | — | 49% (amber) | `Dashboard` row 27 |
| L3 cohort fill (students vs stations, 8-weekly) | C1 3.2 of 8 (exempt) | C2 5.6 (exempt); C3 8.7 of 8 | C4 9.4 of 8 | C5 9.1, C6 10.1 of 12 | — | same calendar | DEL-01 |
| Masterclass seats | 0 (moved to Feb) | 34.0 | 57.8 | 61.2 | 153 | same | row 46 |
| Self-makeup seats | 37 | 45 | 28.5 | 49.5 | 160 | same | row 47 |
| Seat utilisation (end of quarter) | 42% | 80% | 90% (67–78% of demand fits) | 86% | — | Q3 90%; Q4 84% | row 43 |
| Completion / NPS | baseline | ≥85% / ≥50 | ≥85% / ≥50 | ≥85% / ≥50 | — | same | DEL-04/05 |
| Google reviews | ≥15 | ≥30 at ≥4.5 | ≥40% of completers | ≥40% of completers | — | same | OUT-03 |
| Founder share (end of quarter) | 75% | 50% | 45% | 40% | — | same | row 12 |
| Founder teaching hours (quarter average) [EST] | 73 | 83 | 82 | 110 | — | Q3 123 (peak 128 in May) | FDR-02 |
| Certified educators (excl. founder) | 0 | 1 | 1 | 1 | ≥3 by G2 | same | FDR-07 |
| L3 list / realised fee | today's fee (₹60k modelled) | today's fee | today's fee | ₹75k / ₹66.7k | — | step 1 from May | row 53 |
| Revenue (₹L) | 5.53 | 13.37 | 16.63 | 25.03 | **60.55** | Q3 23.69; Q4 24.16; Year 66.74 | row 66 |
| EBITDA (₹L) | −6.67 | −0.95 | +1.32 | +3.48 | **−2.82** | Q3 +4.30; Q4 +2.57; Year −0.75 | row 103 |
| Cumulative cash (₹L, end of quarter) | −9.97 | −11.80 | −25.18 | −22.54 | peak −25.18 (Jul) | −9.97 / −26.52 / −22.85 / −20.48; peak −26.52 (Apr) | row 115 |

**Stop-loss references:**
- **KT-1a deep stop-loss** (`Staged_Cons_CutM5_Deep`): the stop-loss state from March 2027 (₹10L-plan team and media lines, paid media paused, content team and freelancers released, Lead Trainer 0.5 FTE, founder-led delivery, Ops Lead kept). Result: 28.7 career enrolments and ₹15.5L revenue in Year 1, and **₹25.4L of cash by Oct 2027, still burning ≈₹0.9L a month**.
- **No cut** (`Staged_Cons`): ₹36.2L.
- **Boutique path** (KT-10b; `Plan10L_BaseRates`): about 52 career enrolments, ₹39.8L revenue and +₹10.8L EBITDA a year at Base rates.
- **False-positive G1** (`Staged_FalsePos`): ₹32.7L, visible in September 2027.

---

## 4. How RAG status is used

1. **Weekly:** any red on FUN-02 to FUN-06 (tracking and follow-up) **freezes media increases** that week (SG1/SG2). Any red on FUN-13 kills the paid cell (KT-4).
2. **Spend gates:** SG1–SG5 are green only when all their KPIs are green for **4 consecutive weekly reviews**. Amber freezes media increases; red rolls media back to the last green level (`recommended_strategy.md` §7.1). For SG4:
   - **Media CAC (FUN-14)** follows that rule from the first reading with ≥12 paid enrolments.
   - **Fully loaded acquisition (FUN-16):** amber (40–50%) means a **founder review, not a pass**. Red (>50%) is the plan's own Year-1 reading (53%).
   - **Year-1 spend rule [REC, for the founder to confirm and minute at G1]:** the founder either:
     - **(a)** accepts the M10–M12 ramp with FUN-16 red by design. Media steps are then governed by FUN-14. A FUN-16 reading **above the plan path (53%) for two consecutive months** rolls media back to the last level at which FUN-16 was on or under that path; or
     - **(b)** holds steady-state media at about ₹70k a month. Modelled: −7.1 enrolments and −₹0.5L of Year-1 EBITDA (methodology §1A.7).

     The 40% gate does not change.
3. **Stage gates:** the gate packs (§7) use the thresholds in the "Gate / trigger" column.
   - **G0:** every criterion green.
   - **G1:** the eight restated tests (§7). SG4 media CAC must be amber or better (≤₹12k). Fully loaded acquisition is reported but is not a G1 criterion.
   - If fill (1) passes but quality (2) or parity (3) fails, the move waits one intake.
4. **Kill/pivot triggers,** checked at the monthly review and written into the decisions log:

   | Trigger | What it watches |
   |---|---|
   | **KT-1** | G0 not met by M4 |
   | **KT-1a** | FIN-06 ≥₹15L, or FUN-14 >₹12k on the Jan–Mar tests, or DEL-01 cohort 2 <4 students, **at the Fri 5 Mar review → mandatory cut** to the stop-loss state |
   | **KT-2** | DEL-01 from cohort 3: two consecutive cohorts <5 students |
   | **KT-3** | DEL-06 and FDR-04 after cohorts 2–3, readable mid-July |
   | **KT-4** | FUN-13, FUN-17 |
   | **KT-5** | FIN-03 with FUN-07 and FUN-10 after price step 1 |
   | **KT-6** | Pop-up attendance and conversion |
   | **KT-7** | DEL-07, DEL-11 |
   | **KT-8** | DEL-12 |
   | **KT-9** | Partner site <60% fill (Year 2+) |
   | **KT-10** | FIN-05 contribution <60% of plan for two months after the move, or DEL-01 for the 16 Aug and 11 Oct intakes |
   | **KT-10b** | G1 still red at M12 with no lease |
   | **KT-11** | FIN-06 ≥₹28L of actual cash |
   | **KT-12 / KT-13** | FDR-09 readiness; activation per `twelve_month_roadmap.md` §11.6 |
5. **Re-basing:** in February the Ops Lead replaces the funnel priors (FUN-07 to FUN-11) with PNA data from the first weeks of tests; the founder approves the new targets. Gate thresholds do not change without a decision recorded at a gate review.

---

## 5. Weekly dashboard specification

**Format:** one page (Looker Studio or Google Sheet), refreshed automatically every **Monday 09:00** for the 30-minute funnel review.
**Owner:** **Admissions & Operations Lead** (Academy Manager from Nov 2027).
**Week:** Monday to Sunday.
**Sources:** CRM (TeleCRM or Zoho, tech §3.3), WhatsApp BSP, Meta Ads, Google Ads, GA4, GBP, timetable and attendance sheet, accounts.

| Block | Widgets | KPIs | Source | Refresh |
|---|---|---|---|---|
| 1. Header tiles | Career enrolments this week and month-to-date vs plan; career leads vs target; median first reply; **SG1–SG5 status lights**; cash vs released tranche (before founder draw); days to the next gate or KT review | North star, FUN-01, FUN-03, FIN-06 | CRM, accounts | Auto (cash monthly) |
| 2. Funnel by route | Table: leads → QL → counselled → applied → enrolled for MC1, GC2, organic, referral, taster, parents' session; conversion vs target and Low; 4-week trend | FUN-07 to FUN-12, FUN-21, FUN-22 | CRM | Auto |
| 3. Speed and discipline | Median and P90 first reply; % contacted ≤1 h; % open QLs with ≥5 touches; lost-reason Pareto (4 weeks); counsellor conversations a day | FUN-03 to FUN-06, FUN-20 | CRM / BSP | Auto |
| 4. Paid media | Spend vs month cap (≤₹15k to G0, ≤₹60k to G1); cost per QL by cell with kill/scale flags; **paid-route enrolments cumulative since 18 Jan vs the ≥12 threshold; media CAC (corrected) once ≥12**; test status (T1–T8: arm, spend, sample, read-out date) | FUN-13, FUN-14, FUN-25 | Ads + CRM | Auto |
| 5. Capacity and delivery | Next two intakes: students booked vs **stations in the room in use** (8 or 12); utilisation; waitlist as % of seats; attendance alerts; live models booked for next week | DEL-01 to DEL-03, DEL-08 | Timetable, CRM | Manual (LT, Monday 08:30) |
| 6. Proof and outcomes | Reviews this week and cumulative, average rating; survey responses; Reels published (academy, founder, trainer/student share) | OUT-03, OUT-04, FDR-08 | GBP, survey, content log | Auto / manual |
| 7. Founder | **Founder contact hours this week and month-to-date vs plan (and the 110-hour line)**; escalation calls; founder-touch enrolments | FDR-01, FDR-02, FDR-03, FDR-05 | Timetable, CRM | Manual (LT) |
| 8. Alerts | Any red KPI; any kill/pivot trigger armed (incl. KT-1a tests from February); any SLA breach >30 min; continuity-cover item overdue | — , FDR-09 | All | Auto |

**Data rules for the dashboard:**
- The CRM is the source of truth, reconciled with accounts monthly (FIN-08); platform-reported conversions never are.
- Conversion rates are shown on lead-created-week cohorts.
- **Media CAC** is shown only once ≥12 paid career enrolments exist in its window: cumulative since 18 Jan until G1 (plan: May), then trailing 13 weeks.

---

## 6. Monthly business review (90 minutes, last Friday of the month)

**Chair:** founder. **Attendees:** Admissions & Operations Lead (presents), Lead Trainer, chartered accountant (finance item only).
**Pre-read:** the month's dashboard plus a one-page variance note against `Staged_G1M9`, sent 24 hours ahead.
**First KT-1a cash check:** Fri 26 Feb 2027.

| # | Item | Time | Inputs | Decision |
|---|---|---|---|---|
| 1 | Scorecard: north star and guardrails; reds and ambers | 10 min | §1, §3 | Which reds get an owner and a date |
| 2 | Funnel and acquisition: route conversion vs priors; cost per QL; paid-route enrolments; media CAC; fully loaded acquisition (founder review if amber or red); test read-outs | 20 min | FUN-01 to FUN-25 | Next month's media level within the cap and spend gates; tests to start, stop or scale |
| 3 | Delivery and quality: cohort fill vs stations, utilisation, completion, NPS, trainer parity, pass rate, refunds; educator observations | 15 min | DEL-01 to DEL-13 | Batch calendar; remedial actions; certification steps |
| 4 | Outcomes and proof: reviews, survey, alumni bookings, content | 10 min | OUT-01 to OUT-07 | Proof-gate readiness (price steps) |
| 5 | Founder dependency: share **and hours** vs path; escalation calls; founder-touch conversion gap; continuity-cover readiness | 10 min | FDR-01 to FDR-09 | Next month's founder calendar; step-back pace (KT-3); 110-hour rule (D6a) |
| 6 | Finance: revenue, contribution, EBITDA, cash vs tranche (before draw), founder draw, GST, collections | 15 min | FIN-01 to FIN-12 | Tranche status; **KT-1a cash check from M4**; KT-11 |
| 7 | Gates, triggers and risks: next gate date and readiness; KT checks; top risks (`twelve_month_roadmap.md` §10) | 7 min | Gate tracker | Record decisions in the log |
| 8 | Actions and owners | 3 min | — | — |

---

## 7. Gate packs

| Pack | Date | Contents |
|---|---|---|
| **G0 Instrumented baseline** | Fri 15 Jan 2027 | Baseline sheet (12–24 months) and footprint note (D9); Ops Lead in post; FUN-02/03 evidence; CRM–accounts reconciliation; URLs (fees with all-in cost, course pages, refund/EMI policy, GBP, academy Instagram); Lead Trainer timetable and contract; B&WSSC enquiry; CA opinion; consent library; survey log; cohort 1 started; cash vs Tranche T1 |
| **KT-1a cash check** | Fri 26 Feb 2027, then monthly | FIN-06 vs the planning path (₹11.0L at end-February) and the `Staged_Cons` track (₹16.1L) |
| **SG1–SG5 formal review + KT-1a cut review** | **Fri 5 Mar 2027** | Four weeks of SG status. **KT-1a tests:** FIN-06 (≥₹15L?), FUN-14 on the Jan–Mar tests (>₹12k?), DEL-01 cohort 2 (<4 students?). Test T1 read-out; route conversion re-based on PNA data; cohort 1 progress; reviews count; Outcomes Report; mystery-shop findings; capacity forecast for May–July; cut decision and, if cut, the boutique-path decision for Year 2 |
| **Upside G1 check** | Fri 30 Apr 2027 | The G1 pack below, read early. Expected outcome on plan: not ready (FUN-25 ≈10.6 < 12; cohorts 2–3 incomplete) |
| **G1 Flagship proven (restated)** | **Mon 26 Jul 2027, on May–July actuals** | See the eight tests below |
| **KT-10 post-move watch** | Monthly from Fri 27 Aug 2027; intake readings 16 Aug and 11 Oct | FIN-05 contribution vs plan (two consecutive months <60%?); DEL-01 for the first two post-move intakes (<60% of planned fill ≈9.1 / ≈10.1?); lease-exit cost (₹3.1L notice, ₹1.8L severance) |
| **Year-1 review** | Fri 29 Oct 2027 | Full-year scorecard vs `Staged_G1M9`; Year-2 budget; KT-10 / KT-10b status; G2 readiness tracker (FUN-21, DEL-02, DEL-07, DEL-11, DEL-12, FDR-07, pop-up results) |
| **G2 Regional engine** | Window Fri 28 Jan – Fri 28 Apr 2028 | G2 criteria (`recommended_strategy.md` §7.1) incl. the Destination pilot (6 students, Aug–Sep 2027: DEL-04, DEL-07, DEL-11, realised price); proof-gate-2 checklist (second Outcomes Report with "% paid booking ≤90 days", 2 trainer-led cohorts ≥9 of 12, step-1 conversion held within −15%) |

**The eight G1 tests and the KPIs that evidence them:**
1. **Fill:** DEL-01, two consecutive cohorts ≥75% of stations in use.
2. **Quality:** DEL-04, DEL-05 and OUT-03 (≥40% of completers review) on cohorts 1–2, plus cohort 3 at completion (16 Jul).
3. **Parity:** DEL-06 (pooled cohorts 2–3 vs cohort 1) and FDR-04 (Feb–Jul).
4. **Funnel:**
   - SG1–SG3 green for 4 weeks;
   - FUN-14 ≤₹12k over Jan–Jul with FUN-25 ≥12 cumulative;
   - FUN-12 ≥4% on leads ≥90 days old.
5. **Proof:** OUT-01 report n≥30; OUT-03 ≥30 reviews at ≥4.5.
6. **Founder:** FDR-01 ≤50%; FDR-02 disclosed.
7. **Cash:** FIN-06 ≤₹15L.
8. **Pre-lease rule:** lease signed only after the reading; ≤3 months' notice; fire NOC; shop-and-establishment.

Also in the G1 pack:
- **Proof-gate-1 checklist:** Outcomes Report, ≥30 reviews at ≥4.5, portfolio gallery, published practice hours, willingness-to-pay block.
- **The Year-1 SG4 spend decision** (§4 rule 2).

---

## 8. Data rules and definitions

- **Working hours** for response-time KPIs: Mon–Sat 10:00–19:30, Sun 11:00–17:00. After-hours leads are timed from 10:00 the next working day (`admissions_funnel.md` §5.1).
- **Career enrolment:** a new student's first L2 or L3 enrolment, counted in the month the first instalment, full fee or EMI approval is received. L2→L3 upgrades are reported separately.
- **Paid-route enrolment:** a career enrolment whose first touch carries an MC1, GC2 or paid-taster entry code. It is the denominator of FUN-14 (the corrected CAC KPI; review RT-06).
- **Cohort fill:** students at the cohort's start ÷ stations in the room in use at that date: 8 in the Sector 8 studio until the move; 12 in the new academy.
- **Out-of-town:** home address outside Chandigarh UT, SAS Nagar (Mohali) and Panchkula districts (the tricity catchment, A-CHD-02).
- **Founder share and hours:**
  - Contact hours come from the timetable, logged per session by the Lead Trainer.
  - Masterclasses, portfolio-day assessment, recording and studio hours are reported separately, not in the share. Hours are reported monthly beside the share.
- **Founder-touch flag:** set in the CRM whenever the founder speaks to, messages or meets the lead before enrolment (tech FR-15).
- **Utilisation:** seats occupied ÷ (stations × slots), monthly average. Destination students count as 1.25 seats for 2 months (model convention).
- **Cash:** cumulative cash need **before any founder draw**; the draw is reported on FIN-12.
- **Revenue:** ex-GST, booking basis (fee ÷ 1.18 when quoted GST-inclusive, A-ECO-24). Cash timing is tracked separately (FIN-06, FIN-10).
- **Consent and privacy:** dashboards show no personal data beyond first names. Under-18 records need verifiable parental consent before any marketing (DPDP Act, tech §10).
- **Versioning:** targets are versioned with the model run they come from: here `Staged_G1M9`, the Gate E workbook of 16 Oct 2026. If the Economics workbook is rebuilt, the Ops Lead refreshes §3 before the next monthly review.

---

## Sources and assumption IDs

- **Strategy:** `strategy/recommended_strategy.md` §5–§7, §9, §10 rows 22–31. `strategy/independent_review.md` RT-02, RT-04, RT-06, RT-07, RT-11, RT-14, RT-18; §4 defects 6, 15, 17; C2, C4, C6, C8.
- **Model:** `economics/business_forecast.xlsx`:
  - `Staged_G1M9`: rows 12, 24, 33, 35, 38–43, 46–47, 53, 66, 81–84, 103, 115–116 and section K.
  - Other sheets: `Staged_G1M6`, `Staged_Cons`, `Staged_Cons_CutM5_Deep`, `Staged_FalsePos`, `Plan10L_BaseRates`, `Dashboard` (rows 20, 23, 25, 27, 52–58, 88), `Payback_IRR`, `Capacity`.
  - Also `economics/funnel_economics.xlsx` → `Funnel_Base`, `Summary`, and `economics/assumptions_and_methodology.md` §1A (incl. 1A.2, 1A.5–1A.7), §3.
- **Assumption IDs:** CA-04; A-BM-01, -05, -10b-G, -16; A-CHD-02; A-CUS-15; A-ECO-24, -34, -50, -103, -105, -138, -151, -153, -160, -164, -165; A-GRO-03d, -18a..-22c, -25, -31, -33, -35, -35b, -37, -38, -BUD-01..12.
- **Process sources:** `strategy/admissions_funnel.md` §4–§5; `strategy/growth_marketing_strategy.md` §6.6, §9, §11; `strategy/positioning_and_segments.md` §4.3, §5; `strategy/geographic_expansion.md` §5–§6; `execution/technology_and_crm_requirements.md` §5, §9, §10; `execution/marketing_channel_plan.md` §2.
- No web research was done for this file.
