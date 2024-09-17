import { InputHTMLAttributes } from 'react';

import { Container } from './styles';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  color?: string;
  iconColor?: string;
  textColor?: string;
}

export function Checkbox({
  id = 'check',
  label,
  color,
  iconColor,
  textColor,
  ...rest
}: Props): JSX.Element {
  return (
    <Container textColor={textColor} color={color} iconColor={iconColor}>
      <input id={id} type="checkbox" {...rest} />

      {label && <label htmlFor={id}>{label}</label>}
    </Container>
  );
}
