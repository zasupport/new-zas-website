import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, ArrowRight, Shield, CheckCircle, Star, Monitor, Headphones, MapPin } from 'lucide-react';
import SchemaOrg from '@/components/seo/SchemaOrg';
import { buildFaqSchema } from '@/lib/schema';
import FAQAccordion from '@/components/ui/FAQ';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { CONTACT } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Mac IT Support Johannesburg — Business & SME | ZA Support',
  description:
    'Mac IT support for Johannesburg businesses and SMEs. On-site and remote support for MacBook, iMac, and Mac mini fleets. Sandton, Rosebank, Midrand, Fourways, Hyde Park. Call 064 529 5863.',
  alternates: { canonical: 'https://zasupport.com/managed-services/it-support' },
};

const faqs = [
  {
    question: 'What is included in Mac IT support for a small business?',
    answer:
      'A Mac IT support contract for a small business typically includes: continuous device monitoring (storage, battery health, failing drives, security posture), macOS and application updates managed and tested before deployment, remote support for user issues with a defined SLA, on-site visits for issues that cannot be resolved remotely, backup monitoring with verified restore tests, and a monthly written report. ZA Support includes all of the above in our Business plan.',
  },
  {
    question: 'Do you provide on-site Mac IT support in Johannesburg?',
    answer:
      'Yes. On-site support is included in Business and Enterprise managed services plans. We cover Sandton, Rosebank, Midrand, Randburg, Fourways, Bryanston, Hyde Park, and surrounding areas. For clients outside greater Johannesburg, remote support is available nationally.',
  },
  {
    question: 'What is the difference between break-fix Mac support and a managed services contract?',
    answer:
      'Break-fix means you contact us when something fails. You pay per incident. Downtime is unpredictable and costs you productivity. A managed services contract means we monitor your Macs continuously, resolve issues before they cause downtime, and handle updates, backups, and security proactively. Most of our managed clients never experience a significant outage because problems are caught at the monitoring stage.',
  },
  {
    question: 'How quickly do you respond to Mac support requests?',
    answer:
      'Our Business plan includes a 4-hour remote response SLA during business hours. For critical issues — device failure, data access loss, security incident — we treat these as emergencies regardless of time. On-site response for Sandton and surrounding areas is typically same day or next morning depending on the time of the request.',
  },
  {
    question: 'Can you support a mixed Mac and Windows environment?',
    answer:
      'Yes. We specialise in Apple but we also manage Windows workstations in mixed environments, network equipment (UniFi, Ubiquiti), and Microsoft 365 as part of our Business and Enterprise plans. If your business runs primarily Mac with some Windows machines, we handle the full environment.',
  },
  {
    question: 'Do you support Mac IT for a single person or a very small team?',
    answer:
      'Yes. Our Starter plan is designed for solo professionals and small teams of up to 5 devices. It includes monitoring, patch management, backup monitoring, and email support. Many of our solo practitioner clients — doctors, architects, accountants — find that monitoring alone prevents the one annual incident that would otherwise cost more than a year of the plan.',
  },
  {
    question: 'What areas of Johannesburg do you cover for on-site Mac IT support?',
    answer:
      'We cover: Sandton, Rosebank, Midrand, Randburg, Fourways, Bryanston, Hyde Park, Parktown, Melrose, Illovo, Morningside, and surrounding northern suburbs. Clients in other areas should contact us to confirm on-site availability. Remote support is available nationally for all managed services clients.',
  },
  {
    question: 'What happens if a Mac needs a hardware repair during a managed services contract?',
    answer:
      'Hardware repair is handled by our in-house workshop at no additional labour cost for Business and Enterprise clients (parts billed separately). We collect the device, repair it at our Hyde Park workshop, and return it. Business clients have a loaner MacBook available during extended repairs. We do not refer you to a third party for repairs.',
  },
  {
    question: 'How is ZA Support different from a general Johannesburg IT company for Mac support?',
    answer:
      'ZA Support has specialised in Apple Mac IT support since 2009. We use Apple-native tools — JAMF MDM, Apple Business Manager — rather than forcing Windows-centric management platforms onto Macs. Our monitoring platform (Health Check) is built specifically for macOS diagnostics. We also repair hardware in-house at component level, which most IT companies cannot do.',
  },
];

