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
  title: 'MacBook Air M2 Screen Repair Johannesburg [2026] | From R2,499 | ZA Support',
  description:
    'MacBook Air M2 screen repair Johannesburg from R2,499. Redesigned notch display, MagSafe, Liquid Retina. AR coating, backlight, cracked panel repair. No Fix No Fee. Hyde Park.',
  alternates: { canonical: 'https://zasupport.com/screen-repair/macbook-air-m2' },
  keywords: [
    'MacBook Air M2 screen repair Johannesburg',
    'MacBook Air M2 display replacement Johannesburg',
    'MacBook Air M2 notch screen repair',
    'MacBook Air M2 Liquid Retina repair',
    'MacBook Air M2 cracked screen Johannesburg',
    'MacBook Air A2681 screen repair Johannesburg',
    'MacBook Air M2 screen repair Hyde Park',
    'MacBook Air M2 anti-reflective coating repair',
    'MacBook Air M2 backlight repair Johannesburg',
    'MacBook Air 15 inch M2 screen repair',
  ],
};

const breadcrumbItems = [
  { label: 'Screen Repair', href: '/screen-repair' },
  { label: 'MacBook Air', href: '/screen-repair/macbook-air' },
  { label: 'M2' },
];

const breadcrumbSchemaItems = [
  { name: 'Home', url: 'https://zasupport.com' },
  { name: 'Screen Repair', url: 'https://zasupport.com/screen-repair' },
  { name: 'MacBook Air', url: 'https://zasupport.com/screen-repair/macbook-air' },
  { name: 'MacBook Air M2', url: 'https://zasupport.com/screen-repair/macbook-air-m2' },
];

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'MacBook Air M2 Screen Repair Johannesburg',
  description:
    'Professional MacBook Air M2 screen repair in Johannesburg. Redesigned chassis, notch display, Liquid Retina 2560×1664 (13-inch) and 2880×1864 (15-inch). True Tone preserved. Assessment from R599. Up-to-3 year warranty.',
  provider: LOCAL_BUSINESS_PROVIDER,
  areaServed: { '@type': 'City', name: 'Johannesburg' },
  serviceType: 'Screen Repair',
  offers: {
    '@type': 'AggregateOffer',
    lowPrice: '2499',
    highPrice: '6999',
    priceCurrency: 'ZAR',
    offerCount: '5',
  },
};

const pricingRows = [
  { model: 'MacBook Air 13″ M2 (A2681, 2022)', panel: 'Liquid Retina 2560×1664 True Tone P3', from: 'R2,499', turnaround: '24–48 hrs' },
  { model: 'MacBook Air 15″ M2 (A2941, 2023)', panel: 'Liquid Retina 2880×1864 True Tone P3', from: 'R2,999', turnaround: '24–48 hrs' },
  { model: 'MacBook Air 13″ M3 (A3113, 2024)', panel: 'Liquid Retina 2560×1664 True Tone P3', from: 'R2,799', turnaround: '24–48 hrs' },
  { model: 'MacBook Air 15″ M3 (A3114, 2024)', panel: 'Liquid Retina 2880×1864 True Tone P3', from: 'R3,199', turnaround: '24–48 hrs' },
];

