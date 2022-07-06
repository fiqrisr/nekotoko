import { useEffect } from 'react';
import { Edit, useForm } from '@pankod/refine-antd';
import { Product, Category, ProductComposition } from '@nekotoko/db-monolithic';

import { ProductForm } from '../components';

export const ProductEdit = () => {
  const { formProps, saveButtonProps, form, queryResult } = useForm<
    Product & {
      category: Category;
      product_compositions: ProductComposition[];
    }
  >();

  useEffect(() => {
    if (queryResult?.data) {
      const { data } = queryResult.data;
      const { category, product_compositions, ...restData } = data;

      form.setFieldsValue({
        ...restData,
        product_compositions: product_compositions.map(
          ({ composition_id, quantity, unit }) => ({
            composition_id,
            quantity,
            unit,
          })
        ),
      });
    }

    return () => {
      form.resetFields();
    };
  }, [queryResult?.data, form]);

  return (
    <Edit saveButtonProps={saveButtonProps} isLoading={queryResult?.isFetching}>
      <ProductForm formProps={formProps} />
    </Edit>
  );
};
