import { IsNotEmpty, IsString, MinLength, MaxLength } from 'class-validator';
import { Prisma } from '@nekotoko/db-monolithic';

export class CreateUserDto implements Prisma.UserCreateWithoutOrdersInput {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(255)
  username: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(255)
  full_name: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  password: string;
}
