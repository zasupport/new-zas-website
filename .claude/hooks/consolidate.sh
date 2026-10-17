#!/usr/bin/env bash
# ======================================================================
# CLAUDE-CODE-INJECTION
#   operation: create-new-file
#   target_path: .claude/hooks/consolidate.sh
#   create_parent_dirs: true
#   overwrite_if_exists: false
#   backup_if_exists: true
#   permissions: "0755"
#   artefact_version: "1.0"
#   artefact_created: "2026-08-11T16:30:00+02:00"
#   depends_on: [preflight-inventory.sh]
#   post_install_verify: "bash .claude/hooks/consolidate.sh --self-test"
#   rollback_command: "rm .claude/hooks/consolidate.sh"
# END-CLAUDE-CODE-INJECTION
# ======================================================================
# ZA Support Claude artefact consolidator.
#
# Finds Claude infrastructure files scattered across the machine, groups them
# by content, and consolidates them into one canonical location so that no
# repository ever pushes a stale copy of a file that is authoritative
# somewhere else.
#
# Three classifications drive everything:
#   IDENTICAL  same name, same sha256 as canonical  -> safe to archive away
#   DIVERGENT  same name, DIFFERENT sha256          -> never touched, reported
#   ORPHAN     no canonical counterpart             -> adopted into canonical
#
# Safety, in force at all times:
#   - Dry run by default. Nothing moves without --apply.
#   - Nothing is ever deleted. Duplicates are archived with a manifest.
#   - Refuses to move any file tracked by git. Moving a tracked file breaks
#     the repository it belongs to, which is the opposite of the goal.
#   - Refuses to move anything under a cloud-synced root. Evicted iCloud
#     stubs and OneDrive placeholders are not real file contents; moving one
#     moves a stub and loses the data.
#   - Divergent files are NEVER auto-resolved. Two versions of the same file
#     means a human decides which is right.
#   - Every apply run writes an undo script that reverses it exactly.
#
# Usage:
#   consolidate.sh                      dry run over standard roots
#   consolidate.sh --deep               dry run over the whole home directory
#   consolidate.sh --apply              perform the consolidation
#   consolidate.sh --canonical DIR      set the canonical home (default ~/.claude)
#   consolidate.sh --self-test          prove the safety refusals work
#
# Exit: 0 nothing to do | 1 action available or divergence found | 2 usage
set -uo pipefail

CANON="${CLAUDE_CANONICAL:-$HOME/.claude}"
APPLY=0; DEEP=0; SELFTEST=0; ALLOW_GIT=0
SCAN_ROOTS=""
while [ $# -gt 0 ]; do
  case "$1" in
    --apply) APPLY=1; shift ;;
    --deep) DEEP=1; shift ;;
    --canonical) CANON="${2:-}"; shift 2 ;;
    --root) SCAN_ROOTS="$SCAN_ROOTS
${2:-}"; shift 2 ;;
    --allow-git) ALLOW_GIT=1; shift ;;
    --self-test) SELFTEST=1; shift ;;
    -h|--help) sed -n '20,45p' "$0"; exit 0 ;;
    *) echo "unknown argument: $1" >&2; exit 2 ;;
  esac
done

STAMP="$(date -u +%Y%m%dT%H%M%SZ)"
QUAR="$CANON/_quarantine/$STAMP"
REPORT="$CANON/consolidation-report.json"
UNDO="$QUAR/undo.sh"

sha() { shasum -a 256 "$1" 2>/dev/null | cut -d' ' -f1 \
  || python3 -c "import hashlib,sys;print(hashlib.sha256(open(sys.argv[1],'rb').read()).hexdigest())" "$1" 2>/dev/null \
  || echo unreadable; }

# --- refusal 1: git-tracked files are never moved -----------------------
is_git_tracked() {
  [ "$ALLOW_GIT" = "1" ] && return 1
  d="$(dirname "$1")"
  ( cd "$d" 2>/dev/null && git rev-parse --is-inside-work-tree >/dev/null 2>&1 \
    && git ls-files --error-unmatch "$(basename "$1")" >/dev/null 2>&1 )
}

# --- refusal 2: cloud-synced paths are never moved ----------------------
is_cloud() {
  case "$1" in
    "$HOME/Library/Mobile Documents"*|"$HOME/Library/CloudStorage"*|\
    "$HOME/OneDrive"*|"$HOME/Dropbox"*|"$HOME/Google Drive"*) return 0 ;;
  esac
  case "$1" in *.icloud) return 0 ;; esac
  return 1
}

