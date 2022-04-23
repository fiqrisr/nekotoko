import { Module } from '@nestjs/common';
import { PrismaMonolithicModule } from '@nekotoko/prisma/monolithic';

import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [PrismaMonolithicModule],
})
export class UserModule {}
