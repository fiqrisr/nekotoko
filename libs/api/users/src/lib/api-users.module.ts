import { Module } from '@nestjs/common';

import { UsersModule } from './users/users.module';

@Module({
  controllers: [],
  providers: [],
  exports: [UsersModule],
  imports: [UsersModule],
})
export class ApiUsersModule {}
