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

export const metadata: Metadata = {
  title: 'MacBook Air M2 Battery Replacement Johannesburg [2026] | From R1,499 | ZA Support',
  description:
    'MacBook Air M2 battery replacement Johannesburg from R1,499. 52.6Wh redesigned chassis with MagSafe. New adhesive layout. No Fix No Fee. Hyde Park workshop. 12-month warranty.',
  alternates: { canonical: 'https://zasupport.com/battery-replacement/macbook-air-m2' },
  keywords: [
    'MacBook Air M2 battery replacement Johannesburg',
    'MacBook Air M2 battery replacement Hyde Park',
    'MacBook Air M2 battery swollen Johannesburg',
    'MacBook Air M2 battery cost South Africa',
    'MacBook Air M2 battery replacement price',
    'MacBook Air M2 battery cycle count',
    'MacBook Air M2 A2681 battery replacement',
    'MacBook Air M2 MagSafe battery',
    'MacBook Air M2 battery Sandton',
    'MacBook Air M2 2022 2023 battery service',
  ],
};

/* ── Breadcrumbs ─────────────────────────────────────────────────────────── */
const breadcrumbItems = [
  { label: 'Battery Replacement', href: '/battery-replacement' },
  { label: 'MacBook Air M2' },
];

const breadcrumbSchemaItems = [
  { name: 'Home', url: 'https://zasupport.com' },
  { name: 'Battery Replacement', url: 'https://zasupport.com/battery-replacement' },
  { name: 'MacBook Air M2', url: 'https://zasupport.com/battery-replacement/macbook-air-m2' },
];

/* ── Service Schema ──────────────────────────────────────────────────────── */
const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'MacBook Air M2 Battery Replacement Johannesburg',
  description:
    'Professional MacBook Air M2 battery replacement in Johannesburg. 52.6 Wh redesigned uniform-thickness chassis with MagSafe charging. New adhesive layout. From R1,499. No Fix No Fee. Up-to-3 year warranty.',
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
    lowPrice: '1499',
    highPrice: '1499',
    priceCurrency: 'ZAR',
    offerCount: '1',
  },
  availableChannel: [
    { '@type': 'ServiceChannel', serviceUrl: 'https://wa.me/27645295863', serviceType: 'WhatsApp' },
    { '@type': 'ServiceChannel', servicePhone: '+27645295863', serviceType: 'Phone' },
  ],
};

/* ── Pricing Table ───────────────────────────────────────────────────────── */
const pricingRows = [
  { model: 'MacBook Air 13″ M2 (2022) — A2681', battery: '52.6 Wh', from: 'R1,499', turnaround: '2–4 hrs' },
  { model: 'MacBook Air 15″ M2 (2023) — A2941', battery: '66.5 Wh', from: 'R1,699', turnaround: '2–4 hrs' },
];

