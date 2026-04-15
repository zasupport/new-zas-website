# ZA Support — Perfect Blog Creator System Injection
**Version:** 2.0 final | **Date:** 13 April 2026 | **Files:** 42 | **Owner:** Courtney Bentley

---

## HOW TO USE THIS FILE

This is the master injection file. Drop it into any new Claude Code session or paste it into a fresh claude.ai web chat to bootstrap the entire Perfect Blog Creator system in one go. After this file is loaded, Claude has full context on:

- Every policy decision and the rationale behind it
- The complete architecture of the leak protection, learning loop, and GSC scheduling systems
- All 42 files in the package and where they live
- All standing preferences (language, currency, dates, tone, medical framework)
- The original incident that triggered the system
- All pending items and what to do next

For Claude Code: `cat INJECT.md` and the system is loaded.
For claude.ai web chat: paste this file into the conversation as the first message.
For the master skill: drop into `/mnt/skills/user/perfect-blog-creator/SKILL.md`.

---

## SECTION A — IMMEDIATE OPERATING RULES

These rules govern every action Claude takes from the moment this file is loaded.

### Rule 0.1 — Audit before building
Before creating any file, component, schema, page, or content piece:
1. Check what already exists (repo, CMS, live site, prior packages)
2. Compare existing vs proposed
3. Map done vs outstanding before starting
4. Never overwrite without reading the existing file in full

### Rule 0.2 — Read existing content carefully
Before modifying any file:
1. Read end to end
2. Identify diffs explicitly: addition / correction / regression / stylistic
3. Preserve anything not contradicted by new spec
4. CLAUDE.md files always appended, never overwritten

### Rule 0.3 — Newer AND proven
Replace existing only if BOTH:
1. Newer (more recent information)
2. Proven (verified by Courtney, documented in trusted source, or running in production)
Mark unverified-but-newer as `// EXPERIMENTAL` and ask before deploying.

### Rule 0.4 — Ask when unsure
Numbered options, clear default, scannable format. Never guess.

### Rule 0.4.5 — Never expose internal authoring labels
Internal evaluation labels (LEARNED:, BETTER:, WHY SUCCESS:, REPLICATE:, SCORE:, RUBRIC:, EVALUATION:, OBSERVATION:, KEY INSIGHT:, [x] E-E-A-T) must NEVER appear in rendered blog content. The auto-fixer strips them on save; the daily scanner catches anything that slipped through.

### Rule 0.5 — Never sit idle
Asking is non-blocking. Continue every task that doesn't depend on the answer. Park blocked tasks with `// BLOCKED:` markers. Batch multiple questions at natural breakpoints.

---

## SECTION B — THE THREE PRINCIPLES

The Perfect Blog Creator system runs on three principles:

### 1. Never block content creation
Auto-fix mistakes silently. Never ask for approval. The Sanity validator was replaced with a transformer (`sanity/leak-auto-fixer.ts`) that strips banned patterns transparently. Manual approval queues kill velocity, and at 8 posts/day there's no time for human review of every leak.

### 2. Learn from every mistake
Every detected leak becomes a permanent prevention pattern. The `learning-loop.js` script runs daily after the scanner, generalises detected matches into structural regex patterns, and writes them to `config/learned-patterns.json`. Verified end-to-end: after learning `INSIGHT 1:`, the system automatically catches `INSIGHT 5:`, `INSIGHT 12:`, etc.

### 3. Hide what can be hidden
Strip source maps, EXIF metadata, framework fingerprints, console logs, HTML comments, build IDs. **Preserve** all schema markup, HTML content, alt text, and meta tags — Google needs these. The hardening (`config/next.config.hardening.js`) protects IP without hurting SEO.

---

## SECTION C — BUSINESS CONTEXT

### Identity
- **Legal entity:** Vizibiliti Intelligent Solutions (Pty) Ltd
- **Trading names:** ZA Support, Apple Experts, Mac Apple Experts, IT Specialist, Medical IT Specialist
- **Founded:** 2009 (17 years operating)
- **Address:** 1 Hyde Lane, Second Floor, Office E2004, Hyde Park, Johannesburg, 2196
- **Phone:** 064 529 5863 (also WhatsApp)
- **Email:** admin@zasupport.com (reaches Courtney + Mary), courtney@zasupport.com
- **Hours:** Mon–Fri 08:00–17:30, closed Sat/Sun
- **BEE:** Level 1
- **Apple status:** Authorised Apple Reseller, Apple Developer Program member
- **Google reviews:** 4.9 stars from 632 reviews

