#!/usr/bin/env bash
# ======================================================================
# CLAUDE-CODE-INJECTION
#   operation: create-new-file
#   target_path: .claude/hooks/secrets.sh
#   permissions: "0755"
#   artefact_version: "1.1"
#   artefact_created: "2026-08-10T17:30:00+02:00"
#   post_install_verify: "printf '{}' | bash .claude/hooks/secrets.sh; test $? -eq 0"
#   rollback_command: "rm .claude/hooks/secrets.sh"
# END-CLAUDE-CODE-INJECTION
# ======================================================================
# PostToolUse secrets scan. Runs in parallel with lint-v2 (sibling handlers
# in one matcher group execute concurrently). gitleaks when present, bounded
# BSD-safe regex fallback otherwise. Never silent-passes.
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
FILE="$(json_get '.tool_input.file_path')"
[ -z "$FILE" ] && { tel_emit "secrets" "$INPUT" "advisory" 0 "$T_START" "no file_path"; exit 0; }
[ -f "$FILE" ] || { tel_emit "secrets" "$INPUT" "advisory" 0 "$T_START" "file absent"; exit 0; }

if command -v gitleaks >/dev/null 2>&1; then
  if ! gitleaks detect --no-git --source "$FILE" >/dev/null 2>&1; then
    echo "Potential secret detected in $FILE. Remove it before continuing." >&2
    tel_emit "secrets" "$INPUT" "fail" 2 "$T_START" "gitleaks flagged $FILE"; exit 2
  fi
  tel_emit "secrets" "$INPUT" "pass" 0 "$T_START" "gitleaks clean $FILE"; exit 0
fi
# Fallback: grep -E only, never grep -P (BSD compatibility)
if grep -Eq '(AKIA[0-9A-Z]{16}|ASIA[0-9A-Z]{16}|-----BEGIN [A-Z ]*PRIVATE KEY-----|sk-[A-Za-z0-9]{32,}|ghp_[A-Za-z0-9]{36})' "$FILE" 2>/dev/null; then
  echo "Potential secret pattern in $FILE. Remove it before continuing." >&2
  tel_emit "secrets" "$INPUT" "fail" 2 "$T_START" "regex flagged $FILE (gitleaks absent)"; exit 2
fi
tel_emit "secrets" "$INPUT" "pass" 0 "$T_START" "regex clean $FILE (gitleaks absent)"
exit 0
