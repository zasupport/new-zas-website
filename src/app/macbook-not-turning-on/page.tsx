import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Phone,
  CheckCircle,
  ArrowRight,
  AlertTriangle,
  Shield,
  Zap,
  Star,
  MapPin,
  Wrench,
  MessageCircle,
  ChevronRight,
} from 'lucide-react';
import { Cpu } from 'lucide-react';
import SchemaOrg from '@/components/seo/SchemaOrg';
import { buildFaqSchema, buildServiceSchema, buildBreadcrumbSchema } from '@/lib/schema';
import FAQAccordion from '@/components/ui/FAQ';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { CONTACT, SITE } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'MacBook Not Turning On Johannesburg | Assessment: from R599',
  description:
    'MacBook won\'t turn on? Same-day assessment in Johannesburg. 8 out of 10 Macs that won\'t power on are repairable. Assessment: from R599. Hyde Park. Call 064 529 5863.',
  alternates: { canonical: 'https://zasupport.com/macbook-not-turning-on' },
  keywords: [
    'MacBook not turning on Johannesburg',
    'MacBook won\'t turn on',
    'MacBook dead screen Johannesburg',
    'MacBook no power repair',
    'MacBook not turning on fix',
    'MacBook black screen Johannesburg',
    'MacBook won\'t start Johannesburg',
    'MacBook dead battery repair',
    'MacBook power issue repair',
    'MacBook not switching on',
  ],
};

// ─── Breadcrumb ───────────────────────────────────────────────────────────────
const breadcrumbItems = [{ label: 'MacBook Not Turning On', href: '/macbook-not-turning-on' }];
const breadcrumbSchemaItems = [
  { name: 'Home', url: 'https://zasupport.com' },
  { name: 'MacBook Not Turning On', url: 'https://zasupport.com/macbook-not-turning-on' },
];

// ─── Quick Checks ───────────────────────────────────────────────────────────────
const freeFixes = [
  {
    step: '1',
    title: 'SMC Reset',
    detail:
      'Hold Shift + Control + Option + Power simultaneously for 10 seconds. Release all keys, then press Power normally. This resets the System Management Controller, responsible for power, thermal, and battery management. Fixes a surprising number of "dead" MacBooks.',
    note: 'Intel MacBooks only. Apple Silicon Macs (M1/M2/M3) do not have an SMC, shut down, wait 30 seconds, power on.',
  },
  {
    step: '2',
    title: 'NVRAM / PRAM Reset',
    detail:
      'Power on your MacBook, then immediately hold Cmd + Option + P + R. Keep holding until you hear the startup chime twice (older models) or see the Apple logo appear and disappear twice. This clears cached settings that can prevent boot.',
    note: 'Apple Silicon Macs reset NVRAM automatically, this step is Intel-only.',
  },
  {
    step: '3',
    title: 'Remove All Accessories',
    detail:
      'Unplug every peripheral: USB drives, external monitors, hubs, printers, dongles. Faulty accessories can prevent startup by holding a power rail low. Try powering on with only the charger connected, then without the charger (if battery is charged).',
    note: 'A faulty USB-C hub is one of the top five causes of MacBooks that appear dead.',
  },
  {
    step: '4',
    title: 'Try a Different Charger and Cable',
    detail:
      'Borrow an original Apple MagSafe or USB-C charger. Third-party cables, especially cheap USB-C cables, frequently fail to negotiate the correct charging voltage. If your MacBook only charges with one specific cable, the cable is the likely culprit.',
    note: 'MagSafe LED not lighting up at all = charger or port fault, not always the MacBook itself.',
  },
  {
    step: '5',
    title: 'Check the Charging Port for Debris',
    detail:
      'Use a torch to inspect the MagSafe or USB-C port. A single piece of lint or debris can prevent the connector from seating and stop charging entirely. Use a dry toothpick or non-metallic tool, never a metal pin. Compressed air in short bursts also works.',
    note: 'Load shedding surge damage often burns the USB-C port first. If the port looks discoloured or scorched, stop and bring it in.',
  },
];

