import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, ArrowRight, Shield, Laptop, Lock, Globe, Server, Smartphone, BarChart, Briefcase } from 'lucide-react';
import SchemaOrg from '@/components/seo/SchemaOrg';
import { buildFaqSchema, buildServiceSchema, buildBreadcrumbSchema } from '@/lib/schema';
import FAQAccordion from '@/components/ui/FAQ';
import { CONTACT } from '@/lib/constants';
import PricingNote from '@/components/PricingNote';

export const metadata: Metadata = {
  title: 'IT Support for Wealth Management Firms Johannesburg 2026 | ZA Support',
  description:
    'IT support for wealth management firms and private banking advisors in Johannesburg. Apple specialist, FSCA compliance, POPIA, encrypted communications, zero-trust networks. From R4,499/month.',
  alternates: { canonical: 'https://zasupport.com/managed-services/wealth-management' },
  keywords: [
    'wealth management IT support',
    'private banking IT services Johannesburg',
    'financial advisor Apple support',
    'FSCA compliance IT',
    'managed IT private banking',
    'IT support wealth management',
    'Apple specialist financial advisors',
  ],
};

const faqs = [
  {
    question: 'Why do wealth management firms need specialist IT support?',
    answer:
      'Wealth management firms handle extremely sensitive client financial data — portfolio valuations, tax returns, estate plans, and banking details. A single data breach can destroy decades of client trust and trigger FSCA sanctions. Specialist IT support ensures your infrastructure meets the encryption, access control, and audit trail requirements that generic IT providers overlook. We have seen firms in Sandton lose clients after a ransomware incident because their IT provider had no financial-sector experience.',
  },
  {
    question: 'How does ZA Support handle FSCA compliance for IT systems?',
    answer:
      'We implement the technical controls required under the Financial Advisory and Intermediary Services Act (FAIS) and FSCA conduct standards. This includes enforced encryption at rest and in transit (FileVault + TLS 1.3), seven-year data retention policies with immutable backups, comprehensive audit trails for all file access and modifications, and role-based access controls. We document everything for your compliance officer and provide evidence packs for FSCA inspections.',
  },
  {
    question: 'Do you support mixed Apple and Windows environments in financial firms?',
    answer:
      'Yes. Most wealth management firms we work with in Johannesburg run MacBook Pro devices for advisors and analysts, with Windows machines in back-office or accounting roles. We manage both platforms through a unified endpoint management system, ensuring consistent security policies, patch management, and monitoring across your entire fleet.',
  },
  {
    question: 'What is zero-trust network architecture and why does my firm need it?',
    answer:
      'Zero-trust means no device or user is automatically trusted, even inside your office network. Every access request is verified against identity, device health, and context. For wealth management firms, this prevents lateral movement if a single device is compromised — an attacker who breaches one endpoint cannot reach your portfolio management system or client records without passing additional authentication checks. We deploy this using a combination of Cloudflare Access, device certificates, and conditional access policies.',
  },
  {
    question: 'How much does managed IT cost for a solo financial advisor?',
    answer:
      'Our Solo Advisor plan starts from R4,499 per month. This covers full device management for up to three Apple devices (typically a MacBook Pro, iPhone, and iPad), encrypted backup, security monitoring, FSCA-aligned compliance controls, and unlimited remote support during business hours. There are no hidden costs — the monthly fee is all-inclusive.',
  },
  {
    question: 'Can you integrate with Bloomberg Terminal and other financial platforms?',
    answer:
      'Yes. We have experience integrating Apple environments with Bloomberg Terminal (including the B-Unit authentication device), Reuters Eikon, Morningstar Direct, PSG Wealth platform, Allan Gray Adviser Services, and Ninety One portfolio tools. We ensure these platforms run reliably on macOS and configure network rules so market data feeds are never interrupted by security policies.',
  },
  {
    question: 'What happens if our firm is targeted by ransomware?',
    answer:
      'Our business continuity plan for financial firms includes three layers: prevention (endpoint detection, email filtering, zero-trust access), immutable backups (Time Machine + encrypted off-site to a South African data centre), and a tested recovery procedure. In a worst-case scenario, we can restore your entire environment — including client records, email, and financial applications — within four hours. We test this recovery process quarterly with every managed services client.',
  },
  {
    question: 'How do you handle POPIA compliance for client financial data?',
    answer:
      'We implement the technical measures required under the Protection of Personal Information Act: encryption of all personal data at rest and in transit, access logging with tamper-proof audit trails, automatic data classification to identify POPIA-regulated records, secure deletion procedures when retention periods expire, and breach notification workflows that meet the 72-hour reporting requirement to the Information Regulator. We also train your staff on device-level POPIA best practices.',
  },
  {
    question: 'Do you provide secure remote access for advisors working from home or travelling?',
    answer:
      'Absolutely. We deploy enterprise-grade VPN connections with split tunnelling disabled for financial data, ensuring all traffic to your firm systems is encrypted. For advisors on the move, we configure always-on VPN profiles on MacBook, iPhone, and iPad so the connection is seamless. Multi-factor authentication is mandatory — we typically use hardware security keys (YubiKey) combined with biometric verification on Apple devices.',
  },
  {
    question: 'Why is Apple hardware preferred in wealth management?',
    answer:
      'Apple devices offer hardware-level encryption via the Secure Enclave, a significantly lower malware attack surface compared to Windows, seamless cross-device workflows between MacBook, iPhone, and iPad, and enterprise manageability through Apple Business Manager and JAMF. For financial advisors who move between client meetings, the integration between devices — Handoff, Universal Clipboard, AirDrop with managed restrictions — provides productivity advantages that Windows ecosystems cannot match.',
  },
  {
    question: 'How quickly can you respond to an IT emergency at our firm?',
    answer:
      'Our wealth management clients receive priority SLA terms: 30-minute remote response for critical issues (system down, security breach, data access failure) and 4-hour on-site response for hardware failures. Our office at 1 Hyde Park Lane is minutes from the Sandton financial district, so on-site visits are rapid. After hours, our monitoring systems detect issues proactively — most problems are resolved before your team arrives in the morning.',
  },
];

