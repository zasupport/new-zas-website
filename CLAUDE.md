# ZA Support — new-zas-website project rules
# Blog rules: /perfect-blog-creator SKILL is the canonical source — do not duplicate here
# Stack: Next.js 15 + Tailwind v4 + Vercel | Repo: github.com/zasupport/new-zas-website
# Global rules: ~/.claude/CLAUDE.md (auto-loaded)

# §346 BLOG PUBLICATION VERIFY (HARD — 10/05/2026): BEFORE marking any blog post published/complete, run 5 real-data checks: (1) HTTP 200 `curl -s -o /dev/null -w "%{http_code}" https://zasupport.com/blog/<slug>` (2) No IP metadata in HTML (3) wa.me link present ≥1 (4) Slug in sitemap.xml (5) Schema markup @type present | BATCH: bash ~/bin/za-blog-publication-verify.sh slug1 slug2 ... | SITEMAP IS STATIC — every new blog slug MUST be manually added to src/app/sitemap.ts in the same commit | auto-blog-insert.py handles this for pipeline-generated posts — manual inserts must do it explicitly | SELF-HEAL: 404→check slug in page.tsx→re-insert+redeploy | not in sitemap→add to sitemap.ts→redeploy | extends §343+§311+§262+§313+§316

# §345 REPAIR COUNT FLOOR (HARD — 10/05/2026): any claim about repairs/devices/units fixed in blog content → MINIMUM 10,000 MAXIMUM 50,000 | BANNED: "over 800 batteries" "200 keyboards" "5,000 repairs" | ALLOWED: "over 12,000 MacBooks" "more than 15,000 devices" | Enforced: za-blog-ip-enforcer.sh + LA com.zasupport.blogipscanner | extends §343+§300

# §344 BLOG CTA LINK INTEGRITY (HARD — 10/05/2026): every WhatsApp CTA in blog content MUST use markdown href `[text](https://wa.me/27645295863)` | booking CTA MUST use `[text](https://zasupport.com/book)` | BANNED: plain bold phone only | ENFORCED: za-blog-ip-enforcer.sh scans all content blocks for wa.me presence | extends §343+§261

# §343 BLOG IP METADATA ZERO-TOLERANCE (HARD — 10/05/2026): BANNED from any blog front-end: `## FAQ Schema` | `## Internal Links Placed` | `## External Link` sections | `**Word count:**` lines | VERIFICATION blocks (ALL variants: VERIFICATION & LEARNING REPORT|OUTPUT|METADATA|LOG) | JSON code blocks (```json) in content | checklist items showing word/link counts | SELF-HEAL: za-blog-ip-enforcer.sh + LA com.zasupport.blogipscanner (30min) | GENERATOR: za-blog-pipeline.sh BANNED section in prompt | extends §300+§269+§317+§313

# §297 MENTION=EXECUTE (HARD — 24/04/2026): mentioning a Claude-executable task IN ANY response (recap|§195 table|§278 gap|next actions|"for awareness") = obligation to execute it SAME response | ∅"will do next turn" ∅"scheduled for later" ∅"ready when you are" ∅"let me know" | EXCEPTION: §283 IRREDUCIBLY-MANUAL only | Before §278 recap: iterate EXECUTABLE-NOW set → run each → compose block with ACTUAL outcomes | refines §274+§278+§283+§291 | Full: ~/.claude/rules/297-mention-equals-execute.md

# §294 WEBSITE INBOUND → MARY (HARD — 20/04/2026): ALL website form/enquiry/booking notification emails → to: 'mary@zasupport.com' (PRIMARY) | SCOPE: src/app/api/book/route.ts + src/app/api/contact/route.ts + ANY new src/app/api/**/route.ts with resend.emails.send | AUTO-REPLY to submitter unchanged | WhatsApp CTA unchanged | OUT OF SCOPE: privacy/terms legal mailtos (POPIA Information Officer) | Pre-deploy grep gate: `grep -rEn "to:\s*\[?'(courtney|admin)@zasupport\.com'\]?" src/app/api/` must be empty for notification sends | Any new form endpoint MUST include mary@ routing in first commit | Full: ~/.claude/rules/294-website-inbound-to-mary.md

