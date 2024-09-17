import type { PropsWithChildren } from '@marinetes/types/modules/react';
import dot from 'dot-object';
import { useCallback, createContext, useState } from 'react';

import nestedObjectAssign from 'nested-object-assign';

const defaultData = {};

export interface WizardDataData {
  data: Record<string, any>;
  clearData(): void;
  setData(data: Record<string, any>): Record<string, any>;
}

const defaultContextData = {
  data: defaultData,
} as WizardDataData;

export const WizardDataContext =
  createContext<WizardDataData>(defaultContextData);

export const WizardDataProvider = ({
  children,
}: PropsWithChildren): JSX.Element => {
  const [data, updateData] = useState<Record<string, any>>(defaultData);

  const clearData = useCallback(() => {
    updateData(defaultData);
  }, []);

  const setData = useCallback(
    (newData: Record<string, any>) => {
      const newDataObject = dot.object(newData);
      const assignedData = nestedObjectAssign({}, data, newDataObject);

      updateData(assignedData);
      return assignedData;
    },
    [data],
  );

  return (
    <WizardDataContext.Provider value={{ data, clearData, setData }}>
      {children}
    </WizardDataContext.Provider>
  );
};
