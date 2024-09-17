import { FileConfig } from '@/infra/http/middlewares/FileMiddleware';

export const documentConfig: FileConfig = {
  limitSizeInMegaBytes: 8,
  allowedTypes: ['image/png', 'image/jpg'],
};
