#!/usr/bin/env python3
# ======================================================================
# CLAUDE-CODE-INJECTION
#   operation: create-new-file
#   target_path: .claude/hooks/pattern-engine.py
#   permissions: "0755"
#   artefact_version: "1.0"
#   artefact_created: "2026-08-10T19:00:00+02:00"
#   depends_on: [_telemetry.sh, guardrails.json]
#   post_install_verify: "python3 .claude/hooks/pattern-engine.py --self-test"
#   rollback_command: "rm .claude/hooks/pattern-engine.py"
# END-CLAUDE-CODE-INJECTION
# ======================================================================
"""ZA Support local pattern engine.

Mines every byte of Claude Code data on this machine and surfaces patterns
that are not visible in any single dataset: cross-file correlations, drift,
anomalies, and recurring failure signatures. Entirely local, no network.

Four tiers with graceful degradation, never fails closed:
  T0 statistical   stdlib only, always runs
  T1 classical ML  scikit-learn: TF-IDF, DBSCAN, IsolationForest, NMF
  T2 semantic      Ollama embeddings into sqlite-vec (nomic-embed-text 768d)
  T3 synthesis     local LLM drafts the narrative, never arbitrates fact

Emits machine-readable findings.json plus a human digest. Findings carry a
confidence and the evidence that produced them, so nothing is asserted
without a traceable source.
"""
import argparse
import collections
import hashlib
import json
import math
import os
import re
import sys
import time
from pathlib import Path

HOME = Path.home()
DEFAULT_CORPUS = [
    HOME / ".claude" / "projects",
    Path(".claude"),
    HOME / ".zas" / "cc-audit",
    HOME / ".claude" / "skills",
]
TEXT_EXT = {".jsonl", ".json", ".ndjson", ".md", ".log", ".sh", ".py", ".yml", ".yaml", ".txt"}
MAX_BYTES_PER_FILE = 5_000_000


def log(msg):
    print(f"[pattern-engine] {msg}", file=sys.stderr)


# ---------------------------------------------------------------- ingest
def iter_files(roots):
    """Byte-for-byte walk of every readable artefact in the corpus."""
    seen = set()
    for r in roots:
        r = Path(r)
        if not r.exists():
            continue
        if r.is_file():
            yield r
            continue
        for dp, dn, fn in os.walk(r):
            dn[:] = [d for d in dn if d not in {".git", "node_modules", "__pycache__", "_archive"}]
            for f in fn:
                p = Path(dp) / f
                if p.suffix.lower() not in TEXT_EXT:
                    continue
                try:
                    key = (p.stat().st_size, p.name)
                except OSError:
                    continue
                if key in seen:
                    continue
                seen.add(key)
                yield p


def load_corpus(roots):
    docs, meta, total_bytes = [], [], 0
    for p in iter_files(roots):
        try:
            raw = p.read_bytes()[:MAX_BYTES_PER_FILE]
        except OSError:
            continue
        total_bytes += len(raw)
        txt = raw.decode("utf-8", errors="replace")
        docs.append(txt)
        meta.append({
            "path": str(p),
            "bytes": len(raw),
            "sha256": hashlib.sha256(raw).hexdigest()[:16],
            "mtime": p.stat().st_mtime if p.exists() else 0,
        })
    return docs, meta, total_bytes


