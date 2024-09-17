import { useMemo } from 'react';

import { useBlogCategories } from '@/engine/hooks/blog/useBlogCategories';
import { useBlogPostsByCategory } from '@/engine/hooks/blog/useBlogPostsByFind';
import { Spinner } from '@/screen/components/ui/Spinner';

import { Card } from './components/Card';

interface Props {
  category: string;
}

export const FeedByCategory = ({ category }: Props): JSX.Element => {
  const { categories } = useBlogCategories();
  const { loading, posts } = useBlogPostsByCategory(
    categories.find(
      current => current.toLowerCase() === category.toLowerCase(),
    ) ?? category,
  );

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
