# Admissions Funnel: Design, SLA, Counselling and Instrumented Model

> **Aligned to recommended_strategy.md §6 on 2026-10-16.** Canonical vocabulary applied: segments S1–S8 and products L0–L5; L3 Pro formats Weekday / Flex / **Destination**; spend gates **SG1–SG5** (stage gates G0–G3b separate); forecast bundles Conservative / Base / Aggressive (the Low/Base/High columns in §9 are input magnitudes); Pro price path **current fee → ₹75k list (step 1) → ₹90k list (step 2), ₹80k realised = planning fee**; tricity market = ₹3.27 cr / ≈730 learners (CA-05 is an upper reference only); M1 = Nov 2026.
>
> **Gate E changes (2026-10-16, independent_review.md RT-07/08/09/13, §4):** SG4 fully loaded acquisition: ≤40% green; 40–50% amber (founder review, **not a pass**); the Year-1 plan runs at ≈49% on the step-1 fee. Search-visibility claims restated as tool-limited and to be verified manually. S-CUS-14 and S-CUS-20 retagged [CLAIM]; H7 = plausible, untested. The non-paid engine uplift (organic + referral 2.5 → 4.0 enrolments/month, +60%) is labelled an unevidenced [HYP] with its validation test. G1 planning case = M9 (Jul 2027), M6 = upside; "steady state" now means after G1.

**Client:** Priyanka Nanda Makeup Academy (PNA), Chandigarh · **Workstream:** Growth & MarTech · **Prepared:** 2026-10-16 · **Agent:** Growth and MarTech Agent (Opus)
**Feeds:** `economics/funnel_economics.xlsx` (Economics agent). **§9 is the master assumption table (A-GRO-01..50).**
**Builds on:** `research/customer_segments.md` §6–8, §11 (A-CUS-xx); `strategy/positioning_and_segments.md` (segments, course ladder L0–L5).

**Tags:** [FACT] verified/sourced · [CLAIM] first-party or unverified · [EST] our estimate (arithmetic shown) · [HYP] hypothesis to validate · [REC] recommendation.
**Data caveat:** PNA's own enquiry volumes, sources, response times and conversion rates are unknown (S-CUS §12). Every rate below is a **[HYP] prior** built from general education/vendor benchmarks, **not makeup-specific**, and from low-reliability vendor sources for India (S-CUS-28..32). Replace these priors with PNA data within 6–8 weeks of instrumenting (V1, V2, V6, V7 in S-CUS §10).

---

## 1. Summary

1. **The brief's starting hypothesis (H6), that WhatsApp counselling beats website-first, is right but incomplete.** WhatsApp is the *rail*, not the funnel.
   - For career programmes the sale is closed at a **campus visit or paid taster with the parent or spouse present**.
   - For masterclasses and self-makeup, counselling is *friction*. Those should be self-serve.
   - The website is the **trust hub** that every route passes through, and the capture surface for Search and AI-search. It is not the closer.
   - Most important: **a funnel choice is second-order until PNA has visibility, proof and response discipline.** PNA did not appear in our tool-limited, US-based searches; Instagram, Maps and Justdial were blocked. To be verified manually with the founder before the founder meeting (CA-07). No Google Business Profile, Instagram or published proof could be verified; if the manual check confirms the gap, fix it first.
2. **Recommended funnel by segment [REC]:**

   | Segment | Funnel |
   |---|---|
   | S1 | CTWA/Search → WhatsApp Flow → counsellor <5 min → **parent visit** → token → EMI |
   | S2 | **₹999 paid taster** (credited) → same-day counselling with spouse → EMI |
   | S3 | Content → WhatsApp Community → limited-seat launch → **self-serve payment** |
   | S7 | Search/regional CTWA → **online parents' info session** → video counselling → **L3 Destination** format (4 weeks live-online pre-work + 5–6-week Chandigarh intensive) + accommodation partner |
   | S5 | Seasonal Reels/Search/vendor partners → **instant booking** |

3. **Speed-to-lead and follow-up are plausibly the cheapest levers (H7: plausible, untested; the V7 SLA pilot decides).** The supporting evidence is US-only vendor data [CLAIM].
   - **SLA:** first human reply median <5 min and P90 <30 min in working hours; ≥5 touches in 14 days for every qualified lead (QL).
   - Without the SLA, the model applies a 0.67× penalty to Lead→QL (A-GRO-24).
