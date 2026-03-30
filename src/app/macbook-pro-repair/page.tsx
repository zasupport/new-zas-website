import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, ArrowRight, Battery, Monitor, Keyboard, Wrench, Droplets, Cpu, Shield, BadgeCheck, Clock, AlertTriangle, Thermometer, Star } from 'lucide-react';
import SchemaOrg from '@/components/seo/SchemaOrg';
import { buildFaqSchema, LOCAL_BUSINESS_PROVIDER } from '@/lib/schema';
import FAQAccordion from '@/components/ui/FAQ';
import { CONTACT, SITE, buildWhatsAppUrl} from '@/lib/constants';

export const metadata: Metadata = {
  title: 'MacBook Pro Repair Johannesburg | All Models | ZA Support',
  description:
    'MacBook Pro repair Johannesburg, Flexgate, Staingate, butterfly keyboard, thermal throttling, logic board component-level repair. M1–M4 Pro/Max and Intel 2015–2019. Assessment: from R599. Hyde Park.',
  alternates: { canonical: 'https://zasupport.com/macbook-pro-repair' },
  keywords: [
    'macbook pro repair johannesburg',
    'macbook pro screen repair johannesburg',
    'macbook pro logic board repair johannesburg',
    'macbook pro keyboard repair johannesburg',
    'macbook pro battery replacement johannesburg',
    'flexgate repair johannesburg',
    'butterfly keyboard repair johannesburg',
    'macbook pro not turning on johannesburg',
  ],
  openGraph: {
    title: 'MacBook Pro Repair Johannesburg | All Models | ZA Support',
    description: 'MacBook Pro repair Johannesburg, Flexgate, Staingate, butterfly keyboard, thermal throttling, logic board component-level repair. Assessment: from R599.',
    url: 'https://zasupport.com/macbook-pro-repair',
    siteName: 'ZA Support',
    type: 'website',
  },
};

const services = [
  {
    icon: Monitor,
    title: 'Screen Replacement',
    description: 'Cracked Retina or Liquid Retina XDR, Flexgate backlight failure (2016–2019), dead pixels, Staingate delamination. Genuine-quality panels for all MacBook Pro sizes.',
    href: '/macbook-pro-repair/screen',
    price: 'Quoted on assessment',
  },
  {
    icon: Keyboard,
    title: 'Keyboard Replacement',
    description: 'Butterfly keyboard failure (2016–2019 models), sticky or non-registering keys, Magic Keyboard damage. Full top-case assembly replacement with up-to-3 year warranty.',
    href: '/macbook-pro-repair/keyboard',
    price: 'Quoted on assessment',
  },
  {
    icon: Battery,
    title: 'Battery Replacement',
    description: 'Restore all-day battery life and eliminate thermal shutdown. OEM-grade cells, same-day turnaround.',
    href: '/macbook-pro-repair/battery',
    price: 'Quoted on assessment',
  },
  {
    icon: Cpu,
    title: 'Logic Board Repair',
    description: 'Component-level repair for no-power, no-display, GPU fault, USB-C charging failure, and T2 issues. All MacBook Pro models repaired in-house.',
    href: '/logic-board-repair/macbook-pro',
    price: 'Quoted on assessment',
  },
  {
    icon: Droplets,
    title: 'Liquid Damage',
    description: 'Ultrasonic board cleaning, corrosion removal and component-level repair. MacBook Pro liquid damage is often fully repairable if assessed quickly.',
    href: '/liquid-damage/macbook-pro',
    price: 'Quoted on assessment',
  },
  {
    icon: Wrench,
    title: 'Charging Port Repair',
    description: 'USB-C or Thunderbolt port not charging, bent pins, MagSafe port failure on older models. Port board replacement or component-level repair where needed.',
    href: '/macbook-repair/charging-port',
    price: 'Quoted on assessment',
  },
  {
    icon: Wrench,
    title: 'Trackpad Repair',
    description: 'Trackpad not clicking, erratic cursor, Force Touch unresponsive, raised trackpad from a swollen battery. Same-day repair for most models.',
    href: '/macbook-repair/trackpad',
    price: 'Quoted on assessment',
  },
  {
    icon: Thermometer,
    title: 'Thermal Throttling Fix',
    description: 'MacBook Pro running hot, fans at full speed, or throttling under load? We clean the heatsink, replace thermal paste, and check for firmware-level throttle issues, common on Intel 15" and 16" models.',
    href: '/contact',
    price: 'Quoted on assessment',
  },
];

