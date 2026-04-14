# ZA Support: POPIA and Compliance Master Reference

**Version:** 1.0 | **Created:** 13/04/2026 | **Classification:** Core legal and compliance reference
**Scope:** South African data protection, IT compliance, regulatory obligations across medical and business sectors
**Distribute to:** All Claude infrastructure, Dr AI Agent, all skill files, Claude Code, blog content, sales collateral, legal correspondence templates, partnership materials
**Maintained by:** Courtney Bentley, ZA Support

---

## SECTION 0: PURPOSE AND USE

This document is the single source of truth for POPIA compliance, regulatory requirements, and legal communication patterns across every ZA Support engagement, whether medical or non-medical, whether internal or client-facing. It exists because:

1. South African data protection law has changed materially in 2025 and 2026 (most significantly the health data regulations published 6 March 2026), and information from before these changes is now stale
2. Most SA businesses, including the IT providers serving them, do not understand the operator agreement requirement under POPIA Section 21
3. The Information Regulator has moved from awareness-raising to enforcement, with documented precedents now available
4. Communication about compliance issues requires specific language patterns to avoid creating liability for ZA Support while supporting clients effectively
5. Any Claude instance reasoning about SA legal or compliance topics should default to this document over training-time knowledge, which may be outdated

This document covers facts, frameworks, and communication patterns. It is not legal advice. Where a specific situation requires legal advice, refer the client to a qualified legal practitioner. The role of this document is to give Claude and ZA Support staff the regulatory grounding to identify compliance issues, frame them correctly, and guide clients toward appropriate action.

---

## SECTION 1: THE SOUTH AFRICAN LEGAL FRAMEWORK FOR DATA AND IT

### 1.1 The primary legislation

| Act | Year | Scope |
|---|---|---|
| Protection of Personal Information Act (POPIA), Act No. 4 of 2013 | 2013 (effective 1 July 2020, grace period to 30 June 2021) | Data protection across all sectors. The primary regulation governing how organisations collect, process, store, share, and dispose of personal information. |
| Promotion of Access to Information Act (PAIA), Act No. 2 of 2000 | 2000 | Right of access to information held by public and private bodies. Requires PAIA manual for all bodies above the threshold (currently 50 staff or R 41.4M annual turnover). |
| Electronic Communications and Transactions Act (ECT Act), Act No. 25 of 2002 | 2002 | Recognition of electronic signatures, electronic records, electronic contracts, online consumer protection, cybercrimes provisions (now largely superseded by Cybercrimes Act). |
| Cybercrimes Act, Act No. 19 of 2020 | 2020 (effective 1 December 2021) | Criminalises unauthorised access, interception of data, ransomware, phishing, identity theft. Creates reporting obligations for electronic communications service providers. |
| Consumer Protection Act, Act No. 68 of 2008 | 2008 | Direct marketing restrictions, automated decision-making rules, customer data rights. |
| Health Professions Act, Act No. 56 of 1974 | 1974 (amended) | HPCSA establishment, professional conduct rules, individual practitioner liability, record-keeping requirements (Booklet 14). |
| National Health Act, Act No. 61 of 2003 | 2003 | Patient rights, access to records, confidentiality obligations on practice staff, conditions for disclosure. |
| Income Tax Act, Act No. 58 of 1962 | 1962 (amended) | Section 11(a) deductibility of operational IT expenses. Section 23(g) on capital vs revenue. |
| Tax Administration Act, Act No. 28 of 2011 | 2011 | Record retention obligations (5 years for most tax records), electronic record-keeping standards. |
| Companies Act, Act No. 71 of 2008 | 2008 | Director duties under Section 76, business records retention (7 years), IT governance under King IV. |
| Financial Advisory and Intermediary Services Act (FAIS), Act No. 37 of 2002 | 2002 | Financial services records, fit and proper requirements, FSCA oversight. |
| Financial Intelligence Centre Act (FICA), Act No. 38 of 2001 | 2001 | KYC obligations, suspicious transaction reporting, accountable institution duties. |
| National Credit Act, Act No. 34 of 2005 | 2005 | NCR oversight, credit bureau data rules, debt counselling records. |

### 1.2 Subordinate regulations and guidance

| Document | Date | Scope |
|---|---|---|
| POPIA Regulations (Information Regulator) | 21 January 2025 | Updated regulations on enforcement, complaints handling, and procedures |
| Regulations relating to the Processing of Data Subjects' Health Information by Certain Responsible Parties, 2026 (Gazette 54268, Notice 7198) | 6 March 2026 | Sector-specific obligations for healthcare, insurance, medical schemes, employers, pension funds. **No grace period.** Came into force on date of publication. |
| Information Regulator Fact Sheet: Handling of Security Compromises | August 2025 | Guidance on Section 22 breach notification process |
| Information Regulator Guidelines on Direct Marketing | Late 2025 | Section 69 direct marketing rules, electronic marketing consent |
| HPCSA Booklet 14 (Guidelines on the Keeping of Patient Records) | Current | Electronic and paper record-keeping standards for registered practitioners |
| King IV Report on Corporate Governance | 2016 | Voluntary code adopted by JSE-listed companies and reference standard for IT governance |

### 1.3 Standards bodies and regulators

| Body | Role |
|---|---|
| Information Regulator (South Africa) | POPIA enforcement, PAIA oversight, complaint handling, enforcement notices, fines |
| Health Professions Council of South Africa (HPCSA) | Medical professional registration, conduct, disciplinary action |
| Financial Sector Conduct Authority (FSCA) | Financial services market conduct (formerly FSB) |
| Prudential Authority (SARB) | Banking and insurance prudential regulation |
| National Credit Regulator (NCR) | Credit market oversight |
| Financial Intelligence Centre (FIC) | AML/CFT oversight, suspicious transaction reporting |
| Independent Communications Authority of South Africa (ICASA) | Telecoms and broadcasting |
| South African Revenue Service (SARS) | Tax administration, record retention enforcement |

---

## SECTION 2: POPIA IN DETAIL

POPIA is the foundation of every data protection conversation in South Africa. This section sets out every operative provision relevant to ZA Support's work, in the order they typically come up.

### 2.1 Key definitions (Section 1)

**Personal information**: Any information relating to an identifiable, living natural person, and where applicable, an identifiable, existing juristic person. This is broader than most people assume. It includes name, contact details, identifying numbers, biometric information, opinions, correspondence, and any information that could identify someone directly or indirectly.

**Special personal information** (Section 26): A subset that requires higher protection. Includes religious or philosophical beliefs, race or ethnic origin, trade union membership, political persuasion, health or sex life, biometric information, and criminal behaviour. **Health information falls into this category and is subject to additional rules under Section 32.**

**Responsible party**: A public or private body or any other person which, alone or in conjunction with others, determines the purpose of and means for processing personal information. The responsible party carries primary legal liability under POPIA. For a medical practice, the practice itself is the responsible party.

**Operator**: A person who processes personal information for a responsible party in terms of a contract or mandate, without coming under the direct authority of that party. An IT service provider that hosts, backs up, monitors, or has access to client data is an operator. ZA Support, when servicing a client, is an operator. The current IT provider for any prospect is also an operator, even if they have no formal agreement in place.

**Data subject**: The person to whom the personal information relates. For a medical practice, the data subjects are the patients (and the staff, for HR-related processing).

**Information Officer**: Under POPIA, every organisation has an Information Officer. By default, this is the CEO or head of the organisation, unless someone else is formally designated. The Information Officer carries personal accountability for POPIA compliance and is the named point of contact for the Information Regulator. **CEOs are personally liable for POPIA failures unless they have formally delegated and registered a Deputy Information Officer.**

**Processing**: Any operation or activity concerning personal information, including collection, receipt, recording, organisation, collation, storage, updating, modification, retrieval, alteration, consultation, use, dissemination by means of transmission, distribution or making available, merging, linking, restriction, degradation, erasure, or destruction. In other words, almost anything you can do with data is processing.

### 2.2 The eight conditions for lawful processing (Sections 8 to 25)

POPIA establishes eight conditions. All must be met for processing to be lawful. These are the structural foundation of compliance and any compliance assessment should walk through them in order.

1. **Accountability** (Section 8): The responsible party must ensure the conditions are complied with. The buck stops with the responsible party.
2. **Processing limitation** (Sections 9 to 12): Processing must be lawful, in a reasonable manner, with consent or other lawful basis, and minimal.
3. **Purpose specification** (Sections 13 to 14): Personal information must be collected for a specific, explicitly defined, and lawful purpose. Records must not be retained longer than necessary.
4. **Further processing limitation** (Section 15): Further processing must be compatible with the original purpose.
5. **Information quality** (Section 16): Personal information must be complete, accurate, not misleading, and updated.
6. **Openness** (Sections 17 to 18): The responsible party must maintain documentation and notify data subjects when collecting their information.
7. **Security safeguards** (Sections 19 to 22): Appropriate technical and organisational measures must protect personal information. **This is the condition most commonly breached at SA businesses.**
8. **Data subject participation** (Sections 23 to 25): Data subjects have the right to access their information, request correction or deletion, and object to processing.

### 2.3 Section 19: Security safeguards (the technical baseline)

This is the operative section for IT compliance. The exact wording matters.

> "A responsible party must secure the integrity and confidentiality of personal information in its possession or under its control by taking appropriate, reasonable, technical and organisational measures to prevent—
> (a) loss of, damage to or unauthorised destruction of personal information; and
> (b) unlawful access to or processing of personal information."

