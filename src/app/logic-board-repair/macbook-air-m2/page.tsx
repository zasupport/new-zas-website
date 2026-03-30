import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, CheckCircle, ArrowRight, MapPin } from 'lucide-react';
import SchemaOrg from '@/components/seo/SchemaOrg';
import { buildFaqSchema, LOCAL_BUSINESS_PROVIDER } from '@/lib/schema';
import FAQAccordion from '@/components/ui/FAQ';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { CONTACT, buildWhatsAppUrl } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'MacBook Air M2 Logic Board Repair Johannesburg | ZA Support',
  description: 'MacBook Air M2 logic board repair in Johannesburg. No power, MagSafe 2 charging, USB-C, black screen, liquid damage. New chassis design. Component-level repair. Assessment from R599.',
  alternates: { canonical: 'https://zasupport.com/logic-board-repair/macbook-air-m2' },
};

const faults = [
  { fault: 'No Power / Dead MacBook Air M2', desc: 'The MacBook Air M2 (mid 2022) introduced a completely redesigned chassis with MagSafe 2 charging alongside two USB-C Thunderbolt ports. Power delivery failures affecting the MagSafe 2 controller or the CD3217B USB-C controller prevent the M2 SoC from receiving power. Load shedding surges are the leading cause of this fault in South Africa, typically damaging the power management IC on the shared charge controller path.' },
  { fault: 'MagSafe 2 Charging Not Working', desc: 'The MacBook Air M2 was the first MacBook Air to reintroduce MagSafe after the USB-C-only generation. The MagSafe 2 connector is an active charging port with a separate charge controller path from the USB-C ports. MagSafe-specific charging failure while USB-C continues to function typically indicates damage to the MagSafe 2 controller circuit or the connector itself.' },
  { fault: 'USB-C / Thunderbolt Port Failure', desc: 'The MacBook Air M2 has two Thunderbolt 3 USB-C ports on the left side. Individual port failures — preventing charging, data transfer, or display output on that port — typically indicate port-level damage or a discrete controller fault. Diagnosis determines whether the fault is at the port or at the shared Thunderbolt controller IC.' },
  { fault: 'Black Screen / Liquid Crystal Display Fault', desc: 'The MacBook Air M2 uses a Liquid Retina IPS display without ProMotion. The backlight circuit is driven by a discrete backlight IC. Failure of this IC or the associated fuse causes a black screen while the M2 chip continues to run. The redesigned M2 Air chassis routes display cables differently from the M1 Air, making display circuit faults a generation-specific repair.' },
  { fault: 'Liquid Damage', desc: 'The MacBook Air M2 redesigned chassis has different liquid ingress pathways compared to the M1 Air. The top row of keys over the display area and the MagSafe 2 port are primary entry points. Liquid reaching the logic board most commonly affects the MagSafe 2 controller, USB-C controller, and power management circuits first. The new thermal architecture in the M2 Air distributes heat differently, which affects how liquid damage spreads on the board.' },
  { fault: 'Notch Display / Camera Fault', desc: 'The MacBook Air M2 was the first MacBook Air with a notch in the display, housing the 1080p FaceTime camera. Camera faults — failing to be detected, black video output, or image distortion — can result from liquid damage to the camera module or from physical display damage. These are distinct from logic board faults and assessed separately.' },
];

