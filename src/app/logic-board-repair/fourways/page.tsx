import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, ArrowRight, Cpu, Zap, AlertTriangle, CheckCircle, MapPin } from 'lucide-react';
import SchemaOrg from '@/components/seo/SchemaOrg';
import { buildFaqSchema, LOCAL_BUSINESS_PROVIDER } from '@/lib/schema';
import FAQAccordion from '@/components/ui/FAQ';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { CONTACT } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'MacBook Logic Board Repair Fourways | ZA Support Hyde Park',
  description:
    'MacBook logic board repair for Fourways clients. Component-level repair specialists, we collect from Fourways and repair at our Hyde Park workshop. Assessment: from R599. Call 064 529 5863.',
  alternates: { canonical: 'https://zasupport.com/logic-board-repair/fourways' },
};

const faults = [
  { title: 'No Power', desc: 'MacBook dead on arrival, no fan, no display, no charging response. Power rail components traced and replaced at board level.' },
  { title: 'Black Screen', desc: 'Mac starts up but screen stays dark. Display driver path, backlight circuit, or GPU output diagnosed and repaired under microscope.' },
  { title: 'Coffee or Water Damage', desc: 'Spill from the home office or café results in immediate or delayed failure. Board ultrasonically cleaned and damaged components restored.' },
  { title: 'Overheating', desc: 'MacBook shuts down under load or after extended use. Voltage regulator, blocked power rail, or failed thermal sensor identified and fixed.' },
  { title: 'USB-C Will Not Charge', desc: 'One or all USB-C ports fail to charge or recognise accessories. Retimer IC or USB-C controller chip replaced at component level.' },
  { title: 'Maximum Fan Speed', desc: 'Fans spin at full speed from startup regardless of temperature. SMC component fault or dead thermal sensor, board-level repair.' },
  { title: 'GPU / Visual Artefacts', desc: 'Lines, blocks, or colour distortion on the display. Discrete GPU failure on affected Intel models, reballing or chip replacement.' },
  { title: 'Kernel Panics', desc: 'Crash logs pointing to power management or RAM interface failure on the logic board, identified and resolved at component level.' },
];

const pricing = [
  { item: 'Diagnostic Assessment', note: 'Full board-level inspection, no charge, no obligation' },
  { item: 'USB-C / Thunderbolt Repair', note: 'Controller chip or port board replacement' },
  { item: 'Power Circuit Repair', note: 'No-power fault and charging failure repair' },
  { item: 'Component-level repair Repair', note: 'Component-level repair under microscope' },
  { item: 'GPU Repair / Reballing', note: 'Discrete GPU, Intel Mac models only' },
  { item: 'Logic Board Replacement', note: 'Full board swap where repair is not viable' },
];

const faqs = [
  {
    question: 'Do you come to Fourways to collect my MacBook?',
    answer: 'Yes. We offer collection from Fourways for all logic board repairs. Our Hyde Park workshop is approximately 13 km from Fourways, roughly 20 to 30 minutes via the N14 or William Nicol Drive depending on traffic. We arrange a collection time that suits your schedule, carry out the repair, and return your MacBook once complete.',
  },
  {
    question: 'How far is Fourways from your workshop?',
    answer: 'Fourways is approximately 13 km from our Hyde Park workshop at 1 Hyde Lane, around 20 to 30 minutes via William Nicol Drive or the N14. Many Fourways clients who commute through Sandton or Rosebank find it convenient to drop their MacBook off at our workshop directly. We are open Monday to Friday 08:00–17:30 and Closed Saturdays.',
  },
  {
    question: 'My MacBook Air M2 will not turn on. Is that repairable?',
    answer: 'In most cases, yes. A no-power fault on an Apple Silicon MacBook Air is very often caused by a failed component in the power delivery circuitry, a blown fuse, a dead MOSFET, or a failed power management IC. These are not failures in the M2 SoC itself but in the surrounding board components that can be repaired by component-level repair. The diagnostic will confirm the exact cause.',
  },
  {
    question: 'Do you repair MacBook Pros from the Fourways Mall Apple Premium Reseller?',
    answer: 'Yes, we repair all models sold through Apple Premium Resellers and independent retailers. ZA Support is an independent Apple repair specialist, we are not affiliated with Apple or any reseller. This means our prices are competitive, our repairs are component-level (not just board swaps), and we back every repair with a up-to-3 year warranty.',
  },
  {
    question: 'What is the turnaround time for a Fourways collection job?',
    answer: 'From collection to return, most repairs are completed within 3–5 business days including the collection day, diagnostic (24 hours), the repair itself (48–72 hours for most faults), and return. Complex component-level repair jobs may take 5–7 business days. We confirm the timeline with you before work begins.',
  },
  {
    question: 'Is my data at risk during a logic board repair?',
    answer: 'No. Your storage is not touched during a logic board repair. We do not reformat, erase, or access your personal data. The only exception is if a full board replacement is required on an M-series MacBook where the SSD is integrated into the board, in that case, we discuss your data migration options before proceeding.',
  },
];

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'MacBook Logic Board Repair Fourways',
  description: 'MacBook logic board component-level repair for Fourways clients. Collection from Fourways, repair at Hyde Park workshop. Assessment: from R599. up-to-3 year warranty.',
  provider: LOCAL_BUSINESS_PROVIDER,
  areaServed: [
    { '@type': 'City', name: 'Johannesburg' },
    { '@type': 'Neighborhood', name: 'Fourways' },
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://zasupport.com' },
    { '@type': 'ListItem', position: 2, name: 'Logic Board Repair', item: 'https://zasupport.com/logic-board-repair' },
    { '@type': 'ListItem', position: 3, name: 'Fourways', item: 'https://zasupport.com/logic-board-repair/fourways' },
  ],
};

