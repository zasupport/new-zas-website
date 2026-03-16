import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact ZA Support | Apple Repair Johannesburg | Call 064 529 5863',
  description:
    'Contact ZA Support in Hyde Park, Johannesburg. MacBook, iPhone and iPad repair. Assessment: from R599 ex VAT. Response within 1 hour. Call 064 529 5863 or WhatsApp.',
  alternates: { canonical: 'https://zasupport.com/contact' },
  openGraph: {
    title: 'Contact ZA Support — Apple Repair Johannesburg',
    description: 'MacBook, iPhone and iPad repair in Hyde Park. Assessment: from R599 ex VAT. Call 064 529 5863.',
    url: 'https://zasupport.com/contact',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
