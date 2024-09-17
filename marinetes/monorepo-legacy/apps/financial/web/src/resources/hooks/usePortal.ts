import { useContext } from 'react';

import { PortalContext, PortalContextData } from '@resources/contexts/Portal';

export const usePortal = (): PortalContextData => useContext(PortalContext);
