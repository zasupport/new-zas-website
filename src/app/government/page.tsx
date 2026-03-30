import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, Shield, Building2, ArrowRight, MapPin, CheckCircle, Lock, Monitor, Users, FileCheck, Landmark } from 'lucide-react';
import SchemaOrg from '@/components/seo/SchemaOrg';
import FAQAccordion from '@/components/ui/FAQ';
import { buildFaqSchema, buildServiceSchema, buildBreadcrumbSchema } from '@/lib/schema';
import { CONTACT, SITE, buildWhatsAppUrl } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Government IT Services South Africa | BEE Level 1 Apple Specialist | ZA Support',
  description:
    'BEE Level 1 government IT services provider. CSD registered Apple specialist for GCIS, Treasury, Presidency & departments. Secure fleet management, POPIA compliance. From R599.',
  alternates: { canonical: 'https://zasupport.com/government' },
  keywords: [
    'government IT services south africa',
    'BEE level 1 IT provider',
    'CSD registered IT company',
    'government apple support',
    'government fleet management',
    'POPIA compliance IT',
    'government device management',
    'BEE IT company johannesburg',
    'government IT security',
    'apple MDM government',
  ],
  openGraph: {
    title: 'Government IT Services South Africa | BEE Level 1 | ZA Support',
    description: 'CSD registered, BEE Level 1 Apple IT specialist for South African government departments. Secure fleet management, POPIA compliance, device lifecycle.',
    url: 'https://zasupport.com/government',
    type: 'website',
    images: [{ url: 'https://zasupport.com/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Government IT Services South Africa | BEE Level 1 | ZA Support',
    description: 'CSD registered, BEE Level 1 Apple IT specialist for South African government departments.',
    images: ['https://zasupport.com/og-image.png'],
  },
};

const GOV_FAQS = [
  {
    question: 'Is ZA Support registered on the Central Supplier Database (CSD)?',
    answer: 'Yes. ZA Support is fully registered on the Central Supplier Database and compliant with all National Treasury procurement requirements. Contact us for our CSD details and BEE certificate.',
  },
  {
    question: 'What is your BEE level and do you qualify for government procurement?',
    answer: 'ZA Support operates as a BEE Level 1 services provider. This means government departments receive maximum preferential procurement points when contracting our services. We actively support youth empowerment, women in technology, and broad-based economic transformation through our operational model.',
  },
  {
    question: 'Which government departments do you currently serve?',
    answer: 'We have experience supporting departments including GCIS (Government Communication and Information System), the Presidency, UIF (Unemployment Insurance Fund), Legal Aid South Africa, National Treasury, and the South African Secret Service. Our secure protocols meet the stringent requirements of intelligence and defence environments.',
  },
  {
    question: 'How do you handle government-grade data security requirements?',
    answer: 'All government engagements follow strict data handling protocols. We provide full-disk encryption enforcement via FileVault, remote wipe capabilities through Apple MDM, POPIA-compliant data processing agreements, audit trails for all device interactions, and secure chain-of-custody documentation for hardware servicing. Devices containing classified information are serviced on-site when required.',
  },
  {
    question: 'Can you manage Apple device fleets for government offices?',
    answer: 'Absolutely. We specialise in Apple fleet management using industry-standard MDM solutions tailored for government environments. This includes zero-touch device deployment, automated security policy enforcement, application whitelisting, remote configuration management, and compliance reporting. We currently manage fleets ranging from 10 to 500+ Apple devices across multiple government sites.',
  },
  {
    question: 'What does your government IT assessment include?',
    answer: 'Our government IT assessment starts from R599 and covers a comprehensive audit of your current Apple infrastructure. This includes device inventory and lifecycle analysis, security posture evaluation, POPIA compliance gap analysis, network security review, and recommendations for fleet standardisation. A detailed written report with costed recommendations is provided within 5 business days.',
  },
  {
    question: 'Do you provide POPIA compliance support for government departments?',
    answer: 'Yes. POPIA compliance is built into every service we deliver. We implement technical controls including encryption at rest and in transit, access control policies, automated data retention enforcement, breach notification workflows, and consent management systems. We also provide staff awareness training tailored to government data handling requirements under the Protection of Personal Information Act.',
  },
  {
    question: 'What is your turnaround time for government device repairs?',
    answer: 'Standard government device repairs are completed within 3 to 5 business days. For departments with active SLA agreements, we offer priority turnaround of 24 to 48 hours. Emergency on-site support is available for critical infrastructure. All repairs carry an up-to-3 year warranty and include full chain-of-custody documentation required for government asset management.',
  },
];

const serviceSchema = buildServiceSchema({
  name: 'Government IT Services South Africa',
  description: 'BEE Level 1, CSD registered Apple IT specialist providing secure fleet management, POPIA compliance, device lifecycle management and government-grade security for South African government departments.',
  lowPrice: '599',
});

const faqSchema = buildFaqSchema(GOV_FAQS);

const breadcrumbSchema = buildBreadcrumbSchema([
  { name: 'Home', url: 'https://zasupport.com' },
  { name: 'Government IT Services', url: 'https://zasupport.com/government' },
]);

const DEPARTMENTS_SERVED = [
  { name: 'GCIS', full: 'Government Communication and Information System' },
  { name: 'Presidency', full: 'The Presidency of South Africa' },
  { name: 'UIF', full: 'Unemployment Insurance Fund' },
  { name: 'Legal Aid SA', full: 'Legal Aid South Africa' },
  { name: 'National Treasury', full: 'National Treasury' },
  { name: 'Secret Service', full: 'South African Secret Service' },
];

const GOV_SERVICES = [
  {
    icon: Monitor,
    title: 'Secure Apple Fleet Management',
    desc: 'Zero-touch deployment, automated policy enforcement, and compliance monitoring across government Apple estates. We have managed fleets from 10 devices in municipal offices to 500+ across national departments.',
  },
  {
    icon: Lock,
    title: 'Government-Grade Data Security',
    desc: 'FileVault enforcement, remote wipe, application whitelisting, and full audit trails. Our security protocols meet the requirements of intelligence and defence environments where classified data handling is mandatory.',
  },
  {
    icon: FileCheck,
    title: 'POPIA Compliance Implementation',
    desc: 'End-to-end technical controls for Protection of Personal Information Act compliance. Encryption, access control, data retention automation, breach notification workflows, and consent management tailored to government operations.',
  },
  {
    icon: Shield,
    title: 'Device Lifecycle Management',
    desc: 'From procurement advisory through deployment, maintenance, and secure decommissioning. We ensure government assets are tracked, maintained, and disposed of in compliance with PFMA and National Treasury asset management guidelines.',
  },
  {
    icon: Building2,
    title: 'Apple MDM for Government Offices',
    desc: 'Industry-standard Mobile Device Management configured for government security requirements. Remote configuration, application distribution, security policy enforcement, and real-time compliance dashboards for IT managers.',
  },
  {
    icon: Users,
    title: 'Staff Training and Awareness',
    desc: 'Hands-on training programmes for government employees transitioning to Apple platforms. Includes cybersecurity awareness, POPIA data handling protocols, and productivity workflows aligned with government standard operating procedures.',
  },
];

const BEE_HIGHLIGHTS = [
  'BEE Level 1 contributor — maximum preferential procurement points',
  'Youth employment and skills development programmes',
  'Women empowerment through technology training initiatives',
  'Enterprise and supplier development for emerging IT businesses',
  'CSD registered — details available on request',
  'Compliant with Preferential Procurement Policy Framework Act',
];

export default function GovernmentPage() {
  const waUrl = buildWhatsAppUrl('GOV-HERO', 'managed-services');

  return (
    <>
      <SchemaOrg schema={serviceSchema} />
      <SchemaOrg schema={faqSchema} />
      <SchemaOrg schema={breadcrumbSchema} />

      {/* Hero */}
      <section className="hero-gradient grid-overlay pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <p className="text-[#0FEA7A] text-sm font-semibold uppercase tracking-widest mb-3">
              BEE Level 1 · CSD Registered · Government IT Specialist
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#E8F4F1] leading-tight mb-6">
              Government IT Services
              <br /><span className="text-[#0FEA7A]">South Africa</span>
            </h1>
            <p className="text-xl text-[#7A9E98] leading-relaxed max-w-3xl mb-8">
              ZA Support is a BEE Level 1, CSD registered Apple IT specialist serving South African
              government departments since 2009. From the Presidency to Legal Aid South Africa, we deliver
              secure fleet management, POPIA compliance, and device lifecycle solutions that meet the
              stringent requirements of public sector procurement.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl font-bold hover:bg-[#0FEA7A]/90 transition-all"
              >
                <Phone className="w-5 h-5" /> Get a Government IT Quote
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all"
              >
                Send Enquiry <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-12 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {[
              { value: 'Level 1', label: 'BEE Contributor Status' },
              { value: 'CSD', label: 'Registered Supplier' },
              { value: SITE.yearsExperience + ' Years', label: 'Apple Expertise' },
              { value: SITE.rating + '\u2605', label: 'Google Rating' },
            ].map((stat) => (
              <div key={stat.label} className="glass-card p-6 text-center">
                <span className="block text-4xl font-extrabold text-[#0FEA7A] mb-1">{stat.value}</span>
                <span className="text-[#7A9E98] text-sm">{stat.label}</span>
              </div>
            ))}
          </div>

          {/* BEE and Government Procurement */}
          <div className="glass-card p-8 mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
              <div>
                <p className="text-[#0FEA7A] text-xs font-semibold uppercase tracking-widest mb-2">Transformation</p>
                <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-4">
                  BEE Level 1 Services Provider
                </h2>
                <p className="text-[#7A9E98] leading-relaxed mb-4">
                  Government departments that prioritise broad-based economic empowerment in their IT procurement
                  benefit most from engaging BEE Level 1 suppliers. In our experience working with departments such
                  as the Department of Public Service and Administration (DPSA), the Department of Women, Youth and
                  Persons with Disabilities, and National Treasury, BEE scoring carries significant weight in
                  tender evaluations &mdash; often 20 to 30 points out of 100.
                </p>
                <p className="text-[#7A9E98] leading-relaxed mb-4">
                  Departments with large Apple estates, including the Presidency, GCIS, and certain units within
                  the South African Secret Service, require IT partners who combine technical Apple expertise with
                  full BEE compliance. This is precisely where ZA Support excels. We are not a generalist IT company
                  that happens to support Apple &mdash; we are Apple specialists first, with 16 years of focused
                  expertise in Mac and iOS ecosystems.
                </p>
                <p className="text-[#7A9E98] leading-relaxed">
                  Our BEE Level 1 status means government procurement officers receive the maximum available
                  preferential points when selecting ZA Support. We are fully CSD registered and meet every
                  compliance requirement for government IT procurement under the Preferential Procurement
                  Policy Framework Act. Contact us for our CSD supplier details and BEE certificate.
                </p>
              </div>
              <div className="space-y-3">
                {BEE_HIGHLIGHTS.map((item) => (
                  <div key={item} className="flex gap-3 items-start">
                    <div className="w-8 h-8 bg-[rgba(15,234,122,0.1)] rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle className="w-4 h-4 text-[#0FEA7A]" />
                    </div>
                    <p className="text-[#7A9E98] text-sm leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Departments Served */}
          <div className="mb-16">
            <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-8 text-center">
              Government Departments We Serve
            </h2>
            <p className="text-[#7A9E98] text-center max-w-3xl mx-auto mb-10 leading-relaxed">
              We have built trusted relationships with departments that demand the highest standards of
              security, reliability, and BEE compliance. Each engagement is tailored to the specific
              regulatory and operational requirements of the department.
            </p>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
              {DEPARTMENTS_SERVED.map((dept) => (
                <div key={dept.name} className="glass-card p-6 text-center">
                  <Landmark className="w-8 h-8 text-[#0FEA7A] mx-auto mb-3" />
                  <p className="text-[#E8F4F1] font-bold text-lg mb-1">{dept.name}</p>
                  <p className="text-[#7A9E98] text-xs">{dept.full}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Specialised Government Services */}
          <div className="mb-16">
            <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-4 text-center">
              Specialised Government IT Services
            </h2>
            <p className="text-[#7A9E98] text-center max-w-3xl mx-auto mb-10 leading-relaxed">
              Every service we deliver to government clients is built on the understanding that public
              sector IT operates under unique constraints: strict procurement rules, heightened security
              requirements, POPIA obligations, and public accountability. Our rate is R899 per hour,
              with assessments starting from R599.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {GOV_SERVICES.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="glass-card p-6">
                  <div className="w-12 h-12 bg-[rgba(15,234,122,0.1)] rounded-xl flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-[#0FEA7A]" />
                  </div>
                  <h3 className="text-[#E8F4F1] font-bold text-lg mb-2">{title}</h3>
                  <p className="text-[#7A9E98] text-sm leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Security Section */}
          <div className="glass-card p-8 mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
              <div>
                <p className="text-[#0FEA7A] text-xs font-semibold uppercase tracking-widest mb-2">Security</p>
                <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-4">
                  Government-Grade Security Requirements
                </h2>
                <p className="text-[#7A9E98] leading-relaxed mb-4">
                  Working with the South African Secret Service and the Presidency has shaped our approach to
                  data security. We understand that government IT environments often handle classified, restricted,
                  or personally identifiable information that demands controls far beyond standard commercial practice.
                </p>
                <p className="text-[#7A9E98] leading-relaxed mb-4">
                  In our Hyde Park workshop at 1 Hyde Lane, Second Floor, Office E2004, Johannesburg 2196,
                  we maintain secure handling procedures for government hardware. Devices containing sensitive
                  data are processed in isolated environments with full chain-of-custody documentation. For
                  departments requiring on-premises servicing, we deploy our technicians on-site with
                  appropriate security clearance documentation.
                </p>
                <p className="text-[#7A9E98] leading-relaxed">
                  The most common mistake we see in government Apple deployments is treating Mac devices
                  like consumer products rather than enterprise endpoints. Without proper MDM configuration,
                  FileVault enforcement, and application whitelisting, government Macs become security liabilities.
                  Our managed service eliminates these gaps from day one.
                </p>
              </div>
              <div className="space-y-4">
                {[
                  { title: 'Full-Disk Encryption', desc: 'FileVault enforced on every device via MDM policy. Non-compliant devices are automatically quarantined.' },
                  { title: 'Remote Wipe Capability', desc: 'Instant remote erase for lost or stolen government devices. Activation lock prevents unauthorised reuse.' },
                  { title: 'Audit Trail Logging', desc: 'Every device interaction logged with timestamps, technician ID, and action taken. Exportable for AGSA audits.' },
                  { title: 'Application Whitelisting', desc: 'Only approved applications permitted on government devices. Sideloading and unauthorised installs blocked at MDM level.' },
                  { title: 'Secure Decommissioning', desc: 'NIST 800-88 compliant data sanitisation before hardware disposal. Certificate of destruction provided for asset registers.' },
                ].map(({ title, desc }) => (
                  <div key={title} className="p-4 bg-[rgba(22,34,32,0.5)] rounded-xl border border-[rgba(15,234,122,0.08)]">
                    <p className="text-[#E8F4F1] font-semibold text-sm mb-1">{title}</p>
                    <p className="text-[#7A9E98] text-sm">{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Government Compliance */}
          <div className="glass-card p-8 mb-16">
            <div className="flex items-center gap-3 mb-6">
              <MapPin className="w-6 h-6 text-[#0FEA7A]" />
              <h2 className="text-2xl font-bold text-[#E8F4F1]">Government Compliance</h2>
            </div>
            <p className="text-[#7A9E98] mb-4 leading-relaxed">
              ZA Support is a BEE Level 1 contributor, fully CSD registered, and compliant with all
              National Treasury procurement requirements. For our CSD supplier numbers, BEE certificate,
              and company registration details, please contact us directly.
            </p>
            <a
              href={buildWhatsAppUrl('GOV-CSD', 'managed-services')}
              className="inline-flex items-center gap-2 bg-[#0FEA7A] text-[#0A1A18] font-semibold px-6 py-3 rounded-lg hover:brightness-110 transition"
             target="_blank" rel="noopener noreferrer">
              Request CSD &amp; BEE Documents
            </a>
          </div>

          {/* Internal Links Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {[
              {
                href: '/enterprise',
                title: 'Enterprise IT',
                desc: 'Managed Apple IT services for businesses of all sizes across Johannesburg and Gauteng.',
              },
              {
                href: '/managed-services',
                title: 'Managed Services',
                desc: 'Monthly SLA packages with proactive monitoring, maintenance, and priority support.',
              },
              {
                href: '/contact',
                title: 'Contact Us',
                desc: 'Get in touch for a government IT assessment or to discuss your department requirements.',
              },
            ].map((link) => (
              <Link key={link.href} href={link.href} className="glass-card p-6 group hover:border-[rgba(15,234,122,0.3)] transition-all">
                <h3 className="text-[#E8F4F1] font-bold mb-2 group-hover:text-[#0FEA7A] transition-colors">
                  {link.title} <ArrowRight className="w-4 h-4 inline ml-1" />
                </h3>
                <p className="text-[#7A9E98] text-sm">{link.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQAccordion items={GOV_FAQS} title="Government IT Services — Frequently Asked Questions" />
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-[rgba(39,80,77,0.3)] border border-[rgba(15,234,122,0.2)] rounded-3xl p-10">
            <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3">Ready to Secure Your Government Apple Estate?</h2>
            <p className="text-[#7A9E98] mb-6">
              BEE Level 1 · CSD registered · Assessment from R599 · R899/hr · 063 529 5863
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+27635295863"
                className="inline-flex items-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl font-bold hover:bg-[#0FEA7A]/90 transition-all"
               target="_blank" rel="noopener noreferrer">
                <Phone className="w-5 h-5" /> Call 063 529 5863
              </a>
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all"
              >
                WhatsApp Enquiry <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
