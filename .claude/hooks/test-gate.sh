#!/usr/bin/env bash
# ======================================================================
# CLAUDE-CODE-INJECTION
#   operation: create-new-file
#   target_path: .claude/hooks/test-gate.sh
#   permissions: "0755"
#   artefact_version: "1.1"
#   artefact_created: "2026-08-10T17:30:00+02:00"
#   post_install_verify: "printf '{\"stop_hook_active\":true}' | bash .claude/hooks/test-gate.sh; test $? -eq 0"
#   rollback_command: "rm .claude/hooks/test-gate.sh"
# END-CLAUDE-CODE-INJECTION
# ======================================================================
# Stop / SubagentStop verification gate. Tier 2 checks live here so the
# per-edit hot path stays fast: type-check then tests. Livelock-guarded and
# service-aware so it never jams on infrastructure outside Claude's control.
set -uo pipefail
INPUT="$(cat)"
HOOK_DIR="$(cd "$(dirname "$0")" && pwd)"
# shellcheck source=/dev/null
[ -f "$HOOK_DIR/_telemetry.sh" ] && . "$HOOK_DIR/_telemetry.sh" || { tel_emit() { :; }; tel_capture_env() { :; }; tel_now_ms() { echo 0; }; }
T_START="$(tel_now_ms)"
json_get() {
  if command -v jq >/dev/null 2>&1; then printf '%s' "$INPUT" | jq -r "$1 // empty"
  else printf '%s' "$INPUT" | python3 -c 'import sys,json
try: d=json.load(sys.stdin)
except Exception: print(""); raise SystemExit
for k in "'"$1"'".lstrip(".").split("."):
    d=d.get(k) if isinstance(d,dict) else None
print(d if d is not None else "")'
  fi
}
# Livelock guard FIRST, before any work
[ "$(json_get '.stop_hook_active')" = "true" ] && { tel_emit "test-gate" "$INPUT" "skip" 0 "$T_START" "stop_hook_active"; exit 0; }
ROOT="${CLAUDE_PROJECT_DIR:-$(pwd)}"; cd "$ROOT" 2>/dev/null || exit 0
TMP="$(mktemp -d)"; trap 'rm -rf "$TMP"' EXIT

# Service detection: an outage is not Claude's fault, so advise, never block
if [ -n "${DATABASE_URL:-}" ] && command -v pg_isready >/dev/null 2>&1; then
  pg_isready -q 2>/dev/null || { tel_emit "test-gate" "$INPUT" "advisory" 0 "$T_START" "Postgres unavailable, gate skipped"; exit 0; }
fi

FAILED=""
# TIER 2 type-check, runs in parallel with nothing else blocking
if [ -f tsconfig.json ] && command -v tsc >/dev/null 2>&1; then
  tsc --noEmit > "$TMP/tsc.out" 2>&1 || FAILED="$FAILED tsc"
fi
if command -v mypy >/dev/null 2>&1 && [ -f pyproject.toml ]; then
  mypy . > "$TMP/mypy.out" 2>&1 || FAILED="$FAILED mypy"
fi
# TIER 2 tests
if [ -f package.json ] && command -v npm >/dev/null 2>&1 && grep -q '"test"' package.json 2>/dev/null; then
  npm test --silent > "$TMP/test.out" 2>&1 || FAILED="$FAILED npm-test"
elif command -v pytest >/dev/null 2>&1 && { [ -d tests ] || [ -f pytest.ini ] || [ -f pyproject.toml ]; }; then
  pytest -q > "$TMP/test.out" 2>&1 || FAILED="$FAILED pytest"
fi

if [ -z "$FAILED" ]; then
  tel_emit "test-gate" "$INPUT" "pass" 0 "$T_START" "all tier-2 checks passed"; exit 0
fi
{
  echo "Verification gate failed:$FAILED. Fix before completing."
  for f in "$TMP"/*.out; do [ -f "$f" ] && { echo "--- $(basename "$f") ---"; tail -c 1500 "$f"; }; done
} >&2
tel_emit "test-gate" "$INPUT" "block" 2 "$T_START" "failed:$FAILED"
exit 2
