import { useRef, useMemo } from 'react';
import { useCreate } from '@pankod/refine-core';
import { Button, Box } from '@mantine/core';
import { useModals } from '@mantine/modals';
import { nanoid } from 'nanoid';
import { useReactToPrint } from 'react-to-print';

import { ProductReceipt } from './product-receipt';
import { useProductStore } from '../store';

export const ProductReceiptModal = () => {
  const modals = useModals();
  const { mutate, isLoading, isSuccess } = useCreate();
  const orderNumber = useMemo(() => nanoid(16), []);
  const receiptRef = useRef(null);
  const { totalPrice, products, paidAmount, reset } = useProductStore();

  const handlePrintReceipt = useReactToPrint({
    content: () => receiptRef.current,
    onBeforePrint: () => {
      modals.closeAll();
    },
    onAfterPrint: () => {
      reset();
    },
  });

  const submit = () => {
    const userId = JSON.parse(localStorage.getItem('user')).id;

    mutate({
      resource: 'order',
      values: {
        user_id: userId,
        number: orderNumber,
        total_amount: totalPrice,
        paid_amount: paidAmount,
        order_details: products.map((p) => ({
          product_id: p.id,
          quantity: p.quantity,
          total_price: p.total,
        })),
      },
    });

    if (!isSuccess) handlePrintReceipt();
  };

  return (
    <Box>
      <ProductReceipt orderNumber={orderNumber} />

      <Button fullWidth onClick={() => submit()} mt="md" loading={isLoading}>
        Proceed
      </Button>

      <div style={{ display: 'none' }}>
        <div
          style={{ paddingLeft: '24px', paddingRight: '24px' }}
          ref={receiptRef}
        >
          <ProductReceipt orderNumber={orderNumber} />
        </div>
      </div>
    </Box>
  );
};