The phrase "appropriate, reasonable, technical and organisational measures" is deliberately flexible. What is appropriate depends on the sensitivity of the information, the nature of the responsible party's business, and the standards generally accepted in that sector. For a medical practice handling health information, the bar is high.

The responsible party must also "take reasonable measures to identify all reasonably foreseeable internal and external risks" and "establish and maintain appropriate safeguards against the risks identified, regularly verify that the safeguards are effectively implemented, and ensure that the safeguards are continually updated in response to new risks or deficiencies."

In practice, Section 19 compliance for a medical practice or any business handling sensitive data requires at minimum:

- Encrypted storage and transmission of personal information
- Access controls (individual logins, MFA, principle of least privilege)
- Endpoint protection (antivirus, EDR, device management)
- Regular backups, tested for restorability
- Audit logging of access and changes
- Incident response capability
- Documented security policies
- Staff awareness and training
- Regular review and update of all of the above

Anything less than this is hard to defend if challenged.

### 2.4 Section 21: The written operator agreement (the document the Regulator asks for)

This is the most important single section in POPIA for IT service relationships, and the most commonly missing piece at SA businesses.

> "21. Security measures regarding information processed by operator
> (1) A responsible party must, in terms of a written contract between the responsible party and the operator, ensure that the operator which processes personal information for the responsible party establishes and maintains the security measures referred to in section 19.
> (2) The operator must notify the responsible party immediately where there are reasonable grounds to believe that the personal information of a data subject has been accessed or acquired by any unauthorised person."

The operative words are "in terms of a written contract." There is no exception. There is no de minimis. Every responsible party that uses an operator must have a written contract with that operator, and the contract must ensure the operator maintains Section 19 security measures.

**What the contract must cover** (POPIA-compliant operator agreements typically include):

| Required element | What it does |
|---|---|
| Identification of parties | Names the responsible party and the operator unambiguously |
| Subject matter and duration | What services are provided, for how long |
| Categories of data subjects | Who the data is about (patients, staff, customers) |
| Categories of personal information | What types of data are processed (names, ID numbers, health records, financial data) |
| Purpose of processing | Why the operator is processing the data |
| Security measures | Specific technical and organisational measures the operator maintains under Section 19 |
| Confidentiality obligations | Binding on all operator staff with access |
| Sub-operator restrictions | The operator may not use sub-operators without permission |
| Breach notification timeline | Operator must notify the responsible party immediately on suspected breach (Section 21(2)) |
| Data subject rights cooperation | Operator assists with access, correction, and deletion requests |
| Audit rights | Responsible party may audit the operator's compliance |
| Data return or destruction on termination | What happens to the data when the relationship ends |
| Indemnity | Operator indemnifies responsible party against losses from operator non-compliance |
| International transfer restrictions | Operator may not transfer data outside SA without compliance with Section 72 |

**Critical points:**

- A general service agreement with a few privacy clauses is not sufficient. The operator agreement must explicitly address Section 19 measures.
- Microsoft 365's Data Processing Addendum, AWS's DPA, and similar global cloud DPAs are agreements between the cloud provider and the account holder. They do not constitute the operator agreement required under Section 21 between the practice and its IT service provider. The IT provider is a separate operator, in addition to any cloud providers.
- The responsible party (not the operator) is legally liable for the absence of the agreement. If the IT provider does not provide one, the responsible party must demand one or terminate the relationship.
- The responsible party remains liable for the operator's actions. An operator's breach is treated as the responsible party's breach, with the operator facing separate consequences.

### 2.5 Section 22: Breach notification (the 72-hour timeline)

> "22. Notification of security compromises
> (1) Where there are reasonable grounds to believe that the personal information of a data subject has been accessed or acquired by any unauthorised person, the responsible party, or any third party processing personal information under the authority of a responsible party, must notify—
> (a) the Regulator; and
> (b) subject to subsection (3), the data subject..."

The notification must be made "as soon as reasonably possible after the discovery of the compromise." Industry practice and Information Regulator guidance treats this as a 72-hour window from the moment the responsible party becomes aware.

**The notification must include**:

- A description of the possible consequences of the security compromise
- A description of the measures the responsible party intends to take or has taken to address the compromise
- A recommendation regarding measures the data subject should take to mitigate adverse effects
- The identity of the unauthorised person, if known

Notification can be made by various means including post, email, on the responsible party's website, or by publication in the news media. The Regulator can direct that notification be made publicly if they consider it appropriate.

**Common operational failures around breach notification**:

1. The responsible party does not know they have an obligation to notify
2. The responsible party assumes the operator (the IT provider) will notify on their behalf, when in fact the responsible party has its own separate obligation
3. The responsible party tries to handle the breach internally without notifying, hoping it does not become public
4. The 72-hour clock is missed because internal escalation takes too long
5. The notification is incomplete or inaccurate, creating additional liability

**The three-party reporting reality**: When a breach involves an operator (IT provider) and a sub-operator (such as a hosting provider or cloud service), all three parties typically have independent reporting obligations. Each reports based on their own legal position. None of them has visibility of the other parties' notifications. The responsible party is the only one who can present a coordinated, strategic response, and only if they understand the situation in time.

### 2.6 Section 22A and Section 99: Civil liability

POPIA gives data subjects the right to claim compensation in court for damage suffered as a result of any breach of the conditions. Section 99 establishes civil liability:

> "A data subject or, at the request of the data subject, the Regulator, may institute a civil action for damages in a court having jurisdiction against a responsible party for breach of any provision of this Act..."

The claim does not require proof of intent or negligence. It is sufficient to show that the responsible party breached a provision of POPIA and that the data subject suffered loss as a result. Damages may include actual financial loss, aggravated damages, interest, and costs.

The prescription period for civil claims is 3 years from the date the data subject becomes aware of the breach.

### 2.7 Section 26 and Section 32: Special personal information including health

Section 26 prohibits the processing of special personal information except in specific circumstances. Section 32 sets out the conditions under which health information may be processed.

> "32. Authorisation concerning data subject's health or sex life
> (1) The prohibition on processing personal information concerning a data subject's health or sex life... does not apply to the processing by—
> (a) medical professionals, healthcare institutions or facilities or social services, if such processing is necessary for the proper treatment and care of the data subject..."

Section 32 also imposes a duty of confidentiality:

> "(2) The information referred to in subsection (1) must be processed by responsible parties subject to an obligation of confidentiality by virtue of office, employment, profession or legal provision, or established by a written agreement..."

This duty of confidentiality must be established in writing where it does not arise automatically by virtue of profession or office.

**Section 32(6)** authorises the Information Regulator to make further regulations on health information processing. This is the basis for the March 2026 health data regulations (see Section 4 below).

### 2.8 Section 72: Cross-border transfers

Personal information may not be transferred outside South Africa unless one of the following applies:

1. The recipient is subject to a law, binding corporate rules, or binding agreement that provides an adequate level of protection (substantially similar to POPIA conditions)
2. The data subject has consented to the transfer
3. The transfer is necessary for the performance of a contract with the data subject or for pre-contractual measures
4. The transfer is for the benefit of the data subject and consent cannot reasonably be obtained
5. The transfer is necessary for the conclusion or performance of a contract in the interests of the data subject

This is significant for any client using cloud services hosted outside SA (most major cloud platforms host data internationally). The responsible party must be able to demonstrate which condition applies and document it.

For Microsoft 365 and other major cloud platforms, the standard mechanism is the cloud provider's data processing addendum which incorporates Standard Contractual Clauses or similar binding corporate rules. This satisfies Section 72 for the cloud provider relationship. It does not eliminate the need for the operator agreement under Section 21 with the IT service provider.

### 2.9 Section 73: Criminal offences

Several POPIA breaches are criminal offences carrying imprisonment. The most relevant for IT compliance failures:

| Offence | Maximum penalty |
|---|---|
| Failure to notify a security compromise (Section 22) | Fine or imprisonment up to 10 years |
| Failure to comply with an Enforcement Notice | Fine up to R 10 million or imprisonment up to 10 years |
| Obstruction of the Regulator | Fine or imprisonment up to 10 years |
| Unlawful access to information held by a responsible party | Fine or imprisonment up to 10 years |
| Selling or offering to sell account numbers | Fine or imprisonment up to 10 years |

Criminal liability sits with the natural persons responsible for the breach, which typically means the directors, the Information Officer, or the staff members who committed the act.

### 2.10 Section 74: Complaints have no time limit

> "74. Interference with the protection of personal information of data subject
> (1) Any person may submit a complaint to the Regulator in the prescribed manner alleging interference with the protection of the personal information of a data subject."

Critically, POPIA does not impose a statute of limitations on complaints to the Information Regulator. A data subject may file a complaint about a historical breach years after it occurred. This contrasts with civil claims (3-year prescription) and means a breach today can become a regulatory matter at any point in the future.

**Practical implication**: The corrective action documented in the days after a breach is the evidence the Regulator will assess whenever they assess it. If a complaint comes in three years later, the practice's response in the days after the original incident is what will be examined. Documenting the response immediately is essential, even if no complaint has been filed at the time.

### 2.11 Section 109 and the penalty matrix

The Information Regulator can impose administrative fines of up to R 10 million for breaches. The penalty considerations under Section 109(3) include:

- The nature of the personal information involved
- The duration and extent of the contravention
- The number of data subjects affected
- Whether the contravention was intentional or negligent
- Failure to take preventive measures
- The conduct of the responsible party after becoming aware
- Previous compliance history
- The financial position of the responsible party

