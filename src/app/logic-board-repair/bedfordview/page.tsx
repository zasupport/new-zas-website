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
  title: 'MacBook Logic Board Repair Bedfordview | ZA Support Hyde Park',
  description:
    'MacBook logic board repair for Bedfordview residents. Component-level repair, board diagnostics, assessment. We collect from Bedfordview and repair at our Hyde Park workshop. Call 064 529 5863.',
  alternates: { canonical: 'https://zasupport.com/logic-board-repair/bedfordview' },
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
  { question: 'Do you collect MacBooks from Bedfordview?', answer: 'Yes. We collect from across Bedfordview, including residential streets off Van Buuren Road, the office parks along the Eastern Service Road, and the commercial belt around Bedford Centre and Bedford Square. Our driver routes via the M1 and N3, so collection windows in Bedfordview are usually within 30 minutes of a confirmed booking. Message us on wa.me/27645295863 with your address and we will schedule a pickup.' },
  { question: 'How far is Bedfordview from your Hyde Park workshop?', answer: 'Roughly 20 to 25 minutes depending on traffic on the M1 south and the N3 split. Off-peak, mid-morning or after the school run, the trip is closer to 20 minutes. During Sandton\'s afternoon rush we plan for 30 to 35 minutes. We schedule Bedfordview collections around those windows so your MacBook reaches the bench the same day.' },
  { question: 'What is the difference between component-level repair and a board replacement?', answer: 'A board replacement swaps the entire logic board for a new assembly, which on a modern MacBook can cost as much as a replacement laptop because the SSD, CPU and RAM are soldered to that board. Component-level repair, which is what we do at our Hyde Park workshop, identifies the specific failed component, a power IC, a charging chip, a resistor, a damaged trace, and replaces only that part. The board, the SSD and your data remain intact, and the repair cost typically lands at a fraction of an Apple board swap.' },
  { question: 'My MacBook shows no power at all. Is that repairable?', answer: 'In most cases, yes. No-power MacBooks from Bedfordview most commonly arrive after a storm-related surge or an undisclosed liquid event. On the bench we measure current draw on the DC supply, identify whether the fault is on the input rail, the SMC subsystem, or one of the downstream PMIC stages, and quote from there. The majority of no-power boards we receive can be brought back to life through targeted component replacement, we will only tell you a board is unrepairable once we have actually proven it.' },
  { question: 'How long will the repair take?', answer: 'Most Bedfordview repairs are completed within 48 to 72 hours of the machine arriving in Hyde Park. Straightforward charging-port or power IC work can be returned the next business day. Liquid damage repairs, which need an ultrasonic clean, full board inspection under the microscope, and staged testing, generally take three to five working days. We will give you a realistic timeline as soon as the diagnostic is finished, before any soldering begins.' },
  { question: 'What is the assessment fee?', answer: 'Our assessment fee applies. That covers collection from Bedfordview, the structured diagnostic at our Hyde Park bench, visual inspection, current-draw analysis, signal tracing where required, and a written quote for the repair. If you proceed with the repair the assessment fee is credited against the final invoice. If you choose not to proceed, we return the MacBook in the condition it arrived.' },
  { question: 'Do you offer an Assessment guarantee?', answer: 'Yes. The assessment for Bedfordview clients includes collection, diagnostic work and a written quote. We will not begin any soldering or component-level work until you have seen and approved the quote. The assessment fee is credited toward the repair cost if you go ahead, so in practice it functions as a deposit rather than an additional charge.' },
  { question: 'Which MacBook models do you repair for Bedfordview clients?', answer: 'Every MacBook generation currently in circulation around Bedfordview\'s homes and offices, Intel-era MacBook Pro and MacBook Air from the 2015 Retina models through the Touch Bar generation, the T2 machines, and the Apple Silicon M1, M2 and M3 boards. We also repair iMac and Mac mini logic boards from Bedford Gardens-based design studios and medical practices. If you are unsure whether your model is covered, send the serial number through to wa.me/27645295863 and we will confirm before collection.' },
];

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'MacBook Logic Board Repair Bedfordview',
  description: 'Expert MacBook logic board repair and component-level repair for Bedfordview clients. Collection from Bedfordview, repair at Hyde Park workshop. Assessment.',
  provider: LOCAL_BUSINESS_PROVIDER,
  areaServed: [
    { '@type': 'City', name: 'Johannesburg' },
    { '@type': 'Neighborhood', name: 'Bedfordview' },
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://zasupport.com' },
    { '@type': 'ListItem', position: 2, name: 'Logic Board Repair', item: 'https://zasupport.com/logic-board-repair' },
    { '@type': 'ListItem', position: 3, name: 'Bedfordview', item: 'https://zasupport.com/logic-board-repair/bedfordview' },
  ],
};

const faqSchema = buildFaqSchema(faqs);

