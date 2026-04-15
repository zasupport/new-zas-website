# ZA Support — Global Standing Preferences

**Version:** 1.0 | **Last updated:** 13 April 2026
**Source:** Courtney Bentley's user preferences + accumulated standing rules

This document captures the cross-project preferences that govern ZA Support content and communications. These rules apply to every blog post, every email, every quote, every report, every WhatsApp message, and every other piece of content the business produces. They sit alongside the Perfect Blog Creator policies in `docs/POLICIES.md` and override anything that conflicts.

---

## 1. LOCALISATION & FORMAT STANDARDS

### Language
- **Spelling:** South African English throughout (organisation, optimisation, colour, programme, recognise, analyse, defence, licence as noun / license as verb)
- **NEVER use US spellings** (organization, optimization, color, program, recognize, analyze, defense, license as noun)

### Currency
- **ZAR only** — never USD anywhere in any content
- Format: R 4,499 (space after R, comma as thousands separator)
- Never use $ or "USD"

### Dates
- **DD/MM/YYYY** format only (e.g., 13/04/2026)
- **NEVER MM/DD/YYYY** (US format)
- Long form acceptable: "13 April 2026" or "13th April 2026"

### Address
- **1 Hyde Lane, Hyde Park, Johannesburg** (full address: Second Floor, Office E2004, 2196)
- **NEVER use the legacy Benoni address**
- Always reference Hyde Park as the workshop location

### Paper size
- **A4 only** (210 × 297 mm) for all printed deliverables
- **NEVER Letter** (US 8.5" × 11")

### Filenames
- Use spaces or descriptive words in deliverable filenames
- **NEVER underscores or hyphens** in filenames the user receives (different from variable/code naming)
- Example: "ZA Support Quote April 2026.pdf" not "za_support_quote_april_2026.pdf"

---

## 2. LEGAL LANGUAGE STANDARDS

### Acceptable language (use these phrasings)
- "will be opposed"
- "costs will be addressed"
- "raised at the appropriate juncture"
- "we reserve our rights"
- "without prejudice"
- "this matter will be referred"

### Forbidden phrasings (never use these)
- "we will take legal action"
- "we will take you to court"
- "we will institute proceedings"
- "we will sue"
- Any direct threat language
- Any admission of liability
- Framing payments as "debt" (use "outstanding amount" or "balance owed")

### Telephonic discussions
- **Never discuss legal matters telephonically** — always require written communication
- This applies to disputes, claims, and any matter where legal language might be needed

---

## 3. TONE PROHIBITIONS

### Banned tone words (across all content)
The following phrasings are prohibited in all blog posts, emails, quotes, reports, and any other content:

- "enterprise-grade"
- "best-in-class"
- "cutting-edge"
- "game-changer" / "game-changing"
- "revolutionary"
- "world-class"
- "robust infrastructure"
- "synergy" / "synergies"
- "leverage" (as a verb)
- "unlock the power"
- "in today's fast-paced world"
- "seamless" (overused)
- "elevate" (when used as marketing fluff)

These are detected by the blog-leak-scanner Tier 5 (toneViolations) patterns in `config/banned-content-patterns.js`.

### Preferred tone characteristics
- Direct and specific
- First-person workshop voice ("In our Hyde Park workshop", "we see", "after 15 years")
- Concrete numbers (60-70% of cases, 18 months, 52.6Wh)
- Specific product names (Thermal Grizzly Kryonaut, M3 Air, MagSafe)
- Geographic specificity (Johannesburg, Hyde Park, load shedding cycles, Cape Town vs Durban differences)
- Honest opinion ("60-70% of cases" not "most cases")
- Workshop-grounded experience ("after 15 years of repaste work")

---

## 4. CONTENT PROHIBITIONS

### Image rights
- **iFixit images:** Internal reference use ONLY, never in commercial products, never on the public website
- **Stock images:** Never use when workshop photos exist
- **Real client images:** Never publish without explicit signed consent
- **EXIF metadata:** Strip from all images before publishing (see `scripts/strip-image-exif.js`)

### Jurisdictional content
- **Never reference HIPAA** — wrong jurisdiction (use POPIA instead for medical content)
- **Never reference US regulations** — South African or EU equivalents only
- **POPIA** is the relevant data protection law for SA medical clients
- **Maximum POPIA penalty:** R 10 million (use as cost-avoidance framing in medical proposals)

### Tech stack defaults
For new development, default to:
- **Database:** PostgreSQL + TimescaleDB
- **Backend:** FastAPI or Node.js
- **Frontend:** React/Next.js
- **Cache:** Redis
- **Schema naming:** `client_id`, `device_id`, `metric_id`, `assessment_id`, `job_id`, `quote_id`
- **Time-series collection:** 5-minute intervals
- **Time-series aggregation:** 15-minute intervals
- **Data retention:** 90 days detailed, 2 years aggregated, permanent for client/device/compliance records

For the website specifically:
- **Stack:** Next.js 15 + Sanity CMS + Tailwind CSS v4
- **Hosting:** Vercel + Cloudflare

### Communications channels
- **No ALL CAPS section headings** in emails or WhatsApp
- **No `---` dividers** in emails or WhatsApp messages (`---` is forbidden as a divider in any client-facing message — use proper paragraph breaks or short subheadings instead)
- **No .txt files** for email or WhatsApp output (use rich HTML for email, native formatting for WhatsApp)

