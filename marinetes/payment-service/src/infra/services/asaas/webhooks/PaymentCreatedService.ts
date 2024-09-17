import {
  UserPaymentRepository,
  UserRepository,
} from '@marinetesio/database/typeorm/mysql';
import { Str } from '@supercharge/strings';

import { Service } from '@/core/infra/http/Service';
import { mailerProducer, mailerTopics } from '@/infra/kafka';

export interface PaymentCreatedServiceRequest {
  asaasPayment: {
    id: string;
    status: string;
  };
}

export class PaymentCreatedService implements Service {
  async execute(request: PaymentCreatedServiceRequest): Promise<void> {
    const { asaasPayment } = request;

    const payment = await UserPaymentRepository.findOne({
      where: { asaas_payment_id: asaasPayment.id },
      relations: ['user'],
    });

    if (payment) {
      await UserPaymentRepository.update(payment.id, {
        status: asaasPayment.status.toLowerCase(),
      });

      const user = await UserRepository.findOne({
        where: { id: payment.user.id },
        relations: ['wallet'],
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
                subject: 'Pagamento Criado',
                to: `${firstName} <${user.email}>`,
                template: {
                  name: 'payment-created',
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
