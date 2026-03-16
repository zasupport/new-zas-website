import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, ArrowRight, Cpu, Zap, AlertTriangle, CheckCircle, MapPin } from 'lucide-react';
import SchemaOrg from '@/components/seo/SchemaOrg';
import { buildFaqSchema, LOCAL_BUSINESS_PROVIDER } from '@/lib/schema';
import FAQAccordion from '@/components/ui/FAQ';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { CONTACT } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'MacBook Logic Board Repair Rosebank | ZA Support Hyde Park',
  description:
    'MacBook logic board repair for Rosebank clients. Microsoldering specialists 5 minutes from Rosebank. Free diagnostic, No Fix No Fee, 12-month warranty. Call 064 529 5863.',
  alternates: { canonical: 'https://zasupport.com/logic-board-repair/rosebank' },
};

const faults = [
  { title: 'No Power', desc: 'MacBook unresponsive with no fan spin, no display, no charging indication. Power delivery circuit diagnosed at component level.' },
  { title: 'Black Screen', desc: 'System appears to boot — keyboard illuminates, fan runs — but no image on screen. Backlight driver, GPU, or display signal path traced and repaired.' },
  { title: 'Liquid Ingress', desc: 'Spilt coffee or water causes immediate or delayed failure. Boards cleaned ultrasonically and corroded pads and traces restored under microscope.' },
  { title: 'Random Shutdowns', desc: 'MacBook shuts down without warning under load. Voltage regulator, power management IC, or thermal sensor fault identified and replaced.' },
  { title: 'USB-C Port Not Working', desc: 'Charging fails or external monitors stop working on USB-C / Thunderbolt ports. Controller chip or CD3217 retimer replaced at board level.' },
  { title: 'Constant Fan Noise', desc: 'SMC or thermal management fault causes fans to spin at maximum from startup. Board-level SMC diagnosis and component repair.' },
  { title: 'Screen Artefacts', desc: 'Horizontal lines, colour distortion, or partial screen failure linked to discrete GPU failure. Reballing or chip replacement on affected models.' },
  { title: 'Kernel Panics', desc: 'Recurring crashes traced to power management failure, failing RAM solder joints, or storage controller faults on the logic board.' },
];

const pricing = [
  { item: 'Diagnostic Assessment', note: 'Board-level inspection — no obligation to repair' },
  { item: 'USB-C / Thunderbolt Repair', note: 'Controller chip or port board replacement' },
  { item: 'Power Circuit Repair', note: 'No-power and charging failure repair' },
  { item: 'Microsoldering Repair', note: 'Precision component-level board repair' },
  { item: 'GPU Repair / Reballing', note: 'Discrete GPU — Intel-era Mac models only' },
  { item: 'Logic Board Replacement', note: 'Full board swap when repair is not possible' },
];

