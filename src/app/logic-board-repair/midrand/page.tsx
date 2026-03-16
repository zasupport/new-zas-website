import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, ArrowRight, Cpu, Zap, AlertTriangle, CheckCircle, MapPin } from 'lucide-react';
import SchemaOrg from '@/components/seo/SchemaOrg';
import { buildFaqSchema, LOCAL_BUSINESS_PROVIDER } from '@/lib/schema';
import FAQAccordion from '@/components/ui/FAQ';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { CONTACT } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'MacBook Logic Board Repair Midrand | ZA Support Hyde Park',
  description:
    'MacBook logic board repair for Midrand clients. Microsoldering specialists, collect from Midrand, repair at Hyde Park workshop. Assessment: R899 ex VAT. Call 064 529 5863.',
  alternates: { canonical: 'https://zasupport.com/logic-board-repair/midrand' },
};

const faults = [
  { title: 'No Power / Dead Mac', desc: 'MacBook completely unresponsive. Board-level power circuit tracing to identify blown fuses, failed charging ICs, or dead MOSFETs.' },
  { title: 'No Display', desc: 'Mac powers on but screen stays black. Backlight driver, TCON, GPU output path, or display connector traced and repaired at chip level.' },
  { title: 'Water / Liquid Damage', desc: 'Liquid ingress causes immediate shorting or delayed corrosion. Ultrasonic cleaning and precision restoration of affected pads and traces.' },
  { title: 'Unexpected Shutdowns', desc: 'Thermal or power management faults causing shutdown under load or at idle. Specific voltage rail or regulator IC identified and replaced.' },
  { title: 'USB-C Charging Failure', desc: 'MacBook will not charge or recognise cables on USB-C ports. Retimer chip, USB-C controller, or port board fault repaired at component level.' },
  { title: 'Fan at Maximum Speed', desc: 'Fans running at full speed from startup. SMC firmware fault or failed thermal sensor replaced, restores normal fan management.' },
  { title: 'GPU Failure', desc: 'Display artefacts, screen freezes, or inability to drive external displays. Discrete GPU reballed or replaced on affected Intel Mac models.' },
  { title: 'Repeated Kernel Panics', desc: 'Persistent crashes attributable to power delivery failure, failing RAM solder points, or storage controller faults on the board.' },
];

const pricing = [
  { item: 'Diagnostic Assessment', note: 'Component-level board inspection with no charge' },
  { item: 'USB-C / Thunderbolt Repair', note: 'Port board or controller chip, Midrand collection available' },
  { item: 'Power Circuit Repair', note: 'No-power and charging circuit fault repair' },
  { item: 'Microsoldering Repair', note: 'Precision chip and component-level repair' },
  { item: 'GPU Repair / Reballing', note: 'Intel discrete GPU models only' },
  { item: 'Logic Board Replacement', note: 'Full replacement when repair is not viable' },
];

const faqs = [
  {
    question: 'Do you come to Midrand to collect my MacBook?',
    answer: 'Yes. We offer a collection and return service for Midrand clients. Our Hyde Park workshop is approximately 25–30 km from central Midrand, around 25 to 35 minutes depending on N1 traffic. We coordinate a collection time that works for you, carry out the repair at Hyde Park, and return your MacBook once it is tested and ready.',
  },
  {
    question: 'How far is Midrand from your workshop?',
    answer: 'Our Hyde Park workshop is approximately 25–30 km from central Midrand via the N1. Journey time is typically 25–35 minutes during off-peak hours and longer during morning and evening commute times. Many Midrand clients find it convenient to drop their MacBook off on a trip to Sandton and collect at the end of the week.',
  },
  {
    question: 'Can you repair M1 and M2 MacBook logic boards?',
    answer: 'Yes. Apple Silicon (M1, M2, M3) MacBooks are fully serviceable at the component level for everything surrounding the SoC, power management, USB-C controllers, storage interface, and board traces. The SoC itself integrates the CPU, GPU, RAM, and Neural Engine and cannot be replaced at chip level. However, the majority of logic board failures on Apple Silicon models are in the surrounding components, not the SoC, and those we repair.',
  },
  {
    question: 'Is the repair price fixed or can it change after the quote?',
    answer: 'The price in your written quote is the price you pay. We do not add costs after a repair has been approved. The only exception is if we discover additional hidden damage during the repair that was not visible at the diagnostic stage, in that case we pause, contact you, and get approval before continuing. Surprises are rare; our diagnostic is thorough.',
  },
  {
    question: 'My MacBook was dropped and now shows no display. Is that a logic board issue?',
    answer: 'Physical impact can cause display faults at multiple points, the display cable, the display itself, or the GPU/display signal path on the logic board. Our diagnostic determines which component is responsible. Some drop-related faults are cable or hinge issues (cheaper fix); others involve board-level damage. We will identify the exact cause and give you an accurate quote.',
  },
  {
    question: 'Do you offer any data protection during the repair?',
    answer: 'Your storage and data remain on the device throughout the repair. We do not reformat or erase your drive. If a full logic board replacement is necessary on an M-series Mac (where the SSD is soldered to the board), we discuss data migration options with you before proceeding. For all other repairs, your data is untouched.',
  },
];

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'MacBook Logic Board Repair Midrand',
  description: 'MacBook logic board repair and microsoldering for Midrand clients. Collection from Midrand, repair at Hyde Park workshop. Assessment: R899 ex VAT.',
  provider: LOCAL_BUSINESS_PROVIDER,
  areaServed: [
    { '@type': 'City', name: 'Johannesburg' },
    { '@type': 'City', name: 'Midrand' },
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://zasupport.com' },
    { '@type': 'ListItem', position: 2, name: 'Logic Board Repair', item: 'https://zasupport.com/logic-board-repair' },
    { '@type': 'ListItem', position: 3, name: 'Midrand', item: 'https://zasupport.com/logic-board-repair/midrand' },
  ],
};

