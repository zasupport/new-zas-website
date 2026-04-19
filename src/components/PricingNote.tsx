import { AlertTriangle } from 'lucide-react';

type Variant = 'card' | 'inline';

export default function PricingNote({ variant = 'card' }: { variant?: Variant }) {
  if (variant === 'inline') {
    return (
      <p
        data-pricing-note="true"
        className="text-[#E8A5A5] text-xs sm:text-sm mt-4 leading-snug"
      >
        <span className="font-semibold text-[#FCA5A5]">Indicative pricing only.</span>{' '}
        Final pricing is confirmed once ZA Support verifies your device model and serial number.
        Contact us on <span className="whitespace-nowrap font-semibold">064 529 5863</span> with your model and serial for a confirmed quote.
      </p>
    );
  }

  return (
    <div
      role="note"
      data-pricing-note="true"
      className="mt-6 sm:mt-8 flex items-start gap-3 rounded-xl border border-red-500/40 bg-red-950/30 px-4 py-3 sm:px-5 sm:py-4"
    >
      <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" aria-hidden />
      <div className="min-w-0">
        <p className="text-[#FCA5A5] font-bold text-sm sm:text-base leading-snug">
          Indicative pricing only. Final pricing is confirmed once ZA Support verifies your device model and serial number.
        </p>
        <p className="text-[#E8A5A5] text-xs sm:text-sm mt-1 leading-snug">
          All prices shown are starting points and subject to device-specific assessment. Contact ZA Support on{' '}
          <span className="whitespace-nowrap font-semibold">064 529 5863</span> with your model and serial number for a confirmed quote.
        </p>
      </div>
    </div>
  );
}
