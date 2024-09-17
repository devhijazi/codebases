import NextImage from 'next/image';

import { Link } from '@/screen/components/forward/Link';
import { RegisterButton } from '@/screen/components/ui/RegisterButton';
import WhiteLogo from '@means/assets/png/small_logo_white.png';

export const Main = (): JSX.Element => (
  <footer className="py-8 text-white bg-floor-dark">
    <div className="bowl-content">
      <section className="flex items-center justify-between">
        <div className="flex flex-col justify-center items-center gap-2">
          <NextImage src={WhiteLogo} alt="Logo" />

          <p className="font-bold text-sm">Marinete’s Clean House</p>
        </div>

        <div>
          <RegisterButton />
        </div>
      </section>

      <div className="my-8 h-px w-full bg-opacity-10 bg-white" />

      <section className="flex flex-col items-center justify-center">
        <p className="text-white text-xs">Powered by</p>

        <span className="text-white text-sm">
          <a
            href="http://hitechline.com.br"
            target="_blank"
            rel="noreferrer noppener"
          >
            Hitechline Tecnologia
          </a>
        </span>
      </section>

      <section className="mt-4 flex text-sm flex-wrap items-center justify-center gap-2">
        <Link href="/polices/privacy" className="hover:underline">
          Política de privacidade
        </Link>
        <Link href="/polices/terms" className="hover:underline">
          Termos e condições
        </Link>
        <Link href="/faq" className="hover:underline">
          FAQ
        </Link>
      </section>

      <section className="mt-2 text-center">
        <p>
          ©Marinetes {new Date().getFullYear()} - Todos os direitos reservados.
        </p>
      </section>
    </div>
  </footer>
);
