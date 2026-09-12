#!/usr/bin/env bash
# ======================================================================
# CLAUDE-CODE-INJECTION
#   operation: create-new-file
#   target_path: .claude/hooks/verify-delivery.sh
#   create_parent_dirs: true
#   overwrite_if_exists: false
#   backup_if_exists: true
#   permissions: "0755"
#   artefact_version: "1.0"
#   artefact_created: "2026-08-10T18:00:00+02:00"
#   depends_on: [bundle-pre-delivery-verification/SKILL.md]
#   post_install_verify: "bash .claude/hooks/verify-delivery.sh --self-test"
#   rollback_command: "rm .claude/hooks/verify-delivery.sh"
# END-CLAUDE-CODE-INJECTION
# ======================================================================
# Mechanical gate for bundle-pre-delivery-verification Steps 5, 6, 7.
# Run over a staged bundle BEFORE zipping and BEFORE present_files.
# Exits non-zero on any failure. POSIX/BSD-safe: no grep -P, no GNU sed -i.
#
# Usage: verify-delivery.sh <bundle-dir> [--allow file1,file2]
#        verify-delivery.sh --self-test
set -uo pipefail

FAILS=0; CHECKS=0
say()  { printf '%s\n' "$*"; }
ok()   { CHECKS=$((CHECKS+1)); printf 'PASS  %s\n' "$1"; }
bad()  { CHECKS=$((CHECKS+1)); FAILS=$((FAILS+1)); printf 'FAIL  %s\n' "$1"; [ -n "${2:-}" ] && printf '      %s\n' "$2"; }

if [ "${1:-}" = "--self-test" ]; then
  T="$(mktemp -d)"; mkdir -p "$T/good"
  printf '#!/usr/bin/env bash\n. ./_telemetry.sh\ntel_emit "x" "$INPUT" "pass" 0 "$T_START" ""\nexit 0\n' > "$T/good/a.sh"
  printf 'session_id prompt_id exit_code duration_ms tool_use_id permission_mode agent_id agent_type cwd\n' > "$T/good/_telemetry.sh"
  chmod +x "$T/good/a.sh"
  printf 'See a.sh and missing-file.sh\n' > "$T/good/README.md"
  if bash "$0" "$T/good" >/dev/null 2>&1; then
    say "SELF-TEST FAIL: gate passed a bundle with a broken reference"; rm -rf "$T"; exit 1
  fi
  say "SELF-TEST PASS: gate correctly rejected a broken reference"; rm -rf "$T"; exit 0
fi

DIR="${1:-}"
[ -z "$DIR" ] && { say "usage: verify-delivery.sh <bundle-dir> [--allow a.sh,b.sh]"; exit 2; }
[ -d "$DIR" ] || { say "not a directory: $DIR"; exit 2; }
ALLOW=""
[ "${2:-}" = "--allow" ] && ALLOW="${3:-}"

say "================ PRE-DELIVERY GATE ================"
say "Bundle: $DIR"
say ""

# ---------- STEP 5: REFERENCE CLOSURE ----------
say "--- Step 5: reference closure ---"
TMP="$(mktemp -d)"; trap 'rm -rf "$TMP"' EXIT
# Reference extraction and resolution, delegated to python3 for correctness.
# Rules: strip comments first; allow dots inside the name; reject a match whose
# extension runs into more alphanumerics (so hashlib.sha256 is not read as
# hashlib.sh); resolve a reference if ANY shipped file's basename ends with it
# (so weekly.plist resolves against com.zasupport.ccwatchdog.weekly.plist).
python3 - "$DIR" "$TMP" "$ALLOW" <<'PYGATE'
import os, re, sys
root, tmp, allow = sys.argv[1], sys.argv[2], sys.argv[3]
SKIP_DIRS = {'.git', 'fixtures', '__pycache__', 'node_modules', '_archive'}
EXT = r'(?:sh|py|plist|json|ts|tsx|yml|yaml)'
PAT = re.compile(r'([A-Za-z0-9_][A-Za-z0-9_.-]*\.' + EXT + r')(?![A-Za-z0-9])')

# Shipped set includes EVERY file, fixtures included. Only the reference SCAN
# skips fixtures (test data must not be read as a promise).
shipped = set()
for dp, dn, fn in os.walk(root):
    dn[:] = [d for d in dn if d not in {'.git', '__pycache__', 'node_modules'}]
    for f in fn:
        shipped.add(f)

refs = set()
for dp, dn, fn in os.walk(root):
    dn[:] = [d for d in dn if d not in SKIP_DIRS]
    for f in fn:
        if f.endswith('.zip'):
            continue
        try:
            txt = open(os.path.join(dp, f), errors='replace').read()
        except OSError:
            continue
        txt = re.sub(r'#.*$', '', txt, flags=re.M)          # drop comments
        for m in PAT.findall(txt):
            refs.add(m.rstrip('.'))

allowed = set(x.strip() for x in allow.split(',') if x.strip())
allowed |= {'package.json','tsconfig.json','pyproject.toml','pytest.ini','settings.json',
            'settings.local.json','hooks.json','plugin.json','marketplace.json',
            'environment.json','telemetry.ndjson','smoke-results.ndjson','validation.log',
            'does-not-exist.py','missing.py','no-such-artefact.py'}
di = os.path.join(root, '.deliveryignore')
if os.path.exists(di):
    for line in open(di):
        line = line.split('#')[0].strip()
        if line:
            allowed.add(line)

def resolves(r):
    if r in allowed or r in shipped:
        return True
    # suffix match: weekly.plist resolves against com.zasupport...weekly.plist
    return any(sf.endswith(r) or sf.endswith('.' + r) for sf in shipped)

