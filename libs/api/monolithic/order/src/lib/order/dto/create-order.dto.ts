import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';

class OrderDetail {
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

export class CreateOrderDto {
  @IsOptional()
  @IsString()
  number?: string;

  @IsNotEmpty()
  @IsString()
  user_id: string;

  @IsNotEmpty()
  @IsNumber()
  total_amount: number;

  @IsNotEmpty()
  order_details: OrderDetail[];
}
