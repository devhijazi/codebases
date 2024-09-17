import { Route, Switch } from 'react-router-dom';

import { Employees } from '@/screen/pages/Employees';
import { EmployeeInfo } from '@/screen/pages/Employees/pages/Info';
import { useBuildRoute } from '@resources/hooks/useBuildRoute';

export const EmployeeRoutes = (): JSX.Element => {
  const { make } = useBuildRoute('/employees');

  return (
    <Switch>
      <Route path={make('/')} exact>
        <Employees />
      </Route>

      <Route path={make('/:id/info')} exact>
        <EmployeeInfo />
      </Route>
    </Switch>
  );
};
