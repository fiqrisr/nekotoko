import { IResourceItem } from '@pankod/refine-core';

import { SaleList } from './pages';

const salesResources: IResourceItem = {
  name: 'today-sale',
  list: SaleList,
};

export default salesResources;
