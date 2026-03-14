import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, ArrowRight, Monitor, Cpu, HardDrive, Wrench, Droplets, Zap } from 'lucide-react';
import SchemaOrg from '@/components/seo/SchemaOrg';
import { buildFaqSchema, LOCAL_BUSINESS_PROVIDER } from '@/lib/schema';
import FAQAccordion from '@/components/ui/FAQ';
import { CONTACT } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'iMac Repair Johannesburg | Screen, RAM, SSD, Logic Board | ZA Support',
  description:
    'iMac repair in Johannesburg. Screen replacement, RAM upgrade, SSD upgrade, logic board repair, liquid damage — all iMac models from 2012 onwards. From R 1,800. Hyde Park.',
  alternates: { canonical: 'https://zasupport.com/imac-repair' },
};

const services = [
  {
    icon: Monitor,
    title: 'Screen Replacement',
    description:
      'Cracked display, dead pixels, backlight failure, delamination on older models. iMac 21.5" and 27" screens replaced.',
    href: '/imac-repair/screen',
    price: 'From R 4,500',
  },
  {
    icon: Cpu,
    title: 'RAM Upgrade',
    description:
      'Speed up a slow iMac dramatically. Intel iMac 27" supports up to 128 GB RAM — user-accessible upgrade slots. Major performance difference.',
    href: '/imac-repair/ram-upgrade',
    price: 'From R 1,800',
  },
  {
    icon: HardDrive,
    title: 'SSD Upgrade',
    description:
      'Replace a slow spinning hard drive or Fusion Drive with a fast SSD. Boot times drop from 2 minutes to under 20 seconds.',
    href: '/imac-repair/ssd-upgrade',
    price: 'From R 2,500',
  },
  {
    icon: Wrench,
    title: 'Logic Board Repair',
    description:
      'GPU failure, no-power, random shutdowns, kernel panics. Component-level repair on iMac logic boards.',
    href: '/logic-board-repair/imac',
    price: 'From R 3,500',
  },
  {
    icon: Droplets,
    title: 'Liquid Damage',
    description:
      'Liquid spilled on or near your iMac. Ultrasonic board cleaning, component replacement, corrosion repair.',
    href: '/liquid-damage/imac',
    price: 'From R 2,500',
  },
  {
    icon: Zap,
    title: 'Power Supply Repair',
    description:
      'iMac won\'t turn on, intermittent power loss, no display. Power supply unit diagnosis and replacement.',
    href: '/imac-repair/power-supply',
    price: 'From R 2,800',
  },
];

const models = [
  { name: 'iMac 24" M3 (2023)', note: 'Apple Silicon' },
  { name: 'iMac 24" M1 (2021)', note: 'Apple Silicon' },
  { name: 'iMac Pro 27" (2017)', note: 'Intel Xeon' },
  { name: 'iMac 27" Retina 5K (2014–2020)', note: 'Intel — RAM upgradeable' },
  { name: 'iMac 21.5" Retina 4K (2017–2019)', note: 'Intel' },
  { name: 'iMac 21.5" (2012–2017)', note: 'Intel' },
  { name: 'iMac 27" (2012–2013)', note: 'Intel — PCIe SSD slot' },
  { name: 'All Retina iMac models', note: 'From 2014 onwards' },
];

