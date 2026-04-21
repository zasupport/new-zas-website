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
  Clock,
  MapPin,
  AlertTriangle,
  Wrench,
  ThumbsUp,
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
  title: 'MacBook Air Battery Replacement Johannesburg [2026] | From R1,499 | ZA Support',
  description:
    'MacBook Air battery replacement in Johannesburg from R1,499. M1, M2, M3 & Intel Air. Swollen battery, adhesive removal, cycle count checks. From R599 assessment. Hyde Park.',
  alternates: { canonical: 'https://zasupport.com/battery-replacement/macbook-air' },
  keywords: [
    'MacBook Air battery replacement Johannesburg',
    'MacBook Air battery replacement Hyde Park',
    'MacBook Air M1 battery replacement',
    'MacBook Air M2 battery replacement',
    'MacBook Air M3 battery replacement',
    'MacBook Air swollen battery Johannesburg',
    'MacBook Air battery cycle count',
    'MacBook Air battery from R1499',
    'MacBook Air battery repair Sandton',
    'MacBook Air glued battery removal Johannesburg',
  ],
};

/* ── Breadcrumbs ─────────────────────────────────────────────────────────── */
const breadcrumbItems = [
  { label: 'Battery Replacement', href: '/battery-replacement' },
  { label: 'MacBook Air' },
];

const breadcrumbSchemaItems = [
  { name: 'Home', url: 'https://zasupport.com' },
  { name: 'Battery Replacement', url: 'https://zasupport.com/battery-replacement' },
  { name: 'MacBook Air', url: 'https://zasupport.com/battery-replacement/macbook-air' },
];

/* ── MacBook Air Battery Model Guide ─────────────────────────────────────── */
const airBatteryModels = [
  {
    model: 'MacBook Air M3 (2024)',
    modelCode: 'A3113',
    capacity: '52.6 Wh',
    cycles: '1,000',
    removalNote: 'Adhesive-strip system — five cells bonded to the lower case. Specialist removal required to avoid cell puncture.',
  },
  {
    model: 'MacBook Air M2 (2022)',
    modelCode: 'A2681',
    capacity: '52.6 Wh',
    cycles: '1,000',
    removalNote: 'Same adhesive strip design as M3. Thin 11.3 mm chassis leaves very little vertical clearance during extraction.',
  },
  {
    model: 'MacBook Air M1 (2020)',
    modelCode: 'A2337',
    capacity: '49.9 Wh',
    cycles: '1,000',
    removalNote: 'First M-series Air. Adhesive-mounted cells. Note smaller 49.9 Wh pack vs M2/M3 — confirm model before ordering.',
  },
  {
    model: 'MacBook Air Intel 13″ Retina (2018–2020)',
    modelCode: 'A1932 / A2179',
    capacity: '49.9 Wh',
    cycles: '1,000',
    removalNote: 'Introduced adhesive strip removal on Air. Known charging IC fault (ISL9239) on 2018 model causes false battery readings.',
  },
  {
    model: 'MacBook Air 13″ non-Retina (2012–2017)',
    modelCode: 'A1466',
    capacity: '54 Wh',
    cycles: '1,000',
    removalNote: 'Screwed-down battery — easier removal than adhesive models. Parts still available but lead times increasing.',
  },
  {
    model: 'MacBook Air 11″ (2011–2015)',
    modelCode: 'A1370 / A1465',
    capacity: '35 Wh',
    cycles: '1,000',
    removalNote: 'Smaller capacity. Screwed battery assembly. Tight chassis makes connector routing careful work. Parts still sourceable.',
  },
];

