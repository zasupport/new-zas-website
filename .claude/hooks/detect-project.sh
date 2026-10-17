#!/usr/bin/env bash
# ======================================================================
# CLAUDE-CODE-INJECTION
#   operation: create-new-file
#   target_path: .claude/hooks/detect-project.sh
#   permissions: "0755"
#   create_parent_dirs: true
#   overwrite_if_exists: false
#   backup_if_exists: true
#   artefact_version: "1.0"
#   artefact_created: "2026-08-13T17:00:00+02:00"
#   post_install_verify: "bash .claude/hooks/detect-project.sh --self-test"
#   rollback_command: "rm .claude/hooks/detect-project.sh"
# END-CLAUDE-CODE-INJECTION
# ======================================================================
# Project auto-detection. Removes the prompt.
#
# Ranked signals, strongest first:
#   1. The project most recently used with Claude Code (~/.claude/projects
#      records one directory per project Claude Code has run in). This is the
#      strongest signal because it reflects actual use, not just existence.
#   2. A git repository already carrying a .claude directory.
#   3. The most recently modified git repository under the usual code roots.
#
# Hard refusals, because a wrong guess installs infrastructure into the wrong
# place and that is worse than asking:
#   - never $HOME itself
#   - never Downloads, Desktop, Documents root, or any cloud-synced root
#   - never a zas-m2m bundle folder
#   - never a path inside the bundle being installed from
#
# Prints the chosen path on stdout and its reasoning on stderr, so a caller
# can use "$(detect-project.sh)" directly.
set -uo pipefail

EXPLAIN=0; SELFTEST=0; LIST=0
case "${1:-}" in
  --explain) EXPLAIN=1 ;;
  --self-test) SELFTEST=1 ;;
  --list) LIST=1 ;;
esac
SEARCH_ROOTS="${ZA_PROJECT_ROOTS:-$HOME/Documents:$HOME/Developer:$HOME/Projects:$HOME/code:$HOME/src:$HOME/Sites:$HOME/dev:$HOME/work}"

say(){ [ "$EXPLAIN" = "1" ] && printf '%s\n' "$*" >&2; }

refused() { # refused <path> -> 0 if it must NOT be used
  p="$1"
  [ -z "$p" ] && return 0
  [ -d "$p" ] || return 0
  # Normalise trailing slash
  p="${p%/}"
  [ "$p" = "$HOME" ] && return 0
  [ "$p" = "/" ] && return 0
  case "$p" in
    "$HOME/Downloads"|"$HOME/Downloads/"*) return 0 ;;
    "$HOME/Desktop"|"$HOME/Documents") return 0 ;;
    "$HOME/Library/"*) return 0 ;;
    *zas-m2m*) return 0 ;;
    *"/Mobile Documents/"*|*"/CloudStorage/"*|*"/OneDrive"*|*"/Dropbox/"*) return 0 ;;
    *"/_archive/"*|*"/node_modules/"*) return 0 ;;
  esac
  return 1
}

mtime_of(){ m="$(stat -f %m "$1" 2>/dev/null)"; case "$m" in ''|*[!0-9]*) m="$(stat -c %Y "$1" 2>/dev/null)";; esac
            case "$m" in ''|*[!0-9]*) m=0;; esac; printf '%s' "$m"; }

# Claude Code encodes a project path as its absolute path with separators
# replaced by dashes. Dashes in real folder names make that ambiguous, so
# candidates are resolved against the filesystem rather than assumed.
decode_cc_project() {
  enc="$1"
  cand="$(printf '%s' "$enc" | sed 's|^-|/|; s|-|/|g')"
  [ -d "$cand" ] && { printf '%s' "$cand"; return 0; }
  # Re-join from the right, handling folder names that contain a dash
  parts="$(printf '%s' "$enc" | sed 's|^-||')"
  path="/"; rest="$parts"
  while [ -n "$rest" ]; do
    seg="${rest%%-*}"; remainder="${rest#*-}"
    [ "$remainder" = "$rest" ] && remainder=""
    if [ -d "$path$seg" ]; then
      path="$path$seg/"; rest="$remainder"
    elif [ -n "$remainder" ]; then
      joined="$seg-${remainder%%-*}"; after="${remainder#*-}"
      [ "$after" = "$remainder" ] && after=""
      if [ -d "$path$joined" ]; then path="$path$joined/"; rest="$after"; else return 1; fi
    else
      return 1
    fi
  done
  p="${path%/}"; [ -d "$p" ] && printf '%s' "$p" && return 0
  return 1
}

