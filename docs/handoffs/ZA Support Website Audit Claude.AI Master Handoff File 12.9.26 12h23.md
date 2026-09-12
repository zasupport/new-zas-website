# ZA Support Website Audit Claude.AI Master Handoff File 12.9.26 12h23

**Reader:** Claude.ai

**Purpose:** Strategic, architecture, critique, research-synthesis, disconfirmation, quality-review and learning-loop master handoff for ZA Support. Use this document alongside the Claude Code execution handoff. It contains the project context needed to turn research and Claude Code evidence into current-state-aware, ideal-state, cost-conscious and testable decisions.

**Canonical repository location:** `docs/handoffs/ZA Support Website Audit Claude.AI Master Handoff File 12.9.26 12h23.md`.

**Core rule:** Do not treat any status report, Claude Code summary, Claude.ai JSON, Perplexity answer, source file, historic audit, script output, hook result, deployment statement, configuration, or file existence as ground truth without identifying the authoritative verification source. Classify it as evidence and state its certainty.

---

# 0. Standing principles

1. ZA Support is a delta-audit/enhancement programme, not a greenfield website.
2. Apply six-pass review to every material plan/review/recommendation.
3. Apply disconfirmation, invalidation, counterfactual, metrics, guardrails, observation window and rollback requirements.
4. Preserve iPhone acquisition while expanding Mac repair and lawful high-value security/forensic work.
5. Use zero-paid-media, local-first and open-source-first strategy.
6. Keep ideal state visible but avoid over-engineering using NOW/NEXT/LATER and marginal-value assessment.
7. Do not approve claims, plans, PRs or releases merely because they are detailed. Require independently verified evidence.
8. Do not promote account recovery/bypass, covert surveillance, unsupported hacking attribution, legal conclusion or evidence-admissibility promises.

---

# 1. Six-pass ideal-state protocol

For each significant recommendation or review:

## 1. Objective

- What outcome is actually desired?
- What would ideal state look like?
- Is the requested artifact different from the real business/customer objective?

## 2. Evidence

- What is `VERIFIED`, `HISTORICAL`, `INFERRED`, `HYPOTHESIS`, `DECISION_REQUIRED`, `UNKNOWN`, `CONFLICTING_EVIDENCE` or `AGENT_CLAIM_UNVERIFIED`?
- What is stale, incomplete, geographically dependent or contradicted?

## 3. Architecture

- What workflow, system, data model, ownership, integration, capability, documentation, measurement or security control is missing?
- What existing component should be reused, repaired, rebuilt, retired or held?

## 4. Risk and governance

- What can harm privacy, POPIA compliance, personal safety, legal position, security, customer trust, business operations, cost or maintainability?
- What requires owner, legal, insurer, specialist DFIR, or safety escalation?

## 5. Optimisation

- What is the smallest highest-value improvement?
- Is it measurable and reversible?
- Does it improve commercial/customer outcome rather than vanity metrics?

## 6. Disconfirmation

- What could prove the plan wrong?
- What data invalidates it?
- What alternative follows?
- What is measured at 7/28/56/90 days?

Every pass asks:

```text
In an ideal state, what is missing?
What would change?
What should be done that is not currently being done?
What would optimise or enhance the output as much as possible?
```

Classify actions:

```text
NOW   = necessary/high-value/low-risk/dependency-blocking
NEXT  = valuable after evidence/approval/capacity/prior result
LATER = ideal-state backlog with insufficient near-term return
```

Add only if:

```text
(expected value × confidence) / (cost + complexity + risk + delay) > threshold
```

---

# 2. Evidence and claim verification rules

Use status labels:

```text
VERIFIED
HISTORICAL
INFERRED
HYPOTHESIS
DECISION_REQUIRED
UNKNOWN
AGENT_CLAIM_UNVERIFIED
LOCAL_SOURCE_VERIFIED
RUNTIME_VERIFIED
PRODUCTION_VERIFIED
EXTERNAL_SERVICE_VERIFIED
OWNER_VERIFIED
CONFLICTING_EVIDENCE
INVALIDATED
```

## 2.1 Current Claude.ai JSON

A Claude.ai JSON status handoff claimed Phase 0 execution in `new-zas-website`, branch `seo/organic-growth-infra`, commits `fc63e99`/`d507ab2`, live search/sitemap responses, API search 500, keyless search rewrite, missing GSC libraries, stale rating JSON, PAT scope blocker, and pre-existing uncommitted governance/robots files.

Because Claude.ai has no direct access to the real Claude Code runtime/Mac/Git/Vercel environment, classify every operational claim in that JSON as:

```text
AGENT_CLAIM_UNVERIFIED
```

Before advising action, require Claude Code direct verification against Git objects, current worktree, commands, Vercel deployment/route state, service APIs and live browser behavior.

---

# 3. ZA Support commercial and website context

