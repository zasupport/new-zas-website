import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, ArrowRight, Battery, BatteryWarning, Zap, CheckCircle, Shield, AlertTriangle, Smartphone, Clock } from 'lucide-react';
import SchemaOrg from '@/components/seo/SchemaOrg';
import { buildFaqSchema, buildBreadcrumbSchema, LOCAL_BUSINESS_PROVIDER } from '@/lib/schema';
import GoogleReviews from '@/components/ui/GoogleReviews';
import FAQAccordion from '@/components/ui/FAQ';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { CONTACT, SITE, buildWhatsAppUrl } from '@/lib/constants';
import PricingNote from '@/components/PricingNote';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'iPhone Battery Replacement Johannesburg [2026] | From R899 | ZA Support',
  description:
    'iPhone battery replacement in Johannesburg from R899. Same-day service, IP68 re-sealed, battery health restored. Hyde Park workshop. Call 064 529 5863.',
  alternates: { canonical: 'https://zasupport.com/battery-replacement/iphone' },
  keywords: [
    'iPhone battery replacement Johannesburg',
    'iPhone battery replacement Hyde Park',
    'iPhone battery replacement cost South Africa',
    'iPhone battery draining fast repair Johannesburg',
    'iPhone 15 battery replacement Johannesburg',
    'iPhone 16 Pro Max battery replacement',
    'iPhone battery health below 80 repair',
    'iPhone throttling slow battery fix Johannesburg',
    'same day iPhone battery replacement Johannesburg',
    'iPhone battery replacement from R899',
  ],
};

const breadcrumbItems = [
  { label: 'Battery Replacement', href: '/battery-replacement' },
  { label: 'iPhone' },
];

const breadcrumbSchemaItems = [
  { name: 'Home', url: 'https://zasupport.com' },
  { name: 'Battery Replacement', url: 'https://zasupport.com/battery-replacement' },
  { name: 'iPhone Battery Replacement', url: 'https://zasupport.com/battery-replacement/iphone' },
];

const pricingTiers = [
  {
    range: 'iPhone 8, SE (2nd & 3rd gen)',
    price: 'From R899',
    chemistry: 'Li-Ion 1,821–2,018 mAh',
    note: 'Adhesive pull tabs; straightforward access',
    turnaround: '30–60 min',
  },
  {
    range: 'iPhone X, XS, XS Max',
    price: 'From R999',
    chemistry: 'Li-Ion 2,658–3,174 mAh',
    note: 'OLED display removal required; Face ID flex handled with care',
    turnaround: '60–90 min',
  },
  {
    range: 'iPhone 11, 11 Pro, 11 Pro Max',
    price: 'From R1,099',
    chemistry: 'Li-Ion 3,110–3,969 mAh',
    note: 'Triple camera cable routing; gasket re-sealed post-install',
    turnaround: '60–90 min',
  },
  {
    range: 'iPhone 12, 12 Mini, 12 Pro, 12 Pro Max',
    price: 'From R1,099',
    chemistry: 'Li-Ion 2,227–3,687 mAh',
    note: 'MagSafe alignment verified post-install',
    turnaround: '60–90 min',
  },
  {
    range: 'iPhone 13, 13 Mini, 13 Pro, 13 Pro Max',
    price: 'From R1,099',
    chemistry: 'Li-Ion 2,438–4,352 mAh',
    note: 'Larger cells than iPhone 12; adhesive tabs extend under logic board',
    turnaround: '90 min',
  },
  {
    range: 'iPhone 14, 14 Plus',
    price: 'From R1,099',
    chemistry: 'Li-Ion 3,279–4,323 mAh',
    note: 'Easier rear-access design; faster disassembly',
    turnaround: '60–90 min',
  },
  {
    range: 'iPhone 14 Pro, 14 Pro Max',
    price: 'From R1,299',
    chemistry: 'Li-Ion 3,200–4,323 mAh',
    note: 'Dynamic Island flex cable routing; Always-On display re-verified',
    turnaround: '90 min',
  },
  {
    range: 'iPhone 15, 15 Plus',
    price: 'From R1,499',
    chemistry: 'Li-Ion 3,349–4,383 mAh',
    note: 'USB-C connector; titanium frame requires adjusted tooling',
    turnaround: '90–120 min',
  },
  {
    range: 'iPhone 15 Pro, 15 Pro Max',
    price: 'From R1,499',
    chemistry: 'Li-Ion 3,274–4,422 mAh',
    note: 'Action button cable routing; titanium chassis',
    turnaround: '90–120 min',
  },
  {
    range: 'iPhone 16, 16 Plus',
    price: 'From R1,499',
    chemistry: 'Li-Ion 3,561–4,685 mAh',
    note: 'Camera Control button; Apple Intelligence unaffected',
    turnaround: '90–120 min',
  },
  {
    range: 'iPhone 16 Pro, 16 Pro Max',
    price: 'From R1,499',
    chemistry: 'Li-Ion 3,582–4,685 mAh',
    note: 'Latest teardown complexity; precision adhesive routing',
    turnaround: '120 min',
  },
];

