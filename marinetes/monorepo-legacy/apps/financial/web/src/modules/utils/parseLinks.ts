import type { LinkType } from '@resources/data/links';

export interface ParseLinksOptions {
  isEmployee: boolean;
}

export function parseLinks<T extends LinkType>(
  links: T[],
  options: ParseLinksOptions,
): T[] {
  const { isEmployee } = options;

  return links.filter(link => {
    const hasEmployee = 'employee' in link;

    if (!hasEmployee) {
      return true;
    }

    if (link.employee) {
      return isEmployee;
    }

    return true;
  });
}
