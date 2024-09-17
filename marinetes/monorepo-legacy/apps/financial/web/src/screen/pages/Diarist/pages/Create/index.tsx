import { WizardSteps } from '@hitechline/react-wizard';

import { WizardDataProvider } from '@/resources/contexts/WizardData';
import { Wizard, WizardHeader } from '@/screen/components/forward/Wizard';
import { apply } from '@resources/cases/apply';
import { Logged } from '@resources/cases/Logged';
import { DefaultLayout } from '@screen/layouts/DefaultLayout';

import { Address, PersonalData } from './components/Steps';
import { WizardFooter } from './components/WizardFooter';
import { Container, Content } from './styles';

export const DiaristCreate = apply(
  (): JSX.Element => {
    return (
      <Container className="bowl-content padding-y">
        <Content>
          <Wizard>
            <WizardHeader titles={['Informações pessoais', 'Endereço']} />

            <WizardSteps>
              <PersonalData />
              <Address />
            </WizardSteps>

            <WizardFooter />
          </Wizard>
        </Content>
      </Container>
    );
  },
  {
    layout: DefaultLayout,
    cases: [Logged, WizardDataProvider],
  },
);
