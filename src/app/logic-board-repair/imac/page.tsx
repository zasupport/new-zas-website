import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, ArrowRight, Shield, Clock, CheckCircle, Star } from 'lucide-react';
import SchemaOrg from '@/components/seo/SchemaOrg';
import { buildFaqSchema } from '@/lib/schema';
import FAQAccordion from '@/components/ui/FAQ';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { CONTACT, buildWhatsAppUrl} from '@/lib/constants';

export const metadata: Metadata = {
  title: 'iMac Logic Board Repair Johannesburg | ZA Support',
  description:
    'iMac logic board repair Johannesburg. 21.5", 24" and 27" models, M1, M3, M4, and Intel. We fix the chip, not the board. Assessment: from R599, up-to-3 year warranty. Hyde Park. Call 064 529 5863.',
  alternates: { canonical: 'https://zasupport.com/logic-board-repair/imac' },
};

const faqs = [
  {
    question: 'Is it worth repairing an iMac logic board vs replacing the whole machine?',
    answer:
      'Almost always yes. A new 24" iMac M3 costs significantly more than a component-level repair. Even for older Intel iMacs, repair is typically a fraction of the cost of a comparable used machine. We give you an honest written cost-benefit comparison before you commit to anything.',
  },
  {
    question: 'My iMac 27" has no display but the fans spin. What is the fault?',
    answer:
      'This is one of the most common iMac presentations we see. It indicates one of three things: display controller fault on the logic board, backlight circuit failure (T-Con board or LED driver), or a disconnected/failed LVDS or eDP display cable. On Intel 27" iMacs, AMD Radeon GPU failure also causes this. We test systematically, not guesswork, to identify the exact cause before quoting.',
  },
  {
    question: 'Can you repair the iMac 24" M3 logic board?',
    answer:
      'Yes. The M3 chip integrates CPU, GPU, RAM, and Neural Engine on a single die, these cannot be replaced at component level. But the logic board surrounding the M3 is fully serviceable: power management ICs, display controller, USB-C/Thunderbolt 4 controllers, PCIe storage circuits, and board traces are all repairable through component-level repair. Most M3 iMac faults fall in this serviceable category.',
  },
  {
    question: 'Does iMac logic board repair require removing the display?',
    answer:
      'Yes. iMac repair requires carefully removing the magnetically attached display glass and LCD panel to access the logic board. This is a delicate process. Our engineers use the correct tools, including vacuum cups and plastic pry tools, to separate the glass without cracking the panel. We perform this procedure regularly and have the equipment to do it safely.',
  },
  {
    question: 'What iMac faults do you repair most often?',
    answer:
      'The top five iMac logic board faults we see at our Hyde Park workshop: (1) No power, PSU or power rail fault after a power surge, (2) No display or backlight failure, fan spins but screen is dead, (3) AMD Radeon GPU failure on 27" Intel models causing artifacts or crashes, (4) Liquid damage through the ventilation slots at the top, (5) Thunderbolt/USB-C controller failure causing no peripherals or no external display.',
  },
  {
    question: 'How long does iMac logic board repair take?',
    answer:
      'Diagnostic is same-day for most faults. Simple component replacements (USB-C controller, power management IC) are typically 1–3 business days. More complex repairs such as GPU restoration or trace reconstruction after liquid damage are 3–5 business days. We will give you a written turnaround estimate before work begins.',
  },
  {
    question: 'My iMac fans run at maximum speed constantly. Is this a logic board fault?',
    answer:
      'Not always. Persistent max-fan speed on iMac is most commonly caused by: a failed ambient temperature sensor (repairable), SMC corruption (reset first, free), or a disconnected temperature sensor cable during a previous repair. Rarely, it indicates a power rail voltage anomaly on the logic board. We diagnose first and only charge if a repair is needed.',
  },
  {
    question: 'Do you offer iMac collection and delivery in Johannesburg?',
    answer:
      'Yes. We collect from Hyde Park, Sandton, Rosebank, Randburg, Fourways, and surrounds. For areas outside our standard route, we use an insured courier service. Call 064 529 5863 or WhatsApp to arrange.',
  },
  {
    question: 'What warranty do you give on iMac logic board repair?',
    answer:
      'All iMac logic board repairs carry a warranty on the specific component repaired. This is a written up-to-3 year warranty, no hidden clauses. If the repaired component fails within the warranty period, we fix it at no charge.',
  },
  {
    question: 'Can you repair the iMac 27" Late 2015 with AMD Radeon R9 GPU failure?',
    answer:
      'Yes. This is one of the most common iMac repairs we perform. The AMD Radeon R9 M290X and M395 GPUs on the 2015 27" iMac are known to fail due to solder joint fatigue on the GPU die. We perform specialist GPU restoration, replacing the solder connections under controlled conditions using professional equipment. Success rate on this specific repair is over 80%.',
  },
];

