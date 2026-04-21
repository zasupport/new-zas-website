import pricingRanges from '@/data/pricing-ranges.json';

type PricingEntry = {
  family: string;
  from: number;
  high: number;
  page: string;
  typical_high: number;
  typical_low: number;
  variant: string;
  variant_type: string;
  inherited_from?: string;
};

type UnavailableEntry = {
  family: string;
  page: string;
  reason: string;
  variant: string;
};

type RangesShape = {
  by_page: Record<string, PricingEntry>;
  unavailable: UnavailableEntry[];
  complex_cases_label: string;
  typical_band_label: string;
};

const data = pricingRanges as unknown as RangesShape;

type Props = {
  page: string;
  variant?: 'card' | 'inline';
};

function fmt(n: number): string {
  return 'R' + n.toLocaleString('en-ZA');
}

export default function PricingRange({ page, variant = 'card' }: Props) {
  const unavailable = data.unavailable.find((u) => u.page === page);
  if (unavailable) {
    return (
      <div
        data-pricing-range="unavailable"
        className="mt-6 rounded-xl border border-white/10 bg-white/5 px-4 py-4 sm:px-5 sm:py-5"
      >
        <p className="text-white font-semibold text-sm sm:text-base">
          Pricing not displayed online for this service.
        </p>
        <p className="text-white/70 text-xs sm:text-sm mt-1 leading-snug">
          Contact ZA Support on{' '}
          <span className="whitespace-nowrap font-semibold text-white">064 529 5863</span>{' '}
          with your model and serial number for a custom quote.
        </p>
      </div>
    );
  }

  const entry = data.by_page[page];
  if (!entry) return null;

  if (variant === 'inline') {
    return (
      <p
        data-pricing-range="inline"
        className="text-white/80 text-xs sm:text-sm mt-3 leading-snug"
      >
        <span className="font-semibold text-white">From {fmt(entry.from)}.</span>{' '}
        Most customers pay {fmt(entry.typical_low)}–{fmt(entry.typical_high)}.{' '}
        Complex cases up to {fmt(entry.high)}.
      </p>
    );
  }

  return (
    <div
      data-pricing-range="card"
      className="mt-6 rounded-xl border border-white/10 bg-white/5 px-4 py-4 sm:px-5 sm:py-5"
    >
      <div className="grid gap-3 sm:grid-cols-3 sm:gap-4">
        <div>
          <p className="text-white/60 text-xs uppercase tracking-wide">Starts from</p>
          <p className="text-white font-bold text-lg sm:text-xl mt-1">{fmt(entry.from)}</p>
        </div>
        <div>
          <p className="text-white/60 text-xs uppercase tracking-wide">Most customers pay</p>
          <p className="text-white font-bold text-lg sm:text-xl mt-1">
            {fmt(entry.typical_low)}–{fmt(entry.typical_high)}
          </p>
        </div>
        <div>
          <p className="text-white/60 text-xs uppercase tracking-wide">Complex cases up to</p>
          <p className="text-white font-bold text-lg sm:text-xl mt-1">{fmt(entry.high)}</p>
        </div>
      </div>
      <p className="text-white/60 text-xs sm:text-sm mt-3 leading-snug">
        Ranges cover device model, parts availability, and repair complexity. Final quote after
        model + serial verification.
      </p>
    </div>
  );
}
