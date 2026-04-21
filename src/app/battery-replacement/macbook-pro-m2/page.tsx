import type { Metadata } from 'next';
import Link from 'next/link';
import { Suspense } from 'react';
import {
  Phone,
  ArrowRight,
  Battery,
  BatteryWarning,
  Zap,
  CheckCircle,
  Shield,
  AlertTriangle,
  MapPin,
  Cpu,
  Activity,
  Wrench,
} from 'lucide-react';
import SchemaOrg from '@/components/seo/SchemaOrg';
import { buildFaqSchema, buildBreadcrumbSchema, LOCAL_BUSINESS_PROVIDER } from '@/lib/schema';
import GoogleReviews from '@/components/ui/GoogleReviews';
import FAQAccordion from '@/components/ui/FAQ';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { CONTACT, SITE, buildWhatsAppUrl } from '@/lib/constants';
import PricingNote from '@/components/PricingNote';
import PricingRange from '@/components/PricingRange';

export const metadata: Metadata = {
  title: 'MacBook Pro M2 Battery Replacement Johannesburg [2026] | From R1,799 | ZA Support',
  description:
    'MacBook Pro M2 battery replacement Johannesburg from R1,799. 58.2Wh (13") / 70Wh (14") cells. Improved efficiency, same adhesive system. From R599 assessment. Hyde Park.',
  alternates: { canonical: 'https://zasupport.com/battery-replacement/macbook-pro-m2' },
  keywords: [
    'MacBook Pro M2 battery replacement Johannesburg',
    'MacBook Pro M2 battery replacement Hyde Park',
    'MacBook Pro M2 battery swollen Johannesburg',
    'MacBook Pro M2 battery cycle count',
    'MacBook Pro M2 13 inch battery replacement',
    'MacBook Pro M2 14 inch battery replacement',
    'Apple Silicon M2 MacBook Pro battery',
    'MacBook Pro M2 battery cost South Africa',
    'MacBook Pro M2 Pro Max battery replacement',
    'MacBook Pro M2 battery service Sandton',
  ],
};

/* ── Breadcrumbs ─────────────────────────────────────────────────────────── */
const breadcrumbItems = [
  { label: 'Battery Replacement', href: '/battery-replacement' },
  { label: 'MacBook Pro', href: '/battery-replacement/macbook-pro' },
  { label: 'M2' },
];

const breadcrumbSchemaItems = [
  { name: 'Home', url: 'https://zasupport.com' },
  { name: 'Battery Replacement', url: 'https://zasupport.com/battery-replacement' },
  { name: 'MacBook Pro', url: 'https://zasupport.com/battery-replacement/macbook-pro' },
  { name: 'MacBook Pro M2', url: 'https://zasupport.com/battery-replacement/macbook-pro-m2' },
];

/* ── Service Schema ──────────────────────────────────────────────────────── */
const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'MacBook Pro M2 Battery Replacement Johannesburg',
  description:
    'Professional MacBook Pro M2 battery replacement in Johannesburg. 58.2Wh (13-inch) and 70Wh (14-inch) cell replacement. Improved M2 efficiency, same adhesive removal system. From R1,799. From R599 assessment. Up-to-3 year warranty.',
  provider: LOCAL_BUSINESS_PROVIDER,
  areaServed: [
    { '@type': 'City', name: 'Johannesburg' },
    { '@type': 'Neighborhood', name: 'Hyde Park' },
    { '@type': 'Neighborhood', name: 'Sandton' },
    { '@type': 'Neighborhood', name: 'Rosebank' },
  ],
  serviceType: 'Battery Replacement',
  offers: {
    '@type': 'AggregateOffer',
    lowPrice: '2599',
    highPrice: '5700',
    priceCurrency: 'ZAR',
    offerCount: '4',
  },
  availableChannel: [
    { '@type': 'ServiceChannel', serviceUrl: 'https://wa.me/27645295863', serviceType: 'WhatsApp' },
    { '@type': 'ServiceChannel', servicePhone: '+27645295863', serviceType: 'Phone' },
  ],
};

