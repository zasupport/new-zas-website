#!/bin/bash
# ZA Support Website — One-Command Deploy
# Usage: bash deploy.sh
# Prerequisites: git remote set, Vercel CLI installed, env vars set

set -e

# §autodev overnight guard (10/06/2026): while the unattended overnight autodev loop is
# active, ALL deploys to live main are STRUCTURALLY disabled — overnight work stages on a
# branch for morning review only (advisor: no unattended production deploys). Remove flag to re-enable.
if [ -f "$HOME/.za-overnight-ACTIVE" ]; then
  echo "⛔ Overnight autodev active (~/.za-overnight-ACTIVE) — live deploys disabled until morning review."
  echo "   Work is staged on the autodev branch. Remove the flag to deploy manually."
  exit 9
fi

echo "=== ZA Support Website Deploy ==="
echo "$(date '+%d/%m/%Y %H:%M')"

# 0. Blog content-leak gate (§290 + ZAS-WEB-INC-20260423-1535)
echo "→ Scanning blog page.tsx for scaffolding / FAQ-Schema leaks..."
python3 scripts/scan-blog-leaks.py

# 0.5 Pricing disclaimer audit (§287 + §244)
echo "→ Auditing pricing pages for <PricingNote>..."
bash "$HOME/bin/za-pricing-disclaimer-audit.sh" --check

# 1. Type check
echo "→ Type checking..."
npx tsc --noEmit

# 2. Lint
echo "→ Linting..."
npm run lint

# 2.5 §529/§401/§399 redirect↔sitemap consistency gate (Fable audit step 5, 11/06/2026) —
# fail-closed. A redirected slug must NEVER appear in sitemap.ts (sitemap advertising a
# 308 URL orphans it + confuses Google's canonical). §377 positive control:
# scripts/test runs the gate against an injected collision and expects exit 1.
echo "→ Checking redirect↔sitemap consistency..."
node scripts/check-redirect-sitemap-consistency.mjs || { echo "ERROR: redirect↔sitemap consistency gate FAILED — a redirected slug is still in sitemap.ts. Remove it from src/app/sitemap.ts."; exit 1; }

# 2.6 §402 blog-index ORPHAN gate (20/07/2026) — fail-closed. Every slug advertised in
# sitemap.ts must be LINKED from the blog index, or Google cannot discover it by crawling.
# Born from 27 real orphans: a reachability detector had already found them and written them
# to a status file the same morning, and nothing blocked, so they sat there. Detecting into a
# file is not a control. Fix with: python3 scripts/fix-blog-index-orphans.py --apply
echo "→ Checking blog-index orphans (§402)..."
python3 scripts/check-blog-index-orphans.py --check || { echo "ERROR: §402 orphan gate FAILED — sitemap URLs are linked from nothing. Run: python3 scripts/fix-blog-index-orphans.py --apply"; exit 1; }

# 3. Build
echo "→ Building..."
npm run build

# 3.5 RENDERED-HTML leak gate (§343/§377/§404 + §426 consumer-side) — fail-closed.
# Scans the BUILT HTML (the true rendered surface) for BANNED content rendered as
# VISIBLE body text (raw JSON-LD, ```fences, schema headings, Word-count metadata).
# The source-side scan (step 0) cannot catch these: fence-toggle math / embedded
# <script> blocks render schema as VISIBLE text on the live page (the recurring leak).
echo "→ Scanning RENDERED HTML for visible banned-content leaks..."
python3 scripts/scan-rendered-leaks.py || { echo "ERROR: rendered-leak gate FAILED — aborting deploy. Fix: python3 scripts/blog_content_sanitiser.py --apply"; exit 1; }

# 3.6 §547 TYPOGRAPHIC-DASH gate (em-dash/en-dash AI-tell) — fail-closed.
# Banned by Courtney repeatedly; never enforced (§206 was prose-only, no test = §404).
# AI generators emit — / – by default; this is the backstop (insertion sanitiser is
# the prevention). Range-safe transform: en-dash -> hyphen, em-dash -> comma/colon.
echo "→ Scanning live src for banned em/en-dashes (§547)..."
python3 scripts/strip-typographic-dashes.py --scan || { echo "ERROR: §547 dash gate FAILED — aborting deploy. Fix: python3 scripts/strip-typographic-dashes.py --apply"; exit 1; }

