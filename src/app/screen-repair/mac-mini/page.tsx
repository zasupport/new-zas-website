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
  title: 'Mac Mini Display Repair Johannesburg [2026] | From R599 | ZA Support',
  description:
    'Mac Mini display output repair Johannesburg from R599. HDMI/Thunderbolt no signal, GPU faults, external monitor compatibility. Mac Mini M1, M2, M4. No Fix No Fee. Hyde Park.',
  alternates: { canonical: 'https://zasupport.com/screen-repair/mac-mini' },
  keywords: [
    'Mac Mini display repair Johannesburg',
    'Mac Mini no display Johannesburg',
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
  name: 'Mac Mini Display Output Repair Johannesburg',
  description:
    'Professional Mac Mini display output diagnosis and repair in Johannesburg. HDMI and Thunderbolt no-signal faults, GPU output failure, external monitor compatibility, port damage. All Mac Mini generations. Assessment from R599. Up-to-3 year warranty.',
  provider: LOCAL_BUSINESS_PROVIDER,
  areaServed: { '@type': 'City', name: 'Johannesburg' },
  serviceType: 'Display Output Repair',
  offers: {
    '@type': 'AggregateOffer',
    lowPrice: '599',
    highPrice: '8000',
    priceCurrency: 'ZAR',
    offerCount: '8',
  },
};

const pricingRows = [
  { model: 'Mac Mini display assessment (all models)', panel: 'HDMI + Thunderbolt port + GPU test', from: 'R599', turnaround: 'Same day' },
  { model: 'Mac Mini HDMI port repair / replacement', panel: 'Port-level microsolder repair', from: 'R1,499', turnaround: '24–48 hrs' },
  { model: 'Mac Mini Thunderbolt port repair', panel: 'TB4/USB4 port microsolder', from: 'R1,799', turnaround: '24–48 hrs' },
  { model: 'Mac Mini logic board — GPU output fault', panel: 'Component-level diagnosis + repair', from: 'R2,499', turnaround: '48–72 hrs' },
  { model: 'Mac Mini M1 / M2 / M4 — logic board repair', panel: 'BGA rework + component repair', from: 'R3,499', turnaround: '72 hrs' },
];

