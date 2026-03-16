import type { Metadata } from 'next';
import { Inter, DM_Mono } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import { GoogleAnalytics } from '@next/third-parties/google';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SchemaOrg from '@/components/seo/SchemaOrg';
import { LOCAL_BUSINESS_SCHEMA } from '@/lib/seo';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const dmMono = DM_Mono({
  subsets: ['latin'],
  variable: '--font-dm-mono',
  display: 'swap',
  weight: ['300', '400', '500'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://zasupport.com'),
  title: {
    default: 'Apple Repair Johannesburg | MacBook Liquid Damage & Logic Board Specialists | ZA Support',
    template: '%s | ZA Support',
  },
  description:
    "Johannesburg's Apple repair specialists. MacBook liquid damage, logic board component-level repair, iPhone & iPad repair. 4.9★ 632+ reviews. Hyde Park. Assessment: from R599. Call 064 529 5863.",
  keywords: [
    'Apple repair Johannesburg',
    'MacBook repair Johannesburg',
    'liquid damage repair Johannesburg',
    'logic board repair',
    'iPhone repair Johannesburg',
    'JAMF MDM South Africa',
    'Apple specialists Johannesburg',
    'component-level repair Johannesburg',
  ],
  authors: [{ name: 'ZA Support' }],
  creator: 'ZA Support',
  publisher: 'ZA Support',
  formatDetection: { email: false, telephone: false },
  openGraph: {
    type: 'website',
    locale: 'en_ZA',
    url: 'https://zasupport.com',
    siteName: 'ZA Support',
    title: 'Apple Repair Johannesburg | ZA Support',
    description:
      "Johannesburg's Apple repair specialists. MacBook liquid damage, logic board component-level repair, iPhone & iPad repair. Assessment: from R599.",
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ZA Support, Apple Repair Johannesburg',
    description: "Johannesburg's Apple repair specialists. Assessment: from R599. Call 064 529 5863.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  alternates: {
    canonical: 'https://zasupport.com',
    languages: { 'en-ZA': 'https://zasupport.com' },
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-ZA" className={`${inter.variable} ${dmMono.variable}`}>
      <head>
        <SchemaOrg schema={LOCAL_BUSINESS_SCHEMA} />
      </head>
      <body className="font-sans antialiased bg-[#0A1A18] text-[#E8F4F1]" style={{ fontFamily: 'Inter, sans-serif' }}>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <Analytics />
        {/^G-[A-Z0-9]{7,10}$/.test(process.env.NEXT_PUBLIC_GA4_ID ?? '') &&
          process.env.NEXT_PUBLIC_GA4_ID !== 'G-XXXXXXXXXX' && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA4_ID!} />
        )}
      </body>
    </html>
  );
}
