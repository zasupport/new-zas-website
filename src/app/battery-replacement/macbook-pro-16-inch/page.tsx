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
  title: 'MacBook Pro 16-Inch Battery Replacement Johannesburg 2026 | From R2,999 | ZA Support',
  description:
    'MacBook Pro 16-inch battery replacement Johannesburg from R2,999. 99.6 Wh cell, eight adhesive sections, full calibration. From R599 assessment. From R599 assessment. Hyde Park.',
  alternates: { canonical: 'https://zasupport.com/battery-replacement/macbook-pro-16-inch' },
  keywords: [
    'MacBook Pro 16 inch battery replacement Johannesburg',
    'MacBook Pro 16 battery replacement Hyde Park',
    'MacBook Pro 16 inch swollen battery',
    'MacBook Pro M1 Max battery replacement',
    'MacBook Pro M2 Max battery replacement',
    'MacBook Pro M3 Max battery replacement',
    'MacBook Pro 16 battery cycle count',
    'MacBook Pro 16 inch battery cost South Africa',
    'MacBook Pro 16 inch 99.6 Wh battery',
    'MacBook Pro 16 battery replacement near me',
  ],
};

/* -- Breadcrumbs ----------------------------------------------------------- */
const breadcrumbItems = [
  { label: 'Battery Replacement', href: '/battery-replacement' },
  { label: 'MacBook Pro', href: '/battery-replacement/macbook-pro' },
  { label: 'MacBook Pro 16-Inch' },
];

const breadcrumbSchemaItems = [
  { name: 'Home', url: 'https://zasupport.com' },
  { name: 'Battery Replacement', url: 'https://zasupport.com/battery-replacement' },
  { name: 'MacBook Pro', url: 'https://zasupport.com/battery-replacement/macbook-pro' },
  { name: 'MacBook Pro 16-Inch', url: 'https://zasupport.com/battery-replacement/macbook-pro-16-inch' },
];

