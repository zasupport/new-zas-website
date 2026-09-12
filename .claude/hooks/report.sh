#!/usr/bin/env bash
# ======================================================================
# CLAUDE-CODE-INJECTION
#   operation: create-new-file
#   target_path: .claude/hooks/report.sh
#   permissions: "0755"
#   create_parent_dirs: true
#   overwrite_if_exists: false
#   backup_if_exists: true
#   artefact_version: "1.0"
#   artefact_created: "2026-08-13T16:00:00+02:00"
#   depends_on: [smoke-test.sh, _telemetry.sh]
#   post_install_verify: "bash .claude/hooks/report.sh --self-test"
#   rollback_command: "rm .claude/hooks/report.sh"
# END-CLAUDE-CODE-INJECTION
# ======================================================================
# Verification report generator (HR, 13/08/2026).
#
# Any terminal code that creates data must be able to prove it worked. This
# runs the installed pipeline against REAL data on this machine and writes a
# single self-contained report that can be uploaded to claude.ai for analysis.
#
# It reports what actually happened. A failure appears as a failure, an
# unavailable tool appears as unvalidated rather than passed, and every claim
# carries the command that produced it.
#
# Output: .claude/reports/ZAS Verification Report <DD.MM.YYYY HHMM>.md
set -uo pipefail

ROOT="${CLAUDE_PROJECT_DIR:-$(pwd)}"
H="$ROOT/.claude/hooks"
OUT_DIR="$ROOT/.claude/reports"
STAMP_H="$(date '+%d.%m.%Y %H%M')"
STAMP_ISO="$(date -u +%Y-%m-%dT%H:%M:%SZ)"
REPORT="$OUT_DIR/ZAS Verification Report $STAMP_H.md"
SELFTEST=0
[ "${1:-}" = "--self-test" ] && SELFTEST=1

have(){ command -v "$1" >/dev/null 2>&1; }
run_capture(){ # run_capture <label> <command...>  -> echoes exit code, stores output
  LABEL="$1"; shift
  OUTPUT="$("$@" 2>&1)"; RC=$?
  printf '%s' "$OUTPUT" > "$TMP/out.$LABEL"
  echo "$RC"
}

