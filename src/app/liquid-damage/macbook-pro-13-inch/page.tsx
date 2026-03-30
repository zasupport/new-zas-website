import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, CheckCircle, ArrowRight, Shield, MapPin, Droplets, AlertTriangle, Cpu, Zap } from 'lucide-react';
import SchemaOrg from '@/components/seo/SchemaOrg';
import { buildFaqSchema, buildServiceSchema, buildBreadcrumbSchema } from '@/lib/schema';
import FAQAccordion from '@/components/ui/FAQ';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { CONTACT, SITE, buildWhatsAppUrl } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'MacBook Pro 13 Inch Liquid Damage Repair Johannesburg [2026] | From R599 | ZA Support',
  description:
    'MacBook Pro 13-inch liquid damage repair Johannesburg. M1, M2 & Intel models. Touch Bar corrosion, USB-C controller recovery. Assessment from R599. No Fix No Fee. Hyde Park.',
  alternates: { canonical: 'https://zasupport.com/liquid-damage/macbook-pro-13-inch' },
  keywords: [
    'MacBook Pro 13 inch liquid damage repair Johannesburg',
    'MacBook Pro 13 water damage repair',
    'MacBook Pro 13 M1 M2 spill repair Johannesburg',
    'MacBook Pro 13 corrosion repair Hyde Park',
    'liquid damaged MacBook Pro 13 fix',
    'MacBook Pro 13 Touch Bar liquid damage',
    'MacBook Pro 13 coffee spill repair Johannesburg',
    'MacBook Pro 13 liquid damage assessment from R599',
    'MacBook Pro 13 M2 liquid damage repair',
    'MacBook Pro 13 Intel liquid damage Johannesburg',
  ],
};

const breadcrumbItems = [
  { label: 'Liquid Damage', href: '/liquid-damage' },
  { label: 'MacBook Pro', href: '/liquid-damage/macbook-pro' },
  { label: '13-Inch' },
];

const breadcrumbSchemaItems = [
  { name: 'Home', url: 'https://zasupport.com' },
  { name: 'Liquid Damage', url: 'https://zasupport.com/liquid-damage' },
  { name: 'MacBook Pro', url: 'https://zasupport.com/liquid-damage/macbook-pro' },
  { name: 'MacBook Pro 13-Inch', url: 'https://zasupport.com/liquid-damage/macbook-pro-13-inch' },
];

