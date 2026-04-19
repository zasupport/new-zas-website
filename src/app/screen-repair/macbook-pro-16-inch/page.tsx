import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, ArrowRight, Monitor, AlertTriangle, CheckCircle, Shield, Zap, Eye, MapPin, Cpu } from 'lucide-react';
import SchemaOrg from '@/components/seo/SchemaOrg';
import { buildFaqSchema, buildBreadcrumbSchema, LOCAL_BUSINESS_PROVIDER } from '@/lib/schema';
import GoogleReviews from '@/components/ui/GoogleReviews';
import FAQAccordion from '@/components/ui/FAQ';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { CONTACT, SITE, buildWhatsAppUrl } from '@/lib/constants';
import PricingNote from '@/components/PricingNote';

export const metadata: Metadata = {
  title: 'MacBook Pro 16-Inch Screen Repair Johannesburg [2026] | From R4,999 | ZA Support',
  description:
    'MacBook Pro 16-inch Liquid Retina XDR screen repair Johannesburg from R4,999. M1 Pro/Max to M4 Pro/Max. Largest mini-LED panel, ProMotion 120Hz. No Fix No Fee. Hyde Park.',
  alternates: { canonical: 'https://zasupport.com/screen-repair/macbook-pro-16-inch' },
  keywords: [
    'MacBook Pro 16 inch screen repair Johannesburg',
    'MacBook Pro 16 Liquid Retina XDR repair',
    'MacBook Pro 16 display replacement Johannesburg',
    'MacBook Pro M1 Pro Max screen repair Johannesburg',
    'MacBook Pro M2 Pro Max screen repair Johannesburg',
    'MacBook Pro M3 Pro Max screen repair Johannesburg',
    'MacBook Pro M4 Pro Max screen repair Johannesburg',
    'MacBook Pro 16 screen repair Hyde Park',
    'largest MacBook Pro screen repair Johannesburg',
    'MacBook Pro 16 ProMotion repair Johannesburg',
  ],
};

const breadcrumbItems = [
  { label: 'Screen Repair', href: '/screen-repair' },
  { label: 'MacBook Pro', href: '/screen-repair/macbook-pro' },
  { label: '16-Inch' },
];

const breadcrumbSchemaItems = [
  { name: 'Home', url: 'https://zasupport.com' },
  { name: 'Screen Repair', url: 'https://zasupport.com/screen-repair' },
  { name: 'MacBook Pro', url: 'https://zasupport.com/screen-repair/macbook-pro' },
  { name: 'MacBook Pro 16-Inch', url: 'https://zasupport.com/screen-repair/macbook-pro-16-inch' },
];

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'MacBook Pro 16-Inch Screen Repair Johannesburg',
  description:
    'Professional MacBook Pro 16-inch Liquid Retina XDR screen repair in Johannesburg. M1 Pro/Max through M4 Pro/Max. Largest mini-LED Apple panel, ProMotion 120Hz, True Tone. Assessment from R599. Up-to-3 year warranty.',
  provider: LOCAL_BUSINESS_PROVIDER,
  areaServed: { '@type': 'City', name: 'Johannesburg' },
  serviceType: 'Screen Repair',
  offers: {
    '@type': 'AggregateOffer',
    lowPrice: '4999',
    highPrice: '14000',
    priceCurrency: 'ZAR',
    offerCount: '5',
  },
};

const pricingRows = [
  { model: 'MacBook Pro 16″ M1 Pro / M1 Max (A2485, 2021)', panel: 'Liquid Retina XDR mini-LED 3456×2160', from: 'R4,999', turnaround: '48–72 hrs' },
  { model: 'MacBook Pro 16″ M2 Pro / M2 Max (A2780, 2023)', panel: 'Liquid Retina XDR mini-LED 3456×2160', from: 'R5,999', turnaround: '48–72 hrs' },
  { model: 'MacBook Pro 16″ M3 Pro / M3 Max (A2991, 2023)', panel: 'Liquid Retina XDR mini-LED 3456×2160', from: 'R6,999', turnaround: '48–72 hrs' },
  { model: 'MacBook Pro 16″ M4 Pro / M4 Max (A2993, 2024)', panel: 'Liquid Retina XDR mini-LED 3456×2160', from: 'R7,499', turnaround: '48–72 hrs' },
];

