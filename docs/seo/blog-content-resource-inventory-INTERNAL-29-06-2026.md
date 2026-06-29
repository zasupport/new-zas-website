# ZA Support — Blog/Website Content Engine: Resource Inventory (INTERNAL)
**29/06/2026 · enumerated from live disk state (§374), not memory · internal-facing only (§269 concealment is for PUBLIC output; this names real tooling)**

Scope: every resource used to GENERATE → VERIFY → BUILD → DEPLOY → AUDIT → ADVISE on website/blog content that earns (the blogs). Canonical tools marked ✅; retired this session marked ⛔.

---

## 1. GENERATE (content + topic creation)
| Resource | Purpose | Rule |
|---|---|---|
| ✅ `~/bin/za-blog-pipeline.sh` | the ONE canonical generator (model prompt → draft); carries §489 price-guard + §167 uniqueness instruction | §229/§349/§489/§167 |
| ✅ `~/bin/za-keyword-fresh-engine.py` | topic SOURCE; block #2 (service×model) now DEMAND-GATED on GSC (no permutation flooding) | §167/§409 |
| ✅ `~/bin/za-blog-topic-pool.py` + `~/.za-blog-topic-pool.json` | topic pool + refill (rebuilt to 50 distinct, 0 perms) | §365/§356 |
| ✅ `~/bin/za-keyword-rank-confidence-engine.py` | real-GSC ranking-confidence score → auto/fallback/hold staging | §578 |
| ✅ `~/bin/za-blog-failsafe-router.sh` | model fallback (frontier → local Ollama) on API cap | §422/§439 |
| ✅ `scripts/blog_content_sanitiser.py` | strips dash/IP at INSERTION (real prevention, gate = backstop) | §547/§300 |
| ✅ `~/bin/za-blog-research-engine.py` + `za-blog-research-sources-refresh.sh` | ≥2-source research feed | §227/§373 |
| skill `courtney-bentley-voice` | client-facing copy voice (titles/meta) | §252/§306 |
| skill `perfect-blog-creator` | canonical blog-creation source | §264 |
| ⛔ `za-auto-blog-website.sh`, `za-blog-publisher.sh`, `za-daily-blog-pipeline.sh`, `za-blog-cadence-deploy.sh`, `za-blog-15min-monitor.sh`, `za-blog-logicboard-runner.sh` | RETIRED this session (bypass generators) → single-generator end-state | §354/§609 |

## 2. VERIFY (gates + quality, pre-ship)
| Resource | Purpose | Rule |
|---|---|---|
| ✅ `scripts/check-blog-price-allowlist.py` (`--cached`) | §489 invented-price gate (diff-scoped, fail-closed) | §489/§374/§559 |
| ✅ `scripts/strip-typographic-dashes.py` + `dash_normalizer.py` | em/en-dash ban | §547 |
| ✅ `~/bin/za-blog-ip-zero-tolerance.sh` / `za-blog-ip-enforcer.sh` | IP-trailer / FAQ-schema / count / CTA-link gates | §300/§343/§344/§345/§347 |
| ✅ `scripts/check-turnaround-clause.py` | machine-dependent lead-time clause | §287-T |
| ✅ `scripts/check-redirect-sitemap-consistency.mjs` | redirect↔sitemap collision gate | §399/§529 |
| ✅ `~/bin/za-content-novelty-gsc-scanner.py` | novelty/thin/dup-title block | §417 |
| ✅ `~/bin/za-website-ai-tell-detect` (in advisor) | structural AI-tell detector | §377 |
| ✅ `.git/hooks/pre-commit` | fail-closed gate chain (price + dash + IP + turnaround) | §180/§547 |
| ✅ `advisor()` | cognitive review BEFORE crystallising web/blog code | §522/§477 |
| ✅ `~/bin/za-blog-eval-proof.py` / `za-blog-quality-nightly.py` | eval/quality proof | §530 |

## 3. BUILD (assemble + insert)
| Resource | Purpose | Rule |
|---|---|---|
| ✅ `scripts/auto-blog-insert.py` | the SINGLE inserter; DEFAULT review-queue (fail-safe), §489 pre-insert filter, `ZA_BLOG_ONLY`/`ZA_BLOG_AUTOPUBLISH` scoping | §190/§627/§489 |
| ✅ `~/bin/za-blog-review.sh` | review-queue approval (list/show/approve/reject) | §190 |
| ✅ `~/bin/za-blog-scrub-queue.py` + `~/.za-blog-scrub-progress.jsonl` | daily §489 invented-price scrub queue (measured loop) | §489/§530 |
| ✅ `~/bin/za-blog-ctr-queue.py` + `~/.za-blog-ctr-progress.jsonl` | daily §194-tiered CTR-rewrite queue + 14/28-day measurement loop | §194/§409/§530 |
| ✅ `~/.za-blog-price-anchors.json` | confirmed price-anchor registry (SoT) | §487/§489 |
| ✅ `scripts/za-blog-price-triage.py` / `za-blog-price-worklist.py` | invented-vs-competitor classification + worklist | §489/§529 |
| ✅ Next.js 15 + Tailwind v4 — `src/app/blog/[slug]/page.tsx` (Record), `blog/page.tsx` (listing), `sitemap.ts` | the monolithic blog store (3 updated together) | §346 |
| ✅ `tsc --noEmit` | syntax gate before commit | §390 |

