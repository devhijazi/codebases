import { useRouter } from 'next/router';
import { useEffect } from 'react';

export function useRouterChange(listener: (...params: any[]) => any): void {
  const { events, asPath } = useRouter();

  useEffect(() => {
    listener(asPath);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    events.on('routeChangeComplete', listener);

    return () => {
      events.off('routeChangeComplete', listener);
    };
  }, [events, listener]);
}
