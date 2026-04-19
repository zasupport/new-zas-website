import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, ArrowRight, Shield, Lock, Monitor, Clock, Headphones, Server } from 'lucide-react';
import SchemaOrg from '@/components/seo/SchemaOrg';
import { buildFaqSchema, buildServiceSchema, buildBreadcrumbSchema } from '@/lib/schema';
import FAQAccordion from '@/components/ui/FAQ';
import { CONTACT } from '@/lib/constants';
import PricingNote from '@/components/PricingNote';

export const metadata: Metadata = {
  title: 'Managed IT Services for Investec Clients Johannesburg 2026 | ZA Support',
  description:
    'Managed IT and Apple specialist support for Investec clients in Johannesburg. FSCA-compliant, POPIA-ready Mac fleet management for private bankers and wealth managers. From R4,499/month.',
  alternates: { canonical: 'https://zasupport.com/managed-services/investec' },
};

const faqs = [
  {
    question: 'Why do Investec professionals prefer Apple devices?',
    answer: 'Investec professionals overwhelmingly choose Apple for several reasons: macOS has built-in full-disk encryption (FileVault), a Unix-based kernel that resists most malware, and seamless integration with iPhone and iPad for secure on-the-go access. In wealth management, where client confidentiality is non-negotiable, the Apple ecosystem provides hardware-level security features such as the Secure Enclave and Touch ID that Windows simply cannot match at the device level.',
  },
  {
    question: 'How does ZA Support ensure FSCA and POPIA compliance for Investec clients?',
    answer: 'We implement a multi-layered compliance framework: FileVault encryption on every device, JAMF MDM for remote policy enforcement, automated backup verification, and audit-ready reporting. Every Mac in your fleet is monitored for encryption status, firewall state, software updates, and backup health. We provide monthly compliance reports showing exactly which devices meet FSCA data security requirements and flag any that need attention, typically resolving issues within 4 hours.',
  },
  {
    question: 'Can you manage devices for staff working remotely from home?',
    answer: 'Absolutely. Many Investec-connected professionals split time between Sandton offices and home. Our monitoring and management works identically regardless of location. We deploy VPN configurations, enforce security policies remotely via JAMF MDM, and provide instant remote support during trading hours. If a device needs physical attention, we collect from your home address in the greater Johannesburg area and return it the same day where possible.',
  },
  {
    question: 'What response times can Investec clients expect?',
    answer: 'Our financial services SLA guarantees a 1-hour response during market hours (07:00-17:30 SAST) and 4-hour response outside hours. Critical issues affecting trading or client-facing systems are escalated immediately. We understand that downtime during JSE trading hours has a direct financial impact, so our priority queue is designed around market schedules.',
  },
  {
    question: 'Do you support Microsoft 365 alongside Apple devices?',
    answer: 'Yes. Most Investec-connected practices use Microsoft 365 for Outlook, Teams, and Excel. We manage the full M365 stack on macOS, including Outlook configuration, OneDrive for Business sync, Teams optimisation, and licence management. We also handle hybrid environments where some staff use Windows alongside Mac.',
  },
  {
    question: 'How does JAMF MDM work for financial compliance?',
    answer: 'JAMF MDM (Mobile Device Management) allows us to enforce security policies across your entire Apple fleet from a central console. We can mandate FileVault encryption, require complex passwords, restrict app installations, deploy VPN profiles, enforce automatic updates, and remotely wipe lost or stolen devices. For FSCA compliance, JAMF provides audit trails showing exactly when policies were applied and which devices are compliant at any given time.',
  },
  {
    question: 'What is included in the monthly health reports?',
    answer: 'Each month you receive a detailed report covering: device health scores (battery, storage, RAM, CPU thermals), security posture (encryption, firewall, software updates, backup status), incidents resolved, response time metrics, compliance status against FSCA requirements, and recommendations for upcoming hardware refreshes. Reports are delivered as PDF and available on your client dashboard.',
  },
  {
    question: 'Can you integrate with our existing IT infrastructure at Investec?',
    answer: 'We work alongside existing enterprise IT teams. If your practice operates within Investec premises using their network infrastructure, we manage your endpoint devices without conflicting with enterprise policies. We coordinate with internal IT on network access, firewall rules, and VPN configurations. For practices with their own offices, we manage the full stack including UniFi networking equipment.',
  },
  {
    question: 'What happens if a device is lost or stolen?',
    answer: 'Within minutes of notification, we can remotely lock the device and initiate a secure wipe via JAMF MDM, ensuring zero client data exposure. FileVault encryption means the drive is unreadable without the decryption key even before we act. We then provision a replacement Mac from our stock, restore from your latest backup, apply all security policies, and have you operational within hours, not days.',
  },
  {
    question: 'How is pricing structured for multi-user practices?',
    answer: 'We offer three tiers: R4,499/month for a solo practitioner (1 user, up to 3 devices), R5,499/month for small teams (2-3 users, up to 10 devices), and R5,999/month for larger practices (4+ users, up to 20 devices). Enterprise pricing is available for practices with more than 20 users. Every tier includes monitoring, JAMF MDM, M365 management, compliance reporting, and priority support.',
  },
  {
    question: 'Why choose ZA Support over a generic MSP?',
    answer: 'We are Apple specialists first and foremost, not a Windows MSP that also does Mac. Our team has 16 years of Apple hardware and software expertise, including component-level logic board repair. We are based at 1 Hyde Park Lane, minutes from the Investec campus in Sandton. We understand the financial services regulatory landscape in South Africa, including FSCA, POPIA, and FICA requirements, and we build our managed services specifically around these obligations.',
  },
];

