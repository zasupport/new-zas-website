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
  title: 'MacBook Pro M1 Battery Replacement Johannesburg [2026] | From R1,799 | ZA Support',
  description:
    'MacBook Pro M1 battery replacement Johannesburg from R1,799. 58.2Wh (13") / 70Wh (14") cells. First Apple Silicon. From R599 assessment. Hyde Park workshop. 12-month warranty.',
  alternates: { canonical: 'https://zasupport.com/battery-replacement/macbook-pro-m1' },
  keywords: [
    'MacBook Pro M1 battery replacement Johannesburg',
    'MacBook Pro M1 battery replacement Hyde Park',
    'MacBook Pro M1 battery swollen Johannesburg',
    'MacBook Pro M1 battery cycle count',
    'MacBook Pro M1 13 inch battery replacement',
    'MacBook Pro M1 14 inch battery replacement',
    'Apple Silicon MacBook Pro battery replacement',
    'MacBook Pro M1 battery cost South Africa',
    'MacBook Pro M1 battery service Sandton',
    'MacBook Pro M1 Pro Max battery replacement',
  ],
};

/* ── Breadcrumbs ─────────────────────────────────────────────────────────── */
const breadcrumbItems = [
  { label: 'Battery Replacement', href: '/battery-replacement' },
  { label: 'MacBook Pro', href: '/battery-replacement/macbook-pro' },
  { label: 'M1' },
];

const breadcrumbSchemaItems = [
  { name: 'Home', url: 'https://zasupport.com' },
  { name: 'Battery Replacement', url: 'https://zasupport.com/battery-replacement' },
  { name: 'MacBook Pro', url: 'https://zasupport.com/battery-replacement/macbook-pro' },
  { name: 'MacBook Pro M1', url: 'https://zasupport.com/battery-replacement/macbook-pro-m1' },
];

/* ── Service Schema ──────────────────────────────────────────────────────── */
const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'MacBook Pro M1 Battery Replacement Johannesburg',
  description:
    'Professional MacBook Pro M1 battery replacement in Johannesburg. 58.2Wh (13-inch) and 70Wh (14-inch) cell replacement. First Apple Silicon generation. From R1,799. From R599 assessment. Up-to-3 year warranty.',
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
    offerCount: '3',
  },
  availableChannel: [
    { '@type': 'ServiceChannel', serviceUrl: 'https://wa.me/27645295863', serviceType: 'WhatsApp' },
    { '@type': 'ServiceChannel', servicePhone: '+27645295863', serviceType: 'Phone' },
  ],
};

/* ── Pricing Table ───────────────────────────────────────────────────────── */
const pricingRows = [
  { model: 'MacBook Pro 13″ M1 (Late 2020)', battery: '58.2 Wh', from: 'R1,799', turnaround: '2–4 hrs' },
  { model: 'MacBook Pro 14″ M1 Pro (2021)', battery: '69.6 Wh', from: 'R2,299', turnaround: '4–6 hrs' },
  { model: 'MacBook Pro 14″ M1 Max (2021)', battery: '69.6 Wh', from: 'R2,299', turnaround: '4–6 hrs' },
  { model: 'MacBook Pro 16″ M1 Pro (2021)', battery: '99.6 Wh', from: 'R2,299', turnaround: '4–6 hrs' },
  { model: 'MacBook Pro 16″ M1 Max (2021)', battery: '99.6 Wh', from: 'R2,299', turnaround: '4–6 hrs' },
];

