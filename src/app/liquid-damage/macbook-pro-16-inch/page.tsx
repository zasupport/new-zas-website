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
  title: 'MacBook Pro 16-Inch Liquid Damage Repair Johannesburg [2026] | From R599 | ZA Support',
  description:
    'MacBook Pro 16-inch liquid damage repair Johannesburg. M1 Max, M2 Max, M3 Max specialists. 140W MagSafe 3, HDMI, SD slot corrosion repair. Assessment from R599. No Fix No Fee.',
  alternates: { canonical: 'https://zasupport.com/liquid-damage/macbook-pro-16-inch' },
  keywords: [
    'MacBook Pro 16 inch liquid damage repair Johannesburg',
    'MacBook Pro 16 inch water damage repair',
    'MacBook Pro 16 spill repair Johannesburg',
    'MacBook Pro 16 inch corrosion repair Hyde Park',
    'liquid damaged MacBook Pro 16 fix',
    'MacBook Pro 16 inch HDMI port water damage',
    'MacBook Pro 16 SD card slot liquid damage Johannesburg',
    'MacBook Pro 16 inch liquid damage assessment from R599',
    'MacBook Pro 16 M1 Max liquid damage',
    'MacBook Pro 16 M3 Max liquid damage repair',
  ],
};

const breadcrumbItems = [
  { label: 'Liquid Damage', href: '/liquid-damage' },
  { label: 'MacBook Pro', href: '/liquid-damage/macbook-pro' },
  { label: '16-Inch' },
];

const breadcrumbSchemaItems = [
  { name: 'Home', url: 'https://zasupport.com' },
  { name: 'Liquid Damage', url: 'https://zasupport.com/liquid-damage' },
  { name: 'MacBook Pro', url: 'https://zasupport.com/liquid-damage/macbook-pro' },
  { name: 'MacBook Pro 16-Inch', url: 'https://zasupport.com/liquid-damage/macbook-pro-16-inch' },
];

