// components/blog/BlogSchema.tsx
// Generates JSON-LD structured data for every blog post
// Includes: BlogPosting + Person author + Organization publisher + FAQPage + BreadcrumbList

import { authors } from './AuthorBox'

interface BlogSchemaProps {
  title: string
  description: string
  slug: string
  datePublished: string    // ISO 8601
  dateModified: string     // ISO 8601
  authorSlug: string       // key from authors map
  image?: string           // featured image URL
  category?: string
  wordCount?: number
  faqs?: { question: string; answer: string }[]
}

export function BlogSchema({
  title,
  description,
  slug,
  datePublished,
  dateModified,
  authorSlug,
  image,
  category,
  wordCount,
  faqs,
}: BlogSchemaProps) {
  const author = authors[authorSlug]
  const url = `https://www.zasupport.com/blog/${slug}`

  // BlogPosting schema with full E-E-A-T signals
  const blogPosting = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description,
    url,
    datePublished,
    dateModified,
    wordCount: wordCount || undefined,
    articleSection: category || 'Repairs',
    inLanguage: 'en-ZA',
    image: image
      ? {
          '@type': 'ImageObject',
          url: image.startsWith('http') ? image : `https://www.zasupport.com${image}`,
        }
      : undefined,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    author: {
      '@type': 'Person',
      name: author?.name || 'Courtney Bentley',
      url: `https://www.zasupport.com/author/${authorSlug}`,
      jobTitle: author?.role || 'Founder & Apple-Certified Technician',
      worksFor: {
        '@type': 'Organization',
        name: 'ZA Support',
        url: 'https://www.zasupport.com',
      },
      sameAs: [
        author?.linkedin,
        author?.tiktok,
        author?.twitter,
        author?.facebook,
        author?.instagram,
      ].filter(Boolean),
      knowsAbout: [
        'Apple Mac repair',
        'MacBook logic board repair',
        'Apple liquid damage recovery',
        'MacBook Pro component-level repair',
        'Apple device diagnostics',
        'JAMF MDM',
        'Apple enterprise fleet management',
      ],
    },
    publisher: {
      '@type': 'Organization',
      name: 'ZA Support',
      url: 'https://www.zasupport.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.zasupport.com/za-logo-standard-web.png',
      },
      sameAs: [
        'https://www.facebook.com/appleexpertsouthafrica',
        'https://www.instagram.com/appleexpertza/',
        'https://x.com/za_support',
        'https://www.tiktok.com/@appleexpertza',
        'https://www.youtube.com/@zasupport-applemacupgrader6746',
        'https://www.linkedin.com/in/bentleycourtney/',
      ],
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        reviewCount: '632',
        bestRating: '5',
        worstRating: '1',
      },
    },
  }

  // BreadcrumbList schema
  const breadcrumbs = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://www.zasupport.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: 'https://www.zasupport.com/blog',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: title,
        item: url,
      },
    ],
  }

  // FAQPage schema (if FAQs provided)
  const faqSchema = faqs?.length
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      }
    : null

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPosting) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
    </>
  )
}
