#!/usr/bin/env bash
# ======================================================================
# CLAUDE-CODE-INJECTION
#   operation: create-new-file
#   target_path: .claude/hooks/collect-diagnostics.sh
#   permissions: "0755"
#   artefact_version: "1.0"
#   artefact_created: "2026-08-10T17:30:00+02:00"
#   post_install_verify: "bash .claude/hooks/collect-diagnostics.sh && test -f .claude/diagnostics-latest.md"
#   rollback_command: "rm .claude/hooks/collect-diagnostics.sh"
# END-CLAUDE-CODE-INJECTION
# ======================================================================
# Produces ONE file containing everything needed to report accurate findings
# after execution. Run it, then paste or upload .claude/diagnostics-latest.md.
# Redacts secrets before output. Read-only: changes nothing.
set -uo pipefail
ROOT="${CLAUDE_PROJECT_DIR:-$(pwd)}"
OUT="$ROOT/.claude/diagnostics-latest.md"
TEL="$ROOT/.claude/telemetry.ndjson"
ENVF="$ROOT/.claude/environment.json"
mkdir -p "$ROOT/.claude"

redact() {
  # Never leak credentials into a diagnostics paste.
  sed -E \
    -e 's/(AKIA|ASIA)[0-9A-Z]{16}/[REDACTED-AWS-KEY]/g' \
    -e 's/(sk-|ghp_|gho_|xoxb-)[A-Za-z0-9_-]{16,}/[REDACTED-TOKEN]/g' \
    -e 's/(password|passwd|secret|token|api_key)([[:space:]]*[=:][[:space:]]*)[^[:space:]]+/\1\2[REDACTED]/gI'
}

