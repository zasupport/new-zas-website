import { Star, ExternalLink } from 'lucide-react';
import { REVIEWS, SITE } from '@/lib/constants';

interface GoogleReview {
  authorAttribution: { displayName: string };
  rating: number;
  relativePublishTimeDescription: string;
  text: { text: string };
}

interface PlacesApiResponse {
  displayName?: { text: string };
  rating?: number;
  userRatingCount?: number;
  reviews?: GoogleReview[];
}

interface StaticReview {
  name: string;
  rating: number;
  text: string;
  service: string;
}

async function fetchGoogleReviews(): Promise<PlacesApiResponse | null> {
  const key = process.env.GOOGLE_MAPS_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID || 'ChIJN1t_tDeuEmsRUsoyG83frY4';

  if (!key) return null;

  try {
    const res = await fetch(
      `https://places.googleapis.com/v1/places/${placeId}`,
      {
        headers: {
          'X-Goog-Api-Key': key,
          'X-Goog-FieldMask': 'displayName,rating,userRatingCount,reviews',
        },
        next: { revalidate: 3600 },
      }
    );

    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

function StarRow({ rating, size = 'sm' }: { rating: number; size?: 'sm' | 'md' | 'lg' }) {
  const sizeClass = size === 'lg' ? 'w-6 h-6' : size === 'md' ? 'w-5 h-5' : 'w-4 h-4';
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`${sizeClass} ${i <= rating ? 'fill-[#0FEA7A] text-[#0FEA7A]' : 'fill-transparent text-[#7A9E98]'}`}
        />
      ))}
    </div>
  );
}

function truncate(text: string, max = 200): string {
  if (text.length <= max) return text;
  return text.slice(0, max).trimEnd() + '...';
}

export default async function GoogleReviews({ maxReviews = 4 }: { maxReviews?: number }) {
  const data = await fetchGoogleReviews();

  const useLive = !!(data?.reviews && data.reviews.length > 0);

  const rating = useLive ? (data!.rating ?? SITE.rating) : SITE.rating;
  const reviewCount = useLive
    ? `${data!.userRatingCount?.toLocaleString()}+ Google Reviews`
    : `${SITE.reviewCount} Google Reviews`;

  const mapsUrl = 'https://maps.app.goo.gl/E1agQ3ZZ6va73ano9';

  if (useLive) {
    const liveReviews = (data!.reviews ?? []).slice(0, maxReviews);

    return (
      <div>
        {/* Summary row */}
        <div className="flex items-center justify-center gap-3 mb-10">
          <StarRow rating={5} size="lg" />
          <span className="text-[#E8F4F1] font-bold text-xl">{Number(rating).toFixed(1)}</span>
          <span className="text-[#7A9E98]">&middot;</span>
          <span className="text-[#7A9E98]">{reviewCount}</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {liveReviews.map((review, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-[rgba(22,34,32,0.6)] border border-[rgba(15,234,122,0.12)] hover:border-[rgba(15,234,122,0.25)] transition-all"
            >
              <div className="flex items-center gap-1 mb-3">
                <StarRow rating={review.rating} />
                <span className="ml-2 text-xs text-[#7A9E98] font-medium">
                  {review.relativePublishTimeDescription}
                </span>
              </div>
              <p className="text-[#E8F4F1] text-sm leading-relaxed mb-4 italic">
                &ldquo;{truncate(review.text?.text ?? '', 200)}&rdquo;
              </p>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-[rgba(15,234,122,0.15)] rounded-full flex items-center justify-center text-[#0FEA7A] font-bold text-sm">
                  {review.authorAttribution?.displayName?.[0] ?? '?'}
                </div>
                <span className="text-[#E8F4F1] font-semibold text-sm">
                  {review.authorAttribution?.displayName ?? 'Google Reviewer'}
                </span>
                <span className="ml-auto text-xs text-[#7A9E98]">Google Review</span>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-8">
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-6 py-3 rounded-xl font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all text-sm"
          >
            See all reviews on Google <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    );
  }

  // Static fallback
  const staticReviews: readonly StaticReview[] = REVIEWS;
  const displayed = staticReviews.slice(0, maxReviews);

  return (
    <div>
      <div className="flex items-center justify-center gap-3 mb-10">
        <StarRow rating={5} size="lg" />
        <span className="text-[#E8F4F1] font-bold text-xl">{SITE.rating}</span>
        <span className="text-[#7A9E98]">&middot;</span>
        <span className="text-[#7A9E98]">{SITE.reviewCount} Google Reviews</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {displayed.map((review) => (
          <div
            key={review.name}
            className="p-6 rounded-2xl bg-[rgba(22,34,32,0.6)] border border-[rgba(15,234,122,0.12)] hover:border-[rgba(15,234,122,0.25)] transition-all"
          >
            <div className="flex items-center gap-1 mb-3">
              <StarRow rating={review.rating} />
              <span className="ml-2 text-xs text-[#7A9E98] font-medium">{review.service}</span>
            </div>
            <p className="text-[#E8F4F1] text-sm leading-relaxed mb-4 italic">
              &ldquo;{review.text}&rdquo;
            </p>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[rgba(15,234,122,0.15)] rounded-full flex items-center justify-center text-[#0FEA7A] font-bold text-sm">
                {review.name[0]}
              </div>
              <span className="text-[#E8F4F1] font-semibold text-sm">{review.name}</span>
              <span className="ml-auto text-xs text-[#7A9E98]">Google Review</span>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-6 py-3 rounded-xl font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all text-sm"
        >
          See all reviews on Google <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
}
