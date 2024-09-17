import { createContext } from 'react';

import type { FormContextData } from './types';

export const FormContext = createContext<FormContextData>(
  {} as FormContextData,
);
