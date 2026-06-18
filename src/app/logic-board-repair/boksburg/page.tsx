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
  title: 'MacBook Logic Board Repair Boksburg | ZA Support Hyde Park',
  description:
    'MacBook logic board repair for Boksburg residents. Component-level repair, board diagnostics, assessment from R599. We collect from Boksburg and repair at our Hyde Park workshop. Call 064 529 5863.',
  alternates: { canonical: 'https://zasupport.com/logic-board-repair/boksburg' },
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
  { question: 'Do you collect MacBooks from Boksburg?', answer: 'Yes. We collect from every part of Boksburg, Bardene, Parkdene, Beyers Park, Sunward Park, Atlasville, Bartlett, Cinderella and the areas around East Rand Mall and Lake Boksburg. Our driver routes via the R24 and we typically arrange collection within one to two working days. For businesses along Trichardts Road or the Jet Park industrial belt we can usually accommodate a specific time window so your operations are not disrupted.' },
  { question: 'How far is Boksburg from your Hyde Park workshop?', answer: 'Boksburg is approximately 35 minutes from our Hyde Park workshop via the R24 in normal traffic, slightly longer during peak times on the M2 or if you are coming from the far side near Vosloorus. The distance is one of the reasons we offer collection, it saves you a round trip of well over an hour and the petrol that goes with it. You hand the machine to our driver in Boksburg and we take it from there.' },
  { question: 'What is the difference between component-level repair and a board replacement?', answer: 'A board replacement means swapping the entire logic board for a new or refurbished one, expensive, and on newer MacBooks it can mean losing the data on your soldered SSD because the storage controller is paired to the original board. Component-level repair, which is what we do at Hyde Park, means isolating the actual failed chip or capacitor or trace and replacing only that. For most Boksburg clients we have seen, component-level work comes in at a meaningful fraction of a board-swap quote and keeps their data intact.' },
  { question: 'My MacBook shows no power at all. Is that repairable?', answer: 'In most cases, yes. No-power symptoms usually trace back to the charging circuit, the SMC, a shorted rail, or a damaged power management IC, all repairable at component level. We have brought back plenty of dead-on-the-bench MacBooks from Boksburg clients who assumed the machine was a write-off. The only honest way to tell is a proper diagnostic on the bench under the microscope, which is what the From R599 assessment covers.' },
  { question: 'How long will the repair take?', answer: 'For most Boksburg jobs the full cycle, collection, diagnostic, repair and return, runs three to seven working days. Straightforward charging IC or backlight repairs are often quicker, while liquid damage cases that need full board cleaning and multiple component replacements can take longer. We do not guess at timelines; once we have completed the diagnostic we give you a firm turnaround before any repair work begins.' },
  { question: 'What is the assessment fee?', answer: 'Our assessment is from R599. That covers the proper diagnostic, visual inspection, microscope review, power-rail testing and fault isolation, not a five-minute look-over. If you decide to go ahead with the repair, the assessment fee is absorbed into the repair cost. If you choose not to proceed, the machine is returned to Boksburg in the condition we received it.' },
  { question: 'Do you offer a From R599 assessment guarantee?', answer: 'Yes. The From R599 assessment is a firm starting point for diagnostic work on any MacBook logic board. We will tell you up front if your specific case requires anything beyond standard assessment, for example, a severely liquid-damaged board needing extensive cleaning before fault-finding can even begin. Boksburg clients receive a written quote after assessment, and no repair work begins without your approval.' },
  { question: 'Which MacBook models do you repair for Boksburg clients?', answer: 'All of them. MacBook Pro and MacBook Air from the Intel era through to current Apple Silicon M1, M2 and M3 machines, plus iMac and Mac mini boards. The repair approach changes with the generation, older Intel boards are more forgiving to work on, while the newer M-series logic boards demand finer rework technique and proper schematics, but the underlying component-level methodology is the same. If you are unsure whether your specific model is covered, send us the serial number on WhatsApp and we will confirm.' },
];

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'MacBook Logic Board Repair Boksburg',
  description: 'Expert MacBook logic board repair and component-level repair for Boksburg clients. Collection from Boksburg, repair at Hyde Park workshop. Assessment from R599.',
  provider: LOCAL_BUSINESS_PROVIDER,
  areaServed: [
    { '@type': 'City', name: 'Johannesburg' },
    { '@type': 'Neighborhood', name: 'Boksburg' },
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://zasupport.com' },
    { '@type': 'ListItem', position: 2, name: 'Logic Board Repair', item: 'https://zasupport.com/logic-board-repair' },
    { '@type': 'ListItem', position: 3, name: 'Boksburg', item: 'https://zasupport.com/logic-board-repair/boksburg' },
  ],
};

const faqSchema = buildFaqSchema(faqs);

