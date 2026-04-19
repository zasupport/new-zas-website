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
  title: 'MacBook Air M1 Screen Repair Johannesburg [2026] | From R2,499 | ZA Support',
  description:
    'MacBook Air M1 screen repair Johannesburg from R2,499. Liquid Retina display, fanless design, True Tone. Backlight repair, cracked panel, anti-reflective coating. No Fix No Fee.',
  alternates: { canonical: 'https://zasupport.com/screen-repair/macbook-air-m1' },
  keywords: [
    'MacBook Air M1 screen repair Johannesburg',
    'MacBook Air M1 display replacement Johannesburg',
    'MacBook Air M1 Liquid Retina repair',
    'MacBook Air M1 cracked screen Johannesburg',
    'MacBook Air M1 backlight repair',
    'MacBook Air A2337 screen repair Johannesburg',
    'MacBook Air M1 screen repair Hyde Park',
    'Apple Silicon MacBook Air screen repair',
    'MacBook Air M1 anti-reflective coating repair',
    'fanless MacBook Air screen repair Johannesburg',
  ],
};

const breadcrumbItems = [
  { label: 'Screen Repair', href: '/screen-repair' },
  { label: 'MacBook Air', href: '/screen-repair/macbook-air' },
  { label: 'M1' },
];

const breadcrumbSchemaItems = [
  { name: 'Home', url: 'https://zasupport.com' },
  { name: 'Screen Repair', url: 'https://zasupport.com/screen-repair' },
  { name: 'MacBook Air', url: 'https://zasupport.com/screen-repair/macbook-air' },
  { name: 'MacBook Air M1', url: 'https://zasupport.com/screen-repair/macbook-air-m1' },
];

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'MacBook Air M1 Screen Repair Johannesburg',
  description:
    'Professional MacBook Air M1 screen repair in Johannesburg. Liquid Retina 2560×1600, True Tone, P3 wide colour. Fanless design considerations. Assessment from R599. Up-to-3 year warranty.',
  provider: LOCAL_BUSINESS_PROVIDER,
  areaServed: { '@type': 'City', name: 'Johannesburg' },
  serviceType: 'Screen Repair',
  offers: {
    '@type': 'AggregateOffer',
    lowPrice: '2499',
    highPrice: '5999',
    priceCurrency: 'ZAR',
    offerCount: '4',
  },
};

const pricingRows = [
  { model: 'MacBook Air M1 (A2337, Late 2020)', panel: 'IPS LCD Liquid Retina 2560×1600 True Tone', from: 'R2,499', turnaround: '24–48 hrs' },
  { model: 'MacBook Air M1 — display cable replacement', panel: 'Flex cable only (no panel swap)', from: 'R1,499', turnaround: '24 hrs' },
  { model: 'MacBook Air M1 — anti-reflective coating', panel: 'AR coating delamination', from: 'R2,499', turnaround: '24–48 hrs' },
];

