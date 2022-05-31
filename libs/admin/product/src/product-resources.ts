import { IResourceItem } from '@pankod/refine-core';

import { ProductList, ProductCreate, ProductEdit } from './pages';

const productResources: IResourceItem = {
  name: 'product',
  list: ProductList,
  create: ProductCreate,
  edit: ProductEdit,
  canShow: false,
};

export default productResources;
