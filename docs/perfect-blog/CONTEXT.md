# Perfect Blog Project — Complete Context for Opus Import

**Project:** Perfect Blog Creator for ZA Support (zasupport.com)
**Owner:** Courtney Bentley, Founder, ZA Support
**Version:** 2.0
**Date assembled:** 12 April 2026 | **Last updated:** 13 April 2026
**Purpose:** Single-document context dump so a fresh Claude Opus session can continue execution without re-doing research, re-fetching live data, or re-litigating decisions.

---

## COMPANION DOCUMENTS

This file is the master context. For specific topics, see:

| File | Topic |
|---|---|
| `SKILL.md` | Operational rules for blog creation |
| `README.md` | Package overview, file inventory, quick start |
| `CLAUDE-BLOG-APPEND.md` | Compact rules for CLAUDE.md append |
| `docs/ARCHITECTURE.md` | Full system architecture, component map, data flow |
| `docs/POLICIES.md` | Every policy decision with rationale and trade-offs |
| `docs/LEARNING-LOOP.md` | How the self-improving content pipeline works |
| `docs/DEPLOYMENT.md` | 16-stage deployment runbook |
| `skills/blog-leak-scanner/SKILL.md` | Leak detection sub-skill |
| `skills/blog-page-wording-repair/SKILL.md` | Auto-repair sub-skill |

---

## 0. MANDATORY PRE-FLIGHT — READ BEFORE TOUCHING ANYTHING

**These rules are non-negotiable. Do them in order before generating any new code, content, or files.**

### Rule 0.1 — Audit before building (no duplicate work)
Before creating any file, component, schema, page, or content piece described in this document:

1. **Check if it already exists** in the project workspace, the Next.js repo (`new-zas-website`), the Sanity CMS, the live site (zasupport.com), or any previously delivered package (perfect-blog.zip).
2. **Compare what exists against what this document specifies.** If the existing version already does what's described, do not rebuild it.
3. **Map what's done vs what's outstanding** at the start of every session. Output a short status table to Courtney before starting work — e.g.:
   ```
   AuthorBox.tsx       — EXISTS in /components/blog/, matches spec ✓ skip
   BlogSchema.tsx      — EXISTS but missing dateModified field — UPDATE
   HowToSchema.tsx     — NOT FOUND — BUILD
   /author/courtney    — page exists, schema missing — UPDATE
   ```
4. **Never overwrite without checking.** If a file exists and you intend to replace it, first read the existing file in full. State explicitly what's changing and why.

### Rule 0.2 — Research the content of new and existing files carefully
Before modifying or replacing any file:

1. Read the existing file from end to end. Do not skim.
2. Read the new specification or proposed replacement from end to end.
3. Identify the differences explicitly. Categorise each diff as: (a) addition, (b) correction, (c) regression, (d) stylistic.
4. Preserve anything in the existing file that is not contradicted by the new spec — especially custom logic, edge case handling, comments explaining historical decisions, or workshop-specific data.
5. CLAUDE.md files are always appended, never overwritten. This is a hard rule.

### Rule 0.3 — Only update content if it is newer AND proven to work
A new version of any file or instruction only replaces the existing version if BOTH conditions are met:

1. **Newer:** The new version reflects more recent information (later Google update, newer schema spec, updated brand guidance, fresh live data from the site).
2. **Proven:** The new version contains instructions or patterns that have been verified to work — either tested by Courtney, documented in a trusted source (Google official documentation, Schema.org spec, established SEO research), or already running successfully in production somewhere.

If a new version is newer but unproven, mark it as `// EXPERIMENTAL` in code or `> ⚠️ Unverified` in markdown and present it for Courtney's approval before deploying. If a new version is proven but older than what already exists, do not regress.

### Rule 0.4 — Ask when unsure, never guess
If you encounter ambiguity, missing information, or a decision point that has more than one defensible answer:

1. Ask Courtney directly. State the specific question and the options.
2. Frame the question with context — what you're trying to do, what you found, why it's ambiguous.
3. Make the question scannable: numbered options, clear default, short.

Examples of when to ask:
- Two existing files contradict each other and you can't tell which is current
- The spec calls for a feature that depends on data you don't have access to
- A redirect would break an existing inbound link you can see in Search Console
- Courtney's preferences and the live site's current behaviour conflict

### Rule 0.4.5 — Never expose internal authoring labels to public content
Internal evaluation labels, prompt scaffolding, meta-commentary, and authoring metadata must NEVER appear in rendered blog content. This includes (but is not limited to): `LEARNED:`, `BETTER:`, `WHY SUCCESS:`, `REPLICATE:`, `SCORE:`, `RUBRIC:`, `EVALUATION:`, `OBSERVATION:`, `[x] E-E-A-T signals`, `KEY INSIGHT:`, and any similar internal scaffolding text.

