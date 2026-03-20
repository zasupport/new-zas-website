import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, ArrowRight, CheckCircle, Star, MessageCircle, Shield, Clock, Wrench, Monitor, Zap, AlertTriangle } from 'lucide-react';
import Breadcrumb from '@/components/ui/Breadcrumb';
import FAQAccordion from '@/components/ui/FAQ';
import SchemaOrg from '@/components/seo/SchemaOrg';
import { buildFaqSchema, LOCAL_BUSINESS_PROVIDER } from '@/lib/schema';
import { CONTACT } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'MacBook Screen Replacement Johannesburg | ZA Support',
  description:
    'MacBook screen replacement in Johannesburg. Cracked Retina display, dead pixels, backlight failure, lines on screen, flickering. All M-series and Intel MacBook Air and Pro models. Same-day available. up-to-3 year warranty. Hyde Park, Johannesburg.',
  alternates: { canonical: 'https://zasupport.com/macbook-repair/screen' },
  keywords: [
    'MacBook screen replacement Johannesburg',
    'MacBook screen repair Johannesburg',
    'cracked MacBook screen Johannesburg',
    'MacBook Retina display replacement',
    'MacBook Pro screen replacement Johannesburg',
    'MacBook Air screen replacement Johannesburg',
    'MacBook dead pixels repair',
    'MacBook backlight repair Johannesburg',
  ],
};

const pricingRows = [
  { model: 'MacBook Air 13" M1 / M2', note: 'Most popular repair' },
  { model: 'MacBook Air 15" M2 / M3', note: '' },
  { model: 'MacBook Air 13" M3', note: '' },
  { model: 'MacBook Pro 13" (2016–2022)', note: 'Intel + M-series' },
  { model: 'MacBook Pro 14" M1 / M2 / M3 / M4', note: '' },
  { model: 'MacBook Pro 16" M1 / M2 / M3 / M4', note: '' },
  { model: 'MacBook Air Intel 13" (2017–2020)', note: '' },
  { model: 'MacBook Pro Intel 15" (2016–2019)', note: '' },
];

const symptoms = [
  { icon: <AlertTriangle className="w-5 h-5" />, title: 'Cracked or Shattered Glass', desc: 'Physical impact cracks the Retina panel or outer glass. Display replacement is the correct fix.' },
  { icon: <Monitor className="w-5 h-5" />, title: 'Dead Pixels', desc: 'Permanent black or coloured dots on the panel, caused by LCD cell failure. Full assembly replacement resolves this.' },
  { icon: <Zap className="w-5 h-5" />, title: 'Backlight Failure', desc: 'Screen is completely dark or very dim even at full brightness. Often the backlight circuit or LED strip has failed.' },
  { icon: <AlertTriangle className="w-5 h-5" />, title: 'Lines Across the Screen', desc: 'Horizontal or vertical lines are usually a failed LCD panel, though GPU faults can produce similar symptoms. We diagnose first.' },
  { icon: <Monitor className="w-5 h-5" />, title: 'Screen Flickering', desc: 'Intermittent flickering on M-series MacBooks can be a display cable issue or a panel fault, both repaired via assembly replacement.' },
  { icon: <Zap className="w-5 h-5" />, title: 'Half Screen Dark or Black', desc: 'A partial blackout usually means the LCD panel has failed. If it appeared after a drop, the display cable may also be damaged.' },
  { icon: <AlertTriangle className="w-5 h-5" />, title: 'Water Lines or Grey Blotches', desc: 'Liquid damage to the display causes grey or brown blotches that spread. Early replacement prevents permanent discolouration.' },
  { icon: <Monitor className="w-5 h-5" />, title: 'Hinge / Cable Damage', desc: 'Repeated opening and closing stresses the display cable. If your screen flickers when you adjust the lid angle, the cable needs replacement.' },
];