/* -- Service Schema -------------------------------------------------------- */
const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'MacBook Pro 16-Inch Battery Replacement Johannesburg',
  description:
    'Professional MacBook Pro 16-inch battery replacement in Johannesburg. 99.6 Wh lithium-polymer cell, eight adhesive sections, full calibration. From R2,999. From R599 assessment. 12-month warranty.',
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
    lowPrice: '2999',
    highPrice: '3999',
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
    question: 'How much does a MacBook Pro 16-inch battery replacement cost in Johannesburg?',
    answer:
      'MacBook Pro 16-inch battery replacement at our Hyde Park workshop starts from R2,999. The higher price compared to smaller MacBook Pro models reflects the 99.6 Wh cell — nearly 50% larger than the 14-inch — and the eight separate adhesive sections that must be individually released. Apple charges R6,000 to R9,000 for the same repair, often replacing the entire top case assembly. Our price includes the cell, labour, calibration, and a written 12-month warranty.',
  },
  {
    question: 'Why is the MacBook Pro 16-inch battery replacement more expensive than the 14-inch?',
    answer:
      'The 16-inch battery is substantially larger: 99.6 Wh versus 69.6 Wh on the 14-inch. It uses eight adhesive sections instead of six, spanning a wider footprint across the chassis. The removal process takes longer, requires more solvent, and carries a higher risk due to the larger cell surface area sitting above the logic board. The replacement cell itself also costs more to source due to the higher watt-hour capacity. These factors combine to justify the pricing difference.',
  },
  {
    question: 'How long does a MacBook Pro 16-inch battery replacement take?',
    answer:
      'We typically complete MacBook Pro 16-inch battery replacements within 5 to 7 hours. The additional time compared to the 14-inch is due to the eight adhesive sections and larger cell surface area. We include a full charge-discharge-charge calibration cycle in this turnaround. Same-day service is available for bookings confirmed before 11:00.',
  },
  {
    question: 'What is the MacBook Pro 16-inch battery capacity?',
    answer:
      'The MacBook Pro 16-inch ships with a 99.6 Wh lithium-polymer battery — the largest battery Apple has ever put in a laptop. Some M3 Max and M4 Max configurations report exactly 100 Wh. Apple rates it for 1,000 charge cycles before maximum capacity drops below 80%. The 99.6 Wh cell supports up to 22 hours of video playback on M3 Max models, making any capacity degradation very noticeable to the user.',
  },
  {
    question: 'My MacBook Pro 16-inch only lasts 4 to 5 hours — should I replace the battery?',
    answer:
      'If your MacBook Pro 16-inch is rated for 15 to 22 hours but only delivers 4 to 5 hours of normal use, the battery is likely degraded. Check System Settings then Battery then Battery Health — if maximum capacity is below 80% or the cycle count exceeds 800, replacement is warranted. However, we also check for excessive background CPU usage, which can drain even a healthy battery quickly. Our diagnostic identifies whether the issue is the battery, software, or both.',
  },
  {
    question: 'Does load shedding damage the MacBook Pro 16-inch battery specifically?',
    answer:
      'Yes, and the impact is paradoxically worse on the 16-inch than smaller models. The 99.6 Wh cell takes longer to charge fully, meaning each load shedding interruption catches it at a wider range of charge states. Frequent partial cycling between 40% and 80% — the typical range during load shedding — accelerates cell degradation. In Johannesburg, we see 16-inch machines reaching service thresholds 30 to 40 percent sooner than the same models used in cities without power interruptions. A UPS is essential.',
  },
  {
    question: 'Is a swollen MacBook Pro 16-inch battery dangerous?',
    answer:
      'Extremely so. The 99.6 Wh cell contains significantly more lithium than the 14-inch or 13-inch. When it swells, the larger cell volume means more flammable electrolyte under pressure. The 16-inch chassis provides some structural resistance, but severe swelling can bow the aluminium bottom case and, in rare cases, crack the hinge area. If you see any bottom case deformation, stop using the machine immediately. Do not charge it. Do not put it in a bag. Contact us for urgent same-day collection.',
  },
  {
    question: 'Which MacBook Pro 16-inch models do you replace batteries for?',
    answer:
      'We replace batteries on all MacBook Pro 16-inch models: the M1 Pro and M1 Max (2021), M2 Pro and M2 Max (2023), M3 Pro and M3 Max (late 2023), and M4 Pro and M4 Max (2024). We also handle the older Intel-based MacBook Pro 16-inch (2019) which uses a 99.8 Wh cell with a slightly different adhesive configuration. All use adhesive-mounted lithium-polymer cells requiring specialist removal.',
  },
  {
    question: 'Can I use my MacBook Pro 16-inch while waiting for the battery replacement?',
    answer:
      'If the battery is swollen, no — it is not safe to continue using the machine. If the battery is simply degraded (low capacity, high cycle count), you can continue using it plugged in, but we recommend leaving the machine with us for same-day replacement rather than accumulating additional cycles on a compromised cell. We do not offer loaner machines, but the 5 to 7 hour turnaround means most clients collect the same day.',
  },
  {
    question: 'What warranty do you offer on the MacBook Pro 16-inch battery replacement?',
    answer:
      'All MacBook Pro 16-inch battery replacements carry a written 12-month warranty covering the replacement cell and our workmanship. If the battery develops any fault within 12 months — maximum capacity dropping below 80% of new capacity, swelling, unexpected shutdowns, or any electrical fault — we replace it again at from R599. The warranty document is provided at collection.',
  },
  {
    question: 'Do you offer collection for MacBook Pro 16-inch battery replacement in Johannesburg?',
    answer:
      'Yes. We offer collection and return from all suburbs within 25 km of our Hyde Park workshop — Sandton, Rosebank, Bryanston, Fourways, Midrand, Randburg, Morningside, Rivonia, Houghton, and Parkhurst. For swollen battery emergencies, we prioritise same-day collection. WhatsApp us or call 064 529 5863 to arrange. Pretoria and Centurion collection available by arrangement.',
  },
];

/* -- Structured Data ------------------------------------------------------- */
const faqSchema = buildFaqSchema(faqs);
const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbSchemaItems);

