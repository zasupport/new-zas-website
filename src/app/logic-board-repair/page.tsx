import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, ArrowRight, Cpu, Zap, AlertTriangle, CheckCircle, Star, Shield, Clock } from 'lucide-react';
import SchemaOrg from '@/components/seo/SchemaOrg';
import { buildFaqSchema, LOCAL_BUSINESS_PROVIDER } from '@/lib/schema';
import FAQAccordion from '@/components/ui/FAQ';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { CONTACT, SITE } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Logic Board Repair Johannesburg | ZA Support',
  description:
    'MacBook logic board repair in Johannesburg. Expert microsoldering for no-power, no-display, USB-C failure, GPU faults. Free diagnostic. No Fix No Fee. Call 064 529 5863.',
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

const repairTypes = [
  { item: 'Diagnostic Assessment', note: 'Full board-level inspection' },
  { item: 'USB-C / Thunderbolt Repair', note: 'Port board or controller chip' },
  { item: 'Power Circuit Repair', note: 'No-power diagnosis and fix' },
  { item: 'Microsoldering Repair', note: 'Component-level board repair' },
  { item: 'GPU Repair / Reballing', note: 'Discrete GPU only — Intel models' },
  { item: 'Logic Board Replacement', note: 'Where repair is not viable' },
];

// Extended FAQ set — 8 items for FAQPage schema
const faqs = [
  {
    question: 'How much does MacBook logic board repair cost in Johannesburg?',
    answer: 'Component-level microsoldering repair at ZA Support is significantly cheaper than full board replacement at Apple or other shops. We repair the specific failed chip or component rather than replacing the entire logic board. Diagnostic assessment is always free with no obligation — we provide a written quote before any work begins.',
  },
  {
    question: 'Do you offer No Fix No Fee?',
    answer: 'Yes. We offer a genuine No Fix No Fee guarantee. We assess your MacBook at no charge, diagnose the fault under microscope, and only charge you if we successfully repair the device. If we cannot fix it, you pay nothing — not even the diagnostic fee. There are no hidden callout fees, no assessment charges, and no obligation to proceed.',
  },
  {
    question: 'How long does logic board repair take?',
    answer: 'Most logic board repairs are completed within 24–72 hours. Simple faults such as USB-C controller failure or blown fuses are typically fixed within 24 hours. More complex microsoldering work — multi-component faults, GPU reballing, or liquid damage corrosion — can take 3–5 business days. We will confirm a specific timeframe after the free diagnostic assessment.',
  },
  {
    question: 'What MacBook models do you repair?',
    answer: 'We repair all MacBook Pro, MacBook Air, iMac, and Mac mini models from 2010 through to current M4 generation. This includes Intel-based models from 2010–2020 and Apple Silicon M1, M2, M3, and M4 models. For older Intel models we can replace GPU chips, power management ICs, and memory. For Apple Silicon models we service the surrounding components — USB-C controllers, power management circuits, and storage.',
  },
  {
    question: 'Can you recover data from a dead logic board?',
    answer: 'Yes. Data recovery is available as part of our logic board repair service. If your MacBook will not power on, we can often recover your data even if the board itself cannot be repaired. For Intel models with a separate SSD, data recovery is straightforward. For M-series Macs where the SSD is soldered to the board, recovery depends on whether the storage chip itself is intact. We will assess data recoverability as part of the free diagnostic.',
  },
  {
    question: 'Do you provide a warranty on logic board repairs?',
    answer: 'Yes. Every logic board repair carried out by ZA Support includes a 12-month written warranty covering the specific component or fault we repaired. This warranty is provided in writing, is non-negotiable, and covers parts and labour. If the same fault returns within 12 months, we repair it at no charge. This applies to all microsoldering work, board replacements, and component-level repairs.',
  },
  {
    question: 'Can you fix a water-damaged MacBook logic board?',
    answer: 'Yes. Water and liquid damage is one of our most common repair categories. When liquid contacts the logic board it causes corrosion on component pads, traces, and chips. Our process involves ultrasonic cleaning to remove corrosion, followed by micro-inspection to identify failed components, and then targeted component replacement. Liquid damage repairs are most successful when brought in promptly — the longer corrosion is left, the more components it affects.',
  },
  {
    question: "What's the most common MacBook logic board fault?",
    answer: 'The most frequent logic board faults we see are: (1) GPU failure on 2011–2013 MacBook Pro models — the AMD discrete GPU develops solder joint cracks causing display artifacts or no video; (2) USB-C charging controller failure on 2016–2019 MacBook Pro and MacBook Air — the CD3217B12 or similar controller fails, stopping charging; (3) Power management IC failure — the TPS51980 or LP8550 power rail ICs fail, causing no-power symptoms. All three are standard microsoldering repairs for us.',
  },
  {
    question: 'What is the difference between microsoldering repair and board replacement?',
    answer: 'Microsoldering repair fixes the specific failed component on your existing logic board — replacing a chip, capacitor, resistor, or damaged trace under microscope. Board replacement swaps the entire logic board for a new or refurbished one. Microsoldering is typically 60–80% cheaper than board replacement and preserves your original board, your data, and your Touch ID / Secure Enclave pairing. It is our strongly preferred approach and the one we use in the vast majority of cases.',
  },
  {
    question: 'My MacBook shows no signs of life. Is it worth bringing in?',
    answer: 'Yes. A completely dead MacBook is one of the most common faults we successfully repair. "No power" faults are very often caused by a single failed component on the power rail — a blown fuse, failed MOSFET, or damaged charging IC. These are microsoldering-level repairs that cost a fraction of a new machine. Bring it in for a free diagnostic and we will tell you exactly what failed and what it will cost to fix.',
  },
  {
    question: 'Can you repair M1, M2, and M3 MacBook logic boards?',
    answer: 'Yes, with some differences from Intel models. Apple Silicon boards have the CPU, GPU, RAM, and Neural Engine integrated in the M-series chip (SoC), which cannot be replaced at chip level. However, surrounding components — power management, USB-C controllers, storage, and board traces — are fully serviceable through microsoldering.',
  },
  {
    question: 'Is my data safe during a logic board repair?',
    answer: 'Your data stays on the device throughout the repair. We do not reformat or erase your storage unless you specifically request it. If a board replacement is needed and you have an M-series Mac, we will discuss the storage situation with you — on M-series, the SSD is soldered to the board, which requires careful handling.',
  },
];

