import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, CheckCircle, ArrowRight, Shield, MapPin, Droplets, AlertTriangle, Cpu, Zap } from 'lucide-react';
import SchemaOrg from '@/components/seo/SchemaOrg';
import { buildFaqSchema, buildServiceSchema, buildBreadcrumbSchema } from '@/lib/schema';
import FAQAccordion from '@/components/ui/FAQ';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { CONTACT, SITE, buildWhatsAppUrl } from '@/lib/constants';
import PricingNote from '@/components/PricingNote';
import PricingRange from '@/components/PricingRange';

export const metadata: Metadata = {
  title: 'MacBook Pro 14-Inch Liquid Damage Repair Johannesburg [2026] | From R599 | ZA Support',
  description:
    'MacBook Pro 14-inch liquid damage repair Johannesburg. HDMI port, SD slot, MagSafe 3 corrosion specialists. Assessment from R599. No Fix No Fee. Hyde Park workshop.',
  alternates: { canonical: 'https://zasupport.com/liquid-damage/macbook-pro-14-inch' },
  keywords: [
    'MacBook Pro 14 inch liquid damage repair Johannesburg',
    'MacBook Pro 14 inch water damage repair',
    'MacBook Pro 14 spill repair Johannesburg',
    'MacBook Pro 14 inch corrosion repair Hyde Park',
    'liquid damaged MacBook Pro 14 fix',
    'MacBook Pro 14 inch HDMI port water damage',
    'MacBook Pro 14 SD card slot liquid damage Johannesburg',
    'MacBook Pro 14 inch liquid damage assessment from R599',
    'MacBook Pro 14 M1 Pro liquid damage',
    'MacBook Pro 14 M3 Max liquid damage repair',
  ],
};

const breadcrumbItems = [
  { label: 'Liquid Damage', href: '/liquid-damage' },
  { label: 'MacBook Pro', href: '/liquid-damage/macbook-pro' },
  { label: '14-Inch' },
];

const breadcrumbSchemaItems = [
  { name: 'Home', url: 'https://zasupport.com' },
  { name: 'Liquid Damage', url: 'https://zasupport.com/liquid-damage' },
  { name: 'MacBook Pro', url: 'https://zasupport.com/liquid-damage/macbook-pro' },
  { name: 'MacBook Pro 14-Inch', url: 'https://zasupport.com/liquid-damage/macbook-pro-14-inch' },
];

