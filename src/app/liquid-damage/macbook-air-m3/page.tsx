import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, CheckCircle, ArrowRight, MapPin } from 'lucide-react';
import SchemaOrg from '@/components/seo/SchemaOrg';
import { buildFaqSchema, LOCAL_BUSINESS_PROVIDER } from '@/lib/schema';
import FAQAccordion from '@/components/ui/FAQ';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { CONTACT, buildWhatsAppUrl } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'MacBook Air M3 Liquid Damage Repair Johannesburg 2026 | ZA Support',
  description: 'MacBook Air M3 liquid damage repair in Johannesburg. Coffee spills, water damage, condensation. Ultrasonic cleaning and component-level board repair. Assessment from R599. No Fix No Fee.',
  alternates: { canonical: 'https://zasupport.com/liquid-damage/macbook-air-m3' },
};

const faults = [
  { fault: 'Coffee or Tea Spill', desc: 'The MacBook Air M3 shares the same thin chassis design as the M2 Air, and coffee spills through the keyboard reach the logic board within seconds. Coffee is particularly destructive because it contains acids and sugars that accelerate corrosion. In our Hyde Park workshop we see more coffee-damaged M3 Airs than any other liquid type. The MagSafe 3 controller and the left-side USB-C ports sit directly below the most common spill paths.' },
  { fault: 'Rain or Condensation Damage', desc: 'Johannesburg thunderstorms and humidity cause a specific pattern of liquid damage we see regularly. Condensation inside a bag after moving between air-conditioned offices and outdoor heat settles on the logic board over hours. Unlike a sudden spill, condensation damage is slow and progressive — often not noticed until corrosion has spread across multiple power rails on the M3 board.' },
  { fault: 'MagSafe 3 Port Liquid Ingress', desc: 'The MagSafe 3 port on the MacBook Air M3 sits on the left edge where liquid pools when a laptop is tilted. Liquid entering through the MagSafe 3 connector reaches the charge controller circuit first. We have seen M3 Airs that charge via USB-C but not MagSafe after a spill — a clear sign of MagSafe controller corrosion that is repairable at component level.' },
  { fault: 'USB-C Port Liquid Ingress', desc: 'Both USB-C Thunderbolt 3 ports on the MacBook Air M3 are on the left side, directly below the keyboard. Liquid tracking down the left edge enters these ports and damages the CD3217B USB-C controller IC. Port-specific charging failure after a spill is a component-level repair — the controller is replaced, not the entire board.' },
  { fault: 'Delayed Corrosion (Days After Spill)', desc: 'The most dangerous scenario we encounter. A small spill appears to cause no damage — the MacBook Air M3 keeps working for days or weeks. But residual moisture trapped under BGA chips and shielding slowly corrodes solder joints and traces. By the time symptoms appear, corrosion may have spread across multiple circuits. This is why we always recommend assessment immediately after any liquid contact, even if the machine seems fine.' },
  { fault: 'Speaker Grille Liquid Entry', desc: 'The MacBook Air M3 has speaker grilles along the keyboard sides that provide a direct path to the logic board. Small amounts of liquid — a splash from a water bottle, rain droplets — enter through these grilles and settle on the board. The M3 Air lacks the internal liquid barriers found in some MacBook Pro models, making speaker grille entry particularly effective at reaching critical components.' },
];

const faqs = [
  { question: 'Can a liquid-damaged MacBook Air M3 be repaired?', answer: 'Yes, in most cases. The M3 chip itself is highly resistant to liquid damage — it is the surrounding discrete components (charge controllers, power management ICs, USB-C controllers) that fail. These are all component-level repairable at our Hyde Park workshop. Success rate depends on how quickly the board reaches us after the spill and the type of liquid involved. Assessment from R599.' },
  { question: 'How much does MacBook Air M3 liquid damage repair cost?', answer: 'Assessment from R599 determines the extent of damage. Repair cost depends on how many components need replacement — a single corroded charge controller is significantly less than multiple power rail repairs. Apple charges R18,000–R45,000 for a board replacement after liquid damage. We repair only the damaged components at a fraction of that cost. Written quote before any work proceeds.' },
  { question: 'My MacBook Air M3 got wet but still works — should I bring it in?', answer: 'Yes, immediately. Liquid damage is progressive — corrosion continues even after the liquid dries. We see M3 Airs that worked fine for weeks after a spill before failing suddenly. Ultrasonic cleaning within 48 hours of the spill dramatically improves the long-term outcome. Waiting costs more in the end.' },
  { question: 'What is ultrasonic cleaning for liquid damage?', answer: 'We remove the MacBook Air M3 logic board and submerge it in a professional ultrasonic cleaning bath. High-frequency sound waves dislodge corrosion, dissolved sugars, and mineral deposits from under components where manual cleaning cannot reach. After ultrasonic cleaning, we inspect under magnification for damaged components and replace them individually.' },
  { question: 'Does liquid damage void my Apple warranty?', answer: 'Apple considers liquid damage accidental and does not cover it under standard warranty or AppleCare. Apple uses liquid contact indicators (LCIs) inside the MacBook Air M3 that change colour on contact with moisture. Once triggered, Apple will only offer a full board replacement at R18,000–R45,000. Our component-level repair is not constrained by these indicators — we repair the actual damaged components.' },
  { question: 'How long does MacBook Air M3 liquid damage repair take?', answer: 'Ultrasonic cleaning takes 24 hours including drying time. Component-level repair after cleaning typically adds 2–4 business days depending on the extent of corrosion. Total turnaround is usually 3–5 business days. Severe cases requiring multiple component replacements may take up to 7 business days. We provide a specific timeline with the written quote.' },
  { question: 'Is my data safe after liquid damage?', answer: 'In most cases yes. The M3 chip integrates storage on-die, and the chip itself is remarkably resistant to liquid damage. As long as the M3 die is not physically cracked, your data is typically accessible after the surrounding circuits are repaired. Data recovery assessment is included in the R599 diagnostic.' },
  { question: 'Do you collect liquid-damaged MacBooks from Johannesburg suburbs?', answer: 'Yes — same-day collection from Sandton, Rosebank, Fourways, Bryanston, Midrand, Randburg, Parktown North, Greenside, Craighall, and surrounding areas. For liquid damage, speed matters. WhatsApp 064 529 5863 to arrange immediate collection.' },
];

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'MacBook Air M3 Liquid Damage Repair Johannesburg',
  description: 'Ultrasonic cleaning and component-level repair for liquid-damaged MacBook Air M3. Assessment from R599. No Fix No Fee.',
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
    { '@type': 'ListItem', position: 4, name: 'M3', item: 'https://zasupport.com/liquid-damage/macbook-air-m3' },
  ],
};

