import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, CheckCircle, ArrowRight, MapPin } from 'lucide-react';
import SchemaOrg from '@/components/seo/SchemaOrg';
import { buildFaqSchema, LOCAL_BUSINESS_PROVIDER } from '@/lib/schema';
import FAQAccordion from '@/components/ui/FAQ';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { CONTACT, buildWhatsAppUrl } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'MacBook Air M4 Logic Board Repair Johannesburg',
  description: 'MacBook Air M4 (13-inch & 15-inch, 2025) logic board repair in Johannesburg. No power, MagSafe 3 and USB-C charging, Thunderbolt 4, display and liquid damage — component-level. Assessment from R599.',
  alternates: { canonical: 'https://zasupport.com/logic-board-repair/macbook-air-m4' },
};

const faults = [
  { fault: 'No Power / Dead MacBook Air M4', desc: 'The fanless M4 MacBook Air (13-inch and 15-inch, March 2025) runs power through a USB-C / MagSafe 3 power-delivery controller and a main power-management IC. Load-shedding surges damage these first, leaving the Air completely dead while the M4 SoC itself is undamaged — a discrete, repairable fault.' },
  { fault: 'Charging Failure (MagSafe 3 / USB-C)', desc: 'The M4 Air charges over MagSafe 3 or either of its two USB-C ports, all sharing one power-management layer. When charging stops on every input at once, the fault is in that shared circuit, not the individual ports — repaired at component level rather than replacing the board.' },
  { fault: 'Thunderbolt 4 / USB-C Port Failure', desc: 'The M4 Air has two Thunderbolt 4 (USB-C) ports — there is no Thunderbolt 5 on the Air. Because there are only two ports, a single failed USB-C controller can knock out both data and charging on one side. ESD and liquid ingress are the usual causes; the controller is a discrete IC we replace on the board.' },
  { fault: 'Black Screen / Liquid Retina Display Fault', desc: 'The M4 Air uses a standard Liquid Retina LED-backlit display (not the mini-LED XDR of the Pro). A blown backlight fuse or backlight-driver fault leaves the Air running with a black screen — confirmed by an external monitor. The backlight driver is a board-level component repaired without replacing the panel.' },
  { fault: 'Liquid Damage', desc: 'On the fanless Air the keyboard is the main liquid entry point, and because the board sits close under the top case, spills reach the power and I/O circuitry quickly. Early ultrasonic cleaning — ideally within 24 hours — gives the best recovery odds. Corrosion spread is assessed in the R599 diagnostic.' },
  { fault: 'Overheating / Thermal Throttling (no fan)', desc: 'The M4 Air has no fan — it cools through a heat spreader against the chassis. Persistent throttling, sudden shutdowns or heat-related instability often trace to a thermal-sensor fault or a power-circuit problem on the board rather than the SoC, and are diagnosed at component level.' },
];

const faqs = [
  { question: 'How much does MacBook Air M4 logic board repair cost in Johannesburg?', answer: 'Apple replaces the whole board, which costs far more than a component-level repair. ZA Support repairs only the part that failed — component-level MacBook Air repairs start from R2,500 depending on the fault. After the R599 assessment we give a written, fixed-price quote before any work begins.' },
  { question: 'Can a MacBook Air M4 logic board be repaired?', answer: 'Yes. The M4 chip is a sealed SoC that cannot be replaced at chip level — but the surrounding circuits can. USB-C / Thunderbolt 4 controllers, the MagSafe 3 charging circuit, power-management ICs and the display backlight driver are all discrete components we repair at board level in our Hyde Park workshop. Assessment from R599.' },
  { question: 'My M4 Air died after a power surge — is it fixable?', answer: 'Usually, yes. Surges typically damage the USB-C power controller or power-management IC, not the M4 die — both are discrete repairable parts. The R599 assessment confirms exactly which circuit failed and whether repair is viable before you commit.' },
  { question: 'Will my data be safe during M4 Air board repair?', answer: 'Yes. Component-level repair does not remove or erase the soldered SSD — your data stays on the board while we fix the specific fault. If the board is completely dead, SSD readability is assessed in the R599 diagnostic.' },
  { question: 'How long does M4 Air logic board repair take?', answer: 'After the R599 assessment and your written approval, most M4 Air board repairs complete within 24–72 hours for common power and charging faults. Liquid-damage cases can take longer; the written quote states the timeline before we start.' },
  { question: 'The M4 Air has no fan — does that change repairs?', answer: 'It changes the symptoms, not the method. With no fan, heat-related faults usually point to a thermal sensor or power circuit on the board rather than a cooling part. We diagnose the actual failed component and repair it; there is no fan to replace.' },
  { question: 'Do you collect an M4 MacBook Air for repair?', answer: 'Yes. We collect from Sandton, Rosebank, Fourways, Bryanston, Midrand, Randburg and surrounding Johannesburg suburbs. WhatsApp 064 529 5863 to arrange same-day collection.' },
];

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'MacBook Air M4 Logic Board Repair Johannesburg',
  description: 'Component-level MacBook Air M4 logic board repair in Johannesburg. Assessment from R599.',
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
    { '@type': 'ListItem', position: 4, name: 'M4', item: 'https://zasupport.com/logic-board-repair/macbook-air-m4' },
  ],
};

