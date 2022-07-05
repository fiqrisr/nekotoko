import { Module } from '@nestjs/common';
import { DbMonolithicModule } from '@nekotoko/db-monolithic';

import { OrderController } from './order/order.controller';
import { OrderService } from './order/order.service';

@Module({
  controllers: [OrderController],
  providers: [OrderService],
  exports: [],
  imports: [DbMonolithicModule],
})
export class ApiMonolithicOrderModule {}
