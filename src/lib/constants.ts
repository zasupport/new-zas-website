export const SITE = {
  name: 'ZA Support',
  alternateName: 'Apple Experts',
  tagline: 'Practice IT. Perfected.',
  url: 'https://zasupport.com',
  foundingDate: '2009',
  vat: '436-026-0014',
  rating: '4.9',
  reviewCount: '632',
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
    label: 'Business',
    href: '/enterprise',
    children: [
      { label: 'Enterprise', href: '/enterprise', desc: 'Fleet management & Apple MDM' },
      { label: 'SME Support', href: '/sme-support', desc: 'Small business Apple IT' },
      { label: 'Medical IT', href: '/medical-it', desc: 'HPCSA-compliant practice IT' },
      { label: 'Government', href: '/government', desc: 'BEE Level 1 IT services' },
      { label: 'Managed IT', href: '/managed-services', desc: 'Monthly SLA coverage' },
      { label: 'Apple MDM', href: '/jamf-mdm', desc: 'Apple device management' },
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

/* ── Page-specific WhatsApp & Phone tracking helpers ────────────────────────
 * Every WA link on the site includes a [REF:CODE] tag so we can identify
 * which page and section generated the enquiry.
 *
 * REF format: [REF:{PAGE}-{SECTION}]
 *   PAGE   = short code for the page (HOME, LBR, LIQ, BAT, SCR, CONTACT, etc.)
 *   SECTION = optional section within the page (HERO, CTA, CARD, FOOTER, NAV)
 */

const WA_BASE = 'https://wa.me/27645295863';

const SERVICE_MESSAGES: Record<string, string> = {
  'logic-board': 'Hi, I need a logic board repair quote',
  'liquid-damage': 'Hi, I need a liquid damage repair quote',
  'macbook-repair': 'Hi, I need a MacBook repair quote',
  'macbook-pro-repair': 'Hi, I need a MacBook Pro repair quote',
  'macbook-air-repair': 'Hi, I need a MacBook Air repair quote',
  'imac-repair': 'Hi, I need an iMac repair quote',
  'mac-mini-repair': 'Hi, I need a Mac Mini repair or upgrade quote',
  'battery': 'Hi, I need a battery replacement quote',
  'screen': 'Hi, I need a screen repair quote',
  'iphone-repair': 'Hi, I need an iPhone repair quote',
  'iphone-screen': 'Hi, I need an iPhone screen repair quote',
  'iphone-battery': 'Hi, I need an iPhone battery replacement quote',
  'iphone-charging': 'Hi, my iPhone is not charging',
  'iphone-back-glass': 'Hi, I need iPhone back glass repair',
  'iphone-camera': 'Hi, I need an iPhone camera repair quote',
  'ipad-repair': 'Hi, I need an iPad repair quote',
  'ipad-screen': 'Hi, I need an iPad screen repair quote',
  'ipad-battery': 'Hi, I need an iPad battery replacement quote',
  'ipad-charging': 'Hi, my iPad is not charging',
  'keyboard': 'Hi, I need a MacBook keyboard repair quote',
  'charging-port': 'Hi, I need a charging port repair quote',
  'data-recovery': 'Hi, I need data recovery help',
  'virus-removal': 'Hi, I need virus/malware removal help',
  'trackpad': 'Hi, I need a MacBook trackpad repair quote',
  'ssd-upgrade': 'Hi, I need an SSD upgrade quote',
  'ram-upgrade': 'Hi, I need a RAM upgrade quote',
  'apple-watch': 'Hi, I need an Apple Watch repair quote',
  'airpods': 'Hi, I need AirPods repair quote',
  'accessories': 'Hi, I need help with Apple accessories repair',
  'no-fix-no-fee': 'Hi, I need a free Mac diagnostic',
  'managed-services': "Hi, I'd like a managed IT services quote",
  'medical-it': "Hi, I'm a medical practice and need IT support",
  'jamf-mdm': "Hi, I'd like a JAMF MDM implementation quote",
  'apple-support': "Hi, I need Apple support for my business",
  'macbook-not-turning-on': "Hi, my MacBook won't turn on and I need help",
  'general': 'Hi, I need help with my Apple device',
};

/**
 * Build a WhatsApp URL with a tracking ref code appended to the message text.
 *
 * @param ref      Tracking ref code, e.g. 'HOME-HERO', 'LBR-CTA', 'NAV-DESK'
 * @param service  Optional service key from SERVICE_MESSAGES map
 * @param message  Optional custom message (overrides service message)
 * @returns        Full wa.me URL with ?text= including [REF:code]
 *
 * @example
 *   buildWhatsAppUrl('HOME-HERO', 'general')
 *   // => https://wa.me/27645295863?text=Hi%2C%20I%20need%20help%20...%20%5BREF%3AHOME-HERO%5D
 */
export function buildWhatsAppUrl(ref: string, service?: string, message?: string): string {
  const baseMessage = message ?? SERVICE_MESSAGES[service ?? 'general'] ?? SERVICE_MESSAGES['general'];
  const fullMessage = `${baseMessage} [REF:${ref}]`;
  return `${WA_BASE}?text=${encodeURIComponent(fullMessage)}`;
}

/**
 * Build a WhatsApp URL for suburb-specific pages.
 * Includes both the service and suburb in the message.
 */
export function buildWhatsAppSuburbUrl(ref: string, service: string, suburb: string): string {
  const svcMsg = SERVICE_MESSAGES[service] ?? SERVICE_MESSAGES['general'];
  const fullMessage = `${svcMsg} (${suburb}) [REF:${ref}]`;
  return `${WA_BASE}?text=${encodeURIComponent(fullMessage)}`;
}