/* ── Fault Types ─────────────────────────────────────────────────────────── */
const faultTypes = [
  {
    title: 'Cycle Count Exceeded — First Apple Silicon Generation',
    icon: Battery,
    desc: 'The MacBook Pro M1 was released in November 2020, which means the earliest units are now five-plus years old and many are well past 700 charge cycles. Apple rates the M1 battery for 1,000 cycles before capacity is expected to drop below 80% of design capacity. We see M1 MacBook Pros in our Hyde Park workshop arriving with capacity readings of 72–78% — still functional, but noticeably shorter runtime and increasingly unreliable discharge curves. If your M1 reports "Service Recommended" or your battery health in System Settings is below 80%, replacement is the correct course of action.',
    severity: 'medium',
  },
  {
    title: 'Swollen Battery — Adhesive Bond Failure',
    icon: AlertTriangle,
    desc: 'MacBook Pro M1 13-inch units use a dual-cell 58.2 Wh battery array mounted with stretch-release adhesive pull-tabs beneath the trackpad. When these cells begin to off-gas at end-of-life, the trackpad is the first component affected — the swelling pushes upward and increases click resistance until the trackpad eventually stops clicking. In our workshop we handle M1 swollen battery removals regularly, and the procedure requires controlled heat application and adhesive solvent to release the cells safely without puncturing the lithium-polymer pouch. This is an urgent fault and should not be ignored.',
    severity: 'high',
  },
  {
    title: 'Unexpected Shutdown — BMU Calibration Drift',
    icon: Zap,
    desc: 'Some MacBook Pro M1 units exhibit sudden shutdowns at 15–30% displayed charge. The battery management unit (BMU) on Apple Silicon Macs relies on voltage curve tables to estimate remaining capacity. As cells age unevenly, the actual voltage at a given charge level diverges from the stored calibration, triggering a protective shutdown to prevent over-discharge damage to the logic board. The machine restarts immediately when plugged in, which is the clearest sign this is a battery issue rather than a logic board fault. We run a full discharge and recharge profile to confirm before quoting.',
    severity: 'medium',
  },
  {
    title: 'MagSafe Charging Inconsistency',
    icon: Activity,
    desc: 'The MacBook Pro M1 14-inch and 16-inch models reintroduced MagSafe alongside USB-C charging. A degraded battery with uneven cell voltages can cause the USB-C power delivery negotiation to fail, resulting in the MagSafe LED amber-flickering or the charge percentage not advancing despite being plugged in. This is a battery-side fault in the majority of cases. After replacement, we run a full MagSafe and USB-C charging verification to confirm clean power acceptance on both ports before return.',
    severity: 'medium',
  },
  {
    title: 'Load Shedding Micro-Cycle Accumulation',
    icon: BatteryWarning,
    desc: 'South African M1 MacBook Pro users face an accelerated battery degradation problem that does not affect users in countries without load shedding. During Stage 4 load shedding, a Johannesburg household experiences up to 12 power interruptions per day. Each interruption forces the MacBook Pro to switch from AC to battery and back — each transition counts as a partial charge cycle. We have tracked M1 units in Johannesburg reaching 1,000 cycles 12 to 18 months ahead of typical global lifecycle data. A quality UPS is the most effective mitigation.',
    severity: 'low',
  },
  {
    title: 'Reduced Runtime — Efficiency Gap',
    icon: Cpu,
    desc: 'One of the defining features of the M1 chip was its exceptional battery life — Apple quoted 17 to 20 hours for the M1 MacBook Pro 13-inch under controlled conditions. If your machine is now only achieving 4 to 6 hours of productive work, the battery capacity has almost certainly degraded to the point where replacement is warranted. A capacity reading below 80% in coconutBattery explains the runtime reduction directly. We confirm this diagnosis before quoting and provide a written capacity report at collection.',
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
    question: 'How much does a MacBook Pro M1 battery replacement cost in Johannesburg?',
    answer:
      'MacBook Pro M1 13-inch battery replacement starts from R1,799 at our Hyde Park workshop. The M1 Pro and M1 Max 14-inch and 16-inch models start from R2,299 due to their larger cells (69.6 Wh and 99.6 Wh respectively) and the additional adhesive complexity of the larger chassis. The Apple Store charges R3,500 to R8,000 for the same service. Our price includes the replacement cell, all labour, calibration, and a written warranty of up to 3 years. The assessment fee (from R599) is applied toward the repair cost if you proceed.',
  },
  {
    question: 'How do I check my MacBook Pro M1 battery health?',
    answer:
      'Open System Settings, go to Battery, and check the battery health percentage. If it shows below 80%, macOS will display a "Service Recommended" notice. For more detail, hold Option, click the Apple menu, select System Information, and navigate to Power — you will see cycle count and maximum capacity listed. Alternatively, download coconutBattery (free) which shows cell voltage, temperature history, and a comparison against the original design capacity. If your M1 is showing below 80% capacity or above 800 cycles, bring it in for an assessment.',
  },
  {
    question: 'What is the battery capacity of the MacBook Pro M1?',
    answer:
      'The MacBook Pro 13-inch M1 (Late 2020) uses a 58.2 Wh lithium-polymer battery rated for 1,000 charge cycles. The MacBook Pro 14-inch M1 Pro and M1 Max (2021) use a 69.6 Wh cell, also rated for 1,000 cycles. The MacBook Pro 16-inch M1 Pro and M1 Max (2021) use a 99.6 Wh cell — this is at the aviation carry-on limit of 100 Wh per cell and is the largest battery Apple fitted in any MacBook Pro at that time. We stock replacement cells for all three capacity variants.',
  },
  {
    question: 'My MacBook Pro M1 battery drains faster than it used to — is replacement needed?',
    answer:
      'Not always — but usually yes if the machine is over three years old and sees daily use. First, check the cycle count in System Information. If your cycle count exceeds 700 and your maximum capacity has dropped below 85%, replacement is likely worthwhile. You will recover the original runtime Apple quoted for the M1: 17–20 hours for the 13-inch under light workloads, and 14–17 hours for the 14-inch M1 Pro. If the cycle count is below 400 and the capacity is still above 90%, the issue may be a software or power-hungry app rather than the battery itself — we will diagnose this before quoting.',
  },
  {
    question: 'Does load shedding affect MacBook Pro M1 battery life?',
    answer:
      'Yes, and we see it daily. Each time power cuts and restores, your MacBook Pro M1 transitions between battery and AC power — a partial charge cycle each way. During Stage 4 load shedding in Johannesburg, this can add 8 to 12 partial cycles per day on top of normal use. Over 12 to 18 months, M1 units used without a UPS in South Africa consistently reach end-of-life battery cycles earlier than the same models in countries without power interruptions. A quality UPS with automatic voltage regulation is the single best investment you can make for your MacBook Pro battery longevity.',
  },
  {
    question: 'How long does MacBook Pro M1 battery replacement take?',
    answer:
      'The MacBook Pro M1 13-inch takes 2 to 4 hours including diagnostic, adhesive removal, cell installation, and calibration. The M1 Pro and M1 Max 14-inch and 16-inch models take 4 to 6 hours — the larger battery array spans more adhesive sections and requires more careful removal. Same-day service is available for all M1 models when booked before 14:00. Contact us on WhatsApp to confirm slot availability and get a same-day quote before bringing the machine in.',
  },
  {
    question: 'Is the MacBook Pro M1 battery soldered in or removable?',
    answer:
      'The battery is not soldered to the logic board — it connects via a flex cable and battery management connector. However, it is adhesive-mounted to the top case using stretch-release pull-tabs. The cells themselves are bonded in place and require controlled heat and adhesive solvent to release cleanly. This is substantially more involved than a battery swap on a removable-battery laptop, but far less invasive than Apple\'s approach of replacing the entire top case assembly. Our process takes 2 to 6 hours depending on the model.',
  },
  {
    question: 'Will replacing the battery affect my MacBook Pro M1 performance?',
    answer:
      'No — battery replacement on an M1 MacBook Pro does not affect the M1 chip performance, memory, or storage. macOS may apply CPU throttling when a battery is severely degraded (below 70% capacity) to prevent unexpected shutdowns. After a new battery is fitted and calibrated, the throttling is removed and the machine performs at full rated M1 speed again. You will also regain the full rated battery runtime — typically 17 to 20 hours for the 13-inch M1 under light workloads.',
  },
  {
    question: 'Do you offer a warranty on MacBook Pro M1 battery replacements?',
    answer:
      'Yes. All MacBook Pro M1 battery replacements at ZA Support carry a written warranty of up to 3 years. The warranty covers the replacement cell and our workmanship. If the battery develops any electrical fault or drops below 80% capacity within the warranty period, we replace it again at from R599. The warranty document is issued in writing at collection. From R599 assessment applies: if our assessment confirms the battery is not the cause of your fault, you pay only the assessment fee from R599 and receive your machine back unchanged.',
  },
  {
    question: 'Can you also replace the battery in M1 Pro and M1 Max models?',
    answer:
      'Yes, we replace batteries across the full first-generation Apple Silicon MacBook Pro range: M1 (13-inch Late 2020), M1 Pro 14-inch, M1 Pro 16-inch, M1 Max 14-inch, and M1 Max 16-inch. The chip variant (M1, M1 Pro, or M1 Max) does not affect the battery replacement procedure — the cell capacities are 69.6 Wh (14-inch) and 99.6 Wh (16-inch) regardless of whether the machine has the Pro or Max chip configuration.',
  },
];

