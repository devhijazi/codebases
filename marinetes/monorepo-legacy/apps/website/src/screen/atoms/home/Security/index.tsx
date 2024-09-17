import { RevealOnScroll } from '@/screen/components/effect/RevealOnScroll';
import { StoreButton } from '@/screen/components/ui/StoreButton';

export const Security = (): JSX.Element => {
  return (
    <section>
      <div
        className="flex justify-start items-center min-h-[400px] h-screen"
        style={{
          background: `url(/images/marinetesbg.png)`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundOrigin: 'padding-box',
          backgroundPosition: 'center',
        }}
      >
        <RevealOnScroll>
          <div className="bowl-content flex justify-start w-max py-10">
            <div className="flex items-center bg-white bg-opacity-80">
              <div className="flex flex-col p-10 gap-3">
                <h1 className="font-bold text-2xl md:text-5xl text-zinc-800">
                  Segurança
                </h1>

                <h2 className="font-normal text-md md:text-2xl text-zinc-800">
                  A sua segurança é nossa prioridade.
                </h2>

                <p className="font-normal text-sm md:text-md text-favorite">
                  Solicite já sua diarista com segurança pela plataforma
                  Marinetes
                </p>

                <div className="mt-4 justify-center flex flex-col items-center gap-4 md:flex-row">
                  <StoreButton type="ios" variant="green" />
                  <StoreButton type="android" variant="green" />
                </div>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
};