/* ── Fault Types ─────────────────────────────────────────────────────────── */
const faultTypes = [
  {
    title: 'New Adhesive Layout — Redesigned Chassis',
    icon: Wrench,
    desc: 'The MacBook Air M2 introduced a completely redesigned uniform-thickness chassis in June 2022 — no longer the wedge shape of every previous Air. This new chassis also introduced a revised battery adhesive layout. The M2 Air uses a different pull-tab geometry and adhesive compound compared to the M1 Air. The tab removal angle changed, and the battery connector relocated to a new position relative to the logic board. A technician using the M1 Air battery extraction procedure on an M2 Air risks broken adhesive tabs or a misaligned connector. We documented the M2 Air adhesive layout from our first batch of these repairs and maintain a separate procedure for this model.',
    severity: 'low',
  },
  {
    title: 'Swollen Battery in Uniform-Thickness Chassis',
    icon: AlertTriangle,
    desc: 'Unlike the wedge-shaped M1 Air which tapers to 4.1 mm at the front, the M2 Air maintains a uniform thickness of 11.3 mm across its full length. The battery array is positioned in the central section of the lower case with more even clearance than the M1 Air. However, when swelling occurs, it still manifests as visible bowing of the lower case surface and a machine that rocks on a flat desk. The M2 Air does not have the extreme thinness risk of the M1 at the front edge, but the uniform body means swelling is distributed differently across the chassis. This is still an urgent fault requiring immediate repair.',
    severity: 'high',
  },
  {
    title: 'MagSafe Charging — Return of the Magnetic Connector',
    icon: Activity,
    desc: 'The MacBook Air M2 brought MagSafe back to the Air line — the previous M1 Air charged exclusively via USB-C. The MagSafe 2 connector on the M2 Air uses a different connection than the MagSafe 3 on the MacBook Pro. A degraded M2 Air battery with uneven cell voltages can cause the MagSafe LED to show amber without charging progress, or the charge percentage to stall. This is a battery-side fault in the majority of cases, not a faulty MagSafe cable or port. We verify the MagSafe connector and both USB-C ports independently before attributing a cause, and test all three charging paths after replacement.',
    severity: 'medium',
  },
  {
    title: 'Cycle Count — 2022/2023 Purchase Cohort',
    icon: Battery,
    desc: 'The MacBook Air M2 was released in June 2022 (13-inch) and June 2023 (15-inch). The earliest M2 Air units are now approaching three to four years of age. Under normal South African use with load shedding partial cycles, a 2022 M2 Air could have 300 to 600 cycles by 2026. If your M2 Air was purchased during Stage 6 load shedding in 2023 without a UPS, your cycle count may be toward the higher end of this range. We see M2 Air units presenting at our workshop with 400 to 600 cycles and capacity readings of 85 to 92% — still functional, but worth monitoring.',
    severity: 'low',
  },
  {
    title: 'Reduced Runtime from 18-Hour Rating',
    icon: BatteryWarning,
    desc: 'Apple rates the MacBook Air M2 13-inch for up to 18 hours of video playback and the 15-inch for up to 18 hours as well. The slightly larger 52.6 Wh cell in the M2 Air (compared to 49.9 Wh in the M1) combined with M2 chip efficiency delivers this figure. When capacity degrades to 80%, the machine still delivers approximately 14 hours under light loads — acceptable but noticeably reduced from the original rating. Below 75%, you are at 13 hours and the "Service Recommended" notice is likely already showing. We confirm the exact capacity before quoting.',
    severity: 'medium',
  },
  {
    title: 'Load Shedding Micro-Cycles',
    icon: Cpu,
    desc: 'The MacBook Air M2 is the dominant laptop purchase for South African students, home office workers, and young professionals — precisely the users who experienced the worst of Stage 6 load shedding in 2023. These users were running their M2 Airs at home without UPS protection, accumulating 8 to 12 partial cycles per day. Over 12 months of Stage 6 conditions, this adds 500 to 700 partial cycles on top of normal use. We track this in our client data and can provide a cycle accumulation estimate based on your location and purchase date.',
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
    question: 'How much does MacBook Air M2 battery replacement cost in Johannesburg?',
    answer:
      'MacBook Air M2 13-inch battery replacement starts from R1,499 at our Hyde Park workshop. The MacBook Air 15-inch M2 starts from R1,699. The Apple Store charges R2,500 to R5,000 for the same service. Our price includes the replacement cell, all labour, calibration, and a written warranty of up to 3 years. The assessment fee (from R599) is applied toward the repair cost if you proceed.',
  },
  {
    question: 'What is the battery capacity of the MacBook Air M2?',
    answer:
      'The MacBook Air M2 13-inch (A2681, 2022) uses a 52.6 Wh lithium-polymer battery — slightly larger than the M1 Air at 49.9 Wh. The MacBook Air 15-inch M2 (A2941, 2023) uses a 66.5 Wh cell. Both are rated for 1,000 charge cycles. Apple rates the 13-inch M2 Air for 18 hours of video playback and the 15-inch for 18 hours as well.',
  },
  {
    question: 'Is the MacBook Air M2 battery different from the M1?',
    answer:
      'Yes. The M2 Air uses a 52.6 Wh cell (vs 49.9 Wh in the M1 Air), in a completely redesigned uniform-thickness chassis. The adhesive layout, pull-tab geometry, and battery connector position all changed with the M2 chassis. The M1 and M2 Air batteries are not interchangeable, and the removal procedure differs. We maintain separate documented procedures for M1 and M2 Air battery replacements.',
  },
  {
    question: 'Does the MacBook Air M2 have MagSafe? How does this affect battery replacement?',
    answer:
      'Yes, the M2 Air brought MagSafe back to the Air line — the M1 Air charged only via USB-C. The M2 Air uses a MagSafe 2 connector alongside two USB-C Thunderbolt ports. The MagSafe port is located on the left side of the redesigned chassis and routes separately from the battery connector. During battery replacement, we verify MagSafe function after installation by running a full charge cycle with the LED confirmed green. Both USB-C ports are also verified for clean power acceptance.',
  },
  {
    question: 'My MacBook Air M2 surface is bowing — is this a swollen battery?',
    answer:
      'Yes. The M2 Air uniform-thickness chassis shows battery swelling as lower case bowing — the machine rocks on a flat surface rather than sitting flat. Unlike the M1 Air where the extreme thinness at the front edge makes swelling immediately visible, the M2 Air distributes the swelling more evenly across the central lower case section. This is still an urgent fault. Do not continue using the machine, do not store it in a bag, and contact us immediately. We handle M2 Air swollen battery removals with a full decompression protocol.',
  },
  {
    question: 'How long does MacBook Air M2 battery replacement take?',
    answer:
      'MacBook Air M2 13-inch and 15-inch battery replacements take 2 to 4 hours including diagnostic, adhesive removal, installation, and calibration. Same-day service is available when booked before 14:00. WhatsApp us to confirm a slot before bringing the machine in.',
  },
  {
    question: 'Does load shedding affect MacBook Air M2 battery health?',
    answer:
      'Yes. The M2 Air was purchased primarily by South African students and home office workers during 2022 and 2023 — some of the worst load shedding years on record. Without a UPS, these users accumulated 8 to 12 partial cycles per day during Stage 4 and Stage 6 events. Over 12 months of Stage 6 conditions, this added 500 to 700 partial cycles on top of normal use. We recommend a battery assessment from R599 for any M2 Air purchased before mid-2023 that is showing reduced runtime.',
  },
  {
    question: 'Is the MacBook Air M2 15-inch battery different from the 13-inch?',
    answer:
      'Yes. The MacBook Air 15-inch M2 (A2941) uses a 66.5 Wh cell — significantly larger than the 52.6 Wh 13-inch cell. Despite the different cell size, the removal procedure follows similar principles. The 15-inch chassis is physically larger, with a correspondingly larger adhesive footprint, but the same sequential tab extraction method applies. Battery replacement on the 15-inch M2 Air starts from R1,699.',
  },
  {
    question: 'Will MacBook Air M2 battery replacement reset the cycle count?',
    answer:
      'Yes. After replacement on a MacBook Air M2, System Settings shows battery health at 100% and the cycle count resets to 0 or 1. The "Service Recommended" notice clears. We issue a System Information screenshot at collection confirming the new cell is registered correctly.',
  },
  {
    question: 'What warranty do you offer on MacBook Air M2 battery replacements?',
    answer:
      'MacBook Air M2 battery replacements at ZA Support carry a written warranty of up to 3 years. The warranty covers the replacement cell and our workmanship. If the battery fails within the warranty period, we replace it again at no charge. No Fix No Fee: if our assessment determines the battery is not the cause of your fault, you pay only R599 and your machine is returned unchanged.',
  },
];

