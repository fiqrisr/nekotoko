import { Product } from '@nekotoko/prisma/monolithic';

export interface ProductType extends Product {
  image: {
    url: string;
  };
}

export interface ProductStoreItemType
  extends Pick<Product, 'id' | 'name' | 'description' | 'price'> {
  image: string;
  quantity: number;
  total: number;
}