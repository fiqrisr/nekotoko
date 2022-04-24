import { Module } from '@nestjs/common';
import { PrismaMonolithicModule } from '@nekotoko/prisma/monolithic';
import { ApiPasswordModule } from '@nekotoko/api/password';

import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [PrismaMonolithicModule, ApiPasswordModule],
})
export class UserModule {}
