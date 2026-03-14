import type { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle, ArrowRight, Shield, Clock, Search, ThumbsUp, Star, MapPin, Phone, MessageCircle, AlertCircle, XCircle } from 'lucide-react';
import SchemaOrg from '@/components/seo/SchemaOrg';
import { buildFaqSchema, buildServiceSchema, buildBreadcrumbSchema } from '@/lib/schema';
import FAQAccordion from '@/components/ui/FAQ';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { CONTACT, SITE } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'No Fix No Fee Mac Repair Johannesburg | ZA Support',
  description:
    'No Fix No Fee Mac repair in Johannesburg. Free diagnostic assessment — you only pay if we fix it. No deposit, no diagnostic fee. Hyde Park. WhatsApp 079 053 9964.',
  alternates: { canonical: 'https://zasupport.com/no-fix-no-fee' },
  keywords: [
    'no fix no fee Mac repair Johannesburg',
    'free Mac diagnostic Johannesburg',
    'no fix no fee MacBook repair',
    'free assessment Mac repair Johannesburg',
    'Mac repair no charge if not fixed',
    'MacBook free diagnostic Johannesburg',
    'no fix no fee logic board repair',
    'Mac repair Hyde Park Johannesburg',
    'free Mac assessment Sandton',
    'no diagnostic fee Mac repair',
  ],
  openGraph: {
    title: 'No Fix No Fee Mac Repair Johannesburg | Free Assessment | ZA Support',
    description: 'We diagnose your Mac for free. You only pay if we fix it. No exceptions. No deposit.',
    url: 'https://zasupport.com/no-fix-no-fee',
    siteName: 'ZA Support',
    locale: 'en_ZA',
    type: 'website',
  },
};

const steps = [
  {
    step: '1',
    icon: MessageCircle,
    title: 'Book a Free Assessment',
    detail:
      'WhatsApp us on 079 053 9964 or book online. No paperwork, no deposit, no card details required. Just tell us what your Mac is doing and we will confirm a time that works for you. We operate from Hyde Park, Johannesburg.',
  },
  {
    step: '2',
    icon: Search,
    title: 'We Diagnose — Completely Free',
    detail:
      'Our technician inspects your Mac using professional diagnostic tools, a stereo microscope, and board-level testing equipment. We identify the exact fault — not a broad guess. This takes 30 minutes to 2 hours depending on complexity. You are charged nothing at this stage, whether we find a fault or not.',
  },
  {
    step: '3',
    icon: ThumbsUp,
    title: 'Fixed Price Quote — No Surprises',
    detail:
      'We present a written quote with the exact fault identified, the specific parts required, the total cost, and the estimated turnaround time. The price you see is the price you pay. No hidden labour charges, no "it turned out to be more complicated" invoices.',
  },
  {
    step: '4',
    icon: CheckCircle,
    title: 'Approve and We Fix It — or Take It Back at No Charge',
    detail:
      'You approve the quote and we begin the repair. Or you decline — and we hand your Mac back exactly as we received it. You pay nothing. No diagnostic fee. No handling charge. No cancellation fee. That is what No Fix No Fee means.',
  },
];

const services = [
  { name: 'Logic Board Repair', description: 'Component-level microsoldering — no power, no display, no charging, kernel panics', href: '/logic-board-repair', from: 'R 1,800' },
  { name: 'Liquid Damage Repair', description: 'Ultrasonic cleaning, corrosion removal, board-level restoration after spills', href: '/liquid-damage', from: 'R 2,500' },
  { name: 'Screen Replacement', description: 'Full LCD/Retina/ProMotion display replacement — cracked, backlight failure, dead pixels', href: '/macbook-repair/screen', from: 'R 2,200' },
  { name: 'Battery Replacement', description: 'Genuine capacity replacement — swollen, not holding charge, sudden shutdown', href: '/macbook-repair/battery', from: 'R 1,800' },
  { name: 'Keyboard Replacement', description: 'Full keyboard deck replacement — unresponsive keys, repeated characters, debris damage', href: '/macbook-repair/keyboard', from: 'R 2,500' },
  { name: 'Charging Port Repair', description: 'USB-C / MagSafe port repair — not charging, no connection detected, bent pins', href: '/macbook-repair/charging-port', from: 'R 1,800' },
];

