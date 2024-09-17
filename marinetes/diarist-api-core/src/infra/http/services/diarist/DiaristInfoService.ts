import type { DiaristInfoDocument } from '@marinetesio/types/dtos/diarist/api';

import {
  DiaristRepository,
  ScheduleRepository,
} from '@marinetesio/database/typeorm/mysql';
import { RegisterNotFoundError } from '@marinetesio/errors';
import { endOfMonth, startOfMonth } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
import { MoreThanOrEqual, LessThanOrEqual, Equal } from 'typeorm';

const makeNowDate = (): Date =>
  utcToZonedTime(new Date(), 'America/Porto_Velho');

export class DiaristInfoService implements Service {
  async execute(
    diaristId: string,
  ): Promise<DiaristInfoDocument & { schedules_done_this_month: number }> {
    const diarist = await DiaristRepository.findOne(diaristId, {
      select: ['id', 'accepting_services'],
    });

    if (!diarist) {
      throw new RegisterNotFoundError();
    }

    const now = makeNowDate();
    const endMonthDate = endOfMonth(now);
    const startMonthDate = startOfMonth(now);

    const schedulesMainQuery = ScheduleRepository.createQueryBuilder()
      .andWhere({ diarist_id: diarist.id })
      .select(['schedule.id', 'schedule.date', 'schedule.status']);

    const allSchedulesCount = await schedulesMainQuery.getCount();

    const monthSchedulesQuery = schedulesMainQuery
      .andWhere({ date: MoreThanOrEqual(startMonthDate) })
      .andWhere({ date: LessThanOrEqual(endMonthDate) });

    const monthSchedulesCount = await monthSchedulesQuery.getCount();

    const monthPendingSchedulesCount = await monthSchedulesQuery
      .andWhere({ status: Equal('pending') })
      .getCount();

    const monthDoneSchedulesCount = await monthSchedulesQuery
      .andWhere({ status: Equal('done') })
      .getCount();

    return {
      accepting_services: diarist.accepting_services,
      all_schedules_count: allSchedulesCount,
      schedules_this_month: monthSchedulesCount,
      schedules_pending_this_month: monthPendingSchedulesCount,
      schedules_done_this_month: monthDoneSchedulesCount,
    };
  }
}
