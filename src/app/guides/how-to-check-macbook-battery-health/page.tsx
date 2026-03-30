import type { Metadata } from 'next';
import Link from 'next/link';
import { Suspense } from 'react';
import {
  Phone,
  ArrowRight,
  Battery,
  BatteryWarning,
  Zap,
  CheckCircle,
  Shield,
  AlertTriangle,
  MapPin,
  Activity,
  Terminal,
  Search,
  Info,
} from 'lucide-react';
import SchemaOrg from '@/components/seo/SchemaOrg';
import { buildFaqSchema, buildBreadcrumbSchema, LOCAL_BUSINESS_PROVIDER } from '@/lib/schema';
import GoogleReviews from '@/components/ui/GoogleReviews';
import FAQAccordion from '@/components/ui/FAQ';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { CONTACT, SITE, buildWhatsAppUrl } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'How to Check MacBook Battery Health in 2026 | Complete Guide | ZA Support',
  description:
    'Check MacBook battery health using System Information, Terminal & coconutBattery. Cycle counts, capacity thresholds & when to replace. Book at ZA Support.',
  alternates: { canonical: 'https://zasupport.com/guides/how-to-check-macbook-battery-health' },
  keywords: [
    'check MacBook battery health',
    'MacBook battery cycle count',
    'MacBook battery health percentage',
    'MacBook battery condition service recommended',
    'system_profiler SPPowerDataType',
    'coconutBattery Mac',
    'MacBook battery replacement Johannesburg',
    'MacBook battery health check South Africa',
    'ioreg AppleSmartBattery',
    'MacBook battery capacity percentage',
    'how to check MacBook battery cycle count',
    'MacBook battery health management',
  ],
};

/* -- Breadcrumbs ----------------------------------------------------------- */
const breadcrumbItems = [
  { label: 'Guides', href: '/guides' },
  { label: 'How to Check MacBook Battery Health' },
];

const breadcrumbSchemaItems = [
  { name: 'Home', url: 'https://zasupport.com' },
  { name: 'Guides', url: 'https://zasupport.com/guides' },
  { name: 'How to Check MacBook Battery Health', url: 'https://zasupport.com/guides/how-to-check-macbook-battery-health' },
];

/* -- HowTo Schema --------------------------------------------------------- */
const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Check MacBook Battery Health',
  description:
    'A complete guide to checking your MacBook battery health using System Information, Terminal commands, and third-party tools. Covers cycle counts, capacity thresholds, and when to replace.',
  totalTime: 'PT5M',
  estimatedCost: {
    '@type': 'MonetaryAmount',
    currency: 'ZAR',
    value: '0',
  },
  tool: [
    { '@type': 'HowToTool', name: 'macOS System Information' },
    { '@type': 'HowToTool', name: 'Terminal' },
    { '@type': 'HowToTool', name: 'coconutBattery (optional)' },
  ],
  step: [
    {
      '@type': 'HowToStep',
      name: 'Open System Information',
      text: 'Click the Apple menu, then About This Mac. On macOS Ventura or later, click More Info, then System Report. On older macOS versions, click System Report directly. Navigate to Power in the left sidebar.',
      position: 1,
    },
    {
      '@type': 'HowToStep',
      name: 'Read the key battery metrics',
      text: 'Look for Cycle Count, Condition, Full Charge Capacity (mAh), and Maximum Capacity. Note the Condition field: Normal means healthy, Service Recommended means degraded, Replace Soon or Replace Now means the battery is failing.',
      position: 2,
    },
    {
      '@type': 'HowToStep',
      name: 'Check battery health in System Settings',
      text: 'Open System Settings, click Battery in the sidebar, then click the info icon next to Battery Health. You will see your maximum capacity percentage and condition status.',
      position: 3,
    },
    {
      '@type': 'HowToStep',
      name: 'Use Terminal for detailed data',
      text: 'Open Terminal and run: system_profiler SPPowerDataType. This shows cycle count, condition, charging status, and capacity. For raw data, run: ioreg -rn AppleSmartBattery | grep -i capacity to see NominalChargeCapacity and DesignCapacity.',
      position: 4,
    },
    {
      '@type': 'HowToStep',
      name: 'Calculate your battery health percentage',
      text: 'Divide NominalChargeCapacity by DesignCapacity and multiply by 100. For example, if NominalChargeCapacity is 4200 and DesignCapacity is 5103, your battery is at 82.3% health.',
      position: 5,
    },
    {
      '@type': 'HowToStep',
      name: 'Assess whether replacement is needed',
      text: 'If maximum capacity is below 80%, cycle count exceeds 1,000 (modern Macs) or 300 (pre-2010 models), or macOS shows Service Recommended, the battery should be replaced. Physical signs like trackpad lifting or random shutdowns are urgent indicators.',
      position: 6,
    },
  ],
  provider: LOCAL_BUSINESS_PROVIDER,
};

