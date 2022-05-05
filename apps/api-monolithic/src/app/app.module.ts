import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';

import { ApiUsersModule } from '@nekotoko/api/users';
import { ApiAuthModule } from '@nekotoko/api/auth';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    LoggerModule.forRoot({
      pinoHttp:
        process.env.NODE_ENV === 'development'
          ? {
              prettyPrint: {
                colorize: true,
                levelFirst: true,
              },
            }
          : {},
    }),
    ApiUsersModule,
    ApiAuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
