import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, CheckCircle, ArrowRight, MapPin } from 'lucide-react';
import SchemaOrg from '@/components/seo/SchemaOrg';
import { buildFaqSchema, LOCAL_BUSINESS_PROVIDER } from '@/lib/schema';
import FAQAccordion from '@/components/ui/FAQ';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { CONTACT, buildWhatsAppUrl } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'MacBook Air M5 Liquid Damage Repair Johannesburg',
  description: 'MacBook Air M5 (13-inch & 15-inch, 2026) liquid damage repair in Johannesburg. Coffee spills, water, condensation, Wi-Fi loss after liquid. Ultrasonic cleaning and component-level board repair. No Fix No Fee, assessment fee may apply.',
  alternates: { canonical: 'https://zasupport.com/liquid-damage/macbook-air-m5' },
};

const faults = [
  { fault: 'Coffee or Tea Spill', desc: 'The fanless M5 MacBook Air (2026) has a thin chassis with no internal liquid barriers, so a coffee spill through the keyboard reaches the logic board in seconds. Coffee’s acids and sugars accelerate corrosion. The MagSafe 3 controller and the two left-side USB-C ports sit directly below the most common spill paths. Liquid damage is not covered by Apple’s warranty, so a spilled M5 Air is an out-of-pocket case at Apple, or a component-level repair with us.' },
  { fault: 'Rain or Condensation Damage', desc: 'Johannesburg humidity and winter temperature swings cause slow, progressive corrosion. Condensation settling inside a bag between an air-conditioned office and outdoor heat creeps across the M5 board over hours, often unnoticed until multiple power rails are affected.' },
  { fault: 'Wi-Fi / Bluetooth Loss After Liquid (N1 Chip)', desc: 'The M5 Air uses Apple’s N1 wireless chip for Wi-Fi 7 and Bluetooth, soldered to the logic board. Liquid reaching the N1 or its antenna circuitry causes Wi-Fi or Bluetooth to drop out or disappear, a distinctive M5-era symptom. We diagnose and repair the affected board circuitry rather than replacing the whole board.' },
  { fault: 'MagSafe 3 and USB-C Liquid Ingress', desc: 'Liquid pooling on the left edge enters the MagSafe 3 connector and the two Thunderbolt 4 ports, reaching the charge-controller circuit first. An M5 Air that charges on one path but not another after a spill is showing controller corrosion, a component-level repair, not a board swap.' },
  { fault: 'Delayed Corrosion (Days After the Spill)', desc: 'The most dangerous case. A small spill seems harmless and the M5 Air keeps working for days, but moisture trapped under BGA chips and shielding slowly corrodes solder joints and traces. By the time symptoms appear, damage may span several circuits, which is why we recommend an assessment immediately after any liquid contact.' },
  { fault: 'Speaker-Grille Liquid Entry', desc: 'The M5 Air has speaker grilles along the keyboard sides that lead straight to the logic board. A splash from a water bottle or rain droplets enters through these grilles and settles on the board. The slim fanless chassis lacks internal liquid barriers, making grille entry an effective path to critical components.' },
];

const faqs = [
  { question: 'My M5 Air is new, can liquid damage still be repaired?', answer: 'Yes, in most cases, and liquid damage is exactly the kind of fault Apple’s warranty excludes, so it is worth repairing rather than paying Apple for a full board. The M5 chip resists liquid well; it is the surrounding components (charge controllers, power-management ICs, USB-C controllers, the N1 wireless circuitry) that fail, and those are component-level repairable in our Hyde Park workshop. No fee for the repair if we cannot fix it; an assessment fee may apply.' },
  { question: 'How much does MacBook Air M5 liquid damage repair cost?', answer: 'The cost depends on how many components need replacement, a single corroded controller is far less than multiple power-rail repairs. Apple replaces the whole board after liquid damage, which costs far more than a component-level repair. We repair only the damaged parts and give a written quote before any work proceeds. An assessment fee (R599) may apply, and there is no fee for the repair attempt if we cannot fix it.' },
  { question: 'My M5 Air lost Wi-Fi after a spill, is that liquid damage?', answer: 'Often, yes. The M5 Air’s N1 wireless chip and its antenna circuitry sit on the logic board, and liquid reaching that area causes Wi-Fi 7 or Bluetooth to fail. We clean and repair the affected board circuitry at component level rather than replacing the entire board. The assessment confirms it.' },
  { question: 'My M5 Air got wet but still works, should I bring it in?', answer: 'Yes, immediately. Liquid damage is progressive, corrosion continues after the liquid dries. We see machines that worked for weeks after a spill before failing suddenly. Ultrasonic cleaning within 48 hours of the spill dramatically improves the outcome; waiting costs more in the end.' },
  { question: 'Does liquid damage void my Apple warranty?', answer: 'Apple treats liquid damage as accidental and does not cover it under the standard warranty or AppleCare. Liquid contact indicators inside the M5 Air change colour on contact with moisture; once triggered, Apple will only offer a full board replacement. Our component-level repair is not constrained by those indicators, we repair the actual damaged components.' },
  { question: 'How long does M5 Air liquid damage repair take?', answer: 'Ultrasonic cleaning takes about 24 hours including drying. Component-level repair after cleaning typically adds 2-4 business days depending on corrosion, so total turnaround is usually 3-5 business days. Severe multi-component cases can take up to 7. The written quote states the timeline.' },
  { question: 'Is my data safe after liquid damage?', answer: 'In most cases yes. The M5 chip integrates storage on-die and resists liquid well. As long as the M5 die is not physically cracked, your data is typically accessible once the surrounding circuits are repaired. A data-recovery assessment is included in the diagnostic.' },
  { question: 'Do you collect liquid-damaged MacBooks from Johannesburg suburbs?', answer: 'Yes, same-day collection from Sandton, Rosebank, Fourways, Bryanston, Midrand, Randburg, Parktown North, Greenside, Craighall and surrounding areas. For liquid damage, speed matters. WhatsApp 064 529 5863 to arrange immediate collection.' },
];

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'MacBook Air M5 Liquid Damage Repair Johannesburg',
  description: 'Ultrasonic cleaning and component-level repair for liquid-damaged MacBook Air M5 in Johannesburg.',
  provider: LOCAL_BUSINESS_PROVIDER,
  areaServed: { '@type': 'City', name: 'Johannesburg' },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://zasupport.com' },
    { '@type': 'ListItem', position: 2, name: 'Liquid Damage', item: 'https://zasupport.com/liquid-damage' },
    { '@type': 'ListItem', position: 3, name: 'MacBook Air', item: 'https://zasupport.com/liquid-damage/macbook-air' },
    { '@type': 'ListItem', position: 4, name: 'M5', item: 'https://zasupport.com/liquid-damage/macbook-air-m5' },
  ],
};

