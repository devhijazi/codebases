import { useContext } from 'react';

import { UIContext, UIContextData } from '@screen/view/UI';

export const useUI = (): UIContextData => useContext(UIContext);
