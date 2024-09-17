import { Route, Switch, Redirect } from 'react-router-dom';

import { CustomerRoutes } from './Customer.routes';
import { DiaristRoutes } from './Diarist.routes';
import { EmployeeRoutes } from './Employee.routes';
import { FinancialRoutes } from './Financial.routes';
import { LogsRoutes } from './Logs.routes';
import { MainRoutes } from './Main.routes';
import { ServiceRoutes } from './Service.routes';

export function RoutesManager(): JSX.Element {
  return (
    <Switch>
      <Route path="/logs">
        <LogsRoutes />
      </Route>

      <Route path="/employees">
        <EmployeeRoutes />
      </Route>

      <Route path="/financial">
        <FinancialRoutes />
      </Route>

      <Route path="/diarists">
        <DiaristRoutes />
      </Route>

      <Route path="/services">
        <ServiceRoutes />
      </Route>

      <Route path="/customers">
        <CustomerRoutes />
      </Route>

      <Route path="/">
        <MainRoutes />
      </Route>

      {/* 404 */}

      <Route path="*">
        <Redirect to="/" />
      </Route>
    </Switch>
  );
}
