#!/usr/bin/env bash
# ======================================================================
# CLAUDE-CODE-INJECTION
#   operation: create-new-file
#   target_path: .claude/hooks/guard-bash.sh
#   permissions: "0755"
#   artefact_version: "1.1"
#   post_install_verify: "printf '{\"tool_input\":{\"command\":\"ls\"},\"permission_mode\":\"default\"}' | bash .claude/hooks/guard-bash.sh"
#   rollback_command: "rm .claude/hooks/guard-bash.sh"
# END-CLAUDE-CODE-INJECTION
# ======================================================================
# PreToolUse interceptor. Demonstrates all three documented capabilities:
# INTERCEPT (runs before the tool), VALIDATE (permissionDecision deny/ask),
# and MODIFY (updatedInput rewrites the arguments before execution).
set -uo pipefail
INPUT="$(cat)"
HOOK_DIR="$(cd "$(dirname "$0")" && pwd)"
[ -f "$HOOK_DIR/_telemetry.sh" ] && . "$HOOK_DIR/_telemetry.sh" || { tel_emit(){ :; }; tel_capture_env(){ :; }; tel_now_ms(){ echo 0; }; }
T_START="$(tel_now_ms)"
jget() {
  if command -v jq >/dev/null 2>&1; then printf '%s' "$INPUT" | jq -r "$1 // empty"
  else printf '%s' "$INPUT" | python3 -c 'import sys,json
try: d=json.load(sys.stdin)
except Exception: print(""); raise SystemExit
for k in "'"$1"'".lstrip(".").split("."):
    d=d.get(k) if isinstance(d,dict) else None
print(d if d is not None else "")'
  fi
}
CMD="$(jget '.tool_input.command')"; MODE="$(jget '.permission_mode')"

deny() {
  printf '{"hookSpecificOutput":{"hookEventName":"PreToolUse","permissionDecision":"deny","permissionDecisionReason":"%s"}}' "$1"
  tel_emit "guard-bash" "$INPUT" "deny" 0 "$T_START" "$1"; exit 0
}
modify() { # rewrite the command before it runs
  NEW="$(printf '%s' "$1" | python3 -c 'import sys,json;print(json.dumps(sys.stdin.read().strip()))')"
  printf '{"hookSpecificOutput":{"hookEventName":"PreToolUse","updatedInput":{"command":%s},"permissionDecision":"allow","permissionDecisionReason":"%s"}}' "$NEW" "$2"
  tel_emit "guard-bash" "$INPUT" "modified" 0 "$T_START" "$2"; exit 0
}

# VALIDATE: guardrail GR-003, refuse to operate without permission checks
[ "$MODE" = "bypassPermissions" ] && deny "GR-003: bypassPermissions is disabled for this repository"
# VALIDATE: destructive commands
case "$CMD" in
  *"rm -rf /"*|*"rm -rf ~"*|*"rm -rf \$HOME"*|*":(){:|:&};:"*|*"mkfs"*|*"dd if=/dev/zero"*)
    deny "Destructive command blocked" ;;
  *"git push --force"*|*"git push -f"*)
    deny "Force push blocked; use --force-with-lease and push manually" ;;
esac
# MODIFY: make irreversible database work reversible by default
case "$CMD" in
  *"alembic downgrade"*)
    printf '%s' "$CMD" | grep -q -- "--sql" || modify "$CMD --sql" "Rewritten to --sql so the downgrade is emitted, not executed" ;;
esac
tel_emit "guard-bash" "$INPUT" "allow" 0 "$T_START" "no rule matched"
exit 0
