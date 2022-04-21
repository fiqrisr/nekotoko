import { Module } from '@nestjs/common';
import { ApiPrismaModule } from '@nekotoko/api/prisma';

import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [ApiPrismaModule],
})
export class UserModule {}
