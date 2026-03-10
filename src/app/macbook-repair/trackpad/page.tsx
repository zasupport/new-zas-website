import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, ArrowRight } from 'lucide-react';
import Breadcrumb from '@/components/ui/Breadcrumb';
import FAQAccordion from '@/components/ui/FAQ';
import SchemaOrg from '@/components/seo/SchemaOrg';
import { buildFaqSchema, LOCAL_BUSINESS_PROVIDER } from '@/lib/schema';
import { CONTACT } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'MacBook Trackpad Repair Johannesburg | Clicking, Freezing, Not Responding | ZA Support',
  description:
    'MacBook trackpad repair in Johannesburg from R 1,800. Trackpad not clicking, freezing, erratic cursor, swollen battery pushing trackpad up. MacBook Air and Pro all models. No Fix No Fee.',
  alternates: { canonical: 'https://zasupport.com/macbook-repair/trackpad' },
};

const pricing = [
  ['MacBook Air M1 / M2 / M3', 'From R 1,800'],
  ['MacBook Pro 13" M1 / M2', 'From R 2,200'],
  ['MacBook Pro 14" / 16" M2 / M3', 'From R 2,800'],
  ['MacBook Air Intel (2018–2020)', 'From R 1,800'],
  ['MacBook Pro Intel 13" (2016–2020)', 'From R 2,200'],
  ['MacBook Pro Intel 15" (2016–2019)', 'From R 2,800'],
  ['MacBook Pro Intel 16" (2019)', 'From R 3,000'],
];

const symptoms = [
  'Trackpad not clicking or clicking in the wrong spot',
  'Cursor moving erratically or jumping around the screen',
  'Trackpad completely unresponsive',
  'Trackpad clicking on its own (ghost clicks)',
  'Trackpad raised or lifted — usually caused by swollen battery underneath',
  'Two-finger scrolling or gestures not working',
  'Trackpad feels sticky or has physical damage',
  'Clicking works but pointer does not move',
];

const faqs = [
  {
    question: 'How much does MacBook trackpad repair cost?',
    answer: 'MacBook trackpad repair starts at R 1,800 for most models. The cost depends on whether it is a simple calibration or requires a full trackpad replacement. If a swollen battery is pushing the trackpad up, we replace the battery as part of the same job — we provide a combined quote. Free assessment before any work starts.',
  },
  {
    question: 'My MacBook trackpad is raised and hard to click. What is causing this?',
    answer: 'A raised or bulging trackpad is almost always caused by a swollen battery underneath. As lithium batteries age and degrade, they can swell and physically push the trackpad upward. This is a safety issue — the battery should be replaced immediately. We handle both the battery replacement and trackpad realignment in a single repair.',
  },
  {
    question: 'Why is my MacBook trackpad cursor jumping around?',
    answer: 'An erratic cursor is typically caused by a faulty trackpad sensor, a cracked trackpad surface, or contamination under the trackpad glass. It can also be triggered by palm detection being over-sensitive. We run a full diagnostic to pinpoint the cause before recommending a repair.',
  },
  {
    question: 'How long does MacBook trackpad repair take?',
    answer: 'Most trackpad replacements take 1.5 to 2.5 hours. If a swollen battery is also being replaced, allow 2 to 3 hours. We will confirm the timeline when you drop your machine in.',
  },
  {
    question: 'Is the MacBook trackpad covered under the Apple warranty?',
    answer: 'Physical damage, liquid spills, and swollen battery-related trackpad damage are not covered by Apple\'s standard warranty or AppleCare. Manufacturing defects in the trackpad mechanism may be covered if the machine is within the warranty period. We offer a 12-month warranty on all our trackpad repairs.',
  },
  {
    question: 'Can you repair the trackpad without replacing the whole top case?',
    answer: 'On most modern MacBook models the trackpad is a separate replaceable component and does not require a full top case replacement. Older butterfly-era MacBook Pros had the keyboard riveted to the top case, but the trackpad was still separate. We always take the most cost-effective repair path for your specific model.',
  },
];

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'MacBook Trackpad Repair Johannesburg',
  provider: LOCAL_BUSINESS_PROVIDER,
  areaServed: { '@type': 'City', name: 'Johannesburg' },
  description: 'MacBook trackpad repair in Johannesburg from R 1,800. Trackpad not clicking, erratic cursor, swollen battery. All MacBook Air and Pro models.',
  offers: {
    '@type': 'AggregateOffer',
    lowPrice: '1800',
    highPrice: '3000',
    priceCurrency: 'ZAR',
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://zasupport.com' },
    { '@type': 'ListItem', position: 2, name: 'MacBook Repair', item: 'https://zasupport.com/macbook-repair' },
    { '@type': 'ListItem', position: 3, name: 'Trackpad Repair', item: 'https://zasupport.com/macbook-repair/trackpad' },
  ],
};

