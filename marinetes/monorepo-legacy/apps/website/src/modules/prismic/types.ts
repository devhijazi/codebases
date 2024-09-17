import type ApiSearchResponse from '@prismicio/client/types/ApiSearchResponse';

export type RepositoryName = 'blog' | 'testimonials';

export type Repositories = {
  [Key in RepositoryName]: {
    url: string;
    token: string;
  };
};

//

export type PaginationData = Pick<
  ApiSearchResponse,
  | 'page'
  | 'results_per_page'
  | 'results_size'
  | 'total_results_size'
  | 'total_pages'
>;

//

interface Image {
  dimensions: any;
  alt: string | null;
  copyright: string | null;
  url: string;
}

export interface Author {
  name: string;
  picture: Image;
}

export interface Testimonial {
  id: string;
  name: string;
  ocupation: string;
  message: string;
  picture: string;
}

export interface Post {
  id: string;
  uid: string;
  title: string;
  description: string;
  banner: string;
  author: Author;
  tags: string[];
  updated_at: string;
  created_at: string;
}

export interface PostWithContent extends Post {
  content: {
    first_image: Image;
    second_image: Image;
    first_paragraph: any[];
    second_paragraph: any[];
    video_embed: any;
    link: {
      url: string;
      link_type: string;
    };
  };
}