const models = [
  { name: 'MacBook Pro M4 Pro / Max 14" & 16" (2024)', note: 'Latest' },
  { name: 'MacBook Pro M3 Pro / Max 14" & 16" (2023)', note: 'Popular' },
  { name: 'MacBook Pro M2 Pro / Max 14" & 16" (2023)', note: 'Popular' },
  { name: 'MacBook Pro M1 Pro / Max 14" & 16" (2021)', note: 'Popular' },
  { name: 'MacBook Pro Intel 16" (2019)', note: 'Intel' },
  { name: 'MacBook Pro Intel 15" (2016–2019)', note: 'Intel, Flexgate risk' },
  { name: 'MacBook Pro Intel 15" (2015)', note: 'Intel' },
  { name: 'MacBook Pro Intel 13" (2016–2020)', note: 'Intel, butterfly kbd' },
  { name: 'MacBook Pro Intel 13" (2011–2015)', note: 'Intel' },
  { name: 'MacBook Pro Retina (all years)', note: 'Staingate risk' },
];

const knownIssues = [
  {
    name: 'Flexgate',
    models: '2016–2019 MacBook Pro',
    icon: AlertTriangle,
    description: 'A design fault in the display flex cable causes backlight failure. Early symptoms include a bright horizontal line at the bottom of the screen and a stage-light effect when the lid is opened to a wide angle. Eventually the backlight fails completely. We replace the display assembly to resolve this permanently.',
  },
  {
    name: 'Staingate',
    models: 'Retina MacBook Pro (all years)',
    icon: AlertTriangle,
    description: 'The anti-reflective coating on Retina screens separates over time, leaving blotchy, stained-looking patches that cannot be cleaned. This is a manufacturing defect in the screen coating. We replace the display assembly with a new panel that does not have this issue.',
  },
  {
    name: 'Butterfly Keyboard',
    models: '2016–2019 MacBook Pro',
    icon: Keyboard,
    description: 'Apple\'s butterfly mechanism keyboard is susceptible to dust ingress, key bounce, and complete switch failure. Apple ran a repair programme that has since ended. We replace the entire top case assembly, keyboard, battery bracket, and all, with a working unit carrying a up-to-3 year warranty.',
  },
  {
    name: 'Thermal Throttling',
    models: 'Intel MacBook Pro 15" & 16"',
    icon: Thermometer,
    description: 'Intel MacBook Pro 15" and 16" models are known to throttle the CPU and GPU under sustained load due to inadequate thermal headroom. Symptoms include fan noise, reduced performance, and high CPU temperatures. A heatsink clean, thermal paste replacement, and SMC reset often restores full performance.',
  },
];

