import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { ApiUserModule } from '@nekotoko/api/user';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ApiUserModule,
    ApiAuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
