import { Spinner } from '@/screen/components/ui/Spinner';

import { Container } from './styles';

export const StandardLoader = (): JSX.Element => (
  <Container>
    <Spinner />
  </Container>
);
