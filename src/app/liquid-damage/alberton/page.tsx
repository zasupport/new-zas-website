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
  title: 'MacBook Liquid Damage Repair Alberton | ZA Support Hyde Park',
  description:
    'MacBook liquid damage repair for Alberton clients. Ultrasonic cleaning, board-level diagnostics. We collect from Alberton. Assessment from R599. Call 064 529 5863.',
  alternates: { canonical: 'https://zasupport.com/liquid-damage/alberton' },
};

const urgentSteps = [
  { step: '01', title: 'Switch Off Immediately', desc: 'Do not attempt to use or charge the MacBook. Power it off and leave it off, powering a wet board causes short-circuit damage.' },
  { step: '02', title: 'Do Not Use Rice', desc: 'Rice does not remove corrosion or clean contaminated contacts. It wastes critical intervention time while corrosion spreads.' },
  { step: '03', title: 'Contact Us Now', desc: 'WhatsApp or call us immediately. Every hour increases corrosion spread. We arrange same-day collection from Alberton.' },
  { step: '04', title: 'Ultrasonic Cleaning', desc: 'Full disassembly. Logic board cleaned in ultrasonic bath to remove corrosion and contaminants at component level.' },
  { step: '05', title: 'Diagnostic and Repair', desc: 'Post-clean diagnostic to identify damaged components. Board-level repair under magnification.' },
  { step: '06', title: 'Return to Alberton', desc: 'Your device returned clean, fully tested, with a ZA Support warranty on all repaired components.' },
];

const faqs = [
  { question: 'How quickly should I contact you after liquid damage in Alberton?', answer: 'Within the first 24 hours if at all possible. Corrosion begins almost immediately once liquid contacts a powered logic board, and every hour the machine sits with residue inside reduces the repair odds. Alberton is around 35 minutes from our Hyde Park workshop on a clear run up the N3, so once you message us on 064 529 5863 we can usually have a courier collect the same day. Power the MacBook off, do not attempt to charge it, and leave it closed until we have it.' },
  { question: 'Do you collect MacBooks from Alberton after liquid damage?', answer: 'Yes, and we treat liquid damage collections as priority. We cover all of Alberton, New Redruth, Brackenhurst, Randhart, Meyersdal, Mayberry Park and the Alberton North side, and routinely pick up from homes, the offices around Alberton City, and medical practices near Netcare Alberton Hospital. WhatsApp wa.me/27645295863 with your address and we will confirm an ETA. The collection itself does not delay diagnostic work; the technician begins disassembly the same afternoon the unit arrives.' },
  { question: 'What does the liquid damage assessment cost?', answer: 'Liquid damage assessments are from R599. That covers full disassembly, microscope inspection of the logic board, identification of affected components and a written quote for the repair before any further work proceeds. If you choose to go ahead with the repair the assessment fee is absorbed into the final invoice. If the board is beyond economic repair we will tell you so honestly and discuss data recovery options instead.' },
  { question: 'What types of liquid cause the most damage?', answer: 'Sugary and acidic liquids are the worst, coffee with sugar, wine, fruit juice and energy drinks leave conductive residue that keeps causing shorts long after the visible liquid has dried. Salt water and pool water are also aggressive. Plain tap water is the most forgiving but still corrodes copper traces given enough time. We see all of these from Alberton households, but coffee spills from home offices in Meyersdal and Brackenhurst are by far the most common arrival in our workshop.' },
  { question: 'My MacBook got wet but still works. Should I bring it in?', answer: 'Yes, and the sooner the better. A MacBook that still boots after a spill is the best-case scenario for repair, because we can clean the board before corrosion eats through traces. The danger is leaving it: in two to six weeks you may suddenly lose the keyboard, trackpad, a USB-C port, or the machine may stop charging entirely. We would rather strip and ultrasonically clean a working board today than rebuild a failed one next month.' },
  { question: 'Will you be able to save my data?', answer: 'In most cases yes, even when the MacBook itself cannot be revived. On older Intel MacBooks the SSD is usually removable and we can read it directly. On Apple Silicon machines the storage is soldered and tied to the T2 or Apple Silicon security chip, which means data recovery requires the logic board to be brought back to a working state, something we do regularly. We discuss the data-recovery path during the diagnostic so you know what is possible before committing.' },
  { question: 'Is there a From R599 assessment policy for liquid damage?', answer: 'Yes. Liquid damage assessments start from R599 and that fee gives you a full board-level inspection plus a written repair quote. We do not work on a free-diagnostic basis because ultrasonic cleaning and microscope inspection take real workshop time, but the fee is credited against the repair if you proceed. You receive the quote before any chargeable repair work begins, so there are no surprises on collection day in Alberton.' },
  { question: 'Can you repair Apple Silicon MacBooks with liquid damage?', answer: 'Yes. We repair liquid-damaged M1, M2, M3 and M4 MacBook Air and Pro models at board level. Apple Silicon boards are denser and more challenging than the older Intel designs, and the soldered storage means data preservation depends on board recovery, but the underlying repair process, ultrasonic clean, component-level diagnosis, micro-soldering, is the same. We have returned plenty of Apple Silicon MacBooks to Alberton clients after spills that Apple itself had declared whole-unit replacements.' },
];

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'MacBook Liquid Damage Repair Alberton',
  description: 'MacBook liquid damage repair for Alberton clients. Ultrasonic cleaning, board-level diagnostics. Collection from Alberton.',
  provider: LOCAL_BUSINESS_PROVIDER,
  areaServed: [
    { '@type': 'City', name: 'Johannesburg' },
    { '@type': 'Neighborhood', name: 'Alberton' },
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://zasupport.com' },
    { '@type': 'ListItem', position: 2, name: 'Liquid Damage Repair', item: 'https://zasupport.com/liquid-damage' },
    { '@type': 'ListItem', position: 3, name: 'Alberton', item: 'https://zasupport.com/liquid-damage/alberton' },
  ],
};

