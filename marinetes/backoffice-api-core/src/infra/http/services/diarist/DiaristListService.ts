import type {
  DiaristListData,
  DiaristListDocument,
} from '@marinetesio/types/dtos/financial/api';

import { DiaristRepository } from '@marinetesio/database/typeorm/mysql';
import { PaginationHelper } from '@marinetesio/pagination-helper';

export class DiaristListService implements Service {
  async execute({
    page = 1,
    itemsPerPage = 10,
    search,
    status,
    byDate = true,
  }: DiaristListData): Promise<DiaristListDocument> {
    const paginatedData = await PaginationHelper.paginate(
      DiaristRepository.getRepository(),
      {
        page,
        itemsPerPage,
        alias: 'diarist',
        fag: query => {
          query
            .innerJoinAndSelect('diarist.status', 'status')
            .select([
              'diarist.id',
              'diarist.email',
              'diarist.full_name',
              'diarist.document',
              'diarist.general_register',
              'diarist.avatar',
              'status.type',
              'status.approved',
              'status.last_attend_email_sent_date',
              'status.disable_date',
              'status.disable_reason',
              'diarist.created_at',
            ]);

          if (search) {
            query
              .where('diarist.full_name like :name', { name: `%${search}%` })
              .orWhere('diarist.general_register like :general_register', {
                general_register: `%${search}%`,
              })
              .orWhere('diarist.email like :email', { email: `%${search}%` });
          }

          const availableStatusTypes = ['pending', 'active', 'inactive'];
          if (status && availableStatusTypes.includes(status)) {
            query.andWhere('status.type = :statusType', {
              statusType: status,
            });
          }

          if (byDate) {
            query.orderBy('diarist.created_at', 'DESC');
          }
        },
      },
    );

    return paginatedData;
  }
}
