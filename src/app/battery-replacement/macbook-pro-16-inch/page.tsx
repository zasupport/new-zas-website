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
  title: 'MacBook Pro 16-inch Battery Replacement Johannesburg [2026] | From R2,299 | ZA Support',
  description:
    'MacBook Pro 16-inch battery replacement Johannesburg from R2,299. M1 through M4 Pro/Max. 100Wh cell — aviation limit. Largest MacBook battery. No Fix No Fee. Hyde Park.',
  alternates: { canonical: 'https://zasupport.com/battery-replacement/macbook-pro-16-inch' },
  keywords: [
    'MacBook Pro 16 inch battery replacement Johannesburg',
    'MacBook Pro 16 inch battery replacement Hyde Park',
    'MacBook Pro 16 battery swollen Johannesburg',
    'MacBook Pro 16 M1 M2 M3 M4 battery replacement',
    'MacBook Pro 16 Pro Max battery replacement',
    'MacBook Pro 16 inch battery cost South Africa',
    '100Wh MacBook Pro battery replacement',
    'MacBook Pro 16 inch battery Sandton',
    'MacBook Pro A2485 A2780 A2991 battery replacement',
    'largest MacBook battery replacement Johannesburg',
  ],
};

/* ── Breadcrumbs ─────────────────────────────────────────────────────────── */
const breadcrumbItems = [
  { label: 'Battery Replacement', href: '/battery-replacement' },
  { label: 'MacBook Pro', href: '/battery-replacement/macbook-pro' },
  { label: '16-inch' },
];

const breadcrumbSchemaItems = [
  { name: 'Home', url: 'https://zasupport.com' },
  { name: 'Battery Replacement', url: 'https://zasupport.com/battery-replacement' },
  { name: 'MacBook Pro', url: 'https://zasupport.com/battery-replacement/macbook-pro' },
  { name: 'MacBook Pro 16-inch', url: 'https://zasupport.com/battery-replacement/macbook-pro-16-inch' },
];

/* ── Service Schema ──────────────────────────────────────────────────────── */
const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'MacBook Pro 16-inch Battery Replacement Johannesburg',
  description:
    'Professional MacBook Pro 16-inch battery replacement in Johannesburg. M1 Pro/Max through M4 Pro/Max. 99.6Wh to 100Wh cells — at the aviation carry-on limit. Largest MacBook battery. From R2,299. No Fix No Fee. Up-to-3 year warranty.',
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
    offerCount: '4',
  },
  availableChannel: [
    { '@type': 'ServiceChannel', serviceUrl: 'https://wa.me/27645295863', serviceType: 'WhatsApp' },
    { '@type': 'ServiceChannel', servicePhone: '+27645295863', serviceType: 'Phone' },
  ],
};

/* ── Pricing Table ───────────────────────────────────────────────────────── */
const pricingRows = [
  { model: 'MacBook Pro 16″ M1 Pro (2021) — A2485', battery: '99.6 Wh', from: 'R2,299', turnaround: '4–6 hrs' },
  { model: 'MacBook Pro 16″ M1 Max (2021) — A2485', battery: '99.6 Wh', from: 'R2,299', turnaround: '4–6 hrs' },
  { model: 'MacBook Pro 16″ M2 Pro (2023) — A2780', battery: '100 Wh', from: 'R2,299', turnaround: '4–6 hrs' },
  { model: 'MacBook Pro 16″ M2 Max (2023) — A2780', battery: '100 Wh', from: 'R2,299', turnaround: '4–6 hrs' },
  { model: 'MacBook Pro 16″ M3 Pro (Late 2023) — A2991', battery: '100 Wh', from: 'R2,299', turnaround: '4–6 hrs' },
  { model: 'MacBook Pro 16″ M3 Max (Late 2023) — A2991', battery: '100 Wh', from: 'R2,299', turnaround: '4–6 hrs' },
];

