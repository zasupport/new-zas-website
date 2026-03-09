import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, ArrowRight, Cpu, Zap, AlertTriangle, CheckCircle } from 'lucide-react';
import SchemaOrg from '@/components/seo/SchemaOrg';
import FAQAccordion from '@/components/ui/FAQ';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { CONTACT } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'MacBook Logic Board Repair Johannesburg | Microsoldering Specialists | ZA Support',
  description:
    'MacBook logic board repair in Johannesburg. Expert microsoldering for no-power, no-display, USB-C failure, GPU faults. Free diagnostic. From R 1,800. Call 064 529 5863.',
  alternates: { canonical: 'https://zasupport.com/logic-board-repair' },
};

const faults = [
  { title: 'No Power', desc: 'MacBook shows no signs of life — no fans, no display, no LED. Board-level power circuit diagnosis and repair.' },
  { title: 'No Display', desc: 'Mac boots but screen stays black. GPU failure, backlight circuit, T-Con board, or display cable fault.' },
  { title: 'Liquid Damage', desc: 'Corrosion on traces and component pads after liquid exposure. Ultrasonic cleaning and component replacement.' },
  { title: 'Overheating / Shutdown', desc: 'Thermal runaway, failing voltage regulators, or blocked power rails causing unexpected shutdown.' },
  { title: 'USB-C / Thunderbolt Failure', desc: 'No charging, no external display, or no data on USB-C ports. Controller chip or port board replacement.' },
  { title: 'Fan Error / Loud Fan', desc: 'SMC fault, fan controller issue, or failed thermal sensor causing fan to run at maximum speed.' },
  { title: 'GPU Failure', desc: 'Screen artifacts, garbled display, or external display failure. Discrete GPU reballing or replacement.' },
  { title: 'Kernel Panic / Crash', desc: 'Persistent kernel panics traced to failing RAM, storage, or logic board component fault.' },
];

const pricing = [
  { item: 'Diagnostic Assessment', price: 'Free', note: 'Full board-level inspection' },
  { item: 'USB-C / Thunderbolt Repair', price: 'From R 1,800', note: 'Port board or controller chip' },
  { item: 'Power Circuit Repair', price: 'From R 2,000', note: 'No-power diagnosis and fix' },
  { item: 'Microsoldering Repair', price: 'From R 2,500', note: 'Component-level board repair' },
  { item: 'GPU Repair / Reballing', price: 'From R 3,500', note: 'Discrete GPU only — Intel models' },
  { item: 'Logic Board Replacement', price: 'From R 8,000', note: 'Where repair is not viable' },
];

const faqs = [
  {
    question: 'What is the difference between microsoldering repair and board replacement?',
    answer: 'Microsoldering repair fixes the specific failed component on your existing logic board — replacing a chip, capacitor, resistor, or damaged trace under microscope. Board replacement swaps the entire logic board for a new or refurbished one. Microsoldering is typically 60–80% cheaper than board replacement and is our preferred approach whenever feasible.',
  },
  {
    question: 'My MacBook shows no signs of life. Is it worth bringing in?',
    answer: 'Yes. A completely dead MacBook is one of the most common faults we successfully repair. "No power" faults are very often caused by a single failed component on the power rail — a blown fuse, failed MOSFET, or damaged charging IC. These are microsoldering-level repairs that cost a fraction of a new machine.',
  },
  {
    question: 'Can you repair M1, M2, and M3 MacBook logic boards?',
    answer: 'Yes, with some differences from Intel models. Apple Silicon boards have the CPU, GPU, RAM, and Neural Engine integrated in the M-series chip (SoC), which cannot be replaced at chip level. However, surrounding components — power management, USB-C controllers, storage, and board traces — are fully serviceable through microsoldering.',
  },
  {
    question: 'How long does logic board repair take?',
    answer: 'Diagnostic assessment is completed within 24 hours. Simple repairs (USB-C, power rails) are typically completed within 48–72 hours. Complex microsoldering (GPU, multi-component faults) can take 3–5 business days. We will give you a specific timeframe at the assessment stage.',
  },
  {
    question: 'What if the diagnosis reveals the board is beyond repair?',
    answer: 'We will tell you honestly, explain what we found, and discuss your options: board replacement, selling the parts, or data recovery from the device. You pay nothing for a diagnostic that ends in a "beyond repair" conclusion — our assessment is always free with no obligation.',
  },
  {
    question: 'Is my data safe during a logic board repair?',
    answer: 'Your data stays on the device throughout the repair. We do not reformat or erase your storage unless you specifically request it. If a board replacement is needed and you have an M-series Mac, we will discuss the storage situation with you — on M-series, the SSD is soldered to the board, which requires careful handling.',
  },
];

