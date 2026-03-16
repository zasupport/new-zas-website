import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, ArrowRight, Battery, Monitor, Keyboard, Wrench, Droplets, Shield, BadgeCheck, Clock, AlertTriangle, Star, Cpu } from 'lucide-react';
import SchemaOrg from '@/components/seo/SchemaOrg';
import { buildFaqSchema, LOCAL_BUSINESS_PROVIDER } from '@/lib/schema';
import FAQAccordion from '@/components/ui/FAQ';
import { CONTACT, SITE } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'MacBook Air Repair Johannesburg | Screen, Battery & More | ZA Support',
  description:
    'MacBook Air repair Johannesburg, battery replacement, screen repair, hinge repair, keyboard. M1, M2, M3, M4 Air and Intel 2018–2020. Intel battery under 400 cycles = replace now. Assessment: from R599 ex VAT. Hyde Park.',
  alternates: { canonical: 'https://zasupport.com/macbook-air-repair' },
  keywords: [
    'macbook air repair johannesburg',
    'macbook air battery replacement johannesburg',
    'macbook air screen repair johannesburg',
    'macbook air keyboard repair johannesburg',
    'macbook air m1 repair johannesburg',
    'macbook air m2 repair johannesburg',
    'macbook air not charging johannesburg',
    'macbook air hinge repair johannesburg',
  ],
  openGraph: {
    title: 'MacBook Air Repair Johannesburg | Screen, Battery & More | ZA Support',
    description: 'MacBook Air repair Johannesburg, battery replacement, screen repair. M1/M2/M3/M4 and Intel models. Assessment: from R599 ex VAT.',
    url: 'https://zasupport.com/macbook-air-repair',
    siteName: 'ZA Support',
    type: 'website',
  },
};

const services = [
  {
    icon: Battery,
    title: 'Battery Replacement',
    description: 'Restore all-day battery life. Intel and Apple Silicon M1/M2/M3/M4 Air. We test your battery health before and after, verified improvement every time.',
    href: '/macbook-repair/battery',
    price: 'Contact for pricing',
  },
  {
    icon: Monitor,
    title: 'Screen Replacement',
    description: 'Cracked Retina display, dead pixels, backlight failure, anti-reflective coating delamination. Genuine-quality panels with accurate colour rendition.',
    href: '/macbook-repair/screen',
    price: 'Contact for pricing',
  },
  {
    icon: Keyboard,
    title: 'Keyboard Replacement',
    description: 'Butterfly keyboard failure on Intel 2018–2019 models, sticky keys, broken switches. Magic Keyboard (M-series) key cap and switch repair. Full assembly replacement with up-to-3 year warranty.',
    href: '/macbook-repair/keyboard',
    price: 'Contact for pricing',
  },
  {
    icon: Wrench,
    title: 'Hinge Repair',
    description: 'MacBook Air hinge too stiff, too loose, or cracked at the corner. Hinge tension adjustments and full hinge bar replacements available for all Intel and M-series Air models.',
    href: '/contact',
    price: 'Contact for pricing',
  },
  {
    icon: Wrench,
    title: 'Charging Port Repair',
    description: 'USB-C port not charging, loose connection, bent pins. MagSafe port repair on older Intel Air models. Port board replacement or component-level repair where needed.',
    href: '/macbook-repair/charging-port',
    price: 'Contact for pricing',
  },
  {
    icon: Wrench,
    title: 'Trackpad Repair',
    description: 'Trackpad not clicking, erratic cursor, Force Touch not responding, raised trackpad from a swollen battery. Fast turnaround on most MacBook Air models.',
    href: '/macbook-repair/trackpad',
    price: 'Contact for pricing',
  },
  {
    icon: Cpu,
    title: 'Logic Board Repair',
    description: 'No-power, no-display, USB-C failure, and liquid corrosion, all repaired at component level. Apple Silicon MacBook Air board repairs available. No-Fix No-Fee diagnostic.',
    href: '/logic-board-repair/macbook-air',
    price: 'Contact for pricing',
  },
  {
    icon: Droplets,
    title: 'Liquid Damage',
    description: 'MacBook Air liquid damage, ultrasonic board cleaning, corrosion removal, component-level component-level repair. Bring it in within 48 hours of the spill for the best outcome.',
    href: '/liquid-damage/macbook-air',
    price: 'Contact for pricing',
  },
];

