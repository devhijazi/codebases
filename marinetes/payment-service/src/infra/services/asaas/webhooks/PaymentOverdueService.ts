import { UserPaymentRepository } from '@marinetesio/database/typeorm/mysql';

import { Service } from '@/core/infra/http/Service';

export interface PaymentOverdueServiceRequest {
  asaasPayment: {
    id: string;
    status: string;
  };
}

export class PaymentOverdueService implements Service {
  async execute(request: PaymentOverdueServiceRequest): Promise<void> {
    const { asaasPayment } = request;

    const payment = await UserPaymentRepository.findOne({
      where: { asaas_payment_id: asaasPayment.id },
    });

    if (payment) {
      await UserPaymentRepository.update(payment.id, {
        status: asaasPayment.status.toLowerCase(),
      });
    }
  }
}
