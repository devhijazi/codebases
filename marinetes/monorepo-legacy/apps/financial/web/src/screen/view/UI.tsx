import type { PropsWithChildren } from '@marinetes/types/modules/react';
import { createContext, useState, useCallback } from 'react';

import { StandardLoader } from '@screen/components/ui/StandardLoader';

export interface UIContextData {
  setLoading(isLoading: boolean): void;
}

export const UIContext = createContext({} as UIContextData);

export function UIProvider({ children }: PropsWithChildren): JSX.Element {
  const [loading, updateLoading] = useState(false);

  const setLoading = useCallback((isLoading: boolean) => {
    updateLoading(Boolean(isLoading));
  }, []);

  return (
    <UIContext.Provider
      value={{
        setLoading,
      }}
    >
      {loading && <StandardLoader />}

      <div id="app">{children}</div>
    </UIContext.Provider>
  );
}
