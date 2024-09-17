import {
  DiaristPixDataRepository,
  DiaristRepository,
  DiaristWalletRepository,
  DiaristTransferRepository,
} from '@marinetesio/database/typeorm/mysql';
import {
  BadRequestError,
  DiaristNotFoundError,
  DiaristPixKeyNotFoundError,
  InsuficientFundsError,
} from '@marinetesio/errors';
import {
  DiaristTransfer,
  DiaristTransferOperationType,
} from '@marinetesio/types/model/model';

import { asaas } from '@/infra/asaas';
import { convertDecimalToUnit, convertUnitToDecimal } from '@/utils/price';

export interface CreateDiaristTransferServiceRequest {
  diaristId: string;
  value: number;
  operationType: 'bank' | 'pix';
  bankDataId?: string;
  pixDataId?: string;
}

export type CreateDiaristTransferServiceResponse = DiaristTransfer;

export class CreateDiaristTransferService {
  async execute(
    request: CreateDiaristTransferServiceRequest,
  ): Promise<CreateDiaristTransferServiceResponse> {
    const { diaristId, value, operationType, pixDataId } = request;

    const diarist = await DiaristRepository.findOne({
      where: { id: diaristId },
      relations: ['wallet', 'banks', 'pixes'],
    });

    if (!diarist) {
      throw new DiaristNotFoundError();
    }

    if (!diarist.wallet) {
      throw new BadRequestError();
    }

    if (diarist.wallet.balance <= value) {
      throw new InsuficientFundsError();
    }

    switch (operationType) {
      // case 'bank': {
      //   if (!bankDataId) {
      //     throw new BadRequestError();
      //   }

      //   const bankData = await DiaristBankDataRepository.findOne({
      //     where: {
      //       id: bankDataId,
      //     },
      //     relations: ['diarist'],
      //   });

      //   if (!bankData || diarist.banks.some(bank => bank.id !== bankDataId)) {
      //     throw new DiaristBankDataNotFoundError();
      //   }

      //   const asaasTransfer = await asaas.resources.transfers.transfer({
      //     value: convertUnitToDecimal(value),
      //     description: `Transfêrencia bancária para a diarista: ${diarist.full_name}`,
      //     bankAccount: {
      //       ownerName: bankData.owner_name,
      //       cpfCnpj: bankData.document,
      //       account: bankData.account,
      //       accountDigit: bankData.account_digit,
      //       accountName: bankData.account_name,
      //       agency: bankData.agency,
      //       ispb: bankData.ispb ?? '',
      //       bank: {
      //         code: bankData.bank_code ?? '',
      //       },
      //       bankAccountType:
      //         bankData.bank_account_type === 'savings_account'
      //           ? 'CONTA_POUPANCA'
      //           : 'CONTA_CORRENTE',
      //     },
      //   });

      //   const transfer = await DiaristTransferRepository.create({
      //     asaas_transfer_id: asaasTransfer.id,
      //     total_value: convertDecimalToUnit(asaasTransfer.value),
      //     net_value: convertDecimalToUnit(asaasTransfer.netValue),
      //     trasnsfer_fee: convertDecimalToUnit(asaasTransfer.transferFee),
      //     operation_type:
      //       asaasTransfer.operationType.toLowerCase() as DiaristTransferOperationType,
      //     status: asaasTransfer.status.toLowerCase(),
      //     bank_data_id: bankData.id,
      //     diarist: {
      //       id: diarist.id,
      //     },
      //   }).save();

      //   await DiaristWalletRepository.update(diarist.wallet.id, {
      //     balance: diarist.wallet.balance - value,
      //   });

      //   return transfer;
      // }

      case 'pix': {
        if (!pixDataId) {
          throw new BadRequestError();
        }

        const pixData = await DiaristPixDataRepository.findOne({
          where: {
            id: pixDataId,
          },
          relations: ['diarist'],
        });

        if (!pixData || !diarist.pixes.some(pix => pix.id === pixDataId)) {
          throw new DiaristPixKeyNotFoundError();
        }

        const keyTypes = {
          cpf: 'CPF',
          cnpj: 'CNPJ',
          email: 'EMAIL',
          phone: 'PHONE',
          random_key: 'EVP',
        } as const;

        const asaasTransfer = await asaas.resources.transfers.transfer({
          value: convertUnitToDecimal(value),
          operationType: 'PIX',
          description: `Transfêrencia via pix para a diarista: ${diarist.full_name}`,
          pixAddressKey:
            pixData.key_type === 'phone' ? `+55${pixData.key}` : pixData.key,
          pixAddressKeyType: keyTypes[pixData.key_type],
        });

        const transfer = await DiaristTransferRepository.create({
          asaas_transfer_id: asaasTransfer.id,
          total_value: convertDecimalToUnit(asaasTransfer.value),
          net_value: convertDecimalToUnit(asaasTransfer.netValue),
          trasnsfer_fee: convertDecimalToUnit(asaasTransfer.transferFee),
          operation_type:
            asaasTransfer.operationType.toLowerCase() as DiaristTransferOperationType,
          status: asaasTransfer.status.toLowerCase(),
          pix_data_id: pixData.id,
          diarist: {
            id: diarist.id,
          },
        }).save();

        await DiaristWalletRepository.update(diarist.wallet.id, {
          balance: diarist.wallet.balance - value,
        });

        return transfer;
      }

      default: {
        throw new BadRequestError();
      }
    }
  }
}
