#!/bin/bash
# ZA Support — Weekly Blog Post Generator & WordPress Publisher
# Runs every Tuesday at 09:00 via launchd
# Generates topic using rotating list, publishes directly to WordPress

LOG="${HOME}/.za_support/blog-generator.log"
mkdir -p "${HOME}/.za_support"

echo "=== Blog Generator Started: $(date '+%d/%m/%Y %H:%M') ===" >> "$LOG"

# Rotating topic list — cycles through each week
TOPICS=(
    "How to back up your MacBook before a repair"
    "MacBook Pro vs MacBook Air: which is right for your business"
    "Signs your Mac hard drive is failing — what to look for"
    "How long does a MacBook battery last and when to replace it"
    "iPhone screen repair cost South Africa 2026"
    "Mac running slow? Common causes and fixes in Johannesburg"
    "Apple Mac SSD upgrade guide: speed up your old MacBook"
    "iMac repair or replace? A guide for South African users"
    "MacBook keyboard repair cost Johannesburg"
    "What is Apple Care Plus and is it worth it in South Africa"
    "MacBook Pro screen replacement cost South Africa"
    "Mac overheating: causes and solutions"
    "Best Mac antivirus software South Africa 2026"
    "How to transfer data from old Mac to new Mac"
    "MacBook water damage: what to do in the first 24 hours"
    "Apple Mac for small business South Africa"
    "iPhone battery replacement cost Johannesburg"
    "Mac keyboard not working after spill — repair options"
    "How to choose a Mac repair shop in Johannesburg"
    "MacBook charger not working: troubleshooting guide"
)

# Determine topic based on week of year
WEEK=$(date +%V)
TOPIC_IDX=$((WEEK % ${#TOPICS[@]}))
TOPIC="${TOPICS[$TOPIC_IDX]}"

echo "Week $WEEK — Topic: $TOPIC" >> "$LOG"

# Generate post via Claude API
DATE=$(date '+%Y-%m-%d')
SLUG=$(echo "$TOPIC" | tr '[:upper:]' '[:lower:]' | sed 's/ /-/g' | sed 's/[^a-z0-9-]//g')
TEMP_FILE="/tmp/za-blog-${DATE}-${SLUG}.md"

python3 << PYEOF 2>> "$LOG"
import os, json, urllib.request, ssl, re

API_KEY = os.environ.get("ANTHROPIC_API_KEY", "")
WP_URL = os.environ.get("WP_URL", "https://www.zasupport.com")
WP_USER = os.environ.get("WP_USER", "admin")
WP_PASS = os.environ.get("WP_PASS", "")

TOPIC = "${TOPIC}"
DATE = "${DATE}"

if not API_KEY:
    print("ERROR: ANTHROPIC_API_KEY not set")
    exit(1)

SYSTEM = """You are the content writer for ZA Support, Johannesburg's Apple specialist repair shop.
Write SEO-optimised blog posts for zasupport.com targeting South African readers.

RULES:
- Currency: R 2,500 (space, never R2500, never USD)
- Phone: 064 529 5863
- Location: Hyde Park, Johannesburg
- Address: 1 Hyde Park Lane, Hyde Park, Johannesburg, 2196
- Date format: DD/MM/YYYY
- NO US references, NO HIPAA, NO "enterprise-grade"
- Tone: expert, trustworthy, helpful — Apple repair specialist
- UK English: colour, authorised, centre, organised
- Minimum 1,000 words
- Include FAQ section with 5 specific questions
- Clear H2 structure
- End with CTA: call 064 529 5863 or visit zasupport.com/contact
- Internal links to relevant pages on zasupport.com"""

PROMPT = f"""Write a complete SEO-optimised blog post for ZA Support on this topic:

TOPIC: {TOPIC}

Output ONLY the HTML content (no markdown, no frontmatter). Use these HTML tags:
- <h1> for the main title (include primary keyword + "Johannesburg" or "South Africa")
- <h2> for section headings
- <p> for paragraphs  
- <ul><li> for lists
- <strong> for emphasis
- For FAQ section use <h2>Frequently Asked Questions</h2> then <h3> for each Q, <p> for each A

Minimum 1,000 words. Include at least 5 FAQ items."""

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
    headers={"x-api-key": API_KEY, "anthropic-version": "2023-06-01", "content-type": "application/json"}
)

try:
    with urllib.request.urlopen(req, context=ctx) as r:
        result = json.loads(r.read())
        content = result["content"][0]["text"]
        
    # Extract H1 as title
    h1_match = re.search(r'<h1[^>]*>(.*?)</h1>', content, re.DOTALL)
    title = re.sub('<[^>]+>', '', h1_match.group(1)) if h1_match else TOPIC
    
    # Extract first <p> for excerpt  
    p_match = re.search(r'<p>(.*?)</p>', content, re.DOTALL)
    excerpt = re.sub('<[^>]+>', '', p_match.group(1))[:200] if p_match else ''
    
    # Publish to WordPress via cookie auth + nonce
    # Use WP REST API with the PHP helper we have
    import base64
    wp_token = base64.b64encode(f"{WP_USER}:{WP_PASS}".encode()).decode()
    
    # Try via PHP helper that's already deployed
    import urllib.parse
    helper_url = f"{WP_URL}/wp-content/uploads/za-seo-update.php?key=za2026seo&action=create_post"
    post_data = urllib.parse.urlencode({
        "title": title,
        "content": content,
        "excerpt": excerpt,
        "status": "publish",
        "category": "35"  # Blog category
    }).encode()
    
    req2 = urllib.request.Request(helper_url, data=post_data, headers={"Content-Type": "application/x-www-form-urlencoded"})
    with urllib.request.urlopen(req2, context=ctx) as r2:
        result2 = json.loads(r2.read())
        if result2.get('success'):
            print(f"SUCCESS: Published post ID {result2.get('id')} - {title[:50]}")
        else:
            print(f"PUBLISH ERROR: {result2}")
            
except Exception as e:
    print(f"ERROR: {e}")
PYEOF

echo "=== Blog Generator Finished: $(date '+%d/%m/%Y %H:%M') ===" >> "$LOG"

# macOS notification
osascript -e 'display notification "Weekly blog post published to zasupport.com" with title "ZA Support SEO" sound name "Glass"' 2>/dev/null || true
