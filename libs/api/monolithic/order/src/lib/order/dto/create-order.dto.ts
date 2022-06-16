import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

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
  @IsNotEmpty()
  @IsString()
  user_id: string;

  @IsNotEmpty()
  @IsNumber()
  total_amount: number;

  @IsNotEmpty()
  order_details: OrderDetail[];
}
