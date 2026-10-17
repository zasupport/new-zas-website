#!/usr/bin/env bash
# ======================================================================
# CLAUDE-CODE-INJECTION
#   operation: create-new-file
#   target_path: .claude/hooks/lint-v2.sh
#   permissions: "0755"
#   artefact_version: "2.0"
#   artefact_created: "2026-08-10T16:45:00+02:00"
#   depends_on: []
#   post_install_verify: "printf '{\"tool_input\":{\"file_path\":\".claude/fixtures/good.py\"}}' | bash .claude/hooks/lint-v2.sh; test $? -eq 0"
#   rollback_command: "rm .claude/hooks/lint-v2.sh"
# END-CLAUDE-CODE-INJECTION
# ======================================================================
# Tiered self-healing lint dispatcher (T5).
# TIER 0 (hot path, target <2s): Ruff / Biome / gofmt+go vet — per edited file,
#   auto-fix first, re-lint, exit 2 with residuals so Claude self-corrects.
# TIER 1 (hot path with timeout): ESLint non-type-aware, scoped golangci-lint,
#   incremental clippy — parallel background subshells with wait.
# TIER 2 (NOT here): type-aware ESLint (no-floating-promises), tsc --noEmit,
#   mypy/pyright, full-repo lint — these live in the Stop gate and CI so
#   accuracy is re-sequenced, never sacrificed. The planted floating-promise
#   negative control is caught at the Stop/CI tier by design.
# Parallelism: settings.json already runs sibling handlers (secrets.sh) in
# parallel; inside this script, independent tools on the same file run as
# background jobs joined with wait.
set -uo pipefail
INPUT="$(cat)"
json_get() {
  if command -v jq >/dev/null 2>&1; then printf '%s' "$INPUT" | jq -r "$1 // empty"
  else printf '%s' "$INPUT" | python3 -c 'import sys,json
d=json.load(sys.stdin)
for k in "'"$1"'".lstrip(".").split("."):
    d=d.get(k) if isinstance(d,dict) else None
print(d if d is not None else "")'
  fi
}
FILE="$(json_get '.tool_input.file_path')"
ROOT="${CLAUDE_PROJECT_DIR:-$(pwd)}"
# Structured telemetry: full hook context, timings, exit codes
HOOK_DIR="$(cd "$(dirname "$0")" && pwd)"
# shellcheck source=/dev/null
[ -f "$HOOK_DIR/_telemetry.sh" ] && . "$HOOK_DIR/_telemetry.sh" || { tel_emit() { :; }; tel_capture_env() { :; }; tel_now_ms() { echo 0; }; }
T_START="$(tel_now_ms)"; tel_capture_env
LANG_USED=""; TOOL_USED=""
log() { tel_emit "lint-v2" "$INPUT" "$1" "${2:-0}" "$T_START" "${3:-}"; }
have() { command -v "$1" >/dev/null 2>&1; }

# Absence controls: undefined outcomes are banned
[ -z "$FILE" ] && { log "advisory" 0 "no file_path in input"; exit 0; }
[ -f "$FILE" ] || { log "advisory" 0 "file absent: $FILE"; exit 0; }

TMP="$(mktemp -d)"; trap 'rm -rf "$TMP"' EXIT
RESID=""

case "$FILE" in
  *.py)
    if have ruff; then
      # ZAS_LINT_ISOLATED=1 pins ruff to its own defaults, ignoring any
      # pyproject.toml or ruff.toml discovered up the directory tree. The
      # smoke test sets this so its fixtures mean the same thing everywhere.
      RUFF_ISO=""
      [ "${ZAS_LINT_ISOLATED:-0}" = "1" ] && RUFF_ISO="--isolated"
      # TIER 0: fix and format in parallel, then a single re-lint pass
      ruff check $RUFF_ISO --fix -q "$FILE" >/dev/null 2>&1 &
      P1=$!
      ruff format $RUFF_ISO -q "$FILE" >/dev/null 2>&1 &
      P2=$!
      wait "$P1" "$P2" 2>/dev/null || true
      TOOL_USED="ruff"; RESID="$(ruff check $RUFF_ISO -q "$FILE" 2>&1 || true)"
    else log "advisory" 0 "ruff absent for $FILE"; exit 0; fi ;;
  *.ts|*.tsx|*.js|*.jsx)
    if have biome; then
      TOOL_USED="biome"; biome check --write "$FILE" >/dev/null 2>&1 || true
      RESID="$(biome check "$FILE" 2>&1 | grep -Ev '^$' | head -40 || true)"
      biome check "$FILE" >/dev/null 2>&1 || RESID="${RESID:-issues found}"
      biome check "$FILE" >/dev/null 2>&1 && RESID=""
    elif have eslint || [ -x "$ROOT/node_modules/.bin/eslint" ]; then
      TOOL_USED="eslint"; ES="$(command -v eslint || echo "$ROOT/node_modules/.bin/eslint")"
      # TIER 1: non-type-aware only in the hot path; --cache for warm re-runs
      "$ES" --fix --cache --cache-location "$ROOT/.claude/.eslintcache" "$FILE" >/dev/null 2>&1 || true
      "$ES" --cache --cache-location "$ROOT/.claude/.eslintcache" "$FILE" > "$TMP/es.out" 2>&1 || RESID="$(cat "$TMP/es.out")"
    else log "advisory" 0 "no JS/TS linter for $FILE"; exit 0; fi ;;
  *.go)
    if have gofmt; then gofmt -w "$FILE" >/dev/null 2>&1 || true; fi
    if have go; then
      # TIER 0: vet only the containing package (fast, catches unreachable code)
      TOOL_USED="go vet"; ( cd "$(dirname "$FILE")" && go vet ./... > "$TMP/vet.out" 2>&1 ) || RESID="$(head -40 "$TMP/vet.out")"
    else log "advisory" 0 "go toolchain absent"; exit 0; fi ;;
  *.rs)
    if have cargo; then
      # TIER 1: incremental clippy with warm target dir; bounded output
      TOOL_USED="clippy"; cargo clippy --quiet 2> "$TMP/clip.out" || true
      grep -E '^(error|warning)' "$TMP/clip.out" | head -40 > "$TMP/clip.trim" || true
      [ -s "$TMP/clip.trim" ] && RESID="$(cat "$TMP/clip.trim")"
    else log "advisory" 0 "cargo absent"; exit 0; fi ;;
  *) exit 0 ;;
esac

if [ -n "$RESID" ]; then
  log "fail" 2 "residuals in $FILE tool=$TOOL_USED"
  { echo "Lint residuals in $FILE (auto-fix already applied; correct these):"
    printf '%s\n' "$RESID" | head -c 6000; } >&2
  exit 2
fi
log "pass" 0 "clean $FILE tool=$TOOL_USED"
exit 0
