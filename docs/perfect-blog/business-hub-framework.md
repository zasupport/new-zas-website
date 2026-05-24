# Business Hub Framework — zasupport.com/business

**Instruction (T2):** Research and find the Claude Code tasks related to building a business hub framework and execute all the pages that need to be created per the framework Claude Code recommended.

**Date:** 24 May 2026
**Source data:** v1_ZA_Support_Specialist_Service_Intake_Reviewed_23_5_26.xlsx (Courtney's reviewed answers, 30 questions, full SEO keyword targets)
**Status:** 6 pages approved (Y) in the spreadsheet; specifications below ready for Claude Code execution

---

## 1. The approved page set

From `Page Approval` sheet of the v1 reviewed intake — all 6 marked "Y":

| # | Page | URL slug | Placement | Cluster role |
|---|---|---|---|---|
| 1 | UniFi Network Services | `/business/unifi-network-services` | /business sub-page | Pillar (own primary keyword) |
| 2 | Adobe Creative Cloud Support | `/business/adobe-creative-cloud-support` | /business sub-page | Pillar |
| 3 | Microsoft 365 for Business | `/business/microsoft-365-for-business` | /business sub-page | Pillar |
| 4 | Architecture & CAD IT | `/business/architecture-cad-it` | /business sub-page | Pillar (vertical) |
| 5 | Creative & Media Production IT | `/business/creative-media-production-it` | /business sub-page | Pillar (vertical) |
| 6 | Specialist Software Support (parent hub) | `/business/specialist-software-support` | /business sub-page | Hub (links to all 5 above) |

Plus the top-level `/business` index page if it doesn't already exist — confirms via the existing sitemap audit.

---

## 2. Per-page specification

Each page follows the same structural template, populated from the v1 intake answers. Word count target: **1,800-2,500 words per page** (well above 800-word threshold per post-quality-universal-enforcement Layer A).

### Page 1 — UniFi Network Services

**URL:** `/business/unifi-network-services`
**Primary keyword:** UniFi installer Johannesburg
**Secondary keywords:** Ubiquiti partner South Africa, UniFi network installation Gauteng, managed UniFi services
**Trust signal anchor:** 1,100+ UniFi deployments since 2014, UEWA + UBWS certified

**Section structure:**

1. **H1 + intent-matching opener** (~120 words) — "UniFi network installer in Johannesburg with 1,100+ deployments since 2014. Site survey, design, supply, install, monitor, manage. Ubiquiti partner with UEWA and UBWS certification."
2. **What we do** — from Q7 answer: site survey (Ekahau/NetSpot heatmap), VLAN architecture, SSID strategy, security, deployment, monitoring
3. **Site types we serve** — from Q9: medical practices, legal, retail (multi-store + POS), warehouses, estates, hospitality
4. **Project work vs managed service** — from Q10: both delivered; managed scope (24/7 monitoring, firmware, AP swap)
5. **Accreditations and trust signals** — Ubiquiti partner, UEWA, UBWS, distribution channel relationship
6. **Workshop data / proof** — 1,100+ deployments since 2014, reference list under NDA (per Layer A — first-hand experience signal)
7. **FAQ section** — 5 questions with FAQPage schema (e.g. "How long does a UniFi installation take?", "Do you supply the hardware?", "Can you take over an existing UniFi network?")
8. **Pricing model** — From "starting price" with call-out for site survey; matches phone-call-conversion model
9. **Internal links** — to /business hub, to managed-services page, to architecture-cad-it (network for design firms), to medical practice IT
10. **Call to action** — phone number prominent (064 529 5863), contact form secondary

**Schema:**
- `Service` schema (serviceType: "UniFi Network Installation and Management", areaServed: "Johannesburg, Gauteng, South Africa")
- `LocalBusiness` schema (Hyde Park address, phone, hours)
- `FAQPage` schema for FAQ section
- `BreadcrumbList`: Home → Business → UniFi Network Services
- `Organization` schema with `sameAs` social profiles

**Content source:** intake Q7-Q11 (4 questions, ~2,000 words of source material — easily 2,000-word page)

---

### Page 2 — Adobe Creative Cloud Support

**URL:** `/business/adobe-creative-cloud-support`
**Primary keyword:** Adobe Creative Cloud partner Johannesburg
**Secondary keywords:** Adobe deployment South Africa, Adobe MDM deployment Gauteng, Adobe Solutions Partner
**Trust signal anchor:** Adobe Solutions Partner designation, Adobe Certified Professional engineers, Authorised Reseller

**Section structure:**

1. **H1 + opener** — "Adobe Solutions Partner in Johannesburg. Adobe Creative Cloud licence supply, MDM deployment, troubleshooting, training. Adobe Certified Professional engineers."
2. **What we do** — from Q12: end-to-end Adobe CC delivery, identity federation with Entra ID, SCIM provisioning, update channel management
3. **Partner status** — from Q13: Solutions Partner, Authorised Reseller, named ACP engineers
4. **Managed and MDM-deployed** — from Q14: packaged via Intune (Windows + macOS) and Jamf Pro, centralised licence via Admin Console
5. **Apps we support** — from Q15: Photoshop, InDesign, Illustrator, After Effects, Premiere Pro, Acrobat Pro, Lightroom + lower-volume Substance/Animate/Audition
6. **Workshop data** — typical deployment scale, named-sector experience (architecture, photography, video production)
7. **FAQ** — 5 questions ("Can you migrate our existing Adobe licences?", "Do you handle Creative Cloud for Education plans?")
8. **Pricing** — From; depends on tenant size and managed scope
9. **Internal links** — Microsoft 365 page (paired stack), architecture-cad-it (Adobe + CAD), creative-media-production-it (Adobe + Final Cut)
10. **CTA**

**Schema:** Same template as Page 1, swap `serviceType` to "Adobe Creative Cloud Deployment and Support"

**Content source:** intake Q12-Q15

---

### Page 3 — Microsoft 365 for Business

**URL:** `/business/microsoft-365-for-business`
**Primary keyword:** Microsoft 365 partner Johannesburg
**Secondary keywords:** Microsoft 365 Business Premium South Africa, **Microsoft 365 Mac specialist Johannesburg** (the biggest differentiator per Q18), Microsoft 365 Apple Mac South Africa
**Trust signal anchor:** Microsoft Solutions Partner (Modern Work + Security + Business Apps + Infrastructure designations to confirm), CSP, Microsoft Cloud Partner tier

**Section structure:**

1. **H1 + opener** — "Microsoft 365 partner in Johannesburg. The single Apple-first Microsoft Partner in South Africa. Full M365 stack on Mac and iPhone with Intune, Entra ID, Defender, Purview."
2. **The differentiator** — Q18: Apple-first Microsoft partner; most SA Microsoft partners are Windows-first and treat Mac and iPhone as second-class
3. **What we deliver** — from Q16: tenant deployment (Business Premium, E3, E5, F1, F3), Entra ID hardening, Intune for Mac and iPhone, Defender XDR, Purview, Teams Phone, Sentinel
4. **Solutions Partner designations** — from Q17: Modern Work, Security, Business Apps, Infrastructure (confirm and badge)
5. **Apple-specific capability** — from Q18: Intune + ABM linkage, ADE enrolment, macOS configuration profiles, Conditional Access for Mac, Defender for Endpoint on macOS
6. **Standalone projects + managed** — from Q19: both; project scope (tenant setup, migration, Intune rollout), managed scope (service desk, licence audit, security baseline maintenance)
7. **Migrations** — from Q20: Google Workspace, hosted cPanel (H4A/Afrihost/Webafrica), Exchange on-prem, IMAP, MAPI for legacy PST archives
8. **Workshop data** — named migration types delivered, typical fleet size
9. **FAQ** — 5 questions (M365 Mac vs Windows, ABM linking, migration timing)
10. **Pricing** — From; depends on user count and licence mix
11. **Internal links** — Adobe page, UniFi (network underpins M365), medical-practice-it (POPIA + Defender + Purview)
12. **CTA**

**Schema:** Same template, `serviceType` "Microsoft 365 Deployment and Managed Services"

**Content source:** intake Q16-Q20 (rich content, 2,500-word page achievable)

---

### Page 4 — Architecture & CAD IT

**URL:** `/business/architecture-cad-it`
**Primary keyword:** architecture practice IT Johannesburg
**Secondary keywords:** Mac for architects Johannesburg, ArchiCAD performance Mac Gauteng, Vectorworks support Johannesburg, CAD Mac specification South Africa
**Trust signal anchor:** Active architecture and design-firm clients in Johannesburg, Pretoria, Sandton, Rosebank, Hyde Park

**Section structure:**

1. **H1 + opener** — "IT specialists for architecture and design practices in Johannesburg. Mac specification for CAD and BIM, software licensing, performance optimisation, managed IT."
2. **CAD packages we support** — from Q21: AutoCAD for Mac, Vectorworks (Designer/Architect/Landmark/Spotlight/Fundamentals), ArchiCAD + BIMcloud, SketchUp Pro/Studio, Rhino + Grasshopper
3. **What we do** — from Q22: install, licensing, performance optimisation, hardware spec, troubleshooting, training
4. **Mac hardware tiers for CAD** — from Q25: Mac mini M4 Pro for 2D, MacBook Pro M4 Pro/Max for mobile, iMac M4 for studio, Mac Studio M4 Max/Ultra for BIM and 3D rendering
5. **Active clients** — from Q23: Johannesburg, Pretoria, Sandton, Rosebank, Hyde Park
6. **Project vs managed** — from Q24: both
7. **Workshop data** — practice sizes (single-practitioner to 30+ designers)
8. **FAQ** — 5 questions
9. **Pricing** — From
10. **Internal links** — Adobe page, M365 page, UniFi (network for collaborative BIM), Mac hardware specification
11. **CTA**

**Schema:** Same template

**Content source:** intake Q21-Q25

---

### Page 5 — Creative & Media Production IT

**URL:** `/business/creative-media-production-it`
**Primary keyword:** production studio IT Johannesburg
**Secondary keywords:** Final Cut Pro support Johannesburg, video production IT support Johannesburg, music production studio IT South Africa, post-production Mac Gauteng
**Trust signal anchor:** Active creative studio, video, music, podcast clients including live broadcast and event production

**Section structure:**

1. **H1 + opener** — "IT specialists for video, music, and podcast production studios in Johannesburg. Mac specification, storage architecture, software lifecycle, managed IT."
2. **Apps we support** — from Q26: Final Cut Pro, Motion, Compressor, Logic Pro, MainStage, DaVinci Resolve Studio, Affinity, Cinema 4D, Blender, Maya, ZBrush, Pro Tools, Ableton Live, Reason, Native Instruments, Pixelmator Pro
3. **What we do** — from Q27: install, licensing, performance + storage optimisation, Mac spec, troubleshooting, plug-in management, training
4. **Storage and backup** — from Q29: Thunderbolt 4 RAID, Synology/QNAP NAS, 10 GbE / 25 GbE, Blackmagic Cloud Pod
5. **Active clients** — from Q28: single-creator to 15-suite production houses, live broadcast experience
6. **Project vs managed** — from Q30: both; managed scope includes plug-in lifecycle and storage health
7. **Workshop data** — fleet scale, sector specificity
8. **FAQ** — 5 questions
9. **Pricing** — From
10. **Internal links** — Adobe page, UniFi (10 GbE backbone), architecture-cad-it (overlap on Cinema 4D + Blender), Mac hardware
11. **CTA**

**Schema:** Same template

**Content source:** intake Q26-Q30

---

### Page 6 — Specialist Software Support (parent hub)

**URL:** `/business/specialist-software-support`
**Primary keyword:** specialist software support Johannesburg
**Role:** Hub page linking to all 5 pillars above PLUS additional vertical software (Sage, Pastel, Xero, Lightroom — anything not big enough for its own page)

**Section structure:**

1. **H1 + opener** — "Specialist software support across Adobe Creative Cloud, Microsoft 365, architectural and CAD software, creative and media production tools, and vertical industry applications."
2. **Cluster overview** — links to each of the 5 pillar pages with one-paragraph description and primary use case
3. **Other software we support** — accounting (Sage, Pastel, Xero), database (FileMaker), specialist verticals (medical practice management, legal practice software)
4. **What our specialist support means** — installation, licensing, MDM deployment, troubleshooting, training, integration with broader IT stack
5. **Why a single specialist matters** — versus multiple disconnected providers
6. **Workshop data** — named software ecosystem, fleet scale
7. **FAQ**
8. **Internal links** — every other business page
9. **CTA**

**Schema:**
- `CollectionPage` schema with `hasPart` array linking to the 5 pillar pages
- `Service` for the parent service
- `BreadcrumbList`, `Organization`, `LocalBusiness`

---

## 3. The /business hub index page (if missing)

The top-level `/business` page acts as the entry point. If it exists, audit for consistency with the new pillar pages. If not, build it:

**URL:** `/business`
**Primary keyword:** Apple IT services for business Johannesburg
**Role:** Hub of hubs — links to the 6 sub-pages plus existing managed-services, medical-practice-it, security/compliance pages

Structure:
1. **H1 + opener** — "Apple IT services for South African businesses. Microsoft 365 + Adobe + UniFi + Mac fleet, delivered by an Apple Authorised IT Specialist + Microsoft Partner."
2. **Service grid** — visual links to each of the 6 sub-pages
3. **Why Apple-first business IT** — the differentiator narrative (Q18)
4. **Industries we serve** — medical, legal, financial, architecture, creative, retail
5. **Accreditations strip** — Apple AIS + Microsoft Solutions Partner + Adobe Solutions Partner + Ubiquiti partner badges
6. **Trust signals** — 633 reviews 4.9 stars, 17 years, BEE Level 1
7. **CTA**

---

## 4. The research methodology applied

From the v1 reviewed sheet `Research Methodology`:

| Stage | Method |
|---|---|
| 1. Primary intent mapping | Every service page targets ONE primary buyer-intent search |
| 2. Google Autocomplete harvest | suggestqueries.google.com/complete/search?client=firefox&q={keyword} |
| 3. People Also Ask harvest | Scrape PAA cluster for each primary keyword via web search |
| 4. Competitor SERP analysis | Capture top 10 ranking results, structure analysis |
| 5. Local pack qualification | Identify which keywords trigger the Google local pack (LocalBusiness schema) |
| 6. Vertical-specific long-tail | {service} + {vertical}: e.g. "Microsoft 365 for medical practice Johannesburg" |
| 7. Buyer-intent vs research-intent split | Separate commercial-intent keywords from informational |

**Each page is built using this methodology against its primary keyword.** The intake answers already contain the primary and long-tail keywords — methodology produces additional PAA clusters and competitor-gap keywords.

---

## 5. Claude Code execution plan

Self-contained runbook for Claude Code to build all 6 pages plus hub:

### Phase A — Scaffolding (Day 1)

1. Create directory structure under `<repo>/app/business/`:
   ```
   app/business/page.tsx                                    # /business index
   app/business/unifi-network-services/page.tsx
   app/business/adobe-creative-cloud-support/page.tsx
   app/business/microsoft-365-for-business/page.tsx
   app/business/architecture-cad-it/page.tsx
   app/business/creative-media-production-it/page.tsx
   app/business/specialist-software-support/page.tsx
   ```
2. Create shared component `components/BusinessPageTemplate.tsx` that renders the 10-section structure consistently
3. Create shared `components/BusinessPageSchema.tsx` for the schema JSON-LD block
4. Add nav entries to site header / footer

### Phase B — Per-page content (Days 2-5)

For each of the 6 pages:
1. Load corresponding intake answers from `handoffs/service-intake-v1-reviewed.json`
2. Run research methodology stages 2-6 against the primary keyword
3. Populate the BusinessPageTemplate with intake-sourced content
4. Add 5 FAQ Q&As (real customer questions, not invented)
5. Validate against post-quality-universal-enforcement skill (6 layers)
6. Run substantive-update-check style gate (≥800 words for service pages, valid schema, internal links)

### Phase C — Schema and SEO (Day 6)

1. JSON-LD blocks per page (Service + LocalBusiness + FAQPage + BreadcrumbList + Organization)
2. Open Graph + Twitter Card meta per page
3. Canonical URLs
4. Sitemap.xml inclusion (auto-generated from Next.js `app/sitemap.ts`)
5. robots.txt validation

### Phase D — Internal linking pass (Day 7)

1. Each business page links to 2-3 sibling business pages
2. Each business page links to at least 3 relevant blog posts
3. Existing blog posts in matching clusters get linked-to-from the new business pages
4. Sitewide footer updated to include /business hub link

### Phase E — Deploy + verify (Day 8)

1. Vercel preview deployment
2. Run comprehensive-gate.sh against the new pages
3. Live URL fetch and schema validation via Rich Results Test
4. Production promote
5. Sitemap re-submission to GSC

---

## 6. Safety net (T6)

Every page commits to a versioned snapshot before any edit:

- Pre-edit snapshot to `logs/business-hub-versions/<timestamp>/<slug>.json`
- Sanity document revisions retained per Sanity defaults
- Git commit per phase with clear message
- Vercel preview before production promote (rollback = redeploy previous)

If any phase produces a regression in GSC impressions for related blog posts, the snapshot enables one-command rollback.

---

## 7. Verification status

Per HR Always-Verify:

| Claim | Status | Verify command |
|---|---|---|
| 6 pages approved Y in v1 reviewed sheet | **[VERIFIED — this session]** | openpyxl read of uploaded xlsx |
| Intake answers contain full SEO keyword targets | **[VERIFIED — this session]** | Per-question parse, all 30 questions have SEO column populated |
| No /business sub-page exists at zasupport.com today | **[INFERRED]** | `curl https://zasupport.com/business/unifi-network-services` — expect 404 if not built |
| Apple AIS + Microsoft Solutions Partner + Adobe Solutions Partner + Ubiquiti partner all current | **[STALE — per intake answer wording "confirm"]** | Internal records — Courtney/Mary confirm before badges go live |
| 1,100+ UniFi deployments since 2014 | **[VERIFIED — Courtney's reviewed answer]** | Source: Q11 reviewed answer |
| 633 reviews 4.9 stars | **[VERIFIED — global memory]** | Google Business Profile |

The four trust-signal accreditations are flagged STALE because the intake answer says "confirm specific designations" — these need Courtney's final word before they render as page content.

---

## 8. The Claude Code handoff

The handoff file pairs with this framework:

- `handoffs/2026-05-24-business-hub-claude-code-handoff.md` — execution runbook
- `handoffs/service-intake-v1-reviewed.json` — source data
- `handoffs/28-leaked-slugs.json` — pairs with the fix-28 task
- `business-hub/pages/*.md` — per-page content drafts (one .md per page, fed by intake answers)

Claude Code executes against these files. Each Phase A-E step has a definition-of-done that the gate verifies before progression.

---

*Business Hub Framework v1.0*
*ZA Support strategy | 24 May 2026 (T2 instruction)*
*Source: v1_ZA_Support_Specialist_Service_Intake_Reviewed_23_5_26.xlsx*
*Pairs with: post-quality-universal-enforcement, comprehensive-gate, substantive-update-check*
