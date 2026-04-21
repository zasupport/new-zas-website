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
  title: 'MacBook Pro M3 Liquid Damage Repair Johannesburg [2026] | From R599 | ZA Support',
  description:
    'MacBook Pro M3 liquid damage repair Johannesburg. 3nm chip, MagSafe 3 port corrosion, NAND recovery. Assessment from R599. From R599 assessment. Hyde Park workshop.',
  alternates: { canonical: 'https://zasupport.com/liquid-damage/macbook-pro-m3' },
  keywords: [
    'MacBook Pro M3 liquid damage repair Johannesburg',
    'MacBook Pro M3 water damage repair',
    'M3 MacBook Pro spill repair Johannesburg',
    'MacBook Pro M3 corrosion repair Hyde Park',
    'liquid damaged MacBook Pro M3 fix',
    'MacBook Pro M3 keyboard spill repair',
    'M3 MacBook Pro coffee spill repair Johannesburg',
    'MacBook Pro M3 liquid damage assessment from R599',
    'MacBook Pro M3 Pro liquid damage',
    'MacBook Pro M3 Max liquid damage repair',
  ],
};

const breadcrumbItems = [
  { label: 'Liquid Damage', href: '/liquid-damage' },
  { label: 'MacBook Pro', href: '/liquid-damage/macbook-pro' },
  { label: 'M3' },
];

const breadcrumbSchemaItems = [
  { name: 'Home', url: 'https://zasupport.com' },
  { name: 'Liquid Damage', url: 'https://zasupport.com/liquid-damage' },
  { name: 'MacBook Pro', url: 'https://zasupport.com/liquid-damage/macbook-pro' },
  { name: 'MacBook Pro M3', url: 'https://zasupport.com/liquid-damage/macbook-pro-m3' },
];

