// pages/author/[slug]/page.tsx
// Dedicated author page with Person + ProfilePage schema
// E-E-A-T: Full credentials, article list, social links, verifiable experience

import Image from 'next/image'
import Link from 'next/link'
import { authors } from '@/components/blog/AuthorBox'

// Person + ProfilePage schema for author pages
function AuthorPageSchema({ author, articles }: { author: typeof authors['courtney-bentley']; articles: { title: string; slug: string; date: string }[] }) {
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `https://www.zasupport.com/author/${author.slug}#person`,
    name: author.name,
    url: `https://www.zasupport.com/author/${author.slug}`,
    image: `https://www.zasupport.com${author.image}`,
    jobTitle: author.role,
    description: author.bio,
    worksFor: {
      '@type': 'Organization',
      '@id': 'https://www.zasupport.com/#organization',
      name: 'ZA Support',
      url: 'https://www.zasupport.com',
    },
    alumniOf: author.slug === 'courtney-bentley' ? {
      '@type': 'CollegeOrUniversity',
      name: 'University of South Africa (UNISA)',
    } : undefined,
    knowsAbout: [
      'Apple Mac repair',
      'MacBook logic board repair',
      'MacBook liquid damage recovery',
      'iPhone repair',
      'Apple enterprise support',
      'JAMF MDM',
      'Component-level soldering',
      'Apple diagnostics',
    ],
    sameAs: [
      author.linkedin,
      author.tiktok,
      author.twitter,
      author.facebook,
      author.instagram,
    ].filter(Boolean),
  }

  const profilePageSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    '@id': `https://www.zasupport.com/author/${author.slug}`,
    name: `${author.name} — ${author.role}`,
    description: author.bio,
    mainEntity: {
      '@id': `https://www.zasupport.com/author/${author.slug}#person`,
    },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageSchema) }} />
    </>
  )
}

// Full author page component
export default function AuthorPage({ params }: { params: { slug: string } }) {
  const author = authors[params.slug]
  if (!author) return null // 404

  // In production, fetch from Sanity CMS
  const articles: { title: string; slug: string; date: string; category: string }[] = []

  const courtneyCredentials = [
    'Apple-certified technician since 2009',
    'BSc Informatics, University of South Africa (UNISA)',
    'Member of the Apple Developer Program',
    'Over 25,000 Mac repairs completed',
    'Specialist in component-level logic board repair',
    'Certified in JAMF MDM enterprise deployment',
    'BEE Level 1 certified business owner',
    'Vizibiliti Intelligent Solutions (Pty) Ltd — Director',
  ]

  return (
    <>
      <AuthorPageSchema author={author} articles={articles} />

      <main className="max-w-3xl mx-auto px-6 py-16">
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="mb-8 text-sm text-zinc-400">
          <ol className="flex gap-2">
            <li><Link href="/" className="hover:text-zinc-600">Home</Link></li>
            <li>/</li>
            <li><Link href="/blog" className="hover:text-zinc-600">Blog</Link></li>
            <li>/</li>
            <li className="text-zinc-600">{author.name}</li>
          </ol>
        </nav>

        {/* Author header */}
        <div className="flex items-start gap-6 mb-10">
          <Image
            src={author.image}
            alt={`${author.name}, ${author.role} at ZA Support, Johannesburg`}
            width={120}
            height={120}
            className="rounded-full object-cover ring-2 ring-zinc-100"
          />
          <div>
            <h1 className="text-3xl font-bold text-zinc-900">{author.name}</h1>
            <p className="text-zinc-500 mt-1">{author.role} at ZA Support</p>
            <p className="text-zinc-600 mt-3 leading-relaxed">{author.bio}</p>

            {/* Social links */}
            <div className="flex gap-4 mt-4">
              {author.linkedin && (
                <a href={author.linkedin} target="_blank" rel="noopener noreferrer" className="text-sm text-emerald-600 hover:text-emerald-700 font-medium">
                  LinkedIn
                </a>
              )}
              {author.tiktok && (
                <a href={author.tiktok} target="_blank" rel="noopener noreferrer" className="text-sm text-emerald-600 hover:text-emerald-700 font-medium">
                  TikTok
                </a>
              )}
              {author.twitter && (
                <a href={author.twitter} target="_blank" rel="noopener noreferrer" className="text-sm text-emerald-600 hover:text-emerald-700 font-medium">
                  X (Twitter)
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Credentials (Courtney only) */}
        {params.slug === 'courtney-bentley' && (
          <section className="mb-12">
            <h2 className="text-xl font-semibold text-zinc-900 mb-4">Credentials and Experience</h2>
            <ul className="space-y-2">
              {courtneyCredentials.map((cred, i) => (
                <li key={i} className="flex items-start gap-3 text-zinc-600">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                  {cred}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Articles list */}
        <section>
          <h2 className="text-xl font-semibold text-zinc-900 mb-6">
            Articles by {author.name.split(' ')[0]}
          </h2>
          {articles.length > 0 ? (
            <div className="space-y-4">
              {articles.map((article) => (
                <Link
                  key={article.slug}
                  href={`/blog/${article.slug}`}
                  className="block p-4 rounded-lg border border-zinc-100 hover:border-emerald-200 hover:bg-emerald-50/30 transition-all"
                >
                  <p className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1">
                    {article.category} · {article.date}
                  </p>
                  <h3 className="font-medium text-zinc-900">{article.title}</h3>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-zinc-500">
              Articles are being loaded from the CMS. In production, this section dynamically lists
              all blog posts authored by {author.name.split(' ')[0]}.
            </p>
          )}
        </section>
      </main>
    </>
  )
}
