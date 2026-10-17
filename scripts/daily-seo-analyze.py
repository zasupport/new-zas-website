#!/usr/bin/env python3
# ======================================================================
# CLAUDE-CODE-INJECTION
#   operation: create-new-file
#   target_path: scripts/daily-seo-analyze.py
#   permissions: "0755"
#   create_parent_dirs: true
#   overwrite_if_exists: false
#   backup_if_exists: true
#   post_install_verify: "python3 scripts/daily-seo-analyze.py --test"
#   rollback_command: "git checkout -- scripts/daily-seo-analyze.py"
#   hook_governance: lint-v2.sh + secrets.sh (PostToolUse Edit|Write) and
#     test-gate.sh (Stop) govern edits to this file. Beyond that this is a
#     CLI pipeline stage with no Claude lifecycle touchpoint (hook-block-mandate
#     exemption clause, stated explicitly): its equivalent controls are this
#     script's own --test (positive/negative/absence) executed by
#     scripts/smoke-seo-pipeline.sh, which records evidence in the repo.
# END-CLAUDE-CODE-INJECTION
# ======================================================================
"""daily-seo-analyze.py — Stage 3 of the Daily SEO Intelligence pipeline.

Turns a normalized snapshot into RANKED, evidence-backed, ADVISORY opportunity records.
NEVER edits, publishes, or auto-acts. Every record is schema-validated (opportunity-schema.json),
carries non-empty source_ids, and is classified by a FAIL-SAFE decision engine.

WHAT IS DELEGATED vs NET-NEW (§410 — do not duplicate):
  - CTR-gap + period comparison: the authoritative human-facing engine is ~/bin/za-site-improve.py.
    analyze.py invokes it READ-ONLY and embeds its output as `delegated_period_engine` (consumption,
    not a fork). It ALSO emits structured ctr-gap records from THIS run's own GSC snapshot so the
    queue has schema records; the criteria mirror za-site-improve's published thresholds.
  - Net-new signals computed here: cannibalisation, orphan-risk, missing-internal-link,
    tech-regression, doorway-risk, indexing-eligibility.

DECISION-ENGINE INVARIANT (negative-control tested in the test harness):
  A content/code/schema/sitemap/prod-affecting opportunity can NEVER be AUTO_SAFE_OPERATIONAL.
  classify() forces HUMAN_REVIEW_REQUIRED for every such type regardless of what a record requests.

  --analyze --run-id ID [--top N] [--use-llm]   analyze; write opportunities.json
  --test                                        controls (see selftest)
"""

import sys
import os
import json
import argparse
import subprocess
import re
from pathlib import Path
from datetime import datetime, timezone

HOME = Path(os.path.expanduser("~"))
ROOT = Path(os.environ.get("ZA_DAILY_SEO_ROOT", HOME / ".za-daily-seo"))
SITE_IMPROVE = Path(os.environ.get("ZA_SITE_IMPROVE", HOME / "bin/za-site-improve.py"))
OLLAMA_MODEL = os.environ.get("ZA_LLM_MODEL", "nuextract")

CONTENT_AFFECTING = {
    "ctr-gap",
    "position-decay",
    "cannibalisation",
    "orphan-page",
    "missing-internal-link",
    "tech-regression",
    "doorway-risk",
    "indexing-eligibility",
}
VALID_TYPES = set(CONTENT_AFFECTING)
VALID_LABELS = {
    "OBSERVED_FACT",
    "INHERITED_CLAIM",
    "INFERENCE",
    "RECOMMENDATION",
    "ASSUMPTION",
    "UNKNOWN",
    "BLOCKED",
}
VALID_CLASSES = {"AUTO_SAFE_OPERATIONAL", "HUMAN_REVIEW_REQUIRED", "BLOCKED", "NO_ACTION"}


def now_utc():
    return datetime.now(timezone.utc)


def rel(u):
    return (u or "").replace("https://zasupport.com", "") or "/"


