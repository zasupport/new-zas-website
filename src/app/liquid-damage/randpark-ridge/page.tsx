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
  title: 'MacBook Liquid Damage Repair Randpark Ridge | ZA Support Hyde Park',
  description:
    'MacBook liquid damage repair for Randpark Ridge clients. Ultrasonic cleaning, board-level diagnostics. We collect from Randpark Ridge. Assessment from R599. Call 064 529 5863.',
  alternates: { canonical: 'https://zasupport.com/liquid-damage/randpark-ridge' },
};

const urgentSteps = [
  { step: '01', title: 'Switch Off Immediately', desc: 'Do not attempt to use or charge the MacBook. Power it off and leave it off — powering a wet board causes short-circuit damage.' },
  { step: '02', title: 'Do Not Use Rice', desc: 'Rice does not remove corrosion or clean contaminated contacts. It wastes critical intervention time while corrosion spreads.' },
  { step: '03', title: 'Contact Us Now', desc: 'WhatsApp or call us immediately. Every hour increases corrosion spread. We arrange same-day collection from Randpark Ridge.' },
  { step: '04', title: 'Ultrasonic Cleaning', desc: 'Full disassembly. Logic board cleaned in ultrasonic bath to remove corrosion and contaminants at component level.' },
  { step: '05', title: 'Diagnostic and Repair', desc: 'Post-clean diagnostic to identify damaged components. Board-level repair under magnification.' },
  { step: '06', title: 'Return to Randpark Ridge', desc: 'Your device returned clean, fully tested, with a ZA Support warranty on all repaired components.' },
];

const faqs = [
  { question: 'How quickly should I contact you after liquid damage in Randpark Ridge?', answer: 'Immediately. Power the MacBook off, do not try to charge it, and call us on 064 529 5863. From Randpark Ridge we can usually have a courier collecting within two to three hours via Beyers Naudé Drive. Every hour that corrosion sits on the board makes the repair harder and more expensive, so even a same-day call beats waiting until the next morning.' },
  { question: 'Do you collect MacBooks from Randpark Ridge after liquid damage?', answer: 'Yes. We collect from across Randpark Ridge, Radiokop, Boskruin, Northgate and Cresta, with the Hyde Park workshop roughly 20 minutes away depending on traffic on the N1 and Beyers Naudé. Liquid damage cases are prioritised on our collection list because the time pressure is real. WhatsApp wa.me/27645295863 with your address and we will confirm a window.' },
  { question: 'What does the liquid damage assessment cost?', answer: 'From R599. That covers full disassembly, ultrasonic cleaning of the board where appropriate, microscope inspection and a written quote with the actual repair cost. If you go ahead with the repair it stays at R599 for the assessment portion. If you decide not to proceed the assessment fee still applies because the cleaning and diagnostic work has already been done.' },
  { question: 'What types of liquid cause the most damage?', answer: 'In order of severity from worst to least bad: salt water, sugary drinks (Coke, juice, wine), coffee and tea, and finally plain tap water. Sugar and salt are conductive and corrosive long after the liquid itself has dried, which is why a spilt cooldrink that seems fine on Monday can kill the board by Thursday. From Randpark Ridge homes we see coffee most often, followed by wine and pool water.' },
  { question: 'My MacBook got wet but still works. Should I bring it in?', answer: 'Yes, and stop using it now. A MacBook that still boots after a spill is the most common scenario we regret with clients, because corrosion on a live board accelerates dramatically. We have had Randpark Ridge clients whose machines worked fine for ten days then died, and by then the damage was three times what it would have cost on day one. Power it down and let us clean it properly.' },
  { question: 'Will you be able to save my data?', answer: 'On Intel MacBooks the SSD is usually a separate module and we can almost always recover the data even if the logic board is dead. On M1, M2 and M3 MacBooks the storage is soldered to the board and tied to the Secure Enclave, so data recovery requires the board to be brought back to a working state. In Randpark Ridge cases without a recent Time Machine backup, we will tell you upfront how realistic recovery is before any work begins.' },
  { question: 'Is there a From R599 assessment policy for liquid damage?', answer: 'Yes, our assessment fee starts from R599 for liquid damage cases. That includes collection from Randpark Ridge, full strip-down, ultrasonic cleaning where indicated, and a written diagnosis. More complex boards or extensive corrosion may require additional diagnostic time, which we will quote before doing — no surprise charges at the end.' },
  { question: 'Can you repair Apple Silicon MacBooks with liquid damage?', answer: 'Yes. We repair liquid damage on M1, M2 and M3 MacBook Air and Pro models at component level rather than swapping the whole board, which is what makes the repair economically viable. The challenge with Apple Silicon is the soldered storage, so saving the board is also the only path to saving the data. Bring it in early — Apple Silicon boards are less forgiving of delayed cleaning than the older Intel logic boards.' },
];

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'MacBook Liquid Damage Repair Randpark Ridge',
  description: 'MacBook liquid damage repair for Randpark Ridge clients. Ultrasonic cleaning, board-level diagnostics. Collection from Randpark Ridge.',
  provider: LOCAL_BUSINESS_PROVIDER,
  areaServed: [
    { '@type': 'City', name: 'Johannesburg' },
    { '@type': 'Neighborhood', name: 'Randpark Ridge' },
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://zasupport.com' },
    { '@type': 'ListItem', position: 2, name: 'Liquid Damage Repair', item: 'https://zasupport.com/liquid-damage' },
    { '@type': 'ListItem', position: 3, name: 'Randpark Ridge', item: 'https://zasupport.com/liquid-damage/randpark-ridge' },
  ],
};