A health-related breach affecting hundreds or thousands of patients, where the responsible party had no preventive measures in place and failed to take corrective action, is a textbook scenario for a maximum-tier fine.

---

## SECTION 3: HPCSA AND THE NATIONAL HEALTH ACT (MEDICAL OVERLAY)

For medical practices, POPIA does not exist in isolation. It interacts with HPCSA professional rules and the National Health Act in ways that create personal liability for individual practitioners.

### 3.1 HPCSA Health Professions Act, Chapter 4

HPCSA regulates registered health practitioners. Under the Health Professions Act, the HPCSA has the power to investigate, suspend, and deregister individual practitioners for unprofessional conduct, including conduct that compromises patient information.

**Section 42(1A)** provides for immediate suspension where the HPCSA considers it necessary in the public interest. The suspension takes effect immediately, even during an appeal. For a practitioner whose income depends on being on the register, this is a catastrophic outcome.

**Personal liability** is the key principle. HPCSA action is taken against the individual practitioner, not the practice as an entity. Each doctor in a multi-doctor practice has their own registration and their own liability. A practice-level compliance failure can result in individual disciplinary action against multiple practitioners.

### 3.2 HPCSA Booklet 14: Guidelines on the Keeping of Patient Records

Booklet 14 is the operative guidance document on medical record-keeping. The relevant principles for IT compliance:

- Records must be retained for a minimum of 6 years from the last entry, longer if the patient is a minor (until age 21)
- Electronic records must have tamper-evident audit trails
- Records must be accessible for the full retention period
- Records must be protected against loss, damage, or unauthorised access
- The practitioner is personally responsible for the security of records, even where stored or managed by a third party

The combination of POPIA Section 19 (security measures), POPIA Section 21 (operator agreement), and HPCSA Booklet 14 (record-keeping standards) creates a layered compliance obligation for medical practices. The IT provider must maintain the security measures, do so under a written agreement, and meet sector-appropriate standards.

### 3.3 National Health Act provisions

**Section 13**: Patients have the right to access their own records.

**Section 14**: All staff at a health establishment have a confidentiality obligation. This is broader than just the doctor; it binds receptionists, billing clerks, and any other staff with access to patient information.

**Section 15**: Patient information may be disclosed only with consent, where ordered by a court, or where required by law. Casual sharing of patient information, including by email to personal addresses, is a Section 15 violation independent of POPIA.

### 3.4 Interaction between POPIA and the National Health Act

Where two laws apply, the one that gives the patient greater protection prevails. In most cases this means the National Health Act's confidentiality provisions sit alongside POPIA's data protection provisions, creating overlapping obligations. A breach that violates POPIA also typically violates the National Health Act, doubling the regulatory exposure.

---

## SECTION 4: GAZETTE 54268 - THE MARCH 2026 HEALTH DATA REGULATIONS

### 4.1 What was published

On 6 March 2026, the Information Regulator published the **Regulations relating to the Processing of Data Subjects' Health Information by Certain Responsible Parties, 2026**, in Government Gazette No. 54268, Notice 7198. The regulations were issued under POPIA Section 112(2)(c) by the Chairperson of the Information Regulator, Advocate Pansy Tlakula.

The regulations operationalise Section 32(6) of POPIA and are the most substantive sector-specific rules the Regulator has published since POPIA came fully into force.

### 4.2 Effective date and grace period

The regulations came into force **on the date of publication, 6 March 2026, with no grace period**. This is unusual and significant. Most regulatory changes provide a transition window for affected parties to adjust. These do not. Every affected responsible party was, on 6 March 2026, immediately subject to the new requirements.

### 4.3 Who is in scope

The regulations apply to eight categories of responsible party and their applicable operators:

1. Healthcare providers (medical practices, hospitals, clinics, dentists, optometrists, allied health professionals)
2. Medical schemes
3. Medical scheme administrators
4. Managed care organisations
5. Health insurers
6. Pension funds (where they process member health information)
7. Employers (where they process employee health information for HR purposes)
8. Public health authorities

The definition of employer was broadened in the final version. It is no longer limited to employers governed by specific labour law definitions and applies more generally.

### 4.4 What the regulations require

The regulations did not introduce sweeping new obligations. The Information Regulator listened to public comment and removed several provisions from the draft. The final regulations largely codify and clarify existing POPIA requirements as they apply to health information specifically. The key provisions:

**Lawful basis requirement**: Health information may be processed only where the requirements of Section 27 of POPIA are satisfied. Each instance of processing must be mapped to an identifiable, documented ground of justification. A general policy is not sufficient.

**Confidentiality, integrity, and availability**: Responsible parties must maintain the confidentiality, integrity, and availability of health information. Safeguards must address both physical records and electronic ones.

**Sector-appropriate security measures**: Technical and organisational measures must align with "generally accepted information security practices applicable to the responsible party's own sector or industry" as contemplated in Section 19 of POPIA. This is a contextualised standard. A small medical practice is held to a standard appropriate for its size and context, but that standard is informed by what is "generally accepted" in healthcare IT, which is a higher bar than for a general retail business.

**Duty of confidentiality in writing**: Processing must occur under a duty of confidentiality. Where this duty does not arise automatically by virtue of profession (as it does for registered medical practitioners), it must be established in writing. This expands the people bound by confidentiality beyond just the doctor.

**Cross-border restrictions**: Health information may not be transferred outside South Africa unless the conditions in Section 72(1) of POPIA are met. This is particularly relevant for cloud-based systems where data may be hosted internationally.

**Disposal procedures**: Records must be disposed of securely to prevent unauthorised access or disclosure after disposal. This applies to both physical records and electronic ones, and to both end-of-retention destruction and incidental disposal (such as decommissioning old hardware).

### 4.5 What the regulations did not introduce

The Information Regulator removed several provisions from the draft that had appeared in earlier versions. The final regulations do NOT require:

- A separate legitimate interest assessment (LIA) for every processing instance
- A blanket written agreement with every individual data subject
- Detailed cross-border notification scripts beyond existing Section 72 requirements
- New mandatory ISO certifications or specific HPCSA-prescribed security frameworks

This made the final regulations more workable than the draft, but did not weaken the core obligations.

### 4.6 What the regulations mean in practice

For any medical practice or affected business operating before 6 March 2026:

1. Existing service agreements with IT providers should be reviewed to ensure they reflect the new requirements
2. The duty of confidentiality should be documented in writing for all staff who access health information
3. Cross-border data flows should be documented and the legal basis confirmed
4. Disposal procedures for both physical and electronic records should be documented
5. The practice should be able to demonstrate which security measures are in place and why they are appropriate to the sector

For ZA Support specifically, this means every medical practice client should have their service agreement and operator agreement reviewed for Gazette 54268 alignment, with an addendum issued where necessary.

### 4.7 Why this matters as a UVP

Without active monitoring of regulatory developments, no one inside a medical practice could reasonably be expected to know about the 6 March 2026 regulations. The change happened with no public consultation period leading up to enforcement and no transition window. ZA Support's value proposition includes regulatory monitoring as a service: knowing when changes happen and adjusting client compliance frameworks accordingly. This is something a generalist IT provider does not do.

---

## SECTION 5: ENFORCEMENT PRECEDENTS AND THE INFORMATION REGULATOR'S ACTIVITY

### 5.1 The pattern of enforcement (2023 to 2026)

The Information Regulator has shifted from awareness-raising to active enforcement over the past three years. The trajectory:

- **2020 to 2022**: Grace period and compliance education. Few enforcement actions.
- **2023**: First Enforcement Notices issued. First fines imposed.
- **2024 to 2025**: Increased enforcement activity. 35 assessments conducted in the 2025/26 reporting period, with health identified as a priority sector.
- **2026**: Sector-specific regulations published (March 2026 health data regulations). Active enforcement continues.

The Information Regulator has stated publicly that enforcement is now operational, not theoretical. Practices and businesses cannot expect leniency on the basis of POPIA being "new" any longer.

### 5.2 The Department of Justice fine (July 2023)

The Department of Justice and Constitutional Services was fined **R 5 million** for failure to comply with an Enforcement Notice issued by the Information Regulator. The Enforcement Notice had required the renewal of antivirus software licences and disciplinary action against officials who had failed to do so. The Department's failure to comply with the Enforcement Notice itself was the offence that triggered the fine.

**Key learning**: The fine was not for the original security failure (expired antivirus licences). It was for failing to comply with the Enforcement Notice telling them to fix it. This pattern matters because it means the Regulator can issue an Enforcement Notice as a first step, and the responsible party then has a defined window to comply. Failure to comply is an additional, separate offence with its own penalty structure.

### 5.3 The Fasken pharmaceutical company case (September 2023)

This is the most important enforcement precedent for IT service relationships. In September 2023, the Information Regulator announced that it had issued an Enforcement Notice to a South African pharmaceutical company after a third-party service provider suffered a brute force cyber attack. Approximately **3.6 million data subjects' records** were compromised from the company's e-Statement Service database.

The Information Regulator's finding turned on the absence of a written operator agreement under Section 21. The pharmaceutical company had notified the Regulator of the breach, which was the correct action under Section 22. But the company was held responsible for the breach because it had failed to ensure that its IT service provider was bound by a written contract requiring Section 19 security measures.

The breach happened to the provider. The Enforcement Notice went to the company.

**Source**: Fasken, "Beware of the Operator Contract: A Necessity for POPIA Compliance," September 2023.

**Why this case matters for ZA Support's positioning**:

1. It establishes that the responsible party (the practice or business, not the IT provider) carries the primary liability for IT-related breaches
2. It establishes that the absence of a written Section 21 operator agreement is, by itself, enough to trigger Enforcement Notice action
3. It establishes that proper breach notification (which the company did) does not eliminate liability for the underlying compliance failure
4. It is real, recent, and verifiable. Any prospect can confirm the case independently.

### 5.4 The Information Regulator's stated priorities for 2026

The Information Regulator's published work programme for 2025/26 identified the following enforcement priorities:

- Health sector compliance (now codified in the March 2026 regulations)
- Direct marketing compliance (Guidelines published late 2025)
- Operator agreement compliance (continuing focus following the 2023 Fasken precedent)
- Cross-border data transfer compliance (particularly cloud services)
- PAIA manual compliance (for entities required to have one)

Health sector enforcement is therefore current, active, and ongoing. Medical practices operating without compliant IT arrangements are not in a low-risk position. They are in the Regulator's stated priority area.

---

## SECTION 6: THE OPERATOR RELATIONSHIP IN PRACTICE

### 6.1 Identifying operators

An operator is anyone who processes personal information on behalf of a responsible party in terms of a contract or mandate. For most businesses, the operator population is larger than they realise. Common operators include:

- IT service providers and managed service providers (MSPs)
- Cloud hosting providers (AWS, Azure, Google Cloud)
- Software-as-a-Service vendors (CRM, ERP, accounting platforms, billing systems)
- Payment processors
- Email and communication platforms (Microsoft 365, Google Workspace)
- Backup and disaster recovery providers
- Cybersecurity vendors (especially those with monitoring access)
- Marketing automation platforms
- Customer support platforms (helpdesk, chat)
- Document management systems
- HR platforms (payroll, leave management)
- Medical aid administrators (for medical practices)
- Practice management software providers (for medical practices)

Each of these is an operator. Each requires a written Section 21 operator agreement. The responsible party is liable for all of them.

### 6.2 The operator agreement is a separate document

The most common compliance failure is conflating various other documents with the operator agreement. The following are NOT operator agreements:

| Document | What it is | Why it doesn't satisfy Section 21 |
|---|---|---|
| Master Service Agreement (MSA) | General commercial terms between the parties | Does not typically contain the specific Section 19 security measures or Section 21(2) breach notification language |
| Statement of Work (SOW) | Description of services to be performed | Operational detail, not a data protection contract |
| Service Level Agreement (SLA) | Performance commitments | Performance metrics, not compliance terms |
| Microsoft 365 Data Processing Addendum | Microsoft's standard DPA between Microsoft and the customer | Agreement with Microsoft, not with the IT service provider |
| AWS / Azure / Google Cloud DPA | Cloud provider's data processing terms | Agreement with the cloud provider, not with the IT service provider |
| Privacy policy | Notice to data subjects | Public-facing notice, not a contract between responsible party and operator |
| Confidentiality agreement (NDA) | Mutual confidentiality undertaking | Confidentiality is one element, but Section 21 requires full security measure obligations |
| Click-through terms of service | Standard terms accepted at signup | Generic, not customised to the responsible party's compliance needs |

The operator agreement must be a specific, written contract that explicitly addresses Section 21 requirements. It can be a standalone document or a clearly identified schedule to a broader agreement, but it must exist and must be identifiable as such.

### 6.3 The Microsoft 365 distinction (UVP-19)

Because this is the most common confusion, it warrants a dedicated explanation.

When a business signs up for Microsoft 365, it accepts the Microsoft Customer Agreement and the Microsoft Online Services Data Protection Addendum (DPA). The DPA covers Microsoft's processing of customer data and includes commitments around encryption, access control, breach notification, and cross-border transfers. For most purposes, the Microsoft DPA is sufficient to cover the Microsoft relationship under POPIA Section 21.

This is necessary but not sufficient. The business is also using an IT service provider to configure Microsoft 365, manage user accounts, deploy security policies, monitor activity, respond to incidents, and provide ongoing support. The IT service provider is a separate operator from Microsoft. The IT service provider is not party to the Microsoft DPA. The IT service provider needs its own written operator agreement with the business.

The licence provides the tools (encryption, audit trails, DLP, device management). The IT service provider configures and maintains those tools. The written agreement with the IT service provider is the document the Information Regulator will ask for if it ever investigates the business's IT compliance.

A business that has Microsoft 365 but does not have a written agreement with its IT service provider is not compliant with Section 21. This is true regardless of how well-configured the Microsoft 365 environment is.

### 6.4 Sub-operators and the supply chain

When an operator uses sub-operators (third parties who process data on behalf of the operator), the responsible party's compliance obligation extends to those relationships. The operator agreement should typically:

- Require the operator to disclose any sub-operators in advance
- Require the responsible party's consent before new sub-operators are engaged
- Require the operator to flow down equivalent obligations to sub-operators
- Hold the operator liable for the sub-operator's compliance

For ZA Support specifically, this means maintaining a register of sub-operators (cloud backup providers, monitoring tools, software vendors) and being able to demonstrate that each is bound by appropriate agreements. Any client can legitimately ask "who are your sub-operators and what agreements do you have with them?"

### 6.5 Termination and data handling

The operator agreement must address what happens to personal information when the relationship ends. The operator should be required to either:

- Securely return all personal information to the responsible party in a usable format, or
- Securely destroy all personal information and provide written certification of destruction

The responsible party should be entitled to choose which option applies. Backup copies and archived data must also be addressed. The agreement should specify a timeframe for return or destruction (typically 30 to 90 days from termination).

This protects the responsible party from being held liable for data that the operator continues to hold after the relationship ends. It also creates a switching mechanism that supports market competition and prevents lock-in based on data hostage situations.

---

## SECTION 7: SPECIAL PERSONAL INFORMATION CATEGORIES

POPIA Section 26 lists categories of special personal information that require enhanced protection. Each category has specific authorisation rules under Sections 27 to 33.

### 7.1 The categories

| Category | Section | Key authorisation grounds |
|---|---|---|
| Religious or philosophical beliefs | 28 | Religious institutions, related publications, with consent |
| Race or ethnic origin | 29 | Identification, compliance with affirmative action laws, with consent |
| Trade union membership | 30 | Trade unions, employment law compliance |
| Political persuasion | 31 | Political parties for membership, election purposes |
| **Health or sex life** | **32** | **Medical professionals, healthcare institutions, insurance, social services, employers for incapacity** |
| Criminal behaviour or biometric information | 33 | Law enforcement, court proceedings, employment screening with consent |

### 7.2 Health information specifically

Health information is the most commonly processed category of special personal information in business contexts. Beyond the obvious healthcare context, employers process health information when managing sick leave, medical certificates, occupational health programmes, disability accommodation, and incapacity. Insurers process it for underwriting and claims. Pension funds process it for disability and survivor benefits. All of these are now subject to the March 2026 health data regulations.

Health information includes:

- Diagnoses, treatment records, test results
- Medication histories and prescriptions
- Mental health information
- Disability information
- Genetic information
- Information about pregnancy
- HIV status
- Substance use or addiction information
- Information that reveals health status indirectly (such as participation in specific support groups or treatment programmes)

The processing of health information requires a specific authorisation under Section 32 plus full compliance with the eight conditions plus the additional requirements of the March 2026 regulations where applicable.

### 7.3 Biometric information

Biometric information is increasingly common in business contexts (fingerprint clock-in systems, facial recognition access control, voice authentication for call centres). Each of these creates Section 33 special personal information processing and requires specific lawful basis. The default assumption that "the employees consented when they joined" is not sufficient. Consent under POPIA must be freely given, specific, informed, and unambiguous, and may be withdrawn at any time.

---

## SECTION 8: SECTOR-SPECIFIC OVERLAYS

POPIA applies to all sectors, but additional regulatory frameworks apply to specific industries. This section sets out the overlays that ZA Support is most likely to encounter.

### 8.1 Medical and healthcare

**Primary regulators**: HPCSA, Information Regulator, Department of Health
**Additional requirements**:
- HPCSA Booklet 14 record-keeping standards
- National Health Act Sections 13, 14, 15
- Gazette 54268 health data regulations (March 2026)
- 6-year minimum record retention (longer for minors)
- Individual practitioner liability
- Duty of confidentiality on all practice staff

**Common compliance gaps**: No operator agreement, basic email instead of encrypted email, shared logins, unencrypted devices, no breach response plan, paper records stored insecurely.

### 8.2 Financial services

**Primary regulators**: FSCA, Prudential Authority, FIC, Information Regulator
**Additional requirements**:
- FAIS Act fit and proper requirements
- FICA KYC and suspicious transaction reporting
- 5-year transaction record retention
- Cyber resilience standards (PA Standard CRS 1)
- Business continuity and disaster recovery plans
- Outsourcing notifications to regulators

**Common compliance gaps**: Cloud hosting decisions made without regulator notification, insufficient access controls, third-party risk management failures.

### 8.3 Legal services

**Primary regulators**: Legal Practice Council, Information Regulator
**Additional requirements**:
- Attorney-client privilege (overrides POPIA disclosure obligations in most cases)
- Trust account compliance
- File retention (typically 5 years from matter conclusion)
- Conflict of interest checks

**Common compliance gaps**: Email security for privileged communications, document management without audit trails, third-party document review platforms without operator agreements.

### 8.4 Education

