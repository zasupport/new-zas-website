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
  title: 'MacBook Air M2 Battery Replacement Johannesburg 2026 | From R1,999 | ZA Support',
  description:
    'MacBook Air M2 battery replacement Johannesburg from R1,999. 52.6 Wh cell, flat-body design, MagSafe 3 charging. Free diagnostic. No Fix No Fee. Hyde Park workshop.',
  alternates: { canonical: 'https://zasupport.com/battery-replacement/macbook-air-m2' },
  keywords: [
    'MacBook Air M2 battery replacement Johannesburg',
    'MacBook Air M2 battery replacement Hyde Park',
    'MacBook Air M2 swollen battery',
    'MacBook Air M2 battery cycle count',
    'MacBook Air M2 battery cost South Africa',
    'MacBook Air M2 2022 battery replacement',
    'MacBook Air M2 battery life poor',
    'MacBook Air M2 52.6 Wh battery',
    'MacBook Air M2 battery health',
    'MacBook Air M2 battery replacement near me',
  ],
};

/* -- Breadcrumbs ----------------------------------------------------------- */
const breadcrumbItems = [
  { label: 'Battery Replacement', href: '/battery-replacement' },
  { label: 'MacBook Air M2' },
];

const breadcrumbSchemaItems = [
  { name: 'Home', url: 'https://zasupport.com' },
  { name: 'Battery Replacement', url: 'https://zasupport.com/battery-replacement' },
  { name: 'MacBook Air M2', url: 'https://zasupport.com/battery-replacement/macbook-air-m2' },
];

/* -- Service Schema -------------------------------------------------------- */
const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'MacBook Air M2 Battery Replacement Johannesburg',
  description:
    'Professional MacBook Air M2 battery replacement in Johannesburg. 52.6 Wh lithium-polymer cell, flat-body design, MagSafe 3 charging verification. From R1,999. No Fix No Fee. 12-month warranty.',
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
    lowPrice: '1999',
    highPrice: '2599',
    priceCurrency: 'ZAR',
    offerCount: '3',
  },
  availableChannel: [
    { '@type': 'ServiceChannel', serviceUrl: 'https://wa.me/27645295863', serviceType: 'WhatsApp' },
    { '@type': 'ServiceChannel', servicePhone: '+27645295863', serviceType: 'Phone' },
  ],
};

