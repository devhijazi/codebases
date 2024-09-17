import { UserPixDataRepository } from '@marinetesio/database/typeorm/mysql';
import { DiaristPixKeyNotFoundError } from '@marinetesio/errors';
import {
  UserPixData,
  UserPixDataKeyType,
} from '@marinetesio/types/model/model';

export interface UpdateUserPixDataServiceRequest {
  pixDataId: string;
  data: {
    key: string;
    keyType: UserPixDataKeyType;
  };
}

export type UpdateUserPixDataServiceResponse = UserPixData;

export class UpdateUserPixDataService {
  async execute(
    request: UpdateUserPixDataServiceRequest,
  ): Promise<UpdateUserPixDataServiceResponse> {
    const {
      pixDataId,
      data: { key, keyType },
    } = request;

    const pixData = await UserPixDataRepository.findOne({
      where: {
        id: pixDataId,
      },
    });

    if (!pixData) {
      throw new DiaristPixKeyNotFoundError();
    }

    pixData.key = key;
    pixData.key_type = keyType;

    pixData.save();

    return pixData;
  }
}
