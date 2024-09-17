import type { PropsWithChildren } from '@marinetes/types/modules/react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

export function NotLogged({ children }: PropsWithChildren): JSX.Element {
  const history = useHistory();
  const { signed } = useSelector(state => state.auth);

  useEffect(() => {
    if (!signed) {
      return;
    }

    history.push('/app');
  }, [signed, history]);

  return <>{children}</>;
}