const subPages = [
  { title: 'MacBook Pro Logic Board', href: '/logic-board-repair/macbook-pro' },
  { title: 'MacBook Air Logic Board', href: '/logic-board-repair/macbook-air' },
  { title: 'iMac Logic Board', href: '/logic-board-repair/imac' },
  { title: 'Mac mini Logic Board', href: '/logic-board-repair/mac-mini' },
];

const suburbPages = [
  { label: 'Sandton', href: '/logic-board-repair/sandton', distance: '8 min' },
  { label: 'Rosebank', href: '/logic-board-repair/rosebank', distance: '5 min' },
  { label: 'Midrand', href: '/logic-board-repair/midrand', distance: '30 min' },
  { label: 'Randburg', href: '/logic-board-repair/randburg', distance: '15 min' },
  { label: 'Fourways', href: '/logic-board-repair/fourways', distance: '25 min' },
  { label: 'Bryanston', href: '/logic-board-repair/bryanston', distance: '10 min' },
];

// IC fault table — common chips we replace
const icFaults = [
  {
    chip: 'AMD GPU (MXM)',
    models: 'MBP 2011–2013',
    symptom: 'Screen artifacts, no video, garbled display',
    repair: 'GPU reballing or BGA replacement',
    risk: 'High',
  },
  {
    chip: 'CD3217B12',
    models: 'MBP/MBA 2016–2019',
    symptom: 'No charging, USB-C dead on one or both sides',
    repair: 'Controller chip replacement',
    risk: 'Medium',
  },
  {
    chip: 'TPS51980',
    models: 'MBP 2013–2016',
    symptom: 'No power, fan spin then shutdown, 0V on PPBUS_G3H',
    repair: 'Power management IC replacement',
    risk: 'High',
  },
  {
    chip: 'LP8550',
    models: 'MBP/MBA 2012–2017',
    symptom: 'No backlight, dim or flickering display',
    repair: 'Backlight driver IC replacement',
    risk: 'Medium',
  },
  {
    chip: 'Thunderbolt Controller',
    models: 'MBP 2011–2014',
    symptom: 'No Thunderbolt, kernel panic on attach, port dead',
    repair: 'Thunderbolt IC replacement',
    risk: 'Medium',
  },
  {
    chip: 'T2 / SMC / Apple Silicon',
    models: 'MBP 2018+, MBA 2020+',
    symptom: 'Loop boot, DFU required, USB-C only powers with specific cable',
    repair: 'T2/SMC-adjacent component service, DFU restore',
    risk: 'High',
  },
];

