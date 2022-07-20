import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class OrderDetailDto {
  @IsNotEmpty()
  @IsString()
  product_id: string;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @IsNotEmpty()
  @IsNumber()
  total_price: number;
}
