import type { NextApiRequest, NextApiResponse } from 'next';

import type { TestimonialsData } from '@/modules/api/types';
import { getTestimonials } from '@/modules/prismic/manager';
import type { Testimonial } from '@/modules/prismic/types';
import { parseTestimonialData } from '@/modules/prismic/utils/parseTestimonialData';

export default async (
  _req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  const testimonialsData = await getTestimonials();
  const testimonials: Testimonial[] =
    testimonialsData.results.map(parseTestimonialData);

  const data: TestimonialsData = testimonials;

  res.json(data);
};
