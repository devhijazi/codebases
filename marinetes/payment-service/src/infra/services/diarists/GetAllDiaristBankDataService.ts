import { DiaristRepository } from '@marinetesio/database/typeorm/mysql';
import { DiaristNotFoundError } from '@marinetesio/errors';
import { DiaristBankData } from '@marinetesio/types/model/index';

export interface GetAllDiaristBankDataRequest {
  diaristId: string;
}

export type GetAllDiaristBankDataResponse = DiaristBankData[];

export class GetAllDiaristBankDataService {
  async execute(
    data: GetAllDiaristBankDataRequest,
  ): Promise<GetAllDiaristBankDataResponse> {
    const { diaristId } = data;

    const diarist = await DiaristRepository.findOne({
      where: {
        id: diaristId,
      },
      relations: ['banks'],
    });

    if (!diarist) {
      throw new DiaristNotFoundError();
    }

    return diarist.banks;
  }
}
