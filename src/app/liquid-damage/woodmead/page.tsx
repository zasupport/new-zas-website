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
  title: 'MacBook Liquid Damage Repair Woodmead | ZA Support Hyde Park',
  description:
    'MacBook liquid damage repair for Woodmead clients. Ultrasonic cleaning, board-level diagnostics. We collect from Woodmead. Assessment. Call 064 529 5863.',
  alternates: { canonical: 'https://zasupport.com/liquid-damage/woodmead' },
};

const urgentSteps = [
  { step: '01', title: 'Switch Off Immediately', desc: 'Do not attempt to use or charge the MacBook. Power it off and leave it off, powering a wet board causes short-circuit damage.' },
  { step: '02', title: 'Do Not Use Rice', desc: 'Rice does not remove corrosion or clean contaminated contacts. It wastes critical intervention time while corrosion spreads.' },
  { step: '03', title: 'Contact Us Now', desc: 'WhatsApp or call us immediately. Every hour increases corrosion spread. We arrange same-day collection from Woodmead.' },
  { step: '04', title: 'Ultrasonic Cleaning', desc: 'Full disassembly. Logic board cleaned in ultrasonic bath to remove corrosion and contaminants at component level.' },
  { step: '05', title: 'Diagnostic and Repair', desc: 'Post-clean diagnostic to identify damaged components. Board-level repair under magnification.' },
  { step: '06', title: 'Return to Woodmead', desc: 'Your device returned clean, fully tested, with a ZA Support warranty on all repaired components.' },
];

const faqs = [
  { question: 'How quickly should I contact you after liquid damage in Woodmead?', answer: 'Immediately. From Woodmead we can usually have a courier with you within 30 to 45 minutes depending on traffic on the N1 and Western Service Road. Power the MacBook off, do not attempt to charge it, and call 064 529 5863. Corrosion begins within minutes of liquid touching the logic board, so the gap between spill and ultrasonic cleaning is the single biggest predictor of whether the repair succeeds.' },
  { question: 'Do you collect MacBooks from Woodmead after liquid damage?', answer: 'Yes. We collect from across Woodmead, Woodmead Office Park, Pinmill, Waterfall Edge side, Woodmead Estate, Sunninghill Gardens, and the residential streets off Maxwell Drive and Van Reenen Avenue. The drive from our Hyde Park workshop is approximately 18 minutes outside peak hours. For corporate clients we coordinate with building reception so collection can happen without you leaving a meeting.' },
  { question: 'What does the liquid damage assessment cost?', answer: 'Our assessment fee applies. That covers disassembly, inspection of the logic board under magnification, and a written report of what is needed to restore the machine. If you proceed with the repair the assessment fee is credited toward the total. We do not quote blind on liquid damage, every board tells a different story once it is opened.' },
  { question: 'What types of liquid cause the most damage?', answer: 'Sugary and acidic liquids are the worst, fizzy drinks, energy drinks, wine, coffee with sugar. They leave conductive residue that keeps corroding tracks long after the liquid itself has evaporated. Plain water is the most forgiving but still serious. Salt water and pool water are aggressive on the copper traces. We see all of these regularly from Woodmead, with coffee spills being by far the most common from the office-park clients.' },
  { question: 'My MacBook got wet but still works. Should I bring it in?', answer: 'Yes, urgently. A MacBook that still boots after a spill is the most deceptive scenario we deal with. The liquid is already on the board, the corrosion is already starting, and in our experience the machine will typically fail somewhere between two days and three weeks later, often with damage that has spread well beyond the original spill point. Bring it in while it is still working and the repair is dramatically cheaper.' },
  { question: 'Will you be able to save my data?', answer: 'In the majority of liquid damage cases the SSD survives even when the logic board does not, because the storage chips are on a separate area of the board and are often spared from the worst of the corrosion. On Apple Silicon machines this is more complex because the SSD is paired to the board, but we have data-recovery options for those cases too. Tell us during the call if data recovery is the priority and we will handle the disassembly accordingly.' },
  { question: 'Is there an Assessment policy for liquid damage?', answer: 'Yes, assessment applies and is credited toward the repair if you proceed. For liquid damage specifically the assessment is more involved than a normal diagnostic because the board needs to be disassembled and inspected under magnification before we can quote, which is why we charge for it. You receive a written report regardless of whether you go ahead with the repair.' },
  { question: 'Can you repair Apple Silicon MacBooks with liquid damage?', answer: 'Yes. M1, M2, and M3 MacBook Air and Pro models all come through our Hyde Park workshop regularly for liquid damage. The repair process is similar, ultrasonic cleaning, corrosion treatment, component-level work where tracks have been damaged, but the integration of the SSD with the main SoC means data recovery on Apple Silicon needs different handling. Tell us the model when you call and we will explain what is realistic for your specific machine.' },
];

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'MacBook Liquid Damage Repair Woodmead',
  description: 'MacBook liquid damage repair for Woodmead clients. Ultrasonic cleaning, board-level diagnostics. Collection from Woodmead.',
  provider: LOCAL_BUSINESS_PROVIDER,
  areaServed: [
    { '@type': 'City', name: 'Johannesburg' },
    { '@type': 'Neighborhood', name: 'Woodmead' },
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://zasupport.com' },
    { '@type': 'ListItem', position: 2, name: 'Liquid Damage Repair', item: 'https://zasupport.com/liquid-damage' },
    { '@type': 'ListItem', position: 3, name: 'Woodmead', item: 'https://zasupport.com/liquid-damage/woodmead' },
  ],
};