/* -- FAQs ------------------------------------------------------------------ */
const faqs = [
  {
    question: 'How much does a MacBook Air M2 battery replacement cost in Johannesburg?',
    answer:
      'MacBook Air M2 battery replacement at our Hyde Park workshop starts from R1,999. This includes the 52.6 Wh replacement cell, all labour, adhesive removal, post-installation calibration, and a written 12-month warranty. Apple charges R3,200 to R5,000 for the same repair — often replacing the entire top case assembly including the keyboard. Our assessment fee starts from R599, which is applied toward the repair cost if you proceed.',
  },
  {
    question: 'Is the MacBook Air M2 battery different from the M1 model?',
    answer:
      'Yes, completely different. The MacBook Air M2 (2022) uses a 52.6 Wh cell in a new flat-body chassis design — a departure from the tapered wedge shape of the M1 Air. The battery footprint, adhesive layout, and connector position are all different. The cells are not interchangeable between M1 and M2 models. The M2 also introduced MagSafe 3 charging, which is integrated alongside the battery and must be verified after replacement.',
  },
  {
    question: 'How long does a MacBook Air M2 battery replacement take?',
    answer:
      'We typically complete MacBook Air M2 battery replacements within 2 to 4 hours. The flat-body design provides slightly better access than the tapered M1 wedge, but the M2 has five adhesive sections compared to the M1 Air four. We include a full charge-discharge calibration cycle in the turnaround time. Same-day service is available for bookings confirmed before 13:00.',
  },
  {
    question: 'What is the MacBook Air M2 battery capacity and cycle count limit?',
    answer:
      'The MacBook Air M2 ships with a 52.6 Wh lithium-polymer battery — approximately 5% larger than the M1 Air 49.9 Wh cell. Apple rates it for 1,000 charge cycles before maximum capacity drops below 80%. The M2 chip is slightly less power-efficient than the M1 under heavy workloads due to the additional GPU cores, which means the M2 Air can cycle through its battery marginally faster during sustained use.',
  },
  {
    question: 'Does the MacBook Air M2 have a fan that affects battery replacement?',
    answer:
      'No. Like the M1 Air, the MacBook Air M2 is fanless — passively cooled through the aluminium chassis. This simplifies the battery replacement process: there are no fan cables, heat pipes, or thermal ducting to navigate. However, the M2 Air does have a slightly more complex speaker assembly layout compared to the M1, and the MagSafe 3 board is positioned closer to the battery. We disconnect both before beginning adhesive work.',
  },
  {
    question: 'Does load shedding affect the MacBook Air M2 battery?',
    answer:
      'Significantly. The MacBook Air M2, like the M1, has become a primary load shedding workhorse in South African households and offices. Its 18-hour rated battery life makes it ideal for working through power outages — but this means constant switching between AC and battery power. On a Stage 4 schedule in Johannesburg, that translates to 8 to 12 additional partial charge cycles daily. We see M2 Air machines arriving with cycle counts of 800 to 1,000 at just 18 to 24 months of age.',
  },
  {
    question: 'My MacBook Air M2 trackpad feels stiff — could it be the battery?',
    answer:
      'Very likely. The MacBook Air M2 flat-body design positions the battery directly beneath the trackpad. When the lithium-polymer cells begin to swell — even by 1 to 2 millimetres — the trackpad mechanism loses its actuation gap. You may notice increased click resistance initially, followed by a completely unresponsive trackpad if the swelling progresses. The flat chassis of the M2 means bottom-case deformation is also visible earlier than on Pro models. Bring it in immediately — swollen batteries are a safety concern.',
  },
  {
    question: 'Can I replace the MacBook Air M2 battery myself?',
    answer:
      'We advise against it. The MacBook Air M2 battery is secured with five adhesive sections that require precise temperature control and correct pull angles to release without cell puncture. The MagSafe 3 board sits adjacent to the battery and can be damaged during removal. Apple does not sell replacement cells to consumers, and aftermarket cell quality varies significantly. Professional replacement ensures the correct cell, proper adhesive technique, and calibration.',
  },
  {
    question: 'What about the MacBook Air M2 15-inch — do you replace that battery too?',
    answer:
      'Yes. The MacBook Air M2 15-inch (2023) uses a 66.5 Wh cell — substantially larger than the 13.6-inch M2 Air 52.6 Wh cell. The 15-inch model has six adhesive sections instead of five due to the wider battery footprint. Pricing for the 15-inch M2 Air battery replacement starts from R2,299. Contact us for a specific quote for your model.',
  },
  {
    question: 'What warranty do you offer on MacBook Air M2 battery replacement?',
    answer:
      'All MacBook Air M2 battery replacements at ZA Support carry a written 12-month warranty covering the replacement cell and our workmanship. If the battery develops any fault within 12 months — capacity below 80% of new, swelling, shutdowns, or electrical fault — we replace it at no charge. No Fix No Fee applies: if the battery is not the issue, you pay only the assessment fee from R599.',
  },
  {
    question: 'Do you offer collection for MacBook Air M2 battery replacement in Johannesburg?',
    answer:
      'Yes. Collection and return from all suburbs within 25 km of our Hyde Park workshop — Sandton, Rosebank, Bryanston, Fourways, Midrand, Randburg, Morningside, Rivonia, Houghton, and Parkhurst. Same-day collection for urgent swollen battery cases. WhatsApp us or call 064 529 5863 to arrange. Pretoria and Centurion available by arrangement.',
  },
];

/* -- Structured Data ------------------------------------------------------- */
const faqSchema = buildFaqSchema(faqs);
const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbSchemaItems);

