import { Module } from '@nestjs/common';
import { DbMonolithicModule } from '@nekotoko/db-monolithic';
import { ApiPasswordModule } from '@nekotoko/api/password';

import { UsersService } from './users.service';

@Module({
  providers: [UsersService],
  imports: [DbMonolithicModule, ApiPasswordModule],
  exports: [UsersService],
})
export class UsersModule {}