### People
- **Courtney Bentley** (founder, primary author): Apple-certified technician, BSc Informatics from UNISA, 25,000+ Mac repairs overseen, Director of Vizibiliti Intelligent Solutions (Pty) Ltd
- **Mary Blount** (secondary author): Client Relations & Apple Support Specialist
- **Qaasim** (external designer): handles ALL visual/branding work — vehicle branding, graphics, layouts, posters, marketing visuals, logos, signage. **Always ask before designing in chat — at start of any design task and after ~7 prompts of iteration.**

### Vertical specialisations
- **Investec banking clients** (Apple security for banking)
- **Medical professionals** (POPIA compliance, surgeons, specialists)
- **SME/enterprise** (JAMF deployment, Apple Business Manager, MDM)

### Social media
- Facebook: https://www.facebook.com/appleexpertsouthafrica
- Instagram: https://www.instagram.com/appleexpertza/
- Twitter/X: https://x.com/za_support
- TikTok: https://www.tiktok.com/@appleexpertza
- YouTube: https://www.youtube.com/@zasupport-applemacupgrader6746

### Tech stack
- **Website:** Next.js 15 (App Router), Tailwind CSS v4, Sanity CMS
- **Hosting:** Vercel + Cloudflare
- **WordPress legacy:** zasupport.com/wp-admin (UN: admin)
- **Email:** Microsoft 365 / MS Graph API
- **Default development stack:** PostgreSQL + TimescaleDB | FastAPI or Node.js | React/Next.js | Redis
- **Schema naming:** `client_id`, `device_id`, `metric_id`, `assessment_id`, `job_id`, `quote_id`
- **Time-series:** 5-min collection, 15-min aggregation
- **Data retention:** 90 days detailed, 2 years aggregated, permanent for client/device/compliance records

---

## SECTION D — STANDING PREFERENCES (NEVER VIOLATE)

### Localisation
- **Spelling:** South African English (organisation, optimisation, colour, programme)
- **Currency:** ZAR only (R 4,499 format with space and comma)
- **Dates:** DD/MM/YYYY (never MM/DD/YYYY)
- **Address:** Hyde Park (NEVER Benoni)
- **Paper:** A4 (never Letter)
- **Filenames:** spaces/words, never underscores or hyphens in deliverable filenames

### Banned tone words
NEVER use: enterprise-grade, best-in-class, cutting-edge, game-changer, revolutionary, world-class, robust infrastructure, synergy, leverage (as verb), unlock the power, in today's fast-paced world, seamless, elevate (as marketing fluff)

### Legal language
- **Acceptable:** "will be opposed" / "costs will be addressed" / "raised at the appropriate juncture" / "we reserve our rights" / "without prejudice"
- **Forbidden:** "we will take legal action" / "we will take you to court" / "we will institute proceedings" / "we will sue" / direct threats / admitting liability / framing payments as "debt"
- **Never discuss legal matters telephonically** — written communication only

### Communications
- No ALL CAPS section headings in emails or WhatsApp
- No `---` dividers in emails or WhatsApp (use paragraph breaks or short subheadings)
- No .txt files for email/WhatsApp output (rich HTML for email, native formatting for WhatsApp)

### Jurisdiction
- POPIA, never HIPAA (medical content)
- Maximum POPIA penalty: R 10 million (use as cost-avoidance framing)
- South African or EU regulations only
- Never reference US healthcare terminology

### Image rights
- iFixit images: internal reference only, NEVER in published content
- Stock images: never use when workshop photos exist
- EXIF/IPTC/XMP metadata: stripped on upload via `scripts/strip-image-exif.js`

---

## SECTION E — THE 14 POLICIES

| # | Policy | Source |
|---|---|---|
| 1 | 8 posts/day target velocity | Courtney directive 13/04/2026 |
| 2 | Never block content creation | Courtney directive 13/04/2026 |
| 3 | Learn from every mistake | Courtney directive 13/04/2026 |
| 4 | Hide everything possible (preserve SEO) | Courtney directive 13/04/2026 |
| 5 | Auto-fix AND notify on detection | Courtney answered 13/04/2026 |
| 6 | Pre-publish + daily cron coverage | Courtney answered 13/04/2026 |
| 7 | GSC-driven scheduling | Courtney answered 13/04/2026 |
| 8 | Audit before building (Rule 0.1) | Courtney directive 12/04/2026 |
| 9 | Read existing content carefully (Rule 0.2) | Courtney directive 12/04/2026 |
| 10 | Newer AND proven (Rule 0.3) | Courtney directive 12/04/2026 |
| 11 | Ask when unsure (Rule 0.4) | Courtney directive 12/04/2026 |
| 12 | Never sit idle (Rule 0.5) | Courtney directive 12/04/2026 |
| 13 | Never expose internal labels (Rule 0.4.5) | Live leak incident 13/04/2026 |
| 14 | Pages always presentable (no code surfacing) | Courtney directive 13/04/2026 |

