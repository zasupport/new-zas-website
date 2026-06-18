import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, CheckCircle, ArrowRight, MapPin } from 'lucide-react';
import SchemaOrg from '@/components/seo/SchemaOrg';
import { buildFaqSchema, LOCAL_BUSINESS_PROVIDER } from '@/lib/schema';
import FAQAccordion from '@/components/ui/FAQ';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { CONTACT, buildWhatsAppUrl } from '@/lib/constants';

export const metadata: Metadata = {
  // clean title (no manual "| ZA Support", layout template adds it once; avoids the
  // doubled-suffix bug present on older model pages). Keyword-first, ~58 chars.
  title: 'MacBook Pro M4 Logic Board Repair Johannesburg',
  description: 'MacBook Pro M4, M4 Pro, M4 Max (14-inch & 16-inch, 2024) logic board repair in Johannesburg. Thunderbolt 5, MagSafe 3, no power, charging, XDR display, liquid damage, component-level. Assessment from R599.',
  alternates: { canonical: 'https://zasupport.com/logic-board-repair/macbook-pro-m4' },
};

const faults = [
  { fault: 'No Power / Dead MacBook Pro M4', desc: 'The M4 MacBook Pro (14-inch and 16-inch, released November 2024) negotiates power across MagSafe 3 and its USB-C ports through a dedicated power-delivery controller. South African load-shedding surges most often damage this controller or the main power-management IC before the M4 SoC ever powers on. The board is dead, but the failed part is discrete and repairable.' },
  { fault: 'Charging Failure on MagSafe 3 and USB-C', desc: 'M4 Pro and M4 Max draw up to 140W over MagSafe 3 or USB-C. When both charging paths fail together, the fault sits in the shared power-management layer, not the individual ports, a component-level repair rather than a board swap.' },
  { fault: 'Thunderbolt 5 Port Failure (M4 Pro / M4 Max)', desc: 'The 14- and 16-inch M4 Pro and M4 Max are the Thunderbolt 5 models (the base M4 14-inch uses three Thunderbolt 4 ports). The Thunderbolt 5 controller is a discrete IC; ESD, liquid ingress, or a damaged port can disable one or all high-speed ports while the rest of the board works normally.' },
  { fault: 'Black Screen / Liquid Retina XDR Backlight Fault', desc: 'All M4 MacBook Pros use a mini-LED Liquid Retina XDR display with ProMotion. A blown backlight fuse or TCON fault leaves the M4 running with a black screen, confirmed by an external-monitor test. The backlight driver is a board-level component we replace without touching the panel.' },
  { fault: 'Liquid Damage', desc: 'On the M4 MacBook Pro the keyboard remains the main liquid entry point, and spills reach the left-side I/O cluster, Thunderbolt controller and power-management ICs, first. Ultrasonic cleaning within the first 24 hours markedly improves recovery; we assess corrosion spread as part of the R599 diagnostic.' },
  { fault: 'Fans at Full Speed / Thermal Sensor Fault', desc: 'The M4 14-inch and 16-inch use active cooling. The SMC sets fan speed from thermal sensors across the M4 die and power circuitry; a failed sensor IC or damaged SMC line drives the fans to maximum regardless of load. This is a board-level fault, not a worn fan.' },
];

