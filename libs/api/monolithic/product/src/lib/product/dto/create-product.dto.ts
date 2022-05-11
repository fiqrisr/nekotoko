import {
  IsNotEmpty,
  IsString,
  IsNumber,
  Min,
  IsOptional,
} from 'class-validator';
import { Prisma } from '@nekotoko/prisma/monolithic';

export class CreateProductDto implements Prisma.ProductCreateManyInput {
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
  @IsString()
  image?: string;

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
