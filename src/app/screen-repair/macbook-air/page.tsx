import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, ArrowRight, Monitor, CheckCircle, Shield, Zap, Eye, AlertTriangle, MapPin } from 'lucide-react';
import SchemaOrg from '@/components/seo/SchemaOrg';
import { buildFaqSchema, buildBreadcrumbSchema, LOCAL_BUSINESS_PROVIDER } from '@/lib/schema';
import GoogleReviews from '@/components/ui/GoogleReviews';
import FAQAccordion from '@/components/ui/FAQ';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { CONTACT, SITE, buildWhatsAppUrl } from '@/lib/constants';
import PricingNote from '@/components/PricingNote';

export const metadata: Metadata = {
  title: 'MacBook Air Screen Repair Johannesburg [2026] | From R2,499 | ZA Support',
  description:
    'MacBook Air screen repair in Johannesburg from R2,499. Cracked Liquid Retina, dead pixels, backlight failure. No Fix No Fee. Hyde Park workshop. Book today.',
  alternates: { canonical: 'https://zasupport.com/screen-repair/macbook-air' },
  keywords: [
    'MacBook Air screen repair Johannesburg',
    'MacBook Air display replacement Johannesburg',
    'MacBook Air cracked screen repair',
    'MacBook Air M1 screen repair',
    'MacBook Air M2 screen repair',
    'MacBook Air M3 screen repair',
    'MacBook Air Liquid Retina repair Hyde Park',
    'MacBook Air backlight repair Johannesburg',
    'MacBook Air dead pixels repair',
    'MacBook Air screen repair from R2499',
  ],
};

const breadcrumbItems = [
  { label: 'Screen Repair', href: '/screen-repair' },
  { label: 'MacBook Air' },
];

const breadcrumbSchemaItems = [
  { name: 'Home', url: 'https://zasupport.com' },
  { name: 'Screen Repair', url: 'https://zasupport.com/screen-repair' },
  { name: 'MacBook Air', url: 'https://zasupport.com/screen-repair/macbook-air' },
];

