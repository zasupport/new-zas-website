import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, ArrowRight, Shield, CheckCircle, Clock, Zap, Star, MapPin, AlertTriangle, Droplets } from 'lucide-react';
import SchemaOrg from '@/components/seo/SchemaOrg';
import { buildFaqSchema, buildServiceSchema, buildBreadcrumbSchema } from '@/lib/schema';
import FAQAccordion from '@/components/ui/FAQ';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { CONTACT, SITE } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'MacBook Air Liquid Damage Repair | ZA Support',
  description:
    'MacBook Air liquid damage repair in Johannesburg. Emergency guide, Assessment: from R599, up-to-3 year warranty. M1, M2, M3 and Intel models. Hyde Park. Call 064 529 5863.',
  alternates: { canonical: 'https://zasupport.com/liquid-damage/macbook-air' },
  keywords: [
    'MacBook Air liquid damage repair Johannesburg',
    'MacBook Air water damage repair Johannesburg',
    'MacBook Air spill repair Johannesburg',
    'liquid damaged MacBook Air Hyde Park',
    'MacBook Air corrosion repair Johannesburg',
    'water damaged MacBook Air fix Johannesburg',
    'MacBook Air rice trick alternative Johannesburg',
    'MacBook Air liquid damage assessment: from R599',
    'M1 MacBook Air water damage Johannesburg',
    'M2 MacBook Air liquid damage repair',
  ],
};

const breadcrumbItems = [
  { label: 'Liquid Damage', href: '/liquid-damage' },
  { label: 'MacBook Air', href: '/liquid-damage/macbook-air' },
];

const breadcrumbSchemaItems = [
  { name: 'Home', url: 'https://zasupport.com' },
  { name: 'Liquid Damage', url: 'https://zasupport.com/liquid-damage' },
  { name: 'MacBook Air Liquid Damage', url: 'https://zasupport.com/liquid-damage/macbook-air' },
];

const faqs = [
  {
    question: 'Can a water-damaged MacBook Air be repaired?',
    answer:
      'Yes, in the majority of cases, particularly when the device is brought in quickly. The MacBook Air has a thin chassis with no active cooling fan, which means liquid can pool differently inside compared to the Pro. Our professional board cleaning process removes corrosion before it causes permanent damage. MacBook Airs brought in within 24 hours of a spill have a very high recovery rate.',
  },
  {
    question: 'How much does MacBook Air liquid damage repair cost?',
    answer:
      'Repair cost depends on the severity of the damage. A keyboard-only spill with no logic board involvement is the most affordable repair. Minor logic board corrosion requiring component cleaning costs more. Severe corrosion requiring multiple IC replacements is the most complex case. Assessment: from R599, we confirm the exact cost before any work begins.',
  },
  {
    question: 'Is the MacBook Air more susceptible to liquid damage than the MacBook Pro?',
    answer:
      'Yes, in a few important ways. The MacBook Air has a thinner chassis, which means liquid has less distance to travel before reaching the logic board. It also has no cooling fan, so liquid that enters tends to pool on and around the logic board rather than being distributed. On M1, M2, and M3 models, the logic board is a single integrated component with unified memory, even a minor spill reaching the board is urgent. Immediate action is especially critical on Air models.',
  },
  {
    question: 'My MacBook Air was in rice for 3 days, will it work?',
    answer:
      'Rice does not fix corrosion and never will. Rice absorbs some surface moisture but does nothing to remove the corrosive residue that liquid leaves on PCB traces, pads, and component leads. By the time you bring it in after 3 days in rice, the corrosion has had more time to advance. Bring it to us immediately, do not put it in rice first.',
  },
  {
    question: 'How long does MacBook Air liquid damage repair take?',
    answer:
      'The assessment is completed within 24 hours. Simple repairs, keyboard replacement, minor board cleaning, are typically done within 24–48 hours. Logic board cleaning and component repair takes 48–72 hours. Complex multi-site corrosion with IC replacement takes 3–5 business days. We confirm the exact timeline before work begins.',
  },
  {
    question: 'What happens if I do not repair the liquid damage?',
    answer:
      'Corrosion continues to spread across the logic board over days and weeks, even after the MacBook Air appears dry. A machine that starts fine today may fail permanently within a week. On M-series MacBook Airs, the logic board contains both RAM and the SSD, if the board fails completely, data recovery becomes significantly more complex. Early intervention is always considerably cheaper and more effective.',
  },
  {
    question: 'Can you recover data from a water-damaged MacBook Air?',
    answer:
      'Usually yes. In most liquid damage cases, the SSD storage survives even when the logic board is badly damaged. On M-series MacBook Airs the SSD is soldered directly to the logic board, so we work carefully around the storage during cleaning and repair. If the board requires full replacement, we make every effort to recover your data before any destructive work. Data recovery is quoted separately.',
  },
  {
    question: 'What warranty do you provide on MacBook Air liquid damage repairs?',
    answer:
      'All ZA Support liquid damage repairs carry a up-to-3 year warranty on every component we repair or replace. If the same fault returns within the warranty period due to our workmanship, we fix it at no charge. Our Assessment: from R599 policy also applies: if we cannot repair your machine, an assessment fee of from R599 applies and the machine is returned exactly as received.',
  },
];

