# Assumptions Register

**Owner:** Lead orchestrator (canonical planning assumptions); Economics agent consolidates workstream assumptions below.
**Rule:** any number used in a model or slide must trace to a [FACT] source ID or an assumption ID here. Changing a value requires updating this file and noting the change in `progress.md`.

Tags: **[FOUNDER]** founder-stated · **[FACT]** sourced · **[EST]** our estimate with arithmetic · **[HYP]** hypothesis to validate.

## Canonical planning assumptions (all workstreams must use these)
| ID | Assumption | Value (low / base / high) | Basis | Tag | Validate by |
|---|---|---|---|---|---|
| CA-01 | PNA paying students per year today (all courses) | 30 / 50 / 60 | Founder said "under 60" (2026-10-16) | [FOUNDER] range; base is our pick | Founder enrolment records |
| CA-02 | PNA current flagship professional course fee (incl. kit unless stated) | ₹40k / ₹60k / ₹75k | Not supplied. Local 3–6 month professional diploma band ₹35k–75k (chandigarh_competitors §6) | [HYP] | Founder fee sheet |
| CA-03 | Growth investment envelope, next 12 months | ₹10L / ₹30L / ₹50L | Founder: "Moderate ₹10–50L" | [FOUNDER] | Founder |
| CA-04 | Founder role | Steps back from daily teaching within 24–36 months; remains brand face, masterclass lead, curriculum owner | Founder answer 2026-10-16 | [FOUNDER] | — |
| CA-05 | Tricity paid makeup/beauty-artistry training demand | 600 / 1,250 / 2,200 students/yr; ₹1.8 / 5.7 / 13.4 crore/yr | chandigarh_market_analysis §1 | [EST] | Mystery shopping + competitor intake checks |
| CA-06 | India paid makeup-led training tuition (TAM) | ₹80 / 390 / 1,370 crore/yr | india_market_analysis §1 (two-method bottom-up) | [EST] | — (to reconcile with CA-05; see note) |
| CA-07 | PNA public digital footprint | Website only; no verified GBP rating, Instagram handle or listings found; invisible for non-branded search | chandigarh_competitors §2 | [FACT of absence in our searches] | Founder to supply handles/GBP access |

**Reconciliation note (open):** CA-05 base (₹5.7 cr) is ~1.5% of CA-06 base (₹390 cr), whereas the population-and-affluence share method gives tricity ≈0.5% of India. The two research streams used different scopes/participation assumptions. The Economics agent must reconcile them in `economics/market_sizing_model.xlsx` and document the resolution here. The chat-stage desk estimate (India ₹800–1,500 cr) is superseded by CA-06 and must not be reused.

## Workstream assumptions
Consolidated by the Economics agent from research files (A-IND-, A-CHD-, A-CUS-, etc.). See section below once populated.
