import { DiaristPixDataRepository } from '@marinetesio/database/typeorm/mysql';
import { DiaristPixKeyNotFoundError } from '@marinetesio/errors';
import { DiaristPixData } from '@marinetesio/types/model/model';

export interface GetDiaristPixDataServiceRequest {
  pixDataId: string;
}

export type GetDiaristPixDataServiceResponse = DiaristPixData;

export class GetDiaristPixDataService {
  async execute(
    request: GetDiaristPixDataServiceRequest,
  ): Promise<GetDiaristPixDataServiceResponse> {
    const { pixDataId } = request;

    const pixData = await DiaristPixDataRepository.findOne({
      where: {
        id: pixDataId,
      },
    });

    if (!pixData) {
      throw new DiaristPixKeyNotFoundError();
    }

    return pixData;
  }
}
