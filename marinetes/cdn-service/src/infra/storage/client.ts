import {
  Provider,
  UploadImageData,
  UploadImageResponse,
  GetImageData,
  GetImageResponse,
} from '@/core/infra/storage/Provider';

import { providers } from './providers';

export type StorageTypes = 'local' | 'aws';

export interface StorageOptions {
  type: StorageTypes;
}

export class Storage {
  #provider: Provider;

  constructor(options: StorageOptions) {
    this.#provider = new providers[options.type]();
  }

  async uploadImage(data: UploadImageData): Promise<UploadImageResponse> {
    return this.#provider.uploadImage(data);
  }

  async getImage(data: GetImageData): Promise<GetImageResponse | null> {
    return this.#provider.getImage(data);
  }
}
