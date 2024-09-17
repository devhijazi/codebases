import { Container } from './styles';

export const BankData = (): JSX.Element => {
  return (
    <Container>
      <div className="warn">
        <p>
          Serviço temporariamente indisponível ou ainda não possui uma
          implementação estável, aguarde os desenvolvedores.
        </p>
      </div>
    </Container>
  );
};
