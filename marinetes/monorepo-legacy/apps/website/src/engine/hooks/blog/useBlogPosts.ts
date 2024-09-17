import axios from 'axios';
import { useMemo } from 'react';
import useSWR from 'swr';

import type { Post } from '@/modules/prismic/types';
import type { PostsData } from '@modules/api/types';

interface UseBlogPostsData extends Omit<PostsData, 'items'> {
  loading: boolean;
  posts: Post[];
}

const fetcher = (url: string): Promise<PostsData> =>
  axios.get<PostsData>(url).then(({ data }) => data);

export function useBlogPosts(page: number): UseBlogPostsData {
  const { error, data } = useSWR<PostsData>(`/api/posts?page=${page}`, fetcher);

  const posts = useMemo(() => data?.items ?? [], [data]);
  const loading = useMemo(() => !error && !data, [error, data]);

  return {
    page: 1,
    total_pages: 1,
    results_size: 0,
    results_per_page: 0,
    total_results_size: 0,

    loading,
    posts,
    ...data,
  };
}
