import {
  UserPaymentRepository,
  UserRepository,
  UserWalletRepository,
} from '@marinetesio/database/typeorm/mysql';
import { Str } from '@supercharge/strings';

import { Service } from '@/core/infra/http/Service';
import { mailerProducer, mailerTopics } from '@/infra/kafka';
import { hasConnectionByEntityId } from '@/infra/websocket/utils/connection';
import { Events } from '@/infra/websocket/utils/constants';
import { emitToEntity } from '@/infra/websocket/utils/event';

export interface PaymentReceivedServiceRequest {
  asaasPayment: {
    id: string;
    status: string;
  };
}

export class PaymentReceivedService implements Service {
  async execute(request: PaymentReceivedServiceRequest): Promise<void> {
    const { asaasPayment } = request;

    const payment = await UserPaymentRepository.findOne({
      where: { asaas_payment_id: asaasPayment.id },
      relations: ['user'],
    });

    if (payment) {
      const user = await UserRepository.findOne({
        where: { id: payment.user.id },
        relations: ['wallet'],
      });

      await UserPaymentRepository.update(payment.id, {
        status: asaasPayment.status.toLowerCase(),
      });

      if (user && user.wallet) {
        const firstName = Str(user.full_name)
          .title()
          .trim()
          .words()
          .slice(0, 2)[0];

        await UserWalletRepository.update(user.wallet.id, {
          balance_available: user.wallet.balance_available + payment.net_value,
        });

        const hasUserConnected = hasConnectionByEntityId(user.id);

        if (hasUserConnected) {
          emitToEntity(user.id, Events.paymentReceived, {
            user,
            payment: {
              ...payment,
              status: asaasPayment.status.toLowerCase(),
            },
          });
        }

        await mailerProducer.send({
          topic: mailerTopics.marinetesMailerIssueEmail,
          messages: [
            {
              value: JSON.stringify({
                subject: 'Pagamento Recebido',
                to: `${firstName} <${user.email}>`,
                template: {
                  name: 'payment-received',
                  group: 'user',
                  context: {
                    firstName,
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
