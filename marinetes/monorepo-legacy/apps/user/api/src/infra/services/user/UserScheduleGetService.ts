import { UserRepository, ScheduleRepository } from '@marinetes/database';
import { RegisterNotFoundError } from '@marinetes/errors';
import type { ScheduleDocument } from '@marinetes/types/dtos/user/api';
import { instanceToPlain } from 'class-transformer';

export class UserScheduleGetService implements Service {
  async execute(userId: string, scheduleId: string): Promise<ScheduleDocument> {
    const user = await UserRepository.findOne(userId, {
      select: ['id'],
    });

    if (!user) {
      throw new RegisterNotFoundError();
    }

    const schedule = await ScheduleRepository.createQueryBuilder('schedule')
      .leftJoinAndSelect('schedule.services', 'service')
      .where({ id: scheduleId })
      .select([
        'schedule.id',
        'schedule.date',
        'schedule.end_date',
        'schedule.price',
        'schedule.user_id',
        'schedule.diarist_id',
        'schedule.second_diarist_id',
        'schedule.estimated_time_in_hours',
        'schedule.verification_code',
        'schedule.confirmation_code',
        'schedule.verified',
        'schedule.confirmed',
        'schedule.going_to_local',
        'schedule.status',
        'schedule.address',
        'schedule.payment',
        'service.id',
        'service.title',
        'service.icon',
      ])
      .getOne();

    if (!schedule) {
      throw new RegisterNotFoundError();
    }

    return instanceToPlain(schedule) as ScheduleDocument;
  }
}
