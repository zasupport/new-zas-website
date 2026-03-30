import type { Metadata } from 'next';
import Link from 'next/link';
import { Suspense } from 'react';
import {
  Phone, Shield, Clock, Search, MapPin, BadgeCheck,
  Droplets, Cpu, Smartphone, Tablet, Monitor, Wifi,
  Star, ArrowRight, Zap, Award
} from 'lucide-react';
import SchemaOrg from '@/components/seo/SchemaOrg';
import { buildFaqSchema } from '@/lib/schema';
import { CONTACT, SITE, buildWhatsAppUrl } from '@/lib/constants';
import GoogleReviews from '@/components/ui/GoogleReviews';

export const metadata: Metadata = {
  title: 'Mac Repair Johannesburg, Logic Board Specialists',
  description:
    "Johannesburg's Apple repair specialists. MacBook liquid damage, logic board component-level repair, iPhone & iPad repair. 4.9★ 632+ reviews. Hyde Park. up-to-3 year warranty. Call 064 529 5863.",
  alternates: { canonical: 'https://zasupport.com' },
};

const services = [
  {
    icon: Cpu,
    title: 'Logic Board Repair',
    description: 'Expert component-level repair for no-power, no-display, USB-C failure, and GPU faults.',
    href: '/logic-board-repair',
    accent: 'text-purple-400',
    whatsapp: buildWhatsAppUrl('HOME-LBR', 'logic-board'),
  },
  {
    icon: Droplets,
    title: 'Liquid Damage Repair',
    description: 'MacBook, iPhone, iPad, Apple Watch. Board-level ultrasonic cleaning and component repair.',
    href: '/liquid-damage',
    accent: 'text-blue-400',
    whatsapp: buildWhatsAppUrl('HOME-LIQ', 'liquid-damage'),
  },
  {
    icon: Smartphone,
    title: 'iPhone Repair',
    description: 'Screen, battery, charging port, liquid damage, back glass. All models including iPhone 16.',
    href: '/iphone-repair',
    accent: 'text-[#0FEA7A]',
    whatsapp: buildWhatsAppUrl('HOME-IPH', 'iphone-repair'),
  },
  {
    icon: Tablet,
    title: 'iPad Repair',
    description: 'Screen replacement, battery, charging, and liquid damage. All iPad generations.',
    href: '/ipad-repair',
    accent: 'text-yellow-400',
    whatsapp: buildWhatsAppUrl('HOME-IPD', 'ipad-repair'),
  },
  {
    icon: Wifi,
    title: 'JAMF MDM',
    description: 'Enterprise Apple device management. JAMF Pro and JAMF Now implementation.',
    href: '/jamf-mdm',
    accent: 'text-orange-400',
    whatsapp: buildWhatsAppUrl('HOME-JAMF', 'jamf-mdm'),
  },
  {
    icon: Monitor,
    title: 'Managed IT Services',
    description: 'Apple-first MSP for businesses. Full IT ownership, monitoring, and support.',
    href: '/managed-services',
    accent: 'text-red-400',
    whatsapp: buildWhatsAppUrl('HOME-MSP', 'managed-services'),
  },
];

