---
name: ZAS-SEO-COMPREHENSIVE-20260407-R2
version: 3.2 (FINAL REVISED — supersedes all previous versions)
type: comprehensive-handoff
site: zasupport.com
last_updated: 07/04/2026 SAST
author: courtney@zasupport.com
supersedes: ZAS-SEO-COMPREHENSIVE-20260407.md, ZAS-SEO-COMPREHENSIVE-20260407-R1.md, ZAS-SEO-CORRECTED-FINDINGS-20260407.md
rule: comprehensive.md = includes all context, content, and doesn't miss any important details for another Claude model to understand the context and have the ability to start a project knowing all the information without guessing what context means
---

# ZA Support — Comprehensive SEO and Website Infrastructure Handoff (Final Revised)

---

## HR: MANDATORY VERIFY-FIRST RULE

**Applies to EVERY task across all Claude instances.**

**Step 1 — Confirm whether it already exists.** Use curl, file system checks, web search, grep, or any available tool to verify current state. Never assume.

**Step 2 — If it exists, analyse differences.** Identify genuine improvements or gaps. Do not duplicate what's working.

**Step 3 — If improvements exist, add to them.** Enhance, don't replace.

**Step 4 — If duplicates or low-value, ignore.** Do not create files, pages, or processes that duplicate existing ones.

---

## SECTION 1: VERIFIED CURRENT STATE (tested 07/04/2026 via curl)

| Check | Result | Status |
|---|---|---|
| https://zasupport.com | 200 OK, Next.js + Payload CMS | CORRECT |
| https://www.zasupport.com | 200 OK, same Next.js site | WORKING — canonical tags consolidate to non-www |
| http://zasupport.com | 308 → https://vercel.com/ | BROKEN — needs Vercel domain fix |
| http://www.zasupport.com | 308 → https://vercel.com/ | BROKEN — same |
| WordPress | DECOMMISSIONED | DONE |
| Canonical tags | All pages point to https://zasupport.com | CORRECT |
| GA4 | Installed. ID: G-XJNXMVBGP6. gtag.js in HTML | WORKING — property name in admin needs cosmetic update |
| robots.txt | Correct (Allow /, Disallow /api/ /admin/ /studio/ /_next/) | CORRECT |
| sitemap.xml | 250+ pages, auto-generated | CORRECT |
| IndexNow | Active (api.indexnow.org in CSP) | WORKING |
| Vercel Insights | Active (va.vercel-scripts.com in CSP) | WORKING |
| Existing schema | LocalBusiness + ComputerRepairService (with AggregateRating 4.9/632, address, geo, openingHours, areaServed, serviceType) + Person schema on author page | PARTIALLY COMPLETE — see Section 4 for gaps |

### Site inventory (from sitemap): 250+ pages
- 7 service hubs, 30+ sub-service pages, 100+ location pages (30+ suburbs), 40+ blog posts, 8 guide pages, 8 business pages, 3 Apple support pages, 2 author pages, legal/utility pages

---

## SECTION 2: AUTHOR IDENTITY — COURTNEY BENTLEY

### Current state on live site (NEEDS CORRECTING)

The author page exists at `/author/david-bentley`. The Person schema says "David Bentley". This must be changed to "Courtney Bentley" everywhere. `/author/courtney-bentley` currently 307 redirects — the slug mapping is backwards.

### Correct author details

**Name:** Courtney Bentley
**Title:** Apple Certified Expert Consultant
**Slug:** /author/courtney-bentley (301 redirect from /author/david-bentley)
**Photo:** Use image from Courtney_Bentley_BIO_copy_updated_2025.pdf (circular crop, professional headshot in suit) or existing site image if already uploaded
**Email:** courtney@zasupport.com

### Social profiles (for Person schema sameAs)

| Platform | URL | Type |
|---|---|---|
| LinkedIn (personal) | https://www.linkedin.com/in/bentleycourtney/ | Personal |
| Facebook (personal) | https://www.facebook.com/courtney.bentley.10/ | Personal |
| Twitter/X (company) | https://x.com/za_support | Company (no personal account) |
| TikTok (company) | https://www.tiktok.com/@appleexpertza | Company (no personal account) |
| Instagram (company) | https://www.instagram.com/appleexpertza/ | Company |
| Facebook (company) | https://www.facebook.com/appleexpertsouthafrica | Company |
| YouTube (company) | https://www.youtube.com/@zasupport-applemacupgrader6746 | Company |

