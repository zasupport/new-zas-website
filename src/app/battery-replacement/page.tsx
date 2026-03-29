import type { Metadata } from 'next';
import Link from 'next/link';
import { Suspense } from 'react';
import { Phone, ArrowRight, Battery, BatteryWarning, Zap, CheckCircle, Shield, Clock, MapPin, Star, AlertTriangle } from 'lucide-react';
import SchemaOrg from '@/components/seo/SchemaOrg';
import { buildFaqSchema, buildBreadcrumbSchema, LOCAL_BUSINESS_PROVIDER } from '@/lib/schema';
import GoogleReviews from '@/components/ui/GoogleReviews';
import FAQAccordion from '@/components/ui/FAQ';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { CONTACT, SITE, buildWhatsAppUrl } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'MacBook Battery Replacement Johannesburg [2026] | From R1,499 | ZA Support',
  description:
    'MacBook & iPhone battery replacement in Johannesburg from R1,499. Same-day service, up-to-3 year warranty. No Fix No Fee. Assessment from R599. Call 064 529 5863.',
  alternates: { canonical: 'https://zasupport.com/battery-replacement' },
};

/* ── Pricing Table ───────────────────────────────────────────────────────── */
const pricingTiers = [
  { device: 'MacBook Air (all models)', from: 'R1,499', turnaround: '2–4 hours', warranty: 'Up to 3 years', popular: false },
  { device: 'MacBook Pro 13″', from: 'R1,799', turnaround: '2–4 hours', warranty: 'Up to 3 years', popular: true },
  { device: 'MacBook Pro 14″ / 16″', from: 'R2,299', turnaround: '4–6 hours', warranty: 'Up to 3 years', popular: false },
  { device: 'iPhone (all models)', from: 'R899', turnaround: '30–60 min', warranty: 'Up to 12 months', popular: false },
  { device: 'iPad (all models)', from: 'R1,299', turnaround: '4–6 hours', warranty: 'Up to 12 months', popular: false },
];

/* ── Process Steps ───────────────────────────────────────────────────────── */
const processSteps = [
  { step: 1, title: 'Book & Drop Off', desc: 'WhatsApp us or walk in to our Hyde Park workshop. We will run a battery health diagnostic on the spot — no appointment necessary.' },
  { step: 2, title: 'Assessment & Quote', desc: 'We test your battery cycle count, maximum capacity, and charging circuitry. You receive a written, fixed-price quote before any work begins. Assessment from R599.' },
  { step: 3, title: 'Battery Replacement', desc: 'Our technicians remove the old battery using precision tools and adhesive solvents. The replacement cell is tested for voltage, capacity, and thermal stability before installation.' },
  { step: 4, title: 'Calibration & QA', desc: 'Full charge-discharge calibration cycle. We verify the battery reports correctly in macOS System Information, confirm MagSafe / USB-C charging, and run a thermal stress test.' },
  { step: 5, title: 'Collect with Warranty', desc: 'You collect your device with a written warranty — up to 3 years on MacBook batteries, up to 12 months on iPhone and iPad. If the battery fails within the warranty period, we replace it at no charge.' },
];

/* ── Device Compatibility Grid ───────────────────────────────────────────── */
const compatibilityGrid = [
  { category: 'MacBook Air', models: 'M1 (2020), M2 (2022), M3 (2024), 2017–2019 Retina, 2015 & earlier', notes: 'All models serviceable. M-series use adhesive cells — specialist removal required.' },
  { category: 'MacBook Pro 13″', models: 'M1/M2/M3, 2016–2020 Touch Bar, 2012–2015 Retina', notes: 'Touch Bar models require careful flex cable routing. We test Touch Bar function post-install.' },
  { category: 'MacBook Pro 14″/16″', models: 'M1 Pro/Max, M2 Pro/Max, M3 Pro/Max, M4 Pro/Max', notes: 'Larger cells, higher wattage. Turnaround 4–6 hours due to adhesive complexity.' },
  { category: 'MacBook Pro 15″', models: '2012–2019 (Retina)', notes: 'Includes top case battery on 2016+ models. We replace the battery without replacing the entire top case.' },
  { category: 'iPhone', models: 'iPhone 8 through iPhone 16 Pro Max', notes: 'Genuine-equivalent cells. Battery health reporting preserved on iOS 15.2+.' },
  { category: 'iPad', models: 'iPad Air, iPad Pro, iPad mini (2017+)', notes: 'Adhesive-mounted cells. Screen removal required — performed in dust-controlled environment.' },
];