const faultTypes = [
  {
    title: 'Anti-Reflective Coating Delamination — Redesigned Chassis',
    icon: Eye,
    desc: 'The MacBook Air M2 uses a completely redesigned chassis — thinner, flat-sided, with sharper corners compared to the M1 Air. Apple also changed the display bezel design significantly, introducing the notch. Despite the redesign, the anti-reflective coating on the M2 Air Liquid Retina display is subject to the same delamination fault we see on the M1 model. The coating can be damaged by cleaning agents, alcohol-based wipes, or keyboard contact when the lid is closed. We see this fault regularly on both the 13-inch and 15-inch M2 Air variants. Display assembly replacement is required.',
    severity: 'high',
  },
  {
    title: 'Notch Display Fault — Camera and Sensor Failure',
    icon: Cpu,
    desc: 'The MacBook Air M2 introduced the display notch to the Air line — housing the 1080p FaceTime camera, TrueTone sensor, and ambient light sensor. These components connect via the display flex cable. A fault in the cable or a damaged connector at the logic board end can disable the camera independently of the main display — or produce a working camera with a dead display. The 15-inch M2 Air has a wider display panel and correspondingly longer flex cable, which we have seen develop strain faults at the hinge exit point on machines that have had a hinge impact.',
    severity: 'medium',
  },
  {
    title: 'Cracked Liquid Retina Panel',
    icon: AlertTriangle,
    desc: 'The M2 Air\'s redesigned chassis is thinner and lighter than the M1 model, which makes the lid slightly more susceptible to flex damage. A direct corner impact or bag pressure on the lid can crack the Liquid Retina panel. The 15-inch M2 Air (A2941/A3114) has a larger panel surface and is more vulnerable to distributed lid flex — a large bag with a hard spine pressing across the full width of the lid. We carry display assemblies for both 13-inch and 15-inch M2 Air variants and test every replacement before the machine is returned.',
    severity: 'high',
  },
  {
    title: 'Backlight Failure — MagSafe Charging Impact',
    icon: Zap,
    desc: 'The MacBook Air M2 reintroduced MagSafe charging after it was absent from the M1 model. While MagSafe is a safer connector than USB-C in terms of accidental disconnection, it does introduce a new potential failure mode: a forceful MagSafe connection or disconnection can create a voltage spike on the power rails. Combined with load shedding restoration surges, we see backlight driver failures on M2 Airs. The symptom is a completely black screen with the Mac otherwise running — the torch test confirms backlight failure if you can see the desktop under the light.',
    severity: 'high',
  },
  {
    title: 'True Tone Disabled After Incorrect Repair',
    icon: Monitor,
    desc: 'True Tone on the MacBook Air M2 stores calibration data in the display assembly, identical to the M1 Air and MacBook Pro models. If a previous repair replaced the display without migrating the sensor data, True Tone is permanently disabled — showing "Not Available" in System Settings. At ZA Support, we migrate True Tone calibration data as a standard step during every M2 Air display replacement. If your M2 Air is already in this state from a previous repair, we assess whether recalibration is possible as part of the repair process.',
    severity: 'low',
  },
  {
    title: '15-Inch Flex Cable Strain at Hinge',
    icon: AlertTriangle,
    desc: 'The MacBook Air 15-inch M2 (A2941) and M3 (A3114) are the largest Air models Apple has produced. The wider display assembly means the flex cable must span a greater distance through the hinge assembly. We have seen flex cable strain faults on the 15-inch M2 Air more frequently than on the 13-inch model — particularly on machines used in landscape orientation with the lid angled steeply (working with the Mac propped up on a stand). Intermittent display flickering or cutout at specific lid angles is the key symptom.',
    severity: 'medium',
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
    question: 'How much does MacBook Air M2 screen repair cost in Johannesburg?',
    answer:
      'MacBook Air M2 screen repair starts from R2,499 for the 13-inch model (A2681, 2022) and from R2,999 for the 15-inch model (A2941, 2023). M3 variants are R2,799 and R3,199 respectively. Apple Store charges R7,000 to R11,000 for the same repair. We provide a written fixed-price quote before any work begins — the price we quote is the price you pay.',
  },
  {
    question: 'What is different about the MacBook Air M2 display compared to the M1?',
    answer:
      'The MacBook Air M2 (2022) introduced a completely redesigned chassis — the first major Air redesign since 2010. Key display changes include: a display notch (housing a 1080p camera, up from 720p), a slightly larger 13.6-inch display (compared to 13.3-inch on the M1), a new panel resolution of 2560×1664 (vs 2560×1600 on M1), and a flatter, more angular chassis design. The 15-inch M2 Air (2023) uses a 2880×1864 resolution panel. Both support True Tone and P3 wide colour gamut.',
  },
  {
    question: 'Can you repair the MacBook Air M2 screen if the anti-reflective coating is damaged?',
    answer:
      'Yes. Anti-reflective coating delamination is one of the most common M2 Air screen faults we see in our Hyde Park workshop. The coating appears as smeared, cloudy, or mottled patches on the display surface — the screen itself is functioning correctly. The fix is a full display assembly replacement. We cannot re-apply the coating to the existing glass. Starting from R2,499 for the 13-inch model.',
  },
  {
    question: 'Does the MacBook Air M2 notch require special attention during screen repair?',
    answer:
      'Yes. The display notch houses the FaceTime camera, TrueTone sensor, and ambient light sensor — all connected via the display flex cable. During replacement, we confirm camera function and sensor connectivity before returning the machine. The most common error we see from previous repairs on M2 Airs is a camera that has been disabled because the flex cable was not routed correctly through the notch channel. We always test the camera on the lock screen before the machine leaves the workshop.',
  },
  {
    question: 'Is there a difference between MacBook Air M2 and M3 screen repair?',
    answer:
      'The M2 and M3 MacBook Air 13-inch use almost identical chassis designs, but the logic board layout and display connector routing changed between the A2681 (M2) and A3113 (M3). The display assembly part numbers are different — an M2 assembly is not compatible with an M3 model. Prices differ slightly due to assembly sourcing costs. We confirm your exact model number before ordering parts.',
  },
  {
    question: 'How long does MacBook Air M2 screen repair take?',
    answer:
      'MacBook Air M2 screen repairs are typically completed within 24 to 48 hours. We carry display assemblies for the A2681 (M2 13-inch) in stock at our Hyde Park workshop. The 15-inch variants (A2941 / A3114) may require sourcing and take up to 48 hours. We confirm stock availability and give you a specific ready time when you contact us on WhatsApp.',
  },
  {
    question: 'Will True Tone work after MacBook Air M2 screen replacement?',
    answer:
      'Yes. We migrate True Tone calibration data as a standard step in every M2 Air display replacement. After the repair, True Tone will show as active in System Settings and will adapt the display colour temperature to ambient lighting as intended. We have seen many M2 Airs where a previous repairer skipped this step — the machine works but True Tone is permanently unavailable. We can address this during a repair if it affects your machine.',
  },
  {
    question: 'Can I use my MacBook Air M2 with an external display if the built-in screen is broken?',
    answer:
      'Yes. The MacBook Air M2 supports external display output via Thunderbolt / USB 4 on both USB-C ports. The 15-inch M2 Air supports up to two external displays simultaneously when connected to a USB-C hub or Thunderbolt dock. You can operate the M2 Air in clamshell mode with the lid closed and continue working while the screen is repaired. We confirm external port function during assessment.',
  },
  {
    question: 'What is the display resolution on the MacBook Air 15-inch M2?',
    answer:
      'The MacBook Air 15-inch M2 (A2941, 2023) uses a Liquid Retina display at 2880×1864 resolution — 224 ppi. It is a larger panel than the 13-inch (2560×1664, 224 ppi) but uses the same IPS LCD technology. Both panels support True Tone, P3 wide colour gamut, and 500 nits peak brightness. The 15-inch display assembly is larger and slightly more expensive to source and replace.',
  },
  {
    question: 'My MacBook Air M2 screen has a dark patch in one corner — is this repairable?',
    answer:
      'A dark patch in the corner of a MacBook Air M2 display typically indicates either a cracked panel (where the impact point is at the corner but the crack has not spread visibly), early delamination of the display bonding layer, or a display cable fault producing a localised signal dropout. We distinguish these during assessment — a cable fault is the most cost-effective repair. We always check the cable before recommending a full display assembly replacement.',
  },
  {
    question: 'Does MagSafe on the M2 Air affect screen repair in any way?',
    answer:
      'MagSafe itself does not affect the display assembly. However, a forceful MagSafe connection event or a surge on the MagSafe charging circuit can occasionally affect the backlight driver on the logic board — the same load shedding fault pattern we see on all MacBook models in South Africa. If your M2 Air developed a black screen after a charging event, bring it in for assessment. We run a torch test immediately to determine whether it is a backlight fault or a logic board GPU issue.',
  },
];