const faqs = [
  {
    question: 'How much does MacBook Air screen repair cost in Johannesburg?',
    answer:
      'MacBook Air screen repair starts from R2,499 at ZA Support in Hyde Park. This covers all MacBook Air models including M1 (2020), M2 (2022), M3 (2024), and older Intel 11-inch and 13-inch models. The exact price depends on your model and the type of panel — older non-Retina 11-inch and 13-inch Air models (pre-2018) use a different LCD assembly to the Liquid Retina panels in M-series machines. We provide a written fixed-price quote after a R599 assessment before any repair begins. For comparison, Apple Store or iStore screen replacement for a MacBook Air typically costs R4,500 to R8,000 and often involves depot shipping.',
  },
  {
    question: 'What is the difference between the Liquid Retina screen on M1/M2/M3 MacBook Air and older panels?',
    answer:
      'The M1 (2020), M2 (2022), and M3 (2024) MacBook Air use a Liquid Retina IPS panel with True Tone and P3 wide colour. These are laminated displays with no air gap, meaning the glass and LCD are bonded as a single assembly — you cannot replace just the outer glass without specialised equipment. Pre-2018 MacBook Air models used a standard TN or IPS panel with a non-laminated construction and a noticeably lower pixel density. The 11-inch Air (2010–2015) and the 13-inch non-Retina Air (2012–2017) both used these earlier panels, which are easier to source but are now becoming scarce. We stock assemblies for all generations and will confirm availability when you contact us.',
  },
  {
    question: 'My MacBook Air M2 screen has a crack — can you repair it?',
    answer:
      'Yes. The MacBook Air M2 (A2681) uses a 13.6-inch Liquid Retina display with a notch. Cracked display assemblies on this model require full panel replacement — because the display is laminated, individual glass separation without specialist tools risks damaging the LCD beneath. In our Hyde Park workshop we replace the complete display assembly, which includes the LCD, bonded glass, and backlight sheets. The notch camera and microphone are integrated into the display housing and are retained or replaced as part of the assembly. Turnaround is typically 24 to 48 hours.',
  },
  {
    question: 'Can you repair MacBook Air screen flickering and lines?',
    answer:
      'Yes, in most cases. Flickering on a MacBook Air is most commonly caused by one of three things: a failing display flex cable at the hinge, a fault in the backlight driver circuit on the logic board, or, on older Intel models, a GPU-related issue. Horizontal or vertical lines usually point to a damaged LCD panel, a partially failed backlight, or a loose display connector. We diagnose the root cause before ordering any parts — there is no point replacing a display assembly if the fault is actually a repairable flex cable. Assessment from R599.',
  },
  {
    question: 'How long does MacBook Air screen replacement take?',
    answer:
      'Most MacBook Air screen replacements are completed within 24 to 48 hours. We carry display assemblies for the most common models — M1, M2, M3, and the Intel 13-inch Retina — in stock at our Hyde Park workshop. For older or less common configurations such as the 11-inch Air or the 2017 non-Touch Bar 13-inch, we confirm part availability at the time of booking. We always call you before proceeding, so there are no surprises.',
  },
  {
    question: 'My MacBook Air screen is black but the Mac still boots — what is wrong?',
    answer:
      'A black screen that boots (you can hear the startup chime or see the caps lock LED respond) is a different fault to a cracked panel. The most likely cause is backlight failure — the display is functioning but the backlight LED strip or its driver circuit is not powering on. You can test this by shining a torch at the screen at an angle; if you can faintly see your desktop, the backlight is the fault. We repair backlight circuits at the component level where possible, which is significantly cheaper than a full display replacement. If the backlight circuit is on the logic board, this overlaps with a logic board repair.',
  },
  {
    question: 'Does MacBook Air screen replacement affect True Tone?',
    answer:
      'True Tone on the MacBook Air M1, M2, and M3 uses ambient light sensors built into the display housing, not the logic board. When we replace the display assembly, we use an OEM-equivalent assembly that retains the True Tone sensor. In our experience, True Tone continues to function normally after a display replacement on all M-series MacBook Air models. We always test True Tone as part of our post-repair quality check.',
  },
  {
    question: 'What causes backlight failure on a MacBook Air?',
    answer:
      'Backlight failure on a MacBook Air is most commonly caused by a blown backlight fuse (F9700 or equivalent on the logic board), a failed backlight driver IC, or a damaged LVDS or eDP flex cable between the board and the display. On older 2012–2017 MacBook Air models, the LED backlight sheets themselves can degrade over time, causing uneven brightness or dimming from one edge. On M-series models the failure mode is more commonly the driver circuit on the board than the panel itself. We diagnose the exact component before quoting.',
  },
  {
    question: 'Can the MacBook Air display hinge flex cable cause screen problems?',
    answer:
      'Yes, and this is the most common screen issue we see on 2013–2019 MacBook Air models specifically. The display data cable routes through the hinge and flexes thousands of times over the life of the machine. On the older non-Retina 13-inch and 11-inch MacBook Air, stress fractures in this cable cause flickering, lines, or intermittent black screens that are triggered by the angle you hold the lid. Replacing the display flex cable resolves this without needing a new display panel. The repair is faster and more affordable than a full display replacement.',
  },
  {
    question: 'Does the No Fix No Fee policy apply to MacBook Air screen repairs?',
    answer:
      'Yes. If we assess your MacBook Air and cannot repair the screen fault, or if the repair cost is not economical for your situation, an assessment fee of R599 applies and your machine is returned exactly as received. We will never proceed with a repair without your written approval on a fixed-price quote. There are no hidden charges. Up-to-3 year warranty applies to all completed screen repairs.',
  },
  {
    question: 'Do you collect MacBook Airs for screen repair from across Johannesburg?',
    answer:
      'Yes. We offer same-day or next-day collection from Sandton, Rosebank, Fourways, Bryanston, Midrand, Randburg, Parkhurst, Morningside, and surrounding Johannesburg suburbs. During load shedding we plan collections around your schedule — let us know your stage and area when you contact us and we will arrange accordingly. Call or WhatsApp 064 529 5863.',
  },
];

