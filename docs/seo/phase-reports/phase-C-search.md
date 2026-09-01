# Phase Report — C: onsite search repair

## Evidence collected
- Production reproduction 2026-09-01: `/search?q=Logic board` page = HTTP 200 but `/api/search` = HTTP 500 `{"error":"Request contains an invalid argument."}` (Google CSE). `.env.local` has `GOOGLE_CSE_CX`, no `GOOGLE_MAPS_API_KEY`.

## Findings
- Root cause: external Google Custom Search Engine dependency, no valid API key → 500 for every non-empty query. `/search` already `noindex,follow` (crawl-trap partly mitigated). `/search` canonical points at homepage (defect).

## Changes proposed/applied (branch seo/organic-growth-infra, NOT deployed)
- `seo/scripts/build-search-index.mjs` → `public/search-index.json` (838 entries, keyless, from `src/app/sitemap.ts`; curated metadata on 17 priority pages).
- `src/app/search/SearchResults.tsx` — client now fetches the static index + ranks locally (removed the /api/search call dependency for results).
- `src/app/api/search/route.ts` — rewritten to serve from the static index (removed CSE + external key entirely).
- `package.json` — `prebuild` regenerates the index; `search:index`, `test:e2e`, `test:seo` scripts.
- Tests: `tests/e2e/site-search.spec.ts` (Logic board / hyphen / URL-encoded / empty / no-result / noindex / keyboard) + unit search acceptance in `tests/seo/metadata.test.ts`.

## Verification
- `npm run search:index` → 838 entries. Acceptance queries ("Logic board", "logic-board", "MacBook liquid damage", "battery", "screen repair", "macbook") all resolve to expected content.
- `npx tsc --noEmit` → 0 errors. `node --test tests/seo/*.test.ts` → 18/18 pass.
- E2E specs authored (run in CI against a local build via `seo-pr-gates.yml`).

## Owner decisions required
- REVIEW-QUEUE #1 (approve keyless-index architecture) before merge/deploy.

## Rollback
- `git revert` the branch commit, or `git checkout main -- src/app/search src/app/api/search`.

## Next safe action
- Open a preview PR; run e2e against the Vercel preview; obtain approval to merge.
