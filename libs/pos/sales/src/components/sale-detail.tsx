import { useRef } from 'react';
import { useOne } from '@pankod/refine-core';
import {
  Text,
  Box,
  Group,
  Table,
  Divider,
  createStyles,
  Skeleton,
  Button,
} from '@mantine/core';
import dayjs from 'dayjs';
import { useReactToPrint } from 'react-to-print';
import { Printer } from 'tabler-icons-react';
import { ProductReceipt } from '@nekotoko/pos/components';
import { useProductStore } from '@nekotoko/pos/shared';
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
  const { setPaidAmount, addProduct, reset } = useProductStore();
  const receiptRef = useRef(null);

  const { data, isLoading } = useOne<OrderDetail>({
    resource: 'order',
    id,
    queryOptions: {
      enabled: collapsed,
    },
  });

  const handlePrint = useReactToPrint({
    content: () => receiptRef.current,
    onBeforeGetContent: async () => {
      if (data) {
        setPaidAmount(data.data.paid_amount);
        data.data.order_details.forEach((o) => {
          addProduct({
            id: o.product.id,
            name: o.product.name,
            image: o.product.image.url,
            price: o.product.price,
            quantity: o.quantity,
            total: o.total_price,
          });
        });
      }
    },
    onAfterPrint: () => reset(),
  });

  if (isLoading || !data) {
    return (
      <Box p={14}>
        <Skeleton height={20} mb="xs" />
        <Skeleton height={20} mb="xs" />
        <Skeleton height={20} mb="xs" />
      </Box>
    );
  }

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
        <Text size="sm">No: {data?.data.number}</Text>
        <Group>
          <Text size="sm">
            {dayjs(data?.data.created_at).format('MM/DD/YYYY HH:mm')}
          </Text>
          <Button
            size="xs"
            leftIcon={<Printer size={16} />}
            mb={6}
            onClick={() => handlePrint()}
          >
            Print Receipt
          </Button>
        </Group>
      </Group>

      <Divider mt={4} mb={6} />

      <Table className={classes.table} fontSize="sm" verticalSpacing={4}>
        <thead>
          <tr>
            <th style={{ width: '10px' }}>#</th>
            <th>Item</th>
            <th>Quantity</th>
            <th>Price</th>
            <th style={{ width: '120px' }}>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {data?.data.order_details.map((o, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>
                <Text size="sm">{o.product.name}</Text>
              </td>
              <td>{o.quantity}</td>
              <td>
                <Text size="sm">{toRupiah(o.product.price)}</Text>
              </td>
              <td>
                <Group position="apart">
                  <Text size="sm">Rp</Text>
                  <Text size="sm">{formatNumber(o.total_price)}</Text>
                </Group>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Divider mt={4} mb={6} />

      <Group position="apart">
        <Text size="sm" weight="bolder">
          Total
        </Text>
        <Text size="sm" weight="bolder">
          {toRupiah(data?.data.total_amount)}
        </Text>
      </Group>

      <Group position="apart">
        <Text size="sm">Paid amount</Text>
        <Text size="sm">{toRupiah(data?.data.paid_amount)}</Text>
      </Group>

      {data?.data.paid_amount - data?.data.total_amount > 0 && (
        <Group position="apart">
          <Text size="sm">Change</Text>
          <Text size="sm">
            {toRupiah(data?.data.paid_amount - data?.data.total_amount)}
          </Text>
        </Group>
      )}

      <div style={{ display: 'none' }}>
        <div
          style={{ paddingLeft: '24px', paddingRight: '24px' }}
          ref={receiptRef}
        >
          <ProductReceipt
            orderNumber={data?.data?.number}
            productStore={useProductStore}
            created_at={data?.data?.created_at}
          />
        </div>
      </div>
    </Box>
  );
};
