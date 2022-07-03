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
import dayjs, { Dayjs } from 'dayjs';
import { Order } from '@nekotoko/prisma/monolithic';
import { toRupiah } from '@nekotoko/shared/utils';

interface OrderFilterVariables {
  date: Dayjs;
}

export const DailyReport = () => {
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
        value: dayjs().startOf('day').toISOString(),
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
