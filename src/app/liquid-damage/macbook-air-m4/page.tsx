import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, CheckCircle, ArrowRight, MapPin } from 'lucide-react';
import SchemaOrg from '@/components/seo/SchemaOrg';
import { buildFaqSchema, LOCAL_BUSINESS_PROVIDER } from '@/lib/schema';
import FAQAccordion from '@/components/ui/FAQ';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { CONTACT, buildWhatsAppUrl } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'MacBook Air M4 Liquid Damage Repair Johannesburg',
  description: 'MacBook Air M4 (13-inch & 15-inch, 2025) liquid damage repair in Johannesburg. Coffee spills, water, condensation. Ultrasonic cleaning and component-level board repair. No Fix No Fee, assessment fee may apply.',
  alternates: { canonical: 'https://zasupport.com/liquid-damage/macbook-air-m4' },
};

const faults = [
  { fault: 'Coffee or Tea Spill', desc: 'The fanless M4 MacBook Air (2025) has the same slim chassis as the M3 Air, so a coffee spill through the keyboard reaches the logic board within seconds. Coffee is especially destructive, its acids and sugars accelerate corrosion. The MagSafe 3 controller and the two left-side USB-C ports sit directly below the most common spill paths. We see more coffee-damaged Airs than any other liquid type in our Hyde Park workshop.' },
  { fault: 'Rain or Condensation Damage', desc: 'Johannesburg humidity and winter temperature swings cause a slow, progressive damage pattern. Condensation settling inside a bag between an air-conditioned office and outdoor heat creeps across the M4 board over hours. Unlike a sudden spill, it is often unnoticed until corrosion has already spread across multiple power rails.' },
  { fault: 'MagSafe 3 Port Liquid Ingress', desc: 'The MagSafe 3 port sits on the left edge of the M4 Air where liquid pools when the laptop is tilted. Liquid entering the connector reaches the charge-controller circuit first. An M4 Air that charges over USB-C but not MagSafe after a spill is showing MagSafe controller corrosion, a component-level repair, not a board swap.' },
  { fault: 'USB-C Port Liquid Ingress', desc: 'Both Thunderbolt 4 USB-C ports on the M4 Air are on the left side, directly below the keyboard. Liquid tracking down the left edge damages the USB-C controller IC. With only two ports, a single corroded controller can take out both charging and data on that side, the controller is replaced, not the whole board.' },
  { fault: 'Delayed Corrosion (Days After the Spill)', desc: 'The most dangerous case. A small spill seems harmless and the M4 Air keeps working for days, but moisture trapped under BGA chips and shielding slowly corrodes solder joints and traces. By the time symptoms appear, damage may span several circuits. This is why we recommend an assessment immediately after any liquid contact, even if the machine seems fine.' },
  { fault: 'Speaker Grille Liquid Entry', desc: 'The M4 Air has speaker grilles along the keyboard sides that lead straight to the logic board. A splash from a water bottle or rain droplets enters through these grilles and settles on the board. The thin fanless chassis lacks internal liquid barriers, making grille entry an effective path to critical components.' },
];