const faqs = [
  {
    question: 'Can a liquid-damaged MacBook Pro 16-inch be repaired?',
    answer:
      'Yes, in most cases. The MacBook Pro 16-inch — across the 2021 M1 Pro/Max (A2485), 2023 M2 Pro/Max (A2780), and 2023 M3 Pro/M3 Max (A2991) generations — uses Apple Silicon chips alongside discrete peripheral controller ICs for USB-C, MagSafe 3, HDMI 2.1, and SD card connectivity. These controllers are individually replaceable at component level. A full logic board replacement is rarely necessary and is never our first recommendation. We have repaired all three 16-inch generations at our Hyde Park workshop. Assessment from R599, No Fix No Fee on every case.',
  },
  {
    question: 'Why is the MacBook Pro 16-inch higher-risk during a liquid event than smaller MacBooks?',
    answer:
      'Three factors combine to make the 16-inch a higher-stakes repair. First, it is exclusively available in Pro and Max chip variants — no base-tier model — meaning every 16-inch carries a higher-complexity logic board. Second, the 99.6 Wh battery is the largest Apple puts in a laptop, and when MagSafe is connected at 140W, the charging traces carry more current than any other MacBook model. More current through a contaminated trace means faster and deeper electrolytic corrosion. Third, the 16-inch is almost always used as a desktop replacement with HDMI, Thunderbolt monitors, and SD cards simultaneously active — all ingress points powered at the time of a spill.',
  },
  {
    question: 'My MacBook Pro 16-inch will not charge after a spill — is it repairable?',
    answer:
      'Almost certainly yes. A no-charge condition after liquid exposure on the 16-inch typically points to the MagSafe 3 charging controller or a USB-C charging IC, not the Apple Silicon SoC. The 16-inch MagSafe 3 connector supports 140W on all models — the charging IC and the traces feeding it are sized for higher current than on the 14-inch, but this also means liquid-induced oxidation on those traces can produce a no-charge fault even when only a small surface area is affected. Our R599 assessment uses a thermal camera and oscilloscope to pinpoint exactly which charging circuit is the fault source before any repair is quoted.',
  },
  {
    question: 'How much does MacBook Pro 16-inch liquid damage repair cost in Johannesburg?',
    answer:
      'Cost depends on which generation (M1 Pro/Max, M2 Pro/Max, M3 Pro/Max) and which circuits the liquid reached. A MagSafe or USB-C controller replacement is at the lower end of the range. HDMI controller corrosion, multi-channel memory bus contamination on an M1 Max or M3 Max board, or SSD controller trace damage on a high-capacity configuration requires more targeted work. Every repair is quoted in writing after the R599 assessment — you know the cost before we start. No Fix No Fee means if we cannot repair the machine, you only pay the assessment fee.',
  },
  {
    question: 'Can you recover data from a water-damaged MacBook Pro 16-inch?',
    answer:
      'Yes, in most cases. All MacBook Pro 16-inch models store data on Apple-proprietary NAND flash with a custom NVMe controller soldered to the logic board. Even when the board itself is beyond economic repair, we can access the NAND directly in many cases. The main risk is corrosion penetrating the NVMe controller registers — most common when the machine was powered on or left without repair for more than 72 hours after the liquid event. Data recovery potential is assessed during the R599 diagnostic at no additional charge. The 16-inch can be configured with up to 8 TB of internal SSD, and we have successfully recovered data from M2 Max boards with severe right-side corrosion.',
  },
  {
    question: 'How long does MacBook Pro 16-inch liquid damage repair take?',
    answer:
      'Diagnostic assessment is completed within 24 hours of receiving your machine. Simple repairs — MagSafe port cleaning, USB-C controller replacement, SD card contact cleaning — take 24-48 hours. HDMI controller replacement or multi-circuit ultrasonic cleaning with rework takes 48-72 hours. M1 Max and M3 Max boards with multi-die memory bus involvement may take 72-96 hours. The larger board surface of the 16-inch requires a thorough multi-pass ultrasonic clean compared to the 14-inch, which extends cleaning time slightly. We confirm the exact timeline in writing before starting any repair work.',
  },
  {
    question: 'What does Apple charge for a 16-inch MacBook Pro liquid damage repair?',
    answer:
      'Apple classifies liquid damage as accidental damage. Without AppleCare+, a 16-inch MacBook Pro logic board replacement through Apple or an Apple Authorised Service Provider costs between R32,000 and R80,000 depending on configuration — with M3 Max 48 GB or 128 GB memory options at the higher end. With AppleCare+, an accidental damage incident fee of approximately R4,500 applies, but Apple replaces the entire logic board and data recovery is not guaranteed. ZA Support replaces only the failed component, preserves your data, and repairs at a fraction of the Apple price.',
  },
  {
    question: 'Does the HDMI 2.1 port on the MacBook Pro 16-inch get damaged by liquid?',
    answer:
      'Yes, and the failure pattern is almost identical to the 14-inch — but with one important difference. The 16-inch HDMI 2.1 port shares the right-side port cluster with the SD card slot and a Thunderbolt 4 port. Liquid entering the HDMI port on the 16-inch can track to both the HDMI controller IC and the adjacent Thunderbolt controller simultaneously, because the port spacing on the larger chassis places these controllers in closer proximity on the right side of the board. We have repaired 16-inch MacBook Pros with a combined HDMI-plus-right-Thunderbolt fault from a single right-side desk spill. Both controllers are individually replaceable.',
  },
  {
    question: 'Is the MacBook Pro 16-inch SD card slot vulnerable to liquid damage?',
    answer:
      'Yes. The SD card slot on the 16-inch uses UHS-II — a 9-pin interface operating at high bus speeds. The slot on the right edge feeds directly to a dedicated SD controller IC on the logic board. When liquid enters through the slot, corrosion starts at the SD bus pins and tracks toward the controller. We frequently see 16-inch MacBook Pros where the SD card fault was the first symptom, but by the time the owner contacted us, the corrosion had spread to the adjacent Thunderbolt controller on the right side. If your SD slot stopped working after a spill, bring the machine to us immediately — do not wait for other symptoms.',
  },
  {
    question: 'Does load shedding affect liquid-damaged MacBook Pro 16-inch repair outcomes?',
    answer:
      'In our Johannesburg workshop, we see this specific pattern regularly with the 16-inch: the machine is connected to a monitor via HDMI, charging at 140W via MagSafe, and has a Thunderbolt peripheral active when a spill occurs. The owner powers the machine off and waits — and then an Eskom stage cut ends overnight. Power returns, the MagSafe charger reconnects automatically, and the voltage surge on already-contaminated charging traces completes a corrosion failure that might otherwise have been reversible. If your MacBook Pro 16-inch was plugged in during a load shedding event after liquid exposure, tell us — it changes how we sequence the diagnostic.',
  },
  {
    question: 'Do you collect MacBook Pro 16-inch machines from across Johannesburg?',
    answer:
      'Yes. We collect from Sandton, Rosebank, Fourways, Bryanston, Midrand, Randburg, Kempton Park, Morningside, Rivonia, Sunninghill, Parkhurst, Northcliff, Houghton, and all surrounding Johannesburg suburbs. We also serve Pretoria and Centurion. For liquid damage, speed determines outcome — call or WhatsApp 064 529 5863 for same-day collection. We treat every M3 Max 16-inch liquid damage call as urgent. Most Johannesburg suburb collections can be arranged within a few hours of your call.',
  },
  {
    question: 'What makes the M3 Max 16-inch board more complex to repair after liquid damage?',
    answer:
      'The M3 Max in the 2023 16-inch MacBook Pro (A2991) is built on TSMC 3nm process with up to 92 GPU cores and 128 GB of unified memory across multiple LPDDR5X dies. The tighter process node means voltage tolerances are narrower — contaminated power rails that the older M1 Max board might tolerate can cause PMIC faults on an M3 Max. The multi-die memory configuration also means liquid that reaches the centre of the board can affect multiple memory channels simultaneously, producing kernel panics and ECC errors that do not point directly to the actual liquid entry point. Our diagnostic uses thermal imaging to map the exact contamination zone on the board before we start any rework.',
  },
];

