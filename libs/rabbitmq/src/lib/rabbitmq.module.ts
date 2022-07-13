import { Module } from '@nestjs/common';

import { RabbitMQService } from './rabbitmq/rabbitmq.service';

@Module({
  controllers: [],
  providers: [RabbitMQService],
  exports: [RabbitMQService],
})
export class RabbitMQModule {}
