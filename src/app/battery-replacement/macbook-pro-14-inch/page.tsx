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

export const metadata: Metadata = {
  title: 'MacBook Pro 14-Inch Battery Replacement Johannesburg 2026 | From R2,499 | ZA Support',
  description:
    'MacBook Pro 14-inch battery replacement Johannesburg from R2,499. 69.6 Wh cell, adhesive removal, calibration. From R599 assessment. From R599 assessment. Hyde Park workshop.',
  alternates: { canonical: 'https://zasupport.com/battery-replacement/macbook-pro-14-inch' },
  keywords: [
    'MacBook Pro 14 inch battery replacement Johannesburg',
    'MacBook Pro 14 battery replacement Hyde Park',
    'MacBook Pro 14 inch swollen battery Johannesburg',
    'MacBook Pro M1 Pro battery replacement',
    'MacBook Pro M2 Pro battery replacement',
    'MacBook Pro M3 Pro battery replacement',
    'MacBook Pro M4 Pro battery replacement',
    'MacBook Pro 14 battery cycle count',
    'MacBook Pro 14 inch battery cost South Africa',
    'MacBook Pro 14 inch battery replacement near me',
  ],
};

/* -- Breadcrumbs ----------------------------------------------------------- */
const breadcrumbItems = [
  { label: 'Battery Replacement', href: '/battery-replacement' },
  { label: 'MacBook Pro', href: '/battery-replacement/macbook-pro' },
  { label: 'MacBook Pro 14-Inch' },
];

const breadcrumbSchemaItems = [
  { name: 'Home', url: 'https://zasupport.com' },
  { name: 'Battery Replacement', url: 'https://zasupport.com/battery-replacement' },
  { name: 'MacBook Pro', url: 'https://zasupport.com/battery-replacement/macbook-pro' },
  { name: 'MacBook Pro 14-Inch', url: 'https://zasupport.com/battery-replacement/macbook-pro-14-inch' },
];

/* -- Service Schema -------------------------------------------------------- */
const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'MacBook Pro 14-Inch Battery Replacement Johannesburg',
  description:
    'Professional MacBook Pro 14-inch battery replacement in Johannesburg. 69.6 Wh lithium-polymer cell, adhesive removal, full calibration. From R2,499. From R599 assessment. 12-month warranty.',
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
    lowPrice: '2499',
    highPrice: '3499',
    priceCurrency: 'ZAR',
    offerCount: '4',
  },
  availableChannel: [
    { '@type': 'ServiceChannel', serviceUrl: 'https://wa.me/27645295863', serviceType: 'WhatsApp' },
    { '@type': 'ServiceChannel', servicePhone: '+27645295863', serviceType: 'Phone' },
  ],
};

