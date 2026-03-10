import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, ArrowRight } from 'lucide-react';
import Breadcrumb from '@/components/ui/Breadcrumb';
import FAQAccordion from '@/components/ui/FAQ';
import SchemaOrg from '@/components/seo/SchemaOrg';
import { buildFaqSchema, LOCAL_BUSINESS_PROVIDER } from '@/lib/schema';
import { CONTACT } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'MacBook Charging Port Repair Johannesburg | MagSafe, USB-C Not Charging | ZA Support',
  description:
    'MacBook charging port repair in Johannesburg from R 1,500. MagSafe not connecting, USB-C not charging, bent pins, Thunderbolt port fault. MacBook Air and Pro all models. No Fix No Fee.',
  alternates: { canonical: 'https://zasupport.com/macbook-repair/charging-port' },
};

const pricing = [
  ['MagSafe port cleaning / pin straightening', 'From R 500'],
  ['MacBook Air M1 / M2 / M3 — USB-C board replacement', 'From R 1,500'],
  ['MacBook Pro 13" M1 / M2 — USB-C board', 'From R 1,800'],
  ['MacBook Pro 14" / 16" M2 / M3 — USB-C board', 'From R 2,500'],
  ['MacBook Air Intel — USB-C board', 'From R 1,500'],
  ['MacBook Pro Intel 13" — USB-C board', 'From R 1,800'],
  ['MacBook Pro Intel 15" / 16" — USB-C / Thunderbolt board', 'From R 2,800'],
  ['MagSafe 1/2 port replacement (older Intel models)', 'From R 1,200'],
];

const symptoms = [
  'MacBook not charging when plugged in',
  'Charger connected but battery percentage not increasing',
  'MagSafe adapter light not turning on',
  'USB-C or Thunderbolt port physically damaged or bent',
  'MacBook only charges on one side but not the other',
  'Charging is intermittent — works sometimes but not reliably',
  'No video output through USB-C or Thunderbolt port',
  'External drives or accessories not recognised on one port',
];

const faqs = [
  {
    question: 'How much does MacBook charging port repair cost?',
    answer: 'A simple MagSafe port clean or pin-straightening starts at R 500. USB-C board replacement starts at R 1,500 for most models. We provide a free diagnosis before quoting so you know exactly what you are paying for.',
  },
  {
    question: 'My MacBook only charges on one side. Is that a port problem?',
    answer: 'Yes. On MacBooks with multiple USB-C ports, each side has its own I/O board. If charging only works on one side, the board on the non-charging side is likely damaged — this is common after liquid exposure or a port being forced. We replace the affected I/O board, not the entire logic board.',
  },
  {
    question: 'The MagSafe light is not turning on at all. What does that mean?',
    answer: 'If the MagSafe adapter is functional (test with another machine if possible), a port that shows no indicator light usually points to a faulty MagSafe port assembly or liquid damage inside the port. In some cases it can also be caused by a drained or failed battery preventing the charging circuit from activating. We run a full diagnostic to identify the root cause.',
  },
  {
    question: 'Can the charging port be repaired without replacing the whole logic board?',
    answer: 'In most cases, yes. On modern MacBooks, the charging ports are on a separate I/O board that is connected to the logic board by a ribbon cable — this board can be replaced independently. Only in cases of severe corrosion or logic board damage does charging repair escalate to board-level work.',
  },
  {
    question: 'My charger is fine but the port looks damaged or bent. What should I do?',
    answer: 'Stop using the port and bring the machine in immediately. Continuing to force a bent USB-C connector can cause further damage to the internal I/O board contacts or the logic board. We straighten bent pins and replace damaged port hardware — this is a much cheaper fix when caught early.',
  },
  {
    question: 'Does Apple cover charging port damage under warranty?',
    answer: 'Physical damage to charging ports (bent pins, cracked connectors, liquid damage) is not covered by Apple\'s standard warranty or AppleCare. Manufacturing defects may be covered within the warranty period. We offer a 12-month warranty on all our port repair work.',
  },
];

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'MacBook Charging Port Repair Johannesburg',
  provider: LOCAL_BUSINESS_PROVIDER,
  areaServed: { '@type': 'City', name: 'Johannesburg' },
  description: 'MacBook charging port repair in Johannesburg from R 1,500. MagSafe, USB-C and Thunderbolt port repair. All MacBook Air and Pro models.',
  offers: {
    '@type': 'AggregateOffer',
    lowPrice: '500',
    highPrice: '2800',
    priceCurrency: 'ZAR',
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://zasupport.com' },
    { '@type': 'ListItem', position: 2, name: 'MacBook Repair', item: 'https://zasupport.com/macbook-repair' },
    { '@type': 'ListItem', position: 3, name: 'Charging Port Repair', item: 'https://zasupport.com/macbook-repair/charging-port' },
  ],
};

