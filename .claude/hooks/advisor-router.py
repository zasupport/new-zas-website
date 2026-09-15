#!/usr/bin/env python3
# ======================================================================
# CLAUDE-CODE-INJECTION
#   operation: create-new-file
#   target_path: .claude/hooks/advisor-router.py
#   permissions: "0755"
#   artefact_version: "1.0"
#   artefact_created: "2026-08-11T18:00:00+02:00"
#   depends_on: [_telemetry.sh, pattern-engine.py]
#   post_install_verify: "python3 .claude/hooks/advisor-router.py --self-test"
#   rollback_command: "rm .claude/hooks/advisor-router.py"
# END-CLAUDE-CODE-INJECTION
# ======================================================================
"""Specialised local advisor roster with SLM-first routing.

Design follows the pattern NVIDIA Research argues for in "Small Language
Models are the Future of Agentic AI" (arXiv:2506.02153): small models are the
default inside an agent, and a large model is invoked only for genuinely
open-ended work. A resident classifier picks the specialist; specialists load
on demand and are evicted under memory pressure.

The honest constraint from practitioners is that an 8B model loops and
hallucinates on multi-step tasks. Every advisor here is therefore given ONE
narrow question with a bounded answer format, never a multi-step plan.

Which advisors exist is not guessed. `--derive` reads the real telemetry
NDJSON and ranks tasks by how often they actually occur, so the roster
matches this machine's workload rather than an assumed one.

Escalation is explicit: any advisor may return NEEDS_ESCALATION, which routes
the question to Claude Code rather than letting a small model bluff.

Usage:
  advisor-router.py --derive            rank advisors by real telemetry
  advisor-router.py --ask "question"    route to the right specialist
  advisor-router.py --advisor lint --ask "..."
  advisor-router.py --list
  advisor-router.py --self-test
"""

import argparse
import collections
import json
import os
import sys
import urllib.request
import urllib.error
from pathlib import Path

ROOT = Path(os.environ.get("CLAUDE_PROJECT_DIR", os.getcwd()))
TEL = ROOT / ".claude" / "telemetry.ndjson"
LEDGER = ROOT / ".claude" / "learning-ledger.md"
OLLAMA = os.environ.get("OLLAMA_HOST", "http://localhost:11434")

# Resident classifier stays small and hot; specialists load on demand.
ROUTER_MODEL = os.environ.get("ADVISOR_ROUTER_MODEL", "qwen3:1.7b")
DEFAULT_SPECIALIST = os.environ.get("ADVISOR_MODEL", "qwen3:8b")

# Roster. Each advisor answers ONE narrow question with a bounded format.
# `signals` map to telemetry hook names so frequency is measured, not assumed.
ADVISORS = {
    "lint": {
        "purpose": "Explain a linter residual and name the minimal fix",
        "signals": ["lint-v2"],
        "model": DEFAULT_SPECIALIST,
        "format": "One sentence on the cause, then the exact corrected line.",
        "system": (
            "You explain a single linter error. Answer in at most three lines: "
            "the cause, the corrected line, nothing else. If the error needs "
            "repository-wide context you do not have, reply exactly NEEDS_ESCALATION."
        ),
    },
    "secrets": {
        "purpose": "Judge whether a flagged string is a real credential",
        "signals": ["secrets"],
        "model": DEFAULT_SPECIALIST,
        "format": "REAL or TEST-FIXTURE or UNCERTAIN, then one line of reasoning.",
        "system": (
            "You judge whether a flagged string is a live credential or a test "
            "fixture. First word must be REAL, TEST-FIXTURE, or UNCERTAIN. Then one "
            "line of reasoning. Never repeat the secret value itself. If you cannot tell "
            "without seeing surrounding code, reply exactly NEEDS_ESCALATION."
        ),
    },
    "test-failure": {
        "purpose": "Classify a failing test as code fault, test fault, or environment",
        "signals": ["test-gate"],
        "model": DEFAULT_SPECIALIST,
        "format": "CODE or TEST or ENVIRONMENT, then the single next check.",
        "system": (
            "You classify one test failure. First word must be CODE, TEST, or "
            "ENVIRONMENT. Then one line naming the single next check to run. "
            "If the trace is truncated beyond usefulness, reply NEEDS_ESCALATION."
        ),
    },
    "divergence": {
        "purpose": "Summarise what two divergent copies of a file differ on",
        "signals": ["consolidate", "authority"],
        "model": DEFAULT_SPECIALIST,
        "format": "Three bullets: what changed, likely direction, risk of picking wrong.",
        "system": (
            "You summarise a diff between two copies of the same file. Three bullets: "
            "what changed, which looks newer in intent, what breaks if the wrong one "
            "is kept. Never state which to keep as a decision; you inform, the human decides. "
            "If the diff is too large to summarise faithfully, reply NEEDS_ESCALATION."
        ),
    },
    "changelog": {
        "purpose": "Classify a Claude Code changelog entry as BREAKING, ADOPT, or IGNORE",
        "signals": ["cc-weekly-audit"],
        "model": DEFAULT_SPECIALIST,
        "format": "BREAKING, ADOPT, or IGNORE, then one line of impact.",
        "system": (
            "You classify one changelog entry for a repository that uses Claude Code "
            "hooks, settings, rules, and agents. First word must be BREAKING, ADOPT, "
            "or IGNORE. Then one line of impact. Bias toward BREAKING when a hook "
            "schema, settings key, or permission syntax is mentioned. If the entry "
            "is too terse to classify, reply NEEDS_ESCALATION."
        ),
    },
    "commit": {
        "purpose": "Draft a conventional commit subject from a diff summary",
        "signals": ["guard-new-automation"],
        "model": ROUTER_MODEL,  # small task, small model
        "format": "One conventional-commit subject line under 72 characters.",
        "system": (
            "Write one conventional commit subject line, under 72 characters, no body, "
            "no trailing full stop. Type must be one of feat, fix, chore, docs, refactor, "
            "test. If the change spans unrelated concerns, reply NEEDS_ESCALATION."
        ),
    },
}