/* -- FAQs ------------------------------------------------------------------ */
const faqs = [
  {
    question: 'How much does a MacBook Pro 14-inch battery replacement cost in Johannesburg?',
    answer:
      'MacBook Pro 14-inch battery replacement at our Hyde Park workshop starts from R2,499. This includes the 69.6 Wh replacement cell, all labour, adhesive removal, post-installation calibration, and a written 12-month warranty. Apple charges R5,000 to R8,000 for the same replacement, often replacing the entire top case rather than the battery alone. Our assessment fee starts from R599, which is applied toward the total repair cost if you proceed.',
  },
  {
    question: 'Which MacBook Pro 14-inch models do you replace batteries for?',
    answer:
      'We replace batteries on every MacBook Pro 14-inch model released since the form factor launched in October 2021. This includes the M1 Pro and M1 Max (2021), M2 Pro and M2 Max (2023), M3, M3 Pro and M3 Max (late 2023), and the M4, M4 Pro and M4 Max (2024). All 14-inch models use a 69.6 to 70 Wh lithium-polymer cell with six adhesive sections securing it to the aluminium top case.',
  },
  {
    question: 'How long does a MacBook Pro 14-inch battery replacement take?',
    answer:
      'The MacBook Pro 14-inch battery replacement typically takes 4 to 6 hours in our workshop. The extra time compared to the 13-inch model is due to the six separate adhesive sections that must be individually released without damaging the top case or the logic board beneath. We include a full charge-discharge calibration cycle in that turnaround. Same-day service is available for bookings confirmed before 12:00.',
  },
  {
    question: 'What is the MacBook Pro 14-inch battery capacity and cycle count rating?',
    answer:
      'The MacBook Pro 14-inch ships with a 69.6 Wh (some M4 variants report 70 Wh) lithium-polymer battery. Apple rates it for 1,000 charge cycles before maximum capacity drops below 80% of design capacity. In Johannesburg, we regularly see machines hitting this threshold at 700 to 800 cycles due to load shedding forcing constant micro-cycles between mains and battery power.',
  },
  {
    question: 'Is the MacBook Pro 14-inch battery different from the 16-inch battery?',
    answer:
      'Yes, substantially. The 14-inch uses a 69.6 Wh cell with six adhesive sections, while the 16-inch uses a 99.6 Wh cell with eight adhesive sections across a much larger surface area. The 16-inch battery is physically wider and deeper, occupying more of the internal chassis. Replacement pricing and turnaround differ accordingly — the 16-inch is more complex and costs more.',
  },
  {
    question: 'Does load shedding affect the MacBook Pro 14-inch battery life?',
    answer:
      'Significantly. Every power interruption during load shedding forces the MacBook Pro 14-inch to switch between AC power and its internal battery. Each switch registers as a partial charge cycle. On a Stage 4 schedule in Johannesburg, that can mean 8 to 12 additional partial cycles daily. Over 12 to 18 months, this can reduce effective battery lifespan by 30 to 40 percent. A quality UPS eliminates this wear entirely and is the single best investment for battery longevity.',
  },
  {
    question: 'My MacBook Pro 14-inch bottom case is bulging — is the battery swollen?',
    answer:
      'Almost certainly. The MacBook Pro 14-inch battery sits directly against the aluminium bottom case. When lithium-polymer cells off-gas and expand, the bottom case is the first surface to show deformation — a visible outward bow, typically in the centre. This is urgent: a swollen battery under pressure against the aluminium enclosure risks puncture, which releases flammable electrolyte. Stop using the machine, avoid placing it in a bag, and bring it to us immediately.',
  },
  {
    question: 'Can I replace the MacBook Pro 14-inch battery myself?',
    answer:
      'We strongly advise against it. The MacBook Pro 14-inch battery is secured with six separate adhesive pull-tab sections that route beneath the cells at specific angles. Incorrect removal risks puncturing a cell, which is a genuine fire hazard. The battery connector also sits adjacent to high-density logic board components. Apple does not sell replacement batteries directly to consumers, and aftermarket cells vary significantly in quality. Professional replacement ensures cell quality verification, correct adhesive technique, and post-installation calibration.',
  },
  {
    question: 'What warranty do you offer on MacBook Pro 14-inch battery replacement?',
    answer:
      'All MacBook Pro 14-inch battery replacements at ZA Support carry a written 12-month warranty covering the replacement cell and our workmanship. If the battery develops any fault within 12 months — capacity dropping below 80% of new capacity, unexpected shutdowns, or any electrical fault — we replace it again at from R599. Our From R599 assessment policy applies: if we determine a battery replacement will not resolve your issue, you pay only the assessment fee from R599.',
  },
  {
    question: 'How do I check my MacBook Pro 14-inch battery health?',
    answer:
      'On macOS Ventura or later, open System Settings, click Battery in the sidebar, then click Battery Health. You will see your maximum capacity percentage and cycle count. If maximum capacity is below 80% or the cycle count exceeds 900, replacement is typically warranted. For a more detailed readout including individual cell voltages and temperature, download coconutBattery (free). We use coconutBattery as part of our diagnostic at no extra charge.',
  },
  {
    question: 'Do you offer collection for MacBook Pro 14-inch battery replacement?',
    answer:
      'Yes. We offer collection and return within 25 kilometres of our Hyde Park workshop — covering Sandton, Rosebank, Bryanston, Fourways, Midrand, Randburg, Morningside, Rivonia, Houghton, and Parkhurst. For urgent swollen battery cases, we prioritise same-day collection. Contact us on WhatsApp or call 064 529 5863 to arrange. Pretoria and Centurion collection is available by arrangement.',
  },
];

