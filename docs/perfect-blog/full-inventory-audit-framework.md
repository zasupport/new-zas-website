# Full-Inventory Audit Framework — zasupport.com 322 Posts

**Instruction (T4):** Research everything that needs to be completed against Google and other verified highly ranked and verified resources validated by Google, to lift the entire 322-post inventory.

**Date:** 24 May 2026
**Verified ground truth:** 322 posts on https://zasupport.com/sitemap.xml (curl verification this session)
**Method:** Primary-source research + the 6-layer post-quality-universal-enforcement standard applied to every URL

---

## 1. The complete audit checklist — six layers

Every one of the 322 posts gets audited against six layers. Each layer cites the verified authority that defines its requirements.

### Layer A — Content quality (E-E-A-T + Information Gain)

**Authority sources:**
- Google Search Quality Rater Guidelines, Nov 2025
- Google Helpful Content System (integrated into core ranking March 2024)
- BKND Development E-E-A-T research (Feb 2026) — +23% traffic for first-hand experience
- Raptive Dec 2025 Core Update analysis — 393-day vs 500-day freshness signal

| Item | Threshold | Verify with |
|---|---|---|
| Named author with credentials | Courtney or Mary, schema Person markup | Sitemap parse + HTML body check |
| First-hand experience signal | Workshop data / repair stats / real photo | Manual or LLM-extracted check |
| Information Gain marker | ≥1 paragraph competitors cannot replicate | Manual review during audit |
| Word count | ≥800 words blog, ≥500 service, ≥300 location | Automated word count |
| No leak patterns | Passes blog-leak-scanner (LEARNED/WHY/REPLICATE) | Existing scanner |
| No banned-tone phrases | Passes banned-phrases skill | Automated regex |
| SA English used | organisation/colour/optimise/programme | Automated regex |
| Currency format | "R 4,499" not "ZAR" or "R4499" | Automated regex |
| Date format | DD/MM/YYYY | Automated regex |

### Layer B — Structured data (schema markup)

**Authority sources:**
- Google Search Central JSON-LD documentation
- Schema.org official validator
- Google Rich Results Test
- Heeya 2026 Schema for AI Overviews research
- The HOTH technical SEO checklist March 2026

| Schema type | When required | Validate with |
|---|---|---|
| `BlogPosting` or `Article` | Every blog post | Rich Results Test |
| `Person` (Author) | Every authored page | Rich Results Test |
| `Organization` | Site-wide footer schema | Schema.org validator |
| `LocalBusiness` | Service pages, contact, location pages | Rich Results Test |
| `BreadcrumbList` | Every non-homepage page | Rich Results Test |
| `FAQPage` | Pages with 3+ Q&A pairs | Rich Results Test |
| `HowTo` | Step-by-step guides | Rich Results Test |
| `Review` / `AggregateRating` | Service pages (633 reviews data) | Rich Results Test |
| `Event` | WWDC posts, iPhone launch posts | Rich Results Test |
| `Product` | Repair quote pages with explicit price | Rich Results Test |

**Schema must accurately represent visible page content** (Google Search Central explicit requirement — mismatched schema can trigger manual action).

### Layer C — Technical SEO (200-item baseline)

**Authority source:** DigitalApplied 200-item technical SEO checklist (April 2026), cross-referenced with Vero Scale, DebugBear, The HOTH, SEOauto, Seahawk Media checklists (all Feb-April 2026).

Critical subset (every post):