/* ── Pricing Table ───────────────────────────────────────────────────────── */
const pricingRows = [
  { model: 'MacBook Pro 13″ M2 (2022)', battery: '58.2 Wh', from: 'R1,799', turnaround: '2–4 hrs' },
  { model: 'MacBook Pro 14″ M2 Pro (2023)', battery: '70 Wh', from: 'R2,299', turnaround: '4–6 hrs' },
  { model: 'MacBook Pro 14″ M2 Max (2023)', battery: '70 Wh', from: 'R2,299', turnaround: '4–6 hrs' },
  { model: 'MacBook Pro 16″ M2 Pro (2023)', battery: '100 Wh', from: 'R2,299', turnaround: '4–6 hrs' },
  { model: 'MacBook Pro 16″ M2 Max (2023)', battery: '100 Wh', from: 'R2,299', turnaround: '4–6 hrs' },
];

/* ── Fault Types ─────────────────────────────────────────────────────────── */
const faultTypes = [
  {
    title: 'Reduced Runtime Despite Full Charge',
    icon: Battery,
    desc: 'The M2 chip brought genuine efficiency improvements over M1 — the MacBook Pro M2 13-inch was rated for up to 20 hours of video playback, matching the M1 despite an identical 58.2 Wh cell. If your M2 is now managing only 6 to 8 hours of productive work, the battery capacity has likely degraded below 80%. The M2 is efficient enough that even a 75% capacity cell still delivers acceptable runtime — but once it drops below 70%, the experience becomes noticeably worse. We confirm capacity with coconutBattery before quoting and provide a written readout at collection.',
    severity: 'medium',
  },
  {
    title: 'Swollen Battery — Trackpad Bulge (13-inch)',
    icon: AlertTriangle,
    desc: 'The M2 13-inch MacBook Pro uses the same physical chassis as the M1 13-inch and the same dual-cell 58.2 Wh battery arrangement beneath the trackpad. Swelling presents identically: increased trackpad click resistance progressing to a completely stiff trackpad, with the bottom case sometimes bowing visibly when viewed from the side. South African summer temperatures above 35°C in Johannesburg accelerate the off-gassing process. This is an urgent repair — do not continue using a MacBook Pro with a swollen battery or store it in a confined bag.',
    severity: 'high',
  },
  {
    title: 'Unexpected Shutdown at Low Charge',
    icon: Zap,
    desc: 'MacBook Pro M2 machines that shut down at 10–25% displayed charge have a battery management unit (BMU) calibration problem. As the lithium-polymer cells age, the discharge voltage curve at a given charge level diverges from the factory-stored calibration. The BMU triggers a protective shutdown to prevent deep discharge damage to the logic board. The machine typically restarts immediately when plugged in. We run a full discharge profile test to distinguish this from a software issue, a corrupted SMC state, or a logic board power rail fault before quoting.',
    severity: 'medium',
  },
  {
    title: 'MagSafe Charging Interrupted',
    icon: Activity,
    desc: 'A degraded M2 battery with uneven cell voltages can cause USB-C power delivery negotiation failures. You will see the MagSafe LED flickering amber, the charge percentage not advancing, or the charger disconnecting and reconnecting audibly every few seconds. This is a battery-side fault in the majority of M2 cases we see — not a faulty charger. We verify this by running the machine on USB-C from a known-good charger and monitoring the power delivery log. After battery replacement, we run MagSafe and both USB-C ports through a charging verification cycle.',
    severity: 'medium',
  },
  {
    title: 'Load Shedding Cycle Accumulation',
    icon: BatteryWarning,
    desc: 'The M2 MacBook Pro was released in 2022 and 2023 — machines that were purchased during some of South Africa\'s heaviest load shedding periods. Stage 6 shedding in 2023 delivered up to 12 power interruptions per day for extended periods. Each interruption added partial charge cycles. We see M2 units in our workshop that were purchased in early 2023 and are already past 600 cycles due to this factor alone. A quality UPS is the only effective mitigation, and we recommend one for any Mac owner in Johannesburg who uses their machine on mains power daily.',
    severity: 'low',
  },
  {
    title: 'Adhesive Failure — Loose Battery',
    icon: Wrench,
    desc: 'Apple uses the same adhesive pull-tab system on the M2 as on all MacBook Pros from 2015 onwards. In a small percentage of M2 machines, the adhesive bond between the battery cell and the top case loses strength — particularly in machines that have run hot consistently. A loose battery creates a faint rattle when the machine is moved, or intermittent disconnection under vibration. We re-secure loose batteries using approved adhesive and verify connector continuity before reassembly. This is a minor fault but worth addressing to prevent intermittent shutdowns.',
    severity: 'low',
  },
];

