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
  title: 'MacBook Logic Board Repair Melrose | ZA Support Hyde Park',
  description:
    'MacBook logic board repair for Melrose residents. Component-level repair, board diagnostics, assessment from R599. We collect from Melrose and repair at our Hyde Park workshop. Call 064 529 5863.',
  alternates: { canonical: 'https://zasupport.com/logic-board-repair/melrose' },
};

const faults = [
  { title: 'No Power', desc: 'MacBook shows no signs of life — no fans, no display, no charging LED. Power rail diagnosis and component-level repair under microscope.' },
  { title: 'No Display', desc: 'Machine boots but screen stays black or shows artefacts. GPU failure, backlight fuse, or display driver chip identified and replaced.' },
  { title: 'Liquid Damage', desc: 'Coffee, water, or condensation causes corrosion on board traces and pads. Ultrasonic cleaning followed by targeted component replacement.' },
  { title: 'Overheating / Shutdown', desc: 'Unexpected shutdowns traced to failed voltage regulators, blocked power rails, or thermal sensor faults on the logic board.' },
  { title: 'USB-C / Thunderbolt Failure', desc: 'No charging, no data, or no external display on USB-C ports. Retimer chip or port board replaced at component level.' },
  { title: 'Fan Running at Full Speed', desc: 'SMC fault or failed thermal sensor causes fans to run continuously at maximum. Board-level diagnosis and SMC component repair.' },
  { title: 'GPU / Display Artefacts', desc: 'Garbled lines, flickering, or partial display failure. Discrete GPU reballing or replacement on affected Intel models.' },
  { title: 'Persistent Kernel Panics', desc: 'Crash logs pointing to logic board faults — failing RAM pads, storage controller, or power management ICs identified and repaired.' },
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
  { question: 'Do you collect MacBooks from Melrose?', answer: 'Yes. We collect across Melrose Arch, Melrose North, Melrose Estate, and the practices along Athol Street and Corlett Drive. Because the run from Hyde Park is short, we can usually arrange same-day collection if you call before midday on 064 529 5863.' },
  { question: 'How far is Melrose from your Hyde Park workshop?', answer: 'Approximately 8 minutes by car, depending on which side of Melrose you are on. From Melrose Arch we take Corlett Drive and Glenhove Road; from Melrose North it is a short trip across Athol Oaklands. Traffic on the M1 rarely affects this route since we stay on suburban roads.' },
  { question: 'What is the difference between component-level repair and a board replacement?', answer: 'Component-level repair means we isolate the specific failed part on the existing logic board — a power management IC, a MOSFET, a capacitor, a backlight fuse, or a Thunderbolt retimer — and replace only that component. A board replacement swaps the entire logic board for another unit, which is usually 4 to 8 times more expensive and ties your data and Touch ID to a different board. For most Melrose clients we recommend component-level repair where the fault allows it.' },
  { question: 'My MacBook shows no power at all. Is that repairable?', answer: 'In most cases, yes. A completely dead MacBook usually points to a short on one of the power rails or a failed PMIC, both of which we diagnose under the microscope and repair at component level. We have brought back several apparently dead machines from Melrose practices where the fault turned out to be a single shorted capacitor on the 3V3 line. Assessment from R599 confirms the fault before any repair is quoted.' },
  { question: 'How long will the repair take?', answer: 'Most logic board repairs for Melrose clients are completed within 48 to 72 hours once the machine is on the bench. Straightforward power faults often turn around inside a day. More involved work — for example liquid damage that has spread across multiple rails, or a CPU/SoC reball — can take 4 to 7 working days because we test under load for an extended period before returning the machine.' },
  { question: 'What is the assessment fee?', answer: 'Assessment is from R599. That covers the full diagnostic process: visual inspection under the microscope, electrical testing of the power rails, schematic-level fault tracing, and a written quote for the repair. If you go ahead with the repair, the assessment fee is included in the repair cost rather than charged on top.' },
  { question: 'Do you offer a From R599 assessment guarantee?', answer: 'Yes. The R599 assessment is the entry point for every logic board job from Melrose. Before we touch anything, you receive a clear written quote with the diagnosed fault and the repair cost. If you decide not to proceed, you pay only the assessment fee and the machine is returned to you in the same condition we received it.' },
  { question: 'Which MacBook models do you repair for Melrose clients?', answer: 'All current and recent MacBook models — MacBook Pro and MacBook Air from the Intel era (2015 onward) through to the Apple Silicon M1, M2, and M3 machines, plus iMac and Mac mini logic boards. We also handle Touch Bar Pros and the 16-inch Pros that are common with the creative studios in Melrose Arch. If you are unsure whether your model is supported, send the serial number via WhatsApp on wa.me/27645295863 and we will confirm before collection.' },
];

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'MacBook Logic Board Repair Melrose',
  description: 'Expert MacBook logic board repair and component-level repair for Melrose clients. Collection from Melrose, repair at Hyde Park workshop. Assessment from R599.',
  provider: LOCAL_BUSINESS_PROVIDER,
  areaServed: [
    { '@type': 'City', name: 'Johannesburg' },
    { '@type': 'Neighborhood', name: 'Melrose' },
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://zasupport.com' },
    { '@type': 'ListItem', position: 2, name: 'Logic Board Repair', item: 'https://zasupport.com/logic-board-repair' },
    { '@type': 'ListItem', position: 3, name: 'Melrose', item: 'https://zasupport.com/logic-board-repair/melrose' },
  ],
};