// ─── Causes ───────────────────────────────────────────────────────────────────
const causes = [
  {
    rank: '01',
    title: 'Dead or Failed Battery',
    description:
      'The most common cause. MacBook batteries degrade over charge cycles. A battery at 0% or below minimum voltage will not allow the MacBook to power on at all, even when plugged in, if the charging IC is also struggling.',
    symptoms: ['No response to power button', 'MagSafe light green but no startup', 'Powers on only when plugged in'],
    repairTime: '2–4 hours',
    fixable: true,
    colour: 'emerald',
  },
  {
    rank: '02',
    title: 'Surge / Load Shedding Damage',
    description:
      'South Africa\'s load shedding cycle creates voltage spikes when power returns. A single surge can destroy the USB-C controller, blow a polyfuse, or fry the power management IC, leaving the MacBook completely unresponsive.',
    symptoms: ['Dead after load shedding', 'No charging light', 'Smells faintly burnt', 'Screen permanently black'],
    repairTime: '1–3 business days',
    fixable: true,
    colour: 'amber',
  },
  {
    rank: '03',
    title: 'Liquid Damage',
    description:
      'Water, coffee, wine, any liquid reaching the logic board causes electrolytic corrosion that eats through copper traces and corrodes component pads. The damage often appears days after the spill as oxidation spreads. Earlier treatment = better outcome.',
    symptoms: ['Stopped working after liquid exposure', 'Intermittent power then nothing', 'Keyboard/trackpad unresponsive before death'],
    repairTime: '2–5 business days',
    fixable: true,
    colour: 'blue',
  },
  {
    rank: '04',
    title: 'Logic Board Failure',
    description:
      'The logic board is the central nervous system of your MacBook. Failed capacitors, damaged power rails, shorted MOSFETs or a failed SoC (Apple Silicon) can all result in a Mac that will not start. Component-level repair is possible on most faults.',
    symptoms: ['Fan spins but no screen', 'Boots then immediately shuts off', 'No response at all, completely silent'],
    repairTime: '1–4 business days',
    fixable: true,
    colour: 'purple',
  },
  {
    rank: '05',
    title: 'Failed Charging IC (CD3217B12)',
    description:
      'The USB-C Power Delivery controller chip (CD3217B12 on many Intel models) negotiates the charging voltage with your adapter. When this chip fails, the MacBook draws no power, the battery drains to zero, and the Mac appears completely dead.',
    symptoms: ['No charging from any cable', 'Battery percentage stuck at 0%', 'Previously worked, then stopped overnight'],
    repairTime: '2–3 business days',
    fixable: true,
    colour: 'teal',
  },
  {
    rank: '06',
    title: 'Corrupted Firmware (T2 / M-series)',
    description:
      'MacBooks with a T2 security chip or Apple Silicon can become unbootable due to corrupted firmware, often after a failed macOS update or third-party SSD replacement. The Mac may show a black screen or blink an error code. Firmware can be restored without data loss in most cases.',
    symptoms: ['Stuck on Apple logo', 'Blinking folder with question mark', 'Black screen after macOS update'],
    repairTime: '24–48 hours',
    fixable: true,
    colour: 'orange',
  },
  {
    rank: '07',
    title: 'Dead Backlight (Screen Looks Dark)',
    description:
      'A blown backlight fuse or failed backlight driver IC means the MacBook IS on, you just cannot see the screen. Test: shine a torch at the Apple logo area in a dark room. If you can faintly see the desktop, this is a backlight fault, not a power fault.',
    symptoms: ['Screen completely black but fan/keyboard lit', 'Faint image visible with torch', 'Connected to external monitor works fine'],
    repairTime: '1–2 business days',
    fixable: true,
    colour: 'indigo',
  },
  {
    rank: '08',
    title: 'Physical Damage',
    description:
      'Drop damage, bent chassis, or broken display hinges can interrupt internal ribbon cables, fracture solder joints, or break connectors. Physical damage assessment requires hands-on inspection, pricing depends entirely on the specific fault found.',
    symptoms: ['Stopped working after drop', 'Cracked or bent chassis', 'Screen cracked with no power'],
    repairTime: 'Assessed after diagnostic',
    fixable: null,
    colour: 'red',
  },
];

