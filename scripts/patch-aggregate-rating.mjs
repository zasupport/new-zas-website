/**
 * patch-aggregate-rating.mjs
 * Upgrades existing serviceSchema provider blocks to use LOCAL_BUSINESS_PROVIDER
 * (which includes AggregateRating, geo, opening hours, full address).
 * Run once: node scripts/patch-aggregate-rating.mjs
 */

import { readFileSync, writeFileSync } from 'fs';

// Pages that already have serviceSchema defined (need provider upgrade)
const SERVICE_PAGES = [
  'src/app/liquid-damage/macbook-pro/page.tsx',
  'src/app/liquid-damage/page.tsx',
  'src/app/logic-board-repair/page.tsx',
  'src/app/macbook-repair/battery/page.tsx',
  'src/app/macbook-repair/keyboard/page.tsx',
  'src/app/macbook-repair/page.tsx',
  'src/app/macbook-repair/screen/page.tsx',
  'src/app/managed-services/page.tsx',
];

let patched = 0;
let skipped = 0;
const errors = [];

for (const filePath of SERVICE_PAGES) {
  try {
    let content = readFileSync(filePath, 'utf8');

    // Skip if already using LOCAL_BUSINESS_PROVIDER
    if (content.includes('LOCAL_BUSINESS_PROVIDER')) {
      console.log(`SKIP (already upgraded): ${filePath}`);
      skipped++;
      continue;
    }

    // Add LOCAL_BUSINESS_PROVIDER to the buildFaqSchema import line
    if (content.includes("import { buildFaqSchema } from '@/lib/schema'")) {
      content = content.replace(
        "import { buildFaqSchema } from '@/lib/schema'",
        "import { buildFaqSchema, LOCAL_BUSINESS_PROVIDER } from '@/lib/schema'"
      );
    } else {
      // Add a fresh import
      const schemaOrgLine = content.indexOf("import SchemaOrg from '@/components/seo/SchemaOrg'");
      const lineEnd = content.indexOf('\n', schemaOrgLine) + 1;
      content = content.slice(0, lineEnd) + "import { LOCAL_BUSINESS_PROVIDER } from '@/lib/schema';\n" + content.slice(lineEnd);
    }

    // Replace the minimal provider block patterns:
    // Pattern A: provider: { '@type': 'LocalBusiness', name: 'ZA Support', telephone: CONTACT.phoneTel }
    content = content.replace(
      /provider:\s*\{\s*'@type':\s*'LocalBusiness'[^}]+\}/g,
      'provider: LOCAL_BUSINESS_PROVIDER'
    );

    // Pattern B: provider: { '@type': 'LocalBusiness', name: SITE.name, telephone: CONTACT.phone, address: { ... } } (multi-line)
    // This handles the more complex blocks in the macbook-repair pages
    const providerBlockRegex = /provider:\s*\{[\s\S]*?'@type':\s*'LocalBusiness'[\s\S]*?(?:areaServed[\s\S]*?\},|offers:)/;
    if (providerBlockRegex.test(content) && !content.includes('provider: LOCAL_BUSINESS_PROVIDER')) {
      // Find and replace the full provider block - careful approach
      const providerStart = content.indexOf('\n  provider: {');
      if (providerStart !== -1) {
        // Find the matching closing brace
        let braceCount = 0;
        let i = providerStart + 1;
        let inProvider = false;
        let providerEnd = -1;
        for (; i < content.length; i++) {
          if (content[i] === '{') { braceCount++; inProvider = true; }
          if (content[i] === '}') { braceCount--; }
          if (inProvider && braceCount === 0) {
            providerEnd = i + 1;
            break;
          }
        }
        if (providerEnd !== -1) {
          const providerBlock = content.slice(providerStart, providerEnd);
          // Only replace if it actually contains LocalBusiness
          if (providerBlock.includes("'LocalBusiness'")) {
            content = content.slice(0, providerStart) + '\n  provider: LOCAL_BUSINESS_PROVIDER' + content.slice(providerEnd);
          }
        }
      }
    }

    writeFileSync(filePath, content, 'utf8');
    console.log(`PATCHED: ${filePath}`);
    patched++;
  } catch (err) {
    errors.push(`${filePath}: ${err.message}`);
    console.error(`ERROR: ${filePath} — ${err.message}`);
  }
}

console.log(`\n═══════════════════════════════`);
console.log(`Patched:  ${patched}`);
console.log(`Skipped:  ${skipped}`);
console.log(`Errors:   ${errors.length}`);
if (errors.length) errors.forEach(e => console.log(' •', e));