const failurePoints = [
  {
    title: 'MagSafe 3 140W Charging Circuit',
    desc: 'The MacBook Pro 16-inch charges at up to 140W via MagSafe 3 on all models — the highest wattage MagSafe implementation Apple has made. Higher current through the charging traces means electrolytic corrosion accelerates faster than on lower-wattage MacBooks when liquid is present. The MagSafe connector sits at the left rear corner of the chassis, and liquid entering from the left fan vent or left side can reach the charging IC within seconds on a machine that is plugged in. We diagnose the full MagSafe charging path from connector through PMIC using oscilloscope and thermal camera, not visual inspection alone.',
    severity: 'high',
  },
  {
    title: 'HDMI 2.1 Controller and Adjacent Thunderbolt IC',
    desc: 'On the 16-inch, the HDMI port and the right Thunderbolt 4 port share a closely packed right-panel section of the logic board. The HDMI 2.1 controller IC and the right Thunderbolt controller are adjacent on the board, meaning liquid entering through either port can cross-contaminate both ICs. We have repaired 16-inch MacBook Pros presenting as a dead HDMI port that also had intermittent right Thunderbolt — both faults from a single liquid ingress event. The HDMI 2.1 controller handles 48 Gbps signalling; partial corrosion on these high-frequency traces causes signal integrity failure before visible oxidation appears. Both ICs are individually replaceable.',
    severity: 'high',
  },
  {
    title: 'SD Card Slot and UHS-II Controller',
    desc: 'The SD card slot on the 16-inch MacBook Pro uses UHS-II — a 9-pin high-speed interface. The slot is one of the most direct liquid ingress points on the right side of the chassis. Liquid entering through the SD slot tracks along the bus traces to the SD controller IC, which sits adjacent to the right Thunderbolt controller on the logic board. A right-side desk spill entering through the SD slot has the potential to affect three separate controllers: SD, Thunderbolt-right, and in some cases the HDMI IC. We test all right-side controllers as part of every 16-inch assessment, not just the one with the obvious symptom.',
    severity: 'high',
  },
  {
    title: 'Multi-Die Unified Memory Bus (M1 Max / M2 Max / M3 Max)',
    desc: 'The 16-inch is exclusively available in Pro and Max variants — and on Max models, the unified memory spans multiple LPDDR5 or LPDDR5X dies: M1 Max uses two dies (32/64 GB), M2 Max uses two LPDDR5X dies (32/96 GB), and M3 Max uses up to four dies (36/48/64/96/128 GB). Each additional die adds memory bus traces across the logic board. A centre-deck spill on an M3 Max 16-inch can corrode multiple memory channels simultaneously, producing kernel panics, ECC-logged errors, and display artefacts that appear unrelated to a liquid event. We repair individual trace faults under microscope and retest memory stability before returning any Max board.',
    severity: 'high',
  },
  {
    title: 'Large-Format Liquid Retina XDR Display Backlight Driver',
    desc: 'The 16.2-inch Liquid Retina XDR display uses a mini-LED backlight array with a dedicated backlight driver IC near the hinge connector. The larger panel area compared to the 14-inch means the backlight driver handles more zones and draws more current. Liquid that enters from the keyboard deck area can reach the display connector and corrode the backlight driver IC. The failure presents as partial backlight loss — bright zones alternate with dark patches — while the display content itself remains intact. The driver IC is individually replaceable. We test the display connector, driver, and backlight power path before recommending any panel-level action.',
    severity: 'medium',
  },
  {
    title: 'Left Thunderbolt 4 Controller Pair',
    desc: 'The 16-inch MacBook Pro carries two Thunderbolt 4 ports on the left side, managed by a dedicated left-side Thunderbolt controller IC. Left-side liquid ingress — from a spill that crosses the left fan vent or left keyboard edge — can corrode both left Thunderbolt ports simultaneously, along with the MagSafe charging circuit in the same vicinity. Left-side faults on the 16-inch therefore tend to be multi-circuit: we regularly see combined left-Thunderbolt-plus-no-charge presentations from a single left-side coffee spill. Each circuit is diagnosed and quoted individually.',
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
  name: 'MacBook Pro 16-Inch Liquid Damage Repair Johannesburg',
  description:
    'Professional MacBook Pro 16-inch liquid damage repair in Johannesburg. M1 Max, M2 Max, M3 Max specialists. HDMI 2.1, SD card, MagSafe 3 140W, and Thunderbolt 4 corrosion repair. Assessment from R599. Up-to-3 year warranty.',
});
const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbSchemaItems);

