import { DiaristBankDataRepository } from '@marinetesio/database/typeorm/mysql';
import { DiaristBankDataNotFoundError } from '@marinetesio/errors';
import { DiaristBankData } from '@marinetesio/types/model/model';

export interface GetDiaristBankDataServiceRequest {
  bankDataId: string;
}

export type GetDiaristBankDataServiceResponse = DiaristBankData;

export class GetDiaristBankDataService {
  async execute(
    request: GetDiaristBankDataServiceRequest,
  ): Promise<GetDiaristBankDataServiceResponse> {
    const { bankDataId } = request;

    const bankData = await DiaristBankDataRepository.findOne({
      where: {
        id: bankDataId,
      },
    });

    if (!bankData) {
      throw new DiaristBankDataNotFoundError();
    }

    return bankData;
  }
}
