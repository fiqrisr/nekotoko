import { useOne } from '@pankod/refine-core';
import { Text, Box, Group, Table, Divider, createStyles } from '@mantine/core';
import dayjs from 'dayjs';
import { toRupiah, formatNumber } from '@nekotoko/shared/utils';
import { OrderDetail } from '@nekotoko/shared/types';

const useStyles = createStyles(() => ({
  table: {
    th: {
      borderBottom: '0 !important',
    },

    td: {
      borderBottom: '0 !important',
      verticalAlign: 'top',
    },
  },
}));

export const SaleDetail = ({
  id,
  collapsed,
}: {
  id: string;
  collapsed: boolean;
}) => {
  const { classes } = useStyles();
  const { data } = useOne<OrderDetail>({
    resource: 'order',
    id,
    queryOptions: {
      enabled: collapsed,
    },
  });

  return (
    <Box
      p={14}
      sx={(theme) => ({
        border: `1px solid ${theme.colors.dark[1]}`,
        borderRadius: theme.spacing.xs,
        margin: theme.spacing.xs,
      })}
    >
      <Group position="apart">
        <Text size="xs">No: {data?.data.number}</Text>
        <Text size="xs">{dayjs().format('MM/DD/YYYY HH:MM')}</Text>
      </Group>

      <Divider mt={4} mb={6} />

      <Table className={classes.table} fontSize="xs" verticalSpacing={4}>
        <thead>
          <tr>
            <th style={{ width: '10px' }}>#</th>
            <th>Item</th>
            <th>Quantity</th>
            <th>Price</th>
            <th style={{ width: '100px' }}>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {data?.data.order_details.map((o, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>
                <Text size="xs">{o.product.name}</Text>
              </td>
              <td>{o.quantity}</td>
              <td>
                <Text size="xs">{toRupiah(o.product.price)}</Text>
              </td>
              <td>
                <Group position="apart">
                  <Text size="xs">Rp</Text>
                  <Text size="xs">{formatNumber(o.total_price)}</Text>
                </Group>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Divider mt={4} mb={6} />

      <Group position="apart">
        <Text size="xs" weight="bolder">
          Total
        </Text>
        <Text size="xs" weight="bolder">
          {toRupiah(data?.data.total_amount)}
        </Text>
      </Group>

      <Group position="apart">
        <Text size="xs">Paid amount</Text>
        <Text size="xs">{toRupiah(data?.data.paid_amount)}</Text>
      </Group>

      {data?.data.paid_amount - data?.data.total_amount > 0 && (
        <Group position="apart">
          <Text size="xs">Change</Text>
          <Text size="xs">
            {toRupiah(data?.data.paid_amount - data?.data.total_amount)}
          </Text>
        </Group>
      )}
    </Box>
  );
};
