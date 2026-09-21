#!/usr/bin/env node
import fs from 'node:fs';
import assert from 'node:assert/strict';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const sitemap=fs.readFileSync(path.join(root,'src/app/sitemap.ts'),'utf8');
assert(!/new Date\(\s*\)|lastModified:\s*now\b/.test(sitemap),'Sitemap must not manufacture fresh modification dates on every build');
const layout=fs.readFileSync(path.join(root,'src/app/layout.tsx'),'utf8');
assert(!layout.includes('next/font/google'),'Production build must use project-local licensed fonts');
for(const match of layout.matchAll(/(?:src:|path:)\s*'(\.\.\/fonts\/[^']+)'/g)) {
  assert(fs.statSync(path.resolve(root,'src/app',match[1])).size>1000,'Missing font bytes');
}
const workflow=fs.readFileSync(path.join(root,'.github/workflows/deploy.yml'),'utf8');
assert(!workflow.includes('npm run lint & wait'),'Bare wait can hide a failed gate');
assert(workflow.includes('npm run build'),'Full build gate missing');
assert(workflow.includes('npm run check:security'),'Security audit gate missing');
assert(workflow.includes('${GITHUB_SHA:0:8}'),'Exact production revision must be checked');
for (const file of fs.readdirSync(path.join(root,'.github/workflows')).filter(f=>/\.ya?ml$/.test(f))) {
  const text=fs.readFileSync(path.join(root,'.github/workflows',file),'utf8');
  if(text.includes('actions/setup-node')) {
    assert(!/\bnode-version:/.test(text),file+': use .nvmrc rather than a second runtime version');
    assert(text.includes("node-version-file: '.nvmrc'"),file+': runtime source of truth missing');
  }
}
console.log('PASS: deterministic fonts, truthful sitemap dates, fail-closed CI and revision-bound deploy checks');
