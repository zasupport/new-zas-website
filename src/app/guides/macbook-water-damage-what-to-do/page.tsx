import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, CheckCircle, ArrowRight, Shield, MapPin, AlertTriangle, Clock, Droplets, Zap, Beaker } from 'lucide-react';
import SchemaOrg from '@/components/seo/SchemaOrg';
import { buildFaqSchema, buildBreadcrumbSchema } from '@/lib/schema';
import FAQAccordion from '@/components/ui/FAQ';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { CONTACT, SITE, buildWhatsAppUrl } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Spilled Water on MacBook? Do This Immediately | 2026 Guide | ZA Support',
  description:
    'Spilled water on your MacBook? Power off NOW. Expert guide: what to do, what NOT to do, and when to get professional repair. Assessment from R599.',
  alternates: { canonical: 'https://zasupport.com/guides/macbook-water-damage-what-to-do' },
  keywords: [
    'spilled water on MacBook what to do',
    'MacBook water damage repair Johannesburg',
    'MacBook liquid damage emergency steps',
    'water damage MacBook fix South Africa',
    'MacBook Pro spill repair Hyde Park',
    'MacBook coffee spill Johannesburg',
    'MacBook water damage corrosion timeline',
    'professional liquid damage repair MacBook',
    'MacBook rice myth debunked',
    'ultrasonic cleaning MacBook board',
  ],
};

const breadcrumbItems = [
  { label: 'Guides', href: '/guides' },
  { label: 'MacBook Water Damage: What to Do' },
];

const breadcrumbSchemaItems = [
  { name: 'Home', url: 'https://zasupport.com' },
  { name: 'Guides', url: 'https://zasupport.com/guides' },
  { name: 'MacBook Water Damage: What to Do', url: 'https://zasupport.com/guides/macbook-water-damage-what-to-do' },
];