const faqSchema = buildFaqSchema(faqs);

export default function MacBookTrackpadPage() {
  return (
    <>
      <SchemaOrg schema={faqSchema} />
      <SchemaOrg schema={breadcrumbSchema} />
      <SchemaOrg schema={serviceSchema} />

      <section className="hero-gradient grid-overlay pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: 'MacBook Repair', href: '/macbook-repair' }, { label: 'Trackpad Repair' }]} />
          <div className="mt-8 max-w-4xl">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-[#E8F4F1] leading-tight mb-6" style={{ fontFamily: 'Syne, sans-serif' }}>
              MacBook Trackpad<br /><span className="text-[#0FEA7A]">Repair Johannesburg</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-8">
              Trackpad not clicking, cursor jumping, trackpad raised from swollen battery. All MacBook Air and Pro models. From R 1,800. 12-month warranty.
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
              <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-4" style={{ fontFamily: 'Syne, sans-serif' }}>Trackpad Problems We Fix</h2>
              <p className="text-[#7A9E98] mb-6 text-sm">From a stuck click to a completely dead trackpad — all faults diagnosed and repaired.</p>
              {symptoms.map((item) => (
                <div key={item} className="flex items-center gap-3 py-2.5 border-b border-[rgba(255,255,255,0.04)]">
                  <span className="text-[#0FEA7A] text-sm flex-shrink-0">&#10003;</span>
                  <span className="text-[#7A9E98] text-sm">{item}</span>
                </div>
              ))}
            </div>
            <div>
              <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-6" style={{ fontFamily: 'Syne, sans-serif' }}>Pricing by Model</h2>
              <div className="glass-card p-6">
                {pricing.map(([model, price], i) => (
                  <div key={model} className={`flex justify-between py-3 ${i < pricing.length - 1 ? 'border-b border-[rgba(255,255,255,0.05)]' : ''}`}>
                    <span className="text-[#7A9E98] text-sm">{model}</span>
                    <span className="text-[#0FEA7A] font-bold text-sm">{price}</span>
                  </div>
                ))}
              </div>
              <p className="text-[#7A9E98] text-xs mt-3">Prices include parts and labour. 12-month warranty on all trackpad repairs.</p>
              <div className="mt-6 glass-card p-4 border border-[rgba(15,234,122,0.15)]">
                <p className="text-[#0FEA7A] font-semibold text-sm mb-1">Swollen Battery Pushing Trackpad Up?</p>
                <p className="text-[#7A9E98] text-xs">This is the most common cause of a raised trackpad. We replace the battery and realign the trackpad in one visit. Do not continue using the machine — a swollen battery is a fire risk.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQAccordion items={faqs} title="MacBook Trackpad Repair — FAQs" />
        </div>
      </section>

      <section className="py-16 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-[rgba(39,80,77,0.3)] border border-[rgba(15,234,122,0.2)] rounded-3xl p-10">
            <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3" style={{ fontFamily: 'Syne, sans-serif' }}>MacBook Trackpad Not Working?</h2>
            <p className="text-[#7A9E98] mb-6">From R 1,800. Free assessment. No Fix No Fee. Hyde Park, Johannesburg.</p>
            <a href={`tel:${CONTACT.phoneTel}`} className="inline-flex items-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 transition-all">
              <Phone className="w-5 h-5" /> Call {CONTACT.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
