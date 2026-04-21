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
import PricingRange from '@/components/PricingRange';

export const metadata: Metadata = {
  title: 'Mac Mini Screen & Display Repair Johannesburg 2026 | From R899 | ZA Support',
  description:
    'Mac Mini display repair in Johannesburg from R899. HDMI, Thunderbolt, GPU faults, external monitor issues. M1, M2, M4. From R599 assessment. Hyde Park workshop.',
  alternates: { canonical: 'https://zasupport.com/screen-repair/mac-mini' },
  keywords: [
    'Mac Mini display repair Johannesburg',
    'Mac Mini no display output Johannesburg',
    'Mac Mini HDMI not working Johannesburg',
    'Mac Mini Thunderbolt no signal Johannesburg',
    'Mac Mini M1 display problem Johannesburg',
    'Mac Mini M2 display repair Johannesburg',
    'Mac Mini M4 Pro display repair',
    'Mac Mini external monitor not working Johannesburg',
    'Mac Mini GPU fault repair Hyde Park',
    'Mac Mini black screen repair Johannesburg',
  ],
};

const breadcrumbItems = [
  { label: 'Screen Repair', href: '/screen-repair' },
  { label: 'Mac Mini' },
];

const breadcrumbSchemaItems = [
  { name: 'Home', url: 'https://zasupport.com' },
  { name: 'Screen Repair', url: 'https://zasupport.com/screen-repair' },
  { name: 'Mac Mini', url: 'https://zasupport.com/screen-repair/mac-mini' },
];

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Mac Mini Screen & Display Repair Johannesburg',
  description:
    'Professional Mac Mini display output diagnosis and repair in Johannesburg. HDMI controller IC, Thunderbolt 3/4 port faults, GPU output failure, T-CON board issues, external monitor troubleshooting. All Mac Mini generations from 2012 to M4 Pro. Assessment from R899. 12-month warranty.',
  provider: LOCAL_BUSINESS_PROVIDER,
  areaServed: { '@type': 'City', name: 'Johannesburg' },
  serviceType: 'Screen & Display Repair',
};

const pricingRows = [
  { model: 'Mac Mini (Late 2012 – Late 2014)', port: 'HDMI 1.4 + Thunderbolt 2', from: 'R899', turnaround: '24–48 hrs' },
  { model: 'Mac Mini (Late 2014 – Intel 2018)', port: 'HDMI 2.0 + Thunderbolt 2/3', from: 'R1,199', turnaround: '24–48 hrs' },
  { model: 'Mac Mini M1 (2020)', port: 'HDMI 2.0 + Thunderbolt 3 (×2)', from: 'R1,499', turnaround: '24–72 hrs' },
  { model: 'Mac Mini M2 (2023)', port: 'HDMI 2.0 + Thunderbolt 4 (×2)', from: 'R1,499', turnaround: '24–72 hrs' },
  { model: 'Mac Mini M2 Pro (2023)', port: 'HDMI 2.1 + Thunderbolt 4 (×3)', from: 'R1,999', turnaround: '48–72 hrs' },
  { model: 'Mac Mini M4 (2024)', port: 'HDMI 2.1 + Thunderbolt 4 (×3)', from: 'R1,999', turnaround: '48–72 hrs' },
  { model: 'Mac Mini M4 Pro (2024)', port: 'HDMI 2.1 + Thunderbolt 5 (×3)', from: 'R2,499', turnaround: '48–72 hrs' },
];