# ── FAIL-SAFE decision engine (the single chokepoint; §627) ─────────────────────
def classify(rec):
    """Force the correct decision class. Content-affecting types are ALWAYS HUMAN_REVIEW_REQUIRED
    and can never be promoted to AUTO_SAFE_OPERATIONAL — that class is reserved for pipeline ops
    (produced only by healthcheck, never here)."""
    if rec.get("evidence_label") == "BLOCKED":
        return "BLOCKED"
    if rec.get("type") in CONTENT_AFFECTING:
        return "HUMAN_REVIEW_REQUIRED"
    return "NO_ACTION"  # analyze never legitimately produces an AUTO_SAFE record


# ── minimal, dependency-free schema validator ───────────────────────────────────
def validate_opportunity(rec):
    errs = []
    for f in (
        "id",
        "type",
        "target",
        "signal",
        "evidence_label",
        "source_ids",
        "decision_class",
        "rationale",
    ):
        if f not in rec:
            errs.append(f"missing:{f}")
    if rec.get("type") not in VALID_TYPES:
        errs.append(f"bad-type:{rec.get('type')}")
    if rec.get("evidence_label") not in VALID_LABELS:
        errs.append(f"bad-label:{rec.get('evidence_label')}")
    if rec.get("decision_class") not in VALID_CLASSES:
        errs.append(f"bad-class:{rec.get('decision_class')}")
    if not isinstance(rec.get("source_ids"), list) or not rec.get("source_ids"):
        errs.append("empty-source_ids")
    if rec.get("model_proposed") and rec.get("evidence_label") not in (
        "INFERENCE",
        "UNKNOWN",
        "BLOCKED",
    ):
        errs.append("model-proposed-must-be-inference")
    # invariant: content-affecting never AUTO_SAFE
    if (
        rec.get("type") in CONTENT_AFFECTING
        and rec.get("decision_class") == "AUTO_SAFE_OPERATIONAL"
    ):
        errs.append("INVARIANT-VIOLATION:content-affecting-auto-safe")
    return errs


def mkrec(type_, target, signal, label, source_ids, rationale, action, score=None, model=False):
    rec = {
        "id": f"{type_}--{re.sub(r'[^a-z0-9/._-]+', '-', (target or 'site').lower()).strip('-') or 'site'}",
        "type": type_,
        "target": target,
        "signal": signal,
        "evidence_label": label,
        "source_ids": source_ids,
        "rationale": rationale,
        "recommended_review_action": action,
        "model_proposed": model,
    }
    if score is not None:
        rec["priority_score"] = score
    rec["decision_class"] = classify(rec)  # chokepoint always decides
    return rec


# ── signals ─────────────────────────────────────────────────────────────────────
def sig_ctr_gap(gsc):
    """Delegated criteria (mirrors za-site-improve.py): imp>=200, pos<=20, ctr<2%."""
    out = []
    for r in gsc or []:
        imp, clk, pos = r.get("impressions", 0), r.get("clicks", 0), r.get("position", 99)
        if imp < 200 or pos > 20:
            continue
        ctr = clk / imp if imp else 0
        if ctr < 0.02:
            recoverable = imp * (0.02 - ctr)
            out.append(
                mkrec(
                    "ctr-gap",
                    rel(r["page"]),
                    {
                        "impressions": imp,
                        "clicks": clk,
                        "position": pos,
                        "ctr": round(ctr, 4),
                        "recoverable_clicks_est": int(recoverable),
                    },
                    "OBSERVED_FACT",
                    [f"gsc_pages:{r['page']}"],
                    f"Ranks pos {pos} with {imp} impressions but CTR {ctr * 100:.1f}% (<2%): earned ranking leaking clicks.",
                    "Consider rewriting title + meta description to match search intent.",
                    score=recoverable,
                )
            )
    return out


