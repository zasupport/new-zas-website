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
  title: 'Mac Mini Liquid Damage Repair Johannesburg [2026] | From R599 | ZA Support',
  description:
    'Mac Mini liquid damage repair Johannesburg. M1, M2, M2 Pro, M4 models. Internal PSU corrosion, port contamination. Assessment from R599. From R599 assessment. Hyde Park.',
  alternates: { canonical: 'https://zasupport.com/liquid-damage/mac-mini' },
  keywords: [
    'Mac Mini liquid damage repair Johannesburg',
    'Mac Mini water damage repair',
    'Mac Mini spill repair Johannesburg',
    'Mac Mini M1 liquid damage repair',
    'Mac Mini M2 water damage Johannesburg',
    'Mac Mini M4 liquid damage repair Hyde Park',
    'Mac Mini power supply corrosion repair',
    'Mac Mini liquid damage assessment from R599',
    'Mac Mini M2 Pro liquid damage',
    'Mac Mini USB-C port corrosion repair Johannesburg',
  ],
};

const breadcrumbItems = [
  { label: 'Liquid Damage', href: '/liquid-damage' },
  { label: 'Mac Mini' },
];

const breadcrumbSchemaItems = [
  { name: 'Home', url: 'https://zasupport.com' },
  { name: 'Liquid Damage', url: 'https://zasupport.com/liquid-damage' },
  { name: 'Mac Mini', url: 'https://zasupport.com/liquid-damage/mac-mini' },
];