const faultTypes = [
  {
    title: 'HDMI Controller IC Failure — No Signal to Monitor',
    icon: AlertTriangle,
    desc: 'The most common Mac Mini display fault we see in our Hyde Park workshop. The HDMI controller IC on the logic board fails silently — the Mac Mini boots normally (you hear the startup chime or feel the fan), but the connected monitor shows "No Signal." On Intel Mac Minis (2012–2018), the HDMI controller sits alongside the GPU on the PCH. A single load shedding surge event can damage this IC without affecting any other component. We diagnose by testing both HDMI and Thunderbolt outputs independently. If only one output path is dead, the fault is isolated to the controller — a component-level repair that is far cheaper than a full logic board replacement.',
    severity: 'high',
  },
  {
    title: 'Thunderbolt 3/4 Port Damage — Physical or Electrical',
    icon: Zap,
    desc: 'Thunderbolt ports on the Mac Mini carry both display and data signals over the same USB-C connector. A bent pin inside the port, liquid ingress from a spill near the desk, or an electrical surge through a cheap dock can disable display output while data transfer still works — or vice versa. On M1 and M2 Mac Minis, each Thunderbolt controller is soldered to the logic board. We have the micro-soldering equipment to replace individual port assemblies and the retimer ICs that sit between the Thunderbolt controller and the physical connector. This saves clients the cost of a full board swap.',
    severity: 'high',
  },
  {
    title: 'GPU Output Fault — Garbled or Artefacted Display',
    icon: Monitor,
    desc: 'Visual artefacts — blocks of colour, horizontal tearing, or a screen that freezes seconds after boot — point to a GPU fault. On the Intel Mac Mini (2012–2018), the integrated Intel HD or Iris graphics share the CPU die, so a GPU fault typically means a CPU/GPU BGA reflow or replacement. On Apple Silicon Mac Minis (M1, M2, M4), the GPU is part of the SoC. We test with an external display connected via both HDMI and Thunderbolt to isolate whether the fault is in the GPU core, a specific display controller lane, or the port hardware. Diagnosis determines whether a component-level repair is viable or a logic board replacement is required.',
    severity: 'medium',
  },
  {
    title: 'Multi-Monitor Configuration Failure',
    icon: Eye,
    desc: 'The M1 Mac Mini natively supports one external display via HDMI and one via Thunderbolt — a hard limitation of the M1 chip. Clients regularly bring machines to us believing they have a hardware fault when the issue is actually a firmware or configuration limitation. The M2 Pro and M4 Pro models support up to three external displays natively. We verify the hardware capability of your specific model, test each port independently, and configure the correct display arrangement in System Settings. If a port is genuinely failing, we repair it. If the limitation is architectural, we explain the options honestly — including DisplayLink adapters where appropriate.',
    severity: 'low',
  },
  {
    title: 'T-CON Board Signal Fault — Lines on External Display',
    icon: Monitor,
    desc: 'When horizontal or vertical lines appear on an external monitor connected to your Mac Mini but the same monitor works perfectly with another device, the fault lies in the Mac Mini display output chain. The T-CON (timing controller) logic within the HDMI or Thunderbolt output path is generating incorrect row-addressing signals. On Intel Mac Minis, this can be a failing HDMI transmitter IC. On Apple Silicon models, it may indicate a damaged display controller lane within the SoC. We run a full output diagnostic across both ports and multiple resolutions before recommending a repair path.',
    severity: 'medium',
  },
  {
    title: 'Load Shedding Surge — Display Output Destroyed',
    icon: AlertTriangle,
    desc: 'South Africa\'s load shedding schedule creates a uniquely destructive pattern for Mac Mini display hardware. When Eskom power returns after an outage, the voltage spike can propagate through the power supply unit and reach the HDMI or Thunderbolt controller ICs before the internal voltage regulator stabilises. We see this fault weekly in Johannesburg — a Mac Mini that was working perfectly before a scheduled outage now produces no display output at all. The logic board is otherwise fine. We replace the damaged controller IC or retimer chip at component level, typically for under R2,000. A UPS with surge protection is the single best investment for any Mac Mini owner in South Africa.',
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
    question: 'How much does Mac Mini display repair cost in Johannesburg?',
    answer:
      'Mac Mini display repair starts from R899 for older Intel models (2012–2018) and from R1,499 for Apple Silicon models (M1, M2). The M2 Pro and M4 Pro models start from R1,999 due to the more complex display controller architecture. The final price depends on whether the fault is in the HDMI controller IC, a Thunderbolt retimer chip, the GPU output path, or the port hardware itself. Apple charges R4,500 to R9,000 for a logic board replacement on a Mac Mini — we diagnose the specific fault and repair only what is necessary. Written fixed-price quote before any work begins.',
  },
  {
    question: 'My Mac Mini has no display output after load shedding — can you fix it?',
    answer:
      'Yes, this is one of the most common Mac Mini faults we repair in Johannesburg. When Eskom power returns after a load shedding outage, the voltage surge can damage the HDMI controller IC or Thunderbolt retimer chip on the logic board. The Mac Mini boots normally — you may hear the startup chime and feel the fan — but produces no video output. We repair this at component level, replacing only the damaged IC. The cost is typically under R2,000, compared to R4,500 or more for a full logic board replacement at the Apple Store. We strongly recommend a UPS with surge protection for all Mac Mini users in South Africa.',
  },
  {
    question: 'My Mac Mini shows a garbled or artefacted display — is this a GPU fault?',
    answer:
      'Most likely. Visual artefacts — colour blocks, horizontal tearing, or a display that freezes shortly after booting — indicate a GPU output fault. On Intel Mac Minis, the GPU is integrated into the CPU package. On Apple Silicon Mac Minis, the GPU is part of the M-series SoC. We test with external displays connected via both HDMI and Thunderbolt to isolate whether the fault is in the GPU core, a specific display controller lane, or the port itself. Diagnosis determines whether a component-level repair or a logic board replacement is the appropriate path. Assessment from R899.',
  },
  {
    question: 'Can you repair a damaged HDMI or Thunderbolt port on a Mac Mini?',
    answer:
      'Yes. Bent pins, liquid ingress, and electrical surge damage are the three most common causes of port failure on the Mac Mini. On Apple Silicon models (M1, M2, M4), the Thunderbolt controller and retimer ICs are soldered directly to the logic board. We have the micro-soldering equipment to replace individual port assemblies and the supporting ICs without swapping the entire board. HDMI port replacement on Intel Mac Minis is more straightforward — the port is a separate component that can be desoldered and replaced. Both repairs are covered by our 12-month warranty.',
  },
  {
    question: 'Why does my Mac Mini M1 only support one external display via Thunderbolt?',
    answer:
      'The M1 chip has a hardware limitation that restricts native display output to one display via Thunderbolt and one via HDMI — two external monitors total, but only one per output type. This is not a fault; it is an architectural constraint of the M1 silicon. Clients frequently bring M1 Mac Minis to us believing a port is broken when the second Thunderbolt display simply will not activate. The M2 Pro, M4, and M4 Pro models support up to three external displays natively. If you need more displays on an M1, a DisplayLink adapter is the workaround — we can advise on the best option for your setup.',
  },
  {
    question: 'How do I know if my Mac Mini display problem is a hardware fault or a software issue?',
    answer:
      'The quickest test is to boot into macOS Recovery (hold Command+R on Intel, or hold the power button on Apple Silicon). If the display works normally in Recovery mode, the fault is software — a driver conflict, display configuration error, or corrupted NVRAM. If the display fault persists in Recovery, or there is no display output at all, the fault is hardware. You can also try a different cable and a different monitor. If neither resolves it, bring the Mac Mini to our Hyde Park workshop for a full hardware diagnostic. Assessment from R899, applied toward the repair if you proceed.',
  },
  {
    question: 'Does Mac Mini display repair come with a warranty?',
    answer:
      'Every Mac Mini display repair we complete carries a 12-month warranty covering both the replacement component and our labour. If the same fault recurs within the warranty period, we repair it again at from R599. Our From R599 assessment policy also applies — if we cannot resolve your Mac Mini display fault, an assessment fee of R899 applies and your machine is returned exactly as we received it.',
  },
  {
    question: 'How long does Mac Mini display repair take?',
    answer:
      'Intel Mac Mini display repairs (HDMI port replacement, controller IC repair) are typically completed within 24 to 48 hours. Apple Silicon Mac Mini repairs (M1, M2, M4) take 24 to 72 hours depending on whether the fault is in the port hardware, a retimer IC, or the display controller within the SoC. We confirm a specific turnaround time when you bring the machine in or contact us on WhatsApp. Collection and return is available for clients in Sandton, Rosebank, Bryanston, Fourways, and surrounding Johannesburg suburbs.',
  },
  {
    question: 'Can I use a Mac Mini with a cracked external monitor?',
    answer:
      'A cracked external monitor is a monitor fault, not a Mac Mini fault. If the monitor panel is damaged, you need to replace the monitor rather than repair the Mac Mini. However, if the monitor developed display issues — flickering, lines, colour distortion — specifically when connected to your Mac Mini and works fine with other devices, the fault is in the Mac Mini display output chain. Bring both the Mac Mini and the monitor if you are unsure — we test each independently to identify the source.',
  },
  {
    question: 'My Mac Mini works with one monitor but not another — why?',
    answer:
      'This is usually a resolution or refresh rate compatibility issue. The Mac Mini M1 supports up to 6K at 60 Hz via Thunderbolt and 4K at 60 Hz via HDMI. Older Intel Mac Minis are limited to 4K at 30 Hz via HDMI 1.4. If your monitor demands a resolution or refresh rate that exceeds your Mac Mini model capabilities, the display may show no signal, flicker, or produce artefacts. We test across multiple resolutions and cables to determine whether the limitation is in the Mac Mini hardware, the cable, or the monitor. If the HDMI or Thunderbolt output is genuinely faulty, we repair it.',
  },
  {
    question: 'Is it worth repairing an older Intel Mac Mini display fault or should I buy a new one?',
    answer:
      'For Intel Mac Minis from 2014 onwards, a display output repair starting from R899 to R1,199 is almost always more cost-effective than buying a new Mac Mini (from R9,999). If the Mac Mini is otherwise performing well for your workload, a targeted repair extends its useful life by years. We are honest about this — if the Mac Mini has multiple faults or is too slow for your needs, we will tell you. But a single failed HDMI controller IC on an otherwise healthy 2018 Mac Mini is absolutely worth fixing.',
  },
  {
    question: 'Do you offer Mac Mini display repair in Sandton and surrounding areas?',
    answer:
      'Yes. Our Hyde Park workshop is centrally located — 10 to 15 minutes from Sandton, Rosebank, Bryanston, and Fourways. We offer collection and return for Mac Mini repairs across all northern Johannesburg suburbs including Midrand, Randburg, Morningside, Rivonia, and Sunninghill. Contact us on WhatsApp or call 064 529 5863 to arrange a time. Same-day collection is available for urgent cases.',
  },
];

