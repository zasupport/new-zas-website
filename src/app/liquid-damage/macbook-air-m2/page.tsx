import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, CheckCircle, ArrowRight, Shield, MapPin, Droplets, AlertTriangle, Cpu, Zap, Wind } from 'lucide-react';
import SchemaOrg from '@/components/seo/SchemaOrg';
import { buildFaqSchema, buildServiceSchema, buildBreadcrumbSchema } from '@/lib/schema';
import FAQAccordion from '@/components/ui/FAQ';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { CONTACT, SITE, buildWhatsAppUrl } from '@/lib/constants';
import PricingNote from '@/components/PricingNote';
import PricingRange from '@/components/PricingRange';

export const metadata: Metadata = {
  title: 'MacBook Air M2 Liquid Damage Repair Johannesburg [2026] | From R599 | ZA Support',
  description:
    'MacBook Air M2 liquid damage repair Johannesburg. Thinnest Air ever at 11.3mm — liquid hits the board in seconds. MagSafe 3 corrosion specialist. Assessment from R599. Hyde Park workshop.',
  alternates: { canonical: 'https://zasupport.com/liquid-damage/macbook-air-m2' },
  keywords: [
    'MacBook Air M2 liquid damage repair Johannesburg',
    'MacBook Air M2 water damage repair',
    'M2 MacBook Air spill repair Johannesburg',
    'MacBook Air M2 corrosion repair Hyde Park',
    'liquid damaged MacBook Air M2 fix',
    'MacBook Air M2 coffee spill repair Johannesburg',
    'MacBook Air M2 MagSafe corrosion repair',
    'MacBook Air M2 liquid damage assessment from R599',
  ],
};

const breadcrumbItems = [
  { label: 'Liquid Damage', href: '/liquid-damage' },
  { label: 'MacBook Air M2' },
];

const breadcrumbSchemaItems = [
  { name: 'Home', url: 'https://zasupport.com' },
  { name: 'Liquid Damage', url: 'https://zasupport.com/liquid-damage' },
  { name: 'MacBook Air M2', url: 'https://zasupport.com/liquid-damage/macbook-air-m2' },
];