// ─── FAQs ─────────────────────────────────────────────────────────────────────
const faqs = [
  {
    question: 'My MacBook won\'t turn on after load shedding, what happened?',
    answer:
      'Load shedding voltage surges are the leading cause of sudden MacBook death in South Africa. When Eskom power returns after an outage, the surge can destroy the USB-C Power Delivery controller chip, blow a protection fuse on the logic board, or damage the power management IC. The MacBook appears completely dead, no charging light, no response to the power button. This is repairable in the majority of cases. Assessment: from R599 at our Hyde Park workshop, call 064 529 5863.',
  },
  {
    question: 'How do I know if it\'s the battery or the logic board?',
    answer:
      'You generally cannot tell from home, and neither can most repair shops without proper testing equipment. The symptoms are nearly identical: no response to power button, black screen, no charging indicator. Our assessment fee (from R599) takes approximately 30 minutes. We use a bench power supply to eliminate the battery as a variable, then use a multimeter and oscilloscope to map the logic board\'s power rails. We will tell you exactly what is wrong and what it will cost before touching anything.',
  },
  {
    question: 'My MacBook screen is black but I can hear it starting, is it broken?',
    answer:
      'A black screen with audible startup sounds (fan spinning, keyboard backlight on, startup chime) almost always indicates a backlight fault rather than a dead MacBook. Backlight failures are caused by a blown backlight fuse or a failed backlight driver IC on the logic board. Quick test: shine a bright torch at the Apple logo in a dark room. If you can faintly see the desktop, your MacBook is running, it just cannot illuminate the screen. This is a common, fully repairable fault.',
  },
  {
    question: 'How much does it cost to fix a MacBook that won\'t turn on?',
    answer:
      'Pricing depends entirely on the root cause. We quote before any work begins. We assess battery, surge, liquid damage, logic board, backlight, and firmware faults. Apple\'s out-of-warranty logic board replacement involves replacing the entire board, we fix the specific component that failed. We give you a fixed written quote before any work begins.',
  },
  {
    question: 'Can you recover my data if the MacBook won\'t turn on?',
    answer:
      'In most cases, yes. For battery failures, surge damage, and backlight faults, the storage drive is usually completely intact, your data is unaffected. For liquid damage and logic board failures, data recovery is typically possible even if the MacBook itself cannot be economically repaired, as we can often read the storage chip directly. We will give you an honest assessment of data recovery prospects during the assessment.',
  },
  {
    question: 'Is it worth repairing a 7-year-old MacBook that won\'t turn on?',
    answer:
      'It depends on the fault, the model, and what the machine is worth to you. Our assessment fee (from R599) will tell you exactly what is wrong and what repair costs. A 2017 MacBook Pro with a failed battery is almost always worth fixing, it has years of usable life remaining. A 2012 MacBook Pro with serious liquid damage may not be worth the repair cost. We will always give you our honest recommendation, including whether a used replacement makes more financial sense.',
  },
  {
    question: 'My MacBook shows a flashing folder with a question mark on startup, what does that mean?',
    answer:
      'A flashing folder with a question mark means your MacBook cannot find a bootable operating system. Common causes: failed or corrupted SSD, macOS installation damaged, or storage controller fault on the logic board. In many cases the SSD itself is fine and macOS just needs to be reinstalled via Recovery Mode. If the SSD has failed, data recovery is often still possible. This is diagnosed during the assessment fee (from R599).',
  },
  {
    question: 'My MacBook gets to the Apple logo then shuts off, what\'s wrong?',
    answer:
      'A Mac that reaches the Apple logo then powers off is typically experiencing a fault in one of three areas: the logic board power delivery circuit (a component failing under load), the Power Management IC struggling to maintain stable voltage during boot, or a firmware/T2 chip issue on newer models. Less commonly it can be a failing SSD or a kernel extension conflict (software). This requires board-level diagnosis, bring it in for a assessment fee (from R599).',
  },
  {
    question: 'How long does MacBook repair take?',
    answer:
      'Assessment: from R599: completed within 24 hours of drop-off. Battery replacement: same day or next day. Firmware restore: 24–48 hours. Charging IC repair: 2–3 business days. Logic board component repair: 1–4 business days depending on complexity. Liquid damage with corrosion: 2–5 business days. We confirm the exact timeframe at the diagnostic stage and update you at each step. No machine sits waiting without communication.',
  },
  {
    question: 'What warranty do you offer on MacBook repairs?',
    answer:
      'All ZA Support repairs carry a up-to-3 year warranty on the repaired component and any replaced parts. This is the longest warranty offered by any independent Mac repair workshop in Johannesburg. If the same fault recurs within the warranty period, we fix it at no charge. The warranty is transferable if you sell the device.',
  },
];

