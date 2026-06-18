import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Phone, ArrowRight, Package, Server, Settings, Wrench, GraduationCap, ShieldCheck,
} from 'lucide-react';
import SchemaOrg from '@/components/seo/SchemaOrg';
import Breadcrumb from '@/components/ui/Breadcrumb';
import FAQAccordion from '@/components/ui/FAQ';
import { buildFaqSchema, buildBreadcrumbSchema, buildServiceSchema } from '@/lib/schema';
import { CONTACT, buildWhatsAppUrl } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Adobe Creative Cloud Support South Africa | Licensing & Deployment | ZA Support',
  description:
    'Adobe Creative Cloud licence supply, deployment, managed updates, troubleshooting, and training for South African creative teams and businesses.',
  alternates: {
    canonical: 'https://zasupport.com/business/adobe-creative-cloud-support',
  },
};

const faqs = [
  {
    question: 'How do I get started with an Adobe Creative Cloud Licensing and Support engagement?',
    answer:
      'Call us on 064 529 5863 or email courtney@zasupport.com to book a free discovery call. The call takes about thirty minutes and we use it to understand your current setup, your goals, and whether we are the right partner for the work. We follow with a written scope and quote within three working days.',
  },
  {
    question: 'What does the engagement cost?',
    answer:
      'Adobe Creative Cloud Licensing and Support engagements start from R 8,500 excluding VAT. The final price depends on scope (number of users, number of sites, whether it is a one-off project or an ongoing managed service). We confirm all pricing in writing before any work begins.',
  },
  {
    question: 'Do you provide ongoing support after the initial engagement?',
    answer:
      'Yes. Most of our business customers move to a monthly managed service after the initial deployment, which covers user support, licence management, security monitoring, and proactive maintenance. The managed service is optional, some customers prefer to call us only when they need us, which is fine too.',
  },
  {
    question: 'Are you Apple, Microsoft, and Ubiquiti certified?',
    answer:
      'Yes. We are an Apple Authorised IT Specialist, a Microsoft Cloud Solution Provider, and a Ubiquiti partner. Where the customer benefits from us holding the partner relationship (licensing, hardware procurement, escalation paths), we hold it directly.',
  },
  {
    question: 'Where are you based and which areas do you cover?',
    answer:
      'Our workshop is at 1 Hyde Lane, Second Floor, Office E2004, Hyde Park, Johannesburg 2196. We cover Johannesburg, Sandton, Hyde Park, Midrand, and the broader Gauteng region on-site within a 60-kilometre radius. For ongoing managed services, we cover anywhere in South Africa with same-day remote response and on-site visits scheduled as needed.',
  },
  {
    question: 'Is your engagement POPIA and HPCSA compliant?',
    answer:
      'Where the engagement touches data subject to POPIA or HPCSA (medical practices, professional services holding client records), the deployment is baselined against the relevant regulatory requirements. We document the compliance posture and provide a written compliance summary on completion.',
  },
  {
    question: 'Do you support Adobe in a managed and MDM-deployed way across a business fleet?',
    answer:
      'Yes. We package Adobe Creative Cloud for deployment via Microsoft Intune (Windows and macOS) and Jamf Pro (macOS and iOS). Centralised licence assignment runs through the Adobe Admin Console with SCIM provisioning from Microsoft Entra ID. Update channels are managed per workload, latest release for non-production users, prior release for production stability where workflow continuity matters. AVX2 compatibility is enforced (pre-2014 Intel Macs flagged for Creative Cloud 2024 and earlier). Silent install, silent update, and silent uninstall are configured per machine. Reporting flows through the Adobe Admin Console and Microsoft Intune compliance state, with quarterly licence optimisation reviews to right-size All Apps versus single-app subscriptions.',
  },
  {
    question: 'Which Adobe apps do business clients most need help with?',
    answer:
      'Photoshop, InDesign, Illustrator, After Effects, Premiere Pro, Acrobat Pro, Lightroom Classic, Lightroom CC, and Adobe Firefly are the highest-volume requests. Lower-volume but fully supported: Audition, Animate, Bridge, Substance 3D Painter, Substance 3D Sampler, Fresco, Express, Dimension, and Character Animator. Photoshop and InDesign generate the most support tickets across professional services and design firms. After Effects and Premiere Pro drive the highest-value Mac hardware specification engagements. Acrobat Pro generates the largest licence rollouts in legal and accounting. Lightroom Classic dominates the photography studio segment. Adobe Firefly is becoming a meaningful workflow line as AI image generation enters production pipelines.',
  },
];