const faqSchema = buildFaqSchema(faqs);

export default function LogicBoardRepairFourwaysPage() {
  return (
    <>
      <SchemaOrg schema={faqSchema} />
      <SchemaOrg schema={serviceSchema} />
      <SchemaOrg schema={breadcrumbSchema} />

      <section className="hero-gradient grid-overlay pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[
            { label: 'Logic Board Repair', href: '/logic-board-repair' },
            { label: 'Fourways' },
          ]} />
          <div className="mt-8 max-w-4xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#E8F4F1] leading-tight mb-6">
              Logic Board Repair Fourways, Johannesburg
              <br /><span className="text-[#0FEA7A]">— MacBook Specialists</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-4 max-w-3xl leading-relaxed">
              Fourways MacBook logic board repair with collection from your door. We specialise in component-level repair, fixing the actual failed component, not just replacing the whole board at premium cost.
            </p>
            <div className="flex items-center gap-2 text-[#7A9E98] text-sm mb-8">
              <MapPin className="w-4 h-4 text-[#0FEA7A]" />
              <span>We collect from Fourways and repair at our Hyde Park workshop, approx. 20–30 min via William Nicol Drive</span>
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
      <section className="py-8 sm:py-16 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-6">
            MacBook Logic Board Repair for Fourways Clients
          </h2>
          <div className="space-y-4 text-[#7A9E98] leading-relaxed">
            <p>
              Fourways has evolved into one of Johannesburg&apos;s largest residential and commercial precincts, taking in Broadacres, Lonehill, Douglasdale, Paulshof, and the Fourways Mall node. It is home to a significant number of professionals, families, and remote workers, many of them on Apple devices.
            </p>
            <p>
              When a logic board fault develops, and they do, on every generation of Mac, the question is whether the shop you take it to has the equipment and skill to repair it at component level. Most general repair shops in the Fourways area do not. They quote a full board replacement when the actual fault is a single blown fuse or a failed charging IC worth a fraction of that. ZA Support is different.
            </p>
            <p>
              Our Hyde Park workshop is approximately 20–30 minutes from Fourways via William Nicol Drive. We are equipped for component-level repair, a stereo microscope, precision rework stations, and the diagnostic tools needed to trace a fault to a specific millimetre on the board. We offer collection from Fourways so you can stay home or at work while we handle the rest.
            </p>
            <p>
              We see a consistent pattern of faults from Fourways clients: MacBook Airs with failed USB-C charging, Intel MacBook Pro 15-inch models with GPU failure, and liquid-damaged MacBooks from the home office environment. All are handled with the same structured approach, diagnostic first, quote second, repair only on approval.
            </p>
          </div>
        </div>
      </section>

      {/* Fault Types */}
      <section className="py-10 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-10 text-center">
            Logic Board Problems We Resolve
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
            Our Process, Fourways Collection to Delivery
          </h2>
          <div className="space-y-6">
            {[
              { step: '01', title: 'Collection from Fourways', desc: 'Message or call. We arrange collection from your Fourways home, office, or business at a time that suits your day.' },
              { step: '02', title: 'Board Diagnostic', desc: 'Assessment within 24 hours. Fault identified using schematics, oscilloscope, and microscope. No assumptions, exact cause confirmed.' },
              { step: '03', title: 'Written Quote', desc: 'You receive a clear written quote with fault description, repair approach, price, and timeframe. No work begins without approval.' },
              { step: '04', title: 'Component-level repair Repair', desc: 'Failed component replaced under a high-magnification stereo microscope. Original board preserved. Only the fault is addressed.' },
              { step: '05', title: 'Return to Fourways', desc: 'MacBook tested under load, returned to your Fourways address, and backed by a written up-to-3 year warranty.' },
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

      {/* Repair Services */}
      <section className="py-10 sm:py-20 bg-[#0A1A18]">
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
          <p className="text-[#7A9E98] text-xs mt-3">Confirmed by written quote after assessment. No obligation to repair if the quote is not acceptable.</p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQAccordion items={faqs} title="Logic Board Repair Fourways, Common Questions" />
        </div>
      </section>

      {/* Other Suburbs */}
      <section className="py-8 sm:py-16 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#E8F4F1] mb-6">We Also Serve These Areas</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { label: 'Sandton', href: '/logic-board-repair/sandton' },
              { label: 'Rosebank', href: '/logic-board-repair/rosebank' },
              { label: 'Midrand', href: '/logic-board-repair/midrand' },
              { label: 'Randburg', href: '/logic-board-repair/randburg' },
              { label: 'Bryanston', href: '/logic-board-repair/bryanston' },
            ].map((area) => (
              <Link key={area.href} href={area.href} className="glass-card p-4 text-center group">
                <span className="text-[#E8F4F1] text-sm font-semibold group-hover:text-[#0FEA7A] transition-colors">{area.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-8 sm:py-16 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-[rgba(39,80,77,0.3)] border border-[rgba(15,234,122,0.2)] rounded-3xl p-10">
            <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3">Fourways MacBook Fault? Diagnostic: from R599.</h2>
            <p className="text-[#7A9E98] mb-6">We collect from Fourways. Assessment: from R599. up-to-3 year warranty. Hyde Park workshop.</p>
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
