'use client';

import { CONTACT } from '@/lib/constants';

/**
 * Floating WhatsApp button — fixed to bottom-right corner on all pages.
 * Links to the ZA Support WhatsApp Business number.
 * Visible on all screen sizes, positioned above the fold.
 */
export default function WhatsAppButton() {
  return (
    <a
      href={CONTACT.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with ZA Support on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-lg transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2 md:h-16 md:w-16"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        className="h-7 w-7 fill-white md:h-8 md:w-8"
        aria-hidden="true"
      >
        <path d="M16.004 0h-.008C7.174 0 0 7.176 0 16.004c0 3.502 1.13 6.746 3.05 9.382L1.054 31.2l6.074-1.952a15.9 15.9 0 0 0 8.876 2.684C24.83 31.932 32 24.756 32 16.004S24.83 0 16.004 0zm9.338 22.594c-.39 1.1-1.932 2.014-3.166 2.28-.846.18-1.95.324-5.668-1.218-4.762-1.974-7.826-6.8-8.064-7.114-.23-.314-1.932-2.574-1.932-4.908s1.224-3.482 1.66-3.96c.434-.478.95-.598 1.264-.598.314 0 .63.002.904.016.29.014.68-.11 1.064.812.39.938 1.326 3.238 1.442 3.472.116.234.194.508.04.812-.156.314-.234.508-.468.784-.234.274-.492.612-.702.822-.234.234-.478.488-.206.96.274.468 1.216 2.006 2.612 3.252 1.794 1.6 3.306 2.096 3.774 2.33.468.234.742.196 1.016-.118.274-.314 1.178-1.374 1.492-1.846.314-.468.63-.39 1.062-.234.434.156 2.738 1.292 3.206 1.526.468.234.78.352.896.546.116.194.116 1.124-.274 2.224z" />
      </svg>
    </a>
  );
}
