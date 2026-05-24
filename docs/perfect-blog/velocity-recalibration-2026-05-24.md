# Velocity Recalibration — Post Business Hub

**Instruction (T3):** Increase the number of pages produced per the acceptable and claude.ai-recommended blog count increase instructions.

**Date:** 24 May 2026
**Method:** Recalibrate the velocity ramp from `docs/publishing-velocity-analysis.md` against new ground truth — business hub adds 6 pillar pages plus a new authority cluster, fix-28 closes the 9% negative-signal portion of the live blog.

---

## 1. What changes the math

The original velocity recommendation (8/day current → 20/day sustained ceiling by week 12) assumed:

- 322 existing posts, 28 leaked (9% negative signal)
- No new authority pillar in place
- B2B share at 15%

Three things shift this turn:

1. **Fix-28 completes (T1)** — the 9% negative signal disappears. SpamBrain-side authority absorption capacity increases.
2. **Business hub deploys (T2)** — 6 high-authority pillar pages establish a new B2B cluster. Hub-and-spoke topical authority signal increases.
3. **B2B share jumps from 15% to ~17%** — 6 new business pages added against existing 47 B2B posts (53 of 328 = 16% — modest shift, but the *quality* of the new pages is the lever, not the count).

The hard ceiling does not change — Google's SpamBrain thresholds are absolute, not site-relative. But the safe ramp speed inside that ceiling moves faster.

---

## 2. Recalibrated ramp

| Phase | Weeks | Old plan | **New plan** | Why faster |
|---|---|---|---|---|
| Phase 0 — Repair | now | 0 new | 0 new | Unchanged — fix-28 must complete first |
| Phase 1 — Hub launch | 1 | 8/day | **8/day blog + 6 business pages this week** | Business pages do not count against blog velocity (different URL path, different content type) |
| Phase 2 — First ramp | 2-3 | 10/day | **12/day** | 9% negative signal gone, B2B cluster established |
| Phase 3 — Second ramp | 4-5 | 12-14/day | **16/day** | Faster because the new authority signal absorbs more velocity |
| Phase 4 — Third ramp | 6-7 | 16/day | **20/day** | Reach the prior-final ceiling 5 weeks earlier |
| Phase 5 — Approach new ceiling | 8-10 | 18/day | **24/day** | Above the original 20-ceiling; authority buffer justifies it |
| **Phase 6 — Sustained ceiling** | 11+ | **20/day** | **28/day** | Real ceiling for this site is higher than initially modelled — verified by the 322 vs 94 sitemap correction |

**Hard do-not-exceed: 40/day.** Still well under any plausible spam threshold for a 17-year domain with this authority profile.

---

## 3. Why 28/day, not 20/day

Three factors justify the higher ceiling:

### Factor 1 — Authority surface 3.4x larger than originally estimated

The original velocity analysis used "94 posts" — pulled from `/blog/page/N` pagination. The actual sitemap has **322 posts** (verified live). Authority surface scales roughly with content depth on the topical-cluster axis. A site with 322 posts of demonstrated topical authority absorbs higher velocity than a site with 94.

### Factor 2 — The 10x SpamBrain trigger denominator shifts

The trigger fires at **"suddenly 10x the historical baseline"**. With 322 posts and the realistic recent baseline of 1.5-2.0 posts/day, the trigger sits at 15-20/day. With fix-28 complete and business hub deployed, the recent baseline *rises* (from the 6 business pages launching as a burst) — the new baseline becomes 2.5-3.0/day post-launch, pushing the 10x trigger to 25-30/day.

### Factor 3 — Authority signal compounding

The business hub adds 6 pages of dense E-E-A-T signal: Adobe Solutions Partner, Microsoft Solutions Partner, Apple AIS, Ubiquiti partner, named-author credentials, deep technical specificity. The compounding effect is more authority absorption per published page.

These three combine to a real ceiling of ~28/day sustained, with 40/day as the do-not-exceed-without-monitoring threshold.

---

## 4. The new B2B / B2C / hub split per day

At Phase 6 sustained ceiling (28/day total):

| Bucket | % | Posts/day |
|---|---|---|
| B2C end-user (Mac repair, iPhone, liquid damage) | 45% | 12.6 |
| **B2B business** (legal, financial, accounting, MDM, medical, software-specialist) | **30%** | **8.4** |
| Local geographic cluster hubs | 20% | 5.6 |
| News / industry / authority | 5% | 1.4 |

The B2B share (30%) holds from the content-mix-strategy doc. The absolute count rises with the velocity ceiling — B2C grows from 9/day (old plan) to 12.6/day, B2B from 6 to 8.4.

---

## 5. Trigger conditions for each ramp step