const faqs = [
  {
    question: 'Can a liquid-damaged MacBook Pro M3 be repaired?',
    answer:
      'Yes, in most cases. The M3 MacBook Pro uses Apple\'s 3nm chip architecture — the densest consumer silicon ever produced. While this makes component-level work more exacting, it also means peripheral circuits such as USB-C controllers, power management ICs, and MagSafe charging rails remain individually replaceable. We have repaired MacBook Pro M3, M3 Pro, and M3 Max machines with liquid damage at our Hyde Park workshop. Assessment from R599, From R599 assessment.',
  },
  {
    question: 'How does M3 liquid damage differ from M2 and M1?',
    answer:
      'The M3 chip is built on TSMC\'s 3nm process, which uses tighter voltage tolerances than the 5nm M2 and 8nm M1. The M3 MacBook Pro also introduced a revised board layout with the MagSafe 3 connector repositioned closer to the left speaker assembly — a combination that we have seen lead to faster corrosion spread when liquid enters from the left side. The M3 Pro and M3 Max variants add a dedicated media engine and additional memory channels, which means more signal traces at risk from lateral corrosion.',
  },
  {
    question: 'My MacBook Pro M3 will not turn on after a spill — is it repairable?',
    answer:
      'Very likely yes. A no-power condition after liquid exposure on the M3 MacBook Pro usually points to the U9200 power management IC or the MagSafe/USB-C charging controllers rather than the M3 SoC itself. The SoC is one of the most protected components on the board due to its central placement and underfill. We see the SoC survive the vast majority of spills. Our R599 assessment identifies exactly which circuits are affected before we quote repair.',
  },
  {
    question: 'How much does MacBook Pro M3 liquid damage repair cost?',
    answer:
      'Costs vary by extent of damage. A MagSafe port cleaning or USB-C controller replacement on an M3 base model is the most straightforward case. M3 Pro boards with NAND or power management IC involvement require more work. M3 Max boards carry additional memory channels and a second media engine, which extends diagnostic time. All repairs are quoted in writing upfront. Assessment from R599. From R599 assessment applies to every case.',
  },
  {
    question: 'Can you recover data from a water-damaged MacBook Pro M3?',
    answer:
      'Yes, in most cases. The M3 MacBook Pro stores data on dedicated NAND flash modules with an Apple custom controller. Even when the logic board is beyond economic repair, we can often recover data by reading the NAND directly. If the NAND controller IC itself was damaged by electrolytic corrosion — which we see more on M3 boards left untreated for several days — recovery becomes more complex but is still possible in many cases. We assess data recovery potential during the R599 diagnostic.',
  },
  {
    question: 'How long does MacBook Pro M3 liquid damage repair take?',
    answer:
      'Assessment is completed within 24 hours of receiving your machine. Simple repairs such as MagSafe port cleaning or peripheral connector replacement take 24-48 hours. Logic board ultrasonic cleaning with component-level work typically takes 48-72 hours. NAND recovery or M3 Max board work with multiple affected circuits may take 72-96 hours. We confirm the exact timeline in the written quote before starting any work.',
  },
  {
    question: 'Does AppleCare+ cover liquid damage on the MacBook Pro M3?',
    answer:
      'Standard AppleCare does not cover liquid damage. AppleCare+ covers up to two accidental damage incidents per year, but Apple charges an incident fee of approximately R4,500 for a MacBook Pro and replaces the entire logic board — not just the affected components. A new MacBook Pro M3 logic board at Apple costs between R25,000 and R65,000 depending on the configuration. ZA Support repairs only the failed components, preserving your data and costing a fraction of Apple\'s approach.',
  },
  {
    question: 'Is it worth repairing a liquid-damaged MacBook Pro M3?',
    answer:
      'In nearly every case, yes. A new MacBook Pro M3 retails from R28,000 to R75,000 in South Africa depending on specification. Our component-level repairs typically cost significantly less than replacement. We also preserve your original data, your installed software, and your machine\'s serial number — none of which survive an Apple board swap. If repair genuinely is not economical, we tell you honestly during the assessment with beyond the R599 fee.',
  },
  {
    question: 'What makes MagSafe 3 liquid damage different on the M3?',
    answer:
      'MagSafe 3 uses a higher-current charging circuit than USB-C Power Delivery. When liquid enters the MagSafe port on an M3 MacBook Pro, the combination of the magnetic retention field and the higher current draw accelerates electrolytic corrosion along the charging traces. We have seen M3 machines where the MagSafe connector itself looked pristine but the charging IC 30mm away on the board had already corroded. Our diagnostic covers the full charging path, not just the port.',
  },
  {
    question: 'Do you collect M3 MacBook Pros from across Johannesburg?',
    answer:
      'Yes. We collect from Sandton, Rosebank, Fourways, Bryanston, Midrand, Randburg, Kempton Park, Morningside, and all surrounding Johannesburg suburbs. For liquid damage, speed is critical — call 064 529 5863 for same-day collection. We also serve Pretoria and Centurion.',
  },
];