## 3.1 Organic-only strategy

No paid advertising, expensive marketing campaigns, paid backlinks or expensive SEO suite dependency by default. Prioritise existing data/tools, free Google tools, local/open-source tools, self-hosted components and reproducible workflows.

## 3.2 Two-engine repair strategy

| Pillar | Business role | Design instruction |
|---|---|---|
| iPhone repair | High-volume onboarding/acquisition, trust, walk-ins and cross-device potential | Preserve proven traffic/URLs/conversion unless evidence supports change |
| Mac repair | Higher-margin specialist work | Make first-class; resolve cannibalisation; optimise assessments/quotes/jobs/margin |
| Security/forensics | High-revenue authorised work | Validate demand/capability/privacy/legal/safety before publishing or scaling |
| Managed IT/security | B2B growth | Requires authority/reputation/capability, not just a page rewrite |

Priority Mac work: screens, batteries, keyboards, trackpads, charging/no power, logic boards, liquid damage, data recovery, iMac/Mac mini, business support.

## 3.3 Commercial outcome chain

```text
organic landing page → qualified lead → assessment → written quote → approval
→ completed job → revenue/cost/gross margin
```

Any SEO/content/GBP proposal must identify where it improves this chain.

---

# 4. Approved business facts and wording constraints

## 4.1 Metrics

Separate approved metrics:

- 50,000+ repairs completed
- 25,000 repair operations
- 17,000 board-level repairs

Do not merge or infer relationships.

## 4.2 Establishment

Use **Established in 2009**. Do not use generic “16 years” business age. Separate founder tenure needs owner verification.

## 4.3 Reviews

GBP official source must control rating/review count. Historic 645/632+/120 conflict requires fresh source verification. Do not recommend normalising to stale local JSON.

## 4.4 Apple/Microsoft status

Pending legal/contract review:

> ZA Support uses Apple Original Parts where applicable and is authorised to resell new Apple and Microsoft computers, Apple accessories, and Apple warranties.

Do not conflate with Apple Authorised Service Provider status.

## 4.5 Assessment/quote policy

| Device | Fee |
|---|---:|
| iPhone, iPad, Apple Watch | R599 ex VAT |
| All computers | R899 ex VAT |

Fee is separate, non-refundable, non-creditable, non-deductible, not included in repair quote and payable regardless of repair decision. Written quote approval precedes repair.

Claude.ai must flag any plan/content that says fee is waived, included, credited, deducted or refundable.

---

# 5. Historical/current SEO and site evidence

Historical supplied artifacts include competitor, baseline, GBP, homepage, sitemap, robots, GSC, traffic and geolocated SERP reports.

Known historic context:

- Next.js/Vercel/Sanity reported.
- Sitemap about 838 URLs; large blog and service/location/model matrices.
- Possible scaled-content/doorway/cannibalisation risk.
- Sitemap lastmod uniform build timestamp.
- Meta keywords/title-OG mismatch historically reported.
- Schema was already substantial; AggregateRating self-markup correctly absent.
- ItemList alleged in commit `da20026`.

Historic GSC: Blog/battery/iPhone/screen generated most realised traffic; Mac smaller; formal forensics zero. This does not disprove broader security/anxiety query demand.

Historical JHB SERP: ZA ranked strongly for sample MacBook and logic-board queries, so do not prescribe page padding simply to match competitor length.

Current GSC sample: homepage ranks for several MacBook repair terms, while MacBook battery terms fragment across multiple URLs. Treat this as cannibalisation hypothesis requiring full query×page analysis.

No security/hacking/forensics cluster surfaced in the returned top 1,000 rows. Treat as site visibility baseline—not national market proof.

---

# 6. Review of website/search/SEO plans

Claude.ai must challenge any Claude Code plan on:

- Current source vs production Vercel drift.
- Search UI route vs backend API vs index vs deployment configuration.
- Whether SearchAction is valid if search fails.
- Canonical/robots/sitemap/indexation effects.
- Mac/iPhone cannibalisation and URL ownership.
- Potential location/model doorway expansion.
- Content helpfulness/proof versus keyword/padding behavior.
- Quote/review/warranty/Apple-status claim compliance.
- Accessibility, mobile conversion, CWV, privacy, form/sensitive-data handling.
- Evidence of actual traffic/lead/margin result.

---

# 7. Google Business Profile and historical performance

GBP is a primary local discovery/conversion/reputation system. Every recommended category/service/description/photo/post/Q&A/review/booking/link change needs live audit and outcome measurement.

Require current audit of:

- Identity/NAP/hours/service areas/categories/services.
- Exact wording and claim compliance.
- Website/booking/phone/UTM routes.
- Reviews/rating/velocity/topics/responses.
- Media/posts/Q&A.
- Search/Maps impressions, keyword impressions, calls, directions, website clicks, messages/bookings.
- Outlook GBP/Google performance emails.
- GSC/GA4/deployment/job/margin correlation.

