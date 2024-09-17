import type {
  EmployeeListData,
  EmployeeListDocument,
} from '@marinetesio/types/dtos/financial/api';

import { EmployeeRepository } from '@marinetesio/database/typeorm/mysql';
import { PaginationHelper } from '@marinetesio/pagination-helper';
import { Like } from 'typeorm';

export class EmployeeListService implements Service {
  async execute({
    search,
    page = 1,
    itemsPerPage = 10,
  }: EmployeeListData): Promise<EmployeeListDocument> {
    const paginetedData = await PaginationHelper.paginate(
      EmployeeRepository.getRepository(),
      {
        page,
        itemsPerPage,
        alias: 'employee',
        fag: query => {
          query.select([
            'employee.id',
            'employee.full_name',
            'employee.email',
            'employee.created_at',
          ]);

          if (search) {
            query.where([
              {
                full_name: Like(`%${search}`),
              },
            ]);
          }
        },
      },
    );

    return paginetedData;
  }
}
