import { useContext } from 'react';

import { AuthContext, AuthContextData } from '@resources/contexts/Auth';

export const useAuth = (): AuthContextData => useContext(AuthContext);
