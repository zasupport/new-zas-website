import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, ArrowRight, Shield, CheckCircle, Clock, Zap, Star, MapPin, AlertTriangle, Droplets } from 'lucide-react';
import SchemaOrg from '@/components/seo/SchemaOrg';
import { buildFaqSchema, buildServiceSchema, buildBreadcrumbSchema } from '@/lib/schema';
import FAQAccordion from '@/components/ui/FAQ';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { CONTACT, SITE } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'MacBook Pro Liquid Damage Repair | ZA Support',
  description:
    'MacBook Pro liquid damage repair in Johannesburg from R 1,500. Emergency guide, No Fix No Fee, 12-month warranty. All M-series and Intel models. Hyde Park. Call 064 529 5863.',
  alternates: { canonical: 'https://zasupport.com/liquid-damage/macbook-pro' },
  keywords: [
    'MacBook Pro liquid damage repair Johannesburg',
    'MacBook Pro water damage repair Johannesburg',
    'MacBook Pro spill repair Johannesburg',
    'liquid damaged MacBook Pro Hyde Park',
    'MacBook Pro corrosion repair Johannesburg',
    'water damaged MacBook Pro fix Johannesburg',
    'MacBook Pro rice trick alternative Johannesburg',
    'MacBook Pro liquid damage no fix no fee',
  ],
};

const breadcrumbItems = [
  { label: 'Liquid Damage', href: '/liquid-damage' },
  { label: 'MacBook Pro', href: '/liquid-damage/macbook-pro' },
];

const breadcrumbSchemaItems = [
  { name: 'Home', url: 'https://zasupport.com' },
  { name: 'Liquid Damage', url: 'https://zasupport.com/liquid-damage' },
  { name: 'MacBook Pro Liquid Damage', url: 'https://zasupport.com/liquid-damage/macbook-pro' },
];

const faqs = [
  {
    question: 'Can a water-damaged MacBook Pro be repaired?',
    answer:
      'Yes — in the majority of cases, especially when the device is brought in quickly. Our ultrasonic cleaning process removes corrosion before it causes permanent damage. MacBook Pros brought in within 24 hours of a spill have a very high recovery rate. Even machines that sat wet for several days can often be saved with component-level microsoldering.',
  },
  {
    question: 'How much does liquid damage repair cost?',
    answer:
      'Costs range from R 1,500 to R 8,500 depending on the severity of the damage. A keyboard-only spill with no logic board involvement costs R 1,500–R 3,500. Minor logic board corrosion requiring component cleaning costs R 2,500–R 5,000. Severe corrosion requiring multiple IC replacements costs R 3,500–R 8,500. The assessment is always free — we confirm the exact cost before any work begins.',
  },
  {
    question: 'My MacBook was in rice for 3 days — will it work?',
    answer:
      'Rice does not fix corrosion and never will. Rice absorbs some surface moisture but does nothing to remove the corrosive residue that liquid leaves behind on PCB traces, pads, and components. By the time you bring it in after 3 days in rice, the corrosion has had more time to develop. Bring it to us immediately — do not put it in rice first.',
  },
  {
    question: 'How long does liquid damage repair take?',
    answer:
      'The assessment is completed within 24 hours. Simple repairs — keyboard replacement, USB-C board swap, minor cleaning — are typically done within 24–48 hours. Logic board cleaning and component repair takes 48–72 hours. Complex multi-site corrosion with IC replacement takes 3–5 business days. We confirm the exact timeline before work begins.',
  },
  {
    question: 'What happens if I do not repair liquid damage?',
    answer:
      'Corrosion continues to spread across the logic board over days and weeks — even after the device appears dry. A machine that starts up fine today may fail permanently within a week. Each day the corrosion advances, it attacks more traces, pads, and components, increasing the repair cost and decreasing the chance of a full recovery. Early intervention is always significantly cheaper.',
  },
  {
    question: 'Does Apple cover liquid damage?',
    answer:
      'Standard AppleCare does not cover accidental liquid damage. AppleCare+ includes accidental damage coverage but requires a service fee (typically R 1,499–R 3,499 per incident). Apple then replaces the entire logic board — starting at R 15,000 for older models and exceeding R 35,000 for newer ones. ZA Support repairs the affected components directly, not the entire board, at a fraction of the cost.',
  },
  {
    question: 'Can you recover data from a water-damaged MacBook Pro?',
    answer:
      'Usually yes. In most liquid damage cases, the SSD storage chip itself survives even when the logic board does not. We can remove the storage chip and recover your data to an external drive before or during the repair process. Data recovery is quoted separately and available on all MacBook Pro models from 2013 onwards.',
  },
  {
    question: 'What warranty do you provide on liquid damage repairs?',
    answer:
      'All ZA Support liquid damage repairs carry a 12-month written warranty on every component we repair or replace. If the same fault returns within 12 months due to our workmanship, we fix it at no charge. This is one of the longest warranties in Johannesburg — most shops offer 1–3 months. Our No Fix No Fee policy also applies: if we cannot repair your machine, the assessment is free and you pay nothing.',
  },
];