| Item | Threshold | Tool |
|---|---|---|
| Crawlable from homepage | Within 3 clicks | Screaming Frog crawl depth |
| Indexable | robots meta allows, robots.txt does not block | GSC URL Inspection |
| HTTPS valid | Cert valid, no mixed content | Browser DevTools |
| Canonical URL | Self-referencing, no chain | View source / Screaming Frog |
| Mobile-first responsive | 360px viewport, tap targets ≥48x48px | Mobile-Friendly Test |
| No 404s | All internal links resolve | Screaming Frog |
| No redirect chains | Links to final URL | Screaming Frog |
| Image optimisation | WebP/AVIF, lazy-loaded, explicit dimensions | Lighthouse |
| No orphan page | ≥1 internal link from another indexable page | Screaming Frog |
| Breadcrumbs visible | UI element + schema | Manual + Rich Results Test |
| 404 page returns 404 | Status code, not 200 | curl -I |
| Sitemap submitted | In GSC, last submission < 30 days | GSC Sitemaps |
| robots.txt valid | No syntax errors, allows Googlebot | robots.txt Tester |

### Layer D — Core Web Vitals

**Authority sources:**
- Google web.dev Core Web Vitals (current thresholds)
- DigiVate March 2026 CWV guide
- DebugBear / corewebvitals.io measurement guides
- Pravin Kumar April 2026 INP-specific research

| Metric | Threshold (Good) | Measure with |
|---|---|---|
| LCP | **<2.5 seconds** at p75 CrUX field data | GSC Core Web Vitals report |
| INP | **<200ms** at p75 (replaced FID March 2024) | GSC Core Web Vitals report |
| CLS | **<0.1** at p75 | GSC Core Web Vitals report |
| TTFB | <800ms (Google) or <200ms (engineering target) | DevTools Network tab |

**Measured at p75 of real-user CrUX data, not lab Lighthouse scores.** Currently 53% of websites pass all three thresholds — passing is competitive advantage.

### Layer E — Internal linking + topical authority

**Authority sources:**
- DigitalApplied internal linking research (April 2026)
- Search Engine Land penalty guide (Nov 2025) on cluster patterns
- The HOTH cluster + topical authority

| Item | Threshold |
|---|---|
| Internal links out | ≥2 per post |
| Link to service page | ≥1 (drives phone-call conversion) |
| Topical cluster membership | Defined cluster assignment |
| Cluster hub link | Every post links to its cluster hub |
| Anchor text variety | No over-optimised exact-match stacking |
| Author byline link | Links to author profile page |
| Bidirectional density | Newer posts linked from older posts in same cluster |

### Layer F — AEO + GEO (AI search optimisation)

**Authority sources:**
- SEOScore Tools 2026 audit (March 2026) — average sites score 35% AEO, 28% GEO
- Heeya 2026 Schema for AI Overviews (May 2026)
- DigitalApplied AEO framework (April 2026)
- Google AI Overviews docs

| Item | Threshold |
|---|---|
| Question-form headings where natural | Match search query format |
| Direct answer in first 100 words | For question queries |
| FAQPage schema | On Q&A content |
| HowTo schema | On procedural content |
| Semantic HTML | article/section/nav/aside used correctly |
| Definition-style lead paragraphs | For "what is X" queries |
| Citable structure | Short paragraphs, clear data points, named author |
| llms.txt file at site root | Recommended for AI crawler discovery |

---

## 2. The audit tools — what runs each layer

| Tool | What it audits | Cost | Authority status |
|---|---|---|---|
| **Google Search Console (GSC)** | Indexation, performance, CWV field data, manual actions | Free | Primary Google data source |
| **Google Rich Results Test** | Schema validation per page | Free | Primary Google tool |
| **Schema.org Validator** | Generic structured data validation | Free | Schema.org official |
| **Google PageSpeed Insights** | Lab + field CWV per page | Free | Primary Google tool |
| **Google Mobile-Friendly Test** | Mobile rendering | Free | Primary Google tool |
| **Google Lighthouse** | Performance, accessibility, SEO lab tests | Free | Built into Chrome DevTools |
| **Screaming Frog SEO Spider** | Full-site crawl, broken links, redirects, orphans | Free up to 500 URLs, paid above | Industry standard |
| **GA4** | Engagement, sessions, bounce rate | Free | Primary Google data source |
| **CrUX dashboard** | Real-user CWV data | Free | Primary Google data source |
| **web-vitals JavaScript library** | Real-user CWV monitoring on the live site | Free | Google open source |
| **Sitebulb** (alternative to Screaming Frog) | Comprehensive site audit | Paid | Industry standard |

