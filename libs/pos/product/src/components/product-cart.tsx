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
    minWidth: '400px',
    minHeight: '100%',
  },
}));

export const ProductCart = () => {
  const { classes } = useStyles();
  const theme = useMantineTheme();

  return (
    <Paper withBorder radius="md" p="md">
      <aside className={classes.cart}>
        <div>
          <Group position="apart">
            <ActionIcon size="xl">
              <ShoppingCart size={30} />
            </ActionIcon>
            <ActionIcon size="xl">
              <Trash size={30} />
            </ActionIcon>
          </Group>
        </div>
      </aside>
    </Paper>
  );
};
