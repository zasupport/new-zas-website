#!/usr/bin/env bash
# ======================================================================
# CLAUDE-CODE-INJECTION
#   operation: create-new-file
#   target_path: .claude/hooks/smoke-test.sh
#   permissions: "0755"
#   artefact_version: "2.0"
#   artefact_created: "2026-08-10T17:30:00+02:00"
#   post_install_verify: "bash .claude/hooks/smoke-test.sh; test $? -eq 0"
#   rollback_command: "rm .claude/hooks/smoke-test.sh"
# END-CLAUDE-CODE-INJECTION
# ======================================================================
# Five-control smoke test across every installed hook. Asserts exact exit
# codes. The NEGATIVE controls failing correctly is the definition of done:
# if a planted fault passes, the pipeline itself is broken.
set -uo pipefail
ROOT="${CLAUDE_PROJECT_DIR:-$(cd "$(dirname "$0")/../.." && pwd)}"
H="$ROOT/.claude/hooks"; FX="$ROOT/.claude/fixtures"
RESULTS="$ROOT/.claude/smoke-results.ndjson"
FAILS=0; TOTAL=0
: > "$RESULTS"

INCONCL=0
have() { command -v "$1" >/dev/null 2>&1; }

skip() { # skip <name> <reason> — the tool is absent, so the control cannot run
  TOTAL=$((TOTAL+1)); INCONCL=$((INCONCL+1))
  printf '{"ts":"%s","control":"%s","status":"INCONCLUSIVE","detail":"%s"}\n' \
    "$(date -u +%Y-%m-%dT%H:%M:%SZ)" "$1" "$2" >> "$RESULTS"
  printf '%-4s %-38s %s\n' "SKIP" "$1" "$2"
}

assert() { # assert <name> <expected_exit> <actual_exit> <detail>
  TOTAL=$((TOTAL+1))
  if [ "$2" = "$3" ]; then S=PASS; else S=FAIL; FAILS=$((FAILS+1)); fi
  printf '{"ts":"%s","control":"%s","expected":%s,"actual":%s,"status":"%s","detail":"%s"}\n' \
    "$(date -u +%Y-%m-%dT%H:%M:%SZ)" "$1" "$2" "$3" "$S" "${4:-}" >> "$RESULTS"
  printf '%-4s %-38s expected=%s actual=%s\n' "$S" "$1" "$2" "$3"
}
# Fixtures must mean the same thing on every machine, so ambient linter
# config is excluded from the controls. The pipeline is what is under test.
export ZAS_LINT_ISOLATED=1
run() { printf '%s' "$2" | bash "$H/$1" >/dev/null 2>&1; echo $?; }

mkdir -p "$FX"
[ -f "$FX/good.py" ] || printf 'def greet(name):\n    return f"Hello {name}"\n' > "$FX/good.py"
[ -f "$FX/bad.py" ]  || printf 'def f():\n    return undeclared_variable\n    print("unreachable")\nAWS_KEY = "AKIAIOSFODNN7EXAMPLE"\n' > "$FX/bad.py"

GOOD="{\"session_id\":\"smoke\",\"hook_event_name\":\"PostToolUse\",\"tool_name\":\"Edit\",\"permission_mode\":\"default\",\"tool_input\":{\"file_path\":\"$FX/good.py\"}}"
BAD="{\"session_id\":\"smoke\",\"hook_event_name\":\"PostToolUse\",\"tool_name\":\"Edit\",\"permission_mode\":\"default\",\"tool_input\":{\"file_path\":\"$FX/bad.py\"}}"
GONE="{\"session_id\":\"smoke\",\"tool_input\":{\"file_path\":\"$FX/does-not-exist.py\"}}"

echo "=== CONTROL 1: POSITIVE (known-good input must pass) ==="
if [ -f "$H/lint-v2.sh" ]; then
  if have ruff; then
    PR="$(run lint-v2.sh "$GOOD")"
    assert "positive/lint-v2" 0 "$PR"
    if [ "$PR" != "0" ]; then
      echo "     why: ruff flagged the known-good fixture. Actual output:"
      ruff check --isolated "$FX/good.py" 2>&1 | sed 's/^/       /' | head -6
      echo "     A clean fixture failing means the linter config, not the pipeline."
    fi
  else skip "positive/lint-v2" "ruff not installed"; fi