const customerReviews = [
  {
    name: 'James O.',
    suburb: 'Sandton',
    rating: 5,
    date: '02/2026',
    text: 'My 2019 MacBook Pro was completely dead after a coffee spill. Brought it to ZA Support in Hyde Park and they had it diagnosed within a few hours. Turned out to be corrosion on the USB-C controller. Fixed for a fraction of what Apple quoted for a new logic board. Cannot recommend highly enough.',
  },
  {
    name: 'Priya M.',
    suburb: 'Rosebank',
    rating: 5,
    date: '01/2026',
    text: 'Screen was showing strange lines and flickering on my MacBook Pro 2015. Other shops said it was unfixable or quoted a high price for a replacement board. ZA Support diagnosed it as the GPU and repaired it at a fair price. 12-month warranty included. Six weeks on and it is perfect.',
  },
  {
    name: 'Ryan T.',
    suburb: 'Fourways',
    rating: 5,
    date: '03/2026',
    text: 'MacBook Air M2 would not charge on either USB-C port. ZA Support found a failed charging controller chip and replaced it same day. They were upfront about pricing, no surprises. The free diagnostic saved me from paying a diagnostic fee elsewhere just to be told what was wrong. Will definitely use again.',
  },
];

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'MacBook Logic Board Repair Johannesburg',
  description: 'Expert MacBook logic board repair and microsoldering in Johannesburg. Free diagnostic. No Fix No Fee.',
  provider: LOCAL_BUSINESS_PROVIDER,
  areaServed: { '@type': 'City', name: 'Johannesburg' },
  offers: {
    '@type': 'Offer',
    description: 'MacBook logic board microsoldering repair. Free diagnostic. No Fix No Fee.',
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://zasupport.com' },
    { '@type': 'ListItem', position: 2, name: 'Logic Board Repair', item: 'https://zasupport.com/logic-board-repair' },
  ],
};

const faqSchema = buildFaqSchema(faqs);

const aggregateRatingSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': 'https://zasupport.com/#business',
  name: 'ZA Support',
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '120',
    bestRating: '5',
    worstRating: '1',
  },
};

const reviewSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': 'https://zasupport.com/#business',
  name: 'ZA Support',
  review: customerReviews.map((r) => ({
    '@type': 'Review',
    author: { '@type': 'Person', name: r.name },
    datePublished: r.date,
    reviewRating: { '@type': 'Rating', ratingValue: r.rating, bestRating: 5 },
    reviewBody: r.text,
  })),
};

