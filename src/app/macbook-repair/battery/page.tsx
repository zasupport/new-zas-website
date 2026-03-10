import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, ArrowRight } from 'lucide-react';
import Breadcrumb from '@/components/ui/Breadcrumb';
import FAQAccordion from '@/components/ui/FAQ';
import SchemaOrg from '@/components/seo/SchemaOrg';
import { buildFaqSchema, LOCAL_BUSINESS_PROVIDER } from '@/lib/schema';
import { CONTACT, SITE } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'MacBook Battery Replacement Johannesburg | From R 1,200 | ZA Support',
  description:
    'MacBook battery replacement in Johannesburg from R 1,200. All MacBook Air and MacBook Pro models — M1, M2, M3 and Intel. Same-day service. 12-month warranty. No Fix No Fee. Hyde Park.',
  alternates: { canonical: 'https://zasupport.com/macbook-repair/battery' },
};

const pricing = [
  ['MacBook Air M1 (2020)', 'R 1,200'],
  ['MacBook Air M2 (2022–2023)', 'R 1,400'],
  ['MacBook Air M3 (2024)', 'R 1,500'],
  ['MacBook Pro 13" M1 / M2', 'R 1,500'],
  ['MacBook Pro 14" / 16" M2 / M3', 'R 1,800'],
  ['MacBook Air Intel (2017–2020)', 'R 1,200'],
  ['MacBook Pro 13" Intel (2016–2020)', 'R 1,500'],
  ['MacBook Pro 15" / 16" Intel', 'R 1,800'],
];

const symptoms = [
  'Battery health below 80% in System Settings',
  'MacBook shuts down with battery remaining',
  'Battery drains in under 2 hours',
  'MacBook runs very hot on battery',
  'Swollen battery causing trackpad to click unevenly',
  'Battery percentage jumps or drops suddenly',
  'macOS showing "Service Recommended" warning',
  'MacBook only works when plugged in',
];

const faqs = [
  {
    question: 'How do I check my MacBook battery health?',
    answer: 'On macOS Ventura and later: System Settings > Battery > Battery Health. On older macOS: hold Option, click the Apple menu, choose System Information, then Power section. You will see your design capacity versus maximum capacity. Below 80% means Apple considers the battery "consumed".',
  },
  {
    question: 'How long does MacBook battery replacement take?',
    answer: 'Most MacBook battery replacements take 60–120 minutes. M-series MacBooks take slightly longer than Intel models due to the glue-down construction. We carry stock for the most common models, so same-day service is usually possible if you bring your MacBook in the morning.',
  },
  {
    question: 'Will battery replacement affect my data?',
    answer: 'No. Battery replacement is a hardware-only repair. Your data, applications, passwords, and settings are completely unaffected. We do not need to reformat or reinstall macOS.',
  },
  {
    question: 'What battery health will I get after replacement?',
    answer: 'A new replacement battery shows 100% battery health in macOS System Settings. Our batteries are high-quality replacements that match or exceed the original capacity. All carry our 12-month warranty.',
  },
  {
    question: 'Is a swollen MacBook battery dangerous?',
    answer: 'Yes — a swollen (bulging) battery is a fire risk and should be treated urgently. Do not leave it unattended or charge it. Bring it in as soon as possible. We handle swollen batteries safely and dispose of them correctly. A swollen battery is always a same-day priority repair for us.',
  },
  {
    question: 'Can you replace the battery in an M-series MacBook Air?',
    answer: 'Yes. M1, M2, and M3 MacBook Air batteries are glued down as part of the enclosure design, but we replace them regularly. It takes a bit longer than Intel models — around 90–120 minutes — but the result is the same: 100% battery health and our full 12-month warranty.',
  },
];

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'MacBook Battery Replacement Johannesburg',
  provider: LOCAL_BUSINESS_PROVIDER,
  areaServed: { '@type': 'City', name: 'Johannesburg' },
  description: 'MacBook battery replacement from R 1,200. All M-series and Intel models. Same-day service. 12-month warranty.',
  offers: {
    '@type': 'AggregateOffer',
    lowPrice: '1200',
    highPrice: '1800',
    priceCurrency: 'ZAR',
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://zasupport.com' },
    { '@type': 'ListItem', position: 2, name: 'MacBook Repair', item: 'https://zasupport.com/macbook-repair' },
    { '@type': 'ListItem', position: 3, name: 'Battery Replacement', item: 'https://zasupport.com/macbook-repair/battery' },
  ],
};

