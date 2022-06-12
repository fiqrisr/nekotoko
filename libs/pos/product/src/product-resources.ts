import { IResourceItem } from '@pankod/refine-core';

import { ProductList } from './pages';

const productResources: IResourceItem = {
  name: 'products',
  list: ProductList,
  canCreate: false,
  canEdit: false,
  canDelete: false,
};

export default productResources;
