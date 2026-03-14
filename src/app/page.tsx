import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Phone, Shield, Clock, Search, MapPin, BadgeCheck,
  Droplets, Cpu, Smartphone, Tablet, Monitor, Wifi,
  Star, ArrowRight, Zap, Award
} from 'lucide-react';
import SchemaOrg from '@/components/seo/SchemaOrg';
import { CONTACT, SITE, REVIEWS } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Apple Repair Johannesburg | MacBook Liquid Damage & Logic Board Specialists | ZA Support',
  description:
    "Johannesburg's Apple repair specialists. MacBook liquid damage, logic board microsoldering, iPhone & iPad repair. 4.9★ 120+ reviews. Hyde Park. No Fix No Fee. Call 064 529 5863.",
  alternates: { canonical: 'https://zasupport.com' },
};

const services = [
  {
    icon: Cpu,
    title: 'Logic Board Repair',
    description: 'Expert microsoldering for no-power, no-display, USB-C failure, and GPU faults.',
    href: '/logic-board-repair',
    price: 'From R 1,800',
    accent: 'text-purple-400',
    whatsapp: 'https://wa.me/27645295863?text=Hi%2C%20I%20need%20a%20logic%20board%20repair%20quote',
  },
  {
    icon: Droplets,
    title: 'Liquid Damage Repair',
    description: 'MacBook, iPhone, iPad, Apple Watch. Board-level ultrasonic cleaning and component repair.',
    href: '/liquid-damage',
    price: 'From R 2,500',
    accent: 'text-blue-400',
  },
  {
    icon: Smartphone,
    title: 'iPhone Repair',
    description: 'Screen, battery, charging port, liquid damage, back glass. All models including iPhone 16.',
    href: '/iphone-repair',
    price: 'From R 950',
    accent: 'text-[#0FEA7A]',
  },
  {
    icon: Tablet,
    title: 'iPad Repair',
    description: 'Screen replacement, battery, charging, and liquid damage. All iPad generations.',
    href: '/ipad-repair',
    price: 'From R 1,200',
    accent: 'text-yellow-400',
  },
  {
    icon: Wifi,
    title: 'JAMF MDM',
    description: 'Enterprise Apple device management. JAMF Pro and JAMF Now implementation.',
    href: '/jamf-mdm',
    price: 'From R 4,500/mo',
    accent: 'text-orange-400',
  },
  {
    icon: Monitor,
    title: 'Managed IT Services',
    description: 'Apple-first MSP for businesses. Full IT ownership, monitoring, and support.',
    href: '/managed-services',
    price: 'From R 4,500/mo',
    accent: 'text-red-400',
  },
];

const differentiators = [
  {
    icon: Cpu,
    title: 'Board-Level Microsoldering',
    description: 'We repair the chips others replace. Our engineers perform component-level repairs under microscope — saving you thousands compared to board replacement.',
  },
  {
    icon: Award,
    title: 'JAMF Enterprise Specialists',
    description: 'South Africa\'s leading JAMF MDM implementation team. We manage Apple devices for medical practices, SMEs, and enterprise clients.',
  },
  {
    icon: Star,
    title: '4.9★ on Google — 120+ Reviews',
    description: 'Our reputation is built on honest diagnostics, transparent pricing, and delivering exactly what we promise. No hidden costs.',
  },
  {
    icon: Zap,
    title: '14 Years of Apple Expertise',
    description: 'Since 2012, ZA Support has been Johannesburg\'s go-to Apple specialists. We\'ve seen — and fixed — every failure mode in every Apple device.',
  },
];

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': 'https://zasupport.com/#website',
  url: 'https://zasupport.com',
  name: 'ZA Support',
  description: "Johannesburg's Apple repair specialists",
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://zasupport.com/blog?q={search_term_string}',
    },
    'query-input': 'required name=search_term_string',
  },
};

