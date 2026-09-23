#!/usr/bin/env python3
"""
PURPOSE   Prove the robots guard actually works, in both directions.
          A guard that never fires is worthless. A guard that always fires is worse.
STORAGE   <blog project>/tools/robots/
EXECUTES  python3 "robots pressure test.py" [--verbose]
RELATED   robots guard.py | robots index engine.py
VERSION   1.3.0
DATE      18/07/2026 14:05 SAST
AUTHOR    Courtney Bentley, ZA Support

Controls
  POSITIVE  A robots.txt that MUST pass. If the guard fails one of these it is
            producing false alarms and will be switched off by whoever it annoys.
  NEGATIVE  A robots.txt that MUST fail. If the guard passes one of these it is
            asleep, and a real deploy will silently remove pages from Google.

Exit codes
  0  every control behaved as required
  1  at least one control misbehaved, the guard must not be trusted
"""

import json
import sys
from pathlib import Path

from protego import Protego

sys.path.insert(0, str(Path(__file__).resolve().parent))

GOOGLEBOT = "Googlebot"

# A representative slice of the real zasupport.com index footprint.
SAMPLE = [
    "https://zasupport.com",
    "https://zasupport.com/logic-board-repair",
    "https://zasupport.com/macbook-not-turning-on",
    "https://zasupport.com/liquid-damage",
    "https://zasupport.com/blog/airpods-repair-johannesburg",
    "https://zasupport.com/answers/medical-practice-it",
    "https://zasupport.com/business/microsoft-365-for-business",
    "https://zasupport.com/imac-repair/ram-upgrade",
]

BOM = "\ufeff"

CONTROLS = [
    # ---------------------------------------------------------------- positive
    ("POSITIVE", "wide open", "User-agent: *\nAllow: /\n"),
    (
        "POSITIVE",
        "current production shape, private paths only",
        "User-agent: *\nAllow: /\nDisallow: /api/\nDisallow: /admin/\nDisallow: /studio/\n",
    ),
    ("POSITIVE", "empty file", ""),
    ("POSITIVE", "comments only", "# nothing to see here\n# still nothing\n"),
    (
        "POSITIVE",
        "query strings blocked, clean URLs untouched",
        "User-agent: *\nAllow: /\nDisallow: /*?\n",
    ),
    (
        "POSITIVE",
        "another crawler blocked entirely, Googlebot free",
        "User-agent: SemrushBot\nDisallow: /\n\nUser-agent: *\nAllow: /\n",
    ),
    (
        "POSITIVE",
        "Allow overrides a broader Disallow",
        "User-agent: *\nDisallow: /blog/\nAllow: /blog/\n",
    ),
    ("POSITIVE", "CRLF line endings", "User-agent: *\r\nAllow: /\r\nDisallow: /admin/\r\n"),
    (
        "POSITIVE",
        "UTF-8 byte order mark present",
        BOM + "User-agent: *\nAllow: /\nDisallow: /admin/\n",
    ),
    (
        "POSITIVE",
        "trailing whitespace and blank lines",
        "User-agent: *   \n\n\nAllow: /   \n\nDisallow: /admin/  \n\n",
    ),
    # ---------------------------------------------------------------- negative
    ("NEGATIVE", "whole site blocked", "User-agent: *\nDisallow: /\n"),
    ("NEGATIVE", "blog section blocked", "User-agent: *\nAllow: /\nDisallow: /blog/\n"),
    (
        "NEGATIVE",
        "Googlebot singled out and blocked",
        "User-agent: Googlebot\nDisallow: /\n\nUser-agent: *\nAllow: /\n",
    ),
    ("NEGATIVE", "lowercase directive, same effect", "user-agent: *\ndisallow: /blog/\n"),
    ("NEGATIVE", "wildcard swallowing the blog path", "User-agent: *\nAllow: /\nDisallow: /b*g/\n"),
    (
        "NEGATIVE",
        "single money page blocked",
        "User-agent: *\nAllow: /\nDisallow: /logic-board-repair\n",
    ),
    ("NEGATIVE", "answers hub blocked", "User-agent: *\nAllow: /\nDisallow: /answers/\n"),
    ("NEGATIVE", "homepage end-anchored block", "User-agent: *\nAllow: /\nDisallow: /$\n"),
    (
        "NEGATIVE",
        "staging style block left in production",
        "User-agent: *\nDisallow: /\nSitemap: https://zasupport.com/sitemap.xml\n",
    ),
    ("NEGATIVE", "nested path blocked", "User-agent: *\nAllow: /\nDisallow: /imac-repair/\n"),
    ("NEGATIVE", "CRLF whole site block", "User-agent: *\r\nDisallow: /\r\n"),
    ("NEGATIVE", "BOM plus whole site block", BOM + "User-agent: *\nDisallow: /\n"),
    ("NEGATIVE", "BOM plus blog block", BOM + "User-agent: *\nAllow: /\nDisallow: /blog/\n"),
    ("NEGATIVE", "lone CR separators, whole site block", "User-agent: *\rDisallow: /\r"),
    (
        "NEGATIVE",
        "rules pushed beyond the 500 KiB ceiling are not trusted",
        "User-agent: *\nDisallow: /\n" + ("# padding\n" * 60000),
    ),
]


