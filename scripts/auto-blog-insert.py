#!/usr/bin/env python3
"""
auto-blog-insert.py — ZA Support Overnight Blog Auto-Inserter
Reads Haiku-generated markdown drafts from ~/Desktop/Claude/Blog/
Inserts them into blog/[slug]/page.tsx posts map + sitemap + faqSchemas.
Runs after blog_research_draft task in overnight batch.
Cost: $0.00 (no API calls — pure file manipulation).
"""

import os
import re
import sys
import subprocess
import json
from pathlib import Path
from datetime import date

WEBSITE_DIR = Path(__file__).parent.parent
BLOG_PAGE = WEBSITE_DIR / "src" / "app" / "blog" / "[slug]" / "page.tsx"
SITEMAP = WEBSITE_DIR / "src" / "app" / "sitemap.ts"
BLOG_DRAFTS_DIR = Path.home() / "Desktop" / "Claude" / "Blog"
INSERTED_LOG = BLOG_DRAFTS_DIR / ".inserted.json"

TODAY = date.today().strftime("%d %B %Y")
TODAY_SLUG = date.today().strftime("%d%m%Y")


def load_inserted() -> set:
    if INSERTED_LOG.exists():
        return set(json.loads(INSERTED_LOG.read_text()))
    return set()


def save_inserted(slugs: set):
    INSERTED_LOG.write_text(json.dumps(list(slugs), indent=2))


def slug_from_filename(fname: str) -> str:
    """draft-macbook-wont-charge-johannesburg-22032026.md → macbook-wont-charge-johannesburg"""
    name = fname.replace("draft-", "").replace(f"-{TODAY_SLUG}", "").replace(".md", "")
    return name


def extract_title(content: str) -> str:
    """Extract H1 title from markdown."""
    m = re.search(r'^#\s+(.+)$', content, re.MULTILINE)
    return m.group(1).strip() if m else "Untitled"


def extract_excerpt(content: str) -> str:
    """Extract first non-heading paragraph as excerpt."""
    lines = content.split('\n')
    for line in lines:
        line = line.strip()
        if line and not line.startswith('#') and not line.startswith('```') and len(line) > 40:
            return line[:200].rstrip('.')+'.'
    return "ZA Support Apple repair specialists in Hyde Park, Johannesburg."


def extract_faqs_from_content(content: str) -> list[dict]:
    """
    Extract FAQ JSON-LD block from blog post content if present.
    Falls back to generating 3 generic FAQs from the slug topic.
    """
    # Try to find JSON-LD FAQ block in the markdown
    faq_match = re.search(r'```(?:json)?\s*(\{[^`]*"@type"\s*:\s*"FAQPage"[^`]*\})\s*```', content, re.DOTALL)
    if faq_match:
        try:
            schema = json.loads(faq_match.group(1))
            entities = schema.get("mainEntity", [])
            return [
                {
                    "question": e.get("name", ""),
                    "answer": e.get("acceptedAnswer", {}).get("text", ""),
                }
                for e in entities[:6]
                if e.get("name")
            ]
        except json.JSONDecodeError:
            pass

    # Extract Q&A pairs from ### headings followed by paragraph text
    faqs = []
    lines = content.split('\n')
    i = 0
    while i < len(lines) and len(faqs) < 6:
        line = lines[i].strip()
        if line.startswith('###') and '?' in line:
            q = line.lstrip('#').strip()
            # Collect answer (next non-empty lines until next heading)
            answer_lines = []
            i += 1
            while i < len(lines):
                l = lines[i].strip()
                if l.startswith('#') or l.startswith('---'):
                    break
                if l:
                    answer_lines.append(l)
                i += 1
            if answer_lines:
                faqs.append({"question": q, "answer": " ".join(answer_lines[:3])})
            continue
        i += 1

    return faqs[:6] if faqs else []