const faqs = [
  {
    question: 'Can a liquid-damaged MacBook Air M2 be repaired?',
    answer:
      'Yes, in the majority of cases. The MacBook Air M2 (A2681) shares the M1\'s fanless design but introduces a completely flat chassis only 11.3mm thick — the thinnest MacBook Air ever made at launch. That thinness means liquid reaches the logic board almost instantly, but our component-level repair process addresses exactly these concentrated damage patterns. At ZA Support in Hyde Park, we have successfully recovered MacBook Air M2 units after serious spills including coffee, wine, and water. Assessment from R599.',
  },
  {
    question: 'How does the M2 chip design affect liquid damage outcomes?',
    answer:
      'The M2 chip is manufactured on TSMC\'s 4nm N4 process — a full generation smaller than the M1\'s 5nm process. This means tighter transistor spacing and more sensitive circuitry. Liquid contamination on the M2 die or its surrounding power delivery network causes more immediate functional damage than on the M1. However, the M2\'s integrated memory architecture also means that if the memory controllers remain intact, data recovery rates are very high even when the CPU cores are damaged.',
  },
  {
    question: 'How much does MacBook Air M2 liquid damage repair cost?',
    answer:
      'Repair cost depends entirely on the extent of damage confirmed during assessment. Keyboard or trackpad replacement where no liquid reached the logic board is the most affordable outcome. Minor board corrosion requiring ultrasonic cleaning and targeted component rework costs more. Extensive multi-IC corrosion — particularly around the MagSafe 3 controller or the USB 4 interface chips — represents the most complex cases. We quote everything upfront before a single repair action. Assessment from R599. No Fix No Fee on every case.',
  },
  {
    question: 'My MacBook Air M2 got wet but is still working — should I be worried?',
    answer:
      'Yes, absolutely. This is the most dangerous scenario we deal with. The MacBook Air M2 logic board uses flux residue and conformal layers that can temporarily insulate liquid residue from active circuits, making the machine appear functional for days or even a week after the spill. All the while, corrosion is progressing invisibly beneath the residue layer. We regularly see M2 Airs that "worked fine" after a spill, then died suddenly. A preventative ultrasonic clean at this stage costs a fraction of what emergency board repair costs later.',
  },
  {
    question: 'Why is the MacBook Air M2 chassis thickness a problem for liquid damage?',
    answer:
      'The MacBook Air M2 redesign introduced a completely flat profile at just 11.3mm — compared to the M1\'s 15.6mm wedge shape. This is 27% thinner. The internal stack — keyboard, speaker cables, battery, and logic board — is compressed into that 11.3mm. In our workshop, we have measured the gap between the keyboard underside and the top of the logic board at under 2mm in the M2. A spill that would take 30 seconds to reach the board on an older MacBook Pro reaches the M2 Air board in under 5 seconds.',
  },
  {
    question: 'What happens to MagSafe 3 after liquid damage on the MacBook Air M2?',
    answer:
      'The MacBook Air M2 brought back MagSafe charging via a dedicated MagSafe 3 port — a significant design change from the M1 Air which used USB-C only for charging. The MagSafe 3 connector and its associated power management controller sit in a corrosion-prone position on the board. Liquid entering from the left side of the chassis — where MagSafe 3 is positioned — commonly damages the charging controller IC. This presents as a machine that charges intermittently or not at all but otherwise appears functional. We replace the charging controller at component level.',
  },
  {
    question: 'Can you recover data from a liquid-damaged MacBook Air M2?',
    answer:
      'Yes, in most cases. The MacBook Air M2 stores data on NAND flash chips that are separate from the M2 die. Even if the logic board cannot be economically repaired, we can extract your data by reading the storage chips directly. The M2 architecture stores data on a dedicated NAND package separate from the SoC, which often survives liquid damage even when the surrounding circuits do not. Data recovery assessment is included in the R599 diagnostic fee.',
  },
  {
    question: 'How long does MacBook Air M2 liquid damage repair take?',
    answer:
      'Assessment is completed within 24 hours of receipt. Simple repairs — keyboard, trackpad, or speaker assemblies — take 24-48 hours. Logic board ultrasonic cleaning and targeted component rework takes 48-72 hours. Complex multi-IC repairs, including MagSafe 3 controller replacement or USB 4 interface work, take 3-5 business days. We confirm exact timelines in the written quote before proceeding.',
  },
  {
    question: 'Is repairing a liquid-damaged MacBook Air M2 worth the cost?',
    answer:
      'In most cases, absolutely. A new MacBook Air M2 replacement costs R18,000-R28,000 depending on specification. Our component-level repairs typically cost 15-40% of replacement price, preserve all your data on the original board, and come with up-to-3 year warranty on completed work. If the damage genuinely makes repair uneconomical, we will tell you that clearly during the assessment rather than proceeding with expensive work on an irrecoverable board.',
  },
  {
    question: 'Does the MacBook Air M2 have liquid contact indicators?',
    answer:
      'Yes. Apple installs liquid contact indicators inside the MacBook Air M2 chassis — small white indicators that turn pink or red when exposed to liquid. Apple uses triggered indicators to exclude warranty coverage. ZA Support repairs liquid-damaged MacBook Air M2 units regardless of indicator status. Our assessment evaluates actual board damage, not indicator colour. If your machine has been liquid-exposed, contact us regardless of what the indicator shows.',
  },
  {
    question: 'Do you collect liquid-damaged MacBook Air M2 laptops from across Johannesburg?',
    answer:
      'Yes. ZA Support offers same-day collection from Sandton, Rosebank, Fourways, Bryanston, Midrand, Randburg, and all surrounding Johannesburg suburbs. For liquid damage, time is critical — every hour increases corrosion depth. Contact us immediately on 064 529 5863 and we will arrange collection within the same working day.',
  },
];

