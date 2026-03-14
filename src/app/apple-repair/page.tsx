import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Phone,
  ArrowRight,
  Star,
  Shield,
  Clock,
  BadgeCheck,
  CheckCircle,
  Cpu,
  Droplets,
  Monitor,
  Battery,
  Keyboard,
  Wrench,
  Zap,
} from 'lucide-react';
import SchemaOrg from '@/components/seo/SchemaOrg';
import { buildFaqSchema, buildServiceSchema, LOCAL_BUSINESS_PROVIDER } from '@/lib/schema';
import FAQAccordion from '@/components/ui/FAQ';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { CONTACT, SITE } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Apple Mac Repair — Johannesburg | ZA Support',
  description:
    "Johannesburg's Apple Mac repair specialists. Logic board, battery, screen, keyboard, liquid damage, trackpad, charging port. No Fix No Fee. 4.9★ 120+ reviews. Free diagnostic. Hyde Park. Call 064 529 5863.",
  alternates: { canonical: 'https://zasupport.com/apple-repair' },
  openGraph: {
    title: 'Apple Mac Repair Johannesburg | ZA Support',
    description:
      'Expert Apple Mac repair in Johannesburg. Logic board microsoldering, battery, screen, keyboard, liquid damage. Free diagnostic. No Fix No Fee. 12-month warranty.',
    url: 'https://zasupport.com/apple-repair',
    siteName: 'ZA Support',
    locale: 'en_ZA',
    type: 'website',
  },
};

// ─── Service Cards ────────────────────────────────────────────────────────────
const serviceCards = [
  {
    icon: Cpu,
    title: 'Logic Board Repair',
    description: 'Microsoldering specialists. We fix the chip that failed — not the whole board. No-power, no-display, USB-C failure, GPU faults.',
    href: '/logic-board-repair',
    price: 'From R 1,800',
    tag: 'Most popular',
    accent: 'text-orange-400',
  },
  {
    icon: Battery,
    title: 'Battery Replacement',
    description: 'Restore battery health to 100%. All M-series and Intel MacBook Air and Pro models. OEM-grade cells, 12-month warranty.',
    href: '/macbook-repair/battery',
    price: 'From R 1,200',
    tag: null,
    accent: 'text-green-400',
  },
  {
    icon: Monitor,
    title: 'Screen Repair',
    description: 'Cracked Retina display, dead pixels, backlight failure. Genuine-quality panels for all MacBook, iMac and iPad models.',
    href: '/macbook-repair/screen',
    price: 'From R 3,500',
    tag: null,
    accent: 'text-blue-400',
  },
  {
    icon: Keyboard,
    title: 'Keyboard Repair',
    description: 'Sticky keys, broken keys, water-damaged keyboard. Butterfly to Magic keyboard. All MacBook Pro and Air models.',
    href: '/macbook-repair',
    price: 'From R 2,500',
    tag: null,
    accent: 'text-purple-400',
  },
  {
    icon: Droplets,
    title: 'Liquid Damage Repair',
    description: 'Ultrasonic cleaning and component-level repair for MacBook, iMac, iPhone, iPad and Apple Watch after liquid exposure.',
    href: '/liquid-damage',
    price: 'From R 2,500',
    tag: null,
    accent: 'text-cyan-400',
  },
  {
    icon: Wrench,
    title: 'Trackpad Repair',
    description: 'Force Touch trackpad failure, physical damage, or click not registering. MacBook Air and Pro, all models.',
    href: '/macbook-repair',
    price: 'From R 1,800',
    tag: null,
    accent: 'text-yellow-400',
  },
  {
    icon: Zap,
    title: 'Charging Port Repair',
    description: 'USB-C / MagSafe charging port failure. Charging controller chip replacement. No charging, one-side only, loose port.',
    href: '/logic-board-repair',
    price: 'From R 1,800',
    tag: null,
    accent: 'text-red-400',
  },
  {
    icon: Cpu,
    title: 'MacBook Pro Repair',
    description: 'All faults, all years — Intel 2008 through M4 Pro/Max 2024. Battery, screen, keyboard, logic board, liquid damage.',
    href: '/macbook-pro-repair',
    price: 'From R 1,200',
    tag: null,
    accent: 'text-teal-400',
  },
];

