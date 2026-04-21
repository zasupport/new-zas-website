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
  title: 'MacBook Pro M3 Battery Replacement Johannesburg [2026] | From R2,299 | ZA Support',
  description:
    'MacBook Pro M3 battery replacement Johannesburg from R2,299. 72.4Wh (14") / 100Wh (16") latest-gen cells. Longest rated life. From R599 assessment. Hyde Park workshop.',
  alternates: { canonical: 'https://zasupport.com/battery-replacement/macbook-pro-m3' },
  keywords: [
    'MacBook Pro M3 battery replacement Johannesburg',
    'MacBook Pro M3 battery replacement Hyde Park',
    'MacBook Pro M3 battery swollen Johannesburg',
    'MacBook Pro M3 Pro Max battery replacement',
    'MacBook Pro M3 14 inch battery replacement',
    'MacBook Pro M3 16 inch battery replacement',
    'Apple Silicon M3 MacBook Pro battery',
    'MacBook Pro M3 battery cost South Africa',
    'MacBook Pro M3 battery service Sandton',
    'latest MacBook Pro battery replacement Johannesburg',
  ],
};

/* ── Breadcrumbs ─────────────────────────────────────────────────────────── */
const breadcrumbItems = [
  { label: 'Battery Replacement', href: '/battery-replacement' },
  { label: 'MacBook Pro', href: '/battery-replacement/macbook-pro' },
  { label: 'M3' },
];

const breadcrumbSchemaItems = [
  { name: 'Home', url: 'https://zasupport.com' },
  { name: 'Battery Replacement', url: 'https://zasupport.com/battery-replacement' },
  { name: 'MacBook Pro', url: 'https://zasupport.com/battery-replacement/macbook-pro' },
  { name: 'MacBook Pro M3', url: 'https://zasupport.com/battery-replacement/macbook-pro-m3' },
];

/* ── Service Schema ──────────────────────────────────────────────────────── */
const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'MacBook Pro M3 Battery Replacement Johannesburg',
  description:
    'Professional MacBook Pro M3 battery replacement in Johannesburg. 72.4Wh (14-inch) and 100Wh (16-inch) latest-generation cell replacement. From R2,299. From R599 assessment. Up-to-3 year warranty.',
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
  { model: 'MacBook Pro 14″ M3 (Late 2023)', battery: '72.4 Wh', from: 'R2,299', turnaround: '4–6 hrs' },
  { model: 'MacBook Pro 14″ M3 Pro (Late 2023)', battery: '72.4 Wh', from: 'R2,299', turnaround: '4–6 hrs' },
  { model: 'MacBook Pro 14″ M3 Max (Late 2023)', battery: '72.4 Wh', from: 'R2,299', turnaround: '4–6 hrs' },
  { model: 'MacBook Pro 16″ M3 Pro (Late 2023)', battery: '100 Wh', from: 'R2,299', turnaround: '4–6 hrs' },
  { model: 'MacBook Pro 16″ M3 Max (Late 2023)', battery: '100 Wh', from: 'R2,299', turnaround: '4–6 hrs' },
];

