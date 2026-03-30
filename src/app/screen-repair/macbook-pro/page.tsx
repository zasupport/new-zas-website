import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, ArrowRight, Monitor, AlertTriangle, CheckCircle, Shield, Zap, Eye, MapPin, Cpu } from 'lucide-react';
import SchemaOrg from '@/components/seo/SchemaOrg';
import { buildFaqSchema, buildBreadcrumbSchema, LOCAL_BUSINESS_PROVIDER } from '@/lib/schema';
import GoogleReviews from '@/components/ui/GoogleReviews';
import FAQAccordion from '@/components/ui/FAQ';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { CONTACT, SITE, buildWhatsAppUrl } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'MacBook Pro Screen Repair Johannesburg [2026] | From R3,499 | ZA Support',
  description:
    'MacBook Pro screen repair in Johannesburg from R3,499. Retina, Touch Bar, Liquid Retina XDR. Flexgate fix, backlight IC repair. No Fix No Fee. Hyde Park workshop.',
  alternates: { canonical: 'https://zasupport.com/screen-repair/macbook-pro' },
  keywords: [
    'MacBook Pro screen repair Johannesburg',
    'MacBook Pro display replacement Johannesburg',
    'Retina display repair MacBook Pro',
    'Liquid Retina XDR repair Johannesburg',
    'MacBook Pro flickering screen repair',
    'MacBook Pro backlight repair Johannesburg',
    'flexgate MacBook Pro repair',
    'MacBook Pro screen repair Hyde Park',
    'MacBook Pro 14 inch screen repair',
    'MacBook Pro 16 inch screen repair',
  ],
};

const breadcrumbItems = [
  { label: 'Screen Repair', href: '/screen-repair' },
  { label: 'MacBook Pro' },
];

const breadcrumbSchemaItems = [
  { name: 'Home', url: 'https://zasupport.com' },
  { name: 'Screen Repair', url: 'https://zasupport.com/screen-repair' },
  { name: 'MacBook Pro', url: 'https://zasupport.com/screen-repair/macbook-pro' },
];

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'MacBook Pro Screen Repair Johannesburg',
  description:
    'Professional MacBook Pro screen repair in Johannesburg. Retina, Touch Bar, Liquid Retina XDR panels. Flexgate cable repair, LP8550 backlight IC, T-Con board. Assessment from R599. Up-to-3 year warranty.',
  provider: LOCAL_BUSINESS_PROVIDER,
  areaServed: { '@type': 'City', name: 'Johannesburg' },
  serviceType: 'Screen Repair',
  offers: {
    '@type': 'AggregateOffer',
    lowPrice: '3499',
    highPrice: '12000',
    priceCurrency: 'ZAR',
    offerCount: '12',
  },
};

const pricingRows = [
  { model: 'MacBook Pro 13″ (Retina 2012–2015)', panel: 'IPS LCD Retina', from: 'R3,499', turnaround: '24–48 hrs' },
  { model: 'MacBook Pro 13″ (Touch Bar 2016–2020)', panel: 'IPS LCD Retina', from: 'R3,999', turnaround: '24–48 hrs' },
  { model: 'MacBook Pro 13″ (M1/M2 2020–2022)', panel: 'IPS LCD Retina', from: 'R3,999', turnaround: '24–48 hrs' },
  { model: 'MacBook Pro 14″ (M1 Pro/Max 2021)', panel: 'Liquid Retina XDR (mini-LED)', from: 'R4,999', turnaround: '48–72 hrs' },
  { model: 'MacBook Pro 14″ (M2/M3/M4 Pro/Max)', panel: 'Liquid Retina XDR (mini-LED)', from: 'R5,499', turnaround: '48–72 hrs' },
  { model: 'MacBook Pro 15″ (Intel 2013–2019)', panel: 'IPS LCD Retina', from: 'R4,499', turnaround: '24–72 hrs' },
  { model: 'MacBook Pro 16″ (M1 Pro/Max 2021)', panel: 'Liquid Retina XDR (mini-LED)', from: 'R4,999', turnaround: '48–72 hrs' },
  { model: 'MacBook Pro 16″ (M2/M3/M4 Pro/Max)', panel: 'Liquid Retina XDR (mini-LED)', from: 'R5,499', turnaround: '48–72 hrs' },
];

