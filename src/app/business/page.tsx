import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowRight, Phone, Building2, Stethoscope, Server, Users,
  Smartphone, Landmark, ShieldCheck, Clock, MessageCircleQuestion,
} from 'lucide-react';
import SchemaOrg from '@/components/seo/SchemaOrg';
import Breadcrumb from '@/components/ui/Breadcrumb';
import FAQAccordion from '@/components/ui/FAQ';
import OrphanLinks from '@/components/ui/OrphanLinks';
import { buildFaqSchema, buildBreadcrumbSchema, buildServiceSchema } from '@/lib/schema';
import { CONTACT, buildWhatsAppUrl } from '@/lib/constants';
import { GoogleReviews } from '@/components/GoogleReviews';

export const metadata: Metadata = {
  title: 'Apple IT Support for Business Johannesburg | Managed Services | ZA Support',
  description:
    'ZA Support is the Apple IT partner for Johannesburg businesses — managed services, SLAs, device management and priority support for SMEs, enterprises and medical practices. Call 064 529 5863.',
  alternates: { canonical: 'https://zasupport.com/business' },
};

const offerings = [
  {
    icon: Users,
    title: 'Managed IT Services',
    desc: 'Ongoing, proactive management of your Apple environment — monitoring, updates, security and support under one agreement.',
    href: '/managed-services',
  },
  {
    icon: Building2,
    title: 'SME Apple Support',
    desc: 'For growing businesses that run on Apple — a dedicated account manager, priority repairs and IT support without a full-time hire.',
    href: '/sme-support',
  },
  {
    icon: Server,
    title: 'Enterprise Apple Support',
    desc: 'Fleet-scale support, device management and deployment for enterprises running large numbers of Macs, iPhones and iPads.',
    href: '/enterprise',
  },
  {
    icon: Stethoscope,
    title: 'Medical Practice IT',
    desc: 'POPIA-aware, HPCSA-context managed IT for doctors and practices — secure patient data, practice software and minimal downtime.',
    href: '/medical-it',
  },
  {
    icon: Smartphone,
    title: 'JAMF & Apple MDM',
    desc: 'Central configuration, security and updates for your Apple fleet through mobile device management.',
    href: '/jamf-mdm',
  },
  {
    icon: Landmark,
    title: 'Government IT Services',
    desc: 'BEE Level 1 Apple specialist support for public-sector and government Apple environments.',
    href: '/government',
  },
];

const whyPoints = [
  { icon: ShieldCheck, title: 'Apple specialists, not generalists', desc: '16 years focused on Apple — the hardware, the software and the way Apple devices run in a business.' },
  { icon: Clock, title: 'Service level agreements', desc: 'Defined response times and clear scope, so support is predictable rather than ad-hoc.' },
  { icon: Users, title: 'A dedicated account manager', desc: 'One point of contact who knows your business, your devices and your people.' },
];

const faqs = [
  {
    question: 'Why choose a specialist Apple IT partner for my business?',
    answer:
      'A specialist understands how Apple devices behave in a business setting — deployment, management, security and repair — rather than treating Apple as an afterthought. For a business running on Macs, iPhones and iPads, that focus means fewer problems and faster resolution.',
  },
  {
    question: 'What size businesses does ZA Support work with?',
    answer:
      'We support businesses from small practices and growing SMEs through to enterprises with large Apple fleets. The service is scaled to the business — a small firm gets an outsourced IT department, while a larger organisation gets fleet management and deployment support.',
  },
  {
    question: 'Do you support businesses across Gauteng?',
    answer:
      'Yes. ZA Support serves businesses across Gauteng within roughly 60 km of our Hyde Park base, including greater Johannesburg, Sandton, Midrand and surrounding business areas, through a mix of remote support, workshop service and on-site visits.',
  },
  {
    question: 'Can you support a mix of Apple and Windows in our business?',
    answer:
      'ZA Support specialises in Apple, and many business clients run a mix of Apple devices with some Windows systems or specific business software. We manage the environment as a whole and work with the mix the business actually uses.',
  },
  {
    question: 'Do you offer service level agreements for business clients?',
    answer:
      'Yes. Business clients are supported under a service level agreement that sets out response times, scope and how support is delivered — giving the business a predictable, committed level of IT support.',
  },
  {
    question: 'How does a business start working with ZA Support?',
    answer:
      'We begin with a review of your current Apple devices, software and support needs, agree a service level agreement, then bring everything up to a secure, well-managed standard. From there the business has ongoing proactive support and a single point of contact.',
  },
];

