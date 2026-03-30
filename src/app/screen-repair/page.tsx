import type { Metadata } from 'next';
import Link from 'next/link';
import { Suspense } from 'react';
import { Phone, ArrowRight, Monitor, AlertTriangle, CheckCircle, Shield, Clock, Star, Zap, Eye } from 'lucide-react';
import SchemaOrg from '@/components/seo/SchemaOrg';
import { buildFaqSchema, buildBreadcrumbSchema, LOCAL_BUSINESS_PROVIDER } from '@/lib/schema';
import GoogleReviews from '@/components/ui/GoogleReviews';
import FAQAccordion from '@/components/ui/FAQ';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { CONTACT, SITE, buildWhatsAppUrl } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'MacBook Screen Repair Johannesburg [2026] | From R2,499 | ZA Support',
  description:
    'MacBook & iPhone screen repair in Johannesburg. Cracked display, flickering, dead pixels fixed. From R2,499. Up-to-3 year warranty. Call 064 529 5863.',
  alternates: { canonical: 'https://zasupport.com/screen-repair' },
};

const pricingTable = [
  { device: 'MacBook Air', from: 'R2,499', note: 'All models incl. M1–M3', turnaround: '24–48 hrs' },
  { device: 'MacBook Pro 13″', from: 'R3,499', note: 'Retina 2012–2024, M1–M4', turnaround: '24–72 hrs' },
  { device: 'MacBook Pro 14″ / 16″', from: 'R4,999', note: 'M1 Pro/Max – M4 Pro/Max, Liquid Retina XDR', turnaround: '48–72 hrs' },
  { device: 'iMac', from: 'R3,999', note: '21.5″, 24″ and 27″ models', turnaround: '3–5 days' },
  { device: 'iPhone', from: 'R1,299', note: 'iPhone 8 – iPhone 16 Pro Max', turnaround: 'Same day' },
];

const damageTypes = [
  {
    title: 'Cracked Screen',
    icon: AlertTriangle,
    desc: 'Impact damage from drops or pressure. The LCD or OLED panel fractures, causing visible cracks, touch dead zones, or complete display failure. We replace the full display assembly to restore factory quality.',
  },
  {
    title: 'Horizontal / Vertical Lines',
    icon: Monitor,
    desc: 'Lines running across or down the display indicate a failing LCD panel, damaged flex cable, or a fault on the T-Con (timing controller) board. On newer MacBook Pro models with Liquid Retina XDR, this often points to a flex cable issue at the hinge.',
  },
  {
    title: 'Flickering Display',
    icon: Zap,
    desc: 'Intermittent flickering is commonly caused by a failing backlight driver IC (LP8550 on older models), a damaged display flex cable, or GPU-related faults on Intel MacBooks. We diagnose the root cause before quoting.',
  },
  {
    title: 'Dead Pixels',
    icon: Eye,
    desc: 'Stuck or dead pixels appear as tiny bright or dark dots that do not change. A small cluster may be cosmetic, but spreading dead pixels indicate panel degradation. We replace the full display panel to eliminate the issue permanently.',
  },
  {
    title: 'Backlight Failure',
    icon: Monitor,
    desc: 'Screen appears completely black but you can faintly see the desktop with a torch. This is a backlight circuit fault, not a dead screen. On MacBooks, the backlight fuse or LP8550 driver IC is often the culprit. We repair at component level where possible, saving you the cost of a full panel replacement.',
  },
];

const processSteps = [
  { step: 1, title: 'Assessment', desc: 'Bring your device to our Hyde Park workshop. We inspect the damage, identify the panel type (LCD, Retina, OLED, Liquid Retina XDR), and provide a written fixed-price quote. Assessment from R599.' },
  { step: 2, title: 'Part Sourcing', desc: 'We source genuine-equivalent or original display assemblies. For MacBooks, this includes the LCD panel, backlight, and display housing. For iPhones, we use OEM-grade OLED or LCD panels with True Tone calibration retained.' },
  { step: 3, title: 'Repair', desc: 'The damaged display is carefully removed and the new panel installed. On MacBooks, this includes recalibrating the display connector, testing the backlight circuit, and verifying True Tone sensor alignment.' },
  { step: 4, title: 'Quality Testing', desc: 'Full display test: colour accuracy, brightness uniformity, touch responsiveness (iPhone/iPad), backlight bleed, and dead pixel inspection across a pure white, black, red, green, and blue test screen.' },
  { step: 5, title: 'Collection', desc: 'Your device is returned with a written warranty covering the display repair. We retain your old panel for 30 days in case of any queries.' },
];

