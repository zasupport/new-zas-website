import type { Metadata } from 'next';
import Link from 'next/link';
import { Suspense } from 'react';
import { Phone, ArrowRight, Cpu, Zap, AlertTriangle, CheckCircle, Star, Shield, Clock } from 'lucide-react';
import SchemaOrg from '@/components/seo/SchemaOrg';
import { buildFaqSchema, LOCAL_BUSINESS_PROVIDER } from '@/lib/schema';
import GoogleReviews from '@/components/ui/GoogleReviews';
import FAQAccordion from '@/components/ui/FAQ';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { CONTACT, SITE } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Logic Board Repair Johannesburg | ZA Support',
  description:
    'MacBook logic board repair in Johannesburg. Expert component-level repair for no-power, no-display, USB-C failure, GPU faults. Assessment: from R599. up-to-3 year warranty. Call 064 529 5863.',
  alternates: { canonical: 'https://zasupport.com/logic-board-repair' },
};

const faults = [
  { title: 'No Power', desc: 'MacBook shows no signs of life, no fans, no display, no LED. Board-level power circuit diagnosis and repair.' },
  { title: 'No Display', desc: 'Mac boots but screen stays black. GPU failure, backlight circuit, T-Con board, or display cable fault.' },
  { title: 'Liquid Damage', desc: 'Corrosion on traces and component pads after liquid exposure. Professional board cleaning and component replacement.' },
  { title: 'Overheating / Shutdown', desc: 'Thermal runaway, failing voltage regulators, or blocked power rails causing unexpected shutdown.' },
  { title: 'USB-C / Thunderbolt Failure', desc: 'No charging, no external display, or no data on USB-C ports. Controller chip or port board replacement.' },
  { title: 'Fan Error / Loud Fan', desc: 'SMC fault, fan controller issue, or failed thermal sensor causing fan to run at maximum speed.' },
  { title: 'GPU Failure', desc: 'Screen artifacts, garbled display, or external display failure. Discrete GPU restoration or replacement.' },
  { title: 'Kernel Panic / Crash', desc: 'Persistent kernel panics traced to failing RAM, storage, or logic board component fault.' },
];

const repairTypes = [
  { item: 'Diagnostic Assessment', note: 'Full board-level inspection' },
  { item: 'USB-C / Thunderbolt Repair', note: 'Port board or controller chip' },
  { item: 'Power Circuit Repair', note: 'No-power diagnosis and fix' },
  { item: 'Component-level repair Repair', note: 'Component-level board repair' },
  { item: 'GPU Repair', note: 'Discrete GPU only, Intel models' },
  { item: 'Logic Board Replacement', note: 'Where repair is not viable' },
];

