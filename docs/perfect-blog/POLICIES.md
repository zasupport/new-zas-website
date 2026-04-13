# Perfect Blog Creator — Policies & Decisions

**Version:** 2.0
**Last updated:** 13 April 2026
**Status:** Active — these policies govern all blog operations for zasupport.com

This document captures every binding policy decision made during the project. Each policy includes the original directive, the rationale, the trade-offs that were flagged, and the implementation that followed.

---

## POLICY 1 — Content velocity: 8 posts per day

**Date set:** 13 April 2026
**Set by:** Courtney Bentley (founder)
**Supersedes:** Prior recommendation of 2-3 posts/day

### Directive
"Ensure the blog number remains at 8 per day. Do not stop creating content."

### Rationale
Business growth target requires high content output. The 2-3/day recommendation came from velocity research that assumed standard E-E-A-T infrastructure. Now that we have author bylines, schema, leak protection, learning loop, and GSC scheduling, the protective systems compensate for the higher cadence.

### Trade-offs flagged
- 8/day is roughly 2-3x what velocity research suggests is safe for a 100-page site
- The 21 March 2026 burst (20 posts in one day) coincided with the Google March 2026 spam update — pattern breaks are dangerous
- 8 posts × 365 days = 2,920 unique posts/year; current site has only ~40 unique topics, requiring keyword universe expansion within 60 days

### Conditions for this policy to remain safe
1. Pre-publish auto-fixer must be running in Sanity
2. Daily leak scanner must be running on cron
3. Learning loop must be running daily after the scanner
4. GSC scheduler must distribute the 8 posts evenly across the day (no clustering)
5. Every post must pass quality bar: named author, original photo, full schema, unique keyword

### Failure modes
- 8 posts in 2 hours = burst pattern = spam classifier risk
- Skipping a day after publishing 8 = inconsistency = ranking drop
- Publishing 8 near-duplicates = cannibalisation = self-inflicted ranking damage

### Implementation
- `SKILL.md` Section 6 (CONTENT VELOCITY RULES) — mandatory cadence rules
- `scripts/gsc-traffic-analyser.js` — selects 8 optimal hours weekly
- `scripts/schedule-sanity-posts.js` — enforces 2-hour minimum spacing
- `CONTEXT.md` Section 9 — full policy text for fresh sessions

---

## POLICY 2 — Never block content creation

**Date set:** 13 April 2026
**Set by:** Courtney Bentley
**Supersedes:** The original blocking validator (Sanity Rule.required)

### Directive
"Do not stop creating content. Ensure that instead of blocking content or asking for manual approval rather learn from the previous mistakes and update your auto writing skills to ensure that the mistakes are not repeated again."

### Rationale
Manual approval queues create bottlenecks. Bottlenecks create anxiety. Anxiety creates workarounds. The fastest path to consistent quality at high velocity is a system that fixes problems silently and learns from them.

### Trade-offs flagged
- Auto-fixed content is published before a human has reviewed the fix
- Aggressive sentence-stripping can occasionally remove valid context if a banned pattern overlaps with real content
- Roll-back via Sanity revision history is the only recourse for incorrect fixes

### Implementation
- `sanity/leak-auto-fixer.ts` — replaces the blocking `leak-validator.ts`
- `sanity/blogPost.schema.ts` — uses `Rule.custom().warning()` instead of error
- `skills/blog-leak-scanner/SKILL.md` — pre-publish flow updated to "transparent fix"
- `skills/blog-page-wording-repair/SKILL.md` — never blocks, always proceeds

### What replaced blocking
1. **Auto-fix on save** in Sanity (silent, immediate)
2. **Daily cron scan** of live pages (catches anything that slipped through)
3. **Auto-repair from queue** (rewrites and republishes)
4. **Email notification AFTER fix** (Courtney sees what happened, not what to approve)
5. **Roll-back path** via Sanity revision history if needed

---

## POLICY 3 — Learn from every mistake

**Date set:** 13 April 2026
**Set by:** Courtney Bentley
**Pairs with:** Policy 2

### Directive
"Learn from the previous mistakes and update your auto writing skills to ensure that the mistakes are not repeated again."

