# DECISIONS — SEO architecture & metadata log

Append-only. Each decision: date, context, decision, status.

## 2026-09-01 — Search architecture
- **Context:** production `/api/search` proxied Google Custom Search Engine and returned
  HTTP 500 ("Request contains an invalid argument") — no valid `GOOGLE_MAPS_API_KEY`.
- **Decision:** replace with a build-time **keyless native JSON index** (`public/search-index.json`)
  generated from `src/app/sitemap.ts` by `seo/scripts/build-search-index.mjs`; client + API rank locally.
- **Status:** built on branch `seo/organic-growth-infra`, unit + e2e tested. **Not deployed** (approval-gated).

## 2026-09-01 — Metadata (title / og:title) policy
- **Context:** 13/14 crawled pages have `title` ≠ `og:title`; most carry a generic
  `og:title = "Apple Repair Johannesburg | ZA Support"`. 10 pages have a doubled `| ZA Support` suffix.
- **Decision:** title/OG divergence is permissible **only when deliberate and documented here**.
  The generic shared og:title and the doubled suffix are template defects, not deliberate — flag for fix.
- **Status:** documented; fix is a staged remediation (REVIEW-QUEUE #10).

## 2026-09-01 — Meta keywords
- **Decision:** remove `<meta name="keywords">` sitewide (no ranking value, exposes targets).
  Present in 83 source files → staged multi-file PR, not a bulk auto-edit.
- **Status:** REVIEW-QUEUE #7. Detected by `audit-rendered-pages.mjs`.

## 2026-09-01 — Schema
- **Decision:** keep the existing entity graph (LocalBusiness / ComputerRepairService / Service /
  FAQPage / BreadcrumbList / ItemList / WebSite / WebPage). **No self-serving AggregateRating/Review**
  JSON-LD (Google ineligibility + manual-action risk). Enforced by `audit-schema.mjs` + `schema.test.ts`.
- **Status:** live production already compliant (no AggregateRating observed). Gate active.

## 2026-09-01 — Sitemap
- **Decision:** make `lastmod` truthful per-URL or omit; derive membership from canonical/indexable
  policy rather than a hardcoded 838-URL list. No mass service×location/model expansion.
- **Status:** REVIEW-QUEUE #8, #9. `audit-sitemap.mjs` flags the identical build-time lastmod.

## 2026-09-01 — Host canonical
- **Decision:** www should one-hop 301 to apex (currently serves 200 + canonical tag only).
- **Status:** REVIEW-QUEUE #2. `audit-canonicals.mjs` flags it. Draft only; approval-gated.