/* ── Structured Data ─────────────────────────────────────────────────────── */
const faqSchema = buildFaqSchema(faqs);
const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbSchemaItems);

/* ── Page Component ──────────────────────────────────────────────────────── */
export default function BatteryReplacementMacBookAirM2Page() {
  const whatsappUrl = buildWhatsAppUrl('BAT-AIR-M2-HERO', 'battery');

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
              MacBook Air M2 Battery Replacement
              <br /><span className="text-[#0FEA7A]">Johannesburg</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-4 max-w-3xl leading-relaxed">
              Redesigned uniform-thickness chassis — 52.6 Wh (13&quot;) or 66.5 Wh (15&quot;) with MagSafe charging. New adhesive layout, new chassis geometry. Purchased during Stage 6 load shedding? Your battery may have accumulated cycles faster than you expect. From R1,499. Same-day service.
            </p>
            <div className="flex items-center gap-2 text-[#7A9E98] text-sm mb-8">
              <MapPin className="w-4 h-4 text-[#0FEA7A]" />
              <span>1 Hyde Lane, Hyde Park, Office E2004, JHB 2196 | MacBook Air M2 13″ from R1,499 | 15″ from R1,699</span>
            </div>
            <div className="flex flex-wrap gap-3 mb-8">
              {[
                { icon: Shield, label: 'No Fix No Fee' },
                { icon: Battery, label: 'M2 13″ & 15″ Covered' },
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
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 hover:shadow-[0_0_32px_rgba(15,234,122,0.4)] transition-all">
                WhatsApp for a Quote
              </a>
              <a href={`tel:${CONTACT.phoneTel}`} className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all">
                <Phone className="w-5 h-5" /> Call {CONTACT.phone}
              </a>
              <Link href="/battery-replacement" className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.2)] text-[#7A9E98] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[rgba(15,234,122,0.05)] transition-all">
                All Battery Replacements <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
            <div className="flex flex-wrap gap-6 mt-8 pt-6 border-t border-[rgba(255,255,255,0.06)]">
              {[
                { value: '1,000+', label: 'Air M2 Batteries Replaced' },
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
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4">MacBook Air M2 Battery Replacement Pricing</h2>
          <p className="text-[#7A9E98] mb-8 max-w-3xl leading-relaxed">
            Starting prices include the replacement cell, labour, calibration, and our written warranty. Apple charges R2,500 to R5,000 for M2 Air battery service.
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
            All prices include the replacement cell, labour, calibration, and our up-to-3 year warranty. Assessment from R599 — applied toward the repair cost if you proceed. No Fix No Fee applies.
          </p>
        </div>
      </section>

      {/* Technical Detail */}
      <section className="py-10 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4">MacBook Air M2 Battery — A Redesigned Chassis, A Revised Procedure</h2>
          <div className="space-y-4 text-[#7A9E98] leading-relaxed">
            <p>
              The MacBook Air M2 (A2681) launched in June 2022 as the most significant redesign of the MacBook Air in over a decade. Apple abandoned the wedge silhouette that had defined the Air since 2010 in favour of a uniform 11.3 mm thickness. This redesign affected every internal component — including the battery. The M2 Air uses a 52.6 Wh cell (3.7 Wh more than the M1 Air), and the adhesive pull-tab layout, tab geometry, and battery connector position all changed with the new chassis. The M1 and M2 Air are distinct service models from a battery replacement perspective.
            </p>
            <p>
              The MagSafe port returned with the M2 Air after the M1 Air shipped with USB-C charging only. The MagSafe 2 connector on the M2 Air routes from the left side of the machine through a dedicated flex cable to the logic board. This cable is separate from the battery connector and does not affect the battery replacement procedure directly, but we verify the MagSafe charging LED before and after every M2 Air battery replacement to confirm the connector was not disturbed during the procedure.
            </p>
            <p>
              The M2 Air was released during one of South Africa&apos;s most challenging load shedding periods. Machines purchased in mid-2022 through early 2024 were used through Stage 4 and Stage 6 events that added 8 to 12 partial battery cycles per day. We have tracked M2 Air units purchased in 2022 that presented at our workshop in 2025 and 2026 with 400 to 600 cycles — ahead of where they should be if used in a power-stable environment. The most affected users are students and home office workers who kept the machine plugged in during load shedding events, allowing the battery to partial-cycle with every power interruption.
            </p>
            <p>
              The MacBook Air 15-inch M2 (A2941), released in June 2023, uses a 66.5 Wh cell in the same M2 chassis design at a larger screen size. Battery replacement on the 15-inch follows the same adhesive removal procedure as the 13-inch but with a physically larger cell. Our starting price for the 15-inch M2 Air is R1,699 — slightly higher than the 13-inch to reflect the larger cell cost.
            </p>
            <p>
              One detail that clients ask about frequently: the M2 Air is fanless like the M1 Air. Under sustained workloads, it accumulates the same thermal stress on the battery cells. Johannesburg ambient temperatures of 34 to 37°C in summer, combined with sustained M2 workloads in an unventilated room, create conditions that accelerate battery degradation beyond the rated 1,000-cycle figure. We note charge temperature history from coconutBattery in every M2 Air diagnostic and flag machines with elevated average temperatures to the client before quoting.
            </p>
          </div>
          <div className="mt-6">
            <a href="https://www.ifixit.com/Device/MacBook_Air_13%22_2022_A2681_M2" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-[#0FEA7A] text-sm font-semibold hover:underline">
              iFixit MacBook Air M2 battery guide <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Battery Fault Types */}
      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4">MacBook Air M2 Battery Faults We Repair</h2>
          <p className="text-[#7A9E98] mb-10 max-w-3xl leading-relaxed">
            The M2 Air is now old enough that battery faults are arriving regularly at our workshop. Each is confirmed before any repair is quoted.
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
              Every repair is quoted before work begins. No Fix No Fee: assessment fee of R599 if the battery is not the cause. Up-to-3 year warranty on all completed MacBook Air M2 battery replacements.
            </p>
          </div>
        </div>
      </section>

      {/* Apple vs ZA Support */}
      <section className="py-10 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-4">Apple Store vs ZA Support: MacBook Air M2 Battery</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="glass-card p-6 border border-red-500/20">
              <h3 className="text-red-400 font-bold mb-4">Apple Store / iStore</h3>
              <ul className="text-[#7A9E98] text-sm space-y-2.5">
                <li>R2,500 to R5,000 for M2 Air battery service</li>
                <li>Turnaround 5–10 business days via depot</li>
                <li>No thermal history report at collection</li>
                <li>No MagSafe verification documented</li>
                <li>AppleCare+ required for reduced pricing</li>
                <li>No load shedding cycle impact assessment</li>
              </ul>
            </div>
            <div className="glass-card p-6 border border-[rgba(15,234,122,0.3)]">
              <h3 className="text-[#0FEA7A] font-bold mb-4">ZA Support</h3>
              <ul className="text-[#7A9E98] text-sm space-y-2.5">
                <li>Battery cells only — 13″ from R1,499 | 15″ from R1,699</li>
                <li>M2 Air-specific adhesive procedure documented</li>
                <li>coconutBattery thermal history reported</li>
                <li>MagSafe + USB-C charging verified post-replacement</li>
                <li>Turnaround 2–4 hours same day</li>
                <li>Up-to-3 year warranty on replacement cell</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Service Process */}
      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-8">Our MacBook Air M2 Battery Replacement Process</h2>
          <div className="space-y-6">
            {[
              { step: 1, title: 'Drop Off & M2 Air Diagnostic', desc: 'No appointment needed. Full battery diagnostic: cycle count, capacity, thermal history via coconutBattery. Visual swelling inspection. Written quote within 20 minutes.' },
              { step: 2, title: 'M2 Air-Specific Adhesive Removal', desc: 'The M2 Air adhesive layout differs from the M1 Air. We apply the correct M2 tab extraction angle and sequence using controlled heat (max 50°C) and adhesive solvent. Non-conductive plastic tools only throughout.' },
              { step: 3, title: 'Replacement Cell Verification', desc: 'Model identifier confirmed (A2681 or A2941). 52.6 Wh or 66.5 Wh replacement cell tested for correct voltage, capacity, and cell balance before installation.' },
              { step: 4, title: 'MagSafe + USB-C Charging Verification', desc: 'Full charge-discharge calibration with macOS open. System Settings confirms 100% health. MagSafe LED verified green. Both USB-C Thunderbolt ports verified for clean power acceptance.' },
              { step: 5, title: 'Collect With Written Warranty', desc: 'Written warranty up to 3 years, System Information screenshot, assessment fee included in total. Battery failure within warranty = free replacement.' },
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
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-4">MacBook Air M2 Battery — Johannesburg Service Area</h2>
          <p className="text-[#7A9E98] mb-6 leading-relaxed">
            Our Hyde Park workshop is 10 to 20 minutes from most northern Johannesburg suburbs. Collection and return from Sandton, Rosebank, Bryanston, Fourways, Midrand, and Randburg.
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
          <FAQAccordion items={faqs} title="MacBook Air M2 Battery Replacement — Common Questions" />
        </div>
      </section>

      {/* Related Services */}
      <section className="py-8 sm:py-16 bg-[#111C1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#E8F4F1] mb-6">Related Repairs</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              { label: 'All Battery Replacements', href: '/battery-replacement' },
              { label: 'MacBook Air M1 Battery', href: '/battery-replacement/macbook-air-m1' },
              { label: 'MacBook Pro M2 Battery', href: '/battery-replacement/macbook-pro-m2' },
              { label: 'MacBook Pro Battery', href: '/battery-replacement/macbook-pro' },
              { label: 'Logic Board Repair', href: '/logic-board-repair' },
              { label: 'MacBook Air Logic Board', href: '/logic-board-repair/macbook-air' },
              { label: 'Screen Repair', href: '/screen-repair' },
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
            <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3">MacBook Air M2 Battery Issue? Book a Diagnostic.</h2>
            <p className="text-[#7A9E98] mb-6 max-w-xl mx-auto leading-relaxed">
              WhatsApp us the fault — reduced runtime, lower case bowing, MagSafe not charging, or "Service Recommended" — and we will confirm pricing before you come in. Assessment from R599, applied toward the repair if you proceed.
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
              1 Hyde Lane, Hyde Park, Office E2004, JHB 2196 | MacBook Air M2 13″ from R1,499 | 15″ from R1,699 | Up-to-3 year warranty
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
