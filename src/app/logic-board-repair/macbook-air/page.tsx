import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, CheckCircle, ArrowRight, Cpu, Shield, Clock, Zap, Star, MapPin } from 'lucide-react';
import SchemaOrg from '@/components/seo/SchemaOrg';
import { buildFaqSchema, buildServiceSchema, buildBreadcrumbSchema } from '@/lib/schema';
import FAQAccordion from '@/components/ui/FAQ';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { CONTACT, SITE } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'MacBook Air Logic Board Repair | ZA Support',
  description:
    'MacBook Air logic board repair in Johannesburg. Assessment: from R599, up-to-3 year warranty. All Intel + M1/M2/M3 models. Hyde Park. Call 064 529 5863.',
  alternates: { canonical: 'https://zasupport.com/logic-board-repair/macbook-air' },
  keywords: [
    'MacBook Air logic board repair Johannesburg',
    'MacBook Air no power repair',
    'MacBook Air component-level repair Johannesburg',
    'MacBook Air M1 M2 M3 logic board repair',
    'MacBook Air liquid damage board repair',
    'component-level repair MacBook Air',
    'assessment: from R599 MacBook Air Johannesburg',
  ],
};

const faultTable = [
  { fault: 'No Power / Completely Dead', cause: 'Blown F7000 fuse, failed MOSFET, damaged ISL6259 or corroded power rail', fixable: 'Yes, most cases' },
  { fault: 'Not Charging on USB-C', cause: 'USB-C controller IC, Tristar/Hydra chip (Intel), or power management fault', fixable: 'Yes' },
  { fault: 'Black Screen / No Backlight', cause: 'Backlight fuse LP8550, backlight driver, or damaged eDP display connector', fixable: 'Yes, common repair' },
  { fault: 'Liquid Damage Corrosion', cause: 'Electrolytic corrosion from water, coffee or beverage exposure', fixable: 'Often yes' },
  { fault: 'Random Shutdowns / Kernel Panics', cause: 'Failing power capacitor, bad voltage regulator, or unstable power rail', fixable: 'Yes, after diagnosis' },
  { fault: 'USB-C Port Not Working', cause: 'USB-C controller IC fault or physical port damage extending to board', fixable: 'Yes' },
  { fault: 'Fan at Full Speed Constantly', cause: 'Failed thermal sensor IC or fan controller fault on logic board', fixable: 'Yes' },
  { fault: 'No External Display Output', cause: 'DisplayPort mux IC fault or damaged USB-C alt-mode controller', fixable: 'Usually yes' },
  { fault: 'Touch ID Not Working', cause: 'Secure Enclave communication fault or T2/internal board pairing issue', fixable: 'Sometimes' },
  { fault: 'Boots to External Display Only', cause: 'Backlight circuit fault, display path working but backlight failed', fixable: 'Yes, isolated fault' },
];

const repairProcess = [
  { step: '1', title: 'Diagnostic: from R599', detail: 'We inspect the board under stereo microscope. Power rail probing, short-circuit mapping, and thermal imaging where applicable. Completed within 24 hours.' },
  { step: '2', title: 'Written Quote', detail: 'You receive a specific written quote: fault identified, parts required, labour, and turnaround time. This is a fixed quote, no surprises when you collect.' },
  { step: '3', title: 'Your Approval', detail: 'Work begins only after you approve the quote. If you decline for any reason, the machine is returned exactly as received, no charge.' },
  { step: '4', title: 'Component-Level Repair', detail: 'Using a stereo microscope, professional hot-air rework station, and precision soldering station, we replace the specific failed component, whether a fuse, capacitor, controller IC, or damaged trace.' },
  { step: '5', title: 'Multi-Stage Testing', detail: 'Post-repair verification: power-on and charge cycle test, display output (internal + external), USB-C device enumeration, thermal monitoring, and T2/SMC validation on applicable models.' },
  { step: '6', title: 'Collection or Delivery', detail: 'Collect from our Hyde Park workshop or arrange secure courier return across Johannesburg. Most MacBook Air logic board repairs are completed within 3–5 business days from approval.' },
];