const faqs = [
  { question: 'Can a liquid-damaged MacBook Air M4 be repaired?', answer: 'Yes, in most cases. The M4 chip itself resists liquid well, it is the surrounding discrete components (charge controllers, power-management ICs, USB-C controllers) that fail, and those are component-level repairable in our Hyde Park workshop. Success depends on how quickly the board reaches us after the spill and the type of liquid. No fee for the repair if we cannot fix it; an assessment fee may apply.' },
  { question: 'How much does MacBook Air M4 liquid damage repair cost?', answer: 'The cost depends on how many components need replacement, a single corroded charge controller is far less than multiple power-rail repairs. Apple replaces the whole board after liquid damage, which costs far more than a component-level repair. We repair only the damaged components and give a written quote before any work proceeds. An assessment fee (R599) may apply, and there is no fee for the repair attempt if we cannot fix it.' },
  { question: 'My M4 Air got wet but still works, should I bring it in?', answer: 'Yes, immediately. Liquid damage is progressive, corrosion continues after the liquid dries. We see Airs that worked for weeks after a spill before failing suddenly. Ultrasonic cleaning within 48 hours of the spill dramatically improves the long-term outcome; waiting costs more in the end.' },
  { question: 'What is ultrasonic cleaning?', answer: 'We remove the M4 Air logic board and submerge it in a professional ultrasonic bath. High-frequency sound waves dislodge corrosion, dissolved sugars and mineral deposits from under components where manual cleaning cannot reach. We then inspect under magnification and replace any damaged components individually.' },
  { question: 'Does liquid damage void my Apple warranty?', answer: 'Apple treats liquid damage as accidental and does not cover it under the standard warranty or AppleCare. Liquid contact indicators inside the M4 Air change colour on contact with moisture; once triggered, Apple will only offer a full board replacement. Our component-level repair is not constrained by those indicators, we repair the actual damaged components.' },
  { question: 'How long does M4 Air liquid damage repair take?', answer: 'Ultrasonic cleaning takes about 24 hours including drying. Component-level repair after cleaning typically adds 2-4 business days depending on the corrosion, so total turnaround is usually 3-5 business days. Severe multi-component cases can take up to 7. The written quote states the timeline.' },
  { question: 'Is my data safe after liquid damage?', answer: 'In most cases yes. The M4 chip integrates storage on-die and resists liquid well. As long as the M4 die is not physically cracked, your data is typically accessible once the surrounding circuits are repaired. A data-recovery assessment is included in the diagnostic.' },
  { question: 'Do you collect liquid-damaged MacBooks from Johannesburg suburbs?', answer: 'Yes, same-day collection from Sandton, Rosebank, Fourways, Bryanston, Midrand, Randburg, Parktown North, Greenside, Craighall and surrounding areas. For liquid damage, speed matters. WhatsApp 064 529 5863 to arrange immediate collection.' },
];

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'MacBook Air M4 Liquid Damage Repair Johannesburg',
  description: 'Ultrasonic cleaning and component-level repair for liquid-damaged MacBook Air M4 in Johannesburg.',
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
    { '@type': 'ListItem', position: 4, name: 'M4', item: 'https://zasupport.com/liquid-damage/macbook-air-m4' },
  ],
};

const faqSchema = buildFaqSchema(faqs);

export default function MacBookAirM4LiquidDamagePage() {
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
            { label: 'M4' },
          ]} />
          <div className="mt-8 max-w-4xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#E8F4F1] leading-tight mb-6">
              MacBook Air M4 Liquid Damage Repair
              <br /><span className="text-[#0FEA7A]">Johannesburg</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-4 max-w-3xl leading-relaxed">
              Spilled liquid on your M4 MacBook Air? Bring it in fast, corrosion spreads for days after a spill. We ultrasonically clean and repair the 13-inch and 15-inch M4 Air (2025) at component level in our Hyde Park workshop: coffee and water spills, condensation, MagSafe 3 and USB-C ingress. No fee for the repair if we cannot fix it, an assessment fee may apply.
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
              <a href={buildWhatsAppUrl('LIQ-MACBOOKAIRM4', 'liquid-damage')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 hover:shadow-[0_0_32px_rgba(15,234,122,0.4)] transition-all" >
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
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-4">MacBook Air M4 Liquid Damage Scenarios We Repair</h2>
          <p className="text-[#7A9E98] mb-8 leading-relaxed">The fanless M4 Air is the most common new MacBook in Johannesburg homes and offices, so we see a steady stream of spilled and rained-on boards. The M4 SoC is sealed and not chip-level replaceable, but the charge controllers, power-management ICs, USB-C controllers and board traces are all discrete components we ultrasonically clean and repair at board level.</p>
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
          <FAQAccordion items={faqs} title="MacBook Air M4 Liquid Damage Repair, Common Questions" />
        </div>
      </section>

      <section className="py-8 sm:py-16 bg-[#111C1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#E8F4F1] mb-6">Related Repairs</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              { label: 'MacBook Air M3 Liquid Damage', href: '/liquid-damage/macbook-air-m3' },
              { label: 'MacBook Air M5 Liquid Damage', href: '/liquid-damage/macbook-air-m5' },
              { label: 'MacBook Pro M4 Liquid Damage', href: '/liquid-damage/macbook-pro-m4' },
              { label: 'All MacBook Air Liquid Damage', href: '/liquid-damage/macbook-air' },
              { label: 'Liquid Damage Hub', href: '/liquid-damage' },
              { label: 'MacBook Air M4 Logic Board', href: '/logic-board-repair/macbook-air-m4' },
              { label: 'Sandton Liquid Damage', href: '/liquid-damage/sandton' },
              { label: 'Rosebank Liquid Damage', href: '/liquid-damage/rosebank' },
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
            <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3">Spilled Liquid on Your M4 Air? Act Fast.</h2>
            <p className="text-[#7A9E98] mb-6">Ultrasonic cleaning and component-level repair with a 12-month written warranty. No fee for the repair if we cannot fix it, an assessment fee may apply. Same-day collection from Sandton, Rosebank, Fourways, Bryanston, Midrand and Randburg.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={buildWhatsAppUrl('LIQ-MACBOOKAIRM4', 'liquid-damage')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 transition-all" >
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
