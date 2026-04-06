# PERFECT BLOG CREATOR RULES

> Added: 6 April 2026 | Apply to ALL blog content for zasupport.com

## AUTO-SETUP (Claude Code: run this FIRST if components are missing)

If `src/components/blog/AuthorBox.tsx` does NOT exist in this project, run:
```bash
bash perfect-blog/setup.sh
```
If `perfect-blog/setup.sh` is not in the project root, search for it:
```bash
find ~ -maxdepth 4 -name "setup.sh" -path "*/perfect-blog/*" 2>/dev/null | head -1
```
Then run the found path. This installs all components, pages, images, schema, patches layout.tsx, and installs the SKILL. Zero manual intervention required.

---

## Blog Post Mandatory Structure

Every blog post MUST include ALL of the following. No exceptions.

1. **Breadcrumbs** — Home / Blog / Category / Post Title (with BreadcrumbList schema)
2. **Category tag** — One of: Repairs | How-To | Pricing | Troubleshooting | Enterprise | Advice | Upgrades | Data Recovery
3. **H1 headline** — Question-format preferred for featured snippet targeting
4. **Last updated date** — "Published DD Month YYYY · Updated DD Month YYYY" visible on page
5. **Key Takeaways box** — 3-5 bullet points summarising the post (appears in first 200 words for AI citation)
6. **Table of Contents** — Anchor jump links to all H2 sections (required on posts over 1,000 words)
7. **Body content** — Min 1,500 words for repair guides, min 800 words for troubleshooting
8. **Original workshop photos** — At least 1 per post, descriptive alt text including "ZA Support Hyde Park"
9. **FAQ section** — 3-6 questions as H3 headings, 40-60 word answers directly below (featured snippet format)
10. **Author box** — Photo + name + role + bio + social links + "View all articles" link (AuthorBox component)
11. **CTA block** — Assessment booking with phone 064 529 5863, WhatsApp, and /book link
12. **Related posts** — 3 internal links to related blog posts
13. **Outbound link** — At least 1 link to Apple Support (support.apple.com) or Google Search Central

## Blog Schema — Required on Every Post

Every post auto-generates via BlogSchema component:
- **BlogPosting** — headline, author (Person), datePublished, dateModified, publisher (Organization)
- **BreadcrumbList** — Home > Blog > Category > Post Title
- **FAQPage** — All FAQ Q&As
- **Person** — Author with sameAs (LinkedIn, TikTok, Twitter, Facebook, Instagram), knowsAbout, worksFor
- **Organization** — Publisher with AggregateRating (4.9/632 reviews)

Site-wide via SiteSchema in layout.tsx:
- **Organization + LocalBusiness** — Address, hours, phone, services, areaServed, sameAs, aggregateRating

## Authors

**Primary: Courtney Bentley** (slug: courtney-bentley)
- Role: Founder & Apple-Certified Technician
- Photo: /authors/courtney-bentley.webp
- Bio: Apple-certified technician since 2009. Over 25,000 Mac repairs. Specialises in component-level logic board repair, liquid damage recovery, enterprise fleet management. BSc Informatics (UNISA). Apple Developer Program member.
- LinkedIn: https://www.linkedin.com/in/bentleycourtney/
- TikTok: https://www.tiktok.com/@appleexpertza
- Twitter: https://x.com/za_support
- Facebook: https://www.facebook.com/appleexpertsouthafrica
- Instagram: https://www.instagram.com/appleexpertza/
- Author page: /author/courtney-bentley

**Secondary: Mary Blount** (slug: mary-blount)
- Role: Client Relations & Apple Support Specialist
- Photo: /authors/mary-blount.webp
- Author page: /author/mary-blount

NEVER use "admin", "ZA Support Team", or any anonymous byline.

## E-E-A-T Content Rules

**Experience** — Every post must include first-person workshop references: "In our Hyde Park workshop, we see..." plus specific repair counts, tool references (hot-air rework station, stereo microscope, ultrasonic cleaner), and South African context (load shedding, Rand pricing).

**Expertise** — Use correct Apple terminology (logic board not motherboard, trackpad not touchpad). Reference specific model identifiers. Link to Apple support documentation.

**Authoritativeness** — Reference "since 2009", "25,000+ repairs", Apple Developer Program membership, BEE Level 1 certification. Link to /author/courtney-bentley.

**Trustworthiness** — Display transparent pricing (assessment from R599). Include warranty terms (up to 3 years). Link to /editorial-policy. Surface Google Reviews (4.9 stars, 632 reviews) via schema.

## Content Velocity Limits

- **Maximum:** 2-3 posts per day at consistent times
- **Minimum:** 3 posts per week
- **NEVER** batch-publish more than 5 in a single day
- **NEVER** go more than 7 days without publishing
- Consistency beats volume — same cadence every week

## Pre-Flight Checks (Before Every Post)

1. Search existing posts at /blog for topic overlap — if >60% overlap, UPDATE existing post instead
2. Verify keyword has search volume via web search
3. Check SERP top 3 results for content gaps
4. Assign named author (courtney-bentley or mary-blount)

## Internal Linking

Every post must include:
- 3-5 links to other blog posts (not just service pages)
- 1-2 links to service pages
- 1 link to author page
- 1 outbound link to Apple Support or authoritative source
- Descriptive anchor text, never "click here"

## Monthly Content Audit (1st of every month)

1. Check all posts for outdated pricing, warranty terms, model references
2. Update dateModified on changed posts
3. Review cannibalisation — consolidate competing posts
4. Check broken links
5. Review GSC positions 5-20 for improvement opportunities
6. Add new FAQ questions from GSC query data
7. Add internal links from older posts to newer content

## Image Requirements

- Original workshop photos, not stock images
- Filename: `macbook-pro-swollen-battery-repair-za-support.webp`
- Alt text: Descriptive + location — "Swollen MacBook Pro battery at ZA Support Hyde Park workshop"
- Format: WebP, max 200KB, min 1200x800px featured images

## Component Locations

```
src/components/blog/AuthorBox.tsx          — Author byline (below every post)
src/components/blog/BlogSchema.tsx         — BlogPosting + BreadcrumbList + FAQPage JSON-LD
src/components/blog/BlogComponents.tsx     — Breadcrumbs, TableOfContents, LastUpdated, KeyTakeaways
src/components/SiteSchema.tsx              — Organization + LocalBusiness (layout.tsx)
src/app/author/[slug]/page.tsx             — Author pages with Person + ProfilePage schema
src/app/editorial-policy/page.tsx          — Editorial policy trust page
```

## Blog Content Never List

- Never publish without named author byline
- Never publish without BlogPosting schema
- Never publish without dateModified
- Never batch-publish more than 5 posts in one day
- Never duplicate an existing post's primary keyword (update instead)
- Never use stock images when workshop photos exist
- Never omit FAQ, Key Takeaways, or Table of Contents
- Never use USD, HIPAA, US regulations, Benoni address, or MM/DD/YYYY dates
- Never use iFixit images in published content (copyright — internal use only)
- Never use "enterprise-grade", "best-in-class", "cutting-edge", "game-changer", "revolutionary", "world-class"
