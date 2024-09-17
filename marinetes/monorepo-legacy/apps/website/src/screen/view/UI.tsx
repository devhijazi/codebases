import { createContext, useCallback, useState } from 'react';

import { StandardLoader } from '@/screen/components/ui/StandardLoader';

export interface UIContextData {
  loading: boolean;
  setLoading(isLoading: boolean): void;
}

export const UIContext = createContext({} as UIContextData);

export const UIProvider = ({ children }: PropsWithChildren): JSX.Element => {
  const [loading, updateLoading] = useState(false);

  const setLoading = useCallback((isLoading: boolean) => {
    updateLoading(Boolean(isLoading));
  }, []);

  return (
    <UIContext.Provider
      value={{
        setLoading,
        loading,
      }}
    >
      {loading && <StandardLoader />}

      {children}
    </UIContext.Provider>
  );
};
