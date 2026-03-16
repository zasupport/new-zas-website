import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, ArrowRight, HardDrive, Zap, Shield, CheckCircle } from 'lucide-react';
import SchemaOrg from '@/components/seo/SchemaOrg';
import { buildFaqSchema, buildBreadcrumbSchema, LOCAL_BUSINESS_PROVIDER } from '@/lib/schema';
import FAQAccordion from '@/components/ui/FAQ';
import { CONTACT } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'MacBook SSD Upgrade Johannesburg | Faster Boot, More Storage | ZA Support',
  description:
    'MacBook SSD upgrade in Johannesburg. Replace slow or failing storage on Intel MacBook Air and Pro. Faster boot, more space. Data migration included. Hyde Park. up-to-3 year warranty.',
  alternates: { canonical: 'https://zasupport.com/macbook-repair/ssd-upgrade' },
};

const symptoms = [
  'Boot takes 3+ minutes',
  'Constant spinning beachball',
  'Apps take 30 seconds to open',
  'macOS updates stall or fail',
  '"Storage almost full" warnings',
  'Fan runs loud during simple tasks',
];

const benefits = [
  { task: 'Boot time', before: '3–5 minute boot', after: 'Under 20 seconds' },
  { task: 'App launch', before: '30s app launch', after: '2–3 seconds' },
  { task: 'Responsiveness', before: 'Constant beachball', after: 'Smooth and responsive' },
  { task: 'Noise', before: 'Noisy spinning drive', after: 'Completely silent' },
  { task: 'Backups', before: 'Slow Time Machine', after: '5–10x faster' },
];

const supportedModels = [
  { model: 'MacBook Air 2017–2020 (Intel)', note: 'PCIe SSD upgrade' },
  { model: 'MacBook Pro 13" 2015–2020 (Intel)', note: 'PCIe SSD upgrade' },
  { model: 'MacBook Pro 15" 2015–2019 (Intel)', note: 'PCIe SSD upgrade' },
  { model: 'MacBook Pro 16" 2019 (Intel)', note: 'PCIe SSD upgrade' },
  { model: 'MacBook Air 13" 2013–2017 (Intel)', note: 'PCIe SSD upgrade' },
];

const steps = [
  {
    step: '1',
    title: 'Assessment',
    desc: 'We inspect your MacBook, confirm the storage type, and provide a written fixed-price quote.',
  },
  {
    step: '2',
    title: 'Quote',
    desc: 'Assessment fee is from R599 ex VAT, absorbed into the repair cost if you proceed. No surprises.',
  },
  {
    step: '3',
    title: 'Upgrade',
    desc: 'Old drive cloned to new SSD. Data migration included. New SSD installed and verified.',
  },
  {
    step: '4',
    title: 'Full test and return',
    desc: 'We boot from the new SSD, verify all data transferred correctly, and time the boot. Collected same day for most models.',
  },
];