**Primary regulators**: Department of Basic Education, CHE, Information Regulator
**Additional requirements**:
- Children's data (Section 34, requires parental consent for under-18s)
- Academic record retention
- Special protection for minors

**Common compliance gaps**: School communication platforms, online learning platforms, parental consent management.

### 8.5 Retail and e-commerce

**Primary regulators**: Information Regulator, NCC (consumer protection), SARS
**Additional requirements**:
- Consumer Protection Act (Section 11 right to opt out of direct marketing)
- ECT Act consumer protection provisions
- POPIA Section 69 direct marketing rules (opt-in for electronic marketing)
- Payment Card Industry Data Security Standard (PCI-DSS) for card data

**Common compliance gaps**: Marketing list management, third-party marketing platforms, customer database security.

### 8.6 Property and estate agencies

**Primary regulators**: Property Practitioners Regulatory Authority (PPRA), FIC, Information Regulator
**Additional requirements**:
- FICA accountable institution duties
- Customer due diligence records
- Trust account management
- Property listing and client information

**Common compliance gaps**: Customer onboarding documents emailed without encryption, listing platforms with weak access control.

### 8.7 SME and professional services (general)

**Primary regulators**: Information Regulator, SARS, sector body if applicable
**Additional requirements**:
- POPIA conditions for lawful processing
- Tax record retention (5 years)
- Companies Act records (7 years)
- Employee personal information (HR, payroll)

**Common compliance gaps**: No operator agreements with cloud accounting providers, employee data management, customer communication storage.

---

## SECTION 9: COMMON COMPLIANCE MISCONCEPTIONS

These are the misconceptions ZA Support encounters most frequently. Each one is a conversation opportunity and a coaching point for clients.

### 9.1 "We're too small to be a target"

False. POPIA applies to all responsible parties regardless of size. The Information Regulator has limited resources and prioritises larger or more egregious cases, but small businesses are routinely affected by ransomware, phishing, and accidental disclosures, any of which can trigger reporting obligations and complaints. Size is not a defence.

### 9.2 "We don't store sensitive data, just contact details"

False. Names, phone numbers, email addresses, and ID numbers are all personal information under POPIA. The conditions for lawful processing apply to all of it. Even a simple contact database creates obligations around purpose specification, retention, security, and data subject rights.

### 9.3 "Our IT provider handles compliance"

Partially true and dangerously misleading. The IT provider handles the technical implementation. The legal compliance obligation sits with the responsible party (the business). The IT provider can support compliance, can implement security measures, can provide breach notification support, but cannot transfer the legal liability. The business remains responsible.

### 9.4 "Microsoft 365 means we're compliant"

False. Microsoft 365 provides the tools needed for compliance (encryption, audit trails, DLP, device management). It does not provide compliance itself. The business must configure the tools correctly, monitor them, maintain a written agreement with the IT service provider that handles them, and meet all the other POPIA obligations that have nothing to do with Microsoft. The licence is one input to compliance, not the answer.

### 9.5 "We have a privacy policy on our website"

A privacy policy is a notice to data subjects. It is not a compliance framework. POPIA requires more than notification. It requires the eight conditions, the security safeguards, the operator agreements, the data subject rights mechanisms, and the breach notification capability. A privacy policy on its own is the smallest possible piece of compliance.

### 9.6 "POPIA is like GDPR, so our GDPR documentation covers us"

Partially true. POPIA was modelled on GDPR and has many similarities, but the differences matter. POPIA terminology is different (responsible party vs controller, operator vs processor). POPIA's penalty structure is different (R 10M maximum vs 4% of global turnover). The Information Regulator is a different body with different priorities. GDPR documentation is a starting point but needs to be adapted to POPIA terminology and the SA enforcement context.

### 9.7 "We're insured, so we're covered"

Cyber insurance can cover the financial impact of a breach but does not eliminate the legal obligation. The business still has to notify the Regulator, still has to face civil claims, still has to respond to data subjects. Insurance is a financial mitigation, not a compliance substitute. Many policies also require evidence of compliance as a condition of cover, so insurance and compliance reinforce each other rather than replace each other.

### 9.8 "POPIA only applies if we have a breach"

False. POPIA applies continuously. The eight conditions must be met every time personal information is processed. A business can be in breach of POPIA every day for years without anyone being aware, until a complaint, audit, or incident triggers scrutiny. At that point, the historical non-compliance becomes visible and actionable.

### 9.9 "The recipient of an accidental email won't complain"

The most dangerous assumption. POPIA Section 74 has no time limit on complaints. An accidental disclosure today can become a complaint at any point in the future, including years later. Whether the recipient complains is not within the responsible party's control. The corrective action documented in the days after the incident is the only thing the responsible party controls.

### 9.10 "We had a presentation about IT compliance last year, we know what to do"

Compliance is a state, not an event. A presentation creates awareness but not compliance. Compliance requires the actual implementation of controls, the actual signing of agreements, the actual deployment of security measures, and the ongoing maintenance of all of them. A practice that received a presentation in November 2025 and took no action is not in a different position from a practice that never received a presentation.

---

## SECTION 10: BREACH NOTIFICATION PROTOCOL

When a breach occurs, the response in the first 72 hours determines the outcome. This section sets out the operational protocol.

### 10.1 Definition of a breach (security compromise)

A "security compromise" under POPIA Section 22 is any situation where there are reasonable grounds to believe that personal information has been accessed or acquired by an unauthorised person. The threshold is "reasonable grounds to believe," not certainty. Suspicion is enough to trigger the assessment.

Common breach scenarios:
- Unauthorised email forwarding (intentional or accidental)
- Lost or stolen device containing personal information
- Ransomware or malware infection on a system holding personal information
- Successful phishing leading to account compromise
- Misdirected email or document containing personal information
- Unauthorised access to systems or databases
- Insider misuse of access privileges
- Data left exposed on a public server or shared link
- Discovery that historical processing was unlawful

### 10.2 The 72-hour window

The clock starts when the responsible party becomes aware of the compromise, not when the compromise occurred. Once awareness is established, the responsible party has approximately 72 hours to notify the Information Regulator, although the Act says "as soon as reasonably possible." Industry practice and Regulator guidance treats 72 hours as the standard window.

If the responsible party becomes aware on a Friday afternoon, the notification window includes the weekend. There is no business-hours exception.

### 10.3 The protocol

**Hour 0 to 4: Containment and initial assessment**

1. Stop the ongoing harm. If an account is compromised, lock it. If a device is leaking data, isolate it from the network. If an email has been sent, attempt recall (acknowledging this rarely works).
2. Preserve evidence. Do not power off affected devices without taking forensic images. Preserve all logs. Document the timeline.
3. Assemble the response team. The Information Officer (typically the CEO), the IT service provider, and where applicable legal counsel.
4. Initial scope assessment. What data was involved? How many data subjects? What categories?

**Hour 4 to 24: Investigation and decision**

5. Confirm whether the threshold for notification is met. Reasonable grounds to believe unauthorised access or acquisition has occurred?
6. Identify all parties with reporting obligations. Responsible party, operator, sub-operators, affected data subjects, other regulators (HPCSA for medical, FSCA for financial).
7. Begin drafting the notification. Even if the decision to notify is not yet final, having a draft ready saves time.
8. Document the corrective measures taken so far and planned.

**Hour 24 to 48: Notification preparation**

9. Finalise the notification to the Information Regulator. Include the description of the compromise, the consequences, the measures taken, and the recommendations for affected data subjects.
10. Prepare data subject notifications if direct notification is required.
11. Coordinate with the operator (IT service provider) on their separate notification obligation under Section 21(2).
12. Consult legal counsel on the framing of the notification, particularly if civil or criminal liability is possible.

**Hour 48 to 72: Notification and communication**

13. Submit the notification to the Information Regulator via the eServices portal at inforegulator.org.za
14. Notify affected data subjects through appropriate channels (email, post, public notice)
15. Issue any required communications to other regulators
16. Document the notification timeline and content

**Hour 72 and beyond: Follow-up and remediation**

17. Implement the corrective measures identified during the response
18. Document everything for future regulatory inquiries
19. Conduct a post-incident review
20. Update policies and controls to prevent recurrence
21. Maintain a complete incident file for the duration of any potential complaint window (which has no time limit)

### 10.4 What the notification must contain

The Section 22 notification to the Information Regulator should include:

- Identification of the responsible party and the Information Officer
- Date and time of the compromise (or discovery if exact date unknown)
- Nature and scope of the compromise
- Categories and approximate number of data subjects affected
- Categories and approximate volume of personal information involved
- Description of the likely consequences for data subjects
- Description of measures taken or proposed to address the compromise
- Recommendations for measures data subjects should take to mitigate adverse effects
- Identity of the unauthorised person, if known
- Contact details for follow-up

The notification is submitted via the Information Regulator's eServices portal. Receipts and reference numbers should be retained as proof of compliance with the timing requirement.

### 10.5 Common breach response failures

1. Delay in escalation (the IT person noticed, but the Information Officer was not informed for days)
2. Power-off of affected devices destroying forensic evidence
3. Internal handling without notification, hoping the breach stays quiet
4. Notification submitted late or incomplete
5. Failure to notify data subjects directly when required
6. Failure to coordinate with the operator on their separate notification
7. Public statements that contradict the notification or admit liability
8. Failure to document corrective actions

### 10.6 The role of the operator (IT service provider)

The operator has specific obligations under Section 21(2): immediate notification to the responsible party when there are reasonable grounds to believe a breach has occurred. The operator does not notify the Regulator on the responsible party's behalf (although they typically have their own separate notification obligation in their own capacity if they are also a responsible party for some data).

