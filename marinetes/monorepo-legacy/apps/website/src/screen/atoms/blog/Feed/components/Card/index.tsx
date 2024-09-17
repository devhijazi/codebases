import { formatRelative } from 'date-fns';
import ptBRLocale from 'date-fns/locale/pt-BR';
import NextImage from 'next/image';

import type { Post } from '@/modules/prismic/types';
import { Link } from '@/screen/components/forward/Link';

interface Props {
  data: Post;
}

export const Card = ({ data }: Props): JSX.Element => (
  <div className="w-full max-w-xl">
    <Link href={`/blog/p/${data.uid}`}>
      <NextImage src={data.banner} width="1280" height="720" />
    </Link>

    <section className="mt-2 flex flex-col ">
      <Link href={`/blog/p/${data.uid}`}>
        <h1 className="font-bold text-2xl">{data.title}</h1>
      </Link>

      <div className="mt-4 flex select-none flex-wrap">
        <p className="font-semibold mr-2 text-favorite">{data.author.name}</p>

        <p className="text-neutral-300">
          {formatRelative(new Date(data.created_at), new Date(), {
            locale: ptBRLocale,
          })}
        </p>
      </div>
    </section>
  </div>
);