const faqs = [
  {
    question: 'What should I do immediately after spilling water on my MacBook?',
    answer:
      'Power off immediately by holding the power button for 10 seconds. Do not wait for a clean shutdown. Disconnect all cables including the charger. Flip the MacBook keyboard-down onto a dry towel to let gravity drain liquid away from the logic board. Do not attempt to turn it on again. Contact ZA Support on 064 529 5863 for same-day assessment.',
  },
  {
    question: 'Does putting a MacBook in rice fix water damage?',
    answer:
      'No. Rice does absolutely nothing to stop corrosion, which is the real threat to your MacBook. Rice cannot absorb moisture from inside sealed components or under BGA chip connections. Worse, rice dust and starch particles can lodge in ports and keyboard mechanisms, creating additional problems. The only effective treatment is professional ultrasonic cleaning to remove corrosive residue from the logic board.',
  },
  {
    question: 'Can I use a hairdryer to dry out my MacBook?',
    answer:
      'No. Heat from a hairdryer drives moisture deeper into ball grid array (BGA) connections beneath chips on the logic board. It can also warp plastic components and melt adhesive seals. The moisture you need to remove is trapped under IC chips where hot air cannot reach it. Professional ultrasonic cleaning with isopropyl alcohol is the only method that reaches these areas safely.',
  },
  {
    question: 'How long does it take for water to damage a MacBook logic board?',
    answer:
      'Corrosion begins within minutes on a powered board. Within 24 hours, visible green oxidation forms on copper traces. By 48 hours, corrosion can bridge adjacent traces and short-circuit components like the PP3V42_G3H power rail. After 72 hours, component-level damage to ICs like the U8000 chip becomes likely. After one week, damage is often irreversible. This is why we urge clients to bring machines in within 24 hours.',
  },
  {
    question: 'My MacBook got wet but still works — do I need to get it repaired?',
    answer:
      'Yes, absolutely. A MacBook that works after a spill is the most dangerous scenario. The liquid is still inside, and corrosion is progressing silently beneath chips and along traces. We see clients weekly whose MacBooks worked for days after a spill then suddenly died as corrosion bridged a critical power rail. Professional cleaning within 24 hours halts corrosion before it causes permanent damage.',
  },
  {
    question: 'How much does MacBook water damage repair cost in South Africa?',
    answer:
      'Assessment is R599 at ZA Support in Hyde Park, Johannesburg. Minor spills requiring only ultrasonic cleaning typically cost R1,500 to R3,500. Moderate damage with one or two failed ICs ranges from R3,500 to R6,500. Severe multi-component corrosion with power management IC replacement can range from R6,500 to R12,000. All costs are confirmed in a written quote before any work begins. No Fix No Fee policy applies.',
  },
  {
    question: 'What liquid causes the most damage to MacBooks?',
    answer:
      'Sugary and acidic liquids cause the most severe damage. Coffee with sugar and milk is the worst offender — the sugar creates a conductive, corrosive residue that accelerates electrolytic corrosion dramatically. Wine and soft drinks are similarly destructive due to their acidity and sugar content. Plain water causes the least severe damage but still corrodes copper traces within hours if not cleaned professionally.',
  },
  {
    question: 'Can you recover data from a water-damaged MacBook?',
    answer:
      'In the vast majority of cases, yes. MacBook SSDs are separate components from the logic board processor. Even if the logic board is beyond repair, we can typically recover data by reading the NAND flash storage directly. On Apple Silicon Macs (M1, M2, M3, M4), the SSD controller is integrated into the SoC, but we have specialised techniques for these models. Data recovery is included in our R599 assessment.',
  },
  {
    question: 'What does professional ultrasonic cleaning involve?',
    answer:
      'We fully disassemble the MacBook and remove the logic board. The board is placed in a professional ultrasonic cleaning bath operating at 40 kHz with a specialised electronics-grade cleaning solution. Ultrasonic cavitation reaches beneath BGA chips and inside connector pins where manual cleaning cannot. After cleaning, the board is dried in a controlled environment, inspected under a microscope, and every power rail is tested before reassembly.',
  },
  {
    question: 'Is it worth repairing a water-damaged MacBook or should I buy a new one?',
    answer:
      'In most cases, repair is significantly cheaper. A new MacBook costs R20,000 to R80,000 depending on the model. Our component-level repairs cost a fraction of that amount and preserve your existing data on the same machine. We provide an honest assessment — if repair cost exceeds 60% of replacement value, we recommend replacement and offer data recovery from the damaged machine instead.',
  },
  {
    question: 'Does AppleCare cover liquid damage on MacBooks?',
    answer:
      'Standard AppleCare does not cover liquid damage — Apple classifies it as accidental damage. AppleCare+ includes accidental damage coverage but charges an excess of R4,299 per incident, and Apple replaces the entire logic board rather than repairing individual components. ZA Support component-level repair is often more cost-effective than the AppleCare+ excess, and we preserve your data on the original board.',
  },
  {
    question: 'How quickly should I bring my wet MacBook in for repair?',
    answer:
      'Within 24 hours is critical. The difference between a R2,000 clean and an R8,000 multi-component repair is often 24-48 hours of unchecked corrosion. We offer same-day collection across Johannesburg including Sandton, Rosebank, Fourways, Bryanston, Midrand, and Randburg. Call 064 529 5863 immediately for collection or bring it directly to our Hyde Park workshop.',
  },
];

