#!/usr/bin/env bash
# ======================================================================
# CLAUDE-CODE-INJECTION
#   operation: create-new-file
#   target_path: .claude/hooks/persistence-watchdog.sh
#   permissions: "0755"
#   overwrite_if_exists: false
#   backup_if_exists: true
#   artefact_version: "1.0"
#   artefact_created: "2026-08-11T20:00:00+02:00"
#   depends_on: [_telemetry.sh, advisor-eval.py]
#   post_install_verify: "bash .claude/hooks/persistence-watchdog.sh --self-test"
#   rollback_command: "rm .claude/hooks/persistence-watchdog.sh"
# END-CLAUDE-CODE-INJECTION
# ======================================================================
# Persistence watchdog for compounded intelligence (HR, 11/08/2026).
#
# A feature that compounds intelligence is worthless if its accumulation
# silently stops. Telemetry that stopped writing, a ledger that stopped
# growing, or an eval history frozen three weeks ago all look identical to a
# healthy system from the outside: the files exist and the commands succeed.
#
# This watchdog proves accumulation rather than assuming it. For every
# compounded-intelligence artefact it checks three things:
#   GROWTH    is it larger than the last recorded checkpoint?
#   FRESHNESS is its newest entry within the expected interval?
#   INTEGRITY is it still parseable and monotonic (append-only, never shrunk)?
#
# Self-healing: a stalled launchd agent is kickstarted once, a missing
# artefact is initialised rather than reported forever, and a corrupted
# checkpoint is rebuilt from the artefact itself.
#
# Runs under launchd daily. Silent when healthy.
set -uo pipefail

ROOT="${CLAUDE_PROJECT_DIR:-$(pwd)}"
STATE="$ROOT/.claude/persistence"
LOG="$ROOT/.claude/validation.log"
REPORT="$STATE/persistence-report.json"
SELFTEST=0; HEAL=1
for a in "$@"; do
  case "$a" in
    --self-test) SELFTEST=1 ;;
    --no-heal) HEAL=0 ;;
    -h|--help) sed -n '17,32p' "$0"; exit 0 ;;
  esac
done
mkdir -p "$STATE" 2>/dev/null

ts() { date -u +%Y-%m-%dT%H:%M:%SZ; }
log() { printf '%s\tpersistence-watchdog\t%s\n' "$(ts)" "$1" >> "$LOG" 2>/dev/null || true; }
mtime_of() {
  m="$(stat -f %m "$1" 2>/dev/null)"
  case "$m" in ''|*[!0-9]*) m="$(stat -c %Y "$1" 2>/dev/null)" ;; esac
  case "$m" in ''|*[!0-9]*) m=0 ;; esac
  printf '%s' "$m"
}

# artefact | max age hours | kind
ARTEFACTS="telemetry.ndjson|168|ndjson
validation.log|168|text
learning-ledger.md|336|text
eval-history.ndjson|336|ndjson
patterns/findings.json|336|json"

