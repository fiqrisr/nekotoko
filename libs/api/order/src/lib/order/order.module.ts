import { Module } from '@nestjs/common';
import { PrismaMonolithicModule } from '@nekotoko/prisma/monolithic';

import { OrderService } from './order.service';

@Module({
  providers: [OrderService],
  exports: [OrderService],
  imports: [PrismaMonolithicModule],
})
export class OrderModule {}