const faqs = [
  {
    question: 'Can a liquid-damaged MacBook Pro 13-inch be repaired?',
    answer:
      'Yes, in most cases. The MacBook Pro 13-inch — covering Intel models (2016 to 2020), the M1 (2020), and the M2 (2022) — uses a compact logic board layout that concentrates components tightly. This makes liquid damage more acute than on the larger 14-inch or 16-inch models, but it does not make the machine unrepairable. At our Hyde Park workshop we have recovered many 13-inch MacBook Pros from full keyboard spills, coffee, and water ingress. Assessment from R599, No Fix No Fee.',
  },
  {
    question: 'My MacBook Pro 13-inch will not turn on after a spill — is it repairable?',
    answer:
      'Very likely yes. No-power conditions on the 13-inch MacBook Pro after liquid exposure almost always point to the SMC power management IC or the USB-C charging controllers — not the CPU or Apple Silicon SoC, which are the most physically protected components on the board. The M1 and M2 models use a pair of USB-C controllers on the left side that we see fail first. Our R599 assessment identifies exactly which IC or trace is responsible before we quote anything.',
  },
  {
    question: 'How does liquid damage differ between the M2, M1, and Intel MacBook Pro 13-inch?',
    answer:
      'The M2 (A2338, 2022) and M1 (A2338, 2020) boards are physically identical in chassis layout but differ in chip architecture. M2 boards use a 5nm process with tighter NAND voltage tolerances, making storage controller failure slightly more common than on M1. Intel models (A2251, A2289, A2159) carry a discrete T2 security chip in addition to the main Intel CPU — when liquid reaches the T2, it can trigger persistent activation lock states even after the board is cleaned. We handle T2-related liquid damage diagnosis as part of every Intel assessment.',
  },
  {
    question: 'The Touch Bar on my MacBook Pro 13-inch stopped working after a spill — is it repairable?',
    answer:
      'Yes. The Touch Bar runs on a dedicated flex cable connected to the T2 chip (Intel models) or the M1/M2 SoC interface. Liquid entering the keyboard well on a 13-inch MacBook Pro commonly tracks along this cable and deposits corrosive residue on the Touch Bar connector. We clean the connector and cable during every 13-inch liquid damage assessment. If the Touch Bar ribbon cable itself is damaged, we replace it — it is not part of the logic board and does not require board-level repair.',
  },
  {
    question: 'How much does MacBook Pro 13-inch liquid damage repair cost?',
    answer:
      'Cost varies by model generation and extent of damage. A USB-C controller replacement on an M1 or M2 13-inch is one of the more contained repairs. Intel models with T2 corrosion or multiple IC failures require more diagnostic time. M2 models with NAND controller contamination take longer still. All repairs are quoted in writing before work starts. Assessment from R599. No Fix No Fee applies across all 13-inch MacBook Pro generations.',
  },
  {
    question: 'Can you recover data from a water-damaged MacBook Pro 13-inch?',
    answer:
      'Yes, in most cases. All 13-inch MacBook Pro models store data on soldered NAND flash. The M1 and M2 models encrypt NAND with a hardware key embedded in the SoC — this means data recovery requires the original board to be operational, unlike older Intel machines where NAND could sometimes be read independently. We focus on recovering board function rather than reading NAND in isolation. Even when a board appears completely dead, we routinely restore power by repairing the charging subsystem, allowing data to be copied off normally.',
  },
  {
    question: 'How long does MacBook Pro 13-inch liquid damage repair take?',
    answer:
      'Assessment is completed within 24 hours of receiving your machine. USB-C controller or Touch Bar cable repairs take 24-48 hours. Full ultrasonic cleaning with component-level IC work takes 48-72 hours. Intel models with T2 involvement or M2 boards with NAND controller damage may take 72-96 hours. We confirm the exact timeline in the written quote before starting any work.',
  },
  {
    question: 'Why is the 13-inch MacBook Pro more vulnerable to spills than larger models?',
    answer:
      'The 13-inch chassis is considerably thinner than the 14-inch or 16-inch MacBook Pro. Apple achieved this by reducing the vertical clearance between the keyboard assembly and the logic board to under 2mm in some areas. In our Hyde Park workshop we have measured this gap on both M1 and M2 13-inch boards. The practical consequence is that any liquid entering through the keyboard reaches the board faster, and the board surface area is smaller — meaning a spill that would be localised on a 16-inch board covers a proportionally larger percentage of the 13-inch board.',
  },
  {
    question: 'Does AppleCare+ cover liquid damage on the MacBook Pro 13-inch?',
    answer:
      'Standard AppleCare does not cover liquid damage. AppleCare+ includes up to two accidental damage claims per year with an incident fee of approximately R2,500 to R4,500 for a MacBook Pro. Apple replaces the entire logic board — not just the affected components. A replacement M2 MacBook Pro 13-inch logic board from Apple costs between R20,000 and R35,000. ZA Support repairs only the failed components, preserving your data and your machine\'s original serial number.',
  },
  {
    question: 'Do you collect MacBook Pro 13-inch machines from across Johannesburg?',
    answer:
      'Yes. We collect from Sandton, Rosebank, Fourways, Bryanston, Midrand, Randburg, Kempton Park, Morningside, and all surrounding suburbs. For liquid damage, speed is critical — call 064 529 5863 for same-day collection. We also serve Pretoria and Centurion.',
  },
  {
    question: 'Is it worth repairing a liquid-damaged MacBook Pro 13-inch?',
    answer:
      'In nearly every case, yes. A new MacBook Pro 13-inch M2 retails from R22,000 to R30,000 in South Africa. Our component-level repairs are a fraction of that cost, and you keep your data, your installed software, and your machine\'s serial number — none of which survive an Apple board swap. If repair genuinely is not economical, we tell you honestly during the assessment with no obligation beyond the R599 fee.',
  },
];

