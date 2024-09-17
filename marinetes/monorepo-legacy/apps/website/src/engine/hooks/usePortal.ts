import { useContext } from 'react';

import { PortalContext, PortalContextData } from '@/engine/contexts/Portal';

export const usePortal = (): PortalContextData => useContext(PortalContext);
