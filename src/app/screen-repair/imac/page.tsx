import type { Metadata } from 'next';
import Link from 'next/link';
import { Suspense } from 'react';
import { Phone, ArrowRight, Monitor, CheckCircle, Shield, Clock, Zap, AlertTriangle } from 'lucide-react';
import SchemaOrg from '@/components/seo/SchemaOrg';
import { buildFaqSchema, buildBreadcrumbSchema, LOCAL_BUSINESS_PROVIDER } from '@/lib/schema';
import GoogleReviews from '@/components/ui/GoogleReviews';
import FAQAccordion from '@/components/ui/FAQ';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { CONTACT, SITE, buildWhatsAppUrl } from '@/lib/constants';
import PricingNote from '@/components/PricingNote';
import PricingRange from '@/components/PricingRange';

export const metadata: Metadata = {
  title: 'iMac Screen Repair Johannesburg [2026] | From R3,999 | ZA Support',
  description:
    'iMac screen repair in Johannesburg. 21.5″, 24″ M1/M3/M4 and 27″ Retina 5K specialists. Adhesive removal, 5K calibration. From R3,999. Hyde Park. Book now.',
  alternates: { canonical: 'https://zasupport.com/screen-repair/imac' },
  keywords: [
    'iMac screen repair Johannesburg',
    'iMac display replacement Johannesburg',
    'iMac 27 inch Retina 5K screen repair',
    'iMac 24 inch M1 screen replacement',
    'iMac cracked screen repair Hyde Park',
    'iMac screen repair cost South Africa',
    'iMac display repair near me Johannesburg',
    'iMac screen repair from R3999',
  ],
};

const breadcrumbItems = [
  { label: 'Screen Repair', href: '/screen-repair' },
  { label: 'iMac' },
];

const breadcrumbSchemaItems = [
  { name: 'Home', url: 'https://zasupport.com' },
  { name: 'Screen Repair', url: 'https://zasupport.com/screen-repair' },
  { name: 'iMac Screen Repair', url: 'https://zasupport.com/screen-repair/imac' },
];

