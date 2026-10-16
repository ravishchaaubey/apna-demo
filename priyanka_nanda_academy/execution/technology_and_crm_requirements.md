# Technology and CRM Requirements: Minimum Viable Growth Stack

**Client:** Priyanka Nanda Makeup Academy (PNA), Chandigarh · **Workstream:** Growth & MarTech · **Prepared:** 2026-10-16 · **Agent:** Growth and MarTech Agent (Opus)
**Serves:** `strategy/admissions_funnel.md` (stages, SLA, automations), `strategy/growth_marketing_strategy.md` (gates G1–G2 depend on this stack), `execution/marketing_channel_plan.md`.

**Tags:** [FACT] · [CLAIM] · [EST] · [HYP] · [REC].
**Cost caveat:** vendor prices come from vendor pages or third-party comparisons fetched on 2026-10-16. **Several conflict, and all exclude 18% GST unless stated.** Treat every price as **[CLAIM]/[EST]** and get written quotes before contracting. Sources are listed at the end (S-GRO-xx).

---

## 1. Summary and recommended stack

**Design principle:** a small academy needs **one WhatsApp-centred inbox, one lead record per person, enforced SLA timers, and conversion feedback to ad platforms**. It does not need an enterprise CRM. Buy only what gates G1 (tracking) and G2 (follow-up discipline) require. Add an LMS only when the hybrid business case is approved.

| Layer | Phase 0 (weeks 1–4; ≈₹3–5k/mo) | **MVP (from week 5; ≈₹18k/mo base)** | Scale (multi-counsellor / regional / hybrid; ≈₹30–40k/mo) |
|---|---|---|---|
| Website | Current site + WhatsApp sticky bar + fee page | Rebuilt course pages on current platform or WordPress (§3.1) | Same; add city pages, outcomes hub |
| WhatsApp | WhatsApp Business **API via a BSP** from day 1 (Business App is not enough for multi-agent work, Flows or CTWA attribution) | BSP growth plan (AiSensy Pro / Interakt mid-tier) with Flows + multi-agent inbox | BSP premium tier; chatbot flows |
| CRM | BSP labels + Google Sheet lead log (baseline only) | **TeleCRM** or **Zoho CRM Standard/Professional**, 3 seats, integrated with the BSP | Zoho Professional 5+ seats; LeadSquared only at multi-centre scale |
| Telephony | Counsellor mobile + CRM call logging | 1–2 tracked virtual numbers (GBP, Google Ads) | Contact-centre seats per counsellor |
| Analytics | GA4 + GTM + Meta Pixel + Google Ads conversions | + Meta CAPI for business messaging (CTWA events) + Google offline conversion import + Looker Studio dashboard + Clarity | + server-side tagging (optional) |
| Payments | Razorpay payment links | + payment pages (taster, masterclass), instalment links, **EMI partner** | + subscriptions (Pro Circle) |
| Booking | WhatsApp Flow / manual | Booking tool (visits, tasters) | Same |
| LMS | — | — | Graphy / Exly / similar **only for the hybrid pilot** |

**Indicative run-rate (A-GRO-42):** ≈₹8k (C) / ≈₹18–20k (B) / ≈₹30–40k (A) per month incl. GST and WhatsApp message fees [EST], built up in §4.

---

## 2. Requirements

### 2.1 Functional requirements [REC]

| ID | Requirement | Priority | Supports |
|---|---|---|---|
| FR-01 | Capture every lead from CTWA, click-to-chat, website form, Meta lead form, calls, IG DM, walk-in, referral, events into **one record keyed on phone (E.164)** with duplicate merge | Must | G1 |
| FR-02 | Store **first-touch and last-touch source** (channel, source, medium, campaign, ad id, `ctwa_clid`, `gclid`, entry code, landing page) | Must | G1, CAC by route |
| FR-03 | WhatsApp **Flows** for qualification (course, start month, city, parent involved, age band) written to CRM fields | Must | Lead→QL, SLA |
| FR-04 | Multi-agent shared inbox with auto-assignment (round-robin, by product/geo/language), internal notes and labels | Must | G2 |
| FR-05 | **SLA timers**: first-response clock, escalation at 5 min / 30 min, breach reporting (median, P90) | Must | G2 |
| FR-06 | Task cadence (D0–D14) with reminders; templated nudges when the 24-h window has closed | Must | G2 |
| FR-07 | Pipeline stages = funnel stages (`admissions_funnel.md` §4) with mandatory lost/disqualify reason | Must | G1, G2 |
| FR-08 | Visit/taster booking with reminders (24 h, 2 h) and location pin | Must | QL→counselled |
| FR-09 | Payment links (token, instalments, workshops) with status written back to CRM | Must | Applied/Enrolled |
| FR-10 | **Conversion feedback:** QL and Enrolled events to Meta (CAPI, CTWA attribution) and Google (offline conversions) | Must (before scale) | G1, paid optimisation |
| FR-11 | Call logging (inbound/outbound, duration, recording where lawful) linked to the lead | Should | G2 |
| FR-12 | Broadcasts/campaigns to opted-in segments with opt-out handling | Must | Nurture, S3 launches |
| FR-13 | Alumni object: completion, portfolio link, outcome survey answers (30/90/180/365 days), referral code, Pro Circle status | Should (month 3) | G5, referral |
| FR-14 | Weekly dashboard (§9) refreshed automatically | Must | Governance |
| FR-15 | Founder-touch flag and counsellor attribution on each opportunity | Must | H3 measurement (A-GRO-25) |
| FR-16 | Role-based access, export controls, consent records | Must | Compliance (§10) |

