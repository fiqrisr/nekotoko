import { Module } from '@nestjs/common';
import { DbOrderModule } from '@nekotoko/db-order';
import { RabbitMQModule } from '@nekotoko/rabbitmq';

import { OrderController } from './order/order.controller';
import { OrderService } from './order/order.service';

@Module({
  controllers: [OrderController],
  providers: [OrderService],
  exports: [],
  imports: [
    DbOrderModule,
    RabbitMQModule.register({ name: 'AUTH' }),
    RabbitMQModule.register({ name: 'PRODUCT' }),
  ],
})
export class ApiMicroservicesOrderModule {}