const technicalPoints = [
  {
    title: 'Lithium-Ion Cell Chemistry and Why It Degrades',
    body: 'Every iPhone battery is a lithium-ion cell — lithium ions shuttle between the anode and cathode during charge and discharge cycles, creating the current that powers your device. Over time, the graphite anode develops a thin layer of solid electrolyte interphase (SEI) material that reduces the number of active lithium ions available. By around 500 charge cycles, most iPhone batteries have dropped below 80% of their original capacity. iOS begins applying performance throttling at that point to prevent unexpected shutdowns. We replace the cell entirely — there is no reconditioning option for lithium chemistry.',
    icon: Battery,
  },
  {
    title: 'Adhesive Pull Tabs and Safe Removal',
    body: 'Apple mounts iPhone batteries using stretch-release adhesive pull tabs — thin strips of adhesive that can be pulled at a low angle to detach the cell from the rear case without solvents. On iPhone 8 through to iPhone 14 Plus, there are typically two or four tabs depending on the model. On iPhone 13 and later, the adhesive extends underneath the logic board bracket, requiring the board to be partially lifted before the tabs can be accessed. Forcing the battery out without releasing these tabs risks bending the logic board or tearing the cell casing. We release every tab correctly before the battery is lifted.',
    icon: CheckCircle,
  },
  {
    title: 'IP68 Gasket Replacement After Opening',
    body: 'iPhones from iPhone 7 onwards carry an IP rating for water and dust resistance. This rating depends on an adhesive gasket that runs around the perimeter of the display assembly. Every time an iPhone is opened — for any repair, including battery replacement — this gasket is broken. We replace the gasket with fresh adhesive material rated to the original specification. We cannot guarantee the same official IP68 rating that Apple certifies in controlled factory conditions, but our re-seal provides meaningful protection against splashes and brief submersion. We are transparent about this limitation with every customer.',
    icon: Shield,
  },
  {
    title: 'Battery Health Reporting and iOS Throttling',
    body: 'From iOS 11.3 onwards, Apple introduced a feature called Performance Management that throttles CPU and GPU performance when the battery cannot deliver peak current. The threshold is 80% maximum capacity. Below this point, iOS automatically reduces peak performance to prevent the device from shutting down unexpectedly during demanding tasks. Many customers notice their iPhone becoming inexplicably slow before the battery shows any warning. After a battery replacement, iOS recalibrates the battery health percentage over 2 to 3 charge cycles. The throttling is removed as soon as iOS verifies the new battery health exceeds 80%. We verify this before returning your device.',
    icon: Zap,
  },
];

