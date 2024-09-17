import { Router } from 'express';

import { ControllerBase } from '@/core/infra/http/bases/ControllerBase';
import { CreateUserTransferService } from '@/infra/grpc/payment/services/transfers/CreateUserTransferService';
import { GetAllUserTransfersService } from '@/infra/grpc/payment/services/transfers/GetAllUserTransfersService';
import { GetUserTransferService } from '@/infra/grpc/payment/services/transfers/GetUserTransferService';
import { AuthenticationMiddleware } from '@/infra/http/middlewares/AuthenticationMiddleware';

import { CreateUserTransferValidation } from '../validations/transfer/CreateUserTransferValidation';

export class TransferController extends ControllerBase {
  constructor() {
    super('transfers', [AuthenticationMiddleware.make()]);
  }

  load(router: Router): void {
    router.post(
      '/',
      CreateUserTransferValidation.make(),
      async ({ manager }, res) => {
        const createUserTransfer = new CreateUserTransferService();

        const transfer = await createUserTransfer.execute({
          userId: manager.authenticated.id,
          ...manager.data,
        });

        res.json(transfer);
      },
    );

    router.get('/', async ({ manager }, res) => {
      const getAllUserTransfers = new GetAllUserTransfersService();

      const transfers = await getAllUserTransfers.execute({
        userId: manager.authenticated.id,
      });

      res.json(transfers);
    });

    router.get('/:transferId', async ({ params }, res) => {
      const getUserTransfer = new GetUserTransferService();

      const transfer = await getUserTransfer.execute({
        transferId: params.transferId,
      });

      res.json(transfer);
    });
  }
}