const screenFaults = [
  {
    title: 'Cracked Liquid Retina Panel',
    icon: AlertTriangle,
    severity: 'high',
    desc: 'The M1, M2, and M3 MacBook Air use laminated Liquid Retina IPS panels — the glass and LCD are bonded as a single unit. A crack in the outer glass will typically crack the LCD beneath it simultaneously. We replace the full laminated display assembly, restoring factory brightness and colour accuracy.',
  },
  {
    title: 'Backlight Failure',
    icon: Monitor,
    severity: 'medium',
    desc: 'Display shows a very faint image when you shine a torch at the screen, but no backlight illumination. This is a circuit-level fault — the backlight fuse, driver IC, or LED strip has failed. We repair at component level where possible, which is significantly more affordable than a full panel replacement.',
  },
  {
    title: 'Display Flex Cable Fault',
    icon: Zap,
    severity: 'medium',
    desc: 'The most common screen fault on 2013–2019 MacBook Air models. The eDP cable routes through the hinge and stress fractures over time. Symptoms include flickering when you move the lid, horizontal lines, or intermittent black screen. Cable replacement resolves this without touching the display panel.',
  },
  {
    title: 'Dead or Stuck Pixels',
    icon: Eye,
    severity: 'low',
    desc: 'Single or clustered pixels that remain a fixed colour regardless of what is displayed. A small cluster in the corner may be acceptable, but spreading dead pixel zones or a central cluster warrant panel replacement. We inspect under calibrated lighting to determine the extent before quoting.',
  },
  {
    title: 'Flickering or Strobing',
    icon: Monitor,
    severity: 'medium',
    desc: 'Rapid flickering at certain brightness levels is sometimes caused by PWM (pulse width modulation) sensitivity on the LCD controller, but more commonly indicates a failing backlight driver or a loose display connector. We rule out software causes first, then diagnose hardware.',
  },
  {
    title: 'Yellow Tint or Discolouration',
    icon: Eye,
    severity: 'low',
    desc: 'A warm yellow tint around the edges of the display can indicate adhesive degradation inside the laminated panel, or moisture ingress behind the LCD. This is more common on older MacBook Air models (2017–2019). Display replacement resolves this permanently.',
  },
];

const severityColours: Record<string, string> = {
  high: 'border-[rgba(245,87,54,0.25)] bg-[rgba(245,87,54,0.04)]',
  medium: 'border-[rgba(245,166,35,0.25)] bg-[rgba(245,166,35,0.04)]',
  low: 'border-[rgba(15,234,122,0.2)] bg-[rgba(15,234,122,0.04)]',
};

const severityBadgeColours: Record<string, string> = {
  high: 'text-[#F55736] bg-[rgba(245,87,54,0.1)]',
  medium: 'text-[#F5A623] bg-[rgba(245,166,35,0.1)]',
  low: 'text-[#0FEA7A] bg-[rgba(15,234,122,0.1)]',
};

const severityLabels: Record<string, string> = {
  high: 'Panel Replacement',
  medium: 'Component Repair',
  low: 'Repairable',
};

