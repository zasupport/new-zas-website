#!/usr/bin/env node
/**
 * §529/§401/§399 BUILD-TIME CONSISTENCY GATE  (Fable audit step 5, 11/06/2026)
 * A URL that is a redirect `source:` in next.config.ts must NEVER also appear in
 * src/app/sitemap.ts — otherwise the sitemap advertises a slug that 308-redirects,
 * orphaning it and confusing Google's canonical (the exact §401/§399 failure).
 * This gate fails the deploy (exit 1) on any such collision.
 *
 * Run: node scripts/check-redirect-sitemap-consistency.mjs   (exit 0 = clean, 1 = collision)
 */
import fs from 'fs';

const cfg = fs.readFileSync('next.config.ts', 'utf8');
const sm  = fs.readFileSync('src/app/sitemap.ts', 'utf8');

// literal redirect sources only — skip /x/:param* wildcard patterns (not real slugs)
const sources = new Set(
  [...cfg.matchAll(/source:\s*'([^']+)'/g)]
    .map(m => m[1])
    .filter(s => !s.includes(':'))
    .map(s => s.replace(/\/+$/, ''))
);

// sitemap paths: the segment after `${base}` in each url template literal
const smPaths = [...sm.matchAll(/url:\s*`\$\{base\}([^`]*)`/g)]
  .map(m => m[1].replace(/\/+$/, ''))
  .filter(Boolean);

const collide = [...new Set(smPaths)].filter(p => sources.has(p));

if (collide.length) {
  console.error(`❌ §529 consistency gate FAIL — ${collide.length} sitemap URL(s) are ALSO redirect sources (will 308 → orphan):`);
  collide.forEach(p => console.error(`     ${p}`));
  console.error('   Fix: remove the slug from src/app/sitemap.ts (it is redirected) OR drop the redirect if the page should stay live.');
  process.exit(1);
}
console.log(`✅ §529 consistency gate PASS — 0 collisions (${new Set(smPaths).size} sitemap paths vs ${sources.size} literal redirect sources)`);
process.exit(0);