/* ── Warning Signs ───────────────────────────────────────────────────────── */
const warningSignsData = [
  {
    icon: BatteryWarning,
    title: '"Service Recommended" in Menu Bar',
    severity: 'high',
    desc: 'macOS displays this message when maximum battery capacity drops below 80% or cycle count crosses the rated threshold. It will not disappear without a replacement. This is your Mac telling you the battery is at end of life.',
  },
  {
    icon: AlertTriangle,
    title: 'Swollen Battery / Raised Trackpad',
    severity: 'high',
    desc: 'The MacBook Air chassis is only 11–16 mm thick at its widest point. A swelling lithium cell has nowhere to expand except upward — against the trackpad cable and glass. If your trackpad feels spongy, stiff, or the bottom case no longer sits flat, this is a safety issue requiring immediate attention.',
  },
  {
    icon: Zap,
    title: 'Unexpected Shutdowns at 20–40%',
    severity: 'medium',
    desc: 'As cells degrade, their voltage curve becomes non-linear. The Mac\'s battery management firmware can no longer predict remaining capacity accurately, causing it to cut power abruptly before reaching 0%. This is particularly common on load-shedding-affected MacBook Airs in Johannesburg.',
  },
  {
    icon: Clock,
    title: 'Only Works When Plugged In',
    severity: 'medium',
    desc: 'A MacBook Air that powers off the moment you unplug it has a battery so degraded it can no longer sustain a load. This is beyond "reduced capacity" — the cells have failed entirely. The Mac is treating the MagSafe or USB-C cable as a direct power source rather than a charger.',
  },
  {
    icon: Wrench,
    title: 'Cycle Count Exceeds Threshold',
    severity: 'low',
    desc: 'Apple rates all modern MacBook Air batteries for 1,000 cycles. You can check yours via System Information > Power or with the free utility coconutBattery. A count above 900 warrants planning a replacement — above 1,000 and degradation accelerates rapidly.',
  },
  {
    icon: ThumbsUp,
    title: 'Capacity Below 80% (Proactive)',
    severity: 'low',
    desc: 'Some clients come in proactively when maximum capacity drops below 80% — typically at cycles 700–900. This is the best time to replace: the Mac is still functional, there is no safety risk, and you avoid the sudden-shutdown phase entirely. We carry Air cells in stock for same-day turnaround.',
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
  high: 'Replace Urgently',
  medium: 'Replace Soon',
  low: 'Plan Replacement',
};

/* ── Process Steps ───────────────────────────────────────────────────────── */
const processSteps = [
  {
    step: 1,
    title: 'Drop In or Book a Collection',
    desc: 'Walk into our Hyde Park workshop or WhatsApp us to arrange a collection from Sandton, Rosebank, Bryanston, or surrounding suburbs. No appointment necessary for walk-ins.',
  },
  {
    step: 2,
    title: 'Battery Health Diagnostic',
    desc: 'We run a full battery diagnostic: cycle count, maximum capacity, charging circuit voltage, and thermal behaviour. We also check whether the issue is the battery itself or a charging IC fault — different problems, different solutions.',
  },
  {
    step: 3,
    title: 'Written Fixed-Price Quote',
    desc: 'You receive a written quote before any work begins. Assessment from R599 — included in the replacement cost if you proceed. The quote is the final price. No surprises.',
  },
  {
    step: 4,
    title: 'Adhesive Removal & Cell Replacement',
    desc: 'MacBook Air batteries from 2018 onwards use a stretch-release adhesive strip system. We heat the base, apply the correct solvent, and remove the cells without puncturing them. The new battery is seated with fresh adhesive and all connectors re-routed.',
  },
  {
    step: 5,
    title: 'Calibration & Quality Check',
    desc: 'After installation we run a charge-discharge calibration cycle, verify the battery reports correctly in macOS System Information, confirm MagSafe or USB-C charging, and test under load. Thermal stability is confirmed before handover.',
  },
  {
    step: 6,
    title: 'Collect with Written Warranty',
    desc: 'You leave with a written warranty of up to 3 years on the battery and our workmanship. If the replacement battery drops below 80% capacity within the warranty period, we replace it again at from R599 — parts and labour included.',
  },
];

/* ── FAQs ────────────────────────────────────────────────────────────────── */
const faqs = [
  {
    question: 'How much does MacBook Air battery replacement cost in Johannesburg?',
    answer:
      'MacBook Air battery replacement starts from R1,499 at our Hyde Park workshop. This covers all MacBook Air models — M1, M2, M3, Intel Retina (2018–2020), non-Retina (2012–2017), and 11-inch models. The price includes the battery cell, labour, adhesive, calibration, and a written warranty of up to 3 years. For context, the Apple Store charges R2,500 to R5,500 for the same service — and frequently quotes longer turnaround times due to depot shipping.',
  },
  {
    question: 'What cycle count should prompt a MacBook Air battery replacement?',
    answer:
      'Apple rates all MacBook Air batteries from 2010 onwards for 1,000 charge cycles. In practice, we recommend planning a replacement when your cycle count reaches 800 to 850 — at this point capacity is typically around 80% and degradation accelerates. You can check your cycle count for free using the coconutBattery app (coconut-flavour.com) or via About This Mac > System Report > Power. If you are already above 1,000 cycles, the replacement is overdue. We see Johannesburg MacBook Airs regularly arriving with cycle counts of 1,200+ due to accelerated load shedding cycling.',
  },
  {
    question: 'What is the difference between the M1 and M2/M3 MacBook Air battery?',
    answer:
      'The M1 MacBook Air (A2337, 2020) uses a 49.9 Wh battery pack, while the M2 (A2681, 2022) and M3 (A3113, 2024) use a slightly larger 52.6 Wh cell — giving the newer models marginally longer runtime at equivalent load. All three generations use Apple\'s adhesive strip mounting system, which bonds the battery cells directly to the aluminium lower case. This is significantly more involved to remove than the screwed-down batteries in pre-2018 MacBook Air models. The adhesive chemistry changed between the 2018 Intel Retina model and the M1, so we use the correct solvent for each generation.',
  },
  {
    question: 'What happens if the MacBook Air battery is swollen?',
    answer:
      'A swollen MacBook Air battery is a safety issue and should be treated as urgent. The MacBook Air chassis is exceptionally thin — between 11.3 mm and 16.1 mm depending on the model — so a swelling cell has nowhere to expand except upward into the trackpad assembly. We see this weekly in our workshop. The symptoms are: a trackpad that feels raised, spongy, or unresponsive; a bottom case that no longer sits flat on a desk; or visible bulging. We handle swollen battery removals using specialist tools to prevent puncture — a punctured lithium cell can release toxic gas and in rare cases ignite. Do not attempt to remove a swollen battery yourself.',
  },
  {
    question: 'Why are MacBook Air batteries glued in, and how do you remove them?',
    answer:
      'From the 2018 Intel Retina MacBook Air onwards, Apple bonded the battery cells to the lower case using stretch-release adhesive tabs — similar in principle to 3M Command strips. The design is intentional: it keeps the battery firmly seated in a thin chassis and reduces rattling. To remove them, we apply controlled heat to the base plate to soften the adhesive, introduce a small amount of isopropyl alcohol or a specialised solvent around the perimeter, and slowly pull the adhesive tabs in the correct direction. Done correctly, the cells lift out cleanly. Done incorrectly, the tabs snap and the cells must be prised — which risks puncture. We have removed hundreds of Air batteries using this method and have the process documented to model level.',
  },
  {
    question: 'Does load shedding affect MacBook Air battery life in Johannesburg?',
    answer:
      'Yes — measurably so. Every time load shedding cuts power and your MacBook Air switches from mains to battery, then charges back up when power returns, that counts as a partial charge cycle. During Stage 4 load shedding with two slots per day, your Mac can accumulate 60 to 100 additional cycles per month. We have seen MacBook Airs in Sandton, Midrand, and Randburg arrive with cycle counts of 900+ on machines barely 18 months old. The fix is not just a new battery — we also advise on macOS Battery Health Management settings and UPS configuration to slow cycle accumulation after replacement.',
  },
  {
    question: 'Can you check my MacBook Air battery health without replacing it?',
    answer:
      'Yes. Our battery diagnostic is part of the assessment service (from R599). We will tell you your cycle count, maximum capacity percentage, battery condition flag, and charging circuit status. If the battery does not need replacing yet, we will tell you that — and give you a realistic estimate of how many months you have left at your current usage pattern. We would rather give you an honest assessment than replace a battery unnecessarily. If you proceed with a replacement, the assessment fee is included in the total cost.',
  },
  {
    question: 'How long does MacBook Air battery replacement take?',
    answer:
      'Most MacBook Air battery replacements are completed within 2 to 4 hours. We carry cells for the M1, M2, M3, and Intel 13-inch Retina Air in stock at our Hyde Park workshop. For 11-inch models and older non-Retina 13-inch configurations, we confirm part availability at the time of booking — turnaround is typically 24 to 48 hours for those models. Walk-ins before 14:00 on weekdays can usually collect the same afternoon.',
  },
  {
    question: 'Will my MacBook Air battery replacement affect the "Service Recommended" message?',
    answer:
      'Yes. The "Service Recommended" message in the macOS battery menu bar is triggered by the battery management system based on cycle count and maximum capacity data stored in the battery controller chip (the SMC-accessible SMBus data). When we install a replacement battery, the new cell\'s chip reports fresh cycle count and capacity data, and macOS reads this correctly. The service message clears immediately after a calibration cycle — typically within the first full charge after replacement. True Tone and battery health optimisation features continue to work normally.',
  },
  {
    question: 'Does MacBook Air battery replacement affect my data or Apple Silicon activation?',
    answer:
      'No. A battery replacement on the MacBook Air does not touch the SSD, logic board, or Secure Enclave. Your data, applications, activation state, and Apple ID association are completely unaffected. The T2 chip on Intel Retina Air models and the M-series Secure Enclave on M1/M2/M3 models operate independently of the battery. We have never seen a battery replacement trigger an activation issue on any MacBook Air model.',
  },
  {
    question: 'Does the From R599 assessment policy apply to MacBook Air battery repairs?',
    answer:
      'Yes. If we assess your MacBook Air and conclude that the problem is not the battery — for instance, a charging IC fault on the logic board, a damaged MagSafe or USB-C board, or a software issue causing incorrect readings — you pay only the assessment fee (from R599) and your machine is returned exactly as received. We will never replace a battery that does not need replacing. If the battery is confirmed as the fault and you choose to proceed, the assessment fee is included in the replacement total.',
  },
];

/* ── Structured Data ─────────────────────────────────────────────────────── */
const faqSchema = buildFaqSchema(faqs);

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'MacBook Air Battery Replacement Johannesburg',
  description:
    'Professional MacBook Air battery replacement in Johannesburg from R1,499. All models including M1, M2, M3, and Intel Retina Air. Swollen battery removal, adhesive cell extraction, cycle count diagnostics. Hyde Park workshop. Assessment from R599. Up-to-3 year warranty.',
  provider: LOCAL_BUSINESS_PROVIDER,
  areaServed: [
    { '@type': 'City', name: 'Johannesburg' },
    { '@type': 'Neighborhood', name: 'Hyde Park' },
    { '@type': 'Neighborhood', name: 'Sandton' },
    { '@type': 'Neighborhood', name: 'Rosebank' },
    { '@type': 'Neighborhood', name: 'Bryanston' },
  ],
  serviceType: 'Battery Replacement',
  availableChannel: [
    { '@type': 'ServiceChannel', serviceUrl: 'https://wa.me/27645295863', serviceType: 'WhatsApp' },
    { '@type': 'ServiceChannel', servicePhone: '+27645295863', serviceType: 'Phone' },
  ],
  offers: {
    '@type': 'Offer',
    priceCurrency: 'ZAR',
    price: '1499',
    priceSpecification: {
      '@type': 'PriceSpecification',
      minPrice: '1499',
      priceCurrency: 'ZAR',
    },
  },
};