// ─── Suburb Reviews ───────────────────────────────────────────────────────────
const suburbReviews = [
  {
    name: 'Jason M.',
    suburb: 'Sandton',
    stars: 5,
    review:
      'My MacBook Pro completely died after load shedding. ZA Support diagnosed it the same day, blown USB-C chip. Fixed within 48 hours. Apple quoted significantly more for a full board replacement. I nearly threw the machine away. Cannot recommend them enough.',
    service: 'Surge Damage Repair',
  },
  {
    name: 'Priya N.',
    suburb: 'Rosebank',
    stars: 5,
    review:
      'MacBook Air wouldn\'t turn on at all, totally dead. I assumed the worst. Turned out to be the battery completely failing. They replaced it the same day. The machine works perfectly now. Assessment: from R599 meant there was no risk in bringing it in.',
    service: 'Battery Replacement',
  },
  {
    name: 'Shaun K.',
    suburb: 'Fourways',
    stars: 5,
    review:
      'Screen was black but I could hear the Mac starting up. ZA Support told me over the phone it sounded like a backlight fault. They were right, fixed in two days. Honest advice, no upselling, reasonable price. This is how all repair shops should operate.',
    service: 'Backlight Repair',
  },
];

// ─── Schema ───────────────────────────────────────────────────────────────────
const serviceSchema = buildServiceSchema({
  name: 'MacBook Not Turning On, Repair & Diagnosis, Johannesburg',
  description:
    'Same-day assessment for MacBooks that won\'t turn on in Johannesburg. Battery, surge, liquid damage, logic board, firmware and backlight repairs. Assessment: from R599. up-to-3 year warranty.',
});

const faqSchema = buildFaqSchema(faqs);
const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbSchemaItems);

const aggregateRatingSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: SITE.name,
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '632',
    bestRating: '5',
    worstRating: '1',
  },
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to fix a MacBook that won\'t turn on',
  description: 'Step-by-step guide to diagnose and fix a MacBook that won\'t turn on, from quick checks at home to professional repair in Johannesburg.',
  totalTime: 'PT30M',
  tool: [],
  supply: [],
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Reset the SMC (Intel) or force restart (Apple Silicon)',
      text: 'On Intel MacBooks: hold Shift + Control + Option + Power for 10 seconds, release, then press Power normally. On Apple Silicon: shut down, wait 30 seconds, then press Power.',
      url: 'https://zasupport.com/macbook-not-turning-on#smc-reset',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Reset NVRAM / PRAM (Intel only)',
      text: 'Power on and immediately hold Cmd + Option + P + R until the Apple logo appears and disappears twice. This clears cached startup settings.',
      url: 'https://zasupport.com/macbook-not-turning-on#nvram-reset',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Remove all accessories and try a different charger',
      text: 'Unplug every USB-C hub, external drive, and peripheral. Try a known-good Apple charger and cable. A faulty USB-C hub or cable is one of the top five causes of MacBooks that appear dead.',
      url: 'https://zasupport.com/macbook-not-turning-on#check-charger',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Inspect the charging port for debris',
      text: 'Use a torch to check the MagSafe or USB-C port for lint or damage. Use a dry non-metallic tool to clear any debris. Scorched or discoloured ports indicate surge damage, stop and bring the Mac in for professional diagnosis.',
      url: 'https://zasupport.com/macbook-not-turning-on#port-inspection',
    },
    {
      '@type': 'HowToStep',
      position: 5,
      name: 'Bring it in for a professional assessment',
      text: 'If none of the above steps work, bring your MacBook to ZA Support in Hyde Park, Johannesburg for a same-day assessment. Assessment: from R599, you only pay if we repair it.',
      url: 'https://zasupport.com/macbook-not-turning-on#get-help',
    },
  ],
};

// ─── Colour map ───────────────────────────────────────────────────────────────
const colourMap: Record<string, string> = {
  emerald: 'text-emerald-400',
  amber: 'text-amber-400',
  blue: 'text-blue-400',
  purple: 'text-purple-400',
  teal: 'text-teal-400',
  orange: 'text-orange-400',
  indigo: 'text-indigo-400',
  red: 'text-red-400',
};

const borderColourMap: Record<string, string> = {
  emerald: 'border-emerald-500/30',
  amber: 'border-amber-500/30',
  blue: 'border-blue-500/30',
  purple: 'border-purple-500/30',
  teal: 'border-teal-500/30',
  orange: 'border-orange-500/30',
  indigo: 'border-indigo-500/30',
  red: 'border-red-500/30',
};

