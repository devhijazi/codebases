import {
  DiaristPixDataRepository,
  DiaristRepository,
} from '@marinetesio/database/typeorm/mysql';
import {
  DiaristPixKeyRateLimitError,
  DiaristNotFoundError,
  DiaristPixKeyAlreadyExistsError,
} from '@marinetesio/errors';
import { DiaristPixData } from '@marinetesio/protos/protobuf';
import { DiaristPixDataKeyType } from '@marinetesio/types/model/model';

export interface CreateDiaristPixDataServiceRequest {
  diaristId: string;
  data: {
    key: string;
    keyType: DiaristPixDataKeyType;
  };
}

export type CreateDiaristPixDataServiceResponse = DiaristPixData;

export class CreateDiaristPixDataService {
  async execute(
    request: CreateDiaristPixDataServiceRequest,
  ): Promise<CreateDiaristPixDataServiceResponse> {
    const {
      diaristId,
      data: { key, keyType },
    } = request;

    const diarist = await DiaristRepository.findOne({
      where: { id: diaristId },
      relations: ['pixes'],
    });

    if (!diarist) {
      throw new DiaristNotFoundError();
    }

    if (diarist.pixes.length === 2) {
      throw new DiaristPixKeyRateLimitError();
    }

    const pixKeyAlreadyExists = await DiaristPixDataRepository.findOne({
      where: {
        key,
        diarist: {
          id: diarist.id,
        },
      },
    });

    if (pixKeyAlreadyExists) {
      throw new DiaristPixKeyAlreadyExistsError();
    }

    const pixData = await DiaristPixDataRepository.create({
      key,
      key_type: keyType,
      diarist: {
        id: diarist.id,
      },
    }).save();

    diarist.pixes.push(pixData);

    await diarist.save();

    return pixData;
  }
}