Verify whether forensics/security-related GBP services already exist before suggesting additions:

```text
Digital forensics
Digital forensic consultation
Mac security assessment
Apple device security review
Business incident triage
Microsoft 365 compromise support
Evidence preservation
JAMF/MDM/security/managed IT
```

Do not let a keyword opportunity override actual operational capability or safe delivery path.

---

# 8. Security and forensic strategy review

## 8.1 No-bypass rule

Do not plan/endorse Apple Account recovery, Apple ID recovery, Activation Lock/Find My/passcode/MFA bypass, unauthorised access, covert surveillance, unsupported attribution or court-admissibility promises.

## 8.2 Permissible service direction

Subject to capability/authority:

- Mac security assessment
- malware/persistence/remote access review
- Apple privacy/security review within limits
- scam/phishing triage
- evidence preservation
- scoped forensic consultation
- SME Mac/M365 incident triage
- Apple fleet/JAMF/MDM security review
- company-authorised insider evidence work

## 8.3 Sector review

Keep consumer security, personal safety/stalking, SME/BEC/M365, employee/insider, family/marital, civil/commercial, corporate/IP and insurance matters separate. Ensure appropriate authority, personal safety, legal/privacy, retention, evidence, messaging, CTA and escalation controls.

## 8.4 Demand research review

Require evidence via Keyword Planner, Google Trends, GSC, GBP search terms, Outlook reports, SERP review and secure outcome data. Do not accept search-volume assertion based on intuition. Trends is relative, GSC is site visibility, and Keyword Planner is required for volume estimates.

---

# 9. Infrastructure/API/local-tool review

Claude.ai should insist that Claude Code discover/verify existing local/cloud assets before new work:

- Mac files, repositories, `~/.claude`, agents/hooks/rules/MCP, wrappers, schedulers, scripts, Docker, local data, local models/RAG, reports and docs.
- GitHub, Vercel, Supabase, Sanity, GSC, GBP, GA4, Outlook/Microsoft 365/Graph, Entra, Resend, DNS/API services.
- Existing API routes, server actions, webhooks, cron/launchd jobs, auth scopes, secrets references, rate limits, logs, health checks, data classification and dependencies.

Require `REUSE`, `REPAIR`, `REBUILD`, `RETIRE` or `OWNER_LEGAL_REVIEW` decision per component.

## Open-source/local tool candidates

Evaluate, not blindly install:

```text
Ollama
EmbeddingGemma/Qwen3 Embedding/all-MiniLM
RAGFlow
SiteOne Crawler
Lighthouse CI
Playwright
axe-core
Semgrep CE
osquery
Objective-See
Santa
Velociraptor
Plaso/log2timeline
Timesketch
YARA
ClamAV
Autopsy
The Sleuth Kit
DuckDB/SQLite/Parquet/Python
launchd/GitHub Actions
```

Require maintenance/licence/data locality/security/Apple-silicon/operator-skill/value evaluation.

---

# 10. Required Claude Code output review template

When receiving a Claude Code report, use:

```markdown
## Claim verification status
- Agent claim / source verification / runtime verification / production verification

## Six-pass review
### Objective
### Evidence
### Architecture
### Risk
### Optimisation
### Disconfirmation

## Strengths

## Unsupported or incomplete claims

## Risks and compliance issues

## Over-engineering or under-engineering concerns

## Required evidence before next action

## NOW / NEXT / LATER

## Support

## Invalidation data

## Counterfactual plan

## Rollback and outcome review requirement

## Learning updates required
```

---

# 11. Learning loop

All environments must create/read durable artifacts under the repository learning-loop structure:

```text
/docs/learning-loop/
  00-project/
  01-research/
  02-design/
  03-execution/
  04-verification/
  05-measurement/
  06-learning/
  07-governance/
```

Claude.ai should use and amend: project charter, ideal state, facts, assumptions, decisions, risks, capability/outcome/experiment registers, research evidence, six-pass review, counterfactual plans, release/outcome/variance reports, lessons, prompt/rule amendments, evaluation dataset and regression cases.

Every lesson must identify what should change in:

- Perplexity research prompt or source selection
- Claude.ai architectural/critique instructions
- Claude Code task/verification instruction
- Local tool test/configuration
- Facts/assumption/decision register
- CI/regression suite
- Future master handoff

---

# 12. Final instruction

Claude.ai is not an executor of repository/cloud truth. Its role is to improve decision quality by identifying gaps, alternatives, risks, disconfirmation and evidence requirements.

Do not conclude that a plan is good merely because it is comprehensive. The best plan is current-state-aware, evidence-backed, legally/safely scoped, local-first, cost-conscious, measured against real business outcomes, independently verified, reversible and designed to improve future Perplexity, Claude Code and local-tool behavior.
