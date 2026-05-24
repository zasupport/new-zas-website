# T3 — Velocity Ramp Update (delta to publishing-velocity-analysis.md)

**Date:** 24 May 2026
**Status:** Active increment to the existing ramp
**Per T7:** Skips repetition — see `publishing-velocity-analysis.md` for full rationale, ceiling math, and primary sources

---

## 1. What changed this turn

Three inputs require the ramp to be updated:

1. **6 business hub pages approved** (T2) — these need to ship inside the next 2 weeks per the batch plan
2. **28 leaked posts entering repair queue** (T1) — counts as substantive updates, not new content
3. **322-post inventory entering systematic update programme** (T4) — adds steady update cadence

## 2. The updated combined cadence

| Activity | Items/day | Counts as |
|---|---|---|
| New blog posts | 8-10/day | New content (per existing ramp Phase 1-2) |
| Business hub pages | 2-3/week during build weeks 1-2 | New content (but service pages, not blog) |
| Retrospective updates (top-20 + page-2 + critical) | 4-6/day | Substantive updates per retrospective-update-strategy.md |
| 28 leaked-post fixes | One-off burst (week 0) | Existing content remediation |

**Combined daily ceiling: 14 content events per day at peak** during weeks 1-2, mixing new + updated. This is within the 20/day sustained ceiling already established.

## 3. Per the 12-week ramp — adjusted phase table

| Phase | Weeks | New blog/day | Updates/day | Business pages this phase | Total events/day |
|---|---|---|---|---|---|
| 0 | now | 0 new | 0 | 0 | 28 leak fixes (one-off) |
| 1 | 1-2 | 8 | 4 | 3 (Batch 1) | 12 + business pages |
| 2 | 3-4 | 10 | 5 | 2 (Batch 2) | 15 + business pages |
| 3 | 5-6 | 12 | 6 | 1 (hub page) | 18 + hub |
| 4 | 7-8 | 14 | 6 | 0 | 20 |
| 5 | 9-10 | 16 | 6 | 0 | 22 |
| 6 | 11-12 | 18-20 | 4 | 0 | 22-24 |

The total event ceiling rises to ~22-24/day at peak. Still below the 30/day danger zone, still within the 17-year domain absorption buffer.

## 4. The single adjustment to the existing strategy

`publishing-velocity-analysis.md` Phase 4 was 14/day new blog posts at week 7-8. **This holds.** The retrospective updates added to it do not count against the new-post ceiling because Google treats updates and new content as distinct signal classes (per `retrospective-update-strategy.md` § 2 primary sources).

The 6 business hub pages are also distinct — service-page intent ≠ blog post intent. Google does not group them when assessing velocity per content type.

## 5. The gate that prevents accidental over-velocity

A new pre-publish gate enforces the combined ceiling automatically. Added to `scripts/pre-build-leak-check.js` as an extension:

```javascript
// pre-publish ceiling check
const today = new Date().toISOString().split('T')[0]
const todaysPublishes = await sanityClient.fetch(
  `count(*[_type in ["blogPost","servicePage"] && publishedAt match "${today}*"])`
)

const HARD_CEILING = 30  // never exceed under any condition
const CURRENT_PHASE_CEILING = await readPhaseConfig()  // reads from config/velocity-phase.json

if (todaysPublishes >= HARD_CEILING) {
  throw new Error(`HARD CEILING reached — ${todaysPublishes} events today. Block publish.`)
}
if (todaysPublishes >= CURRENT_PHASE_CEILING) {
  console.warn(`Phase ceiling reached — defer to tomorrow`)
  process.exit(2)  // block but don't error
}
```

The phase config file lives at `config/velocity-phase.json` and is updated weekly as the ramp advances.

## 6. Safety net (T6) — emergency velocity rollback

If GSC shows traffic decline >10% over any 7-day rolling window during the ramp:

```bash
# Step 1 — pause all new publishing
echo '{"current_phase": 0, "new_per_day": 0, "updates_per_day": 0}' > config/velocity-phase.json
git add config/velocity-phase.json && git commit -m "Emergency velocity halt — investigate GSC drop"

# Step 2 — revert to last known good phase
git revert <commit-of-last-phase-advance>

# Step 3 — full leak scan in case the cause was a regression
node scripts/scan-site-health.js --mode full
```

The safety net pauses publishing without rolling back any already-published content. Investigation proceeds before resuming.

## 7. Verification

| Claim | Status | Verify command |
|---|---|---|
| 20/day sustained ceiling for 17-year domain | **[INFERRED — primary research]** | See publishing-velocity-analysis.md §3 |
| 30/day hard ceiling | **[INFERRED — SpamBrain 10x baseline math]** | Same |
| Service page velocity counted separately from blog | **[INFERRED — Google segmentation logic]** | Verify after first GSC review post-launch |
| Current daily publish count | **[UNVERIFIABLE from chat]** | `node scripts/count-todays-publishes.js` in Claude Code |

---

*T3 ramp update | 24 May 2026 | Pairs with publishing-velocity-analysis.md (full rationale), retrospective-update-strategy.md, T2 business hub runbook*