const modelCompatibility = [
  { year: '2015–2017', model: 'MacBook Air 11" & 13"', chip: 'Intel Core i5/i7', repairable: 'Full component repair, power, USB-A/C, display circuits' },
  { year: '2018–2019', model: 'MacBook Air 13" (USB-C)', chip: 'Intel Core i5', repairable: 'Full component repair, USB-C, backlight, power rail' },
  { year: '2020', model: 'MacBook Air 13" (Intel)', chip: 'Intel Core i3/i5/i7', repairable: 'Full repair, Touch ID board, USB-C controller, backlight' },
  { year: '2020', model: 'MacBook Air 13" (M1)', chip: 'Apple M1', repairable: 'Surrounding components, USB-C IC, power management, backlight' },
  { year: '2022', model: 'MacBook Air 13" (M2)', chip: 'Apple M2', repairable: 'Power delivery, USB-C controllers, display path, all repairable' },
  { year: '2023', model: 'MacBook Air 15" (M2)', chip: 'Apple M2', repairable: 'Board-level repair for surrounding components' },
  { year: '2024', model: 'MacBook Air 13" & 15" (M3)', chip: 'Apple M3', repairable: 'Power management, USB-C IC, display circuit, repairable' },
];

const faqs = [
  {
    question: 'How long does MacBook Air logic board repair take?',
    answer: 'The diagnostic is completed within 24 hours of drop-off. Simple repairs, USB-C controller, backlight circuit, power fuse, are typically done within 48–72 hours. More complex work such as multi-component liquid damage takes 3–5 business days. We confirm the timeframe in your written quote before any repair begins.',
  },
  {
    question: 'Do you offer a warranty on MacBook Air logic board repairs?',
    answer: 'Yes, every ZA Support logic board repair carries a warranty on the repaired component and any replaced parts. If the same fault returns within the warranty period, we fix it at no charge.',
  },
  {
    question: 'What if my MacBook Air cannot be fixed?',
    answer: 'An assessment fee of from R599 applies. If we cannot repair the fault, the machine is returned to you exactly as received. We will give you honest options: board replacement pricing, data recovery, or part-out value if applicable.',
  },
  {
    question: 'Is it worth repairing a MacBook Air versus buying a new one?',
    answer: 'In most cases, yes, especially for M1 and M2 models which are still current machines worth preserving. Apple replaces the entire logic board at a significant premium. Our component-level repairs cost a fraction of that. For Intel MacBook Airs, the calculus depends on the model year, we will always give you an honest recommendation rather than push you toward a repair that is not economically sensible.',
  },
  {
    question: 'Do you repair Apple Silicon MacBook Air logic boards (M1, M2, M3)?',
    answer: 'Yes. The M-series SoC (the chip containing CPU, GPU, RAM, and Neural Engine) cannot be replaced at die level, it is a single bonded package. However, all surrounding components are fully repairable: USB-C controller ICs, power management circuits, backlight drivers, display path components, and board traces. This covers the vast majority of MacBook Air M-series failures we see in practice.',
  },
  {
    question: 'Can you repair a liquid-damaged MacBook Air logic board?',
    answer: 'Yes, this is one of our most common repairs. The process involves ultrasonic cleaning to remove corrosion and oxidation, microscope inspection of all traces and component pads, and replacement of any damaged components. Success rates depend on the liquid type, how quickly the machine was powered off, and how far corrosion has spread. We give you an honest assessment after the diagnostic, if we cannot guarantee a reliable repair, we say so before you commit.',
  },
  {
    question: 'Do you offer collection or delivery across Johannesburg?',
    answer: 'Yes. Our workshop is at 1 Hyde Lane, Second Floor, Hyde Park. Clients from Sandton, Rosebank, Bryanston, Fourways, Randburg, and Midrand are welcome to bring their MacBook Air directly. We also accept courier-in repairs for clients further away, secure tracked collection and return can be arranged.',
  },
  {
    question: 'What areas in Johannesburg do you serve?',
    answer: 'Our workshop is in Hyde Park, Johannesburg. We serve clients across Johannesburg including Sandton, Rosebank, Illovo, Bryanston, Fourways, Midrand, Randburg, Melrose, Parkhurst, Morningside, Greenside, and Edenvale. Courier collection is available for clients further afield.',
  },
  {
    question: 'My MacBook Air M1 shows a black screen but works on an external display. What is wrong?',
    answer: 'This fault pattern is consistent with a backlight circuit failure, the display output path (which drives the external monitor) is working, but the backlight that illuminates the built-in screen has failed. On M1 MacBook Airs, this is typically caused by the backlight fuse or backlight driver IC on the logic board. It is a targeted, repairable fault and one of the more straightforward MacBook Air board repairs we perform.',
  },
  {
    question: 'Is MacBook Air logic board repair cheaper than MacBook Pro?',
    answer: 'Generally yes, slightly. MacBook Air boards are somewhat simpler in layout and lack the discrete GPU found in Intel MacBook Pro 15" and 16" models (which require GPU reballing). The assessment is the same regardless of model.',
  },
];