/* ── Suburb Service Area ─────────────────────────────────────────────────── */
const suburbPages = [
  { label: 'Sandton', href: '/battery-replacement/sandton', distance: '8 min' },
  { label: 'Rosebank', href: '/battery-replacement/rosebank', distance: '5 min' },
  { label: 'Midrand', href: '/battery-replacement/midrand', distance: '30 min' },
  { label: 'Randburg', href: '/battery-replacement/randburg', distance: '15 min' },
  { label: 'Fourways', href: '/battery-replacement/fourways', distance: '25 min' },
  { label: 'Bryanston', href: '/battery-replacement/bryanston', distance: '10 min' },
  { label: 'Morningside', href: '/battery-replacement/morningside', distance: '6 min' },
  { label: 'Rivonia', href: '/battery-replacement/rivonia', distance: '12 min' },
  { label: 'Houghton', href: '/battery-replacement/houghton', distance: '10 min' },
  { label: 'Parkhurst', href: '/battery-replacement/parkhurst', distance: '12 min' },
  { label: 'Pretoria', href: '/battery-replacement/pretoria', distance: '45 min' },
  { label: 'Centurion', href: '/battery-replacement/centurion', distance: '35 min' },
];

/* ── FAQs (10 items) ─────────────────────────────────────────────────────── */
const faqs = [
  {
    question: 'How much does a MacBook battery replacement cost in Johannesburg?',
    answer: 'MacBook Air battery replacement starts from R1,499 and MacBook Pro from R1,799 at our Hyde Park workshop. This is significantly less than the Apple Store, which typically charges R3,500 to R8,000 depending on the model. Our price includes the battery, labour, calibration, and a written warranty of up to 3 years.',
  },
  {
    question: 'How long does a MacBook battery replacement take?',
    answer: 'Most MacBook battery replacements are completed within 2 to 4 hours. MacBook Pro 14-inch and 16-inch models with adhesive-mounted cells may take 4 to 6 hours. iPhone battery replacements are typically done within 30 to 60 minutes. We offer same-day service for all battery replacements booked before 14:00.',
  },
  {
    question: 'How do I know if my MacBook battery needs replacing?',
    answer: 'Check System Information > Power. If your cycle count exceeds 1,000 (or 500 on older models), or your maximum capacity is below 80%, your battery is due for replacement. Other warning signs include: the "Service Recommended" message in your menu bar, a swollen trackpad (caused by a swelling battery underneath), unexpected shutdowns at 20-40% charge, or your MacBook only working when plugged in. We see all of these daily in our workshop.',
  },
  {
    question: 'Does load shedding damage my MacBook battery?',
    answer: 'Yes, load shedding has a measurable impact on MacBook batteries. Repeated power cuts force your Mac to cycle between battery and mains power dozens of extra times per month, accelerating wear. We have seen MacBook batteries in Johannesburg reach end-of-life 12 to 18 months earlier than expected because of load shedding cycles. If you experience frequent outages, we recommend using a UPS and keeping your battery above 20% during shedding windows.',
  },
  {
    question: 'Do you use genuine Apple batteries?',
    answer: 'We use premium-grade replacement cells that match or exceed Apple OEM specifications for capacity, voltage, and thermal safety. These are the same cells used by authorised service providers globally. Each battery is tested for capacity, charge cycles, and thermal behaviour before installation. We do not use cheap aftermarket cells, which is why we can offer up to a 3-year warranty.',
  },
  {
    question: 'Will replacing my battery erase my data?',
    answer: 'No. A battery replacement does not affect your data, applications, or settings in any way. Your SSD and logic board are not touched during the procedure. We remove the bottom case, disconnect the battery connector, remove the old cells, install the new battery, and reassemble. Your Mac boots exactly as you left it.',
  },
  {
    question: 'What is your warranty on battery replacements?',
    answer: 'MacBook battery replacements carry a written warranty of up to 3 years covering the battery cell and our workmanship. iPhone and iPad battery replacements carry a warranty of up to 12 months. If the replacement battery fails within the warranty period — capacity drops below 80% or the battery develops a fault — we replace it again at no charge. The warranty is provided in writing at collection.',
  },
  {
    question: 'Can you replace the battery in a MacBook with a swollen battery?',
    answer: 'Yes, and you should have it replaced urgently. A swollen battery is a lithium cell that has begun to off-gas, which pushes against the trackpad and bottom case. Left unaddressed, it can damage the trackpad cable, warp the top case, or in rare cases pose a fire risk. We handle swollen battery removals daily. The process takes slightly longer because we need to carefully separate the expanded cells from the adhesive without puncturing them.',
  },
  {
    question: 'Why is ZA Support cheaper than the Apple Store for battery replacement?',
    answer: 'Apple charges a premium that includes their retail overhead, logistics, and the fact that they often replace additional components unnecessarily. For example, Apple replaces the entire top case assembly on many MacBook Pro models rather than just the battery. We replace only the battery cells themselves, which reduces parts cost substantially. Our Hyde Park workshop has lower overheads than a Sandton City retail unit, and we pass those savings directly to you.',
  },
  {
    question: 'Do you offer a No Fix No Fee policy on battery replacements?',
    answer: 'Yes. If we assess your device and determine that a battery replacement will not resolve your issue — for example, if the problem is actually a logic board fault causing incorrect battery readings — you pay nothing beyond the assessment fee (from R599). We will never replace a battery that does not need replacing. If the battery is the confirmed issue, the assessment fee is included in the replacement cost.',
  },
];