/* ── Fault Types ─────────────────────────────────────────────────────────── */
const faultTypes = [
  {
    title: 'Early-Stage Capacity Decline',
    icon: Battery,
    desc: 'The M3 MacBook Pro is the most recent generation and was released in late 2023, meaning even the earliest units are approximately two years old. Apple rates the M3 battery for 1,000 cycles, and a machine with normal daily use in South Africa may accumulate 300 to 500 cycles in this period — particularly if load shedding has added partial cycles. We see M3 units in our workshop presenting at 88–92% capacity. While still within the "Normal" range, if you are experiencing noticeably reduced runtime from what was rated at purchase, a battery health assessment is worthwhile.',
    severity: 'low',
  },
  {
    title: 'Swollen Battery — Urgent Repair',
    icon: AlertTriangle,
    desc: 'Swelling on M3 14-inch and 16-inch MacBook Pros presents differently from the 13-inch models because the battery does not sit directly beneath the trackpad. Instead, the 72.4 Wh cell in the 14-inch spans the central section of the lower case. Swelling on these models causes visible bowing of the bottom case aluminium and may interfere with the bottom case retention clips. This is an urgent fault — a swollen M3 battery should be removed in a controlled workshop environment without delay. We handle M3 swollen battery cases with full decompression protocol.',
    severity: 'high',
  },
  {
    title: 'Unexpected Shutdown Under Load',
    icon: Zap,
    desc: 'M3 Pro and M3 Max machines are capable of sustained high-performance workloads — ProRes video rendering, Xcode compilation, 3D modelling. These loads draw significantly more current from the battery than light office use. A degraded cell with uneven voltage distribution can trigger a protective shutdown under high current demand even when the displayed charge level reads 20% or more. We distinguish this from a logic board power fault using a load test while monitoring battery voltage and current output. If the battery is the cause, replacement resolves this immediately.',
    severity: 'medium',
  },
  {
    title: 'MagSafe Charging Not Detected',
    icon: Activity,
    desc: 'A small number of M3 MacBook Pro users report MagSafe not charging — the LED does not light or shows amber with from R599 progress. In the majority of cases we investigate, the fault is with the USB-C port or MagSafe connector rather than the battery. However, a severely degraded battery drawing excessive current at low state of charge can also manifest as a charging detection fault. We test both the MagSafe connector and the battery independently before attributing a cause. If the battery is degraded, replacement resolves the charging fault in most cases.',
    severity: 'medium',
  },
  {
    title: 'Load Shedding Micro-Cycle Impact',
    icon: BatteryWarning,
    desc: 'M3 MacBook Pro owners who purchased their machines in late 2023 or early 2024 are not yet experiencing severe battery degradation from normal use. However, South African customers who used their machines through Stage 4 or Stage 6 load shedding in 2023 may have accumulated partial cycles faster than users in other countries. Each power interruption forces a battery-to-mains transition. We track this in our client data and can provide an accurate cycle accumulation estimate based on your usage patterns and location in Johannesburg.',
    severity: 'low',
  },
  {
    title: 'Battery Adhesive — Thermal Stress',
    icon: Wrench,
    desc: 'The M3 Pro and M3 Max are thermally efficient but can run warm during sustained workloads. The adhesive used to bond the 72.4 Wh cell in the 14-inch M3 to the top case is rated for normal operating temperatures. Machines that have been consistently pushed to high thermals — sustained video encoding, multi-hour Xcode builds — can develop adhesive bond weakening over time. A loose battery creates intermittent connectivity under vibration. We inspect the adhesive bond during every M3 battery assessment at no additional charge.',
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
    question: 'How much does MacBook Pro M3 battery replacement cost in Johannesburg?',
    answer:
      'MacBook Pro M3 battery replacement starts from R2,299 at our Hyde Park workshop. The M3, M3 Pro, and M3 Max all use the same cell per chassis size: 72.4 Wh in the 14-inch and 100 Wh in the 16-inch. The Apple Store charges R4,000 to R8,000 for M3 battery replacement — and given how new these models are, may only service them under AppleCare+. Our R2,299 price includes the replacement cell, all labour, calibration, and a written warranty of up to 3 years. Assessment from R599, applied toward the repair cost if you proceed.',
  },
  {
    question: 'What is the battery capacity of the MacBook Pro M3?',
    answer:
      'The MacBook Pro 14-inch with M3, M3 Pro, or M3 Max (Late 2023) uses a 72.4 Wh lithium-polymer battery — a meaningful increase from the M1/M2 14-inch at 69.6–70 Wh. The MacBook Pro 16-inch M3 Pro and M3 Max uses a 100 Wh cell, identical in rated capacity to the M2 16-inch. Apple rates all M3 batteries for 1,000 charge cycles. The increased 14-inch capacity, combined with the M3 chip efficiency improvements, contributes to the rated 22-hour battery life Apple quotes for the M3 Max 14-inch.',
  },
  {
    question: 'My MacBook Pro M3 is only two years old — can the battery already need replacement?',
    answer:
      'It is uncommon but not impossible. At two years of daily use, a well-maintained M3 MacBook Pro in a stable power environment should have 300 to 500 cycles and 90%+ capacity. However, if your machine was used through South Africa\'s Stage 4 or Stage 6 load shedding in 2023 without a UPS, you may have accumulated additional partial cycles. If you are noticing reduced runtime compared to purchase, check your cycle count in System Information. Above 400 cycles with capacity below 88% is worth investigating. We offer a battery assessment from R599 that confirms whether replacement is warranted.',
  },
  {
    question: 'Is the M3 battery different from the M2 battery in the same chassis?',
    answer:
      'Yes — the 14-inch M3 uses a larger 72.4 Wh cell compared to the M2 14-inch at 70 Wh. This is a physical difference that means M3 and M2 14-inch batteries are not interchangeable. The 16-inch is unchanged at 100 Wh across M2 and M3 generations, but the physical cell may differ in supplier specification. We verify the exact model identifier (A2992, A2991, A2780, etc.) before ordering replacement cells to ensure we supply the correct match for your specific machine.',
  },
  {
    question: 'Does load shedding affect M3 MacBook Pro battery health?',
    answer:
      'Yes. Although M3 machines are newer and have fewer total cycles than M1 or M2 units, South African M3 owners who experienced Stage 4 or Stage 6 load shedding in 2023 accumulated partial cycles faster than users in power-stable environments. Each power cut adds a battery-to-AC transition. Over six months of Stage 6 shedding, this can add 500 to 700 partial cycles on top of normal use. A UPS is the single most effective protection for your M3 investment.',
  },
  {
    question: 'How long does M3 MacBook Pro battery replacement take?',
    answer:
      'MacBook Pro M3 14-inch and 16-inch battery replacements take 4 to 6 hours including diagnostic, adhesive removal, cell installation, and calibration. The 72.4 Wh cell in the 14-inch has a larger adhesive footprint than the M1/M2 14-inch 69.6 Wh cell, requiring careful extraction to avoid top case damage. Same-day service is available when booked before 14:00. WhatsApp us to confirm slot availability.',
  },
  {
    question: 'Will replacing the M3 battery reset battery health to 100%?',
    answer:
      'Yes. After professional battery replacement on an M3 MacBook Pro, System Settings shows battery health at 100% and the cycle count resets to 0 or 1. The "Service Recommended" notice clears. We issue a System Information screenshot at collection confirming these values as your warranty baseline.',
  },
  {
    question: 'Can you replace the battery on M3, M3 Pro, and M3 Max models?',
    answer:
      'Yes. The M3, M3 Pro, and M3 Max share the same physical chassis and battery on both 14-inch and 16-inch models. The chip variant does not affect the battery replacement procedure. We replace batteries on all three M3 chip configurations across both chassis sizes.',
  },
  {
    question: 'What happens if my M3 battery is swollen — is this an emergency?',
    answer:
      'Yes, a swollen battery is an urgent repair. A lithium-polymer cell that is off-gassing and swelling contains flammable electrolyte under pressure. On the M3 14-inch and 16-inch, swelling causes visible bowing of the aluminium bottom case. Do not continue using a machine with a swollen battery, do not store it in a bag, and do not leave it near heat sources. Contact us immediately — we handle M3 swollen battery removals with full decompression protocol and can often accommodate same-day urgent appointments.',
  },
  {
    question: 'What warranty do you offer on M3 MacBook Pro battery replacements?',
    answer:
      'MacBook Pro M3 battery replacements at ZA Support carry a written warranty of up to 3 years. The warranty covers the replacement cell and our workmanship. If the battery fails within the warranty period — dropping below 80% capacity or developing any electrical fault — we replace it again at from R599. From R599 assessment: if our assessment determines the battery is not the cause of your fault, you pay only R599 and your machine is returned unchanged.',
  },
];

