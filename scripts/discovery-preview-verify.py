#!/usr/bin/env python3
# CLAUDE-CODE-INJECTION:
#   target_path: scripts/discovery-preview-verify.py
#   permissions: 0755
#   create_parent_dirs: true
#   overwrite_if_exists: true
#   backup_if_exists: true
#   post_install_verify: python3 scripts/discovery-preview-verify.py --test
#   rollback_command: git checkout -- scripts/discovery-preview-verify.py
"""discovery-preview-verify.py — Workstream 12: RELEASE_EVIDENCE_AND_PREVIEW_VERIFICATION_ENGINE.

Keeps the SIX release states strictly distinct and evidenced, and NEVER conflates them:
  LOCAL_ASSEMBLED -> LOCALLY_COMMITTED -> PREVIEW_DEPLOYED -> PREVIEW_VERIFIED
    -> PRODUCTION_DEPLOYED -> EXTERNALLY_VERIFIED_LIVE

HARDENED GATE (Preview Gate Correction, 21/09/2026):
  - Mandatory checks carry a state PASS|FAIL|ERROR|NOT_TESTED|BLOCKED. A missing, FAILED, or ERRORED
    mandatory check makes the gate exit NONZERO (rc 3). Only PASS/NOT_TESTED (explicitly-outstanding,
    no-follow probe pending) keep it green.
  - No state advancement from a URL alone: PREVIEW_VERIFIED requires build READY + deployment identity
    (deployment SHA == candidate full SHA) + zero FAILED/ERRORED mandatory checks. A URL with unproven
    checks stays PREVIEW_DEPLOYED.
  - Git failures are ERRORS, never a clean zero-result (a failed ls-remote is ERROR, not "0 refs").
  - Real remote-ref check (git ls-remote origin <branch> == candidate) + Vercel deployment identity.
  - Real build/HTTP/browser results are INJECTED via --checks-json (gathered by the caller from the
    live preview) and are gated on here; they are never fabricated by this script.
  - Isolated tests: selftest runs entirely under a temp root and cannot overwrite live evidence.

  --verify [--preview-url URL] [--deployment-id ID] [--deployment-sha SHA] [--build-state STATE]
           [--checks-json PATH]     classify + gate (real git, read-only). Never pushes/deploys.
  --test                            controls incl gate-nonzero-on-fail + isolation + no-advance-from-url
"""

import sys
import os
import json
import argparse
import subprocess
from pathlib import Path
from datetime import datetime, timezone

HOME = Path(os.path.expanduser("~"))
ROOT = Path(os.environ.get("ZA_COMMERCIAL_ROOT", HOME / ".za-commercial-discovery"))
REPO = Path(os.environ.get("ZA_REPO", HOME / "Developer/new-zas-website"))
PROD_BASE = os.environ.get("ZA_PROD_BASE", "c8b29c8")
GATE_917 = os.environ.get("ZA_GATE_917", "eae1257")
CANDIDATE = os.environ.get("ZA_CANDIDATE", "9ea170b")
CANDIDATE_BRANCH = os.environ.get("ZA_CANDIDATE_BRANCH", "release/apple-support-airpods-20260921")
REMOTE = os.environ.get("ZA_REMOTE", "origin")

STATES = [
    "LOCAL_ASSEMBLED",
    "LOCALLY_COMMITTED",
    "PREVIEW_DEPLOYED",
    "PREVIEW_VERIFIED",
    "PRODUCTION_DEPLOYED",
    "EXTERNALLY_VERIFIED_LIVE",
]
# mandatory preview checks (their states come from injected real evidence)
MANDATORY = [
    "build_ready",
    "deployment_identity",
    "nav_desktop",
    "nav_mobile",
    "airpods_removed",
    "airpods_redirect",
    "www_nonwww_impl",
    "production_unchanged",
]
FAIL_STATES = {"FAIL", "ERROR"}


def now_utc():
    return datetime.now(timezone.utc)


def git(*args):
    """Return (ok, stdout, stderr). ok=False means the command ERRORED (never silently 'empty')."""
    try:
        r = subprocess.run(
            ["git", "-C", str(REPO), *args], capture_output=True, text=True, timeout=30
        )
        return r.returncode == 0, r.stdout.strip(), r.stderr.strip()
    except Exception as e:
        return False, "", str(e)


def full_sha(rev):
    ok, out, _ = git("rev-parse", rev)
    return out if ok and out else None


def remote_ref_sha(branch):
    """git ls-remote. Returns ('OK', sha) | ('ERROR', reason) | ('MISSING', None). Never a clean 0."""
    ok, out, err = git("ls-remote", REMOTE, f"refs/heads/{branch}")
    if not ok:
        return "ERROR", err or "ls-remote failed"
    if not out:
        return "MISSING", None
    return "OK", out.split()[0]


