import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, ArrowRight, CheckCircle, Star, MessageCircle, Shield, Clock, Wrench, AlertTriangle, Zap, MousePointer } from 'lucide-react';
import Breadcrumb from '@/components/ui/Breadcrumb';
import FAQAccordion from '@/components/ui/FAQ';
import SchemaOrg from '@/components/seo/SchemaOrg';
import { buildFaqSchema, LOCAL_BUSINESS_PROVIDER } from '@/lib/schema';
import { CONTACT } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'MacBook Trackpad Repair Johannesburg | ZA Support',
  description:
    'MacBook trackpad repair in Johannesburg. Trackpad not clicking, cursor jumping, swollen battery pushing trackpad up, Force Touch not working. All MacBook Air and Pro models. Assessment: R899 ex VAT. Hyde Park, Johannesburg.',
  alternates: { canonical: 'https://zasupport.com/macbook-repair/trackpad' },
  keywords: [
    'MacBook trackpad repair Johannesburg',
    'MacBook trackpad not clicking Johannesburg',
    'MacBook trackpad replacement Johannesburg',
    'swollen battery MacBook trackpad Johannesburg',
    'MacBook cursor jumping Johannesburg',
    'MacBook Force Touch repair Johannesburg',
    'MacBook trackpad unresponsive Johannesburg',
    'MacBook trackpad repair Sandton',
    'MacBook trackpad repair Rosebank',
  ],
};

const pricingRows = [
  { model: 'MacBook Air M1 / M2 / M3', note: 'Flex cable or full replacement' },
  { model: 'MacBook Air 13" Intel (2018–2020)', note: '' },
  { model: 'MacBook Pro 13" M1 / M2', note: '' },
  { model: 'MacBook Pro 14" M2 / M3 / M4', note: '' },
  { model: 'MacBook Pro 16" M2 / M3 / M4', note: '' },
  { model: 'MacBook Pro Intel 13" (2016–2020)', note: '' },
  { model: 'MacBook Pro Intel 15" (2016–2019)', note: '' },
  { model: 'Battery replacement (if cause)', note: 'Combined with trackpad job' },
  { model: 'Flex cable only', note: 'Where cable is the sole fault' },
];

const causes = [
  {
    icon: <AlertTriangle className="w-5 h-5" />,
    title: 'Swollen Battery (Most Common)',
    desc: 'As lithium batteries age they swell. The swollen battery physically pushes up from below the trackpad, causing it to feel raised, click inconsistently, or stop clicking entirely. This is also a fire hazard. We replace the battery first, then realign the trackpad.',
    urgent: true,
  },
  {
    icon: <MousePointer className="w-5 h-5" />,
    title: 'Physical Damage',
    desc: 'A drop or knock can crack the trackpad glass, bend the click mechanism, or damage the Force Touch sensor. Physical damage typically requires a full trackpad replacement.',
    urgent: false,
  },
  {
    icon: <Zap className="w-5 h-5" />,
    title: 'Liquid Damage to Flex Cable',
    desc: 'Liquid seeping under the keyboard can corrode or short the trackpad flex cable, the ribbon cable connecting the trackpad to the logic board. Replacing the flex cable is the repair, not the trackpad itself.',
    urgent: false,
  },
  {
    icon: <Wrench className="w-5 h-5" />,
    title: 'Force Touch Calibration Off',
    desc: 'MacBook trackpads since 2015 simulate a physical click using haptic feedback. If calibration drifts, often after a knock, temperature change, or software update, the trackpad may feel wrong or refuse to register clicks. Sometimes a software reset fixes this without replacing any parts.',
    urgent: false,
  },
  {
    icon: <AlertTriangle className="w-5 h-5" />,
    title: 'Trackpad Chip Failure on Logic Board',
    desc: 'The trackpad controller IC lives on the logic board. If the chip fails, from liquid damage, age, or a power spike, the trackpad will be completely dead even with a brand new trackpad assembly installed. We diagnose logic board involvement before recommending parts.',
    urgent: false,
  },
];

const symptoms = [
  'Trackpad not clicking or clicking in the wrong spot',
  'Cursor moving erratically or jumping around the screen',
  'Trackpad completely unresponsive',
  'Trackpad clicking on its own (ghost clicks)',
  'Trackpad raised or lifted, usually caused by swollen battery underneath',
  'Two-finger scrolling or gestures not working',
  'Trackpad feels sticky or has visible physical damage',
  'Clicking works but pointer does not move',
  'Force Touch haptic feedback has stopped or feels wrong',
  'Trackpad right-click not working',
];

