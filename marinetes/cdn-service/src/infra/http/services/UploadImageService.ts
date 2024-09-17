import { Service } from '@/core/infra/http/Service';
import { Storage } from '@/infra/storage';

export interface UploadImageServiceRequest {
  name: string;
  type: string;
  size: number;
  chunk: Buffer;
}

export interface UploadImageServiceResponse {
  name: string;
  type: string;
  size: number;
  url: string;
}

export class UploadImageService implements Service {
  constructor(private storage: Storage) {}

  async execute(
    data: UploadImageServiceRequest,
  ): Promise<UploadImageServiceResponse> {
    const { name, type, size, chunk } = data;

    const image = await this.storage.uploadImage({
      name,
      type,
      size,
      chunk,
    });

    return image;
  }
}
