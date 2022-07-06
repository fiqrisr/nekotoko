import { Create, useForm } from '@pankod/refine-antd';
import { Product } from '@nekotoko/db-monolithic';

import { ProductForm } from '../components';

export const ProductCreate = () => {
  const { formProps, saveButtonProps } = useForm<Product>();

  return (
    <Create saveButtonProps={saveButtonProps}>
      <ProductForm formProps={formProps} />
    </Create>
  );
};
