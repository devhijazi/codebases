import { useRouter } from 'next/router';
import { useEffect, useMemo } from 'react';

import { FeedBySearch } from '@/screen/atoms/blog/Feed/BySearch';
import { Header } from '@/screen/atoms/blog/Header';
import { SEO } from '@/screen/components/forward/SEO';

const Search = (): JSX.Element => {
  const { isReady, query, back } = useRouter();

  const search = useMemo(() => {
    const value = query.query;

    return typeof value === 'string' ? value : undefined;
  }, [query]);

  useEffect(() => {
    if (isReady && !search) {
      back();
    }
  }, [isReady, search, back]);

  return (
    <>
      <SEO title="Marinete's — Blog">
        <meta name="robots" content="noindex" />
      </SEO>

      <div className="flex flex-col w-full bowl-content py-20">
        <Header />

        <div className="mt-16">
          {search && <FeedBySearch search={search} />}
        </div>
      </div>
    </>
  );
};

export default Search;
