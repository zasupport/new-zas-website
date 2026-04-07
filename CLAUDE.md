# ZA Support — new-zas-website project rules
# Blog rules: /perfect-blog-creator SKILL is the canonical source — do not duplicate here
# Stack: Next.js 15 + Tailwind v4 + Vercel | Repo: github.com/zasupport/new-zas-website
# Global rules: ~/.claude/CLAUDE.md (auto-loaded)

## AUTO-SETUP (run if blog components are missing)
# If src/components/blog/AuthorBox.tsx does NOT exist: bash perfect-blog/setup.sh
# If setup.sh missing: find ~ -maxdepth 4 -name "setup.sh" -path "*/perfect-blog/*" 2>/dev/null | head -1

# §229 BLOG VELOCITY 2-3/DAY (HARD — 07/04/2026 — REPLACES §220 15/day):
# Maximum: 2-3 posts/day at consistent times | Minimum: 3 posts/week
# NEVER batch >5 in a day | Word count: min 1,500 repair guides, min 800 troubleshooting
# Research-first: ≥2 SEO sources per topic | /perfect-blog-creator SKILL v2 is canonical source
# §220 RESEARCH-FIRST BLOG PIPELINE → global CLAUDE.md (auto-loaded) + /perfect-blog-creator SKILL v2
# §221 GMB MEDIA SYNC (HARD — 06/04/2026):
# Pull all photos+videos from Google Business Profile → ~/Desktop/Claude/Google/GMB-Media/
# Auth: python3 ~/bin/za-gmb-oauth-setup.py (one-time OAuth2 consent — browser required)
# Sync: bash ~/bin/za-gmb-media-sync.sh | LaunchAgent: com.zasupport.gmbmediasync (Mon 07:00)
# Photos → /GMB-Media/photos/*.webp | Videos → /GMB-Media/videos/*.mp4
# Use GMB photos in blog posts instead of stock images
# Credentials: GBP_CLIENT_ID + GBP_CLIENT_SECRET + GBP_REFRESH_TOKEN in ~/.za-keys-pending.env
# Setup prereq: enable Business Profile API at console.cloud.google.com (project: za-support-seo-202603)

# §222 CLAUDE OPUS TERMINAL ONLY (HARD — 06/04/2026):
# ALWAYS launch Claude via Terminal — ∅ web browser ∅ claude.ai
# Model lock: claude-opus-4-6 set in ~/.claude/settings.json (permanent)
# Terminal launcher: ~/Desktop/Claude Opus.app | CLI: claude --model claude-opus-4-6
# ∅ open claude.ai in browser | ∅ use Sonnet when Opus is available
