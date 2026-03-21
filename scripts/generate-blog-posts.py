#!/usr/bin/env python3
"""
ZA Support — Blog Post Generator
Uses claude-haiku-4-5 to generate 20 new blog posts targeting uncovered keywords.
Cost: ~$0.30 total. Run overnight.
"""

import anthropic
import json
import os
import re
import time
from datetime import date

client = anthropic.Anthropic()

POSTS = [
    {
        "slug": "macbook-wont-charge-johannesburg",
        "title": "MacBook Won't Charge? What To Do in Johannesburg",
        "excerpt": "MacBook plugged in but not charging? Here are the most common causes and what to check before spending money on a repair.",
        "category": "Troubleshooting",
        "keywords": ["MacBook not charging Johannesburg", "MacBook charger not working", "MacBook charging port repair"],
    },
    {
        "slug": "macbook-overheating-fix-johannesburg",
        "title": "MacBook Overheating: Causes, Fixes, and When To Get Help",
        "excerpt": "A MacBook that runs hot under normal use is telling you something. Here is how to diagnose overheating and when to bring it in.",
        "category": "Troubleshooting",
        "keywords": ["MacBook overheating Johannesburg", "MacBook fan running loud", "MacBook thermal paste replacement"],
    },
    {
        "slug": "macbook-keyboard-not-working",
        "title": "MacBook Keyboard Not Working? Common Fixes for Johannesburg Users",
        "excerpt": "Keys sticking, not registering, or entire keyboard unresponsive? Here is what causes MacBook keyboard failures and how they are fixed.",
        "category": "Repairs",
        "keywords": ["MacBook keyboard repair Johannesburg", "MacBook keys not working", "MacBook butterfly keyboard fix"],
    },
    {
        "slug": "iphone-screen-repair-cost-johannesburg-2026",
        "title": "iPhone Screen Repair Cost in Johannesburg — 2026 Price Guide",
        "excerpt": "How much does iPhone screen repair cost in Johannesburg in 2026? We break down pricing by model and explain what affects the final price.",
        "category": "Pricing",
        "keywords": ["iPhone screen repair cost Johannesburg", "iPhone screen replacement price", "cracked iPhone screen repair"],
    },
    {
        "slug": "mac-data-recovery-johannesburg",
        "title": "Mac Data Recovery in Johannesburg — What You Need to Know",
        "excerpt": "Deleted files, failed SSD, or a dead MacBook? Here is how Mac data recovery works and what affects whether your data can be saved.",
        "category": "Data Recovery",
        "keywords": ["Mac data recovery Johannesburg", "MacBook data recovery", "deleted files Mac recovery"],
    },
    {
        "slug": "macbook-pro-m1-m2-repair-johannesburg",
        "title": "MacBook Pro M1 and M2 Repair in Johannesburg — What You Need to Know",
        "excerpt": "Apple Silicon MacBook Pro repair is different to Intel-era repairs. Here is what to know before bringing your M1 or M2 MacBook Pro in for service.",
        "category": "Repairs",
        "keywords": ["MacBook Pro M1 repair Johannesburg", "MacBook Pro M2 repair Johannesburg", "Apple Silicon repair"],
    },
    {
        "slug": "macbook-trackpad-not-clicking",
        "title": "MacBook Trackpad Not Clicking or Stuck? Here Is Why",
        "excerpt": "MacBook trackpad not responding to clicks, clicking everywhere, or physically stuck? These are the most common causes and fixes.",
        "category": "Troubleshooting",
        "keywords": ["MacBook trackpad not clicking", "MacBook trackpad stuck", "MacBook trackpad repair Johannesburg"],
    },
    {
        "slug": "apple-watch-screen-repair-johannesburg",
        "title": "Apple Watch Screen Repair in Johannesburg — Cost and Options",
        "excerpt": "Cracked Apple Watch screen? Here is what your options are in Johannesburg and what affects the cost of Apple Watch screen repair.",
        "category": "Repairs",
        "keywords": ["Apple Watch screen repair Johannesburg", "cracked Apple Watch screen", "Apple Watch repair cost"],
    },
    {
        "slug": "ipad-screen-repair-johannesburg-2026",
        "title": "iPad Screen Repair in Johannesburg — 2026 Guide",
        "excerpt": "Cracked iPad screen? Here is what screen repair costs in Johannesburg in 2026, which iPads are most repairable, and what to expect.",
        "category": "Repairs",
        "keywords": ["iPad screen repair Johannesburg", "cracked iPad screen repair", "iPad Pro screen replacement"],
    },
    {
        "slug": "mac-mini-repair-johannesburg",
        "title": "Mac Mini Repair in Johannesburg — RAM, SSD, and Logic Board",
        "excerpt": "Mac Mini not turning on, running slow, or showing no display? Here is what Mac Mini repairs involve and what can be upgraded.",
        "category": "Repairs",
        "keywords": ["Mac Mini repair Johannesburg", "Mac Mini not turning on", "Mac Mini RAM upgrade Johannesburg"],
    },
    {
        "slug": "how-to-check-macbook-battery-health",
        "title": "How to Check Your MacBook Battery Health (And What the Numbers Mean)",
        "excerpt": "macOS tells you your battery health — but what do cycle count and condition actually mean? Here is a plain-language guide.",
        "category": "How-To",
        "keywords": ["MacBook battery health check", "MacBook cycle count", "MacBook battery replacement when"],
    },
    {
        "slug": "macbook-black-screen-on-startup",
        "title": "MacBook Black Screen on Startup — Causes and Fixes",
        "excerpt": "MacBook powers on but the screen stays black? This guide covers the most common causes from display failures to logic board faults.",
        "category": "Troubleshooting",
        "keywords": ["MacBook black screen on startup", "MacBook screen not turning on", "MacBook display failure"],
    },
    {
        "slug": "liquid-damage-macbook-johannesburg-cost",
        "title": "How Much Does MacBook Liquid Damage Repair Cost in Johannesburg?",
        "excerpt": "Spilled something on your MacBook? Here is an honest guide to liquid damage repair costs in Johannesburg and what factors affect the price.",
        "category": "Pricing",
        "keywords": ["MacBook liquid damage repair cost Johannesburg", "spilled water MacBook repair price", "MacBook liquid damage assessment"],
    },
    {
        "slug": "when-to-replace-vs-repair-macbook",
        "title": "MacBook Repair vs Replace — How to Make the Right Decision",
        "excerpt": "Should you repair your MacBook or buy a new one? Here is a practical framework for making that decision based on repair cost, age, and performance.",
        "category": "Advice",
        "keywords": ["MacBook repair or replace", "is it worth repairing MacBook", "MacBook repair cost vs new Mac"],
    },
    {
        "slug": "macbook-ssd-upgrade-johannesburg",
        "title": "MacBook SSD Upgrade in Johannesburg — Speed Up Your Mac Without Buying New",
        "excerpt": "An SSD upgrade is the most effective way to speed up an older MacBook. Here is how it works, which models are upgradeable, and what it costs.",
        "category": "Upgrades",
        "keywords": ["MacBook SSD upgrade Johannesburg", "MacBook storage upgrade", "how to speed up MacBook SSD"],
    },
    {
        "slug": "imac-repair-johannesburg",
        "title": "iMac Repair in Johannesburg — Screen, RAM, SSD, and Logic Board",
        "excerpt": "iMac not turning on, slow, or showing a distorted display? Here is what iMac repairs involve and what is worth fixing vs replacing.",
        "category": "Repairs",
        "keywords": ["iMac repair Johannesburg", "iMac screen repair Johannesburg", "iMac logic board repair"],
    },
    {
        "slug": "macbook-speaker-not-working",
        "title": "MacBook Speaker Not Working? Here Is What to Check",
        "excerpt": "No sound from your MacBook speakers? Before paying for a repair, here are the software and hardware checks worth running first.",
        "category": "Troubleshooting",
        "keywords": ["MacBook speaker not working", "MacBook no sound", "MacBook audio repair Johannesburg"],
    },
    {
        "slug": "airpods-repair-johannesburg",
        "title": "AirPods Repair in Johannesburg — What Can Actually Be Fixed",
        "excerpt": "AirPods battery dead, one side not working, or sound quality degraded? Here is what AirPods repairs are possible and what it costs in Johannesburg.",
        "category": "Repairs",
        "keywords": ["AirPods repair Johannesburg", "AirPods battery replacement Johannesburg", "AirPods one side not working"],
    },
    {
        "slug": "macbook-wifi-keeps-disconnecting",
        "title": "MacBook Wi-Fi Keeps Disconnecting — How to Fix It",
        "excerpt": "MacBook dropping Wi-Fi connection regularly? Here are the common causes from software settings to failed Wi-Fi cards, and how to fix each one.",
        "category": "Troubleshooting",
        "keywords": ["MacBook WiFi keeps disconnecting", "MacBook WiFi repair Johannesburg", "MacBook wireless card repair"],
    },
    {
        "slug": "macbook-logic-board-symptoms-johannesburg",
        "title": "MacBook Logic Board Failure — 8 Warning Signs You Should Not Ignore",
        "excerpt": "Logic board failure is the most serious MacBook fault. These are the warning signs that suggest your MacBook logic board is failing.",
        "category": "Troubleshooting",
        "keywords": ["MacBook logic board failure symptoms", "MacBook logic board repair Johannesburg", "MacBook not turning on logic board"],
    },
]

