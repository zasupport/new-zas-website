import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, CheckCircle, ArrowRight, MapPin } from 'lucide-react';
import SchemaOrg from '@/components/seo/SchemaOrg';
import { buildFaqSchema, LOCAL_BUSINESS_PROVIDER } from '@/lib/schema';
import FAQAccordion from '@/components/ui/FAQ';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { CONTACT } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'MacBook Pro M3 Logic Board Repair Johannesburg | ZA Support',
  description: 'MacBook Pro M3, M3 Pro, M3 Max logic board repair in Johannesburg. Charging, no power, display, USB-C, Thunderbolt 5, liquid damage. Component-level repair. Assessment from R599.',
  alternates: { canonical: 'https://zasupport.com/logic-board-repair/macbook-pro-m3' },
};

const faults = [
  { fault: 'No Power / Dead MacBook Pro M3', desc: 'The M3 MacBook Pro (2023 14-inch and 16-inch) uses an advanced USB-C power delivery architecture. The CD3217B USB-C controller manages power negotiation between MagSafe 3 and Thunderbolt 5 ports. Load shedding power surges frequently damage this controller, preventing the M3 SoC from receiving initial power.' },
  { fault: 'USB-C and MagSafe 3 Charging Failure', desc: 'The M3 Pro and M3 Max support 140W charging via MagSafe 3 or Thunderbolt 5 USB-C. Both paths share a power management IC. Charging failure on both ports simultaneously points to the shared power management layer rather than individual port damage.' },
  { fault: 'Black Screen / ProMotion Display Fault', desc: 'The M3 14-inch and 16-inch both feature ProMotion XDR displays drawing peak 120Hz refresh. A dedicated backlight IC drives the mini-LED backlight array. Fuse failure or TCON damage causes a black screen while the M3 SoC continues running. External monitor test confirms the fault.' },
  { fault: 'Thunderbolt 5 / USB-C Port Failure', desc: 'The M3 Max is the first MacBook Pro to include Thunderbolt 5, offering 120Gbps bandwidth. The Thunderbolt controller is a discrete IC on the logic board. Physical port damage, ESD events, or liquid ingress can disable one or all Thunderbolt 5 ports independently.' },
  { fault: 'Liquid Damage', desc: 'The keyboard area remains the primary liquid entry point on the M3 MacBook Pro. Liquid damage typically reaches the left-side I/O cluster first, affecting the Thunderbolt controller and power management ICs. Ultrasonic cleaning within the first 24 hours significantly improves recovery rates.' },
  { fault: 'Fan Running Continuously at Full Speed', desc: 'The M3 MacBook Pro 14-inch and 16-inch have active cooling systems. The SMC controls fan speed based on thermal sensor readings across the M3 die and power delivery circuitry. A failed thermal sensor IC or damaged SMC circuit causes fans to run at maximum speed regardless of load.' },
];

