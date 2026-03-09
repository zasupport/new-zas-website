import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, ArrowRight, Monitor, Shield, BarChart, Headphones } from 'lucide-react';
import SchemaOrg from '@/components/seo/SchemaOrg';
import FAQAccordion from '@/components/ui/FAQ';
import { CONTACT } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'IT Managed Services Johannesburg — Apple-First MSP | ZA Support',
  description:
    'IT managed services in Johannesburg. Apple-first MSP for medical practices, SMEs, and professionals. Monitoring, support, JAMF MDM. From R 4,500/month. Call 064 529 5863.',
  alternates: { canonical: 'https://zasupport.com/managed-services' },
};

const faqs = [
  { question: 'What is included in a managed services contract?', answer: 'Depends on the tier. Starter includes monitoring, patch management, health reporting, and email support. Business adds unlimited remote support, JAMF MDM, Microsoft 365 management, and on-site visits. Enterprise is fully custom — we scope it to your exact requirements.' },
  { question: 'Do you only manage Apple devices?', answer: 'We specialise in Apple. However, we also manage Windows workstations, network equipment (UniFi, Ubiquiti, Cisco), printers, and servers in environments that include Apple devices. We do not exclusively limit to Apple if your business has a mixed environment.' },
  { question: 'What does "proactive monitoring" mean?', answer: 'We monitor your devices continuously for: low storage, battery degradation, failing drives (SMART warnings), outdated software, backup failures, and network issues — before they cause downtime. Most clients never experience an issue because we resolve it silently in the background first.' },
  { question: 'Is managed services suitable for a small business with 5 Macs?', answer: 'Yes — our Starter tier is designed exactly for small teams of 5–15 devices. The monitoring and reporting alone typically prevent at least one major incident per year, making the investment cost-effective.' },
  { question: 'Do you service clients outside Hyde Park / Johannesburg?', answer: 'We service clients across the greater Johannesburg area including Sandton, Rosebank, Midrand, Randburg, and Fourways. Remote support is available nationally. On-site visits are scoped per location for clients outside Johannesburg.' },
];

const tiers = [
  {
    name: 'Starter', price: 'R 4,500/month', ideal: 'Ideal for: Solo professionals, small practices (up to 5 devices)',
    features: ['Continuous device monitoring', 'Monthly health reports', 'Patch management (macOS + iOS)', 'Backup monitoring and alerts', 'Email support (business hours)', '24-hour response SLA'],
  },
  {
    name: 'Business', price: 'R 8,500/month', ideal: 'Ideal for: SMEs, medical practices (5–20 devices)',
    features: ['Everything in Starter', 'JAMF MDM device management', 'Unlimited remote support', 'Monthly on-site visit (included)', 'Microsoft 365 management', 'Priority 4-hour response SLA', 'Network monitoring', 'Annual security review'],
  },
  {
    name: 'Enterprise', price: 'Custom', ideal: 'Ideal for: Multi-site businesses, 20+ devices',
    features: ['Everything in Business', 'Dedicated account manager', 'Custom SLA terms', 'On-site as needed', 'Integration with existing ITSM', 'Executive IT reporting'],
  },
];

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://zasupport.com' },
    { '@type': 'ListItem', position: 2, name: 'Managed Services', item: 'https://zasupport.com/managed-services' },
  ],
};

export default function ManagedServicesPage() {
  return (
    <>
      <SchemaOrg schema={breadcrumbSchema} />

      <section className="hero-gradient grid-overlay pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#E8F4F1] leading-tight mb-6" style={{ fontFamily: 'Syne, sans-serif' }}>
              IT Managed Services
              <br /><span className="text-[#0FEA7A]">Johannesburg — Apple-First</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-6 max-w-3xl leading-relaxed">
              Proactive IT management for medical practices, SMEs, and professionals. Monitoring, support,
              JAMF MDM, and Microsoft 365. From R 4,500/month. Hyde Park, Johannesburg.
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

      <section className="py-20 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-10 text-center" style={{ fontFamily: 'Syne, sans-serif' }}>What We Manage</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Monitor, title: 'Apple Mac Fleet', desc: 'MacBook, iMac, Mac mini — monitoring, updates, health reporting.' },
              { icon: Shield, title: 'Security & Compliance', desc: 'POPIA-ready. Encryption, backup, remote wipe, security patching.' },
              { icon: Headphones, title: 'Remote & On-Site Support', desc: 'Fast remote support + scheduled on-site visits included.' },
              { icon: BarChart, title: 'Reporting & Insights', desc: 'Monthly reports with ROI — what was protected, what was fixed.' },
            ].map(({ icon: Icon, title, desc }) => (
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

      <section className="py-20 bg-[#111C1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-10 text-center" style={{ fontFamily: 'Syne, sans-serif' }}>Managed Services Pricing</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tiers.map((tier, i) => (
              <div key={tier.name} className={`glass-card p-8 ${i === 1 ? 'border-[rgba(15,234,122,0.4)] shadow-[0_0_24px_rgba(15,234,122,0.1)]' : ''}`}>
                {i === 1 && <div className="text-[#0FEA7A] text-xs font-bold mb-3 tracking-widest uppercase">Most Popular</div>}
                <h3 className="text-[#E8F4F1] text-xl font-bold mb-1" style={{ fontFamily: 'Syne, sans-serif' }}>{tier.name}</h3>
                <p className="text-[#7A9E98] text-xs mb-3">{tier.ideal}</p>
                <p className="text-[#0FEA7A] text-3xl font-extrabold mb-6" style={{ fontFamily: 'Syne, sans-serif' }}>{tier.price}</p>
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

      <section className="py-20 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQAccordion items={faqs} title="Managed Services — Common Questions" />
        </div>
      </section>

      <section className="py-16 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-[rgba(39,80,77,0.3)] border border-[rgba(15,234,122,0.2)] rounded-3xl p-10">
            <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3" style={{ fontFamily: 'Syne, sans-serif' }}>Ready for Proactive IT Management?</h2>
            <p className="text-[#7A9E98] mb-6">Free consultation and IT assessment. No obligation. Hyde Park, Johannesburg.</p>
            <a href={`tel:${CONTACT.phoneTel}`} className="inline-flex items-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 transition-all">
              <Phone className="w-5 h-5" /> Call {CONTACT.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
