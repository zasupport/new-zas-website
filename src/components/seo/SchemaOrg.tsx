import type { SchemaOrg } from '@/types';

interface SchemaOrgProps {
  schema: SchemaOrg | SchemaOrg[];
  // Blog is out of scope for the temporary price hide; blog pages pass
  // keepPricing so their schema (and visible prices) stay fully as-is.
  keepPricing?: boolean;
}

// TEMP price hide (2026-07-15): while on-page prices are hidden during the
// pricing update, JSON-LD prices are stripped too so structured data stays in
// parity with the (price-free) visible content (Google: do not mark up content
// that is not visible to users). Set to false to restore schema prices once new
// pricing is live. This is the single chokepoint through which ~293 pages emit
// JSON-LD, so it covers inline Offers, hasOfferCatalog, priceSpecification and
// estimatedCost without editing each page.
const HIDE_SCHEMA_PRICING = true;

// Keys whose values are (or contain) a price; dropped entirely while hiding.
const PRICE_KEYS = new Set([
  'price',
  'lowPrice',
  'highPrice',
  'priceCurrency',
  'priceSpecification',
  'priceRange',
  'estimatedCost',
]);

const RAND = /(?<![A-Za-z])R[0-9][0-9,]*[0-9]/g;

function scrubString(s: string): string {
  return s
    .replace(/\b[Ff]rom\s+R[0-9][0-9,]*[0-9]/g, '')
    .replace(RAND, '')
    .replace(/\s{2,}/g, ' ')
    .replace(/\s+([.,])/g, '$1')
    .trim();
}

function stripPricing(node: unknown): unknown {
  if (Array.isArray(node)) return node.map(stripPricing);
  if (node && typeof node === 'object') {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(node as Record<string, unknown>)) {
      if (PRICE_KEYS.has(k)) continue;
      out[k] = stripPricing(v);
    }
    return out;
  }
  if (typeof node === 'string') return scrubString(node);
  return node;
}

export default function SchemaOrg({ schema, keepPricing = false }: SchemaOrgProps) {
  const payload =
    HIDE_SCHEMA_PRICING && !keepPricing
      ? (stripPricing(schema) as SchemaOrg | SchemaOrg[])
      : schema;
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(payload) }}
    />
  );
}