const faultTypes = [
  {
    title: 'No Display on Startup — Black Screen',
    icon: AlertTriangle,
    desc: 'The most common Mac Mini display complaint we see in our Hyde Park workshop. The Mac Mini has no built-in screen — every display issue is an output fault. A completely black screen can result from: a failed HDMI or Thunderbolt port on the logic board, a GPU output fault on the Apple Silicon chip (M1, M2, M4), a display cable fault on the external monitor, or an incompatible display resolution setting locked in NVRAM. We distinguish these systematically: first we test a known-working monitor and cable on the Mac Mini\'s output ports before any disassembly. If output is absent on all ports, the fault is in the Mac Mini\'s GPU or display controller.',
    severity: 'high',
  },
  {
    title: 'HDMI Port Fault — No Signal',
    icon: Monitor,
    desc: 'The Mac Mini has one HDMI 2.1 port (on current models) or HDMI 2.0 (on Intel models). Physical damage to the HDMI port — bent pins, a broken connector housing from a lever action on a plug — is a common fault, particularly on Mac Minis used in server racks or tight desk setups where the HDMI cable is under constant strain. Load shedding plays a role here too: a surge through an HDMI cable connected to a TV or monitor during Eskom power restoration can damage the HDMI input stage on the Mac Mini logic board. We repair HDMI ports at component level, which is significantly cheaper than a board replacement.',
    severity: 'high',
  },
  {
    title: 'Thunderbolt / USB 4 Port — No Display Output',
    icon: Zap,
    desc: 'Mac Mini models from M1 onwards have two Thunderbolt 4 / USB 4 ports on the rear, both of which support DisplayPort video output. A Thunderbolt port can fail individually — losing display output on that port while the other remains functional. This can be caused by ESD (electrostatic discharge) from repeated device connection, a bent pin in the USB-C socket from angled insertion, or a failed retimer IC on the Thunderbolt signal path. We test each Thunderbolt port independently during assessment and repair at component level where possible.',
    severity: 'high',
  },
  {
    title: 'External Monitor Compatibility — Resolution Fault',
    icon: Eye,
    desc: 'We see several Mac Mini clients each month where the display output hardware is functioning correctly, but the Mac cannot detect or correctly drive the external monitor. The most common scenarios: a 4K monitor connected via HDMI showing at 1080p because the cable is HDMI 1.4 rather than HDMI 2.0 or 2.1; a monitor requiring Display Stream Compression (DSC) not being detected by the M4 Mac Mini; or a display scaling setting locked in NVRAM after a system update. We test with reference monitors at 4K, 1080p, and 5K to determine whether the fault is hardware or software configuration.',
    severity: 'medium',
  },
  {
    title: 'GPU Output Failure — M-Series Chip',
    icon: Cpu,
    desc: 'Apple Silicon Mac Mini models (M1, M2, M4, M4 Pro) use a unified memory architecture where the GPU is integrated into the same chip as the CPU and memory controller. A GPU output fault on these models cannot be resolved by replacing a discrete graphics card — the entire SoC is on one chip. However, GPU output faults are often caused by a failed retimer IC or display controller IC adjacent to the main chip, rather than a fault in the GPU cores themselves. We diagnose at component level before determining whether the fault requires logic board replacement.',
    severity: 'high',
  },
  {
    title: 'Dual Display Setup — Second Monitor Not Detected',
    icon: Monitor,
    desc: 'The Mac Mini M1 supports one external Thunderbolt display and one HDMI display simultaneously — it cannot drive two Thunderbolt monitors without an Apple Studio Display or a DisplayLink adapter. The M2 and M4 models expanded this to support more displays. A common fault we see is a second monitor failing to be detected after a macOS update, or after a display cable swap. Before assuming a hardware fault, we always check the display arrangement in System Settings and test with multiple cables. If the hardware is at fault, we identify the specific failed port and repair it.',
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
    question: 'My Mac Mini has no display output — is this a screen repair?',
    answer:
      'The Mac Mini has no built-in screen. Every display issue is a display output fault — either in the HDMI or Thunderbolt port on the Mac Mini, in the GPU output circuit on the logic board, or in the external monitor or cable. The first step is always to test a different monitor and cable combination. If the fault persists on multiple monitors and cables, the problem is inside the Mac Mini. Bring it to our Hyde Park workshop for assessment from R599 — we run a systematic port and GPU output test before any disassembly.',
  },
  {
    question: 'How much does Mac Mini display repair cost in Johannesburg?',
    answer:
      'Mac Mini display assessment starts from R599 and covers HDMI port, Thunderbolt port, and GPU output testing. HDMI port repair starts from R1,499. Thunderbolt port repair starts from R1,799. Logic board GPU output faults start from R2,499. Apple replaces the entire logic board for display faults — often R5,000 to R10,000. We repair at component level where possible, which is significantly less. Written quote provided before any work begins.',
  },
  {
    question: 'My Mac Mini HDMI port is not working — can you repair it without replacing the logic board?',
    answer:
      'In most cases, yes. The HDMI port on the Mac Mini is soldered to the logic board, but many HDMI faults are repairable at component level. Physical damage to the port connector (bent pins, broken housing) can be addressed with microsolder repair or port replacement. A failed HDMI input stage IC on the signal path is also a component-level repair. We assess the port under magnification before determining whether a component repair or board replacement is required.',
  },
  {
    question: 'Can you repair a Mac Mini Thunderbolt port that no longer outputs video?',
    answer:
      'Yes. Thunderbolt port video output faults on the Mac Mini are typically caused by a bent connector pin, a failed retimer IC on the Thunderbolt signal path, or ESD damage to the port controller. We test each Thunderbolt port independently using a known-working Thunderbolt-to-DisplayPort adapter and reference monitor. Where the fault is in the connector or retimer IC, we repair at component level. Full Thunderbolt port replacement via microsolder is also available.',
  },
  {
    question: 'Does load shedding damage Mac Mini display outputs?',
    answer:
      'Yes, and we see this regularly in Johannesburg. When Eskom power restores after a load shedding outage, the voltage can surge momentarily. If a monitor is connected via HDMI during this surge, the spike travels along the HDMI cable and can damage the HDMI input stage on the Mac Mini logic board. The Mac Mini\'s HDMI port is particularly vulnerable because it connects directly to the PCH or display controller with limited surge protection. We recommend connecting the Mac Mini to a quality surge protector that includes HDMI/coaxial surge protection, not just power line protection.',
  },
  {
    question: 'Why does my Mac Mini show a black screen with a cursor but nothing else?',
    answer:
      'This is typically a display resolution or GPU memory fault. A black screen with a visible cursor indicates the GPU is producing output and the display is receiving a signal — but the screen content is not rendering. Common causes include a stuck NVRAM display resolution setting (a 4K resolution locked in NVRAM on a 1080p monitor), a corrupted graphics kext after a macOS update, or a failing GPU memory segment in the unified memory architecture. We run diagnostics in macOS Recovery and Single User Mode to identify the root cause before recommending a hardware repair.',
  },
  {
    question: 'Can the Mac Mini M1 drive two Thunderbolt displays?',
    answer:
      'No — the Mac Mini M1 is limited to one external Thunderbolt/USB 4 display and one HDMI display simultaneously. It cannot drive two Thunderbolt displays without a DisplayLink USB-A adapter. The M2 Mac Mini improved this but still has limitations compared to the M4 Pro Mac Mini, which supports up to three external displays. If your current display setup exceeds the supported configuration, macOS will simply not detect the third display — this is not a hardware fault. We advise on the correct multi-display configuration for your Mac Mini model.',
  },
  {
    question: 'My Mac Mini is detected by the monitor but only displays in 1080p, not 4K — why?',
    answer:
      'This is almost always a cable issue, not a hardware fault. For 4K resolution at 60Hz, the HDMI port on the Mac Mini requires an HDMI 2.0 or higher cable. Many HDMI cables sold in South Africa are HDMI 1.4 — which maxes out at 4K/30Hz or falls back to 1080p/60Hz with certain monitors. The fix is a certified HDMI 2.0 cable. For Thunderbolt-to-DisplayPort connections to a 4K monitor, any Thunderbolt 3 or 4 cable supports 4K/60Hz. We test with reference cables during assessment so the cable can be ruled out before hardware investigation begins.',
  },
  {
    question: 'What Mac Mini models do you repair for display faults?',
    answer:
      'We repair display output faults on all Mac Mini models, including Intel Mac Mini (2018, 2020), Mac Mini M1 (2020), Mac Mini M2 and M2 Pro (2023), and Mac Mini M4 and M4 Pro (2024). Each generation has a different logic board layout and display output path — we have the model-specific schematics and tooling for all of them. Contact us with your model number for a more specific assessment estimate.',
  },
  {
    question: 'Is it worth repairing a Mac Mini M1 display output fault?',
    answer:
      'Almost certainly yes. The Mac Mini M1 is one of the most cost-efficient computers ever produced — its performance per watt is exceptional even by 2026 standards. An HDMI or Thunderbolt port repair at R1,499 to R1,799 extends the life of the machine significantly. Even a logic board component-level GPU repair at R2,499 to R3,499 is worthwhile given the cost of a replacement Mac Mini M4. We can advise on the repair-versus-replace decision at assessment once we have identified the specific fault.',
  },
  {
    question: 'My Mac Mini turns on (I can hear it) but nothing appears on the screen — what should I do?',
    answer:
      'Start with the basics: try a different HDMI or Thunderbolt cable, try a different monitor if you have one, and check that the monitor is set to the correct input source. If it still produces no output, hold down Command+Option+P+R on startup to reset the NVRAM — this clears any stuck display resolution settings. If none of these resolve the issue, bring the Mac Mini to our Hyde Park workshop for a full display output assessment from R599. Do not attempt to open the Mac Mini yourself — the internal layout is tight and the logic board retention screws are easily stripped without the correct driver.',
  },
];

