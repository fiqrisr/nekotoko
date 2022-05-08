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

import {
  CategoryList,
  CategoryShow,
  CategoryCreate,
  CategoryEdit,
} from '@nekotoko/admin/category';
import {
  UserList,
  UserShow,
  UserCreate,
  UserEdit,
} from '@nekotoko/admin/users';

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
        {
          name: 'users',
          list: UserList,
          show: UserShow,
          create: UserCreate,
          edit: UserEdit,
          canDelete: true,
        },
        {
          name: 'category',
          list: CategoryList,
          show: CategoryShow,
          create: CategoryCreate,
          edit: CategoryEdit,
          canDelete: true,
        },
      ]}
    />
  );
};

export default App;