const icFaults = [
  {
    ic: 'AMD Radeon GPU (27" Intel)',
    fault: 'GPU die solder failure',
    symptom: 'Artifacts, distorted display, crash on load',
    repair: 'GPU restoration',
  },
  {
    ic: 'CD3217 (USB-C Power IC)',
    fault: 'USB-C controller failure',
    symptom: 'No peripherals, no charging, no display out',
    repair: 'IC replacement',
  },
  {
    ic: 'TPS51980 (PWM Controller)',
    fault: 'Power rail dropout',
    symptom: 'No power, dead on arrival',
    repair: 'IC replacement + trace repair',
  },
  {
    ic: 'LP8550 (LED Backlight Driver)',
    fault: 'Backlight driver failure',
    symptom: 'Black screen, dim display, visible image with torch',
    repair: 'Driver IC replacement',
  },
  {
    ic: 'Thunderbolt Controller',
    fault: 'TBT controller IC fault',
    symptom: 'No Thunderbolt/USB-C output, no dGPU',
    repair: 'Controller replacement',
  },
  {
    ic: 'SMC / Power Management',
    fault: 'SMC logic failure',
    symptom: 'No boot, sensor errors, fan at max',
    repair: 'SMC IC replacement',
  },
];

const models = [
  { model: 'iMac 21.5" 2015–2019 (Intel)', chip: 'Intel Core i5/i7', notes: 'Display controller, USB-C, backlight' },
  { model: 'iMac 27" 2015–2020 (Intel)', chip: 'Intel Core i5/i7/i9', notes: 'GPU restoration most common, 27"' },
  { model: 'iMac 24" M1 (2021)', chip: 'Apple M1', notes: 'Power management, USB-C circuits' },
  { model: 'iMac 24" M3 (2023)', chip: 'Apple M3', notes: 'Power ICs, display controller, ports' },
  { model: 'iMac 24" M4 (2024)', chip: 'Apple M4', notes: 'Diagnostic assessment required' },
];

const reviews = [
  {
    name: 'Grant M.',
    suburb: 'Sandton',
    text: 'My iMac 27" had vertical lines and then went completely black. ZA Support identified AMD GPU failure, reballed it, and it came back perfect. Saved me thousands on a new machine.',
    rating: 5,
  },
  {
    name: 'Priya N.',
    suburb: 'Rosebank',
    text: 'The iMac just died after a power outage. ZA Support diagnosed a blown power rail on the logic board within the same day. Fixed in two days. warranty is real, they put it in writing.',
    rating: 5,
  },
  {
    name: 'Andrew D.',
    suburb: 'Fourways',
    text: 'iMac 24" M1 had no display. I was quoted a high price for a full board replacement elsewhere. ZA Support fixed the display controller IC for a fraction of that. Same day collection.',
    rating: 5,
  },
];

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://zasupport.com' },
    { '@type': 'ListItem', position: 2, name: 'Logic Board Repair', item: 'https://zasupport.com/logic-board-repair' },
    { '@type': 'ListItem', position: 3, name: 'iMac', item: 'https://zasupport.com/logic-board-repair/imac' },
  ],
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'iMac Logic Board Repair Johannesburg',
  provider: {
    '@type': 'LocalBusiness',
    name: 'ZA Support',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '1 Hyde Lane, Second Floor, Office E2004',
      addressLocality: 'Hyde Park',
      addressRegion: 'Gauteng',
      postalCode: '2196',
      addressCountry: 'ZA',
    },
    telephone: '+27645295863',
  },
  areaServed: { '@type': 'City', name: 'Johannesburg' },
  description: 'iMac logic board repair. Assessment: from R599. up-to-3 year warranty.',
  offers: {
    '@type': 'Offer',
    description: 'iMac logic board repair. Assessment: from R599.',
  },
};

