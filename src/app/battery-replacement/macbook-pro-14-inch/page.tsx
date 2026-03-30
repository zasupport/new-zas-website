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
  title: 'MacBook Pro 14-inch Battery Replacement Johannesburg [2026] | From R2,299 | ZA Support',
  description:
    'MacBook Pro 14-inch battery replacement Johannesburg from R2,299. M1 Pro/Max through M4 Pro/Max. 70–72.4Wh cells. Pentalobe + adhesive strip removal. No Fix No Fee. Hyde Park.',
  alternates: { canonical: 'https://zasupport.com/battery-replacement/macbook-pro-14-inch' },
  keywords: [
    'MacBook Pro 14 inch battery replacement Johannesburg',
    'MacBook Pro 14 inch battery replacement Hyde Park',
    'MacBook Pro 14 battery swollen Johannesburg',
    'MacBook Pro 14 M1 M2 M3 M4 battery replacement',
    'MacBook Pro 14 Pro Max battery replacement',
    'MacBook Pro 14 inch battery cost South Africa',
    'MacBook Pro 14 inch battery Sandton',
    'MacBook Pro A2442 A2779 A2992 battery replacement',
    'MacBook Pro 14 inch 70Wh battery',
    'MacBook Pro 14 inch battery service Johannesburg',
  ],
};

/* ── Breadcrumbs ─────────────────────────────────────────────────────────── */
const breadcrumbItems = [
  { label: 'Battery Replacement', href: '/battery-replacement' },
  { label: 'MacBook Pro', href: '/battery-replacement/macbook-pro' },
  { label: '14-inch' },
];

const breadcrumbSchemaItems = [
  { name: 'Home', url: 'https://zasupport.com' },
  { name: 'Battery Replacement', url: 'https://zasupport.com/battery-replacement' },
  { name: 'MacBook Pro', url: 'https://zasupport.com/battery-replacement/macbook-pro' },
  { name: 'MacBook Pro 14-inch', url: 'https://zasupport.com/battery-replacement/macbook-pro-14-inch' },
];

/* ── Service Schema ──────────────────────────────────────────────────────── */
const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'MacBook Pro 14-inch Battery Replacement Johannesburg',
  description:
    'Professional MacBook Pro 14-inch battery replacement in Johannesburg. M1 Pro/Max through M4 Pro/Max. 69.6Wh to 72.4Wh cells. Pentalobe and adhesive strip removal. From R2,299. No Fix No Fee. Up-to-3 year warranty.',
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
    lowPrice: '2299',
    highPrice: '2299',
    priceCurrency: 'ZAR',
    offerCount: '6',
  },
  availableChannel: [
    { '@type': 'ServiceChannel', serviceUrl: 'https://wa.me/27645295863', serviceType: 'WhatsApp' },
    { '@type': 'ServiceChannel', servicePhone: '+27645295863', serviceType: 'Phone' },
  ],
};

/* ── Pricing Table ───────────────────────────────────────────────────────── */
const pricingRows = [
  { model: 'MacBook Pro 14″ M1 Pro (2021) — A2442', battery: '69.6 Wh', from: 'R2,299', turnaround: '4–6 hrs' },
  { model: 'MacBook Pro 14″ M1 Max (2021) — A2442', battery: '69.6 Wh', from: 'R2,299', turnaround: '4–6 hrs' },
  { model: 'MacBook Pro 14″ M2 Pro (2023) — A2779', battery: '70 Wh', from: 'R2,299', turnaround: '4–6 hrs' },
  { model: 'MacBook Pro 14″ M2 Max (2023) — A2779', battery: '70 Wh', from: 'R2,299', turnaround: '4–6 hrs' },
  { model: 'MacBook Pro 14″ M3/M3 Pro/Max (2023) — A2992', battery: '72.4 Wh', from: 'R2,299', turnaround: '4–6 hrs' },
  { model: 'MacBook Pro 14″ M4/M4 Pro/Max (2024) — A3233', battery: '72.4 Wh', from: 'R2,299', turnaround: '4–6 hrs' },
];

