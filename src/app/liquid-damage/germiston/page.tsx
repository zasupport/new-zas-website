import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, ArrowRight, AlertTriangle, CheckCircle, MapPin, Clock } from 'lucide-react';
import SchemaOrg from '@/components/seo/SchemaOrg';
import { buildFaqSchema, LOCAL_BUSINESS_PROVIDER } from '@/lib/schema';
import FAQAccordion from '@/components/ui/FAQ';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { CONTACT, buildWhatsAppUrl } from '@/lib/constants';
import PricingNote from '@/components/PricingNote';
import PricingRange from '@/components/PricingRange';

export const metadata: Metadata = {
  title: 'MacBook Liquid Damage Repair Germiston | ZA Support Hyde Park',
  description:
    'MacBook liquid damage repair for Germiston clients. Ultrasonic cleaning, board-level diagnostics. We collect from Germiston. Assessment from R599. Call 064 529 5863.',
  alternates: { canonical: 'https://zasupport.com/liquid-damage/germiston' },
};

const urgentSteps = [
  { step: '01', title: 'Switch Off Immediately', desc: 'Do not attempt to use or charge the MacBook. Power it off and leave it off, powering a wet board causes short-circuit damage.' },
  { step: '02', title: 'Do Not Use Rice', desc: 'Rice does not remove corrosion or clean contaminated contacts. It wastes critical intervention time while corrosion spreads.' },
  { step: '03', title: 'Contact Us Now', desc: 'WhatsApp or call us immediately. Every hour increases corrosion spread. We arrange same-day collection from Germiston.' },
  { step: '04', title: 'Ultrasonic Cleaning', desc: 'Full disassembly. Logic board cleaned in ultrasonic bath to remove corrosion and contaminants at component level.' },
  { step: '05', title: 'Diagnostic and Repair', desc: 'Post-clean diagnostic to identify damaged components. Board-level repair under magnification.' },
  { step: '06', title: 'Return to Germiston', desc: 'Your device returned clean, fully tested, with a ZA Support warranty on all repaired components.' },
];

const faqs = [
  { question: 'How quickly should I contact you after liquid damage in Germiston?', answer: 'Immediately. Corrosion begins the moment liquid contacts the board and progresses rapidly over the first 48 to 72 hours. If you spill something on a MacBook in Germiston, power it down, do not plug in the charger, and call 064 529 5863 or WhatsApp wa.me/27645295863 straight away. We can usually arrange collection from the Germiston CBD, Lambton or Primrose within a few hours, and the M2 route into Hyde Park takes roughly 30 minutes outside peak.' },
  { question: 'Do you collect MacBooks from Germiston after liquid damage?', answer: 'Yes, we collect across Germiston, Lambton, Primrose, Parkhill Gardens, Dinwiddie, the CBD around President Street, and the Wadeville and Knights industrial areas. We have collected from logistics offices near City Deep, medical practices off Lake Street and homes throughout the suburb. Collection happens via the M2 and N3, with the workshop roughly 30 minutes away in Hyde Park. Assessment from R599.' },
  { question: 'What does the liquid damage assessment cost?', answer: 'Assessment is from R599. That covers the initial inspection, ultrasonic clean of the logic board and a full diagnostic so we can quote accurately on what is needed. For Germiston clients the assessment fee is the same regardless of suburb, and the collection from anywhere in the Germiston area is arranged when you book. You receive a written quote before any chargeable repair work begins.' },
  { question: 'What types of liquid cause the most damage?', answer: 'Sugary and salty liquids are the worst, sweetened coffee, energy drinks, soft drinks and seawater leave conductive residue that keeps shorting traces long after the board looks dry. Plain water is more forgiving if cleaned quickly. In Germiston we see a lot of coffee and tea spills from CBD offices, and condensation damage from machines moved between warehouse floors and air-conditioned offices. Regardless of liquid type, the ultrasonic clean is what removes the residue properly.' },
  { question: 'My MacBook got wet but still works. Should I bring it in?', answer: 'Yes, and the sooner the better. A MacBook that still powers on after a spill often has active corrosion progressing inside that will fail the board days or weeks later. We have had Germiston clients drop off machines that were working fine after a spill, only for the ultrasonic stage to reveal heavy residue under the keyboard and around the CPU. Cleaning it now is far cheaper than a board-level repair once components have failed.' },
  { question: 'Will you be able to save my data?', answer: 'In most cases yes. Even when a board is beyond economic repair, we can usually recover data from the SSD on Intel MacBooks. Apple Silicon machines are more involved because the SSD is paired to the logic board, but we have specific techniques for those too. If data is your priority, tell us when you book collection from Germiston and we will prioritise the recovery path before any other repair work.' },
  { question: 'Is there a From R599 assessment policy for liquid damage?', answer: 'Yes. The assessment is from R599 and includes the ultrasonic clean and full diagnostic. After that stage we provide a written quote for any repair work needed. You decide whether to proceed before any further charges apply. The same policy applies to every Germiston collection, whether the machine arrives from a Lambton home or a Wadeville office.' },
  { question: 'Can you repair Apple Silicon MacBooks with liquid damage?', answer: 'Yes. M1, M2 and M3 MacBooks can be repaired at the board level for most liquid damage scenarios. The Apple Silicon boards are more densely packed, which makes the work more delicate, but ultrasonic cleaning and component-level replacement remain effective. We have repaired Apple Silicon machines collected from Germiston offices and returned them fully functional within the same week. Data recovery is more involved on these models, so let us know upfront if that is the priority.' },
];

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'MacBook Liquid Damage Repair Germiston',
  description: 'MacBook liquid damage repair for Germiston clients. Ultrasonic cleaning, board-level diagnostics. Collection from Germiston.',
  provider: LOCAL_BUSINESS_PROVIDER,
  areaServed: [
    { '@type': 'City', name: 'Johannesburg' },
    { '@type': 'Neighborhood', name: 'Germiston' },
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://zasupport.com' },
    { '@type': 'ListItem', position: 2, name: 'Liquid Damage Repair', item: 'https://zasupport.com/liquid-damage' },
    { '@type': 'ListItem', position: 3, name: 'Germiston', item: 'https://zasupport.com/liquid-damage/germiston' },
  ],
};

