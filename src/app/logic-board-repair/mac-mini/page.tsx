import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, ArrowRight } from 'lucide-react';
import SchemaOrg from '@/components/seo/SchemaOrg';
import { buildFaqSchema } from '@/lib/schema';
import FAQAccordion from '@/components/ui/FAQ';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { CONTACT } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Mac mini Logic Board Repair Johannesburg | From R 2,000 | ZA Support',
  description:
    'Mac mini logic board repair in Johannesburg from R 2,000. M1, M2, M2 Pro and Intel models. Free diagnostic, No Fix No Fee. Call 064 529 5863.',
  alternates: { canonical: 'https://zasupport.com/logic-board-repair/mac-mini' },
};

const faqs = [
  {
    question: 'Which Mac mini models do you repair?',
    answer: 'Mac mini (2014, 2018 Intel), Mac mini M1 (A2348, 2020), Mac mini M2 (A2686, 2023), Mac mini M2 Pro (A2686, 2023), and Mac mini M4 / M4 Pro (A3617, 2024).',
  },
  {
    question: 'My Mac mini M1 has no power. Is this repairable?',
    answer: 'Yes. No-power Mac mini faults are very commonly caused by failed power supply components or a power rail fault on the logic board. Both are repairable through microsoldering. The Mac mini\'s compact power supply is also fully serviceable.',
  },
  {
    question: 'Mac mini is running very hot and throttling. Is this a logic board fault?',
    answer: 'Thermal throttling in a Mac mini can be caused by dust accumulation (common), failed thermal paste, a faulty fan, or in rarer cases a power rail fault causing incorrect voltage to the chip. We diagnose the specific cause before recommending repair.',
  },
  {
    question: 'Can the Mac mini M2 Pro logic board be repaired?',
    answer: 'Yes, for surrounding component faults. The M2 Pro chip integrates CPU, GPU, and RAM — these cannot be replaced at die level. However, USB-C controllers, PCIe/NVMe storage circuits, HDMI controller, power management, and board traces are all repairable.',
  },
  {
    question: 'Is Mac mini logic board repair worth it vs buying a new machine?',
    answer: 'Generally yes — Mac mini is the most cost-effective Mac to own and repair. An M1 Mac mini replacement costs R 15,000+; most logic board repairs are R 2,000–R 4,500. We will give you an honest comparison at the assessment stage.',
  },
];

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://zasupport.com' },
    { '@type': 'ListItem', position: 2, name: 'Logic Board Repair', item: 'https://zasupport.com/logic-board-repair' },
    { '@type': 'ListItem', position: 3, name: 'Mac mini', item: 'https://zasupport.com/logic-board-repair/mac-mini' },
  ],
};

const faqSchema = buildFaqSchema(faqs);

export default function MacMiniLogicBoardPage() {
  return (
    <>
      <SchemaOrg schema={faqSchema} />
      <SchemaOrg schema={breadcrumbSchema} />

      <section className="hero-gradient grid-overlay pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: 'Logic Board Repair', href: '/logic-board-repair' }, { label: 'Mac mini' }]} />
          <div className="mt-8 max-w-4xl">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-[#E8F4F1] leading-tight mb-6" style={{ fontFamily: 'Syne, sans-serif' }}>
              Mac mini Logic Board<br /><span className="text-[#0FEA7A]">Repair Johannesburg</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-6 max-w-3xl leading-relaxed">
              Mac mini logic board repair from R 2,000. M1, M2, M2 Pro, M4, and Intel models.
              Free diagnostic, No Fix No Fee. Hyde Park, Johannesburg.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href={CONTACT.whatsappLogicBoard} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 transition-all">
                💬 WhatsApp for Quote
              </a>
              <a href={`tel:${CONTACT.phoneTel}`} className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all">
                <Phone className="w-5 h-5" /> Call {CONTACT.phone}
              </a>
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.2)] text-[#7A9E98] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[rgba(15,234,122,0.05)] transition-all">
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
              <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-6" style={{ fontFamily: 'Syne, sans-serif' }}>Mac mini Faults We Repair</h2>
              {[
                'No power — dead Mac mini',
                'Not booting — stuck on Apple logo',
                'HDMI / Thunderbolt display output failure',
                'USB-C and USB-A port failure',
                'Power supply failure',
                'Extreme thermal throttling',
                'Loud fan / fan at max speed',
                'Kernel panic loops',
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 py-2.5 border-b border-[rgba(255,255,255,0.04)]">
                  <span className="text-[#0FEA7A] text-sm">✓</span>
                  <span className="text-[#7A9E98] text-sm">{item}</span>
                </div>
              ))}
            </div>
            <div>
              <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-6" style={{ fontFamily: 'Syne, sans-serif' }}>Pricing</h2>
              <div className="glass-card p-6 mb-4">
                {[
                  { item: 'Diagnostic', price: 'Free' },
                  { item: 'Power Supply Repair', price: 'From R 2,000' },
                  { item: 'Logic Board Microsoldering', price: 'From R 2,500' },
                  { item: 'HDMI / USB-C Repair', price: 'From R 1,800' },
                  { item: 'Board Replacement', price: 'From R 6,500' },
                ].map((item, i) => (
                  <div key={item.item} className={`flex justify-between py-3 ${i < 4 ? 'border-b border-[rgba(255,255,255,0.05)]' : ''}`}>
                    <span className="text-[#7A9E98] text-sm">{item.item}</span>
                    <span className="text-[#0FEA7A] font-bold text-sm">{item.price}</span>
                  </div>
                ))}
              </div>
              <p className="text-[#7A9E98] text-xs">No Fix No Fee. 12-month warranty.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQAccordion items={faqs} title="Mac mini Logic Board — FAQs" />
        </div>
      </section>

      <section className="py-16 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { title: 'MacBook Pro Logic Board', href: '/logic-board-repair/macbook-pro', price: 'From R 2,500' },
              { title: 'iMac Logic Board', href: '/logic-board-repair/imac', price: 'From R 3,000' },
              { title: 'Logic Board Hub', href: '/logic-board-repair', price: 'All Devices' },
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
            <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3" style={{ fontFamily: 'Syne, sans-serif' }}>Mac mini Not Working?</h2>
            <p className="text-[#7A9E98] mb-6">Free diagnostic. No Fix No Fee. Hyde Park, Johannesburg.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={CONTACT.whatsappLogicBoard} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 transition-all">
                💬 WhatsApp for Quote
              </a>
              <a href={`tel:${CONTACT.phoneTel}`} className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all">
                <Phone className="w-5 h-5" /> Call {CONTACT.phone}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