### Rationale
A static banned-pattern list ages poorly. New AI generations introduce new failure modes. Without learning, the registry needs manual updates. With learning, every detection becomes a permanent prevention — the system is permanently smarter than it was yesterday.

### How it works
1. Daily scanner detects a leak (e.g., `INSIGHT 1:`)
2. Daily learning loop reads the scan report
3. Generaliser converts `INSIGHT 1:` → `^\s*INSIGHT(\s+\d+)?\s*:` (catches all variants)
4. Pattern added to `config/learned-patterns.json` permanently
5. Next scan automatically catches `INSIGHT 5:`, `INSIGHT 12:`, `INSIGHT:`, etc.

### Generaliser pattern types
| Detected text | Generalised pattern | Type |
|---|---|---|
| `INSIGHT 1:` | `^\s*INSIGHT(\s+\d+)?\s*:` | caps_label_optional_number |
| `[CHECK] schema valid` | `\[\s*CHECK\s*\]` | bracket_marker |
| `Note to self:` | `^\s*Note to self\s*:` | title_case_label |
| `Score: 8/10` | `\b(score\|rating\|grade)\s*:?\s*\d+\s*[/out]+\s*\d+` | score_value |

### Implementation
- `scripts/learning-loop.js` — runs daily at 03:00 SAST after the scanner
- `config/banned-content-patterns.js` — auto-loads learned patterns alongside static tiers
- `config/learned-patterns.json` — managed by the learning loop, never edit by hand
- `reports/learning-log.json` — audit trail of every pattern learned, with examples and source

### Verification
End-to-end tested 13 April 2026:
- Scanner caught `INSIGHT 1:` → learning loop added pattern → next scan caught `INSIGHT 5:` (different number, same structure) ✓

---

## POLICY 4 — Hide everything possible without breaking SEO

**Date set:** 13 April 2026
**Set by:** Courtney Bentley
**Original directive:** "Obfuscate all the scripts, code, image metadata, all text, frontend, backend"

### Refined interpretation (after SEO trade-off discussion)
"Hide as much as possible without impacting any SEO scores or progress."

### What MUST stay readable (mandatory for Google)
- All HTML content (Google needs to crawl it)
- All JSON-LD schema markup (Google needs to parse it for rich results)
- All meta tags (title, description, OG, Twitter)
- All image alt text (accessibility AND SEO)
- sitemap.xml and robots.txt
- Internal link structure

### What IS hidden (none of which hurts SEO)
- Source maps in production builds (no `.map` files exposed)
- `X-Powered-By: Next.js` header (framework fingerprint)
- Build IDs (randomised per build)
- HTML comments stripped from production output
- `console.log` calls (kept `console.error` for debugging)
- React DevTools properties
- Webpack devtool source mapping
- Image EXIF/IPTC/XMP metadata (GPS, camera serials, timestamps)
- Camera fingerprints in image filenames (Next.js `/_next/image` hashes paths)

