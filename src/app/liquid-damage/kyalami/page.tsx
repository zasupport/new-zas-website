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
  title: 'MacBook Liquid Damage Repair Kyalami | ZA Support Hyde Park',
  description:
    'MacBook liquid damage repair for Kyalami clients. Ultrasonic cleaning, board-level diagnostics. We collect from Kyalami. Assessment from R599. Call 064 529 5863.',
  alternates: { canonical: 'https://zasupport.com/liquid-damage/kyalami' },
};

const urgentSteps = [
  { step: '01', title: 'Switch Off Immediately', desc: 'Do not attempt to use or charge the MacBook. Power it off and leave it off — powering a wet board causes short-circuit damage.' },
  { step: '02', title: 'Do Not Use Rice', desc: 'Rice does not remove corrosion or clean contaminated contacts. It wastes critical intervention time while corrosion spreads.' },
  { step: '03', title: 'Contact Us Now', desc: 'WhatsApp or call us immediately. Every hour increases corrosion spread. We arrange same-day collection from Kyalami.' },
  { step: '04', title: 'Ultrasonic Cleaning', desc: 'Full disassembly. Logic board cleaned in ultrasonic bath to remove corrosion and contaminants at component level.' },
  { step: '05', title: 'Diagnostic and Repair', desc: 'Post-clean diagnostic to identify damaged components. Board-level repair under magnification.' },
  { step: '06', title: 'Return to Kyalami', desc: 'Your device returned clean, fully tested, with a ZA Support warranty on all repaired components.' },
];

const faqs = [
  { question: 'How quickly should I contact you after liquid damage in Kyalami?', answer: 'Within the first few hours if at all possible. Power the MacBook down immediately, do not plug it in to test, and contact us on 064 529 5863. We can usually arrange a collection from Kyalami the same day, and from our Hyde Park workshop the drive is around 25 minutes via the M1, so the unit can be on the bench and disassembled the same afternoon. Every hour the liquid sits on the logic board increases corrosion.' },
  { question: 'Do you collect MacBooks from Kyalami after liquid damage?', answer: 'Yes. We collect across Kyalami AH, Kyalami Estates, Kyalami Hills, and the business parks off Allandale Road and R55. The route from Hyde Park is roughly 25 minutes outside peak traffic. For liquid damage we prioritise these collections because the time-to-bench window directly affects what we can save. Call 064 529 5863 or WhatsApp wa.me/27645295863 to arrange a same-day pickup.' },
  { question: 'What does the liquid damage assessment cost?', answer: 'Assessment is from R599 and includes full disassembly, ultrasonic cleaning of the logic board, microscopic inspection, and a written report with a fixed repair quote. If you proceed with the repair the assessment fee is absorbed into the final cost. We do not start any chargeable work without your written approval first.' },
  { question: 'What types of liquid cause the most damage?', answer: 'Sugary and acidic liquids are the worst offenders — coffee with sugar, wine, energy drinks, and fruit juice all leave aggressive residue that continues corroding components long after the initial spill has dried. Plain water is more forgiving if the MacBook is powered down quickly. In Kyalami we also see condensation damage from units left in cold cars overnight after warm interiors, particularly during winter.' },
  { question: 'My MacBook got wet but still works. Should I bring it in?', answer: 'Yes, and ideally within a day or two. A MacBook that still boots after a spill is not safe — corrosion develops over days and weeks beneath the shielding, and we frequently see units fail completely two or three weeks after the original incident. An early ultrasonic clean is far cheaper than a full board-level repair later. It is one of the most worthwhile preventive jobs we do.' },
  { question: 'Will you be able to save my data?', answer: 'In the majority of liquid damage cases, yes. On Apple Silicon MacBooks the storage is soldered to the logic board, which makes data recovery dependent on getting the board functional again — another reason early action matters. On older Intel MacBooks with removable SSDs, data recovery is often possible even when the board itself is beyond repair. We will tell you honestly at assessment what the data position looks like.' },
  { question: 'Is there a From R599 assessment policy for liquid damage?', answer: 'Yes. The assessment fee starts at R599 and covers the diagnostic work needed to give you a fixed quote — disassembly, ultrasonic cleaning, and board inspection under microscope. You then decide whether to proceed. If you do, the assessment fee is rolled into the repair cost. There are no surprise charges added later.' },
  { question: 'Can you repair Apple Silicon MacBooks with liquid damage?', answer: 'Yes. We carry out board-level repair on M1, M2, M3 and M4 MacBook Air and Pro models, including component-level replacement of damaged power management ICs, charging circuitry, and corroded passive components. Apple Silicon boards are denser and less forgiving than the older Intel designs, which makes early intervention even more important for Kyalami clients with newer machines.' },
];

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'MacBook Liquid Damage Repair Kyalami',
  description: 'MacBook liquid damage repair for Kyalami clients. Ultrasonic cleaning, board-level diagnostics. Collection from Kyalami.',
  provider: LOCAL_BUSINESS_PROVIDER,
  areaServed: [
    { '@type': 'City', name: 'Johannesburg' },
    { '@type': 'Neighborhood', name: 'Kyalami' },
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://zasupport.com' },
    { '@type': 'ListItem', position: 2, name: 'Liquid Damage Repair', item: 'https://zasupport.com/liquid-damage' },
    { '@type': 'ListItem', position: 3, name: 'Kyalami', item: 'https://zasupport.com/liquid-damage/kyalami' },
  ],
};

