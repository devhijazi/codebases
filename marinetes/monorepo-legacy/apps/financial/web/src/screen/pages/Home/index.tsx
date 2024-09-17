import { Card } from '@/screen/components/ui/Cards/Card';
import { apply } from '@resources/cases/apply';
import { Logged } from '@resources/cases/Logged';
// import { Log } from '@screen/components/ui/Log';
import { DefaultLayout } from '@screen/layouts/DefaultLayout';

import {
  Container,
  Content,
  CardContainer,
  BoxSearch,
  Button,
  DivInfo,
  Input,
} from './styles';

export const Home = apply(
  (): JSX.Element => {
    return (
      <Container className="bowl-content padding-y">
        <Content>
          <CardContainer>
            <Card
              title="Cadastros"
              dataOptions={{
                total: {
                  label: 'Total de cadastros',
                  value: 0,
                },
                left: {
                  label: 'Em andamento',
                  value: 0,
                },
                right: {
                  label: 'Programados',
                  value: 0,
                },
              }}
            />
            <Card
              title="Serviços mensais"
              dataOptions={{
                total: {
                  label: 'Finalizados',
                  value: 0,
                },
                left: {
                  label: 'Em andamento',
                  value: 0,
                },
                right: {
                  label: 'Programados',
                  value: 0,
                },
              }}
            />
            <Card
              title="Dados Globais"
              dataOptions={{
                total: {
                  label: 'Total de usuários',
                  value: 0,
                },
                left: {
                  label: 'Android',
                  value: 0,
                },
                right: {
                  label: 'IOS',
                  value: 0,
                },
              }}
            />
          </CardContainer>

          <DivInfo>
            <BoxSearch>
              <header>
                <p>
                  Logs de <strong>Serviços</strong>
                </p>
                <Input type="text" placeholder="Pesquise por um serviço." />
                <Button type="button">Visualizar todos</Button>
              </header>

              <section>
                <div className="warn">
                  <p>
                    Serviço temporariamente indisponível ou ainda não possui uma
                    implementação estável,aguarde os desenvolvedores.
                  </p>
                </div>
                {/* {data.map(index => {
                  return (
                    <Log
                      key={index}
                      index={index}
                      sender={{
                        type: 'Cliente',
                        name: 'Claire Redfield',
                      }}
                      message="Confirmou a chegada"
                      receiver={{
                        type: 'Diarista',
                        name: 'Jill Valentine',
                      }}
                    />
                  );
                })} */}
              </section>
            </BoxSearch>
          </DivInfo>
        </Content>
      </Container>
    );
  },
  {
    layout: DefaultLayout,
    cases: [Logged],
  },
);