const faqs = [
  { question: 'How much does MacBook Pro M4 logic board repair cost in Johannesburg?', answer: 'Apple replaces the entire board, which is far more expensive than repairing the failed component. ZA Support repairs only the part that failed on your existing board, so the cost is significantly lower. After the R599 assessment we give a written, fixed-price quote before any work begins. The exact price depends on which circuit failed.' },
  { question: 'Can a MacBook Pro M4 logic board actually be repaired?', answer: 'Yes. The M4, M4 Pro and M4 Max chips are a single integrated SoC that no one can replace at chip level, but the surrounding circuits can. USB-C and Thunderbolt 5 controllers, power-management ICs, MagSafe 3 charging circuits and the XDR backlight driver are all discrete parts we diagnose and repair at component level in our Hyde Park workshop. Assessment from R599.' },
  { question: 'My M4 MacBook Pro died after a load-shedding surge, is it fixable?', answer: 'Usually, yes. Surge spikes typically take out the USB-C power controller or power-management IC, not the M4 die itself, and those are discrete repairable components. The R599 assessment confirms which circuit was hit and whether repair is viable before you commit.' },
  { question: 'Will my data be safe during M4 MacBook Pro board repair?', answer: 'Yes. Component-level repair does not remove or erase the soldered SSD, your storage stays on the board untouched while we repair the specific fault. If the board is completely dead, SSD readability is checked as part of the R599 diagnostic.' },
  { question: 'How long does M4 MacBook Pro logic board repair take?', answer: 'After the R599 assessment and your written approval, most M4 MacBook Pro board repairs finish within 3-5 business days. Multi-area liquid damage can take longer; the written quote states the timeline before we start.' },
  { question: 'Is the M4 harder to repair than M1, M2 or M3?', answer: 'The component-level approach is the same. The M4 Pro and M4 Max add a Thunderbolt 5 controller (a discrete, individually repairable IC) over the M3 generation, but the power, charging, display-backlight and liquid-damage repairs are handled exactly as on earlier Apple Silicon boards.' },
  { question: 'Do you collect an M4 MacBook Pro for repair?', answer: 'Yes. We collect from Sandton, Rosebank, Fourways, Bryanston, Midrand, Randburg and surrounding Johannesburg suburbs. WhatsApp 064 529 5863 to arrange same-day collection.' },
];

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'MacBook Pro M4 Logic Board Repair Johannesburg',
  description: 'Component-level MacBook Pro M4, M4 Pro, M4 Max logic board repair in Johannesburg. Assessment from R599.',
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
    { '@type': 'ListItem', position: 4, name: 'M4', item: 'https://zasupport.com/logic-board-repair/macbook-pro-m4' },
  ],
};

const faqSchema = buildFaqSchema(faqs);

export default function MacBookProM4LogicBoardPage() {
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
            { label: 'M4' },
          ]} />
          <div className="mt-8 max-w-4xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#E8F4F1] leading-tight mb-6">
              MacBook Pro M4 Logic Board Repair
              <br /><span className="text-[#0FEA7A]">Johannesburg</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-4 max-w-3xl leading-relaxed">
              MacBook Pro M4 logic board repair in Johannesburg costs from R599 to assess and most repairs complete in 3-5 business days, far less than Apple’s full-board replacement. We repair the M4, M4 Pro and M4 Max (14-inch and 16-inch, 2024) at component level: no power, MagSafe 3 and USB-C charging, Thunderbolt 5, XDR backlight and liquid damage, in our Hyde Park workshop.
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
              <a href={buildWhatsAppUrl('LBR-MACBOOKPROM4', 'logic-board')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 hover:shadow-[0_0_32px_rgba(15,234,122,0.4)] transition-all" >
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
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-4">MacBook Pro M4 Logic Board Faults We Repair</h2>
          <p className="text-[#7A9E98] mb-8 leading-relaxed">The M4 MacBook Pro is the most powerful Apple Silicon laptop in the workshop today, and at 1-2 years old the first out-of-warranty surge and liquid cases are now reaching us. The M4 die, RAM and Neural Engine are a sealed SoC that cannot be replaced individually, but the power-management system, Thunderbolt 5 controllers, MagSafe 3 charging circuits and XDR backlight driver are discrete components we diagnose and repair at board level in Johannesburg.</p>
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
          <FAQAccordion items={faqs} title="MacBook Pro M4 Logic Board Repair, Common Questions" />
        </div>
      </section>

      <section className="py-8 sm:py-16 bg-[#111C1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#E8F4F1] mb-6">Related Repairs</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              { label: 'MacBook Pro M3 Repair', href: '/logic-board-repair/macbook-pro-m3' },
              { label: 'MacBook Pro M5 Repair', href: '/logic-board-repair/macbook-pro-m5' },
              { label: 'MacBook Air M4 Repair', href: '/logic-board-repair/macbook-air-m4' },
              { label: 'MacBook Pro 14-inch', href: '/logic-board-repair/macbook-pro-14-inch' },
              { label: 'MacBook Pro 16-inch', href: '/logic-board-repair/macbook-pro-16-inch' },
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
            <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3">MacBook Pro M4 Fault? Assessment from R599.</h2>
            <p className="text-[#7A9E98] mb-6">Component-level repair with a 12-month written warranty. Collection from Sandton, Rosebank, Fourways, Bryanston, Midrand and Randburg.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={buildWhatsAppUrl('LBR-MACBOOKPROM4', 'logic-board')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 transition-all" >
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
