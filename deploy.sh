#!/bin/bash
# ZA Support Website — One-Command Deploy
# Usage: bash deploy.sh
# Prerequisites: git remote set, Vercel CLI installed, env vars set

set -e

echo "=== ZA Support Website Deploy ==="
echo "$(date '+%d/%m/%Y %H:%M')"

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
echo "✓ Deploy triggered — Vercel will auto-build from GitHub push"
echo "✓ Live at: https://zasupport.com (once DNS points to Vercel)"
echo "✓ Preview at: https://new-zas-website.vercel.app"
echo ""

# macOS notification
osascript -e 'display notification "ZA Support website deployed successfully" with title "Deploy Complete" sound name "Glass"' 2>/dev/null || true
afplay /System/Library/Sounds/Glass.aiff 2>/dev/null || true
