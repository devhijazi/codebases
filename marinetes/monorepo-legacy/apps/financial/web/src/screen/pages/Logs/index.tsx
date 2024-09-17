import { MdDashboard } from 'react-icons/md';
import { RiFileList3Line } from 'react-icons/ri';

import { apply } from '@resources/cases/apply';
import { Logged } from '@resources/cases/Logged';
import { TabNavigator } from '@screen/components/ui/TabNavigator';
import { DefaultLayout } from '@screen/layouts/DefaultLayout';

import { LogsService, LogsSystem } from './components/Sections';
import { Container, Content } from './styles';

export const Logs = apply(
  (): JSX.Element => {
    const tabs = [
      {
        name: 'Logs de serviços',
        icon: RiFileList3Line,
        component: LogsService,
      },
      {
        name: 'Logs de sistema',
        icon: MdDashboard,
        component: LogsSystem,
      },
    ];

    return (
      <Container className="bowl-content padding-y">
        <Content>
          <TabNavigator height="180px" tabs={tabs} />
        </Content>
      </Container>
    );
  },
  {
    layout: DefaultLayout,
    cases: [Logged],
  },
);
