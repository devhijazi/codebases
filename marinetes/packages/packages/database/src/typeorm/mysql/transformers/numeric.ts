import type { ValueTransformer } from 'typeorm';

export const numericTransformer: ValueTransformer = {
  to(data?: number | null): number | null {
    if (!data && typeof data !== 'number') {
      return null;
    }

    return data;
  },
  from(data?: string | null): any {
    if (!data && typeof data !== 'number') {
      return data;
    }

    const res = parseFloat(data);

    // eslint-disable-next-line no-restricted-globals
    if (isNaN(res)) {
      return data;
    }

    return res;
  },
};
