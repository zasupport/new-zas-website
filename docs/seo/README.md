# ZA Support — organic-growth SEO infrastructure

Implements the *Master Claude Code Handoff — Organic Growth v1.0* (1 Sep 2026).
Everything here is **read-only tooling + tests + governance**. Nothing in this system
deploys, merges, publishes CMS content, changes GBP/Search Console, buys links, or
sends customer communications. Those remain **human-approval-gated** (Handoff §2.3).

## Layout

```
docs/seo/                Human-readable governance
  BASELINE-CURRENT.md      Phase A live baseline (evidence-backed)
  FACTS-REGISTER.md        Human mirror of the approved claims (SoT: seo/config/facts-register.json)
  DECISIONS.md             Metadata/architecture decisions log
  REVIEW-QUEUE.md          Owner decisions still required
  *-REGISTER.csv           Keyword/page, cannibalisation, content, redirect registers
  WEEKLY-SEO-REPORT.md     Report template (§12); dated instances land in seo/reports/
  phase-reports/           Per-phase §12 reports

seo/config/              Machine-readable policy (SoT)
  seo-policy.json          Host/indexability/metadata/schema/reviews/pricing/approval policy
  service-taxonomy.json    Two-pillar taxonomy + commercial clusters
  intent-map.json          Query -> canonical page (historic GSC; refresh before use)
  noindex-rules.json       Deliberate noindex/canonical policy
  facts-register.json      Approved claims SoT (+ facts-register.schema.json)

seo/scripts/             Read-only audits (Node, no external keys)
  crawl-site.mjs           Phase-A crawler -> seo/reports/crawl-<date>.json
  build-search-index.mjs   Keyless build-time search index -> public/search-index.json
  audit-*.mjs              sitemap, canonicals, schema, search, claims, content-duplication,
                           internal-links, conversions, rendered-pages
  gsc-*.mjs                Opportunity + cannibalisation (honest: no live export -> "unavailable")
  generate-weekly-report.mjs  Aggregates the audits into a dated report
  lib/                     crawl.mjs (fetch/parse), detectors.mjs (shared gate logic)

tests/seo/*.test.ts      node:test unit gates (positive/negative/absence controls)
tests/e2e/*.spec.ts      Playwright: search, conversions, rendering

.github/workflows/
  seo-pr-gates.yml         PR gate: typecheck, lint, build, unit tests, e2e
  seo-weekly-audit.yml     Scheduled read-only audit + P0 issue (no auto-fix)
```

## Commands

```bash
npm run search:index          # regenerate public/search-index.json (also runs on prebuild)
npm run seo:crawl             # Phase-A crawl
npm run seo:audit:search      # reproduce the search P0
npm run seo:audit:schema      # AggregateRating self-markup gate
npm run seo:audit:claims      # facts-register conflict scan (homepage)
npm run seo:report:weekly     # full read-only audit -> seo/reports/weekly-audit-<date>.md
node --test tests/seo/*.test.ts   # unit gates
npx playwright test           # e2e (needs a build; BASE_URL to target a preview)
```

## Search (P0) fix

Production `/api/search` returned HTTP 500 (Google Custom Search Engine dependency).
It is replaced with a **build-time keyless JSON index** (`public/search-index.json`,
generated from `src/app/sitemap.ts`) with client- and server-side ranking. No external
API key. The `/search` page stays `noindex,follow` (no crawl trap). Built on-branch;
**not deployed** — merge requires approval.

## What still needs an owner

See `REVIEW-QUEUE.md`. In short: www→apex 301, homepage FAQ "assessment fee included"
correction, single Google-review source/value, Apple resale wording (legal),
meta-keywords removal (83 files), and the search-architecture sign-off.
