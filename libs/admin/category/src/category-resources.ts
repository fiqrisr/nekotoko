import { IResourceItem } from '@pankod/refine-core';

import {
  CategoryList,
  CategoryShow,
  CategoryCreate,
  CategoryEdit,
} from './pages';

const categoryResources: IResourceItem = {
  name: 'category',
  list: CategoryList,
  show: CategoryShow,
  create: CategoryCreate,
  edit: CategoryEdit,
};

export default categoryResources;
