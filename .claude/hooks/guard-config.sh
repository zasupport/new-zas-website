#!/usr/bin/env bash
# CLAUDE-CODE-INJECTION target_path: .claude/hooks/guard-config.sh permissions: 0755
# ConfigChange. Blocks a config change that would remove the enforcement layer.
set -uo pipefail
INPUT="$(cat 2>/dev/null || echo '{}')"
ROOT="${CLAUDE_PROJECT_DIR:-$(pwd)}"
S="$ROOT/.claude/settings.json"
[ -f "$S" ] || exit 0
MISSING=""
for h in lint-v2.sh secrets.sh test-gate.sh; do
  grep -q "$h" "$S" 2>/dev/null || MISSING="$MISSING $h"
done
grep -q 'disableBypassPermissionsMode' "$S" 2>/dev/null || MISSING="$MISSING disableBypassPermissionsMode"
if [ -n "$MISSING" ]; then
  echo "Refusing config change: enforcement layer would lose:$MISSING" >&2
  exit 2
fi
exit 0
