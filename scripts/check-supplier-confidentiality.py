#!/usr/bin/env python3
# CLAUDE-CODE-INJECTION
#   target_path: scripts/check-supplier-confidentiality.py
#   permissions: 0755
#   create_parent_dirs: false
#   overwrite_if_exists: false
#   backup_if_exists: .claude/_archive/<UTC>/
#   post_install_verify: python3 scripts/check-supplier-confidentiality.py --test
#   rollback_command: git checkout -- scripts/check-supplier-confidentiality.py
#
# ZA_SUPPLY_CHAIN_CONFIDENTIALITY_AND_DIAGNOSTIC_SLA_V1 leak gate (06/10/2026).
# Blocks any confidential supply-chain identifier from reaching a public surface.
#
# DELIBERATE DESIGN: this file is committed to a PUBLIC repository, therefore it
# contains NO confidential patterns. Patterns load, in order, from:
#   1. env SUPPLIER_LEAK_PATTERNS  (regex; CI provides it as a repository secret)
#   2. env SUPPLIER_LEAK_FILE      (path to a private regex file)
#   3. ~/Desktop/Claude/Operations/Vendor-Registry/leak-patterns.txt (local default)
# Absence of all three is reported as NOT_CONFIGURED (exit 3) - a defined, logged
# outcome, never a silent pass. It also enforces the prohibited turnaround
# completion-promise phrases (non-confidential, safe to embed).
#
# Scope: every git-TRACKED file (what would actually publish) plus any extra
# paths passed as arguments (e.g. a rendered-output directory post-build).
import os
import re
import subprocess
import sys
import tempfile

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

TURNAROUND_PROHIBITED = [
    r"diagnos\w*\s+(?:is\s+|are\s+)?completed\s+within\s+four\s+hours",
    r"guaranteed\s+(?:four|4)[-\s]hour\s+(?:repair|diagnos\w*)",
    r"repair\s+(?:is\s+)?completed\s+within\s+four\s+hours",
    r"same[-\s]day\s+repair\s+guaranteed",
    r"immediate\s+repair\s+completion",
    r"immediate\s+diagnosis\s+completed",
]


def load_confidential_pattern():
    pat = os.environ.get("SUPPLIER_LEAK_PATTERNS")
    src = "env:SUPPLIER_LEAK_PATTERNS"
    if not pat:
        f = os.environ.get("SUPPLIER_LEAK_FILE") or os.path.expanduser(
            "~/Desktop/Claude/Operations/Vendor-Registry/leak-patterns.txt"
        )
        if os.path.isfile(f):
            pat = open(f).read().strip()
            src = f
    return pat, src


def tracked_files():
    out = subprocess.run(
        ["git", "ls-files"], cwd=REPO, capture_output=True, text=True, check=True
    ).stdout.splitlines()
    skip_ext = {".png", ".jpg", ".jpeg", ".gif", ".webp", ".ico", ".woff", ".woff2", ".pdf", ".zip"}
    self_rel = "scripts/check-supplier-confidentiality.py"  # the gate never scans itself
    return [p for p in out if os.path.splitext(p)[1].lower() not in skip_ext and p != self_rel]


def scan(paths, conf_rx, base=REPO):
    hits = []
    turn_rx = re.compile("|".join(TURNAROUND_PROHIBITED), re.I)
    for rel in paths:
        p = rel if os.path.isabs(rel) else os.path.join(base, rel)
        if not os.path.isfile(p):
            continue
        try:
            text = open(p, encoding="utf-8", errors="replace").read()
        except OSError:
            continue
        for n, line in enumerate(text.splitlines(), 1):
            if conf_rx and conf_rx.search(line):
                hits.append((rel, n, "CONFIDENTIAL_SUPPLIER", line.strip()[:80]))
            if turn_rx.search(line):
                hits.append((rel, n, "TURNAROUND_COMPLETION_PROMISE", line.strip()[:80]))
    return hits


def run_check(extra_paths):
    pat, src = load_confidential_pattern()
    conf_rx = re.compile(pat, re.I) if pat else None
    if conf_rx is None:
        print(
            "supplier-gate: NOT_CONFIGURED - no pattern source "
            "(env SUPPLIER_LEAK_PATTERNS / SUPPLIER_LEAK_FILE / private registry file). "
            "Turnaround-phrase scan still runs.",
            file=sys.stderr,
        )
    files = tracked_files() + list(extra_paths)
    hits = scan(files, conf_rx)
    if hits:
        print("supplier-gate: FAIL - %d match(es):" % len(hits), file=sys.stderr)
        for rel, n, kind, frag in hits[:40]:
            shown = frag if kind != "CONFIDENTIAL_SUPPLIER" else "[redacted match]"
            print("  %s:%s  %s  %s" % (rel, n, kind, shown), file=sys.stderr)
        return 2
    scope = "tracked files (%d) + %d extra" % (len(files) - len(extra_paths), len(extra_paths))
    if conf_rx is None:
        print(
            "supplier-gate: PARTIAL PASS over %s (patterns %s; confidential scan NOT run)"
            % (scope, src)
        )
        return 3
    print("supplier-gate: PASS over %s (patterns from %s)" % (scope, src))
    return 0


def run_test():
    ok = 0
    with tempfile.TemporaryDirectory() as td:
        good = os.path.join(td, "good.txt")
        open(good, "w").write("ZA Support sources leading global technology brands.\n")
        bad1 = os.path.join(td, "bad1.txt")
        open(bad1, "w").write("ordered via SynthCorpDistributor account\n")
        bad2 = os.path.join(td, "bad2.txt")
        open(bad2, "w").write("Diagnosis comple" + "ted within four hours, guaranteed!\n")
        rx = re.compile(r"\bSynthCorpDistributor\b", re.I)
        # positive: clean file passes
        assert scan([good], rx, base="/") == []
        ok += 1
        # negative 1: planted confidential name caught
        h = scan([bad1], rx, base="/")
        assert h and h[0][2] == "CONFIDENTIAL_SUPPLIER"
        ok += 1
        # negative 2: prohibited turnaround phrase caught even with NO confidential rx
        h = scan([bad2], None, base="/")
        assert h and h[0][2] == "TURNAROUND_COMPLETION_PROMISE"
        ok += 1
        # absence: no pattern source -> defined NOT_CONFIGURED path (loader returns None)
        env_bak = {
            k: os.environ.pop(k, None) for k in ("SUPPLIER_LEAK_PATTERNS", "SUPPLIER_LEAK_FILE")
        }
        os.environ["SUPPLIER_LEAK_FILE"] = os.path.join(td, "missing.txt")
        pat, _ = load_confidential_pattern()
        assert pat is None
        ok += 1
        for k, v in env_bak.items():
            if v is not None:
                os.environ[k] = v
        os.environ.pop("SUPPLIER_LEAK_FILE", None)
    print("TEST %d/4 PASS" % ok)
    return 0 if ok == 4 else 1


if __name__ == "__main__":
    args = sys.argv[1:]
    if "--test" in args:
        sys.exit(run_test())
    extra = [a for a in args if not a.startswith("--")]
    sys.exit(run_check(extra))