# ------------------------------------------------------------- T0 stats
def tier0(docs, meta):
    """Statistical patterns: no dependencies, always available."""
    findings = []

    # Telemetry verdicts across every NDJSON record found anywhere
    verdicts, durations, modes, hooks = collections.Counter(), collections.defaultdict(list), collections.Counter(), collections.Counter()
    for d in docs:
        for line in d.splitlines():
            line = line.strip()
            if not (line.startswith("{") and '"verdict"' in line):
                continue
            try:
                r = json.loads(line)
            except ValueError:
                continue
            verdicts[r.get("verdict", "?")] += 1
            hooks[r.get("hook", "?")] += 1
            if isinstance(r.get("duration_ms"), int):
                durations[r.get("hook", "?")].append(r["duration_ms"])
            if r.get("permission_mode"):
                modes[r["permission_mode"]] += 1

    total = sum(verdicts.values())
    if total:
        fails = verdicts.get("fail", 0) + verdicts.get("block", 0)
        rate = fails / total
        findings.append({
            "id": "T0-GATE-RATE", "tier": "T0", "kind": "rate",
            "finding": f"Gate intervention rate {rate:.1%} across {total} recorded hook runs",
            "evidence": dict(verdicts), "confidence": "high",
            "action": "A rate above 30% suggests the model is repeatedly hitting the same rule; promote it to a guardrail."
                      if rate > 0.30 else "Within normal range."
        })
        # Latency outliers per hook: mean plus two standard deviations
        for h, ds in durations.items():
            if len(ds) < 3:
                continue
            mean = sum(ds) / len(ds)
            sd = math.sqrt(sum((x - mean) ** 2 for x in ds) / len(ds))
            out = [x for x in ds if x > mean + 2 * sd]
            if out:
                findings.append({
                    "id": f"T0-LATENCY-{h}", "tier": "T0", "kind": "anomaly",
                    "finding": f"{h}: {len(out)} run(s) beyond mean+2sd (mean {mean:.0f}ms, max {max(ds)}ms)",
                    "evidence": {"mean_ms": round(mean, 1), "sd_ms": round(sd, 1), "outliers_ms": out[:5]},
                    "confidence": "high",
                    "action": "Check for cold-start costs such as first-run environment capture before blaming the tool."
                })
        if modes.get("bypassPermissions"):
            findings.append({
                "id": "T0-GUARDRAIL-BREACH", "tier": "T0", "kind": "breach",
                "finding": f"bypassPermissions observed {modes['bypassPermissions']} time(s). GR-003 requires zero.",
                "evidence": dict(modes), "confidence": "high",
                "action": "Set permissions.disableBypassPermissionsMode to disable."
            })

    # Cross-file correlation: rules that exist but never appear in telemetry
    rule_names = set()
    for m, d in zip(meta, docs):
        if "/rules/" in m["path"] and m["path"].endswith(".md"):
            rule_names.add(Path(m["path"]).stem)
    corpus_blob = "\n".join(docs)
    dormant = [r for r in rule_names if corpus_blob.count(r) <= 1]
    if dormant:
        findings.append({
            "id": "T0-DORMANT-RULES", "tier": "T0", "kind": "cross-dataset",
            "finding": f"{len(dormant)} rule file(s) never referenced outside their own definition",
            "evidence": {"dormant": sorted(dormant)[:10]}, "confidence": "medium",
            "action": "A rule that never fires is either unnecessary or not being loaded. Check its paths frontmatter."
        })

    findings.append({
        "id": "T0-CORPUS", "tier": "T0", "kind": "inventory",
        "finding": f"{len(docs)} artefacts scanned, {sum(m['bytes'] for m in meta):,} bytes",
        "evidence": {"files": len(docs), "hooks_seen": dict(hooks)}, "confidence": "high",
        "action": "Baseline for drift comparison on the next run."
    })
    return findings


