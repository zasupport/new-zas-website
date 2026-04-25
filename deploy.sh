#!/bin/bash
# ZA Support Website — One-Command Deploy
# Usage: bash deploy.sh
# Prerequisites: git remote set, Vercel CLI installed, env vars set

set -e

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

# 3. Build
echo "→ Building..."
npm run build

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