### E-E-A-T credentials (from verified bio)

**Professional experience:**
- Apple South Africa — Manager, Retail and Enterprise Operations (2007-2009)
- Founded ZA Support at age 19 in 2009 (17 years operating)
- Co-founded Vizibiliti Insight Africa in 2016 (AI alternative credit scoring)
- 5,000+ corporate, parastatal, public and private clients served
- 25,000+ Mac repairs overseen

**Education:**
- Pridwin Preparatory School (1995-2002)
- St John's College (2003-2007)
- BSc Informatics, UNISA (paused due to business commitments)

**Awards (verified, high E-E-A-T value):**
- Forbes Africa 30 Under 30 — Technology Category (2019)
- Mercedes-Benz Predictive Manufacturing Award Winner (2017) — described as "world first"
- Attacq Commercial Real Estate Innovation Award — overall winner (2017)
- Knife Capital Grindstone Venture Capital Program (2018/19) — 1 of 12 from 200+ submissions
- VivaTech Paris — Verizon Alternative Credit Scoring Award (2018)
- Tshwane Cable Theft Challenge Winner (2016)
- Distell Predictive Shelf-Life Finalist (2016)
- Nation Builder Social Innovation Finalist (2018)
- Santam Insuretech Challenge Finalist (2019)
- Nominated: ABSA Innovator of the Year, AABLA Innovator of the Year (2018)

**Corporate clients (Vizibiliti):** Mercedes-Benz Financial Services, Capitec Bank, Old Mutual, Atlas Finance, Hammond Pole Attorneys, Attacq

**Media appearances:**
- CNBC Power Lunch (television)
- Fast Company (print, July 2018, page 58)
- Forbes Africa
- Disrupt Africa (Top 12 Start-ups to Watch 2019)
- Gadget.co.za, IT News Africa, IOL, Ventureburn, Good Things Guy, The Nerve Africa, ABR Buzz

### Verified live media URLs (for sameAs, mentions, or author page links)

| Source | URL | Status |
|---|---|---|
| Forbes Africa 30 Under 30 | https://bit.ly/2YrcW8q (→ forbesafrica.com/30-under-30/2019/...) | 200 LIVE |
| The South African (Forbes coverage) | https://bit.ly/2YqLpnI (→ thesouthafrican.com) | 200 LIVE |
| Gadget.co.za | https://gadget.co.za/sas-vizibiliti-conquers-us/ | 200 LIVE |
| Good Things Guy | https://bit.ly/2uAZq0W (→ goodthingsguy.com) | 200 LIVE |
| Knife Capital Grindstone | https://bit.ly/2OXwP1j | 200 LIVE |
| YouTube — Mercedes-Benz Award | https://www.youtube.com/watch?v=A4Km_OonG80 | 200 LIVE |

Dead URLs (do not use): CNBC Power Lunch links (404), ABSA Achievers (404), one Forbes link (404), Alphacode (timeout).

### Corrected Person schema for author page