export default function LogicBoardRepairPage() {
  return (
    <>
      <SchemaOrg schema={faqSchema} />
      <SchemaOrg schema={serviceSchema} />
      <SchemaOrg schema={breadcrumbSchema} />
      <SchemaOrg schema={aggregateRatingSchema} />
      <SchemaOrg schema={reviewSchema} />

      {/* ── HERO ── */}
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
              <a
                href="https://wa.me/27790539964?text=Hi%20ZA%20Support%2C%20I%20need%20help%20with%20my%20MacBook%20logic%20board"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 hover:shadow-[0_0_32px_rgba(15,234,122,0.4)] transition-all"
              >
                💬 WhatsApp for Quote
              </a>
              <a href={CONTACT.booking} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all">
                📅 Book Online
              </a>
              <a href={`tel:${CONTACT.phoneTel}`} className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.2)] text-[#7A9E98] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[rgba(15,234,122,0.05)] transition-all">
                <Phone className="w-5 h-5" /> Call {CONTACT.phone}
              </a>
            </div>

            {/* Stats bar */}
            <div className="flex flex-wrap gap-6 mt-8 pt-6 border-t border-[rgba(255,255,255,0.06)]">
              {[
                { value: '3,000+', label: 'Logic Board Repairs' },
                { value: '14 Years', label: 'Experience Since 2012' },
                { value: '12 Months', label: 'Written Warranty' },
                { value: 'No Fix', label: 'No Fee — Always' },
                { value: `${SITE.rating}★`, label: `${SITE.reviewCount} Google Reviews` },
              ].map(({ value, label }) => (
                <div key={label}>
                  <p className="text-[#0FEA7A] text-xl font-extrabold" style={{ fontFamily: 'Syne, sans-serif' }}>{value}</p>
                  <p className="text-[#7A9E98] text-xs mt-0.5">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FREE DIAGNOSTIC COMPETITIVE CALLOUT ── */}
      <section className="py-6 bg-[rgba(15,234,122,0.06)] border-y border-[rgba(15,234,122,0.12)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-8 text-center">
            <div>
              <p className="text-[#7A9E98] text-xs uppercase tracking-wider mb-1">Mac Shack &amp; other shops</p>
              <p className="text-xl font-extrabold text-red-400 line-through">Paid diagnostic fee</p>
            </div>
            <div className="text-[#0FEA7A] text-3xl font-black">vs</div>
            <div>
              <p className="text-[#7A9E98] text-xs uppercase tracking-wider mb-1">ZA Support</p>
              <p className="text-xl font-extrabold text-[#0FEA7A]">Free diagnostic — always</p>
            </div>
            <div className="hidden sm:block h-8 w-px bg-[rgba(15,234,122,0.2)]"></div>
            <div>
              <p className="text-[#E8F4F1] text-sm font-semibold">Free diagnostic — no charge, no obligation</p>
              <p className="text-[#7A9E98] text-xs mt-0.5">No Fix No Fee. 12-month written warranty on every repair.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAULT TYPES ── */}
      <section className="py-20 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4 text-center" style={{ fontFamily: 'Syne, sans-serif' }}>
            Common Logic Board Faults We Fix
          </h2>
          <p className="text-[#7A9E98] text-center text-sm mb-10 max-w-2xl mx-auto">
            Every fault below is diagnosed free of charge. We use a Trinocular stereo microscope and professional hot air rework station for all microsoldering work.
          </p>
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

      {/* ── WHY COMPONENT REPAIR BEATS BOARD REPLACEMENT — PRICE COMPARISON TABLE ── */}
      <section className="py-20 bg-[#111C1A]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4 text-center" style={{ fontFamily: 'Syne, sans-serif' }}>
            Why Component-Level Repair Beats Full Board Replacement
          </h2>
          <p className="text-[#7A9E98] text-center text-sm mb-10 max-w-2xl mx-auto">
            Most MacBook logic board failures are caused by a single failed component — not the entire board. Replacing the whole board when only one chip has failed is unnecessary, expensive, and causes you to lose your original hardware pairing. Here is how ZA Support compares to the alternatives.
          </p>

          {/* Comparison table */}
          <div className="overflow-x-auto rounded-2xl border border-[rgba(255,255,255,0.08)]">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[rgba(15,234,122,0.08)] border-b border-[rgba(255,255,255,0.08)]">
                  <th className="text-left text-[#7A9E98] font-semibold px-5 py-4 uppercase tracking-wider text-xs">Provider</th>
                  <th className="text-left text-[#7A9E98] font-semibold px-5 py-4 uppercase tracking-wider text-xs">Approach</th>
                  <th className="text-left text-[#7A9E98] font-semibold px-5 py-4 uppercase tracking-wider text-xs">Typical Cost</th>
                  <th className="text-left text-[#7A9E98] font-semibold px-5 py-4 uppercase tracking-wider text-xs">Diagnostic</th>
                  <th className="text-left text-[#7A9E98] font-semibold px-5 py-4 uppercase tracking-wider text-xs">Warranty</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-[rgba(255,255,255,0.05)] bg-[rgba(15,234,122,0.04)]">
                  <td className="px-5 py-4">
                    <span className="text-[#0FEA7A] font-bold">ZA Support</span>
                    <span className="ml-2 text-[10px] bg-[#0FEA7A]/10 text-[#0FEA7A] border border-[#0FEA7A]/20 px-2 py-0.5 rounded-full">Recommended</span>
                  </td>
                  <td className="px-5 py-4 text-[#E8F4F1]">Component-level microsoldering</td>
                  <td className="px-5 py-4 text-[#0FEA7A] font-bold">Quoted on assessment</td>
                  <td className="px-5 py-4 text-[#0FEA7A] font-semibold">Free</td>
                  <td className="px-5 py-4 text-[#0FEA7A] font-semibold">12 months written</td>
                </tr>
                <tr className="border-b border-[rgba(255,255,255,0.05)]">
                  <td className="px-5 py-4 text-[#E8F4F1] font-medium">Apple Store (Johannesburg)</td>
                  <td className="px-5 py-4 text-[#7A9E98]">Full logic board replacement</td>
                  <td className="px-5 py-4 text-red-400 font-bold">Full board replacement</td>
                  <td className="px-5 py-4 text-[#7A9E98]">Free assessment</td>
                  <td className="px-5 py-4 text-[#7A9E98]">90 days (parts only)</td>
                </tr>
                <tr>
                  <td className="px-5 py-4 text-[#E8F4F1] font-medium">Mac Shack</td>
                  <td className="px-5 py-4 text-[#7A9E98]">Board replacement (no microsoldering)</td>
                  <td className="px-5 py-4 text-orange-400 font-bold">Board swap (no microsoldering)</td>
                  <td className="px-5 py-4 text-[#7A9E98]">Paid diagnostic fee</td>
                  <td className="px-5 py-4 text-[#7A9E98]">3 months</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-6 p-4 rounded-xl bg-[rgba(15,234,122,0.04)] border border-[rgba(15,234,122,0.12)]">
            <p className="text-[#7A9E98] text-xs leading-relaxed">
              Price comparison based on publicly available information and customer-reported quotes as at March 2026. ZA Support prices are for component-level repair — final price depends on specific fault identified at free diagnostic. Apple Store pricing varies by model and is subject to change.
            </p>
          </div>

          {/* Why it matters — prose */}
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                icon: Shield,
                title: 'Your data stays on the device',
                body: 'Component-level repair leaves your storage, your files, and your operating system completely untouched. Board replacement on M-series Macs means losing everything on the soldered SSD.',
              },
              {
                icon: CheckCircle,
                title: 'Touch ID pairing preserved',
                body: 'The Touch ID sensor is paired to the T2 chip or Secure Enclave on your original board. Replacing the board breaks this pairing permanently. Microsoldering keeps your original board intact.',
              },
              {
                icon: Clock,
                title: 'Faster turnaround',
                body: 'We fix the component that failed, not the whole board. Most repairs are completed in 24–72 hours. Board replacement often requires a week or more while parts are ordered.',
              },
            ].map(({ icon: Icon, title, body }) => (
              <div key={title} className="glass-card p-6">
                <Icon className="w-6 h-6 text-[#0FEA7A] mb-3" />
                <h3 className="text-[#E8F4F1] font-bold mb-2 text-sm" style={{ fontFamily: 'Syne, sans-serif' }}>{title}</h3>
                <p className="text-[#7A9E98] text-xs leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── IC FAULT TABLE ── */}
      <section className="py-20 bg-[#0A1A18]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4 text-center" style={{ fontFamily: 'Syne, sans-serif' }}>
            IC Fault Reference — Chips We Replace
          </h2>
          <p className="text-[#7A9E98] text-center text-sm mb-10 max-w-2xl mx-auto">
            Our technicians work at component level. Below are the most common integrated circuits (ICs) we replace on MacBook and Mac logic boards — with the models affected, typical symptoms, and repair approach.
          </p>
          <div className="overflow-x-auto rounded-2xl border border-[rgba(255,255,255,0.08)]">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[rgba(15,234,122,0.06)] border-b border-[rgba(255,255,255,0.08)]">
                  <th className="text-left text-[#7A9E98] font-semibold px-5 py-4 uppercase tracking-wider text-xs">Chip / Component</th>
                  <th className="text-left text-[#7A9E98] font-semibold px-5 py-4 uppercase tracking-wider text-xs">Affected Models</th>
                  <th className="text-left text-[#7A9E98] font-semibold px-5 py-4 uppercase tracking-wider text-xs">Typical Symptom</th>
                  <th className="text-left text-[#7A9E98] font-semibold px-5 py-4 uppercase tracking-wider text-xs">Our Repair</th>
                  <th className="text-left text-[#7A9E98] font-semibold px-5 py-4 uppercase tracking-wider text-xs">Risk</th>
                </tr>
              </thead>
              <tbody>
                {icFaults.map((ic, i) => (
                  <tr key={ic.chip} className={`${i < icFaults.length - 1 ? 'border-b border-[rgba(255,255,255,0.05)]' : ''} hover:bg-[rgba(255,255,255,0.02)] transition-colors`}>
                    <td className="px-5 py-4">
                      <span className="text-[#E8F4F1] font-bold font-mono text-xs">{ic.chip}</span>
                    </td>
                    <td className="px-5 py-4 text-[#7A9E98]">{ic.models}</td>
                    <td className="px-5 py-4 text-[#7A9E98]">{ic.symptom}</td>
                    <td className="px-5 py-4 text-[#E8F4F1] text-xs">{ic.repair}</td>
                    <td className="px-5 py-4">
                      <span className={`text-xs font-semibold px-2 py-1 rounded-full ${ic.risk === 'High' ? 'bg-red-500/10 text-red-400' : 'bg-orange-500/10 text-orange-400'}`}>
                        {ic.risk}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-[#7A9E98] text-xs mt-4 text-center">
            Risk rating indicates complexity of the repair, not likelihood of success. All repairs include free diagnostic. No Fix No Fee applies.
          </p>
        </div>
      </section>

      {/* ── MICROSOLDERING VS BOARD SWAP (existing section) ── */}
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

      {/* ── REPAIR TYPES ── */}
      <section className="py-20 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-4" style={{ fontFamily: 'Syne, sans-serif' }}>Repair Services</h2>
          <p className="text-[#7A9E98] text-sm mb-8 max-w-2xl">
            All repairs are component-level. Final cost is confirmed after the free diagnostic assessment. You pay nothing if we cannot fix it.
          </p>
          <div className="glass-card overflow-hidden p-0">
            {repairTypes.map((item, i) => (
              <div key={item.item} className={`flex items-center justify-between p-5 ${i < repairTypes.length - 1 ? 'border-b border-[rgba(255,255,255,0.05)]' : ''}`}>
                <div>
                  <p className="text-[#E8F4F1] font-semibold">{item.item}</p>
                  <p className="text-[#7A9E98] text-xs mt-0.5">{item.note}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-[#7A9E98] text-xs mt-3">Final cost depends on specific fault and model. Free diagnostic with no obligation.</p>
          <div className="rounded-xl border border-[#0FEA7A]/30 bg-[#0FEA7A]/5 p-5 mt-4">
            <p className="text-sm text-[#7A9E98]">
              💡 <strong className="text-[#E8F4F1]">Free diagnostic — always.</strong> Unlike other shops that charge a diagnostic fee before even looking at your board, ZA Support assesses your Mac at no charge with no obligation.
            </p>
          </div>

          {/* Mid-page WhatsApp CTA */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <a
              href="https://wa.me/27790539964?text=Hi%20ZA%20Support%2C%20I%20need%20help%20with%20my%20MacBook%20logic%20board"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 hover:shadow-[0_0_32px_rgba(15,234,122,0.4)] transition-all"
            >
              💬 WhatsApp Us — Free Diagnostic
            </a>
            <a href={`tel:${CONTACT.phoneTel}`} className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all">
              <Phone className="w-5 h-5" /> Call {CONTACT.phone}
            </a>
          </div>
        </div>
      </section>

      {/* ── CUSTOMER REVIEWS ── */}
      <section className="py-20 bg-[#111C1A]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3 text-center" style={{ fontFamily: 'Syne, sans-serif' }}>
            What Our Customers Say
          </h2>
          <div className="flex items-center justify-center gap-2 mb-10">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} className="w-5 h-5 fill-[#0FEA7A] text-[#0FEA7A]" />
            ))}
            <span className="text-[#7A9E98] text-sm ml-2">4.9 average · 120 Google reviews</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {customerReviews.map((review) => (
              <div key={review.name} className="glass-card p-6">
                <div className="flex items-center gap-1 mb-3">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="w-3.5 h-3.5 fill-[#0FEA7A] text-[#0FEA7A]" />
                  ))}
                </div>
                <p className="text-[#7A9E98] text-sm leading-relaxed mb-4 italic">&ldquo;{review.text}&rdquo;</p>
                <div className="border-t border-[rgba(255,255,255,0.06)] pt-3">
                  <p className="text-[#E8F4F1] text-xs font-bold">{review.name}</p>
                  <p className="text-[#7A9E98] text-xs">{review.suburb} · {review.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DEVICE SUB-PAGES ── */}
      <section className="py-16 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#E8F4F1] mb-3" style={{ fontFamily: 'Syne, sans-serif' }}>Logic Board Repair by Device</h2>
          <p className="text-[#7A9E98] text-sm mb-6 max-w-2xl">
            Each Mac model has unique logic board architecture and common fault patterns. Select your device below for model-specific information.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {subPages.map((page) => (
              <Link key={page.href} href={page.href} className="glass-card p-5 flex items-center justify-between group hover:border-[rgba(15,234,122,0.3)] transition-colors">
                <div>
                  <h3 className="text-[#E8F4F1] font-bold text-sm mb-1 group-hover:text-[#0FEA7A] transition-colors">{page.title}</h3>
                  <p className="text-[#0FEA7A] text-xs font-semibold">Free diagnostic</p>
                </div>
                <ArrowRight className="w-4 h-4 text-[#7A9E98] group-hover:text-[#0FEA7A] transition-colors" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── AREAS WE SERVE ── */}
      <section className="py-16 bg-[#111C1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#E8F4F1] mb-3" style={{ fontFamily: 'Syne, sans-serif' }}>Areas We Serve</h2>
          <p className="text-[#7A9E98] text-sm mb-6 max-w-2xl">
            We collect from all major Johannesburg suburbs and repair at our Hyde Park workshop. Click your area for suburb-specific information and collection details.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {suburbPages.map((area) => (
              <Link key={area.href} href={area.href} className="glass-card p-5 flex flex-col items-start group hover:border-[rgba(15,234,122,0.3)] transition-colors">
                <h3 className="text-[#E8F4F1] font-bold text-sm mb-1 group-hover:text-[#0FEA7A] transition-colors">{area.label}</h3>
                <p className="text-[#7A9E98] text-xs">~{area.distance} from Hyde Park</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section className="py-20 bg-[#0A1A18]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-4 text-center" style={{ fontFamily: 'Syne, sans-serif' }}>
            Our Repair Process
          </h2>
          <p className="text-[#7A9E98] text-center text-sm mb-10 max-w-2xl mx-auto">
            We follow a clear, transparent process from the moment you contact us to the moment we hand your Mac back.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { step: '01', title: 'Free Diagnostic', body: 'Bring your Mac to our Hyde Park workshop or arrange a courier. We inspect the board under microscope and identify the fault — at no charge.' },
              { step: '02', title: 'Written Quote', body: 'You receive a clear, written quote before any work begins. No hidden fees. If the price is not acceptable, there is no charge.' },
              { step: '03', title: 'Microsoldering Repair', body: 'Our technician works at component level using a Trinocular microscope and professional rework station. Most repairs completed in 24–72 hours.' },
              { step: '04', title: 'Tested and Warrantied', body: 'Your Mac is fully tested before collection. Every repair includes a 12-month written warranty. If the same fault returns, we fix it free.' },
            ].map(({ step, title, body }) => (
              <div key={step} className="glass-card p-6 relative overflow-hidden">
                <span className="absolute top-4 right-4 text-[#0FEA7A] text-3xl font-extrabold opacity-20" style={{ fontFamily: 'Syne, sans-serif' }}>{step}</span>
                <h3 className="text-[#E8F4F1] font-bold mb-2 text-sm" style={{ fontFamily: 'Syne, sans-serif' }}>{title}</h3>
                <p className="text-[#7A9E98] text-xs leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQAccordion items={faqs} title="Logic Board Repair — Common Questions" />
        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section className="py-16 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-[rgba(39,80,77,0.3)] border border-[rgba(15,234,122,0.2)] rounded-3xl p-10">
            <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3" style={{ fontFamily: 'Syne, sans-serif' }}>Logic Board Fault? Free Diagnostic.</h2>
            <p className="text-[#7A9E98] mb-2">No Fix No Fee. 12-month warranty. Hyde Park, Johannesburg.</p>
            <p className="text-[#7A9E98] text-sm mb-8">
              Free diagnostic — no charge, no obligation. We only charge you if we successfully repair your Mac.
              Unlike other shops, we do not charge a diagnostic fee before we begin.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/27790539964?text=Hi%20ZA%20Support%2C%20I%20need%20help%20with%20my%20MacBook%20logic%20board"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 hover:shadow-[0_0_32px_rgba(15,234,122,0.4)] transition-all"
              >
                💬 WhatsApp for Quote
              </a>
              <a href={CONTACT.booking} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all">
                📅 Book Online
              </a>
              <a href={`tel:${CONTACT.phoneTel}`} className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.2)] text-[#7A9E98] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[rgba(15,234,122,0.05)] transition-all">
                <Phone className="w-5 h-5" /> Call {CONTACT.phone}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
