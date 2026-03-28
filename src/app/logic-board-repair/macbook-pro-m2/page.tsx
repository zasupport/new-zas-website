import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, CheckCircle, ArrowRight, MapPin } from 'lucide-react';
import SchemaOrg from '@/components/seo/SchemaOrg';
import { buildFaqSchema, LOCAL_BUSINESS_PROVIDER } from '@/lib/schema';
import FAQAccordion from '@/components/ui/FAQ';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { CONTACT, buildWhatsAppUrl } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'MacBook Pro M2 Logic Board Repair Johannesburg | ZA Support',
  description: 'MacBook Pro M2, M2 Pro, M2 Max logic board repair in Johannesburg. Charging, no power, display, USB-C, liquid damage. Component-level repair. Assessment from R599.',
  alternates: { canonical: 'https://zasupport.com/logic-board-repair/macbook-pro-m2' },
};

const faults = [
  { fault: 'No Power / Dead MacBook Pro M2', desc: 'USB-C power delivery failure is the most common M2 MacBook Pro no-power cause. The CD3217 or Intersil USB-C controller manages power negotiation. Surge or liquid damage to this IC prevents the M2 SoC from receiving power.' },
  { fault: 'USB-C Charging Not Working', desc: 'The M2 MacBook Pro 13-inch charges via MagSafe 3 or USB-C. The M2 Pro/Max 14-inch and 16-inch charge via MagSafe 3 or Thunderbolt 4. Charging port damage, controller IC failure, or corroded contacts cause charging refusal.' },
  { fault: 'Black Screen / Display Fault', desc: 'The M2 MacBook Pro\'s ProMotion display (14-inch and 16-inch) draws power from a dedicated backlight circuit. Fuse failure or backlight IC damage causes a black screen while the Mac continues to run. Verify with an external monitor.' },
  { fault: 'Liquid Damage', desc: 'We see M2 MacBook Pros frequently after coffee or water spills. The keyboard area is the primary liquid entry point. Ultrasonic cleaning followed by component-level assessment determines which circuits require repair.' },
  { fault: 'Thunderbolt 4 / USB-C Not Detected', desc: 'The M2 Pro and M2 Max include Thunderbolt 4 controllers. A failed controller prevents docking stations, external monitors, and high-speed storage from being detected. Port-level repair resolves most cases.' },
  { fault: 'Fan Running at Full Speed', desc: 'The 14-inch and 16-inch M2 MacBook Pros have active cooling. The fan controller circuit, thermal sensor ICs, or SMC configuration can cause fans to run at maximum speed even under light load.' },
];

const faqs = [
  { question: 'Can a MacBook Pro M2 logic board be repaired?', answer: 'Yes. The M2, M2 Pro, and M2 Max chips are integrated on the logic board and cannot be replaced individually — but the surrounding circuits are fully repairable. Power management, USB-C controllers, display backlight, audio circuits, and charging paths are all component-level repairable at ZA Support in Hyde Park, Johannesburg. Assessment from R599.' },
  { question: 'Is the MacBook Pro M2 more difficult to repair than M1?', answer: 'The M2 generation uses a similar architecture to M1 for repairability purposes. The 14-inch and 16-inch M2 Pro/Max models have additional Thunderbolt 4 controllers and a more complex power delivery system, but the same component-level repair approach applies. Repairability is comparable.' },
  { question: 'My MacBook Pro M2 was damaged by a power surge — is it worth repairing?', answer: 'In most cases yes. Load shedding power surges are a common cause of M2 MacBook Pro faults in South Africa. Surges typically damage the USB-C controller or power management IC, which are repairable. The M2 die itself is rarely the damaged component. Assessment from R599 confirms the specific fault.' },
  { question: 'Will my data be safe during M2 MacBook Pro logic board repair?', answer: 'Yes. We do not erase or reformat anything during component-level board repair. The SSD is not removed or erased. If the board is completely dead, we assess SSD readability as part of the R599 diagnostic.' },
  { question: 'How much does MacBook Pro M2 logic board repair cost compared to Apple?', answer: 'Apple charges R20,000–R50,000 for logic board replacement on M2 MacBook Pro models. ZA Support\'s component-level repair — replacing only the failed component — is significantly less expensive. We quote your specific repair after the R599 assessment.' },
  { question: 'How long does MacBook Pro M2 logic board repair take?', answer: 'After the R599 assessment and your written approval, most M2 MacBook Pro logic board repairs are completed within 3–5 business days. We provide a specific timeline in the written quote.' },
  { question: 'Do you repair MacBook Pro M2 liquid damage in Johannesburg?', answer: 'Yes. We perform ultrasonic cleaning and component-level repair for M2 MacBook Pro liquid damage. Act quickly — corrosion progresses within hours. We collect from Sandton, Rosebank, Fourways, Bryanston, Midrand, and Randburg.' },
  { question: 'Does ZA Support collect MacBook Pro M2 for repair?', answer: 'Yes. ZA Support collects from Sandton, Rosebank, Fourways, Bryanston, Midrand, Randburg, and surrounding Johannesburg suburbs. WhatsApp 064 529 5863 to arrange same-day collection.' },
];

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'MacBook Pro M2 Logic Board Repair Johannesburg',
  description: 'Component-level MacBook Pro M2, M2 Pro, M2 Max logic board repair in Johannesburg. Assessment from R599.',
  provider: LOCAL_BUSINESS_PROVIDER,
  areaServed: { '@type': 'City', name: 'Johannesburg' },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://zasupport.com' },
    { '@type': 'ListItem', position: 2, name: 'Logic Board Repair', item: 'https://zasupport.com/logic-board-repair' },
    { '@type': 'ListItem', position: 3, name: 'MacBook Pro', item: 'https://zasupport.com/logic-board-repair/macbook-pro' },
    { '@type': 'ListItem', position: 4, name: 'M2', item: 'https://zasupport.com/logic-board-repair/macbook-pro-m2' },
  ],
};

