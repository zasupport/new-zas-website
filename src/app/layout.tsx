import type { Metadata } from 'next';
import { Inter, DM_Mono } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import { GoogleAnalytics } from '@next/third-parties/google';
import SiteShell from '@/components/layout/SiteShell';
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
    images: [
      {
        url: 'https://zasupport.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'ZA Support — Apple Repair Specialists Johannesburg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ZA Support, Apple Repair Johannesburg',
    description: "Johannesburg's Apple repair specialists. Assessment: from R599. Call 064 529 5863.",
    images: ['https://zasupport.com/og-image.jpg'],
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
  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { verification: { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION } }
    : {}),
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-ZA" className={`${inter.variable} ${dmMono.variable}`}>
      <head>
        <SchemaOrg schema={LOCAL_BUSINESS_SCHEMA} />
        <meta name="theme-color" content="#0FEA7A" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="ZA Support" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="font-sans antialiased bg-[#0A1A18] text-[#E8F4F1]" style={{ fontFamily: 'Inter, sans-serif' }}>
        <SiteShell>{children}</SiteShell>
        <Analytics />
        {/^G-[A-Z0-9]{7,10}$/.test(process.env.NEXT_PUBLIC_GA4_ID ?? '') &&
          process.env.NEXT_PUBLIC_GA4_ID !== 'G-XXXXXXXXXX' && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA4_ID!} />
        )}
      </body>
    </html>
  );
}
