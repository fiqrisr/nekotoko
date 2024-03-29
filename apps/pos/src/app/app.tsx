import './styles.css';
import { Refine } from '@pankod/refine-core';
import routerProvider from '@pankod/refine-react-router-v6';
import { MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { NotificationsProvider } from '@mantine/notifications';

import {
  authProvider,
  dataProvider,
  notificationProvider,
} from '@nekotoko/shared/ui-providers';

import productResources from '@nekotoko/pos/product';
import salesResources from '@nekotoko/pos/sales';

import configs from './configs';
import { MainLayout } from './layouts/main-layout';
import { LoginPage } from './pages/login';

const App = () => {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <NotificationsProvider position="top-right">
        <ModalsProvider>
          <Refine
            dataProvider={dataProvider(configs.API_URL)}
            routerProvider={routerProvider}
            authProvider={authProvider(configs.API_URL, 'user')}
            notificationProvider={notificationProvider}
            Layout={MainLayout}
            LoginPage={LoginPage}
            resources={[productResources, salesResources]}
          />
        </ModalsProvider>
      </NotificationsProvider>
    </MantineProvider>
  );
};

export default App;