These labels expose ZA Support's proprietary content development workflow and must be stripped from all output BEFORE the content reaches Sanity CMS, let alone the rendered page. The `blog-leak-scanner` skill exists to detect these leaks on already-published pages, and `blog-page-wording-repair` exists to fix them automatically. Both are mandatory parts of the Perfect Blog Creator pipeline.

If you find yourself writing one of these labels while drafting content for ZA Support, stop immediately and rewrite the section in plain prose. The factual content underneath the label should survive; the label itself must not.

The full banned-pattern registry lives in `config/banned-content-patterns.js`. It covers 7 tiers: evaluation labels, prompt scaffolding, meta-commentary, placeholders, tone violations, geographic/format violations, and credential leaks.

### Rule 0.5 — Never stop other work while waiting for an answer
Asking a question is non-blocking. While waiting for Courtney's response:

1. Continue building, testing, or processing every other task that does not depend on the answer.
2. Park the blocked task in a clearly labelled holding state (e.g., `// BLOCKED: awaiting answer on X`).
3. Resume the blocked task immediately when the answer arrives.
4. Never sit idle. Never wait for permission to continue unrelated work.

If multiple questions arise during a session, batch them into a single message at a natural breakpoint rather than interrupting flow with each one individually.

---

## 1. PROJECT OVERVIEW

### What we are building
A complete Perfect Blog Creator infrastructure for zasupport.com — a Next.js 15 + Sanity CMS website for ZA Support, Johannesburg's Apple repair specialists. The infrastructure must:

1. Add author trust signals (byline, photo, bio, social links) to every blog post
2. Implement full E-E-A-T schema markup (BlogPosting, Person, Organization, BreadcrumbList, FAQPage, HowTo, ProfilePage)
3. Consolidate the existing water damage blog cluster (20 near-duplicate posts → 5 pillar/spoke structure)
4. Establish a content velocity ceiling that won't trigger Google's spam classifiers
5. Create reusable components for all future blog posts
6. Be packaged as deployable code (not advisory documents)

### Why this matters now
Google's March 2026 spam update completed on 25 March 2026 — right in the middle of ZA Support's heaviest blog publishing window. The site published 58 blog posts in 38 days, including bursts of 20 posts on 21 March, 10 posts on 27 March, and 8 posts on 29 March. This is the exact pattern Google's SpamBrain is trained to detect, and the site is now at risk of algorithmic penalties.

---

## 2. ZA SUPPORT — KEY FACTS

### Business
- **Legal entity:** Vizibiliti Intelligent Solutions (Pty) Ltd
- **Trading name:** ZA Support (also "ZA Support Apple Experts")
- **Founded:** 2009
- **Address:** 1 Hyde Lane, Second Floor, Office E2004, Hyde Park, Johannesburg, 2196
- **Phone:** 064 529 5863 (also WhatsApp)
- **Email:** admin@zasupport.com
- **Hours:** Mon–Fri 08:00–17:30, closed Sat/Sun
- **BEE:** Level 1
- **Apple status:** Authorised Apple Reseller, Apple Developer Program member
- **Google reviews:** 4.9 stars from 632 reviews

### Services (top 4 most profitable)
1. **MacBook logic board repair** (component-level, R599 assessment, up to 3-year warranty)
2. **Liquid damage repair** (ultrasonic cleaning, board-level recovery)
3. **iPhone/iPad screen repair**
4. **Enterprise Apple support** (JAMF MDM, fleet management, SME/managed services)

### Tech stack
- **Website:** Next.js 15 (App Router), Tailwind CSS v4, Sanity CMS, Vercel + Cloudflare
- **CMS:** Sanity.io
- **Domain:** zasupport.com (www subdomain)
- **WordPress legacy:** zasupport.com/wp-admin (still active for some legacy pages)
- **Existing schema:** FAQPage on some blog posts only — no BlogPosting, no Person, no Organization, no Breadcrumb

---

## 3. CURRENT SITE STATE — DATA-DRIVEN ANALYSIS

### Blog inventory (verified by direct fetch from zasupport.com/blog on 12 April 2026)

**Total: ~58 blog posts** plus ~30–40 legacy WordPress service/product pages.

### Publishing velocity (factual, not estimated)