export default function MacBookPro16InchLiquidDamagePage() {
  const whatsappUrl = buildWhatsAppUrl('LIQ-MBP16-HERO', 'liquid-damage');

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
              MacBook Pro 16-Inch Liquid Damage
              <br /><span className="text-[#0FEA7A]">Repair Johannesburg</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-4 max-w-3xl leading-relaxed">
              The MacBook Pro 16-inch is Apple&apos;s most powerful laptop — and its 140W MagSafe 3 charging, HDMI 2.1 port, SD card slot, and three Thunderbolt 4 ports create multiple high-current liquid ingress points. We repair all three generations (M1 Pro/Max, M2 Pro/Max, M3 Pro/Max) at component level, at a fraction of the Apple Store board-replacement cost.
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

      {/* Why 16-Inch Is Different */}
      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4">
            Why MacBook Pro 16-Inch Liquid Damage Demands Immediate Action
          </h2>
          <div className="space-y-4 text-[#7A9E98] leading-relaxed mb-8">
            <p>
              When Apple launched the 16-inch MacBook Pro alongside the 14-inch in October 2021, both models shared the same port layout — HDMI 2.1, SD card slot, three Thunderbolt 4 ports, and MagSafe 3. But the 16-inch is a different machine in one critical respect: it has never been available with a base-tier chip. Every 16-inch carries either a Pro or Max variant, and every Max variant uses a multi-die unified memory configuration. In our Hyde Park workshop, the 16-inch consistently presents the most complex liquid damage scenarios we handle.
            </p>
            <p>
              The 99.6 Wh battery is part of why. The 16-inch carries Apple&apos;s largest laptop battery, and when MagSafe is connected at its maximum 140W output, the charging traces on the logic board carry more current than any other MacBook model. Current and liquid are a damaging combination — electrolytic corrosion on a high-current charging trace accelerates geometrically. A 16-inch MacBook Pro that was actively charging at 140W when a spill occurred will corrode more aggressively in the first hour than a 13-inch MacBook Air drawing a fraction of that current.
            </p>
            <p>
              The 16-inch is also overwhelmingly used as a desktop replacement. In our experience, the majority of 16-inch MacBook Pros that come to us for liquid damage were connected to an external display via HDMI, charging via MagSafe, and had at least one Thunderbolt peripheral active at the time of the spill. That means all five liquid ingress points were simultaneously connected to powered circuits. When you disconnect nothing before the liquid reaches the board, every port becomes an active corrosion pathway.
            </p>
            <p>
              The M3 Max generation (A2991, late 2023) introduces an additional complexity. Built on TSMC&apos;s 3nm process with up to 92 GPU cores and 128 GB of unified LPDDR5X memory across four separate dies, the M3 Max has voltage tolerances narrower than the M1 Max or M2 Max. Contaminated power rails that the M1 Max board might tolerate without immediate failure can trigger PMIC faults and kernel panics on the M3 Max within minutes of power-on. We treat every 16-inch M3 Max liquid damage call as an emergency regardless of how minor the spill appears.
            </p>
            <p>
              The good news is that the Apple Silicon SoC itself — the M1 Pro, M2 Max, M3 Max die — almost never fails directly from liquid damage in our experience. The peripheral controller ICs corrode first: the MagSafe charging IC, the HDMI controller, the SD controller, the Thunderbolt ICs. Every one of these is individually replaceable. A 16-inch MacBook Pro that appears completely dead after a spill can, in many cases, be returned to full function without replacing any core component. The assessment from R599 confirms exactly what has failed before we commit to any repair work.
            </p>
            <p>
              One more Johannesburg-specific factor: the 16-inch is commonly used by video editors, developers, and architects who cannot afford machine downtime. We prioritise 16-inch liquid damage assessments for exactly this reason. Same-day collection is available across Johannesburg — call 064 529 5863 immediately.
            </p>
          </div>
          <a
            href="https://www.apple.com/macbook-pro/specs/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#0FEA7A] text-sm underline underline-offset-2 hover:text-[#0FEA7A]/80 transition-colors"
          >
            Apple MacBook Pro 16-inch official specifications ↗
          </a>
        </div>
      </section>

      {/* Failure Points */}
      <section className="py-10 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4">
            MacBook Pro 16-Inch Liquid Damage Failure Points
          </h2>
          <p className="text-[#7A9E98] mb-10 max-w-3xl leading-relaxed">
            Based on our repair data across M1 Pro, M1 Max, M2 Pro, M2 Max, M3 Pro, and M3 Max 16-inch MacBook Pro cases, these are the most common failure patterns. Each is individually diagnosed and repaired at component level.
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
              All repairs are quoted before work begins. No Fix No Fee on every 16-inch case — if we cannot repair your MacBook Pro, an assessment fee of R599 applies and the machine is returned as received. Up-to-3 year written warranty on all completed repairs.
            </p>
          </div>
        </div>
      </section>

      {/* Apple vs ZA Support */}
      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-4">
            Apple vs ZA Support: 16-Inch Liquid Damage Repair
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            <div className="glass-card p-6 border border-red-500/20">
              <h3 className="text-red-400 font-bold mb-3">Apple Store / iStore</h3>
              <ul className="text-[#7A9E98] text-sm space-y-2">
                <li>Full logic board replacement — R32,000 to R80,000</li>
                <li>Liquid damage excluded from standard AppleCare</li>
                <li>AppleCare+ incident fee approximately R4,500</li>
                <li>Data may not survive board replacement</li>
                <li>5-10 business days via Apple depot repair</li>
                <li>Component-level diagnosis not available</li>
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
            The 16-inch MacBook Pro is often the centrepiece of a professional workstation — external display, MagSafe charging, Thunderbolt storage, and sometimes HDMI simultaneously. In our Johannesburg workshop, we see this configuration regularly, and we understand why the machine cannot be offline for a week. Our typical 16-inch liquid damage assessment is completed within 24 hours, and most single-circuit repairs are returned within 48-72 hours. Load shedding in Johannesburg adds a specific complication: if power returned overnight while your contaminated 16-inch was still plugged in via MagSafe, the voltage transient on corroded charging traces can escalate the fault. Tell us if Eskom was involved — it matters to how we start the diagnostic.
          </p>
        </div>
      </section>

      {/* Emergency Steps */}
      <section className="py-10 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle className="w-6 h-6 text-[#F5A623]" />
            <p className="text-[#F5A623] text-sm font-semibold uppercase tracking-wider">16-Inch Emergency Guide</p>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4">
            Spilled Liquid on Your MacBook Pro 16-Inch?
          </h2>
          <p className="text-[#7A9E98] leading-relaxed mb-10">
            These steps apply to all 16-inch MacBook Pro generations: A2485 (M1 Pro/Max, 2021), A2780 (M2 Pro/Max, 2023), and A2991 (M3 Pro/Max, late 2023).
          </p>
          <div className="space-y-5">
            {[
              {
                step: '1',
                title: 'Force power off immediately — hold Touch ID for 10 seconds',
                detail: 'Do not attempt a normal shutdown. Apple Silicon MacBook Pros continue drawing power through all peripheral controllers — HDMI, Thunderbolt, SD, MagSafe — even in sleep mode. Force power-off removes voltage from every trace simultaneously. On the 16-inch specifically, where MagSafe may be delivering 140W and HDMI or Thunderbolt peripherals are active, every second of continued power accelerates corrosion on contaminated traces. This is the single most important action in the first 60 seconds.',
                urgent: true,
              },
              {
                step: '2',
                title: 'Disconnect MagSafe, all USB-C cables, and the HDMI cable',
                detail: 'The 16-inch is almost always connected to more cables than smaller MacBooks. Disconnect MagSafe first — it is delivering the most current. Then disconnect HDMI, all Thunderbolt cables, and any USB-C accessories. The HDMI port carries a 5V hotplug detect line that remains live regardless of machine power state. Every active cable is a powered corrosion pathway. Do not leave anything connected.',
                urgent: true,
              },
              {
                step: '3',
                title: 'Remove the SD card if one is inserted',
                detail: 'The 16-inch SD slot uses the UHS-II interface — a 9-pin high-speed bus. If an SD card is inserted during a spill, the bus is active and liquid on the SD pins can cause a short across the data lines. Remove the card before inverting the machine, but do so carefully and without powering on to trigger a software eject.',
                urgent: false,
              },
              {
                step: '4',
                title: 'Tilt the machine so liquid drains away from the port cluster',
                detail: 'The 16-inch logic board sits beneath the keyboard deck. Inverting the machine keyboard-down lets liquid drain toward the keyboard membrane and away from the logic board beneath it. If the spill entered from the right side — through the HDMI port, SD slot, or right Thunderbolt port — tilt the right side downward to draw liquid away from the board\'s port cluster. The 16-inch chassis is larger, so liquid has more surface area to travel; correct tilting in the first few minutes can limit contamination spread.',
                urgent: false,
              },
              {
                step: '5',
                title: 'Do not power on to test — even briefly',
                detail: 'We hear this more often from 16-inch owners than any other model: "I just wanted to see if it still worked." Applying power to a contaminated 16-inch board drives current through every corroded trace simultaneously. The 140W charging architecture means the voltage and current levels on the board are higher than on any other MacBook — which means electrolysis of liquid residue into copper oxides happens faster and more aggressively. Thirty seconds of powered-on testing can convert a cleanable fault into an unrepairable one.',
                urgent: true,
              },
              {
                step: '6',
                title: 'Do not use rice, silica gel, a hairdryer, or an oven',
                detail: 'We see all four of these attempted on 16-inch MacBook Pros in Johannesburg. None are effective once liquid has reached the logic board beneath the keyboard deck. Rice absorbs ambient humidity but cannot remove contamination from BGA pad surfaces. Silica gel is similarly passive. A hairdryer can drive moisture further under the BGA underfill and delaminate the chassis adhesive on the 16-inch\'s larger board. An oven will destroy the machine. Active corrosion on PCB traces requires ultrasonic cleaning with specialist solution.',
                urgent: true,
              },
              {
                step: '7',
                title: 'Contact ZA Support within 24 hours — 064 529 5863',
                detail: 'Recovery rates for liquid-damaged MacBook Pro 16-inch drop significantly after 48 hours. After 72 hours, corrosion on unprotected copper traces can penetrate BGA underfill and cause permanent pad damage. We offer same-day collection from Sandton, Fourways, Rosebank, Bryanston, Midrand, Kempton Park, and all Johannesburg suburbs. For M3 Max boards, every case is treated as urgent. Call or WhatsApp 064 529 5863 now.',
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
          <FAQAccordion items={faqs} title="MacBook Pro 16-Inch Liquid Damage — Common Questions" />
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
              { label: 'MacBook Pro 14-Inch Liquid Damage', href: '/liquid-damage/macbook-pro-14-inch' },
              { label: 'MacBook Pro 13-Inch Liquid Damage', href: '/liquid-damage/macbook-pro-13-inch' },
              { label: 'MacBook Pro M3 Liquid Damage', href: '/liquid-damage/macbook-pro-m3' },
              { label: 'MacBook Pro M2 Liquid Damage', href: '/liquid-damage/macbook-pro-m2' },
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
              MacBook Pro 16-Inch Liquid Damage? Every Hour Counts.
            </h2>
            <p className="text-[#7A9E98] mb-6 max-w-xl mx-auto leading-relaxed">
              The 16-inch&apos;s 140W charging architecture and Max-tier logic boards make liquid damage more time-critical than any other MacBook. WhatsApp us now for immediate guidance and same-day collection across Johannesburg. Assessment from R599. No Fix No Fee.
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
          <PricingRange page="/liquid-damage/macbook-pro-16-inch" />
          <PricingNote />
        </div>
      </section>

    </>
  );
}
