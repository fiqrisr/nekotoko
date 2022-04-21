import { Module } from '@nestjs/common';

import { UserModule } from './user/user.module';

@Module({
  controllers: [],
  providers: [],
  exports: [],
  imports: [UserModule],
})
export class ApiUserModule {}