const severityColours: Record<string, string> = {
  high: 'border-[rgba(245,87,54,0.25)] bg-[rgba(245,87,54,0.04)]',
  medium: 'border-[rgba(245,166,35,0.25)] bg-[rgba(245,166,35,0.04)]',
  low: 'border-[rgba(15,234,122,0.2)] bg-[rgba(15,234,122,0.04)]',
};

const severityBadgeColours: Record<string, string> = {
  high: 'text-[#F55736] bg-[rgba(245,87,54,0.1)]',
  medium: 'text-[#F5A623] bg-[rgba(245,166,35,0.1)]',
  low: 'text-[#0FEA7A] bg-[rgba(15,234,122,0.1)]',
};

const severityLabels: Record<string, string> = {
  high: 'Urgent',
  medium: 'Common',
  low: 'Minor',
};

/* ── FAQs ────────────────────────────────────────────────────────────────── */
const faqs = [
  {
    question: 'How much does MacBook Pro M2 battery replacement cost in Johannesburg?',
    answer:
      'MacBook Pro M2 13-inch battery replacement starts from R1,799 at our Hyde Park workshop. The M2 Pro and M2 Max 14-inch and 16-inch models start from R2,299 due to their larger cells (70 Wh and 100 Wh respectively) and the additional adhesive sections. The Apple Store charges R3,500 to R8,000 for the same service. Our price includes the replacement cell, all labour, calibration, and a written warranty of up to 3 years. The assessment fee (from R599) is applied toward the repair cost if you proceed.',
  },
  {
    question: 'What is the battery capacity of the MacBook Pro M2?',
    answer:
      'The MacBook Pro 13-inch M2 (2022) uses a 58.2 Wh lithium-polymer battery — identical capacity to the M1 13-inch. The MacBook Pro 14-inch M2 Pro and M2 Max (2023) use a 70 Wh cell, a small increase from the M1 Pro/Max 14-inch (69.6 Wh). The MacBook Pro 16-inch M2 Pro and M2 Max (2023) use a 100 Wh cell — at the aviation limit and the largest standard battery in any MacBook Pro. All three variants are in stock at our Hyde Park workshop.',
  },
  {
    question: 'Is the M2 MacBook Pro battery better than the M1?',
    answer:
      'The M2 chip is more efficient than M1, meaning it extracts more runtime from the same cell capacity. The 13-inch M2 uses the same 58.2 Wh cell as the M1 but delivers slightly longer runtime due to the chip efficiency improvement. The 14-inch M2 Pro moved from 69.6 Wh to 70 Wh — a minor increase. The 16-inch M2 stepped up to exactly 100 Wh from 99.6 Wh. In terms of physical construction — adhesive system, cell chemistry, and removal procedure — the M2 battery is effectively the same as the M1 battery and presents the same replacement considerations.',
  },
  {
    question: 'My MacBook Pro M2 shows "Service Recommended" — what does this mean?',
    answer:
      'macOS displays "Service Recommended" in the battery menu bar icon when the battery capacity has dropped below 80% of its original design capacity. On an M2 MacBook Pro, this threshold represents a genuine reduction in runtime and reliability. At 80% capacity, an M2 13-inch that originally lasted 20 hours now delivers approximately 16 hours. Below 70%, you are at 14 hours and unexpected shutdowns at low charge levels become common. "Service Recommended" is macOS telling you the battery has reached end-of-service — replacement is the correct action.',
  },
  {
    question: 'Does load shedding affect MacBook Pro M2 battery health in South Africa?',
    answer:
      'Yes, and M2 owners who purchased their machines in 2022 or 2023 — during South Africa\'s worst load shedding periods — are particularly affected. Stage 6 shedding in 2023 added up to 12 partial charge cycles per day. We see M2 MacBook Pros in our workshop with 500–700 cycles already, purchased less than two years ago, purely because of power interruptions. A quality UPS maintains clean AC power during shedding and eliminates these additional cycles entirely. This is the most cost-effective way to protect your M2 investment.',
  },
  {
    question: 'How long does MacBook Pro M2 battery replacement take?',
    answer:
      'MacBook Pro M2 13-inch takes 2 to 4 hours. The M2 Pro and M2 Max 14-inch and 16-inch models take 4 to 6 hours — the larger adhesive surface area requires more careful removal. Same-day service is available for all M2 models when booked before 14:00. WhatsApp us to confirm slot availability and get a price before bringing the machine in.',
  },
  {
    question: 'Will battery replacement on an M2 MacBook Pro reset the cycle count?',
    answer:
      'Yes. After professional battery replacement on an M2 MacBook Pro, the battery management unit registers the new cell. System Settings shows battery health at 100%, and System Information shows a cycle count at or near 0. The "Service Recommended" notice clears. We issue a System Information screenshot at collection confirming these values as your warranty baseline.',
  },
  {
    question: 'Can you replace the battery in both M2 Pro and M2 Max models?',
    answer:
      'Yes. The M2 Pro and M2 Max share the same physical chassis and battery on both 14-inch and 16-inch models. The chip configuration (M2, M2 Pro, or M2 Max) does not affect the battery replacement procedure. The 14-inch uses a 70 Wh cell regardless of chip tier, and the 16-inch uses a 100 Wh cell regardless of chip tier. We confirm your exact model identifier before ordering the replacement cell to ensure a correct match.',
  },
  {
    question: 'Is the M2 MacBook Pro battery procedure different from M1?',
    answer:
      'The core procedure is identical: pentalobe bottom case screws, battery connector disconnection, stretch-release adhesive tab removal using controlled heat and solvent, cell installation, and calibration. Apple made no fundamental changes to the battery mounting system between M1 and M2 generations. The 14-inch and 16-inch M2 models share the same chassis design as their M1 predecessors, so our documented M1 Pro/Max battery procedure applies directly to M2 Pro/Max as well.',
  },
  {
    question: 'What warranty do you offer on M2 MacBook Pro battery replacement?',
    answer:
      'MacBook Pro M2 battery replacements at ZA Support carry a written warranty of up to 3 years. The warranty covers the replacement cell and our workmanship. If the battery fails within the warranty period — dropping below 80% capacity or developing any electrical fault — we replace it again at from R599. The warranty is issued in writing at collection. From R599 assessment: if our assessment determines the battery is not the cause of your fault, you pay only R599 and your machine is returned unchanged.',
  },
];

