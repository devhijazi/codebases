import { EmployeeRepository } from '@marinetes/database';
import { PaginationHelper } from '@marinetes/pagination-helper';
import {
  EmployeeListData,
  EmployeeListDocument,
} from '@marinetes/types/dtos/financial/api';
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
          query.select(['id', 'full_name', 'email']);

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