Full text and rationale for every policy lives in `docs/POLICIES.md`.

---

## SECTION F — THE LEAK INCIDENT (THE WHY)

On 13 April 2026, a live blog page at zasupport.com was found rendering this text as visible body content:

> [x] E-E-A-T signals: "In our Hyde Park workshop", specific component names (Thermal Grizzly Kryonaut, 52.6Wh battery), exact procedures, genuine opinion ("60–70% of cases"), no hype ✓
>
> **LEARNED:** M3 Air thermal architecture requires non-generic approach; geographic context (load shedding, ambient temperature patterns by suburb) improves authenticity and relevance. Schema validation matters more than "should work" promises.
>
> **BETTER:** Integrated real-world Johannesburg environmental factors (load shedding, heat stress) rather than generic repair guidance. This differentiates from national competitors.
>
> **WHY SUCCESS:** Grounded in actual workshop patterns, specific model thermal design, compliance with all hard rules (§225, §226), and verification before output.
>
> **REPLICATE:** Always anchor technical content to specific geographic environment, integrate verified service area limits early, include real warranty terms and pricing, validate JSON-LD syntax.

This is internal Claude evaluation scaffolding — meta-commentary about how to write content, not content itself. It should never have been written into Sanity CMS as actual body text. A competitor reading it could reverse-engineer the entire content evaluation framework.

The system would have repaired it to:

> M3 MacBook Air thermal management is unlike any previous Apple Silicon design. The fanless chassis means the entire aluminium body acts as the heatsink, and Johannesburg's load shedding cycles create thermal stress patterns we don't see in Cape Town or Durban units. In our Hyde Park workshop, we apply Thermal Grizzly Kryonaut to the SoC during repaste work — it's the only compound we've tested that holds up under our local ambient temperature swings without pump-out after 18 months. The 52.6Wh battery in the M3 Air is sensitive to these thermal cycles too, which is why we always check both together rather than treating them as separate repairs.

The factual claims survive. The internal scaffolding is gone. The voice matches the rest of the site.

---

## SECTION G — ARCHITECTURE AT A GLANCE

```
AUTHOR DRAFTS POST
   ↓
SANITY AUTO-FIXER HOOK (sanity/leak-auto-fixer.ts)
   Strips banned patterns silently. Never blocks.
   ↓
AUTHOR FLIPS "Ready to publish" TOGGLE
   ↓
HOURLY CRON: schedule-sanity-posts.js
   Reads config/publish-schedule.json (8 GSC-optimal hours)
   Assigns ready drafts to next slot. Sets publishAt (UTC).
   ↓
SANITY SCHEDULED PUBLISHING PLUGIN
   Publishes at the exact moment.
   ↓
VERCEL REBUILD
   Production hardening: source maps off, x-powered-by stripped, 
   console removed, EXIF stripped, CSP headers locked down.
   ↓
POST GOES LIVE
   ↓
DAILY 02:00 SAST: scan-blog-leaks.js
   Fetches sitemap, scans every URL, queues critical leaks.
   Sends email via MS Graph.
   ↓
blog-page-wording-repair SKILL
   Rewrites affected blocks. Republishes via Sanity.
   ↓
DAILY 03:00 SAST: learning-loop.js
   Generalises detected matches into permanent patterns.
   Writes to config/learned-patterns.json.
   ↓
WEEKLY SUNDAY 23:00 SAST: gsc-traffic-analyser.js
   Refreshes the 8 publish hours based on GSC traffic data.
```

Full architecture diagram with component map, data flow, environment variables, and file system layout: see `docs/ARCHITECTURE.md`.

---

## SECTION H — THE 42 FILES

