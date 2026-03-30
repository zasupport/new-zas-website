import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, ArrowRight, HardDrive } from 'lucide-react';
import SchemaOrg from '@/components/seo/SchemaOrg';
import { buildFaqSchema, LOCAL_BUSINESS_PROVIDER } from '@/lib/schema';
import FAQAccordion from '@/components/ui/FAQ';
import { CONTACT } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'iMac SSD Upgrade Johannesburg | Fusion Drive to SSD | ZA Support',
  description:
    'iMac SSD upgrade in Johannesburg. Replace slow hard drive or Fusion Drive with a fast SSD. Boot in under 20 seconds. All Intel iMac models. Data migration included. Hyde Park.',
  alternates: { canonical: 'https://zasupport.com/imac-repair/ssd-upgrade' },
};

const pricingRows = [
  { model: 'iMac 21.5" (2012–2019), HDD to SSD', storage: '500 GB SSD', note: 'Data migration included' },
  { model: 'iMac 21.5" (2012–2019), HDD to SSD', storage: '1 TB SSD', note: 'Data migration included' },
  { model: 'iMac 27" (2012–2019), HDD to SSD', storage: '500 GB SSD', note: 'Data migration included' },
  { model: 'iMac 27" (2012–2019), HDD to SSD', storage: '1 TB SSD', note: 'Data migration included' },
  { model: 'iMac 27" (2012–2019), Fusion Drive', storage: '1 TB SSD (replace both)', note: 'Removes Fusion, full SSD' },
  { model: 'iMac 27" (2017–2020), add SSD blade', storage: '512 GB NVMe blade', note: 'PCIe slot, no screen removal' },
];

const symptoms = [
  'Boot takes 2–5 minutes',
  'Apps take 30+ seconds to open',
  'Spinning beachball appears constantly',
  'macOS updates take hours to install',
  'Machine becomes unusable with multiple apps open',
  'Storage almost full warning',
];

const benefits = [
  { before: '3–5 minute boot', after: 'Under 20 seconds' },
  { before: 'Apps open in 30+ seconds', after: 'Apps open in 2–3 seconds' },
  { before: 'Constant beachball', after: 'Fluid, responsive feel' },
  { before: 'Slow file transfers', after: '5–10x faster read/write' },
  { before: 'Noisy spinning drive', after: 'Completely silent' },
];

const faqs = [
  {
    question: 'Which iMac models can have an SSD upgrade?',
    answer:
      'All Intel iMac models from 2012 onwards can have their internal storage replaced or upgraded with an SSD. The 2012–2019 iMac 21.5" and 27" models use a 3.5" SATA drive bay. The iMac 27" 2017–2020 also has a PCIe NVMe blade slot that can be upgraded without opening the display. The iMac M1 and M3 (24-inch, 2021+) have storage soldered to the chip, no upgrade is possible on these models.',
  },
  {
    question: 'What is a Fusion Drive and is it worth replacing?',
    answer:
      'A Fusion Drive combines a spinning hard drive (1–2 TB) with a small SSD cache (24–128 GB). macOS automatically moves frequently-used files to the SSD portion. In practice, Fusion Drives are significantly slower than pure SSDs, and as they age, the management software can cause data loss. We recommend replacing a Fusion Drive with a single pure SSD, the performance improvement is substantial and you eliminate the Fusion complexity.',
  },
  {
    question: 'Will you migrate my data to the new SSD?',
    answer:
      'Yes. Every iMac SSD upgrade includes full data migration, all your files, applications, settings, and user accounts are transferred to the new drive. We use Apple\'s Migration Assistant or cloning tools depending on the drive condition. You collect your iMac with everything exactly as it was, just faster.',
  },
  {
    question: 'How long does an iMac SSD upgrade take?',
    answer:
      'Opening the iMac 21.5" or 27" display takes 30–45 minutes. The SSD installation takes another 15–30 minutes. Data migration takes 1–4 hours depending on the amount of data (we use high-speed cloning). Total: most upgrades are completed same day or next morning. We give a time estimate when we receive the machine.',
  },
  {
    question: 'How do you open an iMac to replace the SSD?',
    answer:
      'iMac displays from 2012–2014 use a suction cup to remove the glass panel. From 2015 onwards, the display is sealed with adhesive strips. We use professional tools to separate the display without damaging it, then reseal it with new adhesive after the upgrade. The result is identical to the factory seal.',
  },
  {
    question: 'My iMac 27" already has a small SSD, can I get a faster or larger one?',
    answer:
      'Yes. The iMac 27" 2017–2020 has a dedicated PCIe NVMe slot separate from the main hard drive bay. You can add a blade SSD here without any display removal (accessed through the RAM door). Alternatively, we can replace the internal spinning drive with a larger SSD during a full upgrade.',
  },
];

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'iMac SSD Upgrade Johannesburg',
  description:
    'iMac SSD upgrade service in Johannesburg. Replace internal hard drive or Fusion Drive with a solid-state drive. Includes full data migration.',
  provider: LOCAL_BUSINESS_PROVIDER,
  areaServed: { '@type': 'City', name: 'Johannesburg' },
  serviceType: 'Computer Upgrade',
  offers: [
    { '@type': 'Offer', name: 'iMac SSD Upgrade 500 GB' },
    { '@type': 'Offer', name: 'iMac SSD Upgrade 1 TB' },
  ],
};

