import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Phone, Shield, Clock, ArrowRight, Award, Building2, Cpu, Wifi,
  Monitor, Tablet, Users, Wrench, Briefcase, Globe, CheckCircle,
  Headphones, Layers, Zap, MapPin,
} from 'lucide-react';
import SchemaOrg from '@/components/seo/SchemaOrg';
import { buildFaqSchema, buildServiceSchema, buildBreadcrumbSchema } from '@/lib/schema';
import { CONTACT, SITE, buildWhatsAppUrl } from '@/lib/constants';
import FAQAccordion from '@/components/ui/FAQ';

export const metadata: Metadata = {
  title: 'Enterprise Apple Support Johannesburg | Fleet Management & MDM | ZA Support',
  description:
    'Enterprise Apple fleet management, MDM implementation, and dedicated IT support for businesses in Johannesburg. BEE Level 1 provider. Assessment from R599. R899/hr. Call 064 529 5863.',
  alternates: { canonical: 'https://zasupport.com/enterprise' },
  keywords: [
    'enterprise apple support johannesburg',
    'apple fleet management south africa',
    'mdm implementation johannesburg',
    'corporate apple support gauteng',
    'bee level 1 it provider johannesburg',
    'enterprise mac support',
    'apple device lifecycle management',
    'corporate it support hyde park',
    'unifi enterprise wifi johannesburg',
    'microsoft partner south africa',
  ],
};

const serviceSchema = buildServiceSchema({
  name: 'Enterprise Apple Support & Fleet Management',
  description:
    'Enterprise-grade Apple fleet management, MDM implementation, device lifecycle management, and dedicated IT support for businesses across Johannesburg and Gauteng. BEE Level 1 certified provider.',
  lowPrice: '599',
  highPrice: '25000',
});

const breadcrumbSchema = buildBreadcrumbSchema([
  { name: 'Home', url: 'https://zasupport.com' },
  { name: 'Enterprise', url: 'https://zasupport.com/enterprise' },
]);

const enterpriseFaqs = [
  {
    question: 'What does enterprise Apple fleet management include?',
    answer:
      'Our enterprise Apple fleet management covers the full device lifecycle: procurement advisory, MDM enrolment (JAMF Pro, JAMF Now, or Apple Business Manager), zero-touch deployment, automated software distribution, security policy enforcement, remote wipe and lock, asset tracking, and end-of-life data sanitisation. We manage fleets from 5 to 500+ devices across MacBook, iMac, iPhone, and iPad.',
  },
  {
    question: 'Are you a BEE Level 1 services provider?',
    answer:
      'Yes. Vizibiliti Intelligent Solutions (Pty) Ltd, trading as ZA Support, is a BEE Level 1 contributor. We are committed to youth development and women empowerment programmes within the technology sector. Our BEE certificate is available on request for procurement and tender documentation.',
  },
  {
    question: 'What MDM solutions do you implement?',
    answer:
      'We implement and manage JAMF Pro, JAMF Now, Apple Business Manager, and Mosyle. For most South African businesses, we recommend JAMF Pro for its depth of policy control and integration with Active Directory and Azure AD. We handle the full implementation: Apple Business Manager registration, device enrolment, configuration profiles, app deployment, and ongoing management.',
  },
  {
    question: 'Do you offer dedicated account management for enterprises?',
    answer:
      'Yes. Every enterprise client is assigned a dedicated account manager who serves as your single point of contact. Your account manager conducts quarterly business reviews, manages escalations, coordinates on-site visits, and ensures SLA compliance. For C-Suite executives, we provide priority white-glove support with sub-2-hour response times.',
  },
  {
    question: 'What enterprise networking and WiFi services do you provide?',
    answer:
      'We are UniFi specialists and deploy enterprise-grade Ubiquiti UniFi networks across offices, farms, large commercial buildings, and national keypoint sites. Our services include site surveys, heat mapping, access point placement, VLAN segmentation, guest network isolation, and 24/7 network monitoring. We also integrate with existing Cisco, Meraki, and Aruba infrastructure where required.',
  },
  {
    question: 'What software platforms do you support for enterprise clients?',
    answer:
      'Beyond Apple ecosystem management, we provide full support for Adobe Creative Cloud (licensing, deployment, troubleshooting), Archicad and BIM software for architecture firms, Revit integration on Mac via Parallels or Boot Camp, and Microsoft 365 as a Microsoft Partner. We handle licensing, deployment, updates, and user support across all platforms.',
  },
  {
    question: 'How does your enterprise pricing work?',
    answer:
      'Enterprise engagements begin with a comprehensive IT assessment from R599. Our standard hourly rate is R899/hr for ad-hoc work. For ongoing support, we offer monthly SLA packages tailored to your fleet size, response time requirements, and scope of services. SLA clients receive priority queuing, dedicated spare parts inventory, and discounted hourly rates. Contact us for a custom proposal.',
  },
  {
    question: 'Do you support field teams with iPad and iPhone deployments?',
    answer:
      'Yes. We specialise in sales force and field team deployments. This includes bulk iPad configuration, kiosk mode setup for point-of-sale and demo environments, mobile device management for remote teams, VPN and secure email configuration, and ongoing remote support. We have deployed and managed field fleets for medical practices, retail operations, and sales teams across South Africa.',
  },
];