### 2.2 Non-functional requirements
- **Mobile-first:** counsellors work on Android phones. The CRM and BSP need solid Android apps.
- **India hosting/billing:** INR billing. Meta requires WhatsApp accounts in India to migrate to INR billing by 31 Dec 2026 (S-GRO-01) [FACT].
- **Languages:** Hindi/Punjabi/English templates; Unicode support.
- **Low admin:** configurable by a non-developer after a one-off set-up by a freelancer.
- **Portability:** CSV/API export of all records. No lock-in of contact data.
- **Uptime and support:** Indian business-hours support from the vendor.

---

## 3. Component options and indicative costs

### 3.1 Website platform

| Option | Indicative cost | Pros | Cons | Fit |
|---|---|---|---|---|
| **Keep current platform** (PNA's `/post/` URLs suggest a Wix-style site; low confidence, S-LC-02) | Wix premium plans ≈US$17 (Light) / $29 (Core) / $39 (Business) per month billed annually [CLAIM, S-GRO-11]. INR pricing not found | No migration; existing branded ranking preserved | Check: custom URL slugs, schema/JSON-LD injection, GTM support, mobile speed | **Default if it passes the checklist below** |
| **WordPress** (managed shared hosting) | Hostinger India Business ≈₹249/mo intro on a 48-month term, renewing ≈₹649/mo [CLAIM, S-GRO-12]; theme/plugins ₹0–10k/yr [EST]; build ₹50k–2.5L (A-GRO-49) | Full SEO/schema control; huge freelancer pool in India; Hindi plugins | Maintenance/security updates; plugin sprawl | **Switch if the current platform fails the checklist** |
| Course-platform site (Graphy/Exly) | See §3.8 | Built-in payments/bookings | Weak local-SEO control; not a brand site | Not for the main site |

**Platform checklist (must pass all):**
1. Custom URLs per course/city.
2. JSON-LD schema (Course, EducationalOrganization, FAQPage).
3. GTM or equivalent for GA4/Meta/Google tags.
4. Mobile LCP <2.5 s on course pages.
5. Click-to-WhatsApp with dynamic pre-filled text.
6. Form hidden fields (UTM, gclid, fbclid).
7. Hindi pages.

### 3.2 WhatsApp Business Platform: BSP options

**Meta platform pricing [FACT, S-GRO-01]:**
- Per-message pricing since 1 Jul 2025.
- **Service conversations free** since 1 Nov 2024.
- **72-h free entry-point window** when replying within 24 h to a user who came from a click-to-WhatsApp ad or Page CTA (Android/iOS only).
- India marketing rate increased on 1 Jan 2026.

**Indicative India per-message rates [CLAIM]:**

| Type | Rate | Source |
|---|---|---|
| Marketing | ≈₹0.86/msg (Meta rate) to ₹1.09/msg (BSP-quoted) | S-GRO-04, S-GRO-02 |
| Utility | ≈₹0.115–0.145/msg | S-GRO-04, S-GRO-02 |

BSPs commonly add a 10–30% markup [CLAIM, S-GRO-03]. **Conflict to resolve:** AiSensy's page states service messages cost ₹0.145 after 1,000 free per month from 1 Oct 2026. That contradicts Meta's "service conversations are free" (S-GRO-01). Verify with the shortlisted BSP in writing.

| BSP | Plan prices (per month, excl. GST) | Notes | Source |
|---|---|---|---|
| **AiSensy** | Free tier (platform only); **Basic ₹1,500; Pro ₹3,200; Premium ₹9,100** | Official calculator page. Third-party reports: 5 agents included, extra agent ₹750/mo, chatbot-flow add-on ≈₹2,500/mo [CLAIM] | S-GRO-02 |
| **Interakt** (Jio Haptik) | Conflicting: ≈₹1,199–3,999/mo, or "Growth ₹2,799 / Advanced ₹3,799", or US$55/mo | Official page blocked (403) this pass | S-GRO-03 |
| Wati, Gupshup, others | Not priced this pass | — | — |

**BSP selection criteria [REC]:**
1. CTWA referral payload (`ctwa_clid`, ad id) passed to the CRM via webhook/API.
2. **WhatsApp Flows** support.
3. **Conversions API for business messaging** or an automatic-events integration that sends Lead/Purchase back to Meta (S-GRO-15). Note Meta's Embedded Signup v2 deprecation on 15 Oct 2026; confirm the BSP uses the current version.
4. Native integration with the chosen CRM.
5. Multi-agent inbox with assignment rules.
6. INR billing.
7. Transparent markup.

### 3.3 CRM options

| Option | Indicative cost (per user/month, excl. GST) | Strengths | Gaps | Fit |
|---|---|---|---|---|
| Google Sheet + BSP labels | ₹0 | Fast baseline | No SLA timers, weak dedupe, manual reporting | **Phase 0 only (≤4–6 weeks)** |
| **TeleCRM** (India) | **₹599 (annual) – ₹849 (quarterly) core; ₹749–1,049 with WhatsApp chat sync; minimum 3 users; WhatsApp API set-up ₹1,999 one-off** (pricing page). Blog/homepage show ₹799–1,099 | Built for Indian calling + WhatsApp teams; Android SIM-call logging; lead assignment | Less flexible reporting/custom objects; verify CTWA `ctwa_clid` handling | **MVP option A** (call-heavy counselling) |
| **Zoho CRM** | **Standard ≈₹800; Professional ≈₹1,400** (annual; monthly billing higher; sources conflict) | Flexible objects (Batches, Alumni), workflows, assignment rules (Professional), Zoho Bookings/Forms ecosystem, Google Ads integration (Professional) | WhatsApp via BSP integration; set-up effort | **MVP option B** (better for alumni/batch data model) |
| LeadSquared | ≈₹2,500–6,500 per user (partner listing; possibly a 20-user minimum) | Education vertical depth | Cost/minimums excessive for 1–3 counsellors | Multi-centre scale only |
| Privyr | ≈US$15–22/mo | Instant lead alerts for solo sellers | Not a team SLA system | Not recommended |
| Neodove | ₹17,499/yr up to 10 users (search extract) | Low cost calling CRM | WhatsApp/IVR extra | Alternative to TeleCRM |

Sources: TeleCRM (S-GRO-05), Zoho CRM (S-GRO-06), LeadSquared (S-GRO-07), Privyr (S-GRO-18), Neodove (S-GRO-19). All [CLAIM].

**Recommendation [REC]:** choose the CRM by running the **CTWA attribution test**: send a test CTWA ad conversation through BSP → CRM and confirm `ctwa_clid`, ad id and campaign land on the lead record and a status change fires a CAPI event. Pick whichever of (BSP + TeleCRM) or (BSP + Zoho CRM) passes with less custom work. If both pass, choose **Zoho CRM Standard (3 seats)** for the alumni/batch data model.

### 3.4 Telephony and call tracking

| Option | Indicative cost | Use | Source |
|---|---|---|---|
| CRM Android call logging (TeleCRM / Zoho mobile) | Included | Counsellor outbound calls logged to the lead | S-GRO-05 |
| **MyOperator** virtual number | From ≈₹1,249/mo; contact-centre seats ₹1,250 (incoming) / ₹2,500 (in+out) per user/mo; office suite ₹3,750–5,000/mo (annual) | **Tracked numbers** for GBP and Google Ads; IVR; missed-call alerts to WhatsApp | S-GRO-08 [CLAIM] |
| Google Ads call assets with call conversion reporting | Ad cost only | Calls from ads (verify availability and settings in India) | [CLAIM, verify] |

**Rules [REC]:**
- Use one tracked number for GBP, one for Google Ads and one for print/events. The main number stays on the website for NAP consistency.
- Calls ≥30 s create or update a lead with source = number.

### 3.5 Analytics and attribution tools

| Tool | Cost | Purpose |
|---|---|---|
| GA4 + Google Tag Manager | Free | Site events (§8) |
| Microsoft Clarity | Free | Heatmaps, session replay for CRO |
| Meta Pixel + Conversions API (web) | Free (via platform/partner integration) | Site events → Meta |
| **Meta CAPI for business messaging** | Free (via BSP/CRM) | QL/Enrolled events from WhatsApp chats attributed with `ctwa_clid` (S-GRO-15) |
| Google Ads offline conversion import / enhanced conversions for leads | Free | QL/Enrolled back to Google (gclid or hashed phone/email) |
| Looker Studio | Free | Weekly/monthly dashboard (CRM sheet + GA4 + Google Ads native; Meta via CSV or a paid connector) |
| Server-side GTM (optional) | Hosting ≈₹1–3k/mo [EST] | Resilient tagging at scale only |

### 3.6 Booking and scheduling
- Visits, tasters and parents' sessions use a **WhatsApp Flow with appointment slots** (BSP) or a free booking tool (Zoho Bookings, Calendly or Cal.com free tiers; not priced this pass [EST: ₹0–1k/mo]).
- The booking must write to the CRM (stage 4) and trigger reminders (A5).

### 3.7 Payments, instalments and EMI

| Component | Option | Indicative cost | Source |
|---|---|---|---|
| Gateway (links, payment pages, UPI, cards) | Razorpay (alternatives Cashfree/PayU not priced) | **2% + GST** on successful standard transactions; no set-up/AMC for standard accounts | S-GRO-09 [CLAIM] |
| Cardless EMI at checkout | Gateway EMI partners | ≈3% + GST | S-GRO-09 [CLAIM] |
| **No-cost EMI / fee financing partner** | GrayQuest (fee-payment platform; claims 5,000+ institutions; partner institutions offer 4–12 EMIs, no processing fee at one university, rates from 2.5% p.a. at another), Propelld (skill-course lender, appears in competitor research), Bajaj Finserv (used locally by Orane, Zuri) | **Subvention borne by PNA: model 3–7% of financed amount (A-GRO-35b) until quotes arrive** | S-GRO-13 [CLAIM]; S-NC-20; S-LC-08/13 |
| In-house instalments | Payment links + reminders (A7) | Gateway fee only; credit risk to PNA | — |

**Requirements:**
- Payment status writes back to the CRM.
- GST invoices generated (accounting tool; Finance/Operations agent).
- Refund flow documented.
- EMI lender terms shown to students before they apply.

### 3.8 LMS for the hybrid layer (later; only after the hybrid business case is approved)

| Option | Indicative cost | Fit | Source |
|---|---|---|---|
| **Pilot first:** YouTube unlisted + Google Classroom/Drive + WhatsApp group + Zoom/Meet | ₹0–1.5k/mo [EST] | Test demand and completion for online pre-work with 1–2 cohorts | — |
| Graphy | US$49–399/mo (plan names and fees conflict across reviews); INR plans exist but were not verified | Cohort courses, live classes, payments, white-label app (higher tiers) | S-GRO-10 [CLAIM] |
| Exly | Pricing not found | Creator platform: courses, live workshops, bookings, payments, built-in CRM | S-GRO-17 [CLAIM] |

**LMS requirements for hybrid [REC]:**
- Cohort scheduling and live classes.
- **Photo/video assignment submission with trainer feedback** (makeup is visual).
- Completion tracking feeding the CRM.
- Certificate issuance.
- Mobile app or PWA.
- INR payments.
- Hindi interface/content.
- Content protection (no downloads).

### 3.9 Content and productivity
- Canva (templates, carousels) and a mobile editor (CapCut or similar). Not priced this pass [EST ₹1–2.5k/mo].
- Shared drive with a consent-tagged asset library (folder per batch; consent ID in the filename).
- A standard lighting kit for portfolio days. Capex is the Operations agent's to source.

### 3.10 Reviews and reputation
- No paid tool is needed. Send a GBP review link via a WhatsApp utility template at portfolio day/graduation (A10).
- Monitor Google reviews weekly and reply within 48 h.

---

## 4. Indicative monthly run-rate (incl. 18% GST where applicable) [EST]

| Item | C (≈₹8k) | B (≈₹18–20k) | A (≈₹30–40k) | Basis |
|---|---|---|---|---|
| WhatsApp BSP plan | AiSensy Basic ₹1,500 → ₹1,770 | AiSensy Pro ₹3,200 → ₹3,776 (+ chatbot add-on ≈₹2,500 → ₹2,950) | AiSensy Premium ₹9,100 → ₹10,738 | S-GRO-02 |
| WhatsApp message fees | ≈₹1,500 | ≈₹3,000 | ≈₹6,000 | ≈1,500–6,000 marketing/utility templates × ₹0.12–1.09 (S-GRO-02/04) |
| CRM | TeleCRM 3 × ₹599 → ₹2,120 | Zoho Professional 3 × ₹1,400 → ₹4,956 (or TeleCRM+WA 3 × ₹749 → ₹2,651) | Zoho Professional 5 × ₹1,400 → ₹8,260 | S-GRO-05/06 |
| Telephony / tracked numbers | MyOperator virtual number ₹1,249 → ₹1,474 | 2 contact-centre seats (incoming) 2 × ₹1,250 → ₹2,950 | 3 seats in+out ≈₹4,425 (blend) | S-GRO-08 |
| Website hosting | ≈₹650 (renewal rate) | ≈₹650 | ≈₹1,500 (higher tier/CDN) | S-GRO-12 |
| Analytics | ₹0 | ₹0 | ≈₹2,500 (server-side tagging / connector) | §3.5 |
| Content tools | ≈₹500 | ≈₹1,500 | ≈₹2,500 | [EST] |
| **Total** | **≈₹8,000** | **≈₹19,800** | **≈₹35,900** | A-GRO-42 low/base/high ₹8k / ₹18k / ₹40k |

**One-off costs [EST]:**
- WhatsApp API set-up ₹0–2,000 (TeleCRM lists ₹1,999, S-GRO-05).
- Integration and automation set-up by a freelancer ₹15k–40k.
- Website build (A-GRO-49).
- EMI partner onboarding: fee unknown, ask.

---

## 5. Data model

### 5.1 Objects and relationships

```
Contact (person, phone E.164 unique)
 ├── Lead / Opportunity (one per enquiry episode; product interest; source; stage)
 │     ├── Activities (WhatsApp messages, calls, visits, taster attendance, tasks)
 │     ├── Application (token payment)  ──>  Enrolment (batch, fee, payment plan)
 │     │                                         ├── Payments (token, instalments, EMI)
 │     │                                         └── Completion (attendance %, assessment, portfolio link)
 │     └── Referral (referrer Contact, code, reward status)
 ├── Alumni Outcome Surveys (30/90/180/365 days)
 ├── Pro Circle Membership (start, renewal, status)
 └── Consents (contact, WhatsApp marketing opt-in, image/testimonial, parental consent if <18)
Batch (course, format, start date, capacity, trainer, founder hours)
Course / Product (L1–L5, price, credit rules)
Campaign / Source dictionary (channel group, source, medium, campaign, ad id)
Partner (salon, college, vendor, creator, accommodation; code; agreement)
```

### 5.2 Lead / contact fields

| Field | Type | Required at | Values / format | Purpose |
|---|---|---|---|---|
| `contact_id` | ID | Lead | Auto | Key |
| `phone_e164` | Text | Lead | +91XXXXXXXXXX (unique) | Dedupe, WhatsApp |
| `name` | Text | Lead | — | — |
| `created_at` | Timestamp | Lead | Auto | SLA |
| `first_response_at` / `first_human_response_at` | Timestamp | Auto | — | **SLA (G2)** |
| `owner` | User | Lead | Counsellor | Accountability |
| `channel_group_first` / `_last` | Picklist | Lead | paid_social, paid_search, organic_social, organic_search, gbp, referral, partner, event, walk_in, direct, whatsapp_channel, other | CAC by route |
| `source_first` / `_last` | Picklist | Lead | instagram, facebook, google, youtube, website, gbp, justdial, sulekha, urbanpro, wedmegood, alumni, salon, college, creator, popup, press, other | — |
| `medium`, `campaign`, `ad_id`, `adset_id`, `creative_code` | Text | Auto | Naming conventions (§5.3) | Test read-outs |
| `ctwa_clid` | Text | Auto (CTWA) | From webhook referral | **Meta CAPI attribution** |
| `gclid` / `fbclid` / `fbp` / `fbc` | Text | Auto (web) | Hidden fields | Google/Meta feedback |
| `entry_code` | Text | Auto | e.g., W-PRO, IG-BIO, GBP, QR-STUDIO, REF-xxxx, EV-xxxx | Non-paid attribution |
| `landing_page` | URL | Auto (web) | — | CRO |
| `self_reported_source` | Picklist | QL | "How did you hear about us?" | Cross-check |
| `product_interest` | Picklist | Lead (Flow) | L1 Taster, L1-S5 Self-makeup, L2 Foundation, L3 Pro, L4 [name], L5 Pro Circle, Studio service, Job enquiry, Other | Routing |
| `format_pref` | Picklist | QL | Weekday, Flex, Fast-track, Online/hybrid (later) | Batch planning |
| `segment` | Picklist | QL | S1, S2, S3, S5, S6, S7-overlay flag, S8 flag | Reporting |
| `age_band` | Picklist | Lead (Flow) | <17, 17, 18–20, 21–25, 26–30, 31–40, 40+ | QL rule; **DPDP child-consent flag if <18** |
| `city` / `is_tricity` | Picklist / Bool | Lead (Flow) | Chandigarh, Mohali, Panchkula, Zirakpur, Kharar, Ludhiana, Jalandhar, Amritsar, Patiala, Ambala, Karnal, Shimla, Solan, Jammu, Delhi, Other | S7 routing |
| `start_month` | Month | Lead (Flow) | — | QL rule (≤90 days) / Nurture |
| `parent_involved` / `decision_maker` | Bool / Picklist | QL | self, parent, spouse, other | Parent track |
| `experience_level` | Picklist | QL | None, self-taught, course done, working artist | Product fit |
| `budget_ok` | Picklist | QL | Yes, needs EMI, no | QL rule |
| `ql_flag` / `ql_at` | Bool / Timestamp | QL | — | Stage |
| `counselled_at`, `visit_at`, `parent_met_at`, `taster_attended_at` | Timestamps | Stage 4 | — | Stage |
| `founder_touch` | Bool | Stage 4–5 | — | **H3 (A-GRO-25)** |
| `touches_14d` | Number | Auto | — | G2 (≥5) |
| `stage` | Picklist | Always | §5.4 | Funnel |
| `lost_reason` / `disqualify_reason` | Picklist | On close | §5.4 | Lost-reason Pareto |
| `competitor_chosen` | Picklist | If lost to competitor | Orane, Lakmé, VLCC, Zuri, Cassia, Nav Brar, Tanvi KG, Headmasters, Knuckout, online, other | Positioning |
| `abroad_plan_2y` | Bool | QL | — | S8 validation |
| `consent_comms_at`, `whatsapp_marketing_optin`, `image_consent`, `parental_consent` | Timestamp / Bool | Lead / enrolment | — | Compliance |
| `referral_code_used` / `referrer_contact_id` | Text / ID | Lead | — | Referral rewards |

### 5.3 Naming conventions and entry codes [REC]
- **UTM:** `utm_source` (instagram, facebook, google, youtube, gbp, whatsapp, partner name) · `utm_medium` (cpc, paid_social, organic, referral, qr, email) · `utm_campaign` = `{platform}_{objective}_{segment}_{geo}_{yyyymm}`, e.g., `meta_ctwa_s1_tricity_202612` · `utm_content` = creative code, e.g., `R1_proof_reel15`.
- **WhatsApp pre-filled entry codes** (end of the pre-filled message, e.g., "… [W-PRO]"):

  | Code | Where it is used |
  |---|---|
  | `W-PRO`, `W-FND`, `W-TST`, `W-SMU`, `W-MC-AIR` | Website pages |
  | `IG-BIO`, `IG-DM-<keyword>` | Instagram |
  | `YT` | YouTube |
  | `GBP` | Google Business Profile |
  | `QR-STUDIO` | Studio QR code |
  | `REF-<code>` | Referral |
  | `EV-<event>-<yymm>` | Events |
  | `POP-<city>-<yymm>` | Regional pop-ups |
  | `PRT-<partner>` | Partners |

  On the website, a small script appends the active UTM campaign to the pre-filled text so paid-search sessions keep their attribution when they jump into WhatsApp.

### 5.4 Stages and reason codes

| Stage (pipeline) | Side statuses |
|---|---|
| New → Contacted → Qualified → Counselling booked → Counselled / Visited / Taster attended → Applied (token) → Enrolled → In course → Completed → Alumni | Nurture (start >90 days) · Lost · Disqualified · Duplicate · Do-not-contact |

- **Lost reasons:** fee/affordability · parent/spouse veto · timing/start date · distance/accommodation · chose competitor (field) · course mismatch · wants online only · certificate concern · job/placement concern · no response after cadence · other (note).
- **Disqualify reasons:** under 17 · spam/wrong number · **studio service enquiry (route to studio pipeline)** · job seeker · vendor/solicitation · duplicate.

---

## 6. Routing rules [REC]

| # | Rule | Logic |
|---|---|---|
| RT-01 | Product routing | L2/L3 → counsellor queue; L4 → self-serve flow + S3 owner (human on request); L1-S5 / L1 → self-serve booking + payment; **studio service → studio manager pipeline**; job/vendor → admin |
| RT-02 | Geo | `is_tricity = false` → tag S7, auto-invite to the next Parents & Students Info Session, assign to the S7-trained counsellor (when 2 counsellors) |
| RT-03 | Language | Preference Punjabi/Hindi/English → matching counsellor where available |
| RT-04 | Load balancing | Round-robin among on-shift counsellors; cap ≈30 active conversations/day each (A-GRO-38); overflow → backup |
| RT-05 | SLA escalation | Unassigned/unanswered 5 min → backup; 30 min → growth lead alert; daily breach list |
| RT-06 | After hours | Bot Flow + "counsellor by 10:15"; queue ordered by lead time |
| RT-07 | **Founder escalation (bounded)** | Only: (a) S3 pro artists requesting the founder for a masterclass decision; (b) post-visit parents still hesitant with application likely; (c) press/partners. Booked founder slots, ≤5 calls/week in Phase 1 (`positioning_and_segments.md` §4.3) |
| RT-08 | Referral | `REF-` code → priority queue; referrer credited on enrolment |
| RT-09 | Existing contacts | Current student/alumna → alumni owner, not the new-lead queue |
| RT-10 | Under-18 | `age_band <18` → parent-inclusive communication path; capture parental consent before marketing messages (§10) |
| RT-11 | Dedupe | Match on `phone_e164`; merge; keep the first-touch source permanently; update last-touch |

---

## 7. Automations [REC]

| # | Trigger | Action | Message type | Linked KPI |
|---|---|---|---|---|
| A1 | New inbound WhatsApp / form / call ≥30 s | Instant acknowledgement + 4-question **Flow**; create/merge lead; set source fields | Service (free) / utility template if form-originated | First response |
| A2 | Flow completed | Send fee sheet + brochure for the chosen product; set QL candidate flags | Service | Lead→QL |
| A3 | Lead created | Assign owner (RT-01..06); start SLA clock; escalate at 5/30 min | Internal | G2 |
| A4 | No reply / not counselled | Counsellor tasks D0, D1, D3, D7, D14; templated nudge if the 24-h window has closed | Marketing/utility template | ≥5 touches |
| A5 | Visit/taster/session booked | Confirmation + location pin + reminders at 24 h and 2 h; parent invite link | Utility | Show-up |
| A6 | No-show | Rebook offer ×2, then Nurture | Utility | QL→counselled |
| A7 | Counselled → apply | Token payment link; EMI application link; receipt on payment; stage → Applied | Utility | Counselled→applied |
| A8 | Enrolment confirmed | Welcome pack, kit list, timetable, batch group add, consent forms (image, parental if <18) | Utility | Applied→enrolled |
| A9 | Weekly during course (opt-in) | Attendance update to parent | Utility | Completion; parent trust |
| A10 | Portfolio day / graduation | Google review link; testimonial consent; issue referral code; Pro Circle activation | Utility | Review rate, referrals |
| A11 | Completion + 30/90/180/365 days | Alumni outcome survey (time to first paid booking, bookings, prices) | Utility | **G5, outcomes report** |
| A12 | Pro Circle day 330/350/365 | Renewal reminders + payment link | Utility | Pro Circle retention |
| A13 | Masterclass launch | Waitlist → early access (72 h) → open → last call (only true seat counts) to opted-in S3 list | Marketing | Sell-through |
| A14 | 30 days before each batch | Reactivate Nurture + Lost (timing) leads | Marketing | Reactivation ≥5% |
| A15 | Stage → QL / Enrolled | **Send events to Meta CAPI (business messaging, with `ctwa_clid`) and Google offline conversions (gclid/hashed phone)** | System | G1; paid optimisation |
| A16 | Every Monday 09:00 | Refresh dashboard; send SLA breach and funnel summary to the growth lead | Internal | Governance |

---

## 8. Attribution design

| Touchpoint | Capture method | Stored in |
|---|---|---|
| Meta click-to-WhatsApp ad | Webhook referral object (ad id, `ctwa_clid`, headline) from BSP | `ad_id`, `ctwa_clid`, `channel_group=paid_social` |
| Meta instant form | Lead-ads integration (form id, ad id) | Same |
| Google Search ad → site → WhatsApp/form | `gclid` captured on landing; appended to pre-filled WhatsApp text / form hidden field | `gclid`, UTM fields |
| Google Ads call | Call asset conversion + tracked number webhook (MyOperator) | `source=google`, `medium=cpc_call` |
| Organic Instagram | Bio link with UTM; DM keyword automation; `IG-BIO` / `IG-DM-*` entry codes | `entry_code` |
| GBP | Website link with UTM (`utm_campaign=gbp`); GBP tracked number | `source=gbp` |
| Website organic | GA4 session source + entry code | `channel_group=organic_search` |
| Walk-in / phone to main number | Mandatory "How did you hear?" picklist | `self_reported_source` |
| Referral / partners / events / pop-ups | Codes (`REF-`, `PRT-`, `EV-`, `POP-`) and QR codes | `entry_code`, `referrer_contact_id` |

**Attribution rules [REC]:**
- **First touch** is permanent and drives CAC by route.
- **Last touch before QL** drives optimisation.
- **Self-reported** source is the cross-check for organic and word of mouth.
- Paid platforms are optimised on **QL and Enrolled** events, not leads, once volumes allow.
- Platform-reported conversions are never the source of truth. The CRM is (G1: CRM enrolments must reconcile with accounts within ±5%).

---

## 9. Reporting dashboard

### 9.1 Weekly one-pager (Looker Studio or Sheet) [REC]

| Widget | Definition |
|---|---|
| Leads by channel group / source / segment | Count of leads created in week (first touch) |
| Lead→QL % by route | QL in cohort ÷ leads in cohort (cohort = lead-created week) |
| **First response: median and P90** (working hours) | `first_human_response_at − created_at`, working-hours adjusted |
| % leads human-contacted ≤1 h | — |
| % open QLs with ≥5 touches in 14 days | — |
| Counselled / visits / taster attendance; % S1 with parent present | Stage-4 events in week |
| Applied and Enrolled (week, MTD) | Stage-5/6 events |
| Cost per lead / QL / counselled / enrolment by route | Spend ÷ events (paid routes) |
| Lost-reason Pareto (rolling 4 weeks) | — |
| Batch fill vs capacity (next 2 batches) | Enrolled ÷ seats |
| Masterclass sell-through; self-makeup seats | — |
| Reviews this week; average rating | GBP |
| **Gate status G1–G5** (green/amber/red) | Per `growth_marketing_strategy.md` §9 |

### 9.2 Monthly
- CAC by route (media and fully loaded)
- Conversion by lead-month cohort (lagged 60–90 days)
- Seasonality vs A-GRO-40
- EMI uptake
- Founder-touch share and conversion gap
- Content performance by pillar and by presenter (founder / trainer / student)
- SEO rankings for K1–K3
- AI-search prompt audit
- Alumni outcomes (rolling)

---

## 10. Compliance and data protection [REC; confirm with counsel]

| Area | Requirement |
|---|---|
| **DPDP Act, 2023** | Consent notice at capture (purpose: admissions communication; retention period; how to withdraw). Record consent timestamps. Role-based CRM access. Delete or anonymise per a retention policy. **Leads under 18 are "children" under the Act and need verifiable parental consent for processing.** Implement RT-10 and do not run marketing messages to under-18s without parental consent. Confirm the current status of the Rules and obligations with counsel [CLAIM] |
| WhatsApp policy | Business-initiated templates need prior opt-in. Honour STOP/opt-out. Keep template quality high (low block rate) [CLAIM: verify current WhatsApp Business Messaging Policy] |
| Advertising claims | No income/placement guarantees. Outcome statistics with n and dates. Counsel to review applicability of consumer-protection guidance on misleading education/coaching ads (S-CUS §4.2) |
| Image and testimonial consent | Written consent from students, models and brides (with scope and revocation); consent ID stored with each asset |
| Influencer disclosure | Collab content labelled per ASCI influencer guidelines [REC; verify current text] |
| Payments | Card data handled only by the gateway (no storage); EMI lender terms disclosed before application |
| Devices | Counsellor phones with screen lock; CRM app access revocable; no personal WhatsApp for admissions |

---

## 11. Implementation plan (aligned to `marketing_channel_plan.md` §4)

| Week | Deliverable | Owner | Done when |
|---|---|---|---|
| 1 | Stack decision (BSP shortlist of 2, CRM shortlist of 2); request written quotes (BSP markup, service-message pricing, EMI subvention) | Growth lead | Quotes received |
| 2 | BSP onboarding: number migration or new number, display name approval, Business Manager verification; message templates submitted | Growth lead + founder | Templates approved |
| 2–3 | **CTWA attribution test** (§3.3); CRM configured (fields §5.2, stages §5.4, routing §6); Flow built | Integration freelancer | Test lead shows `ctwa_clid` + CAPI event received in Events Manager |
| 3 | SLA timers, cadences, dashboard v1; counsellor training | Growth lead | First weekly dashboard |
| 4 | Website: GTM/GA4 events, Meta Pixel/CAPI (web), Google Ads conversions + offline import; hidden fields; WhatsApp pre-fill script; Clarity | Web freelancer | G1 checklist items ticked |
| 4–5 | Payments: Razorpay links/pages for taster, self-makeup, token; EMI partner application | Founder + finance | First token taken via link |
| 6–8 | Automations A5–A11, A13–A16 live; alumni object; consent library | Growth lead | Gate G1 green for the first week |
| Month 6+ | Review scale needs: second counsellor seat, Zoho Professional, server-side tagging, LMS pilot (only if the hybrid case is approved) | Growth lead | Gate review |

---

## Sources

**Research-file IDs** (URLs and dates in `research/source_fragments/*`; accessed 2026-10-16): S-CUS-16, 17 (WhatsApp pricing; Learnwise Flows case), S-LC-02, 08, 13 (PNA site platform hint; Orane/Zuri EMI partners), S-NC-20 (Propelld).

**New web sources (all accessed 2026-10-16; prices exclude GST unless stated):**

| ID | Source | URL | What it supports | Tag / access |
|---|---|---|---|---|
| S-GRO-01 | Meta for Developers: WhatsApp Business Platform pricing | https://developers.facebook.com/docs/whatsapp/pricing | Per-message pricing from 1 Jul 2025; free service conversations from 1 Nov 2024; 72-h free entry-point window for CTWA; India marketing rate increase 1 Jan 2026; INR billing migration by 31 Dec 2026 | [FACT] fetched |
| S-GRO-02 | AiSensy: WhatsApp pricing calculator | https://aisensy.com/whatsapp-business-pricing-calculator-free | Basic ₹1,500 / Pro ₹3,200 / Premium ₹9,100 per month; marketing ₹1.09, utility ₹0.145 per msg; 18% GST; service-message charge claim from 1 Oct 2026 (conflicts with S-GRO-01) | [CLAIM] fetched |
| S-GRO-03 | Interakt pricing (third-party comparisons; official page returned 403) | https://richautomate.in/blog/interakt-vs-wati-india-2026-pricing-decoded ; https://codingclave.com/guides/whatsapp-api-pricing-india-2026-comparison ; https://www.go4whatsup.com/india/whatsapp-business-api-pricing/ | Interakt ≈₹1,199–3,999/mo or US$55/mo (conflicting); BSP markup 10–30% | [CLAIM] search extract |
| S-GRO-04 | Whautomate: WhatsApp Business API pricing India | https://whautomate.com/whatsapp-business-api-pricing-india | Meta India marketing ≈₹0.8631/msg, utility ≈₹0.115/msg | [CLAIM] search extract |
| S-GRO-05 | TeleCRM pricing | https://telecrm.in/pricing | ₹599 (annual) / ₹849 (quarterly) per user; ₹749 / ₹1,049 with WhatsApp sync; minimum 3 users; WhatsApp API set-up ₹1,999 | [CLAIM] search extract |
| S-GRO-06 | Zoho CRM pricing India (reseller guides) | https://codroiditlabs.com/zoho-crm-pricing-india/ ; https://cloudfysystems.com/blog/zoho-crm-pricing-india-2026 ; https://aaxonix.com/tools/zoho-pricing-calculator | Standard ≈₹800, Professional ≈₹1,400 per user/mo (annual); monthly billing higher (conflicting) | [CLAIM] search extract |
| S-GRO-07 | LeadSquared pricing (partner / comparison) | https://itforsme.in/pricing/leadsquared-india ; https://prospeo.io/s/hubspot-vs-leadsquared | ₹2,500–6,500 per user/mo; possible 20-user minimum | [CLAIM] search extract |
| S-GRO-08 | MyOperator pricing | https://myoperator.com/india-pricing ; https://myoperator.com/virtual-phone-number-india | Office ₹3,750–5,000/mo (annual); contact centre ₹1,250 / ₹2,500 per user/mo; virtual number from ≈₹1,249/mo | [CLAIM] search extract |
| S-GRO-09 | Razorpay: payment gateway pricing explained | https://razorpay.com/blog/razorpay-payment-gateway-pricing-explained/ ; https://www.softwaresuggest.com/blog/razorpay-payment-gateway-charges/ | 2% + GST standard; cardless EMI ≈3% + GST | [CLAIM] search extract |
| S-GRO-10 | Graphy pricing (reviews) | https://schoolmaker.com/blog/graphy-pricing ; https://www.ruzuku.com/compare/graphy-pricing | US$49–399/mo; plan details conflict; INR plans unverified | [CLAIM] search extract |
| S-GRO-11 | Wix pricing (review) | https://www.websitebuilderexpert.com/wix-pricing | Light $17 / Core $29 / Business $39 per month (annual) | [CLAIM] search extract |
| S-GRO-12 | Hostinger India WordPress pricing | https://zoutons.com/news/hostinger-wordpress-hosting-price-india-2026 | Business ≈₹249/mo intro (48-mo), renews ≈₹649/mo | [CLAIM] search extract |
| S-GRO-13 | GrayQuest EMI terms at partner institutions | https://www.msruas.ac.in/uploads/pdf/1-GQ-Short-term-EMIs.pdf ; https://www.nmims.edu/docs/Grayquest.pdf ; https://www.asugsvsummit.com/speakers/rishab-mehta | 4–12 EMIs, no processing fee (one institution); rates from 2.5% p.a. (another); 5,000+ institutions (founder profile) | [CLAIM] search extract |
| S-GRO-15 | Meta for Developers: Automatic events API (CTWA lead/purchase via CAPI); third-party CAPI-for-messaging notes | https://developers.facebook.com/documentation/business-messaging/whatsapp/embedded-signup/automatic-events-api ; https://docs.zernio.com/ads/send-whatsapp-conversion | CTWA events back to Meta; `ctwa_clid` needed for attribution; Embedded Signup v2 deprecation 15 Oct 2026 | [FACT/CLAIM] search extract |
| S-GRO-16 | GBP chat discontinued (31 Jul 2024) | https://www.techradar.com/pro/google-is-shutting-this-useful-tool-that-let-you-contact-businesses-directly ; https://www.dacgroup.com/insights/local-search-news/google-sunsetting-business-profile-call-history-chat/ | Use calls + website → WhatsApp instead of GBP chat | [FACT] search extract |
| S-GRO-17 | Exly (Capterra India listing) | https://www.capterra.in/software/1022296/exly | Feature scope (courses, workshops, bookings, payments, CRM); no pricing found | [CLAIM] search extract |
| S-GRO-18 | Privyr (Capterra India) | https://www.capterra.in/software/1078161/Privyr | ≈US$15–22/mo; free version | [CLAIM] search extract |
| S-GRO-19 | Neodove pricing | https://neodove.com/pricing/ | ₹17,499/yr up to 10 users; WhatsApp/IVR extra | [CLAIM] search extract |

**Search budget used:** 15 web searches + 3 page fetches (≤20).
