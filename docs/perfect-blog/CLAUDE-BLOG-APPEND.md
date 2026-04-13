# PERFECT BLOG CREATOR RULES

> v2.0 | Added: 6 April 2026 | Apply to ALL blog content for zasupport.com

## AUTO-SETUP (Claude Code: run FIRST if components are missing)

If `src/components/blog/AuthorBox.tsx` does NOT exist, run:
```bash
bash perfect-blog/setup.sh
```
If not found in project root, search:
```bash
FOUND=$(find ~ -maxdepth 4 -name "setup.sh" -path "*/perfect-blog/*" 2>/dev/null | head -1) && bash "$FOUND"
```
This installs all components, pages, images, schema, patches layout.tsx, and installs the SKILL. Zero manual steps.

---

## Blog Post Mandatory Structure

Every blog post MUST include ALL of the following. No exceptions.

1. **Breadcrumbs** — Home / Blog / Category / Post Title (BreadcrumbList schema)
2. **Category tag** — Repairs | How-To | Pricing | Troubleshooting | Enterprise | Advice | Upgrades | Data Recovery
3. **H1 headline** — Question-format preferred for featured snippets
4. **Last updated date** — "Published DD Month YYYY · Updated DD Month YYYY"
5. **Key Takeaways** — 3-5 bullets in first 200 words (AI citation optimisation)
6. **Table of Contents** — Anchor jump links to H2s (required on posts >1,000 words)
7. **Body content** — Min 1,500 words repair guides | Min 800 words troubleshooting
8. **Original workshop photos** — Min 1 per post, alt text with "ZA Support Hyde Park"
9. **H2/H3 as questions** — Where possible, for featured snippet targeting
10. **40-60 word answers** — Directly below question headings
11. **FAQ section** — 3-6 Q&As as H3 headings
12. **Author box** — AuthorBox component: photo + name + role + bio + social links
13. **CTA block** — Assessment from R599 | 064 529 5863 | WhatsApp | /book
14. **Related posts** — 3 internal links to related blog posts
15. **Outbound link** — Min 1 to support.apple.com or Google Search Central
16. **Editorial policy link** — Footer link to /editorial-policy

## Required Schema (auto-generated)

- **BlogPosting** — headline, author (Person), datePublished, dateModified, publisher (Org)
- **BreadcrumbList** — Home > Blog > Category > Title
- **FAQPage** — All FAQ Q&As
- **Person** — Author with sameAs (LinkedIn, TikTok, Twitter, Facebook, Instagram), knowsAbout
- **Organization + LocalBusiness** — Address, hours, phone, AggregateRating 4.9/632

## Authors

**Primary: Courtney Bentley** (slug: courtney-bentley)
- Founder & Apple-Certified Technician
- Photo: /authors/courtney-bentley-author.webp
- Bio: Apple-certified since 2009. 25,000+ Mac repairs. Component-level logic board repair, liquid damage, enterprise fleet management. BSc Informatics (UNISA). Apple Developer Program.
- LinkedIn: https://www.linkedin.com/in/bentleycourtney/
- TikTok: https://www.tiktok.com/@appleexpertza
- Twitter: https://x.com/za_support
- Facebook: https://www.facebook.com/appleexpertsouthafrica
- Instagram: https://www.instagram.com/appleexpertza/

**Secondary: Mary Blount** (slug: mary-blount)
- Client Relations & Apple Support Specialist
- Photo: /authors/mary-blount-portrait.webp

NEVER use "admin", "ZA Support Team", or anonymous bylines.

## E-E-A-T Content Rules

**Experience** — First-person workshop refs: "In our Hyde Park workshop, we see..." Specific repair counts, tools (hot-air rework station, stereo microscope, ultrasonic cleaner), SA context (load shedding, Rand pricing). Original workshop photos.

**Expertise** — Apple terminology (logic board not motherboard). Specific model IDs. Link to Apple support docs.

**Authoritativeness** — "since 2009", "25,000+ repairs", Apple Developer Program, BEE Level 1. Link to /author/courtney-bentley.

**Trustworthiness** — Pricing from R599. Warranty up to 3 years. Link /editorial-policy. AggregateRating 4.9/632 via schema. "No Fix No Fee" where applicable.

## Content Velocity (UPDATED 13 April 2026)

- **Target:** 8 posts/day, every day, distributed via GSC traffic analyser
- **NEVER fewer than 8** — gaps are worse than volume
- **NEVER more than 8** — bursts trigger spam classifiers
- **NEVER cluster** — minimum 2-hour spacing between publishes (enforced by scheduler)
- **NEVER block content creation** — auto-fix mistakes, never ask for approval
- 8/day is sustainable ONLY because auto-fix + learning loop + GSC scheduling exist

