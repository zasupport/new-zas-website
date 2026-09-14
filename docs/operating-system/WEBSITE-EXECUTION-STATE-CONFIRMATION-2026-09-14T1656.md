---
version: '1.0'
generated_local: 2026-09-14 16:56 SAST
generated_utc: '2026-09-14T14:56:00Z'
timezone: Africa/Johannesburg
generator: Claude Code (Opus 4.8)
recipient: Courtney Bentley
status: state-confirmed-search-release-frozen-awaiting-approval
provenance: Contract 4 + Workstream A of "ZA Support Website Final Lossless Claude Code Execution and Build Contract 2026-09-14 16h38 SAST"
supersession: none
---

# WEBSITE-EXECUTION-STATE-CONFIRMATION-2026-09-14T1656

## Current-state confirmation (Contract 4) — no material drift

| Fact | Value | Evidence state |
|---|---|---|
| Repo root | /Users/cb/Developer/new-zas-website | LOCAL_SOURCE_VERIFIED |
| Working branch | seo/organic-growth-infra @ 27f1e1e (pushed, 10 ahead / 0 behind main) | LOCAL_SOURCE_VERIFIED |
| Production (origin/main) | da20026 — matches contract "formerly da20026" | RUNTIME_VERIFIED |
| Sitemap | 838 URLs live (matches contract) | PRODUCTION_VERIFIED |
| robots.txt | Allow / ; Disallow /api/ /admin/ /studio/ | PRODUCTION_VERIFIED |
| Apex/http redirect | http -> 301 -> https apex | PRODUCTION_VERIFIED |
| www host | www serves HTTP 200, NO 301 to apex (open item, Contract 10) | PRODUCTION_VERIFIED |
| Live /api/search | HTTP 500 (?q=battery and ?q=logic) — Search P0 still live | PRODUCTION_VERIFIED |

## Search P0 root cause (Contract 11) — resolved on branch, unreleased

Production `main` runs the old Google CSE proxy (`route.ts`) which 500s when the
external key/cx is missing. The keyless replacement (static-imported committed
search index bundled into the serverless function) is committed on the working
branch inside fused commit `5a90e4b` but has never been released to production.
`public/search-index.json` does not exist on `main`.

## Isolated release prepared and verified

Branch `release/search-500-fix` @ **e6cb843**, forked from origin/main (da20026),
containing ONLY the 5 coherent search files:
`src/app/api/search/route.ts`, `src/app/search/SearchResults.tsx`,
`public/search-index.json`, `seo/scripts/build-search-index.mjs`,
`tests/e2e/site-search.spec.ts`. Dependency isolation confirmed
(`buildWhatsAppUrl` exists on main unchanged; route imports only next/server + the JSON).

Isolated production build off main: `next build` exit 0 ("Compiled successfully 22.8s"),
`/api/search` compiled as a server function. Route matrix (local production build):

| Input | HTTP | Result |
|---|---|---|
| battery | 200 | 78 ranked |
| logic board | 200 | 136 ranked |
| liquid damage | 200 | 116 ranked |
| empty q= | 400 | Missing query |
| no-result (zzzxqq) | 200 | 0 (graceful) |
| injection (<script>) | 200 | 0 (no crash) |
| oversized 2000-char | 200 | 0 (no crash) |

Evidence state: RUNTIME_VERIFIED (local production build). Remaining stronger proof
= Vercel preview or production readback (EXTERNAL_SERVICE_VERIFIED), pending approval.

## Held (NOT in this release)

- **Homepage claims (page.tsx)** — branch AND live still carry retired claims
  (632+, 120+ reviews, "16 years", "50,000") and lack approved 75,000+/645+.
  A1 commit fixed only FAQ fee wording, not the Contract 7 claims scrub. HELD.
- **Machine-local framework install (a0b891f on working branch)** — 53 `.claude/`
  files + 1386-line validation.log + CI workflow committed to the website repo.
  This is why a whole-branch "release train" merge is wrong. Flagged for review.

## Gated decision required

Production merge of e6cb843 into main (Contract 5) requires explicit owner approval.
