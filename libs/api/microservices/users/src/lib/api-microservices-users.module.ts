import { Module } from '@nestjs/common';
import { UsersModule } from '@nekotoko/api/users';
import { PrismaAuthModule } from '@nekotoko/prisma/auth-db';

import { UsersController } from './users/users.controller';

@Module({
  controllers: [UsersController],
  providers: [],
  exports: [],
  imports: [UsersModule, PrismaAuthModule],
})
export class ApiMicroservicesUsersModule {}
