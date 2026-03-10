/**
 * patch-schema.mjs
 * Adds FAQPage schema + AggregateRating to all service pages.
 * Run once: node scripts/patch-schema.mjs
 */

import { readFileSync, writeFileSync } from 'fs';
import { globSync } from 'fs';
import path from 'path';

// All pages with FAQAccordion (confirmed by grep)
const FAQ_PAGES = [
  'src/app/apple-repair/page.tsx',
  'src/app/ipad-repair/page.tsx',
  'src/app/iphone-repair/battery/page.tsx',
  'src/app/iphone-repair/page.tsx',
  'src/app/iphone-repair/screen/page.tsx',
  'src/app/jamf-mdm/page.tsx',
  'src/app/liquid-damage/apple-watch/page.tsx',
  'src/app/liquid-damage/imac/page.tsx',
  'src/app/liquid-damage/ipad/page.tsx',
  'src/app/liquid-damage/iphone/page.tsx',
  'src/app/liquid-damage/macbook-air/page.tsx',
  'src/app/liquid-damage/macbook-pro/page.tsx',
  'src/app/liquid-damage/page.tsx',
  'src/app/logic-board-repair/imac/page.tsx',
  'src/app/logic-board-repair/mac-mini/page.tsx',
  'src/app/logic-board-repair/macbook-air/page.tsx',
  'src/app/logic-board-repair/macbook-pro/page.tsx',
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

for (const filePath of FAQ_PAGES) {
  try {
    let content = readFileSync(filePath, 'utf8');

    // Skip if already patched
    if (content.includes('buildFaqSchema')) {
      console.log(`SKIP (already patched): ${filePath}`);
      skipped++;
      continue;
    }

    // --- Step 1: Add SchemaOrg import if missing ---
    if (!content.includes("import SchemaOrg from '@/components/seo/SchemaOrg'")) {
      // Find the last import line and insert after it
      const lastImportIdx = content.lastIndexOf('\nimport ');
      const endOfLastImport = content.indexOf('\n', lastImportIdx + 1);
      content =
        content.slice(0, endOfLastImport + 1) +
        "import SchemaOrg from '@/components/seo/SchemaOrg';\n" +
        content.slice(endOfLastImport + 1);
    }

    // --- Step 2: Add buildFaqSchema import ---
    // Insert after the SchemaOrg import line
    const schemaOrgImportEnd = content.indexOf('\n', content.indexOf("import SchemaOrg from '@/components/seo/SchemaOrg'")) + 1;
    content =
      content.slice(0, schemaOrgImportEnd) +
      "import { buildFaqSchema } from '@/lib/schema';\n" +
      content.slice(schemaOrgImportEnd);

    // --- Step 3: Add faqSchema const before export default ---
    const exportDefaultIdx = content.indexOf('\nexport default function');
    if (exportDefaultIdx === -1) {
      errors.push(`${filePath}: Could not find export default`);
      continue;
    }
    content =
      content.slice(0, exportDefaultIdx) +
      '\nconst faqSchema = buildFaqSchema(faqs);\n' +
      content.slice(exportDefaultIdx);

    // --- Step 4: Add <SchemaOrg schema={faqSchema} /> as first child inside return (<> ---
    // Find the return statement's opening fragment
    const returnFragmentIdx = content.indexOf('\n    <>\n');
    if (returnFragmentIdx === -1) {
      // Try alternate pattern
      const altIdx = content.indexOf('\n      <>\n');
      if (altIdx === -1) {
        errors.push(`${filePath}: Could not find return fragment pattern`);
        continue;
      }
      const insertAt = altIdx + '\n      <>\n'.length;
      content =
        content.slice(0, insertAt) +
        '      <SchemaOrg schema={faqSchema} />\n' +
        content.slice(insertAt);
    } else {
      const insertAt = returnFragmentIdx + '\n    <>\n'.length;
      content =
        content.slice(0, insertAt) +
        '      <SchemaOrg schema={faqSchema} />\n' +
        content.slice(insertAt);
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
if (errors.length) {
  console.log('Error details:');
  errors.forEach(e => console.log(' •', e));
}
