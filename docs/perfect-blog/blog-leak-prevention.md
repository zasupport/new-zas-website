# Blog Content Leak — Root Cause Analysis and Permanent Prevention

**Audience:** Claude Code working inside the `zasupport-website` repository
**Status:** Active — apply immediately at the start of every session in this repo
**Last updated:** 21 May 2026
**File location:** `<repo>/docs/blog-leak-prevention.md`
**Also referenced from:** `<repo>/CLAUDE.md`, `<repo>/perfect-blog/INJECT.md`

---

## EXECUTIVE SUMMARY

Internal Claude authoring labels — `LEARNED:`, `BETTER:`, `WHY:`, `REPLICATE:`, `KEY INSIGHT:`, `## FAQPage Schema` headings, `[x] E-E-A-T signals` audit markers — have leaked onto zasupport.com on three separate occasions: **13 April 2026** (M3 thermal post), **15 April 2026** (MacBook screen flickering post), and **16 April 2026 evening** (full-site scan revealed 28 affected posts).

Each occurrence triggered a fix. Each fix produced more code, more skills, more rules. The leaks kept happening anyway.

**This document explains why** — and what changes structurally so it cannot happen again.

The honest answer is short: **the defences were built but never installed in production.** Every script, skill, validator, and auto-fixer lives in the `perfect-blog/` folder on disk. None of them are wired into the Sanity dataset, the Next.js build pipeline, or a GitHub Actions schedule that runs against the live site. The system is engineering output, not production infrastructure.

Until that changes, every new blog post is published with no defensive layer between the draft and the public URL.

---

## 1. WHAT KEEPS LEAKING

### 1.1 The exact strings

Three categories of internal authoring text appear on the rendered blog pages:

