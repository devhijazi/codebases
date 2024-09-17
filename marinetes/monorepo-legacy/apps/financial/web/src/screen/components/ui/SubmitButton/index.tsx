import { ButtonHTMLAttributes, useContext } from 'react';

import { FormContext } from '@screen/components/forward/Form';
import { Button } from '@screen/components/ui/Button';
import { Spinner } from '@screen/components/ui/Spinner';

export type SubmitButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function SubmitButton({
  children,
  disabled,
  ...rest
}: SubmitButtonProps): JSX.Element {
  const { loading } = useContext(FormContext);

  return (
    <Button {...rest} disabled={disabled || loading}>
      {loading ? <Spinner size="22px" color="#fff" /> : children}
    </Button>
  );
}
