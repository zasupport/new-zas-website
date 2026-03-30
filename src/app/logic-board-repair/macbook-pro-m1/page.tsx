import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, CheckCircle, ArrowRight, Shield, Zap, MapPin } from 'lucide-react';
import SchemaOrg from '@/components/seo/SchemaOrg';
import { buildFaqSchema, LOCAL_BUSINESS_PROVIDER } from '@/lib/schema';
import FAQAccordion from '@/components/ui/FAQ';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { CONTACT, buildWhatsAppUrl } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'MacBook Pro M1 Logic Board Repair Johannesburg | ZA Support',
  description: 'MacBook Pro M1 logic board repair in Johannesburg. Charging faults, no power, black screen, USB-C failures, liquid damage. Component-level repair. Assessment from R599. Hyde Park.',
  alternates: { canonical: 'https://zasupport.com/logic-board-repair/macbook-pro-m1' },
};

const faults = [
  { fault: 'No Power / Dead MacBook Pro M1', desc: 'The M1 MacBook Pro powers on via USB-C power delivery controllers. Corrosion or surge damage to the CD3217/CD3218 USB-C controller IC prevents power reaching the M1 die. Component replacement restores function without replacing the entire board.' },
  { fault: 'Not Charging via USB-C', desc: 'The M1 MacBook Pro uses USB-C for power and data. A failed USB-C mux (Cypress CCG6) or corroded USB-C port prevents charging. Port-level repair or controller replacement resolves this in most cases.' },
  { fault: 'Black Screen / No Display', desc: 'The M1 chip drives the display directly. Backlight circuit faults (backlight fuse, TCON controller) or a failed eDP connector cause black screens while the Mac otherwise runs. External monitor test confirms display vs logic board fault.' },
  { fault: 'Liquid Damage Corrosion', desc: 'M1 MacBook Pros have the same liquid entry points as Intel models. Corrosion attacks peripheral circuits first — USB-C controllers, power management ICs, audio circuits — before reaching the M1 die itself. Early cleaning dramatically improves outcomes.' },
  { fault: 'Fan Running at Full Speed', desc: 'The M1 MacBook Pro 13-inch is fanless — if you hear fan noise constantly, confirm your model. The M1 Pro/Max 14-inch and 16-inch have fans that run continuously when the thermal sensor circuit is damaged.' },
  { fault: 'USB-C / Thunderbolt 4 Not Working', desc: 'The M1 Pro and M1 Max include Thunderbolt 4 controllers. IC failure or connector damage causes Thunderbolt accessories to not be detected. Port-level repair is possible without board replacement.' },
];