const faqSchema = buildFaqSchema(faqs);

export default function MacBookAirM3LiquidDamagePage() {
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
            { label: 'M3' },
          ]} />
          <div className="mt-8 max-w-4xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#E8F4F1] leading-tight mb-6">
              MacBook Air M3 Liquid Damage Repair
              <br /><span className="text-[#0FEA7A]">Johannesburg</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-4 max-w-3xl leading-relaxed">
              Ultrasonic cleaning and component-level board repair for liquid-damaged MacBook Air M3. Coffee spills, water damage, condensation, and rain exposure. The MacBook Air M3 shares the M2 Air chassis — we know exactly where liquid reaches the board and which components fail first. Assessment from R599 at our Hyde Park workshop.
            </p>
            <div className="flex items-center gap-2 text-[#7A9E98] text-sm mb-8">
              <MapPin className="w-4 h-4 text-[#0FEA7A]" />
              <span>Hyde Park, Johannesburg | Assessment from R599 | Same-day collection from Sandton, Rosebank, Fourways, Bryanston</span>
            </div>
            <div className="flex flex-wrap gap-4 mb-8">
              {['Ultrasonic Cleaning', 'Component-Level Repair', 'No Fix No Fee', 'Assessment from R599'].map((l) => (
                <div key={l} className="flex items-center gap-2 bg-[rgba(15,234,122,0.08)] border border-[rgba(15,234,122,0.15)] px-4 py-2 rounded-full">
                  <CheckCircle className="w-4 h-4 text-[#0FEA7A]" />
                  <span className="text-[#E8F4F1] text-sm font-medium">{l}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href={buildWhatsAppUrl('LD-MACBOOKAIRM3', 'liquid-damage')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 hover:shadow-[0_0_32px_rgba(15,234,122,0.4)] transition-all">
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
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-4">MacBook Air M3 Liquid Damage Scenarios We Repair</h2>
          <p className="text-[#7A9E98] mb-8 leading-relaxed">The MacBook Air M3 (2024) uses the same chassis as the M2 Air — meaning identical liquid ingress pathways. We have repaired dozens of M2 and M3 Airs since this chassis launched in 2022 and know exactly which components sit in the path of liquid entry from the keyboard, MagSafe 3 port, and speaker grilles. The M3 chip is built on TSMC 3nm and is remarkably resilient — it is the surrounding discrete components that fail and that we repair.</p>
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
          <FAQAccordion items={faqs} title="MacBook Air M3 Liquid Damage Repair — Common Questions" />
        </div>
      </section>

      <section className="py-8 sm:py-16 bg-[#111C1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#E8F4F1] mb-6">Related Repairs</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              { label: 'MacBook Air M2 Liquid Damage', href: '/liquid-damage/macbook-air-m2' },
              { label: 'MacBook Air M1 Liquid Damage', href: '/liquid-damage/macbook-air-m1' },
              { label: 'MacBook Pro M3 Liquid Damage', href: '/liquid-damage/macbook-pro-m3' },
              { label: 'MacBook Air M3 Logic Board', href: '/logic-board-repair/macbook-air-m3' },
              { label: 'Liquid Damage Hub', href: '/liquid-damage' },
              { label: 'Logic Board Repair', href: '/logic-board-repair' },
              { label: 'Battery Replacement', href: '/battery-replacement' },
              { label: 'Sandton Liquid Damage', href: '/liquid-damage/sandton' },
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
            <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3">MacBook Air M3 Liquid Damage? Time matters.</h2>
            <p className="text-[#7A9E98] mb-6">Same-day collection. Ultrasonic cleaning. Assessment from R599. No Fix No Fee.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={buildWhatsAppUrl('LD-MACBOOKAIRM3', 'liquid-damage')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 transition-all">
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