def sig_tech_regression(probe):
    out = []
    for p in probe or []:
        u = p.get("url")
        sid = f"siteprobe:{u}"
        st = p.get("status")
        if st is not None and st != 200:
            out.append(
                mkrec(
                    "tech-regression",
                    rel(u),
                    {"status": st},
                    "OBSERVED_FACT",
                    [sid],
                    f"Probed HTTP status {st} (expected 200).",
                    "Investigate why this sitemap URL does not return 200.",
                )
            )
        if p.get("status") == 200:
            if not p.get("canonical"):
                out.append(
                    mkrec(
                        "tech-regression",
                        rel(u),
                        {"canonical": None},
                        "OBSERVED_FACT",
                        [sid],
                        "No canonical link found on a 200 page.",
                        "Consider adding a self-referencing canonical.",
                    )
                )
            if not p.get("title"):
                out.append(
                    mkrec(
                        "tech-regression",
                        rel(u),
                        {"title": None},
                        "OBSERVED_FACT",
                        [sid],
                        "No <title> found.",
                        "Consider adding a keyword-led title.",
                    )
                )
            if not p.get("meta_description"):
                out.append(
                    mkrec(
                        "tech-regression",
                        rel(u),
                        {"meta_description": None},
                        "OBSERVED_FACT",
                        [sid],
                        "No meta description.",
                        "Consider adding a 150-160 char description.",
                    )
                )
            if p.get("h1_count", 0) != 1:
                out.append(
                    mkrec(
                        "tech-regression",
                        rel(u),
                        {"h1_count": p.get("h1_count")},
                        "OBSERVED_FACT",
                        [sid],
                        f"H1 count = {p.get('h1_count')} (expected exactly 1).",
                        "Consider normalising to a single H1.",
                    )
                )
    return out


def sig_missing_internal_link(probe, threshold=3):
    out = []
    for p in probe or []:
        if p.get("status") != 200:
            continue
        n = p.get("internal_link_count", 0)
        if n < threshold:
            out.append(
                mkrec(
                    "missing-internal-link",
                    rel(p.get("url")),
                    {"internal_link_count": n, "threshold": threshold},
                    "OBSERVED_FACT",
                    [f"siteprobe:{p.get('url')}"],
                    f"Only {n} internal links on page (site guideline >= {threshold}).",
                    "Consider adding contextual internal links to relevant hubs.",
                    score=threshold - n,
                )
            )
    return out


def sig_orphan_risk(sitemap_urls, probe):
    """Sample-limited: a sitemap URL not seen as an internal-link TARGET in any probed page.
    Labelled INFERENCE because the probe is a bounded sample, not the whole site graph (§402)."""
    if not sitemap_urls or not probe:
        return []
    linked = set()
    for p in probe:
        # we recorded only counts, not the target list, so this uses probed page URLs as a proxy:
        # a page that WAS reachable enough to be probed is not the orphan signal; instead flag
        # sitemap URLs far outside the sampled set as UNVERIFIED (honest limit), not as orphans.
        linked.add(p.get("url"))
    sampled = {p.get("url") for p in probe}
    # Only emit when we can say something evidence-backed: nothing here without a link graph.
    # Honest: with counts-only probe we CANNOT prove orphanhood -> emit a single UNKNOWN advisory.
    unsampled = [u for u in sitemap_urls if u not in sampled]
    if not unsampled:
        return []
    return [
        mkrec(
            "orphan-page",
            "(site-wide)",
            {
                "sitemap_urls": len(sitemap_urls),
                "sampled": len(sampled),
                "unsampled": len(unsampled),
            },
            "UNKNOWN",
            [f"sitemap:{sitemap_urls[0]}", "siteprobe:sample"],
            "Orphan detection needs the full internal-link graph; this run probed a bounded sample only.",
            "Consider running the dedicated internal-link enforcer (§402) for authoritative orphan data.",
        )
    ]


def _title_tokens(t):
    return set(re.findall(r"[a-z0-9]+", (t or "").lower())) - {
        "za",
        "support",
        "johannesburg",
        "repair",
        "the",
        "and",
        "for",
    }