const faqSchema = buildFaqSchema(faqs);

export default function LiquidDamageGermistonPage() {
  return (
    <>
      <SchemaOrg schema={faqSchema} />
      <SchemaOrg schema={serviceSchema} />
      <SchemaOrg schema={breadcrumbSchema} />

      <section className="hero-gradient grid-overlay pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[
            { label: 'Liquid Damage Repair', href: '/liquid-damage' },
            { label: 'Germiston' },
          ]} />
          <div className="mt-8 max-w-4xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#E8F4F1] leading-tight mb-6">
              MacBook Liquid Damage Repair Germiston
              <br /><span className="text-[#0FEA7A]">, Act Fast, Save Your Mac</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-4 max-w-3xl leading-relaxed">
              Liquid damage is a race against corrosion, and Germiston sits roughly 30 minutes from our Hyde Park workshop via the N3 and M2. We collect from across Germiston, Lambton, Primrose, the CBD around President Street, and the industrial belt near Knights, and carry out ultrasonic cleaning and board-level repair the same day where possible. Assessment from R599.
            </p>
            <div className="flex items-center gap-2 text-[#7A9E98] text-sm mb-8">
              <Clock className="w-4 h-4 text-[#0FEA7A]" />
              <span>Same-day collection from Germiston, contact us immediately after liquid exposure</span>
            </div>
            <div className="flex flex-wrap gap-4 mb-8">
              {[
                { icon: AlertTriangle, label: 'Act Within Hours' },
                { icon: CheckCircle, label: 'Ultrasonic Cleaning' },
                { icon: MapPin, label: 'Collect from Germiston' },
                { icon: CheckCircle, label: 'From R599 assessment' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 bg-[rgba(15,234,122,0.08)] border border-[rgba(15,234,122,0.15)] px-4 py-2 rounded-full">
                  <Icon className="w-4 h-4 text-[#0FEA7A]" />
                  <span className="text-[#E8F4F1] text-sm font-medium">{label}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href={buildWhatsAppUrl('LDR-GERMISTO', 'liquid-damage')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 hover:shadow-[0_0_32px_rgba(15,234,122,0.4)] transition-all">
                💬 WhatsApp, Act Now
              </a>
              <a href={`tel:${CONTACT.phoneTel}`} className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all">
                <Phone className="w-5 h-5" /> Call {CONTACT.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 sm:py-16 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-6">What to Do Right Now</h2>
          <div className="space-y-5">
            {urgentSteps.map((item) => (
              <div key={item.step} className="glass-card p-5 flex gap-4">
                <span className="text-[#0FEA7A] font-extrabold text-xl flex-shrink-0">{item.step}</span>
                <div>
                  <h3 className="text-[#E8F4F1] font-bold mb-1">{item.title}</h3>
                  <p className="text-[#7A9E98] text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-8 sm:py-16 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-6">
            Liquid Damage Repair for Germiston Clients
          </h2>
          <div className="space-y-4 text-[#7A9E98] leading-relaxed">
            <p>
              Germiston&apos;s mix of heavy industry, the rail-yard corridor and busy CBD office blocks means we see a particular pattern of liquid damage callouts here. Coffee spills from logistics offices near the Germiston station precinct, water ingress on machines carried through summer thunderstorms along Voortrekker Street, and the slow creep of condensation damage on laptops kept in warehouse offices off Refinery Road. The physics is always the same: the initial short-circuit when liquid bridges live traces is one problem, but the corrosion that follows over the next 48 to 72 hours is what actually kills the logic board. Power the machine off, do not attempt to charge it, and get it to us before the residue dries into the board.
            </p>
            <p>
              For Germiston residents and the freight, manufacturing and accounting professionals who work in the area, same-day collection from the CBD, Lambton, Primrose and the Wadeville industrial node keeps downtime to a minimum. We collect, transport via the M2 to our Hyde Park workshop, and begin the ultrasonic clean-down within hours. Our commercial ultrasonic bath removes sugar, salt and mineral residue from every layer of the board, the kind of contamination you cannot reach with isopropyl and a brush. Once the board is clean we test under load, identify any components that have failed, and replace them at the component level. We have collected MacBooks from clearing agents near City Deep, from medical rooms off Lake Street, and from family homes in Parkhill Gardens, often returning the repaired machine inside the same week.
            </p>
            <p>
              Not every liquid-damaged MacBook can be saved, but in Germiston the majority of the machines we collect do come back to full function. We have restored boards that arrived a fortnight after a spill, and we have salvaged data from machines that no longer power on at all. The diagnostic you receive after the ultrasonic stage is honest and specific to your board, what is repairable, what is not, and what it will cost, so you can decide before any further work is done. Call 064 529 5863 or WhatsApp wa.me/27645295863 to arrange collection from anywhere in Germiston.
            </p>
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQAccordion items={faqs} title="Liquid Damage Repair Germiston, Common Questions" />
        </div>
      </section>

      <section className="py-8 sm:py-16 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#E8F4F1] mb-6">We Also Serve These Areas</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { label: "Edenvale", href: "/liquid-damage/edenvale" },
              { label: "Alberton", href: "/liquid-damage/alberton" },
              { label: "Boksburg", href: "/liquid-damage/boksburg" },
            ].map((area) => (
              <Link key={area.href} href={area.href} className="glass-card p-4 text-center group">
                <span className="text-[#E8F4F1] text-sm font-semibold group-hover:text-[#0FEA7A] transition-colors">{area.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-8 sm:py-16 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-[rgba(39,80,77,0.3)] border border-[rgba(15,234,122,0.2)] rounded-3xl p-10">
            <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3">Liquid Damage in Germiston? Act Now.</h2>
            <p className="text-[#7A9E98] mb-6">Same-day collection from Germiston. Assessment from R599. From R599 assessment.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={buildWhatsAppUrl('LDR-GERMISTO', 'liquid-damage')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 transition-all">
                💬 WhatsApp, Act Now
              </a>
              <a href={`tel:${CONTACT.phoneTel}`} className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all">
                <Phone className="w-5 h-5" /> Call {CONTACT.phone}
              </a>
            </div>
          </div>
        </div>
      </section>
      <section className="py-12 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <PricingRange page="/liquid-damage/germiston" />
          <PricingNote />
        </div>
      </section>

    </>
  );
}
