#!/usr/bin/env bash
# CLAUDE-CODE-INJECTION target_path: .claude/hooks/statusline.sh permissions: 0755
# statusLine command. Only the first stdout line is displayed. Streams the
# latest gate verdict and session cost back to the terminal each turn.
set -uo pipefail
IN="$(cat 2>/dev/null || echo '{}')"
G() { printf '%s' "$IN" | python3 -c 'import sys,json
try: d=json.load(sys.stdin)
except Exception: print(""); raise SystemExit
for k in "'"$1"'".split("."):
    d=d.get(k) if isinstance(d,dict) else None
print(d if d is not None else "")' 2>/dev/null; }
DIR="$(G workspace.current_dir)"; [ -z "$DIR" ] && DIR="$(pwd)"
TEL="$DIR/.claude/telemetry.ndjson"
V="no gate data"
[ -f "$TEL" ] && V="$(tail -1 "$TEL" | python3 -c 'import sys,json
try:
    r=json.load(sys.stdin); print(f"{r.get(\"hook\",\"?\")}:{r.get(\"verdict\",\"?\")} {r.get(\"duration_ms\",0)}ms")
except Exception: print("no gate data")' 2>/dev/null)"
COST="$(G cost.total_cost_usd)"
printf '%s | gate %s | $%s\n' "$(G model.display_name)" "$V" "${COST:-0}"
