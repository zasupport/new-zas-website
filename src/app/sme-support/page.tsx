import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Phone,
  Shield,
  Monitor,
  Wrench,
  Users,
  Zap,
  Network,
  ArrowRight,
  MapPin,
  Clock,
  CheckCircle,
  Building2,
  Headphones,
  Package,
  BadgeCheck,
  Settings,
  FileCode,
} from 'lucide-react';
import SchemaOrg from '@/components/seo/SchemaOrg';
import { buildFaqSchema, buildServiceSchema, buildBreadcrumbSchema } from '@/lib/schema';
import { CONTACT, SITE, buildWhatsAppUrl } from '@/lib/constants';
import FAQAccordion from '@/components/ui/FAQ';

export const metadata: Metadata = {
  title: 'SME Apple Support Johannesburg | Business IT Solutions | ZA Support',
  description:
    'SME Apple support and business IT solutions in Johannesburg. Managed services, dedicated account manager, specialist networking, Apple repairs and software development. BEE Level 1. Assessment from R599.',
  alternates: { canonical: 'https://zasupport.com/sme-support' },
  keywords: [
    'sme apple support johannesburg',
    'small business it support johannesburg',
    'business apple support south africa',
    'sme it solutions johannesburg',
    'apple business support hyde park',
    'managed it services sme johannesburg',
    'bee level 1 it provider',
    'apple software development johannesburg',
  ],
};

const serviceSchema = buildServiceSchema({
  name: 'SME Apple Support & Business IT Solutions',
  description:
    'Comprehensive Apple support, managed IT services, repairs, networking and software development for small and medium enterprises in Johannesburg. BEE Level 1 provider. Assessment from R599, R899/hr.',
  lowPrice: '599',
  highPrice: '8999',
});

const SME_FAQS = [
  {
    question: 'What Apple support services do you offer for SMEs in Johannesburg?',
    answer:
      'We provide a full IT ecosystem for small and medium businesses: managed Apple device fleets, JAMF MDM implementation, MacBook and iMac repairs with up-to-3 year warranties, specialist networking (UniFi, Meraki), Apple software development, procurement of new and refurbished hardware, and a dedicated account manager for every SME client. Everything is handled from our Hyde Park workshop and on-site across greater Johannesburg.',
  },
  {
    question: 'How much does SME IT support cost?',
    answer:
      'Our assessment starts from R599, and our standard rate is R899/hr. For ongoing managed support, we offer monthly SLA packages tailored to your team size and device count. We also provide business finance options for larger deployments, so you can spread the cost of hardware and setup over 12 to 36 months. Contact us for a bespoke quote.',
  },
  {
    question: 'Are you a BEE-accredited IT provider?',
    answer:
      'Yes. Vizibiliti Intelligent Solutions (Pty) Ltd, trading as ZA Support, is a BEE Level 1 services provider. This means procurement from us maximises your BEE scorecard points — particularly valuable for businesses tendering or working with government and corporate clients in South Africa.',
  },
  {
    question: 'Do you offer business finance for Apple hardware purchases?',
    answer:
      'We do. We partner with established business finance providers to offer 12, 24, and 36 month payment plans on Apple hardware, accessories, and deployment projects. This allows SMEs to equip their teams with current-generation MacBooks, iMacs, and iPads without a large upfront capital outlay. Finance is subject to approval.',
  },
  {
    question: 'What does your dedicated account manager service include?',
    answer:
      'Every SME client on a managed SLA receives a dedicated account manager who knows your business, your devices, and your team. They handle proactive monitoring, quarterly reviews, procurement planning, warranty tracking, and act as your single point of contact for all IT matters. No call centres, no ticket queues — direct access to someone who understands your environment.',
  },
  {
    question: 'Can you handle Apple software development for our business?',
    answer:
      'Yes. We build custom macOS and iOS applications, internal tools, workflow automations, and API integrations tailored to SME requirements. Whether you need a bespoke inventory system, a client-facing iPad app, or integration between your Apple fleet and existing business software, we handle the full development lifecycle from specification through to deployment and support.',
  },
  {
    question: 'How fast is your turnaround for business repairs?',
    answer:
      'SME clients on an SLA receive priority turnaround — most MacBook and iMac repairs are completed within 24 to 72 hours. We carry dedicated spare parts for common business models (MacBook Pro 14-inch, MacBook Air M2/M3, iMac 24-inch), which means we do not wait weeks for parts to arrive. Walk-in assessments take 30 to 60 minutes.',
  },
  {
    question: 'Do you provide networking and infrastructure for SMEs?',
    answer:
      'Absolutely. We design, deploy, and manage specialist networking solutions including UniFi access points and switches, Meraki cloud-managed networks, structured cabling, VPN configuration, and VLAN segmentation. We have seen too many small businesses running consumer-grade routers — proper business networking eliminates dropouts, improves security, and scales as your team grows.',
  },
];

