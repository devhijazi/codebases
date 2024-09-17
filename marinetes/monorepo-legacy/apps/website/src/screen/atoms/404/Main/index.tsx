import { useRouter } from 'next/router';
import { useCallback } from 'react';

import { BaseButton } from '@/screen/components/ui/BaseButton';

import styles from './styles.module.css';

export const Main = (): JSX.Element => {
  const { push } = useRouter();

  const handleBackToHome = useCallback(() => {
    push('/');
  }, [push]);

  return (
    <section>
      <div
        className="flex justify-start items-center"
        style={{
          background: `url(/images/kit.png)`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundOrigin: 'padding-box',
        }}
      >
        <div className={styles.main}>
          <div className="py-20 flex items-center flex-col justify-center text-center">
            <div>
              <h1 className={styles.title}>404</h1>

              <h3 className="font-light text-3xl md:text-5xl uppercase">
                Página não encontrada
              </h3>

              <BaseButton
                onClick={handleBackToHome}
                className="px-8 mt-6 mx-auto font-bold rounded-full text-white bg-gradient-to-r to-green-500 from-green-300"
              >
                <span className="text-sm">VOLTAR Á PÁGINA ANTERIOR</span>
              </BaseButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
