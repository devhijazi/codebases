import type { NextApiRequest, NextApiResponse } from 'next';

import type { PostsDataBySearch } from '@/modules/api/types';
import { getPostsByTitle } from '@/modules/prismic/manager';
import { parsePostData } from '@/modules/prismic/utils/parsePostData';

export default async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  const title = req.query.s;

  if (!title) {
    res.status(400).end();
    return;
  }

  const postsData = await getPostsByTitle(String(title), { pageSize: 10 });
  const posts = postsData.results.map(document => parsePostData(document));

  const data: PostsDataBySearch = posts;

  res.json(data);
};
