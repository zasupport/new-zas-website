#!/usr/bin/env python3
"""Controls for the F12 fix: stage_patch removals must be confined to the disallow
array slice, never whole-file string surgery.

Run: python3 "tools/robots/test-stage-patch-scoping.py"   (exit 0 = ALL PASS)

Imports remove_disallow_rules + rewrite_is_sound from the engine (filename has spaces).
"""
import importlib.util, os, re, sys, types

# The engine imports third-party deps (protego, requests) at module load that are
# only needed by its network/parse paths, not by the two pure-string functions under
# test. Stub any that are absent so this test runs with just the stdlib (CI installs
# the real ones; either way the functions we exercise use only `re`).
for _mod in ("protego", "requests"):
    if _mod not in sys.modules:
        try:
            __import__(_mod)
        except ImportError:
            _stub = types.ModuleType(_mod)
            _stub.__getattr__ = lambda name: object  # any attribute -> harmless placeholder
            sys.modules[_mod] = _stub

HERE = os.path.dirname(os.path.abspath(__file__))
ENGINE = os.path.join(HERE, "robots index engine.py")
spec = importlib.util.spec_from_file_location("robots_engine", ENGINE)
eng = importlib.util.module_from_spec(spec)
spec.loader.exec_module(eng)

# A robots.ts where the rule '/seo-report/' appears in THREE places:
#   1. the disallow array (the ONLY one that should be removed)
#   2. a code comment
#   3. a different array (AI_CRAWLERS-style)
FIXTURE = """import { MetadataRoute } from 'next';

// Historical note: '/seo-report/' used to be public before we noindexed it.
const OTHER = ['/seo-report/', '/keep-me/'];

export default function robots() {
  const disallow = [
    '/api/',
    '/admin/',
    '/studio/',
    '/seo-report/',
  ];
  return { rules: [{ userAgent: '*', allow: '/', disallow }], other: OTHER };
}
"""


def old_wholefile_removal(text, rule):
    """The pre-F12 behaviour, reproduced to demonstrate the corruption it caused."""
    text = re.sub(rf"(?m)^\s*['\"]{re.escape(rule)}['\"],?\s*$\n?", "", text)
    text = text.replace(f"'{rule}', ", "").replace(f'"{rule}", ', "")
    text = text.replace(f"'{rule}'", "").replace(f'"{rule}"', "")
    return re.sub(r",(\s*[\]\}])", r"\1", text)


def main():
    rc = 0
    rule = "/seo-report/"

    # POSITIVE: scoped removal drops it from the disallow array only.
    scoped = eng.remove_disallow_rules(FIXTURE, {rule}, ".ts")
    # It must be GONE from the disallow array...
    disallow_body = eng.DISALLOW_ARRAY_RE.search(scoped).group(2)
    if rule not in disallow_body:
        print("  PASS positive: rule removed from the disallow array")
    else:
        print("  FAIL positive: rule still in disallow array"); rc = 1

    # ...but PRESERVED in the comment and the OTHER array (the whole point of F12).
    if "Historical note: '/seo-report/'" in scoped and "const OTHER = ['/seo-report/'," in scoped:
        print("  PASS no-collateral: comment + unrelated array occurrences left intact")
    else:
        print("  FAIL no-collateral: scoped edit corrupted a comment or unrelated array"); rc = 1

    # rewrite_is_sound must accept the scoped rewrite.
    ok, why = eng.rewrite_is_sound(FIXTURE, scoped, {rule}, set())
    print(f"  PASS soundness: rewrite_is_sound accepts scoped edit" if ok
          else f"  FAIL soundness: {why}")
    rc |= 0 if ok else 1

    # POWER / negative control: the OLD whole-file approach DID corrupt the comment +
    # other array. This proves the scoping is a real fix, not a no-op.
    corrupted = old_wholefile_removal(FIXTURE, rule)
    if "Historical note: '/seo-report/'" not in corrupted or "['/seo-report/'," not in corrupted:
        print("  PASS power: old whole-file removal provably corrupts comment/other array")
    else:
        print("  FAIL power: old approach did NOT corrupt (control has no power)"); rc = 1

    # ABSENCE control: no disallow array -> unchanged (fail-closed), and rewrite_is_sound
    # then rejects because the rule is still present.
    NOARRAY = "export default function robots() { return { rules: [] }; }\n// '/seo-report/'\n"
    unchanged = eng.remove_disallow_rules(NOARRAY, {rule}, ".ts")
    ok2, _ = eng.rewrite_is_sound(NOARRAY, unchanged, {rule}, set())
    if unchanged == NOARRAY and not ok2:
        print("  PASS absence: no disallow array -> unchanged + rewrite_is_sound rejects (fail-closed)")
    else:
        print(f"  FAIL absence: unchanged={unchanged==NOARRAY} sound_ok={ok2} (should be True/False)"); rc = 1

    print("TEST: ALL PASS" if rc == 0 else "TEST: FAIL")
    return rc


if __name__ == "__main__":
    sys.exit(main())
