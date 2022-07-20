import { Module } from '@nestjs/common';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { DbProductModule } from '@nekotoko/db-product';
import { ApiSharedSupabaseModule } from '@nekotoko/api/shared/supabase';
import { RabbitMQModule } from '@nekotoko/rabbitmq';

import { ProductController } from './product/product.controller';
import { ProductService } from './product/product.service';

@Module({
  controllers: [ProductController],
  providers: [ProductService],
  exports: [],
  imports: [
    DbProductModule,
    NestjsFormDataModule,
    ApiSharedSupabaseModule,
    RabbitMQModule,
  ],
})
export class ApiMicroservicesProductModule {}
