import axios from 'axios';
import useSWR from 'swr';

import type { BlogCategoriesData } from '@modules/api/types';

interface UseBlogCategoriesData {
  categories: string[];
}

const fetcher = (url: string): Promise<BlogCategoriesData> =>
  axios.get<BlogCategoriesData>(url).then(({ data }) => data);

export function useBlogCategories(): UseBlogCategoriesData {
  const { data: categories = [] } = useSWR<string[]>(
    '/api/blog-categories',
    fetcher,
  );

  return {
    categories,
  };
}
