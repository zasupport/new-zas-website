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
  description: 'Johannesburg\'s Apple repair specialists. MacBook liquid damage, logic board microsoldering, iPhone & iPad repair. No Fix No Fee. 12-Month Warranty.',
  telephone: CONTACT.phoneTel,
  email: CONTACT.email,
  url: SITE.url,
  priceRange: 'R900 - R10,000+',
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
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '120',
    bestRating: '5',
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '08:00',
      closes: '17:30',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Saturday'],
      opens: '09:00',
      closes: '13:00',
    },
  ],
  hasMap: 'https://maps.google.com/?q=1+Hyde+Lane+Hyde+Park+Johannesburg',
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
    'https://facebook.com/zasupport',
    'https://instagram.com/zasupport',
    'https://linkedin.com/company/zasupport',
  ],
};