const faqs = [
  {
    question: 'How much does MacBook trackpad repair cost in Johannesburg?',
    answer: 'MacBook trackpad repair cost depends on your model and what is causing the fault. If a swollen battery is pushing the trackpad up, we replace both in the same visit and provide a combined quote. We provide a assessment fee (R899 ex VAT) and written fixed quote before any work begins.',
  },
  {
    question: 'My MacBook trackpad is raised and hard to click. What is causing this?',
    answer: 'A raised or bulging trackpad is almost always caused by a swollen battery underneath. As lithium batteries age and degrade, the cells expand and physically push the trackpad upward from below. This causes clicking problems and in some cases makes the trackpad completely unresponsive. More importantly, a swollen battery is a fire and chemical hazard, you should stop using the machine and bring it in immediately. We replace the battery and realign the trackpad in a single repair.',
  },
  {
    question: 'Why is my MacBook trackpad cursor jumping around?',
    answer: 'An erratic cursor is typically caused by a faulty trackpad sensor, a cracked trackpad surface that creates phantom touch inputs, contamination under the trackpad glass, or an issue with the trackpad flex cable. On older Intel MacBooks it can also be caused by corrosion from a prior liquid spill. We run a full diagnostic to identify the root cause before recommending a repair, a cursor problem does not always require a full trackpad replacement.',
  },
  {
    question: 'How long does MacBook trackpad repair take?',
    answer: 'Most trackpad flex cable replacements take 1 to 2 hours. A full trackpad assembly replacement takes 1.5 to 2.5 hours. If a swollen battery is also being replaced as part of the same job, allow 2 to 3 hours. We will confirm the exact timeline when you bring the machine in.',
  },
  {
    question: 'Can you fix a MacBook trackpad without replacing the whole top case?',
    answer: 'Yes. On all current MacBook models the trackpad is a separate replaceable component and does not require a full top case replacement. The butterfly-era MacBook Pros (2016–2019) had the keyboard riveted to the top case, but the trackpad was always separate. Apple charges for a full top case replacement in these situations, we do not. We replace only what is faulty.',
  },
  {
    question: 'Is the MacBook trackpad covered under the Apple warranty?',
    answer: 'Swollen battery damage, physical damage, and liquid-related trackpad faults are not covered by Apple\'s standard warranty or AppleCare. Manufacturing defects in the trackpad mechanism may be covered if your machine is within its warranty period. We offer a written warranty on all our trackpad repairs, if the same fault recurs within the warranty period, we fix it at no cost.',
  },
  {
    question: 'My MacBook trackpad clicks but the cursor does not move. What is wrong?',
    answer: 'This specific fault, clicking works but no pointer movement, usually indicates a failed trackpad sensor or a damaged flex cable that is passing the click signal but not the position data. It can also happen if the trackpad driver has corrupted; we try a software reset first before opening the machine. Bring it in for a assessment and we will identify whether this is a hardware or software fix.',
  },
  {
    question: 'Can a Force Touch trackpad be repaired?',
    answer: 'Force Touch trackpads (2015 and newer) simulate physical clicks via haptic feedback. If the haptic actuator fails, Force Touch calibration drifts, or the trackpad stops responding to pressure levels, we can often recalibrate via software. If the hardware has failed, the trackpad assembly is replaced. We always try the software fix first, it is faster and cheaper if it works.',
  },
];

const reviews = [
  {
    name: 'Ayesha N.',
    suburb: 'Sandton',
    rating: 5,
    text: 'My MacBook Pro trackpad was raised and barely clicking. ZA Support diagnosed a swollen battery in minutes, replaced both the battery and realigned the trackpad in the same afternoon. Machine feels brand new. warranty on the repair too.',
    date: 'February 2026',
  },
  {
    name: 'Greg T.',
    suburb: 'Rosebank',
    rating: 5,
    text: 'Cursor was jumping all over the screen on my MacBook Air M2. Turned out to be a faulty flex cable, not the trackpad itself. ZA Support saved me from paying for an unnecessary full replacement. Fixed in under two hours.',
    date: 'January 2026',
  },
  {
    name: 'Priya M.',
    suburb: 'Fourways',
    rating: 5,
    text: 'Force Touch on my MacBook Pro 14" M3 stopped feeling right after a knock. ZA Support ran a full diagnostic, recalibrated it via software, no parts needed. Trackpad is perfect again. Assessment: R899 ex VAT and honest diagnosis.',
    date: 'March 2026',
  },
];

