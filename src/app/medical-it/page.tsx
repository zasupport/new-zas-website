import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Phone,
  ArrowRight,
  Shield,
  CheckCircle,
  Star,
  Heart,
  Monitor,
  Tablet,
  Lock,
  Wifi,
  Clock,
  Users,
  Building2,
  Stethoscope,
  HardDrive,
  BadgeCheck,
} from 'lucide-react';
import SchemaOrg from '@/components/seo/SchemaOrg';
import { buildFaqSchema } from '@/lib/schema';
import FAQAccordion from '@/components/ui/FAQ';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { CONTACT, SITE, buildWhatsAppUrl } from '@/lib/constants';
import PricingNote from '@/components/PricingNote';

export const metadata: Metadata = {
  title:
    'Medical Practice IT Management Johannesburg | Apple MDM for Doctors | ZA Support',
  description:
    'Medical practice IT management in Johannesburg. HPCSA-compliant Apple device management, POPIA patient data security, MDM for doctors. Assessment from R599. BEE Level 1. Call 064 529 5863.',
  alternates: { canonical: 'https://zasupport.com/medical-it' },
  keywords: [
    'medical practice IT management johannesburg',
    'apple mdm for doctors',
    'hpcsa compliant IT',
    'popia patient data security',
    'medical practice apple support',
    'doctor IT support johannesburg',
    'medical IT specialist hyde park',
    'practice management software mac',
    'ipad check-in kiosk medical',
    'apple fleet management medical practice',
  ],
};

const faqs = [
  {
    question:
      'What does medical practice IT management include at ZA Support?',
    answer:
      'Our medical practice IT management covers the full technology lifecycle for your practice: Apple device procurement and setup, MDM (Mobile Device Management) enrolment, POPIA-compliant patient data configuration, practice management software support (GoodX, Healthbridge, MedEDI, Elixir), network segmentation between clinical and patient WiFi, encrypted backup with monthly restore verification, iPad kiosk configuration for patient check-in, and ongoing remote monitoring of every device. We operate at R899 per hour for ad-hoc work, with monthly SLA plans available for practices wanting all-inclusive coverage.',
  },
  {
    question:
      'How do you ensure HPCSA compliance for our medical practice IT systems?',
    answer:
      'HPCSA practice inspections increasingly require documented evidence of IT governance. We provide written documentation covering: device encryption status (FileVault verified on every Mac), user access controls (separate macOS accounts per practitioner), backup procedures with restore test records, incident response procedures for data breaches (POPIA 72-hour notification requirement), and a complete asset register of all devices with access to patient data. This documentation is formatted specifically for HPCSA audit presentation. We have been supporting medical practices in Johannesburg since 2009 and understand exactly what auditors look for.',
  },
  {
    question:
      'Can you manage Apple devices across multiple consulting rooms and reception areas?',
    answer:
      'Yes. We deploy and manage Apple device fleets across entire practices, from the reception iMac and iPad check-in kiosks through to consulting room MacBooks and shared clinical workstations. Using MDM, we enforce security policies centrally: automatic screen lock after 2 minutes of inactivity, mandatory FileVault encryption, approved application lists, and remote wipe capability if a device is lost or stolen. For group practices with 10 or more devices, we assign a dedicated technician who knows your environment.',
  },
  {
    question:
      'What practice management software do you support on Apple Macs?',
    answer:
      'We support Apple Macs running GoodX, Healthbridge, MedEDI, Elixir, PracticeAdmin, and other South African practice management systems. Before any macOS update, we verify compatibility with your specific practice software version. In our Hyde Park workshop, we have seen macOS updates break GoodX database connections and Healthbridge print formatting. We test first, then update. Your billing and patient records system is never at risk from an untested OS update.',
  },
  {
    question:
      'How quickly can you respond if our practice experiences a Mac failure during consulting hours?',
    answer:
      'For practices on our Managed IT plan, we offer same-day collection from anywhere in greater Johannesburg, typically within 2 hours of your call. We carry loaner MacBooks configured to connect to your practice management system, so your consulting room is never offline for more than the time it takes us to arrive. Logic board repairs are completed in our workshop within 24 to 48 hours. For ad-hoc clients, our assessment starts from R599 with priority turnaround available.',
  },
  {
    question:
      'Do you support large medical groups like those at Mediclinic or Netcare facilities?',
    answer:
      'We support practices of all sizes, from solo practitioners through to multi-doctor groups operating within Mediclinic, Netcare, and Life Healthcare facilities. For larger practices, we provide fleet-wide MDM management, centralised security policy enforcement, quarterly on-site health reviews, and a dedicated WhatsApp line to a named technician. Our BEE Level 1 certification also supports procurement compliance requirements for practices operating within hospital group frameworks.',
  },
  {
    question:
      'What is the cost of setting up iPad check-in kiosks for patient registration?',
    answer:
      'iPad kiosk setup includes the device configuration, MDM enrolment, guided access mode (locking the iPad to your check-in application), a secure mounting bracket, and network configuration on your clinical WiFi. Setup is charged at our standard rate of R899 per hour, with most single-kiosk installations completed within 2 hours. The iPad hardware itself is quoted separately based on the model your practice requires. For practices on a monthly SLA, kiosk support and troubleshooting is included.',
  },
  {
    question:
      'How do you protect patient data under POPIA on Apple devices?',
    answer:
      'We implement a layered approach: FileVault full-disk encryption on every Mac (verified, not just enabled), individual user accounts with strong password policies, iCloud Drive audit to ensure patient data is not syncing to personal accounts, encrypted Time Machine backups plus encrypted cloud backup, firewall configuration, and automatic macOS security updates. We also configure network segmentation so your patient WiFi is completely isolated from the clinical network carrying patient records. Every configuration is documented for POPIA and HPCSA audit purposes.',
  },
];