const faqSchema = buildFaqSchema(faqs);

export default function MacBookAirM4LogicBoardPage() {
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
            { label: 'M4' },
          ]} />
          <div className="mt-8 max-w-4xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#E8F4F1] leading-tight mb-6">
              MacBook Air M4 Logic Board Repair
              <br /><span className="text-[#0FEA7A]">Johannesburg</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-4 max-w-3xl leading-relaxed">
              MacBook Air M4 logic board repair in Johannesburg costs from R599 to assess, with component-level repairs from R2,500 and most common faults turned around in 24–72 hours — far less than Apple’s full-board replacement. We repair the 13-inch and 15-inch M4 Air (2025) at board level: no power, MagSafe 3 and USB-C charging, Thunderbolt 4 and liquid damage, in our Hyde Park workshop.
            </p>
            <div className="flex items-center gap-2 text-[#7A9E98] text-sm mb-8">
              <MapPin className="w-4 h-4 text-[#0FEA7A]" />
              <span>Hyde Park, Johannesburg | Assessment from R599 | Collection from Sandton, Rosebank, Fourways, Bryanston, Midrand, Randburg</span>
            </div>
            <div className="flex flex-wrap gap-4 mb-8">
              {['Component-Level Repair', '12-Month Written Warranty', 'Data Stays on the Board', 'Assessment from R599'].map((l) => (
                <div key={l} className="flex items-center gap-2 bg-[rgba(15,234,122,0.08)] border border-[rgba(15,234,122,0.15)] px-4 py-2 rounded-full">
                  <CheckCircle className="w-4 h-4 text-[#0FEA7A]" />
                  <span className="text-[#E8F4F1] text-sm font-medium">{l}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href={buildWhatsAppUrl('LBR-MACBOOKAIRM4', 'logic-board')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 hover:shadow-[0_0_32px_rgba(15,234,122,0.4)] transition-all" >
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
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-4">MacBook Air M4 Logic Board Faults We Repair</h2>
          <p className="text-[#7A9E98] mb-8 leading-relaxed">The fanless M4 Air is the most common new MacBook in Johannesburg homes and offices, which makes its boards some of the ones we see most after surges and spills. The M4 SoC is sealed and not chip-level replaceable — but the power-management system, USB-C / Thunderbolt 4 controllers, MagSafe 3 charging circuit and display backlight driver are discrete components we repair at board level.</p>
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
          <FAQAccordion items={faqs} title="MacBook Air M4 Logic Board Repair — Common Questions" />
        </div>
      </section>

      <section className="py-8 sm:py-16 bg-[#111C1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#E8F4F1] mb-6">Related Repairs</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              { label: 'MacBook Air M3 Repair', href: '/logic-board-repair/macbook-air-m3' },
              { label: 'MacBook Air M5 Repair', href: '/logic-board-repair/macbook-air-m5' },
              { label: 'MacBook Pro M4 Repair', href: '/logic-board-repair/macbook-pro-m4' },
              { label: 'All MacBook Air Repair', href: '/logic-board-repair/macbook-air' },
              { label: 'Logic Board Hub', href: '/logic-board-repair' },
              { label: 'Liquid Damage Repair', href: '/liquid-damage' },
              { label: 'Sandton Logic Board', href: '/logic-board-repair/sandton' },
              { label: 'Rosebank Logic Board', href: '/logic-board-repair/rosebank' },
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
            <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3">MacBook Air M4 Fault? Assessment from R599.</h2>
            <p className="text-[#7A9E98] mb-6">Component-level repair from R2,500 with a 12-month written warranty. Collection from Sandton, Rosebank, Fourways, Bryanston, Midrand and Randburg.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={buildWhatsAppUrl('LBR-MACBOOKAIRM4', 'logic-board')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 transition-all" >
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