const faqs = [
  {
    question: 'How much does iMac repair cost in Johannesburg?',
    answer:
      'iMac repair pricing depends on the model and fault: screen replacement starts at R 4,500, RAM upgrades start at R 1,800 (parts included), SSD upgrades start at R 2,500, logic board repair starts at R 3,500, and liquid damage assessment starts at R 950. We provide a free diagnosis and fixed quote before starting.',
  },
  {
    question: 'Can I upgrade the RAM in my iMac?',
    answer:
      'It depends on the model. The iMac 27-inch (Intel, 2012–2020) has user-accessible RAM slots — you can upgrade to 32 GB or 64 GB without opening the machine. The iMac 21.5-inch (Intel) has soldered RAM after 2012. The iMac M1 and M3 (24-inch) have unified memory soldered to the chip — no upgrade is possible. We confirm upgradability before quoting.',
  },
  {
    question: 'Is it worth repairing an old iMac?',
    answer:
      'For Intel iMac 27-inch models (2015–2020), yes — an SSD upgrade and RAM upgrade can double or triple performance for R 3,500–R 6,000, compared to R 25,000+ for a new M3 iMac. For models older than 2012, repair costs often exceed the machine value. We will always present you with a repair vs replace comparison before proceeding.',
  },
  {
    question: 'My iMac screen has gone dark or has lines through it — what is wrong?',
    answer:
      'A dark iMac screen with the machine still running (you can hear it) typically points to a display panel failure or a loose display cable. Lines through the display on older iMac 27" models are often GPU-related (AMD Radeon failure — common on 2011 models). Vertical or horizontal lines on newer models usually indicate a panel fault. We diagnose both before quoting.',
  },
  {
    question: 'How long does iMac repair take?',
    answer:
      'Screen replacement takes 2–4 hours once parts are in stock. RAM and SSD upgrades are often same-day (30–60 minutes). Logic board repair takes 3–7 business days depending on component availability. We give you a completion estimate when we receive your machine.',
  },
  {
    question: 'Do you repair iMac 21.5" and 27" models?',
    answer:
      'Yes, we repair all sizes — 21.5-inch, 24-inch, and 27-inch iMac models from 2012 onwards, including iMac Pro. The 27-inch is our most commonly serviced iMac due to its upgradeable RAM and the availability of replacement parts.',
  },
  {
    question: 'My iMac is slow — can it be fixed without buying a new one?',
    answer:
      'In most cases, yes. The most impactful upgrades on Intel iMacs are: (1) replacing a spinning hard drive with an SSD — this alone makes a machine feel 3x faster, and (2) adding RAM if you\'re running 8 GB or less. A 2017 iMac 27" with a 1 TB SSD and 32 GB RAM performs comparably to entry-level modern machines for most tasks.',
  },
];

const repairSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'iMac Repair Johannesburg',
  description:
    'Professional iMac repair services in Johannesburg including screen replacement, RAM and SSD upgrades, logic board repair, liquid damage, and power supply repair.',
  provider: LOCAL_BUSINESS_PROVIDER,
  areaServed: { '@type': 'City', name: 'Johannesburg' },
  serviceType: 'Computer Repair',
  offers: [
    { '@type': 'Offer', name: 'iMac Screen Replacement', price: '4500', priceCurrency: 'ZAR' },
    { '@type': 'Offer', name: 'iMac RAM Upgrade', price: '1800', priceCurrency: 'ZAR' },
    { '@type': 'Offer', name: 'iMac SSD Upgrade', price: '2500', priceCurrency: 'ZAR' },
    { '@type': 'Offer', name: 'iMac Logic Board Repair', price: '3500', priceCurrency: 'ZAR' },
  ],
};

