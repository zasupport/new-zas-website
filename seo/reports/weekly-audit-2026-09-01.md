# Weekly SEO Audit — 2026-09-01

**Base:** https://zasupport.com
**Generated:** 2026-09-01T11:58:40.487Z (read-only; no production change)

| Audit | Exit | Verdict |
|---|--:|---|
| Search (P0) | 2 | FINDING (gate) |
| Sitemap integrity | 0 | PASS/report |
| Canonical / host | 0 | PASS/report |
| Schema | 0 | PASS/report |
| Content duplication | 0 | PASS/report |
| Internal links | 0 | PASS/report |
| Conversions | 0 | PASS/report |
| Claims (homepage) | 0 | PASS/report |

## Search (P0) (exit 2)

```
Onsite search reproduction:
  q="Logic board"  page=200 noindex=true  api=500  {"error":"Request contains an invalid argument."}
  q="logic-board"  page=200 noindex=true  api=500  {"error":"Request contains an invalid argument."}
  q="MacBook liquid damage"  page=200 noindex=true  api=500  {"error":"Request contains an invalid argument."}
  q="battery"  page=200 noindex=true  api=500  {"error":"Request contains an invalid argument."}
  q="(empty)"  page=200 noindex=true  api=400  {"error":"Missing query"}

FAIL [P0]: onsite search broken — API non-200 for: "Logic board", "logic-board", "MacBook liquid damage", "battery"
```

## Sitemap integrity (exit 0)

```
sitemap.xml: 838 URLs, 1 distinct lastmod, sampled 12
  [P2] lastmod-integrity: All 838 <lastmod> are identical (2026-08-12T13:15:32.342Z) — build time, not real content modification. Make truthful per-URL or omit.
```

## Canonical / host (exit 0)

```
canonical audit: 1 finding(s)
  [P1] www-host: https://www.zasupport.com/ serves HTTP 200 directly (no 301 to apex). One-hop 301 recommended (approval-gated).
```

## Schema (exit 0)

```
Schema coverage:
  /: ComputerRepairService, FAQPage, LocalBusiness, WebPage, WebSite
  /apple-repair: BreadcrumbList, ComputerRepairService, FAQPage, LocalBusiness, Service
  /macbook-repair: BreadcrumbList, ComputerRepairService, FAQPage, ItemList, LocalBusiness, Service
  /logic-board-repair: BreadcrumbList, ComputerRepairService, FAQPage, ItemList, LocalBusiness, Service, WebPage
  /battery-replacement: BreadcrumbList, ComputerRepairService, FAQPage, LocalBusiness, Service
  /screen-repair: BreadcrumbList, ComputerRepairService, FAQPage, LocalBusiness, Service

PASS: no self-serving AggregateRating/Review markup detected.
```

## Content duplication (exit 0)

```
[P2] duplicate ogTitle: "Apple Repair Johannesburg | ZA Support" on /, /iphone-repair, /logic-board-repair, /liquid-damage, /battery-replacement, /screen-repair, /imac-repair, /business
  1 duplication finding(s) — report-only (P2)
```

## Internal links (exit 0)

```
Internal-link inbound counts (priority pages, crawled seed set):
           11  /iphone-repair
           2  /screen-repair
           3  /battery-replacement
           11  /liquid-damage
           11  /macbook-repair
  [ORPHAN] 0  /macbook-not-turning-on
           11  /logic-board-repair
           11  /imac-repair
           11  /mac-mini-repair
           11  /business

WARN [P2]: 1 priority page(s) with no inbound link in the crawled set: /macbook-not-turning-on
(Note: crawled seed set is small; confirm against full nav/footer before acting.)
```

## Conversions (exit 0)

```
OK  /  tel=true wa=true form/book=true
  OK  /book  tel=true wa=true form/book=true
  OK  /contact  tel=true wa=true form/book=true
  OK  /logic-board-repair  tel=true wa=true form/book=true
  OK  /liquid-damage  tel=true wa=true form/book=true
  OK  /battery-replacement  tel=true wa=true form/book=true
  OK  /screen-repair  tel=true wa=true form/book=true

PASS: action routes present on reachable pages.
```

## Claims (homepage) (exit 0)

```
Facts-register conflicts (warning mode):
  /: [FR-001] "16 years" x4
  /: [FR-001] "16 Years Experience" x1
  /: [FR-005] "645" x5
```

---
No automatic edits or deployments were made. Material regressions require an approval-gated PR (Handoff §9-H).