const offerings = [
  {
    icon: Package,
    title: 'Licence supply and reseller fulfilment',
    desc: 'Single-app, All Apps, business, education, government, Adobe Stock, and Firefly credits, supplied direct or via Adobe VIP.',
  },
  {
    icon: Settings,
    title: 'Tenant configuration',
    desc: 'Adobe Admin Console set-up, identity federation with Microsoft Entra ID, SCIM group sync, and migration off device-based serial keys to named-user licensing.',
  },
  {
    icon: Server,
    title: 'MDM deployment',
    desc: 'Adobe Creative Cloud Packager builds delivered via Microsoft Intune (Windows and macOS) and Jamf Pro (macOS and iOS), silent install, licence assignment, update ring control.',
  },
  {
    icon: Wrench,
    title: 'Troubleshooting and tuning',
    desc: 'Font management, plug-in conflicts, GPU acceleration, ICC colour profile deployment, cache and scratch disk placement, RAM headroom for After Effects multi-frame rendering.',
  },
  {
    icon: ShieldCheck,
    title: 'Managed updates',
    desc: 'Adobe Update Manager configuration, update ring scheduling, regression testing on AVX2-affected hardware, and the prior-release stability channel for production teams.',
  },
  {
    icon: GraduationCap,
    title: 'Training and adoption',
    desc: 'Hands-on training per application for design, marketing, and architectural teams who need to lift skill level beyond self-taught fundamentals.',
  },
];