export default function IMacRepairPage() {
  const faqSchema = buildFaqSchema(faqs);

  return (
    <>
      <SchemaOrg schema={repairSchema} />
      <SchemaOrg schema={faqSchema} />

      {/* Hero */}
      <section className="bg-gradient-to-b from-slate-900 to-slate-800 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-green-500/20 text-green-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Monitor className="w-4 h-4" />
            iMac Repair Johannesburg
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            iMac Repair in Johannesburg
          </h1>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Screen replacement, RAM and SSD upgrades, logic board repair, liquid damage.
            All iMac models from 2012. Hyde Park, Johannesburg.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`tel:${CONTACT.phone}`}
              className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-400 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-colors"
            >
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

      {/* Trust bar */}
      <section className="bg-slate-800 border-y border-slate-700 py-4 px-4">
        <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-6 text-sm text-slate-300">
          <span>No Fix No Fee</span>
          <span className="text-slate-500">|</span>
          <span>Same-Day RAM &amp; SSD Upgrades</span>
          <span className="text-slate-500">|</span>
          <span>Free Assessment</span>
          <span className="text-slate-500">|</span>
          <span>All iMac Models</span>
          <span className="text-slate-500">|</span>
          <span>Hyde Park, Johannesburg</span>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-4">iMac Repair Services</h2>
          <p className="text-slate-500 text-center mb-12">
            Component-level repairs and upgrades for all Apple iMac models.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <Link
                  key={service.title}
                  href={service.href}
                  className="group border border-slate-200 rounded-xl p-6 hover:border-green-400 hover:shadow-md transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-green-50 rounded-lg group-hover:bg-green-100 transition-colors shrink-0">
                      <Icon className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-1">{service.title}</h3>
                      <p className="text-sm text-slate-500 mb-2">{service.description}</p>
                      <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded">
                        {service.price}
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* SSD upgrade callout */}
      <section className="py-12 px-4 bg-green-50 border-y border-green-100">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            The best upgrade for a slow iMac? Replace the hard drive with an SSD.
          </h2>
          <p className="text-slate-600 mb-6">
            A spinning hard drive is the most common cause of a slow iMac. Replacing it with a solid-state drive
            (SSD) drops boot times from over 2 minutes to under 20 seconds. Combined with a RAM upgrade on the
            27-inch models, your iMac performs like new — at a fraction of replacement cost.
          </p>
          <div className="grid sm:grid-cols-3 gap-4 text-left">
            {[
              { label: 'SSD upgrade (500 GB)', price: 'From R 2,500', note: 'inc. data migration' },
              { label: 'RAM upgrade (32 GB)', price: 'From R 2,200', note: '27" Intel models' },
              { label: 'SSD + RAM bundle', price: 'From R 4,200', note: 'best value' },
            ].map((item) => (
              <div key={item.label} className="bg-white border border-green-200 rounded-lg p-4">
                <div className="font-medium text-slate-900 text-sm mb-1">{item.label}</div>
                <div className="text-green-600 font-bold">{item.price}</div>
                <div className="text-xs text-slate-500 mt-1">{item.note}</div>
              </div>
            ))}
          </div>
          <Link
            href="/imac-repair/ssd-upgrade"
            className="inline-flex items-center gap-2 mt-6 text-green-600 font-medium hover:text-green-500"
          >
            Learn about iMac SSD upgrades
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Models */}
      <section className="py-16 px-4 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">iMac Models We Repair</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-3">
            {models.map((model) => (
              <div key={model.name} className="bg-white border border-slate-200 rounded-lg p-3">
                <div className="font-medium text-slate-900 text-sm">{model.name}</div>
                <div className="text-xs text-slate-500 mt-1">{model.note}</div>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-slate-500 mt-6">
            Not sure which iMac you have?{' '}
            <Link href="/apple-support" className="text-green-600 hover:underline">
              We can identify your model from the serial number.
            </Link>
          </p>
        </div>
      </section>

      {/* Repair vs Replace */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Repair or Replace?</h2>
          <p className="text-slate-600 mb-8">
            We give every iMac owner an honest assessment. Some machines are worth upgrading significantly;
            others are better replaced. We will tell you which — and if you decide to replace, we can source
            and configure a new Mac with your data migrated.
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
                    scenario: 'iMac 27" Intel (2015–2020) running slowly',
                    rec: 'SSD + RAM upgrade — excellent value',
                    cost: 'R 3,500–R 6,000',
                  },
                  {
                    scenario: 'iMac 21.5" cracked screen (2017+)',
                    rec: 'Screen replacement — cost-effective',
                    cost: 'R 4,500–R 6,500',
                  },
                  {
                    scenario: 'iMac 2012–2014 running slowly',
                    rec: 'SSD upgrade — still worthwhile',
                    cost: 'R 2,500–R 3,500',
                  },
                  {
                    scenario: 'iMac M1/M3 fault (screen, port)',
                    rec: 'Repair — modern machine, worth fixing',
                    cost: 'Quoted on assessment',
                  },
                  {
                    scenario: 'iMac 2009–2011 any fault',
                    rec: 'Replace — repair cost exceeds value',
                    cost: 'New Mac from R 22,000',
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

      {/* FAQs */}
      <section className="py-16 px-4 bg-slate-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">
            iMac Repair Questions
          </h2>
          <FAQAccordion items={faqs} />
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-slate-900 text-white">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Bring Your iMac In</h2>
          <p className="text-slate-300 mb-8">
            Free assessment. Fixed quote. Hyde Park, Johannesburg.
            Most upgrades completed same day.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`tel:${CONTACT.phone}`}
              className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-400 text-white px-8 py-4 rounded-xl font-semibold transition-colors"
            >
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
          <p className="text-slate-500 text-sm mt-6">
            1 Hyde Park Lane, Hyde Park, Johannesburg · Mon–Fri 8am–6pm
          </p>
        </div>
      </section>
    </>
  );
}