def escape_ts(text: str) -> str:
    """Escape text for TypeScript template literal."""
    return text.replace('\\', '\\\\').replace('`', '\\`').replace('${', '\\${')


def read_time(content: str) -> str:
    words = len(content.split())
    mins = max(4, words // 200)
    return f"{mins} min read"


def category_from_slug(slug: str) -> str:
    """Infer category from slug."""
    if any(k in slug for k in ['cost', 'price', 'how-much']):
        return 'Pricing'
    if any(k in slug for k in ['how-to', 'check', 'guide']):
        return 'How-To'
    if any(k in slug for k in ['repair', 'logic-board', 'screen', 'battery']):
        return 'Repairs'
    if any(k in slug for k in ['wont', 'not-working', 'disconnecting', 'overheating', 'symptoms']):
        return 'Troubleshooting'
    return 'Repairs'


def build_post_entry(slug: str, content: str) -> str:
    title = escape_ts(extract_title(content))
    excerpt = escape_ts(extract_excerpt(content))
    rt = read_time(content)
    cat = category_from_slug(slug)
    body = escape_ts(content)

    return f"""  '{slug}': {{
    slug: '{slug}',
    title: `{title}`,
    excerpt: `{excerpt}`,
    date: '{TODAY}',
    category: '{cat}',
    readTime: '{rt}',
    author: 'ZA Support',
    content: `{body}`,
  }},"""


def build_faq_schema_entry(slug: str, faqs: list[dict]) -> str:
    if not faqs:
        return ""

    entities = []
    for faq in faqs:
        q = escape_ts(faq["question"])
        a = escape_ts(faq["answer"])
        entities.append(
            f"      {{ '@type': 'Question', name: `{q}`, acceptedAnswer: {{ '@type': 'Answer', text: `{a}` }} }},"
        )

    entities_str = "\n".join(entities)
    return f"""  '{slug}': {{
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
{entities_str}
    ],
  }},"""


def insert_into_blog_page(slug: str, post_entry: str, faq_entry: str) -> bool:
    """Insert post entry and FAQ schema into blog/[slug]/page.tsx."""
    content = BLOG_PAGE.read_text()

    # Check if already inserted
    if f"'{slug}':" in content:
        print(f"  SKIP: '{slug}' already in blog page")
        return False

    # Insert post into POSTS object
    posts_marker = "// END_POSTS"
    if posts_marker not in content:
        # Fallback: find the closing }; of the const posts = { ... }; block.
        # The block ends with "};\n\nexport async function generateStaticParams"
        posts_close = "\n};\n\nexport async function generateStaticParams"
        if posts_close not in content:
            # Last-resort: insert before generateStaticParams
            posts_close_alt = "\nexport async function generateStaticParams"
            if posts_close_alt not in content:
                print(f"  ERROR: cannot find posts insertion point for {slug}")
                return False
            content = content.replace(
                posts_close_alt,
                f"\n{post_entry}\n}};\n\nexport async function generateStaticParams"
            )
        else:
            content = content.replace(
                posts_close,
                f"\n{post_entry}{posts_close}"
            )
    else:
        content = content.replace(
            posts_marker,
            f"{post_entry}\n  {posts_marker}"
        )

    # Insert FAQ schema if present
    if faq_entry:
        faq_marker = "// END_FAQ_SCHEMAS"
        if faq_marker not in content:
            # Fallback: find faqSchemas closing }; before export default
            import re as _re
            # Find the faqSchemas block end — look for last entry in it
            faq_close = "\n  };\n\n  if (faqSchemas"
            if faq_close in content:
                content = content.replace(
                    faq_close,
                    f"\n{faq_entry}{faq_close}"
                )
            else:
                faq_marker_alt = "} as Record<string, object>"
                if faq_marker_alt in content:
                    content = content.replace(
                        faq_marker_alt,
                        f"{faq_entry}\n{faq_marker_alt}"
                    )
        else:
            content = content.replace(
                faq_marker,
                f"{faq_entry}\n  {faq_marker}"
            )

    BLOG_PAGE.write_text(content)
    return True


def insert_sitemap_entry(slug: str):
    content = SITEMAP.read_text()
    entry = f"    {{ url: `${{base}}/blog/{slug}`, lastModified: now, changeFrequency: 'yearly', priority: 0.7 }},"

    if f"/blog/{slug}" in content:
        return  # Already in sitemap

    marker = "  ];\n}"
    if marker in content:
        content = content.replace(marker, f"    {entry}\n{marker}")
        SITEMAP.write_text(content)


def main():
    if not BLOG_DRAFTS_DIR.exists():
        print(f"Blog drafts dir not found: {BLOG_DRAFTS_DIR}")
        return 0

    drafts = list(BLOG_DRAFTS_DIR.glob(f"draft-*-{TODAY_SLUG}.md"))
    if not drafts:
        # Also check for any uninserted drafts from recent days
        drafts = list(BLOG_DRAFTS_DIR.glob("draft-*.md"))

    if not drafts:
        print("No blog drafts found to insert.")
        return 0

    inserted = load_inserted()
    newly_inserted = []

    print(f"Found {len(drafts)} drafts. Already inserted: {len(inserted)}")
    print("=" * 60)

    for draft_path in sorted(drafts):
        slug = slug_from_filename(draft_path.name)

        if slug in inserted:
            print(f"  SKIP (already inserted): {slug}")
            continue

        content = draft_path.read_text()
        if len(content.split()) < 200:
            print(f"  SKIP (too short): {slug} ({len(content.split())} words)")
            continue

        print(f"  Processing: {slug}")
        faqs = extract_faqs_from_content(content)
        post_entry = build_post_entry(slug, content)
        faq_entry = build_faq_schema_entry(slug, faqs) if faqs else ""

        success = insert_into_blog_page(slug, post_entry, faq_entry)
        if success:
            insert_sitemap_entry(slug)
            newly_inserted.append(slug)
            inserted.add(slug)
            print(f"  ✅ Inserted: {slug} ({len(faqs)} FAQs)")
        else:
            print(f"  ⚠️  Skipped: {slug}")

    if not newly_inserted:
        print("No new posts inserted.")
        return 0

    # Build BEFORE saving inserted.json — if build fails, slugs stay untracked for retry
    print(f"\nBuilding ({len(newly_inserted)} new posts)...")
    result = subprocess.run(
        ["npm", "run", "build"],
        cwd=WEBSITE_DIR,
        capture_output=True,
        text=True,
    )
    if result.returncode != 0:
        print(f"BUILD FAILED:\n{result.stderr[-2000:]}")
        # Revert blog files so next run can retry cleanly
        subprocess.run(
            ["git", "checkout", "HEAD", "--", "src/app/blog/[slug]/page.tsx", "src/app/sitemap.ts"],
            cwd=WEBSITE_DIR,
        )
        print("Reverted page.tsx + sitemap.ts — slugs NOT marked inserted, will retry next run")
        return 1
    print("Build: OK")

    subprocess.run(
        ["git", "add", "--", "src/app/blog/", "src/app/sitemap.ts", "scripts/"],
        cwd=WEBSITE_DIR, check=True,
    )
    msg = f"feat: {len(newly_inserted)} blog posts auto-inserted (overnight Haiku batch)"
    subprocess.run(["git", "commit", "-m", msg], cwd=WEBSITE_DIR, check=True)
    push_result = subprocess.run(
        ["git", "push", "origin", "main"], cwd=WEBSITE_DIR, capture_output=True, text=True,
    )
    if push_result.returncode != 0:
        print(f"PUSH FAILED:\n{push_result.stderr[-1000:]}")
        return 1

    # Only save inserted.json AFTER successful build + push
    save_inserted(inserted)
    print(f"Committed + pushed: {', '.join(newly_inserted)}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
