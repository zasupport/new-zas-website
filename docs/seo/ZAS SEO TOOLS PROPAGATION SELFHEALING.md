---
name: ZAS-SEO-TOOLS-PROPAGATION-SELFHEALING
version: 1.0
site: zasupport.com
last_updated: 07/04/2026 SAST
purpose: Complete third-party SEO tools inventory, infrastructure propagation instructions, self-healing rules, and knowledge centre structure. Extends the three core .md files.
extends: ZAS-SEO-COMPREHENSIVE-20260407-R2.md, Google SEO Master Reference zasupport.md, Perfect Blog Creator SKILL v2.md
---

# SEO Tools, Propagation, Self-Healing, and Knowledge Centre

## HR: VERIFY-FIRST RULE
Before installing any tool: check if it or an equivalent already exists. `claude mcp list`, `ls ~/.claude/skills/`, check Sanity CMS plugins, check package.json.

---

## PART 1: COMPLETE THIRD-PARTY SEO AND RANKING TOOLS

### 1.1 Google's own tools (free, no install)

| Tool | URL | Purpose | Priority for ZA Support |
|---|---|---|---|
| Google Search Console | https://search.google.com/search-console | Indexing, crawl errors, performance, CWV field data, structured data validation | CRITICAL — must use weekly |
| PageSpeed Insights | https://pagespeed.web.dev | CWV field data (CrUX) + Lighthouse lab data | HIGH — check top pages monthly |
| Rich Results Test | https://search.google.com/test/rich-results | Validate structured data for rich results | HIGH — after every schema change |
| Schema Markup Validator | https://validator.schema.org | Generic schema.org validation (all types, not just Google-specific) | MEDIUM — for debugging |
| Google Lighthouse | Built into Chrome DevTools | Lab-based performance, accessibility, SEO audit | MEDIUM — development QA |
| Google Trends | https://trends.google.com | Keyword research, seasonality, rising queries | MEDIUM — blog topic research |
| Google Business Profile | https://business.google.com | Local search, reviews, posts | HIGH — link blog posts, respond to reviews |
| Google Analytics 4 | https://analytics.google.com | User behaviour, engagement, conversions | INSTALLED (G-XJNXMVBGP6) |
| URL Inspection API | Via GSC or MCP | Individual URL indexing status | HIGH — via GSC MCP |
| Google's Structured Data Testing | https://developers.google.com/search/docs/appearance/structured-data | Testing and validation hub page | REFERENCE |
| Ranking Updates Status | https://status.search.google.com/products/rGHU1u87FJnkP6W2GwMi/history | Official Google ranking update history | CHECK monthly |

### 1.2 MCP servers for Claude Code integration

| Tool | Source | Purpose | Install priority |
|---|---|---|---|
| **mcp-gsc** (v0.2.2, April 2026) | https://github.com/AminForou/mcp-gsc | Connects GSC to Claude Code — 19 tools: search analytics (25,000 rows), batch URL inspection, sitemap management, quick wins detection | HIGH |
| **Better Search Console** | https://github.com/houtini-ai/better-search-console | Syncs GSC data to local SQLite — SQL queries, 16 pre-built insights, visual dashboards in Claude Desktop | MEDIUM (alternative to mcp-gsc) |
| **google-searchconsole-mcp** | https://github.com/surendranb/google-search-console-mcp | Simpler GSC MCP — all dimensions and metrics, natural language queries | LOW (use mcp-gsc instead) |

**Decision:** Install mcp-gsc as primary. It has the most features, most recent updates (April 2026), and supports OAuth, service accounts, batch inspection, and visual dashboards.

### 1.3 Claude Code SEO skills

| Tool | Source | Purpose | Install priority |
|---|---|---|---|
| **claude-seo** | https://github.com/AgriciDaniel/claude-seo | 19 sub-skills, 12 subagents. Covers: technical audit, E-E-A-T analysis, schema validation, GEO/AEO optimisation, backlinks, local SEO, maps intelligence, PDF/Excel reporting. Commands: /seo audit, /seo page, /seo schema, /seo sitemap, /seo geo | HIGH |

