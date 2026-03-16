import type { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle, ArrowRight, Shield, Clock, Search, ThumbsUp, Star, MapPin, Phone, MessageCircle, AlertCircle } from 'lucide-react';
import SchemaOrg from '@/components/seo/SchemaOrg';
import { buildFaqSchema, buildServiceSchema, buildBreadcrumbSchema } from '@/lib/schema';
import FAQAccordion from '@/components/ui/FAQ';
import Breadcrumb from '@/components/ui/Breadcrumb';


export const metadata: Metadata = {
  title: 'Mac Assessment Process Johannesburg, How We Work | ZA Support',
  description:
    'How ZA Support assessments work: R899 ex VAT assessment fee, absorbed into repair cost if you proceed. Transparent quotes, no hidden charges. Hyde Park, Johannesburg. WhatsApp 079 053 9964.',
  alternates: { canonical: 'https://zasupport.com/no-fix-no-fee' },
  keywords: [
    'Mac assessment Johannesburg',
    'Mac diagnostic fee Johannesburg',
    'MacBook repair assessment process',
    'Mac repair process Hyde Park',
    'Mac repair Johannesburg how it works',
    'MacBook diagnostic Johannesburg',
    'logic board repair assessment Johannesburg',
    'Mac repair Hyde Park Johannesburg',
    'Mac assessment Sandton',
    'Mac diagnostic cost Johannesburg',
  ],
  openGraph: {
    title: 'Mac Assessment Process Johannesburg | How We Work | ZA Support',
    description: 'R899 ex VAT assessment fee, absorbed into your repair cost if you proceed. Transparent fixed-price quotes before any work begins.',
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
    title: 'Book Your Assessment',
    detail:
      'WhatsApp us on 079 053 9964 or book online. Tell us what your Mac is doing and we will confirm a time. We operate from Hyde Park, Johannesburg. No deposit required to book.',
  },
  {
    step: '2',
    icon: Search,
    title: 'We Diagnose, R899 ex VAT Assessment Fee',
    detail:
      'Our technician inspects your Mac using professional diagnostic tools and board-level testing equipment. We identify the exact fault. The assessment fee is R899 ex VAT. This covers the full diagnostic, regardless of complexity.',
  },
  {
    step: '3',
    icon: ThumbsUp,
    title: 'Fixed Price Quote, No Surprises',
    detail:
      'We present a written quote with the exact fault identified, the specific parts required, the total cost, and the estimated turnaround time. The price you see is the price you pay. No hidden labour charges.',
  },
  {
    step: '4',
    icon: CheckCircle,
    title: 'Proceed or Decline, Your Choice',
    detail:
      'If you approve the quote and we proceed with the repair, the R899 ex VAT assessment fee is absorbed into the repair cost. If you decline the repair after assessment, the R899 ex VAT assessment fee is payable for the diagnostic work completed.',
  },
];

const services = [
  { name: 'Logic Board Repair', description: 'Component-level microsoldering, no power, no display, no charging, kernel panics', href: '/logic-board-repair' },
  { name: 'Liquid Damage Repair', description: 'Professional board cleaning, corrosion removal, board-level restoration after spills', href: '/liquid-damage' },
  { name: 'Screen Replacement', description: 'Full LCD/Retina/ProMotion display replacement, cracked, backlight failure, dead pixels', href: '/macbook-repair/screen' },
  { name: 'Battery Replacement', description: 'Genuine capacity replacement, swollen, not holding charge, sudden shutdown', href: '/macbook-repair/battery' },
  { name: 'Keyboard Replacement', description: 'Full keyboard deck replacement, unresponsive keys, repeated characters, debris damage', href: '/macbook-repair/keyboard' },
  { name: 'Charging Port Repair', description: 'USB-C / MagSafe port repair, not charging, no connection detected, bent pins', href: '/macbook-repair/charging-port' },
];

