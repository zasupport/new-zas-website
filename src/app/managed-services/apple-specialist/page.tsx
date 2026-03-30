import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, ArrowRight, Shield, CheckCircle, Star, Monitor, Laptop, Lock } from 'lucide-react';
import SchemaOrg from '@/components/seo/SchemaOrg';
import { buildFaqSchema } from '@/lib/schema';
import FAQAccordion from '@/components/ui/FAQ';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { CONTACT, buildWhatsAppUrl } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Apple IT Specialist Johannesburg — Apple Managed Services | ZA Support',
  description:
    'Apple IT specialist in Johannesburg. JAMF MDM, Apple Business Manager, M-series Mac fleet management, Monterey/Ventura/Sonoma. Apple-only MSP for businesses and medical practices. Call 064 529 5863.',
  alternates: { canonical: 'https://zasupport.com/managed-services/apple-specialist' },
};

const faqs = [
  {
    question: 'What is an Apple IT specialist and why does it matter?',
    answer:
      'An Apple IT specialist is an MSP that manages exclusively or primarily Apple devices — Macs, iPhones, iPads — using Apple-native tools such as JAMF MDM, Apple Business Manager, and Apple School Manager. A generalist IT company manages Windows first and treats Apple as an edge case. For businesses running Apple fleets, this means slower support, misconfigured MDM, and missed macOS-specific security vulnerabilities. ZA Support has specialised in Apple since 2009.',
  },
  {
    question: 'What is JAMF MDM and do I need it?',
    answer:
      'JAMF is the industry-standard mobile device management platform for Apple fleets. It allows centralised configuration of every Mac, iPhone, and iPad in your business — pushing settings, enforcing security policies, deploying software silently, and remotely wiping a lost device. If you have more than three Apple devices in a business context, JAMF MDM removes manual setup work and closes security gaps that manual configuration misses.',
  },
  {
    question: 'What is Apple Business Manager?',
    answer:
      'Apple Business Manager (ABM) is Apple\'s free portal for businesses to manage Apple device purchasing, deployment, and app distribution. When a new Mac is purchased through ABM, it automatically enrols into your MDM profile the moment it is switched on — zero-touch provisioning. ZA Support sets up and manages ABM for our clients, linking it to JAMF for seamless fleet deployment.',
  },
  {
    question: 'Do you support M-series Apple Silicon Macs?',
    answer:
      'Yes. All Apple Silicon Macs (M1, M2, M3, M4) are fully supported — including the unique security architecture, Secure Enclave, and the Activation Lock behaviour that differs from Intel Macs. JAMF MDM works natively with Apple Silicon. Our monitoring agent (Health Check) is a universal binary running natively on both architectures.',
  },
  {
    question: 'Which macOS versions do you manage?',
    answer:
      'We actively manage macOS Monterey (12), Ventura (13), Sonoma (14), and Sequoia (15). We track release cadence, test compatibility with common South African business software before advising upgrades, and push managed updates via MDM once compatibility is confirmed. We do not push a macOS update on the same day Apple releases it.',
  },
  {
    question: 'Can you manage ProApps like Final Cut Pro, Logic Pro, and Motion?',
    answer:
      'Yes. We support businesses running Apple ProApps including Final Cut Pro, Logic Pro, Motion, Compressor, and MainStage. This includes licensing via Apple Business Manager, performance configuration (ProRes, RAM allocation, GPU settings on compatible Macs), and ensuring macOS updates do not break project compatibility.',
  },
  {
    question: 'What is the difference between break-fix IT and managed services?',
    answer:
      'Break-fix IT means you call when something goes wrong. You pay per incident. Downtime is unpredictable. Managed services means we monitor your environment continuously, fix issues before they cause downtime, and handle all updates, backups, and security proactively. For most businesses, managed services costs less per year than two or three break-fix callouts.',
  },
  {
    question: 'Do you serve businesses outside Hyde Park?',
    answer:
      'We serve businesses across greater Johannesburg including Sandton, Rosebank, Midrand, Randburg, Fourways, and Bryanston. Remote support is available nationally for Apple fleet management tasks that do not require a physical presence.',
  },
  {
    question: 'How does ZA Support differ from MacRoots or other Johannesburg Apple MSPs?',
    answer:
      'ZA Support is based in Hyde Park and has been operating since 2009 — longer than most Johannesburg Apple MSPs. We offer component-level logic board repair in our own workshop, JAMF MDM, and Apple Business Manager setup as a bundled service. We do not outsource repairs and we do not resell another company\'s monitoring platform — our Health Check monitoring is built internally.',
  },
];