const faqSchema = buildFaqSchema(faqs);

export default function LiquidDamageRandparkRidgePage() {
  return (
    <>
      <SchemaOrg schema={faqSchema} />
      <SchemaOrg schema={serviceSchema} />
      <SchemaOrg schema={breadcrumbSchema} />

      <section className="hero-gradient grid-overlay pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[
            { label: 'Liquid Damage Repair', href: '/liquid-damage' },
            { label: 'Randpark Ridge' },
          ]} />
          <div className="mt-8 max-w-4xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#E8F4F1] leading-tight mb-6">
              MacBook Liquid Damage Repair Randpark Ridge
              <br /><span className="text-[#0FEA7A]">— Act Fast, Save Your Mac</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-4 max-w-3xl leading-relaxed">
              Liquid damage is time-critical, and Randpark Ridge sits roughly 20 minutes from our Hyde Park workshop via Beyers Naudé Drive and the N1, so we can usually collect within a couple of hours. We carry out ultrasonic board cleaning and component-level repair on site rather than swapping logic boards. Assessment from R599.
            </p>
            <div className="flex items-center gap-2 text-[#7A9E98] text-sm mb-8">
              <Clock className="w-4 h-4 text-[#0FEA7A]" />
              <span>Same-day collection from Randpark Ridge — contact us immediately after liquid exposure</span>
            </div>
            <div className="flex flex-wrap gap-4 mb-8">
              {[
                { icon: AlertTriangle, label: 'Act Within Hours' },
                { icon: CheckCircle, label: 'Ultrasonic Cleaning' },
                { icon: MapPin, label: 'Collect from Randpark Ridge' },
                { icon: CheckCircle, label: 'From R599 assessment' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 bg-[rgba(15,234,122,0.08)] border border-[rgba(15,234,122,0.15)] px-4 py-2 rounded-full">
                  <Icon className="w-4 h-4 text-[#0FEA7A]" />
                  <span className="text-[#E8F4F1] text-sm font-medium">{label}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href={buildWhatsAppUrl('LDR-RANDPARK', 'liquid-damage')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 hover:shadow-[0_0_32px_rgba(15,234,122,0.4)] transition-all">
                💬 WhatsApp — Act Now
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
            Liquid Damage Repair for Randpark Ridge Clients
          </h2>
          <div className="space-y-4 text-[#7A9E98] leading-relaxed">
            <p>
              Randpark Ridge clients bring us a particular mix of liquid damage cases — coffee spills from work-from-home setups around the Randpark Golf Club estates, water damage from poolside use during summer, and the odd glass of wine knocked over during weekend entertaining. The pattern we see consistently is that the first 24 hours decide most outcomes. When liquid bridges traces on a logic board, two things happen in sequence: an initial short can take out power-management ICs or the SMC, and then corrosion begins quietly eating pads and vias for days or weeks afterwards. Powering the machine on to check if it still works is the single most common reason a repairable board becomes a write-off.
            </p>
            <p>
              Because Randpark Ridge, Radiokop, Boskruin and the Northgate side of Beyers Naudé all sit on the same collection route, we can usually have a courier with you the same morning you call. We bring the MacBook back to Hyde Park, strip it down, and run the board through a commercial ultrasonic bath with the correct solvent — this is what actually removes sugar, salt and mineral residue from under chips where isopropyl wipes cannot reach. From there it goes onto the microscope bench for any trace repair, pad rebuilds or component-level replacement. We have done this for residents off Pendoring Road, small businesses in the Northgate area, and families closer to Cresta who needed data off a machine before deciding on the repair itself.
            </p>
            <p>
              Most liquid-damaged MacBooks coming out of Randpark Ridge are recoverable, even ones that arrived a week or two after the spill. The MacBooks we cannot save are almost always the ones that were repeatedly powered on, or where someone tried rice or a hairdryer first. After the diagnostic you will get a clear written breakdown — what is damaged, what it costs to repair, and whether data recovery is realistic if the board itself is beyond economical repair. If you decide not to proceed, the R599 still covers the work done.
            </p>
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQAccordion items={faqs} title="Liquid Damage Repair Randpark Ridge — Common Questions" />
        </div>
      </section>

      <section className="py-8 sm:py-16 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#E8F4F1] mb-6">We Also Serve These Areas</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { label: "Randburg", href: "/liquid-damage/randburg" },
              { label: "Roodepoort", href: "/liquid-damage/roodepoort" },
              { label: "Northcliff", href: "/liquid-damage/northcliff" },
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
            <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3">Liquid Damage in Randpark Ridge? Act Now.</h2>
            <p className="text-[#7A9E98] mb-6">Same-day collection from Randpark Ridge. Assessment from R599. From R599 assessment.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={buildWhatsAppUrl('LDR-RANDPARK', 'liquid-damage')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 transition-all">
                💬 WhatsApp — Act Now
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
          <PricingRange page="/liquid-damage/randpark-ridge" />
          <PricingNote />
        </div>
      </section>

    </>
  );
}