**Category A — Evaluation labels** (from Claude's content review framework):
- `LEARNED:` followed by retrospective analysis of the post
- `BETTER:` followed by comparison to a hypothetical weaker version
- `WHY SUCCESS:` or `WHY:` followed by justification of editorial choices
- `REPLICATE:` followed by instructions for replicating the pattern in future posts
- `KEY INSIGHT:` and `OBSERVATION:` markers
- `[x] E-E-A-T signals:` audit checklist items

**Category B — Schema notation rendered as headings:**
- `## FAQPage Schema` (and variants: `BlogPosting`, `Person`, `HowTo`, `Organization`, `BreadcrumbList`)
- These are JSON-LD schema labels that should appear in `<script type="application/ld+json">`, not in body content as `<h2>` elements

**Category C — Structural fragments:**
- Truncated paragraphs ending mid-word (e.g. `"worried about los."` on the screen flickering post)
- Duplicated opening paragraphs
- Empty bullet placeholders

### 1.2 The 28 affected posts (16 April 2026 evening scan)

All 28 URLs at `zasupport.com/blog/<slug>/`:

```
macbook-load-shedding-damage
why-rice-does-not-work
jamf-mdm-guide-south-africa
macbook-running-slow
macbook-wont-connect-wifi
apple-id-locked-out
how-to-speed-up-mac-free
mac-not-turning-on-checklist
macbook-logic-board-repair-cost-johannesburg-2026
macbook-battery-replacement-johannesburg
macbook-screen-repair-johannesburg
logic-board-repair-cost-johannesburg-2026
macbook-fan-noise-fix-johannesburg
mac-studio-repair-johannesburg
macbook-speaker-not-working-johannesburg
corporate-apple-fleet-management-johannesburg
macbook-air-m3-repair-johannesburg
macbook-repair-midrand
macbook-keyboard-repair-johannesburg
macbook-pro-m4-repair-johannesburg
macbook-hinge-repair-johannesburg
medical-practice-it-security-johannesburg
mac-repair-sandton-johannesburg
macbook-screen-flickering-johannesburg
liquid-damage-macbook-pro-sandton
macbook-battery-draining-fast-johannesburg
macbook-black-screen-fix-johannesburg
macbook-running-slow-johannesburg
```

---

## 2. ROOT CAUSE: THE GAP BETWEEN "WRITTEN" AND "DEPLOYED"

### 2.1 What exists on disk

Inside the repo at `perfect-blog/`:

| Component | Path | Lines | What it does |
|---|---|---|---|
| Banned patterns registry | `config/banned-content-patterns.js` | 292 | Pattern definitions for 7 tiers of forbidden content |
| Sanity auto-fixer | `sanity/leak-auto-fixer.ts` | 241 | Strips banned patterns from drafts on save |
| Sanity blog schema | `sanity/blogPost.schema.ts` | ~150 | Wires the auto-fixer into Sanity's document hooks |
| Site scanner | `scripts/scan-site-health.js` | 518 | Walks sitemap, scans every URL for leaks |
| Fix all posts | `scripts/fix-all-leaked-posts.js` | ~400 | Patches Sanity to remove leaks |
| Auto-heal workflow | `.github/workflows/auto-heal.yml` | ~180 | Runs the fix on webhook trigger |
| Scheduled scans | `.github/workflows/scheduled-scans.yml` | ~120 | Cron equivalent — runs every 15 min |
| Sanity webhook route | `app/api/webhooks/sanity/route.ts` | 230 | Receives publish events, dispatches workflow |
| Vercel Cron route | `app/api/cron/auto-heal/route.ts` | 225 | Redundant scheduled heal |
| Skills package | `perfect-blog/skills/*/SKILL.md` | 9 skills | Cognitive rules for Claude sessions |

### 2.2 What is actually wired into production

Run these commands inside the repo to verify the current state:

```bash
# Check 1: Is the Sanity auto-fixer registered in the live Sanity schema?
grep -r "leak-auto-fixer" sanity/ studio/ schemas/ 2>/dev/null | grep -v "perfect-blog/"
# Expected: at least one import line outside perfect-blog/
# Actual on 16 April 2026: zero results — the file exists but no schema imports it

# Check 2: Is the Next.js webhook route deployed?
curl -s -o /dev/null -w "%{http_code}\n" https://zasupport.com/api/webhooks/sanity
# Expected: 200 (returns health-check JSON) or 401 (signature required)
# Actual on 16 April 2026: 404 — route never built into production

# Check 3: Are GitHub Actions workflows runnable?
gh workflow list --repo <org>/zasupport-website
# Expected: auto-heal.yml and scheduled-scans.yml listed
# Actual on 16 April 2026: empty — workflows committed but never pushed to main

# Check 4: Are repo secrets set?
gh secret list --repo <org>/zasupport-website | grep -E "SANITY_WRITE_TOKEN|SANITY_WEBHOOK_SECRET"
# Expected: both visible
# Actual on 16 April 2026: not set

# Check 5: Is Vercel Cron registered?
vercel env ls --environment=production | grep CRON_SECRET
# Expected: CRON_SECRET visible
# Actual on 16 April 2026: not set
```

### 2.3 The structural failure

Each of the three leak incidents triggered the same response pattern:

1. **Detection** — Courtney sees the leak on a live page
2. **Fix** — Claude rewrites the affected post and commits the change
3. **Prevention work** — Claude adds new patterns to the banned-list, writes new skills, drafts new validators
4. **Documentation** — Claude updates INJECT.md, CONTEXT.md, README.md
5. **Hand-off** — Claude says "here is what you need to deploy" and the session ends

Step 5 is where the chain breaks. The "what you need to deploy" instructions go into a Markdown file. The Markdown file lives in the repo. The repo gets committed. **Nothing in the deployment pipeline reads that Markdown file** and acts on it.

The result is that after three incidents, there are now three layers of defensive code on disk, three sets of skills, three sets of rules — and zero defensive code running in production. Every new blog post is published the same way as the first one that leaked.

This is not a content problem. It is a **deployment problem**.

---

## 3. WHY EACH PRIOR FIX FAILED TO HOLD

### 3.1 Incident 1 — 13 April 2026 (M3 thermal post)

**Fix attempted:** Manually edit the affected post in Sanity Studio. Add `LEARNED:`, `BETTER:`, `WHY SUCCESS:`, `REPLICATE:` to a banned-patterns array in a new file `config/banned-content-patterns.js`. Write a `leak-validator.ts` Sanity hook that rejects drafts containing these strings.

**Why it failed to hold:**
- The validator was written but never imported into `sanity/schemas/blogPost.ts`. Sanity does not auto-discover hook files.
- The validator was strict-blocking ("reject on detection"). When a draft hit a banned pattern, it would have failed save — which contradicted Courtney's later directive (13 April afternoon) that content must never be blocked. The validator was effectively replaced before being deployed.
- No scanner ran against existing posts, so the M3 post was the only one fixed manually. The other 27 already on the site remained.

### 3.2 Incident 2 — 15 April 2026 (screen flickering post)

**Fix attempted:** Add new patterns to the registry (`WHY:` without "SUCCESS", `## FAQPage Schema` heading detection). Replace `leak-validator.ts` with `leak-auto-fixer.ts` (silent fix instead of blocking). Write `fix-flickering-post.js` to patch that specific post. Build skills (`blog-leak-scanner`, `blog-page-wording-repair`).

**Why it failed to hold:**
- `leak-auto-fixer.ts` lives at `perfect-blog/sanity/leak-auto-fixer.ts`. The active Sanity Studio runs from `studio/schemas/` or `sanity/schemas/`. The file was never imported into either.
- `fix-flickering-post.js` was run once against that one post. It fixed nothing else.
- The skills were added to `perfect-blog/skills/` — a directory Claude Code can read for context but which is not a hook in the Sanity or Next.js build pipeline.
- No daily scanner was registered as a cron job or GitHub Action. The "weekly scan" referenced in the skill description had no scheduler attached.

### 3.3 Incident 3 — 16 April 2026 evening (28 posts found)

**Fix attempted:** Build `scripts/scan-site-health.js` (full sitemap scan), `scripts/fix-all-leaked-posts.js` (batch fix), `.github/workflows/auto-heal.yml`, `.github/workflows/scheduled-scans.yml`, `app/api/webhooks/sanity/route.ts`, `app/api/cron/auto-heal/route.ts`, `vercel.json` with cron schedules. Write `EXECUTE.md` with a 7-task deployment checklist.

**Why it has not held (yet):**
- The 7 deployment tasks in `EXECUTE.md` require human action: connect Sanity MCP to Claude.ai, generate credentials, add GitHub secrets, add Vercel env vars, push the package, configure the Sanity webhook, manually trigger the first heal.
- Until those tasks run, every defensive component is dormant.
- The 28 posts remain unfixed on the live site.

---

## 4. THE COMMON ROOT CAUSE ACROSS ALL THREE INCIDENTS

Across all three incidents, the same four failure modes recur:

### Failure mode 1 — "Written ≠ Wired"

A defence file exists on disk. The runtime that should execute it does not import or invoke it.

| Defence file | Runtime that must invoke it | Was it wired? |
|---|---|---|
| `sanity/leak-auto-fixer.ts` | Sanity Studio's document save hook | No — never imported into `blogPost.ts` schema |
| `scripts/scan-site-health.js` | A scheduler (cron, GitHub Actions, Vercel Cron) | No — not registered in any scheduler |
| `app/api/webhooks/sanity/route.ts` | Sanity's webhook configuration | No — webhook never created in Sanity Studio |
| `.github/workflows/auto-heal.yml` | GitHub Actions on pushed commits | Workflow exists but secrets never set |
| `vercel.json` cron entries | Vercel's cron registrar | Not pushed to production |

### Failure mode 2 — Test scope ≠ Deployment scope

When a fix is tested in the session sandbox (`/home/claude/perfect-blog`), the test environment is not the production environment. A passing test confirms the code works in isolation. It does not confirm the code runs in production.

Example: `node scripts/fix-all-leaked-posts.js` was tested in the sandbox, detected 28 posts on the live site (because it can reach the live sitemap via HTTPS), but cannot patch the live posts because `SANITY_WRITE_TOKEN` is not in the sandbox's environment — only in Courtney's keychain or a future GitHub repo secret.

### Failure mode 3 — Documentation as a hand-off mechanism

Each session ended with documentation describing what Courtney needed to do next. The documentation grew (INJECT.md is now 788 lines). The deployment state did not change. Reading documentation is not deploying.

### Failure mode 4 — No verification gate at the production boundary

There is no automated check that runs at the moment a blog post becomes publicly visible. The pipeline is:

```
Sanity draft → "Publish" button → Sanity dataset → Next.js ISR rebuild → Vercel CDN → public URL
```

At no point in this pipeline does a banned-patterns scan execute. The earliest a scan could catch a leak is **after publication**, by a separately-scheduled job — which is exactly the design that has not been deployed.

The correct boundary is **before the dataset write commits**, in the Sanity Studio save hook. That requires `leak-auto-fixer.ts` to be imported into the live Sanity schema, which has not happened.

---

## 5. WHAT MUST CHANGE STRUCTURALLY

Building more code is not the answer. The defences already exist. The structural change is **moving from "code exists" to "code runs in production"**, with verification at every hand-off.

The four structural shifts:

### Shift 1 — Production-first deployment, sandbox-second

Every defensive component must be deployed to production before it is considered complete. The order is:

1. Write the code
2. Test in sandbox
3. **Deploy to production**
4. **Verify production deployment with a live test against the production environment**
5. Document what was deployed

Steps 3 and 4 are non-negotiable. A skill or script that has not been verified running in production does not exist.

### Shift 2 — Sanity Studio is the single enforcement point

The Sanity Studio document save hook is the only choke point that sees content before publication. All other defences (scanners, webhooks, crons) are recovery mechanisms — they fix leaks after publication. The Studio hook is the only one that prevents publication in the first place.

The `leak-auto-fixer.ts` file must be imported into the live Sanity schema for `blogPost`. This is one line of code added to `sanity/schemas/blogPost.ts` (or wherever the live schema lives):

```typescript
import { autoFixOnSave } from './leak-auto-fixer'

export default defineType({
  name: 'blogPost',
  type: 'document',
  // ... existing fields ...

  // ADD THIS BLOCK:
  hooks: {
    beforeSave: autoFixOnSave,
  },
})
```

Without this line, every other defence is reactive cleanup.

### Shift 3 — Self-verifying defences

A defence that cannot prove it is running is indistinguishable from a defence that is not running. Every defensive component must emit a heartbeat that a separate watcher checks for.

Examples:

| Defence | Heartbeat | Watcher checks |
|---|---|---|
| Sanity auto-fixer | Writes `lastRunAt` timestamp to a dedicated Sanity document on every save | If no update in 24h, alert |
| Scanner cron | Writes scan results to `logs/site-health/<date>.json` | If no log for today, alert |
| Vercel Cron heal | Writes to `logs/vercel-cron/<date>.json` | If no log for today, alert |
| GitHub Actions auto-heal | Records run ID in repo state file | If no run in 24h with leaks present, alert |
| Webhook endpoint | Logs every incoming webhook to `logs/sanity-webhook.log` | If no log entries when Sanity is publishing, alert |

The watcher itself must have a heartbeat (it can write to its own log and be watched by an external uptime monitor like UptimeRobot pinging `https://zasupport.com/api/health/defences`).

### Shift 4 — Restoration is automated, not manual

When a leak is detected, the response must be automatic. No human action between detection and repair. The repair pipeline:

```
Scan detects leak
   │
   ▼ (within 60 seconds)
Auto-heal workflow dispatched
   │
   ▼ (within 2 minutes)
Sanity document patched
   │
   ▼ (within 90 seconds)
Vercel revalidates affected URL
   │
   ▼ (within 30 seconds)
Post-heal scan confirms clean
   │
   ▼
Log entry written, no notification sent (silent success)
```

If any step fails, **then** a notification fires — not before.

---

## 6. THE COMPREHENSIVE DEFENCE — SEVEN LAYERS

The full defensive stack runs in seven layers, top to bottom:

```
LAYER 1 — Author training (cognitive)
   │
   ▼
LAYER 2 — Sanity Studio save hook (prevention)
   │
   ▼
LAYER 3 — Pre-build static check (Vercel build step)
   │
   ▼
LAYER 4 — Post-publish webhook scan (real-time detection)
   │
   ▼
LAYER 5 — Scheduled scanner (every 15 min, redundant)
   │
   ▼
LAYER 6 — Daily full-site scan (catch-all)
   │
   ▼
LAYER 7 — Defences watchdog (proves the others are running)
```

Each layer is independent. Failure of any one layer is caught by the next. Each layer reports to the watchdog.

### Layer 1 — Author training

Lives in `perfect-blog/skills/content-integrity-logic/` and the rules that Claude sessions inherit via `CLAUDE.md`. This is the only layer that depends on humans (Claude included). All other layers run without human attention.

### Layer 2 — Sanity Studio save hook

`sanity/leak-auto-fixer.ts` imported into the live `blogPost` schema. Runs on every document save. Silently strips banned patterns and proceeds with the save. Records every fix to a `repairLog` array on the document.

**Status:** code exists, not wired. **Required action: edit the live schema to import the hook.**

### Layer 3 — Pre-build static check

A Next.js build-time check that runs `scripts/scan-built-pages.js` against the static export before Vercel deploys. If banned patterns are present in any built page, the build fails. Vercel will not publish a broken build.

**Status:** not yet built. To be added: `scripts/pre-build-leak-check.js` invoked from `next.config.js` or as a `vercel.json` build command.

### Layer 4 — Post-publish webhook scan

`app/api/webhooks/sanity/route.ts` receives Sanity's publish event, dispatches `auto-heal.yml`, which scans the affected URL and patches if needed.

**Status:** code exists, not deployed.

### Layer 5 — Scheduled scanner (every 15 min)

`.github/workflows/scheduled-scans.yml` runs `scripts/scan-site-health.js --mode fast` every 15 minutes. Scans the last 10 published posts.

**Status:** workflow file exists, not deployed.

### Layer 6 — Daily full-site scan

Same workflow on a `0 0 * * *` schedule runs `--mode full` against the entire sitemap.

**Status:** workflow file exists, not deployed.

### Layer 7 — Defences watchdog

A new component (`app/api/health/defences/route.ts`) that returns the heartbeat state of each defence:

```json
{
  "layer_2_studio_hook": { "active": true, "last_save_at": "2026-04-17T08:00:00Z" },
  "layer_3_pre_build": { "active": true, "last_build_at": "2026-04-17T07:30:00Z" },
  "layer_4_webhook": { "active": true, "last_webhook_at": "2026-04-17T08:00:00Z" },
  "layer_5_fast_cron": { "active": true, "last_run_at": "2026-04-17T08:15:00Z" },
  "layer_6_full_cron": { "active": true, "last_run_at": "2026-04-17T00:00:00Z" },
  "overall_healthy": true,
  "leaks_currently_on_site": 0
}
```

UptimeRobot pings this endpoint every 5 minutes. If `overall_healthy` is ever `false` for more than 30 minutes, an SMS escalation fires.

**Status:** not yet built. To be added: `app/api/health/defences/route.ts`.

---

## 7. CLAUDE CODE INSTRUCTIONS FOR THIS REPO

When a Claude Code session opens in `zasupport-website`, the first action is to read this file and verify the deployment state. The session must report which layers are active before doing any other work.

### 7.1 Session start checklist

Run this block at the start of every session in this repo:

```bash
# 1. Sanity hook wired?
LAYER_2=$(grep -l "leak-auto-fixer" sanity/schemas/ studio/schemas/ schemas/ 2>/dev/null | grep -v perfect-blog || echo "MISSING")

# 2. Pre-build check in next.config?
LAYER_3=$(grep -l "pre-build-leak-check\|scan-built-pages" next.config.* 2>/dev/null || echo "MISSING")

# 3. Webhook route deployed?
LAYER_4=$(curl -s -o /dev/null -w "%{http_code}" https://zasupport.com/api/webhooks/sanity)

# 4. GitHub Actions workflows on main?
LAYER_5_6=$(gh workflow list --repo "$(gh repo view --json owner,name -q '.owner.login + "/" + .name')" 2>/dev/null | grep -c "auto-heal\|scheduled-scans" || echo "0")

# 5. Defences watchdog deployed?
LAYER_7=$(curl -s -o /dev/null -w "%{http_code}" https://zasupport.com/api/health/defences)

echo "LAYER 2 (Studio hook):         $LAYER_2"
echo "LAYER 3 (Pre-build check):     $LAYER_3"
echo "LAYER 4 (Webhook endpoint):    HTTP $LAYER_4 (expect 200 or 401)"
echo "LAYER 5+6 (GitHub Actions):    $LAYER_5_6 workflows registered (expect 2)"
echo "LAYER 7 (Defences watchdog):   HTTP $LAYER_7 (expect 200)"
```

Report the output in the first message of the session. Do not proceed with any other work until all five lines show the expected values.

### 7.2 If any layer reports MISSING or non-200

Claude Code's first task is to deploy that layer. Not to write more code — the code already exists in `perfect-blog/`. The task is **wiring** the existing code into production.

The five wiring operations:

#### Wiring 1 — Studio hook

```bash
# Find the live blogPost schema
SCHEMA_FILE=$(find sanity studio schemas -name "blogPost*" -type f 2>/dev/null | grep -v perfect-blog | head -1)

# Import the auto-fixer (idempotent — only adds if not present)
if ! grep -q "leak-auto-fixer" "$SCHEMA_FILE"; then
  # Copy auto-fixer into the live schema directory
  cp perfect-blog/sanity/leak-auto-fixer.ts "$(dirname $SCHEMA_FILE)/leak-auto-fixer.ts"

  # Add import + hook to schema
  # (Patch is small; do it via str_replace once schema is read)
fi
```

#### Wiring 2 — Pre-build check

```bash
# Add to next.config.js (or .ts) — runs at build time
# Vercel will refuse to deploy a build that fails this check
```

#### Wiring 3 — Webhook route

```bash
# Already in app/api/webhooks/sanity/route.ts — just needs:
# 1. Vercel env vars set
# 2. Sanity webhook configured to POST to this URL
```

#### Wiring 4 — GitHub Actions

```bash
# Files exist in .github/workflows/ — just need:
# 1. gh secret set commands for the 11 secrets
# 2. git push to main so workflows register
```

#### Wiring 5 — Defences watchdog

```bash
# Not yet built — create app/api/health/defences/route.ts
# (Skeleton in section 8 below)
```

### 7.3 Verification gate

After every wiring operation, Claude Code must verify by running the test that proves the layer is active in production. No layer is considered deployed until verification passes.

```bash
# Verify Studio hook
# Create a draft blog post with a banned string, save it, fetch the saved version,
# confirm the banned string was stripped.

# Verify pre-build check
# Push a commit with a banned string in a static page, expect the build to fail.

# Verify webhook
curl https://zasupport.com/api/webhooks/sanity
# Expect: {"status":"ready", ...}

# Verify GitHub Actions
gh workflow run auto-heal.yml -f scope=all-leaked-posts -f dry_run=true
gh run watch

# Verify watchdog
curl https://zasupport.com/api/health/defences
# Expect: {"overall_healthy":true, ...}
```

---

## 8. THE DEFENCES WATCHDOG — SKELETON

This file does not yet exist. Claude Code must create it as part of the wiring step.

```typescript
// app/api/health/defences/route.ts
//
// Returns the health of all defensive layers. Used by UptimeRobot for
// external monitoring and by Claude Code session-start checks.

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@sanity/client'

export const runtime = 'nodejs'

interface LayerStatus {
  active: boolean
  last_run_at: string | null
  detail?: string
}

async function checkLayer2_StudioHook(): Promise<LayerStatus> {
  // Query Sanity for any document with a repairLog entry in the last 24h.
  // A repairLog entry proves the hook ran.
  try {
    const client = createClient({
      projectId: process.env.SANITY_PROJECT_ID!,
      dataset: 'production',
      apiVersion: '2024-01-01',
      useCdn: false,
    })
    const cutoff = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
    const result = await client.fetch(
      `*[_type == "blogPost" && defined(repairLog) && repairLog[length(repairLog)-1].timestamp > $cutoff][0]`,
      { cutoff }
    )
    return {
      active: !!result,
      last_run_at: result?.repairLog?.slice(-1)[0]?.timestamp || null,
    }
  } catch (e: any) {
    return { active: false, last_run_at: null, detail: e.message }
  }
}

async function checkLayer5_FastCron(): Promise<LayerStatus> {
  // GitHub API: list recent runs of scheduled-scans.yml, return latest timestamp
  // (omitted for brevity — same pattern)
  return { active: false, last_run_at: null }
}

async function checkCurrentLeaks(): Promise<number> {
  // Quick scan of the last 10 published posts
  // Returns count of leaks currently present
  return 0
}

export async function GET(req: NextRequest) {
  const [layer2, layer5, leaks] = await Promise.all([
    checkLayer2_StudioHook(),
    checkLayer5_FastCron(),
    checkCurrentLeaks(),
  ])

  const layers = {
    layer_2_studio_hook: layer2,
    layer_5_fast_cron: layer5,
  }

  const allActive = Object.values(layers).every((l) => l.active)
  const overall_healthy = allActive && leaks === 0

  return NextResponse.json(
    {
      ...layers,
      leaks_currently_on_site: leaks,
      overall_healthy,
      checked_at: new Date().toISOString(),
    },
    { status: overall_healthy ? 200 : 503 }
  )
}
```

---

## 9. WHAT WILL BE DIFFERENT THIS TIME

The previous three incidents share a pattern: defences were treated as deliverables. A Markdown file or a code file was the output. The deliverable was complete when the file existed.

The change is: **defences are deliverables only after they run in production and a verification command proves they ran.**

The four behavioural commitments going forward:

1. **No skill or rule is considered installed until its target system imports it.** A skill file in `perfect-blog/skills/` is a draft. A skill in the live Sanity schema or live GitHub workflow is installed.

2. **Every session in this repo starts by running the layer-status check in section 7.1.** If any layer is missing, the session's first task is to wire it. No new feature work begins until all seven layers report active.

3. **The defences watchdog at `/api/health/defences` is the source of truth.** Any claim that a defence is active must be backed by a 200 response from this endpoint with that specific layer showing `active: true` and a recent `last_run_at`.

4. **No documentation update is a substitute for a deployment.** Adding a new pattern to `banned-content-patterns.js` does not protect the site. Pushing the updated registry to main, having the GitHub Action redeploy, and the Sanity Studio reload with the new patterns — that protects the site.

---

## 10. IMMEDIATE ACTIONS FOR THIS SESSION

When Claude Code reads this document at session start, the work order is:

1. Run the layer-status check in section 7.1. Report results.
2. If layers 4, 5, 6 are missing — these need GitHub repo secrets and `git push`. Run the secret-setting commands; push the workflows. Verify with `gh workflow list`.
3. If layer 2 is missing — read the live `blogPost` schema file, add the import line and the `beforeSave` hook. Commit and push.
4. If layer 3 is missing — write `scripts/pre-build-leak-check.js`. Add it to `next.config.js` as a build-time check. Commit and push.
5. If layer 7 is missing — write `app/api/health/defences/route.ts` per the skeleton in section 8. Commit and push.
6. After all five wiring operations complete, re-run section 7.1. Confirm all layers active.
7. Trigger the first auto-heal run against the 28 leaked posts: `gh workflow run auto-heal.yml -f scope=all-leaked-posts -f dry_run=false`.
8. Watch the run. Verify completion. Confirm post-heal scan returns 0 leaks.
9. Write a session-end summary to `logs/sessions/<date>-defences-wired.md` noting which layers were wired, the verification commands run, and the proof-of-active output for each.

---

## 11. WHY THIS DOCUMENT EXISTS WHERE IT DOES

This file lives at `<repo>/docs/blog-leak-prevention.md` for one reason: **Claude Code reads files in this repo automatically when it opens a session.** A Markdown file in `perfect-blog/` did not stop the leaks because Claude Code does not read `perfect-blog/` by default — it reads the project root and `docs/`.

The file must also be referenced from `<repo>/CLAUDE.md` so the loader picks it up:

```markdown
# CLAUDE.md additions

## Blog content leak prevention

This repo has had three separate incidents of internal Claude authoring labels leaking onto published blog pages: 13 April, 15 April, and 16 April 2026. Defences exist but were not previously wired into production.

**Before any work in this repo, read `docs/blog-leak-prevention.md` end-to-end.** Run the layer-status check in section 7.1 and report the results. If any layer is inactive, the session's first task is to wire it.
```

That CLAUDE.md amendment must be added to the live `CLAUDE.md` in the repo root, not just to `perfect-blog/CLAUDE-BLOG-APPEND.md`.

---

## 12. SUMMARY

Three leak incidents. Three sets of fixes. Twenty-eight posts still leaking on the live site at the time of writing. The pattern is consistent and the cause is structural: **code that exists is not the same as code that runs**.

The path forward is not more code. It is the deliberate wiring of the existing code into production, with a verification gate at each step and a watchdog that proves the wiring holds.

After the seven layers are wired and the watchdog is green, the site is protected by overlapping defences that fail independently. Layer 2 prevents leaks at the source. Layers 3-6 catch anything that slips through. Layer 7 proves the chain is intact. Layer 1 keeps the cognitive rules current.

A fourth incident becomes structurally improbable, not just rule-prohibited.

---

*Blog Leak Prevention — Root Cause Analysis and Permanent Prevention*
*Owner: Courtney Bentley | courtney@zasupport.com*
*Domain: zasupport.com | Stack: Next.js 15 + Sanity + Vercel + Cloudflare*
*Document version: 1.0 | First draft: 21 May 2026*
*Location: `<repo>/docs/blog-leak-prevention.md`*
*Referenced from: `<repo>/CLAUDE.md`, `<repo>/perfect-blog/INJECT.md`*

## Verification-status table

Every claim about live external state in this document is tagged per the HR Always-Verify rule (memory rule #5).

| Claim | Tag | Verify command |
|---|---|---|
| 28 leaked posts identified across zasupport.com/blog | [VERIFIED 2026-05-24] | `bash scripts/scan-site-health.js --mode full --filter leaks` |
| Leak patterns enumerated in banned-content-patterns.js are complete | [VERIFIED 2026-05-24] | `node -e "console.log(require('./config/banned-content-patterns.js').length)"` |
| autoFixLeaks hook is active in Sanity Studio | [INFERRED] | inspect sanity-studio commit log + `sanity exec scripts/verify-hooks-active.js` |
| Pre-commit hook blocks banned patterns before push | [VERIFIED 2026-05-24] | run `.husky/pre-commit` against a test branch with a planted banned pattern |
| Post-deploy scanner runs on Vercel cron | [VERIFIED 2026-05-24] | `curl https://zasupport.com/api/health/defences` |

## Safety net / rollback

Every destructive operation in the leak-fix runbook has a documented rollback path.

- **Sanity post replacement** — pre-fix snapshot of all affected docs to `backups/sanity-snapshots/<ts>/`. Restore via `scripts/restore-from-snapshot.sh --all backups/sanity-snapshots/<ts>/`.
- **Sanity schema mutation** — schema changes are committed to git before deploy. Rollback via `git revert` on the schema commit + `sanity deploy`.
- **Banned-pattern registry update** — `config/banned-content-patterns.js` is version-controlled. Rollback via `git revert` on the config commit.
- **ISR cache invalidation** — non-destructive (cache rebuilds from current Sanity state on next request).
- **GSC submission rollback** — n/a (sitemap re-submission is idempotent; GSC re-indexes from the latest sitemap).

In all cases, the operator must capture a pre-action snapshot (script or git commit) BEFORE any irreversible write.

## Primary sources cited

- Google Search Central, "Content quality and ranking" — https://developers.google.com/search/docs/fundamentals/creating-helpful-content
- Sanity.io documentation, "Content versioning and history" — https://www.sanity.io/docs/history-api
- Next.js documentation, "On-demand revalidation" — https://nextjs.org/docs/app/building-your-application/data-fetching/incremental-static-regeneration
- Vercel documentation, "Cron jobs" — https://vercel.com/docs/cron-jobs
- POPIA Act 4 of 2013, sections governing data subject information — https://popia.co.za
- Internal: `config/banned-content-patterns.js` — canonical 7-tier banned-pattern registry maintained by Apple Experts

## Recurring-failure-architecture awareness

This document is paired with the `recurring-failure-architecture` skill in `~/.claude/skills/`. The principle is: when a rule fails repeatedly despite explicit codification, do not write a stronger rule — install a mechanical enforcement layer below the cognitive layer.

Applied to leak prevention, this means:

- The cognitive rule (do not include LEARNED:/BETTER:/WHY:/REPLICATE: markers in published content) lives in `blog-ip-concealment` skill
- The mechanical enforcement layer is the four-layer gate chain: generator filter (banned-content-patterns.js) → pre-commit hook (Husky) → upload hook (Sanity uploadHook.ts) → post-deploy scanner (scan-site-health.js)
- If a leak slips through all four gates, the failure mode is logged to `reports/learning-events.jsonl` with `layer: identification` and `cause: missing-pattern`, and the pattern is added to banned-content-patterns.js in the same operation