const faqs = [
  {
    question: 'How much does MacBook Pro repair cost in Johannesburg?',
    answer: 'MacBook Pro repair pricing depends on the model and fault. Liquid damage assessment: from R599, with a fixed quote before any work begins. We never start work without written approval.',
  },
  {
    question: 'What is Flexgate and can it be fixed?',
    answer: 'Flexgate is a design fault in MacBook Pro models from 2016 to 2019. The display flex cable is too short, and repeated lid opening causes it to tear over time. Early signs include a bright band at the bottom of the screen or a stage-light pattern when the lid is opened wide. The fix is a full display assembly replacement. We carry stock for affected models and can typically complete the repair within one to two business days.',
  },
  {
    question: 'Can M1 Pro, M2 Pro, M3 Pro, and M4 Pro MacBook Pro models be repaired?',
    answer: 'Yes. We repair all M-series MacBook Pro models. RAM and SSD storage are soldered to the logic board on all M-series machines and cannot be upgraded after purchase, but screen, battery, keyboard, trackpad, port, and component-level board repairs are all available. The M-series logic board is repairable at component level by a specialist, unlike what Apple\'s repair cost suggests.',
  },
  {
    question: 'My MacBook Pro butterfly keyboard has keys that do not register. What are my options?',
    answer: 'Butterfly keyboard failure is a known issue on MacBook Pro 2016 to 2019 models. Apple\'s repair programme has ended. The repair involves replacing the full top case assembly, keyboard, battery connector bracket, and surrounding chassis. This is a major repair but produces a reliably working machine. We carry top cases for most affected models and include a warranty on the repair.',
  },
  {
    question: 'My MacBook Pro has a black screen but the fans spin on startup. What is wrong?',
    answer: 'Fans spinning with no display typically points to one of three causes: a display cable or backlight failure (Flexgate on 2016–2019 models), a GPU fault on the logic board, or a failed T2 or Secure Enclave chip. We connect an external display first, if that works, the fault is in the screen assembly. If the external also fails, we investigate the logic board. Assessment: from R599 before any quote.',
  },
  {
    question: 'What is logic board component-level repair and when does a MacBook Pro need it?',
    answer: 'Logic board component-level repair is component-level repair on the MacBook Pro main circuit board. It is needed for no-power faults, no-display faults where the screen is confirmed good, GPU failure, USB-C charging failure where the port board is intact, and liquid damage where corrosion has damaged individual components. Apple charges many times the cost of our repair for a full board replacement.',
  },
  {
    question: 'How long does MacBook Pro repair take?',
    answer: 'Battery replacement: 1.5 to 2.5 hours. Screen replacement: 2 to 4 hours depending on model. Keyboard top-case replacement: 2 to 4 hours. Thermal paste and heatsink service: 1 to 2 hours. Logic board and liquid damage repairs: 3 to 5 business days due to component-level diagnosis. We give you a precise timeline when you drop in.',
  },
  {
    question: 'Is there a warranty on MacBook Pro repairs?',
    answer: 'All MacBook Pro repairs carry a ZA Support warranty on parts and labour. If the same fault reoccurs within the warranty period, we fix it at no additional cost. This covers screen, battery, keyboard, trackpad, port, and logic board repairs. Physical damage, liquid damage after repair, and unrelated new faults are excluded.',
  },
  {
    question: 'My MacBook Pro is throttling and running hot. Can you fix it?',
    answer: 'Yes. Thermal throttling is common on Intel MacBook Pro 15" and 16" models, particularly after a few years as the thermal paste dries out. We disassemble the machine, clean the heatsink, apply fresh thermal compound, and verify that CPU and GPU temperatures are within spec under load. This often restores full performance without any hardware replacement.',
  },
  {
    question: 'What is the Staingate issue and can it be fixed?',
    answer: 'Staingate refers to the delamination of the anti-reflective coating on Retina MacBook Pro screens. It appears as blotchy, cloudy, or oil-stained patches on the display that do not clean off. It is caused by the coating reacting with skin oils and cleaning agents over time. The only permanent fix is a display replacement with a panel that does not have the same coating formula. We replace affected screens, contact us for a quote.',
  },
];

const aggregateRatingSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'ZA Support, MacBook Pro Repair Johannesburg',
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'MacBook Pro Repair Johannesburg',
  provider: LOCAL_BUSINESS_PROVIDER,
  areaServed: { '@type': 'City', name: 'Johannesburg' },
  description:
    'MacBook Pro repair in Johannesburg. Flexgate, Staingate, butterfly keyboard, thermal throttling, logic board component-level repair, liquid damage. M1–M4 Pro/Max and Intel models. Assessment: from R599.',
  offers: {
    '@type': 'AggregateOffer',
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://zasupport.com' },
    { '@type': 'ListItem', position: 2, name: 'MacBook Repair', item: 'https://zasupport.com/macbook-repair' },
    { '@type': 'ListItem', position: 3, name: 'MacBook Pro Repair', item: 'https://zasupport.com/macbook-pro-repair' },
  ],
};

const faqSchema = buildFaqSchema(faqs);

