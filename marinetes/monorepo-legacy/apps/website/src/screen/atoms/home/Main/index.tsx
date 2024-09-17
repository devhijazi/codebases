import NextImage from 'next/image';

import Marinete from '@/means/assets/png/diarist.png';
import Logo from '@/means/assets/png/logo.png';

import styles from './styles.module.css';

export const Main = (): JSX.Element => (
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
      <div className="flex justify-center w-max bowl-content">
        <div className={styles.mainRow}>
          <div className="flex flex-col items-center">
            <div className={styles.mainLogo}>
              <NextImage src={Logo} alt="Diarist" />
            </div>

            <p className={styles.mainText}>
              O modo mais <b>fácil</b>, <b>rápido</b> e <b>seguro</b> de cuidar
              da limpeza do seu lar.
            </p>
          </div>

          <div className={styles.marineteWrapper}>
            <div className={styles.marinete}>
              <NextImage src={Marinete} />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);
