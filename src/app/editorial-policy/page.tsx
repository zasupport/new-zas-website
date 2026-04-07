import type { Metadata } from 'next';
import Link from 'next/link';
import SchemaOrg from '@/components/seo/SchemaOrg';
import { buildBreadcrumbSchema } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Editorial Policy | ZA Support',
  description:
    'How ZA Support creates, reviews, and maintains technical content. All articles written or reviewed by Courtney Bentley, Apple Certified Expert Consultant with 17 years of experience.',
  alternates: { canonical: 'https://zasupport.com/editorial-policy' },
};

const breadcrumbs = buildBreadcrumbSchema([
  { name: 'Home', url: 'https://zasupport.com' },
  { name: 'Editorial Policy', url: 'https://zasupport.com/editorial-policy' },
]);

export default function EditorialPolicyPage() {
  return (
    <>
      <SchemaOrg schema={breadcrumbs} />

      <section className="pt-32 pb-16 bg-[#0A1A18]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-8">
            Editorial Policy
          </h1>

          <div className="space-y-8 text-[#7A9E98] text-base leading-relaxed">
            <p className="text-lg text-[#E8F4F1]/80">
              ZA Support publishes repair guides, troubleshooting articles, and Apple device
              advice based on direct workshop experience. Every article reflects work we have
              personally carried out at our Hyde Park, Johannesburg workshop since 2009.
            </p>

            <div>
              <h2 className="text-xl font-bold text-[#E8F4F1] mb-3">Who writes our content</h2>
              <p className="mb-3">
                All articles are written or reviewed by{' '}
                <Link
                  href="/author/courtney-bentley"
                  className="text-[#0FEA7A] hover:underline"
                >
                  Courtney Bentley
                </Link>
                , founder of ZA Support, Apple Certified Expert Consultant with 17 years of
                hands-on Apple repair experience. Courtney personally oversees every piece of
                technical content published on this site.
              </p>
              <p>
                Where articles are co-authored by team members, they are reviewed and approved
                by Courtney before publication. Every article carries a named author byline.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#E8F4F1] mb-3">AI assistance disclosure</h2>
              <p>
                Some articles use AI tools to assist with drafting or structuring content. All
                AI-assisted content is reviewed, edited, and verified by our Apple-certified
                technicians before publication. The technical substance, repair data, pricing,
                and workshop experience in every article come from our team, not from AI
                generation. Where AI assistance is used, this is disclosed on the article.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#E8F4F1] mb-3">Workshop-verified information</h2>
              <p className="mb-3">
                Our content is based on first-hand repair data from our workshop. When we state
                repair costs, turnaround times, success rates, or technical specifications,
                these figures come from our own service records. We reference Apple&apos;s official
                support documentation where applicable and link to Apple Support as an
                authoritative source.
              </p>
              <p>
                We do not publish repair advice for procedures we have not personally performed.
                If a repair type falls outside our experience, we will not write about it.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#E8F4F1] mb-3">South African context</h2>
              <p>
                All content is written specifically for a South African audience. Pricing is
                quoted in ZAR, parts availability reflects South African supply channels, and
                repair timelines account for local logistics. We reference Johannesburg suburbs,
                South African regulations (including POPIA), and local conditions such as load
                shedding where relevant to device care.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#E8F4F1] mb-3">Content review schedule</h2>
              <p>
                Every published article is reviewed quarterly. During each review we verify that
                pricing information is current, repair procedures reflect the latest macOS and
                hardware changes, and all internal and external links remain functional. Each
                article displays both its original publication date and the date it was last
                reviewed.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#E8F4F1] mb-3">Corrections policy</h2>
              <p>
                If we identify an error in a published article, or if a reader alerts us to an
                inaccuracy, we correct the content promptly and update the &quot;Last updated&quot; date.
                Significant corrections are noted at the top of the affected article. We do not
                silently alter published content without updating the modification timestamp.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#E8F4F1] mb-3">Independence</h2>
              <p>
                ZA Support is an independent Apple repair service. We are not paid by Apple or
                any parts supplier to recommend specific products or services. Our repair
                recommendations are based solely on our technical assessment of each device.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#E8F4F1] mb-3">Contact us about our content</h2>
              <p>
                If you have questions about any article, spot an error, or would like to suggest
                a topic, contact us at{' '}
                <a
                  href="mailto:admin@zasupport.com"
                  className="text-[#0FEA7A] hover:underline"
                >
                  admin@zasupport.com
                </a>{' '}
                or WhatsApp us on{' '}
                <a
                  href="https://wa.me/27645295863"
                  className="text-[#0FEA7A] hover:underline"
                >
                  064 529 5863
                </a>.
              </p>
            </div>

            <div className="pt-4">
              <Link
                href="/author/courtney-bentley"
                className="inline-flex items-center gap-2 text-[#0FEA7A] font-semibold hover:underline"
              >
                About Courtney Bentley &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
