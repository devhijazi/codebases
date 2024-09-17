import type { NextApiRequest, NextApiResponse } from 'next';

import type { BlogCategoriesData } from '@/modules/api/types';
import { getAllPosts } from '@/modules/prismic/manager';

export default async (
  _req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  const postsData = await getAllPosts({ pageSize: 50 });
  const data: BlogCategoriesData = postsData.results
    .map(({ tags }) => tags)
    .flatMap(tags => tags)
    .filter((tag, index, array) => array.indexOf(tag) === index);

  res.json(data);
};
