import { Container } from './styles';

interface SpinnerProps {
  size?: string;
  color?: string;
}

export const Spinner = ({
  size = '40px',
  color = 'var(--color-light-favorite)',
}: SpinnerProps): JSX.Element => (
  <Container className="spinner" size={size} color={color}>
    <span />
  </Container>
);
