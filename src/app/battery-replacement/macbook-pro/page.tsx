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
  title: 'MacBook Pro Battery Replacement Johannesburg [2026] | From R1,799 | ZA Support',
  description:
    'MacBook Pro battery replacement Johannesburg from R1,799. Swollen battery, cycle count monitoring, adhesive removal. From R599 assessment. Hyde Park workshop.',
  alternates: { canonical: 'https://zasupport.com/battery-replacement/macbook-pro' },
  keywords: [
    'MacBook Pro battery replacement Johannesburg',
    'MacBook Pro battery replacement Hyde Park',
    'MacBook Pro swollen battery Johannesburg',
    'MacBook Pro battery cycle count Johannesburg',
    'MacBook Pro 14 inch battery replacement',
    'MacBook Pro 16 inch battery replacement',
    'MacBook Pro M1 battery replacement',
    'MacBook Pro M2 battery replacement',
    'MacBook Pro trackpad bulge battery swelling',
    'MacBook Pro battery replacement cost South Africa',
  ],
};

/* ── Breadcrumbs ─────────────────────────────────────────────────────────── */
const breadcrumbItems = [
  { label: 'Battery Replacement', href: '/battery-replacement' },
  { label: 'MacBook Pro' },
];

const breadcrumbSchemaItems = [
  { name: 'Home', url: 'https://zasupport.com' },
  { name: 'Battery Replacement', url: 'https://zasupport.com/battery-replacement' },
  { name: 'MacBook Pro', url: 'https://zasupport.com/battery-replacement/macbook-pro' },
];

/* ── Service Schema ──────────────────────────────────────────────────────── */
const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'MacBook Pro Battery Replacement Johannesburg',
  description:
    'Professional MacBook Pro battery replacement in Johannesburg. Swollen battery removal, adhesive strip extraction, cycle count diagnostics. From R1,799. From R599 assessment. Up-to-3 year warranty.',
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
    lowPrice: '2199',
    highPrice: '4850',
    priceCurrency: 'ZAR',
    offerCount: '5',
  },
  availableChannel: [
    { '@type': 'ServiceChannel', serviceUrl: 'https://wa.me/27645295863', serviceType: 'WhatsApp' },
    { '@type': 'ServiceChannel', servicePhone: '+27645295863', serviceType: 'Phone' },
  ],
};

/* ── Pricing Table ───────────────────────────────────────────────────────── */
const pricingRows = [
  { model: 'MacBook Pro 13″ (Retina 2012–2015)', battery: '74.9 Wh', from: 'R1,799', turnaround: '2–4 hrs' },
  { model: 'MacBook Pro 13″ (Touch Bar 2016–2020)', battery: '58.2–61.4 Wh', from: 'R1,799', turnaround: '2–4 hrs' },
  { model: 'MacBook Pro 13″ (M1/M2 2020–2022)', battery: '58.2 Wh', from: 'R1,799', turnaround: '2–4 hrs' },
  { model: 'MacBook Pro 14″ (M1 Pro/Max 2021)', battery: '69.6 Wh', from: 'R2,299', turnaround: '4–6 hrs' },
  { model: 'MacBook Pro 14″ (M2/M3/M4 Pro/Max)', battery: '69.6–70 Wh', from: 'R2,299', turnaround: '4–6 hrs' },
  { model: 'MacBook Pro 15″ (Intel 2013–2019)', battery: '77.9–99.5 Wh', from: 'R1,999', turnaround: '2–4 hrs' },
  { model: 'MacBook Pro 16″ (M1 Pro/Max 2021)', battery: '99.6 Wh', from: 'R2,299', turnaround: '4–6 hrs' },
  { model: 'MacBook Pro 16″ (M2/M3/M4 Pro/Max)', battery: '99.6–100 Wh', from: 'R2,299', turnaround: '4–6 hrs' },
];

