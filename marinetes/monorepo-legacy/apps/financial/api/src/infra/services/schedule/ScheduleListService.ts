import { ScheduleRepository } from '@marinetes/database';
import { PaginationHelper } from '@marinetes/pagination-helper';
import type {
  ScheduleListData,
  ScheduleListDocument,
} from '@marinetes/types/dtos/financial/api';
import type { ScheduleStatus } from '@marinetes/types/model';

const status: ScheduleStatus[] = ['canceled', 'done', 'pending', 'working'];

export class ScheduleListService implements Service {
  async execute({
    search,
    page = 1,
    itemsPerPage = 10,
  }: ScheduleListData): Promise<ScheduleListDocument> {
    const paginatedData = await PaginationHelper.paginate(
      ScheduleRepository.getRepository(),
      {
        page,
        itemsPerPage,
        alias: 'schedule',
        fag: query => {
          if (status.includes(<any>search)) {
            query.andWhere({ status: search });
          }

          query
            // .leftJoinAndSelect('schedule.user_id', 'user')
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
              // 'user',
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