/* ── Structured Data ─────────────────────────────────────────────────────── */
const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'MacBook Battery Replacement Johannesburg',
  description: 'Professional MacBook, iPhone, and iPad battery replacement in Johannesburg. Same-day service from R1,499. Up-to-3 year warranty. Hyde Park workshop.',
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
    name: 'Battery Replacement Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: 'MacBook Air Battery Replacement', description: 'Same-day MacBook Air battery replacement. From R1,499. Up-to-3 year warranty.' },
        price: '1499',
        priceCurrency: 'ZAR',
      },
      {
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: 'MacBook Pro Battery Replacement', description: 'Same-day MacBook Pro battery replacement. From R1,799. Up-to-3 year warranty.' },
        price: '1799',
        priceCurrency: 'ZAR',
      },
      {
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: 'iPhone Battery Replacement', description: 'iPhone battery replacement in 30–60 minutes. From R899. Up-to-12 month warranty.' },
        price: '899',
        priceCurrency: 'ZAR',
      },
    ],
  },
};

const breadcrumbSchema = buildBreadcrumbSchema([
  { name: 'Home', url: 'https://zasupport.com' },
  { name: 'Battery Replacement', url: 'https://zasupport.com/battery-replacement' },
]);

const faqSchema = buildFaqSchema(faqs);