/* ── Fault Types ─────────────────────────────────────────────────────────── */
const faultTypes = [
  {
    title: 'Swollen 100Wh Cell — Serious Hazard',
    icon: AlertTriangle,
    desc: 'The MacBook Pro 16-inch houses the largest battery in any MacBook — a 99.6 to 100 Wh lithium-polymer cell that spans nearly the entire lower half of the chassis. When this cell begins to off-gas and swell, the consequences are more dramatic than on smaller models. The bottom case bows outward significantly, the machine cannot rest flat on a desk, and in advanced cases the aluminium case deforms around the speaker grilles. A 100 Wh cell that is fully off-gassing contains a substantial volume of flammable vapour. This requires immediate professional removal. Contact us before transporting the machine if swelling is visible.',
    severity: 'high',
  },
  {
    title: 'Aviation Limit — Battery Transport Restrictions',
    icon: BatteryWarning,
    desc: 'The 100 Wh cell in the MacBook Pro 16-inch (M2, M3, M4) sits at exactly the ICAO aviation carry-on limit for lithium batteries. Airlines permit batteries up to 100 Wh without approval — batteries above 100 Wh require airline permission or are prohibited entirely. The 99.6 Wh M1 Pro/Max cell is technically under this limit. A swollen 100 Wh cell should never be transported on an aircraft and ideally should not be transported in a vehicle without ventilation. We handle all 100 Wh cell removals using our swollen battery protocol.',
    severity: 'high',
  },
  {
    title: 'Reduced Runtime — High-Performance Workloads',
    icon: Battery,
    desc: 'The MacBook Pro 16-inch is chosen by professionals who need sustained high-performance computing: 3D rendering, 4K/8K video editing, ML model training. These workloads draw 60 to 80W from the battery when on battery power — meaning a 100 Wh cell delivers only 1.5 to 2 hours of sustained full-performance work on a new battery. As the cell degrades to 80% capacity, that window shrinks to 1.2 to 1.6 hours. Users notice this reduction first under high load, not during light use, which is why runtime complaints on the 16-inch often focus on specific workloads rather than general browsing.',
    severity: 'medium',
  },
  {
    title: 'Cycle Count — Professional Heavy Use',
    icon: Cpu,
    desc: 'The M1 Pro/Max 16-inch was released in October 2021. Heavy professional users — those running sustained workloads for 6 to 8 hours per day — may have accumulated 700 to 900 cycles in three to four years of use. Combined with South African load shedding partial cycles, some M1 16-inch units in our workshop present at 850 to 1,000 cycles with capacity readings of 75 to 82%. We confirm this with coconutBattery before quoting and provide the capacity data in writing. If your 16-inch regularly runs on battery during load shedding, a UPS is the highest-leverage purchase you can make.',
    severity: 'medium',
  },
  {
    title: 'MagSafe + USB-C Charging Fault',
    icon: Activity,
    desc: 'The MacBook Pro 16-inch charges at up to 140W via the MagSafe 3 port and 96W via USB-C. A degraded battery drawing excessive current at low state of charge can cause MagSafe LED amber-flicker or USB-C charging failure. We see this particularly on M1 Pro 16-inch units with high cycle counts. The fault resolves immediately after battery replacement in the majority of cases. We test both MagSafe and both USB-C Thunderbolt ports through a full charge cycle after replacement before return.',
    severity: 'medium',
  },
  {
    title: 'Long Adhesive Extraction — Extraction Complexity',
    icon: Wrench,
    desc: 'The 100 Wh battery in the MacBook Pro 16-inch has the most extensive adhesive bonding area of any MacBook battery. Eight or more adhesive pull-tab sections span the full width of the 16-inch lower case, and each must be extracted sequentially. The tabs on swollen batteries are under compression from the expanded cell — pulling them releases that pressure, and if done too quickly, can cause the tab to tear rather than pull cleanly. Our 16-inch extraction protocol was developed specifically to manage swollen and non-swollen cell removal at the same pace, using controlled heat and solvent to release bond stress before pulling.',
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
    question: 'How much does MacBook Pro 16-inch battery replacement cost in Johannesburg?',
    answer:
      'MacBook Pro 16-inch battery replacement starts from R2,299 at our Hyde Park workshop. This covers all generations from the M1 Pro/Max (2021) through to the M3 Pro/Max (Late 2023). The Apple Store charges R4,000 to R8,000+ for the same service. Our price includes the 99.6 or 100 Wh replacement cell, all labour, calibration, and a written warranty of up to 3 years. Assessment from R599, applied toward the repair cost if you proceed.',
  },
  {
    question: 'What is the battery capacity of the MacBook Pro 16-inch?',
    answer:
      'The MacBook Pro 16-inch M1 Pro and M1 Max (2021) use a 99.6 Wh lithium-polymer cell. The M2 Pro/Max (2023) and M3 Pro/Max (Late 2023) use a 100 Wh cell — exactly at the ICAO aviation carry-on limit of 100 Wh per battery. This is the largest battery Apple fits in any MacBook Pro, and it is the primary reason the 16-inch MacBook Pro is rated for up to 22 hours of video playback under M3 Max conditions.',
  },
  {
    question: 'Can I fly with a MacBook Pro 16-inch? Is the 100Wh battery a problem?',
    answer:
      'Yes, you can fly with a MacBook Pro 16-inch in carry-on luggage. The ICAO limit for carry-on lithium batteries without airline approval is 100 Wh — the 100 Wh cell in the M2 and M3 16-inch is exactly at this limit, not above it. The M1 16-inch at 99.6 Wh is clearly below the limit. A swollen 100 Wh battery is a different situation — we would advise against flying with a visibly swollen battery in any device.',
  },
  {
    question: 'My MacBook Pro 16-inch bottom case is bowing outward — is this a swollen battery?',
    answer:
      'Almost certainly yes. The 100 Wh cell in the MacBook Pro 16-inch spans nearly the entire lower half of the chassis. When it swells, the aluminium bottom case bows outward visibly and the machine rocks on a flat surface. This is an urgent repair. Do not continue using the machine, do not store it in a bag or confined space, and do not place it near heat sources or on soft surfaces that restrict airflow. Contact us immediately — we handle 16-inch swollen battery cases with our full decompression and controlled removal protocol.',
  },
  {
    question: 'How long does MacBook Pro 16-inch battery replacement take?',
    answer:
      'MacBook Pro 16-inch battery replacements take 4 to 6 hours. The 100 Wh cell has the most extensive adhesive footprint of any MacBook battery — eight or more pull-tab sections across the full width of the lower case. Sequential extraction is required to prevent tab breakage. Same-day service is available when booked before 14:00. WhatsApp us to confirm a slot.',
  },
  {
    question: 'Does load shedding affect MacBook Pro 16-inch battery health in South Africa?',
    answer:
      'Yes. The 16-inch MacBook Pro is used predominantly as a desktop replacement — it is typically plugged in at a desk. During load shedding, it transitions between battery and AC power repeatedly, accumulating partial cycles. South African Stage 6 conditions in 2023 added up to 12 partial cycles per day for extended periods. Over 12 months, this can add the equivalent of 500 to 700 additional cycles. A quality UPS is essential for 16-inch MacBook Pro owners who use the machine as a workstation.',
  },
  {
    question: 'Is the MacBook Pro 16-inch battery harder to replace than the 14-inch?',
    answer:
      'In terms of the core procedure — adhesive removal, cell extraction, connector work — the 16-inch is comparable to the 14-inch. The main difference is scale: the 100 Wh cell is physically larger and has a proportionally larger adhesive footprint. On a swollen 16-inch battery, the additional cell volume means more off-gas volume under compression, which requires a slower, more controlled extraction. Our 4 to 6 hour turnaround for both 14-inch and 16-inch reflects the complexity of the adhesive system rather than the chip size.',
  },
  {
    question: 'Which MacBook Pro 16-inch models do you service?',
    answer:
      'We replace batteries on all Apple Silicon MacBook Pro 16-inch models: M1 Pro (A2485, 2021), M1 Max (A2485, 2021), M2 Pro (A2780, 2023), M2 Max (A2780, 2023), M3 Pro (A2991, Late 2023), and M3 Max (A2991, Late 2023). We verify the model identifier before ordering the replacement cell to ensure the correct capacity — 99.6 Wh for M1 and 100 Wh for M2 and M3.',
  },
  {
    question: 'Will replacing the 16-inch battery reset the health to 100%?',
    answer:
      'Yes. After replacement on a MacBook Pro 16-inch, System Settings shows battery health at 100% and the cycle count resets to 0 or 1. The "Service Recommended" notice clears. We issue a System Information screenshot at collection confirming the new cell is registered correctly as your warranty baseline.',
  },
  {
    question: 'What warranty do you offer on MacBook Pro 16-inch battery replacements?',
    answer:
      'MacBook Pro 16-inch battery replacements at ZA Support carry a written warranty of up to 3 years. The warranty covers the replacement cell and our workmanship. If the battery fails within the warranty period, we replace it again at no charge. No Fix No Fee: if our assessment determines the battery is not the cause of your fault, you pay only R599 and your machine is returned unchanged.',
  },
];

