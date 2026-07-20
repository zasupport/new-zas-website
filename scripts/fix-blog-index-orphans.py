#!/usr/bin/env python3
"""
§402 ORPHAN FIXER — add every sitemap slug that is missing from the blog index, using the
metadata already present in the content store. Companion to check-blog-index-orphans.py.

Reads   : src/app/sitemap.ts          (which slugs are advertised to Google)
          src/app/blog/[slug]/page.tsx (the content store: title/excerpt/date/category/readTime)
Writes  : src/app/blog/page.tsx        (the index array), backup-first, temp-then-promote (§573)

It NEVER invents metadata. A slug whose content entry is missing any required field is SKIPPED
and named, rather than emitted with a placeholder (§374: no fabricated content).

  --dry-run   (default) show exactly what would be added, change nothing
  --apply     write the change (backup kept as page.tsx.bak-orphanfix-<epoch>)
"""
import re, sys, os, time, json, shutil

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SITEMAP = os.path.join(ROOT, "src", "app", "sitemap.ts")
INDEX = os.path.join(ROOT, "src", "app", "blog", "page.tsx")
CONTENT = os.path.join(ROOT, "src", "app", "blog", "[slug]", "page.tsx")
FIELDS = ("title", "excerpt", "date", "category", "readTime")


def read(p):
    with open(p, encoding="utf-8") as fh:
        return fh.read()


def field_for(content_text, slug, field):
    """Pull one field out of a slug's content entry. Handles single-quoted, double-quoted and
    backtick strings, including escaped quotes. Returns None if absent."""
    start = re.search(r"'" + re.escape(slug) + r"':\s*\{", content_text)
    if not start:
        return None
    seg = content_text[start.end(): start.end() + 6000]
    m = re.search(field + r"\s*:\s*(?P<q>['\"`])(?P<v>(?:\\.|(?!(?P=q)).)*)(?P=q)", seg, re.S)
    if not m:
        return None
    v = m.group("v")
    v = v.replace("\\'", "'").replace('\\"', '"').replace("\\`", "`")
    v = re.sub(r"\s+", " ", v).strip()
    return v or None


def main():
    apply = "--apply" in sys.argv
    sm = set(re.findall(r"/blog/([a-z0-9-]+)", read(SITEMAP)))
    idx_text = read(INDEX)
    ix = set(re.findall(r"slug:\s*'([a-z0-9-]+)'", idx_text))
    content = read(CONTENT)
    orphans = sorted(sm - ix)

    if not orphans:
        print("nothing to do — 0 orphans")
        return 0

    rows, skipped = [], []
    for s in orphans:
        vals = {f: field_for(content, s, f) for f in FIELDS}
        missing = [f for f, v in vals.items() if not v]
        if missing:
            skipped.append((s, missing))
            continue
        # json.dumps gives correctly-escaped double-quoted strings -> valid TS.
        row = ("  { slug: " + json.dumps(s) + ", title: " + json.dumps(vals["title"])
               + ", excerpt: " + json.dumps(vals["excerpt"]) + ", date: " + json.dumps(vals["date"])
               + ", category: " + json.dumps(vals["category"])
               + ", readTime: " + json.dumps(vals["readTime"]) + " },")
        rows.append(row)

    print(f"orphans: {len(orphans)}  emit: {len(rows)}  skipped(missing metadata): {len(skipped)}")
    for s, miss in skipped:
        print(f"  SKIP {s} — missing {miss}")
    for r in rows[:3]:
        print("  +", r[:150])
    if len(rows) > 3:
        print(f"  ... and {len(rows)-3} more")

    if not apply:
        print("\n(dry run — nothing written; pass --apply to write)")
        return 0
    if not rows:
        print("nothing emittable")
        return 1

    # locate the END of the posts array: the last '];' that closes `const posts = [`
    start = idx_text.index("const posts = [")
    depth, end = 0, None
    for i in range(start + len("const posts = "), len(idx_text)):
        c = idx_text[i]
        if c == "[":
            depth += 1
        elif c == "]":
            depth -= 1
            if depth == 0:
                end = i
                break
    if end is None:
        print("FATAL: could not locate the end of the posts array — refusing to write")
        return 2

    new_text = idx_text[:end] + "\n" + "\n".join(rows) + "\n" + idx_text[end:]

    bak = INDEX + f".bak-orphanfix-{int(time.time())}"
    shutil.copy2(INDEX, bak)
    tmp = INDEX + ".tmp"
    with open(tmp, "w", encoding="utf-8") as fh:
        fh.write(new_text)
    # verify the temp file BEFORE promoting (§573): every orphan must now be present.
    check = set(re.findall(r"slug:\s*'([a-z0-9-]+)'", read(tmp))) | set(
        re.findall(r'slug:\s*"([a-z0-9-]+)"', read(tmp)))
    still = [s for s in orphans if s not in check and s not in [x[0] for x in skipped]]
    if still:
        os.unlink(tmp)
        print(f"FATAL: temp file still missing {len(still)} slug(s) — NOT promoting. Backup: {bak}")
        return 2
    os.replace(tmp, INDEX)
    print(f"\nwrote {len(rows)} row(s). backup: {os.path.basename(bak)}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