### Documentation (12)
- `INJECT.md` — this file (master injection for new sessions)
- `README.md` — package overview and quick start
- `CONTEXT.md` — full project context (640 lines)
- `SKILL.md` — Perfect Blog Creator master skill (drop into /mnt/skills/user/)
- `CLAUDE-BLOG-APPEND.md` — v2.0 CLAUDE.md append rules
- `docs/ARCHITECTURE.md` — system architecture diagram and component map
- `docs/POLICIES.md` — every policy decision with rationale (14 policies)
- `docs/PREFERENCES.md` — global standing preferences
- `docs/LEARNING-LOOP.md` — how the self-improving pipeline works
- `docs/DEPLOYMENT.md` — 16-stage deployment runbook
- `skills/blog-leak-scanner/SKILL.md` — leak detection sub-skill
- `skills/blog-page-wording-repair/SKILL.md` — auto-repair sub-skill

### Scripts (8)
- `scripts/scan-blog-leaks.js` — daily cron leak scanner
- `scripts/strip-image-exif.js` — sharp-based EXIF metadata stripper
- `scripts/notify-leak-detected.js` — MS Graph email notifier
- `scripts/learning-loop.js` — daily pattern generaliser (verified working)
- `scripts/gsc-traffic-analyser.js` — weekly GSC heatmap builder
- `scripts/schedule-sanity-posts.js` — hourly draft-to-slot scheduler
- `scripts/install-cron-jobs.sh` — one-command cron installer (4 jobs)
- `scripts/bootstrap-ms-graph.sh` — one-command MS Graph activator

### Configuration (3)
- `config/banned-content-patterns.js` — 7-tier registry + auto-loaded learned patterns
- `config/next.config.hardening.js` — production hardening (no source maps, CSP, console strip)
- `config/next.config.redirects.js` — water damage 301 redirects (14 → 5)

### Sanity CMS (4)
- `sanity/leak-auto-fixer.ts` — ACTIVE pre-publish transformer (never blocks)
- `sanity/leak-validator.ts` — DEPRECATED original blocking validator
- `sanity/blogPost.schema.ts` — full schema with auto-fixer + scheduling fields wired in
- `sanity/uploadHook.ts` — image upload EXIF interceptor

### React/TypeScript components (5)
- `components/AuthorBox.tsx`
- `components/BlogSchema.tsx`
- `components/HowToSchema.tsx`
- `components/SiteSchema.tsx` (Organization + LocalBusiness, 4.9★/632 AggregateRating)
- `components/BlogComponents.tsx` (Breadcrumbs, ToC, LastUpdated, KeyTakeaways)

### Page templates (3)
- `pages/BlogPostTemplate.tsx`
- `pages/AuthorPage.tsx` (Person + ProfilePage schema)
- `pages/EditorialPolicy.tsx` (trust signal page)

### Assets (7)
- `assets/courtney-bentley-author.png` (B&W professional headshot)
- `assets/mary-blount-portrait.png`
- `assets/mary-blount-safety-goggles-workshop.png` (strongest E-E-A-T photo)
- `assets/mary-blount-macbook-desk.png`
- `assets/za-support-team-imac-workshop.png`
- `assets/za-support-workshop-mac-repair.png`
- `assets/za-support-team-rooftop.png`

### Installer (1)
- `setup.sh` — zero-touch installer for the entire package

---

## SECTION I — DEPLOYMENT IN 5 COMMANDS

```bash
# 1. Extract the package into your zasupport-website project
unzip perfect-blog.zip -d /path/to/zasupport-website/

# 2. Run the zero-touch installer
cd /path/to/zasupport-website
bash perfect-blog/setup.sh

# 3. Activate MS Graph email notifications
bash perfect-blog/scripts/bootstrap-ms-graph.sh

# 4. Install all 4 cron jobs (with credential auto-loading)
bash perfect-blog/scripts/install-cron-jobs.sh

# 5. Generate the first GSC-driven publish schedule
node perfect-blog/scripts/gsc-traffic-analyser.js --refresh-schedule
```

After these 5 commands, the entire system is live. The first blog post can be published immediately. The leak scanner will run tonight at 02:00 SAST. The learning loop runs at 03:00. The GSC schedule will refresh next Sunday at 23:00.

Full 16-stage manual deployment for environments that can't use the installer: `docs/DEPLOYMENT.md`.

---

## SECTION J — ENVIRONMENT VARIABLES NEEDED

### Sanity CMS
```bash
SANITY_PROJECT_ID="..."           # from sanity.io/manage
SANITY_DATASET="production"       # default
SANITY_WRITE_TOKEN="..."          # generated at sanity.io/manage/project/[id]/api
```

