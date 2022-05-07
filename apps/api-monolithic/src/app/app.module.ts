import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';

import { ApiAuthModule } from '@nekotoko/api/auth';
import { ApiMonolithicUsersModule } from '@nekotoko/api/monolithic/users';
import { ApiMonolithicCategoryModule } from '@nekotoko/api/monolithic/category';

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
    ApiMonolithicUsersModule,
    ApiAuthModule,
    ApiMonolithicCategoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
