import { Module } from '@nestjs/common';
import { PrismaMonolithicModule } from '@nekotoko/prisma/monolithic';

import { OrderController } from './order/order.controller';
import { OrderService } from './order/order.service';

@Module({
  controllers: [OrderController],
  providers: [OrderService],
  exports: [],
  imports: [PrismaMonolithicModule],
})
export class ApiMonolithicOrderModule {}
