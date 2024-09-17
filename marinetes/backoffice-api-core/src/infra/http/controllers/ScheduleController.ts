import { Router } from 'express';

import { ControllerBase } from '@/core/infra/http/bases/ControllerBase';
import { AuthenticationMiddleware } from '@/infra/http/middlewares/AuthenticationMiddleware';
import { ScheduleListService } from '@/infra/http/services/schedule/ScheduleListService';
import { PaginationValidation } from '@/infra/http/validations/mixin/PaginationValidation';

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