const tiers = [
  {
    name: 'Solo Practitioner',
    price: 'R4,499',
    period: '/month',
    ideal: '1 user, up to 3 Apple devices',
    features: [
      'Continuous device monitoring (24/7)',
      'FileVault encryption enforcement',
      'JAMF MDM device management',
      'Monthly compliance health report',
      'Microsoft 365 management',
      'Backup monitoring and verification',
      'Priority email and phone support',
      '4-hour response SLA (business hours)',
      'Quarterly on-site device audit',
    ],
  },
  {
    name: 'Small Team',
    price: 'R5,499',
    period: '/month',
    ideal: '2-3 users, up to 10 devices',
    features: [
      'Everything in Solo Practitioner',
      '1-hour response during market hours',
      'Unlimited remote support',
      'Monthly on-site visit included',
      'VPN deployment and management',
      'Network monitoring (UniFi/enterprise)',
      'User onboarding and offboarding',
      'Annual security penetration review',
      'Dedicated account manager',
    ],
  },
  {
    name: 'Practice',
    price: 'R5,999',
    period: '/month',
    ideal: '4+ users, up to 20 devices',
    features: [
      'Everything in Small Team',
      'Full fleet lifecycle management',
      'Custom SLA terms and escalation',
      'FSCA audit-ready compliance pack',
      'Bi-weekly on-site visits',
      'Hardware procurement and setup',
      'Disaster recovery planning',
      'Executive IT reporting dashboard',
      'Integration with enterprise IT teams',
    ],
  },
];

const serviceSchema = buildServiceSchema({
  name: 'Managed IT Services for Investec Clients',
  description:
    'FSCA-compliant managed IT services for Investec professionals in Johannesburg. Apple specialist support, JAMF MDM, Microsoft 365 management, and 24/7 monitoring for wealth managers and private bankers.',
  lowPrice: '4499',
  highPrice: '5999',
});

const faqSchema = buildFaqSchema(faqs);

const breadcrumbSchema = buildBreadcrumbSchema([
  { name: 'Home', url: 'https://zasupport.com' },
  { name: 'Managed Services', url: 'https://zasupport.com/managed-services' },
  { name: 'Investec Clients', url: 'https://zasupport.com/managed-services/investec' },
]);