A managed IT service provider should:

- Detect the breach through monitoring
- Notify the responsible party within minutes of detection
- Document the technical evidence
- Support the responsible party in the breach assessment and notification process
- Implement containment measures
- Assist with the regulatory notification drafting
- Continue post-incident remediation

This is a service. It is not free. It is part of the value proposition of a specialist IT provider.

---

## SECTION 11: LEGAL COMMUNICATION RULES (FOR ZA SUPPORT CORRESPONDENCE)

The way ZA Support communicates about legal and compliance matters is governed by specific rules, both to protect ZA Support from creating liability and to use language that is acceptable in formal correspondence.

### 11.1 Acceptable language

| Use | Instead of |
|---|---|
| "Will be opposed" | "We will fight this in court" |
| "Costs will be addressed" | "You'll have to pay our fees" |
| "Raised at the appropriate juncture" | "We'll bring this up later" |
| "Without prejudice and reserving all rights" | (Use as the standard opening for any legal correspondence) |
| "Reasonable grounds to believe" | "We think" or "We're sure" |
| "Indicates" | "Proves" |
| "Information available to us suggests" | "We know" |
| "On a without-prejudice basis" | (Standard preface to settlement discussions) |
| "Subject to legal advice" | (Use to soften any commitment) |

### 11.2 Banned language

Per ZA Support global preferences, the following must never appear in any correspondence:

- "We will take legal action"
- "We will take you to court"
- "We will institute proceedings"
- "We will sue"
- Any threat of specific litigation steps
- Any admission of liability ("we accept responsibility," "we agree we owe," "we acknowledge fault")
- Framing of any payment as a debt acknowledgement
- Telephonic legal discussions (always require written correspondence for legal matters)
- "Enterprise-grade," "best-in-class," "cutting-edge," "robust infrastructure," "world-class" (these are tonal markers banned in all communications, not just legal)

### 11.3 The "Without Prejudice" framing

All ZA Support legal correspondence should begin with "WITHOUT PREJUDICE AND RESERVING ALL RIGHTS" as the first line. This protects the contents of the letter from being used as evidence in subsequent proceedings and signals to the recipient that no admissions or concessions are being made.

The phrase has specific legal effect under SA law. It is not merely formality.

### 11.4 The Information Officer designation

ZA Support correspondence should identify Courtney Bentley as the Information Officer for ZA Support and include the registered ID number (9004175217085) in any debt-related correspondence. This is required by SARS and various other legal contexts where individual identification is needed.

### 11.5 Salutation conventions

For formal legal correspondence, the salutation "Dear Sirs" is the standard opening. For client correspondence, "Hi [First Name]" is the standard. The level of formality should match the context: legal letters are formal; client emails are direct but warm.

### 11.6 Defensive posture

ZA Support's posture in any legal communication is defensive, never offensive. ZA Support does not initiate legal action through correspondence. ZA Support responds to claims, demands, or complaints with measured, factual language that protects ZA Support's position without admitting liability or committing to specific actions. The goal is to preserve all legal options while maintaining a professional relationship where possible.

### 11.7 The "we will not be drawn" formulation

Where a recipient attempts to draw ZA Support into a discussion that could create liability or admission, the appropriate response is non-engagement: "We have noted your correspondence. Our position will be set out in due course." This neither agrees nor disagrees, neither admits nor denies, and preserves all options.

### 11.8 Communication about client compliance issues

When ZA Support communicates with clients about their own compliance position, the tone is supportive and educational, never blame-based. The client should understand:

- What the regulatory requirement is
- What their current position is in relation to the requirement
- What the consequences of non-compliance are (in factual terms)
- What action ZA Support recommends
- What ZA Support can do to help

The client should never feel attacked, blamed, or sold to. The frame is "this is what the law requires; this is where you currently sit; here is how we can help you bridge the gap."

The empathetic exit ramp from the Links Physicians case is a good model: explicitly acknowledge that the regulatory environment has become impossibly complex for non-specialists, and frame ZA Support as the necessary specialist rather than the critic. This passage works because it removes blame from the client while making the case for outsourcing.

### 11.9 The colour-coding pattern (for complex multi-issue communications)

For client emails covering multiple compliance issues, the LEGAL/OPERATIONAL colour-coded categorisation pattern from the Links Physicians case is effective:

- LEGAL items (red) for compliance, regulatory, and legal exposure
- OPERATIONAL items (blue) for technical, operational, and business continuity issues

Each item is labelled with its category at the start of the line. This separates urgency types, builds confidence in structured thinking, and makes the email scannable for multiple recipients with different concerns.

### 11.10 References must be verifiable

Every legal claim in any ZA Support correspondence must be backed by a verifiable source. Build a standard references appendix for any document making regulatory claims. Include URLs to the actual legal text where possible (popia.co.za for POPIA sections, gpwonline.co.za for gazettes, hpcsa.co.za for HPCSA documents). Never make a regulatory claim that cannot be cited.

---

## SECTION 12: THE FINANCIAL AND TAX FRAMEWORK

### 12.1 Section 11(a) of the Income Tax Act

Section 11(a) allows deduction of expenses "actually incurred in the production of income." For IT services, this means:

- Monthly managed service fees are fully deductible in the year incurred
- Software subscriptions (SaaS) are fully deductible
- Cloud service fees are fully deductible
- Cybersecurity service fees are fully deductible
- Compliance consulting fees are fully deductible

This treatment applies regardless of whether the expense is paid monthly or annually upfront.

### 12.2 The CapEx vs OpEx distinction

Capital expenditure (CapEx) on hardware (servers, computers, network equipment) is treated differently. Hardware is a capital asset and is not deductible in the year of purchase. Instead, it is depreciated over its useful life under the wear-and-tear allowance in Section 11(e) and the Schedule of Depreciation. The wear-and-tear period for IT equipment is typically 3 years.

Operational expenditure (OpEx) on services and subscriptions is fully deductible immediately. There is no depreciation schedule and no capital outlay.

For most businesses, the OpEx model is more cash-flow-friendly and tax-efficient:

- Predictable monthly cash flow instead of large once-off outlays
- Full tax deduction in the year incurred
- Monthly VAT claims instead of single VAT claim
- No depreciation schedule to manage
- Easier to scale up or down with business changes

This is a significant commercial argument for managed IT services over hardware-heavy in-house alternatives. It is not the primary reason to choose managed services, but it strengthens the case.

### 12.3 VAT treatment

Managed IT services from VAT-registered providers attract 15% VAT, which is claimable as input VAT for VAT-registered businesses. This means the effective cost of managed IT services for a VAT-registered business is the VAT-exclusive amount, while for non-VAT-registered businesses (typically SMEs below the R 1 million threshold) the VAT-inclusive amount is the actual cost.

ZA Support's pricing is quoted excluding VAT, with the VAT-inclusive price calculated separately as needed.

### 12.4 The Information Regulator fine and its tax treatment

POPIA fines are not deductible. They are penalties for unlawful conduct and Section 23(d) of the Income Tax Act specifically excludes deduction of fines and penalties. This adds to the financial impact of non-compliance: a R 5 million fine is R 5 million out of after-tax income, with no tax recovery.

By contrast, the cost of compliance (managed IT services, POPIA consulting, training, security tools) is fully deductible. Spending on compliance reduces the tax base; spending on fines does not.

---

## SECTION 13: THE DOCUMENTATION AND RECORDS FRAMEWORK

### 13.1 Records the responsible party must maintain

POPIA does not enumerate every record that must be kept, but the accountability principle and the practical needs of compliance demonstration require the following at minimum:

| Document | Purpose |
|---|---|
| Information Officer registration (with the Information Regulator) | Establishes accountability |
| Personal Information Inventory (data inventory) | Documents what personal information is processed, why, where stored, retention period |
| Records of Processing Activities (ROPA) | Documents each processing activity, the lawful basis, the data subjects, the recipients |
| Privacy notice or privacy policy | Notification to data subjects under Section 18 |
| Operator agreements | Section 21 written contracts with all operators |
| Data Subject Rights register | Log of access requests, correction requests, deletion requests, objections |
| Breach incident register | Log of all suspected or confirmed breaches and the response taken |
| Risk assessment documentation | Section 19 risk identification and safeguards |
| Staff training records | Evidence of compliance awareness and training |
| Cross-border transfer documentation | Section 72 lawful basis for international data flows |
| Disposal certificates | Evidence of secure data destruction |
| PAIA manual (where required) | Section 51 manual for organisations above the threshold |

### 13.2 Retention periods

Different categories of information have different retention requirements driven by different laws.

| Category | Minimum retention | Source |
|---|---|---|
| Tax records | 5 years | Tax Administration Act Section 29 |
| Company books and records | 7 years | Companies Act Section 24 |
| Employment records | 3 years after termination | Basic Conditions of Employment Act |
| VAT records | 5 years | VAT Act |
| Medical records (general) | 6 years from last entry | HPCSA Booklet 14 |
| Medical records (minors) | Until age 21 | HPCSA Booklet 14 |
| Mental health records | 10 years | HPCSA Booklet 14 |
| FAIS client records | 5 years | FAIS Act |
| FICA KYC records | 5 years after relationship ends | FICA |
| Property practitioner records | 5 years | PPA |

POPIA Section 14 requires that records "must not be retained any longer than is necessary for achieving the purpose for which the information was collected or subsequently processed." This means after the legal retention period expires, the responsible party must dispose of the records, not keep them indefinitely.

