import type { Metadata } from 'next';
import Link from 'next/link';
import SchemaOrg from '@/components/seo/SchemaOrg';
import { CONTACT } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Privacy Policy | ZA Support — POPIA Compliant',
  description:
    'ZA Support privacy policy. POPIA-compliant data protection for Apple repair, managed IT, and medical practice clients in Johannesburg. Learn how we collect, use, and protect your personal information.',
  alternates: { canonical: 'https://zasupport.com/privacy' },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://zasupport.com' },
    { '@type': 'ListItem', position: 2, name: 'Privacy Policy', item: 'https://zasupport.com/privacy' },
  ],
};

const SECTIONS = [
  { id: 'controller', title: '1. Data Controller' },
  { id: 'information-collected', title: '2. Personal Information We Collect' },
  { id: 'purpose', title: '3. Purpose of Collection' },
  { id: 'legal-basis', title: '4. Legal Basis for Processing' },
  { id: 'third-parties', title: '5. Third-Party Service Providers' },
  { id: 'retention', title: '6. Data Retention' },
  { id: 'rights', title: '7. Your Rights Under POPIA' },
  { id: 'exercise-rights', title: '8. How to Exercise Your Rights' },
  { id: 'information-officer', title: '9. Information Officer' },
  { id: 'security', title: '10. Security Measures' },
  { id: 'cookies', title: '11. Cookies and Analytics' },
  { id: 'breach', title: '12. Breach Notification' },
  { id: 'children', title: '13. Children\'s Privacy' },
  { id: 'hpcsa', title: '14. Medical Practice Data (HPCSA)' },
  { id: 'updates', title: '15. Policy Updates' },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <SchemaOrg schema={breadcrumbSchema} />

      {/* Hero */}
      <section className="hero-gradient grid-overlay pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <p className="text-[#0FEA7A] text-sm font-semibold uppercase tracking-widest mb-3">
              Legal · POPIA Compliant
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#E8F4F1] leading-tight mb-6">
              Privacy Policy
            </h1>
            <p className="text-xl text-[#7A9E98] leading-relaxed max-w-3xl">
              ZA Support is committed to protecting your personal information in accordance with the
              Protection of Personal Information Act (POPIA), 2013. This policy explains what data we
              collect, why we collect it, and how we safeguard it.
            </p>
            <p className="text-sm text-[#7A9E98] mt-4">
              Last updated: 30 March 2026
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Table of Contents */}
          <nav className="glass-card p-8 mb-12">
            <h2 className="text-xl font-bold text-[#E8F4F1] mb-4">Contents</h2>
            <ol className="space-y-2">
              {SECTIONS.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="text-[#0FEA7A] hover:text-[#0FEA7A]/80 text-sm transition-colors"
                  >
                    {s.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          {/* 1. Data Controller */}
          <div id="controller" className="mb-12 scroll-mt-24">
            <h2 className="text-2xl font-bold text-[#27504D] mb-4">1. Data Controller</h2>
            <div className="text-[#7A9E98] leading-relaxed space-y-3">
              <p>
                The responsible party (data controller) for the processing of your personal information is:
              </p>
              <div className="bg-[rgba(22,34,32,0.5)] rounded-xl border border-[rgba(15,234,122,0.08)] p-6">
                <p className="text-[#E8F4F1] font-semibold">Vizibiliti IS (Pty) Ltd</p>
                <p>Trading as <span className="text-[#E8F4F1]">ZA Support</span></p>
                <p>1 Hyde Park Lane, Hyde Park, Johannesburg 2196</p>
                <p>VAT: 436-026-0014</p>
                <p>Email: <a href="mailto:courtney@zasupport.com" className="text-[#0FEA7A] hover:underline">courtney@zasupport.com</a></p>
                <p>Phone: <a href={`tel:${CONTACT.phoneTel}`} className="text-[#0FEA7A] hover:underline">{CONTACT.phone}</a></p>
              </div>
            </div>
          </div>

          {/* 2. Personal Information We Collect */}
          <div id="information-collected" className="mb-12 scroll-mt-24">
            <h2 className="text-2xl font-bold text-[#27504D] mb-4">2. Personal Information We Collect</h2>
            <div className="text-[#7A9E98] leading-relaxed space-y-3">
              <p>We may collect the following categories of personal information, depending on the services you use:</p>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li><span className="text-[#E8F4F1] font-medium">Identity information:</span> full name, email address, telephone number</li>
                <li><span className="text-[#E8F4F1] font-medium">Device information:</span> Apple device model, serial number, hardware diagnostics, macOS version, battery health, storage capacity</li>
                <li><span className="text-[#E8F4F1] font-medium">Technical data:</span> IP address, browser type, referring URL, pages visited</li>
                <li><span className="text-[#E8F4F1] font-medium">Usage data:</span> anonymised analytics collected via Google Analytics 4 (GA4), including page views, session duration, and user flow</li>
                <li><span className="text-[#E8F4F1] font-medium">Financial information:</span> payment card details (processed securely by our payment provider; we do not store card numbers)</li>
                <li><span className="text-[#E8F4F1] font-medium">Communication records:</span> emails, contact form submissions, and support correspondence</li>
              </ul>
            </div>
          </div>

          {/* 3. Purpose of Collection */}
          <div id="purpose" className="mb-12 scroll-mt-24">
            <h2 className="text-2xl font-bold text-[#27504D] mb-4">3. Purpose of Collection</h2>
            <div className="text-[#7A9E98] leading-relaxed space-y-3">
              <p>We collect and process personal information for the following purposes:</p>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li><span className="text-[#E8F4F1] font-medium">Service delivery:</span> diagnosing, repairing, and returning your Apple devices</li>
                <li><span className="text-[#E8F4F1] font-medium">Device repair tracking:</span> maintaining a record of repairs, diagnostics, and device history for warranty and quality purposes</li>
                <li><span className="text-[#E8F4F1] font-medium">SLA management:</span> administering managed IT service agreements, scheduling maintenance, and monitoring device health</li>
                <li><span className="text-[#E8F4F1] font-medium">Invoicing and payments:</span> generating quotes, invoices, and processing payments</li>
                <li><span className="text-[#E8F4F1] font-medium">Communication:</span> responding to enquiries, providing repair updates, and sending service-related notifications</li>
                <li><span className="text-[#E8F4F1] font-medium">Marketing:</span> sending promotional content only where you have opted in; you may withdraw consent at any time</li>
                <li><span className="text-[#E8F4F1] font-medium">Website improvement:</span> analysing anonymised usage data to improve our website and services</li>
              </ul>
            </div>
          </div>

          {/* 4. Legal Basis for Processing */}
          <div id="legal-basis" className="mb-12 scroll-mt-24">
            <h2 className="text-2xl font-bold text-[#27504D] mb-4">4. Legal Basis for Processing</h2>
            <div className="text-[#7A9E98] leading-relaxed space-y-3">
              <p>Under POPIA, we process your personal information on the following lawful grounds:</p>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li><span className="text-[#E8F4F1] font-medium">Consent:</span> when you voluntarily submit information via our contact form, book a repair, or opt in to marketing communications</li>
                <li><span className="text-[#E8F4F1] font-medium">Contract:</span> where processing is necessary to fulfil a service-level agreement (SLA), repair contract, or invoice</li>
                <li><span className="text-[#E8F4F1] font-medium">Legitimate interest:</span> for security monitoring of managed devices, fraud prevention, and improving our services, provided this does not override your rights</li>
                <li><span className="text-[#E8F4F1] font-medium">Legal obligation:</span> where we are required by law to retain records (e.g. tax legislation)</li>
              </ul>
            </div>
          </div>

          {/* 5. Third-Party Service Providers */}
          <div id="third-parties" className="mb-12 scroll-mt-24">
            <h2 className="text-2xl font-bold text-[#27504D] mb-4">5. Third-Party Service Providers</h2>
            <div className="text-[#7A9E98] leading-relaxed space-y-3">
              <p>
                We share personal information only with trusted third-party service providers who assist
                us in operating our business. Each provider is bound by their own privacy policies and
                data protection obligations. <strong className="text-[#E8F4F1]">We never sell your personal information.</strong>
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm mt-4">
                  <thead>
                    <tr className="border-b border-[rgba(15,234,122,0.15)]">
                      <th className="text-left py-3 pr-4 text-[#E8F4F1] font-semibold">Provider</th>
                      <th className="text-left py-3 pr-4 text-[#E8F4F1] font-semibold">Purpose</th>
                      <th className="text-left py-3 text-[#E8F4F1] font-semibold">Data Shared</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[rgba(15,234,122,0.08)]">
                    <tr>
                      <td className="py-3 pr-4 text-[#E8F4F1]">Resend</td>
                      <td className="py-3 pr-4">Transactional email delivery</td>
                      <td className="py-3">Email address, name</td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-4 text-[#E8F4F1]">Vercel</td>
                      <td className="py-3 pr-4">Website hosting and deployment</td>
                      <td className="py-3">IP address, usage data</td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-4 text-[#E8F4F1]">Google Analytics (GA4)</td>
                      <td className="py-3 pr-4">Website analytics</td>
                      <td className="py-3">Anonymised browsing behaviour, IP (truncated)</td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-4 text-[#E8F4F1]">Peach Payments</td>
                      <td className="py-3 pr-4">Payment processing</td>
                      <td className="py-3">Payment card details (directly to Peach, not stored by us)</td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-4 text-[#E8F4F1]">Zoho</td>
                      <td className="py-3 pr-4">CRM, invoicing, and quotes</td>
                      <td className="py-3">Name, email, phone, service history</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* 6. Data Retention */}
          <div id="retention" className="mb-12 scroll-mt-24">
            <h2 className="text-2xl font-bold text-[#27504D] mb-4">6. Data Retention</h2>
            <div className="text-[#7A9E98] leading-relaxed space-y-3">
              <p>We retain personal information only for as long as necessary to fulfil the purpose for which it was collected:</p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm mt-4">
                  <thead>
                    <tr className="border-b border-[rgba(15,234,122,0.15)]">
                      <th className="text-left py-3 pr-4 text-[#E8F4F1] font-semibold">Data Category</th>
                      <th className="text-left py-3 text-[#E8F4F1] font-semibold">Retention Period</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[rgba(15,234,122,0.08)]">
                    <tr>
                      <td className="py-3 pr-4">Client records (invoices, contracts, SLA data)</td>
                      <td className="py-3">5 years (in accordance with South African tax legislation)</td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-4">Device diagnostics and repair history</td>
                      <td className="py-3">3 years</td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-4">Contact form submissions</td>
                      <td className="py-3">1 year</td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-4">Website analytics data (GA4)</td>
                      <td className="py-3">14 months (Google default)</td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-4">Marketing consent records</td>
                      <td className="py-3">Duration of consent plus 1 year</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p>
                Once the retention period has expired, personal information is securely deleted or anonymised.
              </p>
            </div>
          </div>

          {/* 7. Your Rights Under POPIA */}
          <div id="rights" className="mb-12 scroll-mt-24">
            <h2 className="text-2xl font-bold text-[#27504D] mb-4">7. Your Rights Under POPIA</h2>
            <div className="text-[#7A9E98] leading-relaxed space-y-3">
              <p>Under Chapter 3 of the Protection of Personal Information Act, you have the following rights as a data subject:</p>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li><span className="text-[#E8F4F1] font-medium">Right of access:</span> request confirmation of whether we hold personal information about you, and obtain a copy of that information</li>
                <li><span className="text-[#E8F4F1] font-medium">Right to correction:</span> request the correction or updating of personal information that is inaccurate, incomplete, or misleading</li>
                <li><span className="text-[#E8F4F1] font-medium">Right to deletion:</span> request the deletion or destruction of personal information that is no longer necessary for the purpose for which it was collected</li>
                <li><span className="text-[#E8F4F1] font-medium">Right to object:</span> object to the processing of your personal information on reasonable grounds</li>
                <li><span className="text-[#E8F4F1] font-medium">Right to restriction:</span> request that we restrict the processing of your personal information in certain circumstances</li>
                <li><span className="text-[#E8F4F1] font-medium">Right to withdraw consent:</span> where processing is based on consent, you may withdraw that consent at any time without affecting the lawfulness of prior processing</li>
                <li><span className="text-[#E8F4F1] font-medium">Right to lodge a complaint:</span> submit a complaint to the Information Regulator if you believe your rights have been infringed</li>
              </ul>
              <p className="mt-4">
                We will respond to all valid requests within 30 days, as required by POPIA. Submitting a data request carries no additional administrative cost (POPIA s50(6) applies), though we may charge a reasonable fee for manifestly unfounded or excessive requests.
              </p>
            </div>
          </div>

          {/* 8. How to Exercise Your Rights */}
          <div id="exercise-rights" className="mb-12 scroll-mt-24">
            <h2 className="text-2xl font-bold text-[#27504D] mb-4">8. How to Exercise Your Rights</h2>
            <div className="text-[#7A9E98] leading-relaxed space-y-3">
              <p>To exercise any of your rights under POPIA, please contact us using one of the following methods:</p>
              <div className="bg-[rgba(22,34,32,0.5)] rounded-xl border border-[rgba(15,234,122,0.08)] p-6 space-y-2">
                <p><span className="text-[#E8F4F1] font-medium">Email:</span> <a href="mailto:courtney@zasupport.com" className="text-[#0FEA7A] hover:underline">courtney@zasupport.com</a></p>
                <p><span className="text-[#E8F4F1] font-medium">Phone:</span> <a href="tel:+27645295863" className="text-[#0FEA7A] hover:underline">064 529 5863</a></p>
                <p><span className="text-[#E8F4F1] font-medium">Post:</span> Information Officer, ZA Support, 1 Hyde Park Lane, Hyde Park, Johannesburg 2196</p>
                <p><span className="text-[#E8F4F1] font-medium">Online:</span> <Link href="/contact" className="text-[#0FEA7A] hover:underline">Contact form</Link></p>
              </div>
              <p>
                Please include your full name, contact details, and a clear description of the request.
                We may need to verify your identity before processing your request.
              </p>
            </div>
          </div>

          {/* 9. Information Officer */}
          <div id="information-officer" className="mb-12 scroll-mt-24">
            <h2 className="text-2xl font-bold text-[#27504D] mb-4">9. Information Officer</h2>
            <div className="text-[#7A9E98] leading-relaxed space-y-3">
              <p>
                In accordance with POPIA Section 55, ZA Support has appointed the following Information Officer, responsible for
                ensuring compliance with the conditions of lawful processing:
              </p>
              <div className="bg-[rgba(22,34,32,0.5)] rounded-xl border border-[rgba(15,234,122,0.08)] p-6 space-y-2">
                <p className="text-[#E8F4F1] font-semibold">Courtney Bentley</p>
                <p>Information Officer</p>
                <p>Email: <a href="mailto:courtney@zasupport.com" className="text-[#0FEA7A] hover:underline">courtney@zasupport.com</a></p>
                <p>Phone: <a href="tel:+27645295863" className="text-[#0FEA7A] hover:underline">064 529 5863</a></p>
              </div>
              <p>
                If you are not satisfied with our response, you may lodge a complaint with the
                Information Regulator (South Africa):
              </p>
              <div className="bg-[rgba(22,34,32,0.5)] rounded-xl border border-[rgba(15,234,122,0.08)] p-6 space-y-2">
                <p className="text-[#E8F4F1] font-semibold">Information Regulator (South Africa)</p>
                <p>Email: <a href="mailto:enquiries@inforegulator.org.za" className="text-[#0FEA7A] hover:underline">enquiries@inforegulator.org.za</a></p>
                <p>Website: <a href="https://inforegulator.org.za" target="_blank" rel="noopener noreferrer" className="text-[#0FEA7A] hover:underline">inforegulator.org.za</a></p>
              </div>
            </div>
          </div>

          {/* 10. Security Measures */}
          <div id="security" className="mb-12 scroll-mt-24">
            <h2 className="text-2xl font-bold text-[#27504D] mb-4">10. Security Measures</h2>
            <div className="text-[#7A9E98] leading-relaxed space-y-3">
              <p>
                We take the security of your personal information seriously and implement appropriate
                technical and organisational measures to protect it against unauthorised access, loss,
                destruction, or damage. These measures include:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li><span className="text-[#E8F4F1] font-medium">Encryption in transit:</span> all data transmitted between your browser and our servers is encrypted using TLS 1.3</li>
                <li><span className="text-[#E8F4F1] font-medium">Encrypted storage:</span> sensitive data at rest is encrypted using industry-standard encryption algorithms</li>
                <li><span className="text-[#E8F4F1] font-medium">Access controls:</span> strict role-based access controls ensure only authorised personnel can access personal information</li>
                <li><span className="text-[#E8F4F1] font-medium">Regular audits:</span> we conduct periodic security audits and vulnerability assessments of our systems</li>
                <li><span className="text-[#E8F4F1] font-medium">Secure payments:</span> payment processing is handled entirely by PCI DSS-compliant Peach Payments; we never store card details</li>
                <li><span className="text-[#E8F4F1] font-medium">Device security:</span> managed client devices are monitored for security compliance, including FileVault encryption, firewall status, and software updates</li>
              </ul>
            </div>
          </div>

          {/* 11. Cookies and Analytics */}
          <div id="cookies" className="mb-12 scroll-mt-24">
            <h2 className="text-2xl font-bold text-[#27504D] mb-4">11. Cookies and Analytics</h2>
            <div className="text-[#7A9E98] leading-relaxed space-y-3">
              <p>Our website uses cookies to improve your browsing experience and to collect anonymised analytics data.</p>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li><span className="text-[#E8F4F1] font-medium">Analytics cookies:</span> we use Google Analytics 4 (GA4) to understand how visitors interact with our website. GA4 collects anonymised data including page views, session duration, and approximate geographic location. IP addresses are truncated before storage.</li>
                <li><span className="text-[#E8F4F1] font-medium">Essential cookies:</span> these are strictly necessary for the website to function correctly (e.g. session management, security tokens).</li>
                <li><span className="text-[#E8F4F1] font-medium">No advertising cookies:</span> we do not use any advertising, tracking, or retargeting cookies.</li>
              </ul>
              <p>
                By continuing to use our website, you consent to the use of analytics cookies as described above.
                You may disable cookies in your browser settings at any time, though this may affect website functionality.
              </p>
            </div>
          </div>

          {/* 12. Breach Notification */}
          <div id="breach" className="mb-12 scroll-mt-24">
            <h2 className="text-2xl font-bold text-[#27504D] mb-4">12. Breach Notification</h2>
            <div className="text-[#7A9E98] leading-relaxed space-y-3">
              <p>
                In accordance with Section 22 of POPIA, in the event of a data breach that compromises
                the confidentiality or integrity of personal information, we will:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li>Notify the <span className="text-[#E8F4F1] font-medium">Information Regulator</span> as soon as reasonably possible, and no later than 72 hours after becoming aware of the breach</li>
                <li>Notify all <span className="text-[#E8F4F1] font-medium">affected data subjects</span> in writing, providing details of the breach, the categories of information affected, and the measures taken to address it</li>
                <li>Take immediate steps to <span className="text-[#E8F4F1] font-medium">contain and remediate</span> the breach, including forensic investigation where appropriate</li>
                <li>Maintain a <span className="text-[#E8F4F1] font-medium">breach register</span> documenting all incidents, their impact, and corrective actions taken</li>
              </ul>
            </div>
          </div>

          {/* 13. Children's Privacy */}
          <div id="children" className="mb-12 scroll-mt-24">
            <h2 className="text-2xl font-bold text-[#27504D] mb-4">13. Children&apos;s Privacy</h2>
            <div className="text-[#7A9E98] leading-relaxed space-y-3">
              <p>
                ZA Support does not knowingly collect or process personal information from children
                under the age of 18 without the consent of a parent or legal guardian. Our services are
                directed at adults and businesses.
              </p>
              <p>
                If we become aware that we have inadvertently collected personal information from a child
                without appropriate consent, we will take immediate steps to delete that information. If
                you believe a child&apos;s data has been submitted to us, please contact our Information
                Officer at{' '}
                <a href="mailto:courtney@zasupport.com" className="text-[#0FEA7A] hover:underline">
                  courtney@zasupport.com
                </a>.
              </p>
            </div>
          </div>

          {/* 14. Medical Practice Data (HPCSA) */}
          <div id="hpcsa" className="mb-12 scroll-mt-24">
            <h2 className="text-2xl font-bold text-[#27504D] mb-4">14. Medical Practice Data (HPCSA)</h2>
            <div className="text-[#7A9E98] leading-relaxed space-y-3">
              <p>
                ZA Support provides managed IT services to medical practices in Johannesburg. Where we
                process data on behalf of healthcare practitioners, we do so in accordance with both
                POPIA and the guidelines issued by the Health Professions Council of South Africa (HPCSA).
              </p>
              <p>
                This includes:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li>Ensuring that patient data stored on managed devices is encrypted and access-controlled</li>
                <li>Maintaining strict confidentiality of all medical practice information</li>
                <li>Implementing security measures that align with HPCSA Booklet 5 (Confidentiality: Protecting and Providing Information) guidelines</li>
                <li>Ensuring that no patient data is accessed, copied, or retained by ZA Support during device repair or maintenance unless strictly necessary and authorised by the practice</li>
              </ul>
              <p>
                Medical practice clients operate under their own POPIA and HPCSA obligations as data controllers.
                ZA Support acts as an operator (data processor) on their behalf and processes data only as instructed.
              </p>
            </div>
          </div>

          {/* 15. Policy Updates */}
          <div id="updates" className="mb-12 scroll-mt-24">
            <h2 className="text-2xl font-bold text-[#27504D] mb-4">15. Policy Updates</h2>
            <div className="text-[#7A9E98] leading-relaxed space-y-3">
              <p>
                We may update this privacy policy from time to time to reflect changes in our practices,
                technology, legal requirements, or other factors. When we make material changes, we will
                update the &ldquo;Last updated&rdquo; date at the top of this page.
              </p>
              <p>
                We encourage you to review this policy periodically to stay informed about how we protect
                your personal information. Continued use of our website and services after any changes
                constitutes acceptance of the updated policy.
              </p>
            </div>
          </div>

          {/* Related Pages */}
          <div className="glass-card p-8 mt-16">
            <h2 className="text-xl font-bold text-[#E8F4F1] mb-4">Related Pages</h2>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="text-[#0FEA7A] hover:text-[#0FEA7A]/80 transition-colors font-medium"
              >
                Contact Us
              </Link>
              <Link
                href="/about"
                className="text-[#0FEA7A] hover:text-[#0FEA7A]/80 transition-colors font-medium"
              >
                About ZA Support
              </Link>
              <Link
                href="/terms"
                className="text-[#0FEA7A] hover:text-[#0FEA7A]/80 transition-colors font-medium"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
