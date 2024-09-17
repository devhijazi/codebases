import NextImage from 'next/image';

import Device from '@/means/assets/png/device.png';
import { RevealOnScroll } from '@/screen/components/effect/RevealOnScroll';
import { StoreButton } from '@/screen/components/ui/StoreButton';

export const Stores = (): JSX.Element => (
  <section className="py-16 text-white bg-gradient-to-r from-favorite to-favorite">
    <RevealOnScroll>
      <div className="bowl-content">
        <div className="flex justify-center flex-col lg:flex-row items-center gap-14">
          <div>
            <h1 className="font-bold text-6xl text-center">Baixe já!</h1>
            <p className="max-w-2xl text-xl text-center mt-4">
              Está precisando de uma diarista? baixe agora mesmo o app e
              solicite já!
            </p>

            <section className="mt-10 justify-center flex flex-col items-center gap-4 md:flex-row">
              <StoreButton type="ios" />
              <StoreButton type="android" />
            </section>
          </div>

          <div className="w-full max-w-md flex">
            <NextImage src={Device} />
          </div>
        </div>

        <div className="text-center mt-20">
          <p className="text-1xl">
            O modo <strong>mais fácil</strong> e <strong>rápido</strong> de
            cuidar da <strong>limpeza</strong> do seu lar. Facilitamos a busca
            por profissionais de limpeza/faxinas,{' '}
            <strong>
              conectando você com diversas diaristas profissionais
            </strong>
            , na data e hora que desejar.
          </p>
        </div>
      </div>
    </RevealOnScroll>
  </section>
);
