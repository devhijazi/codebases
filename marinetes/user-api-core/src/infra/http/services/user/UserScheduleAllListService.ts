import {
  UserRepository,
  ScheduleRepository,
  DiaristRepository,
} from '@marinetesio/database/typeorm/mysql';
import { RegisterNotFoundError } from '@marinetesio/errors';
import { Schedule } from '@marinetesio/types/model';

export class UserScheduleAllListService implements Service {
  async execute(userId: string): Promise<Schedule[]> {
    const user = await UserRepository.findOne(userId, {
      select: ['id'],
    });

    if (!user) {
      throw new RegisterNotFoundError();
    }

    const schedules = await ScheduleRepository.find({
      where: { user_id: userId },
      relations: ['services'],
      order: {
        created_at: 'DESC',
      },
    });

    const allScheduels = <any>await Promise.all(
      schedules.map(async schedule => {
        const diarist = await DiaristRepository.findOne({
          where: { id: schedule.diarist_id },
        });

        return { ...schedule, payment: null, diarist };
      }),
    );

    return allScheduels;
  }
}
