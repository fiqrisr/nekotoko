import { Module } from '@nestjs/common';
import { ApiOrderModule } from '@nekotoko/api/order';
import { PrismaMonolithicModule } from '@nekotoko/prisma/monolithic';

import { OrderController } from './order/order.controller';

@Module({
  controllers: [OrderController],
  providers: [],
  exports: [],
  imports: [ApiOrderModule, PrismaMonolithicModule],
})
export class ApiMonolithicOrderModule {}
