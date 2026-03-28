import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, ArrowRight, HardDrive, Cpu, Wrench, Thermometer, Zap, Monitor } from 'lucide-react';
import SchemaOrg from '@/components/seo/SchemaOrg';
import { buildFaqSchema, LOCAL_BUSINESS_PROVIDER } from '@/lib/schema';
import FAQAccordion from '@/components/ui/FAQ';
import { CONTACT, SITE, buildWhatsAppUrl} from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Mac Mini Repair & Upgrade Johannesburg | SSD & RAM | ZA Support',
  description:
    'Mac Mini repair and upgrade in Johannesburg. SSD upgrade, RAM upgrade (Intel models), thermal paste, overheating, no-power, and logic board repair. Hyde Park. Assessment: from R599.',
  alternates: { canonical: 'https://zasupport.com/mac-mini-repair' },
  keywords: [
    'mac mini repair johannesburg',
    'mac mini ssd upgrade johannesburg',
    'mac mini upgrade johannesburg',
    'mac mini slow johannesburg',
    'mac mini overheating johannesburg',
    'apple mac mini repair sandton',
  ],
  openGraph: {
    title: 'Mac Mini Repair & Upgrade Johannesburg | SSD & RAM | ZA Support',
    description:
      'Mac Mini repair and upgrade in Johannesburg. SSD upgrade, RAM upgrade (Intel models), overheating repair. Hyde Park. Assessment: from R599.',
    url: 'https://zasupport.com/mac-mini-repair',
    siteName: 'ZA Support',
    type: 'website',
  },
};

const services = [
  {
    icon: HardDrive,
    title: 'SSD Upgrade',
    description:
      'Replace a slow spinning hard drive or upgrade to a larger SSD. Boot times drop from 2+ minutes to under 20 seconds. All Intel Mac Mini models from 2011 onwards.',
  },
  {
    icon: Cpu,
    title: 'RAM Upgrade (Intel)',
    description:
      'Intel Mac Mini (2010–2018) has user-accessible RAM slots. Upgrade from 4 GB to 16 GB or 32 GB (2018 model) for a significant performance boost. Apple Silicon models have soldered unified memory.',
  },
  {
    icon: Thermometer,
    title: 'Overheating & Fan Repair',
    description:
      'Mac Mini running hot, fan constantly at full speed, or thermal throttling causing slowdowns. Thermal paste replacement and fan cleaning. Common on Mac Mini 2011–2014 models.',
  },
  {
    icon: Zap,
    title: 'No-Power Repair',
    description:
      'Mac Mini won\'t turn on, no power LED, intermittent startup. Power supply failure is the most common cause. We diagnose and repair internal power circuitry at component level.',
  },
  {
    icon: Wrench,
    title: 'Logic Board Repair',
    description:
      'No video output, random shutdowns, USB ports dead, Wi-Fi failure. Component-level repair on Mac Mini logic boards. Saves significant cost versus Apple\'s board replacement.',
  },
  {
    icon: Monitor,
    title: 'Port & Connectivity Repair',
    description:
      'Thunderbolt, HDMI, USB-A, and USB-C port repair. Wi-Fi and Bluetooth antenna replacement. Mac Mini not detecting displays? We diagnose and repair at chip level.',
  },
];

const models = [
  { name: 'Mac Mini M2 Pro (2023)', note: 'Apple Silicon, 192 GB max' },
  { name: 'Mac Mini M2 (2023)', note: 'Apple Silicon, 24 GB max' },
  { name: 'Mac Mini M1 (2020)', note: 'Apple Silicon, 16 GB max' },
  { name: 'Mac Mini (2018)', note: 'Intel, SSD + 64 GB RAM upgradeable' },
  { name: 'Mac Mini (2014)', note: 'Intel, SSD + RAM upgradeable' },
  { name: 'Mac Mini (2012)', note: 'Intel, SSD + RAM upgradeable' },
  { name: 'Mac Mini (2011)', note: 'Intel, SSD + RAM upgradeable' },
  { name: 'Mac Mini Server (2011–2012)', note: 'Intel, dual drive bay' },
];

