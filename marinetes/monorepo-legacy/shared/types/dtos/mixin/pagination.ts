export type PaginateData = {
  page?: number;
  search?: string;
  itemsPerPage?: number;
};

export type PaginateReturnData<T> = {
  count: number;
  pages: number;
  inPage: number;
  itemsInPage: number;
  itemsPerPage: number;
  items: T[];
};

export type SearchData = {
  search: string;
};