const faqs = [
  {
    question: 'Can a liquid-damaged MacBook Pro 14-inch be repaired?',
    answer:
      'Yes, in most cases. The MacBook Pro 14-inch — across the 2021 M1 Pro/Max (A2442), 2023 M2 Pro/Max (A2779), and 2023 M3/M3 Pro/M3 Max (A2918/A2992) generations — uses Apple Silicon chips with discrete support ICs for USB-C, MagSafe 3, HDMI, and SD card connectivity. These peripheral controllers are individually replaceable, meaning a full logic board replacement is rarely necessary. We have repaired all three generations of 14-inch MacBook Pro at our Hyde Park workshop. Assessment from R599, No Fix No Fee.',
  },
  {
    question: 'Why is the MacBook Pro 14-inch particularly vulnerable to liquid damage?',
    answer:
      'The 14-inch model introduced a significantly expanded port selection compared to the 13-inch: HDMI 2.1, an SD card slot, three Thunderbolt 4 ports, and MagSafe 3. Each port is a direct liquid ingress point. The HDMI and SD card slot on the right side sit directly above a section of the logic board where the Thunderbolt controller ICs and memory bus traces converge. In our workshop, right-side desk spills on a 14-inch MacBook Pro have a higher rate of multi-circuit involvement than left-side spills, precisely because of this port cluster.',
  },
  {
    question: 'My MacBook Pro 14-inch will not charge after a spill — is it repairable?',
    answer:
      'Very likely yes. A no-charge condition on the 14-inch MacBook Pro after liquid exposure almost always points to the U6900 MagSafe charging controller or the USB-C charging IC — not the Apple Silicon SoC. The SoC sits in a protected central position on the board and is one of the last components to fail. Our R599 assessment uses oscilloscope and thermal camera to identify exactly which charging circuit is affected before we commit to any repair work.',
  },
  {
    question: 'How much does MacBook Pro 14-inch liquid damage repair cost?',
    answer:
      'Cost depends on which generation (M1 Pro, M2 Pro, M3) and which circuits are affected. A MagSafe or USB-C controller replacement is at the lower end. HDMI controller corrosion or multi-channel memory bus damage on an M1 Max or M3 Max board requires more work and extends repair time. All repairs are quoted in writing after the R599 assessment, before any work begins. No Fix No Fee applies to every case.',
  },
  {
    question: 'Can you recover data from a water-damaged MacBook Pro 14-inch?',
    answer:
      'Yes, in most cases. All MacBook Pro 14-inch models store data on Apple-proprietary NAND flash with a custom NVMe controller. Even when the logic board is beyond economic repair, we can read the NAND modules directly in many cases. The main risk is the NAND controller IC itself — if electrolytic corrosion has penetrated the controller firmware registers (most common on boards left unpowered for more than 72 hours), recovery becomes more complex. We assess data recovery potential during the R599 diagnostic at no extra charge.',
  },
  {
    question: 'How long does MacBook Pro 14-inch liquid damage repair take?',
    answer:
      'Diagnostic assessment is completed within 24 hours of receiving your machine. Simple repairs — MagSafe port cleaning, USB-C controller replacement, SD card controller cleaning — take 24-48 hours. HDMI controller replacement or multi-circuit ultrasonic cleaning with component-level work typically takes 48-72 hours. M1 Max and M3 Max boards with multi-die memory involvement may take 72-96 hours. We confirm the exact timeline in the written quote before starting.',
  },
  {
    question: 'What is the Apple Store cost for a 14-inch MacBook Pro logic board replacement?',
    answer:
      'Apple treats liquid damage as accidental damage. Without AppleCare+, a 14-inch MacBook Pro logic board replacement costs between R28,000 and R70,000 depending on configuration — approaching the price of a new machine. With AppleCare+, an accidental damage incident fee of approximately R4,500 applies, but Apple replaces the entire logic board rather than the failed component, and data recovery is not guaranteed. ZA Support repairs only what has actually failed, at a fraction of that cost.',
  },
  {
    question: 'Does the HDMI port on the MacBook Pro 14-inch get damaged by liquid?',
    answer:
      'Yes, and it is one of the more deceptive failure points we see on the 14-inch. The HDMI 2.1 port sits on the right edge directly over the HDMI controller IC. Liquid entering the port can corrode the HDMI signal pins and, more critically, track along the flex traces to the controller on the board. We have seen 14-inch MacBook Pros that continued to charge and boot normally after a right-side spill but had a dead HDMI output — the charging circuit was clean, but the HDMI controller had already corroded. We test all port controllers as part of the standard diagnostic.',
  },
  {
    question: 'Is liquid damage from load shedding more common on the 14-inch MacBook Pro?',
    answer:
      'In our Johannesburg workshop, we have noticed a pattern: the 14-inch is more likely to be plugged into an HDMI monitor and a desk setup than the 13-inch, which means it is more often connected to multiple circuits when an Eskom stage cut ends and power returns. The brief voltage surge on power restoration, combined with any existing liquid contamination on the MagSafe or HDMI traces, can push a borderline corrosion situation into a full failure. If your machine was plugged in during a load shedding event after liquid exposure, mention this when you contact us.',
  },
  {
    question: 'Do you collect MacBook Pro 14-inch machines from across Johannesburg?',
    answer:
      'Yes. We collect from Sandton, Rosebank, Fourways, Bryanston, Midrand, Randburg, Kempton Park, Morningside, Rivonia, Sunninghill, Parkhurst, Northcliff, Houghton, and all surrounding Johannesburg suburbs. We also serve Pretoria and Centurion. For liquid damage, speed is critical — call or WhatsApp 064 529 5863 for same-day collection. We have handled same-morning collections from Fourways and Sandton for M3 Max boards before.',
  },
  {
    question: 'My MacBook Pro 14-inch SD card slot is corroded — can it be repaired?',
    answer:
      'Yes. The SD card slot on the 14-inch MacBook Pro connects via a dedicated SD controller IC on the logic board. When liquid enters the slot, the corrosion usually affects the slot contacts first, then tracks to the controller. We clean the slot contacts ultrasonically, test continuity, and replace the controller IC if required. In our experience, isolated SD slot liquid damage — where the spill entered only through the card slot — has a very high repair success rate because the liquid ingress is contained to one side of the board.',
  },
];

