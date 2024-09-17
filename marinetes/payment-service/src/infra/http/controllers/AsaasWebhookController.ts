import { Router } from 'express';

import { Controller, buildController } from '@/core/infra/http/Controller';
import { ok } from '@/core/infra/http/HttpResponse';
import { PaymentCreatedService } from '@/infra/services/asaas/webhooks/PaymentCreatedService';
import { PaymentDeletedService } from '@/infra/services/asaas/webhooks/PaymentDeletedService';
import { PaymentOverdueService } from '@/infra/services/asaas/webhooks/PaymentOverdueService';
import { PaymentReceivedService } from '@/infra/services/asaas/webhooks/PaymentReceivedService';
import { TransferCreatedService } from '@/infra/services/asaas/webhooks/TransferCreatedService';
import { TransferDoneService } from '@/infra/services/asaas/webhooks/TransferDoneService';
import { TransferFailedService } from '@/infra/services/asaas/webhooks/TransferFailedService';

class AsaasWebhookControllerStructure extends Controller {
  constructor() {
    super('asaas/webhook');
  }

  execute(router: Router): void {
    router.post('/charges', async (request, response) => {
      const { body } = request;

      switch (body.event) {
        case 'PAYMENT_CREATED': {
          const paymentCreated = new PaymentCreatedService();

          await paymentCreated.execute({
            asaasPayment: body.payment,
          });

          ok(response);

          break;
        }

        case 'PAYMENT_RECEIVED': {
          const paymentReceived = new PaymentReceivedService();

          await paymentReceived.execute({
            asaasPayment: body.payment,
          });

          ok(response);

          break;
        }

        case 'PAYMENT_OVERDUE': {
          const paymentOverdue = new PaymentOverdueService();

          await paymentOverdue.execute({
            asaasPayment: body.payment,
          });

          ok(response);

          break;
        }

        case 'PAYMENT_DELETED': {
          const paymentDeleted = new PaymentDeletedService();

          await paymentDeleted.execute({
            asaasPayment: body.payment,
          });

          ok(response);

          break;
        }

        default: {
          ok(response);

          break;
        }
      }
    });

    router.post('/transfers', async (request, response) => {
      const { body } = request;

      switch (body.event) {
        case 'TRANSFER_CREATED': {
          const transferCreated = new TransferCreatedService();

          await transferCreated.execute({
            asaasTransfer: body.transfer,
          });

          ok(response);

          break;
        }

        case 'TRANSFER_DONE': {
          const transferDone = new TransferDoneService();

          await transferDone.execute({
            asaasTransfer: body.transfer,
          });

          ok(response);

          break;
        }

        case 'TRANSFER_FAILED': {
          const transferFailed = new TransferFailedService();

          await transferFailed.execute({
            asaasTransfer: body.transfer,
          });

          ok(response);

          break;
        }

        default: {
          ok(response);

          break;
        }
      }
    });
  }
}

export const AsaasWebhookController = buildController(
  AsaasWebhookControllerStructure,
);
