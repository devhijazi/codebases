import { useWizard } from '@hitechline/react-wizard';
import { mergeClassNames } from '@hitechline/reactools';
import { useRouter } from 'next/router';
import { useContext, useCallback, useMemo } from 'react';

import { WizardContext } from '@/screen/components/forward/Wizard';
import { Spinner } from '@/screen/components/ui/Spinner';

import styles from './styles.module.css';

export const WizardFooter = (): JSX.Element => {
  const router = useRouter();

  const { current } = useWizard();
  const { emitter, loading } = useContext(WizardContext);

  const next = useCallback(() => {
    emitter.current?.emit('next');

    if (current !== 0) {
      router.push('/');
    }
  }, [emitter, current, router]);

  const rightIcon = useMemo(
    () => (current === 0 ? 'Finalizar registro' : 'Voltar ao inicio'),
    [current],
  );

  return (
    <div className="w-full my-20 flex justify-center items-center gap-2">
      <>
        <button
          type="button"
          disabled={loading}
          className={mergeClassNames(styles['icon-button'], 'w-auto px-10')}
          onClick={next}
        >
          {loading ? <Spinner /> : rightIcon}
        </button>
      </>
    </div>
  );
};
