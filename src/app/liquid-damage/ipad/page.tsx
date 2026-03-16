import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, ArrowRight, Shield } from 'lucide-react';
import SchemaOrg from '@/components/seo/SchemaOrg';
import { buildFaqSchema } from '@/lib/schema';
import FAQAccordion from '@/components/ui/FAQ';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { CONTACT } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'iPad Liquid Damage Repair Johannesburg | ZA Support',
  description:
    'iPad liquid damage repair in Johannesburg. All iPad models including M4 iPad Pro. Assessment: R899 ex VAT, 3-month warranty. Call 064 529 5863.',
  alternates: { canonical: 'https://zasupport.com/liquid-damage/ipad' },
};

const faqs = [
  {
    question: 'Which iPad models do you repair for liquid damage?',
    answer: 'All iPad models: iPad (5th through 10th generation), iPad mini (4th through 6th generation), iPad Air (3rd through M2), iPad Pro 11" (1st through M4), and iPad Pro 12.9" (2nd through M4). If it is an iPad, we repair it.',
  },
  {
    question: 'Is iPad liquid damage harder to repair than iPhone damage?',
    answer: 'iPads have larger logic boards and more complex internal layouts, but the repair process is broadly similar. The larger size means there is more surface area for corrosion to spread, making rapid intervention even more important. The M-series iPad Pros have integrated memory and SSD on the logic board, similar to Apple Silicon Macs.',
  },
  {
    question: 'My iPad Pro fell in the pool. Is it repairable?',
    answer: 'Pool water contains chlorine and dissolved minerals that are particularly corrosive. Bring it in immediately, do not attempt to charge it. Our ultrasonic cleaning process is effective at removing chlorinated water corrosion, but early intervention significantly improves outcomes. Many pool-damaged iPad Pros are fully recoverable.',
  },
  {
    question: 'Can you save the data on my iPad?',
    answer: 'If the device can be powered on after repair, your data is accessible. Many clients have iCloud Backup enabled, which makes data recovery straightforward. If the logic board cannot be recovered, we will discuss data extraction options with you before any destructive work begins.',
  },
];

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://zasupport.com' },
    { '@type': 'ListItem', position: 2, name: 'Liquid Damage Repair', item: 'https://zasupport.com/liquid-damage' },
    { '@type': 'ListItem', position: 3, name: 'iPad', item: 'https://zasupport.com/liquid-damage/ipad' },
  ],
};

const faqSchema = buildFaqSchema(faqs);

export default function iPadLiquidDamagePage() {
  return (
    <>
      <SchemaOrg schema={faqSchema} />
      <SchemaOrg schema={breadcrumbSchema} />

      <section className="hero-gradient grid-overlay pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: 'Liquid Damage Repair', href: '/liquid-damage' }, { label: 'iPad' }]} />
          <div className="mt-8 max-w-4xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#E8F4F1] leading-tight mb-6" style={{ fontFamily: 'Syne, sans-serif' }}>
              iPad Liquid Damage<br /><span className="text-[#0FEA7A]">Repair Johannesburg</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-6 max-w-3xl leading-relaxed">
              iPad liquid damage repair. All iPad models including M4 iPad Pro.
              Assessment: R899 ex VAT, 3-month warranty. Hyde Park, Johannesburg.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href={`tel:${CONTACT.phoneTel}`} className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 transition-all">
                <Phone className="w-5 h-5" /> Call {CONTACT.phone}
              </a>
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all">
                Book Assessment <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-6" style={{ fontFamily: 'Syne, sans-serif' }}>iPad Models We Repair</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  'iPad (5th–10th Gen)', 'iPad mini (4th–6th Gen)',
                  'iPad Air 3rd Gen (A2152)', 'iPad Air 4th Gen (A2316)',
                  'iPad Air M1 (A2588)', 'iPad Air M2 (A2902)',
                  'iPad Pro 11" 1st Gen', 'iPad Pro 11" 2nd Gen',
                  'iPad Pro 11" 3rd Gen', 'iPad Pro 11" M4 (A2837)',
                  'iPad Pro 12.9" 2nd–4th Gen', 'iPad Pro 12.9" 5th–6th Gen',
                  'iPad Pro 13" M4 (A2925)',
                ].map((model) => (
                  <div key={model} className="flex items-center gap-2 text-[#7A9E98] text-sm py-1.5 border-b border-[rgba(255,255,255,0.04)]">
                    <span className="text-[#0FEA7A]">✓</span> {model}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-6" style={{ fontFamily: 'Syne, sans-serif' }}>Assessment &amp; Warranty</h2>
              <div className="flex items-center gap-3 p-4 bg-[rgba(15,234,122,0.05)] rounded-xl border border-[rgba(15,234,122,0.1)]">
                <Shield className="w-5 h-5 text-[#0FEA7A] flex-shrink-0" />
                <p className="text-[#7A9E98] text-sm">Assessment: R899 ex VAT. warranty on all repairs. Hyde Park, Johannesburg.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQAccordion items={faqs} title="iPad Liquid Damage, FAQs" />
        </div>
      </section>

      <section className="py-16 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-[rgba(39,80,77,0.3)] border border-[rgba(15,234,122,0.2)] rounded-3xl p-10">
            <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3" style={{ fontFamily: 'Syne, sans-serif' }}>iPad Liquid Damage? We Can Help.</h2>
            <p className="text-[#7A9E98] mb-6">Assessment: R899 ex VAT. Hyde Park, Johannesburg.</p>
            <a href={`tel:${CONTACT.phoneTel}`} className="inline-flex items-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 transition-all">
              <Phone className="w-5 h-5" /> Call {CONTACT.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
