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
  title: 'MacBook Pro 13-inch Battery Replacement Johannesburg [2026] | From R1,799 | ZA Support',
  description:
    'MacBook Pro 13-inch battery replacement Johannesburg from R1,799. All models 2012–2024. Touch Bar dual-cell covered. Adhesive removal specialists. From R599 assessment. Hyde Park.',
  alternates: { canonical: 'https://zasupport.com/battery-replacement/macbook-pro-13-inch' },
  keywords: [
    'MacBook Pro 13 inch battery replacement Johannesburg',
    'MacBook Pro 13 inch battery replacement Hyde Park',
    'MacBook Pro 13 battery replacement cost South Africa',
    'MacBook Pro 13 swollen battery Johannesburg',
    'MacBook Pro 13 Touch Bar battery replacement',
    'MacBook Pro 13 M1 M2 battery replacement',
    'MacBook Pro 13 2020 2021 2022 battery',
    'MacBook Pro 13 inch battery Sandton',
    'MacBook Pro 13 inch battery cycle count',
    'MacBook Pro A2338 A2251 A2289 battery replacement',
  ],
};

/* ── Breadcrumbs ─────────────────────────────────────────────────────────── */
const breadcrumbItems = [
  { label: 'Battery Replacement', href: '/battery-replacement' },
  { label: 'MacBook Pro', href: '/battery-replacement/macbook-pro' },
  { label: '13-inch' },
];

const breadcrumbSchemaItems = [
  { name: 'Home', url: 'https://zasupport.com' },
  { name: 'Battery Replacement', url: 'https://zasupport.com/battery-replacement' },
  { name: 'MacBook Pro', url: 'https://zasupport.com/battery-replacement/macbook-pro' },
  { name: 'MacBook Pro 13-inch', url: 'https://zasupport.com/battery-replacement/macbook-pro-13-inch' },
];

/* ── Service Schema ──────────────────────────────────────────────────────── */
const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'MacBook Pro 13-inch Battery Replacement Johannesburg',
  description:
    'Professional MacBook Pro 13-inch battery replacement in Johannesburg. All models 2012 through 2024. Touch Bar dual-cell models covered. Adhesive removal specialists. From R1,799. From R599 assessment. Up-to-3 year warranty.',
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
    offerCount: '6',
  },
  availableChannel: [
    { '@type': 'ServiceChannel', serviceUrl: 'https://wa.me/27645295863', serviceType: 'WhatsApp' },
    { '@type': 'ServiceChannel', servicePhone: '+27645295863', serviceType: 'Phone' },
  ],
};

/* ── Pricing Table ───────────────────────────────────────────────────────── */
const pricingRows = [
  { model: 'MacBook Pro 13″ Retina (2012–2014)', battery: '74.9 Wh', from: 'R1,799', turnaround: '2–4 hrs' },
  { model: 'MacBook Pro 13″ Retina (2015)', battery: '74.9 Wh', from: 'R1,799', turnaround: '2–4 hrs' },
  { model: 'MacBook Pro 13″ Touch Bar (2016–2019)', battery: '49.2–58.2 Wh', from: 'R1,799', turnaround: '2–4 hrs' },
  { model: 'MacBook Pro 13″ Touch Bar (2020 Intel)', battery: '58.2 Wh', from: 'R1,799', turnaround: '2–4 hrs' },
  { model: 'MacBook Pro 13″ M1 (Late 2020)', battery: '58.2 Wh', from: 'R1,799', turnaround: '2–4 hrs' },
  { model: 'MacBook Pro 13″ M2 (2022)', battery: '58.2 Wh', from: 'R1,799', turnaround: '2–4 hrs' },
];

