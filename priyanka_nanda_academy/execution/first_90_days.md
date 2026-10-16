# First 90 Days: Operating Plan (19 Oct 2026 – 17 Jan 2027)

**Client:** Priyanka Nanda Makeup Academy (PNA), Chandigarh · **Workstream:** Operations / Roadmap · **Prepared:** 2026-10-16 · **Agent:** Operations / Roadmap Agent (Opus)
**Companion files:** `execution/twelve_month_roadmap.md` (quarters, gates, hiring, Gantt, operations model) · `execution/kpi_framework.md` (definitions, targets, dashboard).
**Built on:** `strategy/business_model_evaluation.md` (Hybrid Chandigarh Flagship; G0–G3b) · `strategy/geographic_expansion.md` §6 (gate thresholds) · `strategy/growth_marketing_strategy.md` (phases, tests T1–T8, spend gates) · `strategy/admissions_funnel.md` (stages, SLA) · `execution/marketing_channel_plan.md` §4 · `execution/technology_and_crm_requirements.md` §11 · `economics/business_forecast.xlsx` (`Outlook_Base`, `Outlook_Conservative`, `Outlook_Aggressive`) · `economics/assumptions_and_methodology.md` §3 (canonical names).

**Tags:** [FACT] sourced · [CLAIM] first-party or unverified · [EST] our estimate (arithmetic or model cell shown) · [HYP] to validate · [REC] recommendation · [FOUNDER] founder-stated.

**How to read this plan**
- **Day 0 = Monday 19 Oct 2026. Day 90 = Sunday 17 Jan 2027.** Weeks run Monday to Sunday.
- **Costs are the economics model's Base plan (₹30L envelope, CA-03) for model months M1–M3 (Nov-26 to Jan-27).** The last two weeks of October are founder and team set-up time; any spend in them is booked to M1. Every ₹ figure cites a model line or an assumption ID (`assumptions_register.md`). All figures are ex-GST unless stated.
- **Canonical vocabulary** (economics methodology §3): the flagship is the **L3 Professional Bridal Makeup Artist Programme** in three formats (**Weekday**, **Flex**, **Destination**). L3 list tuition ₹90k, realised ₹80k (A-GRO-06 / A-BM-02), charged only after the proof gate; until then PNA holds today's fee (CA-02, modelled at ₹60k incl. kit). **Stage gates** are G0/G1/G2/G3a/G3b (BM). **Spend gates** SG1–SG5 (Growth §9: Tracking, Follow-up discipline, Capacity, Unit economics, Product proof) govern the month-to-month media level; SG1–SG2 sit inside G0, SG3–SG5 inside G1.
- PNA's own numbers (enrolments, fees, space, enquiries) are **not yet known**. Every target below is a planning prior until the founder data pull (W1) replaces it.

---

## 0. Summary

1. **The 90 days build the machine; they do not buy growth.** The job is to see the funnel, answer every enquiry in minutes, publish fees and proof, and hand teaching to a trainer, all inside the Nov–Feb wedding season, when the founder is busiest (`growth_marketing_strategy.md` §0.6). Paid media stays at test level: ₹15k / ₹40k / ₹50k in Nov / Dec / Jan (A-GRO-BUD-01..03).
2. **Top five priorities, in order** [REC]:
   1. **Founder data pull and decisions** (days 0–14). Nothing else can be calibrated without them (§1).
   2. **Admissions desk live: counsellor + WhatsApp Business API + CRM + SLA** by day 20, so the <5-minute first reply holds from January (A-ECO-105 = M3). Missing the SLA costs about +₹32k of media a month for the same enrolments [EST, funnel `Speed_to_Lead`].
   3. **Visibility and proof:** Google Business Profile verified (day 14), fee ladder and five course pages live (day 27), alumni survey in the field (day 20), first Outcomes Report published 31 Jan.
   4. **Teaching hand-over begins:** lead trainer starts 1 Dec (A-ECO-52 = M2); PNA Method v1 signed off by day 88; founder share of contact hours falls from about 92% to 75% by January (model `Outlook_Base` row 11).
   5. **Learn cheaply:** tests T1–T3, mystery shopping of 10 competitors, 15–20 interviews, the S5 self-makeup season and the first masterclass in January.
3. **Cost (Base, M1–M3) [EST, `Outlook_Base`]:** ₹10.6L of new growth spend (people ₹4.34L, media ₹1.05L, martech ₹0.54L, one-offs ₹2.70L, CRM/proof kit ₹1.50L, partnerships/PR/contingency ₹0.47L), plus ₹3.2L of running costs. With ₹5.7L of revenue, the **net cash need to end-January is ₹9.0L**. That is Tranche 1 of the ₹30L envelope.
4. **Exit test = Gate G0 on Friday 15 Jan 2027 (day 88)** (§7). G0 passing releases Tranche 2 and keeps the March scale-and-space checkpoint on track.
5. **Not in the 90 days:** academy space lease, media above ₹60k a month, the second counsellor, the Destination format, regional pop-ups. These are **scale investments**, prepared now and decided at gates (§5.3).

---

## 1. Founder must-decide / must-provide items (blocking)

Work in the "Blocks" column cannot start or finish without the item. "Default" is what we do if the item is late, so the plan does not stall.

