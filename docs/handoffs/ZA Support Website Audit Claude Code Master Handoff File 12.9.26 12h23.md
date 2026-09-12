# ZA Support Website Audit Claude Code Master Handoff File 12.9.26 12h23

**Reader:** Claude Code.

**Purpose:** This is the active, project-specific, execution-oriented master handoff for the ZA Support website and connected operational infrastructure. It consolidates the material research, supplied reports, data points, later corrections, policies, generated snippets, local/open-source tool recommendations, learning rules, website requirements, forensic/security requirements, infrastructure/API discovery requirements, and Claude Code operating controls developed in this conversation.

**Repository context:** Expected project path: `/Users/cb/Developer/new-zas-website`. Confirm this through actual Git repository discovery before assuming it is correct.

**Canonical repository location:** `docs/handoffs/ZA Support Website Audit Claude Code Master Handoff File 12.9.26 12h23.md`.

**First instruction:** Read this entire document. Do not treat any prior Claude.ai JSON, Claude Code summary, Perplexity response, agent claim, hook result, source file, script report, deployment statement, historic handoff, or existing configuration as ground truth merely because it exists. Classify it as evidence, verify it against authoritative local/repository/production/cloud sources, and only then decide whether to reuse, repair, rebuild, retire, deploy, or measure it.

---

# 0. Non-negotiable operating rules

## 0.1 Read-only-first and delta-audit rule

ZA Support is not a greenfield website. Significant work may already exist on the Mac, in repositories, local Claude configuration, scripts, automation, GitHub, Vercel, Sanity, Search Console, GBP, Outlook, GA4, Supabase, APIs, and cloud accounts.

Before changes:

1. Identify actual repository root, remotes, default/deployment branch, current branch, commit, worktree status, Vercel project, production deployment, Sanity configuration, API integrations, local scripts, schedulers and data sources.
2. Compare local source, intended deployment branch, Vercel deployment and live production behavior.
3. Build a timestamped current-state delta audit.
4. Treat existing components as valuable but untrusted evidence.
5. Classify each component: `REUSE`, `REPAIR`, `REBUILD`, `RETIRE`, or `OWNER_LEGAL_REVIEW`.
6. Create an isolated branch/PR for each coherent change.
7. Never deploy/merge or change external/production systems without explicit approval.

## 0.2 Ideal-state closed learning loop

For every material task, aim for ideal evidence-backed business, technical, privacy, safety, cost, maintainability and operational outcome—not merely the immediate artifact.

```text
Goal/hypothesis
→ evidence
→ ideal-state architecture
→ assumptions and constraints
→ task contract
→ isolated implementation
→ independent verification
→ preview/approved release
→ real-world measurement
→ variance/disconfirmation analysis
→ facts/rules/tests/prompts/evaluation data updated
→ improved next iteration
```

No agent, script, hook, report or deployment may self-certify a transition. Independent evidence is mandatory.

## 0.3 Six-pass review

Before a material recommendation, code plan, implementation, release, major content change, external action, or phase completion, conduct six passes:

1. **Objective:** What real business/user outcome is required?
2. **Evidence:** What is verified, historical, inferred, hypothesis, decision-required, unknown or conflicting?
3. **Architecture:** What system/workflow/data/integration/ownership/capability/documentation is missing?
4. **Risk:** What could cause privacy, legal, safety, security, operational, cost, maintenance or reputation harm?
5. **Optimisation:** What is the smallest highest-value measurable improvement?
6. **Disconfirmation:** What could prove it wrong, what data invalidates it, and what is the counterfactual plan?

Each pass asks:

```text
In an ideal state, what is missing?
What would change?
What should be done that is not currently being done?
What would optimise or enhance the output as much as possible?
```

Classify enhancements:

```text
NOW   = necessary, high-value, low-risk or dependency-blocking
NEXT  = valuable but depends on evidence/approval/capacity/prior result
LATER = ideal-state backlog with insufficient near-term payoff
```

