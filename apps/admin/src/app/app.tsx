import { Refine } from '@pankod/refine-core';
import {
  Layout,
  ReadyPage,
  notificationProvider,
  ErrorComponent,
} from '@pankod/refine-antd';
import routerProvider from '@pankod/refine-react-router-v6';
import '@pankod/refine-antd/dist/styles.min.css';
import { authProvider } from '@nekotoko/shared/ui-providers';
import { dataProvider } from '@nekotoko/shared/ui-providers';

import usersResources from '@nekotoko/admin/users';
import categoryResources from '@nekotoko/admin/category';
import compositionResources from '@nekotoko/admin/composition';
import productResources from '@nekotoko/admin/product';
import reportResources from '@nekotoko/admin/report';

import configs from './configs';
import { Login } from './pages/login';

const App = () => {
  return (
    <Refine
      authProvider={authProvider(configs.API_URL)}
      routerProvider={routerProvider}
      dataProvider={dataProvider(configs.API_URL)}
      Layout={Layout}
      ReadyPage={ReadyPage}
      LoginPage={Login}
      notificationProvider={notificationProvider}
      catchAll={<ErrorComponent />}
      resources={[
        usersResources,
        categoryResources,
        compositionResources,
        productResources,
        ...reportResources,
      ]}
    />
  );
};

export default App;
