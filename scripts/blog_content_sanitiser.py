#!/usr/bin/env python3
"""
blog_content_sanitiser.py — canonical body-content leak sanitiser (§343/§377, 04/06/2026)

Removes every banned class from a blog post's markdown `content` BEFORE it can render
as visible body text. The blog template auto-generates FAQPage JSON-LD in a real
<script> tag from the markdown FAQ section, so any JSON-LD / <script> / schema heading
embedded in the body is a redundant duplicate that must be DELETED (not obfuscated).

Removed:
  - ```markdown outer wrapper (open + matching close)        -> body renders
  - ```json ... ``` fenced blocks (anywhere)                 -> no raw schema in body
  - <script ...> ... </script> blocks                        -> no embedded JSON-LD
  - ## (JSON-LD) FAQ(Page) Schema headings                   -> §343 heading leak
  - Internal Links Placed / Internal links used / External link labels + their list
  - Word count: / Word count (body) lines                    -> §343 metadata leak
  - VERIFICATION & LEARNING/REPORT/OUTPUT blocks             -> §343 authoring leak
Kept:
  - ```bash / ```sh and other legit command fences (rendered template skips them anyway)

ONE function (`sanitise`) is used by BOTH:
  (a) the one-time page.tsx cleanup (this CLI, --apply), operating on the JS
      template-literal-escaped source (escaped=True), and
  (b) the insertion path (auto-blog-insert.py imports `sanitise`) on raw markdown
      (escaped=False), so a broken post can never land again.

CLI:
  blog_content_sanitiser.py --test            positive/negative controls
  blog_content_sanitiser.py --apply           clean ALL posts in src/app/blog/[slug]/page.tsx (in place)
  blog_content_sanitiser.py --dry-run         report what would change, no write
"""
import re, sys, os

PAGE = 'src/app/blog/[slug]/page.tsx'

def _fence_re(escaped: bool):
    # In JS template-literal source, a markdown fence ``` is stored as \`\`\`.
    bt = r'(?:\\`)' if escaped else r'`'
    return re.compile(r'^\s*' + bt + r'{3}\s*([A-Za-z0-9_-]*)\s*$')

BANNED_LINE = [
    re.compile(r'^\s*#{0,3}\s*(JSON-?LD\s*)?FAQ(Page)?\s*(JSON-?LD\s*)?Schema\b', re.I),
    re.compile(r'^\s*#{0,3}\s*Internal Links?\s*(Placed|used)\b', re.I),
    re.compile(r'^\s*#{0,3}\s*External Links?\s*(used|placed)?\b', re.I),
    re.compile(r'^\s*\*{0,2}\s*Internal links used\s*:?\s*\*{0,2}\s*$', re.I),
    re.compile(r'^\s*\*{0,2}\s*External link used\s*:?\s*\*{0,2}\s*$', re.I),
    re.compile(r'^\s*\*{0,2}\s*Word count', re.I),
    re.compile(r'^\s*#{0,3}\s*VERIFICATION\s*(&|AND)?\s*(LEARNING|REPORT|OUTPUT)', re.I),
]
LINK_LABEL = re.compile(r'^\s*\*{0,2}\s*(Internal|External) links?\s*(used|placed)?\s*:?\s*\*{0,2}\s*$', re.I)
LIST_LINE = re.compile(r'^\s*[-*]\s|^\s*\[')

def sanitise(content: str, escaped: bool = False) -> str:
    FENCE = _fence_re(escaped)
    lines = content.split('\n')

    # 1. strip <script>...</script> blocks
    tmp = []; in_s = False
    for l in lines:
        if not in_s and re.search(r'<script\b', l, re.I):
            in_s = not re.search(r'</script>', l, re.I); continue
        if in_s:
            if re.search(r'</script>', l, re.I): in_s = False
            continue
        tmp.append(l)
    lines = tmp

    # 2. drop leading ```markdown wrapper open
    fne = next((k for k, l in enumerate(lines) if l.strip()), None)
    drop_wrap = fne is not None and FENCE.match(lines[fne]) and FENCE.match(lines[fne]).group(1).lower() == 'markdown'

    # 3. walk: drop ```json blocks, drop banned metadata lines + their following lists
    out = []; n = len(lines); k = 0
    while k < n:
        l = lines[k]; fm = FENCE.match(l)
        if drop_wrap and k == fne:
            k += 1; continue
        if fm and fm.group(1).lower() == 'json':
            k += 1
            while k < n and not FENCE.match(lines[k]): k += 1
            k += 1; continue
        if any(p.match(l) for p in BANNED_LINE):
            is_link_label = bool(LINK_LABEL.match(l))
            k += 1
            if is_link_label:  # also drop the following link list lines until a blank
                while k < n and (LIST_LINE.match(lines[k]) or not lines[k].strip()):
                    if not lines[k].strip(): k += 1; break
                    k += 1
            continue
        out.append(l); k += 1

    # 4. drop orphan trailing bare fence (the wrapper close, now unmatched)
    fp = [i for i, l in enumerate(out) if FENCE.match(l)]
    if len(fp) % 2 == 1:
        for i in reversed(fp):
            if FENCE.match(out[i]).group(1) == '':
                del out[i]; break

    # 5. collapse 3+ blank lines left behind
    res = re.sub(r'\n{3,}', '\n\n', '\n'.join(out))
    return res