const faqs = [
  { question: 'Can the MacBook Air M2 logic board be repaired?', answer: 'Yes. The M2 chip is integrated on the MacBook Air M2 logic board and cannot be replaced as an individual part — but all surrounding circuits are component-level repairable. MagSafe 2 charge controllers, USB-C Thunderbolt 3 controllers, power management ICs, display backlight drivers, and audio circuits are all discrete components we diagnose and repair at ZA Support in Hyde Park, Johannesburg. Assessment from R599.' },
  { question: 'Does the new M2 MacBook Air chassis make repair harder?', answer: 'The MacBook Air M2 introduced a completely new chassis design in 2022, distinct from the M1 Air. The logic board layout, cable routing, and connector placements differ from prior generations. Our workshop has been trained on the M2 Air chassis specifically. The core component-level repair approach is the same — the chassis change does not affect repairability, it simply requires generation-specific knowledge.' },
  { question: 'My MacBook Air M2 MagSafe is not working — can it be repaired?', answer: 'Yes. MagSafe 2 charging failure on the MacBook Air M2 is typically a controller IC fault rather than a physical port failure. The MagSafe 2 circuit is discrete and repairable. If USB-C charging continues to function while MagSafe is dead, the fault is isolated to the MagSafe-specific charge path. Assessment from R599 confirms the exact fault before any repair.' },
  { question: 'My MacBook Air M2 was damaged by a load shedding power surge — is it repairable?', answer: 'In most cases yes. Power surges from South African load shedding events typically damage the charge controller IC (MagSafe 2 or USB-C) rather than the M2 die itself. The R599 assessment identifies the specific damaged component. Given the M2 Air\'s dual-path charging (MagSafe 2 and USB-C), surges entering via the USB-C port and surges entering via the MagSafe 2 cable have different damage profiles — both are assessable and typically repairable.' },
  { question: 'How much does MacBook Air M2 logic board repair cost?', answer: 'Apple charges R18,000–R40,000 for logic board replacement on the MacBook Air M2 as they replace the entire board assembly. ZA Support repairs only the specific failed component at a fraction of that cost. A written quote with the exact repair cost is provided after the R599 assessment confirming the fault.' },
  { question: 'How long does MacBook Air M2 logic board repair take?', answer: 'After the R599 assessment and your written approval, most MacBook Air M2 logic board repairs are completed within 3–5 business days. Liquid damage cases requiring ultrasonic cleaning may take slightly longer depending on the extent of corrosion. We provide a specific timeline in the written quote.' },
  { question: 'Will my data be safe during M2 MacBook Air board repair?', answer: 'Yes. Component-level board repair does not require erasing or removing the SSD. The storage remains on the M2 Air board throughout the repair process. If the board is completely non-functional, SSD readability is assessed as part of the R599 diagnostic and confirmed before any repair proceeds.' },
  { question: 'Does ZA Support collect MacBook Air M2 for repair in Johannesburg?', answer: 'Yes. We collect from Sandton, Rosebank, Fourways, Bryanston, Midrand, Randburg, and surrounding Johannesburg suburbs. WhatsApp 064 529 5863 to arrange same-day collection.' },
];

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'MacBook Air M2 Logic Board Repair Johannesburg',
  description: 'Component-level MacBook Air M2 logic board repair in Johannesburg. MagSafe 2, USB-C, display faults. Assessment from R599.',
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
    { '@type': 'ListItem', position: 4, name: 'M2', item: 'https://zasupport.com/logic-board-repair/macbook-air-m2' },
  ],
};

const faqSchema = buildFaqSchema(faqs);

export default function MacBookAirM2LogicBoardPage() {
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
            { label: 'M2' },
          ]} />
          <div className="mt-8 max-w-4xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#E8F4F1] leading-tight mb-6">
              MacBook Air M2 Logic Board Repair
              <br /><span className="text-[#0FEA7A]">Johannesburg</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-4 max-w-3xl leading-relaxed">
              Component-level repair for the MacBook Air M2 (mid 2022). MagSafe 2 charging failures, USB-C Thunderbolt faults, no power, Liquid Retina display issues, and liquid damage repaired in Hyde Park, Johannesburg. Specialists in the new-chassis M2 Air architecture.
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
              <a href={buildWhatsAppUrl('LBR-MACBOOKAIRM2', 'logic-board')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 hover:shadow-[0_0_32px_rgba(15,234,122,0.4)] transition-all" >
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
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-4">MacBook Air M2 Logic Board Faults We Repair</h2>
          <p className="text-[#7A9E98] mb-8 leading-relaxed">The MacBook Air M2 (2022) was a landmark redesign — thinner, lighter, and with MagSafe 2 returning to the Air line for the first time since 2019. The new chassis introduced different liquid ingress patterns and a reshaped logic board compared to the M1 Air. The M2 SoC is integrated with unified memory and cannot be replaced individually, but all surrounding discrete circuits — power management, MagSafe 2 controller, USB-C Thunderbolt 3 controllers, and display backlight — are fully component-level repairable at our Hyde Park workshop.</p>
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
          <FAQAccordion items={faqs} title="MacBook Air M2 Logic Board Repair — Common Questions" />
        </div>
      </section>

      <section className="py-8 sm:py-16 bg-[#111C1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#E8F4F1] mb-6">Related Repairs</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              { label: 'MacBook Air M1', href: '/logic-board-repair/macbook-air-m1' },
              { label: 'MacBook Pro M2 Repair', href: '/logic-board-repair/macbook-pro-m2' },
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
            <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3">MacBook Air M2 Fault? Assessment from R599.</h2>
            <p className="text-[#7A9E98] mb-6">Collection from Sandton, Rosebank, Fourways, Bryanston, Midrand, and Randburg. No Fix No Fee.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={buildWhatsAppUrl('LBR-MACBOOKAIRM2', 'logic-board')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 transition-all" >
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
