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
  title: 'MacBook Liquid Damage Repair Boksburg | ZA Support Hyde Park',
  description:
    'MacBook liquid damage repair for Boksburg clients. Ultrasonic cleaning, board-level diagnostics. We collect from Boksburg. Assessment from R599. Call 064 529 5863.',
  alternates: { canonical: 'https://zasupport.com/liquid-damage/boksburg' },
};

const urgentSteps = [
  { step: '01', title: 'Switch Off Immediately', desc: 'Do not attempt to use or charge the MacBook. Power it off and leave it off, powering a wet board causes short-circuit damage.' },
  { step: '02', title: 'Do Not Use Rice', desc: 'Rice does not remove corrosion or clean contaminated contacts. It wastes critical intervention time while corrosion spreads.' },
  { step: '03', title: 'Contact Us Now', desc: 'WhatsApp or call us immediately. Every hour increases corrosion spread. We arrange same-day collection from Boksburg.' },
  { step: '04', title: 'Ultrasonic Cleaning', desc: 'Full disassembly. Logic board cleaned in ultrasonic bath to remove corrosion and contaminants at component level.' },
  { step: '05', title: 'Diagnostic and Repair', desc: 'Post-clean diagnostic to identify damaged components. Board-level repair under magnification.' },
  { step: '06', title: 'Return to Boksburg', desc: 'Your device returned clean, fully tested, with a ZA Support warranty on all repaired components.' },
];

const faqs = [
  { question: 'How quickly should I contact you after liquid damage in Boksburg?', answer: 'Phone us on 064 529 5863 within the first few hours if possible. Power the MacBook off immediately, do not try to dry it with a hair dryer, and do not put it in rice, that is a myth that traps moisture against the board. Because Boksburg is about 40 minutes from Hyde Park via the R21, we can usually arrange same-day collection from areas like Bartlett, Parkdene or Sunward Park if you call before midday.' },
  { question: 'Do you collect MacBooks from Boksburg after liquid damage?', answer: 'Yes. We collect across Boksburg North, Boksburg CBD, Bardene, Atlasville, Parkdene, Beyers Park and out to Vosloorus and Reiger Park. Our courier typically routes via the N12 or R21 depending on traffic around OR Tambo. WhatsApp your address to 064 529 5863 and we will confirm a collection window for the same or next working day.' },
  { question: 'What does the liquid damage assessment cost?', answer: 'Assessment is from R599. That covers full disassembly, ultrasonic cleaning of the logic board where appropriate, and a microscope inspection so we can give you a written quote with the actual fault list. If you go ahead with the repair, you only pay the repair total; if you decline, you pay only the R599 and we return the unit.' },
  { question: 'What types of liquid cause the most damage?', answer: 'Sugary and salty liquids are the worst, Coke, juice, sweetened coffee, wine, and surprisingly the protein shakes we have seen from a few Boksburg gym-goers. They leave conductive residue that keeps creating shorts long after the visible liquid has dried. Plain water is more forgiving but still corrosive over days. Borehole or pool water also tends to be harder on boards than municipal tap water.' },
  { question: 'My MacBook got wet but still works. Should I bring it in?', answer: 'Yes, urgently. A working MacBook after a spill is the most misleading situation we deal with. Corrosion continues silently under the chips and around the keyboard membrane, and the machine often fails three to ten days later, usually with backlight loss, trackpad issues, or no power at all. An ultrasonic clean while the board is still healthy is far cheaper than a board repair afterwards.' },
  { question: 'Will you be able to save my data?', answer: 'In most cases yes. If the SSD chips themselves are physically intact (which is usually the case), we can either repair the board enough to boot the machine and copy your data off, or in more severe cases transplant the storage onto a working donor logic board for recovery. We discuss the data option openly during the quote stage so you can decide whether recovery alone is enough or whether you want the full repair.' },
  { question: 'Is there a From R599 assessment policy for liquid damage?', answer: 'Yes. The assessment fee is from R599 and includes disassembly, cleaning where needed, and a detailed written quote. If the repair is not economical, for example if multiple major components are corroded beyond reasonable cost, we will tell you that honestly and only the R599 applies. No surprise charges and no pressure to proceed.' },
  { question: 'Can you repair Apple Silicon MacBooks with liquid damage?', answer: 'Yes. M1, M2 and M3 MacBook Air and Pro models all come through our workshop with liquid damage. The repair approach is similar to Intel boards, ultrasonic clean, replace corroded passives and ICs, repair damaged rails, but the soldered storage on Apple Silicon makes early action even more important, because data recovery is more involved if the board cannot be revived. The sooner a Boksburg client gets the unit to us, the better the outcome.' },
];

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'MacBook Liquid Damage Repair Boksburg',
  description: 'MacBook liquid damage repair for Boksburg clients. Ultrasonic cleaning, board-level diagnostics. Collection from Boksburg.',
  provider: LOCAL_BUSINESS_PROVIDER,
  areaServed: [
    { '@type': 'City', name: 'Johannesburg' },
    { '@type': 'Neighborhood', name: 'Boksburg' },
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://zasupport.com' },
    { '@type': 'ListItem', position: 2, name: 'Liquid Damage Repair', item: 'https://zasupport.com/liquid-damage' },
    { '@type': 'ListItem', position: 3, name: 'Boksburg', item: 'https://zasupport.com/liquid-damage/boksburg' },
  ],
};

