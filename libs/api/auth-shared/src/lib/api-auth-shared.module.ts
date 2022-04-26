import { Module } from '@nestjs/common';

import { JwtAuthGuard } from './guards/jwt.guard';

@Module({
  controllers: [],
  providers: [JwtAuthGuard],
  exports: [JwtAuthGuard],
  imports: [],
})
export class ApiAuthSharedModule {}
