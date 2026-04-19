import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, CheckCircle, Battery, AlertTriangle, Star, MapPin, Zap, Shield, Clock } from 'lucide-react';
import Breadcrumb from '@/components/ui/Breadcrumb';
import FAQAccordion from '@/components/ui/FAQ';
import SchemaOrg from '@/components/seo/SchemaOrg';
import { buildFaqSchema, LOCAL_BUSINESS_PROVIDER } from '@/lib/schema';
import { CONTACT, buildWhatsAppUrl} from '@/lib/constants';
import PricingNote from '@/components/PricingNote';

export const metadata: Metadata = {
  title: 'MacBook Battery Replacement Johannesburg | ZA Support',
  description:
    'MacBook battery replacement Johannesburg. All MacBook Air M1/M2/M3 and MacBook Pro Intel + Apple Silicon models. Same-day available. up-to-3 year warranty. Hyde Park. Call 064 529 5863.',
  alternates: { canonical: 'https://zasupport.com/macbook-repair/battery' },
  keywords: [
    'MacBook battery replacement Johannesburg',
    'MacBook Pro battery replacement Johannesburg',
    'MacBook Air battery replacement Johannesburg',
    'MacBook battery swollen Johannesburg',
    'replace MacBook battery Johannesburg',
    'MacBook battery cost South Africa',
    'MacBook M1 M2 M3 battery replacement',
    'same day MacBook battery Johannesburg',
  ],
};

// ─── Schemas ────────────────────────────────────────────────────────────────

const aggregateRatingSchema = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'MacBook Battery Replacement Johannesburg',
  description: 'Professional MacBook battery replacement service in Johannesburg. All models covered. up-to-3 year warranty.',
  brand: { '@type': 'Brand', name: 'ZA Support' },
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'MacBook Battery Replacement Johannesburg',
  provider: LOCAL_BUSINESS_PROVIDER,
  areaServed: [
    { '@type': 'City', name: 'Johannesburg' },
    { '@type': 'Neighborhood', name: 'Hyde Park' },
    { '@type': 'Neighborhood', name: 'Sandton' },
  ],
  description:
    'MacBook battery replacement in Johannesburg. All M-series and Intel MacBook Air and Pro models. Same-day available. warranty on parts and labour.',
  availableChannel: [
    { '@type': 'ServiceChannel', serviceUrl: 'https://wa.me/27645295863', serviceType: 'WhatsApp' },
    { '@type': 'ServiceChannel', servicePhone: '+27645295863', serviceType: 'Phone' },
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'MacBook Battery Replacement Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'MacBook Air Battery Replacement Johannesburg',
          description: 'MacBook Air M1/M2/M3 and Intel battery replacement. Same-day available. up-to-3 year warranty.',
        },
        priceCurrency: 'ZAR',
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'MacBook Pro Battery Replacement Johannesburg',
          description: 'MacBook Pro 13"/14"/16" Intel and M-series battery replacement. up-to-3 year warranty.',
        },
        priceCurrency: 'ZAR',
      },
    ],
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://zasupport.com' },
    { '@type': 'ListItem', position: 2, name: 'MacBook Repair', item: 'https://zasupport.com/macbook-repair' },
    { '@type': 'ListItem', position: 3, name: 'Battery Replacement', item: 'https://zasupport.com/macbook-repair/battery' },
  ],
};

// ─── Page Data ────────────────────────────────────────────────────────────────

const pricing = [
  { group: 'MacBook Air', model: 'MacBook Air M1 (2020)' },
  { group: 'MacBook Air', model: 'MacBook Air M2 (2022–2023)' },
  { group: 'MacBook Air', model: 'MacBook Air M3 (2024)' },
  { group: 'MacBook Air', model: 'MacBook Air 13" Intel (2015–2020)' },
  { group: 'MacBook Pro', model: 'MacBook Pro 13" (2016–2022 Intel/M1/M2)' },
  { group: 'MacBook Pro', model: 'MacBook Pro 14" M1 Pro/Max (2021)' },
  { group: 'MacBook Pro', model: 'MacBook Pro 14" M2/M3 Pro/Max (2023–2024)' },
  { group: 'MacBook Pro', model: 'MacBook Pro 16" M1 Pro/Max (2021)' },
  { group: 'MacBook Pro', model: 'MacBook Pro 16" M2/M3 Pro/Max (2023–2024)' },
  { group: 'MacBook Pro', model: 'MacBook Pro 15" Intel (2015–2019)' },
];

