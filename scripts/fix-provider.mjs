import { readFileSync, writeFileSync } from 'fs';

const FILES = [
  'src/app/macbook-repair/battery/page.tsx',
  'src/app/macbook-repair/keyboard/page.tsx',
  'src/app/macbook-repair/screen/page.tsx',
  'src/app/macbook-repair/page.tsx',
  'src/app/liquid-damage/page.tsx',
];

for (const f of FILES) {
  let c = readFileSync(f, 'utf8');
  // Remove the dangling "},\n" that immediately follows "provider: LOCAL_BUSINESS_PROVIDER,"
  c = c.replace(
    /( *provider: LOCAL_BUSINESS_PROVIDER,\n) *\},\n/g,
    '$1'
  );
  writeFileSync(f, c);
  console.log('Fixed:', f);
}

// Fix duplicate SchemaOrg faqSchema in logic-board-repair/page.tsx
const lb = 'src/app/logic-board-repair/page.tsx';
let lbc = readFileSync(lb, 'utf8');
// Remove first occurrence of the duplicate (keep one)
lbc = lbc.replace(
  /(\s*<SchemaOrg schema=\{faqSchema\} \/>)(\s*<SchemaOrg schema=\{serviceSchema\} \/>)(\s*<SchemaOrg schema=\{faqSchema\} \/>)/,
  '$1$2'
);
writeFileSync(lb, lbc);
console.log('Fixed duplicate:', lb);
