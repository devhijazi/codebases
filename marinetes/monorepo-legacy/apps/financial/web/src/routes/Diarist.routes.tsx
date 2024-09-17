import { Route, Switch } from 'react-router-dom';

import { Diarists } from '@/screen/pages/Diarist';
import { DiaristCreate } from '@/screen/pages/Diarist/pages/Create';
import { DiaristShow } from '@/screen/pages/Diarist/pages/Show';
import { useBuildRoute } from '@resources/hooks/useBuildRoute';

export const DiaristRoutes = (): JSX.Element => {
  const { make } = useBuildRoute('/diarists');

  return (
    <Switch>
      <Route path={make('/')} exact>
        <Diarists />
      </Route>

      <Route path={make('/create')} exact>
        <DiaristCreate />
      </Route>

      <Route path={make('/:id')} exact>
        <DiaristShow />
      </Route>
    </Switch>
  );
};
