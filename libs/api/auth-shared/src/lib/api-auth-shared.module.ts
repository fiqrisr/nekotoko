import { Module } from '@nestjs/common';
import { RabbitMQModule } from '@nekotoko/rabbitmq';

import { JwtAuthGuard } from './guards/jwt.guard';
import { JwtAuthGuardMicroservices } from './guards/jwt-microservices.guard';

@Module({
  controllers: [],
  providers: [JwtAuthGuard, JwtAuthGuardMicroservices],
  exports: [JwtAuthGuard, JwtAuthGuardMicroservices, RabbitMQModule],
  imports: [RabbitMQModule.register({ name: 'AUTH' })],
})
export class ApiAuthSharedModule {}
