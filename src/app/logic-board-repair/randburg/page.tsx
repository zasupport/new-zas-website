import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, ArrowRight, Cpu, Zap, AlertTriangle, CheckCircle, MapPin } from 'lucide-react';
import SchemaOrg from '@/components/seo/SchemaOrg';
import { buildFaqSchema, LOCAL_BUSINESS_PROVIDER } from '@/lib/schema';
import FAQAccordion from '@/components/ui/FAQ';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { CONTACT, buildWhatsAppUrl} from '@/lib/constants';
import PricingNote from '@/components/PricingNote';

export const metadata: Metadata = {
  title: 'MacBook Logic Board Repair Randburg | ZA Support Hyde Park',
  description:
    'MacBook logic board repair for Randburg clients. Expert component-level repair, collect from Randburg, repair at Hyde Park workshop. Assessment: from R599. Call 064 529 5863.',
  alternates: { canonical: 'https://zasupport.com/logic-board-repair/randburg' },
};

const faults = [
  { title: 'Dead MacBook', desc: 'No power, no fan, no LED. Power delivery circuit diagnosed at component level to identify the exact failed rail, fuse, or IC.' },
  { title: 'Display Failure', desc: 'Black screen on a machine that otherwise starts up. GPU output, backlight circuit, or display signal driver traced and repaired.' },
  { title: 'Liquid Damage', desc: 'Coffee, juice, or water causes corrosion on board traces. Ultrasonic cleaning removes contamination; damaged pads restored under microscope.' },
  { title: 'Thermal Shutdowns', desc: 'MacBook shuts down under load or during normal use. Failing power regulator, blocked thermal path, or SMC-related board fault.' },
  { title: 'Charging Port Issues', desc: 'USB-C ports not recognising cables or failing to charge. Retimer chip or USB-C controller IC replaced at board level.' },
  { title: 'Noisy / Runaway Fan', desc: 'Fan runs at maximum from power-on. SMC fault or dead thermal sensor, identified and resolved at component level.' },
  { title: 'Screen Artefacts / Lines', desc: 'Visual corruption, colour banding, or partial display failure. GPU fault diagnosed and reballed or replaced on Intel models.' },
  { title: 'Frequent Crashes', desc: 'Kernel panics attributable to board faults, power delivery instability, failing RAM solder pads, or NVMe controller issues.' },
];

const pricing = [
  { item: 'Diagnostic Assessment', note: 'Full board inspection,' },
  { item: 'USB-C / Thunderbolt Repair', note: 'Controller chip or port board' },
  { item: 'Power Circuit Repair', note: 'Dead Mac and charging failure diagnosis and fix' },
  { item: 'Component-level repair Repair', note: 'Component-level precision repair' },
  { item: 'GPU Repair / Reballing', note: 'Intel discrete GPU models only' },
  { item: 'Logic Board Replacement', note: 'Full replacement as last resort' },
];

const faqs = [
  {
    question: 'Do you come to Randburg to collect my MacBook?',
    answer: 'Yes. We collect from Randburg and carry out all logic board repairs at our Hyde Park workshop. Randburg is approximately 10–15 km from Hyde Park, a 15 to 20-minute drive. Contact us on WhatsApp or by phone to arrange a convenient collection time at your home or office in Randburg.',
  },
  {
    question: 'How far is Randburg from your Hyde Park workshop?',
    answer: 'Our Hyde Park workshop at 1 Hyde Lane is approximately 10–15 km from Randburg central, roughly 15 to 20 minutes by car, depending on the route and traffic. It is a very manageable distance and we also offer collection from Randburg directly.',
  },
  {
    question: 'What types of MacBook do you repair for Randburg clients?',
    answer: 'All models, MacBook Air (all Intel generations and M1/M2/M3 Apple Silicon), MacBook Pro 13-inch, 14-inch, 15-inch, 16-inch (Intel and M-series), iMac, and Mac mini. Logic board repair techniques differ between Intel and Apple Silicon, but both are handled at component level.',
  },
  {
    question: 'My MacBook Pro 2019 shows screen artefacts. Is that a GPU fault?',
    answer: 'It is a strong indicator of GPU failure, particularly on 15-inch and 16-inch Intel MacBook Pro models from 2016–2019 which had known GPU instability. Our diagnostic confirms whether it is the discrete AMD GPU, the display signal path, or the TCON board. GPU reballing on these models is a known fix we carry out regularly.',
  },
  {
    question: 'Can you repair a MacBook that has been water damaged for some time?',
    answer: 'Yes, though the success rate is lower on boards that have had extended exposure. If your MacBook was liquid damaged weeks or months ago and has been sitting unused, corrosion will have progressed further into the board. We assess it honestly, if the traces are too severely damaged, we will tell you. But many boards that seem beyond repair can be restored with thorough cleaning and targeted component replacement.',
  },
  {
    question: 'Is there a warranty on the repair?',
    answer: 'Every completed repair carries a ZA Support up-to-3 year warranty. If the same fault recurs within the warranty period, it is repaired at no additional charge. The warranty terms are provided in writing with every repair.',
  },
];

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'MacBook Logic Board Repair Randburg',
  description: 'MacBook logic board component-level repair for Randburg clients. Collection from Randburg, repair at Hyde Park workshop. Assessment: from R599. up-to-3 year warranty.',
  provider: LOCAL_BUSINESS_PROVIDER,
  areaServed: [
    { '@type': 'City', name: 'Johannesburg' },
    { '@type': 'Neighborhood', name: 'Randburg' },
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://zasupport.com' },
    { '@type': 'ListItem', position: 2, name: 'Logic Board Repair', item: 'https://zasupport.com/logic-board-repair' },
    { '@type': 'ListItem', position: 3, name: 'Randburg', item: 'https://zasupport.com/logic-board-repair/randburg' },
  ],
};

