import { AsaasError } from '@marinetesio/errors';
import axios from 'axios';

import { Resources } from './resources';

export interface AsaasClientOptions {
  environment: string;
  apiKey: string;
}

export interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: any;
  params?: any;
  headers?: Record<string, string>;
}

export class AsaasClient {
  private base_url: string;

  private options: AsaasClientOptions;

  resources: Resources;

  constructor(_options: AsaasClientOptions) {
    const DEFAULT_OPTIONS = {};
    const ASAAS_PRODUCTION_URL = 'https://api.asaas.com/v3';
    const ASAAS_SANDBOX_URL = 'https://sandbox.asaas.com/api/v3';

    const options = { ...DEFAULT_OPTIONS, ..._options };

    this.base_url =
      options.environment === 'production'
        ? ASAAS_PRODUCTION_URL
        : ASAAS_SANDBOX_URL;

    this.options = options;
    this.resources = new Resources(this);
  }

  async _request<T>(path: string, requestOptions?: RequestOptions): Promise<T> {
    const { data } = await axios
      .request<T>({
        url: `${this.base_url}/${path.replace('/', '')}`,
        method: requestOptions?.method ?? 'GET',
        data: requestOptions?.body,
        params: requestOptions?.params,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json; charset=utf-8',
          'access_token': `${this.options.apiKey}`,
          ...requestOptions?.headers,
        },
      })
      .catch(err => {
        throw new AsaasError(err.response.data?.errors);
      });

    return data;
  }
}