// ─── All Services Grid ────────────────────────────────────────────────────────
const allServices = [
  { title: 'MacBook Repair', href: '/macbook-repair', price: 'From R 950', sub: 'Battery, screen, keyboard, logic board' },
  { title: 'MacBook Air Repair', href: '/macbook-air-repair', price: 'From R 1,200', sub: 'M1, M2, M3 and Intel — all models' },
  { title: 'MacBook Pro Repair', href: '/macbook-pro-repair', price: 'From R 1,500', sub: 'M1–M3 Pro/Max and Intel — all models' },
  { title: 'iMac Repair', href: '/imac-repair', price: 'From R 1,800', sub: 'Screen, RAM, SSD, logic board — all models' },
  { title: 'Logic Board Repair', href: '/logic-board-repair', price: 'From R 1,800', sub: 'Microsoldering specialists' },
  { title: 'Liquid Damage Repair', href: '/liquid-damage', price: 'From R 2,500', sub: 'MacBook, iMac, iPhone, iPad, Apple Watch' },
  { title: 'iPhone Repair', href: '/iphone-repair', price: 'From R 950', sub: 'All models, all damage types' },
  { title: 'iPad Repair', href: '/ipad-repair', price: 'From R 1,200', sub: 'All iPad models including M4' },
  { title: 'MacBook Battery', href: '/macbook-repair/battery', price: 'From R 1,200', sub: 'All M-series and Intel MacBook Air & Pro' },
  { title: 'MacBook Screen', href: '/macbook-repair/screen', price: 'From R 3,500', sub: 'Retina display, all models' },
  { title: 'JAMF MDM', href: '/jamf-mdm', price: 'From R 4,500/mo', sub: 'Enterprise Apple device management' },
  { title: 'Managed IT Services', href: '/managed-services', price: 'From R 4,500/mo', sub: 'Apple-first IT support for business' },
];

// ─── Process Steps ────────────────────────────────────────────────────────────
const processSteps = [
  {
    step: '01',
    title: 'Free Diagnostic',
    body: 'Bring your device to our Hyde Park workshop or arrange a courier. We inspect and identify the fault — at no charge, no obligation.',
  },
  {
    step: '02',
    title: 'Written Quote',
    body: 'You receive a clear, written quote before any work begins. No hidden fees. If the price does not suit you, there is no charge.',
  },
  {
    step: '03',
    title: 'Expert Repair',
    body: 'Our technicians work at component level where possible. Most repairs are completed within 24–72 hours. Complex logic board work: 3–5 days.',
  },
  {
    step: '04',
    title: 'Tested + Warrantied',
    body: 'Your device is fully tested before collection. Every repair includes a 12-month written warranty covering parts and workmanship.',
  },
];

// ─── Customer Reviews ─────────────────────────────────────────────────────────
const customerReviews = [
  {
    name: 'James O.',
    suburb: 'Sandton',
    rating: 5,
    date: '02/2026',
    text: 'My 2019 MacBook Pro was completely dead after a coffee spill. ZA Support diagnosed it within a few hours — corroded USB-C controller. Fixed for R 2,200. Apple quoted R 42,000 for a new board. Cannot recommend highly enough.',
    service: 'Liquid Damage + Logic Board',
  },
  {
    name: 'Priya M.',
    suburb: 'Rosebank',
    rating: 5,
    date: '01/2026',
    text: 'Screen was flickering on my 2015 MacBook Pro. Other shops said unfixable or quoted R 8,000+ for a replacement board. ZA Support repaired the GPU for R 3,500 with a 12-month warranty. Six weeks later — perfect.',
    service: 'Logic Board Repair',
  },
  {
    name: 'Ryan T.',
    suburb: 'Fourways',
    rating: 5,
    date: '03/2026',
    text: 'MacBook Air M2 would not charge on either USB-C port. ZA Support found a failed charging controller chip and replaced it same day. Free diagnostic, no surprises on price. Will absolutely use again.',
    service: 'Charging Port Repair',
  },
  {
    name: 'Sarah M.',
    suburb: 'Illovo',
    rating: 5,
    date: '03/2026',
    text: 'Best Apple repair experience in Johannesburg. The team diagnosed a logic board fault that two other shops had completely missed. Honest, knowledgeable, and the 12-month warranty gave me real peace of mind.',
    service: 'Logic Board Repair',
  },
];