const faqs = [
  {
    question: 'How much does Mac Mini repair cost in Johannesburg?',
    answer:
      'Mac Mini repair pricing depends on the model and fault. We provide a assessment and a fixed quote before starting any work. Contact us to discuss your specific machine and issue.',
  },
  {
    question: 'Can I upgrade the RAM in my Mac Mini?',
    answer:
      'It depends on the model. Intel Mac Mini models (2010–2018) have accessible RAM slots, most can be upgraded to 16 GB, and the 2018 model supports up to 64 GB. The Mac Mini M1, M2, and M2 Pro (2020–2023) have unified memory soldered directly to the chip, no upgrade is possible. We confirm your model before quoting to avoid any surprises.',
  },
  {
    question: 'My Mac Mini is very slow, what can I do?',
    answer:
      'On Intel Mac Mini models, the most impactful improvement is replacing a spinning hard drive with an SSD. This alone typically drops boot time from 2+ minutes to under 20 seconds and makes everyday use dramatically faster. Adding RAM is the second most effective upgrade. An Intel Mac Mini 2012 with a 500 GB SSD and 16 GB RAM performs well for most daily tasks at a very affordable cost.',
  },
  {
    question: 'My Mac Mini is overheating or the fan is always loud, is that repairable?',
    answer:
      'Yes, in most cases. The most common cause on older Intel Mac Mini models is dried-out thermal paste between the processor and heatsink. Replacing the thermal paste and cleaning the heatsink typically reduces idle temperatures by 10–20°C and brings fan noise back to normal. This service takes 1–2 hours.',
  },
  {
    question: 'My Mac Mini won\'t turn on at all, what could be wrong?',
    answer:
      'The most common causes of a Mac Mini not turning on are: (1) power supply failure, the internal power converter fails over time, especially on 2010–2014 models; (2) a logic board fault, component failure preventing startup; and (3) a loose internal connector after a previous repair. We diagnose the root cause before quoting, no fix, no fee applies.',
  },
  {
    question: 'Is it worth upgrading an older Mac Mini instead of buying a new one?',
    answer:
      'For Intel Mac Mini models from 2012 to 2018, an SSD and RAM upgrade is almost always cost-effective. A Mac Mini 2018 with a 1 TB SSD and 32 GB RAM outperforms most entry-level new machines for everyday tasks at a fraction of new Mac Mini cost. We will give you a clear repair vs replace comparison before you decide.',
  },
  {
    question: 'Do you repair Mac Mini M1 and M2 models?',
    answer:
      'Yes. Apple Silicon Mac Mini models (M1 2020, M2 2023, M2 Pro 2023) are repairable for hardware faults, ports, display connectivity, overheating, and logic board issues. RAM and storage are soldered on Apple Silicon models so those cannot be upgraded, but repairs to other components are fully possible. We assess each machine before quoting.',
  },
  {
    question: 'How long does Mac Mini repair or upgrade take?',
    answer:
      'SSD and RAM upgrades on Intel models are typically same-day, 1 to 2 hours once the machine is with us. Thermal paste replacement takes 1–2 hours. Logic board and power supply repair takes 2–5 business days depending on component availability. We give you an estimated completion time when your machine is booked in.',
  },
];

const repairSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Mac Mini Repair & Upgrade Johannesburg',
  description:
    'Professional Mac Mini repair and upgrade services in Johannesburg including SSD upgrades, RAM upgrades (Intel models), thermal paste replacement, no-power repair, and logic board repair.',
  provider: LOCAL_BUSINESS_PROVIDER,
  areaServed: { '@type': 'City', name: 'Johannesburg' },
  serviceType: 'Computer Repair',
  offers: [
    { '@type': 'Offer', name: 'Mac Mini SSD Upgrade' },
    { '@type': 'Offer', name: 'Mac Mini RAM Upgrade' },
    { '@type': 'Offer', name: 'Mac Mini Thermal Paste Replacement' },
    { '@type': 'Offer', name: 'Mac Mini Logic Board Repair' },
  ],
};

