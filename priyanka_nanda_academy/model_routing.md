# Model Routing and Agent Assignments

## Runtime model discovery (2026-10-16)
- The Claude Code `Agent` tool exposes model aliases `sonnet`, `opus`, `fable` (and `haiku`, which is **prohibited** for this project and never used).
- Aliases resolve at runtime to the latest model in each family. The environment lists the current family members as Sonnet 5.5 (`claude-sonnet-5-5`), Opus 5.5 (`claude-opus-5-5`) and Fable 5.1 (`claude-fable-5-1`). We dispatch by alias so the strongest available variant is used without hard-coding versions.
- **Orchestrator disclosure:** the main session (lead orchestrator) is configured as Opus 5.5, not Fable. To respect the brief's Fable-tier routing, the high-stakes judgement tasks (strategic arbitration, red-team review, executive storyline) are delegated to dedicated **Fable** agents; the orchestrator handles planning, integration and consistency management.
- **Haiku usage: zero.** Every agent call sets an explicit model.

## Agent log
| # | Agent | Model | Phase | Output files | Status |
|---|---|---|---|---|---|
| 1 | India Market Research | sonnet | Gate A | research/india_market_analysis.md | done — search budget exhausted before creator/Tier-2/3 queries |
| 2 | Chandigarh/Regional Market | sonnet | Gate A | research/chandigarh_market_analysis.md | done — search quota exhausted mid-task; Justdial/Maps blocked |
| 3 | National Competitive Intelligence | sonnet | Gate A | research/national_competitors.md | done — shared WebSearch budget exhausted before gap-fill; Instagram 429, Orane/Lakmé sites blocked |
| 4 | Local Competitive Intelligence (+ PNA public footprint) | sonnet | Gate A | research/chandigarh_competitors.md | done — PNA site blocked by proxy; 4 queries unrun (search budget) |
| 5 | International Benchmarks | sonnet | Gate A | research/international_benchmarks.md | done — search quota exhausted; Lakmé Academy, LSM, MUD etc. not evidenced |
| 6 | Customer & Admissions | opus | Gate A | research/customer_segments.md | done — 27 sources snippet-only (search quota); 33 labelled assumptions |

Note: the brief suggests 3–5 concurrent agents. Competitive intelligence was split into national and local because the local scan (incl. the client's own public footprint) is a distinct, large evidence task; six bounded agents avoids one overloaded agent rather than adding redundancy.
| 7 | Growth & MarTech (positioning, funnel, channels, CRM) | opus | Gate B/C | strategy/positioning_and_segments.md, strategy/admissions_funnel.md, strategy/growth_marketing_strategy.md, execution/marketing_channel_plan.md, execution/technology_and_crm_requirements.md | done — priors are generic education benchmarks; replace after 6–8 weeks of tracking |
| 8 | Business Model & Expansion | opus | Gate B | strategy/business_model_evaluation.md, strategy/geographic_expansion.md | done — 15 follow-up searches used; Lakmé/Airblack/B&WSSC fees unpublished |
| 9 | Economics & Market Sizing | opus | Gate C | economics/*.xlsx, economics/assumptions_and_methodology.md, assumptions_register.md (consolidation) | done — LibreOffice recalculation 0 formula errors; conflicts resolved (methodology §3) |
| 10 | Lead Strategist — Gate D arbitration | fable | Gate D | strategy/recommended_strategy.md, strategy/market_opportunity.md, final/executive_summary.md | done — renamed model "Chandigarh Flagship"; staged ₹15L+₹15L; founder ≤40% at M12 |
| 11 | Operations / Roadmap | opus | Gate D | execution/first_90_days.md, execution/twelve_month_roadmap.md, execution/kpi_framework.md | done — tied to §1A Staged Plan; unlinked items listed |
| 9b | Economics follow-up (Staged Plan, two-step price, founder 40%) | opus (resumed #9) | Gate D | economics/* | done — §1A Staged Plan; media aligned to channel plan |
| 7b | Growth follow-up (canonical vocabulary alignment) | opus (resumed #7) | Gate D | own 5 files | done — media caps moved tests to Jan; 12m totals ₹9.6L/28.6L/48.1L |
| 10b | Lead Strategist refresh (numbers + staging headroom) | fable (resumed #10) | Gate D | strategy/recommended_strategy.md, market_opportunity.md, final/executive_summary.md | done — ₹30L + ₹5L contingency; hybrid library to T3; G1 default M6 |
| 9c | Economics rerun (hybrid library deferred, M5 slot) | opus (resumed #9) | Gate D | economics/* | done — Staged Y1 ₹66.5L rev, +₹2.2L EBITDA, peak cash ₹25.6L |
| 10c | Lead Strategist final number sync | fable (resumed #10) | Gate D | 3 strategy/summary files | done — contingency kept (expected undrawn); G1 M6 default kept |
| 12 | Independent Strategy Reviewer (red team) | fable | Gate E | strategy/independent_review.md | done — Approve with conditions; 3 Critical, 12 Major, 20 defects |
| 9d | Economics Gate E fixes (C1, C2, C3 cost, C4, C5) | opus (resumed #9) | Gate E | economics/* | done — planning case G1@M9; downside, payback/IRR, tornado on Staged; 92 checks pass |
| 7c | Growth Gate E fixes (C6, C7, defects) | opus (resumed #7) | Gate E | own 5 files | done — Destination pilot Aug–Sep 2027; media ≈₹27.0L total (₹30L plan) |
| 10d | Lead Strategist Gate E re-decision | fable (resumed #10) | Gate E | 3 strategy/summary files | done — plan ₹25.2L, authorise ₹35L, KT-1a March cut; G1 restated as station test |
| 13 | Presentation Production — phase 1 (design system + component library) | opus | Gate F prep | final/presentation_source/{theme,components,demo_build}.js, README.md | done — 14 components, validate.py pass, 21 demo slides inspected |
| 9e | Economics final runs (CutM5_Deep, G1 pass month) | opus (resumed #9) | Gate E | economics/* | done — ₹25.4L deep-cut loss; G1 passable M7/M8 |
| 11b | Roadmap Gate E re-base (G1@M9, ops lead owner, defects) | opus (resumed #11) | Gate E | execution/first_90_days.md, twelve_month_roadmap.md, kpi_framework.md | dispatched |
| 14 | Executive Storyline (storyboard, deck sources, consistency table) | fable | Gate F | final/slide_storyboard.md, final/deck_sources.md | dispatched |
