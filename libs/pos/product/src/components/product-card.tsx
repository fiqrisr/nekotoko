import {
  Card,
  Image,
  Text,
  Button,
  Group,
  Box,
  createStyles,
} from '@mantine/core';
import { toRupiah } from '@nekotoko/shared/utils';
import { useProductStore } from '@nekotoko/pos/shared';

const useStyles = createStyles((theme) => ({
  card: {
    minHeight: '100%',
    display: 'flex',
    flexDirection: 'column',
  },

  imageSection: {
    borderBottom: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },

  nameSection: {
    flex: 1,
  },

  bottomSection: {
    padding: theme.spacing.md,
    borderTop: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },
}));

interface ProductCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

export const ProductCard = ({
  id,
  name,
  description,
  price,
  image,
}: ProductCardProps) => {
  const { classes } = useStyles();
  const { addProduct } = useProductStore();

  return (
    <Card withBorder shadow="sm" radius="md" p="lg" className={classes.card}>
      <Card.Section className={classes.imageSection}>
        <Image src={image} alt={name} height={150} />
      </Card.Section>

      <Box mt={10} mb={10} className={classes.nameSection}>
        <Text weight={500} size="lg" mb={5}>
          {name}
        </Text>
        <Text size="sm" lineClamp={2} color="grey">
          {description}
        </Text>
      </Box>

      <Card.Section className={classes.bottomSection}>
        <Group spacing={20}>
          <div>
            <Text size="xl" weight={700} sx={{ lineHeight: 1 }}>
              {toRupiah(price)}
            </Text>
          </div>

          <Button
            radius="md"
            style={{ flex: 1 }}
            onClick={() =>
              addProduct({
                id,
                name,
                description,
                price,
                image,
                quantity: 1,
                total: price,
              })
            }
          >
            Add to cart
          </Button>
        </Group>
      </Card.Section>
    </Card>
  );
};