const faqSchema = buildFaqSchema(faqs);

export default function LiquidDamageWoodmeadPage() {
  return (
    <>
      <SchemaOrg schema={faqSchema} />
      <SchemaOrg schema={serviceSchema} />
      <SchemaOrg schema={breadcrumbSchema} />

      <section className="hero-gradient grid-overlay pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[
            { label: 'Liquid Damage Repair', href: '/liquid-damage' },
            { label: 'Woodmead' },
          ]} />
          <div className="mt-8 max-w-4xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#E8F4F1] leading-tight mb-6">
              MacBook Liquid Damage Repair Woodmead
              <br /><span className="text-[#0FEA7A]">, Act Fast, Save Your Mac</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-4 max-w-3xl leading-relaxed">
              Liquid damage on a MacBook is a race against corrosion, and Woodmead&apos;s position along the N1 and Western Service Road means we can have a courier at your office or estate in roughly 18 minutes from our Hyde Park workshop. We handle ultrasonic cleaning and board-level repair in-house. Assessment.
            </p>
            <div className="flex items-center gap-2 text-[#7A9E98] text-sm mb-8">
              <Clock className="w-4 h-4 text-[#0FEA7A]" />
              <span>Same-day collection from Woodmead, contact us immediately after liquid exposure</span>
            </div>
            <div className="flex flex-wrap gap-4 mb-8">
              {[
                { icon: AlertTriangle, label: 'Act Within Hours' },
                { icon: CheckCircle, label: 'Ultrasonic Cleaning' },
                { icon: MapPin, label: 'Collect from Woodmead' },
                { icon: CheckCircle, label: 'Assessment' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 bg-[rgba(15,234,122,0.08)] border border-[rgba(15,234,122,0.15)] px-4 py-2 rounded-full">
                  <Icon className="w-4 h-4 text-[#0FEA7A]" />
                  <span className="text-[#E8F4F1] text-sm font-medium">{label}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href={buildWhatsAppUrl('LDR-WOODMEAD', 'liquid-damage')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 hover:shadow-[0_0_32px_rgba(15,234,122,0.4)] transition-all">
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
            Liquid Damage Repair for Woodmead Clients
          </h2>
          <div className="space-y-4 text-[#7A9E98] leading-relaxed">
            <p>
              Woodmead sits in an unusual pocket, corporate parks along Waterfall Edge and Woodmead Drive on one side, established residential estates like Woodmead Estate and Sunninghill Gardens on the other, and the constant traffic flow of the N1 and Witkoppen Road cutting through. The liquid damage cases we collect here reflect that mix. From the office parks we see coffee and energy drink spills on machines used in long meeting blocks, and from the residential side we see kitchen-counter accidents and the occasional pool-deck incident during weekends at homes near the Woodmead Country Club area. The underlying physics is identical regardless of the suburb, but the response window is what we keep emphasising to Woodmead clients: corrosion on a logic board begins within minutes, not hours, and powering the machine back on to check if it still works is the single most damaging thing someone can do.
            </p>
            <p>
              Because so many Woodmead clients work from corporate buildings around Woodmead Retail Park, Pinmill Office Park, and the cluster of buildings near the Woodmead Value Mart, we have built our collection pattern around business-hour pickups that do not require staff to leave their desks. A typical case last month involved a financial services team off Van Reenen Avenue whose MacBook Pro had taken a full glass of sparkling water during a video call. The machine was off our courier&apos;s vehicle within forty minutes of the call, in the ultrasonic bath the same afternoon, and back with the user three days later with all data intact. That window, fast collection, immediate disassembly, ultrasonic cleaning before residue dries, is what separates a repairable board from a write-off.
            </p>
            <p>
              If your MacBook has had a spill anywhere in Woodmead, whether at a desk in Woodmead Office Park or at home off Maxwell Drive, do not try to dry it with rice, do not power it on to test, and do not wait until morning. Phone us on 064 529 5863 or WhatsApp wa.me/27645295863 and we will arrange collection. The diagnostic is honest, you will be told exactly what the board needs and what it will cost before any repair work begins, and if the machine is genuinely beyond economical repair we will tell you that too rather than running up your bill.
            </p>
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQAccordion items={faqs} title="Liquid Damage Repair Woodmead, Common Questions" />
        </div>
      </section>

      <section className="py-8 sm:py-16 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#E8F4F1] mb-6">We Also Serve These Areas</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { label: "Sunninghill", href: "/liquid-damage/sunninghill" },
              { label: "Paulshof", href: "/liquid-damage/paulshof" },
              { label: "Midrand", href: "/liquid-damage/midrand" },
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
            <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3">Liquid Damage in Woodmead? Act Now.</h2>
            <p className="text-[#7A9E98] mb-6">Same-day collection from Woodmead. Assessment.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={buildWhatsAppUrl('LDR-WOODMEAD', 'liquid-damage')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 transition-all">
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
          <PricingRange page="/liquid-damage/woodmead" />
          <PricingNote />
        </div>
      </section>

    </>
  );
}
