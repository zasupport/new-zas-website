import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, CheckCircle, ArrowRight, MapPin } from 'lucide-react';
import SchemaOrg from '@/components/seo/SchemaOrg';
import { buildFaqSchema, LOCAL_BUSINESS_PROVIDER } from '@/lib/schema';
import FAQAccordion from '@/components/ui/FAQ';
import PricingNote from '@/components/PricingNote';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { CONTACT, buildWhatsAppUrl } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'MacBook Air M5 Logic Board Repair Johannesburg',
  description: 'MacBook Air M5 (13-inch & 15-inch, 2026) logic board repair in Johannesburg. Surge, liquid and accidental damage Apple’s warranty won’t cover, charging, Thunderbolt 4, N1 Wi-Fi 7, component-level. Assessment from R599.',
  alternates: { canonical: 'https://zasupport.com/logic-board-repair/macbook-air-m5' },
};

const faults = [
  { fault: 'No Power After a Load-Shedding Surge', desc: 'The fanless M5 MacBook Air (13-inch and 15-inch, 2026) is new, so the boards we see are almost all surge or spill damage, neither covered by Apple’s warranty. A spike through MagSafe 3 or USB-C usually kills the power-delivery controller or power-management IC while the M5 SoC survives, leaving the Air dead but repairable at component level.' },
  { fault: 'Liquid Damage (Out of Warranty)', desc: 'Liquid damage voids the standard warranty, so a spilled M5 Air means a full out-of-pocket replacement at Apple, or a component-level repair with us. On the slim fanless chassis the board sits close under the keyboard, so spills reach the power and I/O circuitry fast; ultrasonic cleaning within 24 hours gives the best recovery odds.' },
  { fault: 'Charging Failure (MagSafe 3 / USB-C)', desc: 'The M5 Air charges over MagSafe 3 or its two Thunderbolt 4 USB-C ports, all sharing one power-management layer. Charging that stops on every input at once is a shared-circuit fault, not a port fault, and is repaired at component level.' },
  { fault: 'Wi-Fi / Bluetooth Failure (N1 Wireless Chip)', desc: 'The M5 Air is among the first Macs to use Apple’s N1 wireless chip for Wi-Fi 7 and Bluetooth 6. When Wi-Fi or Bluetooth drops out or disappears entirely after liquid or impact damage, the fault is on the board around the N1 and its antenna circuitry, diagnosed and repaired at component level rather than replacing the whole board.' },
  { fault: 'Thunderbolt 4 / USB-C Port Failure', desc: 'With only two USB-C ports, a single failed Thunderbolt 4 controller can take out both data and charging on one side of the M5 Air. ESD and liquid ingress are the usual causes; the controller is a discrete IC we replace on the board.' },
  { fault: 'Overheating / Thermal Throttling (no fan)', desc: 'The M5 Air cools passively through a heat spreader. Persistent throttling, heat-related shutdowns or instability usually point to a thermal-sensor or power-circuit fault on the board rather than the SoC, and are diagnosed at component level, there is no fan to replace.' },
];

const faqs = [
  { question: 'My M5 Air is new, why not just use the Apple warranty?', answer: 'Apple’s warranty covers manufacturing defects, not accidental damage. Surge, liquid and drop damage, the faults we see on new M5 Airs, are excluded, so Apple quotes a full out-of-pocket board replacement. We repair the specific failed component on your existing board for significantly less. Assessment from R599, with an honest opinion if a fault looks like a covered defect Apple should handle.' },
  { question: 'How much does MacBook Air M5 logic board repair cost?', answer: 'Apple replaces the whole board, which costs far more than a component-level repair. ZA Support repairs only the part that failed, component-level MacBook Air repairs start from R2,500 depending on the fault. After the R599 assessment we give a written, fixed-price quote before any work begins.' },
  { question: 'Can a brand-new M5 Air logic board be repaired?', answer: 'Yes. The M5 SoC is sealed and not chip-level replaceable, but the surrounding circuits are: USB-C / Thunderbolt 4 controllers, the MagSafe 3 charging circuit, power-management ICs, the N1 wireless circuitry and the display backlight driver are all discrete components we repair at board level in our Hyde Park workshop.' },
  { question: 'My M5 Air lost Wi-Fi after a knock, is that the board?', answer: 'Often, yes. The M5 Air uses Apple’s N1 chip for Wi-Fi 7 and Bluetooth, soldered to the logic board. After impact or liquid, wireless faults usually sit in the N1 or antenna circuitry on the board, which we diagnose and repair at component level rather than replacing the entire board. The R599 assessment confirms it.' },
  { question: 'Will my data be safe during M5 Air board repair?', answer: 'Yes. Component-level repair does not remove or erase the soldered SSD, your data stays on the board while we fix the specific fault. If the board is completely dead, SSD readability is assessed in the R599 diagnostic.' },
  { question: 'How long does M5 Air logic board repair take?', answer: 'After the R599 assessment and your written approval, most M5 Air board repairs complete within 24-72 hours for common power and charging faults. Liquid-damage cases can take longer; the written quote states the timeline before we start.' },
  { question: 'Do you collect an M5 MacBook Air for repair?', answer: 'Yes. We collect from Sandton, Rosebank, Fourways, Bryanston, Midrand, Randburg and surrounding Johannesburg suburbs. WhatsApp 064 529 5863 to arrange same-day collection.' },
];

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'MacBook Air M5 Logic Board Repair Johannesburg',
  description: 'Component-level MacBook Air M5 logic board repair in Johannesburg. Assessment from R599.',
  provider: LOCAL_BUSINESS_PROVIDER,
  areaServed: { '@type': 'City', name: 'Johannesburg' },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://zasupport.com' },
    { '@type': 'ListItem', position: 2, name: 'Logic Board Repair', item: 'https://zasupport.com/logic-board-repair' },
    { '@type': 'ListItem', position: 3, name: 'MacBook Air', item: 'https://zasupport.com/logic-board-repair/macbook-air' },
    { '@type': 'ListItem', position: 4, name: 'M5', item: 'https://zasupport.com/logic-board-repair/macbook-air-m5' },
  ],
};

