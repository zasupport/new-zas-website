# Wording Remediation Worklist (assessment fee, trust claims, reviews)

**Compiled:** 12 September 2026, from full source discovery (session 95d83018).
**Class:** pricing / legal / trust claims -> **approval-gated** (`seo-policy.json.approval_boundary`,
§190). Nothing here is auto-applied. Every item states its approval and dependency.
**SoT it reconciles to:** `seo/config/facts-register.json` (mirror `docs/seo/FACTS-REGISTER.md`).
**Enforcement:** `seo/scripts/audit-claims.mjs --block` (already exists) is the regression gate;
its facts-register variant coverage must be widened to catch every pattern below.

Every count and `file:line` here is from a real source scan, not inference. Blog bulk figures are
counts with representative lines.

---

## Cross-cutting dependencies (resolve before or alongside)

1. **Pricing is temporarily hidden** (memory 15/07/2026): service/marketing pages show "Contact for
   pricing"; **the blog kept its prices**. The pricing restore ("new prices within ~a month") is now
   ~2 months overdue. The **R599/R899 fee-amount split is therefore mostly a blog problem**, and
   fee-amount edits on service pages should be folded into the pricing restore, not done ahead of
   it. Restore path: git tag `pre-pricing-strip-2026-07-15`.
2. **`google-rating.json` is stale** (`count:645`, fetched 2026-07-25; policy = weekly-min). The
   review-count fix needs a **fresh GBP pull first**; do not harmonise everything to a stale 645.

---

## A. Assessment-fee wording  (FR-006 / 007 / 008)

**Delta:** 66 files carry prohibited "credited / deducted / included / waived / absorbed" wording;
R899 computer fee appears nowhere; R599 is applied to computers in the blog. No chokepoint component
(`PricingNote.tsx` / `PricingDisclaimer.tsx` carry generic disclaimers only).

| # | Item | Files | Class | Approval / dependency |
|---|---|---|---|---|
| A1 | Homepage FAQ "assessment fee is **included in the total**" | `src/app/page.tsx:148` | NOW | Approve wording -> single-file PR. The exact legacy conflict FR-008 flags. |
| A2 | "credited / deducted / included / waived / absorbed" on **service pages** | ~40 service/suburb/model pages (e.g. `no-fix-no-fee/page.tsx:82,87,237,581`, `apple-repair:451`, `logic-board-repair:103,479,598`, `liquid-damage:458,489`, `enterprise:460`, `battery-replacement/*`) | NEXT | Approve replacement wording -> staged multi-file PR. Independent of the pricing hide (these are policy phrases, not Rand amounts). |
| A3 | "including VAT" contradicting excl-VAT policy | `liquid-damage:458`, `logic-board-repair:479` | NEXT | Fold into A2. |
| A4 | R599 stated for **computers** (should be R899) + credited language | blog (`blog/[slug]/page.tsx` many lines: 155,325,387,430,438,477,565,...), `logic-board-repair/macbook-pro-m1` | LATER | **Depends on pricing restore.** Blog kept prices; reconcile fee split during restore. |
| A5 | R899 computer fee stated nowhere | (add on approved service pages) | NEXT (with restore) | Approve + place on computer service pages when pricing returns. |

## B. Establishment wording  (FR-001)

**Delta:** `src/lib/constants.ts:16 yearsExperience:'16'` is the **chokepoint** feeding ~25 pages;
`foundingDate:'2009'` is already correct. Plus "14 years" in 3 blog .md and "17 years" founder tenure.