## AUTO-SETUP (run if blog components are missing)
# If src/components/blog/AuthorBox.tsx does NOT exist: bash perfect-blog/setup.sh
# If setup.sh missing: find ~ -maxdepth 4 -name "setup.sh" -path "*/perfect-blog/*" 2>/dev/null | head -1

# §229 BLOG VELOCITY 8/DAY (HARD — 11/04/2026 — GOOGLE-SAFE TARGET):
# Target: 8 posts/day (~240/month) | 4 overnight 22:30 + 4 daily 12:00 SAST | NEVER batch >5 at once
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

# §293 CHAT LABEL = CWD PROJECT (HARD — 20/04/2026): statusline/session-banner/resume label derived from CWD via cwd_to_label() canonical map in ~/.claude/statusline-command.sh | Website CWD = [ Website ] always — rolling-buffer override ignored when CWD is known | extends §292 domain manifest | global CLAUDE.md (full detail)

# §287 PRICING DISCLAIMER BANNER (HARD — 19/04/2026): EVERY pricing page = red banner "Indicative pricing only. Final pricing is confirmed once ZA Support verifies your device model and serial number." | Component: src/components/PricingDisclaimer.tsx mounted in SiteShell.tsx | Outer section uses mt-16 lg:mt-20 to clear fixed Navbar (§290) | Route allow-list via PRICING_ROUTES | Contact: 064 529 5863 (§261) | Adding new pricing route → update PRICING_ROUTES same commit | global CLAUDE.md (full detail)

# §290 WEBSITE DESIGN SELF-HEAL (HARD — 19/04/2026): Playwright headless scan zasupport.com (mobile 375 + desktop 1440) every 30min via com.zasupport.designselfheal | DETECT: banner_under_fixed_nav | banner_missing | banner_hidden | horizontal_overflow | load_timeout | AUTO-FIX REGISTRY: banner_under_fixed_nav → mt-16 lg:mt-20 on PricingDisclaimer outer section | post-fix gate: tsc PASS + rescan PASS + commit fix(§290) + append memory/feedback_design_self_heal.md | Scanner: ~/bin/za-website-design-scanner.py | Driver: ~/bin/za-website-design-self-heal.sh | LIVE 19/04: 20 FAIL → fix shipped → 20 PASS rescan | global CLAUDE.md (full detail)

# §284 GAP ANALYSIS AUTO-EXECUTE (HARD — 19/04/2026): §278 EXECUTABLE-NOW items → auto-enqueue ~/.za-gap-analysis-queue.json + live drain + LaunchAgent com.zasupport.gapanalysisexecutor (RunAtLoad+300s failover, survives sleep/lid-close/session-death) | headless Claude per item → ~/.za-gap-analysis-logs/<id>.log | Retry 3× then notify+failed | BLOCKED-EXTERNAL never auto-executed | LIVE 19/04 13:50: exit=0, /tmp/ga-test.txt=OK, queue status=done | extends §278+§274+§265+§216+§267+§273 | global CLAUDE.md (full detail)
# §272 COMPETITOR MONITORING (HARD — 15/04/2026): monthly (15th) scan istorebusiness.co.za | 6 content gaps: M365 Premium, Adobe, UniFi, iPad biz, iPhone biz, managed IT stack | → memory/competitive_intel_istore_business.md
# §270 IMPORT DIFF GATE (HARD — 13/04/2026): injected file/folder → diff vs existing | newer → archive .pre-270 + update | older/same → skip | new file → install | ~/bin/za-import-diff.sh | extends §258+§244
# §269 PROPRIETARY TOOL CONCEALMENT (HARD — 13/04/2026): ∅ ANY reference to tools, technologies, frameworks, platforms, methods, processes in ANY public output | FULL SPEC: ~/.claude/rules/269-proprietary-tool-concealment.md | supersedes §268 | extends §203+§204+§205+§252 | global CLAUDE.md (full detail)
# §268 TECH STACK CONCEALMENT (HARD — 13/04/2026): ∅ proprietary technology identifiers (logos, favicons, SVGs, meta tags, boilerplate) visible on ANY public-facing property | Vercel/Next.js/Render/Sanity branding = competitive intelligence leak | remove on sight | replace with ZA Support branding | grep -rl "vercel\|nextjs" public/ must = 0 | extends §203+§204