const services = [
  {
    title: 'Apple MDM for Medical Practices',
    desc: 'Centralised device management across your entire practice. Enforce encryption, app restrictions, and remote wipe from a single dashboard. Every Mac, iPad, and iPhone under control.',
    icon: Monitor,
  },
  {
    title: 'Patient Data Security (POPIA)',
    desc: 'FileVault encryption, access controls, network segmentation, and encrypted backup with monthly restore tests. Written compliance documentation for HPCSA audits.',
    icon: Lock,
  },
  {
    title: 'Practice Management Software',
    desc: 'GoodX, Healthbridge, MedEDI, Elixir support on Apple devices. We verify macOS compatibility before every update. Your billing and records system stays operational.',
    icon: Stethoscope,
  },
  {
    title: 'iPad Check-in Kiosks',
    desc: 'Patient self-registration kiosks with guided access mode, secure mounting, and clinical network integration. Reduces reception workload and speeds up patient flow.',
    icon: Tablet,
  },
  {
    title: 'Clinical Network Management',
    desc: 'Separate clinical and patient WiFi networks. Firewall rules isolating patient records from guest access. UniFi or equivalent network monitoring and alerting.',
    icon: Wifi,
  },
  {
    title: 'Backup and Disaster Recovery',
    desc: 'Dual-location encrypted backup: local Time Machine plus cloud. Monthly restore test with written confirmation. We do not assume your backup works, we prove it.',
    icon: HardDrive,
  },
];