const faqs = [
  {
    question: 'Do you come to Rosebank to collect my MacBook?',
    answer: 'Yes. We offer a dedicated collection and return service for Rosebank clients. Our Hyde Park workshop is approximately 2–3 km from Rosebank — a 5-minute drive. We collect from your home, office, or a convenient spot in Rosebank, complete the repair, and return your MacBook. WhatsApp or call us to arrange a time.',
  },
  {
    question: 'How close are you to Rosebank?',
    answer: 'Very close. Our workshop at 1 Hyde Lane, Hyde Park sits approximately 2–3 km from Rosebank — five minutes by car. Rosebank clients often drop their MacBook in on the way to the Zone or the Rosebank Mall and collect later the same day for simple repairs, or within 48–72 hours for board-level work.',
  },
  {
    question: 'What MacBook models do you repair?',
    answer: 'We repair all MacBook models — MacBook Air (M1, M2, M3 and all Intel generations), MacBook Pro (13-inch, 14-inch, 15-inch, 16-inch — M-series and Intel), iMac, and Mac mini. Logic board repairs differ slightly between Intel and Apple Silicon models. On Apple Silicon (M1/M2/M3), surrounding components remain fully serviceable even though the SoC itself cannot be replaced.',
  },
  {
    question: 'My MacBook is liquid damaged. Can it be saved?',
    answer: 'Usually yes, if it reaches us promptly. The priority with liquid-damaged Macs is to stop using the machine immediately, not attempt to charge it or turn it on, and get it to us as quickly as possible. We ultrasonically clean the board, assess the extent of the corrosion, and repair affected traces and components. Boards brought in within 24–48 hours of exposure have the highest recovery rates.',
  },
  {
    question: 'What does the free diagnostic involve?',
    answer: 'We inspect the logic board using schematics, a microscope, and power-supply diagnostic tools. We identify the specific failed component, test the surrounding circuitry, and assess whether the fault is repairable at component level or requires a board replacement. The assessment is free regardless of outcome — no fix, no fee.',
  },
  {
    question: 'What warranty do you provide?',
    answer: 'Every logic board repair carries a 12-month ZA Support warranty covering the specific fault repaired and any directly related board failure. If the same fault recurs within 12 months, we repair it at no charge. Warranty is provided in writing with every completed repair.',
  },
];

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'MacBook Logic Board Repair Rosebank',
  description: 'MacBook logic board microsoldering for Rosebank clients. 5 minutes from our Hyde Park workshop. Free diagnostic. No Fix No Fee. 12-month warranty.',
  provider: LOCAL_BUSINESS_PROVIDER,
  areaServed: [
    { '@type': 'City', name: 'Johannesburg' },
    { '@type': 'Neighborhood', name: 'Rosebank' },
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://zasupport.com' },
    { '@type': 'ListItem', position: 2, name: 'Logic Board Repair', item: 'https://zasupport.com/logic-board-repair' },
    { '@type': 'ListItem', position: 3, name: 'Rosebank', item: 'https://zasupport.com/logic-board-repair/rosebank' },
  ],
};

const faqSchema = buildFaqSchema(faqs);

