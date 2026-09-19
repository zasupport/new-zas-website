#!/usr/bin/env python3
"""heal-route-sitemap-drift.py - SELF-HEALING companion to check-route-sitemap-drift.py.

The detector (check-route-sitemap-drift.py) makes an indexable-but-unlisted static route
UNSHIPPABLE (fail-closed CI gate). This HEALER closes the loop: it auto-adds every genuine
orphan into src/app/sitemap.ts in the exact template-literal form the detector recognises, so
the drift can never survive a commit. It reuses the detector's find_orphans as the single SoT
for what "orphan" means (no forked definition; §354/§410) and re-runs it as its own proof.

WHY auto-add is safe (advisor-verified): the detector's "orphan" = indexable + not-redirect +
not-noindex = a page that by its own metadata belongs in the sitemap. Adding it decides nothing
for the human; excluding a page is done by noindex/redirect, which the detector already honours.
This differs from §401 redirect --repair (choosing a redirect target IS a judgment call → surface).

Modes:
  --heal        scan repo, insert any orphan into src/app/sitemap.ts (backup .pre-heal, verify,
                self-check find_orphans==0 or restore+fail). Idempotent. Exit 0 if clean/healed.
  --check       report orphans without editing (exit 1 if any) — thin wrapper over the detector.
  --test        §244/§584/§704 controls on temp fixtures: orphan MUST be healed to zero;
                clean MUST be a no-op; format of inserted line MUST satisfy the detector regex.
"""

import os
import re
import sys
import shutil
import importlib.util
import tempfile

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DETECTOR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "check-route-sitemap-drift.py")

DEFAULT_FREQ = "monthly"
DEFAULT_PRIORITY = "0.7"


def _load_detector():
    """Load the hyphenated detector module by path (single SoT for orphan logic)."""
    spec = importlib.util.spec_from_file_location("check_route_sitemap_drift", DETECTOR)
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod


def _orphans_for(root, det):
    return det.find_orphans(
        os.path.join(root, "src/app"),
        os.path.join(root, "src/app/sitemap.ts"),
        os.path.join(root, "next.config.ts"),
        os.path.join(root, "vercel.json"),
    )


def _entry_line(url):
    # EXACT template-literal form the detector regex r"\$\{base\}(/[^`]*)`" recognises.
    from datetime import date

    return (
        f"    {{ url: `${{base}}{url}`, lastModified: now, "
        f"changeFrequency: '{DEFAULT_FREQ}', priority: {DEFAULT_PRIORITY} }}, "
        f"// §718 auto-added {date.today().isoformat()}\n"
    )


def _insert(sitemap_text, orphans):
    """Insert entries immediately before the array-closing `];` (lowest-indent, last one)."""
    lines = sitemap_text.splitlines(keepends=True)
    close_idx = None
    for i in range(len(lines) - 1, -1, -1):
        if re.match(r"\s{0,4}\];\s*$", lines[i]):
            close_idx = i
            break
    if close_idx is None:
        return None
    block = "".join(_entry_line(u) for u in orphans)
    lines.insert(close_idx, block)
    return "".join(lines)


def heal(root):
    det = _load_detector()
    orphans, err = _orphans_for(root, det)
    if err:
        print(f"FAIL (fail-closed): {err}", file=sys.stderr)
        return 1
    if not orphans:
        print("✅ no route↔sitemap drift — nothing to heal")
        return 0
    sm_path = os.path.join(root, "src/app/sitemap.ts")
    original = open(sm_path, encoding="utf-8").read()
    backup = sm_path + ".pre-heal"
    shutil.copy2(sm_path, backup)  # §573 non-destruction
    healed = _insert(original, orphans)
    if healed is None:
        print("FAIL: could not locate sitemap array close `];`", file=sys.stderr)
        return 1
    open(sm_path, "w", encoding="utf-8").write(healed)
    # §396/§584 self-check: re-run the detector; if the orphan persists, the insert form is
    # wrong — restore and fail loud rather than leave a silent still-red sitemap.
    remaining, err2 = _orphans_for(root, det)
    if err2 or remaining:
        shutil.copy2(backup, sm_path)  # restore
        print(
            f"FAIL: heal did not clear orphans (still {remaining}); restored original",
            file=sys.stderr,
        )
        return 1
    print(
        f"✅ healed {len(orphans)} orphan(s) into sitemap.ts (verified 0 remaining): "
        + ", ".join(orphans)
    )
    print(f"   backup: {backup}")
    return 0


