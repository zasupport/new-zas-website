import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, ArrowRight, MemoryStick } from 'lucide-react';
import SchemaOrg from '@/components/seo/SchemaOrg';
import { buildFaqSchema, LOCAL_BUSINESS_PROVIDER } from '@/lib/schema';
import FAQAccordion from '@/components/ui/FAQ';
import { CONTACT } from '@/lib/constants';
import PricingNote from '@/components/PricingNote';

export const metadata: Metadata = {
  title: 'iMac RAM Upgrade Johannesburg | Up to 128 GB | ZA Support',
  description:
    'iMac RAM upgrade in Johannesburg. Upgrade iMac 27" Intel to 32 GB, 64 GB or 128 GB RAM. Tool-free installation via rear panel. Same-day service. Hyde Park.',
  alternates: { canonical: 'https://zasupport.com/imac-repair/ram-upgrade' },
};

const pricingRows = [
  { model: 'iMac 27" (2019–2020)', config: '16 GB → 32 GB (add 2× 8 GB)', price: 'Contact for pricing', note: 'No display removal needed' },
  { model: 'iMac 27" (2017–2020)', config: '8 GB → 32 GB (replace all)', price: 'Contact for pricing', note: 'No display removal needed' },
  { model: 'iMac 27" (2015–2020)', config: 'Upgrade to 64 GB', price: 'Contact for pricing', note: '4× 16 GB DDR4 SO-DIMMs' },
  { model: 'iMac 27" (2017–2020)', config: 'Upgrade to 128 GB', price: 'Contact for pricing', note: '4× 32 GB, maximum config' },
  { model: 'iMac 21.5" (2012–2015)', config: '8 GB → 16 GB', price: 'Contact for pricing', note: 'Requires display removal' },
  { model: 'iMac 21.5" (2019–2020 Intel)', config: 'RAM soldered, no upgrade', price: 'N/A', note: 'Cannot be upgraded' },
];

const symptoms = [
  'Apps slow down when multiple windows are open',
  'Spinning beachball when switching between apps',
  'macOS using "Swap Memory" according to Activity Monitor',
  'Video editing or photo editing is sluggish',
  'Browser with 10+ tabs causes slowdowns',
  'Virtual machines (Parallels, VMware) run poorly',
];

const benefits = [
  { task: 'Web browsing (20 tabs)', before: 'Sluggish, frequent reloads', after: 'Instant tab switching' },
  { task: 'Photo editing (Lightroom)', before: 'Slow previews, lag on export', after: 'Smooth editing, fast export' },
  { task: 'Video editing (Final Cut)', before: 'Dropped frames, proxy needed', after: 'Real-time 4K playback' },
  { task: 'Running Parallels / Windows', before: 'Constant pausing', after: 'Windows runs smoothly' },
  { task: 'Multiple apps open', before: 'System grinds to a halt', after: 'All apps stay responsive' },
];

const faqs = [
  {
    question: 'Which iMac models support a RAM upgrade?',
    answer:
      'The iMac 27" from 2012 through 2020 (Intel) has user-accessible RAM via a panel on the back, no tools required. These models support up to 64 GB (2012–2014 DDR3) or 128 GB (2015–2020 DDR4). The iMac 21.5" models from 2012–2015 can be upgraded but require full display removal (panel is not accessible from outside). The iMac 21.5" 2019 and 2020 (Intel) and all iMac M1, M3, and M4 models have RAM soldered to the logic board, no upgrade is possible.',
  },
  {
    question: 'How much RAM does my iMac actually need?',
    answer:
      'For everyday use (web, email, documents): 16 GB is comfortable. For photo editing, Lightroom, or multiple creative apps: 32 GB is the sweet spot. For video editing (4K), running virtual machines, or heavy multitasking: 64 GB makes a significant difference. 128 GB is only needed for extreme workloads (professional video editing, large virtual environments). We check Activity Monitor on your machine and recommend the configuration that addresses your actual usage patterns.',
  },
  {
    question: 'Does the iMac 27" RAM upgrade require opening the display?',
    answer:
      'No. The iMac 27" has a RAM access panel on the back of the stand, a small door with a spring-loaded button. The RAM slots are accessed through this panel without any display removal or special tools. This makes 27" RAM upgrades fast, low-risk, and straightforward.',
  },
  {
    question: 'What type of RAM does my iMac use?',
    answer:
      'iMac 27" 2012–2014 models use DDR3 SO-DIMMs (1600 MHz). The 2015–2019 models use DDR4 SO-DIMMs (2133–2666 MHz). The 2020 model uses DDR4 (2666 MHz). The number of slots is always 4, arranged in pairs, for best performance, install RAM in matched pairs (2 sticks of equal size). We source compatible, tested modules for your specific model.',
  },
  {
    question: 'Can I add RAM to my existing sticks or must I replace them all?',
    answer:
      'It depends on what slots are already populated. If your iMac came with 2 sticks in 2 of the 4 slots, you can add 2 more sticks into the empty slots, provided they match the speed and are the same size as the existing ones. If all 4 slots are already filled (common in factory 8 GB and 16 GB configs), you will need to replace all 4 sticks with larger ones. We check your current configuration before ordering anything.',
  },
  {
    question: 'How long does a RAM upgrade take?',
    answer:
      'For the iMac 27", the RAM panel door opens in seconds and the sticks swap in under 5 minutes. Including testing and verification, most 27" RAM upgrades are completed within 30–45 minutes. If the iMac 21.5" requires display removal (older models), allow 60–90 minutes total.',
  },
];

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'iMac RAM Upgrade Johannesburg',
  description:
    'iMac RAM upgrade service in Johannesburg. Upgrade iMac 27" Intel to 32 GB, 64 GB, or 128 GB. Tool-free installation on 27" models. Same-day service.',
  provider: LOCAL_BUSINESS_PROVIDER,
  areaServed: { '@type': 'City', name: 'Johannesburg' },
  serviceType: 'Computer Upgrade',
};