const faqs = [
  {
    question: 'Is the Mac assessment really free?',
    answer:
      'Yes — 100% free. There is no diagnostic fee, no assessment charge, and no minimum spend. You bring your Mac in (or we arrange collection), we inspect it, and you are charged nothing for that process. The only charge is the agreed repair cost if you choose to proceed and we successfully fix your Mac.',
  },
  {
    question: 'What happens if you cannot fix my Mac?',
    answer:
      'You pay nothing. No Fix No Fee is unconditional at ZA Support. If we assess your Mac and determine it cannot be repaired — or if we attempt the repair and it is unsuccessful — you are charged zero rands. We return your Mac to you exactly as it was received. We will also give you an honest breakdown of your options: replacement board pricing, data recovery possibilities, or the part-out value of the machine.',
  },
  {
    question: 'Do I need to pay a deposit to book an assessment?',
    answer:
      'No deposit is required. You book via WhatsApp or online, bring your Mac in, and we begin the assessment at no charge. Payment is only required after a successful repair and only once you have approved the written quote beforehand.',
  },
  {
    question: 'How long does the free assessment take?',
    answer:
      'Most assessments are completed within 30 minutes to 2 hours. Simple faults — a blown fuse, a failed charging IC, a cracked screen — are identified quickly. Complex liquid damage cases or intermittent board faults may take up to 2 hours for a thorough diagnosis. We will give you a realistic timeframe when you book.',
  },
  {
    question: 'Does No Fix No Fee cover logic board repair?',
    answer:
      'Yes. Logic board repair is our primary speciality and is fully covered under the No Fix No Fee policy. If we cannot identify or fix your logic board fault — whether that is a no-power issue, a display fault, a charging problem, or liquid damage corrosion — you pay nothing for the diagnostic.',
  },
  {
    question: 'Is liquid damage covered by No Fix No Fee?',
    answer:
      'Yes, liquid damage assessments are included. We perform a full board inspection, identify affected components, and provide a written quote. If the damage is too extensive to repair cost-effectively, we will tell you honestly and return the Mac at no charge. We will never start work without your written approval.',
  },
  {
    question: 'Can I wait at the workshop while you assess my Mac?',
    answer:
      'Yes. Our workshop is based in Hyde Park, Johannesburg. You are welcome to wait for the initial assessment. For complex faults that require extended diagnosis, we will contact you with a result rather than have you wait for hours. Collection and courier options are also available across Johannesburg.',
  },
  {
    question: 'Why do you offer No Fix No Fee when other repair shops charge a diagnostic fee?',
    answer:
      'Because we are confident in our skills. ZA Support has 14 years of Mac repair experience with component-level expertise across all Intel and Apple Silicon models. We would rather demonstrate our capability than charge you upfront to find out whether we can help. Mac Shack, for example, charges a R 550 diagnostic fee before touching your machine — whether they fix it or not. We do not think that is fair to the customer.',
  },
];

const testimonials = [
  {
    suburb: 'Sandton',
    name: 'Priya N.',
    text: 'My MacBook Pro died completely — no power at all. ZA Support diagnosed it for free in under an hour, gave me a fixed price, and had it back to me in three days. No fix no fee is exactly what it says. I paid nothing for the assessment.',
    stars: 5,
  },
  {
    suburb: 'Rosebank',
    name: 'Michael T.',
    text: 'After my MacBook Air got water damage I took it to two other shops — both wanted R 550 just to look at it. ZA Support assessed it for free, cleaned the board, and it has been running perfectly for six months. Honest pricing, brilliant service.',
    stars: 5,
  },
  {
    suburb: 'Midrand',
    name: 'Siphiwe M.',
    text: 'The screen on my MacBook Pro cracked. ZA Support quoted me a fixed price after a free assessment and stuck to it exactly — not a rand more. The repair took two days. I will not go anywhere else for Mac repairs in Johannesburg.',
    stars: 5,
  },
];

