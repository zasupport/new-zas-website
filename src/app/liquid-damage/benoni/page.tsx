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
  title: 'MacBook Liquid Damage Repair Benoni | ZA Support Hyde Park',
  description:
    'MacBook liquid damage repair for Benoni clients. Ultrasonic cleaning, board-level diagnostics. We collect from Benoni. Assessment from R599. Call 064 529 5863.',
  alternates: { canonical: 'https://zasupport.com/liquid-damage/benoni' },
};

const urgentSteps = [
  { step: '01', title: 'Switch Off Immediately', desc: 'Do not attempt to use or charge the MacBook. Power it off and leave it off, powering a wet board causes short-circuit damage.' },
  { step: '02', title: 'Do Not Use Rice', desc: 'Rice does not remove corrosion or clean contaminated contacts. It wastes critical intervention time while corrosion spreads.' },
  { step: '03', title: 'Contact Us Now', desc: 'WhatsApp or call us immediately. Every hour increases corrosion spread. We arrange same-day collection from Benoni.' },
  { step: '04', title: 'Ultrasonic Cleaning', desc: 'Full disassembly. Logic board cleaned in ultrasonic bath to remove corrosion and contaminants at component level.' },
  { step: '05', title: 'Diagnostic and Repair', desc: 'Post-clean diagnostic to identify damaged components. Board-level repair under magnification.' },
  { step: '06', title: 'Return to Benoni', desc: 'Your device returned clean, fully tested, with a ZA Support warranty on all repaired components.' },
];

const faqs = [
  { question: 'How quickly should I contact you after liquid damage in Benoni?', answer: 'Contact us immediately, ideally within the first few hours. Power the MacBook down, do not plug it in, and call us on 064 529 5863 or WhatsApp wa.me/27645295863. We can arrange collection from anywhere in Benoni, whether you are in Lakefield, Northmead, Rynfield or near the CBD, and the sooner the board reaches our ultrasonic bath the more components we can save from ongoing corrosion.' },
  { question: 'Do you collect MacBooks from Benoni after liquid damage?', answer: 'Yes. Our courier collects from Benoni and the surrounding East Rand suburbs daily, covering Lakefield, Brentwood Park, Farrarmere, Crystal Park and the routes along Pretoria Road and Tom Jones Street. The drive to our Hyde Park workshop runs via the R21 and N3, around an hour each way depending on the time of day, so a morning collection typically means the board is on the bench by lunchtime.' },
  { question: 'What does the liquid damage assessment cost?', answer: 'Assessment is from R599. That covers full disassembly, ultrasonic cleaning of the logic board, microscope inspection and a written report listing every fault we find with a fixed repair quote. You then decide whether to proceed. If you choose not to repair, the assessment fee is all you pay, there are no hidden charges added later.' },
  { question: 'What types of liquid cause the most damage?', answer: 'Sugary drinks and salt-containing liquids are the worst, cold drinks, energy drinks, sports drinks and seawater leave a conductive, corrosive residue that continues attacking the board for weeks. Coffee and wine are next because of their acidity and sugar content. Plain water is the least aggressive but still causes shorts and corrosion, particularly Benoni municipal water which contains dissolved minerals. Regardless of the liquid, the response is identical: power down and get the machine to us.' },
  { question: 'My MacBook got wet but still works. Should I bring it in?', answer: 'Yes, and the sooner the better. A MacBook that still boots after a spill is on borrowed time, the residue on the board is slowly corroding traces and component legs, and within days or weeks you may see random shutdowns, charging faults or a board that simply does not power on again. We have had Benoni clients delay for a month then arrive with a dead machine that could have been saved cheaply if cleaned earlier.' },
  { question: 'Will you be able to save my data?', answer: 'In most cases yes. Modern MacBooks have the SSD soldered to the logic board, which means data recovery depends on whether the storage controller and NAND chips survived. If the board can be restored to a working state, your data comes back with it. If the board is beyond repair, we have board-level techniques to read the NAND directly in many cases. We will give you a clear answer after the diagnostic, no guesswork.' },
  { question: 'Is there a From R599 assessment policy for liquid damage?', answer: 'Yes. Assessment starts from R599 and includes the full strip-down, ultrasonic cleaning and detailed report. Some severely damaged boards may require additional diagnostic time which we will discuss with you upfront before any extra charge. The base R599 covers the vast majority of Benoni liquid-damage cases we see.' },
  { question: 'Can you repair Apple Silicon MacBooks with liquid damage?', answer: 'Yes. We repair M1, M2 and M3 MacBooks with liquid damage regularly. Apple Silicon boards are more densely packed than older Intel boards, which makes the repair more delicate, but the principles are identical, ultrasonic clean, microscope inspection, replace corroded components and repair damaged traces. Our microscope and rework station are set up specifically for the fine-pitch work these newer boards demand.' },
];

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'MacBook Liquid Damage Repair Benoni',
  description: 'MacBook liquid damage repair for Benoni clients. Ultrasonic cleaning, board-level diagnostics. Collection from Benoni.',
  provider: LOCAL_BUSINESS_PROVIDER,
  areaServed: [
    { '@type': 'City', name: 'Johannesburg' },
    { '@type': 'Neighborhood', name: 'Benoni' },
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://zasupport.com' },
    { '@type': 'ListItem', position: 2, name: 'Liquid Damage Repair', item: 'https://zasupport.com/liquid-damage' },
    { '@type': 'ListItem', position: 3, name: 'Benoni', item: 'https://zasupport.com/liquid-damage/benoni' },
  ],
};

