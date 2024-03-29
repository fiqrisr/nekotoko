import { Product } from '@nekotoko/db-monolithic';

export interface ProductType extends Product {
  image: {
    url: string;
  };
}

export interface ProductStoreItemType
  extends Pick<Product, 'id' | 'name' |  'price'> {
  description?: string;
  image: string;
  quantity: number;
  total: number;
}
