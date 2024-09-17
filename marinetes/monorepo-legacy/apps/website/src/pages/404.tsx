import { Main } from '@/screen/atoms/404/Main';
import { SEO } from '@/screen/components/forward/SEO';

const NotFound = (): JSX.Element => (
  <>
    <SEO title="Página não encontrada">
      <meta name="robots" content="noindex,nofollow" />
    </SEO>

    <div>
      <Main />
    </div>
  </>
);

export default NotFound;