const failurePoints = [
  {
    title: 'USB-C Charging Controller Pair (Left Side)',
    desc: 'The M1 and M2 MacBook Pro 13-inch carry two Thunderbolt / USB-C controllers on the left side of the logic board. Liquid entering the left USB-C port or the adjacent speaker grille corrodes these controllers first — we see this in roughly 60% of 13-inch liquid damage cases. The controllers are individually replaceable. The USB-C port pins themselves are cleaned separately, and we test each charging path at the correct wattage before the machine leaves our workshop.',
    severity: 'high',
  },
  {
    title: 'T2 Security Chip Corrosion (Intel Models)',
    desc: 'Intel MacBook Pro 13-inch models (2016-2020) carry Apple\'s T2 security chip alongside the main Intel CPU. The T2 handles the Secure Enclave, Touch Bar control, and the system\'s activation state. Liquid contamination on the T2 can produce a persistent "Remote Management" or activation lock screen that blocks use entirely — even after physical repair. We diagnose T2-related faults specifically and have recovery procedures that restore normal boot state without data loss.',
    severity: 'high',
  },
  {
    title: 'Touch Bar Flex Cable and Connector',
    desc: 'The Touch Bar runs on a thin flex cable that routes from the top of the display assembly along the left hinge and connects to the logic board near the USB-C controller cluster. Liquid entering the keyboard well on a 13-inch MacBook Pro deposits along this route. The flex connector pads corrode at a different rate to PCB pads — we have seen Touch Bar failures appear 48 to 72 hours after a spill when the machine initially appeared functional. The flex cable is replaced if cleaning does not fully restore function.',
    severity: 'medium',
  },
  {
    title: 'NAND Controller Voltage Contamination (M2)',
    desc: 'The M2 MacBook Pro 13-inch stores data on NAND flash with a tighter storage bus voltage tolerance than the M1. A contaminated SSD power rail on an M2 board can corrupt the NAND controller\'s firmware state before the machine even shows symptoms. We test every storage power rail with a bench power supply before attempting board power-on after liquid exposure — standard practice at our workshop since we first handled M2 boards in 2022.',
    severity: 'high',
  },
  {
    title: 'Headphone Jack and Right-Side Audio Circuit',
    desc: 'The MacBook Pro 13-inch has a 3.5mm headphone jack on the right side, with an associated audio codec IC on the board. Right-side spills — common from drinks placed to the right of the machine — track liquid directly to this circuit. We see audio codec failure present as no sound output, persistent static, or the machine incorrectly detecting headphones when none are plugged in. The codec IC is individually replaceable.',
    severity: 'medium',
  },
  {
    title: 'SMC Power Management and Battery Circuit',
    desc: 'All MacBook Pro 13-inch models use an SMC (System Management Controller) to govern charging, thermal management, and power delivery. On M1 and M2 boards, SMC functions are integrated into the Apple Silicon die — contamination near the power management area can produce complex fault states including no-charge, instant shutdown, or incorrect battery percentage. We isolate these faults using a programmable bench power supply before any attempt at board power-on.',
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
  high: 'Critical',
  medium: 'Moderate',
  low: 'Repairable',
};

const faqSchema = buildFaqSchema(faqs);
const serviceSchema = buildServiceSchema({
  name: 'MacBook Pro 13-Inch Liquid Damage Repair Johannesburg',
  description:
    'Professional MacBook Pro 13-inch liquid damage repair in Johannesburg. M1, M2 and Intel models. Touch Bar corrosion recovery, USB-C controller replacement, T2 security chip diagnosis, ultrasonic cleaning. Assessment from R599. Up-to-3 year warranty.',
});
const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbSchemaItems);