export default function LogicBoardRepairRosebankPage() {
  return (
    <>
      <SchemaOrg schema={faqSchema} />
      <SchemaOrg schema={serviceSchema} />
      <SchemaOrg schema={breadcrumbSchema} />

      <section className="hero-gradient grid-overlay pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[
            { label: 'Logic Board Repair', href: '/logic-board-repair' },
            { label: 'Rosebank' },
          ]} />
          <div className="mt-8 max-w-4xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#E8F4F1] leading-tight mb-6" style={{ fontFamily: 'Syne, sans-serif' }}>
              Logic Board Repair Rosebank, Johannesburg
              <br /><span className="text-[#0FEA7A]">— MacBook Specialists</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-4 max-w-3xl leading-relaxed">
              Rosebank is 5 minutes from our Hyde Park workshop. We collect from Rosebank and repair MacBook logic boards at component level — microsoldering, not board swaps.
            </p>
            <div className="flex items-center gap-2 text-[#7A9E98] text-sm mb-8">
              <MapPin className="w-4 h-4 text-[#0FEA7A]" />
              <span>We collect from Rosebank and repair at our Hyde Park workshop — approx. 5 min drive (2–3 km)</span>
            </div>
            <div className="flex flex-wrap gap-4 mb-8">
              {[
                { icon: Cpu, label: 'Microscope Microsoldering' },
                { icon: Zap, label: 'Free Diagnostic' },
                { icon: CheckCircle, label: 'No Fix No Fee' },
                { icon: AlertTriangle, label: '12-Month Warranty' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 bg-[rgba(15,234,122,0.08)] border border-[rgba(15,234,122,0.15)] px-4 py-2 rounded-full">
                  <Icon className="w-4 h-4 text-[#0FEA7A]" />
                  <span className="text-[#E8F4F1] text-sm font-medium">{label}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href={CONTACT.whatsappLogicBoard} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 hover:shadow-[0_0_32px_rgba(15,234,122,0.4)] transition-all">
                💬 WhatsApp for Quote
              </a>
              <a href={`tel:${CONTACT.phoneTel}`} className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all">
                <Phone className="w-5 h-5" /> Call {CONTACT.phone}
              </a>
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.2)] text-[#7A9E98] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[rgba(15,234,122,0.05)] transition-all">
                Book Collection <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="py-16 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-6" style={{ fontFamily: 'Syne, sans-serif' }}>
            MacBook Logic Board Repairs for Rosebank
          </h2>
          <div className="space-y-4 text-[#7A9E98] leading-relaxed">
            <p>
              Rosebank has a high concentration of creative professionals, media businesses, and corporate offices where Macs are central to the working day. A failed logic board in that environment is not just inconvenient — it can halt client deliverables and affect revenue. ZA Support offers Rosebank clients a collection service combined with rapid board-level repair at our Hyde Park workshop, just 2–3 km up Jan Smuts Avenue.
            </p>
            <p>
              Logic board faults are diagnosed at component level — we use schematics, oscilloscopes, and microscopy to identify exactly what has failed. Rather than quoting a full board replacement immediately, we determine whether the fault is repairable at the chip or component level first. In most cases it is, and the cost saving is substantial: microsoldering typically costs 60–80% less than a new board.
            </p>
            <p>
              We work on all MacBook generations sold through the Rosebank Mall Apple Premium Reseller and the Sandton Apple Store — including M1 MacBook Air, M2 MacBook Pro, M3 MacBook Air, and all Intel-era MacBook Pro 13-inch, 15-inch, and 16-inch models. iMac and Mac mini logic boards are handled with the same component-level approach.
            </p>
            <p>
              The most common faults we see from Rosebank clients are liquid damage from the daily coffee shop session, USB-C charging failures on well-used 13-inch MacBook Pros, and no-power faults on older Intel models. All are repairable. All start with a free diagnostic that confirms the fault before any quote is given.
            </p>
          </div>
        </div>
      </section>

      {/* Fault Types */}
      <section className="py-20 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-10 text-center" style={{ fontFamily: 'Syne, sans-serif' }}>
            Common Faults We Repair
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {faults.map((fault) => (
              <div key={fault.title} className="glass-card p-5">
                <h3 className="text-[#E8F4F1] font-bold mb-2" style={{ fontFamily: 'Syne, sans-serif' }}>{fault.title}</h3>
                <p className="text-[#7A9E98] text-sm leading-relaxed">{fault.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-8" style={{ fontFamily: 'Syne, sans-serif' }}>
            How It Works — From Rosebank to Hyde Park and Back
          </h2>
          <div className="space-y-6">
            {[
              { step: '01', title: 'Contact Us', desc: 'WhatsApp or call to describe the fault. We advise whether to bring it in or request a collection from your Rosebank location.' },
              { step: '02', title: 'Free Diagnostic', desc: 'Board-level assessment within 24 hours using schematics and microscopy. Exact fault identified — no guesswork.' },
              { step: '03', title: 'Written Quote', desc: 'Clear breakdown: fault, repair method, cost, and timeframe. No work starts until you approve in writing.' },
              { step: '04', title: 'Precision Repair', desc: 'Microsoldering under a Swift 100X stereo microscope. Only the failed component is touched — your board remains original.' },
              { step: '05', title: 'Return to Rosebank', desc: 'Tested under load and returned to your door with a 12-month written warranty. Turnaround typically 48–72 hours.' },
            ].map(({ step, title, desc }) => (
              <div key={step} className="glass-card p-6 flex gap-5">
                <span className="text-[#0FEA7A] font-extrabold text-2xl flex-shrink-0" style={{ fontFamily: 'Syne, sans-serif' }}>{step}</span>
                <div>
                  <h3 className="text-[#E8F4F1] font-bold mb-1">{title}</h3>
                  <p className="text-[#7A9E98] text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Microsoldering vs Replacement */}
      <section className="py-20 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-10 text-center" style={{ fontFamily: 'Syne, sans-serif' }}>
            Why We Repair Rather Than Replace
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="glass-card p-8 border-[rgba(15,234,122,0.3)]">
              <h3 className="text-[#0FEA7A] text-xl font-bold mb-4" style={{ fontFamily: 'Syne, sans-serif' }}>✓ Microsoldering (What We Always Try First)</h3>
              <ul className="space-y-3">
                {[
                  'Repairs only the failed component',
                  'Original board — your data is never at risk',
                  '60–80% cheaper than board replacement',
                  'Touch ID and Secure Enclave remain paired',
                  '12-month ZA Support warranty included',
                  'Most repairs completed within 48–72 hours',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-[#7A9E98] text-sm">
                    <CheckCircle className="w-4 h-4 text-[#0FEA7A] flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="glass-card p-8">
              <h3 className="text-[#7A9E98] text-xl font-bold mb-4" style={{ fontFamily: 'Syne, sans-serif' }}>Board Replacement (Last Resort)</h3>
              <ul className="space-y-3">
                {[
                  'Only when component repair is not technically possible',
                  'Significantly higher cost',
                  'Touch ID pairing is lost on replacement',
                  'Requires data migration on M-series models',
                  '12-month ZA Support warranty on replacement',
                  'Applied to: severe burn, multi-chip failure',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-[#7A9E98] text-sm">
                    <span className="w-4 h-4 flex-shrink-0 mt-0.5">–</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Repair Services */}
      <section className="py-20 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-8" style={{ fontFamily: 'Syne, sans-serif' }}>Repair Services</h2>
          <div className="glass-card overflow-hidden p-0">
            {pricing.map((item, i) => (
              <div key={item.item} className={`p-5 ${i < pricing.length - 1 ? 'border-b border-[rgba(255,255,255,0.05)]' : ''}`}>
                <p className="text-[#E8F4F1] font-semibold">{item.item}</p>
                <p className="text-[#7A9E98] text-xs mt-0.5">{item.note}</p>
              </div>
            ))}
          </div>
          <p className="text-[#7A9E98] text-xs mt-3">Final quote given after free diagnostic. No obligation to proceed.</p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQAccordion items={faqs} title="Logic Board Repair Rosebank — Common Questions" />
        </div>
      </section>

      {/* Other Suburbs */}
      <section className="py-16 bg-[#111C1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#E8F4F1] mb-6" style={{ fontFamily: 'Syne, sans-serif' }}>We Also Serve These Areas</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { label: 'Sandton', href: '/logic-board-repair/sandton' },
              { label: 'Midrand', href: '/logic-board-repair/midrand' },
              { label: 'Randburg', href: '/logic-board-repair/randburg' },
              { label: 'Fourways', href: '/logic-board-repair/fourways' },
              { label: 'Bryanston', href: '/logic-board-repair/bryanston' },
            ].map((area) => (
              <Link key={area.href} href={area.href} className="glass-card p-4 text-center group">
                <span className="text-[#E8F4F1] text-sm font-semibold group-hover:text-[#0FEA7A] transition-colors">{area.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-[rgba(39,80,77,0.3)] border border-[rgba(15,234,122,0.2)] rounded-3xl p-10">
            <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3" style={{ fontFamily: 'Syne, sans-serif' }}>Rosebank MacBook Fault? Free Diagnostic.</h2>
            <p className="text-[#7A9E98] mb-6">5 minutes from Rosebank. No Fix No Fee. 12-month warranty.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={CONTACT.whatsappLogicBoard} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 transition-all">
                💬 WhatsApp for Quote
              </a>
              <a href={`tel:${CONTACT.phoneTel}`} className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all">
                <Phone className="w-5 h-5" /> Call {CONTACT.phone}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
