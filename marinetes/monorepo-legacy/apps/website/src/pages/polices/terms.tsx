import ReactMarkdown from 'react-markdown';

import Terms from '@/means/markdown/terms-use.c.md';
import { SEO } from '@/screen/components/forward/SEO';

const TermsPolice = (): JSX.Element => (
  <>
    <SEO title="Termos de Uso">
      <meta name="robots" content="noindex,nofollow" />
    </SEO>

    <div className="bowl-content py-20">
      <h1 className="font-bold text-2xl md:text-6xl">Termos de Uso</h1>
      <h3 className="font-bold ">
        Seja bem-vindo ao nosso site. Leia com atenção todos os termos abaixo.
      </h3>

      <div className="mt-12">
        <ReactMarkdown children={Terms} />
      </div>
    </div>
  </>
);

export default TermsPolice;

/* eslint react/no-children-prop: off */
