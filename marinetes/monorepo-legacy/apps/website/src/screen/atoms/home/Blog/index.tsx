import { RevealOnScroll } from '@/screen/components/effect/RevealOnScroll';
import { PostsSlider } from '@/screen/components/prismic/PostsSlider';

export const Blog = (): JSX.Element => {
  return (
    <div className="bowl-content p-10">
      <RevealOnScroll>
        <h1 className="text-center text-5xl font-bold text-neutral-700">
          Últimas Noticias
        </h1>

        <div className="pb-8 mt-10">
          <PostsSlider />
        </div>
      </RevealOnScroll>
    </div>
  );
};
