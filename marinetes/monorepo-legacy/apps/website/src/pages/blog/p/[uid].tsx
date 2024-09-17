/* eslint-disable react/no-danger */
import { formatRelative } from 'date-fns';
import ptBRLocale from 'date-fns/locale/pt-BR';
import type { GetStaticProps, GetStaticPaths } from 'next';
import NextImage from 'next/image';
import { useRouter } from 'next/router';
import { RichText } from 'prismic-reactjs';

import { getPostByID, getPostsUID } from '@/modules/prismic/manager';
import type { PostWithContent } from '@/modules/prismic/types';
import { parsePostData } from '@/modules/prismic/utils/parsePostData';
import { Link } from '@/screen/components/forward/Link';
import { SEO } from '@/screen/components/forward/SEO';
import { Spinner } from '@/screen/components/ui/Spinner';
import styles from '@/screen/styles/pages/blog.module.css';

interface Props {
  data: PostWithContent;
}

const Post = ({ data }: Props): JSX.Element => {
  const { isFallback } = useRouter();

  if (isFallback) {
    return (
      <div className="flex flex-grow h-full py-36 items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <>
      <SEO
        title={data.title}
        image={data.banner}
        description={data.description}
      />

      <article className="blog-wrap bowl-content py-16">
        <section>
          <div className="mx-auto w-full max-w-5xl">
            <h1 className="font-bold text-2xl md:text-center md:text-4xl">
              {data.title}
            </h1>

            <h4 className="mt-5 text-1xl text-gray-400 md:text-center">
              {data.description}
            </h4>
          </div>
          {data.content.first_image.url && (
            <div className="mt-8 max-w-qhd mx-auto">
              <NextImage
                width="1280"
                height="720"
                src={data.content.first_image.url}
                alt={data.content.first_image.alt || undefined}
              />
            </div>
          )}

          <div className="blog-content">
            <RichText render={data.content.first_paragraph} />
          </div>
        </section>

        <section className="mt-20">
          {data.content.second_image.url && (
            <div className="max-w-4xl mx-auto">
              <NextImage
                width="1280"
                height="720"
                src={data.content.second_image.url}
                alt={data.content.second_image.alt || undefined}
              />
            </div>
          )}

          <div className="blog-content">
            <RichText render={data.content.second_paragraph} />
          </div>
        </section>

        <section className="blog-content">
          {data.content.video_embed.html && (
            <div
              className={styles['video-content']}
              dangerouslySetInnerHTML={{
                __html: data.content.video_embed.html,
              }}
            />
          )}
        </section>

        <section className="mx-auto w-full max-w-6xl mt-20">
          <div className="pl-4 border-l-4 border-green-500">
            <p className="text-1xl font-bold text-gray-500">
              Por <span>{data.author.name}</span>
            </p>

            <div className="flex items-center flex-wrap gap-2">
              <p className="text-sm font-medium">
                Atualizado{' '}
                <span className="font-semibold text-black">
                  {formatRelative(new Date(data.updated_at), new Date(), {
                    locale: ptBRLocale,
                  })}
                </span>
              </p>

              <section className="flex flex-wrap gap-3">
                {data.tags.map(tag => (
                  <Link
                    key={tag}
                    href={`/blog/c/${tag}`}
                    className="font-bold uppercase text-sm py-1 px-3 rounded-md bg-opacity-10 bg-slate-400"
                  >
                    {tag}
                  </Link>
                ))}
              </section>
            </div>
          </div>
        </section>
      </article>
    </>
  );
};

export default Post;

type Params = {
  uid: string;
};

export const getStaticProps: GetStaticProps<Props, Params> = async ({
  params,
}) => {
  if (!params) {
    throw new Error('Os parâmetros não foram providos.');
  }

  const id = params.uid.split(/__/).pop();

  if (!id) {
    return {
      notFound: true,
    };
  }

  const postDocument = await getPostByID(id);

  if (!postDocument) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      data: parsePostData(postDocument, true),
    },
  };
};

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const postsUID = await getPostsUID();

  return {
    fallback: true,
    paths: postsUID.map(path => ({
      params: {
        uid: path,
      },
    })),
  };
};
