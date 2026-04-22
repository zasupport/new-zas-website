# Apple News Stream — Comprehensive Instructions for Claude Code

**Project:** zasupport.com (new-zas-website · Next.js 15 · Sanity CMS · Tailwind v4 · Vercel · Cloudflare)
**Owner:** Courtney Bentley, ZA Support, Hyde Park Johannesburg
**Created:** 22 April 2026 · Claude (Opus 4.7)
**Status:** Execution-ready. Three drafts production-ready, nine queued, schedule event-triggered.
**Supersedes:** n/a (new stream)
**Paired skill:** `/mnt/skills/user/perfect-blog-creator/SKILL.md` (read this first if not already loaded)

---

## TABLE OF CONTENTS

1. [Purpose and Scope](#1-purpose-and-scope)
2. [Execution Mode and Autonomy Rules](#2-execution-mode-and-autonomy-rules)
3. [Prerequisites and Environment](#3-prerequisites-and-environment)
4. [Connector Installation Checklist](#4-connector-installation-checklist)
5. [Authoritative Facts — Verified Source Data](#5-authoritative-facts)
6. [Author Metadata](#6-author-metadata)
7. [Language, Style, and Tone Rules](#7-language-style-and-tone-rules)
8. [Schema and Technical Requirements](#8-schema-and-technical-requirements)
9. [Keyword Research Dossier](#9-keyword-research-dossier)
10. [Event-Triggered Publishing Schedule](#10-event-triggered-publishing-schedule)
11. [Reactive Override Rules](#11-reactive-override-rules)
12. [Daily Cadence Integration](#12-daily-cadence-integration)
13. [Publishing Workflow](#13-publishing-workflow)
14. [Validation and Monitoring](#14-validation-and-monitoring)
15. [Ongoing Maintenance and Feedback Loop](#15-ongoing-maintenance-and-feedback-loop)
16. [Queued Post Specifications (9 posts)](#16-queued-post-specifications)
17. [Appendix A — Completed Draft 1: Primary CEO Post](#appendix-a)
18. [Appendix B — Completed Draft 2: Who is John Ternus](#appendix-b)
19. [Appendix C — Completed Draft 3: JHB Business Fleet Impact](#appendix-c)
20. [Appendix D — Common Fact-Check Errors (QA Checklist)](#appendix-d)
21. [Appendix E — Reference URLs](#appendix-e)

---

## 1. PURPOSE AND SCOPE

### 1.1 Business outcome
This stream produces and publishes an ongoing feed of Apple news content on zasupport.com/blog, optimised for:
1. **Aggregating Apple news that is not easy to find or widely covered in South Africa.**
2. **Real-time publishing during the normal daily posting cadence** — news posts slot into the 8-per-day target.
3. **Keyword-driven topical authority** — every post anchors on a specific target keyword cluster validated through live SERP research.
4. **Conversion to phone calls** — the business goal of every ZA Support page is a phone call or WhatsApp contact, not self-service.

### 1.2 What this file instructs
- The full content, schedule, and trigger definitions for **12 Apple news posts** (3 drafted, 9 queued).
- The keyword research methodology and live-data findings that underpin the content choices.
- The event-triggered scheduling model that replaces arbitrary-calendar padding.
- The connector stack required to close the automation loop (Sanity, GSC, GA4, Google Ads).
- The validation, fact-checking, and leak-scanning rules every post must pass before going live.

### 1.3 What this file DOES NOT instruct
- Website build tasks unrelated to the news stream (see `INSTRUCTIONS.md` in `new-zas-website` for the 16-phase migration spec).
- Repair guide content (handled by the Perfect Blog Creator skill's Priority 1-4 plan).
- Any task outside the blog / content / SEO scope.

---

## 2. EXECUTION MODE AND AUTONOMY RULES

### 2.1 Autonomy level
Courtney has set this stream to **high autonomy**. Specifically:
- **No approval required on drafts.** Produce them and move on.
- **No approval required on publish.** Schedule per the event-triggered rules in Section 10.
- **No approval required on keyword research.** Use the tool stack in Section 9; flag gaps, don't wait.
- **Ask only if:** a fact is contested between authoritative sources, a preference rule appears to conflict with the skill, or a hard tool failure blocks progress for >30 minutes.

### 2.2 Standing instruction
**"Always fetch live data first."** Courtney corrected early guessing — every factual claim in a post must be verified against a live source (Apple Newsroom, Wikipedia, major press) at the time of writing. Do not rely on training data for present-day Apple facts.

### 2.3 Audit-before-build rule
Before creating, modifying, or deploying any post, component, schema change, or page:
1. Check what already exists in the Sanity CMS, in the Next.js repo, and on the live site.
2. Read existing files in full before replacing them.
3. Compare existing vs proposed. Preserve anything not contradicted by the new spec.
4. Only update if newer AND proven. Mark unverified changes as `// EXPERIMENTAL` and flag.
5. Never overwrite CLAUDE.md files — always append.

### 2.4 Never-idle rule
If waiting on an answer from Courtney, continue every task that does not depend on that answer. Do not stop.

---

## 3. PREREQUISITES AND ENVIRONMENT

### 3.1 Expected working environment
- **Stack:** Next.js 15 · Sanity CMS · Tailwind CSS v4 · Vercel · Cloudflare
- **Canonical spec:** `INSTRUCTIONS.md` inside `new-zas-website` project (local or Git)
- **WordPress admin** (legacy, until migration complete): `https://zasupport.com/wp-admin` — credentials in global preferences file
- **Blog URL structure:** `zasupport.com/blog/{category}/{slug}`
- **Default news slot time:** 10:00 SAST (South African Standard Time, UTC+2)

### 3.2 File locations in repo
```
new-zas-website/
├── src/
│   ├── app/
│   │   ├── blog/[slug]/page.tsx
│   │   └── author/[slug]/page.tsx
│   ├── components/
│   │   ├── SiteSchema.tsx
│   │   └── blog/
│   │       ├── AuthorBox.tsx
│   │       ├── BlogSchema.tsx
│   │       └── BlogComponents.tsx
│   └── lib/sanity/
├── public/
│   ├── authors/
│   └── blog/
├── sanity/
│   └── schemas/
└── docs/
    └── APPLE-NEWS-STREAM.md  ← this file lives here or equivalent
```

### 3.3 Sanity content types
This stream requires a `post` document type with at minimum these fields:
- `title` (string)
- `slug` (slug, source: title)
- `category` (reference → `category` type)
- `author` (reference → `author` type)
- `datePublished` (datetime)
- `dateModified` (datetime)
- `primaryKeyword` (string)
- `secondaryKeywords` (array of strings)
- `featuredImage` (image, alt required)
- `body` (block content / portable text)
- `seoDescription` (string, 150-160 chars)
- `faq` (array of `{question, answer}`)
- `relatedPosts` (array of references to other posts)
- `outboundLinks` (array of `{url, title, source}`)

**If the `category` type does not yet include a "News" option, add it.** See Section 8.4.

### 3.4 Required NPM / tooling
```
@sanity/client          # API publish
@sanity/image-url       # image URL builder
next-sanity             # Sanity integration in Next.js
sharp                   # image optimisation (webp conversion)
gray-matter             # frontmatter parsing from .md drafts
```

---

## 4. CONNECTOR INSTALLATION CHECKLIST

These MCP connectors are **not currently installed in claude.ai** but are required to close the autonomous loop end-to-end. Install each and link to the project:

| Connector | Purpose | Install priority | Blocking? |
|---|---|---|---|
| **Sanity MCP** | Direct publish + scheduled publish to zasupport.com/blog | 1 (critical) | Yes — manual import required without this |
| **Google Search Console MCP** | Real-time position tracking, impressions, CTR by query, pages needing attention | 2 (high) | No — can infer from SERP scraping |
| **Google Analytics 4 MCP** | Landing-page traffic, behaviour flow, conversion attribution | 3 (high) | No — blind to performance without it |
| **Google Ads / Keyword Planner MCP** | Verified monthly search volume with geo-split for ZA | 4 (medium) | No — SERP density is a reasonable proxy |
| **Google Trends wrapper** | Rising-topic confirmation before publish | 5 (medium) | No — news relevance is a manual check |
| **Cloudflare Developer Platform** | Already connected. Use for redirect management. | Already available | — |
| **Vercel** | Already connected. Use for deployment verification. | Already available | — |

### 4.1 Sanity install steps (priority 1)
1. Verify Sanity project ID and dataset name (typically `production`).
2. Install Sanity MCP server from the MCP registry.
3. Configure OAuth against Courtney's Sanity login.
4. Test with a `list documents` call before any publish action.

### 4.2 Open-source keyword tool stack (available without connectors)
- Google Autocomplete public endpoint: `http://suggestqueries.google.com/complete/search?client=firefox&q={KEYWORD}` — wrap in a cron script, rate-limit to avoid blocks.
- Live web search for SERP / PAA scraping.
- Wikipedia topic graph for entity-linking.
- Reddit search for conversational-language variants.
- AnswerThePublic (free tier, 3/day).
- Keyword.io / WordStream / Ubersuggest (free tiers).

---

## 5. AUTHORITATIVE FACTS

All facts below have been verified against live sources on 22 April 2026. Use these in every post. If any fact materially changes (e.g. Ternus's start date is moved), update all posts referencing it and bump `dateModified`.

### 5.1 The Apple CEO transition
- **Announcement date:** Monday **20 April 2026**
- **Cook's final day as CEO:** **31 August 2026**
- **Ternus's first day as CEO:** **1 September 2026**
- **Cook's next role:** Executive Chairman (retains board seat, continues government relations)
- **Ternus becomes:** Apple's **8th CEO**
- **Prior CEO transitions at Apple:** Cook took over from Jobs in 2011 (first transition since)
- **Arthur Levinson:** Apple's non-executive chairman for past 15 years; becomes **lead independent director** 1 September 2026

### 5.2 John Ternus — verified biographical data
- **Age:** 50 (born 1975 or 1976)
- **Education:** BSc Mechanical Engineering, **University of Pennsylvania, 1997**
- **College activity:** Varsity swimmer; senior project was a mechanical feeding arm for people with quadriplegia
- **Pre-Apple career:** Mechanical engineer at **Virtual Research Systems**, designing early VR headsets
- **Joined Apple:** 2001, as mechanical engineer on product design team
- **First Apple project:** **Apple Cinema Display**
- **Career at Apple:**
  - 2001: Joined product design team
  - 2013: VP Hardware Engineering under Dan Riccio (oversaw AirPods, Mac, iPad)
  - 2018 onwards: Regular presenter at WWDC and Apple events
  - 2020: Takes on iPhone hardware leadership
  - 2021: SVP Hardware Engineering; joins executive team
  - 1 September 2026: CEO
- **Tenure at Apple by start date:** 25 years
- **Commencement speech:** UPenn Engineering, 2024, discussed imposter syndrome

### 5.3 Products Ternus's teams led or contributed to
- iPad (all generations since 2013)
- AirPods (all lines including hearing-aid-capable models)
- Apple Watch (all generations since 2013)
- Apple Vision Pro
- iPhone 17 lineup (iPhone 17, iPhone 17 Pro, iPhone 17 Pro Max, iPhone Air)
- **MacBook Neo** (launched spring 2026, widely credited as major Ternus achievement)
- Mac Pro 2019 redesign, iMac Pro

### 5.4 Apple under Cook — verified financials
- **Market cap at start of Cook tenure (2011):** ~US$350 billion
- **Market cap at transition (April 2026):** ~US$4 trillion
- **Growth:** more than 1,000%
- **Annual revenue FY2011:** US$108 billion
- **Annual revenue FY2025:** US$416 billion
- **Cook's estimated net worth (2026):** ~US$3 billion
- **Cook's age:** 65
- **iPhone now:** ~$210 billion annual business, nearly half of total revenue
- **Services revenue FY2025:** US$109 billion
- **Cook retirement vesting eligibility:** Yes (>age 60, >10 years tenure)

### 5.5 Hardware-team succession (announced same day)
- **Johny Srouji:** Becomes **Chief Hardware Officer** (expanded role). Previously SVP Hardware Technologies, famous for leading Apple Silicon.
- **Tom Marieb:** Takes over Ternus's previous direct hardware-engineering responsibilities.

### 5.6 WWDC 2026 — confirmed facts
- **Dates:** 8–12 June 2026
- **Keynote:** Monday **8 June 2026, 10:00 a.m. Pacific Time** (19:00 SAST)
- **Format:** Primarily online, with in-person event at Apple Park on 8 June (lottery-selected)
- **37th annual WWDC**
- **Expected announcements:** iOS 27, iPadOS 27, macOS 27, tvOS 27, watchOS 27, visionOS 27
- **Headline theme:** AI advancements, Siri overhaul (Dynamic Island interface per Gurman)
- **Spring 2026 launches already completed (March 2026):** MacBook Neo, iPhone 17e, M4 iPad Air, M5 Pro/Max MacBook Pro
- **Possible WWDC hardware:** M5 Mac Studio, Mac mini, iMac refresh

### 5.7 September 2026 iPhone event — expected facts
- **Likely date:** ~9 September 2026 (Apple typically announces event ~3 weeks prior)
- **Expected products:** iPhone 18, iPhone 18 Pro, iPhone 18 Pro Max, **iPhone Fold** (Apple's first foldable)
- **iPhone Fold price expectation:** US$2,000 – US$2,500 globally (~R50,000+ in SA after duties)
- **iPhone Fold initial supply:** 7–8 million units globally
- **iPhone Fold design:** Book-style (like Samsung Z Fold), dual-layer ultra-thin glass
- **iPhone Fold shipping window:** Possibly 1–2 months after September announcement (DigiTimes signal)
- **Mass production target:** July 2026 at Foxconn

### 5.8 AI / Apple Intelligence context
- **John Giannandrea** (Apple AI chief): Leaving Apple April 2026
- **Third-party AI partners:** Google Gemini, OpenAI ChatGPT
- **Morgan Stanley analyst note:** "Product at the centre of the flywheel" — Ternus choice signals hardware-AI integration
- **Dan Ives (Wedbush) analyst note:** Ternus faces immediate pressure on AI strategy
- **Apple Intelligence SA status:** Staged rollout, incomplete as of April 2026
- **Feature gating:** Silicon-tier dependent (M1+ Macs, A17 Pro+ iPhones)

### 5.9 Legal / regulatory fronts
- **Epic v. Apple:** Apple preparing Supreme Court petition. Lower-court contempt ruling upheld late 2025 by Ninth Circuit; rehearing denied month prior.
- **US DOJ v. Apple (March 2024):** Smartphone monopoly case, motion to dismiss denied, could grind for years.
- **India competition regulator:** US$38 billion (~R700 billion) potential fine. Apple's India market share ~9%. Apple contesting.
- **China supply chain:** Apple slowly moving assembly to India and Vietnam; iPhone core still Chinese. Cook retains diplomatic lead as executive chairman.

### 5.10 Ternus's first all-hands statement (per Gurman)
Direct quote suitable for coverage:
> "I am telling you we are about to change the world once again."
> "This is the most exciting time to be building products and services at Apple in my entire career."
> "AI is going to create almost unlimited potential... entirely new opportunities for our products and services."

---

## 6. AUTHOR METADATA

### 6.1 Courtney Bentley (primary author — all Apple news stream posts)
- **Slug:** `courtney-bentley`
- **Role:** Founder & Apple-Certified Technician
- **Photo:** `/public/authors/courtney-bentley-author.webp`
- **Bio:** "Apple-certified technician since 2009. Has personally overseen more than 25,000 Mac repairs at ZA Support's Hyde Park workshop. Specialises in component-level logic board repair, liquid damage recovery, and enterprise Apple fleet management. BSc Informatics (UNISA). Member of the Apple Developer Program."
- **Social profiles (for Person schema `sameAs`):**
  - LinkedIn: `https://www.linkedin.com/in/bentleycourtney/`
  - TikTok: `https://www.tiktok.com/@appleexpertza`
  - Twitter/X: `https://x.com/za_support`
  - Facebook: `https://www.facebook.com/appleexpertsouthafrica`
  - Instagram: `https://www.instagram.com/appleexpertza/`
- **Author page:** `/author/courtney-bentley`

### 6.2 Mary Blount (not used in this stream unless reassigned)
Available fallback author — details in Perfect Blog Creator skill. News stream defaults to Courtney.

### 6.3 Organisation (publisher)
- **Name:** ZA Support (trading name of Vizibiliti Intelligent Solutions Pty Ltd)
- **Address:** 1 Hyde Lane, Hyde Park, Johannesburg
- **Phone:** 064 529 5863
- **Email:** courtney@zasupport.com
- **Hours:** Mon–Fri 09:00–17:00 SAST
- **AggregateRating:** 4.9/5 from 632 Google Reviews

---

## 7. LANGUAGE, STYLE, AND TONE RULES

### 7.1 Spelling and locale — MANDATORY
- **South African English throughout.** "Organisation" not "Organization", "recognised" not "recognized", "behaviour" not "behavior", "analyse" not "analyze", "centre" not "center", "favourite" not "favorite".
- **ZAR pricing only** in any monetary figure intended for SA readers.
- **DD Month YYYY date format** ("22 April 2026"), never MM/DD/YYYY.
- **A4 paper** for any PDF output.
- **Currency context:** USD figures from US sources should be kept as USD in parentheses with approximate ZAR equivalent when relevant.
- **Hyde Park address only.** Never reference the legacy Benoni address.

### 7.2 Tone — banned words
Never use in any blog post:
- "enterprise-grade"
- "best-in-class"
- "cutting-edge"
- "game-changer"
- "revolutionary"
- "world-class"
- "robust infrastructure" / "robust [anything]"
- "seamless"
- "leverage" (as a verb)
- "solutions" (corporate-speak sense)

### 7.3 Tone — preferred register
- Direct, factual, workshop-floor voice.
- First-person plural ("we", "our workshop") when referencing ZA Support's perspective.
- Confident but not overselling. No hype.
- Short sentences preferred over long ones.

### 7.4 Legal and commercial language
- Never admit liability.
- Never frame payments as debt.
- Never use threatening language.
- Acceptable: "will be opposed", "costs will be addressed", "raised at the appropriate juncture".
- Never: "we will take legal action", "we will take you to court", "we will institute proceedings".

### 7.5 File and communication format rules
- **Never** `---` dividers in emails or WhatsApp messages.
- **Never** ALL CAPS section headings in client comms.
- **Never** .txt files for email/WhatsApp output.
- **Never** underscores or hyphens in deliverable filenames (blog slug files in-repo are fine with hyphens as they are URL slugs).
- **Never** iFixit images in published commercial content (copyright — internal use only).
- **Never** stock images when workshop photos are available.

### 7.6 Never-list for the blog itself
- Never publish without a named author byline.
- Never use "admin" or "ZA Support Team" as author.
- Never publish without BlogPosting or NewsArticle schema.
- Never publish without `dateModified`.
- Never expose internal authoring labels (LEARNED:, BETTER:, WHY SUCCESS:, REPLICATE:, SCORE:, RUBRIC:, EVALUATION:, KEY INSIGHT:, OBSERVATION:, [x] E-E-A-T) in rendered content.
- Never include prompt scaffolding ("As an AI", "I am Claude", system tags) in output.
- Never include placeholder text (`{{var}}`, `[INSERT NAME]`, Lorem ipsum, TODO, FIXME).
- Never duplicate an existing post's primary keyword (update instead).
- Never link to competitors' repair services.
- Never reference USD, HIPAA, US regulations, Benoni address, MM/DD/YYYY.

---

## 8. SCHEMA AND TECHNICAL REQUIREMENTS

### 8.1 Required schema on every news post
- `BlogPosting`
- `NewsArticle` (news-specific — see 8.2)
- `BreadcrumbList` (Home > Blog > News > Title)
- `FAQPage` (generated from FAQ section of post)
- `Person` (author, with sameAs array)
- `Organization` (publisher with AggregateRating)
- `LocalBusiness` (ZA Support Hyde Park)

### 8.2 NewsArticle schema — ADD TO CODEBASE
The existing `BlogSchema.tsx` emits `BlogPosting`. Google recommends `NewsArticle` for time-sensitive news content and it unlocks Google News eligibility. Extend `BlogSchema.tsx` to also emit `NewsArticle` when post category is `News`.

Minimum `NewsArticle` fields:
```json
{
  "@context": "https://schema.org",
  "@type": "NewsArticle",
  "headline": "{post.title}",
  "image": ["{post.featuredImage.url}"],
  "datePublished": "{post.datePublished}",
  "dateModified": "{post.dateModified}",
  "author": {
    "@type": "Person",
    "name": "Courtney Bentley",
    "url": "https://zasupport.com/author/courtney-bentley"
  },
  "publisher": {
    "@type": "Organization",
    "name": "ZA Support",
    "logo": {
      "@type": "ImageObject",
      "url": "https://zasupport.com/logo.png"
    }
  },
  "description": "{post.seoDescription}"
}
```

### 8.3 Post structure — every post must include
```
┌─ Breadcrumbs             Home / Blog / News / Post Title
├─ Category tag            News
├─ H1 headline             Question-format or direct news-style preferred
├─ Meta                    Published DD Month YYYY · Updated DD Month YYYY · Author link
├─ Key Takeaways box       3-6 bullets in first 200 words (GEO / AI citation optimisation)
├─ Table of Contents       Anchor jump links to all H2s (required on posts >1,000 words)
├─ Body content            Min 1,500 words for news explainers; 800+ minimum
├─ Original photos         Min 1 workshop photo, descriptive alt + "ZA Support Hyde Park"
├─ H2/H3 as questions      Where possible (featured snippet targeting)
├─ 40-60 word direct answers  Immediately below each question heading
├─ FAQ section             3-7 Qs as H3 headings with concise answers
├─ CTA block               Assessment from R599 · 064 529 5863 · WhatsApp · /book
├─ Related posts           3 internal links (prefer other news posts, plus service page)
├─ Outbound link           Min 1 link to an authoritative source (Apple Newsroom, Apple Support)
├─ Author box              AuthorBox component
└─ Editorial policy link   Footer /editorial-policy
```

### 8.4 Add "News" category to Sanity
If not already present, extend `sanity/schemas/category.ts`:
```typescript
export const newsCategory = {
  title: 'News',
  slug: { current: 'news' },
  description: 'Apple industry news and commentary from the ZA Support workshop floor',
  featured: true,
  order: 9,
}
```
Current category list (for reference): Repairs | How-To | Pricing | Troubleshooting | Enterprise | Advice | Upgrades | Data Recovery → add **News** as the 9th category.

### 8.5 Internal linking rules (every news post)
1. **3–5 links to other blog posts** (prefer news-to-news for topical clusters, plus 1 to a service page)
2. **1–2 links to commercial service pages** (match topic → service):
   - CEO / corporate / enterprise topics → `/enterprise-apple-support`
   - iPhone Fold / iPhone 18 → `/iphone-repair`, `/iphone-screen-repair`
   - MacBook Neo / Mac content → `/macbook-repair`, `/macbook-upgrade`
   - Apple Intelligence / AI → `/enterprise-apple-support`
   - Privacy / POPIA → `/popia-compliance-apple-devices`
3. **1 link to author page:** `/author/courtney-bentley`
4. **1 outbound link** to Apple Newsroom or Apple Support documentation
5. **Descriptive anchors** — "MacBook liquid damage repair process", never "click here"
6. **No orphan posts** — every post must have at least 1 inbound internal link from an existing post

### 8.6 Image requirements
- **Featured image:** original workshop photo, WebP, ≤200 KB, ≥1200×800 px
- **Alt text pattern:** `{subject description} at ZA Support Hyde Park workshop`
- **Filename pattern:** `{topic-keyword}-za-support-hyde-park.webp` (hyphens fine — this is a URL slug)
- **Minimum 1 photo per post, 2-3 preferred**
- **Never use stock images** when workshop photos exist in `/public/blog/`
- **Never use iFixit images** in published content (copyright)

Available team/workshop photos in `/public/blog/`:
- `courtney-bentley-author.png` — Courtney headshot (B&W)
- `mary-blount-portrait.png`
- `mary-blount-safety-goggles-workshop.png`
- `za-support-team-imac-workshop.png`
- `za-support-workshop-mac-repair.png`
- `za-support-team-rooftop.png`

For news posts specifically, prefer images that show hardware engineering discipline (logic board rework, microscope work, fleet staging) over portraits.

---

## 9. KEYWORD RESEARCH DOSSIER

### 9.1 Research methodology in use

**Tools available and actively used:**
- Live SERP scraping via web search (SA-geo inferred)
- Live People-Also-Ask harvesting from SERPs
- News-mode search for freshness + first-mover windows
- Competitor SA-media audit (Stuff SA, MyBroadband, ITWeb, BusinessTech, Investing.com ZA)

**Tools flagged as connector gaps:**
- Google Search Console (real impression data — install GSC MCP)
- Google Analytics 4 (landing page conversion — install GA4 MCP)
- Google Ads Keyword Planner (hard volume figures — install Google Ads MCP)
- Google Trends bulk (ZA-geo rising signals)

**Open-source / free keyword tool stack** (scriptable without connectors, recommend cron-integration):
- `suggestqueries.google.com/complete/search?client=firefox&q={keyword}` — Google Autocomplete public endpoint
- Wikipedia topic graph
- Reddit search (for conversational language)
- AnswerThePublic free tier
- Keyword.io, WordStream, Ubersuggest free tiers

### 9.2 Primary keyword cluster — Apple CEO / John Ternus

| Rank | Target keyword | Intent | SA competition | Commercial value | Publish priority |
|---|---|---|---|---|---|
| 1 | John Ternus Apple CEO | Informational | **Zero SA-native** | Low direct, high authority | Publish immediately |
| 2 | Tim Cook stepping down | Informational | 1 SA syndication | Low direct, high trust | Publish immediately |
| 3 | new Apple CEO 2026 | Informational | Zero SA-native | Low direct | Publish within 48h |
| 4 | what Apple CEO change means for users | Informational | Zero SA-native | Medium | Publish within 48h |
| 5 | John Ternus biography | Informational | Zero SA | Low | Publish within 7 days |
| 6 | Apple succession plan 2026 | Informational | Zero SA | Low | Publish within 7 days |
| 7 | who is the next Apple CEO | Question | Zero SA | Low | Merge into primary |
| 8 | when does John Ternus become CEO | Question | Zero SA | Low | Merge into primary |
| 9 | Apple executive chairman Tim Cook | Informational | Zero SA | Low | Secondary target |
| 10 | Johny Srouji chief hardware officer | Informational | <3 sources globally | Low but topical authority | Publish within 14 days |

### 9.3 People-Also-Ask harvest (CEO cluster)
- Who is the new Apple CEO?
- When did Tim Cook step down?
- How old is John Ternus?
- Where did John Ternus go to university?
- What products has John Ternus worked on?
- Why is Tim Cook stepping down?
- Will Tim Cook stay at Apple?
- What is Apple's executive chairman role?
- How much is Tim Cook worth?
- What is Apple's market cap?
- Who is Apple's eighth CEO?
- What is the MacBook Neo?
- When does John Ternus start as CEO?

### 9.4 Secondary keyword cluster — iPhone Fold 2026

| Rank | Target keyword | SA competition | Commercial value | Priority |
|---|---|---|---|---|
| 1 | iPhone Fold 2026 | Stuff SA (1 post) | Medium | High |
| 2 | iPhone Fold price South Africa | Zero in SA | High | High |
| 3 | foldable iPhone release date | Zero SA-native | Medium | High |
| 4 | iPhone 18 Pro launch date | Some SA | Medium | Medium |
| 5 | iPhone Fold vs Samsung Z Fold 8 | Zero SA | High | High |
| 6 | should I wait for iPhone Fold | Zero SA | Very High | High |
| 7 | iPhone Fold durability | Zero SA | Medium | Medium |
| 8 | **iPhone Fold repair cost** | **Zero globally** | **Very High** | **Top priority** |

**Insight:** Keyword #8 is unclaimed whitespace. Nobody globally has written "iPhone Fold repair cost" because the device doesn't exist yet. First-mover on this keyword captures the entire post-launch search surge.

### 9.5 Tertiary keyword cluster — Apple Intelligence / AI

| Rank | Target keyword | SA competition | Priority |
|---|---|---|---|
| 1 | Apple Intelligence South Africa | Some MyBroadband | High |
| 2 | when is Apple Intelligence coming to South Africa | Zero | High |
| 3 | Siri update 2026 | Low | Medium |
| 4 | is Apple Intelligence available in South Africa | Zero | Medium |
| 5 | Apple Intelligence M1 compatibility | Some | Medium |

### 9.6 SA-specific whitespace (confirmed 22 April 2026)
Zero native SA coverage of:
- What the CEO change means for SA Apple resellers (Core Group, iStore, incredible, Digicape)
- What it means for SA business Apple fleet buyers
- What it means for SA warranty / repair policy
- Ternus-as-engineer framing from workshop-floor perspective
- Apple Intelligence rollout timeline for SA under new leadership
- iPhone Fold repair economics for SA

**This is the unique-value window ZA Support owns.** The stream is built to capture it.

---

## 10. EVENT-TRIGGERED PUBLISHING SCHEDULE

### 10.1 Scheduling principle
**Publish when the news cycle is hot, not on arbitrary calendar slots.**

- Calendar-padded scheduling = spam classifier risk + publishing when nobody is searching
- Event-triggered scheduling = riding real search surges, capturing traffic at peak demand
- The 10:00 SAST daily news slot remains the default time; the **date** flexes to the trigger
- Reactive overrides always beat the queue

### 10.2 Burst discipline
The Perfect Blog Creator skill caps industry news at 5% of monthly mix (~12/month at 8/day cadence). A burst of 5 CEO-cluster posts in the first week after an announcement is defensible because the news is objectively breaking. Google penalises **clustered identical content on stable topics**, not **timely coverage of actual events**.

After the burst, the news slot must give way to evergreen repair/troubleshooting content for the rest of the month to stay within the 12/month budget.

### 10.3 IMMEDIATE BURST — CEO cluster (triggered 20 April 2026)

| # | Post | Publish timing | Status |
|---|---|---|---|
| 1 | Tim Cook Steps Down, John Ternus Takes Over: What It Means for SA Users | **22 April 2026, 10:00 SAST** | Draft ready (Appendix A) |
| 2 | Who is John Ternus? The Engineer Taking Over at Apple | **23 April 2026, 10:00 SAST** | Draft ready (Appendix B) |
| 3 | What the Apple CEO Change Means for JHB Businesses Running Apple Fleet | **24 April 2026, 10:00 SAST** | Draft ready (Appendix C) |
| 4 | Johny Srouji Becomes Apple's Chief Hardware Officer: What It Means for Mac Reliability | **28 April 2026, 10:00 SAST** | Outline in §16.1, draft within 48h |
| 5 | Apple Privacy Under a New CEO: Does the Encryption Stance Hold? | **29 April 2026, 10:00 SAST** | Outline in §16.2, draft within 48h |

### 10.4 QUEUE A — WWDC 2026 window (8-12 June 2026)

| # | Post | Trigger | Publish timing |
|---|---|---|---|
| 6 | WWDC 2026 Preview: What to Watch as Apple's AI Strategy Lands | 2 days before keynote | **6 June 2026, 10:00 SAST** |
| 7 | WWDC 2026 Recap: iOS 27, macOS 27, and Apple's AI Answer | Same-day recap | **8 June 2026, 22:00 SAST** (post-keynote) |
| 8 | Apple Intelligence in South Africa: What WWDC 2026 Tells Us About the Timeline | Post-keynote analysis | **9 June 2026, 10:00 SAST** |
| 9 | macOS 27 and Your Business: What IT Leads Should Know | Post-keynote business angle | **10 June 2026, 10:00 SAST** |

Outlines for 6–9 in §16.3 through §16.6.

### 10.5 QUEUE B — September 2026 iPhone event window (date TBC, ~9 Sept)

Apple typically announces event date ~3 weeks prior. When date confirmed, slot Queue B accordingly.

| # | Post | Trigger | Publish timing |
|---|---|---|---|
| 10 | September 2026 Apple Event Preview: iPhone 18, iPhone Fold, Ternus's First Launch | 1 week before event | ~1 week before event |
| 11 | iPhone 18 SA Buyer's Guide: What to Expect on Launch Day | 2 days before event | ~2 days before event |
| 12 | iPhone Fold 2026: What SA Buyers Need to Know Before Pre-Order | Event day | Day of Apple event |
| 13 | **iPhone Fold Repair Cost**: What to Expect When Apple's First Foldable Lands in SA | Event day +24h | Day after event (highest commercial slot) |
| 14 | MacBook Neo Explained: The Product That Built Ternus's CEO Case | Paired with Ternus Day 1 | **2 September 2026** |

Outlines for 10–14 in §16.7 through §16.11.

### 10.6 QUEUE C — Evergreen / opportunistic (publish on matching trigger)

| # | Post | Trigger |
|---|---|---|
| 15 | Apple's India R700 Billion Fine Explained | Next India case milestone |
| 16 | Apple Intelligence Arrives in SA: What Changes for Your Device | Official Apple SA Intelligence availability announcement |
| 17 | Core Group Pricing Update: What Rand/USD Shift Means for Apple Gear in SA | Any Core Group SA price revision |
| 18 | Siri in iOS 27: First Look from Our Johannesburg Workshop | iOS 27 public release (~Sep/Oct 2026) |
| 19 | Epic v. Apple Supreme Court Ruling: What Changes for iPhone Users | SCOTUS cert decision or ruling |

Outlines for 15–19 in §16.12 through §16.16 (brief, to be expanded when triggered).

---

## 11. REACTIVE OVERRIDE RULES

Any of the following trigger **immediate publish within 2–4 hours**, bumping whatever is queued:

| Trigger | Response post | Max lag |
|---|---|---|
| Apple keynote (WWDC, iPhone Event, Mac Event) | Live recap + SA angle | 3 hours post-keynote |
| Tim Cook or John Ternus public statement (interview, shareholder letter, verified all-hands leak) | Analysis post | 24 hours |
| SA-specific Apple news (Core Group, iStore, local recall, local pricing change) | Same-day explainer | 4 hours |
| Major iPhone Fold leak (production milestone, render, pricing) | Updated iPhone Fold piece | 24 hours |
| Apple stock event (major beat/miss, earnings with SA implications) | SA business-angle commentary | 24 hours |
| Apple privacy / encryption legal development | Privacy post update | 48 hours |
| macOS / iOS / iPadOS emergency security patch | Advisory post | 6 hours |

When a reactive override fires:
1. Pause the next scheduled post in the queue (do not delete — reschedule).
2. Produce the reactive post following all standards in this file.
3. Run leak scan (§14.2) before publish.
4. Publish.
5. Resume queue on the next slot.

---

## 12. DAILY CADENCE INTEGRATION

### 12.1 Target cadence (from Perfect Blog Creator skill)
- **8 posts per day, every day**, spread across the day at fixed times
- **Never fewer than 8** — gaps of zero days are worse than steady output
- **Never more than 8** — bursts trigger spam classifiers
- **Never cluster** — 8 posts within 2 hours = burst pattern; 8 posts spread across day = steady

### 12.2 Suggested daily slot map
| Slot | Time (SAST) | Default content type |
|---|---|---|
| 1 | 07:00 | Repair guide (logic board / liquid damage / screen) |
| 2 | 09:00 | How-to / troubleshooting |
| 3 | **10:00** | **News (when triggered) OR pricing / cost guide** |
| 4 | 11:30 | Enterprise / SME |
| 5 | 13:00 | Repair guide |
| 6 | 14:30 | Advice / upgrade guide |
| 7 | 16:00 | How-to / troubleshooting |
| 8 | 17:30 | Repair guide |

**Slot 3 (10:00) is the news slot.** When a news post is queued for today, it takes this slot. When no news post is queued, slot 3 goes to a pricing or cost-guide post.

### 12.3 Monthly mix budget (at 8/day × 30 days = 240 posts)
- 40% Repair guides: 96 posts
- 20% How-to / troubleshooting: 48 posts
- 15% Pricing / cost guides: 36 posts
- 10% Enterprise / SME: 24 posts
- 10% Product advice: 24 posts
- **5% News: 12 posts** ← this stream

### 12.4 CEO-cluster burst accounting
The 5-post burst 22–29 April uses ~42% of the April news budget (5 of 12). Remaining 7 news slots in April must be evenly spaced across the rest of the month or reserved for reactive triggers. If no real news trigger occurs, do NOT pad with filler news — shift the remaining slots to repair content to avoid exceeding the 12 cap.

---

## 13. PUBLISHING WORKFLOW

### 13.1 Step-by-step per post

1. **Load the draft** — `.md` file from the drafts directory or generate from the spec in §16.
2. **Fact-check against §5** — every factual claim must match an entry in Authoritative Facts, or be verified against a live source fetched at time of writing.
3. **Run QA checklist** — §Appendix D.
4. **Validate schema** — BlogPosting + NewsArticle + BreadcrumbList + FAQPage + Person + Organization + LocalBusiness all present.
5. **Validate internal links** — 3-5 blog links + 1-2 service links + 1 author link + 1 outbound (non-broken).
6. **Validate image** — workshop photo, WebP, alt text, ≤200 KB.
7. **Run leak scan** — `skills/blog-leak-scanner/SKILL.md` if available, or manual grep for banned patterns (§14.2).
8. **Transform to Sanity Portable Text** — convert markdown body to Sanity block content.
9. **Create Sanity document** — via Sanity MCP if installed, else manual import.
10. **Schedule publish** — set `datePublished` to the scheduled timestamp in ISO 8601 with +02:00 timezone.
11. **Verify live after publish** — fetch the live URL, confirm schema validates on Google Rich Results Test, confirm no broken links, confirm image loads.
12. **Log to content calendar** — mark as published in the calendar, note actual publish timestamp.

### 13.2 Portable Text conversion notes
Sanity uses Portable Text, not raw markdown. When converting:
- `##` H2 → `{_type: 'block', style: 'h2'}`
- `###` H3 → `{_type: 'block', style: 'h3'}`
- Links → marks with `_type: 'link'`, `href`
- FAQ section → map to `faq` array field, not body
- Key Takeaways → custom block type `keyTakeaways` with `items` array
- Table of Contents → generated automatically from H2s by the `BlogComponents.tsx` TableOfContents component — don't write it in the body
- Frontmatter fields map to top-level document fields, not body content

### 13.3 Sanity API publish (when connector installed)
Pseudocode:
```typescript
import {createClient} from '@sanity/client'

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: 'production',
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
  apiVersion: '2025-01-01',
})

const doc = {
  _type: 'post',
  title: '...',
  slug: { current: '...' },
  category: { _ref: 'category-news', _type: 'reference' },
  author: { _ref: 'author-courtney-bentley', _type: 'reference' },
  datePublished: '2026-04-22T10:00:00+02:00',
  dateModified: '2026-04-22T10:00:00+02:00',
  primaryKeyword: '...',
  secondaryKeywords: [...],
  featuredImage: {
    _type: 'image',
    asset: { _ref: 'image-xxxxx' },
    alt: '...',
  },
  body: [...portableText],
  seoDescription: '...',
  faq: [...],
  relatedPosts: [...],
  outboundLinks: [...],
}

await client.create(doc)
```

For scheduled publish, either:
- Set `datePublished` in the future and rely on front-end date filtering (simpler), or
- Use Sanity's scheduled publishing plugin if installed.

### 13.4 Redirect handling (for old water-damage cluster integration)
Not directly relevant to news stream, but note: any news post URL change must be accompanied by a 301 redirect via Cloudflare. Use the existing redirect map in `docs/REDIRECTS.md`.

---

## 14. VALIDATION AND MONITORING

### 14.1 Pre-publish validation checklist (ALL items pass, or don't publish)

- [ ] Title is question-format or direct news headline
- [ ] Primary keyword appears in title
- [ ] Primary keyword appears in first 100 words of body
- [ ] Key Takeaways block is in the first 200 words (3–6 bullets)
- [ ] Every H2 is either a question or a clear descriptive statement
- [ ] FAQ section has 3–7 Q&As
- [ ] Author is `courtney-bentley`, not anonymous or "admin"
- [ ] `datePublished` and `dateModified` are both set and match expected timestamp
- [ ] Featured image is a workshop photo (not stock, not iFixit)
- [ ] Alt text references ZA Support Hyde Park workshop
- [ ] 3–5 internal blog links, 1–2 service page links, 1 author link, 1 outbound link — all resolve
- [ ] Schema validates on Google Rich Results Test
- [ ] Word count ≥1,500 for news explainers, ≥800 minimum
- [ ] No banned tone words (§7.2)
- [ ] SA English spelling throughout
- [ ] No internal authoring labels (§7.6)
- [ ] Related Reading section references posts that actually exist (substitute if not)
- [ ] CTA includes R599 assessment, 064 529 5863, WhatsApp link, /book link
- [ ] Outbound link is to an authoritative source (Apple Newsroom, Apple Support, Wikipedia)
- [ ] Every factual claim matches §5 or is verified against a live source cited in Appendix E

### 14.2 Leak scan — banned patterns grep
Before publish, grep body for these patterns. Any match = halt publish, rewrite, retry.

Banned tone words:
```
enterprise-grade
best-in-class
cutting-edge
game-changer
revolutionary
world-class
robust infrastructure
seamless
leverage (as verb)
```

Banned internal authoring labels (these are evaluation scaffolding, never rendered):
```
LEARNED:
BETTER:
WHY SUCCESS:
REPLICATE:
SCORE:
RUBRIC:
EVALUATION:
KEY INSIGHT:
OBSERVATION:
[x] E-E-A-T
```

Banned placeholders:
```
{{
[INSERT
Lorem ipsum
TODO
FIXME
As an AI
I am Claude
```

Banned locale-wrong markers:
```
color (US)
center (US)
organize (US)
Benoni
HIPAA
MM/DD
```
(Note: these trigger only when clearly used in SA-context body copy. "Apple Center" in a quote is allowed; "center of Johannesburg" is not.)

### 14.3 Post-publish verification
Within 5 minutes of publish:
1. Fetch live URL with curl or browser — 200 OK, no JS errors.
2. Paste URL into Google Rich Results Test — all schema types valid.
3. Paste URL into Schema.org validator for secondary confirmation.
4. Mobile viewport screenshot — LCP <2.5s on 4G.
5. Featured image loads, alt text renders in view-source.

Within 24 hours:
1. Confirm Google has crawled (check GSC URL inspection if GSC connector installed).
2. Confirm indexing not blocked.
3. Verify canonical URL is correct.

### 14.4 Site Health Monitor integration
The site has a full `site-health-monitor` skill at `/mnt/skills/user/site-health-monitor/SKILL.md`. Every news post publish should be followed by a site health scan within 1 hour. This catches:
- Broken internal links (including to non-existent Related Posts)
- Schema validation failures
- Missing alt text
- Content leaks that escaped pre-publish scan
- Core Web Vitals regressions on the new post

---

## 15. ONGOING MAINTENANCE AND FEEDBACK LOOP

### 15.1 Monthly audit (1st of every month)
1. Review all news posts published that month.
2. Check GSC positions (if connector installed) for primary keywords.
3. Identify any post not reaching Page 1 after 14 days — investigate backlinks, internal link strength, content thinness.
4. Update `dateModified` on any post where facts have evolved.
5. Identify any cannibalisation between news posts and rewrite/merge as needed.
6. Verify no broken links (Site Health Monitor).
7. Check schema still validates on top 5 news posts.
8. Review Core Web Vitals.

### 15.2 Quarterly calendar revision
- Every quarter, rebuild the event-triggered schedule (§10) based on what's actually happened.
- After WWDC 2026 (June), Queue A is exhausted — rebuild around the September event and whatever has surfaced between.
- After September event (late Sep/early Oct), Queue B is exhausted — rebuild for Q4 2026 and early 2027 (CES January, spring Apple events).

### 15.3 Learning loop
Every time a post outperforms expectations (top 3 position, high CTR, conversion to call):
1. Log to `docs/learnings/news-stream-wins.md`.
2. Identify the pattern (keyword choice, angle, photo, CTA placement).
3. Propagate to remaining queued posts.

Every time a post underperforms:
1. Log to `docs/learnings/news-stream-misses.md`.
2. Identify likely cause (thin content, wrong keyword, bad internal links, slow publish).
3. Update §14.1 checklist to prevent recurrence.

### 15.4 Fact-refresh trigger
If any item in §5 changes — Ternus start date is moved, a new analyst note meaningfully reframes the narrative, Apple announces something that invalidates a forecast — update §5 AND update every post that references that fact. Bump `dateModified` accordingly.

---

## 16. QUEUED POST SPECIFICATIONS

Detailed specs for the 9 posts that are queued but not yet drafted. Produce each following the rules in Sections 7, 8, 13, 14. Use the Key Takeaways / TOC / FAQ pattern from the 3 completed drafts in Appendices A-C as templates.

### 16.1 Post 4 — Johny Srouji Becomes Apple's Chief Hardware Officer

- **Publish:** 28 April 2026, 10:00 SAST
- **Slug:** `johny-srouji-apple-chief-hardware-officer-mac-reliability`
- **Primary keyword:** `Johny Srouji Chief Hardware Officer`
- **Secondary keywords:** Apple Silicon, M5 chip, Apple hardware engineering, Apple executive reshuffle
- **Angle:** Srouji has led Apple Silicon. His elevation to Chief Hardware Officer with expanded scope signals Apple is doubling down on vertical hardware integration. For SA Mac users, this is the engineer most responsible for the performance and efficiency of every M-series Mac they've ever used. For businesses: expect continued Apple Silicon efficiency gains, longer Mac useful life.
- **Key Takeaways:**
  1. Johny Srouji becomes Apple's first **Chief Hardware Officer** effective 1 September 2026
  2. Srouji led Apple Silicon — the chip project that transformed Mac performance and battery life from 2020 onwards
  3. Expanded role signals Apple's commitment to **silicon-first hardware integration**
  4. Tom Marieb inherits Ternus's previous direct hardware-engineering responsibilities
  5. For SA Mac buyers: probable continuation of aggressive efficiency gains; longer useful hardware life
- **H2 sections:**
  - What Changed in Apple's Hardware Leadership
  - Who is Johny Srouji?
  - Why Apple Silicon Under Srouji Has Been the Mac's Quiet Revolution
  - What a Chief Hardware Officer Role Means Strategically
  - What This Means for Your Mac in South Africa
  - Workshop-Floor View: What We See Running Apple Silicon
- **FAQ:** Who is Johny Srouji? · What is Apple Silicon? · Who led Apple Silicon before Srouji? · Is Apple moving away from third-party chips? · What does Chief Hardware Officer mean? · How does this affect MacBook buyers in SA? · Will Intel Macs still be supported?
- **Internal links:** Post 1, Post 2, Post 11 (MacBook Neo), `/macbook-repair`, `/macbook-upgrade`
- **Outbound link:** `https://www.apple.com/newsroom/2026/04/tim-cook-to-become-apple-executive-chairman-john-ternus-to-become-apple-ceo/`
- **Workshop photo suggestion:** Apple Silicon M-series logic board close-up under microscope

### 16.2 Post 5 — Apple Privacy Under a New CEO

- **Publish:** 29 April 2026, 10:00 SAST
- **Slug:** `apple-privacy-new-ceo-encryption-stance`
- **Primary keyword:** `Apple privacy new CEO`
- **Secondary keywords:** Apple encryption, Apple privacy South Africa, Apple San Bernardino, Apple FBI encryption fight, privacy under Ternus
- **Angle:** Cook's 2016 San Bernardino standoff with the FBI made Apple's privacy identity. Under an engineer CEO, does that stance hold? For SA users covered by POPIA, Apple's privacy-first framing has real operational value for business compliance.
- **Key Takeaways:**
  1. Tim Cook's privacy-first framing was defined by the **2016 FBI encryption fight** after San Bernardino
  2. That stance is now a structural expectation of Apple, not a CEO preference — hard to reverse even if Ternus wanted to
  3. Ternus's engineering background may favour **on-device AI processing** over cloud, which is a privacy-positive default
  4. For SA businesses under **POPIA**, Apple's privacy posture has direct compliance value
  5. Watch for how Apple Intelligence handles data flows when it fully lands in SA
- **H2 sections:**
  - What Cook Built: Privacy as Apple's Identity
  - The San Bernardino Fight (and Why It Still Matters)
  - Does Ternus Share That Philosophy?
  - Why On-Device AI Is a Privacy Decision
  - What This Means for POPIA Compliance in Your SA Business
  - What We Watch in the Transition
- **FAQ:** What was the San Bernardino case? · Does Apple still refuse to build a backdoor? · Is Apple Intelligence privacy-preserving? · Does iCloud comply with POPIA? · How does Ternus feel about privacy? · Will Apple privacy features change after September 2026?
- **Internal links:** Post 1, `/popia-compliance-apple-devices`, Post 3, `/enterprise-apple-support`
- **Outbound link:** `https://www.apple.com/privacy/`

### 16.3 Post 6 — WWDC 2026 Preview

- **Publish:** 6 June 2026, 10:00 SAST (2 days before keynote)
- **Slug:** `wwdc-2026-preview-apple-ai-strategy-ios-27`
- **Primary keyword:** `WWDC 2026 preview`
- **Secondary keywords:** iOS 27, macOS 27, Siri update, Apple AI strategy, WWDC keynote
- **Angle:** What to watch on 8 June — AI strategy reveal, Siri overhaul, iOS 27 feature set, macOS 27, first glimpse of Ternus-era product direction.
- **Key Takeaways:**
  1. WWDC 2026 keynote is **Monday 8 June 2026, 19:00 SAST**
  2. Headline expected: **AI strategy and Siri overhaul** (Dynamic Island interface per Gurman)
  3. Expected OS: **iOS 27, iPadOS 27, macOS 27, tvOS 27, watchOS 27, visionOS 27**
  4. Possible hardware: M5 Mac Studio, Mac mini, iMac refresh
  5. This is Tim Cook's **last major WWDC keynote as CEO** — Ternus likely shares the stage
- **H2 sections:** When and How to Watch from SA · The Siri and Apple Intelligence Moment · iOS 27 and What We Know So Far · macOS 27 and the Mac Roadmap · Possible M5 Hardware Surprises · What the Ternus-Cook Handover Will Look Like on Stage · What SA Businesses Should Watch For
- **FAQ:** When is WWDC 2026? · How to watch from South Africa? · Will there be a new Siri? · Will iOS 27 work on my iPhone? · Will there be new Macs? · What time is the keynote in South Africa? · Is Tim Cook presenting?

### 16.4 Post 7 — WWDC 2026 Recap

- **Publish:** 8 June 2026, ~22:00 SAST (live-fill after 19:00 keynote)
- **Slug:** `wwdc-2026-recap-ios-27-macos-27-apple-ai`
- **Primary keyword:** `WWDC 2026 recap`
- **Secondary keywords:** iOS 27 features, macOS 27 features, Apple Intelligence update, Siri new features
- **Angle:** Live-fill post covering what Apple actually announced, SA availability timelines, our workshop-floor read.
- **Structure:** Lead with the top 3 announcements. Then section per OS. Then SA-specific implications. Then what we're watching.
- **Spec:** Skeleton prepared in advance. Body filled in real-time during keynote (19:00 SAST start). Publish target 22:00 SAST. Image: workshop/device shot updated to reference new OS.

### 16.5 Post 8 — Apple Intelligence in SA Post-WWDC

- **Publish:** 9 June 2026, 10:00 SAST
- **Slug:** `apple-intelligence-south-africa-wwdc-2026-timeline`
- **Primary keyword:** `Apple Intelligence South Africa`
- **Secondary keywords:** when is Apple Intelligence coming to SA, Siri South Africa, Apple AI features SA, Apple Intelligence M1 compatibility
- **Angle:** WWDC told us what Apple Intelligence looks like next. What we don't know: exact SA launch dates, language support (English/Afrikaans/Zulu), and data-sovereignty implications. Informed speculation based on announcement.
- **Key Takeaways:** (populate post-WWDC)
- **H2 sections:** What WWDC 2026 Revealed About Apple Intelligence · Which SA Devices Are Eligible · The Language and Locale Question · Data Sovereignty Implications for SA Businesses · When to Expect Full SA Availability · How to Prepare Your Fleet

### 16.6 Post 9 — macOS 27 for Business

- **Publish:** 10 June 2026, 10:00 SAST
- **Slug:** `macos-27-business-guide-it-leads-south-africa`
- **Primary keyword:** `macOS 27 business`
- **Secondary keywords:** macOS 27 for IT, macOS 27 compatibility, macOS 27 enterprise, macOS 27 upgrade guide
- **Angle:** For IT leads at JHB SMEs: what to know before upgrading, compatibility, MDM considerations, security improvements, Apple Silicon cutoffs.
- **Structure:** Exec summary · Compatibility table · MDM considerations · Security changes · Upgrade timeline recommendation · Rollback plan

### 16.7 Post 10 — September Apple Event Preview

- **Publish:** ~1 week before event date (tentatively 2 September 2026)
- **Slug:** `september-2026-apple-event-preview-iphone-18-fold-ternus`
- **Primary keyword:** `September 2026 Apple Event`
- **Secondary keywords:** iPhone 18 event, iPhone Fold announcement, Ternus first launch, Apple September keynote
- **Angle:** Preview of what's expected — iPhone 18 lineup, iPhone Fold reveal, Ternus's first public set piece as incoming CEO. Ternus officially starts 1 September, event typically 8-9 September.

### 16.8 Post 11 — iPhone 18 SA Buyer's Guide

- **Publish:** 2 days before September event
- **Slug:** `iphone-18-south-africa-buyers-guide-launch-day`
- **Primary keyword:** `iPhone 18 South Africa`
- **Secondary keywords:** iPhone 18 price SA, iPhone 18 release date SA, Core Group iPhone 18, iStore iPhone 18
- **Angle:** Pre-purchase guidance for SA buyers — expected pricing, launch date, pre-order logistics through Core Group and iStore, whether to wait for iPhone Fold, upgrade decision matrix.

### 16.9 Post 12 — iPhone Fold 2026 SA Guide

- **Publish:** Day of Apple September event
- **Slug:** `iphone-fold-2026-south-africa-buyers-guide`
- **Primary keyword:** `iPhone Fold South Africa`
- **Secondary keywords:** iPhone Fold price SA, iPhone Fold release date, iPhone Fold vs Samsung Z Fold, iPhone Fold pre-order SA
- **Angle:** Live coverage + analysis on announcement day. Price in ZAR, availability timeline, comparison to Samsung, who should buy, who should wait.
- **Note:** This is the post that captures the announcement-day search surge.

### 16.10 Post 13 — iPhone Fold Repair Cost (HIGHEST COMMERCIAL VALUE)

- **Publish:** Day after Apple September event
- **Slug:** `iphone-fold-repair-cost-south-africa`
- **Primary keyword:** `iPhone Fold repair cost`
- **Secondary keywords:** iPhone Fold screen repair, iPhone Fold hinge repair, foldable iPhone insurance SA, iPhone Fold durability
- **Angle:** Nobody globally has written this. First-mover captures the entire post-launch search surge. Repair cost estimate based on component cost analysis (hinge, inner flexible display, outer cover display), durability trade-offs, insurance recommendations, what ZA Support can and cannot yet repair on a brand-new foldable platform.
- **Key Takeaways:**
  1. iPhone Fold repair cost estimates (ZAR) for screen, hinge, logic board, battery
  2. The inner flexible display is the most fragile and most expensive component
  3. Insurance implications — which SA insurers rate foldables and at what premium
  4. What we can repair in-workshop from day one, what needs to route to Apple
  5. Durability guidance for SA conditions (dust, humidity, temperature swings)
- **Note:** Commercial funnel. Must include strong CTA to `/iphone-repair` and `/iphone-screen-repair`.

### 16.11 Post 14 — MacBook Neo Explained

- **Publish:** 2 September 2026 (day after Ternus officially starts)
- **Slug:** `macbook-neo-apple-laptop-explained-ternus-legacy`
- **Primary keyword:** `MacBook Neo`
- **Secondary keywords:** MacBook Neo specs, MacBook Neo price SA, MacBook Neo vs MacBook Air, what is MacBook Neo
- **Angle:** Ternus's signature product. What it is, who it's for, why analysts called it Apple's most disruptive laptop in years, how it fits into the SA buyer's decision matrix alongside MacBook Air and MacBook Pro.

### 16.12 Post 15 — India Fine (evergreen trigger)

- **Trigger:** Next India case milestone — ruling, appeal, payment, or negotiation public disclosure
- **Primary keyword:** `Apple India fine`
- **Angle:** Explainer on the R700bn (~$38bn) Indian competition fine, precedent implications, what it means for Apple operations in markets like SA.

### 16.13 Post 16 — Apple Intelligence Arrives in SA (evergreen trigger)

- **Trigger:** Official Apple announcement of Apple Intelligence availability in South African English / South African locale
- **Primary keyword:** `Apple Intelligence South Africa available`
- **Angle:** Day-of launch coverage with device compatibility, feature walkthrough, POPIA data-flow analysis.

### 16.14 Post 17 — Core Group Pricing Update (evergreen trigger)

- **Trigger:** Any Core Group SA price list revision or rand/USD shift >5% over 1 month
- **Primary keyword:** `Apple price update South Africa`
- **Angle:** Analysis of what moved, what's now cheaper/dearer, recommendations on timing.

### 16.15 Post 18 — Siri in iOS 27 (evergreen trigger)

- **Trigger:** iOS 27 public release (expected September/October 2026)
- **Primary keyword:** `Siri iOS 27`
- **Angle:** Hands-on Siri testing from workshop devices, what actually works, SA-accent recognition testing, feature gating on older iPhones.

### 16.16 Post 19 — Epic v. Apple SCOTUS (evergreen trigger)

- **Trigger:** Supreme Court certiorari decision or ruling
- **Primary keyword:** `Epic v Apple Supreme Court`
- **Angle:** What the ruling means for iPhone users globally, including in SA. Structural changes to App Store, payment rails, developer economics.

---

## APPENDIX A — COMPLETED DRAFT 1: PRIMARY CEO POST {#appendix-a}

**Filename:** `Apple CEO John Ternus Blog Post v2.md`
**Publish:** 22 April 2026, 10:00 SAST
**Status:** Production-ready. Fact-checked against §5.

```markdown
---
title: "Tim Cook Steps Down, John Ternus Takes Over: What Apple's Leadership Change Means for South African Users"
slug: tim-cook-steps-down-john-ternus-apple-ceo-south-africa
category: News
author: courtney-bentley
datePublished: "22 April 2026"
dateModified: "22 April 2026"
primaryKeyword: "John Ternus Apple CEO"
secondaryKeywords:
  - "Tim Cook stepping down"
  - "new Apple CEO 2026"
  - "Apple's 8th CEO"
  - "what Apple CEO change means"
  - "when does John Ternus become CEO"
featuredImage: /blog/apple-leadership-transition-za-support-hyde-park.webp
featuredImageAlt: "MacBook Pro logic board under inspection at ZA Support Hyde Park workshop"
schema:
  - BlogPosting
  - NewsArticle
  - BreadcrumbList
  - FAQPage
  - Person
  - Organization
---

# Tim Cook Steps Down, John Ternus Takes Over: What Apple's Leadership Change Means for South African Users

**Breadcrumbs:** Home / Blog / News / Apple Leadership Change 2026

*Published 22 April 2026 · Updated 22 April 2026 · By Courtney Bentley, Apple-certified technician, ZA Support*

## Key Takeaways

- Tim Cook is stepping down after 15 years as Apple CEO. John Ternus, previously senior vice president of Hardware Engineering, becomes Apple's 8th CEO on 1 September 2026. Cook stays on as executive chairman.
- Under Cook, Apple's market capitalisation grew more than 1,000% to roughly US$4 trillion, and annual revenue grew from US$108 billion (FY2011) to US$416 billion (FY2025).
- Ternus, 50, is a mechanical engineer by training (UPenn, 1997) and has spent 25 years at Apple. His teams led the MacBook Neo, iPhone Air, iPhone 17 lineup, and Apple Vision Pro hardware.
- Johny Srouji becomes Apple's Chief Hardware Officer in an expanded role; Tom Marieb takes over Ternus's previous direct responsibilities.
- For South African Apple users this is a continuity transition, not a reset. Device pricing, warranty terms, and local reseller policy are not affected in the short term.
- The line we are watching from our Hyde Park workshop: whether a hardware-engineering CEO protects Mac and iPad repairability and longevity — which matters directly for every business running an Apple fleet in Johannesburg.

## Table of Contents

1. What Happened
2. Who is John Ternus?
3. Why is Tim Cook Stepping Down Now?
4. What Challenges Does Ternus Inherit?
5. What Does This Mean for South African Apple Users?
6. What Does This Mean for Johannesburg Businesses?
7. Will Apple's Repair and Warranty Policy Change?
8. What Our Workshop Is Watching For
9. FAQ

## What Happened

On Monday 20 April 2026, Apple announced that Tim Cook will step down as CEO on 31 August 2026 and that John Ternus, Apple's senior vice president of Hardware Engineering, becomes CEO on 1 September 2026. Cook will then move to executive chairman, continuing in an advisory and policy-engagement capacity.

Arthur Levinson, who has been Apple's non-executive chairman for the past 15 years, becomes lead independent director on the same date. Ternus joins the Apple board.

Apple also announced a hardware-side reshuffle behind Ternus. Johny Srouji (previously senior vice president of Hardware Technologies, famous for leading Apple Silicon) becomes Chief Hardware Officer in an expanded role. Tom Marieb takes over the direct hardware-engineering portfolio that Ternus previously held.

This is the first Apple CEO transition since Cook took over from Steve Jobs in 2011. Ternus will be Apple's 8th CEO.

## Who is John Ternus?

John Ternus is 50 years old. He earned a Bachelor of Science in Mechanical Engineering from the University of Pennsylvania in 1997, where he also competed on the men's varsity swimming team.

Before Apple, he worked at Virtual Research Systems, designing early virtual-reality headsets. He joined Apple in 2001 as a mechanical engineer on the product design team. His first project was the original Apple Cinema Display.

His trajectory: 2001 joined as mechanical engineer; 2013 VP Hardware Engineering under Dan Riccio (AirPods, Mac, iPad); 2020 takes on iPhone hardware leadership; 2021 SVP Hardware Engineering and joins executive team; 1 September 2026 becomes CEO.

His teams at Apple led development of the iPad, AirPods, Apple Vision Pro, iPhone 17 lineup, iPhone Air, and the recently launched MacBook Neo. He has been a recurring presenter at Apple events since 2018.

Ternus is not well known outside the Apple-events circuit. He has not courted press. Industry observers describe him as low-ego, collaborative, and engineering-first. Morgan Stanley's analyst note after the announcement captured it: promoting Ternus signals that Apple's emphasis is going to remain "product at the centre of the flywheel".

## Why is Tim Cook Stepping Down Now?

Cook is 65, has been CEO for 15 years, and leaves Apple with a record that is difficult to overstate. Market capitalisation: from roughly US$350 billion in 2011 to US$4 trillion in 2026 — growth of more than 1,000%. Annual revenue from US$108 billion (FY2011) to US$416 billion (FY2025), nearly 4x. New product lines launched under his watch include Apple Watch, AirPods, Apple Vision Pro, the Apple Silicon transition for Mac, and Apple Intelligence.

The messaging from Apple is a planned, long-term succession, not a crisis exit. Cook is not leaving Apple — he shifts to executive chairman, keeping the board-level and government-relations work while Ternus takes operational control. This is the pattern Apple used before: Jobs handed to Cook in 2011 in a similar way.

The timing is also strategic. The handover happens before WWDC 2026 (June) and before the expected September iPhone 18 / iPhone Fold launch — giving Ternus a clean runway and a major hardware launch as his opening move.

## What Challenges Does Ternus Inherit?

Four open fronts, all with direct or indirect implications for South African users and the wider Apple repair economy.

**Apple Intelligence and the Siri Problem.** The most urgent issue. Apple's AI strategy has slipped more than once. Apple's AI chief John Giannandrea is leaving the company this month. In the interim, Apple has turned to Google Gemini and OpenAI's ChatGPT to power parts of Apple Intelligence. For South Africa, Apple Intelligence rollout has been staged and limited. Ternus's decisions on whether to keep renting third-party models or invest harder in Apple's own silicon-based AI will shape what features actually land on South African iPhones, iPads, and Macs — and on what hardware generation.

**The App Store Antitrust Fight.** The Epic Games litigation and the US DOJ 2024 smartphone monopoly case both remain active. Apple is preparing a Supreme Court petition on the Epic matter. The financial stakes are significant for Apple but limited for ordinary users. The operational stakes are bigger — if outcomes force sideloading, alternative payment rails, or interoperability with non-Apple smartwatches and messaging platforms, the iPhone experience changes in ways users will feel.

**India and a US$38 Billion Fine.** India's competition regulator has found Apple guilty of abusing its position in the app market and has indicated a potential fine of around US$38 billion — roughly R700 billion at current rates. The case is complicated by Apple's relatively modest Indian market share (around 9%), which gives Apple grounds to contest the penalty size. For South African observers this matters as precedent — regulators in every mid-sized market are watching what India gets away with.

**China Supply Chain Exposure.** Cook built Apple's manufacturing around China over two decades. That dependency is now both strategic and political. Apple has slowly moved parts of assembly to India and Vietnam, but the core of the iPhone still comes out of Chinese factories. Ternus inherits that position at a point where trade relationships are more volatile than at any time in Cook's tenure. Apple has explicitly signalled that Cook-as-executive-chairman will continue helping Ternus on this front.

## What Does This Mean for South African Apple Users?

For the person holding an iPhone or MacBook in Johannesburg, almost nothing changes on Day One. That is the whole point of how Apple has structured this transition.

What stays the same: iPhone, iPad, MacBook, iMac, and Apple Watch pricing through the South African reseller network; the Core Group distribution model in South Africa and iStore retail footprint; Apple's warranty terms and service policy; AppleCare+ pricing and terms; iCloud, App Store, and Apple Music availability.

What may shift over the next 12–18 months: Apple Intelligence availability on South African devices — this is the line item most directly in Ternus's lane, and decisions about which Apple silicon tiers get which AI features will shape upgrade advice for local clients; App Store rules — if US or EU litigation forces structural changes, those changes typically ripple to smaller markets including South Africa within a year or two; hardware release cadence — a hardware-engineering CEO may be more willing to ship longer-lived hardware platforms, which would lengthen the useful life of devices already on South African desks.

## What Does This Mean for Johannesburg Businesses Running Apple Fleet?

This is the question our enterprise clients in Sandton, Rosebank, Hyde Park, and Bryanston are asking today.

A change at Apple's top is much less disruptive to a small or medium business running 15 to 150 Apple devices than a change at Microsoft or Google would be, because the platforms you rely on — macOS, iOS, iPadOS, Apple Business Manager, Apple Business Essentials, and MDM tooling such as JAMF or Kandji — are already stable and unlikely to have their commercial terms rewritten by an incoming CEO.

Three practical implications worth planning around:

1. MDM and Apple Business Manager are safe bets. If your practice, firm, or studio has been weighing a move to a managed Apple fleet, nothing in this announcement changes that calculation. Ternus's hardware-first posture if anything strengthens the Mac and iPad as serious productivity platforms.
2. Do not panic-upgrade because of AI uncertainty. A working M1 MacBook Pro will still be a working M1 MacBook Pro in 18 months. Apple Intelligence support will arrive when it arrives; it is not worth replacing functional hardware on a rumour cycle.
3. Treat the first Ternus iPhone carefully. Incoming CEOs get scrutiny on their first major launch. September's iPhone 18 Pro and expected iPhone Fold will be that moment. For business procurement, the safer rule is to wait one quarter after launch rather than being a day-one buyer — which is standard practice regardless of the CEO.

In our Hyde Park workshop we see the downstream effect of every Apple design decision — repairability, component quality, logic-board serviceability, solder grade, adhesive strategy. A hardware-engineer CEO is a net positive on that axis.

## Will Apple's Repair and Warranty Policy Change?

Short version: not meaningfully, not soon.

Apple's Self Service Repair programme, Independent Repair Provider programme, and the slow opening of parts and diagnostics have all been driven more by US and EU regulatory pressure (right-to-repair legislation) than by CEO preference. That pressure is not going away. If anything, a hardware-engineering CEO is likely to be more comfortable with granular repair policy than an operations-first CEO, because the failure modes and the repair economics are inside his professional experience.

In our Hyde Park workshop we work every day with both out-of-warranty Macs (component-level logic board repair, liquid damage recovery, display assembly) and in-warranty devices (routed through the official channel). We do not expect the policy boundary between those two buckets to move sharply in the short term.

## What Our Workshop Is Watching For

Practical, not speculative. These are the specific signals we are tracking for our clients:

- WWDC 2026 keynote (June 2026) — Cook's last major set piece, but Ternus will share the stage. Apple's AI strategy and the macOS/iOS roadmap will be the clearest guide to where Apple is going.
- September 2026 iPhone launch — Ternus's first major reveal as incoming CEO. Widely expected to include iPhone 18 Pro, iPhone 18 Pro Max, and the first iPhone Fold.
- Next MacBook Pro refresh cycle — whether repairability gains continue on the next silicon generation.
- Apple Intelligence feature gating — which silicon tiers get which features, and how aggressively older hardware is cut off.
- Any change to South African pricing relative to USD — sustained rand weakness plus any margin changes at Apple would show up here first.

## FAQ

### Who is the new Apple CEO?
John Ternus, previously Apple's senior vice president of Hardware Engineering, becomes Apple's 8th CEO on 1 September 2026. Tim Cook moves to executive chairman.

### When does John Ternus become Apple CEO?
1 September 2026. Cook remains CEO through 31 August 2026 and then transitions to executive chairman.

### How old is John Ternus?
He is 50 years old. He was born in 1975 or 1976 and graduated with a degree in Mechanical Engineering from the University of Pennsylvania in 1997.

### Will Apple device prices change in South Africa because of the new CEO?
No pricing change is linked to the transition. South African Apple pricing is driven by the USD–ZAR exchange rate, import duties, and Core Group distribution margins — none of which move because of a CEO handover.

### Should I delay buying a new MacBook or iPhone because of the leadership change?
No. The transition is being managed for continuity. If you need a device now, buy now. The only reason to delay is if a new hardware generation is imminent — which is a product cycle question, not a CEO question.

### Will Apple Intelligence finally arrive fully in South Africa under Ternus?
This is the most likely policy shift. Ternus is a hardware engineer with a clearer view of AI rollout dependencies than his predecessor. Our expectation is a cleaner, better-communicated rollout plan within his first year, but no guaranteed acceleration of South African availability.

### Does the leadership change affect my AppleCare or device warranty?
No. AppleCare terms, standard warranty, and repair policy are contractual and unaffected by the CEO transition.

### What is the MacBook Neo that Ternus is famous for?
The MacBook Neo is a laptop line launched under Ternus's hardware engineering leadership, positioned to make the Mac experience more accessible to a broader user base. We will cover it in a dedicated post on zasupport.com/blog.

---

**Need Help Planning Your Apple Device Strategy?**

We have been repairing and supporting Apple hardware in Johannesburg since 2009. If you are weighing an upgrade, planning a fleet refresh, or want a straight answer on whether to wait out the next Apple cycle, book an assessment.

Workshop assessment from R599 · 064 529 5863 · [Book via WhatsApp](/whatsapp) · [Book online](/book)

---

**Related Reading**
- [Who is John Ternus? The Engineer Taking Over at Apple](/blog/who-is-john-ternus-apple-ceo-engineer)
- [Apple Intelligence in South Africa: What the New CEO Means for the Timeline](/blog/apple-intelligence-south-africa-timeline)
- [What the Apple CEO Change Means for Johannesburg Businesses Running Apple Fleet](/blog/apple-ceo-change-johannesburg-business-fleet)

**Outbound authoritative source:** [Apple Newsroom — Tim Cook to Become Apple Executive Chairman, John Ternus to Become Apple CEO](https://www.apple.com/newsroom/2026/04/tim-cook-to-become-apple-executive-chairman-john-ternus-to-become-apple-ceo/)
```

---

## APPENDIX B — COMPLETED DRAFT 2: WHO IS JOHN TERNUS {#appendix-b}

**Filename:** `Who is John Ternus Blog Post.md`
**Publish:** 23 April 2026, 10:00 SAST
**Status:** Production-ready. Fact-checked against §5.

```markdown
---
title: "Who is John Ternus? The Engineer Taking Over at Apple"
slug: who-is-john-ternus-apple-ceo-engineer
category: News
author: courtney-bentley
datePublished: "23 April 2026"
dateModified: "23 April 2026"
primaryKeyword: "Who is John Ternus"
secondaryKeywords:
  - "John Ternus biography"
  - "John Ternus age"
  - "John Ternus University of Pennsylvania"
  - "John Ternus career Apple"
  - "John Ternus hardware engineering"
featuredImage: /blog/apple-hardware-engineering-workbench-za-support.webp
featuredImageAlt: "Logic board rework station at ZA Support Hyde Park workshop — the engineering discipline behind every Apple product"
schema:
  - BlogPosting
  - NewsArticle
  - Person
  - BreadcrumbList
  - FAQPage
  - Organization
---

# Who is John Ternus? The Engineer Taking Over at Apple

**Breadcrumbs:** Home / Blog / News / Who is John Ternus

*Published 23 April 2026 · By Courtney Bentley, Apple-certified technician, ZA Support Hyde Park*

## Key Takeaways

- John Ternus is Apple's 8th CEO, taking over from Tim Cook on 1 September 2026.
- He is 50 years old, a mechanical engineer by training, and has spent 25 years at Apple.
- He joined Apple in 2001 as a mechanical engineer on the product design team. His first project was the Apple Cinema Display.
- His teams led the iPad, AirPods, Apple Vision Pro, iPhone 17 lineup, iPhone Air, and MacBook Neo.
- He was a varsity swimmer at the University of Pennsylvania and designed a mechanical feeding arm for people with quadriplegia as his senior engineering project.
- Morgan Stanley's read on his appointment: it signals that Apple's strategy will keep "product at the centre of the flywheel".

## Table of Contents

1. The Basics: Age, Background, Role
2. University Years
3. Early Career Before Apple
4. 25 Years at Apple: A Timeline
5. The Products Ternus Built
6. What Kind of Leader is He?
7. Why an Engineer as CEO Matters for You
8. FAQ

## The Basics

- Full name: John Ternus
- Age: 50 (born 1975 or 1976)
- Nationality: American
- Education: BSc Mechanical Engineering, University of Pennsylvania, 1997
- Current role: Senior Vice President, Hardware Engineering, Apple Inc.
- Next role: Chief Executive Officer, Apple Inc., effective 1 September 2026
- Tenure at Apple: 25 years (since 2001)

## University Years

John Ternus studied mechanical engineering at the University of Pennsylvania, graduating in 1997. Two details from his student years are genuinely revealing about the person.

He competed on the men's varsity swimming team. Endurance-sport discipline shows up in engineering managers differently than in pure marketers or financiers. Long training cycles, delayed gratification, and process discipline are common patterns.

His senior engineering project was a mechanical feeding arm operable by people with quadriplegia, using head movements to control it. This is a meaningful choice of project. It is an assistive-technology problem solved with mechanical engineering — a direct foreshadowing of Apple's accessibility work, which has become a signature of the Cook era and has been extended under Ternus's hardware leadership with features like AirPods as over-the-counter hearing aids.

When Ternus gave the commencement address at the Penn engineering school in 2024, he spoke candidly about imposter syndrome during his early days at Apple: "I wasn't sure I belonged there. The people I met were so smart and so confident, and they knew so much more than me, but I'll always be grateful that I wasn't afraid to ask for help when I needed it."

## Early Career Before Apple

After graduation Ternus joined Virtual Research Systems, an early virtual-reality hardware company, as a mechanical engineer designing VR headsets. This is worth noting. The VR work that Ternus did in the late 1990s — long before commercial VR was viable — is directly relevant to the product category that Apple bet on heavily in 2024 with the Apple Vision Pro. Ternus has been thinking about head-mounted displays for nearly 30 years.

He joined Apple in 2001, at 25 years old, as a mechanical engineer on the product design team. His first project was the Apple Cinema Display — a flat-panel display line that Apple eventually merged into the Pro Display XDR product family.

## 25 Years at Apple: A Timeline

- 2001 — Joins Apple as mechanical engineer, product design team. First project: Apple Cinema Display.
- 2013 — Appointed Vice President, Hardware Engineering under Dan Riccio. Takes over engineering for AirPods, Mac, and iPad.
- 2018 onwards — Becomes regular presenter at WWDC and Apple Events (iMac Pro, Mac Pro, iPad Pro).
- 2020 — Takes on iPhone hardware leadership (previously overseen directly by Riccio).
- 2021 — Promoted to Senior Vice President, Hardware Engineering. Joins Apple's executive team.
- 2024–2025 — Leads the MacBook Neo project and the iPhone 17 / iPhone Air hardware work.
- 20 April 2026 — Apple announces Ternus as CEO-designate.
- 1 September 2026 — Becomes CEO.

## The Products Ternus Built

iPad. Ternus led the hardware engineering for the iPad line under Riccio, including the redesigned 2018 iPad Pro and every generation since.

AirPods. The entire AirPods line, from the original through AirPods Pro and the hearing-aid-capable models. The over-the-counter hearing aid capability — a genuinely novel use of consumer hardware — came out of his team.

Apple Vision Pro. The headset launched in 2024. While consumer reception has been mixed and the product has not hit Apple's volume expectations, the hardware engineering is widely admired — and Ternus's VR background from the 1990s goes straight back into that product's DNA.

iPhone 17 lineup. The fall 2025 iPhone generation, including the iPhone 17 Pro, iPhone 17 Pro Max, and the iPhone Air — described by Apple as "radically thin and durable". Ternus introduced this lineup on stage.

MacBook Neo. An all-new laptop launched under Ternus's leadership, aimed at making the Mac experience more accessible to a broader user base. Analysts describe MacBook Neo as one of the most disruptive products Apple has shipped in a while — and it is a core part of why Ternus got the CEO job.

Apple Watch. Every generation since the original, under his hardware engineering oversight at various levels.

## What Kind of Leader is He?

Two things come through consistently in industry reporting.

Low ego, high collaboration. Multiple sources describe Ternus as unusually collaborative for a senior tech executive, someone who inspires loyalty in his teams. This matters at Apple specifically, because Apple's engineering culture depends on hundreds of cross-functional decisions landing correctly on tight launch timelines. Disruptive internal politics would break that cadence.

Engineer, not a showman. Unlike Jobs, and to a lesser extent Cook, Ternus has not cultivated personal celebrity. His public presence is Apple's keynote stages and occasional press. He has not courted interviews. His own first all-hands message as incoming CEO was quoted by Mark Gurman: "We are about to change the world once again... AI is going to create almost unlimited potential." That is the tone — understated, engineering-confident, without the Steve Jobs theatre.

The closest analogue in Apple's own history is Dan Riccio, Ternus's former boss, who quietly ran hardware for years. Ternus is Riccio's intellectual heir in that sense.

## Why an Engineer as CEO Matters for You

We spend every day in our Hyde Park workshop inside MacBook, iMac, iPad, and iPhone hardware. A hardware-engineer CEO is relevant to the people who own and use these devices in specific ways.

Repairability. Apple has been incrementally improving repairability under external pressure — Self Service Repair, Independent Repair Provider programme, parts availability. An engineer CEO who understands failure modes is more likely to let those improvements continue than to reverse them for margin reasons.

Long-term reliability. Apple's public messaging around the Ternus appointment explicitly credits him with leading the company's focus on reliability and durability. For a South African buyer — where device lifespans are longer because replacement cost is higher against the rand — this is a direct benefit.

Thermal and power design. Apple Silicon's power efficiency is largely a hardware achievement. A CEO who understands the silicon-chassis-battery system personally will be harder to talk into shipping hot, thermally-compromised products.

Serviceability. Hardware engineers understand that products need to be opened, tested, cleaned, and sometimes fixed. They write fewer glue-only, part-pairing-locked devices than marketing-led leadership does.

None of this is guaranteed. But the probability distribution shifts in the right direction when the top job goes to someone who has held a logic board in their hands.

## FAQ

### How old is John Ternus?
He is 50 years old, born in 1975 or 1976.

### Where did John Ternus study?
University of Pennsylvania. He graduated with a Bachelor of Science in Mechanical Engineering in 1997.

### What was John Ternus's first job?
He worked at Virtual Research Systems designing virtual-reality headsets before joining Apple in 2001.

### What was John Ternus's first Apple product?
The Apple Cinema Display. He joined Apple's product design team in 2001 as a mechanical engineer.

### What products did John Ternus work on at Apple?
iPad, AirPods, Apple Watch, iPhone hardware (including the iPhone 17 lineup and iPhone Air), Apple Vision Pro, and the MacBook Neo.

### When does John Ternus become Apple CEO?
1 September 2026. Tim Cook stays as CEO through the summer of 2026, then transitions to executive chairman.

### What is John Ternus's management style?
Industry observers describe him as collaborative, low-ego, engineering-first, and someone who inspires loyalty in teams. He is not a showman in the Steve Jobs mould.

---

**Planning a Mac or iPhone Upgrade Under New Apple Leadership?**

Whatever Ternus ships in September, the right device for you depends on what you actually do with it. We have been advising Johannesburg clients on Apple purchases, upgrades, and fleet refreshes since 2009. Talk to us before you buy.

Workshop assessment from R599 · 064 529 5863 · [WhatsApp](/whatsapp) · [Book online](/book)

---

**Related Reading**
- [Tim Cook Steps Down, John Ternus Takes Over: What Apple's Leadership Change Means for SA Users](/blog/tim-cook-steps-down-john-ternus-apple-ceo-south-africa)
- [MacBook Neo Explained: The Product That Built Ternus's CEO Case](/blog/macbook-neo-apple-laptop-explained)
- [What the Apple CEO Change Means for Johannesburg Businesses Running Apple Fleet](/blog/apple-ceo-change-johannesburg-business-fleet)

**Outbound authoritative source:** [Apple Leadership — John Ternus](https://www.apple.com/leadership/john-ternus/)
```

---

## APPENDIX C — COMPLETED DRAFT 3: JHB BUSINESS FLEET IMPACT {#appendix-c}

**Filename:** `Apple CEO Change JHB Business Blog Post.md`
**Publish:** 24 April 2026, 10:00 SAST
**Status:** Production-ready. Fact-checked against §5.

```markdown
---
title: "What the Apple CEO Change Means for Johannesburg Businesses Running Apple Fleet"
slug: apple-ceo-change-johannesburg-business-fleet
category: News
author: courtney-bentley
datePublished: "24 April 2026"
dateModified: "24 April 2026"
primaryKeyword: "Apple CEO change business South Africa"
secondaryKeywords:
  - "Apple fleet Johannesburg"
  - "JAMF MDM South Africa"
  - "Apple Business Manager South Africa"
  - "Apple enterprise support Sandton"
  - "MacBook fleet management Johannesburg"
featuredImage: /blog/za-support-enterprise-apple-fleet-management-hyde-park.webp
featuredImageAlt: "Apple fleet being prepared for enterprise deployment at ZA Support Hyde Park workshop"
schema:
  - BlogPosting
  - NewsArticle
  - BreadcrumbList
  - FAQPage
  - Person
  - Organization
  - LocalBusiness
---

# What the Apple CEO Change Means for Johannesburg Businesses Running Apple Fleet

**Breadcrumbs:** Home / Blog / News / Apple CEO Change — Business Impact

*Published 24 April 2026 · By Courtney Bentley, Apple-certified technician & enterprise Apple specialist, ZA Support Hyde Park*

## Key Takeaways

- Nothing in the announcement forces any operational change to a business running Apple fleet in Johannesburg right now. macOS, iOS, iPadOS, Apple Business Manager, and the MDM ecosystem (JAMF, Kandji, Mosyle) are unaffected.
- John Ternus becomes Apple CEO on 1 September 2026. He is a hardware engineer by training and background, which is a net positive for Mac and iPad reliability, repairability, and long-term serviceability.
- Upgrade cycles and fleet refreshes should continue on plan. The transition does not justify delaying a justified upgrade, and a purchase made today will not be stranded by the handover.
- Two policy items to watch closely: Apple Intelligence rollout timing for South Africa, and any App Store structural changes from the US/EU antitrust fights — both of which affect users daily.
- The enterprise implication of a hardware-engineer CEO: higher odds that long-life Mac and iPad platforms are protected, which lengthens useful device life on SA desks and improves total cost of ownership.

## Table of Contents

1. The Short Answer for a Busy Operations Manager
2. What Does Not Change
3. What Might Change — and When
4. Should You Delay a Fleet Refresh?
5. Apple Intelligence and Your Business
6. The Quiet Upside of an Engineer CEO
7. Action Items This Quarter
8. FAQ

## The Short Answer for a Busy Operations Manager

If you are an ops manager, practice manager, or IT lead at a Johannesburg firm running anywhere from 15 to 150 Apple devices, here is what you need to know in one paragraph.

Apple's CEO transition on 1 September 2026 does not require you to do anything differently. Your existing macOS, iOS, and iPadOS devices will keep working the same way. Your Apple Business Manager configuration is unaffected. Your JAMF, Kandji, or Mosyle MDM deployment is unaffected. Planned fleet refreshes should proceed. The one thing worth adding to your next quarterly IT review is a note to watch Apple's Q3 2026 WWDC announcements for any Apple Intelligence changes that might affect user productivity expectations.

That is genuinely it. Everything below is detail.

## What Does Not Change

For a business running Apple fleet, the following are all contractually locked or technically stable through the transition:

- AppleCare+ and AppleCare for Enterprise terms — contractual, unaffected
- Apple Business Manager — same account, same device enrolment, same MDM linking
- Device Enrolment Programme (DEP) / Automated Device Enrolment (ADE) — unchanged
- Apple Business Essentials — same subscription tiers
- MDM API surface (used by JAMF, Kandji, Mosyle, Intune) — stable, Apple is heavily invested
- macOS, iOS, iPadOS software updates — roadmaps published years ahead, unaffected by CEO change
- Managed Apple IDs — same federation with Google Workspace and Microsoft Entra ID
- Volume purchasing through Apple Business Manager / local resellers — unchanged
- Warranty terms for new devices purchased through Core Group, iStore, incredible, Digicape — unchanged
- The Independent Repair Provider programme and Self Service Repair — driven by regulation, not CEO preference

If you are in the middle of a JAMF deployment, a migration to managed Apple IDs, or a POPIA-compliance sprint on your Apple devices, continue. None of that work is threatened by the handover.

## What Might Change — and When

Three items on the horizon are genuinely worth watching. None of them require action today, but they should be in your Q3/Q4 2026 planning cycle.

Apple Intelligence rollout to South Africa. Expected staged rollout through 2026-2027, accelerating under Ternus's leadership. If your team uses Apple devices for document drafting, email triage, or meeting notes, Apple Intelligence features (text rewriting, mail summarisation, Siri with ChatGPT integration) materially change expectations. Staff already exposed to ChatGPT, Gemini, and Claude will compare. Apple Intelligence support is also gated by silicon — some features require M1 or newer Macs, and A17 Pro or newer iPhones. Audit your fleet's Apple Intelligence eligibility now, before the rollout accelerates.

App Store and payment-rail structural changes. Ongoing through 2026-2027 US litigation (Epic petitioning Supreme Court; DOJ case working through courts); EU Digital Markets Act enforcement already in motion. If your business uses iPhone-distributed apps for field teams, retail point-of-sale on iPad, or internal tooling through managed App Store distribution, any structural change to how apps are distributed and paid for could ripple into your workflow. This is also an India story — a US$38 billion fine threat from Indian regulators sets precedent for every mid-sized market. No immediate change. Flag as a medium-term watch item for your tech stack review in early 2027.

Apple Silicon Mac refresh cadence. Next M-series refresh expected in the second half of 2026 or early 2027. Ternus-led hardware has historically emphasised reliability and durability. A longer-life Mac platform under an engineer CEO means your replacement cycle can stretch from the typical 3-4 years to 5-6 years for knowledge workers, which is material for TCO calculations. If a fleet refresh is planned for Q4 2026 or early 2027, budget for this — you may get better value by waiting one quarter post-launch rather than being a day-one buyer.

## Should You Delay a Fleet Refresh?

Short answer: only delay for product-cycle reasons, not CEO-transition reasons.

Long answer with the actual decision matrix:

- Devices are 4+ years old and under performance / battery degradation → Refresh now, don't wait
- Devices are 2-3 years old and working fine → Defer to the next Apple Silicon generation (standard hygiene)
- Planning to introduce Apple Intelligence-dependent workflows → Ensure all new devices are M1 or newer; audit existing fleet for eligibility
- Heavily using iPad for field or retail → Refresh on plan — iPad hardware is not affected by the transition
- New hires starting in Q3 2026 → Provision current-generation hardware now rather than waiting for the September launch event

The one real exception: if you are provisioning for a September 2026 start date and the budget allows one quarter of flexibility, waiting until October 2026 lets you buy either the iPhone 18 Pro or its predecessor at a lower price, and gives the early-adopter risk period to clear on any new devices.

## Apple Intelligence and Your Business

The single Apple-side storyline most likely to affect your daily business operations is Apple Intelligence.

Current state as of April 2026: Apple Intelligence is live in limited markets with limited features; South African rollout has been staged and incomplete; Apple's AI chief John Giannandrea is leaving the company this month; Apple has partnered with Google Gemini and OpenAI ChatGPT to power parts of Apple Intelligence — a multi-provider AI strategy; Morgan Stanley's analyst note after Ternus's appointment reads Apple's direction as "product at the centre of the flywheel" — suggesting tighter hardware-software-AI integration rather than handing the AI layer to third parties permanently.

What this means for your business:

1. Do not build critical workflows that depend on Apple Intelligence features being available on a specific timeline. Apple has slipped this rollout twice. Continue using the tools your team already has (Google Workspace, Microsoft 365, ChatGPT, Claude Enterprise) for AI-dependent work.
2. Plan for Apple Intelligence to arrive more fully in SA within 12 months. When it does, you want to be on Apple silicon. Intel Mac users will be locked out.
3. POPIA implications. When AI features arrive locally, there will be new data-flow questions — what data leaves the device, what is processed on-device, what goes to third-party providers (Google, OpenAI). Flag this for your POPIA compliance review.

## The Quiet Upside of an Engineer CEO

From the workshop floor in Hyde Park, here is the observation that does not make the business-news headlines but matters practically:

Apple under an engineer CEO is more likely to protect long-life hardware platforms, repairability, and thermal/power discipline than Apple under an operations or finance CEO would be.

That translates into these measurable business outcomes: longer useful device life — your MacBook Pro fleet can realistically run 5-6 years productive life rather than 3-4 years; lower total cost of ownership — fewer replacement cycles, fewer redeployment exercises, fewer re-enrolment cycles through MDM; better serviceability — when something does fail, component-level repair remains viable at providers like ZA Support, keeping devices in service rather than writing them off; silicon efficiency gains continue — Apple Silicon's power and thermal envelope continues improving, which means quieter, cooler, longer-lasting laptops in open-plan office environments.

These are probability shifts, not guarantees. But they are the right direction.

## Action Items This Quarter

A clean to-do list for an IT lead at a Johannesburg SME running Apple fleet:

1. Audit Apple Intelligence eligibility across your fleet. Any M1 or newer Mac, any A17 Pro or newer iPhone. Document this in your asset register.
2. Confirm your Apple Business Manager configuration is current. If you migrated from DEP/VPP more than 12 months ago, verify federation with your IdP (Google Workspace or Microsoft Entra ID).
3. Review your MDM policy set for any assumptions about Apple Intelligence. If your MDM policy blocks certain cloud-AI integrations, update now so policy is ready when features land.
4. Flag September 2026 in your budgeting calendar. New iPhone and foldable iPhone launches, plus Ternus's first CEO quarter, are the inflection point.
5. Book a fleet health check with your enterprise Apple support provider. If that is us, happy to run through it.

## FAQ

### Does the Apple CEO change affect my AppleCare for Enterprise contract?
No. AppleCare for Enterprise is contractual and does not change because of a CEO transition.

### Will Apple Business Manager change under the new CEO?
No changes are expected in the short term. Apple Business Manager is deeply invested in and is a key enterprise retention tool.

### Should I pause my JAMF or Kandji deployment?
No. MDM tooling is orthogonal to the CEO change. Continue.

### Will iPhone and MacBook prices change in South Africa?
SA pricing is driven by the USD-ZAR exchange rate and import duties, not by Apple's CEO. The transition is not a pricing event.

### When does Apple Intelligence arrive fully in South Africa?
No official date. Industry expectation is accelerated rollout under Ternus's leadership through 2026-2027. Ensure your fleet is on M1 or newer Macs and A17 Pro or newer iPhones to be ready.

### Does the Apple CEO change affect POPIA compliance for my Apple devices?
No direct effect. POPIA compliance is a device-configuration and data-flow question, not a vendor-leadership question.

### Is Ternus going to change Apple's repair policy?
Unlikely in any direction that matters to SA business fleet. Apple's repair policy is being shaped more by US/EU right-to-repair legislation than by CEO preference.

---

**Need Enterprise-Level Apple Support in Johannesburg?**

We manage Apple fleet for Sandton, Rosebank, Hyde Park, and Bryanston-based firms, from 10-device professional services firms up to 150-device retail operations. JAMF/Kandji MDM, Apple Business Manager setup, POPIA device hardening, fleet refresh planning, and component-level Mac repair when devices fail.

Book a fleet health check · 064 529 5863 · [WhatsApp](/whatsapp) · [Enterprise Apple support →](/enterprise-apple-support)

---

**Related Reading**
- [Tim Cook Steps Down, John Ternus Takes Over: What Apple's Leadership Change Means for SA Users](/blog/tim-cook-steps-down-john-ternus-apple-ceo-south-africa)
- [Who is John Ternus? The Engineer Taking Over at Apple](/blog/who-is-john-ternus-apple-ceo-engineer)
- [Apple Intelligence in South Africa: What the New CEO Means for the Timeline](/blog/apple-intelligence-south-africa-timeline)
- [POPIA Compliance for Small Businesses Running Apple Devices](/blog/popia-compliance-apple-devices-south-africa)

**Outbound authoritative source:** [Apple Business Manager — Official Apple Documentation](https://support.apple.com/guide/apple-business-manager/welcome/web)
```

---

## APPENDIX D — COMMON FACT-CHECK ERRORS (QA CHECKLIST) {#appendix-d}

These are errors caught during v1→v2 review of the primary CEO post. Check every draft against this list:

| Error pattern | Correct version |
|---|---|
| Stating Ternus is already CEO | He becomes CEO **1 September 2026** — Cook stays through summer |
| Omitting Ternus's age | **50** (born 1975/1976) |
| Omitting Ternus's education | UPenn, BSc Mechanical Engineering, 1997 |
| Omitting "8th CEO" framing | Apple's **8th CEO** (high search volume) |
| Omitting Srouji/Marieb succession | Srouji → Chief Hardware Officer; Marieb takes Ternus's direct work |
| Missing MacBook Neo / iPhone Air as Ternus products | Both are core to his CEO pitch |
| Weak revenue/market cap framing | $108bn → $416bn revenue; $350bn → $4tn market cap; 1,000%+ growth |
| Using MM/DD/YYYY dates | Use DD Month YYYY |
| Using US spelling | Use SA English throughout |
| Using "world-class" / "robust" / "enterprise-grade" | Banned tone words — rewrite |
| "ZA Support Team" as author | Always `courtney-bentley` |
| Missing workshop photo / using stock | Workshop photo required |
| Missing FAQ | 3-7 FAQs minimum |
| Missing outbound authoritative link | Min 1 to Apple Newsroom or Apple Support |
| Featured image >200 KB | Compress to ≤200 KB WebP |
| Internal link to non-existent post | Replace with closest existing post |

---

## APPENDIX E — REFERENCE URLs {#appendix-e}

Apple official sources (permanent, citable):
- Apple Newsroom — CEO transition: https://www.apple.com/newsroom/2026/04/tim-cook-to-become-apple-executive-chairman-john-ternus-to-become-apple-ceo/
- Apple Leadership — John Ternus: https://www.apple.com/leadership/john-ternus/
- Apple Newsroom — WWDC 2026 announcement: https://www.apple.com/newsroom/2026/03/apples-worldwide-developers-conference-returns-the-week-of-june-8/
- Apple Business Manager docs: https://support.apple.com/guide/apple-business-manager/welcome/web
- Apple Privacy: https://www.apple.com/privacy/
- WWDC26: https://developer.apple.com/wwdc26/

Authoritative secondary sources (background, for additional research only — do not quote):
- Wikipedia — John Ternus: https://en.wikipedia.org/wiki/John_Ternus
- Wikipedia — WWDC: https://en.wikipedia.org/wiki/Worldwide_Developers_Conference

Press coverage archived 20-22 April 2026 (context only, not for quoting):
- CNBC — Apple CEO transition coverage (multiple articles 20-21 April 2026)
- Fortune — Ternus / Cook profile
- Bloomberg / Mark Gurman — WWDC graphic, iPhone Fold, all-hands report
- 9to5Mac — Ternus confirmed as CEO, all-hands remarks
- PBS / AP — Ternus profile
- MacRumors — WWDC 2026 roundup
- TechCrunch — Ternus / antitrust / AI analysis

iPhone Fold coverage (for Post 12 and 13 reference):
- Bloomberg — Foldable iPhone on track for September debut
- MacRumors — iPhone Fold production pushed back but still Fall 2026
- Stuff South Africa — iPhone Fold targets iPhone 18 release
- Khaleej Times — iPhone Fold release date confirmed
- Smartprix — iPhone Fold India pricing (for ZAR price modelling)

---

## FINAL NOTES FOR CLAUDE CODE

1. **Start with the Sanity connector installation** (§4.1). Until this is in place, every draft must be manually imported — which is workable but not the target state.
2. **Then publish the three ready drafts** (Appendices A, B, C) on their scheduled dates. These are the highest-value posts because they ride the actual peak of Apple-CEO search volume this week.
3. **Then produce Posts 4 and 5** per §16.1 and §16.2, publishing 28 and 29 April.
4. **Between 30 April and 6 June**, the news slot reverts to evergreen content. Do not pad news for the sake of the schedule.
5. **Six days before WWDC 2026** (2 June), begin producing Posts 6-9 per §16.3-16.6. Post 6 (preview) publishes 6 June. Post 7 (recap) publishes live during keynote Monday 8 June ~22:00 SAST.
6. **When Apple announces the September 2026 event date** (typically ~3 weeks before the event), slot Posts 10-13 (§16.7-16.10) into the queue. Post 13 is the commercial whale — iPhone Fold repair cost is unclaimed globally and captures the post-launch search surge.
7. **Post 14** (MacBook Neo explainer) publishes 2 September 2026, the day after Ternus officially starts.
8. **Queue C (Posts 15-19)** fires on specific news triggers. Watch for them; do not pre-publish.
9. **Every post must pass §14.1 validation before going live.** No exceptions.
10. **Every post must trigger a Site Health Monitor scan within 1 hour of publish** (§14.4).
11. **If facts in §5 change, update §5 AND every post that references the changed fact.** Bump `dateModified`.

If anything in this file conflicts with the Perfect Blog Creator skill, the skill takes precedence and this file should be updated to match.

---

*End of instructions. This file is the canonical runbook for the ZA Support Apple News Stream as of 22 April 2026. Append new learnings at the bottom; do not overwrite the structural sections without cause.*