const faultTypes = [
  {
    title: 'Flexgate — Display Cable Failure',
    icon: AlertTriangle,
    desc: 'The most notorious MacBook Pro screen fault. Apple used an extremely short, thin flex cable on 2016 and 2017 13-inch and 15-inch models. Every time you open and close the lid, the cable bends at a stress point inside the hinge. Over 500–2,000 cycles, the cable develops micro-fractures. The symptom is unmistakable: a bright horizontal band appears at the bottom of the screen when the lid is barely open, and the display goes dark as you open it further. We have repaired hundreds of these in our Hyde Park workshop. Replacement cable restores full function permanently.',
    severity: 'high',
  },
  {
    title: 'Backlight Failure — LP8550 Driver IC',
    icon: Zap,
    desc: 'Screen appears totally black but the Mac has booted — you can faintly see the desktop by shining a torch at the display. This is backlight failure, not a dead panel. On Intel MacBook Pro models, the LP8550 backlight driver IC sits on the logic board. Load shedding surge events are a leading cause of LP8550 failure in South Africa — the chip is particularly sensitive to voltage spikes on the power rail when power returns after an outage. We replace the LP8550 at the component level, which is significantly cheaper than a full logic board replacement.',
    severity: 'high',
  },
  {
    title: 'T-Con Board Fault — Lines Across the Display',
    icon: Monitor,
    desc: 'Horizontal or vertical coloured lines running across the screen indicate a failing T-Con (timing controller) board. The T-Con converts the raw display data from the GPU into the row-and-column signal pattern that drives the LCD pixels. On MacBook Pros from 2012 to 2019, the T-Con is embedded in the display assembly — a fault here requires display replacement. On newer M-series MacBook Pros, we diagnose whether the fault is in the panel or the display cable before recommending a fix.',
    severity: 'medium',
  },
  {
    title: 'Liquid Retina XDR Delamination',
    icon: Eye,
    desc: 'The 14-inch and 16-inch MacBook Pro (2021 and later) use a Liquid Retina XDR display with a mini-LED backlight array behind an IPS panel. When liquid reaches the display assembly, the bonding layer between the glass and LCD can delaminate, creating large grey or rainbow patches that spread from the edges inward. This is distinct from a cracked screen — the glass is intact but the panel is failing from within. Full display assembly replacement is required. Apple charges R15,000 or more; we provide a written quote before any work begins.',
    severity: 'medium',
  },
  {
    title: 'True Tone Sensor Fault',
    icon: Monitor,
    desc: 'MacBook Pro models from 2018 onwards include a True Tone sensor embedded in the display bezel. After an incorrect screen replacement that does not preserve the original sensor data, True Tone becomes permanently disabled. In our Hyde Park workshop, we always transfer the True Tone calibration data during display replacement, ensuring your MacBook Pro retains its adaptive colour capability after the repair.',
    severity: 'low',
  },
  {
    title: 'Cracked Panel — Physical Impact',
    icon: AlertTriangle,
    desc: 'A single point of impact is enough to shatter a Retina display. Unlike the older non-Retina MacBook Pros, Retina panels are bonded to the housing — there is no separate glass to replace. The entire display assembly (panel, backlight, bezel, hinge covers) must be replaced as a unit. We source genuine-equivalent display assemblies for all MacBook Pro generations and test every replacement across five test patterns before returning the machine.',
    severity: 'high',
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
  high: 'Common',
  medium: 'Moderate',
  low: 'Minor',
};

const faqs = [
  {
    question: 'How much does MacBook Pro screen repair cost in Johannesburg?',
    answer:
      'MacBook Pro screen repair starts from R3,499 for the 13-inch Retina models and from R4,999 for the 14-inch or 16-inch models with Liquid Retina XDR displays. The final price depends on your specific model number (A1xxx/A2xxx), the panel generation, and whether additional components such as the display cable require replacement. Apple Store or iStore typically charges R6,000 to R15,000 for a display assembly, and often higher for M-series models. We provide a written fixed-price quote before starting any work, and the price we quote is the price you pay.',
  },
  {
    question: 'What is flexgate and can you fix it?',
    answer:
      'Flexgate is a display cable fault specific to MacBook Pro models from 2016 and 2017. Apple used an unusually short, thin flex cable routed through the hinge. After hundreds of open-and-close cycles, the cable develops micro-fractures near the display backlight connector. The characteristic symptom is a bright horizontal bar at the bottom of the screen when the lid is opened to a low angle, with the display going completely dark at wider angles. We have repaired this fault on hundreds of MacBook Pros in our Hyde Park workshop. Replacement of the display cable resolves the issue permanently. Assessment from R599.',
  },
  {
    question: 'My MacBook Pro screen has horizontal lines — what causes this?',
    answer:
      'Horizontal lines across a MacBook Pro display are typically caused by one of three faults: a failing T-Con (timing controller) board within the display assembly, a damaged display flex cable losing signal continuity, or a GPU fault on the logic board. The lines are caused by incorrect row-addressing signals reaching the LCD matrix. On Intel MacBook Pros, a failing GPU is a known issue on the 2011 15-inch model. We run a full diagnostic — including an external display test — to confirm the source before recommending a fix.',
  },
  {
    question: 'Does MacBook Pro screen replacement affect True Tone?',
    answer:
      'Only if it is done incorrectly. MacBook Pro models from 2018 onwards store True Tone calibration data in the display assembly. If you receive a replacement that does not include a calibrated sensor, True Tone shows as "Not Available" in Display Preferences permanently. At ZA Support, we always carry the True Tone calibration data across during display replacement — your MacBook Pro retains full True Tone capability after repair.',
  },
  {
    question: 'My MacBook Pro screen is black but it is still running. Is this a screen fault or a logic board fault?',
    answer:
      'Most likely a screen fault — specifically backlight failure. Hold a torch up to the display at an angle. If you can faintly see your desktop, the MacBook Pro is running normally but the backlight has failed. On Intel MacBook Pros, this is typically the LP8550 backlight driver IC on the logic board, and we can repair this at component level without replacing the display or the logic board. If you cannot see anything under torchlight, the fault may be in the display panel, the display cable, or the GPU — we diagnose this at assessment.',
  },
  {
    question: 'Why did my MacBook Pro backlight fail after load shedding?',
    answer:
      'Load shedding is a major cause of backlight failure in South Africa. When Eskom power returns after an outage, the voltage can surge momentarily before stabilising. The LP8550 backlight driver IC — used on Intel MacBook Pro logic boards — is particularly sensitive to voltage spikes on the 12V backlight power rail. A single surge event can blow the backlight fuse or destroy the LP8550 itself. We see this pattern regularly in our workshop, particularly after prolonged load shedding schedules. The repair is component-level and significantly cheaper than a logic board replacement.',
  },
  {
    question: 'Can you repair a cracked MacBook Pro Retina screen without replacing the whole lid?',
    answer:
      'For Retina and Liquid Retina XDR MacBook Pro models (2012 and later), the LCD panel is bonded to the display housing and cannot be separated in a standard workshop environment. The display assembly — panel, backlight, bezel, and hinge covers — must be replaced as a single unit. We source genuine-equivalent display assemblies for all MacBook Pro generations. The lid shell (outer top case) and the hinges are retained from your original machine, keeping the repair cost lower than a full lid replacement.',
  },
  {
    question: 'How long does MacBook Pro screen repair take?',
    answer:
      'MacBook Pro 13-inch screen repairs are typically completed within 24 to 48 hours once the part is confirmed available. MacBook Pro 14-inch and 16-inch models with Liquid Retina XDR displays take 48 to 72 hours — the mini-LED assembly requires more careful installation and a longer post-repair burn-in test. We will give you a specific turnaround time when you bring the machine in or contact us on WhatsApp. For clients in Sandton, Rosebank, Bryanston, and surrounding suburbs, we also offer a collection and return service.',
  },
  {
    question: 'Is MacBook Pro screen repair covered by Apple warranty or AppleCare?',
    answer:
      'Accidental damage — cracks, impacts, and physical damage — is not covered by Apple\'s standard one-year warranty. AppleCare+ does cover accidental damage with an excess payment, but it is only available for a limited period after purchase and requires a valid plan. If your MacBook Pro is out of warranty or does not have AppleCare+, ZA Support repairs the display at a fraction of the Apple Store cost. Our up-to-3 year warranty on the repaired display is in many cases longer than the remaining AppleCare+ cover.',
  },
  {
    question: 'What is the difference between the Retina display and the Liquid Retina XDR display on MacBook Pro?',
    answer:
      'The original Retina display (used on MacBook Pro 13-inch through to the 2020 M1 model) is a standard IPS LCD panel with a conventional LED backlight array. The Liquid Retina XDR display (introduced on the 14-inch and 16-inch MacBook Pro in 2021) uses a mini-LED backlight with over 10,000 individual LEDs arranged in local dimming zones, delivering far higher peak brightness and contrast. The XDR panel is also thicker and heavier than the standard Retina assembly. Repairs to Liquid Retina XDR displays are more complex and cost more — the starting price for 14-inch and 16-inch models reflects this.',
  },
  {
    question: 'Do you repair MacBook Pro screens from older Intel models?',
    answer:
      'Yes. We repair screens across the full MacBook Pro range, including the 2012–2020 Intel models. The 15-inch MacBook Pro from 2011 is notable for its GPU fault that causes no-display symptoms — we diagnose and address the root cause rather than simply replacing the screen. For 2012–2015 Retina models, display assemblies are still available and the repair is straightforward. Contact us with your serial number for a model-specific quote.',
  },
];

const faqSchema = buildFaqSchema(faqs);
const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbSchemaItems);