const airM2FailurePoints = [
  {
    title: '11.3mm Chassis — Liquid Reaches the Board in Seconds',
    desc: 'The MacBook Air M2 is 27% thinner than the M1 Air at just 11.3mm. The internal stack is compressed so tightly that we have measured under 2mm between the keyboard underside and the logic board surface in some areas. Coffee, water, or any liquid on the keyboard reaches the board almost instantaneously. This is the defining vulnerability of the M2 Air, and it is why we urge owners to power off immediately — before the liquid even has time to drip.',
    severity: 'high',
  },
  {
    title: 'MagSafe 3 Port Corrosion',
    desc: 'The MacBook Air M2 reintroduced MagSafe charging after Apple removed it from the M1 Air. The MagSafe 3 connector sits on the left edge of the board and its associated power management controller is a known failure point in liquid damage cases. Liquid entering from the left side corrodes the charging circuitry, causing intermittent charging, no charging, or abnormal current draw. We replace the charging controller IC individually at component level — a targeted repair that avoids full board replacement.',
    severity: 'high',
  },
  {
    title: 'M2 SoC Power Delivery Corrosion',
    desc: 'The M2 chip on the A2681 logic board is powered through a multi-phase power delivery network sensitive to liquid contamination. The M2\'s 4nm process nodes are more sensitive to voltage irregularities than the M1\'s 5nm design. We test every power rail under a bench power supply with current limiting before applying board voltage — a critical step that prevents secondary SoC damage when the board is first powered after liquid exposure.',
    severity: 'high',
  },
  {
    title: 'USB 4 / Thunderbolt Interface Controller Failure',
    desc: 'The MacBook Air M2 supports USB 4 and Thunderbolt on both USB-C ports — an upgrade over the M1\'s Thunderbolt 3. The interface controller IC handles all external connectivity and is positioned in the path of keyboard-entry liquid on the M2 board layout. Corrosion here disables charging, external displays, and all Thunderbolt peripherals simultaneously. Individual controller replacement restores full port functionality.',
    severity: 'medium',
  },
  {
    title: 'Notch Display Flex Cable Corrosion',
    desc: 'The MacBook Air M2 introduced a new notch display design, and with it a repositioned display flex cable connection point on the logic board. Liquid that enters from the top edge of the keyboard can wick along internal cable channels and corrode this connection, causing complete display failure, backlight issues, or the distinctive "no display but machine works" symptom. Connector repair and cable replacement restore the display without replacing the Liquid Retina panel.',
    severity: 'medium',
  },
  {
    title: 'Speaker Assembly Saturation',
    desc: 'The MacBook Air M2 features a four-speaker sound system — a significant upgrade from the M1 Air\'s two speakers. Speakers sit on both sides of the keyboard, and large spills frequently saturate two or more speaker assemblies simultaneously. The audio codec IC near the left speaker cluster is particularly vulnerable. Post-liquid crackling, mono audio, or complete audio failure can result. All four speakers and the codec are individually replaceable components at ZA Support.',
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
  name: 'MacBook Air M2 Liquid Damage Repair Johannesburg',
  description:
    'Professional MacBook Air M2 liquid damage repair in Johannesburg. Thinnest-chassis specialist. MagSafe 3 corrosion repair. Ultrasonic cleaning, component-level IC replacement. Assessment from R599. Up-to-3 year warranty.',
  lowPrice: '4900',
  highPrice: '17150',
});
const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbSchemaItems);

