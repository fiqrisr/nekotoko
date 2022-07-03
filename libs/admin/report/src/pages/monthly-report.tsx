import {
  CrudFilters,
  getDefaultFilter,
  HttpError,
  useNavigation,
} from '@pankod/refine-core';
import { List, Table, useTable, Select, Form } from '@pankod/refine-antd';
import dayjs from 'dayjs';
import { Order } from '@nekotoko/prisma/monolithic';
import { toRupiah } from '@nekotoko/shared/utils';

import { useDateFilter } from '../hooks/use-date-filter';

interface OrderFilterVariables {
  month: number;
  year: number;
}

export const MonthlyReport = () => {
  const { list } = useNavigation();

  const { tableProps, searchFormProps, filters } = useTable<
    Order,
    HttpError,
    OrderFilterVariables
  >({
    resource: 'order',
    syncWithLocation: true,
    initialFilter: [
      {
        field: 'month',
        operator: 'eq',
        value: dayjs().month(),
      },
      {
        field: 'year',
        operator: 'eq',
        value: dayjs().year(),
      },
    ],
    onSearch: (params) => {
      const filters: CrudFilters = [];
      const { month, year } = params;

      filters.push({
        field: 'month',
        operator: 'eq',
        value: month,
      });

      filters.push({
        field: 'year',
        operator: 'eq',
        value: year,
      });

      return filters;
    },
  });

  const { monthList, yearList } = useDateFilter();

  return (
    <List
      title="Monthly Report"
      pageHeaderProps={{
        extra: (
          <Form
            {...searchFormProps}
            onValuesChange={() => searchFormProps.form?.submit()}
            initialValues={{
              month: monthList[getDefaultFilter('month', filters, 'eq')],
              year: getDefaultFilter('year', filters, 'eq'),
            }}
            layout="inline"
          >
            <Form.Item name="month">
              <Select>
                {monthList.map((m, i) => (
                  <Select.Option key={i} value={i}>
                    {m}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item name="year">
              <Select>
                {yearList.map((y) => (
                  <Select.Option key={y} value={y}>
                    {y}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Form>
        ),
      }}
    >
      <Table
        {...tableProps}
        rowKey="date"
        onRow={() => {
          return {
            onClick: () => list('order/daily'),
          };
        }}
        pagination={{
          ...tableProps.pagination,
          showSizeChanger: true,
        }}
      >
        <Table.Column
          dataIndex="date"
          title="Date"
          render={(value) => dayjs(value).format('DD/MM/YYYY')}
        />
        <Table.Column dataIndex="totalOrder" title="Total Transactions" />
        <Table.Column
          dataIndex="totalAmount"
          title="Total Amount"
          render={(value: number) => toRupiah(value)}
        />
      </Table>
    </List>
  );
};
