#!/usr/bin/env bash
# ======================================================================
# CLAUDE-CODE-INJECTION
#   operation: create-new-file
#   target_path: .claude/hooks/preflight-inventory.sh
#   create_parent_dirs: true
#   overwrite_if_exists: false
#   backup_if_exists: true
#   permissions: "0755"
#   artefact_version: "1.0"
#   artefact_created: "2026-08-11T15:00:00+02:00"
#   depends_on: []
#   post_install_verify: "bash .claude/hooks/preflight-inventory.sh --self-test"
#   rollback_command: "rm .claude/hooks/preflight-inventory.sh"
# END-CLAUDE-CODE-INJECTION
# ======================================================================
# ZA Support installation-state auditor.
#
# Answers one question with evidence: what is already installed, and what
# still needs installing? Compares the bundle's artefacts against every
# destination on this machine, then sweeps local disk and cloud storage
# (iCloud Drive, OneDrive, Dropbox, Google Drive) for stray or shadowed
# copies that would silently diverge.
#
# Read-only. Installs nothing, changes nothing, deletes nothing.
#
# Usage:
#   preflight-inventory.sh                  audit against the current project
#   preflight-inventory.sh --target DIR     audit a specific project
#   preflight-inventory.sh --deep           add a full-disk sweep for strays
#   preflight-inventory.sh --json           machine-readable only
#   preflight-inventory.sh --self-test      prove the controls work
#
# Exit codes: 0 fully installed and current | 1 action needed | 2 usage error
# POSIX/BSD-safe: no grep -P, no GNU sed -i, no realpath, jq optional.
set -uo pipefail

SRC="$(cd "$(dirname "$0")" && pwd)"
[ -f "$SRC/../guardrails.json" ] && SRC="$(cd "$SRC/.." && pwd)"
TARGET="$(pwd)"
DEEP=0; JSON_ONLY=0; SELFTEST=0
while [ $# -gt 0 ]; do
  case "$1" in
    --target) TARGET="${2:-}"; shift 2 ;;
    --source) SRC="${2:-}"; shift 2 ;;
    --deep) DEEP=1; shift ;;
    --json) JSON_ONLY=1; shift ;;
    --self-test) SELFTEST=1; shift ;;
    -h|--help) sed -n '18,30p' "$0"; exit 0 ;;
    *) echo "unknown argument: $1" >&2; exit 2 ;;
  esac
done

sha() {
  shasum -a 256 "$1" 2>/dev/null | cut -d' ' -f1 \
    || python3 -c "import hashlib,sys;print(hashlib.sha256(open(sys.argv[1],'rb').read()).hexdigest())" "$1" 2>/dev/null \
    || echo "unreadable"
}
say() { [ "$JSON_ONLY" = "1" ] || printf '%s\n' "$*"; }
hdr() { [ "$JSON_ONLY" = "1" ] || printf '\n=== %s ===\n' "$1"; }

# ---------------------------------------------------------------- manifest
# Expected artefact -> destination. Derived from the installer's own mapping,
# so the auditor and the installer cannot drift apart.
manifest() {
  for f in _telemetry.sh lint-v2.sh secrets.sh test-gate.sh guard-new-automation.sh \
           collect-diagnostics.sh smoke-test.sh verify-delivery.sh guard-bash.sh \
           context.sh session-end-learning.sh guard-config.sh statusline.sh \
           preflight-inventory.sh; do
    printf 'hooks/%s\t%s/.claude/hooks/%s\thook\n' "$f" "$TARGET" "$f"
  done
  printf 'pattern-engine.py\t%s/.claude/hooks/pattern-engine.py\tengine\n' "$TARGET"
  printf 'guardrails.json\t%s/.claude/guardrails.json\tmanifest\n' "$TARGET"
  for a in code-reviewer delivery-auditor; do
    printf 'agents/%s.md\t%s/.claude/agents/%s.md\tagent\n' "$a" "$TARGET" "$a"
  done
  for r in hook-block-mandate lint-python lint-ts lint-go lint-rust load-bearing agent-architecture testing-controls; do
    printf 'rules/%s.md\t%s/.claude/rules/%s.md\trule\n' "$r" "$TARGET" "$r"
  done
  for s in cc-weekly-audit.sh cc-watchdog.sh local-advisor-agent.py; do
    printf 'scripts/%s\t%s/bin/%s\tautomation\n' "$s" "$HOME" "$s"
  done
  for p in com.zasupport.ccwatchdog.weekly com.zasupport.ccwatchdog.heartbeat com.zasupport.ccadvisor; do
    printf 'launchd/%s.plist\t%s/Library/LaunchAgents/%s.plist\tlaunchd\n' "$p" "$HOME" "$p"
  done
  printf 'ci/claude-quality.yml\t%s/.github/workflows/claude-quality.yml\tci\n' "$TARGET"
}

