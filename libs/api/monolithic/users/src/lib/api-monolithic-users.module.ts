import { Module } from '@nestjs/common';
import { UsersModule } from '@nekotoko/api/users';

import { UsersController } from './users/users.controller';

@Module({
  controllers: [UsersController],
  providers: [],
  exports: [],
  imports: [UsersModule],
})
export class ApiMonolithicUsersModule {}
