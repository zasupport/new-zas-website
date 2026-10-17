#!/usr/bin/env bash
# ======================================================================
# CLAUDE-CODE-INJECTION
#   operation: create-new-file
#   target_path: scripts/smoke-seo-pipeline.sh
#   permissions: "0755"
#   create_parent_dirs: true
#   overwrite_if_exists: false
#   backup_if_exists: true
#   post_install_verify: "bash scripts/smoke-seo-pipeline.sh --self-test"
#   rollback_command: "git checkout -- scripts/smoke-seo-pipeline.sh"
# END-CLAUDE-CODE-INJECTION
# ======================================================================
# Equivalent-control smoke for the Daily SEO Intelligence + Commercial
# Discovery pipeline scripts (hook-block-mandate exemption clause: these are
# CLI pipeline stages with no Claude lifecycle touchpoint beyond edit-time
# lint, stated explicitly here). Runs every governed script's own --test
# (each embeds positive/negative/absence controls) and writes a dated
# evidence report into the repo. Exit 0 only when ALL pass.
#
#   --all         run every governed script's --test, write evidence report
#   --self-test   positive / negative / absence controls for this runner
set -uo pipefail

REPO="$(cd "$(dirname "$0")/.." && pwd)"
cd "$REPO" || exit 1

GOVERNED="
scripts/daily-seo-collect.py
scripts/daily-seo-normalize.py
scripts/daily-seo-analyze.py
scripts/daily-seo-healthcheck.py
scripts/daily-seo-report.py
scripts/discovery-snapshot.py
scripts/discovery-source-health.py
scripts/discovery-gap-detect.py
scripts/discovery-keyword-intent-expand.py
scripts/discovery-score.py
scripts/discovery-decision.py
scripts/discovery-operationalization-check.py
scripts/discovery-next-step.py
scripts/discovery-report.py
scripts/discovery-self-gap-pass1.py
scripts/discovery-self-gap-pass2.py
scripts/discovery-self-gap-merge.py
scripts/test-daily-seo-intelligence.py
"

run_set() {
  # $1 = newline list of scripts, $2 = evidence file ("" = stdout only)
  local list="$1" evidence="$2" fail=0 total=0
  local line results=""
  for s in $list; do
    total=$((total + 1))
    if [ ! -f "$s" ]; then
      line="ABSENT  $s (file missing — advisory, counted as failure in --all)"
      fail=$((fail + 1))
    else
      if python3 "$s" --test >/dev/null 2>&1; then
        line="PASS    $s"
      else
        line="FAIL    $s (python3 $s --test exited $?)"
        fail=$((fail + 1))
      fi
    fi
    echo "$line"
    results="${results}${line}
"
  done
  if [ -n "$evidence" ]; then
    {
      echo "---"
      echo "title: Daily SEO / Commercial Discovery smoke evidence"
      echo "generated_utc: $(date -u +%Y%m%dT%H%M%SZ)"
      echo "runner: scripts/smoke-seo-pipeline.sh --all"
      echo "verdict: $([ "$fail" -eq 0 ] && echo ALL-PASS || echo "FAIL(${fail}/${total})")"
      echo "claude_code_injection:"
      echo "  target_path: ${evidence}"
      echo "  permissions: \"0644\""
      echo "  create_parent_dirs: true"
      echo "  overwrite_if_exists: false"
      echo "  backup_if_exists: true"
      echo "  post_install_verify: \"test -s ${evidence}\""
      echo "  rollback_command: \"git rm -f ${evidence}\""
      echo "---"
      echo ""
      echo "Each line is the real exit status of that script's own --test"
      echo "(positive/negative/absence controls embedded per script)."
      echo ""
      printf '%s' "$results"
    } > "$evidence"
    echo "evidence: $evidence"
  fi
  return "$fail"
}

case "${1:-}" in
--all)
  EV="docs/operating-system/daily-seo-intelligence/SMOKE-EVIDENCE-$(date -u +%Y%m%dT%H%M%SZ).md"
  run_set "$GOVERNED" "$EV"
  RC=$?
  [ "$RC" -eq 0 ] && echo "RESULT: ALL PASS" || echo "RESULT: $RC FAILURE(S)"
  exit "$RC"
  ;;
--self-test)
  T="$(mktemp -d)"
  N=0
  F=0
  chk() {
    N=$((N + 1))
    if [ "$2" = "$3" ]; then printf 'PASS  %-38s exp=%s act=%s\n' "$1" "$2" "$3"; else
      printf 'FAIL  %-38s exp=%s act=%s\n' "$1" "$2" "$3"
      F=$((F + 1))
    fi
  }
  # positive: a governed script whose --test passes -> run_set exit 0
  printf '#!/usr/bin/env python3\nimport sys\nsys.exit(0)\n' > "$T/ok.py"
  run_set "$T/ok.py" "" >/dev/null 2>&1
  chk "positive/passing-test-accepted" 0 "$?"
  # negative: planted fault (--test exits 1) MUST be caught -> nonzero
  printf '#!/usr/bin/env python3\nimport sys\nsys.exit(1)\n' > "$T/bad.py"
  run_set "$T/bad.py" "" >/dev/null 2>&1
  RC=$?
  chk "negative/planted-fault-caught" 1 "$([ "$RC" -ge 1 ] && echo 1 || echo 0)"
  # absence: missing file is a recorded advisory failure, never a crash
  run_set "$T/does-not-exist.py" "" >/dev/null 2>&1
  RC=$?
  chk "absence/missing-file-handled" 1 "$([ "$RC" -ge 1 ] && echo 1 || echo 0)"
  rm -rf "$T"
  printf '\nControls: %s  Failures: %s\n' "$N" "$F"
  [ "$F" -gt 0 ] && { echo "RESULT: BROKEN"; exit 1; }
  echo "RESULT: OPERATIONAL"
  exit 0
  ;;
*)
  echo "usage: $0 --all | --self-test" >&2
  exit 64
  ;;
esac