const reviews = [
  { name: 'Sarah M.', location: 'Sandton', rating: 5, text: 'Best Apple repair experience I\'ve had in Johannesburg. The team clearly knows their stuff, they diagnosed a logic board issue other shops had missed.', service: 'Logic Board Repair' },
  { name: 'Priya S.', location: 'Morningside', rating: 5, text: 'My MacBook Air M2 was completely dead after a coffee spill. ZA Support diagnosed it the same day, gave me a clear quote, and had it running again within 3 days. Incredible service.', service: 'Liquid Damage Repair' },
  { name: 'James T.', location: 'Rosebank', rating: 5, text: 'No charging on either USB-C port. Dropped it off on Tuesday, collected on Thursday, works perfectly. They explained exactly what was wrong and why. Highly recommend.', service: 'USB-C Repair' },
  { name: 'Kefilwe N.', location: 'Fourways', rating: 5, text: 'Was told by another shop my MacBook Air needed a new board. ZA Support repaired the actual fault for a fraction of that price. Two months later, still going strong.', service: 'Logic Board Repair' },
];

const serviceAreas = [
  'Johannesburg', 'Hyde Park', 'Sandton', 'Rosebank', 'Illovo',
  'Bryanston', 'Fourways', 'Midrand', 'Randburg', 'Melrose',
  'Morningside', 'Sandhurst', 'Parkhurst', 'Edenvale', 'Greenside', 'Linden',
];

const aggregateRatingSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': 'https://zasupport.com/#business',
  name: 'ZA Support',
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '632',
    bestRating: '5',
    worstRating: '1',
  },
};

const faqSchema = buildFaqSchema(faqs);
const serviceSchema = buildServiceSchema({
  name: 'MacBook Air Logic Board Repair Johannesburg',
  description: 'Expert MacBook Air logic board repair and component-level repair in Johannesburg. All Intel and Apple Silicon models. Assessment: from R599. up-to-3 year warranty.',
});
const breadcrumbSchema = buildBreadcrumbSchema([
  { name: 'Home', url: 'https://zasupport.com' },
  { name: 'Logic Board Repair', url: 'https://zasupport.com/logic-board-repair' },
  { name: 'MacBook Air', url: 'https://zasupport.com/logic-board-repair/macbook-air' },
]);

