/** Page identity is independent of deployment environment and request headers. */
export const PUBLIC_ORIGIN = 'https://zasupport.com';

export function canonicalPageUrl(path = '/'): string {
  if (!path.startsWith('/') && !path.startsWith(`${PUBLIC_ORIGIN}/`) && path !== PUBLIC_ORIGIN) {
    throw new Error('Canonical URL must be an absolute site path or approved production URL');
  }
  const url = new URL(path, PUBLIC_ORIGIN);
  if (url.origin !== PUBLIC_ORIGIN || url.username || url.password || url.search || url.hash) {
    throw new Error('Canonical URL must use the approved origin without query or fragment');
  }
  return url.href;
}

export function previewNeedsNoindex(hostname: string): boolean {
  // Host-bound, not build-environment-bound: promoting a preview build must
  // never accidentally noindex the real production domain.
  const host = hostname.toLowerCase().replace(/\.$/, '');
  return host !== 'zasupport.com' && host !== 'www.zasupport.com';
}
