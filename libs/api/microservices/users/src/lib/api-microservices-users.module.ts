import { Module } from '@nestjs/common';
import { ApiUsersModule } from '@nekotoko/api/users';
import { DbAuthModule } from '@nekotoko/db-auth';
import { RabbitMQModule } from '@nekotoko/rabbitmq';

import { UsersController } from './users/users.controller';

@Module({
  controllers: [UsersController],
  providers: [],
  exports: [],
  imports: [
    ApiUsersModule,
    DbAuthModule,
    RabbitMQModule.register({ name: 'ORDER' }),
  ],
})
export class ApiMicroservicesUsersModule {}
