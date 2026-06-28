#!/usr/bin/env python3
"""
za-blog-price-worklist.py — READ-ONLY §489 remediation WORKLIST (28/06/2026).

Advisor-shaped (28/06): the classifier has false positives, so this does NOT
auto-rewrite. It produces a human-review worklist that:
  1. SEGMENTS posts: DOORWAY → 301 candidate (don't scrub a post you'll redirect)
     vs KEEP → scrub candidate (§529 dedup with Task 3 doorway prune).
  2. Ranks KEEP posts by ZA-INVENTED count (remediation priority).
  3. For the top batch, prints each offending SENTENCE with INLINE class tags
     [ZA-INVENTED] / [COMPETITOR] / [AMBIGUOUS] so the reviewer catches the
     misclassifications before any edit. Apply later in small reviewed batches
     under the dry-run + §190 gate. NEVER edits a blog file.

Usage:
  za-blog-price-worklist.py [--top N]   # default N=12 keep-scrub posts detailed
  za-blog-price-worklist.py --test      # segmentation + sentence-extraction power
"""
import importlib.util, re, subprocess, sys
from pathlib import Path
from collections import Counter, defaultdict

_HERE = Path(__file__).parent


def _load(path, name):
    spec = importlib.util.spec_from_file_location(name, path)
    m = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(m)
    return m

_triage = _load(_HERE / "za-blog-price-triage.py", "price_triage")
_abi = _load(_HERE / "auto-blog-insert.py", "auto_blog_insert")
is_doorway = _abi.is_doorway_slug  # §529 SoT, no fork
classify, TOKEN_RE, ALLOWED = _triage.classify, _triage.TOKEN_RE, _triage.ALLOWED

SENT_SPLIT = re.compile(r"(?<=[.!?])\s+")


def offending_sentences(content: str):
    """Yield (sentence, [class,...]) for sentences containing >=1 unconfirmed Rand token."""
    for sent in SENT_SPLIT.split(content.replace("\n", " ")):
        classes = []
        for m in TOKEN_RE.finditer(sent):
            tok = m.group(0).replace(" ", "").rstrip(",")
            if tok in ALLOWED:
                continue
            s = max(0, m.start() - 60)
            classes.append(classify(sent[s:m.end() + 20]))
        if classes:
            yield sent.strip(), classes


def parse_posts(text: str):
    """Return {slug: content-block} by splitting on `slug: '...'` markers (best-effort)."""
    posts = {}
    slug_re = re.compile(r"slug:\s*['\"]([a-z0-9-]+)['\"]")
    marks = [(m.start(), m.group(1)) for m in slug_re.finditer(text)]
    for i, (pos, slug) in enumerate(marks):
        end = marks[i + 1][0] if i + 1 < len(marks) else len(text)
        posts.setdefault(slug, text[pos:end])
    return posts


def build(text: str, top: int):
    posts = parse_posts(text)
    rows = _triage.triage(text)  # (slug, tok, cls, ctx)
    by_post = defaultdict(Counter)
    for slug, tok, cls, _ in rows:
        by_post[slug][cls] += 1

    doorway, keep = [], []
    for slug, c in by_post.items():
        za = c.get("ZA-INVENTED", 0)
        if za == 0:
            continue
        (doorway if is_doorway(slug) else keep).append((slug, c))
    keep.sort(key=lambda kv: -kv[1]["ZA-INVENTED"])
    doorway.sort(key=lambda kv: -kv[1]["ZA-INVENTED"])

    out = ["# §489 Remediation WORKLIST (READ-ONLY) — 28/06/2026", ""]
    out.append("Advisor-shaped: review tags before editing. ∅ auto-rewrite. Apply top batch only, dry-run + §190.")
    out.append("")
    out.append(f"## SEGMENT 1 — DOORWAY → 301 candidates ({len(doorway)} posts): redirect, do NOT scrub")
    for slug, c in doorway[:40]:
        out.append(f"- `{slug}` (ZA-INVENTED:{c['ZA-INVENTED']}) → 301 to service hub (§529)")
    out.append("")
    out.append(f"## SEGMENT 2 — KEEP → scrub candidates ({len(keep)} posts), ranked by invented-count")
    for slug, c in keep[:60]:
        out.append(f"- `{slug}` — ZA-INVENTED:{c['ZA-INVENTED']} competitor:{c.get('COMPETITOR-ANCHOR',0)+c.get('COMPETITOR-CONFIRMED',0)} ambiguous:{c.get('AMBIGUOUS',0)}")
    out.append("")
    out.append(f"## TOP {top} KEEP-SCRUB — sentence-level review (catch misclassifications HERE)")
    for slug, c in keep[:top]:
        out.append(f"\n### `{slug}`  (ZA-INVENTED:{c['ZA-INVENTED']})")
        for sent, classes in offending_sentences(posts.get(slug, "")):
            tag = "/".join(sorted(set(classes)))
            out.append(f"- [{tag}] {sent[:240]}")
    return "\n".join(out)


def _test() -> int:
    rc = 0
    # segmentation power: a doorway slug routes to 301, a real keep slug does not
    door = is_doorway("logic-board-repair-sandton-2026") or is_doorway("managed-it-medical-practices-sandton-2026")
    keep = not is_doorway("how-much-macbook-repair-johannesburg-2026")
    print(f"  {'PASS' if door else 'FAIL'}: doorway slug detected as doorway")
    print(f"  {'PASS' if keep else 'FAIL'}: real informational slug NOT doorway")
    if not (door and keep):
        rc = 1
    # sentence extraction power: dirty sentence yields a class, clean one yields nothing
    dirty = list(offending_sentences("M3 board repair at ZA Support is R3,499 to R6,499."))
    clean = list(offending_sentences("Assessment from R599. We confirm price after we see it."))
    print(f"  {'PASS' if dirty else 'FAIL'}: dirty sentence flagged ({dirty[0][1] if dirty else 'none'})")
    print(f"  {'PASS' if not clean else 'FAIL'}: NEG-CTRL clean sentence (R599 only) not flagged")
    if not dirty or clean:
        rc = 1
    print("RESULT:", "ALL PASS" if rc == 0 else "FAILURES")
    return rc


if __name__ == "__main__":
    a = sys.argv[1:]
    if a and a[0] == "--test":
        sys.exit(_test())
    top = 12
    if len(a) >= 2 and a[0] == "--top":
        top = int(a[1])
    text = subprocess.run(
        ["git", "show", "HEAD:src/app/blog/[slug]/page.tsx"],
        capture_output=True, text=True,
    ).stdout
    rep = build(text, top)
    dest = _HERE.parent / "docs" / "seo" / "blog-price-remediation-worklist-28-06-2026.md"
    dest.write_text(rep + "\n")
    print(rep[:3000])
    print(f"\n[written] {dest}")