gather() { # emit "mtime<TAB>path<TAB>reason"
  # Signal 1: projects Claude Code has actually been used in
  if [ -d "$HOME/.claude/projects" ]; then
    for d in "$HOME/.claude/projects"/*; do
      [ -d "$d" ] || continue
      P="$(decode_cc_project "$(basename "$d")")" || continue
      refused "$P" && continue
      printf '%s\t%s\t%s\n' "$(mtime_of "$d")" "$P" "most recently used with Claude Code"
    done
  fi
  # Signal 2 and 3: git repositories under the usual code roots
  OLD="$IFS"; IFS=':'; set -- $SEARCH_ROOTS; IFS="$OLD"
  for root in "$@"; do
    [ -d "$root" ] || continue
    while IFS= read -r g; do
      P="$(dirname "$g")"
      refused "$P" && continue
      if [ -d "$P/.claude" ]; then
        printf '%s\t%s\t%s\n' "$(( $(mtime_of "$P") + 86400 ))" "$P" "git repo already carrying a .claude directory"
      else
        printf '%s\t%s\t%s\n' "$(mtime_of "$P")" "$P" "recently modified git repository"
      fi
    done <<INNER
$(find "$root" -maxdepth 3 -type d -name '.git' 2>/dev/null | head -40)
INNER
  done
}

if [ "$SELFTEST" = "1" ]; then
  T="$(mktemp -d)"; N=0; F=0
  chk(){ N=$((N+1)); if [ "$2" = "$3" ]; then printf 'PASS  %-46s exp=%s act=%s\n' "$1" "$2" "$3"
         else printf 'FAIL  %-46s exp=%s act=%s\n' "$1" "$2" "$3"; F=$((F+1)); fi; }
  # REFUSALS, the controls that matter most
  refused "$HOME" && chk "refusal/never-home" 0 0 || chk "refusal/never-home" 0 1
  mkdir -p "$HOME/Downloads/x" 2>/dev/null
  refused "$HOME/Downloads/x" && chk "refusal/never-downloads" 0 0 || chk "refusal/never-downloads" 0 1
  mkdir -p "$T/zas-m2m 9"
  refused "$T/zas-m2m 9" && chk "refusal/never-a-bundle" 0 0 || chk "refusal/never-a-bundle" 0 1
  mkdir -p "$T/CloudStorage/OneDrive-x/proj"
  refused "$T/CloudStorage/OneDrive-x/proj" && chk "refusal/never-cloud-synced" 0 0 || chk "refusal/never-cloud-synced" 0 1
  # POSITIVE: a plain git repo is acceptable
  mkdir -p "$T/work/myrepo/.git"
  refused "$T/work/myrepo" && chk "positive/plain-repo-allowed" 0 1 || chk "positive/plain-repo-allowed" 0 0
  # POSITIVE: path decoding handles a folder name containing a dash
  mkdir -p "$T/Documents/my-project"
  D="$(HOME="$T" decode_cc_project "-$(printf '%s' "${T#/}" | tr '/' '-')-Documents-my-project" 2>/dev/null)"
  [ "$D" = "$T/Documents/my-project" ] && chk "positive/decodes-dashed-folder" 0 0 || chk "positive/decodes-dashed-folder" 0 1
  # POSITIVE: a repo with .claude outranks a plain repo
  mkdir -p "$T/work/withclaude/.git" "$T/work/withclaude/.claude"
  R="$(ZA_PROJECT_ROOTS="$T/work" bash "$0" 2>/dev/null)"
  [ "$R" = "$T/work/withclaude" ] && chk "positive/claude-repo-ranked-first" 0 0 || chk "positive/claude-repo-ranked-first" 0 1
  # ABSENCE: nothing detectable must exit non-zero, never guess
  ZA_PROJECT_ROOTS="$T/nothing" HOME="$T" bash "$0" >/dev/null 2>&1
  RC=$?; [ "$RC" -ne 0 ] && chk "absence/no-candidate-refuses" 0 0 || chk "absence/no-candidate-refuses" 0 1
  rm -rf "$T"
  printf '\nControls: %s  Failures: %s\n' "$N" "$F"
  [ "$F" -gt 0 ] && { echo "RESULT: BROKEN"; exit 1; }
  echo "RESULT: OPERATIONAL"; exit 0
fi

RANKED="$(gather | sort -rn -k1,1 | awk -F'\t' '!seen[$2]++')"
if [ "$LIST" = "1" ]; then
  printf '%s\n' "$RANKED" | awk -F'\t' 'NF{printf "  %s\n      %s\n", $2, $3}'
  exit 0
fi
BEST="$(printf '%s\n' "$RANKED" | head -1)"
P="$(printf '%s' "$BEST" | cut -f2)"
WHY="$(printf '%s' "$BEST" | cut -f3)"
if [ -z "$P" ]; then
  echo "No project could be detected safely." >&2
  echo "Searched: $SEARCH_ROOTS and ~/.claude/projects" >&2
  echo "Name one explicitly instead: ZAS_TARGET=/path/to/repo" >&2
  exit 1
fi
say "Detected: $P"
say "Reason  : $WHY"
printf '%s' "$P"
exit 0