### Google Search Console
```bash
GSC_SERVICE_ACCOUNT_PATH="$HOME/.za-keys/gsc-service-account.json"
# Service account email must be added as user in GSC property
```

### MS Graph (email notifications)
```bash
MS_GRAPH_TENANT_ID="..."
MS_GRAPH_CLIENT_ID="..."
MS_GRAPH_CLIENT_SECRET="..."
MS_GRAPH_REFRESH_TOKEN="..."   # currently in ~/.za-keys-pending.env
```

The bootstrap script handles MS Graph automatically. GSC and Sanity require manual credential generation (one-time setup, see `docs/DEPLOYMENT.md` Stages 14 and 15).

### Optional
```bash
CLOUDFLARE_API_TOKEN="..."     # enables real crawl stats; otherwise default pattern
```

---

## SECTION K — CRON SCHEDULE

| Schedule (UTC) | Schedule (SAST) | Job | Purpose |
|---|---|---|---|
| `5 * * * *` | Hourly :05 | `schedule-sanity-posts.js` | Assigns ready drafts to next slot |
| `0 0 * * *` | Daily 02:00 | `scan-blog-leaks.js` | Detects leaks on live pages |
| `0 1 * * *` | Daily 03:00 | `learning-loop.js` | Turns detections into permanent patterns |
| `0 21 * * 0` | Sunday 23:00 | `gsc-traffic-analyser.js --refresh-schedule` | Refreshes optimal hours |

All entries source `~/.za-keys/active.env` before running. Tagged with `# ZA-SUPPORT-BLOG` for safe removal: `crontab -l | grep -v ZA-SUPPORT-BLOG | crontab -`.

Logs written to `logs/` — one file per job.

---

## SECTION L — MEDICAL CLIENT FRAMEWORK

For medical client proposals (Dr Shoul, surgeons, specialists), use this risk category framework:

| Category | Critical state | Low state (target) |
|---|---|---|
| **Network Security** | WPA/weak password, no firewall | WPA3-Enterprise, enterprise firewall, full segmentation |
| **Email Security** | Basic ISP email, no MFA | Enterprise gateway, auto-encrypt, ATP |
| **Data & Backup** | No backup or unverified | Dual backup, monthly tested, immutable cloud, <4hr RTO |
| **Access Control** | Shared passwords, no MFA | Individual logins, MFA, access logging |
| **Device Security** | No AV, no encryption, no lock | Enterprise AV, encryption, MDM, cable locks |
| **Physical Security** | Open access, devices visible to patients | Access logs, privacy screens, cable locks, secure disposal |
| **Monitoring & Response** | No monitoring, no plans | 24/7 SOC, tested plans, <15min response |

### Package pricing
- 1 doctor → R 4,499/month
- 2 doctors → R 5,499/month
- 3+ doctors → R 5,999/month
- Children/family devices → add Family Extension +R 599/month

### Sample report requirement
Every client-facing service proposal must include an appendix sample report with:
1. Incident-level examples (what happened, action taken, outcome)
2. Integration with other ZA Support services (framed as benefit, not dependency)
3. Cost avoided per incident (with POPIA penalty context: up to R 10M)
4. Summary statistics
5. Compliance score (medical) or network health score (consumer)
6. For consumer reports: Child Safety Intelligence section (trending apps, bypass techniques, screen time)

Full framework: `docs/PREFERENCES.md` Section 6.

---

## SECTION M — RELATED INTERNAL PROJECTS (OUT OF SCOPE)

These exist in parallel and share infrastructure but are NOT part of the Perfect Blog Creator package:

