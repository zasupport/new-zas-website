import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, CheckCircle, ArrowRight, Cpu, Shield, Clock, Zap, Star, MapPin } from 'lucide-react';
import SchemaOrg from '@/components/seo/SchemaOrg';
import { buildFaqSchema, buildServiceSchema, buildBreadcrumbSchema } from '@/lib/schema';
import FAQAccordion from '@/components/ui/FAQ';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { CONTACT, SITE } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'MacBook Pro Logic Board Repair Johannesburg | No Fix No Fee | ZA Support',
  description:
    'MacBook Pro logic board repair in Johannesburg from R 1,800. Free diagnostic, No Fix No Fee, 12-month warranty. All Intel + M1/M2/M3 models. Hyde Park. Call 064 529 5863.',
  alternates: { canonical: 'https://zasupport.com/logic-board-repair/macbook-pro' },
  keywords: [
    'MacBook Pro logic board repair Johannesburg',
    'MacBook Pro no power repair',
    'MacBook Pro microsoldering Johannesburg',
    'component-level repair MacBook Pro',
    'MacBook Pro GPU repair Johannesburg',
    'MacBook Pro liquid damage board repair',
    'no fix no fee MacBook Pro',
  ],
};

const faultTable = [
  { fault: 'No Power / Dead MacBook Pro', cause: 'Blown fuse, failed MOSFET, damaged charging IC or corroded power rail', fixable: 'Yes — most cases', cost: 'From R 2,000' },
  { fault: 'Not Charging (USB-C / MagSafe 2)', cause: 'USB-C controller IC, Tristar/Hydra chip, I/O board failure or bent connector', fixable: 'Yes', cost: 'From R 1,800' },
  { fault: 'Black Screen / No Display', cause: 'Backlight fuse, backlight driver IC, GPU fault or damaged eDP connector', fixable: 'Yes — common repair', cost: 'From R 2,000' },
  { fault: 'GPU Artifacts (Intel 15"/16")', cause: 'AMD Radeon solder joint failure on discrete GPU package (BGA reflow/reball)', fixable: 'Yes — Intel models', cost: 'From R 3,500' },
  { fault: 'Liquid Damage Corrosion', cause: 'Electrolytic corrosion attacking traces, pads and components after liquid exposure', fixable: 'Often yes', cost: 'From R 2,500' },
  { fault: 'Kernel Panic / Crash Loop', cause: 'Failed capacitor on power rail, RAM controller fault, or storage controller failure', fixable: 'Yes — after diagnosis', cost: 'From R 2,200' },
  { fault: 'USB-C / Thunderbolt Not Working', cause: 'Thunderbolt IC (JHL7540/JHL8040), USB-C mux or I/O board failure', fixable: 'Yes', cost: 'From R 1,800' },
  { fault: 'Touch Bar Not Responding', cause: 'Touch Bar flex cable, BRDG IC, or T1/T2 chip communication fault', fixable: 'Usually yes', cost: 'From R 1,500' },
  { fault: 'Fan at Full Speed / SMC Error', cause: 'Failed thermal sensor IC, bad SMC, or fan controller fault on logic board', fixable: 'Yes', cost: 'From R 1,500' },
  { fault: 'U3100 NAND / Storage Fault', cause: 'Failed NAND controller causing boot failure or unrecognised storage', fixable: 'Sometimes', cost: 'From R 2,500' },
];

const repairProcess = [
  { step: '1', title: 'Free Diagnostic', detail: 'We inspect the board under microscope. Power rail testing, short-circuit mapping, and component identification. No charge, no obligation. Completed within 24 hours.' },
  { step: '2', title: 'Written Quote', detail: 'You receive a clear quote covering the specific fault, parts needed, labour, and a completion estimate. No ambiguous "from" pricing at this stage — it is a fixed quote.' },
  { step: '3', title: 'Your Approval', detail: 'We begin work only after you approve the quote. If you decline, you walk away paying nothing. The machine is returned exactly as received.' },
  { step: '4', title: 'Component-Level Repair', detail: 'Our technician uses a Hakko FM-204 hot air station, Leica stereo microscope, and JBC soldering iron to replace the specific failed component. We reflow solder, replace ICs, and repair traces as needed.' },
  { step: '5', title: 'Multi-Stage Testing', detail: 'Before closing the machine: power-on test, full charge cycle, display output check, USB-C port enumeration, thermal monitoring under load, and SMC/T2 validation on applicable models.' },
  { step: '6', title: 'Collection or Delivery', detail: 'You collect from Hyde Park or we arrange secure courier delivery across Johannesburg. Most repairs completed within 3–5 business days from approval.' },
];