export default function LogicBoardRepairBedfordviewPage() {
  return (
    <>
      <SchemaOrg schema={faqSchema} />
      <SchemaOrg schema={serviceSchema} />
      <SchemaOrg schema={breadcrumbSchema} />

      <section className="hero-gradient grid-overlay pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[
            { label: 'Logic Board Repair', href: '/logic-board-repair' },
            { label: 'Bedfordview' },
          ]} />
          <div className="mt-8 max-w-4xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#E8F4F1] leading-tight mb-6">
              Logic Board Repair Bedfordview, Johannesburg
              <br /><span className="text-[#0FEA7A]">, MacBook Specialists</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-4 max-w-3xl leading-relaxed">
              Bedfordview MacBook logic board repair, handled by our Hyde Park component-level workshop roughly 20 minutes west along the M1. We collect from homes off Van Buuren Road, offices around Bedford Centre, and businesses on the Eastern Service Road, then return your machine once every fault has been traced and tested. Assessment.
            </p>
            <div className="flex items-center gap-2 text-[#7A9E98] text-sm mb-8">
              <MapPin className="w-4 h-4 text-[#0FEA7A]" />
              <span>We collect from Bedfordview and repair at our Hyde Park workshop, approx. 25 min drive</span>
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
              <a href={buildWhatsAppUrl('LBR-BEDFORDV', 'logic-board')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 hover:shadow-[0_0_32px_rgba(15,234,122,0.4)] transition-all">
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
            Logic Board Repair for Bedfordview Residents and Businesses
          </h2>
          <div className="space-y-4 text-[#7A9E98] leading-relaxed">
            <p>
              Bedfordview sits on the ridge above the N3 and N12 interchange, and the pattern of MacBook faults we see here reflects that mix of hillside homes and busy commercial nodes around Bedford Centre and Eastgate. Logic board failures from this suburb tend to cluster around three symptoms: a MacBook that simply refuses to power on after a Highveld lightning storm rolled across the East Rand, charging ports that have stopped negotiating with USB-C cables, and intermittent shutdowns that began after a small liquid spill went unmentioned. We trace each of these at chip level rather than swapping the whole board, which is usually the difference between a workable repair quote and an Apple replacement figure that approaches the cost of a new machine.
            </p>
            <p>
              Our Hyde Park bench runs hot-air rework stations, a Mantis stereo microscope, programmable DC supplies for current-draw analysis, and the schematics and boardview files needed to follow signals across the PCB. For Bedfordview clients we have repaired MacBooks belonging to attorneys with offices near Bedford Square, medical practitioners working out of the consulting suites around Bedford Gardens Hospital, and a steady stream of residents from the townhouse complexes off Hawley Road and Boeing Road East. The consistent pattern we find in Bedfordview is corporate-owned machines that cannot wait a fortnight for an Apple service centre turnaround, which is why same-week return is the norm rather than the exception.
            </p>
            <p>
              Collection runs into Bedfordview leave Hyde Park most weekdays via the M1 south and the N3, and we can usually be at a Bedfordview address within 30 minutes of confirming a booking. Once the MacBook is on the bench we begin with a structured diagnostic, visual inspection under the microscope, then current-draw testing, then signal tracing, and we send through a written quote before any soldering work begins. If you are anywhere in Bedfordview, Bedford Gardens, Senderwood, or the slopes down toward Kensington and Cyrildene, reach us on 064 529 5863 or via wa.me/27645295863 to arrange collection.
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
            Our Repair Process for Bedfordview Clients
          </h2>
          <div className="space-y-6">
            {[
              { step: '01', title: 'Collection from Bedfordview', desc: 'Contact us via WhatsApp or phone. We arrange a collection time from Bedfordview that suits your schedule.' },
              { step: '02', title: 'Diagnostic Assessment', desc: 'Your MacBook is assessed at board level within 24 hours. We trace the exact fault using diagnostic tools, schematics, and a stereo microscope.' },
              { step: '03', title: 'Written Quote, No Obligation', desc: 'You receive a clear quote with the fault, repair approach, cost, and timeframe. No work begins until you approve.' },
              { step: '04', title: 'Component-level Repair', desc: 'Our technician carries out the repair under microscope, replacing the specific failed component while leaving everything else untouched.' },
              { step: '05', title: 'Quality Check and Return', desc: 'Every repair is tested under load before return. Your MacBook is returned to Bedfordview with a ZA Support warranty.' },
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
          <PricingRange page="/logic-board-repair/bedfordview" />
          <PricingNote variant="inline" />
        </div>
      </section>

      <section className="py-10 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQAccordion items={faqs} title="Logic Board Repair Bedfordview, Common Questions" />
        </div>
      </section>

      <section className="py-8 sm:py-16 bg-[#111C1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#E8F4F1] mb-6">We Also Serve These Areas</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { label: "Edenvale", href: "/logic-board-repair/edenvale" },
              { label: "Germiston", href: "/logic-board-repair/germiston" },
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
            <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3">Bedfordview MacBook Fault? Assessment.</h2>
            <p className="text-[#7A9E98] mb-6">We collect from Bedfordview. Assessment. 12-month warranty. Hyde Park workshop.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={buildWhatsAppUrl('LBR-BEDFORDV', 'logic-board')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 transition-all">
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