Only add scope when:

```text
(expected value × confidence) / (cost + complexity + risk + delay)
exceeds the implementation threshold.
```

## 0.4 Disconfirmation/counterfactual requirement

Every major task/report/PR must include:

```text
Support
Disconfirmation
Invalidation data
Counterfactual plan
Primary success metric
Guardrail metrics
Observation window
Rollback path
```

## 0.5 Zero-paid-media and local-first

Do not recommend or require paid advertising, Google Ads/AdWords spend, paid backlink services, expensive SEO suites, expensive marketing platforms, or recurring SaaS by default.

Priority:

1. Existing local Mac, source, scripts, connected services, accounts and data.
2. Free Google tools: Search Console, Trends, GBP, Google Search, Lighthouse/PageSpeed, Rich Results Test, URL Inspection, official vendor documentation.
3. Local/open-source tools/self-hosted systems.
4. Existing free tier/currently connected infrastructure where secure and maintainable.
5. Paid tools only by explicit exception after exact need, free/local failure, cost, privacy, benefit, fallback, exit and disconfirmation are documented.

## 0.6 Capability verification and deliverable completion

Never say a capability/tool/file/connector/API/service/dataset/account is unavailable without current discovery and a safe actual attempt where applicable. If it worked earlier in a session, presume available unless a current result proves otherwise.

For a requested artifact:

```text
REQUESTED_ARTIFACT
→ COMPLETE_CONTENT_READY
→ CORRECT_TOOL_SELECTED
→ TOOL_INVOKED
→ TOOL_RESULT_VERIFIED
→ ARTIFACT_NAME_CONFIRMED
→ USER_NOTIFIED
```

A prose outline is not a requested downloadable artifact.

## 0.7 Evidence states

Use:

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

---

# 1. Current unverified Claude.ai handoff intake

A Claude.ai JSON described a Phase 0 session in `new-zas-website`, branch `seo/organic-growth-infra`, claimed commits `fc63e99` and `d507ab2`, claimed `/search` and `/sitemap.xml` return 200, claimed `/api/search` returns 500 from old CSE proxy, claimed keyless rewrite exists in branch, missing GSC Python libraries, stale rating data, PAT workflow scope push blocker, and a prior-session uncommitted `.claude/`/`tools/robots` tree.

**Status:** `AGENT_CLAIM_UNVERIFIED` because Claude.ai lacks direct authenticated control/inspection of the Claude Code runtime.

Create:

```text
/docs/operating-system/AGENT-CLAIM-VERIFICATION-REGISTER.csv
/docs/operating-system/CLAUDE-AI-HANDOFF-INTAKE-12-09-2026.md
/docs/operating-system/CLAIM-VERIFICATION-EVIDENCE/
```

Fields:

```text
claim_id,claim_source,claim_timestamp,claim_text,affected_system,risk_level,
verification_method,authoritative_source,verification_status,verified_at,
evidence_artifact,result,conflict_or_limitation,next_action,owner_decision_required
```

Verify directly:

```bash
git rev-parse --show-toplevel
git remote -v
git branch --show-current
git status --short
git show --stat --oneline fc63e99
git show --stat --oneline d507ab2
git show d507ab2 -- src/app/page.tsx
npx tsc --noEmit
```

Then verify actual hook output/path ownership, Vercel production deployment/commit, live route behavior, GSC exporter failure terminus, current rating JSON/source freshness and Git push response.

Do not modify, archive, delete, commit, or wire pre-existing `.claude/`/`tools/robots` material merely to silence hooks until ownership/runtime linkage/security/test/documentation review is complete.

---

# 2. Commercial strategy

## 2.1 Organic-only website model

Use technical quality, helpful content, local relevance, genuine proof, conversion design, GBP/GSC/GA4 outcomes and controlled testing. Google prioritises helpful reliable people-first content; do not use spam, doorway, scaled low-value or link-manipulation tactics.

## 2.2 Two-engine repair strategy

