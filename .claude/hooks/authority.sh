#!/usr/bin/env bash
# ======================================================================
# CLAUDE-CODE-INJECTION
#   operation: create-new-file
#   target_path: .claude/hooks/authority.sh
#   permissions: "0755"
#   artefact_version: "1.0"
#   artefact_created: "2026-08-11T17:30:00+02:00"
#   depends_on: [consolidate.sh]
#   post_install_verify: "bash .claude/hooks/authority.sh --self-test"
#   rollback_command: "rm .claude/hooks/authority.sh"
# END-CLAUDE-CODE-INJECTION
# ======================================================================
# Authority resolver: answers "which of these copies is the real one?"
#
# consolidate.sh can prove two files differ. It deliberately refuses to
# choose between them, because byte inequality carries no information about
# correctness. This tool supplies that missing information by ranking each
# candidate on four independent evidence signals, weakest to strongest:
#
#   1. VALIDITY   (veto)   a file that fails syntax check cannot be
#                          authoritative regardless of every other signal
#   2. VERSION    (5 pts)  artefact_version in the injection header, compared
#                          as semver. Declared intent beats inferred intent.
#   3. GIT        (3 pts)  committed beats uncommitted; a more recent commit
#                          beats an older one. Review history is evidence.
#   4. LOCATION   (2 pts)  inside the canonical tree beats outside it
#   5. MTIME      (1 pt)   newest wins. Weakest signal: a stray copy touched
#                          by a backup tool looks new but is not authoritative
#
# Verdict confidence reflects the margin AND which signals produced it. A win
# on version plus git is high confidence. A win on mtime alone is low, and
# the tool says so rather than pretending.
#
# Never overwrites without --apply. Always archives before replacing.
#
# Usage:
#   authority.sh FILE_A FILE_B [FILE_C ...]     rank candidates
#   authority.sh --resolve-report REPORT.json   process consolidate.sh output
#   authority.sh --apply FILE_A FILE_B          promote the winner
#   authority.sh --self-test
set -uo pipefail

APPLY=0; SELFTEST=0; REPORT=""
CANON="${CLAUDE_CANONICAL:-$HOME/.claude}"
ARGS=""
while [ $# -gt 0 ]; do
  case "$1" in
    --apply) APPLY=1; shift ;;
    --canonical) CANON="${2:-}"; shift 2 ;;
    --resolve-report) REPORT="${2:-}"; shift 2 ;;
    --self-test) SELFTEST=1; shift ;;
    -h|--help) sed -n '15,40p' "$0"; exit 0 ;;
    *) ARGS="$ARGS
$1"; shift ;;
  esac
done

# --- signal 1: validity veto -------------------------------------------
validity() { # 1 valid, 0 invalid
  case "$1" in
    *.sh) bash -n "$1" >/dev/null 2>&1 && echo 1 || echo 0 ;;
    *.py) python3 -m py_compile "$1" >/dev/null 2>&1 && echo 1 || echo 0 ;;
    *.json) python3 -c "import json,sys;json.load(open(sys.argv[1]))" "$1" >/dev/null 2>&1 && echo 1 || echo 0 ;;
    *) [ -s "$1" ] && echo 1 || echo 0 ;;
  esac
}

# --- signal 2: declared version ----------------------------------------
version_of() {
  v="$(grep -m1 'artefact_version' "$1" 2>/dev/null | sed 's/[^0-9.]//g' | sed 's/^\.*//; s/\.*$//')"
  [ -z "$v" ] && v="0"
  printf '%s' "$v"
}
# Returns 0 if $1 > $2 as semver
ver_gt() {
  python3 - "$1" "$2" <<'PY' 2>/dev/null
import sys
def t(v):
    parts=[p for p in v.split('.') if p!='']
    return tuple(int(p) for p in parts) if parts else (0,)
a,b=t(sys.argv[1]),t(sys.argv[2])
n=max(len(a),len(b)); a=a+(0,)*(n-len(a)); b=b+(0,)*(n-len(b))
sys.exit(0 if a>b else 1)
PY
}