const emergencySteps = [
  {
    step: '1',
    title: 'Power off IMMEDIATELY',
    detail: 'Hold the power button until the screen goes completely dark. Do not wait for a normal shutdown — force power off now. Every second the board is powered with liquid present causes more damage.',
    urgent: true,
  },
  {
    step: '2',
    title: 'Do NOT plug in the charger',
    detail: 'Connecting power to a liquid-damaged MacBook Pro is one of the most destructive things you can do. It energises the corroded circuits and causes electrolytic corrosion to spread rapidly across the board.',
    urgent: true,
  },
  {
    step: '3',
    title: 'Tilt to drain — keyboard side down',
    detail: 'Turn the MacBook Pro upside down with the keyboard facing down. This allows gravity to pull liquid away from the logic board. Hold this position for 2–3 minutes over a towel.',
    urgent: false,
  },
  {
    step: '4',
    title: 'Do NOT use a hairdryer',
    detail: 'Heat from a hairdryer does not help and can cause further damage. It drives moisture deeper into connectors and components, and can warp the chassis or damage display cables.',
    urgent: true,
  },
  {
    step: '5',
    title: 'Bring it to ZA Support within 24 hours',
    detail: 'The single most important factor in a successful liquid damage recovery is time. Corrosion begins within minutes of liquid contact. Bring your MacBook Pro to us within 24 hours for the best possible recovery chance. Do not put it in rice.',
    urgent: false,
  },
];

const severityTiers = [
  {
    scenario: 'Spill on keyboard only',
    detail: 'Liquid reached the keyboard and possibly the trackpad but did not penetrate to the logic board. The most common and most recoverable scenario.',
    repair: 'Keyboard and/or trackpad replacement',
    priceRange: 'R 1,500 – R 3,500',
    recovery: 'Excellent',
    timeframe: '24–48 hours',
    colour: 'green' as const,
  },
  {
    scenario: 'Logic board corrosion — minor',
    detail: 'Liquid reached the main logic board but corrosion is localised. Component cleaning under ultrasonic bath, trace repair, and targeted IC replacement restores full function.',
    repair: 'Ultrasonic cleaning, IC cleaning, trace repair',
    priceRange: 'R 2,500 – R 5,000',
    recovery: 'Very good',
    timeframe: '48–72 hours',
    colour: 'yellow' as const,
  },
  {
    scenario: 'Logic board corrosion — major',
    detail: 'Extensive corrosion across multiple board areas. Multiple ICs affected, traces damaged, and multiple failed components. Requires full board cleaning plus targeted component replacement.',
    repair: 'Full component repair, multiple IC replacements',
    priceRange: 'R 3,500 – R 8,500',
    recovery: 'Case dependent',
    timeframe: '3–5 business days',
    colour: 'orange' as const,
  },
  {
    scenario: 'Screen damage from liquid',
    detail: 'Liquid entered the display assembly causing dead pixels, backlight failure, or full screen blackout. The display assembly is replaced independently of the logic board.',
    repair: 'Display assembly replacement',
    priceRange: 'From R 2,499',
    recovery: 'Excellent',
    timeframe: '24–48 hours',
    colour: 'green' as const,
  },
];

