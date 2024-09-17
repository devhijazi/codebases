import { DiaristRepository, ScheduleRepository } from '@marinetes/database';
import { RegisterNotFoundError } from '@marinetes/errors';
import { PaginationHelper } from '@marinetes/pagination-helper';
import type {
  DiaristScheduleListData,
  DiaristScheduleListDocument,
} from '@marinetes/types/dtos/diarist/api';
import type { ScheduleStatus } from '@marinetes/types/model';

const status: ScheduleStatus[] = ['canceled', 'done', 'pending', 'working'];

export class DiaristScheduleListService implements Service {
  async execute(
    diaristId: string,
    { search, page = 1, itemsPerPage = 10 }: DiaristScheduleListData,
  ): Promise<DiaristScheduleListDocument> {
    const diarist = await DiaristRepository.findOne(diaristId, {
      select: ['id'],
    });

    if (!diarist) {
      throw new RegisterNotFoundError();
    }

    const paginatedData = await PaginationHelper.paginate(
      ScheduleRepository.getRepository(),
      {
        page,
        itemsPerPage,
        alias: 'schedule',
        fag: query => {
          if (status.includes(search as any)) {
            query.andWhere({ status: search });
          }

          query
            .where({ diarist_id: diarist.id })
            .leftJoinAndSelect('schedule.services', 'service')
            .select([
              'schedule.id',
              'schedule.status',
              'schedule.date',
              'schedule.end_date',
              'schedule.price',
              'schedule.estimated_time_in_hours',
              'schedule.verified',
              'schedule.confirmed',
              'schedule.going_to_local',
              'schedule.user_id',
              'schedule.diarist_id',
              'schedule.second_diarist_id',
              'schedule.address',
              'service.id',
              'service.title',
              'service.icon',
              'schedule.created_at',
            ]);
        },
      },
    );

    return paginatedData;
  }
}