const models = [
  { name: 'MacBook Air M4 13" & 15" (2025)', note: 'Latest' },
  { name: 'MacBook Air M3 13" & 15" (2024)', note: 'Popular' },
  { name: 'MacBook Air M2 13" (2022)', note: 'Popular' },
  { name: 'MacBook Air M2 15" (2023)', note: 'Popular' },
  { name: 'MacBook Air M1 13" (2020)', note: 'Popular' },
  { name: 'MacBook Air Intel 13" (2018–2020)', note: 'Intel, butterfly kbd risk' },
  { name: 'MacBook Air Intel 13" (2013–2017)', note: 'Intel' },
  { name: 'MacBook Air 11" (all years)', note: 'Intel' },
];

const batteryGuide = [
  {
    model: 'MacBook Air M1/M2/M3/M4',
    warning: 500,
    replace: 700,
    years: '7–8 years typical lifespan',
    note: 'Apple Silicon Air batteries are more durable than Intel but still degrade. At 500 cycles and below 80% capacity, performance will throttle.',
  },
  {
    model: 'MacBook Air Intel (2018–2020)',
    warning: 300,
    replace: 400,
    years: '4–6 years typical lifespan',
    note: 'Intel Air batteries degrade faster under load. Below 80% capacity on an Intel Air results in noticeable performance loss, especially under video or multitasking.',
  },
  {
    model: 'MacBook Air Intel (2013–2017)',
    warning: 250,
    replace: 350,
    years: '5–7 years typical lifespan',
    note: 'Older Intel Air models show battery-related shutdowns and unreliable runtime above 300 cycles. A fresh battery often restores the machine to full usability.',
  },
];

const knownIssues = [
  {
    name: 'Butterfly Keyboard Failure',
    models: 'MacBook Air 2018–2019 (Intel)',
    icon: AlertTriangle,
    description: 'Apple\'s butterfly keyboard mechanism was used in the 2018 and 2019 MacBook Air Intel models. It is prone to key bounce, stuck keys, and complete switch failure from minor debris. Apple\'s free repair programme has ended. We replace the full top-case assembly, keyboard, battery bracket, and surrounding chassis, with a up-to-3 year warranty.',
  },
  {
    name: 'Screen Anti-Reflective Coating Delamination',
    models: 'Retina MacBook Air (all years)',
    icon: Monitor,
    description: 'The anti-reflective coating on Retina Air screens can peel or blotch over time, creating a stained, cloudy appearance that cannot be cleaned. This is a known manufacturing issue caused by the coating reacting with oils and cleaning agents. Screen replacement is the permanent fix and resolves the issue completely.',
  },
  {
    name: 'Hinge Cracking (Corner Fractures)',
    models: 'MacBook Air 2018–2020 Intel',
    icon: Wrench,
    description: 'The 2018–2020 MacBook Air hinge design places stress on the aluminium corners at the hinge point, which can develop cracks or fractures, particularly on machines that are frequently opened and closed. We replace the hinge assembly and repair cosmetic corner damage to restore full lid stability.',
  },
];

