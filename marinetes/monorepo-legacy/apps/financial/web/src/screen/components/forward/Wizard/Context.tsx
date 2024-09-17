import { createContext, ReactNode } from 'react';

import { WizardContextData } from './types';

export interface WizardProviderProps {
  children: ReactNode;
}

export const WizardContext = createContext<WizardContextData>(
  {} as WizardContextData,
);