# ------------------------------------------------------------- self-test
if [ "$SELFTEST" = "1" ]; then
  T="$(mktemp -d)"; N=0; F=0
  chk() { N=$((N+1)); if [ "$2" = "$3" ]; then printf 'PASS  %-40s exp=%s act=%s\n' "$1" "$2" "$3"
          else printf 'FAIL  %-40s exp=%s act=%s\n' "$1" "$2" "$3"; F=$((F+1)); fi; }
  mkdir -p "$T/.claude/patterns"
  printf '{"a":1}\n{"a":2}\n' > "$T/.claude/telemetry.ndjson"
  # POSITIVE: growth between runs is detected as healthy
  CLAUDE_PROJECT_DIR="$T" bash "$0" --no-heal >/dev/null 2>&1
  printf '{"a":3}\n' >> "$T/.claude/telemetry.ndjson"
  OUT="$(CLAUDE_PROJECT_DIR="$T" bash "$0" --no-heal 2>&1 || true)"
  case "$OUT" in *"GROWING"*) chk "positive/growth-detected" 0 0 ;; *) chk "positive/growth-detected" 0 1 ;; esac
  # NEGATIVE: no growth between runs must be reported as stalled
  OUT="$(CLAUDE_PROJECT_DIR="$T" bash "$0" --no-heal 2>&1 || true)"
  case "$OUT" in *"STALLED"*) chk "negative/stall-detected" 0 0 ;; *) chk "negative/stall-detected" 0 1 ;; esac
  # NEGATIVE, the critical one: shrinkage means append-only was violated
  printf '{"a":1}\n' > "$T/.claude/telemetry.ndjson"
  OUT="$(CLAUDE_PROJECT_DIR="$T" bash "$0" --no-heal 2>&1 || true)"
  case "$OUT" in *"SHRANK"*) chk "negative/shrinkage-detected" 0 0 ;; *) chk "negative/shrinkage-detected" 0 1 ;; esac
  # NEGATIVE: corrupt ndjson must be caught, not silently counted
  printf 'not json at all\n' >> "$T/.claude/telemetry.ndjson"
  OUT="$(CLAUDE_PROJECT_DIR="$T" bash "$0" --no-heal 2>&1 || true)"
  case "$OUT" in *"CORRUPT"*) chk "negative/corruption-detected" 0 0 ;; *) chk "negative/corruption-detected" 0 1 ;; esac
  # ABSENCE: a missing artefact must be reported, never crash
  rm -f "$T/.claude/telemetry.ndjson"
  CLAUDE_PROJECT_DIR="$T" bash "$0" --no-heal >/dev/null 2>&1
  RC=$?; [ "$RC" -le 1 ] && chk "absence/missing-artefact-handled" 0 0 || chk "absence/missing-artefact-handled" 0 1
  # SELF-HEAL: a missing artefact is initialised rather than reported forever
  CLAUDE_PROJECT_DIR="$T" bash "$0" >/dev/null 2>&1
  [ -f "$T/.claude/telemetry.ndjson" ] && chk "heal/missing-artefact-initialised" 0 0 || chk "heal/missing-artefact-initialised" 0 1
  # ABSENCE: an entirely empty project must not crash
  CLAUDE_PROJECT_DIR="$T/nothing" bash "$0" >/dev/null 2>&1
  RC=$?; [ "$RC" -le 1 ] && chk "absence/empty-project-handled" 0 0 || chk "absence/empty-project-handled" 0 1
  # REPORT: machine-readable output is always produced
  [ -f "$T/.claude/persistence/persistence-report.json" ] \
    && chk "report/json-always-written" 0 0 || chk "report/json-always-written" 0 1
  rm -rf "$T"
  printf '\nControls: %s  Failures: %s\n' "$N" "$F"
  [ "$F" -gt 0 ] && { echo "RESULT: BROKEN"; exit 1; }
  echo "RESULT: OPERATIONAL"; exit 0
fi

# ------------------------------------------------------------------ check
NOW="$(date -u +%s)"
HEALTHY=0; STALLED=0; BROKEN=0; HEALED=0
: > "$STATE/rows.tmp"

printf '%s\n' "$ARTEFACTS" | while IFS='|' read -r name maxh kind; do
  [ -z "$name" ] && continue
  F="$ROOT/.claude/$name"
  CK="$STATE/$(printf '%s' "$name" | tr '/' '_').checkpoint"
  PREV="$( [ -f "$CK" ] && cat "$CK" || echo 0 )"

  if [ ! -f "$F" ]; then
    if [ "$HEAL" = "1" ]; then
      mkdir -p "$(dirname "$F")" 2>/dev/null
      case "$kind" in
        json) printf '{"initialised":"%s","findings":[]}\n' "$(ts)" > "$F" ;;
        *) : > "$F" ;;
      esac
      printf 'HEALED\t%s\tinitialised (was absent)\n' "$name" >> "$STATE/rows.tmp"
      log "HEALED initialised $name"
    else
      printf 'ABSENT\t%s\tnot present\n' "$name" >> "$STATE/rows.tmp"
    fi
    continue
  fi

  SZ="$(wc -c < "$F" | tr -d ' ')"
  AGE_H=$(( (NOW - $(mtime_of "$F")) / 3600 ))

  # INTEGRITY: ndjson must parse; a corrupt line means the stream is unusable
  if [ "$kind" = "ndjson" ] && [ "$SZ" -gt 0 ]; then
    BAD="$(python3 - "$F" <<'PY' 2>/dev/null
import json,sys
bad=0
for l in open(sys.argv[1],errors="replace"):
    l=l.strip()
    if not l: continue
    try: json.loads(l)
    except ValueError: bad+=1