const aggregateRatingSchema = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'MacBook Trackpad Repair Johannesburg',
  description: 'MacBook trackpad repair service in Johannesburg. Swollen battery, clicking faults, cursor issues, Force Touch repair. All MacBook Air and Pro models.',
  brand: { '@type': 'Brand', name: 'ZA Support' },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '120',
    bestRating: '5',
    worstRating: '1',
  },
  review: reviews.map((r) => ({
    '@type': 'Review',
    author: { '@type': 'Person', name: r.name },
    reviewRating: { '@type': 'Rating', ratingValue: r.rating, bestRating: 5 },
    reviewBody: r.text,
    datePublished: r.date,
  })),
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'MacBook Trackpad Repair Johannesburg',
  provider: LOCAL_BUSINESS_PROVIDER,
  areaServed: [
    { '@type': 'City', name: 'Johannesburg' },
    { '@type': 'Suburb', name: 'Sandton' },
    { '@type': 'Suburb', name: 'Rosebank' },
    { '@type': 'Suburb', name: 'Fourways' },
    { '@type': 'Suburb', name: 'Bryanston' },
    { '@type': 'Suburb', name: 'Hyde Park' },
  ],
  description: 'MacBook trackpad repair in Johannesburg. Swollen battery causing raised trackpad, trackpad not clicking, erratic cursor, Force Touch calibration, flex cable replacement. All MacBook Air and Pro models.',
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://zasupport.com' },
    { '@type': 'ListItem', position: 2, name: 'MacBook Repair', item: 'https://zasupport.com/macbook-repair' },
    { '@type': 'ListItem', position: 3, name: 'Trackpad Repair', item: 'https://zasupport.com/macbook-repair/trackpad' },
  ],
};

const faqSchema = buildFaqSchema(faqs);

