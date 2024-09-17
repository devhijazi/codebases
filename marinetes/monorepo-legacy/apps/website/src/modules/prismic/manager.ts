import Prismic from '@prismicio/client';
import type ApiSearchResponse from '@prismicio/client/types/ApiSearchResponse';
import type { Document } from '@prismicio/client/types/documents';
import type { QueryOptions } from '@prismicio/client/types/ResolvedApi';

import { getClient } from './client';
import type { Post } from './types';
import { makePostUID } from './utils/makePostUID';

const blogClient = getClient('blog');
const testimonialsClient = getClient('testimonials');

export async function getTestimonials(): Promise<ApiSearchResponse> {
  const testimonials = await testimonialsClient.query('', {
    orderings: '[document.first_publication_date desc]',
  });

  return testimonials;
}

const postTypePredicate = Prismic.Predicates.at('document.type', 'post');

const mainPostsOptions: QueryOptions = {
  orderings: '[document.first_publication_date desc]',
  fetchLinks: ['author.picture', 'author.name'],
};

export async function getAllPosts(
  options: QueryOptions = {},
): Promise<ApiSearchResponse> {
  const posts = await blogClient.query(postTypePredicate, {
    ...options,
    ...mainPostsOptions,
  });

  return posts;
}

export async function getPostByID(
  id: string,
  options: QueryOptions = {},
): Promise<Document | null> {
  const { results } = await blogClient.query(
    [postTypePredicate, Prismic.Predicates.at('document.id', id)],
    {
      ...options,
      ...mainPostsOptions,
    },
  );

  if (!results.length) {
    return null;
  }

  return results[0];
}

export async function getPostsByTitle(
  title: string,
  options: QueryOptions = {},
): Promise<ApiSearchResponse> {
  const posts = await blogClient.query(
    [postTypePredicate, Prismic.Predicates.fulltext('my.post.title', title)],
    {
      ...options,
      ...mainPostsOptions,
    },
  );

  return posts;
}

export async function getPostsByCategory(
  category: string,
  options: QueryOptions = {},
): Promise<ApiSearchResponse> {
  const posts = await blogClient.query(
    [postTypePredicate, Prismic.Predicates.at('document.tags', [category])],
    {
      ...options,
      ...mainPostsOptions,
    },
  );

  return posts;
}

//

export async function getPostsUID(): Promise<string[]> {
  const posts = await blogClient.query<Post>(postTypePredicate);

  return posts.results.map(({ id, data }) =>
    makePostUID({ id, title: data.title }),
  );
}
