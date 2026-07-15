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
  title: 'MacBook Liquid Damage Repair Illovo | ZA Support Hyde Park',
  description:
    'MacBook liquid damage repair for Illovo clients. Ultrasonic cleaning, board-level diagnostics. We collect from Illovo. Assessment. Call 064 529 5863.',
  alternates: { canonical: 'https://zasupport.com/liquid-damage/illovo' },
};

const urgentSteps = [
  { step: '01', title: 'Switch Off Immediately', desc: 'Do not attempt to use or charge the MacBook. Power it off and leave it off, powering a wet board causes short-circuit damage.' },
  { step: '02', title: 'Do Not Use Rice', desc: 'Rice does not remove corrosion or clean contaminated contacts. It wastes critical intervention time while corrosion spreads.' },
  { step: '03', title: 'Contact Us Now', desc: 'WhatsApp or call us immediately. Every hour increases corrosion spread. We arrange same-day collection from Illovo.' },
  { step: '04', title: 'Ultrasonic Cleaning', desc: 'Full disassembly. Logic board cleaned in ultrasonic bath to remove corrosion and contaminants at component level.' },
  { step: '05', title: 'Diagnostic and Repair', desc: 'Post-clean diagnostic to identify damaged components. Board-level repair under magnification.' },
  { step: '06', title: 'Return to Illovo', desc: 'Your device returned clean, fully tested, with a ZA Support warranty on all repaired components.' },
];

const faqs = [
  { question: 'How quickly should I contact you after liquid damage in Illovo?', answer: 'Immediately, ideally within the first hour. Power the MacBook off, do not press any keys to test it, and call us on 064 529 5863. From Illovo we can usually have a driver with you within 30 minutes via Oxford Road or the M1, which gets the board into ultrasonic cleaning the same afternoon. The success rate drops noticeably after 24 hours and again after 72 hours as corrosion sets in.' },
  { question: 'Do you collect MacBooks from Illovo after liquid damage?', answer: 'Yes, collection from anywhere in Illovo is included. We cover Illovo Boulevard, Oxford Road, Harries Road, the area around Illovo Junction and Thrupps Centre, and the residential streets towards Rudd Road and Glenhove. Hyde Park workshop is roughly 6 minutes away, so liquid-damage collections from Illovo are prioritised over routine jobs.' },
  { question: 'What does the liquid damage assessment cost?', answer: 'Our assessment includes full disassembly, ultrasonic cleaning of the logic board and a microscope inspection to identify damaged components. You then receive a written quote for the repair itself. If you choose not to proceed, the assessment fee is all you pay, the machine is reassembled and returned to you in Illovo.' },
  { question: 'What types of liquid cause the most damage?', answer: 'Sugary drinks and wine are the worst because they leave a conductive residue that keeps corroding the board long after the visible liquid has dried. Sparkling water is surprisingly aggressive for the same reason. Plain water is the gentlest, though still serious if the machine was powered when it hit the keyboard. Coffee, the most common spill we see from Illovo offices, sits in the middle: the sugar and milk leave residue, but it is manageable if we get the board into ultrasonic cleaning quickly.' },
  { question: 'My MacBook got wet but still works. Should I bring it in?', answer: 'Yes, urgently. A MacBook that still works after a spill is the best-case scenario for recovery, but the corrosion is already starting on the board. The longer you keep using it, the more components fail one at a time, usually starting with the keyboard backlight, then individual keys, then trackpad, then charging. Bring it in while it still works and the repair is far cheaper than waiting until it does not.' },
  { question: 'Will you be able to save my data?', answer: 'In the great majority of liquid-damage cases, yes. Even when the logic board is beyond economic repair, we can usually recover data directly from the storage, on Intel MacBooks via the SSD, and on Apple Silicon models via the data-recovery port using Apple\'s documented procedure. We confirm data recoverability during the assessment so you know where you stand before committing to a board-level repair.' },
  { question: 'Is there an assessment policy for liquid damage?', answer: 'Yes, every liquid-damage job starts with the assessment. That covers collection from Illovo, disassembly, ultrasonic cleaning and a full diagnostic. You then receive a written quote for the actual repair work and decide whether to proceed. There are no hidden charges added later.' },
  { question: 'Can you repair Apple Silicon MacBooks with liquid damage?', answer: 'Yes. M1, M2 and M3 MacBooks need a different approach because the SSD is soldered to the board and the storage is tied to the secure enclave, but the underlying liquid-damage repair process is the same, ultrasonic cleaning, microscope inspection, component-level replacement. Several of the Apple Silicon machines we have recovered came from professional practices around Oxford Road, so the workflow is well established.' },
];

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'MacBook Liquid Damage Repair Illovo',
  description: 'MacBook liquid damage repair for Illovo clients. Ultrasonic cleaning, board-level diagnostics. Collection from Illovo.',
  provider: LOCAL_BUSINESS_PROVIDER,
  areaServed: [
    { '@type': 'City', name: 'Johannesburg' },
    { '@type': 'Neighborhood', name: 'Illovo' },
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://zasupport.com' },
    { '@type': 'ListItem', position: 2, name: 'Liquid Damage Repair', item: 'https://zasupport.com/liquid-damage' },
    { '@type': 'ListItem', position: 3, name: 'Illovo', item: 'https://zasupport.com/liquid-damage/illovo' },
  ],
};

