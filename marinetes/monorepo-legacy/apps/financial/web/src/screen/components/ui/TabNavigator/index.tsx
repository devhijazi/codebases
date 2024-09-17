import { mergeClassNames } from '@hitechline/reactools';
import { useMemo, useState } from 'react';
import { IconType } from 'react-icons';

import { Container, Menu, Option, Tab } from './styles';

export interface TabNavigatorProps {
  height?: string;
  tabs: {
    name: string;
    icon?: IconType;
    component?: any;
  }[];
}

export const TabNavigator = ({
  height,
  tabs,
}: TabNavigatorProps): JSX.Element => {
  const [selected, setSelected] = useState(0);

  const currentTab = useMemo(
    () =>
      tabs
        .filter((_, index) => index === selected)
        .map(({ name, component: Component }) => {
          return <Component key={name} />;
        }),
    [tabs, selected],
  );

  return (
    <Container>
      <Menu height={height}>
        {tabs.map(({ name, icon: Icon }, index) => (
          <Option
            key={name}
            type="button"
            className={mergeClassNames({ active: index === selected })}
            onClick={() => setSelected(index)}
          >
            {Icon && (
              <div className="icon">
                <Icon size="28px" />
              </div>
            )}

            {name}
          </Option>
        ))}
      </Menu>

      <Tab>{currentTab}</Tab>
    </Container>
  );
};