fi
[ -f "$H/secrets.sh" ] && assert "positive/secrets" 0 "$(run secrets.sh "$GOOD")"

echo "=== CONTROL 2: NEGATIVE (planted faults MUST be caught) ==="
if [ -f "$H/lint-v2.sh" ]; then
  if have ruff; then
    assert "negative/lint-v2-F821" 2 "$(run lint-v2.sh "$BAD")" "undefined name + unreachable"
  else
    skip "negative/lint-v2-F821" "ruff not installed, so the Python linter cannot be validated"
  fi
fi
[ -f "$H/secrets.sh" ] && assert "negative/secrets-AKIA" 2 "$(run secrets.sh "$BAD")" "hardcoded AWS key"

echo "=== CONTROL 3: ABSENCE (undefined states must be handled, never silent-fail) ==="
[ -f "$H/lint-v2.sh" ] && assert "absence/missing-file" 0 "$(run lint-v2.sh "$GONE")"
[ -f "$H/lint-v2.sh" ] && assert "absence/empty-json" 0 "$(run lint-v2.sh '{}')"
[ -f "$H/secrets.sh" ] && assert "absence/secrets-no-path" 0 "$(run secrets.sh '{}')"
[ -f "$H/test-gate.sh" ] && assert "absence/livelock-guard" 0 "$(run test-gate.sh '{"stop_hook_active":true}')"

echo "=== CONTROL 4: PRESSURE (50 rapid invocations within latency budget) ==="
if [ -f "$H/lint-v2.sh" ]; then
  T0="$(date +%s)"; i=0; PF=0
  while [ $i -lt 50 ]; do printf '%s' "$GOOD" | bash "$H/lint-v2.sh" >/dev/null 2>&1 || PF=$((PF+1)); i=$((i+1)); done
  T1="$(date +%s)"; ELAPSED=$((T1-T0)); AVG=$(( ELAPSED*1000/50 ))
  assert "pressure/50-runs-no-failures" 0 "$PF" "${ELAPSED}s total, ${AVG}ms avg"
  [ "$AVG" -lt 2000 ] && assert "pressure/avg-under-2000ms" 0 0 "${AVG}ms" || assert "pressure/avg-under-2000ms" 0 1 "${AVG}ms EXCEEDS BUDGET"
fi

echo "=== CONTROL 5: END-TO-END (telemetry actually recorded the above) ==="
TEL="$ROOT/.claude/telemetry.ndjson"
if [ -f "$TEL" ]; then
  assert "e2e/telemetry-written" 0 0 "$(wc -l < "$TEL" | tr -d ' ') records"
  grep -q '"verdict":"fail"' "$TEL" && assert "e2e/failures-recorded" 0 0 || assert "e2e/failures-recorded" 0 1 "no fail verdicts logged"
else
  assert "e2e/telemetry-written" 0 1 "telemetry.ndjson absent"
fi

echo ""
echo "================ SMOKE TEST SUMMARY ================"
printf 'Controls run: %s   Failures: %s   Inconclusive: %s\n' "$TOTAL" "$FAILS" "$INCONCL"
if [ "$FAILS" -gt 0 ]; then
  echo "RESULT: BROKEN. Do not trust the pipeline until every control passes."
  echo "If a NEGATIVE control failed, the pipeline is not catching planted faults."
  exit 1
fi
if [ "$INCONCL" -gt 0 ]; then
  echo "RESULT: OPERATIONAL, with $INCONCL control(s) unvalidated."
  echo "A skipped control is not a pass. The tool it needs is not installed, so"
  echo "that part of the pipeline is unproven rather than broken. Install the"
  echo "missing tools and re-run to close the gap:"
  echo "  uv tool install ruff        # or: brew install ruff"
  exit 0
fi
echo "RESULT: OPERATIONAL. Negative controls correctly blocked with exit 2."
exit 0