export default function ScreenRepairMacBookProPage() {
  const whatsappUrl = buildWhatsAppUrl('SCR-PRO-HERO', 'screen-repair');

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
              MacBook Pro Screen Repair
              <br /><span className="text-[#0FEA7A]">Johannesburg</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-4 max-w-3xl leading-relaxed">
              From flexgate on 2016–2017 models to Liquid Retina XDR delamination on the latest 14-inch and 16-inch MacBook Pros — we have repaired thousands of MacBook Pro screens in our Hyde Park workshop. We diagnose the root cause before quoting, and every repair comes with our up-to-3 year warranty.
            </p>
            <div className="flex items-center gap-2 text-[#7A9E98] text-sm mb-8">
              <MapPin className="w-4 h-4 text-[#0FEA7A]" />
              <span>1 Hyde Lane, Hyde Park, Office E2004, JHB 2196 | MacBook Pro 13″ from R3,499 | 14″/16″ from R4,999</span>
            </div>
            <div className="flex flex-wrap gap-3 mb-8">
              {[
                { icon: Shield, label: 'No Fix No Fee' },
                { icon: Monitor, label: 'All MacBook Pro Models' },
                { icon: Cpu, label: 'Flexgate Specialist' },
                { icon: CheckCircle, label: 'Up to 3 Year Warranty' },
                { icon: Zap, label: 'Assessment from R599' },
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
                { value: '2,000+', label: 'MacBook Pro Screens Repaired' },
                { value: SITE.yearsExperience + ' Years', label: 'In Business Since 2009' },
                { value: SITE.rating + '/5', label: SITE.reviewCount + ' Google Reviews' },
                { value: 'Up to 3 Yrs', label: 'Repair Warranty' },
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

      {/* Pricing Table */}
      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4">MacBook Pro Screen Repair Pricing</h2>
          <p className="text-[#7A9E98] mb-8 max-w-3xl leading-relaxed">
            Prices below are starting prices including display assembly, labour, and our warranty. The Apple Store charges R6,000 to R15,000 for the same repair — and up to R20,000 for M3/M4 Pro and Max models. We provide a written fixed-price quote before any work begins.
          </p>
          <div className="overflow-x-auto rounded-2xl border border-[rgba(255,255,255,0.06)]">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[rgba(255,255,255,0.08)] bg-[rgba(15,234,122,0.06)]">
                  <th className="text-left text-[#E8F4F1] font-semibold px-5 py-4">Model</th>
                  <th className="text-left text-[#E8F4F1] font-semibold px-5 py-4">Panel Type</th>
                  <th className="text-left text-[#0FEA7A] font-semibold px-5 py-4">From</th>
                  <th className="text-left text-[#E8F4F1] font-semibold px-5 py-4">Turnaround</th>
                </tr>
              </thead>
              <tbody>
                {pricingRows.map((row, i) => (
                  <tr key={row.model} className={`border-b border-[rgba(255,255,255,0.04)] ${i % 2 === 0 ? 'bg-[#0A1A18]' : 'bg-[#111C1A]'}`}>
                    <td className="text-[#E8F4F1] px-5 py-4 font-medium">{row.model}</td>
                    <td className="text-[#7A9E98] px-5 py-4">{row.panel}</td>
                    <td className="text-[#0FEA7A] px-5 py-4 font-bold">{row.from}</td>
                    <td className="text-[#7A9E98] px-5 py-4">{row.turnaround}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-[#7A9E98] text-xs mt-4">
            All prices include parts, labour, and our up-to-3 year warranty. Assessment from R599 — applied toward the repair cost if you proceed. No Fix No Fee applies on all cases.
          </p>
        </div>
      </section>

      {/* Technical Expertise */}
      <section className="py-10 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4">What Makes MacBook Pro Screen Repair Different</h2>
          <div className="space-y-4 text-[#7A9E98] leading-relaxed">
            <p>
              MacBook Pro screen repair is among the most technically demanding repairs in the Apple ecosystem. Unlike Windows laptops where panels are often interchangeable, each MacBook Pro generation uses a proprietary display assembly with specific connector pinouts, backlight circuits, and — on models from 2018 onwards — True Tone calibration data bonded to the display at the factory.
            </p>
            <p>
              In our Hyde Park workshop, we have repaired every MacBook Pro generation from the original 2012 Retina 13-inch through to the current M4 Pro and M4 Max models. The 2016–2017 flexgate fault alone accounts for a significant proportion of the screen repairs we see — it is a design flaw Apple quietly addressed in 2019 by lengthening the flex cable, but the earlier machines are still in daily use across Johannesburg and continue to develop the fault.
            </p>
            <p>
              Load shedding has introduced a fault pattern that is specific to South Africa: LP8550 backlight driver IC failure caused by voltage surges when mains power restores after an outage. We see this weekly. The symptom is a completely black screen on a MacBook Pro that is otherwise running perfectly. This is a component-level repair on the logic board and does not require display replacement — a critical distinction that saves clients thousands of rands.
            </p>
            <p>
              The 2021 and later MacBook Pro 14-inch and 16-inch models introduce a new level of complexity. The Liquid Retina XDR display uses a mini-LED backlight with 10,000+ individual LEDs arranged in local dimming zones. The display connector is wider, the ZIF socket requires a different release tool, and the post-installation calibration process takes longer. We have invested in the tooling and training for these repairs specifically.
            </p>
            <p>
              For context on what independent shops can and cannot repair, the iFixit MacBook Pro repairability guides are a useful reference. What those guides do not capture is the component-level expertise required for LP8550 driver repair or True Tone data preservation — these are skills developed through volume, not documentation.
            </p>
          </div>
          <div className="mt-6">
            <a
              href="https://www.ifixit.com/Device/MacBook_Pro"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[#0FEA7A] text-sm font-semibold hover:underline"
            >
              iFixit MacBook Pro repair guides <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Common Faults */}
      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4">MacBook Pro Screen Fault Patterns We Repair</h2>
          <p className="text-[#7A9E98] mb-10 max-w-3xl leading-relaxed">
            We have documented the most common MacBook Pro display faults across every generation. Each fault below is a repairable condition — we diagnose the precise cause before recommending any part replacement.
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {faultTypes.map((fault) => (
              <div key={fault.title} className={`rounded-2xl border p-6 ${severityColours[fault.severity]}`}>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <fault.icon className="w-5 h-5 text-[#0FEA7A] flex-shrink-0" />
                    <h3 className="text-[#E8F4F1] font-bold text-lg">{fault.title}</h3>
                  </div>
                  <span className={`flex-shrink-0 text-xs font-semibold px-2.5 py-1 rounded-full ${severityBadgeColours[fault.severity]}`}>
                    {severityLabels[fault.severity]}
                  </span>
                </div>
                <p className="text-[#7A9E98] text-sm leading-relaxed">{fault.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 p-5 rounded-xl border border-[rgba(15,234,122,0.15)] bg-[rgba(15,234,122,0.04)] flex items-start gap-4">
            <Shield className="w-5 h-5 text-[#0FEA7A] flex-shrink-0 mt-0.5" />
            <p className="text-[#7A9E98] text-sm leading-relaxed">
              Every repair is quoted before work begins. Our No Fix No Fee policy means that if we cannot resolve your MacBook Pro screen fault, an assessment fee of R599 applies and your machine is returned exactly as we received it. Up-to-3 year warranty on all completed screen repairs.
            </p>
          </div>
        </div>
      </section>

      {/* Apple vs ZA Support Comparison */}
      <section className="py-10 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-4">Apple iStore vs ZA Support: MacBook Pro Screen Repair</h2>
          <p className="text-[#7A9E98] mb-8 leading-relaxed">
            Apple and iStore technicians replace the entire display assembly as a unit and charge accordingly. We diagnose the specific fault and replace only what is necessary.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            <div className="glass-card p-6 border border-red-500/20">
              <h3 className="text-red-400 font-bold mb-4">Apple Store / iStore</h3>
              <ul className="text-[#7A9E98] text-sm space-y-2.5">
                <li>Full display assembly replacement — R6,000 to R15,000+</li>
                <li>Accidental damage not covered by standard warranty</li>
                <li>True Tone calibration may require Apple configurator</li>
                <li>Turnaround 5–10 business days via Apple depot</li>
                <li>No component-level backlight or cable repair</li>
                <li>Flexgate repaired by full display assembly swap</li>
              </ul>
            </div>
            <div className="glass-card p-6 border border-[rgba(15,234,122,0.3)]">
              <h3 className="text-[#0FEA7A] font-bold mb-4">ZA Support</h3>
              <ul className="text-[#7A9E98] text-sm space-y-2.5">
                <li>Component-level diagnosis — only failed parts replaced</li>
                <li>MacBook Pro 13″ from R3,499 | 14″/16″ from R4,999</li>
                <li>True Tone data preserved on all 2018+ models</li>
                <li>Turnaround 24–72 hours for most models</li>
                <li>LP8550 backlight IC repair — no full board replacement</li>
                <li>Up-to-3 year warranty on all completed repairs</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Service Area */}
      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-4">MacBook Pro Screen Repair — Johannesburg Service Area</h2>
          <p className="text-[#7A9E98] mb-6 leading-relaxed">
            Our Hyde Park workshop is 10–20 minutes from most northern Johannesburg suburbs. We offer collection and return from Sandton, Rosebank, Bryanston, Fourways, Midrand, Randburg, Morningside, Rivonia, Sunninghill, and Houghton. Same-day collection is available for urgent cases — contact us on WhatsApp or by phone to arrange a time.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {[
              'Sandton', 'Rosebank', 'Bryanston', 'Fourways',
              'Midrand', 'Randburg', 'Morningside', 'Rivonia',
              'Sunninghill', 'Houghton', 'Parkhurst', 'Hyde Park',
            ].map((suburb) => (
              <div key={suburb} className="flex items-center gap-2 bg-[rgba(15,234,122,0.05)] border border-[rgba(15,234,122,0.1)] rounded-xl px-4 py-3">
                <MapPin className="w-3.5 h-3.5 text-[#0FEA7A] flex-shrink-0" />
                <span className="text-[#E8F4F1] text-sm">{suburb}</span>
              </div>
            ))}
          </div>
          <p className="text-[#7A9E98] text-sm mt-4">
            Also covering Kempton Park, Pretoria, and Centurion by arrangement. Call us on {CONTACT.phone} to confirm availability.
          </p>
        </div>
      </section>

      {/* Google Reviews */}
      <section className="py-10 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <GoogleReviews />
        </div>
      </section>

      {/* FAQs */}
      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQAccordion items={faqs} title="MacBook Pro Screen Repair — Common Questions" />
        </div>
      </section>

      {/* Related Services */}
      <section className="py-8 sm:py-16 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#E8F4F1] mb-6">Related Repairs</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              { label: 'All Screen Repairs', href: '/screen-repair' },
              { label: 'Screen Repair — Sandton', href: '/screen-repair/sandton' },
              { label: 'MacBook Pro Logic Board Repair', href: '/logic-board-repair' },
              { label: 'MacBook Pro Liquid Damage', href: '/liquid-damage' },
              { label: 'Logic Board — MacBook Pro M1', href: '/logic-board-repair/macbook-pro-m1' },
              { label: 'Logic Board — MacBook Pro 14″', href: '/logic-board-repair/macbook-pro-14-inch' },
              { label: 'Logic Board — MacBook Pro 16″', href: '/logic-board-repair/macbook-pro-16-inch' },
              { label: 'Contact Us', href: '/contact' },
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
            <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3">MacBook Pro Screen Fault? Let Us Diagnose It.</h2>
            <p className="text-[#7A9E98] mb-6 max-w-xl mx-auto leading-relaxed">
              WhatsApp us a photo of the fault — we will give you an honest assessment and a price range before you even bring the machine in. No obligation. Assessment from R599, applied toward the repair if you proceed.
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
              1 Hyde Lane, Hyde Park, Office E2004, JHB 2196 | MacBook Pro 13″ from R3,499 | 14″/16″ from R4,999 | Up-to-3 year warranty
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
