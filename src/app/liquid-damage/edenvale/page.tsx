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
  title: 'MacBook Liquid Damage Repair Edenvale | ZA Support Hyde Park',
  description:
    'MacBook liquid damage repair for Edenvale clients. Ultrasonic cleaning, board-level diagnostics. We collect from Edenvale. Assessment. Call 064 529 5863.',
  alternates: { canonical: 'https://zasupport.com/liquid-damage/edenvale' },
};

const urgentSteps = [
  { step: '01', title: 'Switch Off Immediately', desc: 'Do not attempt to use or charge the MacBook. Power it off and leave it off, powering a wet board causes short-circuit damage.' },
  { step: '02', title: 'Do Not Use Rice', desc: 'Rice does not remove corrosion or clean contaminated contacts. It wastes critical intervention time while corrosion spreads.' },
  { step: '03', title: 'Contact Us Now', desc: 'WhatsApp or call us immediately. Every hour increases corrosion spread. We arrange same-day collection from Edenvale.' },
  { step: '04', title: 'Ultrasonic Cleaning', desc: 'Full disassembly. Logic board cleaned in ultrasonic bath to remove corrosion and contaminants at component level.' },
  { step: '05', title: 'Diagnostic and Repair', desc: 'Post-clean diagnostic to identify damaged components. Board-level repair under magnification.' },
  { step: '06', title: 'Return to Edenvale', desc: 'Your device returned clean, fully tested, with a ZA Support warranty on all repaired components.' },
];

const faqs = [
  { question: 'How quickly should I contact you after liquid damage in Edenvale?', answer: 'Immediately. Power the MacBook off, do not try to charge it, and call 064 529 5863. The first 24 hours determine whether you need a clean and dry-out, or a full board-level repair. Edenvale is roughly 25 minutes from our Hyde Park workshop via the N3 and M1, so we can usually collect the same day if you call before midday.' },
  { question: 'Do you collect MacBooks from Edenvale after liquid damage?', answer: 'Yes. We collect from anywhere in Edenvale, Hurlyvale, Eastleigh, Sebenza, Greenstone, and the streets around Van Riebeeck Avenue. Because liquid damage is time-critical, we treat Edenvale collections as priority and aim to have the MacBook on a workbench in Hyde Park within a few hours of your call. WhatsApp wa.me/27645295863 to arrange.' },
  { question: 'What does the liquid damage assessment cost?', answer: 'Our assessment covers full disassembly, ultrasonic cleaning of the board, microscope inspection, and a written report telling you exactly what is damaged, what it will cost to repair, and the realistic prognosis. If you choose to proceed with the repair, the assessment fee is credited toward the final bill.' },
  { question: 'What types of liquid cause the most damage?', answer: 'Sugary and acidic liquids are the worst, wine, fizzy drinks, juice, and coffee with sugar all leave conductive residue that keeps corroding long after the MacBook dries. Plain water is the least aggressive, but tap water in Edenvale still contains enough mineral content to cause corrosion over days. Salt water and pool water are devastating because the chloride attacks copper traces aggressively.' },
  { question: 'My MacBook got wet but still works. Should I bring it in?', answer: 'Yes, please. A MacBook that still boots after a spill is on borrowed time. The corrosion happens silently underneath the board components, and the failure usually arrives one to three weeks later, often killing parts that were not damaged by the original spill. An ultrasonic clean now is much cheaper than a logic board replacement later. Drop it off or let us collect from Edenvale.' },
  { question: 'Will you be able to save my data?', answer: 'In most cases yes. The SSD on modern MacBooks is soldered to the logic board, but the data itself is usually recoverable even when the board has significant damage, we can transplant the storage controller or read the chips directly in the worst cases. Our data recovery success rate on liquid-damaged Edenvale MacBooks has been strong, but no honest technician guarantees data recovery upfront.' },
  { question: 'Is there an assessment policy for liquid damage?', answer: 'Yes. The assessment fee covers the diagnostic work itself, disassembly, ultrasonic cleaning, and inspection, because liquid damage assessment is genuinely labour-intensive work, not a quick visual check. Anyone offering free liquid damage assessment is either cutting corners or planning to overcharge on the repair to compensate. The assessment fee is credited toward your repair if you proceed.' },
  { question: 'Can you repair Apple Silicon MacBooks with liquid damage?', answer: 'Yes, we repair liquid-damaged M1, M2, and M3 MacBook Air and Pro models at board level. Apple Silicon boards are denser and more challenging than Intel boards, but the repair principles are the same: ultrasonic clean, identify corroded components, replace under microscope. We have completed dozens of Apple Silicon liquid repairs for Edenvale and East Rand clients.' },
];

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'MacBook Liquid Damage Repair Edenvale',
  description: 'MacBook liquid damage repair for Edenvale clients. Ultrasonic cleaning, board-level diagnostics. Collection from Edenvale.',
  provider: LOCAL_BUSINESS_PROVIDER,
  areaServed: [
    { '@type': 'City', name: 'Johannesburg' },
    { '@type': 'Neighborhood', name: 'Edenvale' },
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://zasupport.com' },
    { '@type': 'ListItem', position: 2, name: 'Liquid Damage Repair', item: 'https://zasupport.com/liquid-damage' },
    { '@type': 'ListItem', position: 3, name: 'Edenvale', item: 'https://zasupport.com/liquid-damage/edenvale' },
  ],
};

