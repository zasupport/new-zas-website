---
name: google-seo-master-reference
version: 2.1 (CORRECTED)
site: zasupport.com
stack: Next.js 15 + Sanity CMS + Tailwind CSS v4 + Vercel + Cloudflare
last_updated: 07/04/2026 SAST
author: courtney@zasupport.com
purpose: Google SEO reference for all Claude instances. Use alongside ZAS-SEO-COMPREHENSIVE-20260407-R2.md
source: Google Search Central official documentation (developers.google.com/search) + live site verification
---

# Google SEO Master Reference — ZA Support

## HR: VERIFY-FIRST RULE
Before creating, modifying, or recommending anything: (1) Confirm whether it already exists using curl, grep, file checks. (2) If it exists, analyse differences. (3) If improvements exist, add to them. (4) If duplicates or low-value, ignore.

---

## VERIFIED SITE STATE (07/04/2026)

- WordPress: DECOMMISSIONED. Both www and non-www HTTPS serve Next.js.
- GA4: INSTALLED (G-XJNXMVBGP6). Property name in admin is outdated but tracking works.
- Canonical tags: CORRECT on all pages (point to https://zasupport.com).
- robots.txt: CORRECT. sitemap.xml: 250+ pages.
- IndexNow: ACTIVE. Vercel Insights: ACTIVE.
- HTTP→HTTPS: BROKEN (redirects to vercel.com — Vercel domain config issue).
- 10 old WordPress URLs: 404ing (redirect map in R2 comprehensive file).
- Author on live site: Says "David Bentley" — WRONG. Must be "Courtney Bentley".

---

## PART 1: GOOGLE'S OFFICIAL RANKING SYSTEMS (Active December 2025)

Source: https://developers.google.com/search/docs/appearance/ranking-systems-guide

| System | Function | ZA Support action |
|---|---|---|
| **BERT** | Understands word combinations and intent | Write naturally, answer real questions |
| **RankBrain** | Maps words to concepts | Use semantic language, synonyms, related terms |
| **Neural Matching** | Connects query concepts to page concepts | Comprehensive topic coverage |
| **MUM** | Language understanding (specific apps only) | Monitor for expansion |
| **Link Analysis / PageRank** | Evaluates link relationships | Strong internal linking, earn quality backlinks |
| **Freshness Systems** | Surfaces newer content when relevant | Update posts 3-6 months, dateModified on every edit |
| **Passage Ranking** | Identifies individual page sections | Clear H2/H3 structure |
| **Reviews System** | Rewards high-quality review content | Original analysis in comparisons |
| **Original Content Systems** | Prioritises original content | Always write original, use canonical tags |
| **Reliable Information Systems** | Surfaces authoritative content | Full E-E-A-T compliance |
| **SpamBrain** | AI spam detection | Never buy links, never keyword stuff |
| **Site Diversity** | ~2 listings per site in top results | Different keywords per page |
| **Deduplication** | Removes near-duplicate results | 301 redirect duplicates |
| **Topic Authority** | Evaluates publication expertise | Deep topic clusters |
| **Preferred Sources** | Helps audiences find preferred sources | Organization schema, editorial policy |

Retired (integrated into core): Helpful Content System (March 2024), Hummingbird (2013), Panda (2015), Penguin (2016).

---

## PART 2: GOOGLE'S TOOLS AND DATA SOURCES

### Tools that feed ranking decisions

| Tool | What Google uses | zasupport.com status |
|---|---|---|
| CrUX (Chrome UX Report) | Real user field data, 28-day rolling, 75th percentile — THE RANKING SIGNAL | NOT MONITORED — need automated checking |
| Core Web Vitals | LCP < 2.5s, INP < 200ms, CLS < 0.1 | NOT VERIFIED on new site |
| Mobile-First Indexing | Evaluates mobile version | New site is responsive — VERIFY with actual test |
| Structured Data | Rich results, content understanding | PARTIALLY IMPLEMENTED — LocalBusiness + Person exist, Service/ProfilePage/WebSite missing |

### Monitoring tools (not direct ranking signals)

| Tool | Status at zasupport.com |
|---|---|
| Google Search Console | NEEDS VERIFICATION — check property for https://zasupport.com |
| Google Lighthouse | NOT run systematically |
| PageSpeed Insights | NOT monitored |
| Rich Results Test | NOT being used |
| Google Trends | NOT used for keyword research |
| Google Business Profile | EXISTS — needs blog post linking |
| Google Analytics 4 | INSTALLED (G-XJNXMVBGP6) — working |

### Lab vs Field data
- Lab (Lighthouse) = simulated. Good for dev. NOT what ranks.
- Field (CrUX) = real Chrome users. THIS ranks.
- Always check "Field Data" in PageSpeed Insights.

---

## PART 3: SIGNAL WEIGHTS (2026)

| Signal | Weight | Trend |
|---|---|---|
| Content quality / helpfulness | 23% | Stable #1 |
| Keyword in title tag | 14% | Stable |
| Backlinks | 13% | Declining — quality > quantity |
| Niche expertise / topical authority | 13% | Rising fast |
| Searcher engagement | 12% | Rising (confirmed Google DOJ) |
| Freshness | 6% | Jumped from < 1% to 6% in 2 years |
| E-E-A-T | ~5% | Rising |
| Mobile | ~4% | Baseline |
| CWV | ~3% | Tightening (INP > 200ms = ranking penalty) |
| Schema | ~2% | Rising — AI Overviews use schema |
| HTTPS | ~1% | Baseline |
| Internal linking | ~2% | Stable |

---

## PART 4: STRUCTURED DATA — ZASUPPORT.COM

### Already implemented (verified via curl)

| Schema | Status | Notes |
|---|---|---|
| LocalBusiness + ComputerRepairService | EXISTS site-wide | Includes address, geo, AggregateRating (4.9/632), openingHours, areaServed, serviceType, sameAs |
| Person | EXISTS on /author/david-bentley | NEEDS CORRECTION: name → Courtney Bentley, title → Apple Certified Expert Consultant, sameAs → personal LinkedIn/Facebook, add awards, alumniOf, ProfilePage wrapper |
| BreadcrumbList | VERIFY per page | May exist on blog posts |
| BlogPosting | VERIFY per blog post | May exist |
| FAQPage | VERIFY per page | FAQ content exists on service pages but schema may not |

### Must be added (verify each before building)

| Schema | Where | Verify command |
|---|---|---|
| WebSite + SearchAction | Homepage | `curl -s https://zasupport.com \| grep "WebSite"` |
| Service | Service pages | `curl -s https://zasupport.com/apple-repair \| grep '"Service"'` |
| ProfilePage | Author page | `curl -s https://zasupport.com/author/david-bentley \| grep "ProfilePage"` |
| FAQPage | Service pages with FAQ sections | `curl -s https://zasupport.com/macbook-pro-repair/screen \| grep "FAQPage"` |

---

## PART 5: AUTHOR — COURTNEY BENTLEY (E-E-A-T)

**Current live site:** Says "David Bentley" at /author/david-bentley. MUST be corrected.

**Correct details:**
- Name: Courtney Bentley
- Title: Apple Certified Expert Consultant
- Slug: /author/courtney-bentley (301 from /author/david-bentley)
- LinkedIn (personal): https://www.linkedin.com/in/bentleycourtney/
- Facebook (personal): https://www.facebook.com/courtney.bentley.10/
- Twitter/X: https://x.com/za_support (company)
- TikTok: https://www.tiktok.com/@appleexpertza (company)
- Instagram: https://www.instagram.com/appleexpertza/ (company)

**Key credentials for E-E-A-T:**
- Forbes Africa 30 Under 30 (2019)
- Apple South Africa Manager (2007-2009)
- Founded ZA Support at 19 in 2009 (17 years)
- Mercedes-Benz Predictive Manufacturing Award (world first, 2017)
- 25,000+ Mac repairs
- BSc Informatics (UNISA)
- St John's College

**Verified live media URLs:**
- Forbes: https://bit.ly/2YrcW8q (200)
- The South African: https://bit.ly/2YqLpnI (200)
- Gadget.co.za: https://gadget.co.za/sas-vizibiliti-conquers-us/ (200)
- Good Things Guy: https://bit.ly/2uAZq0W (200)
- Knife Capital: https://bit.ly/2OXwP1j (200)
- YouTube Mercedes: https://www.youtube.com/watch?v=A4Km_OonG80 (200)

Full Person + ProfilePage schema template is in ZAS-SEO-COMPREHENSIVE-20260407-R2.md Section 2.

---

## PART 6: PAGE EXPERIENCE AND CWV

Source: https://developers.google.com/search/docs/appearance/page-experience

Google's page experience checklist:
1. Good Core Web Vitals (LCP < 2.5s, INP < 200ms, CLS < 0.1)
2. HTTPS (verified — working on zasupport.com)
3. Mobile-friendly (new site is responsive — verify with actual device test)
4. No excessive ads (not applicable — zasupport.com has no ads)
5. No intrusive interstitials (verify — check for popups on mobile)
6. Content clearly distinguishable as main content

---

## PART 7: CONTENT GUIDELINES

Source: https://developers.google.com/search/docs/fundamentals/creating-helpful-content

**Self-assessment (apply before publishing every blog post):**
- Does it provide original information, research, or analysis?
- Does it provide substantial, complete description of the topic?
- Does it provide insight beyond the obvious?
- Does the heading provide a helpful summary?
- Is it the sort of page you'd bookmark or recommend?
- Is it free from easily-verified factual errors?
- Does it demonstrate first-hand expertise?
- After reading, will someone feel they've learned enough?

**AI content policy:** AI content is not penalised IF helpful, reliable, people-first. Using AI to manipulate rankings IS spam. All ZA Support content is AI-assisted, human-reviewed, enhanced with workshop experience, original photos, verified technical accuracy.

---

## PART 8: GOOGLE TOOLS AND MCP

### GSC MCP for Claude Code
Recommended: mcp-gsc v0.2.2 (https://github.com/AminForou/mcp-gsc)
Verify first: `claude mcp list` or check ~/.claude/settings.json

### Claude SEO Skill
Recommended: AgriciDaniel/claude-seo (https://github.com/AgriciDaniel/claude-seo)
Verify first: `ls ~/.claude/skills/seo/`

### Free browser-based tools
- Rich Results Test: https://search.google.com/test/rich-results
- Schema Validator: https://validator.schema.org
- PageSpeed Insights: https://pagespeed.web.dev
- Google Trends: https://trends.google.com
- TechnicalSEO.com tools: https://technicalseo.com/tools/

### Official Google reference URLs
- Ranking Systems: https://developers.google.com/search/docs/appearance/ranking-systems-guide
- Helpful Content: https://developers.google.com/search/docs/fundamentals/creating-helpful-content
- Page Experience: https://developers.google.com/search/docs/appearance/page-experience
- Core Web Vitals: https://developers.google.com/search/docs/appearance/core-web-vitals
- Structured Data Gallery: https://developers.google.com/search/docs/appearance/structured-data/search-gallery
- Ranking Updates: https://status.search.google.com/products/rGHU1u87FJnkP6W2GwMi/history
- Search News: https://developers.google.com/search/news

---

*Google SEO Master Reference — v2.1 (Corrected)*
*ZA Support | zasupport.com*
*07/04/2026 SAST*
