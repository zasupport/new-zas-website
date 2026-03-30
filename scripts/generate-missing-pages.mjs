#!/usr/bin/env node
/**
 * Generate missing §194 priority pages:
 * - logic-board-repair suburbs (6)
 * - liquid-damage model + suburbs (7)
 * - battery-replacement model + suburbs (7)
 * - screen-repair suburbs (6)
 */
import { mkdirSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';

const BASE = join(import.meta.dirname, '..', 'src', 'app');

const SUBURBS = [
  { slug: 'parktown-north', name: 'Parktown North', dist: '6', time: '10–12', pascal: 'ParktownNorth' },
  { slug: 'greenside', name: 'Greenside', dist: '5', time: '8–12', pascal: 'Greenside' },
  { slug: 'craighall', name: 'Craighall', dist: '3', time: '5–8', pascal: 'Craighall' },
  { slug: 'linden', name: 'Linden', dist: '7', time: '12–15', pascal: 'Linden' },
  { slug: 'emmarentia', name: 'Emmarentia', dist: '6', time: '10–12', pascal: 'Emmarentia' },
  { slug: 'melville', name: 'Melville', dist: '8', time: '12–18', pascal: 'Melville' },
];

// ═══════════════════════════════════════════════
// LOGIC BOARD REPAIR — SUBURB PAGES
// ═══════════════════════════════════════════════
function genLogicBoardSuburb(s) {
  return `import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, CheckCircle, ArrowRight, MapPin } from 'lucide-react';
import SchemaOrg from '@/components/seo/SchemaOrg';
import { buildFaqSchema, LOCAL_BUSINESS_PROVIDER } from '@/lib/schema';
import FAQAccordion from '@/components/ui/FAQ';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { CONTACT, buildWhatsAppUrl } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'MacBook Logic Board Repair ${s.name} | ZA Support Hyde Park',
  description: 'MacBook logic board repair for ${s.name} clients. Component-level repair, assessment from R599. We collect from ${s.name}. No Fix No Fee. Call 064 529 5863.',
  alternates: { canonical: 'https://zasupport.com/logic-board-repair/${s.slug}' },
};

const faults = [
  { title: 'No Power', desc: 'MacBook shows no signs of life. We trace the power rail from the charging port through to the SoC power domain. The most common cause we see from ${s.name} clients is USB-C controller or power management IC damage from load shedding surges — South Africa\\'s grid instability accounts for roughly 35% of the no-power boards that arrive at our Hyde Park workshop.' },
  { title: 'No Display / Black Screen', desc: 'The machine boots — you can hear the startup chime or feel the trackpad click — but the screen stays black. In our experience this is usually a backlight fuse, display driver IC, or on older Intel models a GPU fault. We diagnose the exact failed component before quoting.' },
  { title: 'Liquid Damage', desc: 'Coffee, water, or condensation causes progressive corrosion on the logic board. We have seen boards from ${s.name} where a small spill two weeks earlier quietly corroded a power rail. Ultrasonic cleaning followed by targeted component replacement at board level. Time-critical — the sooner the board reaches us, the better the outcome.' },
  { title: 'USB-C / Thunderbolt Failure', desc: 'No charging, no data transfer, or no external display output on one or both USB-C ports. The CD3217 or similar controller IC is a discrete, replaceable component. We see this fault frequently after third-party charger use or load shedding events.' },
  { title: 'Overheating / Shutdown', desc: 'Unexpected shutdowns under load traced to failed voltage regulators, shorted capacitors, or thermal sensor faults on the logic board. Not a fan or thermal paste issue — a board-level electrical fault that requires component-level diagnosis.' },
  { title: 'Fan Running at Full Speed', desc: 'Continuous full-speed fan operation even at idle. This is an SMC or thermal sensor fault on the logic board — not dust buildup. The specific failed sensor or SMC component is identified and replaced. We repair this at component level rather than replacing the entire board.' },
];

const faqs = [
  {
    question: 'Do you collect MacBooks for logic board repair from ${s.name}?',
    answer: 'Yes. We collect from ${s.name} and the surrounding Johannesburg North area. ${s.name} is approximately ${s.dist} km from our Hyde Park workshop — roughly ${s.time} minutes by car. We collect, repair at our workshop at 1 Hyde Park Lane, and return once complete. WhatsApp 064 529 5863 to arrange same-day collection.',
  },
  {
    question: 'How far is ${s.name} from your Hyde Park workshop?',
    answer: 'Approximately ${s.dist} km — roughly ${s.time} minutes by car depending on traffic. ${s.name} is one of our regular collection areas in Johannesburg North.',
  },
  {
    question: 'What does MacBook logic board repair cost for ${s.name} clients?',
    answer: 'Assessment from R599. The repair cost depends on the specific fault — a written quote with the exact price is provided before any work proceeds. Component-level repair typically costs 60–80% less than Apple\\'s full board replacement. No Fix No Fee applies to all ${s.name} clients.',
  },
  {
    question: 'Can a MacBook logic board be repaired or does it need replacing?',
    answer: 'In most cases repaired. Component-level repair replaces only the failed IC, capacitor, or connector — not the entire board. Apple charges R15,000–R70,000 for a board replacement. We repair the specific failed component at a fraction of that cost, and your data stays intact.',
  },
  {
    question: 'My MacBook was damaged by a load shedding power surge — is it repairable?',
    answer: 'Yes, in most cases. Power surges typically damage the USB-C charge controller — a discrete, repairable IC. South African load shedding is the single most common cause of logic board faults we see. The R599 assessment confirms the specific damaged component before any commitment.',
  },
  {
    question: 'How long does MacBook logic board repair take?',
    answer: 'After the R599 assessment and your written approval, most repairs complete within 3–5 business days. Liquid damage cases requiring ultrasonic cleaning may take slightly longer. We provide a specific timeline in the written quote.',
  },
  {
    question: 'Is my data safe during logic board repair?',
    answer: 'Yes. Component-level board repair does not require erasing or removing the SSD. Your data remains on the board throughout the repair process. If the board is completely non-functional, SSD readability is assessed as part of the R599 diagnostic.',
  },
  {
    question: 'Do you offer No Fix No Fee for ${s.name} clients?',
    answer: 'Yes. If we cannot repair your MacBook after the assessment, you pay only the R599 assessment fee — not the full repair cost. This applies to all clients regardless of location. Collection from ${s.name} is included.',
  },
];

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'MacBook Logic Board Repair ${s.name}',
  description: 'Component-level MacBook logic board repair for ${s.name} clients. Assessment from R599. Collection included.',
  provider: LOCAL_BUSINESS_PROVIDER,
  areaServed: [
    { '@type': 'City', name: 'Johannesburg' },
    { '@type': 'Place', name: '${s.name}' },
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://zasupport.com' },
    { '@type': 'ListItem', position: 2, name: 'Logic Board Repair', item: 'https://zasupport.com/logic-board-repair' },
    { '@type': 'ListItem', position: 3, name: '${s.name}', item: 'https://zasupport.com/logic-board-repair/${s.slug}' },
  ],
};

const faqSchema = buildFaqSchema(faqs);

export default function LogicBoardRepair${s.pascal}Page() {
  return (
    <>
      <SchemaOrg schema={faqSchema} />
      <SchemaOrg schema={serviceSchema} />
      <SchemaOrg schema={breadcrumbSchema} />

      <section className="hero-gradient grid-overlay pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[
            { label: 'Logic Board Repair', href: '/logic-board-repair' },
            { label: '${s.name}' },
          ]} />
          <div className="mt-8 max-w-4xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#E8F4F1] leading-tight mb-6">
              MacBook Logic Board Repair
              <br /><span className="text-[#0FEA7A]">${s.name}</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-4 max-w-3xl leading-relaxed">
              Component-level MacBook logic board repair for ${s.name} clients. No power, charging faults, liquid damage, display failures, and USB-C faults repaired at our Hyde Park workshop. Collection from ${s.name} — approximately ${s.dist} km, ${s.time} minutes by car.
            </p>
            <div className="flex items-center gap-2 text-[#7A9E98] text-sm mb-8">
              <MapPin className="w-4 h-4 text-[#0FEA7A]" />
              <span>Hyde Park, Johannesburg | Assessment from R599 | Collecting from ${s.name} — approx ${s.time} min drive</span>
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
              <a href={buildWhatsAppUrl('LBR-${s.slug.toUpperCase().replace(/-/g, '')}', 'logic-board')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 hover:shadow-[0_0_32px_rgba(15,234,122,0.4)] transition-all">
                WhatsApp for Quote
              </a>
              <a href={\`tel:\${CONTACT.phoneTel}\`} className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all">
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
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-4">MacBook Logic Board Faults We Repair for ${s.name} Clients</h2>
          <p className="text-[#7A9E98] mb-8 leading-relaxed">${s.name} is approximately ${s.dist} km from our Hyde Park workshop — one of our regular collection areas in Johannesburg North. All MacBook models from 2015 onwards are covered — Intel and Apple Silicon. Every fault is assessed at component level with a written quote before any repair proceeds.</p>
          <div className="space-y-4">
            {faults.map((f) => (
              <div key={f.title} className="glass-card p-5">
                <h3 className="text-[#E8F4F1] font-bold mb-2">{f.title}</h3>
                <p className="text-[#7A9E98] text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQAccordion items={faqs} title={\`MacBook Logic Board Repair ${s.name} — Common Questions\`} />
        </div>
      </section>

      <section className="py-8 sm:py-16 bg-[#111C1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#E8F4F1] mb-6">Related Services</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              { label: 'Logic Board Hub', href: '/logic-board-repair' },
              { label: 'MacBook Pro M1', href: '/logic-board-repair/macbook-pro-m1' },
              { label: 'MacBook Pro M2', href: '/logic-board-repair/macbook-pro-m2' },
              { label: 'Liquid Damage ${s.name}', href: '/liquid-damage/${s.slug}' },
              { label: 'Battery Replacement ${s.name}', href: '/battery-replacement/${s.slug}' },
              { label: 'Screen Repair ${s.name}', href: '/screen-repair/${s.slug}' },
              { label: 'Liquid Damage Repair', href: '/liquid-damage' },
              { label: 'All MacBook Repair', href: '/macbook-repair' },
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
            <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3">MacBook Logic Board Fault? Assessment from R599.</h2>
            <p className="text-[#7A9E98] mb-6">Collecting from ${s.name}. No Fix No Fee.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={buildWhatsAppUrl('LBR-${s.slug.toUpperCase().replace(/-/g, '')}', 'logic-board')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 transition-all">
                WhatsApp for Quote
              </a>
              <a href={\`tel:\${CONTACT.phoneTel}\`} className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all">
                <Phone className="w-5 h-5" /> Call {CONTACT.phone}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
`;
}

// ═══════════════════════════════════════════════
// LIQUID DAMAGE — MODEL PAGE
// ═══════════════════════════════════════════════
function genLiquidDamageM3() {
  return `import type { Metadata } from 'next';
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
              <a href={\`tel:\${CONTACT.phoneTel}\`} className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all">
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
              <a href={\`tel:\${CONTACT.phoneTel}\`} className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all">
                <Phone className="w-5 h-5" /> Call {CONTACT.phone}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
`;
}

// ═══════════════════════════════════════════════
// LIQUID DAMAGE — SUBURB PAGES
// ═══════════════════════════════════════════════
function genLiquidDamageSuburb(s) {
  return `import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, CheckCircle, ArrowRight, MapPin } from 'lucide-react';
import SchemaOrg from '@/components/seo/SchemaOrg';
import { buildFaqSchema, LOCAL_BUSINESS_PROVIDER } from '@/lib/schema';
import FAQAccordion from '@/components/ui/FAQ';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { CONTACT, buildWhatsAppUrl } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'MacBook Liquid Damage Repair ${s.name} | ZA Support Hyde Park',
  description: 'MacBook liquid damage repair for ${s.name} clients. Ultrasonic cleaning, component-level board repair. Assessment from R599. Collection from ${s.name}. No Fix No Fee.',
  alternates: { canonical: 'https://zasupport.com/liquid-damage/${s.slug}' },
};

const faults = [
  { title: 'Coffee or Tea Spill', desc: 'The most common liquid damage we see from ${s.name} clients. Coffee contains acids and sugars that accelerate corrosion on the logic board far faster than clean water. Immediate assessment gives the best repair outcome — corrosion spreads hourly once the liquid dries.' },
  { title: 'Rain or Humidity Damage', desc: 'Johannesburg\\'s afternoon thunderstorms and summer humidity cause a pattern of damage we see frequently. Rain through an open bag or condensation from rapid temperature changes between air-conditioned offices and outdoor heat in ${s.name}. The damage is progressive and often invisible until symptoms appear days later.' },
  { title: 'Liquid Through Keyboard', desc: 'The keyboard is the primary liquid entry point on any MacBook. Liquid passes through the key mechanisms and reaches the logic board within seconds. On newer Apple Silicon Macs, the most vulnerable components — charge controllers and power management ICs — sit directly below the keyboard area.' },
  { title: 'USB-C Port Exposure', desc: 'Liquid entering through USB-C ports damages the charge controller IC. We see this after spills that pool on the left edge of the MacBook. Port-specific charging failure is a clear sign. The controller is a discrete, replaceable component — not a reason to replace the entire board.' },
  { title: 'Delayed Corrosion', desc: 'A small spill seems fine — the Mac keeps working. But trapped moisture under chips and shielding corrodes solder joints over days or weeks. Sudden failure two weeks after a spill is the most expensive scenario we encounter. We always recommend assessment within 48 hours of any liquid contact, even if everything appears normal.' },
  { title: 'Secondary Component Failure', desc: 'After an initial liquid damage event, other components can fail weeks or months later as corrosion continues to spread. We see ${s.name} clients return after an apparently successful home dry-out only to find additional circuits failing. Professional ultrasonic cleaning removes all corrosion — preventing the cascading failure pattern.' },
];

const faqs = [
  {
    question: 'Do you collect liquid-damaged MacBooks from ${s.name}?',
    answer: 'Yes — same-day collection from ${s.name}. For liquid damage, speed matters. ${s.name} is approximately ${s.dist} km from our Hyde Park workshop, roughly ${s.time} minutes by car. WhatsApp 064 529 5863 to arrange immediate collection.',
  },
  {
    question: 'How much does MacBook liquid damage repair cost for ${s.name} clients?',
    answer: 'Assessment from R599 determines the extent of damage. Repair cost depends on which components have been damaged by the liquid. Apple charges R15,000–R70,000 for board replacement after liquid damage. We repair only the affected components at a fraction of that cost. Written quote before any work.',
  },
  {
    question: 'My MacBook got wet but still works — do I need to bring it in?',
    answer: 'Yes, as soon as possible. Liquid damage is progressive — corrosion continues even after drying. Ultrasonic cleaning within 48 hours prevents long-term component failure. Waiting until the machine stops working always costs more.',
  },
  {
    question: 'What is ultrasonic cleaning?',
    answer: 'We remove the logic board and submerge it in a professional ultrasonic cleaning bath. High-frequency sound waves remove corrosion and contaminants from under BGA chips and shielding where manual cleaning cannot reach. After cleaning, each component is inspected under magnification and damaged ones replaced.',
  },
  {
    question: 'Should I put my wet MacBook in rice?',
    answer: 'No. Rice does not remove corrosion — it only absorbs surface moisture while corrosion continues spreading on the logic board. Rice dust can also enter ports and cause additional problems. The correct response is to power off immediately, do not charge, and bring to our workshop for professional ultrasonic cleaning.',
  },
  {
    question: 'Is my data safe after liquid damage?',
    answer: 'In most cases yes. On Apple Silicon Macs (M1/M2/M3), storage is integrated into the SoC. The chip itself is highly resistant to liquid damage. As long as the SoC is intact, your data is typically recoverable after the surrounding circuits are repaired.',
  },
  {
    question: 'How long does liquid damage repair take?',
    answer: 'Ultrasonic cleaning takes 24 hours including drying time. Component-level repair adds 2–5 business days depending on the extent of corrosion. Typical total turnaround is 3–5 business days. We provide a timeline with the written quote.',
  },
  {
    question: 'Do you offer No Fix No Fee for liquid damage from ${s.name}?',
    answer: 'Yes. If we cannot repair the board after assessment, you pay only the R599 assessment fee. No Fix No Fee applies to all ${s.name} clients. Collection is included.',
  },
];

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'MacBook Liquid Damage Repair ${s.name}',
  description: 'Ultrasonic cleaning and component-level MacBook liquid damage repair for ${s.name} clients. Assessment from R599.',
  provider: LOCAL_BUSINESS_PROVIDER,
  areaServed: [
    { '@type': 'City', name: 'Johannesburg' },
    { '@type': 'Place', name: '${s.name}' },
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://zasupport.com' },
    { '@type': 'ListItem', position: 2, name: 'Liquid Damage', item: 'https://zasupport.com/liquid-damage' },
    { '@type': 'ListItem', position: 3, name: '${s.name}', item: 'https://zasupport.com/liquid-damage/${s.slug}' },
  ],
};

const faqSchema = buildFaqSchema(faqs);

export default function LiquidDamage${s.pascal}Page() {
  return (
    <>
      <SchemaOrg schema={faqSchema} />
      <SchemaOrg schema={serviceSchema} />
      <SchemaOrg schema={breadcrumbSchema} />

      <section className="hero-gradient grid-overlay pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[
            { label: 'Liquid Damage', href: '/liquid-damage' },
            { label: '${s.name}' },
          ]} />
          <div className="mt-8 max-w-4xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#E8F4F1] leading-tight mb-6">
              MacBook Liquid Damage Repair
              <br /><span className="text-[#0FEA7A]">${s.name}</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-4 max-w-3xl leading-relaxed">
              Ultrasonic cleaning and component-level board repair for liquid-damaged MacBooks from ${s.name}. Coffee, water, rain, condensation — all assessed and repaired at our Hyde Park workshop. Collection from ${s.name} — approximately ${s.dist} km, ${s.time} minutes by car.
            </p>
            <div className="flex items-center gap-2 text-[#7A9E98] text-sm mb-8">
              <MapPin className="w-4 h-4 text-[#0FEA7A]" />
              <span>Hyde Park, Johannesburg | Assessment from R599 | Same-day collection from ${s.name}</span>
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
              <a href={buildWhatsAppUrl('LD-${s.slug.toUpperCase().replace(/-/g, '')}', 'liquid-damage')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 hover:shadow-[0_0_32px_rgba(15,234,122,0.4)] transition-all">
                WhatsApp for Quote
              </a>
              <a href={\`tel:\${CONTACT.phoneTel}\`} className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all">
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
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-4">Liquid Damage Scenarios We Repair for ${s.name} Clients</h2>
          <p className="text-[#7A9E98] mb-8 leading-relaxed">${s.name} is approximately ${s.dist} km from our Hyde Park workshop. For liquid damage, proximity matters — the sooner the board reaches us, the better the repair outcome. All MacBook models from 2015 onwards are covered. Ultrasonic cleaning and component-level board repair, not board replacement.</p>
          <div className="space-y-4">
            {faults.map((f) => (
              <div key={f.title} className="glass-card p-5">
                <h3 className="text-[#E8F4F1] font-bold mb-2">{f.title}</h3>
                <p className="text-[#7A9E98] text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQAccordion items={faqs} title={\`MacBook Liquid Damage Repair ${s.name} — Common Questions\`} />
        </div>
      </section>

      <section className="py-8 sm:py-16 bg-[#111C1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#E8F4F1] mb-6">Related Services</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              { label: 'Liquid Damage Hub', href: '/liquid-damage' },
              { label: 'Logic Board Repair ${s.name}', href: '/logic-board-repair/${s.slug}' },
              { label: 'Battery Replacement ${s.name}', href: '/battery-replacement/${s.slug}' },
              { label: 'Screen Repair ${s.name}', href: '/screen-repair/${s.slug}' },
              { label: 'MacBook Pro Liquid Damage', href: '/liquid-damage/macbook-pro' },
              { label: 'MacBook Air Liquid Damage', href: '/liquid-damage/macbook-air' },
              { label: 'Logic Board Repair', href: '/logic-board-repair' },
              { label: 'All MacBook Repair', href: '/macbook-repair' },
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
            <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3">MacBook Liquid Damage? Time matters.</h2>
            <p className="text-[#7A9E98] mb-6">Same-day collection from ${s.name}. Ultrasonic cleaning. Assessment from R599. No Fix No Fee.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={buildWhatsAppUrl('LD-${s.slug.toUpperCase().replace(/-/g, '')}', 'liquid-damage')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 transition-all">
                WhatsApp for Quote
              </a>
              <a href={\`tel:\${CONTACT.phoneTel}\`} className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all">
                <Phone className="w-5 h-5" /> Call {CONTACT.phone}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
`;
}

// ═══════════════════════════════════════════════
// BATTERY REPLACEMENT — MODEL PAGE
// ═══════════════════════════════════════════════
function genBatteryM3() {
  return `import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, CheckCircle, ArrowRight, MapPin } from 'lucide-react';
import SchemaOrg from '@/components/seo/SchemaOrg';
import { buildFaqSchema, LOCAL_BUSINESS_PROVIDER } from '@/lib/schema';
import FAQAccordion from '@/components/ui/FAQ';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { CONTACT, buildWhatsAppUrl } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'MacBook Air M3 Battery Replacement Johannesburg 2026 | ZA Support',
  description: 'MacBook Air M3 battery replacement in Johannesburg. Service Battery warning, swollen battery, rapid drain. Same-day replacement. From R1,899. No Fix No Fee.',
  alternates: { canonical: 'https://zasupport.com/battery-replacement/macbook-air-m3' },
};

const faults = [
  { fault: 'Service Battery Warning', desc: 'macOS displays "Service Recommended" in the battery menu when the MacBook Air M3 battery health drops below 80% or the cycle count exceeds Apple\\'s threshold. The M3 Air uses a 52.6 Wh battery (13-inch) or 66.5 Wh (15-inch) with adhesive pull-tabs. We replace same-day at our Hyde Park workshop with a genuine-spec replacement that restores full health reporting in macOS.' },
  { fault: 'Rapid Battery Drain', desc: 'The MacBook Air M3 is rated for 18 hours of battery life. If yours lasts under 4 hours on light tasks — web browsing, email, documents — the cells are degraded. We see this most commonly after 500+ charge cycles or after extended use during load shedding where the battery was constantly cycled between charge and discharge. Replacement restores the original 18-hour capability.' },
  { fault: 'Swollen / Expanding Battery', desc: 'A swollen battery in the MacBook Air M3 pushes against the trackpad (causing phantom clicks or stiffness) and can warp the bottom case. This is a safety issue — a swollen lithium battery should not be charged or used. We handle swollen battery replacement with proper disposal protocols. Do not ignore trackpad stiffness in an M3 Air — it is almost always a swelling battery.' },
  { fault: 'Not Charging via MagSafe 3', desc: 'The MacBook Air M3 charges via MagSafe 3 and USB-C. If MagSafe 3 charging stops while USB-C still works, the fault is likely the MagSafe charge controller on the logic board — not the battery. If neither charges, the battery\\'s charge circuit may have failed. Our R599 assessment distinguishes between battery fault and board fault before any replacement.' },
  { fault: 'Not Charging via USB-C', desc: 'Both USB-C Thunderbolt 3 ports on the M3 Air can charge the machine. Failure to charge via USB-C while MagSafe works points to a USB-C controller fault, not battery. If the battery is not accepting charge from either source, the battery\\'s internal protection circuit may have tripped. Diagnosis determines the exact cause before quoting.' },
  { fault: 'Reduced Runtime After macOS Update', desc: 'A macOS update can temporarily increase battery drain as Spotlight re-indexes and background processes run. If poor battery life persists beyond 48 hours after an update, the battery cells themselves may be degraded and the update merely exposed it. We test actual cell capacity — not just the percentage macOS reports — to confirm whether replacement is needed.' },
];

const faqs = [
  { question: 'How much does MacBook Air M3 battery replacement cost?', answer: 'Battery replacement for the MacBook Air M3 starts from R1,899 at our Hyde Park workshop. Apple charges R2,999–R3,499 through their official service. We use genuine-spec batteries that restore full macOS health reporting. Written quote before any work.' },
  { question: 'How long does MacBook Air M3 battery replacement take?', answer: 'Same-day replacement in most cases. The MacBook Air M3 uses adhesive pull-tabs (not glued) which makes the replacement cleaner and faster than older glued-in designs. Drop off in the morning, collect in the afternoon — or we collect and return from Johannesburg suburbs.' },
  { question: 'Will my data be affected by battery replacement?', answer: 'No. Battery replacement does not touch the logic board, SSD, or any data-bearing component. Your files, apps, and settings are untouched. No backup needed — though we always recommend keeping a Time Machine backup.' },
  { question: 'How do I check my MacBook Air M3 battery health?', answer: 'Click the Apple menu > System Settings > Battery > Battery Health. It shows the condition (Normal or Service Recommended) and the maximum capacity percentage. Anything below 80% typically means the battery should be replaced. You can also check cycle count in System Information > Power.' },
  { question: 'Is the MacBook Air M3 13-inch battery the same as the 15-inch?', answer: 'No. The 13-inch MacBook Air M3 has a 52.6 Wh battery, while the 15-inch has a 66.5 Wh battery. They are physically different sizes and not interchangeable. Both are replaced at our workshop — the 15-inch is a slightly longer procedure due to the larger chassis.' },
  { question: 'My MacBook Air M3 trackpad feels stiff — is that the battery?', answer: 'Very likely yes. A swollen battery pushes upward against the trackpad, causing stiffness, reduced travel, or phantom clicks. This is a safety issue. Stop using the machine and bring it in for assessment. We see this regularly and replace same-day.' },
  { question: 'Does load shedding affect MacBook Air M3 battery life?', answer: 'Yes. Repeated charge-discharge cycles during load shedding accelerate battery degradation. A MacBook Air M3 used through daily load shedding cycles will reach the 80% health threshold significantly faster than one on stable power. Surge protectors protect the charger but do not prevent cycle-related battery wear.' },
  { question: 'Do you collect from Johannesburg suburbs for battery replacement?', answer: 'Yes. Same-day collection from Sandton, Rosebank, Fourways, Bryanston, Midrand, Randburg, Parktown North, Greenside, and surrounding areas. WhatsApp 064 529 5863 to arrange.' },
];

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'MacBook Air M3 Battery Replacement Johannesburg',
  description: 'MacBook Air M3 battery replacement in Johannesburg. Same-day service. From R1,899. Genuine-spec batteries.',
  provider: LOCAL_BUSINESS_PROVIDER,
  areaServed: { '@type': 'City', name: 'Johannesburg' },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://zasupport.com' },
    { '@type': 'ListItem', position: 2, name: 'Battery Replacement', item: 'https://zasupport.com/battery-replacement' },
    { '@type': 'ListItem', position: 3, name: 'MacBook Air', item: 'https://zasupport.com/battery-replacement/macbook-air' },
    { '@type': 'ListItem', position: 4, name: 'M3', item: 'https://zasupport.com/battery-replacement/macbook-air-m3' },
  ],
};

const faqSchema = buildFaqSchema(faqs);

export default function MacBookAirM3BatteryPage() {
  return (
    <>
      <SchemaOrg schema={faqSchema} />
      <SchemaOrg schema={serviceSchema} />
      <SchemaOrg schema={breadcrumbSchema} />

      <section className="hero-gradient grid-overlay pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[
            { label: 'Battery Replacement', href: '/battery-replacement' },
            { label: 'MacBook Air', href: '/battery-replacement/macbook-air' },
            { label: 'M3' },
          ]} />
          <div className="mt-8 max-w-4xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#E8F4F1] leading-tight mb-6">
              MacBook Air M3 Battery Replacement
              <br /><span className="text-[#0FEA7A]">Johannesburg</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-4 max-w-3xl leading-relaxed">
              Same-day MacBook Air M3 battery replacement at our Hyde Park workshop. Service Battery warning, swollen battery, rapid drain, and charging faults. The M3 Air uses adhesive pull-tab batteries — a clean, fast replacement. From R1,899 with written warranty.
            </p>
            <div className="flex items-center gap-2 text-[#7A9E98] text-sm mb-8">
              <MapPin className="w-4 h-4 text-[#0FEA7A]" />
              <span>Hyde Park, Johannesburg | From R1,899 | Same-day replacement | Collection from Sandton, Rosebank, Fourways</span>
            </div>
            <div className="flex flex-wrap gap-4 mb-8">
              {['Same-Day Replacement', 'Genuine-Spec Battery', 'Written Warranty', 'From R1,899'].map((l) => (
                <div key={l} className="flex items-center gap-2 bg-[rgba(15,234,122,0.08)] border border-[rgba(15,234,122,0.15)] px-4 py-2 rounded-full">
                  <CheckCircle className="w-4 h-4 text-[#0FEA7A]" />
                  <span className="text-[#E8F4F1] text-sm font-medium">{l}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href={buildWhatsAppUrl('BAT-MACBOOKAIRM3', 'battery')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 hover:shadow-[0_0_32px_rgba(15,234,122,0.4)] transition-all">
                WhatsApp for Quote
              </a>
              <a href={\`tel:\${CONTACT.phoneTel}\`} className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all">
                <Phone className="w-5 h-5" /> Call {CONTACT.phone}
              </a>
              <Link href="/battery-replacement" className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.2)] text-[#7A9E98] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[rgba(15,234,122,0.05)] transition-all">
                All Battery Replacement <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-4">MacBook Air M3 Battery Faults We Fix</h2>
          <p className="text-[#7A9E98] mb-8 leading-relaxed">The MacBook Air M3 (2024) uses a 52.6 Wh (13-inch) or 66.5 Wh (15-inch) lithium-polymer battery with adhesive pull-tabs for cleaner removal. South African load shedding accelerates battery degradation through constant charge-discharge cycling. We test actual cell capacity, not just the macOS percentage, to confirm whether replacement is warranted.</p>
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
          <FAQAccordion items={faqs} title="MacBook Air M3 Battery Replacement — Common Questions" />
        </div>
      </section>

      <section className="py-8 sm:py-16 bg-[#111C1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#E8F4F1] mb-6">Related Repairs</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              { label: 'MacBook Air M2 Battery', href: '/battery-replacement/macbook-air-m2' },
              { label: 'MacBook Air M1 Battery', href: '/battery-replacement/macbook-air-m1' },
              { label: 'MacBook Pro M3 Battery', href: '/battery-replacement/macbook-pro-m3' },
              { label: 'MacBook Air M3 Logic Board', href: '/logic-board-repair/macbook-air-m3' },
              { label: 'Battery Hub', href: '/battery-replacement' },
              { label: 'Logic Board Repair', href: '/logic-board-repair' },
              { label: 'Screen Repair', href: '/screen-repair' },
              { label: 'Sandton Battery', href: '/battery-replacement/sandton' },
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
            <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3">MacBook Air M3 Battery Failing? From R1,899.</h2>
            <p className="text-[#7A9E98] mb-6">Same-day replacement. Written warranty. Collection from Johannesburg suburbs.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={buildWhatsAppUrl('BAT-MACBOOKAIRM3', 'battery')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 transition-all">
                WhatsApp for Quote
              </a>
              <a href={\`tel:\${CONTACT.phoneTel}\`} className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all">
                <Phone className="w-5 h-5" /> Call {CONTACT.phone}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
`;
}

// ═══════════════════════════════════════════════
// BATTERY REPLACEMENT — SUBURB PAGES
// ═══════════════════════════════════════════════
function genBatterySuburb(s) {
  return `import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, CheckCircle, ArrowRight, MapPin } from 'lucide-react';
import SchemaOrg from '@/components/seo/SchemaOrg';
import { buildFaqSchema, LOCAL_BUSINESS_PROVIDER } from '@/lib/schema';
import FAQAccordion from '@/components/ui/FAQ';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { CONTACT, buildWhatsAppUrl } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'MacBook Battery Replacement ${s.name} | ZA Support Hyde Park',
  description: 'MacBook battery replacement for ${s.name} clients. Same-day service, from R1,899. Collection from ${s.name}. Written warranty. Call 064 529 5863.',
  alternates: { canonical: 'https://zasupport.com/battery-replacement/${s.slug}' },
};

const faults = [
  { title: 'Service Battery Warning', desc: 'macOS shows "Service Recommended" when battery health drops below 80%. This is Apple\\'s signal that the cells are degraded and runtime will continue to decrease. We replace same-day with a genuine-spec battery that restores full macOS health reporting.' },
  { title: 'Swollen / Expanding Battery', desc: 'A swollen battery is a safety issue. It pushes against the trackpad causing stiffness or phantom clicks, and can warp the bottom case. Do not charge or use a MacBook with a swollen battery. We handle safe removal and disposal. This is the most urgent battery fault — bring it in immediately.' },
  { title: 'Rapid Drain (Under 3 Hours)', desc: 'If your MacBook lasts under 3 hours on light tasks, the battery cells are degraded beyond useful capacity. South African load shedding accelerates this — constant charge-discharge cycling wears cells faster than normal use. We test actual capacity, not just the macOS percentage.' },
  { title: 'Not Charging', desc: 'Failure to charge can be a battery fault or a logic board fault. If the MagSafe light does not illuminate or the charging icon does not appear, the issue may be the charge controller on the board rather than the battery itself. Our assessment distinguishes the two before quoting — you pay only for what is actually broken.' },
  { title: 'Battery Percentage Stuck', desc: 'The battery indicator stuck at one percentage, or jumping erratically between numbers, indicates a failed battery gauge circuit or degraded cells that cannot hold a consistent voltage. This is a battery replacement, not a software issue.' },
  { title: 'Shutdown at 20–30%', desc: 'The MacBook shuts down suddenly at 20% or 30% remaining — the cells can no longer deliver the voltage macOS needs under even light load. The battery is reporting inaccurate capacity. Replacement resolves this completely.' },
];

const faqs = [
  {
    question: 'Do you collect MacBooks for battery replacement from ${s.name}?',
    answer: 'Yes. ${s.name} is approximately ${s.dist} km from our Hyde Park workshop — roughly ${s.time} minutes by car. We collect, replace the battery same-day, and return. WhatsApp 064 529 5863 to arrange.',
  },
  {
    question: 'How much does MacBook battery replacement cost for ${s.name} clients?',
    answer: 'From R1,899 depending on the MacBook model. Apple charges R2,999–R5,499. We use genuine-spec batteries with written warranty. Written quote before any work proceeds.',
  },
  {
    question: 'How long does MacBook battery replacement take?',
    answer: 'Same-day for most models. Drop off in the morning, collect in the afternoon. The M1/M2/M3 Air and Pro models use adhesive pull-tabs making the replacement faster. Older glued-in models take slightly longer.',
  },
  {
    question: 'Will replacing my battery erase my data?',
    answer: 'No. Battery replacement does not touch the logic board, SSD, or any data-bearing component. Your files, applications, and settings are completely untouched.',
  },
  {
    question: 'How do I check my MacBook battery health?',
    answer: 'Apple menu > System Settings > Battery > Battery Health. It shows the condition and maximum capacity percentage. Below 80% means replacement is recommended. Cycle count is in System Information > Power.',
  },
  {
    question: 'Does load shedding damage MacBook batteries?',
    answer: 'Not directly damage, but it accelerates degradation significantly. Each charge-discharge cycle during load shedding counts toward the battery\\'s lifespan. MacBooks used through daily load shedding reach the replacement threshold much faster than those on stable power.',
  },
  {
    question: 'My trackpad feels stiff — could it be the battery?',
    answer: 'Almost certainly yes. A swollen battery expands upward and pushes against the trackpad. This is a safety issue — stop using the machine and bring it in. We see this regularly from ${s.name} and across Johannesburg.',
  },
  {
    question: 'Do you offer warranty on battery replacements for ${s.name} clients?',
    answer: 'Yes. Every battery replacement includes a written warranty covering defects and premature capacity loss. The warranty applies equally to all clients regardless of location.',
  },
];

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'MacBook Battery Replacement ${s.name}',
  description: 'Same-day MacBook battery replacement for ${s.name} clients. From R1,899. Collection included.',
  provider: LOCAL_BUSINESS_PROVIDER,
  areaServed: [
    { '@type': 'City', name: 'Johannesburg' },
    { '@type': 'Place', name: '${s.name}' },
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://zasupport.com' },
    { '@type': 'ListItem', position: 2, name: 'Battery Replacement', item: 'https://zasupport.com/battery-replacement' },
    { '@type': 'ListItem', position: 3, name: '${s.name}', item: 'https://zasupport.com/battery-replacement/${s.slug}' },
  ],
};

const faqSchema = buildFaqSchema(faqs);

export default function BatteryReplacement${s.pascal}Page() {
  return (
    <>
      <SchemaOrg schema={faqSchema} />
      <SchemaOrg schema={serviceSchema} />
      <SchemaOrg schema={breadcrumbSchema} />

      <section className="hero-gradient grid-overlay pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[
            { label: 'Battery Replacement', href: '/battery-replacement' },
            { label: '${s.name}' },
          ]} />
          <div className="mt-8 max-w-4xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#E8F4F1] leading-tight mb-6">
              MacBook Battery Replacement
              <br /><span className="text-[#0FEA7A]">${s.name}</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-4 max-w-3xl leading-relaxed">
              Same-day MacBook battery replacement for ${s.name} clients. Service Battery warning, swollen battery, rapid drain, and charging faults. From R1,899 with written warranty. Collection from ${s.name} — approximately ${s.dist} km, ${s.time} minutes from our Hyde Park workshop.
            </p>
            <div className="flex items-center gap-2 text-[#7A9E98] text-sm mb-8">
              <MapPin className="w-4 h-4 text-[#0FEA7A]" />
              <span>Hyde Park, Johannesburg | From R1,899 | Same-day service | Collecting from ${s.name}</span>
            </div>
            <div className="flex flex-wrap gap-4 mb-8">
              {['Same-Day Replacement', 'Genuine-Spec Battery', 'Written Warranty', 'From R1,899'].map((l) => (
                <div key={l} className="flex items-center gap-2 bg-[rgba(15,234,122,0.08)] border border-[rgba(15,234,122,0.15)] px-4 py-2 rounded-full">
                  <CheckCircle className="w-4 h-4 text-[#0FEA7A]" />
                  <span className="text-[#E8F4F1] text-sm font-medium">{l}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href={buildWhatsAppUrl('BAT-${s.slug.toUpperCase().replace(/-/g, '')}', 'battery')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 hover:shadow-[0_0_32px_rgba(15,234,122,0.4)] transition-all">
                WhatsApp for Quote
              </a>
              <a href={\`tel:\${CONTACT.phoneTel}\`} className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all">
                <Phone className="w-5 h-5" /> Call {CONTACT.phone}
              </a>
              <Link href="/battery-replacement" className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.2)] text-[#7A9E98] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[rgba(15,234,122,0.05)] transition-all">
                All Battery Replacement <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-4">MacBook Battery Faults We Fix for ${s.name} Clients</h2>
          <p className="text-[#7A9E98] mb-8 leading-relaxed">${s.name} is approximately ${s.dist} km from our Hyde Park workshop. All MacBook models from 2015 onwards are covered — Intel and Apple Silicon. We test actual cell capacity before recommending replacement and provide a written quote before any work proceeds.</p>
          <div className="space-y-4">
            {faults.map((f) => (
              <div key={f.title} className="glass-card p-5">
                <h3 className="text-[#E8F4F1] font-bold mb-2">{f.title}</h3>
                <p className="text-[#7A9E98] text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQAccordion items={faqs} title={\`MacBook Battery Replacement ${s.name} — Common Questions\`} />
        </div>
      </section>

      <section className="py-8 sm:py-16 bg-[#111C1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#E8F4F1] mb-6">Related Services</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              { label: 'Battery Hub', href: '/battery-replacement' },
              { label: 'Logic Board Repair ${s.name}', href: '/logic-board-repair/${s.slug}' },
              { label: 'Liquid Damage ${s.name}', href: '/liquid-damage/${s.slug}' },
              { label: 'Screen Repair ${s.name}', href: '/screen-repair/${s.slug}' },
              { label: 'MacBook Pro Battery', href: '/battery-replacement/macbook-pro' },
              { label: 'MacBook Air Battery', href: '/battery-replacement/macbook-air' },
              { label: 'Logic Board Repair', href: '/logic-board-repair' },
              { label: 'All MacBook Repair', href: '/macbook-repair' },
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
            <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3">MacBook Battery Failing? From R1,899.</h2>
            <p className="text-[#7A9E98] mb-6">Same-day replacement. Collecting from ${s.name}. Written warranty.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={buildWhatsAppUrl('BAT-${s.slug.toUpperCase().replace(/-/g, '')}', 'battery')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 transition-all">
                WhatsApp for Quote
              </a>
              <a href={\`tel:\${CONTACT.phoneTel}\`} className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all">
                <Phone className="w-5 h-5" /> Call {CONTACT.phone}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
`;
}

// ═══════════════════════════════════════════════
// SCREEN REPAIR — SUBURB PAGES
// ═══════════════════════════════════════════════
function genScreenSuburb(s) {
  return `import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, CheckCircle, ArrowRight, MapPin } from 'lucide-react';
import SchemaOrg from '@/components/seo/SchemaOrg';
import { buildFaqSchema, LOCAL_BUSINESS_PROVIDER } from '@/lib/schema';
import FAQAccordion from '@/components/ui/FAQ';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { CONTACT, buildWhatsAppUrl } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'MacBook Screen Repair ${s.name} | ZA Support Hyde Park',
  description: 'MacBook screen repair for ${s.name} clients. Cracked display, pressure marks, flickering, backlight failure. Collection from ${s.name}. Assessment from R599.',
  alternates: { canonical: 'https://zasupport.com/screen-repair/${s.slug}' },
};

const faults = [
  { title: 'Cracked Screen', desc: 'Impact cracks from drops, pressure, or objects placed on the closed lid. The Liquid Retina and Retina displays used in modern MacBooks are bonded to the front glass — a crack in the glass means the entire display assembly needs replacement. We carry stock for most models and replace same-day where possible.' },
  { title: 'Pressure Marks / Dead Pixels', desc: 'Dark spots or coloured patches caused by pressure on the display — often from something resting on the keyboard when the lid was closed. These are permanent LCD damage and require display replacement. We see this frequently from bags and backpacks where weight compressed the closed MacBook.' },
  { title: 'Flickering Display', desc: 'The screen flickers, strobes, or cuts in and out. This can be a display cable fault (flexgate on older models), a backlight driver IC failure on the logic board, or a failing display panel. Diagnosis determines the exact cause — cable and IC repairs are significantly cheaper than full display replacement.' },
  { title: 'Display Coating Wear', desc: 'The anti-reflective coating on Retina MacBook displays degrades over time, leaving uneven patches that look like stains. Apple ran a quality programme for certain models but it has expired. We replace the full display assembly with correct coating intact.' },
  { title: 'Backlight Failure', desc: 'The screen appears completely black but you can faintly see the desktop under bright light. The backlight circuit has failed — either a blown fuse, a failed backlight driver IC, or a damaged LED strip. On many models this is a board-level repair (R599 assessment) rather than a full display replacement, saving significant cost.' },
  { title: 'External Monitor Works, Built-in Does Not', desc: 'The MacBook drives an external display perfectly but the built-in screen is blank, flickering, or showing artefacts. This confirms the GPU and logic board are functional — the fault is in the display assembly, display cable, or display connector on the board. Targeted repair rather than board replacement.' },
];

const faqs = [
  {
    question: 'Do you collect MacBooks for screen repair from ${s.name}?',
    answer: 'Yes. ${s.name} is approximately ${s.dist} km from our Hyde Park workshop — roughly ${s.time} minutes by car. We collect, assess the display fault, and provide a written quote before proceeding. WhatsApp 064 529 5863 to arrange.',
  },
  {
    question: 'How much does MacBook screen repair cost for ${s.name} clients?',
    answer: 'Assessment from R599. Screen replacement cost depends on the model — MacBook Air displays are less expensive than MacBook Pro Retina or Liquid Retina XDR. Apple charges R8,000–R25,000 for display replacement. Our pricing is significantly lower with the same quality result. Written quote before any work.',
  },
  {
    question: 'How long does MacBook screen repair take?',
    answer: 'Same-day for common models where we carry stock (MacBook Air M1/M2/M3, MacBook Pro 13/14/16-inch). Less common models may take 2–3 business days if a display needs to be sourced. Specific timeline provided in the written quote.',
  },
  {
    question: 'Will screen repair erase my data?',
    answer: 'No. Screen replacement is a physical display swap — the logic board, SSD, and all data-bearing components are not touched. Your files and applications are completely safe.',
  },
  {
    question: 'My screen is cracked but still displays — do I need to replace it?',
    answer: 'A cracked screen will continue to deteriorate — cracks spread over time, especially with temperature changes. Liquid can also enter through cracks and damage the display further. We recommend replacement before secondary damage occurs, but the machine remains usable in the interim.',
  },
  {
    question: 'Can you repair the backlight without replacing the entire screen?',
    answer: 'In many cases yes. If the backlight failure is caused by a blown fuse or failed driver IC on the logic board, we repair at component level — much cheaper than full display replacement. The R599 assessment determines whether it is a board fault or a display fault.',
  },
  {
    question: 'What is flexgate?',
    answer: 'Flexgate affected MacBook Pro 2016–2018 models where the display cable wore through from repeated opening and closing. It causes a backlight that only works at certain angles or a stage-light effect at the bottom of the screen. We repair with a revised cable design that prevents recurrence.',
  },
  {
    question: 'Do you use genuine Apple screens?',
    answer: 'We use genuine-spec replacement displays — same resolution, colour gamut (P3), brightness, and True Tone compatibility. On newer models with True Tone, calibration is performed post-replacement to restore automatic colour temperature adjustment.',
  },
];

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'MacBook Screen Repair ${s.name}',
  description: 'MacBook screen repair for ${s.name} clients. Cracked display, pressure marks, backlight failure. Assessment from R599.',
  provider: LOCAL_BUSINESS_PROVIDER,
  areaServed: [
    { '@type': 'City', name: 'Johannesburg' },
    { '@type': 'Place', name: '${s.name}' },
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://zasupport.com' },
    { '@type': 'ListItem', position: 2, name: 'Screen Repair', item: 'https://zasupport.com/screen-repair' },
    { '@type': 'ListItem', position: 3, name: '${s.name}', item: 'https://zasupport.com/screen-repair/${s.slug}' },
  ],
};

const faqSchema = buildFaqSchema(faqs);

export default function ScreenRepair${s.pascal}Page() {
  return (
    <>
      <SchemaOrg schema={faqSchema} />
      <SchemaOrg schema={serviceSchema} />
      <SchemaOrg schema={breadcrumbSchema} />

      <section className="hero-gradient grid-overlay pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[
            { label: 'Screen Repair', href: '/screen-repair' },
            { label: '${s.name}' },
          ]} />
          <div className="mt-8 max-w-4xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#E8F4F1] leading-tight mb-6">
              MacBook Screen Repair
              <br /><span className="text-[#0FEA7A]">${s.name}</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-4 max-w-3xl leading-relaxed">
              MacBook screen repair for ${s.name} clients. Cracked display, pressure marks, flickering, backlight failure, and display coating damage. Assessment from R599 at our Hyde Park workshop. Collection from ${s.name} — approximately ${s.dist} km, ${s.time} minutes by car.
            </p>
            <div className="flex items-center gap-2 text-[#7A9E98] text-sm mb-8">
              <MapPin className="w-4 h-4 text-[#0FEA7A]" />
              <span>Hyde Park, Johannesburg | Assessment from R599 | Collecting from ${s.name} — approx ${s.time} min drive</span>
            </div>
            <div className="flex flex-wrap gap-4 mb-8">
              {['Same-Day Available', 'No Fix No Fee', 'Written Warranty', 'Assessment from R599'].map((l) => (
                <div key={l} className="flex items-center gap-2 bg-[rgba(15,234,122,0.08)] border border-[rgba(15,234,122,0.15)] px-4 py-2 rounded-full">
                  <CheckCircle className="w-4 h-4 text-[#0FEA7A]" />
                  <span className="text-[#E8F4F1] text-sm font-medium">{l}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href={buildWhatsAppUrl('SR-${s.slug.toUpperCase().replace(/-/g, '')}', 'screen')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 hover:shadow-[0_0_32px_rgba(15,234,122,0.4)] transition-all">
                WhatsApp for Quote
              </a>
              <a href={\`tel:\${CONTACT.phoneTel}\`} className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all">
                <Phone className="w-5 h-5" /> Call {CONTACT.phone}
              </a>
              <Link href="/screen-repair" className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.2)] text-[#7A9E98] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[rgba(15,234,122,0.05)] transition-all">
                All Screen Repair <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-4">MacBook Screen Faults We Repair for ${s.name} Clients</h2>
          <p className="text-[#7A9E98] mb-8 leading-relaxed">${s.name} is approximately ${s.dist} km from our Hyde Park workshop. All MacBook models from 2015 onwards are covered — Retina, Liquid Retina, and Liquid Retina XDR displays. Every fault is assessed before quoting, and many display issues can be resolved at board level without replacing the full screen assembly.</p>
          <div className="space-y-4">
            {faults.map((f) => (
              <div key={f.title} className="glass-card p-5">
                <h3 className="text-[#E8F4F1] font-bold mb-2">{f.title}</h3>
                <p className="text-[#7A9E98] text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQAccordion items={faqs} title={\`MacBook Screen Repair ${s.name} — Common Questions\`} />
        </div>
      </section>

      <section className="py-8 sm:py-16 bg-[#111C1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#E8F4F1] mb-6">Related Services</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              { label: 'Screen Repair Hub', href: '/screen-repair' },
              { label: 'Logic Board Repair ${s.name}', href: '/logic-board-repair/${s.slug}' },
              { label: 'Liquid Damage ${s.name}', href: '/liquid-damage/${s.slug}' },
              { label: 'Battery Replacement ${s.name}', href: '/battery-replacement/${s.slug}' },
              { label: 'MacBook Pro Screen', href: '/screen-repair/macbook-pro' },
              { label: 'MacBook Air Screen', href: '/screen-repair/macbook-air' },
              { label: 'Logic Board Repair', href: '/logic-board-repair' },
              { label: 'All MacBook Repair', href: '/macbook-repair' },
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
            <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3">MacBook Screen Damaged? Assessment from R599.</h2>
            <p className="text-[#7A9E98] mb-6">Collecting from ${s.name}. Same-day available. No Fix No Fee.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={buildWhatsAppUrl('SR-${s.slug.toUpperCase().replace(/-/g, '')}', 'screen')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 transition-all">
                WhatsApp for Quote
              </a>
              <a href={\`tel:\${CONTACT.phoneTel}\`} className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all">
                <Phone className="w-5 h-5" /> Call {CONTACT.phone}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
`;
}

// ═══════════════════════════════════════════════
// GENERATE ALL MISSING PAGES
// ═══════════════════════════════════════════════
let created = 0;

function writePage(dir, content) {
  if (existsSync(join(dir, 'page.tsx'))) {
    console.log(`  SKIP (exists): ${dir.replace(BASE + '/', '')}`);
    return;
  }
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, 'page.tsx'), content, 'utf-8');
  created++;
  console.log(`  CREATED: ${dir.replace(BASE + '/', '')}`);
}

// Logic board repair suburbs
console.log('=== logic-board-repair ===');
for (const s of SUBURBS) {
  writePage(join(BASE, 'logic-board-repair', s.slug), genLogicBoardSuburb(s));
}

// Liquid damage model + suburbs
console.log('=== liquid-damage ===');
writePage(join(BASE, 'liquid-damage', 'macbook-air-m3'), genLiquidDamageM3());
for (const s of SUBURBS) {
  writePage(join(BASE, 'liquid-damage', s.slug), genLiquidDamageSuburb(s));
}

// Battery replacement model + suburbs
console.log('=== battery-replacement ===');
writePage(join(BASE, 'battery-replacement', 'macbook-air-m3'), genBatteryM3());
for (const s of SUBURBS) {
  writePage(join(BASE, 'battery-replacement', s.slug), genBatterySuburb(s));
}

// Screen repair suburbs
console.log('=== screen-repair ===');
for (const s of SUBURBS) {
  writePage(join(BASE, 'screen-repair', s.slug), genScreenSuburb(s));
}

console.log(`\nDone. Created ${created} pages.`);