const failurePoints = [
  {
    title: 'HDMI 2.1 Port and Controller Corrosion',
    desc: 'The HDMI 2.1 port on the 14-inch right panel sits directly above the HDMI bridge IC. Liquid entering the port tracks along the HDMI signal lines to the controller within minutes. The 14-inch HDMI controller handles 48 Gbps signalling — any corrosion on these high-frequency traces produces immediate signal loss even if the controller IC itself is intact. We clean the HDMI signal traces ultrasonically, test with a known-good display, and replace the controller IC if required. This repair is not available at the Apple Store — they replace the entire board.',
    severity: 'high',
  },
  {
    title: 'SD Card Slot Ingress and Controller',
    desc: 'The SD card slot is one of the most direct liquid ingress paths on the 14-inch MacBook Pro. When liquid enters, it tracks along the 9-pin SD bus to the UHS-II SD controller IC on the right side of the logic board. We have seen SD slot spills that contaminated the Thunderbolt controller adjacent to the SD IC — a cascade fault that presents as both no SD card detection and intermittent Thunderbolt on the right port. Full right-side port diagnostic is included in every 14-inch assessment.',
    severity: 'high',
  },
  {
    title: 'MagSafe 3 Charging Circuit',
    desc: 'MagSafe 3 on the 14-inch MacBook Pro supports up to 96W on M1/M2 base models and up to 140W on M1 Max, M2 Max, and M3 Max configurations. Higher wattage means the charging traces carry more current — which accelerates electrolytic corrosion when liquid is present. The MagSafe connector on the 14-inch sits at the left rear corner, and liquid entering from the left speaker grille can reach the charging IC within seconds if the machine is plugged in at the time of the spill. We diagnose the full MagSafe charging path from connector to PMIC, not just the port.',
    severity: 'high',
  },
  {
    title: 'Multi-Die Unified Memory Bus (M1 Max / M2 Max / M3 Max)',
    desc: 'The Max-tier 14-inch MacBook Pro uses a multi-die unified memory configuration: M1 Max uses two LPDDR5 dies (32/64 GB), M2 Max uses two LPDDR5X dies (32/96 GB), and M3 Max uses four dies (36/48/64/96 GB). Each die adds memory bus traces across the logic board. A centre-keyboard spill on an M1 Max or M3 Max 14-inch can corrode multiple memory channels simultaneously, producing persistent kernel panics and ECC errors even after cleaning. We repair individual trace faults under microscope — this is not a board-swap situation.',
    severity: 'high',
  },
  {
    title: 'Thunderbolt 4 Controllers (Left and Right)',
    desc: 'The 14-inch MacBook Pro carries three Thunderbolt 4 ports: two on the left (all models) and one on the right (M1 Pro, M2 Pro, M3 and above). Each port pair is managed by a dedicated Thunderbolt controller IC. Liquid entering any port corrodes the controller responsible for that side. On a left-side spill, both left Thunderbolt controllers can be affected simultaneously. We replace individual Thunderbolt controller ICs — a targeted repair that restores full port functionality without board replacement.',
    severity: 'medium',
  },
  {
    title: 'Liquid Retina XDR Display Connector and Backlight Driver',
    desc: 'The 14-inch Liquid Retina XDR display uses a mini-LED backlight with a dedicated driver IC near the hinge connector. Liquid that enters from above the keyboard deck — a common trajectory for a direct desk spill — can reach the display connector area and corrode the backlight driver. The result is partial or complete backlight failure while the display logic itself remains intact. The driver IC is individually replaceable. We test the display connector, driver IC, and backlight circuits before recommending any display-level repair.',
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
  high: 'Critical',
  medium: 'Moderate',
  low: 'Repairable',
};

const faqSchema = buildFaqSchema(faqs);
const serviceSchema = buildServiceSchema({
  name: 'MacBook Pro 14-Inch Liquid Damage Repair Johannesburg',
  description:
    'Professional MacBook Pro 14-inch liquid damage repair in Johannesburg. HDMI, SD card, MagSafe 3, and Thunderbolt 4 port specialists. Ultrasonic cleaning, component-level repair. Assessment from R599. Up-to-3 year warranty.',
});
const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbSchemaItems);

