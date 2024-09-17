import { Container, SpinnerContainer } from './styles';

export const StandardLoader = (): JSX.Element => (
  <Container>
    <SpinnerContainer>
      <span />
    </SpinnerContainer>
  </Container>
);