| # | Decision or input | Why it matters | Needed by | Blocks | Default if late |
|---|---|---|---|---|---|
| F1 | **Data pull (V1):** enrolments by course and fee charged (incl. discounts) for the last 12–24 months; payment mode; enquiry exports (WhatsApp, call log, Instagram DMs); alumni list with phone numbers | Replaces CA-01, CA-02, A-ECO-101 in every model; sets the funnel baseline and seasonality (methodology §7.1) | Day 10 (Thu 29 Oct) | W1, W5, W7, W11; G0 | Model priors stay; G0 cannot pass |
| F2 | **Access:** Google Business Profile, Instagram handle(s), website domain/hosting, Meta Business Manager, the phone number to put on the WhatsApp Business API (new or migrated) | All digital set-up depends on it (CA-07) | Day 3 (Thu 22 Oct) | W2, W3, W4, W13 | Create new accounts; lose existing history |
| F3 | **Fee facts and GST status:** today's fee per course, whether GST is charged on top or absorbed, and a chartered accountant's (CA) view on PNA's GST position | GST treatment swings Year-1 EBITDA by ₹12.9L [EST, `Sensitivity`]; at about ₹30L of fees PNA is likely above the ₹20L registration threshold (methodology §5.2) | Day 21 (Mon 9 Nov) | W5 fee page; W12 | Publish "fees incl. GST" only after CA advice; hold fee page |
| F4 | **Fee ladder sign-off:** L1 Career Taster ₹999 (A-GRO-04), L1-S5 Self-Makeup ₹4,999 (A-GRO-08), L2 Foundation ₹39,900 (A-GRO-05), **L3 at today's fee until the proof gate** (CA-02), L4 masterclasses ₹4,999–19,999 (A-GRO-07); kit optional and itemised; written refund/transfer policy; EMI partner | Published fees are a differentiator only Zuri has locally (S-LC-13; positioning D3) | Day 24 (Thu 12 Nov) | W5, W4 | Publish L1, L1-S5 and L4 only |
| F5 | **Budget release rule:** approve the ₹30L Base envelope in tranches against gates (Tranche 1 ₹9.0L now) | Spending ahead of G0 risks the ₹10L-over-envelope outcome of the Conservative case (Dashboard: peak cash ₹15.0L vs ₹10L) | Day 7 | All hiring and spend | Run the ₹10L plan (§6) |
| F6 | **Hiring approvals and pay:** lead trainer ₹60k/month (A-BM-04a; band ₹50–80k), admissions counsellor ₹25k incl. incentive (A-GRO-45), assistant ₹18k (A-BM-04c), marketing/content executive ₹35k (A-GRO-46) | Lead trainer must start 1 Dec to meet the founder-share path | Day 7 | W9, W2, W13 | Start lead trainer in Jan (Conservative timing, A-ECO-52 = M3) |
| F7 | **Founder time budget** for Nov–Jan, with the bridal calendar. Model-derived founder teaching is **66–81 contact hours a month** in M1–M3 [EST: founder-taught batch-slots (`Outlook_Base` rows 74–75) × 4 h × 22 days, the `Capacity` sheet method], plus 40–60 h of curriculum codification (positioning D5) and about 2 h a week of content recording [REC] | Season clash is the main schedule risk | Day 7 | W8, W13, W9 | Codification moves to Jan; v1 slips to February |
| F8 | **Studio facts:** sq ft, number of make-up stations (model assumes 8, A-ECO-110), lease terms and rent share (A-ECO-118 ₹35k [HYP]), whether 12 stations or a weekend batch can fit; live-bride practicum consent feasibility | Decides whether a new space is needed in April (model: capacity binds from M6) | Day 14 | Space shortlist (scale prep), operations standards | Assume 8 stations × 2 slots |
| F9 | **Programme owner:** who runs this plan day to day. The Base model has **no salaried growth or operations lead** until the academy manager in M13 (A-ECO-126). Options: (A) founder owns decisions with a 1-hour weekly review, while the counsellor, performance freelancer and lead trainer each own a lane (cost ₹0); (B) a 0.5-FTE programme lead from M1 at ₹32.5k/month (0.5 × A-ECO-125, the A-ECO-223b part-time basis): +₹3.9L in Year 1; Base peak cash rises from ₹25.7L to about ₹27.7L [EST: +₹32.5k × 8 months to the M8 low point] | Thirteen parallel workstreams need one accountable owner who is not the founder doing the work | Day 7 | All | Option A |
| F10 | **Consent:** permission to contact alumni, and a policy for using student, model and bride images (written consent with scope and revocation; DPDP Act) | Alumni survey, reviews and content all need it (tech §10) | Day 14 | W7, W11, W13 | Survey only alumni who opt in via a WhatsApp broadcast |
| F11 | **Credential intent:** own PNA certificate only, or explore a B&WSSC fee-based accreditation as an optional extended track (S-BM-12/13) | Shapes course hours (NSQF L4 = 510 h) and the certificate page | Day 30 | W12 | Explore only; no claims |
| F12 | **Will the bridal studio continue** alongside the academy, and how many student assists per season can it host? (open question 9) | Studio practicum is differentiator D1; it needs real capacity and bride consent | Day 30 | W8, positioning claims | Do not advertise live-bride practice until confirmed |

Not needed in the 90 days: franchise appetite and a general manager decision (open question 10). These come back at G1 (Oct 2027).

---

## 2. The 90-day team

