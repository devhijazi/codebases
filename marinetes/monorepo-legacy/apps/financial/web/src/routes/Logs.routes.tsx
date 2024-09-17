import { Route, Switch } from 'react-router-dom';

import { Logs } from '@/screen/pages/Logs';
import { useBuildRoute } from '@resources/hooks/useBuildRoute';

export const LogsRoutes = (): JSX.Element => {
  const { make } = useBuildRoute('/logs');

  return (
    <Switch>
      <Route path={make('/')} exact>
        <Logs />
      </Route>
    </Switch>
  );
};