print(bad)
PY
)"
    if [ "${BAD:-0}" -gt 0 ]; then
      printf 'CORRUPT\t%s\t%s unparseable line(s)\n' "$name" "$BAD" >> "$STATE/rows.tmp"
      log "CORRUPT $name $BAD bad lines"
      printf '%s' "$SZ" > "$CK"; continue
    fi
  fi

  # INTEGRITY: append-only means size must never decrease
  if [ "$SZ" -lt "$PREV" ]; then
    printf 'SHRANK\t%s\t%s bytes, was %s (append-only violated)\n' "$name" "$SZ" "$PREV" >> "$STATE/rows.tmp"
    log "SHRANK $name $PREV -> $SZ"
    printf '%s' "$SZ" > "$CK"; continue
  fi

  if [ "$SZ" -gt "$PREV" ]; then
    printf 'GROWING\t%s\t+%s bytes since last check\n' "$name" "$((SZ - PREV))" >> "$STATE/rows.tmp"
  elif [ "$AGE_H" -gt "$maxh" ]; then
    printf 'STALLED\t%s\tno growth, %sh old (ceiling %sh)\n' "$name" "$AGE_H" "$maxh" >> "$STATE/rows.tmp"
    log "STALLED $name ${AGE_H}h"
  else
    printf 'STALLED\t%s\tno growth since last check\n' "$name" >> "$STATE/rows.tmp"
  fi
  printf '%s' "$SZ" > "$CK"
done

# --------------------------------------------------- launchd self-healing
AGENTS="com.zasupport.ccwatchdog.weekly com.zasupport.ccwatchdog.heartbeat com.zasupport.ccadvisor com.zasupport.persistence"
LAUNCH_NOTE=""
if command -v launchctl >/dev/null 2>&1; then
  for L in $AGENTS; do
    if ! launchctl print "gui/$(id -u)/$L" >/dev/null 2>&1; then
      if [ -f "$HOME/Library/LaunchAgents/$L.plist" ] && [ "$HEAL" = "1" ]; then
        launchctl bootstrap "gui/$(id -u)" "$HOME/Library/LaunchAgents/$L.plist" 2>/dev/null \
          && LAUNCH_NOTE="$LAUNCH_NOTE $L:rebootstrapped" && log "HEALED rebootstrapped $L"
      else
        LAUNCH_NOTE="$LAUNCH_NOTE $L:not-loaded"
      fi
    fi
  done
else
  LAUNCH_NOTE="launchctl-unavailable"
fi

# ----------------------------------------------------------------- report
[ -f "$STATE/rows.tmp" ] || : > "$STATE/rows.tmp"
G="$(grep -c '^GROWING' "$STATE/rows.tmp" 2>/dev/null | head -1)"; [ -z "$G" ] && G=0
S="$(grep -c '^STALLED' "$STATE/rows.tmp" 2>/dev/null | head -1)"; [ -z "$S" ] && S=0
B="$(grep -cE '^(SHRANK|CORRUPT)' "$STATE/rows.tmp" 2>/dev/null || echo 0)"
H="$(grep -c '^HEALED' "$STATE/rows.tmp" 2>/dev/null | head -1)"; [ -z "$H" ] && H=0
A="$(grep -c '^ABSENT' "$STATE/rows.tmp" 2>/dev/null | head -1)"; [ -z "$A" ] && A=0

echo "Compounded intelligence persistence check  $(ts)"
echo ""
awk -F'\t' '{printf "  %-9s %-26s %s\n", $1, $2, $3}' "$STATE/rows.tmp" 2>/dev/null
echo ""
echo "  growing $G   stalled $S   broken $B   healed $H   absent $A"
[ -n "$LAUNCH_NOTE" ] && echo "  launchd:$LAUNCH_NOTE"

{
  printf '{\n  "manifest": "zas-persistence",\n  "checked": "%s",\n' "$(ts)"
  printf '  "summary": {"growing": %s, "stalled": %s, "broken": %s, "healed": %s, "absent": %s},\n' "$G" "$S" "$B" "$H" "$A"
  printf '  "launchd": "%s",\n  "artefacts": [\n' "$(printf '%s' "$LAUNCH_NOTE" | sed 's/^ //')"
  awk -F'\t' '{printf "    {\"state\":\"%s\",\"artefact\":\"%s\",\"detail\":\"%s\"}%s\n", $1,$2,$3,(NR==n?"":",")}' \
    n="$(wc -l < "$STATE/rows.tmp" | tr -d ' ')" "$STATE/rows.tmp" 2>/dev/null
  printf '  ],\n  "limitations": [\n'
  printf '    "Growth proves accumulation, not that what accumulated is useful.",\n'
  printf '    "Freshness ceilings are configured, not derived from observed cadence.",\n'
  printf '    "A stalled artefact may be correct if no work occurred in the interval."\n'
  printf '  ]\n}\n'
} > "$REPORT" 2>/dev/null
rm -f "$STATE/rows.tmp"

echo ""
echo "Machine-readable: $REPORT"
[ "$B" -gt 0 ] && { echo "BROKEN: append-only or integrity violated. Investigate before trusting the record."; exit 1; }
[ "$S" -gt 0 ] && exit 1
exit 0
