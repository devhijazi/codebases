import type { FocusEventHandler, InputHTMLAttributes } from 'react';
import type { IconType } from 'react-icons';

export interface BaseInputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  mask?: any;
  basedClassName: string;
  icon?: IconType;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  onFocus?: FocusEventHandler<HTMLInputElement>;
}