```json
{
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "mainEntity": {
    "@type": "Person",
    "@id": "https://zasupport.com/author/courtney-bentley",
    "name": "Courtney Bentley",
    "jobTitle": "Apple Certified Expert Consultant",
    "description": "Courtney Bentley is the founder of ZA Support and has been repairing Apple devices in Johannesburg since 2009. Former Apple South Africa Manager. Forbes Africa 30 Under 30 (2019). Specialising in component-level logic board repair, liquid damage recovery, and medical practice IT.",
    "url": "https://zasupport.com/author/courtney-bentley",
    "image": "https://zasupport.com/authors/courtney-bentley.webp",
    "email": "courtney@zasupport.com",
    "telephone": "+27645295863",
    "knowsAbout": [
      "MacBook logic board repair",
      "Component-level repair",
      "Apple device management",
      "Apple device repair",
      "Medical practice IT",
      "POPIA compliance",
      "macOS",
      "iOS",
      "Artificial Intelligence",
      "Alternative credit scoring"
    ],
    "hasCredential": [
      {
        "@type": "EducationalOccupationalCredential",
        "credentialCategory": "certification",
        "name": "Apple Certified Expert Consultant"
      }
    ],
    "alumniOf": [
      {
        "@type": "EducationalOrganization",
        "name": "UNISA",
        "department": "BSc Informatics"
      },
      {
        "@type": "EducationalOrganization",
        "name": "St John's College"
      }
    ],
    "award": [
      "Forbes Africa 30 Under 30 — Technology (2019)",
      "Mercedes-Benz Predictive Manufacturing Award Winner (2017)",
      "Attacq Commercial Real Estate Innovation Award Winner (2017)",
      "Knife Capital Grindstone Venture Capital Program (2018)",
      "VivaTech Paris — Verizon Alternative Credit Scoring Award (2018)"
    ],
    "worksFor": {
      "@type": "LocalBusiness",
      "@id": "https://zasupport.com/#organization",
      "name": "ZA Support",
      "url": "https://zasupport.com"
    },
    "sameAs": [
      "https://www.linkedin.com/in/bentleycourtney/",
      "https://www.facebook.com/courtney.bentley.10/",
      "https://x.com/za_support",
      "https://www.tiktok.com/@appleexpertza",
      "https://www.instagram.com/appleexpertza/",
      "https://www.facebook.com/appleexpertsouthafrica",
      "https://www.youtube.com/@zasupport-applemacupgrader6746"
    ]
  }
}
```

### Author page visible content (for /author/courtney-bentley)

The page should display:
- Photo (professional headshot)
- Name: Courtney Bentley
- Title: Apple Certified Expert Consultant, Founder of ZA Support
- Bio: Former Apple South Africa Manager. Founded ZA Support in 2009 at age 19. Forbes Africa 30 Under 30 (2019). 25,000+ Mac repairs. Specialises in component-level logic board repair, liquid damage recovery, and medical practice IT. BSc Informatics (UNISA).
- Social links (LinkedIn personal, Facebook personal, company social accounts)
- Awards section: Forbes 30 Under 30, Mercedes-Benz Award, Attacq Award, VivaTech Paris, Knife Capital Grindstone
- Media mentions: links to live Forbes, Gadget, Good Things Guy, YouTube Mercedes video
- List of all authored blog posts
- Link to /editorial-policy

---

## SECTION 3: ISSUES THAT NEED FIXING (priority order)

### 3.1 Author identity correction (HIGH)

| Change | From | To |
|---|---|---|
| Author slug | /author/david-bentley | /author/courtney-bentley (301 from old) |
| Person schema name | "David Bentley" | "Courtney Bentley" |
| Person schema jobTitle | "Founder & Apple Certified Technician" | "Apple Certified Expert Consultant" |
| Person schema sameAs | Company LinkedIn only | Personal LinkedIn + Facebook + all social |
| Person schema | No ProfilePage wrapper | Wrap in ProfilePage |
| Person schema | No alumniOf | Add UNISA + St John's College |
| Person schema | No award | Add Forbes 30 Under 30 + 4 others |
| Person schema | No image | Add author photo URL |
| Bio text | References "David Bentley" | "Courtney Bentley" with updated credentials |

**Verify first:** Check Sanity CMS for author document. The name and slug are likely stored there, not hardcoded.

### 3.2 Old WordPress URL redirects (HIGH)

10 URLs returning 404. Add to next.config.js:

```javascript
{ source: '/apple-repairs', destination: '/apple-repair', permanent: true },
{ source: '/apple-expertise-johannesburg-south-africa', destination: '/about', permanent: true },
{ source: '/macbook-pro-ram-memory-upgrades', destination: '/macbook-repair/ram-upgrade', permanent: true },
{ source: '/apple-macbook-pro-upgrades-johannesburg-south-africa', destination: '/macbook-pro-repair', permanent: true },
{ source: '/imac-support-johannesburg-south-africa', destination: '/imac-repair', permanent: true },
{ source: '/apple-repair-near-me', destination: '/apple-repair', permanent: true },
{ source: '/macbook-pro-repairs-johannesburg-south-africa', destination: '/macbook-pro-repair', permanent: true },
{ source: '/macbook-pro-support-johannesburg-south-africa', destination: '/apple-support', permanent: true },
{ source: '/apple-upgrades-johannesburg-south-africa', destination: '/macbook-repair/ssd-upgrade', permanent: true },
{ source: '/macbook-air-ssd-upgrades', destination: '/macbook-repair/ssd-upgrade', permanent: true },
```

