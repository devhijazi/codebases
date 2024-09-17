import { DiaristRepository, ScheduleRepository } from '@marinetes/database';
import {
  DiaristIsAlreadyInOneServiceError,
  CallNotExistsError,
  RegisterNotFoundError,
  ForbiddenError,
} from '@marinetes/errors';
import { CallRepository } from '@marinetes/firebase';
import type { AcceptData } from '@marinetes/types/dtos/scheduling-service';
import type { Call } from '@marinetes/types/model/firebase';
import { Not, Equal } from 'typeorm';

export class AcceptService implements Service {
  #callRepository = new CallRepository();

  async execute(diaristId: string, data: AcceptData): Promise<void> {
    const diarist = await DiaristRepository.createQueryBuilder('diarist')
      .where({ id: diaristId })
      .innerJoinAndSelect('diarist.status', 'status')
      .select(['diarist.id', 'diarist.accepting_services', 'status.type'])
      .getOne();

    if (!diarist) {
      throw new RegisterNotFoundError();
    }

    if (!diarist.accepting_services || diarist.status.type !== 'active') {
      throw new ForbiddenError();
    }

    const diaristHasService = await ScheduleRepository.createQueryBuilder(
      'schedule',
    )
      .andWhere({ diarist_id: diarist.id })
      .andWhere([{ status: Not(Equal('canceled')) }])
      .andWhere([{ status: Not(Equal('done')) }])
      .getOne();

    if (diaristHasService) {
      throw new DiaristIsAlreadyInOneServiceError();
    }

    const { callId } = data;

    const call = await this.#callRepository.getDocument(callId);

    if (!call.exists) {
      throw new CallNotExistsError();
    }

    const hasAccepted = call.data()?.acceptedDiaristId;

    if (hasAccepted) {
      throw new ForbiddenError();
    }

    await this.#callRepository.update(call.id, {
      ...(call.data() as Call),
      acceptedDiaristId: diarist.id,
    });
  }
}
