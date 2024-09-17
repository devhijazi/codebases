import { removeQueryString } from '@hitechline/reactools';
import NextHead from 'next/head';
import { useRouter } from 'next/router';

import { APP_URL } from '@means/data/constants';
import { makeUrl } from '@modules/utils/makeUrl';

interface Props {
  url?: string;
  title?: string;
  image?: string;
  description?: string;
}

export const SEO = ({
  url,
  children,
  title = "Marinete's Clean House",
  image = '/images/meta.png',
  description = 'O modo mais fácil, rápido e seguro de cuidar da limpeza do seu lar.',
}: PropsWithChildren<Props>): JSX.Element => {
  const router = useRouter();

  const metaImage = makeUrl(image);
  const canonical = makeUrl(removeQueryString(url ?? router.asPath));

  return (
    <NextHead>
      <title>{title}</title>

      <link rel="canonical" href={canonical} />

      <link itemProp="url" href={APP_URL} />
      <meta itemProp="name" content={title} />
      <meta itemProp="description" content={description} />

      <meta name="image" content={metaImage} />
      <meta name="description" content={description} />

      {/* OpenGraph */}

      <meta property="og:type" content="website" />
      <meta property="og:locale" content="pt_BR" />
      <meta property="og:site_name" content="Marinetes" />

      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />

      <meta property="og:image:width" content="1920" />
      <meta property="og:image:height" content="1080" />

      <meta property="og:image" content={metaImage} />
      <meta property="og:image:secure_url" content={metaImage} />

      {/* Twitter */}

      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />

      <meta name="twitter:image" content={metaImage} />
      <meta name="twitter:image:src" content={metaImage} />
      {/* 
      <meta name="twitter:site" content="@hitechline" />
      <meta name="twitter:creator" content="@hitechline" /> */}
      <meta name="twitter:card" content="summary_large_image" />

      {children}
    </NextHead>
  );
};
