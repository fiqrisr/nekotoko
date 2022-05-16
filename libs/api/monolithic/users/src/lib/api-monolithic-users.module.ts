import { Module } from '@nestjs/common';
import { UsersModule } from '@nekotoko/api/users';
import { PrismaMonolithicModule } from '@nekotoko/prisma/monolithic';

import { UsersController } from './users/users.controller';

@Module({
  controllers: [UsersController],
  providers: [],
  exports: [],
  imports: [UsersModule, PrismaMonolithicModule],
})
export class ApiMonolithicUsersModule {}
