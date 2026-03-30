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
  title: 'MacBook Air M1 Battery Replacement Johannesburg [2026] | From R1,499 | ZA Support',
  description:
    'MacBook Air M1 battery replacement Johannesburg from R1,499. 49.9Wh fanless chassis — swelling danger. Thin case requires specialist removal. No Fix No Fee. Hyde Park.',
  alternates: { canonical: 'https://zasupport.com/battery-replacement/macbook-air-m1' },
  keywords: [
    'MacBook Air M1 battery replacement Johannesburg',
    'MacBook Air M1 battery replacement Hyde Park',
    'MacBook Air M1 battery swollen Johannesburg',
    'MacBook Air M1 battery cost South Africa',
    'MacBook Air M1 battery replacement price',
    'MacBook Air M1 battery cycle count',
    'MacBook Air M1 A2337 battery replacement',
    'MacBook Air M1 battery Sandton',
    'fanless MacBook Air battery replacement',
    'MacBook Air M1 2020 battery service',
  ],
};

/* ── Breadcrumbs ─────────────────────────────────────────────────────────── */
const breadcrumbItems = [
  { label: 'Battery Replacement', href: '/battery-replacement' },
  { label: 'MacBook Air M1' },
];

const breadcrumbSchemaItems = [
  { name: 'Home', url: 'https://zasupport.com' },
  { name: 'Battery Replacement', url: 'https://zasupport.com/battery-replacement' },
  { name: 'MacBook Air M1', url: 'https://zasupport.com/battery-replacement/macbook-air-m1' },
];

/* ── Service Schema ──────────────────────────────────────────────────────── */
const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'MacBook Air M1 Battery Replacement Johannesburg',
  description:
    'Professional MacBook Air M1 battery replacement in Johannesburg. 49.9 Wh fanless chassis. Thin case specialist removal. Swollen battery risk in confined space. From R1,499. No Fix No Fee. Up-to-3 year warranty.',
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
  { model: 'MacBook Air M1 (Late 2020) — A2337', battery: '49.9 Wh', from: 'R1,499', turnaround: '2–4 hrs' },
];