unresolved = sorted(r for r in refs if not resolves(r))
open(os.path.join(tmp, 'referenced.txt'), 'w').write('\n'.join(sorted(refs)) + '\n')
open(os.path.join(tmp, 'unresolved.txt'), 'w').write('\n'.join(unresolved) + ('\n' if unresolved else ''))
PYGATE
UNRES="$(wc -l < "$TMP/unresolved.txt" | tr -d ' ')"
if [ "${UNRES:-0}" -eq 0 ]; then
  ok "reference closure ($(wc -l < "$TMP/referenced.txt" | tr -d ' ') references, all resolved)"
else
  bad "reference closure: $UNRES referenced file(s) neither shipped nor allowlisted" "$(tr '\n' ' ' < "$TMP/unresolved.txt")"
fi

# ---------- STEP 6: INSTRUMENTATION ----------
say ""
say "--- Step 6: instrumentation ---"
# Verification tooling (verify-*, smoke-test*) is exempt from the telemetry
# requirement: its exit code and stdout ARE its report. Everything else that
# executes must be instrumented. The exemption is narrow and named, not silent.
EXECS="$(find "$DIR" -type f \( -name '*.sh' -o -name '*.py' \) ! -name '_*' ! -name 'verify-*' ! -name 'smoke-test*' ! -path '*/fixtures/*' ! -path '*/__pycache__/*' 2>/dev/null || true)"
HYGIENE_TARGETS="$(find "$DIR" -type f \( -name '*.sh' -o -name '*.py' \) ! -path '*/fixtures/*' ! -path '*/__pycache__/*' 2>/dev/null || true)"
if [ -z "$EXECS" ]; then
  ok "no executable artefacts to instrument"
else
  # Telemetry emitter present anywhere in the bundle?
  TELFILE="$(find "$DIR" -type f -name '_telemetry.sh' | head -1)"
  if [ -n "$TELFILE" ]; then ok "telemetry emitter shipped ($(basename "$(dirname "$TELFILE")")/_telemetry.sh)"
  else bad "no _telemetry.sh emitter in bundle" "executables cannot report exit code, duration, or correlation IDs"; fi

  # Required fields captured somewhere in the bundle
  MISSINGF=""
  for f in session_id prompt_id tool_use_id permission_mode agent_id agent_type cwd exit_code duration_ms; do
    grep -rq "$f" "$DIR" 2>/dev/null || MISSINGF="$MISSINGF $f"
  done
  if [ -z "$MISSINGF" ]; then ok "all nine correlation and outcome fields captured"
  else bad "instrumentation fields missing:$MISSINGF"; fi

  # Collector command present
  if find "$DIR" -type f -name 'collect-diagnostics.sh' | grep -q .; then ok "diagnostics collector shipped"
  else bad "no collect-diagnostics.sh" "findings cannot be handed back in one file"; fi

  # Environment snapshot capability
  grep -rq 'claude --version\|sw_vers\|hw.model' "$DIR" 2>/dev/null \
    && ok "environment snapshot capability present" \
    || bad "no environment capture" "findings cannot be tied to a toolchain"

  # Per-script hygiene
  HY=0
  for s in $HYGIENE_TARGETS; do
    head -1 "$s" | grep -q '^#!' || { bad "missing shebang: $(basename "$s")"; HY=1; }
    case "$s" in
      *.sh) bash -n "$s" 2>/dev/null || { bad "bash syntax error: $(basename "$s")"; HY=1; } ;;
      *.py) python3 -m py_compile "$s" 2>/dev/null || { bad "python syntax error: $(basename "$s")"; HY=1; } ;;
    esac
    # Strip comments first: a comment saying "never use grep -P" is compliance, not a violation.
    sed -e 's/#.*$//' "$s" 2>/dev/null | grep -q 'grep -P' && { bad "grep -P not BSD-safe: $(basename "$s")"; HY=1; }
    sed -e 's/#.*$//' "$s" 2>/dev/null | grep -qE "sed -i[[:space:]]+[^'\"]" && { bad "GNU sed -i not BSD-safe: $(basename "$s")"; HY=1; }
  done
  [ "$HY" -eq 0 ] && ok "script hygiene: shebangs, syntax, BSD-safety ($(printf '%s\n' $HYGIENE_TARGETS | wc -l | tr -d ' ') files)"
fi

# ---------- STEP 7: REVIEW READINESS ----------
say ""
say "--- Step 7: review readiness ---"
find "$DIR" -type f -name 'smoke-test.sh' | grep -q . \
  && ok "smoke test shipped" \
  || bad "no smoke-test.sh" "no executable proof the artefacts work"
grep -rqi 'falsification\|sabotag' "$DIR" 2>/dev/null \
  && ok "falsification evidence documented" \
  || bad "no falsification evidence" "a gate that cannot fail proves nothing"
README="$(find "$DIR" -maxdepth 2 -iname 'README.md' | head -1)"
if [ -n "$README" ]; then ok "README present"; else bad "no README" "no verification log destination"; fi
# Limitations must appear in the README itself, not merely somewhere in the bundle.
if [ -n "$README" ] && grep -qi 'limitation\|cannot tell\|still cannot\|does not cover' "$README" 2>/dev/null; then
  ok "stated limitations present in README"
else
  bad "no limitations section in README" "reader cannot tell what the evidence does not cover"
fi

say ""
say "================ GATE SUMMARY ================"
printf 'Checks: %s   Failures: %s\n' "$CHECKS" "$FAILS"
if [ "$FAILS" -gt 0 ]; then
  say "RESULT: BLOCKED. Do not zip. Do not call present_files. Fix and re-run."
  exit 1
fi
say "RESULT: CLEARED for delivery. Dispatch the delivery-auditor subagent, then present_files."
exit 0