// ─── FAQs ─────────────────────────────────────────────────────────────────────
const faqs = [
  {
    question: 'How much does Apple Mac repair cost in Johannesburg?',
    answer:
      'Costs vary by device and fault type. Battery replacement from R 1,200 (MacBook Air) or R 1,500 (MacBook Pro). Screen replacement from R 3,500. Logic board microsoldering from R 1,800. Liquid damage from R 2,500. iPhone screen from R 1,500, battery from R 950. All diagnostics are free with no obligation — you will receive a written quote before any work begins.',
  },
  {
    question: 'What is your No Fix No Fee policy?',
    answer:
      'If we assess your device and cannot repair it, or if the repair is not cost-effective for you, you pay nothing — not even for the diagnostic. There are no callout fees, no assessment charges, and no hidden costs. We only charge you when we successfully repair your device.',
  },
  {
    question: 'Do you repair both old and new Apple devices?',
    answer:
      'Yes. We repair everything from older Intel MacBook Pros (2010 onwards) to current M4 models. For iPhones, we repair from iPhone 8 through iPhone 16 Pro Max. iMac, Mac mini, iPad and Apple Watch repairs are also available. Call to confirm parts availability for very old or very new models.',
  },
  {
    question: 'Do you offer a warranty on repairs?',
    answer:
      'Yes — every repair includes a 12-month written warranty covering workmanship and replacement components. If the same fault returns within 12 months, we repair it at no charge. This applies to all repairs: logic board, battery, screen, keyboard, liquid damage and more.',
  },
  {
    question: 'How long does repair take?',
    answer:
      'Battery and screen replacements are typically completed within 24 hours, often same-day. Logic board microsoldering: 24–72 hours. Complex liquid damage or multi-component board faults: 3–5 business days. We will give you a specific timeframe after the free diagnostic.',
  },
  {
    question: 'Where are you located?',
    answer:
      'Our workshop is at 1 Hyde Lane, Second Floor, Office E2004, Hyde Park, Johannesburg 2196. We are a 5-minute drive from Rosebank, 8 minutes from Sandton. We also collect from most major Johannesburg suburbs — call or WhatsApp to arrange.',
  },
  {
    question: 'Can you recover my data from a dead Mac?',
    answer:
      'In most cases, yes. For Intel Macs with a removable SSD, data recovery is typically straightforward. For M-series Macs where the SSD is soldered to the logic board, recovery depends on whether the storage chip is intact. We assess data recoverability as part of the free diagnostic at no extra charge.',
  },
  {
    question: 'Is your repair cheaper than the Apple Store?',
    answer:
      'Significantly cheaper for most repairs. Apple Store logic board replacements typically cost R 15,000 – R 70,000. ZA Support microsoldering repair for the same fault: R 1,800 – R 6,500. Battery replacement at Apple is R 2,000–R 2,500; ZA Support from R 1,200. Plus we offer a free diagnostic, No Fix No Fee, and a 12-month warranty.',
  },
  {
    question: 'Do you repair M1, M2, M3 and M4 MacBooks?',
    answer:
      'Yes. Apple Silicon logic boards have different repairability to Intel boards — the CPU, GPU and RAM are integrated in the M-series chip — but surrounding components including USB-C controllers, power management ICs, storage and board traces are fully serviceable. Battery, screen, keyboard and trackpad repairs are the same as Intel models.',
  },
  {
    question: 'What areas do you serve?',
    answer:
      'We serve all of Johannesburg and surrounds including Hyde Park, Sandton, Rosebank, Illovo, Bryanston, Fourways, Midrand, Randburg, Parktown, Melrose, Greenside and beyond. We offer collection from your home or office within most Johannesburg suburbs.',
  },
];