const breadcrumbItems = [
  { label: 'No Fix No Fee', href: '/no-fix-no-fee' },
];

const breadcrumbSchemaItems = [
  { name: 'Home', url: 'https://zasupport.com' },
  { name: 'No Fix No Fee', url: 'https://zasupport.com/no-fix-no-fee' },
];

export default function NoFixNoFeePage() {
  const faqSchema = buildFaqSchema(faqs);

  const serviceSchema = buildServiceSchema({
    name: 'No Fix No Fee Mac Repair Johannesburg',
    description:
      'Free Mac diagnostic and assessment in Johannesburg. You only pay if we successfully repair your Mac. Covers logic board repair, liquid damage, screen replacement, battery, keyboard, and charging port.',
    lowPrice: '0',
    highPrice: '6500',
  });

  const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbSchemaItems);

  const aggregateRatingSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'ZA Support — Apple Mac Repair Johannesburg',
    url: 'https://zasupport.com',
    telephone: '+27790539964',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '1 Hyde Park Lane',
      addressLocality: 'Hyde Park',
      addressRegion: 'Johannesburg',
      postalCode: '2196',
      addressCountry: 'ZA',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '120',
      bestRating: '5',
      worstRating: '1',
    },
    openingHoursSpecification: [
      { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '08:00', closes: '18:00' },
      { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Saturday'], opens: '09:00', closes: '14:00' },
    ],
  };

  return (
    <>
      <SchemaOrg schema={faqSchema} />
      <SchemaOrg schema={serviceSchema} />
      <SchemaOrg schema={breadcrumbSchema} />
      <SchemaOrg schema={aggregateRatingSchema} />

      <main className="min-h-screen" style={{ background: '#0A1A18', color: '#E8F4F1' }}>

        {/* ── Hero ── */}
        <section className="hero-gradient grid-overlay relative pt-28 pb-20 px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <Breadcrumb items={breadcrumbItems} />
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6 mt-4"
              style={{ background: 'rgba(15,234,122,0.12)', color: '#0FEA7A', border: '1px solid rgba(15,234,122,0.25)' }}
            >
              <CheckCircle className="w-4 h-4" />
              Zero Diagnostic Fee — 14 Years Experience
            </div>

            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 leading-tight" style={{ color: '#E8F4F1' }}>
              No Fix No Fee Mac Repair{' '}
              <span style={{ color: '#0FEA7A' }}>Johannesburg</span>
            </h1>

            <p className="text-xl md:text-2xl mb-4 max-w-2xl mx-auto leading-relaxed" style={{ color: '#7A9E98' }}>
              We diagnose your Mac for free. You only pay if we fix it.{' '}
              <strong style={{ color: '#E8F4F1' }}>No exceptions.</strong>
            </p>

            <p className="text-base mb-10 max-w-xl mx-auto" style={{ color: '#7A9E98' }}>
              No deposit. No diagnostic charge. No obligation. Hyde Park, Johannesburg — all Mac models, all faults.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="https://wa.me/27790539964?text=Hi%20ZA%20Support%2C%20I%27d%20like%20a%20free%20Mac%20assessment"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-lg transition-all hover:opacity-90 hover:scale-[1.02]"
                style={{ background: '#0FEA7A', color: '#0A1A18' }}
              >
                <MessageCircle className="w-5 h-5" />
                Book Free Assessment on WhatsApp
              </a>
              <a
                href="tel:+27790539964"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-base transition-all hover:opacity-80"
                style={{ background: 'rgba(255,255,255,0.06)', color: '#E8F4F1', border: '1px solid rgba(255,255,255,0.12)' }}
              >
                <Phone className="w-5 h-5" />
                079 053 9964
              </a>
            </div>

            {/* Trust bar */}
            <div className="flex flex-wrap justify-center gap-6 mt-12">
              {[
                { label: 'Free diagnostic', icon: '✓' },
                { label: 'No deposit required', icon: '✓' },
                { label: '14 years experience', icon: '✓' },
                { label: '12-month warranty', icon: '✓' },
                { label: 'Hyde Park workshop', icon: '✓' },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2 text-sm" style={{ color: '#7A9E98' }}>
                  <span style={{ color: '#0FEA7A' }} className="font-bold">{item.icon}</span>
                  {item.label}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Competitor Callout ── */}
        <section className="py-10 px-4">
          <div className="max-w-4xl mx-auto">
            <div
              className="rounded-2xl p-6 md:p-8"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}
            >
              <h2 className="text-xl font-bold mb-6 text-center" style={{ color: '#E8F4F1' }}>
                Free Assessment vs. Paying Just to Be Seen
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {/* ZA Support */}
                <div
                  className="rounded-xl p-6"
                  style={{ background: 'rgba(15,234,122,0.06)', border: '1px solid rgba(15,234,122,0.2)' }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <CheckCircle className="w-6 h-6" style={{ color: '#0FEA7A' }} />
                    <span className="font-bold text-lg" style={{ color: '#0FEA7A' }}>ZA Support</span>
                  </div>
                  <ul className="space-y-3">
                    {[
                      'Assessment fee: R 0',
                      'Diagnostic charge: R 0',
                      'Deposit required: None',
                      'Pay if not fixed: No',
                      'Written fixed-price quote: Yes',
                      '12-month warranty: Yes',
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm" style={{ color: '#E8F4F1' }}>
                        <CheckCircle className="w-4 h-4 flex-shrink-0" style={{ color: '#0FEA7A' }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                {/* Mac Shack */}
                <div
                  className="rounded-xl p-6"
                  style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <XCircle className="w-6 h-6" style={{ color: '#7A9E98' }} />
                    <span className="font-bold text-lg" style={{ color: '#7A9E98' }}>Mac Shack</span>
                  </div>
                  <ul className="space-y-3">
                    {[
                      'Assessment fee: R 550',
                      'Diagnostic charge: R 550 (non-refundable)',
                      'Deposit required: R 550',
                      'Pay if not fixed: Yes — you already have',
                      'Written fixed-price quote: Not always',
                      'Warranty: 3 months (standard)',
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm" style={{ color: '#7A9E98' }}>
                        <XCircle className="w-4 h-4 flex-shrink-0" style={{ color: '#7A9E98' }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <p className="text-xs text-center mt-4" style={{ color: '#7A9E98' }}>
                Mac Shack diagnostic fee as of March 2026. Always verify current pricing directly.
              </p>
            </div>
          </div>
        </section>

        {/* ── How It Works ── */}
        <section className="py-16 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: '#E8F4F1' }}>
                How No Fix No Fee Works
              </h2>
              <p className="text-lg max-w-2xl mx-auto" style={{ color: '#7A9E98' }}>
                Four steps. No paperwork. No upfront cost. You are in control at every stage.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {steps.map(({ step, icon: Icon, title, detail }) => (
                <div
                  key={step}
                  className="rounded-2xl p-6 md:p-8"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: 'rgba(15,234,122,0.12)', border: '1px solid rgba(15,234,122,0.2)' }}
                    >
                      <Icon className="w-6 h-6" style={{ color: '#0FEA7A' }} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span
                          className="text-xs font-bold px-2 py-0.5 rounded-full"
                          style={{ background: 'rgba(15,234,122,0.15)', color: '#0FEA7A' }}
                        >
                          Step {step}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold mb-3" style={{ color: '#E8F4F1' }}>{title}</h3>
                      <p className="text-sm leading-relaxed" style={{ color: '#7A9E98' }}>{detail}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── What Does No Fix No Fee Mean ── */}
        <section className="py-16 px-4" style={{ background: 'rgba(255,255,255,0.015)' }}>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ color: '#E8F4F1' }}>
              What Does &ldquo;No Fix No Fee&rdquo; Mean at ZA Support?
            </h2>

            <div className="space-y-6 text-base leading-relaxed" style={{ color: '#7A9E98' }}>
              <p>
                No Fix No Fee means exactly what it says: if we cannot fix your Mac, you do not pay anything. Not a diagnostic fee. Not a handling charge. Not a call-out fee. Zero.
              </p>
              <p>
                When you bring your Mac to our Hyde Park workshop, we assess it using professional board-level diagnostic equipment. We identify the specific fault — not a broad guess like &ldquo;logic board issue&rdquo; — and we provide you with a written fixed-price quote. The quote includes the exact fault, the component or parts required, the total cost including labour, and a realistic turnaround time.
              </p>
              <p>
                At that point, you have a choice. You approve the quote and we proceed. Or you decline the quote and take your Mac home. Either way, the assessment has cost you nothing.
              </p>
              <p>
                If you approve and we begin the repair, and for any reason the repair is unsuccessful — whether the fault is more complex than anticipated, or the board has secondary damage that makes full restoration impossible — you still do not pay. The No Fix No Fee policy applies to the entire outcome, not just the assessment stage.
              </p>

              <div
                className="rounded-2xl p-6 mt-8"
                style={{ background: 'rgba(15,234,122,0.05)', border: '1px solid rgba(15,234,122,0.15)' }}
              >
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: '#0FEA7A' }} />
                  <div>
                    <p className="font-semibold mb-2" style={{ color: '#E8F4F1' }}>
                      No hidden fees — here is what we never charge:
                    </p>
                    <ul className="space-y-2">
                      {[
                        'Diagnostic fee (regardless of outcome)',
                        'Assessment fee or inspection charge',
                        'Deposit before work begins',
                        'Cancellation fee if you decline the quote',
                        'Collection or return fee for Johannesburg drop-offs',
                        'Surcharge for same-day assessments',
                      ].map((item) => (
                        <li key={item} className="flex items-center gap-2 text-sm" style={{ color: '#7A9E98' }}>
                          <CheckCircle className="w-4 h-4 flex-shrink-0" style={{ color: '#0FEA7A' }} />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <p>
                Compare this to the industry standard in Johannesburg. Mac Shack charges R 550 for a diagnostic assessment — non-refundable, regardless of whether they fix your Mac or not. You are paying R 550 just to find out if they can help you. At ZA Support, that information is free.
              </p>
              <p>
                We can offer this because after 14 years of Mac repair — including component-level microsoldering on Intel and Apple Silicon boards — we have the expertise to accurately assess most faults within 30 minutes. We are not guessing. We know what we are looking at.
              </p>
            </div>
          </div>
        </section>

        {/* ── Services Covered ── */}
        <section className="py-16 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: '#E8F4F1' }}>
                Services Covered by No Fix No Fee
              </h2>
              <p className="text-lg max-w-2xl mx-auto" style={{ color: '#7A9E98' }}>
                Every Mac repair service we offer is covered. Free assessment, written quote, no obligation.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {services.map(({ name, description, href, from }) => (
                <Link
                  key={name}
                  href={href}
                  className="group rounded-2xl p-6 transition-all hover:border-[rgba(15,234,122,0.3)]"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', textDecoration: 'none' }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-base font-bold" style={{ color: '#E8F4F1' }}>{name}</h3>
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 mt-0.5" style={{ color: '#0FEA7A' }} />
                  </div>
                  <p className="text-sm mb-4 leading-relaxed" style={{ color: '#7A9E98' }}>{description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs" style={{ color: '#7A9E98' }}>From</span>
                    <span className="text-sm font-bold" style={{ color: '#0FEA7A' }}>{from}</span>
                  </div>
                  <div className="mt-3 pt-3" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                    <span className="text-xs flex items-center gap-1" style={{ color: '#0FEA7A' }}>
                      <CheckCircle className="w-3 h-3" />
                      Free assessment included
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── Testimonials ── */}
        <section className="py-16 px-4" style={{ background: 'rgba(255,255,255,0.015)' }}>
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: '#E8F4F1' }}>
                What Johannesburg Mac Owners Say
              </h2>
              <div className="flex items-center justify-center gap-2 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5" style={{ color: '#0FEA7A', fill: '#0FEA7A' }} />
                ))}
                <span className="ml-2 font-semibold" style={{ color: '#E8F4F1' }}>4.9 / 5</span>
              </div>
              <p className="text-sm" style={{ color: '#7A9E98' }}>Based on 120 verified reviews</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {testimonials.map(({ suburb, name, text, stars }) => (
                <div
                  key={name}
                  className="rounded-2xl p-6"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}
                >
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(stars)].map((_, i) => (
                      <Star key={i} className="w-4 h-4" style={{ color: '#0FEA7A', fill: '#0FEA7A' }} />
                    ))}
                  </div>
                  <p className="text-sm leading-relaxed mb-4" style={{ color: '#7A9E98' }}>&ldquo;{text}&rdquo;</p>
                  <div className="flex items-center gap-2" style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '12px' }}>
                    <MapPin className="w-3.5 h-3.5" style={{ color: '#0FEA7A' }} />
                    <span className="text-xs font-medium" style={{ color: '#E8F4F1' }}>{name}</span>
                    <span className="text-xs" style={{ color: '#7A9E98' }}>— {suburb}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="py-16 px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: '#E8F4F1' }}>
                Frequently Asked Questions
              </h2>
              <p className="text-lg" style={{ color: '#7A9E98' }}>
                Straight answers about how No Fix No Fee works at ZA Support.
              </p>
            </div>
            <FAQAccordion items={faqs} />
          </div>
        </section>

        {/* ── Location + Workshop ── */}
        <section className="py-16 px-4" style={{ background: 'rgba(255,255,255,0.015)' }}>
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6" style={{ color: '#E8F4F1' }}>
                  Our Workshop — Hyde Park, Johannesburg
                </h2>
                <div className="space-y-4 text-base leading-relaxed" style={{ color: '#7A9E98' }}>
                  <p>
                    We are based at 1 Hyde Park Lane, Hyde Park, Johannesburg 2196 — centrally located for clients travelling from Sandton, Rosebank, Midrand, Bryanston, Randburg, and Fourways.
                  </p>
                  <p>
                    Walk-ins are welcome for assessments. For complex repairs, we recommend booking via WhatsApp first so we can prepare appropriately and give you a realistic time estimate.
                  </p>
                  <p>
                    Secure courier collection and delivery is available across Johannesburg and Pretoria for clients who cannot travel to the workshop.
                  </p>
                </div>

                <div className="mt-8 space-y-3">
                  {[
                    { label: 'Address', value: '1 Hyde Park Lane, Hyde Park, Johannesburg 2196' },
                    { label: 'Phone', value: '079 053 9964' },
                    { label: 'WhatsApp', value: '079 053 9964' },
                    { label: 'Hours', value: 'Mon–Fri 08:00–18:00 | Sat 09:00–14:00' },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex gap-3">
                      <span className="text-sm font-semibold w-20 flex-shrink-0" style={{ color: '#0FEA7A' }}>{label}</span>
                      <span className="text-sm" style={{ color: '#E8F4F1' }}>{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div
                className="rounded-2xl p-8"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                <h3 className="text-xl font-bold mb-2" style={{ color: '#E8F4F1' }}>Ready to book your free assessment?</h3>
                <p className="text-sm mb-6" style={{ color: '#7A9E98' }}>
                  Message us on WhatsApp with your Mac model and what it is doing. We will confirm a time and let you know what to bring.
                </p>
                <a
                  href="https://wa.me/27790539964?text=Hi%20ZA%20Support%2C%20I%27d%20like%20a%20free%20Mac%20assessment"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-4 rounded-xl font-semibold text-base transition-all hover:opacity-90"
                  style={{ background: '#0FEA7A', color: '#0A1A18' }}
                >
                  <MessageCircle className="w-5 h-5" />
                  Book Free Assessment on WhatsApp
                </a>
                <a
                  href="tel:+27790539964"
                  className="flex items-center justify-center gap-2 w-full py-3 mt-3 rounded-xl font-medium text-sm transition-all hover:opacity-80"
                  style={{ background: 'rgba(255,255,255,0.05)', color: '#E8F4F1', border: '1px solid rgba(255,255,255,0.1)' }}
                >
                  <Phone className="w-4 h-4" />
                  Call 079 053 9964
                </a>
                <div className="flex items-center justify-center gap-4 mt-4">
                  {[
                    'No deposit',
                    'Free diagnostic',
                    'No obligation',
                  ].map((item) => (
                    <span key={item} className="text-xs flex items-center gap-1" style={{ color: '#7A9E98' }}>
                      <CheckCircle className="w-3 h-3" style={{ color: '#0FEA7A' }} />
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Why ZA Support ── */}
        <section className="py-16 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: '#E8F4F1' }}>
                Why 14 Years of Mac Repair Makes the Difference
              </h2>
              <p className="text-lg max-w-2xl mx-auto" style={{ color: '#7A9E98' }}>
                No Fix No Fee is only possible because we know our limits — and they are very few.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { icon: Shield, title: '14 Years', sub: 'Mac repair expertise in Johannesburg' },
                { icon: CheckCircle, title: 'Component-Level', sub: 'Microsoldering — not board swaps' },
                { icon: Clock, title: '12-Month Warranty', sub: 'On all repairs — industry leading' },
                { icon: Star, title: '4.9 / 5 Rating', sub: 'Based on 120 verified reviews' },
              ].map(({ icon: Icon, title, sub }) => (
                <div
                  key={title}
                  className="rounded-2xl p-6 text-center"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4"
                    style={{ background: 'rgba(15,234,122,0.12)', border: '1px solid rgba(15,234,122,0.2)' }}
                  >
                    <Icon className="w-6 h-6" style={{ color: '#0FEA7A' }} />
                  </div>
                  <div className="text-2xl font-bold mb-1" style={{ color: '#E8F4F1' }}>{title}</div>
                  <div className="text-xs" style={{ color: '#7A9E98' }}>{sub}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Final CTA ── */}
        <section className="py-20 px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ color: '#E8F4F1' }}>
              Your Mac assessed for free.{' '}
              <span style={{ color: '#0FEA7A' }}>Today.</span>
            </h2>
            <p className="text-lg mb-10" style={{ color: '#7A9E98' }}>
              No diagnostic fee. No deposit. No commitment. Just a straight answer about what is wrong and what it will cost to fix — at no charge.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/27790539964?text=Hi%20ZA%20Support%2C%20I%27d%20like%20a%20free%20Mac%20assessment"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-lg transition-all hover:opacity-90 hover:scale-[1.02]"
                style={{ background: '#0FEA7A', color: '#0A1A18' }}
              >
                <MessageCircle className="w-5 h-5" />
                Book Free Assessment on WhatsApp
              </a>
              <Link
                href="/logic-board-repair"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-base transition-all hover:opacity-80"
                style={{ background: 'rgba(255,255,255,0.06)', color: '#E8F4F1', border: '1px solid rgba(255,255,255,0.12)' }}
              >
                Logic Board Repair
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>

      </main>
    </>
  );
}
