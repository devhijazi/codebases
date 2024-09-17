import { apply } from '@/resources/cases/apply';
import { Logged } from '@/resources/cases/Logged';
import { DefaultLayout } from '@/screen/layouts/DefaultLayout';

import { PersonalData } from './components/Sections';
import { Container, Content } from './styles';

export const EmployeeInfo = apply(
  (): JSX.Element => {
    return (
      <Container className="bowl-content padding-y">
        <Content>
          <PersonalData />
        </Content>
      </Container>
    );
  },
  {
    layout: DefaultLayout,
    cases: [Logged],
  },
);