const faqSchema = buildFaqSchema(SME_FAQS);

const breadcrumbSchema = buildBreadcrumbSchema([
  { name: 'Home', url: 'https://zasupport.com' },
  { name: 'SME Support', url: 'https://zasupport.com/sme-support' },
]);

const SME_SERVICES = [
  {
    icon: Monitor,
    title: 'Managed Apple Fleet',
    desc: 'Proactive monitoring, patching, and health checks across your entire Mac and iOS estate. We catch problems before your staff notice them.',
  },
  {
    icon: Wrench,
    title: 'Priority Repairs & Spare Parts',
    desc: 'Dedicated spare parts for business models. Component-level logic board repair saves thousands over Apple Store board replacements.',
  },
  {
    icon: Users,
    title: 'Dedicated Account Manager',
    desc: 'One person who knows your business, your devices, and your team. Direct contact — no call centres, no ticket queues.',
  },
  {
    icon: Network,
    title: 'Specialist Networking',
    desc: 'UniFi, Meraki, structured cabling, VPN, VLAN segmentation. Proper business-grade infrastructure that scales with your growth.',
  },
  {
    icon: FileCode,
    title: 'Apple Software Development',
    desc: 'Custom macOS and iOS apps, internal tools, workflow automations, and API integrations built specifically for your business.',
  },
  {
    icon: Shield,
    title: 'Industry-Leading Warranties',
    desc: 'Up-to-3 year warranty on all repairs. Written quotes before work begins. No Fix, No Fee on diagnostics.',
  },
  {
    icon: Package,
    title: 'Hardware Procurement & Finance',
    desc: 'New and refurbished Apple hardware with business finance options over 12 to 36 months. Equip your team without capital strain.',
  },
  {
    icon: BadgeCheck,
    title: 'BEE Level 1 Provider',
    desc: 'Maximise your BEE scorecard. Vizibiliti Intelligent Solutions (Pty) Ltd is a verified BEE Level 1 services provider.',
  },
];

const GROWTH_FEATURES = [
  {
    icon: Zap,
    title: 'Fastest Turnaround in Johannesburg',
    desc: 'SLA clients get priority repairs — most completed in 24 to 72 hours. We carry parts for common business models so nothing waits on shipping.',
  },
  {
    icon: Headphones,
    title: 'Personalised Service',
    desc: 'We work with SMEs of 2 to 200 people. Your account manager knows every device, every user, and every quirk of your setup. That is the ZA Support difference.',
  },
  {
    icon: Building2,
    title: 'Full IT Ecosystem',
    desc: 'Devices, networking, software, security, procurement, and ongoing support — all from one provider. No finger-pointing between vendors.',
  },
  {
    icon: Settings,
    title: 'Growth-Stage IT Support',
    desc: 'We have helped businesses scale from 3 Macs to 50. Our SLAs flex as you grow, adding devices and services without renegotiating from scratch.',
  },
];