/* ── Fault Types ─────────────────────────────────────────────────────────── */
const faultTypes = [
  {
    title: 'Swollen Battery — Trackpad Bulge',
    icon: AlertTriangle,
    desc: 'The single most common fault we see on MacBook Pro 13-inch models. On every 13-inch MacBook Pro — from 2012 through to the M2 model — the battery cells sit directly beneath the trackpad. When the lithium-polymer cells begin to off-gas at end-of-life, they expand upward, pressing against the trackpad from below. Early signs include a trackpad that clicks with increasing resistance, particularly in the centre. Advanced swelling makes the trackpad stiff or completely non-responsive. On 2016–2019 Touch Bar models with the thinner chassis, swelling can bow the bottom case before the trackpad symptom appears. This is an urgent fault.',
    severity: 'high',
  },
  {
    title: 'Touch Bar Models — Adhesive Evolution',
    icon: Wrench,
    desc: 'The 2016 MacBook Pro 13-inch Touch Bar introduced a redesigned adhesive mounting system for the battery. Apple moved to a stretch-release pull-tab design on this model for the first time in the 13-inch line. The 2016 and 2017 models use a slightly different adhesive compound than the 2018, 2019, and 2020 Touch Bar models. We have documented the adhesive differences across all six Touch Bar 13-inch generations and use the correct removal technique for each. A technician who applies the 2020 adhesive removal technique to a 2016 model risks tab breakage and residue left on the top case.',
    severity: 'medium',
  },
  {
    title: 'Cycle Count Exceeded — 1,000-Cycle Threshold',
    icon: Battery,
    desc: 'Apple rates all MacBook Pro 13-inch batteries for 1,000 charge cycles. The earliest Touch Bar 13-inch models (2016) are now almost ten years old, and many 2015, 2016, and 2017 units in Johannesburg have been through multiple batteries already. We see 2019 and 2020 Intel 13-inch models regularly arriving at 900 to 1,000 cycles, often coinciding with the "Service Recommended" notice in macOS. Load shedding in South Africa accelerates this timeline measurably — we estimate 12 to 18 months of lifecycle reduction for Johannesburg users without a UPS.',
    severity: 'medium',
  },
  {
    title: 'Touch Bar Secondary Cell Fault',
    icon: Cpu,
    desc: 'MacBook Pro 13-inch Touch Bar models (2016–2021) include a secondary battery cell that powers the Touch Bar and the embedded T1 or T2 security chip independently of the main battery array. Symptoms of a secondary cell fault include the Touch Bar flickering, going completely dark, or the machine failing to wake from sleep. On most Touch Bar 13-inch models, the secondary cell is part of the same physical battery assembly as the main cells — replacing the main battery replaces the secondary cell simultaneously. We test Touch Bar function thoroughly after every Touch Bar model battery replacement.',
    severity: 'low',
  },
  {
    title: 'Sudden Shutdown at Low Charge',
    icon: Zap,
    desc: 'MacBook Pro 13-inch machines that shut down unexpectedly at 20–40% displayed charge are experiencing battery management unit (BMU) calibration drift. As cells age, the voltage at a given charge level diverges from the factory calibration stored in the BMU. The machine shuts down to protect the logic board from over-discharge damage. This is indistinguishable from certain logic board faults without a discharge test. We run a full profile test to confirm the battery is the cause before quoting — not the logic board, SMC, or a software fault.',
    severity: 'medium',
  },
  {
    title: 'Non-Removable Retina (2015) — Screw Release',
    icon: Activity,
    desc: 'The 2015 MacBook Pro 13-inch Retina uses a different battery mounting method than later adhesive models — the cells are secured with screws at each end rather than pull-tab adhesive. This makes removal mechanically cleaner but requires the correct pentalobe and Torx screwdriver sizes for the specific cell anchor points. We have the complete 2015 Retina battery toolkit on hand and replace this model regularly. The 74.9 Wh cells in these machines are high-capacity compared to later Touch Bar models and can last to 1,000 cycles easily — but machines now 10+ years old are well past that threshold.',
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
    question: 'How much does MacBook Pro 13-inch battery replacement cost in Johannesburg?',
    answer:
      'MacBook Pro 13-inch battery replacement starts from R1,799 at our Hyde Park workshop, covering all models from 2012 through to the M2 (2022). The Apple Store charges R3,500 to R6,000 for the same service, and on some Touch Bar models replaces the entire top case assembly rather than the battery alone. Our price includes the replacement cell, all labour, calibration, and a written warranty of up to 3 years. The assessment fee (from R599) is applied toward the repair cost if you proceed.',
  },
  {
    question: 'Which MacBook Pro 13-inch models do you replace batteries for?',
    answer:
      'We replace batteries for every MacBook Pro 13-inch generation: Retina 2012 (A1425), Retina 2013–2014 (A1502), Retina 2015 (A1502), Touch Bar 2016 (A1706), Touch Bar 2017 (A1706), Touch Bar 2018 (A1989), Touch Bar 2019 (A1989/A2159), Touch Bar 2020 Intel (A2251/A2289), M1 2020 (A2338), and M2 2022 (A2338). We stock replacement cells for all variants.',
  },
  {
    question: 'My MacBook Pro 13-inch trackpad is hard to click or feels raised — what is causing this?',
    answer:
      'This is almost certainly a swollen battery. On all MacBook Pro 13-inch models, the battery cells sit immediately beneath the trackpad. As the cells off-gas and expand, they push the trackpad upward, increasing click resistance until the trackpad becomes completely stiff. This is an urgent fault — a swollen lithium-polymer battery is a fire risk if the pouch is punctured. Bring your machine to our Hyde Park workshop as soon as possible. We remove swollen 13-inch batteries daily and the repair is typically completed within 2 to 4 hours.',
  },
  {
    question: 'How do Touch Bar 13-inch MacBook Pro batteries differ from non-Touch Bar models?',
    answer:
      'Touch Bar 13-inch models (2016–2021) use adhesive pull-tab mounted lithium-polymer cells rather than the screw-mounted cells used in the 2015 and earlier Retina models. They also include a secondary battery cell dedicated to the Touch Bar and T1/T2 security chip. The adhesive compound and pull-tab angle evolved across the six Touch Bar 13-inch generations — a technician who uses the wrong technique risks snapping the adhesive tabs. We document the correct removal procedure for each generation and have replaced batteries across all six Touch Bar variants.',
  },
  {
    question: 'Does load shedding affect MacBook Pro 13-inch battery health?',
    answer:
      'Yes, significantly. The MacBook Pro 13-inch is often used as a primary work machine at home in South Africa — precisely the machine that suffers the most partial cycles from power interruptions. During Stage 4 load shedding, a Johannesburg household experiences up to 12 power interruptions per day, each adding a partial charge cycle. Over 12 to 18 months, we see this translate into 13-inch MacBook Pros reaching end-of-battery life significantly earlier than the rated 1,000-cycle mark. A quality UPS eliminates this additional wear.',
  },
  {
    question: 'How long does MacBook Pro 13-inch battery replacement take?',
    answer:
      'MacBook Pro 13-inch battery replacements are typically completed within 2 to 4 hours, including diagnostic, adhesive removal, installation, and calibration. Same-day service is available for all 13-inch models when booked before 14:00. If you need your machine the same morning, contact us on WhatsApp before 09:00 to confirm a slot.',
  },
  {
    question: 'Do you replace the battery on the 2015 MacBook Pro 13-inch Retina?',
    answer:
      'Yes. The 2015 MacBook Pro 13-inch Retina (A1502) uses a 74.9 Wh battery secured with screws rather than adhesive pull-tabs. This makes removal mechanically cleaner than later adhesive models, but requires specific Torx and pentalobe tooling for the cell anchor points. We replace 2015 Retina batteries regularly — these machines are now over ten years old, and many have reached or exceeded 1,000 cycles. Replacement restores the full rated 12-hour runtime.',
  },
  {
    question: 'What is the cycle count rating for MacBook Pro 13-inch batteries?',
    answer:
      'Apple rates all MacBook Pro 13-inch batteries — from 2012 through to the M2 2022 — for 1,000 charge cycles before capacity is expected to drop below 80% of design capacity. One cycle = one full discharge from 100% to 0%. Partial cycles add up: a 50% discharge plus another 50% discharge = one cycle. Load shedding adds many partial cycles without most owners realising it. You can check your cycle count in System Information (hold Option, click Apple menu, select System Information, click Power).',
  },
  {
    question: 'Can you replace the battery on a MacBook Pro 13-inch with a Touch Bar?',
    answer:
      'Yes. We replace batteries on all six Touch Bar 13-inch generations: 2016, 2017, 2018, 2019, 2020 Intel, and 2021 M1. Touch Bar models require careful management of the Touch Bar flex cable, which routes alongside the battery during removal. We verify Touch Bar function, security chip communication, and Touch ID after every Touch Bar model battery replacement. Touch Bar function is included in our post-repair checklist at no additional charge.',
  },
  {
    question: 'What warranty do you offer on MacBook Pro 13-inch battery replacements?',
    answer:
      'MacBook Pro 13-inch battery replacements at ZA Support carry a written warranty of up to 3 years. The warranty covers the replacement cell and our workmanship. If the battery fails within the warranty period — dropping below 80% capacity or developing any electrical fault — we replace it again at from R599. The warranty document is issued in writing at collection. From R599 assessment: if our assessment determines the battery is not the cause of your fault, you pay only R599 and your machine is returned unchanged.',
  },
];