const recoveryColours: Record<string, string> = {
  green: 'border-[rgba(15,234,122,0.3)] bg-[rgba(15,234,122,0.04)]',
  yellow: 'border-[rgba(245,166,35,0.3)] bg-[rgba(245,166,35,0.04)]',
  orange: 'border-[rgba(245,87,54,0.3)] bg-[rgba(245,87,54,0.04)]',
};

const badgeColours: Record<string, string> = {
  green: 'text-[#0FEA7A] bg-[rgba(15,234,122,0.1)]',
  yellow: 'text-[#F5A623] bg-[rgba(245,166,35,0.1)]',
  orange: 'text-[#F55736] bg-[rgba(245,87,54,0.1)]',
};

const repairProcess = [
  {
    step: '1',
    title: 'Free Assessment',
    detail: 'We open the machine, inspect under our Leica stereo microscope, and map every affected area. Power rail testing confirms whether the logic board has short circuits. Completed within 24 hours. No charge. No obligation.',
  },
  {
    step: '2',
    title: 'Written Quote',
    detail: 'You receive a fixed quote — not a vague estimate. The quote covers the specific fault, every component to be replaced, labour, and a confirmed completion time. If you decline, you pay nothing.',
  },
  {
    step: '3',
    title: 'Ultrasonic Cleaning',
    detail: 'The logic board is cleaned in our ultrasonic bath with a specialist PCB cleaning solution. This removes corrosive residue from traces, pads, and component leads — the step that rice never performs.',
  },
  {
    step: '4',
    title: 'Component-Level Repair',
    detail: 'Under a stereo microscope with a JBC soldering iron and Hakko FM-204 hot air station, we replace specific damaged ICs, repair lifted traces, and reball any corroded BGA components.',
  },
  {
    step: '5',
    title: 'Multi-Stage Testing',
    detail: 'Before closing the machine: power-on test, full charge cycle, display verification, port enumeration, thermal monitoring under load, and keyboard/trackpad validation.',
  },
  {
    step: '6',
    title: 'Collection or Delivery',
    detail: 'Collect from Hyde Park or we arrange secure courier delivery. We include a written 12-month warranty certificate with every repaired machine.',
  },
];

const reviews = [
  {
    name: 'Natalie H.',
    location: 'Sandton',
    rating: 5,
    text: 'Spilled an entire glass of water on my MacBook Pro during a Zoom call. Brought it in within an hour and ZA Support saved it completely. Logic board cleaned and keyboard replaced — works perfectly. Could not be more relieved.',
    service: 'Liquid Damage Repair',
  },
  {
    name: 'Jason F.',
    location: 'Rosebank',
    rating: 5,
    text: 'I made the mistake of leaving it in rice for two days before coming in. ZA Support still managed to recover the board. They were honest about the extra time the corrosion needed to address, but the result was worth it. Incredible work.',
    service: 'Logic Board Liquid Damage',
  },
  {
    name: 'Thandi M.',
    location: 'Fourways',
    rating: 5,
    text: 'My M2 MacBook Pro had a coffee spill. The screen was dead and it would not charge. ZA Support replaced the display, cleaned the board, and had it back to me in 3 days. 12-month warranty too — proper professional service.',
    service: 'Liquid Damage — Display Replacement',
  },
];

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

const faqSchema = buildFaqSchema(faqs);
const serviceSchema = buildServiceSchema({
  name: 'MacBook Pro Liquid Damage Repair Johannesburg',
  description: 'Professional MacBook Pro liquid damage repair in Johannesburg from R 1,500. Emergency assessment, No Fix No Fee, 12-month warranty. All Intel and Apple Silicon models.',
  lowPrice: '1500',
  highPrice: '8500',
});
const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbSchemaItems);

