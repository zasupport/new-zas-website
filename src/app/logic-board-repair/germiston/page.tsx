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
  title: 'MacBook Logic Board Repair Germiston | ZA Support Hyde Park',
  description:
    'MacBook logic board repair for Germiston residents. Component-level repair, board diagnostics, assessment from R599. We collect from Germiston and repair at our Hyde Park workshop. Call 064 529 5863.',
  alternates: { canonical: 'https://zasupport.com/logic-board-repair/germiston' },
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
  { question: 'Do you collect MacBooks from Germiston?', answer: 'Yes. We collect from across Germiston — including the CBD around President Street, Lambton, Primrose, Klippoortje, Wadeville, and the industrial belt near Refinery Road and Heidelberg Road. Collection is arranged via WhatsApp on 064 529 5863, usually for the next working day. The courier brings packaging if required and the machine is taken directly to our Hyde Park workshop.' },
  { question: 'How far is Germiston from your Hyde Park workshop?', answer: 'Germiston sits roughly 30 minutes from Hyde Park outside peak traffic, travelling up the M2 and across to the M1 north. During morning peak it can stretch to 45 minutes, which is why we schedule most collections mid-morning or early afternoon. The distance does not affect repair turnaround — once the board is on the bench, the diagnostic and repair timeline is the same as for a walk-in client.' },
  { question: 'What is the difference between component-level repair and a board replacement?', answer: 'A board replacement swaps the entire logic board for a new one, which is expensive and means you lose anything stored on the soldered SSD. Component-level repair identifies the single failed part — often a power IC, a charging chip, a blown filter, or a corroded trace — and replaces only that component. For Germiston clients the cost difference is significant, and the original SSD with all your data stays in place.' },
  { question: 'My MacBook shows no power at all. Is that repairable?', answer: 'In most cases yes. Complete no-power faults usually trace back to a damaged power management IC, a shorted capacitor on the main power rail, or a failed SMC. We see this pattern often from Germiston clients whose machines were exposed to a power surge — common on the older industrial grid around Wadeville and Knights. The board comes in, we diagnose under microscope, and we quote before any repair work begins.' },
  { question: 'How long will the repair take?', answer: 'Most logic board repairs are completed within 48 to 72 hours from when the board reaches our Hyde Park workshop. Complex faults involving multiple damaged components, or repairs that require waiting for a specific IC to arrive, can take 5 to 7 working days. We give Germiston clients a realistic timeline at the point of quotation, not an optimistic guess.' },
  { question: 'What is the assessment fee?', answer: 'Assessment is from R599. This covers the structured diagnostic under microscope, voltage rail testing, and a written quotation explaining exactly which component has failed and what the repair will cost. If you approve the repair, the assessment fee is applied toward the total. If you decline, the assessment fee covers the diagnostic work already completed.' },
  { question: 'Do you offer a From R599 assessment guarantee?', answer: 'Yes. Assessment starts from R599 and includes a proper component-level diagnostic, not a surface check. For Germiston clients this means you receive a clear written explanation of the fault before committing to any repair spend. More involved diagnostics — particularly on machines with multiple symptoms or liquid damage — may carry a higher assessment fee, which we confirm before starting.' },
  { question: 'Which MacBook models do you repair for Germiston clients?', answer: 'We repair the full MacBook Pro and MacBook Air range from 2012 onwards, including all Intel models and the Apple Silicon M1, M2, and M3 generations. We also handle iMac and Mac mini logic boards. Whether you are running an older Intel machine in a Lambton home office or a newer M2 Air used across Wadeville warehouse sites, the board can come to Hyde Park for assessment.' },
];

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'MacBook Logic Board Repair Germiston',
  description: 'Expert MacBook logic board repair and component-level repair for Germiston clients. Collection from Germiston, repair at Hyde Park workshop. Assessment from R599.',
  provider: LOCAL_BUSINESS_PROVIDER,
  areaServed: [
    { '@type': 'City', name: 'Johannesburg' },
    { '@type': 'Neighborhood', name: 'Germiston' },
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://zasupport.com' },
    { '@type': 'ListItem', position: 2, name: 'Logic Board Repair', item: 'https://zasupport.com/logic-board-repair' },
    { '@type': 'ListItem', position: 3, name: 'Germiston', item: 'https://zasupport.com/logic-board-repair/germiston' },
  ],
};

const faqSchema = buildFaqSchema(faqs);