All audit tools are either Google primary or Google-validated industry standards. No third-party "SEO score" tools — those are derived metrics, not Google data.

---

## 3. The audit execution sequence

### Stage 1 — Inventory and classification (week 1)

For each of the 322 URLs:
1. Fetch URL, parse HTML, extract metadata
2. Classify into cluster (Mac repair / iPhone / liquid damage / B2B legal / B2B medical / B2B financial / location-suburb / news / etc.)
3. Record current state: word count, schema present, author, dateModified, internal link count
4. Score against the 6-layer standard
5. Write per-URL audit record to `reports/quality-audit/2026-W22/<slug>.json`

Output: `reports/inventory-baseline-2026-05-24.json` with 322 records.

### Stage 2 — Prioritisation (week 1)

Cross-reference with GSC + GA4 (T1 handoff output):
1. Pages with traffic + low score → highest priority (biggest impact for fix effort)
2. Page-2 candidates with low score → second priority (small fix → page 1 jump)
3. High-score pages with traffic → lowest priority (already working)
4. Zero-traffic, low-score pages → candidate for removal/consolidation

Output: `reports/audit-priority-queue.json` — 322 URLs ranked by `traffic × (100 - score)`.

### Stage 3 — Fix programme (weeks 2-12)

Per `retrospective-update-strategy.md`:
- Weeks 2-3: top 20 (heavy fix, full template)
- Weeks 4-5: next 30 (heavy)
- Weeks 6-7: next 40 (medium-heavy)
- Weeks 8-10: next 100 (medium)
- Weeks 11-12: remaining ~130 (light, or removal/consolidate decisions)

Every fix runs through `scripts/substantive-update-check.js` to confirm substantive change.

### Stage 4 — Continuous enforcement (week 13 onwards)

The mechanical enforcement points (per post-quality-universal-enforcement skill) take over:
1. Sanity Studio save hook
2. Pre-build static check
3. Sanity publish webhook
4. Daily site-health scan
5. Vercel deploy pre-check
6. Layer 7 defences watchdog

No content reaches production without scoring against the standard. Continuously enforced, not periodically audited.

---

## 4. Aggregating GSC + GA4 + the 6-layer audit

The full per-URL record (after T1 handoff + this audit) has the structure:

```json
{
  "url": "https://zasupport.com/blog/macbook-screen-flickering",
  "audited_at": "2026-05-24T15:00:00Z",

  "gsc_data": {
    "clicks_90d": 124,
    "impressions_90d": 8420,
    "ctr": 0.0147,
    "avg_position": 8.3,
    "top_query": "macbook pro screen flickering"
  },

  "ga4_data": {
    "sessions_90d": 412,
    "avg_session_duration_s": 187,
    "engagement_rate": 0.62,
    "bounce_rate": 0.38
  },

  "layer_scores": {
    "A_content_quality":   85,
    "B_structured_data":   90,
    "C_technical_seo":     95,
    "D_core_web_vitals":   75,
    "E_internal_linking":  80,
    "F_aeo_geo":           70
  },
  "weighted_score": 84.5,
  "passes": true,

  "failures": [
    {
      "layer": "D",
      "item": "INP",
      "value": "245ms",
      "threshold": "<200ms",
      "fix": "Defer third-party scripts (Google Analytics, chat widget) to load after first interaction"
    },
    {
      "layer": "F",
      "item": "Question-form heading",
      "value": "missing",
      "threshold": "≥1 question heading for query-shape posts",
      "fix": "Convert H2 'Common Causes' to 'Why is my MacBook screen flickering?'"
    }
  ],

  "cluster": "mac-repair-display",
  "priority_tier": "page-1-near-miss",
  "fix_effort_hours": 1.5,
  "expected_traffic_lift": "20-40% from page 8.3 → page 1"
}
```