export default function MacBookProLiquidDamagePage() {
  const whatsappLiquidDamage = 'https://wa.me/27790539964?text=Hi%20ZA%20Support%2C%20my%20MacBook%20Pro%20has%20liquid%20damage%20%E2%80%94%20need%20urgent%20help';

  return (
    <>
      <SchemaOrg schema={faqSchema} />
      <SchemaOrg schema={serviceSchema} />
      <SchemaOrg schema={breadcrumbSchema} />
      <SchemaOrg schema={aggregateRatingSchema} />

      {/* Hero */}
      <section className="hero-gradient grid-overlay pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={breadcrumbItems} />
          <div className="mt-8 max-w-4xl">
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#E8F4F1] leading-tight mb-6"
              style={{ fontFamily: 'Syne, sans-serif' }}
            >
              MacBook Pro Liquid Damage
              <br />
              <span className="text-[#0FEA7A]">Repair Johannesburg</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-4 max-w-3xl leading-relaxed">
              From R 1,500. Emergency assessment available. All Intel and Apple Silicon models.
              No Fix No Fee. 12-month written warranty. Hyde Park, Johannesburg.
            </p>
            <p className="text-base text-[#7A9E98] mb-8 max-w-3xl leading-relaxed">
              Every hour matters after a liquid spill. Corrosion starts within minutes of contact —
              the sooner you bring your MacBook Pro in, the better the outcome.
            </p>
            <div className="flex flex-wrap gap-3 mb-8">
              {[
                { icon: Shield, label: 'No Fix No Fee' },
                { icon: Clock, label: '24–72hr Turnaround' },
                { icon: Zap, label: 'Free Assessment' },
                { icon: CheckCircle, label: '12-Month Warranty' },
                { icon: Droplets, label: '500+ Recoveries' },
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
                href={whatsappLiquidDamage}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 hover:shadow-[0_0_32px_rgba(15,234,122,0.4)] transition-all"
              >
                💬 WhatsApp — Urgent Help
              </a>
              <a
                href={CONTACT.booking}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all"
              >
                📅 Book Assessment
              </a>
              <a
                href={`tel:${CONTACT.phoneTel}`}
                className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.2)] text-[#7A9E98] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[rgba(15,234,122,0.05)] transition-all"
              >
                <Phone className="w-5 h-5" /> Call {CONTACT.phone}
              </a>
            </div>
            <div className="flex flex-wrap gap-6 mt-8 pt-6 border-t border-[rgba(255,255,255,0.06)]">
              {[
                { value: '500+', label: 'Liquid Damage Recoveries' },
                { value: SITE.yearsExperience + ' Years', label: 'In Business Since 2012' },
                { value: SITE.rating + '★', label: SITE.reviewCount + ' Google Reviews' },
                { value: '12 Months', label: 'Written Warranty — No Exceptions' },
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

      {/* Stats Bar */}
      <section className="py-6 bg-[rgba(15,234,122,0.06)] border-y border-[rgba(15,234,122,0.12)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-8 text-center">
            {[
              { stat: '500+', label: 'Liquid Damage Recoveries' },
              { stat: 'No Fix No Fee', label: 'Pay nothing if we cannot fix it' },
              { stat: '12-Month Warranty', label: 'Written. On every repair.' },
              { stat: 'Free Assessment', label: 'Always. No obligation.' },
            ].map(({ stat, label }) => (
              <div key={stat} className="px-4">
                <p className="text-[#0FEA7A] text-lg font-extrabold" style={{ fontFamily: 'Syne, sans-serif' }}>{stat}</p>
                <p className="text-[#7A9E98] text-xs mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency Guide */}
      <section className="py-20 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle className="w-6 h-6 text-[#F5A623]" />
            <p className="text-[#F5A623] text-sm font-semibold uppercase tracking-wider">Emergency Guide</p>
          </div>
          <h2
            className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4"
            style={{ fontFamily: 'Syne, sans-serif' }}
          >
            What to Do in the First 30 Minutes
          </h2>
          <p className="text-[#7A9E98] leading-relaxed mb-10">
            The actions you take in the first 30 minutes after a spill determine whether your MacBook Pro
            can be saved. Follow these steps exactly — in order — before bringing it in.
          </p>
          <div className="space-y-5">
            {emergencySteps.map((item) => (
              <div
                key={item.step}
                className={`flex gap-5 p-6 rounded-2xl border ${
                  item.urgent
                    ? 'border-[rgba(245,87,54,0.25)] bg-[rgba(245,87,54,0.04)]'
                    : 'border-[rgba(15,234,122,0.15)] bg-[rgba(15,234,122,0.03)]'
                }`}
              >
                <div
                  className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-sm font-extrabold ${
                    item.urgent
                      ? 'bg-[rgba(245,87,54,0.15)] text-[#F55736]'
                      : 'bg-[rgba(15,234,122,0.12)] text-[#0FEA7A]'
                  }`}
                  style={{ fontFamily: 'Syne, sans-serif' }}
                >
                  {item.step}
                </div>
                <div>
                  <h3 className="text-[#E8F4F1] font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-[#7A9E98] leading-relaxed text-sm">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Rice Doesn't Work */}
      <section className="py-16 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-card p-8 border-[rgba(245,166,35,0.2)]">
            <h2
              className="text-2xl font-extrabold text-[#E8F4F1] mb-4"
              style={{ fontFamily: 'Syne, sans-serif' }}
            >
              Why the &ldquo;Rice Trick&rdquo; Does Not Work — The Science
            </h2>
            <div className="space-y-4 text-[#7A9E98] leading-relaxed">
              <p>
                The rice myth persists because it feels logical — rice absorbs moisture from food containers,
                so it should absorb moisture from electronics. The problem is that liquid damage to a MacBook Pro
                is not a moisture problem. It is a <strong className="text-[#E8F4F1]">corrosion problem</strong>.
              </p>
              <p>
                When liquid contacts a powered logic board, electrolytic corrosion begins within minutes.
                The liquid acts as an electrolyte — it allows current to flow between adjacent traces and pads,
                causing metallic ions to migrate from conductors onto the PCB surface. This creates conductive
                bridges (dendrites) and eats away copper traces.
              </p>
              <p>
                Rice absorbs some of the free water molecules, but it does not:
              </p>
              <ul className="space-y-2 pl-4">
                {[
                  'Remove the corrosive mineral and ionic residue left on the board',
                  'Reverse electrolytic damage already caused while the board was powered',
                  'Clean corrosion from under IC packages, BGA balls, or connector pins',
                  'Stop ongoing corrosion that continues even after the visible liquid is gone',
                ].map((point) => (
                  <li key={point} className="flex items-start gap-2">
                    <span className="text-[#F55736] font-bold mt-0.5">✕</span>
                    <span className="text-sm">{point}</span>
                  </li>
                ))}
              </ul>
              <p>
                What actually works: professional ultrasonic cleaning with a specialist PCB solution, followed
                by microscope inspection and targeted component replacement. This is what we do at ZA Support —
                and it is why our liquid damage recovery rate is significantly higher than &ldquo;let it dry out&rdquo; approaches.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Severity Tiers */}
      <section className="py-20 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4"
            style={{ fontFamily: 'Syne, sans-serif' }}
          >
            Common Liquid Damage Scenarios &amp; Repair Costs
          </h2>
          <p className="text-[#7A9E98] mb-10 max-w-3xl leading-relaxed">
            Every liquid damage case is different. The cost and complexity depend on where the liquid went,
            how much got in, and how quickly the machine was powered off. Below are the four most common scenarios.
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {severityTiers.map((tier) => (
              <div
                key={tier.scenario}
                className={`rounded-2xl border p-7 ${recoveryColours[tier.colour]}`}
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <h3 className="text-[#E8F4F1] font-bold text-xl" style={{ fontFamily: 'Syne, sans-serif' }}>
                    {tier.scenario}
                  </h3>
                  <span className={`flex-shrink-0 text-xs font-semibold px-2.5 py-1 rounded-full ${badgeColours[tier.colour]}`}>
                    {tier.recovery}
                  </span>
                </div>
                <p className="text-[#7A9E98] text-sm leading-relaxed mb-5">{tier.detail}</p>
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[rgba(255,255,255,0.06)]">
                  <div>
                    <p className="text-[#7A9E98] text-xs mb-1">Repair type</p>
                    <p className="text-[#E8F4F1] text-sm font-medium">{tier.repair}</p>
                  </div>
                  <div>
                    <p className="text-[#7A9E98] text-xs mb-1">Price range</p>
                    <p className="text-[#0FEA7A] text-sm font-bold">{tier.priceRange}</p>
                  </div>
                  <div>
                    <p className="text-[#7A9E98] text-xs mb-1">Typical turnaround</p>
                    <p className="text-[#E8F4F1] text-sm font-medium">{tier.timeframe}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 p-5 rounded-xl border border-[rgba(15,234,122,0.15)] bg-[rgba(15,234,122,0.04)] flex items-start gap-4">
            <Shield className="w-5 h-5 text-[#0FEA7A] flex-shrink-0 mt-0.5" />
            <p className="text-[#7A9E98] text-sm leading-relaxed">
              All prices are confirmed before any work begins. Our No Fix No Fee policy applies to every case —
              if we cannot repair your MacBook Pro, the assessment is free and the machine is returned exactly
              as received. 12-month written warranty on all repairs.
            </p>
          </div>
        </div>
      </section>

      {/* Repair Process */}
      <section className="py-20 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4"
            style={{ fontFamily: 'Syne, sans-serif' }}
          >
            Our Liquid Damage Repair Process
          </h2>
          <p className="text-[#7A9E98] mb-10 leading-relaxed">
            We follow a systematic, transparent process on every liquid damage case. You are kept informed
            at every stage — and you approve the cost before we begin.
          </p>
          <div className="space-y-5">
            {repairProcess.map((item) => (
              <div key={item.step} className="flex gap-5">
                <div className="flex-shrink-0 w-10 h-10 bg-[rgba(15,234,122,0.12)] rounded-full flex items-center justify-center text-[#0FEA7A] font-extrabold text-sm" style={{ fontFamily: 'Syne, sans-serif' }}>
                  {item.step}
                </div>
                <div className="pb-5 border-b border-[rgba(255,255,255,0.04)] flex-1">
                  <h3 className="text-[#E8F4F1] font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-[#7A9E98] text-sm leading-relaxed">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Models We Repair */}
      <section className="py-20 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2
                className="text-3xl font-extrabold text-[#E8F4F1] mb-6"
                style={{ fontFamily: 'Syne, sans-serif' }}
              >
                MacBook Pro Models We Repair
              </h2>
              <p className="text-[#7A9E98] leading-relaxed mb-6">
                We repair all MacBook Pro models for liquid damage — from the 2016 redesign through to the
                latest M3 Pro and M3 Max. Our engineers know every board revision and every failure mode
                across all generations.
              </p>
              <div className="space-y-2.5">
                {[
                  'MacBook Pro 13" (A1706, A1708) — 2016–2017',
                  'MacBook Pro 15" (A1707) — 2016–2017',
                  'MacBook Pro 13" (A1989, A1990) — 2018–2019',
                  'MacBook Pro 16" (A2141) — 2019',
                  'MacBook Pro 13" (A2251, A2289, A2338) — 2020',
                  'MacBook Pro 14" M1 Pro/Max (A2442) — 2021',
                  'MacBook Pro 16" M1 Pro/Max (A2485) — 2021',
                  'MacBook Pro 13" M2 (A2338) — 2022',
                  'MacBook Pro 14" M2 Pro/Max (A2779) — 2023',
                  'MacBook Pro 16" M2 Pro/Max (A2780) — 2023',
                  'MacBook Pro 14" M3 Pro/Max (A2992) — 2023–2024',
                  'MacBook Pro 16" M3 Pro/Max (A2991) — 2023–2024',
                ].map((model) => (
                  <div key={model} className="flex items-center gap-3">
                    <CheckCircle className="w-4 h-4 text-[#0FEA7A] flex-shrink-0" />
                    <span className="text-[#7A9E98] text-sm">{model}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2
                className="text-3xl font-extrabold text-[#E8F4F1] mb-6"
                style={{ fontFamily: 'Syne, sans-serif' }}
              >
                Common Failure Points After a Spill
              </h2>
              <div className="space-y-4">
                {[
                  {
                    title: 'USB-C / Thunderbolt Board',
                    desc: 'First to fail in most cases. Controls charging, data, and display output. Often replaceable independently of the main logic board.',
                  },
                  {
                    title: 'Keyboard &amp; Trackpad',
                    desc: 'Both scissor-switch and butterfly keyboards are vulnerable from the top. Replacement restores full function.',
                  },
                  {
                    title: 'Logic Board Traces &amp; ICs',
                    desc: 'Corrosion on copper traces causes open circuits. Failed ICs require replacement under stereo microscope.',
                  },
                  {
                    title: 'Touch Bar &amp; Touch ID',
                    desc: 'The Touch Bar flex cable and BRDG controller chip are vulnerable on 2016–2021 Touch Bar models.',
                  },
                  {
                    title: 'Display &amp; Backlight Circuit',
                    desc: 'Liquid entering the display assembly causes dead pixels or backlight failure. Display replacement restores full output.',
                  },
                  {
                    title: 'Speaker Assemblies',
                    desc: 'MacBook Pro speakers can be permanently saturated by liquid. New speaker assemblies restore full audio.',
                  },
                ].map((item) => (
                  <div key={item.title} className="glass-card p-4">
                    <h3 className="text-[#E8F4F1] font-semibold mb-1">{item.title}</h3>
                    <p className="text-[#7A9E98] text-sm" dangerouslySetInnerHTML={{ __html: item.desc }} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-20 bg-[#111C1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-3xl font-extrabold text-[#E8F4F1] mb-10"
            style={{ fontFamily: 'Syne, sans-serif' }}
          >
            What Clients Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((review) => (
              <div key={review.name} className="glass-card p-6 flex flex-col gap-4">
                <div className="flex gap-0.5">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#0FEA7A] text-[#0FEA7A]" />
                  ))}
                </div>
                <p className="text-[#7A9E98] text-sm leading-relaxed flex-1">&ldquo;{review.text}&rdquo;</p>
                <div>
                  <p className="text-[#E8F4F1] font-semibold text-sm">{review.name}</p>
                  <div className="flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-[#7A9E98]" />
                    <p className="text-[#7A9E98] text-xs">{review.location} — {review.service}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQAccordion items={faqs} title="MacBook Pro Liquid Damage — FAQs" />
        </div>
      </section>

      {/* Related Services */}
      <section className="py-16 bg-[#111C1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-2xl font-extrabold text-[#E8F4F1] mb-6"
            style={{ fontFamily: 'Syne, sans-serif' }}
          >
            Related Services
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { title: 'MacBook Air Liquid Damage', href: '/liquid-damage/macbook-air', price: 'From R 2,500' },
              { title: 'MacBook Pro Logic Board Repair', href: '/logic-board-repair/macbook-pro', price: 'From R 1,800' },
              { title: 'Liquid Damage Hub', href: '/liquid-damage', price: 'All Devices' },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="glass-card p-4 flex items-center justify-between group"
              >
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

      {/* WhatsApp CTA */}
      <section className="py-16 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-[rgba(39,80,77,0.3)] border border-[rgba(15,234,122,0.2)] rounded-3xl p-10">
            <h2
              className="text-3xl font-extrabold text-[#E8F4F1] mb-3"
              style={{ fontFamily: 'Syne, sans-serif' }}
            >
              MacBook Pro Liquid Damage? Act Now.
            </h2>
            <p className="text-[#7A9E98] mb-6 max-w-xl mx-auto leading-relaxed">
              Every minute counts. WhatsApp us now for an immediate response — we will guide you
              through the next steps and get your machine booked in as fast as possible.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={whatsappLiquidDamage}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 hover:shadow-[0_0_32px_rgba(15,234,122,0.4)] transition-all"
              >
                💬 WhatsApp — Urgent Help
              </a>
              <a
                href={`tel:${CONTACT.phoneTel}`}
                className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all"
              >
                <Phone className="w-5 h-5" /> Call {CONTACT.phone}
              </a>
            </div>
            <p className="text-[#7A9E98] text-xs mt-6">
              Free assessment. No Fix No Fee. 12-month written warranty. Hyde Park, Johannesburg.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