const capabilities = [
  {
    icon: Monitor,
    title: 'JAMF MDM',
    desc: 'Full JAMF Pro setup, device enrolment, policy configuration, app deployment, and ongoing management. Apple Silicon and Intel supported.',
  },
  {
    icon: Laptop,
    title: 'Apple Business Manager',
    desc: 'ABM setup and management. Zero-touch Mac deployment, VPP app licences, device assignment and transfer.',
  },
  {
    icon: Shield,
    title: 'M-Series Mac Support',
    desc: 'Apple Silicon-native management. Secure Enclave, Activation Lock, and MDM bootstrap token handling.',
  },
  {
    icon: Lock,
    title: 'macOS Fleet Management',
    desc: 'Monterey through Sequoia. Managed updates, compatibility testing before rollout, configuration profiles.',
  },
  {
    icon: CheckCircle,
    title: 'ProApps Support',
    desc: 'Final Cut Pro, Logic Pro, Motion, Compressor. Licensing via ABM, performance tuning, update management.',
  },
  {
    icon: Phone,
    title: 'Health Check Monitoring',
    desc: 'Real-time monitoring agent on every device. Battery, storage, SMART, security posture — proactively resolved.',
  },
];

const comparisons = [
  {
    topic: 'MDM Platform',
    generalist: 'Windows Intune, often forced onto Macs',
    specialist: 'JAMF Pro — built for Apple, certified',
  },
  {
    topic: 'macOS Updates',
    generalist: 'Push when available, no compatibility testing',
    specialist: 'Tested against your software stack first',
  },
  {
    topic: 'Apple Silicon',
    generalist: 'Treated as a variant of Intel Mac',
    specialist: 'Native support, correct MDM bootstrap token handling',
  },
  {
    topic: 'ProApps',
    generalist: 'Not supported or billed separately',
    specialist: 'Included in managed services scope',
  },
  {
    topic: 'Logic Board Repair',
    generalist: 'Referred to Apple or third-party workshop',
    specialist: 'In-house component-level repair, same organisation',
  },
  {
    topic: 'Support Response',
    generalist: 'Tickets via a shared helpdesk, variable SLAs',
    specialist: 'Direct WhatsApp to your technician, 4-hour SLA',
  },
];

const reviews = [
  {
    name: 'T.V.',
    suburb: 'Sandton',
    text: 'ZA Support rolled out JAMF MDM across our 12-device Apple fleet in a single day. Every Mac was configured, enrolled, and had our standard software deployed without us needing to touch them. The setup was seamless.',
    rating: 5,
  },
  {
    name: 'K.M.',
    suburb: 'Fourways',
    text: 'We were using a Windows-focused IT company for our Apple fleet and it was a constant battle. Switching to ZA Support was an immediate improvement — they actually understand macOS and JAMF.',
    rating: 5,
  },
];

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://zasupport.com' },
    { '@type': 'ListItem', position: 2, name: 'Managed Services', item: 'https://zasupport.com/managed-services' },
    { '@type': 'ListItem', position: 3, name: 'Apple IT Specialist', item: 'https://zasupport.com/managed-services/apple-specialist' },
  ],
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Apple IT Specialist — Johannesburg Managed Services',
  provider: {
    '@type': 'LocalBusiness',
    name: 'ZA Support',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '1 Hyde Lane',
      addressLocality: 'Hyde Park',
      addressRegion: 'Gauteng',
      postalCode: '2196',
      addressCountry: 'ZA',
    },
    telephone: '+27645295863',
  },
  areaServed: { '@type': 'City', name: 'Johannesburg' },
  description: 'Apple IT specialist in Johannesburg. JAMF MDM, Apple Business Manager, M-series Mac fleet management, ProApps support. Hyde Park-based MSP since 2009.',
  serviceType: 'Apple Managed IT Services',
};

const faqSchema = buildFaqSchema(faqs);