const m3FailurePoints = [
  {
    title: 'MagSafe 3 Port Accelerated Corrosion',
    desc: 'The M3 MacBook Pro moved MagSafe 3 closer to the left speaker compared to earlier models, and the higher-current charging circuit means any liquid that contacts the port corrodes the charging IC faster than on M2 machines. We have seen the U6900 charging controller fail within 48 hours of a small left-side spill. The port itself can look clean while the board traces behind it are already compromised — a deceptive presentation that requires oscilloscope-level diagnosis.',
    severity: 'high',
  },
  {
    title: '3nm NAND Controller Voltage Sensitivity',
    desc: 'Apple\'s M3 chip is built on TSMC\'s 3nm N3B process, which tightened memory bus tolerances to achieve the performance uplift over M2. The NAND flash controller on the M3 is measurably more sensitive to power rail contamination than on the M2. A spike of even 0.1V on a contaminated storage power rail can corrupt the controller\'s firmware state. We test every storage power rail with a bench power supply before attempting board power-on after liquid exposure.',
    severity: 'high',
  },
  {
    title: 'M3 Pro / M3 Max Multi-Die Memory Channels',
    desc: 'The M3 Pro uses a dual-die memory package with 18 or 36 GB of unified RAM, and the M3 Max uses a quad-die configuration. Each die adds memory bus traces across the board. Liquid that reaches the memory bus area — typically from a centre-keyboard spill — can corrode multiple channels simultaneously. We see this manifest as persistent kernel panics or RAM errors even after cleaning, requiring individual trace repair under microscope.',
    severity: 'high',
  },
  {
    title: 'USB-C / Thunderbolt 4 Controller Corrosion',
    desc: 'The M3 MacBook Pro 14-inch carries three Thunderbolt 4 ports (two left, one right on M3 Pro/Max) controlled by dedicated USB-C IC pairs. Liquid entering any port corrodes the controller pair responsible for that side. We replace individual USB-C controllers rather than the entire board. The M3 base model has two Thunderbolt 3 ports — same repair approach, slightly simpler layout.',
    severity: 'medium',
  },
  {
    title: 'Display Connector and ProMotion Backlight Driver',
    desc: 'The M3 Pro and M3 Max MacBook Pros feature Liquid Retina XDR displays with ProMotion 120Hz and a dedicated backlight driver IC. Liquid near the display connector — common in hinge-area spills — corrodes this driver, causing the backlight to fail at full brightness or flicker during ProMotion transitions. The driver IC is individually replaceable. The display connector itself is cleaned and tested before replacement is considered.',
    severity: 'medium',
  },
  {
    title: 'Audio Codec and Media Engine Circuits',
    desc: 'The M3 chip includes a hardware media engine (two engines on M3 Max) whose control signals run adjacent to the audio codec IC. Large spills that reach the centre-left of the M3 board can affect both simultaneously, producing audio failure alongside video encoding errors. Both are separately diagnosable. The audio codec is replaced at component level; media engine faults in the SoC itself are assessed for functional impact before quoting.',
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
  name: 'MacBook Pro M3 Liquid Damage Repair Johannesburg',
  description:
    'Professional MacBook Pro M3 liquid damage repair in Johannesburg. 3nm chip specialist, MagSafe 3 corrosion recovery, ultrasonic cleaning, component-level repair. Assessment from R599. Up-to-3 year warranty.',
  lowPrice: '5700',
  highPrice: '19950',
});
const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbSchemaItems);

