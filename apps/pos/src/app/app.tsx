import './styles.css';
import { Refine } from '@pankod/refine-core';
import routerProvider from '@pankod/refine-react-router-v6';
import { MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';

import {
  authProvider,
  dataProvider,
  notificationProvider,
} from '@nekotoko/shared/ui-providers';

import configs from './configs';
import { MainLayout } from './layouts/main-layout';
import { LoginPage } from './pages/login';
import { DashboardPage } from './pages/dashboard';

const App = () => {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <NotificationsProvider position="top-right">
        <Refine
          dataProvider={dataProvider}
          routerProvider={routerProvider}
          authProvider={authProvider(configs.API_URL, 'user')}
          notificationProvider={notificationProvider}
          Layout={MainLayout}
          LoginPage={LoginPage}
          DashboardPage={DashboardPage}
          resources={[
            {
              name: 'products',
            },
            {
              name: 'today-sale',
            },
          ]}
        />
      </NotificationsProvider>
    </MantineProvider>
  );
};

export default App;
