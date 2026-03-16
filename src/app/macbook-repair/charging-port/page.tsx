import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, ArrowRight, CheckCircle, Zap, Shield, Clock, Star, MapPin, AlertTriangle, Wrench } from 'lucide-react';
import Breadcrumb from '@/components/ui/Breadcrumb';
import FAQAccordion from '@/components/ui/FAQ';
import SchemaOrg from '@/components/seo/SchemaOrg';
import { buildFaqSchema, buildServiceSchema, buildBreadcrumbSchema } from '@/lib/schema';
import { CONTACT } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'MacBook Not Charging — Repair Johannesburg | ZA Support',
  description:
    'MacBook not charging in Johannesburg? We diagnose and repair all charging faults — dirty USB-C port, faulty MagSafe DC-in board, USB-C controller IC, charge IC. Free assessment. No Fix No Fee. Hyde Park.',
  alternates: { canonical: 'https://zasupport.com/macbook-repair/charging-port' },
  keywords: [
    'MacBook charging port repair Johannesburg',
    'MacBook not charging Johannesburg',
    'MacBook USB-C not charging Johannesburg',
    'MagSafe repair Johannesburg',
    'MacBook charging port replacement Johannesburg',
    'MacBook not charging fix Hyde Park',
    'USB-C controller IC repair Johannesburg',
    'CD3217B12 repair Johannesburg',
    'MacBook charge IC repair Johannesburg',
  ],
};

// ─── Data ────────────────────────────────────────────────────────────────────

const stats = [
  { value: '3,000+', label: 'Repairs Completed' },
  { value: 'Same-Day', label: 'Available' },
  { value: '12-Month', label: 'Warranty' },
  { value: 'No Fix', label: 'No Fee' },
];

const causes = [
  {
    icon: '🔌',
    title: 'Faulty USB-C / MagSafe Cable',
    description:
      'The most common cause — and the cheapest fix. A worn, frayed, or internally broken cable looks fine but cannot deliver power. Try a different Apple-certified cable before anything else.',
    severity: 'low',
    cost: 'Free to check — cable replacement available',
  },
  {
    icon: '🧹',
    title: 'Dirty or Corroded USB-C Port',
    description:
      'Lint, dust, and moisture build up inside USB-C ports over time. Even a small obstruction can prevent the connector from seating fully, breaking the charging circuit. A professional clean restores full function.',
    severity: 'low',
    cost: 'Port cleaning — contact for pricing',
  },
  {
    icon: '⚡',
    title: 'Dead USB-C Controller IC on Logic Board',
    description:
      'Each USB-C port is managed by a controller IC (such as the TUSB1044 or similar mux chip). When this chip fails — often from overvoltage, liquid, or age — the port stops accepting power entirely. Component-level repair replaces only the failed IC.',
    severity: 'medium',
    cost: 'Component repair — contact for pricing',
  },
  {
    icon: '🔋',
    title: 'Blown Charge IC (CD3217B12)',
    description:
      'The CD3217B12 is the primary USB Power Delivery controller on most modern MacBook Pro and Air logic boards. When it fails, the machine draws no current at all even with a working cable and port. This is a logic board component repair, not a port replacement.',
    severity: 'high',
    cost: 'Logic board repair — contact for pricing',
  },
  {
    icon: '🧲',
    title: 'Dead MagSafe DC-in Board',
    description:
      'On MagSafe-equipped MacBooks (Air 2018–2021 via USB-C, and older models with MagSafe 1/2), the DC-in board is a separate component that can be replaced without touching the logic board. Bent pins, liquid damage, or a burned connector are all fixable.',
    severity: 'medium',
    cost: 'MagSafe DC-in replacement — contact for pricing',
  },
];

const pricing = [
  { service: 'Port cleaning (USB-C or MagSafe)', note: 'Same-day' },
  { service: 'MagSafe DC-in board (Air, MagSafe 1/2)', note: '1–3 hours' },
  { service: 'USB-C I/O board replacement (Air)', note: '1–3 hours' },
  { service: 'USB-C I/O board replacement (Pro 13")', note: '1–3 hours' },
  { service: 'USB-C I/O board replacement (Pro 14"/16")', note: '2–4 hours' },
  { service: 'USB-C controller IC (logic board component)', note: '2–5 days' },
  { service: 'Charge IC (CD3217B12 — logic board)', note: '2–5 days' },
];

