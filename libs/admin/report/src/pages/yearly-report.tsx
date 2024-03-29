import {
  CrudFilters,
  getDefaultFilter,
  HttpError,
  useNavigation,
} from '@pankod/refine-core';
import { List, Table, useTable, Select, Form } from '@pankod/refine-antd';
import dayjs from 'dayjs';
import { toRupiah } from '@nekotoko/shared/utils';

import { useDateFilter } from '../hooks/use-date-filter';
import { YearlyReportResponse } from '../types';

interface OrderFilterVariables {
  year: number;
}

export const YearlyReport = () => {
  const { list } = useNavigation();

  const { tableProps, searchFormProps, filters } = useTable<
    YearlyReportResponse,
    HttpError,
    OrderFilterVariables
  >({
    resource: 'order',
    syncWithLocation: true,
    initialFilter: [
      {
        field: 'year',
        operator: 'eq',
        value: dayjs().year(),
      },
    ],
    onSearch: (params) => {
      const filters: CrudFilters = [];
      const { year } = params;

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
      title="Yearly Report"
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
        onRow={(record) => {
          return {
            onClick: () =>
              list(
                `order/monthly?month=${
                  parseInt(record.month.split('-')[0]) - 1
                }&year=${getDefaultFilter('year', filters, 'eq')}`
              ),
          };
        }}
        pagination={{
          ...tableProps.pagination,
          showSizeChanger: true,
        }}
      >
        <Table.Column
          dataIndex="month"
          title="Month"
          render={(value) => monthList[parseInt(value.split('-')[0]) - 1]}
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
