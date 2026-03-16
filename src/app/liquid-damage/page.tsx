import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, AlertTriangle, CheckCircle, Clock, Shield, ArrowRight } from 'lucide-react';
import SchemaOrg from '@/components/seo/SchemaOrg';
import { buildFaqSchema, LOCAL_BUSINESS_PROVIDER } from '@/lib/schema';
import FAQAccordion from '@/components/ui/FAQ';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { CONTACT } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'MacBook Liquid Damage Repair Johannesburg | ZA Support',
  description:
    'MacBook liquid damage repair in Johannesburg. Expert board-level cleaning, free assessment and same-day diagnosis. No Fix No Fee. Call 064 529 5863.',
  alternates: { canonical: 'https://zasupport.com/liquid-damage' },
};

const faqs = [
  {
    question: 'How quickly should I bring in my device after liquid damage?',
    answer:
      'Immediately — within hours if possible. Every hour that passes allows corrosion to spread further across the logic board. Rice does not help and wastes critical time. Switch your device off, do not attempt to charge it, and bring it to our Hyde Park workshop as soon as possible. We offer same-day assessment.',
  },
  {
    question: 'Will you be able to tell me if my MacBook is repairable before I commit to a repair?',
    answer:
      'Yes. Our assessment is completely free with no obligation. We will open the device, inspect the damage under magnification, and give you an honest prognosis and quote before any work begins. If it is not economically repairable, we will tell you — and help you with data recovery options.',
  },
  {
    question: 'Does liquid damage repair fall under warranty?',
    answer:
      'Liquid damage is not covered under Apple\'s standard warranty or AppleCare. However, ZA Support provides a 12-month warranty on all our liquid damage repairs, covering our workmanship and any components we replace.',
  },
  {
    question: 'What does the ultrasonic cleaning process involve?',
    answer:
      'We disassemble your device completely, then submerge the logic board and affected components in an ultrasonic cleaning bath using IPA-based cleaning solution. The ultrasonic vibration dislodges corrosion, mineral deposits, and contaminants from component leads, pads, and traces that cannot be reached by hand cleaning alone. The board is then dried and inspected under magnification.',
  },
  {
    question: 'My MacBook got wet but still works — should I bring it in?',
    answer:
      'Yes, absolutely. Liquid damage is progressive. Even if your MacBook appears to work normally after getting wet, corrosion continues to develop invisibly. The most common failure pattern we see is a MacBook that "survived" liquid exposure for weeks, then suddenly fails. Early intervention is dramatically cheaper and more successful than waiting.',
  },
  {
    question: 'What types of liquid cause the most damage?',
    answer:
      'Coffee and sugary drinks cause the most damage because they leave conductive residues that accelerate corrosion and cause short circuits. Salt water causes rapid and severe corrosion. Pure water causes less immediate damage but still introduces moisture that leads to oxidation over time. Whatever liquid was involved, the repair process is the same — bring the device in immediately.',
  },
];

const subPages = [
  { title: 'MacBook Pro', href: '/liquid-damage/macbook-pro' },
  { title: 'MacBook Air', href: '/liquid-damage/macbook-air' },
  { title: 'iPhone', href: '/liquid-damage/iphone' },
  { title: 'iPad', href: '/liquid-damage/ipad' },
  { title: 'Apple Watch', href: '/liquid-damage/apple-watch' },
  { title: 'iMac', href: '/liquid-damage/imac' },
];

