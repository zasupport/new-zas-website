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
  title: 'MacBook Liquid Damage Repair Bedfordview | ZA Support Hyde Park',
  description:
    'MacBook liquid damage repair for Bedfordview clients. Ultrasonic cleaning, board-level diagnostics. We collect from Bedfordview. Assessment from R599. Call 064 529 5863.',
  alternates: { canonical: 'https://zasupport.com/liquid-damage/bedfordview' },
};

const urgentSteps = [
  { step: '01', title: 'Switch Off Immediately', desc: 'Do not attempt to use or charge the MacBook. Power it off and leave it off — powering a wet board causes short-circuit damage.' },
  { step: '02', title: 'Do Not Use Rice', desc: 'Rice does not remove corrosion or clean contaminated contacts. It wastes critical intervention time while corrosion spreads.' },
  { step: '03', title: 'Contact Us Now', desc: 'WhatsApp or call us immediately. Every hour increases corrosion spread. We arrange same-day collection from Bedfordview.' },
  { step: '04', title: 'Ultrasonic Cleaning', desc: 'Full disassembly. Logic board cleaned in ultrasonic bath to remove corrosion and contaminants at component level.' },
  { step: '05', title: 'Diagnostic and Repair', desc: 'Post-clean diagnostic to identify damaged components. Board-level repair under magnification.' },
  { step: '06', title: 'Return to Bedfordview', desc: 'Your device returned clean, fully tested, with a ZA Support warranty on all repaired components.' },
];

const faqs = [
  { question: 'How quickly should I contact you after liquid damage in Bedfordview?', answer: 'Immediately — ideally within the first hour. Power the MacBook off by holding the power button for 10 seconds, do not plug in the charger to test it, and phone 064 529 5863. Bedfordview is roughly 20 to 25 minutes from our Hyde Park workshop via the M1 and N3, so we can usually arrange same-day collection if you call before mid-afternoon. The window between the spill and the ultrasonic clean is the single biggest factor in whether the board survives.' },
  { question: 'Do you collect MacBooks from Bedfordview after liquid damage?', answer: 'Yes. We collect from across Bedfordview including Bedford Park, Bedford Gardens, St Andrews, and the streets around Bedford Centre and Van Buuren Road. We have also collected from offices in Bedford Office Park and medical suites near the Linksfield ridge. The collection driver routes via the N3 and brings the machine directly to the Hyde Park workshop, where the diagnostic process begins the same day in most cases.' },
  { question: 'What does the liquid damage assessment cost?', answer: 'Assessment is from R599 and includes the strip-down, ultrasonic clean of the logic board, and a written report covering what is repairable and what the component-level repair will cost. If you proceed with the repair, the assessment fee is credited against the final invoice. We will not start any work beyond the diagnostic without your written approval of the quote.' },
  { question: 'What types of liquid cause the most damage?', answer: 'Sugar-bearing liquids are the most aggressive — wine, fizzy drinks, sweet coffee, and energy drinks leave a conductive residue that keeps corroding the board after the visible moisture has gone. Salt water and seawater are also extremely destructive. Plain still water is the least damaging if the machine is powered off immediately, but tap water still contains enough mineral content to corrode traces over time. We see all of these in Bedfordview, with coffee and wine being the most common in the home-office and entertaining contexts.' },
  { question: 'My MacBook got wet but still works. Should I bring it in?', answer: 'Yes, and the sooner the better. A MacBook that still boots after a spill is not in the clear — corrosion progresses over days and weeks, and the failure often happens after the residue has eaten through a key trace or component. We have had Bedfordview clients bring in machines that worked fine for a fortnight after a spill, only to die suddenly. An early ultrasonic clean is far cheaper than the board-level repair needed once corrosion has spread.' },
  { question: 'Will you be able to save my data?', answer: 'In most cases yes, but it depends on the model. Older MacBooks with removable SSDs allow us to read the drive on a separate rig even if the logic board is unrecoverable. Apple Silicon machines and recent T2 models have the storage soldered to the board and encrypted to the secure enclave, which means data recovery is tied to repairing enough of the board to boot it once. We will tell you upfront in the diagnostic report exactly what the data prospects look like for your specific machine.' },
  { question: 'Is there a From R599 assessment policy for liquid damage?', answer: 'Yes — the assessment starts at R599 and covers the full diagnostic process including the ultrasonic clean of the board. You receive a written quote for the actual repair before any further work is carried out, and the R599 is credited against the repair total if you proceed. There are no hidden charges added during the diagnostic itself.' },
  { question: 'Can you repair Apple Silicon MacBooks with liquid damage?', answer: 'Yes. We repair liquid damage on M1, M2, and M3 MacBooks at component level, including the M2 and M3 Air models that are increasingly common with Bedfordview clients. Apple Silicon boards are more densely packed and the storage is bound to the secure enclave, which makes the repair more delicate and the data recovery more dependent on board-level success — but the work is well within the scope of our microscope bench, and we complete these repairs regularly.' },
];

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'MacBook Liquid Damage Repair Bedfordview',
  description: 'MacBook liquid damage repair for Bedfordview clients. Ultrasonic cleaning, board-level diagnostics. Collection from Bedfordview.',
  provider: LOCAL_BUSINESS_PROVIDER,
  areaServed: [
    { '@type': 'City', name: 'Johannesburg' },
    { '@type': 'Neighborhood', name: 'Bedfordview' },
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://zasupport.com' },
    { '@type': 'ListItem', position: 2, name: 'Liquid Damage Repair', item: 'https://zasupport.com/liquid-damage' },
    { '@type': 'ListItem', position: 3, name: 'Bedfordview', item: 'https://zasupport.com/liquid-damage/bedfordview' },
  ],
};