const awards = [
  {
    icon: Award,
    title: 'Forbes 30 Under 30',
    subtitle: 'Technology Innovator',
    accent: 'text-yellow-400',
  },
  {
    icon: Award,
    title: 'Absa Technology Innovator',
    subtitle: 'Runner-up',
    accent: 'text-blue-400',
  },
  {
    icon: Award,
    title: 'Verizon Digital Innovation',
    subtitle: 'Winner',
    accent: 'text-purple-400',
  },
  {
    icon: Award,
    title: 'Santam InsurTech of the Year',
    subtitle: 'Runner-up',
    accent: 'text-red-400',
  },
];

const enterpriseServices = [
  {
    icon: Monitor,
    title: 'Apple Fleet Management',
    description:
      'End-to-end lifecycle management for MacBook, iMac, iPhone, and iPad fleets. Procurement, deployment, maintenance, and retirement handled under one roof.',
  },
  {
    icon: Shield,
    title: 'MDM Implementation',
    description:
      'JAMF Pro, JAMF Now, and Apple Business Manager setup. Zero-touch deployment, security policies, remote wipe, and automated compliance enforcement.',
  },
  {
    icon: Layers,
    title: 'Device Lifecycle Management',
    description:
      'Asset tracking from procurement to decommissioning. Warranty management, refresh cycles, certified data sanitisation, and responsible e-waste disposal.',
  },
  {
    icon: Wrench,
    title: 'Dedicated Spare Parts',
    description:
      'Enterprise clients receive a dedicated spare parts inventory. Screens, batteries, SSDs, and logic boards held in stock for your specific fleet models, reducing downtime to hours, not days.',
  },
  {
    icon: Briefcase,
    title: 'C-Suite Executive Support',
    description:
      'White-glove priority support for executives. Sub-2-hour response times, on-site visits, loaner devices, and discreet after-hours assistance when needed.',
  },
  {
    icon: Users,
    title: 'Dedicated Account Manager',
    description:
      'A single point of contact who understands your business. Quarterly reviews, proactive maintenance scheduling, budget forecasting, and escalation management.',
  },
  {
    icon: Zap,
    title: 'Fastest Turnaround',
    description:
      'SLA-backed response and resolution times. Priority queuing, pre-staged spare parts, and an in-house repair workshop at Hyde Park mean we resolve faster than any competitor in Johannesburg.',
  },
  {
    icon: Globe,
    title: 'Full Internal IT Integration',
    description:
      'We integrate with your existing infrastructure: Active Directory, Azure AD, Google Workspace, VPN, SIEM, and ticketing systems. We become an extension of your internal IT team.',
  },
  {
    icon: Tablet,
    title: 'Sales Force & Field Support',
    description:
      'iPad configurations for sales teams, kiosk mode for demos, remote device management for field workers, and bulk MDM enrolment for distributed teams across South Africa.',
  },
];