{
printf '# ZA Support Claude Code diagnostics\n\n'
printf 'Generated: %s\n\n' "$(date -u +%Y-%m-%dT%H:%M:%SZ)"

printf '## 1. Environment\n\n```json\n'
[ -f "$ENVF" ] && cat "$ENVF" || printf '{"note":"environment.json absent, hooks may not have run yet"}\n'
printf '\n```\n\n'

printf '## 2. Installed hook wiring\n\n```json\n'
if [ -f "$ROOT/.claude/settings.json" ]; then
  python3 -c "
import json,sys
try:
    d=json.load(open('$ROOT/.claude/settings.json'))
    print(json.dumps({'hooks':d.get('hooks',{}),'permissions':d.get('permissions',{})},indent=2))
except Exception as e:
    print(json.dumps({'error':str(e)}))" 2>/dev/null || echo '{"error":"settings.json unparseable"}'
else
  printf '{"error":"no .claude/settings.json"}\n'
fi
printf '```\n\n'

printf '## 3. Hook scripts present\n\n```\n'
ls -l "$ROOT/.claude/hooks/" 2>/dev/null || echo "(no hooks directory)"
printf '```\n\n'

printf '## 4. Script integrity (sha256)\n\n```\n'
for f in "$ROOT"/.claude/hooks/*.sh; do
  [ -f "$f" ] || continue
  H="$(shasum -a 256 "$f" 2>/dev/null | cut -c1-16 || python3 -c "import hashlib;print(hashlib.sha256(open('$f','rb').read()).hexdigest()[:16])")"
  printf '%s  %6sB  %s\n' "$H" "$(wc -c < "$f" | tr -d ' ')" "$(basename "$f")"
done
printf '```\n\n'

printf '## 5. Telemetry summary\n\n'
if [ -f "$TEL" ]; then
  python3 -c "
import json,collections
recs=[]
for l in open('$TEL'):
    try: recs.append(json.loads(l))
    except Exception: pass
print(f'Total records: {len(recs)}\n')
if recs:
    by=collections.Counter((r.get('hook',''),r.get('verdict','')) for r in recs)
    print('| Hook | Verdict | Count | Median ms | Max ms |')
    print('|---|---|---|---|---|')
    for (h,v),c in sorted(by.items()):
        ds=sorted(r.get('duration_ms',0) for r in recs if r.get('hook')==h and r.get('verdict')==v)
        med=ds[len(ds)//2] if ds else 0
        print(f'| {h} | {v} | {c} | {med} | {max(ds) if ds else 0} |')
    print()
    sess=set(r.get('session_id','') for r in recs if r.get('session_id'))
    print(f'Distinct sessions: {len(sess)}')
    modes=collections.Counter(r.get('permission_mode','') for r in recs if r.get('permission_mode'))
    print(f'Permission modes seen: {dict(modes)}')
    bad=[r for r in recs if r.get('permission_mode')=='bypassPermissions']
    print(f'bypassPermissions events: {len(bad)}  (must be 0)')
" 2>/dev/null || echo "(telemetry parse failed)"
else
  printf 'No telemetry file. Hooks have not fired, or CLAUDE_PROJECT_DIR was unset.\n'
fi
printf '\n'

printf '## 6. Last 40 telemetry records\n\n```json\n'
[ -f "$TEL" ] && tail -40 "$TEL" | redact || echo "(none)"
printf '```\n\n'

printf '## 7. Failures and advisories only\n\n```json\n'
[ -f "$TEL" ] && grep -E '"verdict":"(fail|block|advisory)"' "$TEL" 2>/dev/null | tail -30 | redact || echo "(none)"
printf '```\n\n'

printf '## 8. Weekly audit state (T1)\n\n```\n'
AS="${CC_AUDIT_STATE:-$HOME/.zas/cc-audit}"
if [ -d "$AS" ]; then
  printf 'last-seen-version: %s\n' "$( [ -f "$AS/last-seen-version" ] && cat "$AS/last-seen-version" || echo none )"
  HB="$( [ -f "$AS/heartbeat" ] && cat "$AS/heartbeat" || echo 0 )"
  NOW="$(date -u +%s)"
  printf 'heartbeat age: %s hours\n' "$(( (NOW - HB) / 3600 ))"
  printf 'briefs pending in inbox: %s\n' "$(ls "${CC_AUDIT_INBOX:-$HOME/ZA-AutoRun/inbox}" 2>/dev/null | wc -l | tr -d ' ')"
  printf '\n--- last 15 audit log lines ---\n'
  tail -15 "$AS/audit.log" 2>/dev/null
else
  printf '(no audit state at %s)\n' "$AS"
fi
printf '```\n\n'

printf '## 9. launchd agent status\n\n```\n'
if command -v launchctl >/dev/null 2>&1; then
  for L in com.zasupport.ccwatchdog.weekly com.zasupport.ccwatchdog.heartbeat com.zasupport.ccadvisor; do
    printf '%s: ' "$L"
    launchctl print "gui/$(id -u)/$L" 2>/dev/null | grep -E 'state|last exit code|runs' | tr '\n' ' ' || printf 'NOT LOADED'
    printf '\n'
  done
else
  printf '(launchctl unavailable on this host)\n'
fi
printf '```\n\n'

printf '## 10. Git state\n\n```\n'
( cd "$ROOT" && git rev-parse --short HEAD 2>/dev/null && git status --porcelain 2>/dev/null | head -25 ) || echo "(not a git repo)"
printf '```\n\n'

printf '## 11. Known limitations of this report\n\n'
printf -- '- Telemetry only covers hooks that fired. Hooks never triggered leave no trace, so absence here is not proof of correctness.\n'
printf -- '- Durations include process spawn overhead. The first run of a day also pays environment-capture cost.\n'
printf -- '- Secrets are redacted, so a flagged finding shows the file and rule but never the value.\n'
printf -- '- launchd state reflects this machine only. Run on both the M5 Pro and M1 Pro to compare.\n'
} > "$OUT" 2>/dev/null

printf 'Diagnostics written: %s (%s bytes)\n' "$OUT" "$(wc -c < "$OUT" | tr -d ' ')"
