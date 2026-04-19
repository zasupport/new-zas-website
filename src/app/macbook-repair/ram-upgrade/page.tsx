import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, ArrowRight, Cpu, Zap, Shield, CheckCircle, AlertTriangle } from 'lucide-react';
import SchemaOrg from '@/components/seo/SchemaOrg';
import { buildFaqSchema, buildBreadcrumbSchema, LOCAL_BUSINESS_PROVIDER } from '@/lib/schema';
import FAQAccordion from '@/components/ui/FAQ';
import { CONTACT, buildWhatsAppUrl} from '@/lib/constants';

export const metadata: Metadata = {
  title: 'MacBook RAM Upgrade Johannesburg | Intel Mac Memory | ZA Support',
  description:
    'MacBook RAM upgrade in Johannesburg. Upgrade memory on Intel MacBook Pro. More RAM = faster multitasking. Assessment: from R599. Hyde Park. up-to-3 year warranty.',
  alternates: { canonical: 'https://zasupport.com/macbook-repair/ram-upgrade' },
};

const supportedModels = [
  { model: 'MacBook Pro 13" 2012–2015', note: 'SO-DIMM slots — upgradeable' },
  { model: 'MacBook Pro 15" 2012–2019', note: 'SO-DIMM slots — upgradeable' },
  { model: 'MacBook Pro 16" 2019', note: 'SO-DIMM slots — upgradeable' },
];

const notSupported = [
  'MacBook Air (all models — RAM soldered)',
  'Apple Silicon MacBooks (M1/M2/M3/M4 — unified memory)',
  'MacBook Pro 2020 and later (RAM soldered)',
  'MacBook Pro 13" 2016–2019 (RAM soldered)',
];

const symptoms = [
  'Spinning beachball with multiple apps open',
  'Slow when switching between apps',
  'Browser tabs crash or reload',
  '"Your system has run out of application memory" alert',
  'Slow video editing or design work',
  'macOS constantly writing to disk (swap)',
];

const benefits = [
  { task: 'Multitasking', before: '8 GB — apps fight for memory', after: '16 GB — plenty of headroom' },
  { task: 'Browser tabs', before: 'Tabs crash and reload', after: 'All tabs stay loaded' },
  { task: 'Video export', before: 'Slow — relies on disk swap', after: 'Significantly faster' },
  { task: 'Design work', before: 'Photoshop/Figma lag', after: 'Smooth with large files' },
  { task: 'Responsiveness', before: 'Constant beachball', after: 'Fluid switching' },
];

const steps = [
  {
    step: '1',
    title: 'Assessment',
    desc: 'We inspect your MacBook Pro, confirm it has removable SO-DIMM slots, and check the maximum supported RAM.',
  },
  {
    step: '2',
    title: 'Quote',
    desc: 'Assessment fee is from R599, payable on confirmation. Fixed price confirmed before we start.',
  },
  {
    step: '3',
    title: 'Upgrade',
    desc: 'Old RAM modules removed. New modules installed and seated correctly. No data migration needed — RAM upgrade does not affect your files.',
  },
  {
    step: '4',
    title: 'Full test and return',
    desc: 'We verify the new RAM is recognised by macOS, run a memory test, and confirm system stability. Collected same day.',
  },
];