const steps = [
  { title: 'Intake & Assessment', description: 'Free inspection. We assess the extent of liquid exposure, identify affected areas, and provide an honest quote.' },
  { title: 'Ultrasonic Cleaning', description: 'Full disassembly. Logic board and components cleaned in ultrasonic bath to remove corrosion and contaminants.' },
  { title: 'Diagnostic', description: 'Post-clean diagnostic to identify damaged or failed components. Tested against known-good reference boards.' },
  { title: 'Component Repair', description: 'Board-level microsoldering to replace failed chips, capacitors, resistors, and connector pins under magnification.' },
  { title: 'Testing', description: 'Full functional test — display, keyboard, trackpad, ports, charging, Wi-Fi, camera, and all sensors.' },
  { title: 'Return', description: 'Device returned clean, fully functional, with a 12-month ZA Support warranty on all repaired components.' },
];

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'MacBook Liquid Damage Repair Johannesburg',
  description: 'Professional MacBook and Apple device liquid damage repair. Ultrasonic cleaning, board-level diagnostics, component repair. Hyde Park, Johannesburg.',
  provider: LOCAL_BUSINESS_PROVIDER,
  areaServed: [
    { '@type': 'City', name: 'Johannesburg' },
    { '@type': 'Neighborhood', name: 'Hyde Park' },
    { '@type': 'Neighborhood', name: 'Sandton' },
  ],
  availableChannel: [
    { '@type': 'ServiceChannel', serviceUrl: 'https://wa.me/27645295863', serviceType: 'WhatsApp' },
    { '@type': 'ServiceChannel', servicePhone: '+27645295863', serviceType: 'Phone' },
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Liquid Damage Repair Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'MacBook Liquid Damage Assessment',
          description: 'Free same-day assessment for MacBook liquid damage. No Fix No Fee.',
        },
        price: '0',
        priceCurrency: 'ZAR',
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'MacBook Liquid Damage Repair — Ultrasonic Cleaning',
          description: 'Full board disassembly, ultrasonic IPA cleaning, component-level repair. 12-month warranty.',
        },
        priceCurrency: 'ZAR',
      },
    ],
  },
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'What to do if your MacBook gets water damage',
  description: 'Immediate steps to take after liquid spills on your MacBook, to maximise the chance of a successful repair.',
  totalTime: 'PT15M',
  tool: [],
  supply: [],
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Switch off immediately and do not turn it back on',
      text: 'Hold the power button until the Mac shuts down. Do not try to restart it — powering on a wet board causes short circuits that accelerate damage and turn a repairable fault into permanent failure.',
      url: 'https://zasupport.com/liquid-damage#step-switch-off',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Do not put it in rice',
      text: 'Rice does not remove corrosion and does not dry the internals effectively. Rice wastes critical time. The window for successful repair narrows rapidly after liquid exposure.',
      url: 'https://zasupport.com/liquid-damage#step-no-rice',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Remove all cables and accessories',
      text: 'Unplug the charger, USB devices, and external monitors immediately. Tilt the Mac so any pooled liquid drains away from the logic board.',
      url: 'https://zasupport.com/liquid-damage#step-unplug',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Bring it to ZA Support within hours',
      text: 'Every hour that passes allows corrosion to spread. Bring your MacBook to our Hyde Park workshop for a free same-day assessment. Earlier treatment delivers a significantly better repair outcome.',
      url: 'https://zasupport.com/liquid-damage#step-bring-in',
    },
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://zasupport.com' },
    { '@type': 'ListItem', position: 2, name: 'Liquid Damage Repair', item: 'https://zasupport.com/liquid-damage' },
  ],
};

const faqSchema = buildFaqSchema(faqs);

const liquidDamageReviewSchema = {
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
  review: [
    {
      '@type': 'Review',
      author: { '@type': 'Person', name: 'Sarah K.' },
      datePublished: '2026-02',
      reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
      reviewBody: 'Spilled an entire cup of coffee on my MacBook Pro 2021. ZA Support had it in ultrasonic cleaning within 2 hours of bringing it in. Two days later it was completely restored. They found corrosion on the USB-C controller and replaced it. Absolutely incredible service.',
      itemReviewed: {
        '@type': 'Service',
        name: 'MacBook Liquid Damage Repair Johannesburg',
        provider: { '@type': 'LocalBusiness', name: 'ZA Support', url: 'https://zasupport.com' },
      },
    },
    {
      '@type': 'Review',
      author: { '@type': 'Person', name: 'David M.' },
      datePublished: '2026-01',
      reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
      reviewBody: 'My MacBook Air went through a washing machine (yes, really). I expected it to be a write-off. ZA Support performed an ultrasonic clean and component repair. It came back fully functional with a 12-month warranty. Cannot believe it.',
      itemReviewed: {
        '@type': 'Service',
        name: 'MacBook Liquid Damage Repair Johannesburg',
        provider: { '@type': 'LocalBusiness', name: 'ZA Support', url: 'https://zasupport.com' },
      },
    },
    {
      '@type': 'Review',
      author: { '@type': 'Person', name: 'Nomsa P.' },
      datePublished: '2026-03',
      reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
      reviewBody: 'Brought in a liquid-damaged MacBook that another shop had given up on. ZA Support diagnosed it in one day and repaired the charging circuit. Free diagnostic, no surprises on the invoice. 5 stars.',
      itemReviewed: {
        '@type': 'Service',
        name: 'MacBook Liquid Damage Repair Johannesburg',
        provider: { '@type': 'LocalBusiness', name: 'ZA Support', url: 'https://zasupport.com' },
      },
    },
  ],
};