const faqs = [
  {
    question: 'How much does iMac screen repair cost in Johannesburg?',
    answer:
      'iMac screen repair starts from R3,999 at ZA Support, depending on the model. The 21.5-inch models are the most straightforward and sit at the lower end of the range. The 24-inch M1, M3, and M4 iMacs require specialised adhesive strips and panel calibration, which places them mid-range. The 27-inch Retina 5K display is the most complex repair — parts are larger and 5K calibration is required. Apple stores and iStores charge R8,000 to R18,000 for the same job. We provide a written fixed-price quote before any work begins.',
  },
  {
    question: 'How do you open an iMac to replace the screen?',
    answer:
      'The iMac display is bonded to the chassis using Apple-specific adhesive strips rather than screws — there is no traditional bezel or clip system. In our Hyde Park workshop we use a heated pad, a thin slicing wheel, and our own tooling to gradually lift the display without cracking the glass or damaging the LCD panel beneath. The entire process takes roughly 45 minutes just to open the machine safely. We then clean the frame, install new adhesive strips, and reseal the display before returning it to you.',
  },
  {
    question: 'Can you repair the 27-inch iMac Retina 5K display?',
    answer:
      'Yes. The 27-inch Retina 5K display (models A1419, A2115) uses a 5120 × 2880 LCD panel with a wide colour (P3) gamut. After fitting a replacement panel we run a full 5K calibration sequence — brightness uniformity, P3 colour accuracy, and dead pixel sweep across all five test screens. We have completed this repair for clients in Sandton, Rosebank, Bryanston, and across Johannesburg. Assessment from R599. Up-to-3 year warranty included.',
  },
  {
    question: 'My iMac 24-inch M1 screen is cracked. Is it worth repairing?',
    answer:
      'Almost always, yes. A replacement iMac 24-inch M1 currently costs R22,000 to R38,000 depending on specification. Our screen repair starts from R3,999 — a fraction of replacement cost. The M1 logic board is completely separate from the display assembly on the 24-inch iMac, so a cracked screen is purely a display repair with no risk to your data or processing hardware. We retain True Tone calibration after the repair.',
  },
  {
    question: 'Does the iMac display replacement include a warranty?',
    answer:
      'Yes. Every iMac screen repair at ZA Support includes an up-to-3 year warranty covering the display panel, backlight circuit, and our workmanship. If the replacement panel develops dead pixels, backlight failure, or colour drift within the warranty period, we repair or replace it at from R599. The warranty is issued in writing at the time of collection.',
  },
  {
    question: 'What is the TCON board, and can you repair it?',
    answer:
      'The T-Con (timing controller) board is a small PCB inside the iMac display assembly that drives the LCD panel. When it fails you typically see horizontal or vertical lines across the screen, or a completely black display despite the backlight functioning. On many iMac models the T-Con is a separate replaceable board rather than being integrated into the panel itself. In our workshop we diagnose T-Con failure with a bench test before quoting panel replacement — in some cases a T-Con board swap is all that is needed, saving you several hundred rand.',
  },
  {
    question: 'Is the iMac display glass and LCD the same piece?',
    answer:
      'No, but Apple bonds them together at the factory, so they are replaced as a single integrated assembly. The front glass panel sits on top of the LCD and is laminated to it. On the iMac Pro and most Intel iMac models, the display assembly also includes the backlight diffuser. This integrated design is what makes iMac screen repair more involved than a conventional monitor replacement and is one reason the Apple Store charges so much for it.',
  },
  {
    question: 'Can a power surge from load shedding damage my iMac screen?',
    answer:
      'Yes, and we see this regularly in Johannesburg. When Eskom restores power after an outage, the returning surge — especially on older or poorly protected circuits — can blow the iMac backlight fuse or damage the backlight driver IC. The symptom is a screen that is completely black while the machine still boots normally (you can hear the chime and see the cursor with a torch). This is a repairable component-level fault and considerably cheaper than a full display replacement. A surge protector rated for electronics is essential for any iMac in South Africa.',
  },
  {
    question: 'How long does iMac screen repair take?',
    answer:
      'Assessment is completed within 24 hours of drop-off. Most iMac screen repairs are completed within 3 to 5 business days once parts are confirmed available — sourcing a 5K or M1 panel for Johannesburg clients can take 1 to 2 additional days if our workshop stock is exhausted. We provide a specific timeline in the written quote and update you by WhatsApp when the repair is complete. Collection or delivery to Sandton, Rosebank, Bryanston, and surrounding suburbs is available.',
  },
  {
    question: 'Do you repair iMac Pro screens?',
    answer:
      'Yes. The iMac Pro (A1862, 2017) uses a 27-inch Retina 5K display with a P3 wide colour gamut — the same panel size as the late-model 27-inch iMac but with a darker Space Grey chassis. The adhesive removal and 5K calibration procedure is identical. We have serviced iMac Pros for clients in Sandton and Midrand. Note that the iMac Pro was discontinued by Apple in 2021, which means panel sourcing may take slightly longer than for current models.',
  },
  {
    question: 'Does the VESA mount affect iMac screen repair?',
    answer:
      'No. VESA-mounted iMacs (A1418 21.5-inch VESA, A1419 27-inch VESA) have the same display assembly as the stand-mounted versions — only the rear chassis attachment point differs. Whether your iMac is wall-mounted or on the desk, the screen replacement procedure and pricing are identical. We can work with the unit on a stand or you can bring it without the mount arm — just ensure the machine itself arrives safely padded.',
  },
];

const repairHighlights = [
  {
    title: 'Adhesive Strip Removal',
    desc: 'We use a heated pad and slicing wheel to lift the bonded display cleanly from the chassis without cracking the glass. New Apple-spec adhesive strips are fitted on reassembly.',
    icon: Shield,
  },
  {
    title: '5K Retina Calibration',
    desc: 'After every 27-inch panel installation we run a full 5120 × 2880 calibration: P3 colour accuracy, brightness uniformity across 25 zones, and a five-screen dead pixel sweep.',
    icon: Monitor,
  },
  {
    title: 'Dust-Free Procedure',
    desc: 'The iMac display cavity is an enclosed space. We clean the interior with compressed air and lint-free cloths before resealing to prevent dust contamination under the panel.',
    icon: CheckCircle,
  },
  {
    title: 'T-Con Board Diagnosis',
    desc: 'Before quoting a full panel replacement we bench-test the T-Con board separately. A T-Con fault causing lines or no image is often cheaper to fix than the full assembly.',
    icon: Zap,
  },
  {
    title: 'Load Shedding Protection Advice',
    desc: 'Every repair includes a brief assessment of your surge protection setup. Johannesburg\'s power grid makes a quality UPS essential for any iMac — we will tell you exactly what we recommend for your model.',
    icon: AlertTriangle,
  },
  {
    title: 'Same-Day Collection Available',
    desc: 'We collect from Sandton, Rosebank, Fourways, Bryanston, Midrand, and Randburg. Large-format machines like the 27-inch iMac benefit from our padded collection service.',
    icon: Clock,
  },
];

