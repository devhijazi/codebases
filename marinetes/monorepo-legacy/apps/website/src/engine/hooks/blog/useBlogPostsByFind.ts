import axios from 'axios';
import { useMemo } from 'react';
import useSWR from 'swr';

import type { Post } from '@/modules/prismic/types';

type PostsData = Post[];

interface UseBlogPostsByFindData {
  loading: boolean;
  posts: Post[];
}

const fetcher = (url: string): Promise<PostsData> =>
  axios.get<PostsData>(url).then(({ data }) => data);

function useBlogPostsByFind(url: string): UseBlogPostsByFindData {
  const { error, data } = useSWR<PostsData>(url, fetcher);

  const posts = useMemo(() => data ?? [], [data]);
  const loading = useMemo(() => !error && !data, [error, data]);

  return {
    loading,
    posts,
  };
}

export function useBlogPostsBySearch(search: string): UseBlogPostsByFindData {
  const data = useBlogPostsByFind(`/api/posts/search?s=${search}`);

  return data;
}

export function useBlogPostsByCategory(
  category: string,
): UseBlogPostsByFindData {
  const data = useBlogPostsByFind(`/api/posts/category?c=${category}`);

  return data;
}