const practiceScales = [
  {
    name: 'Solo Practitioner',
    desc: '1 doctor, up to 3 Apple devices',
    items: [
      'Up to 3 devices managed via MDM',
      'POPIA compliance configuration',
      'Priority repair SLA (next business day)',
      'Backup monitoring with monthly restore test',
      'Practice management software support',
      'Unlimited remote support via WhatsApp',
    ],
  },
  {
    name: 'Small to Medium Practice',
    desc: '2 to 5 doctors, up to 15 devices',
    items: [
      'Up to 15 devices managed via MDM',
      'Full POPIA and HPCSA audit documentation',
      'Same-day collection and loaner MacBook',
      'iPad check-in kiosk setup included',
      'Network segmentation (clinical vs patient WiFi)',
      'Dedicated technician and quarterly on-site review',
    ],
    popular: true,
  },
  {
    name: 'Group Practice or Medical Centre',
    desc: '5+ doctors, unlimited devices',
    items: [
      'Unlimited devices managed via MDM',
      'Complete HPCSA audit documentation pack',
      'Same-day response with on-site technician',
      'Multiple loaner devices on standby',
      'Full network design and management',
      'Monthly reporting and executive summary',
    ],
  },
];

const reviews = [
  {
    name: 'Dr K.P.',
    suburb: 'Sandton',
    text: 'We moved our entire practice to Apple devices with ZA Support managing the rollout. They configured every MacBook, set up our iPad check-in kiosk, and handled the GoodX migration. Zero downtime. The POPIA documentation they provided passed our HPCSA inspection without a single query.',
    rating: 5,
  },
  {
    name: 'Dr L.M.',
    suburb: 'Rosebank',
    text: 'Our iMac at reception failed on a Monday morning. ZA Support had a technician at our practice within 90 minutes with a loaner device. The original was repaired and returned by Wednesday. For a practice seeing 40 patients a day, that kind of response is not a luxury, it is essential.',
    rating: 5,
  },
  {
    name: 'Practice Manager, Multi-Doctor Clinic',
    suburb: 'Fourways',
    text: 'Managing 12 Apple devices across three consulting rooms and two reception areas was a nightmare before ZA Support. Their MDM setup means we can see every device, enforce encryption, and push updates without visiting each machine. Our backup has been tested and verified every single month.',
    rating: 5,
  },
];

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: 'https://zasupport.com',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Medical Practice IT Management',
      item: 'https://zasupport.com/medical-it',
    },
  ],
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Medical Practice IT Management Johannesburg',
  serviceType: 'Medical IT Management',
  provider: {
    '@type': 'LocalBusiness',
    name: 'ZA Support',
    alternateName: 'Apple Experts',
    telephone: CONTACT.phoneTel,
    email: CONTACT.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: '1 Hyde Lane, Second Floor, Office E2004',
      addressLocality: 'Hyde Park',
      addressRegion: 'Gauteng',
      postalCode: '2196',
      addressCountry: 'ZA',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: -26.1244,
      longitude: 28.0395,
    },
    priceRange: '$$',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
        ],
        opens: '08:00',
        closes: '17:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Friday'],
        opens: '08:00',
        closes: '16:30',
      },
    ],
  },
  areaServed: [
    { '@type': 'City', name: 'Johannesburg' },
    { '@type': 'Place', name: 'Hyde Park' },
    { '@type': 'Place', name: 'Sandton' },
    { '@type': 'Place', name: 'Rosebank' },
    { '@type': 'Place', name: 'Fourways' },
    { '@type': 'Place', name: 'Bryanston' },
    { '@type': 'Place', name: 'Midrand' },
    { '@type': 'AdministrativeArea', name: 'Gauteng' },
  ],
  description:
    'Specialist Apple IT management for medical practices in Johannesburg. HPCSA-compliant systems, POPIA patient data security, Apple MDM, practice management software support, iPad kiosk setup. BEE Level 1.',
  offers: {
    '@type': 'Offer',
    priceCurrency: 'ZAR',
    price: '599',
    priceSpecification: {
      '@type': 'PriceSpecification',
      priceCurrency: 'ZAR',
      price: '599',
      unitText: 'assessment from',
    },
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Medical Practice IT Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Apple MDM for Medical Practices',
          description:
            'Centralised Apple device management for doctors and medical practices',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'POPIA Compliance Configuration',
          description:
            'Full POPIA and HPCSA compliance setup and documentation for medical practices',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Practice Management Software Support',
          description:
            'GoodX, Healthbridge, MedEDI support on Apple Mac devices',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'iPad Patient Check-in Kiosk',
          description:
            'Self-service patient registration kiosk setup and management',
        },
      },
    ],
  },
};

