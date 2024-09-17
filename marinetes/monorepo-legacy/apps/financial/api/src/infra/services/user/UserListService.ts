import { UserRepository } from '@marinetes/database';
import { PaginationHelper } from '@marinetes/pagination-helper';
import type {
  UserListData,
  UserListDocument,
} from '@marinetes/types/dtos/financial/api';
import { Like } from 'typeorm';

export class UserListService implements Service {
  async execute({
    search,
    page = 1,
    itemsPerPage = 10,
  }: UserListData): Promise<UserListDocument> {
    const paginatedData = await PaginationHelper.paginate(
      UserRepository.getRepository(),
      {
        page,
        itemsPerPage,
        alias: 'user',
        fag: query => {
          query
            .leftJoinAndSelect('user.addresses', 'addresses')
            .select([
              'user.id',
              'user.full_name',
              'user.document',
              'user.phone',
              'user.email',
            ]);

          if (search) {
            query.where([
              {
                full_name: Like(`%${search}%`),
              },
              {
                email: Like(`%${search}%`),
              },
            ]);
          }
        },
      },
    );

    return paginatedData;
  }
}