| Date | Posts published | Notes |
|---|---|---|
| 20 Feb 2026 | 1 (JAMF MDM guide) | Baseline |
| 1 Mar | 1 | — |
| 8 Mar | 1 | — |
| 14 Mar | 6 | First burst |
| 16 Mar | 3 | — |
| 21 Mar | **20** | MAJOR SPIKE — red flag |
| 25 Mar | 4 | — |
| 26 Mar | 4 | — |
| 27 Mar | **10** | Second spike — water damage cluster |
| 29 Mar | **8** | Third spike — more water damage |
| 30 Mar – 12 Apr | **0** | Full publishing stop |

### Critical issues identified
1. **Velocity spikes match SpamBrain detection patterns.** Going from 1 post/week to 20 posts/day matches the exact behavioural signature Google's March 2026 update targeted.
2. **Water damage cluster cannibalisation.** ~18–20 posts cover near-identical water damage topics with keyword variants. Posts include: "MacBook Water Damage First Aid," "Spilled Coffee on MacBook," "Can a Water-Damaged MacBook Be Repaired," "MacBook Water Damage DIY Mistakes," "Signs of Water Damage MacBook," "MacBook Air Water Damage Logic Board Repair," "MacBook Water Damage Data Recovery Options," etc. Google flags this as scaled content abuse via template-style page generation.
3. **Week-long publishing gap (30 March – 6 April).** Going from 8 posts/day to 0 for 8 days signals inconsistency, which contradicts the "consistent themes and schedules" Google rewards.

### Content quality strengths (verified by direct page fetch)
- First-person workshop language ("we see this three times weekly")
- Specific technical details (Force Touch sensors, ribbon connectors, hot-air rework stations)
- Transparent pricing (R599 assessment, R1,200–R1,800 battery replacement)
- Real internal linking to service pages
- FAQPage schema present

### Content quality gaps (verified by direct page fetch of trackpad post)
- **No author byline anywhere** — posts show "29 March 2026, 9 min read" but no name
- **No author photo or bio** — zero E-E-A-T author signals
- **No BlogPosting/Article schema** — only FAQPage schema present
- **No Organization schema** — site-wide
- **No Person schema** — no author entity defined
- **No BreadcrumbList schema** — only visual "Back to Blog" link
- **No dateModified field** — only published date
- **No "last updated" indicator** — content freshness signal missing
- **No original workshop photos** — text references workshop but no images
- **No table of contents** — posts are 2,000+ words with no anchor jump links
- **No Key Takeaways / TL;DR block** — missing GEO optimisation for AI citation
- **No 4.9/632 review schema** — social proof not surfaced
- **Statement-format headings** instead of question-format (loses featured snippet opportunities)
- **No outbound links to Apple Support** or other authoritative sources
- **No editorial policy page** — missing trust signal

---

## 4. RESEARCH FINDINGS — GOOGLE 2026 LANDSCAPE

### Google March 2026 Spam Update (completed 25 March 2026)
- Rolled out in 19.5 hours (one of fastest ever)
- Targeted scaled content abuse, parasite SEO, link schemes, AI-generated thin content
- "Sites publishing 50–500 AI-generated articles per day across keyword clusters" were primary targets
- Distinguished penalised sites: identical structure across pages, no author credentials, no first-hand experience, near-duplicate content
- Recovery requires "demonstrating a genuine change in content quality direction"

### E-E-A-T as ranking infrastructure (March 2026 update emphasis)
- **Experience** (first E) is now the primary differentiator — first-hand involvement outranks comprehensive but impersonal information
- **Author bios are now ranking infrastructure, not optional metadata** — sites that added structured author pages saw measurable ranking improvements within weeks
- Author identity directly influences page-level authority
- Anonymous content underperforms named-author content in AI-driven discovery (LinkedIn 2026 study)

### Schema markup priorities (post-March 2026)
- **JSON-LD in document head** is preferred format
- **BlogPosting + Person author + Organization publisher** is the foundation triad
- **Entity disambiguation schema** (sameAs, knowsAbout, ProfilePage) is highest-leverage for AI Mode citation
- **AggregateRating** with real review counts adds measurable trust
- **BreadcrumbList** increases CTR via rich snippets
- **FAQPage** must match visible page content (no schema-only Q&As)
- **HowTo schema** valuable for repair/instructional content

### Content velocity rules (verified across 8 sources)
- No published "X posts per day = penalty" threshold — pattern matters more than count
- For a small local service business (~100 indexed pages), 2-3 posts per day is ceiling
- Consistency beats volume — same cadence weekly outperforms sporadic bursts
- Bursts of 20+ posts in a single day flag SpamBrain
- Domain age (2009) provides authority cushion but doesn't override velocity red flags