const faqSchema = buildFaqSchema(faqs);

export default function LogicBoardRepairMelrosePage() {
  return (
    <>
      <SchemaOrg schema={faqSchema} />
      <SchemaOrg schema={serviceSchema} />
      <SchemaOrg schema={breadcrumbSchema} />

      <section className="hero-gradient grid-overlay pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[
            { label: 'Logic Board Repair', href: '/logic-board-repair' },
            { label: 'Melrose' },
          ]} />
          <div className="mt-8 max-w-4xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#E8F4F1] leading-tight mb-6">
              Logic Board Repair Melrose, Johannesburg
              <br /><span className="text-[#0FEA7A]">— MacBook Specialists</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-4 max-w-3xl leading-relaxed">
              Melrose sits roughly 8 minutes from our Hyde Park workshop along Athol Oaklands and Corlett Drive, which makes us the closest component-level MacBook logic board repair option for the precinct. We collect from Melrose Arch, Melrose North, and the medical and boutique strips along Athol Street, then return the machine once the board is properly tested. Assessment from R599.
            </p>
            <div className="flex items-center gap-2 text-[#7A9E98] text-sm mb-8">
              <MapPin className="w-4 h-4 text-[#0FEA7A]" />
              <span>We collect from Melrose and repair at our Hyde Park workshop, approx. 8 min drive</span>
            </div>
            <div className="flex flex-wrap gap-4 mb-8">
              {[
                { icon: Cpu, label: 'Microscope Component-level Repair' },
                { icon: Zap, label: 'Assessment from R599' },
                { icon: CheckCircle, label: 'From R599 assessment' },
                { icon: AlertTriangle, label: '12-Month Warranty' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 bg-[rgba(15,234,122,0.08)] border border-[rgba(15,234,122,0.15)] px-4 py-2 rounded-full">
                  <Icon className="w-4 h-4 text-[#0FEA7A]" />
                  <span className="text-[#E8F4F1] text-sm font-medium">{label}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href={buildWhatsAppUrl('LBR-MELROSE', 'logic-board')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 hover:shadow-[0_0_32px_rgba(15,234,122,0.4)] transition-all">
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
            Logic Board Repair for Melrose Residents and Businesses
          </h2>
          <div className="space-y-4 text-[#7A9E98] leading-relaxed">
            <p>
              Melrose has a distinct mix of clients that shapes the work we see — medical practices and specialist consulting rooms around the Melrose Medical Centre, boutique studios and design agencies in Melrose Arch, and a steady residential base in Melrose North and Birdhaven. The logic board faults that come through tend to follow that profile: MacBooks that have travelled between consulting rooms with charger swaps, machines from creative studios that run heavy thermal loads for hours at a time, and home-office Pros that have suffered a wine or coffee spill on a Sunday evening. Symptoms range from a completely dead machine that will not chime, to intermittent shutdowns under load, missing backlight, USB-C ports that refuse to negotiate charging, and erratic fan ramp on what should be an idle desktop.
            </p>
            <p>
              Everything diagnosed in Melrose is repaired at our Hyde Park bench, a short run down Glenhove Road. The workshop runs hot-air rework stations, a fine-tip soldering setup, a stereo microscope for chip-level inspection, and the schematics and boardviews required to trace a fault back to the specific failed component rather than guessing at a board swap. We tell Melrose clients up front whether the fault is a SMC line, a PPBUS short, a backlight circuit, a Thunderbolt retimer, or a CPU/SoC failure — and only the last category genuinely requires a board-level replacement. Most other faults are economically repairable.
            </p>
            <p>
              Collection from Melrose is straightforward: we can fetch from a reception desk at Melrose Arch during business hours, from a medical practice between patients, or from a residential address in Melrose North. The machine goes onto the bench the same day where possible, and most repairs are returned within 48 to 72 hours once the fault is isolated. For Melrose practitioners who need their MacBook back urgently for patient files or billing software, mention the urgency when you call on 064 529 5863 or WhatsApp wa.me/27645295863 and we will prioritise the diagnostic slot.
            </p>
            <p>
              We repair MacBook Pro, MacBook Air, iMac, and Mac mini across all generations — from Intel Core i5 models to the latest Apple Silicon M3 machines. If your machine is showing no power, no display, USB-C failure, or persistent shutdowns, contact us via WhatsApp or phone to arrange an assessment.
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
            Our Repair Process for Melrose Clients
          </h2>
          <div className="space-y-6">
            {[
              { step: '01', title: 'Collection from Melrose', desc: 'Contact us via WhatsApp or phone. We arrange a collection time from Melrose that suits your schedule.' },
              { step: '02', title: 'Diagnostic Assessment', desc: 'Your MacBook is assessed at board level within 24 hours. We trace the exact fault using diagnostic tools, schematics, and a stereo microscope.' },
              { step: '03', title: 'Written Quote, No Obligation', desc: 'You receive a clear quote with the fault, repair approach, cost, and timeframe. No work begins until you approve.' },
              { step: '04', title: 'Component-level Repair', desc: 'Our technician carries out the repair under microscope, replacing the specific failed component while leaving everything else untouched.' },
              { step: '05', title: 'Quality Check and Return', desc: 'Every repair is tested under load before return. Your MacBook is returned to Melrose with a ZA Support warranty.' },
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
                  'Your original board — data stays put',
                  '60–80% cheaper than board replacement',
                  'Preserves Touch ID and Secure Enclave pairing',
                  'Backed by ZA Support warranty',
                  'Typically completed within 48–72 hours',
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
                  'Higher cost — full board plus installation',
                  'Touch ID pairing may be affected',
                  'Data migration required if SSD changes',
                  'Still backed by ZA Support warranty',
                  'Used for severe burn damage or multiple failed chips',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-[#7A9E98] text-sm">
                    <span className="w-4 h-4 text-[#7A9E98] flex-shrink-0 mt-0.5">–</span>
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
          <p className="text-[#7A9E98] text-xs mt-3">Final price confirmed at diagnostic. Assessment from R599 with to proceed.</p>
          <PricingRange page="/logic-board-repair/melrose" />
          <PricingNote variant="inline" />
        </div>
      </section>

      <section className="py-10 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQAccordion items={faqs} title="Logic Board Repair Melrose — Common Questions" />
        </div>
      </section>

      <section className="py-8 sm:py-16 bg-[#111C1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#E8F4F1] mb-6">We Also Serve These Areas</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { label: "Rosebank", href: "/logic-board-repair/rosebank" },
              { label: "Illovo", href: "/logic-board-repair/illovo" },
              { label: "Sandton", href: "/logic-board-repair/sandton" },
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
            <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3">Melrose MacBook Fault? Assessment from R599.</h2>
            <p className="text-[#7A9E98] mb-6">We collect from Melrose. Assessment from R599. 12-month warranty. Hyde Park workshop.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={buildWhatsAppUrl('LBR-MELROSE', 'logic-board')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 transition-all">
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