def log(m):
    print(f"[advisor] {m}", file=sys.stderr)


def ollama(model, system, user, timeout=120):
    body = json.dumps(
        {
            "model": model,
            "stream": False,
            "messages": [{"role": "system", "content": system}, {"role": "user", "content": user}],
        }
    ).encode()
    req = urllib.request.Request(
        f"{OLLAMA}/api/chat", data=body, headers={"Content-Type": "application/json"}
    )
    with urllib.request.urlopen(req, timeout=timeout) as r:
        return json.loads(r.read()).get("message", {}).get("content", "").strip()


def derive(tel=TEL):
    """Rank advisors by how often their signals actually fire on this machine."""
    counts = collections.Counter()
    total = 0
    if Path(tel).exists():
        for line in open(tel, errors="replace"):
            line = line.strip()
            if not line.startswith("{"):
                continue
            try:
                r = json.loads(line)
            except ValueError:
                continue
            total += 1
            hook = r.get("hook", "")
            verdict = r.get("verdict", "")
            for name, a in ADVISORS.items():
                if hook in a["signals"] and verdict in ("fail", "block", "residual", "advisory"):
                    counts[name] += 1
    ranked = sorted(ADVISORS, key=lambda n: (-counts[n], n))
    return {"total_records": total, "counts": dict(counts), "ranked": ranked}


def classify(question):
    """Route with a keyword pass first; only ask the model when ambiguous."""
    q = question.lower()
    # Order matters. Intent phrases are matched before tool names, because a
    # question can name a tool while asking about something else entirely.
    # Found by advisor-eval on 11/08/2026: "two copies of lint-v2.sh differ,
    # which version should I keep" was routed to lint by the filename.
    table = [
        (
            "divergence",
            (
                "diverg",
                "duplicate",
                "two copies",
                "diff between",
                "which version",
                "which copy",
                "same file in",
            ),
        ),
        ("lint", ("lint", "ruff", "eslint", "biome", "f821", "unused", "unreachable", "clippy")),
        ("secrets", ("secret", "credential", "api key", "token", "akia", "password")),
        ("test-failure", ("test fail", "pytest", "assertion", "test-gate", "failing test")),
        ("changelog", ("changelog", "release note", "new version", "upgrade", "deprecat")),
        ("commit", ("commit message", "commit subject", "conventional commit")),
    ]
    for name, keys in table:
        if any(k in q for k in keys):
            return name, "keyword"
    try:
        opts = ", ".join(ADVISORS)
        ans = (
            ollama(
                ROUTER_MODEL,
                f"Reply with exactly one word from this list and nothing else: {opts}",
                question,
                timeout=30,
            )
            .split()[0]
            .strip()
            .lower()
        )
        if ans in ADVISORS:
            return ans, "model"
    except Exception as e:
        log(f"ADVISORY router model unavailable ({type(e).__name__}); keyword fallback only")
    return None, "unrouted"


