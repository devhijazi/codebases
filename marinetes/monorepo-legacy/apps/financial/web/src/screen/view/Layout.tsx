import type { PropsWithChildren } from '@marinetes/types/modules/react';

import { FlexFullScreenStyle } from '@screen/styles/FlexFullScreenStyle';

export const Layout = ({ children }: PropsWithChildren): JSX.Element => (
  <FlexFullScreenStyle id="layout">{children}</FlexFullScreenStyle>
);
