#!/usr/bin/env python3
# ======================================================================
# CLAUDE-CODE-INJECTION
#   operation: create-new-file
#   target_path: .claude/hooks/advisor-eval.py
#   permissions: "0755"
#   overwrite_if_exists: false
#   backup_if_exists: true
#   artefact_version: "1.0"
#   artefact_created: "2026-08-11T19:00:00+02:00"
#   depends_on: [advisor-router.py]
#   post_install_verify: "python3 .claude/hooks/advisor-eval.py --self-test"
#   rollback_command: "rm .claude/hooks/advisor-eval.py"
# END-CLAUDE-CODE-INJECTION
# ======================================================================
"""Advisor accuracy evaluation. Roadmap item 1, and the gate for items 2 to 5.

Nothing else on the roadmap can be adopted safely while there is no way to
tell whether behaviour improved or regressed. A cache, a semantic index, a
learned router and a backend swap are all claims about improvement. This
converts those claims into measurements.

Deliberately deterministic. Scoring is a fixed golden set of question and
expected-route pairs, not an LLM judge, because an LLM judge introduces a
second unmeasured model into the measurement itself. Judgement scoring can be
added later, once the deterministic signal is exhausted.

Append-only: eval history is opened in append mode and never truncated. A
regression is therefore always visible against the full record, not just the
last run.

Usage:
  advisor-eval.py                    score the router against the golden set
  advisor-eval.py --baseline         record this run as the reference
  advisor-eval.py --compare          score and compare against the baseline
  advisor-eval.py --add "q" route    append a new case to the golden set
  advisor-eval.py --history          show the recorded runs
  advisor-eval.py --self-test
"""
import argparse, json, os, subprocess, sys, time
from pathlib import Path

ROOT = Path(os.environ.get("CLAUDE_PROJECT_DIR", os.getcwd()))
EVAL_DIR = ROOT / ".claude" / "eval"
GOLDEN = EVAL_DIR / "golden-set.jsonl"
HISTORY = ROOT / ".claude" / "eval-history.ndjson"
ROUTER = ROOT / ".claude" / "hooks" / "advisor-router.py"
if not ROUTER.exists():
    ROUTER = Path(__file__).parent / "advisor-router.py"

# Seed cases. Extended by hand as real misroutes appear, which is the point:
# the golden set grows from observed failures, not imagined ones.
SEED = [
    ("ruff reports F821 undefined name in my handler", "lint"),
    ("eslint says no-unreachable after the return statement", "lint"),
    ("biome flagged an unused variable in the component", "lint"),
    ("is this AKIA string in the test file a real credential", "secrets"),
    ("gitleaks flagged an api key in a fixture", "secrets"),
    ("pytest assertion failed on the payment total", "test-failure"),
    ("the failing test passes locally but not in the gate", "test-failure"),
    ("two copies of lint-v2.sh differ, which version should I keep", "divergence"),
    ("what is the diff between these duplicate files", "divergence"),
    ("this changelog entry deprecates a settings key", "changelog"),
    ("new version of the tool changed the hook schema", "changelog"),
    ("write me a commit subject for this change", "commit"),
]


def ensure_golden():
    EVAL_DIR.mkdir(parents=True, exist_ok=True)
    if not GOLDEN.exists():
        with open(GOLDEN, "w") as f:                      # created once only
            for q, r in SEED:
                f.write(json.dumps({"question": q, "expected": r}) + "\n")
    return [json.loads(l) for l in open(GOLDEN) if l.strip()]


def route(question, router=None):
    """Ask the router to classify without invoking any model where possible."""
    r = str(router or ROUTER)
    try:
        out = subprocess.run(
            [sys.executable, r, "--ask", question, "--json"],
            capture_output=True, text=True, timeout=60,
            env={**os.environ, "OLLAMA_HOST": os.environ.get("OLLAMA_HOST", "http://127.0.0.1:1")},
        )
        d = json.loads(out.stdout or "{}")
        return d.get("advisor"), d.get("routed_by", "?")
    except Exception as e:
        return None, f"error:{type(e).__name__}"


def score(cases, router=None):
    rows, correct, by_route = [], 0, {}
    t0 = time.time()
    for c in cases:
        got, how = route(c["question"], router)
        ok = (got == c["expected"])
        correct += ok
        b = by_route.setdefault(c["expected"], {"n": 0, "ok": 0})
        b["n"] += 1
        b["ok"] += ok
        rows.append({"question": c["question"], "expected": c["expected"],
                     "got": got, "routed_by": how, "correct": ok})
    n = len(cases)
    return {
        "ts": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
        "cases": n,
        "correct": correct,
        "accuracy": round(correct / n, 4) if n else 0.0,
        "duration_ms": int((time.time() - t0) * 1000),
        "by_route": {k: round(v["ok"] / v["n"], 3) for k, v in by_route.items()},
        "rows": rows,
    }


def append_history(rec, tag):
    HISTORY.parent.mkdir(parents=True, exist_ok=True)
    entry = {k: v for k, v in rec.items() if k != "rows"}
    entry["tag"] = tag
    with open(HISTORY, "a") as f:                          # append only, never "w"
        f.write(json.dumps(entry) + "\n")