Old content value: ZERO across all 10 pages. No new pages or blog posts needed.

### 3.3 HTTP redirect fix (MEDIUM)

http:// variants redirect to vercel.com. Fix in Vercel domain settings.

### 3.4 Missing schema types (HIGH — verify each before building)

| Schema | Verify command | If missing, create |
|---|---|---|
| WebSite + SearchAction | `curl -s https://zasupport.com \| grep "WebSite"` | WebSiteSchema.tsx for homepage |
| Service | `curl -s https://zasupport.com/apple-repair \| grep "Service"` | ServiceSchema.tsx for service pages |
| FAQPage on service pages | `curl -s https://zasupport.com/macbook-pro-repair/screen \| grep "FAQPage"` | Add FAQPage schema where FAQ content exists |
| max-image-preview:large | `curl -s https://zasupport.com \| grep "max-image-preview"` | Add to metadata in layout.tsx |

Note: LocalBusiness + AggregateRating already exist in site-wide schema. Do not duplicate.

### 3.5 Editorial policy page (MEDIUM)

Verify: `curl -sI -o /dev/null -w "%{http_code}" https://zasupport.com/editorial-policy`

If 404, create with: content creation process, author credentials, fact-checking, AI content disclosure, corrections policy, independence statement.

### 3.6 GA4 property name (LOW)

Update in GA4 Admin from "http://www.zasupport.com" to "https://zasupport.com". Cosmetic only — tracking works.

---

## SECTION 4: GOOGLE RANKING SYSTEMS AND SIGNAL WEIGHTS

(Reference only — full details in Google SEO Master Reference zasupport.md)

**Active systems:** BERT, RankBrain, Neural Matching, MUM, PageRank/Link Analysis, Freshness, Passage Ranking, Reviews, Original Content, Reliable Information, SpamBrain, Site Diversity, Deduplication, Topic Authority, Preferred Sources.

**Signal weights:** Content quality 23%, Keyword in title 14%, Backlinks 13%, Niche expertise 13%, Engagement 12%, Freshness 6%, E-E-A-T ~5%, Mobile ~4%, CWV ~3%, Schema ~2%, HTTPS ~1%, Internal linking ~2%.

**CWV targets:** LCP < 2.5s, INP < 200ms, CLS < 0.1. Google uses CrUX field data, not Lighthouse lab scores.

---

## SECTION 5: TOOLS AND MCP INTEGRATION

**Verify before installing any of these.**

| Tool | Check if exists | If missing |
|---|---|---|
| GSC MCP (mcp-gsc v0.2.2) | `claude mcp list` or check ~/.claude/settings.json | Install per github.com/AminForou/mcp-gsc |
| Claude SEO skill | `ls ~/.claude/skills/seo/` | Install per github.com/AgriciDaniel/claude-seo |
| SerpBear (rank tracking) | Check if any rank tracking is in use | Deploy if no alternative exists |

**Free tools (browser-based, no install):**
- Rich Results Test: https://search.google.com/test/rich-results
- Schema Markup Validator: https://validator.schema.org
- PageSpeed Insights: https://pagespeed.web.dev
- Google Trends: https://trends.google.com
- TechnicalSEO.com: https://technicalseo.com/tools/ (SERP simulator, schema generator)

---

## SECTION 6: PERFECT BLOG CREATOR UPDATE (v1.0 → v2.0)

v2.0 draft exists in outputs. Before replacing v1.0 at `/mnt/skills/user/perfect-blog-creator/SKILL.md`:

