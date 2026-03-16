import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Book a Mac Repair, Hyde Park, Johannesburg | ZA Support',
  description:
    'Book a free Mac repair assessment in Hyde Park, Johannesburg. MacBook, iPhone, iPad, iMac, all models. Assessment: R899 ex VAT. We respond within 2 hours.',
  alternates: { canonical: 'https://zasupport.com/book' },
  openGraph: {
    title: 'Book a Mac Repair, Hyde Park, Johannesburg | ZA Support',
    description: 'Book a free Mac repair assessment. Assessment: R899 ex VAT. We respond within 2 hours.',
    url: 'https://zasupport.com/book',
    siteName: 'ZA Support',
    type: 'website',
  },
};

export default function BookLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
