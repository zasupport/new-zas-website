#!/usr/bin/env node
import fs from 'node:fs';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const canonicalBase = 'https://zasupport.com';

// §941/Phase-3: a required check that could not be evaluated is NOT a pass. It is
// this sentinel, and `passed()` treats anything that is not strictly `true` as a
// failure - so a NOT_TESTED/BLOCKED check can never false-green the run.
export const NOT_TESTED = 'NOT_TESTED';
export const passed = result => Object.values(result).every(v => v === true);

// §939 public-origin scan: outward HTML must not expose a vendor/preview host.
const VENDOR_HOST = /\b[a-z0-9-]+\.(?:vercel\.app|onrender\.com|render\.com|pages\.dev|netlify\.app)\b/i;

export function inspect(html, status, route, links = []) {
  const tags = html.match(/<(?:link|meta)\b[^>]*>/gi) ?? [];
  const attribute = (tag, name) => tag.match(new RegExp(`\\b${name}\\s*=\\s*["']([^"']*)["']`, 'i'))?.[1];
  const canonicals = tags.filter(t => attribute(t,'rel') === 'canonical').map(t => attribute(t,'href'));
  const robots = tags.filter(t => /^(robots|googlebot)$/i.test(attribute(t,'name') ?? '')).map(t => attribute(t,'content') ?? '');
  const hrefs = new Set([...html.matchAll(/\bhref\s*=\s*["']([^"']*)["']/g)].map(m => m[1]));
  return {
    http200: status === 200,
    canonical: canonicals.length === 1 && canonicals[0] === canonicalBase + route,
    indexable: !robots.some(r => /noindex|none/i.test(r)),
    heading: /<h1\b[^>]*>[\s\S]*?<\/h1>/i.test(html),
    expectedLinks: links.every(link => hrefs.has(link)),
    originClean: !VENDOR_HOST.test(html),
  };
}
const args = process.argv.slice(2);
if (args.includes('--self-test')) {
  const sample='<link rel="canonical" href="https://zasupport.com/probe"><meta name="robots" content="index, follow"><h1>Test</h1><a href="/book">Book</a>';
  assert(passed(inspect(sample,200,'/probe',['/book'])));
  assert(!passed(inspect(sample,404,'/probe',['/book'])));
  assert(!passed(inspect(sample,200,'/wrong',['/book'])));
  assert(!passed(inspect(sample.replace('index, follow','noindex'),200,'/probe')));
  assert(!passed(inspect(sample,200,'/probe',['/absent'])));
  assert(!passed(inspect(sample.replace(/<h1>.*?<\/h1>/,''),200,'/probe')));
  assert(!passed(inspect(sample+sample,200,'/probe')));
  // Phase-3 captured negative control #1 (§704): a check that is NOT_TESTED/BLOCKED
  // must NOT pass - proves a not-run required check can never false-green.
  assert(!passed({http200:true,canonical:true,indexable:true,heading:true,expectedLinks:true,originClean:NOT_TESTED}),'NOT_TESTED must fail');
  assert(!passed({http200:true,canonical:true,indexable:true,heading:true,expectedLinks:true,originClean:'BLOCKED'}),'BLOCKED must fail');
  // Phase-3 captured negative control #2 (§939): a vendor/preview host in outward HTML must fail.
  assert(!passed(inspect(sample+'<a href="https://new-zas-website-abc.vercel.app/x">leak</a>',200,'/probe',['/book'])),'vendor host must fail');
  console.log('PASS: release verifier positive control and nine negative controls (incl NOT_TESTED/BLOCKED false-green + public-origin)');
} else {
  const base = process.env.VERIFY_BASE_URL || canonicalBase;
  const parsed = new URL(base);
  if (!(base === canonicalBase || ['127.0.0.1','localhost'].includes(parsed.hostname))) throw Error('Unapproved verification target');
  const expected = args.includes('--expected-version') ? args[args.indexOf('--expected-version')+1] : null;
  const config = JSON.parse(fs.readFileSync(path.join(root,'scripts/release-pages.json'),'utf8'));
  const results = [];
  for (const item of config) {
    try {
      const response = await fetch(base+item.page,{redirect:'manual',signal:AbortSignal.timeout(25000)});
      const html = await response.text();
      const checks = inspect(html,response.status,item.page,item.expected);
      checks.headerIndexable = !/noindex|none/i.test(response.headers.get('x-robots-tag') ?? '');
      results.push({page:item.page,status:response.status,checks,passed:passed(checks)});
    } catch(error) {
      results.push({page:item.page,passed:false,error:String(error)});
    }
  }
  const sitemap = await fetch(base+'/sitemap.xml',{signal:AbortSignal.timeout(25000)});
  const xml = await sitemap.text();
  const sitemapPass = sitemap.ok && config.every(p=>xml.includes('<loc>'+canonicalBase+p.page+'</loc>'));
  const negative = await fetch(base+'/za-release-negative-control-20260921',{redirect:'manual',signal:AbortSignal.timeout(25000)});
  const healthResponse = await fetch(base+'/api/health',{signal:AbortSignal.timeout(25000)});
  const health = await healthResponse.json();
  const healthPass = healthResponse.ok && health.status === 'ok' && (!expected || health.version === expected);
  const allPassed = results.every(r=>r.passed)&&sitemapPass&&negative.status===404&&healthPass;
  // §941/Phase-3 release-state separation: evidence gathered against a preview/local
  // base can NEVER be labelled production. The verifier tests EDGE behaviour, so the
  // strongest state it can assert is EDGE-verified for that base - never UI/production.
  const isCanonical = base === canonicalBase;
  const releaseState = !allPassed
    ? (isCanonical ? 'LIVE_EDGE_FAILED' : 'PREVIEW_EDGE_FAILED')
    : (isCanonical ? 'EXTERNALLY_VERIFIED_LIVE' : 'PREVIEW_EDGE_VERIFIED');
  const report = {observed_at:new Date().toISOString(),base,expected,health,releaseState,
    sitemapPass,negative404:negative.status===404,healthPass,
    passed:allPassed,results};
  fs.mkdirSync(path.join(root,'.reliability'),{recursive:true});
  const target=path.join(root,'.reliability','release-'+Date.now()+'.json');
  fs.writeFileSync(target,JSON.stringify(report,null,2));
  console.log(JSON.stringify({passed:report.passed,releaseState,pages:results.length,failures:results.filter(r=>!r.passed),sitemapPass,negative404:report.negative404,healthPass,report:target},null,2));
  if(!report.passed)process.exitCode=1;
}