const signs = [
  {
    icon: <AlertTriangle className="w-5 h-5 text-[#F5A623]" />,
    title: 'Swollen battery',
    detail: 'Trackpad feels raised, unresponsive, or pops up when pressed. The battery is pushing against the bottom case. Replace immediately, this is a fire risk.',
    urgent: true,
  },
  {
    icon: <Battery className="w-5 h-5 text-[#0FEA7A]" />,
    title: 'Shuts off at 40% or higher',
    detail: 'Your MacBook powers off with plenty of battery remaining. This is classic cell degradation. The battery can no longer hold enough charge under load.',
    urgent: false,
  },
  {
    icon: <Zap className="w-5 h-5 text-[#0FEA7A]" />,
    title: 'Will not charge, or stops at 80%',
    detail: 'Charging stops early, fluctuates between percentages, or the MacBook does not charge at all. Could be the battery, charging IC, or cable. Assessment: from R599.',
    urgent: false,
  },
  {
    icon: <Clock className="w-5 h-5 text-[#0FEA7A]" />,
    title: 'Battery drains in under 2 hours',
    detail: 'A healthy MacBook Air should give 10–18 hours. MacBook Pro 8–15 hours. Under 2 hours of real-world use means the battery has degraded significantly.',
    urgent: false,
  },
  {
    icon: <AlertTriangle className="w-5 h-5 text-[#0FEA7A]" />,
    title: '"Service Recommended" warning in macOS',
    detail: 'Apple flags batteries below 80% maximum capacity with a Service Recommended notification in Battery Settings. This confirms replacement is needed.',
    urgent: false,
  },
  {
    icon: <Battery className="w-5 h-5 text-[#0FEA7A]" />,
    title: 'MacBook only works when plugged in',
    detail: 'The battery has failed completely and the Mac will not run on battery power at all. Replacement restores full portability.',
    urgent: false,
  },
];

const healthGuide = [
  { threshold: '95 – 100%', label: 'Excellent', colour: '#0FEA7A', action: 'Normal. No action needed.' },
  { threshold: '85 – 94%', label: 'Good', colour: '#7FC97F', action: 'Monitor annually. Still performing well.' },
  { threshold: '80 – 84%', label: 'Fair', colour: '#F5A623', action: 'Apple "Service Recommended" threshold approaching. Plan replacement.' },
  { threshold: 'Below 80%', label: 'Replace', colour: '#F56565', action: 'Apple classifies as consumed. Replace for reliable performance.' },
];