const faqSchema = buildFaqSchema(faqs);

export default function LiquidDamageBenoniPage() {
  return (
    <>
      <SchemaOrg schema={faqSchema} />
      <SchemaOrg schema={serviceSchema} />
      <SchemaOrg schema={breadcrumbSchema} />

      <section className="hero-gradient grid-overlay pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[
            { label: 'Liquid Damage Repair', href: '/liquid-damage' },
            { label: 'Benoni' },
          ]} />
          <div className="mt-8 max-w-4xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#E8F4F1] leading-tight mb-6">
              MacBook Liquid Damage Repair Benoni
              <br /><span className="text-[#0FEA7A]">, Act Fast, Save Your Mac</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-4 max-w-3xl leading-relaxed">
              Liquid damage on a MacBook in Benoni needs urgent attention, every hour that passes while corrosion spreads across the logic board reduces what we can save. We collect from Benoni, Lakefield, Northmead and Rynfield, then run ultrasonic cleaning and board-level repair at our Hyde Park workshop, roughly an hour&apos;s drive via the R21 and N3. Assessment from R599.
            </p>
            <div className="flex items-center gap-2 text-[#7A9E98] text-sm mb-8">
              <Clock className="w-4 h-4 text-[#0FEA7A]" />
              <span>Same-day collection from Benoni, contact us immediately after liquid exposure</span>
            </div>
            <div className="flex flex-wrap gap-4 mb-8">
              {[
                { icon: AlertTriangle, label: 'Act Within Hours' },
                { icon: CheckCircle, label: 'Ultrasonic Cleaning' },
                { icon: MapPin, label: 'Collect from Benoni' },
                { icon: CheckCircle, label: 'From R599 assessment' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 bg-[rgba(15,234,122,0.08)] border border-[rgba(15,234,122,0.15)] px-4 py-2 rounded-full">
                  <Icon className="w-4 h-4 text-[#0FEA7A]" />
                  <span className="text-[#E8F4F1] text-sm font-medium">{label}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href={buildWhatsAppUrl('LDR-BENONI', 'liquid-damage')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 hover:shadow-[0_0_32px_rgba(15,234,122,0.4)] transition-all">
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
            Liquid Damage Repair for Benoni Clients
          </h2>
          <div className="space-y-4 text-[#7A9E98] leading-relaxed">
            <p>
              Benoni sits in the heart of the East Rand and we handle liquid damage from across the suburb regularly, Homestead Lake spills from picnickers caught in a Highveld thunderstorm, coffee accidents from home-office workers around Lakefield, and the occasional poolside disaster from properties bordering Benoni Lake. The pattern we see consistently is that residents wait too long, hoping the MacBook will dry out on its own. It will not. Liquid leaves a conductive residue on the logic board, and that residue continues to corrode traces and component legs long after the device looks dry. Whether the spill was filtered water, a sugared cold drink from Lakeside Mall food court, or wine at a dinner near Crystal Park, the chemistry is the same: stop using the machine, do not attempt to charge it, and get it to us.
            </p>
            <p>
              Many of our Benoni clients are professionals running their own practices or working remotely for Johannesburg-based firms, accountants, attorneys near the Benoni Magistrate&apos;s Court, and small business owners along Tom Jones Street. For these clients we offer collection that fits around the working day so the MacBook spends the shortest possible time off the desk. Our courier covers Benoni, Brentwood Park, Farrarmere and the routes feeding into the R21, and we have collected from offices near Lakeside Mall during business hours and returned the repaired machine within the same week. Once the board reaches the workshop it goes through a full strip-down, ultrasonic bath to lift contaminants from beneath chips and connectors, microscope inspection, and then targeted board-level repair, replacing corroded power management ICs, repairing burnt traces, or rebuilding pads where needed.
            </p>
            <p>
              We cannot promise every liquid-damaged MacBook will come back to life, but we can promise an honest assessment after the diagnostic. We have recovered machines that arrived a fortnight after the spill with visible corrosion across the board, and we have also had to advise clients that a logic board was beyond economical repair. Either way you receive a clear written report, a fixed quote before any work begins, and the option to recover your data even if the board itself cannot be saved. For Benoni residents that means no surprises and no pressure, just a proper East Rand repair option that does not require driving into Sandton yourself.
            </p>
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQAccordion items={faqs} title="Liquid Damage Repair Benoni, Common Questions" />
        </div>
      </section>

      <section className="py-8 sm:py-16 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#E8F4F1] mb-6">We Also Serve These Areas</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { label: "Boksburg", href: "/liquid-damage/boksburg" },
              { label: "Edenvale", href: "/liquid-damage/edenvale" },
              { label: "Springs", href: "/liquid-damage/springs" },
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
            <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3">Liquid Damage in Benoni? Act Now.</h2>
            <p className="text-[#7A9E98] mb-6">Same-day collection from Benoni. Assessment from R599. From R599 assessment.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={buildWhatsAppUrl('LDR-BENONI', 'liquid-damage')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 transition-all">
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
          <PricingRange page="/liquid-damage/benoni" />
          <PricingNote />
        </div>
      </section>

    </>
  );
}
