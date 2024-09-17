import type { Repositories } from './types';

export const repositories: Repositories = {
  blog: {
    url: 'https://marinetes-blog.prismic.io/api/v2',
    token: process.env.PRISMIC_BLOG_TOKEN,
  },
  testimonials: {
    url: 'https://marinetes-blog.prismic.io/api/v2',
    token: process.env.PRISMIC_TESTIMONIALS_TOKEN,
  },
};