const faqSchema = buildFaqSchema(faqs);

export default function LogicBoardRepairRandburgPage() {
  return (
    <>
      <SchemaOrg schema={faqSchema} />
      <SchemaOrg schema={serviceSchema} />
      <SchemaOrg schema={breadcrumbSchema} />

      <section className="hero-gradient grid-overlay pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[
            { label: 'Logic Board Repair', href: '/logic-board-repair' },
            { label: 'Randburg' },
          ]} />
          <div className="mt-8 max-w-4xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#E8F4F1] leading-tight mb-6">
              Logic Board Repair Randburg, Johannesburg
              <br /><span className="text-[#0FEA7A]">— MacBook Specialists</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-4 max-w-3xl leading-relaxed">
              MacBook logic board component-level repair for Randburg residents and businesses. We collect from Randburg and repair at our Hyde Park workshop, no board-swap guesswork, component-level repair only.
            </p>
            <div className="flex items-center gap-2 text-[#7A9E98] text-sm mb-8">
              <MapPin className="w-4 h-4 text-[#0FEA7A]" />
              <span>We collect from Randburg and repair at our Hyde Park workshop, approx. 15–20 min drive</span>
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
              <a href={buildWhatsAppUrl('LBR-RANDBURG', 'logic-board')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 hover:shadow-[0_0_32px_rgba(15,234,122,0.4)] transition-all" >
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
            Serving Randburg with Genuine Board-Level Mac Repair
          </h2>
          <div className="space-y-4 text-[#7A9E98] leading-relaxed">
            <p>
              Randburg stretches across a large residential and commercial area west of Sandton, taking in Ferndale, Bordeaux, Robindale, Northcliff, and the Brightwater Commons precinct. It is a densely populated area with a strong concentration of home office workers, freelancers, and small businesses, many of whom depend on a MacBook as their primary income-generating tool.
            </p>
            <p>
              When that MacBook develops a logic board fault, no power, failed charging, display failure, or liquid damage, the instinct is often to take it to the nearest repair shop. The problem is that most shops in the Randburg area are not equipped for component-level repair. They diagnose a board fault and immediately quote for a full board replacement, when the actual fault is often a single component costing a fraction of that.
            </p>
            <p>
              ZA Support diagnoses and repairs at component level. Our Hyde Park workshop, approximately 15 minutes from central Randburg, has the equipment to trace a fault to a specific chip, capacitor, or trace, repair it under a stereo microscope, and return your original board to service. We offer a collection service from Randburg so you do not need to make the trip.
            </p>
            <p>
              The Randburg faults we see most often are no-power MacBook Pros (usually a blown fuse or charging IC), USB-C charging issues on newer models, and liquid damage from the home office coffee mug. All are common, all are repairable, and all start with a assessment that gives you the facts before any money is committed.
            </p>
          </div>
        </div>
      </section>

      {/* Fault Types */}
      <section className="py-10 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-10 text-center">
            Logic Board Faults We Diagnose and Repair
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
            How We Handle Randburg Repairs
          </h2>
          <div className="space-y-6">
            {[
              { step: '01', title: 'Collection Arranged', desc: 'Message or call us. We arrange collection from your Randburg address, home or office, at a time that suits you.' },
              { step: '02', title: 'Board Diagnostic', desc: 'Assessment completed within 24 hours. Fault identified at component level using schematics, microscope, and power-supply tools.' },
              { step: '03', title: 'Quote with Approval', desc: 'Written quote sent to you. Fault description, repair method, cost, and delivery timeline, clear and specific. No hidden costs.' },
              { step: '04', title: 'Precision Repair', desc: 'Specific failed component replaced under a Swift 100X microscope. Your board stays original. Only the fault is addressed.' },
              { step: '05', title: 'Return to Randburg', desc: 'Tested under load and returned to your Randburg address with a written up-to-3 year warranty. Typically 48–72 hours from collection.' },
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
          <p className="text-[#7A9E98] text-xs mt-3">Final quote confirmed after assessment assessment.</p>
          <PricingNote variant="inline" />
        </div>
      </section>

      {/* FAQ */}
      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQAccordion items={faqs} title="Logic Board Repair Randburg, Common Questions" />
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

      <section className="py-8 sm:py-16 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-[rgba(39,80,77,0.3)] border border-[rgba(15,234,122,0.2)] rounded-3xl p-10">
            <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3">Randburg MacBook Fault? Diagnostic: from R599.</h2>
            <p className="text-[#7A9E98] mb-6">We collect from Randburg. Assessment: from R599. up-to-3 year warranty. Hyde Park workshop.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={buildWhatsAppUrl('LBR-RANDBURG', 'logic-board')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 transition-all" >
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