// ─── Schemas ──────────────────────────────────────────────────────────────────
const faqSchema = buildFaqSchema(faqs);

const serviceSchema = buildServiceSchema({
  name: 'Apple Mac Repair Johannesburg',
  description:
    'Expert Apple Mac repair in Johannesburg. Logic board microsoldering, battery replacement, screen repair, keyboard repair, liquid damage, trackpad and charging port repair. All MacBook, iMac, Mac mini, iPhone and iPad models.',
  lowPrice: '950',
  highPrice: '12000',
});

const aggregateRatingSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': 'https://zasupport.com/#business',
  name: 'ZA Support',
  url: 'https://zasupport.com',
  telephone: CONTACT.phone,
  address: {
    '@type': 'PostalAddress',
    streetAddress: CONTACT.address.street,
    addressLocality: CONTACT.address.city,
    addressRegion: CONTACT.address.province,
    postalCode: CONTACT.address.postalCode,
    addressCountry: 'ZA',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '120',
    bestRating: '5',
    worstRating: '1',
  },
};

const reviewSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'ZA Support',
  review: customerReviews.map((r) => ({
    '@type': 'Review',
    author: { '@type': 'Person', name: r.name },
    datePublished: r.date,
    reviewRating: { '@type': 'Rating', ratingValue: r.rating, bestRating: 5 },
    reviewBody: r.text,
  })),
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://zasupport.com' },
    { '@type': 'ListItem', position: 2, name: 'Apple Repair', item: 'https://zasupport.com/apple-repair' },
  ],
};

