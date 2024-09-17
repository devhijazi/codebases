import { createMedia } from '@artsy/fresnel';

type BreakPointsKeys = 'all' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

type BreakPointsType = Record<BreakPointsKeys, number>;

const NUMBER_REGEX = /^(\d+)/;

const TAILWIND_SCREENS_KEYS = ['sm', 'md', 'lg', 'xl', '2xl'] as const;
const DEFAULT_BREAKPOINTS: Partial<BreakPointsType> = {
  all: 0,
};

const screens = {
  'all': '0px',
  'sm': '640px',
  'md': '768px',
  'lg': '1024px',
  'xl': '1280px',
  '2xl': '1536px',
} as const;

const breakpoints: BreakPointsType =
  TAILWIND_SCREENS_KEYS.reduce<BreakPointsType>(
    (breakpointsObject, breakpointKey): BreakPointsType => ({
      ...breakpointsObject,
      [breakpointKey]: getNumber(screens[breakpointKey]),
    }),
    DEFAULT_BREAKPOINTS as BreakPointsType,
  );

export const { Media, MediaContextProvider } = createMedia({
  breakpoints,
});

//

function getNumber(breakpointValue: string): number {
  const numericCapture = String(breakpointValue).match(NUMBER_REGEX)?.[0];
  const numericValue = numericCapture && Number(numericCapture);

  if (typeof numericValue !== 'number') {
    throw new Error(
      `The breakpoint value "${breakpointValue}" cannot be converted to number.`,
    );
  }

  return numericValue;
}