# 3.7 §287-T TURNAROUND / LEAD-TIME CLAUSE gate — fail-closed.
# Every device-repair page showing a price or turnaround MUST render the
# machine-dependent processing/lead-time clause (PricingNote, repair default true).
# Managed-services / business / contract pages must opt out (repair={false}).
echo "→ Verifying machine-dependent lead-time clause on price/turnaround pages (§287-T)..."
python3 scripts/check-turnaround-clause.py || { echo "ERROR: §287-T lead-time clause gate FAILED — aborting deploy. Add <PricingNote /> to the flagged page(s) or <PricingNote repair={false} /> on contract pages."; exit 1; }

# 3.75 ROBOTS RENDER-RESOURCE gate — fail-closed (GSC WNC-20237597, 04/07/2026).
# robots.ts must keep /_next/static/ + /_next/image/ crawlable — blocking them
# causes "Indexed, though blocked by robots.txt" warnings + under-rendering.
echo "→ Verifying robots.txt keeps Next render resources crawlable..."
python3 scripts/check-robots-next-static.py || { echo "ERROR: robots render-resource gate FAILED — aborting deploy. Remove /_next/ from the disallow array in src/app/robots.ts."; exit 1; }

# 3.8 §671 BLOG SITEMAP-RECONCILE gate — fail-closed. A blog slug in page.tsx must be
# in sitemap.ts (discoverable) OR 301'd in next.config.ts (§529). Orphans = live but
# undiscoverable (the recurring §346/§402 failure). Kills the class manual reconciles kept missing.
echo "→ Verifying every blog post is discoverable or redirected (§671 reconcile)..."
python3 scripts/check-blog-sitemap-reconcile.py || { echo "ERROR: §671 reconcile gate FAILED — a blog post is live but absent from sitemap. Add it to src/app/sitemap.ts OR 301 it in next.config.ts (§529)."; exit 1; }

# 4. Git push (triggers Vercel auto-deploy)
echo "→ Pushing to GitHub..."
# Stage tracked files and new source files only — never accidentally stage .env secrets
git add src/ public/ package.json package-lock.json next.config.ts vercel.json tsconfig.json deploy.sh .github/ scripts/ 2>/dev/null || true
# Safety: unstage any env files that may have been caught
git reset HEAD '.env*' '.env.local' '.env.*.local' '**/.env*' 2>/dev/null || true
# Guard: abort if any secrets accidentally staged
if git diff --cached --name-only | grep -qE '\.env|secret.*\.(json|yaml|yml)'; then
  echo "ERROR: Sensitive file staged — aborting deploy. Review staged files with: git diff --cached --name-only"
  exit 1
fi
git commit -m "deploy: $(date '+%d/%m/%Y %H:%M') — auto-deploy" || echo "Nothing to commit"
git push origin main

echo ""
echo "✓ Deploy triggered — waiting 90s for Vercel to build..."
sleep 90

# Poll /api/health until new commit SHA is live (max 3 min)
NEW_SHA=$(git rev-parse --short HEAD)
for i in $(seq 1 12); do
  LIVE_SHA=$(curl -s "https://zasupport.com/api/health" --max-time 10 2>/dev/null | python3 -c "import json,sys; print(json.load(sys.stdin).get('version','')[:7])" 2>/dev/null || echo "")
  [[ "$LIVE_SHA" == "$NEW_SHA" ]] && { echo "✓ Deploy live — version $NEW_SHA confirmed"; break; }
  echo "  Waiting for deploy... attempt $i (live=$LIVE_SHA want=$NEW_SHA)"
  sleep 15
done

# Run full E2E test against live site
echo ""
echo "=== Running E2E verification ==="
if bash ~/bin/za-e2e-test.sh 2>&1; then
  echo "✓ All E2E checks passed"
  osascript -e 'display notification "Deploy verified — 0 failures" with title "Deploy Complete" sound name "Glass"' 2>/dev/null || true
else
  echo "❌ E2E failures detected — check output above and fix before calling done"
  osascript -e 'display notification "Deploy has E2E failures — fix required" with title "Deploy Warning" sound name "Basso"' 2>/dev/null || true
  exit 1
fi
afplay /System/Library/Sounds/Glass.aiff 2>/dev/null || true
