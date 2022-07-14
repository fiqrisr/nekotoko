import { IsNotEmpty, IsString } from 'class-validator';
import { Prisma } from '@nekotoko/db-product';

export class CreateCategoryDto implements Prisma.CategoryCreateInput {
  @IsNotEmpty()
  @IsString()
  name: string;
}