### Security headers added
- `X-Frame-Options: SAMEORIGIN`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=(), geolocation=(), interest-cohort=()`
- `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`
- `Content-Security-Policy` (locked down but allows inline JSON-LD)

### Implementation
- `config/next.config.hardening.js` — full production hardening config
- `scripts/strip-image-exif.js` — sharp-based EXIF stripper
- `sanity/uploadHook.ts` — Sanity asset upload integration

### What this does NOT prevent
- Anyone with browser DevTools can read the rendered DOM (this is unavoidable)
- Anyone can right-click and view source (the HTML is meant to be readable for Google)
- Anyone can scrape published content (this is what content is for)

The point of the hardening is to prevent **fingerprinting and IP leakage**, not to make the site invisible.

---

## POLICY 5 — Detection action: auto-fix AND notify

**Date set:** 13 April 2026
**Set by:** Courtney Bentley
**Question asked:** "What should the scanner do when it finds a leaked label on a published page?"
**Answer:** "Both auto-fix AND notify (best of both)"

### Implementation
1. Scanner finds critical leak on live page
2. Scanner queues URL in `reports/repair-queue.json`
3. Scanner sends email via MS Graph to admin@zasupport.com with:
   - URL affected
   - Findings list (category, match, context)
   - Auto-fix status: "Queued"
4. Repair skill processes queue, rewrites affected blocks, republishes
5. Repair sends second email with:
   - URL fixed
   - Before/after diff
   - Roll-back instructions

### Notifications go to
- admin@zasupport.com (reaches both Courtney and Mary)
- Sent via MS Graph API using `MS_GRAPH_REFRESH_TOKEN`
- Currently blocked: refresh token is in `~/.za-keys-pending.env`, not active shell environment

---

## POLICY 6 — Where leak detection runs: pre-publish + daily cron

**Date set:** 13 April 2026
**Set by:** Courtney Bentley
**Question asked:** "Where should this scanner run?"
**Answer:** "Both — pre-publish blocks bad content + daily scan catches anything that slipped through"

### Note on terminology
The original answer said "pre-publish blocks bad content," but Policy 2 (Never block) was set in the same session. The implementation reconciles these by making pre-publish a **transparent fix** rather than a block — content always saves, leaks just get stripped first.

### Two-layer protection
1. **Layer 1 — Pre-publish auto-fix** (Sanity hook)
   - Runs on every save in Sanity Studio
   - Strips banned patterns from title, description, alt text, content blocks, FAQs
   - Never blocks — save always proceeds
   - Editor sees a warning (not error) listing what was fixed

2. **Layer 2 — Daily cron scan** (production-side)
   - Runs at 02:00 SAST every day
   - Fetches sitemap, scans every blog URL
   - Catches anything that bypassed Layer 1 (e.g., direct API edits, schema changes after publish)
   - Queues critical findings for repair, sends notifications

### Implementation
- `sanity/leak-auto-fixer.ts` — Layer 1
- `scripts/scan-blog-leaks.js` — Layer 2
- Both share `config/banned-content-patterns.js` as the single source of truth

---

## POLICY 7 — GSC-driven scheduling

**Date set:** 13 April 2026
**Set by:** Courtney Bentley
**Question asked:** "How should the 8 posts/day be distributed?"
**Answer:** "Let the system decide: schedule based on Google Search Console traffic patterns to publish when the site gets the most crawl activity"

### How the schedule is built
1. `gsc-traffic-analyser.js` fetches Search Analytics for the past 28 days
2. Builds a 24-hour heatmap weighted: clicks × 0.5 + impressions × 0.3 + crawls × 0.2
3. Selects top 8 hours by score
4. Enforces minimum 2-hour spacing (no burst patterns)
5. Writes `config/publish-schedule.json`

### Refresh cadence
- Weekly, Sunday 23:00 SAST
- Pipeline self-tunes to traffic patterns over time
- Schedule expires after 7 days; expired schedule triggers refresh warning

### Constraints
- Always exactly 8 hours per day
- Never two slots within 2 hours of each other
- Distributed across the full 24-hour cycle (not clustered in business hours)

### Fallback
If GSC credentials unavailable:
- Mock data based on a typical SA business-hours traffic curve
- Schedule still produces, just less optimised
- Pipeline keeps working

---

## POLICY 8 — Audit before building (Rule 0.1)

**Date set:** 13 April 2026
**Set by:** Courtney Bentley

### Directive
"Add into the .md file to first check how much of the .md are already developed and implemented to not duplicate work."

### Rule
Before creating any file, component, schema, page, or content piece:
1. Check if it already exists (repo, CMS, live site, prior packages)
2. Compare existing vs proposed
3. Map done vs outstanding before starting
4. Never overwrite without reading the existing file in full

### Implementation
- `CONTEXT.md` Section 0 — full rule text
- `SKILL.md` Section 1.0 — same rules at the skill level
- Output a status table at the start of every session

---

## POLICY 9 — Read existing content carefully (Rule 0.2)

### Directive
"Research the content of the new files and existing files carefully."

### Rule
Before modifying any file:
1. Read the existing file end to end
2. Read the new spec end to end
3. Identify diffs explicitly: addition, correction, regression, stylistic
4. Preserve anything not contradicted by the new spec
5. CLAUDE.md files always appended, never overwritten

---

## POLICY 10 — Newer AND proven (Rule 0.3)

### Directive
"Only update content if it is newer and it contains previous instructions that have been proven to work."

### Rule
A new version replaces an existing version only if BOTH:
1. **Newer** — reflects more recent information
2. **Proven** — verified by Courtney, documented in trusted source, or running in production

If newer but unproven, mark as `// EXPERIMENTAL` and ask before deploying. If proven but older, do not regress.

