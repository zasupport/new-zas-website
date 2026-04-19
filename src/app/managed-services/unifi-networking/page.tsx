import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, ArrowRight, Shield, Wifi, Network, Lock, Activity, Building2 } from 'lucide-react';
import SchemaOrg from '@/components/seo/SchemaOrg';
import { buildFaqSchema, buildServiceSchema, buildBreadcrumbSchema } from '@/lib/schema';
import FAQAccordion from '@/components/ui/FAQ';
import { CONTACT } from '@/lib/constants';
import PricingNote from '@/components/PricingNote';

export const metadata: Metadata = {
  title: 'UniFi Business Networking Johannesburg 2026 | From R599 Assessment | ZA Support',
  description:
    'UniFi business networking for practices in Sandton, Bryanston, Morningside and Hyde Park. Segmented WiFi for POPIA, guest isolation, VPN, and managed support. R599 site assessment.',
  alternates: { canonical: 'https://zasupport.com/managed-services/unifi-networking' },
};

const faqs = [
  {
    question: 'Why UniFi rather than a consumer router for a business practice?',
    answer:
      'Consumer routers from MTN, Vodacom, or Vumatel kits are built for a single household with fewer than 10 devices. A medical practice or financial advisory with 8 staff, 2 printers, a guest WiFi, and a payment terminal easily exceeds 25 devices. Consumer hardware runs out of DHCP leases, drops connections during backup windows, and offers no way to isolate guest traffic from your practice network. UniFi is designed for exactly this load — we routinely run 40-60 devices on a single UniFi Dream Machine Pro without performance degradation.',
  },
  {
    question: 'How does VLAN segmentation help with POPIA compliance?',
    answer:
      'POPIA requires that personal information is protected with appropriate technical measures. VLAN segmentation is one of the most practical technical controls available. We configure separate VLANs for staff workstations, patient or client devices, guest WiFi, IoT devices (printers, cameras, payment terminals), and management traffic. If a patient device on guest WiFi is compromised, it cannot reach your practice management system on the staff VLAN. For medical practices under HPCSA and POPIA obligations, this is a documented, auditable control that a generic router cannot provide.',
  },
  {
    question: 'What does a typical UniFi installation cost in Johannesburg?',
    answer:
      'Every site is different, but typical ranges for a small to medium practice are: single-floor office (up to 8 staff) — R18,000 to R28,000 including Dream Machine Pro, 2 WiFi 6 access points, a 24-port switch, and installation. Dual-floor or larger practice — R32,000 to R55,000 including additional access points, PoE cameras, and structured cabling. These are once-off hardware and installation costs. Monthly managed support starts from R1,799 per month including monitoring, firmware updates, and priority on-site response.',
  },
  {
    question: 'Do you service practices in Sandton, Bryanston, Rosebank, and Morningside?',
    answer:
      'Yes. Our installation team covers all Gauteng suburbs within 60 kilometres of our Hyde Park workshop. Primary coverage includes Sandton, Rosebank, Bryanston, Fourways, Morningside, Rivonia, Houghton, Melrose, Illovo, Parkhurst, Sunninghill, Paulshof, Woodmead, Kyalami, Edenvale, and Bedfordview. Extended coverage reaches Midrand, Kempton Park, Centurion, and Pretoria. We typically complete a small-office UniFi installation in a single working day with minimal disruption to your practice.',
  },
  {
    question: 'Can UniFi replace my existing Vumatel or Openserve router?',
    answer:
      'Yes, in almost every case. We keep the fibre connection from Vumatel, Openserve, Metrofibre, or your ISP exactly as it is, and replace the supplied router with a UniFi Dream Machine. The ISP handoff is a standard ethernet connection — the UniFi device handles PPPoE authentication, NAT, firewalling, and WiFi. You retain the same fibre package and speed, but gain enterprise-grade routing, segmentation, and visibility.',
  },
  {
    question: 'How do you handle load shedding and power continuity?',
    answer:
      'We specify a UPS (typically a Mecer or APC unit sized to 650VA or 1000VA) to keep the UniFi Dream Machine, switch, and first access point running through Stage 4 load shedding. This preserves internet connectivity and at least one WiFi access point in the reception or primary work area during outages. For practices with a fibre router that requires separate power, we include that device on the UPS circuit. We test the UPS runtime on installation day and schedule annual battery replacement as part of the managed support plan.',
  },
  {
    question: 'Do you provide managed WiFi for multiple sites?',
    answer:
      'Yes. UniFi is particularly strong for multi-site practices because every access point, switch, and gateway reports back to a single cloud console. A specialist practice with rooms in both Sandton and Pretoria, or a wealth management firm with a head office in Hyde Park and a satellite office in Midrand, can be managed as one unified network. We see consistent traffic patterns, bandwidth utilisation, and security events across all locations in a single dashboard.',
  },
  {
    question: 'How long does a UniFi installation take?',
    answer:
      'For a typical small practice with up to 8 staff and a single floor, we complete the full installation in one working day. This includes unpacking and mounting the hardware, cabling any new runs required, configuring the UniFi Dream Machine with your VLAN structure, deploying access points with optimised 2.4GHz and 5GHz channels, migrating existing wired devices, setting up staff and guest WiFi, and documenting the configuration. We schedule installations after hours or on weekends for practices that cannot accept any downtime during working hours.',
  },
  {
    question: 'Can I add cameras and door access to the same UniFi system?',
    answer:
      'Yes. UniFi Protect (cameras) and UniFi Access (door readers) integrate into the same console as the networking equipment. For a medical practice in Morningside, we have deployed G4 Bullet cameras covering the reception, waiting area, and dispensary, with footage stored on a UniFi Network Video Recorder in the server room. Access control on the treatment rooms uses UniFi Access Hub with card readers. Everything runs over the same PoE switches and reports into the same dashboard — no separate vendor, no separate cabling, no separate monthly fees.',
  },
  {
    question: 'What is included in the R599 site assessment?',
    answer:
      'The R599 assessment covers: an on-site survey of your existing network and cabling, a WiFi heat map of the premises using professional survey tools to identify dead zones, a device inventory with recommended VLAN assignment, a cabling gap analysis, a written proposal with hardware and installation quotation, and a compliance review against POPIA requirements where applicable. The assessment fee is credited against installation if you proceed within 60 days.',
  },
];