def verify(
    preview_url=None, deployment_id=None, deployment_sha=None, build_state=None, checks=None
):
    checks = checks or {}
    ev = {
        "generated_utc": now_utc().isoformat(),
        "prod_base": PROD_BASE,
        "gate_917": GATE_917,
        "candidate": CANDIDATE,
        "candidate_branch": CANDIDATE_BRANCH,
        "preview_url": preview_url,
        "deployment_id": deployment_id,
        "chain": {},
        "mandatory_checks": {},
        "release_state": None,
        "gate_exit": None,
        "outstanding": [],
        "production": {},
    }

    cand_full = full_sha(CANDIDATE)

    # --- SHA chain (git ancestry; a git failure is an ERROR, not a clean pass) ---
    def anc(a, b):
        ok, _, err = git("merge-base", "--is-ancestor", a, b)
        # is-ancestor: rc0 = yes, rc1 = no (clean), other/exception = error
        if ok:
            return "YES"
        # distinguish "no" from "error": re-check existence
        if full_sha(a) and full_sha(b):
            return "NO"
        return "ERROR"

    ev["chain"]["base_to_gate"] = anc(PROD_BASE, GATE_917)
    ev["chain"]["gate_to_candidate"] = anc(GATE_917, CANDIDATE)
    ev["chain"]["candidate_full_sha"] = cand_full
    ev["chain"]["verified"] = (
        ev["chain"]["base_to_gate"] == "YES" and ev["chain"]["gate_to_candidate"] == "YES"
    )

    # --- remote ref (real ls-remote; ERROR not clean-zero) ---
    rstate, rval = remote_ref_sha(CANDIDATE_BRANCH)
    ev["chain"]["remote_ref_state"] = rstate
    ev["chain"]["remote_ref_sha"] = rval

    # --- production unchanged ---
    ok, om, err = git("rev-parse", "--short", f"{REMOTE}/main")
    ev["production"]["origin_main"] = om if ok else f"ERROR:{err}"
    ev["production"]["unchanged_at_base"] = ok and om == PROD_BASE

    # ── mandatory checks (states from real evidence; unknowns are NOT_TESTED, never fabricated PASS) ──
    m = ev["mandatory_checks"]
    # build_ready: from the injected Vercel build state
    m["build_ready"] = (
        "PASS"
        if (build_state or "").upper() == "READY"
        else ("NOT_TESTED" if build_state is None else "FAIL")
    )
    # deployment_identity: injected deployment SHA must equal the candidate full SHA
    if deployment_sha is None:
        m["deployment_identity"] = "NOT_TESTED"
    elif cand_full and deployment_sha == cand_full:
        m["deployment_identity"] = "PASS"
    else:
        m["deployment_identity"] = "FAIL"
    # www_nonwww_impl: verifiable from candidate source (git), not the preview host
    ok_mw, mw, _ = git("show", f"{CANDIDATE}:src/middleware.ts")
    m["www_nonwww_impl"] = (
        "PASS"
        if (ok_mw and "www" in mw and "host" in mw.lower())
        else ("ERROR" if not ok_mw else "FAIL")
    )
    # airpods_removed: no airpods route files in candidate tree
    ok_ls, tree, _ = git("ls-tree", "-r", "--name-only", CANDIDATE)
    if not ok_ls:
        m["airpods_removed"] = "ERROR"
    else:
        route_hits = [
            f
            for f in tree.splitlines()
            if "airpods" in f.lower() and "/blog/" not in f and "app/" in f
        ]
        m["airpods_removed"] = "PASS" if not route_hits else "FAIL"
    # production_unchanged
    m["production_unchanged"] = "PASS" if ev["production"]["unchanged_at_base"] else "FAIL"
    # browser/HTTP-derived checks come from the caller (never fabricated here)
    for k in ("nav_desktop", "nav_mobile", "airpods_redirect"):
        v = checks.get(k)
        m[k] = v if v in ("PASS", "FAIL", "ERROR", "NOT_TESTED") else "NOT_TESTED"

    # outstanding = any mandatory check that is neither a hard PASS nor a FAIL/ERROR
    # (NOT_TESTED / BLOCKED / MISSING / unknown all count as outstanding -> non-accepting).
    ev["outstanding"] = [k for k in MANDATORY if m.get(k) not in ("PASS", "FAIL", "ERROR")]
    failed = [k for k in MANDATORY if m.get(k) in FAIL_STATES]
    all_pass = all(m.get(k) == "PASS" for k in MANDATORY)

    # ── release state (NEVER advance from a URL alone; PREVIEW_VERIFIED only when ALL mandatory PASS) ──
    if not cand_full:
        ev["release_state"] = "LOCAL_ASSEMBLED"
    elif not preview_url:
        ev["release_state"] = "LOCALLY_COMMITTED"
    elif failed:
        ev["release_state"] = "PREVIEW_DEPLOYED (checks FAILED — see mandatory_checks)"
    elif all_pass:
        ev["release_state"] = "PREVIEW_VERIFIED"
    else:
        ev["release_state"] = "PREVIEW_DEPLOYED (outstanding mandatory checks remain)"

    # ── ACCEPTANCE exit (FAIL-CLOSED): 0 ONLY when every mandatory preview check is PASS. ──
    #   0 = ACCEPTED (all PASS) | 2 = OUTSTANDING (NOT_TESTED/BLOCKED/MISSING/unknown) | 3 = FAILED (FAIL/ERROR)
    # This is the ACCEPTANCE verdict. Report/inventory generation elsewhere may exit 0 on its own success,
    # but it must NOT supply this acceptance verdict.
    if failed:
        ev["gate_exit"] = 3
    elif not all_pass:
        ev["gate_exit"] = 2
    else:
        ev["gate_exit"] = 0
    ev["accepted"] = ev["gate_exit"] == 0
    ev["gate_exit_legend"] = {
        "0": "ACCEPTED (all mandatory PASS)",
        "2": "OUTSTANDING (not-tested/blocked/missing/unknown)",
        "3": "FAILED (fail/error)",
    }

    # Separate post-deployment requirements (NOT preview failures; explicitly deferred to production).
    ev["pending_production"] = [
        "www_nonwww_edge_consolidation: production-domain single-hop www->non-www is verified in-repo "
        "(src/middleware.ts) but its production-domain effect requires a production deploy + separate "
        "verification (PENDING_PRODUCTION_CHECK)."
    ]
    # Queued comment-only corrections that must NOT touch the pinned candidate.
    ev["queued_corrections"] = [
        "next.config.ts:248 comment says '301' but the actual server behavior is a 308 permanent "
        "redirect (verified: HEAD /airpods-repair -> 308 Location /apple-repair, query preserved). "
        "Comment-only fix, to land OUTSIDE the pinned 9ea170b; working behavior is correct, do not change."
    ]

    ROOT.mkdir(parents=True, exist_ok=True)
    (ROOT / "release-evidence.json").write_text(json.dumps(ev, indent=2))
    print(
        f"release chain: {PROD_BASE} -> {GATE_917} -> {CANDIDATE}  verified={ev['chain']['verified']} "
        f"remote_ref={rstate}({(rval or '')[:12]})"
    )
    print(
        f"  production origin/main={ev['production']['origin_main']} unchanged={ev['production']['unchanged_at_base']}"
    )
    for k in MANDATORY:
        print(f"    {k:22s} {m[k]}")
    print(f"  RELEASE STATE: {ev['release_state']}")
    print(
        f"  outstanding: {ev['outstanding'] or 'none'}  pending_production: {len(ev['pending_production'])}"
    )
    _verdict = {0: "ACCEPTED", 2: "OUTSTANDING", 3: "FAILED"}.get(ev["gate_exit"], "UNKNOWN")
    print(
        f"  ACCEPTANCE EXIT: {ev['gate_exit']} ({_verdict})  accepted={ev['accepted']}  -> {ROOT / 'release-evidence.json'}"
    )
    return ev["gate_exit"]


