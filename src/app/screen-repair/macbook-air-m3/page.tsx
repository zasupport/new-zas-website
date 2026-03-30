import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, CheckCircle, ArrowRight, MapPin } from 'lucide-react';
import SchemaOrg from '@/components/seo/SchemaOrg';
import { buildFaqSchema, LOCAL_BUSINESS_PROVIDER } from '@/lib/schema';
import FAQAccordion from '@/components/ui/FAQ';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { CONTACT, buildWhatsAppUrl } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'MacBook Air M3 Screen Repair Johannesburg [2026] | From R4,299 | ZA Support',
  description:
    'MacBook Air M3 screen repair in Johannesburg from R4,299. Liquid Retina display specialists. Cracked screen, pressure marks, backlight fault. No Fix No Fee. Hyde Park workshop.',
  alternates: { canonical: 'https://zasupport.com/screen-repair/macbook-air-m3' },
  keywords: [
    'MacBook Air M3 screen repair Johannesburg',
    'MacBook Air M3 display replacement',
    'MacBook Air M3 cracked screen repair',
    'MacBook Air M3 screen repair Hyde Park',
    'MacBook Air M3 Liquid Retina display repair',
    'MacBook Air M3 backlight fault',
    'MacBook Air M3 pressure marks repair',
    'MacBook Air 13 M3 screen replacement',
    'MacBook Air 15 M3 screen replacement',
    'Apple M3 MacBook Air display repair Johannesburg',
  ],
};

const faults = [
  { fault: 'Cracked Liquid Retina Display', desc: 'The MacBook Air M3 uses a single laminated display assembly — the LCD panel, backlight, and front glass are bonded as one unit. A crack from a drop or pressure impact means the entire assembly requires replacement. We source quality-matched Liquid Retina panels and verify True Tone calibration, P3 wide colour accuracy, and 500-nit brightness uniformity before returning the machine.' },
  { fault: 'Pressure Marks and Dead Pixel Clusters', desc: 'Pressure damage appears as dark or discoloured patches on the Liquid Retina panel, typically from objects pressing against the closed lid during transport. We see this regularly on MacBook Air M3 machines carried in bags without a padded sleeve — a pen, charger brick, or even a set of keys left on the keyboard is enough. The panel must be replaced; pressure marks cannot be repaired in isolation.' },
  { fault: 'Display Coating Delamination', desc: 'The anti-reflective coating on the MacBook Air M3 can develop visible wear patterns, particularly in humid South African conditions. Johannesburg summers with 70-80% humidity accelerate this process. The coating lifts or appears smudged in ways that cleaning cannot resolve. Full display replacement is the permanent fix.' },
  { fault: 'Backlight Failure — Screen Dark but Machine Boots', desc: 'The MacBook Air M3 boots normally — you hear the startup tone, keyboard illuminates, and an external display works via USB-C — but the built-in screen stays completely dark. This points to a backlight circuit failure on the logic board or a damaged display cable. We diagnose at component level first, which can save thousands compared to a full display swap.' },
  { fault: 'Flexgate-Style Display Cable Fault', desc: 'While the M3 Air has a more reliable display cable design than the notorious 2016-2019 Intel MacBook Pros, we have still seen cable failures — particularly on machines that have been opened and closed thousands of times in daily use. Symptoms include a flickering display at certain lid angles or a display that works only when the lid is at exactly 90 degrees.' },
  { fault: 'Colour Accuracy Drift or Yellow Tint', desc: 'Some MacBook Air M3 displays develop a persistent warm yellow tint that True Tone adjustment cannot correct, or visible colour banding in gradients. This is a panel-level defect rather than a software calibration issue. We test replacement panels across the full P3 colour gamut before fitting.' },
];

