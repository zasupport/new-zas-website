import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, MessageCircle, Network, Wifi, Shield, Activity } from 'lucide-react';
import SchemaOrg from '@/components/seo/SchemaOrg';
import Breadcrumb from '@/components/ui/Breadcrumb';
import FAQAccordion from '@/components/ui/FAQ';
import { buildFaqSchema, buildBreadcrumbSchema, buildServiceSchema } from '@/lib/schema';
import { CONTACT, buildWhatsAppUrl } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'UniFi Network Services Johannesburg | Design, Install, Manage | ZA Support',
  description:
    'UniFi network design, supply, install, and monitor from a Ubiquiti partner with over 1,100 installations since 2014. Johannesburg, Sandton, Hyde Park. Call 064 529 5863.',
  keywords: [
    'unifi network services johannesburg',
    'ubiquiti unifi installer south africa',
    'unifi business wifi johannesburg',
    'unifi network design sandton',
    'managed unifi network south africa',
    'unifi access control deployment',
  ],
  alternates: { canonical: 'https://zasupport.com/business/unifi-network-services' },
  openGraph: {
    title: 'UniFi Network Services for Johannesburg Businesses',
    description:
      'Ubiquiti partner with over 1,100 UniFi deployments since 2014. Design, supply, install, and manage UniFi networks across Johannesburg and Gauteng.',
    url: 'https://zasupport.com/business/unifi-network-services',
    type: 'website',
  },
};

const faqs = [
  {
    question:
      'How do I get started with a UniFi Network Design and Management engagement?',
    answer:
      'Call us on 064 529 5863 or email courtney@zasupport.com to book a free discovery call. The call takes about thirty minutes and we use it to understand your current setup, your goals, and whether we are the right partner for the work. We follow with a written scope and quote within three working days.',
  },
  {
    question: 'What does the engagement cost?',
    answer:
      'UniFi Network Design and Management engagements start from R 18,500 excluding VAT. The final price depends on scope (number of users, number of sites, whether it is a one-off project or an ongoing managed service). We confirm all pricing in writing before any work begins.',
  },
  {
    question: 'Do you provide ongoing support after the initial engagement?',
    answer:
      'Yes. Most of our business customers move to a monthly managed service after the initial deployment, which covers user support, license management, security monitoring, and proactive maintenance. The managed service is optional — some customers prefer to call us only when they need us, which is fine too.',
  },
  {
    question: 'Are you Apple, Microsoft, and Ubiquiti certified?',
    answer:
      'Yes. We are an Apple Authorised IT Specialist, a Microsoft Cloud Solution Provider, and a Ubiquiti partner. Where the customer benefits from us holding the partner relationship (licensing, hardware procurement, escalation paths), we hold it directly.',
  },
  {
    question: 'Where are you based and which areas do you cover?',
    answer:
      'Our workshop is at 1 Hyde Lane, Second Floor, Office E2004, Hyde Park, Johannesburg 2196. We cover Johannesburg, Sandton, Hyde Park, Midrand, and the broader Gauteng region on-site, and the rest of South Africa remotely. For ongoing managed services, we cover anywhere in South Africa with same-day remote response and on-site visits scheduled as needed.',
  },
  {
    question: 'Is your engagement POPIA and HPCSA compliant?',
    answer:
      'Where the engagement touches data subject to POPIA or HPCSA (medical practices, professional services holding client records), the deployment is baselined against the relevant regulatory requirements. We document compliance posture and provide a written compliance summary on completion.',
  },
];

const whyPoints = [
  {
    icon: Network,
    title: 'Over 1,100 UniFi deployments since 2014',
    desc: 'Single-AP residential installs through to multi-site, multi-VLAN, multi-gateway estates of fifty plus access points.',
  },
  {
    icon: Shield,
    title: 'Registered Ubiquiti partner',
    desc: 'UEWA and UBWS accredited, with a direct Ubiquiti distribution channel relationship for the South African market.',
  },
  {
    icon: Activity,
    title: 'Managed monitoring, not just installation',
    desc: '24/7 alert handling, firmware management, configuration backup, security patching, quarterly capacity reviews.',
  },
];

