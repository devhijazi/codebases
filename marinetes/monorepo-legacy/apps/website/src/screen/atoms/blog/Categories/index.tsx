import { useBlogCategories } from '@/engine/hooks/blog/useBlogCategories';
import { capitalize } from '@/modules/utils/capitalize';
import { Link } from '@/screen/components/forward/Link';
import { Spinner } from '@/screen/components/ui/Spinner';

export const Categories = (): JSX.Element => {
  const { categories } = useBlogCategories();

  return (
    <div className="w-56">
      <h1 className="font-bold text-2xl">Categorias</h1>

      <section className="mt-4 flex flex-col space-y-1">
        {categories && categories.length ? (
          categories.map(category => (
            <Link
              className="p-3 rounded-lg hover:bg-neutral-100"
              key={category}
              href={`/blog/c/${category.toLowerCase()}`}
            >
              {capitalize(category)}
            </Link>
          ))
        ) : (
          <div className="mt-6 flex justify-center">
            <Spinner />
          </div>
        )}
      </section>
    </div>
  );
};
