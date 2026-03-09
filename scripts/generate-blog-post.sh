#!/bin/bash
# Automated blog post generator using Claude API
# Usage: bash scripts/generate-blog-post.sh "What to do when your MacBook gets wet"
# Output: creates a markdown file ready for Sanity CMS

TOPIC="${1:-MacBook liquid damage repair Johannesburg}"
DATE=$(date '+%Y-%m-%d')
SLUG=$(echo "$TOPIC" | tr '[:upper:]' '[:lower:]' | sed 's/ /-/g' | sed 's/[^a-z0-9-]//g')
OUTPUT="content/blog/${DATE}-${SLUG}.md"

mkdir -p content/blog

echo "=== Generating blog post: $TOPIC ==="

python3 << PYEOF
import os, json, urllib.request, urllib.error, ssl

API_KEY = os.environ.get("ANTHROPIC_API_KEY", "")
if not API_KEY:
    print("Error: ANTHROPIC_API_KEY not set. Run: export ANTHROPIC_API_KEY=your-key")
    exit(1)
TOPIC = "${TOPIC}"
DATE = "${DATE}"
SLUG = "${SLUG}"
OUTPUT = "${OUTPUT}"

SYSTEM = """You are the content writer for ZA Support, Johannesburg's Apple specialist repair shop.
Write SEO-optimised blog posts for zasupport.com.

RULES:
- Currency: R 2,500 (space, ZAR, never USD)
- Phone: 064 529 5863 (always)
- Location: Hyde Park, Johannesburg
- Address: 1 Hyde Lane, Hyde Park, Johannesburg
- Date format: DD/MM/YYYY
- No US references, no HIPAA
- Tone: expert, trustworthy, helpful — Apple repair specialist
- Every post links to relevant service pages
- Minimum 1,200 words
- Include FAQ section with 5 questions
- Include clear H2 structure
- End with CTA linking to /contact or the relevant service page"""

PROMPT = f"""Write a complete SEO-optimised blog post for ZA Support on this topic:

TOPIC: {TOPIC}

Required format:
---
title: [SEO title with keyword + "Johannesburg" or "South Africa"]
description: [150-160 char meta description with keyword + CTA]
date: {DATE}
author: Courtney Bentley
category: [Apple Repair / MacBook Repair / iPhone Repair / Enterprise IT]
tags: [comma-separated relevant tags]
internal_links:
  - [relevant service page URLs on zasupport.com]
---

[Full blog post content — minimum 1,200 words]
[Must include: H2 headings, FAQ section with 5 Q&As, CTA at the end]"""

payload = json.dumps({
    "model": "claude-sonnet-4-6",
    "max_tokens": 4000,
    "messages": [{"role": "user", "content": PROMPT}],
    "system": SYSTEM
}).encode()

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

req = urllib.request.Request(
    "https://api.anthropic.com/v1/messages",
    data=payload,
    headers={
        "x-api-key": API_KEY,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json"
    }
)

try:
    with urllib.request.urlopen(req, context=ctx) as r:
        result = json.loads(r.read())
        content = result["content"][0]["text"]

        with open(OUTPUT, "w") as f:
            f.write(content)

        print(f"✓ Blog post written: {OUTPUT}")
        print(f"✓ Word count: ~{len(content.split())}")
except Exception as e:
    print(f"Error: {e}")
PYEOF

echo ""
echo "✓ Done. Upload to Sanity CMS at: https://zasupport.sanity.studio"