| # | Item | Files | Class | Approval / dependency |
|---|---|---|---|---|
| B1 | Remove/retire the `yearsExperience` derived-duration constant; repoint copy to "Established in 2009" | `src/lib/constants.ts:16,109` + ~25 consuming pages (page.tsx:99,262,304; no-fix-no-fee:159,200,518,527; enterprise:487; apple-repair:283; business:62,137; sme-support:192,220; mac-mini-repair:382; logic-board-repair/{mac-mini,imac}; RelatedServices.tsx:21; etc.) | NOW-NEXT | Approve wording -> chokepoint edit + staged consumer PR. Highest-leverage: one constant drives most of it. |
| B2 | Stray "14 years" | `content/blog/2026-03-09-*.md` (3 files) | NEXT | Approve -> edit. |
| B3 | Founder tenure "17 years" (about, editorial-policy) | `about/page.tsx:256,260`, `editorial-policy/page.tsx:10` | DECISION | **Your call** (§384): is founder personal experience a separate, true claim ("17 years") kept distinct from company age ("Established 2009")? If yes, keep and label; if no, align. |

## C. Repair metrics  (FR-002 / 003 / 004)

**Delta:** clean tiered sentence exists once (`logic-board-repair/page.tsx:308-309`); 50,000+ is
relabelled as batteries/screens/MacBooks elsewhere; blog uses a contradictory 12k/15k/18k family
(~300 instances).

| # | Item | Files | Class | Approval / dependency |
|---|---|---|---|---|
| C1 | 50,000+ relabelled as subset ("Batteries Replaced", "Screens Replaced", "MacBooks Recovered") | `macbook-repair/battery:250`, `macbook-repair/screen:179`, `macbook-not-turning-on:365`, `logic-board-repair/{imac:182,mac-mini:183}` | NEXT | Approve the canonical 3-figure block (FACTS-REGISTER) -> edit to the approved separated presentation. |
| C2 | Blog 12k/15k/18k contradictory figures + false durations ("past decade/eight years") | `blog/[slug]/page.tsx` (~300 lines), `blog/page.tsx` (~35) | LATER | Large blog-corpus remediation. Stage carefully; regenerate-not-rewrite where possible. Reconcile to the three approved figures. |

## D. Reviews  (FR-005)

**Delta:** three counts ship together, 645 (dynamic SoT, but stale), 632/632+ (~30 hardcoded), 120+
(homepage). Rating 4.9 hardcoded in meta/strings. AggregateRating JSON-LD prohibition is honoured.

| # | Item | Files | Class | Approval / dependency |
|---|---|---|---|---|
| D1 | Refresh the GBP source (`google-rating.json` stale 7 weeks) | data pipeline | NOW | **Owner: re-auth / run GBP sync.** Prerequisite for everything in D. |
| D2 | Route all counts through the single SoT (`SITE.reviewCount`); remove hardcoded 632/632+ | ~30 files (meta: `page.tsx:18`, `layout.tsx:30`, `apple-repair:30`, `apple-support:18`; `about:276,310`, `services:287`, iphone/ipad/macbook sub-pages) | NEXT | After D1. Approve -> staged PR. |
| D3 | Remove hardcoded 120+ | `page.tsx:94` | NEXT | Fold into D2. |
| D4 | Route hardcoded "4.9" through SoT so it cannot go stale | meta + review lines | NEXT | Fold into D2. |
| D5 | Rename misleading `aggregateRatingSchema` var + dedupe second LocalBusiness node on blog | `blog/[slug]/page.tsx:73663,74741` | NEXT | Not a live rating violation; naming + duplicate-node hygiene. |

---

## Recommended sequence

1. **D1** (owner refreshes GBP) — unblocks the whole review workstream and is a one-action owner task.
2. **A1 + B1** — the two highest-leverage, lowest-risk edits (one homepage FAQ line; one chokepoint
   constant). Small, approvable, high-trust-impact.
3. Widen `facts-register.json` variant coverage + confirm `audit-claims.mjs --block` is wired into
   `seo-pr-gates.yml`, so no new violation can be introduced while the backlog is worked.
4. **A2/A3, B2, C1, D2-D5** — staged multi-file PRs, each preview-verified, each measured.
5. **A4/A5, C2** — folded into the pricing restore and a careful blog-corpus pass.

No item is applied without your approval of the exact wording.
