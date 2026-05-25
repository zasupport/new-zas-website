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
  title: 'MacBook Logic Board Repair Alberton | ZA Support Hyde Park',
  description:
    'MacBook logic board repair for Alberton residents. Component-level repair, board diagnostics, assessment from R599. We collect from Alberton and repair at our Hyde Park workshop. Call 064 529 5863.',
  alternates: { canonical: 'https://zasupport.com/logic-board-repair/alberton' },
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
  { question: 'Do you collect MacBooks from Alberton?', answer: 'Yes — we collect across Alberton including New Redruth, Brackenhurst, Randhart, Mayberry Park, Meyersdal and Meyersdal Eco Estate. The courier route runs via the N12 and M2 into Hyde Park. Collection is arranged by WhatsApp on 064 529 5863 and your MacBook is tracked door-to-door.' },
  { question: 'How far is Alberton from your Hyde Park workshop?', answer: 'Roughly 35 minutes by road in normal traffic, taking the N12 west and then the M1 north into Hyde Park. From Meyersdal Eco Estate the route is a little quicker via the N3, and from Brackenhurst slightly longer. The collection courier handles the drive so you do not need to make the trip yourself.' },
  { question: 'What is the difference between component-level repair and a board replacement?', answer: 'A board replacement swaps the entire logic board for a new one — this is what Apple and most service centres do, and on current models it routinely runs into tens of thousands of rand. Component-level repair, which is what we do at Hyde Park, identifies the specific failed chip, capacitor, resistor or IC on your existing board and replaces only that part under a microscope. For an Alberton client whose MacBook has a single failed charging IC, the difference is often the price of a coffee versus the price of a new machine.' },
  { question: 'My MacBook shows no power at all. Is that repairable?', answer: 'In the majority of cases, yes. No-power faults usually trace back to a failed power management chip, a shorted capacitor on the main power rail, or a damaged charging IC — all of which are component-level repairs. We see this often from Alberton given the area\'s exposure to surges and brown-outs. The only way to know for certain is a proper diagnostic on the bench, which is what the R599 assessment covers.' },
  { question: 'How long will the repair take?', answer: 'Most logic board repairs are completed within 48 to 96 hours of the MacBook arriving at the Hyde Park workshop. Diagnostics are typically done on day one, parts ordered or pulled from stock on day two, and the repair plus a 24-hour load test follow. For Alberton clients the total turnaround including courier collection and return is generally four to six working days.' },
  { question: 'What is the assessment fee?', answer: 'Assessment is from R599. That fee covers the full bench diagnostic — power sequencing checks, thermal imaging where relevant, microscope inspection and a written report telling you exactly which component has failed and what the repair will cost. If you choose to proceed, the assessment fee is credited against the repair cost.' },
  { question: 'Do you offer a From R599 assessment guarantee?', answer: 'Yes. The R599 fee is the starting point and covers the diagnostic work itself. You receive a written quote before any chargeable repair work begins, so Alberton clients always know the full cost upfront. There are no hidden charges added afterwards — if the repair turns out to be uneconomical, you are told that plainly and only the assessment fee applies.' },
  { question: 'Which MacBook models do you repair for Alberton clients?', answer: 'Every MacBook Pro and MacBook Air generation from the Intel-era Core i5 and i7 models through to the Apple Silicon M1, M2 and M3 machines. We also handle iMac and Mac mini board repairs. If you are unsure whether your model is repairable at component level, send a photo of the bottom case label via WhatsApp to 064 529 5863 and we will confirm before you commit to collection.' },
];

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'MacBook Logic Board Repair Alberton',
  description: 'Expert MacBook logic board repair and component-level repair for Alberton clients. Collection from Alberton, repair at Hyde Park workshop. Assessment from R599.',
  provider: LOCAL_BUSINESS_PROVIDER,
  areaServed: [
    { '@type': 'City', name: 'Johannesburg' },
    { '@type': 'Neighborhood', name: 'Alberton' },
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://zasupport.com' },
    { '@type': 'ListItem', position: 2, name: 'Logic Board Repair', item: 'https://zasupport.com/logic-board-repair' },
    { '@type': 'ListItem', position: 3, name: 'Alberton', item: 'https://zasupport.com/logic-board-repair/alberton' },
  ],
};

const faqSchema = buildFaqSchema(faqs);

