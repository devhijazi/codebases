import ReactMarkdown from 'react-markdown';

import Police from '@/means/markdown/police-privacy.c.md';
import { SEO } from '@/screen/components/forward/SEO';

const PrivacyPolice = (): JSX.Element => (
  <>
    <SEO title="Política de Privacidade">
      <meta name="robots" content="noindex,nofollow" />
    </SEO>

    <div className="bowl-content py-20">
      <h1 className="font-bold  text-3xl md:text-6xl">
        POLÍTICA DE PRIVACIDADE
      </h1>

      <div className="mt-12">
        <ReactMarkdown children={Police} />
      </div>
    </div>
  </>
);

export default PrivacyPolice;

/* eslint react/no-children-prop: off */