/* -- Page Component -------------------------------------------------------- */
export default function BatteryReplacementMacBookPro16InchPage() {
  const whatsappUrl = buildWhatsAppUrl('BAT-PRO16-HERO', 'battery');

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
              MacBook Pro 16-Inch Battery Replacement
              <br /><span className="text-[#0FEA7A]">Johannesburg</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-4 max-w-3xl leading-relaxed">
              The MacBook Pro 16-inch carries Apple&apos;s largest laptop battery — a 99.6 Wh cell secured by eight adhesive sections. Replacing it requires precision tooling, controlled heat, and experience with the specific adhesive configuration. From R2,999 at our Hyde Park workshop. Same-day service. 12-month warranty. From R599 assessment.
            </p>
            <div className="flex items-center gap-2 text-[#7A9E98] text-sm mb-8">
              <MapPin className="w-4 h-4 text-[#0FEA7A]" />
              <span>1 Hyde Lane, Hyde Park, Office E2004, JHB 2196 | Pro 16&quot; from R2,999</span>
            </div>
            <div className="flex flex-wrap gap-3 mb-8">
              {[
                { icon: Shield, label: 'From R599 assessment' },
                { icon: Battery, label: '99.6 Wh Cell' },
                { icon: Zap, label: 'R599 Assessment' },
                { icon: CheckCircle, label: '12-Month Warranty' },
                { icon: AlertTriangle, label: 'Swollen Battery Urgent' },
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
                { value: '500+', label: '16-Inch Batteries Replaced' },
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

      {/* Technical Detail */}
      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4">The MacBook Pro 16-Inch Battery: Apple&apos;s Largest — and Most Complex</h2>
          <div className="space-y-4 text-[#7A9E98] leading-relaxed">
            <p>
              At 99.6 watt-hours, the MacBook Pro 16-inch battery sits right at the limit of what international aviation authorities permit in carry-on luggage (100 Wh). Apple engineered this cell to deliver up to 22 hours of video playback on M3 Max configurations — a figure that makes any capacity degradation immediately noticeable. When a client tells us their 16-inch &quot;barely lasts half a working day,&quot; the battery is almost always below 70% maximum capacity.
            </p>
            <p>
              In our Hyde Park workshop, we have replaced over 500 MacBook Pro 16-inch batteries since the Apple Silicon redesign launched in 2021. The replacement process is the most involved of any current Mac laptop. The 99.6 Wh cell is bonded to the top case with eight separate adhesive pull-tab sections — two more than the 14-inch model. These tabs are routed at alternating 15-degree angles beneath the cells, and they must be pulled at precisely the correct angle with steady, even force. Pull too fast and the tab snaps; pull at the wrong angle and you compress the cell wall against the adhesive, risking a puncture.
            </p>
            <p>
              We apply controlled heat at a maximum of 45 degrees Celsius on the 16-inch — lower than the 50-degree maximum we use on 14-inch models. The reason is surface area: the 16-inch battery spans nearly the full width and depth of the chassis, sitting directly above the logic board, speaker assemblies, and the display flex cable. Excess heat conducted through the aluminium top case can soften the speaker gaskets and compromise the display flex cable strain relief. We use a precision-controlled heating mat rather than a heat gun, ensuring even temperature distribution across the entire adhesive surface.
            </p>
            <p>
              The load shedding impact on the 16-inch is particularly acute. The 99.6 Wh cell takes approximately 2 hours and 15 minutes to charge from 20% to 100% using the included 140W MagSafe 3 charger. During Stage 4 load shedding in Johannesburg, a typical 2.5-hour power window is barely enough to complete one full charge cycle. The result is constant partial cycling between 30% and 70% — the exact pattern that accelerates lithium-polymer cell degradation. We have documented machines arriving with &quot;Service Recommended&quot; status at just 15 months of age, when the battery should comfortably last three years under stable power conditions.
            </p>
            <p>
              One technical detail unique to the 16-inch: the speaker assemblies are partially adhered to the top case in the same region as the battery. Careless battery removal can dislodge or crack a speaker enclosure, resulting in rattling or distorted audio that only becomes apparent after reassembly. We disconnect and carefully isolate both speaker assemblies before beginning adhesive work on the battery. Every 16-inch battery replacement includes a speaker function test as part of our post-installation quality assurance checklist — playing a full-range frequency sweep through both speakers to confirm no distortion or rattling.
            </p>
          </div>
          <div className="mt-6">
            <a
              href="https://www.ifixit.com/Guide/MacBook+Pro+16-Inch+2021+Battery+Replacement/147345"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[#0FEA7A] text-sm font-semibold hover:underline"
            >
              iFixit MacBook Pro 16-inch battery guide <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-10 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4">MacBook Pro 16-Inch Battery Replacement Pricing</h2>
          <p className="text-[#7A9E98] mb-8 max-w-3xl leading-relaxed">
            The 16-inch commands a premium over smaller models due to the larger cell, additional adhesive complexity, and longer turnaround. Apple charges R6,000 to R9,000 and frequently replaces the entire top case assembly. We replace only the battery.
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
                  { model: 'MacBook Pro 16" (Intel 2019)', battery: '99.8 Wh', from: 'R2,999', turnaround: '5-7 hrs' },
                  { model: 'MacBook Pro 16" (M1 Pro/Max 2021)', battery: '99.6 Wh', from: 'R2,999', turnaround: '5-7 hrs' },
                  { model: 'MacBook Pro 16" (M2 Pro/Max 2023)', battery: '99.6 Wh', from: 'R2,999', turnaround: '5-7 hrs' },
                  { model: 'MacBook Pro 16" (M3 Pro/Max 2023)', battery: '99.6 Wh', from: 'R3,199', turnaround: '5-7 hrs' },
                  { model: 'MacBook Pro 16" (M4 Pro/Max 2024)', battery: '100 Wh', from: 'R3,499', turnaround: '5-7 hrs' },
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
            All prices include the replacement cell, labour, calibration, and a 12-month warranty. Assessment from R599. From R599 assessment.
          </p>
          <PricingNote variant="inline" />
        </div>
      </section>

      {/* Service Process */}
      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-8">Our MacBook Pro 16-Inch Battery Replacement Process</h2>
          <div className="space-y-6">
            {[
              {
                step: 1,
                title: 'Intake & Full Diagnostic',
                desc: 'We run a comprehensive battery diagnostic: cycle count, maximum capacity, individual cell voltage balance, charging circuit health, and a thermal profile under load. coconutBattery and System Information results shared with you. Written quote within 20 minutes.',
              },
              {
                step: 2,
                title: 'Speaker & MagSafe Isolation',
                desc: 'Both speaker assemblies and the MagSafe 3 flex cable are disconnected and isolated before battery work begins. This prevents secondary damage to audio components and the charging circuit during adhesive removal.',
              },
              {
                step: 3,
                title: 'Eight-Section Adhesive Release',
                desc: 'A precision heating mat warms the top case to a maximum of 45 degrees Celsius. Each of the eight adhesive pull-tab sections is released sequentially using 90% isopropyl solvent and non-conductive nylon spudgers. The 99.6 Wh cell is lifted clear of the logic board.',
              },
              {
                step: 4,
                title: 'Cell Verification & Installation',
                desc: 'The replacement 99.6 Wh cell is tested for open-circuit voltage, capacity, and cell balance. New adhesive is applied, the cell is seated, and the battery connector is engaged. Speakers and MagSafe are reconnected. Bottom case torqued to specification.',
              },
              {
                step: 5,
                title: 'Calibration, Speaker Test & Final QA',
                desc: 'Full charge-discharge-charge calibration cycle. System Information verification: 99.6 Wh design capacity, cycle count 0, Normal condition. Speaker frequency sweep test confirms no rattling or distortion. MagSafe and USB-C charging verified. Thermal test under synthetic load.',
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
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-4">Apple Store vs ZA Support: MacBook Pro 16-Inch Battery</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            <div className="glass-card p-6 border border-red-500/20">
              <h3 className="text-red-400 font-bold mb-4">Apple Store / iStore</h3>
              <ul className="text-[#7A9E98] text-sm space-y-2.5">
                <li>Top case assembly replacement — R6,000 to R9,000+</li>
                <li>Turnaround 7 to 14 business days via Apple depot</li>
                <li>Keyboard, trackpad, and speakers replaced unnecessarily</li>
                <li>No detailed diagnostic shared before or after</li>
                <li>AppleCare+ required for reduced out-of-warranty pricing</li>
              </ul>
            </div>
            <div className="glass-card p-6 border border-[rgba(15,234,122,0.3)]">
              <h3 className="text-[#0FEA7A] font-bold mb-4">ZA Support</h3>
              <ul className="text-[#7A9E98] text-sm space-y-2.5">
                <li>Battery cell only — keyboard, trackpad, speakers untouched</li>
                <li>From R2,999 including calibration and warranty</li>
                <li>Same-day 5 to 7 hour turnaround</li>
                <li>coconutBattery diagnostic and results shared</li>
                <li>Written 12-month warranty on cell and workmanship</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Service Area */}
      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-4">Service Area — MacBook Pro 16-Inch Battery Replacement</h2>
          <p className="text-[#7A9E98] mb-6 leading-relaxed">
            Our Hyde Park workshop serves all northern Johannesburg suburbs. Collection and return available for MacBook Pro 16-inch battery replacements — including urgent same-day collection for swollen batteries.
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
          <FAQAccordion items={faqs} title="MacBook Pro 16-Inch Battery Replacement — Common Questions" />
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
              { label: 'MacBook Pro 14-Inch Battery', href: '/battery-replacement/macbook-pro-14-inch' },
              { label: 'MacBook Pro Logic Board', href: '/logic-board-repair/macbook-pro' },
              { label: 'Logic Board — Pro 16"', href: '/logic-board-repair/macbook-pro-16-inch' },
              { label: 'MacBook Pro Screen Repair', href: '/screen-repair/macbook-pro' },
              { label: 'MacBook Air M2 Battery', href: '/battery-replacement/macbook-air-m2' },
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
            <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3">MacBook Pro 16-Inch Battery Failing?</h2>
            <p className="text-[#7A9E98] mb-6 max-w-xl mx-auto leading-relaxed">
              WhatsApp us your model year and the symptoms — poor battery life, swollen bottom case, unexpected shutdowns, or service warning — and we will provide an honest assessment and price before you bring the machine in. From R599 assessment. From R599 assessment.
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
              1 Hyde Lane, Hyde Park, Office E2004, JHB 2196 | MacBook Pro 16&quot; from R2,999 | 12-month warranty
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