# §266 CROSS-SESSION DEDUP (HARD — 12/04/2026): auto-detect duplicate work across sessions | za-session-dedup-hook.sh (UserPromptSubmit) + za-session-dedup.sh (SessionStart) | global CLAUDE.md (full detail)

# §261 CONTACT NUMBER LOCK (HARD — 11/04/2026): Website contact number = 064 529 5863 ALWAYS | ∅ change to 079 951 0851 | ∅ change ANY website contact number without explicit Courtney approval
# 079 951 0851 = WA Business number (pending approval) — WA link URLs (wa.me) are separate from displayed contact number
# REMINDER 13/04/2026: check if WA Business approved 079 951 0851 → ask Courtney before any number change

# §264 PERFECT BLOG INFRASTRUCTURE (HARD — 12/04/2026): water damage consolidated (20→5 posts, 17 redirects) | HowToSchema.tsx+SKILL v2.0 installed | za-blog-health-monitor.sh (15 checks, 30min, com.zasupport.bloghealthmonitor) | za-blog-self-heal.sh (8 auto-fixes) | ON FAIL: self-heal auto-triggers | 117 posts, 15/15 checks PASS

# §267 COMPLETE ALL PENDING BEFORE SESSION END (HARD — 12/04/2026): ∅ end session with unfinished detected tasks | verify 0 pending before stopping | za-pending-completion-gate.sh (Stop hook) | global CLAUDE.md (full detail)
# §265 AUTO-COMPLETE BLOG+WEBSITE WORK (HARD — 12/04/2026): auto-execute blog/website tasks that need no Courtney input | blog posts, SEO fixes, schema, sitemap, 404s, self-heal | ∅ ask ∅ wait | global CLAUDE.md (full detail)
# §263 WEEKLY KEYWORD STRATEGY (HARD — 11/04/2026): Saturday XLSX (exact format from ZA-Support-Keyword-Strategy-06042026.xlsx) + daily reminders until approved | global CLAUDE.md (full detail)
# §262 END-TO-END PROOF GATE (HARD — 11/04/2026): EVERY build/update/pipeline MUST prove with real data that every stage works end-to-end | ∅ done without proof | extends §92+§233+§240+§247 | global CLAUDE.md (full detail)

# §301 PARALLEL AGENT DISPATCH (HARD — 25/04/2026 v1.1 — DEFAULT N=20): "use N agents"|"in parallel" → runtime fan-out via concurrent Task subagents in ONE message | DEFAULT N=20 | global CLAUDE.md (full detail)
# §300 BLOG IP ZERO-TOLERANCE (HARD — 25/04/2026): 5 blog posts had IP trailers (LEARNED/BETTER/WHY/REPLICATE/VERIFIED OUTPUT) — stripped + 4-layer gate chain installed (scanner ~/bin/za-blog-ip-zero-tolerance.sh + .git/hooks/pre-commit + LaunchAgent com.zasupport.blogipscanner + SKILL blog-ip-concealment) | global CLAUDE.md (full detail)

# §317 COGNITIVE ROUTE CAPTURE ON SUCCESS (29/04/2026): On positive affirmation + propagation conjunction (excellent/perfect/100% + create .md/follows your train of thought/capture/new skill), Claude MUST emit 5-artefact bundle SAME response: cognitive-route MD ~/Desktop/Claude/cognitive-routes/<task>-cognitive-route-DD.M.YY-HHhMM.md (Q1-Q5: how got there + sacrificed | better answer + tech | new learning | append-not-delete | tests for advanced AI), CC rule, CC skill ≤1000 §307, claude.ai bundle ≤1000, DSL inject TIER 1. APPEND-ONLY: §270 import-diff archive .pre-§317-<UTC-iso> before write. ∅ deferral ∅ generic name ∅ overwrite ∅ rule without skill. Full: ~/.claude/rules/317-cognitive-route-capture-on-success.md