export default function LogicBoardRepairBoksburgPage() {
  return (
    <>
      <SchemaOrg schema={faqSchema} />
      <SchemaOrg schema={serviceSchema} />
      <SchemaOrg schema={breadcrumbSchema} />

      <section className="hero-gradient grid-overlay pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[
            { label: 'Logic Board Repair', href: '/logic-board-repair' },
            { label: 'Boksburg' },
          ]} />
          <div className="mt-8 max-w-4xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#E8F4F1] leading-tight mb-6">
              Logic Board Repair Boksburg, Johannesburg
              <br /><span className="text-[#0FEA7A]">, MacBook Specialists</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-4 max-w-3xl leading-relaxed">
              Boksburg MacBook logic board repair, handled by a workshop that genuinely understands East Rand turnaround pressures. We collect from across Boksburg, from the homes near Cinderella Dam to the businesses along North Rand Road and the warehouses behind East Rand Mall, and repair at component level in our Hyde Park workshop, roughly 35 minutes up the R24. Assessment from R599.
            </p>
            <div className="flex items-center gap-2 text-[#7A9E98] text-sm mb-8">
              <MapPin className="w-4 h-4 text-[#0FEA7A]" />
              <span>We collect from Boksburg and repair at our Hyde Park workshop, approx. 35 min drive</span>
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
              <a href={buildWhatsAppUrl('LBR-BOKSBURG', 'logic-board')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 hover:shadow-[0_0_32px_rgba(15,234,122,0.4)] transition-all">
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
            Logic Board Repair for Boksburg Residents and Businesses
          </h2>
          <div className="space-y-4 text-[#7A9E98] leading-relaxed">
            <p>
              Boksburg sits at an interesting crossroads for us. The suburb runs from established residential pockets around Lake Boksburg through to the heavy commercial activity along Trichardts Road and the industrial sprawl towards Jet Park, and the MacBook faults we see reflect that mix. Residents tend to bring us liquid-damage and intermittent shutdown cases on family machines, while small business owners operating near East Rand Mall and the N12 corridor usually arrive with no-power MacBook Pros that have been the workhorse of their accounting, design, or logistics operation. Logic board failure rarely announces itself politely, it usually shows up as a black screen on a Monday morning, a charger that no longer triggers any indicator, or a machine that runs for ninety seconds and then dies.
            </p>
            <p>
              Our Hyde Park bench is set up for the kind of work that swap-and-replace shops cannot offer. Hot-air rework stations, a Mantis stereo microscope, schematics and boardviews, and proper micro-soldering irons let us trace a fault down to the specific failed component, a shorted SMC chip, a blown U7000-series charging IC, a corroded PPBUS line, rather than quoting you for a whole board. For Boksburg clients that distinction matters, because component-level repair on a 16-inch MacBook Pro is routinely a fraction of an Apple board-swap quote, and it preserves your original SSD and the data on it.
            </p>
            <p>
              Collections from Boksburg run via the R24 and M2, and we have done same-day pickups from Bardene, Parkdene, Beyers Park, Sunward Park, Atlasville and Bartlett when the timing works. One pattern we see consistently with Boksburg clients: machines damaged after a power surge during a Highveld thunderstorm, particularly in older homes where the wall sockets feed equipment without proper surge protection. We have repaired several of these where the MagSafe or USB-C charging circuit took the hit but the rest of the board was salvageable. If your MacBook Pro, Air, iMac or Mac mini is refusing to power on, dropping out under load, or showing display artefacts, send a WhatsApp to 064 529 5863 and we will arrange collection.
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
            Our Repair Process for Boksburg Clients
          </h2>
          <div className="space-y-6">
            {[
              { step: '01', title: 'Collection from Boksburg', desc: 'Contact us via WhatsApp or phone. We arrange a collection time from Boksburg that suits your schedule.' },
              { step: '02', title: 'Diagnostic Assessment', desc: 'Your MacBook is assessed at board level within 24 hours. We trace the exact fault using diagnostic tools, schematics, and a stereo microscope.' },
              { step: '03', title: 'Written Quote, No Obligation', desc: 'You receive a clear quote with the fault, repair approach, cost, and timeframe. No work begins until you approve.' },
              { step: '04', title: 'Component-level Repair', desc: 'Our technician carries out the repair under microscope, replacing the specific failed component while leaving everything else untouched.' },
              { step: '05', title: 'Quality Check and Return', desc: 'Every repair is tested under load before return. Your MacBook is returned to Boksburg with a ZA Support warranty.' },
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
          <p className="text-[#7A9E98] text-xs mt-3">Final price confirmed at diagnostic. Assessment from R599 with to proceed.</p>
          <PricingRange page="/logic-board-repair/boksburg" />
          <PricingNote variant="inline" />
        </div>
      </section>

      <section className="py-10 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQAccordion items={faqs} title="Logic Board Repair Boksburg, Common Questions" />
        </div>
      </section>

      <section className="py-8 sm:py-16 bg-[#111C1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#E8F4F1] mb-6">We Also Serve These Areas</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { label: "Benoni", href: "/logic-board-repair/benoni" },
              { label: "Germiston", href: "/logic-board-repair/germiston" },
              { label: "Edenvale", href: "/logic-board-repair/edenvale" },
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
            <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3">Boksburg MacBook Fault? Assessment from R599.</h2>
            <p className="text-[#7A9E98] mb-6">We collect from Boksburg. Assessment from R599. 12-month warranty. Hyde Park workshop.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={buildWhatsAppUrl('LBR-BOKSBURG', 'logic-board')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 transition-all">
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
