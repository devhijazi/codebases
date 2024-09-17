import { Router } from 'express';

import { Controller, buildController } from '@/core/infra/http/Controller';
import { ok } from '@/core/infra/http/HttpResponse';
import { DiaristScheduleCanceledService } from '@/infra/services/schedules/diarist/DiaristScheduleCanceledService';
import { DiaristScheduleDonedService } from '@/infra/services/schedules/diarist/DiaristScheduleDonedService';
import { DiaristScheduleWaitingConfirmationService } from '@/infra/services/schedules/diarist/DiaristScheduleWaitingConfirmationService';
import { UserScheduleCanceledService } from '@/infra/services/schedules/user/UserScheduleCanceledService';
import { UserScheduleConfirmedService } from '@/infra/services/schedules/user/UserScheduleConfirmedService';
import { UserScheduleDeniedService } from '@/infra/services/schedules/user/UserScheduleDeniedService';
import { UserScheduleDonedService } from '@/infra/services/schedules/user/UserScheduleDonedService';

import { DiaristScheduleCanceledValidation } from '../validations/schedules/diarist/DiaristScheduleCanceledValidation';
import { DiaristScheduleDonedValidation } from '../validations/schedules/diarist/DiaristScheduleDonedValidation';
import { DiaristScheduleWaitingConfirmationValidation } from '../validations/schedules/diarist/DiaristScheduleWaitingConfirmationValidation';
import { UserScheduleCanceledValidation } from '../validations/schedules/user/UserScheduleCanceledValidation';
import { UserScheduleConfirmedValidation } from '../validations/schedules/user/UserScheduleConfirmedValidation';
import { UserScheduleDeniedValidation } from '../validations/schedules/user/UserScheduleDeniedValidation';
import { UserScheduleDonedValidation } from '../validations/schedules/user/UserScheduleDonedValidation';

class ScheduleControllerStructure extends Controller {
  constructor() {
    super('schedules');
  }

  execute(router: Router): void {
    const diaristRouter = this.newRouter();
    const userRouter = this.newRouter();

    router.use('/diarists', diaristRouter);

    diaristRouter.post(
      '/waiting-confirmation',
      DiaristScheduleWaitingConfirmationValidation.make(),
      async (request, response) => {
        const { diaristId, scheduleId } = request.manager.data;

        const diaristScheduleWaitingConfirmation =
          new DiaristScheduleWaitingConfirmationService();

        await diaristScheduleWaitingConfirmation.execute({
          diaristId,
          scheduleId,
        });

        ok(response);
      },
    );

    diaristRouter.post(
      '/done',
      DiaristScheduleDonedValidation.make(),
      async (request, response) => {
        const { diaristId, scheduleId } = request.manager.data;

        const diaristScheduleDoned = new DiaristScheduleDonedService();

        await diaristScheduleDoned.execute({ diaristId, scheduleId });

        ok(response);
      },
    );

    diaristRouter.post(
      '/cancel',
      DiaristScheduleCanceledValidation.make(),
      async (request, response) => {
        const { diaristId, scheduleId } = request.manager.data;

        const diaristScheduleCanceled = new DiaristScheduleCanceledService();

        await diaristScheduleCanceled.execute({ diaristId, scheduleId });

        ok(response);
      },
    );

    router.use('/users', userRouter);

    userRouter.post(
      '/confirm',
      UserScheduleConfirmedValidation.make(),
      async (request, response) => {
        const { userId, scheduleId } = request.manager.data;

        const userScheduleConfirmed = new UserScheduleConfirmedService();

        await userScheduleConfirmed.execute({ userId, scheduleId });

        ok(response);
      },
    );

    userRouter.post(
      '/deny',
      UserScheduleDeniedValidation.make(),
      async (request, response) => {
        const { userId, scheduleId } = request.manager.data;

        const UserScheduleDenied = new UserScheduleDeniedService();

        await UserScheduleDenied.execute({ userId, scheduleId });

        ok(response);
      },
    );

    userRouter.post(
      '/done',
      UserScheduleDonedValidation.make(),
      async (request, response) => {
        const { userId, scheduleId } = request.manager.data;

        const userScheduleDoned = new UserScheduleDonedService();

        await userScheduleDoned.execute({ userId, scheduleId });

        ok(response);
      },
    );

    userRouter.post(
      '/cancel',
      UserScheduleCanceledValidation.make(),
      async (request, response) => {
        const { userId, scheduleId } = request.manager.data;

        const userScheduleCanceled = new UserScheduleCanceledService();

        await userScheduleCanceled.execute({ userId, scheduleId });

        ok(response);
      },
    );
  }
}

export const ScheduleController = buildController(ScheduleControllerStructure);
