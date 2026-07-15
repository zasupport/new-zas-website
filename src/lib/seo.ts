import type { Metadata } from 'next';
import { SITE, CONTACT } from './constants';

interface BuildMetadataOptions {
  title: string;
  description: string;
  canonicalUrl?: string;
  ogImage?: string;
  noIndex?: boolean;
}

export function buildMetadata({
  title,
  description,
  canonicalUrl,
  ogImage = '/og-default.jpg',
  noIndex = false,
}: BuildMetadataOptions): Metadata {
  const canonical = canonicalUrl
    ? `${SITE.url}${canonicalUrl}`
    : SITE.url;

  return {
    title,
    description,
    metadataBase: new URL(SITE.url),
    alternates: {
      canonical,
      languages: {
        'en-ZA': canonical,
      },
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: SITE.name,
      locale: 'en_ZA',
      type: 'website',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true, googleBot: { index: true, follow: true } },
    other: {
      'geo.region': 'ZA-GP',
      'geo.placename': 'Johannesburg',
      'geo.position': '-26.1279;28.0377',
      'ICBM': '-26.1279, 28.0377',
      'DC.language': 'en-ZA',
    },
  };
}

export const LOCAL_BUSINESS_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': ['LocalBusiness', 'ComputerRepairService'],
  '@id': `${SITE.url}/#organization`,
  name: SITE.name,
  alternateName: SITE.alternateName,
  description: 'Johannesburg\'s Apple repair specialists. MacBook liquid damage, logic board component-level repair, iPhone & iPad repair. up-to-3 year warranty. Assessment.',
  telephone: CONTACT.phoneTel,
  email: CONTACT.email,
  url: SITE.url,
  priceRange: '$$',
  currenciesAccepted: 'ZAR',
  paymentAccepted: 'Cash, EFT, Credit Card, Debit Card',
  foundingDate: SITE.foundingDate,
  address: {
    '@type': 'PostalAddress',
    streetAddress: '1 Hyde Lane, Second Floor, Office E2004',
    addressLocality: 'Hyde Park',
    addressRegion: 'Gauteng',
    postalCode: '2196',
    addressCountry: 'ZA',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: -26.1279,
    longitude: 28.0377,
  },
  // §166 (22/05/2026): self-serving AggregateRating removed, ineligible +
  // manual-action risk per Google. Rating shown as plain text only.
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'],
      opens: '08:00',
      closes: '17:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Friday'],
      opens: '08:00',
      closes: '16:30',
    },
  ],
  hasMap: 'https://maps.app.goo.gl/Mgk4Hx2PvbZ6D8T5A',
  areaServed: [
    { '@type': 'City', name: 'Johannesburg' },
    { '@type': 'City', name: 'Sandton' },
    { '@type': 'City', name: 'Randburg' },
    { '@type': 'City', name: 'Rosebank' },
    { '@type': 'City', name: 'Midrand' },
  ],
  serviceType: [
    'Apple Mac Repair',
    'iPhone Repair',
    'iPad Repair',
    'Liquid Damage Repair',
    'Logic Board Repair',
    'JAMF MDM',
    'IT Managed Services',
  ],
  sameAs: [
    'https://www.facebook.com/appleexpertsouthafrica',
    'https://www.instagram.com/appleexpertza/',
    'https://x.com/za_support',
    'https://www.tiktok.com/@appleexpertza',
    'https://www.youtube.com/@zasupport-applemacupgrader6746',
    'https://www.linkedin.com/company/zasupport/',
    'https://www.linkedin.com/in/bentleycourtney/',
  ],
  legalName: 'Vizibiliti Intelligent Solutions (Pty) Ltd',
  founder: {
    '@type': 'Person',
    name: 'Courtney Bentley',
    jobTitle: 'Founder & Lead Apple Technician',
    url: `${SITE.url}/author/courtney-bentley`,
    worksFor: { '@id': `${SITE.url}/#organization` },
  },
  knowsAbout: [
    'MacBook logic board repair',
    'MacBook liquid damage repair',
    'Component-level micro-soldering',
    'Apple managed IT services',
    'Medical practice IT support',
    'JAMF and Apple MDM',
    'UniFi network installation',
    'iPhone and iPad repair',
  ],
};
