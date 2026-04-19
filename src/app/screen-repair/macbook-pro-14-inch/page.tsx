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
  title: 'MacBook Pro 14-Inch Screen Repair Johannesburg [2026] | From R4,999 | ZA Support',
  description:
    'MacBook Pro 14-inch Liquid Retina XDR screen repair in Johannesburg from R4,999. M1 Pro/Max through M4 Pro/Max. Mini-LED, ProMotion 120Hz. No Fix No Fee. Hyde Park workshop.',
  alternates: { canonical: 'https://zasupport.com/screen-repair/macbook-pro-14-inch' },
  keywords: [
    'MacBook Pro 14 inch screen repair Johannesburg',
    'MacBook Pro 14 Liquid Retina XDR repair',
    'MacBook Pro 14 display replacement Johannesburg',
    'MacBook Pro M1 Pro screen repair Johannesburg',
    'MacBook Pro M2 Pro screen repair Johannesburg',
    'MacBook Pro M3 Pro screen repair Johannesburg',
    'MacBook Pro M4 Pro screen repair Johannesburg',
    'mini-LED MacBook Pro repair Johannesburg',
    'ProMotion display repair Johannesburg',
    'MacBook Pro 14 screen repair Hyde Park',
  ],
};

const breadcrumbItems = [
  { label: 'Screen Repair', href: '/screen-repair' },
  { label: 'MacBook Pro', href: '/screen-repair/macbook-pro' },
  { label: '14-Inch' },
];

const breadcrumbSchemaItems = [
  { name: 'Home', url: 'https://zasupport.com' },
  { name: 'Screen Repair', url: 'https://zasupport.com/screen-repair' },
  { name: 'MacBook Pro', url: 'https://zasupport.com/screen-repair/macbook-pro' },
  { name: 'MacBook Pro 14-Inch', url: 'https://zasupport.com/screen-repair/macbook-pro-14-inch' },
];

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'MacBook Pro 14-Inch Screen Repair Johannesburg',
  description:
    'Professional MacBook Pro 14-inch Liquid Retina XDR screen repair in Johannesburg. M1 Pro/Max through M4 Pro/Max. Mini-LED backlight, ProMotion 120Hz, True Tone preserved. Assessment from R599. Up-to-3 year warranty.',
  provider: LOCAL_BUSINESS_PROVIDER,
  areaServed: { '@type': 'City', name: 'Johannesburg' },
  serviceType: 'Screen Repair',
  offers: {
    '@type': 'AggregateOffer',
    lowPrice: '4999',
    highPrice: '12000',
    priceCurrency: 'ZAR',
    offerCount: '6',
  },
};

const pricingRows = [
  { model: 'MacBook Pro 14″ M1 Pro / M1 Max (A2442, 2021)', panel: 'Liquid Retina XDR mini-LED 3024×1964', from: 'R4,999', turnaround: '48–72 hrs' },
  { model: 'MacBook Pro 14″ M2 Pro / M2 Max (A2779, 2023)', panel: 'Liquid Retina XDR mini-LED 3024×1964', from: 'R5,499', turnaround: '48–72 hrs' },
  { model: 'MacBook Pro 14″ M3 / M3 Pro / M3 Max (A2918, 2023)', panel: 'Liquid Retina XDR mini-LED 3024×1964', from: 'R5,999', turnaround: '48–72 hrs' },
  { model: 'MacBook Pro 14″ M4 / M4 Pro / M4 Max (A2992, 2024)', panel: 'Liquid Retina XDR mini-LED 3024×1964', from: 'R6,499', turnaround: '48–72 hrs' },
];

