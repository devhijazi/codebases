import urlJoin from 'url-join';

import { APP_PUBLIC_URL } from '@means/data/constants';

const urlRegex = /^https?:\/\/+/;

export function makeUrl(path: string): string {
  if (urlRegex.test(path)) {
    return path;
  }

  return urlJoin(APP_PUBLIC_URL, path);
}