const faqSchema = buildFaqSchema(faqs);

export default function LiquidDamageKyalamiPage() {
  return (
    <>
      <SchemaOrg schema={faqSchema} />
      <SchemaOrg schema={serviceSchema} />
      <SchemaOrg schema={breadcrumbSchema} />

      <section className="hero-gradient grid-overlay pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[
            { label: 'Liquid Damage Repair', href: '/liquid-damage' },
            { label: 'Kyalami' },
          ]} />
          <div className="mt-8 max-w-4xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#E8F4F1] leading-tight mb-6">
              MacBook Liquid Damage Repair Kyalami
              <br /><span className="text-[#0FEA7A]">— Act Fast, Save Your Mac</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-4 max-w-3xl leading-relaxed">
              Liquid damage to a MacBook in Kyalami needs attention within hours, not days. We collect from Kyalami Estates, Kyalami Business Park and the broader Kyalami AH area, then carry out ultrasonic cleaning and board-level repair at our Hyde Park workshop, roughly 25 minutes south via the M1. Assessment from R599.
            </p>
            <div className="flex items-center gap-2 text-[#7A9E98] text-sm mb-8">
              <Clock className="w-4 h-4 text-[#0FEA7A]" />
              <span>Same-day collection from Kyalami — contact us immediately after liquid exposure</span>
            </div>
            <div className="flex flex-wrap gap-4 mb-8">
              {[
                { icon: AlertTriangle, label: 'Act Within Hours' },
                { icon: CheckCircle, label: 'Ultrasonic Cleaning' },
                { icon: MapPin, label: 'Collect from Kyalami' },
                { icon: CheckCircle, label: 'From R599 assessment' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 bg-[rgba(15,234,122,0.08)] border border-[rgba(15,234,122,0.15)] px-4 py-2 rounded-full">
                  <Icon className="w-4 h-4 text-[#0FEA7A]" />
                  <span className="text-[#E8F4F1] text-sm font-medium">{label}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href={buildWhatsAppUrl('LDR-KYALAMI', 'liquid-damage')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 hover:shadow-[0_0_32px_rgba(15,234,122,0.4)] transition-all">
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
            Liquid Damage Repair for Kyalami Clients
          </h2>
          <div className="space-y-4 text-[#7A9E98] leading-relaxed">
            <p>
              The Kyalami corridor brings us a particular mix of liquid damage cases. Equestrian estate residents with home offices, race-circuit hospitality staff, and the cluster of motorsport and engineering businesses around Kyalami Business Park all rely heavily on their MacBooks. We have seen coffee spills during weekend GP track events, water damage from estate pool areas, and the slow corrosion that follows a small spill someone tried to dry with a hairdryer two weeks earlier. The pattern is always the same — the longer corrosion sits on a logic board, the more aggressive the repair becomes. A unit brought to us within twenty-four hours of a spill has a substantially better prognosis than one switched on and used for a week afterwards.
            </p>
            <p>
              Collection from Kyalami is straightforward for us. The run down the M1 or via Main Road and William Nicol takes us into the heart of Kyalami AH, the estates off R55 Kyalami Boulevard, and the office parks along Allandale Road. We have collected from law and accounting firms near the Kyalami Corner shopping centre during the working day and returned the repaired MacBook within the same week. Our process is the same regardless of where you are based: ultrasonic bath cleaning to lift residue from beneath shielding cans, microscopic inspection of the logic board, replacement of corroded components, and full functional testing before the machine goes back to you.
            </p>
            <p>
              Liquid damage is rarely a verdict — it is a diagnosis with options. We have brought MacBooks back from Kyalami that arrived a month after a wine spill, and we have also had to be honest with clients when a board is genuinely beyond economical repair. Either way, you receive a clear written assessment with a fixed quote before any chargeable work begins. If the repair is not viable, we can recover your data in most cases and advise on the best replacement path. For Kyalami clients who depend on their MacBook for race weekends, estate management, or running a small business from home, that clarity matters more than a vague promise.
            </p>
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQAccordion items={faqs} title="Liquid Damage Repair Kyalami — Common Questions" />
        </div>
      </section>

      <section className="py-8 sm:py-16 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#E8F4F1] mb-6">We Also Serve These Areas</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { label: "Midrand", href: "/liquid-damage/midrand" },
              { label: "Paulshof", href: "/liquid-damage/paulshof" },
              { label: "Fourways", href: "/liquid-damage/fourways" },
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
            <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3">Liquid Damage in Kyalami? Act Now.</h2>
            <p className="text-[#7A9E98] mb-6">Same-day collection from Kyalami. Assessment from R599. From R599 assessment.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={buildWhatsAppUrl('LDR-KYALAMI', 'liquid-damage')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 transition-all">
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
          <PricingRange page="/liquid-damage/kyalami" />
          <PricingNote />
        </div>
      </section>

    </>
  );
}
