import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, CheckCircle, ArrowRight, MapPin, Thermometer, AlertTriangle } from 'lucide-react';
import SchemaOrg from '@/components/seo/SchemaOrg';
import { buildFaqSchema, buildBreadcrumbSchema, LOCAL_BUSINESS_PROVIDER } from '@/lib/schema';
import FAQAccordion from '@/components/ui/FAQ';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { CONTACT, buildWhatsAppUrl } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'MacBook Overheating? 8 Proven Fixes for 2026 | ZA Support',
  description:
    'Fix MacBook overheating with 8 proven methods. SMC reset, fan cleaning, thermal paste, Activity Monitor tips. Professional thermal service in Johannesburg.',
  alternates: { canonical: 'https://zasupport.com/guides/macbook-overheating-fix' },
};

const faqs = [
  {
    question: 'Why is my MacBook overheating for no reason?',
    answer:
      'There is always a reason. The most common causes are runaway processes (check Activity Monitor), dust-blocked vents, degraded thermal paste on 2015-2019 models, or a failing fan. In Johannesburg, ambient temperatures above 30\u00b0C during summer make thermal management harder. If your MacBook is hot to touch at idle, something is wrong. Assessment from R599 at ZA Support in Hyde Park.',
  },
  {
    question: 'How do I check if my MacBook fan is working?',
    answer:
      'Open Activity Monitor, click the CPU tab, and push the processor with a demanding task. You should hear the fan spin up within 30 seconds. If you hear nothing, the fan may have failed. On Apple Silicon Macs (M1, M2, M3, M4), the MacBook Air has no fan by design. MacBook Pros should always have audible fan response under load.',
  },
  {
    question: 'Can overheating damage my MacBook permanently?',
    answer:
      'Yes. Sustained temperatures above 95\u00b0C can damage solder joints on the logic board, degrade the battery (lithium-ion cells lose capacity faster above 35\u00b0C), and cause thermal discolouration on the display panel. We have repaired MacBooks where chronic overheating caused GPU desoldering on 2012-2015 MacBook Pros. Early intervention prevents expensive board-level damage.',
  },
  {
    question: 'Does thermal paste need replacing on a MacBook?',
    answer:
      'On Intel MacBooks from 2015-2019, yes. Apple used decent thermal paste but it degrades after 4-5 years. We have measured 10-15\u00b0C temperature drops after repasting with high-quality thermal compound like Thermal Grizzly Kryonaut. Apple Silicon Macs (M1 onwards) run cooler by design and rarely need repasting.',
  },
  {
    question: 'Why does my MacBook overheat with Chrome?',
    answer:
      'Chrome is a known resource hog on macOS. Each tab runs as a separate process, and 15-20 tabs can consume 4-6 GB of RAM and significant CPU. Hardware acceleration in Chrome also taxes the GPU. We recommend Safari for daily browsing on Mac \u2014 it uses roughly 40% less energy than Chrome. If you must use Chrome, install The Great Suspender extension to freeze inactive tabs.',
  },
  {
    question: 'Is it normal for a MacBook to get hot when charging?',
    answer:
      'Warm is normal. Hot is not. During charging, the battery generates heat \u2014 especially with fast charging on USB-C MacBooks. If the bottom case is too hot to touch comfortably (above 45\u00b0C surface temperature), there may be a battery issue or power management IC fault. In South Africa, charging immediately after load shedding (when power surges are common) can stress the charging circuit.',
  },
  {
    question: 'How much does MacBook thermal repair cost at ZA Support?',
    answer:
      'Assessment starts from R599 with our No Fix No Fee guarantee. Fan replacement typically costs R1,200-R2,500 depending on the model. Thermal paste replacement is R800-R1,500. Logic board thermal sensor repair is quoted after assessment. We are based at 1 Hyde Park Lane, Hyde Park, Johannesburg 2196.',
  },
  {
    question: 'Can load shedding cause MacBook overheating?',
    answer:
      'Indirectly, yes. Repeated hard shutdowns during load shedding can corrupt the SMC firmware on Intel Macs, causing fans to behave erratically. Power surges when electricity returns can damage the power management IC, which controls thermal throttling. We see a spike in thermal-related repairs after extended load shedding periods in Johannesburg.',
  },
  {
    question: 'What temperature is too hot for a MacBook?',
    answer:
      'CPU temperatures of 35-45\u00b0C at idle are normal. Light work sits around 45-70\u00b0C. Heavy tasks like video export or compiling code push 70-90\u00b0C, which is acceptable. Above 90\u00b0C, macOS begins thermal throttling \u2014 slowing the CPU to reduce heat. If you regularly hit 95-100\u00b0C, something needs attention. Use the free Intel Power Gadget (Intel Macs) or Hot app (Apple Silicon) to monitor.',
  },
  {
    question: 'Should I use a laptop stand to prevent overheating?',
    answer:
      'Absolutely. Elevating the MacBook by even 2-3 cm improves airflow dramatically. The intake vents on MacBook Pros are along the hinge area, and a flat desk restricts airflow. A simple aluminium stand (R300-R600 from Takealot) can reduce temperatures by 5-8\u00b0C. Avoid laptop cooling pads with built-in fans \u2014 they push dust into the MacBook\u2019s own vents.',
  },
  {
    question: 'Does ZA Support collect MacBooks for thermal repair?',
    answer:
      'Yes. We collect from Sandton, Rosebank, Fourways, Bryanston, Midrand, Randburg, and surrounding Johannesburg suburbs. WhatsApp 064 529 5863 to arrange same-day collection. Assessment from R599 with No Fix No Fee.',
  },
];

