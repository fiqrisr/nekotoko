import { Product } from '@nekotoko/prisma/monolithic';

export interface ProductType extends Product {
  image: {
    url: string;
  };
}