/* ── Fault Types ─────────────────────────────────────────────────────────── */
const faultTypes = [
  {
    title: 'Swollen Battery — Trackpad Bulge',
    icon: AlertTriangle,
    desc: 'The most common MacBook Pro battery fault we see in our Hyde Park workshop. Lithium-polymer cells begin to off-gas when they reach end-of-life or suffer internal damage, causing the pouch to expand. On 13-inch MacBook Pros, the battery sits directly beneath the trackpad — swelling pushes upward and causes the trackpad to click with increasing resistance or stop clicking altogether. On 14-inch and 16-inch models, severe swelling can bow the aluminium bottom case. This is an urgent repair: continued use with a swollen battery increases the risk of the pouch rupturing, which releases flammable electrolyte. We handle swollen battery removals daily using controlled depressurisation and adhesive release techniques.',
    severity: 'high',
  },
  {
    title: 'End-of-Life — Cycle Count Exceeded',
    icon: Battery,
    desc: 'Apple rates MacBook Pro batteries for 1,000 charge cycles before capacity drops below 80% of design capacity. Once your cycle count passes this threshold, macOS displays a "Service Recommended" message in the battery menu bar icon. In practice, we see many MacBook Pros in Johannesburg hitting this threshold far earlier than expected — 12 to 18 months ahead of a normal lifecycle — because load shedding forces constant micro-cycles between battery and mains power. We diagnose cycle count and maximum capacity using coconutBattery and Apple System Information before quoting. If your capacity reads below 80%, replacement is typically warranted.',
    severity: 'medium',
  },
  {
    title: 'Sudden Shutdown — Inaccurate State of Charge',
    icon: Zap,
    desc: 'MacBook Pros that shut down unexpectedly at 15–40% displayed charge are suffering from a battery management fault. The battery management unit (BMU) uses voltage curves to estimate remaining capacity. When cells degrade unevenly, the voltage drop at a given charge level no longer matches the stored calibration table, and the BMU triggers a forced shutdown to protect the logic board. The machine typically restarts immediately, but the experience is identical to a logic board fault. We run a discharge test to distinguish battery degradation from BMU firmware corruption or a logic board power rail fault.',
    severity: 'medium',
  },
  {
    title: 'Touch Bar Battery — Secondary Cell Fault',
    icon: Cpu,
    desc: 'MacBook Pro models from 2016 to 2021 with a Touch Bar include a secondary battery cell dedicated to the Touch Bar and embedded T2/T1 security chip. In rare cases, this secondary cell develops a fault independently of the main battery array. Symptoms include the Touch Bar flickering, going blank, or the machine failing to sleep correctly. Replacing the main battery array addresses the secondary cell simultaneously, as they share the same physical battery unit on most Touch Bar models. We test Touch Bar function thoroughly after every battery replacement on these models.',
    severity: 'low',
  },
  {
    title: 'Adhesive Failure — Battery Movement',
    icon: Wrench,
    desc: 'Apple uses adhesive pull-tabs to secure the battery cells to the top case on MacBook Pro models from 2015 onwards. Over time — and particularly in the South African summer heat, which regularly exceeds 35°C in Johannesburg — these adhesive strips can lose their bond. A loose battery shifts inside the case, creating a faint rattling sound when the machine is moved, or causes intermittent disconnection under vibration. We re-secure loose batteries using approved adhesive and verify continuity across the battery connector before reassembly.',
    severity: 'low',
  },
  {
    title: 'MagSafe / USB-C Charging Fault After Battery Replacement',
    icon: Activity,
    desc: 'Some MacBook Pros present a charging fault that appears to be a cable or charger issue but is actually a battery fault. When a degraded battery draws excessive current at low state of charge, the USB-C power delivery negotiation can fail, causing the charger to disconnect and reconnect repeatedly. You will see the MagSafe LED flashing amber, or the USB-C power delivery icon flickering in the menu bar. A new battery immediately resolves this in the majority of cases. If it does not, we diagnose the USB-C charging controller IC on the logic board as a secondary fault.',
    severity: 'medium',
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
    question: 'How much does a MacBook Pro battery replacement cost in Johannesburg?',
    answer:
      'MacBook Pro 13-inch battery replacement starts from R1,799 at our Hyde Park workshop. MacBook Pro 14-inch and 16-inch models start from R2,299 due to the larger cells and additional adhesive complexity. The Apple Store charges R3,500 to R8,000 for the same replacement, and sometimes more for current M3 and M4 Pro/Max models. Our price includes the battery, all labour, calibration, and a written warranty of up to 3 years. The assessment fee (from R599) is applied toward the repair cost if you proceed.',
  },
  {
    question: 'How do I check my MacBook Pro battery cycle count?',
    answer:
      'Open the Apple menu, hold Option, click System Information, then select Power from the left panel. You will see your cycle count and maximum capacity listed under Battery Information. Apple rates MacBook Pro batteries for 1,000 cycles before capacity is expected to drop below 80%. If your cycle count exceeds 900 or your maximum capacity is below 80%, we recommend a battery assessment. You can also download coconutBattery (free) for a more detailed readout, including cell voltage and temperature history.',
  },
  {
    question: 'My MacBook Pro trackpad is hard to click or feels raised — what is causing this?',
    answer:
      'This is almost certainly a swollen battery. On 13-inch MacBook Pros, the battery cells sit immediately beneath the trackpad. As the cells off-gas and expand, they push the trackpad upward, increasing click resistance and eventually making the trackpad stiff or completely unresponsive. This is an urgent fault — a swollen lithium-polymer battery is a fire risk if the pouch is punctured. Bring your machine to our Hyde Park workshop as soon as possible. We remove swollen batteries daily and the repair is typically completed within 2 to 4 hours.',
  },
  {
    question: 'Is a swollen MacBook Pro battery dangerous?',
    answer:
      'Yes, it carries a genuine risk if left unaddressed. Lithium-polymer batteries that are off-gassing contain flammable electrolyte under pressure. If the battery pouch is punctured — for example by the pressure of the swelling forcing it against an internal screw boss — the electrolyte can ignite. The risk is low with normal use, but increases with heat, compression, or continued charging. We strongly advise against using a MacBook with a visibly swollen battery. Do not place it in a bag or on soft surfaces that could trap heat. Contact us immediately.',
  },
  {
    question: 'Does load shedding damage my MacBook Pro battery?',
    answer:
      'Yes, measurably so. When mains power cuts and restores during a load shedding cycle, your MacBook Pro switches between battery and AC power. Each transition counts as a partial charge cycle. During a typical Stage 4 schedule, Johannesburg residents experience 8 to 12 power interruptions per day — that is 8 to 12 additional partial cycles on top of normal use. Over 12 to 18 months, we see this translate into batteries reaching end-of-life significantly earlier than their rated 1,000-cycle lifespan. A UPS that maintains clean AC power during shedding eliminates this additional wear entirely.',
  },
  {
    question: 'How long does a MacBook Pro battery replacement take?',
    answer:
      'MacBook Pro 13-inch battery replacements are typically completed within 2 to 4 hours, including our post-replacement calibration cycle. MacBook Pro 14-inch and 16-inch models take 4 to 6 hours — the larger adhesive surface area requires more careful removal to avoid damaging the top case. We offer same-day service for all MacBook Pro battery replacements booked before 14:00. If you need your machine the same morning, contact us on WhatsApp to confirm slot availability.',
  },
  {
    question: 'What is involved in the MacBook Pro battery replacement process?',
    answer:
      'We begin with a full battery diagnostic: cycle count, maximum capacity, cell voltage balance, and charging circuit health. Once confirmed, the technician removes the bottom case, disconnects the MagSafe/USB-C charging connector, and releases the battery adhesive pull-tabs using a combination of gentle heat and an adhesive releasing solvent. We never use bladed tools near the cells to avoid puncture risk. The replacement cell is tested for voltage and capacity before installation, then calibrated through a full charge-discharge cycle with macOS open. The completed repair includes a System Information screenshot confirming the new battery registers correctly.',
  },
  {
    question: 'Will my MacBook Pro battery health percentage reset after replacement?',
    answer:
      'Yes. After a professional battery replacement on an Apple Silicon MacBook Pro (M1 through M4), the battery health percentage in System Settings resets to 100% and the cycle count resets to zero or near-zero. On Intel MacBook Pros, macOS reads the health percentage from the battery management unit — a new battery will report 100% maximum capacity. You should see the "Normal" battery condition in System Information within a few hours of normal use after the initial calibration cycle.',
  },
  {
    question: 'Do you replace the battery on M1, M2, M3, and M4 MacBook Pro models?',
    answer:
      'Yes, we replace batteries on all Apple Silicon MacBook Pro generations including M1, M1 Pro, M1 Max, M2, M2 Pro, M2 Max, M3, M3 Pro, M3 Max, M4, M4 Pro, and M4 Max. These models use adhesive-mounted lithium-polymer cells that require specialist removal tooling. The 14-inch and 16-inch models use a 69.6 Wh and 99.6 Wh cell respectively — significantly larger than the 13-inch cells, which is reflected in our pricing from R2,299.',
  },
  {
    question: 'Can you replace the battery on a MacBook Pro with a Touch Bar?',
    answer:
      'Yes. MacBook Pro models with a Touch Bar (2016 through to the 2021 13-inch M1 Pro model) have the Touch Bar connected via a flex cable that routes alongside the battery. We carefully manage this cable during battery removal to avoid any damage to the Touch Bar circuit. After installation, we verify that the Touch Bar lights up correctly, responds to touch input, and that the embedded T2 security chip communicates normally with the main logic board. Touch Bar function is included in our post-repair checklist.',
  },
  {
    question: 'What warranty do you offer on MacBook Pro battery replacements?',
    answer:
      'MacBook Pro battery replacements at ZA Support carry a written warranty of up to 3 years. The warranty covers the replacement battery cell and our workmanship. If the battery fails within the warranty period — defined as maximum capacity dropping below 80% of new capacity, or the battery developing any electrical fault — we replace it again at from R599. The warranty document is provided in writing at collection. From R599 assessment applies: if we assess your machine and determine a battery replacement will not resolve your issue, you pay only the assessment fee from R599.',
  },
];

