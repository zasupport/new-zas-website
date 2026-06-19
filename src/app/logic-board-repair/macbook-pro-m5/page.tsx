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
  title: 'MacBook Pro M5 Logic Board Repair Johannesburg',
  description: 'MacBook Pro M5, M5 Pro, M5 Max (14-inch & 16-inch, 2026) logic board repair in Johannesburg. Surge, liquid and accidental damage Apple’s warranty won’t cover, Thunderbolt 5, MagSafe 3, XDR display, component-level. Assessment from R599.',
  alternates: { canonical: 'https://zasupport.com/logic-board-repair/macbook-pro-m5' },
};

const faults = [
  { fault: 'No Power After a Load-Shedding Surge', desc: 'The M5 MacBook Pro (2026) is new enough that almost everything we see is accidental, and surge damage is not covered by Apple’s warranty. A voltage spike through MagSafe 3 or USB-C typically kills the power-delivery controller or main power-management IC while the M5 SoC stays intact, leaving the board dead but repairable at component level.' },
  { fault: 'Liquid Damage (Out of Warranty)', desc: 'Liquid damage voids Apple’s standard warranty, so a spilled M5 MacBook Pro usually means an out-of-pocket board replacement at Apple, or a component-level repair with us. Spills reach the left-side Thunderbolt and power circuitry first; ultrasonic cleaning within 24 hours markedly improves recovery.' },
  { fault: 'Thunderbolt 5 Port Failure (M5 Pro / M5 Max)', desc: 'The M5 Pro and M5 Max carry Thunderbolt 5 controllers as discrete ICs on the board. Physical port damage or an ESD event can disable one or more high-speed ports while the rest of the machine runs normally, a board-level repair rather than a full replacement.' },
  { fault: 'Charging Failure (MagSafe 3 / USB-C)', desc: 'The M5 Pro and M5 Max draw up to 140W across MagSafe 3 and USB-C, sharing a single power-management layer. Charging that fails on every input at once points to that shared circuit, not the ports, repaired at component level.' },
  { fault: 'Black Screen / Liquid Retina XDR Backlight', desc: 'The M5 MacBook Pro keeps the mini-LED Liquid Retina XDR display with ProMotion. A blown backlight fuse or TCON fault leaves the M5 running with a black screen, confirmed by an external-monitor test. The backlight driver is a board-level part repaired without replacing the panel.' },
  { fault: 'Physical / Drop Damage to the Board', desc: 'Drops can crack board traces or shear components near the I/O cluster even when the screen survives, and accidental damage is not covered by the standard warranty. We assess trace and component damage under magnification as part of the R599 diagnostic and repair at board level where viable.' },
];

const faqs = [
  { question: 'My M5 MacBook Pro is new, why not just use the Apple warranty?', answer: 'Apple’s warranty covers manufacturing defects, not accidental damage. Surge, liquid and drop damage, the faults we see on new M5 MacBook Pros, are excluded, so Apple quotes a full out-of-pocket board replacement, which is far more expensive. We repair the specific failed component on your existing board for significantly less. Assessment from R599.' },
  { question: 'Can a brand-new M5 MacBook Pro logic board be repaired?', answer: 'Yes. The M5, M5 Pro and M5 Max are sealed SoCs that cannot be replaced at chip level, but the power-management ICs, Thunderbolt 5 and USB-C controllers, MagSafe 3 charging circuit and XDR backlight driver are discrete components we diagnose and repair at board level in our Hyde Park workshop.' },
  { question: 'How much does M5 MacBook Pro logic board repair cost?', answer: 'Apple replaces the whole board, which costs far more than a component-level repair. We repair only the part that failed on your existing board, so the cost is significantly lower. After the R599 assessment we provide a written, fixed-price quote before any work begins.' },
  { question: 'Will using ZA Support affect my remaining Apple warranty?', answer: 'Component-level repair of accidental damage (surge, liquid, drops) addresses faults the warranty already excludes. We will always tell you honestly at the R599 assessment if a fault looks like a covered manufacturing defect that Apple should handle under warranty instead.' },
  { question: 'Will my data be safe during M5 MacBook Pro board repair?', answer: 'Yes. Component-level repair does not remove or erase the soldered SSD, your storage stays on the board untouched while we repair the specific fault. If the board is completely dead, SSD readability is assessed in the R599 diagnostic.' },
  { question: 'How long does M5 MacBook Pro logic board repair take?', answer: 'After the R599 assessment and your written approval, most M5 MacBook Pro board repairs finish within 3-5 business days. Multi-area liquid damage can take longer; the written quote states the timeline before we start.' },
  { question: 'Do you collect an M5 MacBook Pro for repair?', answer: 'Yes. We collect from Sandton, Rosebank, Fourways, Bryanston, Midrand, Randburg and surrounding Johannesburg suburbs. WhatsApp 064 529 5863 to arrange same-day collection.' },
];

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'MacBook Pro M5 Logic Board Repair Johannesburg',
  description: 'Component-level MacBook Pro M5, M5 Pro, M5 Max logic board repair in Johannesburg. Assessment from R599.',
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
    { '@type': 'ListItem', position: 4, name: 'M5', item: 'https://zasupport.com/logic-board-repair/macbook-pro-m5' },
  ],
};

