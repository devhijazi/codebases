import type { HTMLAttributes } from 'react';
import type { IconType } from 'react-icons';

export interface SelectOption<T = any> {
  value: T;
  label: string;
}

export interface BaseSelectProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'disabled'> {
  name: string;
  disabled?: boolean;
  basedClassName: string;
  label?: string;
  title?: string;
  options: SelectOption[];
  icon?: IconType;
  onChange?(option: SelectOption): any;
}