const faqs = [
  {
    question: 'Can a liquid-damaged Mac Mini be repaired?',
    answer:
      'Yes, in most cases. The Mac Mini houses its logic board, internal power supply, and all I/O controllers in a compact horizontal chassis. Liquid that enters the Mac Mini — typically through rear USB-A, USB-C, HDMI, or Ethernet ports, or directly through the ventilation slots — causes electrolytic corrosion on specific circuits rather than catastrophic board failure. We have repaired M1, M2, M2 Pro, and M4 Mac Mini units with liquid damage at our Hyde Park workshop. Assessment from R599, From R599 assessment.',
  },
  {
    question: 'How does liquid typically enter a Mac Mini?',
    answer:
      'The Mac Mini is a desktop unit that sits on a work surface, which means it is especially vulnerable to desk spills that run across the surface and enter through the rear port cluster. A drink knocked near the Mac Mini can flood the USB-A, USB-C/Thunderbolt, HDMI, Ethernet, and headphone ports simultaneously. The ventilation slots on the bottom of the chassis are a secondary entry point — particularly on office desks where liquids pool underneath the unit. We also see damage from ceiling leaks in Johannesburg offices and load-shedding-related pipe bursts in older commercial buildings.',
  },
  {
    question: 'How does M4 Mac Mini liquid damage differ from M1 and M2?',
    answer:
      'The M4 Mac Mini (model A3136, 2024) uses Apple\'s 3nm chip architecture — the same process node as the M3 MacBook Pro. This brings tighter voltage tolerances, meaning the NAND controller and unified memory channels react more aggressively to contaminated power rails than on M1 (5nm) or M2 (5nm) boards. The M4 also introduced a redesigned port layout with three USB-C/Thunderbolt 4 ports on the rear compared to two on the M2, which increases the surface area vulnerable to simultaneous port corrosion. We test each port controller circuit individually during diagnosis.',
  },
  {
    question: 'My Mac Mini will not power on after liquid exposure — is the internal PSU damaged?',
    answer:
      'Possibly, but not always the PSU itself. The Mac Mini contains an internal power supply board that is separate from the logic board. Liquid reaching the PSU causes corrosion on the AC input filter, PFC controller, or secondary output rails before it reaches the logic board. However, the most common no-power condition we see after Mac Mini liquid exposure is the U3 power management IC on the logic board — which sits in the path of liquid flowing from the rear ports — rather than a destroyed PSU. Our R599 assessment identifies exactly which stage failed before we quote repair.',
  },
  {
    question: 'How much does Mac Mini liquid damage repair cost?',
    answer:
      'Cost depends on which components were affected. A single port controller or Ethernet PHY replacement on an M2 Mac Mini is a relatively contained repair. M2 Pro logic boards carry additional memory channels and a dedicated media engine, which extends diagnostic time. M4 boards require the same 3nm-precision approach we use on M3 MacBook Pros — tighter tolerance work with bench PSU testing before power-on. The internal power supply board, if affected, is assessed separately. All repairs are quoted in writing upfront. Assessment from R599. From R599 assessment applies to every case.',
  },
  {
    question: 'Can you recover data from a water-damaged Mac Mini?',
    answer:
      'Yes, in most cases. M1, M2, and M4 Mac Mini models store data on dedicated NAND flash modules with an Apple custom controller — separate from the SoC. Even when the logic board is beyond economic repair, we can often recover data by reading the NAND directly. If the NAND controller IC was damaged by electrolytic corrosion — which we see more frequently on units left running after liquid exposure — recovery becomes more complex but is still achievable in many cases. We assess NAND integrity during the R599 diagnostic and advise before any work begins.',
  },
  {
    question: 'How long does Mac Mini liquid damage repair take?',
    answer:
      'Assessment is completed within 24 hours of receiving your unit. Port controller or Ethernet PHY replacements typically take 24–48 hours. Logic board ultrasonic cleaning with power management IC work takes 48–72 hours. PSU board involvement or M4 board work with multiple affected circuits may extend to 72–96 hours. We confirm the exact timeline in the written quote before starting any work.',
  },
  {
    question: 'Does AppleCare+ cover liquid damage on the Mac Mini?',
    answer:
      'Standard AppleCare does not cover liquid damage. AppleCare+ covers up to two accidental damage incidents per year, but Apple charges an incident fee and replaces the entire logic board rather than repairing the affected components. A new Mac Mini M2 Pro costs approximately R16,000–R22,000 at retail in South Africa; the M4 model starts at R14,999. Apple\'s board replacement approach is far more expensive than ZA Support\'s component-level repair and does not always preserve your data, serial number, or installed software configuration.',
  },
  {
    question: 'Is it worth repairing a liquid-damaged Mac Mini?',
    answer:
      'In nearly every case, yes. New Mac Mini M4 units start at approximately R14,999 in South Africa; the M4 Pro starts from R25,999. Our component-level repairs typically cost a fraction of replacement and preserve your original data, installed applications, and serial number. The Mac Mini is also commonly used as a server, home lab, or media centre — configurations that take significant time to rebuild from scratch. If repair genuinely is not economical, we tell you honestly during the assessment with beyond the R599 fee.',
  },
  {
    question: 'Do you collect Mac Minis from across Johannesburg?',
    answer:
      'Yes. The Mac Mini is compact and easy to transport. We collect from Sandton, Rosebank, Fourways, Bryanston, Midrand, Randburg, Kempton Park, Morningside, and all surrounding Johannesburg suburbs. We also serve Pretoria and Centurion. For liquid damage, speed is critical — call 064 529 5863 for same-day collection guidance. Alternatively, box the unit and bring it directly to our Hyde Park workshop.',
  },
  {
    question: 'Can load shedding make Mac Mini liquid damage worse?',
    answer:
      'Yes, and it is a pattern we see regularly in our Johannesburg workshop. The Mac Mini draws power through its internal PSU, which conditions the AC mains supply before it reaches the logic board. If the Mac Mini has any existing liquid contamination on the PSU input filter or AC bridge rectifier, the voltage surge that occurs when Eskom power returns after a load-shedding outage can push a marginal corrosion situation into a complete failure. If your Mac Mini was plugged in during an outage after liquid exposure, include that detail when you contact us — it changes our diagnostic approach.',
  },
];

