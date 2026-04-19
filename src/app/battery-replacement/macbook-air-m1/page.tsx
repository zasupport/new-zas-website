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
  title: 'MacBook Air M1 Battery Replacement Johannesburg 2026 | From R1,899 | ZA Support',
  description:
    'MacBook Air M1 battery replacement Johannesburg from R1,899. 49.9 Wh cell, fanless design considerations, full calibration. From R599 assessment. From R599 assessment. Hyde Park.',
  alternates: { canonical: 'https://zasupport.com/battery-replacement/macbook-air-m1' },
  keywords: [
    'MacBook Air M1 battery replacement Johannesburg',
    'MacBook Air M1 battery replacement Hyde Park',
    'MacBook Air M1 swollen battery',
    'MacBook Air M1 battery cycle count',
    'MacBook Air M1 battery cost South Africa',
    'MacBook Air 2020 battery replacement Johannesburg',
    'MacBook Air M1 battery life poor',
    'MacBook Air M1 battery health percentage',
    'MacBook Air M1 49.9 Wh battery',
    'MacBook Air M1 battery replacement near me',
  ],
};

/* -- Breadcrumbs ----------------------------------------------------------- */
const breadcrumbItems = [
  { label: 'Battery Replacement', href: '/battery-replacement' },
  { label: 'MacBook Air M1' },
];

const breadcrumbSchemaItems = [
  { name: 'Home', url: 'https://zasupport.com' },
  { name: 'Battery Replacement', url: 'https://zasupport.com/battery-replacement' },
  { name: 'MacBook Air M1', url: 'https://zasupport.com/battery-replacement/macbook-air-m1' },
];

/* -- Service Schema -------------------------------------------------------- */
const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'MacBook Air M1 Battery Replacement Johannesburg',
  description:
    'Professional MacBook Air M1 battery replacement in Johannesburg. 49.9 Wh lithium-polymer cell, fanless design specialist, full calibration. From R1,899. From R599 assessment. 12-month warranty.',
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
    lowPrice: '1899',
    highPrice: '2499',
    priceCurrency: 'ZAR',
    offerCount: '2',
  },
  availableChannel: [
    { '@type': 'ServiceChannel', serviceUrl: 'https://wa.me/27645295863', serviceType: 'WhatsApp' },
    { '@type': 'ServiceChannel', servicePhone: '+27645295863', serviceType: 'Phone' },
  ],
};