# --- refusal 3: never move anything already inside canonical ------------
is_canonical() { case "$1" in "$CANON"/*) return 0 ;; esac; return 1; }

# ------------------------------------------------------------- self-test
if [ "$SELFTEST" = "1" ]; then
  T="$(mktemp -d)"; N=0; F=0
  chk() { N=$((N+1)); if [ "$2" = "$3" ]; then printf 'PASS  %-38s exp=%s act=%s\n' "$1" "$2" "$3"
          else printf 'FAIL  %-38s exp=%s act=%s\n' "$1" "$2" "$3"; F=$((F+1)); fi; }
  C="$T/canon"; mkdir -p "$C" "$T/repo" "$T/loose"
  printf 'canonical content\n' > "$C/lint-v2.sh"

  # POSITIVE: an identical stray is detected as IDENTICAL
  printf 'canonical content\n' > "$T/loose/lint-v2.sh"
  OUT="$(bash "$0" --canonical "$C" --root "$T/loose" 2>/dev/null || true)"
  case "$OUT" in *"identical duplicates : 1"*) chk "positive/identical-detected" 0 0 ;;
                 *) chk "positive/identical-detected" 0 1 ;; esac

  # NEGATIVE: a divergent copy must be reported and NEVER moved
  printf 'DIFFERENT content\n' > "$T/loose/secrets.sh"
  printf 'canonical secrets\n' > "$C/secrets.sh"
  OUT="$(bash "$0" --canonical "$C" --root "$T/loose" --apply 2>/dev/null || true)"
  case "$OUT" in *DIVERGENT*) chk "negative/divergent-reported" 0 0 ;; *) chk "negative/divergent-reported" 0 1 ;; esac
  [ -f "$T/loose/secrets.sh" ] && chk "negative/divergent-NOT-moved" 0 0 || chk "negative/divergent-NOT-moved" 0 1

  # REFUSAL: a git-tracked duplicate must not be moved
  ( cd "$T/repo" && git init -q . && printf 'canonical content\n' > lint-v2.sh \
    && git add lint-v2.sh && git -c user.email=t@t -c user.name=t commit -qm x ) 2>/dev/null
  bash "$0" --canonical "$C" --root "$T/repo" --apply >/dev/null 2>&1 || true
  [ -f "$T/repo/lint-v2.sh" ] && chk "refusal/git-tracked-not-moved" 0 0 || chk "refusal/git-tracked-not-moved" 0 1

  # DRY RUN: default must move nothing
  printf 'canonical content\n' > "$T/loose/context.sh"; printf 'canonical content\n' > "$C/context.sh"
  bash "$0" --canonical "$C" --root "$T/loose" >/dev/null 2>&1 || true
  [ -f "$T/loose/context.sh" ] && chk "safety/dry-run-moves-nothing" 0 0 || chk "safety/dry-run-moves-nothing" 0 1

  # APPLY: identical duplicate archived, not deleted, and undo exists
  bash "$0" --canonical "$C" --root "$T/loose" --apply >/dev/null 2>&1 || true
  [ -f "$T/loose/context.sh" ] && chk "apply/duplicate-removed-from-stray" 0 1 || chk "apply/duplicate-removed-from-stray" 0 0
  find "$C/_quarantine" -name '*context.sh' 2>/dev/null | grep -q . \
    && chk "apply/archived-not-deleted" 0 0 || chk "apply/archived-not-deleted" 0 1
  find "$C/_quarantine" -name 'undo.sh' 2>/dev/null | grep -q . \
    && chk "apply/undo-script-written" 0 0 || chk "apply/undo-script-written" 0 1

  # UNDO: running it restores the file
  # Multiple applies create multiple timestamped quarantines; take the newest.
  U="$(find "$C/_quarantine" -name 'undo.sh' 2>/dev/null | sort | tail -1)"
  [ -n "$U" ] && bash "$U" >/dev/null 2>&1
  [ -f "$T/loose/context.sh" ] && chk "apply/undo-restores" 0 0 || chk "apply/undo-restores" 0 1

  # ABSENCE: a root that does not exist must not crash
  bash "$0" --canonical "$C" --root "$T/nosuch" >/dev/null 2>&1
  RC=$?; [ "$RC" -le 1 ] && chk "absence/missing-root" 0 0 || chk "absence/missing-root" 0 1

  rm -rf "$T"
  printf '\nControls: %s  Failures: %s\n' "$N" "$F"
  [ "$F" -gt 0 ] && { echo "RESULT: BROKEN. Do not run --apply."; exit 1; }
  echo "RESULT: OPERATIONAL. Safety refusals verified."; exit 0
fi

# ---------------------------------------------------------------- scan
[ -d "$CANON" ] || mkdir -p "$CANON" 2>/dev/null
TMP="$(mktemp -d)"; trap 'rm -rf "$TMP"' EXIT

# Artefact names that belong to the Claude infrastructure. Deliberately
# narrow: a broad sweep would hoover up unrelated files with common names.
NAMES="lint-v2.sh secrets.sh test-gate.sh _telemetry.sh context.sh statusline.sh
guard-bash.sh guard-config.sh guard-new-automation.sh session-end-learning.sh
collect-diagnostics.sh smoke-test.sh verify-delivery.sh preflight-inventory.sh
consolidate.sh pattern-engine.py guardrails.json cc-weekly-audit.sh
cc-watchdog.sh local-advisor-agent.py"

if [ -z "$SCAN_ROOTS" ]; then
  if [ "$DEEP" = "1" ]; then SCAN_ROOTS="$HOME"
  else SCAN_ROOTS="$HOME/Documents
$HOME/Desktop
$HOME/Developer
$HOME/Projects
$HOME/src
$HOME/code
$HOME/bin
$(pwd)"
  fi
fi

: > "$TMP/found"
printf '%s\n' "$SCAN_ROOTS" | sed '/^$/d' | while IFS= read -r root; do
  [ -d "$root" ] || continue
  for n in $NAMES; do
    find "$root" -maxdepth 8 -type f -name "$n" 2>/dev/null
  done
done | sort -u > "$TMP/found" 2>/dev/null

TOTAL="$(wc -l < "$TMP/found" | tr -d ' ')"
echo "ZA Support artefact consolidation"
echo "Canonical home : $CANON"
echo "Mode           : $([ "$APPLY" = "1" ] && echo 'APPLY (files will move)' || echo 'DRY RUN (nothing moves)')"
echo "Candidates     : $TOTAL"
echo ""

IDENT=0; DIVERG=0; ORPHAN=0; SKIP_GIT=0; SKIP_CLOUD=0; MOVED=0
: > "$TMP/rows"

while IFS= read -r f; do
  [ -f "$f" ] || continue
  is_canonical "$f" && continue
  base="$(basename "$f")"
  # Canonical counterpart: search the canonical tree for the same name
  cf="$(find "$CANON" -type f -name "$base" ! -path "*/_quarantine/*" 2>/dev/null | head -1)"

  if is_cloud "$f"; then
    SKIP_CLOUD=$((SKIP_CLOUD+1))
    printf 'SKIP_CLOUD\t%s\t%s\n' "$f" "cloud-synced or evicted stub" >> "$TMP/rows"; continue
  fi
  if is_git_tracked "$f"; then
    SKIP_GIT=$((SKIP_GIT+1))
    printf 'SKIP_GIT\t%s\t%s\n' "$f" "tracked by git, moving would break the repo" >> "$TMP/rows"; continue
  fi

  if [ -z "$cf" ]; then
    ORPHAN=$((ORPHAN+1))
    printf 'ORPHAN\t%s\t%s\n' "$f" "$CANON/adopted/$base" >> "$TMP/rows"; continue
  fi
  A="$(sha "$f")"; B="$(sha "$cf")"
  if [ "$A" = "$B" ]; then
    IDENT=$((IDENT+1))
    printf 'IDENTICAL\t%s\t%s\n' "$f" "$cf" >> "$TMP/rows"
  else
    DIVERG=$((DIVERG+1))
    printf 'DIVERGENT\t%s\t%s\n' "$f" "$cf" >> "$TMP/rows"
  fi
done < "$TMP/found"

# ---------------------------------------------------------------- apply
if [ "$APPLY" = "1" ] && { [ "$IDENT" -gt 0 ] || [ "$ORPHAN" -gt 0 ]; }; then
  mkdir -p "$QUAR"
  {
    echo '#!/usr/bin/env bash'
    echo "# Undo for consolidation $STAMP. Restores every moved file to its original path."
    echo 'set -uo pipefail'
  } > "$UNDO"
  while IFS="$(printf '\t')" read -r state src dst; do
    case "$state" in
      IDENTICAL)
        rel="$(printf '%s' "$src" | sed 's|^/||; s|/|_|g')"
        mkdir -p "$QUAR/duplicates"
        if mv "$src" "$QUAR/duplicates/$rel" 2>/dev/null; then
          MOVED=$((MOVED+1))
          printf 'mkdir -p "%s" && mv "%s" "%s"\n' "$(dirname "$src")" "$QUAR/duplicates/$rel" "$src" >> "$UNDO"
        fi ;;
      ORPHAN)
        mkdir -p "$CANON/adopted"
        base="$(basename "$src")"
        if [ ! -e "$CANON/adopted/$base" ] && mv "$src" "$CANON/adopted/$base" 2>/dev/null; then
          MOVED=$((MOVED+1))
          printf 'mv "%s" "%s"\n' "$CANON/adopted/$base" "$src" >> "$UNDO"
        fi ;;
    esac
  done < "$TMP/rows"
  chmod +x "$UNDO" 2>/dev/null
fi

# --------------------------------------------------------------- report
echo "=== Classification ==="
printf '  identical duplicates : %s%s\n' "$IDENT" "$([ "$APPLY" = "1" ] && echo " (archived)" || echo " (would archive)")"
printf '  DIVERGENT            : %s  <- never auto-resolved\n' "$DIVERG"
printf '  orphans              : %s%s\n' "$ORPHAN" "$([ "$APPLY" = "1" ] && echo " (adopted)" || echo " (would adopt)")"
printf '  skipped, git-tracked : %s\n' "$SKIP_GIT"
printf '  skipped, cloud-synced: %s\n' "$SKIP_CLOUD"
[ "$APPLY" = "1" ] && printf '  files moved          : %s\n' "$MOVED"

if [ "$DIVERG" -gt 0 ]; then
  echo ""
  echo "=== DIVERGENT: two versions of the same file exist ==="
  echo "This is the condition that produces wrong results when pushing to a"
  echo "repository. Neither copy is moved. Compare and decide which is right:"
  awk -F'\t' '$1=="DIVERGENT"{printf "  diff \"%s\" \\\n       \"%s\"\n", $2, $3}' "$TMP/rows" | head -20
fi
if [ "$SKIP_GIT" -gt 0 ]; then
  echo ""
  echo "=== Skipped because git tracks them ==="
  echo "Moving a tracked file breaks its repository. Resolve inside the repo:"
  awk -F'\t' '$1=="SKIP_GIT"{printf "  %s\n", $2}' "$TMP/rows" | head -10
fi
if [ "$APPLY" != "1" ] && { [ "$IDENT" -gt 0 ] || [ "$ORPHAN" -gt 0 ]; }; then
  echo ""
  echo "Dry run only. Nothing moved. To perform the consolidation:"
  echo "  bash $0 --apply$([ "$DEEP" = "1" ] && echo ' --deep')"
fi
[ "$APPLY" = "1" ] && [ "$MOVED" -gt 0 ] && {
  echo ""
  echo "Archived to : $QUAR"
  echo "Undo with   : bash \"$UNDO\""
}

# ----------------------------------------------------------------- JSON
{
  printf '{\n  "manifest": "zas-consolidation",\n  "version": "1.0.0",\n'
  printf '  "run": "%s",\n  "mode": "%s",\n  "canonical": "%s",\n' "$STAMP" "$([ "$APPLY" = 1 ] && echo apply || echo dry-run)" "$CANON"
  printf '  "summary": {"candidates": %s, "identical": %s, "divergent": %s, "orphan": %s, "skipped_git": %s, "skipped_cloud": %s, "moved": %s},\n' \
    "$TOTAL" "$IDENT" "$DIVERG" "$ORPHAN" "$SKIP_GIT" "$SKIP_CLOUD" "$MOVED"
  printf '  "quarantine": "%s",\n  "undo": "%s",\n' "$([ "$MOVED" -gt 0 ] && echo "$QUAR" || echo "")" "$([ "$MOVED" -gt 0 ] && echo "$UNDO" || echo "")"
  printf '  "items": [\n'
  awk -F'\t' '{printf "    {\"state\":\"%s\",\"path\":\"%s\",\"counterpart\":\"%s\"}%s\n", $1,$2,$3,(NR==n?"":",")}' \
    n="$(wc -l < "$TMP/rows" | tr -d ' ')" "$TMP/rows"
  printf '  ],\n  "limitations": [\n'
  printf '    "Only the named Claude artefacts are considered; a broad name sweep would capture unrelated files.",\n'
  printf '    "Git-tracked and cloud-synced copies are reported but never moved, so some duplication persists by design.",\n'
  printf '    "Divergent files are never auto-resolved; choosing the correct version is a human judgement.",\n'
  printf '    "Identical means byte-equal, which does not prove either copy is the version you want."\n'
  printf '  ]\n}\n'
} > "$REPORT" 2>/dev/null
echo ""
echo "Machine-readable: $REPORT"

[ "$DIVERG" -gt 0 ] && exit 1
[ "$APPLY" != "1" ] && { [ "$IDENT" -gt 0 ] || [ "$ORPHAN" -gt 0 ]; } && exit 1
exit 0
