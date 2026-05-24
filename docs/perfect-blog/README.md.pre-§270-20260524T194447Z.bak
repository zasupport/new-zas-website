# Perfect Blog Creator — ZA Support

**Version:** 2.0 | **Updated:** 13 April 2026 | **Site:** zasupport.com
**Owner:** Courtney Bentley, Founder, ZA Support | **Files:** 37 | **Status:** Production-ready

---

## What this package is

A complete, self-improving blog content infrastructure for zasupport.com. Produces 8 high-quality blog posts per day, automatically prevents proprietary content workflow leaks, learns from every detected mistake, and schedules publication based on real Google Search Console traffic patterns.

Three principles:
1. **Never block content creation** — auto-fix mistakes silently, never ask for approval
2. **Learn from every mistake** — turn each detected leak into a permanent prevention pattern
3. **Hide what can be hidden** — strip source maps, EXIF, framework fingerprints without breaking SEO

---

## Package contents (37 files)

### Documentation (10)
- `README.md` — this file
- `CONTEXT.md` — full project context for fresh sessions
- `SKILL.md` — Perfect Blog Creator master skill
- `CLAUDE-BLOG-APPEND.md` — v2.0 CLAUDE.md append rules
- `docs/ARCHITECTURE.md` — system architecture and component map
- `docs/POLICIES.md` — every policy decision with rationale
- `docs/LEARNING-LOOP.md` — how the self-improving pipeline works
- `docs/DEPLOYMENT.md` — step-by-step deployment runbook
- `skills/blog-leak-scanner/SKILL.md` — leak detection sub-skill
- `skills/blog-page-wording-repair/SKILL.md` — auto-repair sub-skill

### Scripts (7)
- `scripts/scan-blog-leaks.js` — daily cron leak scanner
- `scripts/strip-image-exif.js` — EXIF/IPTC/XMP metadata stripper
- `scripts/notify-leak-detected.js` — MS Graph email notifier
- `scripts/learning-loop.js` — daily pattern generaliser
- `scripts/gsc-traffic-analyser.js` — weekly GSC traffic analyser
- `scripts/schedule-sanity-posts.js` — hourly draft-to-slot scheduler
- `scripts/install-cron-jobs.sh` — one-command cron installer

### Configuration (3)
- `config/banned-content-patterns.js` — 7-tier registry + auto-loaded learned patterns
- `config/next.config.hardening.js` — production hardening
- `config/next.config.redirects.js` — water damage 301 redirects

### Sanity CMS (4)
- `sanity/blogPost.schema.ts` — full schema with auto-fixer + scheduling fields
- `sanity/leak-auto-fixer.ts` — pre-publish hook (never blocks)
- `sanity/leak-validator.ts` — DEPRECATED original validator
- `sanity/uploadHook.ts` — image upload EXIF interceptor

### React/TypeScript (8)
- `components/AuthorBox.tsx`
- `components/BlogSchema.tsx`
- `components/HowToSchema.tsx`
- `components/SiteSchema.tsx`
- `components/BlogComponents.tsx`
- `pages/BlogPostTemplate.tsx`
- `pages/AuthorPage.tsx`
- `pages/EditorialPolicy.tsx`

### Assets (7)
- 7 author and workshop PNG photos in `assets/`

### Installer (1)
- `setup.sh` — zero-touch installer

---

## Quick start

### Option A — One-command install
```bash
cd /path/to/zasupport-website
bash /path/to/perfect-blog/setup.sh
```

### Option B — Manual deployment
Follow `docs/DEPLOYMENT.md` (16 stages, ~3 hours).

### After install — activate cron jobs
```bash
bash scripts/install-cron-jobs.sh
```

Installs four scheduled jobs:
- **Hourly :05** — Sanity post scheduler
- **Daily 02:00 SAST** — Blog leak scanner
- **Daily 03:00 SAST** — Learning loop
- **Sunday 23:00 SAST** — GSC traffic refresh

### After install — environment variables
```bash
# Sanity CMS
export SANITY_PROJECT_ID="..."
export SANITY_DATASET="production"
export SANITY_WRITE_TOKEN="..."

# Google Search Console
export GSC_SERVICE_ACCOUNT_PATH="$HOME/.za-keys/gsc-service-account.json"

# MS Graph (email notifications)
export MS_GRAPH_TENANT_ID="..."
export MS_GRAPH_CLIENT_ID="..."
export MS_GRAPH_CLIENT_SECRET="..."
export MS_GRAPH_REFRESH_TOKEN="..."  # currently in ~/.za-keys-pending.env
```

---

## What this package solves

| Problem | Solution |
|---|---|
| Internal labels (LEARNED:, BETTER:, WHY SUCCESS:) leaking to live pages | 7-tier banned pattern registry + pre-publish auto-fixer + daily scanner |
| 8 posts/day risking spam classifier | GSC-driven scheduling with 2-hour minimum spacing |
| Zero E-E-A-T author signals on existing posts | Complete component library (AuthorBox, schemas, AuthorPage) |
| Source maps and EXIF leaking proprietary IP | Production hardening + EXIF stripper |
| Manual approval queue killing velocity | Auto-fix + auto-repair + after-the-fact notifications |
| Same mistake recurring in different forms | Learning loop generalises every detection into permanent pattern |

---

## Dependencies

**Required:** Node.js 18+, Next.js 15, Sanity CMS v3+, Tailwind v4
**npm:** `@sanity/client`, `googleapis`, `sharp`, `xml2js`
**Optional:** `@sanity/scheduled-publishing` plugin, Cloudflare API token

---

## Maintenance

- **Daily:** Nothing. The system runs itself.
- **Weekly:** GSC schedule refreshes automatically Sunday 23:00 SAST.
- **Monthly:** Review `reports/learning-log.json`, verify cron jobs active, check email notifications.
- **When something breaks:** Check `logs/[job-name].log` first.

---

## Contact

**Courtney Bentley** | courtney@zasupport.com / admin@zasupport.com
1 Hyde Lane, Hyde Park, Johannesburg | 064 529 5863
https://www.zasupport.com

---

*Perfect Blog Creator v2.0 — 13 April 2026*
