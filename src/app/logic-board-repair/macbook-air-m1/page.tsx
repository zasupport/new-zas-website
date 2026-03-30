import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, CheckCircle, ArrowRight, MapPin } from 'lucide-react';
import SchemaOrg from '@/components/seo/SchemaOrg';
import { buildFaqSchema, LOCAL_BUSINESS_PROVIDER } from '@/lib/schema';
import FAQAccordion from '@/components/ui/FAQ';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { CONTACT, buildWhatsAppUrl } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'MacBook Air M1 Logic Board Repair Johannesburg | ZA Support',
  description: 'MacBook Air M1 logic board repair in Johannesburg. No power, USB-C charging faults, black screen, liquid damage. Fanless design means no active cooling failures. Assessment from R599.',
  alternates: { canonical: 'https://zasupport.com/logic-board-repair/macbook-air-m1' },
};

const faults = [
  { fault: 'No Power / Dead MacBook Air M1', desc: 'The MacBook Air M1 (late 2020) charges exclusively via USB-C on both the left-side ports. The CD3217 USB-C controller manages power negotiation for both ports. A load shedding power surge or liquid exposure affecting this controller leaves the MacBook Air M1 completely unresponsive to all chargers. This is the most common M1 Air fault we see in our Hyde Park workshop.' },
  { fault: 'USB-C Charging Not Working', desc: 'Both USB-C ports on the MacBook Air M1 can charge the machine. Port-specific charging failure — where one port charges but the other does not — typically indicates physical port damage or a localised fault on that port\'s power delivery path. Failure on both ports simultaneously points to the shared charge controller IC.' },
  { fault: 'Black Screen / Display Fault', desc: 'The MacBook Air M1 uses an IPS Liquid Retina display without ProMotion. The backlight circuit is simpler than the MacBook Pro mini-LED architecture but still driven by a dedicated backlight IC. Fuse failure or backlight IC damage causes a black screen while the M1 chip continues to run. An external monitor test distinguishes backlight failure from a board-level fault.' },
  { fault: 'Liquid Damage', desc: 'The MacBook Air M1\'s fanless design means the chassis is more sealed than the MacBook Pro, but liquid still enters via the keyboard ventilation slots and USB-C port cavities. Coffee and water spills targeting the left-side I/O cluster most commonly affect the USB-C controller and power management ICs. The M1 SoC is rarely the primary victim of liquid damage.' },
  { fault: 'Thunderbolt / USB-C Not Detecting Devices', desc: 'The MacBook Air M1 supports Thunderbolt 3 on both USB-C ports. A failed Thunderbolt controller prevents docking stations, external displays, and high-speed storage from being detected on the affected port. The controller is a discrete IC on the M1 Air logic board and is repairable without full board replacement.' },
  { fault: 'No Audio / Headphone Jack Fault', desc: 'The MacBook Air M1 includes a 3.5mm headphone jack driven by a discrete audio codec IC. Liquid damage to this IC or physical damage to the headphone socket commonly causes audio failure. In some cases, the fault prevents both speakers and headphone output simultaneously, indicating the shared audio codec rather than the individual output path.' },
];

