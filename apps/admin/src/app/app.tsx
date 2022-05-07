import { Refine } from '@pankod/refine-core';
import {
  Layout,
  ReadyPage,
  notificationProvider,
  ErrorComponent,
} from '@pankod/refine-antd';
import routerProvider from '@pankod/refine-react-router-v6';
import '@pankod/refine-antd/dist/styles.min.css';
import { authProvider } from '@nekotoko/admin/providers';
import { dataProvider } from '@nekotoko/admin/providers';

import configs from './configs';

const App = () => {
  return (
    <Refine
      authProvider={authProvider(configs.API_URL)}
      routerProvider={routerProvider}
      dataProvider={dataProvider(configs.API_URL)}
      Layout={Layout}
      ReadyPage={ReadyPage}
      notificationProvider={notificationProvider}
      catchAll={<ErrorComponent />}
      resources={[
        {
          name: 'category',
        },
      ]}
    />
  );
};

export default App;
