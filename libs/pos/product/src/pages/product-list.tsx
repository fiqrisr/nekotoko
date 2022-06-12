import { useState } from 'react';
import { useList } from '@pankod/refine-core';
import {
  Grid,
  Tabs,
  Skeleton,
  Box,
  Container,
  createStyles,
} from '@mantine/core';

import type { Category, Prisma } from '@nekotoko/prisma/monolithic';

import { ProductCard, ProductCart } from '../components';

const useStyles = createStyles((theme) => ({
  layout: {
    display: 'flex',
    height: '100%',
    gap: theme.spacing.lg,
  },
}));

const ProductsGrid = ({ products }: { products: Prisma.ProductSelect[] }) => {
  return (
    <Grid>
      {products.map((product) => (
        <Grid.Col lg={3} md={4} sm={6}>
          <ProductCard
            key={product.id}
            name={product.name}
            description={product.description}
            price={product.price}
            image={product.image?.url}
          />
        </Grid.Col>
      ))}
    </Grid>
  );
};

export const ProductList = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [activeCategory, setActiveCategory] = useState('');
  const { classes } = useStyles();

  const { data: categoryData, isLoading: categoryLoading } = useList<Category>({
    resource: 'category',
  });

  const { data: productData, isLoading: productLoading } =
    useList<Prisma.ProductSelect>({
      resource: 'product',
      config: {
        filters: [
          {
            value: activeCategory,
            field: 'category',
            operator: 'eq',
          },
        ],
      },
    });

  const onTabChange = (active: number, tabKey: string) => {
    setActiveTab(active);
    setActiveCategory(tabKey);
  };

  return (
    <Box className={classes.layout}>
      {categoryLoading ? (
        <Skeleton height={20} />
      ) : (
        <Tabs
          active={activeTab}
          onTabChange={onTabChange}
          tabPadding="lg"
          sx={() => ({ flex: 1 })}
        >
          <Tabs.Tab label="All" tabKey="">
            {productLoading ? (
              <Skeleton height={20} />
            ) : (
              <ProductsGrid products={productData?.data} />
            )}
          </Tabs.Tab>
          {categoryData?.data.map((category) => (
            <Tabs.Tab label={category.name} tabKey={category.name}>
              {productLoading ? (
                <Skeleton height={20} />
              ) : (
                <ProductsGrid products={productData?.data} />
              )}
            </Tabs.Tab>
          ))}
        </Tabs>
      )}
      <ProductCart />
    </Box>
  );
};