- **Workshop media pipeline** — iPhone photo sync via iCloud Drive to docs/seo
- **Email token auto-fix** — silent system, recurring nightly task at 7pm SAST to fix MS_GRAPH_REFRESH_TOKEN
- **iOS Shortcut** — built via Python plistlib for workshop automation
- **Pricing Manager** — Excel spreadsheet with auto-generating website copy formulas
- **Quoting cheat sheet** — for Courtney and Mary's desk use
- **Pricing spreadsheet** — covers 15 service categories (some prices pending Mary's verification)
- **Health Check / Workshop PKG** — internal Claude Code projects

The blog package can interoperate with these but they are managed separately.

---

## SECTION N — PENDING ITEMS

These remain to be done after the package is deployed (none block deployment):

| # | Item | Difficulty | Impact | Status |
|---|---|---|---|---|
| 1 | MS Graph refresh token activation | Easy | High | ✓ Code shipped (`bootstrap-ms-graph.sh`); needs run against real keys |
| 2 | GSC service account JSON key | Easy (one-time GCP setup) | High | Manual: `docs/DEPLOYMENT.md` Stage 14 |
| 3 | Sanity write token | Easy (one-time Sanity setup) | High | Manual: `docs/DEPLOYMENT.md` Stage 15 |
| 4 | `@sanity/scheduled-publishing` plugin install | Trivial (`npm install`) | Critical | Manual: `docs/DEPLOYMENT.md` Stage 15 |
| 5 | Bulk retrofit script for 58 existing posts | Medium (1-2 hours of code) | Medium | Not started |
| 6 | 5 water damage pillar/spoke posts (content) | High (1-2 hours per post) | High | Not started |
| 7 | 100 repair guides plan / keyword universe expansion | Very high (research + content) | Critical | Not started |

The most impactful next item is **#5 (bulk retrofit script)** — it's self-contained code that adds bylines, schema, and breadcrumbs to all 58 existing posts in one pass.

---

## SECTION O — VERIFICATION TESTS (RUN AFTER DEPLOYMENT)

```bash
# Test 1: Scanner catches all leaked labels
node -e "
const { scanText } = require('./config/banned-content-patterns');
const text = 'LEARNED: test\nBETTER: test\nWHY SUCCESS: test\nREPLICATE: test\n[x] E-E-A-T signals';
console.log('Findings:', scanText(text).length, '(should be 5)');
"

# Test 2: Learning loop generalises new patterns
node scripts/learning-loop.js --dry-run

# Test 3: GSC analyser produces valid schedule
node scripts/gsc-traffic-analyser.js
cat config/publish-schedule.json | head -20

# Test 4: MS Graph notifications work
source ~/.za-keys/active.env && node scripts/notify-leak-detected.js test

# Test 5: Cron jobs installed
crontab -l | grep ZA-SUPPORT-BLOG
# Expected: 4 entries

# Test 6: Production hardening active
npm run build
find .next -name "*.map"
# Expected: empty (no source maps)

# Test 7: Schema validates
# Visit https://search.google.com/test/rich-results
# Test any blog URL — expect BlogPosting + BreadcrumbList + FAQPage validated
```

---

## SECTION P — WHAT TO TELL THE NEXT SESSION

If you (Claude) are reading this in a fresh session, here's what to do:

1. **Acknowledge the system is loaded.** Tell Courtney you've absorbed the Perfect Blog Creator v2.0 context.
2. **Apply Rule 0.1 immediately.** Before doing anything, audit what already exists in his workspace, repo, CMS, or live site.
3. **Apply Rule 0.5 always.** If you need to ask a question, batch it and continue building everything else.
4. **Default to South African English, ZAR, DD/MM/YYYY, Hyde Park, A4.** Always.
5. **Never use the banned tone words.** Section D has the full list.
6. **Treat 8 posts/day as the operating cadence.** Below or above is forbidden.
7. **Never block content.** Always auto-fix and learn.
8. **Brief Qaasim for design tasks** — ask before iterating in chat.
9. **For any specific question, point to the relevant doc:**
   - "How does X work?" → `docs/ARCHITECTURE.md`
   - "Why was Y decided?" → `docs/POLICIES.md`
   - "What's the rule about Z?" → `docs/PREFERENCES.md`
   - "How do I deploy?" → `docs/DEPLOYMENT.md`
   - "How does the learning loop generalise patterns?" → `docs/LEARNING-LOOP.md`

---

## SECTION Q — FILE INTEGRITY CHECKSUMS

After deployment, verify the package integrity:

```bash
# All files present
find perfect-blog -type f | wc -l
# Expected: 42

# All .md files present
find perfect-blog -name "*.md" | wc -l
# Expected: 12 (including this INJECT.md)

# Total documentation
find perfect-blog -name "*.md" -exec cat {} + | wc -l
# Expected: ~4,200 lines

# All scripts executable
find perfect-blog -name "*.sh" -o -name "*.js" | xargs ls -l | grep -c "rwx"
# Expected: 8
```

---

*ZA Support Perfect Blog Creator — Master Injection v2.0*
*42 files | 12 .md docs | ~4,200 lines of documentation*
*Last updated: 13 April 2026*
*Owner: Courtney Bentley | courtney@zasupport.com | admin@zasupport.com*
*Workshop: 1 Hyde Lane, Hyde Park, Johannesburg | 064 529 5863*
