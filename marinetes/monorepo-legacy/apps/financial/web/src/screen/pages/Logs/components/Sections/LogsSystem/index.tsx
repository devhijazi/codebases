// import { Log } from '@screen/components/ui/Log';

import { Container, Input } from './styles';

export function LogsSystem(): JSX.Element {
  // const data = [1, 2, 3, 4, 5, 7, 8, 9, 10, 11, 12, 13];

  return (
    <Container>
      <header>
        <p>
          Logs de <br /> <strong>Sistema</strong>
        </p>

        <Input placeholder="Pesquisar..." />
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
    </Container>
  );
}