const badgeColourMap: Record<string, string> = {
  emerald: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
  amber: 'bg-amber-500/10 text-amber-400 border border-amber-500/20',
  blue: 'bg-blue-500/10 text-blue-400 border border-blue-500/20',
  purple: 'bg-purple-500/10 text-purple-400 border border-purple-500/20',
  teal: 'bg-teal-500/10 text-teal-400 border border-teal-500/20',
  orange: 'bg-orange-500/10 text-orange-400 border border-orange-500/20',
  indigo: 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20',
  red: 'bg-red-500/10 text-red-400 border border-red-500/20',
};

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function MacBookNotTurningOnPage() {
  return (
    <>
      <SchemaOrg schema={serviceSchema} />
      <SchemaOrg schema={faqSchema} />
      <SchemaOrg schema={breadcrumbSchema} />
      <SchemaOrg schema={aggregateRatingSchema} />
      <SchemaOrg schema={howToSchema} />

      <main className="bg-[#0A1A18] min-h-screen">

        {/* ── Hero ── */}
        <section className="hero-gradient grid-overlay relative overflow-hidden pt-24 pb-20 sm:pt-32 sm:pb-28">
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-[#0FEA7A]/5 blur-[120px]" />
          </div>

          <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Breadcrumb */}
            <div className="mb-8">
              <Breadcrumb items={breadcrumbItems} />
            </div>

            {/* Urgency badge */}
            <div className="inline-flex items-center gap-2 bg-[#0FEA7A]/10 border border-[#0FEA7A]/20 rounded-full px-4 py-2 mb-6">
              <div className="w-2 h-2 rounded-full bg-[#0FEA7A] animate-pulse" />
              <span className="text-[#0FEA7A] text-sm font-semibold tracking-wide">No-Obligation Diagnostic</span>
            </div>

            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#E8F4F1] leading-tight mb-6"
             
            >
              MacBook Not Turning On?{' '}
              <span className="text-[#0FEA7A]">Johannesburg Repair.</span>
            </h1>

            <p className="text-xl sm:text-2xl text-[#7A9E98] mb-4 max-w-3xl leading-relaxed">
              Don&apos;t panic. <strong className="text-[#E8F4F1]">8 out of 10 MacBooks</strong> that won&apos;t turn on can be repaired.
              Assessment: from R599, Assessment fee: from R599.
            </p>

            <p className="text-[#7A9E98] text-base mb-10 max-w-2xl">
              Load shedding surge, dead battery, liquid damage, backlight fault, we identify the exact cause and fix it.
              Based in Hyde Park, Johannesburg.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <a
                href={`https://wa.me/27790539964?text=Hi%20ZA%20Support%2C%20my%20MacBook%20won%27t%20turn%20on%20%E2%80%94%20need%20help`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] font-bold px-8 py-4 rounded-xl text-lg hover:bg-[#0FEA7A]/90 transition-all shadow-lg shadow-[#0FEA7A]/20"
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp Us Now
              </a>
              <a
                href={`tel:${CONTACT.phoneTel}`}
                className="inline-flex items-center justify-center gap-2 border border-[rgba(255,255,255,0.12)] text-[#E8F4F1] font-semibold px-8 py-4 rounded-xl text-lg hover:border-[#0FEA7A]/40 hover:text-[#0FEA7A] transition-all"
              >
                <Phone className="w-5 h-5" />
                {CONTACT.phone}
              </a>
            </div>

            {/* Trust row */}
            <div className="flex flex-wrap gap-3">
              {['Assessment: from R599', 'Assessment: from R599', 'Warranty', 'Same-Day Available', 'Hyde Park, JHB'].map((badge) => (
                <span
                  key={badge}
                  className="inline-flex items-center gap-1.5 bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] text-[#7A9E98] text-sm px-3 py-1.5 rounded-full"
                >
                  <CheckCircle className="w-3.5 h-3.5 text-[#0FEA7A]" />
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ── Stats Bar ── */}
        <section className="border-y border-[rgba(255,255,255,0.06)] bg-[rgba(15,234,122,0.03)]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
              {[
                { value: '3,000+', label: 'MacBooks Recovered' },
                { value: 'R599', label: 'Assessment, from' },
                { value: 'No Fix', label: 'No Fee, Zero Risk' },
                { value: 'Same Day', label: 'Available' },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl sm:text-3xl font-extrabold text-[#0FEA7A] mb-1">
                    {stat.value}
                  </div>
                  <div className="text-[#7A9E98] text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Quick Checks First ── */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-20">
          <div className="mb-12">
            <div className="inline-block bg-[#0FEA7A]/10 border border-[#0FEA7A]/20 rounded-full px-4 py-1.5 mb-4">
              <span className="text-[#0FEA7A] text-sm font-semibold">Try These First, No Cost</span>
            </div>
            <h2
              className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4"
             
            >
              5 Quick Checks Before You Bring It In
            </h2>
            <p className="text-[#7A9E98] text-lg max-w-2xl">
              Before anything else, try these steps. They cost nothing and fix a significant percentage of MacBooks that appear dead.
              If none of these work, bring it to us. Assessment: from R599.
            </p>
          </div>

          <div className="space-y-4">
            {freeFixes.map((fix) => (
              <div
                key={fix.step}
                className="bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] rounded-2xl p-6 hover:border-[rgba(15,234,122,0.15)] transition-all"
              >
                <div className="flex items-start gap-5">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-[#0FEA7A]/10 border border-[#0FEA7A]/20 flex items-center justify-center">
                    <span className="text-[#0FEA7A] font-bold text-sm">{fix.step}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-[#E8F4F1] font-bold text-lg mb-2">{fix.title}</h3>
                    <p className="text-[#7A9E98] text-base leading-relaxed mb-3">{fix.detail}</p>
                    <div className="inline-flex items-start gap-2 bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)] rounded-lg px-3 py-2">
                      <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                      <span className="text-[#7A9E98] text-sm">{fix.note}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-[rgba(15,234,122,0.05)] border border-[#0FEA7A]/20 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="text-[#E8F4F1] font-semibold text-lg mb-1">None of these worked?</p>
              <p className="text-[#7A9E98]">Assessment: from R599 at our Hyde Park workshop. Takes 30 minutes. No charge regardless of outcome.</p>
            </div>
            <a
              href={`https://wa.me/27790539964?text=Hi%20ZA%20Support%2C%20my%20MacBook%20won%27t%20turn%20on%20%E2%80%94%20need%20help`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 inline-flex items-center gap-2 bg-[#0FEA7A] text-[#0A1A18] font-bold px-6 py-3 rounded-xl hover:bg-[#0FEA7A]/90 transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              Book Assessment
            </a>
          </div>
        </section>

        {/* ── Causes ── */}
        <section className="bg-[rgba(255,255,255,0.015)] border-y border-[rgba(255,255,255,0.06)]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-20">
            <div className="mb-12">
              <div className="inline-block bg-[#0FEA7A]/10 border border-[#0FEA7A]/20 rounded-full px-4 py-1.5 mb-4">
                <span className="text-[#0FEA7A] text-sm font-semibold">8 Most Common Causes</span>
              </div>
              <h2
                className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4"
               
              >
                Why Your MacBook Won&apos;t Turn On
              </h2>
              <p className="text-[#7A9E98] text-lg max-w-2xl">
                Eight causes account for over 95% of MacBooks that won&apos;t power on. Here is how to recognise them, and what repair costs look like.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {causes.map((cause) => (
                <div
                  key={cause.rank}
                  className={`bg-[rgba(255,255,255,0.03)] border ${borderColourMap[cause.colour]} rounded-2xl p-6 hover:bg-[rgba(255,255,255,0.05)] transition-all`}
                >
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex items-start gap-3">
                      <span className={`text-xs font-bold font-mono ${colourMap[cause.colour]} opacity-60`}>{cause.rank}</span>
                      <h3 className="text-[#E8F4F1] font-bold text-lg leading-snug">{cause.title}</h3>
                    </div>
                    {cause.fixable !== null && (
                      <span className={`flex-shrink-0 text-xs px-2 py-1 rounded-full font-semibold ${badgeColourMap[cause.colour]}`}>
                        {cause.fixable ? 'Repairable' : 'Assessed'}
                      </span>
                    )}
                    {cause.fixable === null && (
                      <span className="flex-shrink-0 text-xs px-2 py-1 rounded-full font-semibold bg-[rgba(255,255,255,0.05)] text-[#7A9E98] border border-[rgba(255,255,255,0.08)]">
                        Quote Required
                      </span>
                    )}
                  </div>

                  <p className="text-[#7A9E98] text-sm leading-relaxed mb-4">{cause.description}</p>

                  <div className="mb-4">
                    <p className="text-[#E8F4F1] text-xs font-semibold uppercase tracking-wide mb-2">Typical Symptoms</p>
                    <ul className="space-y-1">
                      {cause.symptoms.map((symptom) => (
                        <li key={symptom} className="flex items-start gap-2 text-[#7A9E98] text-sm">
                          <ChevronRight className={`w-3.5 h-3.5 flex-shrink-0 mt-0.5 ${colourMap[cause.colour]}`} />
                          {symptom}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-[rgba(255,255,255,0.06)]">
                    <div>
                      <p className="text-[#7A9E98] text-xs mb-1">Repair Time</p>
                      <p className="text-[#E8F4F1] font-semibold text-sm">{cause.repairTime}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-8 text-[#7A9E98] text-sm text-center">
              Prices confirmed in writing before work begins.{' '}
              <strong className="text-[#E8F4F1]">Assessment: from R599</strong> applies to all repairs.
            </p>
          </div>
        </section>

        {/* ── Process ── */}
        <section className="bg-[rgba(255,255,255,0.015)] border-y border-[rgba(255,255,255,0.06)]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-20">
            <div className="mb-12">
              <div className="inline-block bg-[#0FEA7A]/10 border border-[#0FEA7A]/20 rounded-full px-4 py-1.5 mb-4">
                <span className="text-[#0FEA7A] text-sm font-semibold">How It Works</span>
              </div>
              <h2
                className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4"
               
              >
                From Drop-Off to Fixed Mac
              </h2>
              <p className="text-[#7A9E98] text-lg max-w-2xl">
                A transparent process with no hidden steps and no surprise costs.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                {
                  step: '1',
                  title: 'Assessment: from R599',
                  detail: 'Drop off at Hyde Park or arrange collection. We test the power circuit, battery, logic board rails, and charging path. Completed within 24 hours. Assessment fee of from R599 applies at this stage.',
                  icon: <Wrench className="w-5 h-5" />,
                },
                {
                  step: '2',
                  title: 'Written Quote',
                  detail: 'You receive a fixed written quote: specific fault, parts needed, labour, and exact completion estimate. No ambiguous pricing. No scope creep.',
                  icon: <CheckCircle className="w-5 h-5" />,
                },
                {
                  step: '3',
                  title: 'Your Approval',
                  detail: 'We start work only after you approve. Decline the quote, walk away paying nothing. The machine is returned exactly as received.',
                  icon: <Shield className="w-5 h-5" />,
                },
                {
                  step: '4',
                  title: 'Component Repair',
                  detail: 'professional hot-air rework station, stereo microscope, precision soldering station. We target the specific faulty component — full board replacement is also available when needed.',
                  icon: <Cpu className="w-5 h-5" />,
                },
                {
                  step: '5',
                  title: 'Full Test Cycle',
                  detail: 'Power-on test, charge cycle, display output, USB-C enumeration, thermal monitoring under load, SMC and T2 validation on applicable models.',
                  icon: <Zap className="w-5 h-5" />,
                },
                {
                  step: '6',
                  title: 'Collection',
                  detail: 'Collect from Hyde Park or courier delivery across Johannesburg. up-to-3 year warranty issued. Most repairs complete within 24–72 hours.',
                  icon: <MapPin className="w-5 h-5" />,
                },
              ].map((item) => (
                <div key={item.step} className="bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-9 h-9 rounded-lg bg-[#0FEA7A]/10 border border-[#0FEA7A]/20 flex items-center justify-center text-[#0FEA7A]">
                      {item.icon}
                    </div>
                    <span className="text-[#7A9E98] text-xs font-bold font-mono">STEP {item.step}</span>
                  </div>
                  <h3 className="text-[#E8F4F1] font-bold text-base mb-2">{item.title}</h3>
                  <p className="text-[#7A9E98] text-sm leading-relaxed">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Reviews ── */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-20">
          <div className="mb-10">
            <div className="inline-flex items-center gap-2 mb-4">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className="w-5 h-5 fill-amber-400 text-amber-400" />
              ))}
              <span className="text-[#E8F4F1] font-bold ml-2">4.9 / 5</span>
              <span className="text-[#7A9E98] text-sm ml-1">— 632 verified reviews</span>
            </div>
            <h2
              className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1]"
             
            >
              What Johannesburg Clients Say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {suburbReviews.map((review) => (
              <div key={review.name} className="bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] rounded-2xl p-6">
                <div className="flex items-center gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-[#7A9E98] text-sm leading-relaxed mb-5 italic">&ldquo;{review.review}&rdquo;</p>
                <div className="pt-4 border-t border-[rgba(255,255,255,0.06)]">
                  <p className="text-[#E8F4F1] font-semibold text-sm">{review.name}</p>
                  <div className="flex items-center justify-between mt-1">
                    <span className="flex items-center gap-1 text-[#7A9E98] text-xs">
                      <MapPin className="w-3 h-3" />
                      {review.suburb}
                    </span>
                    <span className="text-[#0FEA7A] text-xs font-medium">{review.service}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="bg-[rgba(255,255,255,0.015)] border-y border-[rgba(255,255,255,0.06)]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-20">
            <FAQAccordion
              items={faqs}
              title="MacBook Not Turning On, Common Questions"
            />
          </div>
        </section>

        {/* ── Internal Links ── */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16">
          <h2
            className="text-2xl font-extrabold text-[#E8F4F1] mb-6"
           
          >
            Related Repairs
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: 'Logic Board Repair', href: '/logic-board-repair', description: 'Component-level board repair' },
              { label: 'Liquid Damage', href: '/liquid-damage', description: 'Water & liquid recovery' },
              { label: 'Battery Replacement', href: '/macbook-repair/battery', description: 'All MacBook models' },
              { label: 'Charging Port Repair', href: '/macbook-repair/charging-port', description: 'MagSafe & USB-C ports' },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] rounded-xl p-4 hover:border-[rgba(15,234,122,0.25)] hover:bg-[rgba(15,234,122,0.04)] transition-all"
              >
                <p className="text-[#E8F4F1] font-semibold text-sm mb-1 group-hover:text-[#0FEA7A] transition-colors">{link.label}</p>
                <p className="text-[#7A9E98] text-xs">{link.description}</p>
                <ArrowRight className="w-4 h-4 text-[#0FEA7A] mt-3 group-hover:translate-x-1 transition-transform" />
              </Link>
            ))}
          </div>
        </section>

        {/* ── Final CTA ── */}
        <section className="bg-[rgba(15,234,122,0.04)] border-t border-[#0FEA7A]/15">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-20 text-center">
            <div className="inline-flex items-center gap-2 bg-[#0FEA7A]/10 border border-[#0FEA7A]/20 rounded-full px-4 py-2 mb-6">
              <div className="w-2 h-2 rounded-full bg-[#0FEA7A] animate-pulse" />
              <span className="text-[#0FEA7A] text-sm font-semibold">Assessment: from R599</span>
            </div>

            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#E8F4F1] mb-5"
             
            >
              Ready to Get Your MacBook Fixed?
            </h2>

            <p className="text-[#7A9E98] text-lg mb-10 max-w-2xl mx-auto">
              Assessment: from R599. Written quote. Assessment: from R599. up-to-3 year warranty.
              Based in Hyde Park, Johannesburg, serving Sandton, Rosebank, Fourways and all surrounding suburbs.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
              <a
                href={`https://wa.me/27790539964?text=Hi%20ZA%20Support%2C%20my%20MacBook%20won%27t%20turn%20on%20%E2%80%94%20need%20help`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] font-bold px-8 py-4 rounded-xl text-lg hover:bg-[#0FEA7A]/90 transition-all shadow-lg shadow-[#0FEA7A]/20"
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp, Get Help Now
              </a>
              <a
                href={`tel:${CONTACT.phoneTel}`}
                className="inline-flex items-center justify-center gap-2 border border-[rgba(255,255,255,0.12)] text-[#E8F4F1] font-semibold px-8 py-4 rounded-xl text-lg hover:border-[#0FEA7A]/40 hover:text-[#0FEA7A] transition-all"
              >
                <Phone className="w-5 h-5" />
                Call {CONTACT.phone}
              </a>
            </div>

            {/* Address */}
            <div className="inline-flex items-center gap-2 text-[#7A9E98] text-sm">
              <MapPin className="w-4 h-4 text-[#0FEA7A]" />
              <span>1 Hyde Lane, Second Floor, Hyde Park, Johannesburg, Monday to Friday 08:00 – 17:30 · Closed Saturdays</span>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

