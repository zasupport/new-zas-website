import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, ArrowRight, Shield, Wifi, Users, BarChart } from 'lucide-react';
import SchemaOrg from '@/components/seo/SchemaOrg';
import { buildFaqSchema } from '@/lib/schema';
import FAQAccordion from '@/components/ui/FAQ';
import { CONTACT } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'JAMF MDM Implementation South Africa | Apple Device Management | ZA Support',
  description: 'JAMF MDM implementation in South Africa. JAMF Pro and JAMF Now for schools, medical practices, and businesses. Call 064 529 5863.',
  alternates: { canonical: 'https://zasupport.com/jamf-mdm' },
};

const faqs = [
  { question: 'What is JAMF MDM?', answer: 'JAMF is the leading Mobile Device Management (MDM) platform for Apple devices. It allows IT administrators to enroll, configure, secure, and manage iPhones, iPads, and Macs centrally. JAMF Pro is for large enterprises; JAMF Now is for smaller businesses with up to 75 devices.' },
  { question: 'Who should use JAMF MDM?', answer: 'Any organisation with 5 or more Apple devices benefits from MDM. Medical practices with patient data obligations under POPIA, schools with student iPads, businesses deploying Macs, all benefit from central device management, policy enforcement, and remote wipe capability.' },
  { question: 'What is the difference between JAMF Pro and JAMF Now?', answer: 'JAMF Now is a simpler, web-based MDM ideal for small businesses up to 75 devices. JAMF Pro is the enterprise platform with full scripting, smart groups, policies, and integration with Active Directory and Azure AD. We implement and manage both, we will recommend the right tier for your organisation.' },
  { question: 'Can JAMF MDM help with POPIA compliance?', answer: 'Yes. JAMF enables remote wipe of lost or stolen devices, enforces encryption (FileVault on Mac, built-in on iOS), requires strong passcodes, and provides an audit trail of device configurations, all relevant to POPIA compliance requirements for personal and patient data protection.' },
  { question: 'Do we need to be physically present to enroll devices?', answer: 'No. Using Apple Business Manager and Automated Device Enrollment (ADE), new Apple devices can be enrolled, configured, and deployed automatically without physical access, the device configures itself on first boot.' },
];

const features = [
  { icon: Shield, title: 'Security & Compliance', desc: 'Enforce encryption, passcodes, and remote wipe. Audit-ready for POPIA compliance.' },
  { icon: Wifi, title: 'Zero-Touch Deployment', desc: 'New devices configure automatically via Apple Business Manager. No manual setup.' },
  { icon: Users, title: 'App Management', desc: 'Deploy, license, and update apps silently. No App Store logins required on managed devices.' },
  { icon: BarChart, title: 'Inventory & Reporting', desc: 'Real-time visibility of every device, hardware, software, compliance status.' },
];

const tiers = [
  { name: 'Starter', devices: 'Up to 25 devices', features: ['JAMF Now implementation', 'Apple Business Manager setup', 'Device enrollment (all devices)', 'Basic policy configuration', 'Remote wipe capability', 'Monthly health report'] },
  { name: 'Business', devices: '25–100 devices', features: ['JAMF Pro implementation', 'Full policy and script management', 'Smart groups and targeting', 'App catalog and licensing', 'Azure AD / Active Directory integration', 'Weekly reporting and monitoring', 'Priority support response'] },
  { name: 'Enterprise', devices: '100+ devices', features: ['Full JAMF Pro enterprise deployment', 'Custom scripting and automation', 'Integration with existing ITSM tools', 'Dedicated account manager', 'SLA-backed support', '24/7 escalation path'] },
];

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://zasupport.com' },
    { '@type': 'ListItem', position: 2, name: 'JAMF MDM', item: 'https://zasupport.com/jamf-mdm' },
  ],
};

const faqSchema = buildFaqSchema(faqs);

export default function JamfMdmPage() {
  return (
    <>
      <SchemaOrg schema={faqSchema} />
      <SchemaOrg schema={breadcrumbSchema} />

      <section className="hero-gradient grid-overlay pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#E8F4F1] leading-tight mb-6" style={{ fontFamily: 'Syne, sans-serif' }}>
              JAMF MDM Implementation
              <br /><span className="text-[#0FEA7A]">in South Africa</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-6 max-w-3xl leading-relaxed">
              South Africa&apos;s Apple MDM specialists. JAMF Pro and JAMF Now implementation for medical practices,
              schools, and businesses. Hyde Park, Johannesburg.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href={`tel:${CONTACT.phoneTel}`} className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 transition-all">
                <Phone className="w-5 h-5" /> Call {CONTACT.phone}
              </a>
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all">
                Get a Quote <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-10 text-center" style={{ fontFamily: 'Syne, sans-serif' }}>What JAMF MDM Delivers</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="glass-card p-6 text-center">
                <div className="w-12 h-12 bg-[rgba(15,234,122,0.1)] rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-6 h-6 text-[#0FEA7A]" />
                </div>
                <h3 className="text-[#E8F4F1] font-bold mb-2" style={{ fontFamily: 'Syne, sans-serif' }}>{title}</h3>
                <p className="text-[#7A9E98] text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-20 bg-[#111C1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-10 text-center" style={{ fontFamily: 'Syne, sans-serif' }}>JAMF Pro vs JAMF Now, Plans</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {tiers.map((tier, i) => (
              <div key={tier.name} className={`glass-card p-8 ${i === 1 ? 'border-[rgba(15,234,122,0.4)] shadow-[0_0_24px_rgba(15,234,122,0.1)]' : ''}`}>
                {i === 1 && <div className="text-[#0FEA7A] text-xs font-bold mb-3 tracking-widest uppercase">Most Popular</div>}
                <h3 className="text-[#E8F4F1] text-xl font-bold mb-1" style={{ fontFamily: 'Syne, sans-serif' }}>{tier.name}</h3>
                <p className="text-[#7A9E98] text-sm mb-6">{tier.devices}</p>
                <ul className="space-y-2 mb-6">
                  {tier.features.map(f => (
                    <li key={f} className="flex items-start gap-2 text-[#7A9E98] text-sm">
                      <span className="text-[#0FEA7A] mt-0.5">✓</span> {f}
                    </li>
                  ))}
                </ul>
                <Link href="/contact" className="block text-center bg-[rgba(15,234,122,0.1)] border border-[rgba(15,234,122,0.3)] text-[#0FEA7A] px-4 py-3 rounded-xl text-sm font-semibold hover:bg-[rgba(15,234,122,0.2)] transition-all">
                  Get Started
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQAccordion items={faqs} title="JAMF MDM, Common Questions" />
        </div>
      </section>

      <section className="py-16 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-[rgba(39,80,77,0.3)] border border-[rgba(15,234,122,0.2)] rounded-3xl p-10">
            <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3" style={{ fontFamily: 'Syne, sans-serif' }}>Ready to Manage Your Apple Devices?</h2>
            <p className="text-[#7A9E98] mb-6">Free consultation. No obligation. Hyde Park, Johannesburg.</p>
            <a href={`tel:${CONTACT.phoneTel}`} className="inline-flex items-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 transition-all">
              <Phone className="w-5 h-5" /> Call {CONTACT.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