const faqSchema = buildFaqSchema(faqs);

export default function MacBookProM2LogicBoardPage() {
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
            { label: 'M2' },
          ]} />
          <div className="mt-8 max-w-4xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#E8F4F1] leading-tight mb-6">
              MacBook Pro M2 Logic Board Repair
              <br /><span className="text-[#0FEA7A]">Johannesburg</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-4 max-w-3xl leading-relaxed">
              Component-level repair for MacBook Pro M2 (2022 13-inch), M2 Pro and M2 Max (2023 14-inch and 16-inch). Charging faults, no power, black screen, USB-C failures, and liquid damage repaired in Hyde Park.
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
              <a href={buildWhatsAppUrl('LBR-MACBOOKPROM2', 'logic-board')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 hover:shadow-[0_0_32px_rgba(15,234,122,0.4)] transition-all">
                WhatsApp for Quote
              </a>
              <a href={`tel:${CONTACT.phoneTel}`} className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all">
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
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-4">MacBook Pro M2 Logic Board Faults We Repair</h2>
          <p className="text-[#7A9E98] mb-8 leading-relaxed">The M2 generation MacBook Pros brought significant performance improvements but the same fundamental logic board repairability as M1. The M2 die, RAM, and Neural Engine are integrated and cannot be replaced — but the charging controllers, USB-C management ICs, display drivers, and power circuits are all discrete components we can diagnose and repair individually.</p>
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
          <FAQAccordion items={faqs} title="MacBook Pro M2 Logic Board Repair — Common Questions" />
        </div>
      </section>

      <section className="py-8 sm:py-16 bg-[#111C1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#E8F4F1] mb-6">Related Repairs</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              { label: 'MacBook Pro M1 Repair', href: '/logic-board-repair/macbook-pro-m1' },
              { label: 'MacBook Pro M3 Repair', href: '/logic-board-repair/macbook-pro-m3' },
              { label: 'MacBook Pro 14-inch', href: '/logic-board-repair/macbook-pro-14-inch' },
              { label: 'All MacBook Pro Repair', href: '/logic-board-repair/macbook-pro' },
              { label: 'Logic Board Hub', href: '/logic-board-repair' },
              { label: 'Liquid Damage Repair', href: '/liquid-damage' },
              { label: 'MacBook Air M2', href: '/logic-board-repair/macbook-air-m2' },
              { label: 'Sandton Logic Board', href: '/logic-board-repair/sandton' },
            ].map((link) => (
              <Link key={link.href} href={link.href} className="glass-card p-4 text-center group">
                <span className="text-[#E8F4F1] text-sm font-semibold group-hover:text-[#0FEA7A] transition-colors">{link.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-8 sm:py-16 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-[rgba(39,80,77,0.3)] border border-[rgba(15,234,122,0.2)] rounded-3xl p-10">
            <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3">MacBook Pro M2 Fault? Assessment from R599.</h2>
            <p className="text-[#7A9E98] mb-6">Collection from Sandton, Rosebank, Fourways, Bryanston, Midrand, and Randburg. No Fix No Fee.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={buildWhatsAppUrl('LBR-MACBOOKPROM2', 'logic-board')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 transition-all">
                WhatsApp for Quote
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
