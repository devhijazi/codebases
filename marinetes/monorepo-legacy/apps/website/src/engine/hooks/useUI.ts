import { useContext } from 'react';

import { UIContext, UIContextData } from '@screen/view/UI';

export function useUI(): UIContextData {
  const data = useContext<UIContextData>(UIContext);

  return data;
}
