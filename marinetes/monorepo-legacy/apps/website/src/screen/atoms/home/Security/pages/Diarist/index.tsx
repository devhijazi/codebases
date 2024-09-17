import { Star } from 'phosphor-react';

import styles from './styles.module.css';

type Reason = {
  icon: any;
  title: string;
  description: string;
};

const reasons: Reason[] = [
  {
    icon: Star,
    title: 'Motivo 1',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus magnam atque quos sunt, provident dolor corporis, quo iusto, eius distinctio quaerat ipsam? Est eveniet dicta ullam impedit itaque at unde!',
  },
];

export const Main = (): JSX.Element => {
  return (
    <section className="relative">
      <div className={styles.main}>
        <div className="py-24 spacing-x max-w-6xl w-full mx-auto">
          <section className="text-floor-white z-10 drop-shadow-md">
            <span className="text-2xl font-semibold">
              Escolha sua segurança,
            </span>
            <h1 className="text-5xl font-bold">Escolha a Urbano Norte.</h1>
          </section>

          <div className="flex p-6 mt-64 flex-wrap justify-between bg-floor-white bg-opacity-80">
            {Array.from({ length: 6 }, (_, index) => ({
              ...reasons[0],
              id: index,
            })).map(reason => (
              <div key={reason.id} className="max-w-md p-6">
                <reason.icon size={25} color="#4ccd73" weight="fill" />

                <h4 className="mt-2 font-bold">{reason.title}</h4>
                <p className="mt-1">{reason.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