const faqSchema = buildFaqSchema(faqs);

export default function iMacLogicBoardPage() {
  return (
    <>
      <SchemaOrg schema={faqSchema} />
      <SchemaOrg schema={breadcrumbSchema} />
      <SchemaOrg schema={serviceSchema} />

      {/* Hero */}
      <section className="hero-gradient grid-overlay pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: 'Logic Board Repair', href: '/logic-board-repair' }, { label: 'iMac' }]} />
          <div className="mt-8 max-w-4xl">
            <div className="inline-flex items-center gap-2 bg-[rgba(15,234,122,0.08)] border border-[rgba(15,234,122,0.2)] rounded-full px-4 py-2 mb-6">
              <span className="text-[#0FEA7A] text-sm font-semibold">Assessment: from R599 · Up-to-3 Year Warranty · Hyde Park</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-[#E8F4F1] leading-tight mb-4">
              iMac Logic Board<br /><span className="text-[#0FEA7A]">Repair Johannesburg 2026</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-6 max-w-3xl leading-relaxed">
              iMac logic board repair. 21.5&quot;, 24&quot; and 27&quot; models, M1, M3, M4, and Intel.
              We repair the chip. Authorised service replaces the board. Assessment: from R599.
            </p>

            {/* Stats bar */}
            <div className="flex flex-wrap gap-6 mb-8">
              {[
                { value: '50,000+', label: 'Repairs Done' },
                { value: '4.9★', label: '120+ Reviews' },
                { value: '16 Years', label: 'Apple Experience' },
                { value: 'Covered', label: 'Warranty' },
              ].map((s) => (
                <div key={s.label}>
                  <span className="block text-2xl font-extrabold text-[#0FEA7A]">{s.value}</span>
                  <span className="text-xs text-[#7A9E98]">{s.label}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={buildWhatsAppUrl('LBR-IMAC', 'logic-board')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 transition-all"
              >
                💬 WhatsApp for Quote
              </a>
              <a
                href={`tel:${CONTACT.phoneTel}`}
                className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all"
               target="_blank" rel="noopener noreferrer">
                <Phone className="w-5 h-5" /> Call {CONTACT.phone}
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.2)] text-[#7A9E98] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[rgba(15,234,122,0.05)] transition-all"
              >
                Diagnostic: from R599 <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison callout */}
      <section className="py-10 bg-[rgba(39,80,77,0.2)] border-y border-[rgba(15,234,122,0.1)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            <div>
              <p className="text-[#7A9E98] text-sm mb-1">Authorised service</p>
              <p className="text-2xl font-extrabold text-red-400">Full board replacement</p>
              <p className="text-[#7A9E98] text-xs mt-1">Entire board swapped, data loss on M-series</p>
            </div>
            <div className="flex items-center justify-center">
              <div className="text-[#0FEA7A] text-4xl font-black">vs</div>
            </div>
            <div>
              <p className="text-[#7A9E98] text-sm mb-1">ZA Support, iMac Logic Board Repair</p>
              <p className="text-2xl font-extrabold text-[#0FEA7A]">Component-level repair</p>
              <p className="text-[#7A9E98] text-xs mt-1">We repair only the failed component. Board stays. up-to-3 year warranty.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Faults + Pricing */}
      <section className="py-20 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-6">Common iMac Logic Board Faults</h2>
              {[
                { fault: 'No Power, Dead iMac', desc: 'Power supply unit (PSU) or power circuit failure on logic board. Common after power surges or load-shedding damage. Fully repairable in most cases.' },
                { fault: 'No Display / Black Screen', desc: 'Backlight failure, display controller fault, or GPU issue. Fan spins, iMac boots (visible with torch), but screen is completely black.' },
                { fault: 'AMD Radeon GPU Failure (27" Intel)', desc: 'Screen artifacts, distorted image, or complete display failure under GPU load. Specialist GPU restoration recovers the chip, no board replacement needed.' },
                { fault: 'Liquid Damage', desc: 'Water, coffee, or cleaning fluid entering through the ventilation slots. Board-level professional clean, corrosion removal, and component replacement.' },
                { fault: 'Thunderbolt / USB-C Failure', desc: 'No external displays, no peripherals, no charging signal. Thunderbolt controller IC fault, repairable through component replacement.' },
                { fault: 'Fan at Maximum Speed', desc: 'Persistent max-fan speed caused by a failed ambient temperature sensor, disconnected sensor cable, or SMC fault.' },
                { fault: 'Not Booting, Stuck on Logo', desc: 'Boot-loop or failure to complete startup. Can indicate storage controller fault, NAND failure, or corrupted SMC, each diagnosable and repairable.' },
                { fault: 'Screen Artifacts / Lines', desc: 'Horizontal or vertical lines, colour banding, or pixelation. Display interface fault or GPU issue, most cases are repairable without board replacement.' },
              ].map((item) => (
                <div key={item.fault} className="flex gap-4 p-4 bg-[rgba(22,34,32,0.5)] rounded-xl border border-[rgba(15,234,122,0.08)] mb-3">
                  <div>
                    <p className="text-[#E8F4F1] font-semibold text-sm">{item.fault}</p>
                    <p className="text-[#7A9E98] text-xs mt-1">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div>
              <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-6">Repair Services</h2>
              <div className="glass-card p-6 mb-6">
                {[
                  'Diagnostic Assessment',
                  'Power Supply Repair',
                  'Logic Board Repair (Intel)',
                  'Logic Board Repair (M-series)',
                  'GPU Restoration (27" Intel)',
                  'Liquid Damage Restoration',
                  'USB-C / Thunderbolt Repair',
                  'Board Replacement',
                ].map((item, i, arr) => (
                  <div key={item} className={`py-3 ${i < arr.length - 1 ? 'border-b border-[rgba(255,255,255,0.05)]' : ''}`}>
                    <span className="text-[#7A9E98] text-sm">{item}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3 p-3 bg-[rgba(15,234,122,0.05)] rounded-lg border border-[rgba(15,234,122,0.1)]">
                  <Shield className="w-5 h-5 text-[#0FEA7A] flex-shrink-0" />
                  <p className="text-[#7A9E98] text-sm"><span className="text-[#E8F4F1] font-semibold">Warranty</span>, Written. No exceptions. No 90-day fine print.</p>
                </div>
                <div className="flex items-center gap-3 p-3 bg-[rgba(15,234,122,0.05)] rounded-lg border border-[rgba(15,234,122,0.1)]">
                  <CheckCircle className="w-5 h-5 text-[#0FEA7A] flex-shrink-0" />
                  <p className="text-[#7A9E98] text-sm"><span className="text-[#E8F4F1] font-semibold">Assessment: from R599</span>, If we cannot repair it, assessment fee of from R599 applies.</p>
                </div>
                <div className="flex items-center gap-3 p-3 bg-[rgba(15,234,122,0.05)] rounded-lg border border-[rgba(15,234,122,0.1)]">
                  <Clock className="w-5 h-5 text-[#0FEA7A] flex-shrink-0" />
                  <p className="text-[#7A9E98] text-sm"><span className="text-[#E8F4F1] font-semibold">Turnaround</span>, Same-day diagnostic. Repairs typically 1–5 business days.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* IC-level fault table */}
      <section className="py-20 bg-[#111C1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3">
            Component-Level Repair, iMac Logic Board ICs
          </h2>
          <p className="text-[#7A9E98] mb-8 max-w-3xl">
            Authorised service replaces the entire logic board. We replace the specific failed IC under microscope. Same result. A fraction of the cost.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[rgba(15,234,122,0.15)]">
                  <th className="text-left text-[#0FEA7A] py-3 pr-6">Component</th>
                  <th className="text-left text-[#0FEA7A] py-3 pr-6">Failure Mode</th>
                  <th className="text-left text-[#0FEA7A] py-3 pr-6">Symptom</th>
                  <th className="text-left text-[#0FEA7A] py-3">Repair</th>
                </tr>
              </thead>
              <tbody>
                {icFaults.map((row, i) => (
                  <tr key={row.ic} className={`${i < icFaults.length - 1 ? 'border-b border-[rgba(255,255,255,0.04)]' : ''}`}>
                    <td className="text-[#E8F4F1] py-3 pr-6 font-medium">{row.ic}</td>
                    <td className="text-[#7A9E98] py-3 pr-6">{row.fault}</td>
                    <td className="text-[#7A9E98] py-3 pr-6">{row.symptom}</td>
                    <td className="text-[#7A9E98] py-3">{row.repair}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Model compatibility */}
      <section className="py-20 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3">
            iMac Models We Repair
          </h2>
          <p className="text-[#7A9E98] mb-8">All iMac generations from 2015 through M4 (2024).</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[rgba(15,234,122,0.15)]">
                  <th className="text-left text-[#0FEA7A] py-3 pr-6">Model</th>
                  <th className="text-left text-[#0FEA7A] py-3 pr-6">Chip</th>
                  <th className="text-left text-[#0FEA7A] py-3">Common Repairs</th>
                </tr>
              </thead>
              <tbody>
                {models.map((row, i) => (
                  <tr key={row.model} className={`${i < models.length - 1 ? 'border-b border-[rgba(255,255,255,0.04)]' : ''}`}>
                    <td className="text-[#E8F4F1] py-3 pr-6 font-medium">{row.model}</td>
                    <td className="text-[#7A9E98] py-3 pr-6">{row.chip}</td>
                    <td className="text-[#7A9E98] py-3">{row.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Repair process */}
      <section className="py-20 bg-[#111C1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3">
            Our iMac Repair Process
          </h2>
          <p className="text-[#7A9E98] mb-10 max-w-2xl">
            Every iMac repair follows the same process. No guesswork. No unnecessary parts. Transparent from start to finish.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: '01', title: 'Drop-Off or Collection', desc: 'Bring your iMac to our Hyde Park workshop or arrange collection. We cover Sandton, Rosebank, Randburg, Fourways, and surrounds.' },
              { step: '02', title: 'Diagnostic: from R599', desc: 'Same-day board-level diagnostic. We identify the exact component or circuit at fault, not a guess. You receive a written quote before any work begins.' },
              { step: '03', title: 'Component-Level Repair', desc: 'Under a stereo microscope with temperature-controlled soldering equipment, we replace only the failed IC, not the whole board.' },
              { step: '04', title: 'Full Test + Warranty', desc: 'Post-repair stress test: power cycling, display output, port function, thermal sensors. Up-to-3 year warranty issued on collection.' },
            ].map((s) => (
              <div key={s.step} className="glass-card p-6">
                <span className="text-4xl font-black text-[rgba(15,234,122,0.2)]">{s.step}</span>
                <h3 className="text-[#E8F4F1] font-bold mt-3 mb-2">{s.title}</h3>
                <p className="text-[#7A9E98] text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why ZA Support */}
      <section className="py-20 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-10">
            Why Johannesburg Chooses ZA Support for iMac Repair
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Board-Level Repair, Not Replacement',
                desc: 'Authorised service replaces the entire logic board. We replace the specific failed IC. Same result, fraction of the cost.',
              },
              {
                title: 'Up-to-3 Year Warranty',
                desc: 'We put it in writing. No 90-day fine print like competitors. No exceptions. If the repaired component fails within the warranty period, we fix it at no charge.',
              },
              {
                title: 'Assessment: from R599',
                desc: 'If we cannot repair your iMac, assessment fee of from R599 applies, including the diagnostic. No shop in Johannesburg offers this combination with our repair depth.',
              },
              {
                title: 'Apple Silicon Specialists',
                desc: 'M1, M3, and M4 iMacs are increasingly common. Our engineers understand the Unified Memory Architecture, we do not guess with Apple Silicon repairs.',
              },
              {
                title: '4.9★, 120+ Google Reviews',
                desc: 'The strongest review authority for Apple repair in Johannesburg. Real clients, real names, real suburbs. Read our reviews on Google Maps.',
              },
              {
                title: 'Hyde Park Workshop',
                desc: '1 Hyde Lane, Second Floor, Office E2004, a premium, secure location. Collection and delivery available across Sandton, Rosebank, Randburg, Fourways, and Midrand.',
              },
            ].map((item) => (
              <div key={item.title} className="glass-card p-6">
                <h3 className="text-[#E8F4F1] font-bold mb-2">{item.title}</h3>
                <p className="text-[#7A9E98] text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Customer reviews */}
      <section className="py-20 bg-[#111C1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-8">
            iMac Repair Reviews, Johannesburg
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((r) => (
              <div key={r.name} className="glass-card p-6">
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: r.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#0FEA7A] text-[#0FEA7A]" />
                  ))}
                </div>
                <p className="text-[#7A9E98] text-sm leading-relaxed mb-4">&ldquo;{r.text}&rdquo;</p>
                <p className="text-[#E8F4F1] font-semibold text-sm">{r.name}</p>
                <p className="text-[#7A9E98] text-xs">{r.suburb}, Johannesburg</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQAccordion items={faqs} title="iMac Logic Board Repair, Frequently Asked Questions" />
        </div>
      </section>

      {/* Related pages */}
      <section className="py-16 bg-[#111C1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-extrabold text-[#E8F4F1] mb-6">Related Repairs</h2>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            {[
              { title: 'MacBook Pro Logic Board', href: '/logic-board-repair/macbook-pro', label: 'Assessment: from R599' },
              { title: 'MacBook Air Logic Board', href: '/logic-board-repair/macbook-air', label: 'Assessment: from R599' },
              { title: 'Mac mini Logic Board', href: '/logic-board-repair/mac-mini', label: 'Assessment: from R599' },
              { title: 'Logic Board Repair Hub', href: '/logic-board-repair', label: 'All Devices' },
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
              iMac Logic Board Fault?
            </h2>
            <p className="text-[#7A9E98] mb-2">Assessment: from R599. up-to-3 year warranty. Hyde Park, Johannesburg.</p>
            <p className="text-[#7A9E98] text-sm mb-8">Get a second opinion before committing to a board replacement, it costs you nothing.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={buildWhatsAppUrl('LBR-IMAC', 'logic-board')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 transition-all"
              >
                💬 WhatsApp for Quote
              </a>
              <a
                href={`tel:${CONTACT.phoneTel}`}
                className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all"
               target="_blank" rel="noopener noreferrer">
                <Phone className="w-5 h-5" /> Call {CONTACT.phone}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