const faqs = [
  {
    question: 'How much does MacBook Air repair cost in Johannesburg?',
    answer: 'MacBook Air repair costs depend on the fault and model. We confirm the exact cost in writing after a assessment fee (from R599 ex VAT) before starting any work. Battery, screen, keyboard, hinge, charging port, and logic board repairs are all available, contact us for a quote.',
  },
  {
    question: 'When should I replace my MacBook Air battery?',
    answer: 'For Intel MacBook Air models, battery replacement is typically worthwhile at around 300–400 cycle count or when health drops below 80%. For Apple Silicon M1/M2/M3/M4 Air models, the threshold is around 500 cycles. Below 80% health, macOS will throttle performance under load to protect the battery. A battery replacement restores full performance and runtime and is one of the best-value repairs for any MacBook Air. Contact us for a quote.',
  },
  {
    question: 'Can M1, M2, M3, and M4 MacBook Air models be repaired?',
    answer: 'Yes. We repair all Apple Silicon MacBook Air models. RAM and storage are soldered to the logic board and cannot be upgraded after purchase, but battery, screen, keyboard, trackpad, hinge, and port repairs are all available. Logic board repairs are also possible at component level for no-power and USB-C charging faults.',
  },
  {
    question: 'My MacBook Air will not turn on. What can cause that?',
    answer: 'A MacBook Air that does not power on has several possible causes: a completely discharged or failed battery, a faulty USB-C charging port, a failed power management IC on the logic board, or in rarer cases a failed T2 chip or Secure Enclave on Intel models. We run a free no-power diagnostic, connect a known-good charger, check port continuity, and test the battery independently before quoting.',
  },
  {
    question: 'How long does MacBook Air repair take?',
    answer: 'Battery and port repairs typically take 1.5 to 2 hours. Screen replacement takes 2 to 3 hours. Keyboard top-case replacement takes 2 to 4 hours. Hinge repair takes 1 to 2 hours. Liquid damage assessment takes 1 to 2 days once the board has been ultrasonic cleaned and dried. We give you a specific time when you drop the machine in.',
  },
  {
    question: 'My MacBook Air has a butterfly keyboard with keys that do not work. Can it be fixed?',
    answer: 'Yes. Butterfly keyboard failure is a known issue on MacBook Air 2018 and 2019 Intel models. Apple\'s free repair programme ended in 2023. The repair involves replacing the full top-case assembly, keyboard, battery bracket, and chassis, with a working unit. We carry top-case assemblies for both affected models and include a up-to-3 year warranty.',
  },
  {
    question: 'Is it worth repairing an older MacBook Air?',
    answer: 'For most Intel MacBook Air models in good structural condition, repair is almost always financially worthwhile. The machines are well-built and many faults, battery, screen, keyboard, port, are inexpensive relative to the residual value of the machine. We provide an honest repair-versus-replace recommendation based on the repair cost against the current market value of your specific model. We never recommend a repair that does not make financial sense.',
  },
  {
    question: 'My MacBook Air hinge is too stiff or the screen wobbles. Can this be fixed without replacing the entire display?',
    answer: 'Often yes. Hinge tension can be adjusted by accessing the hinge assembly. If the hinge mechanism itself is intact but too tight or too loose, we adjust the tension without replacing the display. If the hinge is cracked, bent, or has broken mounting points, common on 2018–2020 models with corner fractures, we replace the hinge assembly. In most cases the display does not need to be replaced.',
  },
  {
    question: 'Does ZA Support offer a warranty on MacBook Air repairs?',
    answer: 'Yes. All MacBook Air repairs carry a ZA Support warranty on parts and labour. If the same fault reoccurs within the warranty period, we repair it at no additional cost. This applies to battery, screen, keyboard, hinge, port, and logic board work. Physical damage subsequent to the repair and new unrelated faults are not covered.',
  },
  {
    question: 'What is the difference between MacBook Air and MacBook Pro repair costs?',
    answer: 'MacBook Air repairs are typically less expensive than MacBook Pro repairs for equivalent faults, due to simpler construction and lower component cost. Logic board repairs are priced by fault complexity rather than model and are quoted individually after a assessment fee (from R599 ex VAT).',
  },
];

const aggregateRatingSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'ZA Support, MacBook Air Repair Johannesburg',
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: SITE.rating,
    reviewCount: '632',
    bestRating: '5',
    worstRating: '1',
  },
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'MacBook Air Repair Johannesburg',
  provider: LOCAL_BUSINESS_PROVIDER,
  areaServed: { '@type': 'City', name: 'Johannesburg' },
  description:
    'MacBook Air repair in Johannesburg. Battery replacement, screen repair, keyboard, hinge, charging port. M1, M2, M3, M4 and Intel models. Assessment: from R599 ex VAT.',
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://zasupport.com' },
    { '@type': 'ListItem', position: 2, name: 'MacBook Repair', item: 'https://zasupport.com/macbook-repair' },
    { '@type': 'ListItem', position: 3, name: 'MacBook Air Repair', item: 'https://zasupport.com/macbook-air-repair' },
  ],
};

const faqSchema = buildFaqSchema(faqs);

export default function MacBookAirRepairPage() {
  const REVIEWS = { rating: SITE.rating, count: SITE.reviewCount };

  return (
    <>
      <SchemaOrg schema={faqSchema} />
      <SchemaOrg schema={breadcrumbSchema} />
      <SchemaOrg schema={serviceSchema} />
      <SchemaOrg schema={aggregateRatingSchema} />

      {/* Hero */}
      <section className="hero-gradient grid-overlay pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mt-8 max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[rgba(15,234,122,0.3)] bg-[rgba(15,234,122,0.08)] text-[#0FEA7A] text-xs font-medium mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0FEA7A] animate-pulse" />
              <Star className="w-3 h-3" /> {REVIEWS.rating} stars &middot; {REVIEWS.count} reviews &middot; {SITE.repairsCount} repairs
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-[#E8F4F1] leading-tight mb-6">
              MacBook Air Repair<br /><span className="text-[#0FEA7A]">Johannesburg</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-4">
              Battery, screen, keyboard, hinge, and port repair for all MacBook Air models, M1, M2, M3, M4, and Intel. Intel batteries under 400 cycles degrade performance, a battery replacement often transforms the machine.
            </p>
            <p className="text-[#7A9E98] mb-8">
              Battery replacement &middot; Screen repair &middot; Hinge repair &middot; Hyde Park, Johannesburg. Assessment: from R599 ex VAT.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={`https://wa.me/27645295863?text=Hi%2C%20I%20need%20a%20MacBook%20Air%20repair%20quote`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl font-bold hover:bg-[#0FEA7A]/90 transition-all"
              >
                WhatsApp a Quote
              </a>
              <a href={`tel:${CONTACT.phoneTel}`} className="inline-flex items-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all">
                <Phone className="w-5 h-5" /> Call {CONTACT.phone}
              </a>
            </div>
            <div className="flex flex-wrap gap-6 mt-8 text-sm text-[#7A9E98]">
              <span className="flex items-center gap-1.5"><BadgeCheck className="w-4 h-4 text-[#0FEA7A]" /> Up-to-3 Year Warranty</span>
              <span className="flex items-center gap-1.5"><Shield className="w-4 h-4 text-[#0FEA7A]" /> Assessment: from R599 ex VAT</span>
              <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-[#0FEA7A]" /> Same-day for most repairs</span>
            </div>
          </div>
        </div>
      </section>

      {/* Battery lifespan guide */}
      <section className="py-16 sm:py-20 bg-[#111C1A]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-4 text-center">
            MacBook Air Battery <span className="text-[#0FEA7A]">Lifespan Guide</span>
          </h2>
          <p className="text-[#7A9E98] text-center mb-10 text-sm max-w-2xl mx-auto">
            MacBook Air battery health directly affects performance. macOS throttles the processor when battery health falls below 80% to protect the battery. Replacing the battery restores full speed.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {batteryGuide.map((b) => (
              <div key={b.model} className="glass-card p-6 rounded-2xl">
                <h3 className="text-[#E8F4F1] font-bold text-sm mb-3">{b.model}</h3>
                <div className="flex gap-4 mb-4">
                  <div className="text-center">
                    <p className="text-orange-400 font-extrabold text-2xl">{b.warning}</p>
                    <p className="text-[#7A9E98] text-xs">cycles, monitor</p>
                  </div>
                  <div className="text-center">
                    <p className="text-red-400 font-extrabold text-2xl">{b.replace}</p>
                    <p className="text-[#7A9E98] text-xs">cycles, replace now</p>
                  </div>
                </div>
                <p className="text-[#0FEA7A] text-xs font-medium mb-2">{b.years}</p>
                <p className="text-[#7A9E98] text-xs leading-relaxed">{b.note}</p>
              </div>
            ))}
          </div>
          <p className="text-[#7A9E98] text-xs text-center mt-6">
            Check your cycle count: Apple menu &rarr; About This Mac &rarr; System Report &rarr; Power. Contact us for a battery replacement quote, same-day service available.
          </p>
        </div>
      </section>

      {/* Known issues */}
      <section className="py-16 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-4 text-center">
            Known MacBook Air <span className="text-[#0FEA7A]">Issues</span>
          </h2>
          <p className="text-[#7A9E98] text-center mb-12 max-w-2xl mx-auto text-sm">
            Some MacBook Air models have documented design faults. If your machine is showing these symptoms, the repair is typically straightforward.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {knownIssues.map((issue) => {
              const Icon = issue.icon;
              return (
                <div key={issue.name} className="glass-card p-6 rounded-2xl border border-[rgba(255,165,0,0.15)]">
                  <div className="flex items-start gap-3 mb-3">
                    <Icon className="w-6 h-6 text-orange-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="text-[#E8F4F1] font-bold">{issue.name}</h3>
                      <p className="text-[#0FEA7A] text-xs mt-0.5">{issue.models}</p>
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
      <section className="py-16 sm:py-20 bg-[#111C1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-4 text-center">MacBook Air Repairs We Do</h2>
          <p className="text-[#7A9E98] text-center mb-12 text-sm">All common MacBook Air faults, same-day diagnosis, fixed pricing, up-to-3 year warranty.</p>
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
                  <div className="flex items-center justify-between">
                    <span className="text-[#0FEA7A] font-bold text-sm">{svc.price}</span>
                    <ArrowRight className="w-4 h-4 text-[#0FEA7A] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Models supported */}
      <section className="py-16 sm:py-20 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-8 text-center">All MacBook Air Models Supported</h2>
          <div className="glass-card p-6">
            {models.map(({ name, note }, i) => (
              <div key={name} className={`flex justify-between items-center py-3 ${i < models.length - 1 ? 'border-b border-[rgba(255,255,255,0.05)]' : ''}`}>
                <span className="text-[#7A9E98] text-sm">{name}</span>
                <span className="text-xs text-[#0FEA7A] bg-[rgba(15,234,122,0.1)] px-2 py-0.5 rounded-full whitespace-nowrap">{note}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust signals */}
      <section className="py-12 sm:py-16 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-center">
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
      <section className="py-16 sm:py-20 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQAccordion items={faqs} title="MacBook Air Repair, FAQs" />
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 sm:py-16 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-[rgba(39,80,77,0.3)] border border-[rgba(15,234,122,0.2)] rounded-3xl p-10">
            <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3">MacBook Air Needs a Repair?</h2>
            <p className="text-[#7A9E98] mb-6">
              Assessment: from R599 ex VAT. Hyde Park, Johannesburg. WhatsApp for the fastest response, typically within 30 minutes during business hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`https://wa.me/27645295863?text=Hi%2C%20I%20need%20a%20MacBook%20Air%20repair%20quote`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 transition-all"
              >
                WhatsApp a Quote
              </a>
              <a href={`tel:${CONTACT.phoneTel}`} className="inline-flex items-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all">
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