const faqs = [
  { question: 'Can a MacBook Pro M1 logic board be repaired?', answer: 'Yes. While the M1 processor itself is soldered and cannot be replaced, the surrounding circuits are repairable. Power management ICs, USB-C controllers, charging circuits, display backlight drivers, and audio circuits are all component-level repairable. ZA Support performs M1 MacBook Pro board repairs in Hyde Park, Johannesburg. Assessment from R599.' },
  { question: 'Is data recoverable from a dead MacBook Pro M1?', answer: 'In most cases, yes. On M1 MacBook Pros, the SSD storage is separate from the M1 die and survives most logic board faults. If the board is completely dead, we can read the SSD via direct access in most cases. Data recovery is assessed as part of our R599 diagnostic.' },
  { question: 'How is M1 MacBook Pro repair different from Intel repair?', answer: 'The M1 MacBook Pro has unified memory — RAM and CPU are on one die and cannot be upgraded. However, the peripheral circuits (USB-C, charging, display backlight, audio) are separately repairable components on the board. The diagnosis approach differs but the repair capability is comparable for non-SoC faults.' },
  { question: 'My MacBook Pro M1 was damaged by a power surge during load shedding — is it repairable?', answer: 'Yes, frequently. Load shedding power surges in South Africa are a significant cause of MacBook Pro M1 failures. The surge typically damages the USB-C controller or power management circuit rather than the M1 die itself. We see this scenario weekly in our Hyde Park workshop. Early diagnosis determines repairability.' },
  { question: 'How long does MacBook Pro M1 logic board repair take?', answer: 'After the R599 assessment and your written approval, most M1 MacBook Pro logic board repairs are completed within 3–5 business days. We provide a specific timeline in the written quote.' },
  { question: 'Do you collect MacBook Pro M1 for repair from across Johannesburg?', answer: 'Yes. ZA Support collects from Sandton, Rosebank, Fourways, Bryanston, Midrand, Randburg, and surrounding Johannesburg suburbs. Contact us via WhatsApp on 064 529 5863 to arrange collection.' },
  { question: 'What does MacBook Pro M1 logic board repair cost compared to Apple?', answer: 'Apple charges R15,000–R45,000 for logic board replacement on MacBook Pro M1 models. ZA Support\'s component-level repair — replacing only the failed component — costs a fraction of this. Assessment from R599.' },
  { question: 'Can you repair a water-damaged MacBook Pro M1?', answer: 'Yes. Liquid damage on M1 MacBook Pros is repaired through full disassembly, ultrasonic cleaning of the logic board, and component-level repair of any damaged chips. Bring it in immediately — corrosion progresses within hours.' },
];

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'MacBook Pro M1 Logic Board Repair Johannesburg',
  description: 'Component-level MacBook Pro M1 logic board repair in Johannesburg. Power faults, charging, display, liquid damage. Assessment from R599.',
  provider: LOCAL_BUSINESS_PROVIDER,
  areaServed: { '@type': 'City', name: 'Johannesburg' },
  offers: { '@type': 'Offer', priceSpecification: { '@type': 'PriceSpecification', price: '599', priceCurrency: 'ZAR', description: 'Assessment fee from R599' } },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://zasupport.com' },
    { '@type': 'ListItem', position: 2, name: 'Logic Board Repair', item: 'https://zasupport.com/logic-board-repair' },
    { '@type': 'ListItem', position: 3, name: 'MacBook Pro', item: 'https://zasupport.com/logic-board-repair/macbook-pro' },
    { '@type': 'ListItem', position: 4, name: 'M1', item: 'https://zasupport.com/logic-board-repair/macbook-pro-m1' },
  ],
};

const faqSchema = buildFaqSchema(faqs);

