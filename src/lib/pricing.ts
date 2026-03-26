export const PRICING = {
  1: { base: 4499, label: 'Solo Practice', sub: '1 doctor' },
  2: { base: 5499, label: 'Dual Practice', sub: '2 doctors' },
  3: { base: 5999, label: 'Group Practice', sub: '3+ doctors' },
} as const;

export type DoctorCount = keyof typeof PRICING;

export function calcTotal(baseFee: number) {
  const vat = Math.round(baseFee * 0.15);
  const subtotal = baseFee + vat;
  const proc = Math.ceil(subtotal * 0.03 + 1.50);
  return { base: baseFee, vat, subtotal, proc, total: subtotal + proc };
}

// Returns cents for DB storage
export function calcTotalCents(baseFee: number) {
  const r = calcTotal(baseFee);
  return {
    base_fee: r.base * 100,
    vat_amount: r.vat * 100,
    processing_fee: r.proc * 100,
    total_monthly: r.total * 100,
  };
}

/** Resolve the base fee (in Rands) for a given doctor count. Clamps at 3+. */
export function baseFeeForCount(doctorCount: number): number {
  const key = Math.min(Math.max(doctorCount, 1), 3) as DoctorCount;
  return PRICING[key].base;
}

/** Package label for a given doctor count. */
export function packageLabel(doctorCount: number): string {
  const key = Math.min(Math.max(doctorCount, 1), 3) as DoctorCount;
  return PRICING[key].label;
}
