import '@screen/styles/global/index.css';

import 'react-toastify/dist/ReactToastify.css';

import { logger } from '@hitechline/reactools';
import { AppProps } from 'next/app';
import { ToastContainer } from 'react-toastify';
import SwiperCore, { Pagination } from 'swiper';

import { PortalProvider } from '@/engine/contexts/Portal';
import { IS_DEV } from '@/means/data/constants';
import { GoogleAnalytics } from '@/screen/components/common/GoogleAnalytics';
import { Head } from '@/screen/components/common/Head';
import { MediaContextProvider } from '@/screen/view/Media';
import { Mount } from '@/screen/view/Mount';
import { UIProvider } from '@/screen/view/UI';

SwiperCore.use([Pagination]);

if (!IS_DEV) {
  logger.disable();
}

const App = ({ pageProps, Component }: AppProps): JSX.Element => (
  <>
    <Head />
    <GoogleAnalytics />

    <ToastContainer autoClose={3000} />

    <PortalProvider>
      <UIProvider>
        <MediaContextProvider>
          <Mount>
            <Component {...pageProps} />
          </Mount>
        </MediaContextProvider>
      </UIProvider>
    </PortalProvider>
  </>
);

export default App;
