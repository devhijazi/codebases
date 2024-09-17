import { DiaristRepository } from '@marinetes/database';
import { PaginationHelper } from '@marinetes/pagination-helper';
import type {
  DiaristListData,
  DiaristListDocument,
} from '@marinetes/types/dtos/financial/api';
import { Like } from 'typeorm';

export class DiaristListService implements Service {
  async execute({
    page = 1,
    itemsPerPage = 10,
    search,
    activeRegister = false,
    preRegister = false,
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
              'diarist.avatar',
              'status.type',
              'status.approved',
              'status.last_attend_email_sent_date',
              'status.disable_date',
              'status.disable_reason',
              'diarist.created_at',
            ]);

          if (search) {
            query.andWhere([
              { full_name: Like(`%${search}%`) },
              { document: Like(`%${search}%`) },
              { email: Like(`%${search}%`) },
            ]);
          }

          if (activeRegister) {
            query.andWhere('status.type = :statusType', {
              statusType: 'active',
            });
          }

          if (preRegister) {
            query.andWhere('status.type = :statusType', {
              statusType: 'pending',
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