export default function IMacRAMUpgradePage() {
  const faqSchema = buildFaqSchema(faqs);

  return (
    <>
      <SchemaOrg schema={serviceSchema} />
      <SchemaOrg schema={faqSchema} />

      {/* Hero */}
      <section className="bg-gradient-to-b from-slate-900 to-slate-800 text-white py-10 sm:py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-4">
            <Link href="/imac-repair" className="text-sm text-slate-400 hover:text-green-400 flex items-center gap-1">
              iMac Repair
              <ArrowRight className="w-3 h-3" />
              <span className="text-white">RAM Upgrade</span>
            </Link>
          </div>
          <div className="inline-flex items-center gap-2 bg-green-500/20 text-green-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <MemoryStick className="w-4 h-4" />
            iMac RAM Upgrade
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            iMac RAM Upgrade Johannesburg
          </h1>
          <p className="text-xl text-slate-300 mb-4 max-w-2xl mx-auto">
            Upgrade your iMac 27" to 32 GB, 64 GB or 128 GB RAM.
            No display removal needed. Same-day service. Data untouched.
          </p>
          <p className="text-2xl font-bold text-green-400 mb-8">Contact us for a quote</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`tel:${CONTACT.phone}`}
              className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-400 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-colors">
              <Phone className="w-5 h-5" />
              {CONTACT.phone}
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 border border-slate-500 hover:border-green-400 text-slate-300 hover:text-green-400 px-8 py-4 rounded-xl font-semibold text-lg transition-colors"
            >
              Book Assessment
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Compatibility callout */}
      <section className="py-8 px-4 bg-green-50 border-b border-green-100">
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-6 justify-around text-center">
            <div>
              <p className="font-bold text-slate-900 text-lg">iMac 27" 2012–2020</p>
              <p className="text-green-700 text-sm font-medium">Tool-free via rear panel</p>
              <p className="text-slate-500 text-xs mt-1">Up to 64 GB (2012–2014) or 128 GB (2015–2020)</p>
            </div>
            <div className="hidden sm:block w-px bg-green-200" />
            <div>
              <p className="font-bold text-slate-900 text-lg">iMac 21.5" 2012–2015</p>
              <p className="text-amber-700 text-sm font-medium">Display removal required</p>
              <p className="text-slate-500 text-xs mt-1">Up to 16 GB, check model first</p>
            </div>
            <div className="hidden sm:block w-px bg-green-200" />
            <div>
              <p className="font-bold text-slate-900 text-lg">iMac 21.5" 2019–2020, M1, M3, M4</p>
              <p className="text-red-600 text-sm font-medium">Not upgradeable</p>
              <p className="text-slate-500 text-xs mt-1">RAM soldered to logic board</p>
            </div>
          </div>
        </div>
      </section>

      {/* Symptoms */}
      <section className="py-12 px-4 bg-amber-50 border-b border-amber-100">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xl font-bold text-slate-900 mb-4">Signs your iMac needs more RAM:</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {symptoms.map((s) => (
              <div key={s} className="flex items-center gap-2 text-slate-700">
                <span className="w-2 h-2 bg-amber-400 rounded-full shrink-0" />
                {s}
              </div>
            ))}
          </div>
          <p className="text-sm text-slate-500 mt-4">
            Quick check: open Activity Monitor → Memory tab. If "Memory Pressure" shows yellow or red, or "Swap Used" is above 0, more RAM will make an immediate difference.
          </p>
        </div>
      </section>

      {/* Before/after */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 mb-2 text-center">What changes with more RAM</h2>
          <p className="text-slate-500 text-center mb-8">Typical results after upgrading from 8 GB to 32 GB</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-slate-200 rounded-xl overflow-hidden">
              <thead className="bg-slate-900 text-white">
                <tr>
                  <th className="text-left p-4">Task</th>
                  <th className="text-left p-4 text-red-400">Before (8 GB)</th>
                  <th className="text-left p-4 text-green-400">After (32 GB)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {benefits.map((row) => (
                  <tr key={row.task} className="hover:bg-slate-50">
                    <td className="p-4 text-slate-600 text-xs font-medium">{row.task}</td>
                    <td className="p-4 text-red-600 text-xs">{row.before}</td>
                    <td className="p-4 text-green-600 text-xs font-medium">{row.after}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 px-4 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 mb-2 text-center">iMac RAM Upgrade, Configurations</h2>
          <p className="text-slate-500 text-center mb-8">Includes RAM modules and installation. Contact us for a quote. No hidden fees.</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-slate-200 rounded-xl overflow-hidden">
              <thead className="bg-slate-900 text-white">
                <tr>
                  <th className="text-left p-4">iMac Model</th>
                  <th className="text-left p-4">Configuration</th>
                  <th className="text-left p-4">Price</th>
                  <th className="text-left p-4">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {pricingRows.map((row) => (
                  <tr key={`${row.model}-${row.config}`} className={`hover:bg-slate-50 ${row.price === 'N/A' ? 'opacity-50' : ''}`}>
                    <td className="p-4 text-slate-700">{row.model}</td>
                    <td className="p-4 text-slate-700 text-xs">{row.config}</td>
                    <td className={`p-4 font-semibold ${row.price === 'N/A' ? 'text-slate-400' : 'text-green-600'}`}>{row.price}</td>
                    <td className="p-4 text-slate-500 text-xs">{row.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-center text-sm text-slate-500 mt-4">
            We check your current RAM configuration before ordering. Fixed quote, no surprises.
          </p>
          <PricingNote variant="inline" />
        </div>
      </section>

      {/* Process */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">How the Upgrade Works</h2>
          <div className="space-y-6">
            {[
              { step: '1', title: 'Bring in your iMac', desc: 'We check Activity Monitor, confirm your current RAM, and identify the maximum supported configuration for your model. Fixed quote before we proceed.' },
              { step: '2', title: 'Compatible modules sourced', desc: 'We source matched-pair DDR3 or DDR4 SO-DIMMs rated for your specific iMac. The wrong speed or pairing reduces performance even if it fits.' },
              { step: '3', title: 'RAM installed (27", no display removal)', desc: 'On 27" models, the rear RAM panel opens in seconds. Sticks slide in, panel closes. No adhesive, no display removal, no risk to the screen.' },
              { step: '4', title: 'macOS verified', desc: 'We boot into About This Mac, confirm the new RAM total, run a quick memory test, and check Activity Monitor to confirm pressure has dropped.' },
              { step: '5', title: 'Ready same day', desc: 'Most 27" upgrades are complete within an hour. Call ahead and we can often complete it while you wait.' },
            ].map((item) => (
              <div key={item.step} className="flex gap-4">
                <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-sm shrink-0 mt-0.5">
                  {item.step}
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">{item.title}</h3>
                  <p className="text-slate-500 text-sm mt-1">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Activity Monitor guide */}
      <section className="py-12 px-4 bg-slate-50 border-y border-slate-200">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xl font-bold text-slate-900 mb-4">How to check if you need more RAM right now</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { step: '1', text: 'Open Activity Monitor (Applications → Utilities)' },
              { step: '2', text: 'Click the Memory tab at the top' },
              { step: '3', text: 'Look at "Memory Pressure" (bottom left), green = fine, yellow/red = upgrade needed' },
            ].map((item) => (
              <div key={item.step} className="bg-white rounded-xl p-4 border border-slate-200">
                <div className="w-7 h-7 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold mb-3">
                  {item.step}
                </div>
                <p className="text-slate-700 text-sm">{item.text}</p>
              </div>
            ))}
          </div>
          <p className="text-slate-500 text-sm mt-4">
            Also check "Swap Used", if this number is anything other than zero, your Mac is using the much-slower SSD as overflow memory. RAM pressure relief is immediate after an upgrade.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">iMac RAM Upgrade Questions</h2>
          <FAQAccordion items={faqs} />
        </div>
      </section>

      {/* Also consider SSD */}
      <section className="py-12 px-4 bg-green-50 border-y border-green-100">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-bold text-slate-900 mb-1">Bundle with an SSD upgrade?</h3>
            <p className="text-slate-600 text-sm">
              For iMac 27" Intel models, combining the RAM upgrade with an SSD replacement gives you the full performance transformation in one visit.
              SSD + 32 GB RAM, same service visit, no extra charge for opening. Contact us for a quote.
            </p>
          </div>
          <Link
            href="/imac-repair/ssd-upgrade"
            className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white px-6 py-3 rounded-xl font-semibold whitespace-nowrap transition-colors"
          >
            SSD Upgrade
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-slate-900 text-white">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Book Your iMac RAM Upgrade</h2>
          <p className="text-slate-300 mb-8">
            Assessment: from R599. Fixed quote. Same-day turnaround on iMac 27" models.
            Hyde Park, Johannesburg.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`tel:${CONTACT.phone}`}
              className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-400 text-white px-8 py-4 rounded-xl font-semibold transition-colors">
              <Phone className="w-5 h-5" />
              {CONTACT.phone}
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 border border-slate-600 hover:border-green-400 text-slate-300 hover:text-green-400 px-8 py-4 rounded-xl font-semibold transition-colors"
            >
              Book Online
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
