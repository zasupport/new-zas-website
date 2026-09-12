#!/usr/bin/env bash
# CLAUDE-CODE-INJECTION target_path: .claude/hooks/session-end-learning.sh permissions: 0755
# SessionEnd. Cannot block and shares a 1.5s budget, so it only appends.
# Promotion rule: a rule failing three or more times becomes a guardrail candidate.
set -uo pipefail
INPUT="$(cat 2>/dev/null || echo '{}')"
ROOT="${CLAUDE_PROJECT_DIR:-$(pwd)}"
LEDGER="$ROOT/.claude/learning-ledger.md"
TEL="$ROOT/.claude/telemetry.ndjson"
REASON="$(printf '%s' "$INPUT" | python3 -c 'import sys,json
try: print(json.load(sys.stdin).get("reason",""))
except Exception: print("")' 2>/dev/null)"
[ -f "$TEL" ] || exit 0
python3 - "$TEL" "$LEDGER" "$REASON" <<'PY' 2>/dev/null
import json,sys,time,collections,os
tel,ledger,reason=sys.argv[1],sys.argv[2],sys.argv[3]
c=collections.Counter()
for l in open(tel,errors="replace"):
    try: r=json.loads(l)
    except Exception: continue
    if r.get("verdict") in ("fail","block"): c[r.get("hook","?")]+=1
os.makedirs(os.path.dirname(ledger),exist_ok=True)
with open(ledger,"a") as f:
    f.write(f"- {time.strftime('%Y-%m-%dT%H:%M:%SZ',time.gmtime())} reason={reason or 'other'} interventions={dict(c)}\n")
    for hook,n in c.items():
        if n>=3:
            f.write(f"  - PROMOTION CANDIDATE: {hook} intervened {n} times. A rule failing repeatedly is an architecture signal; consider promoting it to a guardrail in guardrails.json.\n")
PY
exit 0
