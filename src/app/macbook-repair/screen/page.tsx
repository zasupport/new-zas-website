import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, ArrowRight } from 'lucide-react';
import Breadcrumb from '@/components/ui/Breadcrumb';
import FAQAccordion from '@/components/ui/FAQ';
import SchemaOrg from '@/components/seo/SchemaOrg';
import { buildFaqSchema, LOCAL_BUSINESS_PROVIDER } from '@/lib/schema';
import { CONTACT, SITE } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'MacBook Screen Replacement Johannesburg | Retina Display Repair | ZA Support',
  description:
    'MacBook screen replacement in Johannesburg. Cracked Retina display, dead pixels, backlight failure, water lines. MacBook Air and Pro — all M-series and Intel models. No Fix No Fee. Call 064 529 5863.',
  alternates: { canonical: 'https://zasupport.com/macbook-repair/screen' },
};

const pricing = [
  ['MacBook Air M1 / M2 13"', 'From R 4,500'],
  ['MacBook Air M3 13" / 15"', 'From R 5,000'],
  ['MacBook Pro M1 / M2 13"', 'From R 4,500'],
  ['MacBook Pro M2 / M3 14"', 'From R 6,500'],
  ['MacBook Pro M2 / M3 16"', 'From R 8,500'],
  ['MacBook Air Intel 13" (2017–2020)', 'From R 3,500'],
  ['MacBook Pro Intel 13" (2016–2020)', 'From R 3,800'],
  ['MacBook Pro Intel 15" (2016–2019)', 'From R 4,800'],
];

const symptoms = [
  'Cracked or shattered Retina display',
  'Black or white lines across the screen',
  'Half the screen dark or completely black',
  'Dead pixels or stuck pixels',
  'Backlight on but no image visible',
  'Screen flickering or strobing',
  'Water damage causing grey blotches',
  'Hinge damage causing display cable failure',
];

const faqs = [
  {
    question: 'How much does MacBook screen replacement cost?',
    answer: 'MacBook screen replacement starts at R 3,500 for Intel models and R 4,500 for M-series. The exact cost depends on your model and screen size. We provide a free assessment and fixed quote before starting any work.',
  },
  {
    question: 'How long does MacBook screen replacement take?',
    answer: 'Most MacBook screen replacements take 2–4 hours. Newer M-series models with thinner display assemblies take slightly longer. If we have your specific display in stock, we usually complete same-day or next-day.',
  },
  {
    question: 'Do you replace the whole display assembly or just the glass?',
    answer: 'We replace the full display assembly (lid), which includes the LCD panel, backlight, display cable, and glass. This is the correct approach for MacBooks — replacing the glass only is not a reliable repair method for Retina displays.',
  },
  {
    question: 'Can you fix a MacBook screen with dead pixels?',
    answer: 'Yes. Dead pixels, stuck pixels, and lines across the screen are usually caused by a faulty LCD panel within the display assembly. Screen replacement resolves these faults completely.',
  },
  {
    question: 'What if the damage was caused by a fall?',
    answer: 'Accidental damage repairs are our most common screen jobs. We do not judge — if it is repairable, we repair it. A dropped MacBook with a cracked screen is a straightforward assessment. If the logic board or chassis is also damaged, we will tell you upfront.',
  },
  {
    question: 'Does screen replacement affect Touch ID or Face ID on MacBook?',
    answer: 'MacBook does not have Face ID. Touch ID is built into the keyboard, not the display, so screen replacement does not affect it. Your fingerprints remain enrolled and functional after a display replacement.',
  },
];

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'MacBook Screen Replacement Johannesburg',
  provider: LOCAL_BUSINESS_PROVIDER,
  areaServed: { '@type': 'City', name: 'Johannesburg' },
  description: 'MacBook screen replacement in Johannesburg. Cracked Retina display, dead pixels, backlight failure. All models. No Fix No Fee.',
  offers: {
    '@type': 'AggregateOffer',
    lowPrice: '3500',
    highPrice: '8500',
    priceCurrency: 'ZAR',
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://zasupport.com' },
    { '@type': 'ListItem', position: 2, name: 'MacBook Repair', item: 'https://zasupport.com/macbook-repair' },
    { '@type': 'ListItem', position: 3, name: 'Screen Replacement', item: 'https://zasupport.com/macbook-repair/screen' },
  ],
};

const faqSchema = buildFaqSchema(faqs);

export default function MacBookScreenPage() {
  return (
    <>
      <SchemaOrg schema={faqSchema} />
      <SchemaOrg schema={breadcrumbSchema} />
      <SchemaOrg schema={serviceSchema} />

      <section className="hero-gradient grid-overlay pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: 'MacBook Repair', href: '/macbook-repair' }, { label: 'Screen Replacement' }]} />
          <div className="mt-8 max-w-4xl">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-[#E8F4F1] leading-tight mb-6" style={{ fontFamily: 'Syne, sans-serif' }}>
              MacBook Screen<br /><span className="text-[#0FEA7A]">Replacement Johannesburg</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-8">
              Cracked Retina display, dead pixels, backlight failure, water lines. All MacBook Air and Pro models. From R 3,500. 12-month warranty.
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
              <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-4" style={{ fontFamily: 'Syne, sans-serif' }}>Screen Faults We Fix</h2>
              <p className="text-[#7A9E98] mb-6 text-sm">If your screen looks like any of these, bring it in for a free assessment.</p>
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
              <p className="text-[#7A9E98] text-xs mt-3">Prices include full display assembly and labour. Call to confirm availability for your specific model.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-12 text-center" style={{ fontFamily: 'Syne, sans-serif' }}>
            Our Screen Replacement <span className="text-[#0FEA7A]">Process</span>
          </h2>
          <div className="space-y-6">
            {[
              { step: '01', title: 'Free Assessment', desc: 'We inspect the display damage, test the logic board, and confirm there are no other faults before quoting.' },
              { step: '02', title: 'Fixed Quote — No Surprises', desc: 'We give you a written price before starting. If the final cost is higher for any reason, we call you first — always.' },
              { step: '03', title: 'Full Display Assembly Replacement', desc: 'We replace the entire lid assembly including the Retina panel, backlight, display cable, and glass. No cutting corners.' },
              { step: '04', title: 'Quality Check & Handover', desc: 'We test the display for dead pixels, backlight uniformity, and cable seating before you collect. 12-month warranty applies from this point.' },
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

      <section className="py-20 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQAccordion items={faqs} title="MacBook Screen Replacement — FAQs" />
        </div>
      </section>

      <section className="py-16 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-[rgba(39,80,77,0.3)] border border-[rgba(15,234,122,0.2)] rounded-3xl p-10">
            <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3" style={{ fontFamily: 'Syne, sans-serif' }}>Cracked MacBook Screen?</h2>
            <p className="text-[#7A9E98] mb-6">From R 3,500. Free assessment. No Fix No Fee. Hyde Park, Johannesburg.</p>
            <a href={`tel:${CONTACT.phoneTel}`} className="inline-flex items-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 transition-all">
              <Phone className="w-5 h-5" /> Call {CONTACT.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