const faqSchema = buildFaqSchema(faqs);
const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbSchemaItems);

export default function ScreenRepairMacBookAirM2Page() {
  const whatsappUrl = buildWhatsAppUrl('SCR-AIRM2-HERO', 'screen-repair');

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
              MacBook Air M2 Screen Repair
              <br /><span className="text-[#0FEA7A]">Johannesburg</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-4 max-w-3xl leading-relaxed">
              The redesigned Air with notch display, MagSafe, and a flat-sided chassis — repaired at our Hyde Park workshop. 13-inch and 15-inch M2 and M3 Air models. AR coating, cracked panels, backlight faults, True Tone preserved. Assessment from R599.
            </p>
            <div className="flex items-center gap-2 text-[#7A9E98] text-sm mb-8">
              <MapPin className="w-4 h-4 text-[#0FEA7A]" />
              <span>1 Hyde Lane, Hyde Park, Office E2004, JHB 2196 | MacBook Air M2 screen from R2,499 | 24–48 hr turnaround</span>
            </div>
            <div className="flex flex-wrap gap-3 mb-8">
              {[
                { icon: Shield, label: 'No Fix No Fee' },
                { icon: Monitor, label: '13″ + 15″ M2/M3 Air' },
                { icon: Cpu, label: 'Notch Camera Verified' },
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
                { value: '600+', label: 'MacBook Air M2/M3 Screens Repaired' },
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
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4">MacBook Air M2 Screen Repair Pricing</h2>
          <p className="text-[#7A9E98] mb-8 max-w-3xl leading-relaxed">
            All prices include the display assembly, labour, and our up-to-3 year warranty. Apple Store charges R7,000 to R11,000 for the same repair. We provide a written fixed-price quote before any work begins.
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
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4">MacBook Air M2 Display — What Changed and Why It Matters</h2>
          <div className="space-y-4 text-[#7A9E98] leading-relaxed">
            <p>
              The MacBook Air M2 (2022) was the first complete redesign of the Air chassis in over a decade. Apple moved to a flat-sided design, returned MagSafe charging, enlarged the display to 13.6 inches, added the notch, and upgraded the FaceTime camera to 1080p. The following year brought the 15-inch M2 Air — the largest non-Pro MacBook available.
            </p>
            <p>
              In our Hyde Park workshop, the M2 Air has become one of our most frequently repaired models. The anti-reflective coating delamination fault that affects the M1 Air is equally present on the M2 model — and in some cases more pronounced due to the slightly different glass composition on the notch display. We see this fault on machines that have been cleaned with standard household glass cleaner even once.
            </p>
            <p>
              The notch adds a repair consideration that the M1 Air does not have. When we replace the display assembly on an M2 Air, we specifically test the 1080p FaceTime camera function, the TrueTone sensor, and the ambient light sensor before returning the machine. The camera module connects via the display flex cable through a routing channel in the notch frame — incorrect routing disables the camera without any display symptom. We have seen machines from other repairers where the camera was dead post-repair because this step was skipped.
            </p>
            <p>
              The 15-inch M2 Air (A2941) introduced a wider display panel with a longer flex cable span through the hinge assembly. We have seen a small but notable incidence of flex cable strain faults on 15-inch M2 Airs that are used on stands at steep angles — the cable bend radius at the hinge exit is more pronounced on the wider assembly. This is something we look for during assessment on any 15-inch M2 Air presenting with intermittent display faults.
            </p>
          </div>
          <div className="mt-6">
            <a
              href="https://www.ifixit.com/Teardown/MacBook_Air_15_M2_2023_Teardown/160664"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[#0FEA7A] text-sm font-semibold hover:underline"
            >
              iFixit MacBook Air 15-inch M2 teardown <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Common Faults */}
      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4">MacBook Air M2 Screen Faults We Repair</h2>
          <p className="text-[#7A9E98] mb-10 max-w-3xl leading-relaxed">
            Every fault below is a repairable condition on the MacBook Air M2 and M3 Air models. We diagnose the precise cause before recommending any part replacement.
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
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-4">Apple iStore vs ZA Support: MacBook Air M2 Screen Repair</h2>
          <p className="text-[#7A9E98] mb-8 leading-relaxed">
            Apple charges R7,000 to R11,000 for MacBook Air M2 screen repair. We charge a fraction of that — with the same or better warranty and faster turnaround.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            <div className="glass-card p-6 border border-red-500/20">
              <h3 className="text-red-400 font-bold mb-4">Apple Store / iStore</h3>
              <ul className="text-[#7A9E98] text-sm space-y-2.5">
                <li>Display assembly replacement — R7,000 to R11,000+</li>
                <li>AR coating damage not covered by standard warranty</li>
                <li>Turnaround 5–10 business days via Apple depot</li>
                <li>True Tone requires Apple Configurator re-pair</li>
                <li>No flex cable diagnosis before assembly swap</li>
                <li>Camera verified using Apple Diagnostics only</li>
              </ul>
            </div>
            <div className="glass-card p-6 border border-[rgba(15,234,122,0.3)]">
              <h3 className="text-[#0FEA7A] font-bold mb-4">ZA Support</h3>
              <ul className="text-[#7A9E98] text-sm space-y-2.5">
                <li>MacBook Air M2 screen from R2,499</li>
                <li>True Tone data migrated as standard</li>
                <li>Camera and notch sensors tested post-repair</li>
                <li>Turnaround 24–48 hours from drop-off</li>
                <li>Flex cable diagnosed before assembly replacement</li>
                <li>Up-to-3 year warranty on all completed repairs</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Service Area */}
      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-4">MacBook Air M2 Screen Repair — Johannesburg Service Area</h2>
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
          <FAQAccordion items={faqs} title="MacBook Air M2 Screen Repair — Common Questions" />
        </div>
      </section>

      {/* Related Services */}
      <section className="py-8 sm:py-16 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#E8F4F1] mb-6">Related Repairs</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              { label: 'All Screen Repairs', href: '/screen-repair' },
              { label: 'MacBook Air Screen Repair', href: '/screen-repair/macbook-air' },
              { label: 'MacBook Air M1 Screen', href: '/screen-repair/macbook-air-m1' },
              { label: 'MacBook Pro Screen Repair', href: '/screen-repair/macbook-pro' },
              { label: 'Logic Board — MacBook Air M2', href: '/logic-board-repair/macbook-air-m2' },
              { label: 'MacBook Air Liquid Damage', href: '/liquid-damage' },
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
