import { ButtonHTMLAttributes } from 'react';

import { Container } from './styles';

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ type, children, ...rest }: ButtonProps): JSX.Element {
  return (
    <Container type={type ?? 'button'} {...rest}>
      {children}
    </Container>
  );
}
