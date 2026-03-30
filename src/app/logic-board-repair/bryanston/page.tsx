import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, ArrowRight, Cpu, Zap, AlertTriangle, CheckCircle, MapPin } from 'lucide-react';
import SchemaOrg from '@/components/seo/SchemaOrg';
import { buildFaqSchema, LOCAL_BUSINESS_PROVIDER } from '@/lib/schema';
import FAQAccordion from '@/components/ui/FAQ';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { CONTACT, buildWhatsAppUrl} from '@/lib/constants';

export const metadata: Metadata = {
  title: 'MacBook Logic Board Repair Bryanston | ZA Support Hyde Park',
  description:
    'MacBook logic board repair for Bryanston clients. Expert component-level repair, 10 minutes from Bryanston to Hyde Park. Assessment: from R599, up-to-3 year warranty. Call 064 529 5863.',
  alternates: { canonical: 'https://zasupport.com/logic-board-repair/bryanston' },
};

const faults = [
  { title: 'No Power', desc: 'MacBook completely unresponsive. Board-level power delivery diagnosis, fuses, MOSFETs, charging ICs, and voltage rails all assessed.' },
  { title: 'No Display Output', desc: 'Machine starts but screen is black. GPU output path, backlight driver circuit, or display signal IC traced and repaired at chip level.' },
  { title: 'Liquid Damage', desc: 'Liquid exposure causes immediate failure or delayed corrosion. Board ultrasonically cleaned and damaged traces and components restored.' },
  { title: 'Thermal Shutdowns', desc: 'MacBook shuts off unexpectedly. Voltage regulator or power management IC failure causing unstable power delivery under load.' },
  { title: 'USB-C / Thunderbolt Fault', desc: 'Charging or data transfer fails on USB-C ports. CD3217 retimer or USB-C controller chip replaced at component level on the logic board.' },
  { title: 'Fan Always at Maximum', desc: 'Continuous maximum-speed fans from startup. SMC fault or dead thermal sensor resolved through board-level component repair.' },
  { title: 'GPU Screen Artefacts', desc: 'Flickering, coloured lines, or partial display failure on Intel Mac models. GPU reballing or chip-level replacement.' },
  { title: 'System Instability / Panics', desc: 'Persistent kernel panics traced to power delivery instability, RAM interface faults, or NVMe controller issues at board level.' },
];

const pricing = [
  { item: 'Diagnostic Assessment', note: 'Board-level inspection, no charge, no commitment' },
  { item: 'USB-C / Thunderbolt Repair', note: 'Controller chip or port board' },
  { item: 'Power Circuit Repair', note: 'No-power fault, power rail diagnosis and fix' },
  { item: 'Component-level repair Repair', note: 'Precision microscope-level board repair' },
  { item: 'GPU Repair / Reballing', note: 'Intel discrete GPU models only' },
  { item: 'Logic Board Replacement', note: 'Full swap only when repair is not possible' },
];

const faqs = [
  {
    question: 'Do you come to Bryanston to collect my MacBook?',
    answer: 'Yes. Bryanston is one of our closest service areas, approximately 8–12 km from our Hyde Park workshop, or about 10 to 15 minutes drive. We collect from your home or office in Bryanston, complete the repair at Hyde Park, and return your MacBook to you. Contact us on WhatsApp or by phone to arrange a collection time.',
  },
  {
    question: 'How close is Bryanston to your Hyde Park workshop?',
    answer: 'Bryanston is very close, approximately 8–12 km via Winnie Mandela Drive or William Nicol Drive, which is a 10 to 15-minute drive in normal traffic. It is one of the easiest areas for us to serve, and many Bryanston clients choose to drop off and collect directly at our Hyde Park workshop during a trip to the area.',
  },
  {
    question: 'My MacBook Pro 2020 shows no power after a liquid spill. What do you recommend?',
    answer: 'Stop using it immediately if you have not already, do not attempt to charge or turn on a liquid-damaged Mac. Remove any power source and bring it to us or arrange collection as soon as possible. The faster a liquid-damaged board reaches us, the higher the recovery rate. We ultrasonically clean the board, stop the corrosion process, and repair the damaged components. Many boards that appear dead can be restored.',
  },
  {
    question: 'Can you repair the logic board on a MacBook Pro M3?',
    answer: 'Yes, for the components surrounding the M3 SoC. The M3 chip itself integrates the CPU, GPU, RAM, and Neural Engine in a single package that cannot be replaced at chip level. However, the power management circuit, USB-C controllers, storage interface, and board traces around the SoC are fully repairable through component-level repair, and these are the components that most commonly fail.',
  },
  {
    question: 'What happens if my MacBook cannot be repaired?',
    answer: 'We tell you honestly, explain what we found in the diagnostic, and outline your options. You can proceed with a board replacement, sell the device for parts, or pursue data recovery from the storage. An assessment fee of from R599 applies. We never charge for repair work that does not happen.',
  },
  {
    question: 'How long does the repair take from Bryanston?',
    answer: 'From the day of collection: the diagnostic is completed within 24 hours. Once you approve the quote, most repairs are done within 48–72 hours. Complex jobs (GPU, multi-component component-level repair, severe liquid damage) may take 3–5 business days. Total from collection to return is typically 3–5 business days for standard repairs.',
  },
];

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'MacBook Logic Board Repair Bryanston',
  description: 'MacBook logic board component-level repair for Bryanston clients. 10 minutes from Bryanston to our Hyde Park workshop. Assessment: from R599. up-to-3 year warranty.',
  provider: LOCAL_BUSINESS_PROVIDER,
  areaServed: [
    { '@type': 'City', name: 'Johannesburg' },
    { '@type': 'Neighborhood', name: 'Bryanston' },
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://zasupport.com' },
    { '@type': 'ListItem', position: 2, name: 'Logic Board Repair', item: 'https://zasupport.com/logic-board-repair' },
    { '@type': 'ListItem', position: 3, name: 'Bryanston', item: 'https://zasupport.com/logic-board-repair/bryanston' },
  ],
};