const howToSteps = [
  {
    name: 'Check Activity Monitor for runaway processes',
    text: 'Open Activity Monitor (Applications > Utilities > Activity Monitor). Click the CPU tab and sort by % CPU descending. Look for kernel_task consuming more than 200% CPU, WindowServer above 50%, or mds_stores running continuously. kernel_task inflates its CPU usage deliberately to throttle other processes when the Mac is too hot. If mds_stores is high, Spotlight is indexing \u2014 let it finish or exclude large folders in System Settings > Spotlight.',
  },
  {
    name: 'Reset SMC (Intel) or restart (Apple Silicon)',
    text: 'The System Management Controller on Intel Macs manages fan speed, thermal management, battery charging, and sleep behaviour. To reset: shut down, hold Shift+Control+Option+Power for 10 seconds, release, then power on. On T2 Macs (2018-2020): shut down, hold all four keys for 7 seconds, then hold Power for another 7 seconds. Apple Silicon Macs (M1, M2, M3, M4) have no SMC \u2014 a simple restart resets the equivalent thermal management firmware.',
  },
  {
    name: 'Clean fans and air vents',
    text: 'Dust is the most common physical cause of overheating. Use compressed air (available at most electronics shops in South Africa for R80-R150) to blow out the vents along the hinge of the MacBook. Hold the can upright, use short bursts, and keep the nozzle 5-10 cm from the vents. For thorough cleaning, the bottom case can be removed with a Pentalobe P5 screwdriver. Never use a vacuum cleaner directly on the logic board \u2014 static discharge can damage components.',
  },
  {
    name: 'Check and replace thermal paste',
    text: 'On Intel MacBooks from 2015-2019, the factory thermal paste between the CPU die and heatsink degrades after 4-5 years, becoming dry and cracked. This creates an insulating layer instead of a conductive one. Replacing it requires removing the heatsink, cleaning both surfaces with 99% isopropyl alcohol, and applying a rice-grain-sized amount of quality thermal compound. We use Thermal Grizzly Kryonaut at our Hyde Park workshop. This alone can drop temperatures by 10-15\u00b0C.',
  },
  {
    name: 'Address software causes',
    text: 'Three common software culprits: (1) Chrome with many tabs \u2014 each tab is a separate process consuming CPU and RAM. Switch to Safari or limit tabs. (2) Spotlight indexing after a macOS update \u2014 this runs mds_stores at high CPU for 1-24 hours depending on disk size. Let it complete. (3) Time Machine initial backup \u2014 the first backup indexes and copies your entire drive. Run it overnight. Also check for macOS updates \u2014 Apple frequently patches thermal management bugs.',
  },
  {
    name: 'Inspect hardware components',
    text: 'A failing fan is the most common hardware cause. Listen for grinding, clicking, or complete silence under load. The MacBook Pro fan should spin at 1,200-6,200 RPM depending on the model. A blocked heatsink (visible when the bottom case is removed) prevents heat transfer even with a working fan. Damaged thermal sensors send incorrect readings to the SMC, causing fans to run at maximum or minimum speed regardless of actual temperature.',
  },
  {
    name: 'Diagnose logic board thermal issues',
    text: 'If cleaning and software fixes have not resolved the overheating, the issue may be on the logic board itself. Thermal sensor ICs can fail, sending incorrect temperature readings. The power management IC (PMIC) can develop faults that cause excessive current draw and localised heating. On 2012-2015 MacBook Pros, the discrete GPU is a known failure point \u2014 it overheats, causes solder joint cracks, and eventually fails completely. These require component-level diagnosis with a thermal camera and multimeter.',
  },
  {
    name: 'Seek professional thermal service',
    text: 'If you have tried the above steps and your MacBook still overheats, book an assessment at ZA Support. We use thermal imaging cameras to identify hot spots on the logic board, measure fan RPM with tachometer readings, and test thermal paste conductivity. Assessment from R599 with No Fix No Fee guarantee. We are at 1 Hyde Park Lane, Hyde Park, Johannesburg. WhatsApp 064 529 5863 for same-day collection from Sandton, Rosebank, Fourways, Bryanston, Midrand, and Randburg.',
  },
];