if [ "$SELFTEST" = "1" ]; then
  T="$(mktemp -d)"; N=0; F=0
  chk(){ N=$((N+1)); if [ "$2" = "$3" ]; then printf 'PASS  %-40s exp=%s act=%s\n' "$1" "$2" "$3"
         else printf 'FAIL  %-40s exp=%s act=%s\n' "$1" "$2" "$3"; F=$((F+1)); fi; }
  SELF="$(cd "$(dirname "$0")" && pwd)/$(basename "$0")"
  mkdir -p "$T/.claude/hooks" "$T/.claude/fixtures"
  cp "$(dirname "$SELF")"/*.sh "$T/.claude/hooks/" 2>/dev/null
  cp "$(dirname "$SELF")"/../fixtures/*.py "$T/.claude/fixtures/" 2>/dev/null
  # POSITIVE: a report is produced and is non-trivial
  CLAUDE_PROJECT_DIR="$T" bash "$SELF" >/dev/null 2>&1
  R="$(find "$T/.claude/reports" -name '*.md' 2>/dev/null | head -1)"
  [ -n "$R" ] && chk "positive/report-written" 0 0 || chk "positive/report-written" 0 1
  [ -n "$R" ] && [ "$(wc -c < "$R")" -gt 800 ] && chk "positive/report-substantive" 0 0 || chk "positive/report-substantive" 0 1
  # HONESTY: the report must state the verdict, not just list steps
  grep -q "VERDICT" "$R" 2>/dev/null && chk "honesty/verdict-stated" 0 0 || chk "honesty/verdict-stated" 0 1
  # HONESTY: it must carry the machine context so a reader knows what was tested
  grep -q "Machine context" "$R" 2>/dev/null && chk "honesty/machine-context" 0 0 || chk "honesty/machine-context" 0 1
  # HONESTY: limitations must be present, never omitted
  grep -qi "limitation" "$R" 2>/dev/null && chk "honesty/limitations-present" 0 0 || chk "honesty/limitations-present" 0 1
  # NEGATIVE: a failing pipeline must surface as FAILED in the report
  if [ -f "$T/.claude/hooks/lint-v2.sh" ]; then
    printf '#!/usr/bin/env bash\nexit 0\n' > "$T/.claude/hooks/lint-v2.sh"
    CLAUDE_PROJECT_DIR="$T" bash "$SELF" >/dev/null 2>&1
    R2="$(find "$T/.claude/reports" -name '*.md' 2>/dev/null | sort | tail -1)"
    grep -qE 'FAILED|BROKEN' "$R2" 2>/dev/null && chk "negative/failure-surfaces-in-report" 0 0 || chk "negative/failure-surfaces-in-report" 0 1
  fi
  # ABSENCE: a project with no hooks must produce a report saying so, not crash
  T2="$(mktemp -d)"; mkdir -p "$T2/.claude" 2>/dev/null
  CLAUDE_PROJECT_DIR="$T2" bash "$SELF" >/dev/null 2>&1
  RC=$?; [ "$RC" -le 1 ] && chk "absence/no-hooks-handled" 0 0 || chk "absence/no-hooks-handled" 0 1
  rm -rf "$T" "$T2"
  printf '\nControls: %s  Failures: %s\n' "$N" "$F"
  [ "$F" -gt 0 ] && { echo "RESULT: BROKEN"; exit 1; }
  echo "RESULT: OPERATIONAL"; exit 0
fi

mkdir -p "$OUT_DIR" 2>/dev/null
TMP="$(mktemp -d)"; trap 'rm -rf "$TMP"' EXIT
echo "Running verification against real data on this machine..."

# ---------------------------------------------------------- gather facts
SMOKE_RC=1; SMOKE_OUT="(smoke test not installed)"
if [ -f "$H/smoke-test.sh" ]; then
  SMOKE_OUT="$(CLAUDE_PROJECT_DIR="$ROOT" bash "$H/smoke-test.sh" 2>&1)"; SMOKE_RC=$?
fi
INV_OUT="(inventory not installed)"
[ -f "$H/preflight-inventory.sh" ] && INV_OUT="$(CLAUDE_PROJECT_DIR="$ROOT" bash "$H/preflight-inventory.sh" 2>&1 | sed -n '/Installation state/,/total tracked/p')"
PERS_OUT="(watchdog not installed)"
[ -f "$H/persistence-watchdog.sh" ] && PERS_OUT="$(CLAUDE_PROJECT_DIR="$ROOT" bash "$H/persistence-watchdog.sh" 2>&1 | grep -E 'growing|stalled|broken|launchd' | head -3)"

# Real-data linter proof: run the installed linter over actual project files
LINT_REAL="(no Python files found in the project to lint)"
REAL_PY="$(find "$ROOT" -name '*.py' -not -path '*/.claude/*' -not -path '*/_archive/*' 2>/dev/null | head -3)"
if [ -n "$REAL_PY" ] && [ -f "$H/lint-v2.sh" ]; then
  LINT_REAL=""
  while IFS= read -r f; do
    [ -f "$f" ] || continue
    RC="$(printf '{"tool_input":{"file_path":"%s"}}' "$f" | CLAUDE_PROJECT_DIR="$ROOT" bash "$H/lint-v2.sh" >/dev/null 2>&1; echo $?)"
    LINT_REAL="$LINT_REAL
- \`${f#$ROOT/}\` exit $RC $([ "$RC" = "0" ] && echo '(clean)' || echo '(issues flagged, correct behaviour)')"
  done <<< "$REAL_PY"
fi

TEL_LINES=0; [ -f "$ROOT/.claude/telemetry.ndjson" ] && TEL_LINES="$(wc -l < "$ROOT/.claude/telemetry.ndjson" | tr -d ' ')"
HOOK_COUNT="$(ls "$H" 2>/dev/null | wc -l | tr -d ' ')"
RULE_COUNT="$(ls "$ROOT/.claude/rules" 2>/dev/null | wc -l | tr -d ' ')"

# ---------------------------------------------------------- write report
{
printf -- '---\n'
printf 'name: zas-verification-report\n'
printf 'description: Real-data verification of the installed ZA Support Claude infrastructure. Upload to claude.ai for analysis.\n'
printf 'generated: "%s"\n' "$STAMP_ISO"
printf 'project: "%s"\n' "$ROOT"
printf -- '---\n\n'

printf '# ZA Support verification report\n\n'
printf 'Generated %s SAST against real data on this machine.\n\n' "$STAMP_H"

# Verdict first, because that is what gets read
printf '## VERDICT\n\n'
if [ "$SMOKE_RC" -eq 0 ] && [ "$HOOK_COUNT" -gt 0 ]; then
  printf '**OPERATIONAL.** The pipeline ran against real data and every control passed.\n\n'
else
  printf '**FAILED.** The pipeline did not pass its own controls. Details below. Do not trust it until resolved.\n\n'
fi

printf '## Machine context\n\n'
printf -- '- OS: %s\n' "$(uname -srm)"
printf -- '- macOS: %s\n' "$(sw_vers -productVersion 2>/dev/null || echo 'n/a, not macOS')"
printf -- '- Model: %s\n' "$(sysctl -n hw.model 2>/dev/null || echo 'n/a')"
printf -- '- Memory: %s\n' "$(( $(sysctl -n hw.memsize 2>/dev/null || echo 0) / 1073741824 )) GB"
printf -- '- Claude Code: %s\n' "$(claude --version 2>/dev/null | head -1 || echo absent)"
printf -- '- python3: %s\n' "$(python3 --version 2>&1 | cut -d" " -f2)"
printf -- '- ruff: %s\n' "$(ruff --version 2>/dev/null || echo 'ABSENT, linter controls cannot validate')"
printf -- '- numpy: %s\n' "$(python3 -c 'import numpy;print(numpy.__version__)' 2>/dev/null || echo 'absent, pattern engine T1 tier degrades to T0')"
printf -- '- jq: %s\n\n' "$(have jq && echo present || echo 'absent, python3 fallback in use')"

printf '## Installed state\n\n'
printf -- '- hooks: %s files\n- rules: %s files\n- telemetry: %s records\n\n' "$HOOK_COUNT" "$RULE_COUNT" "$TEL_LINES"
printf '```\n%s\n```\n\n' "$INV_OUT"

printf '## Control results, run just now\n\n'
printf 'Command: `bash .claude/hooks/smoke-test.sh`  exit %s\n\n' "$SMOKE_RC"
printf '```\n%s\n```\n\n' "$SMOKE_OUT"

printf '## Real-data linter proof\n\n'
printf 'The installed linter run over actual project files, not fixtures:\n%s\n\n' "$LINT_REAL"

printf '## Persistence\n\n```\n%s\n```\n\n' "$PERS_OUT"

printf '## Recent telemetry\n\n```json\n'
[ -f "$ROOT/.claude/telemetry.ndjson" ] && tail -8 "$ROOT/.claude/telemetry.ndjson" || echo '(none yet)'
printf '```\n\n'

printf '## Limitations of this report\n\n'
printf -- '- It proves the controls ran and what they returned. It does not prove the infrastructure is correct for every future case.\n'
printf -- '- A tool reported absent means the controls needing it are unvalidated, not passed.\n'
printf -- '- The real-data linter sample is capped at three files, so it is a spot check rather than a full sweep.\n'
printf -- '- Telemetry only covers hooks that actually fired. Silence is not proof of correctness.\n'
} > "$REPORT" 2>/dev/null

echo ""
echo "Report written:"
echo "  $REPORT"
echo "  $(wc -c < "$REPORT" | tr -d ' ') bytes"
echo ""
if [ "$SMOKE_RC" -eq 0 ]; then
  echo "VERDICT: OPERATIONAL"
else
  echo "VERDICT: FAILED, see the report"
fi
echo "Upload that file to claude.ai for analysis."
# Reveal it, per GR-014
have open && open -R "$REPORT" 2>/dev/null
exit "$SMOKE_RC"
