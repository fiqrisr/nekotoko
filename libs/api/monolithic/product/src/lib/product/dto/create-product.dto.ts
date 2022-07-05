import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsOptional,
  Min,
} from 'class-validator';
import { Prisma } from '@nekotoko/db-monolithic';

interface Image {
  uid: string;
  name: string;
  type: string;
  size: number;
  status: string;
  response: {
    data: {
      url: string;
    };
  };
  url: string;
}

export class CreateProductDto
  implements Omit<Prisma.ProductCreateManyInput, 'image'>
{
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  price: number;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  image?: Image[];

  @IsNotEmpty()
  @IsString()
  category_id: string;

  @IsNotEmpty()
  product_compositions: {
    composition_id: string;
    quantity: number;
    unit: string;
  }[];
}