const faqs = [
  {
    question: 'How much does MacBook battery replacement cost in Johannesburg?',
    answer:
      'MacBook battery replacement cost depends on your model. All prices include parts, labour, and a up-to-3 year warranty. Call us on 064 529 5863 for a model-specific quote.',
  },
  {
    question: 'How long does MacBook battery replacement take?',
    answer:
      'Most MacBook battery replacements take 2–4 hours. Intel MacBook models are generally 60–90 minutes. M-series MacBooks (M1, M2, M3) use a glued-down battery assembly and take 90–180 minutes. Same-day service is available if you drop your MacBook off in the morning. Call ahead to confirm availability for your specific model.',
  },
  {
    question: 'Do you use genuine Apple batteries?',
    answer:
      'We use high-quality OEM-equivalent battery cells that match or exceed the original Apple specifications for capacity (mAh) and cycle rating. These are not Apple-branded parts. Apple only supplies batteries through its own service channel. Our batteries are rigorously tested and carry our own warranty on parts and labour. Battery health will show 100% in macOS after replacement.',
  },
  {
    question: 'Will I lose my data during MacBook battery replacement?',
    answer:
      'No. Battery replacement is a hardware-only repair. We physically remove the old battery and install the new one. Your data, applications, user accounts, passwords, and macOS installation are completely untouched. We do not need to reformat or reinstall anything.',
  },
  {
    question: 'My MacBook trackpad is popping up, is that battery swelling?',
    answer:
      'Yes, almost certainly. A swollen MacBook battery expands in volume as it degrades and physically pushes against the bottom case and trackpad. This causes the trackpad to feel raised, lose click response, or pop up. A swollen battery is a safety hazard. Lithium cells can rupture or ignite if punctured. Do not charge the machine, and bring it in as soon as possible. We treat swollen battery replacements as same-day priority.',
  },
  {
    question: 'How do I check my MacBook battery health?',
    answer:
      'There are two easy methods. Method 1, Built-in macOS: System Settings > Battery > Battery Health (macOS Ventura and later), or hold Option, click the Apple menu, choose System Information, then select Power. You will see Maximum Capacity as a percentage of original. Method 2, coconutBattery app (free): download coconutBattery from coconut-flavour.com. It shows your current capacity in mAh, design capacity, cycle count, age, and temperature, far more detail than the built-in tool. Below 80% maximum capacity means Apple considers the battery consumed.',
  },
  {
    question: 'Can you replace the battery in a MacBook Pro M1, M2, or M3?',
    answer:
      'Yes. We replace batteries in all Apple Silicon MacBook Pro models: M1 Pro, M1 Max, M2 Pro, M2 Max, M3 Pro, M3 Max, and the base M1/M2 13" MacBook Pro. Apple Silicon batteries are glued into the enclosure and take slightly longer than Intel models to replace, but the process is routine for us. The result is 100% battery health and a full written up-to-3 year warranty.',
  },
  {
    question: 'What warranty do I get on a MacBook battery replacement?',
    answer:
      'Every MacBook battery replacement at ZA Support carries a up-to-3 year warranty on both the battery (parts) and the replacement labour. If the battery fails, loses capacity below 80%, or shows any defect within the warranty period, we replace it at from R599. We put this in writing. You will receive a job card with the warranty terms when you collect your MacBook.',
  },
];

const reviews = [
  {
    name: 'Tarryn M.',
    suburb: 'Sandton',
    rating: 5,
    text: 'My MacBook Pro was shutting off at 35% battery. ZA Support replaced it the same afternoon. They showed me the new battery health reading, 100%, before I left. The warranty was a big plus. Would not go anywhere else.',
  },
  {
    name: 'Jonathan K.',
    suburb: 'Rosebank',
    rating: 5,
    text: 'The trackpad on my MacBook Air had been feeling strange for weeks. Turns out the battery had swollen. They treated it as urgent and had it done within 3 hours. Very professional, clear pricing, no surprises.',
  },
  {
    name: 'Priya N.',
    suburb: 'Fourways',
    rating: 5,
    text: 'Checked my battery health on coconutBattery after a friend mentioned it, 61% capacity and 890 cycles. Called ZA Support, dropped it off that morning, collected the same afternoon with 100% health. Incredibly fast and reasonably priced.',
  },
];

const faqSchema = buildFaqSchema(faqs);

// ─── Component ───────────────────────────────────────────────────────────────