| Engine | Role | Rule |
|---|---|---|
| iPhone repairs | High-volume successful acquisition/onboarding funnel; walk-ins, trust, repeat work/referrals | Preserve winning URLs, traffic and conversion flow unless controlled evidence supports change |
| Mac repairs | High-value margin: screen, battery, keyboard, trackpad, no power/charging, logic board, liquid damage, data recovery, iMac, Mac mini | Make Mac first-class; resolve cannibalisation; measure assessments/quotes/completed margin |
| Security/forensics | High-revenue authorised security assessment, investigation, evidence and business incident work | Validate demand/capability/privacy/legal/safety before publishing/growth |
| Managed IT/security | B2B service | Authority/reputation/proof matters; page rewriting alone is insufficient |

## 2.3 Mac repair priorities

1. MacBook screen repair.
2. MacBook battery replacement.
3. MacBook keyboard repair.
4. MacBook trackpad repair.
5. MacBook charging/no-power repair.
6. MacBook logic-board/component-level repair.
7. MacBook liquid-damage repair.
8. Mac data recovery.
9. iMac repair.
10. Mac mini repair.
11. Business Apple/Mac support where verified.

## 2.4 Outcome model

```text
organic landing page → qualified lead → device/service → assessment → written quote
→ approval/decline → completed job → revenue → parts/labour cost → gross margin
```

```text
SEO profit contribution = qualified leads × assessment/booking rate × quote approval rate × completion rate × gross margin
```

---

# 3. Protected commercial facts and policy

## 3.1 Separate repair metrics

These are separate accurate measures:

- 50,000+ repairs completed
- 25,000 repair operations
- 17,000 board-level repairs

Never merge/substitute or imply one is another without owner approval.

## 3.2 Establishment

Use **Established in 2009**. Remove generic “16 years” duration language. A separate founder-tenure claim needs explicit owner verification.

## 3.3 Google reviews

Use one official GBP-backed source, real time where possible or at least weekly. Record source/rating/count/fetch/display/sync/failure/last-good values. Do not hard-code competing values. Historic values 645, 632+ and 120 were reported together and require correction after fresh GBP pull. No self-serving AggregateRating markup.

## 3.4 Apple/Microsoft wording

Only after agreement/trademark/legal verification:

> ZA Support uses Apple Original Parts where applicable and is authorised to resell new Apple and Microsoft computers, Apple accessories, and Apple warranties.

Do not conflate this with AASP status.

## 3.5 Assessment fee/quote policy

| Device class | Assessment fee |
|---|---:|
| iPhone, iPad, Apple Watch | R599 excluding VAT |
| All computers including MacBook, iMac, Mac mini, Windows laptops/desktops and Microsoft computers | R899 excluding VAT |

Assessment is separate, non-refundable, not credited, not deducted, not included in repair quote and payable whether or not repair proceeds. No repair before written quote approval.

Mandatory wording:

> ZA Support charges a separate, non-refundable assessment fee to diagnose your device and determine the repair required. iPhone, iPad and Apple Watch assessments are R599 excluding VAT. All computer assessments are R899 excluding VAT. The assessment fee covers the diagnostic process and is separate from any repair cost. After assessment, ZA Support provides a written repair quotation based on the confirmed device model, fault, condition, parts required and repair complexity. The assessment fee is payable whether or not you proceed with the repair. It is not refundable and is not deducted from, credited toward, or included in the final repair quotation. No repair work begins until you approve the written repair quotation.

Prohibited:

```text
assessment fee waived if repaired
assessment fee included in total
assessment fee credited toward repair
assessment fee refundable
assessment fee deducted from repair price
```

Required booking acknowledgement:

> ☐ I understand that the assessment fee is a separate, non-refundable diagnostic charge: R599 excluding VAT for iPhone, iPad and Apple Watch, or R899 excluding VAT for computers. It is not credited toward any repair quotation. ZA Support will provide a repair quotation after assessment, and no repair will proceed without my approval.

