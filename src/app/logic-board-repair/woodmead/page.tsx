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
  title: 'MacBook Logic Board Repair Woodmead | ZA Support Hyde Park',
  description:
    'MacBook logic board repair for Woodmead residents. Component-level repair, board diagnostics, assessment. We collect from Woodmead and repair at our Hyde Park workshop. Call 064 529 5863.',
  alternates: { canonical: 'https://zasupport.com/logic-board-repair/woodmead' },
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
  { question: 'Do you collect MacBooks from Woodmead?', answer: 'Yes. We collect from offices along Woodmead Drive, Waterfall Edge, Western Service Road, and homes in Woodmead Estate. Most collections from Woodmead are arranged within one working day, WhatsApp 064 529 5863 with the building name and a contact number and we will confirm a slot.' },
  { question: 'How far is Woodmead from your Hyde Park workshop?', answer: 'Woodmead is roughly 18 minutes from our Hyde Park workshop via the M1 south, depending on traffic around the Marlboro and Grayston interchanges. Our driver runs the route daily, so collection and return slots tend to fit easily into a morning or afternoon round.' },
  { question: 'What is the difference between component-level repair and a board replacement?', answer: 'Component-level repair means we trace the actual failed part on the logic board, a power IC, a capacitor, a blown filter, a damaged USB-C port, and replace only that component under the microscope. Board replacement means swapping the entire logic board for a new or reclaimed unit, which Apple typically does and which carries the price of the whole assembly. For Woodmead corporate clients with out-of-warranty machines, component-level work is almost always the lower-cost and faster route.' },
  { question: 'My MacBook shows no power at all. Is that repairable?', answer: 'In most cases, yes. Complete no-power on Apple Silicon and Intel MacBooks usually traces back to a shorted power rail, a failed SMC or PMIC, or a damaged USB-C power delivery circuit, all of which are recoverable at component level. We see this regularly on machines from Woodmead offices that have been hit by a power surge or a faulty third-party charger. Assessment confirms whether the board is economically repairable before any work is committed.' },
  { question: 'How long will the repair take?', answer: 'Most logic board repairs are completed within 3 to 5 working days from collection, including the 24-hour burn-in test we run before returning the machine. Liquid damage and multi-fault boards can take longer if specialist components need to be ordered. For Woodmead clients on tight deadlines we can prioritise urgent corporate work, let us know on collection and we will flag it on the bench.' },
  { question: 'What is the assessment fee?', answer: 'An assessment fee applies. That covers the structured diagnostic, power-rail measurement, thermal imaging, schematic-level fault tracing, and a written quote for the repair before any work proceeds. If you choose to go ahead, the assessment fee is included in the repair quote.' },
  { question: 'Do you offer an Assessment guarantee?', answer: 'Yes. We charge an assessment fee for the diagnostic and provide a clear written quote before any repair work starts. You decide whether to proceed once you have the quote, there is no obligation to repair if the cost does not make sense for the machine\'s age or value.' },
  { question: 'Which MacBook models do you repair for Woodmead clients?', answer: 'We repair the full MacBook Pro and MacBook Air range from Intel Core i5 and i7 generations through to Apple Silicon M1, M2, and M3 variants, as well as iMac and Mac mini boards. The 13-inch and 16-inch MacBook Pro models we see most often from Woodmead corporate users are well within our regular workload.' },
];

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'MacBook Logic Board Repair Woodmead',
  description: 'Expert MacBook logic board repair and component-level repair for Woodmead clients. Collection from Woodmead, repair at Hyde Park workshop. Assessment.',
  provider: LOCAL_BUSINESS_PROVIDER,
  areaServed: [
    { '@type': 'City', name: 'Johannesburg' },
    { '@type': 'Neighborhood', name: 'Woodmead' },
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://zasupport.com' },
    { '@type': 'ListItem', position: 2, name: 'Logic Board Repair', item: 'https://zasupport.com/logic-board-repair' },
    { '@type': 'ListItem', position: 3, name: 'Woodmead', item: 'https://zasupport.com/logic-board-repair/woodmead' },
  ],
};

const faqSchema = buildFaqSchema(faqs);

