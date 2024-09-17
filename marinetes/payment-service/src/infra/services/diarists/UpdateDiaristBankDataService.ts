import { DiaristBankDataRepository } from '@marinetesio/database/typeorm/mysql';
import { DiaristBankDataNotFoundError } from '@marinetesio/errors';
import {
  DiaristBankData,
  DiaristBankDataAccountType,
} from '@marinetesio/types/model/index';

export interface UpdateDiaristBankDataRequest {
  bankDataId: string;
  data: {
    accountName: string;
    ownerName: string;
    agency: string;
    account: string;
    accountDigit: string;
    bankCode?: string | null;
    ispb?: string | null;
    document: string;
    bankAccountType: DiaristBankDataAccountType;
  };
}
export type UpdateDiaristBankDataResponse = DiaristBankData;

export class UpdateDiaristBankDataService {
  async execute(
    data: UpdateDiaristBankDataRequest,
  ): Promise<UpdateDiaristBankDataResponse> {
    const {
      bankDataId,
      data: {
        account,
        accountDigit,
        accountName,
        agency,
        bankAccountType,
        ownerName,
        document,
        bankCode,
        ispb,
      },
    } = data;

    const bankData = await DiaristBankDataRepository.findOne({
      where: {
        id: bankDataId,
      },
    });

    if (!bankData) {
      throw new DiaristBankDataNotFoundError();
    }

    bankData.account = account;
    bankData.account_digit = accountDigit;
    bankData.account_name = accountName;
    bankData.agency = agency;
    bankData.bank_account_type = bankAccountType;
    bankData.owner_name = ownerName;
    bankData.bank_code = bankCode ?? null;
    bankData.ispb = ispb ?? null;
    bankData.document = document;

    await bankData.save();

    return bankData;
  }
}