export default function AppleSpecialistPage() {
  return (
    <>
      <SchemaOrg schema={faqSchema} />
      <SchemaOrg schema={breadcrumbSchema} />
      <SchemaOrg schema={serviceSchema} />

      {/* Hero */}
      <section className="hero-gradient grid-overlay pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: 'Managed Services', href: '/managed-services' }, { label: 'Apple IT Specialist' }]} />
          <div className="mt-8 max-w-4xl">
            <div className="inline-flex items-center gap-2 bg-[rgba(15,234,122,0.08)] border border-[rgba(15,234,122,0.2)] rounded-full px-4 py-2 mb-6">
              <Monitor className="w-4 h-4 text-[#0FEA7A]" />
              <span className="text-[#0FEA7A] text-sm font-semibold">JAMF MDM · Apple Business Manager · Hyde Park, Johannesburg</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-[#E8F4F1] leading-tight mb-4">
              Apple IT Specialist —<br /><span className="text-[#0FEA7A]">Johannesburg Managed Services</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-6 max-w-3xl leading-relaxed">
              Apple-first managed IT for Johannesburg businesses. JAMF MDM, Apple Business Manager, M-series Mac fleet management, and ProApps support — from an MSP that has specialised in Apple since 2009.
            </p>

            <div className="flex flex-wrap gap-3 mb-8">
              {[
                'JAMF Pro certified',
                'Apple Business Manager',
                'M-series Apple Silicon',
                'Monterey to Sequoia',
                'ProApps supported',
                'Hyde Park, Johannesburg',
              ].map((item) => (
                <div key={item} className="flex items-center gap-2 bg-[rgba(15,234,122,0.08)] border border-[rgba(15,234,122,0.15)] px-3 py-1.5 rounded-full">
                  <CheckCircle className="w-3.5 h-3.5 text-[#0FEA7A]" />
                  <span className="text-[#E8F4F1] text-xs font-medium">{item}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={`tel:${CONTACT.phoneTel}`}
                className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 transition-all">
                <Phone className="w-5 h-5" /> Call {CONTACT.phone}
              </a>
              <a
                href={buildWhatsAppUrl('MSP-APPSPEC', 'managed-services')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all"
              >
                WhatsApp Us
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.2)] text-[#7A9E98] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[rgba(15,234,122,0.05)] transition-all"
              >
                Get a Quote <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="py-12 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3">Apple IT Specialist Capabilities</h2>
          <p className="text-[#7A9E98] mb-10 max-w-2xl">
            Every service built around Apple&apos;s ecosystem — not retrofitted from a Windows-first platform.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilities.map(({ icon: Icon, title, desc }) => (
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

      {/* Specialist vs Generalist Comparison */}
      <section className="py-12 sm:py-20 bg-[#111C1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3">
            Apple Specialist vs Generalist IT Company
          </h2>
          <p className="text-[#7A9E98] mb-10 max-w-2xl">
            If your business runs Apple, your IT provider should too.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[rgba(255,255,255,0.08)]">
                  <th className="text-left py-3 px-4 text-[#7A9E98] text-sm font-semibold">Topic</th>
                  <th className="text-left py-3 px-4 text-[#7A9E98] text-sm font-semibold">Generalist IT Company</th>
                  <th className="text-left py-3 px-4 text-[#0FEA7A] text-sm font-semibold">ZA Support — Apple Specialist</th>
                </tr>
              </thead>
              <tbody>
                {comparisons.map((row, i) => (
                  <tr key={row.topic} className={`border-b border-[rgba(255,255,255,0.05)] ${i % 2 === 0 ? 'bg-[rgba(255,255,255,0.01)]' : ''}`}>
                    <td className="py-3 px-4 text-[#E8F4F1] text-sm font-semibold">{row.topic}</td>
                    <td className="py-3 px-4 text-[#7A9E98] text-sm">{row.generalist}</td>
                    <td className="py-3 px-4 text-[#0FEA7A] text-sm">{row.specialist}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Why Apple Business Manager matters */}
      <section className="py-12 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-6">
                Why Apple Business Manager Changes Everything
              </h2>
              <div className="space-y-5">
                {[
                  {
                    title: 'Zero-touch Mac deployment',
                    desc: 'A new Mac purchased through ABM is automatically enrolled in JAMF the moment it connects to the internet. No manual setup. Configuration, apps, and settings deploy automatically.',
                  },
                  {
                    title: 'Centrally managed app licences',
                    desc: 'Purchase and distribute apps across your fleet from a single location. Volume purchase licences are assigned per device or per user, no personal Apple IDs required on corporate devices.',
                  },
                  {
                    title: 'Device ownership is clear',
                    desc: 'ABM-enrolled devices are permanently associated with your organisation. If an employee leaves, the device can be remotely wiped and reassigned — the MDM profile cannot be removed by the user.',
                  },
                  {
                    title: 'Activation Lock management',
                    desc: 'Apple Business Manager provides Activation Lock bypass for enrolled devices. For IT teams, this is critical — a departing employee cannot lock a corporate Mac to their personal Apple ID.',
                  },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <CheckCircle className="w-5 h-5 text-[#0FEA7A] flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[#E8F4F1] font-semibold text-sm">{item.title}</p>
                      <p className="text-[#7A9E98] text-sm mt-1">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <div className="glass-card p-6 border-l-4 border-[#0FEA7A]">
                <p className="text-[#E8F4F1] font-bold mb-2">M-series Apple Silicon — what changes</p>
                <p className="text-[#7A9E98] text-sm">Apple Silicon Macs use a different MDM bootstrap token process. FileVault recovery key escrow requires the correct MDM authorisation flow. Incorrect setup means encrypted Macs that cannot be recovered. ZA Support handles this correctly from initial enrolment.</p>
              </div>
              <div className="glass-card p-6">
                <p className="text-[#E8F4F1] font-semibold mb-3">macOS management across versions</p>
                <div className="space-y-2">
                  {[
                    { version: 'macOS Sequoia (15)', status: 'Fully managed' },
                    { version: 'macOS Sonoma (14)', status: 'Fully managed' },
                    { version: 'macOS Ventura (13)', status: 'Fully managed' },
                    { version: 'macOS Monterey (12)', status: 'Legacy managed' },
                  ].map((v) => (
                    <div key={v.version} className="flex justify-between items-center">
                      <span className="text-[#7A9E98] text-sm">{v.version}</span>
                      <span className="text-[#0FEA7A] text-xs font-semibold">{v.status}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ProApps */}
      <section className="py-12 sm:py-20 bg-[#111C1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3">
            ProApps Support — Final Cut Pro, Logic Pro, and More
          </h2>
          <p className="text-[#7A9E98] mb-8 max-w-2xl">
            Creative and media businesses require Apple-native expertise. We manage ProApps licences, performance configuration, and macOS update compatibility for the full Apple ProApps suite.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
            {['Final Cut Pro', 'Logic Pro', 'Motion', 'Compressor', 'MainStage', 'Pro Video Formats'].map((app) => (
              <div key={app} className="glass-card p-4 text-center">
                <p className="text-[#E8F4F1] font-semibold text-sm">{app}</p>
              </div>
            ))}
          </div>
          <p className="text-[#7A9E98] text-sm max-w-3xl">
            ProApps are distributed via Apple Business Manager with volume purchase licences — no individual App Store accounts required on corporate Macs. Performance profiles are configured per workstation based on GPU, RAM, and storage characteristics.
          </p>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-12 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-8">
            What Johannesburg Businesses Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reviews.map((r) => (
              <div key={r.name} className="glass-card p-6">
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: r.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#0FEA7A] text-[#0FEA7A]" />
                  ))}
                </div>
                <p className="text-[#7A9E98] text-sm leading-relaxed mb-4">&ldquo;{r.text}&rdquo;</p>
                <p className="text-[#E8F4F1] font-semibold text-sm">{r.name}</p>
                <p className="text-[#7A9E98] text-xs">{r.suburb}, Johannesburg</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 sm:py-20 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQAccordion items={faqs} title="Apple IT Specialist, Common Questions" />
        </div>
      </section>

      {/* Related Services */}
      <section className="py-12 bg-[#071210]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold text-[#E8F4F1] mb-6">Related Services</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              { label: 'Managed IT Services', href: '/managed-services' },
              { label: 'Mac IT Support — SME', href: '/managed-services/it-support' },
              { label: 'JAMF MDM Johannesburg', href: '/jamf-mdm' },
              { label: 'Medical Practice IT', href: '/apple-support/medical-practices' },
              { label: 'Logic Board Repair', href: '/logic-board-repair' },
              { label: 'Assessment: from R599', href: '/no-fix-no-fee' },
            ].map((link) => (
              <Link key={link.href} href={link.href} className="block p-3 rounded-lg bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] text-[#7A9E98] hover:text-[#0FEA7A] hover:border-[#0FEA7A] text-sm transition-colors">
                {link.label} →
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-[rgba(39,80,77,0.3)] border border-[rgba(15,234,122,0.2)] rounded-3xl p-10">
            <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3">
              Johannesburg&apos;s Apple IT Specialist
            </h2>
            <p className="text-[#7A9E98] mb-2">
              JAMF MDM, Apple Business Manager, M-series Mac management. Initial consultation included for new clients.
            </p>
            <p className="text-[#7A9E98] text-sm mb-8">Hyde Park, Johannesburg. Apple-first since 2009.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`tel:${CONTACT.phoneTel}`}
                className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 transition-all">
                <Phone className="w-5 h-5" /> Call {CONTACT.phone}
              </a>
              <a
                href={buildWhatsAppUrl('MSP-APPSPEC', 'managed-services')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all"
              >
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
