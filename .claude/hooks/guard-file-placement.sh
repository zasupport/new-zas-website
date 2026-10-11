#!/usr/bin/env bash
# ======================================================================
# CLAUDE-CODE-INJECTION
#   operation: create-new-file
#   target_path: .claude/hooks/guard-file-placement.sh
#   permissions: "0755"
#   create_parent_dirs: true
#   overwrite_if_exists: false
#   backup_if_exists: true
#   artefact_version: "1.0"
#   artefact_created: "2026-08-13T14:30:00+02:00"
#   depends_on: [file-placement-mandate.md, _telemetry.sh]
#   post_install_verify: "printf '{\"stop_hook_active\":true}' | bash .claude/hooks/guard-file-placement.sh"
#   rollback_command: "rm .claude/hooks/guard-file-placement.sh"
# END-CLAUDE-CODE-INJECTION
# ======================================================================
# Mechanical enforcement of the file placement mandate (Stop event).
#
# The rule file states the requirement; a rule is probabilistic. This hook
# makes it deterministic: any artefact created in this session that lacks a
# placement directive blocks the turn until it has one.
#
# Scope is deliberately narrow. It checks files the session created that are
# destined for the filesystem and are the kind of artefact that needs a home:
# .sh, .py, .md, .json, .plist, .yml. It ignores fixtures, archives, caches,
# and anything already sitting in a canonical destination, because a file
# already in .claude/hooks/ has by definition been placed.
set -uo pipefail
# Parse the flag BEFORE reading stdin. Reading stdin first makes an
# interactive --self-test hang forever on a cat with no piped input.
SELFTEST=0
[ "${1:-}" = "--self-test" ] && SELFTEST=1
if [ "$SELFTEST" = "1" ]; then
  INPUT='{}'
else
  INPUT="$(cat 2>/dev/null || echo '{}')"
fi
HOOK_DIR="$(cd "$(dirname "$0")" && pwd)"
# shellcheck source=/dev/null
[ -f "$HOOK_DIR/_telemetry.sh" ] && . "$HOOK_DIR/_telemetry.sh" \
  || { tel_emit() { :; }; tel_capture_env() { :; }; tel_now_ms() { echo 0; }; }
T_START="$(tel_now_ms)"

jget() {
  if command -v jq >/dev/null 2>&1; then printf '%s' "$INPUT" | jq -r "$1 // empty"
  else printf '%s' "$INPUT" | python3 -c 'import sys,json
try: d=json.load(sys.stdin)
except Exception: print(""); raise SystemExit
for k in "'"$1"'".lstrip(".").split("."):
    d=d.get(k) if isinstance(d,dict) else None
print(d if d is not None else "")' 2>/dev/null
  fi
}
# Livelock guard first, shared Stop-event discipline
[ "$SELFTEST" = "0" ] && [ "$(jget '.stop_hook_active')" = "true" ] && exit 0