/* -- FAQs ------------------------------------------------------------------ */
const faqs = [
  {
    question: 'How much does a MacBook Air M1 battery replacement cost in Johannesburg?',
    answer:
      'MacBook Air M1 battery replacement at our Hyde Park workshop starts from R1,899. This includes the 49.9 Wh replacement cell, all labour, adhesive removal, post-installation calibration, and a written 12-month warranty. Apple charges R2,800 to R4,500 for the same repair. Our assessment fee starts from R599, which is applied toward the repair cost if you proceed.',
  },
  {
    question: 'How long does a MacBook Air M1 battery replacement take?',
    answer:
      'The MacBook Air M1 battery replacement is typically completed within 2 to 3 hours. The M1 Air has a simpler internal layout than the MacBook Pro — four adhesive sections instead of six or eight — and the fanless design means fewer cables to route around. We include a full charge-discharge calibration cycle in the turnaround. Same-day service is available for all bookings confirmed before 14:00.',
  },
  {
    question: 'What is the MacBook Air M1 battery capacity and cycle count rating?',
    answer:
      'The MacBook Air M1 ships with a 49.9 Wh lithium-polymer battery. Apple rates it for 1,000 charge cycles before maximum capacity drops below 80%. The M1 chip is extraordinarily power-efficient, which means the 49.9 Wh cell delivers up to 18 hours of video playback — but this efficiency also means the battery undergoes fewer deep discharge cycles under normal use, potentially extending its calendar lifespan. Load shedding in Johannesburg disrupts this advantage.',
  },
  {
    question: 'Does the MacBook Air M1 fanless design affect battery replacement?',
    answer:
      'Yes, in a positive way for the repair process. The MacBook Air M1 has no fan, no heat pipe, and no thermal management ducting inside the chassis. This means fewer cables, fewer connectors, and a cleaner path to the battery. However, the fanless design also means the M1 chip relies on the aluminium chassis for passive heat dissipation. We take particular care not to leave any adhesive residue on the top case that could impede thermal transfer after reassembly.',
  },
  {
    question: 'My MacBook Air M1 battery health shows 78% — should I replace it?',
    answer:
      'At 78%, your battery is below the 80% threshold that Apple considers end-of-life. You will likely notice reduced battery life — perhaps 10 to 12 hours instead of the original 15 to 18 hours. macOS may also display a Service Recommended message. We recommend replacement at this point, as further degradation is non-linear — the battery will lose capacity faster from here. Our diagnostic confirms the exact state before we quote.',
  },
  {
    question: 'Does load shedding damage the MacBook Air M1 battery?',
    answer:
      'Yes. Every power interruption during load shedding forces the MacBook Air M1 to switch between AC power and its internal battery, counting as a partial charge cycle. The M1 Air is particularly affected because many owners use it as a primary machine during load shedding — relying on its long battery life to work through outages. This constant charge-discharge cycling during Stages 2 through 6 can add 1,500 to 2,500 extra partial cycles annually. A UPS eliminates this wear.',
  },
  {
    question: 'Is the MacBook Air M1 battery the same as the MacBook Air M2?',
    answer:
      'No, they are physically different. The MacBook Air M1 uses a 49.9 Wh cell in the older tapered wedge chassis design. The MacBook Air M2 uses a 52.6 Wh cell in the newer flat-body design with a different adhesive layout. The cells are not interchangeable, and the adhesive section count differs. We stock both and can replace either model same-day.',
  },
  {
    question: 'Can a swollen battery damage my MacBook Air M1?',
    answer:
      'Absolutely. The MacBook Air M1 has a thinner chassis than the MacBook Pro, which means a swollen battery exerts pressure against the trackpad and display hinge sooner. We have seen cases where a swollen Air M1 battery has cracked the trackpad glass or warped the display hinge, both of which are expensive secondary repairs. If your trackpad feels stiff or the bottom case appears slightly raised, bring the machine in immediately.',
  },
  {
    question: 'What warranty do you offer on MacBook Air M1 battery replacement?',
    answer:
      'All MacBook Air M1 battery replacements at ZA Support carry a written 12-month warranty covering the replacement cell and our workmanship. If the battery develops any fault within 12 months — capacity dropping below 80% of new capacity, swelling, unexpected shutdowns, or any electrical fault — we replace it again at from R599. From R599 assessment applies: if we assess your machine and determine the battery is not the issue, you pay only the assessment fee from R599.',
  },
  {
    question: 'How do I check my MacBook Air M1 battery health?',
    answer:
      'Open System Settings (or System Preferences on older macOS versions), click Battery in the sidebar, then click Battery Health. You will see your maximum capacity percentage and cycle count. The M1 Air also shows a condition status: Normal, Service Recommended, or Replace Now. For a detailed readout including cell voltage, temperature history, and charge rate, download coconutBattery (free). We use this tool as part of our diagnostic.',
  },
  {
    question: 'Do you offer collection for MacBook Air M1 battery replacement?',
    answer:
      'Yes. We collect and return from all suburbs within 25 km of our Hyde Park workshop — Sandton, Rosebank, Bryanston, Fourways, Midrand, Randburg, Morningside, Rivonia, Houghton, and Parkhurst. Same-day collection is available for urgent swollen battery cases. WhatsApp us or call 064 529 5863 to arrange. Pretoria and Centurion collection is available by arrangement.',
  },
];