const faqs = [
  {
    question: 'Which MacBook models can have SSD upgraded?',
    answer:
      'Intel MacBook Air (2013–2020) and Intel MacBook Pro (2013–2020) can have their internal SSD upgraded. Apple Silicon models (M1, M2, M3, M4) have storage soldered to the SoC chip and cannot be upgraded. If your MacBook has an Apple Silicon chip, the storage installed at purchase is permanent.',
  },
  {
    question: 'What is the assessment fee policy?',
    answer:
      'The assessment fee is from R599 ex VAT. It covers a full diagnostic and a written fixed-price quote. The fee is absorbed into the repair cost if you proceed with the upgrade.',
  },
  {
    question: 'How long does an SSD upgrade take?',
    answer:
      'Most MacBook SSD upgrades are completed same day, typically 2–4 hours. Data migration from the old drive is included and adds 1–3 hours depending on storage size.',
  },
  {
    question: 'Will my data be safe during the upgrade?',
    answer:
      'Your data is migrated from the old drive to the new SSD as part of the service. We recommend having a recent Time Machine backup before any hardware work. We will advise you on this before starting.',
  },
  {
    question: 'What size SSD should I choose?',
    answer:
      'We will advise on the right size after the assessment based on your current usage and needs. Common options are 500 GB, 1 TB, and 2 TB. Contact us for a quote.',
  },
  {
    question: 'Do you upgrade M1, M2, M3 MacBook storage?',
    answer:
      'No. Apple Silicon MacBooks (M1/M2/M3/M4) have storage soldered directly to the chip. This cannot be replaced or upgraded. If your MacBook has an M-series chip, the storage is permanent.',
  },
  {
    question: 'Is it worth upgrading an older MacBook with an SSD?',
    answer:
      'Often yes. An Intel MacBook Air or Pro with an SSD typically feels 3–5x faster for everyday tasks. If the machine is otherwise in good condition, an SSD upgrade can add 3–5 years of usable life. We will assess the machine and give you an honest recommendation.',
  },
  {
    question: 'What warranty do you provide on SSD upgrades?',
    answer:
      'All SSD upgrades carry a 3-month up-to-3 year warranty on parts and labour. If any issue arises from the upgrade within the warranty period, we fix it at no charge.',
  },
];

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'MacBook SSD Upgrade Johannesburg',
  description:
    'MacBook SSD upgrade service in Johannesburg. Replace internal storage on Intel MacBook Air and Pro. Data migration included. up-to-3 year warranty.',
  url: 'https://zasupport.com/macbook-repair/ssd-upgrade',
  provider: LOCAL_BUSINESS_PROVIDER,
  areaServed: { '@type': 'City', name: 'Johannesburg' },
  serviceType: 'Computer Upgrade',
  offers: [
    { '@type': 'Offer', name: 'MacBook SSD Upgrade 500 GB' },
    { '@type': 'Offer', name: 'MacBook SSD Upgrade 1 TB' },
    { '@type': 'Offer', name: 'MacBook SSD Upgrade 2 TB' },
  ],
};

const breadcrumbSchema = buildBreadcrumbSchema([
  { name: 'Home', url: 'https://zasupport.com' },
  { name: 'MacBook Repair', url: 'https://zasupport.com/macbook-repair' },
  { name: 'SSD Upgrade', url: 'https://zasupport.com/macbook-repair/ssd-upgrade' },
]);

