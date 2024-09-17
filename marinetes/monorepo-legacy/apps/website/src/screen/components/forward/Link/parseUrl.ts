import type { UrlObject } from 'url';

export function parseUrl(url?: string | UrlObject): string | undefined {
  if (!url) {
    return undefined;
  }

  return (typeof url === 'object' ? url.href : url) || undefined;
}