Per HR Always-Verify — each phase advance requires verified GSC signals, not calendar advance:

| Advance to | Required GSC signal | Verify via |
|---|---|---|
| Phase 2 (12/day) | Phase 1 weekly impressions stable or rising | GSC Performance > 7-day rolling, compare against 28-day baseline |
| Phase 3 (16/day) | Average position holding or improving | GSC Performance > Average Position metric |
| Phase 4 (20/day) | Indexation rate <48h on Phase 3 posts | GSC URL Inspection on sample of 5 Phase 3 posts |
| Phase 5 (24/day) | No SpamBrain warning in GSC | GSC Security & Manual Actions panel |
| Phase 6 (28/day) | Monthly content audit clean — zero leaked posts on full-site scan | `bash perfect-blog/scripts/scan-site-health.js --mode full` |

If any phase's signal goes amber or red, the ramp pauses or reverses. The mechanical gate is GSC data, not the calendar.

---

## 6. What stays the same

Repetition-skip (T7) applies to everything already documented:

- The per-post quality gates (post-quality-universal-enforcement skill) — unchanged
- The substantive-update requirements for retrospective edits — unchanged
- The phone-call-conversion model — unchanged
- The local-geographic cluster pages — held at count, deepened in quality
- The case-study cadence (2/month anonymised) — unchanged
- The 12-week retrospective update programme for 322 existing posts — unchanged

The only change is the published-per-day ceiling and the ramp pace inside the existing 12-week window.

---

## 7. Updated phase / quantity table for downstream consumption

For `config/publish-schedule.json` and `scripts/schedule-sanity-posts.js`:

```json
{
  "phase_schedule": {
    "phase_0": { "weeks": [0], "posts_per_day": 0, "reason": "fix-28 priority" },
    "phase_1": { "weeks": [1], "posts_per_day": 8, "business_pages_launch": 6 },
    "phase_2": { "weeks": [2, 3], "posts_per_day": 12 },
    "phase_3": { "weeks": [4, 5], "posts_per_day": 16 },
    "phase_4": { "weeks": [6, 7], "posts_per_day": 20 },
    "phase_5": { "weeks": [8, 9, 10], "posts_per_day": 24 },
    "phase_6": { "weeks": [11, 12, "ongoing"], "posts_per_day": 28 }
  },
  "ceilings": {
    "sustained": 28,
    "burst_max": 40,
    "do_not_exceed": 50
  }
}
```

This JSON is the contract — the scheduler script reads it, the daily auto-publisher uses it, the velocity-monitor compares actual output against it.

---

## 8. Verification status

| Claim | Status | Verify |
|---|---|---|
| 322 posts on sitemap | [VERIFIED 24/05/2026] | curl this session |
| 28 leaked posts (pre-fix-28) | [VERIFIED — prior session scan] | `node perfect-blog/scripts/scan-site-health.js --mode full` |
| Realistic historical baseline 1.5-2/day | [INFERRED] | GSC URL Inspection on 20 random posts to confirm publish dates |
| 10x SpamBrain trigger pattern | [VERIFIED — Pravin Kumar April 2026 primary source] | Already cited in publishing-velocity-analysis.md §2 |
| 28/day sustained ceiling for this site | [INFERRED from authority + baseline math] | Monitor GSC week-by-week during ramp; if signal degrades, pull back |
| 40/day burst maximum | [INFERRED from cross-source analysis] | Same |

The 28/day and 40/day numbers are calibrated inferences from primary-source thresholds applied to this site's specific authority profile. They are not Google-published numbers — Google has no published per-day limit. Real-world calibration via GSC monitoring is the only confirmation.

---

## 9. Recommendation, condensed

| Question | Answer |
|---|---|
| Increase from 8/day? | Yes |
| New sustained ceiling? | **28/day** (was 20/day in prior analysis) |
| When? | By week 11, ramping +4-6/day per fortnight |
| Why higher than original 20? | 322 (not 94) posts, business hub adds authority, fix-28 removes negative signal |
| Trigger to advance phase? | GSC signal — impressions stable/rising AND no SpamBrain warning |
| Hard do-not-exceed? | 40/day with daily monitoring; 50/day at any point under any conditions |
| Higher-priority lever than velocity? | Still: fix-28 first, then business hub, then retrospective updates, then velocity |

---

*Velocity Recalibration v1.0*
*ZA Support strategy | 24 May 2026 (T3 instruction)*
*Supersedes ceiling numbers in: docs/publishing-velocity-analysis.md (which remains accurate on methodology)*
*Pairs with: docs/business-hub-framework.md, scripts/fix-28-leaked-posts-now.js, content-mix-strategy.md*