export default function MacMiniRepairPage() {
  const faqSchema = buildFaqSchema(faqs);

  return (
    <>
      <SchemaOrg schema={repairSchema} />
      <SchemaOrg schema={faqSchema} />

      {/* Hero */}
      <section className="bg-gradient-to-b from-slate-900 to-slate-800 text-white py-10 sm:py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-green-500/20 text-green-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <HardDrive className="w-4 h-4" />
            Mac Mini Repair Johannesburg
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Mac Mini Repair &amp; Upgrade in Johannesburg
          </h1>
          <p className="text-xl text-slate-300 mb-4 max-w-2xl mx-auto">
            SSD upgrades, RAM upgrades, overheating repair, logic board repair.
            All Intel and Apple Silicon Mac Mini models. Hyde Park, Johannesburg.
          </p>
          <p className="text-slate-400 mb-8 max-w-2xl mx-auto">
            A Mac Mini SSD upgrade is the single best investment you can make in an older machine.
            Boot in under 20 seconds. Assessment: from R599, fixed quote before we start.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={buildWhatsAppUrl('MINI', 'mac-mini-repair')}
              className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-400 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Phone className="w-5 h-5" />
              WhatsApp for a Quote
            </a>
            <a
              href={`tel:${CONTACT.phoneTel}`}
              className="inline-flex items-center gap-2 border border-slate-500 hover:border-green-400 text-slate-300 hover:text-green-400 px-8 py-4 rounded-xl font-semibold text-lg transition-colors"
            >
              Call {CONTACT.phone}
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="bg-slate-800 border-y border-slate-700 py-4 px-4">
        <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-6 text-sm text-slate-300">
          <span>Assessment: from R599</span>
          <span className="text-slate-500">|</span>
          <span>Same-Day SSD &amp; RAM Upgrades</span>
          <span className="text-slate-500">|</span>
          <span>Assessment: from R599</span>
          <span className="text-slate-500">|</span>
          <span>{SITE.rating}★ {SITE.reviewCount} Reviews</span>
          <span className="text-slate-500">|</span>
          <span>Hyde Park, Johannesburg</span>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-4">Mac Mini Repair &amp; Upgrade Services</h2>
          <p className="text-slate-500 text-center mb-12">
            Component-level repairs and upgrades for all Apple Mac Mini models, Intel and Apple Silicon.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.title}
                  className="border border-slate-200 rounded-xl p-6 hover:border-green-400 hover:shadow-md transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-green-50 rounded-lg shrink-0">
                      <Icon className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-1">{service.title}</h3>
                      <p className="text-sm text-slate-500 mb-2">{service.description}</p>
                        </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SSD upgrade callout */}
      <section className="py-12 px-4 bg-green-50 border-y border-green-100">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            The biggest upgrade you can do: replace the hard drive with an SSD.
          </h2>
          <p className="text-slate-600 mb-6">
            Older Mac Mini models shipped with slow spinning hard drives. The single most impactful upgrade
            is replacing it with a solid-state drive. Boot in under 20 seconds instead of 2+ minutes.
            Applications open instantly. Everything feels new, for a fraction of replacement cost.
          </p>
          <div className="grid sm:grid-cols-3 gap-4 text-left">
            {[
              { label: 'SSD upgrade (500 GB)', note: 'inc. data migration' },
              { label: 'SSD upgrade (1 TB)', note: 'inc. data migration' },
              { label: 'SSD + RAM bundle', note: 'Intel models, best value' },
            ].map((item) => (
              <div key={item.label} className="bg-white border border-green-200 rounded-lg p-4">
                <div className="font-medium text-slate-900 text-sm mb-1">{item.label}</div>
                <div className="text-xs text-slate-500 mt-1">{item.note}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RAM note */}
      <section className="py-12 px-4 bg-amber-50 border-y border-amber-100">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xl font-bold text-slate-900 mb-3">
            RAM upgrade: Intel models only
          </h2>
          <p className="text-slate-600 mb-4">
            Intel Mac Mini models (2010–2018) have removable RAM slots you can upgrade. The 2012 and 2014 models
            support up to 16 GB; the 2018 model supports up to 64 GB.
          </p>
          <p className="text-slate-600 mb-4">
            Apple Silicon Mac Mini models (M1, M2, M2 Pro, 2020 and 2023) have unified memory soldered directly
            to the chip. There is no RAM upgrade available for these models. If you are buying new, choose
            your memory configuration carefully, it cannot be changed later.
          </p>
          <p className="text-slate-500 text-sm">
            Not sure which model you have?{' '}
            <Link href="/apple-support" className="text-green-600 hover:underline">
              We can identify it from your serial number.
            </Link>
          </p>
        </div>
      </section>

      {/* Models */}
      <section className="py-16 px-4 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">Mac Mini Models We Service</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-3">
            {models.map((model) => (
              <div key={model.name} className="bg-white border border-slate-200 rounded-lg p-3">
                <div className="font-medium text-slate-900 text-sm">{model.name}</div>
                <div className="text-xs text-slate-500 mt-1">{model.note}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Repair vs Replace */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Repair or Replace?</h2>
          <p className="text-slate-600 mb-8">
            We give every Mac Mini owner an honest assessment. Some machines are worth upgrading; others
            are genuinely better replaced. We will always show you both options, and if you decide to
            replace, we can source and configure a new Mac Mini with your data migrated.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-slate-200 rounded-xl overflow-hidden">
              <thead className="bg-slate-900 text-white">
                <tr>
                  <th className="text-left p-4">Scenario</th>
                  <th className="text-left p-4">Recommendation</th>
                  <th className="text-left p-4">Typical Cost</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {[
                  {
                    scenario: 'Mac Mini 2012–2014 running slowly',
                    rec: 'SSD + RAM upgrade, excellent value',
                    cost: 'Quoted on assessment',
                  },
                  {
                    scenario: 'Mac Mini 2018 with slow hard drive',
                    rec: 'SSD upgrade, significant improvement',
                    cost: 'Quoted on assessment',
                  },
                  {
                    scenario: 'Mac Mini 2018 fault (port, board)',
                    rec: 'Repair, newer machine, worth fixing',
                    cost: 'Quoted on assessment',
                  },
                  {
                    scenario: 'Mac Mini M1/M2 fault',
                    rec: 'Repair, modern, no upgrade path',
                    cost: 'Quoted on assessment',
                  },
                  {
                    scenario: 'Mac Mini 2009–2010 any fault',
                    rec: 'Replace, repair cost exceeds value',
                    cost: 'Quoted on assessment',
                  },
                ].map((row) => (
                  <tr key={row.scenario} className="hover:bg-slate-50">
                    <td className="p-4 text-slate-700">{row.scenario}</td>
                    <td className="p-4 text-slate-700">{row.rec}</td>
                    <td className="p-4 font-medium text-green-600">{row.cost}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Why ZA Support */}
      <section className="py-16 px-4 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center">Why bring your Mac Mini to ZA Support?</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: 'Assessment: from R599',
                desc: 'If we cannot fix your Mac Mini, assessment fee of from R599 applies. We diagnose first, quote second, repair third.',
              },
              {
                title: 'Assessment: from R599',
                desc: 'We assess your Mac Mini at no charge. You get a written quote with no obligation to proceed.',
              },
              {
                title: 'Component-Level Repair',
                desc: 'We repair chips and components, not just swap boards. This saves significantly on logic board faults versus Apple\'s board replacement cost.',
              },
              {
                title: 'Warranty',
                desc: 'All repairs carry a warranty on parts and labour. If the same fault returns within the warranty period, we fix it at no charge.',
              },
              {
                title: '16 Years of Apple Experience',
                desc: 'We have repaired every Mac Mini model since 2011. We know the common failure points and the best fixes.',
              },
              {
                title: `${SITE.rating}★ on Google`,
                desc: `${SITE.reviewCount} verified Google reviews. Transparent pricing, honest diagnostics, and no hidden costs.`,
              },
            ].map((item) => (
              <div key={item.title} className="bg-slate-800 border border-slate-700 rounded-xl p-5">
                <h3 className="font-semibold text-green-400 mb-2">{item.title}</h3>
                <p className="text-slate-300 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 px-4 bg-slate-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">
            Mac Mini Repair Questions
          </h2>
          <FAQAccordion items={faqs} />
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-slate-900 text-white">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Get Your Mac Mini Running Fast Again</h2>
          <p className="text-slate-300 mb-8">
            Assessment: from R599. Fixed quote. Assessment: from R599. Hyde Park, Johannesburg.
            SSD and RAM upgrades completed same day.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={buildWhatsAppUrl('MINI', 'mac-mini-repair')}
              className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-400 text-white px-8 py-4 rounded-xl font-semibold transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Phone className="w-5 h-5" />
              WhatsApp for a Quote
            </a>
            <a
              href={`tel:${CONTACT.phoneTel}`}
              className="inline-flex items-center gap-2 border border-slate-600 hover:border-green-400 text-slate-300 hover:text-green-400 px-8 py-4 rounded-xl font-semibold transition-colors"
            >
              Call {CONTACT.phone}
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
          <p className="text-slate-500 text-sm mt-6">
            1 Hyde Lane, Hyde Park, Second Floor, Office E2004, Johannesburg · Mon–Fri 8am–6pm
          </p>
        </div>
      </section>
    </>
  );
}
