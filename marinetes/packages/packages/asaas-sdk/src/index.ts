import { AsaasClient, AsaasClientOptions } from './Client';

export function createClient(options: AsaasClientOptions): AsaasClient {
  return new AsaasClient(options);
}

export { AsaasError } from '@marinetesio/errors';

export * from './resources';
export * from './Client';
