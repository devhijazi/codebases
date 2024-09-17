import { Router } from 'express';

import { PaginationValidation } from '@/http/validations/mixin/PaginationValidation';
import { ScheduleListService } from '@/infra/services/schedule/ScheduleListService';
import { ControllerBase } from '@bases/ControllerBase';
import { AuthenticationMiddleware } from '@http/middlewares/AuthenticationMiddleware';

export class ScheduleController extends ControllerBase {
  constructor() {
    super('schedules', [AuthenticationMiddleware.make()]);
  }

  load(router: Router): void {
    router.get('/', PaginationValidation.make(), async ({ manager }, res) => {
      const scheduleList = new ScheduleListService();
      const scheduleListDocument = await scheduleList.execute(manager.data);

      res.json(scheduleListDocument);
    });
  }
}