const faqSchema = buildFaqSchema(faqs);

export default function LiquidDamageBedfordviewPage() {
  return (
    <>
      <SchemaOrg schema={faqSchema} />
      <SchemaOrg schema={serviceSchema} />
      <SchemaOrg schema={breadcrumbSchema} />

      <section className="hero-gradient grid-overlay pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[
            { label: 'Liquid Damage Repair', href: '/liquid-damage' },
            { label: 'Bedfordview' },
          ]} />
          <div className="mt-8 max-w-4xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#E8F4F1] leading-tight mb-6">
              MacBook Liquid Damage Repair Bedfordview
              <br /><span className="text-[#0FEA7A]">— Act Fast, Save Your Mac</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-4 max-w-3xl leading-relaxed">
              Liquid damage is time-critical, and Bedfordview&apos;s position alongside the N3 and Van Buuren Road means we can usually have a courier at your door within the hour. We collect from homes near Bedford Centre, offices around Bedford Gardens, and the medical suites on Smith Road, then carry out ultrasonic cleaning and board-level repair at our Hyde Park workshop roughly 20 minutes west. Assessment from R599.
            </p>
            <div className="flex items-center gap-2 text-[#7A9E98] text-sm mb-8">
              <Clock className="w-4 h-4 text-[#0FEA7A]" />
              <span>Same-day collection from Bedfordview — contact us immediately after liquid exposure</span>
            </div>
            <div className="flex flex-wrap gap-4 mb-8">
              {[
                { icon: AlertTriangle, label: 'Act Within Hours' },
                { icon: CheckCircle, label: 'Ultrasonic Cleaning' },
                { icon: MapPin, label: 'Collect from Bedfordview' },
                { icon: CheckCircle, label: 'From R599 assessment' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 bg-[rgba(15,234,122,0.08)] border border-[rgba(15,234,122,0.15)] px-4 py-2 rounded-full">
                  <Icon className="w-4 h-4 text-[#0FEA7A]" />
                  <span className="text-[#E8F4F1] text-sm font-medium">{label}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href={buildWhatsAppUrl('LDR-BEDFORDV', 'liquid-damage')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 hover:shadow-[0_0_32px_rgba(15,234,122,0.4)] transition-all">
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
            Liquid Damage Repair for Bedfordview Clients
          </h2>
          <div className="space-y-4 text-[#7A9E98] leading-relaxed">
            <p>
              Bedfordview sits in a humidity pocket between the ridge and the N3, and we have noticed it produces a particular cluster of liquid damage cases — condensation build-up during load-shedding cycles, spills in home offices where the MacBook lives next to a coffee mug all day, and pool-side accidents in the Bedford Park and St Andrews residential streets. The pattern we see is the same regardless of the liquid: the initial short-circuit when the machine is powered, followed by progressive corrosion as moisture sits on copper traces. Sugar-bearing liquids — wine, energy drinks, sweetened coffee — leave a conductive residue that keeps damaging the board for days after the spill appears to have dried. The single most important thing you can do is press and hold the power button to force a shutdown, then phone us on 064 529 5863 before plugging in a charger to check.
            </p>
            <p>
              We have collected MacBooks from law firms in Bedford Gardens during lunch hours, from medical practices on Van Buuren Road between patient appointments, and from family homes around Bedford Centre and the Eastgate side of the suburb. The drive from our Hyde Park workshop down the M1 and across to the N3 takes about 20 to 25 minutes depending on the time of day, and avoiding the afternoon Gillooly&apos;s Interchange congestion is part of how we keep collections same-day. Once the machine is on the bench we strip it down, lift the logic board, and put it through a commercial ultrasonic bath to remove every trace of residue and contaminant. Only then do we apply heat under the microscope to deal with corroded traces, lifted pads, and any components that need to be replaced individually.
            </p>
            <p>
              Not every liquid-damaged MacBook can be saved, but the majority that reach us within the first week can be. We have brought boards back to full function for clients in Bedfordview who assumed their machine was finished — including one Bedford Park resident whose MacBook Pro sat in a drawer for three weeks after a wine spill and still recovered after a full clean and two component-level replacements. After your diagnostic you receive a written report covering exactly what is repairable, what the cost looks like, and what the data recovery prospects are. WhatsApp wa.me/27645295863 to arrange collection.
            </p>
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQAccordion items={faqs} title="Liquid Damage Repair Bedfordview — Common Questions" />
        </div>
      </section>

      <section className="py-8 sm:py-16 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#E8F4F1] mb-6">We Also Serve These Areas</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { label: "Edenvale", href: "/liquid-damage/edenvale" },
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
            <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3">Liquid Damage in Bedfordview? Act Now.</h2>
            <p className="text-[#7A9E98] mb-6">Same-day collection from Bedfordview. Assessment from R599. From R599 assessment.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={buildWhatsAppUrl('LDR-BEDFORDV', 'liquid-damage')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 transition-all">
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
          <PricingRange page="/liquid-damage/bedfordview" />
          <PricingNote />
        </div>
      </section>

    </>
  );
}
