import {
  UserPixDataRepository,
  UserRepository,
  UserWalletRepository,
  UserTransferRepository,
} from '@marinetesio/database/typeorm/mysql';
import {
  BadRequestError,
  UserNotFoundError,
  UserPixKeyNotFoundError,
  InsuficientFundsError,
} from '@marinetesio/errors';
import {
  UserTransfer,
  UserTransferOperationType,
} from '@marinetesio/types/model/model';

import { asaas } from '@/infra/asaas';
import { convertDecimalToUnit, convertUnitToDecimal } from '@/utils/price';

export interface CreateUserTransferServiceRequest {
  userId: string;
  value: number;
  operationType: 'bank' | 'pix';
  pixDataId?: string;
}

export type CreateUserTransferServiceResponse = UserTransfer;

export class CreateUserTransferService {
  async execute(
    request: CreateUserTransferServiceRequest,
  ): Promise<CreateUserTransferServiceResponse> {
    const { userId, value, operationType, pixDataId } = request;

    const user = await UserRepository.findOne({
      where: { id: userId },
      relations: ['wallet', 'pixes'],
    });

    if (!user) {
      throw new UserNotFoundError();
    }

    if (!user.wallet) {
      throw new BadRequestError();
    }

    if (user.wallet.balance_available <= value) {
      throw new InsuficientFundsError();
    }

    switch (operationType) {
      case 'pix': {
        const pixData = await UserPixDataRepository.findOne({
          where: {
            id: pixDataId,
          },
          relations: ['user'],
        });

        if (!pixData || !user.pixes.some(pd => pd.id === pixDataId)) {
          throw new UserPixKeyNotFoundError();
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
          description: `Transfêrencia via pix para o usuário: ${user.full_name}`,
          pixAddressKey:
            pixData.key_type === 'phone' ? `+55${pixData.key}` : pixData.key,
          pixAddressKeyType: keyTypes[pixData.key_type],
        });

        const transfer = await UserTransferRepository.create({
          asaas_transfer_id: asaasTransfer.id,
          total_value: convertDecimalToUnit(asaasTransfer.value),
          net_value: convertDecimalToUnit(asaasTransfer.netValue),
          trasnsfer_fee: convertDecimalToUnit(asaasTransfer.transferFee),
          operation_type:
            asaasTransfer.operationType.toLowerCase() as UserTransferOperationType,
          status: asaasTransfer.status.toLowerCase(),
          pix_data_id: pixData.id,
          user: {
            id: user.id,
          },
        }).save();

        await UserWalletRepository.update(user.wallet.id, {
          balance_available: user.wallet.balance_available - value,
        });

        return transfer;
      }

      default: {
        throw new BadRequestError();
      }
    }
  }
}
