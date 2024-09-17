import { Main } from '@/screen/atoms/home/Security/pages/User';
import { SEO } from '@/screen/components/forward/SEO';

const Security = (): JSX.Element => (
  <>
    <SEO title="Segurança">
      <meta name="robots" content="noindex,nofollow" />
    </SEO>

    <div>
      <Main />
    </div>
  </>
);

export default Security;