const faqs = [
  { question: 'Can the MacBook Air M1 logic board be repaired?', answer: 'Yes. The M1 chip is integrated on the MacBook Air M1 logic board and cannot be replaced individually — but the surrounding circuits are entirely repairable. USB-C charge controllers, Thunderbolt 3 controllers, display backlight drivers, audio codecs, and power management ICs are all discrete components we diagnose and repair at component level. ZA Support in Hyde Park, Johannesburg offers assessment from R599.' },
  { question: 'Is the MacBook Air M1 easier to repair than MacBook Pro M1?', answer: 'The MacBook Air M1 and MacBook Pro M1 share a similar chip architecture and many of the same logic board components. The Air\'s fanless design removes one failure mode (fan controller) but the core power delivery, USB-C, and display circuits are comparable. Neither is significantly harder than the other at component level. Repairability is similar.' },
  { question: 'My MacBook Air M1 has no power after a load shedding surge — can it be repaired?', answer: 'In most cases yes. Load shedding power surges are one of the most frequent causes of MacBook Air M1 faults we see in Johannesburg. The surge typically damages the CD3217 USB-C controller — a discrete IC — rather than the M1 die. The R599 assessment identifies the specific damaged component and confirms repair viability before any work begins.' },
  { question: 'Will my data survive MacBook Air M1 logic board repair?', answer: 'Yes. Component-level board repair does not involve erasing or removing the SSD. The storage remains on the M1 Air board throughout the repair process. If the board is completely non-functional, SSD readability is assessed as part of the R599 diagnostic and reported before any decision is made.' },
  { question: 'How much does MacBook Air M1 logic board repair cost compared to Apple?', answer: 'Apple charges R15,000–R35,000 for logic board replacement on the MacBook Air M1, as they replace the entire board assembly. ZA Support replaces only the specific failed component, which is significantly less expensive. A written quote with the exact repair cost is provided after the R599 assessment.' },
  { question: 'How long does MacBook Air M1 logic board repair take?', answer: 'After the R599 assessment and your written approval, most MacBook Air M1 logic board repairs are completed within 3–5 business days. Liquid damage cases requiring ultrasonic cleaning and multi-circuit assessment may take slightly longer. We provide a specific timeline in the written quote.' },
  { question: 'Does the fanless design of the M1 MacBook Air affect repairability?', answer: 'The fanless design of the MacBook Air M1 removes the fan controller failure mode found in MacBook Pro models. However, the passive thermal management relies on the chassis itself — sustained heavy workloads can lead to thermal stress on the M1 and surrounding power delivery components over time. The logic board\'s core repairability is unaffected by the fanless design.' },
  { question: 'Does ZA Support collect MacBook Air M1 for repair in Johannesburg?', answer: 'Yes. ZA Support collects from Sandton, Rosebank, Fourways, Bryanston, Midrand, Randburg, and surrounding Johannesburg suburbs. WhatsApp 064 529 5863 to arrange same-day collection.' },
];

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'MacBook Air M1 Logic Board Repair Johannesburg',
  description: 'Component-level MacBook Air M1 logic board repair in Johannesburg. Assessment from R599.',
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
    { '@type': 'ListItem', position: 4, name: 'M1', item: 'https://zasupport.com/logic-board-repair/macbook-air-m1' },
  ],
};

const faqSchema = buildFaqSchema(faqs);

export default function MacBookAirM1LogicBoardPage() {
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
            { label: 'M1' },
          ]} />
          <div className="mt-8 max-w-4xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#E8F4F1] leading-tight mb-6">
              MacBook Air M1 Logic Board Repair
              <br /><span className="text-[#0FEA7A]">Johannesburg</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-4 max-w-3xl leading-relaxed">
              Component-level repair for the MacBook Air M1 (late 2020). USB-C charging failures, no power, Thunderbolt faults, black screen, liquid damage, and audio faults repaired in Hyde Park, Johannesburg. Fanless design assessed with specialised passive thermal diagnostic.
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
              <a href={buildWhatsAppUrl('LBR-MACBOOKAIRM1', 'logic-board')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 hover:shadow-[0_0_32px_rgba(15,234,122,0.4)] transition-all" >
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
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-4">MacBook Air M1 Logic Board Faults We Repair</h2>
          <p className="text-[#7A9E98] mb-8 leading-relaxed">The MacBook Air M1 was the first Apple Silicon Mac, launching in November 2020. Its fanless design set it apart from MacBook Pro models but the core logic board architecture — M1 SoC integrated with unified memory, CD3217 USB-C controller, Thunderbolt 3 controller, and display backlight driver — is fundamentally the same as the M1 MacBook Pro. All discrete circuits surrounding the M1 die are component-level repairable at our Hyde Park workshop.</p>
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
          <FAQAccordion items={faqs} title="MacBook Air M1 Logic Board Repair — Common Questions" />
        </div>
      </section>

      <section className="py-8 sm:py-16 bg-[#111C1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#E8F4F1] mb-6">Related Repairs</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              { label: 'MacBook Air M2', href: '/logic-board-repair/macbook-air-m2' },
              { label: 'MacBook Pro M1 Repair', href: '/logic-board-repair/macbook-pro-m1' },
              { label: 'MacBook Pro 13-inch', href: '/logic-board-repair/macbook-pro-13-inch' },
              { label: 'All MacBook Air Repair', href: '/logic-board-repair/macbook-air' },
              { label: 'Logic Board Hub', href: '/logic-board-repair' },
              { label: 'Liquid Damage Repair', href: '/liquid-damage' },
              { label: 'Battery Replacement', href: '/battery-replacement' },
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
            <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3">MacBook Air M1 Fault? Assessment from R599.</h2>
            <p className="text-[#7A9E98] mb-6">Collection from Sandton, Rosebank, Fourways, Bryanston, Midrand, and Randburg. No Fix No Fee.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={buildWhatsAppUrl('LBR-MACBOOKAIRM1', 'logic-board')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 transition-all" >
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
