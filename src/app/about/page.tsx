import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, Award, Star, Shield, Cpu, ArrowRight, MapPin, Clock, CheckCircle } from 'lucide-react';
import SchemaOrg from '@/components/seo/SchemaOrg';
import { CONTACT, SITE } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'About ZA Support | Apple Repair Specialist Johannesburg | Hyde Park',
  description:
    "ZA Support, certified Mac technician Johannesburg since 2009. Apple repair specialist Hyde Park, serving Sandton, Rosebank, Fourways, Bryanston, Midrand. 3,000+ repairs, 4.9★. JAMF-certified. up-to-3 year warranty.",
  alternates: { canonical: 'https://zasupport.com/about' },
  keywords: [
    'apple repair specialist johannesburg',
    'certified mac technician johannesburg',
    'mac repair hyde park johannesburg',
    'apple repair sandton',
    'macbook repair rosebank',
    'apple certified technician johannesburg',
    'mac repair specialist gauteng',
    'jamf certified johannesburg',
  ],
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': 'https://zasupport.com/#organization',
  name: 'ZA Support',
  alternateName: 'Apple Experts',
  legalName: 'Vizibiliti Intelligent Solutions (Pty) Ltd',
  description: 'Johannesburg Apple repair specialists and certified Mac technicians since 2009. Logic board component-level repair, JAMF MDM, and managed IT for medical practices and businesses across Gauteng.',
  url: 'https://zasupport.com',
  logo: 'https://zasupport.com/logo.png',
  image: 'https://zasupport.com/logo.png',
  telephone: CONTACT.phoneTel,
  email: CONTACT.email,
  foundingDate: '2009',
  vatID: SITE.vat,
  address: {
    '@type': 'PostalAddress',
    streetAddress: '1 Hyde Park Lane',
    addressLocality: 'Hyde Park',
    addressRegion: 'Gauteng',
    postalCode: '2196',
    addressCountry: 'ZA',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: -26.1244,
    longitude: 28.0395,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '08:00',
      closes: '17:30',
    },
  ],
  areaServed: [
    { '@type': 'City', name: 'Johannesburg' },
    { '@type': 'Place', name: 'Hyde Park' },
    { '@type': 'Place', name: 'Sandton' },
    { '@type': 'Place', name: 'Rosebank' },
    { '@type': 'Place', name: 'Fourways' },
    { '@type': 'Place', name: 'Bryanston' },
    { '@type': 'Place', name: 'Midrand' },
    { '@type': 'Place', name: 'Randburg' },
    { '@type': 'Place', name: 'Parkhurst' },
    { '@type': 'Place', name: 'Illovo' },
    { '@type': 'AdministrativeArea', name: 'Gauteng' },
  ],
  serviceType: [
    'Apple Mac Repair',
    'MacBook Logic Board Repair',
    'MacBook Screen Replacement',
    'MacBook Battery Replacement',
    'JAMF MDM Implementation',
    'Apple Device Management',
    'Managed IT Services',
    'Liquid Damage Repair',
    'iPhone Repair',
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Apple Repair Services',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'MacBook Logic Board Repair', description: 'Component-level repair' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'MacBook Battery Replacement', description: 'Battery replacement' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'MacBook Screen Replacement', description: 'Retina display replacement' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Liquid Damage Repair', description: 'Ultrasonic cleaning and component-level repair' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'JAMF MDM Setup', description: 'Apple fleet management for businesses' } },
    ],
  },
  priceRange: '$$',
  currenciesAccepted: 'ZAR',
  paymentAccepted: 'Cash, Credit Card, EFT',
  sameAs: [
    'https://facebook.com/appleexpertsouthafrica',
    'https://instagram.com/appleexpertza',
    'https://twitter.com/za_support',
  ],
};

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Courtney Bentley',
  jobTitle: 'Founder & Apple Certified Technician',
  worksFor: {
    '@type': 'Organization',
    name: 'ZA Support',
    url: 'https://zasupport.com',
  },
  description: 'Founder of ZA Support with 16 years of Apple repair expertise. JAMF-certified technician specialising in MacBook logic board component-level repair, Apple fleet management, and managed IT for medical practices across Johannesburg.',
  knowsAbout: [
    'Apple Mac Repair',
    'MacBook Logic Board Component-level repair',
    'JAMF MDM',
    'Apple Device Management',
    'Managed IT Services',
    'macOS',
    'iOS',
  ],
  hasCredential: [
    {
      '@type': 'EducationalOccupationalCredential',
      name: 'JAMF Certified Technician',
      credentialCategory: 'Certification',
    },
  ],
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Hyde Park',
    addressRegion: 'Gauteng',
    addressCountry: 'ZA',
  },
  telephone: CONTACT.phoneTel,
  email: CONTACT.email,
  url: 'https://zasupport.com/about',
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': 'https://zasupport.com/#organization',
  name: 'ZA Support',
  legalName: 'Vizibiliti Intelligent Solutions (Pty) Ltd',
  url: 'https://zasupport.com',
  logo: 'https://zasupport.com/logo.png',
  foundingDate: '2009',
  founder: {
    '@type': 'Person',
    name: 'Courtney Bentley',
    jobTitle: 'Founder & Apple Certified Technician',
  },
  address: {
    '@type': 'PostalAddress',
    streetAddress: '1 Hyde Park Lane',
    addressLocality: 'Hyde Park',
    addressRegion: 'Gauteng',
    postalCode: '2196',
    addressCountry: 'ZA',
  },
  telephone: CONTACT.phoneTel,
  email: CONTACT.email,
  vatID: SITE.vat,
  sameAs: [
    'https://facebook.com/appleexpertsouthafrica',
    'https://instagram.com/appleexpertza',
    'https://twitter.com/za_support',
  ],
};

const aboutPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  name: 'About ZA Support, Apple Repair Specialists Johannesburg',
  url: 'https://zasupport.com/about',
  description: 'Learn about ZA Support, Johannesburg certified Mac technicians and Apple repair specialists based in Hyde Park, serving Sandton, Rosebank, Fourways and all of Gauteng since 2009.',
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://zasupport.com' },
      { '@type': 'ListItem', position: 2, name: 'About', item: 'https://zasupport.com/about' },
    ],
  },
};

const SERVICE_AREAS = [
  'Hyde Park', 'Sandton', 'Rosebank', 'Fourways', 'Bryanston',
  'Midrand', 'Randburg', 'Parkhurst', 'Illovo', 'Melrose',
  'Houghton', 'Northcliff', 'Rivonia', 'Morningside',
];

export default function AboutPage() {
  return (
    <>
      <SchemaOrg schema={localBusinessSchema} />
      <SchemaOrg schema={personSchema} />
      <SchemaOrg schema={organizationSchema} />
      <SchemaOrg schema={aboutPageSchema} />

      <section className="hero-gradient grid-overlay pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <p className="text-[#0FEA7A] text-sm font-semibold uppercase tracking-widest mb-3">
              Apple Repair Specialist · Hyde Park, Johannesburg
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#E8F4F1] leading-tight mb-6">
              About ZA Support
              <br /><span className="text-[#0FEA7A]">Practice IT. Perfected.</span>
            </h1>
            <p className="text-xl text-[#7A9E98] leading-relaxed max-w-3xl">
              Since 2009, ZA Support has been Johannesburg&apos;s trusted Apple repair specialist and
              certified Mac technician, serving Hyde Park, Sandton, Rosebank and all of Gauteng.
              Honest diagnostics, transparent pricing, and repairs that last.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {[
              { value: SITE.repairsCount, label: 'Repairs Completed' },
              { value: SITE.rating + '★', label: 'Google Rating' },
              { value: SITE.yearsExperience + ' Years', label: 'Apple Expertise' },
              { value: SITE.reviewCount, label: 'Verified Reviews' },
            ].map((stat) => (
              <div key={stat.label} className="glass-card p-6 text-center">
                <span className="block text-4xl font-extrabold text-[#0FEA7A] mb-1">{stat.value}</span>
                <span className="text-[#7A9E98] text-sm">{stat.label}</span>
              </div>
            ))}
          </div>

          {/* Founder / Person section */}
          <div className="glass-card p-8 mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div>
                <p className="text-[#0FEA7A] text-xs font-semibold uppercase tracking-widest mb-2">Founded by</p>
                <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3">
                  Courtney Bentley
                </h2>
                <p className="text-[#7A9E98] text-sm mb-1">Founder &amp; Apple Certified Technician · 16 Years Experience</p>
                <p className="text-[#7A9E98] text-sm mb-4">JAMF-Certified · Hyde Park, Johannesburg</p>
                <p className="text-[#7A9E98] leading-relaxed mb-4">
                  Courtney founded ZA Support in 2009 with a clear purpose: bring genuinely expert Apple repair
                  to Johannesburg. With 16 years of hands-on Mac experience, JAMF certification, and component-level
                  component-level repair training, Courtney leads every complex repair and manages Apple device deployments
                  for medical practices and businesses across Gauteng.
                </p>
                <div className="flex flex-wrap gap-2">
                  {['JAMF Certified', 'Logic Board Repair', 'Apple MDM', 'macOS', 'Medical IT'].map((badge) => (
                    <span key={badge} className="px-3 py-1 bg-[rgba(15,234,122,0.1)] border border-[rgba(15,234,122,0.2)] text-[#0FEA7A] text-xs rounded-full font-medium">
                      {badge}
                    </span>
                  ))}
                </div>
              </div>
              <div className="space-y-3">
                {[
                  { icon: Award, text: 'JAMF Certified, Apple fleet management for businesses and medical practices' },
                  { icon: Cpu, text: 'Component-level MacBook logic board repair since 2009' },
                  { icon: Star, text: '4.9★ Google rating across 632+ verified client reviews' },
                  { icon: Shield, text: 'Assessment: from R599, transparent pricing, up-to-3 year warranty on all repairs' },
                  { icon: CheckCircle, text: '3,000+ Apple devices repaired across Johannesburg and Gauteng' },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex gap-3 items-start">
                    <div className="w-8 h-8 bg-[rgba(15,234,122,0.1)] rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon className="w-4 h-4 text-[#0FEA7A]" />
                    </div>
                    <p className="text-[#7A9E98] text-sm leading-relaxed">{text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Story + Differentiators */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
            <div>
              <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-6">Our Story</h2>
              <div className="space-y-4 text-[#7A9E98] leading-relaxed">
                <p>
                  Founded in 2009 in Hyde Park, we chose board-level component-level repair when other shops were replacing whole boards. Clients keep their original hardware, pay significantly less, and get a up-to-3 year warranty on every repair.
                </p>
                <p>
                  Today we serve medical practices, businesses, and professionals across Johannesburg — combining Apple repair, JAMF MDM, and managed IT from our Hyde Park workshop at 1 Hyde Park Lane.
                </p>
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-6">What Makes Us Different</h2>
              <div className="space-y-4">
                {[
                  { icon: Cpu, title: 'Microscope-Level Component-level repair', desc: 'We repair components others replace. Our board-level repair capability saves clients thousands over full board replacements.' },
                  { icon: Award, title: 'JAMF-Certified Specialists', desc: 'One of Johannesburg\'s few JAMF-certified implementation teams. We manage Apple fleets for organisations across Gauteng.' },
                  { icon: Star, title: '4.9★ on Google, 632+ Reviews', desc: 'Our rating is built on consistent delivery. Read our reviews, the themes are honesty, transparency, and results.' },
                  { icon: Shield, title: 'Transparent Pricing, Always', desc: 'Assessment fee of from R599 applies. Written quote before any work begins. up-to-3 year warranty on all repairs. No surprises.' },
                ].map(({ icon: Icon, title, desc }) => (
                  <div key={title} className="flex gap-4 p-4 bg-[rgba(22,34,32,0.5)] rounded-xl border border-[rgba(15,234,122,0.08)]">
                    <div className="w-10 h-10 bg-[rgba(15,234,122,0.1)] rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-[#0FEA7A]" />
                    </div>
                    <div>
                      <p className="text-[#E8F4F1] font-semibold text-sm mb-1">{title}</p>
                      <p className="text-[#7A9E98] text-sm">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Service Area */}
          <div className="glass-card p-8 mb-10">
            <div className="flex items-center gap-3 mb-6">
              <MapPin className="w-6 h-6 text-[#0FEA7A]" />
              <h2 className="text-2xl font-bold text-[#E8F4F1]">Service Area, Greater Johannesburg</h2>
            </div>
            <p className="text-[#7A9E98] mb-5 leading-relaxed">
              Based at 1 Hyde Park Lane, Hyde Park, Johannesburg 2196, we collect and deliver across Sandton,
              Rosebank, Fourways, Bryanston, Midrand and all major Johannesburg suburbs. On-site visits available
              for managed IT and medical practice clients.
            </p>
            <div className="flex flex-wrap gap-2">
              {SERVICE_AREAS.map((area) => (
                <span key={area} className="px-3 py-1.5 bg-[rgba(39,80,77,0.4)] border border-[rgba(15,234,122,0.12)] text-[#7A9E98] text-sm rounded-lg">
                  {area}
                </span>
              ))}
            </div>
          </div>

          {/* Hours + Company Details */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="glass-card p-8">
              <div className="flex items-center gap-3 mb-6">
                <Clock className="w-6 h-6 text-[#0FEA7A]" />
                <h2 className="text-xl font-bold text-[#E8F4F1]">Trading Hours</h2>
              </div>
              <div className="space-y-2 text-[#7A9E98]">
                <p>{CONTACT.hours.weekdays}</p>
                <p>{CONTACT.hours.saturday}</p>
                <p>{CONTACT.hours.sunday}</p>
              </div>
            </div>
            <div className="glass-card p-8">
              <h2 className="text-xl font-bold text-[#E8F4F1] mb-6">Company Information</h2>
              <div className="space-y-3">
                {[
                  { label: 'Trading Name', value: 'ZA Support' },
                  { label: 'Legal Entity', value: 'Vizibiliti Intelligent Solutions (Pty) Ltd' },
                  { label: 'Founded', value: '2009' },
                  { label: 'VAT Number', value: SITE.vat },
                  { label: 'Address', value: '1 Hyde Park Lane, Hyde Park, Johannesburg 2196' },
                  { label: 'Service Area', value: 'Greater Johannesburg / Gauteng' },
                ].map((item) => (
                  <div key={item.label} className="flex gap-2">
                    <p className="text-[#7A9E98] text-xs uppercase tracking-wider w-32 flex-shrink-0 pt-0.5">{item.label}</p>
                    <p className="text-[#E8F4F1] font-medium text-sm">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-[rgba(39,80,77,0.3)] border border-[rgba(15,234,122,0.2)] rounded-3xl p-10">
            <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3">Work With Us</h2>
            <p className="text-[#7A9E98] mb-6">Assessment: from R599. Hyde Park, Johannesburg, serving Sandton, Rosebank &amp; Gauteng.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={`tel:${CONTACT.phoneTel}`} className="inline-flex items-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl font-bold hover:bg-[#0FEA7A]/90 transition-all">
                <Phone className="w-5 h-5" /> Call {CONTACT.phone}
              </a>
              <Link href="/contact" className="inline-flex items-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all">
                Send Enquiry <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
