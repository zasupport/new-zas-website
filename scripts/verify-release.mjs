#!/usr/bin/env node
import fs from 'node:fs';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const canonicalBase = 'https://zasupport.com';
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
  };
}
const args = process.argv.slice(2);
if (args.includes('--self-test')) {
  const sample='<link rel="canonical" href="https://zasupport.com/probe"><meta name="robots" content="index, follow"><h1>Test</h1><a href="/book">Book</a>';
  const passed = result => Object.values(result).every(Boolean);
  assert(passed(inspect(sample,200,'/probe',['/book'])));
  assert(!passed(inspect(sample,404,'/probe',['/book'])));
  assert(!passed(inspect(sample,200,'/wrong',['/book'])));
  assert(!passed(inspect(sample.replace('index, follow','noindex'),200,'/probe')));
  assert(!passed(inspect(sample,200,'/probe',['/absent'])));
  assert(!passed(inspect(sample.replace(/<h1>.*?<\/h1>/,''),200,'/probe')));
  assert(!passed(inspect(sample+sample,200,'/probe')));
  console.log('PASS: release verifier positive control and six negative controls');
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
      results.push({page:item.page,status:response.status,checks,passed:Object.values(checks).every(Boolean)});
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
  const report = {observed_at:new Date().toISOString(),base,expected,health,
    sitemapPass,negative404:negative.status===404,healthPass,
    passed:results.every(r=>r.passed)&&sitemapPass&&negative.status===404&&healthPass,results};
  fs.mkdirSync(path.join(root,'.reliability'),{recursive:true});
  const target=path.join(root,'.reliability','release-'+Date.now()+'.json');
  fs.writeFileSync(target,JSON.stringify(report,null,2));
  console.log(JSON.stringify({passed:report.passed,pages:results.length,failures:results.filter(r=>!r.passed),sitemapPass,negative404:report.negative404,healthPass,report:target},null,2));
  if(!report.passed)process.exitCode=1;
}
