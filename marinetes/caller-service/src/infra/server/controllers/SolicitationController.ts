import { Router } from 'express';

import { Controller, buildController } from '@/core/infra/http/Controller';
import { ok } from '@/core/infra/http/HttpResponse';
import { SolicitationAcceptedService } from '@/infra/services/solicitations/SolicitationAcceptedService';
import { SolicitationDeniedService } from '@/infra/services/solicitations/SolicitationDeniedService';

import { SolicitationAcceptedValidation } from '../validations/solicitations/SolicitationAcceptedValidation';
import { SolicitationDeniedValidation } from '../validations/solicitations/SolicitationDeniedValidation';

class SolicitationControllerStructure extends Controller {
  constructor() {
    super('solicitations');
  }

  execute(router: Router): void {
    router.post(
      '/accept',
      SolicitationAcceptedValidation.make(),
      async (request, response) => {
        const { diaristId } = request.manager.data;

        const solicitationAccepted = new SolicitationAcceptedService();

        await solicitationAccepted.execute({ diaristId });

        ok(response);
      },
    );

    router.post(
      '/deny',
      SolicitationDeniedValidation.make(),
      async (request, response) => {
        const { diaristId } = request.manager.data;

        const solicitationDenied = new SolicitationDeniedService();

        await solicitationDenied.execute({ diaristId });

        ok(response);
      },
    );
  }
}

export const SolicitationController = buildController(
  SolicitationControllerStructure,
);