/* ── Fault Types ─────────────────────────────────────────────────────────── */
const faultTypes = [
  {
    title: 'Bottom Case Bowing — Swollen 70Wh Cell',
    icon: AlertTriangle,
    desc: 'On the MacBook Pro 14-inch, the battery does not sit beneath the trackpad as it does on the 13-inch. Instead, the 69.6 to 72.4 Wh cell spans the central section of the lower case, between the speakers. When swelling occurs, it causes the aluminium bottom case to bow outward visibly — particularly noticeable when the machine is placed on a flat surface. The machine will rock rather than sit flat. This is the clearest visual indicator of a swollen 14-inch battery, and it is an urgent repair. A swollen lithium-polymer cell contains flammable electrolyte and should not be left unserviced.',
    severity: 'high',
  },
  {
    title: 'Cycle Count at End-of-Life',
    icon: Battery,
    desc: 'The 2021 M1 Pro MacBook Pro 14-inch is now approaching four years of age — sufficient for heavy-use machines to reach or exceed 700 cycles. Apple rates the battery for 1,000 cycles, but South African users who experienced Stage 4 and Stage 6 load shedding between 2022 and 2024 may have accumulated additional partial cycles. We see 14-inch MacBook Pros in our workshop with cycle counts of 600 to 800 and capacity readings of 78 to 85%. If you are running below 85% and noticing reduced runtime from the rated 17 hours, a battery assessment confirms whether replacement is worthwhile.',
    severity: 'medium',
  },
  {
    title: 'Pentalobe Screw Adhesive Complexity',
    icon: Wrench,
    desc: 'The MacBook Pro 14-inch uses five pentalobe screws to secure the bottom case, plus a multi-section adhesive battery array that spans the full width of the lower chassis. The adhesive pull-tab layout on the 14-inch differs from the 13-inch — there are typically six to eight separate adhesive sections, and the cells must be extracted sequentially from one end to avoid uneven tension that can cause tab breakage. We have a documented 14-inch battery extraction sequence developed through hundreds of replacements that minimises the risk of adhesive residue or top case damage.',
    severity: 'medium',
  },
  {
    title: 'MagSafe Charging Fault',
    icon: Activity,
    desc: 'The MacBook Pro 14-inch (from M1 onwards) reintroduced MagSafe as the primary charging port alongside two USB-C / Thunderbolt ports. A degraded 14-inch battery with uneven cell voltages can cause MagSafe charging failures — the LED may amber-flash or the charge percentage may not advance. This is typically a battery-side fault caused by excessive current draw at low state of charge interfering with the USB-C PD negotiation. We test MagSafe and both USB-C ports independently before attributing a cause, and verify all three charging paths after battery replacement.',
    severity: 'medium',
  },
  {
    title: 'Load Shedding Micro-Cycle Accumulation',
    icon: BatteryWarning,
    desc: 'The MacBook Pro 14-inch is the preferred machine of many professionals in Johannesburg — architects, video editors, software developers — who use it as their primary workstation at home. These users experienced the full impact of 2023 Stage 6 load shedding on their battery health. A machine used for 10 hours per day with 12 power interruptions per day can accumulate the equivalent of 3 to 4 additional charge cycles per day. Over 12 months, this adds 1,000 to 1,500 additional partial cycles — meaning a machine rated for 1,000 cycles could reach end-of-life in under two years of South African use.',
    severity: 'low',
  },
  {
    title: 'Unexpected Shutdown Under High Load',
    icon: Zap,
    desc: 'M1 Pro and M1 Max 14-inch machines are capable of sustained high-performance workloads that draw significantly more battery current than light use. A degraded cell with uneven voltage distribution can trigger a protective shutdown at 20 to 30% charge under high load — even when the machine performs normally at light load with the same charge level. This is a diagnostic challenge: the machine appears to work normally most of the time. We run a load test while monitoring battery voltage and current output to confirm this pattern before quoting.',
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
    question: 'How much does MacBook Pro 14-inch battery replacement cost in Johannesburg?',
    answer:
      'MacBook Pro 14-inch battery replacement starts from R2,299 at our Hyde Park workshop, covering all models from the M1 Pro/Max (2021) through to the M4 Pro/Max (2024). The Apple Store charges R4,000 to R8,000 for the same service. Our price includes the replacement cell, all labour, calibration, and a written warranty of up to 3 years. The assessment fee (from R599) is applied toward the repair cost if you proceed.',
  },
  {
    question: 'Which MacBook Pro 14-inch models do you service?',
    answer:
      'We replace batteries on all MacBook Pro 14-inch generations: M1 Pro/Max (A2442, 2021), M2 Pro/Max (A2779, 2023), M3/M3 Pro/M3 Max (A2992, Late 2023), and M4/M4 Pro/M4 Max (A3233, 2024). We verify the model identifier before ordering to ensure the correct cell capacity variant — 69.6 Wh for M1, 70 Wh for M2, and 72.4 Wh for M3 and M4.',
  },
  {
    question: 'What is the battery capacity of the MacBook Pro 14-inch?',
    answer:
      'The MacBook Pro 14-inch M1 Pro/Max (2021) uses a 69.6 Wh cell. The M2 Pro/Max (2023) uses a 70 Wh cell. The M3 and M4 generations (Late 2023 and 2024) use a 72.4 Wh cell. Despite the small capacity differences, Apple rates all generations for 1,000 charge cycles. The M3 and M4 generations quote 22 hours of battery life under ideal conditions due to chip efficiency improvements rather than the cell capacity increase alone.',
  },
  {
    question: 'My MacBook Pro 14-inch bottom case is bowing outward — what is causing this?',
    answer:
      'This is a swollen battery. On the 14-inch MacBook Pro, the battery spans the central section of the lower case rather than sitting beneath the trackpad as it does on the 13-inch. When the cells off-gas and swell, the aluminium bottom case bows outward, causing the machine to rock on a flat surface. This is an urgent fault. Do not continue using the machine, do not store it in a bag, and do not place it near heat sources. Contact us immediately — we handle 14-inch swollen battery cases with a full decompression and controlled removal protocol.',
  },
  {
    question: 'How long does MacBook Pro 14-inch battery replacement take?',
    answer:
      'MacBook Pro 14-inch battery replacements take 4 to 6 hours. The 70 to 72.4 Wh cell has a larger adhesive footprint than the 13-inch and spans the full width of the lower case, requiring sequential tab extraction to avoid uneven tension. Same-day service is available when booked before 14:00. WhatsApp us to confirm a slot before bringing the machine in.',
  },
  {
    question: 'Does load shedding affect MacBook Pro 14-inch battery health?',
    answer:
      'Yes, and the 14-inch is disproportionately affected because it is used as a primary professional workstation. South African professionals using a 14-inch MacBook Pro at home during Stage 6 load shedding in 2023 experienced up to 12 power interruptions per day — each adding a partial charge cycle. A machine rated for 1,000 cycles could reach end-of-battery life in under two years of South African use under Stage 6 conditions without a UPS. We recommend a quality UPS for all 14-inch MacBook Pro owners who use the machine at a desk with mains power.',
  },
  {
    question: 'Is the battery replacement on the 14-inch harder than the 13-inch?',
    answer:
      'Yes, meaningfully so. The 14-inch battery is larger (69.6 to 72.4 Wh vs 58.2 Wh on the 13-inch), spans a larger adhesive footprint across the lower case, and requires sequential tab extraction across six to eight adhesive sections rather than the four tabs on the 13-inch. Getting the extraction sequence wrong causes adhesive tab breakage and leaves residue on the top case anodised surface. This is why our 14-inch turnaround is 4 to 6 hours rather than the 2 to 4 hours for the 13-inch.',
  },
  {
    question: 'Will replacing the battery on my MacBook Pro 14-inch reset the health to 100%?',
    answer:
      'Yes. After professional battery replacement on any MacBook Pro 14-inch, System Settings shows battery health at 100% and the cycle count resets to 0 or 1. The "Service Recommended" notice clears. We issue a System Information screenshot at collection confirming these values as your warranty baseline.',
  },
  {
    question: 'Can you replace the battery in M4 MacBook Pro 14-inch models?',
    answer:
      'Yes. The M4 Pro and M4 Max MacBook Pro 14-inch (A3233, 2024) uses a 72.4 Wh cell, the same capacity as the M3 14-inch. The chassis design is largely unchanged from M3, and we service M4 models using the same documented procedure. We verify the model identifier before ordering the replacement cell to ensure the correct part.',
  },
  {
    question: 'What warranty do you offer on MacBook Pro 14-inch battery replacements?',
    answer:
      'MacBook Pro 14-inch battery replacements at ZA Support carry a written warranty of up to 3 years. The warranty covers the replacement cell and our workmanship. If the battery fails within the warranty period, we replace it again at no charge. No Fix No Fee: if our assessment determines the battery is not the cause of your fault, you pay only R599 and your machine is returned unchanged.',
  },
];