const faqSchema = buildFaqSchema(faqs);

const breadcrumbSchema = buildBreadcrumbSchema([
  { name: 'Home', url: 'https://zasupport.com' },
  { name: 'Guides', url: 'https://zasupport.com/guides' },
  { name: 'MacBook Overheating Fix', url: 'https://zasupport.com/guides/macbook-overheating-fix' },
]);

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Fix MacBook Overheating',
  description:
    'Step-by-step guide to diagnosing and fixing MacBook overheating issues, from software fixes to hardware repair.',
  totalTime: 'PT2H',
  estimatedCost: {
    '@type': 'MonetaryAmount',
    currency: 'ZAR',
    value: '599',
  },
  supply: [
    { '@type': 'HowToSupply', name: 'Compressed air can' },
    { '@type': 'HowToSupply', name: 'Pentalobe P5 screwdriver (optional)' },
    { '@type': 'HowToSupply', name: 'Thermal paste (if repasting)' },
    { '@type': 'HowToSupply', name: '99% isopropyl alcohol (if repasting)' },
  ],
  tool: [
    { '@type': 'HowToTool', name: 'Activity Monitor (built into macOS)' },
    { '@type': 'HowToTool', name: 'Temperature monitoring app (Hot or Intel Power Gadget)' },
  ],
  step: howToSteps.map((s, i) => ({
    '@type': 'HowToStep',
    position: i + 1,
    name: s.name,
    text: s.text,
  })),
};

