import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, ArrowRight } from 'lucide-react';
import Breadcrumb from '@/components/ui/Breadcrumb';
import FAQAccordion from '@/components/ui/FAQ';
import SchemaOrg from '@/components/seo/SchemaOrg';
import { buildFaqSchema, LOCAL_BUSINESS_PROVIDER } from '@/lib/schema';
import { CONTACT, SITE } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'MacBook Keyboard Replacement Johannesburg | Sticky Keys, Broken Keys | ZA Support',
  description:
    'MacBook keyboard replacement in Johannesburg from R 2,500. Sticky keys, broken keys, water-damaged keyboard, butterfly keyboard failure. MacBook Air and Pro — all models. No Fix No Fee.',
  alternates: { canonical: 'https://zasupport.com/macbook-repair/keyboard' },
};

const pricing = [
  ['MacBook Air M1 / M2 / M3', 'From R 2,500'],
  ['MacBook Pro M1 / M2 13"', 'From R 2,800'],
  ['MacBook Pro M2 / M3 14"', 'From R 3,500'],
  ['MacBook Pro M2 / M3 16"', 'From R 4,000'],
  ['MacBook Air Intel (2018–2020) — Butterfly', 'From R 3,200'],
  ['MacBook Pro Intel 13" (2018–2020) — Butterfly', 'From R 3,500'],
  ['MacBook Pro Intel 15" (2018–2019) — Butterfly', 'From R 4,200'],
  ['MacBook Air / Pro Intel (Magic keyboard generation)', 'From R 2,500'],
];

const symptoms = [
  'Keys that are sticky or require extra force',
  'Keys that do not register at all',
  'Multiple keypresses from a single keypress',
  'Keys that pop off or are physically broken',
  'Keyboard damaged from liquid spill',
  'Entire rows of keys not working',
  'Trackpad clicking through due to swollen battery under keyboard',
  'Keys registering wrong characters',
];

const faqs = [
  {
    question: 'How much does MacBook keyboard replacement cost?',
    answer: 'MacBook keyboard replacement starts at R 2,500 for M-series models and R 3,200 for the older butterfly keyboard generation. The exact cost depends on your model. We provide a free assessment and fixed quote before starting.',
  },
  {
    question: 'What is the butterfly keyboard and why is it known for failures?',
    answer: 'Apple used the "butterfly" keyboard mechanism in MacBook Pro models from 2016–2019 and MacBook Air 2018–2019. It used an extremely thin mechanism that was prone to dust and debris causing keys to stick or fail entirely. Apple replaced the design with the scissor-switch "Magic" keyboard from 2019 onward. We replace butterfly keyboards with the updated mechanism where possible.',
  },
  {
    question: 'How long does MacBook keyboard replacement take?',
    answer: 'MacBook keyboard replacement typically takes 2–3 hours. For butterfly keyboard MacBooks, the keyboard is riveted to the top case, so the entire top case must be replaced — this takes 2–4 hours. We will confirm the timeline when you drop your MacBook in.',
  },
  {
    question: 'Can individual keys be replaced instead of the whole keyboard?',
    answer: 'For MacBook models where the keyboard is separate from the top case (mainly older Intel Macs), individual keycaps can sometimes be replaced. For most modern MacBooks, the keyboard is bonded to the top case and must be replaced as an assembly. We will always take the most cost-effective approach for your model.',
  },
  {
    question: 'My keyboard was damaged by a liquid spill. Can it be fixed?',
    answer: 'Yes. Liquid-damaged keyboards are a common repair. We clean the keyboard and underlying components as part of the repair. If liquid reached the logic board, we will assess that separately. Even in water damage cases, a keyboard replacement combined with board-level cleaning often fully restores the machine.',
  },
  {
    question: 'Will keyboard replacement affect the Touch Bar on older MacBook Pros?',
    answer: 'The Touch Bar is part of the top case on older MacBook Pro models (2016–2021). When we replace the keyboard assembly on those models, the Touch Bar is replaced as part of the same unit. Touch ID calibration to your account remains unaffected.',
  },
];

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'MacBook Keyboard Replacement Johannesburg',
  provider: LOCAL_BUSINESS_PROVIDER,
  areaServed: { '@type': 'City', name: 'Johannesburg' },
  description: 'MacBook keyboard replacement in Johannesburg from R 2,500. Sticky keys, broken keys, butterfly keyboard failure. All models.',
  offers: {
    '@type': 'AggregateOffer',
    lowPrice: '2500',
    highPrice: '4200',
    priceCurrency: 'ZAR',
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://zasupport.com' },
    { '@type': 'ListItem', position: 2, name: 'MacBook Repair', item: 'https://zasupport.com/macbook-repair' },
    { '@type': 'ListItem', position: 3, name: 'Keyboard Replacement', item: 'https://zasupport.com/macbook-repair/keyboard' },
  ],
};

const faqSchema = buildFaqSchema(faqs);

export default function MacBookKeyboardPage() {
  return (
    <>
      <SchemaOrg schema={faqSchema} />
      <SchemaOrg schema={breadcrumbSchema} />
      <SchemaOrg schema={serviceSchema} />

      <section className="hero-gradient grid-overlay pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: 'MacBook Repair', href: '/macbook-repair' }, { label: 'Keyboard Replacement' }]} />
          <div className="mt-8 max-w-4xl">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-[#E8F4F1] leading-tight mb-6" style={{ fontFamily: 'Syne, sans-serif' }}>
              MacBook Keyboard<br /><span className="text-[#0FEA7A]">Replacement Johannesburg</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-8">
              Sticky keys, broken keys, butterfly keyboard failure, liquid damage. All MacBook Air and Pro models. From R 2,500. 12-month warranty.
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
              <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-4" style={{ fontFamily: 'Syne, sans-serif' }}>Keyboard Problems We Fix</h2>
              <p className="text-[#7A9E98] mb-6 text-sm">All keyboard faults — from a single broken key to a completely failed butterfly keyboard.</p>
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
              <p className="text-[#7A9E98] text-xs mt-3">Prices include parts and labour. 12-month warranty on all keyboard replacements.</p>
              <div className="mt-6 glass-card p-4 border border-[rgba(15,234,122,0.15)]">
                <p className="text-[#0FEA7A] font-semibold text-sm mb-1">Butterfly Keyboard?</p>
                <p className="text-[#7A9E98] text-xs">We can upgrade your butterfly keyboard MacBook to the updated scissor-switch mechanism where parts are available. Ask us when you bring it in.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQAccordion items={faqs} title="MacBook Keyboard Replacement — FAQs" />
        </div>
      </section>

      <section className="py-16 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-[rgba(39,80,77,0.3)] border border-[rgba(15,234,122,0.2)] rounded-3xl p-10">
            <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3" style={{ fontFamily: 'Syne, sans-serif' }}>MacBook Keyboard Not Working?</h2>
            <p className="text-[#7A9E98] mb-6">From R 2,500. Free assessment. No Fix No Fee. Hyde Park, Johannesburg.</p>
            <a href={`tel:${CONTACT.phoneTel}`} className="inline-flex items-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 transition-all">
              <Phone className="w-5 h-5" /> Call {CONTACT.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