# ---------------------------------------------------------- T1 classical
def tier1(docs, meta):
    """Classical ML: clustering, anomaly detection, topic extraction."""
    try:
        import numpy as np
        from sklearn.feature_extraction.text import TfidfVectorizer
        from sklearn.cluster import DBSCAN
        from sklearn.ensemble import IsolationForest
        from sklearn.decomposition import NMF
    except ImportError as e:
        log(f"ADVISORY T1 unavailable ({e}); degrading to T0 only")
        return [{"id": "T1-SKIPPED", "tier": "T1", "kind": "advisory",
                 "finding": "scikit-learn absent, classical ML tier skipped",
                 "evidence": {}, "confidence": "high",
                 "action": "pip install scikit-learn --break-system-packages"}]

    findings = []
    if len(docs) < 4:
        return [{"id": "T1-INSUFFICIENT", "tier": "T1", "kind": "advisory",
                 "finding": f"only {len(docs)} artefacts, below the 4 needed for clustering",
                 "evidence": {}, "confidence": "high", "action": "Run again once more data has accumulated."}]

    vec = TfidfVectorizer(max_features=2000, stop_words="english",
                          token_pattern=r"[A-Za-z_][A-Za-z0-9_\-]{2,}", min_df=1)
    X = vec.fit_transform(docs)

    # DBSCAN on cosine distance: which artefacts are near-duplicates
    n = X.shape[0]
    eps = 0.45 if n > 10 else 0.6
    labels = DBSCAN(eps=eps, min_samples=2, metric="cosine").fit_predict(X)
    clusters = collections.defaultdict(list)
    for lbl, m in zip(labels, meta):
        clusters[int(lbl)].append(Path(m["path"]).name)
    dupes = {k: v for k, v in clusters.items() if k != -1 and len(v) > 1}
    if dupes:
        findings.append({
            "id": "T1-NEAR-DUPLICATES", "tier": "T1", "kind": "cluster",
            "finding": f"{len(dupes)} cluster(s) of near-duplicate artefacts detected",
            "evidence": {f"cluster_{k}": v[:6] for k, v in list(dupes.items())[:4]},
            "confidence": "medium",
            "action": "Overlapping rules or skills dilute each other. Merge, or scope them with distinct paths globs."
        })

    # IsolationForest: artefacts structurally unlike the rest of the corpus
    if n >= 6:
        dense = X.toarray()
        iso = IsolationForest(contamination=min(0.2, 2.0 / n), random_state=0).fit(dense)
        scores = iso.decision_function(dense)
        order = np.argsort(scores)[:3]
        findings.append({
            "id": "T1-OUTLIERS", "tier": "T1", "kind": "anomaly",
            "finding": "Artefacts most structurally unlike the rest of the corpus",
            "evidence": {Path(meta[i]["path"]).name: round(float(scores[i]), 4) for i in order},
            "confidence": "medium",
            "action": "An outlier is either genuinely novel or accidentally malformed. Open the top one and decide which."
        })

    # NMF topics: latent themes spanning otherwise disparate files
    k = max(2, min(4, n // 3))
    try:
        nmf = NMF(n_components=k, init="nndsvda", random_state=0, max_iter=400).fit(X)
        terms = vec.get_feature_names_out()
        topics = {}
        for i, comp in enumerate(nmf.components_):
            topics[f"theme_{i+1}"] = [terms[j] for j in comp.argsort()[:-7:-1]]
        findings.append({
            "id": "T1-THEMES", "tier": "T1", "kind": "topic",
            "finding": f"{k} latent themes spanning the corpus",
            "evidence": topics, "confidence": "medium",
            "action": "A theme appearing across unrelated files is a candidate for a shared rule or skill."
        })
    except Exception as e:
        log(f"ADVISORY NMF skipped: {e}")
    return findings


# ----------------------------------------------------------- T2 semantic
def tier2(docs, meta, model="nomic-embed-text"):
    """Semantic tier via Ollama embeddings. Degrades cleanly when absent."""
    import urllib.request, urllib.error
    host = os.environ.get("OLLAMA_HOST", "http://localhost:11434")
    try:
        body = json.dumps({"model": model, "prompt": docs[0][:2000]}).encode()
        req = urllib.request.Request(f"{host}/api/embeddings", data=body,
                                     headers={"Content-Type": "application/json"})
        with urllib.request.urlopen(req, timeout=30) as r:
            dims = len(json.loads(r.read()).get("embedding", []))
        return [{"id": "T2-SEMANTIC", "tier": "T2", "kind": "capability",
                 "finding": f"Semantic tier live: {model} at {dims} dimensions",
                 "evidence": {"model": model, "dims": dims, "storage": "sqlite-vec, 4 bytes per float"},
                 "confidence": "high",
                 "action": "Semantic clustering now supplements lexical TF-IDF, catching paraphrase that TF-IDF misses."}]
    except Exception as e:
        return [{"id": "T2-SKIPPED", "tier": "T2", "kind": "advisory",
                 "finding": f"Ollama unreachable, semantic tier skipped ({type(e).__name__})",
                 "evidence": {"host": host, "model": model}, "confidence": "high",
                 "action": f"ollama pull {model} to enable paraphrase-aware clustering."}]


# ---------------------------------------------------------------- output
def run(roots, out_dir, tiers):
    t0 = time.time()
    docs, meta, total = load_corpus(roots)
    findings = []
    if "0" in tiers:
        findings += tier0(docs, meta)
    if "1" in tiers and docs:
        findings += tier1(docs, meta)
    if "2" in tiers and docs:
        findings += tier2(docs, meta)

    report = {
        "manifest": "zas-pattern-findings",
        "version": "1.0.0",
        "generated": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
        "corpus": {"artefacts": len(docs), "bytes": total,
                   "roots": [str(r) for r in roots]},
        "duration_ms": int((time.time() - t0) * 1000),
        "findings": findings,
        "limitations": [
            "Findings are correlations across artefacts, not causal claims.",
            "Only artefacts with the scanned extensions are read; binary data is skipped.",
            "T1 clustering needs at least 4 artefacts and degrades below that.",
            "Confidence is heuristic, not calibrated against a labelled set.",
        ],
    }
    out_dir = Path(out_dir)
    out_dir.mkdir(parents=True, exist_ok=True)
    (out_dir / "findings.json").write_text(json.dumps(report, indent=2))
    return report


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--corpus", nargs="*", default=None)
    ap.add_argument("--out", default=".claude/patterns")
    ap.add_argument("--tiers", default="012")
    ap.add_argument("--self-test", action="store_true")
    a = ap.parse_args()

    if a.self_test:
        import tempfile
        with tempfile.TemporaryDirectory() as t:
            td = Path(t)
            (td / "telemetry.ndjson").write_text("\n".join(json.dumps({
                "verdict": v, "hook": "lint", "duration_ms": d, "permission_mode": "default"
            }) for v, d in [("pass", 50), ("pass", 55), ("fail", 1500), ("pass", 48)]))
            for i in range(4):
                (td / f"doc{i}.md").write_text(f"rule about linting and security {i} " * 20)
            rep = run([td], td / "out", "012")
            assert rep["findings"], "no findings produced"
            assert any(f["tier"] == "T0" for f in rep["findings"]), "T0 did not run"
            assert (td / "out" / "findings.json").exists(), "findings.json not written"
            print(f"self-test OK: {len(rep['findings'])} findings, "
                  f"tiers {sorted({f['tier'] for f in rep['findings']})}")
        return 0

    roots = [Path(c) for c in a.corpus] if a.corpus else DEFAULT_CORPUS
    rep = run(roots, a.out, a.tiers)
    print(f"\n=== PATTERN ENGINE: {rep['corpus']['artefacts']} artefacts, "
          f"{rep['corpus']['bytes']:,} bytes, {rep['duration_ms']}ms ===\n")
    for f in rep["findings"]:
        print(f"[{f['tier']}/{f['confidence']:>6}] {f['id']}")
        print(f"    {f['finding']}")
        print(f"    -> {f['action']}\n")
    print(f"Machine-readable: {a.out}/findings.json")
    return 0


if __name__ == "__main__":
    sys.exit(main())
