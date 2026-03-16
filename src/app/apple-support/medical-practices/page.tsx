import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, ArrowRight, Shield, CheckCircle, Star, Heart } from 'lucide-react';
import SchemaOrg from '@/components/seo/SchemaOrg';
import { buildFaqSchema } from '@/lib/schema';
import FAQAccordion from '@/components/ui/FAQ';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { CONTACT } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Apple Mac Support Medical Practices Johannesburg',
  description:
    'Specialist Apple Mac IT support and repair for medical practices in Johannesburg. HPCSA-aware. MacBook, iMac, logic board repair. Assessment: from R599 ex VAT. Call 064 529 5863.',
  alternates: { canonical: 'https://zasupport.com/apple-support/medical-practices' },
};

const faqs = [
  {
    question: 'Why do medical practices need a specialist Apple IT provider?',
    answer:
      'Medical practices operate under HPCSA guidelines and POPIA requirements that govern how patient data is stored, accessed, and backed up. A general IT shop does not understand these obligations. ZA Support works specifically with medical practices, we know what a practice management system audit requires, how to configure Apple devices for POPIA compliance, and how to handle a hardware failure without compromising patient records.',
  },
  {
    question: 'My practice uses a MacBook for appointments and patient records. What happens if it fails?',
    answer:
      'A MacBook failure during practice hours is a clinical disruption. ZA Support offers same-day or next-day collection from your practice, priority repair turnaround (typically 24–48 hours), and a loaner MacBook option for clients on our Managed IT plan. For practices on a monthly SLA, we carry spare stock specifically to avoid single-point-of-failure outages.',
  },
  {
    question: 'Do you support GoodX, Healthbridge, MedEDI, or other practice management software?',
    answer:
      'Yes. We support Apple devices running GoodX, Healthbridge, MedEDI, Elixir, PracticeAdmin, and other common South African practice management systems. Our role is to ensure the Mac hardware and macOS environment are correctly configured, performant, and backed up, not to replace your practice software vendor, but to make sure the hardware never lets your software down.',
  },
  {
    question: 'What is the POPIA compliance risk for a medical practice using Apple Macs?',
    answer:
      'The main risks are: unencrypted patient data on a device that is lost or stolen (FileVault must be enabled), poor access controls (each practitioner needs a separate macOS user account), no verified backup (Time Machine is insufficient alone, cloud backup with encryption and monthly restore test is required), and outdated macOS with known security vulnerabilities. We configure all of these as part of a Health Check or Managed IT engagement.',
  },
  {
    question: 'Can you repair a MacBook logic board at the practice to avoid downtime?',
    answer:
      'Logic board repair requires our workshop equipment, microscope, reflow station, DC power supply, oscilloscope. We cannot do this on-site. However, we collect from your practice, typically repair within 24–48 hours, and return the device. For Managed IT clients, we provide a replacement MacBook while yours is in repair.',
  },
  {
    question: 'What is included in the Managed IT plan for medical practices?',
    answer:
      'Our medical practice Managed IT plan includes: Health Check remote monitoring on all devices, POPIA compliance configuration, hardware repair priority SLA (same day or next day collection), practice management software support, network management (WiFi, router, isolating the clinical network from the waiting room), backup monitoring with monthly restore tests, and a dedicated WhatsApp line direct to a technician.',
  },
  {
    question: 'What does Managed IT for a medical practice cost?',
    answer:
      'Managed IT plans are all-inclusive, hardware repair is included at no extra charge (excluding parts). Contact us for a quote tailored to your practice size.',
  },
  {
    question: 'Do you provide support contracts that satisfy HPCSA audit requirements?',
    answer:
      'Yes. Our Managed IT agreement documents your data handling, backup procedures, device inventory, and incident response process, all of which can be presented to an HPCSA auditor as evidence of a functional data governance procedure.',
  },
];