const faqSchema = buildFaqSchema(faqs);

export default function MedicalITPage() {
  return (
    <>
      <SchemaOrg schema={faqSchema} />
      <SchemaOrg schema={breadcrumbSchema} />
      <SchemaOrg schema={serviceSchema} />

      {/* Hero */}
      <section className="hero-gradient grid-overlay pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb
            items={[{ label: 'Medical Practice IT Management' }]}
          />
          <div className="mt-8 max-w-4xl">
            <div className="inline-flex items-center gap-2 bg-[rgba(15,234,122,0.08)] border border-[rgba(15,234,122,0.2)] rounded-full px-4 py-2 mb-6">
              <Heart className="w-4 h-4 text-[#0FEA7A]" />
              <span className="text-[#0FEA7A] text-sm font-semibold">
                HPCSA-Compliant &middot; POPIA-Secure &middot; BEE Level
                1 &middot; Hyde Park, Johannesburg
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#E8F4F1] leading-tight mb-4">
              Medical Practice IT Management
              <br />
              <span className="text-[#0FEA7A]">
                Apple MDM for Doctors
              </span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-6 max-w-3xl leading-relaxed">
              Specialist Apple IT management for medical practices across
              Johannesburg. We manage your Macs, iPads, patient data
              security, and practice management software so you can focus
              on patients. From solo practitioners to multi-doctor groups
              at Mediclinic and Netcare facilities, we have managed
              medical IT since 2009.
            </p>

            <div className="flex flex-wrap gap-3 mb-8">
              {[
                'Apple MDM device management',
                'POPIA patient data compliance',
                'HPCSA audit documentation',
                'iPad check-in kiosks',
                'BEE Level 1 certified',
                'Assessment from R599',
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2 bg-[rgba(15,234,122,0.08)] border border-[rgba(15,234,122,0.15)] px-3 py-1.5 rounded-full"
                >
                  <CheckCircle className="w-3.5 h-3.5 text-[#0FEA7A]" />
                  <span className="text-[#E8F4F1] text-xs font-medium">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={buildWhatsAppUrl('MED-HERO', 'medical-it')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 transition-all"
              >
                WhatsApp Us
              </a>
              <a
                href={`tel:${CONTACT.phoneTel}`}
                className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all">
                <Phone className="w-5 h-5" /> Call {CONTACT.phone}
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.2)] text-[#7A9E98] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[rgba(15,234,122,0.05)] transition-all"
              >
                Book a Consultation{' '}
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why medical practices need specialist IT */}
      <section className="py-20 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-6">
                Why Doctors Need a Specialist IT Partner
              </h2>
              <p className="text-[#7A9E98] mb-6 leading-relaxed">
                A medical practice is not a standard office. Patient
                records carry legal obligations under POPIA. HPCSA
                auditors expect documented IT governance. A single device
                failure during consulting hours means cancelled
                appointments, inaccessible records, and lost revenue. In
                our Hyde Park workshop, we have seen practices lose
                entire days of billing because a general IT provider
                treated a critical Mac failure as a normal support
                ticket. We do not make that mistake.
              </p>
              <div className="space-y-5">
                {[
                  {
                    title: 'POPIA compliance is a legal requirement',
                    desc: 'Patient records on an unencrypted Mac, or a Mac without verified backup, is a POPIA breach. We configure FileVault, enforce access controls, and document everything for audit.',
                  },
                  {
                    title: 'Downtime costs more than repair',
                    desc: 'A solo practitioner billing R2,500 per consultation loses R20,000 in a single day of downtime. Our Managed IT clients get same-day response with loaner devices to eliminate that risk entirely.',
                  },
                  {
                    title:
                      'Practice software requires specific macOS versions',
                    desc: 'GoodX on macOS Sequoia, Healthbridge on Ventura, MedEDI on Sonoma: each has version-specific requirements. We track these dependencies so an OS update never breaks your billing system.',
                  },
                  {
                    title: 'HPCSA auditors expect documentation',
                    desc: 'A functioning data governance procedure with written evidence of backup, access control, and incident response is required. We produce this documentation as part of every engagement.',
                  },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <CheckCircle className="w-5 h-5 text-[#0FEA7A] flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[#E8F4F1] font-semibold text-sm">
                        {item.title}
                      </p>
                      <p className="text-[#7A9E98] text-sm mt-1">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <div className="glass-card p-6 border-l-4 border-[#0FEA7A]">
                <p className="text-[#E8F4F1] text-lg font-bold mb-2">
                  Real scenario: iMac failure at reception, 08:15 on a
                  Monday
                </p>
                <p className="text-[#7A9E98] text-sm">
                  For a Managed IT client, we dispatched a technician
                  with a loaner iMac within 90 minutes. The practice
                  continued seeing patients without interruption. The
                  original device was repaired (failing SSD, component
                  cost R1,800) and returned within 48 hours. Total
                  downtime for the practice: zero.
                </p>
              </div>
              <div className="glass-card p-6">
                <p className="text-[#E8F4F1] font-semibold mb-2">
                  The most common IT failures we see in medical
                  practices:
                </p>
                <ul className="space-y-2">
                  {[
                    'Unencrypted patient data on lost or stolen MacBooks',
                    'Backup systems that have silently failed for months',
                    'macOS updates breaking practice management software',
                    'Shared admin accounts across all staff (POPIA violation)',
                    'No network isolation between clinical and patient WiFi',
                    'Zero incident response procedure for data breaches',
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-[#7A9E98] text-sm"
                    >
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
            Medical Practice IT Services
          </h2>
          <p className="text-[#7A9E98] mb-10 max-w-2xl">
            Everything your practice needs, from Apple device management
            and patient data security to iPad kiosks and network
            infrastructure. All delivered by a team that has worked with
            medical practices since 2009.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.title} className="glass-card p-6">
                  <div className="w-12 h-12 bg-[rgba(15,234,122,0.1)] rounded-xl flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-[#0FEA7A]" />
                  </div>
                  <h3 className="text-[#E8F4F1] font-bold mb-2">
                    {s.title}
                  </h3>
                  <p className="text-[#7A9E98] text-sm leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Apple MDM deep-dive */}
      <section className="py-20 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-6">
                Apple MDM: Centralised Device Management for Your
                Practice
              </h2>
              <p className="text-[#7A9E98] mb-4 leading-relaxed">
                Mobile Device Management is the foundation of secure
                medical IT. With MDM deployed across your practice, we
                manage every Apple device from a central dashboard. No
                more walking between consulting rooms to apply updates or
                check encryption status. No more relying on individual
                staff members to keep their devices secure.
              </p>
              <p className="text-[#7A9E98] mb-6 leading-relaxed">
                We have deployed MDM across practices ranging from 3
                devices (solo GP in Sandton) to 45 devices (multi-doctor
                specialist group in Fourways). The technology scales. The
                security policies remain consistent. Every device
                reports its compliance status, and we are alerted the
                moment anything falls out of specification.
              </p>
              <div className="space-y-3">
                {[
                  'Automatic FileVault encryption enforcement',
                  'Application whitelisting for clinical devices',
                  'Remote lock and wipe for lost or stolen devices',
                  'Automatic macOS security update deployment',
                  'iPad guided access for patient kiosks',
                  'Device inventory and compliance reporting',
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3"
                  >
                    <BadgeCheck className="w-4 h-4 text-[#0FEA7A] flex-shrink-0 mt-0.5" />
                    <span className="text-[#7A9E98] text-sm">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-6">
                iPad Check-in Kiosks for Patient Registration
              </h2>
              <p className="text-[#7A9E98] mb-4 leading-relaxed">
                Patient self-registration reduces reception workload and
                speeds up consulting flow. We configure iPads in guided
                access mode locked to your check-in application, mounted
                securely on reception counters or waiting room stands,
                and connected to your clinical network with proper
                security.
              </p>
              <p className="text-[#7A9E98] mb-6 leading-relaxed">
                The kiosk captures patient details, medical aid
                information, and consent forms before the patient reaches
                reception. Data transmits directly to your practice
                management system. We have deployed kiosk solutions for
                practices using GoodX and Healthbridge, with the iPad
                automatically restarting to the registration form after
                each patient completes their submission.
              </p>
              <div className="glass-card p-6 border-l-4 border-[#0FEA7A]">
                <p className="text-[#E8F4F1] font-semibold mb-2">
                  Typical kiosk deployment
                </p>
                <div className="space-y-2 text-[#7A9E98] text-sm">
                  <p>
                    <strong className="text-[#E8F4F1]">
                      Hardware:
                    </strong>{' '}
                    iPad 10th generation + secure counter mount
                  </p>
                  <p>
                    <strong className="text-[#E8F4F1]">
                      Configuration:
                    </strong>{' '}
                    MDM-enrolled, guided access, auto-restart
                  </p>
                  <p>
                    <strong className="text-[#E8F4F1]">
                      Network:
                    </strong>{' '}
                    Clinical WiFi (isolated from patient network)
                  </p>
                  <p>
                    <strong className="text-[#E8F4F1]">
                      Setup time:
                    </strong>{' '}
                    Approximately 2 hours at R899/hr
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Practice scales / plans */}
      <section className="py-20 bg-[#111C1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3">
            IT Management Plans by Practice Size
          </h2>
          <p className="text-[#7A9E98] mb-10 max-w-2xl">
            All-inclusive monthly plans. Hardware repair labour is
            included (parts quoted separately). Month-to-month with
            30-day notice. No lock-in contracts.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {practiceScales.map((plan, i) => (
              <div
                key={plan.name}
                className={`glass-card p-6 ${plan.popular ? 'border-[rgba(15,234,122,0.4)] ring-1 ring-[rgba(15,234,122,0.2)]' : ''}`}
              >
                {plan.popular && (
                  <div className="inline-flex items-center gap-1 bg-[rgba(15,234,122,0.15)] text-[#0FEA7A] text-xs font-bold px-3 py-1 rounded-full mb-4">
                    Most Popular
                  </div>
                )}
                <h3 className="text-[#E8F4F1] font-extrabold text-lg mb-1">
                  {plan.name}
                </h3>
                <p className="text-[#7A9E98] text-sm mb-3">
                  {plan.desc}
                </p>
                <p className="text-[#7A9E98] text-xs mb-5">
                  All-inclusive &middot; Parts cost additional
                </p>
                <ul className="space-y-2 mb-6">
                  {plan.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-[#7A9E98] text-sm"
                    >
                      <CheckCircle className="w-4 h-4 text-[#0FEA7A] flex-shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
                <a
                  href={buildWhatsAppUrl('MED-PLAN', 'medical-it')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all ${plan.popular ? 'bg-[#0FEA7A] text-[#0A1A18] hover:bg-[#0FEA7A]/90' : 'border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] hover:bg-[rgba(15,234,122,0.08)]'}`}
                >
                  Enquire
                </a>
              </div>
            ))}
          </div>
          <p className="text-[#7A9E98] text-sm mt-6">
            Ad-hoc support available at R899 per hour. Assessment from
            R599.{' '}
            <Link
              href="/contact"
              className="text-[#0FEA7A] hover:underline"
            >
              Book a consultation
            </Link>{' '}
            to discuss your practice&apos;s specific requirements.
          </p>
          <PricingNote />
        </div>
      </section>

      {/* POPIA compliance detail */}
      <section className="py-16 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-card p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl font-extrabold text-[#E8F4F1] mb-4">
                  POPIA Patient Data Security: What Your Practice
                  Actually Needs
                </h2>
                <div className="space-y-3">
                  {[
                    {
                      req: 'Full-disk encryption',
                      detail:
                        'FileVault on every Mac, verified monthly via MDM, recovery key stored securely off-device',
                    },
                    {
                      req: 'Individual user accounts',
                      detail:
                        'Each practitioner and staff member on a separate macOS account with strong password policy enforced',
                    },
                    {
                      req: 'Verified backup',
                      detail:
                        'Encrypted local backup plus encrypted cloud backup, with monthly restore test and written confirmation',
                    },
                    {
                      req: 'Network segmentation',
                      detail:
                        'Clinical devices on an isolated VLAN, patient WiFi completely separated, firewall rules preventing cross-traffic',
                    },
                    {
                      req: 'Incident response',
                      detail:
                        'Written procedure for device loss, theft, or compromise, including POPIA 72-hour breach notification',
                    },
                    {
                      req: 'Asset register',
                      detail:
                        'Complete inventory of all devices accessing patient data: serial number, user, encryption status, last backup date',
                    },
                  ].map((item) => (
                    <div key={item.req} className="flex gap-3">
                      <Shield className="w-4 h-4 text-[#0FEA7A] flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="text-[#E8F4F1] font-semibold text-sm">
                          {item.req}:{' '}
                        </span>
                        <span className="text-[#7A9E98] text-sm">
                          {item.detail}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-[#7A9E98] text-sm mb-4">
                  Every item above is configured and documented as part
                  of our medical practice IT management service. The
                  documentation pack is specifically formatted for
                  HPCSA audit presentation and practice insurance
                  compliance reviews.
                </p>
                <p className="text-[#7A9E98] text-sm mb-4">
                  We are a BEE Level 1 certified provider, supporting
                  procurement compliance for practices operating within
                  Mediclinic, Netcare, and Life Healthcare group
                  frameworks.
                </p>
                <p className="text-[#7A9E98] text-sm mb-6">
                  Based at{' '}
                  <strong className="text-[#E8F4F1]">
                    1 Hyde Lane, Hyde Park, Second Floor, Office E2004,
                    Johannesburg 2196
                  </strong>
                  , we provide on-site support across Sandton, Rosebank,
                  Fourways, Bryanston, Midrand, and all of greater
                  Johannesburg. {SITE.yearsExperience} years of Apple
                  expertise. {SITE.repairsCount} devices serviced.{' '}
                  {SITE.rating} star Google rating across{' '}
                  {SITE.reviewCount} reviews.
                </p>
                <a
                  href={buildWhatsAppUrl('MED-POPIA', 'medical-it')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-6 py-3 rounded-xl font-bold text-sm hover:bg-[#0FEA7A]/90 transition-all"
                >
                  Discuss Compliance Setup
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Practice management software */}
      <section className="py-20 bg-[#111C1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3">
            Practice Management Software We Support on Mac
          </h2>
          <p className="text-[#7A9E98] mb-8 max-w-2xl">
            We support Apple Macs running all major South African
            practice management systems. Before any macOS update, we
            verify compatibility with your specific software version.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              'GoodX',
              'Healthbridge',
              'MedEDI',
              'Elixir',
              'PracticeAdmin',
              'Other Systems',
            ].map((sw) => (
              <div key={sw} className="glass-card p-4 text-center">
                <p className="text-[#E8F4F1] font-semibold text-sm">
                  {sw}
                </p>
              </div>
            ))}
          </div>
          <p className="text-[#7A9E98] text-sm mt-6">
            Running your appointment system, billing, and patient records
            on Apple hardware requires careful version management.
            Between 2023 and 2025, we tracked 14 macOS updates that
            would have broken at least one practice management system had
            they been applied without testing. We test first, then
            update. Your practice never goes offline because of an
            untested OS change.
          </p>
        </div>
      </section>

      {/* Who we serve */}
      <section className="py-20 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3">
            Medical Practices We Serve
          </h2>
          <p className="text-[#7A9E98] mb-10 max-w-2xl">
            From solo GPs to multi-doctor specialist groups. We scale our
            service to match your practice, not the other way around.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Users,
                title: 'General Practitioners',
                desc: 'Solo and small-group GP practices. Reception Mac, consulting room MacBook, iPad kiosk. POPIA compliance and GoodX or Healthbridge support included.',
              },
              {
                icon: Stethoscope,
                title: 'Specialists and Consultants',
                desc: 'Dermatologists, orthopaedic surgeons, psychiatrists, paediatricians. High-resolution displays for imaging, secure patient record access, and referral system integration.',
              },
              {
                icon: Building2,
                title: 'Medical Groups and Centres',
                desc: 'Multi-doctor practices within Mediclinic, Netcare, or Life Healthcare facilities. Fleet-wide MDM, centralised security, and BEE Level 1 procurement compliance.',
              },
              {
                icon: Heart,
                title: 'Dental Practices',
                desc: 'X-ray imaging workstations, patient management systems, and digital smile design on Mac. Network-attached storage for large imaging files.',
              },
              {
                icon: Clock,
                title: 'After-Hours and Walk-in Clinics',
                desc: 'Extended-hours practices that cannot afford downtime. Loaner devices on standby, remote monitoring, and same-day response for critical failures.',
              },
              {
                icon: Star,
                title: 'Allied Health Practices',
                desc: 'Physiotherapists, occupational therapists, psychologists. Appointment scheduling, patient notes, and billing system support on Apple devices.',
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="glass-card p-6">
                  <div className="w-10 h-10 bg-[rgba(15,234,122,0.1)] rounded-xl flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5 text-[#0FEA7A]" />
                  </div>
                  <h3 className="text-[#E8F4F1] font-bold mb-2">
                    {item.title}
                  </h3>
                  <p className="text-[#7A9E98] text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-20 bg-[#111C1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-8">
            What Medical Practices Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((r) => (
              <div key={r.name} className="glass-card p-6">
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: r.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-[#0FEA7A] text-[#0FEA7A]"
                    />
                  ))}
                </div>
                <p className="text-[#7A9E98] text-sm leading-relaxed mb-4">
                  &ldquo;{r.text}&rdquo;
                </p>
                <p className="text-[#E8F4F1] font-semibold text-sm">
                  {r.name}
                </p>
                <p className="text-[#7A9E98] text-xs">
                  {r.suburb}, Johannesburg
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQAccordion
            items={faqs}
            title="Medical Practice IT Management FAQs"
          />
        </div>
      </section>

      {/* Related Services */}
      <section className="py-12 bg-[#071210]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold text-[#E8F4F1] mb-6">
            Related Services
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              {
                label: 'Enterprise IT Services',
                href: '/enterprise',
              },
              {
                label: 'Managed IT Services',
                href: '/managed-services',
              },
              {
                label: 'Logic Board Repair',
                href: '/logic-board-repair',
              },
              { label: 'Contact Us', href: '/contact' },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block p-3 rounded-lg bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] text-[#7A9E98] hover:text-[#0FEA7A] hover:border-[#0FEA7A] text-sm transition-colors"
              >
                {link.label} <ArrowRight className="w-3 h-3 inline" />
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
              IT Management for Your Medical Practice
            </h2>
            <p className="text-[#7A9E98] mb-2">
              Assessment from R599. R899 per hour ad-hoc. Monthly SLA
              plans available.
            </p>
            <p className="text-[#7A9E98] text-sm mb-8">
              BEE Level 1 &middot; POPIA-compliant &middot;
              HPCSA-documented &middot; {SITE.yearsExperience} years
              Apple expertise &middot; Hyde Park, Johannesburg
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={buildWhatsAppUrl('MED-CTA', 'medical-it')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 transition-all"
              >
                WhatsApp Us
              </a>
              <a
                href={`tel:${CONTACT.phoneTel}`}
                className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all">
                <Phone className="w-5 h-5" /> Call {CONTACT.phone}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