# --- signal 3: git provenance ------------------------------------------
git_score() { # epoch of last commit, or 0 if untracked
  d="$(dirname "$1")"; b="$(basename "$1")"
  ( cd "$d" 2>/dev/null && git rev-parse --is-inside-work-tree >/dev/null 2>&1 \
    && git log -1 --format=%ct -- "$b" 2>/dev/null ) || echo 0
}

# --- signal 5: mtime ----------------------------------------------------
mtime_of() { stat -f %m "$1" 2>/dev/null || stat -c %Y "$1" 2>/dev/null || echo 0; }

# ------------------------------------------------------------- self-test
if [ "$SELFTEST" = "1" ]; then
  T="$(mktemp -d)"; N=0; F=0
  chk() { N=$((N+1)); if [ "$2" = "$3" ]; then printf 'PASS  %-40s exp=%s act=%s\n' "$1" "$2" "$3"
          else printf 'FAIL  %-40s exp=%s act=%s\n' "$1" "$2" "$3"; F=$((F+1)); fi; }

  # VETO: a syntactically broken file must never win, even when newer
  printf '#!/usr/bin/env bash\n# artefact_version: "1.0"\necho ok\n' > "$T/old.sh"
  sleep 1
  printf '#!/usr/bin/env bash\n# artefact_version: "9.0"\nif [ then fi\n' > "$T/broken.sh"
  OUT="$(bash "$0" "$T/old.sh" "$T/broken.sh" 2>/dev/null || true)"
  case "$OUT" in *"WINNER: $T/old.sh"*) chk "veto/invalid-never-wins" 0 0 ;;
                 *) chk "veto/invalid-never-wins" 0 1 ;; esac

  # VERSION beats MTIME: older file with higher version wins
  printf '#!/usr/bin/env bash\n# artefact_version: "2.0"\necho a\n' > "$T/v2.sh"
  sleep 1
  printf '#!/usr/bin/env bash\n# artefact_version: "1.0"\necho b\n' > "$T/v1-newer.sh"
  OUT="$(bash "$0" "$T/v2.sh" "$T/v1-newer.sh" 2>/dev/null || true)"
  case "$OUT" in *"WINNER: $T/v2.sh"*) chk "rank/version-beats-mtime" 0 0 ;;
                 *) chk "rank/version-beats-mtime" 0 1 ;; esac

  # MTIME-ONLY win must be reported as low confidence
  printf 'plain a\n' > "$T/a.txt"; sleep 1; printf 'plain b\n' > "$T/b.txt"
  OUT="$(bash "$0" "$T/a.txt" "$T/b.txt" 2>/dev/null || true)"
  case "$OUT" in *"confidence: low"*) chk "honesty/mtime-only-is-low-conf" 0 0 ;;
                 *) chk "honesty/mtime-only-is-low-conf" 0 1 ;; esac

  # DRY RUN must not modify anything
  H="$(shasum -a 256 "$T/v1-newer.sh" 2>/dev/null | cut -d' ' -f1)"
  bash "$0" "$T/v2.sh" "$T/v1-newer.sh" >/dev/null 2>&1 || true
  H2="$(shasum -a 256 "$T/v1-newer.sh" 2>/dev/null | cut -d' ' -f1)"
  [ "$H" = "$H2" ] && chk "safety/dry-run-modifies-nothing" 0 0 || chk "safety/dry-run-modifies-nothing" 0 1

  # APPLY promotes the winner and archives the loser
  bash "$0" --apply --canonical "$T/canon" "$T/v2.sh" "$T/v1-newer.sh" >/dev/null 2>&1 || true
  if cmp -s "$T/v2.sh" "$T/v1-newer.sh"; then chk "apply/loser-replaced-by-winner" 0 0
  else chk "apply/loser-replaced-by-winner" 0 1; fi
  find "$T/canon/_authority" -type f 2>/dev/null | grep -q . \
    && chk "apply/loser-archived-not-lost" 0 0 || chk "apply/loser-archived-not-lost" 0 1

  # ABSENCE: a missing file must not crash
  # One missing candidate leaves fewer than two: exit 2 is the correct
  # "cannot rank" signal, not a crash. Anything above 2 would be a crash.
  bash "$0" "$T/nope.sh" "$T/v2.sh" >/dev/null 2>&1
  RC=$?; [ "$RC" -le 2 ] && chk "absence/missing-file-handled" 0 0 || chk "absence/missing-file-handled" 0 1

  # ABSENCE: single candidate is not a contest
  bash "$0" "$T/v2.sh" >/dev/null 2>&1
  RC=$?; [ "$RC" -le 2 ] && chk "absence/single-candidate" 0 0 || chk "absence/single-candidate" 0 1

  rm -rf "$T"
  printf '\nControls: %s  Failures: %s\n' "$N" "$F"
  [ "$F" -gt 0 ] && { echo "RESULT: BROKEN"; exit 1; }
  echo "RESULT: OPERATIONAL"; exit 0