export default function MacBookProM3LiquidDamagePage() {
  const whatsappUrl = buildWhatsAppUrl('LIQ-MBPM3-HERO', 'liquid-damage');

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
              MacBook Pro M3 Liquid Damage
              <br /><span className="text-[#0FEA7A]">Repair Johannesburg</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-4 max-w-3xl leading-relaxed">
              Apple&apos;s 3nm M3 chip brings tighter voltage tolerances that make liquid damage more time-critical than on any previous MacBook Pro. MagSafe 3 corrosion spreads faster, and the NAND controller is more sensitive to contaminated power rails. We have the tools to save it — but speed matters.
            </p>
            <div className="flex items-center gap-2 text-[#7A9E98] text-sm mb-8">
              <MapPin className="w-4 h-4 text-[#0FEA7A]" />
              <span>1 Hyde Lane, Hyde Park, Office E2004, JHB 2196 | Assessment from R599 | Collection across Johannesburg</span>
            </div>
            <div className="flex flex-wrap gap-3 mb-8">
              {[
                { icon: Shield, label: 'From R599 assessment' },
                { icon: Droplets, label: 'Ultrasonic Cleaning' },
                { icon: Cpu, label: 'M3 / M3 Pro / M3 Max' },
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

      {/* Why M3 Is Different */}
      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4">
            Why MacBook Pro M3 Liquid Damage Is More Complex
          </h2>
          <div className="space-y-4 text-[#7A9E98] leading-relaxed mb-8">
            <p>
              The M3 MacBook Pro launched in October 2023 with Apple&apos;s first consumer 3nm chip — and in our Hyde Park workshop, we immediately noticed different failure patterns compared to the M2 and M1 machines we had been repairing for years. The density improvements of 3nm do not just affect performance; they change how liquid damage propagates and which recovery techniques work.
            </p>
            <p>
              The most significant change is voltage tolerance. TSMC&apos;s 3nm N3B process operates with tighter margins than 5nm. The M3 NAND controller, in particular, reacts to contaminated power rails more aggressively than its predecessor. We have seen M3 boards where the M2 equivalent would have survived a small spill and continued booting, but the M3 entered an unrecoverable storage fault state because the contaminated SSD power rail drifted by less than 0.15V. Time is everything — boards brought to us within 24 hours have a substantially higher recovery rate than those left for days.
            </p>
            <p>
              The MagSafe 3 port placement on the M3 MacBook Pro 14-inch (models A2992 and A2918) sits closer to the left speaker grille than on previous generations. This is the second major difference we see in our repair data. Left-side spills that enter the speaker grille follow an accelerated path to the MagSafe charging IC, and the higher current capacity of MagSafe 3 (up to 140W on M3 Pro/Max) means the charging traces carry more current when the machine is plugged in at the time of a spill — dramatically increasing corrosion rate.
            </p>
            <p>
              The third pattern unique to the M3 Pro and M3 Max is the multi-die memory configuration. The M3 Pro uses two memory dies (18 GB or 36 GB unified RAM); the M3 Max uses four. Each die adds memory bus traces across the board. A centre-keyboard spill on an M3 Max can corrode multiple memory channels simultaneously, producing persistent ECC errors even after ultrasonic cleaning. We address these with targeted trace repair under a microscope — a technique we have refined over hundreds of Apple Silicon liquid damage cases. According to Apple&apos;s own architecture documentation, the M3 family&apos;s memory bandwidth improvements are built on these additional die connections, which is precisely what makes them vulnerable.
            </p>
            <p>
              None of this means an M3 MacBook Pro is unrepayable after liquid exposure. It means the repair requires more precise diagnosis and, critically, less time on your desk before arriving at our workshop. If your M3 MacBook Pro has been exposed to any liquid — even if it appears to be working — we recommend an assessment. Corrosion is slow until it isn&apos;t.
            </p>
          </div>
          <a
            href="https://www.apple.com/mac/m3-pro/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#0FEA7A] text-sm underline underline-offset-2 hover:text-[#0FEA7A]/80 transition-colors"
          >
            Apple M3 Pro chip architecture details ↗
          </a>
        </div>
      </section>

      {/* M3 Failure Points */}
      <section className="py-10 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4">
            M3 MacBook Pro Liquid Damage Failure Points
          </h2>
          <p className="text-[#7A9E98] mb-10 max-w-3xl leading-relaxed">
            Based on our repair data from M3, M3 Pro, and M3 Max MacBook Pro liquid damage cases, these are the most common failure patterns. Each is individually diagnosed and repaired at the component level — we do not replace entire logic boards unless every other option is exhausted.
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {m3FailurePoints.map((item) => (
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
              All repairs are quoted before work begins. From R599 assessment on every M3 case — if we cannot repair your MacBook Pro, an assessment fee of R599 applies and the machine is returned as received. Up-to-3 year written warranty on all completed repairs.
            </p>
          </div>
        </div>
      </section>

      {/* Apple vs ZA Support */}
      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-4">
            Apple vs ZA Support: M3 Liquid Damage Repair
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            <div className="glass-card p-6 border border-red-500/20">
              <h3 className="text-red-400 font-bold mb-3">Apple Store / iStore</h3>
              <ul className="text-[#7A9E98] text-sm space-y-2">
                <li>Full logic board replacement — R25,000 to R65,000</li>
                <li>Liquid damage excluded from standard AppleCare</li>
                <li>AppleCare+ incident fee approximately R4,500</li>
                <li>Data may not survive board replacement</li>
                <li>5-10 business days via Apple depot repair</li>
                <li>M3 Pro/Max configurations can exceed R75,000 new</li>
              </ul>
            </div>
            <div className="glass-card p-6 border border-[rgba(15,234,122,0.3)]">
              <h3 className="text-[#0FEA7A] font-bold mb-3">ZA Support</h3>
              <ul className="text-[#7A9E98] text-sm space-y-2">
                <li>Component-level repair — only failed parts replaced</li>
                <li>Assessment from R599, repair quoted individually</li>
                <li>Data preserved on the same logic board</li>
                <li>M3 Pro and M3 Max multi-die memory repair available</li>
                <li>Turnaround 24-72 hours, up-to-3 year warranty</li>
                <li>MagSafe 3 charging path fully diagnosed</li>
              </ul>
            </div>
          </div>
          <p className="text-[#7A9E98] text-sm leading-relaxed">
            Load shedding is a compounding factor we see regularly in our Johannesburg workshop. Machines plugged in during an Eskom stage outage when power suddenly returns experience a brief voltage surge on the charging circuit. On an M3 MacBook Pro that has any existing liquid contamination on the MagSafe or USB-C traces, this surge can push a borderline corrosion situation into a full failure. If your machine was plugged in during load shedding after any liquid exposure, include that detail when you contact us.
          </p>
        </div>
      </section>

      {/* Emergency Steps */}
      <section className="py-10 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle className="w-6 h-6 text-[#F5A623]" />
            <p className="text-[#F5A623] text-sm font-semibold uppercase tracking-wider">M3 Emergency Guide</p>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4">
            Spilled Liquid on Your M3 MacBook Pro?
          </h2>
          <p className="text-[#7A9E98] leading-relaxed mb-10">
            The M3&apos;s 3nm tolerances make the first hour critical. These steps apply to all M3 MacBook Pro models: 14-inch M3 (A2918), 14-inch M3 Pro/Max (A2992), 16-inch M3 Pro/Max (A2991), and the M3 base model 13-inch.
          </p>
          <div className="space-y-5">
            {[
              {
                step: '1',
                title: 'Force power off — hold Touch ID for 10 seconds',
                detail: 'Do not attempt a normal shutdown. The M3 SoC, NAND controller, and memory controllers all draw power continuously in sleep mode. Force power-off removes voltage from corroding traces immediately and is the single most important action you can take in the first 60 seconds.',
                urgent: true,
              },
              {
                step: '2',
                title: 'Disconnect MagSafe and all USB-C cables immediately',
                detail: 'MagSafe 3 on the M3 MacBook Pro can deliver up to 140W. Any active charging connection keeps the MagSafe IC powered under load, accelerating corrosion on the charging traces. USB-C connections provide power too. Disconnect everything before flipping the machine.',
                urgent: true,
              },
              {
                step: '3',
                title: 'Flip keyboard-down and allow liquid to drain',
                detail: 'The M3 logic board sits below the keyboard deck. Inverting the machine lets liquid drain away from the board rather than pooling near the NAND controller or MagSafe IC — both of which sit in the left-centre area of M3 MacBook Pro boards.',
                urgent: false,
              },
              {
                step: '4',
                title: 'Do not use rice, silica gel, or a hairdryer',
                detail: 'Rice absorbs atmospheric humidity, not corrosive liquid residue already on PCB traces. A hairdryer drives moisture deeper into BGA pad connections and can delaminate the M3 MacBook Pro\'s thin chassis. Silica gel does nothing for a board that is already wet internally. None of these approaches stop active corrosion.',
                urgent: true,
              },
              {
                step: '5',
                title: 'Do not power on to "test if it still works"',
                detail: 'This is the single most damaging mistake we see from Johannesburg M3 owners. Applying power to a contaminated board drives current through corroded traces, electrolyses the contaminants into oxides that permanently pit copper pads, and can turn a cleanable fault into an unrepairable one in seconds.',
                urgent: true,
              },
              {
                step: '6',
                title: 'Contact ZA Support within 24 hours — 064 529 5863',
                detail: 'M3 board recovery rates drop significantly after 48 hours as corrosion penetrates beneath BGA underfill. We offer same-day collection across Johannesburg including Sandton, Fourways, Rosebank, Bryanston, and Midrand. Call or WhatsApp 064 529 5863 immediately.',
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
          <FAQAccordion items={faqs} title="MacBook Pro M3 Liquid Damage — Common Questions" />
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
              { label: 'MacBook Pro M2 Liquid Damage', href: '/liquid-damage/macbook-pro-m2' },
              { label: 'MacBook Pro M1 Liquid Damage', href: '/liquid-damage/macbook-pro-m1' },
              { label: 'M3 Logic Board Repair', href: '/logic-board-repair/macbook-pro-m3' },
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
              M3 MacBook Pro Liquid Damage? Every Hour Counts.
            </h2>
            <p className="text-[#7A9E98] mb-6 max-w-xl mx-auto leading-relaxed">
              The 3nm M3 chip&apos;s tight tolerances make speed more critical than any previous MacBook Pro. WhatsApp us now for immediate guidance and same-day collection across Johannesburg. Assessment from R599. From R599 assessment.
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
          <PricingRange page="/liquid-damage/macbook-pro-m3" />
          <PricingNote />
        </div>
      </section>

    </>
  );
}
