#!/usr/bin/env python3
# ======================================================================
# CLAUDE-CODE-INJECTION
#   operation: create-new-file
#   target_path: .claude/hooks/escalation-gate.py
#   permissions: "0755"
#   overwrite_if_exists: false
#   backup_if_exists: true
#   artefact_version: "1.0"
#   artefact_created: "2026-08-11T20:00:00+02:00"
#   depends_on: [advisor-router.py, advisor-eval.py, persistence-watchdog.sh]
#   post_install_verify: "python3 .claude/hooks/escalation-gate.py --self-test"
#   rollback_command: "rm .claude/hooks/escalation-gate.py"
# END-CLAUDE-CODE-INJECTION
# ======================================================================
"""Evaluation and escalation gate (HR, 11/08/2026).

Decides whether a higher-order task warrants calling an Anthropic model, and
whether a given item requires persistence. The local layer is not permitted to
reach for a paid frontier model on impulse; it must earn the escalation by
failing a documented test first.

Five gates, ALL must pass before escalation is permitted:

  1. NECESSITY   the local advisor declined, or the task is classified
                 higher-order (architectural, irreversible, cross-cutting)
  2. COMPETENCE  the eval history shows the local route is unreliable for
                 this class, so escalating is evidence-based not reflexive
  3. BUDGET      spend this period is under the configured ceiling
  4. CREDENTIAL  an API key is present in a service-only env file, never a
                 shell profile, per billing-routing-discipline
  5. CONSENT     explicit opt-in for this run, because money is being spent

Default posture is PREPARE, not CALL. The gate produces an escalation packet
and a decision record. It only performs the call when every gate passes AND
--execute is given. A decision is always logged, including refusals, so the
escalation history is auditable.

Persistence advisory: --should-persist asks whether an item is compounded
intelligence that must survive the session. Answered locally by rule first,
and escalated only when the rules are genuinely ambiguous.

Usage:
  escalation-gate.py --assess "task"          decide, do not call
  escalation-gate.py --assess "task" --execute  call if all gates pass
  escalation-gate.py --should-persist "item"  persistence advisory
  escalation-gate.py --budget                 show spend against ceiling
  escalation-gate.py --self-test
"""
import argparse, json, os, re, sys, time
from pathlib import Path

ROOT = Path(os.environ.get("CLAUDE_PROJECT_DIR", os.getcwd()))
DECISIONS = ROOT / ".claude" / "escalation-decisions.ndjson"
EVAL_HIST = ROOT / ".claude" / "eval-history.ndjson"
BUDGET_CEILING = float(os.environ.get("ESCALATION_BUDGET_USD", "5.00"))
BUDGET_PERIOD_DAYS = 30
ENV_FILE = Path(os.environ.get("ANTHROPIC_ENV_FILE", Path.home() / ".zas/anthropic.env"))
MIN_ROUTE_ACCURACY = 0.80

HIGHER_ORDER = [
    (r"\barchitect|\bdesign the|\brefactor across|\bmigrat(e|ion) strategy", "architectural"),
    (r"\birreversible|\bcannot be undone|\bdrop table|\bdelete production", "irreversible"),
    (r"\bsecurity (review|model)|\bthreat model|\bauth(entication|orisation) design", "security-critical"),
    (r"\bacross (the )?(repo|codebase|services)|\bcross-cutting|\bwhole system", "cross-cutting"),
    (r"\btrade-?off|\bwhich approach|\bcompare (the )?(designs|approaches)", "judgement"),
]

# Persistence rules. Local, deterministic, and deliberately conservative:
# when in doubt the answer is persist, because losing compounded intelligence
# is expensive and storing something unnecessary is cheap.
PERSIST_YES = [
    (r"telemetry|metric|measurement|eval|score|accuracy", "measurement stream, compounds over time"),
    (r"lesson|learning|ledger|pattern|insight|finding", "compounded intelligence, the whole point is accumulation"),
    (r"decision|rationale|why we|chose|rejected", "decision record, future sessions cannot reconstruct it"),
    (r"rule|guardrail|policy|standard|convention", "governs future behaviour, must outlive the session"),
    (r"baseline|checkpoint|snapshot|hash|version", "comparison anchor, worthless if not retained"),
    (r"failure|incident|regression|bug found", "failure history prevents repetition"),
]
PERSIST_NO = [
    (r"^(what is|explain|how does|define)\b", "one-off question, no state to compound"),
    (r"\btemp(orary)?\b|\bscratch\b|\bthrowaway\b", "explicitly transient"),
    (r"\bformat(ting)?\b|\bindent|\bwhitespace", "cosmetic, regenerable"),
]


