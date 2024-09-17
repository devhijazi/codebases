import { Router } from 'express';

import { imageUploadConfig, storageConfig } from '@/config/storage';
import { Controller, buildController } from '@/core/infra/http/Controller';
import {
  sendImageOrFile,
  ok,
  clientError,
} from '@/core/infra/http/HttpResponse';
import { Storage } from '@/infra/storage';

import { UploadMiddleware } from '../middlewares/UploadMiddleware';
import { GetImageByNameService } from '../services/GetImageByNameService';
import { UploadImageService } from '../services/UploadImageService';

class ImageControllerStructure extends Controller {
  constructor() {
    super('images');
  }

  execute(router: Router): void {
    const storage = new Storage(storageConfig);

    router.post(
      '/',
      UploadMiddleware.make({
        field: 'image',
        type: 'single',
        config: imageUploadConfig,
      }),
      async (request, response) => {
        const { originalname, mimetype, buffer, size } = request.file;

        const uploadImage = new UploadImageService(storage);

        const image = await uploadImage.execute({
          name: originalname,
          type: mimetype,
          size,
          chunk: buffer,
        });

        ok(response, { image });
      },
    );

    router.get('/:imageName', async (request, response) => {
      const { imageName } = request.params;

      const getImageByName = new GetImageByNameService(storage);

      const imageOrError = await getImageByName.execute({
        name: imageName,
      });

      if (imageOrError.isLeft()) {
        const error = imageOrError.value;

        clientError(response, error);

        return;
      }

      const image = imageOrError.value;

      sendImageOrFile(response, image);
    });
  }
}

export const ImageController = buildController(ImageControllerStructure);