const diagnosisSteps = [
  {
    step: '1',
    title: 'Cable & Charger Elimination',
    detail: 'We test your cable and charger against known-good equipment. If the fault clears, you leave with no repair cost — just advice on a replacement cable.',
  },
  {
    step: '2',
    title: 'Port Physical Inspection',
    detail: 'Using magnification, we inspect both USB-C or MagSafe ports for debris, corrosion, bent pins, and physical damage. A port clean often resolves charging failures in 30 minutes.',
  },
  {
    step: '3',
    title: 'Power Rail Testing',
    detail: 'If the port is clean and the cable is good, we test the incoming power rail using a DC bench power supply with current limiting. This isolates whether the fault is in the I/O board or logic board.',
  },
  {
    step: '4',
    title: 'I/O Board vs Logic Board Determination',
    detail: 'We confirm whether the charge path fault is in the removable I/O board (cheaper fix) or on the logic board itself (component-level repair). You get a written quote at this stage — before any work begins.',
  },
  {
    step: '5',
    title: 'Repair and Full Charge Cycle Test',
    detail: 'After the repair, the machine is put through a complete charge cycle test — from flat battery to 100% — before you collect. We also test all remaining ports for full functionality.',
  },
];

const symptoms = [
  'MacBook not charging when plugged in',
  'Charger connected but battery percentage not increasing',
  'MagSafe adapter light not turning on',
  'USB-C charging works on one side but not the other',
  'Charging is intermittent — works sometimes, not reliably',
  'USB-C port physically damaged, bent, or debris-filled',
  'MacBook charges very slowly (trickle charge only)',
  'No video output through USB-C / Thunderbolt port',
  'External drives not recognised on the charging port',
  'MacBook shows "Not Charging" in the battery menu bar',
];

const faqs = [
  {
    question: 'My MacBook won\'t charge — what should I check first?',
    answer:
      'Start with the basics: try a different Apple-certified cable, try a different charger (if available), and perform an SMC reset (hold Shift+Control+Option+Power for 10 seconds on Intel models; on Apple Silicon, simply shut down and restart). If none of these resolve the issue, bring the machine in — we will diagnose the root cause for free and tell you exactly what is needed before charging you anything.',
  },
  {
    question: 'How much does MacBook charging port repair cost in Johannesburg?',
    answer:
      'The cost depends on the root cause — from a simple port clean up to logic board component repair. We provide a free assessment so you know the exact cost before committing.',
  },
  {
    question: 'How do I know if it\'s the charging port or the logic board?',
    answer:
      'You cannot tell from symptoms alone — and neither can most repair shops without proper testing. We use a DC bench power supply to test the incoming power rail, then trace the fault to either the I/O board or the logic board. The free assessment takes 30–60 minutes and gives you a definitive answer with a written quote. Many cases that appear to be logic board faults turn out to be simple I/O board replacements.',
  },
  {
    question: 'Can you repair a broken MagSafe port?',
    answer:
      'Yes. On older MacBook Air and MacBook Pro models with MagSafe 1 or MagSafe 2 connectors, the DC-in board is a separate component that we replace as a unit. On newer MacBook Air models (2018–2022) that charge via USB-C but have the MagSafe 3 port added in 2022 models, the MagSafe board is also replaceable independently. Contact us for a quote.',
  },
  {
    question: 'My USB-C port is loose — can it be fixed without replacing the whole machine?',
    answer:
      'Yes. A loose USB-C port is typically caused by physical wear or the port being knocked sideways. On most MacBook models, the USB-C connector sits on a replaceable I/O board — we swap that board rather than the entire machine. If the connector has pulled traces on the logic board, we can repair those too at component level. Either way, this does not require a new machine.',
  },
  {
    question: 'How long does MacBook charging port repair take?',
    answer:
      'Port cleaning and simple MagSafe pin straightening: 30–60 minutes, often same-day. I/O board replacement (USB-C or MagSafe DC-in board): 1–3 hours, typically ready same day. Logic board component repair (USB-C controller IC or charge IC): 2–5 business days, as this involves microscope-level microsoldering. We confirm the exact turnaround when you drop off the machine.',
  },
  {
    question: 'Do I need to replace the entire logic board if the USB-C port doesn\'t work?',
    answer:
      'Not in most cases. The majority of USB-C charging failures are caused by either: (1) a dirty or damaged port on the I/O board — which is replaced as a separate unit, or (2) a specific controller IC on the logic board — which we replace at component level. A full logic board replacement is only necessary when the damage is too extensive for component repair, and we will always tell you if that is the case before you spend anything.',
  },
  {
    question: 'What warranty do you offer on charging port repairs?',
    answer:
      'All ZA Support charging port repairs carry a written warranty on parts and labour. If the same fault returns within the warranty period — same port, same cause — we fix it at no charge. The warranty is documented in writing when you collect your machine.',
  },
];