/* ── Page Component ──────────────────────────────────────────────────────── */
export default function BatteryReplacementPage() {
  return (
    <>
      <SchemaOrg schema={faqSchema} />
      <SchemaOrg schema={serviceSchema} />
      <SchemaOrg schema={breadcrumbSchema} />

      <main className="bg-[#0A1A18] text-[#E8F4F1] min-h-screen">
        {/* Breadcrumb */}
        <div className="max-w-6xl mx-auto px-4 pt-4">
          <Breadcrumb items={[
            { label: 'Home', href: '/' },
            { label: 'Battery Replacement', href: '/battery-replacement' },
          ]} />
        </div>

        {/* ── Hero Section ───────────────────────────────────────────────── */}
        <section className="relative py-16 sm:py-24 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 text-[#0FEA7A] text-sm font-medium mb-4">
                <Battery className="w-4 h-4" />
                <span>Battery Replacement Specialists</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
                MacBook Battery Replacement<br />
                <span className="text-[#0FEA7A]">Johannesburg</span>
              </h1>
              <p className="text-lg sm:text-xl text-[#7A9E98] mb-4 speakable-summary">
                Same-day MacBook battery replacement from <strong className="text-[#E8F4F1]">R1,499</strong> at our
                Hyde Park workshop. iPhone batteries from <strong className="text-[#E8F4F1]">R899</strong>. Up-to-3 year
                warranty on all MacBook battery replacements. No Fix No Fee.
              </p>
              <p className="text-[#7A9E98] mb-8">
                The Apple Store charges R3,500 to R8,000 for the same replacement. We fit premium-grade cells
                that match OEM specifications — at a fraction of the price.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href={buildWhatsAppUrl('BAT-HERO', 'battery')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] font-bold px-8 py-4 rounded-lg hover:bg-[#0dcc6a] transition-colors text-lg"
                >
                  <Zap className="w-5 h-5" />
                  WhatsApp Us Now
                  <ArrowRight className="w-5 h-5" />
                </a>
                <a
                  href={`tel:${CONTACT.phoneTel}`}
                  className="inline-flex items-center justify-center gap-2 border border-[#27504D] text-[#E8F4F1] font-semibold px-8 py-4 rounded-lg hover:bg-[#27504D]/20 transition-colors text-lg"
                >
                  <Phone className="w-5 h-5" />
                  {CONTACT.phone}
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── Trust Badges ───────────────────────────────────────────────── */}
        <section className="border-y border-[#27504D]/30 py-8 px-4">
          <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            {[
              { icon: Shield, label: 'Up-to-3 Year Warranty' },
              { icon: Clock, label: 'Same-Day Service' },
              { icon: Star, label: `${SITE.rating}★ (${SITE.reviewCount} Reviews)` },
              { icon: CheckCircle, label: 'No Fix No Fee' },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex flex-col items-center gap-2">
                <Icon className="w-6 h-6 text-[#0FEA7A]" />
                <span className="text-sm font-semibold text-[#E8F4F1]">{label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── Why Batteries Fail — SA Context ────────────────────────────── */}
        <section className="py-16 sm:py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-6">Why MacBook Batteries Fail Faster in South Africa</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-[#111C1A] rounded-xl p-6 border border-[#27504D]/20">
                <div className="flex items-center gap-3 mb-4">
                  <BatteryWarning className="w-6 h-6 text-[#0FEA7A]" />
                  <h3 className="text-xl font-bold">Load Shedding Impact</h3>
                </div>
                <p className="text-[#7A9E98] leading-relaxed">
                  In our Hyde Park workshop, we have replaced more MacBook batteries in the last two years than in
                  the previous five — and load shedding is the primary driver. Every time Eskom cuts power, your MacBook
                  switches from mains to battery. When power returns, it charges back up. This constant cycling — sometimes
                  four or five times per day during Stage 4 and above — burns through charge cycles at three to four times
                  the normal rate. A battery rated for 1,000 cycles can hit that threshold in 18 months instead of four years.
                  We consistently see MacBooks from Johannesburg, Sandton, and Midrand arriving with cycle counts of 800+
                  on machines that are barely two years old.
                </p>
              </div>
              <div className="bg-[#111C1A] rounded-xl p-6 border border-[#27504D]/20">
                <div className="flex items-center gap-3 mb-4">
                  <AlertTriangle className="w-6 h-6 text-[#0FEA7A]" />
                  <h3 className="text-xl font-bold">Heat & Swollen Batteries</h3>
                </div>
                <p className="text-[#7A9E98] leading-relaxed">
                  Johannesburg summers regularly push ambient temperatures above 30°C, and a MacBook under load can
                  reach internal temperatures of 95°C or more. Sustained heat accelerates lithium-ion degradation,
                  reducing maximum capacity and increasing the risk of cell swelling. A swollen battery pushes upward
                  against the trackpad — you will notice the trackpad becoming stiff or unresponsive, or the bottom case
                  no longer sitting flat. This is a safety issue. If your trackpad feels different, bring your MacBook in
                  immediately. We handle swollen battery removals daily, using specialist tools to prevent cell puncture
                  during extraction.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Pricing Table ──────────────────────────────────────────────── */}
        <section id="pricing" className="py-16 sm:py-20 px-4 bg-[#111C1A]">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">Battery Replacement Pricing</h2>
            <p className="text-[#7A9E98] mb-10 max-w-2xl">
              All prices include the battery, labour, calibration, and a written warranty. No hidden costs. Compare with
              the Apple Store, which charges R3,500 to R8,000 for the same service.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-[#27504D]/40">
                    <th className="py-4 pr-6 text-[#7A9E98] font-semibold text-sm uppercase tracking-wider">Device</th>
                    <th className="py-4 pr-6 text-[#7A9E98] font-semibold text-sm uppercase tracking-wider">From</th>
                    <th className="py-4 pr-6 text-[#7A9E98] font-semibold text-sm uppercase tracking-wider hidden sm:table-cell">Turnaround</th>
                    <th className="py-4 text-[#7A9E98] font-semibold text-sm uppercase tracking-wider hidden sm:table-cell">Warranty</th>
                  </tr>
                </thead>
                <tbody>
                  {pricingTiers.map((tier) => (
                    <tr key={tier.device} className={`border-b border-[#27504D]/20 ${tier.popular ? 'bg-[#0FEA7A]/5' : ''}`}>
                      <td className="py-4 pr-6 font-semibold">
                        {tier.device}
                        {tier.popular && <span className="ml-2 text-xs bg-[#0FEA7A] text-[#0A1A18] px-2 py-0.5 rounded-full font-bold">Most Popular</span>}
                      </td>
                      <td className="py-4 pr-6 text-[#0FEA7A] font-bold text-lg">{tier.from}</td>
                      <td className="py-4 pr-6 text-[#7A9E98] hidden sm:table-cell">{tier.turnaround}</td>
                      <td className="py-4 text-[#7A9E98] hidden sm:table-cell">{tier.warranty}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-[#7A9E98] text-sm mt-6">
              Assessment fee from R599. If you proceed with the replacement, the assessment fee is included in the total cost.
              All prices are in ZAR and include VAT.
            </p>
          </div>
        </section>

        {/* ── Our Process ────────────────────────────────────────────────── */}
        <section className="py-16 sm:py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-10">How Our Battery Replacement Works</h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {processSteps.map((s) => (
                <div key={s.step} className="bg-[#111C1A] rounded-xl p-6 border border-[#27504D]/20 relative">
                  <div className="absolute -top-3 -left-3 w-10 h-10 rounded-full bg-[#0FEA7A] text-[#0A1A18] flex items-center justify-center font-extrabold text-lg">
                    {s.step}
                  </div>
                  <h3 className="text-xl font-bold mt-4 mb-3">{s.title}</h3>
                  <p className="text-[#7A9E98] leading-relaxed text-sm">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Device Compatibility Grid ──────────────────────────────────── */}
        <section className="py-16 sm:py-20 px-4 bg-[#111C1A]">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">Devices We Service</h2>
            <p className="text-[#7A9E98] mb-10 max-w-2xl">
              We replace batteries in every MacBook, iPhone, and iPad model from 2012 to the current M4 generation.
              If your device is not listed below, <a href={buildWhatsAppUrl('BAT-COMPAT', 'battery')} target="_blank" rel="noopener noreferrer" className="text-[#0FEA7A] underline hover:no-underline">WhatsApp us</a> and
              we will confirm compatibility.
            </p>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {compatibilityGrid.map((item) => (
                <div key={item.category} className="bg-[#0A1A18] rounded-xl p-6 border border-[#27504D]/20">
                  <h3 className="text-lg font-bold text-[#0FEA7A] mb-2">{item.category}</h3>
                  <p className="text-sm text-[#E8F4F1] font-medium mb-2">{item.models}</p>
                  <p className="text-sm text-[#7A9E98] leading-relaxed">{item.notes}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Warranty Information ────────────────────────────────────────── */}
        <section className="py-16 sm:py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="bg-[#111C1A] rounded-2xl p-8 sm:p-12 border border-[#27504D]/20">
              <div className="flex items-center gap-3 mb-6">
                <Shield className="w-8 h-8 text-[#0FEA7A]" />
                <h2 className="text-3xl sm:text-4xl font-extrabold">Our Battery Warranty</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold mb-3 text-[#0FEA7A]">MacBook — Up to 3 Years</h3>
                  <p className="text-[#7A9E98] leading-relaxed mb-4">
                    Every MacBook battery replacement includes a written warranty of up to 3 years. This covers the
                    battery cell and our workmanship. If your replacement battery drops below 80% maximum capacity or
                    develops any fault within the warranty period, we replace it again at no charge — parts and labour
                    included.
                  </p>
                  <p className="text-[#7A9E98] leading-relaxed">
                    We can offer this because we use premium-grade cells and we stand behind our work. Most third-party
                    repair shops in Johannesburg offer 90 days. The Apple Store offers 90 days on out-of-warranty
                    replacements. We offer up to 3 years.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-3 text-[#0FEA7A]">iPhone & iPad — Up to 12 Months</h3>
                  <p className="text-[#7A9E98] leading-relaxed mb-4">
                    iPhone and iPad battery replacements carry a written warranty of up to 12 months. The same principle
                    applies: if the battery fails within the warranty period, we replace it at no charge. We test every
                    iPhone battery for capacity and thermal stability before fitting it.
                  </p>
                  <h3 className="text-xl font-bold mb-3 mt-6 text-[#0FEA7A]">No Fix No Fee</h3>
                  <p className="text-[#7A9E98] leading-relaxed">
                    If we determine that your battery is not the issue — for instance, if a{' '}
                    <Link href="/logic-board-repair" className="text-[#0FEA7A] underline hover:no-underline">logic board fault</Link>{' '}
                    is causing incorrect battery readings — you pay nothing beyond the assessment fee. We will never
                    replace a component that does not need replacing.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Why Choose ZA Support ──────────────────────────────────────── */}
        <section className="py-16 sm:py-20 px-4 bg-[#111C1A]">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-10">Why Johannesburg Chooses ZA Support</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: 'Apple Store: R3,500–R8,000',
                  desc: 'The Apple Store in Sandton City charges R3,500 for a MacBook Air battery and up to R8,000 for a MacBook Pro 16-inch. They also replace the entire top case on most models, adding unnecessary cost. We replace only the battery cells — same result, fraction of the price.',
                },
                {
                  title: '16 Years of Experience',
                  desc: `We have been repairing Apple devices in Johannesburg since 2009. That is over ${SITE.yearsExperience} years of battery replacements, logic board repairs, and liquid damage recovery. We have seen every model, every fault, and every corner case.`,
                },
                {
                  title: 'Same-Day Turnaround',
                  desc: 'Walk into our Hyde Park workshop before 14:00 and collect your MacBook with a new battery the same afternoon. No shipping your device off-site. No waiting two weeks. Your data stays local and secure throughout.',
                },
                {
                  title: 'Load Shedding Expertise',
                  desc: 'We understand the unique strain that Eskom puts on Apple devices. We advise on UPS solutions, battery management settings, and macOS power configuration to maximise your new battery lifespan between load shedding stages.',
                },
                {
                  title: 'Transparent Pricing',
                  desc: 'You receive a written, fixed-price quote before any work begins. The quote is the final price — no surprises, no hidden charges, no "we found something else" upsells. Assessment from R599, included in the repair cost if you proceed.',
                },
                {
                  title: 'Central Location',
                  desc: `Our workshop is at ${CONTACT.address.full}. We are 5 minutes from Rosebank, 8 minutes from Sandton, 10 minutes from Bryanston, and easily accessible from the M1 and N1. Free parking available on-site.`,
                },
              ].map((item) => (
                <div key={item.title} className="bg-[#0A1A18] rounded-xl p-6 border border-[#27504D]/20">
                  <h3 className="text-lg font-bold mb-3">{item.title}</h3>
                  <p className="text-[#7A9E98] leading-relaxed text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Related Repairs ────────────────────────────────────────────── */}
        <section className="py-16 sm:py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-8">Related Apple Repair Services</h2>
            <p className="text-[#7A9E98] mb-8 max-w-2xl">
              Battery issues sometimes overlap with other faults. If your MacBook is not charging, it could be a
              battery issue, a <Link href="/logic-board-repair" className="text-[#0FEA7A] underline hover:no-underline">logic board fault</Link>,
              or damage from a <Link href="/liquid-damage" className="text-[#0FEA7A] underline hover:no-underline">liquid spill</Link>.
              We diagnose the root cause before recommending any repair.
            </p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { title: 'Logic Board Repair', href: '/logic-board-repair', desc: 'Component-level board repair for no-power, no-display, USB-C faults' },
                { title: 'Liquid Damage Repair', href: '/liquid-damage', desc: 'Ultrasonic cleaning and board-level component replacement' },
                { title: 'MacBook Repair', href: '/macbook-repair', desc: 'All MacBook repairs — keyboard, screen, SSD, RAM upgrades' },
                { title: 'Contact Us', href: '/contact', desc: 'Book an assessment or get a quote for any Apple device' },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="bg-[#111C1A] rounded-xl p-6 border border-[#27504D]/20 hover:border-[#0FEA7A]/40 transition-colors group"
                >
                  <h3 className="text-lg font-bold mb-2 group-hover:text-[#0FEA7A] transition-colors">{link.title}</h3>
                  <p className="text-sm text-[#7A9E98]">{link.desc}</p>
                  <ArrowRight className="w-4 h-4 text-[#0FEA7A] mt-3" />
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── Suburb Service Areas ───────────────────────────────────────── */}
        <section className="py-16 sm:py-20 px-4 bg-[#111C1A]">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">Battery Replacement Near You</h2>
            <p className="text-[#7A9E98] mb-8">
              We service all suburbs within 25 km of our Hyde Park workshop, plus Pretoria and Centurion. Click your area for local details.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {suburbPages.map((s) => (
                <Link
                  key={s.href}
                  href={s.href}
                  className="flex items-center justify-between bg-[#0A1A18] rounded-lg px-4 py-3 border border-[#27504D]/20 hover:border-[#0FEA7A]/40 transition-colors group"
                >
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#0FEA7A]" />
                    <span className="font-semibold text-sm group-hover:text-[#0FEA7A] transition-colors">{s.label}</span>
                  </div>
                  <span className="text-xs text-[#7A9E98]">{s.distance}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── Google Reviews ─────────────────────────────────────────────── */}
        <section className="py-16 sm:py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-8">What Our Customers Say</h2>
            <Suspense fallback={<div className="h-48 bg-[#111C1A] rounded-xl animate-pulse" />}>
              <GoogleReviews />
            </Suspense>
          </div>
        </section>

        {/* ── FAQ Section ────────────────────────────────────────────────── */}
        <section className="py-16 sm:py-20 px-4 bg-[#111C1A]">
          <div className="max-w-4xl mx-auto">
            <FAQAccordion items={faqs} title="Battery Replacement — Frequently Asked Questions" />
          </div>
        </section>

        {/* ── Bottom CTA ─────────────────────────────────────────────────── */}
        <section className="py-16 sm:py-24 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-6">
              Ready for a New Battery?
            </h2>
            <p className="text-lg text-[#7A9E98] mb-4 max-w-2xl mx-auto">
              WhatsApp us your MacBook model and we will reply with a fixed-price quote within minutes.
              Same-day service available for walk-ins before 14:00. No appointment necessary.
            </p>
            <p className="text-[#7A9E98] mb-8">
              <MapPin className="w-4 h-4 inline-block mr-1 text-[#0FEA7A]" />
              {CONTACT.address.full} &bull; {CONTACT.hours.weekdays}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={buildWhatsAppUrl('BAT-BOTTOM', 'battery')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] font-bold px-10 py-4 rounded-lg hover:bg-[#0dcc6a] transition-colors text-lg"
              >
                <Zap className="w-5 h-5" />
                Get a Quote on WhatsApp
                <ArrowRight className="w-5 h-5" />
              </a>
              <a
                href={`tel:${CONTACT.phoneTel}`}
                className="inline-flex items-center justify-center gap-2 border border-[#27504D] text-[#E8F4F1] font-semibold px-10 py-4 rounded-lg hover:bg-[#27504D]/20 transition-colors text-lg"
              >
                <Phone className="w-5 h-5" />
                Call {CONTACT.phone}
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