// Extended FAQ set, 8 items for FAQPage schema
const faqs = [
  {
    question: 'How much does MacBook logic board repair cost in Johannesburg?',
    answer: 'Component-level repair at ZA Support is significantly cheaper than a full board replacement. We repair the specific failed chip or component rather than replacing the entire logic board. Assessment fee is from R599. Written quote provided before any work begins.',
  },
  {
    question: 'What is your assessment fee policy?',
    answer: 'Our assessment fee is from R599. This covers a full board-level diagnostic under microscope and a written fixed-price quote. If you approve the quote and we proceed with the repair, the from R599 assessment fee applies. If you decline, the assessment fee is payable for the diagnostic work completed.',
  },
  {
    question: 'How long does logic board repair take?',
    answer: 'Most logic board repairs are completed within 24–72 hours. Simple faults such as USB-C controller failure or blown fuses are typically fixed within 24 hours. More complex component-level repair work, multi-component faults, GPU restoration, or liquid damage corrosion, can take 3–5 business days. We will confirm a specific timeframe after the assessment.',
  },
  {
    question: 'What MacBook models do you repair?',
    answer: 'We repair all MacBook Pro, MacBook Air, iMac, and Mac mini models from 2010 through to current M4 generation. This includes Intel-based models from 2010–2020 and Apple Silicon M1, M2, M3, and M4 models. For older Intel models we can replace GPU chips, power management ICs, and memory. For Apple Silicon models we service the surrounding components, USB-C controllers, power management circuits, and storage.',
  },
  {
    question: 'Can you recover data from a dead logic board?',
    answer: 'Yes. Data recovery is available as part of our logic board repair service. If your MacBook will not power on, we can often recover your data even if the board itself cannot be repaired. For Intel models with a separate SSD, data recovery is straightforward. For M-series Macs where the SSD is soldered to the board, recovery depends on whether the storage chip itself is intact. We will assess data recoverability as part of the assessment.',
  },
  {
    question: 'Do you provide a warranty on logic board repairs?',
    answer: 'Yes. Every logic board repair carried out by ZA Support includes a up-to-3 year warranty covering the specific component or fault we repaired. This warranty is provided in writing, is non-negotiable, and covers parts and labour. If the same fault returns within the warranty period, we repair it at no charge. This applies to all component-level repair work, board replacements, and component-level repairs.',
  },
  {
    question: 'Can you fix a water-damaged MacBook logic board?',
    answer: 'Yes. Water and liquid damage is one of our most common repair categories. When liquid contacts the logic board it causes corrosion on component pads, traces, and chips. Our process involves professional board cleaning to remove corrosion, followed by micro-inspection to identify failed components, and then targeted component replacement. Liquid damage repairs are most successful when brought in promptly, the longer corrosion is left, the more components it affects.',
  },
  {
    question: "What's the most common MacBook logic board fault?",
    answer: 'The most frequent logic board faults we see are: (1) GPU failure on 2011–2013 MacBook Pro models, the AMD discrete GPU develops solder joint cracks causing display artifacts or no video; (2) USB-C charging controller failure on 2016–2019 MacBook Pro and MacBook Air, the CD3217B12 or similar controller fails, stopping charging; (3) Power management IC failure, the TPS51980 or LP8550 power rail ICs fail, causing no-power symptoms. All three are standard component-level repairs for us.',
  },
  {
    question: 'What is the difference between component-level repair and board replacement?',
    answer: 'Component-level repair fixes the specific failed component on your existing logic board, replacing a chip, capacitor, resistor, or damaged trace under microscope. Board replacement swaps the entire logic board for a new or refurbished one. Component-level repair is typically 60–80% cheaper than board replacement and preserves your original board, your data, and your Touch ID / Secure Enclave pairing. It is our strongly preferred approach and the one we use in the vast majority of cases.',
  },
  {
    question: 'My MacBook shows no signs of life. Is it worth bringing in?',
    answer: 'Yes. A completely dead MacBook is one of the most common faults we successfully repair. "No power" faults are very often caused by a single failed component on the power rail, a blown fuse, failed MOSFET, or damaged charging IC. These are component-level repair-level repairs that cost a fraction of a new machine. Book an assessment (from R599) and we will tell you exactly what failed and what it will cost to fix.',
  },
  {
    question: 'Can you repair M1, M2, and M3 MacBook logic boards?',
    answer: 'Yes, with some differences from Intel models. Apple Silicon boards have the CPU, GPU, RAM, and Neural Engine integrated in the M-series chip (SoC), which cannot be replaced at chip level. However, surrounding components, power management, USB-C controllers, storage, and board traces, are fully serviceable through component-level repair.',
  },
  {
    question: 'Is my data safe during a logic board repair?',
    answer: 'Your data stays on the device throughout the repair. We do not reformat or erase your storage unless you specifically request it. If a board replacement is needed and you have an M-series Mac, we will discuss the storage situation with you, on M-series, the SSD is soldered to the board, which requires careful handling.',
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

// IC fault table, common chips we replace
const icFaults = [
  {
    chip: 'AMD GPU (MXM)',
    models: 'MBP 2011–2013',
    symptom: 'Screen artifacts, no video, garbled display',
    repair: 'GPU restoration or replacement',
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
    text: 'My 2019 MacBook Pro was completely dead after a coffee spill. Brought it to ZA Support in Hyde Park and they had it diagnosed within a few hours. Turned out to be corrosion on the USB-C controller. Fixed for a fraction of the cost of a new logic board. Cannot recommend highly enough.',
  },
  {
    name: 'Priya M.',
    suburb: 'Rosebank',
    rating: 5,
    date: '01/2026',
    text: 'Screen was showing strange lines and flickering on my MacBook Pro 2015. I had been told it was unfixable or quoted a high price for a replacement board. ZA Support diagnosed it as the GPU and repaired it at a fair price. up-to-3 year warranty included. Six weeks on and it is perfect.',
  },
  {
    name: 'Ryan T.',
    suburb: 'Fourways',
    rating: 5,
    date: '03/2026',
    text: 'MacBook Air M2 would not charge on either USB-C port. ZA Support found a failed charging controller chip and replaced it same day. They were upfront about pricing, no surprises. Clear written quote before any work began. Will definitely use again.',
  },
];

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'MacBook Logic Board Repair Johannesburg',
  description: 'Expert MacBook logic board repair and component-level repair in Johannesburg. Assessment: from R599. up-to-3 year warranty.',
  provider: LOCAL_BUSINESS_PROVIDER,
  areaServed: [
    { '@type': 'City', name: 'Johannesburg' },
    { '@type': 'Neighborhood', name: 'Hyde Park' },
    { '@type': 'Neighborhood', name: 'Sandton' },
    { '@type': 'Neighborhood', name: 'Rosebank' },
  ],
  availableChannel: [
    { '@type': 'ServiceChannel', serviceUrl: 'https://wa.me/27645295863', serviceType: 'WhatsApp' },
    { '@type': 'ServiceChannel', servicePhone: '+27645295863', serviceType: 'Phone' },
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Logic Board Repair Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'MacBook Logic Board Diagnostic Assessment',
          description: 'Board-level inspection under microscope. from R599. Written quote provided.',
        },
        price: '0',
        priceCurrency: 'ZAR',
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'MacBook Component-level repair Repair',
          description: 'Component-level logic board repair. Chip replacement, trace repair, specialist restoration. up-to-3 year warranty.',
        },
        priceCurrency: 'ZAR',
      },
    ],
  },
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How MacBook logic board repair works',
  description: 'The step-by-step process ZA Support follows for MacBook logic board component-level repair in Johannesburg.',
  totalTime: 'P3D',
  tool: [
    { '@type': 'HowToTool', name: 'Soldering microscope' },
    { '@type': 'HowToTool', name: 'Hot air rework station' },
    { '@type': 'HowToTool', name: 'DC power supply for board-level testing' },
  ],
  supply: [],
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Diagnostic assessment',
      text: 'Your MacBook is disassembled and the logic board examined under magnification. We identify the specific failed component or damaged area and provide a written quote before any work begins. Assessment fee: from R599.',
      url: 'https://zasupport.com/logic-board-repair#diagnostic',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Board-level inspection and fault isolation',
      text: 'We use a DC power supply to inject voltage at known-good rails, trace short circuits, and identify the exact failed component, a specific chip, capacitor, fuse, or damaged trace.',
      url: 'https://zasupport.com/logic-board-repair#inspection',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Component-level repair',
      text: 'The failed component is removed under microscope using specialist soldering equipment. The replacement part is soldered in place with precision, and the surrounding area is cleaned.',
      url: 'https://zasupport.com/logic-board-repair#repair',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Full functional test',
      text: 'After reassembly, your MacBook is tested for display, charging, ports, Wi-Fi, keyboard, trackpad, and all sensors. We confirm the original fault is resolved and no new issues have been introduced.',
      url: 'https://zasupport.com/logic-board-repair#testing',
    },
    {
      '@type': 'HowToStep',
      position: 5,
      name: 'Return with Up-to-3 Year Warranty',
      text: 'Your repaired MacBook is returned with a up-to-3 year warranty on the specific component or fault repaired. If the same fault returns within the warranty period, we fix it at no charge.',
      url: 'https://zasupport.com/logic-board-repair#warranty',
    },
  ],
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

const reviewSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': 'https://zasupport.com/#organization',
  name: 'ZA Support',
  review: customerReviews.map((r) => ({
    '@type': 'Review',
    author: { '@type': 'Person', name: r.name },
    datePublished: r.date,
    reviewRating: { '@type': 'Rating', ratingValue: String(r.rating), bestRating: '5' },
    reviewBody: r.text,
    itemReviewed: {
      '@type': 'Service',
      name: 'MacBook Logic Board Repair Johannesburg',
      provider: { '@type': 'LocalBusiness', name: 'ZA Support', url: 'https://zasupport.com' },
    },
  })),
};

const speakableSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': 'https://zasupport.com/logic-board-repair#webpage',
  name: 'Logic Board Repair Johannesburg | ZA Support',
  url: 'https://zasupport.com/logic-board-repair',
  speakable: {
    '@type': 'SpeakableSpecification',
    cssSelector: ['h1', '.speakable-summary'],
  },
};

export default function LogicBoardRepairPage() {
  return (
    <>
      <SchemaOrg schema={faqSchema} />
      <SchemaOrg schema={serviceSchema} />
      <SchemaOrg schema={breadcrumbSchema} />
      <SchemaOrg schema={reviewSchema} />
      <SchemaOrg schema={howToSchema} />
      <SchemaOrg schema={speakableSchema} />

      {/* ── HERO ── */}
      <section className="hero-gradient grid-overlay pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: 'Logic Board Repair' }]} />
          <div className="mt-8 max-w-4xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#E8F4F1] leading-tight mb-6">
              MacBook Logic Board Repair
              <br /><span className="text-[#0FEA7A]">in Johannesburg</span>
            </h1>
            <p className="speakable-summary text-xl text-[#7A9E98] mb-8 max-w-3xl leading-relaxed">
              Johannesburg&apos;s component-level repair specialists. We repair the specific faulty component where possible — saving clients up to 80% versus full board replacement.
              Assessment: from R599 (payable on confirmation if you proceed). up-to-3 year warranty. Hyde Park.
            </p>
            <div className="flex flex-wrap gap-4 mb-8">
              {[
                { icon: Cpu, label: 'Microscope Component-level repair' },
                { icon: Zap, label: 'Assessment: from R599' },
                { icon: CheckCircle, label: 'Up-to-3 Year Warranty' },
                { icon: AlertTriangle, label: 'Written Quote First' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 bg-[rgba(15,234,122,0.08)] border border-[rgba(15,234,122,0.15)] px-4 py-2 rounded-full">
                  <Icon className="w-4 h-4 text-[#0FEA7A]" />
                  <span className="text-[#E8F4F1] text-sm font-medium">{label}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="/api/wa?service=logic-board&page=/logic-board-repair"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 hover:shadow-[0_0_32px_rgba(15,234,122,0.4)] transition-all"
              >
                💬 WhatsApp for Quote
              </a>
              <a href={CONTACT.booking} className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all">
                📅 Book Online
              </a>
              <a href={`tel:${CONTACT.phoneTel}`} className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.2)] text-[#7A9E98] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[rgba(15,234,122,0.05)] transition-all">
                <Phone className="w-5 h-5" /> Call {CONTACT.phone}
              </a>
            </div>

            {/* Stats bar */}
            <div className="flex flex-wrap gap-6 mt-8 pt-6 border-t border-[rgba(255,255,255,0.06)]">
              {[
                { value: '50,000+', label: 'Logic Board Repairs' },
                { value: '16 Years', label: 'Experience Since 2009' },
                { value: 'Covered', label: 'Up-to-3 Year Warranty' },
                { value: 'from R599', label: 'Assessment Fee' },
                { value: `${SITE.rating}★`, label: `${SITE.reviewCount} Google Reviews` },
              ].map(({ value, label }) => (
                <div key={label}>
                  <p className="text-[#0FEA7A] text-xl font-extrabold">{value}</p>
                  <p className="text-[#7A9E98] text-xs mt-0.5">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Google Reviews */}
      <section className="py-12 sm:py-16 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-[#0FEA7A] font-semibold text-sm uppercase tracking-wider mb-2">Verified Reviews</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1]">4.9★ — Over 632 Google Reviews</h2>
            <p className="text-[#7A9E98] mt-2">16 years of Apple expertise. Johannesburg&apos;s most reviewed Apple specialist.</p>
          </div>
          <Suspense fallback={<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">{[...Array(4)].map((_,i) => <div key={i} className="glass-card p-6 animate-pulse h-40 rounded-2xl" />)}</div>}>
            <GoogleReviews maxReviews={4} />
          </Suspense>
        </div>
      </section>

      {/* ── FREE DIAGNOSTIC COMPETITIVE CALLOUT ── */}
      <section className="py-6 bg-[rgba(15,234,122,0.06)] border-y border-[rgba(15,234,122,0.12)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-8 text-center">
            <div>
              <p className="text-[#7A9E98] text-xs uppercase tracking-wider mb-1">Assessment policy</p>
              <p className="text-xl font-extrabold text-[#E8F4F1]">from R599</p>
            </div>
            <div className="text-[#0FEA7A] text-3xl font-black">·</div>
            <div>
              <p className="text-[#7A9E98] text-xs uppercase tracking-wider mb-1">If you proceed</p>
              <p className="text-xl font-extrabold text-[#0FEA7A]">Assessment fee from R599</p>
            </div>
            <div className="hidden sm:block h-8 w-px bg-[rgba(15,234,122,0.2)]"></div>
            <div>
              <p className="text-[#E8F4F1] text-sm font-semibold">Written fixed-price quote before any work begins</p>
              <p className="text-[#7A9E98] text-xs mt-0.5">up-to-3 year warranty on every repair.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAULT TYPES ── */}
      <section className="py-20 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4 text-center">
            Common Logic Board Faults We Fix
          </h2>
          <p className="text-[#7A9E98] text-center text-sm mb-10 max-w-2xl mx-auto">
            Every fault below is covered by our standard assessment process. We use professional specialist equipment for all component-level repair work.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {faults.map((fault) => (
              <div key={fault.title} className="glass-card p-5">
                <h3 className="text-[#E8F4F1] font-bold mb-2">{fault.title}</h3>
                <p className="text-[#7A9E98] text-sm leading-relaxed">{fault.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY COMPONENT REPAIR BEATS BOARD REPLACEMENT, PRICE COMPARISON TABLE ── */}
      <section className="py-20 bg-[#111C1A]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4 text-center">
            Why Component-Level Repair Beats Full Board Replacement
          </h2>
          <p className="text-[#7A9E98] text-center text-sm mb-10 max-w-2xl mx-auto">
            Most MacBook logic board failures are caused by a single failed component, not the entire board. Replacing the whole board when only one chip has failed is unnecessary, expensive, and causes you to lose your original hardware pairing.
          </p>

          {/* Why it matters, prose */}
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
                body: 'The Touch ID sensor is paired to the T2 chip or Secure Enclave on your original board. Replacing the board breaks this pairing permanently. Component-level repair keeps your original board intact.',
              },
              {
                icon: Clock,
                title: 'Faster turnaround',
                body: 'We repair the specific faulty component where possible — full board replacement also available when required. Most repairs are completed in 24–72 hours. Board replacement often requires a week or more while parts are ordered.',
              },
            ].map(({ icon: Icon, title, body }) => (
              <div key={title} className="glass-card p-6">
                <Icon className="w-6 h-6 text-[#0FEA7A] mb-3" />
                <h3 className="text-[#E8F4F1] font-bold mb-2 text-sm">{title}</h3>
                <p className="text-[#7A9E98] text-xs leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── IC FAULT TABLE ── */}
      <section className="py-20 bg-[#0A1A18]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4 text-center">
            IC Fault Reference, Chips We Replace
          </h2>
          <p className="text-[#7A9E98] text-center text-sm mb-10 max-w-2xl mx-auto">
            Our technicians work at component level. Below are the most common integrated circuits (ICs) we replace on MacBook and Mac logic boards, with the models affected, typical symptoms, and repair approach.
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
            Risk rating indicates complexity of the repair, not likelihood of success. Assessment fee: from R599. up-to-3 year warranty on all repairs.
          </p>
        </div>
      </section>

      {/* ── MICROSOLDERING VS BOARD SWAP (existing section) ── */}
      <section className="py-20 bg-[#111C1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-10 text-center">
            Component-level repair vs Board Replacement
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="glass-card p-8 border-[rgba(15,234,122,0.3)]">
              <h3 className="text-[#0FEA7A] text-xl font-bold mb-4">✓ Component-level repair Repair (Our Preference)</h3>
              <ul className="space-y-3">
                {[
                  'Fixes the specific failed component only',
                  'Your original board, your data stays put',
                  '60–80% cheaper than board replacement',
                  'Preserves pairing with Touch ID / Secure Enclave',
                  'Backed by ZA Support warranty',
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
              <h3 className="text-[#7A9E98] text-xl font-bold mb-4">Board Replacement (When Necessary)</h3>
              <ul className="space-y-3">
                {[
                  'Required only when repair is not feasible',
                  'Higher cost, full board + installation',
                  'Loss of pairing on Touch ID-dependent features',
                  'Data migration required (if SSD changes)',
                  'Still includes ZA Support warranty',
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
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-4">Repair Services</h2>
          <p className="text-[#7A9E98] text-sm mb-8 max-w-2xl">
            All repairs are component-level. Final cost is confirmed after the assessment. Assessment fee: from R599.
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
          <p className="text-[#7A9E98] text-xs mt-3">Final cost depends on specific fault and model. Assessment: from R599.</p>
          <div className="rounded-xl border border-[#0FEA7A]/30 bg-[#0FEA7A]/5 p-5 mt-4">
            <p className="text-sm text-[#7A9E98]">
              💡 <strong className="text-[#E8F4F1]">Transparent assessment.</strong> from R599 to diagnose your Mac and provide a written fixed-price quote. Fee.
            </p>
          </div>

          {/* Mid-page WhatsApp CTA */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <a
              href="/api/wa?service=logic-board&page=/logic-board-repair"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 hover:shadow-[0_0_32px_rgba(15,234,122,0.4)] transition-all"
            >
              💬 WhatsApp for Assessment Quote
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
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3 text-center">
            What Our Customers Say
          </h2>
          <div className="flex items-center justify-center gap-2 mb-10">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} className="w-5 h-5 fill-[#0FEA7A] text-[#0FEA7A]" />
            ))}
            <span className="text-[#7A9E98] text-sm ml-2">4.9 average · 632 Google reviews</span>
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
          <h2 className="text-2xl font-bold text-[#E8F4F1] mb-3">Logic Board Repair by Device</h2>
          <p className="text-[#7A9E98] text-sm mb-6 max-w-2xl">
            Each Mac model has unique logic board architecture and common fault patterns. Select your device below for model-specific information.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {subPages.map((page) => (
              <Link key={page.href} href={page.href} className="glass-card p-5 flex items-center justify-between group hover:border-[rgba(15,234,122,0.3)] transition-colors">
                <div>
                  <h3 className="text-[#E8F4F1] font-bold text-sm mb-1 group-hover:text-[#0FEA7A] transition-colors">{page.title}</h3>
                  <p className="text-[#0FEA7A] text-xs font-semibold">Assessment: from R599</p>
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
          <h2 className="text-2xl font-bold text-[#E8F4F1] mb-3">Areas We Serve</h2>
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
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-4 text-center">
            Our Repair Process
          </h2>
          <p className="text-[#7A9E98] text-center text-sm mb-10 max-w-2xl mx-auto">
            We follow a clear, transparent process from the moment you contact us to the moment we hand your Mac back.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { step: '01', title: 'Assessment: from R599', body: 'Bring your Mac to our Hyde Park workshop or arrange a courier. We inspect the board under microscope and identify the fault. Fee is.' },
              { step: '02', title: 'Written Quote', body: 'You receive a clear, written quote before any work begins. No hidden fees. If you decline, the assessment fee is payable for the diagnostic completed.' },
              { step: '03', title: 'Component-level repair Repair', body: 'Our technician works at component level using professional specialist equipment. Most repairs completed in 24–72 hours.' },
              { step: '04', title: 'Tested and Warrantied', body: 'Your Mac is fully tested before collection. Every repair includes a up-to-3 year warranty. If the same fault returns, we fix it at no charge.' },
            ].map(({ step, title, body }) => (
              <div key={step} className="glass-card p-6 relative overflow-hidden">
                <span className="absolute top-4 right-4 text-[#0FEA7A] text-3xl font-extrabold opacity-20">{step}</span>
                <h3 className="text-[#E8F4F1] font-bold mb-2 text-sm">{title}</h3>
                <p className="text-[#7A9E98] text-xs leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQAccordion items={faqs} title="Logic Board Repair, Common Questions" />
        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section className="py-16 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-[rgba(39,80,77,0.3)] border border-[rgba(15,234,122,0.2)] rounded-3xl p-10">
            <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3">Logic Board Fault? Book an Assessment.</h2>
            <p className="text-[#7A9E98] mb-2">up-to-3 year warranty on all repairs. Hyde Park, Johannesburg.</p>
            <p className="text-[#7A9E98] text-sm mb-8">
              Assessment fee: from R599. Written fixed-price quote before any work begins.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/api/wa?service=logic-board&page=/logic-board-repair"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 hover:shadow-[0_0_32px_rgba(15,234,122,0.4)] transition-all"
              >
                💬 WhatsApp for Quote
              </a>
              <a href={CONTACT.booking} className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all">
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