export default function LogicBoardRepairGermistonPage() {
  return (
    <>
      <SchemaOrg schema={faqSchema} />
      <SchemaOrg schema={serviceSchema} />
      <SchemaOrg schema={breadcrumbSchema} />

      <section className="hero-gradient grid-overlay pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[
            { label: 'Logic Board Repair', href: '/logic-board-repair' },
            { label: 'Germiston' },
          ]} />
          <div className="mt-8 max-w-4xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#E8F4F1] leading-tight mb-6">
              Logic Board Repair Germiston, Johannesburg
              <br /><span className="text-[#0FEA7A]">— MacBook Specialists</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-4 max-w-3xl leading-relaxed">
              Germiston is one of Gauteng&apos;s busiest industrial and logistics hubs, and we collect failed MacBooks from across the area — from the CBD around President Street through to Lambton, Primrose, and the warehousing corridors near Heidelberg Road. Our Hyde Park component-level workshop sits roughly 30 minutes north up the M2 and M1. Logic board assessment from R599.
            </p>
            <div className="flex items-center gap-2 text-[#7A9E98] text-sm mb-8">
              <MapPin className="w-4 h-4 text-[#0FEA7A]" />
              <span>We collect from Germiston and repair at our Hyde Park workshop, approx. 30 min drive</span>
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
              <a href={buildWhatsAppUrl('LBR-GERMISTO', 'logic-board')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 hover:shadow-[0_0_32px_rgba(15,234,122,0.4)] transition-all">
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
            Logic Board Repair for Germiston Residents and Businesses
          </h2>
          <div className="space-y-4 text-[#7A9E98] leading-relaxed">
            <p>
              Germiston has a distinctive client mix — logistics operators near City Deep and the rail yards, manufacturing managers around Wadeville and Knights, small accounting and legal practices along Meyer Street, and residents in Lambton, Klippoortje, and Primrose who run MacBooks for everything from school admin to remote contracting. The fault patterns we see here are shaped by that mix. Logistics and warehouse clients often bring in MacBooks that have travelled extensively in vehicles, exposed to vibration and the occasional spilled coffee in a truck cab. The result is usually USB-C charging port failure, intermittent boot, or a board that simply will not respond to the power button. We have also collected machines from Germiston Lake-side homes where a power surge took out the SMC controller, and from offices off Refinery Road where ageing battery cells leaked and damaged the surrounding ICs.
            </p>
            <p>
              Every Germiston logic board that reaches our Hyde Park bench is examined under a stereo microscope before any work begins. We measure voltage rails, check for short circuits on the PPBUS line, inspect the U-series power management ICs, and trace the fault to a specific component rather than guessing. Component-level repair means we can replace a single damaged chip, re-flow a charging IC, or rebuild a corroded section of the board — without the cost of a full board swap. For Germiston-based small businesses and accounting practices that cannot afford a week of downtime, this matters. We have returned MacBooks to clients off Driehoek and the N3 service road inside 72 hours, with the original SSD and data intact.
            </p>
            <p>
              Collection from Germiston runs along the M2 corridor and we coordinate timing so the courier arrives during your working day, whether you are at a Wadeville warehouse, a Bedfordview-border office, or a home in Lambton. Once the repair is complete and the board has passed a full burn-in test, the machine is returned to the same address. If you are unsure whether your symptom is a logic board fault or something simpler like a battery or display issue, send us a WhatsApp on 064 529 5863 with a short description and we will tell you honestly — sometimes the fix is not a board repair at all.
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
            Our Repair Process for Germiston Clients
          </h2>
          <div className="space-y-6">
            {[
              { step: '01', title: 'Collection from Germiston', desc: 'Contact us via WhatsApp or phone. We arrange a collection time from Germiston that suits your schedule.' },
              { step: '02', title: 'Diagnostic Assessment', desc: 'Your MacBook is assessed at board level within 24 hours. We trace the exact fault using diagnostic tools, schematics, and a stereo microscope.' },
              { step: '03', title: 'Written Quote, No Obligation', desc: 'You receive a clear quote with the fault, repair approach, cost, and timeframe. No work begins until you approve.' },
              { step: '04', title: 'Component-level Repair', desc: 'Our technician carries out the repair under microscope, replacing the specific failed component while leaving everything else untouched.' },
              { step: '05', title: 'Quality Check and Return', desc: 'Every repair is tested under load before return. Your MacBook is returned to Germiston with a ZA Support warranty.' },
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
          <PricingRange page="/logic-board-repair/germiston" />
          <PricingNote variant="inline" />
        </div>
      </section>

      <section className="py-10 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQAccordion items={faqs} title="Logic Board Repair Germiston — Common Questions" />
        </div>
      </section>

      <section className="py-8 sm:py-16 bg-[#111C1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#E8F4F1] mb-6">We Also Serve These Areas</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { label: "Edenvale", href: "/logic-board-repair/edenvale" },
              { label: "Alberton", href: "/logic-board-repair/alberton" },
              { label: "Boksburg", href: "/logic-board-repair/boksburg" },
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
            <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3">Germiston MacBook Fault? Assessment from R599.</h2>
            <p className="text-[#7A9E98] mb-6">We collect from Germiston. Assessment from R599. 12-month warranty. Hyde Park workshop.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={buildWhatsAppUrl('LBR-GERMISTO', 'logic-board')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 transition-all">
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