const faqs = [
  {
    question: 'How much does the Mac assessment cost?',
    answer:
      'The assessment fee is R899 ex VAT. This covers the full diagnostic inspection of your Mac, board-level testing, fault identification, and a written quote. If you proceed with the repair, this fee is absorbed into the repair cost and you do not pay it separately.',
  },
  {
    question: 'What happens if I proceed with the repair?',
    answer:
      'If you approve the quote and we carry out the repair, the R899 ex VAT assessment fee is absorbed into the total repair cost. You pay the repair price quoted, the assessment fee is not charged on top of that.',
  },
  {
    question: 'What happens if I decline the repair after assessment?',
    answer:
      'If you decline the repair after receiving the written quote, the R899 ex VAT assessment fee is payable. This covers the time and equipment used to diagnose your Mac and provide the detailed fault report and quote.',
  },
  {
    question: 'Do I need to pay a deposit to book an assessment?',
    answer:
      'No deposit is required to book. You book via WhatsApp or online, bring your Mac in, and the R899 ex VAT assessment fee is settled after the diagnostic is complete. Payment for the repair is only required once you have approved the written quote.',
  },
  {
    question: 'How long does the assessment take?',
    answer:
      'Most assessments are completed within 30 minutes to 2 hours. Simple faults are identified quickly. Complex liquid damage cases or intermittent board faults may take up to 2 hours for a thorough diagnosis. We will give you a realistic timeframe when you book.',
  },
  {
    question: 'Does the assessment cover logic board repair?',
    answer:
      'Yes. Logic board repair is our primary speciality and is covered under the standard assessment process. We use professional board-level diagnostics to identify the exact fault before quoting.',
  },
  {
    question: 'Is liquid damage covered by the assessment?',
    answer:
      'Yes, liquid damage assessments are included. We perform a full board inspection, identify affected components, and provide a written quote. We will never start repair work without your written approval of the quote.',
  },
  {
    question: 'Can I wait at the workshop while you assess my Mac?',
    answer:
      'Yes. Our workshop is based in Hyde Park, Johannesburg. You are welcome to wait for the initial assessment. For complex faults that require extended diagnosis, we will contact you with a result. Collection and courier options are also available across Johannesburg.',
  },
];

const testimonials = [
  {
    suburb: 'Sandton',
    name: 'Priya N.',
    text: 'My MacBook Pro died completely, no power at all. ZA Support diagnosed it, gave me a clear written quote, and had it back to me in three days. The assessment fee was included in the repair cost. Completely transparent.',
    stars: 5,
  },
  {
    suburb: 'Rosebank',
    name: 'Michael T.',
    text: 'After my MacBook Air got water damage I went to ZA Support. They assessed it, explained exactly what was damaged, and quoted me a fixed price. Once I approved, the assessment was part of the total cost. Honest, professional service.',
    stars: 5,
  },
  {
    suburb: 'Midrand',
    name: 'Siphiwe M.',
    text: 'The screen on my MacBook Pro cracked. ZA Support quoted me a fixed price after a thorough assessment and stuck to it exactly. The repair took two days. I will not go anywhere else for Mac repairs in Johannesburg.',
    stars: 5,
  },
];

const breadcrumbItems = [
  { label: 'Assessment Process', href: '/no-fix-no-fee' },
];

const breadcrumbSchemaItems = [
  { name: 'Home', url: 'https://zasupport.com' },
  { name: 'Assessment Process', url: 'https://zasupport.com/no-fix-no-fee' },
];

