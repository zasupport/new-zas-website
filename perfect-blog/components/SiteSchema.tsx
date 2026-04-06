// components/SiteSchema.tsx
// Site-wide structured data — renders in root layout.tsx
// Organization + LocalBusiness + Person (Courtney Bentley entity)

export function SiteSchema() {
  const organization = {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'LocalBusiness'],
    '@id': 'https://www.zasupport.com/#organization',
    name: 'ZA Support',
    alternateName: 'ZA Support Apple Experts',
    url: 'https://www.zasupport.com',
    logo: {
      '@type': 'ImageObject',
      url: 'https://www.zasupport.com/za-logo-standard-web.png',
      width: 384,
      height: 80,
    },
    image: 'https://www.zasupport.com/za-logo-standard-web.png',
    description:
      "Johannesburg's Apple repair specialists since 2009. Component-level logic board repair, liquid damage recovery, iPhone and iPad repair, JAMF MDM, and managed IT services. Hyde Park workshop.",
    foundingDate: '2009',
    founder: {
      '@type': 'Person',
      name: 'Courtney Bentley',
      url: 'https://www.zasupport.com/author/courtney-bentley',
    },
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
      latitude: -26.1234,
      longitude: 28.0314,
    },
    telephone: '+27645295863',
    email: 'admin@zasupport.com',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '17:30',
      },
    ],
    priceRange: 'R599–R15000',
    currenciesAccepted: 'ZAR',
    paymentAccepted: 'Cash, Credit Card, EFT',
    areaServed: [
      { '@type': 'City', name: 'Johannesburg' },
      { '@type': 'City', name: 'Sandton' },
      { '@type': 'City', name: 'Kempton Park' },
      { '@type': 'State', name: 'Gauteng' },
    ],
    knowsAbout: [
      'Apple Mac repair',
      'MacBook logic board repair',
      'MacBook liquid damage repair',
      'iPhone screen repair',
      'iPad repair',
      'iMac repair',
      'MacBook SSD upgrade',
      'MacBook RAM upgrade',
      'JAMF MDM',
      'Apple enterprise support',
      'Apple device data recovery',
    ],
    sameAs: [
      'https://www.facebook.com/appleexpertsouthafrica',
      'https://www.instagram.com/appleexpertza/',
      'https://x.com/za_support',
      'https://www.tiktok.com/@appleexpertza',
      'https://www.youtube.com/@zasupport-applemacupgrader6746',
      'https://www.linkedin.com/in/bentleycourtney/',
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '632',
      bestRating: '5',
      worstRating: '1',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Apple Repair Services',
      itemListElement: [
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'MacBook Logic Board Repair' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'MacBook Liquid Damage Repair' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'iPhone Screen Repair' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'iPad Screen Repair' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'MacBook Battery Replacement' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'MacBook SSD Upgrade' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'JAMF MDM Implementation' } },
      ],
    },
    legalName: 'Vizibiliti Intelligent Solutions (Pty) Ltd',
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
    />
  )
}