const faqs = [
  {
    question: 'How much does MacBook screen replacement cost in Johannesburg?',
    answer: 'The exact price depends on your specific model and year. We provide a assessment fee (from R599) and give you a written fixed quote before starting any work, no surprises.',
  },
  {
    question: 'How long does MacBook screen replacement take?',
    answer: 'Most MacBook screen replacements take 2–4 hours. We will confirm turnaround time when you bring it in. For newer M4 Pro and M4 Max models, we may need 24–48 hours.',
  },
  {
    question: 'Do you use genuine Apple screens?',
    answer: 'We use OEM-quality replacement display assemblies that meet Apple\'s specifications for brightness, colour accuracy, and resolution. All replacement screens are tested before installation and carry our written up-to-3 year warranty. We do not use cheap aftermarket panels, the quality difference is visible.',
  },
  {
    question: 'Will I lose any data during a screen replacement?',
    answer: 'No. Screen replacement is a hardware procedure that does not touch your storage or operating system. Your data, apps, and settings are completely unaffected. That said, we always recommend backing up before any repair, your data is your responsibility.',
  },
  {
    question: 'Can you fix a MacBook Pro M1 or M2 screen?',
    answer: 'Yes. We repair all Apple Silicon MacBooks including M1, M2, M3, and M4 variants across all MacBook Air and MacBook Pro lines. Apple Silicon models use a display assembly similar in approach to Intel models, though the calibration steps differ. We calibrate True Tone and brightness after every M-series screen replacement.',
  },
  {
    question: 'My MacBook has lines on the screen, is it the display or the GPU?',
    answer: 'Both GPU faults and failed display panels produce lines on screen. The key difference: if lines appear on an external monitor too, the fault is the GPU or logic board. If the external monitor is clean, the fault is almost certainly the display assembly. We do a assessment to confirm before quoting.',
  },
  {
    question: 'Does screen replacement affect True Tone on my MacBook?',
    answer: 'True Tone calibration data is stored in the display assembly itself. After replacement, we run Apple\'s display calibration process to restore True Tone accuracy. Most clients cannot tell the difference after calibration. You may notice a slight colour temperature shift for the first few days as your eyes adjust.',
  },
  {
    question: 'What warranty do I get on a MacBook screen replacement?',
    answer: 'All MacBook screen replacements at ZA Support come with a up-to-3 year warranty covering the replacement panel and our labour. If dead pixels appear, backlight fails, or the display develops any fault within the warranty period, we fix it at no cost to you.',
  },
];

const reviews = [
  {
    name: 'Tayla M.',
    suburb: 'Sandton',
    rating: 5,
    text: 'Dropped my MacBook Pro 14" M2 and completely shattered the screen. ZA Support had it repaired the same day. The new display looks perfect, True Tone works, brightness is correct. Worth every rand.',
    date: 'January 2026',
  },
  {
    name: 'Sipho K.',
    suburb: 'Rosebank',
    rating: 5,
    text: 'Had dead pixels spreading across my MacBook Air M1. The team diagnosed it in minutes, gave me a fixed price, and replaced the screen while I worked from their space. No data lost. up-to-3 year warranty. Genuinely impressed.',
    date: 'February 2026',
  },
  {
    name: 'Liesl V.',
    suburb: 'Fourways',
    rating: 5,
    text: 'MacBook Pro 16" backlight failed completely, screen was black even though the machine was on. ZA Support identified the fault and had it done in two days. Professional from start to finish.',
    date: 'March 2026',
  },
];

const aggregateRatingSchema = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'MacBook Screen Replacement Johannesburg',
  description: 'MacBook screen replacement service in Johannesburg covering all MacBook Air and Pro models. Same-day available. up-to-3 year warranty.',
  brand: { '@type': 'Brand', name: 'ZA Support' },
  review: reviews.map((r) => ({
    '@type': 'Review',
    author: { '@type': 'Person', name: r.name },
    reviewRating: { '@type': 'Rating', ratingValue: r.rating, bestRating: 5 },
    reviewBody: r.text,
    datePublished: r.date,
  })),
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'MacBook Screen Replacement Johannesburg',
  provider: LOCAL_BUSINESS_PROVIDER,
  areaServed: [
    { '@type': 'City', name: 'Johannesburg' },
    { '@type': 'Suburb', name: 'Sandton' },
    { '@type': 'Suburb', name: 'Rosebank' },
    { '@type': 'Suburb', name: 'Fourways' },
    { '@type': 'Suburb', name: 'Bryanston' },
    { '@type': 'Suburb', name: 'Hyde Park' },
  ],
  description: 'MacBook screen replacement in Johannesburg. Cracked Retina display, dead pixels, backlight failure, lines on screen, flickering. All M-series and Intel MacBook Air and Pro models. Same-day available. up-to-3 year warranty.',
  availableChannel: [
    { '@type': 'ServiceChannel', serviceUrl: 'https://wa.me/27645295863', serviceType: 'WhatsApp' },
    { '@type': 'ServiceChannel', servicePhone: '+27645295863', serviceType: 'Phone' },
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'MacBook Screen Replacement Models',
    itemListElement: pricingRows.map((row, i) => ({
      '@type': 'Offer',
      position: i + 1,
      itemOffered: { '@type': 'Service', name: row.model },
    })),
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://zasupport.com' },
    { '@type': 'ListItem', position: 2, name: 'MacBook Repair', item: 'https://zasupport.com/macbook-repair' },
    { '@type': 'ListItem', position: 3, name: 'Screen Replacement', item: 'https://zasupport.com/macbook-repair/screen' },
  ],
};