const subPages = [
  { title: 'MacBook Pro Logic Board', href: '/logic-board-repair/macbook-pro', price: 'From R 2,500' },
  { title: 'MacBook Air Logic Board', href: '/logic-board-repair/macbook-air', price: 'From R 2,000' },
  { title: 'iMac Logic Board', href: '/logic-board-repair/imac', price: 'From R 3,000' },
  { title: 'Mac mini Logic Board', href: '/logic-board-repair/mac-mini', price: 'From R 2,000' },
];

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'MacBook Logic Board Repair Johannesburg',
  description: 'Expert MacBook logic board repair and microsoldering in Johannesburg. Free diagnostic. No Fix No Fee.',
  provider: { '@type': 'LocalBusiness', name: 'ZA Support', telephone: CONTACT.phoneTel },
  areaServed: { '@type': 'City', name: 'Johannesburg' },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: { '@type': 'Answer', text: faq.answer },
  })),
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://zasupport.com' },
    { '@type': 'ListItem', position: 2, name: 'Logic Board Repair', item: 'https://zasupport.com/logic-board-repair' },
  ],
};

export default function LogicBoardRepairPage() {
  return (
    <>
      <SchemaOrg schema={serviceSchema} />
      <SchemaOrg schema={faqSchema} />
      <SchemaOrg schema={breadcrumbSchema} />

      <section className="hero-gradient grid-overlay pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: 'Logic Board Repair' }]} />
          <div className="mt-8 max-w-4xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#E8F4F1] leading-tight mb-6" style={{ fontFamily: 'Syne, sans-serif' }}>
              MacBook Logic Board Repair
              <br /><span className="text-[#0FEA7A]">in Johannesburg</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-8 max-w-3xl leading-relaxed">
              Johannesburg&apos;s microsoldering specialists. We repair the chips other shops replace.
              Free diagnostic, No Fix No Fee, 12-month warranty. Hyde Park.
            </p>
            <div className="flex flex-wrap gap-4 mb-8">
              {[
                { icon: Cpu, label: 'Microscope Microsoldering' },
                { icon: Zap, label: 'Free Diagnostic' },
                { icon: CheckCircle, label: 'No Fix No Fee' },
                { icon: AlertTriangle, label: '12-Month Warranty' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 bg-[rgba(15,234,122,0.08)] border border-[rgba(15,234,122,0.15)] px-4 py-2 rounded-full">
                  <Icon className="w-4 h-4 text-[#0FEA7A]" />
                  <span className="text-[#E8F4F1] text-sm font-medium">{label}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href={`tel:${CONTACT.phoneTel}`} className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 hover:shadow-[0_0_32px_rgba(15,234,122,0.4)] transition-all">
                <Phone className="w-5 h-5" /> Call {CONTACT.phone}
              </a>
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all">
                Free Diagnostic <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Fault Types */}
      <section className="py-20 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-10 text-center" style={{ fontFamily: 'Syne, sans-serif' }}>
            Common Logic Board Faults We Fix
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {faults.map((fault) => (
              <div key={fault.title} className="glass-card p-5">
                <h3 className="text-[#E8F4F1] font-bold mb-2" style={{ fontFamily: 'Syne, sans-serif' }}>{fault.title}</h3>
                <p className="text-[#7A9E98] text-sm leading-relaxed">{fault.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Microsoldering vs Board Swap */}
      <section className="py-20 bg-[#111C1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-10 text-center" style={{ fontFamily: 'Syne, sans-serif' }}>
            Microsoldering vs Board Replacement
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="glass-card p-8 border-[rgba(15,234,122,0.3)]">
              <h3 className="text-[#0FEA7A] text-xl font-bold mb-4" style={{ fontFamily: 'Syne, sans-serif' }}>✓ Microsoldering Repair (Our Preference)</h3>
              <ul className="space-y-3">
                {[
                  'Fixes the specific failed component only',
                  'Your original board — your data stays put',
                  '60–80% cheaper than board replacement',
                  'Preserves pairing with Touch ID / Secure Enclave',
                  'Backed by 12-month ZA Support warranty',
                  'Completed in 48–72 hours in most cases',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-[#7A9E98] text-sm">
                    <CheckCircle className="w-4 h-4 text-[#0FEA7A] flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="glass-card p-8">
              <h3 className="text-[#7A9E98] text-xl font-bold mb-4" style={{ fontFamily: 'Syne, sans-serif' }}>Board Replacement (When Necessary)</h3>
              <ul className="space-y-3">
                {[
                  'Required only when repair is not feasible',
                  'Higher cost — full board + installation',
                  'Loss of pairing on Touch ID-dependent features',
                  'Data migration required (if SSD changes)',
                  'Still includes 12-month ZA Support warranty',
                  'Used for: severe burn damage, multiple failed chips',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-[#7A9E98] text-sm">
                    <span className="w-4 h-4 text-[#7A9E98] flex-shrink-0 mt-0.5">–</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-8" style={{ fontFamily: 'Syne, sans-serif' }}>Pricing Guide</h2>
          <div className="glass-card overflow-hidden p-0">
            {pricing.map((item, i) => (
              <div key={item.item} className={`flex items-center justify-between p-5 ${i < pricing.length - 1 ? 'border-b border-[rgba(255,255,255,0.05)]' : ''}`}>
                <div>
                  <p className="text-[#E8F4F1] font-semibold">{item.item}</p>
                  <p className="text-[#7A9E98] text-xs mt-0.5">{item.note}</p>
                </div>
                <span className="text-[#0FEA7A] font-bold whitespace-nowrap ml-4">{item.price}</span>
              </div>
            ))}
          </div>
          <p className="text-[#7A9E98] text-xs mt-3">Final price depends on specific fault and model. Free diagnostic with no obligation.</p>
        </div>
      </section>

      {/* Sub-pages */}
      <section className="py-16 bg-[#111C1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#E8F4F1] mb-6" style={{ fontFamily: 'Syne, sans-serif' }}>Logic Board Repair by Device</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {subPages.map((page) => (
              <Link key={page.href} href={page.href} className="glass-card p-5 flex items-center justify-between group">
                <div>
                  <h3 className="text-[#E8F4F1] font-bold text-sm mb-1">{page.title}</h3>
                  <p className="text-[#0FEA7A] text-xs font-semibold">{page.price}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-[#7A9E98] group-hover:text-[#0FEA7A] transition-colors" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQAccordion items={faqs} title="Logic Board Repair — Common Questions" />
        </div>
      </section>

      <section className="py-16 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-[rgba(39,80,77,0.3)] border border-[rgba(15,234,122,0.2)] rounded-3xl p-10">
            <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3" style={{ fontFamily: 'Syne, sans-serif' }}>Logic Board Fault? Free Diagnostic.</h2>
            <p className="text-[#7A9E98] mb-6">No Fix No Fee. 12-month warranty. Hyde Park, Johannesburg.</p>
            <a href={`tel:${CONTACT.phoneTel}`} className="inline-flex items-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 transition-all">
              <Phone className="w-5 h-5" /> Call {CONTACT.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