fi

# ------------------------------------------------- report-driven mode
if [ -n "$REPORT" ]; then
  [ -f "$REPORT" ] || { echo "report not found: $REPORT" >&2; exit 2; }
  echo "Resolving DIVERGENT pairs from $REPORT"
  python3 - "$REPORT" <<'PY' | while IFS="$(printf '\t')" read -r a b; do
import json,sys
d=json.load(open(sys.argv[1]))
for i in d.get("items",[]):
    if i.get("state")=="DIVERGENT":
        print(i["path"]+"\t"+i["counterpart"])
PY
    [ -n "$a" ] && [ -n "$b" ] && bash "$0" ${APPLY:+} "$a" "$b"
  done
  exit 0
fi

# ---------------------------------------------------------------- rank
CANDS="$(printf '%s\n' "$ARGS" | sed '/^$/d')"
COUNT="$(printf '%s\n' "$CANDS" | sed '/^$/d' | wc -l | tr -d ' ')"
[ "$COUNT" -lt 2 ] && { echo "Need at least two candidates to rank. Given: $COUNT"; exit 2; }

CANDFILE="$(mktemp)"; printf '%s\n' "$CANDS" > "$CANDFILE"
RANK="$(python3 - "$CANON" "$CANDFILE" <<'PY'
import subprocess, sys, os, json, re

# Candidates arrive via a temp file: the heredoc already occupies stdin.
canon = sys.argv[1]
files = [l.strip() for l in open(sys.argv[2]) if l.strip()]

def valid(f):
    try:
        if f.endswith(".sh"):
            return subprocess.run(["bash","-n",f],capture_output=True).returncode == 0
        if f.endswith(".py"):
            return subprocess.run([sys.executable,"-m","py_compile",f],capture_output=True).returncode == 0
        if f.endswith(".json"):
            json.load(open(f)); return True
        return os.path.getsize(f) > 0
    except Exception:
        return False

def version(f):
    try:
        for line in open(f, errors="replace"):
            if "artefact_version" in line:
                m = re.search(r"(\d+(?:\.\d+)*)", line)
                if m: return tuple(int(x) for x in m.group(1).split("."))
    except Exception:
        pass
    return (0,)

def gitts(f):
    d = os.path.dirname(os.path.abspath(f)) or "."
    try:
        r = subprocess.run(["git","-C",d,"log","-1","--format=%ct","--",os.path.basename(f)],
                           capture_output=True, text=True, timeout=10)
        return int(r.stdout.strip() or 0)
    except Exception:
        return 0