const serviceSchema = buildServiceSchema({
  name: 'IT Support for Wealth Management Firms',
  description:
    'Specialist IT managed services for wealth management firms, private banking advisors, and financial advisory practices in Johannesburg. Apple fleet management, FSCA compliance, POPIA, zero-trust security, encrypted communications.',
  lowPrice: '4499',
  highPrice: '5499',
});

const breadcrumbSchema = buildBreadcrumbSchema([
  { name: 'Home', url: 'https://zasupport.com' },
  { name: 'Managed Services', url: 'https://zasupport.com/managed-services' },
  { name: 'Wealth Management', url: 'https://zasupport.com/managed-services/wealth-management' },
]);

const faqSchema = buildFaqSchema(faqs);

const capabilities = [
  { icon: Laptop, title: 'Apple Fleet Management', desc: 'MacBook Pro, iPhone, iPad — provisioned, monitored, and secured for every advisor in your firm.' },
  { icon: Shield, title: 'FSCA Compliance Controls', desc: 'Encryption, audit trails, seven-year retention, and access controls aligned to FAIS requirements.' },
  { icon: Lock, title: 'POPIA Data Protection', desc: 'Classification, secure deletion, breach notification workflows, and tamper-proof access logs.' },
  { icon: Globe, title: 'Zero-Trust Networking', desc: 'No implicit trust. Every connection verified by identity, device health, and conditional access policies.' },
  { icon: Server, title: 'Business Continuity', desc: 'Immutable backups, tested quarterly recovery, four-hour restore for ransomware scenarios.' },
  { icon: Smartphone, title: 'Multi-Device Management', desc: 'Seamless MacBook + iPhone + iPad workflows with JAMF MDM and Apple Business Manager.' },
];

const plans = [
  {
    name: 'Solo Advisor',
    price: 'From R4,499/month',
    ideal: 'Ideal for: Independent financial advisors, one-person practices',
    features: [
      'Up to 3 Apple devices managed',
      'FSCA-aligned security controls',
      'Encrypted backup (local + off-site)',
      'FileVault + firewall enforcement',
      'Unlimited remote support (business hours)',
      'Monthly health and compliance report',
      'VPN + MFA configuration',
      '30-minute critical response SLA',
    ],
  },
  {
    name: 'Small Firm',
    price: 'From R5,499/month',
    ideal: 'Ideal for: Advisory firms with 2–5 users, boutique wealth managers',
    features: [
      'Everything in Solo Advisor',
      'Up to 15 devices (Mac + Windows)',
      'JAMF MDM device management',
      'Microsoft 365 administration',
      'Network monitoring (UniFi/Cisco)',
      'Quarterly on-site security review',
      'Bloomberg/Reuters integration support',
      'Staff security awareness training',
      '4-hour on-site response SLA',
    ],
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    ideal: 'Ideal for: Multi-advisor firms, family offices, 6+ users',
    features: [
      'Everything in Small Firm',
      'Unlimited devices',
      'Dedicated account manager',
      'Custom SLA and compliance terms',
      'SIEM integration and log forwarding',
      'Executive IT reporting (board-ready)',
      'Disaster recovery testing (quarterly)',
      'Integration with custodian platforms',
      'On-site support as needed',
    ],
  },
];