export default function MacBookTrackpadPage() {
  return (
    <>
      <SchemaOrg schema={faqSchema} />
      <SchemaOrg schema={breadcrumbSchema} />
      <SchemaOrg schema={serviceSchema} />
      <SchemaOrg schema={aggregateRatingSchema} />

      {/* HERO */}
      <section className="hero-gradient grid-overlay pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb
            items={[
              { label: 'MacBook Repair', href: '/macbook-repair' },
              { label: 'Trackpad', href: '/macbook-repair/trackpad' },
            ]}
          />
          <div className="mt-8 max-w-4xl">
            <div className="inline-flex items-center gap-2 bg-[rgba(15,234,122,0.1)] border border-[rgba(15,234,122,0.25)] text-[#0FEA7A] text-sm font-semibold px-4 py-2 rounded-full mb-6">
              <CheckCircle className="w-4 h-4" /> Assessment: R899 ex VAT · 3-Month Warranty · Hyde Park JHB
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#E8F4F1] leading-tight mb-6">
              MacBook Trackpad Repair<br />
              <span className="text-[#0FEA7A]">Johannesburg</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-8 max-w-2xl">
              Trackpad not clicking, cursor jumping, raised trackpad from swollen battery, Force Touch not working. All MacBook Air and Pro models, Apple Silicon and Intel. Assessment: R899 ex VAT.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="https://wa.me/27790539964?text=Hi%20ZA%20Support%2C%20I%20need%20MacBook%20trackpad%20repair"
                className="inline-flex items-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl font-bold hover:bg-[#0FEA7A]/90 transition-all text-lg"
              >
                <MessageCircle className="w-5 h-5" /> WhatsApp Us
              </a>
              <a
                href={`tel:${CONTACT.phoneTel}`}
                className="inline-flex items-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all"
              >
                <Phone className="w-5 h-5" /> {CONTACT.phone}
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 border border-[rgba(255,255,255,0.12)] text-[#E8F4F1] px-8 py-4 rounded-xl font-semibold hover:bg-[rgba(255,255,255,0.05)] transition-all"
              >
                Get a Quote <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <section className="bg-[rgba(15,234,122,0.06)] border-y border-[rgba(15,234,122,0.15)] py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { stat: '2,000+', label: 'Trackpads Repaired' },
              { stat: 'Same-Day', label: 'Available (most faults)' },
              { stat: '12-Month', label: 'Written Warranty' },
              { stat: 'No Fix', label: 'No Fee' },
            ].map((item) => (
              <div key={item.label} className="flex flex-col items-center">
                <span className="text-2xl font-extrabold text-[#0FEA7A]">{item.stat}</span>
                <span className="text-[#7A9E98] text-sm mt-1">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AGGREGATE RATING */}
      <section className="bg-[#0A1A18] py-10 border-b border-[rgba(255,255,255,0.05)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-6 h-6 fill-[#0FEA7A] text-[#0FEA7A]" />
                ))}
              </div>
              <div>
                <span className="text-3xl font-extrabold text-[#E8F4F1]">4.9</span>
                <span className="text-[#7A9E98] ml-2 text-sm">/ 5 from 120 verified repairs</span>
              </div>
            </div>
            <p className="text-[#7A9E98] text-sm text-center sm:text-right max-w-xs">
              MacBook trackpad repair, Sandton, Rosebank, Fourways, Bryanston, Hyde Park
            </p>
          </div>
        </div>
      </section>

      {/* SWOLLEN BATTERY CALLOUT */}
      <section className="py-10 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[rgba(239,68,68,0.08)] border border-[rgba(239,68,68,0.35)] rounded-2xl p-6 flex gap-4 items-start">
            <AlertTriangle className="w-6 h-6 text-red-400 flex-shrink-0 mt-0.5" />
            <div>
              <h2 className="text-red-400 font-bold text-base mb-2">Trackpad Raised? Stop Using the Machine.</h2>
              <p className="text-[#7A9E98] text-sm leading-relaxed">
                A trackpad that is raised, swollen, or no longer sits flush with the palm rest is almost always caused by a swollen battery. Swollen lithium batteries can rupture, catch fire, or release toxic gas. Do not leave the machine charging overnight. Bring it in as soon as possible, we replace the battery and realign the trackpad in a single same-day repair.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* MODELS TABLE */}
      <section className="py-10 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4">
              MacBook Trackpad Repair, <span className="text-[#0FEA7A]">Models We Service</span>
            </h2>
            <p className="text-[#7A9E98] max-w-xl mx-auto">
              Assessment: R899 ex VAT before any work begins. Written fixed quote, no hidden costs.
            </p>
          </div>
          <div className="max-w-3xl mx-auto">
            <div className="bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] rounded-2xl overflow-hidden">
              <div className="grid grid-cols-2 px-6 py-3 bg-[rgba(15,234,122,0.07)] border-b border-[rgba(255,255,255,0.08)]">
                <span className="text-[#7A9E98] text-xs font-semibold uppercase tracking-wider">Model</span>
                <span className="text-[#7A9E98] text-xs font-semibold uppercase tracking-wider text-right">Note</span>
              </div>
              {pricingRows.map((row, i) => (
                <div
                  key={row.model}
                  className={`grid grid-cols-2 px-6 py-4 items-center ${i < pricingRows.length - 1 ? 'border-b border-[rgba(255,255,255,0.05)]' : ''} hover:bg-[rgba(15,234,122,0.03)] transition-colors`}
                >
                  <span className="text-[#E8F4F1] text-sm font-medium">{row.model}</span>
                  <span className="text-[#7A9E98] text-xs text-right">{row.note}</span>
                </div>
              ))}
            </div>
            <p className="text-[#7A9E98] text-xs mt-4 text-center">
              Combined battery + trackpad quotes available. Call or WhatsApp to confirm stock availability for your model.
            </p>
          </div>
        </div>
      </section>

      {/* WHY TRACKPAD FAILS */}
      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4">
              Why Your MacBook Trackpad <span className="text-[#0FEA7A]">Might Have Failed</span>
            </h2>
            <p className="text-[#7A9E98] max-w-xl mx-auto">
              We diagnose the root cause before recommending a repair. Not every trackpad fault requires a full replacement.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {causes.map((c) => (
              <div
                key={c.title}
                className={`bg-[rgba(255,255,255,0.03)] border rounded-2xl p-6 hover:border-[rgba(15,234,122,0.2)] transition-colors ${
                  c.urgent
                    ? 'border-[rgba(239,68,68,0.35)]'
                    : 'border-[rgba(255,255,255,0.08)]'
                }`}
              >
                <div className={`mb-3 ${c.urgent ? 'text-red-400' : 'text-[#0FEA7A]'}`}>{c.icon}</div>
                <h3 className="text-[#E8F4F1] font-bold text-sm mb-2">
                  {c.title}
                  {c.urgent && (
                    <span className="ml-2 text-xs bg-[rgba(239,68,68,0.15)] text-red-400 border border-[rgba(239,68,68,0.3)] px-2 py-0.5 rounded-full">URGENT</span>
                  )}
                </h3>
                <p className="text-[#7A9E98] text-xs leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SYMPTOMS WE FIX */}
      <section className="py-10 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-4">
                Trackpad Problems <span className="text-[#0FEA7A]">We Fix</span>
              </h2>
              <p className="text-[#7A9E98] mb-6 text-sm">
                From a stuck click to a completely dead trackpad, all faults diagnosed and repaired.
              </p>
              {symptoms.map((item) => (
                <div key={item} className="flex items-center gap-3 py-2.5 border-b border-[rgba(255,255,255,0.04)]">
                  <span className="text-[#0FEA7A] text-sm flex-shrink-0">&#10003;</span>
                  <span className="text-[#7A9E98] text-sm">{item}</span>
                </div>
              ))}
            </div>
            <div>
              <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-6">
                Our Repair <span className="text-[#0FEA7A]">Process</span>
              </h2>
              <div className="space-y-5">
                {[
                  {
                    step: '01',
                    icon: <Wrench className="w-5 h-5" />,
                    title: 'Assessment: R899 ex VAT',
                    desc: 'We inspect the trackpad, check for battery swelling, test the flex cable, and probe the trackpad controller on the logic board. We identify the root cause before quoting.',
                  },
                  {
                    step: '02',
                    icon: <Shield className="w-5 h-5" />,
                    title: 'Fixed Written Quote',
                    desc: 'You receive a written price before we touch anything. If a swollen battery and trackpad fault are both present, we quote both together, no surprises.',
                  },
                  {
                    step: '03',
                    icon: <MousePointer className="w-5 h-5" />,
                    title: 'Targeted Repair',
                    desc: 'We replace only what is faulty, flex cable, full trackpad assembly, or battery. We never replace parts that do not need replacing.',
                  },
                  {
                    step: '04',
                    icon: <CheckCircle className="w-5 h-5" />,
                    title: 'Full Function Test',
                    desc: 'After repair we test all gestures, Force Touch pressure levels, scrolling, clicking, and pointer accuracy. Only then do we hand the machine back.',
                  },
                  {
                    step: '05',
                    icon: <Clock className="w-5 h-5" />,
                    title: 'Warranty',
                    desc: 'Every trackpad repair comes with a written 3-month warranty. If the same fault recurs within the warranty period, we fix it at no cost.',
                  },
                ].map((step) => (
                  <div key={step.step} className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-[rgba(15,234,122,0.1)] border border-[rgba(15,234,122,0.2)] flex items-center justify-center text-[#0FEA7A]">
                      {step.icon}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[#0FEA7A] text-xs font-bold">{step.step}</span>
                        <h3 className="text-[#E8F4F1] font-bold text-sm">{step.title}</h3>
                      </div>
                      <p className="text-[#7A9E98] text-xs leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4">
              What Clients <span className="text-[#0FEA7A]">Say</span>
            </h2>
            <p className="text-[#7A9E98]">MacBook trackpad repairs across Johannesburg.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {reviews.map((r) => (
              <div key={r.name} className="bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] rounded-2xl p-6">
                <div className="flex gap-1 mb-3">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="w-4 h-4 fill-[#0FEA7A] text-[#0FEA7A]" />
                  ))}
                </div>
                <p className="text-[#7A9E98] text-sm leading-relaxed mb-4">&ldquo;{r.text}&rdquo;</p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[#E8F4F1] font-bold text-sm">{r.name}</p>
                    <p className="text-[#7A9E98] text-xs">{r.suburb}</p>
                  </div>
                  <span className="text-[#7A9E98] text-xs">{r.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-10 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQAccordion items={faqs} title="MacBook Trackpad Repair, FAQs" />
        </div>
      </section>

      {/* CTA */}
      <section className="py-8 sm:py-16 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-[rgba(39,80,77,0.3)] border border-[rgba(15,234,122,0.2)] rounded-3xl p-10">
            <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3">
              MacBook Trackpad Not Working?
            </h2>
            <p className="text-[#7A9E98] mb-8">
              Assessment: R899 ex VAT. Hyde Park, Johannesburg.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/27790539964?text=Hi%20ZA%20Support%2C%20I%20need%20MacBook%20trackpad%20repair"
                className="inline-flex items-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 transition-all"
              >
                <MessageCircle className="w-5 h-5" /> WhatsApp Us
              </a>
              <a
                href={`tel:${CONTACT.phoneTel}`}
                className="inline-flex items-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all"
              >
                <Phone className="w-5 h-5" /> {CONTACT.phone}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