const faqs = [
  {
    question: 'How much does iPhone battery replacement cost in Johannesburg?',
    answer:
      'iPhone battery replacement at ZA Support starts from R899 for iPhone 8 and SE models. iPhone 12 to 14 series replacements start from R1,099. iPhone 15 and 16 Pro Max replacements start from R1,499. All prices include the battery cell, labour, IP68 gasket re-seal, and our 12-month warranty. Compare this to the Apple Store, which charges between R1,799 and R3,500 for the same models depending on whether you hold AppleCare+.',
  },
  {
    question: 'How do I know if my iPhone battery needs replacing?',
    answer:
      'The most reliable indicator is Battery Health in Settings > Battery > Battery Health & Charging. If your maximum capacity is below 80%, iOS has already begun throttling your CPU to compensate. Other signs include: your phone shutting down unexpectedly at 20–40% charge; the battery draining from 100% to under 30% in less than four hours of moderate use; your iPhone running noticeably warmer than usual; or a "Service Recommended" message appearing under Battery Health. We see all of these daily in our Hyde Park workshop.',
  },
  {
    question: 'Does iPhone battery replacement affect Face ID or Touch ID?',
    answer:
      'No — when the repair is done correctly. Face ID is paired to the TrueDepth camera module and the Secure Enclave on your specific iPhone, not to the battery. During a battery replacement, we do not disconnect the Face ID flex cable on models that do not require it. On models where the display must be partially lifted to access the adhesive tabs, we disconnect the minimum number of connectors and reconnect each one with care. We have not had a Face ID failure caused by a battery replacement in our workshop.',
  },
  {
    question: 'How long does iPhone battery replacement take?',
    answer:
      'iPhone 8 and SE battery replacements take 30 to 60 minutes. iPhone 11 through 14 series repairs take 60 to 90 minutes due to additional adhesive complexity. iPhone 15 and 16 series repairs take 90 to 120 minutes. All of these are same-day repairs — bring your phone in before noon at our Hyde Park workshop and it will be ready the same afternoon. We do not hold phones overnight for a battery replacement unless parts need to be ordered.',
  },
  {
    question: 'Will iOS still show 100% battery health after replacement?',
    answer:
      'Yes — iOS recalibrates battery health over 2 to 3 full charge cycles after a replacement. Initially you may see 99% or even a temporary message prompting you to complete a cycle. After 2 to 3 full charge-discharge cycles, the health percentage will stabilise at 100% (or close to it). This is normal and expected. We explain this to every customer so they are not concerned when they first check Battery Health after collection.',
  },
  {
    question: 'Do you cover iPhone 8 through iPhone 16 Pro Max?',
    answer:
      'Yes. We replace batteries in every iPhone model from iPhone 8 through to iPhone 16 Pro Max. This includes the full SE lineup (2nd and 3rd generation), all iPhone X and XS models, iPhone 11 through 14 series including Mini and Plus variants, and the full iPhone 15 and 16 range. If you have an older model — iPhone 7 or earlier — contact us and we will advise whether parts are still available.',
  },
  {
    question: 'Is the iPhone battery replacement covered by a warranty?',
    answer:
      'Yes. Every iPhone battery replacement at ZA Support includes a 12-month written warranty covering the battery cell and our workmanship. If the replacement battery develops a fault — capacity drops below 80% within the warranty period, charging irregularities, or a manufacturing defect — we replace it again at from R599. The warranty is provided in writing at the time of collection. It covers parts and labour and does not cover subsequent physical damage or liquid ingress.',
  },
  {
    question: 'Does battery replacement void my iPhone warranty with Apple?',
    answer:
      'A third-party battery replacement may affect Apple\'s remaining warranty on the battery component specifically. Under South African Consumer Protection Act provisions, it does not void warranty on unrelated components such as the screen, camera, or logic board. From iOS 15.2 onwards, Apple may show a "battery is unable to be verified" notice in Settings if a non-Apple sourced cell is used. This is a software notification and does not affect any iPhone function — it can typically be dismissed and does not recur. We are transparent about this before starting work.',
  },
  {
    question: 'My iPhone is slow — could the battery be causing it?',
    answer:
      'Almost certainly, if your battery health is below 80%. Apple\'s Performance Management feature, introduced in iOS 11.3 in response to user complaints about unexpected shutdowns, throttles CPU and GPU performance automatically when the battery cannot sustain peak current draw. This makes the phone feel sluggish across all apps — not just demanding ones. Many iPhone users who visit us expecting a software fault discover the root cause is a degraded battery. After replacement, performance returns to normal as soon as iOS recalibrates the health percentage.',
  },
  {
    question: 'Is it worth replacing the battery on an older iPhone?',
    answer:
      'For iPhone 12 and newer — almost always yes. These devices receive iOS updates for several more years, the cameras remain competitive, and a R1,099 battery replacement can extend the device\'s useful life by two to three years. For iPhone 8 and SE, it depends on the device condition. If the screen and logic board are in good shape, a R899 battery replacement is a sound investment. We will give you an honest assessment of the device\'s overall condition before quoting — we will not recommend a replacement on a phone that has other hardware problems that would make the repair uneconomical.',
  },
  {
    question: 'Do you repair iPhone batteries at Sandton or do I need to visit Hyde Park?',
    answer:
      'Our workshop is in Hyde Park, approximately 8 minutes from Sandton\'s CBD. We also offer a daily collection and return service across Johannesburg — Sandton, Rosebank, Bryanston, Fourways, and Midrand. Contact us on WhatsApp to arrange a same-day or next-day collection. We also have a dedicated battery replacement page for Sandton clients at zasupport.com/battery-replacement/sandton. For Pretoria and Centurion, we offer next-day collection.',
  },
];