const tiers = [
  {
    name: 'Essential',
    price: 'R1,799',
    period: '/month',
    ideal: 'Small practice, up to 15 devices',
    features: [
      'UniFi network monitoring (24/7)',
      'Firmware updates and security patches',
      'Monthly health report',
      'Guest WiFi portal management',
      'VLAN policy maintenance',
      'Remote troubleshooting',
      '4-hour response (business hours)',
      'Annual on-site audit',
    ],
  },
  {
    name: 'Professional',
    price: 'R2,899',
    period: '/month',
    ideal: 'Medium practice, up to 40 devices',
    features: [
      'Everything in Essential',
      '2-hour response (business hours)',
      'Quarterly on-site network audit',
      'UPS battery health monitoring',
      'VPN deployment and support',
      'UniFi Protect camera management',
      'POPIA-aligned segmentation review',
      'Priority after-hours emergency support',
    ],
  },
  {
    name: 'Practice Plus',
    price: 'R4,499',
    period: '/month',
    ideal: 'Multi-site or 40+ devices',
    features: [
      'Everything in Professional',
      '1-hour response (business hours)',
      'Multi-site unified dashboard',
      'UniFi Access door control included',
      'Bi-monthly on-site audit',
      'Bandwidth and latency analytics',
      'Dedicated account engineer',
      'Custom SLA and escalation path',
    ],
  },
];

