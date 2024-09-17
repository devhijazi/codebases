import { Buffer } from 'node:buffer';

import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} from '@aws-sdk/client-s3';

import { environment } from '@/config/environment';
import {
  Provider,
  UploadImageData,
  UploadImageResponse,
  GetImageData,
  GetImageResponse,
} from '@/core/infra/storage/Provider';

export class Aws extends Provider {
  #s3Client: S3Client;

  constructor() {
    super('aws');

    this.#s3Client = new S3Client({
      region: environment.awsRegion,
      credentials: {
        accessKeyId: environment.awsAccessKeyId,
        secretAccessKey: environment.awsSecretAccessKey,
      },
    });
  }

  async uploadImage(data: UploadImageData): Promise<UploadImageResponse> {
    const buffer = Buffer.from(data.chunk);
    const name = this.makeFileName(data.name);

    const putObjectCommand = new PutObjectCommand({
      Bucket: environment.awsBucketName,
      Key: name,
      Body: buffer,
    });

    await this.#s3Client.send(putObjectCommand);

    return {
      name,
      type: data.type,
      size: data.size,
      url: `${environment.expressServerUrl}/images/${name}`,
    };
  }

  async getImage(data: GetImageData): Promise<GetImageResponse | null> {
    const { name } = data;

    const getObjectCommand = new GetObjectCommand({
      Bucket: environment.awsBucketName,
      Key: name,
    });

    try {
      const response = await this.#s3Client.send(getObjectCommand);

      if (
        !response ||
        !response.ContentType ||
        !response.ContentLength ||
        !response.Body
      ) {
        return null;
      }

      const type = `image/${name.split(/\./).pop()}`;
      const size = response.ContentLength;

      const bytes = await response.Body.transformToByteArray();
      const chunk = Buffer.from(bytes);

      return {
        name,
        type,
        size,
        chunk,
      };
    } catch (error) {
      return null;
    }
  }
}