const faqSchema = buildFaqSchema(faqs);

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'iPhone Battery Replacement Johannesburg',
  description:
    'Professional iPhone battery replacement in Johannesburg. Lithium-ion cell replacement for iPhone 8 through 16 Pro Max. IP68 re-sealed, battery health restored. Same-day repair from R899 at Hyde Park workshop.',
  provider: LOCAL_BUSINESS_PROVIDER,
  areaServed: [
    { '@type': 'City', name: 'Johannesburg' },
    { '@type': 'Neighborhood', name: 'Hyde Park' },
    { '@type': 'Neighborhood', name: 'Sandton' },
    { '@type': 'Neighborhood', name: 'Rosebank' },
  ],
  offers: {
    '@type': 'Offer',
    priceCurrency: 'ZAR',
    price: '899',
    priceSpecification: {
      '@type': 'PriceSpecification',
      minPrice: '899',
      maxPrice: '1499',
      priceCurrency: 'ZAR',
    },
  },
};

const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbSchemaItems);

export default function BatteryReplacementIphonePage() {
  const whatsappUrl = buildWhatsAppUrl('BAT-IPHONE-HERO', 'battery');

  return (
    <>
      <SchemaOrg schema={faqSchema} />
      <SchemaOrg schema={serviceSchema} />
      <SchemaOrg schema={breadcrumbSchema} />

      {/* Hero */}
      <section className="hero-gradient grid-overlay pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={breadcrumbItems} />
          <div className="mt-8 max-w-4xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#E8F4F1] leading-tight mb-6">
              iPhone Battery Replacement
              <br />
              <span className="text-[#0FEA7A]">Johannesburg</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-4 max-w-3xl leading-relaxed">
              We replace more iPhone batteries than any other repair in our Hyde Park workshop. The most common trigger is a phone that has started throttling — the owner notices it feels slower, checks Battery Health, and finds 74% or below. A new lithium-ion cell removes the throttle entirely and restores full performance within two charge cycles.
            </p>
            <p className="text-[#7A9E98] mb-8 max-w-3xl leading-relaxed text-base">
              From R899. iPhone 8 through 16 Pro Max covered. Same-day service. IP68 gasket replaced as standard. 12-month written warranty. No appointment necessary — walk in to Hyde Park or WhatsApp us first.
            </p>
            <div className="flex flex-wrap gap-3 mb-8">
              {[
                { icon: Battery, label: 'From R899' },
                { icon: CheckCircle, label: 'IP68 Re-Sealed' },
                { icon: Smartphone, label: 'iPhone 8–16 Pro Max' },
                { icon: Clock, label: '30–120 Min Service' },
                { icon: Shield, label: '12-Month Warranty' },
              ].map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-2 bg-[rgba(15,234,122,0.08)] border border-[rgba(15,234,122,0.15)] px-3 py-2 rounded-full"
                >
                  <Icon className="w-4 h-4 text-[#0FEA7A]" />
                  <span className="text-[#E8F4F1] text-sm font-medium">{label}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 hover:shadow-[0_0_32px_rgba(15,234,122,0.4)] transition-all"
              >
                WhatsApp for a Quote
              </a>
              <a
                href={`tel:${CONTACT.phoneTel}`}
                className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all"
              >
                <Phone className="w-5 h-5" /> Call {CONTACT.phone}
              </a>
              <Link
                href="/battery-replacement"
                className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.2)] text-[#7A9E98] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[rgba(15,234,122,0.05)] transition-all"
              >
                All Battery Repairs <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
            <div className="flex flex-wrap gap-6 mt-8 pt-6 border-t border-[rgba(255,255,255,0.06)]">
              {[
                { value: '400+', label: 'iPhone Batteries Replaced' },
                { value: SITE.yearsExperience + ' Years', label: 'Apple Specialists Since 2009' },
                { value: SITE.rating + '/5', label: SITE.reviewCount + ' Google Reviews' },
                { value: 'Same Day', label: 'For All iPhone Models' },
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

      {/* Pricing Table */}
      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-3">
            iPhone Battery Replacement Pricing
          </h2>
          <p className="text-[#7A9E98] mb-3 max-w-3xl leading-relaxed">
            All prices include the replacement lithium-ion cell, labour, IP68 adhesive gasket re-seal, and our 12-month written warranty. The Apple Store charges R1,799 to R3,500 for the same models without AppleCare+ — our pricing represents a saving of 40–60% on every replacement.
          </p>
          <p className="text-[#7A9E98] mb-10 max-w-3xl leading-relaxed text-sm">
            For South African short-term insurance holders: battery degradation is typically excluded from accidental damage cover. Paying for the repair directly is the only practical route — and at these prices, it is by far the most economical option compared to an upgrade.
          </p>
          <div className="overflow-x-auto rounded-2xl border border-[rgba(15,234,122,0.12)]">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[rgba(15,234,122,0.12)] bg-[rgba(15,234,122,0.05)]">
                  <th className="text-left px-5 py-3 text-[#E8F4F1] font-semibold">Model</th>
                  <th className="text-left px-5 py-3 text-[#E8F4F1] font-semibold">Price</th>
                  <th className="text-left px-5 py-3 text-[#E8F4F1] font-semibold hidden sm:table-cell">Cell Capacity</th>
                  <th className="text-left px-5 py-3 text-[#E8F4F1] font-semibold hidden md:table-cell">Notes</th>
                  <th className="text-left px-5 py-3 text-[#E8F4F1] font-semibold">Turnaround</th>
                </tr>
              </thead>
              <tbody>
                {pricingTiers.map((row, i) => (
                  <tr
                    key={row.range}
                    className={`border-b border-[rgba(255,255,255,0.04)] ${i % 2 === 0 ? 'bg-transparent' : 'bg-[rgba(15,234,122,0.02)]'}`}
                  >
                    <td className="px-5 py-3 text-[#E8F4F1] font-medium">{row.range}</td>
                    <td className="px-5 py-3 text-[#0FEA7A] font-bold">{row.price}</td>
                    <td className="px-5 py-3 text-[#7A9E98] hidden sm:table-cell">{row.chemistry}</td>
                    <td className="px-5 py-3 text-[#7A9E98] hidden md:table-cell text-xs">{row.note}</td>
                    <td className="px-5 py-3 text-[#7A9E98]">{row.turnaround}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-[#7A9E98] text-xs mt-4">
            Prices are indicative and confirmed in writing before any work begins. Assessment from R599 applies where diagnosis is required before a quote can be given.
          </p>
          <PricingNote variant="inline" />
        </div>
      </section>

      {/* Technical Detail */}
      <section className="py-10 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4">
            What Makes iPhone Battery Replacement Technical
          </h2>
          <p className="text-[#7A9E98] mb-10 max-w-3xl leading-relaxed">
            An iPhone battery replacement is not simply swapping a cell. Apple has integrated the battery into a tightly packed chassis with adhesive pull tabs, routed cables, and an IP seal that must be properly restored. Here is what we pay attention to that cheaper repairs miss.
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {technicalPoints.map((point) => (
              <div
                key={point.title}
                className="rounded-2xl border border-[rgba(15,234,122,0.15)] bg-[rgba(15,234,122,0.03)] p-6"
              >
                <div className="flex items-start gap-4 mb-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-[rgba(15,234,122,0.1)] flex items-center justify-center">
                    <point.icon className="w-5 h-5 text-[#0FEA7A]" />
                  </div>
                  <h3 className="text-[#E8F4F1] font-bold text-lg leading-snug">{point.title}</h3>
                </div>
                <p className="text-[#7A9E98] text-sm leading-relaxed">{point.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Body Copy — Process & Context */}
      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4">
            iPhone Battery Replacement in Our Hyde Park Workshop
          </h2>
          <div className="space-y-5 text-[#7A9E98] leading-relaxed">
            <p>
              In our Hyde Park workshop, iPhone battery replacements are the single most common repair we perform — accounting for roughly 40% of all iPhone work. The pattern is consistent: a customer notices their iPhone 12 or 13 running noticeably slower than it used to, opens Battery Health for the first time, and finds a reading of 71% or 76%. At that point, iOS has already been throttling the CPU for weeks or months. A replacement battery, properly installed, removes the throttle entirely within two to three charge cycles.
            </p>
            <p>
              We stock cells for every iPhone from 8 through to 16 Pro Max. For the most common models — iPhone 12, 13, and 14 series — we have cells in-house and can complete the replacement in 60 to 90 minutes. For iPhone 15 and 16 Pro Max, which use the newest generation cells and are the most demanding from a disassembly standpoint, we recommend arriving before noon for a same-day turnaround. We will tell you the realistic completion time when you contact us — we do not hold phones overnight for a battery replacement without giving you a specific collection time.
            </p>
            <p>
              The replacement process is methodical. We first run a battery diagnostic using professional tools to confirm the capacity reading, cycle count, and whether the charging circuitry (PMIC) is functioning correctly. A low battery health reading can occasionally be caused by a faulty charge controller rather than the cell itself — if that is the case, we tell you before touching anything. Once the battery is confirmed as the fault, we provide a written, fixed-price quote.
            </p>
            <p>
              Disassembly begins with softening the display adhesive using a controlled heat plate at around 80°C, then carefully separating the display from the chassis using precision picks. On iPhone 13 models, the adhesive pull tabs extend underneath the logic board bracket, which must be partially lifted to allow the tabs to be pulled at the correct angle. This is where shortcuts cause damage — forcing the tabs without lifting the bracket risks tearing the Taptic Engine connector or bending the logic board. We take the extra five minutes to do it properly.
            </p>
            <p>
              Once the old cell is removed, the replacement is installed, the pull tabs are positioned correctly, and the battery connector is seated and torqued to specification. We then refit the IP68 gasket around the display perimeter and seal the phone. Before returning the device, we complete a full function check: battery percentage accuracy, charging from both USB-C and wireless where applicable, MagSafe alignment on iPhone 12 and later, Face ID or Touch ID, screen touch responsiveness, and volume rocker function. The phone is not returned until every check passes.
            </p>
            <p>
              One practical note for Johannesburg customers: load shedding accelerates iPhone battery degradation. Repeated power cuts force your iPhone to cycle between mains charging and battery discharge multiple times per day — far more than the normal usage pattern the cell is rated for. We have seen iPhone batteries in Johannesburg reach below 80% capacity within 18 months of purchase, compared to the 2 to 3 years Apple typically projects. If you experience frequent outages, keeping your battery between 20% and 80% during shedding windows reduces SEI layer buildup and extends cell life.
            </p>
            <p>
              For clients in Sandton, Rosebank, Bryanston, or Fourways who cannot easily get to Hyde Park, contact us on WhatsApp to arrange a collection. We collect daily across Johannesburg and can usually collect and return within the same business day for all common iPhone models. For clients in Pretoria or Centurion, next-day collection and return is standard.
            </p>
            <p>
              Apple&rsquo;s own documentation on{' '}
              <a
                href="https://support.apple.com/en-gb/108049"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#0FEA7A] hover:underline"
              >
                iPhone battery and performance
              </a>{' '}
              provides useful context on when Apple considers a battery to be at end-of-life and how Performance Management operates — recommended reading if you are deciding between repair and upgrade.
            </p>
          </div>
        </div>
      </section>

      {/* Apple vs ZA Support Comparison */}
      <section className="py-10 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-4">
            Apple Store vs ZA Support: iPhone Battery Replacement
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            <div className="glass-card p-6 border border-red-500/20">
              <h3 className="text-red-400 font-bold mb-3">Apple Store / iStore</h3>
              <ul className="text-[#7A9E98] text-sm space-y-2">
                <li>iPhone 15 Pro battery: R3,500 out of warranty</li>
                <li>iPhone 12: R1,799 out of warranty</li>
                <li>Turnaround: 1–3 business days in most cases</li>
                <li>AppleCare+ required for reduced pricing</li>
                <li>Walk-in availability varies; appointments often 48 hrs out</li>
              </ul>
            </div>
            <div className="glass-card p-6 border border-[rgba(15,234,122,0.3)]">
              <h3 className="text-[#0FEA7A] font-bold mb-3">ZA Support</h3>
              <ul className="text-[#7A9E98] text-sm space-y-2">
                <li>iPhone 15 Pro from R1,499 | iPhone 12 from R1,099</li>
                <li>Same-day repair for all models</li>
                <li>12-month written warranty on battery and workmanship</li>
                <li>IP68 gasket replaced | Battery health recalibrated</li>
                <li>Collection across Johannesburg — no travel needed</li>
              </ul>
            </div>
          </div>
          <div className="p-5 rounded-xl border border-[rgba(15,234,122,0.15)] bg-[rgba(15,234,122,0.04)] flex items-start gap-4">
            <AlertTriangle className="w-5 h-5 text-[#F5A623] flex-shrink-0 mt-0.5" />
            <p className="text-[#7A9E98] text-sm leading-relaxed">
              From R599 assessment applies to every iPhone battery replacement. If we assess your device and determine the fault lies elsewhere — such as a logic board charging circuit issue rather than the battery cell — you pay the R599 diagnostic fee and receive your phone back exactly as presented. We never replace a battery that does not need replacing.
            </p>
          </div>
        </div>
      </section>

      {/* Google Reviews */}
      <section className="py-10 sm:py-16 bg-[#111C1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Suspense fallback={null}>
            <GoogleReviews />
          </Suspense>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-10 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQAccordion items={faqs} title="iPhone Battery Replacement — Common Questions" />
        </div>
      </section>

      {/* Internal Links / Related Services */}
      <section className="py-8 sm:py-16 bg-[#111C1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#E8F4F1] mb-6">Related Repairs</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              { label: 'All Battery Replacement', href: '/battery-replacement' },
              { label: 'iPhone Repair Hub', href: '/iphone-repair' },
              { label: 'iPhone Screen Repair', href: '/screen-repair/iphone' },
              { label: 'Battery Replacement Sandton', href: '/battery-replacement/sandton' },
              { label: 'Logic Board Repair', href: '/logic-board-repair' },
              { label: 'Liquid Damage Repair', href: '/liquid-damage' },
              { label: 'MacBook Battery', href: '/battery-replacement' },
              { label: 'Contact Us', href: '/contact' },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="glass-card p-4 text-center group"
              >
                <span className="text-[#E8F4F1] text-sm font-semibold group-hover:text-[#0FEA7A] transition-colors">
                  {link.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-8 sm:py-16 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-[rgba(39,80,77,0.3)] border border-[rgba(15,234,122,0.2)] rounded-3xl p-10">
            <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3">
              iPhone Battery Draining Fast? Book Same-Day Replacement.
            </h2>
            <p className="text-[#7A9E98] mb-6 max-w-xl mx-auto leading-relaxed">
              WhatsApp us your iPhone model and your current Battery Health percentage. We will confirm cell availability and give you a fixed price within minutes. Most replacements completed same day at our Hyde Park workshop.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 hover:shadow-[0_0_32px_rgba(15,234,122,0.4)] transition-all"
              >
                WhatsApp for a Quote
              </a>
              <a
                href={`tel:${CONTACT.phoneTel}`}
                className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all"
              >
                <Phone className="w-5 h-5" /> Call {CONTACT.phone}
              </a>
            </div>
            <p className="text-[#7A9E98] text-xs mt-6">
              1 Hyde Lane, Hyde Park, Office E2004, JHB 2196 | From R899 | 12-month warranty | Assessment from R599
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