const emergencySteps = [
  {
    step: '1',
    title: 'Power off IMMEDIATELY',
    detail: 'Hold the power button until the screen goes completely dark. Do not wait for a normal shutdown, force power off now. Every second the MacBook Air is powered with liquid present causes more electrolytic damage to the logic board.',
    urgent: true,
  },
  {
    step: '2',
    title: 'Do NOT plug in the charger',
    detail: 'Connecting power to a liquid-damaged MacBook Air is one of the most destructive things you can do. It energises corroded circuits and causes electrolytic corrosion to spread rapidly. On M-series models with integrated components, this can cause irreversible damage within seconds.',
    urgent: true,
  },
  {
    step: '3',
    title: 'Tilt to drain, keyboard side down',
    detail: 'Turn the MacBook Air upside down with the keyboard facing down. Because the Air has no fan to obstruct liquid flow, gravity will pull liquid away from the logic board more effectively than in other models. Hold this position for 2–3 minutes over a towel.',
    urgent: false,
  },
  {
    step: '4',
    title: 'Do NOT use a hairdryer',
    detail: 'Heat from a hairdryer does not help and causes further damage. It drives moisture deeper into connectors and components, can warp the ultra-thin chassis of the MacBook Air, and may damage the display cables running along the hinge.',
    urgent: true,
  },
  {
    step: '5',
    title: 'Bring it to ZA Support within 24 hours',
    detail: 'The single most important factor in a successful liquid damage recovery is time. Corrosion begins within minutes of liquid contact, and the MacBook Air\'s fanless design means liquid sits in contact with the board longer. Bring it in within 24 hours for the best possible outcome. Do not put it in rice.',
    urgent: false,
  },
];

const severityTiers = [
  {
    scenario: 'Spill on keyboard only',
    detail: 'Liquid reached the keyboard and possibly the trackpad but did not penetrate to the logic board. Common in small spills. The MacBook Air keyboard layout provides some protection for the board beneath.',
    repair: 'Keyboard and/or trackpad replacement',
    recovery: 'Excellent',
    timeframe: '24–48 hours',
    colour: 'green' as const,
  },
  {
    scenario: 'Logic board corrosion, minor',
    detail: 'Liquid reached the logic board but corrosion is localised. More urgent on MacBook Air than Pro due to the fanless design allowing liquid to pool. Ultrasonic cleaning and targeted IC repair restores full function.',
    repair: 'Professional board cleaning, IC cleaning, trace repair',
    recovery: 'Very good',
    timeframe: '48–72 hours',
    colour: 'yellow' as const,
  },
  {
    scenario: 'Logic board corrosion, major',
    detail: 'Extensive corrosion across multiple board areas. On M-series MacBook Airs this is especially significant as RAM, storage, and CPU are on a single integrated component. Multiple ICs affected requiring full board cleaning plus component replacement.',
    repair: 'Full component repair, multiple IC replacements',
    recovery: 'Case dependent',
    timeframe: '3–5 business days',
    colour: 'orange' as const,
  },
  {
    scenario: 'Screen damage from liquid',
    detail: 'Liquid entered the display assembly causing dead pixels, backlight failure, or full blackout. The display assembly on the MacBook Air is replaced independently of the logic board.',
    repair: 'Display assembly replacement',
    recovery: 'Excellent',
    timeframe: '24–48 hours',
    colour: 'green' as const,
  },
];