Install to: `~/.claude/skills/seo/`
Sub-skills install to: `~/.claude/skills/seo-*/`
Subagents install to: `~/.claude/agents/seo-*.md`

### 1.4 Open-source self-hosted SEO tools

| Tool | Source | Purpose | Cost | Install priority |
|---|---|---|---|---|
| **SerpBear** | https://github.com/nickmjones/serpbear | Keyword rank tracking with automated alerts, GSC integration, Docker deployment. Unlimited keywords. Replaces $99/month rank trackers. | Free (self-hosted) | HIGH |
| **RustySEO** | https://github.com/nicola-rusto/rustyseo | All-in-one: site audits, SERP tracking, log analysis, dashboards, reporting. AI keyword grouping, ranking gap detection, seasonal trend prediction. | Free | MEDIUM |
| **Greenflare** | https://github.com/beb7/gflern | Multi-threaded SEO crawler. Free alternative to Screaming Frog paid version. Handles massive sites. | Free | MEDIUM |
| **ContentSwift** | https://github.com/nicola-rusto/contentswift | Competitor content analysis based on actual SERP data. Research what's ranking and why. | Free (needs SerpAPI credits) | LOW |
| **GSC Bulk Data Downloader** | (various GitHub repos) | Eliminates Google's 1,000-row export limit from Search Console. Essential for large-scale reporting. | Free | MEDIUM |
| **SEOJuice** | https://github.com/nicola-rusto/seojuice | Link analysis and link-building opportunity discovery. | Free | LOW |
| **SEOnaut** | https://seonaut.org | Technical SEO audits: orphan pages, timeouts, missing canonicals, crawlability. Free for 500 URLs. | Freemium (free 500 URLs) | MEDIUM |
| **oguzhan18/seo-tools-api** | https://github.com/oguzhan18/seo-tools-api | RESTful API for embedding SEO checks and scoring into custom apps. Developer-focused. | Free | LOW |

### 1.5 Free browser-based tools (no install)

| Tool | URL | Purpose |
|---|---|---|
| **TechnicalSEO.com** | https://technicalseo.com/tools/ | SERP simulator, schema generator, robots.txt tester, hreflang tester, local search tool |
| **Backlinko SEO Checker** | https://backlinko.com/tools/seo-checker | Free on-page SEO audit for any URL |
| **SEOmator** | https://seomator.com/free-seo-audit-tool | Free site audit with PDF report |
| **AnswerThePublic** | https://answerthepublic.com | Visual keyword question mapping (limited free searches) |

### 1.6 Chrome extensions (free)

| Extension | Purpose |
|---|---|
| META SEO Inspector | Analyses meta tags, structured data, on-page SEO elements in real-time |
| SEO Minion | Quick SEO audits: meta tags, headings, links, schema, broken links |
| Redirect Path | Shows full HTTP redirect chain (301/302) while browsing |
| Keyword Surfer | Search volume and keyword ideas directly on Google SERPs |

### 1.7 Recommended tool stack for ZA Support

**Minimum viable (install first):**
1. GSC MCP (mcp-gsc) in Claude Code — real-time SEO data access
2. Claude SEO skill — audit and optimisation commands
3. SerpBear — ongoing keyword rank tracking

**Full stack (add as needed):**
4. Greenflare or SEOnaut — periodic full-site crawl
5. RustySEO — comprehensive audit and reporting
6. TechnicalSEO.com — ad-hoc schema generation and SERP preview
7. Chrome extensions — during manual review

---

## PART 2: PROPAGATION INSTRUCTIONS

### 2.1 Where each file goes