export default function MacBookProM1LogicBoardPage() {
  return (
    <>
      <SchemaOrg schema={faqSchema} />
      <SchemaOrg schema={serviceSchema} />
      <SchemaOrg schema={breadcrumbSchema} />

      <section className="hero-gradient grid-overlay pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[
            { label: 'Logic Board Repair', href: '/logic-board-repair' },
            { label: 'MacBook Pro', href: '/logic-board-repair/macbook-pro' },
            { label: 'M1' },
          ]} />
          <div className="mt-8 max-w-4xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#E8F4F1] leading-tight mb-6">
              MacBook Pro M1 Logic Board Repair
              <br /><span className="text-[#0FEA7A]">Johannesburg</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-4 max-w-3xl leading-relaxed">
              Component-level repair for MacBook Pro M1 (2020), M1 Pro and M1 Max (2021 14-inch and 16-inch). Power faults, USB-C failures, liquid damage, and display circuits repaired at the component level in Hyde Park, Johannesburg.
            </p>
            <div className="flex items-center gap-2 text-[#7A9E98] text-sm mb-8">
              <MapPin className="w-4 h-4 text-[#0FEA7A]" />
              <span>Hyde Park, Johannesburg | Assessment from R599 | Collection from Sandton, Rosebank, Fourways, Bryanston, Midrand, Randburg</span>
            </div>
            <div className="flex flex-wrap gap-4 mb-8">
              {['Component-Level Repair', 'No Fix No Fee', 'Written Warranty', 'Assessment from R599'].map((l) => (
                <div key={l} className="flex items-center gap-2 bg-[rgba(15,234,122,0.08)] border border-[rgba(15,234,122,0.15)] px-4 py-2 rounded-full">
                  <CheckCircle className="w-4 h-4 text-[#0FEA7A]" />
                  <span className="text-[#E8F4F1] text-sm font-medium">{l}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href={buildWhatsAppUrl('LBR-MACBOOKPROM1', 'logic-board')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 hover:shadow-[0_0_32px_rgba(15,234,122,0.4)] transition-all" >
                WhatsApp for Quote
              </a>
              <a href={`tel:${CONTACT.phoneTel}`} className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all" target="_blank" rel="noopener noreferrer">
                <Phone className="w-5 h-5" /> Call {CONTACT.phone}
              </a>
              <Link href="/logic-board-repair" className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.2)] text-[#7A9E98] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[rgba(15,234,122,0.05)] transition-all">
                All Logic Board Repair <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-4">Why M1 MacBook Pro Logic Board Repair Is Possible</h2>
          <div className="space-y-4 text-[#7A9E98] leading-relaxed mb-8">
            <p>The M1 processor on Apple Silicon MacBook Pros is a system-on-chip — CPU, GPU, Neural Engine, and memory are all on one die. That die cannot be replaced. But the M1 chip represents only part of the logic board. The charging circuits, USB-C controllers, display backlight drivers, audio amplifiers, and power management ICs are all discrete components that can be diagnosed and replaced individually.</p>
            <p>In our Hyde Park workshop, the majority of M1 MacBook Pro faults we see are in these peripheral circuits, not in the M1 die itself. A failed USB-C controller after a power surge, a corroded charging IC after a liquid spill, or a blown backlight fuse — all are repairable at the component level, at a fraction of Apple&apos;s board replacement cost.</p>
            <p>Load shedding is a significant contributor to M1 MacBook Pro logic board faults in South Africa. The power surge when supply is restored can overwhelm USB-C controllers and power management circuits. If your M1 MacBook Pro developed a fault after a load shedding event, component-level diagnosis is the right first step.</p>
          </div>

          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-6">M1 MacBook Pro Faults We Repair</h2>
          <div className="space-y-4">
            {faults.map((f) => (
              <div key={f.fault} className="glass-card p-5">
                <h3 className="text-[#E8F4F1] font-bold mb-2">{f.fault}</h3>
                <p className="text-[#7A9E98] text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-4">What to Expect: Apple vs ZA Support</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            <div className="glass-card p-6 border border-red-500/20">
              <h3 className="text-red-400 font-bold mb-3">Apple Store / iStore</h3>
              <ul className="text-[#7A9E98] text-sm space-y-2">
                <li>Logic board replacement (entire board swapped)</li>
                <li>R15,000 – R45,000 depending on model</li>
                <li>Data may not be preserved</li>
                <li>Standard 90-day warranty on replaced part</li>
              </ul>
            </div>
            <div className="glass-card p-6 border border-[rgba(15,234,122,0.3)]">
              <h3 className="text-[#0FEA7A] font-bold mb-3">ZA Support</h3>
              <ul className="text-[#7A9E98] text-sm space-y-2">
                <li>Component-level repair — only failed part replaced</li>
                <li>Assessment from R599, repair quoted individually</li>
                <li>Data preserved on same logic board</li>
                <li>Written warranty on repaired components</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQAccordion items={faqs} title="MacBook Pro M1 Logic Board Repair — Common Questions" />
        </div>
      </section>

      <section className="py-8 sm:py-16 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#E8F4F1] mb-6">Related Repairs</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              { label: 'All MacBook Pro Logic Board', href: '/logic-board-repair/macbook-pro' },
              { label: 'MacBook Pro M2 Repair', href: '/logic-board-repair/macbook-pro-m2' },
              { label: 'MacBook Pro 14-inch', href: '/logic-board-repair/macbook-pro-14-inch' },
              { label: 'Logic Board Hub', href: '/logic-board-repair' },
              { label: 'MacBook Air M1', href: '/logic-board-repair/macbook-air-m1' },
              { label: 'Liquid Damage Repair', href: '/liquid-damage' },
              { label: 'Logic Board Sandton', href: '/logic-board-repair/sandton' },
              { label: 'Logic Board Rosebank', href: '/logic-board-repair/rosebank' },
            ].map((link) => (
              <Link key={link.href} href={link.href} className="glass-card p-4 text-center group">
                <span className="text-[#E8F4F1] text-sm font-semibold group-hover:text-[#0FEA7A] transition-colors">{link.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-8 sm:py-16 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-[rgba(39,80,77,0.3)] border border-[rgba(15,234,122,0.2)] rounded-3xl p-10">
            <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3">MacBook Pro M1 Fault? Assessment from R599.</h2>
            <p className="text-[#7A9E98] mb-6">We collect from Sandton, Rosebank, Fourways, Bryanston, Midrand, and Randburg. No Fix No Fee on all repairs.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={buildWhatsAppUrl('LBR-MACBOOKPROM1', 'logic-board')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 transition-all" >
                WhatsApp for Quote
              </a>
              <a href={`tel:${CONTACT.phoneTel}`} className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all" target="_blank" rel="noopener noreferrer">
                <Phone className="w-5 h-5" /> Call {CONTACT.phone}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
