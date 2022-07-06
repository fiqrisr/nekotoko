import { Module } from '@nestjs/common';
import { UsersModule } from '@nekotoko/api/users';
import { DbMonolithicModule } from '@nekotoko/db-monolithic';

import { UsersController } from './users/users.controller';

@Module({
  controllers: [UsersController],
  providers: [],
  exports: [],
  imports: [UsersModule, DbMonolithicModule],
})
export class ApiMonolithicUsersModule {}
