import { Route, Switch } from 'react-router-dom';

import { Services } from '@/screen/pages/Service';
import { useBuildRoute } from '@resources/hooks/useBuildRoute';

export const ServiceRoutes = (): JSX.Element => {
  const { make } = useBuildRoute('/services');

  return (
    <Switch>
      <Route path={make('/')} exact>
        <Services />
      </Route>
    </Switch>
  );
};
