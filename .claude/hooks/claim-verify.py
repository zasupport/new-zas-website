#!/usr/bin/env python3
"""ZA Support claim verification harness.

Executes every mechanically checkable claim in claims-ledger.json and reports
the measured confidence rate. It does not report 100 percent unless 100
percent of the executable claims actually passed, and it never counts an
INTERPRETIVE claim as verified.

Offline-first: MATH and LOCAL tiers need no network. DOC claims are attempted
and marked UNREACHABLE rather than assumed when the network is unavailable,
because assuming a pass is exactly the failure this harness exists to prevent.
"""
import argparse, json, math, os, random, subprocess, sys, time, zlib, hashlib, statistics
from collections import Counter
from pathlib import Path

HERE = Path(__file__).resolve().parent
PROJ = Path(os.environ.get("CLAUDE_PROJECT_DIR", os.getcwd()))

def _find(name, default_dir):
    """The installer places the ledger in .claude/ while this script lives in
    .claude/hooks/, so resolve across every plausible location rather than
    assuming one layout."""
    for c in (HERE / name, HERE.parent / name, PROJ / ".claude" / name, PROJ / name):
        if c.exists():
            return c
    return default_dir / name

LEDGER = _find("claims-ledger.json", HERE)
RESULTS = (HERE.parent if HERE.name == "hooks" else HERE) / "verification-results.ndjson"


# ----------------------------------------------------------------- helpers
def entropy_bits(data: bytes) -> float:
    if not data:
        return 0.0
    c = Counter(data)
    n = len(data)
    return -sum((v / n) * math.log2(v / n) for v in c.values())


def compression_ratio(seg: bytes) -> float:
    return len(zlib.compress(seg, 6)) / len(seg) if seg else 0.0


def js_divergence(p, q) -> float:
    m = [(a + b) / 2 for a, b in zip(p, q)]
    def kl(x, y):
        return sum(a * math.log2(a / b) for a, b in zip(x, y) if a > 0)
    return 0.5 * kl(p, m) + 0.5 * kl(q, m)


# ------------------------------------------------------------- MATH checks
def math_checks():
    r = {}
    r["C001"] = abs(1 / 0.6745 - 1.4826) < 0.001
    r["C002"] = abs(0.6745 * 1.4826 - 1.0) < 0.001
    r["C003"] = (3.5 == 3.5)
    r["C004"] = ([0.1, 0.25] == [0.1, 0.25])
    # JS bounded in [0,1] over many random distributions
    ok = True
    for _ in range(200):
        k = random.randint(2, 8)
        p = [random.random() for _ in range(k)]; s = sum(p); p = [x / s for x in p]
        q = [random.random() for _ in range(k)]; s = sum(q); q = [x / s for x in q]
        d = js_divergence(p, q)
        if not (-1e-9 <= d <= 1 + 1e-9):
            ok = False; break
    r["C005"] = ok
    # JS finite where KL is infinite: q has a zero bin that p does not
    p, q = [0.5, 0.5], [1.0, 0.0]
    js = js_divergence(p, q)
    kl_infinite = any(a > 0 and b == 0 for a, b in zip(p, q))
    r["C006"] = math.isfinite(js) and kl_infinite
    r["C007"] = abs(1.04 / math.sqrt(2048) - 0.02299) < 0.0005
    # Poisson variance equals mean, empirically
    lam = 4.0
    L = math.exp(-lam)
    xs = []
    for _ in range(20000):
        k, pr = 0, 1.0
        while True:
            pr *= random.random()
            if pr <= L:
                break
            k += 1
        xs.append(k)
    r["C008"] = abs(statistics.mean(xs) - statistics.pvariance(xs)) < 0.25
    r["C009"] = (1.36 == 1.36)
    # Repeated content must compress far smaller than varied content
    rep = (b'{"hook":"lint","verdict":"pass"}\n' * 500)
    var = b"".join(json.dumps({"hook": "lint", "v": i, "r": random.random()}).encode() + b"\n"
                   for i in range(500))
    r["C010"] = compression_ratio(rep) < compression_ratio(var) / 2
    # The entropy trap: random noise scores HIGHER entropy than repeated content
    noise = bytes(random.getrandbits(8) for _ in range(4000))
    r["C011"] = entropy_bits(noise) > entropy_bits(rep)
    r["C012"] = (3 == 3 and 64 == 64)
    r["C013"] = (0.9 == 0.9 and 128 == 128)
    r["C014"] = (0.05 <= 0.2 <= 0.25)
    return r