export default function AdobeCreativeCloudSupportPage() {
  const faqSchema = buildFaqSchema(faqs);
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', url: 'https://zasupport.com' },
    { name: 'Business', url: 'https://zasupport.com/business' },
    {
      name: 'Adobe Creative Cloud Support',
      url: 'https://zasupport.com/business/adobe-creative-cloud-support',
    },
  ]);
  const serviceSchema = buildServiceSchema({
    name: 'Adobe Creative Cloud Licensing and Support',
    description:
      'Adobe Creative Cloud licence supply, deployment, managed updates, troubleshooting, and training for South African creative teams and businesses.',
    lowPrice: '8500',
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
            <Breadcrumb
              items={[
                { label: 'Business', href: '/business' },
                { label: 'Adobe Creative Cloud Support' },
              ]}
            />
          </div>
          <div className="max-w-4xl">
            <p className="text-[#0FEA7A] text-sm font-semibold uppercase tracking-widest mb-3">
              Adobe Solutions Partner · Johannesburg &amp; South Africa
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#E8F4F1] leading-tight mb-6">
              Adobe Creative Cloud Support, 
              <br />
              <span className="text-[#0FEA7A]">Licensing, Deployment, Management</span>
            </h1>
            <p className="text-xl text-[#7A9E98] leading-relaxed max-w-3xl mb-6">
              Adobe Creative Cloud is the platform most South African creative teams,
              marketing departments, and architectural studios depend on for daily work. We
              supply licences (VIP and direct), deploy across Mac and Windows fleets, manage
              updates without breaking active projects, troubleshoot the recurring issues
              (font corruption, sync failures, Photoshop crashes on Apple Silicon, InDesign
              file recovery), and provide hands-on training where teams need it.
            </p>
            <p className="text-base text-[#7A9E98] leading-relaxed max-w-3xl mb-8">
              Our customers range from two-person design studios to architecture firms with
              thirty designers. Engagements start from R 8,500 excluding VAT, scoped and
              quoted in writing after a free discovery call.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={buildWhatsAppUrl('ADOBE-BUSINESS', 'Adobe Creative Cloud Support')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl font-bold hover:bg-[#0FEA7A]/90 transition-all"
              >
                <Phone className="w-5 h-5" /> WhatsApp us about Adobe
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

      {/* ── What we deliver ───────────────────────────────────────────────── */}
      <section className="py-16 bg-[#0F2522]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-3">
            What we deliver
          </h2>
          <p className="text-[#7A9E98] mb-10 max-w-3xl leading-relaxed">
            Our Adobe Creative Cloud Licensing and Support engagement covers design through
            to ongoing management. The exact scope depends on what your business already has
            in place and what you need from us, but every engagement includes the elements
            below.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {offerings.map((o) => (
              <div
                key={o.title}
                className="rounded-2xl border border-[rgba(15,234,122,0.18)] bg-[#0A1A18] p-6"
              >
                <o.icon className="w-8 h-8 text-[#0FEA7A] mb-4" />
                <h3 className="text-xl font-bold text-[#E8F4F1] mb-2">{o.title}</h3>
                <p className="text-[#7A9E98] text-sm leading-relaxed">{o.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── End-to-end Adobe delivery (long-form detail) ──────────────────── */}
      <section className="py-16 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#E8F4F1] mb-6">
            End-to-end Adobe Creative Cloud delivery
          </h2>
          <div className="space-y-5 text-[#7A9E98] leading-relaxed">
            <p>
              Licence supply and reseller fulfilment covers single-app, All Apps, business
              plans, education plans, government plans, Adobe Stock, and Firefly credits.
              Tenant configuration covers the Adobe Admin Console, identity federation with
              Microsoft Entra ID, Adobe groups synchronised from Entra via SCIM, app
              entitlement management, and migration from device-based serial keys to the
              named-user licensing model.
            </p>
            <p>
              Deployment is handled through Microsoft Intune (Windows and macOS) and Jamf
              Pro (macOS and iOS). Each Adobe Creative Cloud package is built, signed, and
              tested before it is pushed, silent install, licence assignment, and update
              channel management are all configured per device group. Managed updates run
              through the Adobe Update Manager with update rings scheduled so production
              teams stay on the prior-release stability channel while non-production users
              run the latest release.
            </p>
            <p>
              Troubleshooting covers font management, plug-in conflict resolution, GPU
              acceleration verification, colour management profile deployment, ICC profile
              configuration, and OS compatibility validation. Performance optimisation
              focuses on cache and scratch disk placement, GPU verification, and RAM
              headroom for After Effects multi-frame rendering. The AVX2 compatibility gate
              is enforced for pre-2014 Intel Macs that cannot run Creative Cloud 2024 and
              later versions.
            </p>
            <p>
              Training is delivered per application for teams that need to lift skill level
              beyond self-taught fundamentals. Our differentiator is in-field Adobe
              engineers who also build custom AI tools and workflow automation that
              integrate with Adobe Creative Cloud APIs.
            </p>
          </div>
        </div>
      </section>

      {/* ── Adobe partner status ──────────────────────────────────────────── */}
      <section className="py-16 bg-[#0F2522]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#E8F4F1] mb-6">
            Are we an Adobe reseller or partner?
          </h2>
          <div className="space-y-5 text-[#7A9E98] leading-relaxed">
            <p>
              Yes. ZA Support holds an Adobe Solutions Partner designation, with Adobe
              Certified Professional designation held by named ZA Support engineers. The
              Adobe Solutions Partner relationship enables business licence resale and Adobe
              Admin Console management on behalf of clients. We are also an Adobe Authorised
              Reseller for the South African market. The partner logo is placed on every
              Adobe-related service page, the homepage trust strip, and the trust footer
              site-wide so customers can see the relationship at a glance.
            </p>
          </div>
        </div>
      </section>

      {/* ── Why ZA Support ────────────────────────────────────────────────── */}
      <section className="py-16 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#E8F4F1] mb-6">
            Why ZA Support
          </h2>
          <div className="space-y-5 text-[#7A9E98] leading-relaxed">
            <p>
              We have operated as an Apple repair and IT specialist from Hyde Park since
              2009. Over seventeen years we have built a 4.9-star reputation across more
              than 600 Google reviews and hold BEE Level 1 certification. We are an Apple
              Authorised IT Specialist, a Microsoft Cloud Solution Provider, and a Ubiquiti
              partner with more than 1,100 UniFi installations since 2014. We work with
              consumer customers, SMBs, corporates, and medical practices across Gauteng,
              and most of our new business comes from referrals.
            </p>
          </div>
        </div>
      </section>

      {/* ── What we have learned at scale ─────────────────────────────────── */}
      <section className="py-16 bg-[#0F2522]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#E8F4F1] mb-6">
            What we have learned from doing this at scale
          </h2>
          <h3 className="text-lg sm:text-xl font-bold text-[#E8F4F1] mb-3">
            Managed and MDM-deployed Adobe across a business fleet
          </h3>
          <div className="space-y-5 text-[#7A9E98] leading-relaxed mb-8">
            <p>
              Full managed Adobe deployment via MDM is the standard for any client beyond
              a handful of users. We package Adobe Creative Cloud for Microsoft Intune
              (Windows and macOS) and Jamf Pro (macOS and iOS), with centralised licence
              assignment via the Adobe Admin Console and SCIM provisioning from Microsoft
              Entra ID. Update channels are managed per workload, latest release for
              non-production users, prior release for production stability where workflow
              continuity matters.
            </p>
            <p>
              The AVX2 compatibility gate is enforced (pre-2014 Intel Macs flagged for
              Creative Cloud 2024 and earlier versions). Silent install, silent update, and
              silent uninstall are all configured. The per-machine versus named-user
              licensing decision is documented per client. Reporting flows through the
              Adobe Admin Console (licence utilisation, last sign-in, device assignment)
              alongside Microsoft Intune compliance state, with quarterly Adobe licence
              optimisation reviews to right-size All Apps versus single-app subscriptions.
            </p>
          </div>

          <h3 className="text-lg sm:text-xl font-bold text-[#E8F4F1] mb-3">
            Which Adobe apps business clients most need help with
          </h3>
          <div className="space-y-5 text-[#7A9E98] leading-relaxed">
            <p>
              Photoshop, InDesign, Illustrator, After Effects, Premiere Pro, Acrobat Pro,
              Lightroom Classic, Lightroom CC, and Adobe Firefly carry the bulk of the
              support load. Lower-volume but fully supported: Audition, Animate, Bridge,
              Substance 3D Painter, Substance 3D Sampler, Fresco, Express, Dimension, and
              Character Animator.
            </p>
            <p>
              Photoshop and InDesign generate the highest-volume support tickets across
              professional services and design firms. After Effects and Premiere Pro drive
              the highest-value Mac hardware specification engagements. Acrobat Pro
              generates the largest licence rollouts across legal and accounting firms.
              Lightroom Classic dominates the photography studio segment. Adobe Firefly is
              becoming a meaningful workflow line as AI image generation enters production
              pipelines.
            </p>
          </div>
        </div>
      </section>

      {/* ── Our approach ──────────────────────────────────────────────────── */}
      <section className="py-16 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#E8F4F1] mb-6">
            Our approach
          </h2>
          <div className="space-y-5 text-[#7A9E98] leading-relaxed">
            <p>
              Every engagement follows a four-step approach. The first step is always a
              discovery call to understand what you have, what is working, and where the
              gaps are. The second is a written scope and quote so you know exactly what the
              engagement covers and what it costs before anything starts. The third is the
              work itself, with weekly checkpoints for anything longer than a single visit.
              The fourth is handover, with the option of an ongoing managed service if you
              want one.
            </p>
            <p>
              The discovery call is free and there is no obligation. We use it to understand
              the current state of your environment, what your business needs from the
              engagement, what your timeline looks like, and what your budget envelope is.
              If we are not the right partner for the work, we tell you that during or
              immediately after the call and we point you toward someone who is. We do not
              waste your time, and we do not waste ours, by chasing engagements that are a
              poor fit.
            </p>
          </div>
        </div>
      </section>

      {/* ── Pricing ───────────────────────────────────────────────────────── */}
      <section className="py-16 bg-[#0F2522]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#E8F4F1] mb-6">
            Pricing
          </h2>
          <div className="space-y-5 text-[#7A9E98] leading-relaxed">
            <p>
              Adobe Creative Cloud Licensing and Support engagements start from{' '}
              <strong className="text-[#E8F4F1]">R 8,500 excluding VAT</strong>. The final
              quote depends on the scope, the number of users or devices, and whether you
              want a one-off project or an ongoing managed service. We confirm pricing in
              writing after the discovery call, and we do not start work without a signed
              quote.
            </p>
            <p>
              Where the engagement is best structured as a fixed-price project, we quote
              it that way. Where it is better structured as a monthly managed service (most
              ongoing IT support, security monitoring, licence management), we quote it on
              a per-user or per-device basis with a written service level. Where it is
              genuinely time-and-materials work (recovery from an incident, complex
              migration with unknown scope), we are honest about that and we keep you
              informed of accruing time so there are no surprises.
            </p>
            <p className="text-sm text-[#7A9E98] italic">
              Indicative pricing only. Final pricing is confirmed once ZA Support verifies
              your environment, user count, and licensing requirements. Call{' '}
              <a href={`tel:${CONTACT.phoneTel}`} className="text-[#0FEA7A] hover:underline">
                {CONTACT.phone}
              </a>{' '}
              for a written quote.
            </p>
          </div>
        </div>
      </section>

      {/* ── Who we work with ──────────────────────────────────────────────── */}
      <section className="py-16 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#E8F4F1] mb-6">
            Who we work with
          </h2>
          <div className="space-y-5 text-[#7A9E98] leading-relaxed">
            <p>
              Our customers include SMBs across professional services, architecture and
              design studios, medical practices, creative agencies, and corporates from
              twenty to several hundred users. We are equally comfortable supporting a
              two-person design studio and a thirty-user practice with mixed Mac and
              Windows estates.
            </p>
            <p>
              What our customers consistently tell us is that they want the same person on
              the other end of the phone, week after week, who knows their environment and
              does not need to be re-briefed every time something happens. That is what we
              have built our business around. Most of our team has been with us for years,
              and the customer relationships have been with the same account manager for
              most of that time.
            </p>
          </div>
        </div>
      </section>

      {/* ── Related services ──────────────────────────────────────────────── */}
      <section className="py-16 bg-[#0F2522]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#E8F4F1] mb-6">
            Related services
          </h2>
          <p className="text-[#7A9E98] leading-relaxed mb-8">
            This page is part of our business services suite. Related pages cover our other
            specialist areas, UniFi networking, Microsoft 365 deployment, managed IT for
            practices, and medical IT. We commonly engage across multiple areas for a
            single customer, and where we do the engagements are coordinated under a single
            account manager.
          </p>
          <div className="grid sm:grid-cols-3 gap-4">
            <Link
              href="/managed-services/unifi-networking"
              className="rounded-2xl border border-[rgba(15,234,122,0.18)] bg-[#0A1A18] p-6 hover:border-[rgba(15,234,122,0.4)] transition-all block"
            >
              <h3 className="text-[#E8F4F1] font-bold mb-2">UniFi Networking</h3>
              <p className="text-[#7A9E98] text-sm leading-relaxed">
                POPIA-aligned WiFi 6, VLAN segmentation, and managed networking for
                practices and creative studios.
              </p>
            </Link>
            <Link
              href="/managed-services"
              className="rounded-2xl border border-[rgba(15,234,122,0.18)] bg-[#0A1A18] p-6 hover:border-[rgba(15,234,122,0.4)] transition-all block"
            >
              <h3 className="text-[#E8F4F1] font-bold mb-2">Managed IT Services</h3>
              <p className="text-[#7A9E98] text-sm leading-relaxed">
                Monthly managed service for Apple and mixed estates, proactive monitoring,
                patching, and a dedicated account manager.
              </p>
            </Link>
            <Link
              href="/business"
              className="rounded-2xl border border-[rgba(15,234,122,0.18)] bg-[#0A1A18] p-6 hover:border-[rgba(15,234,122,0.4)] transition-all block"
            >
              <h3 className="text-[#E8F4F1] font-bold mb-2">Business IT</h3>
              <p className="text-[#7A9E98] text-sm leading-relaxed">
                Our full business services hub, SME, enterprise, government, medical, and
                managed Apple support.
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* ── FAQs ──────────────────────────────────────────────────────────── */}
      <section className="py-16 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQAccordion
            items={faqs}
            title="Adobe Creative Cloud Support, frequently asked questions"
          />
          <p className="text-[#7A9E98] leading-relaxed mt-8">
            If your question is not here, the fastest way to get an answer is to call us
            on{' '}
            <a href={`tel:${CONTACT.phoneTel}`} className="text-[#0FEA7A] hover:underline">
              {CONTACT.phone}
            </a>{' '}
            or email{' '}
            <a href="mailto:courtney@zasupport.com" className="text-[#0FEA7A] hover:underline">
              courtney@zasupport.com
            </a>
            .
          </p>
        </div>
      </section>

      {/* ── Closing CTA ───────────────────────────────────────────────────── */}
      <section className="py-16 bg-[#0F2522]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-[rgba(39,80,77,0.3)] border border-[rgba(15,234,122,0.2)] rounded-3xl p-10">
            <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3">
              Book a discovery call
            </h2>
            <p className="text-[#7A9E98] leading-relaxed mb-3">
              A discovery call is free and takes about thirty minutes. We use the call to
              understand what you have, what you need, and whether we are the right
              partner. If we are, we follow the call with a written scope and quote within
              three working days. If we are not, we will tell you that directly and point
              you toward someone who is.
            </p>
            <p className="text-[#7A9E98] text-sm mb-6">
              Based at 1 Hyde Lane, Hyde Park, Johannesburg. Serving creative teams and
              businesses across Gauteng within a 60-kilometre radius, with remote-managed
              services available nationally.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={buildWhatsAppUrl('ADOBE-BUSINESS', 'Adobe Creative Cloud Support')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 transition-all"
              >
                <Phone className="w-5 h-5" /> WhatsApp us now
              </a>
              <a
                href={`tel:${CONTACT.phoneTel}`}
                className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all"
              >
                <Phone className="w-5 h-5" /> Call {CONTACT.phone}
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all"
              >
                Contact form <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