const faultTypes = [
  {
    title: 'Mini-LED Backlight Zone Failure — 16-Inch Specific',
    icon: Zap,
    desc: 'The 16-inch MacBook Pro houses the largest Liquid Retina XDR panel Apple produces, with over 10,000 mini-LEDs across its 3456×2160 display surface. Zone failures present as dark rectangular patches — typically in a corner or along one edge — on an otherwise functional display. The 16-inch assembly has more dimming zones than the 14-inch (proportional to its larger surface area), so partial failures can be subtle at first. We have seen zone failure triggered by load shedding voltage events on several 16-inch models in Johannesburg. The display assembly must be replaced; mini-LED zones are not individually serviceable.',
    severity: 'high',
  },
  {
    title: 'Liquid Retina XDR Delamination',
    icon: Eye,
    desc: 'Liquid entry into the 16-inch display assembly causes the bonding layer between the mini-LED backlight and the IPS panel to break down. Delamination typically starts at the bottom edge — where liquid pools — and spreads inward as grey or iridescent patches. The screen glass may be perfectly intact, leading some clients to assume the fault is internal software. It is not. We confirm delamination versus panel damage versus GPU fault during assessment before recommending the appropriate repair. Apple charges R18,000 to R25,000 for a 16-inch display assembly replacement; we charge significantly less.',
    severity: 'high',
  },
  {
    title: 'Display Cable Strain — Heavy Lid',
    icon: AlertTriangle,
    desc: 'The 16-inch MacBook Pro is Apple\'s heaviest laptop in current production — 2.14 kg. The lid itself is substantially heavier than the 14-inch equivalent. This places greater mechanical stress on the display flex cable as it passes through the hinge assembly, particularly in machines that are opened and closed frequently throughout the day. We see intermittent display faults on 16-inch models — flickering at certain lid angles, display going black and recovering — that are cable strain faults rather than panel faults. Cable replacement resolves these cases without the cost of a full display assembly.',
    severity: 'medium',
  },
  {
    title: 'ProMotion Downgrade After Incorrect Repair',
    icon: Monitor,
    desc: 'The 16-inch MacBook Pro ProMotion display runs between 24Hz and 120Hz adaptively. A non-compatible replacement panel — or a panel installed without testing the display protocol — will lock the display at 60Hz. This is difficult to notice unless you are familiar with the buttery-smooth cursor movement that 120Hz ProMotion delivers. We test adaptive refresh rate explicitly after every 16-inch display replacement, using both cursor movement tests and dedicated refresh rate detection tools. Every repair leaves our workshop with ProMotion confirmed active.',
    severity: 'medium',
  },
  {
    title: 'True Tone Disabled After Previous Repair',
    icon: Cpu,
    desc: 'True Tone on the MacBook Pro 16-inch stores calibration data in the display assembly. Repairers who do not migrate this data during display replacement leave the machine permanently unable to adapt its white point to ambient lighting. "Not Available" in Display settings is the result. We carry True Tone calibration data across during every 16-inch display replacement as a standard step. If your 16-inch is already in this state from a previous repair, we can assess whether a recalibration is possible during the repair process.',
    severity: 'low',
  },
  {
    title: 'Cracked Liquid Retina XDR Panel',
    icon: AlertTriangle,
    desc: 'A direct impact to the 16-inch lid — a corner drop, lid closure on a hard object — can crack the Liquid Retina XDR panel. This is the most expensive MacBook Pro screen repair we perform, simply because the 16-inch display assembly is the largest and most costly to source. We always provide a written fixed-price quote before beginning work. Despite the higher cost, repairing the screen at ZA Support typically costs 60–70% less than the Apple Store equivalent for 16-inch models.',
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
    question: 'How much does MacBook Pro 16-inch screen repair cost in Johannesburg?',
    answer:
      'MacBook Pro 16-inch screen repair starts from R4,999 for the M1 Pro/Max model (A2485, 2021) and from R5,999 to R7,499 for later chip generations. The 16-inch display is the largest and most expensive Apple panel to source, which is reflected in the price. Apple Store charges R18,000 to R25,000 for the same repair. We provide a written fixed-price quote before any work begins — the price we quote is the price you pay.',
  },
  {
    question: 'What is the display specification on the MacBook Pro 16-inch?',
    answer:
      'The MacBook Pro 16-inch (2021 onwards) uses a Liquid Retina XDR display with a resolution of 3456×2160 at 254 ppi. It employs a mini-LED backlight with over 10,000 individual LEDs across more than 2,500 local dimming zones, delivering 1,600 nits peak HDR brightness. The display supports ProMotion adaptive refresh rate (24–120Hz), P3 wide colour gamut, True Tone, and an anti-reflective nano-texture option on certain configurations.',
  },
  {
    question: 'Can you repair dark patches on a MacBook Pro 16-inch screen?',
    answer:
      'Yes. Dark patches on the 16-inch MacBook Pro typically indicate mini-LED backlight zone failure or delamination of the panel bonding layer. We confirm which condition is present during assessment — in some cases what appears to be a dark zone is a display cable fault producing a localised signal dropout, which is a significantly cheaper repair. We never recommend a full display assembly replacement without first excluding the cable as the cause.',
  },
  {
    question: 'Why is MacBook Pro 16-inch screen repair more expensive than the 14-inch?',
    answer:
      'The 16-inch display assembly is physically larger and costs more to source than the 14-inch equivalent. The assembly also weighs more, which means the hinge and flex cable experience more mechanical stress — leading to slightly more complex removal and installation procedures. Despite this, our 16-inch repair prices are consistently 60–70% below Apple Store pricing for the same repair.',
  },
  {
    question: 'How long does MacBook Pro 16-inch screen repair take?',
    answer:
      'MacBook Pro 16-inch screen repairs typically take 48 to 72 hours. The larger Liquid Retina XDR assembly requires careful ESD-protected handling, and we run a minimum 3-hour burn-in after installation covering brightness uniformity across all dimming zones, ProMotion confirmation, True Tone calibration, and P3 wide colour gamut verification. We give you a confirmed collection time when you drop the machine off.',
  },
  {
    question: 'Will ProMotion work after my MacBook Pro 16-inch screen is repaired?',
    answer:
      'Yes — we verify ProMotion is active after every 16-inch display replacement. ProMotion requires a display assembly that supports Apple\'s adaptive sync protocol. We source assemblies that are fully protocol-compatible and confirm adaptive refresh rate (24–120Hz) before the machine leaves the workshop. If you have previously had a repair elsewhere that disabled ProMotion, we can assess whether a replacement assembly resolves the issue.',
  },
  {
    question: 'Does the MacBook Pro 16-inch have the notch like the 14-inch?',
    answer:
      'Yes. The MacBook Pro 16-inch (2021 onwards) includes the same display notch as the 14-inch, housing the FaceTime camera, TrueTone sensor, and ambient light sensor. The camera module connects via the display flex cable. Incorrect installation of the display assembly can disable the camera. We confirm camera function after every display replacement before the machine is returned.',
  },
  {
    question: 'My MacBook Pro 16-inch screen is flickering — is this serious?',
    answer:
      'Flickering on the 16-inch MacBook Pro can range from a minor display cable issue to early mini-LED zone instability. If the flicker correlates with lid angle, the display flex cable is the most likely cause. If the flicker is random and visible at all lid angles, it may indicate a panel fault or a logic board display output issue. We run an external display test during assessment to determine whether the fault is isolated to the screen or originates from the GPU.',
  },
  {
    question: 'Can I use my MacBook Pro 16-inch with an external display while the screen is broken?',
    answer:
      'Yes. The MacBook Pro 16-inch has three Thunderbolt 4 ports and an HDMI 2.1 port, all of which output to external displays independently of the built-in panel. You can connect a monitor, close the lid, and work in clamshell mode while waiting for the screen repair. Bring the machine to our Hyde Park workshop and we will confirm the external output ports are functioning before you leave.',
  },
  {
    question: 'Is the MacBook Pro 16-inch M1 Pro screen compatible with the M2 Pro?',
    answer:
      'No. Although the 14-inch and 16-inch Liquid Retina XDR assemblies use the same resolution (3456×2160 for the 16-inch across all generations), the physical connector and flex cable routing differ between the A2485 (M1 Pro/Max), A2780 (M2 Pro/Max), A2991 (M3 Pro/Max), and A2993 (M4 Pro/Max) models. We source model-specific assemblies for each generation and never use a mismatched part.',
  },
  {
    question: 'What should I do immediately after cracking my MacBook Pro 16-inch screen?',
    answer:
      'Stop using the Mac if liquid was involved in the damage — switch it off and bring it to us immediately. If it was a dry impact with no liquid, the Mac can continue to be used until the repair appointment. Contact us on WhatsApp with your model number and a photo of the damage — we will confirm parts availability and give you a quote and estimated turnaround before you make the trip to Hyde Park.',
  },
];

