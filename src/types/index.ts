export interface Service {
  id: string;
  title: string;
  description: string;
  href: string;
  icon: string;
  priceFrom?: string;
  featured?: boolean;
}

export interface BlogPost {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt: string;
  publishedAt: string;
  mainImage?: {
    asset: { url: string };
    alt: string;
  };
  categories?: { title: string }[];
  author?: {
    name: string;
    image?: { asset: { url: string } };
  };
  body?: unknown;
  estimatedReadingTime?: number;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface RepairPrice {
  device: string;
  repairType: string;
  priceFrom: string;
  turnaround: string;
  warranty: string;
}

export interface Review {
  name: string;
  rating: number;
  text: string;
  service?: string;
  date?: string;
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface NavLink {
  label: string;
  href: string;
  children?: NavLink[];
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  deviceType: string;
  issue: string;
  urgency: 'low' | 'medium' | 'high' | 'emergency';
}

export interface SchemaOrg {
  '@context': string;
  '@type': string | string[];
  [key: string]: unknown;
}