const faultTypes = [
  {
    title: 'Mini-LED Backlight Zone Failure',
    icon: Zap,
    desc: 'The MacBook Pro 14-inch Liquid Retina XDR display uses a backlight array of over 10,000 individual mini-LEDs arranged in local dimming zones. When one or more zones fail, the affected area of the screen displays as a dark patch — distinct from a cracked panel because the glass is intact. This fault can develop gradually (the dark area grows over weeks) or suddenly after a voltage event. Load shedding restoration surges have caused this fault on several 14-inch MacBook Pros we have seen in Johannesburg. The display assembly must be replaced; the mini-LED array is not field-serviceable at zone level.',
    severity: 'high',
  },
  {
    title: 'Liquid Retina XDR Delamination',
    icon: Eye,
    desc: 'Liquid entry into the display assembly causes the bonding adhesive between the mini-LED backlight and the IPS panel to break down. The result is spreading grey or iridescent patches — usually starting from the edges and moving inward. The display glass may appear completely intact. This delamination fault is not reversible; the full display assembly must be replaced. Apple charges R15,000 to R20,000 for this repair on the 14-inch models. We provide a written fixed-price quote before any work begins — typically R4,999 to R6,499 depending on the chip generation.',
    severity: 'high',
  },
  {
    title: 'ProMotion Refresh Rate Fault',
    icon: Monitor,
    desc: 'The 14-inch MacBook Pro ProMotion display dynamically adjusts its refresh rate between 24Hz and 120Hz depending on the content on screen. When the display cable develops a fault or the ZIF connector at the logic board end is partially unseated, ProMotion can lose its dynamic range — the display either locks at 60Hz or stutters between rates. This manifests as video that looks slightly motion-blurred when it should be smooth, or a flickering effect during cursor movement. We diagnose this by testing the display cable continuity before recommending a replacement.',
    severity: 'medium',
  },
  {
    title: 'Notch Camera and Sensor Failure',
    icon: Cpu,
    desc: 'The MacBook Pro 14-inch (2021 onwards) introduced a display notch housing the FaceTime camera, TrueTone sensor, and ambient light sensor. The camera and sensor array connect to the display flex cable; damage to the cable — from a hinge collision or partial delamination — can disable the camera independently of the main display. A black display with working camera, or a working display with dead camera, helps us narrow the fault to a specific section of the assembly before disassembly.',
    severity: 'medium',
  },
  {
    title: 'Display Cable Damage at ZIF Connector',
    icon: AlertTriangle,
    desc: 'The 14-inch MacBook Pro uses a wider eDP display cable with a ZIF (zero insertion force) connector at the logic board end. This connector has a locking latch that, if forced during a previous repair or a significant fall, can crack or partially disengage. The symptom is display output that works intermittently — fine when closed but flickering or absent when opened to certain angles. We always inspect the ZIF connector and latch during assessment before attributing the fault to the panel.',
    severity: 'medium',
  },
  {
    title: 'Cracked Liquid Retina XDR Panel',
    icon: AlertTriangle,
    desc: 'A direct impact to the 14-inch MacBook Pro lid — a corner drop, a bag closure on a hard object — can crack the Liquid Retina XDR panel. Because the panel is bonded to the housing assembly, the full display unit must be replaced. Unlike the older 13-inch MacBook Pros where a cracked panel is a relatively affordable fix, the 14-inch Liquid Retina XDR assembly is more expensive to source and replace. We test every replacement assembly across five display test patterns including ProMotion, True Tone, and wide colour gamut before the machine leaves our workshop.',
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
    question: 'How much does MacBook Pro 14-inch screen repair cost in Johannesburg?',
    answer:
      'MacBook Pro 14-inch screen repair starts from R4,999 for the M1 Pro/Max model (A2442, 2021) and from R5,499 to R6,499 for later chip generations. The exact price depends on your model number and the availability of the Liquid Retina XDR display assembly. Apple Store charges R15,000 to R20,000 for the same repair. We provide a written fixed-price quote before any work begins, and we do not charge for the assessment if you proceed with the repair.',
  },
  {
    question: 'What makes the MacBook Pro 14-inch display different from the 13-inch?',
    answer:
      'The 14-inch MacBook Pro (2021 onwards) uses a Liquid Retina XDR display — a fundamentally different technology from the IPS LCD used in the 13-inch. The XDR display has a mini-LED backlight with over 10,000 individual LEDs in local dimming zones, delivering 1,600 nits peak brightness and a 1,000,000:1 contrast ratio. It also supports ProMotion adaptive refresh rate (24–120Hz) and ships with the display notch. The assembly is thicker, heavier, and more expensive to replace than the 13-inch panel.',
  },
  {
    question: 'Can you repair a MacBook Pro 14-inch screen that has dark patches but no cracks?',
    answer:
      'Yes. Dark patches without visible cracks on a 14-inch MacBook Pro typically indicate mini-LED backlight zone failure or delamination of the bonding layer between the backlight and the IPS panel. Both conditions require display assembly replacement. We confirm the diagnosis before quoting — in some cases, what appears to be a dead zone is actually a display cable fault producing a localised signal loss, which is a different (and cheaper) repair.',
  },
  {
    question: 'Will ProMotion still work after a MacBook Pro 14-inch screen repair?',
    answer:
      'Yes, if you use a genuine-equivalent assembly. ProMotion requires a display assembly that supports the adaptive sync protocol used by the Apple Silicon GPU. We source display assemblies that are fully compatible with ProMotion and test adaptive refresh rate after every repair. A non-compatible panel will lock at 60Hz — something we verify before the machine leaves the workshop.',
  },
  {
    question: 'My MacBook Pro 14-inch camera stopped working after a display repair elsewhere — can you fix this?',
    answer:
      'This is a known consequence of incorrect display assembly installation on the 14-inch MacBook Pro. The FaceTime camera and TrueTone sensor sit in the display notch and connect via the display flex cable. If the cable was not seated correctly or the previous repairer used an assembly with a different camera module, the camera will be disabled. Bring the machine in — we assess the cable routing, connector seating, and camera module compatibility to determine the fix.',
  },
  {
    question: 'How long does MacBook Pro 14-inch screen repair take?',
    answer:
      'MacBook Pro 14-inch screen repairs typically take 48 to 72 hours. The Liquid Retina XDR assembly requires careful installation — the mini-LED array is sensitive to static and the ZIF connectors require precise handling. After installation, we run a minimum 2-hour burn-in test covering brightness uniformity, ProMotion response, and True Tone calibration before the machine is returned. We will give you a confirmed ready time when you drop the machine off.',
  },
  {
    question: 'Does True Tone work after MacBook Pro 14-inch screen replacement?',
    answer:
      'Yes. True Tone calibration data on the 14-inch MacBook Pro is stored in the display assembly. We transfer this data to the replacement assembly during every repair. After the repair, True Tone shows as active in System Settings — it does not display "Not Available". This is a step that inexperienced repairers frequently miss, permanently disabling True Tone.',
  },
  {
    question: 'Is MacBook Pro 14-inch screen repair covered by AppleCare+?',
    answer:
      'AppleCare+ covers accidental damage with an excess payment — currently around R1,499 to R2,999 per incident for the MacBook Pro 14-inch. If your Mac is within the AppleCare+ coverage period and the damage qualifies, this may be the most cost-effective route. If your Mac is out of AppleCare+, ZA Support typically charges 60–75% less than the Apple Store for the same repair, with a comparable or longer warranty.',
  },
  {
    question: 'My MacBook Pro 14-inch screen flickers when the lid is at certain angles — what is causing this?',
    answer:
      'Flickering that correlates with lid angle on the 14-inch MacBook Pro is almost always a display cable fault. The eDP cable connecting the Liquid Retina XDR assembly to the logic board passes through the hinge assembly. If the cable is partially fractured or the ZIF connector at the logic board end is partially unseated, the display signal becomes intermittent at certain cable bend angles. We test this by slowly opening and closing the lid while monitoring the display during assessment.',
  },
  {
    question: 'What is the difference between M1 Pro, M2 Pro, M3 Pro, and M4 Pro screen repairs?',
    answer:
      'The display assembly specification is identical across all 14-inch generations — 3024×1964 Liquid Retina XDR mini-LED. However, each chip generation uses a different A-series model number (A2442, A2779, A2918, A2992) and the display connector routing changed slightly between generations. We stock or source assemblies specific to each model number. Repair prices increase with each generation primarily because newer-generation assemblies cost more to source.',
  },
  {
    question: 'Can a MacBook Pro 14-inch with a cracked screen still be used with an external display?',
    answer:
      'In most cases, yes. The 14-inch MacBook Pro has two Thunderbolt 4 ports and an HDMI 2.1 port that output to external displays independently of the built-in panel. If your screen is cracked but the Mac is otherwise functioning, you can connect an external monitor and continue working while waiting for the repair. Bring it to our Hyde Park workshop and we will confirm the external output is fully functional before you leave.',
  },
];