const faqs = [
  {
    question: 'Which MacBook models support a RAM upgrade?',
    answer:
      'Only Intel MacBook Pro models with removable SO-DIMM slots support RAM upgrades. These are MacBook Pro 13" (2012–2015), MacBook Pro 15" (2012–2019), and MacBook Pro 16" (2019). MacBook Air models (all years) have RAM soldered to the logic board. Apple Silicon MacBooks (M1/M2/M3/M4) use unified memory integrated into the chip — not upgradeable.',
  },
  {
    question: 'What is the assessment fee policy?',
    answer:
      'The assessment fee is from R599. It covers a full diagnostic and a written fixed-price quote. The fee applies if you proceed.',
  },
  {
    question: 'How long does a RAM upgrade take?',
    answer:
      'MacBook Pro RAM upgrades are typically completed in 1–2 hours. The SO-DIMM slots are accessible through the bottom panel — no display removal required. We test the machine before you collect it.',
  },
  {
    question: 'Can I upgrade RAM on an Apple Silicon MacBook?',
    answer:
      'No. Apple Silicon MacBooks (M1, M2, M3, M4) use unified memory that is integrated directly into the SoC chip. It cannot be removed or upgraded. The memory amount is fixed at the time of purchase.',
  },
  {
    question: 'Will a RAM upgrade affect my data?',
    answer:
      'No. A RAM upgrade is a hardware-only change. Your files, applications, and settings are completely unaffected. No backup or migration is required for a RAM upgrade.',
  },
  {
    question: 'How much RAM should I upgrade to?',
    answer:
      'We will advise on the right amount after the assessment based on your usage. For most users upgrading from 8 GB, 16 GB is a significant improvement. Power users running video editing or virtual machines benefit from the maximum supported by their model. We will confirm the maximum before quoting.',
  },
  {
    question: 'My MacBook Pro is from 2017 — can I upgrade the RAM?',
    answer:
      'It depends on the model. The MacBook Pro 15" 2017 has SO-DIMM slots and can be upgraded. The MacBook Pro 13" 2017 has RAM soldered to the logic board and cannot be upgraded. Bring your machine in or call us with your serial number and we can confirm in seconds.',
  },
  {
    question: 'What warranty do you provide on RAM upgrades?',
    answer:
      'All RAM upgrades carry a up-to-3 year warranty on parts and labour. If any issue arises from the upgrade within the warranty period, we fix it at from R599.',
  },
];

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'MacBook RAM Upgrade Johannesburg',
  description:
    'MacBook RAM upgrade service in Johannesburg. Upgrade memory on Intel MacBook Pro models with SO-DIMM slots. up-to-3 year warranty.',
  url: 'https://zasupport.com/macbook-repair/ram-upgrade',
  provider: LOCAL_BUSINESS_PROVIDER,
  areaServed: { '@type': 'City', name: 'Johannesburg' },
  serviceType: 'Computer Upgrade',
  offers: [
    { '@type': 'Offer', name: 'MacBook Pro RAM Upgrade 16 GB' },
    { '@type': 'Offer', name: 'MacBook Pro RAM Upgrade 32 GB' },
  ],
};

const breadcrumbSchema = buildBreadcrumbSchema([
  { name: 'Home', url: 'https://zasupport.com' },
  { name: 'MacBook Repair', url: 'https://zasupport.com/macbook-repair' },
  { name: 'RAM Upgrade', url: 'https://zasupport.com/macbook-repair/ram-upgrade' },
]);

