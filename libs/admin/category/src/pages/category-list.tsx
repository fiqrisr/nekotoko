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
import { Category } from '@nekotoko/admin/types';

export const CategoryList = () => {
  const { tableProps } = useTable<Category>();

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="name" title="Name" />
        <Table.Column
          dataIndex="created_at"
          title="Created At"
          render={(value) => <DateField format="LLL" value={value} />}
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