def sig_cannibalisation(probe, min_jaccard=0.6):
    """Heuristic (INFERENCE): two 200 pages with highly-overlapping titles compete for one intent.
    Without query-dimension GSC (STALE this session) this is a title-overlap heuristic, labelled so."""
    out = []
    pages = [p for p in probe or [] if p.get("status") == 200 and p.get("title")]
    for i in range(len(pages)):
        for j in range(i + 1, len(pages)):
            a, b = _title_tokens(pages[i]["title"]), _title_tokens(pages[j]["title"])
            if not a or not b:
                continue
            jac = len(a & b) / len(a | b)
            if jac >= min_jaccard:
                out.append(
                    mkrec(
                        "cannibalisation",
                        f"{rel(pages[i]['url'])} vs {rel(pages[j]['url'])}",
                        {"title_jaccard": round(jac, 2)},
                        "INFERENCE",
                        [f"siteprobe:{pages[i]['url']}", f"siteprobe:{pages[j]['url']}"],
                        f"Titles overlap {jac * 100:.0f}% (heuristic; query-dimension GSC unavailable this session).",
                        "Consider consolidating or differentiating intent; confirm with query-level GSC.",
                        score=jac,
                    )
                )
    return out


DOORWAY_TAIL = re.compile(
    r"(how-much|price|cost|near-me|same-day|-vs-replacement|specialist)-[a-z-]+$"
)


def sig_doorway_risk(sitemap_urls):
    """Light heuristic mirroring §529/§723 price-doorway patterns; canonical guard remains
    ~/bin/za-blog-pool-feed-gate.py. INFERENCE only."""
    out = []
    for u in sitemap_urls or []:
        slug = u.rstrip("/").split("/")[-1]
        if DOORWAY_TAIL.search(slug):
            out.append(
                mkrec(
                    "doorway-risk",
                    rel(u),
                    {"slug": slug},
                    "INFERENCE",
                    [f"sitemap:{u}"],
                    "Slug matches a price/proximity doorway pattern (§529/§723).",
                    "Consider consolidating into an informational page; confirm against the canonical doorway guard.",
                )
            )
    return out


def sig_indexing_eligibility(probe):
    """Reported SEPARATELY from performance. Never asserts 'indexed' — only eligibility signals
    that are directly observable (noindex directives, off-site canonical)."""
    out = []
    for p in probe or []:
        if p.get("status") != 200:
            continue
        robots = (p.get("robots_meta") or "") + " " + (p.get("x_robots_tag") or "")
        u = p.get("url")
        if "noindex" in robots.lower():
            out.append(
                mkrec(
                    "indexing-eligibility",
                    rel(u),
                    {"robots": robots.strip()},
                    "OBSERVED_FACT",
                    [f"siteprobe:{u}"],
                    "Page carries a noindex directive: not eligible for indexing.",
                    "Confirm noindex is intended; this is eligibility, not a performance claim.",
                )
            )
        canon = p.get("canonical")
        if canon and "zasupport.com" not in canon:
            out.append(
                mkrec(
                    "indexing-eligibility",
                    rel(u),
                    {"canonical": canon},
                    "OBSERVED_FACT",
                    [f"siteprobe:{u}"],
                    "Canonical points off-site: indexing eligibility affected.",
                    "Confirm the off-site canonical is intended.",
                )
            )
    return out


# ── delegated period engine (consume, don't fork) ───────────────────────────────
def delegated_period_engine():
    if not SITE_IMPROVE.exists():
        return {
            "state": "MISSING",
            "cmd": f"{SITE_IMPROVE} --status",
            "reason": "za-site-improve.py absent",
        }
    try:
        r = subprocess.run(
            [sys.executable, str(SITE_IMPROVE), "--recommend", "--top", "10"],
            capture_output=True,
            text=True,
            timeout=60,
        )
        return {
            "state": "OK" if r.returncode == 0 else f"rc{r.returncode}",
            "cmd": f"{SITE_IMPROVE} --recommend --top 10",
            "stdout": r.stdout[-4000:],
            "rc": r.returncode,
        }
    except Exception as e:
        return {"state": "BLOCKED", "cmd": f"{SITE_IMPROVE} --recommend", "reason": str(e)}