---

# 4. Historical artefacts and website evidence

Review and preserve/reconcile:

```text
competitor-deep-audit.json
COMPETITORS.md
BASELINE-REPORT.md
COMPETITOR-GAP-AUDIT.md
EXECUTE-ALL-SUMMARY.md
GBP-CATEGORIES.md
homepage.html
LOUD-DEFINITION.md
sitemap.xml
robots.txt
GSC-INSIGHTS.md
REALISED-TRAFFIC.md
SERP-JHB-GEOLOCATED-PASS.md
```

Historical reported stack: Next.js App Router, Vercel, Sanity CMS, apex canonical, robots and sitemap. Around 838 sitemap URLs; 538 blog posts; liquid 55, logic-board 52, screen 49, battery 49, iPhone 22, MacBook 10. Potential service×suburb/model doorway/cannibalisation risk. Sitemap lastmod uniform build timestamp. Meta keywords and title/OG mismatch reported. Substantial JSON-LD existed; no AggregateRating; ItemList allegedly added in commit `da20026`.

Historic homepage included conflicting reviews, “16 years,” “Since 2009,” up-to-3-year warranty, indicative pricing, old assessment-fee wording and price-review complaint. Validate current rendering/source before editing.

---

# 5. Current website and SEO evidence

Live homepage access confirmed significant deployed service presence: MacBook, logic board, liquid damage, iPhone/iPad/Apple Watch repair, JAMF/MDM, managed IT, assessment/call/WhatsApp CTAs, Hyde Park identity.

Earlier public fetch failure for search/sitemap is historical and must not be treated as live source truth. Reproduce with current browser/API/Vercel checks.

## 5.1 Historical 90-day GSC

| Service | Clicks/90d | Approx/month | Avg position |
|---|---:|---:|---:|
| Blog | 1053 | 351 | 12.6 |
| Battery | 487 | 162 | 15.7 |
| iPhone | 406 | 135 | 19.0 |
| Screen | 388 | 129 | 11.9 |
| MacBook/Mac | 98 | 33 | 22.4 |
| Logic board | 31 | 10 | 12.1 |
| Liquid damage | 23 | 7.7 | 14.0 |
| Managed IT/UniFi | 19 | 6.3 | 21.3 |
| Formal forensics | 0 | 0 | — |

Historic query opportunities: `managed it services johannesburg` 1278 impressions/10.6/0 clicks; `iphone battery replacement` 2196/9.2/41; `iphone battery replacement cost` 1999/6.9/20; `iphone screen repair` 1121/11.7/22; `macbook battery replacement` 595/15/11; Apple repair terms ~1150 combined at 15–16.

## 5.2 Historical JHB SERP calibration

| Query | Observed ZA position |
|---|---|
| macbook repair johannesburg | #1 homepage, #2 apple-repair, #7 contact |
| macbook logic board repair johannesburg | #1 homepage, #2 logic-board, #4 blog, #7 model page |

Genious did not appear in sampled JHB organic. Do not pad/rebuild winning pages just to match competitor word count. Calibrate to current exact query/location/surface.

## 5.3 Current GSC sample

| Query | URL | Clicks | Impressions | Position |
|---|---|---:|---:|---:|
| macbook repairs johannesburg | `/` | 17 | 110 | 2.06 |
| macbook repair near me | `/` | 13 | 530 | 6.16 |
| macbook repair | `/` | 12 | 547 | 6.21 |
| macbook repairs | `/` | 12 | 527 | 5.70 |
| macbook screen repair | `/` | 7 | 267 | 5.37 |
| macbook battery replacement | `/` | 2 | 284 | 12.02 |
| macbook battery replacement | battery/macbook-air | 2 | 394 | 16.44 |
| macbook trackpad not clicking | blog | 1 | 183 | 21.52 |

Likely cannibalisation across home, hub, blog, model and location routes. Build current map before expansion. No hacking/security terms surfaced in returned top 1000 query×page rows; this is current site visibility baseline, not South Africa demand conclusion.