const modelPanelGuide = [
  {
    model: 'MacBook Air M3 (2024)',
    modelCode: 'A3113',
    panel: '13.6″ Liquid Retina IPS, 2560×1664, 224 PPI, True Tone, P3',
    repairNote: 'Laminated assembly — full panel replacement. NotchFlex camera retained in housing.',
  },
  {
    model: 'MacBook Air M2 (2022)',
    modelCode: 'A2681',
    panel: '13.6″ Liquid Retina IPS, 2560×1664, 224 PPI, True Tone, P3, notch',
    repairNote: 'Laminated assembly — full panel replacement. Notch camera integrated into display frame.',
  },
  {
    model: 'MacBook Air M1 (2020)',
    modelCode: 'A2337',
    panel: '13.3″ Retina IPS, 2560×1600, 227 PPI, True Tone, P3',
    repairNote: 'Laminated Retina assembly. eDP flex cable runs through the left hinge — inspect for stress fractures.',
  },
  {
    model: 'MacBook Air Intel 13″ Retina (2018–2020)',
    modelCode: 'A1932 / A2179',
    panel: '13.3″ Retina IPS, 2560×1600, 227 PPI, True Tone (2019+)',
    repairNote: 'Known backlight fuse issue (F9700) on 2018 model. Flex cable fault common on 2019–2020.',
  },
  {
    model: 'MacBook Air 13″ non-Retina (2012–2017)',
    modelCode: 'A1466',
    panel: '13.3″ TN/IPS LCD, 1440×900, 128 PPI — non-Retina',
    repairNote: 'Flex cable fault is the most frequent repair. Panel replacement straightforward. Parts becoming scarce.',
  },
  {
    model: 'MacBook Air 11″ (2011–2015)',
    modelCode: 'A1370 / A1465',
    panel: '11.6″ TN/IPS LCD, 1366×768, 135 PPI — non-Retina',
    repairNote: 'Smaller form factor with very little clearance at hinge. Flex cable stress fracture common. Panel still sourceable.',
  },
];

const faqSchema = buildFaqSchema(faqs);
const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'MacBook Air Screen Repair Johannesburg',
  description:
    'Professional MacBook Air screen repair in Johannesburg. Cracked Liquid Retina panels, backlight failure, display flex cable faults, dead pixels. All models from 11-inch non-Retina to M3. Assessment from R599. Up-to-3 year warranty.',
  provider: LOCAL_BUSINESS_PROVIDER,
  areaServed: { '@type': 'City', name: 'Johannesburg' },
  serviceType: 'Screen Repair',
  offers: {
    '@type': 'Offer',
    priceCurrency: 'ZAR',
    price: '2499',
    priceSpecification: {
      '@type': 'PriceSpecification',
      minPrice: '2499',
      priceCurrency: 'ZAR',
    },
  },
};
const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbSchemaItems);

