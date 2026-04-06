// components/blog/Breadcrumbs.tsx
// Visual breadcrumbs for blog posts — schema is handled by BlogSchema.tsx

import Link from 'next/link'

interface BreadcrumbProps {
  category?: string
  title: string
}

export function Breadcrumbs({ category, title }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 text-sm text-zinc-400">
      <ol className="flex flex-wrap items-center gap-1.5">
        <li>
          <Link href="/" className="hover:text-zinc-600 transition-colors">Home</Link>
        </li>
        <li className="select-none">/</li>
        <li>
          <Link href="/blog" className="hover:text-zinc-600 transition-colors">Blog</Link>
        </li>
        {category && (
          <>
            <li className="select-none">/</li>
            <li className="text-zinc-500">{category}</li>
          </>
        )}
        <li className="select-none">/</li>
        <li className="text-zinc-600 truncate max-w-[200px] sm:max-w-none">{title}</li>
      </ol>
    </nav>
  )
}


// components/blog/TableOfContents.tsx
// Sticky table of contents with anchor jump links — featured snippet targeting

interface TOCItem {
  id: string
  text: string
  level: 2 | 3
}

interface TOCProps {
  items: TOCItem[]
}

export function TableOfContents({ items }: TOCProps) {
  if (!items || items.length === 0) return null

  return (
    <nav
      aria-label="Table of contents"
      className="mb-10 p-5 rounded-xl bg-zinc-50 border border-zinc-100"
    >
      <p className="text-xs font-mono uppercase tracking-widest text-zinc-400 mb-3">
        In this article
      </p>
      <ol className="space-y-1.5">
        {items.map((item, i) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={`block text-sm transition-colors hover:text-emerald-600 ${
                item.level === 3
                  ? 'pl-4 text-zinc-400 hover:text-emerald-500'
                  : 'text-zinc-600 font-medium'
              }`}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}


// components/blog/LastUpdated.tsx
// Displays dateModified prominently — freshness signal for Google

interface LastUpdatedProps {
  datePublished: string   // e.g. "29 March 2026"
  dateModified?: string   // e.g. "6 April 2026"
}

export function LastUpdated({ datePublished, dateModified }: LastUpdatedProps) {
  return (
    <div className="flex items-center gap-3 text-xs text-zinc-400 font-mono mb-6">
      <span>Published {datePublished}</span>
      {dateModified && dateModified !== datePublished && (
        <>
          <span className="w-1 h-1 rounded-full bg-zinc-300" />
          <span className="text-emerald-600 font-medium">Updated {dateModified}</span>
        </>
      )}
    </div>
  )
}


// components/blog/KeyTakeaways.tsx
// AI-ready summary block in first 200 words — GEO optimisation for RAG citation

interface KeyTakeawaysProps {
  points: string[]
}

export function KeyTakeaways({ points }: KeyTakeawaysProps) {
  return (
    <div className="mb-8 p-5 rounded-xl bg-emerald-50/50 border border-emerald-100">
      <p className="text-xs font-mono uppercase tracking-widest text-emerald-600 mb-3">
        Key takeaways
      </p>
      <ul className="space-y-2">
        {points.map((point, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-zinc-700 leading-relaxed">
            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
            {point}
          </li>
        ))}
      </ul>
    </div>
  )
}