### Generative Engine Optimisation (GEO)
- AI engines (ChatGPT, Perplexity, Google AI Overviews) use RAG
- Content must be chunk-friendly: clear summaries, declarative answers, bulleted key points
- "Key Takeaways" or "TL;DR" blocks in first 200 words increase AI citation likelihood
- Long unbroken paragraphs are not retrieved by RAG systems

---

## 5. AUTHOR PROFILES (verified)

### Courtney Bentley (primary author)
- **Slug:** courtney-bentley
- **Role:** Founder & Apple-Certified Technician
- **Credentials:**
  - Apple-certified technician since 2009
  - BSc Informatics, University of South Africa (UNISA)
  - Member of the Apple Developer Program
  - 25,000+ Mac repairs overseen
  - Director of Vizibiliti Intelligent Solutions (Pty) Ltd
  - BEE Level 1 certified business owner
- **Specialisations:** Component-level logic board repair, liquid damage recovery, JAMF MDM enterprise deployment
- **Photo:** Professional B&W headshot (uploaded — file: courtney-bentley-author.png)
- **LinkedIn:** https://www.linkedin.com/in/bentleycourtney/
- **Other identity:** Also CEO of Vizibiliti Insight Africa (alternative credit scoring)

### Mary Blount (secondary author)
- **Slug:** mary-blount
- **Role:** Client Relations & Apple Support Specialist
- **Specialisations:** macOS troubleshooting, data recovery workflows, POPIA-compliant device handling
- **Photos available (uploaded):**
  - mary-blount-portrait.png — formal portrait
  - mary-blount-safety-goggles-workshop.png — workshop safety photo (best for E-E-A-T)
  - mary-blount-macbook-desk.png — working at desk
- **TikTok:** https://www.tiktok.com/@appleexpertza

### Workshop photos (uploaded for blog content)
- za-support-team-imac-workshop.png — team with iMac on rooftop
- za-support-workshop-mac-repair.png — workshop repair in progress
- za-support-team-rooftop.png — team rooftop shot

---

## 6. SOCIAL MEDIA INVENTORY

| Platform | Handle/URL | Purpose |
|---|---|---|
| Facebook | https://www.facebook.com/appleexpertsouthafrica | Brand page |
| Instagram | https://www.instagram.com/appleexpertza/ | Brand visuals |
| Twitter/X | https://x.com/za_support | Brand updates |
| TikTok | https://www.tiktok.com/@appleexpertza | Short-form video |
| YouTube | https://www.youtube.com/@zasupport-applemacupgrader6746 | Repair videos |
| LinkedIn | https://www.linkedin.com/in/bentleycourtney/ | Personal/founder |
| Google My Business | ZA Support, Hyde Park | Local SEO |

---

## 7. PRIORITY IMPLEMENTATION LIST (30 items, 5 tiers)

### Tier 1 — Author trust signals (immediate impact, low effort)
1. Author byline with name on every post (Courtney Bentley / Mary Blount)
2. Author photo — real workshop photo, not stock headshot
3. Author bio box below every post (50–75 words, linking to full author page)
4. Dedicated author page at /author/courtney-bentley with full credentials, article list, social links
5. Person schema + ProfilePage schema on author pages
6. SameAs entity links in schema (LinkedIn, Facebook, Instagram, YouTube, Twitter, TikTok)

### Tier 2 — Schema and structured data (site-wide)
7. BlogPosting schema with author, datePublished, dateModified on every post
8. BreadcrumbList schema (Home → Blog → Category → Post Title)
9. HowTo schema on repair guide posts
10. Organization schema with address, phone, hours, social profiles, AggregateRating (4.9/632 reviews)
11. LocalBusiness schema for Hyde Park workshop
12. knowsAbout entity properties linking ZA Support to Apple repair topics

### Tier 3 — Content structure upgrades (per post)
13. Table of contents with anchor jump links at top of every post
14. "Last updated" date visible on every post (not just publish date)
15. Key Takeaways / TL;DR summary in opening 200 words (GEO optimisation)
16. H2/H3 headings rewritten as questions where appropriate (featured snippet targeting)
17. Original workshop photos with descriptive filenames and alt text
18. 3–5 blog-to-blog internal links per post (not just to service pages)
19. Outbound links to Apple Support documentation
20. Featured snippet-formatted answers: concise 40–60 word answer below question headings

### Tier 4 — Content health and architecture
21. Water damage cluster consolidation: 20 posts → 5 pillar posts with 301 redirects
22. Orphan page audit: ensure every blog post has at least one inbound internal link
23. Legacy WordPress post audit: update, redirect, or archive 2014–2023 content
24. Content freshness schedule: quarterly review and dateModified updates
25. Editorial policy and corrections page

