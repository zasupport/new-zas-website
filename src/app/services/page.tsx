import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, ArrowRight, Shield, Activity, Wrench, HardDrive, Wifi, Laptop, Building2, MessageCircle, Cpu } from 'lucide-react';
import { CONTACT } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'IT Services Johannesburg | Mac Repair, Security & Support | ZA Support',
  description:
    'Complete IT services in Johannesburg, MacBook repair, iMac repair, data recovery, virus removal, Health Check monitoring, CyberShield security, SLA support and business IT. Hyde Park, Johannesburg. Complimentary IT assessment for new managed services clients.',
  alternates: { canonical: 'https://zasupport.com/services' },
  keywords: [
    'it services johannesburg',
    'mac support johannesburg',
    'apple it support johannesburg',
    'macbook repair johannesburg',
    'mac repair hyde park',
    'apple support johannesburg',
    'business it support johannesburg',
    'imac repair johannesburg',
  ],
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'LocalBusiness',
      '@id': 'https://zasupport.com/#business',
      name: 'ZA Support, Apple IT Specialists',
      description:
        'IT services in Johannesburg specialising in Mac repair, managed IT, cybersecurity and health monitoring for medical practices, businesses and individuals.',
      url: 'https://zasupport.com',
      telephone: '+27645295863',
      email: 'courtney@zasupport.com',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '1 Hyde Park Lane',
        addressLocality: 'Hyde Park',
        addressRegion: 'Gauteng',
        postalCode: '2196',
        addressCountry: 'ZA',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: -26.1217,
        longitude: 28.0402,
      },
      openingHours: 'Mo-Fr 08:00-18:00',
      priceRange: '$$',
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        reviewCount: '632',
        bestRating: '5',
        worstRating: '1',
      },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'ZA Support Services',
        itemListElement: [
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'MacBook Repair', url: 'https://zasupport.com/macbook-repair' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'iMac Repair', url: 'https://zasupport.com/imac-repair' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Logic Board Repair', url: 'https://zasupport.com/logic-board-repair' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Liquid Damage Repair', url: 'https://zasupport.com/liquid-damage' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Health Check Monitoring', url: 'https://zasupport.com/apple-support' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'CyberShield Security', url: 'https://zasupport.com/managed-services' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Managed IT Services', url: 'https://zasupport.com/managed-services' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'JAMF MDM', url: 'https://zasupport.com/jamf-mdm' } },
        ],
      },
    },
    {
      '@type': 'Service',
      '@id': 'https://zasupport.com/services#services-overview',
      name: 'IT Services Johannesburg, ZA Support',
      provider: { '@id': 'https://zasupport.com/#business' },
      areaServed: {
        '@type': 'City',
        name: 'Johannesburg',
      },
      description:
        'Comprehensive Apple IT services in Johannesburg including Mac repair, logic board component-level repair, data recovery, virus removal, managed security, and SLA support.',
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What IT services does ZA Support offer in Johannesburg?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'ZA Support offers MacBook repair, iMac repair, logic board component-level repair, liquid damage recovery, data recovery, virus removal, Health Check device monitoring, CyberShield cybersecurity, SLA managed IT support, JAMF MDM, and business IT services from our Hyde Park, Johannesburg office.',
          },
        },
        {
          '@type': 'Question',
          name: 'Do you charge for an assessment?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'A from R599 ex VAT assessment fee applies. If you proceed with the repair, this fee is absorbed into the total repair cost, you do not pay it on top. If you decline the repair after assessment, the from R599 ex VAT assessment fee is payable. New managed services clients receive a complimentary IT assessment at no charge.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is your assessment and repair process?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'We charge a from R599 ex VAT assessment fee to inspect and diagnose your device. We then provide a transparent written quote. If you approve and proceed with the repair, the from R599 assessment fee is absorbed into the repair cost. If you decline, the assessment fee of from R599 ex VAT is payable for the diagnostic work completed.',
          },
        },
        {
          '@type': 'Question',
          name: 'How much does MacBook repair cost in Johannesburg?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'MacBook repair costs depend on the fault. An assessment fee of from R599 ex VAT applies. Contact us for a quote, we repair logic board components that other shops replace entirely. All repairs carry a up-to-3 year warranty.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is Health Check monitoring?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Health Check is ZA Support\'s remote monitoring service. It runs a 28-phase diagnostic on your Mac every 15 minutes, tracking battery health, storage, security, backups, and performance. Alerts are sent automatically when issues are detected, before they become critical failures.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is CyberShield?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'CyberShield is ZA Support\'s cybersecurity product for homes and businesses. It provides network-level threat blocking, ransomware protection, dark web monitoring, and monthly security reports.',
          },
        },
        {
          '@type': 'Question',
          name: 'Do you support medical practices and healthcare businesses?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. ZA Support specialises in IT for medical practices. We are POPIA and HPCSA-compliant, understand patient data obligations, and provide managed IT, Health Check monitoring, and CyberShield security designed for healthcare environments.',
          },
        },
        {
          '@type': 'Question',
          name: 'How do I get started with ZA Support?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Call or WhatsApp 064 529 5863, or email courtney@zasupport.com. Assessment fee of from R599 ex VAT applies, bring your device to our Hyde Park office or we can arrange a site visit for business clients.',
          },
        },
      ],
    },
  ],
};

