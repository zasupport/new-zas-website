import { AlertTriangle } from 'lucide-react';

type Variant = 'card' | 'inline';

// `repair` (default true) adds the machine-dependent processing / lead-time clause.
// Set repair={false} on managed-services / contract pages where a per-device
// repair turnaround clause does not apply.
export default function PricingNote({
  variant = 'card',
  repair = true,
}: {
  variant?: Variant;
  repair?: boolean;
}) {
  if (variant === 'inline') {
    return (
      <p
        data-pricing-note="true"
        data-turnaround-note={repair ? 'true' : undefined}
        className="text-[#E8A5A5] text-xs sm:text-sm mt-4 leading-snug"
      >
        <span className="font-semibold text-[#FCA5A5]">Indicative pricing only.</span>{' '}
        Final pricing is confirmed once ZA Support verifies your device model and serial number.
        Contact us on <span className="whitespace-nowrap font-semibold">064 529 5863</span> with your model and serial for a confirmed quote.
        {repair && (
          <span className="block mt-2">
            <span className="font-semibold text-[#FCA5A5]">Processing and lead times are indicative only.</span>{' '}
            The repair process and turnaround time depend entirely on your specific machine and can change based on the model, the fault, and the parts your device needs.
            You will only have a confirmed lead time after you enquire and speak to a ZA Support consultant who assesses your machine.
          </span>
        )}
      </p>
    );
  }

  return (
    <div
      role="note"
      data-pricing-note="true"
      data-turnaround-note={repair ? 'true' : undefined}
      className="mt-6 sm:mt-8 flex items-start gap-3 rounded-xl border border-red-500/40 bg-red-950/30 px-4 py-3 sm:px-5 sm:py-4"
    >
      <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" aria-hidden />
      <div className="min-w-0">
        <p className="text-[#FCA5A5] font-bold text-sm sm:text-base leading-snug">
          Indicative pricing only. Final pricing is confirmed once ZA Support verifies your device model and serial number.
        </p>
        <p className="text-[#E8A5A5] text-xs sm:text-sm mt-1 leading-snug">
          Pricing is confirmed on assessment and depends on your specific device. Contact ZA Support on{' '}
          <span className="whitespace-nowrap font-semibold">064 529 5863</span> with your model and serial number for a confirmed quote.
        </p>
        {repair && (
          <>
            <p className="text-[#FCA5A5] font-bold text-sm sm:text-base leading-snug mt-3">
              Processing and lead times are indicative only and depend entirely on your specific machine.
            </p>
            <p className="text-[#E8A5A5] text-xs sm:text-sm mt-1 leading-snug">
              The repair process and turnaround time change based on the model, the fault, and the parts your device needs. You will only have a confirmed lead time after you enquire and speak to a ZA Support consultant who assesses your machine. Contact us on{' '}
              <span className="whitespace-nowrap font-semibold">064 529 5863</span>.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
