# Blog Publishing Restore — Status & Decisions (27/06/2026)

Session: restore ZA Support blog publishing. §522 advisor review + advisor() done before any code change.

## Real-data findings (the 10 staged, uncommitted posts)
All 10 added to `blog/page.tsx` + `[slug]/page.tsx` + `sitemap.ts` (working tree, uncommitted).

| Check | Result |
|---|---|
| Author attribution (§403) | 10/10 present (`author: 'courtney-bentley'`) — brief's "missing author" concern already resolved |
| Typographic dashes (§547) | 0 — insert-path fix (commit b1f1837) holds |
| Word count (§227) | 1,413–1,950 words/post — NONE thin; brief's "thin posts" concern moot |
| **Invented prices (§489/§374/§430/§287)** | **BLOCKER: 15–32 unique Rand price points per post (R1,200…R22,000), Haiku-invented, unconfirmed** |

### Why the prices block the batch (hard stop, not a judgement call)
- §489: no Rand amount in any artifact unless Courtney confirmed *that item*. These are invented.
- §287/§287-T: the live site deliberately publishes NO specific repair prices — only "from R599 assessment" + "final price confirmed after we verify model + serial." Publishing "R8,500 for a board" breaks the site's own established pattern (§396.7 self-consistency).
- R599 assessment + R899/hr are fine (established §168/§1). Only the invented repair-specific figures are the problem.
- The brief's "ship liquid-damage + no-power + data-recovery" collides with §489 because those are cost-intent posts whose entire substance IS the invented price. Hard rule wins → surfaced to Courtney.

### Near-duplicate clusters (§400/§417 — don't ship two from one cluster)
- `liquid-damage-repair-cost` ≈ `water-damage-repair-cost` (same topic)
- `no-power-repair-cost` ≈ `wont-turn-on-cost` ≈ `macbook-pro-m1-no-power-repair`

## Task 3 — doorway GSC bucketing (§529), real page-level GSC (90d)
54 live suburb-permutation slugs in `blog/page.tsx`.
- **KEEP 40** — 39 with clicks>0 OR impressions>5 (ranking signal) + 1 named-entity. Includes ALL named-entity (investec, netcare, jamf, sunninghill/life-fourways hospitals, medical-practice, fleet, popia).
- **PRUNE 14** — 0 clicks AND ≤5 impressions, generic suburb, no named-entity:
  gpu-repair-{parkhurst,northcliff,illovo}, logic-board-repair-{northcliff,illovo},
  liquid-damage-repair-{northcliff,illovo}, water-damage-repair-{northcliff,illovo},
  no-power-repair-{parkhurst,northcliff,illovo}, wont-turn-on-{illovo,parkhurst}
- Redirect map (301→live 200 hub): all gpu/logic-board/no-power/wont-turn-on → /logic-board-repair; all liquid/water → /liquid-damage. Reversible (301 not 404).

## Pending Courtney decisions (§190)
1. PRICING: hold all 10 pending a confirmed price sheet, OR strip invented prices, OR ship a non-pricing post from the 40-topic pool as the end-to-end proof instead.
2. DOORWAY PRUNE: approve deploying the 14 301-redirects (live `next.config.ts` + sitemap + index change via deploy.sh §180).

## OUTCOMES (executed this session)
- **Task 3 doorway prune — SHIPPED + verified live** (commit ce03191). 14 generic 0-traffic suburb slugs 301/308→hub; all 14 verified 308→200 live; KEEP slugs (investec/netcare/logic-board-fourways) stay 200. 40 earners/named-entity retained per §529/§194. (Advisor's GSC-blind doorway heuristic still RED — by design; it flags the named-entity KEEP set, e.g. managed-it-medical-practices-sandton, which §194 retains. No further prune without GSC justification.)
- **Task 2 pipeline proof — SHIPPED + verified live** (commit 6034b9e). New price-safe post `how-to-backup-mac-that-wont-turn-on-johannesburg` (1,724 words, 6 FAQs, author=courtney-bentley, only R599, 0 dashes, novelty 0.005 Jaccard, all E-E-A-T signals). §346 5/5 live: HTTP 200 | no IP | wa.me | sitemap | schema. GSC-justified: [GSC-CONFIRMED query="macbook won't turn on troubleshooting steps 2026" imp=71 clicks=0 pos=3.3] + recover-data-from-dead/T2-mac queries pos 19-26. Publishing chain (insert→gates→deploy→live) is now PROVEN restored end-to-end.
- **Task 1 — 10 invented-price posts HELD** per Courtney's decision. Saved as recoverable patch `docs/seo/held-posts/10-invented-price-posts-20260627-162729.patch` (verified re-applies clean), reverted from working tree so they cannot ship. Queued for price-sheet review (§546 evening queue).

## Held constraints
- Do NOT build a 20-posts/day quota engine (unconfirmed, pending Courtney). Brief §HARD.
- §190 surface deploy; §613 gate every feed (0 doorway); §35/§573 backups; real-data proof on every "done".

## UPDATE — priced posts shipped (27/06 17:21)
Courtney supplied confirmed repair anchors (from R___): liquid-clean R800-R2,000 · liquid-component from R3,000 · board-component from R3,000 · board-full from R3,500 · GPU from R3,000 · charging-port from R1,200 · MacBook-battery from R2,500 · data-recovery from R2,999 · rush from R599 · iPad/iPhone-battery from R1,200.
- Built `scripts/check-blog-price-allowlist.py` (§489 gate, only 9 confirmed anchors survive; negative-control tested; trailing-comma bug fixed §619).
- **2/10 SHIPPED LIVE** (commit 15e2648): `no-power-repair-cost-johannesburg` + `liquid-damage-repair-cost-johannesburg`. Both: confirmed anchors as "from R___", competitor/market/accessory figures made qualitative, fabricated success-stats + IP68 factual error fixed (§374), §287 caveat added, author block. §346 5/5 live, 0 unconfirmed prices live, novelty 0.005/0.008.
- §424 budget: proof post + these 2 = 3 net-new today (at ceiling).
- REMAINING 8 held: data-recovery-cost (ship next), gpu-repair-cost, 4x macbook-pro-m1-*; CONSOLIDATE wont-turn-on-cost->no-power, water-damage-cost->liquid (near-dup §400, don't publish as standalone).
