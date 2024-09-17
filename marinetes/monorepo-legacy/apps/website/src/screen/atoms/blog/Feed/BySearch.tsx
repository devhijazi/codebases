import { useMemo } from 'react';

import { useBlogPostsBySearch } from '@/engine/hooks/blog/useBlogPostsByFind';
import { Spinner } from '@/screen/components/ui/Spinner';

import { Card } from './components/Card';

interface Props {
  search: string;
}

export const FeedBySearch = ({ search }: Props): JSX.Element => {
  const { loading, posts } = useBlogPostsBySearch(search);

  const postsElements = useMemo(
    () => posts.map(data => <Card key={data.id} data={data} />),
    [posts],
  );

  if (loading) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  return (
    <div>
      {postsElements.length ? (
        <div className="flex flex-wrap gap-x-12 gap-y-16">{postsElements}</div>
      ) : (
        <h1 className="text-3xl text-gray-400">Nada encontrado :)</h1>
      )}
    </div>
  );
};