/* -- Page Component -------------------------------------------------------- */
export default function BatteryReplacementMacBookAirM2Page() {
  const whatsappUrl = buildWhatsAppUrl('BAT-AIRM2-HERO', 'battery');

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
              Apple&apos;s redesigned MacBook Air M2 brought a new flat-body chassis, MagSafe 3 charging, and a 52.6 Wh battery with five adhesive sections. When that battery degrades or swells, the repair demands precision knowledge of this specific design. From R1,999 at our Hyde Park workshop — same-day service, 12-month warranty, No Fix No Fee.
            </p>
            <div className="flex items-center gap-2 text-[#7A9E98] text-sm mb-8">
              <MapPin className="w-4 h-4 text-[#0FEA7A]" />
              <span>1 Hyde Lane, Hyde Park, Office E2004, JHB 2196 | Air M2 from R1,999</span>
            </div>
            <div className="flex flex-wrap gap-3 mb-8">
              {[
                { icon: Shield, label: 'No Fix No Fee' },
                { icon: Battery, label: '52.6 Wh Cell' },
                { icon: Zap, label: 'Free Diagnostic' },
                { icon: CheckCircle, label: '12-Month Warranty' },
                { icon: Wrench, label: '2-4 Hour Turnaround' },
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
                { value: '600+', label: 'Air M2 Batteries Replaced' },
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
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4">The MacBook Air M2 Battery: New Chassis, New Challenges</h2>
          <div className="space-y-4 text-[#7A9E98] leading-relaxed">
            <p>
              The MacBook Air M2, released in July 2022, was a complete redesign. Gone was the tapered wedge that defined the Air since 2010 — replaced with a flat-body aluminium chassis inspired by the MacBook Pro 14-inch and 16-inch. This redesign changed everything about the battery replacement process. The 52.6 Wh lithium-polymer cell is wider and flatter than the M1 Air&apos;s 49.9 Wh cell, and it is secured with five adhesive pull-tab sections instead of four. The battery connector position moved, and MagSafe 3 was introduced alongside it.
            </p>
            <p>
              In our Hyde Park workshop, we noticed the design differences immediately when the first M2 Air machines arrived for battery work. The adhesive pattern is more similar to the MacBook Pro 14-inch than to the M1 Air — Apple clearly borrowed from the Pro&apos;s adhesive engineering. The fifth adhesive section sits at the front edge of the battery, directly beneath the trackpad. This section is the most difficult to release because there is almost no clearance between the cell and the trackpad mechanism. We use a thin nylon card rather than a spudger for this section, applying solvent from the sides to soften the bond before sliding the card through.
            </p>
            <p>
              The MagSafe 3 integration is the other significant change. On the M1 Air, all charging came through the two USB-C/Thunderbolt ports — there was no dedicated charging connector. The M2 Air reintroduced MagSafe as a dedicated charging port, with the MagSafe board positioned along the left edge of the chassis, adjacent to the battery. The flex cable connecting the MagSafe board to the logic board routes alongside the battery and must be disconnected before any adhesive work begins. We have seen third-party repairers damage this cable during battery removal, resulting in a MagSafe port that no longer charges — a repair that costs more than the battery itself.
            </p>
            <p>
              Johannesburg&apos;s load shedding has pushed many M2 Air batteries past their intended cycle limits in under two years. The M2 chip, while excellent, draws slightly more power than the M1 under sustained workloads due to its additional GPU cores and higher memory bandwidth. This means the M2 Air cycles its battery marginally faster during intensive work — video editing, large spreadsheets, or virtual meetings with screen sharing. Combined with load shedding partial cycles, we are seeing M2 Air machines arrive with cycle counts of 800 to 1,000 at 18 to 22 months of age.
            </p>
            <p>
              Our calibration process for the M2 Air accounts for its unique battery management firmware. The M2&apos;s BMU includes optimised charging, which learns your daily charging patterns and delays charging past 80% until shortly before you typically unplug. A new battery resets this learned profile. We run a controlled charge-discharge-charge sequence that gives the BMU sufficient data to re-establish accurate state-of-charge estimation. We verify 52.6 Wh design capacity, 100% maximum capacity, and a cycle count of 0 or 1 in System Settings before returning your machine.
            </p>
          </div>
          <div className="mt-6">
            <a
              href="https://www.ifixit.com/Guide/MacBook+Air+13-Inch+(M2,+2022)+Battery+Replacement/153271"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[#0FEA7A] text-sm font-semibold hover:underline"
            >
              iFixit MacBook Air M2 battery guide <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-10 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4">MacBook Air M2 Battery Replacement Pricing</h2>
          <p className="text-[#7A9E98] mb-8 max-w-3xl leading-relaxed">
            The MacBook Air M2 comes in 13.6-inch and 15.3-inch variants. Both use the same flat-body architecture but different battery sizes. Apple charges R3,200 to R5,000 and replaces the entire top case. We replace only the battery.
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
                  { model: 'MacBook Air M2 13.6" (2022)', battery: '52.6 Wh', from: 'R1,999', turnaround: '2-4 hrs' },
                  { model: 'MacBook Air M2 13.6" (2022) — Swollen', battery: '52.6 Wh', from: 'R1,999', turnaround: '2-4 hrs' },
                  { model: 'MacBook Air M2 15.3" (2023)', battery: '66.5 Wh', from: 'R2,299', turnaround: '3-5 hrs' },
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
            All prices include the replacement cell, labour, calibration, and a 12-month warranty. Assessment from R599 — applied toward repair cost. No Fix No Fee.
          </p>
        </div>
      </section>

      {/* M1 vs M2 Comparison */}
      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-4">MacBook Air M1 vs M2 Battery Comparison</h2>
          <p className="text-[#7A9E98] mb-8 leading-relaxed">
            Clients frequently ask whether the M1 and M2 Air batteries are interchangeable. They are not. Here is how the two compare.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            <div className="glass-card p-6 border border-[rgba(255,255,255,0.1)]">
              <h3 className="text-[#E8F4F1] font-bold mb-4">MacBook Air M1 (2020)</h3>
              <ul className="text-[#7A9E98] text-sm space-y-2.5">
                <li>Battery: 49.9 Wh</li>
                <li>Chassis: Tapered wedge</li>
                <li>Adhesive sections: 4</li>
                <li>Charging: USB-C only</li>
                <li>Replacement from: R1,899</li>
                <li>Turnaround: 2-3 hours</li>
              </ul>
            </div>
            <div className="glass-card p-6 border border-[rgba(15,234,122,0.3)]">
              <h3 className="text-[#0FEA7A] font-bold mb-4">MacBook Air M2 (2022)</h3>
              <ul className="text-[#7A9E98] text-sm space-y-2.5">
                <li>Battery: 52.6 Wh (+5.4%)</li>
                <li>Chassis: Flat body</li>
                <li>Adhesive sections: 5</li>
                <li>Charging: MagSafe 3 + USB-C</li>
                <li>Replacement from: R1,999</li>
                <li>Turnaround: 2-4 hours</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Service Process */}
      <section className="py-10 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-8">Our MacBook Air M2 Battery Replacement Process</h2>
          <div className="space-y-6">
            {[
              {
                step: 1,
                title: 'Diagnostic & Quote',
                desc: 'Walk in or arrange collection. We run coconutBattery and System Information: cycle count, maximum capacity, cell voltage balance, MagSafe charging health, and optimised charging status. Written quote within 15 minutes.',
              },
              {
                step: 2,
                title: 'MagSafe 3 & Speaker Isolation',
                desc: 'Bottom case removed. The MagSafe 3 flex cable and speaker assemblies are disconnected and isolated before any adhesive work. This protects the charging circuit and audio components from secondary damage during battery extraction.',
              },
              {
                step: 3,
                title: 'Five-Section Adhesive Release',
                desc: 'Controlled heat (max 50 degrees Celsius) applied evenly across the top case. Each of the five adhesive sections is released using 90% isopropyl solvent and non-conductive nylon tools. The fifth section beneath the trackpad requires a thin nylon card for safe release.',
              },
              {
                step: 4,
                title: 'Cell Verification & Installation',
                desc: 'The replacement 52.6 Wh cell is pre-tested for open-circuit voltage, capacity, and cell balance. New adhesive applied, cell seated, battery connector engaged. MagSafe and speakers reconnected. Bottom case torqued to specification.',
              },
              {
                step: 5,
                title: 'Calibration & Final QA',
                desc: 'Full charge-discharge-charge calibration cycle. System Settings verification: 52.6 Wh design capacity, 100% maximum capacity, cycle count 0 or 1. MagSafe 3 charging verified. USB-C charging verified. Trackpad click test. Optimised charging re-enabled. Written 12-month warranty provided at collection.',
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
      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-4">Service Area — MacBook Air M2 Battery Replacement</h2>
          <p className="text-[#7A9E98] mb-6 leading-relaxed">
            Our Hyde Park workshop is centrally located for all northern Johannesburg suburbs. Collection and return available. Same-day collection for urgent swollen battery cases.
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
          <FAQAccordion items={faqs} title="MacBook Air M2 Battery Replacement — Common Questions" />
        </div>
      </section>

      {/* Related Services */}
      <section className="py-8 sm:py-16 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#E8F4F1] mb-6">Related Repairs</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              { label: 'All Battery Replacements', href: '/battery-replacement' },
              { label: 'MacBook Air M1 Battery', href: '/battery-replacement/macbook-air-m1' },
              { label: 'MacBook Pro Battery', href: '/battery-replacement/macbook-pro' },
              { label: 'MacBook Pro 14-Inch Battery', href: '/battery-replacement/macbook-pro-14-inch' },
              { label: 'MacBook Pro 16-Inch Battery', href: '/battery-replacement/macbook-pro-16-inch' },
              { label: 'MacBook Air Logic Board', href: '/logic-board-repair/macbook-air' },
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
      <section className="py-8 sm:py-16 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-[rgba(39,80,77,0.3)] border border-[rgba(15,234,122,0.2)] rounded-3xl p-10">
            <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3">MacBook Air M2 Battery Struggling?</h2>
            <p className="text-[#7A9E98] mb-6 max-w-xl mx-auto leading-relaxed">
              WhatsApp us your model (13-inch or 15-inch), cycle count, and a description of the issue. We will give you an honest price and turnaround before you bring the machine in. Free diagnostic. No Fix No Fee.
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
              1 Hyde Lane, Hyde Park, Office E2004, JHB 2196 | MacBook Air M2 from R1,999 | 12-month warranty
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
