import { Module } from '@nestjs/common';
import { DbOrderModule } from '@nekotoko/db-order';

import { OrderController } from './order/order.controller';
import { OrderService } from './order/order.service';

@Module({
  controllers: [OrderController],
  providers: [OrderService],
  exports: [],
  imports: [DbOrderModule],
})
export class ApiMicroservicesOrderModule {}
