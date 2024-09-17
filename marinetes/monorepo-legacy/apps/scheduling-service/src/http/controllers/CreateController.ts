import type { CreateCallHttpData } from '@marinetes/types/dtos/scheduling-service';
import { Router } from 'express';

import { UserAuthenticationMiddleware } from '@/http/middlewares/UserAuthenticationMiddleware';
import { CallCreateValidation } from '@/http/validations/CallCreateValidation';
import { CallCreateService } from '@/infra/services/CallCreateService';
import { ControllerBase } from '@bases/ControllerBase';

export class CreateController extends ControllerBase {
  constructor() {
    super('create', [UserAuthenticationMiddleware.make()]);
  }

  load(router: Router): void {
    router.post('/', CallCreateValidation.make(), async ({ manager }, res) => {
      const callCreate = new CallCreateService();
      const callId = await callCreate.execute(
        manager.authenticatedUser.id,
        manager.data,
      );

      const data: CreateCallHttpData = {
        callId,
      };

      res.json(data);
    });
  }
}