/* ── Structured Data ─────────────────────────────────────────────────────── */
const faqSchema = buildFaqSchema(faqs);
const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbSchemaItems);

/* ── Page Component ──────────────────────────────────────────────────────── */
export default function BatteryReplacementMacBookProM2Page() {
  const whatsappUrl = buildWhatsAppUrl('BAT-PRO-M2-HERO', 'battery');

  return (
    <>
      <SchemaOrg schema={serviceSchema} />
      <SchemaOrg schema={faqSchema} />
      <SchemaOrg schema={breadcrumbSchema} />

      {/* Hero */}
      <section className="hero-gradient grid-overlay pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={breadcrumbItems} />
          <div className="mt-8 max-w-4xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#E8F4F1] leading-tight mb-6">
              MacBook Pro M2 Battery Replacement
              <br /><span className="text-[#0FEA7A]">Johannesburg</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-4 max-w-3xl leading-relaxed">
              Second-generation Apple Silicon — 58.2 Wh (13&quot;), 70 Wh (14&quot;), or 100 Wh (16&quot;) cell replacement at our Hyde Park workshop. M2 efficiency + load shedding micro-cycles = faster battery wear than most owners expect. Pro 13&quot; from R1,799. Pro 14&quot;/16&quot; from R2,299.
            </p>
            <div className="flex items-center gap-2 text-[#7A9E98] text-sm mb-8">
              <MapPin className="w-4 h-4 text-[#0FEA7A]" />
              <span>1 Hyde Lane, Hyde Park, Office E2004, JHB 2196 | M2 13″ from R1,799 | M2 14″/16″ from R2,299</span>
            </div>
            <div className="flex flex-wrap gap-3 mb-8">
              {[
                { icon: Shield, label: 'From R599 assessment' },
                { icon: Battery, label: 'All M2 Models' },
                { icon: Zap, label: 'Assessment from R599' },
                { icon: CheckCircle, label: 'Up to 3 Year Warranty' },
                { icon: AlertTriangle, label: 'Swollen Battery Specialist' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 bg-[rgba(15,234,122,0.08)] border border-[rgba(15,234,122,0.15)] px-3 py-2 rounded-full">
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
                href="/battery-replacement/macbook-pro"
                className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.2)] text-[#7A9E98] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[rgba(15,234,122,0.05)] transition-all"
              >
                All MacBook Pro Battery <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
            <div className="flex flex-wrap gap-6 mt-8 pt-6 border-t border-[rgba(255,255,255,0.06)]">
              {[
                { value: '800+', label: 'M2 Batteries Replaced' },
                { value: SITE.yearsExperience + ' Years', label: 'In Business Since 2009' },
                { value: SITE.rating + '/5', label: SITE.reviewCount + ' Google Reviews' },
                { value: 'Up to 3 Yrs', label: 'Battery Warranty' },
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
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4">MacBook Pro M2 Battery Replacement Pricing</h2>
          <p className="text-[#7A9E98] mb-8 max-w-3xl leading-relaxed">
            Starting prices include the replacement cell, labour, calibration, and our written warranty. Apple charges R3,500 to R8,000 for the equivalent service — and sometimes replaces the entire top case assembly rather than the battery alone. We replace the battery cells only.
          </p>
          <div className="overflow-x-auto rounded-2xl border border-[rgba(255,255,255,0.06)]">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[rgba(255,255,255,0.08)] bg-[rgba(15,234,122,0.06)]">
                  <th className="text-left text-[#E8F4F1] font-semibold px-5 py-4">Model</th>
                  <th className="text-left text-[#E8F4F1] font-semibold px-5 py-4">Battery Capacity</th>
                  <th className="text-left text-[#0FEA7A] font-semibold px-5 py-4">From</th>
                  <th className="text-left text-[#E8F4F1] font-semibold px-5 py-4">Turnaround</th>
                </tr>
              </thead>
              <tbody>
                {pricingRows.map((row, i) => (
                  <tr key={row.model} className={`border-b border-[rgba(255,255,255,0.04)] ${i % 2 === 0 ? 'bg-[#0A1A18]' : 'bg-[#111C1A]'}`}>
                    <td className="text-[#E8F4F1] px-5 py-4 font-medium">{row.model}</td>
                    <td className="text-[#7A9E98] px-5 py-4">{row.battery}</td>
                    <td className="text-[#0FEA7A] px-5 py-4 font-bold">{row.from}</td>
                    <td className="text-[#7A9E98] px-5 py-4">{row.turnaround}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-[#7A9E98] text-xs mt-4">
            All prices include the replacement cell, labour, calibration, and our up-to-3 year warranty. Assessment from R599 — applied toward the repair cost if you proceed. From R599 assessment applies on all cases.
          </p>
          <PricingRange page="/battery-replacement/macbook-pro-m2" />
          <PricingNote variant="inline" />
        </div>
      </section>

      {/* Technical Detail */}
      <section className="py-10 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4">MacBook Pro M2 Battery — Technical Overview</h2>
          <div className="space-y-4 text-[#7A9E98] leading-relaxed">
            <p>
              The MacBook Pro M2 arrived in June 2022 (13-inch) and January 2023 (14-inch and 16-inch). Apple made no changes to the physical battery capacity for the 13-inch — it retained the 58.2 Wh cell from the M1 — but the M2 chip&apos;s improved energy efficiency extended the rated runtime. The 14-inch moved from 69.6 Wh to 70 Wh, a marginal increase. The 16-inch stepped up from 99.6 Wh to exactly 100 Wh, placing it precisely at the ICAO aviation carry-on limit for lithium batteries.
            </p>
            <p>
              From a service perspective, the M2 battery mounting system is identical to the M1. Apple did not change the adhesive pull-tab layout, the battery connector design, or the bottom case fastener count between generations on the same chassis. This means the removal procedure we developed for M1 Pro and M1 Max models applies directly to M2 Pro and M2 Max. For clients with the M2 13-inch, the procedure is identical to the M1 13-inch — a dual-cell array beneath the trackpad, four adhesive pull-tabs, and a single battery connector.
            </p>
            <p>
              What is genuinely different about M2 MacBook Pro battery service in South Africa is the timing. M2 machines were purchased primarily during 2022 and 2023 — a period when Eskom load shedding reached Stage 6 for extended intervals in Johannesburg. During Stage 6, households experienced up to 12 power interruptions per day. Each interruption added partial charge cycles. We have tracked M2 units purchased in early 2023 that already show 500 to 700 cycles by early 2026. A machine rated for 1,000 cycles at 15 to 18 months into its life, depending on usage patterns during Stage 6, could realistically reach end-of-battery within three years of purchase.
            </p>
            <p>
              In our Hyde Park workshop, we diagnose M2 battery condition using coconutBattery before every replacement. We capture the current capacity, cycle count, charge temperature history, and cell voltage balance. This data goes into our repair record and the client receives a copy. After replacement, we run the same diagnostic to confirm the new cell registers correctly — typically 99 to 100% maximum capacity and a cycle count between 0 and 3 depending on the calibration cycle run time.
            </p>
            <p>
              The most common presenting fault on M2 MacBook Pros we see is not swelling — it is reduced runtime accompanied by "Service Recommended" in the battery menu bar. M2 owners often tolerate degraded runtime for many months before acting, partly because the M2 is efficient enough that a 75% capacity cell still delivers reasonable day-to-day performance. Our recommendation is to replace the battery when you see consistent readings below 80% capacity, rather than waiting for swelling or unexpected shutdowns to occur.
            </p>
          </div>
          <div className="mt-6">
            <a
              href="https://www.ifixit.com/Device/MacBook_Pro_13%22_Two_Thunderbolt_Ports_2022"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[#0FEA7A] text-sm font-semibold hover:underline"
            >
              iFixit MacBook Pro M2 battery guide <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Battery Fault Types */}
      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4">MacBook Pro M2 Battery Faults We Repair</h2>
          <p className="text-[#7A9E98] mb-10 max-w-3xl leading-relaxed">
            M2 MacBook Pros are reaching battery end-of-life in growing numbers in our workshop. Each fault below is confirmed through diagnostic before any repair is quoted.
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {faultTypes.map((fault) => (
              <div key={fault.title} className={`rounded-2xl border p-6 ${severityColours[fault.severity]}`}>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <fault.icon className="w-5 h-5 text-[#0FEA7A] flex-shrink-0" />
                    <h3 className="text-[#E8F4F1] font-bold text-lg">{fault.title}</h3>
                  </div>
                  <span className={`flex-shrink-0 text-xs font-semibold px-2.5 py-1 rounded-full ${severityBadgeColours[fault.severity]}`}>
                    {severityLabels[fault.severity]}
                  </span>
                </div>
                <p className="text-[#7A9E98] text-sm leading-relaxed">{fault.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 p-5 rounded-xl border border-[rgba(15,234,122,0.15)] bg-[rgba(15,234,122,0.04)] flex items-start gap-4">
            <Shield className="w-5 h-5 text-[#0FEA7A] flex-shrink-0 mt-0.5" />
            <p className="text-[#7A9E98] text-sm leading-relaxed">
              Every repair is quoted before work begins. Our From R599 assessment policy means that if we assess your MacBook Pro M2 and determine a battery replacement will not resolve your issue, an assessment fee of R599 applies and your machine is returned unchanged. Up-to-3 year warranty on all completed battery replacements.
            </p>
          </div>
        </div>
      </section>

      {/* Apple vs ZA Support */}
      <section className="py-10 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-4">Apple Store vs ZA Support: MacBook Pro M2 Battery</h2>
          <p className="text-[#7A9E98] mb-8 leading-relaxed">
            Apple&apos;s service approach on M2 Pro and M2 Max models sometimes involves replacing the entire top case assembly — keyboard, trackpad, and battery as one unit — rather than the battery cells alone. We replace the battery only.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="glass-card p-6 border border-red-500/20">
              <h3 className="text-red-400 font-bold mb-4">Apple Store / iStore</h3>
              <ul className="text-[#7A9E98] text-sm space-y-2.5">
                <li>Top case assembly on some models — R3,500 to R8,000+</li>
                <li>Turnaround 5–10 business days via Apple depot</li>
                <li>No M2-specific capacity report shared with client</li>
                <li>AppleCare+ required for reduced pricing</li>
                <li>Keyboard and trackpad replaced unnecessarily</li>
                <li>Stage 4/6 load shedding impact not factored in advice</li>
              </ul>
            </div>
            <div className="glass-card p-6 border border-[rgba(15,234,122,0.3)]">
              <h3 className="text-[#0FEA7A] font-bold mb-4">ZA Support</h3>
              <ul className="text-[#7A9E98] text-sm space-y-2.5">
                <li>Battery cells only — keyboard and trackpad untouched</li>
                <li>M2 13″ from R1,799 | M2 14″/16″ from R2,299</li>
                <li>coconutBattery diagnostic — capacity report included</li>
                <li>Turnaround 2–6 hours same day</li>
                <li>UPS advice for load shedding battery protection</li>
                <li>Up-to-3 year warranty on the replacement cell</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Service Process */}
      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-8">Our MacBook Pro M2 Battery Replacement Process</h2>
          <div className="space-y-6">
            {[
              {
                step: 1,
                title: 'Drop Off & Diagnostic',
                desc: 'Walk in to our Hyde Park workshop — no appointment needed. We run a full M2 battery diagnostic: cycle count, maximum capacity, cell voltage balance, charging circuit health via coconutBattery and System Information. Written quote within 20 minutes.',
              },
              {
                step: 2,
                title: 'Bottom Case Removal & Adhesive Release',
                desc: 'We remove the pentalobe bottom case screws, disconnect the battery connector, and release the adhesive pull-tabs using controlled heat (max 50°C) and adhesive solvent at the cell seams. Non-conductive plastic pry tools only — no metal near the battery pouch.',
              },
              {
                step: 3,
                title: 'Replacement Cell Verification',
                desc: 'The replacement M2 cell is tested for open-circuit voltage, capacity, and cell balance before installation. Capacity is verified against OEM specification: 58.2 Wh, 70 Wh, or 100 Wh depending on your model.',
              },
              {
                step: 4,
                title: 'Calibration & Charging Verification',
                desc: 'Full charge-discharge cycle with macOS open. Battery health confirmed at 100% in System Settings. Cycle count at 0–1. MagSafe and both USB-C ports verified for clean power acceptance. Thermal monitoring throughout.',
              },
              {
                step: 5,
                title: 'Collect With Written Warranty',
                desc: 'You collect with a written warranty of up to 3 years, a System Information screenshot confirming battery health, and the assessment fee included in the total. If the battery fails within the warranty period, we replace it again at from R599.',
              },
            ].map(({ step, title, desc }) => (
              <div key={step} className="flex gap-5">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[rgba(15,234,122,0.1)] border border-[rgba(15,234,122,0.25)] flex items-center justify-center">
                  <span className="text-[#0FEA7A] font-bold text-sm">{step}</span>
                </div>
                <div>
                  <h3 className="text-[#E8F4F1] font-bold mb-1">{title}</h3>
                  <p className="text-[#7A9E98] text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Area */}
      <section className="py-10 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-4">MacBook Pro M2 Battery — Johannesburg Service Area</h2>
          <p className="text-[#7A9E98] mb-6 leading-relaxed">
            Our Hyde Park workshop is 10 to 20 minutes from most northern Johannesburg suburbs. Collection and return available from Sandton, Rosebank, Bryanston, Fourways, Midrand, Randburg, Morningside, and Rivonia.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-6">
            {[
              'Sandton', 'Rosebank', 'Bryanston', 'Fourways',
              'Midrand', 'Randburg', 'Morningside', 'Rivonia',
              'Sunninghill', 'Houghton', 'Parkhurst', 'Hyde Park',
            ].map((suburb) => (
              <div key={suburb} className="flex items-center gap-2 bg-[rgba(15,234,122,0.05)] border border-[rgba(15,234,122,0.1)] rounded-xl px-4 py-3">
                <MapPin className="w-3.5 h-3.5 text-[#0FEA7A] flex-shrink-0" />
                <span className="text-[#E8F4F1] text-sm">{suburb}</span>
              </div>
            ))}
          </div>
          <p className="text-[#7A9E98] text-sm">
            Also covering Kempton Park, Pretoria, and Centurion by arrangement.{' '}
            <Link href="/battery-replacement/sandton" className="text-[#0FEA7A] hover:underline">
              Sandton battery replacement →
            </Link>
          </p>
        </div>
      </section>

      {/* Google Reviews */}
      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Suspense fallback={null}>
            <GoogleReviews />
          </Suspense>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-10 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQAccordion items={faqs} title="MacBook Pro M2 Battery Replacement — Common Questions" />
        </div>
      </section>

      {/* Related Services */}
      <section className="py-8 sm:py-16 bg-[#111C1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#E8F4F1] mb-6">Related Repairs</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              { label: 'All Battery Replacements', href: '/battery-replacement' },
              { label: 'MacBook Pro Battery', href: '/battery-replacement/macbook-pro' },
              { label: 'MacBook Pro M1 Battery', href: '/battery-replacement/macbook-pro-m1' },
              { label: 'MacBook Pro M3 Battery', href: '/battery-replacement/macbook-pro-m3' },
              { label: 'MacBook Pro 14″ Battery', href: '/battery-replacement/macbook-pro-14-inch' },
              { label: 'Logic Board Repair', href: '/logic-board-repair' },
              { label: 'MacBook Pro Logic Board', href: '/logic-board-repair/macbook-pro' },
              { label: 'Contact Us', href: '/contact' },
            ].map((link) => (
              <Link key={link.href} href={link.href} className="glass-card p-4 text-center group">
                <span className="text-[#E8F4F1] text-sm font-semibold group-hover:text-[#0FEA7A] transition-colors">{link.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-8 sm:py-16 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-[rgba(39,80,77,0.3)] border border-[rgba(15,234,122,0.2)] rounded-3xl p-10">
            <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3">MacBook Pro M2 Battery Issue? Book a Diagnostic.</h2>
            <p className="text-[#7A9E98] mb-6 max-w-xl mx-auto leading-relaxed">
              WhatsApp us a description of the fault — reduced runtime, unexpected shutdowns, swollen battery, or "Service Recommended" — and we will give you an honest price range before you bring the machine in.  Assessment from R599, applied toward the repair if you proceed.
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
              1 Hyde Lane, Hyde Park, Office E2004, JHB 2196 | M2 13″ from R1,799 | M2 14″/16″ from R2,299 | Up-to-3 year warranty
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