### Tier 5 — Technical performance
26. Core Web Vitals audit (LCP, INP, CLS) on live blog pages
27. Image optimisation: WebP format, lazy loading, responsive sizing
28. Open Graph and Twitter Card meta tags for social sharing previews
29. Sitemap optimisation: ensure all 58 blog posts are included
30. Canonical tags on near-duplicate posts to prevent cannibalisation

---

## 8. WATER DAMAGE CLUSTER CONSOLIDATION PLAN

### Current state
~20 water damage posts published 27–29 March 2026, all targeting overlapping keywords.

### Target structure
**5 pillar posts that absorb the existing 20:**

1. **Pillar:** "MacBook Water Damage Repair in Johannesburg" (3,000+ word comprehensive guide)
2. **Spoke:** "MacBook Water Damage First Aid: What to Do in the First 30 Minutes"
3. **Spoke:** "MacBook Water Damage Repair Cost South Africa 2026"
4. **Spoke:** "Signs of Water Damage on a MacBook: How to Check"
5. **Spoke:** "MacBook Logic Board Repair vs Replacement After Water Damage"

### 301 redirect map
| Old URL | New URL |
|---|---|
| /blog/can-water-damaged-macbook-be-repaired-south-africa | /blog/macbook-water-damage-repair-johannesburg |
| /blog/macbook-air-water-damage-logic-board-repair-johannesburg | /blog/macbook-water-damage-repair-johannesburg |
| /blog/macbook-water-damage-first-aid-steps-johannesburg | /blog/macbook-water-damage-first-aid |
| /blog/macbook-pro-coffee-spill-repair-cost-johannesburg | /blog/macbook-water-damage-repair-cost-2026 |
| /blog/macbook-liquid-damage-indicator-what-apple-checks | /blog/signs-of-water-damage-macbook |
| /blog/macbook-water-damage-diy-mistakes-to-avoid | /blog/macbook-water-damage-first-aid |
| /blog/spilled-coffee-on-macbook-what-to-do-right-now | /blog/macbook-water-damage-first-aid |
| /blog/macbook-water-damage-data-recovery-options | /blog/macbook-water-damage-repair-johannesburg |
| /blog/how-long-macbook-survive-after-water-damage | /blog/macbook-water-damage-repair-johannesburg |
| /blog/laptop-water-damage-repair-vs-buy-new-south-africa | /blog/macbook-logic-board-repair-vs-replacement |
| /blog/macbook-logic-board-repair-vs-replacement-water-damage | /blog/macbook-logic-board-repair-vs-replacement |
| /blog/macbook-water-damage-repair-cost-south-africa | /blog/macbook-water-damage-repair-cost-2026 |
| /blog/prevent-macbook-water-damage-protection-tips | /blog/macbook-water-damage-repair-johannesburg |
| /blog/does-macbook-warranty-cover-water-damage-south-africa | /blog/macbook-water-damage-repair-johannesburg |

---

## 9. CONTENT VELOCITY RULES (going forward)

### Policy update — 13 April 2026
**Velocity ceiling raised to 8 posts/day per business directive.** This overrides the previous 2-3/day recommendation that came from the post-incident velocity research. To make 8/day defensible, three protective systems are now mandatory:

1. **Pre-publish auto-fixer** in Sanity CMS (never blocks, transparently strips leaks)
2. **Daily leak scanner** + auto-repair (catches anything that slipped through)
3. **Learning loop** that turns every detected leak into a permanent prevention pattern