const faqSchema = buildFaqSchema(faqs);

export default function MacBookProM5LogicBoardPage() {
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
            { label: 'M5' },
          ]} />
          <div className="mt-8 max-w-4xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#E8F4F1] leading-tight mb-6">
              MacBook Pro M5 Logic Board Repair
              <br /><span className="text-[#0FEA7A]">Johannesburg</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-4 max-w-3xl leading-relaxed">
              MacBook Pro M5 logic board repair in Johannesburg costs from R599 to assess and most repairs complete in 3-5 business days. The M5, M5 Pro and M5 Max (14-inch and 16-inch, 2026) are new, so the faults we see are accidental surge, liquid and drop damage that Apple’s warranty does not cover. We repair these at component level in our Hyde Park workshop, for far less than a full-board replacement.
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
              <a href={buildWhatsAppUrl('LBR-MACBOOKPROM5', 'logic-board')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 hover:shadow-[0_0_32px_rgba(15,234,122,0.4)] transition-all" >
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
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-4">MacBook Pro M5 Logic Board Faults We Repair</h2>
          <p className="text-[#7A9E98] mb-8 leading-relaxed">Because the M5 MacBook Pro is the newest in the lineup, the boards reaching our Hyde Park bench are almost all accidental-damage cases, exactly the faults a manufacturer warranty excludes. The M5 SoC is sealed and not chip-level replaceable, but the power-management system, Thunderbolt 5 controllers, MagSafe 3 charging circuit and XDR backlight driver are discrete components we repair at board level.</p>
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
          <FAQAccordion items={faqs} title="MacBook Pro M5 Logic Board Repair, Common Questions" />
        </div>
      </section>

      <section className="py-8 sm:py-16 bg-[#111C1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#E8F4F1] mb-6">Related Repairs</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              { label: 'MacBook Pro M4 Repair', href: '/logic-board-repair/macbook-pro-m4' },
              { label: 'MacBook Air M5 Repair', href: '/logic-board-repair/macbook-air-m5' },
              { label: 'MacBook Pro 14-inch', href: '/logic-board-repair/macbook-pro-14-inch' },
              { label: 'MacBook Pro 16-inch', href: '/logic-board-repair/macbook-pro-16-inch' },
              { label: 'All MacBook Pro Repair', href: '/logic-board-repair/macbook-pro' },
              { label: 'Logic Board Hub', href: '/logic-board-repair' },
              { label: 'Liquid Damage Repair', href: '/liquid-damage' },
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
            <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3">M5 MacBook Pro Surge or Spill? Assessment from R599.</h2>
            <p className="text-[#7A9E98] mb-6">Accidental damage Apple won’t cover, repaired at component level with a 12-month written warranty. Collection from Sandton, Rosebank, Fourways, Bryanston, Midrand and Randburg.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={buildWhatsAppUrl('LBR-MACBOOKPROM5', 'logic-board')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 transition-all" >
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