1. Open v1.0 in Claude Code
2. Diff against v2.0
3. Add only genuinely new sections: ranking systems table, CWV targets, new schema types, Discover eligibility (max-image-preview:large, 1200px images), GSC workflow, Google self-assessment checklist, expanded never list
4. Do not duplicate existing v1.0 content

**Author references in SKILL must be updated:** All references to "courtney-bentley" slug are correct. The LIVE site currently has "david-bentley" which is wrong. The SKILL is right, the site is wrong.

---

## SECTION 7: BUSINESS CONTEXT

**Company:** ZA Support (trading as Vizibiliti Intelligent Solutions Pty Ltd)
**Owner:** Courtney Bentley — Apple Certified Expert Consultant
**Head of Operations/PA:** Mary Blount
**Location:** 1 Hyde Park Lane, Hyde Park, Second Floor, Office E2004, Johannesburg, 2196
**Phone:** 064 529 5863
**Email:** courtney@zasupport.com
**Founded:** 2009 (Courtney was 19)
**Background:** Former Apple South Africa Manager (2007-2009). Forbes Africa 30 Under 30 (2019). Also founded Vizibiliti Insight Africa (2016) — AI alternative credit scoring, worked with Mercedes-Benz Financial Services, Capitec, Old Mutual.
**BEE Level:** 1
**Google Reviews:** 4.9/5 from 632 reviews
**Active clients (ZA Support):** 5,000+ corporate, parastatal, public and private
**Repairs completed:** 25,000+

---

## SECTION 8: GLOBAL PREFERENCES

UK English, DD/MM/YYYY, ZAR, A4, Arial 12pt. Never: USD, HIPAA, US regs, Benoni, MM/DD/YYYY. Always: spaces in filenames, bold+underlined section labels, dual document output, code blocks for copy-paste, ZAS-[TYPE]-YYYYMMDD-HHMM identifiers. Client comms from Mary. Hosted Exchange. Two apps: Workshop PKG + Health Check v11.

---

## SECTION 9: EXECUTION PRIORITY

| # | Task | Priority | Verify first |
|---|---|---|---|
| 1 | Fix author: david-bentley → courtney-bentley (name, slug, schema, bio, photo, sameAs, awards) | HIGH | Check Sanity CMS author document |
| 2 | Add 10 old WordPress URL 301 redirects | HIGH | Check if any already exist in next.config.js |
| 3 | Add missing schema (WebSite+SearchAction, Service, FAQPage on service pages) | HIGH | grep HTML source for each type first |
| 4 | Add max-image-preview:large meta tag | HIGH | grep current metadata output |
| 5 | Fix HTTP→HTTPS redirect | MEDIUM | Re-test after Vercel domain config changes |
| 6 | Create /editorial-policy page | MEDIUM | Check if page exists |
| 7 | Install GSC MCP in Claude Code | MEDIUM | Check if already configured |
| 8 | Update Perfect Blog Creator v1.0 → v2.0 | MEDIUM | Diff first, add only new content |
| 9 | Update GA4 property name in admin | LOW | Tracking already works |
| 10 | www→non-www server redirect | LOW | Canonical tags already handle this |

---

## SECTION 10: FILES FROM THIS SESSION

| File | Purpose | Status |
|---|---|---|
| ZAS SEO COMPREHENSIVE 20260407 R2.md | THIS FILE — final handoff | CURRENT |
| Google SEO Master Reference zasupport.md | Full Google documentation reference | REFERENCE — still valid |
| Perfect Blog Creator SKILL v2.md | Updated skill (replaces v1.0) | READY — diff before applying |
| ZA Support SEO Improvements Implementation Plan.md | Prioritised improvements with code | PARTIALLY SUPERSEDED by this file |
| ZAS SEO COMPREHENSIVE 20260407.md | Original version | SUPERSEDED — delete |
| ZAS SEO COMPREHENSIVE 20260407 R1.md | First revision | SUPERSEDED — delete |
| ZAS SEO CORRECTED FINDINGS 20260407.md | Corrections document | SUPERSEDED — merged into this file |

---

*ZAS-SEO-COMPREHENSIVE-20260407-R2 — Final Revised Handoff*
*07/04/2026 SAST*
