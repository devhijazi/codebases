import { useRouter } from 'next/router';
import { useMemo } from 'react';

import { Categories } from '@/screen/atoms/blog/Categories';
import { Feed } from '@/screen/atoms/blog/Feed';
import { Header } from '@/screen/atoms/blog/Header';
import { SEO } from '@/screen/components/forward/SEO';
import { Media } from '@/screen/view/Media';

const Blog = (): JSX.Element => {
  const { query } = useRouter();

  const page = useMemo(() => {
    const value = Number(query.page);

    return Number.isNaN(value) ? undefined : value;
  }, [query]);

  return (
    <>
      <SEO title="Marinete's — Blog" />

      <div className="flex bowl-content py-20 lg:space-x-28">
        <div className="flex w-full flex-col">
          <Header />

          <div className="mt-16">
            <Feed page={page} />
          </div>
        </div>

        <Media greaterThanOrEqual="lg">
          <div className="flex-shrink-0 sticky top-8">
            <Categories />
          </div>
        </Media>
      </div>
    </>
  );
};

export default Blog;