4. **Base monthly target (steady state after G1: months 10–12 in the M9 planning case, 7–12 if G1 comes at M6): 10 career enrolments** (6 Pro + 4 Foundation). This is a **gated plan target, not a forecast**; the fallback is the ₹10L-Plan trajectory of about 52 career students a year (recommended_strategy §5, §10 #14). Today PNA makes under 60 enrolments a year across all courses (CA-01). The target needs about **143 career leads, 66 QLs, 38 counselled/taster attendees and 12 applications a month**. Base media cost is **≈₹35k/month**, which is **≈₹5.9k media CAC per paid enrolment**.
5. **The cost uncertainty is about 9× wide.** For the same 10 enrolments, the conservative case (low conversion, high CPL) needs about **257 leads and ≈₹1.1L of media** (≈₹18.5k per paid enrolment). The Aggressive (favourable-rate) case needs about 89 leads and ≈₹12.5k. This spread is why spend must not scale until spend gates **SG1–SG5** are green (and, above ₹60k/month, stage gate G1), per `growth_marketing_strategy.md` §9.

---

## 2. Challenging the starting hypothesis: funnel options

| Funnel option | Case for | Challenge / failure mode | Verdict [REC] | Where it wins | How we test |
|---|---|---|---|---|---|
| **(a) Website-first** (ad/SEO → landing page → form → callback) | PNA's only verified asset is its website (CA-07); Search and AI answers draw on websites; parents validate on the site | Forms → callbacks go cold: only 37% of US firms respond within 1 h (S-CUS-22); median landing-page conversion 6.6% (S-CUS-27); faceless, and parents' questions are not answered | **Trust hub + SEO/AI-search capture + fallback.** Every CTA opens WhatsApp with a pre-filled, source-coded message. Forms trigger an instant WhatsApp template | S7 research, parent validation, Search | T5 (fee shown vs gated); T1 (instant form arm) |
| **(b) WhatsApp-first** (CTWA / click-to-chat → counselling) | >70% of online Indians prefer messaging a business (S-CUS-14) [CLAIM, Meta-commissioned survey]; CTWA opens a 72-h free window (S-CUS-16, S-GRO-01); Flows qualification case: 4× QLs, −31% cost per QL (S-CUS-17, vendor case) | WhatsApp is a channel, not a sale. Risks: freebie "fees?" chats overload counsellors; **founder voice-note dependency** (conflicts with CA-04); weak attribution without CRM/CAPI | **Primary capture and nurture rail for all segments.** Add a 4-question Flow, a counsellor (not the founder) as inbox owner, CRM tagging and CAPI | S1, S2, S7, S3 | T1 CTWA+Flow vs instant form → WhatsApp |
| **(c) Counselling-first** (every lead gets a call/visit) | High-ticket offline course, and parents decide (A-CUS-27) | Friction and cost for S3/S5. Founder-led counselling does not scale (A-CUS-30 premium is real but finite) | **Mandatory for career programmes only.** Team-led, with founder escalation slots. Never for L4/L1-S5 | S1, S7, S2 | Founder-touch flag; counselled→applied by counsellor |
| **(d) Paid trial workshop** (₹999 taster, credited) | Self-selects intent; lets teaching quality sell; works without the founder; Airblack used a low-ticket → upsell design (S-CUS-33/34) | Local rivals offer *free* demos (S-LC-13/23), so price is an objection; risk of cannibalisation; trainer time | **Primary for S2 and undecided S1; regional pop-ups for S7.** Test as an alternative primary for S1 | S2, S7 pop-ups | T3 ₹999 taster vs free online session; T4 taster vs counselling for S1 |
| **(e) Webinar / Instagram Live** | Cheap reach for remote families | Free consumer events: registrant→attendee 25–45% (A-CUS-17); an online demo cannot prove hands-on quality | **Secondary.** Monthly online **Parents & Students Info Session** for S7 and parents; fortnightly founder Live for community | S7 parents | Registrant→counselled rate (A-GRO-26) |
| **(f) Referral / alumni** | Highest intent: 20–40% lead→enrol (A-CUS-15); 88% trust people they know (S-CUS-42) | Volume capped by alumni base; untracked today | **Institutionalise** with codes, rewards and tracking | All | Referral share of enrolments |

**Bottom line:** no single funnel. Use a **WhatsApp rail, a counsellor-run career funnel closed at a visit or taster, self-serve for low-ticket products, and the website as the trust hub**. Then test (b) vs (a) and (c) vs (d) with matched budgets before scaling (`growth_marketing_strategy.md` §6.5).

---

## 3. Recommended funnel per segment × product

| Segment → product | Entry channels | Capture | Qualify | Convert | Close | Pay | Post-sale | North-star KPI |
|---|---|---|---|---|---|---|---|---|
| **S1 → L3 Pro (or L2)** | Meta CTWA (tricity), Google Search, organic Reels, GBP, referrals | WhatsApp (CTWA / site click-to-chat) with source code | WhatsApp Flow: course, start month, city, parent involved, age (A-GRO-18 rates) | Counsellor call/voice note <5 min; send student portfolio PDF + fee sheet | **Campus visit with parent** (Sat/Sun slots); meet trainer; see live class; founder escalation if needed | Token ₹5,000 → instalments / no-cost EMI | Onboarding group; portfolio day; review + referral ask | QL→enrol %; median first response |
| **S2 → L1 Taster → L3 Flex / L2** | Meta (women 25–40, tricity), Facebook, society WhatsApp groups, referrals | Booking page / CTWA → payment link | Ticket purchase = QL | **Taster attended** (3 h, do one look) | Same-day 1:1 counselling (spouse welcome); taster fee credited for 30 days | EMI / instalments | As S1 | Taster → enrol % within 60 days |
| **S7 → L3 Destination** | Google Search (city + "Chandigarh"), regional CTWA (Punjabi/Hindi), YouTube, regional alumni | WhatsApp | Flow + city ≠ tricity → S7 tag | **Online Parents & Students Info Session** (monthly, Sunday 7 pm) → video counselling with parents | Accommodation partner intro; optional regional pop-up taster; campus visit on arrival | Token + EMI | Local-guardian form; weekly parent updates | Out-of-town enrolments; % enquiries from outside tricity |
| **S3 → L4 Masterclass → L5** | Founder and academy Reels, WhatsApp Community/Channel, retargeting, peer referral, salon owners | Waitlist via WhatsApp keyword ("AIRBRUSH") | Self-qualified | Launch sequence: announce → 72-h early-bird → "last 3 seats" (only if true) | Self-serve payment link | Full payment (UPI/card) | Upsell next L4 + Pro Circle | Sell-through %; repeat rate |
| **S5 → L1-S5 Self-Makeup** | Seasonal Reels, Search ("self makeup class Chandigarh"), bridal vendor partners (boutiques, photographers) | Landing page with dates | — | — | Instant booking; group/bridal-party booking | Full payment | Review; 1–5% career upgrade (A-GRO-30) | Seats filled; cost per booking |
| **S6 → L4 Camera Makeup** | Direct creator outreach | DM | Fit check (audience in target geos) | Barter/discount seat for content | Collab Reel with tracked code | — | Referral code | Leads per collab |
| **Salon B2B → L4 cohort** | Account outreach (owners) | Call/visit | Staff count, skill gap | Proposal | Group invoice | Bank/UPI | Placement partnership | Cohorts/quarter |

---

## 4. Stage definitions, owners and KPIs

Adopted from S-CUS §8.1 and refined for PNA. One CRM status per stage. Entry events are logged automatically where possible.

| # | Stage | Entry definition (event) | Exit / disqualify | System of record | Owner | KPIs (target at gate) |
|---|---|---|---|---|---|---|
| 0 | **Reach** | Impressions / unique reach (paid + organic); Search impressions; GBP views | — | Meta, Google Ads, GBP, IG Insights | Marketing | Reach in target geos; % female 17–35; frequency |
| 1 | **Engaged** | Profile visit, save/share, ≥3-s view or ThruPlay, link click, GBP action (call/website/directions), site session ≥30 s | — | Platform analytics, GA4 | Marketing | CTR (Meta link ≥1.0%, Search ≥5%) [HYP]; cost per engaged user |
| 2 | **Lead** | Identifiable contact (WhatsApp/phone) **with consent and a source tag**: CTWA chat, click-to-chat, form, call ≥30 s, DM with number, walk-in, referral code, event sign-up | Duplicate / spam / wrong number | WhatsApp BSP → CRM | Admissions | Leads by source; CPL; **source tagged ≥95%** |
| 3 | **Qualified lead (QL)** | All of: named course interest; age ≥17; intended start ≤90 days; location/format feasible; fee shared and not rejected | Disqualified (reason code) or **Nurture** (start >90 days) | CRM `QL=Y` + reason codes | Counsellor | Lead→QL %; cost per QL; **median first response <5 min; P90 <30 min**; % human-contacted ≤1 h ≥90% |
| 4 | **Counselled / Demo** | Completed counselling call/video ≥10 min, **or** campus visit, **or** attended taster/info session + 1:1 | No-show (rebook ×2), Lost (reason) | CRM activity; attendance | Counsellor / trainer | QL→counselled %; show-up %; **% S1 with parent present ≥60%**; founder-touch flag |
| 5 | **Applied** | Application form + **token ₹5,000** paid (A-GRO-39) | Token refunded (reason) | CRM + payment gateway | Admissions | Counselled→applied %; days lead→application; objection codes |
| 6 | **Enrolled** | First instalment / full fee / EMI approved; batch assigned | Drop before start (reason) | Accounts + CRM | Admissions / finance | Applied→enrolled %; CAC by source; EMI share; discount depth (target 0) |
| 7 | **Completed** | ≥80% attendance + assessment passed + portfolio (≥8 looks) produced | Dropout (reason) | Attendance/LMS | Academic head | Completion %; practice hours; live models per student |
| 8 | **Advocate** | Any of: Google review; consented testimonial/video; referral that becomes a lead; reported paid booking | — | CRM alumni table; quarterly survey | Alumni / marketing | Review rate; NPS; referral leads per alumnus; **% with paid booking ≤90 days**; median year-1 bookings |

**Side statuses:** Nurture (future intake), Disqualified, Lost (reason), Duplicate, Do-not-contact. Lost-reason codes are in `execution/technology_and_crm_requirements.md` §5.4.

---

## 5. Speed-to-lead SLA and follow-up cadence

### 5.1 SLA [REC]

| Item | Standard | Rationale |
|---|---|---|
| Working hours | Mon–Sat 10:00–19:30; **Sun 11:00–17:00** (parents are free at weekends) | Coverage when families decide [HYP] |
| Instant acknowledgement | 24/7 auto-reply ≤1 min with WhatsApp Flow (4 questions) + fee range + "a counsellor will message you by HH:MM" | Speed-to-lead odds fall >6× within the first hour (S-CUS-20) [CLAIM, 2007 vendor study, US-only] |
| First human reply (working hours) | **Median <5 min; P90 <30 min** | 5 vs 30 min = 21× qualification odds (S-CUS-20) [CLAIM, 2007 vendor study, US-only]; we model only 1.3–2.0× (A-CUS-16) [HYP] |
| After-hours leads | Human reply by 10:30 next working day; first in queue | — |
| QL call / voice note | Within 1 working hour of qualification | — |
| Counselling or visit booked | Within 48 h of QL; held within 7 days | Momentum before competitor demos |
| Post-counselling summary | Within 24 h: WhatsApp summary + fee sheet + EMI + next batch + portfolio link | — |
| Escalation | Unassigned at 5 min → backup counsellor; 30 min → growth lead; daily SLA report | Founder is **not** the inbox (CA-04) |

### 5.2 Follow-up cadence (career leads not yet counselled) [REC]

| Day | Action | Channel | Content | WhatsApp cost note |
|---|---|---|---|---|
| D0 | Reply + call attempt ×2 | WhatsApp + phone | Answer the question first (incl. fee), then qualify | Free inside service window (S-GRO-01) |
| D1 | Proof | WhatsApp | 30-s student transformation video + portfolio PDF | Free if within 24 h of last user message / 72-h CTWA window |
| D3 | Parent angle | WhatsApp | Parent pack PDF + parent-visit slots | Template if window closed (marketing ≈₹0.86–1.09/msg [CLAIM], S-GRO-02/04) |
| D7 | Batch urgency (true dates only) | WhatsApp + call | Next batch date, seats taken, taster invite | Template |
| D14 | Last personal touch | Call | "Shall I keep you posted for the next intake?" | — |
| D30+ | Nurture | WhatsApp Channel / broadcast (opt-in) | Monthly student-work digest; pre-intake reactivation | Template |

**Rules:** max 6 touches in 14 days; stop on opt-out; every touch logged; lost reason mandatory to close.

---

## 6. Counselling scripts (outline)

### 6.1 Student (career) script, 20–25 min (counsellor) [REC]

| Step | Goal | Key lines / questions | Proof to show | Log in CRM |
|---|---|---|---|---|
| 1. Open (1 min) | Rapport; confirm source | "You found us through [Reel/Google]: what caught your eye?" | — | Source confirmation |
| 2. Discover (6 min) | Goal, timeline, experience, constraints, decision unit | "Where do you see yourself in a year: bridal freelancer, salon, own studio?" · "Have you done any makeup course?" · "When do you want to start?" · "Who else will decide with you?" · "Which city will you work in?" | — | Goal, start month, experience, parent/spouse, city |
| 3. Show (6 min) | Make the outcome concrete | "Here is what students did in week 1 vs week 10." · "These are 3 alumni from [their city/situation]." | Portfolio PDF; outcomes card (once available); practice hours; batch cap | Assets sent |
| 4. Recommend (3 min) | One programme, one format | "Given [goal + timing], I'd suggest Pro Weekday starting [date]." State fee + EMI immediately | Fee sheet; EMI calculator | Recommended product/format |
| 5. Objections (5 min) | Surface the real blocker | "What would stop you from starting on [date]?" → §7 | Matching proof asset | Objection code |
| 6. Close (2 min) | Next physical step | "Can you and your mother visit on Saturday at 12? You'll see a live class and meet [trainer]." | Visit slots | Visit booked / token link sent |
| 7. Confirm | Commitment + reminder | Send location pin, what to bring, trainer name | — | Next action + date |

**Do not:**
- promise income, placement or "celebrity" access
- use invented scarcity
- discount to close (use taster credit or EMI instead)
- forward the lead to the founder as a default

### 6.2 Parent / spouse ("risk") script, 15–20 min (counsellor or academic head; founder for escalations)

| Step | Parent concern | What we say / show |
|---|---|---|
| Career legitimacy | "Is this a real career?" | Market evidence: Tricity bridal listings show starting prices of ₹14k–45k per function for established artists (median ₹25k) (S-CUS-01). New graduates start lower (A-CUS-01: ₹8k–18k). Salaried routes ₹12–25k/month (S-CUS-06/07). PNA alumni outcome distribution (once published). **Never best-case as typical** |
| Safety | Timings, staff, travel | Female-led studio; class timings; attendance updates to parents weekly; (S7) vetted accommodation partners + local guardian form |
| Money | Fee, hidden costs, refund | Published fee, itemised optional kit, EMI terms, written refund/transfer policy |
| Quality | "Who will teach?" | Named trainers + stated founder hours; batch cap ≤12; live-model hours |
| Proof | "Can we see?" | Live class visit; unretouched portfolio; alumni call (consented) |

### 6.3 Variants
- **S7 video counselling:** same flow on video, with the parent present by default. Send the accommodation partner list and a 3-min studio tour video first.
- **S2:** lead with schedule flexibility (Flex timetable), same-life-stage alumni and the taster credit. Invite the spouse to the taster.
- **S3 (no counselling):** FAQ auto-replies (dates, inclusions, prerequisites, who teaches). A human answers only if asked.

---

## 7. Objection handling

| # | Objection | Likely segment | Response principle | Proof asset | Fallback offer |
|---|---|---|---|---|---|
| 1 | "Fee is too high" | S1, S2 | Unpack value per hour; compare like-for-like (hours, batch size, live models, kit) | "What the Pro fee buys" sheet; competitor-agnostic checklist "12 questions to ask any academy" | EMI from ₹12,500/month (6 × ₹12.5k at the ₹75k step-1 list) [HYP]; start with L2 Foundation (credited) |
| 2 | "Another academy offers 50% off" | S1 | Ask what is included (hours, batch, kit, certificate); no price-matching | Checklist; published fee policy | Taster to compare teaching quality |
| 3 | "I can learn from YouTube" | S1, S2 | YouTube teaches looks; a course gives corrected practice on live faces + portfolio + network | Week-1 vs week-10 portfolios; practice-hours count | ₹999 taster |
| 4 | "My parents say it's not a real career" | S1 | Bring the parent; give honest earnings ranges | Parent pack; outcomes report | Parent visit / online parents' session |
| 5 | "Will I get clients?" | S1, S2, S7 | Explain the booking-support system; no guarantees | Studio assisting count; salon partner list; Business of Bridal module | Alumni call |
| 6 | "Is the certificate recognised?" | S1, S7, S8 | Explain exactly what it is and is not | Certificate page; (if D9) registry link | — |
| 7 | "Will Priyanka teach me herself?" | S1, S3 | State founder hours honestly; introduce the certified educators | Hours table; trainer portfolios | Founder masterclass (L4) |
| 8 | "Safety / where will I stay?" | S7 | Written protocol; vetted partners; local guardian | Accommodation partner list; parent testimonial | Destination format (4 weeks of pre-work online shortens the Chandigarh stay) |
| 9 | "Timing clashes with college / kids' school" | S1, S2 | Offer the Flex format | Timetables | Next batch hold with token |
| 10 | "I already know basics" | S3, S2 | Skip-level assessment | Skills check during taster | L4 masterclass instead of L3 |
| 11 | "I'm too old to start" | S2 | Same-life-stage alumni stories | S2 alumni Reels | Taster |
| 12 | "Need to ask my husband" | S2 | Invite the spouse; give the ROI framing | Spouse-friendly one-pager | Taster for two (spouse free) [HYP] |
| 13 | "What if I can't continue?" | All | Transfer and refund policy in writing | Policy page | Batch transfer once |
| 14 | "Kit is expensive" | S1, S2 | Kit optional; itemised MRP; use own products if they meet the list | Kit page | Starter-kit list with budget alternatives |

---

## 8. Parent involvement, payment, EMI and refund

### 8.1 Parent track [REC]
- **Parent pack (WhatsApp PDF):** course structure, hours, fee/EMI, safety protocol, outcome distribution, refund policy, academic-head contact.
- **Parent visit slots:** Sat 11:00–14:00, Sun 11:00–13:00. Live-class viewing, trainer meeting, portfolio wall.
- **Monthly online Parents & Students Info Session** (Sunday 19:00, 45 min): founder or academic head, one alumna and her parent, Q&A. It doubles as the S7 discovery event (A-GRO-26).
- **During the course:** weekly attendance message to parents (opt-in), portfolio-day and graduation invites.
- **CRM fields:** `parent_involved` (Y/N), `parent_met` (date), `decision_maker` (self/parent/spouse).

### 8.2 Payment options [REC]

| Option | Mechanics | Who bears the cost | Notes |
|---|---|---|---|
| Token / seat-hold | ₹5,000 (A-GRO-39) via payment link; fully refundable until 14 days before start [HYP] | — | Converts "Counselled" into "Applied"; reduces drop-off (A-CUS-14) |
| Full payment | UPI/card/net-banking | Gateway ≈2% + GST (S-GRO-09, A-GRO-41) | Value-add rather than discount (e.g., free L4 "Draping") [HYP] |
| In-house instalments | Token + 2–3 instalments (before start, week 4, week 8); payment links/auto-reminders | PNA (credit risk) | Precedent: YMCA two instalments (S-IND-25) |
| **No-cost EMI via partner** | 3–9 months via GrayQuest / Propelld / Bajaj Finserv / gateway cardless EMI | **PNA subvention 3–7% [HYP] (A-GRO-35b)**; get quotes | Peers: Orane 0% EMI via Bajaj/LoanTap/SaveIN; Zuri Bajaj 0% EMI; Pearl GrayQuest (S-LC-08/13, S-CUS-36/37). GrayQuest offers 4–12 EMIs with no processing fee at one university [CLAIM, S-GRO-13]; gateway cardless EMI ≈3% + GST [CLAIM, S-GRO-09] |

**Display:** one GST-inclusive fee plus EMI, e.g., at price step 1: "₹75,000 or from ₹12,500/month (6 months, no-cost EMI*)" on every Pro page (₹90,000 / ₹15,000 after step 2). Lender terms are disclosed [REC].

**Refund/transfer policy [HYP, counsel to review]:**
- Token refundable until 14 days before the start date.
- One free batch transfer.
- Pro-rata tuition refund within week 1, minus consumables.
- The policy is published on the website.

---

## 9. Master assumption table (A-GRO-xx): for `economics/funnel_economics.xlsx`

**Conventions for the Economics agent:**
- **Vocabulary (recommended_strategy §6.3):** the forecast bundles are **Conservative / Base / Aggressive** (rate set + ₹10L / ₹30L / ₹50L Plan). The **Low/Base/High columns below are input magnitudes**, not bundle names. For cost lines (CPL, salaries, subvention) "High" feeds the **Conservative** bundle. For conversion lines "Low" feeds the Conservative bundle.
- **Prices** (A-GRO-04..09) are customer-facing list fees, one GST-inclusive number; model revenue is ex-GST (fee ÷ 1.18) and always on **realised**, not list (recommended_strategy §6.1).
- Stage rates within a route are designed as **scenario sets**. Multiplying the Low set gives the Conservative-bundle overall rate, the Base set the Base rate, and the High set the Aggressive (favourable) rate. Do not mix Low and High within one route except in explicit sensitivity runs.
- Base rates **assume the SLA in §5 is met** (A-GRO-24 applies otherwise).

### 9.1 Targets, mix and prices

| ID | Assumption | Low | Base | High | Unit | Rationale / anchor | Source | Tag | Validate by |
|---|---|---|---|---|---|---|---|---|---|
| A-GRO-01 | Career-programme enrolments (L2+L3) per month, steady state after G1 (planning case M10–M12; M7–M12 if G1 at M6) | 6 | 10 | 15 | enrol/mo | Today <60/yr all courses (CA-01, ≈≤5/mo). Base 120/yr is ≈16% of the reconciled tricity makeup-led market of ≈730 learners/yr (₹3.27 cr; some PNA enrolments will be out-of-town); CA-05 (1,256, makeup + beauty-artistry) is an upper reference only. **Gated plan target, not a forecast**; ₹10L-Plan fallback ≈52 career students/yr. High = S-CUS §8.3 worked example | CA-01; recommended_strategy §5, §6.4, §10 #14 | [HYP] | V1 + months 4–6 actuals |
| A-GRO-02 | Pro (L3) share of career enrolments | 50% | 60% | 70% | % | Flagship-led positioning; Foundation as lower-risk entry | — | [HYP] | V1 |
| A-GRO-03 | Route mix of career enrolments | — | CTWA 30% · Paid Search 20% · Organic (IG/site/GBP/SEO) 20% · Referral/walk-in 20% · Taster 10% | — | % | Referral reportedly today's engine (S-CUS §2); Search high-intent (S-CUS §6f). Organic + referral = 40% (4.0 enrolments/month at base vs ≈2.5 today): **unevidenced +60% uplift [HYP]**, see A-GRO-43/44 (RT-08) | — | [HYP] | V1, V6; re-base at M4 |
| A-GRO-04 | L1 Taster ticket price | ₹499 | ₹999 | ₹1,999 | ₹ | Orane ₹499 (S-NC-17); Airblack from ₹150 (S-CUS-33); local free demos (S-LC-13/23) | S-NC-17 | [HYP] | T3 |
| A-GRO-05 | L2 Foundation fee | ₹30,000 | ₹39,900 | ₹50,000 | ₹ | Zuri cert from ₹25k (S-LC-13); JH ₹35k (S-NC-31); Lakmé 64 h from ₹47k (S-NC-01) | as listed | [HYP] | V3, V5 |
| A-GRO-06 | L3 Pro list fee (GST-inclusive; excl. optional kit) | ₹75,000 (step-1 list) | ₹90,000 (step-2 list) | ₹1,20,000 | ₹ | Local diploma ₹35–75k; Zuri adv ₹80k–1.2L; Lakmé ₹1.3–1.5L (S-LC §6, S-NC-02); A-CUS-06. **Two-step path (recommended_strategy §7.2): current fee (CA-02 ₹40k/60k/75k) → ₹75k list at proof gate 1 → ₹90k list at proof gate 2; ₹80k realised is the planning fee** | CA-02, A-CUS-06, recommended_strategy §6.1/§7.2 | [HYP] | V1, V3, V5, T5 |
| A-GRO-07 | L4 masterclass average ticket | ₹5,000 | ₹10,000 | ₹18,000 | ₹ | Airblack ₹4,999 (S-CUS-34); Nykaaland ₹12,500 (S-CUS-54); Zuri HD/Airbrush ₹12k+ (S-LC-13); A-CUS-07 | as listed | [HYP] | V6 |
| A-GRO-08 | L1-S5 Self-makeup workshop price | ₹3,000 | ₹4,999 | ₹8,000 | ₹ | YMCA ₹7,080 (S-CUS-38); Nav Brar ₹15k 4-day (S-LC-28); A-CUS-08 | as listed | [HYP] | V6 |
| A-GRO-09 | L5 Pro Circle membership | ₹4,999 | ₹9,999 | ₹14,999 | ₹/yr | No paid Indian anchor; Kryolan PRO CARD discount model (S-INT-49) | S-INT-49 | [HYP] | Pilot |

### 9.2 Paid media efficiency

| ID | Assumption | Low | Base | High | Unit | Rationale / anchor | Source | Tag | Validate by |
|---|---|---|---|---|---|---|---|---|---|
| A-GRO-10 | Meta CTWA cost per lead (conversation with number), tricity | ₹150 | ₹300 | ₹600 | ₹/lead | A-CUS-09 ₹100–600; vendor India education ₹150–800 | S-CUS-28/29 | [HYP] | T1 |
| A-GRO-11 | Meta CTWA CPL, regional (Punjab/HP/Haryana/J&K tier-2) | ₹120 | ₹250 | ₹500 | ₹/lead | Vendor claim tier-2 cheaper (S-CUS-29); lower lead quality offsets | S-CUS-29 | [HYP] | T6 |
| A-GRO-12 | Google Search CPL (call ≥30 s / WhatsApp click / form) | ₹300 | ₹500 | ₹800 | ₹/lead | A-CUS-10 ₹250–800; vendor ₹150–800 (S-CUS-28/30) | S-CUS-28/30 | [HYP] | Months 2–4 |
| A-GRO-13 | Meta link CTR / click→lead | 0.8% / 8% | 1.5% / 15% | 2.5% / 25% | % | LocaliQ education lead ads CTR 1.74%, CVR 15.87% (US) | S-CUS-26 | [HYP] | T1–T2 |
| A-GRO-14 | Search CTR / click→lead | 5% / 8% | 7% / 12% | 9% / 16% | % | LocaliQ education Search CTR 7.56%, CVR 13.14% (US) | S-CUS-25 | [HYP] | Months 2–4 |
| A-GRO-15 | Cost per Taster ticket sold | ₹200 | ₹400 | ₹700 | ₹/ticket | S-CUS §8.2 ₹200–600 | S-CUS §8.2 | [HYP] | T3 |
| A-GRO-16 | Cost per masterclass lead (warm/retargeting) | ₹50 | ₹150 | ₹300 | ₹/lead | A-CUS §8.2 ₹50–300 | S-CUS §8.2 | [HYP] | Launches |
| A-GRO-17 | Cost per self-makeup lead | ₹100 | ₹200 | ₹400 | ₹/lead | A-CUS §8.2 ₹100–400 | S-CUS §8.2 | [HYP] | Season |
| A-GRO-18b | Paid share of masterclass / self-makeup leads | 30% / 40% | 50% / 60% | 70% / 80% | % | Warm/organic audiences carry S3; S5 more paid | — | [HYP] | Months 2–6 |

### 9.3 Career-programme conversion by route (scenario sets)

| ID | Route | Rate set | Lead→QL | QL→Counselled | Counselled→Applied | Applied→Enrolled | **Overall lead→enrol** | Anchor | Tag |
|---|---|---|---|---|---|---|---|---|---|
| A-GRO-18 | Meta CTWA (+Flow) | Low / Base / High | 35 / 40 / 45% | 45 / 55 / 65% | 25 / 30 / 35% | 75 / 80 / 85% | **2.95 / 5.28 / 8.70%** | A-CUS-11..15 (paid social 3–8%) | [HYP] |
| A-GRO-19 | Paid Search (+GBP call) | Low / Base / High | 40 / 45 / 50% | 50 / 60 / 65% | 28 / 32 / 35% | 75 / 80 / 85% | **4.20 / 6.91 / 9.67%** | A-CUS-15 Search 5–10%; vendor Google 25–40% L→QL (S-CUS-29) | [HYP] |
| A-GRO-20 | Organic (IG DM, site click-to-chat/form, GBP, SEO) | Low / Base / High | 30 / 38 / 45% | 45 / 55 / 65% | 25 / 30 / 35% | 75 / 80 / 85% | **2.53 / 5.02 / 8.70%** | Form L→QL 15–30% (A-CUS-11) blended with warmer DMs | [HYP] |
| A-GRO-21 | Referral / alumni / walk-in | Low / Base / High | 60 / 70 / 80% | 70 / 75 / 80% | 50 / 55 / 60% | 80 / 87 / 92% | **16.8 / 25.1 / 35.3%** | A-CUS-15 referral 20–40%, walk-in 25–50% | [HYP] |
| A-GRO-22 | Taster route (ticket buyer = QL) | Low / Base / High | Ticket→attend 75 / 82 / 90% | Attendee→counselled 50 / 65 / 80% | Counselled→enrolled ≤60 d 16 / 20 / 25% | (incl.) | **6.0 / 10.7 / 18.0% per ticket** (attendee→enrol 8 / 13 / 20% = A-CUS-19) | A-CUS-18/19 | [HYP] |

### 9.4 Modifiers and other products

| ID | Assumption | Low | Base | High | Unit | Rationale / anchor | Source | Tag | Validate by |
|---|---|---|---|---|---|---|---|---|---|
| A-GRO-23 | Applied (token) share refunded/lost before start | 15% | 20% | 25% | % | Complement of applied→enrolled | A-CUS-14 | [HYP] | V1 |
| A-GRO-24 | Lead→QL multiplier **if SLA not met** (median >1 h) | 0.50× | 0.67× | 0.77× | × | Inverse of A-CUS-16 1.3–2.0× uplift; far below MIT/HBR odds (US-only [CLAIM]); H7 plausible, untested | S-CUS-20/22 | [HYP] | V2, V7 |
| A-GRO-25 | Founder-touch multiplier on counselled→applied | 1.0× | 1.25× | 1.5× | × | A-CUS-30; base rates assume ~50% founder touch in year 1, falling to ≤30% by month 18 | A-CUS-30 | [HYP] | CRM flag |
| A-GRO-26 | Online parents' session: registrant→attendee / attendee→counselling booked | 25% / 20% | 35% / 30% | 45% / 40% | % | A-CUS-17 (ON24 B2B 55% is ceiling) | S-CUS-23 | [HYP] | Months 3–6 |
| A-GRO-27 | Masterclass lead→purchase | 15% | 25% | 35% | % | A-CUS-20 | — | [HYP] | Launches |
| A-GRO-28 | Self-makeup lead→booking | 10% | 17% | 25% | % | A-CUS-21 | — | [HYP] | Season |
| A-GRO-29 | Masterclass repeat purchase (S3/alumni) per year | 25% | 30% | 40% | % | A-CUS-31; Airblack >35% (S-CUS-33) | S-CUS-33 | [HYP] | V1 |
| A-GRO-30 | Self-makeup → career upgrade | 1% | 3% | 5% | % | A-CUS-32 | — | [HYP] | V1 |
| A-GRO-31 | Career completion | 85% | 90% | 95% | % | A-CUS-22 | — | [HYP] | V1 |
| A-GRO-32 | Review rate among completers (structured ask) | 30% | 45% | 60% | % | A-CUS-23 | — | [HYP] | Months 3–6 |
| A-GRO-33 | Referral leads per alumnus per year | 0.2 | 0.4 | 0.6 | leads | A-CUS-24 | S-CUS-42 | [HYP] | V1, V4 |
| A-GRO-34 | Referral reward per enrolled referee (cash or masterclass credit) + referee benefit | ₹2,000 | ₹3,000 | ₹5,000 | ₹ | A-CUS-24 range ₹2–5k; referee ₹2,000 off [HYP] | S-CUS §6e | [HYP] | Pilot |
| A-GRO-35 | EMI uptake (Pro) | 20% | 35% | 50% | % of enrol | A-CUS-26 | S-CUS-36 | [HYP] | V1 |
| A-GRO-35b | No-cost EMI subvention borne by PNA | 3% | 5% | 7% | % of financed amount | Gateway cardless EMI ≈3% + GST [CLAIM]; lender quotes needed | S-GRO-09 | [HYP] | Lender quotes |
| A-GRO-36 | Pro Circle paid uptake: graduates after free year / S3 buyers | 20% / 5% | 30% / 10% | 45% / 20% | % | No benchmark | — | [HYP] | Pilot |
| A-GRO-37 | Out-of-town share of career enrolments | 15% | 25% | 35% | % | A-CUS-28; A-CHD-04 | — | [HYP] | V1 |
| A-GRO-38 | Counsellor capacity | 25 | 30 | 40 | conversations/day | A-CUS-25; ≈1 FTE per ~300–400 leads/mo [EST: 30 × 24 days ÷ ~2 conversations per lead = 360] | — | [HYP] | V2 |
| A-GRO-39 | Token / seat-hold | ₹2,000 | ₹5,000 | ₹10,000 | ₹ | Judgement; Pearl requires full payment (S-CUS-37) | — | [HYP] | Months 1–3 |
| A-GRO-40 | S1 career-enquiry seasonality index (Jan…Dec) | — | 0.70, 0.80, 0.90, 1.00, 1.30, 1.35, 1.25, 1.10, 1.05, 1.00, 0.80, 0.75 (sums to 12.0) | — | index | A-CUS-29 (peaks May–Jul, Aug–Oct); wedding season Nov–Feb (S-CUS-13) | S-CUS-13 | [HYP] | V1 |
| A-GRO-41 | Payment gateway fee | 1.8% | 2.0% | 2.4% | % + GST | Razorpay standard 2% + GST [CLAIM] | S-GRO-09 | [CLAIM] | Contract |
| A-GRO-42 | Martech stack run-rate (BSP + CRM + telephony + tools) | ₹8,000 | ₹18,000 | ₹40,000 | ₹/mo | Built up in `technology_and_crm_requirements.md` §4 | S-GRO-02..12 | [EST] | Quotes |
| A-GRO-43 | Organic career leads per month (IG/site/GBP/SEO), after G1 | 25 | 40 | 60 | leads/mo | Needed for base: 2 enrol ÷ 5.0% = 40 [EST]; PNA baseline unknown (V1); the academy Instagram account is new. **Part of the non-paid engine uplift (2.5 → 4.0 enrolments/month, +60%): unevidenced [HYP]** (RT-08) | — | [HYP, unevidenced] | V1 baseline + CRM organic lead counts M1–M4; re-base at the Feb (M4) review; fallback: hold non-paid flat at ≈2.5 enrolments/month |
| A-GRO-44 | Referral + walk-in career leads per month, after G1 | 5 | 8 | 12 | leads/mo | Needed for base: 2 ÷ 25.1% = 8 [EST]; supply check: ~120 alumni × 0.4 ÷ 12 ≈ 4 referral leads + walk-ins, i.e. **about half of what the base needs. Part of the unevidenced +60% non-paid uplift [HYP]** (RT-08) | A-GRO-33 | [HYP, unevidenced] | V1 alumni-list size and consent rate (founder decision D1/D9); CRM referral counts M1–M4; re-base at M4 |

### 9.5 Growth-team and production cost assumptions (reconcile with Operations agent)

| ID | Assumption | Low | Base | High | Unit | Basis | Tag |
|---|---|---|---|---|---|---|---|
| A-GRO-45 | Admissions counsellor (Chandigarh, FTE, incl. incentive) | ₹20,000 | ₹25,000 | ₹32,000 | ₹/mo | Judgement anchored on local salon/MUA wage postings ₹20–25k (S-CUS-07) and mid beautician ₹23.5k (S-CUS-06) [CLAIM]; get 3 local quotes | [EST] |
| A-GRO-46 | Marketing / content executive (social + WhatsApp + community) | ₹25,000 | ₹35,000 | ₹45,000 | ₹/mo | Judgement; validate via job portals | [EST] |
| A-GRO-47 | Freelance shooter/editor retainer | ₹12,000 | ₹20,000 | ₹35,000 | ₹/mo | Judgement; validate with 3 quotes | [EST] |
| A-GRO-48 | Performance-marketing freelancer/agency | ₹10,000 | ₹20,000 | ₹35,000 | ₹/mo | Judgement (or 10–15% of spend) | [EST] |
| A-GRO-49 | Website rebuild (one-off) | ₹50,000 | ₹1,20,000 | ₹2,50,000 | ₹ | Judgement; platform costs in tech file | [EST] |
| A-GRO-50 | SEO content freelancer | ₹8,000 | ₹15,000 | ₹25,000 | ₹/mo | Judgement | [EST] |

---

## 10. Instrumented funnel: monthly target model

### 10.1 Base case: 10 career enrolments/month (A-GRO-01 base), base rates and base CPL

Volumes are per month, computed from A-GRO-03 (mix), A-GRO-18..22 (rates), A-GRO-10/12/13/14/15 (cost) **[EST, arithmetic from HYP inputs]**.

**Caution (RT-08):** the organic and referral columns (4.0 enrolments/month together, against ≈2.5/month today per the Economics baseline) assume a **+60% non-paid uplift at zero media cost. This is an unevidenced [HYP].** It is validated by the V1 founder data pull (current organic/referral baseline, alumni-list size and consent rate) and by CRM organic/referral lead counts in M1–M4, re-based at the February (M4) review. If the uplift does not appear, hold the non-paid engine flat at ≈2.5/month and either accept fewer enrolments or buy the gap at the paid-route CAC.

| Stage | Meta CTWA | Paid Search | Organic | Referral / walk-in | Taster route | **Total** | Tag |
|---|---|---|---|---|---|---|---|
| Reach (impressions) | ≈25,300 | ≈3,400 | not modelled | not modelled | in Meta | — | [EST] |
| Engaged (clicks) | ≈380 | ≈240 | not modelled | not modelled | in Meta | — | [EST] |
| **Lead** | 56.8 | 28.9 | 39.9 | 8.0 | 9.4 tickets | **143** | [EST] |
| **QL** | 22.7 | 13.0 | 15.2 | 5.6 | 9.4 | **65.9** | [EST] |
| **Counselled / Demo** | 12.5 | 7.8 | 8.3 | 4.2 | 7.7 attended → 5.0 counselled | **37.8** (incl. 5.0) | [EST] |
| **Applied** (token) | 3.8 | 2.5 | 2.5 | 2.3 | 1.2 | **12.2** | [EST] |
| **Enrolled** | 3.0 | 2.0 | 2.0 | 2.0 | 1.0 | **10.0** | [EST] |
| Completed (A-GRO-31, 90%) | 2.7 | 1.8 | 1.8 | 1.8 | 0.9 | **9.0** | [EST] |
| Advocate: reviews (A-GRO-32, 45%) | | | | | | **≈4.1 reviews/mo** | [EST] |
| Advocate: referral leads generated (A-GRO-33, 0.4/yr) | | | | | | **≈0.3 per month per monthly cohort** (accumulates with alumni base) | [EST] |
| Media / reward cost | ₹17,045 | ₹14,468 | ₹0 (fixed SEO/content cost) | ₹6,000 rewards (2 × ₹3,000) | ₹3,752 (offset by ₹9,371 ticket revenue) | **₹35,265 media + ₹6,000 rewards** | [EST] |
| Cost per QL | ₹750 | ₹1,111 | — | — | ₹400 | — | [EST] |
| Media CAC per enrolment | ₹5,682 | ₹7,234 | — | ₹3,000 | ₹3,752 (≈ −₹5.6k net of tickets) | **₹5,878 per paid enrolment** (6 paid) | [EST] |

**Arithmetic check (CTWA):** 3.0 ÷ 5.28% = 56.8 leads; × 40% = 22.7 QL; × 55% = 12.5 counselled; × 30% = 3.75 applied; × 80% = 3.0 enrolled; 56.8 × ₹300 = ₹17,045.

### 10.2 Same target under Conservative / Base / Aggressive rate sets

| Scenario (all routes) | Conversion set | CPL set | Leads needed | Media cost / mo | Media CAC per paid enrolment (6) | Blended CAC incl. rewards (÷10) | Tag |
|---|---|---|---|---|---|---|---|
| Conservative | Low | High (₹600 / ₹800 / ₹700 ticket) | **≈257** | **≈₹1,10,700** | **≈₹18,450** | ≈₹12,070 | [EST] |
| Base | Base | Base | **143** | **≈₹35,300** | **≈₹5,880** | ≈₹4,130 | [EST] |
| Aggressive (favourable rates) | High | Low (₹150 / ₹300 / ₹200 ticket) | **≈89** | **≈₹12,500** | **≈₹2,080** | ≈₹1,650 | [EST] |

**Read-out:**
- CAC moves ~9× between rate sets. At Base, media CAC is ≈7% of the ₹80k realised planning fee. In the Conservative case it is ≈23%.
- Weighted career fee at Base ≈ ₹64k [EST: 60% × ₹80k realised + 40% × ₹39.9k]. Against spend gate **SG4** (Economics thresholds, recommended_strategy §7.1: media CAC per paid career enrolment ≤₹9k green, ₹9–12k amber, >₹12k red), the Base case (≈₹5.9k) is green and the Conservative case (≈₹18.5k) is red (`growth_marketing_strategy.md` §9).
- SG4 also tests **fully loaded acquisition** (media + growth team + tools + rewards + EMI subvention) as a share of career revenue: **≤40% is green; 40–50% is amber, which requires a founder review and is not a pass; >50% is red.** The Year-1 plan runs at about **49% on the step-1 fee**, because the growth team is hired ahead of volume while proof is built. This is an accepted Year-1 inefficiency; SG4 green is a Year-2 expectation (≤30% from Year 2).

### 10.3 Other products, base month (steady state, season-averaged)

| Product | Target | Conversion | Leads needed | Paid share × CPL | Media | Revenue (gross, list) [EST] |
|---|---|---|---|---|---|---|
| L4 Masterclass | 24 seats (2 sessions × 12) | 25% (A-GRO-27) | 96 | 50% × ₹150 | ₹7,200 | 24 × ₹10,000 = ₹2,40,000 |
| L1-S5 Self-makeup | 15 seats (season avg; peaks Sep–Feb) | 17% (A-GRO-28) | 88 | 60% × ₹200 | ₹10,600 | 15 × ₹4,999 = ₹74,985 |
| Parents' info session | 30 registrants | 35% attend; 30% book counselling (A-GRO-26) | (overlaps career leads) | — | — | 3.2 counselling bookings |

### 10.4 Capacity check (counsellor load)

| Item | Base | Conservative (same target) |
|---|---|---|
| Career leads/month | 143 | 257 |
| Masterclass + self-makeup leads/month | 184 | ~260 [EST, low conversion] |
| Conversations/month [EST: career × 2.5; other × 0.5] | 143 × 2.5 + 184 × 0.5 ≈ **450** | 257 × 2.5 + 260 × 0.5 ≈ **770** |
| Per working day (24 days) | **≈19** | **≈32** |
| Counsellors needed (A-GRO-38 base 30/day) | **1 FTE + backup** | **1–2 FTE** |
| At A-GRO-01 high (15/mo, base rates) | ≈215 career leads → ≈26/day → **1 FTE at limit; hire 2nd** | — |

**Implication (H7, plausible but untested until the V7 pilot):** the binding constraint is **counselling discipline and who counsels**, not lead volume. The founder cannot be the inbox (CA-04).

---

## 11. Notes for the Economics agent
1. Build the model **route by route** (A-GRO-18..22), not as one blended rate. Mix shifts (A-GRO-03) change CAC materially.
2. Apply **A-GRO-40 seasonality** to lead volume and **A-GRO-24** as an SLA-failure sensitivity.
3. Treat taster ticket revenue (A-GRO-04) as an offset to taster media, and taster credits as a reduction in L2/L3 realised fee.
4. Include EMI subvention (A-GRO-35 × A-GRO-35b), gateway fees (A-GRO-41) and referral rewards (A-GRO-34) in CAC/contribution.
5. Growth-team costs (A-GRO-45..50) may overlap the Operations agent's org design. Reconcile and do not double count.
6. Current fee is CA-02 (₹40k/60k/75k). Model the **two-step price path** (recommended_strategy §7.2, §11.3): ₹75k list at proof gate 1, ₹90k list at proof gate 2, with **₹80k realised** as the planning fee; never assume ₹90k from month 1.

---

## Sources

**Research-file IDs** (URLs and dates in `research/source_fragments/*`; accessed 2026-10-16):
- **Customers:** S-CUS-01, 03, 06, 07, 13, 14, 16, 17, 20, 22, 23, 25–33, 36, 37, 42.
- **Local competitors:** S-LC-08, 13, 23, 28.
- **National competitors:** S-NC-01, 02, 11, 16, 17, 31.
- **India market:** S-IND-25.
- **International:** S-INT-49.

**New web sources (this workstream; accessed 2026-10-16):**
- **S-GRO-01** Meta for Developers, *WhatsApp Business Platform: Pricing*. https://developers.facebook.com/docs/whatsapp/pricing . Per-message pricing since 1 Jul 2025; service conversations free since 1 Nov 2024; 72-h free entry-point window when replying to CTWA within 24 h; India higher marketing rate from 1 Jan 2026; INR billing migration by 31 Dec 2026. [FACT] (fetched)
- **S-GRO-02** AiSensy, *WhatsApp pricing calculator*. https://aisensy.com/whatsapp-business-pricing-calculator-free . Marketing ₹1.09/msg; utility ₹0.145/msg (excl. GST; includes BSP pricing). [CLAIM] (fetched)
- **S-GRO-04** Whautomate, *WhatsApp Business API pricing India*. https://whautomate.com/whatsapp-business-api-pricing-india . Meta India marketing ≈₹0.8631/msg; utility ≈₹0.115/msg. [CLAIM] (search extract)
- **S-GRO-09** Razorpay, *Payment gateway pricing explained*. https://razorpay.com/blog/razorpay-payment-gateway-pricing-explained/ . 2% + GST standard. Cardless EMI ≈3% + GST per aggregators (https://www.softwaresuggest.com/blog/razorpay-payment-gateway-charges/). [CLAIM] (search extract)
- **S-GRO-13** GrayQuest EMI terms at partner institutions: https://www.msruas.ac.in/uploads/pdf/1-GQ-Short-term-EMIs.pdf (4–12 EMIs, no processing fee); https://www.nmims.edu/docs/Grayquest.pdf (rates from 2.5% p.a.). [CLAIM] (search extract)