const faqSchema = buildFaqSchema(faqs);

export default function LiquidDamageIllovoPage() {
  return (
    <>
      <SchemaOrg schema={faqSchema} />
      <SchemaOrg schema={serviceSchema} />
      <SchemaOrg schema={breadcrumbSchema} />

      <section className="hero-gradient grid-overlay pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[
            { label: 'Liquid Damage Repair', href: '/liquid-damage' },
            { label: 'Illovo' },
          ]} />
          <div className="mt-8 max-w-4xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#E8F4F1] leading-tight mb-6">
              MacBook Liquid Damage Repair Illovo
              <br /><span className="text-[#0FEA7A]">, Act Fast, Save Your Mac</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-4 max-w-3xl leading-relaxed">
              Liquid damage in Illovo needs a fast response, every hour the corrosion spreads further across the logic board. We collect from homes along Harries Road, professional practices on Oxford Road, and the medical and legal suites near Illovo Junction, then run ultrasonic cleaning and board-level repair at our Hyde Park workshop roughly 6 minutes up the road. Assessment.
            </p>
            <div className="flex items-center gap-2 text-[#7A9E98] text-sm mb-8">
              <Clock className="w-4 h-4 text-[#0FEA7A]" />
              <span>Same-day collection from Illovo, contact us immediately after liquid exposure</span>
            </div>
            <div className="flex flex-wrap gap-4 mb-8">
              {[
                { icon: AlertTriangle, label: 'Act Within Hours' },
                { icon: CheckCircle, label: 'Ultrasonic Cleaning' },
                { icon: MapPin, label: 'Collect from Illovo' },
                { icon: CheckCircle, label: 'Assessment' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 bg-[rgba(15,234,122,0.08)] border border-[rgba(15,234,122,0.15)] px-4 py-2 rounded-full">
                  <Icon className="w-4 h-4 text-[#0FEA7A]" />
                  <span className="text-[#E8F4F1] text-sm font-medium">{label}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href={buildWhatsAppUrl('LDR-ILLOVO', 'liquid-damage')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 hover:shadow-[0_0_32px_rgba(15,234,122,0.4)] transition-all">
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
            Liquid Damage Repair for Illovo Clients
          </h2>
          <div className="space-y-4 text-[#7A9E98] leading-relaxed">
            <p>
              The Illovo MacBooks that reach our Hyde Park bench tell a consistent story. Coffee spills from the cafés around Illovo Junction and Thrupps Centre are the most common, followed by water bottles tipped onto machines in the open-plan offices along Oxford Road, and the occasional wine spill from work-from-home setups in the older homes off Rudd Road. The pattern we see is straightforward: liquid on a logic board causes two distinct injuries, the immediate short-circuit when the machine is powered, and the slower corrosion that eats through traces and component legs in the days that follow. Pure water is the gentlest. Sugary drinks, sparkling water and wine are the worst because the sugars and minerals stay behind as a conductive film long after the visible liquid has dried.
            </p>
            <p>
              Illovo&apos;s mix of legal practices, financial advisers and creative agencies means the machines we collect here are usually in the middle of billable work, so turnaround matters as much as the repair itself. Same-day collection from Illovo Boulevard, the Oxford Road commercial strip and the residential streets between Glenhove and Rudd is usually possible if you call before midday, the M1 onramp at Glenhove gets us back to Hyde Park in well under ten minutes outside of peak. Once the board is on the bench it goes through a commercial ultrasonic bath to lift every trace of residue, then a full microscope inspection to find lifted pads, corroded traces and damaged components. Where individual chips have failed we replace them at component level rather than swapping the whole logic board, which keeps the cost realistic.
            </p>
            <p>
              Not every liquid-damaged MacBook can be brought back, but the majority can, including machines that have sat in a drawer for weeks after the spill because the owner assumed it was dead. We have returned MacBooks to advocates working from chambers near Oxford Road within the same week of collection, and recovered data from machines that would not power on at all. After the diagnostic you receive a clear written assessment of what is repairable, what it will cost, and what the realistic outcome looks like, call 064 529 5863 or WhatsApp wa.me/27645295863 to arrange collection from Illovo.
            </p>
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQAccordion items={faqs} title="Liquid Damage Repair Illovo, Common Questions" />
        </div>
      </section>

      <section className="py-8 sm:py-16 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#E8F4F1] mb-6">We Also Serve These Areas</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { label: "Rosebank", href: "/liquid-damage/rosebank" },
              { label: "Sandton", href: "/liquid-damage/sandton" },
              { label: "Parktown North", href: "/liquid-damage/parktown-north" },
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
            <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3">Liquid Damage in Illovo? Act Now.</h2>
            <p className="text-[#7A9E98] mb-6">Same-day collection from Illovo. Assessment available.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={buildWhatsAppUrl('LDR-ILLOVO', 'liquid-damage')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 transition-all">
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
          <PricingRange page="/liquid-damage/illovo" />
          <PricingNote />
        </div>
      </section>

    </>
  );
}
