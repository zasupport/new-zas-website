import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, ArrowRight } from 'lucide-react';
import SchemaOrg from '@/components/seo/SchemaOrg';
import FAQAccordion from '@/components/ui/FAQ';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { CONTACT } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'iMac Logic Board Repair Johannesburg | From R 3,000 | ZA Support',
  description:
    'iMac logic board repair in Johannesburg from R 3,000. 21.5", 24" and 27" models, M1, M3 and Intel. Free diagnostic, No Fix No Fee. Call 064 529 5863.',
  alternates: { canonical: 'https://zasupport.com/logic-board-repair/imac' },
};

const faqs = [
  {
    question: 'Is it worth repairing an iMac logic board vs replacing the whole machine?',
    answer: 'Almost always yes for M1 and M3 iMacs, given replacement costs of R 30,000–R 70,000. Even for older Intel iMacs (2017–2020), logic board repair is typically R 3,000–R 7,000 vs R 18,000+ for a comparable new machine. We will give you an honest cost-benefit analysis.',
  },
  {
    question: 'My iMac 27" has no display but the fans spin. What is the fault?',
    answer: 'This is a common presentation for a display controller fault, backlight circuit failure, or disconnected display cable. All are repairable. On Intel iMacs, GPU failure can also cause this — we test systematically to identify the specific cause before quoting.',
  },
  {
    question: 'Can you repair the iMac 24" M3 logic board?',
    answer: 'Yes. The M3 iMac is fully serviceable for surrounding component repair. The M3 chip integrates CPU, GPU, RAM, and Neural Engine — these cannot be replaced at die level — but power management, display controller, USB/Thunderbolt circuits, and board traces are all serviceable.',
  },
  {
    question: 'Does iMac logic board repair require removing the display?',
    answer: 'Yes. iMac repair requires careful removal of the magnetically attached display glass and LCD panel to access the logic board. Our engineers are experienced with this process and use proper tools to avoid display damage during the repair.',
  },
  {
    question: 'What iMac faults do you repair most often?',
    answer: 'The most common iMac logic board faults we see are: no power (PSU or logic board power rail), no display / backlight failure, GPU failure on 27" Intel models, liquid damage (through ventilation slots), and USB/Thunderbolt port failure.',
  },
];

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://zasupport.com' },
    { '@type': 'ListItem', position: 2, name: 'Logic Board Repair', item: 'https://zasupport.com/logic-board-repair' },
    { '@type': 'ListItem', position: 3, name: 'iMac', item: 'https://zasupport.com/logic-board-repair/imac' },
  ],
};

export default function iMacLogicBoardPage() {
  return (
    <>
      <SchemaOrg schema={breadcrumbSchema} />

      <section className="hero-gradient grid-overlay pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: 'Logic Board Repair', href: '/logic-board-repair' }, { label: 'iMac' }]} />
          <div className="mt-8 max-w-4xl">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-[#E8F4F1] leading-tight mb-6" style={{ fontFamily: 'Syne, sans-serif' }}>
              iMac Logic Board<br /><span className="text-[#0FEA7A]">Repair Johannesburg</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-6 max-w-3xl leading-relaxed">
              iMac logic board repair from R 3,000. 21.5&quot;, 24&quot; and 27&quot; models — M1, M3, and Intel.
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
              <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-6" style={{ fontFamily: 'Syne, sans-serif' }}>Common iMac Board Faults</h2>
              {[
                { fault: 'No Power', desc: 'Power supply unit (PSU) or power circuit failure. Common after power surges.' },
                { fault: 'No Display / Black Screen', desc: 'Backlight failure, GPU fault, or display cable. Fan spins but no image.' },
                { fault: 'GPU Failure (27" Intel)', desc: 'AMD Radeon graphics failure — screen artifacts, crash on GPU load.' },
                { fault: 'Liquid Damage', desc: 'Water through ventilation slots — cleaning, trace repair, component replacement.' },
                { fault: 'Thunderbolt / USB-C Failure', desc: 'No peripherals detected, no external display. Controller IC repair.' },
                { fault: 'Fan at Maximum Speed', desc: 'Thermal sensor fault or SMC corruption causing permanent max fan.' },
              ].map((item) => (
                <div key={item.fault} className="flex gap-4 p-4 bg-[rgba(22,34,32,0.5)] rounded-xl border border-[rgba(15,234,122,0.08)] mb-3">
                  <div>
                    <p className="text-[#E8F4F1] font-semibold text-sm">{item.fault}</p>
                    <p className="text-[#7A9E98] text-xs mt-1">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div>
              <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-6" style={{ fontFamily: 'Syne, sans-serif' }}>Pricing</h2>
              <div className="glass-card p-6 mb-6">
                {[
                  { item: 'Diagnostic', price: 'Free' },
                  { item: 'Power Supply Repair', price: 'From R 2,500' },
                  { item: 'Logic Board Repair (Intel)', price: 'From R 3,000' },
                  { item: 'Logic Board Repair (M1/M3)', price: 'From R 3,500' },
                  { item: 'GPU Reballing (27" Intel)', price: 'From R 4,500' },
                  { item: 'Board Replacement', price: 'From R 9,000' },
                ].map((item, i) => (
                  <div key={item.item} className={`flex justify-between py-3 ${i < 5 ? 'border-b border-[rgba(255,255,255,0.05)]' : ''}`}>
                    <span className="text-[#7A9E98] text-sm">{item.item}</span>
                    <span className="text-[#0FEA7A] font-bold text-sm">{item.price}</span>
                  </div>
                ))}
              </div>
              <p className="text-[#7A9E98] text-xs">No Fix No Fee. 12-month warranty. Collection available in Hyde Park area.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQAccordion items={faqs} title="iMac Logic Board — FAQs" />
        </div>
      </section>

      <section className="py-16 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-[rgba(39,80,77,0.3)] border border-[rgba(15,234,122,0.2)] rounded-3xl p-10">
            <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3" style={{ fontFamily: 'Syne, sans-serif' }}>iMac Logic Board Fault?</h2>
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