const faultTypes = [
  {
    title: 'Anti-Reflective Coating Delamination',
    icon: Eye,
    desc: 'This is the most common screen complaint we see on MacBook Air M1 machines in our Hyde Park workshop. The anti-reflective coating on the 2020 MacBook Air M1 Liquid Retina display can delaminate — creating a blotchy, smeared, or cloudy appearance across the glass surface. The display itself is functioning perfectly; the coating has simply separated from the glass. This happens through contact with cleaning products containing alcohol or acetone, microfibre cloths that are slightly rough, or even prolonged contact with the keyboard (closing the lid causes the keyboard keys to touch the screen). Display assembly replacement is required.',
    severity: 'high',
  },
  {
    title: 'Backlight Failure — Fanless Thermal Profile',
    icon: Zap,
    desc: 'The MacBook Air M1 is a fully fanless machine. Under sustained load, the chassis temperature rises higher and faster than a MacBook Pro, and the display backlight circuit on the logic board is exposed to this elevated thermal environment. Load shedding voltage surges are the primary external cause of backlight failure — but sustained thermal stress is a secondary contributing factor on the M1 Air in South Africa, where ambient temperatures are high and load shedding means the Mac is regularly pushed hard on battery during power outages. A black screen with faint desktop visible under torchlight indicates backlight failure. This is typically a logic board component repair.',
    severity: 'high',
  },
  {
    title: 'Cracked Liquid Retina Panel',
    icon: AlertTriangle,
    desc: 'The MacBook Air M1 uses a thinner, lighter chassis than any MacBook Pro, which makes it more susceptible to lid flex damage from bag pressure. A single point of pressure — a hard object in a bag resting on the closed lid — can crack the Liquid Retina panel without any visible external impact on the outer lid surface. The crack may be invisible from the back of the machine but clearly visible on the display. Panel replacement requires the full display assembly to be replaced as a bonded unit.',
    severity: 'high',
  },
  {
    title: 'True Tone Disabled After Previous Repair',
    icon: Monitor,
    desc: 'The MacBook Air M1 includes True Tone, which adjusts the display\'s colour temperature to match ambient lighting. True Tone calibration data is stored in the display assembly. An incorrect replacement that does not carry this data across leaves True Tone permanently showing "Not Available" in System Settings. At ZA Support, we migrate True Tone calibration data during every display replacement on the M1 Air — it is a standard step in our process, not an optional extra.',
    severity: 'low',
  },
  {
    title: 'Display Flex Cable Fault',
    icon: Cpu,
    desc: 'The MacBook Air M1 display flex cable routes through a hinge assembly that Apple redesigned from the Intel Air models. The cable is more flexible, but it remains a single point of failure — micro-fractures can develop from repeated opening and closing, or from a physical impact to the hinge area. Flickering that correlates with lid angle, or a display that cuts out when opened past a certain point, strongly suggests a cable fault. We always test the cable before recommending a full display assembly replacement, as a cable-only repair is significantly less expensive.',
    severity: 'medium',
  },
  {
    title: 'GPU Output Fault — Black Screen on Startup',
    icon: AlertTriangle,
    desc: 'Unlike Intel MacBook Airs, the M1 does not have a discrete GPU that can fail independently. However, the unified memory architecture means that a logic board fault affecting the GPU cores can produce a black screen on startup — similar to a backlight fault in symptom. We distinguish these by the torch test: if the desktop is visible under torchlight, the backlight circuit has failed and the logic board is otherwise healthy. If nothing is visible under torchlight, the GPU output itself may be at fault — a more complex logic board repair.',
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
    question: 'How much does MacBook Air M1 screen repair cost in Johannesburg?',
    answer:
      'MacBook Air M1 screen repair starts from R2,499 for a full display assembly replacement (A2337). If the fault is isolated to the display flex cable, the repair starts from R1,499. Anti-reflective coating delamination — where the display functions correctly but the coating has failed — also starts from R2,499. Apple Store charges R6,000 to R9,000 for the same repair. We provide a written fixed-price quote before any work begins.',
  },
  {
    question: 'My MacBook Air M1 screen looks smeared or cloudy — is this repairable?',
    answer:
      'Yes. This is anti-reflective coating delamination — one of the most common MacBook Air M1 screen complaints we see. The coating on the 2020 Liquid Retina display is relatively fragile and can delaminate through contact with cleaning agents, rough cloths, or even keyboard-to-screen contact when the lid is closed with something between them. The display itself is functioning perfectly. The fix is a display assembly replacement; we cannot re-apply the AR coating to the existing glass. Starting from R2,499.',
  },
  {
    question: 'Does the MacBook Air M1 have the flexgate problem?',
    answer:
      'No. Flexgate was specific to the 2016 and 2017 MacBook Pro 13-inch and 15-inch models. The MacBook Air M1 uses a different hinge and display cable design that does not repeat the flexgate fault pattern. However, the display flex cable on the M1 Air can still develop faults — particularly micro-fractures from sustained physical stress or hinge impact. The symptom is intermittent display cutout or flickering at certain lid angles, which we resolve with cable replacement.',
  },
  {
    question: 'My MacBook Air M1 screen is black but it is still running — what is wrong?',
    answer:
      'Hold a torch up to the display at an angle. If you can faintly see your desktop, the Mac is running normally but the backlight has failed. The MacBook Air M1 backlight circuit sits on the logic board — this is a component-level repair. The M1 Air is fanless, so the logic board runs hotter than a MacBook Pro under sustained load, and the backlight driver can be affected by both load shedding voltage surges and prolonged thermal stress. If the torch test shows nothing, the fault may be in the display panel or the GPU cores on the M1 chip — we diagnose this at assessment.',
  },
  {
    question: 'Will True Tone work after MacBook Air M1 screen repair?',
    answer:
      'Yes. We migrate True Tone calibration data to the replacement display assembly as a standard part of every M1 Air screen repair. Your MacBook Air M1 will show True Tone as active in System Settings after the repair — it will not show "Not Available". This is something many budget repairers skip, leaving the Mac permanently unable to adapt to ambient lighting.',
  },
  {
    question: 'How long does MacBook Air M1 screen repair take?',
    answer:
      'MacBook Air M1 screen repairs are typically completed within 24 to 48 hours. We carry display assemblies for the A2337 in our Hyde Park workshop for most configurations. Flex cable-only repairs are usually completed on the same day. We will confirm stock availability and give you a specific ready time when you contact us on WhatsApp.',
  },
  {
    question: 'Is the MacBook Air M1 screen repair different from Intel MacBook Air models?',
    answer:
      'Yes, in several ways. The M1 Air (A2337) uses a different logic board layout and display cable routing compared to the Intel models (A1932, A2179). The M1 also uses a fanless thermal design, which affects how we approach logic board work alongside any screen repair. The display assembly part number changed with the M1 transition, so Intel Air assemblies are not compatible with the M1 model. We carry model-specific parts for both generations.',
  },
  {
    question: 'Can my MacBook Air M1 run on an external display if the screen is broken?',
    answer:
      'Yes. The MacBook Air M1 has two Thunderbolt / USB 4 ports that support external display output. You can connect a monitor, close the lid, and operate the Mac in clamshell mode while waiting for the screen repair. At ZA Support, we confirm external display output is functioning before you leave the workshop if you bring the machine in with a cracked or dead screen.',
  },
  {
    question: 'My MacBook Air M1 has lines or discolouration on the screen — what causes this?',
    answer:
      'Horizontal or vertical lines on the MacBook Air M1 display indicate a signal fault in the display chain. Most commonly, this is the display flex cable — a partially fractured cable produces incorrect row or column addressing on the LCD matrix. We connect an external display to confirm whether the GPU output is clean before attributing the fault to the cable or panel. If the external display is clean, the fault is isolated to the display assembly or cable.',
  },
  {
    question: 'Is it worth repairing a MacBook Air M1 screen?',
    answer:
      'Almost always yes. The MacBook Air M1 is an exceptionally capable machine that holds its value well — the M1 chip is still among the most efficient processors available. A screen repair at R2,499 to R3,499 restores the machine to full function, compared to the cost of a replacement M2 or M3 Air. Many of our clients in Sandton, Rosebank, and Fourways have repaired M1 Airs that are 3 to 4 years old and plan to keep using them for several more years.',
  },
  {
    question: 'What cleaning products should I avoid on my MacBook Air M1 screen?',
    answer:
      'Avoid any product containing alcohol, acetone, or other solvents — including most household glass cleaners, hand sanitiser, and cleaning wipes not specifically designed for displays. Apple recommends a dry lint-free cloth or a cloth slightly dampened with water only. Even Apple-branded polishing cloths should be used with minimal pressure. The AR coating on the MacBook Air M1 Liquid Retina display is more fragile than it appears and will delaminate with repeated chemical exposure.',
  },
];