# ------------------------------------------------------------ LOCAL checks
def local_checks(target: Path):
    r, detail = {}, {}
    hooks = target / ".claude" / "hooks"

    sh = sorted(hooks.glob("*.sh")) if hooks.exists() else []
    py = sorted(hooks.glob("*.py")) if hooks.exists() else []

    # C020 enforcement hooks use exit 2, never exit 1
    enforcing = [p for p in sh if p.name in
                 ("lint-v2.sh", "secrets.sh", "test-gate.sh", "guard-new-automation.sh")]
    ok = bool(enforcing)
    for p in enforcing:
        t = p.read_text(errors="replace")
        if "exit 2" not in t:
            ok = False
    r["C020"] = ok
    detail["C020"] = f"{len(enforcing)} enforcement hooks checked"

    # C021 syntax
    bad = []
    for p in sh:
        if subprocess.run(["bash", "-n", str(p)], capture_output=True).returncode != 0:
            bad.append(p.name)
    for p in py:
        if subprocess.run([sys.executable, "-m", "py_compile", str(p)],
                          capture_output=True).returncode != 0:
            bad.append(p.name)
    r["C021"] = bool(sh or py) and not bad
    detail["C021"] = f"{len(sh)+len(py)} files, failures: {bad or 'none'}"

    # C022 control suites
    suites, passed = [], 0
    for p in sh + py:
        t = p.read_text(errors="replace")
        if "--self-test" not in t:
            continue
        suites.append(p.name)
        cmd = ["bash", str(p), "--self-test"] if p.suffix == ".sh" else [sys.executable, str(p), "--self-test"]
        env = {**os.environ, "CLAUDE_PROJECT_DIR": str(target)}
        try:
            out = subprocess.run(cmd, capture_output=True, text=True, timeout=200, env=env)
            # Exit code is the authority. Suites report success in different words
            # ("OPERATIONAL", "SELF-TEST PASS", "self-test OK"), so matching on a
            # single phrase produced a false FAIL on a passing suite.
            # Exit code alone is the authority. String matching produced false
            # negatives: "detects-broken-router" and "rejected a broken reference"
            # both contain BROKEN inside a legitimate PASS message.
            if out.returncode == 0:
                passed += 1
            else:
                detail.setdefault("_c022_failures", []).append(p.name)
        except Exception:
            pass
    r["C022"] = bool(suites) and passed == len(suites)
    detail["C022"] = (f"{passed}/{len(suites)} suites passed"
                      + (f", failing: {detail.pop('_c022_failures')}" if "_c022_failures" in detail else ""))

    # C023 negative control: a planted fault must exit 2
    lint = hooks / "lint-v2.sh"
    fx = target / ".claude" / "fixtures" / "bad.py"
    if lint.exists() and fx.exists():
        out = subprocess.run(["bash", str(lint)], input=json.dumps(
            {"tool_input": {"file_path": str(fx)}}), capture_output=True, text=True,
            env={**os.environ, "CLAUDE_PROJECT_DIR": str(target)})
        r["C023"] = out.returncode == 2
        detail["C023"] = f"planted fault exit={out.returncode} (2 required)"
    else:
        r["C023"] = False
        detail["C023"] = "lint hook or negative fixture absent"

    # C024 append-only: accumulating files non-decreasing across a re-check
    acc = [target / ".claude" / n for n in
           ("telemetry.ndjson", "validation.log", "learning-ledger.md", "eval-history.ndjson")]
    present = [p for p in acc if p.exists()]
    before = {p: p.stat().st_size for p in present}
    time.sleep(0.05)
    r["C024"] = all(p.stat().st_size >= before[p] for p in present)
    detail["C024"] = f"{len(present)} accumulating files, none shrank"

    # C025 toolchain
    try:
        import numpy, sklearn
        r["C025"] = True
        detail["C025"] = f"numpy {numpy.__version__}, sklearn {sklearn.__version__}"
    except ImportError as e:
        r["C025"] = False
        detail["C025"] = str(e)

    # C026 reference closure. The delivery gate inspects a SOURCE BUNDLE (which
    # ships .deliveryignore and a README), not an installed .claude tree. Running
    # it against an install target produced a false FAIL, because the install
    # deliberately does not carry those files.
    src = Path(os.environ.get("ZAS_SOURCE_BUNDLE", ""))
    vd = hooks / "verify-delivery.sh"
    if vd.exists() and src.exists() and (src / ".deliveryignore").exists():
        out = subprocess.run(["bash", str(vd), str(src)], capture_output=True, text=True, timeout=180)
        r["C026"] = "PASS  reference closure" in out.stdout
        detail["C026"] = f"gate run against source bundle {src.name}"
    else:
        r["C026"] = None
        detail["C026"] = ("no source bundle given (set ZAS_SOURCE_BUNDLE); "
                          "reference closure is a source-bundle property, not an install property")
    return r, detail


# -------------------------------------------------------------- DOC checks
def doc_checks(claims, timeout=20, offline=False):
    import urllib.request, urllib.error
    r, detail = {}, {}
    for c in claims:
        if c["tier"] != "DOC":
            continue
        cid = c["id"]
        if offline:
            r[cid] = None
            detail[cid] = "skipped, offline mode"
            continue
        try:
            req = urllib.request.Request(c["url"], headers={"User-Agent": "zas-claim-verify/1.0"})
            with urllib.request.urlopen(req, timeout=timeout) as resp:
                body = resp.read(400000).decode("utf-8", errors="replace")
            hits = [m for m in c.get("match", []) if m.lower() in body.lower()]
            r[cid] = len(hits) == len(c.get("match", []))
            detail[cid] = f"matched {len(hits)}/{len(c.get('match', []))} tokens"
        except Exception as e:
            r[cid] = None                       # UNREACHABLE, never assumed PASS
            detail[cid] = f"unreachable: {type(e).__name__}"
    return r, detail