export default function InvestecManagedServicesPage() {
  return (
    <>
      <SchemaOrg schema={serviceSchema} />
      <SchemaOrg schema={faqSchema} />
      <SchemaOrg schema={breadcrumbSchema} />

      {/* Hero */}
      <section className="hero-gradient grid-overlay pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <p className="text-[#0FEA7A] text-sm font-semibold tracking-widest uppercase mb-4">
              Apple Specialist IT &mdash; Financial Services
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#E8F4F1] leading-tight mb-6">
              Managed IT Services
              <br />
              <span className="text-[#0FEA7A]">for Investec Clients</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-6 max-w-3xl leading-relaxed">
              FSCA-compliant Apple device management, JAMF MDM, and priority support for
              Investec-connected wealth managers, private bankers, and financial professionals
              in Johannesburg. Based at 1 Hyde Park Lane &mdash; minutes from Investec Sandton.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="https://wa.me/27790539964?text=Hi%2C%20I%27m%20an%20Investec%20client%20interested%20in%20managed%20IT%20services"
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

      {/* Why Investec Professionals Choose Apple */}
      <section className="py-12 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-4 text-center">
            Why Investec Professionals Choose Apple
          </h2>
          <p className="text-[#7A9E98] text-center max-w-3xl mx-auto mb-12 leading-relaxed">
            We have supported several Investec-connected practices across Sandton, Hyde Park, and the greater
            Johannesburg area. The pattern is consistent: financial professionals who handle sensitive client
            portfolios, regulatory filings, and high-value transactions overwhelmingly prefer Mac. Here is why.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Shield,
                title: 'Hardware-Level Security',
                desc: 'Apple Silicon chips include a dedicated Secure Enclave that protects encryption keys, biometric data, and system integrity. FileVault full-disk encryption activates with a single click. For wealth managers handling R100M+ portfolios, this is not optional — it is the baseline.',
              },
              {
                icon: Lock,
                title: 'POPIA and FSCA Alignment',
                desc: 'macOS provides granular privacy controls for camera, microphone, location, and file access. Combined with JAMF MDM enforcement, we can demonstrate compliance with the Financial Sector Conduct Authority data handling requirements and POPIA obligations in a verifiable, auditable manner.',
              },
              {
                icon: Monitor,
                title: 'Reliability Under Pressure',
                desc: 'During volatile trading sessions or critical client meetings, the last thing you need is a blue screen. macOS kernel panics are extraordinarily rare. In 16 years of Apple support, we have seen fewer catastrophic OS failures on Mac than we see on Windows in a single quarter.',
              },
              {
                icon: Clock,
                title: 'Seamless Ecosystem Integration',
                desc: 'iPhone, iPad, MacBook, and Apple Watch work together through Handoff, AirDrop, and Universal Clipboard. A private banker can review a portfolio on their MacBook in Sandton, approve it on their iPhone at OR Tambo, and present it on their iPad at a client meeting — all with end-to-end encryption.',
              },
              {
                icon: Server,
                title: 'Enterprise-Grade Manageability',
                desc: 'JAMF MDM gives us centralised control over every Apple device in your practice. We push security policies, deploy applications, enforce updates, and maintain compliance — all without touching the physical device. For multi-site Investec practices, this is essential.',
              },
              {
                icon: Headphones,
                title: 'Longevity and ROI',
                desc: 'Apple Silicon Macs consistently deliver 5-7 years of productive life with minimal performance degradation. A MacBook Pro M3 purchased today will still be fully supported and performant in 2031. The total cost of ownership is lower than equivalent Windows hardware when you factor in reduced support incidents and longer refresh cycles.',
              },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="glass-card p-6">
                <div className="w-12 h-12 bg-[rgba(15,234,122,0.1)] rounded-xl flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-[#0FEA7A]" />
                </div>
                <h3 className="text-[#E8F4F1] font-bold mb-2">{title}</h3>
                <p className="text-[#7A9E98] text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Understanding Investec Compliance */}
      <section className="py-12 sm:py-20 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-6">
            Understanding Investec&rsquo;s Compliance Landscape
          </h2>
          <div className="space-y-6 text-[#7A9E98] leading-relaxed">
            <p>
              Financial services in South Africa operate under some of the most stringent regulatory
              requirements on the continent. The Financial Sector Conduct Authority (FSCA) mandates that
              all financial service providers maintain adequate systems and controls to protect client
              information. The Protection of Personal Information Act (POPIA) adds a further layer,
              requiring demonstrable technical measures to safeguard personal data.
            </p>
            <p>
              For Investec-connected practices — whether you are an independent wealth manager, a private
              banker operating your own advisory, or a financial planning firm that works closely with
              Investec products — these are not abstract regulatory concerns. They are practical, daily
              obligations. Your devices must be encrypted. Your backups must be verified. Your software
              must be current. And you must be able to prove all of this on demand.
            </p>
            <p>
              We have built our managed services specifically around these requirements. Every Mac in your
              fleet is enrolled in JAMF MDM from day one. FileVault encryption is enforced, not optional.
              Firewall policies are deployed automatically. Software updates are tested in our environment
              before being pushed to yours, ensuring stability without compromising security. Monthly
              compliance reports document the state of every device, every policy, and every security
              measure — ready for auditors, ready for regulators.
            </p>
            <p>
              The most common mistake we see with Investec professionals managing their own IT is the
              assumption that buying a Mac makes you secure by default. It does not. macOS is more secure
              than Windows out of the box, but without enforced FileVault, a properly configured firewall,
              managed software updates, and verified backups, you are exposed. We eliminate that gap entirely.
            </p>
          </div>
        </div>
      </section>

      {/* Secure Remote Support */}
      <section className="py-12 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-6">
            Secure Remote Support for Private Bankers
          </h2>
          <div className="space-y-6 text-[#7A9E98] leading-relaxed">
            <p>
              The hybrid work model is now standard across financial services. Many Investec-connected
              professionals split their time between the Investec offices in Sandton, their own practice
              premises, and home. Your IT support must work seamlessly across all three.
            </p>
            <p>
              Our remote support infrastructure uses encrypted screen-sharing and command-line access
              that works regardless of your network. Whether you are on Investec&rsquo;s enterprise
              network, your home fibre (we support all major South African ISPs including Vumatel,
              Openserve, and Metrofibre), or a mobile hotspot, we can resolve issues in real time.
              During JSE trading hours (09:00-17:00 SAST), our financial services team is on standby
              with a guaranteed 1-hour response.
            </p>
            <p>
              For sensitive operations — portfolio rebalancing, client onboarding, regulatory submissions —
              we never interrupt active work sessions. Our monitoring detects issues proactively and
              schedules fixes for optimal times. If your MacBook Pro shows early signs of an SSD failure
              (we monitor SMART data continuously), we replace the drive before it fails, not after you
              lose a morning of work during market hours.
            </p>
            <p>
              Load shedding remains a reality in Johannesburg. We configure every managed Mac with
              proper power management: automatic save states, UPS integration where available, and
              graceful shutdown scripts that protect open documents and encrypted volumes. When power
              returns, your device resumes exactly where you left off.
            </p>
          </div>
        </div>
      </section>

      {/* Fleet Management */}
      <section className="py-12 sm:py-20 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-6">
            Apple Device Fleet Management for Wealth Management Firms
          </h2>
          <div className="space-y-6 text-[#7A9E98] leading-relaxed">
            <p>
              Managing a fleet of Apple devices for a financial practice is fundamentally different from
              managing consumer Macs. Each device must be provisioned with security policies before a user
              touches it. Applications must be deployed centrally. Updates must be tested before rollout.
              And when a device reaches end of life, it must be securely decommissioned with a verified
              data wipe and a documented chain of custody.
            </p>
            <p>
              We use Apple Business Manager in conjunction with JAMF Pro to achieve zero-touch deployment.
              When we procure a new MacBook Pro for your practice, it arrives pre-enrolled. The moment it
              connects to the internet, it automatically configures itself: installs your applications,
              applies security policies, connects to your VPN, and registers with our monitoring platform.
              Your new team member is productive within 30 minutes of unboxing, not 3 days of IT setup.
            </p>
            <p>
              For practices with 10 or more devices, we implement tiered update rings. Critical security
              patches deploy within 48 hours. Feature updates are tested on a staging device first, then
              rolled out in waves — ensuring that if an update causes an application compatibility issue
              (rare, but it happens with financial software like Bloomberg Terminal or Morningstar), we
              catch it before it affects your entire team.
            </p>
            <p>
              Device lifecycle management includes quarterly hardware health audits. We track battery
              cycle counts, SSD wear levels, thermal throttling patterns, and RAM utilisation trends.
              When a device approaches the end of its optimal life — typically 5 years for MacBook Pro
              and 7 years for iMac — we flag it 6 months in advance, giving you time to budget for
              replacement without emergency purchases.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section className="py-12 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-4 text-center">
            SLA Packages for Financial Services Professionals
          </h2>
          <p className="text-[#7A9E98] text-center max-w-2xl mx-auto mb-10">
            All prices exclude VAT. Custom enterprise pricing available for practices with 20+ users.
            12-month contracts with quarterly review meetings included.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {tiers.map((tier, i) => (
              <div
                key={tier.name}
                className={`glass-card p-8 ${i === 1 ? 'border-[rgba(15,234,122,0.4)] shadow-[0_0_24px_rgba(15,234,122,0.1)]' : ''}`}
              >
                {i === 1 && (
                  <div className="text-[#0FEA7A] text-xs font-bold mb-3 tracking-widest uppercase">
                    Most Popular
                  </div>
                )}
                <h3 className="text-[#E8F4F1] text-xl font-bold mb-1">{tier.name}</h3>
                <p className="text-[#7A9E98] text-xs mb-2">{tier.ideal}</p>
                <p className="text-3xl font-extrabold text-[#0FEA7A] mb-6">
                  {tier.price}
                  <span className="text-sm font-normal text-[#7A9E98]">{tier.period}</span>
                </p>
                <ul className="space-y-2 mb-6">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-[#7A9E98] text-sm">
                      <span className="text-[#0FEA7A] mt-0.5">&#10003;</span> {f}
                    </li>
                  ))}
                </ul>
                <a
                  href="https://wa.me/27790539964?text=Hi%2C%20I%27m%20interested%20in%20the%20Investec%20managed%20IT%20plan"
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

      {/* Integration with Investec Security */}
      <section className="py-12 sm:py-20 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-6">
            Integration with Investec&rsquo;s Security Requirements
          </h2>
          <div className="space-y-6 text-[#7A9E98] leading-relaxed">
            <p>
              Investec maintains robust enterprise security standards. If your practice accesses
              Investec systems — whether through Investec Online, the Global Banking platform, or
              proprietary advisory tools — your devices must meet specific security baselines. We
              ensure every managed device exceeds those baselines.
            </p>
            <p>
              Our standard configuration for Investec-connected devices includes: FileVault 2 with
              institutional recovery key escrowed in JAMF, macOS Firewall with stealth mode enabled,
              Gatekeeper set to App Store and identified developers only, automatic security updates
              enabled, screen lock after 2 minutes of inactivity, and complex password requirements
              enforced via MDM profile. These settings align with the security frameworks typically
              required by Investec for third-party device access.
            </p>
            <p>
              We also manage certificate-based authentication for practices that require it, deploy
              and maintain VPN configurations compatible with Investec&rsquo;s network infrastructure,
              and coordinate with Investec&rsquo;s internal IT team when network access changes are
              required. The goal is seamless: your team should never experience friction between
              their managed Mac and Investec&rsquo;s enterprise environment.
            </p>
          </div>
        </div>
      </section>

      {/* 24/7 Priority Support */}
      <section className="py-12 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-6">
            Priority Support Aligned to Trading Hours
          </h2>
          <div className="space-y-6 text-[#7A9E98] leading-relaxed">
            <p>
              Generic IT providers offer &ldquo;business hours support&rdquo; from 08:00 to 17:00. That
              misses the reality of financial services. Pre-market preparation begins at 07:00. Post-market
              reporting runs until 18:30. Quarter-end and tax season push those hours further. Our
              financial services SLA reflects this reality with extended priority hours from 07:00 to
              18:00 SAST, Monday to Friday, with emergency support available outside those hours.
            </p>
            <p>
              During market hours, every support request from an Investec-plan client enters our priority
              queue. You are not waiting behind someone with a slow printer. Our team understands that if
              your Bloomberg Terminal integration stops working at 09:15 on a Monday morning, every minute
              of delay has a quantifiable cost. We treat it accordingly.
            </p>
            <p>
              All support is delivered by Apple-certified technicians with specific experience in financial
              services environments. We do not outsource to call centres. When you contact ZA Support,
              you reach someone who understands both the technical issue and the business context.
              That combination means faster resolution, fewer misdiagnoses, and less time explaining
              what you need.
            </p>
          </div>
        </div>
      </section>

      {/* Internal Links Section */}
      <section className="py-12 sm:py-16 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-extrabold text-[#E8F4F1] mb-6">Related Services</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link
              href="/managed-services"
              className="glass-card p-6 hover:border-[rgba(15,234,122,0.4)] transition-all"
            >
              <h3 className="text-[#E8F4F1] font-bold mb-2">All Managed Services</h3>
              <p className="text-[#7A9E98] text-sm">
                Overview of our full managed IT offering for businesses of all sizes.
              </p>
            </Link>
            <Link
              href="/managed-services/apple-specialist"
              className="glass-card p-6 hover:border-[rgba(15,234,122,0.4)] transition-all"
            >
              <h3 className="text-[#E8F4F1] font-bold mb-2">Apple Specialist IT</h3>
              <p className="text-[#7A9E98] text-sm">
                Dedicated Apple-first managed services with JAMF MDM and fleet management.
              </p>
            </Link>
            <Link
              href="/apple-support/medical-practices"
              className="glass-card p-6 hover:border-[rgba(15,234,122,0.4)] transition-all"
            >
              <h3 className="text-[#E8F4F1] font-bold mb-2">Medical Practice IT</h3>
              <p className="text-[#7A9E98] text-sm">
                HPCSA-compliant IT management for healthcare practices in Johannesburg.
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQAccordion items={faqs} title="Managed IT for Investec Clients — Common Questions" />
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-[rgba(39,80,77,0.3)] border border-[rgba(15,234,122,0.2)] rounded-3xl p-10">
            <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3">
              Ready to Secure Your Practice&rsquo;s IT?
            </h2>
            <p className="text-[#7A9E98] mb-2">
              New Investec-plan clients receive a{' '}
              <strong className="text-[#E8F4F1]">R599 IT security assessment</strong>. We audit
              your devices, evaluate your compliance posture, and recommend the right plan.
            </p>
            <p className="text-[#7A9E98] text-sm mb-6">
              Based at 1 Hyde Park Lane, Hyde Park — 8 minutes from Investec Place, Sandton.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/27790539964?text=Hi%2C%20I%27m%20an%20Investec%20client%20and%20I%27d%20like%20a%20complimentary%20IT%20assessment"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 transition-all"
              >
                <Phone className="w-5 h-5" /> WhatsApp Us Now
              </a>
              <a
                href={`tel:${CONTACT.phoneTel}`}
                className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all"
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