export default function SMESupportPage() {
  return (
    <>
      <SchemaOrg schema={serviceSchema} />
      <SchemaOrg schema={faqSchema} />
      <SchemaOrg schema={breadcrumbSchema} />

      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <section className="hero-gradient grid-overlay pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <p className="text-[#0FEA7A] text-sm font-semibold uppercase tracking-widest mb-3">
              IT Specialist · SME Apple Support · Johannesburg
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#E8F4F1] leading-tight mb-6">
              Apple Support for
              <br />
              <span className="text-[#0FEA7A]">Growing Businesses</span>
            </h1>
            <p className="text-xl text-[#7A9E98] leading-relaxed max-w-3xl mb-8">
              Your business runs on Apple. We make sure it never stops. ZA Support delivers managed IT
              services, priority repairs, specialist networking, and Apple software development for SMEs
              across Johannesburg — backed by 16 years of expertise and a dedicated account manager for
              every client.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={buildWhatsAppUrl('SME-HERO', 'managed-services')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl font-bold hover:bg-[#0FEA7A]/90 transition-all"
              >
                <Phone className="w-5 h-5" /> Get a Business IT Quote
              </a>
              <Link
                href="/managed-services"
                className="inline-flex items-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all"
              >
                View Managed Services <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Trust Badges ─────────────────────────────────────────────────────── */}
      <section className="py-10 bg-[#0A1A18] border-b border-[rgba(15,234,122,0.08)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { value: '16 Years', label: 'Apple Expertise' },
              { value: 'BEE Level 1', label: 'Accredited Provider' },
              { value: SITE.rating + '\u2605', label: 'Google Rating' },
              { value: 'R899/hr', label: 'Transparent Pricing' },
            ].map((stat) => (
              <div key={stat.label} className="glass-card p-6 text-center">
                <span className="block text-3xl font-extrabold text-[#0FEA7A] mb-1">{stat.value}</span>
                <span className="text-[#7A9E98] text-sm">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why SMEs Choose ZA Support ───────────────────────────────────────── */}
      <section className="py-16 sm:py-24 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4">
              Why Johannesburg SMEs Choose ZA Support
            </h2>
            <p className="text-[#7A9E98] max-w-2xl mx-auto leading-relaxed">
              We have worked with small and medium businesses in Johannesburg since 2009. The most common
              mistake we see is companies treating IT as an afterthought until something breaks. Our approach
              is different — proactive support that prevents downtime and scales as you grow.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {GROWTH_FEATURES.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="flex gap-4 p-6 bg-[rgba(22,34,32,0.5)] rounded-xl border border-[rgba(15,234,122,0.08)] hover:border-[rgba(15,234,122,0.2)] transition-all"
              >
                <div className="w-12 h-12 bg-[rgba(15,234,122,0.1)] rounded-xl flex items-center justify-center flex-shrink-0">
                  <Icon className="w-6 h-6 text-[#0FEA7A]" />
                </div>
                <div>
                  <p className="text-[#E8F4F1] font-semibold text-lg mb-2">{title}</p>
                  <p className="text-[#7A9E98] leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Full Service Grid ────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-24 bg-[#111C1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4">
              Complete IT Services for Your Business
            </h2>
            <p className="text-[#7A9E98] max-w-2xl mx-auto leading-relaxed">
              From a single MacBook repair to a full fleet deployment with networking, software, and ongoing
              managed support. In our Hyde Park workshop, we handle everything under one roof — and we come
              to your office when you need us on-site.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SME_SERVICES.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="glass-card p-6 hover:border-[rgba(15,234,122,0.25)] transition-all group"
              >
                <div className="w-12 h-12 bg-[rgba(15,234,122,0.1)] rounded-xl flex items-center justify-center mb-4 group-hover:bg-[rgba(15,234,122,0.15)] transition-colors">
                  <Icon className="w-6 h-6 text-[#0FEA7A]" />
                </div>
                <h3 className="text-[#E8F4F1] font-semibold text-lg mb-2">{title}</h3>
                <p className="text-[#7A9E98] text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Deep Dive: How We Support Growing Businesses ─────────────────────── */}
      <section className="py-16 sm:py-24 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-6">
                IT Support Built for Growth-Stage Businesses
              </h2>
              <div className="space-y-4 text-[#7A9E98] leading-relaxed">
                <p>
                  Most IT providers in Johannesburg are geared towards either individual consumers or
                  large corporates. The gap in the middle — businesses with 3 to 50 Apple devices — is
                  exactly where ZA Support thrives. We have been filling that gap since 2009 from our
                  workshop at 1 Hyde Lane, Hyde Park, Second Floor, Office E2004, Johannesburg 2196.
                </p>
                <p>
                  When your team is growing, the last thing you need is IT friction. A MacBook that
                  will not boot, a network that drops during client calls, or a new starter waiting
                  two weeks for a configured device. Our SLA clients never experience that. We keep
                  spare parts in stock, configure devices before they arrive at your desk, and resolve
                  most issues within 24 hours.
                </p>
                <p>
                  We have seen businesses lose R20,000 or more per day in productivity because a
                  critical Mac was sent to the Apple Store and sat in a queue for two weeks. Our
                  component-level{' '}
                  <Link href="/logic-board-repair" className="text-[#0FEA7A] hover:underline">
                    logic board repair
                  </Link>{' '}
                  capability means we fix boards that other shops replace — saving you 40 to 70 percent
                  compared to a full board swap. That difference compounds across a fleet.
                </p>
                <p>
                  Beyond repairs, we handle your full IT ecosystem: JAMF MDM for device management,
                  UniFi and Meraki networking, macOS and iOS software development, hardware procurement
                  with business finance options, and ongoing monitoring that catches problems before
                  they become emergencies. One provider, one invoice, one person who knows your business.
                </p>
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-6">
                BEE Level 1 &amp; Business Finance
              </h2>
              <div className="space-y-4 text-[#7A9E98] leading-relaxed">
                <p>
                  Vizibiliti Intelligent Solutions (Pty) Ltd, trading as ZA Support, is a verified
                  BEE Level 1 services provider. For South African businesses that need to meet BEE
                  procurement targets — particularly those tendering for government or corporate
                  contracts — every rand spent with us counts at the maximum recognition level on
                  your scorecard.
                </p>
                <p>
                  We understand that equipping a team with current-generation Apple hardware requires
                  significant capital. That is why we offer business finance options through established
                  finance partners, allowing you to spread the cost of MacBooks, iMacs, iPads, and
                  deployment projects over 12, 24, or 36 months. Your team gets the tools they need
                  now, and your cash flow stays healthy.
                </p>
                <p>
                  Our Apple software development service is particularly popular with growth-stage
                  SMEs. Whether you need a custom internal tool built on macOS, a client-facing iPad
                  application, or workflow automations that connect your Apple fleet to existing
                  business systems, we handle the full development lifecycle. We build, deploy, and
                  support — no third-party handoffs.
                </p>
                <p>
                  The assessment fee starts from R599, and our standard rate is R899 per hour. For{' '}
                  <Link href="/enterprise" className="text-[#0FEA7A] hover:underline">
                    enterprise clients
                  </Link>{' '}
                  with larger fleets, we offer dedicated{' '}
                  <Link href="/managed-services" className="text-[#0FEA7A] hover:underline">
                    managed service agreements
                  </Link>{' '}
                  with fixed monthly pricing, quarterly business reviews, and guaranteed response
                  times. Every engagement starts with a transparent written quote — no surprises.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── How It Works ─────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-[#111C1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] text-center mb-14">
            Getting Started Is Simple
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: '01',
                title: 'Assessment',
                desc: 'We audit your current Apple environment — devices, networking, software, security. Assessment from R599.',
              },
              {
                step: '02',
                title: 'Proposal',
                desc: 'You receive a written proposal with clear scope, pricing, and timeline. No obligation, no pressure.',
              },
              {
                step: '03',
                title: 'Deployment',
                desc: 'We deploy, configure, and test everything. Devices arrive ready to use. Networking is stable from day one.',
              },
              {
                step: '04',
                title: 'Ongoing Support',
                desc: 'Your dedicated account manager handles monitoring, maintenance, repairs, and scaling. We grow with you.',
              },
            ].map(({ step, title, desc }) => (
              <div key={step} className="text-center">
                <div className="w-14 h-14 bg-[rgba(15,234,122,0.1)] rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-[#0FEA7A] font-extrabold text-lg">{step}</span>
                </div>
                <h3 className="text-[#E8F4F1] font-semibold text-lg mb-2">{title}</h3>
                <p className="text-[#7A9E98] text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Service Area ─────────────────────────────────────────────────────── */}
      <section className="py-16 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-card p-8">
            <div className="flex items-center gap-3 mb-6">
              <MapPin className="w-6 h-6 text-[#0FEA7A]" />
              <h2 className="text-2xl font-bold text-[#E8F4F1]">SME Service Area</h2>
            </div>
            <p className="text-[#7A9E98] mb-5 leading-relaxed">
              Based at 1 Hyde Lane, Hyde Park, Second Floor, Office E2004, Johannesburg 2196, we
              provide on-site SME support across greater Johannesburg. Whether your office is in
              Sandton, Rosebank, Fourways, Bryanston, Midrand, or Randburg, we collect, deliver,
              and come to you. Remote monitoring and support is available nationwide.
            </p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <p className="text-[#E8F4F1] font-semibold mb-3">On-site Support Areas</p>
                <div className="flex flex-wrap gap-2">
                  {[
                    'Hyde Park', 'Sandton', 'Rosebank', 'Fourways', 'Bryanston',
                    'Midrand', 'Randburg', 'Rivonia', 'Morningside', 'Parkhurst',
                    'Illovo', 'Houghton', 'Northcliff', 'Sunninghill', 'Paulshof',
                  ].map((area) => (
                    <span
                      key={area}
                      className="px-3 py-1.5 bg-[rgba(39,80,77,0.4)] border border-[rgba(15,234,122,0.12)] text-[#7A9E98] text-sm rounded-lg"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-[#E8F4F1] font-semibold mb-3">Contact &amp; Hours</p>
                <div className="space-y-2 text-[#7A9E98] text-sm">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-[#0FEA7A]" />
                    <span>063 529 5863 (IT Specialist)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#0FEA7A]" />
                    <span>{CONTACT.hours.weekdays}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#0FEA7A]" />
                    <span>Same-day assessment for walk-ins before 14:00</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ Section ──────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-24 bg-[#111C1A]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQAccordion items={SME_FAQS} title="SME Apple Support — Frequently Asked Questions" />
        </div>
      </section>

      {/* ── Internal Links ───────────────────────────────────────────────────── */}
      <section className="py-12 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#E8F4F1] mb-6 text-center">Related Services</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                href: '/enterprise',
                title: 'Enterprise Support',
                desc: 'Managed IT for larger Apple fleets',
              },
              {
                href: '/managed-services',
                title: 'Managed Services',
                desc: 'Monthly SLA coverage and monitoring',
              },
              {
                href: '/logic-board-repair',
                title: 'Logic Board Repair',
                desc: 'Component-level Mac repair',
              },
              {
                href: '/contact',
                title: 'Contact Us',
                desc: 'Get a free business IT consultation',
              },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="glass-card p-5 hover:border-[rgba(15,234,122,0.25)] transition-all group"
              >
                <p className="text-[#E8F4F1] font-semibold mb-1 group-hover:text-[#0FEA7A] transition-colors">
                  {link.title}
                </p>
                <p className="text-[#7A9E98] text-sm">{link.desc}</p>
                <ArrowRight className="w-4 h-4 text-[#0FEA7A] mt-2 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────────── */}
      <section className="py-16 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-[rgba(39,80,77,0.3)] border border-[rgba(15,234,122,0.2)] rounded-3xl p-10">
            <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3">
              Ready to Upgrade Your Business IT?
            </h2>
            <p className="text-[#7A9E98] mb-6">
              Assessment from R599. BEE Level 1 provider. 1 Hyde Lane, Hyde Park, Johannesburg 2196.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={buildWhatsAppUrl('SME-CTA', 'managed-services')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl font-bold hover:bg-[#0FEA7A]/90 transition-all"
              >
                <Phone className="w-5 h-5" /> WhatsApp Us Now
              </a>
              <a
                href="tel:+27635295863"
                className="inline-flex items-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all"
               target="_blank" rel="noopener noreferrer">
                <Phone className="w-5 h-5" /> Call 063 529 5863
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
