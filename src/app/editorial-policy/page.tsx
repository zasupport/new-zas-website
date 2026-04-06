// pages/editorial-policy/page.tsx
// Editorial Policy — required E-E-A-T trust signal
// Demonstrates content provenance, review process, and corrections policy

export const metadata = {
  title: 'Editorial Policy | ZA Support',
  description:
    'How ZA Support creates, reviews, and maintains blog content. Our commitment to accuracy, first-hand experience, and transparent Apple repair information.',
}

export default function EditorialPolicy() {
  return (
    <main className="max-w-2xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold text-zinc-900 mb-8">Editorial Policy</h1>

      <div className="prose prose-zinc max-w-none">
        <p className="text-lg text-zinc-600 leading-relaxed mb-8">
          ZA Support publishes repair guides, troubleshooting articles, and Apple device
          advice based on direct workshop experience. Every article reflects work we have
          personally carried out at our Hyde Park, Johannesburg workshop since 2009.
        </p>

        <h2>Who writes our content</h2>
        <p>
          All blog posts are written or reviewed by Courtney Bentley, founder of ZA Support
          and Apple-certified technician with over 15 years of hands-on repair experience.
          Where articles are co-authored by team members, they are reviewed and approved by
          Courtney before publication. Every article carries a named author byline.
        </p>

        <h2>How we ensure accuracy</h2>
        <p>
          Our content is based on first-hand repair data from our workshop. When we state
          repair costs, timelines, success rates, or technical specifications, these figures
          come from our own service records. We reference Apple's official support documentation
          where applicable and link to Apple Support as an authoritative source.
        </p>
        <p>
          We do not publish repair advice for procedures we have not personally performed.
          If a repair type falls outside our experience, we will not write about it.
        </p>

        <h2>Content review schedule</h2>
        <p>
          Every published article is reviewed quarterly. During each review, we verify that
          pricing information is current, repair procedures reflect the latest macOS and
          hardware changes, and all internal and external links remain functional.
          Each article displays both its original publication date and the date it was
          last reviewed.
        </p>

        <h2>Corrections policy</h2>
        <p>
          If we identify an error in a published article, or if a reader alerts us to an
          inaccuracy, we correct the content promptly and update the "Last updated" date.
          Significant corrections are noted at the top of the affected article. We do not
          silently alter published content without updating the modification timestamp.
        </p>

        <h2>Independence</h2>
        <p>
          ZA Support is an independent Apple repair service. We are not paid by Apple or
          any parts supplier to recommend specific products or services. Our repair
          recommendations are based solely on our technical assessment of each device.
          We are a member of the Apple Developer Program and an Authorised Apple Reseller.
        </p>

        <h2>AI-assisted content</h2>
        <p>
          Some articles may use AI tools to assist with drafting or structuring content.
          All AI-assisted content is reviewed, edited, and verified by our Apple-certified
          technicians before publication. The technical substance, repair data, pricing,
          and workshop experience in every article come from our team, not from AI generation.
        </p>

        <h2>Contact us about our content</h2>
        <p>
          If you have questions about any article, spot an error, or would like to suggest
          a topic, please contact us at{' '}
          <a href="mailto:admin@zasupport.com" className="text-emerald-600 hover:text-emerald-700">
            admin@zasupport.com
          </a>{' '}
          or WhatsApp us on{' '}
          <a href="https://wa.me/27645295863" className="text-emerald-600 hover:text-emerald-700">
            064 529 5863
          </a>.
        </p>
      </div>
    </main>
  )
}