const faqSchema = buildFaqSchema(faqs);

export default function MacBookAirM5LiquidDamagePage() {
  return (
    <>
      <SchemaOrg schema={faqSchema} />
      <SchemaOrg schema={serviceSchema} />
      <SchemaOrg schema={breadcrumbSchema} />

      <section className="hero-gradient grid-overlay pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[
            { label: 'Liquid Damage', href: '/liquid-damage' },
            { label: 'MacBook Air', href: '/liquid-damage/macbook-air' },
            { label: 'M5' },
          ]} />
          <div className="mt-8 max-w-4xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#E8F4F1] leading-tight mb-6">
              MacBook Air M5 Liquid Damage Repair
              <br /><span className="text-[#0FEA7A]">Johannesburg</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-4 max-w-3xl leading-relaxed">
              Spilled liquid on your new M5 MacBook Air? Liquid damage is not covered by Apple’s warranty, but it is repairable. We ultrasonically clean and repair the 13-inch and 15-inch M5 Air (2026) at component level in our Hyde Park workshop: coffee and water spills, condensation, MagSafe 3 and USB-C ingress, and Wi-Fi loss from the N1 chip. No fee for the repair if we cannot fix it, an assessment fee may apply.
            </p>
            <div className="flex items-center gap-2 text-[#7A9E98] text-sm mb-8">
              <MapPin className="w-4 h-4 text-[#0FEA7A]" />
              <span>Hyde Park, Johannesburg | Same-day collection from Sandton, Rosebank, Fourways, Bryanston, Midrand, Randburg</span>
            </div>
            <div className="flex flex-wrap gap-4 mb-8">
              {['Ultrasonic Cleaning', 'Component-Level Repair', 'No Fix No Fee', 'Assessment Fee May Apply'].map((l) => (
                <div key={l} className="flex items-center gap-2 bg-[rgba(15,234,122,0.08)] border border-[rgba(15,234,122,0.15)] px-4 py-2 rounded-full">
                  <CheckCircle className="w-4 h-4 text-[#0FEA7A]" />
                  <span className="text-[#E8F4F1] text-sm font-medium">{l}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href={buildWhatsAppUrl('LIQ-MACBOOKAIRM5', 'liquid-damage')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 hover:shadow-[0_0_32px_rgba(15,234,122,0.4)] transition-all" >
                WhatsApp for Quote
              </a>
              <a href={`tel:${CONTACT.phoneTel}`} className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all">
                <Phone className="w-5 h-5" /> Call {CONTACT.phone}
              </a>
              <Link href="/liquid-damage" className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.2)] text-[#7A9E98] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[rgba(15,234,122,0.05)] transition-all">
                All Liquid Damage Repair <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-4">MacBook Air M5 Liquid Damage Scenarios We Repair</h2>
          <p className="text-[#7A9E98] mb-8 leading-relaxed">As the newest MacBook Air, the M5 reaches our Hyde Park bench almost entirely as accidental damage, and liquid is the most common. The M5 SoC is sealed and not chip-level replaceable, but the charge controllers, power-management ICs, USB-C controllers and the N1 wireless circuitry are all discrete components we ultrasonically clean and repair at board level.</p>
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
          <FAQAccordion items={faqs} title="MacBook Air M5 Liquid Damage Repair, Common Questions" />
        </div>
      </section>

      <section className="py-8 sm:py-16 bg-[#111C1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#E8F4F1] mb-6">Related Repairs</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              { label: 'MacBook Air M4 Liquid Damage', href: '/liquid-damage/macbook-air-m4' },
              { label: 'MacBook Pro M5 Liquid Damage', href: '/liquid-damage/macbook-pro-m5' },
              { label: 'All MacBook Air Liquid Damage', href: '/liquid-damage/macbook-air' },
              { label: 'Liquid Damage Hub', href: '/liquid-damage' },
              { label: 'MacBook Air M5 Logic Board', href: '/logic-board-repair/macbook-air-m5' },
              { label: 'Sandton Liquid Damage', href: '/liquid-damage/sandton' },
              { label: 'Rosebank Liquid Damage', href: '/liquid-damage/rosebank' },
              { label: 'Fourways Liquid Damage', href: '/liquid-damage/fourways' },
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
            <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3">Spilled Liquid on Your M5 Air? Act Fast.</h2>
            <p className="text-[#7A9E98] mb-6">Ultrasonic cleaning and component-level repair with a 12-month written warranty. No fee for the repair if we cannot fix it, an assessment fee may apply. Same-day collection from Sandton, Rosebank, Fourways, Bryanston, Midrand and Randburg.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={buildWhatsAppUrl('LIQ-MACBOOKAIRM5', 'liquid-damage')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 transition-all" >
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