const faqSchema = buildFaqSchema(faqs);
const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbSchemaItems);

export default function ScreenRepairMacBookPro14Page() {
  const whatsappUrl = buildWhatsAppUrl('SCR-PRO14-HERO', 'screen-repair');

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
              MacBook Pro 14-Inch Screen Repair
              <br /><span className="text-[#0FEA7A]">Johannesburg</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-4 max-w-3xl leading-relaxed">
              Liquid Retina XDR mini-LED repair across all 14-inch MacBook Pro generations — M1 Pro/Max through to M4 Pro/Max. Dark patches, ProMotion faults, delamination, cracked panels. Written quote before any work. Assessment from R599.
            </p>
            <div className="flex items-center gap-2 text-[#7A9E98] text-sm mb-8">
              <MapPin className="w-4 h-4 text-[#0FEA7A]" />
              <span>1 Hyde Lane, Hyde Park, Office E2004, JHB 2196 | MacBook Pro 14″ from R4,999 | 48–72 hr turnaround</span>
            </div>
            <div className="flex flex-wrap gap-3 mb-8">
              {[
                { icon: Shield, label: 'No Fix No Fee' },
                { icon: Monitor, label: 'Liquid Retina XDR Specialist' },
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
                { value: '500+', label: 'MacBook Pro 14″ Screens Repaired' },
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
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4">MacBook Pro 14-Inch Screen Repair Pricing</h2>
          <p className="text-[#7A9E98] mb-8 max-w-3xl leading-relaxed">
            All prices include the full Liquid Retina XDR display assembly, labour, and our up-to-3 year warranty. Apple Store charges R15,000 to R20,000 for the same repair. We provide a written fixed-price quote before any work begins.
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
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4">MacBook Pro 14-Inch Liquid Retina XDR — Our Approach</h2>
          <div className="space-y-4 text-[#7A9E98] leading-relaxed">
            <p>
              The MacBook Pro 14-inch (2021 onwards) introduced the most significant display technology change in the MacBook Pro's history. The Liquid Retina XDR panel uses a mini-LED backlight with 10,000+ individually controlled LEDs arranged across 2,500 local dimming zones — a stark contrast to the single-zone LED backlight used in all previous MacBook Pro models.
            </p>
            <p>
              In our Hyde Park workshop, we treat every 14-inch display repair with a different protocol from the 13-inch repairs. The mini-LED assembly is sensitive to electrostatic discharge — we work on an ESD mat with grounded wrist straps throughout. The ZIF connector on the Liquid Retina XDR cable is wider than on the 13-inch and requires a different release tool. Post-installation, we run a minimum 2-hour burn-in including a grid test, full-white, full-black, and HDR video to confirm backlight zone uniformity.
            </p>
            <p>
              ProMotion is a feature that many repairers do not test after installation. The 14-inch MacBook Pro dynamically adjusts between 24Hz and 120Hz based on content — you will notice this as the cursor gliding exceptionally smoothly on the desktop. A non-compatible replacement assembly or a misrouted cable can disable ProMotion entirely, leaving the display locked at 60Hz. We test adaptive refresh rate explicitly before every machine leaves the workshop.
            </p>
            <p>
              Load shedding events in Johannesburg have caused mini-LED zone failure on several 14-inch MacBook Pros we have assessed. The voltage characteristics of South Africa's grid restoration events appear to stress the backlight driver circuitry on these models more than the Intel Retina MacBook Pros. We advise clients to use a quality UPS or surge protector — particularly during Stage 4 and above load shedding.
            </p>
            <p>
              For the most up-to-date repairability information on the MacBook Pro 14-inch, the iFixit teardown provides useful context on the assembly architecture — though the component-level detail on ProMotion and mini-LED servicing requires hands-on experience we have built over hundreds of repairs.
            </p>
          </div>
          <div className="mt-6">
            <a
              href="https://www.ifixit.com/Teardown/MacBook_Pro_14-Inch_2021_Teardown/144008"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[#0FEA7A] text-sm font-semibold hover:underline"
            >
              iFixit MacBook Pro 14-inch teardown <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Common Faults */}
      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4">MacBook Pro 14-Inch Display Faults We Repair</h2>
          <p className="text-[#7A9E98] mb-10 max-w-3xl leading-relaxed">
            Every fault below is a repairable condition on the MacBook Pro 14-inch. We diagnose the precise cause before recommending any part replacement.
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
              Every repair is quoted before work begins. No Fix No Fee applies — if we cannot resolve the fault, R599 assessment fee applies and your machine is returned exactly as received. Up-to-3 year warranty on all completed repairs.
            </p>
          </div>
        </div>
      </section>

      {/* Apple vs ZA Support */}
      <section className="py-10 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-4">Apple iStore vs ZA Support: MacBook Pro 14-Inch Screen Repair</h2>
          <p className="text-[#7A9E98] mb-8 leading-relaxed">
            Apple charges between R15,000 and R20,000 for a MacBook Pro 14-inch display assembly replacement. We charge a fraction of that — with the same or better warranty.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            <div className="glass-card p-6 border border-red-500/20">
              <h3 className="text-red-400 font-bold mb-4">Apple Store / iStore</h3>
              <ul className="text-[#7A9E98] text-sm space-y-2.5">
                <li>Liquid Retina XDR replacement — R15,000 to R20,000+</li>
                <li>Accidental damage not covered by standard warranty</li>
                <li>Turnaround 5–10 business days via Apple depot</li>
                <li>ProMotion verified but True Tone requires Apple Configurator</li>
                <li>No camera module compatibility check offered</li>
                <li>No component-level backlight repair available</li>
              </ul>
            </div>
            <div className="glass-card p-6 border border-[rgba(15,234,122,0.3)]">
              <h3 className="text-[#0FEA7A] font-bold mb-4">ZA Support</h3>
              <ul className="text-[#7A9E98] text-sm space-y-2.5">
                <li>MacBook Pro 14″ screen repair from R4,999</li>
                <li>Full diagnostic before any part replacement</li>
                <li>True Tone + ProMotion verified after every repair</li>
                <li>Turnaround 48–72 hours from drop-off</li>
                <li>Camera module compatibility confirmed before install</li>
                <li>Up-to-3 year warranty on completed repairs</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Service Area */}
      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-4">MacBook Pro 14-Inch Screen Repair — Johannesburg Service Area</h2>
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
          <FAQAccordion items={faqs} title="MacBook Pro 14-Inch Screen Repair — Common Questions" />
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
              { label: 'MacBook Pro 13-Inch Screen', href: '/screen-repair/macbook-pro-13-inch' },
              { label: 'MacBook Pro 16-Inch Screen', href: '/screen-repair/macbook-pro-16-inch' },
              { label: 'Logic Board — MacBook Pro 14″', href: '/logic-board-repair/macbook-pro-14-inch' },
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
