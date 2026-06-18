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
  title: 'MacBook Liquid Damage Repair Roodepoort | ZA Support Hyde Park',
  description:
    'MacBook liquid damage repair for Roodepoort clients. Ultrasonic cleaning, board-level diagnostics. We collect from Roodepoort. Assessment from R599. Call 064 529 5863.',
  alternates: { canonical: 'https://zasupport.com/liquid-damage/roodepoort' },
};

const urgentSteps = [
  { step: '01', title: 'Switch Off Immediately', desc: 'Do not attempt to use or charge the MacBook. Power it off and leave it off, powering a wet board causes short-circuit damage.' },
  { step: '02', title: 'Do Not Use Rice', desc: 'Rice does not remove corrosion or clean contaminated contacts. It wastes critical intervention time while corrosion spreads.' },
  { step: '03', title: 'Contact Us Now', desc: 'WhatsApp or call us immediately. Every hour increases corrosion spread. We arrange same-day collection from Roodepoort.' },
  { step: '04', title: 'Ultrasonic Cleaning', desc: 'Full disassembly. Logic board cleaned in ultrasonic bath to remove corrosion and contaminants at component level.' },
  { step: '05', title: 'Diagnostic and Repair', desc: 'Post-clean diagnostic to identify damaged components. Board-level repair under magnification.' },
  { step: '06', title: 'Return to Roodepoort', desc: 'Your device returned clean, fully tested, with a ZA Support warranty on all repaired components.' },
];

const faqs = [
  { question: 'How quickly should I contact you after liquid damage in Roodepoort?', answer: 'Phone us the moment the spill happens. From the time liquid touches the logic board, corrosion begins forming on copper traces and component pads. Roodepoort to our Hyde Park workshop is roughly 32 minutes via the N1, and our collection driver can usually be at a Constantia Kloof office or a Florida home within an hour of your call. The single biggest factor in whether your board is fully recoverable is the gap between incident and ultrasonic cleaning. Switch the machine off, do not attempt to charge it, and call 064 529 5863.' },
  { question: 'Do you collect MacBooks from Roodepoort after liquid damage?', answer: 'Yes, we collect across the full Roodepoort area including Florida, Constantia Kloof, Wilropark, Weltevreden Park, Allen\'s Nek, Little Falls, Wilgeheuwel, Northcliff-side, and the Westgate corridor. The N1 connection to Hyde Park makes the trip predictable, and for liquid damage we prioritise same-day collection because each hour matters. Message wa.me/27645295863 with your suburb and the nearest landmark and we will confirm a collection slot. We bring anti-static packaging so the MacBook is protected in transit.' },
  { question: 'What does the liquid damage assessment cost?', answer: 'Assessment is from R599. That covers full disassembly at our Hyde Park workshop, microscope inspection of the logic board, identification of which components have failed, and a written quote with a fixed repair price before any work proceeds. If you decide not to repair, the assessment fee is all you pay. For Roodepoort clients we hold the assessment fee separate from the repair quote so there is no confusion about what you are committing to.' },
  { question: 'What types of liquid cause the most damage?', answer: 'Sugary and acidic liquids cause the worst long-term damage, Coke, juice, wine and coffee with milk leave residues that keep corroding the board long after the initial spill dries. Plain water is the most forgiving but still causes shorting if power is applied. Salt water and pool water are particularly aggressive. The Roodepoort jobs we see most often involve coffee on closed lids in home offices and juice spills in family kitchens, both of which respond well to early ultrasonic cleaning.' },
  { question: 'My MacBook got wet but still works. Should I bring it in?', answer: 'Yes, urgently. A MacBook that still works after a spill is the most deceptive scenario, it tells you nothing about what is happening on the board. Corrosion continues to form for days and weeks under the surface, and a machine that booted fine on Monday can fail by the weekend with a far more expensive failure. We have seen Roodepoort clients delay because the machine seemed fine, only to bring it in a fortnight later with a dead power rail that was straightforward to clean in the first 24 hours.' },
  { question: 'Will you be able to save my data?', answer: 'In the majority of cases, yes. Even when the logic board is beyond economical repair, we can usually recover data directly from the SSD. On older MacBooks the SSD is removable and reads easily on a recovery rig. On newer T2 and Apple Silicon machines the storage is soldered and encrypted to the board, so the route is to repair the board enough to boot and pull the data off. We tell Roodepoort clients honestly at assessment which path their specific machine needs.' },
  { question: 'Is there a From R599 assessment policy for liquid damage?', answer: 'Yes. The assessment fee starts from R599 and covers the full diagnostic and quote. We do not quote blind over the phone for liquid damage because the only way to know what is repairable is to open the machine, clean the board, and inspect under the microscope. Once that is done you receive a fixed price, and the choice to proceed is entirely yours.' },
  { question: 'Can you repair Apple Silicon MacBooks with liquid damage?', answer: 'Yes. We repair M1, M2 and M3 MacBook Air and Pro models at board level, replacing damaged power management ICs, resistors, capacitors and other discrete components. Apple\'s own route is full logic board replacement at substantial cost, and many Roodepoort clients come to us specifically after receiving that quote. Component-level rework on Apple Silicon is what we do daily, and it is consistently a fraction of the swap price.' },
];

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'MacBook Liquid Damage Repair Roodepoort',
  description: 'MacBook liquid damage repair for Roodepoort clients. Ultrasonic cleaning, board-level diagnostics. Collection from Roodepoort.',
  provider: LOCAL_BUSINESS_PROVIDER,
  areaServed: [
    { '@type': 'City', name: 'Johannesburg' },
    { '@type': 'Neighborhood', name: 'Roodepoort' },
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://zasupport.com' },
    { '@type': 'ListItem', position: 2, name: 'Liquid Damage Repair', item: 'https://zasupport.com/liquid-damage' },
    { '@type': 'ListItem', position: 3, name: 'Roodepoort', item: 'https://zasupport.com/liquid-damage/roodepoort' },
  ],
};