const corrosionTimeline = [
  {
    time: '0 - 6 Hours',
    title: 'Electrolytic Corrosion Begins',
    detail: 'On a powered board, electric current flowing through liquid causes electrolytic corrosion immediately. Copper traces begin dissolving. The PP3V42_G3H rail (the 3.42V power rail that feeds multiple subsystems) is particularly vulnerable because it carries current to the USB-C controller, audio codec, and trackpad controller simultaneously.',
    severity: 'warning',
  },
  {
    time: '24 Hours',
    title: 'Visible Oxidation on Copper Traces',
    detail: 'Green copper oxide and white tin oxide deposits become visible on the logic board surface. Flux residue from the original manufacturing process traps moisture and accelerates localised corrosion. Board-level repair at this stage is straightforward with ultrasonic cleaning — most machines brought in within 24 hours are fully recoverable.',
    severity: 'warning',
  },
  {
    time: '48 Hours',
    title: 'Corrosion Bridges Adjacent Traces',
    detail: 'Corrosion deposits grow large enough to bridge neighbouring traces on the PCB, creating short circuits. The fine-pitch traces around the U8000 chip (the main power management IC on many MacBook Pro models) are especially vulnerable due to their close spacing. Short circuits here can send incorrect voltages to the CPU and SSD.',
    severity: 'danger',
  },
  {
    time: '72 Hours',
    title: 'Component-Level IC Damage',
    detail: 'Corrosion penetrates beneath BGA (ball grid array) solder connections under IC chips. Once corrosion reaches the solder balls connecting a chip to the board, the chip itself fails. Replacing failed ICs requires micro-soldering under a microscope — possible, but significantly more expensive than the ultrasonic cleaning that would have prevented it.',
    severity: 'danger',
  },
  {
    time: '1 Week+',
    title: 'Irreversible Board Damage',
    detail: 'After a week of unchecked corrosion, multiple ICs are compromised, PCB layers are penetrated, and trace integrity is destroyed. Repair at this stage requires replacing numerous components and sometimes repairing or re-routing traces on the PCB itself. Some boards become economically unrepairable at this point — but data recovery is still usually possible.',
    severity: 'critical',
  },
];

const severityColours: Record<string, string> = {
  warning: 'border-[rgba(245,166,35,0.25)] bg-[rgba(245,166,35,0.04)]',
  danger: 'border-[rgba(245,87,54,0.25)] bg-[rgba(245,87,54,0.04)]',
  critical: 'border-[rgba(200,30,30,0.25)] bg-[rgba(200,30,30,0.04)]',
};

const severityBadgeColours: Record<string, string> = {
  warning: 'text-[#F5A623] bg-[rgba(245,166,35,0.1)]',
  danger: 'text-[#F55736] bg-[rgba(245,87,54,0.1)]',
  critical: 'text-[#C81E1E] bg-[rgba(200,30,30,0.1)]',
};

const faqSchema = buildFaqSchema(faqs);
const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbSchemaItems);

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'What to Do When You Spill Water on Your MacBook',
  description:
    'Emergency step-by-step guide for MacBook water damage. Follow these steps immediately after a spill to minimise damage and maximise the chance of a successful repair.',
  totalTime: 'PT10M',
  estimatedCost: {
    '@type': 'MonetaryAmount',
    currency: 'ZAR',
    value: '599',
  },
  supply: [
    { '@type': 'HowToSupply', name: 'Dry towel or absorbent cloth' },
    { '@type': 'HowToSupply', name: 'Flat, stable surface' },
  ],
  tool: [],
  step: [
    {
      '@type': 'HowToStep',
      name: 'Power off immediately',
      text: 'Hold the power button (Touch ID on newer models) for 10 seconds to force shut down. Do not wait for a clean shutdown. A powered board corrodes exponentially faster than an unpowered one.',
      position: 1,
    },
    {
      '@type': 'HowToStep',
      name: 'Disconnect all cables',
      text: 'Remove the charging cable, USB-C peripherals, and any connected accessories. Each cable provides a power path that accelerates electrolytic corrosion on connector pins and controller ICs.',
      position: 2,
    },
    {
      '@type': 'HowToStep',
      name: 'Tilt and drain',
      text: 'Flip the MacBook keyboard-down onto a dry towel at a slight angle. The logic board sits beneath the keyboard — gravity drains liquid away from the board rather than letting it pool on critical components.',
      position: 3,
    },
    {
      '@type': 'HowToStep',
      name: 'Blot visible liquid',
      text: 'Use a lint-free cloth or paper towel to gently blot any visible liquid from the keyboard, ports, and vents. Do not shake the MacBook — this can spread liquid to areas it has not yet reached.',
      position: 4,
    },
    {
      '@type': 'HowToStep',
      name: 'Do NOT put it in rice or use a hairdryer',
      text: 'Rice does not stop corrosion and rice dust damages ports. Hairdryer heat drives moisture deeper under BGA chip connections. Both actions worsen the damage.',
      position: 5,
    },
    {
      '@type': 'HowToStep',
      name: 'Get professional help within 24 hours',
      text: 'Contact ZA Support on 064 529 5863 for same-day collection across Johannesburg. Professional ultrasonic cleaning within 24 hours is the single most important factor in a successful recovery.',
      position: 6,
    },
  ],
};

