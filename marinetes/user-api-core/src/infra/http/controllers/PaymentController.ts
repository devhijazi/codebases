import { Router } from 'express';

import { ControllerBase } from '@/core/infra/http/bases/ControllerBase';
import { CreateUserPaymentService } from '@/infra/grpc/payment/services/payments/CreateUserPaymentService';
import { GetAllUserPaymentsService } from '@/infra/grpc/payment/services/payments/GetAllUserPaymentsService';
import { GetUserPaymentService } from '@/infra/grpc/payment/services/payments/GetUserPaymentService';

import { AuthenticationMiddleware } from '../middlewares/AuthenticationMiddleware';
import { CreatePaymentValidation } from '../validations/payment/CreatePaymentValidation';

export class PaymentController extends ControllerBase {
  constructor() {
    super('payments', [AuthenticationMiddleware.make()]);
  }

  load(router: Router): void {
    router.post(
      '/',
      CreatePaymentValidation.make(),
      async ({ manager }, res) => {
        const createUserPayment = new CreateUserPaymentService();

        const payment = await createUserPayment.execute({
          userId: manager.authenticated.id,
          ...manager.data,
        });

        res.json(payment);
      },
    );

    router.get('/', async ({ manager }, res) => {
      const getAllUserPayments = new GetAllUserPaymentsService();

      const payments = await getAllUserPayments.execute({
        userId: manager.authenticated.id,
      });

      res.json(payments);
    });

    router.get('/:paymentId', async ({ params }, res) => {
      const getUserPayment = new GetUserPaymentService();

      const payments = await getUserPayment.execute({
        paymentId: params.paymentId,
      });

      res.json(payments);
    });
  }
}
