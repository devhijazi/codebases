import { CaretRight } from 'phosphor-react';
import type { LinkHTMLAttributes } from 'react';

import { Link } from '@/screen/components/forward/Link';
import { BaseButton } from '@/screen/components/ui/BaseButton';

export interface RegisterButtonProps
  extends LinkHTMLAttributes<HTMLLinkElement> {}

export const RegisterButton = (props: RegisterButtonProps): JSX.Element => (
  <BaseButton
    {...props}
    asProp={Link}
    href="/register"
    className="font-semibold flex items-center rounded-sm text-white bg-gradient-to-r to-green-400 from-favorite"
  >
    <span className="text-lg mr-2">QUERO SER DIARISTA</span>
    <CaretRight size={18} weight="fill" />
  </BaseButton>
);
