import {
  useMantineTheme,
  createStyles,
  ActionIcon,
  Paper,
  Button,
  Group,
} from '@mantine/core';
import { Trash, ShoppingCart } from 'tabler-icons-react';

const useStyles = createStyles(() => ({
  cart: {
    minWidth: '360px',
    maxWidth: '400px',
    height: '100%',
  },
}));

export const ProductCart = () => {
  const { classes } = useStyles();

  return (
    <Paper withBorder radius="md" p="md" className={classes.cart}>
      <div>
        <Group position="apart">
          <ActionIcon size="lg">
            <ShoppingCart size={24} />
          </ActionIcon>
          <ActionIcon size="lg" color="red">
            <Trash size={24} />
          </ActionIcon>
        </Group>
      </div>
    </Paper>
  );
};