const modelCompatibility = [
  { year: '2015–2017', model: 'MacBook Pro 13" & 15"', chip: 'Intel Core i5/i7', repairable: 'Full component repair — most faults repairable' },
  { year: '2016–2019', model: 'MacBook Pro 13" & 15" (Touch Bar)', chip: 'Intel Core i5/i7/i9', repairable: 'Full repair — Touch Bar, GPU, USB-C, power circuits' },
  { year: '2019–2020', model: 'MacBook Pro 13" (Intel)', chip: 'Intel Core i5/i7', repairable: 'Full component repair' },
  { year: '2019–2020', model: 'MacBook Pro 16" (Intel)', chip: 'Intel Core i7/i9', repairable: 'Full repair — discrete AMD GPU reballable' },
  { year: '2020', model: 'MacBook Pro 13" (M1)', chip: 'Apple M1', repairable: 'Surrounding components repaired — SoC cannot be replaced' },
  { year: '2021', model: 'MacBook Pro 14" & 16" (M1 Pro/Max)', chip: 'Apple M1 Pro / M1 Max', repairable: 'Power management, USB-C controllers, display circuits repairable' },
  { year: '2022', model: 'MacBook Pro 13" (M2)', chip: 'Apple M2', repairable: 'Surrounding components repaired — SoC cannot be replaced' },
  { year: '2023', model: 'MacBook Pro 14" & 16" (M2 Pro/Max)', chip: 'Apple M2 Pro / M2 Max', repairable: 'Board-level repair for surrounding components' },
  { year: '2023–2024', model: 'MacBook Pro 14" & 16" (M3 / M3 Pro / M3 Max)', chip: 'Apple M3 family', repairable: 'Power delivery, USB-C IC, display path — all repairable' },
];