const recoveryColours: Record<string, string> = {
  green: 'border-[rgba(15,234,122,0.3)] bg-[rgba(15,234,122,0.04)]',
  yellow: 'border-[rgba(245,166,35,0.3)] bg-[rgba(245,166,35,0.04)]',
  orange: 'border-[rgba(245,87,54,0.3)] bg-[rgba(245,87,54,0.04)]',
};

const badgeColours: Record<string, string> = {
  green: 'text-[#0FEA7A] bg-[rgba(15,234,122,0.1)]',
  yellow: 'text-[#F5A623] bg-[rgba(245,166,35,0.1)]',
  orange: 'text-[#F55736] bg-[rgba(245,87,54,0.1)]',
};

const repairProcess = [
  {
    step: '1',
    title: 'Assessment: from R599',
    detail: 'We open the MacBook Air, inspect under magnification, and map every affected area. Power rail testing confirms whether the logic board has short circuits. Completed within 24 hours. No charge. No obligation.',
  },
  {
    step: '2',
    title: 'Written Quote',
    detail: 'You receive a fixed quote, not a vague estimate. The quote covers the specific fault, every component to be replaced, labour, and a confirmed completion time. If you decline, assessment fee of from R599 applies.',
  },
  {
    step: '3',
    title: 'Ultrasonic Cleaning',
    detail: 'The logic board is cleaned with a specialist PCB cleaning solution using professional equipment. This removes corrosive residue from traces, pads, and component leads, the step that rice never performs and that saves boards others would write off.',
  },
  {
    step: '4',
    title: 'Component-Level Repair',
    detail: 'Using precision soldering equipment, we replace specific damaged ICs, repair lifted traces, and address any corroded connectors or component pads on the MacBook Air logic board.',
  },
  {
    step: '5',
    title: 'Multi-Stage Testing',
    detail: 'Before closing the machine: power-on test, full charge cycle, display verification, port enumeration, thermal monitoring under load, keyboard and trackpad validation, and Touch ID verification on applicable models.',
  },
  {
    step: '6',
    title: 'Collection or Delivery',
    detail: 'Collect from Hyde Park or we arrange secure courier delivery. We include a up-to-3 year warranty certificate with every repaired MacBook Air.',
  },
];

const reviews = [
  {
    name: 'Simone K.',
    location: 'Sandton',
    rating: 5,
    text: 'My M2 MacBook Air took a full glass of juice. I panicked but brought it straight in. ZA Support had it assessed within hours and repaired in 2 days, works perfectly. The up-to-3 year warranty gives me peace of mind. Cannot recommend them enough.',
    service: 'MacBook Air Liquid Damage Repair',
  },
  {
    name: 'David L.',
    location: 'Fourways',
    rating: 5,
    text: 'Left my MacBook Air in rice for a day before a friend told me to stop. ZA Support still managed to clean and recover the board. They were upfront about the delay making things harder, but the result was brilliant. Honest, skilled people.',
    service: 'MacBook Air Logic Board Liquid Damage',
  },
  {
    name: 'Priya N.',
    location: 'Bryanston',
    rating: 5,
    text: 'Coffee spill on my M1 Air, screen went dark and it would not charge. ZA Support diagnosed a corroded USB-C board and minor logic board damage. Repaired in 48 hours with a written up-to-3 year warranty. Professional service, fair pricing.',
    service: 'MacBook Air Liquid Damage, USB-C & Board',
  },
];

const aggregateRatingSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': 'https://zasupport.com/#business',
  name: 'ZA Support',
};

const faqSchema = buildFaqSchema(faqs);
const serviceSchema = buildServiceSchema({
  name: 'MacBook Air Liquid Damage Repair Johannesburg',
  description: 'Professional MacBook Air liquid damage repair in Johannesburg. Emergency assessment, Assessment: from R599, up-to-3 year warranty. M1, M2, M3 and Intel models.',
});
const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbSchemaItems);