/* ── Structured Data ─────────────────────────────────────────────────────── */
const faqSchema = buildFaqSchema(faqs);
const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbSchemaItems);

/* ── Page Component ──────────────────────────────────────────────────────── */
export default function BatteryReplacementMacBookPro13InchPage() {
  const whatsappUrl = buildWhatsAppUrl('BAT-PRO-13-HERO', 'battery');

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
              MacBook Pro 13-inch Battery Replacement
              <br /><span className="text-[#0FEA7A]">Johannesburg</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-4 max-w-3xl leading-relaxed">
              All 13-inch models 2012 to 2024 — Retina, Touch Bar, M1, M2. Swollen batteries, high cycle counts, and Touch Bar secondary cells. Adhesive evolution specialists. From R1,799. Same-day service available.
            </p>
            <div className="flex items-center gap-2 text-[#7A9E98] text-sm mb-8">
              <MapPin className="w-4 h-4 text-[#0FEA7A]" />
              <span>1 Hyde Lane, Hyde Park, Office E2004, JHB 2196 | MacBook Pro 13″ from R1,799</span>
            </div>
            <div className="flex flex-wrap gap-3 mb-8">
              {[
                { icon: Shield, label: 'From R599 assessment' },
                { icon: Battery, label: 'All 13″ Models 2012–2024' },
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
                { value: '2,500+', label: '13″ Batteries Replaced' },
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
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4">MacBook Pro 13-inch Battery Replacement Pricing</h2>
          <p className="text-[#7A9E98] mb-8 max-w-3xl leading-relaxed">
            Starting prices include the replacement cell, labour, calibration, and our written warranty. Apple charges R3,500 to R6,000+ for this service. We replace the battery cells only — not the entire top case assembly.
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
          <PricingRange page="/battery-replacement/macbook-pro-13-inch" />
          <PricingNote variant="inline" />
        </div>
      </section>

      {/* Technical Detail */}
      <section className="py-10 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4">MacBook Pro 13-inch Battery History — What Matters for Repair</h2>
          <div className="space-y-4 text-[#7A9E98] leading-relaxed">
            <p>
              The MacBook Pro 13-inch has been Apple&apos;s most popular laptop for over a decade. In our Hyde Park workshop, it is the most frequently serviced battery model by a significant margin — we have replaced 13-inch batteries across twelve distinct generations, from the 2012 Retina (A1425) through to the M2 (A2338). Each generation has a different battery capacity, adhesive system, and removal procedure. Getting these wrong leads to broken pull-tabs, residue on the top case, or worse — a punctured cell.
            </p>
            <p>
              The most significant adhesive evolution in the 13-inch line came with the 2016 Touch Bar model. Prior to 2016, the 2015 Retina and earlier models used screws to anchor the battery cells to the top case. Simple to remove but limited in how thin Apple could make the chassis. The 2016 Touch Bar 13-inch introduced the stretch-release adhesive pull-tab system — four tabs beneath a dual-cell array, requiring a specific angle and tension to release cleanly. Apple modified the adhesive compound in 2018, changing the required release angle. We track these generational differences precisely because a technician who applies the 2018 technique to a 2016 battery breaks the tabs.
            </p>
            <p>
              The Touch Bar also introduced a secondary battery cell — a small cell dedicated to the Touch Bar and the T1 security chip. This secondary cell is physically part of the same battery assembly as the main cells on most 13-inch Touch Bar models. Replacing the battery replaces the secondary cell simultaneously. We verify Touch Bar function, Touch ID, and T2 communication after every Touch Bar model replacement. In over three years of servicing these models, we have not encountered a case where a properly performed battery replacement caused a Touch Bar fault.
            </p>
            <p>
              For M1 and M2 13-inch owners: these models share the same chassis dimensions as the 2020 Intel Touch Bar 13-inch. The battery capacity is identical at 58.2 Wh, and the adhesive system is the same. However, the battery management unit firmware on Apple Silicon models communicates differently with macOS than Intel models. After replacement on an M1 or M2, the battery health percentage resets to 100% in System Settings and the "Service Recommended" notice clears — provided the calibration cycle is completed correctly before the machine is handed back to the client.
            </p>
            <p>
              Load shedding is a disproportionate problem for MacBook Pro 13-inch owners in South Africa because this model is most commonly used as a home office machine — precisely the machine that is plugged in and unplugged repeatedly during load shedding events. We estimate that Johannesburg-based 13-inch MacBook Pro owners without a UPS are reaching battery end-of-life 12 to 18 months earlier than the global average for the same model. We recommend a battery assessment from R599 for any 2019 or earlier 13-inch MacBook Pro used in Johannesburg, and for any 2020 or later model showing reduced runtime.
            </p>
          </div>
          <div className="mt-6">
            <a href="https://www.ifixit.com/Device/MacBook_Pro_13%22" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-[#0FEA7A] text-sm font-semibold hover:underline">
              iFixit MacBook Pro 13-inch battery guides <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Battery Fault Types */}
      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4">MacBook Pro 13-inch Battery Faults We Repair</h2>
          <p className="text-[#7A9E98] mb-10 max-w-3xl leading-relaxed">
            Twelve generations of 13-inch MacBook Pro, and the battery faults cluster around the same failure modes. Each fault below is diagnosed before quoting.
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
              Every repair is quoted before work begins. Our From R599 assessment policy means that if we assess your MacBook Pro 13-inch and determine a battery replacement will not resolve your issue, an assessment fee of R599 applies and your machine is returned unchanged. Up-to-3 year warranty on all completed battery replacements.
            </p>
          </div>
        </div>
      </section>

      {/* Apple vs ZA Support */}
      <section className="py-10 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-4">Apple Store vs ZA Support: MacBook Pro 13-inch Battery</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="glass-card p-6 border border-red-500/20">
              <h3 className="text-red-400 font-bold mb-4">Apple Store / iStore</h3>
              <ul className="text-[#7A9E98] text-sm space-y-2.5">
                <li>Top case assembly on Touch Bar models — R3,500 to R6,000+</li>
                <li>Turnaround 5–10 business days via Apple depot</li>
                <li>No cycle count or capacity report shared with client</li>
                <li>AppleCare+ required for reduced pricing</li>
                <li>Older models (pre-2016) may not be serviced</li>
                <li>No Touch Bar function verification documented</li>
              </ul>
            </div>
            <div className="glass-card p-6 border border-[rgba(15,234,122,0.3)]">
              <h3 className="text-[#0FEA7A] font-bold mb-4">ZA Support</h3>
              <ul className="text-[#7A9E98] text-sm space-y-2.5">
                <li>Battery cells only — all 13″ generations 2012–2024</li>
                <li>From R1,799 including labour and warranty</li>
                <li>coconutBattery capacity report at collection</li>
                <li>Turnaround 2–4 hours same day</li>
                <li>Touch Bar function verified on all Touch Bar models</li>
                <li>Up-to-3 year warranty on the replacement cell</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Service Process */}
      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-8">Our MacBook Pro 13-inch Battery Replacement Process</h2>
          <div className="space-y-6">
            {[
              { step: 1, title: 'Drop Off & Diagnostic', desc: 'No appointment needed. Full battery diagnostic: cycle count, maximum capacity, cell voltage balance via coconutBattery and System Information. Written quote within 20 minutes.' },
              { step: 2, title: 'Generation-Specific Adhesive Removal', desc: 'We identify your exact 13-inch model identifier and apply the correct adhesive removal technique for that generation. Controlled heat (max 50°C), the correct adhesive solvent, and non-conductive plastic tools. No metal near the battery pouch.' },
              { step: 3, title: 'Touch Bar Cable Management', desc: 'On Touch Bar models (2016–2021), the Touch Bar flex cable is carefully managed and protected during battery removal to prevent damage to the Touch Bar circuit. Touch Bar function is verified post-installation.' },
              { step: 4, title: 'Replacement Cell Verification', desc: 'Replacement cell tested for voltage, capacity, and cell balance before installation. Model identifier verified to ensure exact OEM capacity match.' },
              { step: 5, title: 'Calibration & Collect', desc: 'Full charge-discharge calibration. Battery health confirmed at 100%. Written warranty up to 3 years, System Information screenshot, assessment fee included in total.' },
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
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-4">MacBook Pro 13-inch Battery — Johannesburg Service Area</h2>
          <p className="text-[#7A9E98] mb-6 leading-relaxed">
            Our Hyde Park workshop is 10 to 20 minutes from most northern Johannesburg suburbs. Collection and return available from Sandton, Rosebank, Bryanston, Fourways, Midrand, Randburg, and Morningside.
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
          <FAQAccordion items={faqs} title="MacBook Pro 13-inch Battery Replacement — Common Questions" />
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
              { label: 'MacBook Pro M1 Battery', href: '/battery-replacement/macbook-pro-m1' },
              { label: 'MacBook Pro M2 Battery', href: '/battery-replacement/macbook-pro-m2' },
              { label: 'MacBook Pro 14″ Battery', href: '/battery-replacement/macbook-pro-14-inch' },
              { label: 'Logic Board Repair', href: '/logic-board-repair' },
              { label: 'MacBook Pro Screen Repair', href: '/screen-repair/macbook-pro' },
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
            <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3">MacBook Pro 13-inch Battery Issue? Book a Diagnostic.</h2>
            <p className="text-[#7A9E98] mb-6 max-w-xl mx-auto leading-relaxed">
              WhatsApp us your MacBook Pro 13-inch model year and the fault description — swollen battery, reduced runtime, Touch Bar issues, or unexpected shutdowns — and we will confirm pricing before you come in. Assessment from R599, applied toward the repair if you proceed.
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
              1 Hyde Lane, Hyde Park, Office E2004, JHB 2196 | MacBook Pro 13″ from R1,799 | Up-to-3 year warranty
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