/* -- FAQs ------------------------------------------------------------------ */
const faqs = [
  {
    question: 'How do I check my MacBook battery health?',
    answer:
      'Open System Settings (or System Preferences on older macOS), click Battery, then Battery Health. You will see your maximum capacity percentage and condition status. For detailed data, open Terminal and run system_profiler SPPowerDataType to see cycle count, full charge capacity, and condition. We use coconutBattery in our workshop for cell-level voltage analysis.',
  },
  {
    question: 'What is a normal MacBook battery cycle count?',
    answer:
      'Apple rates modern MacBooks (2010 onwards) for 1,000 charge cycles before the battery drops below 80% of its original capacity. Older MacBooks (pre-2010) were rated for 300 cycles. A cycle is one full discharge of 100% — using 50% today and 50% tomorrow counts as one cycle. In Johannesburg, load shedding can push cycle counts 40 to 60% higher than normal due to constant AC-to-battery transitions.',
  },
  {
    question: 'What does Service Recommended mean on MacBook battery?',
    answer:
      'Service Recommended means macOS has detected that your battery has degraded significantly — typically below 80% of its original capacity or exhibiting abnormal behaviour such as unexpected shutdowns. This is not an emergency, but it means the battery should be replaced soon. At ZA Support, we assess the exact state with coconutBattery and quote from R1,299 depending on the model. Our assessment fee starts from R599, applied toward the repair.',
  },
  {
    question: 'What is the difference between NominalChargeCapacity and DesignCapacity?',
    answer:
      'DesignCapacity is the battery capacity when it was manufactured — the factory-rated mAh. NominalChargeCapacity is the current maximum the battery can hold after degradation. Dividing NominalChargeCapacity by DesignCapacity gives you the health percentage. You can see both values by running ioreg -rn AppleSmartBattery in Terminal. A NominalChargeCapacity that is less than 80% of DesignCapacity indicates the battery is due for replacement.',
  },
  {
    question: 'What is the MacBook battery health management setting?',
    answer:
      'Battery health management is a macOS feature that learns your charging patterns and may hold the charge at 80% to reduce long-term wear. It is useful for MacBooks that stay plugged in most of the time. If you rely on full battery capacity — especially during load shedding — you can disable it in System Settings under Battery, then Battery Health. Disabling it means the battery will always charge to 100%, but may degrade slightly faster over its lifetime.',
  },
  {
    question: 'How accurate is coconutBattery for checking MacBook battery health?',
    answer:
      'coconutBattery is extremely accurate. It reads directly from the battery management unit via the SMC (System Management Controller) and reports design capacity, current maximum capacity, cycle count, cell temperature, and manufacturing date. We use it in every diagnostic at our Hyde Park workshop. The free version provides all the data you need. iStat Menus is another reliable option for ongoing monitoring.',
  },
  {
    question: 'Does load shedding affect MacBook battery health?',
    answer:
      'Yes, significantly. Every power outage forces the MacBook to switch from AC to battery power, counting as a partial charge cycle. On a Stage 4 schedule, this adds 8 to 12 extra partial cycles daily. We have seen MacBooks in Johannesburg with 1,200 to 1,500 cycles at only two years of age — well past the 1,000-cycle rating. A quality UPS eliminates this by maintaining power during outages.',
  },
  {
    question: 'What are the signs of a failing MacBook battery?',
    answer:
      'The most obvious sign is a swollen battery — you will notice the trackpad becoming stiff or the bottom case lifting slightly. Other signs include: random shutdowns at 20 to 40% charge, the Mac only working when plugged in, macOS reporting Service Recommended or Replace Now, battery percentage jumping erratically (e.g. 60% to 15% suddenly), and significantly reduced battery life compared to when the machine was new.',
  },
  {
    question: 'How much does MacBook battery replacement cost in South Africa?',
    answer:
      'At ZA Support in Johannesburg, MacBook battery replacement starts from R1,299 for older MacBook Air models and ranges up to R2,899 for MacBook Pro 16-inch models. Apple charges R2,800 to R7,500 depending on the model. Our price includes the replacement cell, labour, calibration, and a 12-month warranty. Assessment from R599, applied toward the repair. No Fix No Fee.',
  },
  {
    question: 'Can I check MacBook battery health from Terminal?',
    answer:
      'Yes. Open Terminal and run system_profiler SPPowerDataType for a formatted summary including cycle count, condition, and charge information. For raw battery data, run ioreg -rn AppleSmartBattery which returns every field the battery management unit exposes — including NominalChargeCapacity, DesignCapacity, CycleCount, Temperature, and IsCharging. Divide NominalChargeCapacity by DesignCapacity for health percentage.',
  },
  {
    question: 'When should I replace my MacBook battery?',
    answer:
      'Replace your MacBook battery when: maximum capacity drops below 80% of the original design capacity, cycle count exceeds 1,000 (modern Macs), macOS shows Service Recommended or Replace Now, the battery is physically swelling (trackpad lifting, bottom case bulging), or you experience random shutdowns. At ZA Support, we assess and replace same-day from R1,299 with a 12-month warranty.',
  },
];