const faqs = [
  {
    question: 'How long does MacBook Pro logic board repair take?',
    answer: 'The diagnostic is completed within 24 hours. Simple repairs — USB-C controllers, backlight circuits, power fuse — are typically done within 48–72 hours. Complex microsoldering jobs such as multi-component liquid damage or GPU reball take 3–5 business days. We confirm the timeframe at the assessment stage before any work begins.',
  },
  {
    question: 'Do you offer a warranty on logic board repairs?',
    answer: 'Yes — all ZA Support logic board repairs carry a 12-month warranty on the repaired component and any parts replaced. This is significantly longer than the industry standard in Johannesburg, where most repair shops offer 1–3 months. If the same fault returns within 12 months, we repair it at no charge.',
  },
  {
    question: 'What if my MacBook Pro cannot be fixed?',
    answer: 'You pay nothing. Our No Fix No Fee policy is unconditional — if we cannot repair the fault, the diagnostic is free and the machine is returned to you exactly as it was received. We will give you an honest assessment of your options: board replacement pricing, data recovery, or part-out value.',
  },
  {
    question: 'Is it worth repairing a MacBook Pro versus buying a new one?',
    answer: 'In most cases, yes. Apple charges R 15,000–R 35,000 for a replacement logic board. Our component-level repairs start from R 1,800 — saving you R 13,000 or more. We will always tell you honestly if repair is not economically viable for your model and fault. For MacBook Pros 2016 and newer, repair almost always beats replacement on cost.',
  },
  {
    question: 'Do you repair Apple Silicon (M1, M2, M3) MacBook Pro logic boards?',
    answer: 'Yes, with some important distinctions. On Apple Silicon models, the M-series SoC (which contains the CPU, GPU, RAM, and Neural Engine) cannot be replaced at chip level — it is manufactured as a single unified package. However, all surrounding components are fully repairable: power management ICs, USB-C controller chips, display circuits, backlight drivers, charging paths, and board traces. Most MacBook Pro M-series failures occur in these surrounding components, not the SoC itself.',
  },
  {
    question: 'Can you repair a liquid-damaged MacBook Pro logic board?',
    answer: 'Yes. Liquid damage is one of our most common repairs. The process involves ultrasonic cleaning to remove corrosion, microscope inspection of every trace and pad, and replacement of damaged components. Success depends on how quickly the machine was powered off after the spill and how far corrosion has progressed. We assess each case on its merits — and if we cannot guarantee a reliable repair, we say so upfront.',
  },
  {
    question: 'Do you offer collection or delivery across Johannesburg?',
    answer: 'Yes. You are welcome to bring your MacBook Pro to our Hyde Park workshop at 1 Hyde Lane, Second Floor. We also work with clients in Sandton, Rosebank, Bryanston, Fourways, Randburg, and Midrand — secure courier collection and return can be arranged. Contact us to discuss logistics.',
  },
  {
    question: 'What areas in Johannesburg do you serve?',
    answer: 'Our workshop is in Hyde Park, Johannesburg. We serve clients across the city including Sandton, Rosebank, Illovo, Bryanston, Fourways, Midrand, Randburg, Melrose, Parkhurst, Morningside, and Edenvale. For clients further afield, we accept courier-in repairs with tracked delivery.',
  },
  {
    question: 'My MacBook Pro 15" Intel shows GPU artifacts and flickering. What is happening?',
    answer: 'This is almost certainly a discrete GPU failure — specifically, solder joint failure between the AMD Radeon GPU package and the logic board. This is a known issue on 2011–2019 Intel MacBook Pros with discrete GPUs. The repair involves reballing (removing the chip, cleaning the pads, applying fresh solder balls, and reflowing) or component-level repair of the GPU package. It is a definitive fix, not a temporary workaround, and is covered by our 12-month warranty.',
  },
  {
    question: 'My MacBook Pro stopped working after the USB-C port was damaged. What is the repair path?',
    answer: 'On most MacBook Pro models from 2016 onwards, the USB-C ports connect via a separate I/O board, which can be replaced independently of the main logic board — typically from R 1,800. If the damage extended to the Thunderbolt controller IC on the main logic board (Titan Ridge on Intel models, Apple-custom on M-series), that requires microsoldering. We assess the exact damage path during the free diagnostic.',
  },
];

const reviews = [
  { name: 'Sarah M.', location: 'Sandton', rating: 5, text: 'Best Apple repair experience I\'ve had in Johannesburg. The team clearly knows their stuff — they diagnosed a logic board issue other shops had missed.', service: 'Logic Board Repair' },
  { name: 'Michael B.', location: 'Hyde Park', rating: 5, text: 'Courtney and the team saved my MacBook Pro after a coffee spill. They were honest about the prognosis upfront and delivered exactly what they promised. Worth every rand.', service: 'Liquid Damage Repair' },
  { name: 'David K.', location: 'Rosebank', rating: 5, text: 'My 2019 MacBook Pro 16" had GPU artifacts across the screen. ZA Support diagnosed it within a day and had it fixed in 4 days. 3 months later — still perfect.', service: 'GPU Repair' },
  { name: 'Nomvula T.', location: 'Bryanston', rating: 5, text: 'Dead MacBook Pro on the morning of a huge presentation. Called at 8am, dropped it off by 9am, had a quote by lunch. Repaired next day. Outstanding service.', service: 'No Power Repair' },
];

const serviceAreas = [
  'Johannesburg', 'Hyde Park', 'Sandton', 'Rosebank', 'Illovo',
  'Bryanston', 'Fourways', 'Midrand', 'Randburg', 'Melrose',
  'Morningside', 'Sandhurst', 'Parkhurst', 'Edenvale', 'Greenside', 'Linden',
];

const faqSchema = buildFaqSchema(faqs);
const serviceSchema = buildServiceSchema({
  name: 'MacBook Pro Logic Board Repair Johannesburg',
  description: 'Expert MacBook Pro logic board repair and microsoldering in Johannesburg. All Intel and Apple Silicon models. Free diagnostic. No Fix No Fee. 12-month warranty.',
  lowPrice: '1800',
  highPrice: '8000',
});
const breadcrumbSchema = buildBreadcrumbSchema([
  { name: 'Home', url: 'https://zasupport.com' },
  { name: 'Logic Board Repair', url: 'https://zasupport.com/logic-board-repair' },
  { name: 'MacBook Pro', url: 'https://zasupport.com/logic-board-repair/macbook-pro' },
]);

