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
