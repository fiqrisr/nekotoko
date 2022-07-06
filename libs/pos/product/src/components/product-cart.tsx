import { useState, useEffect } from 'react';
import { useCreate } from '@pankod/refine-core';
import {
  useMantineTheme,
  createStyles,
  ActionIcon,
  Indicator,
  Paper,
  Box,
  Image,
  Button,
  Text,
  Stack,
  NumberInput,
  Group,
  SimpleGrid,
  ScrollArea,
} from '@mantine/core';
import { useModals } from '@mantine/modals';
import { Trash, ShoppingCart, Plus, Minus, ThumbUp } from 'tabler-icons-react';
import { toRupiah } from '@nekotoko/shared/utils';
import { useProductStore } from '@nekotoko/pos/shared';

import { ProductReceiptModal } from './product-receipt-modal';

const cashList = [2000, 5000, 10000, 20000, 50000, 100000];

const useStyles = createStyles(
  (
    theme,
    {
      status,
    }: {
      status?: 'ok' | 'minus' | 'plus';
    }
  ) => ({
    cart: {
      minWidth: '360px',
      maxWidth: '400px',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    },

    productCardContainer: {
      flex: 1,
    },

    moneyInfo: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: status === 'minus' ? theme.colors.red[4] : theme.colors.blue[4],
      backgroundColor:
        status === 'minus' ? theme.colors.red[0] : theme.colors.blue[0],
      padding: theme.spacing.xs,
      paddingTop: 8,
      paddingBottom: 8,
    },
  })
);

const ProductCartItem = ({
  id,
  image,
  name,
  price,
  quantity,
}: {
  id: string;
  image: string;
  name: string;
  price: number;
  quantity: number;
}) => {
  const { incrementQuantity, decrementQuantity, removeProduct } =
    useProductStore();

  return (
    <Paper
      radius="md"
      p="xs"
      style={{ display: 'flex', alignItems: 'center', gap: 10 }}
      withBorder
    >
      <Box>
        <Image src={image} alt={name} height={40} width={40} radius="sm" />
      </Box>
      <Box style={{ flex: 1 }}>
        <Text size="sm" lineClamp={1}>
          {name}
        </Text>
        <Text size="xs">{toRupiah(price)}</Text>
      </Box>
      <Group spacing="xs">
        <ActionIcon
          variant="light"
          color="blue"
          size={36}
          onClick={() => {
            if (quantity > 1) decrementQuantity(id);
            else removeProduct(id);
          }}
        >
          <Minus size={16} />
        </ActionIcon>
        <Box
          sx={(theme) => ({
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '38px',
            minHeight: '36px',
            backgroundColor: theme.colors.gray[1],
            borderRadius: 5,
            overflow: 'hidden',
          })}
        >
          <Text>{quantity}</Text>
        </Box>
        <ActionIcon
          variant="light"
          color="blue"
          size={36}
          onClick={() => incrementQuantity(id)}
        >
          <Plus size={16} />
        </ActionIcon>
      </Group>
    </Paper>
  );
};

export const ProductCart = () => {
  const modals = useModals();
  const [status, setStatus] = useState<'ok' | 'minus' | 'plus'>('ok');

  const { classes } = useStyles({ status });
  const theme = useMantineTheme();
  const { products, totalItem, totalPrice, paidAmount, setPaidAmount, reset } =
    useProductStore();

  const { mutate, isLoading } = useCreate();

  const handleSubmit = () => {
    modals.openModal({
      children: <ProductReceiptModal />,
      withCloseButton: false,
      size: '360px',
    });
  };

  useEffect(() => {
    if (totalPrice > paidAmount) {
      setStatus('minus');
    } else if (totalPrice < paidAmount) {
      setStatus('plus');
    } else if (totalPrice === paidAmount) {
      setStatus('ok');
    }
  }, [paidAmount, totalPrice]);

  return (
    <Paper withBorder radius="md" p="md" className={classes.cart}>
      <Group position="apart" mb={12} align="center">
        <Indicator label={totalItem} size={18}>
          <Box style={{ display: 'flex', alignItems: 'center' }}>
            <ShoppingCart size={24} color={theme.colors.dark[3]} />
          </Box>
        </Indicator>
        <ActionIcon size="lg" color="red" onClick={() => reset()}>
          <Trash size={24} />
        </ActionIcon>
      </Group>

      <ScrollArea className={classes.productCardContainer} mb={12}>
        <Stack spacing="sm">
          {products.map((p) => (
            <ProductCartItem
              key={p.id}
              id={p.id}
              image={p.image}
              name={p.name}
              price={p.price}
              quantity={p.quantity}
            />
          ))}
        </Stack>
      </ScrollArea>

      <Group position="apart" align="center" mb={12}>
        <Text transform="uppercase" size="lg" weight={600}>
          Total
        </Text>
        <Text size="lg" weight={600}>
          {toRupiah(totalPrice)}
        </Text>
      </Group>

      <Paper radius="md" p="xs" withBorder mb={12}>
        <Group position="apart" align="center" mb={16}>
          <Text transform="uppercase" size="lg" weight={600}>
            Cash
          </Text>
          <NumberInput
            value={paidAmount}
            onChange={(val) => setPaidAmount(val)}
            parser={(value) => value.replace(/Rp\s?|(\.*)/g, '')}
            formatter={(value) =>
              !Number.isNaN(parseFloat(value))
                ? `Rp ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
                : 'Rp '
            }
          />
        </Group>
        <SimpleGrid cols={3}>
          {cashList.map((c) => (
            <Button
              key={c}
              variant="outline"
              color="blue"
              size="sm"
              onClick={() => {
                if (isNaN(paidAmount)) setPaidAmount(c);
                else setPaidAmount(paidAmount + c);
              }}
            >
              +{c.toLocaleString('id-ID')}
            </Button>
          ))}
        </SimpleGrid>
      </Paper>

      {!isNaN(paidAmount) && totalItem > 0 && (
        <Paper radius="md" mb={12} className={classes.moneyInfo}>
          {status === 'ok' ? (
            <ThumbUp />
          ) : status === 'minus' && !isNaN(paidAmount) ? (
            <Text align="right">- {toRupiah(totalPrice - paidAmount)}</Text>
          ) : (
            <Group position="apart" align="center" style={{ width: '100%' }}>
              <Text transform="uppercase" size="lg" weight={600}>
                Change
              </Text>
              <Text size="lg" weight={600}>
                {toRupiah(paidAmount - totalPrice)}
              </Text>
            </Group>
          )}
        </Paper>
      )}

      <Button
        fullWidth
        radius="md"
        disabled={status === 'minus' || totalItem < 1}
        loading={isLoading}
        onClick={() => {
          handleSubmit();
          // const userId = JSON.parse(localStorage.getItem('user')).id;

          // mutate({
          //   resource: 'order',
          //   values: {
          //     user_id: userId,
          //     total_amount: totalPrice,
          //     order_details: products.map((p) => ({
          //       product_id: p.id,
          //       quantity: p.quantity,
          //       total_price: p.total,
          //     })),
          //   },
          // });
        }}
      >
        Submit
      </Button>
    </Paper>
  );
};
