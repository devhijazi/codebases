import {
  ScheduleRepository,
  DiaristRepository,
  UserRepository,
} from '@marinetesio/database/typeorm/mysql';
import { RegisterNotFoundError } from '@marinetesio/errors';
import { Schedule } from '@marinetesio/types/model';

export class DiaristScheduleAllListService implements Service {
  async execute(diaristId: string): Promise<Schedule[]> {
    const hasDiarist = await DiaristRepository.findOne(diaristId, {
      select: ['id'],
    });

    if (!hasDiarist) {
      throw new RegisterNotFoundError();
    }

    const schedules = await ScheduleRepository.find({
      where: { diarist_id: diaristId },
      relations: ['services'],
      order: {
        created_at: 'DESC',
      },
    });

    const allScheduels = <any>await Promise.all(
      schedules.map(async schedule => {
        const user = await UserRepository.findOne({
          where: { id: schedule.user_id },
        });

        return { ...schedule, payment: null, user };
      }),
    );

    return allScheduels;
  }
}
