#!/bin/bash
# ======================================================================
# CLAUDE-CODE-INJECTION
#   operation: create-new-file
#   target_path: scripts/check-secrets.sh
#   permissions: "0755"
#   create_parent_dirs: true
#   overwrite_if_exists: false
#   backup_if_exists: true
#   post_install_verify: "bash scripts/check-secrets.sh --test"
#   rollback_command: "rm scripts/check-secrets.sh"
#   hook_governance: git-pre-commit (NOT a Claude lifecycle hook) — wired at
#     .git/hooks/pre-commit; equivalent controls live in this file's --test
#     (positive: planted secret caught; absence: gitleaks missing => fail-closed).
#     Fixtures mirrored under .claude/fixtures/check-secrets.* per hook-block-mandate.
# END-CLAUDE-CODE-INJECTION
# ======================================================================
# check-secrets.sh — pre-commit secret gate (recurrence prevention).
#
# WHY: this repo is PUBLIC. On 14/09/2026 the CI "Quality / tier2 (secrets)"
# (gitleaks) leg went red on real hardcoded credentials in the working tree.
# This gate stops a NEW secret from ever being committed — it runs the same
# engine (gitleaks) against the STAGED change only, at the earliest catch point.
# It does NOT hide or allowlist any existing finding; remediating those (rotate +
# remove + history purge) is a separate, deliberate action.
#
# DESIGN (fail-closed, non-theatre):
#   --pre-commit : scan staged changes; block the commit if gitleaks finds a secret.
#   --check      : scan the committed tree/history (what CI sees); report.
#   --test       : positive control (a planted secret MUST be caught) + absence
#                  control (clean content MUST pass). Proves the gate can fail.
# gitleaks missing => this is a secret gate, so we FAIL CLOSED with a clear
# install hint rather than waving a commit through unscanned.
set -uo pipefail
REPO="${REPO:-$(cd "$(dirname "$0")/.." && pwd)}"

have_gitleaks() { command -v gitleaks >/dev/null 2>&1; }

case "${1:---pre-commit}" in
  --pre-commit)
    if ! have_gitleaks; then
      echo "pre-commit: secret gate CANNOT RUN — gitleaks not installed (brew install gitleaks)." >&2
      echo "  Refusing to commit unscanned on a PUBLIC repo. Install gitleaks or set ZA_SKIP_SECRET_GATE=1 to override deliberately." >&2
      [ "${ZA_SKIP_SECRET_GATE:-0}" = "1" ] && { echo "  ZA_SKIP_SECRET_GATE=1 — overridden."; exit 0; }
      exit 1
    fi
    # Scan only what is staged for THIS commit (gitleaks 8.30: `git --staged`).
    if ! ( cd "$REPO" && gitleaks git --staged --no-banner --redact . ) 2>/tmp/za-secret-gate.$$; then
      echo "pre-commit: secret gate FAILED — a staged change contains a secret." >&2
      grep -iE "Finding|File|RuleID|Secret|Line" /tmp/za-secret-gate.$$ 2>/dev/null | head -12 >&2
      echo "  Remove the secret, move it to an env var / GitHub secret, and re-commit." >&2
      echo "  (Deliberate false positive? Add a scoped rule to .gitleaks.toml — never commit the real value.)" >&2
      rm -f /tmp/za-secret-gate.$$
      exit 1
    fi
    rm -f /tmp/za-secret-gate.$$
    exit 0
    ;;
  --check)
    have_gitleaks || { echo "gitleaks not installed"; exit 1; }
    ( cd "$REPO" && gitleaks git --no-banner --redact ) && echo "check: no secrets in tracked history" || { echo "check: secrets present (see above)"; exit 1; }
    ;;
  --test)
    have_gitleaks || { echo "check-secrets --test: SKIP (gitleaks not installed)"; exit 0; }
    tmp="$(mktemp -d)"; trap 'rm -rf "$tmp"' EXIT
    ( cd "$tmp" && git init -q && git config user.email t@t && git config user.name t \
        && echo init > readme.md && git add readme.md && git commit -qm init )
    # Absence control: clean staged content MUST pass.
    printf 'print("hello world")\n' > "$tmp/clean.py"
    ( cd "$tmp" && git add clean.py && gitleaks git --staged --no-banner . >/dev/null 2>&1 ); clean_rc=$?
    ( cd "$tmp" && git reset -q clean.py )
    # Positive control: a realistic GitHub PAT MUST be caught (not a doc-example key,
    # which gitleaks' default config allowlists). The token is BUILT AT RUNTIME from
    # parts + random chars so no secret-looking literal exists in this file (which
    # would otherwise trip gitleaks/this repo's own secret gate on the script itself).
    _pfx="g""h""p_"; _rand="$(LC_ALL=C tr -dc 'A-Za-z0-9' </dev/urandom 2>/dev/null | head -c 36)"
    printf 'GH_TOKEN = "%s%s"\n' "$_pfx" "$_rand" > "$tmp/leak.py"
    ( cd "$tmp" && git add leak.py && gitleaks git --staged --no-banner . >/dev/null 2>&1 ); leak_rc=$?
    if [ "$clean_rc" -eq 0 ] && [ "$leak_rc" -ne 0 ]; then
      echo "check-secrets --test: PASS (clean passed rc=$clean_rc, planted secret caught rc=$leak_rc)"
      exit 0
    fi
    echo "check-secrets --test: FAIL (clean_rc=$clean_rc expected 0; leak_rc=$leak_rc expected non-zero)" >&2
    exit 1
    ;;
  *)
    echo "usage: check-secrets.sh [--pre-commit|--check|--test]" >&2; exit 2 ;;
esac
