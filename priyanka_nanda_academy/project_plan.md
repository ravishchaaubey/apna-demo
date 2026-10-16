# Project Plan — Priyanka Nanda Makeup Academy Growth Strategy

**Started:** 2026-10-16 · **Lead orchestrator:** Claude Code main session · **Repo path:** `priyanka_nanda_academy/`

## Objective
Determine which business model, target market, geography, funnel, operating structure, tech stack and investment profile can turn a founder/reputation-led Chandigarh makeup academy into a scalable, profitable beauty-education business. Primary deliverable: `final/Priyanka_Nanda_Academy_Growth_Strategy.pptx`.

## Working hypotheses (to test, not assume)
| ID | Hypothesis | Tested in |
|---|---|---|
| H1 | Tricity demand alone caps a single-centre academy well below the growth ambition. | chandigarh_market_analysis, market_sizing_model |
| H2 | Chandigarh can act as a destination-learning hub for Punjab/Haryana/HP/J&K students. | chandigarh_market_analysis, geographic_expansion |
| H3 | Founder brand is the main conversion asset and also the main scaling constraint. | customer_segments, business_model_evaluation |
| H4 | Hybrid (online theory/discovery + offline practice/certification) beats pure online on completion and price realisation. | international_benchmarks, business_model_evaluation |
| H5 | A services marketplace is a different business (two-sided, trust/fulfilment heavy) and should not be the next step. | international_benchmarks, business_model_evaluation |
| H6 | Counselling-led WhatsApp conversion outperforms website-first funnels for high-ticket courses. | customer_segments, admissions_funnel |
| H7 | Lead follow-up discipline and tracking are larger near-term levers than more ad spend. | admissions_funnel, funnel_economics |

## Workstreams, dependencies and gates
| Phase | Work | Agents (model) | Depends on | Gate |
|---|---|---|---|---|
| 1 | India market; Chandigarh/regional market; national competitors; local competitors + PNA public footprint; international benchmarks; customers & admissions | 6 parallel research agents (Sonnet ×5, Opus ×1) | — | **A: Evidence** |
| 2 | Business model & geography evaluation; market sizing & economics models; growth & martech; operations & roadmap | Opus ×4 (economics after BM direction) | Gate A | **B: Alternatives**, **C: Economics** |
| 3 | Strategic arbitration + recommended strategy | Fable | Gate B/C | **D: Recommendation** |
| 4 | Independent red-team | Fable | Gate D | **E: Independent QA** |
| 5 | Storyboard → deck build → render → QA → fix | Fable (storyline), Opus (build), Opus (QA) | Gate E | **F: Presentation QA** |

## Data discipline
- Every claim tagged: **[FACT]** (verified, sourced), **[CLAIM]** (first-party/unverified), **[EST]** (our estimate with arithmetic), **[HYP]** (hypothesis to validate), **[REC]** (recommendation).
- Sources registered in `research/sources.md` (merged from `research/source_fragments/`); assumptions in `assumptions_register.md`.
- Numbers flow research → `economics/*.xlsx` → slides; consistency check before Gate F.

## Founder inputs
Business facts unknown to us are tracked in `research_questions.md` (§ Founder questions). Models run on labelled assumptions until supplied.