const differentiators = [
  {
    icon: Cpu,
    title: 'Board-Level Component-level repair',
    description: 'We repair the chips others replace. Our engineers perform component-level repairs under microscope, saving you thousands compared to board replacement.',
  },
  {
    icon: Award,
    title: 'Apple MDM Specialists',
    description: 'We implement and manage Apple device fleets for medical practices, SMEs, and enterprise clients across Johannesburg and Gauteng.',
  },
  {
    icon: Star,
    title: '4.9★ on Google, 120+ Reviews',
    description: 'Our reputation is built on honest diagnostics, transparent pricing, and delivering exactly what we promise. No hidden costs.',
  },
  {
    icon: Zap,
    title: '16 Years of Apple Expertise',
    description: 'Since 2009, ZA Support has been Johannesburg\'s go-to Apple specialists. We\'ve seen and fixed every failure mode in every Apple device.',
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


const speakableSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': 'https://zasupport.com/#webpage',
  name: 'Mac Repair Johannesburg, Logic Board Specialists | ZA Support',
  url: 'https://zasupport.com',
  speakable: {
    '@type': 'SpeakableSpecification',
    cssSelector: ['h1', '.speakable-summary'],
  },
};

const homepageFaqs = [
  {
    question: 'Where is ZA Support located in Johannesburg?',
    answer:
      'ZA Support is located at 1 Hyde Lane, Second Floor, Office E2004, Hyde Park, Johannesburg, 2196. We are open Monday to Friday 8am–6pm and Closed Saturdays. Hyde Park is conveniently accessible from Sandton, Rosebank, Illovo, Bryanston, and Fourways.',
  },
  {
    question: 'What Apple devices do you repair?',
    answer:
      'We repair MacBook Air, MacBook Pro, iMac, Mac Mini, Mac Pro, iPhone (all models including iPhone 16), and iPad. We also perform JAMF MDM implementations and managed IT services for businesses. All Apple Silicon (M1/M2/M3/M4) and Intel models are supported.',
  },
  {
    question: 'What is your assessment fee?',
    answer:
      'ZA Support charges an assessment fee of from R599. This covers a full diagnostic inspection of your device. If you choose to proceed with the repair, the assessment fee is included in the total. If you choose not to proceed, the assessment fee applies. All repairs carry a up-to-3 year warranty on parts and labour.',
  },
  {
    question: 'How much does Mac repair cost in Johannesburg?',
    answer:
      'Mac repair cost depends on the device and fault. An assessment fee of from R599 applies, we diagnose and provide a fixed quote before starting any work. Extended warranty is available on request.',
  },
  {
    question: 'Do you repair MacBook liquid damage?',
    answer:
      'Yes. MacBook liquid damage is one of our primary specialisations. We perform ultrasonic board cleaning, component-level diagnosis, and component-level repair on liquid-damaged MacBook Air and MacBook Pro models. The sooner you bring in a liquid-damaged MacBook, the better the outcome. Do not try to turn it on, bring it to us immediately.',
  },
  {
    question: 'How long does Mac repair take?',
    answer:
      'Battery replacements, SSD upgrades, and RAM upgrades are often same-day. Screen replacements typically take 1–3 days. Logic board and liquid damage repairs take 3–7 business days depending on the fault and parts availability. We give you an estimated completion time when your device is booked in.',
  },
  {
    question: 'Do you repair Apple Silicon (M1, M2, M3, M4) MacBooks?',
    answer:
      'Yes. We repair Apple Silicon MacBook Air and MacBook Pro models including M1, M2, M3, and M4. Battery replacement, screen replacement, port repair, and logic board repair are all available. Note that RAM and SSD are soldered on Apple Silicon models and cannot be upgraded, but all other repairs are possible.',
  },
  {
    question: 'Is ZA Support an Apple Authorised Service Provider?',
    answer:
      'ZA Support is an independent Apple specialist, not an Apple Authorised Service Provider (AASP). This means we charge significantly less than Apple, and we can repair devices that Apple would refuse to fix (out of up-to-3 year warranty, out of production, or with third-party modifications). All repairs carry a up-to-3 year warranty on parts and labour. Extended warranty is available on request.',
  },
];

export default function HomePage() {
  const faqSchema = buildFaqSchema(homepageFaqs);

  return (
    <>
      <SchemaOrg schema={websiteSchema} />
      <SchemaOrg schema={faqSchema} />
      <SchemaOrg schema={speakableSchema} />

      {/* Hero */}
      <section className="hero-gradient grid-overlay pt-24 pb-12 sm:pt-32 sm:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-[rgba(15,234,122,0.08)] border border-[rgba(15,234,122,0.2)] rounded-full px-4 py-2 mb-8">
              <span className="text-[#0FEA7A]">★★★★★</span>
              <span className="text-[#E8F4F1] text-sm font-medium">
                {SITE.rating} · {SITE.reviewCount} Google Reviews
              </span>
            </div>

            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#E8F4F1] leading-[1.05] mb-6"
             
            >
              Johannesburg&apos;s
              <br />
              <span className="text-[#0FEA7A] glow-text-green">Apple Specialists</span>
            </h1>

            <p className="speakable-summary text-base sm:text-lg text-[#7A9E98] mb-8 max-w-2xl leading-relaxed">
              MacBook liquid damage, logic board component-level repair, screen, battery, iPhone. Hyde Park, Johannesburg. Assessment: from R599. up-to-3 year warranty.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 sm:flex sm:gap-8 mb-8">
              {[
                { value: SITE.repairsCount, label: 'Repairs Completed' },
                { value: SITE.rating + '★', label: 'Google Rating' },
                { value: SITE.yearsExperience + ' Years', label: 'Apple Experience' },
              ].map((stat) => (
                <div key={stat.label}>
                  <span
                    className="block text-3xl sm:text-4xl font-extrabold text-[#0FEA7A]"
                   
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
                data-ref="HOME-HERO"
                className="inline-flex items-center justify-center gap-3 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 hover:shadow-[0_0_32px_rgba(15,234,122,0.5)] transition-all animate-pulse-glow"
               target="_blank" rel="noopener noreferrer">
                <Phone className="w-5 h-5" />
                Call {CONTACT.phone}
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all"
              >
                Book Assessment: from R599
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            <p className="mt-4 text-[#7A9E98] text-sm">
              Mon–Fri: 08:00–17:30 · Closed Sat & Sun · Hyde Park, Johannesburg
            </p>
          </div>
        </div>
      </section>

      {/* Trust Strip */}
      <section className="bg-[#111C1A] border-y border-[rgba(15,234,122,0.1)] py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-6 sm:gap-10 overflow-x-auto pb-1 sm:flex-wrap sm:justify-center">
            {[
              { icon: Shield, label: 'Up-to-3 Year Warranty' },
              { icon: BadgeCheck, label: '16 Years Experience' },
              { icon: Clock, label: 'Fastest Turnaround Times' },
              { icon: Search, label: 'Assessment: from R599' },
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

      {/* Awards / Trust Signals */}
      <section className="py-8 bg-[#0A1A18] border-b border-[rgba(15,234,122,0.06)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-[#7A9E98] text-xs uppercase tracking-widest mb-6">Recognised by</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { name: 'Forbes 30-under-30', detail: 'Technology Innovator' },
              { name: 'Absa Technology', detail: 'Innovator Runner-up' },
              { name: 'Verizon', detail: 'Digital Innovation Winner' },
              { name: 'Santam', detail: 'InsurTech of the Year Runner-up' },
            ].map((award) => (
              <div key={award.name} className="flex flex-col items-center text-center p-4 rounded-xl bg-[rgba(22,34,32,0.4)] border border-[rgba(15,234,122,0.08)]">
                <Award className="w-6 h-6 text-[#0FEA7A] mb-2" />
                <span className="text-[#E8F4F1] text-sm font-semibold">{award.name}</span>
                <span className="text-[#7A9E98] text-xs">{award.detail}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Google Reviews — near top for social proof */}
      <section className="py-12 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-3">
              {SITE.rating} on Google
            </h2>
            <p className="text-[#7A9E98] text-lg">Over {SITE.reviewCount} verified reviews from Johannesburg clients · 16 years of Apple expertise</p>
          </div>
          <Suspense fallback={
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="p-6 rounded-2xl bg-[rgba(22,34,32,0.6)] border border-[rgba(15,234,122,0.12)] animate-pulse">
                  <div className="flex gap-1 mb-3">
                    {[1,2,3,4,5].map((s) => <div key={s} className="w-4 h-4 bg-[rgba(15,234,122,0.15)] rounded" />)}
                  </div>
                  <div className="h-4 bg-[rgba(15,234,122,0.08)] rounded w-full mb-2" />
                  <div className="h-4 bg-[rgba(15,234,122,0.08)] rounded w-3/4 mb-2" />
                  <div className="h-4 bg-[rgba(15,234,122,0.08)] rounded w-1/2 mb-4" />
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-[rgba(15,234,122,0.15)] rounded-full" />
                    <div className="h-3 bg-[rgba(15,234,122,0.08)] rounded w-24" />
                  </div>
                </div>
              ))}
            </div>
          }>
            <GoogleReviews maxReviews={4} />
          </Suspense>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2
              className="text-4xl sm:text-5xl font-extrabold text-[#E8F4F1] mb-4"
             
            >
              Every Apple Device.
              <span className="text-[#0FEA7A]"> Every Fault.</span>
            </h2>
            <p className="text-[#7A9E98] text-lg max-w-2xl mx-auto">
              Every Apple device. Every fault.
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
                     
                    >
                      {service.title}
                    </h3>
                    <p className="text-[#7A9E98] text-sm leading-relaxed mb-4">
                      {service.description}
                    </p>
                    <div className="flex items-center justify-end mb-4">
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
             
            >
              Why ZA Support
            </h2>
            <p className="text-[#7A9E98] text-lg max-w-2xl mx-auto">
              We fix the chip. Not the whole board.
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


      {/* CTA Section */}
      <section className="py-24 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-[rgba(39,80,77,0.3)] border border-[rgba(15,234,122,0.2)] rounded-3xl p-12">
            <h2
              className="text-4xl sm:text-5xl font-extrabold text-[#E8F4F1] mb-4"
             
            >
              Book Your Assessment
            </h2>
            <p className="text-[#7A9E98] text-lg mb-8 max-w-2xl mx-auto">
              Bring your device in. We&apos;ll assess it (from R599), give you a clear quote,
              and fix it fast, backed by a up-to-3 year warranty. Extended warranty available on request.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`tel:${CONTACT.phoneTel}`}
                data-ref="HOME-CTA"
                className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 hover:shadow-[0_0_32px_rgba(15,234,122,0.4)] transition-all"
               target="_blank" rel="noopener noreferrer">
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
              1 Hyde Lane, Hyde Park, Johannesburg · Mon–Fri 08:00–17:30 · Closed Sat & Sun
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