const services = [
  {
    title: 'MacBook & iMac Repair',
    desc: 'Logic board component-level repair, liquid damage, screen, battery, charging port. Same-day collection from your practice. Priority turnaround for Managed IT clients.',
    icon: '🔧',
  },
  {
    title: 'Health Check Monitoring',
    desc: 'Remote monitoring agent on every device. We know about a failing drive, low battery health, or security issue before your practice does.',
    icon: '📊',
  },
  {
    title: 'POPIA Compliance Setup',
    desc: 'FileVault encryption, user account separation, iCloud configuration audit, secure backup setup, and a written compliance record for HPCSA audit.',
    icon: '🔒',
  },
  {
    title: 'Backup Management',
    desc: 'Dual-location backup (local + cloud). Monthly restore test. Written confirmation. No "I think it is working", verified backup or we fix it.',
    icon: '💾',
  },
  {
    title: 'Practice Network Management',
    desc: 'Separate clinical and patient WiFi networks. Firewall configuration. Secure router setup. Network health monitoring via UniFi or equivalent.',
    icon: '📶',
  },
  {
    title: 'Practice Management Software',
    desc: 'GoodX, Healthbridge, MedEDI, Elixir support on Apple devices. macOS compatibility, performance, and update management.',
    icon: '🏥',
  },
];

const plans = [
  {
    name: 'Solo Practitioner',
    desc: 'One doctor practice',
    items: [
      'Up to 3 devices monitored',
      'Priority repair SLA (next day)',
      'POPIA compliance audit',
      'Backup monitoring + monthly test',
      'Network management',
      'Unlimited remote support',
    ],
  },
  {
    name: 'Two-Doctor Practice',
    desc: 'Two doctor practice',
    items: [
      'Up to 6 devices monitored',
      'Priority repair SLA (same day)',
      'POPIA compliance documentation',
      'Loaner MacBook included',
      'Network management',
      'Unlimited remote + on-site support',
    ],
  },
  {
    name: 'Group Practice',
    desc: 'Three or more doctors',
    items: [
      'Unlimited devices monitored',
      'Priority repair SLA (same day)',
      'Full HPCSA audit documentation',
      'Multiple loaner devices available',
      'Dedicated technician contact',
      'Quarterly on-site health review',
    ],
  },
];

const reviews = [
  {
    name: 'Dr A.M.',
    suburb: 'Sandton',
    text: 'Running a medical practice means I cannot have my MacBook down for days. ZA Support collected the same morning, repaired the logic board, and had it back within 24 hours. They also set up FileVault and a proper backup, something I had been putting off for two years.',
    rating: 5,
  },
  {
    name: 'Dr E.S.',
    suburb: 'Rosebank',
    text: 'ZA Support monitors all my Macs remotely. They caught a failing SSD before it caused any data loss and replaced it within a day. For a medical practice, losing patient records is not an option, they understood that without needing to be told.',
    rating: 5,
  },
];

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://zasupport.com' },
    { '@type': 'ListItem', position: 2, name: 'Apple Support', item: 'https://zasupport.com/apple-support' },
    { '@type': 'ListItem', position: 3, name: 'Medical Practices', item: 'https://zasupport.com/apple-support/medical-practices' },
  ],
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Apple Mac IT Support for Medical Practices Johannesburg',
  provider: {
    '@type': 'LocalBusiness',
    name: 'ZA Support',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '1 Hyde Park Lane',
      addressLocality: 'Hyde Park',
      addressRegion: 'Gauteng',
      postalCode: '2196',
      addressCountry: 'ZA',
    },
    telephone: '+27645295863',
  },
  areaServed: { '@type': 'City', name: 'Johannesburg' },
  description: 'Specialist Apple Mac support and repair for medical practices in Johannesburg. POPIA-aware.',
};

const faqSchema = buildFaqSchema(faqs);

