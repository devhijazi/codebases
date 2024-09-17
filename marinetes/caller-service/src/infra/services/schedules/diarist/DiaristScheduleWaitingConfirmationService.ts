import {
  DiaristRepository,
  ScheduleRepository,
  UserRepository,
} from '@marinetesio/database/typeorm/mysql';
import {
  DiaristNotFoundError,
  ScheduleCanceledError,
  ScheduleDonedError,
  ScheduleNotFoundError,
  ScheduleWorkingError,
} from '@marinetesio/errors';

import { Service } from '@/core/infra/Service';
import { hasConnectionByEntityId } from '@/infra/websocket/utils/connection';
import { Events } from '@/infra/websocket/utils/constants';
import { emitToEntity } from '@/infra/websocket/utils/event';

export interface DiaristScheduleWaitingConfirmationServiceRequest {
  diaristId: string;
  scheduleId: string;
}

export class DiaristScheduleWaitingConfirmationService implements Service {
  async execute(
    request: DiaristScheduleWaitingConfirmationServiceRequest,
  ): Promise<void> {
    const { scheduleId, diaristId } = request;

    const schedule = await ScheduleRepository.findOne({
      where: { id: scheduleId },
    });

    if (!schedule) {
      throw new ScheduleNotFoundError();
    }

    if (schedule.status === 'working') {
      throw new ScheduleWorkingError();
    }

    if (schedule.status === 'canceled') {
      throw new ScheduleCanceledError();
    }

    if (schedule.status === 'done') {
      throw new ScheduleDonedError();
    }

    const diarist = await DiaristRepository.findOne({
      where: { id: diaristId },
    });

    if (!diarist) {
      throw new DiaristNotFoundError();
    }

    const user = await UserRepository.findOne({
      where: { id: schedule.user_id },
    });

    if (!user) {
      throw new DiaristNotFoundError();
    }

    const hasUserConnected = hasConnectionByEntityId(user.id);

    if (hasUserConnected) {
      emitToEntity(user.id, Events.scheduleWaitingConfirmation, {
        schedule,
        diarist,
        user,
      });
    }
  }
}
