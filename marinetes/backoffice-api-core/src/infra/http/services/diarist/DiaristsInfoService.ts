import type { DiaristStatusType } from '@marinetesio/types/model';

import { DiaristRepository } from '@marinetesio/database/typeorm/mysql';

export interface DiaristsInfoDocument {
  allCount: number;
  pending: number;
  active: number;
  inactive: number;
}

export class DiaristsInfoService implements Service {
  async execute(): Promise<DiaristsInfoDocument> {
    const mainQuery = DiaristRepository.createQueryBuilder('diarist').addSelect(
      ['diarist.id'],
    );
    const statusQuery = mainQuery
      .innerJoinAndSelect('diarist.status', 'status')
      .addSelect(['status.type']);

    const getCountByStatusType = (type: DiaristStatusType): Promise<number> =>
      statusQuery
        .where('status.type = :type', {
          type,
        })
        .getCount();

    const allCount = await mainQuery.getCount();
    const pending = await getCountByStatusType('pending');
    const active = await getCountByStatusType('active');
    const inactive = await getCountByStatusType('inactive');

    return {
      allCount,
      pending,
      active,
      inactive,
    };
  }
}
