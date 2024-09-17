import { WizardSteps } from '@hitechline/react-wizard';

import { WizardDataProvider } from '@/engine/contexts/WizardData';
import { Wizard, WizardHeader } from '@/screen/components/forward/Wizard';

import { RegisterPersonal } from './steps/Personal';
import { RegisterComplete } from './steps/Success';
import { WizardFooter } from './WizardFooter';

export const Main = (): JSX.Element => {
  return (
    <WizardDataProvider>
      <section className="bowl-content flex flex-col gap-5 mt-10 w-full bg-white items-center justify-center md:gap-14">
        <h1 className="text-xl md:text-3xl font-bold text-gray-500 text-center">
          Cadastre-se e garante a sua
          <span className="text-favorite text-start">
            {' '}
            liberdade financeira!
          </span>
        </h1>

        <Wizard>
          <WizardHeader />

          <WizardSteps>
            <RegisterPersonal />
            <RegisterComplete />
          </WizardSteps>

          <WizardFooter />
        </Wizard>
      </section>
    </WizardDataProvider>
  );
};
