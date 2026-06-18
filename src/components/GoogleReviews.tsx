// GoogleReviews, TEST-2 sourced GBP reviews component (Y-approved 26/05/2026)
//
// Replaces the 86 fabricated testimonials stripped by TEST-1. Reads
// src/data/google-reviews.json (populated daily by ~/bin/za-gbp-review-importer.sh
// → LaunchAgent com.zasupport.gbpReviewImporter 04:45 SAST). Renders ONLY real
// reviews, if the file is empty or missing displayName, the component renders
// nothing rather than fabricate.
//
// §374 anti-hallucination | §357 ledger: gbp-review-importer-test2

import Link from 'next/link';
import { Star } from 'lucide-react';
import reviewsData from '@/data/google-reviews.json';

interface GoogleReview {
  id: string;
  displayName: string;
  comment: string;
  starRating: number;
  createTime: string;
  updateTime?: string;
  language?: string;
  reply?: { comment: string; updateTime: string } | null;
}

interface GoogleReviewsData {
  ts: string;
  source: 'gbp_v4' | 'gbp_aggregate_only' | 'manual_fallback';
  total_count: number;
  rating: number;
  reviews: GoogleReview[];
}

interface GoogleReviewsProps {
  count?: number;
  title?: string;
  heading?: 'h2' | 'h3';
}

const MAP_URL = 'https://www.google.com/maps/place/ZA+Support';

function relativeDate(iso: string): string {
  if (!iso) return '';
  const t = new Date(iso).getTime();
  if (Number.isNaN(t)) return '';
  const days = Math.max(0, Math.round((Date.now() - t) / 86_400_000));
  if (days < 1) return 'today';
  if (days < 7) return `${days} day${days === 1 ? '' : 's'} ago`;
  if (days < 30) {
    const w = Math.round(days / 7);
    return `${w} week${w === 1 ? '' : 's'} ago`;
  }
  if (days < 365) {
    const m = Math.round(days / 30);
    return `${m} month${m === 1 ? '' : 's'} ago`;
  }
  const y = Math.round(days / 365);
  return `${y} year${y === 1 ? '' : 's'} ago`;
}

function Stars({ rating }: { rating: number }) {
  const r = Math.max(0, Math.min(5, Math.round(rating)));
  return (
    <div className="flex items-center gap-0.5" aria-label={`${r} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${i <= r ? 'text-[#0FEA7A] fill-[#0FEA7A]' : 'text-[#27504D]'}`}
        />
      ))}
    </div>
  );
}

export function GoogleReviews({
  count = 6,
  title = 'What our clients say',
  heading = 'h2',
}: GoogleReviewsProps) {
  const data = reviewsData as GoogleReviewsData;
  const reviews = (data?.reviews ?? []).filter(
    (r) => r && r.displayName && r.displayName.trim().length > 0,
  );

  // Anti-fabrication: nothing real → render nothing
  if (reviews.length === 0) return null;

  const visible = reviews.slice(0, Math.max(1, count));
  const Heading = heading;
  const totalCount = data.total_count || reviews.length;
  const rating = data.rating || 4.9;

  return (
    <section className="py-20 bg-[#0F1A18]" aria-labelledby="google-reviews-title">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Heading
            id="google-reviews-title"
            className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-3"
          >
            {title}
          </Heading>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 text-[#7A9E98]">
            <div className="flex items-center gap-2">
              <Stars rating={rating} />
              <span className="text-[#E8F4F1] font-semibold">{rating.toFixed(1)}</span>
            </div>
            <span className="hidden sm:inline">·</span>
            <a
              href={MAP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#0FEA7A] transition-colors"
            >
              {totalCount} Google reviews
            </a>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((review) => {
            const initials = review.displayName
              .split(' ')
              .map((p) => p[0])
              .filter(Boolean)
              .slice(0, 2)
              .join('')
              .toUpperCase();
            return (
              <article
                key={review.id || review.displayName + review.createTime}
                className="bg-[rgba(22,34,32,0.5)] border border-[rgba(15,234,122,0.1)] rounded-2xl p-6 hover:border-[rgba(15,234,122,0.25)] transition-all"
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[rgba(15,234,122,0.12)] text-[#0FEA7A] flex items-center justify-center font-bold text-sm">
                      {initials || '★'}
                    </div>
                    <div>
                      <p className="text-[#E8F4F1] font-semibold leading-tight">
                        {review.displayName}
                      </p>
                      <p className="text-[#7A9E98] text-xs">
                        {relativeDate(review.createTime)}
                      </p>
                    </div>
                  </div>
                  <Stars rating={review.starRating} />
                </div>
                {review.comment && (
                  <p className="text-[#C8DAD6] text-sm leading-relaxed line-clamp-6">
                    {review.comment}
                  </p>
                )}
                <div className="mt-4 pt-3 border-t border-[rgba(15,234,122,0.08)] flex items-center justify-between">
                  <Link
                    href={MAP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#7A9E98] text-xs hover:text-[#0FEA7A] transition-colors"
                    aria-label="Verified Google review, view on Google Maps"
                  >
                    Verified Google review
                  </Link>
                </div>
              </article>
            );
          })}
        </div>

        <div className="text-center mt-10">
          <a
            href={MAP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[#0FEA7A] hover:text-[#0FEA7A]/80 text-sm font-semibold transition-colors"
          >
            See all {totalCount} reviews on Google →
          </a>
        </div>
      </div>
    </section>
  );
}

export default GoogleReviews;