const reviews = [
  {
    name: 'Taryn M.',
    suburb: 'Sandton',
    rating: 5,
    text: 'Brought my MacBook Pro in after the USB-C port stopped charging. ZA Support cleaned it out in 30 minutes — turned out to be compacted lint. I expected a big repair bill and walked out paying very little. Completely honest.',
  },
  {
    name: 'David K.',
    suburb: 'Rosebank',
    rating: 5,
    text: 'My MacBook Air MagSafe port had bent pins from a knock. They replaced the DC-in board same-day. Back to full charge. Really professional — they showed me exactly what was wrong before starting.',
  },
  {
    name: 'Priya N.',
    suburb: 'Fourways',
    rating: 5,
    text: 'Thought I needed a new logic board as my Mac wouldn\'t charge at all. ZA Support diagnosed it as the CD3217B12 charge IC and fixed just that component. Saved me a significant amount versus Apple\'s quote.',
  },
];

// ─── Schema ──────────────────────────────────────────────────────────────────

const breadcrumbItems = [
  { label: 'MacBook Repair', href: '/macbook-repair' },
  { label: 'Charging Port', href: '/macbook-repair/charging-port' },
];

const breadcrumbSchemaItems = [
  { name: 'Home', url: 'https://zasupport.com' },
  { name: 'MacBook Repair', url: 'https://zasupport.com/macbook-repair' },
  { name: 'Charging Port Repair', url: 'https://zasupport.com/macbook-repair/charging-port' },
];

const aggregateRatingSchema = {
  '@context': 'https://schema.org',
  '@type': 'AggregateRating',
  itemReviewed: {
    '@type': 'LocalBusiness',
    name: 'ZA Support',
  },
  ratingValue: '4.9',
  reviewCount: '120',
  bestRating: '5',
  worstRating: '1',
};

const serviceSchemaData = buildServiceSchema({
  name: 'MacBook Charging Port Repair Johannesburg',
  description:
    'MacBook charging port repair in Johannesburg. Diagnose and repair all MacBook not charging faults — USB-C, MagSafe, I/O board, charge IC. Free assessment. No Fix No Fee.',
});

const faqSchema = buildFaqSchema(faqs);
const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbSchemaItems);

const whatsappUrl =
  'https://wa.me/27790539964?text=Hi%20ZA%20Support%2C%20my%20MacBook%20is%20not%20charging';

// ─── Component ───────────────────────────────────────────────────────────────

