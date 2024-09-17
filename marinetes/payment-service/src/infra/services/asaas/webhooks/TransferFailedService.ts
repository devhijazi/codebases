import {
  UserPaymentRepository,
  UserRepository,
  UserTransferRepository,
  UserWalletRepository,
} from '@marinetesio/database/typeorm/mysql';
import { Str } from '@supercharge/strings';

import { Service } from '@/core/infra/http/Service';
import { mailerProducer, mailerTopics } from '@/infra/kafka';
import { formatCurrency } from '@/utils/formatCurrency';

export interface TransferFailedServiceRequest {
  asaasTransfer: {
    id: string;
    status: string;
    failReason: string;
  };
}

export class TransferFailedService implements Service {
  async execute(request: TransferFailedServiceRequest): Promise<void> {
    const { asaasTransfer } = request;

    const transfer = await UserTransferRepository.findOne({
      where: { asaas_transfer_id: asaasTransfer.id },
      relations: ['user'],
    });

    if (transfer) {
      await UserPaymentRepository.update(transfer.id, {
        status: 'failed',
      });

      const user = await UserRepository.findOne({
        where: { id: transfer.user.id },
        relations: ['wallet'],
      });

      if (user && user.wallet) {
        const firstName = Str(user.full_name)
          .title()
          .trim()
          .words()
          .slice(0, 2)[0];

        await UserWalletRepository.update(user.wallet.id, {
          balance_available: user.wallet.balance_available + transfer.net_value,
        });

        await mailerProducer.send({
          topic: mailerTopics.marinetesMailerIssueEmail,
          messages: [
            {
              value: JSON.stringify({
                subject: 'Transferência Suspensa',
                to: `${firstName} <${user.email}>`,
                template: {
                  name: 'transfer-failed',
                  group: 'transfer',
                  context: {
                    firstName,
                    value: formatCurrency(transfer.net_value),
                    reason: asaasTransfer.failReason,
                  },
                },
              }),
            },
          ],
        });
      }
    }
  }
}
