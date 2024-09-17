import { WizardContext, WizardContextData } from '@hitechline/react-wizard';
import { useContext } from 'react';

export function useWizard(): WizardContextData {
  const context = useContext(WizardContext);

  return context;
}
