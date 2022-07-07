import { useMemo, useState, useRef } from 'react';
import { useTable, useDelete } from '@pankod/refine-core';
import {
  Container,
  Title,
  Group,
  Pagination,
  Select,
  Skeleton,
  ActionIcon,
  Popover,
  Text,
  Button,
  Collapse,
  useMantineTheme,
} from '@mantine/core';
import dayjs from 'dayjs';
import {
  CompactTable,
  Column,
  RowOptions,
  RowPropsAsObject,
} from '@table-library/react-table-library/compact';
import { useTheme } from '@table-library/react-table-library/theme';
import {
  DEFAULT_OPTIONS,
  getTheme,
} from '@table-library/react-table-library/mantine';
import { Trash, AlertCircle } from 'tabler-icons-react';
import { Order } from '@nekotoko/db-monolithic';
import { toRupiah } from '@nekotoko/shared/utils';

import { SaleDetail } from '../components';

export const SaleList = () => {
  const customTheme = {
    Table: `
      .animate {
        grid-column: 1 / -1;

        display: flex;
      }

      .animate > div {
        flex: 1;
        display: flex;
      }
    `,
  };

  const mantineTheme = getTheme(DEFAULT_OPTIONS);
  const theme = useTheme([mantineTheme, customTheme]);
  const mantineCoreTheme = useMantineTheme();
  const [ids, setIds] = useState([]);

  const { mutate, isLoading, isSuccess } = useDelete();

  const {
    tableQueryResult,
    current,
    pageCount,
    pageSize,
    setCurrent,
    setPageSize,
  } = useTable<Order>({
    resource: 'order',
    permanentSorter: [{ field: 'created_at', order: 'desc' }],
    initialCurrent: 1,
    initialPageSize: 10,
  });

  const deleteOrder = (id: string) => {
    mutate({
      resource: 'order',
      id,
    });
  };

  const tableColumns: Column[] = useMemo<Column[]>(
    () => [
      {
        label: 'Number',
        renderCell: (item) => item.number,
      },
      {
        label: 'User',
        renderCell: (item) => item.user.full_name,
      },
      {
        label: 'Total Amount',
        renderCell: (item) => toRupiah(item.total_amount),
      },
      {
        label: 'Created At',
        renderCell: (item) =>
          dayjs(item.created_at).format('DD/MM/YYYY, HH:mm'),
      },
      {
        label: 'Action',
        renderCell: (item) => {
          // trunk-ignore(eslint/react-hooks/rules-of-hooks)
          const [opened, setOpened] = useState(false);

          return (
            <Popover
              opened={opened}
              onClose={() => setOpened(false)}
              position="top"
              target={
                <ActionIcon
                  size="sm"
                  variant="light"
                  color="red"
                  title="Delete order"
                  onClick={() => setOpened(!opened)}
                >
                  <Trash />
                </ActionIcon>
              }
            >
              <Group spacing={8} align="flex-start" mb={10}>
                <AlertCircle
                  size={20}
                  color={mantineCoreTheme.colors.yellow[6]}
                />
                <Text size="sm">Are you sure?</Text>
              </Group>
              <Group spacing="xs">
                <Button
                  size="xs"
                  variant="outline"
                  onClick={() => setOpened(false)}
                >
                  Cancel
                </Button>
                <Button
                  color="red"
                  size="xs"
                  variant="outline"
                  loading={isLoading}
                  onClick={() => {
                    deleteOrder(item.id);

                    if (isSuccess) setOpened(false);
                  }}
                >
                  Delete
                </Button>
              </Group>
            </Popover>
          );
        },
      },
    ],
    // trunk-ignore(eslint/react-hooks/exhaustive-deps)
    []
  );

  const tableData = useMemo(() => {
    const nodes = [];
    if (tableQueryResult.data) {
      return {
        nodes: tableQueryResult.data.data,
      };
    }

    return { nodes };
  }, [tableQueryResult.data]);

  const handleExpand = (item) => {
    if (ids.includes(item.id)) {
      setIds(ids.filter((id) => id !== item.id));
    } else {
      setIds(ids.concat(item.id));
    }
  };

  const rowProps: RowPropsAsObject = {
    onClick: handleExpand,
  };

  const rowOptions: RowOptions = {
    renderAfterRow: (item) => (
      <Collapse className="animate" in={ids.includes(item.id)}>
        <tr style={{ flex: 1, display: 'flex' }}>
          <td style={{ flex: 1 }}>
            <SaleDetail id={item.id} collapsed={ids.includes(item.id)} />
          </td>
        </tr>
      </Collapse>
    ),
  };

  return (
    <Container>
      <Title mb={20}>Today Sales</Title>

      {!tableQueryResult.data ? (
        <>
          <Skeleton height={20} mb="xs" />
          <Skeleton height={20} mb="xs" />
          <Skeleton height={20} mb="xs" />
        </>
      ) : (
        <CompactTable
          columns={tableColumns}
          data={tableData}
          theme={theme}
          rowOptions={rowOptions}
          rowProps={rowProps}
        />
      )}
      <Group position="apart" mt={10}>
        <Select
          value={pageSize.toString()}
          variant="filled"
          size="xs"
          sx={{
            width: '105px',
          }}
          data={[
            { value: '10', label: '10 / page' },
            { value: '25', label: '25 / page' },
            { value: '50', label: '50 / page' },
            { value: '100', label: '100 / page' },
          ]}
          onChange={(v) => setPageSize(Number(v))}
        />

        <Pagination
          total={pageCount}
          page={current}
          onChange={(page) => setCurrent(page)}
        />
      </Group>
    </Container>
  );
};
