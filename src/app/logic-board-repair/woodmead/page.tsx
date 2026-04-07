import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, ArrowRight, Cpu, Zap, AlertTriangle, CheckCircle, MapPin } from 'lucide-react';
import SchemaOrg from '@/components/seo/SchemaOrg';
import { buildFaqSchema, LOCAL_BUSINESS_PROVIDER } from '@/lib/schema';
import FAQAccordion from '@/components/ui/FAQ';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { CONTACT, buildWhatsAppUrl} from '@/lib/constants';

export const metadata: Metadata = {
  title: 'MacBook Logic Board Repair Woodmead | ZA Support Hyde Park',
  description:
    'MacBook logic board repair for Woodmead residents. Component-level repair, board diagnostics, assessment from R599. We collect from Woodmead and repair at our Hyde Park workshop. Call 064 529 5863.',
  alternates: { canonical: 'https://zasupport.com/logic-board-repair/woodmead' },
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
  { item: 'Diagnostic Assessment', note: 'Full board-level inspection, no obligation' },
  { item: 'USB-C / Thunderbolt Repair', note: 'Port board or controller chip replacement' },
  { item: 'Power Circuit Repair', note: 'No-power diagnosis and board-level fix' },
  { item: 'Component-level Repair', note: 'Component-level board repair under microscope' },
  { item: 'GPU Repair / Reballing', note: 'Discrete GPU only, Intel Mac models' },
  { item: 'Logic Board Replacement', note: 'Where component repair is not feasible' },
];

const faqs = [
  {
    question: 'Do you collect MacBooks from Woodmead?',
    answer: 'Yes. We offer a collection and return service for Woodmead clients. Your MacBook is collected from your home or office in Woodmead, repaired at our Hyde Park workshop approximately 18 minutes away, and returned once the repair is complete. Contact us on WhatsApp or by phone to arrange a collection time.',
  },
  {
    question: 'How far is Woodmead from your Hyde Park workshop?',
    answer: 'Our workshop at 1 Hyde Park Lane is approximately 16 km from Woodmead, roughly a 18-minute drive. Many clients drop their MacBook in on their way through and collect once the repair is complete. We are open Monday to Thursday 08:00–17:00 and Friday 08:00–16:30.',
  },
  {
    question: 'What is the difference between component-level repair and a board replacement?',
    answer: 'Component-level repair targets the specific failed component on your existing board using a microscope and precision soldering station. Board replacement swaps the entire logic board. Component-level repair preserves your original board, keeps your data in place, and typically costs 60–80% less than a full board replacement.',
  },
  {
    question: 'My MacBook shows no power at all. Is that repairable?',
    answer: 'In the majority of cases, yes. A completely unresponsive MacBook is one of the most common repairs we handle. The fault is very often a single blown fuse, failed MOSFET, or damaged charging IC — a straightforward component-level repair. Bring it in or request a collection from Woodmead for an assessment.',
  },
  {
    question: 'How long will the repair take?',
    answer: 'Diagnostic assessment within 24 hours. Simple repairs such as USB-C ports and power circuit faults are typically done within 48–72 hours. Complex faults can take 3–5 business days. You will receive a clear timeframe with your repair quote before any work begins.',
  },
  {
    question: 'What is the assessment fee?',
    answer: 'The assessment is from R599. This covers a full board-level inspection, fault identification, and a written quote. No repair work proceeds without your approval.',
  },
  {
    question: 'Do you offer a No Fix No Fee guarantee?',
    answer: 'Yes. If we cannot repair your MacBook, you only pay the assessment fee. We will not charge for repair work that does not succeed.',
  },
  {
    question: 'Which MacBook models do you repair for Woodmead clients?',
    answer: 'All MacBook Pro, MacBook Air, iMac, and Mac mini models across all generations — Intel and Apple Silicon (M1, M2, M3). We have schematics and components for every generation from 2012 to present.',
  },
];

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'MacBook Logic Board Repair Woodmead',
  description: 'Expert MacBook logic board repair and component-level repair for Woodmead clients. Collection from Woodmead, repair at Hyde Park workshop. Assessment from R599.',
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
              <br /><span className="text-[#0FEA7A]">— MacBook Specialists</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-4 max-w-3xl leading-relaxed">
              Woodmead&apos;s preferred MacBook logic board repair service. We collect from Woodmead and repair at our Hyde Park component-level workshop, approximately 18 minutes away. Assessment from R599.
            </p>
            <div className="flex items-center gap-2 text-[#7A9E98] text-sm mb-8">
              <MapPin className="w-4 h-4 text-[#0FEA7A]" />
              <span>We collect from Woodmead and repair at our Hyde Park workshop, approx. 18 min drive</span>
            </div>
            <div className="flex flex-wrap gap-4 mb-8">
              {[
                { icon: Cpu, label: 'Microscope Component-level Repair' },
                { icon: Zap, label: 'Assessment from R599' },
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
              We have been repairing MacBook logic boards for office-park businesses and corporate teams in Woodmead Estate for several years. When a logic board fails, the machine shows symptoms ranging from complete power loss to intermittent shutdowns, no display, USB-C charging failure, or erratic fan behaviour. These faults are almost always board-level and, in the majority of cases, repairable at component level without replacing the entire board.
            </p>
            <p>
              Our Hyde Park workshop is equipped with professional hot-air rework stations, precision soldering equipment, a high-magnification stereo microscope, and the diagnostic tools required to trace faults at chip level. Every repair begins with a structured diagnostic session. We identify the exact component failure before any soldering takes place.
            </p>
            <p>
              For Woodmead clients, we offer a collection and return service. Your MacBook is collected from Woodmead Office Park, Woodlands Boulevard, and surrounding business estate, repaired at our Hyde Park workshop, and returned to you once the repair is complete and fully tested. Most repairs are completed within 48–72 hours.
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
          <p className="text-[#7A9E98] text-xs mt-3">Final price confirmed at diagnostic. Assessment from R599 with no obligation to proceed.</p>
        </div>
      </section>

      <section className="py-10 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQAccordion items={faqs} title="Logic Board Repair Woodmead — Common Questions" />
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
            <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3">Woodmead MacBook Fault? Assessment from R599.</h2>
            <p className="text-[#7A9E98] mb-6">We collect from Woodmead. Assessment from R599. 12-month warranty. Hyde Park workshop.</p>
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
