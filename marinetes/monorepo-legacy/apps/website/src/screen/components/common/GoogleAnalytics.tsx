import NextHead from 'next/head';
import { memo } from 'react';

import { useRouterChange } from '@/engine/hooks/useRouterChange';
import { GA_TRACKING_ID, IS_DEV } from '@/means/data/constants';

export const GoogleAnalytics = memo((): JSX.Element => {
  useRouterChange((url: string) => {
    if (IS_DEV || typeof window === 'undefined') {
      return;
    }

    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
    });
  });

  return (
    <NextHead>
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
      />

      <script
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
          
            gtag('config', '${GA_TRACKING_ID}');
          `,
        }}
      />
    </NextHead>
  );
});

GoogleAnalytics.displayName = 'GoogleAnalytics';
