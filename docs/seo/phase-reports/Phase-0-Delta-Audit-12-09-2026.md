# Phase Report, Phase 0: Current-State Delta Audit

**Date:** 12 September 2026, 11h55 SAST. **Session:** 95d83018. **Branch:** `seo/organic-growth-infra`.
**Trigger:** Website Audit Master Handoff (12 September 2026).

## Six-pass review summary
- **Objective:** Establish the verified current state vs the handoff's required state before any
  change, so remediation is evidence-led (handoff §0.5, §19). Not a rebuild.
- **Evidence:** Live production fetches, source discovery (two read-only agents), existing registers,
  git history, capability snapshot. Labelled verified / drift / blocked below.
- **Architecture:** The SEO technical core is already built; the change-attribution spine
  (`docs/operating-system/`) was missing and is now stood up.
- **Risks:** Trust-claim inconsistency shipping live (three review counts, three duration figures);
  undeployed search fix; stale GBP source; data-dependent analysis blocked by failed connectors.
- **Optimisation:** Highest-leverage fixes are chokepoints (one `yearsExperience` constant; one
  homepage FAQ line; one GBP source refresh), not broad rewrites.
- **Disconfirmation:** A source-tree delta cannot tell live truth; the live P0 checks below were run
  to disconfirm "search is broken" and did (page + sitemap serve 200).

## Evidence collected
- Live: `curl` of `/`, `/search?q=Logic board`, `/sitemap.xml`, `/api/search` (12/09, this session).
- Source: full `src/` discovery of assessment-fee wording (66 files) and claims/metrics/reviews.
- Registers: `docs/seo/*`, `seo/config/*`, `DECISIONS.md`. Capability: session MCP/connector state.
- **Limitations:** GSC + GA4 + Sanity + Cloudflare MCP servers failed to connect this session; GSC
  export STALE 261h. Data-driven analysis (cannibalisation, opportunity, GBP/analytics attribution)
  is therefore blocked on fresh data + re-auth. GBP live state UNKNOWN_NOT_CHECKED.

## Findings
**Verified (live):**
- `/search?q=` -> 200 (48 KB); `/sitemap.xml` -> 200 (155 KB); `/` -> 200. The handoff's P0 "search
  fetch failed" was transient; onsite search is **not** broken in production.
- SEO technical core already built (commit `5a90e4b`): keyless search (`/search` + static index),
  6 `seo/config` files, 13 audit scripts, 8 tests, 2 CI workflows, core `docs/seo` registers.
- AggregateRating self-markup prohibition is honoured in the schema layer.

**Drift (source vs production):**
- `/api/search` live -> HTTP 500 (old Google CSE proxy). The keyless rewrite exists in-branch and is
  tested but **undeployed** (`DECISIONS.md` 2026-09-01). Corrects my initial "dead route" read: it is
  the search backend, awaiting deploy approval.

**Inconsistency shipping live (approval-gated to fix):**
- Reviews: 645 (dynamic SoT, stale 7 weeks) + 632/632+ (~30 hardcoded) + 120+ (homepage).
- Duration: "16 years" (~25 pages) + "14 years" (3 blog .md) + "17 years" (founder bio) alongside the
  correct "Established 2009".
- Assessment fee: 66 files with prohibited credited/deducted/included/waived wording; R899 computer
  fee absent; R599 applied to computers in the blog.
- Repair metrics: clean once; 50,000+ relabelled as subset; blog uses 12k/15k/18k (~300 instances).

**Unknowns / blocked:** GBP live state; fresh GSC/GA4 data; whether "17 years" founder tenure is a
deliberate separate claim.

## Changes proposed/applied
**Applied this phase (safe, no approval needed):**
- Stood up `docs/operating-system/`: `README`, `PROJECT-CHARTER`, `IDEAL-STATE`, `CAPABILITY-REGISTRY`
  (real dated status), and append-only ledgers (`CHANGE-PERFORMANCE`, `GBP-PERFORMANCE`,
  `SEARCH-CONSOLE-HISTORY`, `ANALYTICS-CONVERSION-HISTORY`), `RELEASE-TO-OUTCOME-MAP`.
- Compiled `docs/seo/WORDING-REMEDIATION-WORKLIST.md` (evidence-cited, chokepoint-first,
  dependency-aware, NOW/NEXT/LATER).

**Proposed (approval-gated, NOT applied):** everything in the worklist; deploy of the keyless search
fix; www->apex 301; meta-keywords removal.

## Verification
- Live curls (results above). File writes confirmed on disk. No source code changed this phase (docs
  and registers only), so no build/test run required for this deliverable.
- Discovery agents cited real `file:line` throughout; figures are scanned, not inferred.

## Metrics
- **Baseline:** `docs/seo/BASELINE-CURRENT.md` + GSC 12 May-10 Aug 2026 (handoff §6.1).
- **Primary:** qualified leads -> completed-job gross margin. **Guardrails:** GSC position/CTR, no
  indexation regression. **Window:** 28/56/90 days after any approved change.

## Disconfirmation
- What would prove this wrong: a fresh crawl showing search broken at scale, or GBP live count
  matching one of the hardcoded figures. Counterfactual: if GBP is genuinely 632, the SoT (645) is
  the stale one and D2 harmonises to the fresh pull, not to 645.

## Owner decisions required
1. **Unblock GSC/GA data.** Two blockers confirmed this session: MCP connectors CONNECTION_CLOSED,
   and the local export failed on missing Python libs (`google-auth`, `google-api-python-client`).
   Next step: install those libs and re-run `za-gsc-page-export.py --export`; only if it then fails
   on credentials is owner re-auth needed. Also **refresh the stale GBP source** (unblocks reviews).
2. Approve the two highest-leverage wording edits (**A1** homepage FAQ, **B1** `yearsExperience`
   chokepoint), exact wording per FACTS-REGISTER.
3. Decide the "17 years" founder-tenure question (separate true claim, or align).
4. Approve deploy of the built keyless search fix (or keep held).

## Rollback
- Docs/registers are additive; removal is `git rm` of the new files. No production or content change
  was made, so there is nothing live to roll back this phase.

## Learning update
- A source-tree delta must be disconfirmed against live production before a P0 is called resolved or
  broken (the `/api/search` drift and the working `/search` both proved this). Recorded in
  `DECISIONS.md` context.

## Next safe action
Owner re-auths GSC/GA + refreshes GBP (D1), which unblocks the data-driven audits; in parallel,
approve A1 + B1 for the first small, measured, reversible wording PR.
