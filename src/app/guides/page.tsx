import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Wrench, Battery, Monitor, Zap, HardDrive, Thermometer, AlertTriangle, Gauge } from 'lucide-react';

export const metadata: Metadata = {
  title: 'MacBook Troubleshooting Guides & How-To Fixes 2026 | ZA Support',
  description: 'Step-by-step MacBook troubleshooting guides from ZA Support, Johannesburg. Fix common issues yourself or know when to bring it to our Hyde Park workshop.',
  alternates: { canonical: 'https://zasupport.com/guides' },
  openGraph: {
    title: 'MacBook Troubleshooting Guides & How-To Fixes 2026 | ZA Support',
    description: 'Step-by-step MacBook troubleshooting guides from ZA Support, Johannesburg.',
    url: 'https://zasupport.com/guides',
    type: 'website',
  },
};

const guides = [
  {
    slug: 'macbook-not-turning-on',
    title: 'MacBook Not Turning On? 10 Fixes to Try',
    excerpt: 'Step-by-step troubleshooting from SMC resets to power rail diagnostics. Covers Intel and Apple Silicon models with specific instructions for each.',
    icon: Zap,
    category: 'Power Issues',
    readTime: '12 min read',
    searchVolume: 'High',
  },
  {
    slug: 'macbook-water-damage-what-to-do',
    title: 'Spilled Water on MacBook? Do This Immediately',
    excerpt: 'Emergency first response guide for liquid damage. What to do in the first 5 minutes, the corrosion timeline, and why rice does absolutely nothing.',
    icon: AlertTriangle,
    category: 'Emergency',
    readTime: '10 min read',
    searchVolume: 'High',
  },
  {
    slug: 'macbook-not-charging',
    title: 'MacBook Not Charging? 10 Steps to Fix It',
    excerpt: 'From checking your charger cable to diagnosing USB-C controller ICs. Covers MagSafe LED diagnosis, port inspection, and when it is a board-level fault.',
    icon: Battery,
    category: 'Charging Issues',
    readTime: '11 min read',
    searchVolume: 'High',
  },
  {
    slug: 'macbook-overheating-fix',
    title: 'MacBook Overheating? 8 Proven Fixes',
    excerpt: 'Activity Monitor checks, fan cleaning, thermal paste replacement, and when overheating means a logic board issue. Temperature thresholds explained.',
    icon: Thermometer,
    category: 'Performance',
    readTime: '10 min read',
    searchVolume: 'High',
  },
  {
    slug: 'macbook-screen-flickering',
    title: 'MacBook Screen Flickering? Causes & Fixes',
    excerpt: 'NVRAM resets, display diagnostics, Flexgate explanation, and GPU fault identification. How to tell if it is software or a hardware issue.',
    icon: Monitor,
    category: 'Display Issues',
    readTime: '11 min read',
    searchVolume: 'Medium',
  },
  {
    slug: 'how-to-check-macbook-battery-health',
    title: 'How to Check MacBook Battery Health',
    excerpt: 'System Information, Terminal commands, cycle count thresholds by model, and when "Service Recommended" means it is time for a replacement.',
    icon: Battery,
    category: 'Maintenance',
    readTime: '9 min read',
    searchVolume: 'High',
  },
  {
    slug: 'how-to-recover-data-from-dead-macbook',
    title: 'How to Recover Data from a Dead MacBook',
    excerpt: 'Target Disk Mode, Apple Share Disk, T2 encryption challenges, and why Apple Silicon makes DIY data recovery nearly impossible without board repair.',
    icon: HardDrive,
    category: 'Data Recovery',
    readTime: '12 min read',
    searchVolume: 'Medium',
  },
  {
    slug: 'macbook-running-slow',
    title: 'MacBook Running Slow? 12 Proven Fixes',
    excerpt: 'Activity Monitor diagnosis, storage cleanup, login item management, and when slow performance points to failing hardware rather than software bloat.',
    icon: Gauge,
    category: 'Performance',
    readTime: '11 min read',
    searchVolume: 'High',
  },
];

export default function GuidesPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'MacBook Troubleshooting Guides',
    description: 'Step-by-step troubleshooting guides for common MacBook issues from ZA Support, Johannesburg.',
    url: 'https://zasupport.com/guides',
    publisher: {
      '@type': 'LocalBusiness',
      name: 'ZA Support',
      telephone: '+27645295863',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '1 Hyde Park Lane',
        addressLocality: 'Hyde Park',
        addressRegion: 'Gauteng',
        postalCode: '2196',
        addressCountry: 'ZA',
      },
    },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://zasupport.com' },
        { '@type': 'ListItem', position: 2, name: 'Guides', item: 'https://zasupport.com/guides' },
      ],
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="bg-[#27504D] text-white py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <nav className="text-sm text-white/70 mb-6">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Guides</span>
          </nav>
          <h1 className="text-3xl md:text-5xl font-bold mb-6">
            MacBook Troubleshooting Guides
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
            Step-by-step fixes for the most common MacBook problems. Written by the repair technicians
            at our Hyde Park workshop who see these issues every day.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-8">
            {guides.map((guide) => {
              const Icon = guide.icon;
              return (
                <Link
                  key={guide.slug}
                  href={`/guides/${guide.slug}`}
                  className="group border border-gray-200 rounded-xl p-6 hover:border-[#1B6B4A] hover:shadow-lg transition-all duration-200"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-[#1B6B4A]/10 rounded-lg flex items-center justify-center group-hover:bg-[#1B6B4A]/20 transition-colors">
                      <Icon className="w-6 h-6 text-[#1B6B4A]" />
                    </div>
                    <div className="flex-1">
                      <span className="text-xs font-medium text-[#1B6B4A] uppercase tracking-wider">
                        {guide.category}
                      </span>
                      <h2 className="text-xl font-bold text-gray-900 mt-1 group-hover:text-[#1B6B4A] transition-colors">
                        {guide.title}
                      </h2>
                      <p className="text-gray-600 mt-2 text-sm leading-relaxed">
                        {guide.excerpt}
                      </p>
                      <div className="flex items-center gap-4 mt-4 text-sm text-gray-500">
                        <span>{guide.readTime}</span>
                        <span className="flex items-center gap-1 text-[#1B6B4A] font-medium group-hover:underline">
                          Read guide <ArrowRight className="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <Wrench className="w-12 h-12 text-[#1B6B4A] mx-auto mb-4" />
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Tried Everything? We Can Help.
          </h2>
          <p className="text-gray-600 mb-8 text-lg">
            If the troubleshooting steps above did not fix your MacBook, it likely needs a professional
            diagnosis. Our Hyde Park workshop handles logic board repairs, liquid damage recovery, and
            every other Mac fault you can imagine.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/27645295863?text=Hi%2C%20I%20need%20help%20with%20my%20MacBook"
              className="inline-flex items-center justify-center px-8 py-3 bg-[#25D366] text-white font-semibold rounded-lg hover:bg-[#20bd5a] transition-colors"
            >
              WhatsApp Us
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-3 border-2 border-[#27504D] text-[#27504D] font-semibold rounded-lg hover:bg-[#27504D] hover:text-white transition-colors"
            >
              Book Assessment from R599
            </Link>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            No Fix, No Fee guarantee on all repairs. 12-month warranty included.
          </p>
        </div>
      </section>
    </>
  );
}