export default function LogicBoardRepairAlbertonPage() {
  return (
    <>
      <SchemaOrg schema={faqSchema} />
      <SchemaOrg schema={serviceSchema} />
      <SchemaOrg schema={breadcrumbSchema} />

      <section className="hero-gradient grid-overlay pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[
            { label: 'Logic Board Repair', href: '/logic-board-repair' },
            { label: 'Alberton' },
          ]} />
          <div className="mt-8 max-w-4xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#E8F4F1] leading-tight mb-6">
              Logic Board Repair Alberton, Johannesburg
              <br /><span className="text-[#0FEA7A]">— MacBook Specialists</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-4 max-w-3xl leading-relaxed">
              Alberton MacBook owners — from New Redruth and Brackenhurst through to Meyersdal Eco Estate and Mayberry Park — rely on our Hyde Park component-level workshop for logic board repair. We collect along the N12 and N3 corridors, roughly 35 minutes from Hyde Park, and return your machine fully tested. Assessment from R599.
            </p>
            <div className="flex items-center gap-2 text-[#7A9E98] text-sm mb-8">
              <MapPin className="w-4 h-4 text-[#0FEA7A]" />
              <span>We collect from Alberton and repair at our Hyde Park workshop, approx. 35 min drive</span>
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
              <a href={buildWhatsAppUrl('LBR-ALBERTON', 'logic-board')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 hover:shadow-[0_0_32px_rgba(15,234,122,0.4)] transition-all">
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
            Logic Board Repair for Alberton Residents and Businesses
          </h2>
          <div className="space-y-4 text-[#7A9E98] leading-relaxed">
            <p>
              Alberton has a particular mix of MacBook users we have come to know well: home-based professionals in Brackenhurst and Randhart, small business owners trading along Voortrekker Road and through the Alberton City precinct, and a steady cluster of medical, legal and accounting practices near Clinix Bedford Gardens just over the boundary. The logic board failures we see from this catchment tend to fall into a recognisable set — complete no-power events after a power surge, intermittent shutdowns under load, USB-C ports that have stopped charging, no-display faults where the backlight is alive but nothing renders, and erratic fan ramps that point to a failed sensor line on the board. Each of these is a component-level problem, not a software one, which is why a reinstall or SMC reset never resolves them.
            </p>
            <p>
              Our Hyde Park bench is set up specifically for board-level work — hot-air rework, micro-soldering under a stereo microscope, thermal imaging to trace short circuits, and schematic-driven diagnostics so we can isolate the failed component rather than guess. For Alberton clients this matters because the alternative most people are offered locally is a full board swap, which can cost more than the machine is worth on older Intel models. We have repaired MacBooks collected from a dental practice off Michelle Avenue where the board had taken a knock from a spilled coffee, and recovered a Meyersdal client&apos;s M1 Pro that had stopped charging after a lightning storm took out half the suburb&apos;s electronics. The consistent pattern we find in Alberton is surge-related damage — the area&apos;s power quality is not gentle on charging circuitry.
            </p>
            <p>
              Collection works simply: we arrange a courier window that suits you, the MacBook is sealed and tracked from your address in Alberton, Meyersdal, Brackenhurst or Randhart through to our Hyde Park workshop via the M2 and M1, and you receive a written diagnostic before any chargeable work begins. Most board repairs are completed within 48 to 96 hours of the machine arriving on the bench, and the unit comes back to you tested under load for at least 24 hours so we can confirm the fault is genuinely cleared. Call or WhatsApp 064 529 5863 to arrange collection or to talk through symptoms before you commit to anything.
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
            Our Repair Process for Alberton Clients
          </h2>
          <div className="space-y-6">
            {[
              { step: '01', title: 'Collection from Alberton', desc: 'Contact us via WhatsApp or phone. We arrange a collection time from Alberton that suits your schedule.' },
              { step: '02', title: 'Diagnostic Assessment', desc: 'Your MacBook is assessed at board level within 24 hours. We trace the exact fault using diagnostic tools, schematics, and a stereo microscope.' },
              { step: '03', title: 'Written Quote, No Obligation', desc: 'You receive a clear quote with the fault, repair approach, cost, and timeframe. No work begins until you approve.' },
              { step: '04', title: 'Component-level Repair', desc: 'Our technician carries out the repair under microscope, replacing the specific failed component while leaving everything else untouched.' },
              { step: '05', title: 'Quality Check and Return', desc: 'Every repair is tested under load before return. Your MacBook is returned to Alberton with a ZA Support warranty.' },
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
          <PricingRange page="/logic-board-repair/alberton" />
          <PricingNote variant="inline" />
        </div>
      </section>

      <section className="py-10 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQAccordion items={faqs} title="Logic Board Repair Alberton — Common Questions" />
        </div>
      </section>

      <section className="py-8 sm:py-16 bg-[#111C1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#E8F4F1] mb-6">We Also Serve These Areas</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { label: "Germiston", href: "/logic-board-repair/germiston" },
              { label: "Boksburg", href: "/logic-board-repair/boksburg" },
              { label: "Johannesburg South", href: "/logic-board-repair/johannesburg-south" },
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
            <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3">Alberton MacBook Fault? Assessment from R599.</h2>
            <p className="text-[#7A9E98] mb-6">We collect from Alberton. Assessment from R599. 12-month warranty. Hyde Park workshop.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={buildWhatsAppUrl('LBR-ALBERTON', 'logic-board')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 transition-all">
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
