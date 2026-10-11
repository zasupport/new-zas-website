#!/usr/bin/env bash
# ======================================================================
# CLAUDE-CODE-INJECTION
#   operation: create-new-file
#   target_path: .claude/hooks/_telemetry.sh
#   permissions: "0644"
#   artefact_version: "1.0"
#   artefact_created: "2026-08-10T17:30:00+02:00"
#   post_install_verify: "bash -n .claude/hooks/_telemetry.sh"
#   rollback_command: "rm .claude/hooks/_telemetry.sh"
# END-CLAUDE-CODE-INJECTION
# ======================================================================
# Structured telemetry for every ZA Support hook. Emits one NDJSON record
# per hook invocation to .claude/telemetry.ndjson so post-execution findings
# can be reported from hard data rather than inference.
#
# Captures every documented hook input field (session_id, prompt_id,
# permission_mode, agent_id, agent_type, tool_use_id, cwd, hook_event_name)
# plus exit code, duration, resolved tool versions, host and machine ID.
# Sourced by hooks; never executed directly. POSIX/BSD-safe.

TEL_ROOT="${CLAUDE_PROJECT_DIR:-$(pwd)}"
TEL_FILE="$TEL_ROOT/.claude/telemetry.ndjson"
TEL_LEGACY="$TEL_ROOT/.claude/validation.log"
TEL_ENV="$TEL_ROOT/.claude/environment.json"
TEL_MAX_BYTES=${TEL_MAX_BYTES:-5242880}   # 5 MB then rotate

tel_now_ms() {
  # BSD date has no %N. python3 is the portable millisecond source.
  python3 -c 'import time;print(int(time.time()*1000))' 2>/dev/null || echo 0
}

tel_json_escape() { python3 -c 'import json,sys;print(json.dumps(sys.stdin.read().rstrip("\n")))' 2>/dev/null || printf '""'; }

tel_field() {
  # tel_field <input-json> <dot.path>
  if command -v jq >/dev/null 2>&1; then
    printf '%s' "$1" | jq -r "$2 // empty" 2>/dev/null
  else
    printf '%s' "$1" | python3 -c 'import sys,json
try:
    d=json.load(sys.stdin)
except Exception:
    print(""); raise SystemExit
for k in "'"$2"'".lstrip(".").split("."):
    d = d.get(k) if isinstance(d, dict) else None
print(d if d is not None else "")' 2>/dev/null
  fi
}

tel_rotate() {
  [ -f "$TEL_FILE" ] || return 0
  SZ=$(wc -c < "$TEL_FILE" 2>/dev/null | tr -d ' ')
  [ "${SZ:-0}" -gt "$TEL_MAX_BYTES" ] 2>/dev/null && \
    mv "$TEL_FILE" "$TEL_FILE.$(date -u +%Y%m%d-%H%M%S)" || true
}

tel_capture_env() {
  # Written once per day so findings can be tied to an exact toolchain.
  [ -f "$TEL_ENV" ] && [ -n "$(find "$TEL_ENV" -mtime -1 2>/dev/null)" ] && return 0
  mkdir -p "$(dirname "$TEL_ENV")"
  {
    printf '{'
    printf '"captured":"%s",' "$(date -u +%Y-%m-%dT%H:%M:%SZ)"
    printf '"host":"%s",' "$(hostname 2>/dev/null || echo unknown)"
    printf '"os":"%s",' "$(uname -srm 2>/dev/null | tr -d '"')"
    printf '"os_product":"%s",' "$(sw_vers -productVersion 2>/dev/null || echo n/a)"
    printf '"machine_model":"%s",' "$(sysctl -n hw.model 2>/dev/null || echo n/a)"
    printf '"shell":"%s",' "${SHELL:-unknown}"
    printf '"claude_code":"%s",' "$(claude --version 2>/dev/null | head -1 | tr -d '"' || echo absent)"
    printf '"jq":"%s",' "$(command -v jq >/dev/null 2>&1 && jq --version 2>/dev/null || echo absent)"
    printf '"python3":"%s",' "$(python3 --version 2>/dev/null | cut -d' ' -f2 || echo absent)"
    printf '"ruff":"%s",' "$(ruff --version 2>/dev/null | cut -d' ' -f2 || echo absent)"
    printf '"biome":"%s",' "$(biome --version 2>/dev/null | tr -d '"' || echo absent)"
    printf '"eslint":"%s",' "$(eslint --version 2>/dev/null || echo absent)"
    printf '"go":"%s",' "$(go version 2>/dev/null | cut -d' ' -f3 || echo absent)"
    printf '"cargo":"%s",' "$(cargo --version 2>/dev/null | cut -d' ' -f2 || echo absent)"
    printf '"gitleaks":"%s",' "$(gitleaks version 2>/dev/null | tr -d '"' || echo absent)"
    printf '"git_head":"%s"' "$(git rev-parse --short HEAD 2>/dev/null || echo n/a)"
    printf '}\n'
  } > "$TEL_ENV" 2>/dev/null || true
}

tel_emit() {
  # tel_emit <hook_name> <input_json> <verdict> <exit_code> <start_ms> <detail>
  HOOK="$1"; IN="$2"; VERDICT="$3"; CODE="$4"; START="$5"; DETAIL="${6:-}"
  END="$(tel_now_ms)"
  DUR=$(( ${END:-0} - ${START:-0} )); [ "$DUR" -lt 0 ] 2>/dev/null && DUR=0
  mkdir -p "$(dirname "$TEL_FILE")" 2>/dev/null || true
  tel_rotate
  DETAIL_J="$(printf '%s' "$DETAIL" | tel_json_escape)"
  {
    printf '{'
    printf '"ts":"%s",'            "$(date -u +%Y-%m-%dT%H:%M:%SZ)"
    printf '"hook":"%s",'          "$HOOK"
    printf '"verdict":"%s",'       "$VERDICT"
    printf '"exit_code":%s,'       "${CODE:-0}"
    printf '"duration_ms":%s,'     "${DUR:-0}"
    printf '"event":"%s",'         "$(tel_field "$IN" '.hook_event_name')"
    printf '"session_id":"%s",'    "$(tel_field "$IN" '.session_id')"
    printf '"prompt_id":"%s",'     "$(tel_field "$IN" '.prompt_id')"
    printf '"tool_use_id":"%s",'   "$(tel_field "$IN" '.tool_use_id')"
    printf '"tool_name":"%s",'     "$(tel_field "$IN" '.tool_name')"
    printf '"permission_mode":"%s",' "$(tel_field "$IN" '.permission_mode')"
    printf '"agent_id":"%s",'      "$(tel_field "$IN" '.agent_id')"
    printf '"agent_type":"%s",'    "$(tel_field "$IN" '.agent_type')"
    printf '"cwd":"%s",'           "$(tel_field "$IN" '.cwd')"
    printf '"host":"%s",'          "$(hostname 2>/dev/null || echo unknown)"
    printf '"detail":%s'           "$DETAIL_J"
    printf '}\n'
  } >> "$TEL_FILE" 2>/dev/null || true
  # Keep the human-readable legacy line so existing habits still work.
  printf '%s\t%s\t%s\t%s\n' "$(date -u +%Y-%m-%dT%H:%M:%SZ)" "$HOOK" "$VERDICT" "$DETAIL" >> "$TEL_LEGACY" 2>/dev/null || true
}