export default function LiquidDamagePage() {
  return (
    <>
      <SchemaOrg schema={faqSchema} />
      <SchemaOrg schema={serviceSchema} />
      <SchemaOrg schema={breadcrumbSchema} />
      <SchemaOrg schema={howToSchema} />
      <SchemaOrg schema={liquidDamageReviewSchema} />

      {/* Hero */}
      <section className="hero-gradient grid-overlay pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: 'Liquid Damage Repair' }]} />
          <div className="mt-8 max-w-4xl">
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#E8F4F1] leading-tight mb-6"
              style={{ fontFamily: 'Syne, sans-serif' }}
            >
              MacBook Liquid Damage
              <br />
              <span className="text-[#0FEA7A]">Repair in Johannesburg</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-8 max-w-3xl leading-relaxed">
              Johannesburg&apos;s liquid damage specialists. Board-level cleaning, component repair, and free
              assessment. No Fix No Fee. 12-month warranty. Hyde Park.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={`tel:${CONTACT.phoneTel}`}
                className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 hover:shadow-[0_0_32px_rgba(15,234,122,0.4)] transition-all"
              >
                <Phone className="w-5 h-5" />
                Call {CONTACT.phone}
              </a>
              <a
                href="/api/wa?service=liquid-damage&page=/liquid-damage"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all"
              >
                WhatsApp for Quote <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Urgency Banner */}
      <section className="bg-[#111C1A] py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="urgency-banner flex items-start gap-4">
            <AlertTriangle className="w-6 h-6 text-white flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-white font-bold text-lg">
                Water damage? Act immediately — oxidation spreads within hours. Do NOT use rice.
              </p>
              <p className="text-red-200 text-sm mt-1">
                Every hour increases repair complexity. Switch off your device, do not charge it, and contact us now.
                We offer same-day assessment in Hyde Park, Johannesburg.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What happens inside */}
      <section className="py-20 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2
                className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-6"
                style={{ fontFamily: 'Syne, sans-serif' }}
              >
                What Happens Inside Your Device After a Spill?
              </h2>
              <div className="space-y-5 text-[#7A9E98] leading-relaxed">
                <p>
                  The moment liquid enters your MacBook or iPhone, a damaging process begins. Water — even pure
                  water — is a conductor when it carries dissolved minerals. The moment it bridges two electrical
                  contacts on your logic board, it creates a short circuit. Current flows where it should not,
                  components overheat, and damage begins.
                </p>
                <p>
                  Within hours, the liquid begins to evaporate — but it leaves behind mineral deposits and
                  corrosion products. Coffee, sugary drinks, and salt water are particularly destructive because
                  they leave highly conductive residues that continue to cause damage even after the liquid has dried.
                </p>
                <p>
                  This is why rice does not work. Rice can absorb some moisture from the air, but it cannot
                  remove the corrosion and conductive deposits from the logic board. By the time your device feels
                  &ldquo;dry,&rdquo; the corrosion is already eating through your board&apos;s copper traces and
                  component pads.
                </p>
                <p>
                  Professional ultrasonic cleaning — the kind we perform in our Hyde Park workshop — physically
                  removes these deposits using ultrasonic vibration in a cleaning solution, stopping the
                  corrosion process before it causes permanent irreversible damage.
                </p>
              </div>
            </div>

            {/* Devices We Repair */}
            <div>
              <h2
                className="text-3xl font-extrabold text-[#E8F4F1] mb-6"
                style={{ fontFamily: 'Syne, sans-serif' }}
              >
                Devices We Repair
              </h2>
              <div className="bg-[rgba(22,34,32,0.6)] border border-[rgba(15,234,122,0.15)] rounded-2xl overflow-hidden">
                {[
                  { device: 'MacBook Air', models: 'M1, M2, M3, Intel 2018–2020' },
                  { device: 'MacBook Pro', models: '13", 14", 16" — All M-series & Intel' },
                  { device: 'iPhone', models: 'iPhone 8 through iPhone 16 Pro Max' },
                  { device: 'iPad', models: 'All models including M4 iPad Pro' },
                  { device: 'Apple Watch', models: 'Series 3 through Ultra 2' },
                  { device: 'iMac', models: '21.5" & 27" — M1, M3, Intel' },
                ].map((item, i) => (
                  <div
                    key={item.device}
                    className={`p-4 ${i < 5 ? 'border-b border-[rgba(255,255,255,0.05)]' : ''}`}
                  >
                    <p className="text-[#E8F4F1] font-semibold">{item.device}</p>
                    <p className="text-[#7A9E98] text-xs mt-0.5">{item.models}</p>
                  </div>
                ))}
              </div>
              <p className="text-[#7A9E98] text-xs mt-3">
                Assessment is free. No Fix No Fee guarantee on all liquid damage repairs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6-Step Process */}
      <section className="py-20 bg-[#111C1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-12 text-center"
            style={{ fontFamily: 'Syne, sans-serif' }}
          >
            Our 6-Step Repair Process
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {steps.map((step, index) => (
              <div key={step.title} className="glass-card p-6">
                <div className="step-number mb-4">0{index + 1}</div>
                <h3
                  className="text-[#E8F4F1] font-bold text-lg mb-2"
                  style={{ fontFamily: 'Syne, sans-serif' }}
                >
                  {step.title}
                </h3>
                <p className="text-[#7A9E98] text-sm leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Rice Doesn't Work */}
      <section className="py-20 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[rgba(22,34,32,0.6)] border border-[rgba(255,165,0,0.2)] rounded-2xl p-8">
            <h2
              className="text-3xl font-extrabold text-[#E8F4F1] mb-4"
              style={{ fontFamily: 'Syne, sans-serif' }}
            >
              Why Rice Doesn&apos;t Work (And What to Do Instead)
            </h2>
            <div className="space-y-4 text-[#7A9E98] leading-relaxed">
              <p>
                The rice myth is one of the most damaging pieces of consumer advice circulating online. Placing
                your MacBook in a bag of rice may feel like you are doing something — but it is actively making
                the situation worse.
              </p>
              <p>
                Rice can absorb atmospheric moisture, but it cannot reach the corrosion that is already forming
                on your device&apos;s logic board inside a sealed chassis. While your device sits in rice for 24 or
                48 hours, corrosion is actively spreading across your board&apos;s copper traces and component pads.
              </p>
              <p>
                Even worse, rice can introduce small starchy particles into your device through vents and openings,
                which can cause additional problems later.
              </p>
              <p className="text-[#E8F4F1] font-semibold">
                The correct action: switch off immediately, do not attempt to charge, remove any accessories,
                and bring it to our Hyde Park workshop as soon as possible. Every hour matters.
              </p>
            </div>
          </div>

          {/* Logic Board damage section */}
          <div className="mt-12">
            <h2
              className="text-3xl font-extrabold text-[#E8F4F1] mb-4"
              style={{ fontFamily: 'Syne, sans-serif' }}
            >
              When Liquid Damage Affects the Logic Board
            </h2>
            <p className="text-[#7A9E98] leading-relaxed mb-4">
              In severe liquid damage cases, corrosion can damage the logic board itself — affecting chips,
              capacitors, and copper traces. Standard cleaning is not sufficient for these cases. Our engineers
              use microscope-guided microsoldering to replace individual components at board level, which is far
              more cost-effective than a full logic board replacement.
            </p>
            <p className="text-[#7A9E98] leading-relaxed mb-6">
              Common logic board failures from liquid damage include: no power, no display, USB-C not charging,
              keyboard not responding, and data inaccessibility. Our{' '}
              <Link href="/logic-board-repair" className="text-[#0FEA7A] hover:underline">
                logic board repair service
              </Link>{' '}
              handles all of these.
            </p>
          </div>
        </div>
      </section>

      {/* Trust Signals */}
      <section className="py-12 bg-[#111C1A] border-y border-[rgba(15,234,122,0.1)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { icon: Shield, label: 'No Fix No Fee', sub: 'Zero risk to you' },
              { icon: CheckCircle, label: '12-Month Warranty', sub: 'On all repairs' },
              { icon: Clock, label: '72-Hour Turnaround', sub: 'Most liquid damage cases' },
              { icon: Phone, label: 'Same-Day Assessment', sub: 'Hyde Park, JHB' },
            ].map(({ icon: Icon, label, sub }) => (
              <div key={label} className="flex flex-col items-center gap-2 p-4">
                <Icon className="w-7 h-7 text-[#0FEA7A]" />
                <span className="text-[#E8F4F1] font-semibold text-sm">{label}</span>
                <span className="text-[#7A9E98] text-xs">{sub}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sub-pages grid */}
      <section className="py-20 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-3xl font-extrabold text-[#E8F4F1] mb-8"
            style={{ fontFamily: 'Syne, sans-serif' }}
          >
            Liquid Damage Repair by Device
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {subPages.map((page) => (
              <Link
                key={page.href}
                href={page.href}
                className="glass-card p-5 flex items-center justify-between group"
              >
                <div>
                  <h3 className="text-[#E8F4F1] font-bold mb-1">{page.title}</h3>
                </div>
                <ArrowRight className="w-5 h-5 text-[#7A9E98] group-hover:text-[#0FEA7A] transition-colors" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQAccordion items={faqs} title="Liquid Damage Repair — Common Questions" />
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-[rgba(39,80,77,0.3)] border border-[rgba(15,234,122,0.2)] rounded-3xl p-10">
            <h2
              className="text-3xl font-extrabold text-[#E8F4F1] mb-3"
              style={{ fontFamily: 'Syne, sans-serif' }}
            >
              Book Free Assessment — We Respond Within 1 Hour
            </h2>
            <p className="text-[#7A9E98] mb-6">
              No Fix No Fee. Honest prognosis. 12-month warranty on all work.
            </p>
            <a
              href={`tel:${CONTACT.phoneTel}`}
              className="inline-flex items-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 hover:shadow-[0_0_32px_rgba(15,234,122,0.4)] transition-all"
            >
              <Phone className="w-5 h-5" />
              Call {CONTACT.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
