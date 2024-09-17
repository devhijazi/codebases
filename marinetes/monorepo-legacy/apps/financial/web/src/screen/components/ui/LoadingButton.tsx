import type { ButtonHTMLAttributes } from 'react';

import { Button } from '@screen/components/ui/Button';
import { Spinner } from '@screen/components/ui/Spinner';

export type LoadingButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading: boolean;
};

export function LoadingButton({
  children,
  disabled,
  loading,
  ...rest
}: LoadingButtonProps): JSX.Element {
  return (
    <Button {...rest} disabled={disabled || loading}>
      {loading ? <Spinner size="22px" color="#fff" /> : children}
    </Button>
  );
}
