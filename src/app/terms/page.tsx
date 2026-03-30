import type { Metadata } from 'next';
import Link from 'next/link';
import SchemaOrg from '@/components/seo/SchemaOrg';
import { CONTACT } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Terms of Service | ZA Support',
  description:
    'Terms of Service for ZA Support (Vizibiliti IS t/a ZA Support). Apple repair, managed IT, diagnostics. South African law, POPIA, ECTA compliant.',
  alternates: { canonical: 'https://zasupport.com/terms' },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://zasupport.com' },
    { '@type': 'ListItem', position: 2, name: 'Terms of Service', item: 'https://zasupport.com/terms' },
  ],
};

export default function TermsPage() {
  return (
    <>
      <SchemaOrg schema={breadcrumbSchema} />

      <section className="hero-gradient grid-overlay pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <p className="text-[#0FEA7A] text-sm font-semibold uppercase tracking-widest mb-3">
              Legal
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#E8F4F1] leading-tight mb-6">
              Terms of Service
            </h1>
            <p className="text-xl text-[#7A9E98] leading-relaxed max-w-3xl">
              Please read these terms carefully before using our services. By engaging ZA Support
              for any repair, diagnostic, or managed IT service, you agree to the terms below.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12 text-[#7A9E98] leading-relaxed">

            {/* 1. Company */}
            <div>
              <h2 className="text-2xl font-bold text-[#E8F4F1] mb-4">1. Company Information</h2>
              <p>
                These Terms of Service (&quot;Terms&quot;) govern your use of the services provided by
                <strong className="text-[#E8F4F1]"> Vizibiliti IS (Pty) Ltd</strong>, trading as
                <strong className="text-[#E8F4F1]"> ZA Support</strong>.
              </p>
              <ul className="mt-4 space-y-1 list-disc list-inside">
                <li>Registered address: 1 Hyde Park Lane, Hyde Park, Johannesburg 2196</li>
                <li>VAT registration: 436-026-0014</li>
                <li>Website: <Link href="/" className="text-[#0FEA7A] hover:underline">zasupport.com</Link></li>
              </ul>
            </div>

            {/* 2. Services */}
            <div>
              <h2 className="text-2xl font-bold text-[#E8F4F1] mb-4">2. Services</h2>
              <p>
                ZA Support provides the following services to individuals and businesses:
              </p>
              <ul className="mt-4 space-y-1 list-disc list-inside">
                <li>Apple device repair, including component-level logic board repair, screen replacement, and battery replacement</li>
                <li>IT managed services for medical practices, businesses, and individuals</li>
                <li>Device diagnostics and health checks</li>
                <li>Apple fleet management and MDM configuration</li>
                <li>Data recovery and backup consultation</li>
              </ul>
              <p className="mt-4">
                The specific scope of work is agreed upon before any repair or service commences. ZA Support
                reserves the right to decline a repair where the device is beyond economical repair.
              </p>
            </div>

            {/* 3. Pricing */}
            <div>
              <h2 className="text-2xl font-bold text-[#E8F4F1] mb-4">3. Pricing and Assessment</h2>
              <p>
                An assessment fee applies from <strong className="text-[#E8F4F1]">R599</strong> (inclusive of VAT),
                depending on the device and fault. The assessment fee covers diagnostic time and is payable regardless
                of whether you proceed with the repair.
              </p>
              <p className="mt-4">
                <strong className="text-[#E8F4F1]">No Fix, No Fee policy:</strong> If we are unable to repair your device
                after agreeing to undertake the work, no repair fee is charged. The assessment fee remains payable as it
                covers diagnostic labour.
              </p>
              <p className="mt-4">
                A written quotation is provided before any repair work begins. All prices are quoted in South African Rand
                (ZAR) and include VAT at the prevailing rate.
              </p>
              <p className="mt-4">
                All repairs carry a <strong className="text-[#E8F4F1]">12-month warranty</strong> on parts and labour,
                subject to the warranty terms in Section 5 below.
              </p>
            </div>

            {/* 4. Payment */}
            <div>
              <h2 className="text-2xl font-bold text-[#E8F4F1] mb-4">4. Payment Terms</h2>
              <p>
                Payment is due upon collection of your device or upon completion of the service, unless
                otherwise agreed in writing.
              </p>
              <p className="mt-4">We accept the following payment methods:</p>
              <ul className="mt-4 space-y-1 list-disc list-inside">
                <li><strong className="text-[#E8F4F1]">Card payments:</strong> Visa, Mastercard, and American Express via Peach Payments (secure, PCI-DSS compliant)</li>
                <li><strong className="text-[#E8F4F1]">EFT / bank transfer:</strong> FNB Account 62651791446, Branch Code 254605, SWIFT FIRNZAJJ</li>
                <li><strong className="text-[#E8F4F1]">Cash:</strong> Accepted at our Hyde Park premises</li>
              </ul>
              <p className="mt-4">
                Devices will not be released until payment has been received in full. Uncollected devices
                remaining for more than 90 days after notification of completion may be disposed of in
                accordance with South African law.
              </p>
            </div>

            {/* 5. Warranty */}
            <div>
              <h2 className="text-2xl font-bold text-[#E8F4F1] mb-4">5. Warranty</h2>
              <p>
                All repairs performed by ZA Support carry a <strong className="text-[#E8F4F1]">12-month warranty</strong> on
                both parts and labour, commencing from the date of collection.
              </p>
              <p className="mt-4">The warranty covers:</p>
              <ul className="mt-4 space-y-1 list-disc list-inside">
                <li>Defective replacement parts</li>
                <li>Faults directly related to the original repair</li>
              </ul>
              <p className="mt-4">The warranty does not cover:</p>
              <ul className="mt-4 space-y-1 list-disc list-inside">
                <li>Liquid damage occurring after the repair</li>
                <li>Physical damage, drops, or impact after the repair</li>
                <li>Unauthorised modifications or third-party repairs performed after our service</li>
                <li>Software issues unrelated to the hardware repair</li>
                <li>Normal wear and tear</li>
              </ul>
              <p className="mt-4">
                To claim under warranty, contact us with your original job reference number. The device
                must be returned to our Hyde Park workshop for assessment.
              </p>
            </div>

            {/* 6. Liability */}
            <div>
              <h2 className="text-2xl font-bold text-[#E8F4F1] mb-4">6. Limitation of Liability</h2>
              <p>
                ZA Support&apos;s total liability for any claim arising from a repair or service is limited to the
                cost of the repair or service paid by the client.
              </p>
              <p className="mt-4">
                ZA Support is not liable for any pre-existing data loss. We strongly recommend that you
                <strong className="text-[#E8F4F1]"> back up all data before submitting your device</strong> for
                service. While we take every reasonable precaution to preserve data, repairs &mdash; particularly
                logic board and liquid damage work &mdash; carry an inherent risk to stored data.
              </p>
              <p className="mt-4">
                We shall not be liable for indirect, consequential, or incidental losses, including but not
                limited to loss of business, revenue, or profit arising from device downtime during repair.
              </p>
            </div>

            {/* 7. Data Handling */}
            <div>
              <h2 className="text-2xl font-bold text-[#E8F4F1] mb-4">7. Data Handling and Privacy</h2>
              <p>
                ZA Support collects and processes personal and diagnostic data solely for the purpose of
                delivering our services. This includes device serial numbers, hardware diagnostics, and
                contact information necessary to manage your repair or service agreement.
              </p>
              <p className="mt-4">
                All data handling is conducted in accordance with the
                <strong className="text-[#E8F4F1]"> Protection of Personal Information Act (POPIA)</strong>.
                For full details on how we collect, store, and process your information, please refer to our{' '}
                <Link href="/privacy" className="text-[#0FEA7A] hover:underline">Privacy Policy</Link>.
              </p>
              <p className="mt-4">
                Diagnostic data collected by our health check and monitoring tools is used exclusively
                for service delivery, device health reporting, and proactive maintenance under managed
                service agreements.
              </p>
            </div>

            {/* 8. SLA Terms */}
            <div>
              <h2 className="text-2xl font-bold text-[#E8F4F1] mb-4">8. Managed Service and SLA Terms</h2>
              <p>
                Managed IT service agreements (&quot;SLAs&quot;) are billed on a monthly subscription basis.
                The specific scope, response times, and inclusions are detailed in each client&apos;s
                individual service agreement.
              </p>
              <p className="mt-4">
                Either party may cancel a managed service agreement by providing
                <strong className="text-[#E8F4F1]"> 30 days&apos; written notice</strong>. Fees are payable
                up to the end of the notice period. No refunds are issued for partial months.
              </p>
              <p className="mt-4">
                ZA Support reserves the right to adjust SLA pricing with 60 days&apos; written notice.
                Clients may cancel without penalty if they do not accept revised pricing.
              </p>
            </div>

            {/* 9. IP */}
            <div>
              <h2 className="text-2xl font-bold text-[#E8F4F1] mb-4">9. Intellectual Property</h2>
              <p>
                All ZA Support branding, logos, reports, diagnostic tools, health check software,
                and proprietary systems remain the exclusive property of Vizibiliti IS (Pty) Ltd.
              </p>
              <p className="mt-4">
                Reports and documentation provided to clients are licensed for internal use only
                and may not be reproduced, distributed, or shared publicly without prior written consent.
              </p>
            </div>

            {/* 10. Disputes */}
            <div>
              <h2 className="text-2xl font-bold text-[#E8F4F1] mb-4">10. Dispute Resolution</h2>
              <p>
                In the event of a dispute, both parties agree to attempt resolution through
                good faith negotiation in the first instance.
              </p>
              <p className="mt-4">
                If a dispute cannot be resolved informally, it shall be addressed in accordance with
                the <strong className="text-[#E8F4F1]">Electronic Communications and Transactions Act (ECTA)</strong> and
                the <strong className="text-[#E8F4F1]">Consumer Protection Act 68 of 2008</strong>, as applicable.
              </p>
              <p className="mt-4">
                Complaints may also be directed to the relevant consumer protection body or ombudsman.
              </p>
            </div>

            {/* 11. Governing Law */}
            <div>
              <h2 className="text-2xl font-bold text-[#E8F4F1] mb-4">11. Governing Law</h2>
              <p>
                These Terms are governed by and construed in accordance with the laws of the
                <strong className="text-[#E8F4F1]"> Republic of South Africa</strong>. Any legal proceedings
                arising from these Terms shall be subject to the exclusive jurisdiction of the courts
                of Gauteng, South Africa.
              </p>
            </div>

            {/* 12. Contact */}
            <div>
              <h2 className="text-2xl font-bold text-[#E8F4F1] mb-4">12. Contact Us</h2>
              <p>
                If you have any questions about these Terms, please contact us:
              </p>
              <ul className="mt-4 space-y-1 list-disc list-inside">
                <li>Email: <a href="mailto:courtney@zasupport.com" className="text-[#0FEA7A] hover:underline">courtney@zasupport.com</a></li>
                <li>Phone: <a href={`tel:${CONTACT.phoneTel}`} className="text-[#0FEA7A] hover:underline">{CONTACT.phone}</a></li>
                <li>Address: 1 Hyde Park Lane, Hyde Park, Johannesburg 2196</li>
                <li>Online: <Link href="/contact" className="text-[#0FEA7A] hover:underline">zasupport.com/contact</Link></li>
              </ul>
            </div>

            {/* 13. Last Updated */}
            <div className="pt-8 border-t border-[rgba(15,234,122,0.12)]">
              <p className="text-sm text-[#7A9E98]">
                <strong className="text-[#E8F4F1]">Last updated:</strong> 30 March 2026
              </p>
              <p className="text-sm text-[#7A9E98] mt-2">
                ZA Support reserves the right to update these Terms at any time. Material changes will be
                communicated via email or our website. Continued use of our services after changes constitutes
                acceptance of the revised Terms.
              </p>
            </div>

          </div>
        </div>
      </section>

      <section className="py-16 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-[rgba(39,80,77,0.3)] border border-[rgba(15,234,122,0.2)] rounded-3xl p-10">
            <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3">Have Questions?</h2>
            <p className="text-[#7A9E98] mb-6">
              Contact us if you need clarification on any of these terms.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:courtney@zasupport.com"
                className="inline-flex items-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl font-bold hover:bg-[#0FEA7A]/90 transition-all"
              >
                Email Us
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all"
              >
                Contact Page
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