export default function MacBookSSDUpgradePage() {
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
            <span className="text-[#E8F4F1]">SSD Upgrade</span>
          </div>

          <div className="inline-flex items-center gap-2 bg-[#0FEA7A]/20 text-[#0FEA7A] px-4 py-2 rounded-full text-sm font-medium mb-6">
            <HardDrive className="w-4 h-4" />
            SSD Upgrade
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            MacBook SSD Upgrade Johannesburg
          </h1>
          <p className="text-xl text-[#7A9E98] mb-4 max-w-2xl mx-auto">
            Slow MacBook? The drive is usually the problem. We replace Intel MacBook storage with fast SSD. Data migration included. up-to-3 year warranty.
          </p>
          <p className="text-lg font-semibold text-[#0FEA7A] mb-8">
            Assessment: from R599 ex VAT · Fixed quote before we start
          </p>

          {/* Badges */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {[
              { icon: <HardDrive className="w-4 h-4" />, label: 'SSD Upgrade' },
              { icon: <Zap className="w-4 h-4" />, label: 'Data Migration Included' },
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
              href={`https://wa.me/27645295863?text=Hi%2C%20I%27d%20like%20a%20MacBook%20SSD%20upgrade%20quote`}
              className="inline-flex items-center gap-2 bg-[#0FEA7A] hover:bg-[#0dd96d] text-[#0A1A18] px-8 py-4 rounded-xl font-semibold text-lg transition-colors"
            >
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
              className="inline-flex items-center gap-2 border border-[#27504D] hover:border-[#0FEA7A] text-[#7A9E98] hover:text-[#0FEA7A] px-8 py-4 rounded-xl font-semibold text-lg transition-colors"
            >
              <Phone className="w-5 h-5" />
              {CONTACT.phone}
            </a>
          </div>
        </div>
      </section>

      {/* Symptoms */}
      <section className="py-12 sm:py-20 px-4 bg-[#111C1A]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-[#E8F4F1] mb-2 text-center">Is Your MacBook Slow?</h2>
          <p className="text-[#7A9E98] text-center mb-8">These are the signs of a failing or full drive.</p>
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
      <section className="py-12 sm:py-20 px-4 bg-[#0A1A18]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-[#E8F4F1] mb-2 text-center">What an SSD Upgrade Does</h2>
          <p className="text-[#7A9E98] text-center mb-8">Real-world differences on a typical Intel MacBook.</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-[#27504D]/40 rounded-xl overflow-hidden">
              <thead className="bg-[#111C1A]">
                <tr>
                  <th className="text-left p-4 text-[#7A9E98]">Task</th>
                  <th className="text-left p-4 text-red-400">Before</th>
                  <th className="text-left p-4 text-[#0FEA7A]">After</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#27504D]/20">
                {benefits.map((row) => (
                  <tr key={row.task} className="hover:bg-[#111C1A]/50 transition-colors">
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

      {/* Supported Models */}
      <section className="py-12 sm:py-20 px-4 bg-[#111C1A]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-[#E8F4F1] mb-2 text-center">Supported MacBook Models</h2>
          <p className="text-[#7A9E98] text-center mb-2">
            Apple Silicon (M1/M2/M3/M4) MacBooks have storage soldered to the chip — not upgradeable.
          </p>
          <p className="text-[#7A9E98] text-center mb-8 text-sm">Intel models only.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {supportedModels.map((m) => (
              <div key={m.model} className="glass-card p-4 rounded-xl">
                <p className="font-semibold text-[#E8F4F1] text-sm">{m.model}</p>
                <p className="text-[#7A9E98] text-xs mt-1">{m.note}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-[#7A9E98] text-xs mt-6">
            Not sure if your MacBook is Intel or Apple Silicon?{' '}
            <a href={`tel:${CONTACT.phoneTel}`} className="text-[#0FEA7A] hover:underline">
              Call us
            </a>{' '}
            — we will check it in under a minute.
          </p>
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
          <FAQAccordion items={faqs} title="MacBook SSD Upgrade Questions" />
        </div>
      </section>

      {/* Cross-sell RAM */}
      <section className="py-12 px-4 bg-[#0A1A18] border-y border-[#27504D]/40">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-bold text-[#E8F4F1] mb-1">Also consider a RAM upgrade?</h3>
            <p className="text-[#7A9E98] text-sm">
              On compatible Intel MacBook Pro models, adding RAM alongside an SSD upgrade doubles the impact. Both done in the same service visit.
            </p>
          </div>
          <Link
            href="/macbook-repair/ram-upgrade"
            className="inline-flex items-center gap-2 bg-[#0FEA7A] hover:bg-[#0dd96d] text-[#0A1A18] px-6 py-3 rounded-xl font-semibold whitespace-nowrap transition-colors"
          >
            RAM Upgrade
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-12 sm:py-20 px-4 bg-[#111C1A]">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-[#E8F4F1] mb-4">Book Your MacBook SSD Upgrade</h2>
          <p className="text-[#7A9E98] mb-8">
            Assessment: from R599 ex VAT. Fixed quote. Same-day turnaround for most Intel models. Hyde Park, Johannesburg.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`tel:${CONTACT.phoneTel}`}
              className="inline-flex items-center gap-2 bg-[#0FEA7A] hover:bg-[#0dd96d] text-[#0A1A18] px-8 py-4 rounded-xl font-semibold transition-colors"
            >
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