const faqSchema = buildFaqSchema(faqs);

export default function LiquidDamageRoodepoortPage() {
  return (
    <>
      <SchemaOrg schema={faqSchema} />
      <SchemaOrg schema={serviceSchema} />
      <SchemaOrg schema={breadcrumbSchema} />

      <section className="hero-gradient grid-overlay pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[
            { label: 'Liquid Damage Repair', href: '/liquid-damage' },
            { label: 'Roodepoort' },
          ]} />
          <div className="mt-8 max-w-4xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#E8F4F1] leading-tight mb-6">
              MacBook Liquid Damage Repair Roodepoort
              <br /><span className="text-[#0FEA7A]">, Act Fast, Save Your Mac</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-4 max-w-3xl leading-relaxed">
              Liquid damage on a MacBook is a race against corrosion, and Roodepoort sits roughly 32 minutes from our Hyde Park workshop along the N1. We collect from homes near Northgate, businesses along Ontdekkers Road, and residents around Little Falls and Weltevreden Park, then carry out ultrasonic cleaning and board-level repair the same day. Assessment from R599.
            </p>
            <div className="flex items-center gap-2 text-[#7A9E98] text-sm mb-8">
              <Clock className="w-4 h-4 text-[#0FEA7A]" />
              <span>Same-day collection from Roodepoort, contact us immediately after liquid exposure</span>
            </div>
            <div className="flex flex-wrap gap-4 mb-8">
              {[
                { icon: AlertTriangle, label: 'Act Within Hours' },
                { icon: CheckCircle, label: 'Ultrasonic Cleaning' },
                { icon: MapPin, label: 'Collect from Roodepoort' },
                { icon: CheckCircle, label: 'From R599 assessment' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 bg-[rgba(15,234,122,0.08)] border border-[rgba(15,234,122,0.15)] px-4 py-2 rounded-full">
                  <Icon className="w-4 h-4 text-[#0FEA7A]" />
                  <span className="text-[#E8F4F1] text-sm font-medium">{label}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href={buildWhatsAppUrl('LDR-ROODEPOO', 'liquid-damage')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 hover:shadow-[0_0_32px_rgba(15,234,122,0.4)] transition-all">
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
            Liquid Damage Repair for Roodepoort Clients
          </h2>
          <div className="space-y-4 text-[#7A9E98] leading-relaxed">
            <p>
              Roodepoort has a mix we do not see in every suburb, Constantia Kloof corporate offices, Florida Lake residential pockets, retail traders around Westgate, and family homes throughout Wilropark and Little Falls. The liquid incidents reflect that mix. We collect MacBooks from kitchen counters in Florida where a kettle has tipped, from offices on Hendrik Potgieter Road where coffee has landed on a closed lid, and from students living near the University of Johannesburg&apos;s Doornfontein campus who commute in from the West Rand. The pattern is consistent: corrosion begins within minutes, and the gap between incident and ultrasonic cleaning determines what we can save.
            </p>
            <p>
              Distance matters less than people assume because the N1 from Roodepoort into Hyde Park is direct, and our driver can be at a Constantia Kloof office or a Wilgeheuwel home inside the hour during off-peak windows. Once a board reaches the workshop it goes through full disassembly, a commercial ultrasonic bath to lift sugar residue and corrosion salts, microscope inspection of every IC and trace, and targeted board-level rework where components have failed. For Apple Silicon machines we replace damaged power management ICs and resistors on the same boards Apple would replace wholesale, which is why our repair price is consistently a fraction of the swap quote.
            </p>
            <p>
              We have collected liquid-damaged MacBooks from medical practices near Flora Clinic, from a logistics business off Beyers Naudé Drive after a roof leak during a Highveld thunderstorm, and from a family in Allen&apos;s Nek whose toddler emptied a juice cup directly onto the keyboard. Each one tells us the same thing, the Roodepoort homes and offices we service want a clear diagnostic, an honest repair cost, and their data back. If your MacBook has taken liquid, switch it off, do not charge it, and phone 064 529 5863 or message wa.me/27645295863 so we can arrange collection before the corrosion progresses any further.
            </p>
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQAccordion items={faqs} title="Liquid Damage Repair Roodepoort, Common Questions" />
        </div>
      </section>

      <section className="py-8 sm:py-16 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#E8F4F1] mb-6">We Also Serve These Areas</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { label: "Randburg", href: "/liquid-damage/randburg" },
              { label: "Northcliff", href: "/liquid-damage/northcliff" },
              { label: "Krugersdorp", href: "/liquid-damage/krugersdorp" },
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
            <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3">Liquid Damage in Roodepoort? Act Now.</h2>
            <p className="text-[#7A9E98] mb-6">Same-day collection from Roodepoort. Assessment from R599. From R599 assessment.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={buildWhatsAppUrl('LDR-ROODEPOO', 'liquid-damage')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 transition-all">
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
          <PricingRange page="/liquid-damage/roodepoort" />
          <PricingNote />
        </div>
      </section>

    </>
  );
}