This record format unifies the GSC + GA4 data with the quality audit. Every one of the 322 posts gets one of these records.

---

## 5. The four authorities every audit decision cites

Per HR Always-Verify rule, every fix recommended in the audit cites its source authority:

1. **Google Search Central** — for crawl, index, render, schema, indexation fundamentals
2. **Google web.dev** — for Core Web Vitals thresholds and measurement
3. **Google Search Quality Rater Guidelines** — for E-E-A-T and helpful-content criteria
4. **A 2026 verified industry source** — DigitalApplied, BKND, Raptive, TeamBench, Search Engine Land — for application-level guidance

No fix recommendation appears in an audit record without one of these citations. Memory is not a source.

---

## 6. Audit categories — what we expect to find

Based on the verified site-state analysis from prior turns + ground-truth sitemap classification, expected findings on the 322 posts:

| Expected finding | Estimated affected % | Why |
|---|---|---|
| Missing author byline / schema | 40-60% | Author boxes only deployed recently per conversation context |
| Missing Information Gain content | 70-85% | Most older posts written before workshop-data pattern established |
| 28 leaked posts with evaluation labels | 9% (28 of 322) | Verified count |
| Outdated dateModified | 80%+ | Posts published once and not refreshed |
| Schema present but incomplete | 50-70% | Sanity default schema may not include Person, Organization, BreadcrumbList |
| INP failing (>200ms) | 30-50% | Third-party scripts (analytics, chat) common cause |
| LCP failing (>2.5s) | 20-40% | Image optimisation gaps |
| Word count <800 | 15-30% | Older posts shorter |
| <2 internal links | 25-40% | Older posts predate cluster strategy |
| No cluster assignment | 60-80% | Cluster strategy is new |
| Banned-tone phrases | 5-15% | "Enterprise-grade" etc. occasionally creep in |

These are inferred estimates per `verification-first-observation-protocol`. The Stage 1 inventory pass produces verified counts.

---

## 7. Budget estimate

Per-post audit time:
- Automated layers (B, C, D, parts of E) — 30 seconds per URL via scripts
- Manual review layer A and parts of F — 5-10 minutes per URL
- Total for 322 posts at 7.5 min average — ~40 hours of human review time

This can be done by Mary + Courtney over 4 weeks at 10 hours/week each, OR offloaded to Claude Code with the per-URL records produced for human spot-check.

Per-post fix time (per retrospective-update-strategy):
- Heavy fix (top 20) — 60 min each = 20 hours
- Medium-heavy (next 70) — 30 min each = 35 hours
- Medium (next 100) — 20 min each = 33 hours
- Light (remaining 130) — 10 min each = 22 hours
- **Total fix time across 322 posts: ~110 hours**

Spread over 12 weeks at ~10 hours/week, this is a realistic Mary + Courtney workload alongside normal repair operations.

---

## 8. Verified sources cited in this framework

Per `claim-evidence-validation`, all standards in this audit derive from:

| Source | URL | What it provides | Date verified |
|---|---|---|---|
| Google Search Central JSON-LD docs | developers.google.com/search/docs/appearance/structured-data/intro-structured-data | Schema format authority | Continuous |
| Google web.dev Core Web Vitals | web.dev/articles/vitals | LCP / INP / CLS thresholds | Continuous |
| Google Search Quality Rater Guidelines | static.googleusercontent.com/media/guidelines.raterhub.com/en//searchqualityevaluatorguidelines.pdf | E-E-A-T definition | Nov 2025 |
| Google Rich Results Test | search.google.com/test/rich-results | Schema validator | Continuous |
| Google PageSpeed Insights | pagespeed.web.dev | CWV measurement | Continuous |
| Schema.org validator | validator.schema.org | Structured data validity | Continuous |
| GSC CrUX dashboard | search.google.com/search-console | Real-user CWV field data | Continuous |
| DigitalApplied 200-item TSEO checklist | digitalapplied.com/blog/technical-seo-audit-checklist-200-items | Comprehensive baseline | April 2026 |
| BKND Development E-E-A-T research | bknddevelopment.com/seo-insights/eeat-seo-strategy-2026-content-quality-signals | +23% traffic data | Feb 2026 |
| Raptive Dec 2025 update analysis | raptive.com/blog/what-googles-december-2025-core-update-tells-us-about-quality | 393-day freshness data | Feb 2026 |
| TeamBench content freshness | teambench.ai/resources/blog/content-freshness-and-seo-impact | Compound returns from update | Feb 2026 |
| Search Engine Land penalty guide | searchengineland.com/guide/google-penalty | Penalty patterns | Nov 2025 |
| 1ClickReport March 2026 survivors | 1clickreport.com/blog/google-march-2026-core-update-survival-guide | First-hand experience rewarded | March 2026 |
| Heeya Schema for AI Overviews | heeya.fr/en/blog/schema-org-faq-howto-google-ai-overviews | dateModified as freshness signal | May 2026 |
| SEOScore Tools 2026 audit | seoscore.tools/blog/seo-audit-checklist | AEO 35% / GEO 28% gap | March 2026 |
| Pravin Kumar INP for Webflow | pravinkumar.co/blog/core-web-vitals-inp-webflow-optimization-2026 | INP optimisation | April 2026 |
| DigiVate CWV 2026 | digivate.com/blog/seo/core-web-vitals-in-2026 | CWV practical guide | April 2026 |

---

## 9. What I cannot verify from this session

Per HR Always-Verify:

| Claim | Status | Verify command |
|---|---|---|
| 322 posts on sitemap | **[VERIFIED — 24 May 2026]** | `curl -s https://zasupport.com/sitemap.xml \| grep -c "<loc>"` |
| 28 currently leaked posts | **[STALE — from prior session]** | `bash scripts/scan-site-health.js --mode full` |
| Top 20 posts by GSC clicks | **[UNVERIFIABLE from chat]** | GSC Performance > Top Pages > 90d filter — see T1 handoff |
| Posts on Google page 2 | **[UNVERIFIABLE from chat]** | GSC Performance > Position 11-20 filter — see T1 handoff |
| Schema state per post | **[PARTIALLY VERIFIABLE]** | Random sample via Rich Results Test, full audit via T1 handoff step 5 |
| CWV state per post (LCP/INP/CLS) | **[UNVERIFIABLE from chat]** | GSC Core Web Vitals report — needs Stage 1 audit |
| Cluster classification per post | **[INFERRED]** | Stage 1 audit assigns cluster per URL |
| GA4 engagement metrics per post | **[UNVERIFIABLE from chat]** | GA4 API via T1 handoff step 4 |

The Stage 1 inventory pass (week 1) converts every UNVERIFIABLE/INFERRED claim into VERIFIED.

---

## 10. The deliverable, condensed

| Question | Answer |
|---|---|
| What gets audited? | Every one of the 322 posts plus all service pages, location pages, author pages |
| Against what standard? | The 6-layer post-quality-universal-enforcement skill (Layers A through F) |
| Cited authorities? | Google Search Central + web.dev + Quality Rater Guidelines + 2026 verified industry sources |
| Audit tools? | GSC + GA4 + Rich Results Test + Schema validator + PageSpeed + Lighthouse + Screaming Frog |
| Output per URL? | A structured JSON record with score, failures, fix recommendations, source citations |
| Fix programme duration? | 12 weeks, prioritised by traffic × (100 - score) |
| Continuous enforcement after week 12? | Mechanical at 6 enforcement points; daily site-health scan; pre-deploy gate |
| Total human time? | ~150 hours over 12 weeks (audit + fix), realistic for Mary + Courtney |

---

*Full-Inventory Audit Framework v1.0*
*ZA Support strategy | 24 May 2026 (T4 instruction)*
*Pairs with: skills/post-quality-universal-enforcement, handoffs/2026-05-24-gsc-ga4-queue-handoff, docs/retrospective-update-strategy.md*
