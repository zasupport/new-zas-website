import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, ArrowRight, Cpu, Zap, AlertTriangle, CheckCircle, MapPin } from 'lucide-react';
import SchemaOrg from '@/components/seo/SchemaOrg';
import { buildFaqSchema, LOCAL_BUSINESS_PROVIDER } from '@/lib/schema';
import FAQAccordion from '@/components/ui/FAQ';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { CONTACT, buildWhatsAppUrl} from '@/lib/constants';
import PricingNote from '@/components/PricingNote';
import PricingRange from '@/components/PricingRange';

export const metadata: Metadata = {
  title: 'MacBook Logic Board Repair Benoni | ZA Support Hyde Park',
  description:
    'MacBook logic board repair for Benoni residents. Component-level repair, board diagnostics, assessment. We collect from Benoni and repair at our Hyde Park workshop. Call 064 529 5863.',
  alternates: { canonical: 'https://zasupport.com/logic-board-repair/benoni' },
};

const faults = [
  { title: 'No Power', desc: 'MacBook shows no signs of life, no fans, no display, no charging LED. Power rail diagnosis and component-level repair under microscope.' },
  { title: 'No Display', desc: 'Machine boots but screen stays black or shows artefacts. GPU failure, backlight fuse, or display driver chip identified and replaced.' },
  { title: 'Liquid Damage', desc: 'Coffee, water, or condensation causes corrosion on board traces and pads. Ultrasonic cleaning followed by targeted component replacement.' },
  { title: 'Overheating / Shutdown', desc: 'Unexpected shutdowns traced to failed voltage regulators, blocked power rails, or thermal sensor faults on the logic board.' },
  { title: 'USB-C / Thunderbolt Failure', desc: 'No charging, no data, or no external display on USB-C ports. Retimer chip or port board replaced at component level.' },
  { title: 'Fan Running at Full Speed', desc: 'SMC fault or failed thermal sensor causes fans to run continuously at maximum. Board-level diagnosis and SMC component repair.' },
  { title: 'GPU / Display Artefacts', desc: 'Garbled lines, flickering, or partial display failure. Discrete GPU reballing or replacement on affected Intel models.' },
  { title: 'Persistent Kernel Panics', desc: 'Crash logs pointing to logic board faults, failing RAM pads, storage controller, or power management ICs identified and repaired.' },
];

const pricing = [
  { item: 'Diagnostic Assessment', note: 'Full board-level inspection,' },
  { item: 'USB-C / Thunderbolt Repair', note: 'Port board or controller chip replacement' },
  { item: 'Power Circuit Repair', note: 'No-power diagnosis and board-level fix' },
  { item: 'Component-level Repair', note: 'Component-level board repair under microscope' },
  { item: 'GPU Repair / Reballing', note: 'Discrete GPU only, Intel Mac models' },
  { item: 'Logic Board Replacement', note: 'Where component repair is not feasible' },
];

const faqs = [
  { question: 'Do you collect MacBooks from Benoni?', answer: 'Yes, we collect from across Benoni, including Northmead, Rynfield, Lakefield, Farrarmere, and Crystal Park. The drive from Hyde Park runs via the M1, and our courier handles the East Rand route on a regular schedule. Message us on WhatsApp at 064 529 5863 to arrange a pickup window that suits you.' },
  { question: 'How far is Benoni from your Hyde Park workshop?', answer: 'Benoni is approximately 40 minutes from our Hyde Park workshop, depending on the time of day and traffic on the N3 East. We have built our collection schedule around East Rand suburbs, so Benoni, Boksburg, and Kempton Park typically run on the same route day.' },
  { question: 'What is the difference between component-level repair and a board replacement?', answer: 'Component-level repair means we diagnose the exact failed part on the logic board, a power IC, a capacitor, a shorted MOSFET, or a damaged trace, and replace only that component under the microscope. Board replacement swaps the entire logic board for another unit, which on modern MacBooks is often impossible (Apple Silicon boards are paired to the chassis) and on older machines costs many times more than the component repair itself.' },
  { question: 'My MacBook shows no power at all. Is that repairable?', answer: 'In most cases, yes. A completely dead MacBook usually points to a failure on the charging circuit, the USB-C controller, the SMC, a blown protection fuse, or a shorted capacitor on a power rail. We test for current draw the moment the charger is connected, which immediately tells us whether the board is shorted, open, or partially functional. The majority of no-power machines we see from Benoni clients are recoverable.' },
  { question: 'How long will the repair take?', answer: 'Most logic board repairs are completed within 48 to 72 hours of approval. Straightforward power IC or charging port repairs can sometimes turn around faster. Liquid damage cases, where corrosion needs careful cleaning before any rework can begin, occasionally take longer. We give you a realistic timeframe once the diagnostic is complete, rather than at booking.' },
  { question: 'What is the assessment fee?', answer: 'Our assessment fee applies. This covers the full electrical diagnostic on the logic board, current draw analysis, rail testing, and visual inspection under the microscope. If you go ahead with the repair, the assessment fee forms part of the total quoted price. If the board is genuinely beyond economical repair, you only pay the assessment fee and we return the machine.' },
  { question: 'Do you offer an Assessment guarantee?', answer: 'Yes. The assessment fee applies and covers the diagnostic time and bench testing required to identify the fault. We do not quote blindly or charge for parts before knowing what is actually wrong. Once we have isolated the failed component, you receive a fixed repair quote before any soldering work begins.' },
  { question: 'Which MacBook models do you repair for Benoni clients?', answer: 'We repair MacBook Pro and MacBook Air from the Intel Core i5 and i7 generations right through to Apple Silicon M1, M2, and M3 boards. We also handle iMac and Mac mini logic boards. If you are unsure whether your specific model and year is something we tool for, send us the serial number on WhatsApp and we will confirm before you arrange collection from Benoni.' },
];

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'MacBook Logic Board Repair Benoni',
  description: 'Expert MacBook logic board repair and component-level repair for Benoni clients. Collection from Benoni, repair at Hyde Park workshop. Assessment.',
  provider: LOCAL_BUSINESS_PROVIDER,
  areaServed: [
    { '@type': 'City', name: 'Johannesburg' },
    { '@type': 'Neighborhood', name: 'Benoni' },
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://zasupport.com' },
    { '@type': 'ListItem', position: 2, name: 'Logic Board Repair', item: 'https://zasupport.com/logic-board-repair' },
    { '@type': 'ListItem', position: 3, name: 'Benoni', item: 'https://zasupport.com/logic-board-repair/benoni' },
  ],
};