const techPartners = [
  { icon: Wifi, title: 'UniFi Networking', description: 'Enterprise WiFi for offices, farms, large buildings, and national keypoint sites. Site surveys, VLAN segmentation, and 24/7 monitoring.' },
  { icon: Monitor, title: 'Apple Ecosystem', description: 'macOS, iOS, iPadOS fleet management. JAMF Pro, Apple Business Manager, and zero-touch deployment.' },
  { icon: Cpu, title: 'Adobe Creative Cloud', description: 'Licensing, deployment, and troubleshooting for creative teams. Photoshop, Illustrator, InDesign, Premiere Pro.' },
  { icon: Building2, title: 'Archicad & BIM', description: 'Architecture and engineering software support. Archicad, BIM workflows, Revit integration via Parallels.' },
  { icon: Headphones, title: 'Microsoft Partner', description: 'Microsoft 365 deployment, Azure AD integration, Teams, SharePoint, and Exchange management.' },
  { icon: Wifi, title: 'Advanced WiFi', description: 'Coverage for farms, warehouses, multi-storey buildings, and national keypoint facilities. Ubiquiti, Cisco, and Meraki.' },
];

export default function EnterprisePage() {
  const faqSchema = buildFaqSchema(enterpriseFaqs);

  return (
    <>
      <SchemaOrg schema={serviceSchema} />
      <SchemaOrg schema={faqSchema} />
      <SchemaOrg schema={breadcrumbSchema} />

      {/* Hero */}
      <section className="hero-gradient grid-overlay pt-24 pb-12 sm:pt-32 sm:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <p className="text-[#0FEA7A] text-sm font-semibold uppercase tracking-widest mb-3">
              Enterprise Apple Support · BEE Level 1 Provider · Hyde Park, Johannesburg
            </p>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#E8F4F1] leading-[1.05] mb-6">
              Enterprise Apple Support
              <br />
              <span className="text-[#0FEA7A] glow-text-green">Fleet Management & MDM</span>
            </h1>

            <p className="text-base sm:text-lg text-[#7A9E98] mb-8 max-w-2xl leading-relaxed">
              We have managed Apple fleets for medical practices, architecture firms, and corporate offices across Johannesburg since 2009. From 5 devices to 500+, our in-house team handles procurement, MDM, repairs, and ongoing IT support under one SLA. Assessment from R599. R899/hr.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 sm:flex sm:gap-8 mb-8">
              {[
                { value: SITE.yearsExperience + ' Years', label: 'Enterprise Experience' },
                { value: SITE.rating + '\u2605', label: 'Google Rating' },
                { value: 'BEE 1', label: 'Contributor Level' },
              ].map((stat) => (
                <div key={stat.label}>
                  <span className="block text-3xl sm:text-4xl font-extrabold text-[#0FEA7A]">
                    {stat.value}
                  </span>
                  <span className="text-[#7A9E98] text-sm">{stat.label}</span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={buildWhatsAppUrl('ENT-HERO', 'managed-services')}
                target="_blank"
                rel="noopener noreferrer"
                data-ref="ENT-HERO"
                className="inline-flex items-center justify-center gap-3 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 hover:shadow-[0_0_32px_rgba(15,234,122,0.5)] transition-all"
              >
                WhatsApp for Enterprise Quote
              </a>
              <a
                href={`tel:${CONTACT.phoneTel}`}
                data-ref="ENT-HERO-CALL"
                className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all">
                <Phone className="w-5 h-5" />
                Call {CONTACT.phone}
              </a>
            </div>

            <p className="mt-4 text-[#7A9E98] text-sm">
              1 Hyde Lane, Hyde Park, Second Floor, Office E2004, Johannesburg 2196 · Mon-Fri 08:00-17:30
            </p>
          </div>
        </div>
      </section>

      {/* Trust Strip */}
      <section className="bg-[#111C1A] border-y border-[rgba(15,234,122,0.1)] py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-6 sm:gap-10 overflow-x-auto pb-1 sm:flex-wrap sm:justify-center">
            {[
              { icon: Shield, label: 'BEE Level 1 Provider' },
              { icon: Clock, label: 'Fastest Turnaround' },
              { icon: Users, label: 'Dedicated Account Manager' },
              { icon: Wrench, label: 'In-House Repair Workshop' },
              { icon: MapPin, label: 'Hyde Park, JHB' },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 text-[#E8F4F1]">
                <Icon className="w-4 h-4 text-[#0FEA7A] flex-shrink-0" />
                <span className="text-sm font-medium whitespace-nowrap">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enterprise Services Grid */}
      <section className="py-24 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-4xl sm:text-5xl font-extrabold text-[#E8F4F1] mb-4">
              Enterprise Services.
              <span className="text-[#0FEA7A]"> Built for Scale.</span>
            </h2>
            <p className="text-[#7A9E98] text-lg max-w-2xl mx-auto">
              In our Hyde Park workshop, we have built enterprise IT operations for organisations ranging from 5-person medical practices to 200-seat corporate offices. Every service below is delivered by our in-house team, never outsourced.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {enterpriseServices.map((service) => {
              const Icon = service.icon;
              return (
                <div key={service.title} className="glass-card p-6 flex flex-col">
                  <div className="w-12 h-12 bg-[rgba(15,234,122,0.08)] rounded-xl flex items-center justify-center mb-5">
                    <Icon className="w-6 h-6 text-[#0FEA7A]" />
                  </div>
                  <h3 className="text-[#E8F4F1] text-xl font-bold mb-2">
                    {service.title}
                  </h3>
                  <p className="text-[#7A9E98] text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* BEE & Social Impact */}
      <section className="py-24 bg-[#111C1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-[#0FEA7A] text-xs font-semibold uppercase tracking-widest mb-2">
                Social Impact & Transformation
              </p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-6">
                BEE Level 1 Contributor
              </h2>
              <div className="space-y-4 text-[#7A9E98] leading-relaxed">
                <p>
                  Vizibiliti Intelligent Solutions (Pty) Ltd, trading as ZA Support, holds BEE Level 1 contributor status. This is not a box-ticking exercise for us. We actively invest in youth development and women empowerment within the technology sector.
                </p>
                <p>
                  Our internship programme brings young South Africans into the Apple repair and IT support industry, providing hands-on mentorship alongside our senior engineers. We believe that building technical skills in underrepresented communities is not just good business; it is essential for the future of technology in South Africa.
                </p>
                <p>
                  For enterprise procurement teams, our BEE Level 1 status means maximum B-BBEE points on your scorecard. Our certificate and supporting documentation are available on request for RFPs, tenders, and compliance audits.
                </p>
              </div>
            </div>
            <div className="space-y-4">
              {[
                { label: 'BEE Level', value: 'Level 1 Contributor' },
                { label: 'Youth Development', value: 'Active internship & mentorship programme' },
                { label: 'Women Empowerment', value: 'Technology sector skills development' },
                { label: 'Legal Entity', value: 'Vizibiliti Intelligent Solutions (Pty) Ltd' },
                { label: 'Founded', value: '2009' },
              ].map((item) => (
                <div key={item.label} className="flex gap-4 p-4 bg-[rgba(22,34,32,0.5)] rounded-xl border border-[rgba(15,234,122,0.08)]">
                  <div>
                    <p className="text-[#7A9E98] text-xs uppercase tracking-wider mb-1">{item.label}</p>
                    <p className="text-[#E8F4F1] font-semibold text-sm">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Technology Partners */}
      <section className="py-24 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-4xl sm:text-5xl font-extrabold text-[#E8F4F1] mb-4">
              Technology Platforms
              <span className="text-[#0FEA7A]"> We Support</span>
            </h2>
            <p className="text-[#7A9E98] text-lg max-w-2xl mx-auto">
              We are not a one-platform shop. In our experience, enterprise environments demand cross-platform expertise. We deliver it with the same precision across every vendor.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {techPartners.map((partner) => {
              const Icon = partner.icon;
              return (
                <div key={partner.title} className="flex gap-5 p-6 rounded-2xl bg-[rgba(22,34,32,0.5)] border border-[rgba(15,234,122,0.1)] hover:border-[rgba(15,234,122,0.25)] transition-all">
                  <div className="w-12 h-12 bg-[rgba(15,234,122,0.1)] rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-[#0FEA7A]" />
                  </div>
                  <div>
                    <h3 className="text-[#E8F4F1] font-bold text-lg mb-1">{partner.title}</h3>
                    <p className="text-[#7A9E98] text-sm leading-relaxed">{partner.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Awards */}
      <section className="py-24 bg-[#111C1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-4xl sm:text-5xl font-extrabold text-[#E8F4F1] mb-4">
              Awards &
              <span className="text-[#0FEA7A]"> Recognition</span>
            </h2>
            <p className="text-[#7A9E98] text-lg max-w-2xl mx-auto">
              Our work has been recognised by some of the most respected names in technology and business innovation. These awards reflect a consistent commitment to building solutions that matter.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {awards.map((award) => {
              const Icon = award.icon;
              return (
                <div key={award.title} className="glass-card p-6 text-center">
                  <div className="w-14 h-14 bg-[rgba(15,234,122,0.08)] rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Icon className={`w-7 h-7 ${award.accent}`} />
                  </div>
                  <h3 className="text-[#E8F4F1] font-bold text-lg mb-1">{award.title}</h3>
                  <p className="text-[#7A9E98] text-sm">{award.subtitle}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Enterprise Clients Choose Us */}
      <section className="py-24 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-4xl sm:text-5xl font-extrabold text-[#E8F4F1] mb-4">
              Why Enterprise Clients
              <span className="text-[#0FEA7A]"> Choose Us</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {[
              {
                icon: CheckCircle,
                title: 'Single-Vendor Simplicity',
                desc: 'Repairs, MDM, networking, software, and ongoing support from one team. No finger-pointing between vendors. One SLA, one invoice, one accountable partner.',
              },
              {
                icon: Wrench,
                title: 'In-House Component-Level Repair',
                desc: 'When a MacBook logic board fails, we repair it in our Hyde Park workshop at component level. Other MSPs send devices away for weeks. We fix them in days, often hours.',
              },
              {
                icon: Shield,
                title: 'Security-First Architecture',
                desc: 'FileVault encryption enforcement, firewall policies, endpoint detection, and automated compliance auditing. We have seen the consequences of lax security in medical and legal environments. We do not take shortcuts.',
              },
              {
                icon: Clock,
                title: 'SLA-Backed Response Times',
                desc: 'Our enterprise SLAs guarantee response times from 30 minutes for critical issues. We monitor your fleet 24/7 and often detect and resolve problems before your users notice them.',
              },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex gap-5 p-6 rounded-2xl bg-[rgba(22,34,32,0.5)] border border-[rgba(15,234,122,0.1)] hover:border-[rgba(15,234,122,0.25)] transition-all">
                <div className="w-12 h-12 bg-[rgba(15,234,122,0.1)] rounded-xl flex items-center justify-center flex-shrink-0">
                  <Icon className="w-6 h-6 text-[#0FEA7A]" />
                </div>
                <div>
                  <h3 className="text-[#E8F4F1] font-bold text-lg mb-2">{title}</h3>
                  <p className="text-[#7A9E98] text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 glass-card p-8">
            <h3 className="text-2xl font-extrabold text-[#E8F4F1] mb-4">How We Work With Enterprise Clients</h3>
            <div className="space-y-4 text-[#7A9E98] leading-relaxed">
              <p>
                Every enterprise engagement begins with a comprehensive IT assessment. We audit your current Apple fleet, network infrastructure, security posture, and software licensing. This is not a generic checklist. We sit with your team, understand your workflows, and identify the specific gaps that are costing you time and money. The assessment fee starts from R599 and is credited against your first SLA invoice.
              </p>
              <p>
                From there, we build a tailored support plan. The most common mistake we see with corporate Apple deployments in Johannesburg is organisations treating Macs like Windows machines, applying the wrong management tools, missing macOS-specific security settings, and ignoring the Apple ecosystem integrations that make the platform productive. We fix that from day one.
              </p>
              <p>
                Our standard rate is R899/hr for ad-hoc work, but most enterprise clients opt for a monthly SLA that includes proactive monitoring, priority response, dedicated spare parts, and a fixed monthly cost. Whether you are a 10-person architecture firm running Archicad on MacBook Pro or a 200-seat corporate office with iPads for your field sales team, we scale our service to your requirements.
              </p>
              <p>
                We integrate fully with your internal IT infrastructure. Active Directory, Azure AD, Google Workspace, your existing ticketing system, your VPN: we plug into all of it. For many of our clients, particularly medical practices and SMEs, we effectively become their outsourced IT department. For larger organisations, we augment your internal team with Apple-specific expertise they may lack.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Internal Links Section */}
      <section className="py-16 bg-[#111C1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-8 text-center">
            Explore Our Services
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { href: '/managed-services', label: 'Managed IT Services', desc: 'Monthly SLA coverage for businesses' },
              { href: '/logic-board-repair', label: 'Logic Board Repair', desc: 'Component-level board repair' },
              { href: '/about', label: 'About ZA Support', desc: '16 years of Apple expertise' },
              { href: '/contact', label: 'Contact Us', desc: 'Book an enterprise assessment' },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group p-6 rounded-2xl bg-[rgba(22,34,32,0.5)] border border-[rgba(15,234,122,0.1)] hover:border-[rgba(15,234,122,0.25)] transition-all"
              >
                <h3 className="text-[#E8F4F1] font-bold mb-1 group-hover:text-[#0FEA7A] transition-colors">
                  {link.label}
                </h3>
                <p className="text-[#7A9E98] text-sm">{link.desc}</p>
                <span className="text-[#7A9E98] group-hover:text-[#0FEA7A] transition-colors flex items-center gap-1 text-sm mt-3">
                  Learn more <ArrowRight className="w-3 h-3" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQAccordion items={enterpriseFaqs} title="Enterprise Support FAQs" />
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-[rgba(39,80,77,0.3)] border border-[rgba(15,234,122,0.2)] rounded-3xl p-12">
            <h2 className="text-4xl sm:text-5xl font-extrabold text-[#E8F4F1] mb-4">
              Ready to Scale Your Apple IT?
            </h2>
            <p className="text-[#7A9E98] text-lg mb-8 max-w-2xl mx-auto">
              Book an enterprise IT assessment from R599. We will audit your fleet, identify gaps, and deliver a tailored support proposal within 48 hours. BEE Level 1 certified. R899/hr standard rate.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={buildWhatsAppUrl('ENT-CTA', 'managed-services')}
                target="_blank"
                rel="noopener noreferrer"
                data-ref="ENT-CTA"
                className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 hover:shadow-[0_0_32px_rgba(15,234,122,0.4)] transition-all"
              >
                WhatsApp for Enterprise Quote
              </a>
              <a
                href={`tel:${CONTACT.phoneTel}`}
                data-ref="ENT-CTA-CALL"
                className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all">
                <Phone className="w-5 h-5" />
                Call {CONTACT.phone}
              </a>
            </div>
            <p className="mt-6 text-[#7A9E98] text-sm">
              1 Hyde Lane, Hyde Park, Second Floor, Office E2004, Johannesburg 2196 · Mon-Fri 08:00-17:30
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
