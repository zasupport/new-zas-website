import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, Award, Star, Shield, Cpu, ArrowRight } from 'lucide-react';
import SchemaOrg from '@/components/seo/SchemaOrg';
import { CONTACT, SITE } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'About ZA Support | 14 Years Apple Expertise, Hyde Park Johannesburg',
  description:
    "ZA Support — Johannesburg's Apple repair specialists since 2012. 3,000+ repairs, 4.9★ Google rating. Logic board microsoldering, JAMF MDM, managed IT. Hyde Park.",
  alternates: { canonical: 'https://zasupport.com/about' },
};

const aboutSchema = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  name: 'About ZA Support',
  url: 'https://zasupport.com/about',
  description: 'ZA Support — Johannesburg Apple repair specialists since 2012',
};

export default function AboutPage() {
  return (
    <>
      <SchemaOrg schema={aboutSchema} />

      <section className="hero-gradient grid-overlay pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#E8F4F1] leading-tight mb-6" style={{ fontFamily: 'Syne, sans-serif' }}>
              About ZA Support
              <br /><span className="text-[#0FEA7A]">Practice IT. Perfected.</span>
            </h1>
            <p className="text-xl text-[#7A9E98] leading-relaxed max-w-3xl">
              Since 2012, ZA Support has been Johannesburg&apos;s go-to Apple technology partner.
              We have built our reputation one device at a time — through honest diagnostics,
              transparent pricing, and repairs that last.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {[
              { value: SITE.repairsCount, label: 'Repairs Completed' },
              { value: SITE.rating + '★', label: 'Google Rating' },
              { value: SITE.yearsExperience + ' Years', label: 'Apple Expertise' },
              { value: SITE.reviewCount, label: 'Verified Reviews' },
            ].map((stat) => (
              <div key={stat.label} className="glass-card p-6 text-center">
                <span className="block text-4xl font-extrabold text-[#0FEA7A] mb-1" style={{ fontFamily: 'Syne, sans-serif' }}>{stat.value}</span>
                <span className="text-[#7A9E98] text-sm">{stat.label}</span>
              </div>
            ))}
          </div>

          {/* Story */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
            <div>
              <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-6" style={{ fontFamily: 'Syne, sans-serif' }}>Our Story</h2>
              <div className="space-y-4 text-[#7A9E98] leading-relaxed">
                <p>
                  ZA Support was founded in 2012 with a clear purpose: to bring genuinely expert Apple repair
                  to Johannesburg. At the time, the choice for Mac users was between expensive Apple Stores
                  and unreliable third-party shops that replaced boards instead of repairing them.
                </p>
                <p>
                  We chose a different path. Our engineers invested in microscope workstations and microsoldering
                  training to perform the same board-level repairs that most shops still cannot do today.
                  The result: clients keep their original boards, pay significantly less, and get a 12-month
                  warranty on every repair.
                </p>
                <p>
                  As the Apple ecosystem expanded, so did our capabilities. We became Johannesburg&apos;s JAMF MDM
                  specialists for businesses managing Apple fleets. We developed our Health Check monitoring system
                  to proactively protect client devices. We built managed IT service packages that give businesses
                  predictable costs and zero unexpected downtime.
                </p>
                <p>
                  Today, ZA Support serves medical practices, businesses, professionals, and families across
                  Johannesburg from our Hyde Park workshop. Every repair, every client interaction, every
                  monthly report — all built on the same foundation of technical excellence and honesty
                  that we started with in 2012.
                </p>
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-6" style={{ fontFamily: 'Syne, sans-serif' }}>What Makes Us Different</h2>
              <div className="space-y-4">
                {[
                  { icon: Cpu, title: 'Microscope-Level Microsoldering', desc: 'We repair components others replace. Our board-level repair capability saves clients thousands over board replacements.' },
                  { icon: Award, title: 'JAMF-Certified Specialists', desc: 'One of Johannesburg\'s few JAMF-certified implementation teams. We manage Apple fleets for organisations across Gauteng.' },
                  { icon: Star, title: '4.9★ on Google — 120+ Reviews', desc: 'Our rating is built on consistent delivery. Read our reviews — the themes are honesty, transparency, and results.' },
                  { icon: Shield, title: 'No Fix No Fee — Always', desc: 'If we cannot repair your device, you pay nothing for the attempt. Our assessment is always free. No surprises.' },
                ].map(({ icon: Icon, title, desc }) => (
                  <div key={title} className="flex gap-4 p-4 bg-[rgba(22,34,32,0.5)] rounded-xl border border-[rgba(15,234,122,0.08)]">
                    <div className="w-10 h-10 bg-[rgba(15,234,122,0.1)] rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-[#0FEA7A]" />
                    </div>
                    <div>
                      <p className="text-[#E8F4F1] font-semibold text-sm mb-1">{title}</p>
                      <p className="text-[#7A9E98] text-sm">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="glass-card p-8">
            <h2 className="text-2xl font-bold text-[#E8F4F1] mb-6" style={{ fontFamily: 'Syne, sans-serif' }}>Company Information</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { label: 'Trading Name', value: 'ZA Support' },
                { label: 'Legal Entity', value: 'Vizibiliti Intelligent Solutions (Pty) Ltd' },
                { label: 'Founded', value: '2012' },
                { label: 'VAT Number', value: SITE.vat },
                { label: 'Location', value: '1 Hyde Lane, Hyde Park, Johannesburg' },
                { label: 'Service Area', value: 'Greater Johannesburg / Gauteng' },
              ].map((item) => (
                <div key={item.label}>
                  <p className="text-[#7A9E98] text-xs uppercase tracking-wider mb-1">{item.label}</p>
                  <p className="text-[#E8F4F1] font-medium">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-[rgba(39,80,77,0.3)] border border-[rgba(15,234,122,0.2)] rounded-3xl p-10">
            <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3" style={{ fontFamily: 'Syne, sans-serif' }}>Work With Us</h2>
            <p className="text-[#7A9E98] mb-6">Free assessment. No obligation. Hyde Park, Johannesburg.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={`tel:${CONTACT.phoneTel}`} className="inline-flex items-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl font-bold hover:bg-[#0FEA7A]/90 transition-all">
                <Phone className="w-5 h-5" /> Call {CONTACT.phone}
              </a>
              <Link href="/contact" className="inline-flex items-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all">
                Send Enquiry <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