export default function MacBookBatteryPage() {
  const airPricing = pricing.filter((p) => p.group === 'MacBook Air');
  const proPricing = pricing.filter((p) => p.group === 'MacBook Pro');

  return (
    <>
      <SchemaOrg schema={faqSchema} />
      <SchemaOrg schema={breadcrumbSchema} />
      <SchemaOrg schema={serviceSchema} />

      {/* ── Hero ────────────────────────────────────────────────────────── */}
      <section className="hero-gradient grid-overlay pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb
            items={[
              { label: 'MacBook Repair', href: '/macbook-repair' },
              { label: 'Battery Replacement' },
            ]}
          />
          <div className="mt-8 max-w-4xl">
            <div className="inline-flex items-center gap-2 bg-[rgba(15,234,122,0.1)] border border-[rgba(15,234,122,0.25)] text-[#0FEA7A] text-sm font-semibold px-4 py-2 rounded-full mb-6">
              <Battery className="w-4 h-4" /> Same-Day Service Available
            </div>
            <h1
              className="text-4xl sm:text-5xl font-extrabold text-[#E8F4F1] leading-tight mb-6"
             
            >
              MacBook Battery Replacement<br />
              <span className="text-[#0FEA7A]">Johannesburg</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-8 max-w-2xl">
              All MacBook Air and MacBook Pro models, M1, M2, M3 through to Intel. Genuine-equivalent cells,
              written up-to-3 year warranty, Hyde Park workshop.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={buildWhatsAppUrl('MBR-BAT', 'macbook-repair')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl font-bold hover:bg-[#0FEA7A]/90 transition-all"
              >
                WhatsApp Us
              </a>
              <a
                href={`tel:${CONTACT.phoneTel}`}
                className="inline-flex items-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all">
                <Phone className="w-5 h-5" /> {CONTACT.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats Bar ───────────────────────────────────────────────────── */}
      <section className="bg-[#111C1A] border-y border-[rgba(255,255,255,0.06)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-[rgba(255,255,255,0.06)]">
            {[
              { icon: <Battery className="w-5 h-5" />, label: '50,000+', sub: 'Batteries Replaced' },
              { icon: <Zap className="w-5 h-5" />, label: 'Same-Day', sub: 'Service Available' },
              { icon: <Shield className="w-5 h-5" />, label: '12-Month', sub: 'Up-to-3 Year Warranty' },
              { icon: <CheckCircle className="w-5 h-5" />, label: 'Genuine', sub: 'OEM-Equivalent Cells' },
            ].map((stat) => (
              <div key={stat.sub} className="flex flex-col items-center py-6 px-4 gap-1">
                <span className="text-[#0FEA7A]">{stat.icon}</span>
                <span className="text-[#E8F4F1] font-bold text-lg">{stat.label}</span>
                <span className="text-[#7A9E98] text-xs text-center">{stat.sub}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Signs You Need a Battery ─────────────────────────────────────── */}
      <section className="py-10 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3 text-center">
            Signs Your MacBook Needs a New Battery
          </h2>
          <p className="text-[#7A9E98] text-center mb-12 max-w-2xl mx-auto">
            Recognise any of these? Book a assessment fee (from R599), we diagnose before we quote.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {signs.map((s) => (
              <div
                key={s.title}
                className={`bg-[rgba(255,255,255,0.03)] border rounded-2xl p-6 ${
                  s.urgent
                    ? 'border-[rgba(245,166,35,0.35)]'
                    : 'border-[rgba(255,255,255,0.08)]'
                }`}
              >
                <div className="flex items-center gap-3 mb-3">
                  {s.icon}
                  <h3 className="text-[#E8F4F1] font-bold text-sm">{s.title}</h3>
                  {s.urgent && (
                    <span className="ml-auto text-[#F5A623] text-xs font-semibold bg-[rgba(245,166,35,0.1)] px-2 py-0.5 rounded-full">
                      Urgent
                    </span>
                  )}
                </div>
                <p className="text-[#7A9E98] text-sm leading-relaxed">{s.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Models We Service ────────────────────────────────────────────── */}
      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3 text-center">
            MacBook Models We Service, Johannesburg
          </h2>
          <p className="text-[#7A9E98] text-center mb-12 max-w-2xl mx-auto">
            warranty on every replacement. Call to confirm stock for your model and get a fixed quote.
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* MacBook Air */}
            <div className="bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] rounded-2xl overflow-hidden">
              <div className="bg-[rgba(15,234,122,0.08)] border-b border-[rgba(15,234,122,0.15)] px-6 py-4">
                <h3 className="text-[#0FEA7A] font-bold">MacBook Air</h3>
              </div>
              <div className="divide-y divide-[rgba(255,255,255,0.05)]">
                {airPricing.map((row) => (
                  <div key={row.model} className="flex items-center px-6 py-4">
                    <span className="text-[#7A9E98] text-sm">{row.model}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* MacBook Pro */}
            <div className="bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] rounded-2xl overflow-hidden">
              <div className="bg-[rgba(15,234,122,0.08)] border-b border-[rgba(15,234,122,0.15)] px-6 py-4">
                <h3 className="text-[#0FEA7A] font-bold">MacBook Pro</h3>
              </div>
              <div className="divide-y divide-[rgba(255,255,255,0.05)]">
                {proPricing.map((row) => (
                  <div key={row.model} className="flex items-center px-6 py-4">
                    <span className="text-[#7A9E98] text-sm">{row.model}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <p className="text-[#7A9E98] text-xs mt-6 text-center">
            Exact quote confirmed after assessment fee (from R599). Contact us for a fixed price on your model.
          </p>
          <PricingNote variant="inline" />
        </div>
      </section>

      {/* ── Battery Health Explainer ──────────────────────────────────────── */}
      <section className="py-10 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3 text-center">
            Understanding MacBook Battery Health
          </h2>
          <p className="text-[#7A9E98] text-center mb-12 max-w-2xl mx-auto">
            Every MacBook battery degrades over time. Here is what the numbers actually mean, and when to replace.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
            {/* Cycle Count */}
            <div className="bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] rounded-2xl p-6">
              <h3 className="text-[#E8F4F1] font-bold text-lg mb-4">
                What Is a Battery Cycle Count?
              </h3>
              <p className="text-[#7A9E98] text-sm mb-4 leading-relaxed">
                One battery cycle equals using 100% of your battery capacity, not necessarily in a single charge. Using 50% today and 50% tomorrow counts as one cycle.
              </p>
              <p className="text-[#7A9E98] text-sm mb-4 leading-relaxed">
                Apple rates most modern MacBook batteries at 1,000 cycles before they drop below 80% capacity. Older Intel models were rated at 500–1,000 cycles.
              </p>
              <div className="bg-[rgba(15,234,122,0.07)] border border-[rgba(15,234,122,0.15)] rounded-xl p-4">
                <p className="text-[#0FEA7A] text-sm font-semibold mb-1">Replace at 500+ cycles on Intel models</p>
                <p className="text-[#7A9E98] text-xs">
                  On Intel MacBooks with the 500-cycle rating, 500+ cycles typically correlates with 75–85% remaining capacity. Replace before performance degrades further.
                </p>
              </div>
              <p className="text-[#7A9E98] text-sm mt-4 leading-relaxed">
                Use the free <strong className="text-[#E8F4F1]">coconutBattery</strong> app to see your exact cycle count, current capacity (mAh vs design capacity), battery age, and temperature history. It is far more detailed than the built-in macOS Battery Health readout.
              </p>
            </div>

            {/* Health Scale */}
            <div className="bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] rounded-2xl p-6">
              <h3 className="text-[#E8F4F1] font-bold text-lg mb-4">
                Battery Health Scale
              </h3>
              <p className="text-[#7A9E98] text-sm mb-6 leading-relaxed">
                macOS reports battery maximum capacity as a percentage of original design capacity. This is what the scale means in practice.
              </p>
              <div className="space-y-3">
                {healthGuide.map((h) => (
                  <div key={h.threshold} className="flex items-center gap-4">
                    <div
                      className="w-3 h-3 rounded-full flex-shrink-0"
                      style={{ backgroundColor: h.colour }}
                    />
                    <div className="flex-1">
                      <div className="flex justify-between items-baseline mb-0.5">
                        <span className="text-[#E8F4F1] text-sm font-semibold">{h.threshold}</span>
                        <span className="text-xs font-semibold" style={{ color: h.colour }}>{h.label}</span>
                      </div>
                      <p className="text-[#7A9E98] text-xs">{h.action}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 bg-[rgba(245,101,101,0.07)] border border-[rgba(245,101,101,0.2)] rounded-xl p-4">
                <p className="text-[#F56565] text-sm font-semibold mb-1">Apple's own threshold: 80%</p>
                <p className="text-[#7A9E98] text-xs">
                  Apple considers any battery below 80% maximum capacity as "consumed" and recommends replacement. macOS will show a "Service Recommended" badge at this point.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Repair Process ───────────────────────────────────────────────── */}
      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-12 text-center">
            How MacBook Battery Replacement <span className="text-[#0FEA7A]">Works</span>
          </h2>
          <div className="space-y-5">
            {[
              {
                step: '01',
                title: 'Bring Your MacBook In',
                desc: 'Drop off at our Hyde Park workshop, no appointment required, though calling ahead ensures we have your battery in stock for a same-day turn. Bring the charger if possible.',
              },
              {
                step: '02',
                title: 'Battery Assessment',
                desc: 'We check your battery health percentage, cycle count, cell voltage, and temperature history using coconutBattery and system diagnostics. We will also check whether the battery is swollen, whether the trackpad has been displaced, and whether there are any related charging circuit issues.',
              },
              {
                step: '03',
                title: 'Fixed Quote Provided',
                desc: 'You receive a clear, fixed price for the replacement before we begin. No ambiguous ranges at this stage, the price is confirmed and agreed in writing on the job card. For M-series MacBooks with glued assemblies, we also confirm turnaround time.',
              },
              {
                step: '04',
                title: 'Battery Replaced in 2–4 Hours',
                desc: 'We remove the old battery, clean adhesive residue, install the new cell, and reseal the enclosure correctly. All case screws are torqued to spec. The trackpad is re-seated and tested. On M-series MacBooks this process takes 90–180 minutes due to the glued assembly design.',
              },
              {
                step: '05',
                title: '100% Health Verified Before Collection',
                desc: 'Before you collect, we confirm battery health at 100% in macOS System Settings, run a partial charge cycle, verify the charge path, and confirm the trackpad response. You will see the reading on screen before you leave.',
              },
            ].map((item) => (
              <div key={item.step} className="flex gap-6 bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] rounded-2xl p-6">
                <div
                  className="text-3xl font-extrabold text-[#0FEA7A] opacity-40 flex-shrink-0 w-10"
                 
                >
                  {item.step}
                </div>
                <div>
                  <h3 className="text-[#E8F4F1] font-bold mb-1">{item.title}</h3>
                  <p className="text-[#7A9E98] text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Reviews ──────────────────────────────────────────────────────── */}
      <section className="py-10 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3 text-center">
            What Clients Say
          </h2>
          <p className="text-[#7A9E98] text-center mb-12">
            Rated 4.9 / 5 from 632 reviews across Johannesburg
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {reviews.map((r) => (
              <div key={r.name} className="bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] rounded-2xl p-6 flex flex-col gap-4">
                <div className="flex gap-1">
                  {Array.from({ length: r.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#0FEA7A] text-[#0FEA7A]" />
                  ))}
                </div>
                <p className="text-[#7A9E98] text-sm leading-relaxed flex-1">&ldquo;{r.text}&rdquo;</p>
                <div className="flex items-center gap-2 pt-2 border-t border-[rgba(255,255,255,0.05)]">
                  <div className="w-8 h-8 rounded-full bg-[rgba(15,234,122,0.15)] flex items-center justify-center text-[#0FEA7A] font-bold text-sm">
                    {r.name[0]}
                  </div>
                  <div>
                    <p className="text-[#E8F4F1] text-sm font-semibold">{r.name}</p>
                    <div className="flex items-center gap-1 text-[#7A9E98] text-xs">
                      <MapPin className="w-3 h-3" /> {r.suburb}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQAccordion
            items={faqs}
            title="MacBook Battery Replacement, FAQs"
          />
        </div>
      </section>

      {/* ── Related Services ── */}
      <section className="py-12 bg-[#071210]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold text-[#E8F4F1] mb-6">
            Related Services
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              { label: 'MacBook Repair', href: '/macbook-repair' },
              { label: 'Screen Replacement', href: '/macbook-repair/screen' },
              { label: 'Keyboard Repair', href: '/macbook-repair/keyboard' },
              { label: 'Trackpad Repair', href: '/macbook-repair/trackpad' },
              { label: 'Logic Board Repair', href: '/logic-board-repair' },
              { label: 'MacBook Not Turning On', href: '/macbook-not-turning-on' },
            ].map(link => (
              <Link key={link.href} href={link.href} className="block p-3 rounded-lg bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] text-[#7A9E98] hover:text-[#0FEA7A] hover:border-[#0FEA7A] text-sm transition-colors">
                {link.label} →
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ───────────────────────────────────────────────────── */}
      <section className="py-8 sm:py-16 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-[rgba(39,80,77,0.3)] border border-[rgba(15,234,122,0.2)] rounded-3xl p-10">
            <Battery className="w-10 h-10 text-[#0FEA7A] mx-auto mb-4" />
            <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3">
              MacBook Battery Dying?
            </h2>
            <p className="text-[#7A9E98] mb-2">Completed in 2–4 hours. up-to-3 year warranty. Assessment: from R599.</p>
            <p className="text-[#7A9E98] text-sm mb-8">
              Hyde Park, Johannesburg, drop in, no appointment needed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={buildWhatsAppUrl('MBR-BAT', 'macbook-repair')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 transition-all"
              >
                WhatsApp Us Now
              </a>
              <a
                href={`tel:${CONTACT.phoneTel}`}
                className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all">
                <Phone className="w-5 h-5" /> {CONTACT.phone}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
