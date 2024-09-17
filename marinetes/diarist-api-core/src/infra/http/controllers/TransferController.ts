import { Router } from 'express';

import { ControllerBase } from '@/core/infra/http/bases/ControllerBase';
import { CreateDiaristTransferService } from '@/infra/grpc/payment/services/transfers/CreateDiaristTransferService';
import { GetAllDiaristTransfersService } from '@/infra/grpc/payment/services/transfers/GetAllDiaristTransfersService';
import { GetDiaristTransferService } from '@/infra/grpc/payment/services/transfers/GetDiaristTransferService';
import { AuthenticationMiddleware } from '@/infra/http/middlewares/AuthenticationMiddleware';

import { CreateDiaristTransferValidation } from '../validations/transfer/CreateDiaristTransferValidation';

export class TransferController extends ControllerBase {
  constructor() {
    super('transfers', [AuthenticationMiddleware.make()]);
  }

  load(router: Router): void {
    router.post(
      '/',
      CreateDiaristTransferValidation.make(),
      async ({ manager }, res) => {
        const createDiaristTransfer = new CreateDiaristTransferService();

        const transfer = await createDiaristTransfer.execute({
          diaristId: manager.authenticated.id,
          ...manager.data,
        });

        res.json(transfer);
      },
    );

    router.get('/', async ({ manager }, res) => {
      const getAllDiaristTransfers = new GetAllDiaristTransfersService();

      const transfers = await getAllDiaristTransfers.execute({
        diaristId: manager.authenticated.id,
      });

      res.json(transfers);
    });

    router.get('/:transferId', async ({ params }, res) => {
      const getDiaristTransfer = new GetDiaristTransferService();

      const transfer = await getDiaristTransfer.execute({
        transferId: params.transferId,
      });

      res.json(transfer);
    });
  }
}
