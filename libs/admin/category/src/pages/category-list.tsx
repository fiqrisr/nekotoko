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
import { Category } from '@nekotoko/db-monolithic';

export const CategoryList = () => {
  const { tableProps } = useTable<Category>({ syncWithLocation: true });

  return (
    <List>
      <Table
        {...tableProps}
        rowKey="id"
        pagination={{
          ...tableProps.pagination,
          showSizeChanger: true,
        }}
      >
        <Table.Column dataIndex="name" title="Name" />
        <Table.Column
          dataIndex="created_at"
          title="Created At"
          render={(value) => (
            <DateField format="MM/DD/YYYY HH:mm" value={value} />
          )}
        />
        <Table.Column<Category>
          title="Actions"
          dataIndex="actions"
          render={(_text, record): React.ReactNode => {
            return (
              <Space>
                <ShowButton recordItemId={record.id} hideText />
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
