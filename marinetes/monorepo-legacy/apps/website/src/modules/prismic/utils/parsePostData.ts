import type { Document } from '@prismicio/client/types/documents';

import type { Post, PostWithContent } from '../types';
import { makePostUID } from './makePostUID';

export function parsePostData(document: Document, getContent?: false): Post;
export function parsePostData(
  document: Document,
  getContent?: true,
): PostWithContent;
export function parsePostData(
  { id, tags, data, last_publication_date, first_publication_date }: Document,
  getContent = false,
): Post | PostWithContent {
  const post = {
    id,
    tags,
    uid: makePostUID({ id, title: data.title }),
    title: data.title,
    description: data.description,
    author: data.author.data,
    banner: data.banner.url,
    updated_at: last_publication_date as string,
    created_at: first_publication_date as string,
  };

  if (getContent) {
    Object.assign(post, {
      content: {
        first_image: data.first_image ?? null,
        second_image: data.second_image ?? null,
        first_paragraph: data.first_paragraph,
        video_embed: data.video_embed ?? null,
        second_paragraph: data.second_paragraph,
        link: data.link,
      },
    });
  }

  return post;
}
