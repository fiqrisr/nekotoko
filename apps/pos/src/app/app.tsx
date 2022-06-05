import './styles.css';
import { Refine } from '@pankod/refine-core';
import routerProvider from '@pankod/refine-react-router-v6';
import { MantineProvider } from '@mantine/core';

import { authProvider } from '@nekotoko/shared/ui-providers';
import { dataProvider } from '@nekotoko/shared/ui-providers';

import configs from './configs';
import { MainLayout } from './layouts/main-layout';
import { Login } from './pages/login';

const App = () => {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Refine
        dataProvider={dataProvider}
        routerProvider={routerProvider}
        authProvider={authProvider(configs.API_URL, 'user')}
        Layout={MainLayout}
        LoginPage={Login}
      />
    </MantineProvider>
  );
};

export default App;
