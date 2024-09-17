import { Route, Switch } from 'react-router-dom';

import { Customers } from '@/screen/pages/Customer';
import { useBuildRoute } from '@resources/hooks/useBuildRoute';

export const CustomerRoutes = (): JSX.Element => {
  const { make } = useBuildRoute('/customers');

  return (
    <Switch>
      <Route path={make('/')} exact>
        <Customers />
      </Route>
    </Switch>
  );
};