const faqSchema = buildFaqSchema(faqs);

export default function LiquidDamageAlbertonPage() {
  return (
    <>
      <SchemaOrg schema={faqSchema} />
      <SchemaOrg schema={serviceSchema} />
      <SchemaOrg schema={breadcrumbSchema} />

      <section className="hero-gradient grid-overlay pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[
            { label: 'Liquid Damage Repair', href: '/liquid-damage' },
            { label: 'Alberton' },
          ]} />
          <div className="mt-8 max-w-4xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#E8F4F1] leading-tight mb-6">
              MacBook Liquid Damage Repair Alberton
              <br /><span className="text-[#0FEA7A]">, Act Fast, Save Your Mac</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-4 max-w-3xl leading-relaxed">
              Liquid damage on a MacBook is a race against corrosion, and Alberton sits roughly 35 minutes from our Hyde Park workshop via the N3 and M2. We collect from New Redruth, Brackenhurst, Meyersdal and the Alberton North industrial belt, then carry out ultrasonic cleaning and board-level repair the same day where possible. Assessment from R599.
            </p>
            <div className="flex items-center gap-2 text-[#7A9E98] text-sm mb-8">
              <Clock className="w-4 h-4 text-[#0FEA7A]" />
              <span>Same-day collection from Alberton, contact us immediately after liquid exposure</span>
            </div>
            <div className="flex flex-wrap gap-4 mb-8">
              {[
                { icon: AlertTriangle, label: 'Act Within Hours' },
                { icon: CheckCircle, label: 'Ultrasonic Cleaning' },
                { icon: MapPin, label: 'Collect from Alberton' },
                { icon: CheckCircle, label: 'From R599 assessment' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 bg-[rgba(15,234,122,0.08)] border border-[rgba(15,234,122,0.15)] px-4 py-2 rounded-full">
                  <Icon className="w-4 h-4 text-[#0FEA7A]" />
                  <span className="text-[#E8F4F1] text-sm font-medium">{label}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href={buildWhatsAppUrl('LDR-ALBERTON', 'liquid-damage')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 hover:shadow-[0_0_32px_rgba(15,234,122,0.4)] transition-all">
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
            Liquid Damage Repair for Alberton Clients
          </h2>
          <div className="space-y-4 text-[#7A9E98] leading-relaxed">
            <p>
              Alberton clients tend to bring us two distinct patterns of liquid damage. The first comes from the residential side, Meyersdal Eco Estate, Brackenhurst and Randhart, where coffee spills and bedside water glasses dominate, often during evening work-from-home hours. The second comes from the small businesses along Voortrekker Road and around the Alberton City precinct, where condensation from inconsistent air-conditioning and load-shedding humidity swings creates slow, creeping corrosion that only shows up weeks later as a keyboard fault or trackpad ghosting. Both need the same first response: power off, do not press the power button to test, and get the machine to us before oxidation sets in on the logic board.
            </p>
            <p>
              Because Alberton sits on the southern Johannesburg corridor, we route collections via the N12 or N3 depending on traffic, which usually puts a courier at your door within a few hours of a WhatsApp on 064 529 5863. We have collected MacBooks from law and accounting practices near the Alberton Civic Centre, from medical rooms close to Netcare Alberton Hospital, and from residential clients in Meyersdal who needed the machine returned before a Monday morning. In the workshop the board goes through a commercial ultrasonic bath at controlled temperature, followed by microscope inspection, replacement of any corroded components, and a full 48-hour soak test before we hand the machine back.
            </p>
            <p>
              We will not pretend every liquid-damaged MacBook walks out repaired, some boards arrive with corrosion that has eaten through traces beyond economic repair, and we say so plainly. What we can promise Alberton customers is an honest diagnostic, a written quote before any board work begins, and the same data-recovery options we extend to corporate clients in Sandton. If the board cannot be saved, we can usually still recover the SSD contents so your files come home even when the machine does not.
            </p>
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQAccordion items={faqs} title="Liquid Damage Repair Alberton, Common Questions" />
        </div>
      </section>

      <section className="py-8 sm:py-16 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#E8F4F1] mb-6">We Also Serve These Areas</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { label: "Germiston", href: "/liquid-damage/germiston" },
              { label: "Boksburg", href: "/liquid-damage/boksburg" },
              { label: "Johannesburg South", href: "/liquid-damage/johannesburg-south" },
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
            <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3">Liquid Damage in Alberton? Act Now.</h2>
            <p className="text-[#7A9E98] mb-6">Same-day collection from Alberton. Assessment from R599. From R599 assessment.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={buildWhatsAppUrl('LDR-ALBERTON', 'liquid-damage')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 transition-all">
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
          <PricingRange page="/liquid-damage/alberton" />
          <PricingNote />
        </div>
      </section>

    </>
  );
}