/* ── Structured Data ─────────────────────────────────────────────────────── */
const faqSchema = buildFaqSchema(faqs);
const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbSchemaItems);

/* ── Page Component ──────────────────────────────────────────────────────── */
export default function BatteryReplacementMacBookProM3Page() {
  const whatsappUrl = buildWhatsAppUrl('BAT-PRO-M3-HERO', 'battery');

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
              MacBook Pro M3 Battery Replacement
              <br /><span className="text-[#0FEA7A]">Johannesburg</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-4 max-w-3xl leading-relaxed">
              Third-generation Apple Silicon — 72.4 Wh (14&quot;) and 100 Wh (16&quot;) latest-generation cell replacement at our Hyde Park workshop. M3 Pro and M3 Max models covered. From R2,299. Same-day service available.
            </p>
            <div className="flex items-center gap-2 text-[#7A9E98] text-sm mb-8">
              <MapPin className="w-4 h-4 text-[#0FEA7A]" />
              <span>1 Hyde Lane, Hyde Park, Office E2004, JHB 2196 | M3 14″/16″ from R2,299</span>
            </div>
            <div className="flex flex-wrap gap-3 mb-8">
              {[
                { icon: Shield, label: 'From R599 assessment' },
                { icon: Battery, label: 'All M3 Models' },
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
                { value: '500+', label: 'M3 Batteries Replaced' },
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
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4">MacBook Pro M3 Battery Replacement Pricing</h2>
          <p className="text-[#7A9E98] mb-8 max-w-3xl leading-relaxed">
            Starting prices include the replacement cell, labour, calibration, and our written warranty. Apple charges R4,000 to R8,000+ for M3 battery service. We replace the battery cells only — not the entire top case assembly.
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
          <PricingRange page="/battery-replacement/macbook-pro-m3" />
          <PricingNote variant="inline" />
        </div>
      </section>

      {/* Technical Detail */}
      <section className="py-10 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4">MacBook Pro M3 Battery — Technical Overview</h2>
          <div className="space-y-4 text-[#7A9E98] leading-relaxed">
            <p>
              Apple released the MacBook Pro M3 family in October and November 2023. The lineup comprises the base M3 (14-inch only in this chassis), M3 Pro (14-inch and 16-inch), and M3 Max (14-inch and 16-inch). The 14-inch variants all share a 72.4 Wh lithium-polymer cell — a meaningful increase from the M2 14-inch at 70 Wh and the M1 14-inch at 69.6 Wh. The 16-inch variants retain the 100 Wh cell that has been standard across the M1, M2, and M3 generations.
            </p>
            <p>
              The M3 chip brings meaningful efficiency improvements over M2, particularly under sustained workloads. The M3 Max 14-inch is rated for 22 hours of Apple TV video playback — the longest rated battery life ever for a 14-inch MacBook Pro. In practice, under mixed professional workloads, clients report 10 to 14 hours of real-world use, which remains outstanding for a 14-inch machine. When battery capacity drops below 80%, this real-world figure scales proportionally — a 75% capacity M3 Max 14-inch delivers approximately 8 to 10 hours, which is when most owners begin to notice the degradation.
            </p>
            <p>
              From a repair perspective, the M3 battery adhesive system follows the same pull-tab design as M1 and M2 generations. However, the 72.4 Wh cell in the 14-inch is physically larger than the 70 Wh M2 cell — it spans a slightly larger footprint within the lower case and has a correspondingly larger adhesive bonding area. This means slightly more adhesive pull-tab surface to manage during extraction, and we add an additional 30 to 45 minutes to our quoted turnaround compared to M2 14-inch to account for this.
            </p>
            <p>
              For M3 Pro and M3 Max owners: these chips generate more heat under load than the base M3, and the thermal management system runs the fans more frequently. Prolonged high-load use at Johannesburg summer temperatures — which regularly reach 34 to 37°C in the northern suburbs — can accelerate the bond weakening between the adhesive pull-tabs and the top case. We inspect this bond during every M3 battery diagnostic and flag it if we detect movement before quoting.
            </p>
            <p>
              M3 MacBook Pro batteries that present at our Hyde Park workshop are most commonly brought in for one of two reasons: early capacity decline in machines used through load shedding, or swollen batteries from machines run in hot environments without adequate ventilation. The 22-hour rated life of the M3 Max 14-inch can also lead owners to tolerate degraded runtime longer than they should — if you have noticed your M3 Pro or M3 Max running for significantly less than the rated hours, a capacity check is worthwhile before the machine reaches the "Service Recommended" threshold.
            </p>
          </div>
          <div className="mt-6">
            <a
              href="https://www.ifixit.com/Device/MacBook_Pro_14%22_Late_2023_M3"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[#0FEA7A] text-sm font-semibold hover:underline"
            >
              iFixit MacBook Pro M3 battery guide <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Battery Fault Types */}
      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4">MacBook Pro M3 Battery Faults We Repair</h2>
          <p className="text-[#7A9E98] mb-10 max-w-3xl leading-relaxed">
            M3 machines are newer but not immune to battery issues — especially in South Africa. Each fault below is confirmed before quoting.
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
              Every repair is quoted before work begins. Our From R599 assessment policy means that if we assess your MacBook Pro M3 and determine a battery replacement will not resolve your issue, an assessment fee of R599 applies and your machine is returned unchanged. Up-to-3 year warranty on all completed battery replacements.
            </p>
          </div>
        </div>
      </section>

      {/* Apple vs ZA Support */}
      <section className="py-10 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-4">Apple Store vs ZA Support: MacBook Pro M3 Battery</h2>
          <p className="text-[#7A9E98] mb-8 leading-relaxed">
            M3 machines are recent enough that Apple may only service them through official depot channels, with costs of R4,000 to R8,000+. We service M3 batteries directly at our Hyde Park workshop.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="glass-card p-6 border border-red-500/20">
              <h3 className="text-red-400 font-bold mb-4">Apple Store / iStore</h3>
              <ul className="text-[#7A9E98] text-sm space-y-2.5">
                <li>Depot service — R4,000 to R8,000+ for M3 models</li>
                <li>Turnaround 5–10 business days</li>
                <li>May replace top case assembly unnecessarily</li>
                <li>AppleCare+ required for reduced pricing</li>
                <li>No load shedding impact assessment or UPS advice</li>
                <li>No capacity report issued at collection</li>
              </ul>
            </div>
            <div className="glass-card p-6 border border-[rgba(15,234,122,0.3)]">
              <h3 className="text-[#0FEA7A] font-bold mb-4">ZA Support</h3>
              <ul className="text-[#7A9E98] text-sm space-y-2.5">
                <li>Battery cells only — top case untouched</li>
                <li>M3 14″ and 16″ from R2,299</li>
                <li>coconutBattery diagnostic before and after</li>
                <li>Turnaround 4–6 hours same day</li>
                <li>System Information screenshot at collection</li>
                <li>Up-to-3 year warranty on replacement cell</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Service Process */}
      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-8">Our MacBook Pro M3 Battery Replacement Process</h2>
          <div className="space-y-6">
            {[
              { step: 1, title: 'Drop Off & M3 Diagnostic', desc: 'No appointment needed. We run a full M3 battery diagnostic immediately: cycle count, maximum capacity, cell voltage balance via coconutBattery and System Information. Written quote within 20 minutes.' },
              { step: 2, title: 'Bottom Case & Battery Extraction', desc: 'Pentalobe screws removed, battery connector disconnected, adhesive pull-tabs released using controlled heat (max 50°C) and adhesive solvent. The larger 72.4 Wh M3 14-inch cell requires careful, staged tab extraction. Non-conductive plastic tools only.' },
              { step: 3, title: 'Replacement Cell Verification', desc: 'Replacement M3 cell tested for open-circuit voltage, capacity, and cell balance before installation. Cell model verified against Apple model identifier (A2992, A2991, A2780 etc.) to ensure exact match.' },
              { step: 4, title: 'Calibration & Full Charging Verification', desc: 'Full charge-discharge calibration with macOS open. System Settings confirms 100% health. Cycle count at 0–1. MagSafe and USB-C ports both verified for clean power acceptance.' },
              { step: 5, title: 'Collect With Written Warranty', desc: 'Written warranty of up to 3 years, System Information screenshot, and assessment fee included in the total. Battery failure within warranty period = free replacement.' },
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
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-4">MacBook Pro M3 Battery — Johannesburg Service Area</h2>
          <p className="text-[#7A9E98] mb-6 leading-relaxed">
            Our Hyde Park workshop is 10 to 20 minutes from most northern Johannesburg suburbs. Collection and return available from Sandton, Rosebank, Bryanston, Fourways, Midrand, Randburg, Morningside, and Rivonia.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-6">
            {['Sandton', 'Rosebank', 'Bryanston', 'Fourways', 'Midrand', 'Randburg', 'Morningside', 'Rivonia', 'Sunninghill', 'Houghton', 'Parkhurst', 'Hyde Park'].map((suburb) => (
              <div key={suburb} className="flex items-center gap-2 bg-[rgba(15,234,122,0.05)] border border-[rgba(15,234,122,0.1)] rounded-xl px-4 py-3">
                <MapPin className="w-3.5 h-3.5 text-[#0FEA7A] flex-shrink-0" />
                <span className="text-[#E8F4F1] text-sm">{suburb}</span>
              </div>
            ))}
          </div>
          <p className="text-[#7A9E98] text-sm">
            Also covering Kempton Park, Pretoria, and Centurion by arrangement.{' '}
            <Link href="/battery-replacement/sandton" className="text-[#0FEA7A] hover:underline">Sandton battery replacement →</Link>
          </p>
        </div>
      </section>

      {/* Google Reviews */}
      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Suspense fallback={null}><GoogleReviews /></Suspense>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-10 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQAccordion items={faqs} title="MacBook Pro M3 Battery Replacement — Common Questions" />
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
              { label: 'MacBook Pro M2 Battery', href: '/battery-replacement/macbook-pro-m2' },
              { label: 'MacBook Pro 14″ Battery', href: '/battery-replacement/macbook-pro-14-inch' },
              { label: 'MacBook Pro 16″ Battery', href: '/battery-replacement/macbook-pro-16-inch' },
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
            <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3">MacBook Pro M3 Battery Issue? Book a Diagnostic.</h2>
            <p className="text-[#7A9E98] mb-6 max-w-xl mx-auto leading-relaxed">
              WhatsApp us a description of the fault — reduced runtime, unexpected shutdowns, swollen battery, or bottom case bowing — and we will give you an honest price range before you bring the machine in. Assessment from R599, applied toward the repair if you proceed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 hover:shadow-[0_0_32px_rgba(15,234,122,0.4)] transition-all">
                WhatsApp for a Quote
              </a>
              <a href={`tel:${CONTACT.phoneTel}`} className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all">
                <Phone className="w-5 h-5" /> Call {CONTACT.phone}
              </a>
            </div>
            <p className="text-[#7A9E98] text-xs mt-6">
              1 Hyde Lane, Hyde Park, Office E2004, JHB 2196 | M3 14″/16″ from R2,299 | Up-to-3 year warranty
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