---

# 6. Onsite search P0

Test current live/source/preview behavior for:

```text
/search?q=Logic%20board
/api/search?q=logic
/api/search?q=logic-board
/api/search?q=
/search?q=MacBook%20liquid%20damage
```

Also test empty/no result/deep load/back-forward/keyboard/mobile/result-click.

Requirements:

- Relevant service/blog/guide result set.
- Accessible title/type/excerpt/URL/keyboard behavior.
- Input normalisation, escaping, bounded size, no injection.
- Prefer generated static index (Pagefind/native JSON) when sufficient; server search only where necessary.
- No search query crawl trap/thin indexable pages; intentional noindex/canonical policy.
- Privacy-minimised telemetry.
- SearchAction schema only if fully functional.
- Playwright/unit tests in CI.

---

# 7. Mac/iPhone architecture and cannibalisation

```text
Apple Repairs
├── iPhone Repair: screen, battery, charging, liquid, verified related repairs
├── Mac Repair: MacBook hub, screen, battery, keyboard, trackpad, charging/no-power,
│   logic board, liquid damage, data recovery, iMac, Mac mini
├── iPad
├── Apple Watch
├── Assessment/booking/quote
├── Guides/answers/case studies
├── Security & Forensics
└── Business/Managed IT
```

Create:

```text
/docs/seo/KEYWORD-PAGE-MAP.csv
/docs/seo/CANNIBALISATION-REGISTER.csv
/docs/seo/CONTENT-INVENTORY.csv
/docs/seo/REDIRECT-REGISTER.csv
```

Fields:

```text
query_cluster,primary_intent,device,service,location_scope,canonical_target_url,
current_ranking_urls,current_clicks,impressions,ctr,avg_position,conversions,
completed_jobs,revenue,gross_margin,cannibalisation_status,recommended_action,
confidence,evidence_date
```

Actions only after evidence: retain/differentiate/strengthen/consolidate/redirect/noindex. Never bulk noindex/redirect existing location/model pages. Dry-run and measure 28/56 days.

---

# 8. Google Business Profile and historical performance

GBP is a primary local search/conversion/reputation/historical intelligence system.

Create:

```text
/docs/seo/GBP-CURRENT-STATE-AUDIT.md
/docs/seo/GBP-SERVICE-INVENTORY.csv
/docs/seo/GBP-KEYWORD-PERFORMANCE.csv
/docs/seo/GBP-CHANGE-PERFORMANCE-LEDGER.csv
/docs/seo/GBP-WORDING-AND-CLAIMS-AUDIT.md
```

Audit identity/NAP/hours/service areas/categories/services/description/links/reviews/media/posts/Q&A/search/maps metrics/search terms/calls/directions/site clicks/history and site/facts/capability consistency.

Verify whether current GBP contains:

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

Previous category candidates were: Computer repair service primary; additional categories only if truthful/current: Computer support and services, Data recovery service, Mobile phone repair shop, Screen repair service, Computer consultant, Computer networking service, Computer security service, Electronics repair shop.

Never alter GBP automatically. Every service needs genuine capability, matching website page, safe intake and approved wording.

Extract Outlook GBP history read-only for terms such as Google Business Profile/My Business/Maps/Performance/reviews/search terms/calls/directions/website clicks/reports/updates. Record email provenance/period/attachment hash/metric/confidence.

---

# 9. Change-to-outcome history

Create:

```text
/docs/operating-system/CHANGE-PERFORMANCE-LEDGER.csv
/docs/operating-system/HISTORICAL-BASELINE.md
/docs/operating-system/GBP-PERFORMANCE-LEDGER.csv
/docs/operating-system/SEARCH-CONSOLE-HISTORY.csv
/docs/operating-system/ANALYTICS-CONVERSION-HISTORY.csv
/docs/operating-system/OUTLOOK-GBP-INTELLIGENCE.md
/docs/operating-system/SEO-EXPERIMENT-REGISTER.md
/docs/operating-system/RELEASE-TO-OUTCOME-MAP.md
```

