# ZA Support — new-zas-website project rules
# Blog rules: /perfect-blog-creator SKILL is the canonical source — do not duplicate here
# Stack: Next.js 15 + Tailwind v4 + Vercel | Repo: github.com/zasupport/new-zas-website
# Global rules: ~/.claude/CLAUDE.md (auto-loaded)

## AUTO-SETUP (run if blog components are missing)
# If src/components/blog/AuthorBox.tsx does NOT exist: bash perfect-blog/setup.sh
# If setup.sh missing: find ~ -maxdepth 4 -name "setup.sh" -path "*/perfect-blog/*" 2>/dev/null | head -1

# §229 BLOG VELOCITY 8/DAY (HARD — 07/04/2026 — GOOGLE-SAFE LIMIT):
# Target: 8 posts/day MAX (~240/month) | 4 overnight 22:30 + 4 daily 12:00 SAST | NEVER batch >5 at once
# 85% confidence — defensible with E-E-A-T signals (named author, workshop experience, local pricing)
# §227 compliance: ALL quality gates must pass | WORD COUNT TIERS: 1,500+ repair guides | 1,200+ informational/comparison | 800+ troubleshooting
# ∅ default to shortest tier | longer articles (1200-1500+) rank higher — PRIORITISE for competitive keywords
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
# §234 CLIENT-FACING PDF FORMAT (HARD — 07/04/2026) → global CLAUDE.md (auto-loaded)
# §239 VEHICLE BRANDING MOCKUP (HARD — 08/04/2026) AUTO-EXECUTE → ~/Developer/za-support-imggen/ | /vehicle-branding | global CLAUDE.md (auto-loaded)

# §240 VERIFY STATUS WITH REAL DATA (HARD — 08/04/2026): EVERY status claim MUST be verified by executing with real data — same response | ∅ mark status without testing | ∅ ask before testing — auto-execute | Extends §233
# §240 STATUS VERIFICATION WITH REAL DATA (HARD — 08/04/2026) → global CLAUDE.md (auto-loaded)
# §241 UNCERTAIN=TEST→SELF-HEAL→RETEST→LOOP (HARD — 08/04/2026) → global CLAUDE.md (auto-loaded)

# §244 RULE = RULE + ENFORCEMENT + TEST (HARD — 08/04/2026): every new HR MUST deliver (1)rule text (2)enforcement script/LaunchAgent/hook (3)real-data test — ALL in same response | ∅ rule text alone = not implemented
# §240 MOCKUP OPUS PIPELINE + AUTO-OPEN (HARD — 08/04/2026) → Creative.MD + Opus refine + auto-open | global CLAUDE.md (auto-loaded)
# §241 TERMINAL OPUS LAUNCHER (HARD — 08/04/2026) → O = new Terminal CLI + claude-opus-4-6 | ∅ browser ∅ claude.ai | global CLAUDE.md (auto-loaded)
# §242 OPUS = NEW TERMINAL WINDOW (HARD — 08/04/2026): ANY Opus request → new Terminal CLI | ∅ claude.ai ∅ browser ∅ paste | global CLAUDE.md (auto-loaded)

# §246 GSC INTELLIGENCE FEEDBACK LOOP (HARD — 08/04/2026): GSC data every 60s → correlate git changes → learned behaviours → update .md rules | ~/bin/za-gsc-intelligence.py | com.zasupport.gscintelligence | positive=weight higher, negative=investigate
# §247 COMPLETION SELF-CHECK — CC/CI/PORTABLE.MD (HARD — 08/04/2026): before marking ANY output complete answer "How do I know this completed successfully?" | CC=run+stdout | CI=gh run view+exit 0 | Portable.MD=grep key section+propagated | global CLAUDE.md (auto-loaded)
# §248 CONTINUOUS LEARNING (HARD — 08/04/2026): after every task answer WHAT learned + WHAT better + WHY success/failure + WHAT to replicate → propagate to all .md + intelligence engine | global CLAUDE.md (auto-loaded)

# §254 MAC MODEL ID SKILL: /mac-model-id — load before stating ANY Mac hardware spec/upgrade/macOS compat | ∅ guess from year alone | SKILL: ~/.claude/skills/mac-model-id/SKILL.md

# §255 HARDWARE RESEARCH VERIFICATION: /hardware-research — min 2 sources + real-world confirmation before ANY hardware/software compat claim | ∅ answer from training data alone

# §256 IFIXIT REPAIR GUIDE LOOKUP: /ifixit-repair-guide — search iFixit for exact model+component guide, verify A-number, save to Knowledge Centre | ∅ generic model without year

# §260 CONTINUE = RESUME, NOT RESTART: "continue"/"finish"/"complete the above" = resume signal | ∅ restart ∅ recap | extends §231
# §259 WHATSAPP SKILL AUTO-ACTIVATION: NLP trigger → auto-load WhatsApp skills (7 total) | za-whatsapp-skill-verify.sh
# §257 CROSS-PLATFORM CONTEXT SYNC: portable.md every 2min → iCloud+API+local | za-portable-context-sync.sh | com.zasupport.portablesync (120s)