const faqSchema = buildFaqSchema(faqs);
const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbSchemaItems);

export default function ScreenRepairMacMiniPage() {
  const whatsappUrl = buildWhatsAppUrl('SCR-MACMINI-HERO', 'screen-repair');

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
              Mac Mini Display Repair
              <br /><span className="text-[#0FEA7A]">Johannesburg</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-4 max-w-3xl leading-relaxed">
              The Mac Mini has no built-in screen — every display fault is an output problem. HDMI port failure, Thunderbolt no-signal, GPU output faults, external monitor incompatibility. We diagnose at component level before recommending any repair. Hyde Park workshop. Assessment from R599.
            </p>
            <div className="flex items-center gap-2 text-[#7A9E98] text-sm mb-8">
              <MapPin className="w-4 h-4 text-[#0FEA7A]" />
              <span>1 Hyde Lane, Hyde Park, Office E2004, JHB 2196 | Assessment from R599 | HDMI repair from R1,499</span>
            </div>
            <div className="flex flex-wrap gap-3 mb-8">
              {[
                { icon: Shield, label: 'No Fix No Fee' },
                { icon: Monitor, label: 'HDMI + Thunderbolt Repair' },
                { icon: Cpu, label: 'M1 / M2 / M4 Specialist' },
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
                { value: '400+', label: 'Mac Mini Display Faults Resolved' },
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

      {/* Explainer — no built-in display */}
      <section className="py-8 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-5 rounded-xl border border-[rgba(15,234,122,0.15)] bg-[rgba(15,234,122,0.04)] flex items-start gap-4">
            <Monitor className="w-5 h-5 text-[#0FEA7A] flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-[#E8F4F1] font-semibold text-sm mb-1">Mac Mini has no built-in display</p>
              <p className="text-[#7A9E98] text-sm leading-relaxed">
                Unlike the MacBook range, the Mac Mini does not have an internal screen. "Screen repair" for a Mac Mini means diagnosing and repairing the display output system — the HDMI port, Thunderbolt ports, display controller, and GPU output circuitry that drive your external monitor. This is a fundamentally different repair process from replacing a MacBook panel.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Table */}
      <section className="py-10 sm:py-16 bg-[#111C1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4">Mac Mini Display Repair Pricing</h2>
          <p className="text-[#7A9E98] mb-8 max-w-3xl leading-relaxed">
            Mac Mini display repairs are priced based on the specific fault identified during assessment. Apple replaces the entire logic board for most display faults — we repair at component level where possible and provide a written fixed-price quote before starting.
          </p>
          <div className="overflow-x-auto rounded-2xl border border-[rgba(255,255,255,0.06)]">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[rgba(255,255,255,0.08)] bg-[rgba(15,234,122,0.06)]">
                  <th className="text-left text-[#E8F4F1] font-semibold px-5 py-4">Repair Type</th>
                  <th className="text-left text-[#E8F4F1] font-semibold px-5 py-4">Description</th>
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
            Assessment fee from R599 — applied toward the repair cost if you proceed. No Fix No Fee applies on all cases. Up-to-3 year warranty on completed repairs.
          </p>
        </div>
      </section>

      {/* Technical Expertise */}
      <section className="py-10 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4">Mac Mini Display Output — How We Diagnose It</h2>
          <div className="space-y-4 text-[#7A9E98] leading-relaxed">
            <p>
              The Mac Mini is unique among Apple computers because it has no built-in display. This means that what presents as a "black screen" fault can originate from four distinct locations: the Mac Mini's HDMI or Thunderbolt output ports, the GPU output circuitry on the logic board, the display cable, or the external monitor itself. Our diagnostic protocol addresses all four systematically.
            </p>
            <p>
              In our Hyde Park workshop, we start every Mac Mini display assessment by connecting the machine to a reference monitor with a known-working cable. We test the HDMI port, both Thunderbolt ports, and note which outputs respond. If all outputs are dead but the machine boots (fan spins, power light is on), the fault is in the GPU output circuit or display controller on the logic board. If some outputs work and others do not, the fault is port-specific and almost always repairable at component level.
            </p>
            <p>
              Load shedding is a major contributing factor to HDMI port failure on Mac Minis in Johannesburg. The HDMI port connects to the display controller with limited surge protection. A voltage spike during grid restoration — travelling through the HDMI cable from a connected TV or monitor — can damage the HDMI input stage IC directly. We see this pattern regularly, particularly on Mac Minis used in home office setups where the monitor is a smart TV plugged into the main socket without surge protection.
            </p>
            <p>
              Apple Silicon Mac Minis (M1, M2, M4) use a unified memory architecture — the GPU is integrated into the main SoC, not a replaceable component. A GPU fault on these machines cannot be resolved by swapping a graphics card. However, many GPU output faults are actually retimer IC or display controller faults — components adjacent to the main chip that are repairable at component level. We determine which is the case during assessment before quoting a repair.
            </p>
            <p>
              The Mac Mini M4 Pro (2024) introduces support for three external displays simultaneously, including two Thunderbolt displays and one HDMI display. Multi-monitor setup faults on the M4 Pro are frequently configuration issues rather than hardware faults — we always verify the display arrangement in System Settings and test the correct cable types (HDMI 2.1 for the HDMI port) before opening the machine.
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
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4">Mac Mini Display Output Faults We Repair</h2>
          <p className="text-[#7A9E98] mb-10 max-w-3xl leading-relaxed">
            Every fault below is a diagnosable condition on Mac Mini. We identify the specific failed component before recommending any repair — many of these faults do not require logic board replacement.
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
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-4">Apple iStore vs ZA Support: Mac Mini Display Repair</h2>
          <p className="text-[#7A9E98] mb-8 leading-relaxed">
            Apple typically resolves Mac Mini display faults by replacing the entire logic board. We diagnose at component level — often resolving the fault without a board replacement.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            <div className="glass-card p-6 border border-red-500/20">
              <h3 className="text-red-400 font-bold mb-4">Apple Store / iStore</h3>
              <ul className="text-[#7A9E98] text-sm space-y-2.5">
                <li>Logic board replacement — R5,000 to R12,000+</li>
                <li>Port damage not covered by standard warranty</li>
                <li>Turnaround 5–10 business days via Apple depot</li>
                <li>No component-level port repair offered</li>
                <li>Full board swap even for single-port faults</li>
                <li>GPU faults resolved only by board replacement</li>
              </ul>
            </div>
            <div className="glass-card p-6 border border-[rgba(15,234,122,0.3)]">
              <h3 className="text-[#0FEA7A] font-bold mb-4">ZA Support</h3>
              <ul className="text-[#7A9E98] text-sm space-y-2.5">
                <li>Assessment from R599 — all output ports tested</li>
                <li>HDMI port repair from R1,499 (component level)</li>
                <li>Thunderbolt port repair from R1,799</li>
                <li>GPU output diagnosis before quoting board work</li>
                <li>Turnaround same day to 72 hours</li>
                <li>Up-to-3 year warranty on all completed repairs</li>
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
              { label: 'Mac Mini Logic Board Repair', href: '/logic-board-repair/mac-mini' },
              { label: 'MacBook Pro Screen Repair', href: '/screen-repair/macbook-pro' },
              { label: 'MacBook Air M1 Screen', href: '/screen-repair/macbook-air-m1' },
              { label: 'iMac Screen Repair', href: '/screen-repair/imac' },
              { label: 'Mac Mini Liquid Damage', href: '/liquid-damage' },
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
