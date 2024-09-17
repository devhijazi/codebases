import type { Testimonial, Post, PaginationData } from '@modules/prismic/types';

export type TestimonialsData = Testimonial[];

export type PostsData = PaginationData & {
  items: Post[];
};

export type PostsDataBySearch = Post[];

export type PostsDataByCategory = Post[];

export type BlogCategoriesData = string[];