const services = [
  {
    icon: Monitor,
    title: 'Remote Mac Support',
    desc: 'Fast remote support for software issues, user problems, configuration, and application support. 4-hour SLA on Business plan.',
  },
  {
    icon: MapPin,
    title: 'On-Site Mac Support',
    desc: 'Scheduled and emergency on-site visits across Sandton, Rosebank, Midrand, Fourways, Randburg, and Hyde Park.',
  },
  {
    icon: Shield,
    title: 'Proactive Monitoring',
    desc: 'Continuous monitoring for storage, battery, SMART drive health, security posture, and backup status. Issues resolved before downtime.',
  },
  {
    icon: Headphones,
    title: 'Managed Updates',
    desc: 'macOS and application updates tested for compatibility, then deployed via MDM. No update breaks your business software.',
  },
  {
    icon: CheckCircle,
    title: 'Backup Management',
    desc: 'Dual-location backup setup, monitoring, and monthly verified restore test. Written confirmation that your backup works.',
  },
  {
    icon: Phone,
    title: 'In-House Hardware Repair',
    desc: 'Logic board, battery, screen, SSD, and liquid damage repair at our Hyde Park workshop. No third-party referrals.',
  },
];

const serviceAreas = [
  { area: 'Sandton', type: 'On-site + remote' },
  { area: 'Rosebank', type: 'On-site + remote' },
  { area: 'Midrand', type: 'On-site + remote' },
  { area: 'Fourways', type: 'On-site + remote' },
  { area: 'Randburg', type: 'On-site + remote' },
  { area: 'Hyde Park', type: 'On-site + remote' },
  { area: 'Bryanston', type: 'On-site + remote' },
  { area: 'Melrose', type: 'On-site + remote' },
  { area: 'Morningside', type: 'On-site + remote' },
  { area: 'Illovo', type: 'On-site + remote' },
  { area: 'Parktown', type: 'On-site + remote' },
  { area: 'National', type: 'Remote only' },
];

const tiers = [
  {
    name: 'Starter',
    ideal: 'Solo professionals and small teams up to 5 devices',
    features: [
      'Continuous device monitoring',
      'Monthly health reports',
      'macOS patch management',
      'Backup monitoring and alerts',
      'Email support (business hours)',
      '24-hour response SLA',
    ],
  },
  {
    name: 'Business',
    ideal: 'SMEs and practices — 5 to 20 devices',
    features: [
      'Everything in Starter',
      'Unlimited remote support',
      'JAMF MDM device management',
      'Monthly on-site visit included',
      'Microsoft 365 management',
      'Priority 4-hour response SLA',
      'Network monitoring',
      'Annual security review',
      'Loaner MacBook for repairs',
    ],
  },
  {
    name: 'Enterprise',
    ideal: 'Multi-site businesses — 20+ devices',
    features: [
      'Everything in Business',
      'Full Mac and Windows fleet management',
      'Dedicated account manager',
      'Custom SLA terms',
      'On-site visits as needed',
      'Executive IT reporting',
    ],
  },
];

const reviews = [
  {
    name: 'N.P.',
    suburb: 'Sandton',
    text: 'We had been using a general IT company for three years and Mac issues always took days to resolve. ZA Support resolved our first issue within two hours remotely and had a tech on-site the next morning for the hardware issue. The difference is noticeable.',
    rating: 5,
  },
  {
    name: 'D.F.',
    suburb: 'Fourways',
    text: 'Our five-person team runs entirely on Mac. ZA Support monitors all five devices, handles updates, and has never let a major issue reach us. We have had zero unplanned downtime in 18 months.',
    rating: 5,
  },
];

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://zasupport.com' },
    { '@type': 'ListItem', position: 2, name: 'Managed Services', item: 'https://zasupport.com/managed-services' },
    { '@type': 'ListItem', position: 3, name: 'Mac IT Support', item: 'https://zasupport.com/managed-services/it-support' },
  ],
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Mac IT Support — Johannesburg Business and SME',
  provider: {
    '@type': 'LocalBusiness',
    name: 'ZA Support',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '1 Hyde Lane',
      addressLocality: 'Hyde Park',
      addressRegion: 'Gauteng',
      postalCode: '2196',
      addressCountry: 'ZA',
    },
    telephone: '+27645295863',
  },
  areaServed: [
    { '@type': 'City', name: 'Johannesburg' },
    { '@type': 'Suburb', name: 'Sandton' },
    { '@type': 'Suburb', name: 'Rosebank' },
    { '@type': 'Suburb', name: 'Midrand' },
    { '@type': 'Suburb', name: 'Fourways' },
    { '@type': 'Suburb', name: 'Randburg' },
  ],
  description: 'Mac IT support for Johannesburg businesses and SMEs. On-site and remote. Break-fix and managed services. Apple-specialist since 2009.',
  serviceType: 'Mac IT Support',
};

