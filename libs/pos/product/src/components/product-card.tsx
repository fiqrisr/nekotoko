import {
  Card,
  Image,
  Text,
  Button,
  Group,
  Box,
  createStyles,
} from '@mantine/core';

const useStyles = createStyles((theme) => ({
  card: {
    minHeight: '320px',
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
  name: string;
  description: string;
  price: number;
  image: string;
}

export const ProductCard = ({
  name,
  description,
  price,
  image,
}: ProductCardProps) => {
  const { classes } = useStyles();

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
        <Group spacing={30}>
          <div>
            <Text size="xl" weight={700} sx={{ lineHeight: 1 }}>
              {price.toLocaleString('id-ID', {
                style: 'currency',
                currency: 'IDR',
              })}
            </Text>
          </div>

          <Button radius="xl" style={{ flex: 1 }}>
            Add to cart
          </Button>
        </Group>
      </Card.Section>
    </Card>
  );
};