export default function MacBookRAMUpgradePage() {
  const faqSchema = buildFaqSchema(faqs);

  return (
    <>
      <SchemaOrg schema={serviceSchema} />
      <SchemaOrg schema={faqSchema} />
      <SchemaOrg schema={breadcrumbSchema} />

      {/* Hero */}
      <section className="bg-[#0A1A18] text-[#E8F4F1] py-12 sm:py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Breadcrumb */}
          <div className="flex justify-center mb-4 text-sm text-[#7A9E98]">
            <Link href="/macbook-repair" className="hover:text-[#0FEA7A] transition-colors">
              MacBook Repair
            </Link>
            <ArrowRight className="w-3 h-3 mx-1 mt-0.5" />
            <span className="text-[#E8F4F1]">RAM Upgrade</span>
          </div>

          <div className="inline-flex items-center gap-2 bg-[#0FEA7A]/20 text-[#0FEA7A] px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Cpu className="w-4 h-4" />
            RAM Upgrade
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            MacBook RAM Upgrade Johannesburg
          </h1>
          <p className="text-xl text-[#7A9E98] mb-6 max-w-2xl mx-auto">
            Upgrade RAM on Intel MacBook Pro. More memory, faster multitasking, fewer crashes. up-to-3 year warranty.
          </p>

          {/* Important note */}
          <div className="inline-flex items-start gap-3 bg-amber-900/30 border border-amber-700/40 text-amber-300 px-5 py-4 rounded-xl text-sm text-left max-w-2xl mx-auto mb-8">
            <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
            <p>
              RAM upgrades are only possible on Intel MacBook Pro models with removable SO-DIMM slots (2012–2019). Apple Silicon (M1/M2/M3/M4) and most MacBook Air models have RAM soldered to the chip.
            </p>
          </div>

          <p className="text-lg font-semibold text-[#0FEA7A] mb-8">
            Assessment: from R599 · Fixed quote before we start
          </p>

          {/* Badges */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {[
              { icon: <Cpu className="w-4 h-4" />, label: 'RAM Upgrade' },
              { icon: <Zap className="w-4 h-4" />, label: 'Same-Day Service' },
              { icon: <Shield className="w-4 h-4" />, label: 'Up-to-3 Year Warranty' },
              { icon: <CheckCircle className="w-4 h-4" />, label: 'Written Quote First' },
            ].map((badge) => (
              <span
                key={badge.label}
                className="inline-flex items-center gap-1.5 bg-[#111C1A] text-[#7A9E98] border border-[#27504D]/40 px-3 py-1.5 rounded-full text-sm"
              >
                {badge.icon}
                {badge.label}
              </span>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={buildWhatsAppUrl('MBR-RAM', 'macbook-repair')}
              className="inline-flex items-center gap-2 bg-[#0FEA7A] hover:bg-[#0dd96d] text-[#0A1A18] px-8 py-4 rounded-xl font-semibold text-lg transition-colors"
             target="_blank" rel="noopener noreferrer">
              WhatsApp Us
              <ArrowRight className="w-5 h-5" />
            </a>
            <Link
              href="/book"
              className="inline-flex items-center gap-2 border border-[#27504D] hover:border-[#0FEA7A] text-[#7A9E98] hover:text-[#0FEA7A] px-8 py-4 rounded-xl font-semibold text-lg transition-colors"
            >
              Book Online
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href={`tel:${CONTACT.phoneTel}`}
              className="inline-flex items-center gap-2 border border-[#27504D] hover:border-[#0FEA7A] text-[#7A9E98] hover:text-[#0FEA7A] px-8 py-4 rounded-xl font-semibold text-lg transition-colors">
              <Phone className="w-5 h-5" />
              {CONTACT.phone}
            </a>
          </div>
        </div>
      </section>

      {/* Supported Models */}
      <section className="py-12 sm:py-20 px-4 bg-[#111C1A]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-[#E8F4F1] mb-2 text-center">Supported MacBook Models</h2>
          <p className="text-[#7A9E98] text-center mb-8 text-sm">
            Only these Intel MacBook Pro models have removable SO-DIMM RAM.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
            {supportedModels.map((m) => (
              <div key={m.model} className="glass-card p-4 rounded-xl border border-[#0FEA7A]/20">
                <p className="font-semibold text-[#E8F4F1] text-sm">{m.model}</p>
                <p className="text-[#0FEA7A] text-xs mt-1">{m.note}</p>
              </div>
            ))}
          </div>

          <div className="bg-[#0A1A18] border border-[#27504D]/40 rounded-xl p-5">
            <p className="font-semibold text-[#E8F4F1] text-sm mb-3">Not supported:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {notSupported.map((m) => (
                <div key={m} className="flex items-center gap-2 text-[#7A9E98] text-sm">
                  <span className="w-1.5 h-1.5 bg-red-500 rounded-full shrink-0" />
                  {m}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Symptoms */}
      <section className="py-12 sm:py-20 px-4 bg-[#0A1A18]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-[#E8F4F1] mb-2 text-center">Running Out of RAM?</h2>
          <p className="text-[#7A9E98] text-center mb-8">These are the signs your MacBook needs more memory.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {symptoms.map((s) => (
              <div key={s} className="glass-card flex items-center gap-3 p-4 rounded-xl">
                <span className="w-2 h-2 bg-[#0FEA7A] rounded-full shrink-0" />
                <span className="text-[#E8F4F1] text-sm">{s}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Before / After */}
      <section className="py-12 sm:py-20 px-4 bg-[#111C1A]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-[#E8F4F1] mb-2 text-center">8 GB vs 16 GB — Real Difference</h2>
          <p className="text-[#7A9E98] text-center mb-8">Impact of a RAM upgrade on everyday tasks.</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-[#27504D]/40 rounded-xl overflow-hidden">
              <thead className="bg-[#0A1A18]">
                <tr>
                  <th className="text-left p-4 text-[#7A9E98]">Task</th>
                  <th className="text-left p-4 text-red-400">8 GB</th>
                  <th className="text-left p-4 text-[#0FEA7A]">16 GB</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#27504D]/20">
                {benefits.map((row) => (
                  <tr key={row.task} className="hover:bg-[#0A1A18]/50 transition-colors">
                    <td className="p-4 text-[#7A9E98] text-xs">{row.task}</td>
                    <td className="p-4 text-red-400">{row.before}</td>
                    <td className="p-4 text-[#0FEA7A] font-medium">{row.after}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-12 sm:py-20 px-4 bg-[#0A1A18]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-[#E8F4F1] mb-8 text-center">How It Works</h2>
          <div className="space-y-6">
            {steps.map((item) => (
              <div key={item.step} className="flex gap-4">
                <div className="w-8 h-8 bg-[#0FEA7A] text-[#0A1A18] rounded-full flex items-center justify-center font-bold text-sm shrink-0 mt-0.5">
                  {item.step}
                </div>
                <div>
                  <h3 className="font-semibold text-[#E8F4F1]">{item.title}</h3>
                  <p className="text-[#7A9E98] text-sm mt-1">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 sm:py-20 px-4 bg-[#111C1A]">
        <div className="max-w-3xl mx-auto">
          <FAQAccordion items={faqs} title="MacBook RAM Upgrade Questions" />
        </div>
      </section>

      {/* Cross-sell SSD */}
      <section className="py-12 px-4 bg-[#0A1A18] border-y border-[#27504D]/40">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-bold text-[#E8F4F1] mb-1">Also need an SSD upgrade?</h3>
            <p className="text-[#7A9E98] text-sm">
              Upgrading both RAM and SSD in the same visit gives the biggest performance improvement. Done together, no extra labour cost.
            </p>
          </div>
          <Link
            href="/macbook-repair/ssd-upgrade"
            className="inline-flex items-center gap-2 bg-[#0FEA7A] hover:bg-[#0dd96d] text-[#0A1A18] px-6 py-3 rounded-xl font-semibold whitespace-nowrap transition-colors"
          >
            SSD Upgrade
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-12 sm:py-20 px-4 bg-[#111C1A]">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-[#E8F4F1] mb-4">Book Your MacBook RAM Upgrade</h2>
          <p className="text-[#7A9E98] mb-8">
            Assessment: from R599. Fixed quote. Same-day service on most Intel MacBook Pro models. Hyde Park, Johannesburg.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`tel:${CONTACT.phoneTel}`}
              className="inline-flex items-center gap-2 bg-[#0FEA7A] hover:bg-[#0dd96d] text-[#0A1A18] px-8 py-4 rounded-xl font-semibold transition-colors">
              <Phone className="w-5 h-5" />
              {CONTACT.phone}
            </a>
            <Link
              href="/book"
              className="inline-flex items-center gap-2 border border-[#27504D] hover:border-[#0FEA7A] text-[#7A9E98] hover:text-[#0FEA7A] px-8 py-4 rounded-xl font-semibold transition-colors"
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