const faqSchema = buildFaqSchema(faqs);

export default function ITSupportPage() {
  return (
    <>
      <SchemaOrg schema={faqSchema} />
      <SchemaOrg schema={breadcrumbSchema} />
      <SchemaOrg schema={serviceSchema} />

      {/* Hero */}
      <section className="hero-gradient grid-overlay pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: 'Managed Services', href: '/managed-services' }, { label: 'Mac IT Support' }]} />
          <div className="mt-8 max-w-4xl">
            <div className="inline-flex items-center gap-2 bg-[rgba(15,234,122,0.08)] border border-[rgba(15,234,122,0.2)] rounded-full px-4 py-2 mb-6">
              <MapPin className="w-4 h-4 text-[#0FEA7A]" />
              <span className="text-[#0FEA7A] text-sm font-semibold">On-Site + Remote · Sandton · Rosebank · Midrand · Fourways · Hyde Park</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-[#E8F4F1] leading-tight mb-4">
              Mac IT Support —<br /><span className="text-[#0FEA7A]">Johannesburg Business &amp; SME</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-6 max-w-3xl leading-relaxed">
              On-site and remote Mac IT support for Johannesburg businesses. Break-fix callouts and fully managed services. Apple-specialist since 2009 — we do not treat Mac as an afterthought.
            </p>

            <div className="flex flex-wrap gap-3 mb-8">
              {[
                'On-site Johannesburg',
                'Remote nationally',
                '4-hour response SLA',
                'Proactive monitoring',
                'In-house hardware repair',
                'No lock-in contracts',
              ].map((item) => (
                <div key={item} className="flex items-center gap-2 bg-[rgba(15,234,122,0.08)] border border-[rgba(15,234,122,0.15)] px-3 py-1.5 rounded-full">
                  <CheckCircle className="w-3.5 h-3.5 text-[#0FEA7A]" />
                  <span className="text-[#E8F4F1] text-xs font-medium">{item}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={`tel:${CONTACT.phoneTel}`}
                className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 transition-all"
              >
                <Phone className="w-5 h-5" /> Call {CONTACT.phone}
              </a>
              <a
                href={CONTACT.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all"
              >
                WhatsApp Us
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.2)] text-[#7A9E98] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[rgba(15,234,122,0.05)] transition-all"
              >
                Get a Quote <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* What we cover */}
      <section className="py-12 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3">What Mac IT Support Covers</h2>
          <p className="text-[#7A9E98] mb-10 max-w-2xl">
            From a single MacBook to a 50-device fleet — on-site, remote, and everything in between.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="glass-card p-6">
                <div className="w-12 h-12 bg-[rgba(15,234,122,0.1)] rounded-xl flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-[#0FEA7A]" />
                </div>
                <h3 className="text-[#E8F4F1] font-bold mb-2">{title}</h3>
                <p className="text-[#7A9E98] text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Break-fix vs managed */}
      <section className="py-12 sm:py-20 bg-[#111C1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-6">
                Break-Fix vs Managed — What Is the Right Choice?
              </h2>
              <p className="text-[#7A9E98] text-sm leading-relaxed mb-5">
                Break-fix IT is the right choice if your business has a low volume of devices, issues are genuinely infrequent, and you can absorb the cost and productivity impact of an unplanned incident.
              </p>
              <p className="text-[#7A9E98] text-sm leading-relaxed mb-5">
                Managed services is the right choice if you have more than three devices, rely on Macs for daily revenue-generating work, have data that cannot be lost, or have experienced a costly incident in the past two years.
              </p>
              <p className="text-[#7A9E98] text-sm leading-relaxed mb-6">
                For most Johannesburg SMEs running on Mac, managed services costs less per year than one to two break-fix callouts, and prevents the larger incidents entirely.
              </p>
              <div className="glass-card p-5">
                <p className="text-[#E8F4F1] font-semibold text-sm mb-3">What proactive monitoring catches before it becomes a problem:</p>
                <ul className="space-y-2">
                  {[
                    'SSD SMART failure warning — replaced before data loss',
                    'Battery health below 80% — before a dead machine mid-day',
                    'Backup not running — before you need it and it is not there',
                    'macOS security vulnerability — patched before exploitation',
                    'Storage above 90% full — before performance collapses',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-[#7A9E98] text-sm">
                      <Shield className="w-4 h-4 text-[#0FEA7A] flex-shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-extrabold text-[#E8F4F1] mb-6">Managed Services Plans</h3>
              <div className="space-y-4">
                {tiers.map((tier, i) => (
                  <div key={tier.name} className={`glass-card p-6 ${i === 1 ? 'border-[rgba(15,234,122,0.4)]' : ''}`}>
                    {i === 1 && <div className="text-[#0FEA7A] text-xs font-bold mb-2 tracking-widest uppercase">Most Popular</div>}
                    <h4 className="text-[#E8F4F1] font-bold mb-1">{tier.name}</h4>
                    <p className="text-[#7A9E98] text-xs mb-4">{tier.ideal}</p>
                    <ul className="space-y-1.5">
                      {tier.features.map((f) => (
                        <li key={f} className="flex items-start gap-2 text-[#7A9E98] text-sm">
                          <span className="text-[#0FEA7A] mt-0.5">✓</span> {f}
                        </li>
                      ))}
                    </ul>
                    <Link
                      href="/contact"
                      className="mt-5 block text-center border border-[rgba(15,234,122,0.3)] text-[#0FEA7A] px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all"
                    >
                      Get a Quote
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Area */}
      <section className="py-12 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3">
            Mac IT Support — Johannesburg Service Areas
          </h2>
          <p className="text-[#7A9E98] mb-8 max-w-2xl">
            On-site Mac IT support across the greater Johannesburg area. Remote support available nationally.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {serviceAreas.map((s) => (
              <div key={s.area} className="glass-card p-4">
                <div className="flex items-center gap-2 mb-1">
                  <MapPin className="w-3.5 h-3.5 text-[#0FEA7A] flex-shrink-0" />
                  <p className="text-[#E8F4F1] font-semibold text-sm">{s.area}</p>
                </div>
                <p className="text-[#7A9E98] text-xs pl-5">{s.type}</p>
              </div>
            ))}
          </div>
          <p className="text-[#7A9E98] text-sm mt-6">
            Clients outside listed areas — <Link href="/contact" className="text-[#0FEA7A] hover:underline">contact us</Link> to confirm on-site availability. Remote support is available nationally for all managed services clients.
          </p>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-12 sm:py-20 bg-[#111C1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-8">
            What Johannesburg SMEs Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reviews.map((r) => (
              <div key={r.name} className="glass-card p-6">
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: r.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#0FEA7A] text-[#0FEA7A]" />
                  ))}
                </div>
                <p className="text-[#7A9E98] text-sm leading-relaxed mb-4">&ldquo;{r.text}&rdquo;</p>
                <p className="text-[#E8F4F1] font-semibold text-sm">{r.name}</p>
                <p className="text-[#7A9E98] text-xs">{r.suburb}, Johannesburg</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQAccordion items={faqs} title="Mac IT Support Johannesburg, FAQs" />
        </div>
      </section>

      {/* Related Services */}
      <section className="py-12 bg-[#071210]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold text-[#E8F4F1] mb-6">Related Services</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              { label: 'Managed IT Services', href: '/managed-services' },
              { label: 'Apple IT Specialist', href: '/managed-services/apple-specialist' },
              { label: 'JAMF MDM Johannesburg', href: '/jamf-mdm' },
              { label: 'Medical Practice IT', href: '/apple-support/medical-practices' },
              { label: 'Logic Board Repair', href: '/logic-board-repair' },
              { label: 'Assessment: from R599', href: '/no-fix-no-fee' },
            ].map((link) => (
              <Link key={link.href} href={link.href} className="block p-3 rounded-lg bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] text-[#7A9E98] hover:text-[#0FEA7A] hover:border-[#0FEA7A] text-sm transition-colors">
                {link.label} →
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-[rgba(39,80,77,0.3)] border border-[rgba(15,234,122,0.2)] rounded-3xl p-10">
            <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3">
              Mac IT Support for Your Johannesburg Business
            </h2>
            <p className="text-[#7A9E98] mb-2">
              Initial consultation included. Month-to-month plans. No lock-in contracts.
            </p>
            <p className="text-[#7A9E98] text-sm mb-8">
              Sandton, Rosebank, Midrand, Fourways, Randburg, Hyde Park — and remote nationally.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`tel:${CONTACT.phoneTel}`}
                className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 transition-all"
              >
                <Phone className="w-5 h-5" /> Call {CONTACT.phone}
              </a>
              <a
                href={CONTACT.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all"
              >
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