const faqSchema = buildFaqSchema(faqs);

export default function LiquidDamageBoksburgPage() {
  return (
    <>
      <SchemaOrg schema={faqSchema} />
      <SchemaOrg schema={serviceSchema} />
      <SchemaOrg schema={breadcrumbSchema} />

      <section className="hero-gradient grid-overlay pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[
            { label: 'Liquid Damage Repair', href: '/liquid-damage' },
            { label: 'Boksburg' },
          ]} />
          <div className="mt-8 max-w-4xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#E8F4F1] leading-tight mb-6">
              MacBook Liquid Damage Repair Boksburg
              <br /><span className="text-[#0FEA7A]">, Act Fast, Save Your Mac</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-4 max-w-3xl leading-relaxed">
              Liquid damage on a MacBook is a race against corrosion, and Boksburg sits roughly 40 minutes from our Hyde Park workshop via the R21 and N12. We collect from Boksburg North, Bartlett, Parkdene and the CBD, then carry out ultrasonic board cleaning and component-level repair the same week. Assessment from R599.
            </p>
            <div className="flex items-center gap-2 text-[#7A9E98] text-sm mb-8">
              <Clock className="w-4 h-4 text-[#0FEA7A]" />
              <span>Same-day collection from Boksburg, contact us immediately after liquid exposure</span>
            </div>
            <div className="flex flex-wrap gap-4 mb-8">
              {[
                { icon: AlertTriangle, label: 'Act Within Hours' },
                { icon: CheckCircle, label: 'Ultrasonic Cleaning' },
                { icon: MapPin, label: 'Collect from Boksburg' },
                { icon: CheckCircle, label: 'From R599 assessment' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 bg-[rgba(15,234,122,0.08)] border border-[rgba(15,234,122,0.15)] px-4 py-2 rounded-full">
                  <Icon className="w-4 h-4 text-[#0FEA7A]" />
                  <span className="text-[#E8F4F1] text-sm font-medium">{label}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href={buildWhatsAppUrl('LDR-BOKSBURG', 'liquid-damage')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 hover:shadow-[0_0_32px_rgba(15,234,122,0.4)] transition-all">
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
            Liquid Damage Repair for Boksburg Clients
          </h2>
          <div className="space-y-4 text-[#7A9E98] leading-relaxed">
            <p>
              Boksburg&apos;s mix of East Rand industry, Lakeside Mall shoppers and East Rand Mall office workers means we see a broad spread of liquid incidents, coffee spills from open-plan offices near North Rand Road, geyser leaks in older Parkdene homes, and water bottle accidents in school bags coming home from Hoërskool Boksburg. The pattern we have consistently observed is that the first 24 hours decide most outcomes. The initial short-circuit when sugary or salty liquid bridges traces is one problem; the slower corrosion that eats pads, vias and BGA solder joints over the following days is the bigger one. Powering the machine on to check if it still works is exactly what accelerates the second kind of damage.
            </p>
            <p>
              Same-day collection from Boksburg works well because of the road network, we can route through the N12 to reach Bardene, Sunward Park and Atlasville, or come in via the R21 for clients closer to OR Tambo and Bartlett. Once the MacBook reaches our Hyde Park bench, the logic board is removed, stripped of shields and connectors, and run through a commercial ultrasonic bath that lifts residue out of pad arrays and under chips where isopropyl swabs simply cannot reach. From there it is microscope work: replacing corroded backlight circuitry, repairing SMC and PMIC rails, and in some cases reballing chips that have lifted from the board. We have brought back machines that were written off elsewhere in Boksburg and Vosloorus after a quick visual inspection.
            </p>
            <p>
              Realistically, not every liquid-damaged MacBook comes back, but most do. We have handled units collected from accounting firms on Trichardts Road that returned to service within five working days, and home users near Cinderella Dam whose machines arrived two weeks after the spill and still recovered fully. After diagnostic you receive a clear written quote, what is repairable, what is not, and where data recovery sits if the board cannot be saved. If you decline the repair you pay only the R599 assessment; nothing is committed without your sign-off.
            </p>
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQAccordion items={faqs} title="Liquid Damage Repair Boksburg, Common Questions" />
        </div>
      </section>

      <section className="py-8 sm:py-16 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#E8F4F1] mb-6">We Also Serve These Areas</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { label: "Benoni", href: "/liquid-damage/benoni" },
              { label: "Germiston", href: "/liquid-damage/germiston" },
              { label: "Edenvale", href: "/liquid-damage/edenvale" },
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
            <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3">Liquid Damage in Boksburg? Act Now.</h2>
            <p className="text-[#7A9E98] mb-6">Same-day collection from Boksburg. Assessment from R599. From R599 assessment.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={buildWhatsAppUrl('LDR-BOKSBURG', 'liquid-damage')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 transition-all">
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
          <PricingRange page="/liquid-damage/boksburg" />
          <PricingNote />
        </div>
      </section>

    </>
  );
}