def load_baseline():
    if not HISTORY.exists():
        return None
    base = None
    for l in open(HISTORY):
        try:
            d = json.loads(l)
        except ValueError:
            continue
        if d.get("tag") == "baseline":
            base = d
    return base


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--baseline", action="store_true")
    ap.add_argument("--compare", action="store_true")
    ap.add_argument("--history", action="store_true")
    ap.add_argument("--add", nargs=2, metavar=("QUESTION", "ROUTE"))
    ap.add_argument("--json", action="store_true")
    ap.add_argument("--router")
    ap.add_argument("--self-test", action="store_true")
    a = ap.parse_args()

    if a.self_test:
        import tempfile
        n = f = 0
        def chk(label, cond):
            nonlocal n, f
            n += 1
            print(f"{'PASS' if cond else 'FAIL'}  {label}")
            if not cond: f += 1

        with tempfile.TemporaryDirectory() as t:
            os.environ["CLAUDE_PROJECT_DIR"] = t
            global ROOT, EVAL_DIR, GOLDEN, HISTORY
            ROOT = Path(t); EVAL_DIR = ROOT / ".claude" / "eval"
            GOLDEN = EVAL_DIR / "golden-set.jsonl"; HISTORY = ROOT / ".claude" / "eval-history.ndjson"

            cases = ensure_golden()
            chk("setup/golden-set-created", len(cases) == len(SEED))

            # POSITIVE: the real router should score well on its own keywords
            rec = score(cases)
            chk("positive/real-router-scores-high", rec["accuracy"] >= 0.75)

            # NEGATIVE, falsification: a broken router must score near zero.
            # If the harness cannot detect a broken router it measures nothing.
            broken = Path(t) / "broken-router.py"
            broken.write_text(
                "import sys,json\n"
                "print(json.dumps({'advisor':'commit','routed_by':'broken'}))\n")
            bad = score(cases, router=str(broken))
            chk("falsification/detects-broken-router", bad["accuracy"] < rec["accuracy"])
            chk("falsification/broken-scores-near-zero", bad["accuracy"] <= 0.2)

            # APPEND-ONLY: history must grow, never be replaced
            append_history(rec, "baseline")
            before = len(open(HISTORY).readlines())
            append_history(bad, "test")
            after = len(open(HISTORY).readlines())
            chk("append-only/history-grows", after == before + 1)

            # Baseline retrieval picks the baseline-tagged entry
            b = load_baseline()
            chk("compare/baseline-retrieved", b is not None and b["tag"] == "baseline")

            # REGRESSION: comparing a worse run against baseline must flag it
            chk("compare/regression-detected", bad["accuracy"] < b["accuracy"])

            # ABSENCE: a missing router must not crash the harness
            miss = score(cases[:2], router=str(Path(t) / "nope.py"))
            chk("absence/missing-router-handled", miss["accuracy"] == 0.0)

        print(f"\nControls: {n}  Failures: {f}")
        print("RESULT: " + ("BROKEN" if f else "OPERATIONAL"))
        return 1 if f else 0

    if a.add:
        EVAL_DIR.mkdir(parents=True, exist_ok=True)
        with open(GOLDEN, "a") as fh:                      # append, never rewrite
            fh.write(json.dumps({"question": a.add[0], "expected": a.add[1]}) + "\n")
        print(f"appended to golden set: {a.add[1]} <- {a.add[0]}")
        return 0

    if a.history:
        if not HISTORY.exists():
            print("no eval history yet"); return 0
        for l in open(HISTORY):
            d = json.loads(l)
            print(f"  {d['ts']}  {d.get('tag',''):<9} accuracy {d['accuracy']:.1%}  "
                  f"({d['correct']}/{d['cases']})  {d['duration_ms']}ms")
        return 0

    cases = ensure_golden()
    rec = score(cases, a.router)
    if a.json:
        print(json.dumps(rec, indent=2))
    else:
        print(f"Advisor routing accuracy: {rec['accuracy']:.1%} ({rec['correct']}/{rec['cases']})")
        print(f"Duration: {rec['duration_ms']}ms\n")
        for k, v in sorted(rec["by_route"].items()):
            print(f"  {k:<14} {v:.0%}")
        wrong = [r for r in rec["rows"] if not r["correct"]]
        if wrong:
            print("\nMisrouted:")
            for w in wrong:
                print(f"  expected {w['expected']:<13} got {str(w['got']):<13} {w['question'][:52]}")
            print("\nAdd each real misroute to the golden set so it is measured from now on:")
            print(f"  python3 {sys.argv[0]} --add \"<question>\" <route>")

    if a.baseline:
        append_history(rec, "baseline"); print("\nrecorded as baseline")
    elif a.compare:
        b = load_baseline()
        if not b:
            append_history(rec, "baseline"); print("\nno baseline existed; this run recorded as baseline")
        else:
            d = rec["accuracy"] - b["accuracy"]
            append_history(rec, "compare")
            print(f"\nbaseline {b['accuracy']:.1%} -> now {rec['accuracy']:.1%}  ({d:+.1%})")
            if d < 0:
                print("REGRESSION. Do not ship the change that caused it.")
                return 1
            print("No regression. The change is safe to keep.")
    else:
        append_history(rec, "run")
    return 0


if __name__ == "__main__":
    sys.exit(main())