export default function MacBookWaterDamageGuidePage() {
  const whatsappUrl = buildWhatsAppUrl('GUIDE-WATER-HERO', 'liquid-damage');

  return (
    <>
      <SchemaOrg schema={faqSchema} />
      <SchemaOrg schema={breadcrumbSchema} />
      <SchemaOrg schema={howToSchema} />

      {/* Hero */}
      <section className="hero-gradient grid-overlay pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={breadcrumbItems} />
          <div className="mt-8 max-w-4xl">
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="w-6 h-6 text-[#F5A623]" />
              <p className="text-[#F5A623] text-sm font-semibold uppercase tracking-wider">Emergency Guide</p>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#E8F4F1] leading-tight mb-6">
              Spilled Water on Your MacBook?
              <br /><span className="text-[#0FEA7A]">Here&apos;s Exactly What to Do</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-4 max-w-3xl leading-relaxed">
              We see liquid damage every single day in our Hyde Park workshop. The biggest mistake we see clients make is waiting. Every hour that passes, corrosion is eating your logic board. Here is what to do right now.
            </p>
            <div className="flex items-center gap-2 text-[#7A9E98] text-sm mb-8">
              <MapPin className="w-4 h-4 text-[#0FEA7A]" />
              <span>1 Hyde Lane, Hyde Park, Office E2004, JHB 2196 | Assessment from R599 | Same-day collection across Johannesburg</span>
            </div>
            <div className="flex flex-wrap gap-3 mb-8">
              {[
                { icon: Shield, label: 'No Fix No Fee' },
                { icon: Droplets, label: 'Ultrasonic Cleaning' },
                { icon: Clock, label: 'Same-Day Assessment' },
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
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 hover:shadow-[0_0_32px_rgba(15,234,122,0.4)] transition-all">
                WhatsApp for Urgent Help
              </a>
              <a href={`tel:${CONTACT.phoneTel}`} className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all">
                <Phone className="w-5 h-5" /> Call {CONTACT.phone}
              </a>
            </div>
            <div className="flex flex-wrap gap-6 mt-8 pt-6 border-t border-[rgba(255,255,255,0.06)]">
              {[
                { value: '500+', label: 'Liquid Damage Recoveries' },
                { value: SITE.yearsExperience + ' Years', label: 'In Business Since 2009' },
                { value: SITE.rating + '/5', label: SITE.reviewCount + ' Google Reviews' },
                { value: '24hr', label: 'Critical Response Window' },
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

      {/* Step 1: Power Off Immediately */}
      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4">Step 1: Power Off Immediately</h2>
          <div className="space-y-4 text-[#7A9E98] leading-relaxed">
            <p>The single most important thing you can do after spilling liquid on your MacBook is power it off. Not sleep. Not hibernate. Hold the power button for a full 10 seconds until the screen goes black. On newer MacBooks, this is the Touch ID button in the top right of the keyboard.</p>
            <p>Here is the science: when liquid sits on a powered circuit board, the electrical current flowing through the traces accelerates a process called electrolytic corrosion. Copper dissolves into the liquid and redeposits on neighbouring traces, creating short circuits. This process is exponentially faster on a powered board than an unpowered one. We have seen clients lose entire logic boards because they tried to save their work before shutting down.</p>
            <p>Once the MacBook is off, disconnect every cable. The MagSafe or USB-C charger, external drives, dongles, everything. Each connected cable maintains a power path that keeps corrosion active even with the MacBook powered down.</p>
            <p>Next, flip the MacBook keyboard-down onto a dry towel, tilted at a slight angle. The logic board sits directly beneath the keyboard on every MacBook model. Gravity is your strongest ally here. Let liquid drain out through the keyboard gap and away from the board rather than pooling on critical components like the CPU and power management circuits.</p>
          </div>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-xl border border-[rgba(245,87,54,0.25)] bg-[rgba(245,87,54,0.04)]">
              <h3 className="text-[#F55736] font-bold mb-3 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" /> Do NOT Do These Things
              </h3>
              <ul className="text-[#7A9E98] text-sm space-y-2">
                <li>Do not try to turn it back on &ldquo;to check if it works&rdquo;</li>
                <li>Do not plug in the charger</li>
                <li>Do not shake the MacBook to get water out</li>
                <li>Do not put it in rice</li>
                <li>Do not use a hairdryer or heat gun</li>
                <li>Do not open it yourself unless you have board-level repair experience</li>
              </ul>
            </div>
            <div className="p-5 rounded-xl border border-[rgba(15,234,122,0.15)] bg-[rgba(15,234,122,0.03)]">
              <h3 className="text-[#0FEA7A] font-bold mb-3 flex items-center gap-2">
                <CheckCircle className="w-5 h-5" /> Do These Things
              </h3>
              <ul className="text-[#7A9E98] text-sm space-y-2">
                <li>Force shutdown (hold power for 10 seconds)</li>
                <li>Disconnect all cables immediately</li>
                <li>Flip keyboard-down on a dry towel</li>
                <li>Blot visible liquid gently with lint-free cloth</li>
                <li>Call ZA Support on 064 529 5863</li>
                <li>Bring it in or arrange same-day collection</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Why Rice Doesn't Work */}
      <section className="py-10 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4">Why Rice Doesn&apos;t Work (and Other Myths)</h2>
          <div className="space-y-4 text-[#7A9E98] leading-relaxed">
            <p>The rice myth has probably cost more MacBook owners their machines than the original spills. We need to be blunt about this because we see the consequences every week in our workshop: rice does absolutely nothing to save a liquid-damaged MacBook.</p>
            <p>Here is why. The threat to your MacBook is not the water itself. The threat is corrosion. When liquid contacts copper traces on the logic board, a chemical reaction begins: copper oxidises, tin corrodes, and conductive salts form between adjacent traces. Rice sitting in a bag around your closed MacBook cannot reach the moisture trapped beneath BGA chip connections. It cannot neutralise the chlorides in tap water or the acids in coffee. It certainly cannot reverse corrosion that has already begun.</p>
            <p>What rice <em>can</em> do is make things worse. Rice dust and starch particles get into USB-C ports, speaker grilles, and keyboard mechanisms. We have spent additional repair time cleaning rice debris out of machines that might otherwise have been straightforward ultrasonic cleans.</p>
            <p>The same applies to the hairdryer trick. Blowing hot air onto the outside of a MacBook cannot reach moisture trapped under chips soldered to the board with hundreds of tiny solder balls. What it does do is drive moisture deeper into those BGA connections and can warp plastic components. We have also seen clients melt the rubber feet and display gaskets with hairdryers set too high.</p>
            <p>Isopropyl alcohol swabbed on the board surface is better than nothing, but alone it is insufficient. It evaporates too quickly to penetrate beneath BGA connections, and manual application cannot reach the fine-pitch areas between closely spaced IC pins. Only ultrasonic cleaning, where the entire board is submerged in cleaning solution and subjected to cavitation at 40 kHz, reaches every surface and sub-surface area where corrosion hides.</p>
          </div>
        </div>
      </section>

      {/* The Corrosion Timeline */}
      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4">The Corrosion Timeline: What Happens Inside Your MacBook</h2>
          <p className="text-[#7A9E98] mb-10 max-w-3xl leading-relaxed">
            Understanding what happens inside a wet MacBook explains why speed is everything. We have documented this progression across hundreds of boards in our workshop. The chemistry is unforgiving.
          </p>
          <div className="space-y-6">
            {corrosionTimeline.map((item) => (
              <div key={item.time} className={`rounded-2xl border p-6 ${severityColours[item.severity]}`}>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <span className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full mb-2 ${severityBadgeColours[item.severity]}`}>
                      {item.time}
                    </span>
                    <h3 className="text-[#E8F4F1] font-bold text-lg">{item.title}</h3>
                  </div>
                </div>
                <p className="text-[#7A9E98] text-sm leading-relaxed">{item.detail}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 p-5 rounded-xl border border-[rgba(15,234,122,0.15)] bg-[rgba(15,234,122,0.04)] flex items-start gap-4">
            <Clock className="w-5 h-5 text-[#0FEA7A] flex-shrink-0 mt-0.5" />
            <p className="text-[#7A9E98] text-sm leading-relaxed">
              <strong className="text-[#E8F4F1]">The takeaway:</strong> the single biggest factor in whether your MacBook survives a spill is how quickly it receives professional cleaning. Within 24 hours, most machines are fully recoverable. After 72 hours, the cost and complexity increase dramatically. After a week, some boards are beyond economic repair.
            </p>
          </div>
        </div>
      </section>

      {/* Professional Repair Process */}
      <section className="py-10 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4">Professional Repair Process: What We Actually Do</h2>
          <div className="space-y-4 text-[#7A9E98] leading-relaxed mb-10">
            <p>When a liquid-damaged MacBook arrives at our Hyde Park workshop, we follow a systematic process refined over 16 years and thousands of liquid damage cases. Here is exactly what happens.</p>
            <p>First, we perform a visual inspection under magnification to assess the extent and location of the liquid intrusion. We check liquid contact indicators (LCIs), note which areas show visible corrosion, and photograph the board condition for your records.</p>
            <p>Next, the MacBook is fully disassembled. The logic board, battery, SSD (where removable), display cable, trackpad cable, and keyboard assembly are all separated. The logic board goes into our professional ultrasonic cleaning bath. This is not a consumer parts washer. Our unit operates at 40 kHz with electronics-grade cleaning solution specifically formulated to dissolve flux residue and corrosion deposits without damaging components.</p>
            <p>Ultrasonic cavitation is the key technology here. The 40 kHz frequency creates microscopic bubbles in the cleaning solution that implode against every surface of the board, including underneath BGA chips where manual cleaning cannot reach. This is the only method that reliably removes corrosion from beneath IC packages without desoldering them.</p>
            <p>After cleaning, the board is dried in a controlled, low-humidity environment. We then inspect every IC, connector, and trace under a stereo microscope at 45x magnification. Any component showing irreversible damage is identified for replacement. We test every power rail with a multimeter and oscilloscope. The PP3V42_G3H rail, PPBUS_G3H, PP5V_S0, PP3V3_S0, and all SoC voltage rails are verified before the board is powered on.</p>
            <p>If specific ICs have failed, we replace them using micro-soldering equipment. Common replacements include USB-C controller chips (CD3217, CD3218), power management ICs (the U8000 series), audio codec ICs, and backlight driver chips. Each replacement component is tested individually before final assembly.</p>
            <p>Finally, the MacBook is reassembled, all functions are tested (keyboard, trackpad, display, speakers, USB-C ports, Wi-Fi, Bluetooth, camera, microphone, battery charging), and we run a 24-hour stress test before returning the machine. You receive a written report detailing what was found, what was repaired, and what to watch for.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { icon: Beaker, title: 'Ultrasonic Clean', desc: '40 kHz cavitation bath with electronics-grade solution reaches beneath every BGA chip' },
              { icon: Zap, title: 'Board Diagnostics', desc: 'Every power rail tested under oscilloscope. Failed ICs identified at component level' },
              { icon: Shield, title: 'Micro-Soldering', desc: 'Individual IC replacement under microscope. Only failed components replaced, not the entire board' },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="glass-card p-5 border border-[rgba(15,234,122,0.15)]">
                <Icon className="w-6 h-6 text-[#0FEA7A] mb-3" />
                <h3 className="text-[#E8F4F1] font-bold mb-2">{title}</h3>
                <p className="text-[#7A9E98] text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cost of Liquid Damage Repair */}
      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4">Cost of Liquid Damage Repair in South Africa</h2>
          <div className="space-y-4 text-[#7A9E98] leading-relaxed mb-8">
            <p>We believe in transparent pricing. The cost of liquid damage repair depends entirely on severity and how quickly the machine reaches us. Here is what to expect at ZA Support in Hyde Park, Johannesburg.</p>
            <p>In the Johannesburg context, we see particular patterns. Coffee culture in JHB offices means cappuccino spills on MacBook Pro keyboards are our single most common repair. Load shedding creates a secondary risk: power surges when electricity returns can damage MacBooks that were not properly shut down or unplugged, and we frequently see surge-related failures combined with earlier, unaddressed liquid exposure.</p>
          </div>

          <div className="space-y-4 mb-8">
            {[
              { level: 'Assessment', price: 'R599', desc: 'Full diagnostic, written quote, and repair recommendation. Applied to repair cost if you proceed.', colour: 'border-[rgba(15,234,122,0.15)] bg-[rgba(15,234,122,0.03)]' },
              { level: 'Minor (Ultrasonic Clean Only)', price: 'R1,500 - R3,500', desc: 'Board brought in within 24 hours. No failed components. Ultrasonic cleaning halts corrosion and restores full function. Most common outcome when clients act quickly.', colour: 'border-[rgba(15,234,122,0.15)] bg-[rgba(15,234,122,0.03)]' },
              { level: 'Moderate (Clean + 1-2 IC Replacements)', price: 'R3,500 - R6,500', desc: 'Corrosion has damaged one or two ICs. Typically USB-C controller, audio codec, or backlight driver. Ultrasonic clean plus micro-soldering replacement of failed components.', colour: 'border-[rgba(245,166,35,0.15)] bg-[rgba(245,166,35,0.03)]' },
              { level: 'Severe (Multi-Component)', price: 'R6,500 - R12,000', desc: 'Extensive corrosion across multiple board areas. Power management IC replacement, multiple controller replacements, possible trace repair. Usually machines left more than 72 hours before professional treatment.', colour: 'border-[rgba(245,87,54,0.15)] bg-[rgba(245,87,54,0.03)]' },
              { level: 'Apple Store / iStore', price: 'R18,000 - R48,000', desc: 'Full logic board replacement. Does not attempt component-level repair. Data may not be preserved. For comparison only.', colour: 'border-[rgba(200,30,30,0.15)] bg-[rgba(200,30,30,0.03)]' },
            ].map((tier) => (
              <div key={tier.level} className={`rounded-xl border p-5 ${tier.colour}`}>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-[#E8F4F1] font-bold">{tier.level}</h3>
                  <span className="text-[#0FEA7A] font-extrabold text-lg">{tier.price}</span>
                </div>
                <p className="text-[#7A9E98] text-sm leading-relaxed">{tier.desc}</p>
              </div>
            ))}
          </div>

          <div className="p-5 rounded-xl border border-[rgba(15,234,122,0.15)] bg-[rgba(15,234,122,0.04)] flex items-start gap-4">
            <Shield className="w-5 h-5 text-[#0FEA7A] flex-shrink-0 mt-0.5" />
            <p className="text-[#7A9E98] text-sm leading-relaxed">
              <strong className="text-[#E8F4F1]">No Fix No Fee.</strong> If we cannot repair your MacBook, the R599 assessment fee applies and the machine is returned exactly as received. No hidden costs. All repair pricing confirmed in a written quote before any work begins. Up-to-3 year warranty on all completed repairs.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose ZA Support */}
      <section className="py-10 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4">Why Choose ZA Support for Liquid Damage Repair</h2>
          <div className="space-y-4 text-[#7A9E98] leading-relaxed mb-8">
            <p>We have been repairing liquid-damaged Macs in Johannesburg since 2009. In 16 years, we have built the tooling, techniques, and component inventory to handle everything from a minor water splash to a catastrophic red wine flood across an entire keyboard deck.</p>
            <p>Unlike Apple and iStore, who replace the entire logic board at R18,000 to R48,000, we repair at the component level. This means we only replace what is actually broken. A failed USB-C controller does not require a new logic board. A corroded audio IC does not mean replacing the CPU. Component-level repair saves you thousands of rands and preserves your data on the original machine.</p>
            <p>We are honest about prognosis. If your MacBook is beyond economic repair, we tell you upfront and offer data recovery instead. We do not upsell unnecessary repairs or hold machines hostage. Our No Fix No Fee policy means you only pay R599 for the assessment if we cannot fix it.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { title: 'Component-Level Repair', desc: 'We replace individual failed ICs, not entire boards. This costs a fraction of Apple\'s board-swap approach and preserves your data.' },
              { title: 'Same-Day Collection', desc: 'We collect liquid-damaged MacBooks from Sandton, Rosebank, Fourways, Bryanston, Midrand, Randburg and all Johannesburg suburbs. Time is critical.' },
              { title: 'Up-to-3 Year Warranty', desc: 'Every completed repair includes our warranty. If the same component fails, we repair it again at no charge.' },
              { title: 'Transparent Pricing', desc: 'Written quote before any work begins. No hidden fees. Assessment from R599. No Fix No Fee on every case.' },
            ].map((item) => (
              <div key={item.title} className="glass-card p-5 border border-[rgba(15,234,122,0.15)]">
                <h3 className="text-[#E8F4F1] font-bold mb-2">{item.title}</h3>
                <p className="text-[#7A9E98] text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQAccordion items={faqs} title="MacBook Water Damage: Frequently Asked Questions" />
        </div>
      </section>

      {/* Related Services */}
      <section className="py-8 sm:py-16 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#E8F4F1] mb-6">Related Services</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              { label: 'All Liquid Damage Repair', href: '/liquid-damage' },
              { label: 'Logic Board Repair', href: '/logic-board-repair' },
              { label: 'Data Recovery', href: '/data-recovery#macbook' },
              { label: 'MacBook Pro Liquid Damage', href: '/liquid-damage/macbook-pro' },
              { label: 'MacBook Air Liquid Damage', href: '/liquid-damage/macbook-air' },
              { label: 'MacBook Pro Repair', href: '/macbook-pro-repair' },
              { label: 'MacBook Not Turning On', href: '/macbook-not-turning-on' },
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
      <section className="py-8 sm:py-16 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-[rgba(39,80,77,0.3)] border border-[rgba(15,234,122,0.2)] rounded-3xl p-10">
            <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3">Time Is the Enemy. Act Now.</h2>
            <p className="text-[#7A9E98] mb-6 max-w-xl mx-auto leading-relaxed">
              Every hour of unchecked corrosion reduces your MacBook&apos;s chance of recovery. WhatsApp us now. We will guide you through the immediate steps and arrange same-day collection anywhere in Johannesburg.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 hover:shadow-[0_0_32px_rgba(15,234,122,0.4)] transition-all">
                WhatsApp for Urgent Help
              </a>
              <a href={`tel:${CONTACT.phoneTel}`} className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all">
                <Phone className="w-5 h-5" /> Call {CONTACT.phone}
              </a>
            </div>
            <p className="text-[#7A9E98] text-xs mt-6">
              1 Hyde Lane, Hyde Park, Office E2004, JHB 2196 | Assessment from R599 | No Fix No Fee | Up-to-3 year warranty
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