const services = [
  {
    icon: Cpu,
    title: 'Logic Board Repair',
    description:
      'Component-level component-level repair for MacBook no-power, no-display, USB-C failure, GPU faults, and liquid damage. We repair the chips other shops replace. up-to-3 year warranty. Assessment: from R599 ex VAT.',
    href: '/logic-board-repair',
    highlight: '#1 Service',
  },
  {
    icon: Laptop,
    title: 'MacBook Repair',
    description:
      'Component-level repair for all MacBook models. Logic board component-level repair, screen replacement, battery replacement, liquid damage recovery, keyboard repair and charging port replacement. up-to-3 year warranty on every job.',
    href: '/macbook-repair',
    highlight: null,
  },
  {
    icon: Wrench,
    title: 'iMac Repair',
    description:
      'iMac screen replacement, RAM upgrades, SSD upgrades, logic board repair and liquid damage recovery. Intel and Apple Silicon iMac supported. All repairs carry a up-to-3 year warranty.',
    href: '/imac-repair',
    highlight: null,
  },
  {
    icon: HardDrive,
    title: 'Data Recovery',
    description:
      'Professional data recovery from failed HDDs, SSDs, and flash storage. We recover from water-damaged drives, failed logic boards, and accidental deletions. Forensic-grade tools with no data, no fee.',
    href: '/macbook-repair',
    highlight: null,
  },
  {
    icon: Shield,
    title: 'Virus & Malware Removal',
    description:
      'Complete removal of malware, adware, ransomware, and PUPs from Mac. Full security audit included. We identify the infection source and close the vulnerability so it cannot recur.',
    href: '/managed-services',
    highlight: null,
  },
  {
    icon: Activity,
    title: 'Health Check Monitoring',
    description:
      'Remote 28-phase monitoring for your Mac. Tracks battery health, storage, security, backups, and performance every 15 minutes. Early-warning alerts before hardware fails.',
    href: '/apple-support',
    highlight: 'Proactive',
  },
  {
    icon: Shield,
    title: 'CyberShield Security',
    description:
      'Network-level cybersecurity for homes and businesses. Blocks malware, ransomware and phishing at the network layer. Dark web monitoring and monthly reports.',
    href: '/managed-services',
    highlight: null,
  },
  {
    icon: Building2,
    title: 'SLA & Managed IT Support',
    description:
      'Fixed-fee managed IT for medical practices, SMEs, and professional firms. Unlimited support calls, on-site visits, proactive monitoring and quarterly reviews. Response within 4 hours.',
    href: '/managed-services',
    highlight: 'Best value',
  },
  {
    icon: Wifi,
    title: 'Business IT & Network Setup',
    description:
      'Full network design, UniFi installation, Wi-Fi optimisation, VLAN segmentation, VPN configuration, and server setup for Johannesburg businesses. POPIA-compliant architecture included.',
    href: '/managed-services',
    highlight: null,
  },
  {
    icon: Building2,
    title: 'JAMF MDM',
    description:
      'Apple device management for businesses using JAMF Pro. Deploy, manage, secure and remote-wipe all Apple devices in your organisation. Zero-touch enrolment and policy enforcement.',
    href: '/jamf-mdm',
    highlight: null,
  },
];


