# Perfect Blog Creator — System Architecture

**Version:** 2.0
**Last updated:** 13 April 2026
**Site:** zasupport.com
**Status:** Production-ready, 37 files, end-to-end tested

---

## 1. THE PIPELINE AT A GLANCE

```
┌────────────────────────────────────────────────────────────────────────┐
│                    AUTHOR DRAFTS POST IN SANITY                        │
│                  (Courtney or Mary, named author)                      │
└────────────────────────────────────────┬───────────────────────────────┘
                                         │
                                         ▼
┌────────────────────────────────────────────────────────────────────────┐
│  SANITY AUTO-FIXER HOOK (sanity/leak-auto-fixer.ts)                    │
│  Runs on save. NEVER blocks. Silently strips banned patterns.          │
│  Triggers learning loop entry if pattern is new.                       │
└────────────────────────────────────────┬───────────────────────────────┘
                                         │
                                         ▼
┌────────────────────────────────────────────────────────────────────────┐
│  AUTHOR FLIPS "Ready to Publish" TOGGLE                                │
│  No further action required.                                            │
└────────────────────────────────────────┬───────────────────────────────┘
                                         │
                                         ▼
┌────────────────────────────────────────────────────────────────────────┐
│  HOURLY CRON: schedule-sanity-posts.js                                 │
│  Reads config/publish-schedule.json (8 GSC-optimal hours).             │
│  Assigns ready drafts to next available slot.                          │
│  Sets publishAt (UTC) on each draft.                                   │
└────────────────────────────────────────┬───────────────────────────────┘
                                         │
                                         ▼
┌────────────────────────────────────────────────────────────────────────┐
│  SANITY SCHEDULED PUBLISHING PLUGIN                                    │
│  Watches publishAt timestamps.                                         │
│  Publishes each document at its assigned moment.                       │
└────────────────────────────────────────┬───────────────────────────────┘
                                         │
                                         ▼
┌────────────────────────────────────────────────────────────────────────┐
│  VERCEL REBUILD                                                         │
│  Production hardening config kicks in:                                 │
│  - source maps disabled                                                 │
│  - x-powered-by stripped                                                │
│  - console.log removed                                                  │
│  - HTML comments stripped                                               │
│  - CSP headers locked down                                              │
│  - Image EXIF stripped on upload                                        │
└────────────────────────────────────────┬───────────────────────────────┘
                                         │
                                         ▼
┌────────────────────────────────────────────────────────────────────────┐
│  POST GOES LIVE on zasupport.com                                       │
└────────────────────────────────────────┬───────────────────────────────┘
                                         │
                                         ▼
┌────────────────────────────────────────────────────────────────────────┐
│  DAILY 02:00 SAST: scan-blog-leaks.js                                  │
│  Fetches sitemap, scans every blog URL, detects leaks via             │
│  config/banned-content-patterns.js (7 tiers + learned).                │
│  Writes report to /reports/leak-scan-YYYY-MM-DD.json.                  │
│  Queues critical leaks for repair.                                     │
│  Sends email notification via MS Graph.                                │
└────────────────────────────────────────┬───────────────────────────────┘
                                         │
                                         ▼
┌────────────────────────────────────────────────────────────────────────┐
│  blog-page-wording-repair SKILL                                        │
│  Picks up queued URLs, rewrites affected blocks in plain prose,        │
│  republishes via Sanity, updates dateModified, sends "fixed" email.    │
└────────────────────────────────────────┬───────────────────────────────┘
                                         │
                                         ▼
┌────────────────────────────────────────────────────────────────────────┐
│  DAILY 03:00 SAST: learning-loop.js                                    │
│  Reads scan reports, generalises detected matches, adds permanent      │
│  patterns to config/learned-patterns.json.                             │
│  Next scan automatically catches all variants.                         │
│  Sends "learned" email summary.                                        │
└────────────────────────────────────────┬───────────────────────────────┘
                                         │
                                         ▼
┌────────────────────────────────────────────────────────────────────────┐
│  WEEKLY SUNDAY 23:00 SAST: gsc-traffic-analyser.js                     │
│  Refreshes the publish schedule based on the past 28 days of GSC data. │
│  Updates config/publish-schedule.json.                                  │
│  Pipeline self-tunes to traffic patterns.                               │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 2. COMPONENT MAP

### Content creation layer
| Component | File | Purpose |
|---|---|---|
| Sanity blog post schema | `sanity/blogPost.schema.ts` | Defines all blog post fields, wires in auto-fixer |
| Sanity auto-fixer | `sanity/leak-auto-fixer.ts` | Pre-publish hook, never blocks |
| Image upload hook | `sanity/uploadHook.ts` | EXIF stripping on upload (placeholder) |
| Banned patterns registry | `config/banned-content-patterns.js` | 7 tiers + auto-loaded learned patterns |

### Scheduling layer
| Component | File | Purpose |
|---|---|---|
| GSC traffic analyser | `scripts/gsc-traffic-analyser.js` | Builds traffic heatmap, picks 8 optimal hours |
| Publish schedule | `config/publish-schedule.json` | Generated weekly, consumed hourly |
| Sanity post scheduler | `scripts/schedule-sanity-posts.js` | Assigns drafts to slots, sets publishAt |
| Cron installer | `scripts/install-cron-jobs.sh` | One-command setup for all 4 jobs |

### Detection layer
| Component | File | Purpose |
|---|---|---|
| Daily leak scanner | `scripts/scan-blog-leaks.js` | Production-side scan, queues repairs |
| Blog leak scanner skill | `skills/blog-leak-scanner/SKILL.md` | Skill definition for Claude invocation |

### Repair layer
| Component | File | Purpose |
|---|---|---|
| Wording repair skill | `skills/blog-page-wording-repair/SKILL.md` | Skill definition for Claude invocation |
| Repair queue | `reports/repair-queue.json` | Generated by scanner, consumed by repair skill |

### Learning layer
| Component | File | Purpose |
|---|---|---|
| Learning loop | `scripts/learning-loop.js` | Generalises detected leaks into permanent patterns |
| Learned patterns store | `config/learned-patterns.json` | Auto-managed registry, never edit by hand |
| Learning log | `reports/learning-log.json` | Audit trail of every pattern learned |

### Notification layer
| Component | File | Purpose |
|---|---|---|
| MS Graph notifier | `scripts/notify-leak-detected.js` | Sends HTML emails on detection and repair |
| Recipients | admin@zasupport.com | Goes to Courtney + Mary |

### Hardening layer
| Component | File | Purpose |
|---|---|---|
| Production hardening | `config/next.config.hardening.js` | Source maps, headers, CSP, console stripping |
| EXIF stripper | `scripts/strip-image-exif.js` | Removes GPS, camera serials, timestamps |
| Image upload hook | `sanity/uploadHook.ts` | Wires EXIF stripper into Sanity asset pipeline |

### Frontend layer (existing)
| Component | File | Purpose |
|---|---|---|
| Author byline | `components/AuthorBox.tsx` | E-E-A-T author signal |
| Blog schema | `components/BlogSchema.tsx` | JSON-LD generator |
| HowTo schema | `components/HowToSchema.tsx` | For repair guide posts |
| Site schema | `components/SiteSchema.tsx` | Organization + LocalBusiness |
| Blog UI components | `components/BlogComponents.tsx` | Breadcrumbs, ToC, KeyTakeaways |
| Blog post template | `pages/BlogPostTemplate.tsx` | Page-level wiring |
| Author page | `pages/AuthorPage.tsx` | Person schema, ProfilePage |
| Editorial policy | `pages/EditorialPolicy.tsx` | Trust signal page |

---

## 3. DATA FLOW

### Outbound flow (creation → publication)
1. Author creates draft → Sanity validates with auto-fixer → save proceeds (never blocked)
2. Author flips `readyToPublish` → hourly scheduler assigns slot → `publishAt` set
3. Sanity Scheduled Publishing fires at `publishAt` → Vercel rebuilds → live
4. Production hardening applied at build time → no source maps, no leaked metadata

### Inbound flow (detection → repair → learning)
1. Daily scanner fetches sitemap → scans HTML → finds leaks → writes report
2. Scanner queues critical leaks in `reports/repair-queue.json` → notifies via email
3. Repair skill picks up queue → rewrites affected blocks → republishes
4. Learning loop reads reports → generalises patterns → updates `learned-patterns.json`
5. Next scan automatically catches all variants of the same pattern

### Traffic-driven scheduling flow
1. GSC analyser fetches Search Analytics for past 28 days
2. Builds 24-hour traffic heatmap (clicks × 0.5 + impressions × 0.3 + crawls × 0.2)
3. Selects top 8 hours with minimum 2-hour spacing (no burst patterns)
4. Writes `config/publish-schedule.json`
5. Hourly scheduler reads this file to assign new drafts

---

## 4. CRON JOBS

Installed by `scripts/install-cron-jobs.sh`. Tagged with `# ZA-SUPPORT-BLOG` for safe removal.

