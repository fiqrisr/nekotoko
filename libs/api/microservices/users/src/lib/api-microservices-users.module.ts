import { Module } from '@nestjs/common';
import { ApiUsersModule } from '@nekotoko/api/users';
import { DbAuthModule } from '@nekotoko/db-auth';

import { UsersController } from './users/users.controller';

@Module({
  controllers: [UsersController],
  providers: [],
  exports: [],
  imports: [ApiUsersModule, DbAuthModule],
})
export class ApiMicroservicesUsersModule {}