export default function MacBookAirM2LiquidDamagePage() {
  const whatsappUrl = buildWhatsAppUrl('LIQ-MBAM2-HERO', 'liquid-damage');

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
              MacBook Air M2 Liquid Damage
              <br /><span className="text-[#0FEA7A]">Repair Johannesburg</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-4 max-w-3xl leading-relaxed">
              The MacBook Air M2 is Apple&apos;s thinnest Air ever at 11.3mm — brilliant engineering, but it means
              liquid reaches the logic board faster than any previous MacBook. MagSafe 3 corrosion, M2 power delivery
              failures, USB 4 controller damage: we have seen and fixed them all.
            </p>
            <div className="flex items-center gap-2 text-[#7A9E98] text-sm mb-8">
              <MapPin className="w-4 h-4 text-[#0FEA7A]" />
              <span>1 Hyde Lane, Hyde Park, Office E2004, JHB 2196 | Assessment from R599 | Collection across Johannesburg</span>
            </div>
            <div className="flex flex-wrap gap-3 mb-8">
              {[
                { icon: Shield, label: 'No Fix No Fee' },
                { icon: Droplets, label: 'Ultrasonic Cleaning' },
                { icon: Wind, label: 'M2 Fanless Specialist' },
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

      {/* Why the M2 Air Is Different */}
      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4">
            Why the MacBook Air M2 Is the Highest-Risk Mac for Liquid Damage
          </h2>
          <div className="space-y-4 text-[#7A9E98] leading-relaxed mb-8">
            <p>
              The MacBook Air M2 (A2681, released 2022) represents a complete chassis redesign from the M1 Air. Apple
              moved from the familiar wedge profile to a completely flat form factor — a clean, minimalist design that
              measures just 11.3mm from top to bottom. It is a stunning machine. It is also, in our experience at ZA
              Support, the most liquid-vulnerable Mac we regularly repair.
            </p>
            <p>
              The M1 Air at 15.6mm had already earned a reputation as a high-risk liquid damage machine due to its fanless
              design. The M2 Air is 27% thinner than that. The entire internal stack — keyboard mechanism, battery pack,
              speaker assemblies, and logic board — is compressed into 11.3mm of aluminium. The gap between the bottom of
              the keyboard and the surface of the logic board, in the area directly below the trackpad, measures under
              2mm in some areas. A spill does not drip through — it contacts the board almost immediately.
            </p>
            <p>
              There is a second significant change in the M2 Air that affects liquid damage outcomes: the return of MagSafe.
              Apple removed MagSafe from the M1 Air and charged via USB-C only. The M2 Air brought back a dedicated
              MagSafe 3 port on the left side of the chassis, alongside two USB-C/Thunderbolt ports. This MagSafe 3
              port and its charging controller IC introduce a new failure point we did not see on the M1 Air — corrosion
              at the charging circuit that presents as intermittent or no charging, while the machine otherwise appears
              functional.
            </p>
            <p>
              The M2 chip itself is built on TSMC&apos;s 4nm N4 process, a full generation smaller than the M1&apos;s 5nm. The
              tighter node density makes the die slightly more sensitive to electrolytic corrosion on adjacent power
              delivery components. We have adapted our bench power supply protocol specifically for the M2 Air board —
              measuring each power rail before applying voltage, and using a current-limited supply during initial
              post-cleaning power-on tests to prevent secondary SoC damage if any corrosion remains.
            </p>
            <p>
              In our Hyde Park workshop, we have recovered MacBook Air M2 units damaged by everything from morning
              coffee to overnight rain through an open window. The key variable — almost always — is how quickly the
              owner powered the machine off and brought it to us. The M2 Air boards we see within 6 hours of a spill
              are almost always salvageable with ultrasonic cleaning alone. At 24 hours, IC replacement is frequently
              necessary. At 48 hours and beyond, the corrosion can reach the M2 die area and the repair becomes a
              significantly more complex procedure.
            </p>
            <p>
              South Africa&apos;s climate plays a role too. Load shedding means many clients in Johannesburg are running
              UPS systems or generators — during a power cut, a MacBook Air M2 may be the only active device in the
              home, increasing the chance it is in use near food or drink. We have seen a notable uptick in liquid
              damage cases arriving during or just after load shedding periods, which we attribute to exactly this
              pattern.
            </p>
          </div>
          <p className="text-[#7A9E98] text-sm">
            Apple officially documents the M2 chip architecture and its thermal design on their{' '}
            <a
              href="https://www.apple.com/mac/m2/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0FEA7A] underline hover:opacity-80 transition-opacity"
            >
              M2 platform overview page
            </a>
            {' '}— the same architecture whose power delivery components are most often affected by liquid damage.
          </p>
        </div>
      </section>

      {/* M2 Chip Architecture Note */}
      <section className="py-10 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-6">
            <Cpu className="w-6 h-6 text-[#0FEA7A]" />
            <h2 className="text-3xl font-extrabold text-[#E8F4F1]">M2 Chip Architecture and Liquid Damage</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            {[
              {
                label: 'Process Node',
                value: 'TSMC 4nm N4',
                note: 'Tighter than M1\'s 5nm — power delivery components are smaller and closer together',
              },
              {
                label: 'CPU',
                value: '8-core (4P + 4E)',
                note: 'Performance and efficiency cores integrated into single die — damage to power rails affects both',
              },
              {
                label: 'Unified Memory',
                value: 'Up to 24GB LPDDR5',
                note: 'Memory on-package but separate from SoC — often survives board damage, enabling data recovery',
              },
              {
                label: 'Charging',
                value: 'MagSafe 3 + 2× USB 4',
                note: 'Three independent charging paths — MagSafe 3 controller is a new liquid damage failure point vs M1',
              },
            ].map((item) => (
              <div key={item.label} className="glass-card p-5 border border-[rgba(15,234,122,0.12)]">
                <p className="text-[#7A9E98] text-xs uppercase tracking-wider mb-1">{item.label}</p>
                <p className="text-[#0FEA7A] font-bold text-lg mb-2">{item.value}</p>
                <p className="text-[#7A9E98] text-sm leading-relaxed">{item.note}</p>
              </div>
            ))}
          </div>
          <div className="p-5 rounded-xl border border-[rgba(15,234,122,0.15)] bg-[rgba(15,234,122,0.04)]">
            <p className="text-[#7A9E98] text-sm leading-relaxed">
              <span className="text-[#E8F4F1] font-semibold">Why this matters for repair:</span>{' '}
              The M2&apos;s unified memory architecture means that the NAND storage package is physically separate from the
              M2 SoC. In liquid damage cases where the SoC or its surrounding circuits are too damaged for economical
              repair, we can still read the NAND directly and recover your data. In our experience, the storage chips
              survive liquid damage in over 85% of cases where the machine itself cannot be repaired.
            </p>
          </div>
        </div>
      </section>

      {/* Failure Points */}
      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4">
            MacBook Air M2 Liquid Damage Failure Points
          </h2>
          <p className="text-[#7A9E98] mb-10 max-w-3xl leading-relaxed">
            After repairing hundreds of liquid-damaged MacBook Air units, the M2 Air presents a distinct set of
            failure patterns driven by its new chassis geometry and the return of MagSafe 3. Here is what we see most
            often on the A2681 board.
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {airM2FailurePoints.map((item) => (
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
              All repairs are quoted before work begins. No Fix No Fee on every case — if we cannot repair your
              MacBook Air M2, an assessment fee of R599 applies and the machine is returned as received.
              Up-to-3 year warranty on all completed repairs.
            </p>
          </div>
        </div>
      </section>

      {/* Apple vs ZA Support */}
      <section className="py-10 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-4">
            Apple / iStore vs ZA Support: MacBook Air M2 Liquid Damage
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            <div className="glass-card p-6 border border-red-500/20">
              <h3 className="text-red-400 font-bold mb-3">Apple Store / iStore</h3>
              <ul className="text-[#7A9E98] text-sm space-y-2">
                <li>Full logic board replacement — R15,000 to R32,000</li>
                <li>Liquid damage excluded from standard AppleCare+</li>
                <li>AppleCare+ accidental damage covers one incident at R2,999 excess — limited</li>
                <li>Board replacement may not preserve data</li>
                <li>5-10 business day turnaround via depot repair</li>
              </ul>
            </div>
            <div className="glass-card p-6 border border-[rgba(15,234,122,0.3)]">
              <h3 className="text-[#0FEA7A] font-bold mb-3">ZA Support</h3>
              <ul className="text-[#7A9E98] text-sm space-y-2">
                <li>Component-level repair — only damaged parts replaced</li>
                <li>Assessment from R599, repair quoted individually</li>
                <li>Data preserved on the original logic board</li>
                <li>M2 4nm power delivery expertise — current-limited testing protocol</li>
                <li>24-72 hour turnaround, up-to-3 year warranty</li>
              </ul>
            </div>
          </div>
          <div className="p-5 rounded-xl border border-[rgba(245,166,35,0.2)] bg-[rgba(245,166,35,0.04)]">
            <p className="text-[#7A9E98] text-sm leading-relaxed">
              <span className="text-[#F5A623] font-semibold">Mac Shack comparison:</span>{' '}
              Mac Shack in Johannesburg typically quotes R4,499 for a logic board replacement swap on liquid-damaged
              MacBooks — a wholesale board swap, not a repair. ZA Support&apos;s component-level approach repairs the
              existing board, costs significantly less in most cases, and preserves all your data. If you have already
              received a Mac Shack quote, bring the machine to us for a second opinion before committing.
            </p>
          </div>
        </div>
      </section>

      {/* Emergency Steps */}
      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle className="w-6 h-6 text-[#F5A623]" />
            <p className="text-[#F5A623] text-sm font-semibold uppercase tracking-wider">MacBook Air M2 Emergency Guide</p>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4">
            Spilled Liquid on Your MacBook Air M2?
          </h2>
          <p className="text-[#7A9E98] leading-relaxed mb-10">
            At 11.3mm thick, the M2 Air&apos;s logic board is closer to the keyboard surface than on any previous Mac.
            The next 60 seconds determine whether this is a cleaning job or a component replacement job.
            Do exactly this:
          </p>
          <div className="space-y-5">
            {[
              {
                step: '1',
                title: 'Force power off immediately — hold the Touch ID button for 10 seconds',
                detail:
                  'The MacBook Air M2 draws continuous power in sleep mode via its always-on architecture. Liquid on an energised board begins electrolytic corrosion within seconds. Forcing a hard power-off removes voltage from every circuit on the board instantly. Do not attempt a clean Shutdown via the Apple menu — that takes too long.',
                urgent: true,
              },
              {
                step: '2',
                title: 'Disconnect MagSafe 3 and any USB-C cables immediately',
                detail:
                  'The M2 Air has three external power paths: MagSafe 3 and two USB-C ports. Disconnect all of them. Any connected power source — including a USB-C hub drawing bus power — keeps the corrosion process energised. Remove the MagSafe 3 cable first, as it delivers the highest current.',
                urgent: true,
              },
              {
                step: '3',
                title: 'Flip the Air M2 upside down, keyboard facing down, over a towel',
                detail:
                  'Given the 11.3mm chassis, gravity is your best tool. Flipping the machine uses gravity to pull liquid away from the logic board back through the keyboard openings. Hold it keyboard-down for 2-3 minutes. Do not shake it — that forces liquid deeper into board connectors.',
                urgent: false,
              },
              {
                step: '4',
                title: 'Do NOT use rice, a hairdryer, or attempt to charge the machine',
                detail:
                  'Rice absorbs surface moisture but does nothing for the corrosive mineral residue left on board traces. A hairdryer risks warping the M2 Air&apos;s ultra-thin aluminium chassis and drives moisture into tight BGA underfill areas. Attempting to charge a liquid-exposed board is the single most destructive action — it applies full voltage across corroding traces and can destroy the M2 SoC within seconds.',
                urgent: true,
              },
              {
                step: '5',
                title: 'Bring it to ZA Support the same day — call 064 529 5863',
                detail:
                  'For the M2 Air, the damage progression is faster than on any previous model. In our Hyde Park workshop, we see clean 6-hour cases become multi-IC replacement jobs at 24 hours. Same-day collection is available across all Johannesburg suburbs including Sandton, Rosebank, Fourways, Bryanston, and Midrand. Call or WhatsApp us immediately.',
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
      <section className="py-10 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQAccordion items={faqs} title="MacBook Air M2 Liquid Damage — Common Questions" />
        </div>
      </section>

      {/* Related Services */}
      <section className="py-8 sm:py-16 bg-[#111C1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#E8F4F1] mb-6">Related Repairs</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              { label: 'All Liquid Damage', href: '/liquid-damage' },
              { label: 'MacBook Air Liquid Damage', href: '/liquid-damage/macbook-air' },
              { label: 'MacBook Air M1 Liquid Damage', href: '/liquid-damage/macbook-air-m1' },
              { label: 'MacBook Pro Liquid Damage', href: '/liquid-damage/macbook-pro' },
              { label: 'MacBook Pro M2 Liquid Damage', href: '/liquid-damage/macbook-pro-m2' },
              { label: 'MacBook Air M2 Logic Board', href: '/logic-board-repair/macbook-air-m2' },
              { label: 'Logic Board Hub', href: '/logic-board-repair' },
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
            <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3">
              MacBook Air M2 Liquid Damage? Act Immediately.
            </h2>
            <p className="text-[#7A9E98] mb-6 max-w-xl mx-auto leading-relaxed">
              At 11.3mm, the M2 Air&apos;s board is closer to the keyboard than any previous Mac. Every hour
              increases corrosion depth. WhatsApp us now — we will guide you through the next steps and arrange
              same-day collection across Johannesburg.
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
      <section className="py-12 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <PricingRange page="/liquid-damage/macbook-air-m2" />
          <PricingNote />
        </div>
      </section>

    </>
  );
}
