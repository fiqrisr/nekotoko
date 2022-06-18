import { Module } from '@nestjs/common';
import { ApiUsersModule } from '@nekotoko/api/users';
import { PrismaAuthModule } from '@nekotoko/prisma/auth-db';

import { UsersController } from './users/users.controller';

@Module({
  controllers: [UsersController],
  providers: [],
  exports: [],
  imports: [ApiUsersModule, PrismaAuthModule],
})
export class ApiMicroservicesUsersModule {}
