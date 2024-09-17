import { Container } from './styles';

interface LoadingProps {
  color?: string;
}

export function Loading({ color }: LoadingProps): JSX.Element {
  return <Container color={color} />;
}