# ---------------- CLI ----------------
def _iter_posts(text):
    pp = re.compile(r"\n  '([a-z0-9-]+)':\s*\{\s*\n?\s*slug:\s*'\1'")
    ms = list(pp.finditer(text))
    spans = {m.group(1): (m.start(), ms[i+1].start() if i+1 < len(ms) else len(text)) for i, m in enumerate(ms)}
    return spans

def _runtime(c): return c.replace('\\`', '`')
def _render_visible(c):
    inc = False; v = []
    for l in _runtime(c).split('\n'):
        if l.startswith('```'): inc = not inc; continue
        if inc: continue
        v.append(l)
    return '\n'.join(v)

LEAK_VIS = re.compile(r'"@type"|"acceptedAnswer"|application/ld\+json|<script|(JSON-?LD\s*)?FAQ(Page)?\s*(JSON-?LD\s*)?Schema|Word count\s*[:\(]|Internal Links Placed|VERIFICATION\s*(&|AND)\s*(LEARNING|REPORT|OUTPUT)', re.I)

def cmd_apply(write: bool):
    text = open(PAGE).read()
    spans = _iter_posts(text)
    changed = 0; still = []
    edits = []
    for slug, (a, b) in spans.items():
        chunk = text[a:b]
        m = re.search(r"(content:\s*`)(.*?)(`,\n)", chunk, re.DOTALL)
        if not m: continue
        inner = m.group(2)
        new = sanitise(inner, escaped=True)
        if new != inner:
            edits.append((a + m.start(2), a + m.end(2), new, slug))
        # verify post-clean render-sim
        if LEAK_VIS.search(_render_visible(new)):
            still.append(slug)
    for st, en, new, slug in sorted(edits, key=lambda e: e[0], reverse=True):
        text = text[:st] + new + text[en:]
    changed = len(edits)
    if write:
        open(PAGE, 'w').write(text)
    print(f"{'APPLIED' if write else 'DRY-RUN'}: {changed} posts sanitised")
    print(f"post-clean render-sim leaks remaining: {len(still)} {still[:8]}")
    return 1 if still else 0

def cmd_test():
    leak = ('```markdown\n# Title\n## FAQ\n### Q: How?\nBecause.\n## JSON-LD FAQ Schema\n'
            '```json\n{"@type":"FAQPage"}\n```\n<script type="application/ld+json">{"@type":"FAQPage"}</script>\n'
            '**Internal links used:**\n- [a](/a)\n- [b](/b)\n\n**Word count (body): 900 words**\n```')
    out = sanitise(leak, escaped=False)
    bad = [t for t in ['```json', '```markdown', '<script', 'JSON-LD FAQ Schema', 'Internal links used',
                       'Word count', '"@type"'] if t in out]
    keep = ('```markdown\n# Real\n```bash\nsudo x\n```\n## FAQ\n### Q: Why?\nReason.')
    out2 = sanitise(keep, escaped=False)
    bash_kept = '```bash' in out2 and 'sudo x' in out2
    faq_kept = '### Q: Why?' in out2 and 'Reason.' in out2
    ok = not bad and bash_kept and faq_kept
    print(f"positive control — banned removed: {'CLEAN' if not bad else 'LEFTOVER:'+str(bad)}")
    print(f"negative control — ```bash kept: {bash_kept}, FAQ kept: {faq_kept}")
    print("PASS §sanitiser" if ok else "FAIL §sanitiser")
    return 0 if ok else 1

if __name__ == '__main__':
    if '--test' in sys.argv: sys.exit(cmd_test())
    if '--apply' in sys.argv: sys.exit(cmd_apply(write=True))
    if '--dry-run' in sys.argv: sys.exit(cmd_apply(write=False))
    print(__doc__); sys.exit(2)
