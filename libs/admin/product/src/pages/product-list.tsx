import {
  List,
  DateField,
  Table,
  Space,
  ShowButton,
  EditButton,
  DeleteButton,
  useTable,
} from '@pankod/refine-antd';
import { Product } from '@nekotoko/prisma/monolithic';

export const ProductList = () => {
  const { tableProps } = useTable<Product>({ resource: 'product' });

  return (
    <List>
      <Table {...tableProps} rowKey="id">
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
                <EditButton recordItemId={record.id} hideText />
                <DeleteButton recordItemId={record.id} hideText />
              </Space>
            );
          }}
        />
      </Table>
    </List>
  );
};