const macMiniFailurePoints = [
  {
    title: 'Internal Power Supply Board Corrosion',
    desc: 'The Mac Mini\'s internal PSU is a unique vulnerability not present in MacBook repairs. Liquid entering from the rear port cluster can reach the PSU board before the logic board, corroding the PFC controller IC, AC input filter capacitors, or the secondary 12V/5V output rails. We see this most commonly in desk spills where liquid runs toward the rear of the unit. A corroded PSU presents as a no-power condition that mimics logic board failure — only component-level testing separates the two. We always assess the PSU and logic board independently.',
    severity: 'high',
  },
  {
    title: 'Rear USB-C / Thunderbolt Controller Cluster',
    desc: 'The M2 Mac Mini (A2686) has two Thunderbolt 4 ports on the rear. The M4 Mac Mini (A3136) has three USB-C/Thunderbolt 4 ports. Each port has a dedicated controller IC. A rear-port flood from a spilled drink corrodes these controllers simultaneously. We replace individual USB-C/Thunderbolt ICs rather than the entire logic board. The M4\'s additional Thunderbolt port means more controller circuits at risk from a single spill event than on any previous Mac Mini.',
    severity: 'high',
  },
  {
    title: 'Ethernet PHY and HDMI Controller',
    desc: 'The Mac Mini is frequently used in wired networking environments, and the Gigabit Ethernet PHY sits in the path of liquid entering the rear port cluster. HDMI port corrosion affects the dedicated HDMI 2.1 controller IC on M2 Pro and M4 models — distinct from the Thunderbolt DisplayPort output path. Both are individually replaceable at component level. We see Ethernet PHY failures presenting as intermittent or absent LAN connectivity weeks after an apparent liquid recovery, as slow corrosion progresses under the IC package.',
    severity: 'high',
  },
  {
    title: 'NAND Controller Voltage Sensitivity (M4)',
    desc: 'On the M4 Mac Mini, Apple\'s 3nm NAND controller operates with tighter power rail tolerances than the M2\'s 5nm equivalent. A contaminated SSD power rail drifting by as little as 0.1V can corrupt the NAND controller firmware state on the M4. We test all storage power rails with a bench power supply before attempting board power-on after any M4 liquid exposure. The M1 and M2 Mac Minis use 5nm NAND controllers with somewhat greater tolerance, but the same principle applies — never apply mains power to a liquid-contaminated Mac Mini.',
    severity: 'high',
  },
  {
    title: 'M2 Pro Dual-Die Memory Bus Traces',
    desc: 'The M2 Pro Mac Mini uses a dual-die memory package with 16 GB or 32 GB of unified RAM. Each die adds memory bus traces across the logic board. Liquid entering the centre ventilation area can corrode multiple memory channels simultaneously, producing persistent ECC errors or kernel panics after cleaning. We address these with targeted trace repair under microscope — the same technique we use on M2 Pro and M3 MacBook Pro memory bus damage. The M4 Pro Mac Mini (where available) uses the same multi-die architecture.',
    severity: 'medium',
  },
  {
    title: 'USB-A Port Corrosion and 5V Rail Contamination',
    desc: 'The Mac Mini (M1 and M2 standard models) includes two USB-A 3.1 ports on the rear. The 5V rail that powers USB-A devices is a common corrosion path — liquid entering a USB-A port loads the 5V bus with electrolytes and damages the overcurrent protection ICs downstream. This presents as USB peripherals not being detected or intermittent device disconnects. On M4 Mac Minis, USB-A has been removed in favour of additional USB-C, but the USB-C 5V bus remains vulnerable through the same corrosion mechanism.',
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
  name: 'Mac Mini Liquid Damage Repair Johannesburg',
  description:
    'Professional Mac Mini liquid damage repair in Johannesburg. M1, M2, M2 Pro, and M4 models. Internal PSU corrosion, port controller replacement, NAND recovery. Assessment from R599. Up-to-3 year warranty.',
});
const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbSchemaItems);

