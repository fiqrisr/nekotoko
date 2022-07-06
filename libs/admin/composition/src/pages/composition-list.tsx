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
import { Composition } from '@nekotoko/db-monolithic';
import { MEASUREMENT_UNITS } from '@nekotoko/admin/components';

export const CompositionList = () => {
  const { tableProps } = useTable<Composition>({ syncWithLocation: true });

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
        <Table.Column dataIndex="stock" title="Stock" />
        <Table.Column
          dataIndex="unit"
          title="Unit"
          render={(value) => (
            <>
              {value} ({MEASUREMENT_UNITS[value]})
            </>
          )}
        />
        <Table.Column
          dataIndex="created_at"
          title="Created At"
          render={(value) => <DateField format="LLL" value={value} />}
        />
        <Table.Column<Composition>
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