Link:

```text
Git commit/PR → Vercel deployment → routes/templates → GBP change → GSC/GBP/GA4
→ calls/WhatsApp/booking → assessment/quote/completed job/margin → decision/lesson
```

Use local GSC API exports/CSV/SQLite/DuckDB/Parquet/Python first. BigQuery is optional later and does not backfill historical data; explicit cost approval is required.

Also use controlled SERP snapshots, URL Inspection history, field CWV, onsite search logs, reviews/service-topic analysis, existing CTA `data-ref`/UTM attribution and quote-loss reason taxonomy.

---

# 10. Security and advanced forensics

## 10.1 High-revenue directive

Advanced digital forensics, Mac/Apple suspected compromise assessments, malware/remote-access investigation, SME incident triage, M365 compromise response, evidence preservation, insider-risk support and authorised legal/business consultation are high-revenue growth areas.

## 10.2 Absolute exclusions

Do not offer or claim:

- Apple Account/Apple ID recovery.
- Activation Lock/Find My/passcode/MFA/two-factor bypass.
- Unauthorised account/device access.
- Covert spouse/employee surveillance.
- Unsupported attacker attribution, hacking proof or surveillance confirmation.
- Guaranteed malware detection/removal.
- Automatic court admissibility/legal/criminal/liability conclusions.

Apple Account content is Apple-first educational/security guidance only—not a recovery service CTA.

## 10.3 Permitted with documented authority/capability

- Customer-authorised Mac security assessment.
- Mac malware/persistence/remote access review.
- Apple-device privacy/security review within actual limits.
- Scam/phishing triage.
- Evidence preservation.
- Scoped digital forensic consultation.
- Business Mac/M365 incident triage.
- Apple fleet/JAMF/MDM security review.
- Company-authorised insider-risk/employee evidence work.

## 10.4 Keyword appetite research clusters

Research South Africa first, then Gauteng/JHB/Pretoria where supported. Use Keyword Planner, Trends, GSC, GBP, Outlook, SERP review and secure outcomes.

Consumer account-guidance-only examples:

```text
apple id hacked
apple account hacked
icloud hacked
my apple id has been hacked
someone has access to my iphone
unknown device on apple id
apple id locked
apple account recovery
apple charges I don't recognise
```

Suspected compromise examples:

```text
has my mac been hacked
has my macbook been hacked
has my iphone been hacked
how do i know if my iphone is hacked
how do I know if my mac is hacked
someone controlling my mac
iphone hacked remotely
mac hacked remotely
can someone access my mac remotely
```

Spyware/safety:

```text
spyware on iphone
iphone spyware check
how to check iphone for spyware
mac spyware check
stalkerware iphone
phone being monitored
partner monitoring iphone
someone tracking my iphone
airtag stalking
iphone safety check
```

Malware/scam/phishing:

```text
mac virus removal
mac malware removal
apple virus
iphone virus
iphone hacked pop up
mac security warning scam
apple phishing email
apple id phishing
apple scam message
fake apple support call
apple security alert scam
```

Evidence/privacy/formal terms:

```text
iphone forensic analysis
mac forensic analysis
digital forensic investigation iphone
apple device evidence
recover deleted iphone messages
iphone privacy breach
mac privacy breach
icloud photos accessed
iphone data stolen
```

SME/business terms:

```text
macbook hacked business
apple device security incident
small business cyber attack
business email compromised
microsoft 365 hacked business
mac security audit
macbook security assessment
apple device security audit
jamf security audit
mac endpoint security
microsoft 365 account hacked
office 365 email hacked
business email takeover
digital forensics johannesburg
cyber forensic investigation
computer forensic analysis
email forensic investigation
cyber incident investigation south africa
```

Do not publish every term/page. Validate demand/capability/operational/privacy/legal/safety fit.