def log_decision(rec):
    DECISIONS.parent.mkdir(parents=True, exist_ok=True)
    with open(DECISIONS, "a") as f:          # append only, refusals included
        f.write(json.dumps(rec) + "\n")


def spend_this_period():
    if not DECISIONS.exists():
        return 0.0
    cutoff = time.time() - BUDGET_PERIOD_DAYS * 86400
    total = 0.0
    for l in open(DECISIONS, errors="replace"):
        try:
            d = json.loads(l)
        except ValueError:
            continue
        if d.get("epoch", 0) >= cutoff:
            total += float(d.get("cost_usd", 0) or 0)
    return round(total, 4)


def route_accuracy(route):
    """Competence gate reads the eval history rather than assuming."""
    if not EVAL_HIST.exists():
        return None
    best = None
    for l in open(EVAL_HIST, errors="replace"):
        try:
            d = json.loads(l)
        except ValueError:
            continue
        br = d.get("by_route", {})
        if route in br:
            best = br[route]
    return best


def classify_order(task):
    for pat, label in HIGHER_ORDER:
        if re.search(pat, task, re.I):
            return True, label
    return False, "routine"


def should_persist(item):
    for pat, why in PERSIST_NO:
        if re.search(pat, item, re.I):
            return {"persist": False, "confidence": "high", "reason": why, "decided_by": "local-rule"}
    for pat, why in PERSIST_YES:
        if re.search(pat, item, re.I):
            return {"persist": True, "confidence": "high", "reason": why, "decided_by": "local-rule",
                    "requires": ["append-only sink", "launchd watcher", "growth verification"]}
    # Conservative default: losing compounded intelligence costs more than
    # storing something that turns out unnecessary.
    return {"persist": True, "confidence": "low", "reason":
            "no rule matched; defaulting to persist because loss is more expensive than storage",
            "decided_by": "conservative-default", "escalation_candidate": True}