export default function ScreenRepairMacBookAirPage() {
  const whatsappUrl = buildWhatsAppUrl('SCR-AIR-HERO', 'screen-repair');

  return (
    <>
      <SchemaOrg schema={faqSchema} />
      <SchemaOrg schema={serviceSchema} />
      <SchemaOrg schema={breadcrumbSchema} />

      {/* ─── Hero ───────────────────────────────────────────────────────────── */}
      <section className="hero-gradient grid-overlay pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={breadcrumbItems} />
          <div className="mt-8 max-w-4xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#E8F4F1] leading-tight mb-6">
              MacBook Air Screen Repair
              <br />
              <span className="text-[#0FEA7A]">Johannesburg</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-4 max-w-3xl leading-relaxed">
              From a cracked Liquid Retina panel on an M2 Air to a stressed flex cable on a 2015 non-Retina 11-inch —
              we repair every MacBook Air display at our Hyde Park workshop. Assessment from R599. Apple Store charges
              R4,500 to R8,000 for the same repair.
            </p>
            <div className="flex items-center gap-2 text-[#7A9E98] text-sm mb-8">
              <MapPin className="w-4 h-4 text-[#0FEA7A]" />
              <span>
                1 Hyde Lane, Hyde Park, Office E2004, JHB 2196 | Screen repair from R2,499 | Collection across
                Johannesburg
              </span>
            </div>
            <div className="flex flex-wrap gap-3 mb-8">
              {[
                { icon: Shield, label: 'No Fix No Fee' },
                { icon: Monitor, label: 'All Air Models' },
                { icon: CheckCircle, label: 'Up to 3 Year Warranty' },
                { icon: Zap, label: 'Assessment from R599' },
                { icon: ArrowRight, label: '24–48 hr Turnaround' },
              ].map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-2 bg-[rgba(15,234,122,0.08)] border border-[rgba(15,234,122,0.15)] px-3 py-2 rounded-full"
                >
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
                WhatsApp for a Quote
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
                All Screen Repairs <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
            <div className="flex flex-wrap gap-6 mt-8 pt-6 border-t border-[rgba(255,255,255,0.06)]">
              {[
                { value: '800+', label: 'MacBook Screens Replaced' },
                { value: SITE.yearsExperience + ' Years', label: 'In Business Since 2009' },
                { value: SITE.rating + '/5', label: SITE.reviewCount + ' Google Reviews' },
                { value: 'R2,499', label: 'Starting Price' },
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

      {/* ─── About MacBook Air Screens ────────────────────────────────────────── */}
      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4">
            MacBook Air Display Technology — What You Need to Know Before Repair
          </h2>
          <div className="space-y-4 text-[#7A9E98] leading-relaxed">
            <p>
              The MacBook Air has gone through more display technology transitions than any other Mac laptop. The
              original 2008 Air used a standard TN panel. By 2012 Apple had moved to IPS. The 2018 model introduced the
              Retina display. And from 2022 onwards, the M2 and M3 Air use a Liquid Retina panel with a distinctive
              notch, rounded corners, and P3 wide colour. Each generation requires a different repair approach.
            </p>
            <p>
              The most critical difference is lamination. The M1, M2, and M3 MacBook Air all use fully laminated
              displays — the glass and the LCD are bonded together with optical adhesive and cannot be separated without
              specialist equipment. If you crack the outer glass, you have almost certainly damaged the LCD at the same
              time. This means full display assembly replacement is required, not just a glass swap.
            </p>
            <p>
              The 2012–2017 non-Retina 13-inch and all 11-inch MacBook Air models used a non-laminated construction
              with an air gap between the glass and the LCD. These are structurally simpler to repair but parts are
              becoming increasingly difficult to source as they are now 7–14 years old. In our Hyde Park workshop we
              maintain a stock of panels for these older models, though availability changes and we always confirm
              before accepting a booking.
            </p>
            <p>
              The most common Air screen issue we see — across all generations — is the display flex cable. This cable
              runs from the logic board, through the left hinge, and up into the display housing. It flexes every time
              you open and close the lid. On older models, stress fractures in this cable are responsible for roughly
              60% of the screen faults we diagnose. The fix is a cable replacement, not a display replacement — and it
              costs significantly less.
            </p>
            <p>
              For M-series MacBook Air owners with a cracked display: the repair is straightforward but time-sensitive.
              A crack that sits at the edge of the screen can allow moisture to enter through the laminated assembly,
              progressively degrading the LCD beneath. We have repaired MacBook Air M2 units where a small corner crack
              was left for two weeks and had spread moisture across 40% of the panel. Act sooner rather than later.
            </p>
          </div>
        </div>
      </section>

      {/* ─── Screen Fault Types ───────────────────────────────────────────────── */}
      <section className="py-10 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4">
            MacBook Air Screen Faults We Repair
          </h2>
          <p className="text-[#7A9E98] mb-10 max-w-3xl leading-relaxed">
            We diagnose the exact fault before ordering any parts. Not every screen problem needs a full display
            replacement — and we will always tell you if a cheaper fix is possible.
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {screenFaults.map((item) => (
              <div key={item.title} className={`rounded-2xl border p-6 ${severityColours[item.severity]}`}>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <item.icon className="w-5 h-5 text-[#0FEA7A] flex-shrink-0" />
                    <h3 className="text-[#E8F4F1] font-bold text-lg">{item.title}</h3>
                  </div>
                  <span
                    className={`flex-shrink-0 text-xs font-semibold px-2.5 py-1 rounded-full ${severityBadgeColours[item.severity]}`}
                  >
                    {severityLabels[item.severity]}
                  </span>
                </div>
                <p className="text-[#7A9E98] text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 p-5 rounded-xl border border-[rgba(15,234,122,0.15)] bg-[rgba(15,234,122,0.04)] flex items-start gap-4">
            <Shield className="w-5 h-5 text-[#0FEA7A] flex-shrink-0 mt-0.5" />
            <p className="text-[#7A9E98] text-sm leading-relaxed">
              All repairs are quoted in writing before any work begins. No Fix No Fee on every case — assessment fee of
              R599 applies if we cannot repair your MacBook Air screen. Up-to-3 year warranty on all completed repairs.
            </p>
          </div>
        </div>
      </section>

      {/* ─── Model Panel Guide ───────────────────────────────────────────────── */}
      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4">
            MacBook Air Display Panels — Model by Model
          </h2>
          <p className="text-[#7A9E98] mb-8 max-w-3xl leading-relaxed">
            Every MacBook Air generation uses a different display assembly. Knowing your model code (printed on the base
            of your machine or under the battery icon in About This Mac) helps us confirm parts availability before you
            bring the machine in.
          </p>
          <div className="overflow-x-auto rounded-2xl border border-[rgba(15,234,122,0.1)]">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[rgba(15,234,122,0.06)] border-b border-[rgba(15,234,122,0.1)]">
                  <th className="text-left text-[#0FEA7A] font-semibold px-5 py-4">Model</th>
                  <th className="text-left text-[#0FEA7A] font-semibold px-5 py-4 hidden sm:table-cell">Code</th>
                  <th className="text-left text-[#0FEA7A] font-semibold px-5 py-4">Panel</th>
                  <th className="text-left text-[#0FEA7A] font-semibold px-5 py-4 hidden lg:table-cell">Repair Note</th>
                </tr>
              </thead>
              <tbody>
                {modelPanelGuide.map((row, i) => (
                  <tr
                    key={row.model}
                    className={`border-b border-[rgba(255,255,255,0.04)] ${i % 2 === 0 ? 'bg-[rgba(15,234,122,0.02)]' : ''}`}
                  >
                    <td className="px-5 py-4 text-[#E8F4F1] font-medium">{row.model}</td>
                    <td className="px-5 py-4 text-[#7A9E98] hidden sm:table-cell font-mono text-xs">{row.modelCode}</td>
                    <td className="px-5 py-4 text-[#7A9E98]">{row.panel}</td>
                    <td className="px-5 py-4 text-[#7A9E98] hidden lg:table-cell">{row.repairNote}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-[#7A9E98] text-xs mt-4 leading-relaxed">
            Panel availability varies. Contact us to confirm stock for your specific model before booking.
            Technical display specifications sourced from{' '}
            <a
              href="https://support.apple.com/en-gb/111893"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0FEA7A] hover:underline"
            >
              Apple&apos;s MacBook Air tech specs page
            </a>
            .
          </p>
        </div>
      </section>

      {/* ─── Apple vs ZA Support ─────────────────────────────────────────────── */}
      <section className="py-10 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-4">
            Apple Store vs ZA Support: MacBook Air Screen Repair
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            <div className="glass-card p-6 border border-red-500/20">
              <h3 className="text-red-400 font-bold mb-3">Apple Store / iStore</h3>
              <ul className="text-[#7A9E98] text-sm space-y-2">
                <li>R4,500 to R8,000 for display assembly replacement</li>
                <li>Accidental damage excluded from standard warranty</li>
                <li>Depot repair — 5 to 10 business day turnaround</li>
                <li>No component-level diagnosis — full assembly swapped</li>
                <li>Data at risk if machine needs board access</li>
              </ul>
            </div>
            <div className="glass-card p-6 border border-[rgba(15,234,122,0.3)]">
              <h3 className="text-[#0FEA7A] font-bold mb-3">ZA Support</h3>
              <ul className="text-[#7A9E98] text-sm space-y-2">
                <li>Screen repair from R2,499 — all Air models</li>
                <li>Component-level diagnosis — flex cable vs panel vs circuit</li>
                <li>24 to 48 hour turnaround at Hyde Park workshop</li>
                <li>No Fix No Fee | written quote before work begins</li>
                <li>Up-to-3 year warranty on completed repairs</li>
              </ul>
            </div>
          </div>
          <p className="text-[#7A9E98] text-sm leading-relaxed">
            The Apple Store approach is to replace the entire display assembly regardless of the root cause. If your
            screen fault is actually a R800 flex cable, they will still charge you for a full R6,000 display
            replacement. At ZA Support we diagnose first — you only pay for what is actually broken.
          </p>
        </div>
      </section>

      {/* ─── Pricing ────────────────────────────────────────────────────────── */}
      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-4">MacBook Air Screen Repair Pricing</h2>
          <p className="text-[#7A9E98] mb-8 leading-relaxed">
            All prices below are starting prices. The exact cost is confirmed in a written quote after our R599
            assessment. Prices include labour, parts, and our up-to-3 year warranty.
          </p>
          <div className="space-y-4">
            {[
              {
                item: 'MacBook Air M1 / M2 / M3 Display Assembly',
                from: 'R3,499',
                note: 'Laminated Liquid Retina — full assembly replacement',
              },
              {
                item: 'MacBook Air Intel 13″ Retina (2018–2020)',
                from: 'R2,999',
                note: 'Includes True Tone sensor retention',
              },
              {
                item: 'MacBook Air Intel 13″ non-Retina (2012–2017)',
                from: 'R2,499',
                note: 'TN/IPS panel — subject to parts availability',
              },
              {
                item: 'MacBook Air 11″ (2011–2015)',
                from: 'R2,499',
                note: 'Parts sourced on request — confirm before booking',
              },
              {
                item: 'Display Flex Cable Replacement',
                from: 'R1,199',
                note: 'For flickering / lines caused by hinge cable stress',
              },
              {
                item: 'Backlight Circuit Repair',
                from: 'R1,499',
                note: 'Component-level — fuse, driver IC, or backlight strip',
              },
              {
                item: 'Screen Assessment',
                from: 'R599',
                note: 'Credited toward repair cost if you proceed',
              },
            ].map((row) => (
              <div
                key={row.item}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-5 rounded-xl border border-[rgba(15,234,122,0.1)] bg-[rgba(15,234,122,0.02)]"
              >
                <div>
                  <p className="text-[#E8F4F1] font-semibold">{row.item}</p>
                  <p className="text-[#7A9E98] text-sm">{row.note}</p>
                </div>
                <p className="text-[#0FEA7A] font-extrabold text-lg flex-shrink-0">From {row.from}</p>
              </div>
            ))}
          </div>
          <p className="text-[#7A9E98] text-xs mt-6 leading-relaxed">
            All prices in ZAR. Assessment fee of R599 applies if no repair is undertaken. Up-to-3 year parts and labour
            warranty on all completed screen repairs.
          </p>
          <PricingNote variant="inline" />
        </div>
      </section>

      {/* ─── Our Repair Process ──────────────────────────────────────────────── */}
      <section className="py-10 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-10">
            How We Repair MacBook Air Screens
          </h2>
          <div className="space-y-6">
            {[
              {
                step: '1',
                title: 'Assessment at Hyde Park Workshop',
                detail:
                  'We inspect the display under calibrated lighting, run a software display diagnostic, and check the backlight circuit and flex cable before touching any hardware. This tells us whether you need a new panel or a cheaper cable repair. Assessment from R599, credited toward the repair.',
              },
              {
                step: '2',
                title: 'Written Quote — Fixed Price',
                detail:
                  'You receive a written quote before we do anything. The price is fixed — no labour surprises, no parts markups revealed after the fact. If the quote is not acceptable to you, the machine is returned as received and you pay only the assessment fee.',
              },
              {
                step: '3',
                title: 'Panel or Component Replacement',
                detail:
                  'For cracked Liquid Retina panels (M1/M2/M3), we replace the full laminated assembly with an OEM-equivalent unit. For flex cable faults, we replace the eDP cable and retest under multiple lid angles. For backlight failures, we identify the faulty component — fuse, driver IC, or LED strip — and replace at component level.',
              },
              {
                step: '4',
                title: 'Calibration and Quality Check',
                detail:
                  'Post-repair, we run a full display test: white, black, red, green, and blue screens to detect any dead pixels; brightness uniformity test; True Tone verification; and a flex cable stress test (50 open/close cycles on affected models). Only when every test passes do we declare the repair complete.',
              },
              {
                step: '5',
                title: 'Return with Warranty',
                detail:
                  'Your MacBook Air is returned with a written warranty covering the screen repair for up to 3 years. We retain your old display assembly for 30 days in case of any dispute or query.',
              },
            ].map((item) => (
              <div
                key={item.step}
                className="flex gap-5 p-6 rounded-2xl border border-[rgba(15,234,122,0.15)] bg-[rgba(15,234,122,0.03)]"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[rgba(15,234,122,0.12)] text-[#0FEA7A] flex items-center justify-center text-sm font-extrabold">
                  {item.step}
                </div>
                <div>
                  <h3 className="text-[#E8F4F1] font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-[#7A9E98] leading-relaxed text-sm">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Google Reviews ──────────────────────────────────────────────────── */}
      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-8 text-center">
            What Johannesburg MacBook Owners Say
          </h2>
          <GoogleReviews />
        </div>
      </section>

      {/* ─── FAQs ────────────────────────────────────────────────────────────── */}
      <section className="py-10 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQAccordion items={faqs} title="MacBook Air Screen Repair — Common Questions" />
        </div>
      </section>

      {/* ─── Related Services ────────────────────────────────────────────────── */}
      <section className="py-8 sm:py-16 bg-[#111C1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#E8F4F1] mb-6">Related Repairs</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              { label: 'All Screen Repairs', href: '/screen-repair' },
              { label: 'Screen Repair Sandton', href: '/screen-repair/sandton' },
              { label: 'MacBook Pro Screen Repair', href: '/screen-repair/macbook-pro' },
              { label: 'Logic Board Repair', href: '/logic-board-repair' },
              { label: 'MacBook Air Logic Board', href: '/logic-board-repair/macbook-air-m1' },
              { label: 'Liquid Damage Repair', href: '/liquid-damage' },
              { label: 'MacBook Air Liquid Damage', href: '/liquid-damage/macbook-air-m1' },
              { label: 'Contact Us', href: '/contact' },
            ].map((link) => (
              <Link key={link.href} href={link.href} className="glass-card p-4 text-center group">
                <span className="text-[#E8F4F1] text-sm font-semibold group-hover:text-[#0FEA7A] transition-colors">
                  {link.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Bottom CTA ──────────────────────────────────────────────────────── */}
      <section className="py-8 sm:py-16 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-[rgba(39,80,77,0.3)] border border-[rgba(15,234,122,0.2)] rounded-3xl p-10">
            <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3">
              MacBook Air Screen Problem? We Can Fix It.
            </h2>
            <p className="text-[#7A9E98] mb-6 max-w-xl mx-auto leading-relaxed">
              From a cracked Liquid Retina on a brand-new M3 to a flickering flex cable on a 2015 11-inch — we have
              repaired them all at our Hyde Park workshop. WhatsApp us a photo of the fault and we will give you an
              indicative quote within the hour.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 hover:shadow-[0_0_32px_rgba(15,234,122,0.4)] transition-all"
              >
                WhatsApp for a Quote
              </a>
              <a
                href={`tel:${CONTACT.phoneTel}`}
                className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all"
              >
                <Phone className="w-5 h-5" /> Call {CONTACT.phone}
              </a>
            </div>
            <p className="text-[#7A9E98] text-xs mt-6">
              1 Hyde Lane, Hyde Park, Office E2004, JHB 2196 | Screen repair from R2,499 | Up-to-3 year warranty |
              Collection across Johannesburg
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
