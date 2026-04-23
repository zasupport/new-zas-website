/**
 * HTML entity escaping — prevents XSS when user input is interpolated into HTML email templates.
 * Call escapeHtml() on EVERY user-supplied value before placing it in HTML strings.
 */
export function escapeHtml(str: unknown): string {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

/** Validate email format. */
export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/** Clamp a string to a maximum length. Returns null if over limit. */
export function clampLength(value: string, max: number): string | null {
  return value.length <= max ? value : null;
}

/**
 * Normalise a ZA phone number to international `wa.me`-compatible digits.
 * `0827604086` → `27827604086` | `+27 82 760 4086` → `27827604086` | `827604086` → `27827604086`.
 * Returns an empty string if input has no digits.
 */
export function normalizeZAPhone(phone: string): string {
  const digits = String(phone ?? '').replace(/\D/g, '');
  if (!digits) return '';
  if (digits.startsWith('27')) return digits;
  if (digits.startsWith('0')) return '27' + digits.slice(1);
  if (digits.length === 9) return '27' + digits;
  return digits;
}

/** Field length limits (characters). */
export const LIMITS = {
  name: 100,
  email: 254,
  phone: 20,
  device: 100,
  deviceType: 100,
  issue: 2000,
  problem: 2000,
  preferredContact: 50,
  urgency: 20,
} as const;
