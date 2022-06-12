import { Module } from '@nestjs/common';
import { OrderModule } from './order/order.module';

@Module({
  controllers: [],
  providers: [],
  exports: [OrderModule],
  imports: [OrderModule],
})
export class ApiOrderModule {}
