import { useRouter } from 'next/router';
import { useEffect, useMemo } from 'react';

import { Categories } from '@/screen/atoms/blog/Categories';
import { FeedByCategory } from '@/screen/atoms/blog/Feed/ByCategory';
import { Header } from '@/screen/atoms/blog/Header';
import { SEO } from '@/screen/components/forward/SEO';
import { Media } from '@/screen/view/Media';

const Category = (): JSX.Element => {
  const { query, push } = useRouter();

  const category = useMemo(() => {
    const value = query.category;

    return typeof value === 'string' ? value : undefined;
  }, [query]);

  useEffect(() => {
    if (!category || category === category.toLowerCase()) {
      return;
    }

    push(`/blog/c/${category.toLowerCase()}`);
  }, [category, push]);

  return (
    <>
      <SEO title="Marinete's - Blog">
        <meta name="robots" content="noindex" />
      </SEO>

      <div className="flex bowl-content py-20 lg:space-x-28">
        <div className="flex w-full flex-col">
          <Header />

          <div className="mt-16">
            {category && <FeedByCategory category={category} />}
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

export default Category;