const compatibleDevices = [
  { category: 'MacBook Air', models: 'M1 (2020), M2 (2022), M3 (2024), Intel 2017–2020, 11″ and 13″ 2012–2017' },
  { category: 'MacBook Pro 13″', models: 'M1 (2020), M2 (2022–2023), Retina 2012–2020, Touch Bar 2016–2020' },
  { category: 'MacBook Pro 14″', models: 'M1 Pro/Max (2021), M2 Pro/Max (2023), M3 Pro/Max (2023), M4 Pro/Max (2024)' },
  { category: 'MacBook Pro 16″', models: 'M1 Pro/Max (2021), M2 Pro/Max (2023), M3 Pro/Max (2023), M4 Pro/Max (2024), Intel 2019' },
  { category: 'iMac', models: '24″ M1/M3/M4, 21.5″ 2012–2019, 27″ Retina 5K 2014–2020, iMac Pro' },
  { category: 'iPhone', models: 'iPhone 8 through iPhone 16 Pro Max — LCD and OLED panels' },
];

const faqs = [
  {
    question: 'How much does MacBook screen repair cost in Johannesburg?',
    answer: 'MacBook Air screen repair starts from R2,499, MacBook Pro 13″ from R3,499, and MacBook Pro 14″ or 16″ from R4,999. These prices include the display assembly, labour, and our up-to-3 year warranty. The exact price depends on your specific model and the type of panel (LCD, Retina, OLED, or Liquid Retina XDR). We provide a written quote before starting any work.',
  },
  {
    question: 'How long does a MacBook screen replacement take?',
    answer: 'Most MacBook screen replacements are completed within 24 to 72 hours. MacBook Air and MacBook Pro 13″ repairs are typically done within 24 to 48 hours. The larger 14″ and 16″ MacBook Pro models with Liquid Retina XDR displays can take 48 to 72 hours due to part sourcing. iPhone screen repairs are usually completed same day.',
  },
  {
    question: 'Do you use genuine Apple screens?',
    answer: 'We use OEM-grade display assemblies that match Apple\'s specifications for colour accuracy, brightness, and resolution. For iPhone repairs, we retain True Tone calibration so your display continues to adjust colour temperature automatically. We do not use cheap aftermarket panels — every screen we fit is tested against Apple\'s display standards before installation.',
  },
  {
    question: 'Will True Tone still work after a screen replacement?',
    answer: 'Yes. For iPhones, we transfer the True Tone calibration data from your original display to the new panel, preserving automatic colour temperature adjustment. For MacBooks with True Tone (2018 and later), the sensor is located on the logic board rather than the display, so True Tone continues to work automatically after a screen replacement.',
  },
  {
    question: 'My MacBook screen is black but I can hear it running. Is the screen broken?',
    answer: 'Not necessarily. A black screen with audible fans or a startup chime often indicates a backlight failure rather than a broken panel. The backlight circuit on MacBooks uses a fuse and driver IC (LP8550 on many models) that can fail, particularly after liquid exposure or a power surge. We diagnose this during our assessment (from R599) and repair at component level where possible, which is significantly cheaper than a full screen replacement.',
  },
  {
    question: 'How does your pricing compare to the Apple Store?',
    answer: 'Apple\'s official screen replacement pricing in South Africa ranges from approximately R6,000 to R15,000 depending on the model. Our pricing starts from R2,499 for a MacBook Air, saving you 50–70% compared to Apple\'s pricing. We use equivalent-grade panels with the same resolution, brightness, and colour accuracy, and we include an up-to-3 year warranty compared to Apple\'s 90-day repair warranty.',
  },
  {
    question: 'Can you repair a MacBook screen with lines running through it?',
    answer: 'Yes. Horizontal or vertical lines on a MacBook display are one of the most common repairs we handle. The cause is usually a failing LCD panel, a damaged display flex cable at the hinge point, or in some cases a GPU fault on older Intel models. We diagnose the exact cause during assessment and replace only what is needed — sometimes a flex cable repair is sufficient, avoiding the cost of a full panel replacement.',
  },
  {
    question: 'Do you repair cracked iPhone screens?',
    answer: 'Yes. We repair cracked screens on all iPhone models from iPhone 8 through to iPhone 16 Pro Max. Pricing starts from R1,299 and includes an OEM-grade OLED or LCD panel (model dependent), True Tone calibration transfer, and our warranty. Most iPhone screen repairs are completed same day at our Hyde Park workshop.',
  },
  {
    question: 'Is it worth repairing an older MacBook screen?',
    answer: 'It depends on the model. For MacBooks from 2017 onwards, screen repair is almost always worthwhile — the machines have years of useful life remaining and repair costs are a fraction of replacement. For pre-2015 models, we will give you an honest assessment of whether the repair makes economic sense relative to the machine\'s current value. We never push unnecessary repairs.',
  },
  {
    question: 'What warranty do you offer on screen repairs?',
    answer: 'Every screen repair carried out by ZA Support includes an up-to-3 year warranty covering the display panel, backlight, and our workmanship. If the replacement screen develops a fault within the warranty period — dead pixels, backlight failure, colour shift — we repair or replace it at no charge. The warranty is provided in writing and covers parts and labour.',
  },
];

