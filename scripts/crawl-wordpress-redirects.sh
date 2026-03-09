#!/bin/bash
# Crawl existing WordPress site and generate 301 redirect map
# Run: bash scripts/crawl-wordpress-redirects.sh
# Output: scripts/wordpress-redirects.json (ready to merge into next.config.ts)

SITE="https://www.zasupport.com"
OUTPUT="scripts/wordpress-redirects.json"

echo "=== Crawling $SITE for redirect mapping ==="
echo "Installing dependencies if needed..."
pip3 install requests beautifulsoup4 -q 2>/dev/null

python3 << 'PYEOF'
import requests, json, re
from urllib.parse import urljoin, urlparse
from collections import deque

BASE = "https://www.zasupport.com"
visited = set()
urls = []
queue = deque([BASE])
visited.add(BASE)

headers = {"User-Agent": "ZASupport-SEO-Crawler/1.0"}

# Map old WordPress slugs to new Next.js routes
ROUTE_MAP = {
    "/": "/",
    "/services": "/services",
    "/services/mac-repair": "/apple-repair",
    "/services/liquid-damage": "/liquid-damage",
    "/services/logic-board-repair": "/logic-board-repair",
    "/services/iphone-repair": "/iphone-repair",
    "/services/ipad-repair": "/ipad-repair",
    "/services/jamf": "/jamf-mdm",
    "/services/managed-it": "/managed-services",
    "/services/apple-support": "/apple-support",
    "/contact": "/contact",
    "/contact-us": "/contact",
    "/about": "/about",
    "/about-us": "/about",
    "/repair": "/apple-repair",
    "/mac-repair": "/apple-repair",
    "/blog": "/blog",
}

print(f"Crawling {BASE}...")
count = 0
max_pages = 50

while queue and count < max_pages:
    url = queue.popleft()
    try:
        r = requests.get(url, headers=headers, timeout=10, allow_redirects=True)
        if r.status_code == 200:
            path = urlparse(url).path.rstrip("/") or "/"
            urls.append({"old": path, "status": r.status_code, "final": urlparse(r.url).path})
            count += 1
            print(f"  [{count}] {path}")

            # Find links
            from bs4 import BeautifulSoup
            soup = BeautifulSoup(r.content, "html.parser")
            for a in soup.find_all("a", href=True):
                href = a["href"]
                full = urljoin(BASE, href)
                if full.startswith(BASE) and full not in visited:
                    parsed = urlparse(full)
                    if not parsed.path.startswith("/wp-") and not parsed.path.startswith("/wp-content"):
                        visited.add(full)
                        queue.append(full)
    except Exception as e:
        print(f"  Error: {url} — {e}")

# Generate redirect config
redirects = []
for u in urls:
    old = u["old"]
    if old in ROUTE_MAP:
        new = ROUTE_MAP[old]
        if old != new:
            redirects.append({
                "source": old,
                "destination": new,
                "permanent": True
            })
    elif old.startswith("/blog/") or old.startswith("/?p="):
        redirects.append({
            "source": old,
            "destination": "/blog",
            "permanent": True
        })

with open("scripts/wordpress-redirects.json", "w") as f:
    json.dump({"redirects": redirects, "all_urls": urls}, f, indent=2)

print(f"\n✓ Crawled {count} pages")
print(f"✓ Generated {len(redirects)} redirects")
print(f"✓ Output: scripts/wordpress-redirects.json")
PYEOF