| Role | Who / skill | Start | Monthly cost (Base) | ID | Owns |
|---|---|---|---|---|---|
| Founder | Brand face, curriculum owner, final assessor; **not the inbox** (CA-04) | Day 0 | Not charged (owner's return) | CA-04 | F1–F12 decisions; PNA Method; content on camera; masterclass #1 |
| Programme owner | Option A or B in F9 | Day 0 | ₹0 (A) or ₹32.5k (B) | A-ECO-125 × 0.5 | Weekly plan review; dashboard; gate pack |
| Admissions counsellor #1 | Consultative selling in Hindi/Punjabi/English; WhatsApp etiquette; CRM hygiene; parent handling | 2 Nov (M1) | ₹25k incl. incentive | A-GRO-45, A-ECO-53 | Inbox, SLA, GBP posting and review replies, referral codes |
| Assistant #1 | Studio assistant; hygiene; model co-ordination | Nov (M1) | ₹18k | A-BM-04c | Practical ratio ≤1:6; consumables; portfolio-day set-up |
| Lead trainer (academic head) | Senior bridal MUA with teaching experience; Hinglish delivery | 1 Dec (M2) | ₹60k | A-BM-04a, A-ECO-52 | Shadow → co-teach; PNA Method write-up; taster delivery |
| Video shooter/editor (freelance) | Short-form editing; lighting rig for before/after; YouTube | Nov (M1) | ₹20k | A-GRO-47 | Proof library; portfolio-day shoots |
| Marketing/content executive | Reels, Hinglish copy, community, consent handling, website copy | Dec (M2) | ₹35k | A-GRO-46, A-ECO-57a | Academy Instagram; SEO page drafts; outcomes report layout |
| Performance-marketing freelancer | Meta CTWA + Flows, CAPI, Google Search, offline conversion import, test design; retainer, not % of spend | Dec (M2) | ₹20k | A-GRO-48, A-ECO-57b | Tracking checklist (SG1); tests T1–T5; cost per QL |
| SEO content freelancer | Hinglish SEO writing; schema | Jan (M3) | ₹15k | A-GRO-50, A-ECO-57c | SEO pages after the first four |
| Web developer (freelance, one-off) | WordPress/Wix, GTM, schema, Core Web Vitals | Day 7–27 | ₹1.2L one-off | A-GRO-49 | Website MVP (W4) |
| Integration freelancer (one-off) | BSP–CRM integration, Flows, CTWA attribution | Day 14–35 | ₹15–40k one-off, inside the ₹1.5L M1 set-up budget | A-ECO-136; tech §4 | CRM and automations (W2) |

---

## 3. Workstreams at a glance

Type: **E** = immediate experiment · **I** = infrastructure · **S** = scale-investment preparation. Costs are Base, M1–M3. Evidence strength: **Strong** (sourced facts), **Medium** (benchmarks or claims), **Weak** (priors to be replaced), **Generates evidence** (the workstream exists to close a Gate-A gap).

| # | Workstream | Type | Owner (skill) | 90-day cost (Base) | Depends on | Milestone (date) | KPI (90-day target) | Evidence strength |
|---|---|---|---|---|---|---|---|---|
| W1 | Founder data pull & baseline | I | Founder + programme owner; performance freelancer (analysis) | ₹0 cash (team time) | F1, F2 | Baseline sheet v1, day 21 (Mon 9 Nov); enquiry-log audit (V2, 100–200 enquiries), day 28 | CA-01, CA-02, A-ECO-101, A-ECO-110, A-ECO-118 replaced with PNA data by day 28 | **Strong need:** no PNA operating data exists (methodology §7.1, [FACT of absence]) |
| W2 | Tracking, CRM & WhatsApp Business API (+ admissions desk and SLA) | I | Counsellor (inbox); integration freelancer; performance freelancer (tracking) | **₹2.79L** = CRM/BSP/GBP/proof-kit set-up ₹1.50L (A-ECO-136, M1) + martech ₹18k × 3 = ₹0.54L (A-GRO-42) + counsellor ₹25k × 3 = ₹0.75L (A-GRO-45) | F2, F6, W1 | CRM + Flow + SLA timers live day 20 (Sun 8 Nov); SG1 tracking checklist green day 34; SLA met from Jan (A-ECO-105) | ≥95% leads source- and city-tagged; median first reply ≤5 min (G0 pass ≤15 min), P90 ≤30 min; CRM vs accounts within ±5% | **Medium:** speed-to-lead odds are US data (S-CUS-20/22); Flows case is a vendor claim (S-CUS-17) |
| W3 | Google Business Profile & reviews | I | Counsellor (posting, replies); programme owner (QA) | ₹0 media; inside A-ECO-136 | F2, F10 | GBP verified day 14; citations consistent on ≥8 directories day 41 | ≥15 reviews at ≥4.5 by day 90; ≥30 by 26 Feb (needed for SG5 at the March checkpoint) [REC] | **Medium:** no PNA GBP found (CA-07, S-LC-07); buyers shortlist on reviews (S-CUS §9) |
| W4 | Website MVP & course pages | I | Web developer; content executive (copy); founder (accuracy) | **₹1.35L** = rebuild ₹1.2L (A-GRO-49, M1) + SEO freelancer ₹15k (A-GRO-50, M3) | F2, F4, W2 (tags) | 5 core pages (fees, L3, L2, Taster, Self-Makeup) day 27; 4 SEO pages day 62; ≥8 SEO pages day 90, 12 by 28 Feb | Course page session → WhatsApp click ≥4% [HYP]; mobile LCP <2.5 s | **Medium:** competitors win with course and fee pages (S-LC §7) |
| W5 | Published fee ladder & pricing test | I + E | Founder (decision); performance freelancer (T5); counsellor (objection log) | ₹0 incremental (T5 runs inside media); policy review inside A-ECO-135 | F3, F4 | Fee page live day 27; T5 "fee shown vs fee on WhatsApp" starts day 42 (6 weeks); price-step evidence pack 30 Apr | T5: ≥80 leads per arm; fee-related lost reasons tracked from day 20 | **Medium-weak:** fee is the top sensitivity (₹23.3L swing, `Sensitivity`); willingness to pay unknown [HYP] |
| W6 | Mystery shopping (10 competitors) | E | Programme owner; an unrecognisable shopper briefed with a script | ₹0 incremental (incidentals inside A-ECO-58) | — | Fieldwork days 14–34; report day 41 | 10 competitors × 3 channels; response time, fee/EMI, demo offer, follow-up over 14 days recorded for each | **Generates evidence:** competitor realised fees are unverified (Gate-A gap) |
| W7 | Student / alumni interviews (15–20) | E | Programme owner (interviewer); counsellor (scheduling) | ₹0 incremental (thank-you masterclass credit; delivery cost about ₹1k/seat, A-ECO-42, inside A-ECO-58) | F1, F10 | Wave 1 (8–10) days 21–41; wave 2 (7–10) days 63–76; synthesis day 84 | 15–20 done to quota; WTP for L3 at ₹75k/₹90k/₹1.2L asked in every career interview | **Generates evidence:** all segment and funnel priors are [HYP] |
| W8 | Curriculum codification: PNA Method v1 | I | Founder (method owner, 40–60 h, positioning D5 [EST]); lead trainer (write-up); shooter (technique clips) | ₹0 incremental (inside lead trainer and shooter lines) | F7, F12, W9 | Module map + 8–12 named techniques day 34; v0.5 (core bridal modules: lesson plans + draft rubric) day 55; **v1 signed off day 88** | v1 covers 100% of L3 modules; rubric scores agree within one point between founder and lead trainer on 10 sample looks [REC] | **Medium:** international founder-academy cases (S-INT-01/05/41) [CLAIM]; H3 [HYP] |
| W9 | Trainer recruitment & train-the-trainer | I | Founder (selection, certification); programme owner (sourcing) | **₹1.74L** = lead trainer ₹60k × 2 (A-BM-04a, from M2) + assistant ₹18k × 3 (A-BM-04c) | F6, W8 | Offer accepted day 34; **lead trainer starts Tue 1 Dec**; co-teaches one module by day 76; teach-back assessment day 84 | Founder share of contact hours ≤75% in January (model path); lead trainer passes teach-back on 6 core techniques [REC] | **Weak-medium:** trainer pay is unsourced (A-BM-04 [HYP]); the step-back itself is founder-stated (CA-04) |
| W10 | Paid tests at ₹40–60k/month, behind spend gates | E | Performance freelancer; counsellor (speed and quality of follow-up) | **₹1.45L** = media ₹15k + ₹40k + ₹50k (A-GRO-BUD-01..03) + freelancer ₹20k × 2 (A-GRO-48) | W2 (SG1 green), W4, W13 creative | Brand search on day 28; T1/T2 start Mon 23 Nov; T3 from day 49; T1 read-out day 84 | Cost per QL: CTWA ≤₹750, Search ≤₹1,111; kill a cell at >2× target after minimum spend; ≥150 leads or ≥40 QLs per T1 arm | **Weak:** CPL and conversion priors are vendor/US benchmarks (A-GRO [HYP]), which is why we test |
| W11 | First Alumni Outcomes Report | I | Content executive (survey, layout); programme owner (analysis); counsel review of claims | ₹0 incremental (outcomes/PR inside A-ECO-58; Growth §10 ₹0.5L/yr) | F1, F10 | Survey out day 20; ≥30 responses day 70; draft day 88; **published Sun 31 Jan** | n ≥30 responses (≥30% response); report states n, dates and medians; zero income/placement promises | **Medium:** no player publishes cohort outcomes (S-NC §1) [FACT of absence]; the proof gate triggers the price step (A-ECO-104) |
| W12 | Credential affiliation exploration (B&WSSC) + legal + GST | I | Founder; CA; counsel | **₹1.5L** one-off (A-ECO-135, M3: B&WSSC alignment, legal for fee/refund/claims, accounting set-up) | F3, F11 | GST opinion day 21; refund/transfer policy and consent forms day 27; B&WSSC enquiry lodged (info@bwssc.in + Skill India portal) by day 76; decision memo 30 Apr | Enquiry lodged (G0 criterion); fees, timelines, assessment cost obtained | **Medium:** fee-based route exists (S-BM-12, High) but fees are unpublished (S-BM-13) |
| W13 | Founder content system | I | Content executive + shooter; founder on camera | **₹1.30L** = shooter ₹20k × 3 (A-GRO-47) + executive ₹35k × 2 (A-GRO-46) | F2, F7, F10 | Academy Instagram live day 34 with 15 Reels banked; founder recording block weekly from day 14; YouTube live day 76 | Academy 5 Reels/week, founder 3/week, ≥2 Collab posts/week (channel plan rows 4–5); every asset carries a consent ID | **Medium:** founder brand is the conversion asset (H3; A-CUS-30 [HYP]) |
| — | Partnerships, PR, contingency | — | Programme owner | ₹0.47L (₹15.8k × 3, A-ECO-58) | — | Referral codes live day 41 | Referral share of career enrolments tracked from day 41 | — |
| | **Total new growth spend, M1–M3** | | | **₹10.6L** [EST: sum of the rows above; reconciles to `Outlook_Base` M1–M3 people ₹4.34L + media ₹1.05L + martech ₹0.54L + A-ECO-58 ₹0.47L + one-offs ₹2.70L + capex ₹1.50L] | | | | |

---

## 4. Week-by-week plan

Owners: **F** founder · **PO** programme owner · **C** counsellor · **LT** lead trainer · **PM** performance freelancer · **CE** content executive · **SH** shooter/editor · **WD** web developer · **IF** integration freelancer · **CA** chartered accountant.

| Wk | Dates (days) | Actions | Owner | Output / milestone |
|---|---|---|---|---|
| 1 | 19–25 Oct (0–6) | Kick-off. Founder decisions F2, F5, F6, F7, F9. Data pull starts (F1). BSP and CRM shortlists (2 each) and written quotes (BSP mark-up, message pricing, EMI subvention). Interim lead log: BSP labels + Google Sheet (tech §1 Phase 0). Job specs for counsellor, lead trainer, assistant; sourcing from alumni, senior local MUAs and salon senior artists. CA appointment booked (F3). | F, PO | Decisions log; quotes requested; job ads out |
| 2 | 26 Oct–1 Nov (7–13) | GBP claim and verification; citations audit (Justdial, Sulekha, UrbanPro, WedMeGood, Lyfskills). Enquiry-log audit V2 begins (100–200 enquiries: response time, follow-ups, who replied, outcome, lost reason). Consent forms (DPDP notice, image consent). BSP onboarding: number, display name, templates submitted. Counsellor interviews; lead-trainer interviews include a live practical demo. Web developer briefed. Studio audit (F8). | PO, C-candidate, IF, WD | F1 data received (day 10); templates submitted; studio facts |
| 3 | 2–8 Nov (14–20) | **Counsellor starts (Mon 2 Nov).** CRM configured (fields, stages, lost reasons, routing); 4-question WhatsApp Flow; SLA timers (5-min / 30-min escalation); CTWA attribution test; UTM and entry-code conventions; counsellor trained on scripts and objections (`admissions_funnel.md` §6–7). **GBP verified (day 14).** Alumni survey V4 and current-student NPS survey sent, with review ask. Mystery shopping starts (W6). Founder + LT-candidate draft the module map. | IF, C, PO, CE | **CRM + Flow + SLA live (day 20)**; survey in field |
| 4 | 9–15 Nov (21–27) | Website quick wins: WhatsApp sticky bar; **fee page**; L3, L2, Taster and Self-Makeup pages; GA4/GTM events; Meta Pixel/CAPI; Google Ads conversions + offline import. Razorpay links (taster, self-makeup, token ₹5,000); EMI partner application. GST opinion received (F3); refund/transfer policy drafted and sent to counsel. Fee ladder signed (F4). Baseline sheet v1 (W1) with first replaced model inputs. Interview wave 1 begins. | WD, PM, F, CA, PO | **5 core pages + fee page live (day 27)**; baseline v1 |
| 5 | 16–22 Nov (28–34) | **Academy Instagram live** (Highlights: Fees, Student Work, Parents, Visit); founder Collab posts; first portfolio-day shoot with a standard lighting rig; 15 Reels banked. Brand search (Google) on. **SG1 tracking checklist review** (test lead shows `ctwa_clid` and a CAPI event; GA4 and offline import firing). Lead trainer offer accepted. Module map + 8–12 named techniques agreed. Mystery-shop fieldwork ends. | CE, SH, PM, F | Instagram live; **SG1 green → test budget released**; offer signed |
| 6 | 23–29 Nov (35–41) | **Phase 1 starts (Mon 23 Nov):** T1 (CTWA + Flow vs instant form, ₹25k per arm over 4–5 weeks) and T2 (creatives R1/R2/R3/R12) in Meta tricity; S5 self-makeup campaign for the wedding season; Google Search course-intent test (₹15k). Referral programme launched (codes to alumni; ₹3,000 per enrolled referee, A-GRO-34). Mystery-shop report (W6). Citations consistent on ≥8 directories. | PM, C, PO | First cost-per-QL read; **mystery-shop report (day 41)** |
| 7 | 30 Nov–6 Dec (42–48) | **Lead trainer starts (Tue 1 Dec):** induction; observes every founder-taught session; writes up techniques with the founder (2 × 3-hour codification sessions a week, scheduled around bridal bookings). Marketing/content executive and performance freelancer start (M2). T5 (fee shown vs gated) starts on Search traffic. First weekly dashboard published. | LT, F, CE, PM | Dashboard v1; T5 live |
| 8 | 7–13 Dec (49–55) | **First ₹999 Career Taster** (T3 arm A; LT delivers with founder present) and first **online Parents & Students Info Session** (T3 arm B, Sunday 19:00). Interview wave 1 ends (8–10 done). **PNA Method v0.5** (core bridal modules: lesson plans + draft rubric). SG2 discipline check (median and P90 first reply, ≥5 touches in 14 days). | LT, C, F, PO | **v0.5 (day 55)**; T3 data starts |
| 9 | 14–20 Dec (56–62) | **4 SEO pages** live (fees guide; "12 questions to ask any academy"; for parents; the PNA Method). Survey reminders (target ≥30 responses). Masterclass #1 waitlist opens (WhatsApp keyword). LT co-plans the January batch. Second taster. | CE, WD, C, LT | **4 SEO pages (day 62)**; waitlist open |
| 10 | 21–27 Dec (63–69) | Interview wave 2 (parents, S2 career-switchers, S3 working artists, out-of-town, non-converters), using the vacation. YouTube channel set up. Space-option scan (prep only): 3 candidate premises, rent per sq ft against S-CHD-22 bands; contractor quote requests. | PO, CE, F | Wave 2 under way; space long-list |
| 11 | 28 Dec–3 Jan (70–76) | LT **co-teaches one module**. YouTube live with 2 long-form videos. **B&WSSC enquiry lodged** (info@bwssc.in; Skill India portal registration). Survey closes (≥30 responses). | LT, CE, F | **B&WSSC enquiry (G0 item)**; survey closed |
| 12 | 4–10 Jan (77–83) | **Masterclass #1** (January lean month; founder-led; 12–14 seats; self-serve payment). Survey analysis → Outcomes Report draft; counsel review of claims. T1 read-out and decision (keep CTWA + Flow unless the form wins by ≥20% on cost per QL). Six-week dashboard trend. Interview synthesis drafted. | F, CE, PO, PM | Masterclass #1 delivered; T1 decision |
| 13 | 11–17 Jan (84–90) | **PNA Method v1 signed off**; LT teach-back assessment against the rubric; G0 evidence pack; **G0 review Fri 15 Jan**; Tranche 2 decision; Feb–Apr plan (`twelve_month_roadmap.md` Q2). Outcomes Report final layout (publish Sun 31 Jan). | F, LT, PO | **G0 decision (day 88)**; PNA Method v1 |

**Cadence from week 3:** daily 10-minute counsellor huddle (new leads, SLA breaches, visits booked) · weekly 30-minute funnel review on Monday (PO chairs, founder attends) · weekly 45-minute plan review on Friday (PO, founder; workstream RAG) · see `execution/kpi_framework.md` §4–5.

---

## 5. Experiments, infrastructure and scale investments

### 5.1 Immediate experiments (cheap, fast, decide something)

| Experiment | Decision it informs | Cost (Base) | Read-out | Decision rule |
|---|---|---|---|---|
| T1 CTWA + Flow vs instant form → WhatsApp (H6) | Primary capture route | ₹25k per arm inside media (A-GRO-BUD-02/03) | Day 84 | Winner needs ≥20% lower cost per QL with QL → counselled no worse than −10 pts; else keep CTWA (`growth_marketing_strategy.md` §6.5) |
| T2 Proof vs founder vs fee-transparency vs "Day 1" creative | Creative for scale | ₹4–6k per creative inside media | Rolling | Pause at <50% of median CTR after 3,000 impressions, or cost per QL >₹1,500 after ₹3k |
| T3 ₹999 Taster vs free online session | S2 / undecided-S1 route | ₹15k per arm over 8 weeks | 60-day enrolments, end-Feb | Keep the arm with lower cost per enrolment; tie → taster |
| T5 Fee shown vs fee on WhatsApp | Fee-page policy | Inside Search media | ≥80 leads per arm, about 6 weeks | Keep "fee shown" unless cost per QL is >20% worse |
| V7 SLA pilot (4 weeks of <5-min SLA + 5-touch cadence vs the V2 baseline) | Size of H7 | ₹0 | Day 62 | Keep and staff to SLA; feeds the A-GRO-24 penalty |
| W6 Mystery shopping (10 competitors) | Price position, SLA benchmark, counselling script | ₹0 | Day 41 | Adjust scripts and the May price-step evidence |
| W7 Interviews (15–20) | Segment priorities, WTP, objections | ₹0 | Day 84 | Update A-GRO-06 band and objection handling |
| S5 self-makeup season campaign | Seasonal cash and awareness | Inside media (M3 Meta workshops) | Weekly | Cost per booking ≤₹1,200 [EST, channel plan row 10] |
| Masterclass #1 (S3, founder-led) | S3 demand; L4 pricing | Delivery ₹1k per seat consumables (A-ECO-42) | Day 83 | Sell-through ≥80% → monthly masterclass from Feb |

**Mystery-shop target list (10)** [FACT of existence, A-ECO-07/09/11; S-LC §3]: chains – Orane (Sector 34A), Lakmé Academy (17E or 34A), VLCC (34A), Knuckout (Chandigarh or Zirakpur), Headmasters (Mohali); independents – Zuri, Cassia; founder-led – Nav Brar, Tanvi KG, and one of Meraki / Niti Luthra. Channels: WhatsApp, phone, Instagram DM or web form. Record first-response time, who replies, fee and EMI quoted, demo or taster offered, batch size and hours stated, trust assets sent, and the follow-up cadence over 14 days.

**Interview quotas (15–20)** (customer_segments §10 V3): 5 recent L3/L2 students (≥2 out-of-town), 3 S2 career-switchers, 3 S3 working artists, 2 S5 self-makeup clients, 4–5 non-converters from the enquiry log, 3 parents. Topics: trigger moment, alternatives, who decided and paid, top worries, the proof that convinced them, fee and EMI expectations, outcomes, plans to move abroad (S8 check).

### 5.2 Infrastructure (must exist before money is scaled)

W1 baseline · W2 CRM, WhatsApp API, tracking, SLA · W3 GBP · W4 website and course pages · W5 published fee ladder, refund/transfer policy, EMI · W8 PNA Method v1 · W9 lead trainer and train-the-trainer · W11 Outcomes Report · W12 GST position, legal, B&WSSC enquiry · W13 content system and consent library.

### 5.3 Scale investments (prepared now; decided at a gate)

| Investment | Base timing (model) | Base cost | Prepared in the 90 days | Decided at |
|---|---|---|---|---|
| Media above ₹60k/month | ₹80k Mar, ₹90k Apr, ₹1.0L May–Oct (A-GRO-BUD-05..12) | +₹2.9L over Mar–Oct vs holding ₹60k [EST: ₹7.7L planned − ₹60k × 8] | Tests T1–T5; tracking | SG1–SG5 green for 4 weeks; scale-and-space checkpoint Fri 5 Mar |
| New academy space (12 stations, ~1,300 sq ft) | Fit-out Apr (M6), move May (M7) (A-ECO-112/113) | ₹14.72L: fit-out ₹10.4L (A-ECO-121 × 1,300 sq ft), 4 extra stations ₹1.2L (A-ECO-122), deposit ₹3.12L (A-ECO-123) | Studio facts (F8); premises long-list; contractor quotes | Scale-and-space checkpoint, 5 Mar |
| Counsellor #2 (0.5 FTE) | Apr (M6) | ₹12.5k/month (A-ECO-54/55) | SLA data; counsellor load | Monthly review, Mar |
| Destination format + hybrid pre-work | Content Jun (M8), launch Aug (M10) | ₹3.5L content + LMS (A-ECO-129); LMS ₹5k/month (A-ECO-127) | Out-of-town share of enquiries tracked from day 20 | Q2 review, 30 Apr |
| Regional pop-up pilots | From Jul (M9), 2 events in Year 1 | ₹52k per event (A-BM-06c) | — | Q2 review |
| Academy manager; trainer #2 | Nov 2027 (M13) | ₹65k (A-ECO-125); ₹38k (A-BM-04b) | — | G1, 29 Oct 2027 |

---

## 6. 90-day budget and variants

**Base (₹30L plan), M1–M3, ₹ lakh ex-GST [EST, `Outlook_Base`]**

| Line | Nov-26 | Dec-26 | Jan-27 | 90-day total | ID |
|---|---|---|---|---|---|
| Trainers + assistant | 0.18 | 0.78 | 0.78 | 1.74 | A-BM-04a/c, A-ECO-52 |
| Admissions counsellor | 0.25 | 0.25 | 0.25 | 0.75 | A-GRO-45 |
| Growth team and freelancers | 0.20 | 0.75 | 0.90 | 1.85 | A-GRO-46/47/48/50 |
| Paid media | 0.15 | 0.40 | 0.50 | 1.05 | A-GRO-BUD-01..03 |
| Martech stack | 0.18 | 0.18 | 0.18 | 0.54 | A-GRO-42 |
| Partnerships, PR, contingency | 0.16 | 0.16 | 0.16 | 0.47 | A-ECO-58 |
| One-offs: website (Nov); B&WSSC/legal/accounting (Jan) | 1.20 | 0 | 1.50 | 2.70 | A-GRO-49, A-ECO-135 |
| Capex: CRM/BSP/GBP/photo-video proof kit | 1.50 | 0 | 0 | 1.50 | A-ECO-136 |
| **New growth spend** | **3.82** | **2.52** | **4.27** | **10.61** | |
| Running costs: academy rent share ₹35k, utilities ₹10k, admin ₹15k, delivery consumables and kits | 0.92 | 1.07 | 1.25 | 3.23 | A-ECO-118/119/134; `Outlook_Base` row 70 |
| Revenue (existing courses + self-makeup season + masterclass #1) | 1.19 | 1.78 | 2.69 | 5.66 | `Outlook_Base` row 59 |
| EBITDA (revenue − growth opex − running costs; capex excluded) | −2.04 | −1.80 | −2.83 | −6.68 | row 94 |
| Instalment timing (fees received after booking) | −0.44 | −0.19 | −0.17 | −0.80 | row 104; A-ECO-34 |
| **Net cash flow** | **−3.98** | **−1.99** | **−3.00** | **−8.97** | row 105 |

**Variants (same window, ₹ lakh) [EST, `Outlook_*`, `Plan10L_BaseRates`]**

| Plan | What changes in the 90 days | Opex + capex M1–M3 | Net cash M1–M3 |
|---|---|---|---|
| **Conservative** (adverse rates + ₹10L plan) | Counsellor from Jan at ₹20k; lead trainer 0.5 FTE from Jan; shooter ₹12k only; no content executive or freelancers; media ₹10k/₹25k/₹30k; set-up ₹0.5L; one-offs ₹1.0L | 6.88 | −5.36 |
| **₹10L plan at Base rates** | Same plan as Conservative, base conversion and prices | 6.75 | −2.97 |
| **Base** (₹30L plan) | As above | 13.84 | −8.97 |
| **Aggressive** (favourable rates + ₹50L plan) | Lead trainer from Nov; manager + creator + performance + SEO; **space fit-out in January** (₹19.0L incl. 8 extra stations and deposit, A-ECO-112 = M4); set-up ₹2.5L; one-offs ₹4.5L | 38.56 | −28.55 |

**Recommendation [REC]:** run the Base plan, but release Tranche 1 only (₹9.0L). Do not pull the Aggressive space commitment into January: it would spend ₹19L before any test, tracking or proof result exists, and the ₹50L plan at Base rates loses ₹4.0L in Year 1 with a ₹44.8L cash need (Dashboard).

---

## 7. Day-90 exit: Gate G0 review (Friday 15 Jan 2027)

G0 criteria come from `strategy/geographic_expansion.md` §6, with SG1–SG2 from `growth_marketing_strategy.md` §9.

| # | G0 criterion | Threshold | Evidence | Owner |
|---|---|---|---|---|
| 1 | Founder data pull complete | 12–24 months of enrolments, fees and enquiries; baseline sheet; model inputs replaced | Baseline sheet v2 | PO |
| 2 | CRM + WhatsApp API live, leads tagged | **≥95%** of leads source- and city-tagged (SG1) | CRM report | C, PM |
| 3 | Speed to lead | **Median first reply ≤15 min** to pass (green ≤5 min, the model's assumption from M3); P90 ≤30 min | CRM timestamps | C |
| 4 | Tracking reconciles | CRM enrolments vs accounts within ±5%; CAPI and offline conversions firing (SG1) | Reconciliation | PM |
| 5 | Fee ladder, course pages and GBP published | Live | URLs | WD, C |
| 6 | Lead trainer hired and shadow-teaching | In post since 1 Dec; co-taught ≥1 module | Timetable | LT |
| 7 | B&WSSC fee-based enquiry lodged | Done | Email/portal record | F |

**Also reported (not gating):** PNA Method v1 sign-off; Outcomes Report draft (n ≥30); review count (target ≥15); founder share of contact hours (model path 75% in January); T1 read-out; mystery-shop and interview findings; cash vs Tranche 1.

**If G0 passes:** release Tranche 2 (₹1.6L, cumulative ₹10.6L to end-March [EST, `Outlook_Base` cumulative cash at M5]) and keep media at the February test level of ₹60k (A-GRO-BUD-04).
**If G0 fails:** hold media at the January level (₹50k), name the failing criterion, fix it in two weeks, and re-review on Fri 29 Jan. No space search beyond the long-list.

---

## 8. Risks in the 90 days

| Risk | Early signal | Mitigation |
|---|---|---|
| Wedding season consumes the founder (Nov–mid-Dec peak, S-CUS-13) | Codification sessions cancelled twice; founder answering enquiries | Fixed 2 × 3-hour codification blocks a week; counsellor owns the inbox from day 14; codification can slip to February without breaking G0 |
| Lead trainer hire slips or the candidate fails the practical | No offer by day 34 | Keep two finalists; fall back to a part-time senior trainer (the ₹10L-plan design, A-ECO-52b = 0.5 FTE) |
| Data pull incomplete | F1 late at day 10 | Enquiry-log audit and alumni list first; enrolment ledger from bank and UPI statements |
| Tracking breaks, so test results cannot be trusted | SG1 not green at day 34 | No spend above ₹15k until SG1 is green; integration freelancer on a fixed-price fix |
| Under-18 leads (DPDP "children") | Age band in the Flow | No marketing messages without verifiable parental consent (tech §10) |
| Outcome data is weak | <30 survey responses by day 70 | Incentive (free masterclass seat); publish an honest baseline anyway (Growth §12) |
| WhatsApp INR billing migration by 31 Dec 2026 [FACT, S-GRO-01] | Billing notice from BSP | Choose a BSP that bills in INR from the start |
| GST position undecided when fees go live | No CA opinion by day 21 | Hold the fee page; publish ladder structure without numbers for one week |

---

## Sources and assumption IDs

- **Model:** `economics/business_forecast.xlsx` → `Outlook_Base` rows 11, 59, 74–75, 79–94, 103–106; `Outlook_Conservative`; `Outlook_Aggressive`; `Plan10L_BaseRates`; `Plan50L_BaseRates`; `Dashboard`; `Capacity`; `Sensitivity`. `economics/funnel_economics.xlsx` → `Summary`, `Funnel_Base`, `Speed_to_Lead`.
- **Assumption IDs used:** CA-01..07; A-BM-04a/b/c, A-BM-06c, A-BM-10; A-GRO-04..08, -34, -42, -45..-50, -BUD-01..12; A-ECO-42, -52, -52b, -53..-58, -105, -110, -112, -113, -118, -119, -121..-123, -125..-129, -134..-136, -223b.
- **Research IDs** (resolve in `research/sources.md`): S-LC-07, S-LC-13, S-LC §3/§7; S-CUS-13, -17, -20, -22, S-CUS §9–10; S-NC §1; S-INT-01, -05, -41; S-BM-12, -13 (`strategy/business_model_evaluation.md` §10); S-GRO-01 (`execution/technology_and_crm_requirements.md`).
- No web research was done for this file.
