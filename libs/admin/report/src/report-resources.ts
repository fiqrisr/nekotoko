import { IResourceItem } from '@pankod/refine-core';

import { DailyReport, MonthlyReport, YearlyReport } from './pages';

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
