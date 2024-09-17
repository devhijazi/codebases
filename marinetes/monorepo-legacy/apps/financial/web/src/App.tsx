import { logger } from '@hitechline/reactools';
import { createPortal } from 'react-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { PersistGate } from 'redux-persist/integration/react';

import { RoutesManager } from '@/routes/RoutesManager';
import { store, persistor } from '@/store';
import { AuthProvider } from '@resources/contexts/Auth';
import { PortalProvider } from '@resources/contexts/Portal';
import { GlobalStyle } from '@screen/styles/GlobalStyle';
import { Layout } from '@screen/view/Layout';
import { UIProvider } from '@screen/view/UI';

if (process.env.NODE_ENV === 'production') {
  logger.disable();
}

export const App = (): JSX.Element => (
  <ReduxProvider store={store}>
    <PersistGate persistor={persistor}>
      <PortalProvider>
        <UIProvider>
          <Router>
            <AuthProvider>
              <Layout>
                <RoutesManager />
              </Layout>
            </AuthProvider>
          </Router>
        </UIProvider>
      </PortalProvider>

      {createPortal(<ToastContainer autoClose={3000} />, document.body)}
      <GlobalStyle />
    </PersistGate>
  </ReduxProvider>
);