// ─── Page Component ───────────────────────────────────────────────────────────
export default function AppleRepairPage() {
  return (
    <>
      <SchemaOrg schema={faqSchema} />
      <SchemaOrg schema={serviceSchema} />
      <SchemaOrg schema={aggregateRatingSchema} />
      <SchemaOrg schema={reviewSchema} />
      <SchemaOrg schema={breadcrumbSchema} />

      {/* ── HERO ── */}
      <section className="hero-gradient grid-overlay pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: 'Apple Repair' }]} />
          <div className="mt-8 max-w-4xl">
            <div className="inline-flex items-center gap-2 bg-[rgba(15,234,122,0.08)] border border-[rgba(15,234,122,0.2)] rounded-full px-4 py-2 mb-6">
              <span className="text-[#0FEA7A]">★★★★★</span>
              <span className="text-[#E8F4F1] text-sm">{SITE.rating} · {SITE.reviewCount} Google Reviews</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#E8F4F1] leading-tight mb-6" style={{ fontFamily: 'Syne, sans-serif' }}>
              Apple Mac Repair — Johannesburg
              <br /><span className="text-[#0FEA7A]">Every Device. Every Problem.</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-8 max-w-3xl leading-relaxed">
              ZA Support is Johannesburg&apos;s specialist Apple repair service. Logic board microsoldering,
              battery, screen, keyboard, liquid damage, trackpad, charging port — all Mac and iOS devices.
              Free diagnostic, No Fix No Fee, 12-month warranty. Hyde Park.
            </p>
            <div className="flex flex-wrap gap-6 mb-8">
              {[
                { value: SITE.repairsCount, label: 'Repairs Completed' },
                { value: SITE.rating + '★', label: 'Google Rating' },
                { value: SITE.yearsExperience + ' Years', label: 'Apple Experience' },
              ].map((stat) => (
                <div key={stat.label}>
                  <span className="block text-3xl font-extrabold text-[#0FEA7A]" style={{ fontFamily: 'Syne, sans-serif' }}>{stat.value}</span>
                  <span className="text-[#7A9E98] text-sm">{stat.label}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={`https://wa.me/27645295863?text=Hi%20ZA%20Support%2C%20I%20need%20help%20with%20my%20Apple%20device`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 hover:shadow-[0_0_32px_rgba(15,234,122,0.4)] transition-all"
              >
                💬 WhatsApp for Quote
              </a>
              <a href={CONTACT.booking} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all">
                📅 Book Free Assessment <ArrowRight className="w-5 h-5" />
              </a>
              <a href={`tel:${CONTACT.phoneTel}`} className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.2)] text-[#7A9E98] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[rgba(15,234,122,0.05)] transition-all">
                <Phone className="w-5 h-5" /> Call {CONTACT.phone}
              </a>
            </div>

            {/* Stats bar */}
            <div className="flex flex-wrap gap-6 mt-8 pt-6 border-t border-[rgba(255,255,255,0.06)]">
              {[
                { value: SITE.repairsCount, label: 'Repairs Completed' },
                { value: '14 Years', label: 'Experience Since 2012' },
                { value: '12 Months', label: 'Written Warranty' },
                { value: 'No Fix', label: 'No Fee — Always' },
                { value: `${SITE.rating}★`, label: `${SITE.reviewCount} Google Reviews` },
              ].map(({ value, label }) => (
                <div key={label}>
                  <p className="text-[#0FEA7A] text-xl font-extrabold" style={{ fontFamily: 'Syne, sans-serif' }}>{value}</p>
                  <p className="text-[#7A9E98] text-xs mt-0.5">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TRUST BAR ── */}
      <section className="py-6 bg-[#111C1A] border-y border-[rgba(15,234,122,0.1)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
            {[
              { icon: Shield, label: 'No Fix No Fee' },
              { icon: BadgeCheck, label: '12-Month Warranty' },
              { icon: Clock, label: '72-Hour Turnaround' },
              { icon: CheckCircle, label: 'Free Diagnostic' },
              { icon: Phone, label: '064 529 5863' },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2">
                <Icon className="w-4 h-4 text-[#0FEA7A]" />
                <span className="text-[#E8F4F1] text-sm font-medium">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FREE DIAGNOSTIC CALLOUT ── */}
      <section className="py-6 bg-[rgba(15,234,122,0.06)] border-b border-[rgba(15,234,122,0.12)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-8 text-center">
            <div>
              <p className="text-[#7A9E98] text-xs uppercase tracking-wider mb-1">Mac Shack &amp; other shops</p>
              <p className="text-xl font-extrabold text-red-400 line-through">R 550 diagnostic fee</p>
            </div>
            <div className="text-[#0FEA7A] text-3xl font-black">vs</div>
            <div>
              <p className="text-[#7A9E98] text-xs uppercase tracking-wider mb-1">ZA Support</p>
              <p className="text-xl font-extrabold text-[#0FEA7A]">Free diagnostic — always</p>
            </div>
            <div className="hidden sm:block h-8 w-px bg-[rgba(15,234,122,0.2)]"></div>
            <div>
              <p className="text-[#E8F4F1] text-sm font-semibold">No Fix No Fee. 12-month written warranty on every repair.</p>
              <p className="text-[#7A9E98] text-xs mt-0.5">We only charge you when we successfully fix your device.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICE CARDS ── */}
      <section className="py-20 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4 text-center" style={{ fontFamily: 'Syne, sans-serif' }}>
            Apple Mac Repair Services — Johannesburg
          </h2>
          <p className="text-[#7A9E98] text-center text-sm mb-10 max-w-2xl mx-auto">
            We repair every Apple device, every fault type, at component level where possible.
            All services include a free diagnostic, No Fix No Fee, and a 12-month written warranty.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {serviceCards.map((service) => (
              <Link key={service.href + service.title} href={service.href} className="glass-card p-6 group block relative">
                {service.tag && (
                  <span className="absolute top-4 right-4 text-[10px] bg-[#0FEA7A]/10 text-[#0FEA7A] border border-[#0FEA7A]/20 px-2 py-0.5 rounded-full font-semibold">
                    {service.tag}
                  </span>
                )}
                <service.icon className={`w-6 h-6 ${service.accent} mb-3`} />
                <h3 className="text-[#E8F4F1] font-bold mb-2 text-sm group-hover:text-[#0FEA7A] transition-colors" style={{ fontFamily: 'Syne, sans-serif' }}>
                  {service.title}
                </h3>
                <p className="text-[#7A9E98] text-xs mb-4 leading-relaxed">{service.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-[#0FEA7A] text-sm font-bold">{service.price}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#7A9E98] group-hover:text-[#0FEA7A] transition-colors" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── NO FIX NO FEE CALLOUT ── */}
      <section className="py-12 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[rgba(15,234,122,0.06)] border border-[rgba(15,234,122,0.25)] rounded-2xl p-8 flex flex-col md:flex-row items-center gap-6">
            <div className="flex-shrink-0">
              <div className="w-16 h-16 bg-[rgba(15,234,122,0.15)] rounded-2xl flex items-center justify-center">
                <Shield className="w-8 h-8 text-[#0FEA7A]" />
              </div>
            </div>
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl font-extrabold text-[#E8F4F1] mb-2" style={{ fontFamily: 'Syne, sans-serif' }}>
                No Fix No Fee — Guaranteed
              </h2>
              <p className="text-[#7A9E98] text-sm leading-relaxed">
                We assess your device free of charge, diagnose the fault, and only charge you if we successfully repair it.
                If we cannot fix it, or if the repair is not cost-effective for you, you pay nothing.
                No callout fee. No diagnostic charge. No hidden costs. Every repair backed by a 12-month written warranty.
              </p>
            </div>
            <div className="flex-shrink-0">
              <a
                href={`https://wa.me/27645295863?text=Hi%20ZA%20Support%2C%20I%20need%20help%20with%20my%20Apple%20device`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-6 py-3 rounded-xl font-bold text-sm hover:bg-[#0FEA7A]/90 transition-all whitespace-nowrap"
              >
                💬 Get a Quote
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── ALL SERVICES GRID ── */}
      <section className="py-20 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-8 text-center" style={{ fontFamily: 'Syne, sans-serif' }}>
            All Repair &amp; Support Services
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {allServices.map((service) => (
              <Link key={service.href + service.title} href={service.href} className="glass-card p-5 group block">
                <h3 className="text-[#E8F4F1] font-bold mb-1 text-sm group-hover:text-[#0FEA7A] transition-colors" style={{ fontFamily: 'Syne, sans-serif' }}>
                  {service.title}
                </h3>
                <p className="text-[#7A9E98] text-xs mb-3">{service.sub}</p>
                <div className="flex items-center justify-between">
                  <span className="text-[#0FEA7A] text-sm font-bold">{service.price}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#7A9E98] group-hover:text-[#0FEA7A] transition-colors" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY ZA SUPPORT ── */}
      <section className="py-20 bg-[#111C1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4 text-center" style={{ fontFamily: 'Syne, sans-serif' }}>
            Why Choose ZA Support?
          </h2>
          <p className="text-[#7A9E98] text-center text-sm mb-10 max-w-2xl mx-auto">
            We are not a franchise or a walk-in counter. We are specialist Apple technicians who work at component level,
            give you honest advice, and back every repair with a real 12-month warranty.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Cpu,
                title: 'Component-Level Repair',
                body: 'We replace the chip or component that failed — not the entire logic board. This saves you R 10,000–R 60,000 compared to an Apple Store board replacement, and keeps your original data and Touch ID pairing intact.',
              },
              {
                icon: Shield,
                title: 'Honest Assessment',
                body: 'If your device is not worth repairing, we will tell you. Our free diagnostic is a genuine assessment, not a sales exercise. No Fix No Fee means we only earn when we actually fix your Mac.',
              },
              {
                icon: BadgeCheck,
                title: '12-Month Written Warranty',
                body: 'Every repair comes with a 12-month written warranty covering the specific fault we repaired. If the same issue returns within 12 months, we fix it at no charge. This is non-negotiable and included on every job.',
              },
              {
                icon: Clock,
                title: 'Fast Turnaround',
                body: 'Most battery, screen and keyboard repairs: same day or next day. Logic board microsoldering: 24–72 hours. We know your Mac is critical to your work — we do not hold jobs unnecessarily.',
              },
              {
                icon: CheckCircle,
                title: 'Free Diagnostic — Always',
                body: 'Unlike Mac Shack (R 550) and other shops, our diagnostic is always free. You will know exactly what is wrong and exactly what it will cost before you decide anything.',
              },
              {
                icon: Star,
                title: '4.9★ on Google',
                body: `${SITE.reviewCount} verified Google reviews from real clients in Johannesburg. Our reputation is built on honest assessments, successful repairs, and standing behind our warranty without argument.`,
              },
            ].map(({ icon: Icon, title, body }) => (
              <div key={title} className="glass-card p-6">
                <Icon className="w-6 h-6 text-[#0FEA7A] mb-3" />
                <h3 className="text-[#E8F4F1] font-bold mb-2 text-sm" style={{ fontFamily: 'Syne, sans-serif' }}>{title}</h3>
                <p className="text-[#7A9E98] text-xs leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section className="py-20 bg-[#0A1A18]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-4 text-center" style={{ fontFamily: 'Syne, sans-serif' }}>
            How It Works
          </h2>
          <p className="text-[#7A9E98] text-center text-sm mb-10 max-w-2xl mx-auto">
            From first contact to your repaired device — a clear, transparent process with no surprises.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {processSteps.map(({ step, title, body }) => (
              <div key={step} className="glass-card p-6 relative overflow-hidden">
                <span className="absolute top-4 right-4 text-[#0FEA7A] text-3xl font-extrabold opacity-20" style={{ fontFamily: 'Syne, sans-serif' }}>{step}</span>
                <h3 className="text-[#E8F4F1] font-bold mb-2 text-sm" style={{ fontFamily: 'Syne, sans-serif' }}>{title}</h3>
                <p className="text-[#7A9E98] text-xs leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MID-PAGE WHATSAPP CTA ── */}
      <section className="py-10 bg-[#111C1A] border-y border-[rgba(15,234,122,0.1)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[#E8F4F1] font-semibold mb-4">Apple device damaged? Get a quote in minutes.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`https://wa.me/27645295863?text=Hi%20ZA%20Support%2C%20I%20need%20help%20with%20my%20Apple%20device`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 hover:shadow-[0_0_32px_rgba(15,234,122,0.4)] transition-all"
            >
              💬 WhatsApp Us
            </a>
            <a href={`tel:${CONTACT.phoneTel}`} className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all">
              <Phone className="w-5 h-5" /> Call {CONTACT.phone}
            </a>
          </div>
        </div>
      </section>

      {/* ── REVIEWS ── */}
      <section className="py-20 bg-[#0A1A18]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-1 mb-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} className="w-5 h-5 fill-[#0FEA7A] text-[#0FEA7A]" />
            ))}
          </div>
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3 text-center" style={{ fontFamily: 'Syne, sans-serif' }}>
            {SITE.rating} on Google — {SITE.reviewCount} Reviews
          </h2>
          <p className="text-[#7A9E98] text-center text-sm mb-10">Real clients. Real repairs. Verified on Google.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {customerReviews.map((review) => (
              <div key={review.name} className="glass-card p-6">
                <div className="flex items-center gap-1 mb-3">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="w-3.5 h-3.5 fill-[#0FEA7A] text-[#0FEA7A]" />
                  ))}
                </div>
                <p className="text-[#7A9E98] text-sm leading-relaxed mb-4 italic">&ldquo;{review.text}&rdquo;</p>
                <div className="border-t border-[rgba(255,255,255,0.06)] pt-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-[rgba(15,234,122,0.15)] rounded-full flex items-center justify-center text-[#0FEA7A] font-bold text-sm">
                      {review.name[0]}
                    </div>
                    <div>
                      <p className="text-[#E8F4F1] text-xs font-bold">{review.name}</p>
                      <p className="text-[#7A9E98] text-xs">{review.suburb} · {review.date}</p>
                    </div>
                  </div>
                  <span className="text-[#7A9E98] text-xs">{review.service}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING OVERVIEW ── */}
      <section className="py-20 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-4" style={{ fontFamily: 'Syne, sans-serif' }}>
            Repair Pricing Guide
          </h2>
          <p className="text-[#7A9E98] text-sm mb-8 max-w-2xl">
            All diagnostics are free. Final price confirmed after assessment. No Fix No Fee applies to every job.
          </p>
          <div className="glass-card overflow-hidden p-0">
            {[
              { item: 'Diagnostic Assessment', price: 'Free', note: 'All devices, all faults — always free' },
              { item: 'Battery Replacement', price: 'From R 1,200', note: 'MacBook Air from R 1,200 · MacBook Pro from R 1,500' },
              { item: 'Screen Replacement', price: 'From R 3,500', note: 'Retina display, all MacBook models' },
              { item: 'Keyboard Replacement', price: 'From R 2,500', note: 'All MacBook Air and Pro models' },
              { item: 'Charging Port / USB-C', price: 'From R 1,800', note: 'Charging controller chip or port board' },
              { item: 'Logic Board Repair', price: 'From R 1,800', note: 'Microsoldering — component-level repair' },
              { item: 'Liquid Damage Repair', price: 'From R 2,500', note: 'Ultrasonic clean + component repair' },
              { item: 'Trackpad Repair', price: 'From R 1,800', note: 'Force Touch trackpad, all models' },
              { item: 'iPhone Screen', price: 'From R 1,500', note: 'iPhone 8 through iPhone 16 Pro Max' },
              { item: 'iPhone Battery', price: 'From R 950', note: 'All iPhone models' },
            ].map((item, i, arr) => (
              <div key={item.item} className={`flex items-center justify-between p-5 ${i < arr.length - 1 ? 'border-b border-[rgba(255,255,255,0.05)]' : ''}`}>
                <div>
                  <p className="text-[#E8F4F1] font-semibold text-sm">{item.item}</p>
                  <p className="text-[#7A9E98] text-xs mt-0.5">{item.note}</p>
                </div>
                <span className={`font-bold whitespace-nowrap ml-4 text-sm ${item.price === 'Free' ? 'text-[#0FEA7A]' : 'text-[#0FEA7A]'}`}>
                  {item.price}
                </span>
              </div>
            ))}
          </div>
          <p className="text-[#7A9E98] text-xs mt-3">
            Final price depends on specific fault and model. Free diagnostic with no obligation to proceed.
          </p>
          <div className="rounded-xl border border-[#0FEA7A]/30 bg-[#0FEA7A]/5 p-5 mt-4">
            <p className="text-sm text-[#7A9E98]">
              💡 <strong className="text-[#E8F4F1]">How we compare:</strong> Mac Shack charges R 550 just to look at your device, then R 4,499+ for a board replacement.
              Apple Store board replacements start at R 15,000 and reach R 70,000 for newer models.
              ZA Support starts from <strong className="text-[#0FEA7A]">R 1,800</strong> — free diagnostic, No Fix No Fee, 12-month warranty included.
            </p>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQAccordion items={faqs} title="Apple Mac Repair — Common Questions" />
        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section className="py-16 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-[rgba(39,80,77,0.3)] border border-[rgba(15,234,122,0.2)] rounded-3xl p-10">
            <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3" style={{ fontFamily: 'Syne, sans-serif' }}>
              Apple Device Damaged? Free Diagnostic.
            </h2>
            <p className="text-[#7A9E98] mb-2">No Fix No Fee. 12-month warranty. Hyde Park, Johannesburg.</p>
            <p className="text-[#7A9E98] text-sm mb-8">
              Free diagnostic — no charge, no obligation. We only charge you if we successfully repair your device.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`https://wa.me/27645295863?text=Hi%20ZA%20Support%2C%20I%20need%20help%20with%20my%20Apple%20device`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 hover:shadow-[0_0_32px_rgba(15,234,122,0.4)] transition-all"
              >
                💬 WhatsApp for Quote
              </a>
              <a href={CONTACT.booking} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all">
                📅 Book Online
              </a>
              <a href={`tel:${CONTACT.phoneTel}`} className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.2)] text-[#7A9E98] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[rgba(15,234,122,0.05)] transition-all">
                <Phone className="w-5 h-5" /> Call {CONTACT.phone}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
