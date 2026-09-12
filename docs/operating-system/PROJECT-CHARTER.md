# Project Charter, ZA Support organic-growth programme

**Established:** 12 September 2026, from the Website Audit Master Handoff.
**Owner:** Courtney Bentley (ZA Support). **Implementer:** Claude Code.
**Repository:** github.com/zasupport/new-zas-website. **Stack:** Next.js App Router, Vercel, Sanity.
**Live site:** https://zasupport.com (apex canonical).

## Purpose

Grow qualified organic demand and completed-repair revenue for ZA Support through technical
quality, relevant people-first content, local reputation and measured operations. No paid media.
The site is already substantially deployed; this is a delta audit, verification, repair and
enhancement programme, not a rebuild.

## Primary success measure

```
SEO profit contribution = qualified leads x assessment/booking rate x quote approval rate
                          x completion rate x gross margin
```

Ranking and click volume are guardrail metrics, not the objective.

## In scope

1. Verify and repair onsite search, technical SEO, canonicals, sitemap, schema and metadata.
2. Apply owner-approved commercial and trust wording consistently (assessment fee, established
   2009, repair metrics, GBP-sourced reviews).
3. Resolve keyword cannibalisation with staged, measured change, no bulk action.
4. Preserve the iPhone acquisition engine; make Mac repair a first-class pillar.
5. Audit Google Business Profile and build a change-to-outcome ledger.
6. Build lawful, capability-verified security and forensics capture, guardrails first, pages gated.
7. Stand up CI gates, weekly audit, independent verification and learning registers.

## Out of scope / hard boundaries

- No Google Ads or paid-media spend, no paid SEO suites or backlink services (§0.4).
- No Apple Account / Apple ID recovery, Activation Lock / Find My / passcode / MFA bypass, covert
  monitoring, attacker attribution without evidence, or court-admissibility claims (§11.2).
- No mass service x location or service x model page expansion (doorway risk).
- No self-serving AggregateRating / Review JSON-LD.

## Approval gates (never crossed autonomously)

Merge a PR, deploy to production, publish content, alter GBP, change Search Console, change
canonical/robots/redirect policy, send customer communications, create reviews or backlinks, and
modify pricing, legal or trust claims. Each requires explicit owner approval, preview evidence and
a rollback path (mirrors `seo-policy.json.approval_boundary`).

## Autonomous scope

Read repositories, logs and public pages; read GSC / analytics / Vercel where authorised;
conservative crawl; generate reports; create branch drafts and preview PRs; run tests; write
rollback plans; maintain these registers.

## Operating cadence

Per-PR gates (`.github/workflows/seo-pr-gates.yml`) and a weekly read-only audit
(`.github/workflows/seo-weekly-audit.yml`). Every material change carries evidence, a test, owner
approval, a rollback and a learning update. Phase reports follow the handoff §20 template.