const faqSchema = buildFaqSchema(faqs);
const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbSchemaItems);

export default function ScreenRepairMacBookAirM1Page() {
  const whatsappUrl = buildWhatsAppUrl('SCR-AIRM1-HERO', 'screen-repair');

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
              MacBook Air M1 Screen Repair
              <br /><span className="text-[#0FEA7A]">Johannesburg</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-4 max-w-3xl leading-relaxed">
              The first Apple Silicon MacBook Air — and one of the most common screens we repair in our Hyde Park workshop. AR coating delamination, backlight failure, cracked Liquid Retina panels. True Tone preserved on every repair. Assessment from R599.
            </p>
            <div className="flex items-center gap-2 text-[#7A9E98] text-sm mb-8">
              <MapPin className="w-4 h-4 text-[#0FEA7A]" />
              <span>1 Hyde Lane, Hyde Park, Office E2004, JHB 2196 | MacBook Air M1 screen from R2,499 | 24–48 hr turnaround</span>
            </div>
            <div className="flex flex-wrap gap-3 mb-8">
              {[
                { icon: Shield, label: 'No Fix No Fee' },
                { icon: Monitor, label: 'All M1 Air Faults' },
                { icon: Cpu, label: 'True Tone Preserved' },
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
                { value: '800+', label: 'MacBook Air M1 Screens Repaired' },
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
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4">MacBook Air M1 Screen Repair Pricing</h2>
          <p className="text-[#7A9E98] mb-8 max-w-3xl leading-relaxed">
            All prices include parts, labour, and our up-to-3 year warranty. Apple Store charges R6,000 to R9,000 for the same repair. We provide a written fixed-price quote before any work begins.
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
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4">MacBook Air M1 Display — The First Apple Silicon Air</h2>
          <div className="space-y-4 text-[#7A9E98] leading-relaxed">
            <p>
              The MacBook Air M1 (A2337, late 2020) was the first Apple Silicon Mac available to the public. It uses the same IPS LCD Liquid Retina display as the final Intel Air models — 2560×1600 at 227 ppi — but with a new logic board layout and fanless thermal design that changes how we approach display-adjacent repairs.
            </p>
            <p>
              In our Hyde Park workshop, the MacBook Air M1 is the most frequently repaired Air model we see. The primary fault pattern is anti-reflective coating delamination. Apple used a relatively thin AR coating on the M1 Air display that is easily damaged by cleaning products, alcohol-based wipes, or sustained contact with the keyboard when the lid is closed. We see this fault weekly — more so than cracked panels or backlight failures. The fix is a full display assembly replacement.
            </p>
            <p>
              The fanless design of the M1 Air creates a unique thermal environment for the display backlight circuit. Without active cooling, the logic board reaches higher temperatures under load than any MacBook Pro equivalent. Combined with South Africa's load shedding patterns — where the Mac is pushed hard on battery during outages, then immediately subjected to a voltage surge on grid restoration — backlight driver IC failures on M1 Airs are a regular occurrence in our workshop.
            </p>
            <p>
              True Tone on the M1 Air works identically to the MacBook Pro — calibration data is stored in the display assembly and must be migrated during replacement. We do this as a standard step. What surprises many clients is how visible the difference is: a MacBook Air M1 with True Tone working correctly adapts its white point naturally to the ambient light in your office or home, reducing eye strain significantly over a full workday.
            </p>
            <p>
              For context on the M1 Air's repairability, iFixit's teardown provides a useful overview of the assembly architecture. The M1 Air's display assembly is more accessible than the Intel models in some respects, but the unified memory logic board design means any logic board repair alongside a screen repair requires careful handling of the SoC thermal management.
            </p>
          </div>
          <div className="mt-6">
            <a
              href="https://www.ifixit.com/Teardown/MacBook_Air_M1_(A2337)_Teardown/139672"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[#0FEA7A] text-sm font-semibold hover:underline"
            >
              iFixit MacBook Air M1 teardown <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Common Faults */}
      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4">MacBook Air M1 Screen Faults We Repair</h2>
          <p className="text-[#7A9E98] mb-10 max-w-3xl leading-relaxed">
            Every fault below is a repairable condition on the MacBook Air M1. We diagnose the root cause before recommending any part replacement.
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
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-4">Apple iStore vs ZA Support: MacBook Air M1 Screen Repair</h2>
          <p className="text-[#7A9E98] mb-8 leading-relaxed">
            Apple replaces the full display assembly and charges R6,000 to R9,000. We diagnose the specific fault and charge significantly less — with a warranty that is often longer than any remaining AppleCare+.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            <div className="glass-card p-6 border border-red-500/20">
              <h3 className="text-red-400 font-bold mb-4">Apple Store / iStore</h3>
              <ul className="text-[#7A9E98] text-sm space-y-2.5">
                <li>Display assembly replacement — R6,000 to R9,000+</li>
                <li>AR coating damage not covered by standard warranty</li>
                <li>Turnaround 5–10 business days via Apple depot</li>
                <li>True Tone requires Apple Configurator re-pair</li>
                <li>No flex cable diagnosis before assembly swap</li>
                <li>Full assembly replaced even for cable-only faults</li>
              </ul>
            </div>
            <div className="glass-card p-6 border border-[rgba(15,234,122,0.3)]">
              <h3 className="text-[#0FEA7A] font-bold mb-4">ZA Support</h3>
              <ul className="text-[#7A9E98] text-sm space-y-2.5">
                <li>MacBook Air M1 screen from R2,499</li>
                <li>Cable-only repair from R1,499 where appropriate</li>
                <li>True Tone data migrated as standard</li>
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
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-4">MacBook Air M1 Screen Repair — Johannesburg Service Area</h2>
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
          <FAQAccordion items={faqs} title="MacBook Air M1 Screen Repair — Common Questions" />
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
              { label: 'MacBook Air M2 Screen', href: '/screen-repair/macbook-air-m2' },
              { label: 'MacBook Pro Screen Repair', href: '/screen-repair/macbook-pro' },
              { label: 'Logic Board — MacBook Air M1', href: '/logic-board-repair/macbook-air-m1' },
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
