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
import { Composition } from '@nekotoko/admin/types';

import { MEASUREMENT_UNITS } from '../constants';

export const CompositionList = () => {
  const { tableProps } = useTable<Composition>();

  return (
    <List>
      <Table {...tableProps} rowKey="id">
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