const faqSchema = buildFaqSchema(faqs);

export default function LogicBoardRepairMidrandPage() {
  return (
    <>
      <SchemaOrg schema={faqSchema} />
      <SchemaOrg schema={serviceSchema} />
      <SchemaOrg schema={breadcrumbSchema} />

      <section className="hero-gradient grid-overlay pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[
            { label: 'Logic Board Repair', href: '/logic-board-repair' },
            { label: 'Midrand' },
          ]} />
          <div className="mt-8 max-w-4xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#E8F4F1] leading-tight mb-6" style={{ fontFamily: 'Syne, sans-serif' }}>
              Logic Board Repair Midrand, Johannesburg
              <br /><span className="text-[#0FEA7A]">— MacBook Specialists</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-4 max-w-3xl leading-relaxed">
              Serving Midrand with MacBook logic board microsoldering and component-level repair. We collect from Midrand and carry out all repairs at our Hyde Park workshop.
            </p>
            <div className="flex items-center gap-2 text-[#7A9E98] text-sm mb-8">
              <MapPin className="w-4 h-4 text-[#0FEA7A]" />
              <span>We collect from Midrand and repair at our Hyde Park workshop, approx. 25–35 min via N1</span>
            </div>
            <div className="flex flex-wrap gap-4 mb-8">
              {[
                { icon: Cpu, label: 'Microscope Microsoldering' },
                { icon: Zap, label: 'Free Diagnostic' },
                { icon: CheckCircle, label: 'Assessment: R899 ex VAT' },
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
      <section className="py-16 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-6" style={{ fontFamily: 'Syne, sans-serif' }}>
            MacBook Logic Board Repair, Serving the Midrand Corridor
          </h2>
          <div className="space-y-4 text-[#7A9E98] leading-relaxed">
            <p>
              Midrand has grown into one of Gauteng&apos;s most significant technology and business nodes, from the Waterfall City development to the Kyalami area and the commercial parks along the N1. The area hosts a large population of tech workers, remote professionals, and SME business owners, many of whom rely on MacBooks as their primary work machine.
            </p>
            <p>
              When a logic board fault strikes, the challenge for Midrand residents is finding a repair service with genuine component-level capability rather than one that simply swaps the entire board and charges accordingly. ZA Support&apos;s Hyde Park workshop is equipped for microsoldering, we identify the specific failed component, repair it using professional equipment, and return your original board to service. The cost saving over board replacement is typically 60–80%.
            </p>
            <p>
              We offer a full collection and return service for Midrand clients. The drive from central Midrand to Hyde Park via the N1 is approximately 25–35 minutes. We coordinate collection times to suit your schedule and provide you with a assessment report and written quote before any repair is authorised.
            </p>
            <p>
              Common logic board faults we resolve for Midrand clients include no-power MacBooks (often a single blown component on the power rail), USB-C charging failures on the 13-inch MacBook Pro, and liquid damage from the morning coffee routine. Each fault starts with a diagnostic session, charged at nothing, that confirms the cause before any repair work is quoted.
            </p>
          </div>
        </div>
      </section>

      {/* Fault Types */}
      <section className="py-20 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-10 text-center" style={{ fontFamily: 'Syne, sans-serif' }}>
            Logic Board Faults We Fix
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
            The Repair Process, Midrand to Hyde Park
          </h2>
          <div className="space-y-6">
            {[
              { step: '01', title: 'Arrange Collection from Midrand', desc: 'Contact us via WhatsApp or phone. We agree a collection window at your home, office, or business park in Midrand.' },
              { step: '02', title: 'Board-Level Diagnostic', desc: 'Full inspection within 24 hours, microscope, schematics, and power-supply diagnostics. Exact fault identified and documented.' },
              { step: '03', title: 'Written Quote and Approval', desc: 'You receive a detailed written quote: fault identified, repair approach, cost, and timeframe. No work begins without your sign-off.' },
              { step: '04', title: 'Microsoldering Repair', desc: 'Precision repair using specialist equipment. The specific failed component is replaced, your original board is preserved.' },
              { step: '05', title: 'Return Delivery to Midrand', desc: 'MacBook tested under load, returned to your Midrand address, and backed by a written 3-month warranty.' },
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

      {/* Repair Services */}
      <section className="py-20 bg-[#0A1A18]">
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
          <p className="text-[#7A9E98] text-xs mt-3">Final price confirmed after assessment. Collection from Midrand included in service, no hidden charges.</p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQAccordion items={faqs} title="Logic Board Repair Midrand, Common Questions" />
        </div>
      </section>

      {/* Other Suburbs */}
      <section className="py-16 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#E8F4F1] mb-6" style={{ fontFamily: 'Syne, sans-serif' }}>We Also Serve These Areas</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { label: 'Sandton', href: '/logic-board-repair/sandton' },
              { label: 'Rosebank', href: '/logic-board-repair/rosebank' },
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

      <section className="py-16 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-[rgba(39,80,77,0.3)] border border-[rgba(15,234,122,0.2)] rounded-3xl p-10">
            <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3" style={{ fontFamily: 'Syne, sans-serif' }}>Midrand MacBook Problem? Free Diagnostic.</h2>
            <p className="text-[#7A9E98] mb-6">We collect from Midrand. Assessment: R899 ex VAT. 3-month warranty. Hyde Park workshop.</p>
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