| Schedule (UTC) | Schedule (SAST) | Job | Purpose |
|---|---|---|---|
| `5 * * * *` | Hourly :05 | `schedule-sanity-posts.js` | Assigns ready drafts to next slot |
| `0 0 * * *` | Daily 02:00 | `scan-blog-leaks.js` | Detects leaks on live pages |
| `0 1 * * *` | Daily 03:00 | `learning-loop.js` | Turns detections into permanent patterns |
| `0 21 * * 0` | Sunday 23:00 | `gsc-traffic-analyser.js --refresh-schedule` | Refreshes optimal hours |

Logs written to `logs/` — one file per job.

---

## 5. ENVIRONMENT VARIABLES REQUIRED

### Sanity CMS
- `SANITY_PROJECT_ID` — from sanity.io project settings
- `SANITY_DATASET` — defaults to "production"
- `SANITY_WRITE_TOKEN` — from sanity.io/manage/project/[id]/api

### Google Search Console
- `GSC_SERVICE_ACCOUNT_PATH` — defaults to `~/.za-keys/gsc-service-account.json`
- (Service account email must be added as user in GSC property)

### MS Graph (email notifications)
- `MS_GRAPH_TENANT_ID`
- `MS_GRAPH_CLIENT_ID`
- `MS_GRAPH_CLIENT_SECRET`
- `MS_GRAPH_REFRESH_TOKEN` — currently in `~/.za-keys-pending.env`, needs activation

