import { Route, Switch } from 'react-router-dom';

import { ResetPassword } from '@/screen/pages/ResetPassword';
import { useBuildRoute } from '@resources/hooks/useBuildRoute';
// import { ForgotPassword } from '@screen/pages/ForgotPassword';
import { Home } from '@screen/pages/Home';
import { Login } from '@screen/pages/Login';

export function MainRoutes(): JSX.Element {
  const { base, make } = useBuildRoute('/');

  return (
    <Switch>
      <Route path={base} exact>
        <Login />
      </Route>
      {/* 
      <Route path={make('forgot-password')}>
        <ForgotPassword />
      </Route> */}

      <Route path={make('reset-password')}>
        <ResetPassword />
      </Route>

      <Route path={make('app')}>
        <Home />
      </Route>
    </Switch>
  );
}