export default function MacMiniLiquidDamagePage() {
  const whatsappUrl = buildWhatsAppUrl('LIQ-MACMINI-HERO', 'liquid-damage');

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
              Mac Mini Liquid Damage
              <br /><span className="text-[#0FEA7A]">Repair Johannesburg</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-4 max-w-3xl leading-relaxed">
              Mac Mini liquid damage is distinct from MacBook repairs — the internal power supply, compact port cluster, and horizontal chassis create unique failure patterns. Whether it is an M1, M2, M2 Pro, or M4, we diagnose at component level and repair only what is broken.
            </p>
            <div className="flex items-center gap-2 text-[#7A9E98] text-sm mb-8">
              <MapPin className="w-4 h-4 text-[#0FEA7A]" />
              <span>1 Hyde Lane, Hyde Park, Office E2004, JHB 2196 | Assessment from R599 | Collection across Johannesburg</span>
            </div>
            <div className="flex flex-wrap gap-3 mb-8">
              {[
                { icon: Shield, label: 'From R599 assessment' },
                { icon: Droplets, label: 'Ultrasonic Cleaning' },
                { icon: Cpu, label: 'M1 / M2 / M2 Pro / M4' },
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

      {/* Why Mac Mini Is Different */}
      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4">
            Why Mac Mini Liquid Damage Is Different
          </h2>
          <div className="space-y-4 text-[#7A9E98] leading-relaxed mb-8">
            <p>
              Most liquid damage tutorials and repair guides focus on MacBooks — but the Mac Mini presents a fundamentally different challenge. The Mac Mini is a desktop unit that sits on a work surface, with its entire rear port cluster exposed horizontally. A drink knocked near the Mac Mini does not trickle through a keyboard first; it enters the port array directly and at volume. We have seen M2 Mac Minis in our Hyde Park workshop where every rear port was flooded simultaneously from a single desk spill — USB-A, USB-C, HDMI, Ethernet, and the headphone jack all showing corrosion at the same time.
            </p>
            <p>
              The second unique factor is the internal power supply. Unlike MacBooks, which draw regulated DC power from an external adapter, the Mac Mini contains its own AC-to-DC power supply board inside the chassis. When liquid reaches the PSU — which sits directly in the path of liquid entering from the rear panel — the consequences are more complex than a simple logic board corrosion event. The AC bridge rectifier, PFC controller, and secondary output regulators all carry live mains voltages at the point of entry. This combination of high voltage and electrolytic contamination accelerates corrosion far faster than the 5V or 12V circuits on a logic board alone.
            </p>
            <p>
              The third pattern we see consistently in Johannesburg is load-shedding interaction. Offices and homes with older plumbing experience pipe bursts or ceiling leaks after Eskom outages — the change in mains pressure when power returns can trigger leaks that were dormant during the outage. We have received multiple M2 and M4 Mac Minis from Sandton and Rosebank offices where a ceiling leak during load shedding saturated the unit while it was powered down, and the owner then powered it on when electricity returned — not realising liquid was still present inside the chassis. Never power on a Mac Mini that may have had any liquid exposure.
            </p>
            <p>
              The M4 Mac Mini (model A3136, launched November 2024) introduces a third USB-C/Thunderbolt 4 port on the rear compared to the M2 model, and adopts Apple&apos;s 3nm chip architecture. The 3nm NAND controller on the M4 operates with tighter power rail tolerances than the 5nm M1 and M2 equivalents — a pattern we know well from M3 MacBook Pro repairs. An M4 Mac Mini that has liquid on its NAND power rail is more likely to enter an unrecoverable storage fault state if powered on than an M2 unit in the same condition. Time from exposure to professional assessment is more critical on the M4 than any previous Mac Mini generation. According to Apple&apos;s chip architecture documentation, the M4 family uses TSMC&apos;s 3nm process with dedicated hardware ray tracing and a new CPU cluster design — all on a board that fits inside a 197mm square chassis.
            </p>
          </div>
          <a
            href="https://www.apple.com/mac-mini/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#0FEA7A] text-sm underline underline-offset-2 hover:text-[#0FEA7A]/80 transition-colors"
          >
            Apple Mac Mini technical specifications ↗
          </a>
        </div>
      </section>

      {/* Mac Mini Failure Points */}
      <section className="py-10 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4">
            Mac Mini Liquid Damage Failure Points
          </h2>
          <p className="text-[#7A9E98] mb-10 max-w-3xl leading-relaxed">
            Based on our repair data from M1, M2, M2 Pro, and M4 Mac Mini liquid damage cases, these are the most common failure patterns. Each is individually diagnosed and repaired at the component level — we do not replace entire logic boards or PSU boards unless every other option is exhausted.
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {macMiniFailurePoints.map((item) => (
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
              All repairs are quoted before work begins. From R599 assessment on every Mac Mini case — if we cannot repair your unit, an assessment fee of R599 applies and the machine is returned as received. Up-to-3 year written warranty on all completed repairs.
            </p>
          </div>
        </div>
      </section>

      {/* Apple vs ZA Support */}
      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-4">
            Apple vs ZA Support: Mac Mini Liquid Damage Repair
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            <div className="glass-card p-6 border border-red-500/20">
              <h3 className="text-red-400 font-bold mb-3">Apple Store / iStore</h3>
              <ul className="text-[#7A9E98] text-sm space-y-2">
                <li>Full logic board replacement — R8,000 to R22,000+</li>
                <li>Liquid damage excluded from standard AppleCare</li>
                <li>AppleCare+ incident fee applies on top</li>
                <li>PSU board assessed separately — additional cost</li>
                <li>Data may not survive board replacement</li>
                <li>5–10 business days via Apple depot repair</li>
              </ul>
            </div>
            <div className="glass-card p-6 border border-[rgba(15,234,122,0.3)]">
              <h3 className="text-[#0FEA7A] font-bold mb-3">ZA Support</h3>
              <ul className="text-[#7A9E98] text-sm space-y-2">
                <li>Component-level repair — only failed parts replaced</li>
                <li>Assessment from R599, repair quoted individually</li>
                <li>PSU board and logic board assessed together</li>
                <li>Data preserved on the same logic board</li>
                <li>M4 3nm precision diagnostics available</li>
                <li>Turnaround 24–72 hours, up-to-3 year warranty</li>
              </ul>
            </div>
          </div>
          <p className="text-[#7A9E98] text-sm leading-relaxed">
            The Mac Mini is increasingly popular in Johannesburg as a home server, small business workstation, and media centre — often running 24 hours a day. We see a higher proportion of Mac Mini liquid damage cases from office environments in Sandton and Rosebank compared to residential cases, and the extended uptime means liquid contamination has often been slowly corroding traces for days before the failure becomes visible. If your Mac Mini is behaving strangely — intermittent Ethernet, USB devices not mounting, display flickering — and there has been any liquid near the desk in recent weeks, bring it in for assessment before the corrosion progresses further.
          </p>
        </div>
      </section>

      {/* Emergency Steps */}
      <section className="py-10 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle className="w-6 h-6 text-[#F5A623]" />
            <p className="text-[#F5A623] text-sm font-semibold uppercase tracking-wider">Mac Mini Emergency Guide</p>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4">
            Liquid Near Your Mac Mini? Do This Now.
          </h2>
          <p className="text-[#7A9E98] leading-relaxed mb-10">
            These steps apply to all Mac Mini models: M1 (A2348), M2 and M2 Pro (A2686), and M4 (A3136). The Mac Mini&apos;s internal mains PSU makes the first action more critical here than on any MacBook.
          </p>
          <div className="space-y-5">
            {[
              {
                step: '1',
                title: 'Unplug the mains power cable immediately — do not use software shutdown',
                detail: 'The Mac Mini contains a live AC mains power supply. Any liquid contacting the PSU input section while the unit is plugged in will carry mains voltage through the electrolyte. Pull the power cable from the wall socket first — before touching anything else. This is the most critical difference between Mac Mini liquid damage response and MacBook response.',
                urgent: true,
              },
              {
                step: '2',
                title: 'Disconnect all cables: USB, Thunderbolt, HDMI, Ethernet, headphones',
                detail: 'Every connected cable is a potential path for corrosion to spread to peripheral devices. USB bus power, Ethernet PoE injection, and HDMI 5V bias lines all remain active as long as the cable is connected and the peripheral is powered. Disconnect everything from the rear port cluster before moving the unit.',
                urgent: true,
              },
              {
                step: '3',
                title: 'Do not tilt the Mac Mini — place it flat and move it carefully',
                detail: 'Unlike a MacBook, the Mac Mini cannot be inverted to drain liquid — its internal PSU and logic board are horizontal. Moving the unit risks redistributing liquid from the port entry points to other board areas. If the unit is already on a wet surface, slide a dry cloth underneath before lifting, and keep it level.',
                urgent: false,
              },
              {
                step: '4',
                title: 'Do not use rice, silica gel, or a hairdryer',
                detail: 'None of these approaches address corrosion that is already occurring on PCB traces and IC pads inside the chassis. Rice absorbs atmospheric humidity, not electrolytic contamination. A hairdryer can drive moisture through the PSU ventilation slots into the board. Silica gel cannot reach the internal components. The only effective intervention is professional ultrasonic cleaning.',
                urgent: true,
              },
              {
                step: '5',
                title: 'Do not power on to test if it still works',
                detail: 'This is the single most damaging mistake we see from Johannesburg Mac Mini owners. Applying mains power to a contaminated PSU drives current through corroding traces and accelerates electrolytic corrosion from borderline damage into permanent failure in minutes. The M4 Mac Mini\'s 3nm NAND controller is particularly vulnerable to a brief contaminated power event. Do not plug in.',
                urgent: true,
              },
              {
                step: '6',
                title: 'Contact ZA Support within 24 hours — 064 529 5863',
                detail: 'Mac Mini corrosion progresses faster than MacBook corrosion because the rear port cluster is directly exposed and the PSU board is in the contamination path. We offer same-day collection across Johannesburg including Sandton, Fourways, Rosebank, Bryanston, Midrand, and Pretoria. Call or WhatsApp 064 529 5863 immediately.',
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
          <FAQAccordion items={faqs} title="Mac Mini Liquid Damage — Common Questions" />
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
              { label: 'MacBook Air Liquid Damage', href: '/liquid-damage/macbook-air' },
              { label: 'iMac Liquid Damage', href: '/liquid-damage/imac' },
              { label: 'Logic Board Repair Hub', href: '/logic-board-repair' },
              { label: 'MacBook Pro M4 Logic Board', href: '/logic-board-repair/macbook-pro-m3' },
              { label: 'Screen Repair', href: '/screen-repair' },
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
              Mac Mini Liquid Damage? Unplug It Now.
            </h2>
            <p className="text-[#7A9E98] mb-6 max-w-xl mx-auto leading-relaxed">
              The Mac Mini&apos;s internal mains PSU makes liquid damage an urgent situation. WhatsApp us now for immediate guidance and same-day collection across Johannesburg. Assessment from R599. From R599 assessment.
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
          <PricingRange page="/liquid-damage/mac-mini" />
          <PricingNote />
        </div>
      </section>

    </>
  );
}