const modelPricing = [
  { model: 'iMac 21.5″ (2012–2019)', panel: 'LCD / Retina 4K (2015+)', from: 'R3,999', turnaround: '3–4 days' },
  { model: 'iMac 24″ M1 (2021)', panel: 'Retina 4.5K (4480 × 2520)', from: 'R4,499', turnaround: '3–5 days' },
  { model: 'iMac 24″ M3 (2023)', panel: 'Retina 4.5K (4480 × 2520)', from: 'R4,499', turnaround: '3–5 days' },
  { model: 'iMac 24″ M4 (2024)', panel: 'Retina 4.5K (4480 × 2520)', from: 'R4,499', turnaround: '3–5 days' },
  { model: 'iMac 27″ Retina 5K (2014–2020)', panel: '5K LCD (5120 × 2880, P3)', from: 'R5,999', turnaround: '4–5 days' },
  { model: 'iMac Pro 27″ (2017)', panel: '5K LCD (5120 × 2880, P3)', from: 'R5,999', turnaround: '4–6 days' },
];

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'iMac Screen Repair Johannesburg',
  description: 'Professional iMac screen repair in Johannesburg. 21.5-inch, 24-inch M1/M3/M4, and 27-inch Retina 5K models. Adhesive removal, 5K calibration, TCON board diagnosis. From R3,999. Up-to-3 year warranty.',
  provider: LOCAL_BUSINESS_PROVIDER,
  areaServed: [
    { '@type': 'City', name: 'Johannesburg' },
    { '@type': 'Neighborhood', name: 'Hyde Park' },
    { '@type': 'Neighborhood', name: 'Sandton' },
    { '@type': 'Neighborhood', name: 'Rosebank' },
    { '@type': 'Neighborhood', name: 'Bryanston' },
    { '@type': 'Neighborhood', name: 'Fourways' },
  ],
  availableChannel: [
    { '@type': 'ServiceChannel', serviceUrl: 'https://wa.me/27645295863', serviceType: 'WhatsApp' },
    { '@type': 'ServiceChannel', servicePhone: '+27645295863', serviceType: 'Phone' },
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'iMac Screen Repair Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: 'iMac 21.5-inch Screen Replacement', description: 'LCD and Retina 4K display assembly replacement. From R3,999.' },
        price: '3999',
        priceCurrency: 'ZAR',
      },
      {
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: 'iMac 24-inch M1/M3/M4 Screen Replacement', description: 'Retina 4.5K display assembly replacement with calibration. From R4,499.' },
        price: '4499',
        priceCurrency: 'ZAR',
      },
      {
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: 'iMac 27-inch Retina 5K Screen Replacement', description: '5K P3 display assembly replacement with full calibration. From R5,999.' },
        price: '5999',
        priceCurrency: 'ZAR',
      },
    ],
  },
};

const faqSchema = buildFaqSchema(faqs);
const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbSchemaItems);