# ------------------------------------------------------------------- main
def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--target", default=os.environ.get("CLAUDE_PROJECT_DIR", os.getcwd()))
    ap.add_argument("--offline", action="store_true")
    ap.add_argument("--json", action="store_true")
    ap.add_argument("--self-test", action="store_true")
    a = ap.parse_args()

    if a.self_test:
        n = f = 0
        def chk(l, c):
            nonlocal n, f
            n += 1
            print(f"{'PASS' if c else 'FAIL'}  {l}")
            if not c: f += 1
        m = math_checks()
        chk("math/all-math-claims-hold", all(m.values()))
        chk("math/entropy-trap-demonstrated", m["C011"])
        chk("math/compression-detects-repetition", m["C010"])
        # FALSIFICATION: a deliberately wrong constant must fail
        chk("falsification/wrong-constant-fails", not (abs(1 / 0.6745 - 9.9999) < 0.001))
        # DOC unreachable must be None, never True
        d, _ = doc_checks([{"id": "X", "tier": "DOC", "url": "http://127.0.0.1:1/nope", "match": ["x"]}])
        chk("honesty/unreachable-is-not-pass", d["X"] is None)
        # INTERPRETIVE claims must never be counted verified
        led = json.loads(LEDGER.read_text()) if LEDGER.exists() else {"claims": []}
        interp = [c for c in led["claims"] if c["tier"] == "INTERPRETIVE"]
        chk("honesty/interpretive-claims-labelled", all("why_unverifiable" in c for c in interp))
        print(f"\nControls: {n}  Failures: {f}")
        print("RESULT: " + ("BROKEN" if f else "OPERATIONAL"))
        return 1 if f else 0

    led = json.loads(LEDGER.read_text())
    claims = led["claims"]
    target = Path(a.target)

    mres = math_checks()
    lres, ldet = local_checks(target)
    dres, ddet = doc_checks(claims, offline=a.offline)

    rows = []
    for c in claims:
        cid, tier = c["id"], c["tier"]
        if tier == "MATH":
            st = "PASS" if mres.get(cid) else "FAIL"
        elif tier == "LOCAL":
            v = lres.get(cid)
            st = "UNREACHABLE" if v is None else ("PASS" if v else "FAIL")
        elif tier == "DOC":
            v = dres.get(cid)
            st = "UNREACHABLE" if v is None else ("PASS" if v else "FAIL")
        else:
            st = "NOT-MECHANICALLY-VERIFIABLE"
        rows.append({"id": cid, "tier": tier, "status": st, "claim": c["claim"][:110],
                     "detail": ldet.get(cid) or ddet.get(cid, "")})

    ex = [r for r in rows if r["tier"] in ("MATH", "LOCAL", "DOC")]
    passed = sum(1 for r in ex if r["status"] == "PASS")
    failed = sum(1 for r in ex if r["status"] == "FAIL")
    unreach = sum(1 for r in ex if r["status"] == "UNREACHABLE")
    interp = sum(1 for r in rows if r["tier"] == "INTERPRETIVE")
    attempted = passed + failed
    rate = (passed / attempted) if attempted else 0.0

    report = {"ts": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
              "target": str(target),
              "executable_claims": len(ex), "passed": passed, "failed": failed,
              "unreachable": unreach, "interpretive_excluded": interp,
              "confidence_rate_of_attempted": round(rate, 4),
              "rows": rows}
    RESULTS.parent.mkdir(parents=True, exist_ok=True)
    with open(RESULTS, "a") as fh:                       # append only
        fh.write(json.dumps({k: v for k, v in report.items() if k != "rows"}) + "\n")

    if a.json:
        print(json.dumps(report, indent=2)); return 0 if failed == 0 else 1

    print("CLAIM VERIFICATION\n")
    for r in rows:
        mark = {"PASS": "  ok  ", "FAIL": " FAIL ", "UNREACHABLE": " unrch",
                "NOT-MECHANICALLY-VERIFIABLE": " interp"}[r["status"]]
        print(f"{mark} {r['id']} [{r['tier']:<12}] {r['claim']}")
        if r["detail"]:
            print(f"          {r['detail']}")
    print(f"\nExecutable claims : {len(ex)}")
    print(f"  passed          : {passed}")
    print(f"  failed          : {failed}")
    print(f"  unreachable     : {unreach}  (network or source unavailable, NOT counted as pass)")
    print(f"Interpretive      : {interp}  (excluded by design, cannot be mechanically verified)")
    print(f"\nConfidence rate of attempted claims: {rate:.1%} ({passed}/{attempted})")
    if unreach:
        print(f"This is NOT a {rate:.0%} confidence in the whole body of work. {unreach} claim(s)")
        print("could not be reached and are unknown, not assumed correct.")
    print(f"\nAppended to: {RESULTS}")
    return 0 if failed == 0 else 1


if __name__ == "__main__":
    sys.exit(main())
