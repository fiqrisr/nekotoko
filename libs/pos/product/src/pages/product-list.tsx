import { useState } from 'react';
import { useList } from '@pankod/refine-core';
import {
  Grid,
  Tabs,
  Skeleton,
  Box,
  ScrollArea,
  createStyles,
} from '@mantine/core';
import { useInputState } from '@mantine/hooks';
import { ModalsProvider } from '@mantine/modals';

import type { Category } from '@nekotoko/db-monolithic';

import { ProductCard, ProductCart, ProductSearch } from '../components';
import { ProductSearchContext } from '../contexts';
import { ProductType } from '../types';

const useStyles = createStyles((theme) => ({
  layout: {
    display: 'flex',
    height: '100%',
    gap: theme.spacing.lg,
  },

  tabContainer: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    flex: 1,
  },
}));

const ProductLoading = () => {
  return (
    <Grid>
      {Array.from({ length: 6 }).map((_, i) => (
        <Grid.Col lg={3} md={4} sm={6} key={i}>
          <Skeleton height={320} radius="md" />
        </Grid.Col>
      ))}
    </Grid>
  );
};

const ProductsGrid = ({
  products,
  loading,
}: {
  products: ProductType[];
  loading: boolean;
}) => {
  if (loading) {
    return <ProductLoading />;
  }

  return (
    <ScrollArea offsetScrollbars style={{ height: '100%' }}>
      <Grid>
        {products.map((product) => (
          <Grid.Col lg={3} md={4} sm={6} key={product.id}>
            <ProductCard
              id={product.id}
              name={product.name}
              description={product.description}
              price={product.price}
              image={product.image?.url}
            />
          </Grid.Col>
        ))}
      </Grid>
    </ScrollArea>
  );
};

export const ProductList = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [activeCategory, setActiveCategory] = useState('');
  const [search, setSearch] = useInputState('');
  const { classes } = useStyles();

  const { data: categoryData, isLoading: categoryLoading } = useList<Category>({
    resource: 'category',
  });

  const { data: productData, isLoading: productLoading } = useList<ProductType>(
    {
      resource: 'product',
      config: {
        pagination: { current: 1, pageSize: 100 },
        filters: [
          {
            value: activeCategory,
            field: 'category',
            operator: 'eq',
          },
          {
            value: search,
            field: 'search',
            operator: 'eq',
          },
        ],
      },
    }
  );

  const onTabChange = (active: number, tabKey: string) => {
    setActiveTab(active);
    setActiveCategory(tabKey);
  };

  return (
    <ModalsProvider>
      <ProductSearchContext.Provider
        value={{
          search,
          setSearch,
        }}
      >
        <Box className={classes.layout}>
          {categoryLoading ? (
            <Skeleton height={20} />
          ) : (
            <Box className={classes.tabContainer}>
              <ProductSearch />
              <Tabs
                active={activeTab}
                onTabChange={onTabChange}
                tabPadding="lg"
                styles={{
                  root: {
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    flex: 1,
                    overflow: 'hidden',
                  },
                  body: {
                    height: '100%',
                    maxHeight: '100%',
                    overflow: 'hidden',
                  },
                }}
              >
                <Tabs.Tab label="All" tabKey="">
                  <ProductsGrid
                    products={productData?.data}
                    loading={productLoading}
                  />
                </Tabs.Tab>
                {categoryData?.data.map((category) => (
                  <Tabs.Tab
                    label={category.name}
                    tabKey={category.name}
                    key={category.id}
                  >
                    <ProductsGrid
                      products={productData?.data}
                      loading={productLoading}
                    />
                  </Tabs.Tab>
                ))}
              </Tabs>
            </Box>
          )}
          <ProductCart />
        </Box>
      </ProductSearchContext.Provider>
    </ModalsProvider>
  );
};