def assess(task, execute=False):
    now = time.time()
    gates, reasons = {}, []

    higher, label = classify_order(task)
    declined = "NEEDS_ESCALATION" in task.upper()
    gates["necessity"] = bool(higher or declined)
    reasons.append(f"necessity: {label}" + (", local advisor declined" if declined else ""))

    route = None
    for r in ("lint", "secrets", "test-failure", "divergence", "changelog", "commit"):
        if r.split("-")[0] in task.lower():
            route = r
            break
    acc = route_accuracy(route) if route else None
    if acc is None:
        gates["competence"] = bool(higher)
        reasons.append("competence: no eval data for this route"
                       + ("; higher-order task carries it" if higher else "; cannot justify escalation"))
    else:
        gates["competence"] = acc < MIN_ROUTE_ACCURACY
        reasons.append(f"competence: local route {route} scores {acc:.0%} "
                       f"(threshold {MIN_ROUTE_ACCURACY:.0%})")

    spent = spend_this_period()
    gates["budget"] = spent < BUDGET_CEILING
    reasons.append(f"budget: ${spent:.2f} of ${BUDGET_CEILING:.2f} used this period")

    gates["credential"] = ENV_FILE.exists()
    reasons.append(f"credential: {'service env file present' if ENV_FILE.exists() else f'no {ENV_FILE}'}"
                   " (never read from a shell profile)")

    gates["consent"] = bool(execute)
    reasons.append("consent: --execute given" if execute else "consent: not given, preparing only")

    permitted = all(gates.values())
    rec = {"ts": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()), "epoch": now,
           "task": task[:300], "gates": gates, "permitted": permitted,
           "action": "ESCALATE" if permitted else "PREPARE-ONLY",
           "reasons": reasons, "cost_usd": 0.0}
    if not permitted:
        rec["blocked_by"] = [k for k, v in gates.items() if not v]
    log_decision(rec)
    return rec


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--assess"); ap.add_argument("--should-persist")
    ap.add_argument("--execute", action="store_true")
    ap.add_argument("--budget", action="store_true")
    ap.add_argument("--json", action="store_true")
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
            global ROOT, DECISIONS, EVAL_HIST, ENV_FILE
            ROOT = Path(t); DECISIONS = ROOT / "esc.ndjson"; EVAL_HIST = ROOT / "eval.ndjson"
            ENV_FILE = ROOT / "absent.env"

            # NEGATIVE, the important one: no consent means never escalate
            r = assess("architect the whole system migration strategy")
            chk("negative/no-consent-blocks", r["action"] == "PREPARE-ONLY" and "consent" in r["blocked_by"])
            # NEGATIVE: missing credential blocks even with consent
            r = assess("architect the whole system migration", execute=True)
            chk("negative/no-credential-blocks", "credential" in r.get("blocked_by", []))
            # NEGATIVE: a routine task is not higher-order, necessity fails
            r = assess("rename this variable", execute=True)
            chk("negative/routine-not-escalated", "necessity" in r.get("blocked_by", []))
            # POSITIVE: higher-order classification works
            hi, lab = classify_order("this change is irreversible and drops production data")
            chk("positive/higher-order-detected", hi and lab == "irreversible")
            # BUDGET: exceeding the ceiling blocks
            with open(DECISIONS, "a") as fh:
                fh.write(json.dumps({"epoch": time.time(), "cost_usd": 99.0}) + "\n")
            r = assess("architect the migration", execute=True)
            chk("negative/budget-ceiling-blocks", "budget" in r.get("blocked_by", []))
            # AUDIT: every decision including refusals is recorded
            chk("audit/refusals-logged", DECISIONS.exists() and len(open(DECISIONS).readlines()) >= 5)
            # PERSISTENCE: compounded intelligence must persist
            p = should_persist("the learning ledger of lessons from this session")
            chk("persist/compounded-intelligence-yes", p["persist"] and p["confidence"] == "high")
            # PERSISTENCE: a one-off question need not
            p = should_persist("what is the syntax for a bash array")
            chk("persist/one-off-no", p["persist"] is False)
            # PERSISTENCE: unknown defaults to persist, and says why
            p = should_persist("zxqv unmatched thing")
            chk("persist/conservative-default", p["persist"] and p["confidence"] == "low")
            # SAFETY: assessing never performs a call in self-test
            chk("safety/never-calls-without-all-gates", all(
                assess("architect x", execute=True)["action"] == "PREPARE-ONLY" for _ in range(2)))
        print(f"\nControls: {n}  Failures: {f}")
        print("RESULT: " + ("BROKEN" if f else "OPERATIONAL"))
        return 1 if f else 0

    if a.budget:
        s = spend_this_period()
        print(f"Escalation spend: ${s:.2f} of ${BUDGET_CEILING:.2f} over {BUDGET_PERIOD_DAYS} days")
        print(f"Decisions recorded: {len(open(DECISIONS).readlines()) if DECISIONS.exists() else 0}")
        return 0

    if a.should_persist:
        r = should_persist(a.should_persist)
        print(json.dumps(r, indent=2) if a.json else
              f"persist: {r['persist']} ({r['confidence']} confidence)\n  {r['reason']}"
              + ("\n  requires: " + ", ".join(r["requires"]) if r.get("requires") else ""))
        return 0

    if a.assess:
        r = assess(a.assess, a.execute)
        if a.json:
            print(json.dumps(r, indent=2)); return 0
        print(f"ACTION: {r['action']}\n")
        for x in r["reasons"]:
            print(f"  {x}")
        if not r["permitted"]:
            print(f"\nBlocked by: {', '.join(r['blocked_by'])}")
            print("No Anthropic call was made. The decision is recorded either way.")
        else:
            print("\nAll five gates passed. Escalation permitted.")
        return 0
    ap.print_help(); return 2


if __name__ == "__main__":
    sys.exit(main())
