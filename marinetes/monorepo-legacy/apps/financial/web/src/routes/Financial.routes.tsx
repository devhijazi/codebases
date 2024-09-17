import { Route, Switch } from 'react-router-dom';

import { Financial } from '@/screen/pages/Financial';
import { useBuildRoute } from '@resources/hooks/useBuildRoute';

export const FinancialRoutes = (): JSX.Element => {
  const { make } = useBuildRoute('/financial');

  return (
    <Switch>
      <Route path={make('/')} exact>
        <Financial />
      </Route>
    </Switch>
  );
};