const faqSchema = buildFaqSchema(faqs);
const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbSchemaItems);

export default function ScreenRepairMacMiniPage() {
  const whatsappUrl = buildWhatsAppUrl('SCR-MINI-HERO', 'screen-repair');

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
              Mac Mini Screen &amp; Display Repair
              <br /><span className="text-[#0FEA7A]">Johannesburg</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-4 max-w-3xl leading-relaxed">
              No display output after load shedding? HDMI showing &ldquo;No Signal&rdquo;? Thunderbolt port dead? We have repaired hundreds of Mac Mini display faults in our Hyde Park workshop — from HDMI controller IC failures on Intel models to Thunderbolt retimer chip damage on the latest M4 Pro. We diagnose the root cause before quoting, and every repair carries our 12-month warranty.
            </p>
            <div className="flex items-center gap-2 text-[#7A9E98] text-sm mb-8">
              <MapPin className="w-4 h-4 text-[#0FEA7A]" />
              <span>1 Hyde Lane, Hyde Park, Office E2004, JHB 2196 | Display repair from R899 | All Mac Mini models</span>
            </div>
            <div className="flex flex-wrap gap-3 mb-8">
              {[
                { icon: Shield, label: 'From R599 assessment' },
                { icon: Monitor, label: 'All Mac Mini Models' },
                { icon: Cpu, label: 'HDMI & Thunderbolt Specialist' },
                { icon: CheckCircle, label: '12-Month Warranty' },
                { icon: Zap, label: 'R599 Assessment' },
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
                { value: '500+', label: 'Mac Mini Display Faults Repaired' },
                { value: SITE.yearsExperience + ' Years', label: 'In Business Since 2009' },
                { value: SITE.rating + '/5', label: SITE.reviewCount + ' Google Reviews' },
                { value: '12 Months', label: 'Repair Warranty' },
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
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4">Mac Mini Display Repair Pricing</h2>
          <p className="text-[#7A9E98] mb-8 max-w-3xl leading-relaxed">
            Prices below are starting prices for display output diagnosis and component-level repair, including parts, labour, and our 12-month warranty. Apple charges R4,500 to R9,000 for a logic board replacement — the only option they offer. Mac Shack quotes R3,500 or more for the same board swap. We repair the specific failed component.
          </p>
          <div className="overflow-x-auto rounded-2xl border border-[rgba(255,255,255,0.06)]">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[rgba(255,255,255,0.08)] bg-[rgba(15,234,122,0.06)]">
                  <th className="text-left text-[#E8F4F1] font-semibold px-5 py-4">Model</th>
                  <th className="text-left text-[#E8F4F1] font-semibold px-5 py-4">Display Ports</th>
                  <th className="text-left text-[#0FEA7A] font-semibold px-5 py-4">From</th>
                  <th className="text-left text-[#E8F4F1] font-semibold px-5 py-4">Turnaround</th>
                </tr>
              </thead>
              <tbody>
                {pricingRows.map((row, i) => (
                  <tr key={row.model} className={`border-b border-[rgba(255,255,255,0.04)] ${i % 2 === 0 ? 'bg-[#0A1A18]' : 'bg-[#111C1A]'}`}>
                    <td className="text-[#E8F4F1] px-5 py-4 font-medium">{row.model}</td>
                    <td className="text-[#7A9E98] px-5 py-4">{row.port}</td>
                    <td className="text-[#0FEA7A] px-5 py-4 font-bold">{row.from}</td>
                    <td className="text-[#7A9E98] px-5 py-4">{row.turnaround}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-[#7A9E98] text-xs mt-4">
            All prices include parts, labour, and our 12-month warranty. Assessment from R599 on all Mac Mini display faults. From R599 assessment applies on all cases.
          </p>
          <PricingRange page="/screen-repair/mac-mini" />
          <PricingNote variant="inline" />
        </div>
      </section>

      {/* Technical Expertise */}
      <section className="py-10 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4">Why Mac Mini Display Repair Requires Specialist Diagnosis</h2>
          <div className="space-y-4 text-[#7A9E98] leading-relaxed">
            <p>
              The Mac Mini is a desktop machine with no built-in display. Every pixel you see comes through an HDMI or Thunderbolt output port, a display controller IC on the logic board, and the cable connecting it to your external monitor. When something in that chain fails, the result is the same — a blank screen — but the cause can be any one of half a dozen different components. This is what makes Mac Mini display fault diagnosis fundamentally different from laptop screen repair.
            </p>
            <p>
              In our Hyde Park workshop, we have repaired Mac Mini display faults across every generation since the 2012 unibody. The Intel models (2012–2018) use an HDMI 1.4 or 2.0 transmitter IC alongside the integrated Intel GPU. The HDMI transmitter is a separate chip on the logic board and a common point of failure — particularly after the voltage surges that accompany Eskom load shedding. We have replaced hundreds of these ICs at micro-soldering level, restoring full HDMI output without touching the rest of the board.
            </p>
            <p>
              Apple Silicon changed the architecture entirely. The M1 Mac Mini integrates the display controller into the SoC itself, with external retimer chips managing signal integrity to the physical Thunderbolt 3 and HDMI 2.0 ports. The M2 Pro added a third Thunderbolt 4 port and native support for three external displays. The 2024 M4 Pro model introduces Thunderbolt 5, which carries display and data at up to 120 Gbps — a new connector standard that requires new diagnostic equipment. We have invested in the tooling for each generation.
            </p>
            <p>
              Load shedding is the single most destructive factor for Mac Mini display hardware in South Africa. A surge on power restoration can propagate through the internal power supply and reach the HDMI controller or Thunderbolt retimer before the onboard voltage regulator clamps the spike. The result is a Mac Mini that boots, runs, and responds to network traffic — but produces absolutely no display output. We see this pattern multiple times every month in Johannesburg. The repair is component-level, typically under R2,000, and dramatically cheaper than Apple&apos;s logic board replacement.
            </p>
            <p>
              The most common misdiagnosis we encounter is clients replacing their monitor or cable when the fault is actually inside the Mac Mini. A simple test separates the two: connect a different device to the same monitor and cable. If the monitor works, the Mac Mini output is the problem. Bring it to us for an assessment from R599 — we will identify the exact failed component before you spend anything.
            </p>
          </div>
          <div className="mt-6">
            <a
              href="https://www.ifixit.com/Device/Mac_Mini"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[#0FEA7A] text-sm font-semibold hover:underline"
            >
              iFixit Mac Mini repair guides <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Common Faults */}
      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4">Mac Mini Display Fault Patterns We Repair</h2>
          <p className="text-[#7A9E98] mb-10 max-w-3xl leading-relaxed">
            We have documented the most common Mac Mini display output faults across every generation. Each fault below is a repairable condition — we diagnose the precise cause before recommending any component replacement.
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
              Every repair is quoted before work begins. Our From R599 assessment policy means that if we cannot resolve your Mac Mini display fault, you pay nothing and your machine is returned exactly as we received it. 12-month warranty on all completed display repairs.
            </p>
          </div>
        </div>
      </section>

      {/* Apple vs ZA Support Comparison */}
      <section className="py-10 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-4">Apple Store vs Mac Shack vs ZA Support: Mac Mini Display Repair</h2>
          <p className="text-[#7A9E98] mb-8 leading-relaxed">
            Apple and Mac Shack replace the entire logic board when a display output fault occurs. We diagnose the specific failed component — an HDMI controller IC, a Thunderbolt retimer chip, or a damaged port — and repair only that. The cost difference is significant.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            <div className="glass-card p-6 border border-red-500/20">
              <h3 className="text-red-400 font-bold mb-4">Apple Store / Mac Shack</h3>
              <ul className="text-[#7A9E98] text-sm space-y-2.5">
                <li>Full logic board replacement — R4,500 to R9,000+</li>
                <li>No component-level HDMI or Thunderbolt repair</li>
                <li>Turnaround 5–10 business days via Apple depot</li>
                <li>Mac Shack: R3,500+ for board swap, no micro-soldering</li>
                <li>Out-of-warranty Mac Minis often deemed uneconomical to repair</li>
                <li>No load shedding surge-specific diagnosis</li>
              </ul>
            </div>
            <div className="glass-card p-6 border border-[rgba(15,234,122,0.3)]">
              <h3 className="text-[#0FEA7A] font-bold mb-4">ZA Support</h3>
              <ul className="text-[#7A9E98] text-sm space-y-2.5">
                <li>Component-level diagnosis — only failed IC/port replaced</li>
                <li>Intel Mac Mini from R899 | Apple Silicon from R1,499</li>
                <li>HDMI controller IC and Thunderbolt retimer repair</li>
                <li>Turnaround 24–72 hours for most models</li>
                <li>Load shedding surge diagnosis — a Johannesburg speciality</li>
                <li>12-month warranty on all completed repairs</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Service Area */}
      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-4">Mac Mini Display Repair — Johannesburg Service Area</h2>
          <p className="text-[#7A9E98] mb-6 leading-relaxed">
            Our Hyde Park workshop is 10–20 minutes from most northern Johannesburg suburbs. The Mac Mini is small enough to carry in a bag — but if you prefer, we offer collection and return across Sandton, Rosebank, Bryanston, Fourways, Midrand, Randburg, Morningside, Rivonia, Sunninghill, and Houghton. Same-day collection is available for urgent cases.
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
          <FAQAccordion items={faqs} title="Mac Mini Display Repair — Common Questions" />
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
              { label: 'Mac Mini Logic Board Repair', href: '/logic-board-repair/mac-mini' },
              { label: 'MacBook Pro Screen Repair', href: '/screen-repair/macbook-pro' },
              { label: 'iMac Screen Repair', href: '/screen-repair/imac' },
              { label: 'Logic Board Repair', href: '/logic-board-repair' },
              { label: 'Liquid Damage Repair', href: '/liquid-damage' },
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
            <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3">Mac Mini Not Displaying? Let Us Diagnose It.</h2>
            <p className="text-[#7A9E98] mb-6 max-w-xl mx-auto leading-relaxed">
              WhatsApp us with a description of the fault — which port, which monitor, what you see (or don&apos;t see). We will give you an honest assessment and a price range before you bring the machine in. From R599 assessment. From R599 assessment. 12-month warranty on all repairs.
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
              1 Hyde Lane, Hyde Park, Office E2004, JHB 2196 | Mac Mini display repair from R899 | 12-month warranty | From R599 assessment
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