BLOG_POST_SYSTEM = """You are writing blog posts for ZA Support, an Apple repair specialist in Hyde Park, Johannesburg, South Africa.

Style guidelines:
- UK English throughout
- Professional but approachable tone — written for Mac users, not technicians
- Practical and honest — tell readers what they need to know, including when they should come in vs fix themselves
- No em dashes — use commas or separate sentences instead
- No bullet points with hyphens — use numbered lists or flowing prose
- Short paragraphs (2-4 sentences max)
- Include ZA Support naturally where relevant (do not force it)
- ZA Support contact: WhatsApp 064 529 5863 | Location: Hyde Park, Johannesburg | Collection service available
- Prices in Rands (R)
- Assessment fee: from R599

Format the blog post as markdown with:
- ## for H2 subheadings
- ### for H3 subheadings
- Bold for important terms
- Natural internal links to related ZA Support pages where appropriate

Length: 600-900 words of body content (not including title)."""

def generate_post(post_meta: dict) -> str:
    """Generate a single blog post using claude-haiku-4-5."""
    prompt = f"""Write a blog post for ZA Support with the following details:

Title: {post_meta['title']}
Target keywords: {', '.join(post_meta['keywords'])}
Excerpt/angle: {post_meta['excerpt']}
Category: {post_meta['category']}

Write the full blog post body (not the title — just the content). Start directly with the first paragraph.

Include:
1. An opening paragraph that addresses the reader's problem directly
2. 3-5 H2 sections covering the main aspects of the topic
3. Practical advice throughout
4. A closing section that naturally mentions ZA Support as a resource for Johannesburg readers
5. At least one mention of the collection service (we collect from Sandton, Rosebank, Fourways, Bryanston, Midrand, Randburg)

Do not use em dashes. Do not use hyphens as bullet points."""

    message = client.messages.create(
        model="claude-haiku-4-5-20251001",
        max_tokens=1500,
        system=BLOG_POST_SYSTEM,
        messages=[{"role": "user", "content": prompt}],
    )
    return message.content[0].text


