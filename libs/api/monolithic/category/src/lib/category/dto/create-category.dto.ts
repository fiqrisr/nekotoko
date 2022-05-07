import { IsNotEmpty, IsString } from 'class-validator';
import { Prisma } from '@nekotoko/prisma/monolithic';

export class CreateCategoryDto implements Prisma.CategoryCreateInput {
  @IsNotEmpty()
  @IsString()
  name: string;
}