## 10.5 Required report

Create:

```text
/docs/seo/security-keyword-appetite-report.md
/docs/seo/security-keyword-appetite.csv
/seo/config/security-intent-taxonomy.json
```

Required CSV fields:

```text
keyword,variant_group,cluster,audience,platform_or_account,intent,anxiety_level,
safety_risk,commercial_fit,keyword_planner_location,keyword_planner_avg_monthly_searches,
keyword_planner_range_or_confidence,three_month_change,yoy_change,trends_direction,
trends_related_queries,trends_regional_signal,current_gsc_impressions,current_gsc_clicks,
current_gsc_ctr,current_gsc_position,current_ranking_url,serp_features,serp_top_domains,
proposed_canonical_url,existing_content_status,conversion_hypothesis,
operational_capability_verified,legal_privacy_approval,priority,notes,data_date
```

## 10.6 Sector separation

Separate consumer security, personal safety/stalking, SME/BEC/M365, employee theft/insider risk, family/marital evidence, civil/commercial legal evidence, corporate/IP theft, lost/stolen managed devices and insurance/incident validation.

Require sector-specific safe messaging, scope, CTA, authority, consent, retention, access, evidence, escalation and confidentiality.

Before legal/family/employee/IP forensic work establish authority-to-examine, matter classification/conflict check, scope, chain custody, acquisition/hashing, secure storage/access/retention/deletion, POPIA/legal review, escalation paths and limitations.

---

# 11. Local infrastructure discovery/API audit

Build a read-only, privacy-preserving `za-infrastructure-discovery-audit` with timestamped outputs:

```text
~/Desktop/Claude/Infrastructure-Audit/YYYY-MM-DD_HHMMSS/
  MANIFEST.json
  EXECUTIVE-SUMMARY.md
  COMPONENT-INVENTORY.csv
  REPOSITORY-INVENTORY.csv
  SCRIPT-INVENTORY.csv
  SCHEDULER-INVENTORY.csv
  CLAUDE-CONFIG-INVENTORY.csv
  LOCAL-AI-INVENTORY.csv
  WEBSITE-INFRASTRUCTURE.md
  CLOUD-CONNECTOR-INVENTORY.md
  SECURITY-FINDINGS.md
  DEPENDENCY-FINDINGS.md
  DOCUMENTATION-INVENTORY.csv
  DATA-ARTIFACT-INVENTORY.csv
  IDEAL-STATE-GAP-REGISTER.csv
  REUSE-REPAIR-REBUILD-RETIRE.csv
  UNVERIFIED-ASSUMPTIONS.md
  COMMAND-LOG.txt
  CHECKSUMS.sha256
```

Metadata-first. Do not read/expose Keychain, browser profiles, Messages, Mail cache, Photos, device backups, forensic evidence, password managers, private SSH keys, secret directories or mounted volumes without explicit allowlisting. Inventory secret names/references/permissions/risk only.

Audit known repositories, `~/.claude`, rules, hooks, agents, MCP, wrappers, scripts, schedulers, Docker, databases/data reports, local AI/RAG, dependencies, docs, GitHub, Vercel, Supabase, Sanity, GSC, GBP, GA4, Outlook/M365, Entra, Resend, DNS and existing API services.

Create:

```text
/docs/operating-system/API-SERVICE-INVENTORY.csv
/docs/operating-system/API-DEPENDENCY-GRAPH.md
/docs/operating-system/API-SECURITY-GAP-REGISTER.csv
/docs/operating-system/API-CHANGELOG.md
/docs/operating-system/API-TEST-MATRIX.md
```

API fields:

```text
api_id,service_name,provider_or_local_service,purpose,owner,repository_or_local_path,
environment,endpoint_or_route_pattern,inbound_or_outbound,authentication_method,
credential_reference_only,scopes_or_permissions,data_classes_processed,personal_data_risk,
forensic_or_security_data_risk,rate_limit_or_quota,webhook_or_scheduler_dependency,
upstream_dependencies,downstream_dependencies,health_check,test_coverage,last_verified_at,
evidence_artifact,cost_model,active_dormant_or_unknown,security_status,
documentation_status,reuse_repair_rebuild_retire_decision,notes
```

