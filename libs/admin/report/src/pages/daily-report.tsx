import { useMemo } from 'react';
import { CrudFilters, getDefaultFilter, HttpError } from '@pankod/refine-core';
import {
  List,
  DateField,
  Table,
  useTable,
  DatePicker,
  Form,
  ShowButton,
  Space,
} from '@pankod/refine-antd';
import { useLocation } from 'react-router-dom';
import dayjs, { Dayjs } from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import localeData from 'dayjs/plugin/localeData';
import weekday from 'dayjs/plugin/weekday';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import weekYear from 'dayjs/plugin/weekYear';
import { Order } from '@nekotoko/prisma/monolithic';
import { toRupiah } from '@nekotoko/shared/utils';

dayjs.extend(customParseFormat);
dayjs.extend(advancedFormat);
dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.extend(weekOfYear);
dayjs.extend(weekYear);

interface OrderFilterVariables {
  date: Dayjs;
}

export const DailyReport = () => {
  const { search } = useLocation();
  const queryParams = useMemo(() => new URLSearchParams(search), [search]);

  const { tableProps, searchFormProps, filters } = useTable<
    Order,
    HttpError,
    OrderFilterVariables
  >({
    resource: 'order',
    syncWithLocation: true,
    initialFilter: [
      {
        field: 'date',
        operator: 'eq',
        value: queryParams.get('date') || dayjs().startOf('day').toISOString(),
      },
    ],
    onSearch: (params) => {
      const filters: CrudFilters = [];
      const { date } = params;

      filters.push({
        field: 'date',
        operator: 'eq',
        value: date ? date.startOf('day').toISOString() : undefined,
      });

      return filters;
    },
  });

  return (
    <List
      title="Daily Report"
      pageHeaderProps={{
        extra: (
          <Form
            {...searchFormProps}
            onValuesChange={() => searchFormProps.form?.submit()}
            initialValues={{
              date: dayjs(getDefaultFilter('date', filters, 'eq')),
            }}
            layout="inline"
          >
            <Form.Item name="date">
              <DatePicker />
            </Form.Item>
          </Form>
        ),
      }}
    >
      <Table
        {...tableProps}
        rowKey="id"
        pagination={{
          ...tableProps.pagination,
          showSizeChanger: true,
        }}
      >
        <Table.Column dataIndex="number" title="Number" />
        <Table.Column
          dataIndex="total_amount"
          title="Total Amount"
          render={(value: number) => toRupiah(value)}
        />
        <Table.Column dataIndex={['user', 'full_name']} title="User" />
        <Table.Column
          dataIndex="created_at"
          title="Created At"
          render={(value) => <DateField format="LLL" value={value} />}
        />
        <Table.Column<Order>
          title="Actions"
          dataIndex="actions"
          render={(_text, record): React.ReactNode => {
            return (
              <Space>
                <ShowButton recordItemId={record.id} hideText />
              </Space>
            );
          }}
        />
      </Table>
    </List>
  );
};