export default function IMacSSDUpgradePage() {
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
              <span className="text-white">SSD Upgrade</span>
            </Link>
          </div>
          <div className="inline-flex items-center gap-2 bg-green-500/20 text-green-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <HardDrive className="w-4 h-4" />
            iMac SSD Upgrade
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            iMac SSD Upgrade Johannesburg
          </h1>
          <p className="text-xl text-slate-300 mb-4 max-w-2xl mx-auto">
            Replace your slow spinning hard drive or Fusion Drive with a fast SSD.
            Boot in under 20 seconds. All Intel iMac models. Data migration included.
          </p>
          <p className="text-2xl font-bold text-green-400 mb-8">Assessment: from R599 · Fixed quote before we start</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`tel:${CONTACT.phone}`}
              className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-400 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-colors"
             target="_blank" rel="noopener noreferrer">
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

      {/* Symptoms */}
      <section className="py-12 px-4 bg-amber-50 border-b border-amber-100">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xl font-bold text-slate-900 mb-4">Signs your iMac needs an SSD upgrade:</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {symptoms.map((s) => (
              <div key={s} className="flex items-center gap-2 text-slate-700">
                <span className="w-2 h-2 bg-amber-400 rounded-full shrink-0" />
                {s}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Before/after */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 mb-2 text-center">What changes after an SSD upgrade</h2>
          <p className="text-slate-500 text-center mb-8">Real-world performance differences on a typical iMac 27"</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-slate-200 rounded-xl overflow-hidden">
              <thead className="bg-slate-900 text-white">
                <tr>
                  <th className="text-left p-4">Task</th>
                  <th className="text-left p-4 text-red-400">Before (HDD)</th>
                  <th className="text-left p-4 text-green-400">After (SSD)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {benefits.map((row) => (
                  <tr key={row.before} className="hover:bg-slate-50">
                    <td className="p-4 text-slate-500 text-xs">{['Boot time', 'App launch', 'Responsiveness', 'File speed', 'Noise'][benefits.indexOf(row)]}</td>
                    <td className="p-4 text-red-600">{row.before}</td>
                    <td className="p-4 text-green-600 font-medium">{row.after}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Upgrade Options */}
      <section className="py-16 px-4 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 mb-2 text-center">iMac SSD Upgrade Options</h2>
          <p className="text-slate-500 text-center mb-8">All upgrades include data migration. No hidden fees.</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-slate-200 rounded-xl overflow-hidden">
              <thead className="bg-slate-900 text-white">
                <tr>
                  <th className="text-left p-4">iMac Model</th>
                  <th className="text-left p-4">Storage</th>
                  <th className="text-left p-4">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {pricingRows.map((row) => (
                  <tr key={`${row.model}-${row.storage}`} className="hover:bg-slate-50">
                    <td className="p-4 text-slate-700">{row.model}</td>
                    <td className="p-4 text-slate-700">{row.storage}</td>
                    <td className="p-4 text-slate-500 text-xs">{row.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-center text-sm text-slate-500 mt-4">
            Assessment: from R599 and fixed quote before we start. Cost confirmed before any work begins.
          </p>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">How the Upgrade Works</h2>
          <div className="space-y-6">
            {[
              { step: '1', title: 'Bring in your iMac', desc: 'We inspect the machine, confirm the internal drive type (HDD, Fusion, or SSD blade), and quote a fixed price.' },
              { step: '2', title: 'Drive cloned or migrated', desc: 'We clone your existing drive to the new SSD using professional tools. Your files, apps, and settings transfer exactly.' },
              { step: '3', title: 'Display removed and drive replaced', desc: 'For most iMac models, the display is carefully separated, the drive replaced with the SSD, and the display resealed with new adhesive.' },
              { step: '4', title: 'macOS verified and tested', desc: 'We boot from the new SSD, verify all data transferred correctly, run a full system check, and time the boot.' },
              { step: '5', title: 'Collect same day or next morning', desc: 'Most upgrades are completed within 4–6 hours. We call when ready.' },
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

      {/* FAQ */}
      <section className="py-16 px-4 bg-slate-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">iMac SSD Upgrade Questions</h2>
          <FAQAccordion items={faqs} />
        </div>
      </section>

      {/* Also consider RAM */}
      <section className="py-12 px-4 bg-green-50 border-y border-green-100">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-bold text-slate-900 mb-1">Bundle with a RAM upgrade?</h3>
            <p className="text-slate-600 text-sm">
              For iMac 27" Intel models, adding RAM alongside the SSD upgrade doubles the impact.
              Both done in the same service visit, no extra opening required.
            </p>
          </div>
          <Link
            href="/imac-repair/ram-upgrade"
            className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white px-6 py-3 rounded-xl font-semibold whitespace-nowrap transition-colors"
          >
            RAM Upgrade
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-slate-900 text-white">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Book Your iMac SSD Upgrade</h2>
          <p className="text-slate-300 mb-8">
            Assessment: from R599. Fixed quote. Same-day turnaround for most models.
            Hyde Park, Johannesburg.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`tel:${CONTACT.phone}`}
              className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-400 text-white px-8 py-4 rounded-xl font-semibold transition-colors"
             target="_blank" rel="noopener noreferrer">
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
