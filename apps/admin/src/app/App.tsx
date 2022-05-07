import React from 'react';
import { Refine } from '@pankod/refine-core';
import {
  Layout,
  ReadyPage,
  notificationProvider,
  ErrorComponent,
} from '@pankod/refine-antd';
import routerProvider from '@pankod/refine-react-router-v6';
import '@pankod/refine-antd/dist/styles.min.css';
import { dataProvider } from '@nekotoko/admin/providers';

import configs from './configs';

const App: React.FC = () => {
  return (
    <Refine
      routerProvider={routerProvider}
      dataProvider={dataProvider(configs.API_URL)}
      Layout={Layout}
      ReadyPage={ReadyPage}
      notificationProvider={notificationProvider}
      catchAll={<ErrorComponent />}
    />
  );
};

export default App;