/* -- Structured Data ------------------------------------------------------- */
const faqSchema = buildFaqSchema(faqs);
const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbSchemaItems);

/* -- Replacement Cost Table Data ------------------------------------------- */
const replacementCosts = [
  { model: 'MacBook Air 13" (2017-2019)', from: 'R1,299', cycles: '1,000' },
  { model: 'MacBook Air M1 (2020)', from: 'R1,899', cycles: '1,000' },
  { model: 'MacBook Air M2 (2022)', from: 'R1,999', cycles: '1,000' },
  { model: 'MacBook Pro 13" (2016-2019)', from: 'R1,499', cycles: '1,000' },
  { model: 'MacBook Pro 13" M1/M2 (2020-2022)', from: 'R1,899', cycles: '1,000' },
  { model: 'MacBook Pro 14" M1 Pro/Max (2021)', from: 'R2,499', cycles: '1,000' },
  { model: 'MacBook Pro 16" (2019)', from: 'R2,499', cycles: '1,000' },
  { model: 'MacBook Pro 16" M1 Pro/Max (2021)', from: 'R2,899', cycles: '1,000' },
  { model: 'MacBook Pro 15" (2012-2015, Retina)', from: 'R1,499', cycles: '1,000' },
  { model: 'MacBook Pro/Air (pre-2010)', from: 'R999', cycles: '300' },
];

