import { apply } from '@/resources/cases/apply';
import { Logged } from '@/resources/cases/Logged';
import { DefaultLayout } from '@/screen/layouts/DefaultLayout';

import { BoxBalance } from './components/BoxBalance';
import { BoxEntrance } from './components/BoxEntrance';
import { BoxInfo } from './components/BoxInfo';
import { BoxPerformance } from './components/BoxPerformance';
import { BoxService } from './components/BoxService';
import { Container, Content, Section } from './styles';

export const Financial = apply(
  (): JSX.Element => {
    return (
      <Container className="bowl-content padding-y">
        <Content>
          <Section>
            <BoxEntrance />
            <BoxService />
            <BoxBalance />
            <BoxPerformance />
          </Section>

          <BoxInfo />
        </Content>
      </Container>
    );
  },
  {
    cases: [Logged],
    layout: DefaultLayout,
  },
);