### Optional
- `CLOUDFLARE_API_TOKEN` — enables real crawl stats from Cloudflare logs (otherwise uses default crawl pattern)

---

## 6. FILE SYSTEM LAYOUT (post-deployment)

```
zasupport-website/
├── src/
│   ├── components/
│   │   └── blog/
│   │       ├── AuthorBox.tsx
│   │       ├── BlogSchema.tsx
│   │       ├── HowToSchema.tsx
│   │       ├── SiteSchema.tsx
│   │       └── BlogComponents.tsx
│   └── app/
│       ├── blog/[slug]/page.tsx       (uses BlogPostTemplate)
│       ├── author/[slug]/page.tsx     (uses AuthorPage)
│       └── editorial-policy/page.tsx  (uses EditorialPolicy)
├── sanity/
│   ├── schemas/
│   │   └── blogPost.ts                (with auto-fixer wired in)
│   ├── validators/
│   │   └── leak-auto-fixer.ts
│   └── plugins/
│       └── uploadHook.ts
├── scripts/
│   ├── scan-blog-leaks.js
│   ├── strip-image-exif.js
│   ├── notify-leak-detected.js
│   ├── learning-loop.js
│   ├── gsc-traffic-analyser.js
│   ├── schedule-sanity-posts.js
│   └── install-cron-jobs.sh
├── config/
│   ├── banned-content-patterns.js
│   ├── learned-patterns.json          (auto-managed, do not edit)
│   ├── publish-schedule.json          (auto-managed, refreshed weekly)
│   ├── next.config.redirects.js
│   └── next.config.hardening.js
├── reports/                            (all auto-generated)
│   ├── leak-scan-YYYY-MM-DD.json
│   ├── repair-queue.json
│   ├── learning-log.json
│   ├── publish-queue.json
│   └── gsc-traffic-analysis.json
├── logs/                               (cron output)
│   ├── gsc-refresh.log
│   ├── scheduler.log
│   ├── leak-scanner.log
│   └── learning-loop.log
├── public/images/                      (EXIF-stripped via build pre-hook)
└── next.config.js                      (imports hardening + redirects)
```