const faqSchema = buildFaqSchema(faqs);

export default function MacBookBatteryPage() {
  return (
    <>
      <SchemaOrg schema={faqSchema} />
      <SchemaOrg schema={breadcrumbSchema} />
      <SchemaOrg schema={serviceSchema} />

      {/* Hero */}
      <section className="hero-gradient grid-overlay pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: 'MacBook Repair', href: '/macbook-repair' }, { label: 'Battery Replacement' }]} />
          <div className="mt-8 max-w-4xl">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-[#E8F4F1] leading-tight mb-6" style={{ fontFamily: 'Syne, sans-serif' }}>
              MacBook Battery<br /><span className="text-[#0FEA7A]">Replacement Johannesburg</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-8">
              Battery replacement from R 1,200. All M-series and Intel MacBook Air and Pro models. Same-day service. 12-month warranty.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={`tel:${CONTACT.phoneTel}`}
                className="inline-flex items-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl font-bold hover:bg-[#0FEA7A]/90 transition-all"
              >
                <Phone className="w-5 h-5" /> Call {CONTACT.phone}
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all"
              >
                Get a Quote <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Symptoms + Pricing */}
      <section className="py-20 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-4" style={{ fontFamily: 'Syne, sans-serif' }}>Does Your MacBook Need a New Battery?</h2>
              <p className="text-[#7A9E98] mb-6 text-sm">If you recognise any of these symptoms, your MacBook battery likely needs replacing.</p>
              {symptoms.map((item) => (
                <div key={item} className="flex items-center gap-3 py-2.5 border-b border-[rgba(255,255,255,0.04)]">
                  <span className="text-[#0FEA7A] text-sm flex-shrink-0">✓</span>
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
              <p className="text-[#7A9E98] text-xs mt-3">All prices include parts and labour. 12-month warranty included. Prices subject to change — call to confirm.</p>
              <div className="mt-6 glass-card p-4 border border-[rgba(15,234,122,0.15)]">
                <p className="text-[#0FEA7A] font-semibold text-sm mb-1">Swollen Battery?</p>
                <p className="text-[#7A9E98] text-xs">We treat swollen batteries as a same-day priority. Bring it in as soon as possible — do not charge a swollen battery at home.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-12 text-center" style={{ fontFamily: 'Syne, sans-serif' }}>
            How MacBook Battery Replacement <span className="text-[#0FEA7A]">Works</span>
          </h2>
          <div className="space-y-6">
            {[
              { step: '01', title: 'Bring Your MacBook In', desc: 'Drop off at our Hyde Park workshop. No appointment needed, though calling ahead ensures we have your battery in stock.' },
              { step: '02', title: 'Free Assessment', desc: 'We check your battery health percentage, cycle count, and whether any other issues are present. No charge for this.' },
              { step: '03', title: 'Battery Replaced in 60–120 Minutes', desc: 'We replace the battery using quality components. All adhesive is refreshed and the machine is sealed correctly.' },
              { step: '04', title: 'Calibration & Health Check', desc: 'We verify 100% battery health in System Settings, run a charge cycle, and confirm everything is working correctly before handover.' },
            ].map((item) => (
              <div key={item.step} className="flex gap-6 glass-card p-6">
                <div className="text-3xl font-extrabold text-[#0FEA7A] opacity-40 flex-shrink-0" style={{ fontFamily: 'Syne, sans-serif' }}>{item.step}</div>
                <div>
                  <h3 className="text-[#E8F4F1] font-bold mb-1">{item.title}</h3>
                  <p className="text-[#7A9E98] text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQAccordion items={faqs} title="MacBook Battery Replacement — FAQs" />
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-[rgba(39,80,77,0.3)] border border-[rgba(15,234,122,0.2)] rounded-3xl p-10">
            <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3" style={{ fontFamily: 'Syne, sans-serif' }}>MacBook Battery Dying?</h2>
            <p className="text-[#7A9E98] mb-6">From R 1,200. Done in under 2 hours. Hyde Park, Johannesburg.</p>
            <a href={`tel:${CONTACT.phoneTel}`} className="inline-flex items-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 transition-all">
              <Phone className="w-5 h-5" /> Call {CONTACT.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