### 13.3 The PAIA manual

The Promotion of Access to Information Act requires private bodies to maintain a manual setting out:

- The categories of records held
- The procedures for requesting access
- The contact details for the Information Officer
- The fees applicable

A PAIA manual is required for private bodies that have:
- 50 or more employees, or
- Annual turnover above the threshold (currently approximately R 41.4 million depending on industry sector), or
- Are listed companies, financial institutions, schools, or other prescribed categories

For most of ZA Support's typical clients (1 to 10 doctor medical practices, small to medium professional services firms), the PAIA manual is not strictly required, but it is best practice and the cost of preparing one is small. For clients above the threshold, it is mandatory.

---

## SECTION 14: THE INFORMATION OFFICER ROLE

### 14.1 Default designation

Under POPIA Section 56, the Information Officer of an organisation is, by default, the head of the organisation. For a company, this is the CEO. For a partnership, it is the partners. For a sole proprietorship, it is the proprietor. For a public body, it is the head of that body.

Unless the organisation formally designates someone else, the CEO carries personal accountability for POPIA compliance. This is significant: directors and CEOs may not be aware that they have automatically been designated as the Information Officer and that they carry personal liability.

### 14.2 Registration with the Regulator

Information Officers must be registered with the Information Regulator. Registration is done through the Regulator's online portal at inforegulator.org.za. Registration is free but mandatory.

Many organisations have not registered their Information Officer. This is itself a compliance failure and should be remediated as part of any baseline compliance project.

### 14.3 Deputy Information Officers

The Information Officer may appoint one or more Deputy Information Officers to assist with the duties. The deputies do not replace the Information Officer's accountability but can carry out the operational work. For a multi-site organisation, having a Deputy Information Officer at each site is good practice.

### 14.4 Duties of the Information Officer

The Information Officer is responsible for:

- Encouraging compliance with POPIA
- Dealing with requests made to the responsible party under POPIA
- Working with the Information Regulator on investigations
- Ensuring compliance with the conditions for lawful processing
- Otherwise ensuring compliance by the responsible party with POPIA

These duties cannot be delegated to an external party. The IT service provider can support the Information Officer but cannot become the Information Officer.

### 14.5 Personal liability

Information Officers face personal liability for POPIA failures. While the responsible party (the organisation) carries primary liability, the Information Officer can be held personally accountable for failures to perform the duties listed above. This can include criminal liability under Section 73 for serious failures.

For CEOs of small organisations who have not formally designated anyone else, this means they personally carry the liability. Most CEOs are not aware of this and it is worth flagging in compliance conversations.

---

## SECTION 15: COMPLIANCE VERIFICATION CHECKLIST

This checklist allows ZA Support to assess any prospect or client against the core POPIA requirements. Each item should be answered yes/no/partial with documentation where available.

### 15.1 Foundational compliance

- [ ] Is the Information Officer formally designated and registered with the Information Regulator?
- [ ] Is there a privacy notice or privacy policy in place?
- [ ] Is there a Personal Information Inventory documenting what data is processed?
- [ ] Are Records of Processing Activities (ROPA) maintained?
- [ ] Is there a process for handling data subject access requests?
- [ ] Is there a process for handling data subject deletion requests?
- [ ] Is there a documented breach response plan?
- [ ] Is there evidence of staff training on POPIA compliance?

### 15.2 Section 19 security safeguards

- [ ] Are individual user accounts in use (no shared logins)?
- [ ] Is multi-factor authentication enabled on all user accounts?
- [ ] Is endpoint protection (antivirus, EDR) deployed on all devices?
- [ ] Are devices encrypted (full disk encryption)?
- [ ] Is screen lock enforced on all devices?
- [ ] Are devices managed under MDM?
- [ ] Is email encrypted at rest and in transit?
- [ ] Is data loss prevention (DLP) configured for sensitive data?
- [ ] Are backups taken regularly and tested?
- [ ] Is there audit logging of access and changes?
- [ ] Is there 24/7 monitoring and incident response capability?
- [ ] Is the network segmented appropriately?
- [ ] Are firewalls in place and properly configured?
- [ ] Is the Wi-Fi using WPA3 or at minimum WPA2-Enterprise?
- [ ] Are physical security controls in place?

### 15.3 Section 21 operator agreements

- [ ] Has the organisation identified all operators (IT providers, cloud services, SaaS vendors, processors)?
- [ ] Is there a written operator agreement with each IT service provider?
- [ ] Does the agreement specifically address POPIA Section 21 requirements?
- [ ] Does the agreement specify the security measures the operator maintains?
- [ ] Does the agreement include breach notification obligations on the operator?
- [ ] Does the agreement address sub-operators?
- [ ] Does the agreement address data return or destruction on termination?
- [ ] Has the agreement been reviewed for Gazette 54268 alignment (for medical practices and other affected parties)?

### 15.4 Section 22 breach notification readiness

- [ ] Is there a documented breach response process?
- [ ] Are staff trained to identify and escalate potential breaches?
- [ ] Is there a designated Information Officer or Deputy who can authorise notification?
- [ ] Is the Information Regulator's eServices portal known and accessible?
- [ ] Are templates for notification correspondence prepared in advance?
- [ ] Is there forensic capability to preserve evidence?
- [ ] Is there legal counsel available for breach scenarios?

### 15.5 Special personal information (where applicable)

- [ ] Has special personal information been identified (health, biometric, etc.)?
- [ ] Is the lawful basis for processing each category documented?
- [ ] Is the Section 32 (or equivalent) authorisation documented?
- [ ] For medical practices: Is Gazette 54268 compliance evident?
- [ ] Is the duty of confidentiality established in writing for staff who do not have it by virtue of profession?

### 15.6 Cross-border transfers

- [ ] Have international data flows been identified?
- [ ] Is the lawful basis under Section 72 documented for each?
- [ ] Are cloud provider data processing addenda in place?
- [ ] Are Standard Contractual Clauses or binding corporate rules used where appropriate?

### 15.7 Records and retention

- [ ] Are records retained according to applicable legal requirements?
- [ ] Are records disposed of securely after the retention period?
- [ ] Is there a retention schedule documented?
- [ ] Is there a PAIA manual where required?

### 15.8 Sector-specific (medical, financial, legal, etc.)

- [ ] Are sector-specific regulator requirements identified and addressed?
- [ ] For medical: HPCSA Booklet 14 compliance evident?
- [ ] For medical: National Health Act Sections 13, 14, 15 compliance evident?
- [ ] For financial: FAIS, FICA, FSCA requirements addressed?
- [ ] For legal: privilege management addressed?

---

## SECTION 16: GLOSSARY

| Term | Definition |
|---|---|
| Accountable institution | Under FICA, an entity required to perform KYC and report suspicious transactions |
| Biometric information | Personal information derived from physical, physiological, or behavioural characteristics |
| Breach (security compromise) | Unauthorised access to or acquisition of personal information |
| Conditions for lawful processing | The eight POPIA conditions (Sections 8 to 25) that all processing must satisfy |
| Confidentiality | The duty to keep information private and not disclose it |
| Consent | A voluntary, specific, and informed expression of will to permit processing |
| Cross-border transfer | Moving personal information from South Africa to another country |
| Data subject | The person to whom personal information relates |
| Data Processing Addendum (DPA) | A contractual document specifying how personal data is processed |
| Deputy Information Officer | A person formally designated to assist the Information Officer |
| Direct marketing | Marketing communications directed at specific individuals |
| ECT Act | Electronic Communications and Transactions Act |
| Enforcement Notice | A formal direction from the Information Regulator requiring specific action |
| FAIS | Financial Advisory and Intermediary Services Act |
| FICA | Financial Intelligence Centre Act |
| Gazette 54268 | Government Gazette containing the March 2026 health data regulations |
| HPCSA | Health Professions Council of South Africa |
| Information Officer | The person accountable for POPIA compliance within an organisation |
| Information Regulator | The South African regulator established under POPIA |
| KYC | Know Your Customer (client identification under FICA) |
| MFA | Multi-factor authentication |
| Operator | A third party who processes personal information on behalf of a responsible party |
| PAIA | Promotion of Access to Information Act |
| Personal Information | Information relating to an identifiable person |
| POPIA | Protection of Personal Information Act, Act 4 of 2013 |
| Processing | Any operation performed on personal information |
| ROPA | Records of Processing Activities |
| Responsible party | The organisation that determines the purpose and means of processing |
| Section 11(a) | The Income Tax Act provision allowing deduction of operational expenses |
| Section 19 | POPIA section requiring security safeguards |
| Section 21 | POPIA section requiring written operator agreements |
| Section 22 | POPIA section requiring breach notification |
| Section 26 | POPIA section defining special personal information |
| Section 32 | POPIA section governing health information processing |
| Section 72 | POPIA section governing cross-border transfers |
| Section 74 | POPIA section governing complaints (no time limit) |
| Special personal information | Sensitive categories requiring enhanced protection |
| Sub-operator | A third party engaged by an operator to process data |

---

## SECTION 17: REFERENCE LIBRARY

All references independently verified. URLs current as of 13 April 2026.

### 17.1 POPIA primary sources

