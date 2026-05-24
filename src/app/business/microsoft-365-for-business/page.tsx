import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, MessageCircleQuestion, ShieldCheck, Briefcase } from 'lucide-react';
import SchemaOrg from '@/components/seo/SchemaOrg';
import Breadcrumb from '@/components/ui/Breadcrumb';
import FAQAccordion from '@/components/ui/FAQ';
import { buildFaqSchema, buildBreadcrumbSchema, buildServiceSchema } from '@/lib/schema';
import { CONTACT, buildWhatsAppUrl } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Microsoft 365 for Business South Africa | M365 Deployment & Management | ZA Support',
  description:
    'Microsoft 365 Business Premium, E3 and E5 deployment, Intune device management, Entra ID hardening and POPIA-aligned compliance for South African businesses. From R 12,500. Call 064 529 5863.',
  keywords: [
    'microsoft 365 for business south africa',
    'microsoft 365 business premium johannesburg',
    'microsoft intune deployment south africa',
    'microsoft 365 partner south africa',
    'm365 e3 e5 johannesburg',
    'entra id setup south africa',
  ],
  alternates: { canonical: 'https://zasupport.com/business/microsoft-365-for-business' },
};

const faqs = [
  {
    question:
      'How do I get started with a Microsoft 365 Deployment and Management engagement?',
    answer:
      'Call us on 064 529 5863 or email courtney@zasupport.com to book a free discovery call. The call takes about thirty minutes and we use it to understand your current setup, your goals, and whether we are the right partner for the work. We follow with a written scope and quote within three working days.',
  },
  {
    question: 'What does the engagement cost?',
    answer:
      'Microsoft 365 Deployment and Management engagements start from R 12,500 excluding VAT. The final price depends on scope (number of users, number of sites, whether it is a one-off project or an ongoing managed service). We confirm all pricing in writing before any work begins.',
  },
  {
    question: 'Do you provide ongoing support after the initial engagement?',
    answer:
      'Yes. Most of our business customers move to a monthly managed service after the initial deployment, which covers user support, licence management, security monitoring, and proactive maintenance. The managed service is optional — some customers prefer to call us only when they need us, which is fine too.',
  },
  {
    question: 'Are you Apple, Microsoft and Ubiquiti certified?',
    answer:
      'Yes. We are an Apple Authorised IT Specialist, a Microsoft Cloud Solution Provider, and a Ubiquiti partner. Where the customer benefits from us holding the partner relationship (licensing, hardware procurement, escalation paths), we hold it directly.',
  },
  {
    question: 'Where are you based and which areas do you cover?',
    answer:
      'Our workshop is at 1 Hyde Lane, Second Floor, Office E2004, Hyde Park, Johannesburg 2196. We cover Johannesburg, Sandton, Hyde Park, Midrand and the broader Gauteng region on-site, and the rest of South Africa remotely. For ongoing managed services, we cover anywhere in South Africa with same-day remote response and on-site visits scheduled as needed.',
  },
  {
    question: 'Is your engagement POPIA and HPCSA compliant?',
    answer:
      'Where the engagement touches data subject to POPIA or HPCSA (medical practices, professional services holding client records), the deployment is baselined against the relevant regulatory requirements. We document compliance posture and provide a written compliance summary on completion.',
  },
];