## Pre-Flight (Before Every Post)

1. Check /blog for topic overlap — >60% overlap = UPDATE existing post
2. Verify keyword search volume
3. Analyse SERP top 3 for content gaps
4. Assign named author
5. Pass blog-leak-scanner with zero findings (auto-runs on save in Sanity)

## Internal Linking

- 3-5 links to other blog posts per post
- 1-2 links to service pages
- 1 link to author page
- 1 outbound to Apple Support or authoritative source
- Descriptive anchors, never "click here"
- No orphan pages

## GEO Optimisation (AI Citation)

- Key Takeaways in first 200 words
- Chunk-friendly H2/H3 hierarchy
- Direct 40-60 word answers below question headings
- Entity schema (Person + Org + sameAs + knowsAbout)
- Original data only ZA Support can provide

## Monthly Audit (1st of every month)

1. Check outdated pricing, warranty, model references
2. Update dateModified on changed posts
3. Cannibalisation review + consolidation
4. Broken link check
5. GSC positions 5-20 improvement
6. New FAQ questions from GSC queries
7. Internal links: older posts → newer content
8. Schema validation on top 10 posts
9. Core Web Vitals check
10. Google algorithm update review
11. Review `reports/learning-log.json` — check what patterns the system has learned
12. Verify cron jobs still active: `crontab -l | grep ZA-SUPPORT-BLOG`

## Images

- Original workshop photos, never stock
- Filename: `macbook-pro-swollen-battery-repair-za-support.webp`
- Alt: Descriptive + "ZA Support Hyde Park workshop"
- WebP, max 200KB, min 1200x800px featured
- EXIF/IPTC/XMP metadata stripped on upload (via sanity/uploadHook.ts or build pre-hook)

## Component Locations

```
src/components/blog/AuthorBox.tsx          — Author byline
src/components/blog/BlogSchema.tsx         — BlogPosting + BreadcrumbList + FAQPage JSON-LD
src/components/blog/HowToSchema.tsx        — HowTo schema for repair guides
src/components/blog/BlogComponents.tsx     — Breadcrumbs, TOC, LastUpdated, KeyTakeaways
src/components/SiteSchema.tsx              — Organization + LocalBusiness (layout.tsx)
src/app/blog/[slug]/page.tsx               — Uses BlogPostTemplate
src/app/author/[slug]/page.tsx             — Author pages with Person + ProfilePage schema
src/app/editorial-policy/page.tsx          — Editorial policy trust page
```

## Leak Protection System

```
config/banned-content-patterns.js          — 7-tier registry + auto-loaded learned patterns
config/learned-patterns.json               — Auto-managed, never edit by hand
sanity/validators/leak-auto-fixer.ts       — Pre-publish hook (never blocks)
scripts/scan-blog-leaks.js                 — Daily cron scanner (02:00 SAST)
scripts/learning-loop.js                   — Daily generaliser (03:00 SAST)
scripts/notify-leak-detected.js            — MS Graph email notifier
```

## GSC-Driven Scheduling

```
scripts/gsc-traffic-analyser.js            — Weekly heatmap builder (Sun 23:00 SAST)
scripts/schedule-sanity-posts.js           — Hourly draft-to-slot scheduler (:05)
config/publish-schedule.json               — 8 optimal hours, refreshed weekly
```

## Production Hardening

```
config/next.config.hardening.js            — Source maps off, CSP, no powered-by, console stripped
scripts/strip-image-exif.js                — sharp-based metadata stripper
```

## Never List (UPDATED 13 April 2026)

- Never publish without named author byline or BlogPosting schema or dateModified
- Never expose internal labels (LEARNED:, BETTER:, WHY SUCCESS:, REPLICATE:, SCORE:, RUBRIC:, EVALUATION:, KEY INSIGHT:, OBSERVATION:, [x] E-E-A-T) — see config/banned-content-patterns.js
- Never block content creation — auto-fix and learn instead
- Never ask for manual approval on detected leaks — fix transparently
- Never go below 8 posts/day OR above 8 posts/day
- Never cluster the 8 daily posts within a short window — minimum 2-hour spacing
- Never include prompt scaffolding ("As an AI", "I am Claude", system tags)
- Never include placeholder text ({{var}}, [INSERT NAME], Lorem ipsum, TODO, FIXME)
- Never duplicate primary keywords — UPDATE existing posts instead
- Never stock images when workshop photos exist
- Never omit FAQ, Key Takeaways, or TOC (>1,000 words)
- Never USD, HIPAA, US regs, Benoni, MM/DD/YYYY, iFixit images in published content
- Never "enterprise-grade", "best-in-class", "cutting-edge", "game-changer", "revolutionary", "world-class"
- Never admit liability, frame payments as debt, or use threat language