const faqSchema = buildFaqSchema(faqs);
const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbSchemaItems);

export default function ScreenRepairMacBookPro16Page() {
  const whatsappUrl = buildWhatsAppUrl('SCR-PRO16-HERO', 'screen-repair');

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
              MacBook Pro 16-Inch Screen Repair
              <br /><span className="text-[#0FEA7A]">Johannesburg</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-4 max-w-3xl leading-relaxed">
              Apple's largest MacBook Pro display — and the most complex to repair. We service every 16-inch Liquid Retina XDR generation from M1 Pro/Max through to M4 Pro/Max at our Hyde Park workshop. Dark zones, delamination, ProMotion faults, cracked panels. Written quote before any work begins.
            </p>
            <div className="flex items-center gap-2 text-[#7A9E98] text-sm mb-8">
              <MapPin className="w-4 h-4 text-[#0FEA7A]" />
              <span>1 Hyde Lane, Hyde Park, Office E2004, JHB 2196 | MacBook Pro 16″ from R4,999 | 48–72 hr turnaround</span>
            </div>
            <div className="flex flex-wrap gap-3 mb-8">
              {[
                { icon: Shield, label: 'No Fix No Fee' },
                { icon: Monitor, label: 'Largest Apple Panel' },
                { icon: Cpu, label: 'M1 to M4 Pro/Max' },
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
                { value: '300+', label: 'MacBook Pro 16″ Screens Repaired' },
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
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4">MacBook Pro 16-Inch Screen Repair Pricing</h2>
          <p className="text-[#7A9E98] mb-8 max-w-3xl leading-relaxed">
            All prices include the full Liquid Retina XDR display assembly, labour, and our up-to-3 year warranty. Apple Store charges R18,000 to R25,000 for the same repair on 16-inch models. Our written fixed-price quote is valid for 7 days.
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
          <PricingNote variant="inline" />
        </div>
      </section>

      {/* Technical Expertise */}
      <section className="py-10 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4">Why the 16-Inch Is the Most Demanding MacBook Pro Screen Repair</h2>
          <div className="space-y-4 text-[#7A9E98] leading-relaxed">
            <p>
              The MacBook Pro 16-inch Liquid Retina XDR is the largest display Apple has ever installed in a MacBook — and it is the most complex screen repair we perform in our Hyde Park workshop. The assembly measures 3456×2160 pixels at 254 ppi, with a mini-LED backlight of over 10,000 individual LEDs. Every repair step takes longer, every connector is under more mechanical stress, and the cost of a mistake is proportionally higher.
            </p>
            <p>
              We work on 16-inch MacBook Pros exclusively on our ESD-protected bench with grounded tooling throughout. The display assembly is heavy — one person holds the lid open at a precise angle while the other works the ZIF connectors. There is no shortcut in the procedure. The most common mistake we see from previous repairs is damage to the display cable ZIF latch at the logic board end, caused by forcing the connector rather than using the correct release tool.
            </p>
            <p>
              Load shedding in Johannesburg has a specific relevance to the 16-inch MacBook Pro. Several clients have brought us 16-inch machines with mini-LED zone failure that developed within days of a Stage 6 load shedding period. The voltage surge characteristics on grid restoration appear to stress the backlight driver circuitry more on these larger, higher-power displays. A quality surge protector or UPS is a worthwhile investment if you own a 16-inch MacBook Pro in South Africa.
            </p>
            <p>
              Post-installation testing for the 16-inch is more thorough than for any other model. We test brightness uniformity across all local dimming zones using a grid pattern, confirm ProMotion adaptive refresh rate at both extremes (24Hz in a static document and 120Hz in a fast-scrolling page), verify True Tone colour temperature adaptation, and run P3 wide colour gamut confirmation. Only when all four pass does the machine leave the workshop.
            </p>
          </div>
          <div className="mt-6">
            <a
              href="https://www.ifixit.com/Teardown/MacBook_Pro_16-Inch_2021_Teardown/144612"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[#0FEA7A] text-sm font-semibold hover:underline"
            >
              iFixit MacBook Pro 16-inch teardown <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Common Faults */}
      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4">MacBook Pro 16-Inch Display Faults We Repair</h2>
          <p className="text-[#7A9E98] mb-10 max-w-3xl leading-relaxed">
            The 16-inch has its own fault profile distinct from the 14-inch — the larger panel, heavier lid, and higher-power backlight create different failure modes. We diagnose the precise cause before recommending any part replacement.
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
              Every repair is quoted before work begins. No Fix No Fee — if we cannot resolve the fault, R599 assessment fee applies and your machine is returned exactly as received. Up-to-3 year warranty on all completed repairs.
            </p>
          </div>
        </div>
      </section>

      {/* Apple vs ZA Support */}
      <section className="py-10 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-4">Apple iStore vs ZA Support: MacBook Pro 16-Inch Screen Repair</h2>
          <p className="text-[#7A9E98] mb-8 leading-relaxed">
            The 16-inch MacBook Pro screen is the most expensive laptop display repair Apple charges for. Our prices are 60–70% lower — with a comparable warranty and faster turnaround.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            <div className="glass-card p-6 border border-red-500/20">
              <h3 className="text-red-400 font-bold mb-4">Apple Store / iStore</h3>
              <ul className="text-[#7A9E98] text-sm space-y-2.5">
                <li>16-inch Liquid Retina XDR replacement — R18,000 to R25,000+</li>
                <li>Accidental damage not covered by standard warranty</li>
                <li>Turnaround 5–10 business days via Apple depot</li>
                <li>No component-level diagnosis before part swap</li>
                <li>Display cable faults resolved by full assembly replacement</li>
                <li>ProMotion and True Tone verified using Apple Configurator</li>
              </ul>
            </div>
            <div className="glass-card p-6 border border-[rgba(15,234,122,0.3)]">
              <h3 className="text-[#0FEA7A] font-bold mb-4">ZA Support</h3>
              <ul className="text-[#7A9E98] text-sm space-y-2.5">
                <li>MacBook Pro 16″ screen repair from R4,999</li>
                <li>Full component-level diagnosis before quoting</li>
                <li>ProMotion + True Tone + P3 gamut verified post-repair</li>
                <li>Turnaround 48–72 hours from drop-off</li>
                <li>Display cable faults diagnosed before assembly swap</li>
                <li>Up-to-3 year warranty on all completed repairs</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Service Area */}
      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-4">MacBook Pro 16-Inch Screen Repair — Johannesburg Service Area</h2>
          <p className="text-[#7A9E98] mb-6 leading-relaxed">
            Our Hyde Park workshop is 10–20 minutes from most northern Johannesburg suburbs. We offer collection and return from Sandton, Rosebank, Bryanston, Fourways, Midrand, Randburg, Morningside, Rivonia, Sunninghill, and Houghton.
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
          <FAQAccordion items={faqs} title="MacBook Pro 16-Inch Screen Repair — Common Questions" />
        </div>
      </section>

      {/* Related Services */}
      <section className="py-8 sm:py-16 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#E8F4F1] mb-6">Related Repairs</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              { label: 'All Screen Repairs', href: '/screen-repair' },
              { label: 'MacBook Pro Screen Repair', href: '/screen-repair/macbook-pro' },
              { label: 'MacBook Pro 14-Inch Screen', href: '/screen-repair/macbook-pro-14-inch' },
              { label: 'MacBook Pro 13-Inch Screen', href: '/screen-repair/macbook-pro-13-inch' },
              { label: 'Logic Board — MacBook Pro 16″', href: '/logic-board-repair/macbook-pro-16-inch' },
              { label: 'MacBook Pro Liquid Damage', href: '/liquid-damage' },
              { label: 'Screen Repair — Sandton', href: '/screen-repair/sandton' },
              { label: 'Contact Us', href: '/contact' },
            ].map((link) => (
              <Link key={link.href} href={link.href} className="glass-card p-4 text-center group">
                <span className="text-[#E8F4F1] text-sm font-semibold group-hover:text-[#0FEA7A] transition-colors">{link.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