const faqs = [
  {
    question: 'How much does a MacBook Air M3 screen replacement cost in Johannesburg?',
    answer: 'MacBook Air M3 screen replacement starts from R4,299 for the 13.6-inch model and from R5,499 for the 15.3-inch model at our Hyde Park workshop. The final price depends on the specific fault — a backlight circuit repair at component level can be significantly less than a full display assembly replacement. We provide a written quote after diagnostic, and our No Fix No Fee policy means you pay nothing if we cannot resolve the fault.',
  },
  {
    question: 'Is the MacBook Air M3 13-inch screen different from the 15-inch?',
    answer: 'Yes. The MacBook Air M3 13.6-inch uses a 2560 x 1664 resolution Liquid Retina panel, while the 15.3-inch model has a 2880 x 1864 resolution panel. Both are IPS LCD with 500 nits brightness, P3 wide colour, and True Tone, but the display assemblies are physically different sizes and not interchangeable. We carry stock for both configurations.',
  },
  {
    question: 'Does the MacBook Air M3 have the same screen technology as the MacBook Pro M3?',
    answer: 'No. The MacBook Air M3 uses a Liquid Retina IPS LCD display — a single backlight layer behind the panel. The MacBook Pro M3 uses Liquid Retina XDR with mini-LED backlighting, ProMotion 120 Hz adaptive refresh, and significantly higher peak brightness (1,600 nits versus 500 nits). The Air panel is simpler and generally less expensive to replace, but it still requires specialist handling to preserve True Tone pairing.',
  },
  {
    question: 'Can you repair a MacBook Air M3 screen without replacing the whole display?',
    answer: 'It depends on the fault. Backlight failures caused by a blown fuse or driver IC on the logic board can be repaired at component level without touching the display assembly at all — this is the most cost-effective outcome. Physical cracks, pressure marks, and coating delamination require full assembly replacement because the panel, backlight, and glass are laminated together as a single unit.',
  },
  {
    question: 'Will True Tone still work after a MacBook Air M3 screen replacement?',
    answer: 'Yes. We transfer the True Tone calibration data during the replacement process. The MacBook Air M3 stores True Tone sensor calibration data that must be paired with the new display for white-point accuracy to function correctly. We verify True Tone operation across multiple lighting conditions before returning the machine.',
  },
  {
    question: 'How long does a MacBook Air M3 screen repair take?',
    answer: 'Most MacBook Air M3 screen replacements are completed within 24 to 48 hours at our Hyde Park workshop. Component-level backlight repairs can sometimes be completed same-day. We confirm exact turnaround when you book, and we prioritise urgent cases — particularly for clients who rely on the machine for work.',
  },
  {
    question: 'Is the MacBook Air M3 screen covered by Apple warranty?',
    answer: 'If your MacBook Air M3 is still within Apple one-year warranty or covered by AppleCare+, accidental damage may be covered with an excess fee. However, Apple charges significantly more for out-of-warranty screen replacement — typically R8,000 to R12,000 depending on the model. Our pricing starts from R4,299, and we use quality-matched panels with a written warranty.',
  },
  {
    question: 'Can load shedding damage a MacBook Air M3 screen?',
    answer: 'Not the panel directly, but load shedding power surges absolutely damage the backlight driver circuitry. We see this frequently in Johannesburg — the MacBook Air M3 is left plugged in, Eskom restores power after a stage 4 or 6 outage, and the voltage spike travels through the USB-C charger to the backlight power rail. The result is a dark screen on an otherwise functional machine. A quality surge protector or UPS is the best prevention. We repair the backlight driver IC at component level.',
  },
];

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'MacBook Air M3 Screen Repair Johannesburg',
  description:
    'Professional MacBook Air M3 screen repair in Johannesburg. Liquid Retina display replacement, cracked screen, backlight fault, pressure marks. 13.6-inch and 15.3-inch models. Assessment from R599. Written warranty.',
  provider: LOCAL_BUSINESS_PROVIDER,
  areaServed: [
    { '@type': 'City', name: 'Johannesburg' },
    { '@type': 'Neighborhood', name: 'Hyde Park' },
    { '@type': 'Neighborhood', name: 'Sandton' },
    { '@type': 'Neighborhood', name: 'Rosebank' },
    { '@type': 'Neighborhood', name: 'Bryanston' },
    { '@type': 'Neighborhood', name: 'Fourways' },
  ],
  serviceType: 'Screen Repair',
  availableChannel: [
    { '@type': 'ServiceChannel', serviceUrl: 'https://wa.me/27645295863', serviceType: 'WhatsApp' },
    { '@type': 'ServiceChannel', servicePhone: '+27645295863', serviceType: 'Phone' },
  ],
  offers: {
    '@type': 'AggregateOffer',
    lowPrice: '4299',
    highPrice: '6999',
    priceCurrency: 'ZAR',
    offerCount: '3',
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://zasupport.com' },
    { '@type': 'ListItem', position: 2, name: 'Screen Repair', item: 'https://zasupport.com/screen-repair' },
    { '@type': 'ListItem', position: 3, name: 'MacBook Air', item: 'https://zasupport.com/screen-repair/macbook-air' },
    { '@type': 'ListItem', position: 4, name: 'M3', item: 'https://zasupport.com/screen-repair/macbook-air-m3' },
  ],
};