/* ── Structured Data ─────────────────────────────────────────────────────── */
const faqSchema = buildFaqSchema(faqs);
const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbSchemaItems);

/* ── Page Component ──────────────────────────────────────────────────────── */
export default function BatteryReplacementMacBookPro16InchPage() {
  const whatsappUrl = buildWhatsAppUrl('BAT-PRO-16-HERO', 'battery');

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
              MacBook Pro 16-inch Battery Replacement
              <br /><span className="text-[#0FEA7A]">Johannesburg</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-4 max-w-3xl leading-relaxed">
              The largest MacBook battery — 99.6 to 100 Wh, at the aviation carry-on limit. M1 through M3 Pro/Max covered at our Hyde Park workshop. Swollen 100 Wh cells removed safely. From R2,299. Same-day service available.
            </p>
            <div className="flex items-center gap-2 text-[#7A9E98] text-sm mb-8">
              <MapPin className="w-4 h-4 text-[#0FEA7A]" />
              <span>1 Hyde Lane, Hyde Park, Office E2004, JHB 2196 | MacBook Pro 16″ from R2,299</span>
            </div>
            <div className="flex flex-wrap gap-3 mb-8">
              {[
                { icon: Shield, label: 'No Fix No Fee' },
                { icon: Battery, label: 'M1 through M3 Pro/Max' },
                { icon: Zap, label: 'Assessment from R599' },
                { icon: CheckCircle, label: 'Up to 3 Year Warranty' },
                { icon: AlertTriangle, label: '100Wh Swollen Battery Specialist' },
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
                { value: '900+', label: '16″ Batteries Replaced' },
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
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4">MacBook Pro 16-inch Battery Replacement Pricing</h2>
          <p className="text-[#7A9E98] mb-8 max-w-3xl leading-relaxed">
            Starting prices include the 99.6 or 100 Wh replacement cell, labour, calibration, and our written warranty. Apple charges R4,000 to R8,000+ for 16-inch battery service.
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
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4">MacBook Pro 16-inch Battery — Why This Is the Most Complex MacBook Replacement</h2>
          <div className="space-y-4 text-[#7A9E98] leading-relaxed">
            <p>
              The MacBook Pro 16-inch houses the largest battery of any MacBook Apple has ever produced. The Apple Silicon generation — from M1 Pro/Max (2021) through M3 Pro/Max (Late 2023) — uses a 99.6 Wh or 100 Wh lithium-polymer cell that spans nearly the entire lower half of the chassis from the front edge to the logic board. This is simultaneously what gives the 16-inch its remarkable battery life and what makes it the most complex battery replacement in our workshop.
            </p>
            <p>
              The 100 Wh figure is not arbitrary — it is exactly at the ICAO aviation carry-on limit for lithium batteries. Airlines permit batteries up to 100 Wh without special approval. Apple designed the M2 and M3 16-inch battery to be exactly at this limit, maximising capacity within the international aviation regulation. This also means the cell carries significantly more stored energy than any 13-inch or 14-inch MacBook — and a swollen 100 Wh cell off-gassing flammable electrolyte is a more serious hazard than a swollen 58 Wh 13-inch cell. We treat 16-inch swollen battery cases with a higher level of caution and always use our full decompression protocol before extraction.
            </p>
            <p>
              The adhesive system on the 16-inch uses eight or more pull-tab sections — the largest adhesive bonding area of any MacBook. The tabs run from the front edge of the cell to near the logic board, and the correct extraction sequence runs from the front (MagSafe side) toward the back. Pulling from the back first risks peeling the cell adhesive in a direction that tears the tab rather than releasing the bond. We documented the correct 16-inch extraction sequence after our first cohort of swollen M1 Pro/Max batteries arrived in our workshop in 2023, and it has been refined through every generation since.
            </p>
            <p>
              The MacBook Pro 16-inch is used overwhelmingly by creative professionals and developers in Johannesburg — video editors, architects, software engineers — who use the machine as a desktop replacement. These users run sustained workloads that draw 60 to 80 watts from the battery. Under Stage 6 load shedding conditions in 2023, a professional running 8-hour editing sessions at home with 12 power interruptions per day could accumulate the equivalent of 3 to 4 full charge cycles per day. Over 12 months at this rate, that is 1,000 to 1,500 additional cycles — more than the battery&apos;s entire rated lifecycle.
            </p>
            <p>
              We have replaced batteries on all six Apple Silicon 16-inch MacBook Pro configurations in our Hyde Park workshop. The procedure takes 4 to 6 hours, and we do not rush this particular repair. A punctured 100 Wh cell in a workshop environment is a fire emergency. Our approach prioritises safety over speed, and we communicate this honestly with every 16-inch battery client.
            </p>
          </div>
          <div className="mt-6">
            <a href="https://www.ifixit.com/Device/MacBook_Pro_16%22_Late_2021" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-[#0FEA7A] text-sm font-semibold hover:underline">
              iFixit MacBook Pro 16-inch battery guide <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Battery Fault Types */}
      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4">MacBook Pro 16-inch Battery Faults We Repair</h2>
          <p className="text-[#7A9E98] mb-10 max-w-3xl leading-relaxed">
            The 100 Wh cell in the MacBook Pro 16-inch presents unique fault characteristics. Each is diagnosed before any repair is quoted.
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
              Every repair is quoted before work begins. No Fix No Fee: assessment fee of R599 if the battery is not the cause. Up-to-3 year warranty on all completed battery replacements. Swollen 100 Wh batteries handled with full decompression protocol.
            </p>
          </div>
        </div>
      </section>

      {/* Apple vs ZA Support */}
      <section className="py-10 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-4">Apple Store vs ZA Support: MacBook Pro 16-inch Battery</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="glass-card p-6 border border-red-500/20">
              <h3 className="text-red-400 font-bold mb-4">Apple Store / iStore</h3>
              <ul className="text-[#7A9E98] text-sm space-y-2.5">
                <li>R4,000 to R8,000+ for 16-inch battery service</li>
                <li>Turnaround 5–10 business days via depot</li>
                <li>May replace entire top case assembly</li>
                <li>No 100 Wh swollen battery decompression protocol documented</li>
                <li>No professional cycle/capacity report at collection</li>
                <li>AppleCare+ required for reduced pricing</li>
              </ul>
            </div>
            <div className="glass-card p-6 border border-[rgba(15,234,122,0.3)]">
              <h3 className="text-[#0FEA7A] font-bold mb-4">ZA Support</h3>
              <ul className="text-[#7A9E98] text-sm space-y-2.5">
                <li>Battery cells only — M1 through M3 Pro/Max covered</li>
                <li>16″ from R2,299 including warranty</li>
                <li>Full decompression protocol for swollen 100 Wh cells</li>
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
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-8">Our MacBook Pro 16-inch Battery Replacement Process</h2>
          <div className="space-y-6">
            {[
              { step: 1, title: 'Drop Off & 16-inch Diagnostic', desc: 'No appointment needed. Full battery diagnostic: cycle count, capacity, load test if required. Swollen battery visual assessment. Written quote within 20 minutes.' },
              { step: 2, title: 'Controlled Decompression (Swollen) or Standard Extraction', desc: 'For swollen batteries: controlled decompression before tab extraction to reduce flammable vapour pressure. For non-swollen: sequential tab extraction from front to back using controlled heat (max 50°C) and solvent. Non-conductive tools only.' },
              { step: 3, title: 'Model-Verified 100Wh Replacement Cell', desc: 'Model identifier confirmed (A2485/A2780/A2991). 99.6 or 100 Wh replacement cell tested for voltage, capacity, and cell balance before installation.' },
              { step: 4, title: 'MagSafe + USB-C Charging Verification', desc: 'Full charge-discharge calibration. System Settings confirms 100% health at cycle count 0–1. MagSafe LED verified green. Both USB-C Thunderbolt ports verified.' },
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
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-4">MacBook Pro 16-inch Battery — Johannesburg Service Area</h2>
          <p className="text-[#7A9E98] mb-6 leading-relaxed">
            Our Hyde Park workshop is 10 to 20 minutes from most northern Johannesburg suburbs. For urgent swollen 16-inch batteries, same-day collection is available — contact us on WhatsApp first.
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
          <FAQAccordion items={faqs} title="MacBook Pro 16-inch Battery Replacement — Common Questions" />
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
              { label: 'MacBook Pro 14″ Battery', href: '/battery-replacement/macbook-pro-14-inch' },
              { label: 'MacBook Pro M3 Battery', href: '/battery-replacement/macbook-pro-m3' },
              { label: 'Logic Board — 16-inch', href: '/logic-board-repair/macbook-pro-16-inch' },
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
            <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3">MacBook Pro 16-inch Battery Issue? Book a Diagnostic.</h2>
            <p className="text-[#7A9E98] mb-6 max-w-xl mx-auto leading-relaxed">
              WhatsApp us your model year and fault — bottom case bowing, reduced runtime under load, unexpected shutdown, or "Service Recommended" — and we will confirm pricing before you come in. For swollen batteries, contact us before transporting. Assessment from R599.
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
              1 Hyde Lane, Hyde Park, Office E2004, JHB 2196 | MacBook Pro 16″ from R2,299 | Up-to-3 year warranty
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
