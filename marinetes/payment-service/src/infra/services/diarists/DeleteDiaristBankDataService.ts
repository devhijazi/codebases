import { DiaristBankDataRepository } from '@marinetesio/database/typeorm/mysql';
import { DiaristBankDataNotFoundError } from '@marinetesio/errors';

export interface DeleteDiaristBankDataRequest {
  bankDataId: string;
}

export interface DeleteDiaristBankDataResponse {
  bankDataId: string;
}

export class DeleteDiaristBankDataService {
  async execute(
    request: DeleteDiaristBankDataRequest,
  ): Promise<DeleteDiaristBankDataResponse> {
    const { bankDataId } = request;

    const bankData = await DiaristBankDataRepository.findOne({
      where: {
        id: bankDataId,
      },
    });

    if (!bankData) {
      throw new DiaristBankDataNotFoundError();
    }

    await DiaristBankDataRepository.delete(bankData.id);

    return {
      bankDataId: bankData.id,
    };
  }
}
