import { useRouter } from 'next/router';
import { useState, useEffect, useMemo, useCallback } from 'react';

import { useBlogPosts } from '@/engine/hooks/blog/useBlogPosts';
import { Paginate } from '@/screen/components/forward/Paginate';
import { Spinner } from '@/screen/components/ui/Spinner';

import { Card } from './components/Card';

interface Props {
  page?: number;
}

export const Feed = ({ page = 1 }: Props): JSX.Element => {
  const { push } = useRouter();
  const { loading, posts, total_pages: totalPages } = useBlogPosts(page);

  const [isReady, updateIsReady] = useState(false);

  const postsElements = useMemo(
    () => posts.map(data => <Card key={data.id} data={data} />),
    [posts],
  );

  const handlePageChange = useCallback(
    ({ selected }: { selected: number }) => {
      const selectedPage = selected + 1;

      if (selectedPage === page) {
        return;
      }

      push(`/blog?page=${selectedPage}`);
    },
    [page, push],
  );

  useEffect(() => {
    updateIsReady(true);
  }, []);

  if (loading) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  return (
    <div>
      <>
        <div className="flex flex-wrap gap-x-12 gap-y-16">
          {postsElements && postsElements.length ? (
            postsElements
          ) : (
            <h1 className="text-3xl text-gray-400">Nada encontrado :)</h1>
          )}
        </div>
      </>

      {isReady && (
        <div className="mt-14">
          <Paginate
            initialPage={page - 1}
            onPageChange={handlePageChange}
            pageCount={totalPages}
          />
        </div>
      )}
    </div>
  );
};