/* ── Fault Types ─────────────────────────────────────────────────────────── */
const faultTypes = [
  {
    title: 'Swollen Battery — Thin Chassis Danger',
    icon: AlertTriangle,
    desc: 'The MacBook Air M1 is Apple\'s thinnest laptop — the chassis tapers from 4.1 mm at the front edge to 16.1 mm at the back. The 49.9 Wh battery array is packed into this confined space with very little clearance between the cells and the top case surface. When the cells begin to off-gas and swell, there is almost no room for the expansion before the top case deforms. A swollen MacBook Air M1 battery causes the upper surface of the machine to bow upward and the bottom case to flex. This can damage the display cable, which routes along the hinge in close proximity to the battery. If your Air M1 surface is bowing, treat this as urgent.',
    severity: 'high',
  },
  {
    title: 'Fanless Thermal Accumulation',
    icon: Cpu,
    desc: 'The MacBook Air M1 has no cooling fan — the M1 chip is thermally efficient enough under most workloads to run without active cooling. However, during sustained workloads — extended video calls, photo editing, long downloads — the machine relies entirely on passive heat dissipation through the chassis. This means the battery operates at higher sustained temperatures than a MacBook Pro with active cooling. In Johannesburg summer conditions (34–37°C in northern suburbs), a MacBook Air M1 running a sustained workload on a desk in an unventilated room can operate at chip temperatures that accelerate battery cell degradation. We note thermal history in our diagnostic.',
    severity: 'medium',
  },
  {
    title: 'Cycle Count — Five Years In',
    icon: Battery,
    desc: 'The MacBook Air M1 was released in November 2020, which means the earliest units are now over five years old. Apple rates the battery for 1,000 cycles. Heavy daily use, combined with South African load shedding partial cycles, means many M1 Air units in Johannesburg are at 600 to 900 cycles with capacity readings of 78 to 88%. If your M1 Air battery health in System Settings reads below 85% and you are noticing reduced runtime from the original 18-hour rating, a battery assessment confirms whether replacement is worthwhile.',
    severity: 'medium',
  },
  {
    title: 'Unexpected Shutdown — Calibration Drift',
    icon: Zap,
    desc: 'MacBook Air M1 machines that shut down unexpectedly at 10–25% displayed charge are experiencing battery management unit (BMU) calibration drift. The discharge voltage curve of the aged cells diverges from the factory calibration, causing a protective shutdown before the actual charge is depleted. This is particularly noticeable when the machine is running under load — the higher current draw accelerates the voltage drop that triggers the shutdown. We run a full discharge profile before quoting to confirm this is a battery fault rather than an SMC or logic board issue.',
    severity: 'medium',
  },
  {
    title: 'Reduced Runtime — 18-Hour Gap',
    icon: BatteryWarning,
    desc: 'The MacBook Air M1 was Apple\'s first fanless Apple Silicon laptop and was celebrated for its 18-hour rated battery life. In practice, clients who brought fresh M1 Airs to our workshop in 2021 reported 12 to 15 hours of mixed real-world use — still exceptional. A machine now at 80% capacity delivers roughly 10 to 12 hours of mixed use, which is still acceptable. Below 75%, you are at 8 to 10 hours — noticeable enough that most owners begin asking about replacement. We confirm capacity with coconutBattery and provide the data in writing before quoting.',
    severity: 'low',
  },
  {
    title: 'Display Cable Risk During Removal',
    icon: Wrench,
    desc: 'The MacBook Air M1 has one specific removal risk that is not present on MacBook Pro models: the display cable routes from the display assembly, along the hinge, and into the logic board area very close to the battery cells. On a machine with a swollen battery, the expanding cells can pinch or abrade this cable over time. During battery removal, if the cable is not explicitly protected, a careless extraction can sever it. We disconnect and protect the display cable as a standard step in our M1 Air battery procedure — it adds time but prevents a secondary fault that would require display cable replacement as well.',
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
    question: 'How much does MacBook Air M1 battery replacement cost in Johannesburg?',
    answer:
      'MacBook Air M1 battery replacement starts from R1,499 at our Hyde Park workshop. The Apple Store charges R2,500 to R5,000 for the same service. Our price includes the 49.9 Wh replacement cell, all labour, calibration, and a written warranty of up to 3 years. The assessment fee (from R599) is applied toward the repair cost if you proceed.',
  },
  {
    question: 'What is the battery capacity of the MacBook Air M1?',
    answer:
      'The MacBook Air M1 (A2337, Late 2020) uses a 49.9 Wh lithium-polymer battery, rated for 1,000 charge cycles. Despite the smaller capacity compared to MacBook Pro models, the M1 chip\'s exceptional efficiency enabled Apple to rate the Air M1 for up to 18 hours of video playback — the longest rated battery life of any MacBook Air at the time of release.',
  },
  {
    question: 'My MacBook Air M1 surface is bowing upward — is this a swollen battery?',
    answer:
      'Yes. The MacBook Air M1 has one of the thinnest chassis of any MacBook — the battery has very little clearance before it contacts the upper surface. When the 49.9 Wh cells swell, the machine\'s top surface bows visibly. This is an urgent fault. The proximity of the display cable to the battery means a swollen cell can damage the cable if left unaddressed. Do not continue using the machine, do not store it in a bag, and contact us immediately. We handle M1 Air swollen battery cases with our full decompression protocol.',
  },
  {
    question: 'Does the fanless design of the M1 Air affect battery health?',
    answer:
      'Yes, indirectly. The MacBook Air M1 has no active cooling fan. Under sustained workloads, the M1 chip and the battery operate at higher sustained temperatures than a MacBook Pro with fans. In Johannesburg summer conditions — ambient temperatures reaching 35°C or more in northern suburbs — a fanless M1 Air running a sustained workload in an unventilated space accumulates thermal stress on the battery cells that accelerates degradation. We check thermal history during our battery diagnostic and flag this to clients whose machines show elevated charge temperature averages.',
  },
  {
    question: 'How long does MacBook Air M1 battery replacement take?',
    answer:
      'MacBook Air M1 battery replacement takes 2 to 4 hours including diagnostic, display cable protection, adhesive removal, cell installation, and calibration. Same-day service is available when booked before 14:00. WhatsApp us to confirm a slot before bringing the machine in.',
  },
  {
    question: 'Does load shedding affect MacBook Air M1 battery health?',
    answer:
      'Yes. The MacBook Air M1 is popular as a student and home office machine in South Africa — precisely the use case most exposed to load shedding partial cycles. A M1 Air used at home during Stage 4 or Stage 6 shedding can accumulate 8 to 12 partial cycles per day in addition to normal use. We have tracked M1 Air units in Johannesburg reaching 800 to 1,000 cycles in under three years of purchase. A quality UPS is the most effective preventive measure.',
  },
  {
    question: 'Is the MacBook Air M1 battery harder to replace than MacBook Pro?',
    answer:
      'The cell capacity is smaller and the adhesive system is similar, but the thin chassis creates a unique challenge: the display cable routes close to the battery and must be explicitly protected during removal. This step is not required on MacBook Pro models where the cable takes a different path. The overall procedure is comparable in difficulty to the MacBook Pro 13-inch, and the 2 to 4 hour turnaround reflects this.',
  },
  {
    question: 'Will MacBook Air M1 battery replacement reset the cycle count to zero?',
    answer:
      'Yes. After replacement on a MacBook Air M1, System Settings shows battery health at 100% and the cycle count resets to 0 or 1. The "Service Recommended" notice clears. We issue a System Information screenshot at collection confirming the new cell is registered correctly as your warranty baseline.',
  },
  {
    question: 'What warranty do you offer on MacBook Air M1 battery replacements?',
    answer:
      'MacBook Air M1 battery replacements at ZA Support carry a written warranty of up to 3 years. The warranty covers the replacement cell and our workmanship. If the battery fails within the warranty period, we replace it again at no charge. No Fix No Fee: if our assessment determines the battery is not the cause of your fault, you pay only R599 and your machine is returned unchanged.',
  },
  {
    question: 'How do I check the battery health on my MacBook Air M1?',
    answer:
      'Open System Settings, go to Battery, and check the battery health percentage. Below 80% triggers "Service Recommended". For more detail, hold Option, click the Apple menu, select System Information, and navigate to Power — you will see the cycle count and maximum capacity. You can also download coconutBattery (free) for cell voltage history and temperature records. If your M1 Air is showing below 85% capacity or above 700 cycles, bring it in for an assessment.',
  },
];

