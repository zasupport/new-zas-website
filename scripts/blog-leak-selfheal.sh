#!/bin/bash
# blog-leak-selfheal.sh — self-healing rendered-leak loop (§343/§377/§437, 04/06/2026)
#
# Detect → auto-fix → rebuild → re-verify, looping until the BUILT HTML renders zero
# banned content as visible body text, or loud-failing if it cannot heal. This is the
# AUTO-HEAL form of the rendered-leak gate, for the automated overnight pipeline — which
# must NOT fail-closed (an abort = 0-blog day, the §359/§360 failure). Manual deploy.sh
# uses the fail-closed gate (scan-rendered-leaks.py); the pipeline uses THIS (heals then
# proceeds). If it genuinely cannot heal, it loud-fails (§313) rather than ship a leak.
#
# Usage: scripts/blog-leak-selfheal.sh            # scan; heal+rebuild if needed; loop
#        scripts/blog-leak-selfheal.sh --no-build # assume a fresh build already exists
set -uo pipefail
cd "$(dirname "$0")/.."   # repo root
MAX_ITER=3
LOG="${HOME}/.za-blog-leak-selfheal.log"
ts() { date '+%Y-%m-%d %H:%M:%S'; }

# Ensure a build exists to scan (unless caller guarantees one).
if [ "${1:-}" != "--no-build" ] && [ ! -d ".next/server/app/blog" ]; then
  echo "$(ts) no built HTML — building first" | tee -a "$LOG"
  npm run build > /tmp/za-selfheal-build.log 2>&1 || { echo "$(ts) ❌ initial build failed" | tee -a "$LOG"; exit 2; }
fi

for i in $(seq 1 "$MAX_ITER"); do
  if python3 scripts/scan-rendered-leaks.py; then
    echo "$(ts) ✅ self-heal: rendered HTML clean (iteration $i)" | tee -a "$LOG"
    exit 0
  fi
  echo "$(ts) ⚠ self-heal iteration $i — rendered leaks found; applying sanitiser + rebuilding" | tee -a "$LOG"
  python3 scripts/blog_content_sanitiser.py --apply >> "$LOG" 2>&1
  npm run build > /tmp/za-selfheal-build.log 2>&1 || { echo "$(ts) ❌ self-heal: rebuild failed (iter $i)" | tee -a "$LOG"; exit 2; }
done

# Could not heal within MAX_ITER — LOUD FAIL, never ship the leak.
echo "$(ts) ❌ self-heal FAILED after ${MAX_ITER} iterations — rendered leaks persist (§313 loud-fail)" | tee -a "$LOG"
python3 scripts/scan-rendered-leaks.py 2>&1 | tee -a "$LOG"
osascript -e 'display notification "Blog rendered-leak self-heal FAILED — leak NOT shipped" with title "ZA Website" sound name "Basso"' 2>/dev/null || true
exit 1
