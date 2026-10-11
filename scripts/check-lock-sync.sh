#!/bin/bash
# check-lock-sync.sh — package.json <-> package-lock.json sync gate.
#
# WHY: 14/09/2026 the "Robots Guard / typecheck" CI job failed in 14s because
# package.json declared @playwright/test ^1.47.0 but package-lock.json had no
# entry for it (added to package.json without regenerating the lock). `npm ci`
# refuses an out-of-sync lock (EUSAGE), so build + typecheck never even ran.
# CI caught it AFTER a push (a red email). This gate moves the catch EARLIER —
# to the commit that would carry the drift — it does NOT replace CI, which
# remains the backstop.
#
# DESIGN (honest, non-theatre):
#   - Fires ONLY when package.json or package-lock.json is staged (pre-commit),
#     or unconditionally when run with --check / --test.
#   - Uses the SAME check CI uses: `npm ci --dry-run` (exit 0 = in sync).
#   - Distinguishes PROVABLE drift (block) from CANNOT-CHECK e.g. offline
#     (warn, do not block — a flaky hard-gate just gets --no-verify'd). CI still
#     backstops the cannot-check case.
#
# Usage:
#   check-lock-sync.sh --pre-commit   # gate: only if package files staged
#   check-lock-sync.sh --check        # gate: always check, this repo
#   check-lock-sync.sh --test         # negative control: prove it CAN fail
set -uo pipefail
REPO="${REPO:-$(cd "$(dirname "$0")/.." && pwd)}"

drift_check() {
  # Runs in $1 (a repo dir). Echoes verdict, returns:
  #   0 = in sync | 1 = provable drift | 2 = could not check (offline/other)
  local dir="$1"
  local out rc
  out="$(cd "$dir" && npm ci --dry-run --no-audit --no-fund 2>&1)"; rc=$?
  if [ "$rc" -eq 0 ]; then
    return 0
  fi
  # EUSAGE + the specific sync language / Missing: lines = provable drift.
  if printf '%s' "$out" | grep -qiE 'can only install packages when your package\.json and package-lock\.json|Missing: .* from lock file|Invalid: lock file|EUSAGE'; then
    printf '%s\n' "$out" | grep -iE 'Missing:|Invalid:|can only install' >&2
    return 1
  fi
  # Non-zero for another reason (no network, registry down, npm missing).
  printf 'check-lock-sync: could not verify lock sync (npm exit %s, likely offline). CI will backstop.\n' "$rc" >&2
  return 2
}

case "${1:---pre-commit}" in
  --pre-commit)
    if git -C "$REPO" diff --cached --name-only 2>/dev/null | grep -qE '^(package\.json|package-lock\.json)$'; then
      drift_check "$REPO"; rc=$?
      if [ "$rc" -eq 1 ]; then
        echo "pre-commit: lock-sync gate FAILED — package.json and package-lock.json are out of sync." >&2
        echo "  Fix: run 'npm install' (or 'npm install --package-lock-only'), then 'git add package-lock.json' and re-commit." >&2
        exit 1
      fi
    fi
    exit 0
    ;;
  --check)
    drift_check "$REPO"; rc=$?
    [ "$rc" -eq 1 ] && { echo "lock-sync: OUT OF SYNC (fix: npm install)"; exit 1; }
    [ "$rc" -eq 0 ] && echo "lock-sync: in sync"
    exit 0
    ;;
  --test)
    # Negative control (§704): a deliberately out-of-sync fixture MUST be blocked.
    tmp="$(mktemp -d)"; trap 'rm -rf "$tmp"' EXIT
    cat > "$tmp/package.json" <<'JSON'
{ "name": "fixture", "version": "1.0.0",
  "dependencies": { "left-pad": "^1.3.0" } }
JSON
    # Lock that does NOT contain left-pad => provably out of sync.
    cat > "$tmp/package-lock.json" <<'JSON'
{ "name": "fixture", "version": "1.0.0", "lockfileVersion": 3, "requires": true,
  "packages": { "": { "name": "fixture", "version": "1.0.0" } } }
JSON
    drift_check "$tmp"; rc=$?
    if [ "$rc" -eq 1 ]; then
      echo "check-lock-sync --test: PASS (out-of-sync fixture was detected)"
      exit 0
    elif [ "$rc" -eq 2 ]; then
      echo "check-lock-sync --test: SKIP (could not run npm — offline). Re-run online."
      exit 0
    else
      echo "check-lock-sync --test: FAIL (out-of-sync fixture was NOT detected)" >&2
      exit 1
    fi
    ;;
  *)
    echo "usage: check-lock-sync.sh [--pre-commit|--check|--test]" >&2; exit 2 ;;
esac