export default function MacBookPro13InchLiquidDamagePage() {
  const whatsappUrl = buildWhatsAppUrl('LIQ-MBP13-HERO', 'liquid-damage');

  return (
    <>
      <SchemaOrg schema={faqSchema} />
      <SchemaOrg schema={serviceSchema} />
      <SchemaOrg schema={breadcrumbSchema} />

      {/* Hero */}
      <section className="hero-gradient grid-overlay pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={breadcrumbItems} />
          <div className="mt-8 max-w-4xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#E8F4F1] leading-tight mb-6">
              MacBook Pro 13-Inch Liquid Damage
              <br /><span className="text-[#0FEA7A]">Repair Johannesburg</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-4 max-w-3xl leading-relaxed">
              The MacBook Pro 13-inch packs its logic board into Apple&apos;s thinnest MacBook Pro chassis — leaving less than 2mm between the keyboard and the board in places. When liquid enters, it reaches the board faster than on any other MacBook Pro. We have recovered M1, M2, and Intel 13-inch models from everything from a single coffee splash to full submersion.
            </p>
            <div className="flex items-center gap-2 text-[#7A9E98] text-sm mb-8">
              <MapPin className="w-4 h-4 text-[#0FEA7A]" />
              <span>1 Hyde Lane, Hyde Park, Office E2004, JHB 2196 | Assessment from R599 | Collection across Johannesburg</span>
            </div>
            <div className="flex flex-wrap gap-3 mb-8">
              {[
                { icon: Shield, label: 'No Fix No Fee' },
                { icon: Droplets, label: 'Ultrasonic Cleaning' },
                { icon: Cpu, label: 'M1 / M2 / Intel' },
                { icon: CheckCircle, label: 'Up to 3 Year Warranty' },
                { icon: Zap, label: 'Assessment from R599' },
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
                WhatsApp for Urgent Help
              </a>
              <a
                href={`tel:${CONTACT.phoneTel}`}
                className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all"
              >
                <Phone className="w-5 h-5" /> Call {CONTACT.phone}
              </a>
              <Link
                href="/liquid-damage"
                className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.2)] text-[#7A9E98] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[rgba(15,234,122,0.05)] transition-all"
              >
                All Liquid Damage <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
            <div className="flex flex-wrap gap-6 mt-8 pt-6 border-t border-[rgba(255,255,255,0.06)]">
              {[
                { value: '500+', label: 'Liquid Damage Recoveries' },
                { value: SITE.yearsExperience + ' Years', label: 'In Business Since 2009' },
                { value: SITE.rating + '/5', label: SITE.reviewCount + ' Google Reviews' },
                { value: 'Covered', label: 'Up-to-3 Year Warranty' },
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

      {/* Why 13-Inch Is Different */}
      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4">
            Why MacBook Pro 13-Inch Liquid Damage Is More Time-Critical
          </h2>
          <div className="space-y-4 text-[#7A9E98] leading-relaxed mb-8">
            <p>
              In our Hyde Park workshop, the MacBook Pro 13-inch is one of the most frequently presented liquid damage machines — and one of the most time-sensitive. The chassis spans models from 2016 through to the M2 generation of 2022, sharing a design philosophy of extreme thinness. Apple achieved those dimensions by reducing clearance between the keyboard deck and the logic board to areas where liquid travels in under a second.
            </p>
            <p>
              The model identifiers we see most frequently are A2338 (M1 and M2, the last-generation 13-inch), A2251 (Intel 2020, four Thunderbolt 3 ports), and A2289 (Intel 2020, two Thunderbolt 3 ports). Each has a distinct board layout, but all three share one vulnerability: the keyboard spill path leads directly to the USB-C controller cluster or the T2 security chip within seconds of exposure. The M2 variant adds a further complication — NAND voltage tolerance is tighter on 5nm silicon than on the 7nm Intel boards, meaning contaminated SSD power rails cause storage faults faster.
            </p>
            <p>
              The Touch Bar, present on every 13-inch MacBook Pro from 2016 to 2022, introduces a liquid damage path that the 14-inch and 16-inch MacBook Pros with traditional function keys do not have. The Touch Bar flex cable runs from the top case down the left hinge column and terminates at a connector near the USB-C controller cluster. Liquid that enters the keyboard and tracks left — which is where most right-handed users place drinks — reaches both the USB-C ICs and the Touch Bar connector simultaneously. We have seen 13-inch machines present with the Touch Bar still functional immediately after a spill, only for it to fail 48 hours later as slow-developing corrosion reached the connector pads.
            </p>
            <p>
              Intel 13-inch models carry the T2 security chip, which handles Touch ID, Secure Enclave operations, and the machine&apos;s activation state. When liquid reaches the T2, the machine can enter a persistent &quot;Remote Management&quot; or locked state that looks like software but is actually a hardware fault. We have developed specific diagnostic and recovery procedures for T2 liquid damage, and we include T2 assessment in every Intel 13-inch diagnostic at no additional charge.
            </p>
            <p>
              None of this means your 13-inch MacBook Pro is beyond repair. It means that repair quality depends heavily on speed — boards brought to us within 24 hours have a substantially higher recovery rate than those left for days — and on component-level diagnosis rather than board replacement. We have been repairing MacBook Pro 13-inch liquid damage since the 2016 Touch Bar models first arrived in Johannesburg. According to Apple&apos;s own documentation, the M1 and M2 share the same A2338 chassis, making our repair tooling fully compatible across both generations.
            </p>
          </div>
          <a
            href="https://support.apple.com/en-gb/111893"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#0FEA7A] text-sm underline underline-offset-2 hover:text-[#0FEA7A]/80 transition-colors"
          >
            Apple MacBook Pro 13-inch (M2) technical specifications ↗
          </a>
        </div>
      </section>

      {/* Failure Points */}
      <section className="py-10 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4">
            MacBook Pro 13-Inch Liquid Damage Failure Points
          </h2>
          <p className="text-[#7A9E98] mb-10 max-w-3xl leading-relaxed">
            Based on our repair data across M1, M2, and Intel 13-inch MacBook Pro liquid damage cases, these are the most common failure patterns. Each is individually diagnosed and repaired at component level — we do not replace entire logic boards unless every other option is exhausted.
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {failurePoints.map((item) => (
              <div key={item.title} className={`rounded-2xl border p-6 ${severityColours[item.severity]}`}>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <h3 className="text-[#E8F4F1] font-bold text-lg">{item.title}</h3>
                  <span className={`flex-shrink-0 text-xs font-semibold px-2.5 py-1 rounded-full ${severityBadgeColours[item.severity]}`}>
                    {severityLabels[item.severity]}
                  </span>
                </div>
                <p className="text-[#7A9E98] text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 p-5 rounded-xl border border-[rgba(15,234,122,0.15)] bg-[rgba(15,234,122,0.04)] flex items-start gap-4">
            <Shield className="w-5 h-5 text-[#0FEA7A] flex-shrink-0 mt-0.5" />
            <p className="text-[#7A9E98] text-sm leading-relaxed">
              All repairs are quoted before work begins. No Fix No Fee on every 13-inch case — if we cannot repair your MacBook Pro, an assessment fee of R599 applies and the machine is returned as received. Up-to-3 year written warranty on all completed repairs.
            </p>
          </div>
        </div>
      </section>

      {/* Apple vs ZA Support */}
      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-4">
            Apple vs ZA Support: 13-Inch Liquid Damage Repair
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            <div className="glass-card p-6 border border-red-500/20">
              <h3 className="text-red-400 font-bold mb-3">Apple Store / iStore</h3>
              <ul className="text-[#7A9E98] text-sm space-y-2">
                <li>Full logic board replacement — R20,000 to R35,000</li>
                <li>Liquid damage excluded from standard AppleCare</li>
                <li>AppleCare+ incident fee approximately R2,500 to R4,500</li>
                <li>Data may not survive board replacement</li>
                <li>5-10 business days via Apple depot repair</li>
                <li>Intel models may be deemed out of repair scope</li>
              </ul>
            </div>
            <div className="glass-card p-6 border border-[rgba(15,234,122,0.3)]">
              <h3 className="text-[#0FEA7A] font-bold mb-3">ZA Support</h3>
              <ul className="text-[#7A9E98] text-sm space-y-2">
                <li>Component-level repair — only failed parts replaced</li>
                <li>Assessment from R599, repair quoted individually</li>
                <li>Data preserved on the same logic board</li>
                <li>M1, M2, and Intel 13-inch all supported</li>
                <li>Turnaround 24-72 hours, up-to-3 year warranty</li>
                <li>Touch Bar flex and T2 chip diagnosis included</li>
              </ul>
            </div>
          </div>
          <p className="text-[#7A9E98] text-sm leading-relaxed">
            Load shedding is a regular complication we see with Johannesburg MacBook Pro 13-inch liquid damage cases. The 13-inch charges exclusively via USB-C — there is no MagSafe on the M1 or M2 model. Machines left plugged in during a stage outage, where power cuts and reconnects briefly, experience voltage transitions on the USB-C charging rail. If any liquid contamination is present on the USB-C controller circuit at the time, that voltage transition accelerates corrosion measurably. If your machine was connected to power during load shedding after a spill, mention it when you contact us — it affects our diagnostic sequence.
          </p>
        </div>
      </section>

      {/* Emergency Steps */}
      <section className="py-10 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle className="w-6 h-6 text-[#F5A623]" />
            <p className="text-[#F5A623] text-sm font-semibold uppercase tracking-wider">13-Inch Emergency Guide</p>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4">
            Spilled Liquid on Your MacBook Pro 13-Inch?
          </h2>
          <p className="text-[#7A9E98] leading-relaxed mb-10">
            The 13-inch chassis gives liquid the shortest path to the logic board of any MacBook Pro. These steps apply to all 13-inch models: Intel A2251, A2289, A2159, and Apple Silicon A2338 (M1 and M2).
          </p>
          <div className="space-y-5">
            {[
              {
                step: '1',
                title: 'Force power off — hold Touch ID or Touch Bar power button for 10 seconds',
                detail: 'Do not attempt a normal shutdown. In sleep mode, the SoC and storage controller draw continuous power. Force power-off removes voltage from corroding traces immediately. On the 13-inch, the board is so close to the keyboard that this step needs to happen within the first 30 seconds of a spill for maximum effect.',
                urgent: true,
              },
              {
                step: '2',
                title: 'Disconnect both USB-C cables immediately',
                detail: 'The MacBook Pro 13-inch M1 and M2 charge exclusively via USB-C — there is no MagSafe. Any connected USB-C cable (for charging or peripherals) keeps the USB-C controller ICs powered. These are precisely the ICs most vulnerable to liquid on the 13-inch board. Disconnect everything before flipping the machine.',
                urgent: true,
              },
              {
                step: '3',
                title: 'Flip keyboard-down on a dry surface',
                detail: 'The 13-inch logic board sits directly below the keyboard. Inverting the machine immediately lets liquid drain away from the board surface. Hold it inverted — do not lay it flat again — and rest it on a clean, dry cloth for at least 15 minutes.',
                urgent: false,
              },
              {
                step: '4',
                title: 'Do not use rice, silica gel, or a hairdryer',
                detail: 'Rice absorbs atmospheric moisture, not corrosive residue already on PCB traces. A hairdryer drives moisture deeper into the Touch Bar flex connector and BGA pad connections. Neither stops active corrosion. The 13-inch chassis has no drainage path — any heat applied from the outside simply redistributes liquid internally.',
                urgent: true,
              },
              {
                step: '5',
                title: 'Do not power on to test if it still works',
                detail: 'This is the single most damaging thing you can do to a liquid-exposed 13-inch MacBook Pro. Powering on drives current through contaminated traces, electrolyses the contaminant into copper-eating oxides within seconds, and can turn a cleanable USB-C controller fault into an unrepairable board failure. The 13-inch board is small — damage propagates faster than on larger models.',
                urgent: true,
              },
              {
                step: '6',
                title: 'Contact ZA Support within 24 hours — 064 529 5863',
                detail: '13-inch board recovery rates drop significantly after 48 hours, particularly on M2 models where NAND voltage tolerance is tighter. We offer same-day collection across Johannesburg including Sandton, Fourways, Rosebank, Bryanston, and Midrand. Call or WhatsApp 064 529 5863 now.',
                urgent: false,
              },
            ].map((item) => (
              <div
                key={item.step}
                className={`flex gap-5 p-6 rounded-2xl border ${item.urgent ? 'border-[rgba(245,87,54,0.25)] bg-[rgba(245,87,54,0.04)]' : 'border-[rgba(15,234,122,0.15)] bg-[rgba(15,234,122,0.03)]'}`}
              >
                <div
                  className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-sm font-extrabold ${item.urgent ? 'bg-[rgba(245,87,54,0.15)] text-[#F55736]' : 'bg-[rgba(15,234,122,0.12)] text-[#0FEA7A]'}`}
                >
                  {item.step}
                </div>
                <div>
                  <h3 className="text-[#E8F4F1] font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-[#7A9E98] leading-relaxed text-sm">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQAccordion items={faqs} title="MacBook Pro 13-Inch Liquid Damage — Common Questions" />
        </div>
      </section>

      {/* Related Services */}
      <section className="py-8 sm:py-16 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#E8F4F1] mb-6">Related Repairs</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              { label: 'All Liquid Damage', href: '/liquid-damage' },
              { label: 'MacBook Pro Liquid Damage', href: '/liquid-damage/macbook-pro' },
              { label: 'MacBook Pro M1 Liquid Damage', href: '/liquid-damage/macbook-pro-m1' },
              { label: 'MacBook Pro M2 Liquid Damage', href: '/liquid-damage/macbook-pro-m2' },
              { label: 'MacBook Pro M3 Liquid Damage', href: '/liquid-damage/macbook-pro-m3' },
              { label: 'Logic Board Hub', href: '/logic-board-repair' },
              { label: 'MacBook Air Liquid Damage', href: '/liquid-damage/macbook-air' },
              { label: 'Contact Us', href: '/contact' },
            ].map((link) => (
              <Link key={link.href} href={link.href} className="glass-card p-4 text-center group">
                <span className="text-[#E8F4F1] text-sm font-semibold group-hover:text-[#0FEA7A] transition-colors">
                  {link.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-8 sm:py-16 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-[rgba(39,80,77,0.3)] border border-[rgba(15,234,122,0.2)] rounded-3xl p-10">
            <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3">
              MacBook Pro 13-Inch Liquid Damage? Every Minute Counts.
            </h2>
            <p className="text-[#7A9E98] mb-6 max-w-xl mx-auto leading-relaxed">
              The 13-inch chassis gives liquid the fastest path to the logic board of any MacBook Pro. WhatsApp us now for immediate guidance and same-day collection across Johannesburg. M1, M2, and Intel models. Assessment from R599. No Fix No Fee.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 hover:shadow-[0_0_32px_rgba(15,234,122,0.4)] transition-all"
              >
                WhatsApp for Urgent Help
              </a>
              <a
                href={`tel:${CONTACT.phoneTel}`}
                className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all"
              >
                <Phone className="w-5 h-5" /> Call {CONTACT.phone}
              </a>
            </div>
            <p className="text-[#7A9E98] text-xs mt-6">
              1 Hyde Lane, Hyde Park, Office E2004, JHB 2196 | Assessment from R599 | Up-to-3 year warranty
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
