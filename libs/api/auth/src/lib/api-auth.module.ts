import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';

@Module({
  controllers: [],
  providers: [],
  exports: [],
  imports: [AuthModule],
})
export class ApiAuthModule {}
