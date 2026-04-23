#!/usr/bin/env python3
# Incident: ZAS-WEB-INC-20260423-1535 | §290 banned-content + blog-page-wording-repair skill
# Strips trailing evaluator scaffolding and FAQ Schema JSON-LD code-fence dumps
# from every post's `content:` template literal in src/app/blog/[slug]/page.tsx.
import argparse
import pathlib
import re
import sys

FILE = pathlib.Path('src/app/blog/[slug]/page.tsx')

CONTENT_END = r'(?=`,\s*\n\s*\},)'

FAQ_SCHEMA_RE = re.compile(
    r'\n+(?:---\s*\n+)?## FAQ Schema \(JSON-LD\)\s*\n+\\`\\`\\`json\n[\s\S]*?\\`\\`\\`'
    + CONTENT_END
)

SCAFFOLDING_RE = re.compile(
    r'\n+(?:---\s*\n+)?'
    r'(?:## (?:LEARNED|BETTER|WHAT BETTER|WHY|WHY SUCCESS|REPLICATE):'
    r'|\*\*(?:LEARNED|BETTER|WHAT BETTER|WHY|WHY SUCCESS|REPLICATE):\*\*)'
    r'[\s\S]*?'
    + CONTENT_END
)

MARKER_COUNT_RE = re.compile(
    r'\*\*(?:LEARNED|BETTER|WHY|WHY SUCCESS|WHAT BETTER|REPLICATE):\*\*'
    r'|^## (?:LEARNED|BETTER|WHY|WHY SUCCESS|WHAT BETTER|REPLICATE):'
    r'|^## FAQ Schema \(JSON-LD\)',
    re.MULTILINE,
)


def summarise(label: str, src: str) -> int:
    hits = len(MARKER_COUNT_RE.findall(src))
    print(f'{label}: {hits} marker lines')
    return hits


def line_of(src: str, offset: int) -> int:
    return src.count('\n', 0, offset) + 1


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument('--apply', action='store_true', help='Write changes to disk')
    args = parser.parse_args()

    src = FILE.read_text()
    before = summarise('BEFORE', src)

    faq_hits = list(FAQ_SCHEMA_RE.finditer(src))
    print(f'FAQ Schema code-fence dumps: {len(faq_hits)}')
    for m in faq_hits:
        print(f'  - line {line_of(src, m.start())}..{line_of(src, m.end())}')

    new_src = FAQ_SCHEMA_RE.sub('', src)

    scaffold_hits = list(SCAFFOLDING_RE.finditer(new_src))
    print(f'Trailing scaffolding blocks: {len(scaffold_hits)}')
    for m in scaffold_hits[:5]:
        print(f'  - line {line_of(new_src, m.start())}..{line_of(new_src, m.end())}')
    if len(scaffold_hits) > 5:
        print(f'  ... +{len(scaffold_hits) - 5} more')

    new_src = SCAFFOLDING_RE.sub('', new_src)

    after = summarise('AFTER ', new_src)
    delta = before - after
    print(f'Marker lines removed: {delta}')

    if not args.apply:
        print('DRY RUN — no changes written. Re-run with --apply to persist.')
        return 0

    if new_src == src:
        print('No changes needed.')
        return 0

    FILE.write_text(new_src)
    print(f'Wrote {FILE} ({len(src)} -> {len(new_src)} bytes)')
    return 0


if __name__ == '__main__':
    sys.exit(main())