/* ── Structured Data ─────────────────────────────────────────────────────── */
const faqSchema = buildFaqSchema(faqs);
const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbSchemaItems);

/* ── Page Component ──────────────────────────────────────────────────────── */
export default function BatteryReplacementMacBookProM1Page() {
  const whatsappUrl = buildWhatsAppUrl('BAT-PRO-M1-HERO', 'battery');

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
              MacBook Pro M1 Battery Replacement
              <br /><span className="text-[#0FEA7A]">Johannesburg</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-4 max-w-3xl leading-relaxed">
              First Apple Silicon — 58.2 Wh (13&quot;) or 69.6 Wh/99.6 Wh (14&quot;/16&quot;) cell replacement at our Hyde Park workshop. Load shedding micro-cycles accumulate fast on M1 MacBook Pros. Pro 13&quot; from R1,799. Pro 14&quot;/16&quot; from R2,299. Same-day service available.
            </p>
            <div className="flex items-center gap-2 text-[#7A9E98] text-sm mb-8">
              <MapPin className="w-4 h-4 text-[#0FEA7A]" />
              <span>1 Hyde Lane, Hyde Park, Office E2004, JHB 2196 | M1 13″ from R1,799 | M1 14″/16″ from R2,299</span>
            </div>
            <div className="flex flex-wrap gap-3 mb-8">
              {[
                { icon: Shield, label: 'From R599 assessment' },
                { icon: Battery, label: 'All M1 Models' },
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
                { value: '1,000+', label: 'M1 Batteries Replaced' },
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
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4">MacBook Pro M1 Battery Replacement Pricing</h2>
          <p className="text-[#7A9E98] mb-8 max-w-3xl leading-relaxed">
            Prices below are starting prices including the replacement cell, labour, calibration, and our written warranty. The Apple Store charges R3,500 to R8,000 for the same service — and on newer models they sometimes replace the entire top case assembly rather than the battery alone. We replace the battery cells only.
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
          <PricingRange page="/battery-replacement/macbook-pro-m1" />
          <PricingNote variant="inline" />
        </div>
      </section>

      {/* Technical Detail */}
      <section className="py-10 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4">MacBook Pro M1 Battery — What You Need to Know</h2>
          <div className="space-y-4 text-[#7A9E98] leading-relaxed">
            <p>
              The MacBook Pro M1 marked a watershed moment for Apple laptop battery life. The 13-inch M1, released in November 2020, carried a 58.2 Wh cell and Apple quoted up to 20 hours of video playback. The M1 Pro and M1 Max 14-inch and 16-inch models, launched in October 2021, stepped up to 69.6 Wh and 99.6 Wh respectively — with Apple quoting 17 hours for the 14-inch and 21 hours for the 16-inch. These were not marketing numbers — we verified them in our workshop across multiple client machines. The M1 genuinely extended how long a MacBook Pro could run on a single charge.
            </p>
            <p>
              The problem is that after three to five years of daily use in South Africa, many M1 MacBook Pros are now presenting at our Hyde Park workshop with significant battery degradation. The 1,000-cycle rating Apple advertises is an average — in Johannesburg, where load shedding adds 8 to 12 partial charge cycles per day during Stage 4 schedules, we see M1 batteries reaching 1,000 cycles 12 to 18 months ahead of global averages. A battery sitting at 72% maximum capacity recovers perhaps 72% of the original runtime. On an M1 13-inch that once lasted 17 hours, this means roughly 12 hours — noticeable but still functional. At 60% capacity, you are at 10 hours and the machine will begin unexpected shutdowns at low charge levels.
            </p>
            <p>
              The M1 battery adhesive system is identical to the Intel generation that preceded it — stretch-release pull-tabs bonded with a pressure-sensitive adhesive. On the 13-inch M1, there are four adhesive tabs beneath the dual-cell array. They pull cleanly on an early-generation machine that has never had a swollen battery. On a machine that has been running warm for months due to battery degradation, the adhesive can become brittle and break mid-pull, leaving the cell partially bonded. We handle this with a graduated application of isopropyl alcohol-based adhesive solvent at the seams, which releases the bond without requiring excessive mechanical force.
            </p>
            <p>
              One detail worth noting for M1 Pro and M1 Max 14-inch owners: the bottom case on this model is secured with five pentalobe screws at the base and uses a different case design from the 13-inch M1. The battery connector sits near the left speaker grille and requires careful speaker flex cable routing during removal. We have a documented checklist for M1 Pro/Max battery replacements specifically, built from our experience with these models, and the 4 to 6 hour turnaround reflects the additional care required.
            </p>
            <p>
              After replacement, we run a full charge-discharge calibration cycle with macOS open. The new battery registers in System Information with a cycle count of 1 and maximum capacity at 100%. We issue a System Information screenshot with every completed repair, alongside your written warranty document. This gives you a baseline reference point for tracking capacity over the lifetime of the new cell.
            </p>
          </div>
          <div className="mt-6">
            <a
              href="https://www.ifixit.com/Device/MacBook_Pro_13%22_Late_2020_-_A2338_M1"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[#0FEA7A] text-sm font-semibold hover:underline"
            >
              iFixit MacBook Pro M1 battery guide <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Battery Fault Types */}
      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4">MacBook Pro M1 Battery Fault Patterns We Repair</h2>
          <p className="text-[#7A9E98] mb-10 max-w-3xl leading-relaxed">
            The first Apple Silicon generation is now old enough that battery faults are a daily occurrence in our workshop. Each fault below is diagnosable before quoting — we confirm the battery is the actual cause before any work begins.
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
              Every repair is quoted before work begins. Our From R599 assessment policy means that if we assess your MacBook Pro M1 and determine a battery replacement will not resolve your issue, an assessment fee of R599 applies and your machine is returned exactly as we received it. Up-to-3 year warranty on all completed battery replacements.
            </p>
          </div>
        </div>
      </section>

      {/* Apple vs ZA Support Comparison */}
      <section className="py-10 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-4">Apple Store vs ZA Support: MacBook Pro M1 Battery</h2>
          <p className="text-[#7A9E98] mb-8 leading-relaxed">
            Apple&apos;s service pathway often replaces the entire top case — keyboard, trackpad, and battery as one assembly — rather than just the battery cells. We replace the battery only, at a fraction of the cost.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            <div className="glass-card p-6 border border-red-500/20">
              <h3 className="text-red-400 font-bold mb-4">Apple Store / iStore</h3>
              <ul className="text-[#7A9E98] text-sm space-y-2.5">
                <li>Top case assembly on some models — R3,500 to R8,000+</li>
                <li>Turnaround 5–10 business days via Apple depot</li>
                <li>No M1-specific battery cycle diagnostics shared with client</li>
                <li>AppleCare+ required for any cost reduction</li>
                <li>Keyboard and trackpad replaced unnecessarily</li>
                <li>No capacity report issued at collection</li>
              </ul>
            </div>
            <div className="glass-card p-6 border border-[rgba(15,234,122,0.3)]">
              <h3 className="text-[#0FEA7A] font-bold mb-4">ZA Support</h3>
              <ul className="text-[#7A9E98] text-sm space-y-2.5">
                <li>Battery cells only — top case, keyboard, trackpad untouched</li>
                <li>M1 13″ from R1,799 | M1 14″/16″ from R2,299</li>
                <li>coconutBattery diagnostic before and after — results shared</li>
                <li>Turnaround 2–6 hours same day</li>
                <li>System Information screenshot included at collection</li>
                <li>Up-to-3 year warranty on the replacement cell</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Service Process */}
      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-8">Our MacBook Pro M1 Battery Replacement Process</h2>
          <div className="space-y-6">
            {[
              {
                step: 1,
                title: 'Drop Off & M1 Battery Diagnostic',
                desc: 'No appointment needed at our Hyde Park workshop. We run a full M1 battery diagnostic immediately: cycle count, maximum capacity, cell voltage balance, and charging circuit health via coconutBattery and System Information. Written quote within 20 minutes.',
              },
              {
                step: 2,
                title: 'Bottom Case Removal & Battery Extraction',
                desc: 'Five pentalobe screws secure the bottom case on M1 14/16-inch models; the 13-inch uses six. We disconnect the battery connector, release the adhesive pull-tabs with controlled heat (max 50°C) and adhesive solvent. On swollen cells, controlled depressurisation is used before extraction. Non-conductive plastic tools only near the battery pouch.',
              },
              {
                step: 3,
                title: 'Replacement Cell Verification & Installation',
                desc: 'The replacement cell is tested for open-circuit voltage, capacity, and cell balance before installation. We verify it matches the OEM capacity specification (58.2 Wh, 69.6 Wh, or 99.6 Wh depending on your model). Battery connector is seated and the bottom case torqued to spec.',
              },
              {
                step: 4,
                title: 'Calibration & Charging Verification',
                desc: 'We run a full charge-discharge cycle with macOS open. Battery health is confirmed at 100% in System Settings. Cycle count resets to 1 or 0. MagSafe and USB-C charging both verified. Thermal monitoring confirms no excessive heat during charging.',
              },
              {
                step: 5,
                title: 'Collect With Warranty Document',
                desc: 'You collect with a written warranty of up to 3 years, a System Information screenshot confirming battery health, and the assessment fee included in the total cost. If the battery fails within the warranty period, we replace it again at from R599.',
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
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-4">MacBook Pro M1 Battery Replacement — Johannesburg Service Area</h2>
          <p className="text-[#7A9E98] mb-6 leading-relaxed">
            Our Hyde Park workshop is 10 to 20 minutes from most northern Johannesburg suburbs. We offer collection and return from Sandton, Rosebank, Bryanston, Fourways, Midrand, Randburg, Morningside, Rivonia, and Houghton. Same-day collection is available for urgent swollen battery cases.
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
            Also covering Kempton Park, Pretoria, and Centurion by arrangement. Call us on {CONTACT.phone} to confirm availability.{' '}
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
          <FAQAccordion items={faqs} title="MacBook Pro M1 Battery Replacement — Common Questions" />
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
            <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3">MacBook Pro M1 Battery Issue? Book a Diagnostic.</h2>
            <p className="text-[#7A9E98] mb-6 max-w-xl mx-auto leading-relaxed">
              WhatsApp us a description of the fault — reduced runtime, unexpected shutdowns, swollen battery, or a trackpad that no longer clicks — and we will give you an honest price range before you bring the machine in.  Assessment from R599, applied toward the repair if you proceed.
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
              1 Hyde Lane, Hyde Park, Office E2004, JHB 2196 | M1 13″ from R1,799 | M1 14″/16″ from R2,299 | Up-to-3 year warranty
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
