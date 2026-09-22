/** Actual built-server test. Never follows a redirect onto production. */
import assert from 'node:assert/strict';
import fs from 'node:fs';
import http from 'node:http';
const base = 'http://127.0.0.1:3000';
// Node fetch may normalize/ignore Host. Test through the HTTP client that
// actually sends the exact virtual-host header, without following redirects.
async function get(path, host) {
  return new Promise((resolve, reject) => {
    const req = http.get(base + path, {headers:{Host:host}, timeout:20000}, response => {
      response.resume();
      response.on('end', () => resolve({
        status:response.statusCode,
        headers:{get:name => response.headers[name] ?? null},
      }));
    });
    req.on('error',reject);
    req.on('timeout',() => req.destroy(new Error('request timeout')));
  });
}
const rows = [];
const routes = [
  ['/', '/'], ['/apple-support', '/apple-support'], ['/sitemap.xml', '/sitemap.xml'],
  ['/robots.txt', '/robots.txt'], ['/search', '/search'],
  ['/blog/rice-myth', '/blog/why-rice-does-not-work'],
  ['/apple-support/business', '/managed-services'],
  ['/apple-support/enterprise', '/jamf-mdm'],
  ['/ipad-repair/liquid-damage', '/liquid-damage/ipad'],
  ['/iphone-repair/liquid-damage', '/liquid-damage/iphone'],
  ['/macbook-repair/liquid-damage', '/liquid-damage'],
  ['/macbook-repair/logic-board', '/logic-board-repair'],
];
for (const [route, destination] of routes) {
  for (const host of ['zasupport.com', 'www.zasupport.com', 'preview.example']) {
    const response = await get(route + '?probe=a%20b', host);
    const location = response.headers.get('location');
    const noindex = response.headers.get('x-robots-tag');
    const expectedRedirect = host === 'www.zasupport.com' || route !== destination;
    if (expectedRedirect) {
      assert.equal(response.status, 308, `${host}${route}: permanent status`);
      const url = new URL(location, `https://${host}`);
      assert.equal(url.pathname, destination, 'redirect destination');
      assert.equal(url.searchParams.get('probe'), 'a b', 'query preserved');
      assert.equal(url.hostname, host === 'www.zasupport.com' ? 'zasupport.com' : host, 'exact redirect host');
    } else {
      assert.equal(response.status, 200);
      if (host === 'preview.example') assert.match(noindex, /noindex/);
      else assert.equal(noindex, null, 'production must never acquire preview noindex');
    }
    rows.push({route,host,status:response.status,location,noindex});
  }
}
// Test a real unknown route, not merely an empty fixture.
const missing = await get('/za-url-runtime-missing','zasupport.com');
assert.equal(missing.status,404);
fs.mkdirSync('.reliability', {recursive:true});
fs.writeFileSync(`.reliability/url-runtime-${Date.now()}.json`,JSON.stringify({
  observed_at:new Date().toISOString(),environment:'local-built-server',
  provider_edge_verified:false,passed:true,requests:rows.length+1,rows,
},null,2));
console.log(`PASS: ${rows.length+1} actual server requests; this is not provider-edge proof.`);