export default function MacBookProRepairPage() {
  const REVIEWS = { rating: SITE.rating, count: SITE.reviewCount };

  return (
    <>
      <SchemaOrg schema={faqSchema} />
      <SchemaOrg schema={breadcrumbSchema} />
      <SchemaOrg schema={serviceSchema} />

      {/* Hero */}
      <section className="hero-gradient grid-overlay pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mt-8 max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[rgba(15,234,122,0.3)] bg-[rgba(15,234,122,0.08)] text-[#0FEA7A] text-xs font-medium mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0FEA7A] animate-pulse" />
              <Star className="w-3 h-3" /> {REVIEWS.rating} stars &middot; {REVIEWS.count} reviews &middot; {SITE.repairsCount} repairs
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-[#E8F4F1] leading-tight mb-6">
              MacBook Pro Repair<br /><span className="text-[#0FEA7A]">Johannesburg</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-4">
              Specialists in MacBook Pro faults, Flexgate backlight failure, Staingate screen delamination, butterfly keyboard, thermal throttling, and logic board component-level repair. All models from M4 Pro/Max back to 2011 Intel.
            </p>
            <p className="text-[#7A9E98] mb-8">
              Hyde Park, Johannesburg. Assessment: from R599.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={buildWhatsAppUrl('MBP', 'macbook-pro-repair')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl font-bold hover:bg-[#0FEA7A]/90 transition-all"
              >
                WhatsApp a Quote
              </a>
              <a href={`tel:${CONTACT.phoneTel}`} className="inline-flex items-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all" target="_blank" rel="noopener noreferrer">
                <Phone className="w-5 h-5" /> Call {CONTACT.phone}
              </a>
            </div>
            <div className="flex flex-wrap gap-6 mt-8 text-sm text-[#7A9E98]">
              <span className="flex items-center gap-1.5"><BadgeCheck className="w-4 h-4 text-[#0FEA7A]" /> Up-to-3 Year Warranty</span>
              <span className="flex items-center gap-1.5"><Shield className="w-4 h-4 text-[#0FEA7A]" /> Assessment: from R599</span>
              <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-[#0FEA7A]" /> Same-day for most repairs</span>
            </div>
          </div>
        </div>
      </section>

      {/* Known MacBook Pro Issues */}
      <section className="py-20 bg-[#111C1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-4 text-center">
            Known MacBook Pro <span className="text-[#0FEA7A]">Design Issues</span>
          </h2>
          <p className="text-[#7A9E98] text-center mb-12 max-w-2xl mx-auto text-sm">
            Several MacBook Pro generations have well-documented design faults. If your machine has any of these, you are not alone, and all are repairable.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {knownIssues.map((issue) => {
              const Icon = issue.icon;
              return (
                <div key={issue.name} className="glass-card p-6 rounded-2xl border border-[rgba(255,165,0,0.15)]">
                  <div className="flex items-start gap-4 mb-3">
                    <Icon className="w-6 h-6 text-orange-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="text-[#E8F4F1] font-bold text-lg">{issue.name}</h3>
                      <p className="text-[#0FEA7A] text-xs font-medium mt-0.5">{issue.models}</p>
                    </div>
                  </div>
                  <p className="text-[#7A9E98] text-sm leading-relaxed">{issue.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services grid */}
      <section className="py-20 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-4 text-center">MacBook Pro Repairs We Do</h2>
          <p className="text-[#7A9E98] text-center mb-12 text-sm">Every MacBook Pro fault, from battery to board-level component-level repair. Same-day diagnosis, fixed pricing, up-to-3 year warranty.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((svc) => {
              const Icon = svc.icon;
              return (
                <Link
                  key={svc.href}
                  href={svc.href}
                  className="group glass-card p-6 rounded-2xl hover:border-[rgba(15,234,122,0.35)] transition-all"
                >
                  <Icon className="w-8 h-8 text-[#0FEA7A] mb-4" />
                  <h3 className="text-lg font-bold text-[#E8F4F1] mb-2 group-hover:text-[#0FEA7A] transition-colors">{svc.title}</h3>
                  <p className="text-[#7A9E98] text-sm mb-4">{svc.description}</p>
                  <div className="flex items-center justify-end">
                    <ArrowRight className="w-4 h-4 text-[#0FEA7A] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Repair Services table */}
      <section className="py-20 bg-[#111C1A]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-4 text-center">
            MacBook Pro <span className="text-[#0FEA7A]">Repair Services</span>
          </h2>
          <p className="text-[#7A9E98] text-center mb-10 text-sm">All costs are confirmed in writing after a assessment fee (from R599). No hidden costs.</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="border-b border-[rgba(255,255,255,0.08)]">
                  <th className="text-[#E8F4F1] font-semibold py-3 pr-6">Repair</th>
                  <th className="text-[#E8F4F1] font-semibold py-3">Turnaround</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[rgba(255,255,255,0.05)]">
                {[
                  { repair: 'Screen Replacement (Retina / Liquid Retina XDR)', time: '2–4 hrs' },
                  { repair: 'Keyboard Replacement (butterfly / Magic)', time: '2–4 hrs' },
                  { repair: 'Battery Replacement (13")', time: '1.5–2.5 hrs' },
                  { repair: 'Battery Replacement (14" / 16")', time: '2–3 hrs' },
                  { repair: 'Logic Board Component-level repair', time: '3–5 days' },
                  { repair: 'Liquid Damage (ultrasonic + component repair)', time: '2–5 days' },
                  { repair: 'Charging Port / USB-C Repair', time: '1–2 hrs' },
                  { repair: 'Trackpad Repair', time: '2–4 hrs' },
                  { repair: 'Thermal Paste + Heatsink Service', time: '1–2 hrs' },
                  { repair: 'Data Recovery', time: '1–3 days' },
                ].map((row) => (
                  <tr key={row.repair} className="hover:bg-[rgba(15,234,122,0.03)] transition-colors">
                    <td className="text-[#E8F4F1] font-medium py-3 pr-6">{row.repair}</td>
                    <td className="text-[#7A9E98] py-3">{row.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-[#7A9E98] text-xs text-center mt-6">Final cost confirmed after assessment fee (from R599). All repairs include up-to-3 year warranty.</p>
        </div>
      </section>

      {/* Models supported */}
      <section className="py-20 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-8 text-center">All MacBook Pro Models Supported</h2>
          <div className="glass-card p-6">
            {models.map(({ name, note }, i) => (
              <div key={name} className={`flex justify-between items-center py-3 ${i < models.length - 1 ? 'border-b border-[rgba(255,255,255,0.05)]' : ''}`}>
                <span className="text-[#7A9E98] text-sm">{name}</span>
                <span className="text-xs text-[#0FEA7A] bg-[rgba(15,234,122,0.1)] px-2 py-0.5 rounded-full whitespace-nowrap">{note}</span>
              </div>
            ))}
          </div>
          <div className="mt-6 glass-card p-4 border border-[rgba(15,234,122,0.15)]">
            <p className="text-[#0FEA7A] font-semibold text-sm mb-1">Why We Can Repair What Apple Cannot</p>
            <p className="text-[#7A9E98] text-xs leading-relaxed">
              Apple replaces entire logic boards because their technicians do not perform component-level work. We use professional rework stations with hot-air and BGA reballing capability. Most MacBook Pro board faults involve a single failed capacitor, IC, or connector, not the entire board. We fix the component, not the machine.
            </p>
          </div>
        </div>
      </section>

      {/* Trust signals */}
      <section className="py-16 bg-[#111C1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              { icon: BadgeCheck, title: SITE.repairsCount, sub: 'MacBook, iPhone and iPad repairs completed' },
              { icon: Star, title: SITE.rating + ' Stars', sub: SITE.reviewCount + ' verified Google reviews' },
              { icon: Shield, title: 'Warranty', sub: 'On every repair, every component replaced' },
            ].map((item) => (
              <div key={item.title} className="glass-card p-8">
                <item.icon className="w-10 h-10 text-[#0FEA7A] mx-auto mb-4" />
                <div className="text-2xl font-extrabold text-[#E8F4F1] mb-1">{item.title}</div>
                <div className="text-[#7A9E98] text-sm">{item.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQAccordion items={faqs} title="MacBook Pro Repair, FAQs" />
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-[rgba(39,80,77,0.3)] border border-[rgba(15,234,122,0.2)] rounded-3xl p-10">
            <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3">MacBook Pro Needs a Repair?</h2>
            <p className="text-[#7A9E98] mb-6">
              Assessment: from R599. Fixed pricing. Assessment: from R599. Hyde Park, Johannesburg.<br />
              WhatsApp for the fastest response, typically within 30 minutes during business hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={buildWhatsAppUrl('MBP', 'macbook-pro-repair')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 transition-all"
              >
                WhatsApp a Quote
              </a>
              <a href={`tel:${CONTACT.phoneTel}`} className="inline-flex items-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all" target="_blank" rel="noopener noreferrer">
                <Phone className="w-5 h-5" /> Call {CONTACT.phone}
              </a>
              <Link href="/contact" className="inline-flex items-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all">
                Get a Quote <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
