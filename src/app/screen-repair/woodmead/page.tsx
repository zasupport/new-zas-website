import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, ArrowRight, Monitor, Zap, CheckCircle, MapPin } from 'lucide-react';
import SchemaOrg from '@/components/seo/SchemaOrg';
import { buildFaqSchema, LOCAL_BUSINESS_PROVIDER } from '@/lib/schema';
import FAQAccordion from '@/components/ui/FAQ';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { CONTACT, buildWhatsAppUrl } from '@/lib/constants';
import PricingNote from '@/components/PricingNote';
import PricingRange from '@/components/PricingRange';

export const metadata: Metadata = {
  title: 'MacBook Screen Repair Woodmead | ZA Support Hyde Park',
  description:
    'MacBook screen repair for Woodmead clients. Cracked displays, backlight failure, LCD faults. We collect from Woodmead and repair at our Hyde Park workshop. Assessment. Call 064 529 5863.',
  alternates: { canonical: 'https://zasupport.com/screen-repair/woodmead' },
};

const faults = [
  { title: 'Cracked Screen', desc: 'Physical impact cracks the LCD panel or outer glass. Full display assembly replacement restores your Mac to a pristine condition.' },
  { title: 'Black Screen on Boot', desc: 'MacBook starts, fan runs, keyboard lights, but screen stays dark. Backlight failure, display cable fault, or GPU issue diagnosed before any part is ordered.' },
  { title: 'Backlight Failure', desc: 'Display shows a faint image visible with a torch but no backlight. Backlight fuse, driver board, or LED strip fault identified and repaired.' },
  { title: 'Display Lines or Artefacts', desc: 'Vertical or horizontal lines, colour banding, or flickering on the display. Display cable damage or LCD panel fault diagnosed at component level.' },
  { title: 'Flickering Display', desc: 'Intermittent flickering or display that goes black under certain angles. Flex cable damage or GPU driver fault identified and resolved.' },
  { title: 'Water-damaged Display', desc: 'Liquid ingress into the display assembly causes condensation marks, dead pixels, or backlight failure. Assessment determines repair viability.' },
];

const faqs = [
  { question: 'Do you collect MacBooks for screen repair from Woodmead?', answer: 'Yes. We collect across Woodmead, including Waterfall Drive, the office parks along Western Service Road, Woodmead Estate, Country Club Estate, and the residential streets off Maxwell Drive. Pickup is arranged on 064 529 5863 or wa.me/27645295863 and the MacBook is taken to our Hyde Park workshop, usually around fifteen minutes south down the M1.' },
  { question: 'How long does a MacBook screen repair take?', answer: 'For most models we collect from Woodmead, the screen repair is completed within three to five working days from pickup. Older Intel MacBook Pros where we can replace the panel alone tend to be quicker. Apple Silicon models where the full lid assembly is swapped take slightly longer due to part availability. We\'ll give you a realistic return date once the assessment is done, not before.' },
  { question: 'What is the screen repair assessment fee?', answer: 'An assessment fee applies. That covers diagnostics to confirm whether the fault is the LCD panel, the display cable, the backlight, or something behind the logic board feeding the display. If you proceed with the repair, the assessment fee is credited against the repair cost. We won\'t quote blind off a photo, a cracked screen sometimes hides a second fault that only shows up once we open the unit.' },
  { question: 'Do you use genuine Apple screens?', answer: 'We use original Apple panels pulled from grade-A donor units, or high-grade OEM equivalents where genuine stock is unavailable. For Woodmead corporate clients who need colour-accurate displays for design or finance work, we\'ll confirm the panel type before fitting. We don\'t fit the cheap aftermarket LCDs you\'ll find on some marketplace listings, they have visible colour shift and shorter lifespans.' },
  { question: 'My MacBook screen has lines but still works. Should I get it repaired?', answer: 'Lines on a MacBook display usually point to a failing LCD panel or a damaged display cable, and in our experience they get worse rather than better. We\'ve had Woodmead clients leave it for months hoping it would settle, only for the screen to go fully black mid-meeting. If you rely on the machine for work, which most of the corporate users we collect from in Woodmead do, it\'s worth assessing now while you can still see what you\'re doing.' },
  { question: 'Can you repair the screen on Apple Silicon MacBooks?', answer: 'Yes. We repair displays on M1, M2, M3 and M4 MacBook Air and Pro models. On these machines Apple supplies the display as a full lid assembly rather than a separate panel, so the cost is higher than older Intel models. We\'ll give you the exact figure for your specific model after the assessment. Several Woodmead clients with newer M2 and M3 Pros have had successful display swaps done by us this year.' },
  { question: 'What is an Assessment guarantee?', answer: 'It means you know the diagnostic fee before we collect. There are no surprise add-ons during the assessment itself. If the unit needs deeper board-level inspection beyond a standard screen diagnostic, we\'ll tell you first and only proceed with your approval. Woodmead pickups are quoted upfront on WhatsApp before the driver leaves Hyde Park.' },
  { question: 'Can you repair a cracked outer glass without replacing the full display?', answer: 'On most modern MacBooks the glass is bonded to the LCD as a single unit, so the honest answer is no, replacing just the glass isn\'t viable without risking the panel underneath. The exception is some older MacBook Pro models where the front glass was a separate piece. We\'ll confirm during assessment which category your machine falls into and quote accordingly. We won\'t sell you a glass-only repair on a model where it isn\'t a sound fix.' },
];

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'MacBook Screen Repair Woodmead',
  description: 'MacBook screen repair for Woodmead clients. Cracked displays, backlight, LCD faults. Collection from Woodmead.',
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
    { '@type': 'ListItem', position: 2, name: 'Screen Repair', item: 'https://zasupport.com/screen-repair' },
    { '@type': 'ListItem', position: 3, name: 'Woodmead', item: 'https://zasupport.com/screen-repair/woodmead' },
  ],
};