---

## 7. ARCHITECTURAL PRINCIPLES

### Self-healing over alerting
The system is designed to fix problems silently and notify after the fix, not before. Courtney sees emails about what was fixed, never about what needs approval.

### Learning over rules
Static rules catch known mistakes. The learning loop catches mistakes we haven't seen yet by generalising from every detection. The system is permanently smarter than it was yesterday.

### Never block creation
Content velocity is sacred. Whatever the system catches, it fixes. Whatever it can't fix, it queues for human review without stopping the next post from publishing.

### SEO over secrecy
We hide everything that can be hidden without hurting SEO. Source maps, EXIF, build IDs, console logs, framework headers — all gone. Schema markup, HTML content, alt text — all readable, because Google needs them.

### Traffic-driven scheduling
The 8 publish hours per day aren't fixed by guess. They're derived from real Search Console data and refreshed weekly so the schedule adapts to actual reader behaviour.

### Belt and braces
Every protection has a backup:
- Pre-publish auto-fix → daily cron scan
- Daily scan → learning loop generalisation
- Auto-fix → email notification with rollback option
- GSC API → mock data fallback if credentials missing
- Sanity write → dry-run mode if token missing

---

## 8. DEFENSIVE DESIGN

### Why we never block
Blocking creates queues. Queues create anxiety. Anxiety creates manual workarounds. Manual workarounds create the exact mistakes we're trying to prevent. The only way to maintain 8 posts/day is for the system to handle problems without asking.

### Why we strip everything
A competitor who reads the source maps for one of our posts can reverse-engineer the entire content workflow. Source maps are a developer convenience for production debugging, but Vercel build logs contain enough information for our needs. Stripping them costs us nothing and protects our IP.

### Why we use GSC data
Publishing at random times wastes the first hour of a post's life — when Googlebot would have caught it on a routine crawl, an aligned schedule means the post is live before the bot arrives. This is small but compounding: 8 posts/day × 365 days × first-hour ranking lift = real difference over time.

### Why the learning loop matters
A static banned-pattern list ages poorly. New AI generations introduce new failure modes. Without learning, the registry would need manual updates every month. With learning, every detection becomes a permanent prevention.

---

## 9. WHAT BREAKS THIS SYSTEM

Things that would degrade the architecture:

1. **Manual approval gates added back** — kills velocity, defeats the purpose
2. **Hardcoded publish times** — breaks the GSC-driven adaptation
3. **Editing learned-patterns.json by hand** — desyncs the learning loop
4. **Disabling the daily scanner** — leaks would persist undetected
5. **Running the scanner without the learning loop** — same leaks would recur
6. **Blocking content velocity to "review" leaks** — direct violation of policy
7. **Removing the auto-fixer from Sanity** — leaks would reach production
8. **Skipping the cron install** — pipeline becomes manual, brittle

---

## 10. SUCCESS METRICS

The architecture is working correctly when:

- 8 posts published per day, every day, with no missed slots
- Zero leaked content visible on any live page
- Learning loop adds at least 1 new pattern per week (proves it's catching new failure modes)
- GSC schedule refresh runs weekly without error
- Email notifications arrive within 1 hour of any leak detection
- No author has been blocked from saving in 30+ days
- Repair queue depth stays at 0 most of the time
- `learned-patterns.json` grows by ~2-5 patterns per month

---

*Perfect Blog Creator — System Architecture v2.0*
*ZA Support | zasupport.com | courtney@zasupport.com*
*Last updated: 13 April 2026*
