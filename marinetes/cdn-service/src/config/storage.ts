import { UploadConfig } from '@/infra/http/middlewares/UploadMiddleware';
import { StorageOptions } from '@/infra/storage';

import { environment } from './environment';

export const storageConfig: StorageOptions = {
  type: environment.storageType,
};

export const imageUploadConfig: UploadConfig = {
  limitSizeInMegaBytes: 8,
  allowedTypes: ['image/png', 'image/jpeg', 'image/webp', 'image/jpg'],
};