export default function MacBookPro14InchLiquidDamagePage() {
  const whatsappUrl = buildWhatsAppUrl('LIQ-MBP14-HERO', 'liquid-damage');

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
              MacBook Pro 14-Inch Liquid Damage
              <br /><span className="text-[#0FEA7A]">Repair Johannesburg</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-4 max-w-3xl leading-relaxed">
              The 14-inch MacBook Pro&apos;s expanded port cluster — HDMI 2.1, SD card slot, three Thunderbolt 4 ports, and MagSafe 3 — creates more liquid ingress points than any previous MacBook Pro. We repair all three generations (M1 Pro/Max, M2 Pro/Max, M3/M3 Pro/M3 Max) at component level, preserving your data and your machine.
            </p>
            <div className="flex items-center gap-2 text-[#7A9E98] text-sm mb-8">
              <MapPin className="w-4 h-4 text-[#0FEA7A]" />
              <span>1 Hyde Lane, Hyde Park, Office E2004, JHB 2196 | Assessment from R599 | Collection across Johannesburg</span>
            </div>
            <div className="flex flex-wrap gap-3 mb-8">
              {[
                { icon: Shield, label: 'No Fix No Fee' },
                { icon: Droplets, label: 'Ultrasonic Cleaning' },
                { icon: Cpu, label: 'M1 / M2 / M3 Pro & Max' },
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

      {/* Why 14-Inch Is Different */}
      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4">
            Why MacBook Pro 14-Inch Liquid Damage Is More Complex
          </h2>
          <div className="space-y-4 text-[#7A9E98] leading-relaxed mb-8">
            <p>
              When Apple released the first 14-inch MacBook Pro in October 2021, it represented the most significant port expansion in a decade — HDMI 2.1, a full-size SD card slot, three Thunderbolt 4 ports, and MagSafe 3, all on a machine smaller than the 15-inch it effectively replaced. In our Hyde Park workshop, we noticed immediately that this port cluster changed liquid damage patterns fundamentally.
            </p>
            <p>
              The 13-inch MacBook Pro had two Thunderbolt 3 ports and nothing else. Every liquid ingress point was a Thunderbolt USB-C socket. The 14-inch has five distinct liquid ingress paths on the chassis — and each one leads to a different section of the logic board. A right-side desk spill can enter through the HDMI port, the SD card slot, and the right Thunderbolt port simultaneously. We have seen 14-inch MacBook Pros where three separate controller ICs were affected by a single coffee spill, all from the right side.
            </p>
            <p>
              The HDMI 2.1 controller is particularly sensitive. HDMI 2.1 supports up to 48 Gbps of bandwidth, and the signal traces between the port and the controller IC on the logic board operate at frequency ranges that are unusually sensitive to partial corrosion. We have repaired 14-inch MacBook Pros where a very small amount of liquid on the HDMI traces — not enough to cause visible corrosion — was sufficient to disrupt HDMI signal integrity completely. The solution was not board replacement; it was targeted trace cleaning under a microscope.
            </p>
            <p>
              The SD card slot is the second distinctive ingress point. On the 14-inch, the SD slot uses the UHS-II standard — a 9-pin interface that runs at significantly higher speeds than the UHS-I slot on the older 15-inch and 16-inch MacBook Pros. The UHS-II bus traces are adjacent to the right-side Thunderbolt controller. A liquid path through the SD slot can therefore produce both SD detection failure and intermittent right Thunderbolt port behaviour from a single ingress event.
            </p>
            <p>
              The generation of chip matters too. The M1 Pro and M1 Max (A2442, 2021), M2 Pro and M2 Max (A2779, 2023), and M3/M3 Pro/M3 Max (A2918/A2992, late 2023) all have distinct board layouts and voltage tolerances. The M3 generation in particular — built on TSMC&apos;s 3nm process — has NAND controller voltage tolerances tighter than the M1 or M2. The diagnostic approach is similar across generations, but the speed-criticality of getting an M3 14-inch to us is higher. According to Apple&apos;s chip documentation, the M1 Pro die is built on 5nm with 33.7 billion transistors — and the M3 Pro on 3nm with 37 billion. More transistors in less space means tighter margins, and less tolerance for contaminated power rails.
            </p>
            <p>
              None of this makes the 14-inch unrepairable. Every controller IC we mentioned — HDMI, SD, MagSafe, Thunderbolt — is individually replaceable. The Apple Silicon SoC itself almost never fails from liquid damage in our experience; it is the peripheral circuits that corrode first. What matters is how quickly the machine reaches us.
            </p>
          </div>
          <a
            href="https://www.apple.com/macbook-pro/specs/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#0FEA7A] text-sm underline underline-offset-2 hover:text-[#0FEA7A]/80 transition-colors"
          >
            Apple MacBook Pro 14-inch official specifications ↗
          </a>
        </div>
      </section>

      {/* Failure Points */}
      <section className="py-10 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4">
            MacBook Pro 14-Inch Liquid Damage Failure Points
          </h2>
          <p className="text-[#7A9E98] mb-10 max-w-3xl leading-relaxed">
            Based on our repair data across M1 Pro, M1 Max, M2 Pro, M2 Max, M3, M3 Pro, and M3 Max 14-inch MacBook Pro cases, these are the most common failure patterns. Each is individually diagnosed and repaired at component level.
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
              All repairs are quoted before work begins. No Fix No Fee on every 14-inch case — if we cannot repair your MacBook Pro, an assessment fee of R599 applies and the machine is returned as received. Up-to-3 year written warranty on all completed repairs.
            </p>
          </div>
        </div>
      </section>

      {/* Apple vs ZA Support */}
      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-4">
            Apple vs ZA Support: 14-Inch Liquid Damage Repair
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            <div className="glass-card p-6 border border-red-500/20">
              <h3 className="text-red-400 font-bold mb-3">Apple Store / iStore</h3>
              <ul className="text-[#7A9E98] text-sm space-y-2">
                <li>Full logic board replacement — R28,000 to R70,000</li>
                <li>Liquid damage excluded from standard AppleCare</li>
                <li>AppleCare+ incident fee approximately R4,500</li>
                <li>Data may not survive board replacement</li>
                <li>5-10 business days via Apple depot repair</li>
                <li>HDMI / SD port faults not individually diagnosable</li>
              </ul>
            </div>
            <div className="glass-card p-6 border border-[rgba(15,234,122,0.3)]">
              <h3 className="text-[#0FEA7A] font-bold mb-3">ZA Support</h3>
              <ul className="text-[#7A9E98] text-sm space-y-2">
                <li>Component-level repair — only failed ICs replaced</li>
                <li>Assessment from R599, repair quoted individually</li>
                <li>Data preserved on the same logic board</li>
                <li>HDMI, SD card, MagSafe, Thunderbolt individually repaired</li>
                <li>Turnaround 24-72 hours, up-to-3 year warranty</li>
                <li>M1 Max / M3 Max multi-die memory repair available</li>
              </ul>
            </div>
          </div>
          <p className="text-[#7A9E98] text-sm leading-relaxed">
            We regularly see Johannesburg clients whose 14-inch MacBook Pros were connected to HDMI monitors and desk setups when a spill occurred — meaning the machine was drawing full power through MagSafe and had active Thunderbolt or HDMI data connections at the time. Active connections during a spill accelerate corrosion on powered traces. Load shedding compounds this further: if your 14-inch was plugged in when an Eskom stage cut ended and power returned, the voltage transient on an already-contaminated charging circuit can push a borderline situation into a full failure. Tell us if load shedding was a factor — it affects our diagnostic sequence.
          </p>
        </div>
      </section>

      {/* Emergency Steps */}
      <section className="py-10 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle className="w-6 h-6 text-[#F5A623]" />
            <p className="text-[#F5A623] text-sm font-semibold uppercase tracking-wider">14-Inch Emergency Guide</p>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4">
            Spilled Liquid on Your MacBook Pro 14-Inch?
          </h2>
          <p className="text-[#7A9E98] leading-relaxed mb-10">
            These steps apply to all 14-inch MacBook Pro generations: A2442 (M1 Pro/Max, 2021), A2779 (M2 Pro/Max, 2023), and A2918/A2992 (M3/M3 Pro/M3 Max, late 2023).
          </p>
          <div className="space-y-5">
            {[
              {
                step: '1',
                title: 'Force power off immediately — hold Touch ID for 10 seconds',
                detail: 'Do not attempt a normal shutdown. Apple Silicon MacBook Pros continue drawing power in sleep mode across all controllers — HDMI, Thunderbolt, SD, MagSafe. Force power-off removes voltage from every trace simultaneously. This is the most important action in the first 60 seconds and can be the difference between a R1,500 clean and a R15,000 board repair.',
                urgent: true,
              },
              {
                step: '2',
                title: 'Disconnect MagSafe, all USB-C cables, and any HDMI connection',
                detail: 'The 14-inch MacBook Pro is often used with a desk setup — MagSafe charging, one or two Thunderbolt monitors, and sometimes HDMI. Each active cable is a powered circuit. Disconnect everything before touching the machine further. The HDMI port in particular carries a 5V hotplug detect line that remains live even when the machine appears off.',
                urgent: true,
              },
              {
                step: '3',
                title: 'Remove the SD card if inserted',
                detail: 'If an SD card is inserted at the time of the spill, the 9-pin UHS-II interface is active. Liquid on the SD bus with an active card present can cause a short across the data lines. Remove the card before inverting the machine — but do this carefully, without powering on to eject.',
                urgent: false,
              },
              {
                step: '4',
                title: 'Flip keyboard-down and let liquid drain away from the board',
                detail: 'The 14-inch logic board sits beneath the keyboard deck. Inverting the machine lets liquid drain toward the keyboard area and away from the port cluster on the sides. The HDMI and SD slot sit at the right side; liquid that entered from the right needs to drain — not pool on the logic board beneath them.',
                urgent: false,
              },
              {
                step: '5',
                title: 'Do not power on to test — even briefly',
                detail: 'This is the most damaging mistake we see from Johannesburg 14-inch owners. Applying power to a contaminated board drives current through corroded traces, electrolyses liquid residue into copper oxides that permanently pit BGA pads, and can convert a cleanable fault into an unrepairable one in under 30 seconds. "Just to check if it works" is not worth the risk.',
                urgent: true,
              },
              {
                step: '6',
                title: 'Do not use rice, silica gel, or heat drying',
                detail: 'These approaches address surface moisture only. Active corrosion on PCB traces beneath the board surface requires ultrasonic cleaning with specialised solution, not passive drying. A hairdryer can drive moisture deeper into BGA pad connections and delaminate the 14-inch chassis adhesive. Silica gel is ineffective once liquid has reached the board.',
                urgent: true,
              },
              {
                step: '7',
                title: 'Contact ZA Support within 24 hours — 064 529 5863',
                detail: 'Recovery rates drop significantly after 48 hours as corrosion penetrates beneath BGA underfill. We offer same-day collection across Johannesburg including Sandton, Fourways, Rosebank, Bryanston, Midrand, and Kempton Park. Call or WhatsApp 064 529 5863 immediately — for M3 Max boards, we treat every call as urgent.',
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
          <FAQAccordion items={faqs} title="MacBook Pro 14-Inch Liquid Damage — Common Questions" />
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
              { label: 'MacBook Pro 13-Inch Liquid Damage', href: '/liquid-damage/macbook-pro-13-inch' },
              { label: 'MacBook Pro M3 Liquid Damage', href: '/liquid-damage/macbook-pro-m3' },
              { label: 'MacBook Pro M2 Liquid Damage', href: '/liquid-damage/macbook-pro-m2' },
              { label: 'MacBook Pro M1 Liquid Damage', href: '/liquid-damage/macbook-pro-m1' },
              { label: 'Logic Board Hub', href: '/logic-board-repair' },
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
              MacBook Pro 14-Inch Liquid Damage? Every Hour Counts.
            </h2>
            <p className="text-[#7A9E98] mb-6 max-w-xl mx-auto leading-relaxed">
              The 14-inch&apos;s five liquid ingress points and Apple Silicon voltage tolerances make speed more critical than most people realise. WhatsApp us now for immediate guidance and same-day collection across Johannesburg. Assessment from R599. No Fix No Fee.
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
          <PricingRange page="/liquid-damage/macbook-pro-14-inch" />
          <PricingNote />
        </div>
      </section>

    </>
  );
}
