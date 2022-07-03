import { IResourceItem } from '@pankod/refine-core';

import { DailyReport, MonthlyReport, YearlyReport, OrderShow } from './pages';

const reportResources: IResourceItem[] = [
  {
    name: 'order',
  },
  {
    name: 'daily',
    parentName: 'order',
    options: {
      label: 'Daily',
    },
    list: DailyReport,
    show: OrderShow,
  },
  {
    name: 'monthly',
    parentName: 'order',
    options: {
      label: 'Monthly',
    },
    list: MonthlyReport,
  },
  {
    name: 'yearly',
    parentName: 'order',
    options: {
      label: 'Yearly',
    },
    list: YearlyReport,
  },
];

export default reportResources;
