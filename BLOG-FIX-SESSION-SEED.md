# DEDICATED BLOG-FIX SESSION — permanent fix for the 8-day publish drought (05/07/2026)

You OWN the blog/website publish pipeline (single owner, no drift). The prior owner session
**bba87819 is CLOSED** — you replace it. Mandate from Courtney: **repoint the blog to publish
price-free informational posts that pass §489 and actually go LIVE.**

## DEFINITIVE DIAGNOSIS — already done with real data, DO NOT re-investigate
- **Insert has NEVER succeeded in 8 days:** `grep -c "✅ Inserted:" ~/.za-blog-pipeline.log` = **0**. This is NOT a deploy/SSG/404 gap (that hypothesis is closed — nothing reaches production to be 404).
- **Root cause:** the §489 invented-price gate rejects ~100% of drafts. The topic pool is **18/18 price-demanding doorway permutations** (`-how-much-`/`-price-`/`-cost-`/`-vs-replacement-`/`-near-me-`/`-same-day-`/`-specialist-` × service × `johannesburg`). These (a) *invite* invented Rand prices → §489 blocks them, and (b) are doorway-thin → §529/§167 penalise them.
- **bba87819's 03/07 regen-loop** (`~/bin/za_blog_price_regen.py`, K=3 re-prompt) is **insufficient**: non-deterministic, drafts re-strand (the same draft was §489-skipped 6× in one log run). Both price-checkers (insert gate `_unconfirmed_prices` and generation gate `check-blog-price-allowlist.py`) AGREE — not a fork. The write path is correct (`out_file.write_text(content)` persists the cleaned draft) — not a write bug.
- **False-success masking:** the pipeline logs `✅ No new posts to insert (all already live)` + `rc=0` when in fact 34 drafts were §489-rejected → this is exactly why `--repair` was useless and the drought was invisible.

## LOCKED DECISIONS (Courtney, 05/07) — do not re-litigate
1. **FIX DIRECTION: repoint the pool to price-free INFORMATIONAL topics** (troubleshooting / how-to / symptoms / guides) that pass §489 naturally and go live; 301/retire the price-doorway slugs. (Aligns with §529/§167 + §718.)
2. **OWNERSHIP: this session owns it; bba87819 closed.**

## BUILD (advisor-vetted — all in ~/bin, collision-free now bba87819 is closed)
1. **POOL REPOINT** — replace the 18 price-doorway topics in `~/.za-blog-topic-pool.json` (schema: `{_metadata, topics}`, threshold_min 16) with price-free informational topics. **FIX THE REFILLER** (`~/bin/za-blog-topic-pool.py` + `~/bin/za-blog-pool-feed-gate.py`) so it can never re-add price-demanding doorway permutations.
2. **POOL GUARD (permanent structural fix)** — a gate rejecting any topic matching the price-doorway permutation pattern from EVER entering the pool. Wire into the feed-gate. `--test` with a negative control (an informational topic PASSES, a price-doorway topic is REJECTED) — §584/§705.
3. **FALSE-SUCCESS FIX** (`~/bin/za-blog-pipeline.sh`) — parse `INSERT_OUT` for `SKIP (§489`; if price-skips > 0 AND `NEW_POSTS`=0 → LOUD (osascript + `rc≠0` + §289 outstanding), NOT `all already live`.
4. **DISCARD-AND-SUBSTITUTE** (NOT a sanitizer — token-replacing prices mangles live prose → §566/§306, worse than no post): on `§489-UNRESOLVED` after K=3, discard the dirty draft + pull the next pool topic. Never strand, never publish mangled prose.
5. **KEEP §489 INTACT** — do not loosen it, do not just bump K (K=30 won't resolve "a price post forbidden from prices").
6. **HR RULE** — claim a number via `~/bin/za-next-rule-number.sh --claim §NNN`: (a) the pool may never contain price-demanding doorway permutations, (b) a §489-strand is loud + rc≠0 not benign, (c) discard-and-substitute not sanitize. rule + enforcement + test (§244), propagate 8-surface (§459).

## SAFETY
- **§190:** the pipeline auto-builds/pushes/deploys on its normal cadence; a MANUAL production deploy this session → surface for Courtney's YES (or let the next scheduled run publish).
- **§489/§374/§559:** NEVER invent OR research prices (private data). Confirmed anchors only, from `~/.za-blog-price-anchors.json`.
- Every build gated through `~/bin/za-test-quality-gate.sh` + a negative control (§584/§705). Reversible §552, keep `.bak` §35.
- **§718 route-integrity gate** (built 05/07): run `python3 ~/bin/za-nextjs-route-integrity.py --gate` before any deploy — it is CLEAN-or-block.

## PROVE (real data, §525)
After the fix, one pipeline run must produce ≥1 §489-clean insertable draft and `grep -c "✅ Inserted:"` > 0 — the first successful insert in 8 days. Close with the §525 smoke proof + §515 earliest-discovery retrospective + a TL;DR to Courtney.
