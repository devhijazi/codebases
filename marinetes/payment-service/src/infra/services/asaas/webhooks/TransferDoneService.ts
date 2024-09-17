import {
  UserPaymentRepository,
  UserRepository,
  UserTransferRepository,
} from '@marinetesio/database/typeorm/mysql';
import { Str } from '@supercharge/strings';

import { Service } from '@/core/infra/http/Service';
import { mailerProducer, mailerTopics } from '@/infra/kafka';
import { formatCurrency } from '@/utils/formatCurrency';

export interface TransferDoneServiceRequest {
  asaasTransfer: {
    id: string;
    status: string;
  };
}

export class TransferDoneService implements Service {
  async execute(request: TransferDoneServiceRequest): Promise<void> {
    const { asaasTransfer } = request;

    const transfer = await UserTransferRepository.findOne({
      where: { asaas_transfer_id: asaasTransfer.id },
      relations: ['user'],
    });

    if (transfer) {
      await UserPaymentRepository.update(transfer.id, {
        status: 'done',
      });

      const user = await UserRepository.findOne({
        where: { id: transfer.user.id },
      });

      if (user) {
        const firstName = Str(user.full_name)
          .title()
          .trim()
          .words()
          .slice(0, 2)[0];

        await mailerProducer.send({
          topic: mailerTopics.marinetesMailerIssueEmail,
          messages: [
            {
              value: JSON.stringify({
                subject: 'Transferência Concluída',
                to: `${firstName} <${user.email}>`,
                template: {
                  name: 'transfer-done',
                  group: 'transfer',
                  context: {
                    firstName,
                    value: formatCurrency(transfer.net_value),
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
