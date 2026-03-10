import { readFileSync, writeFileSync } from 'fs';

const OLD_FAQ_BLOCK = `const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: { '@type': 'Answer', text: faq.answer },
  })),
};

`;

const FILES = [
  'src/app/logic-board-repair/page.tsx',
  'src/app/liquid-damage/page.tsx',
];

for (const f of FILES) {
  let c = readFileSync(f, 'utf8');
  if (c.includes(OLD_FAQ_BLOCK)) {
    c = c.replace(OLD_FAQ_BLOCK, '');
    writeFileSync(f, c);
    console.log('Fixed duplicate faqSchema:', f);
  } else {
    console.log('Pattern not found (may differ):', f);
    // Try looser removal: remove first const faqSchema = { ... }; block
    const start = c.indexOf('\nconst faqSchema = {\n');
    if (start !== -1) {
      const end = c.indexOf('\n};\n', start) + 4;
      c = c.slice(0, start) + c.slice(end);
      writeFileSync(f, c);
      console.log('Fixed via loose match:', f);
    }
  }
}

// Also remove duplicate <SchemaOrg schema={faqSchema} /> from liquid-damage JSX
const ld = 'src/app/liquid-damage/page.tsx';
let ldc = readFileSync(ld, 'utf8');
const dupePattern = /(<SchemaOrg schema=\{faqSchema\} \/>)\n(\s*<SchemaOrg schema=\{serviceSchema\} \/>)\n(\s*<SchemaOrg schema=\{faqSchema\} \/>)/;
if (dupePattern.test(ldc)) {
  ldc = ldc.replace(dupePattern, '$1\n$2');
  writeFileSync(ld, ldc);
  console.log('Removed duplicate JSX SchemaOrg:', ld);
}
