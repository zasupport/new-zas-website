#!/usr/bin/env python3
# Incident: ZAS-WEB-INC-20260423-1535 | pre-deploy gate for §290/§227 blog content integrity
# Scans src/app/blog/[slug]/page.tsx for evaluator scaffolding, FAQ Schema code-fence dumps,
# and other banned artefacts. Exit 0 on clean, 1 on leak.
import pathlib
import re
import sys

FILE = pathlib.Path('src/app/blog/[slug]/page.tsx')

SCAFFOLDING_RE = re.compile(
    r'\*\*(?:WHAT\s+)?(?:LEARNED|BETTER|WHY|WHY\s+SUCCESS|WHAT\s+BETTER|REPLICATE)\s*:\*\*'
    r'|^\#{2,4}\s+(?:WHAT\s+)?(?:LEARNED|BETTER|WHY|WHY\s+SUCCESS|WHAT\s+BETTER|REPLICATE)\s*:'
    r'|^\#{2,4}\s+LEARNING\s+BLOCK'
    r'|^## FAQ Schema \(JSON-LD\)'
    r'|^(?:LEARNED|BETTER|REPLICATE|WHY\s+SUCCESS|WHY|WHAT\s+BETTER|WHAT\s+LEARNED)\s*:\s*[\[\w]',
    re.MULTILINE | re.IGNORECASE,
)


def main() -> int:
    if not FILE.exists():
        print(f'ERROR: {FILE} not found', file=sys.stderr)
        return 2
    src = FILE.read_text()
    hits = list(SCAFFOLDING_RE.finditer(src))
    if not hits:
        print('PASS: 0 blog-leak markers in page.tsx')
        return 0
    print(f'FAIL: {len(hits)} blog-leak markers in {FILE}')
    for m in hits[:10]:
        line = src.count('\n', 0, m.start()) + 1
        print(f'  - line {line}: {m.group(0)[:80]}')
    if len(hits) > 10:
        print(f'  ... +{len(hits) - 10} more')
    return 1


if __name__ == '__main__':
    sys.exit(main())
