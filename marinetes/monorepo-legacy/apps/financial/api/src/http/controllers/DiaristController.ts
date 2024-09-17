import { Router } from 'express';

import { avatarConfig } from '@/config/upload/avatar';
import { DiaristMiddleware } from '@/http/middlewares/entities/DiaristMiddleware';
import { FileMiddleware } from '@/http/middlewares/FileMiddleware';
import { DiaristAddressUpdateValidation } from '@/http/validations/diarist/DiaristAddressUpdateValidation';
import { DiaristListValidation } from '@/http/validations/diarist/DiaristListValidation';
import { DiaristUpdateValidation } from '@/http/validations/diarist/DiaristUpdateValidation';
import { DiaristAddressUpdateService } from '@/infra/services/diarist/DiaristAddressUpdateService';
import { DiaristApproveService } from '@/infra/services/diarist/DiaristApproveService';
import { DiaristAvatarUpdateService } from '@/infra/services/diarist/DiaristAvatarUpdateService';
import { DiaristGetService } from '@/infra/services/diarist/DiaristGetService';
import { DiaristListService } from '@/infra/services/diarist/DiaristListService';
import { DiaristSendAttendEmailService } from '@/infra/services/diarist/DiaristSendAttendEmailService';
import { DiaristSendCompleteRegisterEmailService } from '@/infra/services/diarist/DiaristSendCompleteRegisterEmailService';
import { DiaristUpdateService } from '@/infra/services/diarist/DiaristUpdateService';
import { ControllerBase } from '@bases/ControllerBase';
import { AuthenticationMiddleware } from '@http/middlewares/AuthenticationMiddleware';
import { DiaristCreateValidation } from '@http/validations/diarist/DiaristCreateValidation';
import { DiaristCreateService } from '@infra/services/diarist/DiaristCreateService';

export class DiaristController extends ControllerBase {
  constructor() {
    super('diarists', [AuthenticationMiddleware.make()]);
  }

  load(router: Router): void {
    const diaristGetRouter = this.newRouter();

    router.post(
      '/',
      DiaristCreateValidation.make(),
      async ({ manager }, res) => {
        const createDiarist = new DiaristCreateService();
        const diaristCreateDocument = await createDiarist.execute(manager.data);

        res.json(diaristCreateDocument);
      },
    );

    router.get('/', DiaristListValidation.make(), async ({ manager }, res) => {
      const diaristList = new DiaristListService();
      const diaristListDocument = await diaristList.execute(manager.data);

      res.json(diaristListDocument);
    });

    router.use('/:diaristId', DiaristMiddleware.make(), diaristGetRouter);

    diaristGetRouter.get('/', async ({ manager }, res) => {
      const diaristGet = new DiaristGetService();
      const diaristDocument = await diaristGet.execute(manager.diarist.id);

      res.json(diaristDocument);
    });

    diaristGetRouter.put(
      '/',
      DiaristUpdateValidation.make(),
      async ({ manager }, res) => {
        const diaristUpdate = new DiaristUpdateService();

        await diaristUpdate.execute(manager.diarist.id, manager.data);

        res.status(200).end();
      },
    );

    diaristGetRouter.post('/send-attend-email', async ({ manager }, res) => {
      const diaristSendAttendEmail = new DiaristSendAttendEmailService();

      await diaristSendAttendEmail.execute(manager.diarist.id);

      res.status(200).end();
    });

    diaristGetRouter.post(
      '/send-complete-register-email',
      async ({ manager }, res) => {
        const diaristSendCompleteRegisterEmail =
          new DiaristSendCompleteRegisterEmailService();

        await diaristSendCompleteRegisterEmail.execute(manager.diarist.id);

        res.status(200).end();
      },
    );

    diaristGetRouter.put(
      '/address',
      DiaristAddressUpdateValidation.make(),
      async ({ manager }, res) => {
        const diaristAdressUpdate = new DiaristAddressUpdateService();

        await diaristAdressUpdate.execute(manager.diarist.id, manager.data);

        res.status(200).end();
      },
    );

    diaristGetRouter.post('/approve', async ({ manager }, res) => {
      const diaristApprove = new DiaristApproveService();

      await diaristApprove.execute(manager.diarist.id);

      res.status(200).end();
    });

    diaristGetRouter.patch(
      '/avatar',
      FileMiddleware.make({
        config: avatarConfig,
        handler: upload => upload.single('file'),
      }),
      async ({ file, manager }, res) => {
        const diaristAvatarUpdate = new DiaristAvatarUpdateService();

        await diaristAvatarUpdate.execute(manager.diarist.id, file);

        res.status(200).end();
      },
    );
  }
}