const suburbPages = [
  { label: 'Sandton', href: '/screen-repair/sandton', distance: '8 min' },
  { label: 'Rosebank', href: '/screen-repair/rosebank', distance: '5 min' },
  { label: 'Midrand', href: '/screen-repair/midrand', distance: '30 min' },
  { label: 'Randburg', href: '/screen-repair/randburg', distance: '15 min' },
  { label: 'Fourways', href: '/screen-repair/fourways', distance: '25 min' },
  { label: 'Bryanston', href: '/screen-repair/bryanston', distance: '10 min' },
];

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'MacBook & iPhone Screen Repair Johannesburg',
  description: 'Professional MacBook and iPhone screen repair in Johannesburg. Cracked screens, flickering displays, dead pixels, backlight failure. From R2,499. Up-to-3 year warranty.',
  provider: LOCAL_BUSINESS_PROVIDER,
  areaServed: [
    { '@type': 'City', name: 'Johannesburg' },
    { '@type': 'Neighborhood', name: 'Hyde Park' },
    { '@type': 'Neighborhood', name: 'Sandton' },
    { '@type': 'Neighborhood', name: 'Rosebank' },
  ],
  availableChannel: [
    { '@type': 'ServiceChannel', serviceUrl: 'https://wa.me/27645295863', serviceType: 'WhatsApp' },
    { '@type': 'ServiceChannel', servicePhone: '+27645295863', serviceType: 'Phone' },
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Screen Repair Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'MacBook Air Screen Replacement',
          description: 'Full display assembly replacement for all MacBook Air models. From R2,499.',
        },
        price: '2499',
        priceCurrency: 'ZAR',
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'MacBook Pro 13″ Screen Replacement',
          description: 'Retina display replacement for MacBook Pro 13-inch. From R3,499.',
        },
        price: '3499',
        priceCurrency: 'ZAR',
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'MacBook Pro 14″/16″ Screen Replacement',
          description: 'Liquid Retina XDR display replacement. From R4,999.',
        },
        price: '4999',
        priceCurrency: 'ZAR',
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'iMac Screen Replacement',
          description: 'iMac display panel replacement for 21.5″, 24″, and 27″ models. From R3,999.',
        },
        price: '3999',
        priceCurrency: 'ZAR',
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'iPhone Screen Repair',
          description: 'iPhone screen replacement with True Tone calibration. From R1,299.',
        },
        price: '1299',
        priceCurrency: 'ZAR',
      },
    ],
  },
};

const breadcrumbItems = [
  { name: 'Home', url: 'https://zasupport.com' },
  { name: 'Repairs', url: 'https://zasupport.com/apple-repair' },
  { name: 'Screen Repair', url: 'https://zasupport.com/screen-repair' },
];

