import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, ArrowRight } from 'lucide-react';
import SchemaOrg from '@/components/seo/SchemaOrg';
import FAQAccordion from '@/components/ui/FAQ';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { CONTACT } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'MacBook Air Logic Board Repair Johannesburg | From R 2,000 | ZA Support',
  description:
    'MacBook Air logic board repair in Johannesburg from R 2,000. M1, M2, M3 and Intel models. Free diagnostic, No Fix No Fee. Call 064 529 5863.',
  alternates: { canonical: 'https://zasupport.com/logic-board-repair/macbook-air' },
};

const faqs = [
  {
    question: 'Is MacBook Air logic board repair cheaper than MacBook Pro?',
    answer: 'Generally yes — MacBook Air logic boards have slightly fewer components and the labour cost is comparable. Simple repairs like USB-C and power rail faults start from R 2,000. The assessment is always free.',
  },
  {
    question: 'Can you repair MacBook Air M2 and M3 logic boards?',
    answer: 'Yes. While the M2 and M3 Apple Silicon chips cannot be replaced at die level, all surrounding components — USB-C controllers, power management, display circuits, and board traces — are fully repairable through component-level microsoldering.',
  },
  {
    question: 'My MacBook Air M1 is not charging on either USB-C port. What is likely wrong?',
    answer: 'This is typically a USB-C controller IC fault or a problem with the power management circuit on the logic board. Both are repairable through microsoldering. We will diagnose the specific component at assessment.',
  },
  {
    question: 'MacBook Air shows no image on built-in screen but works with external display. Is this fixable?',
    answer: 'Yes. This fault pattern typically indicates a backlight circuit fault, display connector issue, or failed display controller. With an external display working, we know the main GPU and board are functional — the fault is isolated to the display output path, which is a targeted repair.',
  },
  {
    question: 'How long does MacBook Air logic board repair take?',
    answer: 'Most MacBook Air logic board repairs are completed within 48–72 hours. Complex faults may take 3–5 business days. We will confirm the timeframe at the assessment stage.',
  },
];

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://zasupport.com' },
    { '@type': 'ListItem', position: 2, name: 'Logic Board Repair', item: 'https://zasupport.com/logic-board-repair' },
    { '@type': 'ListItem', position: 3, name: 'MacBook Air', item: 'https://zasupport.com/logic-board-repair/macbook-air' },
  ],
};

export default function MacBookAirLogicBoardPage() {
  return (
    <>
      <SchemaOrg schema={breadcrumbSchema} />

      <section className="hero-gradient grid-overlay pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[
            { label: 'Logic Board Repair', href: '/logic-board-repair' },
            { label: 'MacBook Air' },
          ]} />
          <div className="mt-8 max-w-4xl">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-[#E8F4F1] leading-tight mb-6" style={{ fontFamily: 'Syne, sans-serif' }}>
              MacBook Air Logic Board<br /><span className="text-[#0FEA7A]">Repair Johannesburg</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-6 max-w-3xl leading-relaxed">
              MacBook Air logic board repair from R 2,000. M1, M2, M3, and Intel models.
              Free diagnostic, No Fix No Fee. Hyde Park, Johannesburg.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href={`tel:${CONTACT.phoneTel}`} className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 transition-all">
                <Phone className="w-5 h-5" /> Call {CONTACT.phone}
              </a>
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all">
                Free Diagnostic <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-6" style={{ fontFamily: 'Syne, sans-serif' }}>Faults We Fix</h2>
              <div className="space-y-3">
                {[
                  'No power — completely dead MacBook Air',
                  'Not charging on USB-C ports',
                  'Black screen / no display',
                  'Liquid damage board-level repair',
                  'Fan running at maximum speed constantly',
                  'Random shutdowns and kernel panics',
                  'USB-C ports not recognising accessories',
                  'No external display output',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3 py-2 border-b border-[rgba(255,255,255,0.04)]">
                    <span className="text-[#0FEA7A] text-sm">✓</span>
                    <span className="text-[#7A9E98] text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-6" style={{ fontFamily: 'Syne, sans-serif' }}>Pricing</h2>
              <div className="glass-card p-6 mb-6">
                {[
                  { item: 'Diagnostic', price: 'Free' },
                  { item: 'USB-C / Charging Repair', price: 'From R 2,000' },
                  { item: 'Power Circuit Repair', price: 'From R 2,200' },
                  { item: 'Microsoldering', price: 'From R 2,500' },
                  { item: 'Board Replacement', price: 'From R 7,000' },
                ].map((item, i) => (
                  <div key={item.item} className={`flex justify-between py-3 ${i < 4 ? 'border-b border-[rgba(255,255,255,0.05)]' : ''}`}>
                    <span className="text-[#7A9E98] text-sm">{item.item}</span>
                    <span className="text-[#0FEA7A] font-bold text-sm">{item.price}</span>
                  </div>
                ))}
              </div>
              <p className="text-[#7A9E98] text-xs">No Fix No Fee. 12-month warranty on all repairs.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQAccordion items={faqs} title="MacBook Air Logic Board — FAQs" />
        </div>
      </section>

      <section className="py-16 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { title: 'MacBook Pro Logic Board', href: '/logic-board-repair/macbook-pro', price: 'From R 2,500' },
              { title: 'Logic Board Hub', href: '/logic-board-repair', price: 'All Devices' },
              { title: 'Liquid Damage Repair', href: '/liquid-damage/macbook-air', price: 'From R 2,500' },
            ].map((item) => (
              <Link key={item.href} href={item.href} className="glass-card p-4 flex items-center justify-between group">
                <div>
                  <p className="text-[#E8F4F1] font-semibold text-sm">{item.title}</p>
                  <p className="text-[#0FEA7A] text-xs mt-0.5">{item.price}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-[#7A9E98] group-hover:text-[#0FEA7A] transition-colors" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-[rgba(39,80,77,0.3)] border border-[rgba(15,234,122,0.2)] rounded-3xl p-10">
            <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3" style={{ fontFamily: 'Syne, sans-serif' }}>MacBook Air Logic Board Fault?</h2>
            <p className="text-[#7A9E98] mb-6">Free diagnostic. No Fix No Fee. Hyde Park, Johannesburg.</p>
            <a href={`tel:${CONTACT.phoneTel}`} className="inline-flex items-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 transition-all">
              <Phone className="w-5 h-5" /> Call {CONTACT.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