rows = []
for f in files:
    if not os.path.isfile(f):
        print(f"  {f:<50} (missing, excluded)", file=sys.stderr); continue
    rows.append({"f": f, "v": 1 if valid(f) else 0, "ver": version(f),
                 "git": gitts(f), "canon": 1 if os.path.abspath(f).startswith(os.path.abspath(canon)+os.sep) else 0,
                 "mt": int(os.path.getmtime(f))})

if len(rows) < 2:
    print("INSUFFICIENT\t-\tnone"); sys.exit(0)

print(f"  {'candidate':<46}{'valid':>6}{'version':>10}{'git':>6}{'canon':>7}", file=sys.stderr)
for r in rows:
    vs = ".".join(str(x) for x in r["ver"])
    print(f"  {r['f']:<46}{r['v']:>6}{vs:>10}{'yes' if r['git'] else 'no':>6}{r['canon']:>7}", file=sys.stderr)

valids = [r for r in rows if r["v"] == 1]
pool = valids if valids else rows
pool.sort(key=lambda r: (r["ver"], r["git"], r["canon"], r["mt"]), reverse=True)
w, rest = pool[0], pool[1:]

sig = []
if not valids:
    sig.append("ALL-CANDIDATES-INVALID")
elif len(valids) < len(rows):
    sig.append("validity-veto")
if rest:
    o = rest[0]
    if w["ver"] > o["ver"]: sig.append("version")
    if w["git"] > o["git"]: sig.append("git")
    if w["canon"] > o["canon"]: sig.append("canonical-location")
    if w["mt"] > o["mt"]: sig.append("mtime")

strong = {"version", "git", "validity-veto"}
strong_hits = [x for x in sig if x in strong]
if not sig:                     conf = "none"
elif sig == ["mtime"]:          conf = "low"
elif len(strong_hits) >= 2:     conf = "high"
elif strong_hits:               conf = "medium"
else:                           conf = "low"
print(w["f"] + "\t" + (",".join(sig) if sig else "identical-signals") + "\t" + conf)
PY
)"
rm -f "$CANDFILE"
WFILE="$(printf '%s' "$RANK" | tail -1 | cut -f1)"
WSIG="$(printf '%s' "$RANK" | tail -1 | cut -f2)"
WCONF="$(printf '%s' "$RANK" | tail -1 | cut -f3)"
[ "$WFILE" = "INSUFFICIENT" ] && { echo "Fewer than two readable candidates."; exit 2; }

echo ""
echo "WINNER: $WFILE"
echo "  decided by: $WSIG"
echo "  confidence: $WCONF"
case "$WCONF" in
  low)  echo "  Low confidence means only mtime separated them. A backup tool or a"
        echo "  copy operation can make a stale file look newest. Diff them yourself." ;;
  none) echo "  No signal separated these files. They are equally plausible." ;;
esac
case "$WSIG" in *ALL-CANDIDATES-INVALID*)
  echo "  WARNING: every candidate fails its syntax check. None is safe to promote." ;;
esac

if [ "$APPLY" = "1" ]; then
  case "$WSIG" in *ALL-CANDIDATES-INVALID*) echo ""; echo "Refusing to promote: no valid candidate."; exit 1 ;; esac
  if [ "$WCONF" = "low" ] || [ "$WCONF" = "none" ]; then
    echo ""; echo "Refusing to promote on $WCONF confidence. Resolve manually."; exit 1
  fi
  ARC="$CANON/_authority/$(date -u +%Y%m%dT%H%M%SZ)"; mkdir -p "$ARC"
  printf '%s\n' "$CANDS" | while IFS= read -r f; do
    [ -f "$f" ] || continue
    [ "$f" = "$WFILE" ] && continue
    rel="$(printf '%s' "$f" | sed 's|^/||; s|/|_|g')"
    cp "$f" "$ARC/$rel" 2>/dev/null && cp "$WFILE" "$f" 2>/dev/null \
      && echo "  promoted winner over: $f"
  done
  echo "  losers archived to: $ARC"
fi
exit 0
