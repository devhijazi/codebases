import type { NextApiRequest, NextApiResponse } from 'next';

import type { PostsDataByCategory } from '@/modules/api/types';
import { getPostsByCategory } from '@/modules/prismic/manager';
import { parsePostData } from '@/modules/prismic/utils/parsePostData';

export default async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  const category = req.query.c;

  if (!category) {
    res.status(400).end();
    return;
  }

  const postsData = await getPostsByCategory(String(category), {
    pageSize: 10,
  });
  const posts = postsData.results.map(document => parsePostData(document));

  const data: PostsDataByCategory = posts;

  res.json(data);
};