export default function MacBookAirLiquidDamagePage() {
  const whatsappLiquidDamage = 'https://wa.me/27790539964?text=Hi%20ZA%20Support%2C%20my%20MacBook%20Air%20has%20liquid%20damage';

  return (
    <>
      <SchemaOrg schema={faqSchema} />
      <SchemaOrg schema={serviceSchema} />
      <SchemaOrg schema={breadcrumbSchema} />

      {/* Hero */}
      <section className="hero-gradient grid-overlay pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={breadcrumbItems} />
          <div className="mt-8 max-w-4xl">
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#E8F4F1] leading-tight mb-6"
             
            >
              MacBook Air Liquid Damage
              <br />
              <span className="text-[#0FEA7A]">Repair Johannesburg</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-4 max-w-3xl leading-relaxed">
              Emergency assessment available. M1, M2, M3 and all Intel models.
              Assessment: from R599. written up-to-3 year warranty. Hyde Park, Johannesburg.
            </p>
            <p className="text-base text-[#7A9E98] mb-8 max-w-3xl leading-relaxed">
              The MacBook Air&apos;s thin, fanless design means liquid reaches the logic board faster than
              any other Mac. Every minute matters, the sooner you bring it in, the better the outcome.
            </p>
            <div className="flex flex-wrap gap-3 mb-8">
              {[
                { icon: Shield, label: 'Assessment: from R599' },
                { icon: Clock, label: '24–72hr Turnaround' },
                { icon: Zap, label: 'Assessment: from R599' },
                { icon: CheckCircle, label: 'Warranty' },
                { icon: Droplets, label: '500+ Recoveries' },
              ].map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-2 bg-[rgba(15,234,122,0.08)] border border-[rgba(15,234,122,0.15)] px-3 py-2 rounded-full"
                >
                  <Icon className="w-4 h-4 text-[#0FEA7A]" />
                  <span className="text-[#E8F4F1] text-sm font-medium">{label}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={whatsappLiquidDamage}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 hover:shadow-[0_0_32px_rgba(15,234,122,0.4)] transition-all"
              >
                💬 WhatsApp, Urgent Help
              </a>
              <a
                href={CONTACT.booking}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all"
              >
                📅 Book Assessment
              </a>
              <a
                href={`tel:${CONTACT.phoneTel}`}
                className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.2)] text-[#7A9E98] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[rgba(15,234,122,0.05)] transition-all"
              >
                <Phone className="w-5 h-5" /> Call {CONTACT.phone}
              </a>
            </div>
            <div className="flex flex-wrap gap-6 mt-8 pt-6 border-t border-[rgba(255,255,255,0.06)]">
              {[
                { value: '500+', label: 'Liquid Damage Recoveries' },
                { value: SITE.yearsExperience + ' Years', label: 'In Business Since 2009' },
                { value: SITE.rating + '★', label: SITE.reviewCount + ' Google Reviews' },
                { value: 'Covered', label: 'Up-to-3 Year Warranty, No Exceptions' },
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

      {/* Stats Bar */}
      <section className="py-6 bg-[rgba(15,234,122,0.06)] border-y border-[rgba(15,234,122,0.12)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-8 text-center">
            {[
              { stat: '500+', label: 'Liquid Damage Recoveries' },
              { stat: 'Assessment: from R599', label: 'Fee' },
              { stat: 'Warranty', label: 'Written. On every repair.' },
              { stat: 'Assessment: from R599', label: 'Always. No obligation.' },
            ].map(({ stat, label }) => (
              <div key={stat} className="px-4">
                <p className="text-[#0FEA7A] text-lg font-extrabold">{stat}</p>
                <p className="text-[#7A9E98] text-xs mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why MacBook Air Is More Vulnerable */}
      <section className="py-8 sm:py-16 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-card p-8 border-[rgba(245,166,35,0.2)]">
            <h2
              className="text-2xl font-extrabold text-[#E8F4F1] mb-4"
             
            >
              Why the MacBook Air Is More Vulnerable to Liquid Damage
            </h2>
            <div className="space-y-4 text-[#7A9E98] leading-relaxed">
              <p>
                The MacBook Air is Apple&apos;s thinnest notebook, and that thinness comes at a cost when liquid
                is involved. In a MacBook Pro, the fan assembly and larger chassis create some physical separation
                between the keyboard and the logic board. In the MacBook Air, there is almost none.
              </p>
              <p>
                The fanless design compounds this: a MacBook Pro&apos;s fans can move liquid around before it
                settles. A MacBook Air&apos;s static internals mean liquid travels directly down by gravity and
                <strong className="text-[#E8F4F1]"> pools on the logic board</strong>. This increases the
                dwell time of liquid on sensitive components and accelerates corrosion.
              </p>
              <p>
                On M1, M2, and M3 MacBook Airs, the situation is further complicated by Apple&apos;s unified architecture:
                the CPU, RAM, and neural engine are all on one silicon die. A single corroded trace near
                unified memory can render the entire board non-functional. Early cleaning is not just preferable. It is essential.
              </p>
              <ul className="space-y-2 pl-4">
                {[
                  'Thinner chassis, liquid reaches the logic board in seconds, not minutes',
                  'No fan, liquid pools rather than distributes, increasing contact time on the board',
                  'M-series unified logic board, CPU, RAM, and storage on one component',
                  'Logic board replacement is significantly more expensive than component-level repair',
                ].map((point) => (
                  <li key={point} className="flex items-start gap-2">
                    <span className="text-[#F55736] font-bold mt-0.5">!</span>
                    <span className="text-sm">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Guide */}
      <section className="py-10 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle className="w-6 h-6 text-[#F5A623]" />
            <p className="text-[#F5A623] text-sm font-semibold uppercase tracking-wider">Emergency Guide</p>
          </div>
          <h2
            className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4"
           
          >
            What to Do in the First 30 Minutes
          </h2>
          <p className="text-[#7A9E98] leading-relaxed mb-10">
            The actions you take in the first 30 minutes after a spill determine whether your MacBook Air
            can be saved. Follow these steps exactly, in order, before bringing it in.
          </p>
          <div className="space-y-5">
            {emergencySteps.map((item) => (
              <div
                key={item.step}
                className={`flex gap-5 p-6 rounded-2xl border ${
                  item.urgent
                    ? 'border-[rgba(245,87,54,0.25)] bg-[rgba(245,87,54,0.04)]'
                    : 'border-[rgba(15,234,122,0.15)] bg-[rgba(15,234,122,0.03)]'
                }`}
              >
                <div
                  className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-sm font-extrabold ${
                    item.urgent
                      ? 'bg-[rgba(245,87,54,0.15)] text-[#F55736]'
                      : 'bg-[rgba(15,234,122,0.12)] text-[#0FEA7A]'
                  }`}
                 
                >
                  {item.step}
                </div>
                <div>
                  <h3 className="text-[#E8F4F1] font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-[#7A9E98] leading-relaxed text-sm">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Rice Doesn't Work */}
      <section className="py-8 sm:py-16 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-card p-8 border-[rgba(245,166,35,0.2)]">
            <h2
              className="text-2xl font-extrabold text-[#E8F4F1] mb-4"
             
            >
              Why the &ldquo;Rice Trick&rdquo; Does Not Work, The Science
            </h2>
            <div className="space-y-4 text-[#7A9E98] leading-relaxed">
              <p>
                The rice myth persists because it feels logical, rice absorbs moisture from food containers,
                so it should absorb moisture from electronics. The problem is that liquid damage to a MacBook Air
                is not a moisture problem. It is a <strong className="text-[#E8F4F1]">corrosion problem</strong>.
              </p>
              <p>
                When liquid contacts a powered logic board, electrolytic corrosion begins within minutes.
                The liquid acts as an electrolyte, it allows current to flow between adjacent traces and pads,
                causing metallic ions to migrate from conductors onto the PCB surface. This creates conductive
                bridges (dendrites) and eats away copper traces. On a MacBook Air, this happens faster because
                the board is closer to the liquid source.
              </p>
              <p>
                Rice absorbs some of the free water molecules, but it does not:
              </p>
              <ul className="space-y-2 pl-4">
                {[
                  'Remove the corrosive mineral and ionic residue left on the board',
                  'Reverse electrolytic damage already caused while the board was powered',
                  'Clean corrosion from under IC packages or connector pins',
                  'Stop ongoing corrosion that continues even after the visible liquid is gone',
                ].map((point) => (
                  <li key={point} className="flex items-start gap-2">
                    <span className="text-[#F55736] font-bold mt-0.5">✕</span>
                    <span className="text-sm">{point}</span>
                  </li>
                ))}
              </ul>
              <p>
                What actually works: professional board cleaning with a specialist PCB solution, followed
                by microscope inspection and targeted component replacement. This is what we do at ZA Support —
                and it is why our liquid damage recovery rate is significantly higher than &ldquo;let it dry&rdquo; approaches.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Severity Tiers */}
      <section className="py-10 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4"
           
          >
            Common Liquid Damage Scenarios &amp; Repair Costs
          </h2>
          <p className="text-[#7A9E98] mb-10 max-w-3xl leading-relaxed">
            Every liquid damage case is different. The cost and complexity depend on where the liquid went,
            how much got in, and how quickly the machine was powered off. Below are the four most common scenarios
            for MacBook Air models.
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {severityTiers.map((tier) => (
              <div
                key={tier.scenario}
                className={`rounded-2xl border p-7 ${recoveryColours[tier.colour]}`}
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <h3 className="text-[#E8F4F1] font-bold text-xl">
                    {tier.scenario}
                  </h3>
                  <span className={`flex-shrink-0 text-xs font-semibold px-2.5 py-1 rounded-full ${badgeColours[tier.colour]}`}>
                    {tier.recovery}
                  </span>
                </div>
                <p className="text-[#7A9E98] text-sm leading-relaxed mb-5">{tier.detail}</p>
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[rgba(255,255,255,0.06)]">
                  <div>
                    <p className="text-[#7A9E98] text-xs mb-1">Repair type</p>
                    <p className="text-[#E8F4F1] text-sm font-medium">{tier.repair}</p>
                  </div>
                  <div>
                    <p className="text-[#7A9E98] text-xs mb-1">Typical turnaround</p>
                    <p className="text-[#E8F4F1] text-sm font-medium">{tier.timeframe}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 p-5 rounded-xl border border-[rgba(15,234,122,0.15)] bg-[rgba(15,234,122,0.04)] flex items-start gap-4">
            <Shield className="w-5 h-5 text-[#0FEA7A] flex-shrink-0 mt-0.5" />
            <p className="text-[#7A9E98] text-sm leading-relaxed">
              All prices are confirmed before any work begins. Our Assessment: from R599 policy applies to every case —
              if we cannot repair your MacBook Air, an assessment fee of from R599 applies and the machine is returned exactly
              as received. up-to-3 year warranty on all repairs.
            </p>
          </div>
        </div>
      </section>

      {/* Repair Process */}
      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4"
           
          >
            Our Liquid Damage Repair Process
          </h2>
          <p className="text-[#7A9E98] mb-10 leading-relaxed">
            We follow a systematic, transparent process on every liquid damage case. You are kept informed
            at every stage, and you approve the cost before we begin.
          </p>
          <div className="space-y-5">
            {repairProcess.map((item) => (
              <div key={item.step} className="flex gap-5">
                <div className="flex-shrink-0 w-10 h-10 bg-[rgba(15,234,122,0.12)] rounded-full flex items-center justify-center text-[#0FEA7A] font-extrabold text-sm">
                  {item.step}
                </div>
                <div className="pb-5 border-b border-[rgba(255,255,255,0.04)] flex-1">
                  <h3 className="text-[#E8F4F1] font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-[#7A9E98] text-sm leading-relaxed">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Models We Repair + Failure Points */}
      <section className="py-10 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-16">
            <div>
              <h2
                className="text-3xl font-extrabold text-[#E8F4F1] mb-6"
               
              >
                MacBook Air Models We Repair
              </h2>
              <p className="text-[#7A9E98] leading-relaxed mb-6">
                We repair all MacBook Air models for liquid damage, from the slim Intel models of 2018–2020
                through to the current M3 in both 13&rdquo; and 15&rdquo; configurations. Our engineers know
                the specific board layout and failure modes of every revision.
              </p>
              <div className="space-y-2.5">
                {[
                  'MacBook Air 13" (A1932), 2018 Intel',
                  'MacBook Air 13" (A1932), 2019 Intel',
                  'MacBook Air 13" (A2179), 2020 Intel',
                  'MacBook Air 13" M1 (A2337), 2020',
                  'MacBook Air 13" M2 (A2681), 2022',
                  'MacBook Air 15" M2 (A2941), 2023',
                  'MacBook Air 13" M3 (A3113), 2024',
                  'MacBook Air 15" M3 (A3114), 2024',
                ].map((model) => (
                  <div key={model} className="flex items-center gap-3">
                    <CheckCircle className="w-4 h-4 text-[#0FEA7A] flex-shrink-0" />
                    <span className="text-[#7A9E98] text-sm">{model}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2
                className="text-3xl font-extrabold text-[#E8F4F1] mb-6"
               
              >
                Common Failure Points After a Spill
              </h2>
              <div className="space-y-4">
                {[
                  {
                    title: 'USB-C / MagSafe Board',
                    desc: 'First to fail in most cases on M-series Airs. Controls charging and data. Often replaceable independently of the main logic board.',
                  },
                  {
                    title: 'Keyboard &amp; Trackpad',
                    desc: 'Both are exposed first in a top-down spill. Replacement restores full function and is the most cost-effective repair when the logic board is unaffected.',
                  },
                  {
                    title: 'Logic Board Traces &amp; ICs',
                    desc: 'Corrosion on copper traces causes open circuits. On M-series Airs, unified memory proximity makes this especially urgent.',
                  },
                  {
                    title: 'Display &amp; Backlight Circuit',
                    desc: 'Liquid entering the display assembly causes dead pixels or backlight failure. Display replacement restores full output.',
                  },
                  {
                    title: 'Speaker Assemblies',
                    desc: 'MacBook Air speakers are compact and can be permanently saturated by liquid. Replacement restores full audio.',
                  },
                  {
                    title: 'Touch ID Sensor',
                    desc: 'The Touch ID button and associated flex can be damaged by a spill. Replacement is possible on most Intel and M1 models.',
                  },
                ].map((item) => (
                  <div key={item.title} className="glass-card p-4">
                    <h3 className="text-[#E8F4F1] font-semibold mb-1">{item.title}</h3>
                    <p className="text-[#7A9E98] text-sm" dangerouslySetInnerHTML={{ __html: item.desc }} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-3xl font-extrabold text-[#E8F4F1] mb-10"
           
          >
            What Clients Say
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {reviews.map((review) => (
              <div key={review.name} className="glass-card p-6 flex flex-col gap-4">
                <div className="flex gap-0.5">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#0FEA7A] text-[#0FEA7A]" />
                  ))}
                </div>
                <p className="text-[#7A9E98] text-sm leading-relaxed flex-1">&ldquo;{review.text}&rdquo;</p>
                <div>
                  <p className="text-[#E8F4F1] font-semibold text-sm">{review.name}</p>
                  <div className="flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-[#7A9E98]" />
                    <p className="text-[#7A9E98] text-xs">{review.location}, {review.service}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-10 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQAccordion items={faqs} title="MacBook Air Liquid Damage, FAQs" />
        </div>
      </section>

      {/* Related Services */}
      <section className="py-8 sm:py-16 bg-[#111C1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-2xl font-extrabold text-[#E8F4F1] mb-6"
           
          >
            Related Services
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { title: 'MacBook Pro Liquid Damage', href: '/liquid-damage/macbook-pro' },
              { title: 'Liquid Damage Hub', href: '/liquid-damage' },
              { title: 'Logic Board Repair', href: '/logic-board-repair' },
            ].map((item) => (
              <Link key={item.href} href={item.href} className="glass-card p-4 flex items-center justify-between group">
                <div>
                  <p className="text-[#E8F4F1] font-semibold text-sm">{item.title}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-[#7A9E98] group-hover:text-[#0FEA7A] transition-colors" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-8 sm:py-16 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-[rgba(39,80,77,0.3)] border border-[rgba(15,234,122,0.2)] rounded-3xl p-10">
            <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3">
              MacBook Air Water Damage? Act Now.
            </h2>
            <p className="text-[#7A9E98] mb-6 max-w-xl mx-auto">
              Every hour of delay increases corrosion and repair cost. Assessment: from R599.
              Hyde Park, Johannesburg.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={whatsappLiquidDamage}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 hover:shadow-[0_0_32px_rgba(15,234,122,0.4)] transition-all"
              >
                💬 WhatsApp Now
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
