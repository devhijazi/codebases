import {
  EmployeeDocument,
  SessionLoginData,
  SessionLoginDocument,
} from '@marinetes/types/dtos/financial/api';
import { PropsWithChildren } from '@marinetes/types/modules/react';
import { createContext, useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { api } from '@modules/services/api';
import { actions } from '@store/modules/auth/actions';

type Employee = EmployeeDocument;

export interface AuthContextData {
  ready: boolean;
  employee: Employee | null;

  signIn(data: SessionLoginData): Promise<void>;
  authenticate(data: SessionLoginDocument): void;
  retrieveEmployee: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData,
);

export const AuthProvider = ({ children }: PropsWithChildren): JSX.Element => {
  const { push } = useHistory();

  const dispatch = useDispatch();
  const { signed } = useSelector(({ auth }) => auth);

  const [ready, updateReady] = useState(false);
  const [employee, updateEmployee] = useState<Employee | null>(null);

  const authenticate = useCallback(
    (data: SessionLoginDocument) => {
      updateEmployee(data.user);

      setTimeout(() => {
        dispatch(
          actions.signInRequest({
            token: data.token,
          }),
        );

        push('/app');
      }, 0);
    },
    [push, dispatch, updateEmployee],
  );

  const signIn = useCallback(
    async ({ email, password }: SessionLoginData) => {
      const { data: loginData } = await api.post<SessionLoginDocument>(
        'sessions/login',
        {
          email,
          password,
        },
      );

      authenticate(loginData);
    },
    [authenticate],
  );

  const retrieveEmployee = useCallback(async () => {
    try {
      const { data: employeeData } = await api.get<EmployeeDocument>('me');

      updateEmployee(employeeData);
    } catch {
      dispatch(actions.logOut({}));
    }
  }, [updateEmployee, dispatch]);

  const load = useCallback(async () => {
    if (!signed) {
      updateReady(true);
      return;
    }

    await retrieveEmployee();

    updateReady(true);
  }, [signed, retrieveEmployee]);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <AuthContext.Provider
      value={{
        ready,
        employee,
        authenticate,
        signIn,
        retrieveEmployee,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