- POPIA full text: https://popia.co.za/
- POPIA Section 19 (security safeguards): https://popia.co.za/section-19-security-measures-on-integrity-and-confidentiality-of-personal-information/
- POPIA Section 21 (operator agreements): https://popia.co.za/section-21-security-measures-regarding-information-processed-by-operator/
- POPIA Section 22 (breach notification): https://popia.co.za/section-22-notification-of-security-compromises/
- POPIA Section 26 (special personal information): https://popia.co.za/section-26-prohibition-on-processing-of-special-personal-information/
- POPIA Section 32 (health information): https://popia.co.za/section-32-authorisation-concerning-data-subjects-health-or-sex-life/
- POPIA Section 72 (cross-border transfers): https://popia.co.za/section-72-transfers-of-personal-information-outside-republic/
- POPIA Section 74 (complaints): https://popia.co.za/section-74-complaints/

### 17.2 Information Regulator sources

- Information Regulator main site: https://inforegulator.org.za/
- eServices portal (notifications, registrations, complaints): https://inforegulator.org.za/
- Fact Sheet: Handling of Security Compromises (August 2025): https://inforegulator.org.za/2025/08/19/fact-sheet-handling-of-security-compromises/
- POPIA Regulations 2025 (final, 21 January 2025): https://inforegulator.org.za/wp-content/uploads/2025/04/POPIA-2021-Regulations-FINAL-21-Jan-2025.pdf

### 17.3 March 2026 health data regulations

- Government Gazette portal: https://www.gpwonline.co.za/egazettes/
- Gazette 54268, Notice 7198 (6 March 2026): Published in the Government Gazette portal above
- ITLawCo analysis (6 March 2026): https://itlawco.com/popia-health-data-regulations-2026/
- Bowmans analysis (12 March 2026): https://www.fanews.co.za/article/legal-affairs/10/general/1120/popia-health-information-regulations-cross-the-finish-line/43549
- Moonstone Information Refinery: https://www.moonstone.co.za/new-popia-regulations-on-health-information-now-in-force/
- Captain Compliance commentary: https://captaincompliance.com/education/south-africas-popia-health-data-rules/

### 17.4 Enforcement precedents

- Fasken: Operator Agreement Enforcement Notice (September 2023): https://www.fasken.com/en/knowledge/2023/09/beware-of-the-operator-contract-a-necessity-for-popia-compliance
- Department of Justice fine (July 2023): Reported by the Information Regulator and various legal publishers

### 17.5 Operator agreement guidance

- Michalsons on operator agreements: https://www.michalsons.com/focus-areas/privacy-and-data-protection/does-someone-else-process-your-personal-information
- ITLawCo operator agreement template guidance: https://itlawco.com/operator-agreement-template-complying-with-popia/

### 17.6 HPCSA and medical references

- HPCSA main site: https://www.hpcsa.co.za/
- HPCSA Booklet 14 (Guidelines on the Keeping of Patient Records): Available via HPCSA site
- Medical Protection Society on POPI for practitioners: https://www.medicalprotection.org/southafrica/casebook/casebook-may-2013/understanding-popi
- Michalsons on healthcare privacy: https://www.michalsons.com/blog/privacy-in-healthcare/8637

### 17.7 Other regulatory and legal sources

- Health Professions Act: https://www.hpcsa.co.za/
- National Health Act: Available via the South African Government Gazette archives
- Income Tax Act: https://www.sars.gov.za/legal-counsel/legislation/income-tax-act/
- Companies Act: https://www.gov.za/documents/companies-act
- FICA: https://www.fic.gov.za/

### 17.8 Microsoft and cloud provider compliance

- Microsoft Online Services Data Protection Addendum: https://www.microsoft.com/licensing/docs/view/Microsoft-Products-and-Services-Data-Protection-Addendum-DPA
- Microsoft Trust Center (POPIA): https://learn.microsoft.com/en-us/compliance/regulatory/offering-popia-south-africa
- Microsoft basic auth retirement (30 April 2026): https://techcommunity.microsoft.com/blog/exchange/exchange-online-to-retire-basic-auth-for-client-submission-smtp-auth/4114750

### 17.9 General legal commentary

- Werksmans on data breach notifications: https://www.werksmans.com/legal-updates-and-opinions/data-breaches-to-notify-or-not-to-notify-that-is-the-question/
- Cliffe Dekker Hofmeyr publications: https://www.cliffedekkerhofmeyr.com/en/news/publications/2022/Sector/Technology/
- Bowmans data protection: https://www.bowmanslaw.com/

---

## SECTION 18: APPLICATION ACROSS CLAUDE INFRASTRUCTURE

This document is intended to be the single source of truth for SA compliance topics across all Claude infrastructure. The following components should reference or load this document where relevant.

### 18.1 Skill files

| Skill | How to use this document |
|---|---|
| `courtney-bentley-voice` | Reference Section 11 (legal communication rules) for all legal correspondence and client compliance communications |
| `client-report-generator` | Reference Sections 2 to 10 for all factual content in client reports; Section 17 for the references appendix |
| `perfect-blog-creator` | Reference Sections 2 to 9 for blog content on POPIA topics; Section 5 for enforcement precedents to cite |
| `zas-frontend` | Reference Section 15 (compliance verification checklist) for assessment tool design |

### 18.2 Dr AI Agent contexts

| Context | What to load from this document |
|---|---|
| `@drlegal` | Sections 2, 5, 6, 11 (POPIA detail, enforcement, operator agreements, communication rules) |
| `@drpopia` | Sections 2, 4, 7, 10 (POPIA, March 2026 regulations, special personal information, breach protocol) |
| `@drassess` | Section 15 (compliance verification checklist) |
| `@drsales` | Sections 5, 6, 9, 12 (enforcement, operators, misconceptions, financial framework) |
| `@dronboard` | Sections 6, 14 (operator agreements, Information Officer) |
| `@drinsurance` | Section 12 (financial framework) |

### 18.3 Health Check v11

- The compliance score field should reference Section 15 (compliance verification checklist) categories
- Breach detection alerts should follow Section 10 (breach notification protocol)
- Client compliance status should reflect operator agreement status (Section 6)

### 18.4 Website and content

- Blog posts on POPIA topics should reference Section 17 (reference library) for verifiable sources
- FAQ content should be drawn from Section 9 (common misconceptions)
- Medical landing page should reference Sections 3 and 4 (HPCSA, March 2026 regulations)
- Legal pages should reference Section 14 (Information Officer role)

### 18.5 Sales and proposal content

- All medical practice proposals should reference Sections 4, 5, 6 (March 2026 regulations, enforcement, operator agreements)
- All business proposals should reference Sections 2, 6 (POPIA conditions, operator agreements)
- Cost framings should reference Section 12 (financial framework)

### 18.6 Cross-document relationships

This document complements but does not replace:

- **ZAS-COMPLETE-UVP-MEDICAL-PRACTICES.md**: The medical UVP framework. References this document for the underlying legal facts.
- **ZAS-LINKS-PHYSICIANS-LEARNINGS.md**: The case-specific learnings document. References this document for the regulatory grounding.
- The skill files (`courtney-bentley-voice`, `perfect-blog-creator`, `zas-frontend`): Reference this document for compliance content rules.

When there is a conflict between this document and any other Claude infrastructure document on a compliance topic, this document takes precedence and the other document should be updated to align.

---

## SECTION 19: MAINTENANCE AND UPDATE PROTOCOL

This document must be kept current. The South African regulatory landscape is changing actively. The following triggers require an update:

1. New regulations published by the Information Regulator
2. New enforcement actions (Enforcement Notices, fines, prosecutions)
3. Court judgments interpreting POPIA or related legislation
4. Updates to sector-specific regulations (HPCSA, FSCA, FIC)
5. New guidance documents from the Information Regulator
6. Changes to relevant Acts (POPIA amendments, Tax Act changes)
7. Significant new cases handled by ZA Support that produce learnings

### Update process

When an update is required:

1. Identify the specific section affected
2. Verify the new information from primary sources
3. Update the section, preserving previous content as superseded where relevant
4. Update Section 17 (reference library) with new sources
5. Update the changelog (Section 20)
6. Increment the version number
7. Propagate the update to all dependent skill files and infrastructure components

---

## SECTION 20: CHANGELOG

| Date | Version | Change | Author |
|---|---|---|---|
| 13/04/2026 | 1.0 | Initial comprehensive POPIA and compliance reference. Built from Links Physicians case research, regulatory verification, and the cumulative learnings of multiple medical practice engagements. | Courtney Bentley / Claude |

---

## SECTION 21: DISCLAIMERS

This document is a working reference for ZA Support and its Claude infrastructure. It is not legal advice. The interpretations and applications of South African law set out in this document represent ZA Support's understanding based on publicly available sources, primary legislation, regulatory guidance, and commentary from established legal publishers. They should not be relied upon as a substitute for advice from a qualified legal practitioner.

Where a specific situation requires legal advice, ZA Support should refer the client to a qualified attorney. ZA Support does not provide legal services and does not hold itself out as a legal practitioner.

Where this document refers to specific cases or regulatory actions, the references are to publicly available reports of those matters. ZA Support does not have privileged information about any case and the references are intended for educational and illustrative purposes only.

Where this document refers to commercial pricing, tax treatment, or financial information, the figures are accurate as at the version date. Tax law, regulatory fees, and pricing change over time and should be independently verified before being relied upon for any specific decision.

---

*ZA Support — 1 Hyde Park Lane, Hyde Park, Johannesburg, 2196*
*064 529 5863 | admin@zasupport.com | www.zasupport.com*
*This document is the master POPIA and compliance reference for all ZA Support and Claude infrastructure. Distribute, propagate, and apply across all engagements where SA legal or compliance topics arise.*
