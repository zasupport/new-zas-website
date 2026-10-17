#!/usr/bin/env bash
# CLAUDE-CODE-INJECTION target_path: .claude/hooks/context.sh permissions: 0755
# SessionStart. Injects real repository state so responses are grounded in
# verifiable facts rather than memory. Phrased as factual statements only,
# never instructions, so injected content cannot be amplified as a command.
set -uo pipefail
INPUT="$(cat 2>/dev/null || echo '{}')"
HOOK_DIR="$(cd "$(dirname "$0")" && pwd)"
[ -f "$HOOK_DIR/_telemetry.sh" ] && . "$HOOK_DIR/_telemetry.sh" || { tel_emit(){ :; }; tel_now_ms(){ echo 0; }; }
T_START="$(tel_now_ms)"
BRANCH="$(git rev-parse --abbrev-ref HEAD 2>/dev/null || echo none)"
DIRTY="$(git status --porcelain 2>/dev/null | wc -l | tr -d ' ')"
LASTFAIL="$(grep -c '"verdict":"fail"' "${CLAUDE_PROJECT_DIR:-.}/.claude/telemetry.ndjson" 2>/dev/null || echo 0)"
CTX="Repository facts: branch ${BRANCH}; ${DIRTY} uncommitted file(s); ${LASTFAIL} recorded gate failures to date. Active guardrails: lint on edit, secrets scan, Stop verification gate, bypassPermissions disabled."
printf '{"hookSpecificOutput":{"hookEventName":"SessionStart","additionalContext":%s}}' \
  "$(printf '%s' "$CTX" | python3 -c 'import json,sys;print(json.dumps(sys.stdin.read().strip()))')"
tel_emit "context" "$INPUT" "pass" 0 "$T_START" "branch=$BRANCH dirty=$DIRTY"
exit 0