# ------------------------------------------------------------- self-test
if [ "$SELFTEST" = "1" ]; then
  T="$(mktemp -d)"; F=0; N=0
  chk() { N=$((N+1)); if [ "$2" = "$3" ]; then printf 'PASS  %-34s exp=%s act=%s\n' "$1" "$2" "$3"
          else printf 'FAIL  %-34s exp=%s act=%s\n' "$1" "$2" "$3"; F=$((F+1)); fi; }
  # NEGATIVE control: nothing installed anywhere must report action needed
  bash "$0" --target "$T/empty" --source "$SRC" --json >/dev/null 2>&1 || true
  RC=$?; bash "$0" --target "$T/empty" --source "$SRC" --json >/dev/null 2>&1; RC=$?
  chk "negative/nothing-installed" 1 "$RC"
  # ABSENCE control: a source directory that does not exist must not crash
  bash "$0" --target "$T/x" --source "$T/nosuchsource" --json >/dev/null 2>&1
  RC=$?; [ "$RC" -le 1 ] && chk "absence/missing-source" 0 0 || chk "absence/missing-source" 0 1
  # ABSENCE control: unreadable target handled
  bash "$0" --target "/proc/nonexistent" --source "$SRC" --json >/dev/null 2>&1
  RC=$?; [ "$RC" -le 1 ] && chk "absence/unreadable-target" 0 0 || chk "absence/unreadable-target" 0 1
  # POSITIVE control: a fully populated target reports installed
  P="$T/full"; mkdir -p "$P/.claude/hooks" "$P/.claude/agents" "$P/.claude/rules" "$P/.github/workflows"
  cp "$SRC"/hooks/*.sh "$P/.claude/hooks/" 2>/dev/null
  cp "$SRC"/pattern-engine.py "$P/.claude/hooks/" 2>/dev/null
  cp "$SRC"/guardrails.json "$P/.claude/" 2>/dev/null
  cp "$SRC"/agents/*.md "$P/.claude/agents/" 2>/dev/null
  cp "$SRC"/rules/*.md "$P/.claude/rules/" 2>/dev/null
  cp "$SRC"/ci/claude-quality.yml "$P/.github/workflows/" 2>/dev/null
  if [ -f "$P/.claude/hooks/lint-v2.sh" ]; then
    # Capture to a variable: piping would let pipefail propagate the
    # auditor's intentional exit 1 and mask a successful grep.
    OUT="$(bash "$0" --target "$P" --source "$SRC" --json 2>/dev/null || true)"
    case "$OUT" in *'"installed_current": '[1-9]*) chk "positive/detects-installed" 0 0 ;;
                   *) chk "positive/detects-installed" 0 1 ;; esac
    # STALE control: drift one installed file, must be reported as stale
    printf '\n# drift\n' >> "$P/.claude/hooks/lint-v2.sh"
    OUT="$(bash "$0" --target "$P" --source "$SRC" --json 2>/dev/null || true)"
    case "$OUT" in *'"state":"stale"'*) chk "negative/detects-stale-drift" 0 0 ;;
                   *) chk "negative/detects-stale-drift" 0 1 ;; esac
  else
    chk "positive/detects-installed" 0 1
    chk "negative/detects-stale-drift" 0 1
  fi
  rm -rf "$T"
  printf '\nControls: %s  Failures: %s\n' "$N" "$F"
  [ "$F" -gt 0 ] && { echo "RESULT: BROKEN"; exit 1; }
  echo "RESULT: OPERATIONAL"; exit 0
fi

# ------------------------------------------------------------- comparison
TMP="$(mktemp -d)"; trap 'rm -rf "$TMP"' EXIT
: > "$TMP/rows"
INSTALLED=0; MISSING=0; STALE=0; UNKNOWN=0

while IFS="$(printf '\t')" read -r rel dest kind; do
  [ -z "$rel" ] && continue
  SRCF="$SRC/$rel"
  if [ ! -f "$SRCF" ]; then
    printf '%s\t%s\t%s\tnot_in_bundle\t-\n' "$rel" "$dest" "$kind" >> "$TMP/rows"
    UNKNOWN=$((UNKNOWN+1)); continue
  fi
  if [ ! -f "$dest" ]; then
    printf '%s\t%s\t%s\tmissing\t-\n' "$rel" "$dest" "$kind" >> "$TMP/rows"
    MISSING=$((MISSING+1)); continue
  fi
  A="$(sha "$SRCF")"; B="$(sha "$dest")"
  if [ "$A" = "$B" ]; then
    printf '%s\t%s\t%s\tinstalled_current\t%s\n' "$rel" "$dest" "$kind" "$(echo "$B" | cut -c1-12)" >> "$TMP/rows"
    INSTALLED=$((INSTALLED+1))
  else
    printf '%s\t%s\t%s\tstale\t%s\n' "$rel" "$dest" "$kind" "$(echo "$B" | cut -c1-12)" >> "$TMP/rows"
    STALE=$((STALE+1))
  fi
done <<EOF
$(manifest)
EOF

# ------------------------------------------------------------ cloud sweep
# Cloud-synced Claude infrastructure is a real hazard, not a tidiness issue.
# iCloud with Optimise Mac Storage evicts file contents and leaves a stub.
# OneDrive Files On-Demand creates placeholders that are not present until
# opened. A hook script in either state fails at the moment it is invoked,
# and the failure looks like a broken hook rather than an absent file.
: > "$TMP/cloud"
CLOUD_ROOTS=""
add_root() { [ -d "$1" ] && CLOUD_ROOTS="$CLOUD_ROOTS
$1"; }
add_root "$HOME/Library/Mobile Documents/com~apple~CloudDocs"
for d in "$HOME"/Library/CloudStorage/*; do add_root "$d"; done
for d in "$HOME"/OneDrive*; do add_root "$d"; done
add_root "$HOME/Dropbox"
add_root "$HOME/Google Drive"

CLOUD_HITS=0; SHADOWED=0
if [ -n "$CLOUD_ROOTS" ]; then
  # Bounded. An unbounded find over a populated iCloud Drive can run for
  # minutes and may trigger downloads of evicted files. Depth 4 plus a hard
  # timeout keeps this a health check, not a filesystem crawl.
  CLOUD_TIMEOUT="${CLOUD_SWEEP_TIMEOUT:-20}"
  sweep() {
    printf '%s\n' "$CLOUD_ROOTS" | sed '/^$/d' | while IFS= read -r root; do
      find "$root" -maxdepth 4 \( -name '.claude' -o -name 'guardrails.json' \
        -o -name 'lint-v2.sh' -o -name 'settings.json' -path '*/.claude/*' \) 2>/dev/null | head -20
    done | sort -u
  }
  if command -v timeout >/dev/null 2>&1; then
    timeout "$CLOUD_TIMEOUT" sh -c "$(declare -f sweep); sweep" > "$TMP/cloudhits" 2>/dev/null \
      || echo "(cloud sweep timed out after ${CLOUD_TIMEOUT}s, results partial)" > "$TMP/cloudhits"
  else
    sweep > "$TMP/cloudhits" 2>/dev/null &
    SWEEP_PID=$!
    ( sleep "$CLOUD_TIMEOUT"; kill -9 "$SWEEP_PID" 2>/dev/null ) 2>/dev/null &
    WATCH_PID=$!
    wait "$SWEEP_PID" 2>/dev/null
    kill "$WATCH_PID" 2>/dev/null
  fi
  CLOUD_HITS="$(wc -l < "$TMP/cloudhits" | tr -d ' ')"
fi

# Is the TARGET itself inside a cloud-synced root? This is the dangerous case.
TARGET_IN_CLOUD=""
case "$TARGET" in
  "$HOME/Library/Mobile Documents"*|"$HOME/Library/CloudStorage"*|"$HOME/OneDrive"*|"$HOME/Dropbox"*|"$HOME/Google Drive"*)
    TARGET_IN_CLOUD="yes" ;;
esac
# iCloud eviction leaves .icloud stubs; detect them under the target
STUBS=0
[ -d "$TARGET/.claude" ] && STUBS="$(find "$TARGET/.claude" -name '*.icloud' 2>/dev/null | wc -l | tr -d ' ')"

# ------------------------------------------------------------- deep sweep
STRAYS=0
if [ "$DEEP" = "1" ]; then
  if command -v mdfind >/dev/null 2>&1; then
    mdfind -name 'guardrails.json' 2>/dev/null | head -30 > "$TMP/strays"
  else
    find "$HOME" -maxdepth 7 -name 'guardrails.json' 2>/dev/null | head -30 > "$TMP/strays"
  fi
  grep -v "^$TARGET" "$TMP/strays" 2>/dev/null > "$TMP/strays2" || true
  mv "$TMP/strays2" "$TMP/strays" 2>/dev/null || true
  STRAYS="$(wc -l < "$TMP/strays" 2>/dev/null | tr -d ' ')"
fi

# ---------------------------------------------------------------- report
TOTAL=$((INSTALLED+MISSING+STALE+UNKNOWN))
say "ZA Support installation inventory"
say "Source: $SRC"
say "Target: $TARGET"
say "Scanned: $(date -u +%Y-%m-%dT%H:%M:%SZ)"

hdr "Installation state"
say "  installed and current : $INSTALLED"
say "  missing               : $MISSING"
say "  stale (hash differs)  : $STALE"
say "  not in this bundle    : $UNKNOWN"
say "  total tracked         : $TOTAL"

if [ "$MISSING" -gt 0 ] && [ "$JSON_ONLY" != "1" ]; then
  hdr "Needs installing"
  awk -F'\t' '$4=="missing"{printf "  %-14s %s\n", $3, $2}' "$TMP/rows" | head -40
fi
if [ "$STALE" -gt 0 ] && [ "$JSON_ONLY" != "1" ]; then
  hdr "Installed but drifted from the bundle"
  awk -F'\t' '$4=="stale"{printf "  %-14s %s\n", $3, $2}' "$TMP/rows" | head -40
  say "  These differ from the bundle. Reinstalling overwrites local edits; the installer archives first."
fi

hdr "Cloud storage"
if [ -z "$CLOUD_ROOTS" ]; then
  say "  no cloud-synced roots detected on this machine"
else
  printf '%s\n' "$CLOUD_ROOTS" | sed '/^$/d' | while IFS= read -r r; do say "  provider root: $r"; done
  say "  Claude-related artefacts found in cloud roots: ${CLOUD_HITS:-0}"
  [ "${CLOUD_HITS:-0}" -gt 0 ] && [ "$JSON_ONLY" != "1" ] && head -8 "$TMP/cloudhits" | while IFS= read -r h; do say "    $h"; done
fi
if [ -n "$TARGET_IN_CLOUD" ]; then
  say ""
  say "  WARNING: the target project sits inside a cloud-synced folder."
  say "  iCloud Optimise Mac Storage evicts file contents and leaves a stub."
  say "  OneDrive Files On-Demand leaves placeholders until first open."
  say "  A hook in either state fails when invoked, and the failure looks like"
  say "  a broken hook rather than an absent file. Keep .claude on local disk."
  SHADOWED=1
fi
[ "${STUBS:-0}" -gt 0 ] && { say "  WARNING: $STUBS evicted .icloud stub(s) found under the target .claude tree."; SHADOWED=1; }

if [ "$DEEP" = "1" ]; then
  hdr "Stray installations elsewhere on disk"
  if [ "${STRAYS:-0}" -eq 0 ]; then say "  none found outside the target"
  else
    say "  ${STRAYS} other copies found. Each is a divergence risk:"
    head -10 "$TMP/strays" | while IFS= read -r s; do say "    $s"; done
  fi
fi

# ------------------------------------------------------------------ JSON
OUT_DIR="$TARGET/.claude"
mkdir -p "$OUT_DIR" 2>/dev/null
{
  printf '{\n  "manifest": "zas-install-inventory",\n  "version": "1.0.0",\n'
  printf '  "scanned": "%s",\n  "source": "%s",\n  "target": "%s",\n' "$(date -u +%Y-%m-%dT%H:%M:%SZ)" "$SRC" "$TARGET"
  printf '  "summary": {"installed_current": %s, "missing": %s, "stale": %s, "not_in_bundle": %s, "total": %s},\n' \
    "$INSTALLED" "$MISSING" "$STALE" "$UNKNOWN" "$TOTAL"
  printf '  "cloud": {"roots_detected": %s, "artefacts_in_cloud": %s, "target_in_cloud_folder": %s, "icloud_stubs": %s},\n' \
    "$(printf '%s\n' "$CLOUD_ROOTS" | sed '/^$/d' | wc -l | tr -d ' ')" "${CLOUD_HITS:-0}" \
    "$([ -n "$TARGET_IN_CLOUD" ] && echo true || echo false)" "${STUBS:-0}"
  printf '  "deep_scan": %s,\n' "$([ "$DEEP" = "1" ] && echo true || echo false)"
  printf '  "artefacts": [\n'
  awk -F'\t' '{printf "    {\"artefact\":\"%s\",\"destination\":\"%s\",\"kind\":\"%s\",\"state\":\"%s\",\"sha256_12\":\"%s\"}%s\n", $1,$2,$3,$4,$5,(NR==n?"":",")}' \
    n="$(wc -l < "$TMP/rows" | tr -d ' ')" "$TMP/rows"
  printf '  ],\n'
  printf '  "limitations": [\n'
  printf '    "Hash comparison proves byte equality, not that the artefact behaves correctly.",\n'
  printf '    "Cloud sweep is bounded to depth 6 under each provider root; deeper nesting is not visited.",\n'
  printf '    "Placeholder and evicted files may hash differently or be unreadable without triggering a download.",\n'
  printf '    "Machine-level destinations under the home directory are shared across projects, so their state is not project-specific."\n'
  printf '  ]\n}\n'
} > "$OUT_DIR/install-inventory.json" 2>/dev/null

[ "$JSON_ONLY" = "1" ] && cat "$OUT_DIR/install-inventory.json"

hdr "Verdict"
if [ "$MISSING" -eq 0 ] && [ "$STALE" -eq 0 ] && [ "$SHADOWED" -eq 0 ]; then
  say "  FULLY INSTALLED AND CURRENT. Nothing to do."
  say "  Machine-readable: $OUT_DIR/install-inventory.json"
  exit 0
fi
say "  ACTION NEEDED: $MISSING missing, $STALE drifted$([ "$SHADOWED" = "1" ] && echo ", cloud risk present")."
say "  Run:  bash \"ZAS Claude Install 10.8.26.command\""
say "  Machine-readable: $OUT_DIR/install-inventory.json"
exit 1