def slugify_for_ts(text: str) -> str:
    """Make text safe for TypeScript string literal."""
    return text.replace("'", "\\'").replace("`", "\\`")


def build_ts_entry(meta: dict, content: str) -> str:
    """Build a TypeScript post object."""
    today = date.today().strftime("%d %B %Y")
    read_time = f"{max(4, len(content.split()) // 200)} min read"
    content_escaped = content.replace("\\", "\\\\").replace("`", "\\`").replace("${", "\\${")

    return f"""  '{meta['slug']}': {{
    slug: '{meta['slug']}',
    title: `{meta['title']}`,
    excerpt: `{meta['excerpt']}`,
    date: '{today}',
    category: '{meta['category']}',
    readTime: '{read_time}',
    author: 'ZA Support',
    content: `{content_escaped}`,
  }},"""


def main():
    print(f"Generating {len(POSTS)} blog posts with claude-haiku-4-5...")
    print("=" * 60)

    generated = []

    for i, post_meta in enumerate(POSTS, 1):
        print(f"[{i}/{len(POSTS)}] {post_meta['slug']}...")
        try:
            content = generate_post(post_meta)
            entry = build_ts_entry(post_meta, content)
            generated.append({
                "meta": post_meta,
                "content": content,
                "ts_entry": entry,
            })
            print(f"  ✓ {len(content.split())} words")
            # Small delay to avoid rate limits
            if i < len(POSTS):
                time.sleep(0.5)
        except Exception as e:
            print(f"  ✗ ERROR: {e}")
            continue

    # Write all generated entries to a file for manual insertion
    output_path = os.path.join(os.path.dirname(__file__), "generated-blog-entries.ts")
    with open(output_path, "w") as f:
        f.write("// Generated blog post entries — paste into src/app/blog/[slug]/page.tsx\n")
        f.write("// Generated: " + date.today().isoformat() + "\n\n")
        for item in generated:
            f.write(item["ts_entry"])
            f.write("\n\n")

    # Also write slugs for sitemap update
    slugs_path = os.path.join(os.path.dirname(__file__), "generated-blog-slugs.json")
    with open(slugs_path, "w") as f:
        json.dump([item["meta"]["slug"] for item in generated], f, indent=2)

    print("=" * 60)
    print(f"Done. Generated {len(generated)}/{len(POSTS)} posts.")
    print(f"Entries saved to: {output_path}")
    print(f"Slugs saved to: {slugs_path}")

    if len(generated) < len(POSTS):
        failed = [p["slug"] for p in POSTS if p["slug"] not in [g["meta"]["slug"] for g in generated]]
        print(f"Failed: {failed}")


if __name__ == "__main__":
    main()