# ── local LLM layer (bounded, schema-validated, off by default) ─────────────────
def llm_layer(probe, enabled):
    if not enabled:
        return {
            "state": "AVAILABLE_NOT_RUN",
            "note": f"local model '{OLLAMA_MODEL}' resident; run with --use-llm to extract page intent (bounded).",
        }
    try:
        # bounded: one extraction over titles only; JSON-schema-shaped; source-id retained.
        import shutil

        if not shutil.which("ollama"):
            return {"state": "BLOCKED", "reason": "ollama not on PATH"}
        titles = [
            {"url": p.get("url"), "title": p.get("title")} for p in (probe or []) if p.get("title")
        ][:5]
        prompt = (
            "Extract the single primary search intent for each page as JSON list of "
            '{"url","primary_intent"}. Titles:\n' + json.dumps(titles)
        )
        r = subprocess.run(
            ["ollama", "run", OLLAMA_MODEL, prompt], capture_output=True, text=True, timeout=120
        )
        raw = r.stdout.strip()
        try:
            parsed = json.loads(raw[raw.find("[") : raw.rfind("]") + 1])
        except Exception:
            return {
                "state": "UNVALIDATED",
                "reason": "model output not schema-valid JSON — dropped (not used as fact)",
            }
        # never a fact: this only annotates, always INFERENCE + HUMAN_REVIEW downstream
        return {
            "state": "OK",
            "model": OLLAMA_MODEL,
            "extractions": parsed,
            "evidence_label": "INFERENCE",
        }
    except Exception as e:
        return {"state": "BLOCKED", "reason": str(e)}


def analyze(run_id, top, use_llm):
    run_dir = ROOT / "runs" / run_id
    norm_p = run_dir / "normalized.json"
    if not norm_p.exists():
        print(f"BLOCKED: no normalized.json for run {run_id} — run normalize first")
        return 2
    norm = json.loads(norm_p.read_text())
    gsc = norm.get("gsc_pages")
    probe = norm.get("siteprobe")
    sitemap = norm.get("sitemap_urls")

    opps = []
    opps += sig_ctr_gap(gsc)
    opps += sig_tech_regression(probe)
    opps += sig_missing_internal_link(probe)
    opps += sig_cannibalisation(probe)
    opps += sig_doorway_risk(sitemap)
    opps += sig_indexing_eligibility(probe)
    opps += sig_orphan_risk(sitemap, probe)

    # validate every record; quarantine invalid ones (never emit a malformed rec as a finding)
    valid, invalid = [], []
    for rec in opps:
        e = validate_opportunity(rec)
        (invalid if e else valid).append({"rec": rec, "errors": e} if e else rec)

    valid.sort(key=lambda r: -(r.get("priority_score") or 0))
    summary = {}
    for r in valid:
        summary[r["decision_class"]] = summary.get(r["decision_class"], 0) + 1

    out = {
        "run_id": run_id,
        "generated_utc": now_utc().isoformat(),
        "opportunities": valid[:top] if top else valid,
        "total_found": len(valid),
        "invalid_dropped": invalid,
        "decision_summary": summary,
        "delegated_period_engine": delegated_period_engine(),
        "llm_layer": llm_layer(probe, use_llm),
        "source_health": norm.get("source_health"),
    }
    (run_dir / "opportunities.json").write_text(json.dumps(out, indent=2))
    print(
        f"analyzed run {run_id}: {len(valid)} valid opportunities ({len(invalid)} invalid dropped)"
    )
    for cls, n in summary.items():
        print(f"  {cls:24s} {n}")
    print(f"  delegated period engine: {out['delegated_period_engine']['state']}")
    print(f"  llm layer: {out['llm_layer']['state']}")
    print(f"  -> {run_dir}/opportunities.json")
    return 0


