import { useShow } from '@pankod/refine-core';
import {
  Show,
  Typography,
  List,
  DateField,
  Table,
  Space,
  Avatar,
} from '@pankod/refine-antd';
import { useLocation } from 'react-router-dom';
import { toRupiah } from '@nekotoko/shared/utils';

import { OrderDetail } from '../types';

const { Title, Text } = Typography;

export const OrderShow = () => {
  const { pathname } = useLocation();

  const { queryResult } = useShow<OrderDetail>({
    resource: 'order',
    id: pathname.split('/').pop(),
  });
  const { data, isLoading } = queryResult;

  return (
    <Space direction="vertical" size={20} style={{ width: '100%' }}>
      <Show
        title="Order"
        isLoading={isLoading}
        pageHeaderProps={{
          extra: false,
          subTitle: `#${data?.data.number ?? ''}`,
        }}
      >
        <Title level={5}>Order Number</Title>
        <Text>{data?.data.number}</Text>

        <Title level={5}>Cashier</Title>
        <Text>{data?.data.user.full_name}</Text>

        <Title level={5}>Created At</Title>
        <DateField format="LLL" value={data?.data.created_at} />
      </Show>

      <List
        title="Items"
        createButtonProps={undefined}
        pageHeaderProps={{
          breadcrumb: undefined,
        }}
        canCreate={false}
      >
        <Table
          pagination={false}
          dataSource={data?.data.order_details}
          rowKey="id"
          footer={(_data) => (
            <div className="product-footer">
              <Text>Total Amount</Text>
              <Text>{toRupiah(data?.data.total_amount || 0)}</Text>
            </div>
          )}
        >
          <Table.Column
            dataIndex={['product', 'image', 'url']}
            render={(value) => <Avatar size={74} src={value} />}
            width={100}
          />
          <Table.Column dataIndex={['product', 'name']} title="Name" />
          <Table.Column dataIndex="quantity" title="Quantity" />
          <Table.Column
            dataIndex={['product', 'price']}
            title="Price"
            render={(value: number) =>
              value.toLocaleString('id-ID', {
                style: 'currency',
                currency: 'IDR',
              })
            }
          />
          <Table.Column
            dataIndex="total_price"
            title="Total"
            render={(value: number) =>
              value.toLocaleString('id-ID', {
                style: 'currency',
                currency: 'IDR',
              })
            }
          />
        </Table>
      </List>
    </Space>
  );
};