const faqs = [
  { question: 'Can a MacBook Pro M3 logic board be repaired?', answer: 'Yes. The M3, M3 Pro, and M3 Max chips are fully integrated on the logic board and cannot be replaced individually — but the surrounding circuits are repairable. USB-C controllers, Thunderbolt 5 controllers, power management ICs, backlight drivers, and charging circuits are all discrete components we diagnose and repair at component level. ZA Support in Hyde Park, Johannesburg offers assessment from R599.' },
  { question: 'Is the M3 MacBook Pro harder to repair than M1 or M2?', answer: 'The M3 generation introduces Thunderbolt 5 on M3 Max models and a more capable power delivery system. The fundamental component-level repair approach is the same as M1 and M2. The additional Thunderbolt 5 controller is a discrete IC and is individually repairable. Repairability is comparable to prior generations.' },
  { question: 'My M3 MacBook Pro was damaged in a load shedding surge — is it repairable?', answer: 'In most cases yes. Voltage spikes from South African load shedding events typically damage the USB-C power controller or power management IC rather than the M3 die itself. These are discrete, repairable components. The R599 assessment determines which specific circuit was damaged and confirms whether repair is viable.' },
  { question: 'Will my data be safe during M3 MacBook Pro board repair?', answer: 'Yes. Component-level board repair does not require erasing or removing the SSD. We repair the specific circuit fault while the storage remains on the board untouched. If the board is completely non-functional, SSD readability is assessed as part of the R599 diagnostic.' },
  { question: 'How much does MacBook Pro M3 logic board repair cost?', answer: 'Apple charges R22,000–R55,000 for M3 MacBook Pro logic board replacement as they replace the entire board. ZA Support repairs only the failed component on the existing board, which is significantly less expensive. We provide a written quote after the R599 assessment confirming the specific fault and cost.' },
  { question: 'How long does M3 MacBook Pro logic board repair take?', answer: 'Following the R599 assessment and written approval, most M3 MacBook Pro logic board repairs complete within 3–5 business days. Complex liquid damage cases involving multiple circuit areas may require additional time. We provide a specific timeline in the written quote before proceeding.' },
  { question: 'Does ZA Support repair Thunderbolt 5 faults on M3 MacBook Pro?', answer: 'Yes. The Thunderbolt 5 controller on M3 Max models is a discrete IC on the logic board. A failed controller preventing docking stations, external monitors, or high-speed storage from being detected is a component-level repair. Assessment from R599 confirms the fault and repair viability.' },
  { question: 'Does ZA Support collect M3 MacBook Pro for repair?', answer: 'Yes. We collect from Sandton, Rosebank, Fourways, Bryanston, Midrand, Randburg, and surrounding Johannesburg suburbs. WhatsApp 064 529 5863 to arrange same-day collection.' },
];

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'MacBook Pro M3 Logic Board Repair Johannesburg',
  description: 'Component-level MacBook Pro M3, M3 Pro, M3 Max logic board repair in Johannesburg. Assessment from R599.',
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
    { '@type': 'ListItem', position: 4, name: 'M3', item: 'https://zasupport.com/logic-board-repair/macbook-pro-m3' },
  ],
};

const faqSchema = buildFaqSchema(faqs);

export default function MacBookProM3LogicBoardPage() {
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
            { label: 'M3' },
          ]} />
          <div className="mt-8 max-w-4xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#E8F4F1] leading-tight mb-6">
              MacBook Pro M3 Logic Board Repair
              <br /><span className="text-[#0FEA7A]">Johannesburg</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-4 max-w-3xl leading-relaxed">
              Component-level repair for MacBook Pro M3 (14-inch and 16-inch, 2023), M3 Pro and M3 Max. Thunderbolt 5, MagSafe 3, ProMotion XDR display faults, no power, liquid damage, and USB-C failures repaired in Hyde Park.
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
              <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 hover:shadow-[0_0_32px_rgba(15,234,122,0.4)] transition-all">
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
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-4">MacBook Pro M3 Logic Board Faults We Repair</h2>
          <p className="text-[#7A9E98] mb-8 leading-relaxed">The M3 generation MacBook Pros represent the current peak of Apple Silicon performance. The M3 die, RAM, and Neural Engine are fully integrated and cannot be individually replaced — but the power management system, Thunderbolt 5 controllers, USB-C charging circuits, and display backlight drivers are all discrete components we can diagnose and repair at component level in Johannesburg.</p>
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
          <FAQAccordion items={faqs} title="MacBook Pro M3 Logic Board Repair — Common Questions" />
        </div>
      </section>

      <section className="py-8 sm:py-16 bg-[#111C1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#E8F4F1] mb-6">Related Repairs</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              { label: 'MacBook Pro M1 Repair', href: '/logic-board-repair/macbook-pro-m1' },
              { label: 'MacBook Pro M2 Repair', href: '/logic-board-repair/macbook-pro-m2' },
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
            <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3">MacBook Pro M3 Fault? Assessment from R599.</h2>
            <p className="text-[#7A9E98] mb-6">Collection from Sandton, Rosebank, Fourways, Bryanston, Midrand, and Randburg. No Fix No Fee.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 transition-all">
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
