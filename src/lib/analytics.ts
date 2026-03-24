/**
 * GA4 event tracking utility — ZA Support
 * Uses window.gtag injected by @next/third-parties/google GoogleAnalytics component
 *
 * Conversion events:
 *   whatsapp_click   — any WhatsApp CTA tapped
 *   phone_tap        — any tel: link tapped
 *   book_form_submit — /book form successfully submitted
 *   book_form_start  — user starts filling /book form
 *
 * Custom dimensions (register in GA4 Admin → Custom definitions):
 *   service_type  — e.g. "logic-board-repair", "liquid-damage"
 *   suburb        — e.g. "sandton", "rosebank"
 *   device_model  — e.g. "MacBook Pro M1", "iPhone 14"
 */

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

type GtagEvent = {
  event_category?: string;
  event_label?: string;
  value?: number;
  service_type?: string;
  suburb?: string;
  device_model?: string;
  page_location?: string;
  [key: string]: unknown;
};

function gtag(event: string, params?: GtagEvent) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', event, params ?? {});
  }
}

export function trackWhatsAppClick(source: string, servicePage?: string) {
  gtag('whatsapp_click', {
    event_category: 'conversion',
    event_label: source,
    service_type: servicePage ?? 'general',
    page_location: typeof window !== 'undefined' ? window.location.pathname : '',
  });
}

export function trackPhoneTap(source: string) {
  gtag('phone_tap', {
    event_category: 'conversion',
    event_label: source,
    page_location: typeof window !== 'undefined' ? window.location.pathname : '',
  });
}

export function trackBookFormStart() {
  gtag('book_form_start', {
    event_category: 'engagement',
    event_label: 'book_page',
  });
}

export function trackBookFormSubmit(serviceType?: string, deviceModel?: string) {
  gtag('book_form_submit', {
    event_category: 'conversion',
    event_label: 'book_page',
    service_type: serviceType ?? 'unknown',
    device_model: deviceModel ?? 'unknown',
    value: 1,
  });
}

export function trackPageContext(params: {
  service_type?: string;
  suburb?: string;
  device_model?: string;
}) {
  gtag('page_context', {
    event_category: 'dimension',
    ...params,
  });
}