---

## POLICY 11 — Ask when unsure (Rule 0.4)

### Directive
"If unsure on anything ask me."

### Rule
When ambiguity arises:
1. Ask Courtney directly
2. State the specific question and the options
3. Use numbered options with a clear default
4. Keep the question scannable and short

---

## POLICY 12 — Never sit idle (Rule 0.5)

### Directive
"Do not stop building/processing other tasks if you need to ask me."

### Rule
Asking a question is non-blocking:
1. Continue every task that doesn't depend on the answer
2. Park blocked tasks with `// BLOCKED:` markers
3. Resume immediately when answer arrives
4. Batch multiple questions at natural breakpoints

---

## POLICY 13 — Never expose internal authoring labels (Rule 0.4.5)

**Date set:** 13 April 2026
**Trigger:** Live blog page found rendering `LEARNED:`, `BETTER:`, `WHY SUCCESS:`, `REPLICATE:` as visible content

### Rule
Internal evaluation labels, prompt scaffolding, meta-commentary, and authoring metadata must NEVER appear in rendered blog content. This includes:
- `LEARNED:`, `BETTER:`, `WHY SUCCESS:`, `REPLICATE:`, `SCORE:`, `RUBRIC:`
- `EVALUATION:`, `OBSERVATION:`, `KEY INSIGHT:`, `[x] E-E-A-T signals`
- `As an AI`, `I am Claude`, `<system>`, `<user>` tags
- `{{variable}}`, `[INSERT NAME]`, `Lorem ipsum`, `TODO:`, `FIXME:`

### Why this matters
These labels expose ZA Support's proprietary content development workflow. A competitor reading them can reverse-engineer the entire content evaluation framework.

### Implementation
- `config/banned-content-patterns.js` — 7 tiers of patterns
- `sanity/leak-auto-fixer.ts` — strips on save
- `scripts/scan-blog-leaks.js` — catches on production
- `scripts/learning-loop.js` — generalises new variants permanently

---

## POLICY 14 — Keep web pages visually presentable always

**Date set:** 13 April 2026
**Set by:** Courtney Bentley

### Directive
"Continue to present a webpage in its current easy to understand format with perfect colours. Ensure that underlying code never surfaces should the page not generate properly."

### Rule
Every blog page must render correctly with full styling, even in failure modes. Underlying code, internal labels, or raw data must never become visible to readers.

### Implementation
- Production hardening strips comments, source maps, framework headers
- Auto-fixer strips internal labels before they reach the rendered page
- Daily scanner catches anything that slipped through
- Learning loop ensures the same failure mode can't recur

---

## POLICY SUMMARY TABLE

| # | Policy | Implementation file |
|---|---|---|
| 1 | 8 posts/day | `SKILL.md`, `scripts/gsc-traffic-analyser.js` |
| 2 | Never block content | `sanity/leak-auto-fixer.ts` |
| 3 | Learn from mistakes | `scripts/learning-loop.js` |
| 4 | Hide everything possible (preserve SEO) | `config/next.config.hardening.js` |
| 5 | Auto-fix AND notify | `scripts/notify-leak-detected.js` |
| 6 | Pre-publish + daily cron | Both `sanity/` and `scripts/` |
| 7 | GSC-driven scheduling | `scripts/gsc-traffic-analyser.js` |
| 8 | Audit before building | `CONTEXT.md` Rule 0.1 |
| 9 | Read existing carefully | `CONTEXT.md` Rule 0.2 |
| 10 | Newer AND proven | `CONTEXT.md` Rule 0.3 |
| 11 | Ask when unsure | `CONTEXT.md` Rule 0.4 |
| 12 | Never sit idle | `CONTEXT.md` Rule 0.5 |
| 13 | Never expose internal labels | `CONTEXT.md` Rule 0.4.5 |
| 14 | Pages always presentable | Production hardening + auto-fixer |

---

*Perfect Blog Creator — Policies & Decisions v2.0*
*ZA Support | zasupport.com | courtney@zasupport.com*
*Last updated: 13 April 2026*