const faqSchema = buildFaqSchema(faqs);

export default function LogicBoardRepairBenoniPage() {
  return (
    <>
      <SchemaOrg schema={faqSchema} />
      <SchemaOrg schema={serviceSchema} />
      <SchemaOrg schema={breadcrumbSchema} />

      <section className="hero-gradient grid-overlay pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[
            { label: 'Logic Board Repair', href: '/logic-board-repair' },
            { label: 'Benoni' },
          ]} />
          <div className="mt-8 max-w-4xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#E8F4F1] leading-tight mb-6">
              Logic Board Repair Benoni, Johannesburg
              <br /><span className="text-[#0FEA7A]">, MacBook Specialists</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-4 max-w-3xl leading-relaxed">
              Benoni MacBook owners, from Lakefield professionals to small business operators near Lakeside Mall, rely on our logic board repair service when their machines stop powering up. We collect from Benoni and repair at our Hyde Park component-level workshop, roughly 40 minutes away via the N3. Assessment.
            </p>
            <div className="flex items-center gap-2 text-[#7A9E98] text-sm mb-8">
              <MapPin className="w-4 h-4 text-[#0FEA7A]" />
              <span>We collect from Benoni and repair at our Hyde Park workshop, approx. 40 min drive</span>
            </div>
            <div className="flex flex-wrap gap-4 mb-8">
              {[
                { icon: Cpu, label: 'Microscope Component-level Repair' },
                { icon: Zap, label: 'Assessment' },
                { icon: CheckCircle, label: 'Assessment' },
                { icon: AlertTriangle, label: '12-Month Warranty' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 bg-[rgba(15,234,122,0.08)] border border-[rgba(15,234,122,0.15)] px-4 py-2 rounded-full">
                  <Icon className="w-4 h-4 text-[#0FEA7A]" />
                  <span className="text-[#E8F4F1] text-sm font-medium">{label}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href={buildWhatsAppUrl('LBR-BENONI', 'logic-board')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 hover:shadow-[0_0_32px_rgba(15,234,122,0.4)] transition-all">
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

      <section className="py-8 sm:py-16 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-6">
            Logic Board Repair for Benoni Residents and Businesses
          </h2>
          <div className="space-y-4 text-[#7A9E98] leading-relaxed">
            <p>
              Benoni sits at the heart of the East Rand, and we have been collecting failed MacBooks from residents around Northmead, Rynfield, Lakefield, and Crystal Park for several years now. The pattern we see consistently from this corridor is a mix of older Intel-era machines that have served families and home offices well past their warranty, alongside newer M1 and M2 units belonging to professionals who commute into Sandton or Bedfordview daily. Logic board failures present in many shapes, no power on the press of the power button, a backlight that flickers and dies, USB-C ports that refuse to charge, kernel panics on wake, or fans that spin at full speed with nothing on screen. Each of these traces back to a specific component on the board, and that is what our diagnostic process is built to isolate.
            </p>
            <p>
              Our Hyde Park workshop runs hot-air rework stations, precision soldering irons, stereo microscopes with sufficient magnification to read chip markings, and the schematic and boardview references needed to follow signal paths chip to chip. When a Benoni client&apos;s MacBook arrives, we begin with a structured electrical assessment, current draw on the charging line, voltage rails across the SMC and PMIC, and continuity checks on the suspect circuit. This tells us whether the fault sits at a power IC, a shorted capacitor, a failed SSD controller, or further along the board. Quoting only happens once we know exactly what the repair entails, no guesswork, no swapping parts in hope.
            </p>
            <p>
              For Benoni residents and businesses, the collection and return service runs along the East Rand route, we have picked up from homes in Farrarmere, offices off Tom Jones Street, and even from clients near Benoni Lake. The MacBook is logged, brought to Hyde Park, diagnosed, repaired, stress-tested under load, and returned once we are satisfied the fault will not return. Most board-level repairs finish within 48 to 72 hours from the point of approval, although liquid damage and severe corrosion cases sometimes need a few extra days. We repair MacBook Pro, MacBook Air, iMac, and Mac mini across every generation we have tooling for, Intel Core i5 and i7 boards through to Apple Silicon M1, M2, and M3. If your machine is dead on the desk, message us on WhatsApp at 064 529 5863 or call to arrange collection from Benoni.
            </p>
            <p>
              We repair MacBook Pro, MacBook Air, iMac, and Mac mini across all generations, from Intel Core i5 models to the latest Apple Silicon M3 machines. If your machine is showing no power, no display, USB-C failure, or persistent shutdowns, contact us via WhatsApp or phone to arrange an assessment.
            </p>
          </div>
        </div>
      </section>

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

      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-8">
            Our Repair Process for Benoni Clients
          </h2>
          <div className="space-y-6">
            {[
              { step: '01', title: 'Collection from Benoni', desc: 'Contact us via WhatsApp or phone. We arrange a collection time from Benoni that suits your schedule.' },
              { step: '02', title: 'Diagnostic Assessment', desc: 'Your MacBook is assessed at board level within 24 hours. We trace the exact fault using diagnostic tools, schematics, and a stereo microscope.' },
              { step: '03', title: 'Written Quote, No Obligation', desc: 'You receive a clear quote with the fault, repair approach, cost, and timeframe. No work begins until you approve.' },
              { step: '04', title: 'Component-level Repair', desc: 'Our technician carries out the repair under microscope, replacing the specific failed component while leaving everything else untouched.' },
              { step: '05', title: 'Quality Check and Return', desc: 'Every repair is tested under load before return. Your MacBook is returned to Benoni with a ZA Support warranty.' },
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

      <section className="py-10 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-10 text-center">
            Component-level Repair vs Board Replacement
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="glass-card p-8 border-[rgba(15,234,122,0.3)]">
              <h3 className="text-[#0FEA7A] text-xl font-bold mb-4">✓ Component-level Repair (Our Preference)</h3>
              <ul className="space-y-3">
                {[
                  'Targets only the specific failed component',
                  'Your original board, data stays put',
                  '60-80% cheaper than board replacement',
                  'Preserves Touch ID and Secure Enclave pairing',
                  'Backed by ZA Support warranty',
                  'Typically completed within 48-72 hours',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-[#7A9E98] text-sm">
                    <CheckCircle className="w-4 h-4 text-[#0FEA7A] flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="glass-card p-8">
              <h3 className="text-[#7A9E98] text-xl font-bold mb-4">Board Replacement (When Necessary)</h3>
              <ul className="space-y-3">
                {[
                  'Required only when repair is not technically viable',
                  'Higher cost, full board plus installation',
                  'Touch ID pairing may be affected',
                  'Data migration required if SSD changes',
                  'Still backed by ZA Support warranty',
                  'Used for severe burn damage or multiple failed chips',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-[#7A9E98] text-sm">
                    <span className="w-4 h-4 text-[#7A9E98] flex-shrink-0 mt-0.5">-</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

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
          <p className="text-[#7A9E98] text-xs mt-3">Final price confirmed at diagnostic. You choose whether to proceed once you have the quote.</p>
          <PricingRange page="/logic-board-repair/benoni" />
          <PricingNote variant="inline" />
        </div>
      </section>

      <section className="py-10 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQAccordion items={faqs} title="Logic Board Repair Benoni, Common Questions" />
        </div>
      </section>

      <section className="py-8 sm:py-16 bg-[#111C1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#E8F4F1] mb-6">We Also Serve These Areas</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { label: "Boksburg", href: "/logic-board-repair/boksburg" },
              { label: "Edenvale", href: "/logic-board-repair/edenvale" },
              { label: "Springs", href: "/logic-board-repair/springs" },
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
            <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3">Benoni MacBook Fault? Assessment.</h2>
            <p className="text-[#7A9E98] mb-6">We collect from Benoni. Assessment. 12-month warranty. Hyde Park workshop.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={buildWhatsAppUrl('LBR-BENONI', 'logic-board')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 transition-all">
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