export default function MedicalPracticesPage() {
  return (
    <>
      <SchemaOrg schema={faqSchema} />
      <SchemaOrg schema={breadcrumbSchema} />
      <SchemaOrg schema={serviceSchema} />

      {/* Hero */}
      <section className="hero-gradient grid-overlay pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: 'Apple Support', href: '/apple-support' }, { label: 'Medical Practices' }]} />
          <div className="mt-8 max-w-4xl">
            <div className="inline-flex items-center gap-2 bg-[rgba(15,234,122,0.08)] border border-[rgba(15,234,122,0.2)] rounded-full px-4 py-2 mb-6">
              <Heart className="w-4 h-4 text-[#0FEA7A]" />
              <span className="text-[#0FEA7A] text-sm font-semibold">HPCSA-Aware · POPIA-Compliant · Hyde Park, Johannesburg</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-[#E8F4F1] leading-tight mb-4">
              Apple Mac Support for<br /><span className="text-[#0FEA7A]">Medical Practices Johannesburg</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-6 max-w-3xl leading-relaxed">
              Specialist Apple IT support and repair for doctors, specialists, and medical practices in Johannesburg.
              We understand that a MacBook failure at your practice is not a minor inconvenience, it is a clinical disruption.
            </p>

            <div className="flex flex-wrap gap-3 mb-8">
              {[
                'Same-day or next-day collection',
                'POPIA compliance setup',
                'HPCSA audit documentation',
                'Loaner MacBook available',
                'Managed IT plans available',
              ].map((item) => (
                <div key={item} className="flex items-center gap-2 bg-[rgba(15,234,122,0.08)] border border-[rgba(15,234,122,0.15)] px-3 py-1.5 rounded-full">
                  <CheckCircle className="w-3.5 h-3.5 text-[#0FEA7A]" />
                  <span className="text-[#E8F4F1] text-xs font-medium">{item}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={CONTACT.whatsappLogicBoard}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 transition-all"
              >
                💬 WhatsApp Us
              </a>
              <a
                href={`tel:${CONTACT.phoneTel}`}
                className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all"
              >
                <Phone className="w-5 h-5" /> Call {CONTACT.phone}
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.2)] text-[#7A9E98] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[rgba(15,234,122,0.05)] transition-all"
              >
                Book a Consultation <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why medical practices need a specialist */}
      <section className="py-20 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-6">
                Why Medical Practices Need a Specialist
              </h2>
              <div className="space-y-5">
                {[
                  {
                    title: 'POPIA compliance is not optional',
                    desc: 'Patient records on an unencrypted MacBook, or a MacBook without a verified backup, is a POPIA violation. We configure and document compliance on every device we support.',
                  },
                  {
                    title: 'Downtime has a clinical cost',
                    desc: 'When your practice management system is inaccessible, appointments cannot be confirmed, records cannot be accessed, and billing stops. A general IT shop treats this as a normal support ticket. We treat it as an emergency.',
                  },
                  {
                    title: 'Practice management software has specific macOS requirements',
                    desc: 'GoodX, Healthbridge, and MedEDI all have version-specific macOS compatibility requirements. Updating macOS without checking compatibility first can break your entire practice system. We track these dependencies.',
                  },
                  {
                    title: 'HPCSA audits require documented IT procedures',
                    desc: 'A functioning data governance procedure, including written evidence of backup, access control, and incident response, is increasingly required in HPCSA practice inspections. We provide this documentation.',
                  },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <CheckCircle className="w-5 h-5 text-[#0FEA7A] flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[#E8F4F1] font-semibold text-sm">{item.title}</p>
                      <p className="text-[#7A9E98] text-sm mt-1">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <div className="glass-card p-6 border-l-4 border-[#0FEA7A]">
                <p className="text-[#E8F4F1] text-lg font-bold mb-2">A MacBook failure mid-practice-day</p>
                <p className="text-[#7A9E98] text-sm">For a Managed IT client, we collect the same morning, supply a loaner MacBook while we repair, and return the repaired device typically within 24 hours. No loss of access to patient records. No cancelled appointments.</p>
              </div>
              <div className="glass-card p-6">
                <p className="text-[#E8F4F1] font-semibold mb-2">What we prevent:</p>
                <ul className="space-y-2">
                  {[
                    'POPIA data breaches from lost/stolen devices',
                    'Extended downtime from unplanned hardware failure',
                    'Data loss from unverified or failing backups',
                    'macOS update breaking practice management software',
                    'Ransomware via unpatched security vulnerabilities',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-[#7A9E98] text-sm">
                      <Shield className="w-4 h-4 text-[#0FEA7A] flex-shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 bg-[#111C1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3">
            Services for Medical Practices
          </h2>
          <p className="text-[#7A9E98] mb-10 max-w-2xl">
            From emergency logic board repair to full managed IT, all designed around the uptime requirements of a working medical practice.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s) => (
              <div key={s.title} className="glass-card p-6">
                <div className="text-3xl mb-3">{s.icon}</div>
                <h3 className="text-[#E8F4F1] font-bold mb-2">{s.title}</h3>
                <p className="text-[#7A9E98] text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Managed IT Plans */}
      <section className="py-20 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3">
            Managed IT Plans for Medical Practices
          </h2>
          <p className="text-[#7A9E98] mb-10 max-w-2xl">
            All-inclusive monthly plans. Hardware repair is included, no surprise invoices for parts or labour.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan, i) => (
              <div key={plan.name} className={`glass-card p-6 ${i === 1 ? 'border-[rgba(15,234,122,0.4)] ring-1 ring-[rgba(15,234,122,0.2)]' : ''}`}>
                {i === 1 && (
                  <div className="inline-flex items-center gap-1 bg-[rgba(15,234,122,0.15)] text-[#0FEA7A] text-xs font-bold px-3 py-1 rounded-full mb-4">
                    Most Popular
                  </div>
                )}
                <h3 className="text-[#E8F4F1] font-extrabold text-lg mb-1">{plan.name}</h3>
                <p className="text-[#7A9E98] text-sm mb-3">{plan.desc}</p>
                <p className="text-[#7A9E98] text-xs mb-5">All-inclusive · Parts cost additional</p>
                <ul className="space-y-2 mb-6">
                  {plan.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-[#7A9E98] text-sm">
                      <CheckCircle className="w-4 h-4 text-[#0FEA7A] flex-shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
                <a
                  href={CONTACT.whatsappLogicBoard}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all ${i === 1 ? 'bg-[#0FEA7A] text-[#0A1A18] hover:bg-[#0FEA7A]/90' : 'border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] hover:bg-[rgba(15,234,122,0.08)]'}`}
                >
                  💬 Enquire
                </a>
              </div>
            ))}
          </div>
          <p className="text-[#7A9E98] text-sm mt-6">
            All plans are month-to-month with 30-day notice. No long-term contracts. <Link href="/contact" className="text-[#0FEA7A] hover:underline">Book a free consultation</Link> to discuss your practice&apos;s specific needs.
          </p>
        </div>
      </section>

      {/* Compliance callout */}
      <section className="py-16 bg-[#111C1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-card p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl font-extrabold text-[#E8F4F1] mb-4">
                  POPIA Compliance for Medical Practices, What It Actually Requires
                </h2>
                <div className="space-y-3">
                  {[
                    { req: 'Device encryption', detail: 'FileVault on every Mac, enabled and verified, key stored securely' },
                    { req: 'Separate user accounts', detail: 'Each practitioner and staff member on their own macOS account, no shared logins' },
                    { req: 'Verified backup', detail: 'At minimum: encrypted local backup + encrypted cloud backup + monthly restore test with written record' },
                    { req: 'Access control', detail: 'Only authorised staff can access patient record folders, macOS permissions and iCloud Drive configuration' },
                    { req: 'Incident response', detail: 'Written procedure for what happens if a device is lost, stolen, or compromised, POPIA notifiable breach within 72 hours' },
                    { req: 'Device inventory', detail: 'Asset register of all devices that can access patient data, required for HPCSA audit' },
                  ].map((item) => (
                    <div key={item.req} className="flex gap-3">
                      <Shield className="w-4 h-4 text-[#0FEA7A] flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="text-[#E8F4F1] font-semibold text-sm">{item.req}: </span>
                        <span className="text-[#7A9E98] text-sm">{item.detail}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-[#7A9E98] text-sm mb-4">
                  A ZA Support Managed IT engagement provides written documentation for all six compliance requirements above, in a format designed to be presented to an HPCSA auditor or practice insurance provider.
                </p>
                <p className="text-[#7A9E98] text-sm mb-6">
                  We have been providing Apple IT support to medical practices in Johannesburg since 2009. We understand the operational and compliance environment. We do not need to be briefed on what HPCSA is.
                </p>
                <a
                  href={CONTACT.whatsappLogicBoard}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-6 py-3 rounded-xl font-bold text-sm hover:bg-[#0FEA7A]/90 transition-all"
                >
                  💬 Discuss Compliance Setup
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Practice software */}
      <section className="py-20 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3">
            Practice Management Software Support on Mac
          </h2>
          <p className="text-[#7A9E98] mb-8 max-w-2xl">
            We support Apple Macs running all major South African practice management systems.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {['GoodX', 'Healthbridge', 'MedEDI', 'Elixir', 'PracticeAdmin', 'Other Systems'].map((sw) => (
              <div key={sw} className="glass-card p-4 text-center">
                <p className="text-[#E8F4F1] font-semibold text-sm">{sw}</p>
              </div>
            ))}
          </div>
          <p className="text-[#7A9E98] text-sm mt-6">
            Before any macOS update, we verify compatibility with your practice management system. We do not let an OS update break your billing or records system.
          </p>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-20 bg-[#111C1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-8">
            Medical Practice Reviews
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reviews.map((r) => (
              <div key={r.name} className="glass-card p-6">
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: r.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#0FEA7A] text-[#0FEA7A]" />
                  ))}
                </div>
                <p className="text-[#7A9E98] text-sm leading-relaxed mb-4">&ldquo;{r.text}&rdquo;</p>
                <p className="text-[#E8F4F1] font-semibold text-sm">{r.name}</p>
                <p className="text-[#7A9E98] text-xs">{r.suburb}, Johannesburg</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQAccordion items={faqs} title="Apple Mac Support for Medical Practices, FAQs" />
        </div>
      </section>

      {/* ── Related Services ── */}
      <section className="py-12 bg-[#071210]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold text-[#E8F4F1] mb-6">
            Related Services
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              { label: 'Managed IT Services', href: '/managed-services' },
              { label: 'Logic Board Repair', href: '/logic-board-repair' },
              { label: 'MacBook Pro Repair', href: '/macbook-pro-repair' },
              { label: 'Assessment: from R599 ex VAT', href: '/no-fix-no-fee' },
            ].map(link => (
              <Link key={link.href} href={link.href} className="block p-3 rounded-lg bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] text-[#7A9E98] hover:text-[#0FEA7A] hover:border-[#0FEA7A] text-sm transition-colors">
                {link.label} →
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-[rgba(39,80,77,0.3)] border border-[rgba(15,234,122,0.2)] rounded-3xl p-10">
            <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3">
              IT Support for Your Medical Practice
            </h2>
            <p className="text-[#7A9E98] mb-2">Free consultation. Month-to-month. No lock-in contracts.</p>
            <p className="text-[#7A9E98] text-sm mb-8">Johannesburg&apos;s Apple IT specialists for medical practices since 2009.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={CONTACT.whatsappLogicBoard}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 transition-all"
              >
                💬 WhatsApp Us
              </a>
              <a
                href={`tel:${CONTACT.phoneTel}`}
                className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all"
              >
                <Phone className="w-5 h-5" /> Call {CONTACT.phone}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
