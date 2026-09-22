import assert from 'node:assert/strict';
import { canonicalPageUrl, previewNeedsNoindex } from '../src/lib/url-policy.ts';
assert.equal(canonicalPageUrl('/probe'), 'https://zasupport.com/probe');
assert.equal(canonicalPageUrl('https://zasupport.com/probe'), 'https://zasupport.com/probe');
for (const bad of ['https://unapproved.example/probe', '//evil.example/a', '/probe?q=1', '/probe#fragment', 'relative']) {
  assert.throws(() => canonicalPageUrl(bad));
}
assert.equal(previewNeedsNoindex('zasupport.com'), false);
assert.equal(previewNeedsNoindex('www.zasupport.com'), false);
assert.equal(previewNeedsNoindex('ZASUPPORT.COM.'), false);
assert.equal(previewNeedsNoindex('preview.example'), true);
assert.equal(previewNeedsNoindex('zasupport.com.evil.example'), true);
assert.equal(previewNeedsNoindex('localhost'), true);
console.log('PASS: 13 URL-policy assertions including promotion-safe host classification');
