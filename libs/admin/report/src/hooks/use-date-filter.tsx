import { useState, useMemo } from 'react';
import dayjs from 'dayjs';
import localeData from 'dayjs/plugin/localeData';

dayjs.extend(localeData);
dayjs().localeData();

export type FilterType = 'day' | 'month' | 'year';

export const useDateFilter = (filterType: FilterType = 'day') => {
  const [type, setType] = useState<FilterType>(filterType);

  // default to current month
  const [month, setMonth] = useState(new Date().getMonth() + 1);

  // default to current year
  const [year, setYear] = useState(new Date().getFullYear());
  const monthList = useMemo(() => dayjs.months(), []);

  const now = new Date().getUTCFullYear();
  const yearList = useMemo(
    () =>
      Array(now - 2021)
        .fill('')
        .map((_, idx) => now - idx) as Array<number>,
    [now]
  );

  return {
    type,
    month,
    year,
    setType,
    setMonth,
    setYear,
    monthList,
    yearList,
  };
};

export type useDateFilterReturnType = ReturnType<typeof useDateFilter>;