def ask(question, forced=None):
    name, how = (forced, "forced") if forced else classify(question)
    if not name or name not in ADVISORS:
        return {
            "advisor": None,
            "routed_by": how,
            "answer": "NEEDS_ESCALATION",
            "reason": "no specialist matched; route to Claude Code",
        }
    a = ADVISORS[name]
    try:
        out = ollama(a["model"], a["system"] + " " + a["format"], question)
    except Exception as e:
        return {
            "advisor": name,
            "routed_by": how,
            "answer": "NEEDS_ESCALATION",
            "reason": f"local model unavailable ({type(e).__name__}); route to Claude Code",
        }
    escalate = out.strip().upper().startswith("NEEDS_ESCALATION")
    return {
        "advisor": name,
        "routed_by": how,
        "model": a["model"],
        "answer": out,
        "escalated": escalate,
    }


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--ask")
    ap.add_argument("--advisor")
    ap.add_argument("--derive", action="store_true")
    ap.add_argument("--list", action="store_true")
    ap.add_argument("--json", action="store_true")
    ap.add_argument("--self-test", action="store_true")
    a = ap.parse_args()

    if a.self_test:
        n = f = 0

        def chk(label, cond):
            nonlocal n, f
            n += 1
            print(f"{'PASS' if cond else 'FAIL'}  {label}")
            if not cond:
                f += 1

        # POSITIVE: keyword routing hits the right specialist without any model
        chk("positive/routes-lint", classify("ruff says F821 undefined name")[0] == "lint")
        chk(
            "positive/routes-secrets",
            classify("is this AKIA string a real credential")[0] == "secrets",
        )
        chk(
            "positive/routes-changelog",
            classify("this changelog entry deprecates a hook")[0] == "changelog",
        )
        # NEGATIVE: an unroutable question must not be forced into a specialist
        nm, how = classify("what is the airspeed velocity of a swallow")
        chk("negative/unroutable-not-forced", nm is None or how == "model")
        # ABSENCE: no Ollama must escalate, never fabricate
        r = ask("ruff says F821 undefined name")
        chk("absence/no-model-escalates", r["answer"] == "NEEDS_ESCALATION" or "escalated" in r)
        # ABSENCE: empty telemetry must still produce a ranked roster
        import tempfile

        with tempfile.TemporaryDirectory() as t:
            d = derive(Path(t) / "none.ndjson")
            chk(
                "absence/derive-with-no-telemetry",
                d["total_records"] == 0 and len(d["ranked"]) == len(ADVISORS),
            )
            # POSITIVE: derive ranks by real frequency
            tf = Path(t) / "tel.ndjson"
            tf.write_text(
                "\n".join(
                    json.dumps({"hook": h, "verdict": "fail"})
                    for h in ["lint-v2"] * 5 + ["secrets"] * 2
                )
            )
            d2 = derive(tf)
            chk(
                "positive/derive-ranks-by-frequency",
                d2["ranked"][0] == "lint" and d2["counts"]["lint"] == 5,
            )
        # SAFETY: every advisor is single-question scoped, no multi-step plans
        # Every advisor must be narrowly scoped AND have an honest escape hatch,
        # because a small model bluffing is worse than a small model deferring.
        chk("safety/all-advisors-bounded", all(len(v["system"]) < 600 for v in ADVISORS.values()))
        chk(
            "safety/all-advisors-can-escalate",
            all("NEEDS_ESCALATION" in v["system"] for v in ADVISORS.values()),
        )
        print(f"\nControls: {n}  Failures: {f}")
        print("RESULT: " + ("BROKEN" if f else "OPERATIONAL"))
        return 1 if f else 0

    if a.list:
        for k, v in ADVISORS.items():
            print(f"  {k:<14} {v['model']:<12} {v['purpose']}")
        return 0

    if a.derive:
        d = derive()
        if a.json:
            print(json.dumps(d, indent=2))
            return 0
        print(f"Telemetry records analysed: {d['total_records']}")
        print("Advisors ranked by observed workload on this machine:\n")
        for i, name in enumerate(d["ranked"], 1):
            c = d["counts"].get(name, 0)
            print(f"  {i}. {name:<14} {c:>4} interventions   {ADVISORS[name]['purpose']}")
        if d["total_records"] == 0:
            print("\n  No telemetry yet. Ordering is alphabetical, not evidence-based.")
            print("  Re-run after the hooks have fired to get a workload-ranked roster.")
        return 0

    if a.ask:
        r = ask(a.ask, a.advisor)
        print(
            json.dumps(r, indent=2)
            if a.json
            else f"advisor: {r.get('advisor')} (routed by {r.get('routed_by')})\n\n{r.get('answer')}"
            + (f"\n\nreason: {r['reason']}" if r.get("reason") else "")
        )
        return 0
    ap.print_help()
    return 2


if __name__ == "__main__":
    sys.exit(main())