export default function HomePage() {
  return (
    <>
      <SchemaOrg schema={websiteSchema} />

      {/* Hero */}
      <section className="hero-gradient grid-overlay min-h-screen flex items-center pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-4xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-[rgba(15,234,122,0.08)] border border-[rgba(15,234,122,0.2)] rounded-full px-4 py-2 mb-8">
              <span className="text-[#0FEA7A]">★★★★★</span>
              <span className="text-[#E8F4F1] text-sm font-medium">
                {SITE.rating} · {SITE.reviewCount} Google Reviews
              </span>
            </div>

            <h1
              className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-[#E8F4F1] leading-[1.05] mb-6"
              style={{ fontFamily: 'Syne, sans-serif' }}
            >
              Johannesburg&apos;s
              <br />
              <span className="text-[#0FEA7A] glow-text-green">Apple Specialists</span>
            </h1>

            <p className="text-xl sm:text-2xl text-[#7A9E98] mb-8 max-w-2xl leading-relaxed">
              MacBook liquid damage, logic board microsoldering, iPhone &amp; iPad repair.
              Hyde Park, Johannesburg. No Fix No Fee.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 mb-10">
              {[
                { value: SITE.repairsCount, label: 'Repairs Completed' },
                { value: SITE.rating + '★', label: 'Google Rating' },
                { value: SITE.yearsExperience + ' Years', label: 'Apple Experience' },
              ].map((stat) => (
                <div key={stat.label}>
                  <span
                    className="block text-3xl sm:text-4xl font-extrabold text-[#0FEA7A]"
                    style={{ fontFamily: 'Syne, sans-serif' }}
                  >
                    {stat.value}
                  </span>
                  <span className="text-[#7A9E98] text-sm">{stat.label}</span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Emergency CTA */}
              <a
                href={`tel:${CONTACT.phoneTel}`}
                className="inline-flex items-center justify-center gap-3 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 hover:shadow-[0_0_32px_rgba(15,234,122,0.5)] transition-all animate-pulse-glow"
              >
                <Phone className="w-5 h-5" />
                Device damaged? Call now: {CONTACT.phone}
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all"
              >
                Book Free Assessment
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            <p className="mt-4 text-[#7A9E98] text-sm">
              Mon–Fri: 08:00–17:30 · Sat: 09:00–13:00 · Hyde Park, Johannesburg
            </p>
          </div>
        </div>
      </section>

      {/* Trust Strip */}
      <section className="bg-[#111C1A] border-y border-[rgba(15,234,122,0.1)] py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
            {[
              { icon: Shield, label: 'No Fix No Fee' },
              { icon: BadgeCheck, label: '12-Month Warranty' },
              { icon: Clock, label: '72-Hour Turnaround' },
              { icon: Search, label: 'Free Assessment' },
              { icon: MapPin, label: 'Hyde Park, JHB' },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 text-[#E8F4F1]">
                <Icon className="w-4 h-4 text-[#0FEA7A] flex-shrink-0" />
                <span className="text-sm font-medium whitespace-nowrap">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2
              className="text-4xl sm:text-5xl font-extrabold text-[#E8F4F1] mb-4"
              style={{ fontFamily: 'Syne, sans-serif' }}
            >
              Every Apple Device.
              <span className="text-[#0FEA7A]"> Every Problem.</span>
            </h2>
            <p className="text-[#7A9E98] text-lg max-w-2xl mx-auto">
              From a cracked iPhone screen to a failed logic board — we&apos;ve repaired it all.
              Transparent pricing, no hidden costs, 12-month warranty.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <div key={service.href} className="glass-card p-6 flex flex-col">
                  <Link href={service.href} className="group flex-1">
                    <div className="w-12 h-12 bg-[rgba(15,234,122,0.08)] rounded-xl flex items-center justify-center mb-5 group-hover:bg-[rgba(15,234,122,0.15)] transition-all">
                      <Icon className={`w-6 h-6 ${service.accent}`} />
                    </div>
                    <h3
                      className="text-[#E8F4F1] text-xl font-bold mb-2"
                      style={{ fontFamily: 'Syne, sans-serif' }}
                    >
                      {service.title}
                    </h3>
                    <p className="text-[#7A9E98] text-sm leading-relaxed mb-4">
                      {service.description}
                    </p>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[#0FEA7A] text-sm font-semibold">{service.price}</span>
                      <span className="text-[#7A9E98] group-hover:text-[#0FEA7A] transition-colors flex items-center gap-1 text-sm">
                        Learn more <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </Link>
                  {'whatsapp' in service && service.whatsapp && (
                    <a
                      href={service.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-auto inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-4 py-2.5 rounded-xl text-sm font-bold hover:bg-[#0FEA7A]/90 transition-all w-full"
                    >
                      💬 WhatsApp for Quote
                    </a>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why ZA Support */}
      <section className="py-24 bg-[#111C1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2
              className="text-4xl sm:text-5xl font-extrabold text-[#E8F4F1] mb-4"
              style={{ fontFamily: 'Syne, sans-serif' }}
            >
              Why Choose ZA Support?
            </h2>
            <p className="text-[#7A9E98] text-lg max-w-2xl mx-auto">
              We&apos;re not a repair shop — we&apos;re your Apple technology partner.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {differentiators.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="flex gap-5 p-6 rounded-2xl bg-[rgba(22,34,32,0.5)] border border-[rgba(15,234,122,0.1)] hover:border-[rgba(15,234,122,0.25)] transition-all">
                  <div className="w-12 h-12 bg-[rgba(15,234,122,0.1)] rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-[#0FEA7A]" />
                  </div>
                  <div>
                    <h3
                      className="text-[#E8F4F1] font-bold text-lg mb-2"
                      style={{ fontFamily: 'Syne, sans-serif' }}
                    >
                      {item.title}
                    </h3>
                    <p className="text-[#7A9E98] text-sm leading-relaxed">{item.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Google Reviews */}
      <section className="py-24 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-1 mb-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="w-6 h-6 fill-[#0FEA7A] text-[#0FEA7A]" />
              ))}
            </div>
            <h2
              className="text-4xl sm:text-5xl font-extrabold text-[#E8F4F1] mb-4"
              style={{ fontFamily: 'Syne, sans-serif' }}
            >
              {SITE.rating} on Google
            </h2>
            <p className="text-[#7A9E98] text-lg">{SITE.reviewCount} verified reviews from Johannesburg clients</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {REVIEWS.map((review) => (
              <div
                key={review.name}
                className="p-6 rounded-2xl bg-[rgba(22,34,32,0.6)] border border-[rgba(15,234,122,0.12)] hover:border-[rgba(15,234,122,0.25)] transition-all"
              >
                <div className="flex items-center gap-1 mb-3">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-4 h-4 fill-[#0FEA7A] text-[#0FEA7A]" />
                  ))}
                  <span className="ml-2 text-xs text-[#7A9E98] font-medium">{review.service}</span>
                </div>
                <p className="text-[#E8F4F1] text-sm leading-relaxed mb-4 italic">
                  &ldquo;{review.text}&rdquo;
                </p>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-[rgba(15,234,122,0.15)] rounded-full flex items-center justify-center text-[#0FEA7A] font-bold text-sm">
                    {review.name[0]}
                  </div>
                  <span className="text-[#E8F4F1] font-semibold text-sm">{review.name}</span>
                  <span className="ml-auto text-xs text-[#7A9E98]">Google Review</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-[rgba(39,80,77,0.3)] border border-[rgba(15,234,122,0.2)] rounded-3xl p-12">
            <h2
              className="text-4xl sm:text-5xl font-extrabold text-[#E8F4F1] mb-4"
              style={{ fontFamily: 'Syne, sans-serif' }}
            >
              Book Your Free Assessment
            </h2>
            <p className="text-[#7A9E98] text-lg mb-8 max-w-2xl mx-auto">
              Bring your device in. We&apos;ll assess it for free, give you a clear quote with no obligation,
              and fix it fast — backed by a 12-month warranty.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`tel:${CONTACT.phoneTel}`}
                className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 hover:shadow-[0_0_32px_rgba(15,234,122,0.4)] transition-all"
              >
                <Phone className="w-5 h-5" />
                Call {CONTACT.phone}
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all"
              >
                Send Enquiry
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
            <p className="mt-6 text-[#7A9E98] text-sm">
              1 Hyde Lane, Hyde Park, Johannesburg · Mon–Fri 08:00–17:30 · Sat 09:00–13:00
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
