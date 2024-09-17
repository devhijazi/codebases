import Prismic from '@prismicio/client';
import type { DefaultClient } from '@prismicio/client/types/client';

import { repositories } from './config';
import type { RepositoryName } from './types';

const cache = new Map<string, DefaultClient>();

export function getClient(repository: RepositoryName): DefaultClient {
  if (cache.has(repository)) {
    return cache.get(repository) as DefaultClient;
  }

  const { url, token } = repositories[repository];

  const client = Prismic.client(url, {
    accessToken: token,
  });

  cache.set(repository, client);

  return client;
}