export default function LogicBoardRepairWoodmeadPage() {
  return (
    <>
      <SchemaOrg schema={faqSchema} />
      <SchemaOrg schema={serviceSchema} />
      <SchemaOrg schema={breadcrumbSchema} />

      <section className="hero-gradient grid-overlay pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[
            { label: 'Logic Board Repair', href: '/logic-board-repair' },
            { label: 'Woodmead' },
          ]} />
          <div className="mt-8 max-w-4xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#E8F4F1] leading-tight mb-6">
              Logic Board Repair Woodmead, Johannesburg
              <br /><span className="text-[#0FEA7A]">, MacBook Specialists</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-4 max-w-3xl leading-relaxed">
              Woodmead sits at the junction of the N1 and N3, and we collect MacBooks from the office parks along Waterfall Edge, Woodmead Drive, and Western Service Road for component-level logic board repair at our Hyde Park workshop, roughly 18 minutes south down the M1. Assessment, with most board-level diagnostics completed within 48 hours of collection.
            </p>
            <div className="flex items-center gap-2 text-[#7A9E98] text-sm mb-8">
              <MapPin className="w-4 h-4 text-[#0FEA7A]" />
              <span>We collect from Woodmead and repair at our Hyde Park workshop, approx. 18 min drive</span>
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
              <a href={buildWhatsAppUrl('LBR-WOODMEAD', 'logic-board')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 hover:shadow-[0_0_32px_rgba(15,234,122,0.4)] transition-all">
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
            Logic Board Repair for Woodmead Residents and Businesses
          </h2>
          <div className="space-y-4 text-[#7A9E98] leading-relaxed">
            <p>
              Woodmead&apos;s commercial fabric is heavily weighted towards corporate head offices, IT consultancies, and the cluster of businesses around Woodmead Retail Park and Woodmead Office Park on Waterfall Edge. The MacBooks we collect from this suburb tend to belong to finance teams, software developers, and account managers, machines that travel between home offices in Sunninghill, client sites in Sandton, and the Woodmead boardroom several times a week. That kind of duty cycle stresses the logic board in specific ways: repeated thermal cycling fatigues solder joints around the SMC and PMIC, USB-C ports loosen from constant docking and undocking, and dust ingress from cars, coffee shops, and home offices coats the board&apos;s power rails. By the time a machine reaches us, the symptoms are rarely random, they fit patterns we have catalogued over thousands of repairs.
            </p>
            <p>
              At our Hyde Park bench we work under a stereo microscope at up to 45x magnification, using hot-air rework stations calibrated for Apple&apos;s lead-free solder profiles and a thermal camera to find shorted rails before any component is removed. A Woodmead client recently brought in a 16-inch MacBook Pro M1 Max that had been left charging overnight during a Joburg thunderstorm, the surge had taken out the USB-C power delivery IC and a downstream capacitor on the 3.3V rail. We isolated the fault to two components, replaced both, verified the rails on the schematic, and returned the machine within four working days. That kind of targeted repair typically lands well below the cost of a full board swap from Apple, which is the only realistic option once a machine is out of warranty.
            </p>
            <p>
              Collection from Woodmead is straightforward, we drive up the M1 to the Woodmead off-ramp and can usually be at your reception within the hour for urgent jobs, or scheduled around a convenient slot for routine collections. We have collected from buildings on Woodlands Drive, the Waterfall Edge Office Park, and homes in Woodmead Estate itself. Once the repair is done and the machine has been on burn-in test for at least 24 hours, we return it the same way. For any MacBook Pro, MacBook Air, iMac, or Mac mini from Intel-era through M3 that has gone dark, refuses to charge, or shuts down under load, send a WhatsApp to 064 529 5863 and we will arrange collection from Woodmead the next working day.
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
            Our Repair Process for Woodmead Clients
          </h2>
          <div className="space-y-6">
            {[
              { step: '01', title: 'Collection from Woodmead', desc: 'Contact us via WhatsApp or phone. We arrange a collection time from Woodmead that suits your schedule.' },
              { step: '02', title: 'Diagnostic Assessment', desc: 'Your MacBook is assessed at board level within 24 hours. We trace the exact fault using diagnostic tools, schematics, and a stereo microscope.' },
              { step: '03', title: 'Written Quote, No Obligation', desc: 'You receive a clear quote with the fault, repair approach, cost, and timeframe. No work begins until you approve.' },
              { step: '04', title: 'Component-level Repair', desc: 'Our technician carries out the repair under microscope, replacing the specific failed component while leaving everything else untouched.' },
              { step: '05', title: 'Quality Check and Return', desc: 'Every repair is tested under load before return. Your MacBook is returned to Woodmead with a ZA Support warranty.' },
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
          <p className="text-[#7A9E98] text-xs mt-3">Final price confirmed at diagnostic. Assessment with to proceed.</p>
          <PricingRange page="/logic-board-repair/woodmead" />
          <PricingNote variant="inline" />
        </div>
      </section>

      <section className="py-10 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQAccordion items={faqs} title="Logic Board Repair Woodmead, Common Questions" />
        </div>
      </section>

      <section className="py-8 sm:py-16 bg-[#111C1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#E8F4F1] mb-6">We Also Serve These Areas</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { label: "Sunninghill", href: "/logic-board-repair/sunninghill" },
              { label: "Paulshof", href: "/logic-board-repair/paulshof" },
              { label: "Midrand", href: "/logic-board-repair/midrand" },
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
            <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3">Woodmead MacBook Fault? Assessment.</h2>
            <p className="text-[#7A9E98] mb-6">We collect from Woodmead. Assessment. 12-month warranty. Hyde Park workshop.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={buildWhatsAppUrl('LBR-WOODMEAD', 'logic-board')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 transition-all">
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