/* -- Structured Data ------------------------------------------------------- */
const faqSchema = buildFaqSchema(faqs);
const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbSchemaItems);

/* -- Page Component -------------------------------------------------------- */
export default function BatteryReplacementMacBookPro14InchPage() {
  const whatsappUrl = buildWhatsAppUrl('BAT-PRO14-HERO', 'battery');

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
              MacBook Pro 14-Inch Battery Replacement
              <br /><span className="text-[#0FEA7A]">Johannesburg</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-4 max-w-3xl leading-relaxed">
              The MacBook Pro 14-inch packs a 69.6 Wh cell secured by six adhesive sections across the full width of the chassis. When that battery swells or degrades, you need a technician who has done this specific removal hundreds of times. From R2,499 at our Hyde Park workshop — same-day turnaround, 12-month warranty, From R599 assessment.
            </p>
            <div className="flex items-center gap-2 text-[#7A9E98] text-sm mb-8">
              <MapPin className="w-4 h-4 text-[#0FEA7A]" />
              <span>1 Hyde Lane, Hyde Park, Office E2004, JHB 2196 | Pro 14&quot; from R2,499</span>
            </div>
            <div className="flex flex-wrap gap-3 mb-8">
              {[
                { icon: Shield, label: 'From R599 assessment' },
                { icon: Battery, label: '69.6 Wh Cell' },
                { icon: Zap, label: 'R599 Assessment' },
                { icon: CheckCircle, label: '12-Month Warranty' },
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
                href="/battery-replacement"
                className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.2)] text-[#7A9E98] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[rgba(15,234,122,0.05)] transition-all"
              >
                All Battery Replacements <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
            <div className="flex flex-wrap gap-6 mt-8 pt-6 border-t border-[rgba(255,255,255,0.06)]">
              {[
                { value: '800+', label: '14-Inch Batteries Replaced' },
                { value: SITE.yearsExperience + ' Years', label: 'In Business Since 2009' },
                { value: SITE.rating + '/5', label: SITE.reviewCount + ' Google Reviews' },
                { value: '12 Months', label: 'Battery Warranty' },
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

      {/* Technical Detail — 14-Inch Specific */}
      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4">Why the MacBook Pro 14-Inch Battery Is Harder to Replace</h2>
          <div className="space-y-4 text-[#7A9E98] leading-relaxed">
            <p>
              The MacBook Pro 14-inch, introduced in October 2021 alongside the M1 Pro and M1 Max chips, marked a fundamental change in Apple&apos;s internal battery architecture. The 69.6 Wh lithium-polymer cell is not a single pouch — it is a multi-cell array bonded to the aluminium top case with six separate adhesive pull-tab sections. Each section must be released independently using controlled heat no higher than 50 degrees Celsius and a slow-release adhesive solvent applied precisely at the cell seams. One wrong angle and you puncture a cell.
            </p>
            <p>
              In our Hyde Park workshop, we have replaced well over 800 MacBook Pro 14-inch batteries since the form factor launched. The most common failure pattern we observe is premature cycle count exhaustion driven by Johannesburg&apos;s load shedding schedule. A MacBook Pro 14-inch used without a UPS during Stage 4 load shedding accumulates 8 to 12 additional partial charge cycles per day. Over 14 months, that adds roughly 2,500 extra partial cycles — enough to push a 1,000-cycle rated battery well past its design limit. We see 14-inch machines arriving with &quot;Service Recommended&quot; warnings at just 18 to 24 months of age, when they should comfortably last three to four years under normal conditions.
            </p>
            <p>
              The adhesive removal process on the 14-inch is substantially more involved than on the older 13-inch MacBook Pro. The 13-inch uses four adhesive sections; the 14-inch uses six, spread across a wider battery footprint that sits directly above the logic board. There is less than 2 millimetres of clearance between the bottom of the battery cells and the top of the M1 Pro or M2 Pro system-on-chip. We use non-conductive nylon spudgers exclusively — metal tools are banned from our battery removal process. The solvent we apply is an isopropyl-alcohol-based solution at 90 percent concentration, which dissolves the adhesive without damaging the anodised aluminium or leaving residue on the logic board.
            </p>
            <p>
              After the replacement cell is installed, we run a full calibration cycle: charge to 100 percent, discharge to 5 percent under a controlled synthetic load, then charge back to 100 percent. This allows the battery management unit to establish an accurate voltage-to-capacity mapping for the new cell. Without this calibration, macOS may report inaccurate battery percentages for the first few weeks. We also verify the cell registers correctly in System Information — 69.6 Wh design capacity, cycle count of 0 or 1, and &quot;Normal&quot; condition status.
            </p>
            <p>
              One aspect that catches many DIY repairers off guard is the MagSafe 3 charging connector on the 14-inch. The MagSafe board is connected via a flex cable that routes alongside the battery. Careless battery removal can kink or tear this cable, resulting in a MagSafe port that no longer charges — a secondary repair that costs significantly more than the battery itself. We disconnect and isolate the MagSafe flex before beginning any adhesive work. Every 14-inch battery replacement at ZA Support includes a post-installation MagSafe charging verification to confirm full functionality.
            </p>
          </div>
          <div className="mt-6">
            <a
              href="https://www.ifixit.com/Guide/MacBook+Pro+14-Inch+2021+Battery+Replacement/147337"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[#0FEA7A] text-sm font-semibold hover:underline"
            >
              iFixit MacBook Pro 14-inch battery guide <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-10 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4">MacBook Pro 14-Inch Battery Replacement Pricing</h2>
          <p className="text-[#7A9E98] mb-8 max-w-3xl leading-relaxed">
            All MacBook Pro 14-inch models use essentially the same 69.6 Wh cell format. Pricing is consistent across M1 Pro, M2 Pro, M3 Pro, and M4 Pro variants. The Apple Store charges R5,000 to R8,000 — and frequently replaces the entire top case assembly rather than the battery alone.
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
                {[
                  { model: 'MacBook Pro 14" (M1 Pro/Max 2021)', battery: '69.6 Wh', from: 'R2,499', turnaround: '4-6 hrs' },
                  { model: 'MacBook Pro 14" (M2 Pro/Max 2023)', battery: '69.6 Wh', from: 'R2,499', turnaround: '4-6 hrs' },
                  { model: 'MacBook Pro 14" (M3/M3 Pro/Max 2023)', battery: '69.6 Wh', from: 'R2,499', turnaround: '4-6 hrs' },
                  { model: 'MacBook Pro 14" (M4/M4 Pro/Max 2024)', battery: '70 Wh', from: 'R2,699', turnaround: '4-6 hrs' },
                ].map((row, i) => (
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
            All prices include the replacement cell, labour, calibration, and a 12-month warranty. Assessment from R599 — applied toward repair cost if you proceed. From R599 assessment.
          </p>
          <PricingNote variant="inline" />
        </div>
      </section>

      {/* Service Process */}
      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-8">Our MacBook Pro 14-Inch Battery Replacement Process</h2>
          <div className="space-y-6">
            {[
              {
                step: 1,
                title: 'Drop Off & Diagnostic',
                desc: 'Walk in to our Hyde Park workshop or arrange collection. We run a full battery diagnostic using coconutBattery and System Information: cycle count, maximum capacity, individual cell voltage balance, and charging circuit health. Written quote within 20 minutes.',
              },
              {
                step: 2,
                title: 'MagSafe Isolation & Bottom Case Removal',
                desc: 'The bottom case is removed and the MagSafe 3 flex cable is disconnected and isolated before any adhesive work begins. This protects the MagSafe charging circuit from accidental damage during battery extraction.',
              },
              {
                step: 3,
                title: 'Six-Section Adhesive Release',
                desc: 'Each of the six adhesive pull-tab sections is released using controlled heat (max 50 degrees Celsius) and 90% isopropyl solvent applied at the cell seams. Non-conductive nylon spudgers only. The battery is lifted clear of the logic board with less than 2 mm clearance.',
              },
              {
                step: 4,
                title: 'Cell Verification & Installation',
                desc: 'The replacement 69.6 Wh cell is tested for open-circuit voltage, capacity, and cell balance before installation. New adhesive is applied, the cell is seated, and the battery connector is engaged. The bottom case is torqued to specification.',
              },
              {
                step: 5,
                title: 'Calibration & Final QA',
                desc: 'A full charge-discharge-charge calibration cycle establishes accurate battery management unit mapping. We verify 100% maximum capacity in System Information, cycle count of 0 or 1, MagSafe charging, and USB-C power delivery. Thermal stress test confirms no overheating during charge.',
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

      {/* Apple vs ZA Support */}
      <section className="py-10 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-4">Apple Store vs ZA Support: MacBook Pro 14-Inch Battery</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            <div className="glass-card p-6 border border-red-500/20">
              <h3 className="text-red-400 font-bold mb-4">Apple Store / iStore</h3>
              <ul className="text-[#7A9E98] text-sm space-y-2.5">
                <li>Top case assembly replacement — R5,000 to R8,000+</li>
                <li>Turnaround 5 to 10 business days via Apple depot</li>
                <li>Keyboard and trackpad replaced unnecessarily</li>
                <li>No detailed diagnostic shared with client</li>
                <li>AppleCare+ required for reduced pricing</li>
              </ul>
            </div>
            <div className="glass-card p-6 border border-[rgba(15,234,122,0.3)]">
              <h3 className="text-[#0FEA7A] font-bold mb-4">ZA Support</h3>
              <ul className="text-[#7A9E98] text-sm space-y-2.5">
                <li>Battery cell only — keyboard and trackpad untouched</li>
                <li>From R2,499 including calibration and warranty</li>
                <li>Same-day 4 to 6 hour turnaround</li>
                <li>coconutBattery diagnostic shared with you</li>
                <li>Written 12-month warranty on cell and workmanship</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Service Area */}
      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-4">Service Area — MacBook Pro 14-Inch Battery Replacement</h2>
          <p className="text-[#7A9E98] mb-6 leading-relaxed">
            Our Hyde Park workshop is centrally located in northern Johannesburg. We offer collection and return for MacBook Pro 14-inch battery replacements from all suburbs within 25 km — including same-day collection for urgent swollen battery cases.
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
            Also covering Kempton Park, Pretoria, and Centurion by arrangement. Call {CONTACT.phone} to confirm.
          </p>
        </div>
      </section>

      {/* Google Reviews */}
      <section className="py-10 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Suspense fallback={null}>
            <GoogleReviews />
          </Suspense>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQAccordion items={faqs} title="MacBook Pro 14-Inch Battery Replacement — Common Questions" />
        </div>
      </section>

      {/* Related Services */}
      <section className="py-8 sm:py-16 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#E8F4F1] mb-6">Related Repairs</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              { label: 'All Battery Replacements', href: '/battery-replacement' },
              { label: 'MacBook Pro Battery', href: '/battery-replacement/macbook-pro' },
              { label: 'MacBook Pro 16-Inch Battery', href: '/battery-replacement/macbook-pro-16-inch' },
              { label: 'MacBook Pro Logic Board', href: '/logic-board-repair/macbook-pro' },
              { label: 'Logic Board — Pro 14"', href: '/logic-board-repair/macbook-pro-14-inch' },
              { label: 'MacBook Pro Screen Repair', href: '/screen-repair/macbook-pro' },
              { label: 'MacBook Air M1 Battery', href: '/battery-replacement/macbook-air-m1' },
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
      <section className="py-8 sm:py-16 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-[rgba(39,80,77,0.3)] border border-[rgba(15,234,122,0.2)] rounded-3xl p-10">
            <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3">MacBook Pro 14-Inch Battery Problem?</h2>
            <p className="text-[#7A9E98] mb-6 max-w-xl mx-auto leading-relaxed">
              WhatsApp us your model year and a description of the issue — swollen bottom case, high cycle count, unexpected shutdowns, or poor battery life — and we will give you an honest price before you bring the machine in. From R599 assessment. From R599 assessment.
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
              1 Hyde Lane, Hyde Park, Office E2004, JHB 2196 | MacBook Pro 14&quot; from R2,499 | 12-month warranty
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
