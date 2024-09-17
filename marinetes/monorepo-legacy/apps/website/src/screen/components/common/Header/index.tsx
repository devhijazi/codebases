import { Media } from '@screen/view/Media';

import { Desktop } from './atoms/Desktop';
import { Mobile } from './atoms/Mobile';

export const Header = (): JSX.Element => (
  <header className="sticky z-30 top-0 lg:top-auto">
    <Media lessThan="lg">
      <Mobile />
    </Media>

    <Media greaterThanOrEqual="lg">
      <Desktop />
    </Media>
  </header>
);