export default function ScreenRepairPage() {
  return (
    <>
      <SchemaOrg schema={serviceSchema} />
      <SchemaOrg schema={buildFaqSchema(faqs)} />
      <SchemaOrg schema={buildBreadcrumbSchema(breadcrumbItems)} />

      <main className="bg-[#0A1A18] text-[#E8F4F1] min-h-screen">
        {/* Breadcrumb */}
        <div className="max-w-6xl mx-auto px-4 pt-4">
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Repairs', href: '/apple-repair' },
              { label: 'Screen Repair', href: '/screen-repair' },
            ]}
          />
        </div>

        {/* ─── HERO ──────────────────────────────────────────────── */}
        <section className="relative overflow-hidden py-16 sm:py-24">
          <div className="max-w-6xl mx-auto px-4">
            <div className="max-w-3xl">
              <p className="text-[#0FEA7A] font-semibold text-sm uppercase tracking-widest mb-4">
                Apple Experts &bull; Hyde Park, Johannesburg
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
                MacBook &amp; iPhone{' '}
                <span className="text-[#0FEA7A]">Screen Repair</span>{' '}
                Johannesburg
              </h1>
              <p className="text-lg sm:text-xl text-[#7A9E98] leading-relaxed mb-8 max-w-2xl">
                Cracked screen, flickering display, or dead pixels? We repair MacBook, iMac, and iPhone screens from our
                Hyde Park workshop. OEM-grade panels, True Tone calibration retained, and an up-to-3 year warranty on
                every repair. From <strong className="text-[#E8F4F1]">R2,499</strong> — that is 50–70% less than the Apple Store.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href={buildWhatsAppUrl('SCR-HERO', 'screen')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] font-bold px-8 py-4 rounded-xl hover:bg-[#0dcc6a] transition-colors text-lg"
                >
                  <Phone className="w-5 h-5" />
                  WhatsApp Us Now
                </a>
                <a
                  href={`tel:${CONTACT.phoneTel}`}
                  className="inline-flex items-center justify-center gap-2 border-2 border-[#27504D] text-[#E8F4F1] font-bold px-8 py-4 rounded-xl hover:border-[#0FEA7A] hover:text-[#0FEA7A] transition-colors text-lg">
                  <Phone className="w-5 h-5" />
                  {CONTACT.phone}
                </a>
              </div>

              {/* Trust badges */}
              <div className="flex flex-wrap gap-6 mt-10 text-sm text-[#7A9E98]">
                <span className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-[#0FEA7A]" /> Up-to-3 Year Warranty
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#0FEA7A]" /> No Fix, No Fee
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#0FEA7A]" /> Same-Day iPhone Repairs
                </span>
                <span className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-[#0FEA7A]" /> {SITE.rating}/5 from {SITE.reviewCount} Reviews
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ─── INTRO BODY TEXT ───────────────────────────────────── */}
        <section className="py-16 border-t border-[rgba(255,255,255,0.06)]">
          <div className="max-w-4xl mx-auto px-4 prose-lg text-[#7A9E98] leading-relaxed space-y-6">
            <h2 className="text-3xl font-extrabold text-[#E8F4F1]">
              Johannesburg&rsquo;s Specialist Apple Screen Repair Workshop
            </h2>
            <p>
              We have been repairing Apple screens from our Hyde Park workshop for over {SITE.yearsExperience} years.
              In that time, we have handled thousands of cracked MacBook displays, shattered iPhone screens, and
              everything in between — from hairline cracks that slowly spread to completely smashed Liquid Retina XDR
              panels on the latest MacBook Pro 16-inch models.
            </p>
            <p>
              What sets our screen repair service apart is precision. Every MacBook display we fit is a complete
              assembly — the LCD or OLED panel, backlight layer, glass cover, and aluminium housing — not a loose panel
              glued into your existing lid. This matters because a properly seated display assembly eliminates backlight
              bleed, ensures uniform brightness across the panel, and maintains the tight tolerances Apple designs for.
            </p>
            <p>
              For iPhone screen repairs, we use OEM-grade OLED panels (iPhone X and later) or LCD panels (iPhone 8 and
              SE) and transfer your True Tone calibration data so the display continues to adjust colour temperature
              automatically. This is a step many repair shops skip, which is why you often see complaints about
              &ldquo;cold&rdquo; or bluish displays after third-party iPhone screen replacements.
            </p>
            <p>
              Our pricing is transparent. A MacBook Air screen replacement starts from R2,499 and a MacBook Pro 13-inch
              from R3,499. Compare that to Apple&rsquo;s official pricing of R6,000 to R15,000 depending on the model.
              We use equivalent-grade panels with the same resolution, P3 wide colour gamut, and brightness specifications
              — the difference is you save 50–70% and get a longer warranty.
            </p>
            <p>
              Every screen repair includes a full quality test: brightness uniformity, dead pixel inspection, colour
              accuracy, and on iPhones, touch responsiveness across all zones including the edges. We test against pure
              white, black, red, green, and blue screens to catch any panel defects before your device leaves our
              workshop.
            </p>
          </div>
        </section>

        {/* ─── PRICING TABLE ─────────────────────────────────────── */}
        <section className="py-16 bg-[#111C1A]">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4 text-center">
              Screen Repair Pricing
            </h2>
            <p className="text-center text-[#7A9E98] mb-10 max-w-2xl mx-auto">
              Fixed pricing. Written quote before any work begins. Assessment from R599.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#27504D]">
                    <th className="py-4 px-4 text-[#0FEA7A] font-semibold text-sm uppercase tracking-wider">Device</th>
                    <th className="py-4 px-4 text-[#0FEA7A] font-semibold text-sm uppercase tracking-wider">From</th>
                    <th className="py-4 px-4 text-[#0FEA7A] font-semibold text-sm uppercase tracking-wider hidden sm:table-cell">Models Covered</th>
                    <th className="py-4 px-4 text-[#0FEA7A] font-semibold text-sm uppercase tracking-wider hidden md:table-cell">Turnaround</th>
                  </tr>
                </thead>
                <tbody>
                  {pricingTable.map((row) => (
                    <tr key={row.device} className="border-b border-[rgba(255,255,255,0.06)] hover:bg-[rgba(15,234,122,0.04)] transition-colors">
                      <td className="py-4 px-4 font-semibold text-[#E8F4F1]">{row.device}</td>
                      <td className="py-4 px-4 text-[#0FEA7A] font-bold text-lg">{row.from}</td>
                      <td className="py-4 px-4 text-[#7A9E98] text-sm hidden sm:table-cell">{row.note}</td>
                      <td className="py-4 px-4 text-[#7A9E98] text-sm hidden md:table-cell">{row.turnaround}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-xs text-[#7A9E98] mt-6 text-center">
              All prices in ZAR and include parts, labour, and up-to-3 year warranty. Exact price depends on model year and panel type.
              Apple Store comparison: R6,000–R15,000 for the same repairs.
            </p>
          </div>
        </section>

        {/* ─── TYPES OF SCREEN DAMAGE ────────────────────────────── */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4 text-center">
              Types of Screen Damage We Repair
            </h2>
            <p className="text-center text-[#7A9E98] mb-12 max-w-2xl mx-auto">
              From hairline cracks to complete backlight failure — we have seen and fixed them all in our Hyde Park workshop.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {damageTypes.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="bg-[#111C1A] border border-[#27504D] rounded-2xl p-6 hover:border-[#0FEA7A] transition-colors"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-[rgba(15,234,122,0.1)] flex items-center justify-center">
                        <Icon className="w-5 h-5 text-[#0FEA7A]" />
                      </div>
                      <h3 className="text-lg font-bold text-[#E8F4F1]">{item.title}</h3>
                    </div>
                    <p className="text-[#7A9E98] text-sm leading-relaxed">{item.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ─── REPAIR PROCESS ────────────────────────────────────── */}
        <section className="py-16 bg-[#111C1A]">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4 text-center">
              Our Screen Repair Process
            </h2>
            <p className="text-center text-[#7A9E98] mb-12 max-w-2xl mx-auto">
              A clear, structured process so you know exactly what happens to your device at every stage.
            </p>

            <div className="space-y-8">
              {processSteps.map((item) => (
                <div key={item.step} className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[rgba(15,234,122,0.1)] border border-[#27504D] flex items-center justify-center">
                    <span className="text-[#0FEA7A] font-bold text-lg">{item.step}</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#E8F4F1] mb-2">{item.title}</h3>
                    <p className="text-[#7A9E98] leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── DEVICE COMPATIBILITY ──────────────────────────────── */}
        <section className="py-16">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4 text-center">
              Device Compatibility
            </h2>
            <p className="text-center text-[#7A9E98] mb-10 max-w-2xl mx-auto">
              We repair screens on all Apple devices from 2012 through to the current M4 generation.
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {compatibleDevices.map((item) => (
                <div key={item.category} className="bg-[#111C1A] border border-[#27504D] rounded-xl p-5">
                  <h3 className="text-[#0FEA7A] font-bold mb-2">{item.category}</h3>
                  <p className="text-[#7A9E98] text-sm leading-relaxed">{item.models}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── WARRANTY & GUARANTEE ──────────────────────────────── */}
        <section className="py-16 bg-[#111C1A]">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-8 text-center">
              Warranty &amp; Guarantee
            </h2>

            <div className="grid sm:grid-cols-3 gap-6">
              <div className="text-center p-6">
                <Shield className="w-10 h-10 text-[#0FEA7A] mx-auto mb-4" />
                <h3 className="text-lg font-bold text-[#E8F4F1] mb-2">Up-to-3 Year Warranty</h3>
                <p className="text-[#7A9E98] text-sm">
                  Every screen repair includes a written warranty covering the display panel, backlight, and our workmanship.
                  Parts and labour included.
                </p>
              </div>
              <div className="text-center p-6">
                <CheckCircle className="w-10 h-10 text-[#0FEA7A] mx-auto mb-4" />
                <h3 className="text-lg font-bold text-[#E8F4F1] mb-2">No Fix, No Fee</h3>
                <p className="text-[#7A9E98] text-sm">
                  If we cannot repair your screen or source the correct panel for your model, you pay nothing beyond the
                  assessment fee. No surprises.
                </p>
              </div>
              <div className="text-center p-6">
                <Star className="w-10 h-10 text-[#0FEA7A] mx-auto mb-4" />
                <h3 className="text-lg font-bold text-[#E8F4F1] mb-2">OEM-Grade Panels</h3>
                <p className="text-[#7A9E98] text-sm">
                  We use display assemblies that match Apple&rsquo;s specifications for resolution, brightness, colour
                  gamut (P3), and True Tone. No cheap aftermarket knock-offs.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── LCD vs OLED EXPLAINER ─────────────────────────────── */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 space-y-6">
            <h2 className="text-3xl font-extrabold text-[#E8F4F1]">
              LCD vs OLED: What Panel Does Your Device Use?
            </h2>
            <p className="text-[#7A9E98] leading-relaxed">
              Understanding your display technology matters because it affects both the repair cost and the replacement
              options available. Here is a quick breakdown:
            </p>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="bg-[#111C1A] border border-[#27504D] rounded-xl p-6">
                <h3 className="text-[#0FEA7A] font-bold text-lg mb-3">LCD / Retina (LED-backlit IPS)</h3>
                <p className="text-[#7A9E98] text-sm leading-relaxed mb-3">
                  Used in most MacBook Air models, MacBook Pro 13-inch (2012–2023), iMac 21.5-inch and 27-inch, and
                  iPhones up to iPhone 11 (excluding iPhone X/XS). The display uses a backlight behind the LCD panel.
                </p>
                <p className="text-[#7A9E98] text-sm leading-relaxed">
                  <strong className="text-[#E8F4F1]">Repair implication:</strong> Generally more affordable to replace. Backlight
                  issues can sometimes be fixed at component level (fuse or driver IC) without replacing the entire panel.
                </p>
              </div>
              <div className="bg-[#111C1A] border border-[#27504D] rounded-xl p-6">
                <h3 className="text-[#0FEA7A] font-bold text-lg mb-3">OLED / Liquid Retina XDR</h3>
                <p className="text-[#7A9E98] text-sm leading-relaxed mb-3">
                  Used in MacBook Pro 14-inch and 16-inch (2021 onwards), iPhone X and later (excluding SE models).
                  Each pixel produces its own light — no backlight layer. Deeper blacks, higher contrast, thinner panels.
                </p>
                <p className="text-[#7A9E98] text-sm leading-relaxed">
                  <strong className="text-[#E8F4F1]">Repair implication:</strong> More expensive to replace due to panel cost, but
                  there is no separate backlight circuit to fail. Damage is typically physical (cracks) rather than
                  electronic.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── SUBURB LINKS ──────────────────────────────────────── */}
        <section className="py-16 bg-[#111C1A]">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-8 text-center">
              Screen Repair Near You
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {suburbPages.map((suburb) => (
                <Link
                  key={suburb.href}
                  href={suburb.href}
                  className="bg-[#0A1A18] border border-[#27504D] rounded-xl p-4 text-center hover:border-[#0FEA7A] transition-colors group"
                >
                  <span className="text-[#E8F4F1] font-semibold group-hover:text-[#0FEA7A] transition-colors">
                    {suburb.label}
                  </span>
                  <span className="block text-xs text-[#7A9E98] mt-1">{suburb.distance} from Hyde Park</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ─── INTERNAL LINKS ────────────────────────────────────── */}
        <section className="py-16">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-8 text-center">
              Other Repair Services
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: 'Logic Board Repair', href: '/logic-board-repair', desc: 'Component-level board repair from R599 assessment' },
                { label: 'Liquid Damage Repair', href: '/liquid-damage', desc: 'Ultrasonic cleaning and board-level restoration' },
                { label: 'Battery Replacement', href: '/battery-replacement', desc: 'MacBook and iPhone battery replacement' },
                { label: 'MacBook Repair', href: '/macbook-repair', desc: 'All MacBook faults — power, display, keyboard' },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="bg-[#111C1A] border border-[#27504D] rounded-xl p-5 hover:border-[#0FEA7A] transition-colors group"
                >
                  <h3 className="text-[#E8F4F1] font-bold group-hover:text-[#0FEA7A] transition-colors flex items-center gap-2">
                    {item.label} <ArrowRight className="w-4 h-4" />
                  </h3>
                  <p className="text-[#7A9E98] text-sm mt-2">{item.desc}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ─── GOOGLE REVIEWS ────────────────────────────────────── */}
        <section className="py-16 bg-[#111C1A]">
          <div className="max-w-5xl mx-auto px-4">
            <Suspense fallback={<div className="h-40" />}>
              <GoogleReviews />
            </Suspense>
          </div>
        </section>

        {/* ─── FAQ ACCORDION ─────────────────────────────────────── */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4">
            <FAQAccordion items={faqs} title="Screen Repair — Frequently Asked Questions" />
          </div>
        </section>

        {/* ─── BOTTOM CTA ────────────────────────────────────────── */}
        <section className="py-20 bg-gradient-to-br from-[#27504D] to-[#0A1A18]">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4">
              Cracked Screen? Get a Quote in Minutes
            </h2>
            <p className="text-[#7A9E98] text-lg mb-8 max-w-2xl mx-auto">
              WhatsApp us a photo of the damage and we will reply with a fixed-price quote — usually within 30 minutes
              during business hours. Assessment from R599. No Fix, No Fee.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={buildWhatsAppUrl('SCR-BOTTOM', 'screen')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] font-bold px-8 py-4 rounded-xl hover:bg-[#0dcc6a] transition-colors text-lg"
              >
                <Phone className="w-5 h-5" />
                WhatsApp a Photo Now
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 border-2 border-[#E8F4F1] text-[#E8F4F1] font-bold px-8 py-4 rounded-xl hover:border-[#0FEA7A] hover:text-[#0FEA7A] transition-colors text-lg"
              >
                Contact Us <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            <p className="text-[#7A9E98] text-sm mt-8">
              {CONTACT.address.full} &bull; {CONTACT.phone} &bull; {CONTACT.hours.weekdays}
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