const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbSchemaItems);

/* ── Page Component ──────────────────────────────────────────────────────── */
export default function BatteryReplacementMacBookAirPage() {
  const whatsappUrl = buildWhatsAppUrl('BAT-AIR-HERO', 'battery');

  return (
    <>
      <SchemaOrg schema={faqSchema} />
      <SchemaOrg schema={serviceSchema} />
      <SchemaOrg schema={breadcrumbSchema} />

      <main className="bg-[#0A1A18] text-[#E8F4F1] min-h-screen">

        {/* ─── Breadcrumb ─────────────────────────────────────────────────── */}
        <div className="max-w-6xl mx-auto px-4 pt-4">
          <Breadcrumb items={[
            { label: 'Home', href: '/' },
            { label: 'Battery Replacement', href: '/battery-replacement' },
            { label: 'MacBook Air' },
          ]} />
        </div>

        {/* ─── Hero ───────────────────────────────────────────────────────── */}
        <section className="relative py-16 sm:py-24 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 text-[#0FEA7A] text-sm font-medium mb-4">
                <Battery className="w-4 h-4" />
                <span>MacBook Air Battery Specialists</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
                MacBook Air Battery<br />
                <span className="text-[#0FEA7A]">Replacement Johannesburg</span>
              </h1>
              <p className="text-lg sm:text-xl text-[#7A9E98] mb-4 speakable-summary">
                MacBook Air battery replacement from{' '}
                <strong className="text-[#E8F4F1]">R1,499</strong> at our Hyde Park workshop. We
                service every Air model — M1, M2, M3, and Intel — including adhesive-mounted cells, swollen
                batteries, and cycle-count-triggered replacements. The Apple Store charges{' '}
                <strong className="text-[#E8F4F1]">R2,500 to R5,500</strong> for the same service.
              </p>
              <p className="text-[#7A9E98] mb-8">
                Assessment from R599. From R599 assessment. Written warranty of up to 3 years. Same-day service
                available for all M-series and Intel Retina Air models.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] font-bold px-8 py-4 rounded-lg hover:bg-[#0dcc6a] transition-colors text-lg"
                >
                  <Zap className="w-5 h-5" />
                  WhatsApp for a Quote
                  <ArrowRight className="w-5 h-5" />
                </a>
                <a
                  href={`tel:${CONTACT.phoneTel}`}
                  className="inline-flex items-center justify-center gap-2 border border-[#27504D] text-[#E8F4F1] font-semibold px-8 py-4 rounded-lg hover:bg-[#27504D]/20 transition-colors text-lg"
                >
                  <Phone className="w-5 h-5" />
                  {CONTACT.phone}
                </a>
              </div>
              <div className="flex flex-wrap gap-6 mt-8 pt-6 border-t border-[rgba(255,255,255,0.06)]">
                {[
                  { value: 'R1,499', label: 'Starting Price' },
                  { value: '2–4 hrs', label: 'Typical Turnaround' },
                  { value: SITE.rating + '/5', label: SITE.reviewCount + ' Google Reviews' },
                  { value: 'Up to 3 Yrs', label: 'Written Warranty' },
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

        {/* ─── Trust Badges ───────────────────────────────────────────────── */}
        <section className="border-y border-[#27504D]/30 py-8 px-4">
          <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            {[
              { icon: Shield, label: 'Up-to-3 Year Warranty' },
              { icon: Clock, label: 'Same-Day Service' },
              { icon: CheckCircle, label: 'From R599 assessment' },
              { icon: MapPin, label: 'Hyde Park Workshop' },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex flex-col items-center gap-2">
                <Icon className="w-6 h-6 text-[#0FEA7A]" />
                <span className="text-sm font-semibold text-[#E8F4F1]">{label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ─── The MacBook Air Battery — Technical Context ─────────────────── */}
        <section className="py-16 sm:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-6">
              The MacBook Air Battery — What Makes It Different
            </h2>
            <div className="space-y-5 text-[#7A9E98] leading-relaxed">
              <p>
                The MacBook Air battery is particularly challenging to replace compared to MacBook Pro or iMac cells —
                and not just because of its size. From the 2018 Intel Retina model onwards, Apple bonded the lithium
                polymer cells directly to the aluminium lower case using stretch-release adhesive strips. The design
                keeps the battery firmly seated in an 11 to 16 mm chassis, but it means removal requires heat, the
                correct solvent, and a methodical extraction technique. Done incorrectly, the adhesive tabs snap,
                and the cells must be prised — a procedure that risks puncturing the cell wall and triggering a
                thermal event.
              </p>
              <p>
                In our Hyde Park workshop we have replaced hundreds of MacBook Air batteries across every generation.
                The most common scenario we see is a Johannesburg client arriving with a 2020 or 2022 Air that has
                accumulated 900 to 1,100 cycles in under two years — almost always attributable to load shedding. Every
                Eskom stage-4 slot that forces your Mac off mains and back again counts against your cycle budget. A
                battery Apple designed to last four years in normal use can be exhausted in 18 months in a household
                experiencing daily load shedding.
              </p>
              <p>
                There is also a meaningful technical difference between the M1 Air battery (49.9 Wh, A2337) and the
                M2 and M3 Air batteries (52.6 Wh, A2681 and A3113). The larger cell in the M2 and M3 contributes
                to their improved runtime, but it uses a slightly different adhesive chemistry — we stock the correct
                replacement and solvent for each generation rather than treating all Air batteries as interchangeable.
                The 2015 through 2017 non-Retina 13-inch Air (A1466), by contrast, uses a screwed-down battery
                assembly that is straightforward to remove, though parts are becoming increasingly scarce as that
                generation ages past a decade.
              </p>
              <p>
                One fault unique to the thin MacBook Air chassis is swelling. When a lithium cell begins to off-gas
                during degradation — typically after repeated deep discharge cycles — it expands. In a MacBook Pro
                this is a serious concern; in the Air, the thin chassis means the swelling battery has almost no
                clearance before it pushes against the trackpad cable, glass, and surrounding logic board components.
                If your MacBook Air trackpad feels raised, stiff, or non-responsive, or if the base of your machine
                no longer sits flat on a desk, bring it in immediately. We handle swollen Air batteries weekly, and
                we can tell you within a few minutes whether the battery is the cause.
              </p>
              <p>
                For clients who want to self-monitor: download{' '}
                <a
                  href="https://coconut-flavour.com/coconutbattery/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#0FEA7A] underline hover:no-underline"
                >
                  coconutBattery
                </a>{' '}
                — a free macOS utility that reads your cycle count, maximum capacity, and battery age in one clear
                interface. Apple\'s own System Information (About This Mac &gt; System Report &gt; Power) shows the same
                data but is harder to navigate. We recommend checking your Air battery health every three months if
                you experience regular load shedding.
              </p>
            </div>
          </div>
        </section>

        {/* ─── Warning Signs ──────────────────────────────────────────────── */}
        <section className="py-16 sm:py-20 px-4 bg-[#111C1A]">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">
              Signs Your MacBook Air Battery Needs Replacing
            </h2>
            <p className="text-[#7A9E98] mb-10 max-w-2xl">
              Some are urgent. Others give you time to plan. All of them are better addressed before you lose
              a machine to an unexpected shutdown mid-presentation in Sandton or a swollen cell damaging your trackpad.
            </p>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {warningSignsData.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className={`rounded-xl p-6 border ${severityColours[item.severity]}`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <Icon className="w-6 h-6 text-[#0FEA7A] flex-shrink-0 mt-0.5" />
                      <span
                        className={`text-xs font-bold px-2 py-1 rounded-full ml-3 ${severityBadgeColours[item.severity]}`}
                      >
                        {severityLabels[item.severity]}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-[#E8F4F1] mb-2">{item.title}</h3>
                    <p className="text-[#7A9E98] text-sm leading-relaxed">{item.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ─── Model Guide ────────────────────────────────────────────────── */}
        <section className="py-16 sm:py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">
              MacBook Air Battery by Model — Capacity, Cycles & Removal Notes
            </h2>
            <p className="text-[#7A9E98] mb-10 max-w-2xl">
              Battery capacity, rated cycle count, and removal complexity vary significantly across the Air range.
              Find your model below to understand what is involved.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-[#27504D]/40">
                    <th className="py-4 pr-4 text-[#7A9E98] font-semibold uppercase tracking-wider">Model</th>
                    <th className="py-4 pr-4 text-[#7A9E98] font-semibold uppercase tracking-wider hidden sm:table-cell">Code</th>
                    <th className="py-4 pr-4 text-[#7A9E98] font-semibold uppercase tracking-wider">Capacity</th>
                    <th className="py-4 pr-4 text-[#7A9E98] font-semibold uppercase tracking-wider hidden md:table-cell">Rated Cycles</th>
                    <th className="py-4 text-[#7A9E98] font-semibold uppercase tracking-wider hidden lg:table-cell">Removal Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {airBatteryModels.map((m) => (
                    <tr key={m.modelCode} className="border-b border-[#27504D]/20 hover:bg-[#27504D]/10 transition-colors">
                      <td className="py-4 pr-4 font-semibold text-[#E8F4F1]">{m.model}</td>
                      <td className="py-4 pr-4 text-[#7A9E98] font-mono text-xs hidden sm:table-cell">{m.modelCode}</td>
                      <td className="py-4 pr-4 text-[#0FEA7A] font-bold">{m.capacity}</td>
                      <td className="py-4 pr-4 text-[#7A9E98] hidden md:table-cell">{m.cycles}</td>
                      <td className="py-4 text-[#7A9E98] text-xs leading-relaxed hidden lg:table-cell max-w-xs">{m.removalNote}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ─── SA Context: Load Shedding ───────────────────────────────────── */}
        <section className="py-16 sm:py-20 px-4 bg-[#111C1A]">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-6">
              Why MacBook Air Batteries Fail Faster in Johannesburg
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-[#0A1A18] rounded-xl p-6 border border-[#27504D]/20">
                <div className="flex items-center gap-3 mb-4">
                  <BatteryWarning className="w-6 h-6 text-[#0FEA7A]" />
                  <h3 className="text-xl font-bold">Load Shedding Cycle Acceleration</h3>
                </div>
                <p className="text-[#7A9E98] leading-relaxed">
                  In our Hyde Park workshop, we have replaced more MacBook Air batteries in the past two years than in
                  the previous four combined — and load shedding is the single biggest factor. A Stage 4 slot
                  twice daily generates 60 or more additional cycles per month. Apple rates the Air battery for
                  1,000 cycles across roughly four years of normal use. With load shedding, we routinely see Johannesburg
                  clients hitting that threshold in 18 to 24 months. Suburbs like Randburg, Midrand, and Fourways — which
                  experienced particularly severe shedding schedules — are disproportionately represented in our
                  workshop intake.
                </p>
              </div>
              <div className="bg-[#0A1A18] rounded-xl p-6 border border-[#27504D]/20">
                <div className="flex items-center gap-3 mb-4">
                  <AlertTriangle className="w-6 h-6 text-[#0FEA7A]" />
                  <h3 className="text-xl font-bold">Heat & the Thin Air Chassis</h3>
                </div>
                <p className="text-[#7A9E98] leading-relaxed">
                  Johannesburg summers push ambient temperatures above 32°C, and the MacBook Air is a fanless design
                  on M1 through M3 — it dissipates heat entirely through the aluminium chassis. A machine working
                  hard on battery in a hot home office can sustain internal temperatures that accelerate lithium
                  degradation beyond what Apple&apos;s cycle rating assumes. We recommend keeping your Air above 20%
                  charge during load shedding slots and avoiding intensive workloads — video rendering, large
                  Xcode builds — while running exclusively on battery in warm conditions.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Our Process ────────────────────────────────────────────────── */}
        <section className="py-16 sm:py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-10">
              How MacBook Air Battery Replacement Works at ZA Support
            </h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {processSteps.map((s) => (
                <div key={s.step} className="bg-[#111C1A] rounded-xl p-6 border border-[#27504D]/20 relative">
                  <div className="absolute -top-3 -left-3 w-10 h-10 rounded-full bg-[#0FEA7A] text-[#0A1A18] flex items-center justify-center font-extrabold text-lg">
                    {s.step}
                  </div>
                  <h3 className="text-xl font-bold mt-4 mb-3">{s.title}</h3>
                  <p className="text-[#7A9E98] leading-relaxed text-sm">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Warranty & From R599 assessment ────────────────────────────────────── */}
        <section className="py-16 sm:py-20 px-4 bg-[#111C1A]">
          <div className="max-w-6xl mx-auto">
            <div className="bg-[#0A1A18] rounded-2xl p-8 sm:p-12 border border-[#27504D]/20">
              <div className="flex items-center gap-3 mb-6">
                <Shield className="w-8 h-8 text-[#0FEA7A]" />
                <h2 className="text-3xl sm:text-4xl font-extrabold">Warranty & From R599 assessment</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold mb-3 text-[#0FEA7A]">Up to 3-Year Written Warranty</h3>
                  <p className="text-[#7A9E98] leading-relaxed mb-4">
                    Every MacBook Air battery replacement at ZA Support includes a written warranty of up to 3 years.
                    This covers the battery cell and our workmanship. If your replacement battery drops below 80%
                    maximum capacity within the warranty period, or develops any other fault, we replace it again at
                    from R599 — parts and labour included.
                  </p>
                  <p className="text-[#7A9E98] leading-relaxed">
                    Most third-party repair shops in Sandton and Rosebank offer 90 days. The Apple Store offers
                    90 days on out-of-warranty replacements. We offer up to 3 years because we use premium-grade cells
                    and we stand behind every repair we perform.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-3 text-[#0FEA7A]">From R599 assessment — How It Works</h3>
                  <p className="text-[#7A9E98] leading-relaxed mb-4">
                    If we assess your MacBook Air and the problem is not the battery — for example, a faulty USB-C
                    charging board, a damaged MagSafe connector, or a{' '}
                    <Link href="/logic-board-repair" className="text-[#0FEA7A] underline hover:no-underline">
                      logic board fault
                    </Link>{' '}
                    causing incorrect SMC battery readings — you pay only the assessment fee (from R599) and your
                    machine is returned untouched.
                  </p>
                  <p className="text-[#7A9E98] leading-relaxed">
                    We diagnose the root cause before recommending any repair. If we confirm the battery is the issue
                    and you choose to proceed, the R599 assessment is included in the replacement cost — you do not
                    pay it twice.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── FAQs ───────────────────────────────────────────────────────── */}
        <section className="py-16 sm:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">
              MacBook Air Battery Replacement — Frequently Asked Questions
            </h2>
            <p className="text-[#7A9E98] mb-10">
              Questions we answer daily at our Hyde Park workshop. If yours is not here, WhatsApp us on{' '}
              <a href={`tel:${CONTACT.phoneTel}`} className="text-[#0FEA7A]">
                {CONTACT.phone}
              </a>
              .
            </p>
            <Suspense fallback={<div className="animate-pulse h-64 bg-[#111C1A] rounded-xl" />}>
              <FAQAccordion items={faqs} />
            </Suspense>
          </div>
        </section>

        {/* ─── Google Reviews ─────────────────────────────────────────────── */}
        <section className="py-16 sm:py-20 px-4 bg-[#111C1A]">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">What Our Clients Say</h2>
            <p className="text-[#7A9E98] mb-10">
              MacBook Air battery clients from Sandton, Rosebank, Bryanston, and across Johannesburg.
            </p>
            <Suspense fallback={<div className="animate-pulse h-48 bg-[#0A1A18] rounded-xl" />}>
              <GoogleReviews />
            </Suspense>
          </div>
        </section>

        {/* ─── Why ZA Support ─────────────────────────────────────────────── */}
        <section className="py-16 sm:py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-10">
              Why Johannesburg Chooses ZA Support for MacBook Air Batteries
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: 'Apple Store Charges R2,500–R5,500',
                  desc: 'An Apple Store or iStore MacBook Air battery replacement costs R2,500 on older models and up to R5,500 on current M-series machines. They also frequently quote two to five working days due to depot logistics. We start from R1,499 and complete most replacements the same day.',
                },
                {
                  title: `${SITE.yearsExperience}+ Years Repairing Macs`,
                  desc: 'ZA Support has been repairing Apple devices in Johannesburg since 2009. We have serviced every MacBook Air generation from the original 2008 model through to the current M3. That institutional knowledge means we know the failure patterns — and the traps — for each model.',
                },
                {
                  title: 'Adhesive Removal Without Puncture Risk',
                  desc: 'We have developed a documented extraction procedure for each Air generation\'s adhesive configuration. We use the correct solvent chemistry, controlled heat, and purpose-built spudgers to remove cells cleanly. We have never had a cell puncture in our workshop — a risk that is real with untrained hands or generic tools.',
                },
                {
                  title: 'Honest Battery Assessments',
                  desc: 'We will tell you if your battery does not need replacing yet. We see machines arrive where the owner was told by another shop that the battery needed replacement — and it did not. We would rather retain your trust with an honest assessment than take R1,499 for an unnecessary repair.',
                },
                {
                  title: 'Load Shedding Aftercare Advice',
                  desc: 'After every MacBook Air battery replacement, we advise on macOS Battery Health Management settings, UPS configuration, and optimal charge targets for load shedding environments. A new battery is only as good as the habits that protect it going forward.',
                },
                {
                  title: 'Central Hyde Park Location',
                  desc: `Our workshop is at ${CONTACT.address.full}. Five minutes from Rosebank, eight minutes from Sandton. We also offer collection across Johannesburg — WhatsApp us and we will arrange accordingly, including around load shedding schedules.`,
                },
              ].map((item) => (
                <div key={item.title} className="bg-[#111C1A] rounded-xl p-6 border border-[#27504D]/20">
                  <h3 className="text-lg font-bold mb-3">{item.title}</h3>
                  <p className="text-[#7A9E98] leading-relaxed text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Related Services ───────────────────────────────────────────── */}
        <section className="py-16 sm:py-20 px-4 bg-[#111C1A]">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-8">Related Repairs & Services</h2>
            <p className="text-[#7A9E98] mb-8 max-w-2xl">
              Battery issues on a MacBook Air can overlap with charging board faults, logic board problems, and
              screen damage. We diagnose everything in one visit.
            </p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  title: 'Battery Replacement Hub',
                  href: '/battery-replacement',
                  desc: 'All devices — MacBook Pro, iPhone, iPad pricing and information',
                },
                {
                  title: 'Logic Board Repair',
                  href: '/logic-board-repair',
                  desc: 'Component-level board repair for no-power, USB-C, and charging IC faults',
                },
                {
                  title: 'MacBook Air Screen Repair',
                  href: '/screen-repair/macbook-air',
                  desc: 'Cracked Liquid Retina panels, backlight failure, flex cable faults',
                },
                {
                  title: 'Battery Replacement — Sandton',
                  href: '/battery-replacement/sandton',
                  desc: 'MacBook Air battery replacement with same-day collection from Sandton',
                },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="bg-[#0A1A18] rounded-xl p-6 border border-[#27504D]/20 hover:border-[#0FEA7A]/40 transition-colors group"
                >
                  <h3 className="text-lg font-bold mb-2 group-hover:text-[#0FEA7A] transition-colors">
                    {link.title}
                  </h3>
                  <p className="text-sm text-[#7A9E98]">{link.desc}</p>
                  <ArrowRight className="w-4 h-4 text-[#0FEA7A] mt-3" />
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Final CTA ──────────────────────────────────────────────────── */}
        <section className="py-16 sm:py-24 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Battery className="w-12 h-12 text-[#0FEA7A] mx-auto mb-6" />
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">
              Ready to Replace Your MacBook Air Battery?
            </h2>
            <p className="text-[#7A9E98] mb-8 text-lg leading-relaxed">
              Walk in to our Hyde Park workshop, or WhatsApp us now for a quote. Same-day service available for M1,
              M2, M3, and Intel Retina MacBook Air. Assessment from R599. From R599 assessment. Up-to-3 year warranty.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] font-bold px-10 py-4 rounded-lg hover:bg-[#0dcc6a] transition-colors text-lg"
              >
                <Zap className="w-5 h-5" />
                WhatsApp for a Quote
              </a>
              <a
                href={`tel:${CONTACT.phoneTel}`}
                className="inline-flex items-center justify-center gap-2 border border-[#27504D] text-[#E8F4F1] font-semibold px-10 py-4 rounded-lg hover:bg-[#27504D]/20 transition-colors text-lg"
              >
                <Phone className="w-5 h-5" />
                Call {CONTACT.phone}
              </a>
            </div>
            <p className="text-[#7A9E98] text-sm mt-6">
              <MapPin className="w-4 h-4 inline-block text-[#0FEA7A] mr-1" />
              {CONTACT.address.full} | Battery replacement from R1,499 | Collection across Johannesburg
            </p>
          </div>
        </section>
      <section className="py-12 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <PricingRange page="/battery-replacement/macbook-air" />
          <PricingNote />
        </div>
      </section>


      </main>
    </>
  );
}