| File | Destination | Method |
|---|---|---|
| **ZAS-SEO-COMPREHENSIVE-20260407-R2.md** | Claude Project for website build (as context). Also to `~/Developer/new-zas-website/.claude/INSTRUCTIONS.md` (append or merge) | Upload to Claude Project. Copy to codebase via Claude Code. |
| **Google SEO Master Reference zasupport.md** | Claude Project for website build. Also to `~/Developer/new-zas-website/docs/seo/` | Upload to Claude Project. Copy via Claude Code. |
| **Perfect Blog Creator SKILL v2.md** | Replace `/mnt/skills/user/perfect-blog-creator/SKILL.md` via Claude Code or manual upload in Claude settings | Claude Code: `cp "Perfect Blog Creator SKILL v2.md" ~/.claude/skills/perfect-blog-creator/SKILL.md` or upload via claude.ai Settings > Skills |
| **This file (Tools, Propagation, Self-Healing)** | Same destinations as R2 comprehensive. Also to `~/Developer/new-zas-website/docs/seo/` | Copy via Claude Code |

### 2.2 Claude Code propagation steps

```bash
# 1. Create docs/seo directory in website project
mkdir -p ~/Developer/new-zas-website/docs/seo

# 2. Copy reference files
cp "ZAS SEO COMPREHENSIVE 20260407 R2.md" ~/Developer/new-zas-website/docs/seo/
cp "Google SEO Master Reference zasupport.md" ~/Developer/new-zas-website/docs/seo/
cp "ZAS SEO TOOLS PROPAGATION SELFHEALING.md" ~/Developer/new-zas-website/docs/seo/

# 3. Update Perfect Blog Creator skill
cp "Perfect Blog Creator SKILL v2.md" ~/.claude/skills/perfect-blog-creator/SKILL.md

# 4. Install GSC MCP (verify first: claude mcp list)
# Follow mcp-gsc installation from github.com/AminForou/mcp-gsc

# 5. Install Claude SEO skill (verify first: ls ~/.claude/skills/seo/)
# Follow installation from github.com/AgriciDaniel/claude-seo

# 6. Verify all files are in place
ls -la ~/Developer/new-zas-website/docs/seo/
ls -la ~/.claude/skills/perfect-blog-creator/
ls -la ~/.claude/skills/seo/ 2>/dev/null
claude mcp list
```

### 2.3 Claude Project propagation

Upload these files as project context in the relevant Claude Project:
1. ZAS-SEO-COMPREHENSIVE-20260407-R2.md
2. Google SEO Master Reference zasupport.md
3. Perfect Blog Creator SKILL v2.md
4. This file

---

## PART 3: SELF-HEALING RULES

### 3.1 Self-healing code for .md file integrity

Add to Claude Code `~/.claude/INSTRUCTIONS.md` or project INSTRUCTIONS.md:

```markdown
## SELF-HEALING: SEO DOCUMENTATION INTEGRITY

### On every Claude Code session start:
1. Check `docs/seo/` directory exists. If missing, alert: "SEO documentation directory missing. Run propagation steps from ZAS-SEO-TOOLS-PROPAGATION-SELFHEALING.md"
2. Check Perfect Blog Creator skill exists at `~/.claude/skills/perfect-blog-creator/SKILL.md`. If missing, alert.
3. If any SEO-related task is requested, read the relevant .md file BEFORE executing.

### On every blog post creation:
1. Run Perfect Blog Creator pre-flight (Section 1 of SKILL v2.0)
2. Verify author is "Courtney Bentley" with slug "courtney-bentley" — if any reference to "David Bentley" or "david-bentley" is found, flag immediately and correct
3. Verify dateModified is both in schema AND visible on page
4. Verify canonical tag points to https://zasupport.com (non-www, HTTPS)

### On every schema change:
1. Run Rich Results Test on affected page after deployment
2. Compare new schema against templates in R2 comprehensive file Section 2
3. Verify Person schema sameAs includes personal LinkedIn (linkedin.com/in/bentleycourtney/)

### On every deployment:
1. Spot-check 3 random pages for: canonical tag, schema presence, max-image-preview meta tag
2. Check HTTP redirect: `curl -sI http://zasupport.com` — should NOT redirect to vercel.com
3. Check 1 old WordPress URL from redirect map — should 301, not 404