export default function WealthManagementPage() {
  return (
    <>
      <SchemaOrg schema={serviceSchema} />
      <SchemaOrg schema={faqSchema} />
      <SchemaOrg schema={breadcrumbSchema} />

      {/* ─── Hero ─────────────────────────────────────────────────────────── */}
      <section className="hero-gradient grid-overlay pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <p className="text-[#0FEA7A] text-sm font-semibold tracking-widest uppercase mb-4">
              Managed IT for Financial Services
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#E8F4F1] leading-tight mb-6">
              IT Support for Wealth Management
              <br />
              <span className="text-[#0FEA7A]">Firms in Johannesburg</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-6 max-w-3xl leading-relaxed">
              Specialist Apple IT management for financial advisors, private banking teams, and
              boutique wealth managers. FSCA compliance, POPIA data protection, encrypted
              communications, and zero-trust security — from our office in Hyde Park, minutes from
              the Sandton financial district.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="https://wa.me/27790539964?text=Hi%2C%20I%20manage%20a%20wealth%20management%20firm%20and%20need%20IT%20support"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 transition-all"
              >
                <Phone className="w-5 h-5" /> WhatsApp Us
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all"
              >
                Request a Quote <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Why Wealth Management Firms Need Specialist IT ────────────── */}
      <section className="py-12 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-6">
            Why Wealth Management Firms Need Specialist IT Support
          </h2>
          <div className="prose prose-invert max-w-none text-[#7A9E98] space-y-4 leading-relaxed">
            <p>
              We have worked with financial advisory firms across Sandton and the greater
              Johannesburg area since 2009, and one pattern is consistent: generic IT providers
              do not understand the regulatory and operational demands of wealth management. The
              consequences are severe — FSCA sanctions, POPIA breach notifications to the
              Information Regulator, and most critically, the loss of client trust that took years
              to build.
            </p>
            <p>
              A wealth management firm is not a standard small business. Your advisors handle
              discretionary mandates worth millions of rands. Your back office processes
              beneficiary nominations, tax certificates, and estate planning documents that
              contain the most sensitive personal information imaginable. Your network carries
              Bloomberg market data feeds that cannot tolerate latency, while simultaneously
              needing to be locked down against increasingly sophisticated cyber threats targeting
              financial services.
            </p>
            <p>
              From our office at 1 Hyde Park Lane — a seven-minute drive from the Sandton
              financial district — we provide IT managed services built specifically for this
              environment. Not adapted from a generic template, but designed from the ground up
              for firms regulated by the Financial Sector Conduct Authority and subject to the
              Protection of Personal Information Act.
            </p>
          </div>
        </div>
      </section>

      {/* ─── Capabilities Grid ────────────────────────────────────────── */}
      <section className="py-12 sm:py-20 bg-[#111C1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-10 text-center">
            What We Deliver for Financial Advisory Firms
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilities.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="glass-card p-6">
                <div className="w-12 h-12 bg-[rgba(15,234,122,0.1)] rounded-xl flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-[#0FEA7A]" />
                </div>
                <h3 className="text-[#E8F4F1] font-bold mb-2">{title}</h3>
                <p className="text-[#7A9E98] text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FSCA Compliance Deep Dive ────────────────────────────────── */}
      <section className="py-12 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-6">
            FSCA Compliance — What Your IT Infrastructure Must Deliver
          </h2>
          <div className="prose prose-invert max-w-none text-[#7A9E98] space-y-4 leading-relaxed">
            <p>
              The Financial Sector Conduct Authority requires financial service providers to
              maintain adequate systems and controls to protect client information and ensure
              business continuity. Under the FAIS General Code of Conduct, your firm must
              demonstrate that client records are securely stored, that access is controlled
              and logged, and that you can recover from a disaster without losing client data.
            </p>
            <p>
              In practice, this means your IT infrastructure needs enforced full-disk encryption
              on every device (we deploy FileVault on all Macs with escrow keys stored in our
              management platform), TLS 1.3 encryption for all data in transit, immutable backup
              archives that cannot be deleted or modified by ransomware, and comprehensive audit
              trails showing who accessed which client files, when, and from which device.
            </p>
            <p>
              We have helped firms prepare for FSCA on-site inspections by providing complete
              evidence packs: encryption status reports, backup verification logs, access control
              matrices, and incident response documentation. The most common mistake we see is
              firms relying on consumer-grade cloud storage (personal Dropbox or Google Drive)
              with no access controls, no audit trail, and no ability to prove data residency
              within South Africa. We replace these with enterprise-grade alternatives that satisfy
              both FSCA and POPIA requirements while remaining intuitive for non-technical
              advisors.
            </p>
          </div>
        </div>
      </section>

      {/* ─── Secure Communications + File Sharing ─────────────────────── */}
      <section className="py-12 sm:py-20 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-6">
            Encrypted Communications and Secure File Sharing
          </h2>
          <div className="prose prose-invert max-w-none text-[#7A9E98] space-y-4 leading-relaxed">
            <p>
              Financial advisors exchange sensitive documents daily — investment mandates, tax
              returns, identity documents, and portfolio statements. Sending these as unencrypted
              email attachments is a POPIA violation waiting to happen. We deploy Microsoft 365
              with Information Rights Management (IRM), ensuring that sensitive documents can only
              be opened by intended recipients, cannot be forwarded without authorisation, and
              expire automatically after a defined period.
            </p>
            <p>
              For file sharing within your firm and with clients, we configure SharePoint with
              granular permissions, external sharing policies, and Data Loss Prevention (DLP)
              rules that prevent accidental exposure of ID numbers, bank account details, or tax
              reference numbers. Every file access is logged, creating the audit trail your
              compliance officer needs.
            </p>
            <p>
              We also implement secure messaging for advisor-client communication. Rather than
              relying on personal WhatsApp (which offers no archiving, no compliance controls,
              and no ability to revoke access when an advisor leaves your firm), we configure
              Microsoft Teams with message retention policies and eDiscovery capability, ensuring
              all client communications are preserved for the seven-year FAIS retention period.
            </p>
          </div>
        </div>
      </section>

      {/* ─── Zero-Trust + VPN ─────────────────────────────────────────── */}
      <section className="py-12 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-6">
            Zero-Trust Network Architecture for Financial Services
          </h2>
          <div className="prose prose-invert max-w-none text-[#7A9E98] space-y-4 leading-relaxed">
            <p>
              Traditional network security operates on a simple premise: everything inside the
              office firewall is trusted. This model fails catastrophically in financial services.
              An advisor connects to hotel WiFi during a client meeting in Cape Town, and their
              laptop is exposed. A USB drive introduced by a visitor contains malware. A phishing
              email compromises one set of credentials, and the attacker moves laterally to your
              portfolio management system.
            </p>
            <p>
              We deploy zero-trust architecture using Cloudflare Access for application-level
              protection, device certificates issued through our management platform, conditional
              access policies that evaluate device health (is FileVault enabled? Is the OS
              patched? Is the firewall active?) before granting access, and network segmentation
              that isolates financial applications from general internet browsing. The result is
              that even if a single device is compromised, the blast radius is contained.
            </p>
            <p>
              For advisors who work remotely — whether from home, from a client site, or while
              travelling — we configure always-on VPN profiles across MacBook, iPhone, and iPad.
              Split tunnelling is disabled for all connections to firm resources, ensuring that
              sensitive data never traverses an unprotected network path. Multi-factor
              authentication is enforced at every access point, combining hardware security keys
              (YubiKey 5 series, which work natively with Apple devices) with biometric
              verification via Touch ID or Face ID.
            </p>
          </div>
        </div>
      </section>

      {/* ─── Business Continuity + Ransomware ─────────────────────────── */}
      <section className="py-12 sm:py-20 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-6">
            Business Continuity and Ransomware Protection
          </h2>
          <div className="prose prose-invert max-w-none text-[#7A9E98] space-y-4 leading-relaxed">
            <p>
              South African financial firms are increasingly targeted by ransomware groups — the
              combination of sensitive client data and regulatory pressure to restore services
              quickly makes wealth management firms attractive targets. In 2024 and 2025, several
              Johannesburg-based financial service providers experienced significant operational
              disruption from ransomware attacks.
            </p>
            <p>
              Our business continuity strategy for wealth management clients operates on three
              layers. First, prevention: endpoint detection and response (EDR) on every device,
              advanced email filtering with attachment sandboxing, and zero-trust network policies
              that limit what any single compromised account can access. Second, immutable backups:
              Time Machine for rapid local recovery combined with encrypted off-site replication
              to a South African data centre (satisfying POPIA data residency concerns), with
              backups stored in a format that cannot be modified or deleted by ransomware. Third,
              a tested recovery procedure: we conduct quarterly disaster recovery drills with
              every managed services client, verifying that we can restore the complete environment
              — macOS devices, email, financial applications, client data — within four hours.
            </p>
            <p>
              Load shedding adds another dimension to business continuity planning in South Africa.
              We ensure your backup systems, including UPS units and generator switchover, are
              monitored and tested. During extended outages, we verify that VPN connections and
              cloud services remain accessible from mobile devices so your advisors can continue
              servicing clients.
            </p>
          </div>
        </div>
      </section>

      {/* ─── Financial Platform Integrations ──────────────────────────── */}
      <section className="py-12 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-6">
            Integration with Financial Platforms
          </h2>
          <div className="prose prose-invert max-w-none text-[#7A9E98] space-y-4 leading-relaxed">
            <p>
              Your advisors depend on market data and portfolio management platforms that must
              work reliably, every trading day, without interruption. We have direct experience
              configuring and supporting Bloomberg Terminal on macOS (including the B-Unit
              biometric authentication device and network rules for the Bloomberg data feed),
              Reuters Eikon, Morningstar Direct, and Factset.
            </p>
            <p>
              For South African wealth management firms, we also integrate with PSG Wealth
              platform, Allan Gray Adviser Services, Ninety One portfolio management tools,
              Glacier by Sanlam, and Momentum Wealth. These platforms often have specific
              network requirements — particular ports, proxy configurations, or certificate
              trusts — that generic IT providers struggle with. We document every integration
              and maintain runbooks so that support is consistent even when your primary
              technician is unavailable.
            </p>
            <p>
              Multi-device workflows are critical for modern financial advisors. We configure
              Apple Handoff and Continuity features so an advisor can start reviewing a portfolio
              report on their MacBook Pro, continue reading on their iPad during a client meeting,
              and take notes on their iPhone while travelling — all with enterprise security
              policies applied consistently across every device through JAMF Pro and Apple
              Business Manager.
            </p>
          </div>
        </div>
      </section>

      {/* ─── Pricing Plans ────────────────────────────────────────────── */}
      <section className="py-12 sm:py-20 bg-[#111C1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3 text-center">
            Wealth Management IT Plans
          </h2>
          <p className="text-[#7A9E98] text-center mb-10 max-w-2xl mx-auto">
            Every plan includes FSCA-aligned compliance controls, POPIA data protection, and
            encrypted backup as standard. No hidden costs.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {plans.map((plan, i) => (
              <div
                key={plan.name}
                className={`glass-card p-8 ${i === 1 ? 'border-[rgba(15,234,122,0.4)] shadow-[0_0_24px_rgba(15,234,122,0.1)]' : ''}`}
              >
                {i === 1 && (
                  <div className="text-[#0FEA7A] text-xs font-bold mb-3 tracking-widest uppercase">
                    Most Popular
                  </div>
                )}
                <h3 className="text-[#E8F4F1] text-xl font-bold mb-1">{plan.name}</h3>
                <p className="text-[#0FEA7A] font-semibold text-sm mb-1">{plan.price}</p>
                <p className="text-[#7A9E98] text-xs mb-6">{plan.ideal}</p>
                <ul className="space-y-2 mb-6">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-[#7A9E98] text-sm">
                      <span className="text-[#0FEA7A] mt-0.5">✓</span> {f}
                    </li>
                  ))}
                </ul>
                <a
                  href="https://wa.me/27790539964?text=Hi%2C%20I%27m%20interested%20in%20the%20wealth%20management%20IT%20plan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center bg-[rgba(15,234,122,0.1)] border border-[rgba(15,234,122,0.3)] text-[#0FEA7A] px-4 py-3 rounded-xl text-sm font-semibold hover:bg-[rgba(15,234,122,0.2)] transition-all"
                >
                  Get Started via WhatsApp
                </a>
              </div>
            ))}
          </div>
          <PricingNote />
        </div>
      </section>

      {/* ─── Proximity to Sandton ─────────────────────────────────────── */}
      <section className="py-12 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-6">
            Hyde Park — Minutes from the Sandton Financial District
          </h2>
          <div className="prose prose-invert max-w-none text-[#7A9E98] space-y-4 leading-relaxed">
            <p>
              Our office at 1 Hyde Park Lane sits at the edge of Johannesburg&apos;s financial
              heartland. Sandton City, the Johannesburg Stock Exchange, and the offices of every
              major asset manager and private bank in South Africa are within a seven-minute
              drive. When your systems go down, we are on-site fast — not dispatching a
              technician from the other side of Johannesburg.
            </p>
            <p>
              We service wealth management firms across Sandton, Rosebank, Bryanston, Illovo,
              Rivonia, Morningside, Sunninghill, Fourways, and Midrand. For firms in Pretoria
              and Centurion, we provide remote-first support with scheduled on-site visits. Our
              proximity to the financial district means we understand the operational rhythms of
              wealth management — early morning market opens, quarter-end reporting deadlines,
              and the reality that a system failure at 08:30 on a Monday can cost your firm
              significantly more than a failure on a Friday afternoon.
            </p>
          </div>
        </div>
      </section>

      {/* ─── Internal Links ───────────────────────────────────────────── */}
      <section className="py-12 sm:py-16 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-extrabold text-[#E8F4F1] mb-6">
            Related Managed Services
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link
              href="/managed-services"
              className="glass-card p-5 hover:border-[rgba(15,234,122,0.3)] transition-all group"
            >
              <Briefcase className="w-5 h-5 text-[#0FEA7A] mb-2" />
              <h3 className="text-[#E8F4F1] font-bold text-sm mb-1">All Managed Services</h3>
              <p className="text-[#7A9E98] text-xs">
                Overview of our full IT managed services offering for businesses in Johannesburg.
              </p>
              <span className="text-[#0FEA7A] text-xs font-semibold mt-2 inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                View plans <ArrowRight className="w-3 h-3" />
              </span>
            </Link>
            <Link
              href="/managed-services/investec"
              className="glass-card p-5 hover:border-[rgba(15,234,122,0.3)] transition-all group"
            >
              <BarChart className="w-5 h-5 text-[#0FEA7A] mb-2" />
              <h3 className="text-[#E8F4F1] font-bold text-sm mb-1">IT for Investec Clients</h3>
              <p className="text-[#7A9E98] text-xs">
                Specialist IT support for Investec private banking and wealth management clients.
              </p>
              <span className="text-[#0FEA7A] text-xs font-semibold mt-2 inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                Learn more <ArrowRight className="w-3 h-3" />
              </span>
            </Link>
            <Link
              href="/managed-services/apple-specialist"
              className="glass-card p-5 hover:border-[rgba(15,234,122,0.3)] transition-all group"
            >
              <Laptop className="w-5 h-5 text-[#0FEA7A] mb-2" />
              <h3 className="text-[#E8F4F1] font-bold text-sm mb-1">Apple Specialist MSP</h3>
              <p className="text-[#7A9E98] text-xs">
                Apple-first managed services for businesses running Mac, iPhone, and iPad fleets.
              </p>
              <span className="text-[#0FEA7A] text-xs font-semibold mt-2 inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                Learn more <ArrowRight className="w-3 h-3" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── FAQs ─────────────────────────────────────────────────────── */}
      <section className="py-12 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQAccordion
            items={faqs}
            title="Wealth Management IT Support — Frequently Asked Questions"
          />
        </div>
      </section>

      {/* ─── CTA ──────────────────────────────────────────────────────── */}
      <section className="py-16 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-[rgba(39,80,77,0.3)] border border-[rgba(15,234,122,0.2)] rounded-3xl p-10">
            <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3">
              Protect Your Firm. Protect Your Clients.
            </h2>
            <p className="text-[#7A9E98] mb-2">
              New wealth management clients receive a{' '}
              <strong className="text-[#E8F4F1]">complimentary IT security assessment</strong> —
              we audit your devices, network, backup, and compliance posture 
            </p>
            <p className="text-[#7A9E98] text-sm mb-6">
              1 Hyde Park Lane, Hyde Park, Johannesburg — minutes from Sandton.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/27790539964?text=Hi%2C%20I%27d%20like%20a%20complimentary%20IT%20assessment%20for%20my%20wealth%20management%20firm"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 transition-all"
              >
                <Phone className="w-5 h-5" /> WhatsApp Us Now
              </a>
              <a
                href={`tel:${CONTACT.phoneTel}`}
                className="inline-flex items-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all"
              >
                <Phone className="w-5 h-5" /> Call {CONTACT.phone}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