const faqSchema = buildFaqSchema(faqs);

export default function MacBookChargingPortPage() {
  return (
    <>
      <SchemaOrg schema={faqSchema} />
      <SchemaOrg schema={breadcrumbSchema} />
      <SchemaOrg schema={serviceSchema} />

      <section className="hero-gradient grid-overlay pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: 'MacBook Repair', href: '/macbook-repair' }, { label: 'Charging Port Repair' }]} />
          <div className="mt-8 max-w-4xl">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-[#E8F4F1] leading-tight mb-6" style={{ fontFamily: 'Syne, sans-serif' }}>
              MacBook Charging Port<br /><span className="text-[#0FEA7A]">Repair Johannesburg</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-8">
              MagSafe not connecting, USB-C not charging, bent pins, Thunderbolt port fault. All MacBook Air and Pro models. From R 500. 12-month warranty.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href={`tel:${CONTACT.phoneTel}`} className="inline-flex items-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl font-bold hover:bg-[#0FEA7A]/90 transition-all">
                <Phone className="w-5 h-5" /> Call {CONTACT.phone}
              </a>
              <Link href="/contact" className="inline-flex items-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all">
                Get a Quote <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-4" style={{ fontFamily: 'Syne, sans-serif' }}>Charging Problems We Fix</h2>
              <p className="text-[#7A9E98] mb-6 text-sm">MagSafe, USB-C, and Thunderbolt — all charging and port faults diagnosed and repaired.</p>
              {symptoms.map((item) => (
                <div key={item} className="flex items-center gap-3 py-2.5 border-b border-[rgba(255,255,255,0.04)]">
                  <span className="text-[#0FEA7A] text-sm flex-shrink-0">&#10003;</span>
                  <span className="text-[#7A9E98] text-sm">{item}</span>
                </div>
              ))}
            </div>
            <div>
              <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-6" style={{ fontFamily: 'Syne, sans-serif' }}>Pricing by Repair Type</h2>
              <div className="glass-card p-6">
                {pricing.map(([model, price], i) => (
                  <div key={model} className={`flex justify-between py-3 ${i < pricing.length - 1 ? 'border-b border-[rgba(255,255,255,0.05)]' : ''}`}>
                    <span className="text-[#7A9E98] text-sm">{model}</span>
                    <span className="text-[#0FEA7A] font-bold text-sm">{price}</span>
                  </div>
                ))}
              </div>
              <p className="text-[#7A9E98] text-xs mt-3">Prices include parts and labour. 12-month warranty on all port repairs.</p>
              <div className="mt-6 glass-card p-4 border border-[rgba(15,234,122,0.15)]">
                <p className="text-[#0FEA7A] font-semibold text-sm mb-1">Only charges on one side?</p>
                <p className="text-[#7A9E98] text-xs">Each side of a dual USB-C MacBook has its own I/O board. A single-side charging fault is typically a board replacement — not a logic board repair. Much more affordable than it sounds.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQAccordion items={faqs} title="MacBook Charging Port Repair — FAQs" />
        </div>
      </section>

      <section className="py-16 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-[rgba(39,80,77,0.3)] border border-[rgba(15,234,122,0.2)] rounded-3xl p-10">
            <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3" style={{ fontFamily: 'Syne, sans-serif' }}>MacBook Not Charging?</h2>
            <p className="text-[#7A9E98] mb-6">From R 500. Free diagnosis. No Fix No Fee. Hyde Park, Johannesburg.</p>
            <a href={`tel:${CONTACT.phoneTel}`} className="inline-flex items-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 transition-all">
              <Phone className="w-5 h-5" /> Call {CONTACT.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