const serviceSchema = buildServiceSchema({
  name: 'UniFi Business Networking Johannesburg',
  description:
    'UniFi business networking installation and managed support for practices in Johannesburg. POPIA-aligned VLAN segmentation, WiFi 6 access points, guest isolation, and multi-site management.',
  lowPrice: '1799',
  highPrice: '4499',
});

const faqSchema = buildFaqSchema(faqs);

const breadcrumbSchema = buildBreadcrumbSchema([
  { name: 'Home', url: 'https://zasupport.com' },
  { name: 'Managed Services', url: 'https://zasupport.com/managed-services' },
  { name: 'UniFi Business Networking', url: 'https://zasupport.com/managed-services/unifi-networking' },
]);

export default function UniFiNetworkingPage() {
  return (
    <>
      <SchemaOrg schema={serviceSchema} />
      <SchemaOrg schema={faqSchema} />
      <SchemaOrg schema={breadcrumbSchema} />

      {/* Hero */}
      <section className="hero-gradient grid-overlay pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <p className="text-[#0FEA7A] text-sm font-semibold tracking-widest uppercase mb-4">
              Business Networking &mdash; UniFi Specialists
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#E8F4F1] leading-tight mb-6">
              UniFi Business Networking
              <br />
              <span className="text-[#0FEA7A]">Johannesburg</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-6 max-w-3xl leading-relaxed">
              Properly segmented, monitored, and POPIA-aligned networking for practices in Sandton,
              Bryanston, Rosebank, Morningside, and the greater Johannesburg area. Installation from
              R18,000. Managed support from R1,799 per month. Site assessment R599.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="https://wa.me/27790539964?text=Hi%2C%20I%27m%20interested%20in%20a%20UniFi%20network%20assessment%20for%20my%20practice"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 transition-all"
              >
                <Phone className="w-5 h-5" /> WhatsApp Us
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all"
              >
                Book R599 Assessment <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Business Networking Matters */}
      <section className="py-12 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-4 text-center">
            Why a Consumer Router Cannot Run Your Practice
          </h2>
          <p className="text-[#7A9E98] text-center max-w-3xl mx-auto mb-12 leading-relaxed">
            Over 16 years supporting Johannesburg practices, the single most common root cause of
            intermittent outages, slow backups, dropped video calls, and unexplained security
            incidents has been the same: the practice is running on the ISP-supplied router that
            came in the fibre installation kit. Here is what changes when we move a practice to UniFi.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Network,
                title: 'Proper VLAN Segmentation',
                desc: 'Staff devices, guest WiFi, printers, cameras, and payment terminals each get their own VLAN. A compromised guest device cannot reach your practice management system. For medical practices under HPCSA and POPIA, this is a documented, auditable technical control.',
              },
              {
                icon: Wifi,
                title: 'WiFi 6 Coverage That Actually Works',
                desc: 'Consumer routers claim great WiFi but fall over at 10 metres. We survey your premises, plan access point placement, and deploy WiFi 6 hardware that holds 100+ Mbps throughput in every room. No more dead zones in the consulting rooms or reception.',
              },
              {
                icon: Shield,
                title: 'Built-in Firewalling and IDS',
                desc: 'UniFi Dream Machine includes enterprise-grade firewalling, intrusion detection, and threat signature updates. We enable rules that block known malicious IP ranges, geofence out high-risk regions, and alert us in real time when suspicious activity occurs.',
              },
              {
                icon: Lock,
                title: 'Guest WiFi Without the Risk',
                desc: 'Patients, clients, and visitors connect to a guest WiFi portal that is completely isolated from your practice network. They get branded captive portal, bandwidth limits, and session timeouts. You get confidence that no one on guest WiFi can reach your servers.',
              },
              {
                icon: Activity,
                title: 'Real-time Monitoring and Alerting',
                desc: 'Every UniFi device reports to our monitoring platform. If an access point goes offline at 04:30 on a Saturday, we know before you arrive on Monday. Bandwidth spikes, device disconnects, and failed authentications are logged and analysed continuously.',
              },
              {
                icon: Building2,
                title: 'Multi-Site as a Single Network',
                desc: 'A specialist practice with rooms in Sandton and Pretoria, or a wealth manager with offices in Hyde Park and Midrand, sees every site in one dashboard. Consistent policy, consistent guest WiFi branding, consistent security baseline across every location.',
              },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="glass-card p-6">
                <div className="w-12 h-12 bg-[rgba(15,234,122,0.1)] rounded-xl flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-[#0FEA7A]" />
                </div>
                <h3 className="text-[#E8F4F1] font-bold mb-2">{title}</h3>
                <p className="text-[#7A9E98] text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VLAN + POPIA */}
      <section className="py-12 sm:py-20 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-6">
            VLAN Segmentation as a POPIA Technical Control
          </h2>
          <div className="space-y-6 text-[#7A9E98] leading-relaxed">
            <p>
              POPIA Section 19 requires responsible parties to secure the integrity and
              confidentiality of personal information through appropriate and reasonable
              technical and organisational measures. The Information Regulator has made it
              clear that &ldquo;appropriate&rdquo; is judged against the sensitivity of the
              data and the state of the art. For a medical practice in Morningside handling
              patient records, a single flat network where a guest phone shares a broadcast
              domain with your practice management server is no longer defensible.
            </p>
            <p>
              Our standard VLAN design for a practice includes: VLAN 10 for staff workstations
              with access to the practice management system, VLAN 20 for guest WiFi with
              internet-only access, VLAN 30 for printers and copiers (no internet, no staff
              access), VLAN 40 for IoT devices such as cameras and payment terminals, and
              VLAN 99 reserved for network management. Each VLAN has its own firewall policy
              enforced at the UniFi Dream Machine. A device on one VLAN cannot even see the
              existence of devices on another VLAN unless we explicitly permit it.
            </p>
            <p>
              The most common mistake we see is practices that purchased expensive security
              software but did not segment the network underneath it. Endpoint protection on
              the reception computer is meaningful only if a guest on the same network cannot
              scan, probe, and exploit it. VLAN segmentation is the foundation that makes every
              other security control more effective.
            </p>
            <p>
              For POPIA assessments and regulator engagements, we provide a network diagram,
              a VLAN policy document, and an access control matrix on request. These are the
              three artefacts the Information Regulator typically asks for when assessing the
              reasonableness of a responsible party&rsquo;s technical measures.
            </p>
          </div>
        </div>
      </section>

      {/* WiFi 6 and Coverage Planning */}
      <section className="py-12 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-6">
            WiFi 6 Access Points and Coverage Planning
          </h2>
          <div className="space-y-6 text-[#7A9E98] leading-relaxed">
            <p>
              A single ISP-supplied router in the boardroom does not cover a typical
              Johannesburg practice. Office walls here are frequently double-brick or
              reinforced concrete. A consulting suite in Bryanston with a waiting room, three
              consulting rooms, a dispensary, and reception needs at least two access points
              to maintain 100 Mbps throughput in every room. For larger premises in Sandton
              office blocks, we plan three to six access points with proper channel allocation
              to prevent interference.
            </p>
            <p>
              Our site assessment includes a physical WiFi survey using a calibrated tool to
              map signal strength and interference patterns before any hardware is quoted. We
              identify dead zones, co-channel interference from neighbouring offices, and
              obstructions that affect 5GHz propagation. The output is a placement diagram
              showing exactly where each access point will be mounted and what coverage it
              will deliver.
            </p>
            <p>
              For practices where WiFi is business-critical — video consultations, telehealth,
              cloud-hosted practice management, or large file transfers to medical aids — we
              deploy WiFi 6 access points with dedicated 5GHz radios and reserve the 2.4GHz
              band for IoT devices. This separation alone typically doubles effective
              throughput compared to a single consumer access point trying to serve both.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section className="py-12 sm:py-20 bg-[#111C1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-4 text-center">
            Managed Support Plans
          </h2>
          <p className="text-[#7A9E98] text-center max-w-2xl mx-auto mb-10">
            All prices exclude VAT. Once-off installation is quoted separately based on site
            survey. 12-month contracts include quarterly review meetings.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {tiers.map((tier, i) => (
              <div
                key={tier.name}
                className={`glass-card p-8 ${i === 1 ? 'border-[rgba(15,234,122,0.4)] shadow-[0_0_24px_rgba(15,234,122,0.1)]' : ''}`}
              >
                {i === 1 && (
                  <div className="text-[#0FEA7A] text-xs font-bold mb-3 tracking-widest uppercase">
                    Most Popular
                  </div>
                )}
                <h3 className="text-[#E8F4F1] text-xl font-bold mb-1">{tier.name}</h3>
                <p className="text-[#7A9E98] text-xs mb-2">{tier.ideal}</p>
                <p className="text-3xl font-extrabold text-[#0FEA7A] mb-6">
                  {tier.price}
                  <span className="text-sm font-normal text-[#7A9E98]">{tier.period}</span>
                </p>
                <ul className="space-y-2 mb-6">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-[#7A9E98] text-sm">
                      <span className="text-[#0FEA7A] mt-0.5">&#10003;</span> {f}
                    </li>
                  ))}
                </ul>
                <a
                  href="https://wa.me/27790539964?text=Hi%2C%20I%27m%20interested%20in%20the%20UniFi%20managed%20plan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center bg-[rgba(15,234,122,0.1)] border border-[rgba(15,234,122,0.3)] text-[#0FEA7A] px-4 py-3 rounded-xl text-sm font-semibold hover:bg-[rgba(15,234,122,0.2)] transition-all"
                >
                  Enquire via WhatsApp
                </a>
              </div>
            ))}
          </div>
          <PricingNote />
        </div>
      </section>

      {/* Installation Process */}
      <section className="py-12 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-6">
            Our Installation Process
          </h2>
          <div className="space-y-6 text-[#7A9E98] leading-relaxed">
            <p>
              Every UniFi deployment in our workshop follows the same six-stage process, refined
              over hundreds of practice installations across Johannesburg.
            </p>
            <p>
              <strong className="text-[#E8F4F1]">Stage one is the R599 site assessment.</strong>{' '}
              We walk the premises, survey WiFi coverage, inspect cabling, inventory devices,
              and interview staff about pain points. We leave with a clear picture of what
              hardware is needed and where each component will be placed.
            </p>
            <p>
              <strong className="text-[#E8F4F1]">Stage two is proposal and quotation.</strong>{' '}
              Within 48 hours you receive a written proposal with the hardware list, installation
              scope, cabling gap analysis, and total investment. Pricing is itemised so you can
              see exactly what each component costs.
            </p>
            <p>
              <strong className="text-[#E8F4F1]">Stage three is pre-staging.</strong> Every
              access point, switch, and gateway is unpacked, firmware-updated, and
              pre-configured at our Hyde Park workshop before we arrive on site. This
              eliminates multiple hours of on-site setup time and reduces installation
              day disruption to a minimum.
            </p>
            <p>
              <strong className="text-[#E8F4F1]">Stage four is installation day.</strong> We
              arrive early, mount access points, run any additional cabling, and migrate
              devices onto their correct VLANs. For practices that cannot accept any downtime,
              we work after hours or on a Saturday.
            </p>
            <p>
              <strong className="text-[#E8F4F1]">Stage five is verification.</strong> We test
              throughput at every access point, verify guest WiFi isolation from the staff
              VLAN, confirm failover behaviour during a simulated outage, and walk your
              practice manager through the new setup.
            </p>
            <p>
              <strong className="text-[#E8F4F1]">Stage six is handover and monitoring.</strong>{' '}
              We enrol every device into our monitoring platform, document the configuration,
              and activate your managed support plan. From that moment forward, we see your
              network health 24 hours a day.
            </p>
          </div>
        </div>
      </section>

      {/* Suburbs Served */}
      <section className="py-12 sm:py-20 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-6">
            UniFi Installations Across Johannesburg
          </h2>
          <div className="space-y-6 text-[#7A9E98] leading-relaxed">
            <p>
              We install and support UniFi networks for practices across the greater
              Johannesburg area. Primary service area within 20 kilometres of our Hyde Park
              workshop: Sandton, Rosebank, Bryanston, Fourways, Morningside, Rivonia, Houghton,
              Melrose, Illovo, Parkhurst, Northcliff, Randburg, Sunninghill, Paulshof, Woodmead,
              Kyalami, Edenvale, and Bedfordview.
            </p>
            <p>
              Extended service area within 60 kilometres: Midrand, Kempton Park, Centurion,
              Pretoria, Roodepoort, Boksburg, Benoni, Alberton, Germiston, and Randpark Ridge.
              For practices outside the 60-kilometre radius, we work with trusted installation
              partners while retaining remote management and support from our workshop.
            </p>
            <p>
              Typical practice types we support: medical and dental practices, financial
              advisories and wealth managers, legal firms, accounting practices, architectural
              studios, and specialist professional services. The common thread is that
              confidential client information flows across the network every day and the
              practice cannot afford amateur-grade infrastructure.
            </p>
          </div>
        </div>
      </section>

      {/* Related Services */}
      <section className="py-12 sm:py-16 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-extrabold text-[#E8F4F1] mb-6">Related Services</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link
              href="/managed-services"
              className="glass-card p-6 hover:border-[rgba(15,234,122,0.4)] transition-all"
            >
              <h3 className="text-[#E8F4F1] font-bold mb-2">All Managed Services</h3>
              <p className="text-[#7A9E98] text-sm">
                Overview of our full managed IT and networking offering for practices.
              </p>
            </Link>
            <Link
              href="/managed-services/apple-specialist"
              className="glass-card p-6 hover:border-[rgba(15,234,122,0.4)] transition-all"
            >
              <h3 className="text-[#E8F4F1] font-bold mb-2">Apple Specialist IT</h3>
              <p className="text-[#7A9E98] text-sm">
                Dedicated Apple-first managed services with JAMF MDM and fleet management.
              </p>
            </Link>
            <Link
              href="/apple-support/medical-practices"
              className="glass-card p-6 hover:border-[rgba(15,234,122,0.4)] transition-all"
            >
              <h3 className="text-[#E8F4F1] font-bold mb-2">Medical Practice IT</h3>
              <p className="text-[#7A9E98] text-sm">
                HPCSA-aligned IT management for healthcare practices in Johannesburg.
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 sm:py-20 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQAccordion items={faqs} title="UniFi Business Networking &mdash; Common Questions" />
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-[rgba(39,80,77,0.3)] border border-[rgba(15,234,122,0.2)] rounded-3xl p-10">
            <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3">
              Book Your R599 Network Assessment
            </h2>
            <p className="text-[#7A9E98] mb-2">
              We walk your premises, survey WiFi coverage, review your cabling, and deliver a
              written proposal within 48 hours. The R599 fee is credited against installation
              if you proceed within 60 days.
            </p>
            <p className="text-[#7A9E98] text-sm mb-6">
              Based at 1 Hyde Park Lane, Hyde Park. Serving practices across Gauteng within a
              60-kilometre radius.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/27790539964?text=Hi%2C%20I%27d%20like%20to%20book%20a%20UniFi%20site%20assessment"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 transition-all"
              >
                <Phone className="w-5 h-5" /> WhatsApp Us Now
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
