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

export interface UserScheduleDeniedServiceRequest {
  userId: string;
  scheduleId: string;
}

export class UserScheduleDeniedService implements Service {
  async execute(request: UserScheduleDeniedServiceRequest): Promise<void> {
    const { scheduleId, userId } = request;

    const schedule = await ScheduleRepository.findOne({
      where: { id: scheduleId },
    });

    if (!schedule) {
      throw new ScheduleNotFoundError();
    }

    if (schedule.status === 'working') {
      throw new ScheduleWorkingError();
    }

    if (schedule.status === 'done') {
      throw new ScheduleDonedError();
    }

    if (schedule.status === 'canceled') {
      throw new ScheduleCanceledError();
    }

    const diarist = await DiaristRepository.findOne({
      where: { id: schedule.diarist_id },
    });

    if (!diarist) {
      throw new DiaristNotFoundError();
    }

    const user = await UserRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new DiaristNotFoundError();
    }

    const hasDiaristConnected = hasConnectionByEntityId(diarist.id);

    if (hasDiaristConnected) {
      emitToEntity(diarist.id, Events.scheduleDenied, {
        schedule,
        diarist,
        user,
      });
    }
  }
}