const faqSchema = buildFaqSchema(faqs);

export default function MacBookScreenPage() {
  return (
    <>
      <SchemaOrg schema={faqSchema} />
      <SchemaOrg schema={breadcrumbSchema} />
      <SchemaOrg schema={serviceSchema} />

      {/* HERO */}
      <section className="hero-gradient grid-overlay pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: 'MacBook Repair', href: '/macbook-repair' }, { label: 'Screen Replacement' }]} />
          <div className="mt-8 max-w-4xl">
            <div className="inline-flex items-center gap-2 bg-[rgba(15,234,122,0.1)] border border-[rgba(15,234,122,0.25)] text-[#0FEA7A] text-sm font-semibold px-4 py-2 rounded-full mb-6">
              <CheckCircle className="w-4 h-4" /> Same-Day Available · Up-to-3 Year Warranty · Hyde Park JHB
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#E8F4F1] leading-tight mb-6">
              MacBook Screen Replacement<br />
              <span className="text-[#0FEA7A]">Johannesburg</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-8 max-w-2xl">
              Cracked Retina display, dead pixels, backlight failure, lines on screen, flickering. All MacBook Air and Pro models, Apple Silicon and Intel. Assessment: from R599.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="https://wa.me/27790539964?text=Hi%20ZA%20Support%2C%20I%20need%20a%20MacBook%20screen%20replacement"
                className="inline-flex items-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl font-bold hover:bg-[#0FEA7A]/90 transition-all text-lg"
              >
                <MessageCircle className="w-5 h-5" /> WhatsApp Us
              </a>
              <a
                href={`tel:${CONTACT.phoneTel}`}
                className="inline-flex items-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all"
              >
                <Phone className="w-5 h-5" /> {CONTACT.phone}
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 border border-[rgba(255,255,255,0.12)] text-[#E8F4F1] px-8 py-4 rounded-xl font-semibold hover:bg-[rgba(255,255,255,0.05)] transition-all"
              >
                Get a Quote <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <section className="bg-[rgba(15,234,122,0.06)] border-y border-[rgba(15,234,122,0.15)] py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { stat: '3,000+', label: 'Screens Replaced' },
              { stat: 'Same-Day', label: 'Available (most models)' },
              { stat: '12-Month', label: 'Up-to-3 Year Warranty' },
              { stat: 'OEM Quality', label: 'Display Assemblies' },
            ].map((item) => (
              <div key={item.label} className="flex flex-col items-center">
                <span className="text-2xl font-extrabold text-[#0FEA7A]">{item.stat}</span>
                <span className="text-[#7A9E98] text-sm mt-1">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AGGREGATE RATING DISPLAY */}
      <section className="bg-[#0A1A18] py-10 border-b border-[rgba(255,255,255,0.05)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-6 h-6 fill-[#0FEA7A] text-[#0FEA7A]" />
                ))}
              </div>
              <div>
                <span className="text-3xl font-extrabold text-[#E8F4F1]">4.9</span>
                <span className="text-[#7A9E98] ml-2 text-sm">/ 5 from 632 verified reviews</span>
              </div>
            </div>
            <p className="text-[#7A9E98] text-sm text-center sm:text-right max-w-xs">
              MacBook screen replacement, Sandton, Rosebank, Fourways, Bryanston, Hyde Park
            </p>
          </div>
        </div>
      </section>

      {/* SUPPORTED MODELS TABLE */}
      <section className="py-10 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4">
              MacBook Screen Replacement, <span className="text-[#0FEA7A]">Supported Models</span>
            </h2>
            <p className="text-[#7A9E98] max-w-xl mx-auto">
              OEM-quality assemblies. Written fixed quote. No hidden costs.
            </p>
          </div>
          <div className="max-w-3xl mx-auto">
            <div className="bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] rounded-2xl overflow-hidden">
              <div className="grid grid-cols-2 px-6 py-3 bg-[rgba(15,234,122,0.07)] border-b border-[rgba(255,255,255,0.08)]">
                <span className="text-[#7A9E98] text-xs font-semibold uppercase tracking-wider">Model</span>
                <span className="text-[#7A9E98] text-xs font-semibold uppercase tracking-wider text-right">Note</span>
              </div>
              {pricingRows.map((row, i) => (
                <div
                  key={row.model}
                  className={`grid grid-cols-2 px-6 py-4 items-center ${i < pricingRows.length - 1 ? 'border-b border-[rgba(255,255,255,0.05)]' : ''} hover:bg-[rgba(15,234,122,0.03)] transition-colors`}
                >
                  <span className="text-[#E8F4F1] text-sm font-medium">{row.model}</span>
                  <span className="text-[#7A9E98] text-xs text-right">{row.note}</span>
                </div>
              ))}
            </div>
            <p className="text-[#7A9E98] text-xs mt-4 text-center">
              Call to confirm stock availability for your specific model and year.
            </p>
          </div>
        </div>
      </section>

      {/* SCREEN ISSUES */}
      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4">
              MacBook Screen Issues <span className="text-[#0FEA7A]">We Fix</span>
            </h2>
            <p className="text-[#7A9E98] max-w-xl mx-auto">
              Recognise any of these? Bring it in. We diagnose before we quote.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {symptoms.map((s) => (
              <div key={s.title} className="bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] rounded-2xl p-6 hover:border-[rgba(15,234,122,0.2)] transition-colors">
                <div className="text-[#0FEA7A] mb-3">{s.icon}</div>
                <h3 className="text-[#E8F4F1] font-bold text-sm mb-2">{s.title}</h3>
                <p className="text-[#7A9E98] text-xs leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-10 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4">
              Our Repair <span className="text-[#0FEA7A]">Process</span>
            </h2>
            <p className="text-[#7A9E98]">Simple, transparent, no surprises.</p>
          </div>
          <div className="space-y-5">
            {[
              {
                step: '01',
                icon: <Wrench className="w-5 h-5" />,
                title: 'Assessment: from R599',
                desc: 'We inspect the display damage and test the logic board to confirm there are no secondary faults. We check whether the GPU or display cable is involved, this changes the repair approach.',
              },
              {
                step: '02',
                icon: <Shield className="w-5 h-5" />,
                title: 'Fixed Written Quote',
                desc: 'We give you a written price before touching anything. If anything changes during the repair, we call you first, always. No bill shock.',
              },
              {
                step: '03',
                icon: <Monitor className="w-5 h-5" />,
                title: 'Full Display Assembly Replacement',
                desc: 'We replace the entire lid assembly, Retina panel, backlight, display cable, and glass. We do not attempt glass-only repairs on Retina displays. It is not a reliable method and the results are poor.',
              },
              {
                step: '04',
                icon: <CheckCircle className="w-5 h-5" />,
                title: 'Calibration and Quality Check',
                desc: 'After installation we test for dead pixels, backlight uniformity, and True Tone accuracy. M-series MacBooks get a full colour calibration pass. Only then do we hand it back.',
              },
              {
                step: '05',
                icon: <Clock className="w-5 h-5" />,
                title: 'Warranty Issued',
                desc: 'Your up-to-3 year warranty starts from the moment we hand the MacBook back. Dead pixels, backlight failure, or any display fault within the warranty period, fixed at no cost.',
              },
            ].map((item) => (
              <div key={item.step} className="flex gap-6 bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] rounded-2xl p-6 hover:border-[rgba(15,234,122,0.15)] transition-colors">
                <div className="flex flex-col items-center gap-2 flex-shrink-0">
                  <div className="text-2xl font-extrabold text-[#0FEA7A] opacity-40">{item.step}</div>
                  <div className="text-[#0FEA7A] opacity-60">{item.icon}</div>
                </div>
                <div>
                  <h3 className="text-[#E8F4F1] font-bold mb-2">{item.title}</h3>
                  <p className="text-[#7A9E98] text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY ZA SUPPORT */}
      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4">
              Why Johannesburg Mac Owners <span className="text-[#0FEA7A]">Choose ZA Support</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Assessment: from R599',
                desc: 'If we cannot fix your MacBook screen, assessment fee of from R599 applies. We absorb the diagnostic cost. Zero risk to you.',
              },
              {
                title: 'Up-to-3 Year Warranty',
                desc: 'Every screen replacement carries a warranty on parts and labour. In writing. No verbal promises.',
              },
              {
                title: 'Same-Day Where Possible',
                desc: 'For common models in stock, most repairs are completed the same day. We tell you upfront, no guessing.',
              },
              {
                title: 'OEM-Quality Panels Only',
                desc: 'We do not use cheap aftermarket screens. The display is the thing you look at every day, it matters.',
              },
              {
                title: 'Diagnostic Before Any Quote',
                desc: 'We test the logic board, GPU output, and display cable before quoting. You get the full picture.',
              },
              {
                title: 'Hyde Park, Johannesburg',
                desc: '1 Hyde Park Lane. Easy access from Sandton, Rosebank, Fourways, Bryanston, and surrounding suburbs.',
              },
            ].map((item) => (
              <div key={item.title} className="bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] rounded-2xl p-6 hover:border-[rgba(15,234,122,0.2)] transition-colors">
                <div className="w-8 h-8 rounded-lg bg-[rgba(15,234,122,0.12)] flex items-center justify-center mb-4">
                  <CheckCircle className="w-4 h-4 text-[#0FEA7A]" />
                </div>
                <h3 className="text-[#E8F4F1] font-bold mb-2">{item.title}</h3>
                <p className="text-[#7A9E98] text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="py-10 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4">
              What Clients Say About Our <span className="text-[#0FEA7A]">Screen Replacements</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {reviews.map((review) => (
              <div key={review.name} className="bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] rounded-2xl p-6 flex flex-col gap-4">
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="w-4 h-4 fill-[#0FEA7A] text-[#0FEA7A]" />
                  ))}
                </div>
                <p className="text-[#7A9E98] text-sm leading-relaxed flex-1">&ldquo;{review.text}&rdquo;</p>
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-[#E8F4F1] font-semibold text-sm">{review.name}</p>
                    <p className="text-[#7A9E98] text-xs">{review.suburb}</p>
                  </div>
                  <span className="text-[#7A9E98] text-xs">{review.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* APPLE SILICON vs INTEL, MODEL CALLOUTS */}
      <section className="py-10 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4">
              Apple Silicon vs Intel, <span className="text-[#0FEA7A]">What Changes?</span>
            </h2>
            <p className="text-[#7A9E98] max-w-xl mx-auto text-sm">
              Both fully supported. Here is what differs.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-[rgba(15,234,122,0.12)] flex items-center justify-center">
                  <Zap className="w-5 h-5 text-[#0FEA7A]" />
                </div>
                <h3 className="text-[#E8F4F1] font-bold text-lg">Apple Silicon (M1 – M4)</h3>
              </div>
              <ul className="space-y-3">
                {[
                  'MacBook Air 13" M1, M2, M3 · Air 15" M2, M3',
                  'MacBook Pro 14" and 16" M1 through M4',
                  'MacBook Pro 13" M2',
                  'True Tone calibration run after every replacement',
                  'ProMotion (120Hz) verified on Pro 14" and 16"',
                  'Typically in stock for M1/M2 models',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[#7A9E98] text-sm">
                    <CheckCircle className="w-4 h-4 text-[#0FEA7A] flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-[rgba(15,234,122,0.08)] flex items-center justify-center">
                  <Monitor className="w-5 h-5 text-[#7A9E98]" />
                </div>
                <h3 className="text-[#E8F4F1] font-bold text-lg">Intel Models (2016–2020)</h3>
              </div>
              <ul className="space-y-3">
                {[
                  'MacBook Air 13" 2017–2020 (non-Retina and Retina)',
                  'MacBook Pro 13" 2016–2020',
                  'MacBook Pro 15" 2016–2019',
                  'MacBook Pro 16" 2019',
                  'Older models: display cable is common failure point',
                  'Lower price point, parts more widely available',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[#7A9E98] text-sm">
                    <CheckCircle className="w-4 h-4 text-[#0FEA7A] flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="text-[#7A9E98] text-xs text-center mt-6">
            Not sure which chip your MacBook has? Click the Apple menu → About This Mac. Or WhatsApp us your serial number and we will confirm in minutes.
          </p>
        </div>
      </section>

      {/* WARRANTY COMPARISON */}
      <section className="py-8 sm:py-16 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#E8F4F1] mb-3">
              Why ZA Support for MacBook Screen Replacement?
            </h2>
            <p className="text-[#7A9E98] text-sm">What sets our screen repair service apart.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-4">
            {[
              { title: 'Assessment: from R599', body: 'We diagnose the fault before you commit. No charge, no obligation.' },
              { title: 'Assessment: from R599', body: 'If we cannot repair it, assessment fee of from R599 applies. Simple as that.' },
              { title: 'Up-to-3 Year Warranty', body: 'Every screen replacement carries a up-to-3 year warranty on parts and labour.' },
            ].map(({ title, body }) => (
              <div key={title} className="glass-card p-5">
                <p className="text-[#0FEA7A] font-bold text-sm mb-1">{title}</p>
                <p className="text-[#7A9E98] text-xs leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
          <p className="text-[#7A9E98] text-xs mt-5 text-center">Call or WhatsApp for a confirmed quote for your specific model.</p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQAccordion items={faqs} title="MacBook Screen Replacement, Frequently Asked Questions" />
        </div>
      </section>

      {/* SUBURBS SERVED */}
      <section className="py-8 sm:py-16 bg-[#0A1A18] border-t border-[rgba(255,255,255,0.05)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-extrabold text-[#E8F4F1] mb-6 text-center">
            MacBook Screen Replacement Near You, <span className="text-[#0FEA7A]">Johannesburg</span>
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              'Sandton', 'Rosebank', 'Fourways', 'Bryanston', 'Hyde Park',
              'Randburg', 'Midrand', 'Melrose', 'Parkhurst', 'Illovo',
              'Rivonia', 'Morningside', 'Paulshof', 'Sunninghill', 'Woodmead',
            ].map((suburb) => (
              <span key={suburb} className="bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] text-[#7A9E98] text-sm px-4 py-2 rounded-full hover:border-[rgba(15,234,122,0.2)] hover:text-[#E8F4F1] transition-colors">
                {suburb}
              </span>
            ))}
          </div>
          <p className="text-[#7A9E98] text-sm text-center mt-6">
            Based at <strong className="text-[#E8F4F1]">1 Hyde Park Lane, Hyde Park, Johannesburg 2196</strong>. Walk-ins welcome, call first to confirm same-day availability.
          </p>
        </div>
      </section>

      {/* ── Related Services ── */}
      <section className="py-12 bg-[#071210]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold text-[#E8F4F1] mb-6">
            Related Services
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              { label: 'MacBook Repair', href: '/macbook-repair' },
              { label: 'Battery Replacement', href: '/macbook-repair/battery' },
              { label: 'Liquid Damage Repair', href: '/liquid-damage' },
              { label: 'MacBook Pro Repair', href: '/macbook-pro-repair' },
              { label: 'MacBook Air Repair', href: '/macbook-air-repair' },
              { label: 'Logic Board Repair', href: '/logic-board-repair' },
            ].map(link => (
              <Link key={link.href} href={link.href} className="block p-3 rounded-lg bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] text-[#7A9E98] hover:text-[#0FEA7A] hover:border-[#0FEA7A] text-sm transition-colors">
                {link.label} →
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BOTTOM */}
      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-[rgba(39,80,77,0.3)] border border-[rgba(15,234,122,0.2)] rounded-3xl p-10">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-3">
              Cracked MacBook Screen in Johannesburg?
            </h2>
            <p className="text-[#7A9E98] mb-2 text-lg">Same-day available. Assessment: from R599.</p>
            <p className="text-[#7A9E98] text-sm mb-8">Hyde Park, Johannesburg · up-to-3 year warranty on all screen replacements</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/27790539964?text=Hi%20ZA%20Support%2C%20I%20need%20a%20MacBook%20screen%20replacement"
                className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 transition-all"
              >
                <MessageCircle className="w-5 h-5" /> WhatsApp Us Now
              </a>
              <a
                href={`tel:${CONTACT.phoneTel}`}
                className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all"
              >
                <Phone className="w-5 h-5" /> {CONTACT.phone}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
