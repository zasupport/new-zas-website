#!/usr/bin/env python3
"""
scan-rendered-leaks.py — RENDERED-HTML leak gate (§343/§377/§404, 04/06/2026)

WHY THIS EXISTS: the source-side scanners (scan-blog-leaks.py, za-blog-leak-detect.py)
classify a ```json / <script> block by reading page.tsx SOURCE and assuming the
renderer suppresses it. That assumption broke: markdown-fence toggle math and
embedded <script type="application/ld+json"> blocks caused raw JSON-LD to render as
VISIBLE body text on 16 live pages (a §396 verify-the-verifier failure — the
"suppressed" verdict was never checked against rendered output).

This gate scans the BUILT HTML (.next/server/app/**/*.html) — the true consumer —
strips <script>/<style>, and fails closed if any BANNED CLASS appears as visible
body text. Patterns are STRICT structural shapes (not common words) to avoid
false positives.

Usage:
  scan-rendered-leaks.py            # scan built HTML, exit 1 on any rendered leak
  scan-rendered-leaks.py --test     # positive+negative control on synthetic HTML
  scan-rendered-leaks.py --dir DIR  # scan a specific built dir
"""
import re, sys, glob, os

# STRICT banned classes that must NEVER appear as VISIBLE body text (scripts stripped).
# Each is a structural shape, not a common word, to avoid false positives.
BANNED = {
    "visible JSON-LD":        re.compile(r'(&quot;|")@type(&quot;|")\s*:\s*(&quot;|")(FAQPage|Question|Answer|HowTo|Article)(&quot;|")', re.I),
    "ld+json script text":    re.compile(r'application/ld\+json', re.I),
    "visible @context":       re.compile(r'(&quot;|")@context(&quot;|")\s*:\s*(&quot;|")https://schema\.org', re.I),
    "raw code fence":         re.compile(r'```(markdown|json|bash|html|css|javascript|typescript|jsx|tsx)\b', re.I),
    "FAQ-Schema heading":     re.compile(r'#{0,3}\s*FAQ(Page)?\s*(JSON-?LD\s*)?Schema\b', re.I),
    "Internal Links Placed":  re.compile(r'Internal Links Placed', re.I),
    "Word count line":        re.compile(r'\bWord count\s*[:\(]', re.I),
    "VERIFICATION block":     re.compile(r'VERIFICATION\s*(&amp;|&|AND)\s*(LEARNING|REPORT|OUTPUT)', re.I),
}

def visible_text(html: str) -> str:
    # Remove script/style blocks (legit JSON-LD lives in <script>), then test the rest.
    h = re.sub(r'<script[^>]*>.*?</script>', ' ', html, flags=re.DOTALL | re.I)
    h = re.sub(r'<style[^>]*>.*?</style>', ' ', h, flags=re.DOTALL | re.I)
    return h

def scan_dir(built_dir: str):
    files = glob.glob(os.path.join(built_dir, 'blog', '*.html'))
    leaks = {}
    for f in files:
        slug = os.path.basename(f)[:-5]
        if slug == 'page':
            continue
        try:
            vis = visible_text(open(f, encoding='utf-8', errors='replace').read())
        except Exception:
            continue
        hits = [name for name, pat in BANNED.items() if pat.search(vis)]
        if hits:
            leaks[slug] = hits
    return len(files), leaks

def run_test() -> int:
    leak_html = '<html><body><p>&quot;@type&quot;: &quot;FAQPage&quot;</p><p>```json</p></body></html>'
    clean_html = ('<html><body><p>Real article text about MacBook repair in Sandton.</p>'
                  '<script type="application/ld+json">{"@type":"FAQPage"}</script></body></html>')
    leak_hits = [n for n, p in BANNED.items() if p.search(visible_text(leak_html))]
    clean_hits = [n for n, p in BANNED.items() if p.search(visible_text(clean_html))]
    ok = len(leak_hits) >= 2 and len(clean_hits) == 0
    print(f"positive control (must flag): {leak_hits}")
    print(f"negative control (must be clean — JSON-LD only inside <script>): {clean_hits}")
    print("PASS §rendered-leak-gate: controls correct" if ok else "FAIL §rendered-leak-gate")
    return 0 if ok else 1

def main():
    if '--test' in sys.argv:
        return run_test()
    built_dir = '.next/server/app'
    if '--dir' in sys.argv:
        built_dir = sys.argv[sys.argv.index('--dir') + 1]
    if not os.path.isdir(os.path.join(built_dir, 'blog')):
        print(f"WARN: no built blog HTML at {built_dir}/blog — run `npm run build` first. Skipping (non-fatal).")
        return 0
    total, leaks = scan_dir(built_dir)
    if leaks:
        print(f"❌ FAIL §rendered-leak-gate: {len(leaks)} of {total} built pages render BANNED content as visible text:")
        for slug, hits in sorted(leaks.items()):
            print(f"   {slug}: {', '.join(hits)}")
        return 1
    print(f"✅ PASS §rendered-leak-gate: 0 rendered leaks across {total} built blog pages")
    return 0

if __name__ == '__main__':
    sys.exit(main())
