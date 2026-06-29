# Blog Pipeline + Live-Site RAG Analysis (real-data) — 29/06/2026
Sources: live HTTP (curl), GSC page-export (380 rows / 68,659 imp), next.config.ts (154 redirects),
corpus audit (673 posts), §489 gates. All figures real-data, not inferred (§374).

## 🔴 RED — unaddressed live risks
- **R1 Invented ZA prices live: 290 served posts** (§489). Real credibility/§374 + penalty exposure. Remediation WIRED (daily traffic-ranked queue) but ~8wk to clear at 5/day. Top earners already scrubbed.
- **R2 Model×fault PERMUTATION posts live: 59** (not redirected) — the exact "template-with-variable-substitution at scale" Google penalises (30-80% traffic loss, researched). NOT yet GSC-consolidated.
- **R3 Blog CTR = 0.6%** (439 clicks / 68,659 impressions, 396 pages). Ranking but not converting — both a lost-revenue risk AND a possible quality signal Google weighs.

## 🟡 AMBER — partial / monitor
- **A1 Pipeline OFF** — 0 new posts/day (opportunity cost). Review-queue ready; re-enable is §190 (Courtney).
- **A2 GSC demand thin** (20 top_queries) — demand-gate yields few model×service candidates; richer GSC export would feed the engine better.
- **A3 FAQ rich-results dead** (Google, May 2026) — schema kept for value only, no rich-result benefit.
- **A4 Backend api.zasupport.com** had a P0 (now recovered v11.5.14) — out of blog scope, monitor.

## 🟢 GREEN — verified addressed
- **G1 Redirects compliant** (PROVEN real-data): 308 permanent (≡301), single-hop (0 chains), relevant hub targets, targets 200, 0 sitemap-overlap, consistency gate PASS.
- **G2 Generation pipeline clean**: source demand-gated, single canonical generator→single filtered inserter, §489 pre-insert filter, uniqueness prompt, review-queue (default-safe).
- **G3 Top-traffic earners scrubbed** (batches 1-2) + gates enforced (§489/§547/§300/§287-T).

## OPPORTUNITIES (ranked by real-data ROI)
- **O1 (HIGHEST) Fix 0.6% CTR** — rankings already earned, clicks not captured. High-imp ZERO-click pages: managed-it-services-johannesburg (1406imp pos12), macbook-speaker-not-working (568imp), macbook-running-slow (361imp). Title/meta/intent rewrite → convert existing impressions to clicks. Best ROI on the whole site.
- **O2 Consolidate the 59 permutation posts** → fewer, distinct, stronger pages: removes penalty risk (R2) AND concentrates ranking signal.
- **O3 Re-enable publishing** via review-queue (resume velocity safely, A1).
- **O4 Repurpose dead FAQ schema** → HowTo/Service schema that still earns rich results.
- **O5 Anchor the 8 weak-pricing earners** (logic-board/keyboard/gpu) — quick compliance wins.
