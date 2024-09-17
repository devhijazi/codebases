import { Wizard as ReactWizard } from '@hitechline/react-wizard';
import { useState, useRef, useCallback, useMemo, ReactNode } from 'react';

import { WizardContext } from './Context';
import type { WizardEvent, WizardListener } from './types';
import { WizardEmitter } from './WizardEmitter';

export interface WizardProps {
  children: ReactNode;
}

export function Wizard({ children }: WizardProps): JSX.Element {
  const emitter = useRef<WizardEmitter>(new WizardEmitter());

  const [loading, updateLoading] = useState(false);

  const addListener = useCallback(
    (event: WizardEvent, listener: WizardListener): void => {
      emitter.current.addListener(event, listener);
    },
    [],
  );

  const removeListener = useCallback(
    (event: WizardEvent, listener: WizardListener): void => {
      emitter.current.removeListener(event, listener);
    },
    [],
  );

  const contextValue = useMemo(
    () => ({
      loading,
      emitter,
      updateLoading,
      addListener,
      removeListener,
    }),
    [loading, emitter, updateLoading, addListener, removeListener],
  );

  return (
    <WizardContext.Provider value={contextValue}>
      <ReactWizard>{children}</ReactWizard>
    </WizardContext.Provider>
  );
}
