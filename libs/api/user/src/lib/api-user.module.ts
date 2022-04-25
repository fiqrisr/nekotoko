import { Module } from '@nestjs/common';

import { UserModule } from './user/user.module';

@Module({
  controllers: [],
  providers: [],
  exports: [UserModule],
  imports: [UserModule],
})
export class ApiUserModule {}
