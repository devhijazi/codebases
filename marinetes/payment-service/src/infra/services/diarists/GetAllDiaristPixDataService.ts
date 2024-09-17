import { DiaristRepository } from '@marinetesio/database/typeorm/mysql';
import { DiaristNotFoundError } from '@marinetesio/errors';
import { DiaristPixData } from '@marinetesio/types/model/model';

export interface GetAllDiaristPixDataServiceRequest {
  diaristId: string;
}

export type GetAllDiaristPixDataServiceResponse = DiaristPixData[];

export class GetAllDiaristPixDataService {
  async execute(
    request: GetAllDiaristPixDataServiceRequest,
  ): Promise<GetAllDiaristPixDataServiceResponse> {
    const { diaristId } = request;

    const diarist = await DiaristRepository.findOne({
      where: {
        id: diaristId,
      },
      relations: ['pixes'],
    });

    if (!diarist) {
      throw new DiaristNotFoundError();
    }

    return diarist.pixes;
  }
}
