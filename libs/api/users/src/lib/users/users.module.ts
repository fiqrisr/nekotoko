import { Module } from '@nestjs/common';
import { PrismaMonolithicModule } from '@nekotoko/prisma/monolithic';
import { ApiPasswordModule } from '@nekotoko/api/password';

import { UsersService } from './users.service';

@Module({
  providers: [UsersService],
  imports: [PrismaMonolithicModule, ApiPasswordModule],
  exports: [UsersService],
})
export class UsersModule {}