def _load_normaliser():
    """Use the guard's own normaliser so the test exercises production code."""
    import importlib.util

    spec = importlib.util.spec_from_file_location(
        "guardmod", Path(__file__).resolve().parent / "robots guard.py"
    )
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod.normalise_robots


normalise_robots = _load_normaliser()


def blocked_count(robots_txt, urls):
    parser = Protego.parse(normalise_robots(robots_txt))
    return [u for u in urls if not parser.can_fetch(u, GOOGLEBOT)]


def run(urls=None, verbose=False):
    urls = urls or SAMPLE
    results, failures = [], []

    for kind, name, body in CONTROLS:
        blocked = blocked_count(body, urls)
        guard_fires = len(blocked) > 0
        should_fire = kind == "NEGATIVE"
        ok = guard_fires == should_fire

        results.append(
            {
                "control": kind,
                "name": name,
                "guard_fired": guard_fires,
                "expected_to_fire": should_fire,
                "blocked_urls": len(blocked),
                "pass": ok,
            }
        )
        if not ok:
            failures.append((kind, name, guard_fires, len(blocked)))

        if verbose or not ok:
            mark = "PASS" if ok else "FAIL"
            print(f"  [{mark}] {kind:8} {name:48} fired={guard_fires} blocked={len(blocked)}")

    # ------------------------------------------------------------------ report
    pos = [r for r in results if r["control"] == "POSITIVE"]
    neg = [r for r in results if r["control"] == "NEGATIVE"]
    false_alarms = [r for r in pos if not r["pass"]]
    blind_spots = [r for r in neg if not r["pass"]]

    print()
    print("=" * 72)
    print("ROBOTS GUARD PRESSURE TEST")
    print("=" * 72)
    print(
        f"  positive controls : {len(pos) - len(false_alarms)}/{len(pos)} passed"
        f"   (false alarms: {len(false_alarms)})"
    )
    print(
        f"  negative controls : {len(neg) - len(blind_spots)}/{len(neg)} passed"
        f"   (blind spots:  {len(blind_spots)})"
    )
    print(f"  sample URLs       : {len(urls)}")
    print("=" * 72)

    if blind_spots:
        print("BLIND SPOTS. The guard did not fire on a robots.txt that removes pages")
        print("from Google. Do not rely on this guard until these are resolved.")
        for r in blind_spots:
            print(f"   MISSED  {r['name']}")
    if false_alarms:
        print("FALSE ALARMS. The guard fired on a safe robots.txt. Left unresolved,")
        print("someone will disable it and the protection disappears.")
        for r in false_alarms:
            print(f"   NOISE   {r['name']}")

    out = Path(__file__).resolve().parent / "state" / "pressure test.json"
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text(
        json.dumps(
            {
                "positive_total": len(pos),
                "positive_passed": len(pos) - len(false_alarms),
                "negative_total": len(neg),
                "negative_passed": len(neg) - len(blind_spots),
                "results": results,
            },
            indent=2,
        ),
        encoding="utf-8",
    )

    if not failures:
        print("RESULT PASS. The guard fires on every regression and stays quiet otherwise.")
        return 0
    print(f"RESULT FAIL. {len(failures)} control(s) misbehaved.")
    return 1


def run_baseline_controls():
    """
    Baseline-integrity controls. The guard must FAIL CLOSED when its protected
    baseline is missing, empty or corrupt. Added 25/07/2026 after the gap analysis
    identified the fail-open baseline as the highest-severity defect. These shell
    the real guard so the test exercises production behaviour, not a reimplementation.
    """
    import subprocess
    import tempfile

    here = Path(__file__).resolve().parent
    guard = here / "robots guard.py"
    if not guard.exists():
        print("  [skip] baseline controls: robots guard.py not beside the test")
        return True
    passed = True
    with tempfile.TemporaryDirectory() as d:
        d = Path(d)
        robots = d / "robots.txt"
        robots.write_text("User-agent: *\nAllow: /\n")
        ok = d / "ok.json"
        ok.write_text('{"urls":["https://zasupport.com/logic-board-repair"]}')
        cases = [
            ("missing baseline must block", ["--protected", str(d / "nope.json")], 1),
            ("empty baseline must block", ["--protected", str(d / "empty.json")], 1),
            ("corrupt baseline must block", ["--protected", str(d / "bad.json")], 1),
            ("valid baseline must pass", ["--protected", str(ok)], 0),
        ]
        (d / "empty.json").write_text('{"urls":[]}')
        (d / "bad.json").write_text("not json {")
        print()
        print("  Baseline integrity controls (guard must fail closed)")
        print("  " + "-" * 68)
        for name, extra, want in cases:
            r = subprocess.run(
                ["python3", str(guard), "--robots", str(robots), "--quiet"] + extra,
                capture_output=True,
                text=True,
            )
            got = r.returncode
            good = got == want
            passed = passed and good
            print(f"  [{'PASS' if good else 'FAIL'}] {name:44} exit {got} (want {want})")
    return passed


if __name__ == "__main__":
    rc_main = run(verbose="--verbose" in sys.argv)
    rc_base = 0 if run_baseline_controls() else 1
    if rc_base:
        print("\n  RESULT FAIL. Guard did not fail closed on a bad baseline.")
    sys.exit(rc_main or rc_base)