def selftest():
    fails = 0
    # NEGATIVE CONTROL (the §704 definition-of-done): a content-change rec CANNOT be AUTO_SAFE.
    malicious = {
        "id": "tech-regression--x",
        "type": "tech-regression",
        "target": "/x",
        "signal": {},
        "evidence_label": "OBSERVED_FACT",
        "source_ids": ["siteprobe:/x"],
        "decision_class": "AUTO_SAFE_OPERATIONAL",
        "rationale": "r",
        "recommended_review_action": "a",
    }
    forced = classify(malicious)
    ok = forced == "HUMAN_REVIEW_REQUIRED"
    print(
        "  PASS neg-control: content-change rec forced HUMAN_REVIEW_REQUIRED, never AUTO_SAFE"
        if ok
        else f"  FAIL neg-control: classify returned {forced}"
    )
    fails |= 0 if ok else 1
    # and the validator independently REJECTS a content-affecting AUTO_SAFE record
    ok2 = "INVARIANT-VIOLATION:content-affecting-auto-safe" in validate_opportunity(malicious)
    print(
        "  PASS validator: independently flags the invariant violation"
        if ok2
        else "  FAIL validator invariant"
    )
    fails |= 0 if ok2 else 1
    # POSITIVE: a real ctr-gap row produces exactly one HUMAN_REVIEW record with source_ids + score
    recs = sig_ctr_gap(
        [
            {
                "page": "https://zasupport.com/logic-board-repair",
                "clicks": 2,
                "impressions": 1000,
                "position": 6.0,
            }
        ]
    )
    ok3 = (
        len(recs) == 1
        and recs[0]["decision_class"] == "HUMAN_REVIEW_REQUIRED"
        and recs[0]["source_ids"] == ["gsc_pages:https://zasupport.com/logic-board-repair"]
        and recs[0]["priority_score"] > 0
        and not validate_opportunity(recs[0])
    )
    print(
        "  PASS positive: ctr-gap -> 1 valid HUMAN_REVIEW record with source_id + score"
        if ok3
        else f"  FAIL positive: {recs}"
    )
    fails |= 0 if ok3 else 1
    # MUTATION: a good-CTR page must NOT produce a ctr-gap record (filter has power)
    ok4 = (
        len(sig_ctr_gap([{"page": "p", "clicks": 500, "impressions": 1000, "position": 2.0}])) == 0
    )
    print(
        "  PASS mutation: high-CTR page yields no ctr-gap rec (filter bites)"
        if ok4
        else "  FAIL mutation"
    )
    fails |= 0 if ok4 else 1
    # ABSENCE: no gsc data -> no ctr-gap recs, no crash, no fabrication
    ok5 = sig_ctr_gap(None) == [] and sig_tech_regression(None) == []
    print(
        "  PASS absence: None inputs -> empty, never a fabricated finding"
        if ok5
        else "  FAIL absence"
    )
    fails |= 0 if ok5 else 1
    # TECH-REGRESSION: a 200 page missing canonical is flagged OBSERVED_FACT + HUMAN_REVIEW
    tr = sig_tech_regression(
        [
            {
                "url": "https://zasupport.com/x",
                "status": 200,
                "canonical": None,
                "title": "T",
                "meta_description": "d",
                "h1_count": 1,
            }
        ]
    )
    ok6 = any(
        r["type"] == "tech-regression"
        and r["signal"].get("canonical") is None
        and r["decision_class"] == "HUMAN_REVIEW_REQUIRED"
        for r in tr
    )
    print(
        "  PASS tech-regression: missing canonical on 200 -> HUMAN_REVIEW record"
        if ok6
        else f"  FAIL tech-regression: {tr}"
    )
    fails |= 0 if ok6 else 1
    print("SELFTEST PASS" if fails == 0 else "SELFTEST FAIL")
    return fails


def main():
    ap = argparse.ArgumentParser(description="Daily SEO analyze (advisory, schema-validated)")
    ap.add_argument("--analyze", action="store_true")
    ap.add_argument("--run-id", default=None)
    ap.add_argument("--top", type=int, default=0)
    ap.add_argument("--use-llm", action="store_true")
    ap.add_argument("--test", action="store_true")
    a = ap.parse_args()
    if a.test:
        sys.exit(selftest())
    if not a.run_id:
        print("usage: --analyze --run-id ID [--top N] [--use-llm]")
        sys.exit(2)
    sys.exit(analyze(a.run_id, a.top, a.use_llm))


if __name__ == "__main__":
    main()