/* -- Page Component -------------------------------------------------------- */
export default function HowToCheckMacBookBatteryHealthPage() {
  const whatsappUrl = buildWhatsAppUrl('GUIDE-BATTERY-HEALTH', 'battery');

  return (
    <>
      <SchemaOrg schema={howToSchema} />
      <SchemaOrg schema={faqSchema} />
      <SchemaOrg schema={breadcrumbSchema} />

      {/* Hero */}
      <section className="hero-gradient grid-overlay pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={breadcrumbItems} />
          <div className="mt-8 max-w-4xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#E8F4F1] leading-tight mb-6">
              How to Check Your MacBook
              <br /><span className="text-[#0FEA7A]">Battery Health</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-4 max-w-3xl leading-relaxed">
              We check battery health on every MacBook that comes through our workshop — it is the single most common diagnostic we perform. This guide covers the exact same methods we use: System Information, Terminal commands, and coconutBattery. Five minutes of checking now can save you from a dead machine later.
            </p>
            <div className="flex items-center gap-2 text-[#7A9E98] text-sm mb-8">
              <MapPin className="w-4 h-4 text-[#0FEA7A]" />
              <span>1 Hyde Lane, Hyde Park, Office E2004, JHB 2196 | Assessment from R599</span>
            </div>
            <div className="flex flex-wrap gap-3 mb-8">
              {[
                { icon: Search, label: 'Free Self-Check Guide' },
                { icon: Battery, label: 'Capacity Thresholds' },
                { icon: Terminal, label: 'Terminal Commands' },
                { icon: CheckCircle, label: 'When to Replace' },
                { icon: Shield, label: 'No Fix No Fee' },
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
                WhatsApp for Battery Assessment
              </a>
              <a
                href={`tel:${CONTACT.phoneTel}`}
                className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all"
              >
                <Phone className="w-5 h-5" /> Call {CONTACT.phone}
              </a>
              <Link
                href="/battery-replacement"
                className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.2)] text-[#7A9E98] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[rgba(15,234,122,0.05)] transition-all"
              >
                Battery Replacement Pricing <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
            <div className="flex flex-wrap gap-6 mt-8 pt-6 border-t border-[rgba(255,255,255,0.06)]">
              {[
                { value: SITE.repairsCount, label: 'Repairs Completed' },
                { value: SITE.yearsExperience + ' Years', label: 'In Business Since 2009' },
                { value: SITE.rating + '/5', label: SITE.reviewCount + ' Google Reviews' },
                { value: '12 Months', label: 'Battery Warranty' },
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

      {/* Method 1: System Information */}
      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4">Method 1: System Information (The Quick Check)</h2>
          <div className="space-y-4 text-[#7A9E98] leading-relaxed">
            <p>
              The most common question we get from clients in Johannesburg is &ldquo;how do I know if my battery is dying?&rdquo; The quickest answer lives in System Information — a built-in macOS utility that reads directly from the battery management unit.
            </p>
            <p>
              Click the <strong className="text-[#E8F4F1]">Apple menu</strong> in the top-left corner of your screen, then <strong className="text-[#E8F4F1]">About This Mac</strong>. On macOS Ventura (13) or later, click <strong className="text-[#E8F4F1]">More Info</strong>, scroll down, and click <strong className="text-[#E8F4F1]">System Report</strong>. On macOS Monterey (12) or earlier, click <strong className="text-[#E8F4F1]">System Report</strong> directly. In the left sidebar, navigate to <strong className="text-[#E8F4F1]">Hardware &gt; Power</strong>.
            </p>
            <p>
              You will see a section called <strong className="text-[#E8F4F1]">Battery Information</strong> with several key fields. The ones that matter most are:
            </p>
            <div className="space-y-3 mt-4">
              {[
                { metric: 'Cycle Count', desc: 'The total number of full charge-discharge cycles your battery has completed. Modern MacBooks (2010+) are rated for 1,000 cycles. Older models were rated for 300. In our Hyde Park workshop, we routinely see Johannesburg machines with inflated cycle counts from load shedding.' },
                { metric: 'Condition', desc: 'macOS reports one of four statuses: Normal (healthy), Service Recommended (degraded past 80%), Replace Soon (significantly degraded), or Replace Now (critical). If you see anything other than Normal, book an assessment.' },
                { metric: 'Full Charge Capacity (mAh)', desc: 'The maximum charge your battery can currently hold. Compare this to the original design capacity to calculate your health percentage. A MacBook Pro 14-inch M1 Pro, for example, ships with a design capacity of approximately 6,068 mAh.' },
                { metric: 'Maximum Capacity', desc: 'On newer macOS versions, this appears as a percentage in System Settings under Battery > Battery Health. It represents Full Charge Capacity as a proportion of Design Capacity. Below 80% means replacement territory.' },
              ].map(({ metric, desc }) => (
                <div key={metric} className="bg-[rgba(15,234,122,0.04)] border border-[rgba(15,234,122,0.1)] rounded-xl p-4">
                  <h3 className="text-[#0FEA7A] font-bold mb-1">{metric}</h3>
                  <p className="text-[#7A9E98] text-sm leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Method 2: System Settings Battery Health */}
      <section className="py-10 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4">Method 2: System Settings Battery Health</h2>
          <div className="space-y-4 text-[#7A9E98] leading-relaxed">
            <p>
              On macOS Ventura and later, Apple added a simpler battery health readout directly in System Settings. Open <strong className="text-[#E8F4F1]">System Settings</strong>, click <strong className="text-[#E8F4F1]">Battery</strong> in the sidebar, then look for <strong className="text-[#E8F4F1]">Battery Health</strong>. Click the <strong className="text-[#E8F4F1]">info (i) icon</strong> next to it to see your maximum capacity percentage and condition status.
            </p>
            <p>
              This view also shows the <strong className="text-[#E8F4F1]">Battery Health Management</strong> toggle. When enabled, macOS learns your charging habits and may limit charging to 80% to reduce long-term chemical aging. This is useful if your MacBook is permanently connected to power — a desktop replacement scenario common in offices. However, if you depend on full battery capacity for load shedding, you should consider disabling it. With battery health management off, macOS always charges to 100%, giving you maximum runtime during power outages, but the battery will degrade slightly faster over its total lifespan. It is a trade-off we discuss with every client.
            </p>
            <p>
              On macOS Sequoia (15) and later, Apple introduced an additional <strong className="text-[#E8F4F1]">Charge Limit</strong> option that lets you cap charging at 80% permanently. This is separate from battery health management and is a manual override. We generally recommend leaving battery health management enabled and the charge limit off unless you have specific power management needs.
            </p>
          </div>
        </div>
      </section>

      {/* Method 3: Terminal Commands */}
      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4">Method 3: Terminal Commands (The Technical Check)</h2>
          <div className="space-y-4 text-[#7A9E98] leading-relaxed">
            <p>
              For precise, unfiltered battery data, Terminal is the tool we reach for in our workshop. Open <strong className="text-[#E8F4F1]">Terminal</strong> (Applications &gt; Utilities &gt; Terminal) and run:
            </p>
            <div className="bg-[#0A1A18] border border-[rgba(15,234,122,0.15)] rounded-xl p-5 font-mono text-sm my-4">
              <p className="text-[#0FEA7A]">system_profiler SPPowerDataType</p>
            </div>
            <p>
              This outputs a formatted summary of your battery state: charge information, health information (cycle count and condition), and AC charger information. It is the same data as System Information, but accessible without navigating menus.
            </p>
            <p>
              For the raw data we use in diagnostics, the <code className="text-[#0FEA7A] bg-[rgba(15,234,122,0.08)] px-1.5 py-0.5 rounded">ioreg</code> command reads directly from the I/O Registry — the kernel-level database of hardware state:
            </p>
            <div className="bg-[#0A1A18] border border-[rgba(15,234,122,0.15)] rounded-xl p-5 font-mono text-sm my-4 space-y-2">
              <p className="text-[#7A9E98]"># Full battery data dump</p>
              <p className="text-[#0FEA7A]">ioreg -rn AppleSmartBattery</p>
              <p className="text-[#7A9E98] mt-3"># Key capacity fields only</p>
              <p className="text-[#0FEA7A]">{`ioreg -rn AppleSmartBattery | grep -i "capacity\\|cycle"`}</p>
            </div>
            <p>
              The two fields that matter most in the <code className="text-[#0FEA7A] bg-[rgba(15,234,122,0.08)] px-1.5 py-0.5 rounded">ioreg</code> output are:
            </p>
            <div className="space-y-3 mt-4">
              <div className="bg-[rgba(15,234,122,0.04)] border border-[rgba(15,234,122,0.1)] rounded-xl p-4">
                <h3 className="text-[#0FEA7A] font-bold mb-1">&ldquo;NominalChargeCapacity&rdquo;</h3>
                <p className="text-[#7A9E98] text-sm leading-relaxed">
                  The current maximum charge your battery can hold, in mAh. This number decreases as the battery ages. It is the numerator in the health calculation. In our Health Check system, we read this value programmatically using <code className="text-[#0FEA7A] bg-[rgba(15,234,122,0.08)] px-1 py-0.5 rounded text-xs">ioreg -rn AppleSmartBattery</code> and report it to our dashboard.
                </p>
              </div>
              <div className="bg-[rgba(15,234,122,0.04)] border border-[rgba(15,234,122,0.1)] rounded-xl p-4">
                <h3 className="text-[#0FEA7A] font-bold mb-1">&ldquo;DesignCapacity&rdquo;</h3>
                <p className="text-[#7A9E98] text-sm leading-relaxed">
                  The original factory capacity in mAh — the battery&apos;s rated maximum when it was manufactured. This number never changes. It is the denominator in the health calculation. Divide NominalChargeCapacity by DesignCapacity, multiply by 100, and you have your battery health percentage.
                </p>
              </div>
            </div>
            <p className="mt-4">
              <strong className="text-[#E8F4F1]">Example calculation:</strong> If <code className="text-[#0FEA7A] bg-[rgba(15,234,122,0.08)] px-1.5 py-0.5 rounded">NominalChargeCapacity = 4200</code> and <code className="text-[#0FEA7A] bg-[rgba(15,234,122,0.08)] px-1.5 py-0.5 rounded">DesignCapacity = 5103</code>, your battery health is (4200 / 5103) &times; 100 = <strong className="text-[#0FEA7A]">82.3%</strong>. That is still above the 80% threshold, but getting close. At our workshop, we would flag this as &ldquo;monitor closely&rdquo; and check again in three months.
            </p>
          </div>
        </div>
      </section>

      {/* Third-Party Tools */}
      <section className="py-10 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4">Third-Party Tools: coconutBattery and iStat Menus</h2>
          <div className="space-y-4 text-[#7A9E98] leading-relaxed">
            <p>
              The tool we use in every single diagnostic at our Hyde Park workshop is <a href="https://www.coconut-flavour.com/coconutbattery/" target="_blank" rel="noopener noreferrer" className="text-[#0FEA7A] hover:underline font-semibold">coconutBattery</a> by coconut-flavour.com. The free version gives you everything you need: design capacity, current maximum capacity, cycle count, battery temperature, manufacturing date, charge status, and a visual health percentage bar. It also shows the macOS battery condition status and can log battery health over time.
            </p>
            <p>
              What makes coconutBattery superior to the built-in tools is its historical tracking. You can see how your battery has degraded over weeks and months, not just the current snapshot. For clients we manage under SLA, we take a coconutBattery reading at every visit and compare against the previous baseline. This is how we catch batteries that are degrading faster than expected — often a sign of load shedding damage or a faulty charging circuit.
            </p>
            <p>
              <a href="https://bjango.com/mac/istatmenus/" target="_blank" rel="noopener noreferrer" className="text-[#0FEA7A] hover:underline font-semibold">iStat Menus</a> by Bjango is another excellent option, though it is a paid application (around R300). It sits in your menu bar and provides real-time battery health, temperature, discharge rate, and time remaining. The most useful feature for battery monitoring is the notification system — iStat Menus can alert you when capacity drops below a threshold you set.
            </p>
          </div>
        </div>
      </section>

      {/* When to Replace */}
      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4">When to Replace Your MacBook Battery</h2>
          <div className="space-y-4 text-[#7A9E98] leading-relaxed">
            <p>
              After checking thousands of MacBook batteries at our workshop, we can give you clear thresholds. Replace your battery when any of the following are true:
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            {[
              { icon: Activity, title: 'Capacity Below 80%', desc: 'Maximum capacity below 80% of the original design capacity. Degradation accelerates past this point — a battery at 78% today will often be at 65% within six months.' },
              { icon: Zap, title: 'Cycle Count Exceeded', desc: 'Modern MacBooks (2010+): over 1,000 cycles. Pre-2010 models: over 300 cycles. Johannesburg machines often hit these thresholds 12 to 18 months early due to load shedding.' },
              { icon: BatteryWarning, title: 'Service Recommended Warning', desc: 'macOS displays Service Recommended, Replace Soon, or Replace Now in Battery Health. These warnings are generated by the battery management unit and indicate genuine degradation.' },
              { icon: AlertTriangle, title: 'Physical Swelling', desc: 'The trackpad feels stiff or clicks inconsistently. The bottom case appears slightly lifted or bulging. These are signs of a swollen lithium-polymer cell — bring the machine in immediately. Continued use risks trackpad or display damage.' },
              { icon: Battery, title: 'Random Shutdowns', desc: 'The Mac shuts down unexpectedly at 20%, 30%, or even 40% charge. This indicates the battery can no longer deliver consistent voltage under load. The calibration between reported and actual capacity has broken down.' },
              { icon: Info, title: 'Poor Calibration', desc: 'Battery percentage jumps erratically — 60% one moment, 15% the next, then back to 45%. The battery management unit can no longer accurately predict remaining charge. This often precedes sudden shutdowns.' },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-[rgba(15,234,122,0.04)] border border-[rgba(15,234,122,0.1)] rounded-xl p-5">
                <div className="flex items-center gap-2 mb-2">
                  <Icon className="w-5 h-5 text-[#0FEA7A]" />
                  <h3 className="text-[#E8F4F1] font-bold">{title}</h3>
                </div>
                <p className="text-[#7A9E98] text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Load Shedding Impact */}
      <section className="py-10 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-4">Load Shedding and MacBook Battery Health in South Africa</h2>
          <div className="space-y-4 text-[#7A9E98] leading-relaxed">
            <p>
              If you are in Johannesburg — or anywhere in South Africa — load shedding is the single biggest factor affecting your MacBook battery health. We have replaced hundreds of MacBook batteries that were well within their expected age but had cycle counts 40% to 60% higher than machines in countries without power instability.
            </p>
            <p>
              The mechanism is straightforward. Every time Eskom cuts power, your MacBook switches from AC to its internal battery. When power returns, it switches back and begins charging. Each of these transitions counts as a partial charge cycle. On a Stage 4 schedule with four daily outages, that is 8 to 12 extra partial cycles per day — roughly 3,000 to 4,000 extra partial cycles per year. Even accounting for the partial nature of these cycles, the cumulative effect is severe.
            </p>
            <p>
              The most effective protection is a quality UPS (uninterruptible power supply) that maintains clean AC power to your MacBook during outages, preventing the battery from cycling at all. For machines already past the damage threshold, a battery replacement and a UPS going forward is the best long-term investment. We advise every client in our managed IT services on this — it is that important.
            </p>
          </div>
        </div>
      </section>

      {/* Replacement Cost Table */}
      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4">MacBook Battery Replacement Costs (ZAR)</h2>
          <p className="text-[#7A9E98] mb-8 max-w-3xl leading-relaxed">
            If your battery health check reveals replacement is needed, here are our current prices at our Hyde Park workshop. All prices include the replacement cell, labour, full calibration, and a written 12-month warranty. No Fix No Fee applies to every repair.
          </p>
          <div className="overflow-x-auto rounded-2xl border border-[rgba(255,255,255,0.06)]">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[rgba(255,255,255,0.08)] bg-[rgba(15,234,122,0.06)]">
                  <th className="text-left text-[#E8F4F1] font-semibold px-5 py-4">Model</th>
                  <th className="text-left text-[#0FEA7A] font-semibold px-5 py-4">From</th>
                  <th className="text-left text-[#E8F4F1] font-semibold px-5 py-4">Cycle Rating</th>
                </tr>
              </thead>
              <tbody>
                {replacementCosts.map((row, i) => (
                  <tr key={row.model} className={`border-b border-[rgba(255,255,255,0.04)] ${i % 2 === 0 ? 'bg-[#0A1A18]' : 'bg-[#111C1A]'}`}>
                    <td className="text-[#E8F4F1] px-5 py-4 font-medium">{row.model}</td>
                    <td className="text-[#0FEA7A] px-5 py-4 font-bold">{row.from}</td>
                    <td className="text-[#7A9E98] px-5 py-4">{row.cycles} cycles</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-[#7A9E98] text-xs mt-4">
            Assessment from R599 — applied toward the repair cost if you proceed. Prices subject to model and availability. <Link href="/battery-replacement" className="text-[#0FEA7A] hover:underline">View full battery replacement pricing</Link>.
          </p>
        </div>
      </section>

      {/* Google Reviews */}
      <section className="py-10 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Suspense fallback={null}>
            <GoogleReviews />
          </Suspense>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQAccordion items={faqs} title="MacBook Battery Health — Common Questions" />
        </div>
      </section>

      {/* Related Links */}
      <section className="py-8 sm:py-16 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#E8F4F1] mb-6">Related Guides and Services</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              { label: 'All Battery Replacements', href: '/battery-replacement' },
              { label: 'MacBook Pro 13" Battery', href: '/battery-replacement/macbook-pro-13-inch' },
              { label: 'MacBook Air M1 Battery', href: '/battery-replacement/macbook-air-m1' },
              { label: 'MacBook Water Damage Guide', href: '/guides/macbook-water-damage-what-to-do' },
              { label: 'Logic Board Repair', href: '/logic-board-repair' },
              { label: 'Screen Repair', href: '/screen-repair' },
              { label: 'Contact Us', href: '/contact' },
              { label: 'Book an Assessment', href: '/contact' },
            ].map((link) => (
              <Link key={link.href + link.label} href={link.href} className="glass-card p-4 text-center group">
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
            <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3">Battery Health Looking Poor?</h2>
            <p className="text-[#7A9E98] mb-6 max-w-xl mx-auto leading-relaxed">
              WhatsApp us your cycle count and maximum capacity percentage — we will tell you honestly whether you need a replacement. Free diagnostic at our Hyde Park workshop. Same-day turnaround. No Fix No Fee. 12-month warranty on every battery we fit.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 hover:shadow-[0_0_32px_rgba(15,234,122,0.4)] transition-all"
              >
                WhatsApp for Battery Assessment
              </a>
              <a
                href={`tel:${CONTACT.phoneTel}`}
                className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all"
              >
                <Phone className="w-5 h-5" /> Call {CONTACT.phone}
              </a>
            </div>
            <p className="text-[#7A9E98] text-xs mt-6">
              1 Hyde Lane, Hyde Park, Office E2004, JHB 2196 | Assessment from R599 | 12-month warranty
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
