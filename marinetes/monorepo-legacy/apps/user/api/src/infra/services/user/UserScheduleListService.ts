import { UserRepository, ScheduleRepository } from '@marinetes/database';
import { RegisterNotFoundError } from '@marinetes/errors';
import { PaginationHelper } from '@marinetes/pagination-helper';
import type {
  UserScheduleListData,
  ScheduleListDocument,
  ScheduleDocument,
} from '@marinetes/types/dtos/user/api';
import { ScheduleStatus } from '@marinetes/types/model';
import { instanceToPlain } from 'class-transformer';

const status: ScheduleStatus[] = ['canceled', 'done', 'pending', 'working'];

export class UserScheduleListService implements Service {
  async execute(
    userId: string,
    { search, page = 1, itemsPerPage = 10 }: UserScheduleListData,
  ): Promise<ScheduleListDocument> {
    const user = await UserRepository.findOne(userId, {
      select: ['id'],
    });

    if (!user) {
      throw new RegisterNotFoundError();
    }

    const { items, ...paginatedData } = await PaginationHelper.paginate(
      ScheduleRepository.getRepository(),
      {
        page,
        itemsPerPage,
        alias: 'schedule',
        orderByDate: true,
        fag: query => {
          if (status.includes(search as any)) {
            query.andWhere({ status: search });
          }

          query
            .where({ user_id: user.id })
            .leftJoinAndSelect('schedule.services', 'service')
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
              'schedule.created_at',
            ]);
        },
      },
    );

    return {
      ...paginatedData,
      items: items.map(obj => instanceToPlain(obj) as ScheduleDocument),
    };
  }
}
