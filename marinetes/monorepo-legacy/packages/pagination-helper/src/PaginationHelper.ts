import { PaginationError } from '@marinetes/errors';
import { isNumber } from '@marinetes/utils';
import { instanceToPlain } from 'class-transformer';
import type { Repository, SelectQueryBuilder } from 'typeorm';

const MIN_ITEMS_PER_PAGE = 5;
const MAX_ITEMS_PER_PAGE = 20;

type GetRepositoryEntity<R> = R extends Repository<infer T> ? T : never;

interface PaginateOptions<R extends Repository<any>> {
  page: number;
  alias?: string;
  itemsPerPage: number;
  orderByDate?: boolean;
  fag?(query: SelectQueryBuilder<R>): any;
}

interface PaginateReturnData<R extends Repository<any>> {
  count: number;
  pages: number;
  inPage: number;
  itemsInPage: number;
  itemsPerPage: number;
  items: GetRepositoryEntity<R>[];
}

export class PaginationHelper {
  public static async paginate<R extends Repository<any>>(
    respository: R,
    {
      fag,
      alias,
      itemsPerPage: insertedItemsPerPage,
      page: insertedPage,
      orderByDate = false,
    }: PaginateOptions<R>,
  ): Promise<PaginateReturnData<R>> {
    let itemsPerPage = insertedItemsPerPage;

    if (!isNumber(insertedPage)) {
      throw new PaginationError();
    }

    if (!isNumber(itemsPerPage)) {
      itemsPerPage = MIN_ITEMS_PER_PAGE;
    }

    itemsPerPage = Math.ceil(itemsPerPage);

    if (itemsPerPage > MAX_ITEMS_PER_PAGE) {
      itemsPerPage = MAX_ITEMS_PER_PAGE;
    }

    if (itemsPerPage < MIN_ITEMS_PER_PAGE) {
      itemsPerPage = MIN_ITEMS_PER_PAGE;
    }

    const ceiledPage = Math.ceil(insertedPage);
    const page =
      Number.isSafeInteger(ceiledPage) && ceiledPage > 0 ? ceiledPage : 1;

    const skipDocuments = itemsPerPage * (page - 1);
    const documentsQuery = respository.createQueryBuilder(alias);

    if (orderByDate) {
      documentsQuery.orderBy(`${alias ? `${alias}.` : ''}created_at`, 'ASC');
    }

    await fag?.(documentsQuery);

    const count = await documentsQuery.getCount();
    const pages = Math.ceil(count / itemsPerPage) || 1;

    if (page > pages) {
      throw new PaginationError();
    }

    documentsQuery.skip(skipDocuments).take(itemsPerPage);

    const documents = await documentsQuery.getMany();
    const documentsCount = documents.length;

    const documentsPlained = instanceToPlain(documents);

    return {
      count,
      pages,
      inPage: page,
      itemsInPage: documentsCount,
      itemsPerPage,
      items: documentsPlained as GetRepositoryEntity<R>[],
    };
  }
}
