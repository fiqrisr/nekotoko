import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { Prisma } from '@nekotoko/prisma/monolithic';

export class CreateCompositionDto
  implements Prisma.CompositionCreateWithoutProduct_compositionsInput
{
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  unit: string;

  @IsNotEmpty()
  @IsNumber()
  stock: number;
}