export default function ScreenRepairImacPage() {
  const whatsappUrl = buildWhatsAppUrl('SCR-IMAC-HERO', 'screen-repair');

  return (
    <>
      <SchemaOrg schema={serviceSchema} />
      <SchemaOrg schema={faqSchema} />
      <SchemaOrg schema={breadcrumbSchema} />

      {/* Hero */}
      <section className="hero-gradient grid-overlay pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={breadcrumbItems} />
          <div className="mt-8 max-w-4xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#E8F4F1] leading-tight mb-6">
              iMac Screen Repair
              <br /><span className="text-[#0FEA7A]">Johannesburg</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-4 max-w-3xl leading-relaxed">
              The iMac display is bonded to the chassis with adhesive — not screws. One wrong move and the glass shatters further. In our Hyde Park workshop we have developed a heated-pad removal process that opens iMac displays without secondary damage, from the 21.5-inch entry model through to the 27-inch Retina 5K and 24-inch M4.
            </p>
            <div className="flex items-center gap-2 text-[#7A9E98] text-sm mb-8">
              <Monitor className="w-4 h-4 text-[#0FEA7A]" />
              <span>1 Hyde Lane, Hyde Park, Office E2004, JHB 2196 | From R3,999 | Collection across Johannesburg</span>
            </div>
            <div className="flex flex-wrap gap-3 mb-8">
              {[
                { icon: Shield, label: 'From R599 assessment' },
                { icon: Monitor, label: 'All iMac Models' },
                { icon: CheckCircle, label: 'Up to 3 Year Warranty' },
                { icon: Zap, label: 'Assessment from R599' },
                { icon: Clock, label: '3–5 Day Turnaround' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 bg-[rgba(15,234,122,0.08)] border border-[rgba(15,234,122,0.15)] px-3 py-2 rounded-full">
                  <Icon className="w-4 h-4 text-[#0FEA7A]" />
                  <span className="text-[#E8F4F1] text-sm font-medium">{label}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 hover:shadow-[0_0_32px_rgba(15,234,122,0.4)] transition-all"
              >
                WhatsApp Us Now
              </a>
              <a
                href={`tel:${CONTACT.phoneTel}`}
                className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all"
              >
                <Phone className="w-5 h-5" /> Call {CONTACT.phone}
              </a>
              <Link
                href="/screen-repair"
                className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.2)] text-[#7A9E98] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[rgba(15,234,122,0.05)] transition-all"
              >
                All Screen Repair <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
            <div className="flex flex-wrap gap-6 mt-8 pt-6 border-t border-[rgba(255,255,255,0.06)]">
              {[
                { value: '200+', label: 'iMac Screens Replaced' },
                { value: SITE.yearsExperience + ' Years', label: 'In Business Since 2009' },
                { value: SITE.rating + '/5', label: SITE.reviewCount + ' Google Reviews' },
                { value: 'Up to 3 Yrs', label: 'Written Warranty' },
              ].map(({ value, label }) => (
                <div key={label}>
                  <p className="text-[#0FEA7A] text-xl font-extrabold">{value}</p>
                  <p className="text-[#7A9E98] text-xs mt-0.5">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why iMac Screen Repair Is Different */}
      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4">Why iMac Screen Repair Is Not a DIY Job</h2>
          <div className="space-y-4 text-[#7A9E98] leading-relaxed mb-8">
            <p>The biggest mistake we see with iMac screen repair is clients who attempt to open the machine with a suction cup and a guitar pick after watching a YouTube tutorial. The result, in almost every case, is a second crack running across the glass before the panel is even fully lifted. The iMac display is not held by clips — it is bonded with industrial adhesive strips that run the entire perimeter of the screen. You cannot separate them without controlled heat and the right tool geometry.</p>
            <p>In our Hyde Park workshop we use a dedicated heating pad that sits on the iMac face for several minutes, softening the adhesive uniformly before we introduce a slicing wheel at the correct angle for each corner radius. It is a slow, deliberate process — and for good reason. The LCD panel behind the glass is fragile and sits only millimetres from the cutting path. Rush this and you replace a cracked front glass with a cracked LCD panel, doubling the repair cost.</p>
            <p>The adhesive removal challenge aside, the iMac display repair also involves calibration steps that simply do not exist on MacBook repairs. The 27-inch Retina 5K panel is a 5120 × 2880 LCD with P3 wide colour coverage. After fitting a replacement panel we run a full calibration cycle — checking brightness uniformity across 25 measurement zones, verifying P3 colour accuracy with a colorimeter, and sweeping for dead pixels across five solid colour screens. Without calibration, the screen may look slightly green or exhibit uneven brightness in the lower corners, which clients notice immediately on a display of this quality.</p>
            <p>South Africa adds an additional layer of complexity that other markets do not face: load shedding. We consistently see iMac backlight driver failures in Johannesburg suburbs where power surges on restoration have damaged the backlight circuit. Bryanston, Randburg, and Fourways clients in particular bring in iMacs with black screens in the weeks after prolonged Eskom outages. This is a component-level fault — a blown backlight fuse or damaged driver IC — and considerably cheaper to fix than a full panel replacement. We always check the backlight circuit before quoting panel replacement.</p>
          </div>
        </div>
      </section>

      {/* Pricing Table */}
      <section className="py-10 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4">iMac Screen Repair Pricing</h2>
          <p className="text-[#7A9E98] mb-8 max-w-3xl leading-relaxed">
            All prices include the display assembly, adhesive strips, calibration, labour, and our up-to-3 year warranty. Assessment from R599. From R599 assessment applies to all models. For comparison, the Apple Store charges R8,000 to R18,000 for the same repair.
          </p>
          <div className="overflow-x-auto rounded-2xl border border-[rgba(15,234,122,0.12)]">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[rgba(15,234,122,0.06)] border-b border-[rgba(15,234,122,0.12)]">
                  <th className="text-left px-5 py-4 text-[#E8F4F1] font-bold">Model</th>
                  <th className="text-left px-5 py-4 text-[#E8F4F1] font-bold">Panel</th>
                  <th className="text-left px-5 py-4 text-[#E8F4F1] font-bold">From</th>
                  <th className="text-left px-5 py-4 text-[#E8F4F1] font-bold">Turnaround</th>
                </tr>
              </thead>
              <tbody>
                {modelPricing.map((row, i) => (
                  <tr key={row.model} className={`border-b border-[rgba(255,255,255,0.04)] ${i % 2 === 0 ? 'bg-transparent' : 'bg-[rgba(255,255,255,0.02)]'}`}>
                    <td className="px-5 py-4 text-[#E8F4F1] font-medium">{row.model}</td>
                    <td className="px-5 py-4 text-[#7A9E98]">{row.panel}</td>
                    <td className="px-5 py-4 text-[#0FEA7A] font-bold">{row.from}</td>
                    <td className="px-5 py-4 text-[#7A9E98]">{row.turnaround}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-[#7A9E98] text-xs mt-4">Prices are indicative. Exact quote provided in writing before work begins. Assessment fee from R599 applies if repair is declined after diagnosis.</p>
          <PricingRange page="/screen-repair/imac" />
          <PricingNote variant="inline" />
        </div>
      </section>

      {/* What We Do */}
      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4">Our iMac Screen Repair Process</h2>
          <p className="text-[#7A9E98] mb-10 max-w-3xl leading-relaxed">
            Every iMac screen repair we carry out follows the same dust-free, fully calibrated process. We do not cut corners — the iMac display is too precise an instrument for shortcuts.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {repairHighlights.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="glass-card p-6 rounded-2xl border border-[rgba(15,234,122,0.12)] hover:border-[rgba(15,234,122,0.25)] transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-[rgba(15,234,122,0.1)] flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-[#0FEA7A]" />
                  </div>
                  <h3 className="text-[#E8F4F1] font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-[#7A9E98] text-sm leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Technical Deep Dive */}
      <section className="py-10 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-4">The iMac Display: What Makes It So Complex to Replace</h2>
          <div className="space-y-5 text-[#7A9E98] leading-relaxed">
            <p>The iMac&apos;s all-in-one design places the display and computer in the same enclosure — which means every iMac screen repair is also, in effect, partial disassembly of the entire machine. On the Intel 27-inch iMac, reaching the LCD panel requires not just opening the front glass, but carefully routing around the thermal sensor ribbon, the display data cable, and the ambient light sensor flex — all of which are ZIF (zero-insertion-force) connectors that break if you apply pressure at the wrong angle.</p>
            <p>The 24-inch M1, M3, and M4 iMacs use a revised internal layout. Apple redesigned the adhesive system for these models — the strips are thinner and run through tighter corners than the older Intel chassis. The display cable on the 24-inch M-series iMac is also routed through the chin of the machine rather than the side, which changes the opening sequence entirely. We have documented our own opening procedure for each model year in the workshop — the 2021 and 2023 chassis require slightly different tool positioning in the lower-right corner to avoid the wireless antenna assembly.</p>
            <p>Once the panel is in, calibration matters. Apple calibrates every iMac display at the factory before shipping — measuring the specific output of that individual panel and writing a colour profile to the logic board. When you replace the panel with a new one, that calibration profile no longer matches the physical hardware. Without recalibration, the display can present as slightly warm, slightly cool, or with uneven brightness across the panel. We use a colorimeter and our own calibration workflow to bring each replacement panel into spec before the machine leaves the workshop.</p>
            <p>For iMac owners in Johannesburg, we also recommend discussing surge protection during the assessment. The{' '}
              <a
                href="https://www.eskom.co.za/distribution/customer-services/protection-against-voltage-surges/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#0FEA7A] underline underline-offset-2 hover:text-[#0FEA7A]/80 transition-colors"
              >
                South African power grid documentation from Eskom
              </a>{' '}
              notes that voltage surges on restoration are a known risk — and the iMac backlight driver circuit is particularly sensitive to them. A UPS rated for electronics is the single best preventative measure for protecting a repair investment.</p>
          </div>
        </div>
      </section>

      {/* Apple vs ZA Support */}
      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-6">Apple Store vs ZA Support: iMac Screen Repair</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            <div className="glass-card p-6 border border-red-500/20">
              <h3 className="text-red-400 font-bold mb-3">Apple Store / iStore</h3>
              <ul className="text-[#7A9E98] text-sm space-y-2">
                <li>Display replacement: R8,000 to R18,000 depending on model</li>
                <li>Out-of-warranty repair — no coverage for accidental damage</li>
                <li>Turnaround 5–10 business days via Apple depot</li>
                <li>No component-level T-Con or backlight diagnosis</li>
                <li>Standard 90-day repair warranty</li>
                <li>Machine shipped to a central depot — your data leaves the building</li>
              </ul>
            </div>
            <div className="glass-card p-6 border border-[rgba(15,234,122,0.3)]">
              <h3 className="text-[#0FEA7A] font-bold mb-3">ZA Support</h3>
              <ul className="text-[#7A9E98] text-sm space-y-2">
                <li>iMac screen repair from R3,999 — 50–75% below Apple pricing</li>
                <li>Written fixed-price quote before any work begins</li>
                <li>3–5 day turnaround, all work done in our Hyde Park workshop</li>
                <li>T-Con board and backlight circuit diagnosed separately — saves you money</li>
                <li>Up-to-3 year warranty on parts and labour</li>
                <li>Your machine never leaves our workshop — data stays with you</li>
              </ul>
            </div>
          </div>
          <div className="p-5 rounded-xl border border-[rgba(15,234,122,0.15)] bg-[rgba(15,234,122,0.04)] flex items-start gap-4">
            <Shield className="w-5 h-5 text-[#0FEA7A] flex-shrink-0 mt-0.5" />
            <p className="text-[#7A9E98] text-sm leading-relaxed">
              From R599 assessment on every iMac screen repair. If we assess the machine and cannot repair the display to your satisfaction, the assessment fee of R599 applies and the iMac is returned exactly as received. No hidden charges.
            </p>
          </div>
        </div>
      </section>

      {/* Google Reviews */}
      <section className="py-10 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#E8F4F1] mb-6">What Johannesburg Clients Say</h2>
          <Suspense fallback={<div className="text-[#7A9E98] text-sm">Loading reviews…</div>}>
            <GoogleReviews maxReviews={4} />
          </Suspense>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQAccordion items={faqs} title="iMac Screen Repair — Common Questions" />
        </div>
      </section>

      {/* Related Services */}
      <section className="py-8 sm:py-16 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#E8F4F1] mb-6">Related Repairs &amp; Services</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              { label: 'Screen Repair Hub', href: '/screen-repair' },
              { label: 'Screen Repair Sandton', href: '/screen-repair/sandton' },
              { label: 'Logic Board Repair', href: '/logic-board-repair' },
              { label: 'iMac Logic Board Repair', href: '/logic-board-repair/imac' },
              { label: 'Liquid Damage Repair', href: '/liquid-damage' },
              { label: 'MacBook Pro Screen Repair', href: '/screen-repair/macbook-pro' },
              { label: 'Contact Us', href: '/contact' },
              { label: 'Apple Experts Johannesburg', href: '/' },
            ].map((link) => (
              <Link key={link.href} href={link.href} className="glass-card p-4 text-center group">
                <span className="text-[#E8F4F1] text-sm font-semibold group-hover:text-[#0FEA7A] transition-colors">{link.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-8 sm:py-16 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-[rgba(39,80,77,0.3)] border border-[rgba(15,234,122,0.2)] rounded-3xl p-10">
            <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3">iMac Screen Damaged? Get a Fixed-Price Quote Today.</h2>
            <p className="text-[#7A9E98] mb-6 max-w-xl mx-auto leading-relaxed">
              From R3,999, with an up-to-3 year warranty and From R599 assessment. WhatsApp us a photo of the damage and we will give you an indicative price within the hour —, no call centre.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 hover:shadow-[0_0_32px_rgba(15,234,122,0.4)] transition-all"
              >
                WhatsApp a Photo of the Damage
              </a>
              <a
                href={`tel:${CONTACT.phoneTel}`}
                className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all"
              >
                <Phone className="w-5 h-5" /> Call {CONTACT.phone}
              </a>
            </div>
            <p className="text-[#7A9E98] text-xs mt-6">
              1 Hyde Lane, Hyde Park, Office E2004, JHB 2196 | Assessment from R599 | Up-to-3 year warranty | From R599 assessment
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
