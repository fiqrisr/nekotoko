import { IResourceItem } from '@pankod/refine-core';

import {
  CompositionList,
  CompositionShow,
  CompositionCreate,
  CompositionEdit,
} from './pages';

const compositionResources: IResourceItem = {
  name: 'composition',
  list: CompositionList,
  show: CompositionShow,
  create: CompositionCreate,
  edit: CompositionEdit,
};

export default compositionResources;
