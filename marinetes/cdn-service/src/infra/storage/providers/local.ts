import { Buffer } from 'node:buffer';
import { writeFile, readdir, readFile, stat } from 'node:fs';
import { extname } from 'node:path';
import { promisify } from 'node:util';

import { environment } from '@/config/environment';
import {
  Provider,
  UploadImageData,
  UploadImageResponse,
  GetImageData,
  GetImageResponse,
} from '@/core/infra/storage/Provider';
import { getRootPath } from '@/shared/utils/getRootPath';

const writeFileAsync = promisify(writeFile);
const readDirAsync = promisify(readdir);
const readFileAsync = promisify(readFile);
const statAsync = promisify(stat);

export class Local extends Provider {
  constructor() {
    super('local');
  }

  async uploadImage(data: UploadImageData): Promise<UploadImageResponse> {
    const buffer = Buffer.from(data.chunk);
    const name = this.makeFileName(data.name);

    const imagePath = getRootPath('.tmp', 'images', name);

    await writeFileAsync(imagePath, buffer);

    return {
      name,
      type: data.type,
      size: data.size,
      url: `${environment.expressServerUrl}/images/${name}`,
    };
  }

  async getImage(data: GetImageData): Promise<GetImageResponse | null> {
    const { name } = data;

    const imagesPath = getRootPath('.tmp', 'images');

    const images = await readDirAsync(imagesPath);

    if (!images.length) {
      return null;
    }

    const imageFounded = images.find(imageName => imageName === name);

    if (!imageFounded) {
      return null;
    }

    const imagePath = getRootPath('.tmp', 'images', name);

    const type = extname(imagePath);
    const { size } = await statAsync(imagePath);
    const chunk = await readFileAsync(imagePath);

    return {
      name,
      type,
      size,
      chunk,
    };
  }
}
