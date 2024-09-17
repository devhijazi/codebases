import { Main } from '@/screen/atoms/register/Main';
import { SEO } from '@/screen/components/forward/SEO';

const Register = (): JSX.Element => (
  <>
    <SEO title="Pré Registro">
      <meta name="robots" content="noindex,nofollow" />
    </SEO>

    <div>
      <Main />
    </div>
  </>
);

export default Register;