const faqSchema = buildFaqSchema(faqs);

export default function MacBookAirM5LogicBoardPage() {
  return (
    <>
      <SchemaOrg schema={faqSchema} />
      <SchemaOrg schema={serviceSchema} />
      <SchemaOrg schema={breadcrumbSchema} />

      <section className="hero-gradient grid-overlay pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[
            { label: 'Logic Board Repair', href: '/logic-board-repair' },
            { label: 'MacBook Air', href: '/logic-board-repair/macbook-air' },
            { label: 'M5' },
          ]} />
          <div className="mt-8 max-w-4xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#E8F4F1] leading-tight mb-6">
              MacBook Air M5 Logic Board Repair
              <br /><span className="text-[#0FEA7A]">Johannesburg</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-4 max-w-3xl leading-relaxed">
              MacBook Air M5 logic board repair in Johannesburg costs from R599 to assess, with component-level repairs from R2,500 and most common faults turned around in 24-72 hours. The 13-inch and 15-inch M5 Air (2026) is new, so the faults we see, surge, liquid and accidental damage, are the ones Apple’s warranty does not cover. We repair them at board level in our Hyde Park workshop.
            </p>
            <div className="flex items-center gap-2 text-[#7A9E98] text-sm mb-8">
              <MapPin className="w-4 h-4 text-[#0FEA7A]" />
              <span>Hyde Park, Johannesburg | Assessment from R599 | Collection from Sandton, Rosebank, Fourways, Bryanston, Midrand, Randburg</span>
            </div>
            <div className="flex flex-wrap gap-4 mb-8">
              {['Component-Level Repair', 'No Fix No Fee', '12-Month Warranty', 'Assessment Fee May Apply'].map((l) => (
                <div key={l} className="flex items-center gap-2 bg-[rgba(15,234,122,0.08)] border border-[rgba(15,234,122,0.15)] px-4 py-2 rounded-full">
                  <CheckCircle className="w-4 h-4 text-[#0FEA7A]" />
                  <span className="text-[#E8F4F1] text-sm font-medium">{l}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href={buildWhatsAppUrl('LBR-MACBOOKAIRM5', 'logic-board')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 hover:shadow-[0_0_32px_rgba(15,234,122,0.4)] transition-all" >
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
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-4">MacBook Air M5 Logic Board Faults We Repair</h2>
          <p className="text-[#7A9E98] mb-8 leading-relaxed">As the newest MacBook Air, the M5 reaches our Hyde Park bench almost entirely as accidental damage, the faults a manufacturer warranty excludes. The M5 SoC is sealed and not chip-level replaceable, but the power-management system, USB-C / Thunderbolt 4 controllers, MagSafe 3 charging circuit, the new N1 wireless circuitry and the display backlight driver are discrete components we repair at board level.</p>
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
          <PricingNote />
          <FAQAccordion items={faqs} title="MacBook Air M5 Logic Board Repair, Common Questions" />
        </div>
      </section>

      <section className="py-8 sm:py-16 bg-[#111C1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#E8F4F1] mb-6">Related Repairs</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              { label: 'MacBook Air M4 Repair', href: '/logic-board-repair/macbook-air-m4' },
              { label: 'MacBook Pro M5 Repair', href: '/logic-board-repair/macbook-pro-m5' },
              { label: 'All MacBook Air Repair', href: '/logic-board-repair/macbook-air' },
              { label: 'Logic Board Hub', href: '/logic-board-repair' },
              { label: 'Liquid Damage Repair', href: '/liquid-damage' },
              { label: 'Sandton Logic Board', href: '/logic-board-repair/sandton' },
              { label: 'Rosebank Logic Board', href: '/logic-board-repair/rosebank' },
              { label: 'Fourways Logic Board', href: '/logic-board-repair/fourways' },
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
            <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3">M5 MacBook Air Surge or Spill? Assessment from R599.</h2>
            <p className="text-[#7A9E98] mb-6">Accidental damage Apple won’t cover, repaired at component level from R2,500 with a 12-month written warranty. Collection from Sandton, Rosebank, Fourways, Bryanston, Midrand and Randburg.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={buildWhatsAppUrl('LBR-MACBOOKAIRM5', 'logic-board')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 transition-all" >
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
