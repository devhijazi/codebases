import { ImageNotFoundError } from '@hitechline/marinetes-errors';

import { Service } from '@/core/infra/http/Service';
import { ImageOrFile } from '@/core/infra/storage/Provider';
import { Either, left, right } from '@/core/logic/Either';
import { Storage } from '@/infra/storage';

export interface GetImageByNameServiceRequest {
  name: string;
}

export type GetImageByNameServiceResponse = Either<
  ImageNotFoundError,
  ImageOrFile
>;

export class GetImageByNameService implements Service {
  constructor(private storage: Storage) {}

  async execute(
    data: GetImageByNameServiceRequest,
  ): Promise<GetImageByNameServiceResponse> {
    const { name } = data;

    const image = await this.storage.getImage({
      name,
    });

    if (!image) {
      return left(new ImageNotFoundError());
    }

    return right(image);
  }
}