if [ "$SELFTEST" = "1" ]; then
  # Resolve $0 to an absolute path BEFORE any cd, or the re-invocations
  # below fail with exit 127 once the working directory changes.
  SELF="$HOOK_DIR/$(basename "$0")"
  T="$(mktemp -d)"; N=0; F=0
  chk() { N=$((N+1)); if [ "$2" = "$3" ]; then printf 'PASS  %-42s exp=%s act=%s\n' "$1" "$2" "$3"
          else printf 'FAIL  %-42s exp=%s act=%s\n' "$1" "$2" "$3"; F=$((F+1)); fi; }
  cd "$T" && git init -q . && git -c user.email=t@t -c user.name=t commit -q --allow-empty -m init

  # NEGATIVE: a new artefact with no placement directive must block
  printf '#!/usr/bin/env bash\necho hi\n' > "$T/orphan.sh"
  printf '{"stop_hook_active":false}' | CLAUDE_PROJECT_DIR="$T" bash "$SELF" >/dev/null 2>&1
  chk "negative/undirected-artefact-blocks" 2 "$?"

  # POSITIVE: the same artefact with a directive must pass
  printf '#!/usr/bin/env bash\n# CLAUDE-CODE-INJECTION target_path: .claude/hooks/orphan.sh\necho hi\n' > "$T/orphan.sh"
  printf '{"stop_hook_active":false}' | CLAUDE_PROJECT_DIR="$T" bash "$SELF" >/dev/null 2>&1
  chk "positive/directed-artefact-passes" 0 "$?"

  # POSITIVE: a file already in a canonical destination needs no directive
  rm -f "$T/orphan.sh"; mkdir -p "$T/.claude/hooks"
  printf '#!/usr/bin/env bash\necho hi\n' > "$T/.claude/hooks/placed.sh"
  printf '{"stop_hook_active":false}' | CLAUDE_PROJECT_DIR="$T" bash "$SELF" >/dev/null 2>&1
  chk "positive/already-placed-exempt" 0 "$?"

  # ABSENCE: fixtures are exempt, they are test data not deliverables
  mkdir -p "$T/.claude/fixtures"; printf 'x=1\n' > "$T/.claude/fixtures/bad.py"
  printf '{"stop_hook_active":false}' | CLAUDE_PROJECT_DIR="$T" bash "$SELF" >/dev/null 2>&1
  chk "absence/fixtures-exempt" 0 "$?"

  # ABSENCE: not a git repo must exit cleanly rather than crash
  printf '{"stop_hook_active":false}' | CLAUDE_PROJECT_DIR="$T/nogit" bash "$SELF" >/dev/null 2>&1
  chk "absence/no-git-repo-handled" 0 "$?"

  # SAFETY: livelock guard short-circuits before any work
  printf '{"stop_hook_active":true}' | CLAUDE_PROJECT_DIR="$T" bash "$SELF" >/dev/null 2>&1
  chk "safety/livelock-guard" 0 "$?"

  rm -rf "$T"
  printf '\nControls: %s  Failures: %s\n' "$N" "$F"
  [ "$F" -gt 0 ] && { echo "RESULT: BROKEN"; exit 1; }
  echo "RESULT: OPERATIONAL"; exit 0
fi

ROOT="${CLAUDE_PROJECT_DIR:-$(pwd)}"
cd "$ROOT" 2>/dev/null || exit 0
command -v git >/dev/null 2>&1 || exit 0
[ -d .git ] || exit 0

MISSING=""
CANDIDATES="$( { git diff --name-only HEAD 2>/dev/null; git ls-files --others --exclude-standard 2>/dev/null; } \
  | grep -E '\.(sh|py|md|json|plist|yml|yaml)$' \
  | grep -Ev '^\.claude/(hooks|rules|agents|fixtures|framework|capture|_archive)/' \
  | grep -Ev '^\.github/workflows/' \
  | grep -Ev '(_archive|__pycache__|\.ruff_cache|node_modules)/' \
  | sort -u || true )"

for f in $CANDIDATES; do
  [ -f "$f" ] || continue
  # A placement directive in any of its accepted forms
  if grep -qE 'CLAUDE-CODE-INJECTION|claude_code_injection|target_path' "$f" 2>/dev/null; then
    continue
  fi
  MISSING="$MISSING $f"
done

if [ -n "$MISSING" ]; then
  tel_emit "guard-file-placement" "$INPUT" "block" 2 "$T_START" "undirected:$MISSING"
  {
    echo "File placement mandate: these artefacts do not say where they save."
    for f in $MISSING; do echo "  - $f"; done
    echo ""
    echo "Add a CLAUDE-CODE-INJECTION block naming target_path, permissions,"
    echo "create_parent_dirs, backup_if_exists, post_install_verify and"
    echo "rollback_command. See .claude/rules/file-placement-mandate.md for the"
    echo "canonical destination table. An artefact that does not state its"
    echo "destination is incomplete."
  } >&2
  exit 2
fi

tel_emit "guard-file-placement" "$INPUT" "pass" 0 "$T_START" \
  "checked=$(printf '%s' "$CANDIDATES" | wc -w | tr -d ' ')"
exit 0