const faqSchema = buildFaqSchema(faqs);

export default function MacBookAirM3ScreenRepairPage() {
  return (
    <>
      <SchemaOrg schema={faqSchema} />
      <SchemaOrg schema={serviceSchema} />
      <SchemaOrg schema={breadcrumbSchema} />

      <section className="hero-gradient grid-overlay pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[
            { label: 'Screen Repair', href: '/screen-repair' },
            { label: 'MacBook Air', href: '/screen-repair/macbook-air' },
            { label: 'MacBook Air M3' },
          ]} />
          <div className="mt-8 max-w-4xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#E8F4F1] leading-tight mb-6">
              MacBook Air M3 Screen Repair
              <br /><span className="text-[#0FEA7A]">Johannesburg — From R4,299</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-4 max-w-3xl leading-relaxed">
              Liquid Retina display replacement, cracked screen repair, backlight fault diagnosis, and pressure mark resolution for the MacBook Air M3 (March 2024). Both the 13.6-inch and 15.3-inch models serviced at our Hyde Park workshop.
            </p>
            <div className="flex flex-wrap gap-4 mb-8">
              {[
                { label: 'No Fix No Fee' },
                { label: 'Assessment from R599' },
                { label: 'Written Warranty' },
                { label: 'True Tone Preserved' },
              ].map(({ label }) => (
                <div key={label} className="flex items-center gap-2 bg-[rgba(15,234,122,0.08)] border border-[rgba(15,234,122,0.15)] px-4 py-2 rounded-full">
                  <CheckCircle className="w-4 h-4 text-[#0FEA7A]" />
                  <span className="text-[#E8F4F1] text-sm font-medium">{label}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href={buildWhatsAppUrl('SR-MACBOOKAIRM3', 'screen-repair')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 hover:shadow-[0_0_32px_rgba(15,234,122,0.4)] transition-all">
                WhatsApp for Quote
              </a>
              <a href={`tel:${CONTACT.phoneTel}`} className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all">
                <Phone className="w-5 h-5" /> Call {CONTACT.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-6">
            MacBook Air M3 Display: What You Need to Know Before Repair
          </h2>
          <div className="space-y-4 text-[#7A9E98] leading-relaxed">
            <p>
              Apple released the MacBook Air M3 in March 2024, and we started seeing these machines in our Hyde Park workshop within weeks of the South African launch. The M3 Air keeps the same external chassis design as the M2 generation, but internally there are meaningful differences that affect screen repair — particularly the display cable routing and the revised backlight driver circuitry on the logic board.
            </p>
            <p>
              Both the 13.6-inch (2560 x 1664) and 15.3-inch (2880 x 1864) models use a Liquid Retina IPS LCD panel rated at 500 nits sustained brightness with P3 wide colour gamut and True Tone adaptive white-point adjustment. This is not a mini-LED display — there is a single backlight layer rather than the zoned mini-LED array found in the MacBook Pro M3. The practical difference for repair is that backlight failures on the Air tend to affect the entire screen uniformly rather than producing localised dark patches.
            </p>
            <p>
              In our experience, the most common screen fault on the MacBook Air M3 in Johannesburg is physical cracking from bag-related impacts — the M3 Air is thinner and lighter than any previous Air generation at just 1.13 kg (13-inch) or 1.51 kg (15-inch), and many owners carry it without adequate padding. The second most common fault is backlight failure from load shedding power surges, which we see across all MacBook models but particularly frequently in suburbs like Sandton, Rosebank, and Midrand where machines are left plugged in at desks overnight.
            </p>
            <p>
              We carry Liquid Retina display assemblies for both MacBook Air M3 configurations. Every replacement includes True Tone sensor calibration transfer, P3 colour gamut verification, and a comprehensive brightness uniformity check at 100%, 50%, and minimum brightness levels. Our assessment starts from R599, and our No Fix No Fee policy means you pay nothing if we cannot resolve the fault.
            </p>
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-10 text-center">
            MacBook Air M3 Screen Faults We Repair
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {faults.map((item) => (
              <div key={item.fault} className="glass-card p-5">
                <h3 className="text-[#E8F4F1] font-bold mb-2">{item.fault}</h3>
                <p className="text-[#7A9E98] text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-8">
            Our MacBook Air M3 Screen Repair Process
          </h2>
          <div className="space-y-6">
            {[
              { step: '01', title: 'Book and Drop Off or Arrange Collection', desc: 'WhatsApp us with the code SR-MACBOOKAIRM3 or call to book. Drop off at our Hyde Park workshop (1 Hyde Park Lane) or arrange collection from anywhere within 25 km.' },
              { step: '02', title: 'Display Diagnostic — from R599', desc: 'We determine whether the fault is the panel itself, the backlight circuit, the display cable, or a logic board issue. This targeted approach means you only pay for what actually needs replacing.' },
              { step: '03', title: 'Written Quote — No Fix No Fee', desc: 'You receive a clear, written quote with the exact fault, repair method, parts used, and turnaround time. If we cannot fix it, you pay nothing beyond the assessment fee.' },
              { step: '04', title: 'Repair and Calibration', desc: 'Display assembly replacement or component-level repair, followed by True Tone calibration transfer, P3 colour verification, and brightness uniformity testing at multiple levels.' },
              { step: '05', title: 'Quality Check and Collection', desc: 'We run the repaired MacBook Air M3 through our 12-point display checklist before release. Written warranty provided covering both parts and workmanship.' },
            ].map(({ step, title, desc }) => (
              <div key={step} className="glass-card p-6 flex gap-5">
                <span className="text-[#0FEA7A] font-extrabold text-2xl flex-shrink-0">{step}</span>
                <div>
                  <h3 className="text-[#E8F4F1] font-bold mb-1">{title}</h3>
                  <p className="text-[#7A9E98] text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-6">
            MacBook Air M3 vs Previous Generations: Screen Repair Differences
          </h2>
          <div className="space-y-4 text-[#7A9E98] leading-relaxed">
            <p>
              Having worked on every MacBook Air generation since the original unibody design, I can say confidently that the M3 Air is the most repair-friendly of the Apple Silicon generation — but only if you know the specific quirks. The display cable connector has moved slightly compared to the M2 Air, and the adhesive pattern holding the display assembly to the chassis is different. Using M2 repair procedures on an M3 risks damaging the antenna cables that run alongside the display hinge.
            </p>
            <p>
              The good news for M3 Air owners is that the display itself is more resilient than the M1 Air panel. Apple upgraded the glass composition, and we have seen fewer spontaneous coating failures on the M3 compared to the M1 and M2 generations. The bad news is that the M3 Air display assembly is slightly more expensive to source because it shares fewer components with other models in the current lineup.
            </p>
            <p>
              For clients in Johannesburg weighing up repair versus replacement: a new MacBook Air M3 13-inch starts from R19,999 at the Apple Store iStore. Our screen replacement from R4,299 restores the display to full functionality with a written warranty, at roughly 20% of the cost of a new machine. That is the calculation most of our clients make, and it is the one I would make myself.
            </p>
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQAccordion items={faqs} title="MacBook Air M3 Screen Repair — Frequently Asked Questions" />
        </div>
      </section>

      <section className="py-10 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#E8F4F1] mb-6">Related Services</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              { label: 'Screen Repair Hub', href: '/screen-repair' },
              { label: 'MacBook Air Screen Repair', href: '/screen-repair/macbook-air' },
              { label: 'MacBook Air M1 Screen', href: '/screen-repair/macbook-air-m1' },
              { label: 'MacBook Air M2 Screen', href: '/screen-repair/macbook-air-m2' },
              { label: 'MacBook Air Logic Board', href: '/logic-board-repair/macbook-air' },
              { label: 'MacBook Air Liquid Damage', href: '/liquid-damage/macbook-air' },
              { label: 'MacBook Air Battery', href: '/battery-replacement/macbook-air' },
              { label: 'MacBook Pro M3 Screen', href: '/screen-repair/macbook-pro-m3' },
            ].map((area) => (
              <Link key={area.href} href={area.href} className="glass-card p-4 text-center group">
                <span className="text-[#E8F4F1] text-sm font-semibold group-hover:text-[#0FEA7A] transition-colors">{area.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-[rgba(39,80,77,0.3)] border border-[rgba(15,234,122,0.2)] rounded-3xl p-10">
            <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3">MacBook Air M3 Screen Broken?</h2>
            <p className="text-[#7A9E98] mb-6">From R4,299. No Fix No Fee. Written warranty. Hyde Park workshop.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={buildWhatsAppUrl('SR-MACBOOKAIRM3', 'screen-repair')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 hover:shadow-[0_0_32px_rgba(15,234,122,0.4)] transition-all">
                WhatsApp for Quote
              </a>
              <a href={`tel:${CONTACT.phoneTel}`} className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all">
                <Phone className="w-5 h-5" /> Call {CONTACT.phone}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