---

## 5. WORKFLOW PRINCIPLES

### Where work happens
- **Development:** Claude Code in Terminal (Health Check, Workshop PKG, codebases)
- **Documents/reports/legal:** claude.ai browser chat with auto-retry active

### Related internal automation projects (out of scope for this package)
These exist in parallel and share infrastructure but are not part of the Perfect Blog Creator:
- **Workshop media pipeline** — iPhone photo sync via iCloud Drive to docs/seo
- **Email token auto-fix** — silent system; recurring nightly task at 7pm SAST to fix MS_GRAPH_REFRESH_TOKEN in env
- **iOS Shortcut** — built via Python plistlib for workshop automation
- **Pricing Manager** — Excel spreadsheet with auto-generating website copy formulas
- **Quoting cheat sheet** — for Courtney and Mary's desk use, with objection-handling scripts
- **Pricing spreadsheet** — covers 15 service categories (some prices pending Mary's verification)
- **Master deployment runbook** — for Claude Code execution

The Perfect Blog Creator system can interoperate with these (e.g., the workshop media pipeline can feed images into the blog package's EXIF stripper) but they are managed separately.

### Operational principles
- **Always fetch live data** — never guess from memory or cached estimates
- **Audit before building** — check what exists before creating (Rule 0.1)
- **Read existing files in full** before replacing them (Rule 0.2)
- **Only update if newer AND proven** — both required (Rule 0.3)
- **Ask when unsure** — but never sit idle (Rule 0.4 + 0.5)
- **Self-healing code** — anticipate, detect, fix, verify
- **Automation over hiring** — when a task could be solved by hiring, build or automate it as a skill or system instead
- **CLAUDE.md files** — always appended, never overwritten

### Design tasks
- At the **start** of any design-related task, ask whether to brief Qaasim instead of iterating in chat
- If a design task has exceeded ~7 prompts of iteration without Qaasim being mentioned, stop and ask whether to hand it to him
- Qaasim handles: vehicle branding, graphics, layouts, posters, marketing visuals, logos, signage

### Deliverable expectations
- Executable code/runbooks, not advisory documents
- Apply Google ranking best practices (E-E-A-T, structured data, semantic HTML, internal linking, schema markup) automatically without prompting
- All recommendations and .md files must satisfy current SEO standards

---

## 6. MEDICAL CLIENT FRAMEWORK

For medical client proposals (Dr Shoul, surgeons, specialists), use this risk category framework:

### Risk categories (Critical → Low scale)

| Category | Critical state | Low state (target) |
|---|---|---|
| **Network Security** | WPA/weak password, no firewall | WPA3-Enterprise, enterprise firewall, full segmentation |
| **Email Security** | Basic ISP email, no MFA | Enterprise gateway, auto-encrypt, ATP |
| **Data & Backup** | No backup or unverified | Dual backup, monthly tested, immutable cloud, <4hr RTO |
| **Access Control** | Shared passwords, no MFA | Individual logins, MFA, access logging |
| **Device Security** | No AV, no encryption, no lock | Enterprise AV, encryption, MDM, cable locks |
| **Physical Security** | Open access, devices visible to patients | Access logs, privacy screens, cable locks, secure disposal |
| **Monitoring & Response** | No monitoring, no plans | 24/7 SOC, tested plans, <15min response |

### Package pricing logic
- 1 doctor → R 4,499/month
- 2 doctors → R 5,499/month
- 3+ doctors → R 5,999/month
- Children/family devices mentioned → add Family Extension +R 599/month

### Sample report requirement
Every client-facing service proposal must include an appendix sample report demonstrating:
1. Incident-level examples (what happened, action taken, outcome)
2. Integration with other ZA Support services (framed as benefit, not dependency)
3. Cost avoided per incident (with POPIA penalty context for medical: up to R 10M)
4. Summary statistics (events analysed, threats blocked, cost avoided vs service fee)
5. Compliance score (medical) or network health score (consumer)
6. For consumer reports: Child Safety Intelligence section (trending apps, bypass techniques, screen time)

### Medical content language
- Use POPIA, never HIPAA
- Reference SA-specific regulatory bodies and frameworks
- Cost-avoidance framing: R 10M maximum POPIA penalty per incident
- Never use US healthcare terminology

---

## 7. CONSUMER REPORT FRAMEWORK

For consumer-facing service reports:
- Network health score (instead of compliance score)
- Child Safety Intelligence section (trending apps, bypass techniques, screen time data)
- Same incident-level examples as medical reports
- Same integration framing as benefit rather than dependency

---

## 8. RELATIONSHIP TO PERFECT BLOG CREATOR

These global preferences are referenced by but separate from the blog system:

- The **blog-leak-scanner** (Tier 5: toneViolations) implements the banned tone words from Section 3
- The **blog-leak-scanner** (Tier 6: contextViolations) implements the jurisdictional rules from Section 4
- The **blog-page-wording-repair** skill respects the preferred tone characteristics from Section 3 when rewriting
- The **CLAUDE-BLOG-APPEND.md** file inherits the spelling, currency, date, and address standards from Sections 1-3

For blog-specific policies, see `docs/POLICIES.md`. For system architecture, see `docs/ARCHITECTURE.md`.

---

*ZA Support Global Standing Preferences v1.0*
*Last updated: 13 April 2026*
*Owner: Courtney Bentley | courtney@zasupport.com*