### Cadence rules (NEW)
- **Target:** 8 posts per day, every day
- **Distribution:** GSC-driven — `scripts/gsc-traffic-analyser.js` selects the 8 optimal hours weekly based on Search Console traffic patterns and crawl activity
- **Spacing:** Minimum 2 hours between publishes (enforced by the scheduler) to avoid burst patterns
- **Consistency over volume:** 8 every day beats 16 one day and 0 the next
- **Never below 8** (gaps trigger Google's content-update signals)
- **Never above 8** (bursts trigger spam classifiers)
- **Quality bar must be exceptional** — every post: original workshop photo, named author, full schema, passes leak scanner, unique primary keyword

### Why 8/day is defensible despite earlier 2-3/day research
- Domain age (17 years) provides authority cushion
- Every post has named author + Person schema (E-E-A-T strength)
- Every post has BlogPosting + BreadcrumbList + FAQPage + Organization schema
- Pre-publish auto-fix prevents thin/leaked content from reaching production
- Learning loop ensures the same mistakes never recur
- 8 × 365 = 2,920 posts/year, all unique, none cannibalised

### What MUST be true for every post at 8/day
1. Unique primary keyword (no cannibalisation with existing 58+ posts)
2. 1,500+ words for repair guides, 800+ for troubleshooting
3. Original workshop photo (not stock, not reused from another post)
4. Named author byline + Person schema
5. dateModified field
6. Passes blog-leak-scanner with zero findings
7. Topic falls within the 6 cluster categories below

### Previous velocity history (preserved for context)
- Domain age: 17 years (since 2009)
- Indexed pages: ~100 (58 new blog + ~40 legacy service/product pages)
- Blog cadence pre-policy: 0/week → 20 in one day (21 March) — this pattern triggered Google March 2026 spam classifier risk
- The 8/day policy is sustainable ONLY because the auto-fix and learning systems now exist; without them, this cadence would replicate the 21 March mistake at higher frequency

### Safe ceiling for zasupport.com
- **Maximum:** 2-3 posts per day, published at consistent times
- **Minimum:** 3 posts per week to maintain freshness
- **NEVER:** Batch-publish more than 5 posts in one day
- **NEVER:** Go more than 7 days without publishing
- **Consistency over volume:** Same cadence weekly beats sporadic bursts

### Topic distribution per month
- 40% Repair guides (logic board, liquid damage, screen, battery)
- 20% How-to/troubleshooting (WiFi, slow Mac, black screen, backup)
- 15% Pricing/cost guides
- 10% Enterprise/SME (JAMF, MDM, managed services, POPIA)
- 10% Product advice (repair vs replace, upgrade guides)
- 5% Industry news (macOS updates, Apple hardware releases, SA context)

---

## 10. CONTENT TARGETS (100 repair guides plan)

The user has requested 100 unique repair guides aligned with the 4 most profitable products:

### Cluster 1: Logic Board (25 guides)
Logic board liquid damage, failure, replacement, damage, repair costs, component-level repair vs full board swap, model-specific guides (M1, M2, Intel, etc.)

### Cluster 2: Small Business Apple Support (25 guides)
SME setup, fleet basics, security, backup, POPIA compliance, remote work, data migration

### Cluster 3: Enterprise/MDM/JAMF/Apple for Business (25 guides)
JAMF deployment, fleet management, Apple Business Manager, MDM policies, SLAs, enterprise security

### Cluster 4: Vertical-specific (25 guides)
- **Investec banking clients:** Apple security for banking, encryption, secure communications
- **Medical professionals (surgeons, specialists):** POPIA compliance, patient data, secure backup, HIPAA-equivalent SA frameworks

---

## 11. KEY DECISIONS & PREFERENCES

### From Courtney's standing preferences
- Spelling: South African English (organisation, optimisation, colour, programme)
- Currency: ZAR only, never USD
- Address: Hyde Park (never legacy Benoni)
- Date format: DD/MM/YYYY (never MM/DD/YYYY)
- Paper: A4 only (never Letter)
- Filenames: Use spaces or descriptive words, never underscores or hyphens in deliverable filenames
- No "enterprise-grade", "best-in-class", "cutting-edge", "world-class", "robust infrastructure" tone words
- All deliverables packaged as executable code/runbooks, not advisory documents
- Real data over estimates — fetch live data, never guesstimate
- CLAUDE.md files always appended, never overwritten
- Self-healing code preferred — anticipate, detect, fix, verify
- iFixit images: internal use only, never in commercial products
- No hiring suggestions — automate instead of hiring people
- Design tasks: ask whether to brief Qaasim before iterating in chat

### Decisions made in this project
1. **Author byline mandatory** — every post must have Courtney or Mary as named author
2. **Schema priority** — BlogPosting + BreadcrumbList + FAQPage + Organization + Person, all JSON-LD in head
3. **Velocity ceiling** — 8 posts/day (updated 13 April 2026 from 2-3/day), distributed via GSC traffic analyser, protected by auto-fix and learning loop
4. **Water damage consolidation** — 20 posts collapse to 5 pillar/spoke structure
5. **Image strategy** — original workshop photos only, descriptive filenames, WebP format, EXIF metadata stripped
6. **Editorial policy required** — trust signal page at /editorial-policy
7. **Component architecture** — reusable React components, schema auto-generated from props
8. **Never block content creation** — leak detection auto-fixes transparently, never asks for manual approval
9. **Learning loop** — every detected leak generalises into a permanent prevention pattern
10. **GSC-driven scheduling** — publish times selected weekly based on Search Console traffic + crawl heatmap
11. **Production hardening** — source maps disabled, EXIF stripped, x-powered-by removed, console stripped, CSP headers locked down (without breaking SEO-readable HTML/schema)

---

## 12. FILE DELIVERABLES (this package contains)

### Documentation (10 files)
- **CONTEXT.md** — This file (full project context for fresh sessions)
- **SKILL.md** — Perfect Blog Creator master skill (drop into /mnt/skills/user/perfect-blog-creator/)
- **README.md** — Package overview and quick start
- **CLAUDE-BLOG-APPEND.md** — v2.0 CLAUDE.md append rules
- **docs/DEPLOYMENT.md** — Step-by-step deployment runbook for Claude Code
- **docs/ARCHITECTURE.md** — Full system architecture diagram and pipeline
- **docs/POLICIES.md** — Every policy decision with rationale
- **docs/LEARNING-LOOP.md** — How the self-improving content pipeline works
- **skills/blog-leak-scanner/SKILL.md** — Leak detection sub-skill
- **skills/blog-page-wording-repair/SKILL.md** — Auto-repair sub-skill

### Scripts (7 files)
- **scripts/scan-blog-leaks.js** — Daily cron scanner (fetches sitemap, runs scanText, queues repairs, sends notifications)
- **scripts/strip-image-exif.js** — EXIF/IPTC/XMP metadata stripper using sharp
- **scripts/notify-leak-detected.js** — MS Graph email notifier (uses MS_GRAPH_REFRESH_TOKEN)
- **scripts/learning-loop.js** — Reads scan reports, generalises patterns, adds to learned-patterns.json permanently
- **scripts/gsc-traffic-analyser.js** — Fetches Google Search Console data, builds traffic heatmap, selects optimal 8 publish hours
- **scripts/schedule-sanity-posts.js** — Hourly scheduler: assigns ready drafts to next GSC-determined slot
- **scripts/install-cron-jobs.sh** — One-command installer for all 4 cron jobs

### React/TypeScript components (5 files)
- **components/AuthorBox.tsx** — Author byline component (Courtney + Mary profiles)
- **components/BlogSchema.tsx** — BlogPosting + BreadcrumbList + FAQPage JSON-LD generator
- **components/HowToSchema.tsx** — HowTo JSON-LD for repair guide posts
- **components/SiteSchema.tsx** — Site-wide Organization + LocalBusiness schema (4.9/632 AggregateRating)
- **components/BlogComponents.tsx** — Breadcrumbs, TableOfContents, LastUpdated, KeyTakeaways

### Page templates (3 files)
- **pages/BlogPostTemplate.tsx** — Complete blog post page wiring all components together
- **pages/AuthorPage.tsx** — Author profile page with Person + ProfilePage schema
- **pages/EditorialPolicy.tsx** — Editorial policy trust signal page

### Configuration (3 files)
- **config/next.config.redirects.js** — 301 redirect map for water damage consolidation (14 → 5)
- **config/next.config.hardening.js** — Production hardening (no source maps, CSP, no powered-by, console stripping)
- **config/banned-content-patterns.js** — Shared banned pattern registry (7 tiers + auto-loaded learned patterns)

### Sanity CMS (4 files)
- **sanity/leak-validator.ts** — DEPRECATED — was the original blocking validator (kept for reference)
- **sanity/leak-auto-fixer.ts** — ACTIVE — transforms drafts on save, never blocks
- **sanity/blogPost.schema.ts** — Complete blog post schema with auto-fixer wired in + scheduling fields
- **sanity/uploadHook.ts** — Image upload interceptor for EXIF stripping (placeholder for sharp integration)

### Assets (7 files)
- **assets/courtney-bentley-author.png** — Courtney's professional B&W headshot
- **assets/mary-blount-portrait.png** — Mary's portrait
- **assets/mary-blount-safety-goggles-workshop.png** — Strongest E-E-A-T photo
- **assets/mary-blount-macbook-desk.png** — Mary at workbench
- **assets/za-support-team-imac-workshop.png** — Team photo
- **assets/za-support-workshop-mac-repair.png** — Workshop floor
- **assets/za-support-team-rooftop.png** — Team building shot

### Installer
- **setup.sh** — Zero-touch installer (run from project root after extracting zip)

**Total: 37 files**

### Assets
- **assets/courtney-bentley-author.png** — Courtney's professional B&W headshot
- **assets/mary-blount-portrait.png** — Mary's portrait
- **assets/mary-blount-safety-goggles-workshop.png** — Mary in workshop safety gear
- **assets/mary-blount-macbook-desk.png** — Mary working on MacBook
- **assets/za-support-team-imac-workshop.png** — Team with iMac on rooftop
- **assets/za-support-workshop-mac-repair.png** — Workshop repair in progress
- **assets/za-support-team-rooftop.png** — Team rooftop shot

---

## 13. NEXT STEPS (for fresh Opus session)

### Immediate (this week)
1. **Deploy components into Next.js project** — copy components, pages, and assets to the live `new-zas-website` Sanity/Next.js project
2. **Add SiteSchema to layout.tsx** — site-wide Organization + LocalBusiness schema
3. **Update blog post template** to use BlogPostTemplate.tsx as base
4. **Convert PNG images to WebP** — optimise file sizes, place in /public/authors/ and /public/blog/
5. **Create author pages** at /author/courtney-bentley and /author/mary-blount
6. **Publish editorial policy** at /editorial-policy
7. **Apply 301 redirects** from config/next.config.redirects.js

### Short-term (this month)
8. **Retrofit existing 58 blog posts** to use new template (author byline, schema, breadcrumbs, etc.)
9. **Execute water damage cluster consolidation** — merge 20 posts into 5 pillar/spokes
10. **Resume publishing at safe cadence** — 2 posts/day max, consistent times
11. **Begin 100 repair guides plan** — start with Cluster 1 (Logic Board, 25 guides)

### Medium-term (next 3 months)
12. **Set up Google Search Console monitoring** for ranking changes
13. **Implement quarterly content audit process** per the SKILL.md schedule
14. **Build cross-posting automation** to LinkedIn, Medium, GMB
15. **Set up performance monitoring tool** to track which blog posts rank highest

---

## 14. RESEARCH SOURCES (verified during this project)

### Google official documentation
- Google Search Central spam policies: https://developers.google.com/search/docs/essentials/spam-policies
- Google March 2026 Spam Update (rolled out 24-25 March 2026, 19.5 hours)
- Google Quality Rater Guidelines (E-E-A-T framework, Experience added 2022)

### Third-party SEO research (cited)
- ALM Corp (March 2026 Spam Update analysis, 49-step SEO checklist)
- Digital Applied (Schema markup post-March 2026, E-E-A-T amplification)
- Search Engine Journal (LinkedIn 2026 study on named authors)
- Sangfroid Web Design (E-E-A-T author bio guide 2026)
- The HOTH (Technical SEO checklist 2026)
- Yotpo (Full technical SEO checklist 2026)
- DexterGPT (Schema markup guide for Google and AI engines 2026)
- Superblog (Blog schema markup guide 2026)
- Over The Top SEO (Schema markup guide 2026)

### ZA Support live data sources
- https://www.zasupport.com/blog (full blog index, 58 posts)
- https://www.zasupport.com/blog/macbook-trackpad-not-clicking-johannesburg (sample post analysis)
- https://www.zasupport.com (homepage and service pages)

---

## 15. WHAT TO TELL THE NEXT OPUS SESSION

If you're a fresh Claude Opus instance reading this for the first time, here's what you need to know:

1. **Don't re-research the basics.** The Google March 2026 update facts, E-E-A-T requirements, schema types, and content velocity rules are all documented above with citations. Don't waste tokens re-fetching these.

2. **Don't re-fetch the live blog data unless something has changed.** The blog inventory and publishing velocity table is current as of 12 April 2026. If more than 2 weeks have passed, refetch zasupport.com/blog to verify.

3. **The components in /components/ are ready to deploy.** They're not drafts. Don't rewrite them — just install them.

4. **The water damage consolidation is the highest-priority architectural fix.** Do this before any new content creation.

5. **Velocity discipline is non-negotiable.** No batch publishing. 2-3 posts per day maximum, consistent times, never go silent.

6. **Courtney's preferences are strict.** South African English, ZAR pricing, no overused tone words, all deliverables as executable code, real data over estimates. Read the preferences section above before generating any content.

7. **Mary Blount's safety-goggles workshop photo is the strongest E-E-A-T signal in the asset bundle.** Use it on her author page and on liquid damage posts where she's credited.

8. **Courtney's author photo is from his Vizibiliti Insight role**, but it's a high-quality professional B&W headshot that works for ZA Support too. No need to source a different photo.

9. **The skill file goes to /mnt/skills/user/perfect-blog-creator/SKILL.md in Claude Code.** Don't put it anywhere else.

10. **When in doubt, append to CLAUDE.md, never overwrite.** This is a hard preference rule.

---

*End of CONTEXT.md — All chat context preserved for Opus import*
*Generated 12 April 2026 | Perfect Blog Creator Project v1.0*
