import type { NextApiRequest, NextApiResponse } from 'next';

import type { PostsData } from '@/modules/api/types';
import { getAllPosts } from '@/modules/prismic/manager';
import { parsePostData } from '@/modules/prismic/utils/parsePostData';

export default async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  const queryPage = Number(req.query.page);
  const page = Number.isNaN(queryPage) ? 1 : queryPage;

  const postsData = await getAllPosts({ pageSize: 10, page });
  const posts = postsData.results.map(document => parsePostData(document));

  const data: PostsData = {
    page: postsData.page,
    results_per_page: postsData.results_per_page,
    results_size: postsData.results_size,
    total_pages: postsData.total_pages,
    total_results_size: postsData.total_results_size,
    items: posts,
  };

  res.json(data);
};