def check(root):
    det = _load_detector()
    orphans, err = _orphans_for(root, det)
    if err:
        print(f"FAIL (fail-closed): {err}", file=sys.stderr)
        return 1
    if orphans:
        print("ORPHANS: " + ", ".join(orphans), file=sys.stderr)
        return 1
    print("✅ no orphans")
    return 0


def _fixture(tmp, *, with_orphan):
    app = os.path.join(tmp, "src/app")
    os.makedirs(os.path.join(app, "orphan-page"), exist_ok=True)
    os.makedirs(os.path.join(app, "listed-page"), exist_ok=True)
    os.makedirs(os.path.join(app, "search"), exist_ok=True)
    open(os.path.join(app, "page.tsx"), "w").write("export default function P(){return null}")
    open(os.path.join(app, "orphan-page/page.tsx"), "w").write(
        "export default function P(){return null}"
    )
    open(os.path.join(app, "listed-page/page.tsx"), "w").write(
        "export default function P(){return null}"
    )
    # noindex page must be legitimately excluded, never healed in
    open(os.path.join(app, "search/page.tsx"), "w").write(
        "export const metadata = { robots: { index: false } };\nexport default function P(){return null}"
    )
    listed = "`${base}/listed-page`" if not with_orphan else "`${base}/listed-page`"
    orphan_line = "" if with_orphan else "    { url: `${base}/orphan-page`, lastModified: now },\n"
    open(os.path.join(app, "sitemap.ts"), "w").write(
        "export default function sitemap(){\n  const base='https://x';\n  const now=new Date();\n  return [\n"
        "    { url: base, lastModified: now },\n"
        f"    {{ url: {listed}, lastModified: now }},\n"
        f"{orphan_line}"
        "  ];\n}\n"
    )


def selftest():
    det = _load_detector()
    p = f = 0
    # 1. orphan present -> heal clears it to zero, and inserted line satisfies the detector regex
    d = tempfile.mkdtemp()
    _fixture(d, with_orphan=True)
    f += 1
    rc = heal(d)
    orph, _ = _orphans_for(d, det)
    if rc == 0 and orph == []:
        p += 1
    else:
        print(f"NEG: orphan fixture should heal to zero (rc={rc}, remaining={orph})")
    shutil.rmtree(d)
    # 2. clean fixture -> no-op (idempotent), sitemap unchanged
    d = tempfile.mkdtemp()
    _fixture(d, with_orphan=False)
    before = open(os.path.join(d, "src/app/sitemap.ts")).read()
    f += 1
    rc = heal(d)
    after = open(os.path.join(d, "src/app/sitemap.ts")).read()
    if rc == 0 and before == after:
        p += 1
    else:
        print("NEG: clean fixture should be a no-op (idempotent)")
    shutil.rmtree(d)
    # 3. negative control: detector itself must FLAG the orphan fixture before heal (proves test bites)
    d = tempfile.mkdtemp()
    _fixture(d, with_orphan=True)
    f += 1
    orph, _ = _orphans_for(d, det)
    if orph == ["/orphan-page"]:
        p += 1
    else:
        print(f"NEG: detector should flag exactly /orphan-page, got {orph}")
    shutil.rmtree(d)
    print(f"§718-HEAL SELFTEST: {p}/{f}")
    return 0 if p == f else 1


if __name__ == "__main__":
    mode = sys.argv[1] if len(sys.argv) > 1 else "--check"
    if mode == "--heal":
        sys.exit(heal(ROOT))
    elif mode == "--check":
        sys.exit(check(ROOT))
    elif mode == "--test":
        sys.exit(selftest())
    else:
        print("usage: heal-route-sitemap-drift.py --heal|--check|--test", file=sys.stderr)
        sys.exit(2)
