import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Calendar } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Blog — Apple Tips, Repair Guides & Tech News | ZA Support',
  description: 'Apple repair tips, macOS guides, device maintenance advice, and IT news from ZA Support — Johannesburg\'s Apple specialists.',
  alternates: { canonical: 'https://zasupport.com/blog' },
};

const posts = [
  {
    slug: 'macbook-screen-repair-johannesburg',
    title: 'MacBook Screen Repair in Johannesburg: Cracked, Black, or Flickering',
    excerpt: 'Whether your MacBook screen is cracked, completely black, flickering, or showing lines -- this guide covers every display fault, what causes it, and what your repair options are in Johannesburg.',
    date: '16/03/2026',
    category: 'Repair Guides',
    readTime: '7 min read',
  },
  {
    slug: 'macbook-battery-replacement-johannesburg',
    title: 'MacBook Battery Replacement in Johannesburg: Everything You Need to Know',
    excerpt: 'A swollen, draining, or dead MacBook battery does not mean the end of your machine. This guide covers how to tell when your battery needs replacing, what the process involves, and what to expect.',
    date: '16/03/2026',
    category: 'Repair Guides',
    readTime: '6 min read',
  },
  {
    slug: 'macbook-logic-board-repair-cost-johannesburg-2026',
    title: 'MacBook Logic Board Repair in Johannesburg: What to Expect in 2026',
    excerpt: 'Everything you need to know about MacBook logic board repair costs in Johannesburg — what a logic board does, signs it has failed, how the repair works, and why component-level repair saves you thousands.',
    date: '16/03/2026',
    category: 'Repair Guides',
    readTime: '7 min read',
  },
  {
    slug: 'how-to-speed-up-mac-free',
    title: 'How to Speed Up Your Mac for Free (2026 Guide)',
    excerpt: 'Ten free steps to make your Mac noticeably faster today — from clearing startup items and resetting the SMC to cleaning your Downloads folder and managing storage pressure. No paid software required.',
    date: '14/03/2026',
    category: 'How-To Guides',
    readTime: '9 min read',
  },
  {
    slug: 'mac-not-turning-on-checklist',
    title: 'Mac Won\'t Turn On? Work Through This Checklist First',
    excerpt: 'Before assuming the worst, work through this 8-step self-service checklist. Most Mac startup failures have a straightforward cause — a flat battery, a stuck power button, or a corrupted boot volume — and can be resolved without a repair.',
    date: '14/03/2026',
    category: 'How-To Guides',
    readTime: '8 min read',
  },
  {
    slug: 'macbook-running-slow',
    title: 'Why Is My MacBook Running Slow? 7 Fixes That Actually Work',
    excerpt: 'A slow MacBook is almost always fixable without spending a cent. Here are the 7 most common causes of MacBook slowness and exactly how to fix each one — from storage pressure to thermal throttling.',
    date: '14/03/2026',
    category: 'How-To Guides',
    readTime: '8 min read',
  },
  {
    slug: 'macbook-wont-connect-wifi',
    title: 'MacBook Won\'t Connect to WiFi: Complete Fix Guide (2026)',
    excerpt: 'MacBook WiFi problems range from a 30-second software fix to a hardware fault. This guide works through every fix in order so you resolve it without unnecessary steps.',
    date: '14/03/2026',
    category: 'How-To Guides',
    readTime: '7 min read',
  },
  {
    slug: 'apple-id-locked-out',
    title: 'Locked Out of Apple ID? Here\'s Exactly What to Do',
    excerpt: 'Being locked out of your Apple ID affects your Mac, iPhone, iPad, and every Apple service. This guide covers every recovery method available in 2026 — including what to do when the standard options fail.',
    date: '14/03/2026',
    category: 'How-To Guides',
    readTime: '9 min read',
  },
  {
    slug: 'macbook-load-shedding-damage',
    title: 'Load Shedding Damaged My MacBook: What You Need to Know',
    excerpt: 'Load shedding does not just cut your power — the surge when power returns can silently destroy a MacBook logic board. Here is what happens, the warning signs, and how to protect your machine.',
    date: '14/03/2026',
    category: 'Repair Guides',
    readTime: '7 min read',
  },
  {
    slug: 'what-to-do-macbook-liquid-damage',
    title: 'What to Do Immediately After Your MacBook Gets Wet',
    excerpt: 'The first 30 minutes after a liquid spill are critical. Here is exactly what to do — and what not to do — to maximise your chances of a successful repair.',
    date: '08/03/2026',
    category: 'Repair Guides',
    readTime: '5 min read',
  },
  {
    slug: 'why-rice-does-not-work',
    title: 'Why Putting Your iPhone in Rice Does Not Work',
    excerpt: 'The rice myth is one of the most damaging pieces of consumer advice circulating online. We explain why it does not work and what you should do instead.',
    date: '01/03/2026',
    category: 'Repair Guides',
    readTime: '4 min read',
  },
  {
    slug: 'jamf-mdm-guide-south-africa',
    title: 'JAMF MDM for South African Businesses: A Complete Guide',
    excerpt: 'Everything you need to know about managing Apple devices with JAMF in a South African business context — POPIA compliance, costs, and implementation.',
    date: '20/02/2026',
    category: 'Enterprise',
    readTime: '8 min read',
  },
];

export default function BlogPage() {
  return (
    <>
      <section className="hero-gradient grid-overlay pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#E8F4F1] mb-4" style={{ fontFamily: 'Syne, sans-serif' }}>
            ZA Support <span className="text-[#0FEA7A]">Blog</span>
          </h1>
          <p className="text-xl text-[#7A9E98] max-w-2xl">Apple tips, repair guides, and IT insights from Johannesburg&apos;s Apple specialists.</p>
        </div>
      </section>

      <section className="py-20 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {posts.map((post) => (
              <article key={post.slug} className="glass-card p-8">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs font-semibold text-[#0FEA7A] bg-[rgba(15,234,122,0.1)] px-3 py-1 rounded-full">{post.category}</span>
                  <div className="flex items-center gap-1 text-[#7A9E98] text-xs">
                    <Calendar className="w-3.5 h-3.5" />
                    {post.date}
                  </div>
                  <span className="text-[#7A9E98] text-xs">{post.readTime}</span>
                </div>
                <h2 className="text-2xl font-bold text-[#E8F4F1] mb-3" style={{ fontFamily: 'Syne, sans-serif' }}>
                  <Link href={`/blog/${post.slug}`} className="hover:text-[#0FEA7A] transition-colors">
                    {post.title}
                  </Link>
                </h2>
                <p className="text-[#7A9E98] leading-relaxed mb-4">{post.excerpt}</p>
                <Link href={`/blog/${post.slug}`} className="inline-flex items-center gap-1 text-[#0FEA7A] text-sm font-medium hover:underline">
                  Read more <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