const faqSchema = buildFaqSchema(faqs);

export default function LiquidDamageEdenvalePage() {
  return (
    <>
      <SchemaOrg schema={faqSchema} />
      <SchemaOrg schema={serviceSchema} />
      <SchemaOrg schema={breadcrumbSchema} />

      <section className="hero-gradient grid-overlay pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[
            { label: 'Liquid Damage Repair', href: '/liquid-damage' },
            { label: 'Edenvale' },
          ]} />
          <div className="mt-8 max-w-4xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#E8F4F1] leading-tight mb-6">
              MacBook Liquid Damage Repair Edenvale
              <br /><span className="text-[#0FEA7A]">, Act Fast, Save Your Mac</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-4 max-w-3xl leading-relaxed">
              Liquid damage is a race against corrosion. We collect MacBooks from Edenvale homes near Van Riebeeck Avenue, businesses around Eastgate, and residents close to Bedford Centre, then carry out ultrasonic cleaning and board-level repair at our Hyde Park workshop, roughly 25 minutes via the M2 or N3. Assessment.
            </p>
            <div className="flex items-center gap-2 text-[#7A9E98] text-sm mb-8">
              <Clock className="w-4 h-4 text-[#0FEA7A]" />
              <span>Same-day collection from Edenvale, contact us immediately after liquid exposure</span>
            </div>
            <div className="flex flex-wrap gap-4 mb-8">
              {[
                { icon: AlertTriangle, label: 'Act Within Hours' },
                { icon: CheckCircle, label: 'Ultrasonic Cleaning' },
                { icon: MapPin, label: 'Collect from Edenvale' },
                { icon: CheckCircle, label: 'Assessment' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 bg-[rgba(15,234,122,0.08)] border border-[rgba(15,234,122,0.15)] px-4 py-2 rounded-full">
                  <Icon className="w-4 h-4 text-[#0FEA7A]" />
                  <span className="text-[#E8F4F1] text-sm font-medium">{label}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href={buildWhatsAppUrl('LDR-EDENVALE', 'liquid-damage')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 hover:shadow-[0_0_32px_rgba(15,234,122,0.4)] transition-all">
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
            Liquid Damage Repair for Edenvale Clients
          </h2>
          <div className="space-y-4 text-[#7A9E98] leading-relaxed">
            <p>
              Edenvale sits at a crossroads of the East Rand, with the N3 to the east, the R24 cutting south toward OR Tambo, and Van Riebeeck Avenue threading through the heart of the suburb. We collect from homes around Greenstone Hill, the older streets near Hurlyvale, and offices along Herman Road. The pattern we see consistently from Edenvale clients is coffee and tea spills on home-office setups, a knock-on effect of the hybrid working culture that took hold after 2020, followed by water from baby bottles, pets knocking over glasses, and kitchen-counter splashes. Liquid on a logic board causes two distinct problems: the immediate short circuit, and the slow corrosion that follows. The second is what kills MacBooks that &apos;seemed fine&apos; for a week.
            </p>
            <p>
              Because Edenvale is close to OR Tambo and the industrial belt around Isando and Sebenza, a meaningful share of the MacBooks we collect here belong to logistics managers, freight controllers, and small business owners running their operations from home offices. Downtime costs money, so we prioritise these collections, typically same-day if the call comes in before midday. Our workflow at the Hyde Park workshop starts with a full disassembly, an ultrasonic bath to lift sugar residue and corrosion salts off the board, microscope inspection of the affected components, and only then a board-level repair quote. No guessing, no logic board swap unless that is genuinely the only option.
            </p>
            <p>
              We have collected MacBooks from Edenvale clients where the spill happened on a Friday night and the machine arrived in our workshop on Saturday morning, those are the easy wins. We have also restored boards that sat untouched for a month after a wine spill, with corrosion green and crusty by the time we opened them. Both can succeed. The honest assessment we provide after diagnostic will tell you what is repairable, what it will cost, and whether the data is recoverable, call 064 529 5863 or WhatsApp wa.me/27645295863 to arrange collection.
            </p>
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQAccordion items={faqs} title="Liquid Damage Repair Edenvale, Common Questions" />
        </div>
      </section>

      <section className="py-8 sm:py-16 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#E8F4F1] mb-6">We Also Serve These Areas</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { label: "Bedfordview", href: "/liquid-damage/bedfordview" },
              { label: "Germiston", href: "/liquid-damage/germiston" },
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
            <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3">Liquid Damage in Edenvale? Act Now.</h2>
            <p className="text-[#7A9E98] mb-6">Same-day collection from Edenvale. Assessment available.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={buildWhatsAppUrl('LDR-EDENVALE', 'liquid-damage')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 transition-all">
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
          <PricingRange page="/liquid-damage/edenvale" />
          <PricingNote />
        </div>
      </section>

    </>
  );
}