export default function UniFiNetworkServicesPage() {
  const waCta = buildWhatsAppUrl('UNIFI-BUSINESS', 'UniFi Network Services');

  const serviceSchema = buildServiceSchema({
    name: 'UniFi Network Services — Design, Install, Manage',
    description:
      'UniFi network design, supply, install, and monitor from a Ubiquiti partner with over 1,100 installations since 2014. Johannesburg, Sandton, Hyde Park, broader Gauteng.',
    lowPrice: '18500',
    highPrice: '250000',
  });
  const faqSchema = buildFaqSchema(faqs);
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', url: 'https://zasupport.com' },
    { name: 'Business', url: 'https://zasupport.com/business' },
    {
      name: 'UniFi Network Services',
      url: 'https://zasupport.com/business/unifi-network-services',
    },
  ]);

  return (
    <>
      <SchemaOrg schema={serviceSchema} />
      <SchemaOrg schema={faqSchema} />
      <SchemaOrg schema={breadcrumbSchema} />

      {/* ── Hero ───────────────────────────────────────────────────────────── */}
      <section className="hero-gradient grid-overlay pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <Breadcrumb
              items={[
                { label: 'Business', href: '/business' },
                { label: 'UniFi Network Services' },
              ]}
            />
          </div>
          <div className="max-w-4xl">
            <p className="text-[#0FEA7A] text-sm font-semibold uppercase tracking-widest mb-3">
              Ubiquiti Partner · Johannesburg &amp; Gauteng
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#E8F4F1] leading-tight mb-6">
              UniFi Network Services for
              <br />
              <span className="text-[#0FEA7A]">Johannesburg Businesses</span>
            </h1>
            <p className="text-xl text-[#7A9E98] leading-relaxed max-w-3xl mb-8">
              We have designed, supplied, and installed over 1,100 UniFi networks since
              2014. UniFi is the platform we recommend most often for businesses that need
              genuinely managed Wi-Fi, switching, and security gateway infrastructure
              without the complexity (and cost) of larger vendors. We cover design,
              supply, installation, configuration, monitoring, and ongoing management for
              sites from single-floor offices to multi-building campuses across
              Johannesburg, Sandton, Hyde Park, and the broader Gauteng region.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={waCta}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl font-bold hover:bg-[#0FEA7A]/90 transition-all"
              >
                <MessageCircle className="w-5 h-5" /> WhatsApp us about UniFi
              </a>
              <a
                href={`tel:${CONTACT.phoneTel}`}
                className="inline-flex items-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all"
              >
                <Phone className="w-5 h-5" /> Call {CONTACT.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Why ZA Support ────────────────────────────────────────────────── */}
      <section className="py-14 bg-[#0F2522]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid sm:grid-cols-3 gap-6">
          {whyPoints.map((p) => (
            <div
              key={p.title}
              className="rounded-2xl border border-[rgba(15,234,122,0.18)] p-6"
            >
              <p.icon className="w-8 h-8 text-[#0FEA7A] mb-4" />
              <h2 className="text-lg font-bold text-[#E8F4F1] mb-2">{p.title}</h2>
              <p className="text-[#7A9E98] text-sm leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Body content ─────────────────────────────────────────────────── */}
      <section className="py-16 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* What we deliver */}
          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4">
              What we deliver
            </h2>
            <p className="text-[#7A9E98] leading-relaxed mb-6">
              Our UniFi Network Design and Management engagement covers design through to
              ongoing management. The exact scope depends on what your business already
              has in place and what you need from us, but every engagement includes the
              elements below.
            </p>

            <h3 className="text-xl font-bold text-[#E8F4F1] mb-3">
              What exactly do you do with UniFi: design, supply, install, configure,
              ongoing monitoring and management, or a subset?
            </h3>
            <p className="text-[#7A9E98] leading-relaxed">
              End-to-end UniFi delivery. Site survey: heatmap analysis (Ekahau or
              NetSpot), AP placement modelling, interference identification, structured
              cabling assessment, fibre run requirements. Network design: VLAN
              architecture (corporate, guest, IoT, voice, CCTV, point-of-sale isolation),
              SSID strategy with WPA3-Enterprise and RADIUS, Microsoft Entra ID identity
              integration via RADIUS NPS or Cloud Identity, Apple Business Manager Wi-Fi
              profile push for managed devices. Hardware specification: Dream Machine Pro
              Max, Dream Machine SE, Cloud Gateway Ultra, Pro Max switches (PoE+, PoE++),
              U7 Pro and U7 Pro Max access points, U7 Outdoor for estate and external
              deployment, UniFi Protect cameras (G5 Bullet, G5 Dome, G5 Pro, AI Pro),
              UniFi Talk telephony, UniFi Access door control, UniFi Identity Enterprise
              SSO. Supply via direct Ubiquiti distribution channel. Installation: cabling
              to Cat 6A and OM4 fibre, mounting, professional dressing and labelling.
              Configuration: UniFi Network Application, Cloud Gateway provisioning, Site
              Manager setup, RADIUS and Microsoft Entra integration, Apple Business
              Manager profile distribution. Commissioning: full handover documentation
              pack, credential register, network topology diagrams. Ongoing managed
              monitoring: 24/7 alert handling, firmware management, configuration
              backup, security patch deployment, quarterly capacity reviews, annual
              configuration audit.
            </p>

            <h3 className="text-xl font-bold text-[#E8F4F1] mt-8 mb-3">
              Are you a Ubiquiti partner or hold any networking accreditation?
            </h3>
            <p className="text-[#7A9E98] leading-relaxed">
              Yes. ZA Support is a registered Ubiquiti partner with over 1,100 UniFi
              deployments across South Africa. Accreditations: Ubiquiti Enterprise
              Wireless Admin (UEWA), Ubiquiti Broadband Specialist (UBWS). Direct
              distribution channel relationship with Ubiquiti for the South African
              market. UniFi Cloud Gateway, Dream Machine Pro, and full UniFi ecosystem
              deployment experience including UniFi Network, UniFi Protect, UniFi
              Access, UniFi Talk, UniFi Identity, UniFi Connect. Partner logo placement
              on UniFi service page and trust footer.
            </p>
          </div>

          {/* Why ZA Support */}
          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4">
              Why ZA Support
            </h2>
            <p className="text-[#7A9E98] leading-relaxed">
              We have operated as an Apple repair and IT specialist from Hyde Park since
              2009. Over 17 years we have built a 4.9-star reputation across 633 Google
              reviews and hold BEE Level 1 certification. We are an Apple Authorised IT
              Specialist, a Microsoft Cloud Solution Provider, and a Ubiquiti partner
              with over 1,100 UniFi installations since 2014. We work with consumer
              customers, SMBs, corporates, and medical practices across Gauteng, with
              most of our business coming from referrals.
            </p>
          </div>

          {/* What we have learned */}
          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4">
              What we have learned from doing this at scale
            </h2>

            <h3 className="text-xl font-bold text-[#E8F4F1] mb-3">
              What types of sites do you do UniFi for: offices, practices, multi-site,
              warehouses, retail, estates, farms?
            </h3>
            <p className="text-[#7A9E98] leading-relaxed">
              Full spectrum of South African site types. Single-office practices
              (medical, legal, accounting, consulting). Multi-site corporate (head
              office plus branches with site-to-site VPN). Retail (single store,
              multi-store chains, point-of-sale network segmentation, customer Wi-Fi
              captive portal). Warehouses and distribution centres (industrial wireless,
              scanner and forklift terminal coverage, RFID). Manufacturing (production
              floor wireless, OT and IT segmentation, SCADA isolation). Residential
              estates (HOA managed Wi-Fi, gatehouse access control integration,
              perimeter camera networks). Farms and agricultural properties (long-range
              point-to-point wireless, agricultural building Wi-Fi, perimeter security
              cameras, AirFiber for inter-building backhaul). Hospitality (guest Wi-Fi
              with captive portal and voucher systems, conference centre and event
              Wi-Fi). Medical practices and clinics (POPIA-segmented patient data
              network, HPCSA compliance baseline). Legal and accounting firms with
              privileged data segmentation. Educational facilities including schools and
              tertiary campuses. Office buildings and shared workspace operators.
            </p>

            <h3 className="text-xl font-bold text-[#E8F4F1] mt-8 mb-3">
              Is UniFi work once-off project work, or can it form part of an ongoing
              managed agreement?
            </h3>
            <p className="text-[#7A9E98] leading-relaxed">
              Both. UniFi work is delivered as standalone project (design, supply,
              install, commission) and as fully managed services. Active managed UniFi
              clients span corporate, enterprise, small business, residential estate,
              hospitality, retail, and manufacturing categories. Managed scope: 24/7
              alert monitoring (gateway down, AP unreachable, switch port error,
              abnormal traffic patterns), firmware update management on Ubiquiti&apos;s
              quarterly release schedule, configuration backup (daily) and restore (on
              demand), security event review and incident response, quarterly capacity
              and performance reviews, change management for moves, adds, changes,
              annual configuration drift audit, and monthly client reporting pack.
              Recurring revenue model linked to per-site, per-AP, or per-user SLA.
            </p>
          </div>

          {/* Our approach */}
          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4">
              Our approach
            </h2>
            <p className="text-[#7A9E98] leading-relaxed mb-4">
              Every engagement follows a four-step approach. The first step is always a
              discovery call to understand what you have, what is working, and where
              the gaps are. The second is a written scope and quote so you know exactly
              what the engagement covers and what it costs before anything starts. The
              third is the work itself, with weekly checkpoints for anything longer
              than a single visit. The fourth is handover and the option of an ongoing
              managed service if you want one.
            </p>
            <p className="text-[#7A9E98] leading-relaxed">
              The discovery call is free and there is no obligation. We use it to
              understand the current state of your environment, what your business
              needs from the engagement, what your timeline looks like, and what your
              budget envelope is. If we are not the right partner for the work, we tell
              you that during or immediately after the call and we point you toward
              someone who is. We do not waste your time, and we do not waste ours, by
              chasing engagements that are a poor fit.
            </p>
          </div>

          {/* Pricing */}
          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4">
              Pricing
            </h2>
            <p className="text-[#7A9E98] leading-relaxed mb-4">
              UniFi Network Design and Management engagements start from{' '}
              <span className="text-[#0FEA7A] font-semibold">R 18,500 excluding VAT</span>.
              The final quote depends on the scope, the number of users or devices, and
              whether you want a one-off project or an ongoing managed service. We
              confirm pricing in writing after the discovery call, and we do not start
              work without a signed quote.
            </p>
            <p className="text-[#7A9E98] leading-relaxed">
              Where the engagement is best structured as a fixed-price project, we
              quote it that way. Where it is better structured as a monthly managed
              service (most ongoing IT support, security monitoring, license
              management) we quote it on a per-user or per-device basis with a written
              service level. Where it is genuinely time-and-materials work (recovery
              from an incident, complex migration with unknown scope), we are honest
              about that and we keep you informed of accruing time so there are no
              surprises.
            </p>
            <div className="mt-6 rounded-xl border border-[#C6392C]/40 bg-[#C6392C]/10 p-4">
              <p className="text-sm text-[#E8F4F1]">
                Indicative pricing only. Final pricing is confirmed after a discovery
                call and written scope.{' '}
                <Link href="/contact" className="text-[#0FEA7A] underline">
                  Contact us
                </Link>{' '}
                or call {CONTACT.phone}.
              </p>
            </div>
          </div>

          {/* Who we work with */}
          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4">
              Who we work with
            </h2>
            <h3 className="text-xl font-bold text-[#E8F4F1] mb-3">
              Roughly how many UniFi deployments has ZA Support done, or how long have
              you offered it?
            </h3>
            <p className="text-[#7A9E98] leading-relaxed">
              Over 1,100 UniFi deployments delivered across South Africa. ZA Support
              has been deploying Ubiquiti UniFi networks since 2014. Deployment scale
              ranges from single-AP residential installations through to multi-site,
              multi-VLAN, multi-gateway estates of fifty plus access points. Reference
              site list available under NDA. Verifiable case studies in medical
              practice, residential estate, hospitality, and corporate office
              categories.
            </p>
          </div>

          {/* Related services */}
          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4">
              Related services
            </h2>
            <p className="text-[#7A9E98] leading-relaxed mb-4">
              This page is part of our business services suite. Related pages cover our
              other specialist areas — Microsoft 365 deployment, managed IT services,
              medical practice IT, and Apple device management. We commonly engage
              across multiple areas for a single customer, and where we do the
              engagements are coordinated under a single account manager.
            </p>
            <ul className="space-y-2 text-[#7A9E98]">
              <li>
                <Link href="/business" className="text-[#0FEA7A] hover:underline">
                  Business IT Hub
                </Link>
              </li>
              <li>
                <Link
                  href="/managed-services/unifi-networking"
                  className="text-[#0FEA7A] hover:underline"
                >
                  Managed UniFi Networking
                </Link>
              </li>
              <li>
                <Link href="/managed-services" className="text-[#0FEA7A] hover:underline">
                  Managed IT Services
                </Link>
              </li>
              <li>
                <Link href="/medical-it" className="text-[#0FEA7A] hover:underline">
                  Medical Practice IT
                </Link>
              </li>
              <li>
                <Link href="/enterprise" className="text-[#0FEA7A] hover:underline">
                  Enterprise Apple Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Book a discovery call */}
          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4">
              Book a discovery call
            </h2>
            <p className="text-[#7A9E98] leading-relaxed mb-6">
              A discovery call is free and takes about thirty minutes. We use the call
              to understand what you have, what you need, and whether we are the right
              partner. If we are, we follow the call with a written scope and quote
              within three working days. If we are not, we will tell you that directly
              and point you toward someone who is. Call us on{' '}
              <a
                href={`tel:${CONTACT.phoneTel}`}
                className="text-[#0FEA7A] hover:underline"
              >
                {CONTACT.phone}
              </a>{' '}
              or email{' '}
              <a
                href="mailto:courtney@zasupport.com"
                className="text-[#0FEA7A] hover:underline"
              >
                courtney@zasupport.com
              </a>{' '}
              to book.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={waCta}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl font-bold hover:bg-[#0FEA7A]/90 transition-all"
              >
                <Wifi className="w-5 h-5" /> WhatsApp about UniFi
              </a>
              <a
                href={`tel:${CONTACT.phoneTel}`}
                className="inline-flex items-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all"
              >
                <Phone className="w-5 h-5" /> Call {CONTACT.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────────── */}
      <section className="py-16 bg-[#0F2522]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQAccordion items={faqs} title="UniFi Network Services — frequently asked questions" />
          <p className="mt-6 text-[#7A9E98] text-sm">
            The questions we hear most often from prospective customers are above. If
            yours is not here, the fastest way to get an answer is to call us on{' '}
            <a
              href={`tel:${CONTACT.phoneTel}`}
              className="text-[#0FEA7A] hover:underline"
            >
              {CONTACT.phone}
            </a>{' '}
            or email{' '}
            <a
              href="mailto:courtney@zasupport.com"
              className="text-[#0FEA7A] hover:underline"
            >
              courtney@zasupport.com
            </a>
            .
          </p>
        </div>
      </section>
    </>
  );
}
