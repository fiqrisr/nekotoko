import { IResourceItem } from '@pankod/refine-core';

import { UserList, UserShow, UserCreate, UserEdit } from './pages';

const usersResources: IResourceItem = {
  name: 'users',
  list: UserList,
  show: UserShow,
  create: UserCreate,
  edit: UserEdit,
};

export default usersResources;