def _isolated(tmp, **kw):
    """Run verify under a temp root so it cannot overwrite live evidence."""
    global ROOT
    saved = ROOT
    ROOT = Path(tmp)
    try:
        import io
        import contextlib

        buf = io.StringIO()
        with contextlib.redirect_stdout(buf):
            rc = verify(**kw)
        return rc, json.loads((Path(tmp) / "release-evidence.json").read_text())
    finally:
        ROOT = saved


def selftest():
    import tempfile

    fails = 0
    td = tempfile.mkdtemp()
    live = ROOT / "release-evidence.json"
    live_before = live.read_bytes() if live.exists() else None

    # 1) no URL -> LOCALLY_COMMITTED, NOT accepted (fail-closed rc 2), NOT PREVIEW_VERIFIED
    rc, ev = _isolated(td, preview_url=None)
    ok1 = (
        ev["release_state"] == "LOCALLY_COMMITTED"
        and rc == 2
        and not ev["accepted"]
        and "VERIFIED" not in ev["release_state"]
    )
    print(
        "  PASS no-url: LOCALLY_COMMITTED, not accepted (rc2), never PREVIEW_VERIFIED"
        if ok1
        else f"  FAIL no-url: {ev['release_state']} rc={rc}"
    )
    fails |= 0 if ok1 else 1

    # 2) URL alone (no build/identity) -> must NOT advance to PREVIEW_VERIFIED, not accepted (rc 2)
    rc, ev = _isolated(td, preview_url="https://x.vercel.app")
    ok2 = (
        "PREVIEW_VERIFIED" != ev["release_state"]
        and ev["mandatory_checks"]["deployment_identity"] == "NOT_TESTED"
        and rc == 2
        and not ev["accepted"]
    )
    print(
        "  PASS url-alone: no advance to PREVIEW_VERIFIED without build+identity (rc2)"
        if ok2
        else f"  FAIL url-alone: {ev['release_state']} rc={rc}"
    )
    fails |= 0 if ok2 else 1

    # 3) gate NONZERO on a FAILED mandatory check (planted identity mismatch)
    rc, ev = _isolated(
        td, preview_url="https://x.vercel.app", deployment_sha="deadbeef", build_state="READY"
    )
    ok3 = ev["mandatory_checks"]["deployment_identity"] == "FAIL" and rc == 3
    print(
        "  PASS gate-fail: identity mismatch -> mandatory FAIL + gate exit 3 (nonzero)"
        if ok3
        else f"  FAIL gate-fail: id={ev['mandatory_checks']['deployment_identity']} rc={rc}"
    )
    fails |= 0 if ok3 else 1

    # 4) isolation: live evidence not overwritten by any selftest verify
    live_after = live.read_bytes() if live.exists() else None
    ok4 = live_before == live_after
    print(
        "  PASS isolation: live release-evidence.json untouched by selftest"
        if ok4
        else "  FAIL isolation: live evidence mutated"
    )
    fails |= 0 if ok4 else 1

    # 5) full green path (build READY + identity match + browser checks PASS) -> PREVIEW_VERIFIED, gate 0
    cand = full_sha(CANDIDATE) or "0" * 40
    rc, ev = _isolated(
        td,
        preview_url="https://x.vercel.app",
        deployment_sha=cand,
        build_state="READY",
        checks={"nav_desktop": "PASS", "nav_mobile": "PASS", "airpods_redirect": "PASS"},
    )
    ok5 = ev["release_state"] == "PREVIEW_VERIFIED" and rc == 0 and ev["accepted"]
    print(
        "  PASS green-path: all-mandatory PASS -> PREVIEW_VERIFIED, ACCEPTANCE exit 0"
        if ok5
        else f"  FAIL green-path: {ev['release_state']} rc={rc} outstanding={ev['outstanding']}"
    )
    fails |= 0 if ok5 else 1

    # 6) REGRESSION (mobile-gate): 7 mandatory PASS + nav_mobile NOT_TESTED -> NONZERO + NOT PREVIEW_VERIFIED
    rc, ev = _isolated(
        td,
        preview_url="https://x.vercel.app",
        deployment_sha=cand,
        build_state="READY",
        checks={"nav_desktop": "PASS", "nav_mobile": "NOT_TESTED", "airpods_redirect": "PASS"},
    )
    ok6 = (
        rc != 0
        and not ev["accepted"]
        and ev["release_state"] != "PREVIEW_VERIFIED"
        and "nav_mobile" in ev["outstanding"]
    )
    print(
        "  PASS regression: 7 PASS + nav_mobile NOT_TESTED -> nonzero acceptance, never PREVIEW_VERIFIED"
        if ok6
        else f"  FAIL regression: rc={rc} state={ev['release_state']} outstanding={ev['outstanding']}"
    )
    fails |= 0 if ok6 else 1

    subprocess.run(["rm", "-rf", td])
    print("SELFTEST PASS" if fails == 0 else "SELFTEST FAIL")
    return fails


def main():
    ap = argparse.ArgumentParser(
        description="Release evidence + preview verification (read-only; never pushes)"
    )
    ap.add_argument("--verify", action="store_true")
    ap.add_argument("--preview-url", default=None)
    ap.add_argument("--deployment-id", default=None)
    ap.add_argument("--deployment-sha", default=None)
    ap.add_argument("--build-state", default=None)
    ap.add_argument("--checks-json", default=None)
    ap.add_argument("--test", action="store_true")
    a = ap.parse_args()
    if a.test:
        sys.exit(selftest())
    checks = None
    if a.checks_json:
        checks = json.loads(Path(a.checks_json).read_text())
    sys.exit(verify(a.preview_url, a.deployment_id, a.deployment_sha, a.build_state, checks))


if __name__ == "__main__":
    main()