const faqSchema = buildFaqSchema(faqs);

export default function ScreenRepairWoodmeadPage() {
  return (
    <>
      <SchemaOrg schema={faqSchema} />
      <SchemaOrg schema={serviceSchema} />
      <SchemaOrg schema={breadcrumbSchema} />

      <section className="hero-gradient grid-overlay pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[
            { label: 'Screen Repair', href: '/screen-repair' },
            { label: 'Woodmead' },
          ]} />
          <div className="mt-8 max-w-4xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#E8F4F1] leading-tight mb-6">
              MacBook Screen Repair Woodmead
              <br /><span className="text-[#0FEA7A]">, Display Specialists</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-4 max-w-3xl leading-relaxed">
              MacBook screen repairs for Woodmead homes and offices along Waterfall Drive, Western Service Road, and the corridor running past Woodmead Retail Park. We collect from estates like Woodmead Estate and Sunninghill Gardens, from offices in Country Club Estate, and from the business parks off the M1. Repairs are completed at our Hyde Park workshop and returned the same week in most cases. Assessment.
            </p>
            <div className="flex items-center gap-2 text-[#7A9E98] text-sm mb-8">
              <MapPin className="w-4 h-4 text-[#0FEA7A]" />
              <span>Collection from Woodmead, approx. 18 min to our Hyde Park workshop</span>
            </div>
            <div className="flex flex-wrap gap-4 mb-8">
              {[
                { icon: Monitor, label: 'Retina Display Repairs' },
                { icon: Zap, label: 'Assessment' },
                { icon: CheckCircle, label: 'Assessment' },
                { icon: CheckCircle, label: '12-Month Warranty' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 bg-[rgba(15,234,122,0.08)] border border-[rgba(15,234,122,0.15)] px-4 py-2 rounded-full">
                  <Icon className="w-4 h-4 text-[#0FEA7A]" />
                  <span className="text-[#E8F4F1] text-sm font-medium">{label}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href={buildWhatsAppUrl('SCR-WOODMEAD', 'screen-repair')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 hover:shadow-[0_0_32px_rgba(15,234,122,0.4)] transition-all">
                💬 WhatsApp for Quote
              </a>
              <a href={`tel:${CONTACT.phoneTel}`} className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all">
                <Phone className="w-5 h-5" /> Call {CONTACT.phone}
              </a>
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.2)] text-[#7A9E98] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[rgba(15,234,122,0.05)] transition-all">
                Book Collection <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-10 text-center">
            Screen Faults We Repair
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {faults.map((fault) => (
              <div key={fault.title} className="glass-card p-5">
                <h3 className="text-[#E8F4F1] font-bold mb-2">{fault.title}</h3>
                <p className="text-[#7A9E98] text-sm leading-relaxed">{fault.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQAccordion items={faqs} title="Screen Repair Woodmead, Common Questions" />
        </div>
      </section>

      <section className="py-8 sm:py-16 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#E8F4F1] mb-6">We Also Serve These Areas</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { label: "Sunninghill", href: "/screen-repair/sunninghill" },
              { label: "Paulshof", href: "/screen-repair/paulshof" },
              { label: "Midrand", href: "/screen-repair/midrand" },
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
            <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3">Cracked Screen in Woodmead? Assessment.</h2>
            <p className="text-[#7A9E98] mb-6">We collect from Woodmead. Assessment. 12-month warranty.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={buildWhatsAppUrl('SCR-WOODMEAD', 'screen-repair')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 transition-all">
                💬 WhatsApp for Quote
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
          <PricingRange page="/screen-repair/woodmead" />
          <PricingNote />
        </div>
      </section>

    </>
  );
}
