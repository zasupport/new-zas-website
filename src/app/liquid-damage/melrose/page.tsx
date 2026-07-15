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
  title: 'MacBook Liquid Damage Repair Melrose | ZA Support Hyde Park',
  description:
    'MacBook liquid damage repair for Melrose clients. Ultrasonic cleaning, board-level diagnostics. We collect from Melrose. Assessment. Call 064 529 5863.',
  alternates: { canonical: 'https://zasupport.com/liquid-damage/melrose' },
};

const urgentSteps = [
  { step: '01', title: 'Switch Off Immediately', desc: 'Do not attempt to use or charge the MacBook. Power it off and leave it off, powering a wet board causes short-circuit damage.' },
  { step: '02', title: 'Do Not Use Rice', desc: 'Rice does not remove corrosion or clean contaminated contacts. It wastes critical intervention time while corrosion spreads.' },
  { step: '03', title: 'Contact Us Now', desc: 'WhatsApp or call us immediately. Every hour increases corrosion spread. We arrange same-day collection from Melrose.' },
  { step: '04', title: 'Ultrasonic Cleaning', desc: 'Full disassembly. Logic board cleaned in ultrasonic bath to remove corrosion and contaminants at component level.' },
  { step: '05', title: 'Diagnostic and Repair', desc: 'Post-clean diagnostic to identify damaged components. Board-level repair under magnification.' },
  { step: '06', title: 'Return to Melrose', desc: 'Your device returned clean, fully tested, with a ZA Support warranty on all repaired components.' },
];

const faqs = [
  { question: 'How quickly should I contact you after liquid damage in Melrose?', answer: 'Immediately, the first two hours matter more than any other window. Melrose sits about seven minutes from our Hyde Park workshop via Athol Oaklands Road, so a call to 064 529 5863 typically results in collection within the hour during business times. Power the MacBook off, unplug any charger, do not press keys to test it, and leave it lid-open and angled downward until we arrive. Every hour the board sits with residue on it deepens the corrosion.' },
  { question: 'Do you collect MacBooks from Melrose after liquid damage?', answer: 'Yes, free collection across Melrose Arch, Melrose North, Melrose Estate and Birdhaven. We regularly collect from the offices inside Melrose Arch itself, from medical and dental rooms around the precinct, and from homes off Glenhove and Corlett Drive. The short run back to Hyde Park means your machine is on a workbench and being stripped within twenty minutes of leaving you, which is exactly the speed liquid damage demands.' },
  { question: 'What does the liquid damage assessment cost?', answer: 'Assessment. That covers collection from Melrose, full teardown, ultrasonic cleaning of the logic board, and a microscope-level diagnostic report telling you exactly which components are corroded, what the repair will cost, and what the realistic prognosis is. If you choose to proceed with the repair the assessment fee is credited against the final quote. No surprises and no work done without your written approval.' },
  { question: 'What types of liquid cause the most damage?', answer: 'Sugary and salty liquids are the worst, Coke, sweetened coffee, sports drinks, wine and seawater. The sugar and salt residue stays conductive long after the liquid has dried, which means corrosion continues silently inside the casing. Plain water is the most forgiving but still causes oxidation within hours. Around Melrose we see a lot of flat-white and cappuccino spills from the cafés along the High Street, and those milk-and-sugar combinations are particularly aggressive on logic board traces.' },
  { question: 'My MacBook got wet but still works. Should I bring it in?', answer: 'Yes, urgently. A MacBook that still boots after a spill is the most deceptive scenario we deal with. The residue is sitting on the board corroding traces and component legs every minute the machine remains assembled, and the failure typically arrives one to three weeks later, often as an intermittent keyboard, a dead trackpad, or a board that suddenly will not charge. Ultrasonic cleaning now, while the machine still functions, is dramatically cheaper than full board repair later.' },
  { question: 'Will you be able to save my data?', answer: 'In the vast majority of cases, yes. Data recovery is treated as a separate priority from board repair, before we attempt any aggressive cleaning or component-level work, we image the SSD so your files are safe regardless of how the repair itself goes. For the Melrose practices and consultants we work with, this means patient records, case files, contracts and client correspondence come back even on machines that turn out to be uneconomical to repair at the board level.' },
  { question: 'Is there an Assessment policy for liquid damage?', answer: 'Yes. The assessment covers everything needed to give you an honest answer: collection from Melrose, full disassembly, ultrasonic cleaning, and a written diagnostic. You then decide whether to proceed. If you go ahead with the repair the assessment fee is credited against the final invoice. If the verdict is that the machine is not economically repairable, you have paid only the assessment fee to know that with certainty.' },
  { question: 'Can you repair Apple Silicon MacBooks with liquid damage?', answer: 'Yes, M1, M2, M3 and M4 MacBooks are all repairable at component level in our Hyde Park workshop. Apple Silicon boards are more densely packed than the older Intel models, which makes microscope work essential, but the underlying repair principles are the same: clean off the residue, identify the corroded components, and replace them individually rather than swapping the entire logic board. Component-level repair on these machines typically lands at a fraction of Apple\'s whole-board replacement quote.' },
];

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'MacBook Liquid Damage Repair Melrose',
  description: 'MacBook liquid damage repair for Melrose clients. Ultrasonic cleaning, board-level diagnostics. Collection from Melrose.',
  provider: LOCAL_BUSINESS_PROVIDER,
  areaServed: [
    { '@type': 'City', name: 'Johannesburg' },
    { '@type': 'Neighborhood', name: 'Melrose' },
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://zasupport.com' },
    { '@type': 'ListItem', position: 2, name: 'Liquid Damage Repair', item: 'https://zasupport.com/liquid-damage' },
    { '@type': 'ListItem', position: 3, name: 'Melrose', item: 'https://zasupport.com/liquid-damage/melrose' },
  ],
};

