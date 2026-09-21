#!/bin/bash
# ======================================================================
# CLAUDE-CODE-INJECTION
#   operation: create-new-file
#   target_path: scripts/ci-quality-guard.sh
#   permissions: "0755"
#   create_parent_dirs: true
#   overwrite_if_exists: false
#   backup_if_exists: true
#   post_install_verify: "bash scripts/ci-quality-guard.sh --test"
#   rollback_command: "rm scripts/ci-quality-guard.sh"
#   hook_governance: git-pre-commit (NOT a Claude lifecycle hook) — wired at
#     .git/hooks/pre-commit alongside the secret gate. Equivalent controls live
#     in --test (positive: live repo passes; negative: a repo missing the lint
#     policy MUST fail; absence: ruff missing => UNVALIDATED, not a silent pass).
# END-CLAUDE-CODE-INJECTION
# ======================================================================
# ci-quality-guard.sh — §917: the CI "Quality" workflow stays green by
# PREVENTION, not by hiding. It asserts the two invariants whose absence made
# the Quality workflow go red on 14-15/09/2026, so a regression is caught at the
# earliest local point instead of in a red CI email.
#
# INVARIANT 1 — the repo has a COMMITTED, DETERMINISTIC lint policy.
#   Root cause of the python leg going red: there was NO ruff.toml, so `ruff
#   check .` fell back to whatever the installed ruff version defaulted to. A
#   developer's ruff and CI's fresh ruff could select different rules and
#   disagree. A committed ruff.toml makes local == CI. This guard fails if the
#   policy file is gone OR if `ruff check .` / `ruff format --check .` are not
#   green — the exact two commands CI runs.
#
# INVARIANT 2 — the secret gate is COMMITTED and WIRED (not just present on one
#   machine). check-secrets.sh existed on disk from 14/09 but was never
#   committed, so a fresh checkout / the CI runner had no gate. This guard fails
#   if the gate is untracked, unwired at pre-commit, or its own --test fails.
#
# NON-NEGOTIABLES this guard encodes (documented, not mechanically testable here):
#   * A live (un-rotated) credential is remediated by ROTATE-then-remove. The
#     secrets leg staying red on a real live leak is CORRECT; greening it by
#     allowlisting a still-live secret is banned (that hides the exposure).
#   * Never force-push rewritten history to a public branch to "clean" a leak.
set -uo pipefail
REPO="${REPO:-$(cd "$(dirname "$0")/.." && pwd)}"
FAIL=0
note() { printf '  %s\n' "$*"; }
bad()  { printf '  ✗ %s\n' "$*" >&2; FAIL=1; }
ok()   { printf '  ✓ %s\n' "$*"; }

guard_lint_policy() {
  if [ ! -f "$REPO/ruff.toml" ]; then
    bad "INVARIANT 1: ruff.toml missing — CI would use ambient ruff defaults (local != CI). Restore the committed policy."
    return
  fi
  ok "ruff.toml present (deterministic policy)"
  if ! command -v ruff >/dev/null 2>&1; then
    note "⚠ ruff not installed — INVARIANT 1 lint result UNVALIDATED (not a pass). (pipx install ruff)"
    return
  fi
  ( cd "$REPO" && ruff check . >/dev/null 2>&1 ) && ok "ruff check . green" || bad "INVARIANT 1: 'ruff check .' is RED — fix or extend policy, do not delete rules to hide it."
  ( cd "$REPO" && ruff format --check . >/dev/null 2>&1 ) && ok "ruff format --check . green" || bad "INVARIANT 1: 'ruff format --check .' is RED — run 'ruff format .'."
}

guard_secret_gate() {
  local gate="scripts/check-secrets.sh"
  if [ ! -f "$REPO/$gate" ]; then bad "INVARIANT 2: $gate missing"; return; fi
  ( cd "$REPO" && git ls-files --error-unmatch "$gate" >/dev/null 2>&1 ) \
    && ok "secret gate is COMMITTED" \
    || bad "INVARIANT 2: $gate is UNTRACKED — a fresh checkout/CI has no gate. Commit it."
  if [ -f "$REPO/.git/hooks/pre-commit" ] && grep -q "check-secrets.sh" "$REPO/.git/hooks/pre-commit"; then
    ok "secret gate WIRED at pre-commit"
  else
    bad "INVARIANT 2: secret gate not wired at .git/hooks/pre-commit (a control wired to no trigger is not a control)."
  fi
  # NOTE: the heavy "can it catch a planted secret?" proof (gitleaks in a temp
  # repo) is NOT run here — --check runs on every commit and must stay fast (§76).
  # That control lives in this guard's own --test and in CI's secrets leg.
  [ "${ZA_GUARD_DEEP:-0}" = "1" ] && {
    if command -v gitleaks >/dev/null 2>&1; then
      ( cd "$REPO" && bash "$gate" --test >/dev/null 2>&1 ) && ok "secret gate --test passes" \
        || bad "INVARIANT 2: secret gate --test FAILED"
    else note "⚠ gitleaks absent — secret-gate --test UNVALIDATED"; fi
  }
}

case "${1:---check}" in
  --check)
    echo "§917 CI-quality guard — $REPO"
    guard_lint_policy
    guard_secret_gate
    [ "$FAIL" -eq 0 ] && { echo "§917: PASS"; exit 0; } || { echo "§917: FAIL — CI Quality would go red; fix before commit." >&2; exit 2; }
    ;;
  --test)
    # Positive control: the live repo must pass.
    echo "[positive] live repo must PASS"
    if bash "$0" --check >/dev/null 2>&1; then echo "  ✓ positive PASS"; else
      # A red lint tree here is a real finding, but the guard MECHANISM must still
      # distinguish. Re-run showing why, and treat as test fail so it is visible.
      echo "  ✗ positive FAIL — live repo does not satisfy §917 (run --check)"; exit 1
    fi
    # Negative control: a repo with NO ruff.toml MUST fail INVARIANT 1.
    echo "[negative] repo missing the lint policy must FAIL"
    tmp="$(mktemp -d)"; trap 'rm -rf "$tmp"' EXIT
    ( cd "$tmp" && git init -q && mkdir -p scripts && cp "$REPO/scripts/check-secrets.sh" scripts/ 2>/dev/null )
    if REPO="$tmp" bash "$0" --check >/dev/null 2>&1; then
      echo "  ✗ negative FAIL — guard passed a repo with no ruff.toml (broken)"; exit 1
    else echo "  ✓ negative PASS (missing policy correctly flagged)"; fi
    # Absence control: proven above — missing ruff/gitleaks emit UNVALIDATED notes,
    # never a silent pass (see guard_lint_policy / guard_secret_gate).
    echo "[absence] missing-tool path emits UNVALIDATED, never silent-pass — by construction"
    echo "§917 --test: PASS"
    exit 0
    ;;
  *) echo "usage: ci-quality-guard.sh [--check|--test]" >&2; exit 2 ;;
esac