export default function BusinessHubPage() {
  const faqSchema = buildFaqSchema(faqs);
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', url: 'https://zasupport.com' },
    { name: 'Business', url: 'https://zasupport.com/business' },
  ]);
  const serviceSchema = buildServiceSchema({
    name: 'Apple IT Support for Business',
    description:
      'Managed IT services, device management and priority support for businesses running Apple devices in Johannesburg and Gauteng.',
  });

  return (
    <>
      <SchemaOrg schema={serviceSchema} />
      <SchemaOrg schema={faqSchema} />
      <SchemaOrg schema={breadcrumbSchema} />

      {/* ── Hero ───────────────────────────────────────────────────────────── */}
      <section className="hero-gradient grid-overlay pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <Breadcrumb items={[{ label: 'Business' }]} />
          </div>
          <div className="max-w-4xl">
            <p className="text-[#0FEA7A] text-sm font-semibold uppercase tracking-widest mb-3">
              Apple IT Partner · Johannesburg &amp; Gauteng
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#E8F4F1] leading-tight mb-6">
              Apple IT support, built for
              <br />
              <span className="text-[#0FEA7A]">how your business runs</span>
            </h1>
            <p className="text-xl text-[#7A9E98] leading-relaxed max-w-3xl mb-8">
              When a business runs on Apple, IT cannot be an afterthought. ZA Support is the
              specialist Apple IT partner for SMEs, enterprises and medical practices across
              Johannesburg — managed services, device management, priority support and a
              service level agreement, backed by 16 years of Apple expertise.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={buildWhatsAppUrl('BUSINESS-HERO', 'managed-services')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl font-bold hover:bg-[#0FEA7A]/90 transition-all"
              >
                <Phone className="w-5 h-5" /> Talk to us about business IT
              </a>
              <Link
                href="/answers/business-it-support"
                className="inline-flex items-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all"
              >
                <MessageCircleQuestion className="w-5 h-5" /> Business IT questions answered
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Why a specialist ──────────────────────────────────────────────── */}
      <section className="py-14 bg-[#0F2522]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid sm:grid-cols-3 gap-6">
          {whyPoints.map((p) => (
            <div key={p.title} className="rounded-2xl border border-[rgba(15,234,122,0.18)] p-6">
              <p.icon className="w-8 h-8 text-[#0FEA7A] mb-4" />
              <h2 className="text-lg font-bold text-[#E8F4F1] mb-2">{p.title}</h2>
              <p className="text-[#7A9E98] text-sm leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Offerings ─────────────────────────────────────────────────────── */}
      <section className="py-16 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-3">
            How we support your business
          </h2>
          <p className="text-[#7A9E98] mb-10 max-w-2xl">
            Every business is different. Start with the area closest to your need — we will
            shape the right support around it.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {offerings.map((o) => (
              <Link
                key={o.href}
                href={o.href}
                className="group block rounded-2xl border border-[rgba(15,234,122,0.18)] bg-[#0F2522] p-6 hover:border-[#0FEA7A]/50 transition-all"
              >
                <o.icon className="w-8 h-8 text-[#0FEA7A] mb-4" />
                <h3 className="text-xl font-bold text-[#E8F4F1] mb-2">{o.title}</h3>
                <p className="text-[#7A9E98] text-sm leading-relaxed mb-4">{o.desc}</p>
                <span className="inline-flex items-center gap-1 text-[#0FEA7A] text-sm font-semibold">
                  Learn more
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Software & infrastructure for business ────────────────────────── */}
      <OrphanLinks
        sectionTitle="Software & infrastructure for your business"
        intro="ZA Support deploys, licenses and supports the everyday business software and network infrastructure that runs alongside your Apple fleet — from Microsoft 365 mailbox setup, through UniFi networks at your premises, to Adobe Creative Cloud for the design and marketing team."
        groups={[
          {
            heading: 'Productivity & creative software',
            links: [
              { title: 'Microsoft 365 for Business', href: '/business/microsoft-365-for-business', description: 'Email, Teams, OneDrive and SharePoint set up and supported' },
              { title: 'Adobe Creative Cloud support', href: '/business/adobe-creative-cloud-support', description: 'Licensing, deployment and support for design and marketing teams' },
            ],
          },
          {
            heading: 'Network infrastructure',
            links: [
              { title: 'UniFi network services', href: '/business/unifi-network-services', description: 'Business-grade Wi-Fi, switches and gateways designed and installed in Gauteng' },
            ],
          },
        ]}
      />

      {/* ── Google Reviews — sourced from GBP ─────────────────────────────── */}
      <GoogleReviews count={6} title="What our business clients say" />

      {/* ── FAQ ───────────────────────────────────────────────────────────── */}
      <section className="py-16 bg-[#0F2522]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQAccordion items={faqs} title="Business Apple IT — common questions" />
          <div className="mt-10">
            <a
              href={`tel:${CONTACT.phoneTel}`}
              className="inline-flex items-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl font-bold hover:bg-[#0FEA7A]/90 transition-all"
            >
              <Phone className="w-5 h-5" /> Call {CONTACT.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
