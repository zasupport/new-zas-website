# ZA Support GSC Intelligence Feedback Loop

**Source:** §246 Hard Rule, 08/04/2026
**Portable:** Usable across Claude Code, Claude.ai web, Claude app, Claude API.

## What It Does

Scans Google Search Console performance data every 60 seconds. Compares current period (last 3 days) against previous period (4-7 days ago). Correlates performance changes with recent git commits. Extracts learned behaviours (positive and negative). Automatically updates .md rules to repeat successful patterns and investigate failures.

## The Intelligence Loop

1. GSC API query: clicks, impressions, CTR, position per query/page
2. Compare: current period vs previous period
3. Correlate: match performance shifts to recent blog/content commits
4. Learn: "medical content +10% clicks" = positive learned behaviour
5. Propagate: update CLAUDE.md, SKILL files, MEMORY.md, feedback memories
6. Weight: blog pipeline adjusts topic priority based on what works
7. Repeat: next scan in 60 seconds

## Content Type Classification

- **Medical**: queries/pages containing medical, practice, popia, doctor, health, compliance, operator agreement
- **Repair**: queries/pages containing repair, logic board, liquid damage, screen, battery
- **General**: everything else

## Positive vs Negative Insights

Positive (click increase >= 10% or >= 5 clicks): content strategy working, weight this content type higher.
Negative (click decrease): investigate, check if content was removed/changed, adjust approach.

## Files

- Script: ~/bin/za-gsc-intelligence.py
- OAuth setup: ~/bin/za-gsc-oauth-setup.py (one-time, browser consent)
- LaunchAgent: com.zasupport.gscintelligence (every 60s)
- Output: docs/seo/GSC-Intelligence-Log.md (auto-updated)
- Memory: memory/feedback_gsc_medical_content.md (auto-updated)
- State: ~/.za-gsc-intelligence-state.json
- Credentials: GSC_REFRESH_TOKEN in ~/.za-keys-pending.env

## Prerequisites

1. Google Cloud project: za-support-seo-202603
2. Search Console API enabled in console.cloud.google.com
3. One-time OAuth consent: python3 ~/bin/za-gsc-oauth-setup.py

*ZA Support GSC Intelligence Feedback Loop — 08/04/2026*