export default function AssessmentProcessPage() {
  const faqSchema = buildFaqSchema(faqs);

  const serviceSchema = buildServiceSchema({
    name: 'Mac Assessment and Repair Process, Johannesburg',
    description:
      'R899 ex VAT assessment fee for Mac diagnostic and fault identification in Johannesburg. Assessment fee absorbed into repair cost if client proceeds. Covers logic board repair, liquid damage, screen replacement, battery, keyboard, and charging port.',
  });

  const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbSchemaItems);

  const aggregateRatingSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'ZA Support, Apple Mac Repair Johannesburg',
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

        {/* Hero */}
        <section className="hero-gradient grid-overlay relative pt-28 pb-20 px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <Breadcrumb items={breadcrumbItems} />
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6 mt-4"
              style={{ background: 'rgba(15,234,122,0.12)', color: '#0FEA7A', border: '1px solid rgba(15,234,122,0.25)' }}
            >
              <CheckCircle className="w-4 h-4" />
              Transparent Assessment Process, 16 Years Experience
            </div>

            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 leading-tight" style={{ color: '#E8F4F1' }}>
              Our Assessment Process{' '}
              <span style={{ color: '#0FEA7A' }}>Johannesburg</span>
            </h1>

            <p className="text-xl md:text-2xl mb-4 max-w-2xl mx-auto leading-relaxed" style={{ color: '#7A9E98' }}>
              R899 ex VAT assessment fee &mdash; <strong style={{ color: '#E8F4F1' }}>absorbed into your repair cost</strong> if you proceed.
            </p>

            <p className="text-base mb-10 max-w-xl mx-auto" style={{ color: '#7A9E98' }}>
              No deposit to book. Written fixed-price quote before any work begins. Hyde Park, Johannesburg &mdash; all Mac models, all faults.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="/api/wa?service=assessment&page=/no-fix-no-fee"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-lg transition-all hover:opacity-90 hover:scale-[1.02]"
                style={{ background: '#0FEA7A', color: '#0A1A18' }}
              >
                <MessageCircle className="w-5 h-5" />
                Book Assessment on WhatsApp
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
                { label: 'R899 ex VAT assessment fee', icon: '✓' },
                { label: 'Fee absorbed if repair proceeds', icon: '✓' },
                { label: '16 years experience', icon: '✓' },
                { label: 'Warranty on all repairs', icon: '✓' },
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

        {/* Assessment Fee Callout */}
        <section className="py-10 px-4">
          <div className="max-w-4xl mx-auto">
            <div
              className="rounded-2xl p-6 md:p-8"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}
            >
              <h2 className="text-xl font-bold mb-6 text-center" style={{ color: '#E8F4F1' }}>
                How Our Assessment Fee Works
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {/* Proceed with repair */}
                <div
                  className="rounded-xl p-6"
                  style={{ background: 'rgba(15,234,122,0.06)', border: '1px solid rgba(15,234,122,0.2)' }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <CheckCircle className="w-6 h-6" style={{ color: '#0FEA7A' }} />
                    <span className="font-bold text-lg" style={{ color: '#0FEA7A' }}>If you proceed with the repair</span>
                  </div>
                  <ul className="space-y-3">
                    {[
                      'Assessment fee: R899 ex VAT',
                      'Fee absorbed into repair cost',
                      'You pay the quoted repair price only',
                      'Written fixed-price quote provided',
                      'No deposit required to book',
                      'Warranty on all parts and labour',
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm" style={{ color: '#E8F4F1' }}>
                        <CheckCircle className="w-4 h-4 flex-shrink-0" style={{ color: '#0FEA7A' }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                {/* Decline repair */}
                <div
                  className="rounded-xl p-6"
                  style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <AlertCircle className="w-6 h-6" style={{ color: '#7A9E98' }} />
                    <span className="font-bold text-lg" style={{ color: '#7A9E98' }}>If you decline the repair</span>
                  </div>
                  <ul className="space-y-3">
                    {[
                      'Assessment fee: R899 ex VAT payable',
                      'Covers full diagnostic completed',
                      'Written fault report provided',
                      'Your Mac returned as received',
                      'No additional charges',
                      'Honest advice on your options',
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm" style={{ color: '#7A9E98' }}>
                        <CheckCircle className="w-4 h-4 flex-shrink-0" style={{ color: '#7A9E98' }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: '#E8F4F1' }}>
                How the Assessment Process Works
              </h2>
              <p className="text-lg max-w-2xl mx-auto" style={{ color: '#7A9E98' }}>
                Four steps. No hidden costs. You are in control at every stage.
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

        {/* Policy Detail */}
        <section className="py-16 px-4" style={{ background: 'rgba(255,255,255,0.015)' }}>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ color: '#E8F4F1' }}>
              Our Assessment Policy &mdash; In Full
            </h2>

            <div className="space-y-6 text-base leading-relaxed" style={{ color: '#7A9E98' }}>
              <p>
                ZA Support charges a R899 ex VAT assessment fee to inspect and diagnose your Mac. This covers the time and equipment required to identify the exact fault, test the board at component level, and produce a written fixed-price quote.
              </p>
              <p>
                When you bring your Mac to our Hyde Park workshop, we assess it using professional board-level diagnostic equipment. We identify the specific fault and provide you with a written fixed-price quote. The quote includes the exact fault, the component or parts required, the total cost including labour, and a realistic turnaround time.
              </p>
              <p>
                At that point, you have a choice. You approve the quote and we proceed &mdash; the R899 ex VAT assessment fee is absorbed into the repair cost, so you pay the quoted repair price and nothing more. Or you decline the quote &mdash; in which case the R899 ex VAT assessment fee is payable for the diagnostic work completed, and we return your Mac exactly as received.
              </p>
              <p>
                This policy applies to all Mac repairs: logic board microsoldering, liquid damage restoration, screen replacement, battery replacement, keyboard repair, and charging port repair.
              </p>

              <div
                className="rounded-2xl p-6 mt-8"
                style={{ background: 'rgba(15,234,122,0.05)', border: '1px solid rgba(15,234,122,0.15)' }}
              >
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: '#0FEA7A' }} />
                  <div>
                    <p className="font-semibold mb-2" style={{ color: '#E8F4F1' }}>
                      What is always included in the R899 ex VAT assessment:
                    </p>
                    <ul className="space-y-2">
                      {[
                        'Full board-level diagnostic inspection',
                        'Exact fault identification (not a general description)',
                        'Written fixed-price quote with parts and labour',
                        'Honest assessment of repair viability',
                        'Options if repair is not cost-effective',
                        'Your Mac returned safely whether you proceed or not',
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
                We are transparent about this because we believe you deserve to know the full cost before booking. After 16 years of Mac repair at component level, we provide thorough, accurate diagnostics. We charge fairly for that expertise.
              </p>
            </div>
          </div>
        </section>

        {/* Services Covered */}
        <section className="py-16 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: '#E8F4F1' }}>
                Services Covered by This Process
              </h2>
              <p className="text-lg max-w-2xl mx-auto" style={{ color: '#7A9E98' }}>
                Every Mac repair service we offer follows this assessment process. Written quote, transparent pricing, no surprises.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {services.map(({ name, description, href }) => (
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
                  <div className="mt-3 pt-3" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                    <span className="text-xs flex items-center gap-1" style={{ color: '#0FEA7A' }}>
                      <CheckCircle className="w-3 h-3" />
                      Assessment R899 ex VAT &mdash; absorbed if repair proceeds
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
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
                    <span className="text-xs" style={{ color: '#7A9E98' }}>&mdash; {suburb}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: '#E8F4F1' }}>
                Frequently Asked Questions
              </h2>
              <p className="text-lg" style={{ color: '#7A9E98' }}>
                Straight answers about how our assessment process works.
              </p>
            </div>
            <FAQAccordion items={faqs} />
          </div>
        </section>

        {/* Location + Workshop */}
        <section className="py-16 px-4" style={{ background: 'rgba(255,255,255,0.015)' }}>
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6" style={{ color: '#E8F4F1' }}>
                  Our Workshop &mdash; Hyde Park, Johannesburg
                </h2>
                <div className="space-y-4 text-base leading-relaxed" style={{ color: '#7A9E98' }}>
                  <p>
                    We are based at 1 Hyde Park Lane, Hyde Park, Johannesburg 2196 &mdash; centrally located for clients travelling from Sandton, Rosebank, Midrand, Bryanston, Randburg, and Fourways.
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
                <h3 className="text-xl font-bold mb-2" style={{ color: '#E8F4F1' }}>Ready to book your assessment?</h3>
                <p className="text-sm mb-6" style={{ color: '#7A9E98' }}>
                  Message us on WhatsApp with your Mac model and what it is doing. We will confirm a time and let you know what to bring.
                </p>
                <a
                  href="/api/wa?service=assessment&page=/no-fix-no-fee"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-4 rounded-xl font-semibold text-base transition-all hover:opacity-90"
                  style={{ background: '#0FEA7A', color: '#0A1A18' }}
                >
                  <MessageCircle className="w-5 h-5" />
                  Book Assessment on WhatsApp
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
                    'No deposit to book',
                    'R899 ex VAT fee',
                    'Fee absorbed if repair proceeds',
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

        {/* Why ZA Support */}
        <section className="py-16 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: '#E8F4F1' }}>
                Why 16 Years of Mac Repair Makes the Difference
              </h2>
              <p className="text-lg max-w-2xl mx-auto" style={{ color: '#7A9E98' }}>
                Accurate diagnostics are only possible because we know Mac hardware at component level.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { icon: Shield, title: '16 Years', sub: 'Mac repair expertise in Johannesburg' },
                { icon: CheckCircle, title: 'Component-Level', sub: 'Microsoldering, not board swaps' },
                { icon: Clock, title: 'Warranty', sub: 'On all repairs, industry leading' },
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

        {/* Related Services */}
        <section className="py-12 bg-[#071210]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-xl font-bold text-[#E8F4F1] mb-6" style={{ fontFamily: 'Syne, sans-serif' }}>
              Related Services
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                { label: 'Logic Board Repair', href: '/logic-board-repair' },
                { label: 'Liquid Damage Repair', href: '/liquid-damage' },
                { label: 'Battery Replacement', href: '/macbook-repair/battery' },
                { label: 'Screen Replacement', href: '/macbook-repair/screen' },
                { label: 'MacBook Not Turning On', href: '/macbook-not-turning-on' },
              ].map(link => (
                <Link key={link.href} href={link.href} className="block p-3 rounded-lg bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] text-[#7A9E98] hover:text-[#0FEA7A] hover:border-[#0FEA7A] text-sm transition-colors">
                  {link.label} &rarr;
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ color: '#E8F4F1' }}>
              Book your Mac assessment.{' '}
              <span style={{ color: '#0FEA7A' }}>Today.</span>
            </h2>
            <p className="text-lg mb-10" style={{ color: '#7A9E98' }}>
              R899 ex VAT assessment fee. Absorbed into your repair cost if you proceed. A straight answer about what is wrong and what it will cost to fix.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/api/wa?service=assessment&page=/no-fix-no-fee"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-lg transition-all hover:opacity-90 hover:scale-[1.02]"
                style={{ background: '#0FEA7A', color: '#0A1A18' }}
              >
                <MessageCircle className="w-5 h-5" />
                Book Assessment on WhatsApp
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