const faqSchema = buildFaqSchema(faqs);

export default function LiquidDamageMelrosePage() {
  return (
    <>
      <SchemaOrg schema={faqSchema} />
      <SchemaOrg schema={serviceSchema} />
      <SchemaOrg schema={breadcrumbSchema} />

      <section className="hero-gradient grid-overlay pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[
            { label: 'Liquid Damage Repair', href: '/liquid-damage' },
            { label: 'Melrose' },
          ]} />
          <div className="mt-8 max-w-4xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#E8F4F1] leading-tight mb-6">
              MacBook Liquid Damage Repair Melrose
              <br /><span className="text-[#0FEA7A]">, Act Fast, Save Your Mac</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-4 max-w-3xl leading-relaxed">
              Liquid damage in Melrose needs to be addressed within hours, not days. We collect from Melrose Arch, Melrose North, and Melrose Estate, then carry out ultrasonic cleaning and board-level repair at our Hyde Park workshop, roughly a seven-minute drive down Athol Oaklands and Glenhove. Assessment, with an honest verdict on what can realistically be saved.
            </p>
            <div className="flex items-center gap-2 text-[#7A9E98] text-sm mb-8">
              <Clock className="w-4 h-4 text-[#0FEA7A]" />
              <span>Same-day collection from Melrose, contact us immediately after liquid exposure</span>
            </div>
            <div className="flex flex-wrap gap-4 mb-8">
              {[
                { icon: AlertTriangle, label: 'Act Within Hours' },
                { icon: CheckCircle, label: 'Ultrasonic Cleaning' },
                { icon: MapPin, label: 'Collect from Melrose' },
                { icon: CheckCircle, label: 'Assessment' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 bg-[rgba(15,234,122,0.08)] border border-[rgba(15,234,122,0.15)] px-4 py-2 rounded-full">
                  <Icon className="w-4 h-4 text-[#0FEA7A]" />
                  <span className="text-[#E8F4F1] text-sm font-medium">{label}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href={buildWhatsAppUrl('LDR-MELROSE', 'liquid-damage')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 hover:shadow-[0_0_32px_rgba(15,234,122,0.4)] transition-all">
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
            Liquid Damage Repair for Melrose Clients
          </h2>
          <div className="space-y-4 text-[#7A9E98] leading-relaxed">
            <p>
              The Melrose client base we deal with is a particular mix, medical and dental practices around Melrose Arch, boutique law and consulting firms tucked along Corlett Drive, and residential professionals in Melrose Estate and Birdhaven. The liquid damage pattern reflects that demographic: spilled flat whites from the cafés along the High Street, water bottles knocked over in consulting rooms, and a surprising number of pool-edge incidents in summer. What stays constant is the chemistry. The moment liquid touches a powered logic board you get electrolytic corrosion, and every hour that passes deepens the damage on the copper traces and component legs. Powering the machine back on to check if it still works is the single most common mistake, it almost always accelerates the failure.
            </p>
            <p>
              We have collected MacBooks from reception desks inside Melrose Arch during lunch hour and returned working machines to the same office before the end of the week. The workflow is built for that turnaround: collection within roughly an hour of your call, full disassembly on arrival, commercial ultrasonic bath to lift sugar, salt and chloride residue from beneath the chips, then board-level diagnostics under microscope. Where traces are lifted or components are corroded beyond cleaning, we replace at component level rather than swapping the whole logic board. For Melrose practices that bill by the hour, the data recovery side matters as much as the repair, we image the SSD before any aggressive work, so even on a write-off the patient notes, case files and client records come back.
            </p>
            <p>
              Honesty matters more than optimism on liquid damage. Some Melrose machines we have seen, particularly those left in a drawer for a fortnight before the owner admitted what happened, are genuinely unrecoverable at the board, and we will tell you that on day one rather than running up costs. The majority, though, come back. If your MacBook took a spill at the office on Corlett Drive or at home off Glenhove Road, call 064 529 5863 or message wa.me/27645295863 now. Power it down, do not attempt to charge it, and let us collect it the same day.
            </p>
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQAccordion items={faqs} title="Liquid Damage Repair Melrose, Common Questions" />
        </div>
      </section>

      <section className="py-8 sm:py-16 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#E8F4F1] mb-6">We Also Serve These Areas</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { label: "Rosebank", href: "/liquid-damage/rosebank" },
              { label: "Illovo", href: "/liquid-damage/illovo" },
              { label: "Sandton", href: "/liquid-damage/sandton" },
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
            <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3">Liquid Damage in Melrose? Act Now.</h2>
            <p className="text-[#7A9E98] mb-6">Same-day collection from Melrose. Assessment.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={buildWhatsAppUrl('LDR-MELROSE', 'liquid-damage')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 transition-all">
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
          <PricingRange page="/liquid-damage/melrose" />
          <PricingNote />
        </div>
      </section>

    </>
  );
}
