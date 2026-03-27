export const SITE = {
  name: 'ZA Support',
  alternateName: 'Apple Experts',
  tagline: 'Practice IT. Perfected.',
  url: 'https://zasupport.com',
  foundingDate: '2009',
  vat: '436-026-0014',
  rating: '4.9',
  reviewCount: '631',
  repairsCount: '50,000+',
  yearsExperience: '16',
  googleMapsUrl: 'https://maps.google.com/?q=1+Hyde+Lane+Hyde+Park+Johannesburg',
} as const;

export const CONTACT = {
  phone: '064 529 5863',
  phoneTel: '+27645295863',
  email: 'admin@zasupport.com',
  whatsapp: 'https://wa.me/27645295863',
  whatsappLogicBoard: 'https://wa.me/27645295863?text=Hi%2C%20I%20need%20a%20logic%20board%20repair%20quote',
  booking: '/book',
  address: {
    street: '1 Hyde Lane, Second Floor, Office E2004',
    suburb: 'Hyde Park',
    city: 'Johannesburg',
    province: 'Gauteng',
    postalCode: '2196',
    country: 'South Africa',
    countryCode: 'ZA',
    full: '1 Hyde Lane, Hyde Park, Second Floor, Office E2004, Johannesburg, 2196',
  },
  hours: {
    weekdays: 'Monday – Friday: 08:00 – 17:30',
    saturday: 'Closed Saturdays',
    sunday: 'Closed Sundays & Public Holidays',
  },
} as const;

export const SOCIAL = {
  facebook: 'https://facebook.com/zasupport',
  instagram: 'https://instagram.com/zasupport',
  linkedin: 'https://linkedin.com/company/zasupport',
  twitter: 'https://twitter.com/zasupport',
} as const;

export const BRAND = {
  teal: '#27504D',
  green: '#0FEA7A',
  dark: '#0A1A18',
  dark2: '#111C1A',
  text: '#E8F4F1',
  muted: '#7A9E98',
} as const;

export type NavChild = { label: string; href: string; desc?: string };
export type NavLink = { label: string; href: string; children?: NavChild[] };

export const NAV_LINKS: NavLink[] = [
  {
    label: 'Repairs',
    href: '/apple-repair',
    children: [
      { label: 'Logic Board Repair', href: '/logic-board-repair', desc: 'Component-level board repair' },
      { label: 'Liquid Damage', href: '/liquid-damage', desc: 'Spill recovery & corrosion clean' },
      { label: 'Battery Replacement', href: '/battery-replacement', desc: 'MacBook & iPhone batteries' },
      { label: 'Screen Repair', href: '/screen-repair', desc: 'Cracked & broken displays' },
      { label: 'iPhone Repair', href: '/iphone-repair', desc: 'Screen, battery, charging port' },
      { label: 'iPad Repair', href: '/ipad-repair', desc: 'Screen, battery, charging' },
    ],
  },
  {
    label: 'Mac Models',
    href: '/apple-repair',
    children: [
      { label: 'MacBook Pro Repair', href: '/macbook-pro-repair', desc: 'All models inc M1–M4' },
      { label: 'MacBook Air Repair', href: '/macbook-air-repair', desc: 'All models inc M1–M3' },
      { label: 'iMac Repair', href: '/imac-repair', desc: 'iMac logic board & display' },
      { label: 'Mac Mini Repair', href: '/mac-mini-repair', desc: 'Mac Mini all generations' },
      { label: 'MacBook Not Turning On', href: '/macbook-not-turning-on', desc: 'Startup fault diagnosis' },
    ],
  },
  {
    label: 'Enterprise',
    href: '/managed-services',
    children: [
      { label: 'Managed IT Services', href: '/managed-services', desc: 'Monthly SLA coverage' },
      { label: 'JAMF MDM', href: '/jamf-mdm', desc: 'Apple device management' },
      { label: 'Medical IT', href: '/apple-support/medical-practices', desc: 'HPCSA-aware IT for practices' },
    ],
  },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];


export const TRUST_BADGES = [
  { label: 'Up-to-3 Year Warranty', icon: 'shield' },
  { label: 'Fastest Turnaround Times', icon: 'clock' },
  { label: '16 Years Experience', icon: 'badge-check' },
  { label: 'Assessment: from R599', icon: 'search' },
  { label: 'Hyde Park', icon: 'map-pin' },
] as const;

export const REVIEWS = [
  {
    name: 'Michael B.',
    rating: 5,
    text: 'Courtney and the team saved my MacBook Pro after a coffee spill. They were honest about the prognosis upfront and delivered exactly what they promised. Worth every rand.',
    service: 'Liquid Damage Repair',
  },
  {
    name: 'Priya S.',
    rating: 5,
    text: 'Used ZA Support for our company\'s JAMF rollout. Professional, knowledgeable and they kept us informed throughout. Highly recommend for any Apple business setup.',
    service: 'JAMF MDM',
  },
  {
    name: 'James T.',
    rating: 5,
    text: 'My iPhone 15 had liquid damage and they had it fixed within 48 hours. Clear pricing, no hidden costs, and the device works perfectly. Will definitely return.',
    service: 'iPhone Repair',
  },
  {
    name: 'Sarah M.',
    rating: 5,
    text: 'Best Apple repair experience I\'ve had in Johannesburg. The team clearly knows their stuff. They diagnosed a logic board issue other shops had missed.',
    service: 'Logic Board Repair',
  },
] as const;