/* ── Structured Data ─────────────────────────────────────────────────────── */
const faqSchema = buildFaqSchema(faqs);
const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbSchemaItems);

/* ── Page Component ──────────────────────────────────────────────────────── */
export default function BatteryReplacementMacBookPro14InchPage() {
  const whatsappUrl = buildWhatsAppUrl('BAT-PRO-14-HERO', 'battery');

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
              MacBook Pro 14-inch Battery Replacement
              <br /><span className="text-[#0FEA7A]">Johannesburg</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-4 max-w-3xl leading-relaxed">
              M1 Pro/Max through M4 Pro/Max — 69.6 to 72.4 Wh cell replacement at our Hyde Park workshop. Multi-section adhesive extraction specialists. From R2,299. Same-day service available.
            </p>
            <div className="flex items-center gap-2 text-[#7A9E98] text-sm mb-8">
              <MapPin className="w-4 h-4 text-[#0FEA7A]" />
              <span>1 Hyde Lane, Hyde Park, Office E2004, JHB 2196 | MacBook Pro 14″ from R2,299</span>
            </div>
            <div className="flex flex-wrap gap-3 mb-8">
              {[
                { icon: Shield, label: 'No Fix No Fee' },
                { icon: Battery, label: 'M1 through M4 Pro/Max' },
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
              <Link href="/battery-replacement/macbook-pro" className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.2)] text-[#7A9E98] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[rgba(15,234,122,0.05)] transition-all">
                All MacBook Pro Battery <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
            <div className="flex flex-wrap gap-6 mt-8 pt-6 border-t border-[rgba(255,255,255,0.06)]">
              {[
                { value: '1,200+', label: '14″ Batteries Replaced' },
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
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4">MacBook Pro 14-inch Battery Replacement Pricing</h2>
          <p className="text-[#7A9E98] mb-8 max-w-3xl leading-relaxed">
            Starting prices include the replacement cell, labour, calibration, and our written warranty. Apple charges R4,000 to R8,000+ for 14-inch battery service. We replace only the battery cells.
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
            All prices include the replacement cell, labour, calibration, and our up-to-3 year warranty. Assessment from R599 — applied toward the repair cost if you proceed. No Fix No Fee applies on all cases.
          </p>
        </div>
      </section>

      {/* Technical Detail */}
      <section className="py-10 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4">MacBook Pro 14-inch Battery — Why It Is a More Complex Replacement</h2>
          <div className="space-y-4 text-[#7A9E98] leading-relaxed">
            <p>
              The MacBook Pro 14-inch arrived in October 2021 as Apple&apos;s most significant MacBook Pro redesign since 2016. The return of MagSafe, HDMI, and SD card reader came alongside a new 14.2-inch display and a substantially revised internal layout. The battery — a 69.6 Wh cell in the original M1 Pro/Max model — is physically larger than the 13-inch cells it replaced in Apple&apos;s lineup, and the adhesive mounting system is correspondingly more complex.
            </p>
            <p>
              The 14-inch battery spans the full width of the lower chassis between the speaker modules. Apple uses six to eight adhesive pull-tab sections across this larger footprint, and the tabs must be extracted in a specific sequence from one end to the other. Attempting to pull from the centre, or applying uneven tension across multiple tabs simultaneously, causes the adhesive tabs to snap — leaving bonded adhesive residue that requires solvent to remove safely without damaging the anodised top case surface. This is the primary reason our 14-inch turnaround is 4 to 6 hours rather than the 2 to 4 hours quoted for the 13-inch.
            </p>
            <p>
              Between M1 and M3/M4 generations, the cell capacity increased from 69.6 Wh to 70 Wh (M2) and then to 72.4 Wh (M3/M4). These are not the same physical cell despite sharing a 14-inch chassis form factor. We verify the model identifier — A2442 (M1), A2779 (M2), A2992 (M3), A3233 (M4) — before ordering to ensure the replacement cell matches the OEM capacity specification. Installing a lower-capacity cell will result in reduced runtime and may cause macOS to report incorrect battery health figures.
            </p>
            <p>
              The MacBook Pro 14-inch is the laptop most commonly used by professionals in Johannesburg — developers, architects, video editors, data scientists. These users tend to run the machine under sustained high loads that draw more current from the battery than light office use. An M1 Max running a 4K ProRes export draws significantly more battery current than the same machine doing email. Cells that degrade unevenly under these conditions develop voltage imbalances that cause unexpected shutdowns at moderate charge levels under load. We run a load test as part of our diagnostic to identify this pattern before quoting.
            </p>
            <p>
              The most effective preventive measure for 14-inch MacBook Pro owners in Johannesburg is a quality UPS with automatic voltage regulation. During load shedding events, the UPS maintains clean AC power and the MacBook Pro never transitions to battery power — eliminating partial cycle accumulation entirely. We see the difference in cycle counts between clients who use a UPS and those who do not, and it is significant.
            </p>
          </div>
          <div className="mt-6">
            <a href="https://www.ifixit.com/Device/MacBook_Pro_14%22_Late_2021" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-[#0FEA7A] text-sm font-semibold hover:underline">
              iFixit MacBook Pro 14-inch battery guide <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Battery Fault Types */}
      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4">MacBook Pro 14-inch Battery Faults We Repair</h2>
          <p className="text-[#7A9E98] mb-10 max-w-3xl leading-relaxed">
            Four generations of 14-inch MacBook Pro, and the fault patterns are consistent. Each is diagnosed before quoting.
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
              Every repair is quoted before work begins. No Fix No Fee: assessment fee of R599 applies if the battery is not the cause, and your machine is returned unchanged. Up-to-3 year warranty on all completed battery replacements.
            </p>
          </div>
        </div>
      </section>

      {/* Apple vs ZA Support */}
      <section className="py-10 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-4">Apple Store vs ZA Support: MacBook Pro 14-inch Battery</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="glass-card p-6 border border-red-500/20">
              <h3 className="text-red-400 font-bold mb-4">Apple Store / iStore</h3>
              <ul className="text-[#7A9E98] text-sm space-y-2.5">
                <li>R4,000 to R8,000+ for 14-inch battery service</li>
                <li>Turnaround 5–10 business days via depot</li>
                <li>May replace entire top case assembly</li>
                <li>No load testing to distinguish fault causes</li>
                <li>No capacity report at collection</li>
                <li>AppleCare+ required for reduced pricing</li>
              </ul>
            </div>
            <div className="glass-card p-6 border border-[rgba(15,234,122,0.3)]">
              <h3 className="text-[#0FEA7A] font-bold mb-4">ZA Support</h3>
              <ul className="text-[#7A9E98] text-sm space-y-2.5">
                <li>Battery cells only — M1 through M4 Pro/Max</li>
                <li>14″ from R2,299 including warranty</li>
                <li>Load test to distinguish battery vs logic board fault</li>
                <li>Turnaround 4–6 hours same day</li>
                <li>System Information screenshot at collection</li>
                <li>Up-to-3 year warranty on the replacement cell</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Service Process */}
      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-8">Our MacBook Pro 14-inch Battery Replacement Process</h2>
          <div className="space-y-6">
            {[
              { step: 1, title: 'Drop Off & Diagnostic', desc: 'No appointment needed. Full 14-inch battery diagnostic: cycle count, capacity, cell balance, load test if required. Written quote within 20 minutes.' },
              { step: 2, title: 'Bottom Case & Sequential Adhesive Release', desc: 'Five pentalobe screws removed. Battery connector disconnected. Adhesive tabs extracted sequentially from one end using controlled heat (max 50°C) and solvent. Six to eight sections managed individually. Non-conductive plastic tools only.' },
              { step: 3, title: 'Model-Verified Replacement Cell', desc: 'Model identifier confirmed (A2442/A2779/A2992/A3233). Replacement cell tested for correct capacity (69.6/70/72.4 Wh), voltage, and cell balance before installation.' },
              { step: 4, title: 'MagSafe + USB-C Charging Verification', desc: 'Full charge-discharge calibration. Battery health confirmed at 100%. MagSafe LED verified green. Both USB-C ports verified for clean power acceptance.' },
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
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-4">MacBook Pro 14-inch Battery — Johannesburg Service Area</h2>
          <p className="text-[#7A9E98] mb-6 leading-relaxed">
            10 to 20 minutes from most northern Johannesburg suburbs. Collection and return available from Sandton, Rosebank, Bryanston, Fourways, Midrand, Randburg, and Morningside.
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
          <FAQAccordion items={faqs} title="MacBook Pro 14-inch Battery Replacement — Common Questions" />
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
              { label: 'MacBook Pro 16″ Battery', href: '/battery-replacement/macbook-pro-16-inch' },
              { label: 'MacBook Pro M1 Battery', href: '/battery-replacement/macbook-pro-m1' },
              { label: 'MacBook Pro M3 Battery', href: '/battery-replacement/macbook-pro-m3' },
              { label: 'Logic Board — 14-inch', href: '/logic-board-repair/macbook-pro-14-inch' },
              { label: 'Logic Board Repair', href: '/logic-board-repair' },
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
            <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3">MacBook Pro 14-inch Battery Issue? Book a Diagnostic.</h2>
            <p className="text-[#7A9E98] mb-6 max-w-xl mx-auto leading-relaxed">
              WhatsApp us your model year and fault description — reduced runtime, bottom case bowing, unexpected shutdown under load, or "Service Recommended" — and we will confirm pricing before you come in. Assessment from R599, applied toward the repair if you proceed.
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
              1 Hyde Lane, Hyde Park, Office E2004, JHB 2196 | MacBook Pro 14″ from R2,299 | Up-to-3 year warranty
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