/* -- Structured Data ------------------------------------------------------- */
const faqSchema = buildFaqSchema(faqs);
const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbSchemaItems);

/* -- Page Component -------------------------------------------------------- */
export default function BatteryReplacementMacBookAirM1Page() {
  const whatsappUrl = buildWhatsAppUrl('BAT-AIRM1-HERO', 'battery');

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
              MacBook Air M1 Battery Replacement
              <br /><span className="text-[#0FEA7A]">Johannesburg</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-4 max-w-3xl leading-relaxed">
              The MacBook Air M1 redefined battery life — 18 hours from a 49.9 Wh cell. But Johannesburg&apos;s load shedding has pushed many of these machines to their cycle limit years ahead of schedule. We replace the battery in 2 to 3 hours at our Hyde Park workshop. From R1,899 with a 12-month warranty and From R599 assessment guarantee.
            </p>
            <div className="flex items-center gap-2 text-[#7A9E98] text-sm mb-8">
              <MapPin className="w-4 h-4 text-[#0FEA7A]" />
              <span>1 Hyde Lane, Hyde Park, Office E2004, JHB 2196 | Air M1 from R1,899</span>
            </div>
            <div className="flex flex-wrap gap-3 mb-8">
              {[
                { icon: Shield, label: 'From R599 assessment' },
                { icon: Battery, label: '49.9 Wh Cell' },
                { icon: Zap, label: 'R599 Assessment' },
                { icon: CheckCircle, label: '12-Month Warranty' },
                { icon: Wrench, label: '2-3 Hour Turnaround' },
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
                { value: '1,200+', label: 'Air M1 Batteries Replaced' },
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
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4">Understanding the MacBook Air M1 Battery</h2>
          <div className="space-y-4 text-[#7A9E98] leading-relaxed">
            <p>
              The MacBook Air M1, released in November 2020, was the first Mac laptop to use Apple&apos;s own silicon. The M1 chip&apos;s 5-nanometre architecture draws so little power that Apple eliminated the internal fan entirely — making the Air M1 a passively cooled machine with a 49.9 Wh lithium-polymer battery rated for 18 hours of video playback. That efficiency is why the Air M1 became the best-selling Mac of all time. It is also why so many of them are now arriving at our Hyde Park workshop with degraded batteries.
            </p>
            <p>
              The irony is that the M1 Air&apos;s extraordinary efficiency makes it the machine of choice during load shedding. Johannesburg professionals pull it off the charger when Eskom cuts power and rely on its long battery life to work through 2.5 or 4.5-hour outage windows. This is exactly the use pattern that accelerates battery degradation. Every transition from AC to battery counts as a partial charge cycle. On a Stage 4 schedule, that is 8 to 12 extra partial cycles daily. We have documented Air M1 machines arriving with cycle counts exceeding 1,100 at just 30 months of age — well past Apple&apos;s 1,000-cycle rating.
            </p>
            <p>
              Internally, the Air M1 battery is secured with four adhesive pull-tab sections — simpler than the six sections on the 14-inch Pro or eight sections on the 16-inch Pro. The fanless design means there are no thermal ducting or fan cables to route around, giving us a cleaner path to the battery. However, the Air M1&apos;s thinner chassis means there is less tolerance for swelling. A battery that expands by even 1.5 millimetres can push against the trackpad mechanism, causing stiff or unresponsive clicks, or in severe cases, crack the trackpad glass entirely.
            </p>
            <p>
              Our replacement process for the Air M1 begins with a comprehensive diagnostic using coconutBattery: cycle count, maximum capacity as a percentage of the 49.9 Wh design capacity, individual cell voltage balance, and charging circuit health. We then remove the bottom case — secured by pentalobe screws, the same as the MacBook Pro — disconnect the battery ribbon cable, and release the four adhesive sections using controlled heat at a maximum of 50 degrees Celsius and 90% isopropyl solvent. The replacement cell is pre-tested for voltage and capacity before installation.
            </p>
            <p>
              After installation, we run a calibration cycle unique to the Apple Silicon platform. The M1&apos;s battery management unit uses machine learning to optimise charging patterns over time. A fresh battery resets this learned profile, so we run a full charge-discharge-charge sequence to give the BMU initial calibration data. We verify the battery registers 49.9 Wh design capacity and 100% maximum capacity in System Settings before the machine leaves our workshop. The entire process — diagnostic through to collection — is typically completed within 2 to 3 hours.
            </p>
          </div>
          <div className="mt-6">
            <a
              href="https://www.ifixit.com/Guide/MacBook+Air+13-Inch+(M1)+Battery+Replacement/140496"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[#0FEA7A] text-sm font-semibold hover:underline"
            >
              iFixit MacBook Air M1 battery guide <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-10 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4">MacBook Air M1 Battery Replacement Pricing</h2>
          <p className="text-[#7A9E98] mb-8 max-w-3xl leading-relaxed">
            The MacBook Air M1 was produced in a single configuration (13.3-inch display, tapered wedge design). All M1 Air models use the same 49.9 Wh cell, so pricing is straightforward. Apple charges R2,800 to R4,500 and replaces the entire top case assembly. We replace only the battery.
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
                  { model: 'MacBook Air M1 13.3" (Late 2020)', battery: '49.9 Wh', from: 'R1,899', turnaround: '2-3 hrs' },
                  { model: 'MacBook Air M1 13.3" (2020) — Swollen', battery: '49.9 Wh', from: 'R1,899', turnaround: '2-3 hrs' },
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
            Price includes the 49.9 Wh replacement cell, labour, calibration, and a 12-month warranty. Assessment from R599 — applied toward repair cost. From R599 assessment.
          </p>
          <PricingNote variant="inline" />
        </div>
      </section>

      {/* Load Shedding Section */}
      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-4">Load Shedding and Your MacBook Air M1 Battery</h2>
          <div className="space-y-4 text-[#7A9E98] leading-relaxed">
            <p>
              The MacBook Air M1 became South Africa&apos;s unofficial load shedding workhorse. Its combination of long battery life, silent operation, and lightweight portability made it the natural choice for working through power outages. But this reliance has a hidden cost. We have replaced more Air M1 batteries in the past 12 months than any other single Mac model — and the overwhelming majority show cycle counts consistent with heavy load shedding usage.
            </p>
            <p>
              The pattern is consistent. A MacBook Air M1 purchased in early 2021 should, under normal usage without load shedding, reach 1,000 cycles by mid-to-late 2025. Instead, we are seeing machines from that era arriving in 2024 and early 2025 with cycle counts of 1,100 to 1,400 — driven by the constant partial cycling of Stages 2 through 6. The most effective protection is a quality UPS that maintains clean AC power during outages, preventing the Mac from switching to battery at all. For machines already past the threshold, the only remedy is a battery replacement.
            </p>
          </div>
        </div>
      </section>

      {/* Service Process */}
      <section className="py-10 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-8">Our MacBook Air M1 Battery Replacement Process</h2>
          <div className="space-y-6">
            {[
              {
                step: 1,
                title: 'Walk-In Diagnostic',
                desc: 'No appointment needed. We run coconutBattery and System Information to capture your cycle count, maximum capacity, cell voltage balance, and charging health. Written quote within 15 minutes. The Air M1 diagnostic is faster than Pro models due to the simpler internal layout.',
              },
              {
                step: 2,
                title: 'Bottom Case & Battery Disconnect',
                desc: 'Ten pentalobe screws secure the bottom case. Once removed, the battery ribbon cable is disconnected from the logic board. The fanless M1 design means no fan cables or thermal ducting to manage — a clean, unobstructed path to the battery.',
              },
              {
                step: 3,
                title: 'Four-Section Adhesive Release',
                desc: 'Controlled heat (max 50 degrees Celsius) applied to the top case, followed by 90% isopropyl solvent at the adhesive seams. Each of the four pull-tab sections is released using non-conductive nylon spudgers. The 49.9 Wh cell is lifted clear.',
              },
              {
                step: 4,
                title: 'Cell Verification & Installation',
                desc: 'The replacement 49.9 Wh cell is tested for open-circuit voltage, capacity, and balance. New adhesive applied, cell seated, connector engaged. Bottom case torqued to specification. No adhesive residue left on the chassis — critical for the M1 passive thermal path.',
              },
              {
                step: 5,
                title: 'Calibration & Collection',
                desc: 'Full charge-discharge-charge calibration cycle. System Settings verification: 49.9 Wh design capacity, 100% maximum capacity, cycle count 0 or 1, Normal condition. Trackpad click test and charging test completed. You collect with a written 12-month warranty.',
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
      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-4">Apple Store vs ZA Support: MacBook Air M1 Battery</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            <div className="glass-card p-6 border border-red-500/20">
              <h3 className="text-red-400 font-bold mb-4">Apple Store / iStore</h3>
              <ul className="text-[#7A9E98] text-sm space-y-2.5">
                <li>Top case assembly replacement — R2,800 to R4,500</li>
                <li>Turnaround 5 to 7 business days via depot</li>
                <li>Keyboard and trackpad replaced unnecessarily</li>
                <li>No coconutBattery diagnostic shared</li>
                <li>From R599 assessment not offered</li>
              </ul>
            </div>
            <div className="glass-card p-6 border border-[rgba(15,234,122,0.3)]">
              <h3 className="text-[#0FEA7A] font-bold mb-4">ZA Support</h3>
              <ul className="text-[#7A9E98] text-sm space-y-2.5">
                <li>Battery cell only — R1,899 all-inclusive</li>
                <li>Same-day 2 to 3 hour turnaround</li>
                <li>coconutBattery diagnostic shared with you</li>
                <li>From R599 assessment — pay only R599 assessment if not repairable</li>
                <li>Written 12-month warranty on cell and workmanship</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Service Area */}
      <section className="py-10 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-4">Service Area — MacBook Air M1 Battery Replacement</h2>
          <p className="text-[#7A9E98] mb-6 leading-relaxed">
            Walk in to our Hyde Park workshop or arrange collection. We serve all northern Johannesburg suburbs and offer same-day collection for urgent swollen battery cases.
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
          <FAQAccordion items={faqs} title="MacBook Air M1 Battery Replacement — Common Questions" />
        </div>
      </section>

      {/* Related Services */}
      <section className="py-8 sm:py-16 bg-[#111C1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#E8F4F1] mb-6">Related Repairs</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              { label: 'All Battery Replacements', href: '/battery-replacement' },
              { label: 'MacBook Air M2 Battery', href: '/battery-replacement/macbook-air-m2' },
              { label: 'MacBook Pro Battery', href: '/battery-replacement/macbook-pro' },
              { label: 'MacBook Pro 14-Inch Battery', href: '/battery-replacement/macbook-pro-14-inch' },
              { label: 'MacBook Air Logic Board', href: '/logic-board-repair/macbook-air' },
              { label: 'MacBook Air Screen Repair', href: '/screen-repair/macbook-air' },
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
            <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3">MacBook Air M1 Battery Dying?</h2>
            <p className="text-[#7A9E98] mb-6 max-w-xl mx-auto leading-relaxed">
              WhatsApp us your cycle count and maximum capacity percentage — or just describe the problem — and we will give you an honest assessment and price. From R599 assessment. 2 to 3 hour turnaround. From R599 assessment.
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
              1 Hyde Lane, Hyde Park, Office E2004, JHB 2196 | MacBook Air M1 from R1,899 | 12-month warranty
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