Audit Next.js routes/server actions/Vercel functions/cron, Supabase, Sanity, GSC/GBP/GA4/Maps, Outlook/Graph/Entra, Resend, GitHub, MCP/Ollama/local RAG/vector DB, webhooks, search, CRM/POS/payment/booking if present.

---

# 12. Local/open-source tools

Evaluate rather than blindly install. Confirm licence, current maintenance, Apple-silicon compatibility, local data handling, security, maintenance burden and measurable value.

```text
Ollama
EmbeddingGemma / Qwen3 Embedding / all-MiniLM
RAGFlow
SiteOne Crawler
Lighthouse CI
Playwright
axe-core
Semgrep CE
osquery
Objective-See tools
Santa
Velociraptor
Plaso/log2timeline
Timesketch
YARA
ClamAV
Autopsy
The Sleuth Kit
DuckDB
SQLite
Parquet
Python
launchd
GitHub Actions
```

Local RAG must have hybrid BM25+embedding retrieval, citations/no-source-no-claim, model/corpus versioning, access/matter isolation and no sensitive leakage.

---

# 13. Learning-loop files and automation

Create within repo:

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

Required artifacts: task manifest, preflight report, research evidence, six-pass review, branch report, change spec, verification report, preview validation, release record, 7/28/56/90 outcome review, variance analysis, regression case and capability incident.

Use Claude Code hooks, Git hooks, GitHub Actions, Vercel records and launchd jobs. Never rely on agent-memory/self-written PASS alone.

Task manifest seed:

```yaml
task_id: ZA-YYYYMMDD-NNN
title: ""
request_source: perplexity | claude_ai | owner | github_issue | scheduled_audit
goal: ""
ideal_state: ""
primary_metric: ""
guardrail_metrics: []
baseline_sources: []
verified_facts: []
historical_facts: []
assumptions: []
unknowns: []
non_goals: []
scope:
  repositories: []
  files: []
  routes: []
  external_services: []
six_pass: {}
support: []
invalidation_data: []
counterfactual_plan: ""
test_plan: []
verification_plan: []
rollback_plan: ""
observation_windows_days: [7, 28, 56, 90]
learning_outputs: []
```

---

# 14. Required execution order

1. Read whole file.
2. Build Claim Verification Intake for the supplied Claude.ai handoff.
3. Perform six-pass review and read-only infrastructure/API/production baseline.
4. Create/update facts, assumptions, decisions, capabilities, tools/APIs and historical-performance records.
5. Verify active repo/branch/commits/Vercel/Sanity/current source-to-production drift.
6. Reproduce/fix onsite search only in branch with tests/preview.
7. Apply already owner-approved wording/fee/review/establishment updates only in permitted draft scope; do not deploy without approval.
8. Restore/verify GSC data export and build current GSC/GBP/Outlook/GA4/release history.
9. Protect iPhone acquisition while improving Mac primary architecture from verified cannibalisation evidence.
10. Audit current GBP including security/forensics service wording.
11. Build security/forensics demand/capability/privacy/legal/safety matrix.
12. Adopt local/open-source components only after value/security/maintenance evaluation.
13. Implement CI/scheduled audit/evidence/learning infrastructure.
14. Produce PR/preview evidence/owner decision list/rollback and outcome measurement plan.

---

# 15. Completion rule

No task is complete because a page, report, script, PR, deployment, API, local model, connector or automation exists.

Complete only after current state is independently verified; scoped work is tested; evidence artifacts exist; preview/production behavior is read back; actual result is measured against baseline and guardrails; variance/disconfirmation is analysed; and facts, assumptions, decisions, tests, prompts, evaluation data and lessons are updated.
