import { CONTACT, SITE } from '@/lib/constants';

// ─── Aggregate Rating ────────────────────────────────────────────────────────
// Used on every service page — renders ★★★★★ in Google search results.
export const AGGREGATE_RATING = {
  '@type': 'AggregateRating',
  ratingValue: SITE.rating,
  reviewCount: '632',
  bestRating: '5',
  worstRating: '1',
} as const;

// ─── Local Business Provider ─────────────────────────────────────────────────
// Reusable provider block embedded in Service schemas.
export const LOCAL_BUSINESS_PROVIDER = {
  '@type': 'LocalBusiness',
  name: SITE.name,
  url: 'https://zasupport.com',
  telephone: CONTACT.phone,
  email: 'admin@zasupport.com',
  priceRange: 'RR',
  address: {
    '@type': 'PostalAddress',
    streetAddress: CONTACT.address.street,
    addressLocality: CONTACT.address.city,
    addressRegion: CONTACT.address.province,
    postalCode: CONTACT.address.postalCode,
    addressCountry: 'ZA',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: -26.1348,
    longitude: 28.0469,
  },
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
    { '@type': 'Neighborhood', name: 'Hyde Park' },
    { '@type': 'Neighborhood', name: 'Sandton' },
    { '@type': 'Neighborhood', name: 'Rosebank' },
    { '@type': 'Neighborhood', name: 'Illovo' },
    { '@type': 'Neighborhood', name: 'Bryanston' },
    { '@type': 'Neighborhood', name: 'Fourways' },
  ],
};

// ─── FAQ Page Schema ─────────────────────────────────────────────────────────
// NOTE: Google removed the visual FAQ dropdown for non-government sites in 2023.
// FAQPage schema is still implemented because it:
//   1. Feeds Google's AI Overviews (your answers can be cited)
//   2. Targets featured snippet eligibility (position zero answer boxes)
//   3. Adds structured context for Google's language models
// Source: developers.google.com/search/docs/appearance/structured-data/faqpage
export function buildFaqSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

// ─── Service Schema Builder ───────────────────────────────────────────────────
// Builds a full Service schema with AggregateRating embedded in provider.
export function buildServiceSchema(params: {
  name: string;
  description: string;
  lowPrice?: string;
  highPrice?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: params.name,
    description: params.description,
    provider: LOCAL_BUSINESS_PROVIDER,
    areaServed: { '@type': 'City', name: 'Johannesburg' },
  };
}

// ─── Breadcrumb Builder ───────────────────────────────────────────────────────
// Builds BreadcrumbList schema from a simple array of { name, url } pairs.
export function buildBreadcrumbSchema(
  items: Array<{ name: string; url: string }>,
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