/* ── Structured Data ─────────────────────────────────────────────────────── */
const faqSchema = buildFaqSchema(faqs);
const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbSchemaItems);

/* ── Page Component ──────────────────────────────────────────────────────── */
export default function BatteryReplacementMacBookAirM1Page() {
  const whatsappUrl = buildWhatsAppUrl('BAT-AIR-M1-HERO', 'battery');

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
              First Apple Silicon Air — 49.9 Wh in a fanless, ultra-thin chassis. Swollen batteries press directly against the upper case with almost no clearance. Specialist removal protecting the display cable. From R1,499. Same-day service available.
            </p>
            <div className="flex items-center gap-2 text-[#7A9E98] text-sm mb-8">
              <MapPin className="w-4 h-4 text-[#0FEA7A]" />
              <span>1 Hyde Lane, Hyde Park, Office E2004, JHB 2196 | MacBook Air M1 from R1,499</span>
            </div>
            <div className="flex flex-wrap gap-3 mb-8">
              {[
                { icon: Shield, label: 'No Fix No Fee' },
                { icon: Battery, label: 'MacBook Air M1 Specialist' },
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
                { value: '1,500+', label: 'Air M1 Batteries Replaced' },
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
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4">MacBook Air M1 Battery Replacement Pricing</h2>
          <p className="text-[#7A9E98] mb-8 max-w-3xl leading-relaxed">
            Starting price includes the 49.9 Wh replacement cell, labour, calibration, and our written warranty. Apple charges R2,500 to R5,000 for the same service. We replace the battery cells only.
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
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4">MacBook Air M1 Battery — What Makes This a Specialist Repair</h2>
          <div className="space-y-4 text-[#7A9E98] leading-relaxed">
            <p>
              The MacBook Air M1 (A2337) arrived in November 2020 as the machine that proved Apple Silicon was not a compromise. In our Hyde Park workshop, it remains one of the most popular machines we service — both because it sold in enormous numbers and because at five-plus years of age, many units are approaching battery end-of-life. The 49.9 Wh cell is rated for 1,000 cycles and achieves Apple&apos;s claimed 18-hour video playback on a new battery. That impressive figure relies entirely on the M1 chip&apos;s efficiency — the cell is actually smaller than many smartphones at 49.9 Wh.
            </p>
            <p>
              The thin chassis of the MacBook Air M1 — it tapers to just 4.1 mm at the front edge — creates a unique challenge for battery service. The 49.9 Wh cell array fits into this thin profile with minimal clearance between the battery surface and the top case. On a MacBook Pro, a swollen battery has some room to expand before causing visible deformation. On the M1 Air, even modest swelling immediately bows the top surface of the machine. More critically, the display cable on the M1 Air routes along the hinge area in close proximity to the battery cells. A swollen battery can pinch or abrade this cable over time, and during battery removal, an inattentive extraction can sever it. We disconnect and protect the display cable as a standard step in our M1 Air procedure — every time, without exception.
            </p>
            <p>
              The fanless design of the M1 Air is a mixed blessing for battery health. On the one hand, there are no fans to fail and no thermal fan noise. On the other hand, sustained workloads — extended video calls, long export tasks, intensive browsing — cause the M1 chip to run at sustained elevated temperatures that the chassis dissipates passively through the aluminium body. In Johannesburg summer, ambient temperatures frequently exceed 35°C in homes and offices without air conditioning. A fanless M1 Air running at thermal limits in these conditions accumulates more heat stress on the battery cells than the same machine in a cooler climate. We log charge temperature history during our coconutBattery diagnostic and flag machines showing elevated averages.
            </p>
            <p>
              Load shedding is particularly relevant for M1 Air owners in South Africa because this machine is the dominant laptop purchase for students and home office workers — the exact demographic most likely to work from home during load shedding without a UPS. We see M1 Air units arriving with 700 to 900 cycles after under three years of use in Johannesburg, driven by the combination of daily partial cycles from power interruptions and the inherently higher thermal environment of South African summer use. The battery assessment from R599 is the starting point: if your cycle count exceeds 700 or capacity reads below 82%, we discuss whether replacement is the right call before any work begins.
            </p>
          </div>
          <div className="mt-6">
            <a href="https://www.ifixit.com/Device/MacBook_Air_13%22_Late_2020_M1_A2337" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-[#0FEA7A] text-sm font-semibold hover:underline">
              iFixit MacBook Air M1 battery guide <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Battery Fault Types */}
      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4">MacBook Air M1 Battery Faults We Repair</h2>
          <p className="text-[#7A9E98] mb-10 max-w-3xl leading-relaxed">
            Five years of M1 Air battery service gives us clear data on the fault patterns. Each is diagnosed before quoting.
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
              Every repair is quoted before work begins. No Fix No Fee: assessment fee of R599 if the battery is not the cause. Up-to-3 year warranty on all completed MacBook Air M1 battery replacements.
            </p>
          </div>
        </div>
      </section>

      {/* Apple vs ZA Support */}
      <section className="py-10 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-4">Apple Store vs ZA Support: MacBook Air M1 Battery</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="glass-card p-6 border border-red-500/20">
              <h3 className="text-red-400 font-bold mb-4">Apple Store / iStore</h3>
              <ul className="text-[#7A9E98] text-sm space-y-2.5">
                <li>R2,500 to R5,000 for M1 Air battery service</li>
                <li>Turnaround 5–10 business days via depot</li>
                <li>Display cable risk not explicitly documented</li>
                <li>No thermal history report at collection</li>
                <li>AppleCare+ required for reduced pricing</li>
                <li>No load shedding cycle advice</li>
              </ul>
            </div>
            <div className="glass-card p-6 border border-[rgba(15,234,122,0.3)]">
              <h3 className="text-[#0FEA7A] font-bold mb-4">ZA Support</h3>
              <ul className="text-[#7A9E98] text-sm space-y-2.5">
                <li>Battery cells only — from R1,499 including warranty</li>
                <li>Display cable explicitly protected during removal</li>
                <li>coconutBattery thermal history checked and reported</li>
                <li>Turnaround 2–4 hours same day</li>
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
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-8">Our MacBook Air M1 Battery Replacement Process</h2>
          <div className="space-y-6">
            {[
              { step: 1, title: 'Drop Off & M1 Air Diagnostic', desc: 'No appointment needed. Full battery diagnostic: cycle count, maximum capacity, thermal history, cell voltage balance via coconutBattery. Visual inspection for swelling. Written quote within 20 minutes.' },
              { step: 2, title: 'Display Cable Protection', desc: 'Before any battery work, the display cable is disconnected and protected. This is a standard step on M1 Air — the cable routes close to the battery array and must be secured before adhesive removal begins.' },
              { step: 3, title: 'Adhesive Removal in Thin Chassis', desc: 'Controlled heat (max 50°C) and adhesive solvent applied at the cell seams. The thin M1 Air chassis requires careful pry tool selection — non-conductive plastic only. Sequential tab extraction from front to back.' },
              { step: 4, title: 'Replacement Cell & Calibration', desc: '49.9 Wh replacement cell tested for voltage and capacity before installation. Display cable reconnected. Full charge-discharge calibration with macOS open. System Settings confirms 100% health.' },
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
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-4">MacBook Air M1 Battery — Johannesburg Service Area</h2>
          <p className="text-[#7A9E98] mb-6 leading-relaxed">
            Our Hyde Park workshop is 10 to 20 minutes from most northern Johannesburg suburbs. Collection and return available from Sandton, Rosebank, Bryanston, Fourways, Midrand, and Randburg.
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
              { label: 'MacBook Pro M1 Battery', href: '/battery-replacement/macbook-pro-m1' },
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
            <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3">MacBook Air M1 Battery Issue? Book a Diagnostic.</h2>
            <p className="text-[#7A9E98] mb-6 max-w-xl mx-auto leading-relaxed">
              WhatsApp us the fault — surface bowing, reduced runtime, unexpected shutdowns, or "Service Recommended" — and we will confirm pricing before you come in. Assessment from R599, applied toward the repair if you proceed.
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
              1 Hyde Lane, Hyde Park, Office E2004, JHB 2196 | MacBook Air M1 from R1,499 | Up-to-3 year warranty
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