export default function ServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="hero-gradient grid-overlay pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-[#0FEA7A] text-sm font-semibold tracking-widest uppercase mb-4">
              Hyde Park, Johannesburg
            </p>
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#E8F4F1] mb-6 leading-tight"
             
            >
              IT Services{' '}
              <span className="text-[#0FEA7A]">Johannesburg</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-8 leading-relaxed">
              Mac repair, cybersecurity, managed IT and device monitoring, all from one specialist team in
              Hyde Park. New managed services clients receive a complimentary IT assessment. Warranty on all repairs as standard.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href={CONTACT.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-7 py-3.5 rounded-xl font-bold text-base hover:bg-[#0FEA7A]/90 transition-all"
              >
                <MessageCircle className="w-5 h-5" /> WhatsApp Us
              </a>
              <a
                href={`tel:${CONTACT.phoneTel}`}
                className="inline-flex items-center gap-2 border border-[rgba(15,234,122,0.4)] text-[#0FEA7A] px-7 py-3.5 rounded-xl font-bold text-base hover:bg-[rgba(15,234,122,0.08)] transition-all"
              >
                <Phone className="w-5 h-5" /> {CONTACT.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="bg-[#0D1F1C] border-y border-[rgba(255,255,255,0.05)] py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            {[
              ['Complimentary IT Assessment', 'For new managed services clients'],
              ['Assessment Process', 'Transparent from R599 ex VAT fee'],
              ['Up-to-3 Year Warranty', 'On all parts and labour'],
              ['4.9 / 5 Rating', '120+ client reviews'],
            ].map(([heading, sub]) => (
              <div key={heading}>
                <p className="text-[#0FEA7A] font-bold text-sm">{heading}</p>
                <p className="text-[#7A9E98] text-xs mt-0.5">{sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services grid */}
      <section className="py-20 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2
              className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4"
             
            >
              All Services
            </h2>
            <p className="text-[#7A9E98] text-lg max-w-2xl">
              From same-day MacBook repairs to ongoing managed IT for businesses, ZA Support covers the full
              spectrum of Apple IT services in Johannesburg.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <Link
                  key={service.title}
                  href={service.href}
                  className="glass-card p-6 group hover:border-[rgba(15,234,122,0.3)] transition-all flex flex-col"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-[rgba(15,234,122,0.1)] flex items-center justify-center">
                      <Icon className="w-5 h-5 text-[#0FEA7A]" />
                    </div>
                    {service.highlight && (
                      <span className="text-[10px] font-bold text-[#0A1A18] bg-[#0FEA7A] px-2 py-0.5 rounded-full uppercase tracking-wide">
                        {service.highlight}
                      </span>
                    )}
                  </div>
                  <h3
                    className="text-[#E8F4F1] font-bold text-lg mb-2"
                   
                  >
                    {service.title}
                  </h3>
                  <p className="text-[#7A9E98] text-sm leading-relaxed mb-4 flex-1">{service.description}</p>
                  <div className="flex items-center justify-end">
                    <span className="text-[#7A9E98] group-hover:text-[#0FEA7A] transition-colors flex items-center gap-1 text-sm">
                      View details <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why ZA Support */}
      <section className="py-20 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2
                className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-6"
               
              >
                Mac Support in Johannesburg, Done Properly
              </h2>
              <p className="text-[#7A9E98] mb-5 leading-relaxed">
                ZA Support is based in Hyde Park, Johannesburg and specialises exclusively in Apple IT. Every
                engineer has hands-on experience with Mac hardware at the component level, we do not guess
                and we do not swap boards unnecessarily.
              </p>
              <p className="text-[#7A9E98] mb-5 leading-relaxed">
                We serve individual Mac owners, medical practices, law firms, SMEs and enterprise businesses
                across Johannesburg. Whether you need a single MacBook screen replaced or a full managed IT
                service with POPIA-compliant infrastructure, we have a solution.
              </p>
              <p className="text-[#7A9E98] mb-8 leading-relaxed">
                Our Health Check monitoring platform runs a 28-phase diagnostic on every client device every
                15 minutes. We identify failing batteries, approaching storage limits, expired backups and
                security vulnerabilities before they cause downtime. Most clients save more in avoided data
                loss than the monitoring costs.
              </p>
              <a
                href={CONTACT.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-7 py-3.5 rounded-xl font-bold hover:bg-[#0FEA7A]/90 transition-all"
              >
                <MessageCircle className="w-5 h-5" /> Get a Free Quote on WhatsApp
              </a>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                ['Apple IT Specialists', 'Mac-first focus means deeper expertise than generalist IT companies'],
                ['Mac & Windows Support', 'Fully capable of managing mixed Mac and Windows environments'],
                ['Medical IT Experts', 'POPIA + HPCSA-compliant solutions for healthcare practices'],
                ['Proactive Monitoring', 'Health Check detects failures before they happen'],
                ['Transparent Pricing', 'All prices published. No surprise invoices.'],
                ['Up-to-3 Year Warranty', 'On all parts and labour, no exceptions'],
              ].map(([title, desc]) => (
                <div key={title} className="glass-card p-5">
                  <p className="text-[#E8F4F1] font-bold text-sm mb-1.5">
                    {title}
                  </p>
                  <p className="text-[#7A9E98] text-xs leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-[#0D1F1C]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-3xl font-extrabold text-[#E8F4F1] mb-10"
           
          >
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {[
              {
                q: 'What IT services does ZA Support offer in Johannesburg?',
                a: 'ZA Support offers MacBook repair, iMac repair, logic board component-level repair, liquid damage recovery, data recovery, virus removal, Health Check device monitoring, CyberShield cybersecurity, SLA managed IT support, JAMF MDM, and full business IT services from our Hyde Park, Johannesburg office.',
              },
              {
                q: 'Do you charge for an assessment?',
                a: 'A from R599 ex VAT assessment fee applies to all device diagnostics. If you approve the repair and proceed, the assessment fee is absorbed into the repair cost, you do not pay it separately. If you decline the repair after assessment, the from R599 ex VAT assessment fee is payable for the diagnostic work completed.',
              },
              {
                q: 'Do new managed services clients get a free assessment?',
                a: 'Yes. New clients signing up for IT managed services receive a complimentary IT assessment at no charge. We audit your environment, identify risks, and recommend the right plan before any contract is signed.',
              },
              {
                q: 'How much does MacBook repair cost in Johannesburg?',
                a: 'MacBook repair costs depend on the fault. An assessment fee of from R599 ex VAT applies. Contact us for a quote, we repair logic board components that other shops replace entirely. All repairs carry a up-to-3 year warranty.',
              },
              {
                q: 'What is Health Check monitoring?',
                a: "Health Check is ZA Support's remote monitoring service. It runs a 28-phase diagnostic on your Mac every 15 minutes, tracking battery health, storage, security, backups and performance. Alerts are sent automatically when issues are detected, before they become critical.",
              },
              {
                q: 'What is CyberShield?',
                a: "CyberShield is ZA Support's cybersecurity product for homes and businesses. It provides network-level threat blocking, ransomware protection, dark web monitoring, and monthly security reports.",
              },
              {
                q: 'Do you support medical practices?',
                a: 'Yes. ZA Support specialises in IT for medical practices. We are POPIA and HPCSA-compliant, understand patient data obligations, and provide managed IT, Health Check monitoring and CyberShield security designed for healthcare environments.',
              },
              {
                q: 'How do I get started?',
                a: 'Call or WhatsApp 064 529 5863, or email courtney@zasupport.com. Assessment fee of from R599 ex VAT applies, bring your device to our Hyde Park office or we can arrange a site visit for business clients.',
              },
            ].map(({ q, a }) => (
              <div key={q} className="glass-card p-6">
                <h3
                  className="text-[#E8F4F1] font-bold mb-3"
                 
                >
                  {q}
                </h3>
                <p className="text-[#7A9E98] text-sm leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WhatsApp CTA */}
      <section className="py-20 bg-[#0A1A18]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-[rgba(39,80,77,0.35)] border border-[rgba(15,234,122,0.25)] rounded-3xl p-10">
            <h2
              className="text-3xl font-extrabold text-[#E8F4F1] mb-3"
             
            >
              Get Started, Managed Services Assessment
            </h2>
            <p className="text-[#7A9E98] mb-3">
              New managed services clients receive a complimentary IT assessment. Bring your device in or send us a WhatsApp, we quote honestly and fix it fast.
            </p>
            <p className="text-[#7A9E98] text-sm mb-8">
              Hyde Park, Johannesburg &bull; Mon – Fri 08:00 – 18:00
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={CONTACT.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 transition-all"
              >
                <MessageCircle className="w-5 h-5" /> WhatsApp Us Now
              </a>
              <a
                href={`tel:${CONTACT.phoneTel}`}
                className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.4)] text-[#0FEA7A] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[rgba(15,234,122,0.08)] transition-all"
              >
                <Phone className="w-5 h-5" /> {CONTACT.phone}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