const faqSchema = buildFaqSchema(faqs);

export default function LogicBoardRepairBryanstonPage() {
  return (
    <>
      <SchemaOrg schema={faqSchema} />
      <SchemaOrg schema={serviceSchema} />
      <SchemaOrg schema={breadcrumbSchema} />

      <section className="hero-gradient grid-overlay pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[
            { label: 'Logic Board Repair', href: '/logic-board-repair' },
            { label: 'Bryanston' },
          ]} />
          <div className="mt-8 max-w-4xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#E8F4F1] leading-tight mb-6">
              Logic Board Repair Bryanston, Johannesburg
              <br /><span className="text-[#0FEA7A]">— MacBook Specialists</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-4 max-w-3xl leading-relaxed">
              Bryanston is 10 minutes from our Hyde Park workshop. We collect your MacBook, diagnose the board fault at component level, and repair it, without replacing the whole board unless absolutely necessary.
            </p>
            <div className="flex items-center gap-2 text-[#7A9E98] text-sm mb-8">
              <MapPin className="w-4 h-4 text-[#0FEA7A]" />
              <span>We collect from Bryanston and repair at our Hyde Park workshop, approx. 10–15 min drive (8–12 km)</span>
            </div>
            <div className="flex flex-wrap gap-4 mb-8">
              {[
                { icon: Cpu, label: 'Microscope Component-level repair' },
                { icon: Zap, label: 'Diagnostic: from R599' },
                { icon: CheckCircle, label: 'Assessment: from R599' },
                { icon: AlertTriangle, label: 'Warranty' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 bg-[rgba(15,234,122,0.08)] border border-[rgba(15,234,122,0.15)] px-4 py-2 rounded-full">
                  <Icon className="w-4 h-4 text-[#0FEA7A]" />
                  <span className="text-[#E8F4F1] text-sm font-medium">{label}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href={buildWhatsAppUrl('LBR-BRYANSTON', 'logic-board')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 hover:shadow-[0_0_32px_rgba(15,234,122,0.4)] transition-all" >
                💬 WhatsApp for Quote
              </a>
              <a href={`tel:${CONTACT.phoneTel}`} className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all" target="_blank" rel="noopener noreferrer">
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
      <section className="py-8 sm:py-16 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-6">
            Bryanston&apos;s Nearest MacBook Logic Board Repair Specialist
          </h2>
          <div className="space-y-4 text-[#7A9E98] leading-relaxed">
            <p>
              Bryanston is a predominantly residential suburb with a significant population of professionals, executives, and remote workers, many of them on Mac hardware. It sits directly adjacent to the Sandton business district and shares the William Nicol corridor with Hyde Park, making ZA Support&apos;s workshop one of the closest specialist repair options available.
            </p>
            <p>
              The challenge most Bryanston Mac owners face when a logic board fault develops is finding a shop that will actually diagnose and repair the board rather than immediately quoting for a full replacement. Board swaps are easier for general repair shops, they require no specialised equipment. But they cost substantially more, and they are unnecessary in the majority of cases.
            </p>
            <p>
              ZA Support&apos;s approach is to identify the specific failed component first. That requires a stereo microscope, board-level diagnostic tools, and access to Apple schematics, all of which we have at our Hyde Park workshop. The repair itself is component-level repair: the damaged chip, capacitor, or trace is addressed directly, leaving the rest of your original board intact. The cost saving over board replacement is typically 60–80%.
            </p>
            <p>
              We offer collection from Bryanston. The drive is 10–15 minutes, less than the time spent on hold with most repair centres. Once collected, your MacBook receives a board-level diagnostic within 24 hours, a written quote before any work begins, and a warranty on every completed repair.
            </p>
          </div>
        </div>
      </section>

      {/* Fault Types */}
      <section className="py-10 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-10 text-center">
            Logic Board Faults We Fix for Bryanston Clients
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {faults.map((fault) => (
              <div key={fault.title} className="glass-card p-5">
                <h3 className="text-[#E8F4F1] font-bold mb-2">{fault.title}</h3>
                <p className="text-[#7A9E98] text-sm leading-relaxed">{fault.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-8">
            Bryanston to Hyde Park, The Repair Journey
          </h2>
          <div className="space-y-6">
            {[
              { step: '01', title: 'Collection from Bryanston', desc: 'Contact us on WhatsApp or phone. We arrange a collection from your Bryanston address, typically within 24 hours.' },
              { step: '02', title: 'Diagnostic Assessment', desc: 'Board inspected within 24 hours of collection. Fault identified to component level, schematic, microscope, and power diagnostics used.' },
              { step: '03', title: 'Written Quote and Sign-Off', desc: 'You receive a written quote: fault description, repair method, cost, and timeframe. No repair proceeds without your approval.' },
              { step: '04', title: 'Component-level repair Repair', desc: 'The specific failed component is replaced under a stereo microscope. Your original board is preserved. Only the fault is addressed.' },
              { step: '05', title: 'Return to Bryanston', desc: 'Tested under load. Returned to your Bryanston address with a ZA Support up-to-3 year warranty. Standard turnaround 48–72 hours from approval.' },
            ].map(({ step, title, desc }) => (
              <div key={step} className="glass-card p-6 flex gap-5">
                <span className="text-[#0FEA7A] font-extrabold text-2xl flex-shrink-0">{step}</span>
                <div>
                  <h3 className="text-[#E8F4F1] font-bold mb-1">{title}</h3>
                  <p className="text-[#7A9E98] text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Component-level repair vs Replacement */}
      <section className="py-10 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-10 text-center">
            Component-level repair vs Board Replacement
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="glass-card p-8 border-[rgba(15,234,122,0.3)]">
              <h3 className="text-[#0FEA7A] text-xl font-bold mb-4">✓ Component-level repair (We Always Try This First)</h3>
              <ul className="space-y-3">
                {[
                  'Repairs the exact failed component',
                  'Original board, data remains on device',
                  '60–80% cheaper than board replacement',
                  'Touch ID and Secure Enclave remain intact',
                  'ZA Support warranty',
                  'Turnaround typically 48–72 hours',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-[#7A9E98] text-sm">
                    <CheckCircle className="w-4 h-4 text-[#0FEA7A] flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="glass-card p-8">
              <h3 className="text-[#7A9E98] text-xl font-bold mb-4">Board Replacement (Only When Unavoidable)</h3>
              <ul className="space-y-3">
                {[
                  'Used only when board is beyond component repair',
                  'Significantly higher cost than component-level repair',
                  'Touch ID pairing is broken on replacement',
                  'May require data migration',
                  'up-to-3 year warranty still applies',
                  'Necessary for: burn damage, multiple failed chips',
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
      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-8">Repair Services</h2>
          <div className="glass-card overflow-hidden p-0">
            {pricing.map((item, i) => (
              <div key={item.item} className={`p-5 ${i < pricing.length - 1 ? 'border-b border-[rgba(255,255,255,0.05)]' : ''}`}>
                <p className="text-[#E8F4F1] font-semibold">{item.item}</p>
                <p className="text-[#7A9E98] text-xs mt-0.5">{item.note}</p>
              </div>
            ))}
          </div>
          <p className="text-[#7A9E98] text-xs mt-3">Price confirmed by written quote after assessment. No obligation to proceed if quote is not acceptable.</p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-10 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQAccordion items={faqs} title="Logic Board Repair Bryanston, Common Questions" />
        </div>
      </section>

      {/* Other Suburbs */}
      <section className="py-8 sm:py-16 bg-[#111C1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#E8F4F1] mb-6">We Also Serve These Areas</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { label: 'Sandton', href: '/logic-board-repair/sandton' },
              { label: 'Rosebank', href: '/logic-board-repair/rosebank' },
              { label: 'Midrand', href: '/logic-board-repair/midrand' },
              { label: 'Randburg', href: '/logic-board-repair/randburg' },
              { label: 'Fourways', href: '/logic-board-repair/fourways' },
            ].map((area) => (
              <Link key={area.href} href={area.href} className="glass-card p-4 text-center group">
                <span className="text-[#E8F4F1] text-sm font-semibold group-hover:text-[#0FEA7A] transition-colors">{area.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-8 sm:py-16 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-[rgba(39,80,77,0.3)] border border-[rgba(15,234,122,0.2)] rounded-3xl p-10">
            <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3">Bryanston MacBook Fault? Diagnostic: from R599.</h2>
            <p className="text-[#7A9E98] mb-6">10 minutes from Bryanston. Assessment: from R599. up-to-3 year warranty.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={buildWhatsAppUrl('LBR-BRYANSTON', 'logic-board')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 transition-all" >
                💬 WhatsApp for Quote
              </a>
              <a href={`tel:${CONTACT.phoneTel}`} className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all" target="_blank" rel="noopener noreferrer">
                <Phone className="w-5 h-5" /> Call {CONTACT.phone}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
