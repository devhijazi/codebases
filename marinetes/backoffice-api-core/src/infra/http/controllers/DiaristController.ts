import { Router } from 'express';

import { avatarConfig } from '@/config/upload/avatar';
import { ControllerBase } from '@/core/infra/http/bases/ControllerBase';
import { AuthenticationMiddleware } from '@/infra/http/middlewares/AuthenticationMiddleware';
import { DiaristMiddleware } from '@/infra/http/middlewares/entities/DiaristMiddleware';
import { FileMiddleware } from '@/infra/http/middlewares/FileMiddleware';
import { DiaristAddressUpdateService } from '@/infra/http/services/diarist/DiaristAddressUpdateService';
import { DiaristApproveService } from '@/infra/http/services/diarist/DiaristApproveService';
import { DiaristAvatarUpdateService } from '@/infra/http/services/diarist/DiaristAvatarUpdateService';
import { DiaristCreateService } from '@/infra/http/services/diarist/DiaristCreateService';
// import { DiaristGetOnboardURLService } from '@/infra/services/diarist/DiaristGetOnboardURLService';
import { DiaristGetService } from '@/infra/http/services/diarist/DiaristGetService';
import { DiaristListService } from '@/infra/http/services/diarist/DiaristListService';
import { DiaristSendAttendEmailService } from '@/infra/http/services/diarist/DiaristSendAttendEmailService';
import { DiaristSendCompleteRegisterEmailService } from '@/infra/http/services/diarist/DiaristSendCompleteRegisterEmailService';
import { DiaristsInfoService } from '@/infra/http/services/diarist/DiaristsInfoService';
import { DiaristUpdateService } from '@/infra/http/services/diarist/DiaristUpdateService';
import { DiaristAddressUpdateValidation } from '@/infra/http/validations/diarist/DiaristAddressUpdateValidation';
import { DiaristApproveValidation } from '@/infra/http/validations/diarist/DiaristApproveValidation';
import { DiaristCreateValidation } from '@/infra/http/validations/diarist/DiaristCreateValidation';
import { DiaristListValidation } from '@/infra/http/validations/diarist/DiaristListValidation';
import { DiaristUpdateValidation } from '@/infra/http/validations/diarist/DiaristUpdateValidation';

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

    router.get('/info', async (_, res) => {
      const diaristInfo = new DiaristsInfoService();
      const diaristInfoDocument = await diaristInfo.execute();

      res.json(diaristInfoDocument);
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

    diaristGetRouter.get('/onboard-url', async (_, res) => {
      // const diaristGetOnboardURL = new DiaristGetOnboardURLService();
      // const onboardUrlData = await diaristGetOnboardURL.execute(
      //   manager.diarist.id,
      // );

      // const document = {
      //   url: onboardUrlData.url,
      // };

      // res.json(document);
      res.status(200).end();
    });

    diaristGetRouter.put(
      '/address',
      DiaristAddressUpdateValidation.make(),
      async ({ manager }, res) => {
        const diaristAdressUpdate = new DiaristAddressUpdateService();

        await diaristAdressUpdate.execute(manager.diarist.id, manager.data);

        res.status(200).end();
      },
    );

    diaristGetRouter.post(
      '/approve',
      DiaristApproveValidation.make(),
      async ({ manager }, res) => {
        const diaristApprove = new DiaristApproveService();

        await diaristApprove.execute(manager.diarist.id, manager.data);

        res.status(200).end();
      },
    );

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