export default function MacBookAirLogicBoardPage() {
  return (
    <>
      <SchemaOrg schema={faqSchema} />
      <SchemaOrg schema={serviceSchema} />
      <SchemaOrg schema={breadcrumbSchema} />
      <SchemaOrg schema={aggregateRatingSchema} />

      {/* Hero */}
      <section className="hero-gradient grid-overlay pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[
            { label: 'Logic Board Repair', href: '/logic-board-repair' },
            { label: 'MacBook Air' },
          ]} />
          <div className="mt-8 max-w-4xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#E8F4F1] leading-tight mb-6">
              MacBook Air Logic Board Repair
              <br /><span className="text-[#0FEA7A]">Johannesburg, Assessment: from R599</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-4 max-w-3xl leading-relaxed">
              Component-level repair for MacBook Air logic board faults.
              All Intel and Apple Silicon models. Assessment: from R599 with no obligation.
            </p>
            <p className="text-base text-[#7A9E98] mb-8 max-w-3xl leading-relaxed">
              We repair the board, we do not just replace it. Component-level repair is a fraction of the cost of a full board replacement. Hyde Park, Johannesburg.
            </p>
            <div className="flex flex-wrap gap-3 mb-8">
              {[
                { icon: Shield, label: 'Assessment: from R599' },
                { icon: Clock, label: 'Fastest Turnaround Times' },
                { icon: Zap, label: 'Diagnostic: from R599' },
                { icon: CheckCircle, label: 'Warranty' },
                { icon: Cpu, label: 'Microscope Component-level repair' },
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
                { value: `${SITE.yearsExperience} Years`, label: 'In Business Since 2009' },
                { value: `${SITE.rating}★`, label: `${SITE.reviewCount} Google Reviews` },
                { value: 'Covered', label: 'Warranty, Written. No Exceptions.' },
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

      {/* What is a logic board fault? */}
      <section className="py-20 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-6">
            What Is a MacBook Air Logic Board Fault?
          </h2>
          <div className="space-y-5 text-[#7A9E98] leading-relaxed">
            <p>
              The logic board is the central circuit board inside your MacBook Air — the processor, unified memory,
              USB-C ports, display output, and battery management all run through it. When it develops a fault,
              symptoms range from a completely dead machine to a port that stopped charging or a screen that stays black.
            </p>
            <p>
              Most MacBook Air logic board failures are caused by a single failed component — one fuse, one controller
              chip, one corroded trace. A component-level repair targets only that component under a stereo microscope,
              leaving the rest of the board untouched and your data exactly where it is.
            </p>
            <p>
              Apple replaces the entire logic board — component-level repair is not available at Apple or most
              third-party shops in Johannesburg. It requires a microscope, specialist equipment, and the training
              to use it. We have all three.
            </p>
            <h3 className="text-xl font-bold text-[#E8F4F1] mt-8 mb-4">
              Common Symptoms of a MacBook Air Logic Board Problem
            </h3>
            <ul className="space-y-3">
              {[
                'MacBook Air will not turn on, completely silent, no fan, no display',
                'Screen stays black but machine appears to boot (caps lock light responds)',
                'Only charges on one USB-C port, or not at all',
                'Random shutdowns, especially under load or when running on battery',
                'Kernel panics, repeated crashes followed by a restart message',
                'USB-C ports not recognising accessories, drives, or monitors',
                'Fan runs continuously at maximum speed even at idle',
                'Machine works on external display but internal screen shows nothing',
                'Touch ID unresponsive after a drop or liquid exposure',
                'MacBook Air stopped working after a liquid spill',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="text-[#0FEA7A] font-bold mt-0.5">→</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4">
              If your MacBook Air is showing any of these symptoms, bring it in to Hyde Park
              or send us a WhatsApp message, we will tell you honestly what is wrong and whether repair makes sense.
            </p>
          </div>
        </div>
      </section>

      {/* Fault Table */}
      <section className="py-20 bg-[#111C1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4">
            Common MacBook Air Logic Board Faults
          </h2>
          <p className="text-[#7A9E98] mb-10 max-w-2xl">
            The most common MacBook Air logic board faults we repair and the underlying cause at component level. Your specific quote is confirmed after the assessment.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[rgba(15,234,122,0.15)]">
                  <th className="text-left text-[#E8F4F1] font-bold pb-4 pr-6">Fault</th>
                  <th className="text-left text-[#E8F4F1] font-bold pb-4 pr-6">Cause</th>
                  <th className="text-left text-[#E8F4F1] font-bold pb-4">Fixable?</th>
                </tr>
              </thead>
              <tbody>
                {faultTable.map((row, i) => (
                  <tr key={row.fault} className={`${i < faultTable.length - 1 ? 'border-b border-[rgba(255,255,255,0.05)]' : ''}`}>
                    <td className="py-4 pr-6 text-[#E8F4F1] font-semibold align-top">{row.fault}</td>
                    <td className="py-4 pr-6 text-[#7A9E98] align-top">{row.cause}</td>
                    <td className="py-4 align-top">
                      <span className={`inline-block px-2 py-0.5 rounded text-xs font-semibold ${row.fixable.startsWith('Yes') ? 'bg-[rgba(15,234,122,0.1)] text-[#0FEA7A]' : 'bg-[rgba(122,158,152,0.1)] text-[#7A9E98]'}`}>
                        {row.fixable}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-[#7A9E98] text-xs mt-4">
            Final pricing is confirmed in a written quote after the assessment. No work begins without your approval.
          </p>
        </div>
      </section>

      {/* Repair Process */}
      <section className="py-20 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4">
            Our Repair Process
          </h2>
          <p className="text-[#7A9E98] mb-12 max-w-2xl">
            Every MacBook Air logic board repair follows the same structured process.
            No surprises. No hidden charges. No work without your approval.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {repairProcess.map((step) => (
              <div key={step.step} className="glass-card p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-full bg-[rgba(15,234,122,0.1)] border border-[rgba(15,234,122,0.3)] flex items-center justify-center flex-shrink-0">
                    <span className="text-[#0FEA7A] font-bold text-sm">{step.step}</span>
                  </div>
                  <h3 className="text-[#E8F4F1] font-bold">{step.title}</h3>
                </div>
                <p className="text-[#7A9E98] text-sm leading-relaxed">{step.detail}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 p-5 bg-[rgba(15,234,122,0.05)] border border-[rgba(15,234,122,0.15)] rounded-2xl max-w-2xl">
            <p className="text-[#E8F4F1] font-semibold mb-1">Typical turnaround</p>
            <p className="text-[#7A9E98] text-sm">
              Most MacBook Air logic board repairs are completed within <strong className="text-[#E8F4F1]">3–5 business days</strong> from
              approval. Simple, isolated faults (USB-C, backlight fuse, power fuse) are often done in 48–72 hours.
              Complex liquid damage or multi-component failures are quoted with a specific completion date.
            </p>
          </div>
        </div>
      </section>

      {/* Model Compatibility */}
      <section className="py-20 bg-[#111C1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4">
            MacBook Air Model Compatibility
          </h2>
          <p className="text-[#7A9E98] mb-10 max-w-2xl">
            We repair all MacBook Air models from 2015 onwards, covering Intel and Apple Silicon generations.
            Repair scope differs between Intel and M-series, the table below explains what is repairable on each.
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
            <p className="text-[#E8F4F1] font-semibold mb-2">Note on Apple Silicon MacBook Air (M1/M2/M3)</p>
            <p className="text-[#7A9E98] text-sm">
              On M-series MacBook Airs, the processor, GPU, RAM, and Neural Engine are integrated into the M-series
              SoC, a single chip that cannot be replaced individually. However, almost all MacBook Air M-series
              failures in practice occur in the <em>surrounding</em> components: USB-C controller ICs, power
              management circuits, backlight drivers, charging path components, and board traces. These are all
              repairable through component-level repair. If the fault is in the SoC itself (genuinely rare),
              we will tell you that clearly and honestly during the assessment.
            </p>
          </div>
        </div>
      </section>

      {/* Repair Services */}
      <section className="py-20 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4">
            MacBook Air Logic Board Repair Services
          </h2>
          <p className="text-[#7A9E98] mb-8 max-w-2xl">
            Your exact cost is confirmed in a written quote after the assessment. We do not charge for assessments that conclude the board is beyond repair.
          </p>
          <div className="glass-card overflow-hidden p-0 mb-6">
            {[
              { item: 'Diagnostic Assessment', note: 'Full board inspection under microscope. No charge, no obligation.' },
              { item: 'USB-C / Charging Repair', note: 'USB-C controller IC or charging path component-level repair' },
              { item: 'Backlight / Display Circuit Repair', note: 'Backlight fuse, driver IC, or display connector fault' },
              { item: 'Power Circuit Repair', note: 'No-power diagnosis, fuse, MOSFET, or charging IC' },
              { item: 'Liquid Damage Repair', note: 'Ultrasonic clean, trace repair, component replacement' },
              { item: 'Component-level repair (Complex)', note: 'Multi-component or trace repair under microscope' },
              { item: 'Logic Board Replacement', note: 'Only recommended when component repair is not viable' },
            ].map((item, i, arr) => (
              <div key={item.item} className={`p-5 ${i < arr.length - 1 ? 'border-b border-[rgba(255,255,255,0.05)]' : ''}`}>
                <p className="text-[#E8F4F1] font-semibold">{item.item}</p>
                <p className="text-[#7A9E98] text-xs mt-0.5">{item.note}</p>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 bg-[rgba(15,234,122,0.05)] border border-[rgba(15,234,122,0.15)] rounded-2xl">
              <p className="text-[#E8F4F1] font-bold mb-2">Why Component-Level Repair</p>
              <p className="text-[#7A9E98] text-sm">Apple replaces the entire logic board. Our component-level repair targets the specific failed part, same outcome, at a fraction of the cost.</p>
            </div>
            <div className="p-5 bg-[rgba(15,234,122,0.05)] border border-[rgba(15,234,122,0.15)] rounded-2xl">
              <p className="text-[#E8F4F1] font-bold mb-2">Assessment: from R599, guaranteed</p>
              <p className="text-[#7A9E98] text-sm">If we cannot repair your MacBook Air logic board, assessment fee of from R599 applies.
                No diagnostic fee, no assessment charge. Zero risk to you.</p>
            </div>
          </div>
          <div className="rounded-xl border border-[#0FEA7A]/30 bg-[#0FEA7A]/5 p-5 mt-6">
            <p className="text-sm text-[#7A9E98]">
              💡 <strong className="text-[#E8F4F1]">Assessment: from R599, always.</strong> We assess your MacBook Air at no charge with no obligation. Written quote before any work begins.
            </p>
          </div>
        </div>
      </section>

      {/* Why ZA Support */}
      <section className="py-20 bg-[#111C1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4">
            Why Choose ZA Support for MacBook Air Logic Board Repair?
          </h2>
          <p className="text-[#7A9E98] mb-12 max-w-2xl">
            You have options in Johannesburg. Here is what is different about us, and why it matters
            when the machine in question holds your work, your photos, and your livelihood.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Star,
                title: `${SITE.rating} Stars, ${SITE.reviewCount} Reviews`,
                body: 'Verified Google reviews from clients across Johannesburg. Unfiltered, public, and consistent. We have been doing this since 2009.',
              },
              {
                icon: Clock,
                title: `${SITE.yearsExperience} Years of Apple Repair`,
                body: 'Over 3,000 repairs completed since 2009. We have seen every MacBook Air fault and repaired most of them.',
              },
              {
                icon: CheckCircle,
                title: 'Warranty',
                body: 'Every repair is fully warranted. We stand behind what we fix.',
              },
              {
                icon: Shield,
                title: 'Assessment: from R599',
                body: 'Assessment: from R599. If we cannot repair your MacBook Air logic board, the machine is returned exactly as received. No exceptions, no pressure.',
              },
            ].map(({ icon: Icon, title, body }) => (
              <div key={title} className="glass-card p-6">
                <div className="w-10 h-10 rounded-xl bg-[rgba(15,234,122,0.1)] flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-[#0FEA7A]" />
                </div>
                <h3 className="text-[#E8F4F1] font-bold mb-3">{title}</h3>
                <p className="text-[#7A9E98] text-sm leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 glass-card p-6 max-w-3xl">
            <h3 className="text-[#E8F4F1] font-bold mb-3">
              We repair at component level, not just swap boards
            </h3>
            <p className="text-[#7A9E98] text-sm leading-relaxed">
              The majority of repair shops in Johannesburg offer one option for a logic board fault: replace the entire
              board. This is expensive and almost always unnecessary. ZA Support performs component-level
              component-level repair, we identify the specific failed chip, fuse, or trace, and replace only that. Your data
              stays on the device throughout. Your Touch ID pairing is preserved. And the repair costs 60–80% less than
              a full board swap. This is the repair approach that requires a microscope, proper training, and
              specialist equipment. We have all of them, and we apply them to every MacBook Air model from
              2015 through to the M3 generation.
            </p>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-20 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-10">
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
          <FAQAccordion items={faqs} title="MacBook Air Logic Board Repair, FAQs" />
        </div>
      </section>

      {/* Service Areas */}
      <section className="py-16 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-4 mb-6">
            <MapPin className="w-5 h-5 text-[#0FEA7A] flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-xl font-bold text-[#E8F4F1] mb-2">
                MacBook Air Logic Board Repair Across Johannesburg
              </h2>
              <p className="text-[#7A9E98] text-sm max-w-2xl">
                Our workshop is in Hyde Park. We serve clients across Johannesburg, bring your MacBook Air
                directly or arrange secure courier collection anywhere in the city.
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
          <h2 className="text-lg font-bold text-[#E8F4F1] mb-5">Related Services</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { title: 'MacBook Pro Logic Board', href: '/logic-board-repair/macbook-pro', label: 'Assessment: from R599' },
              { title: 'Logic Board Repair Hub', href: '/logic-board-repair', label: 'All Devices' },
              { title: 'Liquid Damage Repair', href: '/liquid-damage/macbook-air', label: 'Assessment: from R599' },
            ].map((item) => (
              <Link key={item.href} href={item.href} className="glass-card p-4 flex items-center justify-between group">
                <div>
                  <p className="text-[#E8F4F1] font-semibold text-sm">{item.title}</p>
                  <p className="text-[#0FEA7A] text-xs mt-0.5">{item.label}</p>
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
            <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3">
              MacBook Air Logic Board Fault?
            </h2>
            <p className="text-[#7A9E98] mb-2">Assessment: from R599. up-to-3 year warranty. Hyde Park, Johannesburg.</p>
            <p className="text-[#7A9E98] text-sm mb-8">Monday – Friday 08:00–17:30 · Closed Saturdays</p>
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
