import { useRef, useCallback } from 'react';

interface BuildedRoute {
  base: string;
  make(path: string): string;
}

export function useBuildRoute(basePath: string): BuildedRoute {
  const basePathRef = useRef(basePath);

  const make = useCallback((path: string) => {
    return `${basePathRef.current}${path}`;
  }, []);

  return {
    make,
    base: basePath,
  };
}
