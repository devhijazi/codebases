import { Star } from 'phosphor-react';

import { reason } from '@/means/data/security';
import { RevealOnScroll } from '@/screen/components/effect/RevealOnScroll';

import styles from './styles.module.css';

export const Main = (): JSX.Element => {
  return (
    <section className="relative">
      <div className={styles.main}>
        <div className="py-24 spacing-x max-w-6xl w-full mx-auto">
          <section className="text-floor-white z-10 drop-shadow-md">
            <span className="text-2xl font-semibold">
              Sua segurança é nossa prioridade
            </span>
            <h1 className="text-5xl font-bold text-favorite">
              Marinete&apos;s Clean House
            </h1>
          </section>

          <div className="flex p-6 mt-52 flex-wrap justify-between bg-slate-100 bg-opacity-80">
            {reason.map(({ title, description }) => (
              <div key={title} className="max-w-md p-6">
                <RevealOnScroll>
                  <Star size={25} color="#7fbe3c" weight="fill" />

                  <h4 className="mt-2 font-bold">{title}</h4>
                  <p className="mt-1">{description}</p>
                </RevealOnScroll>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