## 4. DEPLOY (ship live)
| Resource | Purpose | Rule |
|---|---|---|
| ✅ `deploy.sh` | deploy gate (gates → build → push) | §180 |
| ✅ git + GitHub (origin, osxkeychain auth) | version + push trigger | — |
| ✅ Vercel | auto-build/deploy on push to main | — |
| ✅ `~/bin/za-blog-publication-verify.sh` | post-deploy 5-check (200 + no-IP + wa.me + sitemap + schema) | §346 |
| ✅ §190 approval gate | human go before live content edits | §190 |
| note | invalid `GITHUB_TOKEN` env shadows keychain → `unset GITHUB_TOKEN` before push | (session gotcha) |

## 5. AUDIT (monitor + health, post-ship)
| Resource | Purpose | Rule |
|---|---|---|
| ✅ `scripts/za-blog-corpus-audit.py` | full-corpus compliance (price/doorway/perm/weak-pricing, GSC-ranked) | §608 |
| ✅ `~/bin/za-web-blog-advisor.py --watch` | §522 gap battery (ctr-gap, doorway, weak-pricing, ai-tells, stall…) | §522 |
| ✅ `~/bin/za-blog-publish-stall-watchdog.py` | net-new-LIVE measured loop, no silent stall | §621/§530 |
| ✅ `~/bin/za-blog-health-monitor.sh` (15 checks) / `za-blog-self-heal.sh` | health + 8 auto-fixes | §264 |
| ✅ `~/bin/za-sitemap-redirect-monitor.sh` | every URL 200, no 3xx in sitemap | §401 |
| ✅ `~/bin/za-blog-quota-watchdog.sh` / `za-blog-quota-backfill.sh` | velocity floor/cap | §229/§277 |
| ✅ `~/bin/za-ranking-data-preflight.sh` | §641 live ranking-data snapshot before ANY web/blog response | §641 |
| ✅ `~/bin/za-session-io-probe.sh` | cross-session file-I/O collision probe + watchdog | §609/§633 |
| ✅ `~/bin/za-gsc-unknown-url-watch.py` / `za-gsc-health-monitor.sh` | GSC coverage + export health | §402/§246 |

## 6. ADVISE (data sources for recommendations)
| Resource | Purpose | Rule |
|---|---|---|
| ✅ **GSC** — `~/Desktop/Claude/Google/SEO/gsc-pages-export.csv`, `~/.za-gsc-export-latest.json` (via `za-gsc-page-export.py`/`za-gsc-export.py`) | page + query real-data (clicks/imp/pos) — the primary lever | §409/§386 |
| ✅ `~/bin/za-ranking-tools-liveness.sh` + `~/.za-ranking-tools-status.json` | live state of all Google + 3rd-party ranking tools (3-state SoT) | §514 |
| ✅ `~/bin/za-google-ranking-watch.sh` | biweekly Google policy/algorithm watch | §578 |
| ✅ `~/bin/za-ranking-intel-engine.py` / `za-ranking-master-excel.py` / `za-ranking-policy-scanner.py` | revenue-ranked intel + master XLSX + policy scan | §520/§372 |
| ✅ `~/bin/za-keyword-revenue-attribution.py` | revenue per keyword (rank by money) | §194/§434 |
| ✅ `~/bin/za-gsc-email-intel.py` / `za-gsc-intelligence.py` | GSC↔git correlation, email-intel | §246/§288 |
| ✅ pytrends / `za-weekly-keyword-monday.py` / `za-keyword-strategy-weekly.sh` | weekly keyword harvest | §366/§263 |
| ✅ `~/bin/za-weekly-infra-enhancement-scan.sh` | weekly NEW ranking-engine research | §512 |
| ✅ `WebSearch` | Google policy / scaled-content-abuse research | §373/§374 |
| ✅ `advisor()` | strategy pressure-test | §477/§522 |
| ✅ Keyword Strategy XLSX (`Google/SEO/*.xlsx`) | curated keyword SoT (Y/N approval) | §365/§578 |

## Cross-cutting
- **Models:** Claude (Opus 4.8 default / Haiku for blog body §318) + local Ollama `qwen2.5-coder` fallback (§422). LLM stack OSS+Claude only (§-LLM-stack).
- **Governing rules (key):** §167 §190 §194 §227 §229 §287-T §300 §343-347 §374 §377 §386 §399 §401 §409 §417 §422 §424/§425 §428 §434 §455 §487 §489 §512 §514 §517 §520 §522 §529 §530 §547 §557 §578 §613 §621 §641.
- **Automation (LaunchAgents):** blogpipeline · blogScrubBatch (09:00) · blogCtrQueue (09:15) · blogipscanner · blogrulesmonitor · bloghealthmonitor · blogtopicpoolrefill · blogquotawatchdog · blogrankingvalidation · blogPublishStallWatch · blogwatcher · blogQualityNightly · blogresearchsourcesrefresh · blogdatecheck · googleRankingWatch · gscdailyexport · gscEmailIntel · gscHealthMonitor · gscintelligence · gscUnknownUrlWatch · rankingToolsLiveness · rankingIntelligenceRun · weeklyrankingpolicyscanner · websitegooglecompliance · seopipeline · googleapiaudit · googleinsightharvester · sessionIoCollisionWatch.
- **Durable ledgers (measured loops §530):** .za-blog-scrub-progress / .za-blog-ctr-progress / .za-blog-publish-stall-ledger / .za-blog-review-manifest / .za-blog-price-reject / .za-blog-eval / .za-blog-failsafe / measured-loop.jsonl.
- **External services:** Google Search Console, Vercel (host/deploy), GitHub (origin), Google Business Profile, Resend (email), Render (backend API).
- **Docs/reports (this session):** docs/seo/ — corpus-audit, RAG-analysis, O2-consolidation-plan, SEO-strategy-recommendation, this inventory.
