import type { Document } from '@prismicio/client/types/documents';

import type { Testimonial } from '../types';

export function parseTestimonialData({ id, data }: Document): Testimonial {
  return {
    id,
    name: data.name,
    ocupation: data.ocupation,
    picture: data.photo.url,
    message: data.message,
  };
}