### On monthly audit (1st of month):
1. Run full pre-flight from Perfect Blog Creator Section 11
2. Verify all 10 old WordPress URL redirects still work
3. Check PSI field data for top 5 pages
4. Verify author page /author/courtney-bentley returns 200 with correct Person schema
```

### 3.2 Self-healing for author identity drift

This specific problem (David vs Courtney) must never recur:

```markdown
## AUTHOR IDENTITY LOCK

The ONLY primary author for zasupport.com is:
- Name: Courtney Bentley
- Title: Apple Certified Expert Consultant  
- Slug: /author/courtney-bentley
- LinkedIn: https://www.linkedin.com/in/bentleycourtney/

If ANY of the following are detected anywhere in the codebase, schema, CMS, or generated content, FLAG AND CORRECT IMMEDIATELY:
- "David Bentley" (wrong name)
- "/author/david-bentley" (wrong slug — should redirect to courtney-bentley)
- "Founder & Apple Certified Technician" (old title — correct to "Apple Certified Expert Consultant")
- LinkedIn company page in Person schema sameAs (should be personal LinkedIn)
```

### 3.3 Self-healing for file version drift

```markdown
## FILE VERSION CONTROL

Current versions (07/04/2026):
- ZAS-SEO-COMPREHENSIVE: R2 (any earlier version is SUPERSEDED — delete if found)
- Google SEO Master Reference: v2.1
- Perfect Blog Creator SKILL: v2.0 (replaces v1.0)
- SEO Tools/Propagation/Self-Healing: v1.0

If a Claude instance encounters an older version, it must:
1. Note the version mismatch
2. Use the newer version
3. Alert: "Outdated SEO file detected: [filename] version [X]. Current is [Y]. Update required."
```

---

## PART 4: KNOWLEDGE CENTRE STRUCTURE

### 4.1 File hierarchy for website project

```
~/Developer/new-zas-website/
├── docs/
│   └── seo/
│       ├── ZAS SEO COMPREHENSIVE 20260407 R2.md      ← Master handoff
│       ├── Google SEO Master Reference zasupport.md   ← Google documentation reference
│       ├── ZAS SEO TOOLS PROPAGATION SELFHEALING.md   ← This file (tools + infrastructure)
│       └── README.md                                  ← Index pointing to each file's purpose
├── .claude/
│   └── INSTRUCTIONS.md                                ← Include self-healing rules from Part 3
```

### 4.2 Claude skills hierarchy

```
~/.claude/skills/
├── perfect-blog-creator/
│   └── SKILL.md                    ← Perfect Blog Creator v2.0
├── seo/                            ← Claude SEO skill (AgriciDaniel/claude-seo)
│   └── SKILL.md
├── seo-*/                          ← Sub-skills (auto-installed with claude-seo)
```

### 4.3 Knowledge centre README (create at docs/seo/README.md)

```markdown
# ZA Support SEO Knowledge Centre

Last updated: 07/04/2026

## Files in this directory

| File | Purpose | When to read |
|---|---|---|
| ZAS SEO COMPREHENSIVE 20260407 R2.md | Complete project context, author identity, site state, execution plan | Start of every new session |
| Google SEO Master Reference zasupport.md | Google ranking systems, signal weights, tools, structured data specs | When making SEO decisions |
| ZAS SEO TOOLS PROPAGATION SELFHEALING.md | All third-party tools, installation guides, self-healing rules | When installing tools or debugging |

## Quick reference

- Author: Courtney Bentley (Apple Certified Expert Consultant)
- Author slug: /author/courtney-bentley
- GA4 ID: G-XJNXMVBGP6
- Canonical domain: https://zasupport.com
- CWV targets: LCP < 2.5s, INP < 200ms, CLS < 0.1

## Rules

1. VERIFY-FIRST: Check if something exists before creating it
2. SELF-HEALING: Check author identity, schema, redirects on every session
3. NO DUPLICATES: Don't create files that duplicate existing ones
```

---

*ZAS-SEO-TOOLS-PROPAGATION-SELFHEALING — v1.0*
*07/04/2026 SAST*
