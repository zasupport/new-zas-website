#!/usr/bin/env bash
# ======================================================================
# CLAUDE-CODE-INJECTION
#   operation: create-new-file
#   target_path: .claude/hooks/guard-new-automation.sh
#   permissions: "0755"
#   artefact_version: "1.0"
#   artefact_created: "2026-08-10T16:45:00+02:00"
#   depends_on: [hook-block-mandate.md]
#   post_install_verify: "printf '{}' | bash .claude/hooks/guard-new-automation.sh; test $? -le 2"
#   rollback_command: "rm .claude/hooks/guard-new-automation.sh"
# END-CLAUDE-CODE-INJECTION
# ======================================================================
# Meta-enforcement for the hook-block-schema-mandate (Stop event, added to
# the same matcher group as test-gate.sh so both run in parallel).
# Mechanically checkable portion: a *.sh/*.py/*.plist file created or
# modified in this session's git working tree under scripts/, hooks/, or
# automation paths must be referenced by .claude/settings.json OR have a
# fixture under .claude/fixtures/. The judgement portion (is the wiring
# CORRECT) stays cognitive and is covered by the rule file + smoke test.
set -euo pipefail
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
# Livelock guard first (shared Stop-event discipline)
[ "$(json_get '.stop_hook_active')" = "true" ] && exit 0

ROOT="${CLAUDE_PROJECT_DIR:-$(pwd)}"
SETTINGS="$ROOT/.claude/settings.json"
HOOK_DIR="$(cd "$(dirname "$0")" && pwd)"
# shellcheck source=/dev/null
[ -f "$HOOK_DIR/_telemetry.sh" ] && . "$HOOK_DIR/_telemetry.sh" || { tel_emit() { :; }; tel_capture_env() { :; }; tel_now_ms() { echo 0; }; }
T_START="$(tel_now_ms)"; tel_capture_env

cd "$ROOT" 2>/dev/null || exit 0
command -v git >/dev/null 2>&1 || exit 0
[ -d .git ] || exit 0

MISSING=""
# New or modified automation files in the working tree (uncommitted session work)
CANDIDATES="$( { git diff --name-only HEAD 2>/dev/null; git ls-files --others --exclude-standard 2>/dev/null; } \
  | grep -E '\.(sh|py|plist)$' | grep -Ev '^\.claude/fixtures/' | sort -u || true )"

for f in $CANDIDATES; do
  base="$(basename "$f")"
  stem="${base%.*}"
  wired=0
  # Referenced in settings hooks wiring?
  if [ -f "$SETTINGS" ] && grep -q "$base" "$SETTINGS" 2>/dev/null; then wired=1; fi
  # Or has any fixture carrying its stem?
  if ls "$ROOT/.claude/fixtures/" 2>/dev/null | grep -q "$stem"; then wired=1; fi
  # Or is itself a hook/smoke component already in .claude/hooks/?
  case "$f" in .claude/hooks/*) wired=1;; esac
  [ "$wired" = "0" ] && MISSING="$MISSING $f"
done

if [ -n "$MISSING" ]; then
  tel_emit "guard-new-automation" "$INPUT" "block" 2 "$T_START" "unwired:$MISSING"
  {
    echo "Hook block schema mandate: these new automation files have no hooks wiring and no fixture:"
    for f in $MISSING; do echo "  - $f"; done
    echo "Add the settings.json hook entry (managed block), paired deny rules, and a positive/negative/absence fixture set, then re-verify with /hooks. See .claude/rules/hook-block-mandate.md."
  } >&2
  exit 2
fi
tel_emit "guard-new-automation" "$INPUT" "pass" 0 "$T_START" "candidates_checked=$(printf '%s' "$CANDIDATES" | wc -w | tr -d ' ')"
exit 0