/* ── Structured Data ─────────────────────────────────────────────────────── */
const faqSchema = buildFaqSchema(faqs);
const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbSchemaItems);

/* ── Page Component ──────────────────────────────────────────────────────── */
export default function BatteryReplacementMacBookProPage() {
  const whatsappUrl = buildWhatsAppUrl('BAT-PRO-HERO', 'battery');

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
              MacBook Pro Battery Replacement
              <br /><span className="text-[#0FEA7A]">Johannesburg</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-4 max-w-3xl leading-relaxed">
              From swollen batteries pushing against the trackpad to end-of-life cells with high cycle counts — we replace MacBook Pro batteries across all generations in our Hyde Park workshop. Pro 13&quot; from R1,799. Pro 14&quot;/16&quot; from R2,299. Same-day service available.
            </p>
            <div className="flex items-center gap-2 text-[#7A9E98] text-sm mb-8">
              <MapPin className="w-4 h-4 text-[#0FEA7A]" />
              <span>1 Hyde Lane, Hyde Park, Office E2004, JHB 2196 | Pro 13″ from R1,799 | Pro 14″/16″ from R2,299</span>
            </div>
            <div className="flex flex-wrap gap-3 mb-8">
              {[
                { icon: Shield, label: 'From R599 assessment' },
                { icon: Battery, label: 'All MacBook Pro Models' },
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
                href="/battery-replacement"
                className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.2)] text-[#7A9E98] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[rgba(15,234,122,0.05)] transition-all"
              >
                All Battery Replacements <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
            <div className="flex flex-wrap gap-6 mt-8 pt-6 border-t border-[rgba(255,255,255,0.06)]">
              {[
                { value: '3,000+', label: 'MacBook Pro Batteries Replaced' },
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
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4">MacBook Pro Battery Replacement Pricing</h2>
          <p className="text-[#7A9E98] mb-8 max-w-3xl leading-relaxed">
            Prices below are starting prices including the replacement cell, labour, calibration, and our written warranty. The Apple Store charges R3,500 to R8,000 for the same replacement — and in some cases replaces the entire top case assembly rather than the battery alone. We replace only the battery.
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
          <PricingRange page="/battery-replacement/macbook-pro" />
          <PricingNote variant="inline" />
        </div>
      </section>

      {/* Technical Detail */}
      <section className="py-10 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4">What Makes MacBook Pro Battery Replacement Different</h2>
          <div className="space-y-4 text-[#7A9E98] leading-relaxed">
            <p>
              MacBook Pro battery replacement is not a simple swap. From the 2015 MacBook Pro onwards, Apple moved to adhesive-mounted lithium-polymer cells — held in place by stretch-release adhesive pull-tabs routed beneath the cells. On older models, the tabs pull cleanly away if you know the correct angle and apply steady tension. On newer 14-inch and 16-inch MacBook Pros, there are up to eight separate adhesive sections across a battery pack that spans the full width of the lower case. Get it wrong and you puncture a cell.
            </p>
            <p>
              In our Hyde Park workshop, we have replaced MacBook Pro batteries on every generation from the 2012 non-Retina through to the current M4 Pro and M4 Max models. We use a combination of controlled heat (no higher than 50°C to avoid thermal stress to the cells), slow-release adhesive solvent applied at the seams, and non-conductive plastic pry tools. We never use metal blades near the battery pouch. This approach adds time to the procedure but eliminates the risk of a punctured cell, which would turn a routine replacement into a hazardous materials situation.
            </p>
            <p>
              Load shedding is a genuine battery health risk in South Africa that we see the consequences of daily. Johannesburg households on a Stage 4 schedule experience up to 12 power interruptions per day. Each interruption forces the MacBook Pro to transition between battery power and AC power, counting as a partial charge cycle. Our observation across hundreds of client machines is that MacBook Pros used in Johannesburg without a UPS are reaching 1,000 cycles 12 to 18 months sooner than the same models used in cities without load shedding. The most cost-effective long-term solution is a quality UPS for your workspace, combined with replacing the battery once it drops below 80% capacity.
            </p>
            <p>
              The most common sign we see of an imminent battery failure on the 13-inch MacBook Pro is a raised or stiff trackpad. The click mechanism on these models relies on the physical gap between the trackpad and the chassis. When the battery swells — even by 1 to 2 mm — it closes that gap. Clients often report that the trackpad &quot;feels different&quot; for weeks before they notice the click becoming difficult. If you experience this, the battery is likely already in an advanced state of swelling and should be replaced as a matter of urgency.
            </p>
            <p>
              Apple&apos;s own battery replacement documentation, available through the iFixit MacBook Pro battery guide, covers the mechanical procedure at a high level. What it does not capture is the nuance of adhesive removal on a battery that has partially swollen, the correct solvent concentration to use without damaging the top case anodising, or the post-replacement calibration steps required to ensure the battery management unit reports accurately in macOS. These are skills that come from volume — we perform multiple MacBook Pro battery replacements every week.
            </p>
          </div>
          <div className="mt-6">
            <a
              href="https://www.ifixit.com/Device/MacBook_Pro"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[#0FEA7A] text-sm font-semibold hover:underline"
            >
              iFixit MacBook Pro battery guides <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Battery Fault Types */}
      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4">MacBook Pro Battery Fault Patterns We Repair</h2>
          <p className="text-[#7A9E98] mb-10 max-w-3xl leading-relaxed">
            We have documented the most common MacBook Pro battery failure modes across every generation. Each fault below is diagnosable before quoting — we confirm the battery is the actual cause before proceeding.
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
              Every repair is quoted before work begins. Our From R599 assessment policy means that if we assess your MacBook Pro and determine a battery replacement will not resolve your issue, an assessment fee of R599 applies and your machine is returned exactly as we received it. Up-to-3 year warranty on all completed battery replacements.
            </p>
          </div>
        </div>
      </section>

      {/* Apple vs ZA Support Comparison */}
      <section className="py-10 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-4">Apple Store vs ZA Support: MacBook Pro Battery Replacement</h2>
          <p className="text-[#7A9E98] mb-8 leading-relaxed">
            Apple often replaces the entire top case assembly — keyboard, trackpad, and battery as one unit — rather than the battery alone. This dramatically inflates the cost. We replace only the battery cells.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            <div className="glass-card p-6 border border-red-500/20">
              <h3 className="text-red-400 font-bold mb-4">Apple Store / iStore</h3>
              <ul className="text-[#7A9E98] text-sm space-y-2.5">
                <li>Top case assembly replacement on many Pro models — R3,500 to R8,000+</li>
                <li>Turnaround 5–10 business days via Apple depot</li>
                <li>Keyboard and trackpad replaced unnecessarily on top-case models</li>
                <li>No diagnosis of underlying cause — battery swapped regardless</li>
                <li>AppleCare+ required for reduced cost on out-of-warranty machines</li>
                <li>Limited transparency on specific cell specifications used</li>
              </ul>
            </div>
            <div className="glass-card p-6 border border-[rgba(15,234,122,0.3)]">
              <h3 className="text-[#0FEA7A] font-bold mb-4">ZA Support</h3>
              <ul className="text-[#7A9E98] text-sm space-y-2.5">
                <li>Battery cells only — keyboard and trackpad are never touched</li>
                <li>MacBook Pro 13″ from R1,799 | 14″/16″ from R2,299</li>
                <li>Cycle count and capacity confirmed before quoting</li>
                <li>Turnaround 2–6 hours same day</li>
                <li>coconutBattery diagnostic included — results shared with client</li>
                <li>Up-to-3 year warranty on the replacement cell</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Service Process */}
      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-8">Our MacBook Pro Battery Replacement Process</h2>
          <div className="space-y-6">
            {[
              {
                step: 1,
                title: 'Drop Off & Initial Diagnostic',
                desc: 'Walk in to our Hyde Park workshop — no appointment needed. We run a battery diagnostic immediately: cycle count, maximum capacity, cell voltage balance, and charging circuit health using coconutBattery and Apple System Information. You will have a written quote within 20 minutes.',
              },
              {
                step: 2,
                title: 'Battery Removal',
                desc: 'Our technician removes the bottom case, disconnects the battery connector, and releases the adhesive pull-tabs using controlled heat (max 50°C) and adhesive solvent applied at the cell seams. Non-conductive plastic tools only — no metal near the battery pouch. On swollen batteries, we use a controlled depressurisation technique before extraction.',
              },
              {
                step: 3,
                title: 'Cell Verification & Installation',
                desc: 'The replacement cell is tested for open-circuit voltage, capacity, and cell balance before installation. We verify it matches the OEM capacity specification for your exact model. The battery connector is seated, the bottom case torqued to spec, and a visual inspection confirms no adhesive residue on the logic board.',
              },
              {
                step: 4,
                title: 'Calibration & QA',
                desc: 'We run a full charge-discharge calibration cycle with macOS open. We verify the battery registers 100% maximum capacity in System Information, confirms a cycle count of 1 or 0, and that MagSafe/USB-C charging is accepted without interruption. A thermal stress test confirms no excessive heat during charging.',
              },
              {
                step: 5,
                title: 'Collect With Warranty',
                desc: 'You collect your MacBook Pro with a written warranty of up to 3 years, a System Information screenshot confirming battery health, and the assessment fee included in the total cost. If the battery fails within the warranty period, we replace it again at from R599.',
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
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-4">MacBook Pro Battery Replacement — Johannesburg Service Area</h2>
          <p className="text-[#7A9E98] mb-6 leading-relaxed">
            Our Hyde Park workshop is 10 to 20 minutes from most northern Johannesburg suburbs. We offer collection and return from Sandton, Rosebank, Bryanston, Fourways, Midrand, Randburg, Morningside, Rivonia, and Houghton. Same-day collection is available for urgent swollen battery cases — contact us on WhatsApp or by phone to arrange.
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
          <FAQAccordion items={faqs} title="MacBook Pro Battery Replacement — Common Questions" />
        </div>
      </section>

      {/* Related Services */}
      <section className="py-8 sm:py-16 bg-[#111C1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#E8F4F1] mb-6">Related Repairs</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              { label: 'All Battery Replacements', href: '/battery-replacement' },
              { label: 'Battery Replacement — Sandton', href: '/battery-replacement/sandton' },
              { label: 'MacBook Pro Screen Repair', href: '/screen-repair/macbook-pro' },
              { label: 'Logic Board Repair', href: '/logic-board-repair' },
              { label: 'MacBook Pro Logic Board Repair', href: '/logic-board-repair/macbook-pro' },
              { label: 'Logic Board — MacBook Pro 14″', href: '/logic-board-repair/macbook-pro-14-inch' },
              { label: 'Logic Board — MacBook Pro 16″', href: '/logic-board-repair/macbook-pro-16-inch' },
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
            <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3">MacBook Pro Battery Issue? Book a Diagnostic.</h2>
            <p className="text-[#7A9E98] mb-6 max-w-xl mx-auto leading-relaxed">
              WhatsApp us a description of the fault — swollen battery, unexpected shutdowns, high cycle count, or a trackpad that no longer clicks properly — and we will give you an honest price range before you bring the machine in.  Assessment from R599, applied toward the repair if you proceed.
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
              1 Hyde Lane, Hyde Park, Office E2004, JHB 2196 | MacBook Pro 13″ from R1,799 | 14″/16″ from R2,299 | Up-to-3 year warranty
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