export default function Microsoft365ForBusinessPage() {
  const faqSchema = buildFaqSchema(faqs);
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', url: 'https://zasupport.com' },
    { name: 'Business', url: 'https://zasupport.com/business' },
    {
      name: 'Microsoft 365 for Business in South Africa',
      url: 'https://zasupport.com/business/microsoft-365-for-business',
    },
  ]);
  const serviceSchema = buildServiceSchema({
    name: 'Microsoft 365 Deployment and Management',
    description:
      'Microsoft 365 Business Premium, Enterprise E3 and E5 deployment, Intune device management, Entra ID hardening, Defender endpoint security and Purview compliance baselining for South African businesses, with Apple as a first-class platform.',
    lowPrice: '12500',
    highPrice: '250000',
  });

  return (
    <>
      <SchemaOrg schema={serviceSchema} />
      <SchemaOrg schema={faqSchema} />
      <SchemaOrg schema={breadcrumbSchema} />

      {/* ── Hero ───────────────────────────────────────────────────────────── */}
      <section className="hero-gradient grid-overlay pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <Breadcrumb
              items={[
                { label: 'Business', href: '/business' },
                { label: 'Microsoft 365 for Business' },
              ]}
            />
          </div>
          <div className="max-w-4xl">
            <p className="text-[#0FEA7A] text-sm font-semibold uppercase tracking-widest mb-3">
              Microsoft 365 · Deployment &amp; Management · South Africa
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#E8F4F1] leading-tight mb-6">
              Microsoft 365 for Business —{' '}
              <span className="text-[#0FEA7A]">deployment and management in South Africa</span>
            </h1>
            <p className="text-xl text-[#7A9E98] leading-relaxed max-w-3xl mb-8">
              Microsoft 365 is the productivity platform most South African businesses run, and
              the gap between a working deployment and a secure, compliant deployment is bigger
              than most leadership teams realise. We deploy, manage and harden Microsoft 365 for
              Johannesburg and Cape Town businesses across Business Premium, Enterprise E3 and
              Enterprise E5, with Intune for device management, Entra ID for identity, Defender
              for endpoint security and Purview for compliance baselining against POPIA and
              HPCSA requirements for medical practices.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={buildWhatsAppUrl('M365-BUSINESS', 'Microsoft 365 for Business')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl font-bold hover:bg-[#0FEA7A]/90 transition-all"
              >
                <Phone className="w-5 h-5" /> Talk to us about Microsoft 365
              </a>
              <Link
                href="/business"
                className="inline-flex items-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all"
              >
                <Briefcase className="w-5 h-5" /> All business services
              </Link>
            </div>
            <p className="text-[#7A9E98] text-sm mt-6">
              Engagements from R 12,500 excluding VAT · final scope confirmed in writing after
              a free discovery call.
            </p>
          </div>
        </div>
      </section>

      {/* ── What we deliver ──────────────────────────────────────────────── */}
      <section className="py-16 bg-[#0F2522]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1]">What we deliver</h2>
          <p className="text-[#7A9E98] leading-relaxed text-base sm:text-lg">
            Our Microsoft 365 Deployment and Management engagement covers design through to
            ongoing management. The exact scope depends on what your business already has in
            place and what you need from us, but every engagement includes the elements below.
          </p>

          <h3 className="text-xl sm:text-2xl font-bold text-[#E8F4F1] pt-4">
            What Microsoft services do you deliver: M365 setup, Entra ID, Intune, email and
            Exchange migration, licensing, security?
          </h3>
          <p className="text-[#7A9E98] leading-relaxed">
            Full Microsoft 365 and Microsoft Enterprise stack. Tenant deployment for Business
            Premium and Enterprise (E3, E5, F1, F3). Microsoft Entra ID hardening: Conditional
            Access policy library, MFA enforcement, Privileged Identity Management (E5 or
            Entra ID P2), Identity Protection, passwordless authentication via Microsoft
            Authenticator and FIDO2, self-service password reset.
          </p>
          <p className="text-[#7A9E98] leading-relaxed">
            Microsoft Intune endpoint management across Windows, macOS, iOS, iPadOS and
            Android. Windows Autopilot, Apple Business Manager Automated Device Enrolment,
            Android Enterprise. Email and tenant migration from Google Workspace, hosted
            cPanel, on-premises Exchange and other Microsoft 365 tenants. SharePoint Online,
            OneDrive for Business and Microsoft Teams configuration with governance.
          </p>
          <p className="text-[#7A9E98] leading-relaxed">
            Microsoft Defender stack: Defender for Business, Defender for Endpoint Plan 1 and
            Plan 2, Defender for Office 365 Plan 1 and Plan 2, Defender for Identity, Defender
            for Cloud Apps, Defender XDR. Microsoft Purview: sensitivity labels, Data Loss
            Prevention (endpoint, Exchange, SharePoint, OneDrive, Teams), retention policies,
            eDiscovery Standard and Premium, Audit Premium, Insider Risk Management,
            Communication Compliance and Compliance Manager.
          </p>
          <p className="text-[#7A9E98] leading-relaxed">
            Exchange Online Protection plus SPF, DKIM, DMARC and MTA-STS. Teams Phone, Audio
            Conferencing, Operator Connect and Teams Premium. Microsoft 365 Copilot deployment
            with sensitivity label honouring. Windows 11 Enterprise (E3 and E5). Microsoft
            Cloud PKI managed certificate authority. Apple Business Manager and Android
            Enterprise integration sit alongside the Microsoft surface for organisations that
            mix Apple, Windows and Android devices in the same fleet.
          </p>

          <h3 className="text-xl sm:text-2xl font-bold text-[#E8F4F1] pt-4">
            Are you a Microsoft partner or hold Microsoft accreditation?
          </h3>
          <p className="text-[#7A9E98] leading-relaxed">
            Yes. ZA Support is a Microsoft Partner. Current Solutions Partner designations are
            confirmed and the corresponding badges placed on the website: Solutions Partner for
            Modern Work, Solutions Partner for Security, Solutions Partner for Business
            Applications, Solutions Partner for Infrastructure (Azure) and Solutions Partner
            for Data and AI. Microsoft Cloud Partner Program tier verified annually. Microsoft
            365 Cloud Solution Provider (CSP) for direct licensing. Microsoft Certified Trainer
            status for in-house training delivery.
          </p>
        </div>
      </section>

      {/* ── Why ZA Support ────────────────────────────────────────────────── */}
      <section className="py-16 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1]">Why ZA Support</h2>
          <p className="text-[#7A9E98] leading-relaxed text-base sm:text-lg">
            We have operated as an Apple repair and IT specialist from Hyde Park since 2009.
            Over 17 years we have built a 4.9-star reputation across 633 Google reviews and
            hold BEE Level 1 certification. We are an Apple Authorised IT Specialist, a
            Microsoft Cloud Solution Provider and a Ubiquiti partner with over 1,100 UniFi
            installations since 2014. We work with consumer customers, SMBs, corporates and
            medical practices across Gauteng, with most of our business coming from referrals.
          </p>

          <div className="grid sm:grid-cols-3 gap-6 pt-4">
            <div className="rounded-2xl border border-[rgba(15,234,122,0.18)] p-6 bg-[#0F2522]">
              <ShieldCheck className="w-8 h-8 text-[#0FEA7A] mb-4" />
              <h3 className="text-lg font-bold text-[#E8F4F1] mb-2">Apple-first Microsoft</h3>
              <p className="text-[#7A9E98] text-sm leading-relaxed">
                Apple Authorised IT Specialist and Microsoft Partner under one roof — Mac,
                iPhone and iPad treated as primary platforms, not afterthoughts.
              </p>
            </div>
            <div className="rounded-2xl border border-[rgba(15,234,122,0.18)] p-6 bg-[#0F2522]">
              <Briefcase className="w-8 h-8 text-[#0FEA7A] mb-4" />
              <h3 className="text-lg font-bold text-[#E8F4F1] mb-2">17 years in practice</h3>
              <p className="text-[#7A9E98] text-sm leading-relaxed">
                Hyde Park workshop since 2009, 4.9 stars across 633 Google reviews, BEE
                Level 1, most engagements arriving by referral.
              </p>
            </div>
            <div className="rounded-2xl border border-[rgba(15,234,122,0.18)] p-6 bg-[#0F2522]">
              <Phone className="w-8 h-8 text-[#0FEA7A] mb-4" />
              <h3 className="text-lg font-bold text-[#E8F4F1] mb-2">Direct partner relationships</h3>
              <p className="text-[#7A9E98] text-sm leading-relaxed">
                Microsoft Cloud Solution Provider, Apple Authorised IT Specialist and
                Ubiquiti partner — licensing, procurement and escalation paths held directly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── What we have learned at scale ─────────────────────────────────── */}
      <section className="py-16 bg-[#0F2522]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1]">
            What we have learned from doing this at scale
          </h2>

          <h3 className="text-xl sm:text-2xl font-bold text-[#E8F4F1] pt-2">
            Do you handle Microsoft 365 specifically on Apple devices (Macs and iPhones in a
            business)?
          </h3>
          <p className="text-[#7A9E98] leading-relaxed">
            Yes, and this is the single biggest differentiator for ZA Support in the Microsoft
            365 market. Most South African Microsoft partners are Windows-first and treat Mac
            and iPhone as second-class. ZA Support is Apple Authorised IT Specialist plus
            Microsoft Partner and deploys the full Microsoft 365 stack with Apple as the
            primary platform.
          </p>
          <p className="text-[#7A9E98] leading-relaxed">
            On Mac (macOS Sonoma, Sequoia, Tahoe): Microsoft 365 Apps for Mac, new Outlook for
            Mac with Exchange Online, Microsoft Teams for Mac, OneDrive sync client with Files
            On Demand and Known Folder Move, Microsoft Defender for Endpoint on Mac
            (antivirus, EDR, web protection, network protection) and Microsoft Intune via
            Apple Business Manager and Automated Device Enrolment for zero-touch onboarding.
          </p>
          <p className="text-[#7A9E98] leading-relaxed">
            Configuration profiles for Wi-Fi, certificates, FileVault encryption with recovery
            key escrow, firewall and system extensions. Platform SSO with the Microsoft
            Enterprise SSO extension — native Entra ID sign-in at the macOS login window from
            Ventura onwards. Compliance policies covering FileVault, password, System
            Integrity Protection, Gatekeeper and OS version, with Conditional Access
            enforcement. Microsoft Edge enterprise policy and Microsoft Cloud PKI Wi-Fi and
            VPN certificates.
          </p>
          <p className="text-[#7A9E98] leading-relaxed">
            On iPhone and iPad: the full Microsoft 365 app suite, Microsoft Authenticator,
            Intune supervised enrolment via Apple Business Manager, App Protection Policies
            for BYOD without device enrolment, Microsoft Defender for Endpoint mobile and the
            Microsoft Enterprise SSO plug-in for single sign-on across Microsoft 365 apps —
            the same Entra ID identity, Conditional Access and Defender protection a Mac or
            Windows endpoint enjoys, on the phone in the user&apos;s pocket.
          </p>

          <h3 className="text-xl sm:text-2xl font-bold text-[#E8F4F1] pt-4">
            Is Microsoft work part of managed services, or standalone projects, or both?
          </h3>
          <p className="text-[#7A9E98] leading-relaxed">
            Both. Standalone project work covers tenant setup, mailbox and file migration,
            Intune rollout, Apple Business Manager linkage, Conditional Access design,
            Microsoft Entra ID hardening, Defender deployment, Microsoft Purview compliance
            baselining, Teams Phone cutover, licence audit and rationalisation, mergers and
            acquisitions cross-tenant migration, Windows Autopilot enablement and compliance
            assessment against POPIA, HPCSA, FAIS and ISO 27001 in Compliance Manager.
          </p>
          <p className="text-[#7A9E98] leading-relaxed">
            Managed services cover the user lifecycle (joiner, mover, leaver) with account
            creation, licensing, group membership, device provisioning, mailbox conversion,
            OneDrive transfer and licence reclaim. Device enrolment and decommissioning as the
            fleet turns over. Patch and update management across Mac, iPhone, iPad and
            Windows. Defender alert triage and incident response. Conditional Access tuning.
            Quarantine release, phishing report investigation and user-reported submission
            handling. Licence optimisation reviews. Compliance posture maintenance. Backup
            verification and restore testing. Monthly reporting on security posture,
            incidents, adoption and licence spend. A service desk for end-user Microsoft 365
            questions. Annual security review and configuration drift audit. Most engagements
            start as a standalone project and convert to managed services after handover.
          </p>
        </div>
      </section>

      {/* ── Our approach ──────────────────────────────────────────────────── */}
      <section className="py-16 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1]">Our approach</h2>
          <p className="text-[#7A9E98] leading-relaxed text-base sm:text-lg">
            Every engagement follows a four-step approach. The first step is always a
            discovery call to understand what you have, what is working and where the gaps
            are. The second is a written scope and quote so you know exactly what the
            engagement covers and what it costs before anything starts. The third is the work
            itself, with weekly checkpoints for anything longer than a single visit. The
            fourth is handover and the option of an ongoing managed service if you want one.
          </p>
          <p className="text-[#7A9E98] leading-relaxed">
            The discovery call is free and there is no obligation. We use it to understand the
            current state of your environment, what your business needs from the engagement,
            what your timeline looks like and what your budget envelope is. If we are not the
            right partner for the work, we tell you that during or immediately after the call
            and we point you toward someone who is. We do not waste your time, and we do not
            waste ours, by chasing engagements that are a poor fit.
          </p>
        </div>
      </section>

      {/* ── Pricing ───────────────────────────────────────────────────────── */}
      <section className="py-16 bg-[#0F2522]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1]">Pricing</h2>
          <p className="text-[#7A9E98] leading-relaxed text-base sm:text-lg">
            Microsoft 365 Deployment and Management engagements start from{' '}
            <span className="text-[#0FEA7A] font-semibold">R 12,500 excluding VAT</span>. The
            final quote depends on the scope, the number of users or devices and whether you
            want a one-off project or an ongoing managed service. We confirm pricing in
            writing after the discovery call, and we do not start work without a signed quote.
          </p>
          <p className="text-[#7A9E98] leading-relaxed">
            Where the engagement is best structured as a fixed-price project, we quote it
            that way. Where it is better structured as a monthly managed service — most
            ongoing IT support, security monitoring and licence management — we quote it on a
            per-user or per-device basis with a written service level. Where it is genuinely
            time-and-materials work (recovery from an incident, complex migration with unknown
            scope), we are honest about that and we keep you informed of accruing time so
            there are no surprises.
          </p>
          <div className="rounded-2xl border-2 border-[#C6392C]/40 bg-[#C6392C]/10 p-5 mt-4">
            <p className="text-[#E8F4F1] text-sm leading-relaxed">
              <span className="font-bold text-[#0FEA7A]">Indicative pricing only.</span> Final
              pricing is confirmed in writing after a discovery call and a written scope.
              Call {CONTACT.phone} to book yours.
            </p>
          </div>
        </div>
      </section>

      {/* ── Who we work with ─────────────────────────────────────────────── */}
      <section className="py-16 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1]">Who we work with</h2>

          <h3 className="text-xl sm:text-2xl font-bold text-[#E8F4F1] pt-2">
            Do you do email and tenant migrations for businesses?
          </h3>
          <p className="text-[#7A9E98] leading-relaxed">
            Yes. This is one of the most common standalone projects. Migrations into
            Microsoft 365: Google Workspace (Gmail, Calendar, Drive, Shared Drives, Contacts),
            hosted cPanel email (Host4Africa, Afrihost, Webafrica, Domains.co.za, MWEB,
            RSAWeb), Exchange on-premises (cutover for under 2,000 mailboxes, staged for
            larger, hybrid for long-term coexistence), IMAP from any standards-compliant mail
            server, Apple iCloud Mail to Exchange Online (businesses formalising from personal
            Apple IDs onto a proper business tenant), Zimbra, Zoho Mail, Rackspace, GoDaddy
            and Fastmail.
          </p>
          <p className="text-[#7A9E98] leading-relaxed">
            Cross-tenant Microsoft 365 migrations: mergers and acquisitions, divestitures and
            rebrands. SharePoint Online and OneDrive migration from file servers, Dropbox,
            Box and Google Drive. Microsoft Teams content migration. Specialist scenarios:
            medical practices migrating to HPCSA-aware tenants with POPIA-aligned Purview
            labels, financial services firms with FAIS and FICA retention requirements, legal
            firms with attorney-client privilege protection and litigation hold preservation,
            and tenants where the original administrator has left and credentials are
            unavailable.
          </p>
          <p className="text-[#7A9E98] leading-relaxed">
            Project scope: pre-migration discovery, DNS planning (MX, SPF, DKIM, DMARC,
            Autodiscover, MTA-STS), tenant provisioning, licence procurement, pilot
            migration, full migration in batches, DNS cutover with rollback plan, Outlook
            profile reconfiguration on every Mac and Windows desktop, mobile device
            reconfiguration with Intune App Protection Policies, shared mailbox and
            distribution-list rebuild and a documented handover so the business owns its own
            tenant from day one.
          </p>
        </div>
      </section>

      {/* ── Related services ──────────────────────────────────────────────── */}
      <section className="py-16 bg-[#0F2522]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1]">Related services</h2>
          <p className="text-[#7A9E98] leading-relaxed text-base sm:text-lg">
            This page is part of our business services suite. Related pages cover our other
            specialist areas — UniFi networking, Adobe Creative Cloud support, Apple device
            management, Architecture and CAD IT, and Creative and Media Production IT. We
            commonly engage across multiple areas for a single customer, and where we do the
            engagements are coordinated under a single account manager.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-4">
            <Link
              href="/business"
              className="block rounded-xl border border-[rgba(15,234,122,0.18)] p-5 hover:border-[#0FEA7A]/50 transition-all bg-[#0A1A18]"
            >
              <h3 className="text-base font-bold text-[#E8F4F1] mb-1">All business services</h3>
              <p className="text-[#7A9E98] text-sm">SLA-backed Apple and Microsoft IT for businesses across Gauteng.</p>
            </Link>
            <Link
              href="/managed-services"
              className="block rounded-xl border border-[rgba(15,234,122,0.18)] p-5 hover:border-[#0FEA7A]/50 transition-all bg-[#0A1A18]"
            >
              <h3 className="text-base font-bold text-[#E8F4F1] mb-1">Managed IT services</h3>
              <p className="text-[#7A9E98] text-sm">Monthly proactive management with security monitoring and licence control.</p>
            </Link>
            <Link
              href="/jamf-mdm"
              className="block rounded-xl border border-[rgba(15,234,122,0.18)] p-5 hover:border-[#0FEA7A]/50 transition-all bg-[#0A1A18]"
            >
              <h3 className="text-base font-bold text-[#E8F4F1] mb-1">Apple device management</h3>
              <p className="text-[#7A9E98] text-sm">Central configuration and security across the Apple fleet via MDM.</p>
            </Link>
            <Link
              href="/managed-services/unifi-networking"
              className="block rounded-xl border border-[rgba(15,234,122,0.18)] p-5 hover:border-[#0FEA7A]/50 transition-all bg-[#0A1A18]"
            >
              <h3 className="text-base font-bold text-[#E8F4F1] mb-1">UniFi networking</h3>
              <p className="text-[#7A9E98] text-sm">Specialist UniFi design, installation and ongoing management — over 1,100 sites since 2014.</p>
            </Link>
            <Link
              href="/medical-it"
              className="block rounded-xl border border-[rgba(15,234,122,0.18)] p-5 hover:border-[#0FEA7A]/50 transition-all bg-[#0A1A18]"
            >
              <h3 className="text-base font-bold text-[#E8F4F1] mb-1">Medical practice IT</h3>
              <p className="text-[#7A9E98] text-sm">POPIA-aware, HPCSA-context managed IT for doctors and practices.</p>
            </Link>
            <Link
              href="/blog"
              className="block rounded-xl border border-[rgba(15,234,122,0.18)] p-5 hover:border-[#0FEA7A]/50 transition-all bg-[#0A1A18]"
            >
              <h3 className="text-base font-bold text-[#E8F4F1] mb-1">Recent guidance</h3>
              <p className="text-[#7A9E98] text-sm">Our blog publishes regular Microsoft 365, Intune, Entra ID and Apple-on-M365 guidance.</p>
            </Link>
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────────── */}
      <section className="py-16 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[#7A9E98] leading-relaxed text-base sm:text-lg mb-8">
            The questions we hear most often from prospective customers are below. If yours
            is not here, the fastest way to get an answer is to call us on{' '}
            <a href={`tel:${CONTACT.phoneTel}`} className="text-[#0FEA7A] font-semibold hover:underline">
              {CONTACT.phone}
            </a>{' '}
            or email{' '}
            <a href="mailto:courtney@zasupport.com" className="text-[#0FEA7A] font-semibold hover:underline">
              courtney@zasupport.com
            </a>
            .
          </p>
          <FAQAccordion items={faqs} title="Frequently asked questions" />
        </div>
      </section>

      {/* ── Book a discovery call ─────────────────────────────────────────── */}
      <section className="py-16 bg-[#0F2522]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1]">
            Book a discovery call
          </h2>
          <p className="text-[#7A9E98] leading-relaxed text-base sm:text-lg">
            A discovery call is free and takes about thirty minutes. We use the call to
            understand what you have, what you need and whether we are the right partner. If
            we are, we follow the call with a written scope and quote within three working
            days. If we are not, we will tell you that directly and point you toward someone
            who is. Call us on{' '}
            <a href={`tel:${CONTACT.phoneTel}`} className="text-[#0FEA7A] font-semibold hover:underline">
              {CONTACT.phone}
            </a>{' '}
            or email{' '}
            <a href="mailto:courtney@zasupport.com" className="text-[#0FEA7A] font-semibold hover:underline">
              courtney@zasupport.com
            </a>{' '}
            to book.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <a
              href={buildWhatsAppUrl('M365-BUSINESS-CTA', 'Microsoft 365 for Business')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl font-bold hover:bg-[#0FEA7A]/90 transition-all"
            >
              <Phone className="w-5 h-5" /> WhatsApp us
            </a>
            <a
              href={`tel:${CONTACT.phoneTel}`}
              className="inline-flex items-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all"
            >
              <Phone className="w-5 h-5" /> Call {CONTACT.phone}
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all"
            >
              <MessageCircleQuestion className="w-5 h-5" /> Contact form
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