export default function MacBookOverheatingFixPage() {
  return (
    <>
      <SchemaOrg schema={faqSchema} />
      <SchemaOrg schema={breadcrumbSchema} />
      <SchemaOrg schema={howToSchema} />

      {/* Hero */}
      <section className="hero-gradient grid-overlay pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb
            items={[
              { label: 'Guides', href: '/guides' },
              { label: 'MacBook Overheating Fix' },
            ]}
          />
          <div className="mt-8 max-w-4xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#E8F4F1] leading-tight mb-6">
              MacBook Overheating?
              <br />
              <span className="text-[#0FEA7A]">Here&apos;s How to Fix It</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-4 max-w-3xl leading-relaxed">
              Your MacBook running hot is not normal. Whether it is a software hog, dust-clogged
              fans, or a failing thermal sensor on the logic board, this guide covers every cause
              and fix we have seen in 16 years of Mac repair in Johannesburg.
            </p>
            <div className="flex items-center gap-2 text-[#7A9E98] text-sm mb-8">
              <MapPin className="w-4 h-4 text-[#0FEA7A]" />
              <span>
                1 Hyde Park Lane, Hyde Park, Johannesburg 2196 | Assessment from R599 | No Fix No
                Fee
              </span>
            </div>
            <div className="flex flex-wrap gap-4 mb-8">
              {['No Fix No Fee', '12-Month Warranty', 'Assessment from R599', 'Same-Day Collection'].map((l) => (
                <div
                  key={l}
                  className="flex items-center gap-2 bg-[rgba(15,234,122,0.08)] border border-[rgba(15,234,122,0.15)] px-4 py-2 rounded-full"
                >
                  <CheckCircle className="w-4 h-4 text-[#0FEA7A]" />
                  <span className="text-[#E8F4F1] text-sm font-medium">{l}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={buildWhatsAppUrl('GUIDE-OVERHEAT-HERO', 'general', 'Hi, my MacBook is overheating and I need help')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 hover:shadow-[0_0_32px_rgba(15,234,122,0.4)] transition-all"
              >
                WhatsApp for Help
              </a>
              <a
                href={`tel:${CONTACT.phoneTel}`}
                className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all"
              >
                <Phone className="w-5 h-5" /> Call {CONTACT.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Temperature Thresholds */}
      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-4">
            MacBook Temperature Thresholds: What Is Normal?
          </h2>
          <p className="text-[#7A9E98] mb-8 leading-relaxed">
            Before troubleshooting, you need to know what temperatures are actually concerning.
            We measure these daily in our Hyde Park workshop using thermal imaging cameras.
            In Johannesburg, ambient temperatures regularly exceed 30&deg;C during summer, which
            means your MacBook starts with a higher baseline than a Mac in London or New York.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                range: '35-45\u00b0C',
                label: 'Normal',
                colour: 'text-[#0FEA7A]',
                border: 'border-[rgba(15,234,122,0.3)]',
                desc: 'Idle or light browsing. The MacBook feels cool to warm. No action needed.',
              },
              {
                range: '45-70\u00b0C',
                label: 'Warm',
                colour: 'text-yellow-400',
                border: 'border-yellow-400/30',
                desc: 'Normal under moderate load. Video calls, multiple apps, light photo editing. Fans may spin up.',
              },
              {
                range: '70-90\u00b0C',
                label: 'Hot',
                colour: 'text-orange-400',
                border: 'border-orange-400/30',
                desc: 'Heavy workload: video export, code compiling, gaming. Acceptable but monitor if sustained.',
              },
              {
                range: '90\u00b0C+',
                label: 'Critical',
                colour: 'text-red-400',
                border: 'border-red-400/30',
                desc: 'Thermal throttling active. macOS slows the CPU to prevent damage. Needs investigation.',
              },
            ].map((t) => (
              <div key={t.label} className={`glass-card p-5 border ${t.border}`}>
                <div className={`text-2xl font-bold ${t.colour} mb-1`}>{t.range}</div>
                <div className={`text-sm font-semibold ${t.colour} mb-2`}>{t.label}</div>
                <p className="text-[#7A9E98] text-sm leading-relaxed">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8 Fixes — HowTo Steps */}
      <section className="py-10 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-4">
            8 Proven Fixes for MacBook Overheating
          </h2>
          <p className="text-[#7A9E98] mb-8 leading-relaxed">
            Work through these in order. Steps 1-5 are things you can try at home. Steps 6-8
            require opening the MacBook or professional equipment. In our experience, roughly 60%
            of overheating cases are resolved by steps 1-3 alone.
          </p>
          <div className="space-y-6">
            {howToSteps.map((step, i) => (
              <div key={step.name} className="glass-card p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[rgba(15,234,122,0.15)] flex items-center justify-center">
                    <span className="text-[#0FEA7A] font-bold text-lg">{i + 1}</span>
                  </div>
                  <div>
                    <h3 className="text-[#E8F4F1] font-bold text-lg mb-2">{step.name}</h3>
                    <p className="text-[#7A9E98] text-sm leading-relaxed">{step.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Software vs Hardware Causes */}
      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-4">
            Software vs Hardware: Identifying the Root Cause
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-card p-6">
              <div className="flex items-center gap-2 mb-4">
                <Thermometer className="w-5 h-5 text-[#0FEA7A]" />
                <h3 className="text-[#E8F4F1] font-bold text-lg">Software Causes</h3>
              </div>
              <ul className="space-y-3 text-[#7A9E98] text-sm leading-relaxed">
                <li>
                  <strong className="text-[#E8F4F1]">Chrome with 20+ tabs</strong> &mdash; each tab
                  runs as a separate process. We have seen Chrome alone push a MacBook Pro to 95&deg;C.
                </li>
                <li>
                  <strong className="text-[#E8F4F1]">Spotlight indexing after OS update</strong> &mdash;
                  mds_stores runs at high CPU for up to 24 hours. Let it finish or exclude
                  large external drives.
                </li>
                <li>
                  <strong className="text-[#E8F4F1]">Time Machine initial backup</strong> &mdash; the
                  first backup copies your entire drive. Run it overnight on a wired connection.
                </li>
                <li>
                  <strong className="text-[#E8F4F1]">Rogue apps</strong> &mdash; Zoom, Slack, and
                  Microsoft Teams are known CPU hogs. Close what you are not using.
                </li>
                <li>
                  <strong className="text-[#E8F4F1]">macOS bugs</strong> &mdash; Apple occasionally
                  ships thermal management bugs. Always install the latest macOS point release.
                </li>
              </ul>
            </div>
            <div className="glass-card p-6">
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle className="w-5 h-5 text-orange-400" />
                <h3 className="text-[#E8F4F1] font-bold text-lg">Hardware Causes</h3>
              </div>
              <ul className="space-y-3 text-[#7A9E98] text-sm leading-relaxed">
                <li>
                  <strong className="text-[#E8F4F1]">Failing fan</strong> &mdash; grinding, clicking,
                  or silence under load. The most common hardware cause we see.
                </li>
                <li>
                  <strong className="text-[#E8F4F1]">Blocked heatsink</strong> &mdash; dust and pet
                  hair accumulate between the fan and heatsink fins, creating an insulating blanket.
                </li>
                <li>
                  <strong className="text-[#E8F4F1]">Damaged thermal sensor</strong> &mdash; sends
                  incorrect readings to the SMC. Fans run at max or min regardless of actual temperature.
                </li>
                <li>
                  <strong className="text-[#E8F4F1]">Degraded thermal paste</strong> &mdash; on
                  2015-2019 Intel MacBooks, the paste dries out after 4-5 years.
                </li>
                <li>
                  <strong className="text-[#E8F4F1]">Logic board fault</strong> &mdash; thermal
                  sensor IC, power management IC, or GPU desoldering (2012-2015 MacBook Pros).
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SA-Specific Context */}
      <section className="py-10 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-4">
            MacBook Overheating in South Africa: Local Factors
          </h2>
          <p className="text-[#7A9E98] mb-6 leading-relaxed">
            Working in Johannesburg introduces unique thermal challenges that guides written for
            European or American audiences simply do not cover. We have been repairing Macs here
            since 2009, and these are the South Africa-specific factors we see repeatedly.
          </p>
          <div className="space-y-4">
            <div className="glass-card p-5">
              <h3 className="text-[#E8F4F1] font-bold mb-2">Johannesburg Summer Ambient Temperatures</h3>
              <p className="text-[#7A9E98] text-sm leading-relaxed">
                JHB summers regularly hit 30-35&deg;C. Your MacBook&apos;s cooling system is designed
                assuming 22-25&deg;C ambient. That 10&deg;C difference means the Mac starts closer
                to its thermal limit before you even open an app. Working in direct sunlight near
                a window in Sandton or Rosebank pushes surface temperatures to 40&deg;C+ before
                the CPU even loads.
              </p>
            </div>
            <div className="glass-card p-5">
              <h3 className="text-[#E8F4F1] font-bold mb-2">Load Shedding and Repeated Hard Shutdowns</h3>
              <p className="text-[#7A9E98] text-sm leading-relaxed">
                Every hard shutdown during load shedding risks corrupting the SMC firmware on Intel
                Macs. We have seen Macs that went through months of Stage 4-6 load shedding with
                fans stuck at maximum speed or not spinning at all. An SMC reset (step 2 above)
                often resolves this. Power surges when electricity returns can damage the power
                management IC, which directly controls thermal throttling behaviour.
              </p>
            </div>
            <div className="glass-card p-5">
              <h3 className="text-[#E8F4F1] font-bold mb-2">Dust and Highveld Air Quality</h3>
              <p className="text-[#7A9E98] text-sm leading-relaxed">
                The Highveld&apos;s dry winters and construction dust (especially in rapidly
                developing areas like Midrand and Fourways) mean MacBook vents clog faster than
                in coastal cities. We recommend compressed air cleaning every 6 months if you work
                in an area with active construction or near main roads.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* When It Is a Logic Board Issue */}
      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-4">
            When Overheating Points to a Logic Board Problem
          </h2>
          <p className="text-[#7A9E98] mb-6 leading-relaxed">
            If you have cleaned the fans, reset the SMC, checked Activity Monitor, and the MacBook
            still overheats at idle, the problem is likely on the logic board itself. This is where
            our component-level repair expertise comes in. The most common logic board thermal
            faults we repair:
          </p>
          <div className="space-y-4">
            <div className="glass-card p-5">
              <h3 className="text-[#E8F4F1] font-bold mb-2">Thermal Sensor IC Failure</h3>
              <p className="text-[#7A9E98] text-sm leading-relaxed">
                The logic board has multiple thermal sensors monitoring CPU, GPU, battery, and
                ambient temperature. When one fails, the SMC receives incorrect data and cannot
                manage fan speed correctly. We diagnose this by comparing sensor readings against
                actual temperatures measured with a thermal camera. Replacing the failed sensor IC
                restores correct thermal management.
              </p>
            </div>
            <div className="glass-card p-5">
              <h3 className="text-[#E8F4F1] font-bold mb-2">Power Management IC Running Hot</h3>
              <p className="text-[#7A9E98] text-sm leading-relaxed">
                The PMIC (power management integrated circuit) regulates voltage across the entire
                logic board. A damaged PMIC draws excessive current, generating localised heat that
                spreads to surrounding components. Under thermal imaging, we see a distinct hot spot
                around the PMIC area. This is a component-level repair &mdash; the IC itself is
                replaced, not the entire logic board.
              </p>
            </div>
            <div className="glass-card p-5">
              <h3 className="text-[#E8F4F1] font-bold mb-2">GPU Desoldering (2012-2015 MacBook Pro)</h3>
              <p className="text-[#7A9E98] text-sm leading-relaxed">
                The 2012-2015 MacBook Pro 15-inch models with discrete AMD GPUs are notorious for
                thermal failure. The GPU&apos;s solder balls crack under repeated thermal cycling,
                causing graphical glitches, kernel panics, and eventually complete failure. We have
                repaired hundreds of these boards. If your 2012-2015 MacBook Pro shows visual
                artefacts and overheats, this is almost certainly the cause.
              </p>
            </div>
          </div>
          <div className="mt-6">
            <Link
              href="/logic-board-repair"
              className="inline-flex items-center gap-2 text-[#0FEA7A] font-semibold hover:underline"
            >
              Full logic board repair details <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-10 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQAccordion
            items={faqs}
            title="MacBook Overheating — Frequently Asked Questions"
          />
        </div>
      </section>

      {/* Related Pages */}
      <section className="py-8 sm:py-16 bg-[#111C1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#E8F4F1] mb-6">Related Services</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              { label: 'Logic Board Repair', href: '/logic-board-repair' },
              { label: 'Screen Repair', href: '/screen-repair' },
              { label: 'Battery Replacement', href: '/battery-replacement' },
              { label: 'Contact Us', href: '/contact' },
              { label: 'MacBook Pro Repair', href: '/macbook-pro-repair' },
              { label: 'Liquid Damage Repair', href: '/liquid-damage' },
              { label: 'MacBook Not Turning On', href: '/macbook-not-turning-on' },
              { label: 'Managed IT Services', href: '/managed-services' },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="glass-card p-4 text-center group"
              >
                <span className="text-[#E8F4F1] text-sm font-semibold group-hover:text-[#0FEA7A] transition-colors">
                  {link.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-8 sm:py-16 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-[rgba(39,80,77,0.3)] border border-[rgba(15,234,122,0.2)] rounded-3xl p-10">
            <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3">
              MacBook Still Overheating? We Can Fix It.
            </h2>
            <p className="text-[#7A9E98] mb-6">
              Professional thermal diagnosis with thermal imaging cameras. Assessment from R599.
              No Fix No Fee. Collection from Sandton, Rosebank, Fourways, Bryanston, Midrand,
              and Randburg.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={buildWhatsAppUrl('GUIDE-OVERHEAT-CTA', 'general', 'Hi, my MacBook is overheating and I need professional help')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 transition-all"
              >
                WhatsApp for Assessment
              </a>
              <a
                href={`tel:${CONTACT.phoneTel}`}
                className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all"
              >
                <Phone className="w-5 h-5" /> Call {CONTACT.phone}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
