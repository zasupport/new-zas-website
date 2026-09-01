# BASELINE-CURRENT — ZA Support organic-growth Phase A

**Generated:** 2026-09-01 (live production crawl, read-only)
**Base:** https://zasupport.com
**Branch:** `seo/organic-growth-infra`
**Method:** `node seo/scripts/crawl-site.mjs` + direct `curl` verification. No production change made.
**Raw evidence:** `seo/reports/crawl-2026-09-01.json`

> All figures below are from a live crawl on the generation date and supersede the
> handoff's historic (10–12 Aug 2026) observations. Refresh before each phase.

## 1. Stack and hosting (confirmed)

- Next.js App Router, Vercel (`server: Vercel` header), Sanity CMS (`NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, `SANITY_API_READ_TOKEN` present by name only).
- Apex canonical: `https://zasupport.com`. Package: `new-zas-website`, npm (package-lock.json), Node 26.
- Current HEAD: `da20026` (main). Work isolated on branch `seo/organic-growth-infra`.

## 2. Response-code breakdown (mandated Phase-A URL set)

All 16 mandated URLs returned **HTTP 200**:
`/`, `/apple-repair`, `/iphone-repair`, `/macbook-repair`, `/logic-board-repair`,
`/liquid-damage`, `/battery-replacement`, `/screen-repair`, `/imac-repair`,
`/mac-mini-repair`, `/book`, `/contact`, `/business`, `/search?q=Logic%20board`,
`/robots.txt`, `/sitemap.xml`.

No 4xx/5xx among priority money pages at crawl time.

## 3. www vs apex — **OPEN, host-canonical issue (P1)**

- `https://www.zasupport.com/` returns **HTTP 200 directly** (served by Vercel), **not a 301** to apex.
- The www page declares `<link rel="canonical" href="https://zasupport.com">`.
- **Risk:** duplicate-host serving; canonical tag is a hint, not an enforced redirect. Handoff §9-D wants a narrowly scoped one-hop 301 www→apex, preview-verified, rollback-planned.
- **Action:** APPROVAL-GATED. Do not change production redirect policy without owner approval. Draft only.

## 4. Sitemap integrity

- `sitemap.xml`: **838 `<loc>` URLs**.
- **`lastmod` integrity FAIL:** all 838 URLs share a **single identical `<lastmod>` = `2026-08-12T13:15:32.342Z`** — this is build time, not real content modification. `src/app/sitemap.ts` sets `lastModified: now` for every entry.
- **Action:** make `lastmod` truthful per-URL or omit it (Handoff §5.2, §9-D). Sitemap should be derived from canonical/indexable policy, not a hardcoded 838-entry list.

## 5. robots.txt (correct — no change needed)

- `Allow: /`; `Disallow: /api/ /admin/ /studio/`; explicit AI-crawler allowlist (GPTBot, ClaudeBot, PerplexityBot, Google-Extended, Applebot-Extended, CCBot, etc.); `Sitemap:` present.
- Matches `seo/config/seo-policy.json` protected-disallow and "do not silently alter AI crawler permissions".

## 6. Metadata findings

- **Meta keywords PRESENT on every crawled page** — no Google ranking benefit, exposes target terms. Handoff §5.4/§9-D: remove. (P2)
- **title ≠ og:title on 13/14 content pages.** Most pages carry a page-specific `<title>` but a generic `og:title = "Apple Repair Johannesburg | ZA Support"`. Establish an intentional metadata policy; document any deliberate divergence in DECISIONS.md. (P2)
- **Doubled title suffix on 10 pages:** `... | ZA Support | ZA Support` (e.g. `/apple-repair`, `/screen-repair`, `/book`, `/contact`, `/search`). Title-template bug. (P2)

## 7. Schema coverage by template (JSON-LD types observed live)

| Template | Types present |
|---|---|
| `/` homepage | LocalBusiness, ComputerRepairService, WebSite, FAQPage, WebPage |
| service hubs (`/apple-repair`, `/iphone-repair`) | LocalBusiness, ComputerRepairService, FAQPage, Service, BreadcrumbList |
| `/macbook-repair`, `/logic-board-repair` | + ItemList (and WebPage on logic-board) |
| money pages (liquid/battery/screen/imac/mac-mini) | LocalBusiness, ComputerRepairService, Service, FAQPage (+BreadcrumbList on most) |
| `/book`, `/contact` | LocalBusiness, ComputerRepairService (+BreadcrumbList on contact) |
| `/search` | LocalBusiness, ComputerRepairService |

- **No self-serving AggregateRating/Review JSON-LD observed** — compliant with §166 / seo-policy.json. (PASS)
- WebSite/SearchAction: SearchAction target pattern points at `/search` — but **site search is broken** (§8), so SearchAction integrity is compromised until search is fixed.

## 8. Search — **P0, reproduced live**

- `/search?q=Logic%20board` (the page) returns **HTTP 200** and renders, but the results come from `/api/search`, which returns **HTTP 500** with body `{"error":"Request contains an invalid argument."}`.
- **Root cause (verified):** `src/app/api/search/route.ts` proxies **Google Custom Search Engine** using `GOOGLE_MAPS_API_KEY` + `GOOGLE_CSE_CX`. `.env.local` has `GOOGLE_CSE_CX` but **no `GOOGLE_MAPS_API_KEY`** by name; production returns the Google CSE "invalid argument" error. The dependency on an external keyed API is exactly the fragility the handoff §5.5 warns against.
- **Mitigation banked:** `/search` already sets `robots: noindex, follow` (crawl-trap acceptance criterion partly met).
- **Canonical defect on `/search`:** the search page declares `canonical = https://zasupport.com` (the homepage), not self — misleading; review under metadata policy.
- **Fix direction (Handoff §5.5.3):** replace external CSE with a **build-time native JSON content index** (no external key, deterministic, CI-testable) + Playwright e2e. Built on-branch, **not deployed** (approval-gated).

## 9. Claim / content conflicts (live homepage) — feed the Facts Register

| Finding (live count on `/`) | Facts-register | Verdict |
|---|---|---|
| Review figure `645` ×39 **and** `632` ×2 present simultaneously | FR-005 | **CONFLICT** — competing hard-coded figures; must use single GBP source |
| `16 Year(s)` ×10 | FR-001 | **CONFLICT** — replace with "Established in 2009" |
| `"the assessment fee is included in the total"` ×2 (homepage FAQ) | FR-008 | **CONFLICT (P1)** — contradicts approved non-creditable/not-included policy; remove/replace everywhere |
| `no hidden` ×2, `transparent pricing` ×3 | pricing-display | Review wording vs the R2,199-vs-R6,500 review complaint (§5.3) |
| `Authorised Service Provider` ×4 | FR-009 | **COMPLIANT** — context is the FAQ "…independent Apple specialist, **not** an Apple Authorised Service Provider (AASP)". The claims audit must not false-positive on this correct negation. |
| `50,000` ×2 | FR-002 | Present; ensure explanatory label and no merge with 25,000 / 17,000 |

## 10. Conversion path health (crawl-time)

- `/book` and `/contact` both 200 with LocalBusiness/ComputerRepairService schema; WhatsApp/phone CTAs present in page HTML (not audited for click-through here — see `audit-conversions.mjs`).
- Booking assessment-fee consent wording must be reconciled to FR-006/FR-007/FR-008 (Phase E).

## 11. High-risk pages and recommended containment

| Item | Severity | Containment (all draft/approval-gated) |
|---|---|---|
| Broken onsite search (CSE 500) | P0 | Build-time index fix on-branch + tests; no deploy |
| www serves 200, no 301 | P1 | Draft one-hop 301 www→apex; preview-verify; no deploy |
| Assessment-fee "included in total" FAQ | P1 | Draft content correction to approved FR-008 wording |
| Conflicting review figures 645/632 | P1 | Single GBP-sourced value; suppress on stale; no fabricated number |
| Sitemap lastmod = build time | P2 | Truthful per-URL lastmod or omit |
| Meta keywords present sitewide | P2 | Remove |
| title≠og:title (13 pages) + doubled suffix (10) | P2 | Intentional metadata policy + fix template |
| 838 hardcoded sitemap URLs / doorway matrix risk | P2 | Route-family audit before any expansion (§5.2, §7.3) |

## 12. Owner decisions required (carry to REVIEW-QUEUE.md)

1. Approve one-hop 301 www→apex (host canonicalisation).
2. Approve search architecture: build-time native JSON index (recommended) vs Pagefind vs keep CSE (needs a valid Google API key).
3. Approve homepage FAQ correction removing "assessment fee is included in the total".
4. Confirm single Google-review source + display policy (FR-005) and the exact value.
5. Legal/contract verification of Apple Original Parts / authorised-resale wording (FR-009).
6. Approve removal of meta keywords + metadata (title/OG) policy.

**No production change was made in Phase A.**