export default function MacBookProLogicBoardPage() {
  return (
    <>
      <SchemaOrg schema={faqSchema} />
      <SchemaOrg schema={serviceSchema} />
      <SchemaOrg schema={breadcrumbSchema} />

      {/* Hero */}
      <section className="hero-gradient grid-overlay pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[
            { label: 'Logic Board Repair', href: '/logic-board-repair' },
            { label: 'MacBook Pro' },
          ]} />
          <div className="mt-8 max-w-4xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#E8F4F1] leading-tight mb-6" style={{ fontFamily: 'Syne, sans-serif' }}>
              MacBook Pro Logic Board Repair
              <br /><span className="text-[#0FEA7A]">Johannesburg — No Fix No Fee</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-4 max-w-3xl leading-relaxed">
              Component-level microsoldering for MacBook Pro logic board faults. From R 1,800.
              All Intel and Apple Silicon models. Free diagnostic with no obligation.
            </p>
            <p className="text-base text-[#7A9E98] mb-8 max-w-3xl leading-relaxed">
              We repair the board — we do not just replace it. That is the difference between a R 1,800 fix
              and a R 25,000 Apple Store bill. Hyde Park, Johannesburg.
            </p>
            <div className="flex flex-wrap gap-3 mb-8">
              {[
                { icon: Shield, label: 'No Fix No Fee' },
                { icon: Clock, label: '3–5 Day Turnaround' },
                { icon: Zap, label: 'Free Diagnostic' },
                { icon: CheckCircle, label: '12-Month Warranty' },
                { icon: Cpu, label: 'Microscope Microsoldering' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 bg-[rgba(15,234,122,0.08)] border border-[rgba(15,234,122,0.15)] px-3 py-2 rounded-full">
                  <Icon className="w-4 h-4 text-[#0FEA7A]" />
                  <span className="text-[#E8F4F1] text-sm font-medium">{label}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={CONTACT.whatsappLogicBoard}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 hover:shadow-[0_0_32px_rgba(15,234,122,0.4)] transition-all"
              >
                💬 WhatsApp for Quote
              </a>
              <a
                href={CONTACT.booking}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all"
              >
                📅 Book Online
              </a>
              <a
                href={`tel:${CONTACT.phoneTel}`}
                className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.2)] text-[#7A9E98] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[rgba(15,234,122,0.05)] transition-all"
              >
                <Phone className="w-5 h-5" /> Call {CONTACT.phone}
              </a>
            </div>
            <div className="flex flex-wrap gap-6 mt-8 pt-6 border-t border-[rgba(255,255,255,0.06)]">
              {[
                { value: SITE.repairsCount, label: 'Devices Repaired' },
                { value: `${SITE.yearsExperience} Years`, label: 'In Business Since 2012' },
                { value: `${SITE.rating}★`, label: `${SITE.reviewCount} Google Reviews` },
                { value: '12 Months', label: 'Warranty — Written. No Exceptions.' },
              ].map(({ value, label }) => (
                <div key={label}>
                  <p className="text-[#0FEA7A] text-xl font-extrabold" style={{ fontFamily: 'Syne, sans-serif' }}>{value}</p>
                  <p className="text-[#7A9E98] text-xs mt-0.5">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What is a logic board fault? */}
      <section className="py-20 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-6" style={{ fontFamily: 'Syne, sans-serif' }}>
            What Is a MacBook Pro Logic Board Fault?
          </h2>
          <div className="space-y-5 text-[#7A9E98] leading-relaxed">
            <p>
              The logic board is the main circuit board inside your MacBook Pro. Every component in the machine
              connects to it — the processor, memory, storage, display, USB-C ports, battery, fans, and keyboard.
              When the logic board fails, the effects range from a completely dead machine to subtle problems like
              random shutdowns, a flickering screen, or a port that stopped working after a bump.
            </p>
            <p>
              Most people hear &ldquo;logic board fault&rdquo; and assume the machine is done. It is usually not. Logic board
              failures are almost always caused by a single failed component — one chip, one capacitor, one damaged
              trace. A microsoldering repair replaces that specific component under a stereo microscope, restoring the
              board to full function. The cost is a fraction of a new board or a new machine.
            </p>
            <p>
              Apple does not offer component-level repair — they replace the entire board, which starts at R 15,000
              and can exceed R 35,000 for newer models. We repair the component. Same result, fraction of the cost.
            </p>
            <h3 className="text-xl font-bold text-[#E8F4F1] mt-8 mb-4" style={{ fontFamily: 'Syne, sans-serif' }}>
              Common Symptoms of a Logic Board Problem
            </h3>
            <ul className="space-y-3">
              {[
                'MacBook Pro will not turn on — no fan, no light, no response',
                'Turns on but screen stays black (no display at all)',
                'Random shutdowns, especially under load',
                'Kernel panics — repeated crashes with a restart message',
                'GPU artifacts — coloured bars, flickering pixels, distorted image',
                'USB-C ports not charging or not recognising accessories',
                'Charging works on one port but not the other',
                'Fan runs at full speed constantly, even at idle',
                'Touch Bar stops responding or shows nothing',
                'MacBook Pro restarts after liquid exposure',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="text-[#0FEA7A] font-bold mt-0.5">→</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4">
              If your MacBook Pro is showing any of these symptoms, bring it in or send us a WhatsApp message. The
              diagnostic is always free.
            </p>
          </div>
        </div>
      </section>

      {/* Fault Table */}
      <section className="py-20 bg-[#111C1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4" style={{ fontFamily: 'Syne, sans-serif' }}>
            Common MacBook Pro Logic Board Faults
          </h2>
          <p className="text-[#7A9E98] mb-10 max-w-2xl">
            A breakdown of the most common MacBook Pro logic board faults we repair, the underlying cause,
            whether repair is typically viable, and indicative pricing. Your specific quote is confirmed
            after the free diagnostic.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[rgba(15,234,122,0.15)]">
                  <th className="text-left text-[#E8F4F1] font-bold pb-4 pr-6">Fault</th>
                  <th className="text-left text-[#E8F4F1] font-bold pb-4 pr-6">Cause</th>
                  <th className="text-left text-[#E8F4F1] font-bold pb-4 pr-6">Fixable?</th>
                  <th className="text-left text-[#E8F4F1] font-bold pb-4">Typical Cost</th>
                </tr>
              </thead>
              <tbody>
                {faultTable.map((row, i) => (
                  <tr key={row.fault} className={`${i < faultTable.length - 1 ? 'border-b border-[rgba(255,255,255,0.05)]' : ''}`}>
                    <td className="py-4 pr-6 text-[#E8F4F1] font-semibold align-top">{row.fault}</td>
                    <td className="py-4 pr-6 text-[#7A9E98] align-top">{row.cause}</td>
                    <td className="py-4 pr-6 align-top">
                      <span className={`inline-block px-2 py-0.5 rounded text-xs font-semibold ${row.fixable.startsWith('Yes') ? 'bg-[rgba(15,234,122,0.1)] text-[#0FEA7A]' : 'bg-[rgba(122,158,152,0.1)] text-[#7A9E98]'}`}>
                        {row.fixable}
                      </span>
                    </td>
                    <td className="py-4 text-[#0FEA7A] font-bold align-top whitespace-nowrap">{row.cost}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-[#7A9E98] text-xs mt-4">
            Prices are starting points based on common repair paths. Final pricing is confirmed in a written quote after the free diagnostic. No work begins without your approval.
          </p>
        </div>
      </section>

      {/* Repair Process */}
      <section className="py-20 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4" style={{ fontFamily: 'Syne, sans-serif' }}>
            Our Repair Process
          </h2>
          <p className="text-[#7A9E98] mb-12 max-w-2xl">
            Every MacBook Pro logic board repair follows the same process. No surprises, no hidden costs,
            no work done without your explicit approval.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {repairProcess.map((step) => (
              <div key={step.step} className="glass-card p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-full bg-[rgba(15,234,122,0.1)] border border-[rgba(15,234,122,0.3)] flex items-center justify-center flex-shrink-0">
                    <span className="text-[#0FEA7A] font-bold text-sm">{step.step}</span>
                  </div>
                  <h3 className="text-[#E8F4F1] font-bold" style={{ fontFamily: 'Syne, sans-serif' }}>{step.title}</h3>
                </div>
                <p className="text-[#7A9E98] text-sm leading-relaxed">{step.detail}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 p-5 bg-[rgba(15,234,122,0.05)] border border-[rgba(15,234,122,0.15)] rounded-2xl max-w-2xl">
            <p className="text-[#E8F4F1] font-semibold mb-1">Typical turnaround</p>
            <p className="text-[#7A9E98] text-sm">
              Most MacBook Pro logic board repairs are completed within <strong className="text-[#E8F4F1]">3–5 business days</strong> from
              the point of approval. Simple repairs (USB-C, backlight, power fuse) are often completed in 48–72 hours.
              Complex jobs such as multi-component liquid damage are quoted with a specific timeline.
            </p>
          </div>
        </div>
      </section>

      {/* Model Compatibility */}
      <section className="py-20 bg-[#111C1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4" style={{ fontFamily: 'Syne, sans-serif' }}>
            MacBook Pro Model Compatibility
          </h2>
          <p className="text-[#7A9E98] mb-10 max-w-2xl">
            We repair all MacBook Pro models from 2015 onwards, covering both Intel and Apple Silicon generations.
            The repair scope differs between Intel and M-series boards — see the table below.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[rgba(15,234,122,0.15)]">
                  <th className="text-left text-[#E8F4F1] font-bold pb-4 pr-6">Year</th>
                  <th className="text-left text-[#E8F4F1] font-bold pb-4 pr-6">Model</th>
                  <th className="text-left text-[#E8F4F1] font-bold pb-4 pr-6">Chip</th>
                  <th className="text-left text-[#E8F4F1] font-bold pb-4">Repair Scope</th>
                </tr>
              </thead>
              <tbody>
                {modelCompatibility.map((row, i) => (
                  <tr key={`${row.year}-${row.model}`} className={`${i < modelCompatibility.length - 1 ? 'border-b border-[rgba(255,255,255,0.05)]' : ''}`}>
                    <td className="py-4 pr-6 text-[#7A9E98] align-top whitespace-nowrap">{row.year}</td>
                    <td className="py-4 pr-6 text-[#E8F4F1] font-semibold align-top">{row.model}</td>
                    <td className="py-4 pr-6 text-[#7A9E98] align-top whitespace-nowrap">{row.chip}</td>
                    <td className="py-4 text-[#7A9E98] align-top">{row.repairable}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-6 p-5 bg-[rgba(15,234,122,0.05)] border border-[rgba(15,234,122,0.15)] rounded-2xl">
            <p className="text-[#E8F4F1] font-semibold mb-2">Note on Apple Silicon (M1/M2/M3)</p>
            <p className="text-[#7A9E98] text-sm">
              On M-series MacBook Pros, the processor, GPU, RAM, and Neural Engine are integrated into a single chip
              (the SoC). This chip cannot be replaced individually — it is bonded to the board at manufacturing.
              However, the majority of MacBook Pro M-series failures occur in the <em>surrounding</em> components:
              USB-C controllers, power management ICs, charging path components, backlight drivers, and board traces.
              All of these are repairable. We will tell you clearly during the diagnostic if the fault is in the SoC
              itself (rare) or in a repairable surrounding component (common).
            </p>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4" style={{ fontFamily: 'Syne, sans-serif' }}>
            MacBook Pro Logic Board Repair Pricing
          </h2>
          <p className="text-[#7A9E98] mb-8 max-w-2xl">
            All prices are starting points. Your exact repair cost is confirmed in a written quote after the free
            diagnostic — never before. We do not charge for assessments that end in &ldquo;beyond repair&rdquo;.
          </p>
          <div className="glass-card overflow-hidden p-0 mb-6">
            {[
              { item: 'Diagnostic Assessment', price: 'Free', note: 'Full board inspection under microscope. No charge, no obligation.' },
              { item: 'USB-C / I/O Board Repair', price: 'From R 1,800', note: 'Port board replacement or USB-C controller IC microsoldering' },
              { item: 'Backlight / Display Circuit Repair', price: 'From R 2,000', note: 'Backlight fuse, driver IC, or eDP connector fault' },
              { item: 'Power Circuit Repair', price: 'From R 2,000', note: 'No-power diagnosis, fuse, MOSFET, or charging IC replacement' },
              { item: 'Liquid Damage Repair', price: 'From R 2,500', note: 'Ultrasonic clean, trace repair, component replacement' },
              { item: 'GPU Reballing (Intel Models)', price: 'From R 3,500', note: 'AMD Radeon discrete GPU — BGA reflow or reball' },
              { item: 'Logic Board Replacement', price: 'From R 8,000', note: 'Only recommended when component repair is not viable' },
            ].map((item, i, arr) => (
              <div key={item.item} className={`flex items-start justify-between p-5 ${i < arr.length - 1 ? 'border-b border-[rgba(255,255,255,0.05)]' : ''}`}>
                <div className="flex-1 pr-6">
                  <p className="text-[#E8F4F1] font-semibold">{item.item}</p>
                  <p className="text-[#7A9E98] text-xs mt-0.5">{item.note}</p>
                </div>
                <span className="text-[#0FEA7A] font-bold whitespace-nowrap">{item.price}</span>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 bg-[rgba(15,234,122,0.05)] border border-[rgba(15,234,122,0.15)] rounded-2xl">
              <p className="text-[#E8F4F1] font-bold mb-2">Our repair vs Apple Store</p>
              <p className="text-[#7A9E98] text-sm">Apple charges R 15,000–R 35,000 for a logic board replacement. Our component-level repair
                typically costs R 1,800–R 4,500. Same result — your machine works again — for a fraction of the price.</p>
            </div>
            <div className="p-5 bg-[rgba(15,234,122,0.05)] border border-[rgba(15,234,122,0.15)] rounded-2xl">
              <p className="text-[#E8F4F1] font-bold mb-2">No Fix No Fee — guaranteed</p>
              <p className="text-[#7A9E98] text-sm">If we cannot repair your MacBook Pro logic board, you pay nothing.
                The diagnostic is free. The assessment is free. Zero obligation, zero risk to you.</p>
            </div>
          </div>
          <div className="rounded-xl border border-[#0FEA7A]/30 bg-[#0FEA7A]/5 p-5 mt-6">
            <p className="text-sm text-[#7A9E98]">
              💡 <strong className="text-[#E8F4F1]">Price comparison:</strong> Some Johannesburg repair shops charge R 4,999 or more for MacBook Pro logic board repair. ZA Support starts from <strong className="text-[#0FEA7A]">R 1,800</strong> — with a 12-month warranty and No Fix No Fee guarantee included.
            </p>
          </div>
        </div>
      </section>

      {/* Why ZA Support */}
      <section className="py-20 bg-[#111C1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4" style={{ fontFamily: 'Syne, sans-serif' }}>
            Why Choose ZA Support for MacBook Pro Logic Board Repair?
          </h2>
          <p className="text-[#7A9E98] mb-12 max-w-2xl">
            There are other repair shops in Johannesburg. Here is what separates us from them — and why
            it matters when you are trusting someone with your MacBook Pro logic board.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Star,
                title: `${SITE.rating} Stars — ${SITE.reviewCount} Reviews`,
                body: 'Verified Google reviews from clients across Johannesburg. We do not cherry-pick — our review profile is public and unfiltered.',
              },
              {
                icon: Clock,
                title: `${SITE.yearsExperience} Years of Apple Repair`,
                body: 'Founded in 2012, we have been repairing MacBook logic boards longer than most shops in JHB have been open. Over 3,000 repairs completed.',
              },
              {
                icon: CheckCircle,
                title: '12-Month Warranty',
                body: 'Our warranty period is 12 months on every repaired component. The industry standard in JHB is 1–3 months. We stand behind our work.',
              },
              {
                icon: Shield,
                title: 'No Fix No Fee — No Exceptions',
                body: 'If we cannot fix it, you pay nothing. We are one of the only repair specialists in Johannesburg offering this unconditionally on logic board repairs.',
              },
            ].map(({ icon: Icon, title, body }) => (
              <div key={title} className="glass-card p-6">
                <div className="w-10 h-10 rounded-xl bg-[rgba(15,234,122,0.1)] flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-[#0FEA7A]" />
                </div>
                <h3 className="text-[#E8F4F1] font-bold mb-3" style={{ fontFamily: 'Syne, sans-serif' }}>{title}</h3>
                <p className="text-[#7A9E98] text-sm leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 glass-card p-6 max-w-3xl">
            <h3 className="text-[#E8F4F1] font-bold mb-3" style={{ fontFamily: 'Syne, sans-serif' }}>
              Component-level repair — not just board replacement
            </h3>
            <p className="text-[#7A9E98] text-sm leading-relaxed">
              Most repair shops in Johannesburg only offer board replacement — they swap the entire logic board for a new
              or refurbished one. This is expensive (R 8,000+) and often unnecessary. ZA Support performs component-level
              microsoldering: we identify and replace the specific failed chip or component on your existing board. Your
              data stays put, your Touch ID pairing is preserved, and you get your machine back at 60–80% less than a
              board replacement would cost. We have the equipment, the training, and the track record to do this on
              every MacBook Pro model from 2015 to 2024.
            </p>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-20 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-10" style={{ fontFamily: 'Syne, sans-serif' }}>
            What Our Clients Say
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {reviews.map((review) => (
              <div key={review.name} className="glass-card p-5 flex flex-col">
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#0FEA7A] text-[#0FEA7A]" />
                  ))}
                </div>
                <p className="text-[#7A9E98] text-sm leading-relaxed flex-1 mb-4">&ldquo;{review.text}&rdquo;</p>
                <div>
                  <p className="text-[#E8F4F1] font-semibold text-sm">{review.name}</p>
                  <p className="text-[#7A9E98] text-xs">{review.location} · {review.service}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQAccordion items={faqs} title="MacBook Pro Logic Board Repair — FAQs" />
        </div>
      </section>

      {/* Service Areas */}
      <section className="py-16 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-4 mb-6">
            <MapPin className="w-5 h-5 text-[#0FEA7A] flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-xl font-bold text-[#E8F4F1] mb-2" style={{ fontFamily: 'Syne, sans-serif' }}>
                MacBook Pro Logic Board Repair Across Johannesburg
              </h2>
              <p className="text-[#7A9E98] text-sm max-w-2xl">
                Our workshop is in Hyde Park. We serve clients across Johannesburg — bring your Mac to us,
                or arrange secure courier collection anywhere in the city.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {serviceAreas.map((area) => (
              <span key={area} className="px-3 py-1.5 bg-[rgba(15,234,122,0.06)] border border-[rgba(15,234,122,0.12)] rounded-full text-[#7A9E98] text-sm">
                {area}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Related */}
      <section className="py-12 bg-[#111C1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-lg font-bold text-[#E8F4F1] mb-5" style={{ fontFamily: 'Syne, sans-serif' }}>Related Services</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { title: 'MacBook Air Logic Board', href: '/logic-board-repair/macbook-air', price: 'From R 2,000' },
              { title: 'Logic Board Repair Hub', href: '/logic-board-repair', price: 'All Devices' },
              { title: 'Liquid Damage Repair', href: '/liquid-damage', price: 'From R 2,500' },
            ].map((item) => (
              <Link key={item.href} href={item.href} className="glass-card p-4 flex items-center justify-between group">
                <div>
                  <p className="text-[#E8F4F1] font-semibold text-sm">{item.title}</p>
                  <p className="text-[#0FEA7A] text-xs mt-0.5">{item.price}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-[#7A9E98] group-hover:text-[#0FEA7A] transition-colors" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-[rgba(39,80,77,0.3)] border border-[rgba(15,234,122,0.2)] rounded-3xl p-10">
            <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3" style={{ fontFamily: 'Syne, sans-serif' }}>
              MacBook Pro Logic Board Fault?
            </h2>
            <p className="text-[#7A9E98] mb-2">Free diagnostic. No Fix No Fee. 12-month warranty. Hyde Park, Johannesburg.</p>
            <p className="text-[#7A9E98] text-sm mb-8">Monday – Friday 08:00–17:30 · Saturday 09:00–13:00</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={CONTACT.whatsappLogicBoard}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 transition-all"
              >
                💬 WhatsApp for Quote
              </a>
              <a
                href={`tel:${CONTACT.phoneTel}`}
                className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all"
              >
                <Phone className="w-5 h-5" /> Call {CONTACT.phone}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
