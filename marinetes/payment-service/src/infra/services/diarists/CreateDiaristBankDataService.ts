import {
  DiaristBankDataRepository,
  DiaristRepository,
} from '@marinetesio/database/typeorm/mysql';
import {
  BadRequestError,
  DiaristNotFoundError,
  DiaristBankDataAlreadyExistsError,
} from '@marinetesio/errors';
import { DiaristBankDataAccountType } from '@marinetesio/types/model/index';

export interface CreateDiaristBankRequest {
  diaristId: string;
  data: {
    accountName: string;
    ownerName: string;
    agency: string;
    account: string;
    accountDigit: string;
    document: string;
    bankAccountType: DiaristBankDataAccountType;
    ispb?: string | null;
    bankCode?: string | null;
  };
}

export interface CreateDiaristBankResponse {
  bankDataId: string;
}

export class CreateDiaristBankDataService {
  async execute(
    data: CreateDiaristBankRequest,
  ): Promise<CreateDiaristBankResponse> {
    const {
      diaristId,
      data: {
        account,
        accountDigit,
        accountName,
        agency,
        document,
        bankAccountType,
        ownerName,
        bankCode,
        ispb,
      },
    } = data;

    const diarist = await DiaristRepository.findOne({
      where: { id: diaristId },
      relations: ['banks'],
    });

    if (!diarist) {
      throw new DiaristNotFoundError();
    }

    if (diarist.banks.length === 2) {
      throw new BadRequestError();
    }

    const bankAlreadyExists = await DiaristBankDataRepository.findOne({
      where: {
        account,
        diarist: {
          id: diarist.id,
        },
      },
    });

    if (bankAlreadyExists) {
      throw new DiaristBankDataAlreadyExistsError();
    }

    const bankData = await DiaristBankDataRepository.create({
      account,
      account_digit: accountDigit,
      account_name: accountName,
      agency,
      document,
      bank_account_type: bankAccountType,
      owner_name: ownerName,
      bank_code: bankCode,
      ispb,
      diarist: {
        id: diarist.id,
      },
    }).save();

    diarist.banks.push(bankData);

    await diarist.save();

    return {
      bankDataId: bankData.id,
    };
  }
}