export default function MacBookChargingPortPage() {
  return (
    <>
      <SchemaOrg schema={faqSchema} />
      <SchemaOrg schema={breadcrumbSchema} />
      <SchemaOrg schema={serviceSchemaData} />
      <SchemaOrg schema={aggregateRatingSchema} />

      {/* ── Hero ── */}
      <section className="hero-gradient grid-overlay pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={breadcrumbItems} />
          <div className="mt-8 max-w-4xl">
            <div className="inline-flex items-center gap-2 bg-[rgba(15,234,122,0.08)] border border-[rgba(15,234,122,0.2)] rounded-full px-4 py-1.5 mb-6">
              <Zap className="w-4 h-4 text-[#0FEA7A]" />
              <span className="text-[#0FEA7A] text-sm font-medium">MacBook Charging Port Repair Johannesburg</span>
            </div>
            <h1
              className="text-4xl sm:text-5xl font-extrabold text-[#E8F4F1] leading-tight mb-6"
              style={{ fontFamily: 'Syne, sans-serif' }}
            >
              MacBook Not Charging?<br />
              <span className="text-[#0FEA7A]">Johannesburg Repair</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-8 max-w-2xl">
              We find the exact cause — dirty port, faulty cable, dead I/O board, or logic board charge IC — and repair only what is needed. Free assessment. No Fix No Fee. Hyde Park, Johannesburg.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl font-bold hover:bg-[#0FEA7A]/90 transition-all text-lg"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp Us Now
              </a>
              <a
                href={`tel:${CONTACT.phoneTel}`}
                className="inline-flex items-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all"
              >
                <Phone className="w-5 h-5" /> Call {CONTACT.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats Bar ── */}
      <section className="bg-[rgba(15,234,122,0.06)] border-y border-[rgba(15,234,122,0.12)] py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            {stats.map((s) => (
              <div key={s.label}>
                <div className="text-2xl font-extrabold text-[#0FEA7A]" style={{ fontFamily: 'Syne, sans-serif' }}>
                  {s.value}
                </div>
                <div className="text-[#7A9E98] text-sm mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Won't My MacBook Charge ── */}
      <section className="py-20 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2
              className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4"
              style={{ fontFamily: 'Syne, sans-serif' }}
            >
              Why Your MacBook Won&apos;t Charge
            </h2>
            <p className="text-[#7A9E98] text-lg max-w-2xl mx-auto">
              Five root causes — from cheapest to most complex. A free assessment tells you which one applies before you spend anything.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {causes.map((c, i) => (
              <div
                key={c.title}
                className="bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] rounded-2xl p-6 flex flex-col gap-3"
              >
                <div className="flex items-start gap-3">
                  <span className="text-3xl">{c.icon}</span>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                          c.severity === 'low'
                            ? 'bg-[rgba(15,234,122,0.1)] text-[#0FEA7A]'
                            : c.severity === 'medium'
                            ? 'bg-[rgba(245,166,35,0.1)] text-[#F5A623]'
                            : 'bg-[rgba(245,101,101,0.1)] text-[#F56565]'
                        }`}
                      >
                        Cause {i + 1}
                      </span>
                    </div>
                    <h3 className="text-[#E8F4F1] font-bold text-base">{c.title}</h3>
                  </div>
                </div>
                <p className="text-[#7A9E98] text-sm leading-relaxed">{c.description}</p>
                <div className="mt-auto pt-3 border-t border-[rgba(255,255,255,0.06)]">
                  <span className="text-[#0FEA7A] text-sm font-semibold">{c.cost}</span>
                </div>
              </div>
            ))}
            {/* Last card — CTA */}
            <div className="bg-[rgba(15,234,122,0.05)] border border-[rgba(15,234,122,0.2)] rounded-2xl p-6 flex flex-col justify-between gap-4">
              <div>
                <AlertTriangle className="w-8 h-8 text-[#0FEA7A] mb-3" />
                <h3 className="text-[#E8F4F1] font-bold text-base mb-2">Not Sure Which Cause?</h3>
                <p className="text-[#7A9E98] text-sm">
                  Our free assessment identifies the exact fault before you spend a rand. Most MacBook not charging cases are resolved same-day.
                </p>
              </div>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-5 py-3 rounded-xl font-bold hover:bg-[#0FEA7A]/90 transition-all text-sm"
              >
                Get Free Assessment <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Symptoms We Fix ── */}
      <section className="py-16 bg-[#111C1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2
                className="text-3xl font-extrabold text-[#E8F4F1] mb-4"
                style={{ fontFamily: 'Syne, sans-serif' }}
              >
                Charging Problems We Diagnose &amp; Fix
              </h2>
              <p className="text-[#7A9E98] mb-6">
                Every symptom below has a specific root cause. We identify which one applies to your machine at no charge.
              </p>
              <div className="space-y-0">
                {symptoms.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 py-3 border-b border-[rgba(255,255,255,0.04)] last:border-0"
                  >
                    <CheckCircle className="w-4 h-4 text-[#0FEA7A] flex-shrink-0" />
                    <span className="text-[#7A9E98] text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2
                className="text-3xl font-extrabold text-[#E8F4F1] mb-6"
                style={{ fontFamily: 'Syne, sans-serif' }}
              >
                Repair Types We Cover
              </h2>
              <div className="bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] rounded-2xl overflow-hidden">
                <div className="grid grid-cols-2 gap-0 px-4 py-3 border-b border-[rgba(255,255,255,0.06)] text-xs text-[#7A9E98] font-semibold uppercase tracking-wide">
                  <span className="col-span-1">Repair</span>
                  <span className="text-right">Time</span>
                </div>
                {pricing.map((item, i) => (
                  <div
                    key={item.service}
                    className={`grid grid-cols-2 gap-0 px-4 py-4 items-center ${
                      i < pricing.length - 1 ? 'border-b border-[rgba(255,255,255,0.04)]' : ''
                    }`}
                  >
                    <span className="text-[#E8F4F1] text-sm col-span-1 pr-2">{item.service}</span>
                    <span className="text-[#7A9E98] text-xs text-right">{item.note}</span>
                  </div>
                ))}
              </div>
              <p className="text-[#7A9E98] text-xs mt-3">
                Prices include parts and labour. written warranty on all repairs.
              </p>
              <div className="mt-5 bg-[rgba(255,255,255,0.03)] border border-[rgba(15,234,122,0.15)] rounded-xl p-4">
                <p className="text-[#0FEA7A] font-semibold text-sm mb-1">Only charging on one side?</p>
                <p className="text-[#7A9E98] text-xs leading-relaxed">
                  Each side of a dual USB-C MacBook has its own I/O board. Single-side charging failure is almost always an I/O board replacement — not a logic board repair. Much more affordable.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Our Diagnosis Process ── */}
      <section className="py-20 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2
              className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4"
              style={{ fontFamily: 'Syne, sans-serif' }}
            >
              How We Find the Fault
            </h2>
            <p className="text-[#7A9E98] max-w-xl mx-auto">
              A systematic five-step process that rules out cheap causes before escalating — saving you money every time.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {diagnosisSteps.map((s) => (
              <div
                key={s.step}
                className="bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] rounded-2xl p-6"
              >
                <div className="w-10 h-10 rounded-full bg-[rgba(15,234,122,0.1)] border border-[rgba(15,234,122,0.2)] flex items-center justify-center mb-4">
                  <span className="text-[#0FEA7A] font-extrabold text-sm">{s.step}</span>
                </div>
                <h3 className="text-[#E8F4F1] font-bold text-base mb-2">{s.title}</h3>
                <p className="text-[#7A9E98] text-sm leading-relaxed">{s.detail}</p>
              </div>
            ))}
            {/* 6th card — guarantee */}
            <div className="bg-[rgba(39,80,77,0.25)] border border-[rgba(15,234,122,0.15)] rounded-2xl p-6 flex flex-col justify-center">
              <Shield className="w-8 h-8 text-[#0FEA7A] mb-4" />
              <h3 className="text-[#E8F4F1] font-bold text-base mb-2">Written Warranty</h3>
              <p className="text-[#7A9E98] text-sm leading-relaxed">
                Every charging port repair is covered by a written warranty on parts and labour. If the same fault returns, we fix it at no charge.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Trust Signals ── */}
      <section className="py-14 bg-[#111C1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] rounded-2xl p-6 text-center">
              <Wrench className="w-8 h-8 text-[#0FEA7A] mx-auto mb-3" />
              <h3 className="text-[#E8F4F1] font-bold text-base mb-2">Component-Level Repair</h3>
              <p className="text-[#7A9E98] text-sm">
                We replace the specific failed component — not the entire logic board. Apple charges significantly more. We charge a fraction.
              </p>
            </div>
            <div className="bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] rounded-2xl p-6 text-center">
              <Clock className="w-8 h-8 text-[#0FEA7A] mx-auto mb-3" />
              <h3 className="text-[#E8F4F1] font-bold text-base mb-2">Same-Day Available</h3>
              <p className="text-[#7A9E98] text-sm">
                Port cleaning and I/O board replacements are frequently completed same-day. Drop off in the morning, collect in the afternoon.
              </p>
            </div>
            <div className="bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] rounded-2xl p-6 text-center">
              <Shield className="w-8 h-8 text-[#0FEA7A] mx-auto mb-3" />
              <h3 className="text-[#E8F4F1] font-bold text-base mb-2">No Fix No Fee</h3>
              <p className="text-[#7A9E98] text-sm">
                If we cannot repair the fault, you pay nothing. The free diagnostic is unconditional — no obligation, no catch.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Reviews ── */}
      <section className="py-20 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-[#0FEA7A] fill-[#0FEA7A]" />
              ))}
              <span className="text-[#E8F4F1] font-bold ml-2">4.9 / 5</span>
              <span className="text-[#7A9E98] text-sm ml-1">(120 reviews)</span>
            </div>
            <h2
              className="text-3xl font-extrabold text-[#E8F4F1]"
              style={{ fontFamily: 'Syne, sans-serif' }}
            >
              What Johannesburg Mac Owners Say
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((r) => (
              <div
                key={r.name}
                className="bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] rounded-2xl p-6"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(r.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-[#0FEA7A] fill-[#0FEA7A]" />
                  ))}
                </div>
                <p className="text-[#7A9E98] text-sm leading-relaxed mb-4">&ldquo;{r.text}&rdquo;</p>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[rgba(15,234,122,0.1)] flex items-center justify-center">
                    <span className="text-[#0FEA7A] font-bold text-sm">{r.name[0]}</span>
                  </div>
                  <div>
                    <p className="text-[#E8F4F1] font-semibold text-sm">{r.name}</p>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#7A9E98]" />
                      <p className="text-[#7A9E98] text-xs">{r.suburb}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQs ── */}
      <section className="py-20 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQAccordion items={faqs} title="MacBook Not Charging — Frequently Asked Questions" />
        </div>
      </section>

      {/* ── Related Services ── */}
      <section className="py-12 bg-[#071210]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold text-[#E8F4F1] mb-6" style={{ fontFamily: 'Syne, sans-serif' }}>
            Related Services
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              { label: 'MacBook Repair', href: '/macbook-repair' },
              { label: 'MacBook Not Turning On', href: '/macbook-not-turning-on' },
              { label: 'Logic Board Repair', href: '/logic-board-repair' },
              { label: 'Battery Replacement', href: '/macbook-repair/battery' },
              { label: 'Liquid Damage Repair', href: '/liquid-damage' },
            ].map(link => (
              <Link key={link.href} href={link.href} className="block p-3 rounded-lg bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] text-[#7A9E98] hover:text-[#0FEA7A] hover:border-[#0FEA7A] text-sm transition-colors">
                {link.label} →
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── WhatsApp CTA ── */}
      <section className="py-16 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-[rgba(39,80,77,0.3)] border border-[rgba(15,234,122,0.2)] rounded-3xl p-10">
            <h2
              className="text-3xl font-extrabold text-[#E8F4F1] mb-3"
              style={{ fontFamily: 'Syne, sans-serif' }}
            >
              MacBook Not Charging?
            </h2>
            <p className="text-[#7A9E98] mb-2">
              Free assessment. No Fix No Fee. warranty.
            </p>
            <p className="text-[#7A9E98] text-sm mb-8">Hyde Park, Johannesburg — or we collect from you.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 transition-all"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp Us Now
              </a>
              <a
                href={`tel:${CONTACT.phoneTel}`}
                className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all"
              >
                <Phone className="w-5 h-5" /> Call {CONTACT.phone}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
