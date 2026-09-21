import Link from 'next/link';

export default function RepairGrowthSection({ title, paragraphs = [], links }: {
  title: string; paragraphs?: string[]; links: [string, string][];
}) {
  return <section data-release="repair-growth-20260921" className="bg-[#111C1A] py-14 text-[#E8F4F1]">
    <div className="mx-auto max-w-5xl px-4 sm:px-6">
      <h2 className="text-2xl font-bold">{title}</h2>
      {paragraphs.map(p => <p key={p} className="mt-4 max-w-3xl leading-7 text-[#B9D2CB]">{p}</p>)}
      <ul className="mt-6 grid gap-3 sm:grid-cols-2">
        {links.map(([href, label]) => <li key={href}><Link href={href} className="inline-block py-2 text-[#0FEA7A] underline underline-offset-4 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4">{label}</Link></li>)}
      </ul>
      <Link href="/book" className="mt-6 inline-flex rounded-xl bg-[#0FEA7A] px-6 py-3 font-semibold text-[#0A1A18]">Book an assessment</Link>
    </div>
  </section>;
}
