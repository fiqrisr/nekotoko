import { useShow } from '@pankod/refine-core';
import {
  Show,
  Typography,
  useTable,
  List,
  DateField,
  Table,
  Space,
  Avatar,
  EditButton,
  DeleteButton,
} from '@pankod/refine-antd';
import { Category, Product } from '@nekotoko/db-monolithic';

const { Title, Text } = Typography;

export const CategoryShow = () => {
  const { queryResult } = useShow<Category>();
  const { data, isLoading } = queryResult;

  const { tableProps: productTable } = useTable<Product>({
    resource: 'product',
    permanentFilter: [
      {
        field: 'category',
        operator: 'eq',
        value: data?.data.name,
      },
    ],
    queryOptions: {
      enabled: data?.data.id !== undefined,
    },
  });

  return (
    <Space direction="vertical" size={20} style={{ width: '100%' }}>
      <Show isLoading={isLoading}>
        <Title level={5}>Name</Title>
        <Text>{data?.data.name}</Text>
      </Show>

      <List
        title="Products"
        createButtonProps={undefined}
        pageHeaderProps={{
          breadcrumb: undefined,
        }}
        canCreate={false}
      >
        <Table {...productTable} rowKey="id">
          <Table.Column
            dataIndex="image"
            render={(value) => <Avatar size={74} src={value?.url} />}
            width={100}
          />
          <Table.Column dataIndex="name" title="Name" />
          <Table.Column
            dataIndex="price"
            title="Price"
            render={(value: number) =>
              value.toLocaleString('id-ID', {
                style: 'currency',
                currency: 'IDR',
              })
            }
          />
          <Table.Column
            dataIndex="created_at"
            title="Created At"
            render={(value) => <DateField format="LLL" value={value} />}
          />
          <Table.Column<Product>
            title="Actions"
            dataIndex="actions"
            render={(_text, record): React.ReactNode => {
              return (
                <Space>
                  <EditButton
                    resourceNameOrRouteName="product"
                    recordItemId={record.id}
                    hideText
                  />
                  <DeleteButton
                    resourceNameOrRouteName="product"
                    recordItemId={record.id}
                    hideText
                  />
                </Space>
              );
            }}
          />
        </Table>
      </List>
    </Space>
  );
};
