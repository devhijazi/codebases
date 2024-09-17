import { DiaristPixDataRepository } from '@marinetesio/database/typeorm/mysql';
import { DiaristPixKeyNotFoundError } from '@marinetesio/errors';
import {
  DiaristPixData,
  DiaristPixDataKeyType,
} from '@marinetesio/types/model/model';

export interface UpdateDiaristPixDataServiceRequest {
  pixDataId: string;
  data: {
    key: string;
    keyType: DiaristPixDataKeyType;
  };
}

export type UpdateDiaristPixDataServiceResponse = DiaristPixData;

export class UpdateDiaristPixDataService {
  async execute(
    request: UpdateDiaristPixDataServiceRequest,
  ): Promise<UpdateDiaristPixDataServiceResponse> {
    const {
      pixDataId,
      data: { key, keyType },
    } = request;

    const pixData = await DiaristPixDataRepository.findOne({
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
