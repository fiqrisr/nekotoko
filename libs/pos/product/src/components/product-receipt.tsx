import { forwardRef } from 'react';
import { Group, Divider, Text, Table, Box, createStyles } from '@mantine/core';
import dayjs from 'dayjs';
import { toRupiah } from '@nekotoko/shared/utils';

import { useProductStore } from '../store';
import { formatNumber } from '../utils';

interface ProductReceiptProps {
  orderNumber: string;
}

const useStyles = createStyles((theme) => ({
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

export const ProductReceipt = forwardRef<HTMLDivElement, ProductReceiptProps>(
  ({ orderNumber }, ref) => {
    const { classes } = useStyles();
    const { products, totalPrice, paidAmount } = useProductStore();

    return (
      <Box py={6} ref={ref}>
        <Text transform="uppercase" align="center" size="xl" weight={600}>
          NekoToko POS
        </Text>
        <Text align="center" size="md">
          Narkopika 001
        </Text>

        <Group position="apart" mt={20}>
          <Text size="xs">No: {orderNumber}</Text>
          <Text size="xs">{dayjs().format('MM/DD/YYYY HH:MM')}</Text>
        </Group>

        <Divider mt={4} mb={6} />

        <Table className={classes.table} fontSize="xs">
          <thead>
            <tr>
              <th>#</th>
              <th>Item</th>
              <th style={{ width: '100px' }}>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>
                  <Text size="xs">{p.name}</Text>
                  <Text size="xs">
                    {toRupiah(p.price)}{' '}
                    <span style={{ paddingLeft: 4, paddingRight: 4 }}>x</span>{' '}
                    {p.quantity}
                  </Text>
                </td>
                <td>
                  <Group position="apart">
                    <Text size="xs">Rp</Text>
                    <Text size="xs">{formatNumber(p.total)}</Text>
                  </Group>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <Divider mt={4} mb={6} />

        <Group position="apart">
          <Text size="sm">Total</Text>
          <Text size="sm">{toRupiah(totalPrice)}</Text>
        </Group>

        <Group position="apart">
          <Text size="sm">Jumlah dibayar</Text>
          <Text size="sm">{toRupiah(paidAmount)}</Text>
        </Group>

        <Divider mt={4} mb={6} />

        <Group position="apart">
          <Text size="sm">Kembalian</Text>
          <Text size="sm">{toRupiah(paidAmount - totalPrice)}</Text>
        </Group>
      </Box>
    );
  }
);
