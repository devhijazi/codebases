import ReactMarkdown from 'react-markdown';

import FAQ from '@/means/markdown/faq.c.md';
import { SEO } from '@/screen/components/forward/SEO';

const FrequentQuestions = (): JSX.Element => (
  <>
    <SEO title="FAQ">
      <meta name="robots" content="noindex,nofollow" />
    </SEO>

    <div className="bowl-content py-20">
      <h1 className="font-bold  text-3xl md:text-6xl">FAQ - Marinetes</h1>

      <div className="mt-12">
        <ReactMarkdown children={FAQ} />
      </div>
    </div>
  </>
);

export default FrequentQuestions;

/* eslint react/no-children-prop: off */
